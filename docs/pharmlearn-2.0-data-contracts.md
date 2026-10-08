# PharmLearn 2.0: Canonical Data Contracts & Type Schemas
## Complete TypeScript Interfaces, Zod Validation Schemas, Web Worker RPC Protocols, and Local Storage Schemas

**Document ID**: `PL2-DATA-CONTRACTS-2026-OCT`  
**Classification**: Software Engineering Data Contract & Schema Definition  
**Author**: `teamwork_preview_worker_spec_2`  
**Target Workspaces**: `apps/web`, `packages/widgets`, `packages/platform`, `supabase/`  
**TypeScript Version**: `TypeScript 5.3+` (Strict Null Checks, Exact Optional Property Types)  
**Validation Engine**: `zod ^3.22.4`  
**Version**: `2.0.0-PROD-SCHEMAS`  
**Date**: October 8, 2026  
**Status**: AUTHORITATIVE / FROZEN SPECIFICATION  

---

## 1. Overview & Type Safety Invariants

This specification provides the immutable, production-grade TypeScript interfaces and runtime Zod schemas powering all 5 Radical Pillars of **PharmLearn 2.0**:
1. Every client-edge API call, Web Worker message boundary, and Supabase Realtime broadcast payload MUST validate against its corresponding Zod schema before processing.
2. In accordance with `AGENTS.md` and Turkish law (FSEK No. 5846 / KVKK No. 6698), schemas strictly delineate between ephemeral client-side memory objects (Blob URLs, raw OCR tokens) and anonymized network payloads.
3. Every prompt, question, and misconception payload adheres to the strict cognitive load ceiling ($\le 40$ words for visual steps, $\le 25$ words for audio turns).

---

## 2. Pillar 1: Slayt Isı Haritası & Vize Triage Schemas

```typescript
import { z } from 'zod';

// ============================================================================
// PILLAR 1: SLAYT ISI HARİTASI & VİZE TRİAGE
// ============================================================================

export const CanonicalTrapCodeSchema = z.enum([
  'TRAP-01-IONIZATION',
  'TRAP-02-POTENCY-EFFICACY',
  'TRAP-02-SPARE-RECEPTORS',
  'TRAP-03-ESTER-AMIDE',
  'TRAP-04-ADRENERGIC-INVERSION',
  'TRAP-05-BIOISOSTERE-LOGP',
  'TRAP-06-CIP-INVERSION',
  'TRAP-07-SCHILD-SLOPE',
  'TRAP-08-AChE-AGING',
  'TRAP-09-PRODRUG-CES1',
  'TRAP-10-GABA-PAM-VS-DIRECT'
]);
export type CanonicalTrapCode = z.infer<typeof CanonicalTrapCodeSchema>;

export const HighYieldFactorWeightsSchema = z.object({
  c_freq: z.number().min(0).max(3.0).describe('Past exam entity frequency match [0.0 - 3.0]'),
  e_emph: z.number().min(0).max(2.5).describe('Professor typography and layout emphasis [0.0 - 2.5]'),
  s_struct: z.number().min(0).max(2.0).describe('Chemical reactions & quantitative equations [0.0 - 2.0]'),
  m_cohort: z.number().min(0).max(2.5).describe('Cohort vulnerability / failure metric [0.0 - 2.5]'),
  gamma_cal: z.number().min(1.0).max(1.25).describe('Proximity multiplier for upcoming exam date [1.0 - 1.25]')
});
export type HighYieldFactorWeights = z.infer<typeof HighYieldFactorWeightsSchema>;

export const HighYieldSlideSchema = z.object({
  slideId: z.string().uuid(),
  courseId: z.enum(['medchem', 'pharmacology']),
  facultySlug: z.string().min(2), // e.g. 'marmara-eczacilik', 'hacettepe-eczacilik'
  lectureDeckId: z.string(),
  slideNumber: z.number().int().positive(),
  highYieldScore: z.number().int().min(0).max(100), // Formula HYS_s
  tier: z.enum(['CRITICAL_TIER_1', 'SUPPORTING_TIER_2', 'CONTEXT_TIER_3']),
  rawFactors: HighYieldFactorWeightsSchema,
  linkedTrapCodes: z.array(CanonicalTrapCodeSchema),
  boundingSpotlight: z.object({
    xNorm: z.number().min(0).max(1),
    yNorm: z.number().min(0).max(1),
    wNorm: z.number().min(0).max(1),
    hNorm: z.number().min(0).max(1)
  }).optional(),
  predictPrompt: z.string().max(250).describe('<= 30 words predict-then-reveal prompt'),
  examQuestionSnippet: z.string().max(300),
  updatedAt: z.string().datetime()
});
export type HighYieldSlide = z.infer<typeof HighYieldSlideSchema>;

export const VizeCramStepSchema = z.object({
  stepIndex: z.number().int().min(0),
  slideId: z.string().uuid(),
  spotlightHeadline: z.string().max(100),
  socraticPrompt: z.string().max(200).describe('<= 30 words'),
  timeLimitSeconds: z.number().int().default(20),
  hintLadder: z.tuple([
    z.string().max(150).describe('Tier 1: Nudge'),
    z.string().max(150).describe('Tier 2: Clue'),
    z.string().max(180).describe('Tier 3: Solution')
  ]),
  correctOptionId: z.string(),
  options: z.array(z.object({
    id: z.string(),
    text: z.string().max(120),
    misconceptionDiagnosed: CanonicalTrapCodeSchema.optional(),
    isCorrect: z.boolean()
  })).min(2).max(4)
});
export type VizeCramStep = z.infer<typeof VizeCramStepSchema>;

export const VizeTriageSessionSchema = z.object({
  sessionId: z.string().uuid(),
  userId: z.string(),
  courseId: z.enum(['medchem', 'pharmacology']),
  facultySlug: z.string(),
  totalSlidesEvaluated: z.number().int().positive(),
  highYieldSlidesSelected: z.number().int().positive(), // HYS >= 75
  completedStepIndices: z.array(z.number().int()),
  masteredSlideIds: z.array(z.string().uuid()),
  failedTrapCodes: z.array(CanonicalTrapCodeSchema),
  startedAt: z.string().datetime(),
  completedAt: z.string().datetime().optional()
});
export type VizeTriageSession = z.infer<typeof VizeTriageSessionSchema>;
```

