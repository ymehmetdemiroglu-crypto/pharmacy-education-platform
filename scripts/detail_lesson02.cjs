const fs = require('fs');

const lessonPath = 'courses/medchem/lessons/lesson-02.json';
const lesson = JSON.parse(fs.readFileSync(lessonPath, 'utf8'));

console.log('=== DETAILED STEP-BY-STEP AUDIT OF LESSON 02 ===');

lesson.steps.forEach((step, idx) => {
  const num = idx + 1;
  const stage = step.stage || step.type;
  console.log(`\n--- Step ${num}: [${stage}] id="${step.id}" ---`);
  console.log('Title (TR):', step.title?.tr || step.title);
  console.log('Prompt (TR):', step.prompt?.tr || step.prompt);
  console.log('predictThenReveal:', step.predictThenReveal);
  console.log('widgetType:', step.widgetType);
  if (step.widget) {
    console.log('widget.type:', step.widget.type);
    console.log('widget.config keys:', Object.keys(step.widget.config || {}));
  }
  console.log('conceptCheck:', step.conceptCheck ? `${step.conceptCheck.options.length} options` : 'none');
  console.log('config.options:', step.config?.options ? `${step.config.options.length} options` : 'none');
  console.log('config.revealedOutcome:', step.config?.revealedOutcome ? 'present' : 'none');
  console.log('config.explanation:', step.config?.explanation ? 'present' : 'none');
  console.log('hints count:', step.hints ? step.hints.length : 'none');
  console.log('sources count:', step.sources ? step.sources.length : 'none');
});
