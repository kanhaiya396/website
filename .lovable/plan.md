# Two minimal fixes to the demo

Scope: `src/pages/DashboardDemo.tsx` only. No workflow, trainer copy, step, routing, or interaction changes.

## 1. Trainer panel — remove scrollbar, keep same overall size

Current behavior: the trainer content sits inside a scroll container (`overflow-y-auto scrollbar-thin` on line 549), which produces a visible scrollbar at typical viewport heights.

Change (minimal):

- On line 549, drop `overflow-y-auto scrollbar-thin pr-1` from the inner wrapper, and remove `min-h-0` so it sizes to content. The trainer card keeps `h-full` and its existing outer padding, so the overall panel size stays the same.
- Tighten only the internal vertical rhythm so the four blocks (Your task, What happens, Why it matters, What's next) fit without scrolling:
  - Inner wrapper gap: `gap-3` → `gap-2`.
  - `TrainerSection`: `pt-3` → `pt-2.5`, body `mt-1.5` → `mt-1`.
  - "Your task" callout: `py-2.5` → `py-2`.
  - Header block: "Step X of Y" `mt-2` → `mt-1.5`.

These are 2–4px tweaks that recover ~16–24px of vertical space — enough to remove the scrollbar without changing the panel's outer dimensions or any text.

Mobile "Next step" button and keyboard navigation remain untouched.

## 2. Scale demonstration — make it visible and give it time to breathe

Root cause for invisibility: `TrackbarScaleOverlay` is absolutely positioned at `-top-[68px]` relative to the stepper wrapper (line 470). The page shell on line 463 uses `lg:overflow-hidden` and the column has very little top padding, so the pipeline labels + icon strip get clipped above the visible area and the animation never appears.

Change A — make it appear (positioning):

- Stepper wrapper (line 470): keep `relative`, add `z-30`.
- `TrackbarScaleOverlay` container: replace `-top-[68px]` with `absolute inset-x-0 top-0 z-30`, `pointer-events-none`, so it renders **on top of** the TopStepper instead of above it.
- Add a soft backdrop behind the labels/icons (`bg-gradient-to-b from-white/75 to-white/40 backdrop-blur-[2px] rounded-lg`) so the stepper recedes while the demo plays.
- Keep label and icon-swarm animations, sizes, and colors unchanged.

Change B — make it last long enough to be appreciated (timing):

The current timeline runs scale from 3000ms to 6800ms (~3.8s window) and individual icons fade out fast. Slow it down so each stage of the pipeline reads clearly:

- In the completion `useEffect` (lines 448–454):
  - `t2` (checklist → scale): keep at 3000ms.
  - `t3` (scale → modal): 6800ms → **10500ms**, giving the scale phase ~7.5s on screen.
- In `TrackbarScaleOverlay`:
  - Pipeline label stagger: `delay: 0.2 + i * 0.35` → `0.25 + i * 0.55` so the 5 stages light up over ~3s instead of ~1.6s.
  - Check-stamp spring delay: `0.35 + i * 0.35` → `0.4 + i * 0.55` to match.
  - Icon swarm `duration: 2.8` → **4.2**, and `times: [0, 0.12, 0.55, 0.85, 1]` → `[0, 0.08, 0.7, 0.92, 1]` so icons stay fully visible longer and only fade in the last ~8% of their travel.
  - Per-icon `delay` spread: `0.05 + (i % 11) * 0.09` → `0.1 + (i % 11) * 0.18` so the swarm enters in a longer, more readable wave.
  - Overlay exit `transition.duration`: 0.35 → 0.55 with `ease: [0.22, 1, 0.36, 1]` so the whole panel eases out gracefully instead of snapping.

Result: during the scale phase the user clearly sees the 5-stage pipeline (Upload → AI Extraction → Validation → VAT & CIS → Publish) with the document swarm flowing across the trackbar for ~7s, the stages lighting up one by one with their check stamps, then a smooth half-second fade before the completion modal opens.

Preserve `prefers-reduced-motion` short-circuit (skips straight to modal).

## Out of scope

Trainer copy, step logic, keyboard nav, routing, success modal/widget, particles, page transitions, mobile stepper, auth flow.
