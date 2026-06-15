Apply the Pricing / API page entry transition (framer-motion fade-up: `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}` over `duration: 0.5`) to the About and Blog hero / intro sections.

Scope:
- Wrap the About page hero/heading block in a `<motion.div>` with the same fade-up timing.
- Wrap the Blog page hero/heading block in a `<motion.div>` with the same fade-up timing.
- Since the animation triggers on page mount, it will run identically whether the user navigates via the header nav or the footer links — no separate footer logic needed.

No other styling, copy, or routing changes.