import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  AiTutorActionSchema,
  StudentInteractionEventSchema,
  applyMasteryDelta,
  buildLadderAction,
  computeMasteryDelta,
  conceptFromRow,
  evaluateAttempt,
  nextScaffoldLevel,
  numbersAreGrounded,
  readinessPercent,
  LectureConceptSchema,
  type LectureConcept,
} from './whiteboard.ts';
import { parseTeachingMd, contextFromPath } from '../../../scripts/lib/teaching-md.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const TEACHING = path.join(ROOT, 'courses/medchem/teaching/hafta-01-reseptor-etkilesimleri.teaching.md');

function loadConcepts(): LectureConcept[] {
  const parsed = parseTeachingMd(fs.readFileSync(TEACHING, 'utf8'), contextFromPath(TEACHING));
  expect(parsed.errors).toEqual([]);
  return parsed.concepts.map((c) => LectureConceptSchema.parse(c));
}

const ionic = () => loadConcepts().find((c) => c.id === 'rr:iyonik_bag')!;

describe('scaffolding ladder', () => {
  it('escalates nudge -> clue -> remediation and ends in mastery on a correct answer', () => {
    expect(nextScaffoldLevel(false, 1)).toBe('nudge');
    expect(nextScaffoldLevel(false, 2)).toBe('clue');
    expect(nextScaffoldLevel(false, 3)).toBe('remediation');
    expect(nextScaffoldLevel(false, 9)).toBe('remediation');
    expect(nextScaffoldLevel(true, 0)).toBe('mastery');
    expect(nextScaffoldLevel(true, 5)).toBe('mastery');
  });

  it('mastery delta shrinks with scaffolding and always stays inside [-0.2, 0.5]', () => {
    expect(computeMasteryDelta(true, 0)).toBeGreaterThan(computeMasteryDelta(true, 1));
    expect(computeMasteryDelta(true, 1)).toBeGreaterThan(computeMasteryDelta(true, 3));
    for (const correct of [true, false]) {
      for (let n = 0; n <= 50; n++) {
        const d = computeMasteryDelta(correct, n);
        expect(d).toBeGreaterThanOrEqual(-0.2);
        expect(d).toBeLessThanOrEqual(0.5);
      }
    }
  });

  it('clamps mastery to [0,1]', () => {
    expect(applyMasteryDelta(0.9, 0.5)).toBe(1);
    expect(applyMasteryDelta(0.02, -0.2)).toBe(0);
    expect(applyMasteryDelta(0.5, 0.3)).toBe(0.8);
  });

  it('readiness is the mean mastery over ALL concepts (untouched concepts count as 0)', () => {
    expect(readinessPercent([], 10)).toBe(0);
    expect(readinessPercent([1, 1], 10)).toBe(20);
    expect(readinessPercent([2, -1], 4)).toBe(25); // clamped
    expect(readinessPercent([1], 0)).toBe(0);
  });
});

describe('attempt evaluation (server-side truth)', () => {
  it('judges choice widgets from the stored config, ignoring anything else the client says', () => {
    const c = ionic();
    const cfg = c.widget!.config;
    expect(evaluateAttempt('PredictThenReveal', cfg, { selectedOptionIds: ['correct'] })).toMatchObject({
      evaluable: true,
      isCorrect: true,
      misconceptionKeys: [],
    });
    expect(
      evaluateAttempt('PredictThenReveal', cfg, { selectedOptionIds: ['DISTANCE_NO_EFFECT'], isCorrect: true })
    ).toMatchObject({ isCorrect: false, misconceptionKeys: ['DISTANCE_NO_EFFECT'] });
  });

  it('rejects empty, unknown and mixed selections', () => {
    const cfg = ionic().widget!.config;
    expect(evaluateAttempt('PredictThenReveal', cfg, { selectedOptionIds: [] }).isCorrect).toBe(false);
    expect(evaluateAttempt('PredictThenReveal', cfg, { selectedOptionIds: ['nope'] }).isCorrect).toBe(false);
    expect(evaluateAttempt('PredictThenReveal', cfg, {}).isCorrect).toBe(false);
    const mixed = evaluateAttempt('PredictThenReveal', cfg, { selectedOptionIds: ['correct', 'SOLVENT_IRRELEVANT'] });
    expect(mixed.isCorrect).toBe(false);
    expect(mixed.misconceptionKeys).toEqual(['SOLVENT_IRRELEVANT']);
  });

  it('marks non-choice widgets as not server-evaluable', () => {
    expect(evaluateAttempt('StructureIdentifier', {}, {}).evaluable).toBe(false);
  });
});

