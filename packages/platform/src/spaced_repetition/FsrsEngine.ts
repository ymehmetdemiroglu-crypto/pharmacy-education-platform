/**
 * Free Spaced Repetition Scheduler (FSRS-4.5) Exact Mathematical Formulation
 * Designed per docs/daily-study-habit-engine.md Section 1.1.D
 */

export type FsrsGrade = 1 | 2 | 3 | 4; // 1: Again, 2: Hard, 3: Good, 4: Easy

export interface FsrsCard {
  cardId: string;
  courseId: 'medchem' | 'pharmacology';
  drugOrConcept: string;
  prompt: string;
  answer: string;
  stability: number; // S in days
  difficulty: number; // D: 1.0 to 10.0
  reps: number;
  lapses: number;
  state: 'new' | 'learning' | 'review' | 'relearning';
  lastReviewedAt: string; // ISO
  nextReviewDue: string; // ISO
  retrievability?: number; // Cached R
  tags?: string[];
}

export const FSRS_CONSTANTS = {
  F: 19 / 81, // 0.2345679
  w: 0.5,
  defaultTargetR: 0.85,
  weights: {
    w0: 0.4,  // S0 for Again (1)
    w1: 1.2,  // S0 for Hard (2)
    w2: 3.2,  // S0 for Good (3)
    w3: 8.5,  // S0 for Easy (4)
    w4: 4.0,  // Initial difficulty baseline
    w5: 0.5,  // Initial difficulty spread
    w6: 0.2,  // Difficulty adjustment rate
    w7: 0.1,  // Mean reversion weight
    w8: 0.8,  // Stability boost scale
    w9: 0.15, // Stability exponent
    w10: 0.7, // Retrievability sensitivity
    w11: 2.0, // Lapse stability factor
    w12: 0.2, // Lapse difficulty penalty
    w13: 0.3, // Lapse memory trace exponent
    w14: 0.2, // Lapse retrievability exponent
  },
};

/**
 * Calculates FSRS-4.5 Retrievability:
 * R(t, S) = (1 + F * (t / S))^(-w)
 */
export function calculateFsrsRetrievability(
  elapsedDays: number,
  stability: number,
  F: number = FSRS_CONSTANTS.F,
  w: number = FSRS_CONSTANTS.w
): number {
  if (elapsedDays <= 0) return 1.0;
  const s = Math.max(0.01, stability);
  const factor = 1 + F * (elapsedDays / s);
  return Math.pow(factor, -w);
}

/**
 * Derives optimal interval I for target retrievability R_target:
 * I = (S / F) * (R_target^(-1/w) - 1)
 */
export function calculateFsrsInterval(
  stability: number,
  targetRetrievability: number = FSRS_CONSTANTS.defaultTargetR,
  F: number = FSRS_CONSTANTS.F,
  w: number = FSRS_CONSTANTS.w
): number {
  const s = Math.max(0.1, stability);
  const targetR = Math.min(0.99, Math.max(0.5, targetRetrievability));
  const factor = Math.pow(targetR, -1 / w) - 1;
  const interval = (s / F) * factor;
  return Math.max(1, Math.round(interval));
}

/**
 * Calculates initial stability for first review
 */
export function getInitialStability(grade: FsrsGrade): number {
  const { w0, w1, w2, w3 } = FSRS_CONSTANTS.weights;
  switch (grade) {
    case 1: return w0;
    case 2: return w1;
    case 3: return w2;
    case 4: return w3;
  }
}

/**
 * Calculates initial difficulty for first review
 */
export function getInitialDifficulty(grade: FsrsGrade): number {
  const { w4, w5 } = FSRS_CONSTANTS.weights;
  const d = w4 - Math.exp(w5 * (grade - 1)) + 1;
  return Math.min(10.0, Math.max(1.0, Number(d.toFixed(2))));
}

/**
 * Updates difficulty on subsequent reviews with mean-reversion
 */
export function updateDifficulty(currentD: number, grade: FsrsGrade): number {
  const { w6, w7 } = FSRS_CONSTANTS.weights;
  const d0_3 = getInitialDifficulty(3);
  const rawD = currentD - w6 * (grade - 3);
  const clampedD = Math.min(10.0, Math.max(1.0, rawD));
  const newD = w7 * d0_3 + (1 - w7) * clampedD;
  return Math.min(10.0, Math.max(1.0, Number(newD.toFixed(2))));
}

/**
 * Updates stability upon successful recall (grade >= 2)
 */
export function updateStabilitySuccess(
  currentS: number,
  currentD: number,
  retrievability: number
): number {
  const { w8, w9, w10 } = FSRS_CONSTANTS.weights;
  const sFactor = Math.pow(Math.max(0.1, currentS), -w9);
  const rSensitivity = Math.exp(w10 * (1 - Math.min(1.0, retrievability))) - 1;
  const boost = 1 + Math.exp(w8) * (11 - currentD) * sFactor * rSensitivity;
  return Math.max(currentS, Number((currentS * boost).toFixed(2)));
}

