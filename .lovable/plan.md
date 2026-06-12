# Fix footer Integrations + Back to home navigation

## Problems

1. **Footer "Integrations"** (`src/components/layout/Footer.tsx`) currently points to `${APP_URL}/settings?tab=integrations` (external app URL), which redirects unauthenticated visitors to the app's login page. The marketing site's Integrations content lives in the homepage `#how-it-works` section (the section is even titled "Integrations").

2. **"Back to home" buttons** — the only label "Back to home" in the codebase is in `src/pages/auth/AuthLayout.tsx` (shown on `/login`, `/signup`, `/forgot-password`, `/reset-password`). It already uses `<Link to="/">`, but the surrounding container is the auth page root and the link works only when nothing intercepts it. Additionally, `src/pages/NotFound.tsx` uses a raw `<a href="/">` which causes a full page reload instead of router navigation. The user also mentioned `/dashboard-demo` — that page has no explicit Back-to-home button, but its `Header` logo Link to `/` is the only way back; we'll add an explicit Back-to-home link there for parity.

## Changes

### 1. `src/components/layout/Footer.tsx`
- Change the `Integrations` entry from the external `APP_URL` link to an in-page anchor: `{ label: "Integrations", href: "/#how-it-works" }` (drop `external: true`).
- Remove the now-unused `APP_URL` constant.

### 2. `src/pages/NotFound.tsx`
- Replace the `<a href="/">` "Return to Home" link with react-router `<Link to="/">` so it routes client-side instead of full-reloading.

### 3. `src/pages/DashboardDemo.tsx`
- Add a small "Back to home" link near the top of the main section (above the page header), styled like AuthLayout's back link (`ArrowLeft` + muted text), using `<Link to="/">`.

### 4. Verify (no code changes expected)
- `src/pages/auth/AuthLayout.tsx` already uses `<Link to="/">`. Confirm in the preview that the back link navigates from each auth page; if a stacking/z-index issue blocks clicks, raise its `z-index` (currently `z-10`).

## Out of scope
- Header, Hero, CTA, Testimonials, other footer columns — all verified working in prior iterations.
- No styling, copy, or layout changes beyond the minimal additions above.
