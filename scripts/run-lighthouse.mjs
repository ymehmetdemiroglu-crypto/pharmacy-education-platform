import { spawn, spawnSync } from 'child_process';
import http from 'http';
import fs from 'fs';

const targetPath = process.argv[2] || '/courses/medchem/lessons/1';
const outputPath = process.argv[3] || './docs/reviews/lighthouse-lesson-1.json';
const mode = process.argv[4] || 'desktop';

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
        .get(`http://localhost:4173${targetPath}`, (res) => {
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
  console.log(`Preview server ready on port 4173. Running Lighthouse (${mode}) on ${targetPath}...`);

  const lhArgs = [
    'lighthouse',
    `http://localhost:4173${targetPath}`,
    '--chrome-flags="--headless --no-sandbox"',
    '--output=json',
    `--output-path=${outputPath}`,
    '--only-categories=performance,accessibility,best-practices,seo',
  ];

  if (mode === 'desktop') {
    lhArgs.push('--preset=desktop');
  } else {
    lhArgs.push('--form-factor=mobile', '--screenEmulation.mobile=true', '--screenEmulation.width=375', '--screenEmulation.height=667', '--screenEmulation.deviceScaleFactor=2');
  }

  const lhResult = spawnSync('npx', lhArgs, { shell: true, stdio: 'inherit' });

  console.log('Lighthouse exit code:', lhResult.status);

  if (fs.existsSync(outputPath)) {
    const data = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
    console.log('=== LIGHTHOUSE RESULTS ===');
    console.log('Performance:', Math.round((data.categories.performance?.score || 0) * 100));
    console.log('Accessibility:', Math.round((data.categories.accessibility?.score || 0) * 100));
    console.log('Best Practices:', Math.round((data.categories['best-practices']?.score || 0) * 100));
    console.log('SEO:', Math.round((data.categories.seo?.score || 0) * 100));
  }
} finally {
  server.kill('SIGINT');
}
