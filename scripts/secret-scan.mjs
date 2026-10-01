import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('=== Running Pre-Commit Secret Scanner ===');

const SECRET_PATTERNS = [
  { name: 'Dodo Payments Live/Test Key', regex: /(?:dodo_live_|dodo_test_)[a-zA-Z0-9_-]{16,}/g },
  { name: 'Dodo Webhook Secret', regex: /whsec_[a-zA-Z0-9_-]{16,}/g },
  { name: 'Generic Private Key', regex: /-----BEGIN (?:RSA |EC )?PRIVATE KEY-----/g },
  { name: 'Google API Key', regex: /AIza[0-9A-Za-z-_]{35}/g },
  { name: 'Firebase Secret', regex: /"private_key":\s*"-----BEGIN/g },
];

const IGNORED_PATHS = [
  'node_modules',
  '.git',
  'pnpm-lock.yaml',
  'package-lock.json',
  'dist',
  'build',
  '.agents',
  'playwright-report',
  'test-results',
];

let violationCount = 0;

// 1. Scan Working Tree
function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(process.cwd(), fullPath);

    if (IGNORED_PATHS.some((ignored) => relPath.startsWith(ignored) || entry.name === ignored)) {
      continue;
    }

    if (entry.isDirectory()) {
      scanDirectory(fullPath);
    } else if (entry.isFile()) {
      if (entry.name === '.env' || entry.name.endsWith('.pem') || entry.name.endsWith('.key')) {
        console.error(`[VIOLATION] Secret or sensitive file found unignored in working tree: ${relPath}`);
        violationCount++;
        continue;
      }
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        for (const pattern of SECRET_PATTERNS) {
          const matches = content.match(pattern.regex);
          if (matches) {
            console.error(`[VIOLATION] Matched pattern '${pattern.name}' in file: ${relPath} (matches count: ${matches.length})`);
            violationCount++;
          }
        }
      } catch (err) {
        // Binary or unreadable file
      }
    }
  }
}

console.log('Scanning working tree files...');
scanDirectory(process.cwd());

// 2. Scan Git Log (last 50 commits)
console.log('Scanning recent Git commit log...');
try {
  const gitLog = execSync('git log -n 50 -p -- ":!pnpm-lock.yaml" ":!package-lock.json"', { encoding: 'utf8' });
  for (const pattern of SECRET_PATTERNS) {
    const matches = gitLog.match(pattern.regex);
    if (matches) {
      console.error(`[VIOLATION] Matched pattern '${pattern.name}' in Git commit history diffs (matches count: ${matches.length})`);
      violationCount++;
    }
  }
} catch (e) {
  console.log('Note: git log scan completed with warning or empty repository.');
}

if (violationCount > 0) {
  console.error(`\nFAILURE: Found ${violationCount} secret violations. Redacted reporting complete.`);
  process.exit(1);
} else {
  console.log('\n[PASS] Secret scan clean. 0 keys or secrets detected in working tree or commit history.');
  process.exit(0);
}
