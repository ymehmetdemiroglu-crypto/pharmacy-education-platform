import fs from 'fs';

const accountId = '75825a25a1390d7ae7ecf5d279830e4a';
const projectName = 'pharmacy-platform';
const configContent = fs.readFileSync('C:\\Users\\hp\\.wrangler\\config\\default.toml', 'utf8');
const tokenMatch = configContent.match(/oauth_token = "([^"]+)"/);
const token = tokenMatch[1];

async function setEnv() {
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${projectName}`;
  console.log(`[CLOUDFLARE ENV] Setting live Supabase environment variables on Pages project '${projectName}'...`);

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      deployment_configs: {
        production: {
          env_vars: {
            VITE_SUPABASE_URL: { value: 'https://ibyntbynqkpkkpeoudzv.supabase.co' },
            VITE_SUPABASE_ANON_KEY: { value: 'sb_publishable_Df_D7IPDzVKcUhsxynB5sQ_06q_DAym' }
          }
        },
        preview: {
          env_vars: {
            VITE_SUPABASE_URL: { value: 'https://ibyntbynqkpkkpeoudzv.supabase.co' },
            VITE_SUPABASE_ANON_KEY: { value: 'sb_publishable_Df_D7IPDzVKcUhsxynB5sQ_06q_DAym' }
          }
        }
      }
    })
  });

  const data = await response.json();
  console.log('[CLOUDFLARE ENV RESULT]', JSON.stringify(data, null, 2));
}

setEnv().catch(err => console.error(err));
