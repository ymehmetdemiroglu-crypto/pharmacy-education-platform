const fs = require('fs');

const lessonPath = 'courses/medchem/lessons/lesson-06.json';
const raw = fs.readFileSync(lessonPath, 'utf8');
const lesson = JSON.parse(raw);

console.log('=== LESSON 06 AUDIT ===');
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
    const hints = step.hints;
    if (!hints || !Array.isArray(hints) || hints.length < 3) {
      hintErrors.push({ num, issue: `Has only ${hints ? hints.length : 0} hints (expected >= 3)` });
      return;
    }
    hints.forEach((hint, hIdx) => {
      ['tr', 'ar', 'en'].forEach(lang => {
        const text = hint[lang];
        if (!text) {
          hintErrors.push({ num, hintIndex: hIdx + 1, lang, issue: 'Missing hint text' });
        } else {
          for (const pattern of placeholderPatterns) {
            if (pattern.test(text)) {
              hintErrors.push({ num, hintIndex: hIdx + 1, lang, issue: 'Generic placeholder detected', sample: text.substring(0, 50) });
              break;
            }
          }
        }
      });
    });
  });
}
console.log(`Hint violations: ${hintErrors.length}`);
if (hintErrors.length > 0) {
  console.log('HINT VIOLATIONS (first 10):', JSON.stringify(hintErrors.slice(0, 10), null, 2));
}

console.log('\n=== 4. OPTIONS & DISTRACTOR FEEDBACK AUDIT ===');
let optionSyncIssues = [];
let distractorIssues = [];
if (lesson.steps) {
  lesson.steps.forEach((step, idx) => {
    const num = idx + 1;
    const cc = step.conceptCheck;
    const cfg = step.config;
    
    if (cc && cc.options) {
      if (!cfg || !cfg.options) {
        optionSyncIssues.push({ num, issue: 'conceptCheck.options present but config.options is missing' });
      } else if (cfg.options.length !== cc.options.length) {
        optionSyncIssues.push({ num, issue: `Length mismatch: config.options (${cfg.options.length}) vs conceptCheck.options (${cc.options.length})` });
      }
      
      cc.options.forEach((opt, optIdx) => {
        const text = opt.text?.en || opt.text?.tr || opt.text;
        const fbObj = opt.misconceptionFeedback || opt.feedback;
        const feedback = fbObj?.en || fbObj?.tr || fbObj;
        const isCorrect = opt.isCorrect;
        if (!isCorrect && (!feedback || (typeof feedback === 'string' && feedback.length < 15))) {
          distractorIssues.push({ num, optIdx, text, issue: 'Weak or missing distractor diagnostic feedback' });
        }
      });
    }
  });
}
console.log(`Option sync issues: ${optionSyncIssues.length}`);
console.log(`Distractor issues: ${distractorIssues.length}`);

console.log('\n=== 5. STEP 5 INTERACTIVE WIDGET AUDIT ===');
const step5 = lesson.steps ? lesson.steps[4] : null;
if (step5) {
  console.log('Step 5 widgetType:', step5.widgetType);
  console.log('Step 5 widget type:', step5.widget?.type);
  const cfg = step5.widget?.config || step5.config;
  console.log('Step 5 scaffoldName:', cfg?.scaffoldName);
  console.log('Step 5 positions count:', cfg?.positions?.length);
  console.log('Step 5 targetOptionIds:', cfg?.targetGoal?.targetOptionIds);
} else {
  console.log('Step 5 not found!');
}

console.log('\n=== 6. SCIENTIFIC GROUNDING KEYWORDS CHECK ===');
const fullText = JSON.stringify(lesson).toLowerCase();
const requiredKeywords = [
  { term: 'tetrazol', alt: 'tetrazole', label: "Tetrazole / Losartan" },
  { term: 'karboksil', alt: 'carboxyl', label: "Carboxylic acid isosterism" },
  { term: 'salbütamol', alt: 'salbutamol', label: "Salbutamol hydroxymethyl (-CH2OH)" },
  { term: 'sülfanilamid', alt: 'sulfanilamide', label: "PABA vs Sulfanilamide" },
  { term: 'prokainamid', alt: 'procainamide', label: "Procaine vs Procainamide" },
  { term: 'dietilstilbestrol', alt: 'diethylstilbestrol', label: "Diethylstilbestrol vs Estradiol" }
];

requiredKeywords.forEach(kw => {
  const found = fullText.includes(kw.term) || (kw.alt && fullText.includes(kw.alt));
  console.log(`${kw.label}: ${found ? 'FOUND' : 'NOT FOUND'}`);
});
