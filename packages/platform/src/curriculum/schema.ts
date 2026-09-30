import { z } from 'zod';

export const wordCount = (text: string): number => {
  return text.trim().split(/\s+/).filter(Boolean).length;
};

export const maxWords = (limit: number = 40) =>
  z.string().refine(
    (val) => wordCount(val) <= limit,
    { message: `Prompt must not exceed ${limit} words` }
  );

export const BilingualTextSchema = z.object({
  tr: z.string(),
  ar: z.string(),
});
export type BilingualText = z.infer<typeof BilingualTextSchema>;

export const BilingualPromptSchema = z.object({
  tr: z.string().refine((val) => wordCount(val) <= 40, {
    message: 'Prompt (tr) must not exceed 40 words',
  }),
  ar: z.string().refine((val) => wordCount(val) <= 40, {
    message: 'Prompt (ar) must not exceed 40 words',
  }),
});
export type BilingualPrompt = z.infer<typeof BilingualPromptSchema>;

export const PromptSchema = z.union([
  maxWords(40),
  BilingualPromptSchema,
]);

export const TitleSchema = z.union([
  z.string(),
  BilingualTextSchema,
]);

export const OptionSchema = z.object({
  id: z.string(),
  text: z.union([z.string(), BilingualTextSchema]),
  isCorrect: z.boolean(),
  misconceptionFeedback: z.union([z.string(), BilingualTextSchema]).optional(),
  feedback: z.union([z.string(), BilingualTextSchema]).optional(),
});
export type Option = z.infer<typeof OptionSchema>;

export const StepCitationSchema = z.object({
  id: z.string(),
  book: z.string(),
  edition: z.string(),
  topic: z.string(),
  chapter: z.string().optional(), // Must be "unverified" if not directly confirmed
  page: z.union([z.string(), z.number()]).optional(),
  status: z.enum(['unverified', 'verified', 'pending-human-review']).optional(),
});

export const NumericClaimSchema = z.object({
  id: z.string(),
  parameter: z.string(),
  value: z.union([z.string(), z.number()]),
  status: z.enum(['pending-human-review', 'verified']),
  referencePassage: z.string().optional(),
});

export const StepSourceSchema = z.object({
  file: z.string(),
  page: z.union([z.string(), z.number()]),
});

export const LESSON_STAGES = [
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
] as const;

export type LessonStage = (typeof LESSON_STAGES)[number];
export const LessonStageSchema = z.enum(LESSON_STAGES);

export const StepTypeSchema = z.enum([
  'predict_reveal',
  'sar_explorer',
  'structure_identifier',
  'dose_response_curve',
  'pk_simulator',
  'receptor_ligand_matcher',
  'mechanism_pathway',
  'drug_class_sorter',
  'metabolism_map',
  'worked_example_fading',
  'clinical_vignette',
  'concept_checkpoint',
  'recap',
  // 12-stage concept mastery sequence
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
]);

export const StepFeedbackSchema = z.object({
  correct: z.union([z.string(), BilingualTextSchema]),
  incorrect: z.union([z.string(), BilingualTextSchema]),
  misconceptions: z.record(z.union([z.string(), BilingualTextSchema])).optional(),
});

export const LessonStepSchema = z.object({
  id: z.string(),
  type: StepTypeSchema.optional(),
  stage: LessonStageSchema.optional(),
  stageIndex: z.number().int().min(1).max(12).optional(),
  title: TitleSchema,
  prompt: PromptSchema,
  predictThenReveal: z.boolean().default(false),
  widgetType: z.string().optional(),
  widget: z
    .object({
      type: z.string(),
      config: z.record(z.unknown()).default({}),
    })
    .optional(),
  config: z.record(z.unknown()).default({}),
  conceptCheck: z
    .object({
      options: z.array(OptionSchema),
    })
    .optional(),
  technicalTerms: z
    .array(
      z.object({
        term: z.string(),
        arContext: z.string(),
      })
    )
    .optional(),
  hints: z
    .tuple([
      z.union([z.string(), BilingualTextSchema]),
      z.union([z.string(), BilingualTextSchema]),
      z.union([z.string(), BilingualTextSchema]),
    ])
    .optional(),
  feedback: StepFeedbackSchema.optional(),
  sources: z.array(StepSourceSchema).optional().default([]),
  citations: z.array(StepCitationSchema).optional(),
  numericClaims: z.array(NumericClaimSchema).optional(),
  verified: z.boolean().default(false),
}).refine(
  (step) => step.type !== undefined || step.stage !== undefined,
  {
    message: 'Step must specify either type or stage',
  }
).refine(
  (step) => {
    if (step.stage && step.stageIndex !== undefined) {
      const expectedIndex = LESSON_STAGES.indexOf(step.stage) + 1;
      return step.stageIndex === expectedIndex;
    }
    return true;
  },
  {
    message: 'stageIndex must match 1-based index of stage in 12-stage sequence',
  }
);

