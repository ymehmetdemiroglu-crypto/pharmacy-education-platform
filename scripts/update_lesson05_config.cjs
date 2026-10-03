const fs = require('fs');

const lessonPath = 'courses/medchem/lessons/lesson-05.json';
const lesson = JSON.parse(fs.readFileSync(lessonPath, 'utf8'));

// Enhance Step 3 with explicit Erlenmeyer (1932) attribution
const step3 = lesson.steps[2];
const opt3a = step3.conceptCheck.options.find(o => o.id === 'opt-3a');
if (opt3a) {
  opt3a.misconceptionFeedback = {
    tr: "Tam olarak öyle! Hans Erlenmeyer'in (1932) psödoatom kuralı: C+3H (-CH3), N+2H (-NH2), O+1H (-OH) ve F grupları aynı değerlik kabuğunu (7 valans elektronu) paylaşan monovalan psödoatomlardır (Slayt 3).",
    ar: "بالضبط! قاعدة هانس إرلنماير (1932) لأشباه الذرات: C+3H (-CH3) و N+2H (-NH2) و O+1H (-OH) والفلور تتقاسم نفس غلاف التكافؤ كأشباه ذرات أحادية التكافؤ (شريحة 3).",
    en: "Spot on! Hans Erlenmeyer's (1932) pseudoatom law: C+3H (-CH3), N+2H (-NH2), O+1H (-OH), and F share identical valence electron configurations (Slide 3)."
  };
}

lesson.steps.forEach((step, idx) => {
  const stepNum = idx + 1;
  
  if (stepNum === 5) {
    step.widgetType = 'StructureIdentifier';
    step.widget = {
      type: 'StructureIdentifier',
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
console.log('Successfully refined lesson-05.json with Erlenmeyer attribution and mirrored configs!');
