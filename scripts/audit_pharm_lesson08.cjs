const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../courses/pharmacology/lessons/lesson-08.json');
const raw = fs.readFileSync(filePath, 'utf8');
const lesson = JSON.parse(raw);

const wordCount = (str) => (str ? str.trim().split(/\s+/).filter(Boolean).length : 0);

console.log('Auditing Lesson 08:', lesson.id);

console.assert(lesson.id === 'pharm-mod4-les2', 'id mismatch');
console.assert(lesson.courseId === 'pharmacology', 'courseId mismatch');
console.assert(lesson.steps.length === 12, 'must have 12 steps');

const STAGES = [
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

let allPassed = true;

lesson.steps.forEach((step, idx) => {
  const stage = step.stage || step.type;
  if (stage !== STAGES[idx]) {
    console.error(`Step ${idx + 1} stage mismatch: expected ${STAGES[idx]}, got ${stage}`);
    allPassed = false;
  }
  if (step.stageIndex !== idx + 1) {
    console.error(`Step ${idx + 1} stageIndex mismatch: expected ${idx + 1}, got ${step.stageIndex}`);
    allPassed = false;
  }

  // Title
  if (!step.title || !step.title.tr || !step.title.ar) {
    console.error(`Step ${idx + 1} missing title translations`);
    allPassed = false;
  }

  // Word counts
  const trPrompt = step.prompt?.tr || (typeof step.prompt === 'string' ? step.prompt : '');
  const arPrompt = step.prompt?.ar || '';
  const enPrompt = step.prompt?.en || '';
  const trWords = wordCount(trPrompt);
  const arWords = wordCount(arPrompt);
  const enWords = wordCount(enPrompt);

  console.log(`Step ${idx + 1} (${stage}) Prompt Words -> TR: ${trWords}, AR: ${arWords}, EN: ${enWords}`);

  if (trWords > 40) {
    console.error(`Step ${idx + 1} TR prompt exceeds 40 words: ${trWords} words: "${trPrompt}"`);
    allPassed = false;
  }
  if (arWords > 40) {
    console.error(`Step ${idx + 1} AR prompt exceeds 40 words: ${arWords} words: "${arPrompt}"`);
    allPassed = false;
  }
  if (enWords > 40) {
    console.error(`Step ${idx + 1} EN prompt exceeds 40 words: ${enWords} words: "${enPrompt}"`);
    allPassed = false;
  }

  // Hints
  if (!step.hints || step.hints.length !== 3) {
    console.error(`Step ${idx + 1} must have exactly 3 hints`);
    allPassed = false;
  } else {
    step.hints.forEach((h, hIdx) => {
      if (!h.tr || !h.ar || !h.en) {
        console.error(`Step ${idx + 1} hint ${hIdx + 1} missing translation`);
        allPassed = false;
      }
      if (h.tr.includes('1. Aşama İpucu') || h.tr.includes('Temel kavramı')) {
        console.error(`Step ${idx + 1} hint has placeholder content: ${h.tr}`);
        allPassed = false;
      }
    });
  }

  // Options
  if (step.conceptCheck && step.conceptCheck.options) {
    const opts = step.conceptCheck.options;
    if (opts.length !== 3) {
      console.error(`Step ${idx + 1} must have exactly 3 options, got ${opts.length}`);
      allPassed = false;
    }
    const correctCount = opts.filter((o) => o.isCorrect).length;
    if (correctCount !== 1) {
      console.error(`Step ${idx + 1} must have exactly 1 correct option, got ${correctCount}`);
      allPassed = false;
    }
    opts.forEach((o, oIdx) => {
      if (!o.misconceptionFeedback) {
        console.error(`Step ${idx + 1} option ${oIdx + 1} missing misconceptionFeedback`);
        allPassed = false;
      }
    });
  }

  // Technical terms
  if (!step.technicalTerms || step.technicalTerms.length === 0) {
    console.error(`Step ${idx + 1} missing technicalTerms`);
    allPassed = false;
  } else {
    step.technicalTerms.forEach((tt) => {
      if (!tt.term || !tt.arContext) {
        console.error(`Step ${idx + 1} technical term missing term or arContext:`, tt);
        allPassed = false;
      }
    });
  }

  // Prohibited terms
  const jsonStr = JSON.stringify(step);
  if (jsonStr.includes('Medisinal Kimya')) {
    console.error(`Step ${idx + 1} contains prohibited term 'Medisinal Kimya'`);
    allPassed = false;
  }
});

// Step 1 predictThenReveal
if (lesson.steps[0].predictThenReveal !== true) {
  console.error('Step 1 must have predictThenReveal: true');
  allPassed = false;
}

// Step 5 specific check
const step5 = lesson.steps[4];
if (step5.widgetType !== 'ReceptorLigandMatcher') {
  console.error('Step 5 widgetType must be ReceptorLigandMatcher');
  allPassed = false;
}
if (!step5.widget || step5.widget.type !== 'ReceptorLigandMatcher') {
  console.error('Step 5 widget.type must be ReceptorLigandMatcher');
  allPassed = false;
}

if (allPassed) {
  console.log('✅ ALL AUDIT CHECKS PASSED FOR LESSON 08!');
} else {
  console.error('❌ SOME AUDIT CHECKS FAILED FOR LESSON 08');
  process.exit(1);
}
