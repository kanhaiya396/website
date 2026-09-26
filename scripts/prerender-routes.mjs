// Pre-render every public page to real HTML after `vite build`.
//
// Two problems this solves on GitHub Pages:
//
// 1. Status codes. GitHub Pages serves public/404.html for any path that is
//    not a file on disk, ALWAYS with a 404 status. Anything that reads the
//    status — Xero's App Partner reviewers checking our privacy/terms URLs,
//    Google, a curl from a partner — saw "404 Not Found" for /privacy, /terms…
//    Writing dist/<route>/index.html gives GitHub a file, so it answers 200
//    (a request without the trailing slash gets a 301 to it).
//
// 2. Empty pages for bots. The site is a client-rendered SPA, so the raw HTML
//    is an empty <div id="root">. Crawlers and AI fetchers that don't run
//    JavaScript (ClaudeBot, GPTBot, link checkers) saw no content at all. We
//    load each route in headless Chrome, wait for React to render, and save
//    the resulting HTML. The browser then re-renders over it as normal.
//
// Routes come from src/App.tsx (static routes) plus public/sitemap.xml (blog
// posts), so a new page can't be forgotten. The 404.html fallback stays in
// place for anything not listed.
import { promises as fs } from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const appSource = await fs.readFile(path.join(root, "src", "App.tsx"), "utf8");
const sitemap = await fs.readFile(path.join(root, "public", "sitemap.xml"), "utf8");
const routes = [
  ...new Set([
    "/",
    ...[...appSource.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]),
    ...[...sitemap.matchAll(/<loc>https?:\/\/[^/<]+(\/[^<]*)<\/loc>/g)].map((m) => m[1]),
  ]),
].filter((p) => !p.includes(":") && !p.includes("*"));

// Serve dist/ with the untouched SPA shell as fallback, like GitHub Pages +
// 404.html would, but without the redirect dance.
const shell = await fs.readFile(path.join(dist, "index.html"), "utf8");
const types = {
  ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png",
  ".ico": "image/x-icon", ".json": "application/json", ".woff2": "font/woff2", ".xml": "application/xml",
};
const server = http.createServer(async (req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const file = path.join(dist, urlPath);
  try {
    if (!file.startsWith(dist) || !path.extname(file)) throw new Error("route");
    const body = await fs.readFile(file);
    res.writeHead(200, { "Content-Type": types[path.extname(file)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(shell);
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;

const browser = await puppeteer.launch({ headless: true });
const rendered = new Map();
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  // The app's API only allows CORS from https://outworx.ai, not this local
  // server, so fetch API calls (the Pricing page's plans) from Node instead
  // and hand the response to the page. Prices then land in the static HTML.
  await page.setRequestInterception(true);
  page.on("request", async (req) => {
    if (!req.url().includes("/api/")) return req.continue();
    try {
      const res = await fetch(req.url(), { headers: { Accept: "application/json" } });
      req.respond({
        status: res.status,
        contentType: res.headers.get("content-type") ?? "application/json",
        headers: { "Access-Control-Allow-Origin": "*" },
        body: await res.text(),
      });
    } catch {
      req.abort();
    }
  });
  for (const route of routes) {
    await page.goto(origin + route, { waitUntil: "networkidle0", timeout: 60_000 });
    // Wait for the lazy route chunk to replace the Suspense fallback.
    await page.waitForFunction(
      () => document.querySelector("#root main, #root h1") !== null,
      { timeout: 30_000 },
    );
    const html = "<!doctype html>\n" + (await page.evaluate(() => document.documentElement.outerHTML));
    rendered.set(route, html);
  }
} finally {
  await browser.close();
  server.close();
}

for (const [route, html] of rendered) {
  const dir = path.join(dist, ...route.split("/").filter(Boolean));
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, "index.html"), html);
}
console.log(`prerender-routes: rendered ${rendered.size} pages: ${[...rendered.keys()].join(", ")}`);
