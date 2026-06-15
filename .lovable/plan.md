
# Audit Fix Plan — Safe, Targeted Changes Only

Scope: implement only the verified fixes from the prior audit, excluding anything Pricing-related (API, fetch, fallback, calculations, Pricing.tsx data flow). Each fix is the smallest possible change and preserves layout, styling, animations, SEO, and component APIs.

---

## SECTION A — Fixes To Apply

### 1. Logo should also link to home (carryover request)
- File: `src/components/layout/Header.tsx`
- Change: wrap the logo mark in the same `SmoothNavLink to="/"` as the brand name (or wrap both in a single link). No styling changes.

### 2. Brand capitalization consistency ("OutWorx" vs "Outworx")
- Files: only locations using the wrong casing (will grep `OutWorx` / `outworx` / `Outworx`).
- Change: standardize to the canonical form already used in `Header.tsx`. Text-only edits, no structural changes.

### 3. Mobile hamburger missing `aria-label`
- File: `src/components/layout/Header.tsx`
- Change: add `aria-label="Open menu"` / `"Close menu"` and `aria-expanded={mobileMenuOpen}` to the existing button. No visual change.

### 4. Skip-to-content link (a11y)
- Files: `index.html` or `src/App.tsx` + `src/index.css`
- Change: add a single visually-hidden-until-focus `<a href="#main">Skip to content</a>` and ensure each page's main wrapper has `id="main"`. Implemented via a tiny additive CSS utility class; no changes to existing tokens.

### 5. SEO `og:image` + `twitter:image` support
- File: `src/components/Seo.tsx`
- Change: add optional `image?: string` prop (defaults to existing site image / favicon-derived URL) and emit `og:image`, `og:image:alt`, `twitter:card="summary_large_image"`, `twitter:image`. Backward compatible — no existing call sites need to change.

### 6. Sitemap missing blog posts
- File: `public/sitemap.xml`
- Change: regenerate entries from `src/data/blogPosts.ts` so every published post slug is listed with correct `loc` and `lastmod`. No route changes.

### 7. `package.json` deploy script ESM/CJS mismatch
- File: `package.json`
- Change: fix only the `deploy` script syntax (smallest viable change — switch the offending `require`/`import` usage so it matches the project's module type). No dependency changes, no other scripts touched.

### 8. Redundant hash-scroll logic (Header vs ScrollManager)
- Files: `src/components/layout/Header.tsx`, `src/components/ScrollManager.tsx`
- Change: keep `ScrollManager` as the single source of truth for hash scrolling. In `Header.tsx`, simplify `handleHashLink` to just `navigate('/#section')` and close the mobile menu — remove the duplicated manual `scrollTo` block. The previously-added header-offset behavior stays in `ScrollManager` so the earlier mobile-dropdown offset fix is preserved.
- Verification: re-test all three Product dropdown items on mobile + desktop and footer hash links to confirm offset behavior is unchanged.

### Explicitly NOT changed in this task
- `src/pages/Pricing.tsx`, `src/lib/api.ts` pricing paths, `FALLBACK_PLANS`, annual toggle, FAQ section, hero screenshot replacements, CTA copy rewrites, any redesign work.

---

## Validation Checklist (run after each fix, full pass at the end)
- Build passes, no TS errors, no new console errors.
- Routes smoke test: `/`, `/about`, `/blog`, `/blog/:slug`, `/pricing`, `/api`, `/docs`, `/careers`, `/security`, `/status`, `/privacy`, `/terms`, `/cookies`, `/404`.
- Header nav (desktop + mobile): logo → `/`, brand → `/`, all dropdown items, hash links land at correct offset.
- Footer links: all resolve; hash links use same offset behavior.
- Animations on About/Blog/Pricing/API hero still play once on mount.
- Responsive check at 360, 414, 768, 1024, 1440.
- Lighthouse-level a11y: skip link focusable, hamburger has accessible name.

---

## SECTION B — Recommendations Document (no code changes)

Deliverable: a new markdown file `docs/recommendations.md` containing future-improvement suggestions only. Each entry uses the exact template you specified (Feature Name, Location, Purpose, User Benefit, Business Benefit, Priority, Implementation Complexity, Dependencies, Suggested UI Placement, Expected Impact, Mock User Journey).

Categories the doc will cover:
1. Conversion Improvements (e.g., annual/monthly billing toggle, sticky CTA on long pages, exit-intent offer)
2. Trust Building (customer logos strip, security/compliance badges row, testimonials with photos+company, case-study page)
3. Landing Page Enhancements (real product screenshots replacing letter placeholders, animated feature demo, ROI calculator)
4. Navigation Improvements (mega-menu for Product, breadcrumb on Blog/Docs, in-page TOC on long docs)
5. SEO (per-post `og:image`, JSON-LD `Article` on BlogPost, JSON-LD `Organization` site-wide, blog category/tag pages)
6. Performance (image `loading="lazy"` + `decoding="async"` audit, preconnect to font/CDN, route-level `<link rel="prefetch">`)
7. New Pages (Customers, Changelog, Compare vs competitors, Integrations index)
8. New Sections (FAQ on Pricing, "How it works" video, newsletter capture on Blog)
9. New Interactive Features (live VAT-rate lookup widget, demo sandbox, Intercom-style help launcher)
10. Future Product Opportunities (Slack/Teams notifications, Zapier app, public API key self-service)

The recommendations file will be created in build mode as a single new doc — no app code touched.

---

## Order Of Operations
1. Logo link + brand casing + hamburger a11y (Header.tsx only).
2. Skip-to-content link.
3. Seo.tsx image props.
4. sitemap.xml regeneration.
5. package.json deploy script.
6. Hash-scroll dedupe (Header.tsx) + regression test the earlier mobile-offset fix.
7. Write `docs/recommendations.md`.
8. Full smoke test pass.
