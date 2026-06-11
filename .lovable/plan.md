## Scope

Foundation only: global design tokens, Google Fonts wiring, and a reusable Navbar component. No hero, no sections, no page content. Index route stays effectively empty (just renders the Navbar over the dark background) so the shell is verifiable.

## 1. Fonts

In `src/routes/__root.tsx` `head().links`, add preconnect + stylesheet links for Google Fonts:
- `Instrument Serif` (400, 400 italic)
- `DM Sans` (400, 500, 600, 700)

Loaded via `<link>` (not `@import`) per Tailwind v4 rules.

## 2. Design tokens (`src/styles.css`)

Add the brand tokens as raw CSS variables on `:root` (keep existing shadcn tokens intact so UI primitives keep working):

```
--bg-dark: #0A0F1A;
--surface-dark: #111827;
--border-dark: #1F2937;
--bg-light: #F8FAFC;
--accent: #00C9A7;
--accent-hover: #00A88D;
--accent-glow: rgba(0,201,167,0.12);
--text-primary: #F1F5F9;
--text-muted: #94A3B8;
--text-dark: #0F172A;
--text-subtle: #64748B;
--font-display: "Instrument Serif", ui-serif, Georgia, serif;
--font-sans: "DM Sans", ui-sans-serif, system-ui, sans-serif;
```

In `@theme inline`, expose Tailwind utilities:
```
--color-bg-dark, --color-surface-dark, --color-border-dark,
--color-bg-light, --color-accent, --color-accent-hover,
--color-text-primary, --color-text-muted,
--color-text-dark, --color-text-subtle,
--font-display, --font-sans
```

Set body defaults to `bg-bg-dark text-text-primary font-sans`. Override shadcn `--background`/`--foreground` mapping isn't needed since we use the explicit brand tokens directly.

## 3. Navbar component

New file: `src/components/Navbar.tsx`. Reusable, client component using `useState` + `useEffect` scroll listener.

Behavior:
- Fixed top, full width, z-50.
- Transparent initially; after `window.scrollY > 60`, apply `bg-[#0A0F1A]/95 backdrop-blur-md border-b border-border-dark`.
- Smooth transition on bg/border.

Layout (desktop ≥ md):
- Left: small teal rounded-square icon (8px radius, accent bg) + "Outworx" wordmark in DM Sans semibold white.
- Center: nav links — `Product ▾`, `How it Works`, `Pricing`, `Blog`, `API`. DM Sans 14px, `text-text-muted`, hover `text-text-primary`. `Product` has a chevron-down icon (lucide). Dropdown panel is stubbed (not opened) for now — just the chevron + hover state.
- Right: `Log in` ghost link (muted → white on hover) and `Get started →` pill button (`bg-accent text-bg-dark font-bold rounded-full`, hover `bg-accent-hover`, arrow icon).

Mobile (< md):
- Hide center + right groups, show hamburger button (lucide `Menu`).
- Tapping opens a full-height right drawer: fixed inset-y-0 right-0, width ~80vw max 360px, `bg-bg-dark` with left border, slide-in transition, close (X) button top-right.
- Drawer contains the same links stacked (larger tap targets, 16px DM Sans), Log in link, and `Get started →` pill CTA pinned at the bottom with safe padding.
- Backdrop overlay (black/60) closes drawer on click. Lock body scroll while open.

Built with semantic HTML (`<header>`, `<nav>`), `<Link>` from `@tanstack/react-router` for internal routes (use `to="/"` for now since no routes exist yet — links are visual only, will resolve later when routes are added).

## 4. Wire it in

- Render `<Navbar />` inside `RootComponent` in `src/routes/__root.tsx`, above `<Outlet />`, so it persists across all routes.
- Strip the placeholder image in `src/routes/index.tsx` and replace with a minimal empty `<main className="min-h-screen bg-bg-dark" />` so the page is intentionally blank but verifies the shell.

## 5. Verification

- Confirm preview shows dark background, no placeholder, navbar transparent at top.
- Scroll → navbar gets solid bg + blur + border.
- Resize to mobile → hamburger appears, drawer opens/closes correctly.
- Reply with: `Design system and nav ready ✓`

## Out of scope

No hero, features, integrations, testimonials, footer, or any page content. No Product dropdown menu contents. No routes beyond existing `/`.
