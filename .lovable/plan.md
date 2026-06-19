# Conveyor Belt Animation — Inline Trackbar Redesign

Replace the current 5-parallel-lane wave with a **single, clean conveyor belt** that runs inside the existing trackbar after the last step completes. Professional, restrained, one continuous belt — not five.

## Concept

One horizontal conveyor belt spans the full trackbar width. A small document chip rides the belt, passing through 5 inline "stations" that correspond to the existing pipeline stages: `Upload → AI Extraction → Validation → VAT & CIS → Publish`. Each station activates (icon lights, soft pulse) as the chip arrives, then dims as it leaves. A live counter on the left ticks 0 → **500+**.

The chip itself morphs subtly at each station to reinforce what's happening:
1. **Upload** — paper icon flattens into a glowing digital sheet (scale Y 0.6 → 1, brightness up)
2. **AI Extraction** — a thin scanner line sweeps top→bottom across the chip; tiny data dots fly off
3. **Validation** — a check-mark ring traces around the chip
4. **VAT & CIS** — small £/% badges flash on the chip
5. **Publish** — chip folds/shrinks into a small vault/folder icon at the end

The belt loops continuously for the duration of the scale phase (~7s) with 2–3 chips spaced along it so the line always feels alive, but only one chip is "featured" per cycle.

## Layout (inside existing trackbar height)

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ ● 500+         ╔══════════════════════════════════════════════════════╗ │
│   invoices     ║ ▸▸▸ [doc]──────●──────●──────●──────●──────[vault] ▸▸ ║ │
│   processed    ║  Upload    Extract  Validate  VAT    Publish         ║ │
│                ╚══════════════════════════════════════════════════════╝ │
└──────────────────────────────────────────────────────────────────────────┘
```

- Left zone: pulsing dot + counter ticking to **500**, rendered with a trailing **`+`** glyph (e.g. `500+`) once the count lands. Label: "invoices processed".
- Right zone: the conveyor — a single rounded track with subtle belt-tread motion (repeating diagonal stripes drifting right at constant speed), 5 station markers evenly spaced, station labels underneath.

## Counter rendering

- `useMotionValue(0)` animated to 500 over ~6.3s, `ease: [0.22, 1, 0.36, 1]`.
- Display: `<motion.span>{rounded}</motion.span><span>+</span>` — the `+` is always rendered next to the number so the final readout is `500+`. Mono / tabular-nums so width doesn't jitter.

## Motion details

- **Belt tread**: CSS repeating-linear-gradient on the track background, `background-position-x` animated linearly and infinitely.
- **Chip travel**: chip moves `left: -8% → 108%` over 4.5s, `ease: linear`. 2 chips offset by 2.2s so the belt is never empty.
- **Station activation**: each station icon scales 1 → 1.25 → 1 and its ring glows emerald when the chip's x is within ±6% of the station's x (`useMotionValueEvent` on chip `left`).
- **Chip morph**: inner content swaps based on the station being passed (paper → scanned sheet → checked → tagged → folder), crossfade ~200ms.
- **No more 5 parallel lanes, sweeping beams, or flying data chips** — single belt only.

## Color & finish

- Track: `bg-white/[0.04]`, `ring-1 ring-white/8`, inner shadow for depth.
- Belt tread: subtle white 4% diagonal stripes, low contrast.
- Stations: idle `bg-slate-700/60 ring-white/10`; active `bg-emerald-500/20 ring-emerald-300/60 shadow-[0_0_10px_rgba(16,185,129,0.6)]`.
- Chip: slate gradient with emerald hairline ring; never larger than belt height.
- Counter: existing emerald style; `+` matches the numeric color/weight.

## Files to change

- `src/pages/DashboardDemo.tsx`
  - Replace `TrackbarScaleInline` (lines 1809–1931) with the new conveyor-belt implementation.
  - Keep `TRACKBAR_PIPELINE` constant and the `scaleActive` plumbing in `TopStepper` exactly as-is.
  - Keep counter target at 500; render as `500+`.

## Out of scope

- No changes to `completionPhase` state machine, `TopStepper` switching logic, success overlay, or any other component.
- No new dependencies.
