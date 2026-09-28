import { z } from 'zod';

export const MoleculeAtomSchema = z.object({
  id: z.string(),
  label: z.string(),
  x: z.number(),
  y: z.number(),
  isTarget: z.boolean(),
  hintName: z.string().optional(),
});

export const MoleculeBondSchema = z.object({
  from: z.string(),
  to: z.string(),
  order: z.enum(['single', 'double', 'triple', 'aromatic']).default('single'),
});

export const StructureIdentifierConfigSchema = z.object({
  title: z.string(),
  prompt: z.string().max(240),
  moleculeName: z.string(),
  smiles: z.string(),
  atoms: z.array(MoleculeAtomSchema).min(3),
  bonds: z.array(MoleculeBondSchema).min(2),
  targetDescription: z.string(),
  explanation: z.string(),
  source: z.object({
    file: z.string(),
    page: z.union([z.string(), z.number()]),
  }),
});

export type MoleculeAtom = z.infer<typeof MoleculeAtomSchema>;
export type MoleculeBond = z.infer<typeof MoleculeBondSchema>;
export type StructureIdentifierConfig = z.infer<typeof StructureIdentifierConfigSchema>;
