/**
 * sync-supabase-auth-config.mjs
 * 
 * Synchronizes production Auth Configuration for Supabase project `ibyntbynqkpkkpeoudzv`:
 * - Site URL: https://optimusrufus.com
 * - Additional Redirect URLs: https://optimusrufus.com/**, https://pharmacy-platform.pages.dev/**, https://*.pharmacy-platform-9u0.pages.dev/**, https://*.pharmacy-platform.pages.dev/**
 * - Recovery email template with Turkish copy directing to https://optimusrufus.com/reset-password
 */

import fs from 'fs';
import path from 'path';

const PROJECT_REF = 'ibyntbynqkpkkpeoudzv';
const SITE_URL = 'https://optimusrufus.com';
const REDIRECT_URLS = [
  'https://optimusrufus.com/**',
  'https://pharmacy-platform.pages.dev/**',
  'https://*.pharmacy-platform-9u0.pages.dev/**',
  'https://*.pharmacy-platform.pages.dev/**'
];

async function main() {
  console.log(`[SUPABASE AUTH CONFIG] Target project: ${PROJECT_REF}`);
  console.log(`[SUPABASE AUTH CONFIG] Target Site URL: ${SITE_URL}`);
  console.log(`[SUPABASE AUTH CONFIG] Redirect URLs: ${REDIRECT_URLS.join(', ')}`);

  const token = process.env.SUPABASE_ACCESS_TOKEN;
  if (!token) {
    console.log('\n[NOTICE] SUPABASE_ACCESS_TOKEN is not set in environment.');
    console.log('To synchronize via Supabase Management API directly:');
    console.log(`  $env:SUPABASE_ACCESS_TOKEN="<your_personal_access_token>"`);
    console.log('  node scripts/sync-supabase-auth-config.mjs');
    console.log('\nAlternatively, verify settings in the Supabase Dashboard:');
    console.log(`  URL Configuration: https://supabase.com/dashboard/project/${PROJECT_REF}/auth/url-configuration`);
    console.log(`  Email Templates:   https://supabase.com/dashboard/project/${PROJECT_REF}/auth/templates`);
    return;
  }

  const templatePath = path.resolve('supabase/templates/recovery.html');
  const recoveryTemplate = fs.existsSync(templatePath) ? fs.readFileSync(templatePath, 'utf8') : '';

  const endpoint = `https://api.supabase.com/v1/projects/${PROJECT_REF}/config/auth`;
  console.log(`[SUPABASE AUTH CONFIG] Sending PATCH request to ${endpoint}...`);

  const response = await fetch(endpoint, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      site_url: SITE_URL,
      uri_allow_list: REDIRECT_URLS.join(','),
      mailer_recovery_template: recoveryTemplate
    })
  });

  const data = await response.json();
  console.log('[SUPABASE AUTH CONFIG RESULT]', JSON.stringify(data, null, 2));
}

main().catch(err => {
  console.error('[SUPABASE AUTH CONFIG ERROR]', err);
  process.exit(1);
});
