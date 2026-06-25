## Destination verification

This project (the one we're in now) is **Outworx**, and per the GitHub integration it is connected to the main repository on the default (main) branch. Any file change written here syncs to that GitHub repo automatically — no manual push needed. The source for the overwrite is the **Experimentation** project (id `006e03ba-…`), pulled via cross-project read tools. Cross-project copy is one-way (source → here), which matches what we need.

Before any writes, I will re-confirm with one quick `cross_project--list_project_dir` on the source root to make sure nothing has shifted.

## Files to overwrite (source → here, same paths)

**Root:** `index.html`, `package.json`, `components.json`, `tailwind.config.ts`, `vite.config.ts`

**public/:** `404.html`, `CNAME`, `favicon.ico`, `favicon.svg`, `og/outworx-cover.png`, `placeholder.svg`, `robots.txt`, `sitemap.xml`

**src/ (root):** `App.css`, `App.tsx`, `index.css`, `main.tsx`, `vite-env.d.ts`

**src/components/:** `DemoTransitionLink.tsx`, `ErrorBoundary.tsx`, `RouteFallback.tsx`, `ScrollManager.tsx`, `Seo.tsx`, `SmoothNavLink.tsx`, `ThemeProvider.tsx`

**src/components/landing/:** `CTA.tsx`, `FeatureMockUIs.tsx`, `Features.tsx`, `Hero.tsx`, `HowItWorks.tsx`, `Testimonials.tsx`, `VATCompliance.tsx`

**src/components/layout/:** `Footer.tsx`, `Header.tsx`

**src/components/ui/** (all 48 shadcn files confirmed present in source): full mirror

**src/data/:** `blogPosts.ts`
**src/hooks/:** `use-mobile.tsx`, `use-toast.ts`
**src/lib/:** `appUrl.ts`, `env.ts`, `logger.ts`, `seo.ts`, `utils.ts`
**src/pages/** (full mirror): `About.tsx`, `ApiDocs.tsx`, `Blog.tsx`, `BlogPost.tsx`, `Careers.tsx`, `Cookies.tsx`, `DashboardDemo.tsx`, `Documentation.tsx`, `Index.tsx`, `NotFound.tsx`, `Pricing.tsx`, `Privacy.tsx`, `Security.tsx`, `Status.tsx`, `Terms.tsx`
**src/services/:** `pricing.ts`
**src/types/:** `pricing.ts`
**supabase/functions/:** `pricing-plans/index.ts`

## Files explicitly NOT touched (kept as-is here)

`.env`, `.env.example`, `.env.production`, `src/integrations/supabase/client.ts`, `src/integrations/supabase/types.ts`, `supabase/config.toml`, lockfiles, `node_modules`.

## Dead-code / tree-mirror pruning

After copying, for the directories listed as "entire folder" (`src/components/ui/`, `src/pages/`, plus the targeted subfolders) I will diff the local tree against the source tree and `rm` any file here that has no counterpart in the source. Other directories not in scope (e.g. `src/integrations/`) are left alone.

Targeted pruning candidates to check explicitly:
- `src/components/`, `src/components/landing/`, `src/components/layout/`, `src/components/ui/` — remove extras
- `src/pages/` — remove extras (any leftover auth pages, dashboards, etc.)
- `src/lib/`, `src/hooks/`, `src/services/`, `src/types/`, `src/data/` — remove extras within scope
- `public/` — remove extras within scope (preserve subfolders the source doesn't enumerate only if they aren't part of the mirror — none expected)
- `supabase/functions/` — remove extra functions not present in source

## Dependency reconciliation

After overwriting `package.json`, run `bun install` so the lockfile matches. If any imports still fail to resolve, run `bun add <pkg>` for the missing one(s). Do not hand-edit the lockfile.

## Verification

1. Typecheck/build runs automatically after edits — review output.
2. Spot-check the preview: home (`/`), `/pricing`, `/demo` (DashboardDemo), `/blog`, `/about`, a couple of legal pages, and 404.
3. Confirm Supabase client import path still resolves (we did not touch `src/integrations/supabase/*`).
4. Confirm the `pricing-plans` edge function still deploys (file unchanged in shape).

## Risks / notes

- `package.json` from Experimentation may pin different versions than this project. `bun install` will reconcile; if a peer-dep conflict appears, I'll resolve by aligning to the source's version.
- If Experimentation's `App.tsx` imports anything from `src/integrations/supabase/*` with a different shape than what's generated here, we'll see a typecheck error; fix by adjusting only the consumer (not the auto-generated file).
- `.gitignore` is not in the copy list, so this project's existing ignore rules (env files hidden) remain intact.
- GitHub sync: as soon as writes land, the connected repo's main branch receives the commit automatically.
