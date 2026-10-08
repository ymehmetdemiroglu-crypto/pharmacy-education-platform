// scripts/test-challenger-legal-security.mjs
// Adversarial Empirical Stress Harness for Legal (FSEK / KVKK), OpenRouter Secret, and Deployment Triggers.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

console.log('========================================================================');
console.log('ADVERSARIAL LEGAL & SECURITY EMPIRICAL CHALLENGE SUITE');
console.log('Target: PharmLearn Architecture, Past-Exam Service, Secrets, Deploy Gates');
console.log('========================================================================\n');

let totalTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, testName, details) {
  totalTests++;
  if (!condition) {
    failedTests++;
    failures.push({ testName, details });
    console.log(`❌ FAIL: ${testName}`);
    console.log(`   Details: ${details}\n`);
  } else {
    console.log(`✅ PASS: ${testName}`);
  }
}

// -----------------------------------------------------------------------------
// SUITE 1: PAST-EXAM ("ÇIKMIŞ SORULAR") LEGAL DE-IDENTIFICATION & KVKK STRESS TEST
// -----------------------------------------------------------------------------
console.log('\n--- SUITE 1: PAST-EXAM (FSEK / KVKK) ADVERSARIAL STRESS TEST ---');

// Reconstruct the regex patterns from apps/web/src/services/pastExamService.ts
const UNIVERSITY_NAMES = [
  'marmara', 'hacettepe', 'istanbul', 'ege', 'ankara', 'gazi', 'anadolu',
  'yeditepe', 'bezmialem', 'inönü', 'çukurova', 'erciyes', 'medipol',
];
const ACADEMIC_TITLES = [
  'prof\\.?\\s*dr\\.?', 'doç\\.?\\s*dr\\.?', 'dr\\.?\\s*öğr\\.?\\s*üyesi',
  'öğr\\.?\\s*gör\\.?', 'araş\\.?\\s*gör\\.?',
];
const EXAM_HEADERS = [
  'vize\\s*sınavı', 'final\\s*sınavı', 'bütünleme\\s*sınavı', 'ara\\s*sınav',
  'dönem\\s*sonu', 'güz\\s*dönemi', 'bahar\\s*dönemi', 'fzk\\s*\\d+',
  'fkm\\s*\\d+', 'medchem\\s*\\d+', '20\\d\\d\\s*-\\s*20\\d\\d',
];

function scrubExamText(rawText) {
  let scrubbed = rawText;
  const removed = [];

  ACADEMIC_TITLES.forEach((titlePattern) => {
    const re = new RegExp(`${titlePattern}\\s+([A-ZÇĞİÖŞÜ][a-zçğıöşü]+\\s+[A-ZÇĞİÖŞÜ][a-zçğıöşü]+)`, 'gi');
    scrubbed = scrubbed.replace(re, (match) => {
      removed.push(match.trim());
      return '[ÖĞRETİM ÜYESİ GİZLENDİ]';
    });
  });

  UNIVERSITY_NAMES.forEach((uni) => {
    const re = new RegExp(`\\b${uni}(\\s+üniversitesi)?\\b`, 'gi');
    scrubbed = scrubbed.replace(re, (match) => {
      removed.push(match.trim());
      return '[ÜNİVERSİTE GİZLENDİ]';
    });
  });

  EXAM_HEADERS.forEach((headerPattern) => {
    const re = new RegExp(`\\b${headerPattern}\\b`, 'gi');
    scrubbed = scrubbed.replace(re, (match) => {
      removed.push(match.trim());
      return '';
    });
  });

  return { scrubbedText: scrubbed.trim(), removedEntities: removed };
}

// Adversarial Test 1.1: Non-whitelisted Turkish pharmacy universities
const testInput1_1 = 'Sağlık Bilimleri Üniversitesi Eczacılık Fakültesi 2024 Vizesi Soru 1: Prokain hidrolizi';
const res1_1 = scrubExamText(testInput1_1);
assert(
  !res1_1.scrubbedText.includes('Sağlık Bilimleri'),
  'Legal Scrubbing strips non-whitelisted universities (e.g. Sağlık Bilimleri, Biruni, Dicle)',
  `Leaked university in scrubbed text: "${res1_1.scrubbedText}"`
);

// Adversarial Test 1.2: Abbreviated professor names (very common on Turkish exam sheets)
const testInput1_2 = 'Ders Sorumlusu: Prof. Dr. B. Kaymakçıoğlu. Soru: Salisilik asit pKa farkı';
const res1_2 = scrubExamText(testInput1_2);
assert(
  !res1_2.scrubbedText.includes('Kaymakçıoğlu'),
  'Legal Scrubbing strips abbreviated professor names (e.g. "Prof. Dr. B. Kaymakçıoğlu")',
  `Leaked professor surname in scrubbed text: "${res1_2.scrubbedText}"`
);

// Adversarial Test 1.3: Student PII (T.C. Kimlik No & Student Number - KVKK critical)
const testInput1_3 = 'Öğrenci Adı: Zeynep Çelik, T.C. No: 28491028374, Öğrenci No: 210405012. Soru: Asetilkolinesteraz';
const res1_3 = scrubExamText(testInput1_3);
assert(
  !res1_3.scrubbedText.includes('28491028374') && !res1_3.scrubbedText.includes('Zeynep Çelik'),
  'Legal Scrubbing strips student T.C. Kimlik No and student full name (KVKK Art. 5/6)',
  `Leaked student PII in scrubbed text: "${res1_3.scrubbedText}"`
);

