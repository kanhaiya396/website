# Page Inventory & Plan

## What exists in this repo

Routes registered in `src/App.tsx`:
- `/` (Index)
- `/pricing`
- `/privacy`
- `/terms`
- `/docs`
- `/api-docs`
- `*` → NotFound

## What's referenced but missing

### Linked from Header (`src/components/layout/Header.tsx`)
- **`/about`** — "About Us" nav item, no route
- **`/blog`** — "Blog" nav item, no route
- **Log in / Get started** → currently hard-link to `https://app.outworx.ai/auth` (external app, includes the broken "Back to home" button you reported)

### Linked from Footer (`src/components/layout/Footer.tsx`)
- **About** — href `#` (placeholder)
- **Blog** — `/blog` (missing)
- **Careers** — href `#` (placeholder)
- **Status** — href `#` (placeholder)
- **Security** — href `#` (placeholder)
- **Cookie Policy** — href `#` (placeholder)
- **Integrations** → external `app.outworx.ai/settings?tab=integrations`

### Linked from Hero / CTA / ApiDocs
- **Auth** (`/auth`) → external app
- **Dashboard** (`/dashboard`) → external app (used by "View Demo" / "View Dashboard" CTAs)

## Proposal — build these pages in this repo

Group A — **Auth flow** (fixes the "Back to home" bug):
1. `/login` — sign-in screen with working in-app "Back to home" link
2. `/signup` — registration screen
3. `/forgot-password` — request reset email
4. `/reset-password` — set new password
   - All four are UI-only shells unless you want real auth (would need Lovable Cloud)

Group B — **Marketing pages** (currently broken links):
5. `/about` — company/team/mission page
6. `/blog` — blog index (static list of posts)
7. `/blog/:slug` — individual post template
8. `/careers` — open roles (or "no openings" state)
9. `/status` — system status page (static "all systems operational")
10. `/security` — security & compliance overview
11. `/cookies` — cookie policy (legal)

Group C — **Product demo** (optional, replaces external links):
12. `/dashboard-demo` — static screenshot/mock of the product dashboard, replacing the external `app.outworx.ai/dashboard` link in Hero/CTA

## What I need from you before building

1. **Auth scope** — UI shells only, or wire real authentication via Lovable Cloud (so login actually works)?
2. **Which groups to build** — all of A + B + C, or a subset (e.g. just A to fix the immediate bug, then B in a follow-up)?
3. **Blog content** — should I generate 3–4 placeholder posts, or leave it as an empty "Coming soon" state?
4. **Header/Footer wiring** — after building, switch the Header "Log in"/"Get started" buttons from the external app to the new `/login` and `/signup` routes? (recommended — fixes the bug)

Once you confirm, I'll switch to build mode and ship the pages in one pass, register them in `App.tsx`, and update Header/Footer to point at the new in-app routes.
