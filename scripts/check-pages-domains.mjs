import fs from 'fs';

const accountId = '75825a25a1390d7ae7ecf5d279830e4a';
const projectName = 'pharmacy-platform';
const configContent = fs.readFileSync('C:\\Users\\hp\\.wrangler\\config\\default.toml', 'utf8');
const tokenMatch = configContent.match(/oauth_token = "([^"]+)"/);
const token = tokenMatch[1];

async function checkDomains() {
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${projectName}/domains`;
  const response = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await response.json();
  console.log('[CLOUDFLARE PAGES DOMAINS STATUS]', JSON.stringify(data, null, 2));
}

checkDomains().catch(err => console.error(err));
