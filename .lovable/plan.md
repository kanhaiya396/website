## Goal
Make the Pricing page use the exact source API endpoints:

- `https://app.outworx.ai/api/v1/accounts/subscription-plans/?audience=business`
- `https://app.outworx.ai/api/v1/accounts/subscription-plans/?audience=accountant_bookkeeper`

No fixed fallback values, no local price/doc-limit modifications, and no stale transformation logic.

## Plan
1. **Keep the backend function as a thin proxy**
   - Confirm `pricing-plans` forwards `audience=business` and `audience=accountant_bookkeeper` directly to the Outworx API.
   - Keep forwarding the upstream response body verbatim.
   - Ensure no server-side normalization, scaling, hardcoded plans, or fallback pricing exists.

2. **Update the frontend pricing service**
   - Keep `src/services/pricing.ts` calling the backend function with the selected audience.
   - Ensure it returns only the array received from the endpoint.
   - Remove/avoid any local mutation of `price_monthly`, `monthly_doc_guide`, `quarterly_doc_limit`, `overage_cost`, features, or sort order.

3. **Make the Pricing UI reflect API data accurately**
   - Sort by `sort_order` if needed so the endpoint order is stable in the UI.
   - Render the exact numeric fields from the API.
   - Keep the audience toggle mapped exactly:
     - Businesses → `business`
     - Accountants & Bookkeepers → `accountant_bookkeeper`

4. **Prevent stale cached pricing from appearing**
   - Reduce or remove the React Query stale cache for pricing so changing API data is visible quickly.
   - Keep a short retry/error state, but do not show old hardcoded prices when fetch fails.

5. **Validate with live requests**
   - Check the browser/network response for both audiences.
   - Confirm the page displays the same plans and values as the response body:
     - Business: Variable, Starter, Growth, Enterprise
     - Accountant/bookkeeper: Starter, Growth, Enterprise

## Technical notes
- Because browser CORS may block direct frontend calls to `app.outworx.ai`, the existing backend proxy should remain the public website’s safe way to call those exact API endpoints.
- The backend proxy still means the pricing is sourced from `app.outworx.ai`; it is not fixed locally in this website.