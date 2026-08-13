# Auth links: /auth for sign-in, /auth/signup for sign-up

## Target behaviour

- "Log in" CTAs → `https://app.outworx.ai/auth` (sign-in card)
- "Get started" / "Sign up" CTAs → `https://app.outworx.ai/auth/signup` (sign-up card)

## Change in this project

Single file: `src/lib/appUrl.ts`.

- `signInUrl()` → builds `/auth` (currently `/auth/signin`, which 404s)
- `signUpUrl()` → keeps `/auth/signup`
- `authUrl()` → stays `/auth`
- The existing `redirect` and `from` query params keep being appended unchanged.

No CTA call sites change: `Header.tsx`, `Hero.tsx`, `CTA.tsx`, `Pricing.tsx`, `ApiDocs.tsx`, and `DashboardDemo.tsx` already call the right helper for each button.

## Still owned by the auth app repo

Live check just now against `app.outworx.ai`:

- `/auth` → renders the Sign In card, works.
- `/auth/signup` → still returns the app's 404 page.
- `/auth/signin` → still returns the app's 404 page.
- "Back to home" links to `https://app.outworx.ai/` and ignores the `redirect` param this site sends.

So after the change above, "Get started" will keep 404ing until the auth app deploys the `/auth/signup` route. The auth app also needs:

1. A `/auth/signup` route rendering the sign-up card (and, on that card, the "Sign in" switch link pointing to `/auth`).
2. The "Sign up" link on the sign-in card pointing to `/auth/signup` instead of toggling in place, carrying existing query params.
3. "Back to home" honoring the `redirect` param with an allow-list — `https://outworx.ai`, `https://www.outworx.ai`, and its own origin — falling back to `https://outworx.ai` for anything else.

## Verification

After the edit, confirm each CTA's resolved href in the preview, then re-run the live check of `/auth` and `/auth/signup` once the auth app deploys.
