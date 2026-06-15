
# Revert Skip-to-Content + Re-share Recommendations

## 1. Remove the skip-to-content feature
Revert exactly the additions from the prior turn — no other changes.

- `src/components/layout/Header.tsx`: remove the `<a href="#main-content">Skip to content</a>` block at the top of the container.
- Revert `id="main-content"` on the 14 `<main>` elements:
  `Index, About, Blog, BlogPost, Pricing, ApiDocs, Documentation, DashboardDemo, Security, Status, Privacy, Terms, Cookies, Careers`.

Hamburger `aria-label` / `aria-expanded` / `aria-controls` and the `id="mobile-nav"` on the mobile panel stay — they are independent a11y fixes, not part of the skip-link feature.

## 2. Re-attach the recommendations file
Re-surface `/mnt/documents/recommendations.md` as a `<presentation-artifact>` for one-click download. The repo `docs/` folder stays deleted.

## Order of operations (build mode)
1. Edit `Header.tsx` to remove the skip-link anchor.
2. `sed` across the 14 page files to drop `id="main-content" ` from each `<main>`.
3. Re-attach the artifact.
