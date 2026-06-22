# Fix: "Get started" lands on sign-in instead of sign-up

## Problem
`https://app.outworx.ai/auth` defaults to the **sign-in** tab. So every CTA that calls `authUrl()` (Get started, Start free trial, etc.) currently opens sign-in — the opposite of what we want. Only "Log in" should land on sign-in.

## Fix
Mirror the `signInUrl()` pattern: make `authUrl()` explicitly request the sign-up view via a query param, so the app opens the correct tab regardless of its default.

### `src/lib/appUrl.ts`
- Change `authUrl(from?)` to return `https://app.outworx.ai/auth?mode=signup[&from=...]`.
- Leave `signInUrl(from?)` unchanged (`?mode=signin[&from=...]`).

No other files need to change — every "Get started" / "Start free trial" CTA already calls `authUrl()`, and every "Log in" CTA already calls `signInUrl()`.

## Resulting CTA map
- Header "Log in" (desktop + mobile) → `/auth?mode=signin`
- Header "Get started" (desktop + mobile) → `/auth?mode=signup`
- Hero "Get started" → `/auth?mode=signup`
- CTA "Start free trial" → `/auth?mode=signup`
- Pricing "Start free trial" → `/auth?mode=signup`
- API docs CTAs → `/auth?mode=signup`
- DashboardDemo CTAs → `/auth?mode=signup`

## Assumption
The app at `app.outworx.ai/auth` reads `?mode=signup` / `?mode=signin` to pick the tab (this is the convention you chose for sign-in). If it uses a different param name, tell me and I'll switch it.
