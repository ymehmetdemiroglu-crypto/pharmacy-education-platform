import { z } from 'zod';

// Canonical Turkish Pharmacy Trap Codes (Marmara, Hacettepe, Istanbul syllabi)
export const CanonicalTrapCodeSchema = z.enum([
  'TRAP-01-IONIZATION',
  'TRAP-02-POTENCY-EFFICACY',
  'TRAP-02-SPARE-RECEPTORS',
  'TRAP-03-ESTER-AMIDE',
  'TRAP-04-ADRENERGIC-INVERSION',
  'TRAP-05-BIOISOSTERE-LOGP',
  'TRAP-06-CIP-INVERSION',
  'TRAP-07-SCHILD-SLOPE',
  'TRAP-08-AChE-AGING',
  'TRAP-09-PRODRUG-CES1',
  'TRAP-10-GABA-PAM-VS-DIRECT'
]);
export type CanonicalTrapCode = z.infer<typeof CanonicalTrapCodeSchema>;

export const HighYieldFactorWeightsSchema = z.object({
  c_freq: z.number().min(0).max(3.0).describe('Past exam entity frequency match [0.0 - 3.0]'),
  e_emph: z.number().min(0).max(2.5).describe('Professor typography and layout emphasis [0.0 - 2.5]'),
  s_struct: z.number().min(0).max(2.0).describe('Chemical reactions & quantitative equations [0.0 - 2.0]'),
  m_cohort: z.number().min(0).max(2.5).describe('Cohort vulnerability / failure metric [0.0 - 2.5]'),
  gamma_cal: z.number().min(1.0).max(1.25).describe('Proximity multiplier for upcoming exam date [1.0 - 1.25]')
});
export type HighYieldFactorWeights = z.infer<typeof HighYieldFactorWeightsSchema>;

export const HighYieldSlideTierSchema = z.enum([
  'CRITICAL_TIER_1', // HYS >= 75 (Thermal Red)
  'SUPPORTING_TIER_2', // 45 <= HYS < 75 (Amber)
  'CONTEXT_TIER_3' // HYS < 45 (Cool Gray)
]);
export type HighYieldSlideTier = z.infer<typeof HighYieldSlideTierSchema>;

export const HighYieldSlideSchema = z.object({
  slideId: z.string(),
  courseId: z.enum(['medchem', 'pharmacology']),
  facultySlug: z.string().min(2),
  lectureDeckId: z.string(),
  slideNumber: z.number().int().positive(),
  title: z.string(),
  conceptSummary: z.string(),
  highYieldScore: z.number().int().min(0).max(100),
  tier: HighYieldSlideTierSchema,
  rawFactors: HighYieldFactorWeightsSchema,
  linkedTrapCodes: z.array(CanonicalTrapCodeSchema),
  boundingSpotlight: z.object({
    xNorm: z.number().min(0).max(1),
    yNorm: z.number().min(0).max(1),
    wNorm: z.number().min(0).max(1),
    hNorm: z.number().min(0).max(1)
  }).optional(),
  predictPrompt: z.string().max(250),
  examQuestionSnippet: z.string().max(300),
  cramQuestion: z.object({
    questionPrompt: z.string().max(250),
    options: z.array(z.object({
      id: z.string(),
      text: z.string().max(160),
      isCorrect: z.boolean(),
      misconceptionDiagnosed: CanonicalTrapCodeSchema.optional()
    })).min(2).max(4),
    hintLadder: z.tuple([
      z.string().max(150),
      z.string().max(150),
      z.string().max(200)
    ]),
    diagnosticVerdict: z.string()
  }),
  updatedAt: z.string().datetime()
});
export type HighYieldSlide = z.infer<typeof HighYieldSlideSchema>;

export const VizeTriageSessionSchema = z.object({
  sessionId: z.string(),
  userId: z.string(),
  courseId: z.enum(['medchem', 'pharmacology']),
  facultySlug: z.string(),
  totalSlidesEvaluated: z.number().int().positive(),
  highYieldSlidesSelected: z.number().int().positive(),
  completedStepIndices: z.array(z.number().int()),
  masteredSlideIds: z.array(z.string()),
  failedTrapCodes: z.array(CanonicalTrapCodeSchema),
  startedAt: z.string().datetime(),
  completedAt: z.string().datetime().optional()
});
export type VizeTriageSession = z.infer<typeof VizeTriageSessionSchema>;
