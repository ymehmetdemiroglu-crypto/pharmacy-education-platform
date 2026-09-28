import { z } from 'zod';

export const MatchPairSchema = z.object({
  id: z.string(),
  drugGroup: z.string(),
  correctResidueId: z.string(),
  bondType: z.enum(['ionic', 'h_bond', 'pi_pi', 'van_der_waals', 'covalent']),
  energyKcalMol: z.string(),
  explanation: z.string(),
});

export const ReceptorResidueSchema = z.object({
  id: z.string(),
  residueName: z.string(), // e.g. "Asp113", "Ser204", "Phe290"
  description: z.string(),
});

export const ReceptorLigandMatcherConfigSchema = z.object({
  title: z.string(),
  prompt: z.string().max(240),
  drugName: z.string(),
  receptorName: z.string(),
  pairs: z.array(MatchPairSchema).min(2).max(4),
  residues: z.array(ReceptorResidueSchema).min(3).max(6),
  source: z.object({
    file: z.string(),
    page: z.union([z.string(), z.number()]),
  }),
});

export type MatchPair = z.infer<typeof MatchPairSchema>;
export type ReceptorResidue = z.infer<typeof ReceptorResidueSchema>;
export type ReceptorLigandMatcherConfig = z.infer<typeof ReceptorLigandMatcherConfigSchema>;
