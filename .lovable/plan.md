# Premium demo-completion experience

All changes are additive and scoped to the final "Publish to ledger" step (step 7) of `src/pages/DashboardDemo.tsx`, plus a lightweight route-transition wrapper. Steps 1–6, trainer logic, keyboard nav, guided-tour auto-advance, archive/posted state, and the `publish()` callback signature are untouched.

## 1. PublishScreen — replace end buttons (Task 1)

In `PublishScreen` (lines 1475–1597), remove the `posted &&` button block (lines 1579–1594) containing **Restart tour / Explore features / Book a demo**. Nothing else in `PublishScreen` changes — the platform tiles, success banner, and archive table remain.

## 2. SuccessOverlay — animated success sequence + modal (Tasks 2, 2.5, 3, 4, 6, 7)

Add a new component **inside** `DashboardDemo.tsx` (kept local to avoid touching unrelated files):

`function SuccessOverlay({ open, onClose }: { open: boolean; onClose: () => void })`

Driven by `posted` state already lifted in `ViewDemo` (line 347). In `ViewDemo`'s render, mount `<SuccessOverlay open={posted && step === 7} onClose={...} />` as a sibling of the current shell — fixed-position, above the workspace, below the site Header.

### Timing (Task 2.5 — Option A, automatic)
Inside `SuccessOverlay`, a `useEffect` keyed on `open` runs a small sequencer using `setTimeout`s (cleared on unmount):

```text
t=0ms      open=true → success-sequence phase begins on the inline checklist
                       inside the publish screen (no overlay yet)
t=2400ms   backdrop fades in (opacity 0 → 0.55, 600ms ease-out)
           workspace remains visible behind it
t=2700ms   modal fades + scales in (opacity 0→1, scale 0.96→1, y 8→0, 500ms ease-out)
```

No new button is introduced to trigger the modal. The modal can be dismissed (Esc / backdrop click / small close `×`) which simply hides the overlay; the underlying posted state is preserved so the user can keep exploring the archive.

### Inline success sequence (Task 3)
Render a compact animated checklist **inside `PublishScreen`** (replacing the removed button row area) that activates only when `posted` is true. Stages, revealed one-by-one ~250ms apart with `framer-motion` (`initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }}`):

1. Document Uploaded
2. AI Extraction Complete
3. VAT & CIS Processed
4. Ready for Review
5. Published to Ledger
6. Workflow Complete

Each row: animated check icon (scale 0→1 spring), label, thin connector line that draws between rows using a `motion.div` scaling `scaleY` from 0→1. After the last row resolves, a "Workflow Complete" pill scales in with a soft `shadow-[0_0_40px_hsl(var(--primary)/0.35)]` glow.

### Modal content (Tasks 2, 6)
Centered card, `max-w-lg w-[calc(100%-2rem)]`, `rounded-2xl border bg-card`, `p-6 sm:p-8`, soft primary glow ring. Hierarchy:

- Small badge: animated check + "Workflow complete" (text-xs, primary tint)
- H2 headline: "This wasn't a demo. It was your future workflow." (`text-2xl sm:text-3xl font-semibold tracking-tight`)
- Subheadline: "One document saved minutes. Hundreds save weeks." (`text-base text-muted-foreground`)
- Short description (single paragraph, ≤2 lines on desktop): "You just watched Outworx process, validate, and publish a document automatically. Now imagine every invoice, receipt, statement, VAT review, and CIS deduction handled the same way."
- CTA row (stacks vertically `flex-col sm:flex-row`, full-width buttons on mobile):
  - **Primary** `Get Started` → `<Link to="/signup">` styled with existing primary button tokens
  - **Secondary** `View Pricing` → `<Link to="/pricing">` outline variant
- Trust line: "Trusted by accountants, bookkeepers, and finance teams across growing businesses." (`text-xs text-muted-foreground text-center mt-4`)

Subtle particle/confetti: ~14 small `motion.span` dots emitted from the headline area with randomised x/y and 1.2s fade — tasteful, not playful.

All colors via existing semantic tokens (`bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`, `text-primary-foreground`). No hardcoded hex.

### Responsiveness (Task 7)
- Modal width: `w-[calc(100%-2rem)] max-w-lg`; padding `p-6 sm:p-8`.
- CTAs stack vertically below `sm`, side-by-side above.
- Headline scales `text-2xl sm:text-3xl`.
- Backdrop uses `fixed inset-0` so it covers both desktop split-view and mobile single-column.

## 3. Route transitions (Task 5)

Wrap the demo page render with a `motion.div`:

```tsx
<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -4 }}
  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
>
```

Applied around `<ViewDemo />` inside the default export (lines 1660–1681) so entry into `/dashboard-demo` has the fade-up. Exit animation is best-effort (would need `AnimatePresence` at router level for full effect); we add the wrapper now so entry feels intentional without touching `App.tsx` routing. No perf impact — single transform/opacity tween.

## Out of scope (explicit)
- No changes to steps 1–6, `TopStepper`, `MobileStepBar`, `Trainer`, `signal()`, auto-advance thresholds, keyboard handlers.
- No changes to `generateInvoice`, `regenerate`, `publish` state semantics (only consumer behavior on step 7).
- No changes to Header / Footer / Seo / routing config / global CSS tokens.
- No new dependencies — `framer-motion` and `lucide-react` are already used.

## Verification
1. Run through steps 1–6: unchanged, auto-advance and trainer prompts identical.
2. Step 7 → click **Publish to ledger** → posted banner + archive row appear immediately; animated 6-stage checklist plays inline over ~1.5s.
3. ~2.4s after posting, background dims; ~300ms later modal fades+scales in with headline, CTAs, trust line.
4. **Get Started** routes to `/signup`; **View Pricing** routes to `/pricing`.
5. Esc / backdrop click closes modal; underlying published state remains.
6. Resize to 375px: modal fits with margin, CTAs stack, text readable, no overflow.
7. Navigate from `/` → `/dashboard-demo`: page fades up smoothly.
