import { z } from 'zod';

export const EassonStedmanConfigSchema = z.object({
  drugName: z.string().default('Propranolol'),
  eutomerName: z.string().default('(S)-propranolol'),
  distomerName: z.string().default('(R)-propranolol'),
  initialEnantiomer: z.enum(['eutomer', 'distomer']).default('eutomer'),
  targetReceptor: z.string().default('β1-Adrenerjik Reseptör'),
  deltaGEutomer: z.number().default(-11.5), // kcal/mol
  deltaGDistomer: z.number().default(-8.5), // kcal/mol
  equationRef: z.string().default('Easson & Stedman (1933); Goodman & Gilman 14th ed. Ch. 3; İlaçlarda İzomeri.pdf Slayt 25, 28'),
});

export type EassonStedmanConfig = z.infer<typeof EassonStedmanConfigSchema>;
