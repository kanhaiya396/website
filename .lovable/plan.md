
# Cleanup + Change Walkthrough

## 1. Remove recommendations file from repo
- Delete `docs/recommendations.md` (and the now-empty `docs/` folder if nothing else is in it).
- The downloadable artifact at `/mnt/documents/recommendations.md` stays available — it is independent of the repo. I'll re-surface it as a `<presentation-artifact>` for one-click download.

## 2. Walk through every change made in the previous turn
I'll present each edit one at a time, in this order, with the exact before → after diff and a one-line rationale:

1. `src/components/Seo.tsx` — added optional `image` / `imageAlt` props; emits `og:image`, `og:image:alt`, `twitter:image`; switched `twitter:card` to `summary_large_image`.
2. `public/sitemap.xml` — added the two missing blog posts (`category-mapping-accuracy`, `scaling-bookkeeping-team`).
3. `package.json` — replaced the broken `node -e "require('fs')..."` in `deploy` with `cp dist/index.html dist/404.html`.
4. `src/components/layout/Header.tsx` — three edits:
   - Mobile hamburger: added `aria-label`, `aria-expanded`, `aria-controls`, `type="button"`.
   - Mobile nav panel: added `id="mobile-nav"`.
   - Added the skip-to-content anchor at the top of the header container.
5. `src/pages/Documentation.tsx` — normalized `OutWorx` → `Outworx` throughout (visible headings + PDF/PPTX metadata).
6. `<main id="main-content">` added on 14 page roots so the skip link has a target:
   `Index, About, Blog, BlogPost, Pricing, ApiDocs, Documentation, DashboardDemo, Security, Status, Privacy, Terms, Cookies, Careers`.

For each item I'll show the actual diff (no paraphrasing) so you can confirm nothing else slipped in.

## 3. Pricing fetch issue — waiting on your input
Per your instruction, I will not touch any Pricing API / fetch / fallback code in this task. When you share the reference links, I'll create a separate focused plan scoped strictly to the pricing data layer (`src/pages/Pricing.tsx` + `src/lib/api.ts`) with no other side effects.

## Order of operations (build mode)
1. `rm docs/recommendations.md`; remove `docs/` if empty.
2. Re-attach the downloadable artifact.
3. Post the diffs in sequence (text only, no further code changes).
