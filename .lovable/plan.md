# Fix the live demo page in light theme

## What's wrong

The demo page's surrounding "chrome" (trainer panel, step trackbar, welcome hero, tour drawer, tooltips, success overlay) is painted with hard-coded dark-theme colours, while its containers (`.outworx-shell`, `.outworx-card`) correctly follow the theme tokens and turn white in light mode. Result: near-white text on white cards — the trainer copy, task box, step labels and headings become invisible, and the panel backgrounds look mismatched.

Confirmed in the code: ~30 hard-coded `text-[hsl(180_20%_95%)]` / `text-[hsl(200_15%_60%)]` / `border-[hsl(210_25%_18%)]` / `bg-[hsl(210_30%_10%)]` values in `src/pages/DashboardDemo.tsx`, plus a hard-coded dark gradient on the welcome screen.

## The fix

Convert the demo chrome to the same semantic tokens the rest of the site uses, so it renders correctly in both themes:

- Body/heading text → `text-foreground`, secondary text → `text-muted-foreground`
- Teal accents (Trainer label, "Your task", step badges) → `text-primary`, `bg-primary/10`, `ring-primary/30`, with `text-primary-foreground` on filled chips/buttons
- Panel backgrounds and hover states → `bg-card`, `bg-secondary`, `hover:bg-secondary`, dividers → `border-border`
- Welcome hero's fixed dark gradient → a token-based gradient that reads well in both themes
- Trainer/tour scrollbars → theme-aware scrollbar style rather than the fixed dark one

Kept unchanged on purpose: the simulated app window inside the browser frame (client list, dashboard, upload, review, ledger). That is a mock of the real Outworx product UI, which is light by design, so it stays light in both themes — the same way a product screenshot would.

## Technical notes

- Single file for the chrome: `src/pages/DashboardDemo.tsx` — swap the arbitrary `hsl(...)` classes for tokens in `TrainerVertical`, `TrainerSection`, `TopStepper`, `TourDrawer`, mobile step rail, `Tooltip`, `WelcomeScreen`, and the success overlay/widget.
- Possible small addition in `src/index.css`: a theme-aware `.scrollbar-thin` variant (light-mode values under `.light`) so the demo's internal scrollbars stay visible.
- No changes to demo logic, step flow, invoice generation, layout heights, or scroll containment.

## Verification

Load `/dashboard-demo` in light and dark theme via a headless browser, screenshot step 1 and a mid-tour step in both, and confirm all trainer/stepper text is legible and the panels match the active theme.
