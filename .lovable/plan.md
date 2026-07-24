## Goal

Add **FreeAgent** as a fifth integration in the Integrations section (`HowItWorks.tsx`) without redesigning it — only resize the grid so all five fit cleanly on desktop. Strictly scoped: no other components change.

## Files touched (exhaustive)

1. **`src/assets/logos/freeagent.png.asset.json`** (new) — created via `lovable-assets create` from the uploaded FreeAgent PNG.
2. **`src/components/brand-logos/FreeAgentLogo.tsx`** (new) — mirrors existing `XeroLogo.tsx` / `NomiLogo.tsx` pattern: imports asset JSON, renders `<img>` with `object-contain` and configurable `className`.
3. **`src/components/landing/HowItWorks.tsx`** (edit) — three localised changes:
   - Import `FreeAgentLogo`, add it to the `LOGOS` array.
   - Grid classes: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5` (was `grid-cols-2 sm:grid-cols-4`).
   - Tile: `aspect-[4/3]` → `aspect-[5/4]`; logo cap `sm:max-h-24` → `sm:max-h-20`.
   - Card A heading text: `Xero, QuickBooks, Sage, FreeAgent & Nomi` (was `… & Nomi`).

## Explicitly NOT touched

- `IntegrationsBar.tsx` (separate footer strip — request is only about the Integrations section).
- Any other landing section, page, layout, header, footer, or global style.
- Section heading, background, typography, hover/entrance animations, colour tokens, shadows, borders, ring, padding, stagger reveal, and card copy body — all preserved.
- No changes to routing, auth, pricing, theme system, or shared utilities.

## Why this is isolated

- The two new files are additive — no existing file imports them except `HowItWorks.tsx`.
- `HowItWorks.tsx` is only rendered on the home page (`src/pages/Index.tsx`); no other page imports it.
- Grid + aspect + logo max-height are self-scoped Tailwind classes on the section's own elements; they cannot leak into other components.

## Verification

- Typecheck + build clean.
- Home page desktop (≥1024px): 5 evenly spaced cards; tablet (≥640px): 3-up; mobile: 2-up (unchanged).
- Card A heading reads `Xero, QuickBooks, Sage, FreeAgent & Nomi`.
- Spot-check other landing sections (Hero, BeforeAfter, VAT, AIReview, CIS, Testimonials, Voices, CTA) render unchanged.
