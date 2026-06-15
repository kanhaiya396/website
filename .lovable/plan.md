# Plan — Performance, Pricing API, Dropdown close

## Task 1 — Performance Improvements (Section 6 of recommendations)

**6.1 Image-loading audit** — No `<img>` tags exist anywhere under `src/` (verified with ripgrep). All graphics are SVG icons / CSS. **No code change required.** Will note this in the closing message.

**6.2 Preconnect to Google Fonts** — `src/index.css` line 1 imports Inter + Instrument Serif from `fonts.googleapis.com`. Add two `<link rel="preconnect">` tags to `index.html` `<head>` (before the existing `<title>`):
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

**6.3 Route-level prefetch in Footer** — Already implemented: `Footer.tsx` already uses `SmoothNavLink` (which calls `preloadRoute` on hover/focus/touch). **No code change required.**

---

## Task 2 — Pricing single-source-of-truth from correct APIs

Audit result: only `src/pages/Pricing.tsx` reads/displays plan data. Footer "Pricing" and Navbar "Pricing" both route to `/pricing` via `SmoothNavLink` — no duplicate pricing UI elsewhere. No landing-page pricing section, no comparison table, no plan preview component. So the fix is localized to `Pricing.tsx`.

Changes in `src/pages/Pricing.tsx`:

1. **Hit the correct audience endpoint** for each tab:
   - Business: `/api/v1/accounts/subscription-plans/?audience=business`
   - Accountant/Bookkeeper: `/api/v1/accounts/subscription-plans/?audience=accountant_bookkeeper`

2. **Re-fetch when the audience toggle changes** — move the `useEffect` dependency to `[isAccountant]` and include the audience query param.

3. **Remove all hardcoded pricing**:
   - Delete the `FALLBACK_PLANS` constant entirely (it contains hardcoded prices and would override the API when the network blips).
   - Delete the `ACCOUNTANT_DISCOUNT_PCT` constant and the `applyDiscount()` helper. Render `plan.price_monthly` directly — the API now returns the correct discounted price for the accountant audience.
   - On the toggle's "Accountants & Bookkeepers" button, replace the `{ACCOUNTANT_DISCOUNT_PCT}% off` badge with a neutral label `"Discount"` so no hardcoded percentage is shown. (Toggle layout / button order unchanged.)

4. **Error / loading states** (preserve existing UI):
   - Keep the existing `<Loader2>` spinner while loading.
   - When the fetch fails, surface the existing red error block with a friendly message: `"Pricing is temporarily unavailable. Please refresh in a moment."` — no fallback plans are rendered. (Layout, classes, container untouched.)

5. **No styling, layout, copy, or responsiveness changes** beyond the badge text swap above.

6. Keep the `HIGHLIGHTED_INDEX = 1` "Most Popular" rule (purely visual, not pricing data).

Verification after edit:
- `npm`/build runs clean (no TS errors).
- Open `/pricing` → Business tab loads from `?audience=business`; switch tab → Accountant request fires with `?audience=accountant_bookkeeper`; refresh → identical; arrive via Footer link → identical; arrive via Navbar → identical.
- Console clean; no hydration warnings; loader and error states still render.

---

## Task 3 — Close Product dropdown after a hash selection

File: `src/components/layout/Header.tsx`. Root cause: the desktop `<DropdownMenu>` is uncontrolled; the hash item's `onClick` calls `e.preventDefault()` to perform a manual smooth-scroll, which suppresses Radix's default close-on-select for the wrapped `<Link>`.

Fix (desktop dropdown only — mobile menu already closes correctly via `closeMobile = true`):

1. Add a controlled open state per Product-style dropdown:
   ```ts
   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
   ```
2. Make the `<DropdownMenu>` controlled:
   ```tsx
   <DropdownMenu
     open={openDropdown === item.label}
     onOpenChange={(o) => setOpenDropdown(o ? item.label : null)}
   >
   ```
3. In each child item's `onClick`, after invoking `handleHashLink(child.href)(e)`, also call `setOpenDropdown(null)` so the menu closes immediately regardless of `preventDefault`:
   ```tsx
   onClick={(e) => {
     handleHashLink(child.href)(e);
     setOpenDropdown(null);
   }}
   ```

Result: opening Product → clicking Features / How It Works / VAT Compliance → page smooth-scrolls AND the dropdown closes in the same gesture. No extra click required. State fully resets (next open is a fresh open).

---

## Files touched
- `index.html` — add 2 preconnect tags.
- `src/pages/Pricing.tsx` — audience-aware fetch, remove fallback + client discount, badge text.
- `src/components/layout/Header.tsx` — controlled dropdown + close-on-select for hash items.

No other files change. No design system, routing, or shared component changes.
