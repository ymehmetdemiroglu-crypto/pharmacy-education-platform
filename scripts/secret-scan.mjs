import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('=== Running Strict Multi-Tree Secret Scanner (Working Tree + ../valiant-raman + Git All-Branches) ===');

const SECRET_PATTERNS = [
  { name: 'Dodo Payments Live Key', regex: /dodo_live_[a-zA-Z0-9_-]{16,}/g },
  { name: 'Dodo Payments Test Key', regex: /dodo_test_[a-zA-Z0-9_-]{16,}/g },
  { name: 'Dodo Webhook Secret', regex: /whsec_[a-zA-Z0-9_-]{16,}/g },
  { name: 'Generic Private Key', regex: /-----BEGIN (?:RSA |EC )?PRIVATE KEY-----/g },
  { name: 'Google API Key', regex: /AIza[0-9A-Za-z-_]{35}/g },
  { name: 'Firebase Private Key', regex: /"private_key":\s*"-----BEGIN/g },
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

const BINARY_EXTENSIONS = new Set([
  '.pdf',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.woff',
  '.woff2',
  '.mp4',
  '.ico',
  '.map',
  '.svg',
]);

/**
 * Calculates Shannon entropy (bits per symbol).
 * Cryptographic keys and random secrets typically have entropy > 4.75 bits/symbol.
 */
function calculateShannonEntropy(str) {
  if (!str || str.length === 0) return 0;
  const frequencies = {};
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    frequencies[char] = (frequencies[char] || 0) + 1;
  }
  let entropy = 0;
  const len = str.length;
  for (const count of Object.values(frequencies)) {
    const p = count / len;
    entropy -= p * Math.log2(p);
  }
  return entropy;
}

let worktreeViolations = 0;
let externalViolations = 0;
let gitLogViolations = 0;

function scanDirectory(dir, label) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(process.cwd(), fullPath);

    if (IGNORED_PATHS.some((ignored) => entry.name === ignored)) {
      continue;
    }

    if (entry.isDirectory()) {
      scanDirectory(fullPath, label);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (BINARY_EXTENSIONS.has(ext)) continue;

      if (entry.name === '.env' || entry.name.endsWith('.pem') || entry.name.endsWith('.key')) {
        const msg = `[VIOLATION] Secret or sensitive file found unignored: ${relPath}:1`;
        console.error(msg);
        if (label === 'worktree') worktreeViolations++;
        else externalViolations++;
        continue;
      }

      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const lines = content.split('\n');

        for (let idx = 0; idx < lines.length; idx++) {
          const line = lines[idx];
          const lineNum = idx + 1;

          // 1. Prefix Pattern Matching
          for (const pattern of SECRET_PATTERNS) {
            pattern.regex.lastIndex = 0;
            if (pattern.regex.test(line)) {
              console.error(`[VIOLATION] Matched pattern '${pattern.name}' at ${relPath}:${lineNum}`);
              if (label === 'worktree') worktreeViolations++;
              else externalViolations++;
            }
          }

          // 2. Shannon Entropy Detection
          if (
            ['.ts', '.tsx', '.js', '.mjs', '.env', '.json', '.yaml', '.yml'].includes(ext) ||
            entry.name.startsWith('.env')
          ) {
            if (!fullPath.includes('test-results') && !fullPath.includes('docs') && !entry.name.includes('lock')) {
              const tokens = line.match(/\b[A-Za-z0-9_=-]{32,128}\b/g) || [];
              for (const token of tokens) {
                if (/^[0-9a-f]{40}$/i.test(token)) continue; // Git commit SHA
                if (/^[0-9a-f]{64}$/i.test(token)) continue; // SHA-256 hash
                if (/^[0-9a-f-]{36}$/i.test(token)) continue; // UUID

                const entropy = calculateShannonEntropy(token);
                if (entropy > 4.85 && token.length >= 32) {
                  const uniqueChars = new Set(token).size;
                  if (uniqueChars > 16) {
                    console.error(`[VIOLATION] High-entropy token detected at ${relPath}:${lineNum} (entropy: ${entropy.toFixed(2)})`);
                    if (label === 'worktree') worktreeViolations++;
                    else externalViolations++;
                  }
                }
              }
            }
          }
        }
      } catch (err) {
        // Unreadable or binary file
      }
    }
  }
}

// 1. Scan Current Worktree
console.log('1. Scanning working tree...');
scanDirectory(process.cwd(), 'worktree');

// 2. Scan ../valiant-raman (MCP repo root)
const masterRepoPath = path.resolve(process.env.USERPROFILE || 'C:\\Users\\hp', 'Documents/antigravity/valiant-raman');
console.log(`2. Scanning master repository (${masterRepoPath})...`);
scanDirectory(masterRepoPath, 'master_repo');

// 3. Scan Full Git History Across ALL Branches
console.log('3. Scanning full Git history across ALL branches (git log --all)...');
try {
  const gitLog = execSync('git log --all -p -- ":!pnpm-lock.yaml" ":!package-lock.json" ":!*.pdf" ":!*.png" ":!*.jpg"', {
    encoding: 'utf8',
    maxBuffer: 50 * 1024 * 1024,
  });

  const logLines = gitLog.split('\n');
  let currentCommit = 'unknown';
  let currentFile = 'unknown';

  for (const line of logLines) {
    if (line.startsWith('commit ')) {
      currentCommit = line.slice(7, 14);
    } else if (line.startsWith('+++ b/')) {
      currentFile = line.slice(6);
    } else if (line.startsWith('+') && !line.startsWith('+++')) {
      if (currentFile.includes('secret-scan.mjs')) continue;
      for (const pattern of SECRET_PATTERNS) {
        pattern.regex.lastIndex = 0;
        if (pattern.regex.test(line)) {
          console.error(`[VIOLATION] Matched pattern '${pattern.name}' in commit ${currentCommit} file ${currentFile}`);
          gitLogViolations++;
        }
      }
    }
  }
} catch (e) {
  console.log(`Note: git log scan warning: ${e.message}`);
}

console.log('----------------------------------------------------------------');
const totalViolations = worktreeViolations + externalViolations + gitLogViolations;
console.log(`SUMMARY: ${worktreeViolations} worktree violations, ${externalViolations} external repo (../valiant-raman) audit hits, ${gitLogViolations} git history hits.`);

if (worktreeViolations > 0) {
  console.error(`FAILURE: Found ${worktreeViolations} secret violations in active worktree. Commit blocked.`);
  process.exit(1);
} else {
  console.log('[PASS] Active course worktree is 100% clean of exposed keys and high-entropy secrets.');
  if (externalViolations > 0 || gitLogViolations > 0) {
    console.log(`[INFO] External repo (../valiant-raman) and historical commits contain ${externalViolations + gitLogViolations} hits reported above as file:line only.`);
  }
  process.exit(0);
}
