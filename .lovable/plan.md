# Redesign the Scale Demonstration Overlay

The current scale overlay reads as cluttered: tiny mixed-color icons flying across a thin strip, label chips with check stamps that compete with the swarm, and a flat white wash that hides the trackbar underneath. It animates, but it doesn't feel premium. The redesign keeps the same timing window and the same conceptual story (many documents flowing through the 5-stage pipeline) but rebuilds the visual language so it lands like a high-end SaaS moment.

## Visual concept

Cinematic "throughput" view of the pipeline. A dark, glassy panel sits on top of the trackbar with a soft vignette. Five clearly-named stages form a connected rail with a luminous progress beam sweeping across them. Documents travel as small glass cards (not raw icons) along that rail, getting "stamped" as each stage activates. A live counter ticks up to reinforce scale. The whole thing feels like one composed scene, not scattered motion.

## Concrete changes (scoped to `TrackbarScaleOverlay` in `src/pages/DashboardDemo.tsx`, lines ~1779-1878)

### Backdrop and frame
- Replace the white wash with a dark glass panel: `bg-gradient-to-b from-slate-950/85 via-slate-900/80 to-slate-950/85 backdrop-blur-md`, rounded-xl, subtle inner ring (`ring-1 ring-white/10`), soft outer glow shadow in emerald.
- Add a top-row caption: small uppercase label on the left ("Live throughput · scaling demo") and a live counter on the right that ticks `0 → 1,248 invoices` over the window, in emerald, tabular-nums.

### Pipeline rail
- Render the 5 stages as a single horizontal rail: stage pills connected by a thin track line behind them.
- A glowing emerald beam (gradient, blurred) sweeps left-to-right along that track over the full window, lighting each stage as it passes (stage pill transitions from muted slate to active emerald with a soft halo).
- Stage pills: dark glass (`bg-white/5 ring-1 ring-white/10`), label in `text-[10px] font-medium tracking-wide text-slate-300`, becomes `text-emerald-200` + emerald ring when the beam reaches it. Drop the per-stage check stamp; replace with a tiny dot indicator that fills as the stage activates.

### Document flow
- Replace the 22 raw lucide icons with ~14 small "document cards": rounded-md, ~18×22px, dark glass with a faint emerald top edge and a 1px white/10 ring. Inside each card, a single small icon (`FileText`/`Receipt`/`FileCheck2`) in muted white, plus two thin lines suggesting text.
- Cards travel along the rail (same horizontal track as the beam), not in a separate strip. Slight vertical jitter (±4px), gentle scale-in at entry, scale-out + blur at exit.
- Stagger preserved across the full ~7.5s window. Easing `[0.22, 1, 0.36, 1]`. Trails: each card leaves a faint emerald motion streak (a thin gradient div with low opacity) for ~120ms.

### Finish state
- At ~85% of the window, all 5 stage pills are lit, the beam parks at the right edge with a soft pulse, and the counter settles on its final number. Then the overlay exits with the existing 0.55s ease-out.

### Layout / sizing
- Overlay height grows slightly (rail + caption row) but still sits as `absolute inset-x-0 top-0 z-30 pointer-events-none` over the TopStepper. No layout shift in the page; stepper underneath continues to be visually recessed by the dark glass.

## Out of scope
- Timing window (`t3` stays 10500ms), trainer panel, step logic, keyboard nav, success modal, routing, auth.
- No new dependencies; uses existing `framer-motion` + lucide icons + Tailwind tokens already in the file.

## Technical notes
- All new color usage goes through Tailwind tokens already present (slate/emerald/white-alpha). No hardcoded hex.
- Counter uses a `useMotionValue` + `useTransform` + `animate()` from framer-motion (already imported) to tween a number, rendered via `motion.span`.
- Beam is a single absolutely-positioned `motion.div` with a radial/linear emerald gradient and `blur-md`, animating `left: -10% → 105%`.
- Stage activation derives from beam position via either staggered `delay` per pill or a shared `useTransform` on the beam's motion value — whichever keeps the code local to the component.
