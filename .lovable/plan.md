## Diagnosis

The signup CTAs are generating URLs with `mode=signup`, but they point to the external production app by default:

```text
https://app.outworx.ai/auth?mode=signup&redirect=https://outworx.ai
```

So in the current preview, clicking “Get started” leaves this project and opens the external app’s `/auth` page. The local `/auth?mode=signup` route in this project is correct, but the CTA hand-off means you may still see the external app’s default sign-in page everywhere.

## Plan

1. **Fix auth URL resolution**
   - Update `src/lib/appUrl.ts` so auth CTAs use this app’s own `/auth` route by default in preview/local/current deployment.
   - Keep support for `VITE_APP_URL` only when an external app URL is intentionally configured.
   - Ensure `signInUrl()` always emits `mode=signin` and `signUpUrl()` always emits `mode=signup`.

2. **Preserve safe return navigation**
   - Keep the `redirect` param for “Back to home”.
   - Ensure it still resolves safely via the existing allow-list logic.

3. **Verify every entry point by clicking, not just reading hrefs**
   - Header desktop: `Log in` opens sign-in, `Get started` opens signup.
   - Header mobile: `Log in` opens sign-in, `Get started` opens signup.
   - Hero, CTA, Pricing, API docs, Dashboard demo signup CTAs open signup.
   - `/auth` defaults to sign-in.
   - `/auth?mode=signup` opens the create-account page.
   - In-card toggle switches between sign-in and signup while preserving `redirect`.
   - “Back to home” returns to the safe marketing URL.

4. **Report the verified result**
   - Provide a short table of clicked source → final URL → visible auth mode.