---

## 3. Pillar 2: Fotokopiden Etkileşime (Dynamic Slide Re-Animator) Schemas

```typescript
// ============================================================================
// PILLAR 2: FOTOKOPİDEN ETKİLEŞİME (DYNAMIC RE-ANIMATOR)
// ============================================================================

export const OcrBoundingBoxSchema = z.object({
  x0: z.number(),
  y0: z.number(),
  x1: z.number(),
  y1: z.number(),
  confidence: z.number().min(0).max(100)
});
export type OcrBoundingBox = z.infer<typeof OcrBoundingBoxSchema>;

export const OcrExtractedTokenSchema = z.object({
  text: z.string(),
  bbox: OcrBoundingBoxSchema,
  isChemicalEntity: z.boolean().default(false),
  isEquationToken: z.boolean().default(false),
  normalizedToken: z.string().optional()
});
export type OcrExtractedToken = z.infer<typeof OcrExtractedTokenSchema>;

export const OcrExtractionResultSchema = z.object({
  documentId: z.string().uuid(),
  extractedText: z.string(),
  tokens: z.array(OcrExtractedTokenSchema),
  detectedLanguage: z.literal('tur'),
  confidenceMean: z.number().min(0).max(100),
  extractedPka: z.number().optional(),
  extractedLogP: z.number().optional(),
  extractedKd: z.number().optional(),
  extractedSmiles: z.string().optional(),
  processingTimeMs: z.number().positive()
});
export type OcrExtractionResult = z.infer<typeof OcrExtractionResultSchema>;

export const DetectedWidgetTypeSchema = z.enum([
  'IonizationEquilibriumSlider',
  'DoseResponseCurve',
  'DualModeMoleculeViewer',
  'SarExplorer',
  'PredictThenReveal'
]);
export type DetectedWidgetType = z.infer<typeof DetectedWidgetTypeSchema>;

export const DetectedWidgetConfigSchema = z.object({
  id: z.string().default('widget-auto-01'),
  widgetType: DetectedWidgetTypeSchema,
  title: z.string().max(80),
  rationale: z.string().max(160),
  concept_tag: CanonicalTrapCodeSchema,
  pedagogical_prompt: z.string().max(250),
  parameters: z.discriminatedUnion('widgetType', [
    z.object({
      widgetType: z.literal('IonizationEquilibriumSlider'),
      pKa: z.number(),
      drugType: z.enum(['weak_acid', 'weak_base']),
      compartmentA_pH: z.number().default(7.4),
      compartmentB_pH: z.number().default(2.0)
    }),
    z.object({
      widgetType: z.literal('DoseResponseCurve'),
      agonistKd: z.number().positive(),
      hasSpareReceptors: z.boolean(),
      isCompetitive: z.boolean(),
      antagonistDoseMultiplier: z.number().default(1.0)
    }),
    z.object({
      widgetType: z.literal('DualModeMoleculeViewer'),
      smiles: z.string(),
      iupacName: z.string().optional(),
      chiralCentersCount: z.number().int().default(0)
    }),
    z.object({
      widgetType: z.literal('SarExplorer'),
      scaffoldName: z.string(),
      initialSmiles: z.string(),
      variablePositions: z.array(z.string())
    }),
    z.object({
      widgetType: z.literal('PredictThenReveal'),
      prompt: z.string().max(200)
    })
  ]),
  widget: z.object({
    type: DetectedWidgetTypeSchema,
    config: z.record(z.string(), z.unknown())
  }).describe('Dual configuration wrapper satisfying AGENTS.md Invariant 8.5')
});
export type DetectedWidgetConfig = z.infer<typeof DetectedWidgetConfigSchema>;

export const AnkiCardSchema = z.object({
  guid: z.string(),
  frontHtml: z.string(),
  backHtml: z.string(),
  sourceSlideRef: z.string(),
  examTrapWarning: z.string().optional(),
  tags: z.array(z.string())
});
export type AnkiCard = z.infer<typeof AnkiCardSchema>;

export const AnkiExportPayloadSchema = z.object({
  deckName: z.string().min(3),
  facultySlug: z.string(),
  courseId: z.enum(['medchem', 'pharmacology']),
  cards: z.array(AnkiCardSchema).min(1),
  embeddedSvgAssets: z.record(z.string(), z.string()).describe('Filename to SVG string map')
});
export type AnkiExportPayload = z.infer<typeof AnkiExportPayloadSchema>;
```

