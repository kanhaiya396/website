# View Demo — UX Enhancements

All changes are scoped to `src/pages/DashboardDemo.tsx`. No changes to step logic, trainer copy, workspace interactions, routing, or `signal()` / `publish()` semantics.

---

## 1. Trainer panel fits the viewport (no Back button)

**`TrainerVertical` (lines 495–552)**
- Remove both desktop and mobile **Back** buttons (lines 524–531 mobile Back, lines 541–549 desktop Back).
- Keep the mobile **Next step** button only (drop the flanking Back, change `flex-1` → `w-full`).
- Wrap card body so it fills aside height and scrolls only inside if overflow:
  - Outer card: `h-full max-h-full flex flex-col` instead of just `flex flex-col gap-4`.
  - Add an inner scroll region around the three `TrainerSection`s + Task block: `<div className="flex-1 min-w-0 overflow-y-auto scrollbar-thin pr-1 space-y-4">`.
  - Header (Trainer badge + step number + title) stays outside the scroll region so it's always visible.
- Reduce vertical density slightly: `p-5` → `p-4`, `gap-4` → `gap-3`, section `pt-3` → `pt-2.5`, title `text-lg` → `text-base`. Keeps all sections visible at ~720px viewport heights without scroll on desktop.

**Aside container (line 470)**
- Already `lg:col-span-3 lg:min-h-0`; add `lg:h-full` so the trainer matches workspace height exactly. Outer grid already uses `lg:h-[calc(100dvh-4rem)] lg:overflow-hidden` + `lg:items-stretch`, so trainer will lock to the visible workspace.

**Keyboard nav (lines 412–421)** — unchanged. ←/→ still drive `prev`/`next`.

---

## 2. Completion sweep on the top stepper

**`TopStepper` (lines 639–682)**
- Accept new optional prop `posted: boolean`.
- When `posted && step === 7`:
  - Add a `motion.div` overlay inside the `outworx-card` ol container that sweeps left→right (`initial={{ x: '-100%' }} animate={{ x: '100%' }}`, duration 1.2s, ease `[0.22,1,0.36,1]`), a thin `bg-gradient-to-r from-transparent via-[hsl(152_70%_55%/0.45)] to-transparent` band. Pointer-events none.
  - Each step number circle (`done`) gets `animate-pulse`-style sequential glow via `motion.span` with `transition={{ delay: i*0.12 }}` and `boxShadow` keyframes (`0 0 0 0` → `0 0 18px hsl(152 70% 50% / 0.6)` → `0 0 0 0`).
- Pass `posted` from `ViewDemo` (already in scope) at line 447.

No structural change — only a decorative overlay + per-step glow.

---

## 3. Scale demonstration animation (pre-modal)

New component `ScaleSequence` rendered inside `PublishScreen` after `WorkflowCompleteSequence` when `posted` is true. Plays once, ~2.2s total, finishes before the modal opens at 2600ms.

- Stage A (0–700ms): grid grows `1 → 5 → 20 → 50` document tiles (small invoice-shaped cards using existing `SampleInvoice` proportions, simplified). Counter chip "1 doc" → "50 docs" with `AnimatePresence` swap.
- Stage B (700–2100ms): five pipeline columns — Upload, AI Extraction, Validation, VAT & CIS, Publish. A burst of small doc icons flows across columns; each column lights up (`bg-emerald-500/10 ring-emerald-500/40`) and stamps a `CheckCircle2` with spring scale-in as the wave passes.
- Premium tone: thin emerald gradients, no bouncy easings on the columns, `ease: [0.22, 1, 0.36, 1]`.

This is purely visual; the existing `WorkflowCompleteSequence` checklist stays. The `setTimeout(setSuccessOpen, 2600)` (line 432) is preserved.

---

## 4. Branded celebration particles

