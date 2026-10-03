import { z } from 'zod';

export const PkCockpitConfigSchema = z.object({
  drugName: z.string().default('Teofilin PK İzlem Modeli'),
  defaultDoseMg: z.number().positive().default(400),
  defaultTauHours: z.number().positive().default(8),
  defaultClearanceLHr: z.number().positive().default(3.0),
  defaultVdL: z.number().positive().default(35),
  defaultKa: z.number().positive().default(1.5),
  defaultBioavailabilityF: z.number().min(0).max(1).default(0.9),
  defaultRoute: z.enum(['oral', 'iv_bolus']).default('oral'),
  mecMgL: z.number().positive().default(10), // Minimum Effective Concentration
  mtcMgL: z.number().positive().default(20), // Minimum Toxic Concentration
  equationRef: z.string().default('Rowland & Tozer Clinical Pharmacokinetics 5th ed.; Goodman & Gilman 14th ed. Ch. 2; Katzung 15th ed. Ch. 3'),
});

export type PkCockpitConfig = z.infer<typeof PkCockpitConfigSchema>;
