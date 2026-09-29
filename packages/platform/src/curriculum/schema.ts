import { z } from 'zod';

export const wordCount = (text: string): number => {
  return text.trim().split(/\s+/).filter(Boolean).length;
};

export const maxWords = (limit: number = 40) =>
  z.string().refine(
    (val) => wordCount(val) <= limit,
    { message: `Prompt must not exceed ${limit} words` }
  );

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
]);

export const StepFeedbackSchema = z.object({
  correct: z.string(),
  incorrect: z.string(),
  misconceptions: z.record(z.string()).optional(),
});

export const LessonStepSchema = z.object({
  id: z.string(),
  type: StepTypeSchema,
  title: z.string(),
  prompt: maxWords(40),
  predictThenReveal: z.boolean().default(false),
  widgetType: z.string().optional(),
  config: z.record(z.unknown()),
  hints: z.tuple([z.string(), z.string(), z.string()]), // Exactly 3 hints (Tier 1 Nudge, Tier 2 Clue, Tier 3 Solution)
  feedback: StepFeedbackSchema,
  sources: z.array(StepSourceSchema).min(1),
  citations: z.array(StepCitationSchema).optional(),
  numericClaims: z.array(NumericClaimSchema).optional(),
  verified: z.boolean().default(false),
});

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
  title: z.string(),
  order: z.number().int().positive(),
  access: z.enum(['free', 'paid']),
  objective: z.string(),
  steps: z.array(LessonStepSchema).min(8).max(15),
  spacedReviewCards: z.array(SpacedReviewCardSeedSchema).min(1),
  misconceptions: z.array(z.string()),
  sources: z.array(StepSourceSchema).min(1),
  citations: z.array(StepCitationSchema).min(1),
  numericClaims: z.array(NumericClaimSchema).optional(),
  translations: z
    .record(
      z.object({
        title: z.string(),
        objective: z.string(),
        steps: z
          .array(
            z.object({
              title: z.string(),
              prompt: z.string(),
              hints: z.array(z.string()).optional(),
              feedback: z
                .object({
                  correct: z.string(),
                  incorrect: z.string(),
                })
                .optional(),
            })
          )
          .optional(),
      })
    )
    .optional(),
});

export type StepCitation = z.infer<typeof StepCitationSchema>;
export type NumericClaim = z.infer<typeof NumericClaimSchema>;
export type StepSource = z.infer<typeof StepSourceSchema>;
export type StepType = z.infer<typeof StepTypeSchema>;
export type StepFeedback = z.infer<typeof StepFeedbackSchema>;
export type LessonStep = z.infer<typeof LessonStepSchema>;
export type SpacedReviewCardSeed = z.infer<typeof SpacedReviewCardSeedSchema>;
export type LessonData = z.infer<typeof LessonSchema>;