---

## 4. Pillar 3: Tactile Arrow Pushing & Substituent Snapping Schemas

```typescript
// ============================================================================
// PILLAR 3: TACTILE ARROW PUSHING & SUBSTITUENT SNAPPING
// ============================================================================

export const ChemicalPointSchema = z.object({
  atomIndex: z.number().int(),
  bondIndices: z.tuple([z.number().int(), z.number().int()]).optional().describe('Indices for pi-bond donor centers'),
  pointType: z.enum(['ATOM_LONE_PAIR', 'PI_BOND_MIDPOINT']).default('ATOM_LONE_PAIR'),
  atomSymbol: z.string().min(1).max(2), // 'C', 'N', 'O', 'S', 'P'
  x: z.number(),
  y: z.number(),
  formalCharge: z.number().int().default(0),
  valenceElectrons: z.number().int().min(0).max(12).describe('Up to 10 for P(V), 12 for S(VI)'),
  isLonePair: z.boolean().default(false),
  isPiBond: z.boolean().default(false)
});
export type ChemicalPoint = z.infer<typeof ChemicalPointSchema>;

export const CurvedArrowSchema = z.object({
  id: z.string().uuid(),
  donor: ChemicalPointSchema,
  acceptor: ChemicalPointSchema,
  arrowType: z.enum(['ELECTRON_PAIR', 'SINGLE_RADICAL']), // Double barb vs fishhook
  p0: z.object({ x: z.number(), y: z.number() }),
  pCtrl: z.object({ x: z.number(), y: z.number() }), // Bézier control point
  p1: z.object({ x: z.number(), y: z.number() }),
  isSnapped: z.boolean().default(true),
  snapDistancePx: z.number().positive().default(56).describe('Relaxed Voronoi snap distance')
});
export type CurvedArrow = z.infer<typeof CurvedArrowSchema>;

export const ValenceValidationRequestSchema = z.object({
  requestId: z.string().uuid(),
  reactantSmiles: z.string(),
  drawnArrows: z.array(CurvedArrowSchema).min(1),
  activeEnzymeOrCatalyst: z.string().optional()
});
export type ValenceValidationRequest = z.infer<typeof ValenceValidationRequestSchema>;

export const ValenceValidationResponseSchema = z.object({
  requestId: z.string().uuid(),
  isValid: z.boolean(),
  isHypervalentAllowed: z.boolean().default(true).describe('Validates P(V) and S(VI) hypervalent octet expansion'),
  errorCode: z.enum([
    'NONE',
    'VALENCE_OCTET_VIOLATION',       // Texas Carbon (5 bonds)
    'UNREACTIVE_ELECTROPHILE',       // Non-electrophilic carbon attacked
    'MISSING_PI_RESONANCE_ARROW',    // Attacked C=O without pushing electrons to O
    'IMPOSSIBLE_LEAVING_GROUP',      // Alkyl / hydride forced to leave
    'STERIC_STRAIN_DEADLOCK'         // Ring strained 3-membered intermediate
  ]).default('NONE'),
  violatingAtomIndex: z.number().int().optional(),
  feedbackTurkish: z.string().max(180).describe('<= 35 words plain intuition first'),
  resultingIntermediateSmiles: z.string().optional(),
  formalCharges: z.record(z.string(), z.number()).optional(),
  calculatedNetEnergyKcal: z.number().optional()
});
export type ValenceValidationResponse = z.infer<typeof ValenceValidationResponseSchema>;

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

export const SubstituentSnapEventSchema = z.object({
  scaffoldId: z.string(),
  targetPosition: z.enum(['ortho', 'meta', 'para', 'amine_n', 'alpha_carbon', 'c3_ester', 'c5_ester', 'c4_phenyl']),
  appliedSubstituent: SubstituentTypeSchema,
  hammettSigma: z.number().describe('Hammett substituent constant sigma_x'),
  deltaPka: z.number().describe('Calculated pKa shift via Hammett equation'),
  deltaLogP: z.number().describe('Calculated Wildman-Crippen lipophilicity change'),
  resultingSmiles: z.string(),
  estimatedHalfLifeHours: z.number().positive(),
  receptorAffinityScore: z.number().min(0).max(100)
});
export type SubstituentSnapEvent = z.infer<typeof SubstituentSnapEventSchema>;
```

