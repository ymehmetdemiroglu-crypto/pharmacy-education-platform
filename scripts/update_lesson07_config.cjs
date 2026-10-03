const fs = require('fs');

const lessonPath = 'courses/medchem/lessons/lesson-07.json';
const lesson = JSON.parse(fs.readFileSync(lessonPath, 'utf8'));

lesson.steps.forEach((step, idx) => {
  const stepNum = idx + 1;
  
  if (stepNum === 5) {
    step.widgetType = 'DoseResponseCurve';
    step.widget = {
      type: 'DoseResponseCurve',
      config: step.config
    };
  } else if (step.conceptCheck && step.conceptCheck.options) {
    const correctOpt = step.conceptCheck.options.find(o => o.isCorrect) || step.conceptCheck.options[0];
    
    const mirroredOptions = step.conceptCheck.options.map(opt => ({
      id: opt.id,
      text: typeof opt.text === 'object' ? opt.text.tr : opt.text,
      isCorrect: opt.isCorrect,
      misconceptionFeedback: typeof opt.misconceptionFeedback === 'object' ? opt.misconceptionFeedback.tr : opt.misconceptionFeedback
    }));
    
    step.config = {
      options: mirroredOptions,
      revealedOutcome: typeof correctOpt.text === 'object' ? correctOpt.text : { tr: correctOpt.text, ar: correctOpt.text, en: correctOpt.text },
      explanation: typeof correctOpt.misconceptionFeedback === 'object' ? correctOpt.misconceptionFeedback : { tr: correctOpt.misconceptionFeedback, ar: correctOpt.misconceptionFeedback, en: correctOpt.misconceptionFeedback }
    };
  }
});

fs.writeFileSync(lessonPath, JSON.stringify(lesson, null, 2), 'utf8');
console.log('Successfully updated lesson-07.json with mirrored configs and widget wrapper!');
