const fs = require('fs');

const lesson = JSON.parse(fs.readFileSync('courses/medchem/lessons/lesson-05.json', 'utf8'));

for (let idx = 0; idx < 4; idx++) {
  const s = lesson.steps[idx];
  console.log(`\n--- Step ${idx + 1} (${s.stage}) ---`);
  console.log('ID:', s.id);
  console.log('Title (TR):', s.title?.tr);
  console.log('predictThenReveal:', s.predictThenReveal);
  console.log('config keys:', Object.keys(s.config || {}));
  console.log('conceptCheck options count:', s.conceptCheck?.options?.length || 0);
  if (s.conceptCheck?.options) {
    s.conceptCheck.options.forEach((opt, oIdx) => {
      console.log(`  Opt ${oIdx + 1} (${opt.id}) [correct: ${opt.isCorrect}]: TR=${opt.text?.tr?.substring(0, 60)}...`);
    });
  }
}
