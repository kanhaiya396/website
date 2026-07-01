# Port all three feature groups from Experimentation

Merge the missing pieces from the reference project into Outworx so they behave as if they'd always been here. No behavioural regressions, no dead code, no orphaned imports.

---

## 1. Voices carousel — arrow-button interactive marquee

**File:** `src/components/landing/Voices.tsx` (replace body)

Swap the plain CSS marquee for the reference implementation:
- Imports: add `useAnimationFrame, useMotionValue, useReducedMotion, animate` from framer-motion; add `ChevronLeft, ChevronRight` from lucide; add `useEffect, useLayoutEffect, useRef, useState` from react.
- Constants: `GAP = 24`, `SPEED = 40` (px/sec).
- State: `x` motion value, `paused`, `visible`, `edge` ("left" | "right" | null), `step`, `setWidth`.
- Refs: `cardRef`, `trackRef`, `sectionRef`, `resumeTimer`, `manualAnim`.
- `useLayoutEffect` measures card width + `trackRef.current.scrollWidth / 2` with a resize listener.
- `IntersectionObserver` on `sectionRef` toggles `visible`.
- `useAnimationFrame` drifts `x` by `-SPEED*delta/1000` and wraps at `±setWidth`; pauses on `reduce | paused | !visible | manualAnim`.
- `onMouseMove` on the section computes cursor ratio; sets `edge` to `"left"` when < 15%, `"right"` when > 85%, else null.
- `go(dir)` normalises current x, then `animate(x, target, { duration: 0.6, ease: [0.22,1,0.36,1] })`; pauses drift + arms 2.5s resume timer.
- `handleEnter` (pause + clear resume) / `handleLeave` (arm 2.5s resume) on both arrows.
- Two absolutely-positioned round chevron buttons (`h-10 w-10 rounded-full border border-border bg-card/80 backdrop-blur text-primary shadow-card-halo`) at `left-4` and `right-4`, top-1/2 -translate-y-1/2, opacity toggled by `edge === "left" | "right"`.
- Track becomes `motion.div` with `style={{ x }}`; card index 0 gets `ref={cardRef}`.
- Duplicate list wrapped so track scroll width = `2 × setWidth` for seamless wrap.

Header block above (motion.h2 title + eyebrow) is unchanged.

## 2. Light/dark theme system with header toggle

### 2a. `src/components/ThemeProvider.tsx` (rewrite)
- Read stored theme from `localStorage("app-theme")`; if absent, use `matchMedia("(prefers-color-scheme: light)")`.
- Track a `userChose` flag; while false, subscribe to `matchMedia change` and follow OS.
- Use `useLayoutEffect` (not useEffect) to apply the `.light` class + `document.documentElement.style.colorScheme` before first paint.
- On every change: set `documentElement.dataset.themeSwitching = "true"`, then `setTimeout(280ms)` to clear it.
- Keep the existing `useTheme` hook + context shape (`theme`, `setTheme`, `toggleTheme`) so no existing caller breaks.

### 2b. `src/components/ThemeToggle.tsx` (new)
Ported verbatim from reference: segmented Sun/Moon pill using shadcn `Tooltip`, `aria-pressed`, `aria-label`, keyboard-focus rings. Uses `useTheme` from ThemeProvider.

### 2c. `src/components/layout/Header.tsx` (small edit)
- Import `ThemeToggle`.
- Desktop CTA row: change `gap-3` → `gap-4`, mount `<ThemeToggle />` as the first child before "Log in".
- Mobile menu: add `<div className="flex justify-center pb-1"><ThemeToggle /></div>` at the top of the auth block.

### 2d. `index.html` (pre-paint script)
Add inline `<script>` in `<head>` that reads `localStorage("app-theme")` (fallback to OS preference), adds/removes `.light` on `documentElement`, and sets `colorScheme` — before React mounts, to kill the dark-flash on light-mode reloads.

### 2e. `src/index.css` (expand light-mode tokens + transitions)
Under the existing `.light { … }` block, add the reference's full overrides:
- All code-card tokens (`--code-bg`, `--code-key`, `--code-string`, `--code-number`, `--code-punct`, `--code-line`).
- All `--gradient-*` recipes retuned for white background.
- All `--shadow-*` softened.
- All `--sidebar-*` tokens.
- Adjusted primary / muted-foreground / success / warning / destructive HSL values for AA contrast.

Add (outside `.light`):
- `body { transition: background-color 280ms ease, color 280ms ease }`.
- `html[data-theme-switching="true"] *, *::before, *::after { transition: background-color 280ms, color 280ms, border-color 280ms, fill 280ms, stroke 280ms !important }`.
- `.site-ambient` utility (dark radial recipe) + `.light .site-ambient` (pale mint/blue recipe).
- `.light` variants of the four `.badge-*` classes (only if they exist in current file — check first; skip if absent to avoid dead selectors).
- `.scrollbar-thin-light` (only add if `.scrollbar-thin` exists in current file; skip otherwise).

### 2f. `src/pages/Index.tsx` (swap ambient)
Replace the inline `style={{ background: "radial-gradient(...)" }}` div with `<div aria-hidden className="pointer-events-none fixed inset-0 z-0 site-ambient" />` so the ambient auto-switches on theme toggle.

## 3. Hero copy tweaks + dead-code cleanup

### 3a. `src/components/landing/Hero.tsx`
- Replace `highlights` array with `["Human Review Included", "Supports Multiple Ledgers", "UK/EU GDPR Compliant"]`.
- Replace the sub-headline `<motion.p>` inner text with the reference copy: *"Turn invoices, receipts and bank statements into structured, VAT-ready bookkeeping. Review only the exceptions while Outworx prepares everything else for posting."* (drops the inline `<span>` bolds, which are the only nested-JSX in the old paragraph — no other refs to remove).

### 3b. `src/components/landing/HowItWorks.tsx`
- Delete the unused `CONNECTED_CHIPS` constant (declared, never referenced).

---

## Verification checklist (post-build)

1. `bun run build` succeeds with no unused-import warnings from touched files.
2. `/` renders identically in dark mode; Voices marquee still drifts left continuously.
3. Hover near the left/right edge of the Voices strip → chevron fades in; click → advances one card; drift resumes 2.5s after mouse leaves.
4. Header toggle switches between dark and light; page background, cards, shadows, gradients, and site-ambient all restyle within ~280ms with no flash.
5. Hard-reload while set to light mode → no dark flash before paint.
6. Mobile menu shows the ThemeToggle centred above "Log in".
7. `rg "CONNECTED_CHIPS|animate-marquee-x" src` returns nothing.
