import { z } from 'zod';

export const ChemicalPointTypeSchema = z.enum([
  'ATOM_LONE_PAIR',
  'PI_BOND_MIDPOINT',
  'ATOM_ELECTROPHILE'
]);
export type ChemicalPointType = z.infer<typeof ChemicalPointTypeSchema>;

export const ChemicalPointSchema = z.object({
  id: z.string(),
  atomIndex: z.number().int(),
  bondIndices: z.tuple([z.number().int(), z.number().int()]).optional(),
  pointType: ChemicalPointTypeSchema.default('ATOM_LONE_PAIR'),
  atomSymbol: z.string().min(1).max(2), // 'C', 'N', 'O', 'S', 'P'
  label: z.string(),
  x: z.number(),
  y: z.number(),
  formalCharge: z.number().int().default(0),
  valenceElectrons: z.number().int().min(0).max(12),
  isLonePair: z.boolean().default(false),
  isPiBond: z.boolean().default(false)
});
export type ChemicalPoint = z.infer<typeof ChemicalPointSchema>;

export const ChemicalBondSchema = z.object({
  id: z.string(),
  fromIndex: z.number().int(),
  toIndex: z.number().int(),
  bondOrder: z.number().int().min(1).max(3).default(1),
  isAromatic: z.boolean().default(false).optional()
});
export type ChemicalBond = z.infer<typeof ChemicalBondSchema>;

export const CurvedArrowSchema = z.object({
  id: z.string(),
  donor: ChemicalPointSchema,
  acceptor: ChemicalPointSchema,
  arrowType: z.enum(['ELECTRON_PAIR', 'SINGLE_RADICAL']).default('ELECTRON_PAIR'),
  p0: z.object({ x: z.number(), y: z.number() }),
  pCtrl: z.object({ x: z.number(), y: z.number() }),
  p1: z.object({ x: z.number(), y: z.number() }),
  isSnapped: z.boolean().default(true),
  snapDistancePx: z.number().positive().default(56)
});
export type CurvedArrow = z.infer<typeof CurvedArrowSchema>;

export const MechanismFadingStageSchema = z.enum([
  'STAGE_DEMO',
  'STAGE_FADED_1',
  'STAGE_FADED_2',
  'STAGE_INDEPENDENT'
]);
export type MechanismFadingStage = z.infer<typeof MechanismFadingStageSchema>;

export const MechanismErrorCodeSchema = z.enum([
  'NONE',
  'VALENCE_OCTET_VIOLATION',
  'UNREACTIVE_ELECTROPHILE',
  'MISSING_PI_RESONANCE_ARROW',
  'IMPOSSIBLE_LEAVING_GROUP',
  'STERIC_STRAIN_DEADLOCK',
  'INCORRECT_DONOR'
]);
export type MechanismErrorCode = z.infer<typeof MechanismErrorCodeSchema>;

export const ValenceValidationResponseSchema = z.object({
  isValid: z.boolean(),
  isHypervalentAllowed: z.boolean().default(true),
  errorCode: MechanismErrorCodeSchema.default('NONE'),
  violatingAtomIndex: z.number().int().optional(),
  feedbackTurkish: z.string().max(250),
  resultingIntermediateSmiles: z.string().optional(),
  formalCharges: z.record(z.string(), z.number()).optional(),
  calculatedNetEnergyKcal: z.number().optional()
});
export type ValenceValidationResponse = z.infer<typeof ValenceValidationResponseSchema>;

export const MechanismStepSchema = z.object({
  stepNumber: z.number().int().positive(),
  description: z.string(),
  donorPointId: z.string(),
  acceptorPointId: z.string(),
  secondaryDonorPointId: z.string().optional(),
  secondaryAcceptorPointId: z.string().optional(),
  expectedArrowCount: z.number().int().min(1).max(2).default(1),
  hintLadder: z.tuple([
    z.string().max(150),
    z.string().max(150),
    z.string().max(200)
  ]),
  explanation: z.string(),
  intermediateName: z.string()
});
export type MechanismStep = z.infer<typeof MechanismStepSchema>;

export const MechanismChallengeSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  courseId: z.enum(['medchem', 'pharmacology']),
  sourceFile: z.string(),
  sourcePage: z.union([z.number(), z.string()]),
  canonicalTrapCode: z.string(),
  drivingForceExplanation: z.string(),
  reactantSmiles: z.string(),
  initialPoints: z.array(ChemicalPointSchema),
  initialBonds: z.array(ChemicalBondSchema),
  steps: z.array(MechanismStepSchema),
  demoArrows: z.array(CurvedArrowSchema)
});
export type MechanismChallenge = z.infer<typeof MechanismChallengeSchema>;

export const SubstituentTypeSchema = z.enum([
  'SUB_H',
  'SUB_CH3',
  'SUB_CL',
  'SUB_OCH3',
  'SUB_NO2',
  'SUB_CF3',
  'SUB_N_CH3_2',
  'SUB_SO2NH2'
]);
export type SubstituentType = z.infer<typeof SubstituentTypeSchema>;

export interface SubstituentItem {
  type: SubstituentType;
  name: string;
  formula: string;
  hammettSigmaPara: number;
  hammettSigmaMeta: number;
  wildmanCrippenLogP: number;
  stericTaftEs: number;
  description: string;
  badgeColor: string;
}

export const ScaffoldPositionSchema = z.object({
  id: z.string(),
  label: z.string(),
  positionType: z.enum(['ortho', 'meta', 'para', 'amine_n', 'alpha_carbon', 'c3_ester', 'c5_ester', 'c4_phenyl']),
  x: z.number(),
  y: z.number(),
  currentSubstituent: SubstituentTypeSchema
});
export type ScaffoldPosition = z.infer<typeof ScaffoldPositionSchema>;

export const DrugScaffoldSchema = z.object({
  id: z.string(),
  name: z.string(),
  drugClass: z.string(),
  baseSmiles: z.string(),
  baseLogP: z.number(),
  basePka: z.number(),
  reactionRho: z.number(),
  baseHalfLifeHours: z.number(),
  baseReceptorAffinity: z.number(),
  positions: z.array(ScaffoldPositionSchema),
  description: z.string(),
  clinicalContext: z.string(),
  sources: z.array(z.object({
    file: z.string(),
    page: z.union([z.number(), z.string()])
  }))
});
export type DrugScaffold = z.infer<typeof DrugScaffoldSchema>;

export interface SarEvaluationResult {
  deltaLogP: number;
  calculatedLogP: number;
  deltaPka: number;
  calculatedPka: number;
  estimatedHalfLifeHours: number;
  receptorAffinityScore: number;
  stericHindranceScore: number;
  clinicalSummary: string;
}
