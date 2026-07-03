## Goal

Add a working `/auth` page in this repo (which is deployed as `app.outworx.ai`) so the marketing CTAs' `?mode=signup` / `?mode=signin` / `?redirect=…` params actually take effect.

## Changes

### 1. `src/lib/backToHome.ts` (new)
Allow-listed resolver for the `?redirect=` param. Rejects non-https and non-allow-listed origins, falling back to `https://outworx.ai`. Prevents open-redirect abuse.

```ts
const ALLOWED_ORIGINS = new Set(["https://outworx.ai", "https://www.outworx.ai"]);
export function resolveBackToHome(raw: string | null): string { /* validates + returns */ }
```

### 2. `src/pages/Auth.tsx` (new)
URL-driven auth page using Lovable Cloud (`supabase.auth.signInWithPassword` / `signUp`).

- Reads `mode` from `useSearchParams()` — `signup` → Create Account view, anything else → Sign In view.
- In-card toggle calls `setSearchParams({...prev, mode: next}, {replace: true})` so `redirect` and other params survive.
- "Back to home" link = `resolveBackToHome(searchParams.get("redirect"))`.
- Sign-up passes `emailRedirectTo: ${window.location.origin}/auth?mode=signin`.
- Errors surfaced via `useToast`. Redirects to `/` on active session.
- Uses design tokens only (`bg-background`, `bg-card`, `text-primary`, etc.) — no hardcoded colors.

### 3. `src/App.tsx`
- Add `loadAuth = () => import("./pages/Auth")`, `const Auth = lazy(loadAuth)`.
- Add `"/auth": loadAuth` to `routePreloaders`.
- Add `<Route path="/auth" element={<Auth />} />` inside `<Routes>`.

## Not changing

- `src/lib/appUrl.ts` — `signInUrl()` / `signUpUrl()` already emit the exact URL shape the new page reads.
- Any marketing CTA — all already on the correct helpers.
- No new DB tables, no profiles/roles table (out of scope for this fix).

## Verification

1. Typecheck / build passes.
2. `/auth` → Welcome Back card.
3. `/auth?mode=signup` → Create Account card.
4. In-card toggle updates `?mode=…` while preserving `redirect`.
5. `/auth?mode=signup&redirect=https://outworx.ai` → Create Account + Back-to-home points to `https://outworx.ai`.
6. `/auth?redirect=https://evil.example` → Back-to-home falls back to `https://outworx.ai` (allow-list rejects unknown origin).
7. Header **Log in** → sign-in view; **Get started** → sign-up view.
