Cloudflare Pages Deployment (Next.js 14 + next-intl)
===================================================

This project is tested to run on Cloudflare Pages using the `@cloudflare/next-on-pages` adapter.

Prerequisites
- Node 20 LTS (see `package.json` engines)
- Cloudflare account and `wrangler` CLI logged in

Build and Preview Locally
1. Install deps: `npm i`
2. Build adapter output:
   - `npm run cf:preview`
   - This runs `next build` then `@cloudflare/next-on-pages` to generate `.vercel/output`, then `wrangler pages dev` to preview.

Deploy to Cloudflare Pages
1. `npm run cf:deploy`
   - Uses `.vercel/output` as build output directory (see `wrangler.toml`).
   - First run will prompt to create/select a Pages project.

Notes
- Internationalization: middleware is configured with `localePrefix: 'always'` and 308 redirect from `/` to `/${defaultLocale}` which works in the Cloudflare runtime.
- Edge compatibility: avoid Node-only APIs in route handlers. `next-intl` configuration uses `getRequestConfig` with `requestLocale` and dynamic imports of JSON which are compatible with the adapter.
- Environment variables: define them in Cloudflare Pages project settings (Production/Preview). `.env.local` is used only for local dev.

Troubleshooting
- If you see missing routes at runtime, ensure `.vercel/output/functions` exists after `npm run cf:build`.
- If you add new locales or namespaces, run `npm run check:i18n` to verify message files before deploy.

