import { z } from 'zod';

export const SubstituentOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  structureSnippet: z.string(),
  deltaLogP: z.number(),
  deltaPka: z.number(),
  affinityMultiplier: z.number(), // >1 increases affinity, <1 decreases
  toxicityRisk: z.enum(['low', 'moderate', 'high']).default('low'),
});

export const SubstitutionPositionSchema = z.object({
  positionName: z.string(), // e.g. "R1 (Para position)", "R2 (Amine substitution)"
  options: z.array(SubstituentOptionSchema).min(2),
  defaultOptionId: z.string(),
});

export const SarExplorerConfigSchema = z.object({
  scaffoldName: z.string(),
  scaffoldDescription: z.string(),
  baseLogP: z.number(),
  basePka: z.number(),
  baseAffinityNm: z.number(),
  positions: z.array(SubstitutionPositionSchema).min(1).max(3),
  targetGoal: z.object({
    description: z.string(),
    minLogP: z.number().optional(),
    maxLogP: z.number().optional(),
    maxAffinityNm: z.number().optional(),
    targetOptionIds: z.array(z.string()),
  }),
  explanation: z.string(),
  source: z.object({
    file: z.string(),
    page: z.union([z.string(), z.number()]),
  }),
});

export type SubstituentOption = z.infer<typeof SubstituentOptionSchema>;
export type SubstitutionPosition = z.infer<typeof SubstitutionPositionSchema>;
export type SarExplorerConfig = z.infer<typeof SarExplorerConfigSchema>;
