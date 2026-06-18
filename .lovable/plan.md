## Goal
Replace the current static `/dashboard-demo` page with the rich interactive product walkthrough from the **Product Tour Guide** project, while keeping the rest of the Outworx site (routes, header/footer, links, SEO, auth, services, build pipeline) untouched.

All existing entry points already point to `/dashboard-demo` (Hero CTA, landing CTA, Footer "Dashboard demo" link, App route, preloader). Reusing the same route means **zero changes** to navigation or workflow — only the page contents are upgraded.

## Scope
- Source: `Product Tour Guide` → `src/routes/view-demo.tsx` (1695 lines, the 7-step interactive tour: dashboard mock, client switcher, categories, upload, AI extraction, publish-to-ledger, archive).
- Target: `src/pages/DashboardDemo.tsx` in this project.
- Only this one page is merged. Nothing else from the source project is imported.

## Adaptations required
The source uses TanStack Start + Tailwind v4; this project uses Vite + React Router + Tailwind v3. The page itself is framework-agnostic React — only the wrapper, imports, and a small CSS utility set need conversion.

1. **Route wrapper** — strip `createFileRoute(...)` and `head: () => ({...})`. Replace with a plain default-exported `DashboardDemo` component. Move the `<title>` / meta into the existing `<Seo>` component (same pattern as the current page).
2. **Linking** — swap `import { Link } from "@tanstack/react-router"` → `import { Link } from "react-router-dom"` and rename `to=` usage as needed (`Link to="/"` already works in react-router).
3. **Site chrome** — wrap the demo in the existing `<Header />` + `<Footer />` (matching every other page) so global nav, theme, and auth state remain consistent. Drop `lg:h-[100dvh] lg:overflow-hidden` from the outer shell so the page scrolls naturally inside the site frame; keep all inner grid/flex sizing, paddings, and proportions exactly as authored. The demo's internal "dashboard top bar" stays inside the page (it's part of the mock UI, not site nav).
4. **Tailwind v4 → v3 utilities** — the source defines `@utility outworx-shell / outworx-card / outworx-glow` and `.scrollbar-thin` in `styles.css`. Port these as plain CSS classes into `src/index.css` (under a new "Demo tour utilities" section). `outworx-shell` background can map to the existing hero gradient token (or fall back to `bg-background` if `--gradient-hero` is not defined here).
5. **Icons / state / portals** — `lucide-react`, `react`, `react-dom` (for `createPortal`) all already exist in this project; no new dependencies.
6. **Keyboard, exploration signals, invoice generator, archive seeding** — copied verbatim. All internal state, callbacks, and step transitions remain identical so the walkthrough workflow is preserved.
7. **Preload hint** — `src/App.tsx` already lazy-loads and preloads `DashboardDemo`; nothing changes there.
8. **SEO** — keep the existing SEO entry for this route (title "View Demo — Outworx", description from the source `head()`), routed through `src/lib/seo.ts` + `<Seo>` like the rest of the site.

## Files touched
- **Replace:** `src/pages/DashboardDemo.tsx` — new contents = adapted view-demo (single-file port, ~1700 lines, same structure as source).
- **Append-only:** `src/index.css` — add `.outworx-shell`, `.outworx-card`, `.outworx-glow`, `.scrollbar-thin`, `.scrollbar-thin-light` utility classes (Tailwind v3 compatible plain CSS). No existing rules modified.
- **No changes** to: `App.tsx`, `Header.tsx`, `Footer.tsx`, `Hero.tsx`, `CTA.tsx`, routing, services, auth, env, sitemap, or any other page. All workflows preserved.

## Side-effect checks
- Bundle size: the demo is ~60 KB of JSX + lucide icons (already lazy-loaded behind `lazy()`). No new npm packages.
- Dark mode: source was authored against the same HSL token names this project already uses, so colors render correctly in both themes.
- Mobile: source includes a mobile menu (`Menu` / `X` icons, `lg:` breakpoints) — kept intact.
- Existing static `DashboardDemo` (stats grid + recent docs table) is replaced. The same intent (showcase the dashboard) is fulfilled at the same URL, just interactively.

## Out of scope
- No backend wiring (page is fully client-side mock, matching current frontend-only stance).
- No changes to branding, colors, fonts, or other pages.
- No new routes; `/view-demo` is **not** added — the tour lives at the existing `/dashboard-demo`.

## Verification
After build: load `/dashboard-demo`, confirm the 7-step tour starts on Welcome, ←/→ keys navigate, client switcher + category exploration advance steps, "Generate sample invoice" produces an invoice, "Publish to ledger" posts and adds it to the archive, Header/Footer render correctly, and links from Hero/CTA/Footer still reach this page.