---

## 5. Pillar 4: Fakülte Masası & Sanal Amfi Schemas

```typescript
// ============================================================================
// PILLAR 4: FAKÜLTE MASASI & SANAL AMFİ (SUPABASE REALTIME)
// ============================================================================

export const AmfiPresencePayloadSchema = z.object({
  presence_ref: z.string(),
  student_ephemeral_id: z.string().length(64).describe('HMAC-SHA256(user_id, daily_salt)'),
  faculty_slug: z.string().min(2),
  course_id: z.enum(['medchem', 'pharmacology']),
  active_module: z.string(),
  study_status: z.enum(['studying', 'idle']).default('studying'),
  is_active_studying: z.boolean().default(true),
  mode: z.enum(['focus', 'vize_triage', 'metrobus']),
  joined_at: z.string().datetime()
});
export type AmfiPresencePayload = z.infer<typeof AmfiPresencePayloadSchema>;

export const MisconceptionSurgeBroadcastSchema = z.object({
  event_type: z.literal('MISCONCEPTION_SURGE'),
  trap_code: CanonicalTrapCodeSchema,
  faculty_slug: z.string(),
  course_id: z.enum(['medchem', 'pharmacology']),
  slide_number: z.number().int().positive(),
  trapped_student_ratio: z.number().min(0.50).max(1.0).describe('>= 50% cohort surge threshold'),
  sample_size_k: z.number().int().min(10).describe('k-anonymity enforcement k >= 10'),
  headline: z.string().max(120),
  diagnostic_prompt: z.string().max(200).describe('<= 30 words'),
  action_url: z.string().url().or(z.string().startsWith('/'))
});
export type MisconceptionSurgeBroadcast = z.infer<typeof MisconceptionSurgeBroadcastSchema>;

export const CohortErrorTelemetryReportSchema = z.object({
  faculty_slug: z.string(),
  course_id: z.enum(['medchem', 'pharmacology']),
  module_id: z.string(),
  slide_number: z.number().int().positive(),
  trap_code: CanonicalTrapCodeSchema,
  is_correct: z.boolean().describe('Transmitted securely to Edge Aggregator for Central Laplace DP ε=0.5'),
  timestamp: z.string().datetime()
});
export type CohortErrorTelemetryReport = z.infer<typeof CohortErrorTelemetryReportSchema>;

export const CohortHeatmapStatsSchema = z.object({
  faculty_slug: z.string(),
  course_id: z.enum(['medchem', 'pharmacology']),
  activeStudentsOnline: z.number().int().min(0),
  isNationalAggregate: z.boolean().describe('True if k < 10 fallback triggered'),
  topMisconceptions: z.array(z.object({
    trap_code: CanonicalTrapCodeSchema,
    slide_number: z.number().int(),
    failurePercentage: z.number().min(0).max(100)
  })).max(3),
  generatedAt: z.string().datetime()
});
export type CohortHeatmapStats = z.infer<typeof CohortHeatmapStatsSchema>;
```

