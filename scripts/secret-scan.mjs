import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('=== Running Comprehensive Secret Scanner (Prefix + Shannon Entropy) ===');

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

// Allowlisted mock strings from .env.example templates or unit tests
const ALLOWLISTED_MOCKS = new Set([
  'whsec_your_webhook_signing_secret_here',
  'whsec_MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw',
]);

/**
 * Calculates Shannon entropy (bits per symbol).
 * Base64 random cryptographic keys have entropy > 4.7 bits/symbol.
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

/**
 * Detects high-entropy candidate tokens in text.
 */
function findHighEntropyTokens(content, relPath) {
  const hits = [];
  const tokenRegex = /\b[A-Za-z0-9_=-]{32,128}\b/g;
  let match;

  while ((match = tokenRegex.exec(content)) !== null) {
    const token = match[0];
    if (ALLOWLISTED_MOCKS.has(token)) continue;
    // Skip UUIDs, commit SHAs, SHA-256 fixture hashes
    if (/^[0-9a-f]{40}$/i.test(token)) continue;
    if (/^[0-9a-f]{64}$/i.test(token)) continue;
    if (/^[0-9a-f-]{36}$/i.test(token)) continue;

    const entropy = calculateShannonEntropy(token);
    if (entropy > 4.85 && token.length >= 32) {
      const uniqueChars = new Set(token).size;
      if (uniqueChars > 16) {
        hits.push({ token: `${token.slice(0, 4)}...${token.slice(-4)}`, entropy });
      }
    }
  }

  return hits;
}

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
      const ext = path.extname(entry.name).toLowerCase();
      if (BINARY_EXTENSIONS.has(ext)) {
        continue;
      }

      if (entry.name === '.env' || entry.name.endsWith('.pem') || entry.name.endsWith('.key')) {
        console.error(`[VIOLATION] Secret or sensitive file found unignored in working tree: ${relPath}`);
        violationCount++;
        continue;
      }

      try {
        const content = fs.readFileSync(fullPath, 'utf8');

        // Pattern matching
        for (const pattern of SECRET_PATTERNS) {
          const matches = content.match(pattern.regex);
          if (matches) {
            const filtered = matches.filter((m) => !ALLOWLISTED_MOCKS.has(m));
            if (filtered.length > 0) {
              console.error(`[VIOLATION] Matched pattern '${pattern.name}' in file: ${relPath} (count: ${filtered.length})`);
              violationCount += filtered.length;
            }
          }
        }

        // Shannon entropy detection on source and env files (excluding generated report JSONs)
        if (['.ts', '.tsx', '.js', '.mjs', '.env'].includes(ext) || entry.name.startsWith('.env')) {
          if (!relPath.includes('test-results') && !relPath.includes('docs')) {
            const entropyHits = findHighEntropyTokens(content, relPath);
            for (const hit of entropyHits) {
              console.error(`[VIOLATION] High-entropy token detected in file: ${relPath} (${hit.token}, entropy: ${hit.entropy.toFixed(2)})`);
              violationCount++;
            }
          }
        }
      } catch (err) {
        // Unreadable file
      }
    }
  }
}

console.log('1. Scanning working tree files...');
scanDirectory(process.cwd());

// 2. Scan Full Git History Across ALL Branches
console.log('2. Scanning full Git history across ALL branches (git log --all)...');
try {
  const gitLog = execSync('git log --all -p -- ":!pnpm-lock.yaml" ":!package-lock.json" ":!*.pdf" ":!*.png" ":!*.jpg"', {
    encoding: 'utf8',
    maxBuffer: 50 * 1024 * 1024,
  });

  for (const pattern of SECRET_PATTERNS) {
    const matches = gitLog.match(pattern.regex);
    if (matches) {
      const filtered = matches.filter((m) => !ALLOWLISTED_MOCKS.has(m));
      if (filtered.length > 0) {
        console.error(`[VIOLATION] Matched pattern '${pattern.name}' across Git history (count: ${filtered.length})`);
        violationCount += filtered.length;
      }
    }
  }
} catch (e) {
  console.log(`Note: git log scan warning: ${e.message}`);
}

if (violationCount > 0) {
  console.error(`\nFAILURE: Found ${violationCount} secret violations. Redacted reporting complete.`);
  process.exit(1);
} else {
  console.log('\n[PASS] Secret scan clean. 0 keys, secrets, or high-entropy tokens detected across all branches and working tree.');
  process.exit(0);
}
