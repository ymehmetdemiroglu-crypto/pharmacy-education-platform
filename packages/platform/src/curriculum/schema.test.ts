import { describe, it, expect } from 'vitest';
import {
  LessonSchema,
  LessonStepSchema,
  TwelveStageLessonSchema,
  validate12StageSequence,
  wordCount,
  LESSON_STAGES,
  LessonStage,
} from './schema';

describe('Curriculum Schema & 12-Stage Concept Mastery Sequence', () => {
  const createMockStep = (
    stage: LessonStage,
    index: number,
    promptText: string | { tr: string; ar: string } = 'Valid concise prompt.'
  ) => ({
    id: `step-${index}`,
    stage,
    stageIndex: index,
    title: {
      tr: `Aşama ${index}`,
      ar: `المرحلة ${index}`,
    },
    prompt: promptText,
    predictThenReveal: stage === 'question' || stage === 'concept_check',
    config: {},
  });

  const valid12Steps = LESSON_STAGES.map((stage, idx) =>
    createMockStep(stage, idx + 1)
  );

  const valid12Lesson = {
    id: 'test-12-stage-les',
    courseId: 'medchem' as const,
    moduleId: 'mc-mod-01',
    title: {
      tr: 'Test Dersi',
      ar: 'درس تجريبي',
    },
    order: 1,
    access: 'free' as const,
    objective: {
      tr: 'Öğrenme hedefi',
      ar: 'هدف التعلم',
    },
    steps: valid12Steps,
    spacedReviewCards: [
      {
        cardId: 'card-1',
        courseId: 'medchem',
        drugOrConcept: 'Test Concept',
        prompt: 'Prompt',
        answer: 'Answer',
        box: 1 as const,
        intervalDays: 1,
      },
    ],
    misconceptions: [
      {
        tr: 'Yanılgı 1',
        ar: 'مغالطة 1',
      },
    ],
    sources: [{ file: 'lecture.pdf', page: 1 }],
    citations: [
      {
        id: 'cit-1',
        book: "Foye's",
        edition: '8th',
        topic: 'Chemistry',
      },
    ],
  };

  it('validates a complete 12-stage concept mastery lesson successfully', () => {
    const parseResult = LessonSchema.safeParse(valid12Lesson);
    expect(parseResult.success).toBe(true);

    const twelveStageResult = TwelveStageLessonSchema.safeParse(valid12Lesson);
    expect(twelveStageResult.success).toBe(true);
  });

  it('verifies the exact 12-stage sequence in validate12StageSequence', () => {
    expect(validate12StageSequence(valid12Steps)).toBe(true);

    // Sequence with fewer steps (e.g. 11 steps) must fail
    expect(validate12StageSequence(valid12Steps.slice(0, 11))).toBe(false);

    // Swapped steps (e.g. question before hook) must fail
    const swappedSteps = [...valid12Steps];
    const temp = swappedSteps[0]!;
    swappedSteps[0] = swappedSteps[1]!;
    swappedSteps[1] = temp;
    expect(validate12StageSequence(swappedSteps)).toBe(false);
  });

  it('rejects a 12-stage lesson if stages are out of order', () => {
    // Swap hook and question (step 0 and step 1) so sequence starts with question
    const outOfOrderSteps = [
      valid12Steps[1]!, // question (stageIndex: 2) at position 0
      valid12Steps[0]!, // hook (stageIndex: 1) at position 1
      ...valid12Steps.slice(2),
    ];

    const invalidLesson = {
      ...valid12Lesson,
      steps: outOfOrderSteps,
    };

    const result = LessonSchema.safeParse(invalidLesson);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) =>
          i.message.includes('12-stage lessons must strictly follow the 12-stage sequence')
        )
      ).toBe(true);
    }
  });

  it('rejects step when stageIndex does not correspond to stage order', () => {
    const mismatchedStep = {
      id: 'step-1',
      stage: 'question' as const, // question is stage 2
      stageIndex: 1, // Invalid: should be 2
      title: 'Question',
      prompt: 'Is this valid?',
    };

    const result = LessonStepSchema.safeParse(mismatchedStep);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain(
        'stageIndex must match 1-based index of stage'
      );
    }
  });

  describe('Cognitive Load Constraints (Prompt <= 40 Words)', () => {
    it('accepts prompts with exactly 40 words', () => {
      const fortyWords = Array(40).fill('word').join(' ');
      expect(wordCount(fortyWords)).toBe(40);

      const step = {
        id: 'step-test-40',
        stage: 'hook' as const,
        stageIndex: 1,
        title: 'Hook',
        prompt: fortyWords,
      };

      const result = LessonStepSchema.safeParse(step);
      expect(result.success).toBe(true);
    });

    it('rejects prompts with 41 words with descriptive cognitive overload error', () => {
      const fortyOneWords = Array(41).fill('word').join(' ');
      expect(wordCount(fortyOneWords)).toBe(41);

      const step = {
        id: 'step-test-41',
        stage: 'hook' as const,
        stageIndex: 1,
        title: 'Hook',
        prompt: fortyOneWords,
      };

      const result = LessonStepSchema.safeParse(step);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.message.includes('must not exceed 40 words'))).toBe(true);
      }
    });

    it('enforces <= 40 words constraint on bilingual prompts for both TR and AR', () => {
      const validBilingualPrompt = {
        tr: 'Bu bir klinik vaka sorusudur. İlacın etki mekanizmasını tahmin ediniz.',
        ar: 'هذه حالة سريرية. يرجى التنبؤ بآلية تأثير الدواء في الجسم بدقة.',
      };
      expect(wordCount(validBilingualPrompt.tr)).toBeLessThanOrEqual(40);
      expect(wordCount(validBilingualPrompt.ar)).toBeLessThanOrEqual(40);

      const stepValid = {
        id: 'step-bilingual',
        stage: 'hook' as const,
        stageIndex: 1,
        title: { tr: 'Başlık', ar: 'عنوان' },
        prompt: validBilingualPrompt,
      };
      expect(LessonStepSchema.safeParse(stepValid).success).toBe(true);

      // Overloaded Turkish prompt (41 words)
      const overloadedTrPrompt = {
        tr: Array(41).fill('kelime').join(' '),
        ar: 'قصيرة جدا',
      };
      const stepInvalidTr = {
        ...stepValid,
        prompt: overloadedTrPrompt,
      };
      expect(LessonStepSchema.safeParse(stepInvalidTr).success).toBe(false);

      // Overloaded Arabic prompt (41 words)
      const overloadedArPrompt = {
        tr: 'Kısa Türkçe metin.',
        ar: Array(41).fill('كلمة').join(' '),
      };
      const stepInvalidAr = {
        ...stepValid,
        prompt: overloadedArPrompt,
      };
      expect(LessonStepSchema.safeParse(stepInvalidAr).success).toBe(false);
    });
  });

  describe('Bilingual Content & Options Structure', () => {
    it('supports bilingual titles, prompts, options, and misconceptions', () => {
      const stepWithBilingualOptions = {
        id: 'step-concept-check',
        stage: 'concept_check' as const,
        stageIndex: 8,
        title: {
          tr: 'Kavram Kontrolü',
          ar: 'التحقق من المفهوم',
        },
        prompt: {
          tr: 'Aşağıdaki moleküllerden hangisi non-spesifik membran depresanıdır?',
          ar: 'أي من الجزيئات التالية يعتبر مثبطاً غير نوعي للأغشية؟',
        },
        conceptCheck: {
          options: [
            {
              id: 'opt-1',
              text: {
                tr: 'Dietil Eter',
                ar: 'ثنائي إيثيل الإيثر',
              },
              isCorrect: true,
              misconceptionFeedback: {
                tr: 'Doğru! Eter yüksek termodinamik aktivite ile etki eder.',
                ar: 'صحيح! الإيثر يعمل عند نشاط ديناميكي حراري مرتفع.',
              },
            },
            {
              id: 'opt-2',
              text: {
                tr: 'Propranolol',
                ar: 'بروبرانولول',
              },
              isCorrect: false,
              misconceptionFeedback: {
                tr: 'Yanlış. Propranolol stereoseçici beta blokerdir.',
                ar: 'خطأ. بروبرانولول حاصر بيتا نوعي فراغياً.',
              },
            },
          ],
        },
      };

      const result = LessonStepSchema.safeParse(stepWithBilingualOptions);
      expect(result.success).toBe(true);
    });
  });
});