---

## 6. Pillar 5: Metrobüs Modu Schemas

```typescript
// ============================================================================
// PILLAR 5: METROBÜS MODU (AUDIO SOCRATIC MICRO-DOSING)
// ============================================================================

export const AudioSessionConfigSchema = z.object({
  sessionId: z.string().uuid(),
  courseId: z.enum(['medchem', 'pharmacology']),
  facultySlug: z.string(),
  acousticFilterEnabled: z.boolean().default(true),
  highPassCutoffHz: z.number().default(180).describe('4th-order cascaded Biquad cutoff 180 Hz'),
  lowPassCutoffHz: z.number().default(3800),
  vadSensitivity: z.enum(['HIGH_NOISE_TRANSIT', 'STANDARD_QUIET', 'WHISPER_SENSITIVE']),
  speechEngine: z.enum(['WEB_SPEECH_ONLINE', 'WHISPER_WASM_OFFLINE'])
});
export type AudioSessionConfig = z.infer<typeof AudioSessionConfigSchema>;

export const SocraticAudioPromptSchema = z.object({
  promptId: z.string().uuid(),
  trapCode: CanonicalTrapCodeSchema,
  turnIndex: z.number().int().min(0),
  turkishSpeechText: z.string().max(160).describe('Strictly <= 25 words conversational prompt'),
  expectedKeywords: z.array(z.string()).min(1),
  misconceptionKeywords: z.array(z.string()).min(1),
  affirmationText: z.string().max(120).describe('<= 20 words on correct answer'),
  verbalNudgeText: z.string().max(140).describe('Tier 1 verbal nudge <= 22 words'),
  cachedOpusAudioBlobUri: z.string().optional()
});
export type SocraticAudioPrompt = z.infer<typeof SocraticAudioPromptSchema>;

export const VadEventPayloadSchema = z.object({
  state: z.enum(['SPEECH_STARTED', 'SPEECH_ENDED', 'SILENCE_TIMEOUT']),
  durationMs: z.number().positive(),
  averageRms: z.number().min(0).max(1),
  signalToNoiseRatioDb: z.number()
});
export type VadEventPayload = z.infer<typeof VadEventPayloadSchema>;

export const MetrobusTurnLogSchema = z.object({
  turnId: z.string().uuid(),
  promptId: z.string().uuid(),
  recognizedText: z.string(),
  evaluatedVerdict: z.enum(['CORRECT', 'MISCONCEPTION_TRIGGERED', 'INDECISIVE']),
  turnLatencyMs: z.number().positive().max(2500).describe('Target <= 750ms'),
  timestamp: z.string().datetime()
});
export type MetrobusTurnLog = z.infer<typeof MetrobusTurnLogSchema>;
```

