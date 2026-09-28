import { z } from 'zod';

export const HintLadderConfigSchema = z.object({
  stepPrompt: z.string().max(240),
  hints: z.array(z.string()).min(1).max(3),
  source: z.object({
    file: z.string(),
    page: z.union([z.string(), z.number()]),
  }),
});

export type HintLadderConfig = z.infer<typeof HintLadderConfigSchema>;
