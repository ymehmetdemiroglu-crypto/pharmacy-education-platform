const fs = require('fs');

const lessonPath = 'courses/medchem/lessons/lesson-10.json';
const raw = fs.readFileSync(lessonPath, 'utf8');
const lesson = JSON.parse(raw);

console.log('=== LESSON 10 AUDIT ===');
console.log('ID:', lesson.id);
console.log('Title (TR):', lesson.title?.tr);
console.log('Title (AR):', lesson.title?.ar);
console.log('Title (EN):', lesson.title?.en);
console.log('Order:', lesson.order);
console.log('Access:', lesson.access);
console.log('Steps count:', lesson.steps ? lesson.steps.length : 0);

function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

console.log('\n=== 1. 12-STAGE SEQUENCE AUDIT ===');
const expectedStages = [
  'hook',
  'question',
  'intuition',
  'visual_explanation',
  'interactive_artifact',
  'guided_discovery',
  'formal_explanation',
  'concept_check',
  'application',
  'retrieval',
  'connection',
  'mastery_check',
];

let stageErrors = 0;
if (!lesson.steps || lesson.steps.length !== 12) {
  console.log(`WARNING: Steps count is ${lesson.steps ? lesson.steps.length : 0}, expected 12`);
  stageErrors++;
} else {
  lesson.steps.forEach((step, idx) => {
    const expected = expectedStages[idx];
    const actual = step.stage || step.type;
    const stageIdx = step.stageIndex;
    const ok = actual === expected && (stageIdx === undefined || stageIdx === idx + 1);
    if (!ok) {
      console.log(`FAIL: Step ${idx + 1}: expected="${expected}", actual="${actual}", stageIndex=${stageIdx}`);
      stageErrors++;
    }
  });
  if (stageErrors === 0) console.log('All 12 stages match canonical sequence exactly.');
}

console.log('\n=== 2. PROMPT WORD COUNT AUDIT (<= 40 words) ===');
let wordCountErrors = [];
if (lesson.steps) {
  lesson.steps.forEach((step, idx) => {
    const p = step.prompt;
    const stage = step.stage || step.type;
    const num = idx + 1;
    
    if (typeof p === 'string') {
      const wc = countWords(p);
      if (wc > 40) wordCountErrors.push({ num, stage, lang: 'single', wc, text: p });
      console.log(`Step ${num} (${stage}): ${wc} words`);
    } else if (p && typeof p === 'object') {
      const trWc = countWords(p.tr);
      const arWc = countWords(p.ar);
      const enWc = countWords(p.en);
      
      if (trWc > 40) wordCountErrors.push({ num, stage, lang: 'tr', wc: trWc, text: p.tr });
      if (arWc > 40) wordCountErrors.push({ num, stage, lang: 'ar', wc: arWc, text: p.ar });
      if (enWc > 40) wordCountErrors.push({ num, stage, lang: 'en', wc: enWc, text: p.en });
      
      console.log(`Step ${num} (${stage}): TR=${trWc} | AR=${arWc} | EN=${enWc} words`);
    } else {
      wordCountErrors.push({ num, stage, lang: 'none', wc: 0, text: 'MISSING PROMPT' });
    }
  });
}
console.log(`Total word count violations: ${wordCountErrors.length}`);
if (wordCountErrors.length > 0) {
  console.log('VIOLATIONS:', JSON.stringify(wordCountErrors, null, 2));
}

console.log('\n=== 3. 3-TIER HINTS AUDIT ===');
let hintErrors = [];
const placeholderPatterns = [
  /1\.\s*Aşama İpucu/i,
  /2\.\s*Aşama İpucu/i,
  /3\.\s*Aşama İpucu/i,
  /تلميح المستوى/i,
  /Tier \d Hint/i,
  /Temel kavramı ve moleküler/i,
  /consider the foundational concept/i,
];

if (lesson.steps) {
  lesson.steps.forEach((step, idx) => {
    const num = idx + 1;
    const hints = step.hints || [];
    if (hints.length !== 3) {
      hintErrors.push({ num, issue: `Expected 3 hints, found ${hints.length}` });
    }
    hints.forEach((h, hIdx) => {
      const text = typeof h === 'object' ? `${h.tr} ${h.en} ${h.ar}` : String(h);
      for (const pat of placeholderPatterns) {
        if (pat.test(text)) {
          hintErrors.push({ num, tier: hIdx + 1, issue: 'Placeholder pattern detected', match: text });
          break;
        }
      }
    });
  });
}
console.log(`Hint violations: ${hintErrors.length}`);
if (hintErrors.length > 0) {
  console.log('HINT VIOLATIONS:', JSON.stringify(hintErrors, null, 2));
}

console.log('\n=== 4. OPTIONS & DISTRACTOR FEEDBACK AUDIT ===');
let optionSyncIssues = 0;
let distractorIssues = 0;

if (lesson.steps) {
  lesson.steps.forEach((step, idx) => {
    const num = idx + 1;
    const cc = step.conceptCheck;
    const cfg = step.config;

    if (cc && cc.options) {
      if (!cfg || !cfg.options || cfg.options.length !== cc.options.length) {
        optionSyncIssues++;
        console.log(`Step ${num}: config.options does not match conceptCheck.options length`);
      }
      
      cc.options.forEach((opt, optIdx) => {
        if (!opt.misconceptionFeedback) {
          distractorIssues++;
          console.log(`Step ${num} Opt ${optIdx + 1}: Missing misconception feedback`);
        }
      });
    }
  });
}
console.log(`Option sync issues: ${optionSyncIssues}`);
console.log(`Distractor issues: ${distractorIssues}`);

console.log('\n=== 5. STEP 5 INTERACTIVE WIDGET AUDIT ===');
const step5 = lesson.steps ? lesson.steps[4] : null;
if (step5) {
  console.log('Step 5 widgetType:', step5.widgetType);
  console.log('Step 5 widget type:', step5.widget?.type);
  console.log('Step 5 drugName:', step5.widget?.config?.drugName);
  console.log('Step 5 sites count:', step5.widget?.config?.sites?.length);
  console.log('Step 5 target site count:', step5.widget?.config?.sites?.filter(s => s.isTargetSite).length);
} else {
  console.log('Step 5 missing');
}

console.log('\n=== 6. SCIENTIFIC GROUNDING KEYWORDS CHECK ===');
const fullText = JSON.stringify(lesson);
const keywords = [
  { name: 'Glucuronidation / UGT / UDPGA', re: /glukuronid|UGT|UDPGA/i },
  { name: 'Sulfation / SULT / PAPS', re: /sülfas|SULT|PAPS/i },
  { name: 'Acetylation / NAT-2 / Acetyl-CoA / Crystalluria', re: /asetil|NAT|kristal/i },
  { name: 'Glutathione / GST / Mercapturic acid', re: /glutat|GSH|merkapt/i },
  { name: 'Paracetamol / NAPQI / Hepatotoxicity', re: /parasetamol|acetaminophen|NAPQI|hepatotok/i },
  { name: 'N-Acetylcysteine (NAC) Antidote', re: /asetilsistein|NAC/i },
  { name: 'Methenamine / Formaldehyde (pH < 5.5)', re: /metenamin|formaldehit/i },
];

keywords.forEach(kw => {
  const found = kw.re.test(fullText);
  console.log(`${kw.name}: ${found ? 'FOUND' : 'NOT FOUND'}`);
});
