import { z } from 'zod';

export const McqOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  isCorrect: z.boolean(),
  distractorRationale: z.string().optional(),
});

export const MultipleChoiceConfigSchema = z.object({
  prompt: z.string().max(240),
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
