import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateClientLesson } from './generate-lesson-client.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

const medchemDir = path.join(REPO_ROOT, 'courses/medchem/lessons');
const pharmDir = path.join(REPO_ROOT, 'courses/pharmacology/lessons');
const targetFile = path.join(REPO_ROOT, 'apps/web/src/data/curriculum.client.ts');

export function sanitizeLessonForClient(data) {
  const citations = (data.citations || []).map((c, i) => {
    const citation = {
      id: `cit-ref-0${i + 1}`,
      book: c.book,
      edition: c.edition,
      topic: c.topic,
    };
    if (c.chapter && c.chapter !== 'unverified') citation.chapter = c.chapter;
    if (c.page && c.page !== 'unverified') citation.page = c.page;
    if (c.status === 'verified') citation.status = 'verified';
    return citation;
  });

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
    if (card.status === 'verified') cleanCard.status = 'verified';
    return cleanCard;
  });

  const steps = (data.steps || []).map((step) => {
    const { numericClaims, ...cleanStep } = step;
    if (cleanStep.config && typeof cleanStep.config === 'object') {
      const { parameterId, ...cleanConfig } = cleanStep.config;
      cleanStep.config = cleanConfig;
    }
    if (cleanStep.widget && typeof cleanStep.widget === 'object' && cleanStep.widget.config) {
      const { parameterId, ...cleanWidgetConfig } = cleanStep.widget.config;
      cleanStep.widget = {
        ...cleanStep.widget,
        config: cleanWidgetConfig,
      };
    }
    return cleanStep;
  });

  return {
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
}

const clientLessons = {};

// Read all 10 medchem
for (let i = 1; i <= 10; i++) {
  const filename = `lesson-${String(i).padStart(2, '0')}.json`;
  const raw = fs.readFileSync(path.join(medchemDir, filename), 'utf8');
  const sanitized = sanitizeLessonForClient(JSON.parse(raw));
  clientLessons[sanitized.id] = sanitized;
  // Aliases
  clientLessons[`medchem-${i}`] = sanitized;
  if (i === 1) clientLessons['1'] = sanitized;
}

// Read all 12 pharmacology
for (let i = 1; i <= 12; i++) {
  const filename = `lesson-${String(i).padStart(2, '0')}.json`;
  const raw = fs.readFileSync(path.join(pharmDir, filename), 'utf8');
  const sanitized = sanitizeLessonForClient(JSON.parse(raw));
  clientLessons[sanitized.id] = sanitized;
  // Aliases
  clientLessons[`pharmacology-${i}`] = sanitized;
  clientLessons[`pharm-${i}`] = sanitized;
}

const fileContent = `import type { LessonData } from '@pharmacy/platform';

/**
 * Production-ready sanitized client lesson database for 22 Free Lessons.
 * Zero unverified developer notes, numeric claim markers, or internal review tags.
 */
export const allClientLessons: Record<string, LessonData> = ${JSON.stringify(clientLessons, null, 2)} as unknown as Record<string, LessonData>;
`;

fs.writeFileSync(targetFile, fileContent, 'utf8');
console.log(`[CLIENT-GENERATOR] Successfully generated ${targetFile} with ${Object.keys(clientLessons).length} entries.`);

const lesson01File = path.join(REPO_ROOT, 'apps/web/src/data/lesson01.client.ts');
const lesson01Raw = fs.readFileSync(path.join(medchemDir, 'lesson-01.json'), 'utf8');
const lesson01Content = generateClientLesson(lesson01Raw);
fs.writeFileSync(lesson01File, lesson01Content, 'utf8');
console.log(`[CLIENT-GENERATOR] Successfully generated ${lesson01File}`);

