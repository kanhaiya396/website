## Goal

Switch the four brand logos (Xero, QuickBooks, Sage, Nomi) from the current inline SVGs to the official brand PNGs (uploaded as Lovable assets), and rebuild `IntegrationsBar` as a logos-only strip with white rounded tiles per the provided spec.

## Steps

1. **Pull the official PNGs from the Experimentation project**
   - Copy each Lovable asset pointer into the same path here:
     - `src/assets/logos/xero.png.asset.json`
     - `src/assets/logos/quickbooks.png.asset.json`
     - `src/assets/logos/sage.png.asset.json`
     - `src/assets/logos/nomi.png.asset.json`
   - Uses `cross_project--copy_project_asset` so the binaries serve from the CDN under this project's namespace (fixes the earlier 403s caused by stale pointer project IDs).

2. **Rewrite the four logo components** in `src/components/brand-logos/`
   - Each becomes a thin wrapper:
     ```tsx
     import asset from "@/assets/logos/xero.png.asset.json";
     export function XeroLogo({ className = "h-6 w-auto" }: { className?: string }) {
       return <img src={asset.url} alt="Xero" className={`object-contain ${className}`} />;
     }
     ```
   - Same shape for `QuickBooksLogo`, `SageLogo`, `NomiLogo`. `className` stays configurable so `IntegrationsBar` can tune optical weight per logo.

3. **Rebuild `src/components/landing/IntegrationsBar.tsx`** to match the spec
   - Remove the HMRC / VIES / Slack / WhatsApp chips and the `CHIPS` constant.
   - Centered `flex-wrap` row with the uppercase "Connects with" eyebrow followed by the four logos.
   - Each logo wrapped in `h-9 rounded-lg bg-white px-3 ring-1 ring-black/5` so brand colors pop on the dark page.
   - Per-logo `max-h-*` sizing kept from the spec:
     - Xero `max-h-6`
     - QuickBooks `max-h-[26px]`
     - Sage `max-h-5`
     - Nomi `max-h-5`

4. **Verify**
   - Confirm the four CDN URLs return image bytes (curl HEAD).
   - Tsgo typecheck; visual check on `/` that all four logos render inside white tiles with no broken-image icons.

## Notes

- `HowItWorks.tsx` already imports the same four logo components — no changes needed there; it inherits the new PNG-backed versions automatically.
- No business-logic or routing changes.
