import { z } from 'zod';
import { maxWords } from '../types';

export const IonizationEquilibriumConfigSchema = z.object({
  title: z.string().optional(),
  prompt: maxWords(40).optional(),
  drugName: z.string().optional(),
  defaultPka: z.number().min(1.0).max(12.0).default(3.5),
  defaultPh: z.number().min(1.0).max(14.0).default(7.4),
  defaultDrugType: z.enum(['acid', 'base']).default('acid'),
  locale: z.enum(['tr', 'ar']).default('tr'),
  showBioGradients: z.boolean().default(true),
  source: z
    .object({
      file: z.string(),
      page: z.union([z.string(), z.number()]),
    })
    .optional(),
  explanation: z.string().optional(),
});

export type IonizationEquilibriumConfig = z.infer<typeof IonizationEquilibriumConfigSchema>;