**`SuccessOverlay` (lines 1646–1764)** particle layer (lines 1696–1706):
- Replace plain emerald dots with mixed branded particles: `FileText`, `CheckCircle2`, `Sparkles`, and a small dot. ~22 particles, randomized icon + tint between `text-emerald-500`, `text-[hsl(172_60%_50%)]` (Outworx teal), `text-emerald-400`.
- Slightly longer arcs (`y: -80 - rand*200`), random `rotate`, stagger 0.05s.
- Same `pointer-events-none` overflow-hidden container.

Headlines, subheadline, supporting text, and CTAs already match the spec — left as-is.

---

## 5. Minimize → draggable floating widget (replaces close X)

**`SuccessOverlay` API change**
- Replace `onClose` semantics with `onMinimize`. Wire the existing top-right `X` button (lines 1750–1757) to call `onMinimize` and swap the icon to `Minus` (lucide) with `aria-label="Minimize"`. Esc key (line 1649) also triggers minimize.
- Backdrop click currently calls `onClose` — keep it but route to `onMinimize` so the modal collapses rather than dismissing entirely.

**`ViewDemo` state**
- Replace `successOpen` with `successState: 'hidden' | 'modal' | 'widget'`.
- Effect at lines 430–436: on `posted && step===7`, after 2600ms set `'modal'`. On step change away from 7 or `posted=false`, set `'hidden'`.
- Pass `open={successState==='modal'}` to `SuccessOverlay`; `onMinimize` sets `'widget'`.

**New `FloatingSuccessWidget` component** (rendered via `createPortal` to `document.body`):
- Shown when `successState === 'widget'`.
- Default position: `bottom: 24, right: 24` (CSS px). Track via `useState<{x,y}>` initialized to those.
- Draggable: `pointer` events on a drag handle (top bar of the widget). Track offset between pointer and widget origin, update `position: fixed; left/top` while dragging. Constrain inside viewport with `Math.max/min` against `window.innerWidth/Height` minus widget size. Touch supported via Pointer Events API (no extra deps).
- Visual: compact card (`w-[260px]`, rounded-2xl, `bg-card border shadow-glow-lg`), small green check pill `✓ Future Workflow`, two buttons `Get Started` (Link to `/signup`, primary emerald) and `Pricing` (Link to `/pricing`, ghost). Small "Expand" icon button (top-right) sets state back to `'modal'`.
- Spawn animation: `framer-motion` `initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity:1, y:0, scale:1 }}`.

---

## 6. Page transition polish

Already in place at lines 1841–1846 (fade-up 0.35s ease). Tighten to spec: keep duration 0.4s, ease `[0.22,1,0.36,1]`, also add `scale: 0.995 → 1`. No routing changes.

---

## Out of scope (untouched)
- `STEPS`, `CLIENTS`, `generateInvoice`, `publish`, `signal`, `markProcessed`, all `StageContent` screens 1–6, `Trainer` content strings, `MobileStepBar`, `TourDrawer`, `BrowserFrame`, Header/Footer/Seo/routing/global CSS, dependencies (no new packages — `framer-motion` already imported, `Minus` icon comes from existing `lucide-react`).

## Verification
- Steps 1–6 render and progress identically; ←/→ keys still navigate; no Back button visible on desktop or mobile trainer.
- At 1366×768 and 1280×720 desktop heights, trainer shows Task + What happens + Why + What's next without page scroll; if very short viewport, inner trainer area scrolls, header stays pinned.
- Step 7: stepper sweep + per-step glow plays once; `ScaleSequence` plays ~2.2s; checklist animates; modal appears ~2.6s after publish with branded particles.
- Modal top-right button is a minimize icon; clicking it (or Esc, or backdrop) collapses to a draggable bottom-right widget with `✓ Future Workflow`, `Get Started` → `/signup`, `Pricing` → `/pricing`. Widget remains while exploring; Expand re-opens the modal.
- Mobile (≤lg): layout unchanged; trainer still stacks below workspace; no Back button; widget still works (drag via touch).
