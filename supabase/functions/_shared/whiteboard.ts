/**
 * Whiteboard tutor: shared protocol + deterministic scaffolding engine.
 *
 * SINGLE SOURCE OF TRUTH. Imported by
 *   - the Supabase Edge Function (Deno; `zod` resolved through supabase/functions/whiteboard-tutor/deno.json)
 *   - the web app via packages/widgets/src/common/WhiteboardProtocol.ts (Vite/tsc; `zod` from node_modules)
 *
 * Keep this file free of imports other than `zod`, so both runtimes can load it.
 * Everything here is pure: no network, no clock, no randomness.
 */
import { z } from 'zod';

// ---------------------------------------------------------------------------------------------
// Limits
// ---------------------------------------------------------------------------------------------

/** AGENTS.md cognitive-load ceiling: every learner-facing prompt is at most 40 words. */
export const MAX_TUTOR_WORDS = 40;

export const countWords = (text: string): number =>
  text.trim().split(/\s+/).filter(Boolean).length;

const tutorText = z
  .string()
  .min(1)
  .max(600)
  .refine((v) => countWords(v) <= MAX_TUTOR_WORDS, {
    message: `Tutor message must not exceed ${MAX_TUTOR_WORDS} words`,
  });

// ---------------------------------------------------------------------------------------------
// Student -> tutor
// ---------------------------------------------------------------------------------------------

export const INTERACTION_ACTIONS = [
  'OPTION_SELECTED',
  'ATOM_CLICKED',
  'SLIDER_CHANGED',
  'STRUCTURE_MATCHED',
  'STEP_SUBMITTED',
  'HINT_REQUESTED',
] as const;

export const SESSION_ID_PATTERN = /^[A-Za-z0-9_-]{8,64}$/;

export const StudentInteractionEventSchema = z.object({
  type: z.literal('student_interaction'),
  sessionId: z.string().regex(SESSION_ID_PATTERN),
  conceptId: z.string().min(1).max(100),
  widgetType: z.string().min(1).max(64),
  action: z.enum(INTERACTION_ACTIONS),
  /** Widget-specific, small. For choice widgets: { selectedOptionIds: string[] }. */
  payload: z.record(z.unknown()),
  hesitationTimeMs: z.number().int().min(0).max(3_600_000),
  /** Wrong attempts + hint requests so far, INCLUDING this one when it is wrong. */
  attemptCount: z.number().int().min(0).max(50),
  timestamp: z.number(),
});
export type StudentInteractionEvent = z.infer<typeof StudentInteractionEventSchema>;

// ---------------------------------------------------------------------------------------------
// Tutor -> student
// ---------------------------------------------------------------------------------------------

export const SCAFFOLD_LEVELS = ['nudge', 'clue', 'remediation', 'mastery'] as const;
export type ScaffoldLevel = (typeof SCAFFOLD_LEVELS)[number];

/** Closed vocabulary: the model can never invent a whiteboard operation. */
export const WHITEBOARD_COMMANDS = [
  'RESET_SELECTION',
  'ELIMINATE_OPTION',
  'HIGHLIGHT_OPTION',
  'HIGHLIGHT_ATOM',
  'PULSE_SUBSTRUCTURE',
  'SHOW_SLIDE_CITATION',
] as const;

export const WhiteboardCommandSchema = z.object({
  command: z.enum(WHITEBOARD_COMMANDS),
  target: z.string().max(80).optional(),
});
export type WhiteboardCommand = z.infer<typeof WhiteboardCommandSchema>;

export const AiTutorActionSchema = z.object({
  type: z.literal('ai_tutor_action'),
  conceptId: z.string(),
  tutorMessage: tutorText,
  scaffoldLevel: z.enum(SCAFFOLD_LEVELS),
  isCorrect: z.boolean(),
  slideCitation: z.object({
    deck: z.string(),
    slideNumbers: z.array(z.number().int().positive()).min(1),
  }),
  whiteboardCommands: z.array(WhiteboardCommandSchema).max(4),
  isComplete: z.boolean(),
  masteryDelta: z.number().min(-0.2).max(0.5),
  /** 'ladder' = reviewed pre-written text; 'llm' = model phrasing that passed validation. */
  messageSource: z.enum(['ladder', 'llm']),
});
export type AiTutorAction = z.infer<typeof AiTutorActionSchema>;

/** The ONLY thing the language model is allowed to produce. */
export const LlmTutorOutputSchema = z.object({ tutorMessage: tutorText });
export type LlmTutorOutput = z.infer<typeof LlmTutorOutputSchema>;

// ---------------------------------------------------------------------------------------------
// Lecture concept (runtime shape of a reviewed `.teaching.md` block)
// ---------------------------------------------------------------------------------------------

export const MisconceptionSchema = z.object({
  diagnosis: z.string().min(1),
  slides: z.array(z.number().int().positive()),
});

