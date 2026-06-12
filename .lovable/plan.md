## Goal

1. When navigating to a new page (Pricing, About, etc.) from the footer, scroll upward smoothly instead of jumping instantly to the top of the new page.
2. Improve SEO across pages without touching any visible styling, layout, copy, colors, fonts, or spacing.

## 1. Smooth scroll-up transition on route change

Update `src/components/ScrollManager.tsx` only.

Current behavior: on a route change with no hash, it calls `window.scrollTo({ top: 0 })` instantly. The new page mounts already at the top, so the user feels a hard cut.

New behavior:
- On `PUSH` navigation (clicking a link) to a route with no hash: first capture the current scroll position, then on the new route briefly keep the window at that prior Y, then smooth-scroll up to 0 using `window.scrollTo({ top: 0, behavior: "smooth" })`. This produces the requested upward scroll transition.
- On `POP` (back/forward): keep instant `auto` scroll so history feels native.
- Hash navigation behavior stays exactly as it is today (smooth scroll to the in-page section).
- Keep the existing cancel-on-rapid-navigation logic so pending smooth scrolls are aborted when the user clicks again quickly.

No other files touched. No layout, copy, or styling changes.

## 2. SEO improvements (cautious, invisible)

All changes are in `<head>` / metadata / crawler files. None affect the rendered UI.

### 2a. `index.html`
- Add `<meta name="theme-color">` (matches existing background — invisible to users, used by browsers/crawlers).
- Add Open Graph defaults: `og:site_name`, `og:locale`, plus a sitewide `twitter:site` placeholder only if safe (skip if no handle is known — won't invent one).
- Add a sitewide `Organization` JSON-LD block (name, url, logo via `/favicon.svg`) — Outworx already has a CNAME `outworx.ai`, so canonical/og URLs use `https://outworx.ai`.
- Keep the existing `<title>`, description, viewport, etc. untouched if present; add the sitewide title/description only if missing.

### 2b. `public/robots.txt`
- Add `Sitemap: https://outworx.ai/sitemap.xml` directive at the bottom (the CNAME confirms the domain). Existing allow rules unchanged.

### 2c. `public/sitemap.xml` (new file)
- Add a static sitemap listing all public routes: `/`, `/pricing`, `/about`, `/blog`, `/careers`, `/docs`, `/api-docs`, `/status`, `/security`, `/privacy`, `/terms`, `/cookies`, `/dashboard-demo`. Auth routes (`/login`, `/signup`, etc.) intentionally excluded.

### 2d. Per-page `<Helmet>` metadata
Pages that currently have no `<Helmet>` get a minimal one with `<title>`, `<meta name="description">`, `<link rel="canonical">`, and matching `og:title` / `og:description` / `og:url` / `og:type="website"`. Strictly head-only — no JSX render changes.

Pages to add Helmet to (only if missing):
- `About.tsx`, `Pricing.tsx`, `Careers.tsx`, `Blog.tsx`, `BlogPost.tsx` (uses post title/excerpt), `Documentation.tsx`, `ApiDocs.tsx`, `Status.tsx`, `Security.tsx`, `Privacy.tsx`, `Terms.tsx`, `Cookies.tsx`, `DashboardDemo.tsx`, `NotFound.tsx` (with `<meta name="robots" content="noindex">` so 404s don't get indexed).

Auth pages (`Login`, `Signup`, `ForgotPassword`, `ResetPassword`) get `<meta name="robots" content="noindex,follow">` since they shouldn't appear in search.

### 2e. Semantic check (head-only, no visible change)
Confirm each page already has exactly one `<h1>`. If a page is missing one, this plan does NOT add visible markup — it will be flagged in a follow-up only with the user's go-ahead.

## Out of scope (explicitly NOT changing)

- No changes to footer markup, link labels, or hrefs.
- No changes to `Hero`, `Features`, `HowItWorks`, `VATCompliance`, `Testimonials`, `CTA`, `Header`, `Footer`, or any landing component.
- No changes to colors, fonts, spacing, animations on existing elements, or layout.
- No changes to Pricing fallback logic, API calls, or Tailwind config.
- No new dependencies.

## Verification

After implementing:
- Click footer links (Pricing, About, Blog, Careers, etc.) from the bottom of the home page → page changes and smoothly scrolls upward to top.
- Hash links (`/#features`, `/#vat`) still scroll to the correct section.
- Back/forward feels instant (no smooth animation).
- View page source on `/` → see new meta + JSON-LD; no visual diff in the preview.
- `/sitemap.xml` and `/robots.txt` are reachable and reference `https://outworx.ai`.
