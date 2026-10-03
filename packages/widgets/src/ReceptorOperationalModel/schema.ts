import { z } from 'zod';

export const ReceptorOperationalConfigSchema = z.object({
  targetReceptor: z.string().default('β1-Adrenerjik Reseptör'),
  systemEmax: z.number().default(100),
  defaultTau: z.number().positive().default(5.0),
  defaultLogKA: z.number().default(-6.0), // 1 uM = 10^-6 M
  defaultSlopeN: z.number().positive().default(1.0),
  equationRef: z.string().default('Black & Leff (Proc R Soc Lond B 1983; 220:141-162); Goodman & Gilman 14th ed. Ch. 3'),
});

export type ReceptorOperationalConfig = z.infer<typeof ReceptorOperationalConfigSchema>;
