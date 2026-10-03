const fs = require('fs');

const lessonPath = 'courses/medchem/lessons/lesson-02.json';
const raw = fs.readFileSync(lessonPath, 'utf8');
const lesson = JSON.parse(raw);

console.log('=== LESSON 02 METADATA ===');
console.log('ID:', lesson.id);
console.log('Title (TR):', lesson.title.tr);
console.log('Title (AR):', lesson.title.ar);
console.log('Title (EN):', lesson.title.en);
console.log('Order:', lesson.order);
console.log('Access:', lesson.access);
console.log('Steps count:', lesson.steps ? lesson.steps.length : 0);

function countWords(str) {
  if (!str) return 0;
  // Clean markdown tags or latex symbols if needed, but split on whitespace
  return str.trim().split(/\s+/).filter(Boolean).length;
}

console.log('\n=== PROMPT WORD COUNT AUDIT (Limit <= 40 words) ===');
let wordCountErrors = [];

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

console.log(`Total word count violations: ${wordCountErrors.length}`);
if (wordCountErrors.length > 0) {
  console.log('VIOLATIONS:', JSON.stringify(wordCountErrors, null, 2));
}

console.log('\n=== 12-STAGE SEQUENCE AUDIT ===');
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

lesson.steps.forEach((step, idx) => {
  const expected = expectedStages[idx];
  const actual = step.stage || step.type;
  const stageIdx = step.stageIndex;
  const ok = actual === expected && (stageIdx === undefined || stageIdx === idx + 1);
  console.log(`Step ${idx + 1}: expected="${expected}", actual="${actual}", stageIndex=${stageIdx} => ${ok ? 'OK' : 'FAIL'}`);
});

console.log('\n=== SOURCES AUDIT ===');
console.log('Sources:', JSON.stringify(lesson.sources, null, 2));

console.log('\n=== CITATIONS AUDIT ===');
console.log('Citations:', JSON.stringify(lesson.citations, null, 2));

console.log('\n=== NUMERIC CLAIMS AUDIT ===');
console.log('Numeric Claims:', JSON.stringify(lesson.numericClaims, null, 2));