export const ConceptWidgetSchema = z.object({
  type: z.string().min(1),
  config: z.record(z.unknown()),
});

export const LectureConceptSchema = z.object({
  id: z.string().min(1),
  courseId: z.string().min(1),
  lectureSlug: z.string().min(1),
  sortOrder: z.number().int(),
  sourceDeck: z.string().min(1),
  slideNumbers: z.array(z.number().int().positive()).min(1),
  conceptTitle: z.string().min(1),
  scientificSummary: z.string().min(1),
  recommendedWidget: z.string().min(1),
  /** null while the widget config is not yet human-verified; such concepts are not served. */
  widget: ConceptWidgetSchema.nullable(),
  studentTask: tutorText,
  scaffoldingLadder: z.tuple([tutorText, tutorText, tutorText]),
  misconceptionMap: z.record(MisconceptionSchema),
  status: z.enum(['draft', 'verified']),
});
export type LectureConcept = z.infer<typeof LectureConceptSchema>;

/** Row shape of public.lecture_concepts (snake_case). */
export interface LectureConceptRow {
  id: string;
  course_id: string;
  lecture_slug: string;
  sort_order: number;
  source_deck: string;
  slide_numbers: number[];
  concept_title: string;
  scientific_summary: string;
  recommended_widget: string;
  initial_widget_state: { type: string; config: Record<string, unknown> } | null;
  student_task: string;
  scaffolding_ladder: string[];
  misconception_map: Record<string, { diagnosis: string; slides: number[] }>;
  status: 'draft' | 'verified';
}

export function conceptFromRow(row: LectureConceptRow): LectureConcept {
  return LectureConceptSchema.parse({
    id: row.id,
    courseId: row.course_id,
    lectureSlug: row.lecture_slug,
    sortOrder: row.sort_order,
    sourceDeck: row.source_deck,
    slideNumbers: row.slide_numbers,
    conceptTitle: row.concept_title,
    scientificSummary: row.scientific_summary,
    recommendedWidget: row.recommended_widget,
    widget: row.initial_widget_state,
    studentTask: row.student_task,
    scaffoldingLadder: row.scaffolding_ladder,
    misconceptionMap: row.misconception_map,
    status: row.status,
  });
}

// ---------------------------------------------------------------------------------------------
// Attempt evaluation (server-side truth: never trust a client-supplied "correct" flag)
// ---------------------------------------------------------------------------------------------

export interface ChoiceOption {
  id: string;
  isCorrect: boolean;
}

export interface AttemptEvaluation {
  /** false when the widget type is not evaluable on the server (then the client verdict is NOT used). */
  evaluable: boolean;
  isCorrect: boolean;
  /** Option ids of wrong picks. By authoring convention a wrong option id IS its misconception key. */
  misconceptionKeys: string[];
}

const CHOICE_WIDGETS = new Set(['MultipleChoice', 'PredictThenReveal']);

function readOptions(config: Record<string, unknown>): ChoiceOption[] {
  const raw = config['options'];
  if (!Array.isArray(raw)) return [];
  const out: ChoiceOption[] = [];
  for (const item of raw) {
    if (item && typeof item === 'object') {
      const rec = item as Record<string, unknown>;
      if (typeof rec['id'] === 'string' && typeof rec['isCorrect'] === 'boolean') {
        out.push({ id: rec['id'], isCorrect: rec['isCorrect'] });
      }
    }
  }
  return out;
}

export function evaluateAttempt(
  widgetType: string,
  config: Record<string, unknown>,
  payload: Record<string, unknown>
): AttemptEvaluation {
  if (!CHOICE_WIDGETS.has(widgetType)) {
    return { evaluable: false, isCorrect: false, misconceptionKeys: [] };
  }
  const options = readOptions(config);
  const selectedRaw = payload['selectedOptionIds'];
  const selected = Array.isArray(selectedRaw)
    ? selectedRaw.filter((v): v is string => typeof v === 'string')
    : [];
  const known = new Set(options.map((o) => o.id));
  const picked = new Set(selected.filter((id) => known.has(id)));
  const correctIds = options.filter((o) => o.isCorrect).map((o) => o.id);
  const wrongPicked = [...picked].filter((id) => !correctIds.includes(id));
  const isCorrect =
    picked.size > 0 &&
    wrongPicked.length === 0 &&
    correctIds.length === picked.size &&
    correctIds.every((id) => picked.has(id));
  return { evaluable: true, isCorrect, misconceptionKeys: wrongPicked };
}

// ---------------------------------------------------------------------------------------------
// Scaffolding engine
// ---------------------------------------------------------------------------------------------

/**
 * Socratic nudge -> visual clue -> remediation. Correct answers always end in 'mastery'.
 * `attemptCount` = wrong attempts + hint requests so far (this event included).
 */
