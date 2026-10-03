const fs = require('fs');

const lesson = JSON.parse(fs.readFileSync('courses/medchem/lessons/lesson-04.json', 'utf8'));

console.log('=== MISCONCEPTION & DISTRACTOR AUDIT FOR LESSON 04 ===');

lesson.steps.forEach((step, idx) => {
  const stage = step.stage || step.type;
  console.log(`\n================ STEP ${idx + 1} (${stage}): ${step.title.tr} ================`);
  console.log(`Prompt (TR): "${step.prompt.tr}"`);
  
  if (step.conceptCheck && step.conceptCheck.options) {
    step.conceptCheck.options.forEach(opt => {
      const isCor = opt.isCorrect ? '✅ [CORRECT]' : '❌ [DISTRACTOR]';
      const textTr = opt.text.tr || opt.text;
      const fbTr = opt.misconceptionFeedback?.tr || opt.misconceptionFeedback || '';
      console.log(`  Option (${opt.id}) ${isCor}: "${textTr}"`);
      console.log(`    Feedback: "${fbTr}"`);
    });
  } else {
    console.log('  No conceptCheck (Interactive widget step)');
  }

  if (step.hints) {
    console.log(`  Hints count: ${step.hints.length}`);
    step.hints.forEach((h, hIdx) => {
      const hText = h.tr || h;
      console.log(`    Tier ${hIdx + 1} (${hText.length} chars): "${hText}"`);
    });
  }
});
