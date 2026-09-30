import { z } from 'zod';
import { maxWords } from '../types';

export const ThermodynamicActivityFergusonConfigSchema = z.object({
  title: z.string().optional(),
  prompt: maxWords(40).optional(),
  defaultMode: z.enum(['vapor', 'solution']).default('vapor'),
  defaultAgent: z.string().default('ether'),
  locale: z.enum(['tr', 'ar']).default('tr'),
  source: z
    .object({
      file: z.string(),
      page: z.union([z.string(), z.number()]),
    })
    .optional(),
  explanation: z.string().optional(),
});

export type ThermodynamicActivityFergusonConfig = z.infer<
  typeof ThermodynamicActivityFergusonConfigSchema
>;
