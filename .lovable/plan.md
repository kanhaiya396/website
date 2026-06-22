## Goal

Two things in one pass:

1. Route every "Log in" / "Sign up" / "Get started" CTA on the marketing site to the external app at `https://app.outworx.ai/auth` (configurable via `VITE_APP_URL`).
2. Remove the unused internal auth pages and supporting code that were built earlier, without touching the marketing workflow, demo, blog, pricing, or any other feature.

## CTA changes (point to external auth)

Replace every internal login/signup link with an external `<a href={authUrl()}>`. A small helper keeps it tidy:

```ts
// src/lib/appUrl.ts (new)
export const APP_URL = import.meta.env.VITE_APP_URL || "https://app.outworx.ai";
export const authUrl = (from?: string) =>
  `${APP_URL}/auth${from ? `?from=${encodeURIComponent(from)}` : ""}`;
```

Files to edit (preserve existing button styling/classes):

- `src/components/layout/Header.tsx` — desktop + mobile "Log in" and "Sign up" (lines 143, 148, 222, 227) → external. Drop the inline `APP_URL` constant and import from `@/lib/appUrl`.
- `src/components/landing/Hero.tsx` — "Get started" CTA (line 91) → external.
- `src/components/landing/CTA.tsx` — final-section CTA (line 28) → external.
- `src/pages/Pricing.tsx` — signup CTA (line 207) → external.
- `src/pages/ApiDocs.tsx` — three signup CTAs (lines 471, 660, 699) → external.
- `src/pages/DashboardDemo.tsx` — two `/signup?from=demo` CTAs (lines 2176, 2311) → external with `?from=demo`.

`DemoTransitionLink` (homepage → /dashboard-demo) is unrelated and stays.

## Removal of unused auth code

These files are only referenced by each other and by `App.tsx`, so they can be deleted cleanly:

- `src/pages/auth/Login.tsx`
- `src/pages/auth/Signup.tsx`
- `src/pages/auth/ForgotPassword.tsx`
- `src/pages/auth/ResetPassword.tsx`
- `src/pages/auth/AuthLayout.tsx`
- `src/features/auth/AuthContext.tsx`
- `src/features/auth/ProtectedRoute.tsx`
- `src/features/auth/schema.ts`
- `src/lib/api.ts` (only consumed by the deleted `AuthContext`; nothing else imports it — verified with ripgrep)

Then delete the now-empty directories `src/pages/auth/` and `src/features/auth/`.

`src/App.tsx` edits:

- Remove the `loadLogin`, `loadSignup`, `loadForgotPassword`, `loadResetPassword` chunk loaders and their `lazy()` bindings.
- Remove their entries from `routePreloaders`.
- Remove the four `<Route path="/login|/signup|/forgot-password|/reset-password" …>` lines.
- Remove the `AuthProvider` import and unwrap it from the tree (the provider becomes dead once `useAuth` consumers are gone). Unknown deep links to `/login` etc. naturally fall through to the existing `<Route path="*" element={<NotFound />} />`.

Keep `src/lib/env.ts` as-is (it still documents `APP_URL` and is harmless).

## Verification

After edits, `rg -n "/login|/signup|pages/auth|features/auth|lib/api|AuthProvider|useAuth"` in `src/` should return only references inside `Privacy.tsx`/`Terms.tsx` prose (which mention `app.outworx.ai`) and the new `appUrl.ts`. The build should pass and every marketing CTA should open `https://app.outworx.ai/auth` in the same tab.
