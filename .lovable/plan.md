# Auth links: keep path-based URLs, fix the auth app

## What I verified live

Against the deployed auth app at `app.outworx.ai`:

- `/auth` renders the Sign In card (200).
- `/auth/signin` renders the app's 404 page.
- `/auth/signup` renders the app's 404 page.
- `?mode=signup` is ignored — the Sign In card always renders.
- "Back to home" links to `https://app.outworx.ai/` and ignores the `redirect` param.

That auth app is a separate codebase from this marketing project (it has Google/Microsoft sign-in and a "Welcome Back" card that do not exist here), so none of these three issues can be fixed from this repo.

## Decision

Per your choice, this project keeps pointing at `/auth/signin` and `/auth/signup`. No code changes here. The fixes below belong in the auth app's repo and take effect as soon as it deploys.

## Changes required in the auth app repo

1. Add routes so the paths resolve instead of 404:
   - `/auth/signin` → auth page in sign-in mode
   - `/auth/signup` → auth page in sign-up mode
   - `/auth` → keep as today (defaults to sign-in), still honoring `?mode=signin|signup`

2. Drive the card's mode from the URL, not only from local state, so the correct card renders on first paint and on back/forward navigation. Toggling the card in the UI should also update the path (`/auth/signin` ↔ `/auth/signup`).

3. Make the in-card switch link navigate by path: the "Sign up" link on the sign-in card goes to `/auth/signup` (carrying existing query params), and the "Sign in" link on the sign-up card goes to `/auth/signin`.

4. Make "Back to home" honor the `redirect` query param this site already sends, with an allow-list so it cannot be abused:
   - allow `https://outworx.ai`, `https://www.outworx.ai`, and the auth app's own origin
   - anything else (or a missing param) falls back to `https://outworx.ai`

## Technical notes

- This site sends, for example: `https://app.outworx.ai/auth/signup?redirect=https%3A%2F%2Foutworx.ai` (plus `from=demo` when coming from the demo page). The helpers live in `src/lib/appUrl.ts` and stay unchanged.
- Until the auth app ships routes 1–3, "Get started" and "Log in" will land on the auth app's 404 page. If that becomes a problem before the deploy, say the word and I will temporarily route both CTAs back to `/auth`.

## Verification after the auth app deploys

I can re-run a live check of `/auth/signin`, `/auth/signup`, the in-card switch link, and "Back to home" with a `redirect` param, and report the result.
