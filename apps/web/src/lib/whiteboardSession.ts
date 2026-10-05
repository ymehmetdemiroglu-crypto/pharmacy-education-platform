import {
  LectureConceptSchema,
  MASTERY_THRESHOLD,
  buildLadderAction,
  evaluateAttempt,
  type AiTutorAction,
  type LectureConcept,
  type StudentInteractionEvent,
  type WhiteboardSupabaseLike,
} from '@pharmacy/widgets';
import generated from '../data/teaching.concepts.generated.json';

// ---------------------------------------------------------------------------------------------
// Concepts (bundled copy generated from courses/*/teaching/*.teaching.md by scripts/ingest-teaching-md.mjs)
// ---------------------------------------------------------------------------------------------

export interface Lecture {
  slug: string;
  courseId: string;
  deck: string;
  concepts: LectureConcept[];
}

/** Only concepts that have a widget configuration can be taught. */
const ALL: LectureConcept[] = (generated as unknown[])
  .map((raw) => LectureConceptSchema.parse(raw))
  .filter((c) => c.widget !== null)
  .sort((a, b) => a.lectureSlug.localeCompare(b.lectureSlug) || a.sortOrder - b.sortOrder);

export function getLectures(courseId = 'medchem'): Lecture[] {
  const bySlug = new Map<string, Lecture>();
  for (const c of ALL.filter((x) => x.courseId === courseId)) {
    const existing = bySlug.get(c.lectureSlug);
    if (existing) existing.concepts.push(c);
    else bySlug.set(c.lectureSlug, { slug: c.lectureSlug, courseId: c.courseId, deck: c.sourceDeck, concepts: [c] });
  }
  return [...bySlug.values()];
}

export function getAllConcepts(courseId = 'medchem'): LectureConcept[] {
  return ALL.filter((c) => c.courseId === courseId);
}

// ---------------------------------------------------------------------------------------------
// Sessions
// ---------------------------------------------------------------------------------------------

/** 8-64 chars of [A-Za-z0-9_-] (matches SESSION_ID_PATTERN). */
export function newSessionId(): string {
  const uuid =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
  return `s_${uuid.replace(/[^A-Za-z0-9]/g, '')}`.slice(0, 64);
}

/** Same deterministic engine the Edge Function uses, run locally (offline / not-deployed / guest). */
export function localTutorFallback(concept: LectureConcept) {
  return (event: StudentInteractionEvent): AiTutorAction => {
    const isHint = event.action === 'HINT_REQUESTED';
    const evaluation = isHint
      ? { isCorrect: false, misconceptionKeys: [] as string[] }
      : evaluateAttempt(concept.widget?.type ?? '', concept.widget?.config ?? {}, event.payload);
    const picked = Array.isArray(event.payload['selectedOptionIds'])
      ? (event.payload['selectedOptionIds'] as unknown[]).filter((v): v is string => typeof v === 'string')
      : [];
    const action = buildLadderAction({
      concept,
      isCorrect: evaluation.isCorrect,
      attemptCount: isHint ? Math.max(1, event.attemptCount) : event.attemptCount,
      pickedOptionIds: picked,
      misconceptionKeys: evaluation.misconceptionKeys,
    });
    return isHint
      ? {
          ...action,
          masteryDelta: 0,
          whiteboardCommands: action.whiteboardCommands.filter((c) => c.command !== 'RESET_SELECTION'),
        }
      : action;
  };
}

/** Stand-in client for signed-out users: every call fails fast so the local fallback answers. */
export const offlineSupabase: WhiteboardSupabaseLike = {
  channel: () => {
    const ch = { on: () => ch, subscribe: () => undefined };
    return ch;
  },
  removeChannel: () => undefined,
  functions: { invoke: async () => ({ data: null, error: { message: 'offline' } }) },
};

// ---------------------------------------------------------------------------------------------
// Local mastery (guest / offline mirror of student_concept_mastery)
// ---------------------------------------------------------------------------------------------

const MASTERY_KEY = 'pep.mastery.v1';
export type MasteryMap = Record<string, number>;

export function loadLocalMastery(storage: Pick<Storage, 'getItem'> | undefined = safeStorage()): MasteryMap {
  if (!storage) return {};
  try {
    const raw = JSON.parse(storage.getItem(MASTERY_KEY) ?? '{}') as unknown;
    if (!raw || typeof raw !== 'object') return {};
    const out: MasteryMap = {};
    for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
      if (typeof v === 'number' && Number.isFinite(v)) out[k] = Math.min(1, Math.max(0, v));
    }
    return out;
  } catch {
    return {};
  }
}

export function saveLocalMastery(map: MasteryMap, storage: Pick<Storage, 'setItem'> | undefined = safeStorage()): void {
  try {
    storage?.setItem(MASTERY_KEY, JSON.stringify(map));
  } catch {
    // storage full / blocked (private mode): progress simply is not persisted
  }
}

/** Server value wins when higher; neither source can silently erase the other. */
export function mergeMastery(local: MasteryMap, server: MasteryMap): MasteryMap {
  const out: MasteryMap = { ...local };
  for (const [k, v] of Object.entries(server)) out[k] = Math.max(out[k] ?? 0, v);
  return out;
}

function safeStorage(): Storage | undefined {
  try {
    return typeof localStorage === 'undefined' ? undefined : localStorage;
  } catch {
    return undefined;
  }
}

// ---------------------------------------------------------------------------------------------
// Dashboard maths
// ---------------------------------------------------------------------------------------------

/** Whole calendar days from `now` to the exam date (local time). null when unset/invalid. */
export function daysUntilExam(examDate: string | undefined, now: Date = new Date()): number | null {
  if (!examDate || !/^\d{4}-\d{2}-\d{2}$/.test(examDate)) return null;
  const [y, m, d] = examDate.split('-').map(Number) as [number, number, number];
  const exam = new Date(y, m - 1, d);
  if (Number.isNaN(exam.getTime()) || exam.getMonth() !== m - 1) return null;
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((exam.getTime() - today.getTime()) / 86_400_000);
}

/**
 * Daily 10: the 3 weakest not-yet-mastered concepts first, then the newest lecture's unmastered
 * concepts in teaching order, de-duplicated, capped at 10.
 */
export function buildDailySession(lectures: Lecture[], mastery: MasteryMap, limit = 10): string[] {
  const all = lectures.flatMap((l) => l.concepts);
  const score = (id: string) => mastery[id] ?? 0;
  const unmastered = all.filter((c) => score(c.id) < MASTERY_THRESHOLD);
  const weakest = [...unmastered].sort((a, b) => score(a.id) - score(b.id)).slice(0, 3);
  const newest = lectures[lectures.length - 1];
  const fromNewest = (newest?.concepts ?? []).filter((c) => score(c.id) < MASTERY_THRESHOLD);
  const ids: string[] = [];
  for (const c of [...weakest, ...fromNewest]) if (!ids.includes(c.id)) ids.push(c.id);
  return ids.slice(0, limit);
}