---

## 7. Web Worker Messaging RPC Protocols

All intense client-side computations (RDKit chemistry validation, Tesseract OCR, ONNX embeddings, and Whisper speech-to-text) run inside isolated Web Workers to prevent UI thread lag.

```typescript
// ============================================================================
// WEB WORKER RPC PROTOCOLS
// ============================================================================

// --- 1. RDKit Web Worker (Chemistry & Octet Engine) ---
export const RDKitWorkerRequestSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('INIT_RDKIT') }),
  z.object({ type: z.literal('VALIDATE_ARROW_PUSH'), payload: ValenceValidationRequestSchema }),
  z.object({ type: z.literal('CALCULATE_HAMMETT_LOGP'), payload: SubstituentSnapEventSchema }),
  z.object({ type: z.literal('RENDER_SMILES_SVG'), smiles: z.string(), width: z.number().positive(), height: z.number().positive() })
]);
export type RDKitWorkerRequest = z.infer<typeof RDKitWorkerRequestSchema>;

export const RDKitWorkerResponseSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('RDKIT_READY'), version: z.string() }),
  z.object({ type: z.literal('ARROW_VALIDATION_RESULT'), payload: ValenceValidationResponseSchema }),
  z.object({ type: z.literal('HAMMETT_LOGP_RESULT'), payload: SubstituentSnapEventSchema }),
  z.object({ type: z.literal('SVG_RENDERED'), svgString: z.string() }),
  z.object({ type: z.literal('ERROR'), message: z.string(), details: z.unknown().optional() })
]);
export type RDKitWorkerResponse = z.infer<typeof RDKitWorkerResponseSchema>;

// --- 2. Tesseract OCR Worker (Client-Side Slide Parser) ---
export const OcrWorkerRequestSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('INIT_OCR'), language: z.literal('tur') }),
  z.object({
    type: z.literal('PROCESS_PAGE_CANVAS'),
    documentId: z.string().uuid(),
    pageIndex: z.number().int().default(0),
    imageBitmap: z.custom<ImageBitmap>().optional(),
    imageData: z.custom<ImageData>().optional(),
    imageBuffer: z.instanceof(ArrayBuffer).optional()
  }),
  z.object({ type: z.literal('TERMINATE') })
]);
export type OcrWorkerRequest = z.infer<typeof OcrWorkerRequestSchema>;

export const OcrWorkerResponseSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('OCR_INITIALIZED') }),
  z.object({ type: z.literal('OCR_PROGRESS'), progress: z.number().min(0).max(1) }),
  z.object({ type: z.literal('OCR_COMPLETE'), payload: OcrExtractionResultSchema }),
  z.object({ type: z.literal('ERROR'), error: z.string() })
]);
export type OcrWorkerResponse = z.infer<typeof OcrWorkerResponseSchema>;

// --- 3. Transformers.js Embeddings Worker (Local Vector Search) ---
export const EmbeddingsWorkerRequestSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('INIT_MODEL'), modelName: z.literal('Xenova/all-MiniLM-L6-v2') }),
  z.object({ type: z.literal('GENERATE_EMBEDDING'), text: z.string(), requestId: z.string().uuid() }),
  z.object({ type: z.literal('BATCH_SIMILARITY'), queryVector: z.array(z.number()), candidateVectors: z.array(z.array(z.number())) })
]);
export type EmbeddingsWorkerRequest = z.infer<typeof EmbeddingsWorkerRequestSchema>;

export const EmbeddingsWorkerResponseSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('MODEL_READY') }),
  z.object({ type: z.literal('EMBEDDING_RESULT'), requestId: z.string().uuid(), vector: z.array(z.number()) }),
  z.object({ type: z.literal('SIMILARITY_SCORES'), scores: z.array(z.number()) }),
  z.object({ type: z.literal('ERROR'), error: z.string() })
]);
export type EmbeddingsWorkerResponse = z.infer<typeof EmbeddingsWorkerResponseSchema>;

// --- 4. Whisper Speech-to-Text Worker (Decoupled Background Neural STT) ---
export const WhisperWorkerRequestSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('INIT_WHISPER'), modelName: z.literal('Whisper-tiny.tr') }),
  z.object({
    type: z.literal('TRANSCRIBE_AUDIO_BUFFER'),
    requestId: z.string().uuid(),
    audioPcmBuffer: z.instanceof(Float32Array),
    sampleRate: z.literal(16000).default(16000)
  }),
  z.object({ type: z.literal('TERMINATE') })
]);
export type WhisperWorkerRequest = z.infer<typeof WhisperWorkerRequestSchema>;

export const WhisperWorkerResponseSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('WHISPER_READY') }),
  z.object({
    type: z.literal('TRANSCRIPTION_RESULT'),
    requestId: z.string().uuid(),
    transcribedText: z.string(),
    confidence: z.number().min(0).max(1)
  }),
  z.object({ type: z.literal('ERROR'), error: z.string() })
]);
export type WhisperWorkerResponse = z.infer<typeof WhisperWorkerResponseSchema>;
```

