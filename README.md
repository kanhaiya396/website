# Outworx — Marketing Site (outworx.ai)

Public marketing site served at **outworx.ai**.

The authenticated product lives at **app.outworx.ai** in a separate
codebase (`outworx_main` / `outworx_frontend`). Every CTA on this site
hands the visitor off to the app domain.

## Pages

| Route        | Purpose                                                |
|--------------|--------------------------------------------------------|
| `/`          | Landing — hero, features, how it works, VAT, CTA       |
| `/pricing`   | 4 subscription tiers (fetched from app.outworx.ai API) |
| `/privacy`   | Privacy notice (UK GDPR)                               |
| `/terms`     | Terms of service                                       |
| `/docs`      | Architecture / platform documentation                  |
| `/api-docs`  | Public REST API reference                              |

## Local development

```bash
npm install
npm run dev          # http://localhost:8081
```

Set `outworx_marketing/.env.local` (copy from `.env.example`) to point
the CTA / API calls at your local app dev server during development:

```
VITE_APP_URL=http://localhost:3000
VITE_API_BASE_URL=
```

Empty `VITE_API_BASE_URL` uses the Vite proxy in `vite.config.ts` which
forwards `/api/*` to `http://localhost:8000` (Django).

## Production build

```bash
npm run build        # emits dist/
```

Static-host friendly (Cloudflare Pages / Netlify / Vercel). SPA fallback
is configured via `public/_redirects` so deep links like `/pricing`
work on first load.

Production env:

```
VITE_APP_URL=https://app.outworx.ai
VITE_API_BASE_URL=https://app.outworx.ai
```

The Django backend at `app.outworx.ai` must allow `https://outworx.ai`
and `https://www.outworx.ai` in `CORS_ALLOWED_ORIGINS` for the Pricing
page's cross-origin fetch of `/api/v1/accounts/subscription-plans/` to
succeed.

## Stack

Vite + React 18 + TypeScript, Tailwind + shadcn/ui, React Router,
Framer Motion, TanStack Query.
