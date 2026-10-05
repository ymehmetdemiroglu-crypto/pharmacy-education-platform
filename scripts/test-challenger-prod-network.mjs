import https from 'https';

const BASE_URL = 'https://optimusrufus.com';

const testRoutes = [
  { path: '/', expectedStatus: 200, expectedContentType: /text\/html/ },
  { path: '/reset-password', expectedStatus: 200, expectedContentType: /text\/html/ },
  { path: '/dashboard', expectedStatus: 200, expectedContentType: /text\/html/ },
  { path: '/tutor/reseptor-etkilesimleri', expectedStatus: 200, expectedContentType: /text\/html/ },
  { path: '/catalog', expectedStatus: 200, expectedContentType: /text\/html/ },
  { path: '/favicon.svg', expectedStatus: 200, expectedContentType: /image\/svg\+xml/ },
];

async function fetchUrl(urlPath) {
  const url = `${BASE_URL}${urlPath}`;
  const response = await fetch(url, { redirect: 'manual' });
  const text = await response.text();
  const headers = {};
  for (const [k, v] of response.headers.entries()) {
    headers[k.toLowerCase()] = v;
  }
  return {
    url,
    status: response.status,
    headers,
    body: text
  };
}

async function runTests() {
  console.log('=== LIVE PRODUCTION NETWORK CHALLENGE REPORT ===\n');
  const results = {
    routes: [],
    assets: [],
    securityHeaders: {},
    localhostLeaks: []
  };

  // 1. Route status and headers
  console.log('1. Probing Target Routes:');
  for (const route of testRoutes) {
    const res = await fetchUrl(route.path);
    const passStatus = res.status === route.expectedStatus;
    const passType = route.expectedContentType.test(res.headers['content-type'] || '');
    const isHtml = (res.headers['content-type'] || '').includes('text/html');
    const isIndexHtml = isHtml ? (res.body.includes('<div id="root">') || res.body.includes('<script type="module"')) : false;

    console.log(`- ${route.path}:`);
    console.log(`    Status: ${res.status} (Expected ${route.expectedStatus}) -> ${passStatus ? 'PASS' : 'FAIL'}`);
    console.log(`    Content-Type: ${res.headers['content-type']} -> ${passType ? 'PASS' : 'FAIL'}`);
    console.log(`    Cache-Control: ${res.headers['cache-control']}`);
    if (isHtml) {
      console.log(`    SPA Index.html verified: ${isIndexHtml ? 'YES' : 'NO'}`);
    }

    results.routes.push({
      path: route.path,
      status: res.status,
      contentType: res.headers['content-type'],
      cacheControl: res.headers['cache-control'],
      passStatus,
      passType,
      isIndexHtml
    });
  }

  // 2. Discover assets from index.html
  console.log('\n2. Extracting and Probing Asset Bundles:');
  const rootRes = await fetchUrl('/');
  const scriptRegex = /src="(\/assets\/[^"]+)"/g;
  const linkRegex = /href="(\/assets\/[^"]+)"/g;
  const assetPaths = new Set();
  
  let match;
  while ((match = scriptRegex.exec(rootRes.body)) !== null) {
    assetPaths.add(match[1]);
  }
  while ((match = linkRegex.exec(rootRes.body)) !== null) {
    assetPaths.add(match[1]);
  }

  console.log(`Found ${assetPaths.size} asset paths referenced in index.html:`, Array.from(assetPaths));

  for (const assetPath of assetPaths) {
    const assetRes = await fetchUrl(assetPath);
    const passStatus = assetRes.status === 200;
    const cacheControl = assetRes.headers['cache-control'] || '';
    const passCache = cacheControl.includes('public') && 
                      cacheControl.includes('max-age=31536000') && 
                      cacheControl.includes('immutable');

    console.log(`- Asset: ${assetPath}`);
    console.log(`    Status: ${assetRes.status} -> ${passStatus ? 'PASS' : 'FAIL'}`);
    console.log(`    Cache-Control: ${cacheControl} -> ${passCache ? 'PASS' : 'FAIL'}`);

    // Check for localhost / 127.0.0.1 in asset content
    const hasLocalhost = assetRes.body.includes('localhost') || /127\.0\.0\.1/.test(assetRes.body);
    if (hasLocalhost) {
      console.log(`    [CRITICAL ALERT] Localhost reference found in ${assetPath}!`);
      results.localhostLeaks.push({ assetPath });
    } else {
      console.log(`    Localhost/127.0.0.1 references: 0 (CLEAN)`);
    }

    results.assets.push({
      assetPath,
      status: assetRes.status,
      cacheControl,
      passStatus,
      passCache,
      hasLocalhost,
      sizeBytes: assetRes.body.length
    });
  }

  // Also check root HTML for localhost
  const rootHasLocalhost = rootRes.body.includes('localhost') || /127\.0\.0\.1/.test(rootRes.body);
  console.log(`\n- Root HTML localhost references: ${rootHasLocalhost ? 'LEAK FOUND' : '0 (CLEAN)'}`);

  // 3. Security Headers Verification on Root
  console.log('\n3. Security Headers on /:');
  const headers = rootRes.headers;
  const requiredSecHeaders = [
    'content-security-policy',
    'x-frame-options',
    'x-content-type-options',
    'referrer-policy',
    'strict-transport-security',
    'permissions-policy'
  ];

  for (const h of requiredSecHeaders) {
    const val = headers[h];
    console.log(`- ${h}: ${val ? val : 'MISSING'}`);
    results.securityHeaders[h] = val || null;
  }

  console.log('\n=== TEST SUMMARY ===');
  console.log(JSON.stringify(results, null, 2));
}

runTests().catch(err => {
  console.error('Test run failed:', err);
  process.exit(1);
});
