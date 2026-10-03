import fs from 'fs';
import path from 'path';

const accountId = '75825a25a1390d7ae7ecf5d279830e4a';
const projectName = 'pharmacy-platform';
const domainName = 'optimusrufus.com';

const configContent = fs.readFileSync('C:\\Users\\hp\\.wrangler\\config\\default.toml', 'utf8');
const tokenMatch = configContent.match(/oauth_token = "([^"]+)"/);

if (!tokenMatch) {
  console.error('Failed to parse OAuth token from Wrangler config.');
  process.exit(1);
}

const token = tokenMatch[1];

async function addDomain(domain) {
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${projectName}/domains`;
  console.log(`[CLOUDFLARE API] Adding custom domain '${domain}' to Pages project '${projectName}'...`);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: domain })
  });

  const data = await response.json();
  console.log(`[CLOUDFLARE API RESULT]`, JSON.stringify(data, null, 2));
}

async function main() {
  await addDomain(domainName);
  await addDomain(`www.${domainName}`);
}

main().catch(err => console.error(err));
