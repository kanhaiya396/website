// Give every static route a real file on GitHub Pages.
//
// GitHub Pages serves public/404.html for any path that is not a file on
// disk — and ALWAYS with a 404 status, whatever the file does afterwards. The
// SPA redirect inside it makes deep links work in a browser, but anything
// that reads the status code — Xero's App Partner reviewers checking our
// privacy/terms URLs, Google, a curl from a partner — sees "404 Not Found"
// for /privacy, /terms, /dpa, /about… (verified 2026-09-25: every route but
// "/" answered 404). This step copies dist/index.html to dist/<route>/index.html
// for each static route in src/App.tsx, so GitHub finds a file and answers
// 200 (a request without the trailing slash gets a 301 to it). The 404.html
// fallback stays in place for parameterised routes such as /blog/:slug.
//
// Routes are read from App.tsx rather than listed here so a new page can't
// be forgotten; anything with ":" or "*" in it is skipped.
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const appSource = await fs.readFile(path.join(root, "src", "App.tsx"), "utf8");

const routes = [...appSource.matchAll(/<Route\s+path="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((p) => p !== "/" && !p.includes(":") && !p.includes("*"));

const index = await fs.readFile(path.join(dist, "index.html"), "utf8");
for (const route of routes) {
  const dir = path.join(dist, ...route.split("/").filter(Boolean));
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, "index.html"), index);
}
console.log(`prerender-routes: wrote ${routes.length} route copies: ${routes.join(", ")}`);
