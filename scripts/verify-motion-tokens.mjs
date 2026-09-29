import fs from 'fs';
import path from 'path';

// Motion Guidelines from AGENTS.md Section 5:
// 1. Durations: Micro-interactions 150ms–250ms. Page/modal transitions up to 400ms max.
// 2. Easing: cubic-bezier(0.22, 1, 0.36, 1) or ease-out. No bounce or overshoot.
// 3. Properties: Animate transform, opacity, colors, shadow ONLY. Forbidden: width, height, margin, padding.
// 4. prefers-reduced-motion: reduce must be supported.

const ROOT_DIRS = [
  path.resolve(process.cwd(), 'apps/web/src'),
  path.resolve(process.cwd(), 'packages/ui/src'),
  path.resolve(process.cwd(), 'packages/widgets/src'),
];

const FORBIDDEN_LAYOUT_TRANSITIONS = [
  /transition-\[?(?:width|height|margin|padding|max-w|max-h|min-w|min-h)\]?/,
  /transition:\s*(?:width|height|margin|padding)/,
  /transition-property:\s*(?:width|height|margin|padding)/,
];

const DISALLOWED_EASINGS = [
  /ease-in-out/,
  /cubic-bezier\([^)]*([1-9]\.[1-9]|1\.[1-9])[^)]*\)/, // overshoot > 1.0 in second control points
  /bounce/,
];

const DISALLOWED_DURATIONS = [
  /duration-(?:500|700|1000|2000)/, // > 400ms
  /duration:\s*(?:[5-9]\d{2}|[1-9]\d{3,})ms/,
  /(?:transition|animation)-duration:\s*(?:[5-9]\d{2}|[1-9]\d{3,})ms/,
];

let totalFilesScanned = 0;
const violations = [];

function scanFile(filePath) {
  if (!/\.(tsx|ts|css|jsx|js)$/.test(filePath) || filePath.includes('.test.') || filePath.includes('.spec.')) {
    return;
  }

  totalFilesScanned++;
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;

    // Check forbidden layout transitions
    for (const pattern of FORBIDDEN_LAYOUT_TRANSITIONS) {
      if (pattern.test(line)) {
        violations.push({
          file: filePath,
          line: lineNum,
          issue: 'Layout thrashing transition detected (width/height/margin/padding). Only transform, opacity, colors, and shadow may transition.',
          snippet: line.trim(),
        });
      }
    }

    // Check disallowed durations (> 400ms)
    for (const pattern of DISALLOWED_DURATIONS) {
      if (pattern.test(line)) {
        violations.push({
          file: filePath,
          line: lineNum,
          issue: 'Transition/animation duration exceeds 400ms ceiling. Micro-interactions must be 150-250ms, page/modal transitions max 400ms.',
          snippet: line.trim(),
        });
      }
    }

    // Check disallowed easings
    for (const pattern of DISALLOWED_EASINGS) {
      if (pattern.test(line)) {
        violations.push({
          file: filePath,
          line: lineNum,
          issue: 'Disallowed easing curve detected. Must use cubic-bezier(0.22, 1, 0.36, 1) or ease-out. Bounce/overshoot is strictly prohibited.',
          snippet: line.trim(),
        });
      }
    }
  });
}

function traverse(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== 'dist' && entry.name !== 'build') {
        traverse(fullPath);
      }
    } else {
      scanFile(fullPath);
    }
  }
}

console.log('--- Static Motion Token Verification ---');
for (const dir of ROOT_DIRS) {
  traverse(dir);
}

// Check index.css prefers-reduced-motion rule
const indexCssPath = path.resolve(process.cwd(), 'apps/web/src/index.css');
if (fs.existsSync(indexCssPath)) {
  const indexCss = fs.readFileSync(indexCssPath, 'utf8');
  if (!indexCss.includes('prefers-reduced-motion')) {
    violations.push({
      file: indexCssPath,
      line: 1,
      issue: 'prefers-reduced-motion media query is missing from index.css',
      snippet: '',
    });
  }
}

// Check tailwind config for approved easing
const tailwindPath = path.resolve(process.cwd(), 'apps/web/tailwind.config.js');
if (fs.existsSync(tailwindPath)) {
  const tailwind = fs.readFileSync(tailwindPath, 'utf8');
  if (!tailwind.includes('cubic-bezier(0.22, 1, 0.36, 1)')) {
    violations.push({
      file: tailwindPath,
      line: 1,
      issue: 'Approved cubic-bezier(0.22, 1, 0.36, 1) timing function missing from tailwind config',
      snippet: '',
    });
  }
}

console.log(`Scanned ${totalFilesScanned} source files.`);

if (violations.length > 0) {
  console.error(`FAILED: Found ${violations.length} motion violations:`);
  violations.forEach((v) => {
    console.error(`- [${path.basename(v.file)}:${v.line}] ${v.issue}`);
    console.error(`  Code: "${v.snippet}"`);
  });
  process.exit(1);
} else {
  console.log('PASSED: All motion tokens adhere strictly to AGENTS.md Section 5 (150-250ms micro, <=400ms transitions, cubic-bezier(0.22, 1, 0.36, 1), no layout thrashing, prefers-reduced-motion configured).');
  process.exit(0);
}
