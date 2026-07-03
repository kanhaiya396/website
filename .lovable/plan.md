## Goal

Route every "Log in", "Sign up", and "Get started" CTA to the original external auth page at `app.outworx.ai/auth` (via `VITE_APP_URL`), since that page is what actually authenticates the user and lands them in the real dashboard. The local `/auth` route was only a preview stand-in and should no longer intercept CTAs.

## Changes

1. **`src/lib/appUrl.ts`**
   - Remove the preview/localhost override in `getAuthOrigin()`.
   - Always resolve to `APP_URL` (external `app.outworx.ai`) when set; only fall back to the current origin if `VITE_APP_URL` is missing.
   - Keep `mode=signin` / `mode=signup` and the `redirect` param exactly as they are so the external auth page can honor the requested mode and return the user to the correct marketing site.

2. **`src/lib/backToHome.ts`**
   - Leave the allow-list logic intact (already supports current origin + outworx domains) so "Back to home" keeps working from the external auth page.

3. **Local `/auth` route (`src/pages/Auth.tsx`, `src/App.tsx`)**
   - Keep the route mounted as a harmless fallback (no CTA points to it anymore). No code deletion needed.

## Verification

Run the existing Playwright audit against the preview:
- Header "Log in" → `https://app.outworx.ai/auth?mode=signin&redirect=<preview-origin>`
- Header/Hero/Pricing/API-docs "Get started" / "Get API Key" → `https://app.outworx.ai/auth?mode=signup&redirect=<preview-origin>`
- Mobile menu parity
- Confirm the `redirect` value matches the current preview origin so "Back to home" returns here

Report a short source → resolved URL table.
