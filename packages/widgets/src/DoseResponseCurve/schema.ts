import { z } from 'zod';

export const DoseResponseCurveConfigSchema = z.object({
  title: z.string(),
  prompt: z.string().max(240),
  defaultEc50: z.number().positive(),
  defaultEmax: z.number().min(1).max(100),
  defaultHillSlope: z.number().default(1.0),
  modes: z.array(z.enum(['agonist', 'partial_agonist', 'competitive_antagonist', 'noncompetitive_antagonist'])).min(2),
  source: z.object({
    file: z.string(),
    page: z.union([z.string(), z.number()]),
  }),
  explanation: z.string(),
});

export type DoseResponseCurveConfig = z.infer<typeof DoseResponseCurveConfigSchema>;
