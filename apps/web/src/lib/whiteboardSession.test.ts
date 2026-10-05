import { describe, it, expect } from 'vitest';
import {
  buildDailySession,
  daysUntilExam,
  getAllConcepts,
  getLectures,
  loadLocalMastery,
  localTutorFallback,
  mergeMastery,
  newSessionId,
  saveLocalMastery,
  type Lecture,
} from './whiteboardSession';
import { AiTutorActionSchema, SESSION_ID_PATTERN } from '@pharmacy/widgets';

const memoryStorage = () => {
  const data = new Map<string, string>();
  return {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
  };
};

describe('bundled lecture knowledge', () => {
  it('serves only concepts that have a widget, in teaching order', () => {
    const lectures = getLectures();
    expect(lectures.length).toBeGreaterThan(0);
    for (const l of lectures) {
      expect(l.concepts.every((c) => c.widget !== null)).toBe(true);
      const orders = l.concepts.map((c) => c.sortOrder);
      expect([...orders].sort((a, b) => a - b)).toEqual(orders);
    }
    expect(getAllConcepts().length).toBeGreaterThanOrEqual(getLectures().flatMap((l) => l.concepts).length);
  });
});

describe('newSessionId', () => {
  it('matches the server-side session pattern and is unique', () => {
    const a = newSessionId();
    expect(a).toMatch(SESSION_ID_PATTERN);
    expect(newSessionId()).not.toBe(a);
  });
});

describe('daysUntilExam', () => {
  const now = new Date(2026, 9, 5, 15, 30); // 5 Oct 2026, afternoon
  it('counts whole calendar days regardless of the time of day', () => {
    expect(daysUntilExam('2026-10-06', now)).toBe(1);
    expect(daysUntilExam('2026-11-02', now)).toBe(28);
    expect(daysUntilExam('2026-10-05', now)).toBe(0);
    expect(daysUntilExam('2026-10-01', now)).toBe(-4);
  });
  it('returns null for unset or malformed dates (never NaN)', () => {
    expect(daysUntilExam(undefined, now)).toBeNull();
    expect(daysUntilExam('', now)).toBeNull();
    expect(daysUntilExam('05.10.2026', now)).toBeNull();
    expect(daysUntilExam('2026-02-31', now)).toBeNull();
  });
});

describe('local mastery storage', () => {
  it('round-trips and clamps to [0,1]', () => {
    const s = memoryStorage();
    saveLocalMastery({ a: 0.4, b: 3 }, s);
    s.setItem('pep.mastery.v1', JSON.stringify({ a: 0.4, b: 3, c: -2, d: 'x', e: null }));
    expect(loadLocalMastery(s)).toEqual({ a: 0.4, b: 1, c: 0 });
  });
  it('survives corrupt JSON, non-objects, and missing storage', () => {
    const s = memoryStorage();
    s.setItem('pep.mastery.v1', '{not json');
    expect(loadLocalMastery(s)).toEqual({});
    s.setItem('pep.mastery.v1', '42');
    expect(loadLocalMastery(s)).toEqual({});
    expect(loadLocalMastery(undefined)).toEqual({});
  });
  it('save never throws when storage is full/blocked', () => {
    expect(() =>
      saveLocalMastery({ a: 1 }, {
        setItem: () => {
          throw new Error('QuotaExceededError');
        },
      })
    ).not.toThrow();
  });
  it('merge keeps the higher value from either side', () => {
    expect(mergeMastery({ a: 0.2, b: 0.9 }, { a: 0.6, c: 0.1 })).toEqual({ a: 0.6, b: 0.9, c: 0.1 });
  });
});

describe('buildDailySession', () => {
  const concept = (id: string) => ({ id }) as Lecture['concepts'][number];
  const lectures: Lecture[] = [
    { slug: 'l1', courseId: 'medchem', deck: 'd1', concepts: ['a', 'b', 'c', 'd'].map(concept) },
    { slug: 'l2', courseId: 'medchem', deck: 'd2', concepts: ['e', 'f'].map(concept) },
  ];
  it('puts the 3 weakest first, then the newest lecture, without duplicates', () => {
    const ids = buildDailySession(lectures, { a: 0.1, b: 0.3, c: 0.5, d: 0.95, e: 0.2 });
    // f (unseen = 0), a (0.1), e (0.2) are the weakest; newest lecture adds nothing new
    expect(ids).toEqual(['f', 'a', 'e']);
  });
  it('is empty when everything is mastered and respects the limit', () => {
    expect(buildDailySession(lectures, Object.fromEntries('abcdef'.split('').map((k) => [k, 1])))).toEqual([]);
    expect(buildDailySession(lectures, {}, 2)).toHaveLength(2);
  });
});

describe('localTutorFallback (same engine as the Edge Function)', () => {
  const concept = getAllConcepts().find((c) => c.widget?.type === 'MultipleChoice')!;
  const options = (concept.widget!.config as { options: { id: string; isCorrect: boolean }[] }).options;
  const wrong = options.find((o) => !o.isCorrect)!;
  const right = options.find((o) => o.isCorrect)!;
  const base = {
    type: 'student_interaction' as const,
    sessionId: 'sess_12345678',
    conceptId: concept.id,
    widgetType: 'MultipleChoice',
    action: 'OPTION_SELECTED' as const,
    hesitationTimeMs: 0,
    timestamp: 1,
  };

  it('walks the reviewed ladder on repeated wrong answers and validates against the protocol', () => {
    const fb = localTutorFallback(concept);
    const levels = [1, 2, 3].map((n) =>
      fb({ ...base, payload: { selectedOptionIds: [wrong.id] }, attemptCount: n })
    );
    expect(levels.map((a) => a.scaffoldLevel)).toEqual(['nudge', 'clue', 'remediation']);
    expect(levels.map((a) => a.tutorMessage)).toEqual([...concept.scaffoldingLadder]);
    levels.forEach((a) => expect(() => AiTutorActionSchema.parse(a)).not.toThrow());
    expect(levels[2]!.isComplete).toBe(true);
  });

  it('judges correctness itself and completes on the right option', () => {
    const a = localTutorFallback(concept)({ ...base, payload: { selectedOptionIds: [right.id] }, attemptCount: 0 });
    expect(a.isCorrect).toBe(true);
    expect(a.scaffoldLevel).toBe('mastery');
    expect(a.isComplete).toBe(true);
    expect(a.masteryDelta).toBeGreaterThan(0);
  });

  it('a hint request never changes mastery and never resets the student selection', () => {
    const a = localTutorFallback(concept)({ ...base, action: 'HINT_REQUESTED', payload: {}, attemptCount: 1 });
    expect(a.masteryDelta).toBe(0);
    expect(a.isCorrect).toBe(false);
    expect(a.whiteboardCommands.some((c) => c.command === 'RESET_SELECTION')).toBe(false);
  });
});
