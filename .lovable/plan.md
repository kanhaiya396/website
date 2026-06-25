## Goal
Make this project fetch the Outworx subscription plans exactly the way the reference (`glow-nav-kit-redesign-final`) does, since that version renders the correct prices. Only the pricing fetch path is touched — UI, layout, and other features are untouched.

## What's different today vs. the reference

| File | Current | Reference (working) |
|---|---|---|
| `src/services/pricing.ts` | Appends `&_=${Date.now()}` cache-buster and re-sorts plans client-side by `sort_order` | Plain `pricing-plans?audience=…` invoke, returns body as-is |
| `supabase/functions/pricing-plans/index.ts` | Sends `Cache-Control: no-cache` upstream; returns `no-store` to client | Plain upstream fetch; returns `public, max-age=60, stale-while-revalidate=120` |
| `src/pages/Pricing.tsx` query opts | `staleTime: 0`, `gcTime: 0`, `refetchOnMount: "always"`, `refetchOnWindowFocus: true`, `refetchOnReconnect: true` | `staleTime: 5 * 60_000`, default everything else |

The extra cache-busting / sort step in the current build is the most likely cause of the wrong values being shown (the `&_=ts` suffix can change how `supabase.functions.invoke` parses the function path, and re-sorting on the client can reorder plans away from what the API returns).

## Changes

1. **`src/services/pricing.ts`** — replace with the reference version: a single `supabase.functions.invoke("pricing-plans?audience=…", { method: "GET" })`, returning the array unmodified (no cache-buster, no client sort).
2. **`supabase/functions/pricing-plans/index.ts`** — replace with the reference version: plain upstream fetch with only `Accept: application/json`, response `Cache-Control: public, max-age=60, stale-while-revalidate=120`, body forwarded verbatim.
3. **`src/pages/Pricing.tsx`** — only the `useQuery` options block changes back to `staleTime: 5 * 60_000, retry: 1` (remove `gcTime`, `refetchOnMount`, `refetchOnWindowFocus`, `refetchOnReconnect`). All JSX, layout, and other logic on the page stay exactly as they are.

## Out of scope
- No changes to `Header`, `Footer`, components, types, routes, styling, or any other page.
- No changes to `src/types/pricing.ts` (already matches the reference).
- No changes to env, Supabase client, or auth.

## Verification
- Load `/pricing` for both Businesses and Accountants & Bookkeepers toggles.
- Confirm prices and document limits match what `https://app.outworx.ai/api/v1/accounts/subscription-plans/?audience=business` and `?audience=accountant_bookkeeper` return.
- Confirm the "Most Popular" badge still lands on the second card.