describe('ladder action', () => {
  const concept = ionic();
  const base = { concept, pickedOptionIds: ['DISTANCE_NO_EFFECT'], misconceptionKeys: ['DISTANCE_NO_EFFECT'] };

  it('nudge on first miss: reviewed ladder text, misconception slide cited, selection reset', () => {
    const a = buildLadderAction({ ...base, isCorrect: false, attemptCount: 1 });
    expect(a.scaffoldLevel).toBe('nudge');
    expect(a.tutorMessage).toBe(concept.scaffoldingLadder[0]);
    expect(a.slideCitation.slideNumbers).toEqual([13]);
    expect(a.whiteboardCommands).toEqual([{ command: 'RESET_SELECTION' }]);
    expect(a.isComplete).toBe(false);
    expect(a.messageSource).toBe('ladder');
  });

  it('clue on second miss eliminates a wrong option the student did not pick', () => {
    const a = buildLadderAction({ ...base, isCorrect: false, attemptCount: 2 });
    expect(a.scaffoldLevel).toBe('clue');
    const elim = a.whiteboardCommands.find((c) => c.command === 'ELIMINATE_OPTION');
    expect(elim?.target).toBeDefined();
    expect(elim?.target).not.toBe('correct');
    expect(elim?.target).not.toBe('DISTANCE_NO_EFFECT');
  });

  it('remediation on third miss highlights the correct option and completes the step', () => {
    const a = buildLadderAction({ ...base, isCorrect: false, attemptCount: 3 });
    expect(a.scaffoldLevel).toBe('remediation');
    expect(a.whiteboardCommands[0]).toEqual({ command: 'HIGHLIGHT_OPTION', target: 'correct' });
    expect(a.whiteboardCommands.some((c) => c.command === 'SHOW_SLIDE_CITATION')).toBe(true);
    expect(a.isComplete).toBe(true);
  });

  it('correct answer gives mastery with the concept citation', () => {
    const a = buildLadderAction({ concept, isCorrect: true, attemptCount: 0, pickedOptionIds: ['correct'], misconceptionKeys: [] });
    expect(a.scaffoldLevel).toBe('mastery');
    expect(a.isComplete).toBe(true);
    expect(a.masteryDelta).toBe(0.3);
    expect(a.slideCitation.slideNumbers).toEqual(concept.slideNumbers);
  });

  it('every action validates against the output schema', () => {
    for (const c of loadConcepts().filter((x) => x.widget)) {
      for (const [isCorrect, n] of [[false, 1], [false, 2], [false, 3], [true, 0], [true, 2]] as const) {
        expect(() =>
          AiTutorActionSchema.parse(
            buildLadderAction({ concept: c, isCorrect, attemptCount: n, pickedOptionIds: [], misconceptionKeys: [] })
          )
        ).not.toThrow();
      }
    }
  });
});

describe('protocol schemas', () => {
  const ok = {
    type: 'student_interaction',
    sessionId: 'abcdefgh12345678',
    conceptId: 'rr:iyonik_bag',
    widgetType: 'PredictThenReveal',
    action: 'OPTION_SELECTED',
    payload: { selectedOptionIds: ['correct'] },
    hesitationTimeMs: 1200,
    attemptCount: 0,
    timestamp: 1,
  };

  it('accepts a well-formed event', () => {
    expect(StudentInteractionEventSchema.safeParse(ok).success).toBe(true);
  });

  it.each([
    ['unknown action', { ...ok, action: 'DROP_TABLE' }],
    ['session id with path characters', { ...ok, sessionId: '../../etc/passwd' }],
    ['session id too short', { ...ok, sessionId: 'abc' }],
    ['negative hesitation', { ...ok, hesitationTimeMs: -1 }],
    ['absurd attempt count', { ...ok, attemptCount: 10_000 }],
    ['fractional attempts', { ...ok, attemptCount: 1.5 }],
    ['missing payload', { ...ok, payload: undefined }],
  ])('rejects %s', (_name, bad) => {
    expect(StudentInteractionEventSchema.safeParse(bad).success).toBe(false);
  });

  it('rejects tutor output over 40 words or with an unknown command', () => {
    const action = buildLadderAction({
      concept: ionic(), isCorrect: false, attemptCount: 1, pickedOptionIds: [], misconceptionKeys: [],
    });
    const long = Array.from({ length: 41 }, () => 'kelime').join(' ');
    expect(AiTutorActionSchema.safeParse({ ...action, tutorMessage: long }).success).toBe(false);
    expect(
      AiTutorActionSchema.safeParse({ ...action, whiteboardCommands: [{ command: 'RUN_JS', target: 'x' }] }).success
    ).toBe(false);
    expect(AiTutorActionSchema.safeParse({ ...action, masteryDelta: 0.9 }).success).toBe(false);
  });
});

describe('grounding guard', () => {
  const c = ionic();
  it('allows numbers that occur in the reviewed text and blocks invented ones', () => {
    expect(numbersAreGrounded('Slayt 13e bak: mesafe artınca ne olur?', c)).toBe(true);
    expect(numbersAreGrounded('Bağ enerjisi yaklaşık 42 kcal/mol olur.', c)).toBe(false);
    expect(numbersAreGrounded('Sayısız yük var.', c)).toBe(true);
  });
});

describe('row mapping', () => {
  it('rejects rows whose ladder is not exactly 3 tiers', () => {
    const c = ionic();
    expect(() =>
      conceptFromRow({
        id: c.id, course_id: c.courseId, lecture_slug: c.lectureSlug, sort_order: 1, source_deck: c.sourceDeck,
        slide_numbers: c.slideNumbers, concept_title: c.conceptTitle, scientific_summary: c.scientificSummary,
        recommended_widget: c.recommendedWidget, initial_widget_state: c.widget, student_task: c.studentTask,
        scaffolding_ladder: ['only one'], misconception_map: c.misconceptionMap, status: 'verified',
      })
    ).toThrow();
  });
});
