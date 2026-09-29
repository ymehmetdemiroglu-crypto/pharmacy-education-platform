import { z } from 'zod';
import { maxWords } from '../types';

export const McqOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  isCorrect: z.boolean(),
  distractorRationale: z.string().optional(),
});

export const MultipleChoiceConfigSchema = z.object({
  prompt: maxWords(40),
  options: z.array(McqOptionSchema).min(2).max(5),
  isMultiSelect: z.boolean().default(false),
  explanation: z.string(),
  source: z.object({
    file: z.string(),
    page: z.union([z.string(), z.number()]),
  }),
});

export type McqOption = z.infer<typeof McqOptionSchema>;
export type MultipleChoiceConfig = z.infer<typeof MultipleChoiceConfigSchema>;
