import { z } from 'zod';

export const ClinicalCaseIdSchema = z.enum([
  'ciprofloxacin_caco3',
  'simvastatin_clarithromycin',
  'warfarin_heparin_bridge',
]);

export type ClinicalCaseId = z.infer<typeof ClinicalCaseIdSchema>;

export const ClinicalDecisionTypeSchema = z.enum([
  'approve',
  'modify_spacing',
  'contraindicated_switch',
  'maintain_bridge',
]);

export type ClinicalDecisionType = z.infer<typeof ClinicalDecisionTypeSchema>;

export const ClinicalCaseOptionSchema = z.object({
  id: z.string(),
  decision: ClinicalDecisionTypeSchema,
  text: z.string(),
  isCorrect: z.boolean(),
  feedback: z.string(),
  misconceptionCode: z.string().optional(),
});

export const ClinicalOrderCaseSchema = z.object({
  caseId: ClinicalCaseIdSchema,
  title: z.string(),
  patientProfile: z.object({
    age: z.number().positive(),
    gender: z.string(),
    weightKg: z.number().positive(),
    indication: z.string(),
    renalFunction: z.string(),
    allergies: z.string(),
  }),
  activeOrder: z.object({
    drugName: z.string(),
    dose: z.string(),
    route: z.string(),
    frequency: z.string(),
  }),
  concomitantMedication: z.object({
    drugName: z.string(),
    dose: z.string(),
    indication: z.string(),
  }),
  clinicalScenario: z.string(),
  correctDecision: ClinicalDecisionTypeSchema,
  options: z.array(ClinicalCaseOptionSchema),
  pharmacologicalMechanism: z.string(),
  keyEvidenceCitation: z.string(),
});

export const ClinicalOrderVerificationConfigSchema = z.object({
  initialCaseId: ClinicalCaseIdSchema.default('ciprofloxacin_caco3'),
  cases: z.array(ClinicalOrderCaseSchema).optional(),
});

export type ClinicalCaseOption = z.infer<typeof ClinicalCaseOptionSchema>;
export type ClinicalOrderCase = z.infer<typeof ClinicalOrderCaseSchema>;
export type ClinicalOrderVerificationConfig = z.infer<typeof ClinicalOrderVerificationConfigSchema>;
