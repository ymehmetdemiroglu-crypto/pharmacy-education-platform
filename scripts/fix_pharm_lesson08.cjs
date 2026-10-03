const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../courses/pharmacology/lessons/lesson-08.json');
const lesson = JSON.parse(fs.readFileSync(filePath, 'utf8'));

lesson.steps.forEach(step => {
  // Ensure technicalTerms has { term, arContext }
  if (Array.isArray(step.technicalTerms)) {
    step.technicalTerms = step.technicalTerms.map(tt => {
      const term = tt.term;
      let arContext = tt.arContext;
      if (!arContext) {
        const arTerm = tt.ar?.term || tt.term;
        const enTerm = tt.en?.transcription || tt.transcription || tt.term;
        arContext = `${arTerm} (${enTerm})`;
      }
      return { term, arContext };
    });
  }

  // Ensure hints is an array
  if (step.hints && !Array.isArray(step.hints)) {
    const h = step.hints;
    step.hints = [
      { tier: 1, tr: h.nudge?.tr || '', ar: h.nudge?.ar || '', en: h.nudge?.en || '' },
      { tier: 2, tr: h.clue?.tr || '', ar: h.clue?.ar || '', en: h.clue?.en || '' },
      { tier: 3, tr: h.solution?.tr || '', ar: h.solution?.ar || '', en: h.solution?.en || '' }
    ];
  }
});

fs.writeFileSync(filePath, JSON.stringify(lesson, null, 2), 'utf8');
console.log('Fixed lesson-08.json technical terms and hints!');
