# View Demo — Completion Experience Polish

All changes are UX-only. Existing step logic, trainer content, keyboard nav, routing, and `signal()` / `publish()` semantics are untouched. No new packages.

## 1. Completion pacing (Task 1 + 8)

In `DashboardDemo.tsx`:

- Keep the existing `posted` trigger on the final "Publish to Ledger" step.
- After `posted` becomes true, run a single timeline (all `framer-motion`, `ease: [0.22,1,0.36,1]`):
  - t=0.0s — workspace stays visible, `TopStepper` runs its left→right sweep + sequential per-step pulse (already implemented, slow it: stagger 0.18s, pulse 0.6s).
  - t≈1.4s — `WorkflowCompleteSequence` checklist plays (already exists, retimed: each row 0.5s, stagger 0.25s).
  - t≈3.0s — Scale demonstration begins inside the trackbar (Task 2).
  - t≈6.5s — Completion modal fades in (Task 4).
- Replace the current ~2.6s `setTimeout` with a single state machine: `completionPhase: 'idle' | 'sweep' | 'checklist' | 'scale' | 'modal'`, driven by `setTimeout`s cleared on unmount and on user minimize/expand.
- No new workflow steps, badges, or structural changes.

## 2. Scale demonstration moved into the trackbar (Task 2)

- Remove `ScaleSequence` from `PublishScreen` (it currently renders below the workspace and is easy to miss).
- Add a new `TrackbarScaleOverlay` rendered as an absolutely positioned layer directly above `TopStepper`, only while `completionPhase === 'scale'`.
- Stage A — Document swarm (≈1.6s):
  - ~22 mixed icons (`FileText` invoice, `Receipt`, `Landmark` statement, `FileCheck2` credit note, `Sparkles`+badge for CIS) fade/scale in from slightly varied y offsets above the trackbar. Organic, not numeric; no counters.
- Stage B — Flow through pipeline (≈1.9s):
  - Icons drift left→right across the 5 trackbar nodes (Upload → AI Extraction → Validation → VAT & CIS → Publish — re-using existing step labels visually).
  - As the leading edge of the swarm passes each node, that step gets an emerald glow + `CheckCircle2` stamp pulse.
- Stage C — Settle (≈0.4s): icons fade out at the Publish node, trackbar returns to its completed state.
- Motion specs: per-icon `duration: 1.4s`, `delay: i * 0.04`, slight `rotate` jitter ±4°, opacity 0→1→0.9→0, blur 4px→0. Respect `prefers-reduced-motion` (skip directly to modal).

## 3. Branded celebration (Task 3)

In `SuccessOverlay`:

- Replace current particle mix with 4 particle types, ~28 total:
  - `FileText` (Outworx teal)
  - `CheckCircle2` (emerald)
  - `Sparkles` (Outworx teal-light, AI feel)
  - Small filled dots in `--primary` / teal
- Slower drift: `duration: 2.2–2.8s`, ease-out, fade tail. No confetti shapes, no rainbow colors.

## 4. Completion modal (Task 4)

Update `SuccessOverlay` content:

- Headline: "This wasn't a demo. It was your future workflow."
- Subheadline: "One document saved minutes. Hundreds save weeks."
- Body: "You just watched Outworx process, validate and publish a document automatically. Now imagine every invoice, receipt, statement, VAT review and CIS deduction handled the same way."
- Primary CTA: "Get Started" → `/signup?from=demo`
- Secondary CTA: "View Pricing" → `/pricing`
- Entrance: backdrop `backdrop-blur-md` fade 350ms; card `opacity 0→1`, `scale 0.96→1`, `y 12→0`, 450ms, ease `[0.22,1,0.36,1]`.

## 5. Minimize → premium floating card (Task 5)

- Remove the close (X) button from `SuccessOverlay` entirely.
- Top-right action becomes a single Minimize button (`Minus` icon, ghost style, tooltip "Minimize").
- `FloatingSuccessWidget` upgrade:
  - Size ~340×200px, glassmorphism: `bg-card/70 backdrop-blur-xl border border-border/60 shadow-2xl`, gradient ring accent in Outworx teal.
  - Content:
    - Headline: "✓ You've seen the process."
    - Sub: "Now make it yours."
    - Buttons: "Get Started" (primary, → `/signup?from=demo`), "View Pricing" (outline, → `/pricing`).
    - Expand control: dedicated `Maximize2` icon button top-right + the whole card surface (excluding buttons) is clickable to expand.
  - Draggable via pointer events, clamped to viewport, persists position in component state (not localStorage). `z-50`, stays above page content.
- State machine in `ViewDemo`: `successState: 'hidden' | 'modal' | 'widget'`. Minimize → `'widget'`. Expand → `'modal'`. No state is ever lost; both views render from the same source.

## 6. Demo → Login "Back to Demo" (Task 6)

Scoped, non-global behavior:

- In `WorkflowCompleteSequence` modal + `FloatingSuccessWidget`, the "Get Started" link uses `to="/signup?from=demo"`. The signup page passes `from=demo` through to its "Already have an account? Log in" link (`/login?from=demo`).
- In `AuthLayout.tsx`, read `useSearchParams()`:
  - If `from === 'demo'`, render `← Back to Demo` linking to `/dashboard-demo`.
  - Otherwise, keep current `← Back to home` → `/`.
- Only `AuthLayout` changes; no global router or header changes. Users entering via navbar or homepage links are unaffected (no query param present).
- Update `Login.tsx` and `Signup.tsx` cross-links to preserve the `from` query param when navigating between login/signup.

## 7. Homepage → View Demo page transition (Task 7)

- The existing `motion.div` wrapper on `ViewDemo` is already a fade+scale. Retune to:
  - `initial: { opacity: 0, y: 8, scale: 0.995 }`
  - `animate: { opacity: 1, y: 0, scale: 1 }`
  - `transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }`
- Add the same wrapper to `Index.tsx` main content (so leaving the homepage also fades) — only a presentational `motion.div`, no router-level changes.

## 8. Animation quality pass (Task 8)

Audit constants in `DashboardDemo.tsx`:

- All new sequences use ease `[0.22, 1, 0.36, 1]` and ≥350ms per stage.
- Add `prefers-reduced-motion` short-circuit: skip trackbar scale and particle effects, go straight to modal with a simple 200ms fade.

## Files touched

```text
src/pages/DashboardDemo.tsx     - completion phase machine, TrackbarScaleOverlay,
                                   SuccessOverlay copy/CTAs/particles, widget upgrade,
                                   remove old ScaleSequence usage, retimed motion
src/pages/auth/AuthLayout.tsx    - conditional "Back to Demo" via ?from=demo
src/pages/auth/Login.tsx         - preserve ?from on signup link
src/pages/auth/Signup.tsx        - preserve ?from on login link
src/pages/Index.tsx              - presentational motion.div wrapper for transition
```

## Out of scope

Step copy, trainer logic, keyboard nav, routes, header/footer, global CSS, `STEPS`/`CLIENTS`/`generateInvoice`, mobile stepper, browser frame, tour drawer, any backend.
