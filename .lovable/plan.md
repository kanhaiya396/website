## Root cause

The remaining "double load" is not the scroll position — it's the **Suspense fallback flash**. Every page except `/` is `React.lazy()` in `src/App.tsx`, and the fallback is a full-screen centered spinner (`min-h-screen flex items-center justify-center bg-background`). On navigation:

1. `SmoothNavLink` triggers the upward smooth scroll (or skips it if already near top — which is the navbar case).
2. `navigate(to)` runs. The lazy chunk is requested.
3. While the chunk loads, the full-screen `<Spinner />` paints — this is the visible "second load / flash".
4. Chunk arrives, real page mounts.

Two compounding symptoms match what the user reports:
- **Navbar item → navbar item**: user is already at top, so there is no scroll transition at all; the Suspense spinner is the entire perceived "double load".
- **Footer sub-pages**: smooth scroll up looks fine, then the spinner briefly replaces the page before the new one mounts.

## Fix

Two small, coordinated changes. No visual styling, layout, copy, or routing changes.

### 1. Preload lazy route chunks before navigation

In `src/App.tsx`, extract the `import()` factories so they can be triggered manually, e.g.:

```ts
const loadPricing = () => import("./pages/Pricing");
const Pricing = lazy(loadPricing);
// ...same for every lazy page
```

Export a small `routePreloaders` map keyed by path (`/pricing`, `/about`, `/blog`, `/blog/:slug` → `/blog/`, etc.) so other components can call them.

### 2. Trigger preload from `SmoothNavLink`

In `src/components/SmoothNavLink.tsx`:

- On `onMouseEnter` / `onFocus` / `onTouchStart` → call the matching preloader (warm the chunk before the user even clicks). Static `<Link>` already does this via prefetch in some setups; we'll do it explicitly for our lazy imports.
- On click, **before** starting the smooth scroll, kick off the preloader and keep a reference to the promise.
- After the scroll finishes (existing `scrollend` / 450 ms fallback), `await` the preloader promise (with a short cap, e.g. 600 ms) and only then call `navigate(to)`. By the time React mounts the new route, the chunk is already resolved, so Suspense resolves synchronously and the fallback never paints.
- For the "already at top" case (navbar → navbar), skip the scroll but still preload + await before navigating, so navbar navigation also avoids the spinner flash.

### 3. Make the Suspense fallback non-intrusive as a safety net

In `src/App.tsx`, change `Spinner` from a full-screen replacement to `null` (or a 1px top progress bar). This guarantees that even when preload races (slow network, deep link, back/forward to an uncached chunk) the user never sees a full-screen white spinner replacing the previous page. Since the page itself owns its own background and layout, rendering `null` for a few ms is invisible rather than a flash.

## Files touched

- `src/App.tsx` — expose lazy import factories as preloaders, change Suspense fallback to `null`.
- `src/components/SmoothNavLink.tsx` — preload on hover/focus/touch; await preload before `navigate`; preload+await also when already at top (no scroll case).

## Result

- Navbar → navbar: instant navigation, no spinner flash.
- Footer link from bottom of page: smooth scroll up → new page mounts at top with no spinner in between.
- Back/forward and deep links still work; Suspense `null` fallback is invisible if a chunk ever does have to load.
