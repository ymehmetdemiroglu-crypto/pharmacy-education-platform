import { z } from 'zod';
import { CanonicalTrapCodeSchema } from './vizeTriage.types';

export const DetectedWidgetTypeSchema = z.enum([
  'IonizationChamber',
  'DoseResponseCurve',
  'SarExplorer',
  'ReceptorOperationalModel',
  'DualModeMoleculeViewer',
  'ReceptorLigandMatcher'
]);
export type DetectedWidgetType = z.infer<typeof DetectedWidgetTypeSchema>;

export const ExtractedEntityChipSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.enum([
    'pka',
    'ph',
    'kd',
    'ec50',
    'emax',
    'functional_group',
    'scaffold',
    'trap'
  ]),
  value: z.union([z.string(), z.number()]),
  confidence: z.number().min(0).max(1).default(0.95),
  boundingBox: z
    .object({
      x: z.number(),
      y: z.number(),
      width: z.number(),
      height: z.number()
    })
    .optional()
});
export type ExtractedEntityChip = z.infer<typeof ExtractedEntityChipSchema>;

export const DetectedWidgetConfigSchema = z.object({
  type: DetectedWidgetTypeSchema,
  title: z.string(),
  description: z.string(),
  props: z.record(z.any())
});
export type DetectedWidgetConfig = z.infer<typeof DetectedWidgetConfigSchema>;

export const ReanimatedQuizOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  isCorrect: z.boolean(),
  diagnosticFeedback: z.string(),
  trapCode: CanonicalTrapCodeSchema.optional()
});
export type ReanimatedQuizOption = z.infer<typeof ReanimatedQuizOptionSchema>;

export const ReanimatedQuizChallengeSchema = z.object({
  id: z.string(),
  question: z.string(),
  hypothesisPrompt: z.string(),
  options: z.array(ReanimatedQuizOptionSchema).length(4),
  hintLadder: z.tuple([z.string(), z.string(), z.string()]), // [Nudge, Clue, Solution]
  slideProvenance: z.string()
});
export type ReanimatedQuizChallenge = z.infer<typeof ReanimatedQuizChallengeSchema>;

export const AnkiCardPayloadSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  hintLadder: z.tuple([z.string(), z.string(), z.string()]),
  examTrapWarning: z.string(),
  tags: z.array(z.string()),
  slideCitation: z.string()
});
export type AnkiCardPayload = z.infer<typeof AnkiCardPayloadSchema>;

export const ReanimatedSlideSchema = z.object({
  id: z.string(),
  title: z.string(),
  courseId: z.enum(['medchem', 'pharmacology']),
  facultyName: z.string(),
  deckName: z.string(),
  pageNumber: z.number().int().positive(),
  imageUrl: z.string().optional(),
  extractedRawText: z.string(),
  entities: z.array(ExtractedEntityChipSchema),
  widgetConfig: DetectedWidgetConfigSchema,
  challenge: ReanimatedQuizChallengeSchema,
  ankiCards: z.array(AnkiCardPayloadSchema),
  storageUrl: z.string().optional(),
  uploadedAt: z.string()
});
export type ReanimatedSlide = z.infer<typeof ReanimatedSlideSchema>;
