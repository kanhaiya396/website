## Goal
Fix three issues on `/dashboard-demo`:
1. Two stacked navbars (site `Header` + ported demo chrome header).
2. AI extraction step lost its internal workspace scrollbar, causing the workspace to grow and push content off-screen.
3. Invoice panel can overflow on short viewports with no way to scroll it.

## Changes (single file: `src/pages/DashboardDemo.tsx`)

### 1. Remove the duplicate demo navbar
- Delete the inner `<header>` block (lines ~431-447) that re-renders an "Outworx / DEMO" logo bar.
- Keep the **Exit demo** button and **Step X of 7** pill — move them into the existing `TopStepper` row (right-aligned), so the trackbar sits directly under the site `Header`.
- On mobile, the existing `MobileStepBar` already carries the step info; append a small "Exit" link beside it so users can still bail out.
- Site `Header` (with Product/Pricing/Blog/API + Log in / Get started) remains untouched — it becomes the only navbar.

### 2. Restore original view-demo sizing so the workspace owns its scroll
The current port replaced the reference project's `lg:h-[100dvh] lg:overflow-hidden` + `min-h-0 flex-1` pattern with a fixed `minHeight` style. That broke inner overflow containment (visible on the AI extraction step).

Restore the reference pattern, adjusted for the site chrome:
- Outer shell: `flex min-h-screen flex-col lg:h-[calc(100dvh-4rem)] lg:overflow-hidden` (4rem = site Header height).
- Grid container: add back `flex-1 lg:min-h-0 lg:items-stretch`.
- `<main>` column: add back `lg:min-h-0`.
- Workspace wrapper: revert to `flex min-h-0 flex-1 flex-col` (drop the inline `minHeight` style).
- Render the site `Footer` only outside the `lg:overflow-hidden` region — i.e. keep the page wrapper as `min-h-screen flex-col`, but the demo region itself becomes a fixed-height viewport on `lg`, matching the original behaviour. On smaller breakpoints it falls back to natural scrolling and the Footer appears below as today.

This automatically restores the inner scrollbar inside the AI extraction `WorkspaceLayout` (it already uses `scrollbar-thin-light min-h-0 flex-1 overflow-y-auto`, which only works when its ancestors propagate `min-h-0`).

### 3. Conditional scrollbar for the invoice panel
- Wrap the invoice card content in a flex column with `min-h-0 flex-1` and add `overflow-y-auto scrollbar-thin-light` on the inner content container.
- Because the parent already has a bounded height (from fix #2), the scrollbar only appears when the invoice exceeds available height — exactly the requested behaviour.

## Out of scope
- No changes to site `Header`, `Footer`, routing, services, auth, SEO, or any other page.
- No visual restyle, no branding changes, no new dependencies.
- Step logic, keyboard nav, mock data, and the 7-step workflow remain identical.

## Verification
- Build + type-check clean.
- `/dashboard-demo` shows only the site Header, then the stepper row with the "Step N of 7" pill and "Exit demo" button on the right.
- Click through all 7 steps; on the AI extraction step the workspace stays the same size and scrolls internally.
- Resize viewport short vertically on the AI extraction step → invoice panel gains its own scrollbar; at normal heights it does not.
- "Exit demo" returns to `/`.
