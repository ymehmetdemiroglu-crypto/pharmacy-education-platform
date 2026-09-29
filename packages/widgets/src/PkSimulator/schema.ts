import { z } from 'zod';
import { maxWords } from '../types';

export const PkSimulatorConfigSchema = z.object({
  drugName: z.string(),
  prompt: maxWords(40),
  defaultDoseMg: z.number().positive(),
  defaultClearanceLHr: z.number().positive(),
  defaultVdL: z.number().positive(),
  defaultBioavailabilityF: z.number().min(0.01).max(1.0).default(1.0),
  defaultKa: z.number().positive().default(1.5), // 1/hr
  therapeuticWindow: z.tuple([z.number(), z.number()]), // [min, max] mg/L
  routes: z.array(z.enum(['iv_bolus', 'oral'])).default(['iv_bolus', 'oral']),
  source: z.object({
    file: z.string(),
    page: z.union([z.string(), z.number()]),
  }),
  explanation: z.string(),
});

export type PkSimulatorConfig = z.infer<typeof PkSimulatorConfigSchema>;
