## Scope

Two minimal, targeted fixes. No styling, layout, copy, or unrelated components change.

## 1. Header nav — fix in-page anchor links

All Header routes are valid and all in-page sections (`#features`, `#how-it-works`, `#vat`) exist. However, the Product dropdown items use `<Link to="/#features">` etc. React Router does not auto-scroll to hash fragments, so clicking these from any page (including `/`) does nothing visible — they're effectively broken.

Fix: in `src/components/layout/Header.tsx`, intercept clicks on dropdown children (and their mobile equivalents) whose `href` contains a `#`. On click:
- If already on `/`, call `document.getElementById(hash).scrollIntoView({ behavior: "smooth" })`.
- Otherwise, navigate to `/` then scroll to the element after mount (using `useNavigate` + a small `setTimeout`, or by passing state and handling it in `Index.tsx` — simplest: navigate then `requestAnimationFrame` scroll).

Nothing else in the header is touched. Logo, About, Pricing, Blog, API, Log in, Get started all already work.

## 2. Trusted-by firms — wire to official websites

In `src/components/landing/Testimonials.tsx`, change `trustedBy` from an array of strings to an array of `{ name, url }`, and render each as an `<a href={url} target="_blank" rel="noopener noreferrer">` while keeping the exact same classes and motion wrapper (only the tag changes from `motion.div` to `motion.a`, preserving styles).

Mapping (official sites):

```
Price Bailey       → https://www.pricebailey.co.uk
Smooth Accounting  → https://smoothaccounting.co.uk
Wilson Partners    → https://www.wilson-partners.co.uk
Acumist            → https://acumist.com
Finance Box        → https://www.financebox.co.uk
Delphini           → https://www.delphini.co.uk
Lubbock Fine       → https://www.lubbockfine.co.uk
HJS Accountants    → https://www.hjsaccountants.co.uk
```

(URLs to be verified with a quick websearch during build before committing; if any firm's official site differs, use the verified one.)

## Files changed

- `src/components/layout/Header.tsx` — add click handler for hash links in Product dropdown (desktop + mobile).
- `src/components/landing/Testimonials.tsx` — replace `trustedBy` strings with `{name, url}` and render as anchors.

## Out of scope (already working)

Footer, Hero CTAs, CTA section, auth pages, logo link, all top-level header nav routes.