export function nextScaffoldLevel(isCorrect: boolean, attemptCount: number): ScaffoldLevel {
  if (isCorrect) return 'mastery';
  if (attemptCount <= 1) return 'nudge';
  if (attemptCount === 2) return 'clue';
  return 'remediation';
}

/** Mastery gain shrinks as more scaffolding was needed. Always inside [-0.2, 0.5]. */
export function computeMasteryDelta(isCorrect: boolean, attemptCount: number): number {
  if (!isCorrect) return attemptCount <= 1 ? -0.05 : 0;
  if (attemptCount === 0) return 0.3;
  if (attemptCount === 1) return 0.2;
  if (attemptCount === 2) return 0.1;
  return 0.05;
}

export function applyMasteryDelta(previous: number, delta: number): number {
  const next = previous + delta;
  return Math.min(1, Math.max(0, Math.round(next * 1000) / 1000));
}

export const MASTERY_THRESHOLD = 0.7;

function firstWrongOptionNotPicked(
  config: Record<string, unknown>,
  picked: string[]
): string | undefined {
  return readOptions(config).find((o) => !o.isCorrect && !picked.includes(o.id))?.id;
}

function buildCommands(
  level: ScaffoldLevel,
  concept: LectureConcept,
  picked: string[]
): WhiteboardCommand[] {
  const config = concept.widget?.config ?? {};
  switch (level) {
    case 'nudge':
      return [{ command: 'RESET_SELECTION' }];
    case 'clue': {
      const wrong = firstWrongOptionNotPicked(config, picked);
      return wrong
        ? [{ command: 'ELIMINATE_OPTION', target: wrong }, { command: 'RESET_SELECTION' }]
        : [{ command: 'RESET_SELECTION' }];
    }
    case 'remediation': {
      const correct = readOptions(config).find((o) => o.isCorrect)?.id;
      const cmds: WhiteboardCommand[] = [];
      if (correct) cmds.push({ command: 'HIGHLIGHT_OPTION', target: correct });
      cmds.push({ command: 'SHOW_SLIDE_CITATION' });
      return cmds;
    }
    default:
      return [];
  }
}

export const MASTERY_MESSAGE =
  'Doğru! Bu kavramı slayttaki bilgiyle uyumlu biçimde çözdün. Sıradaki kavrama geçebiliriz.';

/** The reviewed, deterministic reply. Also the safety net when the model is unavailable or invalid. */
export function buildLadderAction(args: {
  concept: LectureConcept;
  isCorrect: boolean;
  attemptCount: number;
  pickedOptionIds: string[];
  misconceptionKeys: string[];
}): AiTutorAction {
  const { concept, isCorrect, attemptCount, pickedOptionIds, misconceptionKeys } = args;
  const level = nextScaffoldLevel(isCorrect, attemptCount);
  const ladderIndex = level === 'nudge' ? 0 : level === 'clue' ? 1 : 2;
  const known = misconceptionKeys
    .map((k) => concept.misconceptionMap[k])
    .find((m): m is NonNullable<typeof m> => m !== undefined);
  const slides = level === 'mastery' || !known ? concept.slideNumbers : known.slides;
  const message = level === 'mastery' ? MASTERY_MESSAGE : concept.scaffoldingLadder[ladderIndex];

  return AiTutorActionSchema.parse({
    type: 'ai_tutor_action',
    conceptId: concept.id,
    tutorMessage: message,
    scaffoldLevel: level,
    isCorrect,
    slideCitation: {
      deck: concept.sourceDeck,
      slideNumbers: slides.length > 0 ? slides : concept.slideNumbers,
    },
    whiteboardCommands: buildCommands(level, concept, pickedOptionIds),
    isComplete: isCorrect || level === 'remediation',
    masteryDelta: computeMasteryDelta(isCorrect, attemptCount),
    messageSource: 'ladder',
  });
}

/**
 * Cheap grounding guard for model text: every number the model writes must already occur in the
 * concept's own reviewed text. Blocks invented figures without needing a second model call.
 */
export function numbersAreGrounded(message: string, concept: LectureConcept): boolean {
  const corpus = [
    concept.scientificSummary,
    concept.studentTask,
    ...concept.scaffoldingLadder,
    ...Object.values(concept.misconceptionMap).map((m) => m.diagnosis),
  ].join(' ');
  const numbers = message.match(/\d+(?:[.,]\d+)?/g) ?? [];
  return numbers.every((n) => corpus.includes(n));
}

/** Mastery summary used by the dashboard. */
export function readinessPercent(masteryScores: number[], totalConcepts: number): number {
  if (totalConcepts <= 0) return 0;
  const sum = masteryScores.reduce((acc, s) => acc + Math.min(1, Math.max(0, s)), 0);
  return Math.round((sum / totalConcepts) * 100);
}
