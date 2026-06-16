## Goal
Stop tracking `.env` files in git without changing how the running app loads environment variables.

## Current state
Repo contains:
- `.env` — actively used by Vite at build/runtime (contains `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`)
- `.env.production`
- `.env.example` — safe template, should stay tracked

`.gitignore` currently does NOT exclude any `.env*` files, so they are tracked in the repo.

## Changes
1. **Update `.gitignore`** — add:
   ```
   # Environment variables
   .env
   .env.local
   .env.*.local
   .env.production
   !.env.example
   ```
   The `!.env.example` keeps the template tracked so new contributors know which vars to set.

## What does NOT change
- The physical `.env` and `.env.production` files stay on disk in the sandbox/preview, so Vite continues to read `VITE_SUPABASE_*` exactly as before. The site keeps working identically — backend, auth, all integrations untouched.
- No code, routing, UI, or build config changes.
- `.env.example` remains tracked as the reference template.

## Important caveat (be transparent)
Adding to `.gitignore` only prevents *future* tracking. The `.env` and `.env.production` files are already committed to git history, so their contents remain visible in past commits. Truly "hiding" them requires a history rewrite (e.g. `git filter-repo`), which Lovable cannot perform from the agent — and the current values are the Supabase publishable/anon key + project ID, which are designed to be public (protected by RLS), so leaving history as-is is safe. If you still want history scrubbed, that must be done manually outside Lovable, and any real secrets in there should be rotated.

## Verification
- Confirm `.env` still present on disk after the change
- Confirm preview still loads and Supabase calls succeed (no auth/network regressions)
