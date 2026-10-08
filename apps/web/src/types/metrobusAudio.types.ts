import { z } from 'zod';
import { CanonicalTrapCodeSchema } from './vizeTriage.types';

// ============================================================================
// PILLAR 5: METROBÜS MODU (AUDIO SOCRATIC MICRO-DOSING & TRANSIT FILTERING)
// ============================================================================

export const TransitModeSchema = z.enum([
  'METROBUS',
  'MARMARAY',
  'METRO',
  'OTOBUS',
  'SESSIZ_MOD'
]);
export type TransitMode = z.infer<typeof TransitModeSchema>;

export const AudioDrillStatusSchema = z.enum([
  'IDLE',
  'PROMPT_PLAYING',
  'LISTENING',
  'EVALUATING',
  'AFFIRMATION',
  'VERBAL_NUDGE',
  'COMPLETED'
]);
export type AudioDrillStatus = z.infer<typeof AudioDrillStatusSchema>;

export const AudioSessionConfigSchema = z.object({
  sessionId: z.string().uuid(),
  courseId: z.enum(['medchem', 'pharmacology']),
  facultySlug: z.string(),
  transitMode: TransitModeSchema.default('METROBUS'),
  acousticFilterEnabled: z.boolean().default(true),
  highPassCutoffHz: z.number().default(180).describe('4th-order cascaded Biquad cutoff 180 Hz'),
  lowPassCutoffHz: z.number().default(3800),
  peakingFrequencyHz: z.number().default(1800),
  peakingGainDb: z.number().default(4.0),
  vadSensitivity: z.enum(['HIGH_NOISE_TRANSIT', 'STANDARD_QUIET', 'WHISPER_SENSITIVE']).default('HIGH_NOISE_TRANSIT'),
  speechEngine: z.enum(['WEB_SPEECH_ONLINE', 'WHISPER_WASM_OFFLINE', 'SYNTHETIC_MOCK']).default('WEB_SPEECH_ONLINE')
});
export type AudioSessionConfig = z.infer<typeof AudioSessionConfigSchema>;

export const SocraticAudioPromptSchema = z.object({
  promptId: z.string(),
  trapCode: CanonicalTrapCodeSchema,
  courseId: z.enum(['medchem', 'pharmacology']),
  turnIndex: z.number().int().min(0),
  title: z.string(),
  topic: z.string(),
  // Pedagogical constraint: <= 25 words Turkish speech prompt, 0 3D stereochemistry rotation
  turkishSpeechText: z.string().max(200).describe('Strictly <= 25 words conversational prompt'),
  expectedKeywords: z.array(z.string()).min(1),
  misconceptionKeywords: z.array(z.string()).min(1),
  // Pedagogical constraint: <= 20 words affirmation
  affirmationText: z.string().max(160).describe('<= 20 words on correct answer'),
  // Pedagogical constraint: <= 22 words verbal nudge
  verbalNudgeText: z.string().max(160).describe('Tier 1 verbal nudge <= 22 words'),
  detailedExplanation: z.string(),
  quickOptions: z.array(z.object({
    id: z.string(),
    label: z.string(),
    isCorrect: z.boolean(),
    diagnosticMessage: z.string()
  })).min(2).max(4),
  cachedOpusAudioBlobUri: z.string().optional()
});
export type SocraticAudioPrompt = z.infer<typeof SocraticAudioPromptSchema>;

export const VadEventPayloadSchema = z.object({
  state: z.enum(['SPEECH_STARTED', 'SPEECH_ENDED', 'SILENCE_TIMEOUT']),
  durationMs: z.number().nonnegative(),
  averageRms: z.number().min(0).max(1),
  signalToNoiseRatioDb: z.number()
});
export type VadEventPayload = z.infer<typeof VadEventPayloadSchema>;

export const MetrobusTurnLogSchema = z.object({
  turnId: z.string(),
  promptId: z.string(),
  recognizedText: z.string(),
  evaluatedVerdict: z.enum(['CORRECT', 'MISCONCEPTION_TRIGGERED', 'INDECISIVE', 'REPEAT_REQUESTED']),
  turnLatencyMs: z.number().nonnegative().max(5000),
  timestamp: z.string()
});
export type MetrobusTurnLog = z.infer<typeof MetrobusTurnLogSchema>;

export const EarconTypeSchema = z.enum([
  'PROMPT_START',
  'LISTENING_ACTIVE',
  'CORRECT_CHIME',
  'NUDGE_CHIME',
  'REPEAT_CHIME',
  'ERROR_CHIME'
]);
export type EarconType = z.infer<typeof EarconTypeSchema>;

export interface FilterFrequencyResponsePoint {
  frequencyHz: number;
  rawMagnitudeDb: number;
  filteredMagnitudeDb: number;
  attenuationDb: number;
}
