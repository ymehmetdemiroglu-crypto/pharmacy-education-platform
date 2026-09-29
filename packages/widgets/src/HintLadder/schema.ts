import { z } from 'zod';
import { maxWords } from '../types';

export const HintLadderConfigSchema = z.object({
  stepPrompt: maxWords(40),
  hints: z.array(z.string()).min(1).max(3),
  source: z.object({
    file: z.string(),
    page: z.union([z.string(), z.number()]),
  }),
});

export type HintLadderConfig = z.infer<typeof HintLadderConfigSchema>;
