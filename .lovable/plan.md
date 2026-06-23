## Replace Testimonials with "Why Outworx" value section

Replace the entire contents of `src/components/landing/Testimonials.tsx` with a new value-prop section. Keep the file name, export name (`Testimonials`), and its usage in `src/pages/Index.tsx` unchanged so the homepage layout/order stays identical.

### Structure

```text
<section> (same vertical padding & container as current Testimonials)
  ├── Header block (centered)
  │     ├── Eyebrow: "WHY OUTWORX"
  │     ├── 3 pill labels: ✓ Less Manual Entry · ✓ Faster Reviews · ✓ More Control
  │     ├── H2: "The work before the accounting, automated."
  │     │     + ambient radial glow behind it (accent, very low opacity)
  │     └── Subheading: "Capture, review and prepare financial data before it reaches your ledger."
  └── 2×2 Card grid (same gap & breakpoints as current testimonial grid)
        ├── Card 1 — AI-Powered Extraction   (FileText + Sparkles)
        ├── Card 2 — Human Review Controls    (ShieldCheck)
        ├── Card 3 — Built for Real Accounting Work (Workflow)
        └── Card 4 — Works With Your Existing Tools (Plug / Link2)
```

Each card: icon tile (accent-tinted), title, description, and a row of 3 check-mark highlight chips.

### Animations (framer-motion, `whileInView` with `viewport={{ once: true, margin: "-10%" }}`)

Header sequence:
1. Three pill labels — fade up + blur(6px→0), 120ms stagger, ease-out.
2. H2 — opacity 0→1, y 16→0, blur 8→0, 550ms; ambient glow scales 0.95→1, opacity 0→~0.35, 800ms (behind, `-z-10`, `blur-3xl`).
3. Subheading — fade in 400ms.

Cards: fade + y 20→0, 500ms ease-out, stagger 0/100/200/300ms.

Hover (Tailwind transitions, no motion bounce):
- border: `border-white/10` → `border-primary/40`
- subtle accent glow via `shadow-[0_0_0_1px_hsl(var(--primary)/0.15),0_8px_30px_-12px_hsl(var(--primary)/0.35)]`
- `-translate-y-0.5` (≈2px)
- icon `group-hover:scale-105`
- 200–250ms ease-out, no bounce

Respect `useReducedMotion` — skip transforms/blur, keep opacity only.

### Styling

- Reuse existing tokens from `src/index.css` / `tailwind.config.ts`: `bg-card`, `border-border`/`border-white/10`, `text-foreground`, `text-muted-foreground`, `text-primary`, `rounded-2xl` (matches current testimonial card radius), `container mx-auto px-4`.
- H2: `font-display font-extrabold tracking-tight text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-white`, max 2 lines (`max-w-3xl mx-auto`, balanced).
- Subheading: `text-lg text-muted-foreground max-w-2xl mx-auto`.
- Eyebrow: small uppercase tracked label in `text-primary/80`.
- Pill labels: `inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground`, check icon in `text-primary`.
- Cards: `group relative rounded-2xl border border-white/10 bg-card/60 backdrop-blur p-6 md:p-7 h-full flex flex-col` with `transition-all duration-200`.
- Highlight chips inside cards: same pill style as header labels, wrap-friendly.
- Grid: `grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6` (mirrors current 2×2), `items-stretch` for equal heights.

### Icons (lucide-react)

`FileText`, `Sparkles`, `ShieldCheck`, `Workflow`, `Plug`, `Check`. Card icon shown in a `h-11 w-11 rounded-xl bg-primary/10 border border-primary/20 grid place-items-center text-primary`.

### Scope / non-goals

- Only `src/components/landing/Testimonials.tsx` is modified.
- No changes to `Index.tsx`, header, hero, features, footer, or any other section.
- No new dependencies (framer-motion + lucide-react already used).
- No global CSS changes.

### QA checklist before finishing

- Section vertical padding matches the prior testimonials section so page balance is preserved.
- 1-col on mobile, 2-col from `md`, equal card heights.
- No layout shift (icons sized, images none).
- Reduced-motion path verified.
- Dark theme tokens only; no hardcoded hex.
