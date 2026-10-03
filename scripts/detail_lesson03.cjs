const fs = require('fs');

const lesson = JSON.parse(fs.readFileSync('courses/medchem/lessons/lesson-03.json', 'utf8'));

console.log('=== DETAILED STEP AUDIT FOR LESSON 03 ===');

lesson.steps.forEach((step, idx) => {
  console.log(`\n================ STEP ${idx + 1} (${step.stage}): ${step.title.tr} ================`);
  console.log(`PROMPT (TR): "${step.prompt.tr}"`);
  console.log(`PROMPT (EN): "${step.prompt.en}"`);
  
  if (step.conceptCheck && step.conceptCheck.options) {
    console.log('OPTIONS & DIAGNOSTIC FEEDBACK:');
    step.conceptCheck.options.forEach(opt => {
      const mark = opt.isCorrect ? '✅ [CORRECT]' : '❌ [DISTRACTOR]';
      console.log(`  ${mark} (${opt.id}): "${opt.text.tr}"`);
      console.log(`    Feedback: "${opt.misconceptionFeedback?.tr || opt.feedback?.tr || opt.feedback || ''}"`);
    });
  }
  
  if (step.hints) {
    console.log('HINTS (3 Tiers):');
    step.hints.forEach((h, hIdx) => {
      const hText = h.tr || h;
      console.log(`  Tier ${hIdx + 1} (${hText.length} chars): "${hText}"`);
    });
  }
});
