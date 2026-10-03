import { z } from 'zod';
import { maxWords } from '../types';

export const PredictOptionSchema = z.object({
  id: z.string(),
  label: z.string().max(120),
  isCorrect: z.boolean(),
  misconceptionFeedback: z.string().optional(),
});

export const PredictThenRevealConfigSchema = z.object({
  prompt: maxWords(40),
  scenarioDescription: z.string(),
  options: z.array(PredictOptionSchema).min(2).max(4),
  revealedOutcome: z.string(),
  explanation: z.string(),
  source: z.object({
    file: z.string(),
    page: z.union([z.string(), z.number()]),
  }),
});

export type PredictOption = z.infer<typeof PredictOptionSchema>;
export type PredictThenRevealConfig = z.infer<typeof PredictThenRevealConfigSchema>;
