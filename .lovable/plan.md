## Move "Clients" from price header into the info rows

**File:** `src/pages/Pricing.tsx` (only)

### Changes

1. **Header block (price area)** — remove the right-side client limit.
   - Replace the current `flex items-end justify-between` wrapper with a simple vertical stack:
     - `£{price_monthly}` + `/mo`
     - `+ VAT`
   - Result: header shows only Plan name, Monthly price, VAT text.

2. **Info rows block** — add a fourth row for Clients, appended after "Overage cost", using the exact same markup pattern as the other rows so typography, spacing, and column alignment are identical:
   ```
   <div className="flex justify-between text-sm">
     <span className="text-muted-foreground">Clients</span>
     <span className="font-semibold">{formatted}</span>
   </div>
   ```
   - Formatting (unchanged logic, just relocated):
     - `client_limit == null` → `"Unlimited Clients"`
     - `client_limit >= 500` → `"500+ Clients"`
     - else → `"Up to N Clients"`
   - Add `text-right` on the value span only if needed for long-string wrapping; keep `font-semibold` to match siblings.

3. **Spacing rebalance** — the info block already uses `space-y-3 mb-6 pb-6 border-b`. No change needed; the added row inherits the same rhythm. Header becomes slightly shorter, which naturally rebalances the card.

### Not changed
- `src/services/pricing.ts`, edge function, `types/pricing.ts` — API + `client_limit` field already flow through correctly.
- No hardcoded values; same API, same query.
- Card grid, responsive breakpoints, and featured styling untouched.
