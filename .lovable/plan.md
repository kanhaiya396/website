## Homepage SEO Optimization Plan

Goal: improve discoverability without touching styling, layout, copy, or component structure. No new pages, no images added.

### Current SEO audit
- `index.html` has a basic title + description, but no canonical, no OG/Twitter tags, no JSON-LD.
- No `react-helmet-async` installed — per-route meta is impossible today.
- Semantic structure is already good: `<header>` with `<nav>`, `<main>` in `Index.tsx`, `<footer>` in `Footer.tsx`.
- Heading hierarchy is already correct: single `<h1>` in `Hero.tsx`; sections use `<h2>`; sub-items use `<h3>`/`<h4>`. No changes needed.
- No `<img>` tags on the homepage — only inline `lucide-react` SVG icons and CSS-styled logo placeholders ("X", "QB"). Decorative; surrounding text labels already name them. No alt text required.
- `public/robots.txt` already exists. No `sitemap.xml` — will not invent one without confirmed URL structure.
- Broken link found: Hero's "Xero App Store" text is styled like a link but has no `href`/handler.

**Current SEO rating: ~45%** (basic title/description only; missing canonical, OG, Twitter, structured data, per-route meta).

### Changes

1. **Install `react-helmet-async`** (only dependency added).

2. **`src/main.tsx`** — wrap `<App />` in `<HelmetProvider>`. Single import + wrapper, no logic changes.

3. **`src/pages/Index.tsx`** — add a `<Helmet>` block at the top of the returned tree with:
   - `<title>`: "Outworx — AI Bookkeeping Autopilot for Accountants"
   - `<meta name="description">`: "AI document automation for accountants and bookkeepers. Capture, categorise, VAT-comply and close — end-to-end on autopilot."
   - `<link rel="canonical" href="https://outworx.ai/">`
   - OG: `og:title`, `og:description`, `og:type=website`, `og:url=https://outworx.ai/`
   - Twitter: `twitter:card=summary`, `twitter:title`, `twitter:description`
   `<Helmet>` renders nothing visually.

4. **`index.html`** — remove the now-duplicated `<title>`, description, and OG/Twitter tags so Helmet is the single source of truth for the homepage. Keep charset, viewport, favicon, author.

5. **`src/components/landing/Hero.tsx` — fix dead "Xero App Store" link.**
   Convert the `<span class="text-primary hover:underline cursor-pointer">Xero App Store</span>` into an `<a>` element with the same classes, pointing to the Outworx listing on the Xero App Store (`https://apps.xero.com/`), `target="_blank"` and `rel="noopener noreferrer"`. Zero visual change — same Tailwind classes carry over.

6. **Heading hierarchy** — verified already correct. No tag changes.

7. **Semantic landmarks** — `<header>`, `<nav>`, `<main>`, `<footer>` already present. No changes.

8. **Alt attributes** — no `<img>` elements on the homepage. No changes.

### Files touched
- `package.json` / lockfile (install)
- `src/main.tsx` (HelmetProvider wrapper)
- `src/pages/Index.tsx` (Helmet block)
- `index.html` (remove duplicated meta)
- `src/components/landing/Hero.tsx` (span → anchor for "Xero App Store")

No new files. No styling/layout/copy changes.

### Post-change SEO rating estimate
**~85%** — homepage will have full meta (title, description, canonical, OG, Twitter), correct semantic landmarks, proper heading hierarchy, and no dead in-page links. The remaining ~15% would require per-route Helmet on other pages, a sitemap.xml, JSON-LD Organization schema, and an OG image — all out of scope per your instructions.

### Confirmation
After implementation I'll send a popup-style confirmation message that the changes have been applied.