import { describe, it, expect } from 'vitest';
import {
  calculateFsrsRetrievability,
  calculateFsrsInterval,
  getInitialStability,
  getInitialDifficulty,
  updateDifficulty,
  updateStabilitySuccess,
  updateStabilityLapse,
  processFsrsCardReview,
  getDueFsrsCards,
  exportToAnkiTsv,
  FSRS_CONSTANTS,
  FsrsCard,
} from './FsrsEngine';

describe('FSRS-4.5 Spaced Repetition Engine', () => {
  const baseCard: FsrsCard = {
    cardId: 'card-warfarin-s-isomer',
    courseId: 'medchem',
    drugOrConcept: 'Warfarin_Stereochemistry',
    prompt: 'Which enantiomer of warfarin is more potent and which CYP enzyme metabolizes it?',
    answer: 'S-warfarin is 3-5x more potent; metabolized primarily by CYP2C9.',
    stability: 3.2,
    difficulty: 5.0,
    reps: 1,
    lapses: 0,
    state: 'review',
    lastReviewedAt: new Date('2026-10-01T10:00:00Z').toISOString(),
    nextReviewDue: new Date('2026-10-05T10:00:00Z').toISOString(),
    tags: ['medchem', 'anticoagulants', 'CYP2C9'],
  };

  describe('Retrievability R(t, S)', () => {
    it('returns 1.0 when elapsed time is 0 or negative', () => {
      expect(calculateFsrsRetrievability(0, 5)).toBe(1.0);
      expect(calculateFsrsRetrievability(-2, 5)).toBe(1.0);
    });

    it('matches theoretical derivation R(S, S) = 0.90 exactly when F = 19/81 and w = 0.5', () => {
      // (1 + (19/81) * 1)^(-0.5) = (100/81)^(-0.5) = sqrt(81/100) = 9/10 = 0.90
      const r = calculateFsrsRetrievability(10, 10);
      expect(r).toBeCloseTo(0.9, 6);
    });

    it('monotonically decreases as elapsed days increase', () => {
      const r1 = calculateFsrsRetrievability(1, 4);
      const r3 = calculateFsrsRetrievability(3, 4);
      const r7 = calculateFsrsRetrievability(7, 4);
      expect(r1).toBeGreaterThan(r3);
      expect(r3).toBeGreaterThan(r7);
    });
  });

  describe('Optimal Interval Calculation', () => {
    it('satisfies interval identity when target R = 0.90 (I === S)', () => {
      // I = (S / F) * (0.90^(-1/0.5) - 1) = (S / F) * ((10/9)^2 - 1) = (S / F) * (19/81) = S
      const s = 10;
      const interval = calculateFsrsInterval(s, 0.90);
      expect(interval).toBe(10);
    });

    it('produces longer intervals for standard 0.85 retention target', () => {
      const s = 10;
      const interval = calculateFsrsInterval(s, 0.85);
      expect(interval).toBeGreaterThan(s);
    });

    it('clamps minimum interval to at least 1 day', () => {
      const interval = calculateFsrsInterval(0.01, 0.99);
      expect(interval).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Initial Parameters', () => {
    it('assigns calibrated initial stabilities per grade', () => {
      expect(getInitialStability(1)).toBe(FSRS_CONSTANTS.weights.w0); // 0.4
      expect(getInitialStability(2)).toBe(FSRS_CONSTANTS.weights.w1); // 1.2
      expect(getInitialStability(3)).toBe(FSRS_CONSTANTS.weights.w2); // 3.2
      expect(getInitialStability(4)).toBe(FSRS_CONSTANTS.weights.w3); // 8.5
    });

    it('assigns higher difficulty for Again (1) and lowest for Easy (4)', () => {
      const d1 = getInitialDifficulty(1);
      const d2 = getInitialDifficulty(2);
      const d3 = getInitialDifficulty(3);
      const d4 = getInitialDifficulty(4);

      expect(d1).toBeGreaterThan(d2);
      expect(d2).toBeGreaterThan(d3);
      expect(d3).toBeGreaterThan(d4);
      expect(d1).toBeLessThanOrEqual(10.0);
      expect(d4).toBeGreaterThanOrEqual(1.0);
    });
  });

  describe('Difficulty & Stability Updates', () => {
    it('adjusts difficulty with mean-reversion', () => {
      const initialD = 5.0;
      const harderD = updateDifficulty(initialD, 1);
      const easierD = updateDifficulty(initialD, 4);

      expect(harderD).toBeGreaterThan(initialD);
      expect(easierD).toBeLessThan(initialD);
    });

    it('increases stability on successful recall and scales with retrievability', () => {
      const currentS = 4.0;
      const currentD = 5.0;
      // Recalling at low retrievability (high delay) grants larger memory boost
      const boostHighDelay = updateStabilitySuccess(currentS, currentD, 0.70);
      const boostLowDelay = updateStabilitySuccess(currentS, currentD, 0.95);

      expect(boostHighDelay).toBeGreaterThan(boostLowDelay);
      expect(boostLowDelay).toBeGreaterThan(currentS);
    });

    it('reduces stability upon memory lapse with minimum floor of 0.4', () => {
      const currentS = 15.0;
      const currentD = 6.0;
      const lapsedS = updateStabilityLapse(currentS, currentD, 0.60);

      expect(lapsedS).toBeLessThan(currentS);
      expect(lapsedS).toBeGreaterThanOrEqual(0.4);
    });
  });

  describe('Review Processing State Machine', () => {
    it('initializes new card on first encounter (reps = 0)', () => {
      const newCard: FsrsCard = {
        ...baseCard,
        reps: 0,
        lapses: 0,
        state: 'new',
        stability: 0,
        difficulty: 0,
      };

      const now = new Date('2026-10-07T12:00:00Z');
      const updated = processFsrsCardReview(newCard, 3, now);

      expect(updated.reps).toBe(1);
      expect(updated.state).toBe('review');
      expect(updated.stability).toBe(FSRS_CONSTANTS.weights.w2);
      expect(new Date(updated.nextReviewDue).getTime()).toBeGreaterThan(now.getTime());
    });

    it('transitions to relearning and increments lapses on Again (grade 1)', () => {
      const now = new Date('2026-10-07T12:00:00Z');
      const updated = processFsrsCardReview(baseCard, 1, now);

      expect(updated.reps).toBe(2);
      expect(updated.lapses).toBe(1);
      expect(updated.state).toBe('relearning');
      expect(updated.stability).toBeLessThan(baseCard.stability);
    });

    it('maintains review state and expands interval on Good (grade 3)', () => {
      const now = new Date('2026-10-07T12:00:00Z');
      const updated = processFsrsCardReview(baseCard, 3, now);

      expect(updated.reps).toBe(2);
      expect(updated.lapses).toBe(0);
      expect(updated.state).toBe('review');
      expect(updated.stability).toBeGreaterThan(baseCard.stability);
    });
  });

  describe('Due Card Filter & Decay Bug Prevention', () => {
    it('returns cards whose nextReviewDue is in the past', () => {
      const pastCard: FsrsCard = {
        ...baseCard,
        nextReviewDue: '2026-10-06T00:00:00Z',
      };
      const futureCard: FsrsCard = {
        ...baseCard,
        cardId: 'card-future',
        nextReviewDue: '2026-10-08T00:00:00Z',
      };

      const due = getDueFsrsCards([pastCard, futureCard], new Date('2026-10-07T00:00:00Z'));
      expect(due.length).toBe(1);
      expect(due[0]?.cardId).toBe('card-warfarin-s-isomer');
    });

    it('prevents premature 3.9h decay bug for unlapsed cards (lapses === 0)', () => {
      // 4 hours after review, stability is 1 day.
      // Under flawed Leitner decay, R drops below threshold and falsely flags card as due.
      // Under FSRS-4.5 fix, unlapsed cards strictly follow nextReviewDue.
      const recentCard: FsrsCard = {
        ...baseCard,
        cardId: 'card-recent',
        lapses: 0,
        lastReviewedAt: '2026-10-07T08:00:00Z',
        nextReviewDue: '2026-10-08T08:00:00Z', // Due in 20 hours
        stability: 1.0,
      };

      const checkTime = new Date('2026-10-07T12:00:00Z'); // 4 hours later
      const due = getDueFsrsCards([recentCard], checkTime);
      expect(due).toEqual([]); // Must NOT be due prematurely
    });

    it('prioritizes relearning cards at the front of the review queue', () => {
      const normalDue: FsrsCard = {
        ...baseCard,
        cardId: 'normal-due',
        state: 'review',
        nextReviewDue: '2026-10-01T00:00:00Z',
      };
      const relearningDue: FsrsCard = {
        ...baseCard,
        cardId: 'relearning-due',
        state: 'relearning',
        nextReviewDue: '2026-10-05T00:00:00Z',
      };

      const sorted = getDueFsrsCards([normalDue, relearningDue], new Date('2026-10-07T00:00:00Z'));
      expect(sorted[0]?.cardId).toBe('relearning-due');
      expect(sorted[1]?.cardId).toBe('normal-due');
    });

  });

  describe('Anki TSV Export', () => {
    it('formats cards with tab delimiters and HTML linebreaks for Anki import', () => {
      const multilineCard: FsrsCard = {
        ...baseCard,
        prompt: 'Line 1\nLine 2',
        answer: 'Ans 1\tAns 2',
      };

      const tsv = exportToAnkiTsv([multilineCard]);
      expect(tsv).toContain('#separator:Tab');
      expect(tsv).toContain('#html:true');
      expect(tsv).toContain('Line 1<br>Line 2');
      expect(tsv).toContain('Ans 1 Ans 2');
      expect(tsv).toContain('medchem Warfarin_Stereochemistry review');
    });
  });
});
