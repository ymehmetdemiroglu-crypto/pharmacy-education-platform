import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import {
  TwelveStageLessonSchema,
  validate12StageSequence,
  wordCount,
  LESSON_STAGES,
} from './schema';

describe('22 Permanently Free Lessons Curriculum Authoring Audit', () => {
  const repoRoot = path.resolve(__dirname, '../../../../');
  const medchemDir = path.join(repoRoot, 'courses', 'medchem', 'lessons');
  const pharmDir = path.join(repoRoot, 'courses', 'pharmacology', 'lessons');

  // Load all 10 Medchem lessons
  const medchemLessons: any[] = [];
  for (let i = 1; i <= 10; i++) {
    const filename = `lesson-${String(i).padStart(2, '0')}.json`;
    const fullPath = path.join(medchemDir, filename);
    expect(fs.existsSync(fullPath), `Medchem lesson file ${filename} must exist`).toBe(true);
    const raw = fs.readFileSync(fullPath, 'utf8');
    medchemLessons.push({ filename, data: JSON.parse(raw) });
  }

  // Load all 12 Pharmacology lessons
  const pharmacologyLessons: any[] = [];
  for (let i = 1; i <= 12; i++) {
    const filename = `lesson-${String(i).padStart(2, '0')}.json`;
    const fullPath = path.join(pharmDir, filename);
    expect(fs.existsSync(fullPath), `Pharmacology lesson file ${filename} must exist`).toBe(true);
    const raw = fs.readFileSync(fullPath, 'utf8');
    pharmacologyLessons.push({ filename, data: JSON.parse(raw) });
  }

  const all22Lessons = [...medchemLessons, ...pharmacologyLessons];

  it('contains exactly 22 authored lessons (10 Medchem + 12 Pharmacology)', () => {
    expect(medchemLessons.length).toBe(10);
    expect(pharmacologyLessons.length).toBe(12);
    expect(all22Lessons.length).toBe(22);
  });

  it('validates every lesson against TwelveStageLessonSchema', () => {
    all22Lessons.forEach(({ filename, data }) => {
      const result = TwelveStageLessonSchema.safeParse(data);
      if (!result.success) {
        console.error(`Validation failed for ${filename}:`, JSON.stringify(result.error.format(), null, 2));
      }
      expect(result.success, `Lesson ${filename} (${data.id}) must satisfy TwelveStageLessonSchema`).toBe(true);
    });
  });

  it('strictly adheres to the canonical 12-stage concept mastery sequence', () => {
    all22Lessons.forEach(({ filename, data }) => {
      expect(data.steps.length, `Lesson ${filename} must contain exactly 12 steps`).toBe(12);
      expect(validate12StageSequence(data.steps), `Lesson ${filename} must satisfy validate12StageSequence`).toBe(true);

      data.steps.forEach((step: any, idx: number) => {
        const expectedStage = LESSON_STAGES[idx];
        const actualStage = step.stage || step.type;
        expect(actualStage, `Lesson ${filename} step ${idx + 1} must match stage ${expectedStage}`).toBe(expectedStage);
      });
    });
  });

  it('strictly enforces prompt word count <= 40 in Turkish and Arabic across all 264 steps', () => {
    let totalStepsAudited = 0;
    all22Lessons.forEach(({ filename, data }) => {
      data.steps.forEach((step: any, idx: number) => {
        totalStepsAudited++;
        const trPrompt = typeof step.prompt === 'string' ? step.prompt : step.prompt?.tr;
        const arPrompt = typeof step.prompt === 'string' ? '' : step.prompt?.ar;

        expect(trPrompt, `Lesson ${filename} step ${idx + 1} missing Turkish prompt`).toBeTruthy();
        const trWords = wordCount(trPrompt);
        expect(
          trWords,
          `Lesson ${filename} step ${idx + 1} (${step.id}) TR prompt exceeds 40 words (${trWords} words):\n"${trPrompt}"`
        ).toBeLessThanOrEqual(40);

        if (arPrompt) {
          const arWords = wordCount(arPrompt);
          expect(
            arWords,
            `Lesson ${filename} step ${idx + 1} (${step.id}) AR prompt exceeds 40 words (${arWords} words):\n"${arPrompt}"`
          ).toBeLessThanOrEqual(40);
        }
      });
    });
    expect(totalStepsAudited).toBe(22 * 12); // Exactly 264 authored steps
  });

  it('pairs every lesson with an interactive biophysical or pharmacological widget in Stage 5', () => {
    const validWidgetTypes = new Set([
      'ThermodynamicActivityFergusonSlider',
      'IonizationEquilibriumSlider',
      'IonizationChamber',
      'SarExplorer',
      'ReceptorLigandMatcher',
      'StructureIdentifier',
      'MetabolismMap',
      'DoseResponseCurve',
      'PkSimulator',
    ]);

    all22Lessons.forEach(({ filename, data }) => {
      const stage5 = data.steps[4];
      expect(stage5.stage || stage5.type).toBe('interactive_artifact');

      const widgetType =
        stage5.widgetType ||
        stage5.widget?.type ||
        stage5.interactiveWidget ||
        stage5.widgetConfig?.type;

      expect(widgetType, `Lesson ${filename} Stage 5 must define a widget type`).toBeTruthy();
      expect(validWidgetTypes.has(widgetType), `Lesson ${filename} has unexpected widget type ${widgetType}`).toBe(true);
    });
  });

  it('strictly enforces Turkish academic naming standards and zero occurrences of forbidden terms in learner content', () => {
    // Check Medchem course config title
    const medchemConfigPath = path.join(repoRoot, 'courses', 'medchem', 'course.config.json');
    if (fs.existsSync(medchemConfigPath)) {
      const config = JSON.parse(fs.readFileSync(medchemConfigPath, 'utf8'));
      expect(config.title).toBe('Farmasötik Kimya');
      expect(config.title).not.toContain('Medisinal Kimya');
    }

    all22Lessons.forEach(({ filename, data }) => {
      const titleTr = typeof data.title === 'string' ? data.title : data.title.tr;
      const objTr = typeof data.objective === 'string' ? data.objective : data.objective.tr;
      expect(titleTr, `Lesson ${filename} title must not use 'Medisinal Kimya'`).not.toContain('Medisinal Kimya');
      expect(objTr, `Lesson ${filename} objective must not use 'Medisinal Kimya'`).not.toContain('Medisinal Kimya');

      data.steps.forEach((step: any, idx: number) => {
        const stepTitleTr = typeof step.title === 'string' ? step.title : step.title?.tr;
        const promptTr = typeof step.prompt === 'string' ? step.prompt : step.prompt?.tr;
        if (stepTitleTr) {
          expect(stepTitleTr, `Lesson ${filename} step ${idx + 1} title must not use 'Medisinal Kimya'`).not.toContain('Medisinal Kimya');
        }
        if (promptTr) {
          expect(promptTr, `Lesson ${filename} step ${idx + 1} prompt must not use 'Medisinal Kimya'`).not.toContain('Medisinal Kimya');
        }
      });
    });
  });

  it('enforces The Special Arabic Rule with Turkish canonical technical terms', () => {
    all22Lessons.forEach(({ filename, data }) => {
      data.steps.forEach((step: any, idx: number) => {
        // Arabic prompt must exist
        const arPrompt = typeof step.prompt === 'string' ? '' : step.prompt?.ar;
        expect(arPrompt, `Lesson ${filename} step ${idx + 1} must have Arabic prompt`).toBeTruthy();

        // Technical terms list must be populated
        expect(Array.isArray(step.technicalTerms), `Lesson ${filename} step ${idx + 1} must define technicalTerms array`).toBe(true);
        expect(step.technicalTerms.length, `Lesson ${filename} step ${idx + 1} must have at least 1 technical term`).toBeGreaterThanOrEqual(1);

        step.technicalTerms.forEach((tt: any) => {
          expect(tt.term, `Technical term must have Turkish canonical name`).toBeTruthy();
          expect(tt.arContext, `Technical term must define Arabic context`).toBeTruthy();
        });
      });
    });
  });

  it('enforces spaced retrieval seeds for long-term retention', () => {
    all22Lessons.forEach(({ filename, data }) => {
      expect(Array.isArray(data.spacedReviewCards), `Lesson ${filename} must have spacedReviewCards`).toBe(true);
      expect(data.spacedReviewCards.length, `Lesson ${filename} must have at least 2 review cards`).toBeGreaterThanOrEqual(2);

      data.spacedReviewCards.forEach((card: any, cIdx: number) => {
        expect(card.cardId, `Card ${cIdx} in ${filename} must have cardId`).toBeTruthy();
        expect(card.box).toBe(1);
        expect(card.intervalDays).toBeGreaterThanOrEqual(1);
        expect(card.prompt, `Card ${cIdx} in ${filename} must have prompt`).toBeTruthy();
        expect(card.answer, `Card ${cIdx} in ${filename} must have answer`).toBeTruthy();
      });
    });
  });
});
