import { describe, it, expect } from 'vitest';
import { processCardReview, getDueReviewCards, LEITNER_INTERVALS } from './LeitnerEngine';
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
    lastReviewedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    nextReviewDue: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Due yesterday
    reviewCount: 1,
    lapseCount: 0,
  };

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

  it('drops card back to Box 1 and increments lapse on incorrect review', () => {
    const cardInBox4: SpacedReviewCard = {
      ...sampleCard,
      box: 4,
      intervalDays: 14,
    };

    const now = new Date('2026-09-28T12:00:00Z');
    const failed = processCardReview(cardInBox4, false, now);

    expect(failed.box).toBe(1);
    expect(failed.intervalDays).toBe(1);
    expect(failed.lapseCount).toBe(1);
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
      nextReviewDue: '2026-09-30T10:00:00Z', // future
    };

    const dueCards = getDueReviewCards([dueBox3, notDue, dueBox1], now);
    expect(dueCards).toHaveLength(2);
    expect(dueCards[0]?.cardId).toBe('c-1'); // Lower box prioritized first
    expect(dueCards[1]?.cardId).toBe('c-3');
  });
});
