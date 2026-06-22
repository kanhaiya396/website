# Hero Refinement Plan

Scope: edit only `src/components/landing/Hero.tsx`. No layout, container size, route, CTA, headline, or spacing-shell changes. Hero section padding, grid, and the `h-[440px]` animation container stay identical.

## Part 1 — Trust Section (left column, above headline)

Replace the current 4-pill row (still inside the same `mb-8` slot) with a two-line credibility block:

1. Eyebrow line: `Built for modern accountants & bookkeepers`
   - White text (`text-white`), `text-xs uppercase tracking-[0.18em] font-medium`
   - Subtle teal dot before it (`h-1 w-1 rounded-full bg-primary`) for visual anchor
   - Fades in first (`opacity 0→1`, `y 4→0`, 0.4s)
2. Badge row beneath it: ✓ Xero Ready · ✓ QuickBooks Ready · ✓ UK VAT Workflows · ✓ Human Review Controls
   - Each badge: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-white border border-white/10 bg-white/[0.03] backdrop-blur-sm`
   - Check icon in teal (`text-primary`), badge text white
   - Soft outer glow via `shadow-[0_0_0_1px_hsl(var(--primary)/0.08)]`
   - Stagger in one-by-one (`y 8→0`, opacity, delay `i*0.1`, ease `[0.22,0.61,0.36,1]`)
   - Single one-shot glow pulse on the box-shadow (runs once, then stops — no infinite loop)
   - Hover: `hover:-translate-y-0.5`, `hover:border-primary/40`, `hover:shadow-[0_0_14px_hsl(var(--primary)/0.25)]`, transition 200ms

Goal: reads as a unified credibility statement instead of four floating pills, without growing vertical height (eyebrow + row fits in the existing `mb-8` slot; if needed, tighten badge `py` to keep total height ≈ current).

## Part 2 — Workflow Animation (right column, container unchanged)

Container stays exactly `relative h-[440px] w-full`. Only internal composition and motion change.

### Documents column (left lane)
- Same 6 docs: Invoice, Receipt, Bank Statement, Credit Note, Supplier Statement, Sales Invoice
- Convert from evenly-spaced floats into a clean **queue**:
  - Consistent `gap-1.5`, uniform row height, left-aligned icon + label
  - Subtle stacking depth: inactive rows `opacity-70`, active row `opacity-100` + teal border + soft glow + slight `x: 2` nudge
  - Remove the per-row infinite `y` float (felt jittery); replace with a single very gentle breathing on the active row only
  - Only one active doc at a time (already true) — emphasize via clearer contrast

### Outworx engine (center)
- Keep centered, same size (`h-20 w-20`)
- Add a **soft rotating ring**: an absolutely-positioned `rounded-full border border-primary/20` slightly larger than the core, rotating 360° over ~12s linear (slow, premium)
- Add a **breathing halo**: scale 1 → 1.06 → 1 over 3.5s ease-in-out infinite on a blurred backing disc
- Keep `Sparkles` icon; remove the harsh box-shadow pulse keyframe — replace with a gentler opacity breathe on the halo
- Label `Outworx` stays under the core

### Extraction sequence (below core)
- Add a small "Reading document…" line that appears at phase 2 start, then fades as fields tick in
- Fields appear one-by-one (Supplier ✓, Date ✓, VAT ✓, Line Items ✓) with slower stagger (`0.35s` between each) so it's easier to follow
- After all fields: show a compact 3-step status stack in sequence:
  - ✓ Extracted
  - ✓ Validated
  - ✓ Ready to Post
  - Each appears with 0.25s gap, teal check icons, white text

### Flow path & destinations (right lane)
- Keep SVG connector concept; refine:
  - Slow the dash animation (`dur="1.6s"` instead of 1.2s) for premium feel
  - Slightly thicker active stroke, softer base line opacity
- Xero / QuickBooks cards: keep current brand colors and positions
- On routing phase: destination card gets a soft success glow (single pulse, not repeating) + `CheckCircle2` tick
- "Ready to Publish" pill stays

### Travelling doc
- Smooth left→center motion already exists; refine easing and reduce scale jump (`1 → 1.03 → 0.92` instead of `1.05 → 0.8`) for a more controlled feel

### Spacing & balance inside the 440px container
- Tighten center column vertical rhythm so the extraction list + status stack + validated pill fit cleanly without empty zones
- Use `grid-cols-[1fr_auto_1fr]` (unchanged) but adjust internal `gap` and per-lane padding to balance three lanes visually
- All motion uses `ease: [0.22, 0.61, 0.36, 1]`, no rotations >360° on ring, no flashy effects
- Respect `prefers-reduced-motion` (already wired) and `IntersectionObserver` pause (already wired)

## Out of scope (unchanged)
- Section padding, grid, container widths, `h-[440px]` animation height
- Headline, subheadlines, CTAs, highlights row, `authUrl`, `DemoTransitionLink`
- Any other component, page, route, or global style
- No new dependencies; framer-motion + Tailwind + existing lucide icons only
- Colors via existing tokens (`primary`, `success`, `border`, `secondary`, `muted-foreground`, `white/*`) + existing brand tints `#13B5EA` / `#2CA01C`
