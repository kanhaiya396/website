## Problem

In `src/components/layout/Header.tsx`, the desktop "Product" nav uses Radix `DropdownMenu` with `DropdownMenuItem` wrapping a `Link`. The item's `onClick` runs `handleHashLink`, which calls `e.preventDefault()` to trigger a manual smooth-scroll. In some cases the dropdown stays visibly open after the click — Radix's auto-close on select can race with the preventDefault'd click and the smooth-scroll, leaving the menu mounted.

## Fix (Header.tsx only)

Make the Product dropdown controlled and explicitly close it on item click — without changing the link target, the scroll behavior, or any styling.

1. Add a local `productOpen` state:
   ```ts
   const [productOpen, setProductOpen] = useState(false);
   ```
2. Pass it to the Product `DropdownMenu`:
   ```tsx
   <DropdownMenu open={productOpen} onOpenChange={setProductOpen}>
   ```
3. On each `DropdownMenuItem`'s `Link`, extend the existing `onClick` so it still calls `handleHashLink(child.href)` (preserving navigation/scroll), then calls `setProductOpen(false)`. Using `onClick` (not `onSelect`) keeps the existing handler signature and ensures close happens regardless of whether `preventDefault` was called.

## Out of scope

- No changes to link `to=` targets, hash routing, `handleHashLink`, ScrollManager, mobile menu, other nav items, styles, classes, spacing, or icons.
- No changes to any other file.

## Technical notes

- Radix normally closes on `onSelect`, but with `asChild` + a child `onClick` that does `preventDefault`, the close can be skipped/visually delayed. A controlled `open` state with an explicit `setProductOpen(false)` on click is the minimal, deterministic fix.
- The same pattern is only applied to the Product dropdown; non-dropdown nav links are untouched.
