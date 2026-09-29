#!/usr/bin/env node
/**
 * scripts/test-claim-mutations.mjs
 * 
 * Mutation test suite for the extended claim inventory scanner (scripts/claim-inventory.mjs).
 * Validates fail-closed behavior across all 5 audited categories:
 * 1. Turkish (TR) and Arabic (AR) translations (spelled-out Turkish number)
 * 2. Arabic-Indic digits (٠-٩: \u0660-\u0669)
 * 3. Spelled-out numbers in English prose
 * 4. Hint tiers (Tier 1 nudge injection)
 * 5. Spaced review cards (Flashcard prompt injection)
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

const LESSON_PATH = path.join(REPO_ROOT, 'courses/medchem/lessons/lesson-01.json');
const LOG_PATH = path.join(REPO_ROOT, 'docs/evidence/phase-3/claim-scanner-extended-mutations.log');

const originalJsonText = fs.readFileSync(LESSON_PATH, 'utf8');

const mutations = [
  {
    name: 'Mutation 1: Turkish Translation Injection (Spelled-out TR Numeral "dokuz")',
    apply: (data) => {
      data.translations.tr.title = 'Termodinamik Aktivite ve Ferguson İlkesi dokuz';
    },
    expectedSubstring: 'dokuz',
  },
  {
    name: 'Mutation 2: Arabic-Indic Digit Injection (\u0665: Arabic-Indic Digit Five)',
    apply: (data) => {
      data.translations.ar.title = 'النشاط الديناميكي الحراري ومبدأ فيرجسون \u0665';
    },
    expectedSubstring: '\u0665',
  },
  {
    name: 'Mutation 3: Spelled-out Numeral in English Step Prompt ("forty-two")',
    apply: (data) => {
      data.steps[0].prompt = 'Why does general anesthesia require forty-two grams, while beta-blockers act at milligrams?';
    },
    expectedSubstring: 'forty-two',
  },
  {
    name: 'Mutation 4: Numeric Token Injection in Hint Tier 1 ("99")',
    apply: (data) => {
      data.steps[0].hints[0] = 'Think about 99 drug molecules traveling without specific receptor fit.';
    },
    expectedSubstring: '99',
  },
  {
    name: 'Mutation 5: Numeric Token Injection in Spaced Review Card Prompt ("888")',
    apply: (data) => {
      data.spacedReviewCards[0].prompt = 'What is the relative thermodynamic saturation 888 range defining non-specific drugs?';
    },
    expectedSubstring: '888',
  },
];

let logOutput = `================================================================\n`;
logOutput += `EXTENDED CLAIM SCANNER MUTATION AUDIT LOG (H4 VERIFICATION)\n`;
logOutput += `Target Script: scripts/claim-inventory.mjs\n`;
logOutput += `Master Lesson: courses/medchem/lessons/lesson-01.json\n`;
logOutput += `Timestamp: ${new Date().toISOString()}\n`;
logOutput += `================================================================\n\n`;

let passedMutations = 0;

try {
  for (let i = 0; i < mutations.length; i++) {
    const m = mutations[i];
    console.log(`[MUTATION ${i + 1}/${mutations.length}] Running: ${m.name}...`);
    logOutput += `----------------------------------------------------------------\n`;
    logOutput += `[MUTATION ${i + 1}/${mutations.length}]: ${m.name}\n`;
    logOutput += `----------------------------------------------------------------\n`;

    // Parse fresh copy
    const copy = JSON.parse(originalJsonText);
    m.apply(copy);
    fs.writeFileSync(LESSON_PATH, JSON.stringify(copy, null, 2), 'utf8');

    let failedAsExpected = false;
    let cmdOutput = '';

    try {
      cmdOutput = execSync(`node scripts/claim-inventory.mjs`, {
        cwd: REPO_ROOT,
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe'],
      });
      logOutput += `[UNEXPECTED PASS] Command succeeded with zero exit code!\nOutput:\n${cmdOutput}\n`;
      console.error(`  -> FAILED: Mutation did not trigger scanner rejection!`);
    } catch (err) {
      failedAsExpected = true;
      const combinedOutput = (err.stdout || '') + (err.stderr || '');
      logOutput += `Exit Code: ${err.status}\n`;
      logOutput += `Observed Error Output:\n${combinedOutput}\n`;

      if (combinedOutput.includes(m.expectedSubstring)) {
        logOutput += `[CONFIRMED] Scanner explicitly caught injected token: "${m.expectedSubstring}"\n\n`;
        console.log(`  -> SUCCESS: Scanner correctly caught injected token "${m.expectedSubstring}" with exit code ${err.status}`);
        passedMutations++;
      } else {
        logOutput += `[WARNING] Scanner failed but did not clearly mention token: "${m.expectedSubstring}"\n\n`;
      }
    }
  }
} finally {
  // Always restore original master JSON
  fs.writeFileSync(LESSON_PATH, originalJsonText, 'utf8');
  console.log(`[CLEANUP] Restored original master lesson-01.json from memory.`);
}

logOutput += `================================================================\n`;
logOutput += `MUTATION AUDIT SUMMARY:\n`;
logOutput += `Total Mutations Evaluated: ${mutations.length}\n`;
logOutput += `Successful Fail-Closed Rejections: ${passedMutations}/${mutations.length}\n`;
logOutput += `Final Status: ${passedMutations === mutations.length ? 'ALL MUTATION TESTS PASSED (100% FAIL-CLOSED)' : 'FAILURES OBSERVED'}\n`;
logOutput += `================================================================\n`;

fs.writeFileSync(LOG_PATH, logOutput, 'utf8');
console.log(`[LOG] Mutation results successfully recorded to: ${LOG_PATH}`);

if (passedMutations !== mutations.length) {
  process.exit(1);
} else {
  process.exit(0);
}
