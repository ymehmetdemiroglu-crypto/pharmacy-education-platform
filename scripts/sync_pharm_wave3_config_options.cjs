const fs = require('fs');
const path = require('path');

['courses/pharmacology/lessons/lesson-05.json', 'courses/pharmacology/lessons/lesson-06.json'].forEach(relPath => {
  const fullPath = path.resolve(relPath);
  const lesson = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

  lesson.steps.forEach((step, idx) => {
    if (step.conceptCheck?.options) {
      if (!step.config) {
        step.config = {};
      }
      step.config.options = step.conceptCheck.options.map(opt => ({
        id: opt.id,
        text: opt.text?.tr || opt.text,
        isCorrect: opt.isCorrect,
        misconceptionFeedback: opt.misconceptionFeedback?.tr || opt.misconceptionFeedback
      }));
    }
  });

  fs.writeFileSync(fullPath, JSON.stringify(lesson, null, 2), 'utf8');

  // Also write to documents master workspace
  const docPath = path.join('c:/Users/hp/Documents/antigravity/valiant-raman', relPath);
  if (fs.existsSync(path.dirname(docPath))) {
    fs.writeFileSync(docPath, JSON.stringify(lesson, null, 2), 'utf8');
  }
  console.log(`Synced config.options for ${relPath}`);
});
