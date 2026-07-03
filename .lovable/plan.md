## Goal
Route the marketing CTAs to the correct external auth views and pass a redirect so the auth page's Back-to-home returns to outworx.ai.

- Log in → `app.outworx.ai/auth?mode=signin`
- Get started / Start now / Start free → `app.outworx.ai/auth?mode=signup`
- Every CTA also carries `?redirect=https://outworx.ai` (configurable via `VITE_MARKETING_URL`) so the external Back-to-home button works.

## Changes

### `src/lib/appUrl.ts`
- Keep `signInUrl()` → adds `mode=signin` + `redirect`.
- Add `signUpUrl()` → adds `mode=signup` + `redirect`.
- Update `authUrl()` to also append `redirect` (keeps back-compat for any leftover callers, but new "get started" CTAs should use `signUpUrl()`).
- `MARKETING_URL` const, defaulting to `https://outworx.ai`, override via `VITE_MARKETING_URL`.

### CTA call sites — swap `authUrl()` → `signUpUrl()` on every "Get started / Start now / Start free / Book a demo (sign-up)" button
Audit and update:
- `src/components/layout/Header.tsx` — desktop + mobile "Get started" buttons
- `src/components/landing/Hero.tsx` — "Start now"
- `src/components/landing/CTA.tsx` — primary CTA
- `src/pages/Pricing.tsx` — plan CTAs
- `src/pages/About.tsx`, `src/pages/Careers.tsx`, `src/pages/DashboardDemo.tsx` completion CTAs, and any other pages surfaced by a quick `rg "authUrl\("` sweep

"Log in" links continue to use `signInUrl()` — no change required there.

## Not changing
- The external auth app itself. Its Back-to-home button will read the `redirect` query param we now send; no code lives in this repo for that page.
- Supabase / pricing / edge functions / any UI styling.

## Verification
- `rg "authUrl\(|signInUrl\(|signUpUrl\("` — every CTA is on the semantically correct helper; no stray `authUrl()` on sign-up buttons.
- Click Log in → `…/auth?mode=signin&redirect=https://outworx.ai` → sign-in card.
- Click Get started / Start now → `…/auth?mode=signup&redirect=https://outworx.ai` → Create Account card.
- Back-to-home on the auth page returns to the marketing homepage.
- Type-check passes.
