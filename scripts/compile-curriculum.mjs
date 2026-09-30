import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

// Import lesson datasets
const { medchemLessons } = await import('./lessons-data-medchem.mjs');
const { allMedchemLessons } = await import('./data-medchem.mjs');
const { medchemModules2to5 } = await import('./data-medchem-modules2-5.mjs');
const { pharmacologyLessons } = await import('./data-pharmacology-modules1-6.mjs');
const { pharmacologyModules2to6 } = await import('./data-pharmacology-modules2-6.mjs');

const wordCount = (text) => {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
};

const EXPECTED_STAGES = [
  'hook',
  'question',
  'intuition',
  'visual_explanation',
  'interactive_artifact',
  'guided_discovery',
  'formal_explanation',
  'concept_check',
  'application',
  'retrieval',
  'connection',
  'mastery_check',
];

function validateLesson(lesson) {
  if (!lesson.id) throw new Error(`Missing id`);
  if (!lesson.title || !lesson.title.tr || !lesson.title.ar) throw new Error(`Lesson ${lesson.id} missing bilingual title`);
  if (lesson.steps.length !== 12) throw new Error(`Lesson ${lesson.id} has ${lesson.steps.length} steps, expected 12`);

  lesson.steps.forEach((step, idx) => {
    const expectedStage = EXPECTED_STAGES[idx];
    const actualStage = step.stage || step.type;
    if (actualStage !== expectedStage) {
      throw new Error(`Lesson ${lesson.id} step ${idx + 1} has stage ${actualStage}, expected ${expectedStage}`);
    }

    const trPrompt = typeof step.prompt === 'string' ? step.prompt : step.prompt?.tr;
    const arPrompt = typeof step.prompt === 'string' ? '' : step.prompt?.ar;

    const trWords = wordCount(trPrompt);
    if (trWords > 40) {
      throw new Error(`Lesson ${lesson.id} step ${idx + 1} (${step.id}) TR prompt exceeds 40 words (${trWords} words):\n"${trPrompt}"`);
    }

    if (arPrompt) {
      const arWords = wordCount(arPrompt);
      if (arWords > 40) {
        throw new Error(`Lesson ${lesson.id} step ${idx + 1} (${step.id}) AR prompt exceeds 40 words (${arWords} words):\n"${arPrompt}"`);
      }
    }
  });

  // Stage 5 interactive widget check
  const stage5 = lesson.steps[4];
  const hasWidget = stage5.widget || stage5.widgetType || stage5.interactiveWidget || stage5.widgetConfig || stage5.simulationModel;
  if (!hasWidget) {
    throw new Error(`Lesson ${lesson.id} stage 5 missing interactive widget configuration`);
  }
}

// Assemble all 22 lessons
const medchem = [
  medchemLessons[0], // mc-mod1-les1 with claim inventory
  allMedchemLessons[1], // mc-mod1-les2
  ...medchemModules2to5 // mc-mod2-les1 through mc-mod5-les2 (8 lessons)
];

const pharmacology = [
  ...pharmacologyLessons, // pharm-mod1-les1, pharm-mod1-les2 (2 lessons)
  ...pharmacologyModules2to6 // pharm-mod2-les1 through pharm-mod6-les2 (10 lessons)
];

console.log(`Validating ${medchem.length} Medchem lessons...`);
medchem.forEach(validateLesson);
console.log(`All Medchem lessons validated successfully.`);

console.log(`Validating ${pharmacology.length} Pharmacology lessons...`);
pharmacology.forEach(validateLesson);
console.log(`All Pharmacology lessons validated successfully.`);

// Output directories
const medchemDir = path.join(REPO_ROOT, 'courses', 'medchem', 'lessons');
const pharmDir = path.join(REPO_ROOT, 'courses', 'pharmacology', 'lessons');

fs.mkdirSync(medchemDir, { recursive: true });
fs.mkdirSync(pharmDir, { recursive: true });

// Write Medchem lessons: lesson-01.json ... lesson-10.json
medchem.forEach((lesson, index) => {
  const pad = String(index + 1).padStart(2, '0');
  const filename = `lesson-${pad}.json`;
  const filePath = path.join(medchemDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(lesson, null, 2), 'utf-8');
  console.log(`Wrote ${filePath}`);
});

// Write Pharmacology lessons: lesson-01.json ... lesson-12.json
pharmacology.forEach((lesson, index) => {
  const pad = String(index + 1).padStart(2, '0');
  const filename = `lesson-${pad}.json`;
  const filePath = path.join(pharmDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(lesson, null, 2), 'utf-8');
  console.log(`Wrote ${filePath}`);
});

console.log('Curriculum generation completed successfully!');
