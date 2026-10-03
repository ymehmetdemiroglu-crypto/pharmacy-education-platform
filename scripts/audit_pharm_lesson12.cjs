const fs = require('fs');
const path = require('path');

function wordCount(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

const lessonPath = path.resolve(__dirname, '../courses/pharmacology/lessons/lesson-12.json');
const lesson = JSON.parse(fs.readFileSync(lessonPath, 'utf8'));

console.log(`Auditing ${lesson.id} - ${lesson.title.tr}...`);

let errors = [];

// 1. Check title, objective, misconceptions, citations, spacedReviewCards
if (!lesson.title?.tr || !lesson.title?.ar || !lesson.title?.en) errors.push('Missing trilingual title');
if (!lesson.objective?.tr || !lesson.objective?.ar || !lesson.objective?.en) errors.push('Missing trilingual objective');
if (!lesson.misconceptions || lesson.misconceptions.length < 2) errors.push('At least 2 misconceptions required');
if (!lesson.citations || lesson.citations.length < 2) errors.push('At least 2 citations required');
lesson.citations?.forEach((c, idx) => {
  if (c.status !== 'verified') errors.push(`Citation ${idx} (${c.id}) is not verified`);
  if (!c.chapter || c.chapter === 'unverified') errors.push(`Citation ${idx} (${c.id}) missing chapter`);
  if (!c.page || c.page === 'unverified') errors.push(`Citation ${idx} (${c.id}) missing page`);
});
if (!lesson.spacedReviewCards || lesson.spacedReviewCards.length < 3) errors.push('At least 3 spaced review cards required');

// 2. Stages sequence
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
  'mastery_check'
];

if (lesson.steps.length !== 12) {
  errors.push(`Expected 12 steps, got ${lesson.steps.length}`);
}

lesson.steps.forEach((step, idx) => {
  const expectedStage = expectedStages[idx];
  if (step.stage !== expectedStage) {
    errors.push(`Step ${idx + 1}: expected stage '${expectedStage}', got '${step.stage}'`);
  }

  // Titles
  if (!step.title?.tr || !step.title?.ar || !step.title?.en) {
    errors.push(`Step ${idx + 1} (${step.id}): missing trilingual title`);
  }

  // Prompts & Word count (<= 40 words)
  ['tr', 'ar', 'en'].forEach(lang => {
    const text = step.prompt?.[lang];
    if (!text) {
      errors.push(`Step ${idx + 1} (${step.id}): missing prompt.${lang}`);
    } else {
      const count = wordCount(text);
      if (count > 40) {
        errors.push(`Step ${idx + 1} (${step.id}): prompt.${lang} exceeds 40 words (${count} words): "${text}"`);
      }
    }
  });

  // Step 1 predictThenReveal
  if (idx === 0 && step.predictThenReveal !== true) {
    errors.push(`Step 1 must have predictThenReveal: true`);
  }

  // Step 5 dual widget wrapper
  if (idx === 4) {
    if (step.widgetType !== 'ReceptorLigandMatcher') {
      errors.push(`Step 5: expected widgetType 'ReceptorLigandMatcher', got '${step.widgetType}'`);
    }
    if (step.widget?.type !== 'ReceptorLigandMatcher') {
      errors.push(`Step 5: expected widget.type 'ReceptorLigandMatcher', got '${step.widget?.type}'`);
    }
    if (!step.widget?.config || !step.config) {
      errors.push(`Step 5: widget.config and config must be present`);
    }
    if (JSON.stringify(step.widget?.config) !== JSON.stringify(step.config)) {
      errors.push(`Step 5: widget.config does not match config`);
    }
  }

  // Technical terms
  if (!step.technicalTerms || step.technicalTerms.length < 1) {
    errors.push(`Step ${idx + 1} (${step.id}): technicalTerms must have at least 1 term`);
  } else {
    step.technicalTerms.forEach((tt, tIdx) => {
      if (!tt.term) errors.push(`Step ${idx + 1} tt[${tIdx}]: missing term`);
      if (!tt.arContext) errors.push(`Step ${idx + 1} tt[${tIdx}]: missing arContext`);
    });
  }

  // Hints
  if (!step.hints || step.hints.length !== 3) {
    errors.push(`Step ${idx + 1} (${step.id}): expected exactly 3 hints, got ${step.hints?.length}`);
  } else {
    step.hints.forEach((h, hIdx) => {
      if (!h.tr || !h.ar || !h.en) {
        errors.push(`Step ${idx + 1} hint[${hIdx}]: missing tr/ar/en text`);
      }
      if (h.tr.includes('1. Aşama İpucu') || h.tr.includes('Temel kavramı')) {
        errors.push(`Step ${idx + 1} hint[${hIdx}]: generic placeholder hint detected`);
      }
    });
  }

  // Concept checks (steps 1, 2, 8, 9, 12)
  if ([0, 1, 7, 8, 11].includes(idx)) {
    const cc = step.conceptCheck;
    if (!cc) {
      errors.push(`Step ${idx + 1} (${step.id}): conceptCheck required`);
    } else {
      if (!cc.question?.tr || !cc.question?.ar || !cc.question?.en) {
        errors.push(`Step ${idx + 1} conceptCheck: missing trilingual question`);
      }
      if (!cc.options || cc.options.length !== 3) {
        errors.push(`Step ${idx + 1} conceptCheck: exactly 3 options required, got ${cc.options?.length}`);
      } else {
        const correctCount = cc.options.filter(o => o.isCorrect).length;
        if (correctCount !== 1) {
          errors.push(`Step ${idx + 1} conceptCheck: exactly 1 correct option required, got ${correctCount}`);
        }
        cc.options.forEach((opt, oIdx) => {
          if (!opt.text?.tr || !opt.text?.ar || !opt.text?.en) {
            errors.push(`Step ${idx + 1} option[${oIdx}]: missing trilingual text`);
          }
          if (!opt.misconceptionFeedback?.tr || !opt.misconceptionFeedback?.ar || !opt.misconceptionFeedback?.en) {
            errors.push(`Step ${idx + 1} option[${oIdx}]: missing trilingual misconceptionFeedback`);
          }
        });
      }
    }
  }
});

// Forbidden terms check
const fullText = JSON.stringify(lesson);
if (fullText.includes('Medisinal Kimya')) {
  errors.push(`Contains forbidden term 'Medisinal Kimya'`);
}

if (errors.length > 0) {
  console.error(`Audit FAILED with ${errors.length} errors:`);
  errors.forEach(e => console.error(` - ${e}`));
  process.exit(1);
} else {
  console.log(`Audit PASSED! 100% compliant with Brilliant learn-by-doing standard.`);
}
