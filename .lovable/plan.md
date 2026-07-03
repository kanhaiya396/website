## Verify + wire correct auth navigation

Goal: confirm every "Log in" / "Get started" / "Sign up" entry point lands on the right `/auth` view (sign-in vs sign-up), and the in-page toggle + Back-to-home behave.

### 1. Audit CTAs across the codebase
Grep for every caller of `signInUrl`, `signUpUrl`, `authUrl`, and any hard-coded `/auth` link, so nothing bypasses the mode param:
- `src/components/layout/Header.tsx` — Log in → `signInUrl()`, Get started → `signUpUrl()` ✅ already wired.
- `src/components/landing/CTA.tsx`, `Hero.tsx`, `Pricing.tsx`, `Footer.tsx`, etc. — verify each CTA uses the right helper. Fix any that use the wrong mode or a bare `/auth` URL.

### 2. Runtime check with Playwright (localhost:8080)
- `/auth` → heading "Welcome back", button "Sign in".
- `/auth?mode=signup` → heading "Create your account", button "Create account".
- `/auth?mode=signup` → click in-card "Sign in" toggle → URL flips to `mode=signin`, heading updates, `redirect` param preserved.
- `/auth?redirect=https://outworx.ai` → Back-to-home href = `https://outworx.ai/`.
- `/auth?redirect=https://evil.example` → Back-to-home falls back to `https://outworx.ai`.
- From `/`, read `href` of header "Log in" and "Get started" anchors: expect `https://app.outworx.ai/auth?mode=signin&redirect=https://outworx.ai` and `…mode=signup…` respectively.

### 3. Fix anything the audit surfaces
Only touch CTA call sites; do not change `Auth.tsx`, `backToHome.ts`, or `appUrl.ts` unless a bug is observed. Typical fixes: swap `authUrl()` for `signInUrl()`/`signUpUrl()`, or replace a raw `/auth` `<Link>` with an `<a href={signUpUrl()}>` for hand-off to the app domain.

### 4. Report
Table of each entry point → resolved URL → pass/fail, plus screenshots of `/auth` and `/auth?mode=signup`. No behavior change if the audit finds nothing.