export function validate12StageSequence(
  steps: Array<{
    stage?: LessonStage | string | undefined;
    type?: StepType | string | undefined;
    stageIndex?: number | undefined;
  }>
): boolean {
  if (steps.length !== 12) return false;
  return steps.every((step, idx) => {
    const expectedStage = LESSON_STAGES[idx];
    const actualStage = step.stage ?? step.type;
    const matchesStage = actualStage === expectedStage;
    const matchesIndex = step.stageIndex === undefined || step.stageIndex === idx + 1;
    return matchesStage && matchesIndex;
  });
}

export const SpacedReviewCardSeedSchema = z.object({
  cardId: z.string(),
  courseId: z.string(),
  drugOrConcept: z.string(),
  prompt: z.string(),
  answer: z.string(),
  box: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]).default(1),
  intervalDays: z.number().default(1),
  status: z.enum(['pending-human-review', 'verified', 'unverified']).optional(),
});

export const LessonSchema = z.object({
  id: z.string(),
  courseId: z.enum(['medchem', 'pharmacology']),
  moduleId: z.string(),
  title: TitleSchema,
  order: z.number().int().positive(),
  access: z.enum(['free', 'paid']),
  objective: z.union([z.string(), BilingualTextSchema]),
  steps: z.array(LessonStepSchema).min(8).max(15),
  spacedReviewCards: z.array(SpacedReviewCardSeedSchema).min(1),
  misconceptions: z.array(z.union([z.string(), BilingualTextSchema])),
  sources: z.array(StepSourceSchema).min(1),
  citations: z.array(StepCitationSchema).min(1),
  numericClaims: z.array(NumericClaimSchema).optional(),
  translations: z.record(z.unknown()).optional(),
}).refine(
  (lesson) => {
    const isTwelveStage =
      lesson.steps.length === 12 ||
      lesson.steps.some((s) => s.stage !== undefined) ||
      (lesson.steps[0] && (lesson.steps[0].stage === 'hook' || lesson.steps[0].type === 'hook'));

    if (isTwelveStage) {
      return validate12StageSequence(lesson.steps);
    }
    return true;
  },
  {
    message:
      '12-stage lessons must strictly follow the 12-stage sequence: hook, question, intuition, visual_explanation, interactive_artifact, guided_discovery, formal_explanation, concept_check, application, retrieval, connection, mastery_check',
  }
);

export const TwelveStageLessonSchema = LessonSchema.refine(
  (lesson) => lesson.steps.length === 12 && validate12StageSequence(lesson.steps),
  {
    message: 'Lesson must contain exactly 12 steps matching the 12-stage mastery sequence',
  }
);

export type StepCitation = z.infer<typeof StepCitationSchema>;
export type NumericClaim = z.infer<typeof NumericClaimSchema>;
export type StepSource = z.infer<typeof StepSourceSchema>;
export type StepType = z.infer<typeof StepTypeSchema>;
export type StepFeedback = z.infer<typeof StepFeedbackSchema>;
export type LessonStep = z.infer<typeof LessonStepSchema>;
export type SpacedReviewCardSeed = z.infer<typeof SpacedReviewCardSeedSchema>;
export type LessonData = z.infer<typeof LessonSchema>;
export type TwelveStageLessonData = z.infer<typeof TwelveStageLessonSchema>;
