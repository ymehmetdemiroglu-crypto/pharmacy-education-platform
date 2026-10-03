const fs = require('fs');
const lesson = JSON.parse(fs.readFileSync('courses/medchem/lessons/lesson-08.json', 'utf8'));

lesson.steps.forEach((s, idx) => {
  if (s.conceptCheck?.options) {
    console.log(`\n=== STEP ${idx + 1} (${s.stage}) ===`);
    s.conceptCheck.options.forEach(opt => {
      console.log(`  [${opt.isCorrect ? 'CORRECT' : 'WRONG'}] (${opt.id}): ${opt.text?.tr || opt.text}`);
    });
  }
});