// Adversarial Test 1.4: Real-world OCR typos / noisy scans
const testInput1_4 = 'Marm4ra Unv. Eczacilik. Prof Dr Ahmet Yilmaz 2023 Vize: Organofosfat PAM';
const res1_4 = scrubExamText(testInput1_4);
assert(
  !res1_4.scrubbedText.includes('Marm4ra') && !res1_4.scrubbedText.includes('Ahmet Yilmaz'),
  'Legal Scrubbing resilient to common OCR substitution errors (e.g. Marm4ra, unaccented Yilmaz)',
  `OCR noisy entities leaked: "${res1_4.scrubbedText}"`
);

// Adversarial Test 1.5: Verification of actual twin generator behavior in pastExamService.ts
const pastExamServicePath = path.join(REPO_ROOT, 'apps/web/src/services/pastExamService.ts');
const pastExamServiceContent = fs.readFileSync(pastExamServicePath, 'utf8');
const admitsFacultyExamOrigin = pastExamServiceContent.includes('facultyOrigin: \'Marmara Eczacılık 2023 Vizesi İkizi\'');
assert(
  !admitsFacultyExamOrigin,
  'Past Exam bank contains zero claims of copying specific faculty exams (FSEK Art. 15/21 risk)',
  'Code contains explicit facultyOrigin metadata citing real exams: "Marmara Eczacılık 2023 Vizesi İkizi"'
);

// -----------------------------------------------------------------------------
// SUITE 2: OPENROUTER API KEY & EDGE FUNCTION PROXY SECURITY TEST
// -----------------------------------------------------------------------------
console.log('\n--- SUITE 2: OPENROUTER API KEY & EDGE FUNCTION SECURITY TEST ---');

// Adversarial Test 2.1: Check for hardcoded OpenRouter key in client source
const tutorServicePath = path.join(REPO_ROOT, 'apps/web/src/services/tutorService.ts');
const tutorServiceContent = fs.readFileSync(tutorServicePath, 'utf8');
const hasHardcodedKey = /sk-or-v1-[a-f0-9]{16,}/i.test(tutorServiceContent);
assert(
  !hasHardcodedKey,
  'Client bundle contains zero hardcoded sk-or-v1 OpenRouter keys (AGENTS.md Rule 7)',
  'Hardcoded sk-or-v1 key pattern found in apps/web/src/services/tutorService.ts'
);

// Adversarial Test 2.2: Check for direct browser fetch to OpenRouter API
const hasDirectOpenRouterFetch = tutorServiceContent.includes('https://openrouter.ai/api/v1/chat/completions');
assert(
  !hasDirectOpenRouterFetch,
  'Client web app never calls OpenRouter API directly from browser',
  'Found direct browser fetch(\'https://openrouter.ai/api/v1/chat/completions\') in apps/web/src/services/tutorService.ts:103'
);

// Adversarial Test 2.3: Check if v2-tutor-service Edge Function exists on disk
const v2TutorServicePath = path.join(REPO_ROOT, 'supabase/functions/v2-tutor-service/index.ts');
const v2TutorExists = fs.existsSync(v2TutorServicePath);
assert(
  v2TutorExists,
  'v2-tutor-service Edge Function exists in supabase/functions/',
  'supabase/functions/v2-tutor-service does not exist on disk'
);

// Adversarial Test 2.4: Check test-prod-bundle.mjs token guards for sk-or-v1
const bundleGuardPath = path.join(REPO_ROOT, 'scripts/test-prod-bundle.mjs');
const bundleGuardContent = fs.readFileSync(bundleGuardPath, 'utf8');
const checksSkOr = bundleGuardContent.includes('sk-or-v1') || bundleGuardContent.includes('sk-or-');
assert(
  checksSkOr,
  'test-prod-bundle.mjs includes sk-or- in FORBIDDEN_TOKENS release blocker list',
  'test-prod-bundle.mjs does NOT check for OpenRouter API keys (sk-or-v1), allowing leaked keys through build!'
);

// -----------------------------------------------------------------------------
// SUITE 3: PRODUCTION DEPLOYMENT TRIGGERS & AUTHORIZATION SAFEGUARDS
// -----------------------------------------------------------------------------
console.log('\n--- SUITE 3: PRODUCTION DEPLOYMENT TRIGGERS & GATES TEST ---');

// Adversarial Test 3.1: Check blueprint for explicit User Confirmation gate
const blueprintPath = path.join(REPO_ROOT, 'docs/architectural-pedagogical-master-blueprint.md');
const blueprintContent = fs.readFileSync(blueprintPath, 'utf8');
const p6Section = blueprintContent.substring(blueprintContent.indexOf('## 7. Phased Execution Roadmap'));
const hasExplicitUserPromptGate = /user\s+(confirmation|approval|signoff|gate)|STOP\s+gate/i.test(p6Section);
assert(
  hasExplicitUserPromptGate,
  'Blueprint Phase 6 explicitly mandates User Confirmation STOP Gate before production deploy',
  'Blueprint Phase 6 lacks explicit User Confirmation STOP gate; automated agents may deploy without user approval!'
);

// Adversarial Test 3.2: Check for unconfirmed auto-deploy triggers in git hooks or workflows
const githubDir = path.join(REPO_ROOT, '.github');
const hasGithubWorkflows = fs.existsSync(githubDir);
assert(
  !hasGithubWorkflows,
  'No hidden CI/CD automated deployment workflows triggering on push',
  'Found .github directory with potential auto-deploy hooks'
);

console.log('\n========================================================================');
console.log(`STRESS HARNESS COMPLETED: ${totalTests} tests, ${failedTests} failures, ${totalTests - failedTests} passes.`);
console.log('========================================================================');

if (failedTests > 0) {
  console.log('\nSUMMARY OF CONFIRMED ADVERSARIAL FAILURES:');
  failures.forEach((f, i) => {
    console.log(`${i + 1}. [${f.testName}] -> ${f.details}`);
  });
}
