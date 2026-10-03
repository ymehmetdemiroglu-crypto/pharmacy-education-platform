const fs = require('fs');

const lessonPath = 'courses/medchem/lessons/lesson-08.json';
const lesson = JSON.parse(fs.readFileSync(lessonPath, 'utf8'));

const stageTypeMap = {
  1: 'predict_reveal',
  2: 'question',
  3: 'intuition',
  4: 'visual_explanation',
  5: 'receptor_ligand_matcher',
  6: 'guided_discovery',
  7: 'formal_explanation',
  8: 'concept_check',
  9: 'clinical_vignette',
  10: 'retrieval',
  11: 'connection',
  12: 'mastery_check'
};

lesson.steps.forEach((step, idx) => {
  const stepNum = idx + 1;
  step.type = stageTypeMap[stepNum] || step.stage;
  
  if (stepNum === 5) {
    step.widgetType = 'ReceptorLigandMatcher';
    if (!step.widget) {
      step.widget = {
        type: 'ReceptorLigandMatcher',
        config: step.config
      };
    }
  }
});

fs.writeFileSync(lessonPath, JSON.stringify(lesson, null, 2), 'utf8');
console.log('Successfully updated lesson-08.json step types!');
