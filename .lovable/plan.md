## Goal

Keep the "scrolling upward" feel when moving between pages, but remove the visible double-load (where the new page briefly appears at the old scroll Y, then animates to the top). On a live site that flash looks like a glitch.

## Approach

The current `ScrollManager` animates **after** the route changes — it restores the previous Y on the freshly mounted page, then smooth-scrolls to 0. That is what causes the visible "second load".

Fix: do the smooth upward scroll on the **current** page **before** navigating. By the time the new route mounts, the window is already at top, so the new page just appears at the top — no jump, no double render, but the user still sees an upward scroll transition.

## Changes

### 1. New `SmoothNavLink` wrapper (or global click interceptor)

Create `src/components/SmoothNavLink.tsx` — a thin wrapper around react-router's `Link` that:

- On click of an internal route link (different `pathname`, no hash):
  1. `preventDefault()`
  2. If `window.scrollY > 4`, smooth-scroll the current page to `top: 0`.
  3. After the scroll finishes (listen for `scrollend`, or fall back to a ~350 ms timer), call `navigate(to)`.
- If the link targets the same path, has a hash, is external (`mailto:`, `http`), or the user used a modifier key / middle click — fall through to default `Link` behavior.

### 2. Use it in the marketing chrome

Swap `Link` → `SmoothNavLink` only in the components that trigger cross-page navigation from a scrolled position:

- `src/components/layout/Footer.tsx` (all four link columns + bottom legal links)
- `src/components/layout/Header.tsx` (desktop + mobile nav items, logo, Log in / Get started CTAs)

Hash links inside the header (Features / How It Works / VAT Compliance dropdown) keep using the existing `handleHashLink` flow — unchanged.

### 3. Simplify `ScrollManager`

In `src/components/ScrollManager.tsx`:

- Remove the "restore previous Y then smooth-scroll to 0" branch and the `lastYRef` scroll listener.
- On PUSH/REPLACE with no hash → instant `scrollTo(0, 0)` (the upward animation already happened before navigation, so the new page just lands at top).
- Keep POP behavior (instant jump to 0).
- Keep hash handling exactly as it is (poll for element, smooth on PUSH, instant on POP).

## Result

- User clicks a footer link → current page smoothly scrolls up → new page mounts at top. Single visible motion, no flash of the new page at the wrong position.
- Back/forward and in-page hash links behave as they do today.
- No visual styling, spacing, colors, fonts, layout, or copy changes.

## Files touched

- `src/components/SmoothNavLink.tsx` *(new)*
- `src/components/ScrollManager.tsx` *(simplified)*
- `src/components/layout/Footer.tsx` *(Link → SmoothNavLink)*
- `src/components/layout/Header.tsx` *(Link → SmoothNavLink for non-hash nav)*
