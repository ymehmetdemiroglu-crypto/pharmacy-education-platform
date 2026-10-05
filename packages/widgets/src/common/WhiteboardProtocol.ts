/**
 * Whiteboard protocol (client entry point).
 *
 * The canonical definitions live in supabase/functions/_shared/whiteboard.ts so the browser and the
 * Edge Function can never drift apart. They are re-exported here so widgets/app code imports from
 * `@pharmacy/widgets` like everything else.
 */
export {
  AiTutorActionSchema,
  INTERACTION_ACTIONS,
  LectureConceptSchema,
  LlmTutorOutputSchema,
  MASTERY_THRESHOLD,
  MAX_TUTOR_WORDS,
  SCAFFOLD_LEVELS,
  SESSION_ID_PATTERN,
  StudentInteractionEventSchema,
  WHITEBOARD_COMMANDS,
  WhiteboardCommandSchema,
  applyMasteryDelta,
  buildLadderAction,
  conceptFromRow,
  countWords,
  evaluateAttempt,
  nextScaffoldLevel,
  readinessPercent,
} from '../../../../supabase/functions/_shared/whiteboard';
export type {
  AiTutorAction,
  AttemptEvaluation,
  LectureConcept,
  LectureConceptRow,
  ScaffoldLevel,
  StudentInteractionEvent,
  WhiteboardCommand,
} from '../../../../supabase/functions/_shared/whiteboard';
