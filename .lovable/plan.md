## What's actually broken

I scanned the project against Experimentation. The "broken integrations icons" you flagged trace to a single concrete bug — and it's the only real defect I found:

**The 4 brand logo pointers (Xero, QuickBooks, Sage, Nomi) point at Experimentation's CDN assets, not this project's.**

- `src/assets/logos/xero.png.asset.json`, `quickbooks.png.asset.json`, `sage.png.asset.json`, `nomi.png.asset.json` all contain `"project_id": "006e03ba-ab1a-42e0-991d-9f881117c2d2"` (Experimentation) instead of this project's ID.
- Lovable CDN assets are project-scoped, so this project's preview can't load those URLs — the logos render as broken `<img>` tags in the "Connects with" row on the homepage.
- The component code (`IntegrationsBar.tsx`, `brand-logos/*.tsx`) is byte-identical to Experimentation, so no source changes are needed — only the asset pointers.

Everything else checked out:
- Page list, landing component list, layout, hooks, lib, and services match Experimentation.
- No other file in the repo references Experimentation's project ID, and no other component is using a stale `.asset.json` pointer.
- Header (your recent persistent glass-dark fix) will be preserved.

## Fix

1. **Copy the 4 logo binaries from Experimentation into this project** using `cross_project--copy_project_asset` to pull each PNG into a temp path:
   - `xero.png`, `quickbooks.png`, `sage.png`, `nomi.png` → `/tmp/logos/`
2. **Re-upload each PNG into this project** via `lovable-assets create --file /tmp/logos/<name>.png` and capture the new pointer JSON.
3. **Overwrite the 4 pointer files** at `src/assets/logos/*.png.asset.json` with the freshly generated pointers (new `asset_id` + this project's `project_id`, same filenames so no code changes needed).
4. **Verify**: reload `/`, confirm Xero / QuickBooks / Sage / Nomi logos render in the "Connects with" row. Run `bun run build` to confirm nothing else regressed.

## Out of scope / preserved

- **Header**: keeping your persistent `glass-dark` background fix — not touching `src/components/layout/Header.tsx`.
- **`.env*` and `.gitignore`**: untouched.
- **`src/integrations/supabase/*`**: untouched (auto-generated, project-specific).
- **Component source code**: no rewrites — the diff against Experimentation showed component sources already match.

If after this fix you spot another component misbehaving (animation glitch, broken link, layout break on a specific page), tell me which page/section and I'll fix that as a follow-up — I don't want to "fix" things that aren't actually broken.