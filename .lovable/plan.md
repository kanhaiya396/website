
# Hero refinement: trust strip + workflow animation

Scope is limited to `src/components/landing/Hero.tsx`. No changes to layout grid, headline, subheadlines, CTAs, highlights row, routes, or any other page/component. Uses existing design tokens (primary/teal, success, border, secondary, card, shadow-glow) and `framer-motion` (already imported).

## Task 1 — Replace top-left trust badge

Remove the current avatar stack + "Rated 5★ on Xero App Store" block (lines 36–52) and replace with a compact pill strip in the same slot (same top margin `mb-8`, same load position).

Pills (each as a small rounded-full badge):
- ✓ Xero Ready
- ✓ QuickBooks Ready
- ✓ UK VAT Workflows
- ✓ Human Review Controls

Styling:
- `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs` with `border border-primary/30 bg-primary/5 text-foreground/90`, check icon in `text-primary`.
- Container: `flex flex-wrap gap-2`.
- Hover: `transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/10 hover:border-primary/50 hover:shadow-[0_0_12px_hsl(var(--primary)/0.25)]`.

Load animation (framer-motion, runs once, total ~1.6s):
- Each pill: `initial={{opacity:0, y:6}} animate={{opacity:1, y:0}}` with `delay: i*0.12, duration:0.4`.
- A single glow pulse via a one-shot keyframe `boxShadow` animation that ends at the resting state. No looping.

## Task 2 — Rebuild right-side visual into a looping workflow animation

Replace the entire right-column card body (lines 128–181) with a self-contained `<WorkflowAnimation />` component defined inside the same file (keeps the file self-contained, no new routes/files affecting other code). Outer `motion.div` wrapper, card frame, border, padding, and shadow are preserved so surrounding layout/spacing is unchanged.

### Structure inside the card

Three horizontal lanes, vertically stacked with `gap-6`:

```text
[ Documents column ]  →  [ Outworx engine ]  →  [ Xero / QuickBooks ]
   6 doc cards            circular core           two destination tiles
   (stacked list)         with extraction         with success glow
                          checklist overlay
```

SVG connector lines drawn behind the lanes using an absolutely-positioned `<svg>` covering the card. Two paths: Documents→Outworx, Outworx→Destinations. Each path has a faint base stroke (`stroke-border`) and an animated bright overlay (`stroke-primary`) using `strokeDasharray` + animated `strokeDashoffset` to create a "flowing" illumination during the relevant phase.

### Doc cards (Phase 1)
Six small cards (Invoice, Receipt, Bank Statement, Credit Note, Supplier Statement, Sales Invoice), each with a lucide icon and label, `rounded-lg bg-secondary/40 border border-border px-2.5 py-2`. On mount they fade-in staggered with a gentle continuous `y: [0,-2,0]` float (low amplitude, 4s loop, staggered per card) so the column feels alive but not busy.

### Outworx engine (center)
- Circular node `h-20 w-20 rounded-full bg-primary/15 border border-primary/40` with the existing `FileText` mark and `shadow-glow`.
- Soft radial gradient halo behind it (`bg-primary/10 blur-2xl`).
- Below the circle: a compact extraction checklist that reveals items one-by-one during Phase 2:
  - ✓ Supplier · ✓ Date · ✓ VAT · ✓ Line Items
  - Each item starts at `opacity:0, x:-4` and animates to visible; check icon scales in.

### Destinations (right)
- Two tiles stacked: Xero (existing `#13B5EA`-tinted tile) and QuickBooks (`#2CA01C` tile). Same color treatment as today so brand cues are preserved.
- Each tile gets a brief success glow (box-shadow pulse + `Check` badge fade-in) during Phase 4.

### Phase timing (single loop, ~9s, then repeats)

Driven by a top-level `useState` "phase" advanced by `setTimeout` chain inside a `useEffect`. One active doc index also cycles each loop so different documents are highlighted across loops.

```text
t=0.0s  Phase 1  doc cards fade/float in (stagger 80ms)
t=1.2s  Phase 2  active doc scales 1.05, gains teal ring, travels along
                 the left connector toward Outworx; connector line
                 illuminates left→right
t=2.4s  Phase 2  extraction checklist items reveal one-by-one
                 (Supplier, Date, VAT, Line Items, ~250ms apart)
t=4.0s  Phase 3  "Validated" pill fades in below engine; single radial
                 glow expands once and fades (scale 1→1.6, opacity 0.5→0)
t=5.2s  Phase 4  right connector illuminates; destination tile
                 (alternates Xero/QuickBooks per loop) receives success
                 glow + ✓ badge; "Ready to Publish" pill appears
t=7.5s  Phase 5  all transient elements fade out (opacity→0, 600ms)
t=8.5s  loop resets, active doc index increments, Phase 1 starts again
```

All motion uses `ease: [0.22, 0.61, 0.36, 1]` (smooth out-curve). No rotations beyond ±2°. No particles. Connector flow uses CSS `transition` on `strokeDashoffset` to stay GPU-cheap.

### Accessibility & performance
- Wrap the workflow in a check for `prefers-reduced-motion`: when reduced, render the final state (doc cards visible, "Validated" + "Ready to Publish" pills shown) with no looping animation.
- All animated elements use `transform`/`opacity` only.
- `will-change: transform` only on the moving active-doc element.
- Pause loop when card is offscreen via `IntersectionObserver` to save CPU on mobile.

## Out of scope (explicitly unchanged)
- Headline, subheadlines, CTA buttons, highlights row, section padding, grid.
- `authUrl`, `DemoTransitionLink`, routes, pricing/demo/login flows.
- Any other component, page, or global style. No new files, no new dependencies.

## Technical notes
- Only `framer-motion` + Tailwind + existing lucide icons.
- New lucide icons used: `Sparkles` (optional for engine), `CheckCircle2` for destination success — both already in `lucide-react`.
- Colors strictly via tokens: `primary`, `success`, `border`, `secondary`, `card`, `muted-foreground`, plus the existing `#13B5EA` / `#2CA01C` brand tints already present for Xero/QB.

