import { z } from 'zod';
import { maxWords } from '../types';

export const MetabolicSiteSchema = z.object({
  id: z.string(),
  label: z.string(),
  x: z.number(),
  y: z.number(),
  enzyme: z.string(),
  phase: z.enum(['Phase I', 'Phase II']),
  reactionType: z.string(),
  metaboliteOutcome: z.string(),
  toxicityFlag: z.enum(['non_toxic', 'toxic', 'active_metabolite']),
  isTargetSite: z.boolean(),
});

export const MetabolismMapConfigSchema = z.object({
  drugName: z.string(),
  prompt: maxWords(40),
  moleculeSvgDescription: z.string(),
  sites: z.array(MetabolicSiteSchema).min(2),
  source: z.object({
    file: z.string(),
    page: z.union([z.string(), z.number()]),
  }),
  explanation: z.string(),
});

export type MetabolicSite = z.infer<typeof MetabolicSiteSchema>;
export type MetabolismMapConfig = z.infer<typeof MetabolismMapConfigSchema>;
