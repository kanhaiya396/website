## Auth link audit & routing fix

### Sign-in vs sign-up destinations
- **Sign in** → `https://app.outworx.ai/auth?mode=signin`
- **Sign up / Get started / Start free trial / Try demo CTAs** → `https://app.outworx.ai/auth` (sign-up is the default view)

Per your rule: only the **"Log in" button in the home/header** goes to sign-in. Everything else goes to sign-up.

### Current CTAs in code and their correct destination

| # | File | Line | Button / context | Destination |
|---|---|---|---|---|
| 1 | `src/components/layout/Header.tsx` | 142 | Desktop header **"Log in"** | **sign-in** |
| 2 | `src/components/layout/Header.tsx` | 147 | Desktop header **"Get started"** | sign-up |
| 3 | `src/components/layout/Header.tsx` | 221 | Mobile menu **"Log in"** | **sign-in** |
| 4 | `src/components/layout/Header.tsx` | 226 | Mobile menu **"Get started"** | sign-up |
| 5 | `src/components/landing/Hero.tsx` | 91 | Home hero **"Get started / Start free trial"** | sign-up |
| 6 | `src/components/landing/CTA.tsx` | 28 | Home bottom CTA **"Start free trial"** | sign-up |
| 7 | `src/pages/Pricing.tsx` | 208 | Pricing plan **"Start free trial"** | sign-up |
| 8 | `src/pages/ApiDocs.tsx` | 472 | API docs **"Get API key / Start free trial"** | sign-up |
| 9 | `src/pages/ApiDocs.tsx` | 661 | API docs secondary CTA | sign-up |
| 10 | `src/pages/ApiDocs.tsx` | 700 | API docs footer CTA | sign-up |
| 11 | `src/pages/DashboardDemo.tsx` | 2177 | Demo page CTA (`from=demo`) | sign-up |
| 12 | `src/pages/DashboardDemo.tsx` | 2312 | Demo page CTA (`from=demo`) | sign-up |

No other components currently link to `/auth`. Footer, About, Blog, Careers, Security, Status, Cookies, Privacy, Terms, Documentation, NotFound — none have auth CTAs (only prose mentions of `app.outworx.ai`, which stay as-is).

### Changes

**1. Extend `src/lib/appUrl.ts`** with a sign-in helper:
```ts
export function signInUrl(from?: string): string {
  const params = new URLSearchParams({ mode: "signin" });
  if (from) params.set("from", from);
  return `${APP_URL}/auth?${params.toString()}`;
}
```
Keep existing `authUrl(from?)` unchanged — it remains the sign-up entry point.

**2. Update the two "Log in" buttons** in `src/components/layout/Header.tsx` (lines 142 and 221) to use `signInUrl()` instead of `authUrl()`. Import `signInUrl` alongside `authUrl`.

**3. Leave every other CTA as-is** — they already point at `authUrl()` (sign-up), which is correct.

### Verification
- `rg "authUrl\\(|signInUrl\\(" src` should show `signInUrl()` used in exactly 2 places (both in `Header.tsx`) and `authUrl(...)` used in the remaining 10 places listed above.
- Manual check: in the running preview, click header "Log in" → opens `…/auth?mode=signin`; click "Get started" / hero / pricing / demo CTAs → open `…/auth` (sign-up form shown in your screenshot).
