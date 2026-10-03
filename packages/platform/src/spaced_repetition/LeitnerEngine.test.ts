import { describe, it, expect } from 'vitest';
import {
  processCardReview,
  getDueReviewCards,
  calculateMemoryDecay,
  calculateCardRetrievability,
  routeRemediation,
  calculateBackwardExamSchedule,
  RETRIEVABILITY_DUE_THRESHOLD,
  LEITNER_INTERVALS,
  BOX_DEFAULT_STABILITY,
  CANONICAL_REMEDIATION_CATALOG,
} from './LeitnerEngine';
import { SpacedReviewCard } from '../types';

describe('Leitner Spaced Repetition Engine', () => {
  const sampleCard: SpacedReviewCard = {
    cardId: 'card-1',
    courseId: 'medchem',
    drugOrConcept: 'Carboxylic_Acid_Bioisostere',
    prompt: 'Which 5-membered heterocycle is bioisosteric with carboxylic acid?',
    answer: '5-Substituted Tetrazole (pKa ~4.9)',
    box: 1,
    intervalDays: 1,
    stability: 1.0,
    retrievability: 1.0,
    lastReviewedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    nextReviewDue: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Due yesterday
    reviewCount: 1,
    lapseCount: 0,
  };

  it('standardizes intervals strictly to [1, 3, 7, 21, 60] as mandated by R6', () => {
    expect(LEITNER_INTERVALS[1]).toBe(1);
    expect(LEITNER_INTERVALS[2]).toBe(3);
    expect(LEITNER_INTERVALS[3]).toBe(7);
    expect(LEITNER_INTERVALS[4]).toBe(21);
    expect(LEITNER_INTERVALS[5]).toBe(60);
  });

  it('promotes card to Box 2 on correct review and updates due date', () => {
    const now = new Date('2026-09-28T12:00:00Z');
    const updated = processCardReview(sampleCard, true, now);

    expect(updated.box).toBe(2);
    expect(updated.intervalDays).toBe(LEITNER_INTERVALS[2]); // 3 days
    expect(updated.reviewCount).toBe(2);
    expect(updated.lapseCount).toBe(0);

    const expectedDue = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString();
    expect(updated.nextReviewDue).toBe(expectedDue);
  });

  it('promotes card across all boxes up to Box 5 with 60-day interval', () => {
    let card: SpacedReviewCard = { ...sampleCard };
    const now = new Date('2026-09-28T12:00:00Z');

    // Box 1 -> Box 2
    card = processCardReview(card, true, now);
    expect(card.box).toBe(2);
    expect(card.intervalDays).toBe(3);

    // Box 2 -> Box 3
    card = processCardReview(card, true, now);
    expect(card.box).toBe(3);
    expect(card.intervalDays).toBe(7);

    // Box 3 -> Box 4
    card = processCardReview(card, true, now);
    expect(card.box).toBe(4);
    expect(card.intervalDays).toBe(21);

    // Box 4 -> Box 5
    card = processCardReview(card, true, now);
    expect(card.box).toBe(5);
    expect(card.intervalDays).toBe(60);

    // Box 5 remains in Box 5 (ceiling)
    card = processCardReview(card, true, now);
    expect(card.box).toBe(5);
    expect(card.intervalDays).toBe(60);
  });

  it('drops card back to Box 1 and increments lapse on incorrect review', () => {
    const cardInBox4: SpacedReviewCard = {
      ...sampleCard,
      box: 4,
      intervalDays: 21,
      stability: 21.0,
    };

    const now = new Date('2026-09-28T12:00:00Z');
    const failed = processCardReview(cardInBox4, false, now);

    expect(failed.box).toBe(1);
    expect(failed.intervalDays).toBe(1);
    expect(failed.lapseCount).toBe(1);
    // Stability decays on lapse
    expect(failed.stability).toBeLessThan(cardInBox4.stability!);
  });

  it('filters due cards accurately and orders by box priority', () => {
    const now = new Date('2026-09-28T12:00:00Z');

    const dueBox1: SpacedReviewCard = {
      ...sampleCard,
      cardId: 'c-1',
      box: 1,
      nextReviewDue: '2026-09-27T10:00:00Z', // due
    };

    const dueBox3: SpacedReviewCard = {
      ...sampleCard,
      cardId: 'c-3',
      box: 3,
      nextReviewDue: '2026-09-26T10:00:00Z', // due
    };

    const notDue: SpacedReviewCard = {
      ...sampleCard,
      cardId: 'c-future',
      box: 2,
      lastReviewedAt: '2026-09-28T10:00:00Z',
      nextReviewDue: '2026-09-30T10:00:00Z', // future
    };

    const dueCards = getDueReviewCards([dueBox3, notDue, dueBox1], now);
    expect(dueCards).toHaveLength(2);
    expect(dueCards[0]?.cardId).toBe('c-1'); // Lower box prioritized first
    expect(dueCards[1]?.cardId).toBe('c-3');
  });

  describe('Memory Retrievability Decay Modeling: R(t) = exp(-delta_t / S)', () => {
    it('calculates memory decay mathematically: R(0) = 1.0, R(S) = e^-1', () => {
      const stability = 10.0; // S = 10 days

      // At t = 0, R = 1.0 (100% retrievability)
      expect(calculateMemoryDecay(0, stability)).toBe(1.0);
      expect(calculateMemoryDecay(-1, stability)).toBe(1.0); // Negative elapsed clamp

      // At t = S (10 days), R = exp(-1) ≈ 0.367879
      const atHalfLife = calculateMemoryDecay(10, stability);
      expect(atHalfLife).toBeCloseTo(Math.exp(-1), 4);

      // Monotonic decay over time
      const r1 = calculateMemoryDecay(1, stability);
      const r3 = calculateMemoryDecay(3, stability);
      const r7 = calculateMemoryDecay(7, stability);
      const r14 = calculateMemoryDecay(14, stability);

      expect(r1).toBeGreaterThan(r3);
      expect(r3).toBeGreaterThan(r7);
      expect(r7).toBeGreaterThan(r14);
    });

    it('computes card retrievability from lastReviewedAt timestamp', () => {
      const baseDate = new Date('2026-09-20T12:00:00Z');
      const testCard: SpacedReviewCard = {
        ...sampleCard,
        box: 3,
        stability: 7.0, // S = 7 days
        lastReviewedAt: baseDate.toISOString(),
      };

      // 7 days later (2026-09-27)
      const after7Days = new Date('2026-09-27T12:00:00Z');
      const retrievability7 = calculateCardRetrievability(testCard, after7Days);
      expect(retrievability7).toBeCloseTo(Math.exp(-1), 3); // ~0.368

      // 1 day later (2026-09-21)
      const after1Day = new Date('2026-09-21T12:00:00Z');
      const retrievability1 = calculateCardRetrievability(testCard, after1Day);
      expect(retrievability1).toBeCloseTo(Math.exp(-1 / 7), 3); // ~0.867
    });

    it('triggers review when retrievability drops below threshold (80%)', () => {
      const now = new Date('2026-09-28T12:00:00Z');
      // Card scheduled for 21 days in future, but with very low stability S=1.0
      // 3 days have elapsed: R = exp(-3 / 1) = exp(-3) ≈ 0.05 < 0.80
      const decayedCard: SpacedReviewCard = {
        ...sampleCard,
        cardId: 'c-decayed',
        box: 4,
        stability: 1.0, // weak memory stability
        lastReviewedAt: '2026-09-25T12:00:00Z', // 3 days ago
        nextReviewDue: '2026-10-15T12:00:00Z', // Calendar date is 17 days in future
      };

      const due = getDueReviewCards([decayedCard], now);
      expect(due.map((c) => c.cardId)).toContain('c-decayed');
    });

    it('updates memory stability with desirable difficulty on successful review', () => {
      const now = new Date('2026-09-28T12:00:00Z');
      const card: SpacedReviewCard = {
        ...sampleCard,
        box: 2,
        stability: 3.0,
        lastReviewedAt: '2026-09-25T12:00:00Z', // 3 days ago (R ≈ 0.368)
      };

      const reviewed = processCardReview(card, true, now);
      expect(reviewed.box).toBe(3);
      // Stability should increase significantly above default box 3 stability due to low R recall
      expect(reviewed.stability).toBeGreaterThanOrEqual(BOX_DEFAULT_STABILITY[3]);
      expect(reviewed.retrievability).toBe(1.0);
    });
  });

  describe('Formative Micro-Remediation Routing', () => {
    it('returns action "none" when card has 0 lapses', () => {
      const decision = routeRemediation({
        lapseCount: 0,
        misconceptionId: 'MISC-SPARE-RECEPTOR-SATURATION',
      });
      expect(decision.action).toBe('none');
      expect(decision.lapseCount).toBe(0);
    });

    it('routes to Tier 2 diagnostic hint on first lapse (lapseCount = 1)', () => {
      const decision = routeRemediation({
        lapseCount: 1,
        misconceptionId: 'MISC-SPARE-RECEPTOR-SATURATION',
      });
      expect(decision.action).toBe('diagnostic_hint');
      expect(decision.lapseCount).toBe(1);
      expect(decision.diagnosticHintTier).toBe(2);
    });

    it('routes recurring failures (lapseCount >= 2) to targeted micro-remediation node', () => {
      const decision = routeRemediation({
        lapseCount: 2,
        misconceptionId: 'MISC-SPARE-RECEPTOR-SATURATION',
      });

      expect(decision.action).toBe('micro_remediation');
      expect(decision.lapseCount).toBe(2);
      expect(decision.remediationNode).toBeDefined();
      expect(decision.remediationNode?.remediationId).toBe('rem-spare-receptors');
      expect(decision.remediationNode?.targetWidget?.type).toBe('DoseResponseModulator');
      expect(decision.remediationNode?.nearTransferCheck.options.length).toBeGreaterThanOrEqual(2);
    });

    it('contains valid authentic micro-remediations across high-yield misconceptions', () => {
      const catalog = CANONICAL_REMEDIATION_CATALOG;
      const expectedMisconceptions = [
        'MISC-SPARE-RECEPTOR-SATURATION',
        'MISC-EFFICACY-POTENCY-CONFLATION',
        'MISC-LIPOPHILICITY-BIOAVAILABILITY',
        'MISC-ACID-BASE-IONIZATION',
        'MISC-FERGUSON-NONSPECIFIC',
      ];

      for (const miscId of expectedMisconceptions) {
        const item = catalog[miscId];
        expect(item, `Missing remediation for ${miscId}`).toBeDefined();
        expect(item!.remediationId).toBeTruthy();
        expect(item!.intuitiveReframing).toBeDefined();
        expect(item!.nearTransferCheck.prompt).toBeDefined();
        expect(item!.nearTransferCheck.options.some((o) => o.isCorrect)).toBe(true);
      }
    });
  });

  describe('Backward Exam Scheduling & 85% Retention Threshold', () => {
    it('sets the default RETRIEVABILITY_DUE_THRESHOLD strictly to 0.85', () => {
      expect(RETRIEVABILITY_DUE_THRESHOLD).toBe(0.85);
    });

    it('triggers review when retrievability is 0.83 (below 0.85 threshold)', () => {
      const now = new Date('2026-09-28T12:00:00Z');
      // S = 7 days. If 1.3 days elapsed: R = exp(-1.3 / 7) ≈ 0.830 < 0.85
      const card: SpacedReviewCard = {
        ...sampleCard,
        cardId: 'c-thresh',
        box: 3,
        stability: 7.0,
        lastReviewedAt: new Date(now.getTime() - 1.3 * 24 * 60 * 60 * 1000).toISOString(),
        nextReviewDue: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      };

      const due = getDueReviewCards([card], now);
      expect(due.map((c) => c.cardId)).toContain('c-thresh');
    });

    it('calculates backward exam schedule correctly for an upcoming exam in 14 days', () => {
      const now = new Date('2026-10-01T12:00:00Z');
      const examDate = new Date('2026-10-15T12:00:00Z'); // 14 days later

      const card: SpacedReviewCard = {
        ...sampleCard,
        box: 2,
        stability: 3.0, // weak memory stability
        lastReviewedAt: '2026-09-30T12:00:00Z', // 1 day ago
      };

      const result = calculateBackwardExamSchedule(card, examDate, now, 0.85);

      expect(result.daysUntilExam).toBe(14);
      expect(result.currentStability).toBe(3.0);
      expect(result.targetRetention).toBe(0.85);
      // S_req = 14 / -ln(0.85) ≈ 14 / 0.16252 ≈ 86.14 days
      expect(result.requiredStabilityAtExam).toBeCloseTo(14 / -Math.log(0.85), 1);
      // Projected retrievability on exam day without review: exp(-(1 + 14)/3) = exp(-5) ≈ 0.0067 < 0.50
      expect(result.projectedExamRetrievability).toBeLessThan(0.05);
      expect(result.urgency).toBe('critical');

      // Milestones must include final pre-exam lock-in and mid-prep booster
      expect(result.reviewMilestones.length).toBeGreaterThanOrEqual(2);
      const finalMilestone = result.reviewMilestones[result.reviewMilestones.length - 1];
      expect(finalMilestone?.description).toContain('Exam Readiness');
    });

    it('flags critical urgency and immediate blitz review for exam within 24 hours', () => {
      const now = new Date('2026-10-01T12:00:00Z');
      const examDate = new Date('2026-10-01T18:00:00Z'); // 6 hours later

      const card: SpacedReviewCard = {
        ...sampleCard,
        box: 3,
        stability: 7.0,
      };

      const result = calculateBackwardExamSchedule(card, examDate, now);
      expect(result.daysUntilExam).toBeCloseTo(0.25, 2);
      expect(result.urgency).toBe('critical');
      expect(result.reviewMilestones[0]?.description).toContain('Blitz');
    });
  });
});
