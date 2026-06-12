# Fix sub-footer scrolling, route scroll-to-top, and Pricing 500

## Audit of the three reported issues

1. **Sub-footers sometimes "go to home" / show wrong content**
   - Footer hash links use `<Link to="/#features">`, `/#how-it-works`, `/#vat`. React Router v6 does **not** scroll to URL hashes by default — so:
     - On the homepage, clicking these does nothing visible (looks like "goes to home / random").
     - From another page, it navigates to `/` but lands at the top, which is the Hero — explaining "Integrations is showing Features content" (it's actually showing the Hero/Features above the integrations section because no scroll happened).
   - The `Integrations` label correctly maps to `#how-it-works` (that section IS the Integrations block in `HowItWorks.tsx`). No label change needed.

2. **Sub-pages (e.g. Pricing) don't scroll back to top after navigation**
   - No `ScrollToTop` listener exists in `App.tsx`. Browser preserves scroll position across route changes.

3. **Pricing page shows "Request failed with status 500"**
   - `Pricing.tsx` calls `api.get("/api/v1/accounts/subscription-plans/")` against a Django backend that isn't reachable from this preview, so it 500s and the page shows only the error string.

## Planned changes (scoped, no styling/copy changes)

### A. New tiny utility component: `src/components/ScrollManager.tsx`
- On every `location` change:
  - If `location.hash` is present → smooth-scroll to `document.getElementById(hash)`; if element not yet mounted (route just changed), retry once on next frame.
  - Else → `window.scrollTo({ top: 0 })`.
- Returns `null`.

### B. `src/App.tsx`
- Import and render `<ScrollManager />` inside `<BrowserRouter>` above `<Suspense>`. No other changes.

### C. `src/pages/Pricing.tsx` — graceful fallback (no UI changes)
- Keep the API call, but on error fall back to a hardcoded `FALLBACK_PLANS` array (4 plans matching the existing `SubscriptionPlan` shape) so the marketing pricing grid renders.
- Clear `error` state when the fallback is applied so the red error message doesn't show. Console-warn the original error for debugging.
- This preserves the live API path when a backend is reachable and only kicks in on failure — no styling, layout, or copy change.

### D. Nothing else
- Footer links, Hero, Helmet/SEO work, integrations section, headers — left untouched. The user-explicitly-working components are not modified.

## Technical detail

`ScrollManager` (rendered inside `BrowserRouter`):

```tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      // run now and once after paint so lazy/suspended routes resolve
      tryScroll();
      requestAnimationFrame(tryScroll);
      return;
    }
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname, hash]);
  return null;
}
```

Pricing fallback shape mirrors the existing `SubscriptionPlan` interface already in the file.

## Verification after build

- Click Footer → Features / Integrations / VAT Compliance from `/pricing` → navigates to `/` and smoothly scrolls to the right section.
- Click them while already on `/` → smoothly scrolls in-page.
- Navigate to `/pricing`, `/about`, etc. → lands at top, not mid-page.
- `/pricing` renders the plan grid even when the backend is down (no red error string).

## Out of scope

Footer copy/labels, Helmet/SEO additions, Hero changes, backend wiring — untouched.

## Confirmation popup

After the changes are applied in build mode, the implementation message will explicitly confirm "Changes have been made" so it's visible.
