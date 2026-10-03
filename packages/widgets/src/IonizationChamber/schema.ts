import { z } from 'zod';
import { maxWords } from '../types';

export const CompartmentConfigSchema = z.object({
  name: z.string(),
  defaultPh: z.number().min(0).max(14).default(1.5),
  minPh: z.number().min(0).max(14).default(1.0),
  maxPh: z.number().min(0).max(14).default(8.5),
  surfaceAreaM2: z.number().positive().default(1.0),
});

export const IonizationChamberConfigSchema = z.object({
  drugName: z.string(),
  pKa: z.number(),
  drugType: z.enum(['weak_acid', 'weak_base', 'neutral']).default('weak_acid'),
  compartmentA: CompartmentConfigSchema.default({
    name: 'Stomach Lumen',
    defaultPh: 1.5,
    minPh: 1.0,
    maxPh: 8.0,
    surfaceAreaM2: 1.0,
  }),
  compartmentB: z.object({
    name: z.string().default('Systemic Blood'),
    ph: z.number().min(0).max(14).default(7.4),
    surfaceAreaM2: z.number().positive().default(32.0),
  }).default({
    name: 'Systemic Blood',
    ph: 7.4,
    surfaceAreaM2: 32.0,
  }),
  maxParticleCount: z.number().int().min(10).max(40).default(20),
  equationRef: z.string().optional(),
});

export type IonizationChamberConfig = z.infer<typeof IonizationChamberConfigSchema>;
