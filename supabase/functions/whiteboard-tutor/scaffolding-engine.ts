import {
  AiTutorActionSchema,
  buildLadderAction,
  countWords,
  evaluateAttempt,
  MAX_TUTOR_WORDS,
  numbersAreGrounded,
  type AiTutorAction,
  type LectureConcept,
  type StudentInteractionEvent,
} from '../_shared/whiteboard.ts';
import { buildUserPrompt, SYSTEM_PROMPT } from './prompt-templates.ts';
import type { LlmCallResult } from './openrouter.ts';

export type TutorLlm = (system: string, user: string) => Promise<LlmCallResult | null>;

export interface TutorRunResult {
  action: AiTutorAction;
  /** Model that produced the message, when messageSource === 'llm'. */
  model: string | null;
  promptTokens: number | null;
  completionTokens: number | null;
  /** true when we attempted a model call (even if it failed) - used for cost accounting */
  llmAttempted: boolean;
}

export class TutorInputError extends Error {
  constructor(
    public readonly code: 'unsupported_widget' | 'concept_mismatch' | 'no_widget',
    message: string
  ) {
    super(message);
    this.name = 'TutorInputError';
  }
}

function pickedIds(payload: Record<string, unknown>): string[] {
  const raw = payload['selectedOptionIds'];
  return Array.isArray(raw) ? raw.filter((v): v is string => typeof v === 'string').slice(0, 5) : [];
}

/**
 * One tutor turn. Correctness is decided here from the stored concept (never from the client).
 * The language model may only rephrase the reviewed ladder message for wrong attempts / hints;
 * if it is unavailable, disabled, off-topic, too long or invents numbers, the reviewed text is served.
 */
export async function runTutorTurn(args: {
  event: StudentInteractionEvent;
  concept: LectureConcept;
  llm: TutorLlm | null;
}): Promise<TutorRunResult> {
  const { event, concept, llm } = args;
  if (event.conceptId !== concept.id) {
    throw new TutorInputError('concept_mismatch', 'Event concept does not match the loaded concept');
  }
  if (!concept.widget) {
    throw new TutorInputError('no_widget', 'Concept has no verified widget configuration');
  }

  const isHint = event.action === 'HINT_REQUESTED';
  const picked = isHint ? [] : pickedIds(event.payload);
  let isCorrect = false;
  let misconceptionKeys: string[] = [];
  if (!isHint) {
    const evaluation = evaluateAttempt(concept.widget.type, concept.widget.config, event.payload);
    if (!evaluation.evaluable) {
      throw new TutorInputError('unsupported_widget', `Widget ${concept.widget.type} is not evaluable on the server yet`);
    }
    isCorrect = evaluation.isCorrect;
    misconceptionKeys = evaluation.misconceptionKeys;
  }

  const attemptCount = isHint ? Math.max(1, event.attemptCount) : event.attemptCount;
  let action = buildLadderAction({
    concept,
    isCorrect,
    attemptCount,
    pickedOptionIds: picked,
    misconceptionKeys,
  });
  if (isHint) {
    action = AiTutorActionSchema.parse({
      ...action,
      masteryDelta: 0,
      whiteboardCommands: action.whiteboardCommands.filter((c) => c.command !== 'RESET_SELECTION'),
    });
  }

  const result: TutorRunResult = {
    action,
    model: null,
    promptTokens: null,
    completionTokens: null,
    llmAttempted: false,
  };

  if (!llm || action.scaffoldLevel === 'mastery') return result;

  result.llmAttempted = true;
  const diagnosis = misconceptionKeys
    .map((k) => concept.misconceptionMap[k]?.diagnosis)
    .find((d): d is string => d !== undefined);
  const reply = await llm(
    SYSTEM_PROMPT,
    buildUserPrompt({
      concept,
      level: action.scaffoldLevel,
      referenceMessage: action.tutorMessage,
      misconceptionDiagnosis: diagnosis,
    })
  );
  if (!reply) return result;

  const message = reply.output.tutorMessage.trim();
  if (countWords(message) > MAX_TUTOR_WORDS || !numbersAreGrounded(message, concept)) return result;

  return {
    action: AiTutorActionSchema.parse({ ...action, tutorMessage: message, messageSource: 'llm' }),
    model: reply.model,
    promptTokens: reply.promptTokens,
    completionTokens: reply.completionTokens,
    llmAttempted: true,
  };
}
