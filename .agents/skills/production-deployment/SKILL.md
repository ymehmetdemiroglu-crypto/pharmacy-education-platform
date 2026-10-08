---
name: production-deployment
description: Build, verify, and deploy the Pharmacy Education Platform to Cloudflare Pages (optimusrufus.com) and synchronize Supabase Auth settings without localhost dependencies.
---

# Production Deployment & Auth Harmonization Skill

Use this skill whenever deploying web updates to production, updating Supabase Auth configurations, or verifying mobile authentication flows.

## 1. Pre-Deployment Build & Verification
1. Run full typecheck and test suite:
   ```bash
   pnpm test
   pnpm --filter @pharmacy/web build
   ```
2. Verify production bundle integrity guard (zero forbidden internal audit notes):
   ```bash
   node scripts/test-prod-bundle.mjs
   ```

## 2. Deploy to Cloudflare Pages
1. Deploy compiled `apps/web/dist` directory using Wrangler:
   ```bash
   npx wrangler pages deploy apps/web/dist --project-name=pharmacy-platform --commit-dirty=true
   ```
2. Verify live HTTP endpoints:
   - `curl -I https://optimusrufus.com/` (HTTP 200 OK)
   - `curl -I https://optimusrufus.com/reset-password` (HTTP 200 OK)
   - `curl -I https://optimusrufus.com/dashboard` (HTTP 200 OK)

## 3. Synchronize Supabase Auth URLs
1. Execute the automated sync script or verify `supabase/config.toml`:
   - Site URL: `https://optimusrufus.com`
   - Additional Redirect URLs:
     - `https://optimusrufus.com/**`
     - `https://pharmacy-platform.pages.dev/**`
     - `https://*.pharmacy-platform-9u0.pages.dev/**`
2. Ensure `supabase/templates/recovery.html` uses `{{ .ConfirmationURL }}` styled with Modern Obsidian & Emerald design.

## 4. Post-Deployment Verification Checklist
- [ ] Zero `localhost` or `127.0.0.1` references in client runtime network requests.
- [ ] Hard browser reload on `/reset-password` returns HTTP 200 without 404 fallback.
- [ ] Playwright E2E tests pass across Mobile (`375x667`, `390x844`), Tablet, and Desktop viewports.
