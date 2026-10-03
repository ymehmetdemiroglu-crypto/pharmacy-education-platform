const fs = require('fs');

function convertHints(filePath) {
  const lesson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  lesson.steps.forEach((step, idx) => {
    if (step.hints && !Array.isArray(step.hints)) {
      const h = step.hints;
      step.hints = [
        {
          tier: 1,
          tr: h.nudge?.tr || '',
          ar: h.nudge?.ar || '',
          en: h.nudge?.en || ''
        },
        {
          tier: 2,
          tr: h.clue?.tr || '',
          ar: h.clue?.ar || '',
          en: h.clue?.en || ''
        },
        {
          tier: 3,
          tr: h.solution?.tr || '',
          ar: h.solution?.ar || '',
          en: h.solution?.en || ''
        }
      ];
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(lesson, null, 2), 'utf8');
  console.log('Converted hints to array in:', filePath);
}

// Convert both worktree and main repo
const paths = [
  'courses/pharmacology/lessons/lesson-07.json',
  'courses/pharmacology/lessons/lesson-08.json',
  'C:/Users/hp/Documents/antigravity/valiant-raman/courses/pharmacology/lessons/lesson-07.json',
  'C:/Users/hp/Documents/antigravity/valiant-raman/courses/pharmacology/lessons/lesson-08.json'
];

paths.forEach(p => {
  if (fs.existsSync(p)) convertHints(p);
});
