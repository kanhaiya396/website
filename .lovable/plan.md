## Fix Pricing fetch in preview & production

**Root cause:** `src/lib/api.ts` uses `VITE_API_BASE_URL` which is empty in the Lovable preview, so the request goes to the preview origin instead of `app.outworx.ai` and always fails.

**Fix — `src/pages/Pricing.tsx` only:**

1. Build an absolute URL from the existing `APP_URL` constant (defaults to `https://app.outworx.ai`):
   ```ts
   const url = `${APP_URL}/api/v1/accounts/subscription-plans/?audience=${audience}`;
   ```
2. Replace `api.get(...)` with a plain `fetch(url, { credentials: "omit" })` — this is a public endpoint, no JWT/CSRF needed, and it sidesteps the env-dependent `BASE_URL`.
3. Check `res.ok`, parse JSON, validate `Array.isArray`, set plans. On any failure keep the existing red "Pricing is temporarily unavailable" message.
4. Drop the now-unused `api` import.
5. Everything else unchanged — audience toggle, `useEffect([isAccountant])`, loader, "Most Popular" badge, layout, copy.

No other files change. Works identically in preview and production.

**Verify after edit:** Business tab loads from `?audience=business`, toggle fires `?audience=accountant_bookkeeper`, refresh/footer/navbar entry all show identical data, no console errors.