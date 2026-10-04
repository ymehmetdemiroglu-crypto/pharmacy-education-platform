/**
 * scripts/generate-lesson-client.mjs
 * 
 * Generates sanitized production client lesson data from master course authoring JSON.
 * Strips internal developer review tokens, unverified citation tags, and dev-only audit metadata.
 * 
 * Note: Hint tiers 2-3 are included in the client dataset during Phase 3 and will be
 * served exclusively via rules-gated Firestore in Phase 4A (IMP-01).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

const SOURCE_PATH = path.join(REPO_ROOT, 'courses/medchem/lessons/lesson-01.json');
const TARGET_PATH = path.join(REPO_ROOT, 'apps/web/src/data/lesson01.client.ts');

export function generateClientLesson(sourceJson) {
  const data = typeof sourceJson === 'string' ? JSON.parse(sourceJson) : sourceJson;

  // Clean citations for client bundle:
  // Preserves legitimate textbook bibliographic information (book, edition, topic).
  // Strictly removes unverified/pending internal metadata and avoids false verification labels.
  // Shipped status fields must mirror the source JSON or be absent.
  const citations = (data.citations || []).map((c, i) => {
    const citation = {
      id: `cit-ref-0${i + 1}`,
      book: c.book,
      edition: c.edition,
      topic: c.topic,
    };
    if (c.chapter && c.chapter !== 'unverified') {
      citation.chapter = c.chapter;
    }
    if (c.page && c.page !== 'unverified') {
      citation.page = c.page;
    }
    if (c.status === 'verified') {
      citation.status = 'verified';
    }
    return citation;
  });

  // Clean spaced review cards:
  // Preserves learner-facing flashcard prompts and spaced repetition parameters.
  // Shipped status fields must mirror source JSON if verified, or be absent if pending review.
  const spacedReviewCards = (data.spacedReviewCards || []).map((card) => {
    const cleanCard = {
      cardId: card.cardId,
      courseId: card.courseId,
      drugOrConcept: card.drugOrConcept,
      prompt: card.prompt,
      answer: card.answer,
      box: card.box,
      intervalDays: card.intervalDays,
    };
    if (card.status === 'verified') {
      cleanCard.status = 'verified';
    }
    return cleanCard;
  });

  // Clean steps (removes internal numericClaims and preserves clean pedagogical structure)
  const steps = (data.steps || []).map((step) => {
    const { numericClaims, ...cleanStep } = step;
    if (cleanStep.config && typeof cleanStep.config === 'object') {
      const { parameterId, ...cleanConfig } = cleanStep.config;
      cleanStep.config = cleanConfig;
    }
    if (cleanStep.widget && cleanStep.widget.config && typeof cleanStep.widget.config === 'object') {
      const { parameterId, ...cleanWidgetConfig } = cleanStep.widget.config;
      cleanStep.widget = { ...cleanStep.widget, config: cleanWidgetConfig };
    }
    return cleanStep;
  });

  const clientObject = {
    $schema: data.$schema,
    id: data.id,
    courseId: data.courseId,
    moduleId: data.moduleId,
    title: data.title,
    order: data.order,
    access: data.access,
    objective: data.objective,
    misconceptions: data.misconceptions,
    sources: data.sources,
    citations,
    spacedReviewCards,
    translations: data.translations,
    steps,
  };

  const header = `import type { LessonData } from '@pharmacy/platform';\n\n/**\n * Production-ready client lesson data for Course A Lesson 1.\n * Free of internal audit tokens, unverified notes, or developer review tags.\n */\nexport const clientLesson01: LessonData = `;

  return `${header}${JSON.stringify(clientObject, null, 2)} as unknown as LessonData;\n`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const sourceRaw = fs.readFileSync(SOURCE_PATH, 'utf8');
  const outputCode = generateClientLesson(sourceRaw);
  fs.writeFileSync(TARGET_PATH, outputCode, 'utf8');
  console.log(`[GENERATOR] Successfully generated ${TARGET_PATH} from ${SOURCE_PATH}`);
}
