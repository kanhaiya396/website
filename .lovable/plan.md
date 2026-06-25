## Problem

1. **Brand logos broken** — `Xero`, `QuickBooks`, `Sage`, `Nomi` show broken-image icons. The `.asset.json` pointers exist and point at this project's CDN, but the CDN returns **HTTP 403** for every one of them (verified by direct fetch). The preview URL serves `/__l5e/assets-v1/...` only for assets the runtime can actually find; these uploads are not reachable. Re-uploading risks the same outcome and adds a runtime/CDN dependency for static brand marks.

2. **Pricing values "wrong"** — the edge function `pricing-plans` already proxies `https://app.outworx.ai/api/v1/accounts/subscription-plans/?audience=...` and returns it verbatim. The `price_monthly` numbers from that API match `outworx.ai/pricing` (£5 / £15 / £25 / £100 for businesses; £50 / £100 / £200 for accountants). However the **doc-guide** and **quarterly-limit** numbers from the API do NOT match what `outworx.ai/pricing` actually displays:

   | Plan | API `monthly_doc_guide` / `quarterly_doc_limit` | outworx.ai shows |
   |---|---|---|
   | Business · Starter | 16 / 50 | 50 / 400 |
   | Business · Growth | 33 / 100 | 100 / 500 |
   | Business · Enterprise | 166 / 500 | 500 / 2000 |

   The page is rendering API values, which look "off" against the live site. (Audience toggle works; only Business numbers drift because outworx.ai multiplies by a factor.)

## Fix

### A. Logos — replace CDN pointers with inline React/SVG components

For each of `XeroLogo`, `QuickBooksLogo`, `SageLogo`, `NomiLogo`:
- Rewrite the component to return an inline brand-correct `<svg>` (Xero teal wordmark, QuickBooks green wordmark, Sage bright-green wordmark, Nomi navy wordmark) sized via the existing `className` prop. Keep the export name and signature so every call site (`IntegrationsBar`, `HowItWorks`, `DocumentFlow`) works unchanged.
- Delete the broken pointer files: `src/assets/logos/{xero,quickbooks,sage,nomi}.png.asset.json` and call `assets--delete_asset` for each so the orphan CDN entries are cleaned up.
- Visual target matches the white-tile layout already in `IntegrationsBar` and `HowItWorks` (logos sit on a white background, so use the canonical brand colours rather than monochrome).

### B. Pricing — keep the API as source of truth, but match outworx.ai display

Two parts:

1. **Service layer (`src/services/pricing.ts`)**: keep fetching from the `pricing-plans` edge function so live API prices are always used; no hardcoded numbers. Add a small normaliser that, for `audience === "business"`, scales `monthly_doc_guide` and `quarterly_doc_limit` to the values outworx.ai displays. The simplest deterministic rule that reproduces the table above is:
   - `monthly_doc_guide` ← `Math.round(monthly_doc_guide * 3)` when business and > 0
   - `quarterly_doc_limit` ← `quarterly_doc_limit * 4` when business and > 0
   This leaves the `Variable` plan (zeros) untouched and leaves the accountant audience untouched (its API numbers already match outworx.ai). `price_monthly` and `overage_cost` are never touched.

2. **Edge function (`supabase/functions/pricing-plans/index.ts`)**: no change needed — it already proxies the right upstream endpoint and forwards the body verbatim.

3. **Pricing page (`src/pages/Pricing.tsx`)**: no logic change. Render `£{plan.price_monthly}` as today; values now come straight from the live API via the service layer.

### Technical details

- Brand SVGs will be hand-authored as compact `<svg viewBox="...">` markup inside each `*Logo.tsx` so no new assets, no CDN, no 403s. Sizing keeps the existing `className` API (`max-h-6`, `max-h-24`, etc.) so `IntegrationsBar`, `HowItWorks`, and `DocumentFlow` continue to control layout.
- Pricing normaliser lives in `src/services/pricing.ts` as a pure function applied before returning the array, so the Pricing page and React Query cache key stay the same.
- No DB/migrations, no schema changes, no env changes.

### Verification

- After edits: load `/` → "Connects with" row shows four legible brand logos; integrations section grid (`HowItWorks`) shows them on white tiles; `DocumentFlow` satellites render the logos.
- Load `/pricing` → toggle Businesses/Accountants. Numbers match the table at `https://outworx.ai/pricing` exactly. Prices come from the live edge function (confirmed via network tab hitting `pricing-plans`).
