const fs = require('fs');

const lesson = JSON.parse(fs.readFileSync('courses/medchem/lessons/lesson-10.json', 'utf8'));

console.log('=== LESSON 10 METADATA ===');
console.log('ID:', lesson.id);
console.log('Title (TR):', lesson.title?.tr);
console.log('Title (EN):', lesson.title?.en);
console.log('Objective (TR):', lesson.objective?.tr);
console.log('Misconceptions count:', lesson.misconceptions?.length);
console.log('Citations count:', lesson.citations?.length);
console.log('Sources count:', lesson.sources?.length);
console.log('Numeric claims count:', lesson.numericClaims?.length);

lesson.steps.forEach((s, idx) => {
  console.log(`\n================ Step ${idx + 1} (${s.stage}) ================`);
  console.log('ID:', s.id);
  console.log('Title (TR):', s.title?.tr);
  console.log('Prompt (TR):', s.prompt?.tr);
  console.log('Prompt (EN):', s.prompt?.en);
  
  if (s.conceptCheck?.options) {
    console.log('--- Options ---');
    s.conceptCheck.options.forEach((opt, oIdx) => {
      console.log(`  [${opt.isCorrect ? 'CORRECT' : 'WRONG'}] (${opt.id}):`);
      console.log(`    TR: ${opt.text?.tr || opt.text}`);
      const fb = opt.misconceptionFeedback || opt.feedback;
      console.log(`    Feedback (TR): ${fb?.tr || fb}`);
    });
  }
  
  if (s.hints) {
    console.log('--- Hints ---');
    s.hints.forEach((h, hIdx) => {
      console.log(`  Tier ${hIdx + 1}: ${h.tr || h}`);
    });
  }
});