/**
 * Updates stability upon memory lapse (grade = 1)
 */
export function updateStabilityLapse(
  currentS: number,
  currentD: number,
  retrievability: number
): number {
  const { w11, w12, w13, w14 } = FSRS_CONSTANTS.weights;
  const dPenalty = Math.pow(Math.max(1.0, currentD), -w12);
  const memoryTrace = Math.pow(currentS + 1, w13) - 1;
  const rFactor = Math.exp(w14 * (1 - Math.min(1.0, retrievability)));
  const nextS = w11 * dPenalty * memoryTrace * rFactor;
  return Math.max(0.4, Number(nextS.toFixed(2)));
}

/**
 * Processes an active recall trial using calibrated FSRS-4.5
 */
export function processFsrsCardReview(
  card: FsrsCard,
  grade: FsrsGrade,
  now: Date = new Date(),
  targetR: number = FSRS_CONSTANTS.defaultTargetR
): FsrsCard {
  const currentTimestamp = now.getTime();
  const lastReviewedMs = new Date(card.lastReviewedAt).getTime();
  const elapsedDays = Math.max(0, (currentTimestamp - lastReviewedMs) / (1000 * 60 * 60 * 24));

  const currentR = card.reps === 0
    ? 1.0
    : calculateFsrsRetrievability(elapsedDays, card.stability);

  let nextStability: number;
  let nextDifficulty: number;
  let nextState: 'new' | 'learning' | 'review' | 'relearning';
  let nextLapses = card.lapses;

  if (card.reps === 0) {
    // First encounter
    nextStability = getInitialStability(grade);
    nextDifficulty = getInitialDifficulty(grade);
    nextState = grade === 1 ? 'learning' : 'review';
    if (grade === 1) nextLapses += 1;
  } else if (grade === 1) {
    // Memory Lapse
    nextDifficulty = updateDifficulty(card.difficulty, 1);
    nextStability = updateStabilityLapse(card.stability, nextDifficulty, currentR);
    nextState = 'relearning';
    nextLapses += 1;
  } else {
    // Successful recall (2, 3, 4)
    nextDifficulty = updateDifficulty(card.difficulty, grade);
    nextStability = updateStabilitySuccess(card.stability, nextDifficulty, currentR);
    nextState = 'review';
  }

  const intervalDays = calculateFsrsInterval(nextStability, targetR);
  const nextDueDate = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);

  return {
    ...card,
    stability: nextStability,
    difficulty: nextDifficulty,
    reps: card.reps + 1,
    lapses: nextLapses,
    state: nextState,
    retrievability: Number(calculateFsrsRetrievability(0, nextStability).toFixed(4)),
    lastReviewedAt: now.toISOString(),
    nextReviewDue: nextDueDate.toISOString(),
  };
}

/**
 * Filters cards that are due for review.
 * Resolves the 3.9h premature decay bug by restricting retrievability triggers to lapsed cards.
 */
export function getDueFsrsCards(
  cards: FsrsCard[],
  now: Date = new Date(),
  targetR: number = FSRS_CONSTANTS.defaultTargetR
): FsrsCard[] {
  const nowMs = now.getTime();

  return cards
    .filter((card) => {
      const dueByDate = new Date(card.nextReviewDue).getTime() <= nowMs;
      if (dueByDate) return true;

      // Only check retrievability decay for cards that have had previous lapses
      if (card.lapses > 0) {
        const lastMs = new Date(card.lastReviewedAt).getTime();
        const elapsed = Math.max(0, (nowMs - lastMs) / (1000 * 60 * 60 * 24));
        const r = calculateFsrsRetrievability(elapsed, card.stability);
        return r <= targetR;
      }

      return false;
    })
    .sort((a, b) => {
      // Prioritize lapsed/relearning cards first, then earliest due date
      if (a.state === 'relearning' && b.state !== 'relearning') return -1;
      if (b.state === 'relearning' && a.state !== 'relearning') return 1;
      return new Date(a.nextReviewDue).getTime() - new Date(b.nextReviewDue).getTime();
    });
}

/**
 * Exports cards into standard Anki-compatible TSV format (.txt / .apkg source)
 */
export function exportToAnkiTsv(cards: FsrsCard[]): string {
  const header = '#separator:Tab\n#html:true\n#tags column:3\n';
  const rows = cards.map((c) => {
    const front = c.prompt.replace(/\t/g, ' ').replace(/\n/g, '<br>');
    const back = c.answer.replace(/\t/g, ' ').replace(/\n/g, '<br>');
    const tags = [c.courseId, c.drugOrConcept, c.state].join(' ');
    return `${front}\t${back}\t${tags}`;
  });
  return header + rows.join('\n');
}
