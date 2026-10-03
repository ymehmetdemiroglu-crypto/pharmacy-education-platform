const fs = require('fs');

const lesson = JSON.parse(fs.readFileSync('courses/medchem/lessons/lesson-05.json', 'utf8'));

console.log('=== LESSON 05 OVERVIEW ===');
console.log('Title (TR):', lesson.title?.tr);
console.log('Title (AR):', lesson.title?.ar);
console.log('Title (EN):', lesson.title?.en);
console.log('Objective (TR):', lesson.objective?.tr);
console.log('Misconceptions count:', lesson.misconceptions?.length);
console.log('Citations count:', lesson.citations?.length);
console.log('Sources count:', lesson.sources?.length);
console.log('Numeric claims count:', lesson.numericClaims?.length);

lesson.steps.forEach((s, idx) => {
  console.log(`\n--- Step ${idx + 1} (${s.stage}) ---`);
  console.log('ID:', s.id);
  console.log('Title:', s.title?.tr);
  console.log('predictThenReveal:', s.predictThenReveal);
  console.log('widgetType:', s.widgetType);
  console.log('has widget object:', !!s.widget);
  console.log('config keys:', Object.keys(s.config || {}));
  console.log('conceptCheck options count:', s.conceptCheck?.options?.length || 0);
  
  if (s.conceptCheck?.options) {
    s.conceptCheck.options.forEach((opt, oIdx) => {
      console.log(`  Opt ${oIdx + 1} (${opt.id}) [correct: ${opt.isCorrect}]:`);
      console.log(`    TR: ${opt.text?.tr ? opt.text.tr.substring(0, 60) : opt.text}...`);
      console.log(`    Feedback TR: ${opt.misconceptionFeedback?.tr ? opt.misconceptionFeedback.tr.substring(0, 60) : 'none'}...`);
    });
  }
  
  if (s.hints) {
    console.log(`  Hints count: ${s.hints.length}`);
    s.hints.forEach((h, hIdx) => {
      console.log(`    Hint ${hIdx + 1} (TR): ${h.tr ? h.tr.substring(0, 50) : h}...`);
    });
  }
});
