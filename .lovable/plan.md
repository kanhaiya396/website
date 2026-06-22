## Fixes to `WorkflowAnimation` in `src/components/landing/Hero.tsx`

### 1. Clean up corners on the active doc card

The squarish "halo" around the highlighted card comes from the pulse overlay (`<motion.span>` with `border border-primary/40`) that scales to 1.05 and visually clips outside the parent's rounded corners. Fix:

- Match the overlay radius to the card (`rounded-xl`).
- Remove the scale-up pulse on the border ring; replace with a static inner ring + the existing soft `shadow-[0_0_22px_...]` glow so the corner shape stays consistent.
- Add `overflow-hidden` is NOT needed — instead keep the overlay at `inset-0` with the same `rounded-xl` and animate opacity only.

### 2. "Falling document" animation into the Outworx engine

Replace the current static "highlight then status changes" flow with a 4-beat per-cycle sequence:

```text
beat 1 (select, 900ms)  — chosen card highlights and lifts (y: -6, scale: 1.04)
beat 2 (drop,   700ms)  — a clone of the active card detaches from its card
                          position, flies on a curved path down to the Outworx
                          circle, fading + scaling down as it enters
beat 3 (process,1200ms) — original card returns to rest; Outworx halo/pulse
                          intensifies; status bar shows "Extracting → Validating"
beat 4 (publish,1200ms) — destination tile lights up; status bar shows
                          "Posted to Xero/QuickBooks"
then pause 700ms, advance to next doc.
```

Implementation details:

- Add refs: `cardRefs = useRef<(HTMLDivElement|null)[]>([])` for each doc card and `engineRef = useRef<HTMLDivElement|null>(null)` for the Outworx circle.
- On `select → drop` transition, measure the active card's rect and the engine's rect (relative to the workspace container, also refed). Compute `{dx, dy}` from card center to engine center.
- Render a single absolutely-positioned "flying clone" inside the workspace (same icon + label as the active doc, styled like the highlighted card). It mounts at the card's position and animates:
  - `x: [0, dx*0.5, dx]`
  - `y: [-6, dy*0.4, dy]`  (arc — peak then drop)
  - `scale: [1, 0.85, 0.5]`
  - `opacity: [1, 1, 0]`
  - `rotate: [0, -3, 4]` for a subtle paper-flip feel
  - `transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], times: [0, 0.5, 1] }`
- Original card stays in place but dims/lifts during `select`, then settles back during `process`.
- Recompute positions on `resize` (single `ResizeObserver` on the container) so it stays correct across breakpoints.
- Respect `useReducedMotion`: skip the flying clone entirely; just highlight → status.

### 3. Phase loop timing

Update `T`:
```
select: 900, drop: 700, process: 1200, validate: 1200, publish: 1400, pause: 700
```
Status bar text mapped per phase:
- select → "Reading document…"
- drop   → "Capturing {label}…"
- process→ "Extracting fields…"
- validate → "Validating VAT…"
- publish → "Posted to {Xero|QuickBooks}"
- pause  → "Ready"

### Out of scope

Workspace container size, layout positions, trust strip, hero copy, CTAs — all unchanged.
