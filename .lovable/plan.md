## Goal

Match the original view-demo layout shown in the reference: stepper row at the very top of the viewport, browser-frame workspace below it, vertical Trainer panel on the right — with no site marketing header, no "Exit demo" button, and no "Step X of 7" pill. Restore working internal scrollbars in the AI-extraction workspace and add a conditional scrollbar to the invoice panel.

## Scope

Only `src/pages/DashboardDemo.tsx`. No routing, services, SEO, auth, or other page changes. SEO `<Seo>` tag is preserved (head-only, invisible).

## Changes

1. **Remove site chrome from the demo page** (lines 1672–1689). Replace the wrapper that mounts `<Header />` / `<Footer />` with a minimal wrapper that only renders `<Seo … />` + `<ViewDemo />`. The demo owns the full viewport, exactly like the original `view-demo` project.

2. **Restore full-viewport shell sizing** (line 429). Change
   `flex min-h-[calc(100dvh-4rem)] flex-col lg:h-[calc(100dvh-4rem)] lg:overflow-hidden`
   back to
   `flex min-h-screen flex-col lg:h-[100dvh] lg:overflow-hidden`
   so the demo no longer subtracts the (now-removed) site header height. This is what keeps the workspace bounded so its internal scrollbar can appear in the AI-extraction step.

3. **Remove the "Step X of 7" pill and "Exit demo" button** in the desktop TopStepper row (lines 436–444). Collapse that row to just `<TopStepper … />` inside the existing flex container so the trackbar sits flush at the top, matching the reference image.

4. **Remove the "Exit" link in the mobile step bar** (lines 565–570 inside `MobileStepBar`). Keep the step counter, title, and "Steps" menu button — same as the original.

5. **Invoice panel scrollbar** (line 1384). Keep the conditional pattern but drop the `220px` offset (no site header to account for now) and switch to a viewport-relative cap so it only scrolls when the invoice exceeds available height:
   `lg:sticky lg:top-0 lg:self-start lg:max-h-[calc(100dvh-140px)] lg:overflow-y-auto scrollbar-thin-light`
   At normal heights the invoice fits and no scrollbar shows; at short viewports the invoice panel scrolls independently.

6. **Workspace scrollbar.** No structural change needed beyond step 2 — the existing `BrowserFrame` content already has internal `overflow-y-auto` and the `flex min-h-0 flex-1` wrapper around it (line 445). Once the outer shell is `lg:h-[100dvh] lg:overflow-hidden` again, the AI-extraction step regains its internal scroll and stops pushing content off-screen.

## Out of scope

- Step logic, mock invoice generation, keyboard navigation, archive state — untouched.
- Site `Header`, `Footer`, `Seo`, routing, and all other pages — untouched.
- No new dependencies, no restyle, no branding changes.

## Verification

- `/dashboard-demo` opens with the stepper tabs at the very top of the viewport (no marketing header above), Trainer panel on the right, no "Exit demo" button anywhere, no "Step N of 7" pill — pixel-matches the reference screenshot.
- Step 6 (AI extraction): workspace stays inside the BrowserFrame; the inner content scrolls within the frame, page itself does not scroll on desktop.
- Resize viewport short vertically on step 6 → invoice panel gains its own scrollbar. At normal heights it does not.
- Steps 1–7 navigate normally via tabs, arrow keys, and Trainer Back button. Mobile step bar shows step counter + "Steps" button (no Exit).
