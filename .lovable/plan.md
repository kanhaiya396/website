Center-align the Integrations section header in `src/components/landing/HowItWorks.tsx` to match the CIS section style.

Change the `SectionReveal` wrapper (lines 19-29):
- `className="mb-10 max-w-2xl"` → `className="mb-10 mx-auto max-w-2xl text-center"`
- Remove `max-w-xl` from the paragraph and add `mx-auto` so it stays centered.

No other changes.