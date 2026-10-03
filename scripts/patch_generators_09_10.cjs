const fs = require('fs');
const path = require('path');

const stageTypeMap = {
  1: 'predict_reveal',
  2: 'question',
  3: 'intuition',
  4: 'visual_explanation',
  5: 'interactive_artifact',
  6: 'guided_discovery',
  7: 'formal_explanation',
  8: 'concept_check',
  9: 'application',
  10: 'retrieval',
  11: 'connection',
  12: 'mastery_check'
};

['generate_pharm_lesson09.cjs', 'generate_pharm_lesson10.cjs'].forEach(filename => {
  const filePath = path.resolve(__dirname, filename);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace type mappings in content
  content = content.replace(/stage: "question",\s+type: "predict_reveal",/g, 'stage: "question",\n      type: "question",');
  content = content.replace(/stage: "intuition",\s+type: "explanation",/g, 'stage: "intuition",\n      type: "intuition",');
  content = content.replace(/stage: "visual_explanation",\s+type: "explanation",/g, 'stage: "visual_explanation",\n      type: "visual_explanation",');
  content = content.replace(/stage: "interactive_artifact",\s+type: "interactive_simulation",/g, 'stage: "interactive_artifact",\n      type: "interactive_artifact",');
  content = content.replace(/stage: "formal_explanation",\s+type: "explanation",/g, 'stage: "formal_explanation",\n      type: "formal_explanation",');
  content = content.replace(/stage: "concept_check",\s+type: "multiple_choice",/g, 'stage: "concept_check",\n      type: "concept_check",');
  content = content.replace(/stage: "application",\s+type: "multiple_choice",/g, 'stage: "application",\n      type: "application",');
  content = content.replace(/stage: "retrieval",\s+type: "reflection",/g, 'stage: "retrieval",\n      type: "retrieval",');
  content = content.replace(/stage: "connection",\s+type: "explanation",/g, 'stage: "connection",\n      type: "connection",');
  content = content.replace(/stage: "mastery_check",\s+type: "multiple_choice",/g, 'stage: "mastery_check",\n      type: "mastery_check",');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated types in ${filename}`);
});
