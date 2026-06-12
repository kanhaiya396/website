## Problem

In `src/components/layout/Header.tsx`, the desktop "Product" menu uses Radix `DropdownMenu` with `DropdownMenuItem asChild` wrapping a `<Link>`. The link's `onClick` runs `handleHashLink`, which calls `e.preventDefault()` and does a manual `scrollIntoView` / `navigate("/")`.

Because `preventDefault` is called on the click event before Radix's default item-select handler runs (and because `asChild` forwards the event to the inner Link), Radix sometimes doesn't receive the "select" signal it needs to auto-close the menu. Result: after clicking Features / How It Works / VAT Compliance, the page scrolls to the section but the dropdown panel stays open until the user clicks elsewhere.

## Fix (Header.tsx only)

1. Convert the Product `DropdownMenu` into a **controlled** component with local state:
   ```ts
   const [productOpen, setProductOpen] = useState(false);
   ```
   Pass `open={productOpen}` and `onOpenChange={setProductOpen}` to `<DropdownMenu>`.

2. In each Product `DropdownMenuItem`, use Radix's `onSelect` (which fires reliably regardless of the child's `preventDefault`) to:
   - call `setProductOpen(false)`
   - then run the existing hash-scroll / navigation logic.

   Keep the child `<Link>` for accessibility and right-click "open in new tab", but the close is no longer dependent on the click bubbling correctly.

3. No changes to:
   - Mobile menu markup or behavior
   - Other nav items (About, Pricing, Blog, API)
   - Styling, spacing, animations, or text
   - `ScrollManager`, routing, SEO components, or any page file

## Out of scope

Footer dropdowns, route scroll behavior, and any visual tweaks. Only the Product menu close-on-select bug is addressed.
