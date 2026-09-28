import { spawn, spawnSync } from 'child_process';
import http from 'http';
import fs from 'fs';

// 1. Start preview server
const server = spawn('pnpm', ['--filter', '@pharmacy/web', 'preview', '--port', '4173'], {
  shell: true,
  stdio: 'pipe',
});

function waitForServer(timeoutMs = 15000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      if (Date.now() - start > timeoutMs) {
        reject(new Error('Timeout waiting for preview server'));
        return;
      }
      http
        .get('http://localhost:4173/gallery', (res) => {
          if (res.statusCode === 200) resolve();
          else setTimeout(check, 500);
        })
        .on('error', () => {
          setTimeout(check, 500);
        });
    };
    check();
  });
}

try {
  await waitForServer();
  console.log('Preview server ready on port 4173. Running Lighthouse...');

  const lhResult = spawnSync(
    'npx',
    [
      'lighthouse',
      'http://localhost:4173/gallery',
      '--chrome-flags="--headless --no-sandbox"',
      '--output=json',
      '--output-path=./docs/reviews/lighthouse-gallery.json',
      '--preset=desktop',
      '--only-categories=performance,accessibility,best-practices,seo',
    ],
    { shell: true, stdio: 'inherit' }
  );

  console.log('Lighthouse exit code:', lhResult.status);

  if (fs.existsSync('./docs/reviews/lighthouse-gallery.json')) {
    const data = JSON.parse(fs.readFileSync('./docs/reviews/lighthouse-gallery.json', 'utf8'));
    console.log('=== LIGHTHOUSE RESULTS ===');
    console.log('Performance:', Math.round((data.categories.performance?.score || 0) * 100));
    console.log('Accessibility:', Math.round((data.categories.accessibility?.score || 0) * 100));
    console.log('Best Practices:', Math.round((data.categories['best-practices']?.score || 0) * 100));
    console.log('SEO:', Math.round((data.categories.seo?.score || 0) * 100));
  }
} finally {
  server.kill('SIGINT');
}
