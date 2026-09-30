import { z } from 'zod';
import { maxWords } from '../types';

export const MembranePartitionConfigSchema = z.object({
  title: z.string().optional(),
  prompt: maxWords(40).optional(),
  defaultLogP: z.number().min(-3).max(7).default(2.5),
  defaultPka: z.number().min(1).max(12).default(4.0),
  defaultPh: z.number().min(1).max(14).default(7.4),
  defaultCompoundType: z.enum(['acid', 'base', 'neutral']).default('acid'),
  locale: z.enum(['tr', 'ar']).default('tr'),
  source: z
    .object({
      file: z.string(),
      page: z.union([z.string(), z.number()]),
    })
    .optional(),
  explanation: z.string().optional(),
});

export type MembranePartitionConfig = z.infer<typeof MembranePartitionConfigSchema>;
