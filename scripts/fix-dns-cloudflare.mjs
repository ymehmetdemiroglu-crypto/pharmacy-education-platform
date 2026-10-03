import fs from 'fs';

const accountId = '75825a25a1390d7ae7ecf5d279830e4a';
const configContent = fs.readFileSync('C:\\Users\\hp\\.wrangler\\config\\default.toml', 'utf8');
const tokenMatch = configContent.match(/oauth_token = "([^"]+)"/);
const token = tokenMatch[1];
const targetDomain = 'optimusrufus.com';

async function fixDns() {
  console.log('[CLOUDFLARE DNS] Fetching zone list...');
  const zonesRes = await fetch(`https://api.cloudflare.com/client/v4/zones?name=${targetDomain}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const zonesData = await zonesRes.json();
  console.log('[CLOUDFLARE ZONES DATA]', JSON.stringify(zonesData, null, 2));

  if (!zonesData.success || !zonesData.result.length) {
    console.error('Zone not found for', targetDomain);
    return;
  }

  const zoneId = zonesData.result[0].id;
  console.log(`[CLOUDFLARE DNS] Found Zone ID ${zoneId} for ${targetDomain}`);

  // Get DNS records
  const dnsRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const dnsData = await dnsRes.json();
  console.log('[CLOUDFLARE DNS RECORDS]', JSON.stringify(dnsData, null, 2));

  // Check for records pointing to cfargot or tunnel
  for (const record of dnsData.result || []) {
    if (record.content.includes('cfargot.com') || record.content.includes('tunnel') || (record.type === 'CNAME' && !record.content.includes('pages.dev'))) {
      console.log(`[CLOUDFLARE DNS] Deleting conflicting record ${record.id} (${record.name} -> ${record.content})...`);
      const delRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${record.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const delData = await delRes.json();
      console.log('[CLOUDFLARE DELETE RESULT]', delData);
    }
  }

  // Ensure CNAME points to pharmacy-platform-9u0.pages.dev
  const rootRecord = (dnsData.result || []).find(r => r.name === targetDomain);
  if (!rootRecord || !rootRecord.content.includes('pages.dev')) {
    if (rootRecord) {
      console.log(`[CLOUDFLARE DNS] Updating root record ${rootRecord.id} to point to pharmacy-platform-9u0.pages.dev...`);
      const updateRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${rootRecord.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'CNAME',
          name: targetDomain,
          content: 'pharmacy-platform-9u0.pages.dev',
          proxied: true
        })
      });
      console.log('[CLOUDFLARE UPDATE RESULT]', await updateRes.json());
    } else {
      console.log(`[CLOUDFLARE DNS] Creating root CNAME record for ${targetDomain}...`);
      const createRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'CNAME',
          name: targetDomain,
          content: 'pharmacy-platform-9u0.pages.dev',
          proxied: true
        })
      });
      console.log('[CLOUDFLARE CREATE RESULT]', await createRes.json());
    }
  }
}

fixDns().catch(err => console.error(err));
