import { z } from 'zod';
import { CanonicalTrapCodeSchema } from './vizeTriage.types';

// ============================================================================
// PILLAR 4: FAKÜLTE MASASI & SANAL AMFİ (PRESENCE & MISCONCEPTION TELEMETRY)
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
  joined_at: z.string()
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
  timestamp: z.string()
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
  generatedAt: z.string()
});
export type CohortHeatmapStats = z.infer<typeof CohortHeatmapStatsSchema>;

export const FacultyTableTopicSchema = z.object({
  tableId: z.string(),
  moduleId: z.string(),
  moduleTitle: z.string(),
  topicDescription: z.string(),
  currentSlideNumber: z.number().int(),
  activeStudentCount: z.number().int().min(0),
  courseId: z.enum(['medchem', 'pharmacology']),
  activeTrapCode: CanonicalTrapCodeSchema.optional()
});
export type FacultyTableTopic = z.infer<typeof FacultyTableTopicSchema>;

export const FacultyRoomConfigSchema = z.object({
  slug: z.string().min(2),
  name: z.string(),
  shortName: z.string(),
  city: z.string(),
  logoColor: z.string(),
  activeStudentsCount: z.number().int().min(0),
  isNationalAggregate: z.boolean().default(false),
  activeTables: z.array(FacultyTableTopicSchema),
  currentSurgeAlert: MisconceptionSurgeBroadcastSchema.optional(),
  curriculumFocus: z.string()
});
export type FacultyRoomConfig = z.infer<typeof FacultyRoomConfigSchema>;

export const MisconceptionOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  isCorrect: z.boolean(),
  misconceptionDiagnosis: z.string(),
  cohortPickPercentage: z.number().min(0).max(100)
});
export type MisconceptionOption = z.infer<typeof MisconceptionOptionSchema>;

export const MisconceptionChallengeSchema = z.object({
  challengeId: z.string(),
  trapCode: CanonicalTrapCodeSchema,
  facultySlug: z.string(),
  courseId: z.enum(['medchem', 'pharmacology']),
  slideNumber: z.number().int(),
  headline: z.string(),
  questionPrompt: z.string(),
  options: z.array(MisconceptionOptionSchema).length(4),
  hintLadder: z.tuple([
    z.string().describe('Tier 1: Nudge'),
    z.string().describe('Tier 2: Clue'),
    z.string().describe('Tier 3: Solution')
  ]),
  diagnosticExplanation: z.string(),
  sourceAttribution: z.object({
    file: z.string(),
    pageOrSlide: z.union([z.number(), z.string()])
  })
});
export type MisconceptionChallenge = z.infer<typeof MisconceptionChallengeSchema>;
