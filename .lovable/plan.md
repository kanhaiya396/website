# Sign Up / Sign In Navigation Audit & Fix

## Findings — every entry path to auth pages

In-app routes (`/login`, `/signup`) — `AuthLayout` already renders a working "Back to home" link, logo link to `/`, and browser back works:

| Source | Trigger | Destination | Status |
|---|---|---|---|
| Header (desktop) | "Log in" | `/login` | OK |
| Header (desktop) | "Get started" | `/signup` | OK |
| Header (mobile) | "Log in" | `/login` | OK |
| Header (mobile) | "Get started" | `/signup` | OK |
| Hero | "Get started" | `/signup` | OK |
| Landing CTA | "Get started" | `/signup` | OK |
| Dashboard Demo | CTA | `/signup` | OK |
| Login page | "Sign up" | `/signup` | OK |
| Signup page | "Sign in" | `/login` | OK |
| Forgot password | "Back to sign in" | `/login` | OK |
| Reset password | "Back to sign in" | `/login` | OK |

Broken / inconsistent entry paths (leave the marketing site for `app.outworx.ai/auth`, so there is no in-app "Back to Home" once the user lands):

| Source | Trigger | Destination | Issue |
|---|---|---|---|
| Pricing page | Plan "Start free trial" buttons (`src/pages/Pricing.tsx:233`) | `${APP_URL}/auth` | External hand-off — no Back to Home |
| API Docs | "Get started" / "Get an API key" (`src/pages/ApiDocs.tsx:467, 656, 695`) | `${APP_URL}/auth` | External hand-off — no Back to Home |

## Fix

Re-point every in-marketing auth CTA at the internal `/signup` route so the `AuthLayout` "Back to home" link, logo, header back-navigation, and browser back all work consistently.

1. `src/pages/Pricing.tsx` — replace the `<a href={`${APP_URL}/auth`}>` plan CTA with `<SmoothNavLink to="/signup">` (keep button copy, styling, and the `?audience=` context). Drop the `APP_URL` constant if it becomes unused.
2. `src/pages/ApiDocs.tsx` — replace the three `<a href={`${APP_URL}/auth`}>` blocks with `<SmoothNavLink to="/signup">`. Keep surrounding copy, button styles, and headings. Drop the `APP_URL` constant if it becomes unused.
3. No changes to `AuthLayout`, `Login`, `Signup`, `ForgotPassword`, `ResetPassword`, `Header`, `Footer`, `Hero`, `CTA`, or `DashboardDemo` — their navigation is already correct.

## Verification

- From Pricing → click any plan CTA → lands on `/signup` → "Back to home" link returns to `/`.
- From API Docs → each "Get started"/"Get an API key" CTA → `/signup` → "Back to home" works.
- From Header (desktop + mobile), Hero, landing CTA, Dashboard Demo → `/signup` or `/login` → "Back to home", logo click, and browser back all return to `/`.
- Cross-links between Login ↔ Signup ↔ Forgot/Reset still work, and each still exposes "Back to home".

## Out of scope

No styling, copy, form behavior, or layout changes. No changes to the actual external app auth flow on `app.outworx.ai`.
