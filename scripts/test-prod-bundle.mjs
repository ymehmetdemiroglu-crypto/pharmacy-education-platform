#!/usr/bin/env node
/**
 * scripts/test-prod-bundle.mjs
 * 
 * Production Bundle Dev Notes Auditor (Release Blocker Guard).
 * 
 * Verifies that production build output in apps/web/dist/ contains ZERO:
 * - 'unverified'
 * - 'NUM-MC'
 * - 'CIT-MC'
 * - 'LOC-'
 * - 'Section:'
 * - 'Pending' (\bPending\b word boundary, excluding React's isInputPending)
 * - 'pending-human-review'
 * - 'needs-human-review'
 * - 'needs-human-review.md'
 * - 'citation-status'
 * - 'Citation Status: Unverified'
 * - 'Pending Physical Copy Verification'
 * 
 * Fails build with exit code 1 if any dev/audit note leaks into production.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(REPO_ROOT, 'apps/web/dist');

if (!fs.existsSync(DIST_DIR)) {
  console.error(`[RELEASE BLOCKER] Production dist directory not found: ${DIST_DIR}`);
  console.error(`Run 'pnpm --filter @pharmacy/web build' first.`);
  process.exit(1);
}

const FORBIDDEN_TOKENS = [
  'unverified',
  'NUM-MC',
  'CIT-MC',
  'LOC-',
  'Section:',
  'pending-human-review',
  'needs-human-review',
  'needs-human-review.md',
  'citation-status',
  'Citation Status: Unverified',
  'Pending Physical Copy Verification',
];

function getAllFiles(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else if (entry.isFile() && /\.(js|css|html|json)$/i.test(entry.name)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const files = getAllFiles(DIST_DIR);
console.log(`================================================================`);
console.log(`PRODUCTION BUNDLE DEV NOTES AUDIT (RELEASE BLOCKER GUARD)`);
console.log(`Auditing ${files.length} production bundle files in: ${DIST_DIR}`);
console.log(`================================================================\n`);

let totalViolations = 0;
const violationsReport = [];

for (const file of files) {
  const relativePath = path.relative(DIST_DIR, file);
  const content = fs.readFileSync(file, 'utf8');

  // 1. Check exact forbidden substrings (case-insensitive where appropriate)
  for (const token of FORBIDDEN_TOKENS) {
    const lowerContent = content.toLowerCase();
    const lowerToken = token.toLowerCase();

    let count = 0;
    let pos = lowerContent.indexOf(lowerToken);
    while (pos !== -1) {
      // Ignore Supabase Auth SDK internal MFA WebAuthn check: factor_type==="webauthn"&&...status==="unverified"
      const surrounding = content.substring(Math.max(0, pos - 50), Math.min(content.length, pos + 50));
      if (token === 'unverified' && (surrounding.includes('webauthn') || surrounding.includes('factor_type') || surrounding.includes('mfa.unenroll'))) {
        pos = lowerContent.indexOf(lowerToken, pos + 1);
        continue;
      }

      count++;
      pos = lowerContent.indexOf(lowerToken, pos + 1);
    }

    if (count > 0) {
      totalViolations += count;
      violationsReport.push({
        file: relativePath,
        token,
        count,
      });
    }
  }

  // 2. Check standalone word 'Pending' (\bPending\b), explicitly ignoring navigator.scheduling.isInputPending
  const pendingRegex = /\bPending\b/g;
  let match;
  let pendingCount = 0;
  while ((match = pendingRegex.exec(content)) !== null) {
    // Verify it is not part of a browser identifier like isInputPending or Firebase SDK internal "Pending promise"
    const precedingChar = match.index > 0 ? content[match.index - 1] : '';
    const following = content.substring(match.index, match.index + 20);
    if (precedingChar !== 't' && precedingChar !== '_' && !following.startsWith('Pending promise')) {
      pendingCount++;
    }
  }
  if (pendingCount > 0) {
    totalViolations += pendingCount;
    violationsReport.push({
      file: relativePath,
      token: 'Pending',
      count: pendingCount,
    });
  }
}

if (totalViolations > 0) {
  console.error(`[RELEASE BLOCKER CRITICAL FAILURE] Found ${totalViolations} dev string leak(s) in production bundle!`);
  for (const v of violationsReport) {
    console.error(`  - In '${v.file}': found ${v.count} occurrence(s) of "${v.token}"`);
  }
  console.error(`\nProduction bundle is NOT clean. Release blocked.`);
  process.exit(1);
} else {
  console.log(`[PASS] Zero dev notes or internal review strings found in production bundle!`);
  for (const tok of FORBIDDEN_TOKENS) {
    console.log(`  - '${tok}': 0 occurrences`);
  }
  console.log(`  - 'Pending': 0 occurrences`);
  console.log(`\nAll ${files.length} production bundle files are 100% clean of internal audit notes.`);
  console.log(`================================================================\n`);
  process.exit(0);
}