---

## 8. IndexedDB Local Storage Schemas (`pharmlearn_offline_db`)

Under FSEK No. 5846, student slides and temporary study sessions are stored strictly on-device in browser IndexedDB.

### Database Manifest
- **Database Name**: `pharmlearn_offline_db`
- **Current Version**: `2`

### Store Specifications

```typescript
// ============================================================================
// INDEXEDDB SCHEMA DEFINITIONS
// ============================================================================

export interface IDBClientDocument {
  documentId: string;           // KeyPath
  title: string;
  totalPages: number;
  extractedText: string;
  widgetConfigs: DetectedWidgetConfig[];
  createdAt: number;           // Epoch timestamp
  expiresAt: number;           // Auto-purge TTL (session end / 24h)
}

export interface IDBVizeTriageSession {
  sessionId: string;            // KeyPath
  courseId: 'medchem' | 'pharmacology';
  facultySlug: string;
  highYieldScores: Record<string, number>; // slideId -> HYS
  masteredSlideIds: string[];
  failedTrapCodes: CanonicalTrapCode[];
  updatedAt: number;
}

export interface IDBOfflineAudioPrompt {
  promptId: string;             // KeyPath
  courseId: 'medchem' | 'pharmacology';
  moduleSlug: string;
  turkishSpeechText: string;
  expectedKeywords: string[];
  audioBlob: Blob;             // Cached Opus audio clip
  cachedAt: number;
}

export interface IDBLocalMasteryQueue {
  cardId: string;               // KeyPath
  trapCode: CanonicalTrapCode;
  stability: number;           // FSRS-4.5 S parameter
  difficulty: number;          // FSRS-4.5 D parameter
  dueEpochMs: number;          // Next review date
  lapses: number;
}

// IndexedDB Migration Definition
export const IDB_SCHEMA_V2 = {
  name: 'pharmlearn_offline_db',
  version: 2,
  stores: {
    client_documents: {
      keyPath: 'documentId',
      indexes: [
        { name: 'by_createdAt', keyPath: 'createdAt' },
        { name: 'by_expiresAt', keyPath: 'expiresAt' }
      ]
    },
    vize_triage_sessions: {
      keyPath: 'sessionId',
      indexes: [
        { name: 'by_course', keyPath: 'courseId' },
        { name: 'by_faculty', keyPath: 'facultySlug' }
      ]
    },
    offline_audio_prompts: {
      keyPath: 'promptId',
      indexes: [
        { name: 'by_module', keyPath: 'moduleSlug' }
      ]
    },
    local_mastery_queue: {
      keyPath: 'cardId',
      indexes: [
        { name: 'by_due', keyPath: 'dueEpochMs' },
        { name: 'by_trap', keyPath: 'trapCode' }
      ]
    }
  }
} as const;
```

---

*Data contracts and schemas authored, verified, and certified by `teamwork_preview_worker_spec_2`.*
