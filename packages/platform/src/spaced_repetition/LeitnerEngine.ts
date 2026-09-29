import { SpacedReviewCard } from '../types';

export const LEITNER_INTERVALS: Record<1 | 2 | 3 | 4 | 5, number> = {
  1: 1, // 1 day
  2: 3, // 3 days
  3: 7, // 7 days
  4: 14, // 14 days
  5: 30, // 30 days
};

export function processCardReview(
  card: SpacedReviewCard,
  isCorrect: boolean,
  now: Date = new Date()
): SpacedReviewCard {
  let nextBox: 1 | 2 | 3 | 4 | 5 = card.box;
  let lapseCount = card.lapseCount;

  if (isCorrect) {
    if (card.box < 5) {
      nextBox = (card.box + 1) as 1 | 2 | 3 | 4 | 5;
    }
  } else {
    // Drop back to Box 1 on failure
    nextBox = 1;
    lapseCount += 1;
  }

  const intervalDays = LEITNER_INTERVALS[nextBox];
  const nextDueDate = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);

  return {
    ...card,
    box: nextBox,
    intervalDays,
    lastReviewedAt: now.toISOString(),
    nextReviewDue: nextDueDate.toISOString(),
    reviewCount: card.reviewCount + 1,
    lapseCount,
  };
}

export function getDueReviewCards(
  cards: SpacedReviewCard[],
  now: Date = new Date()
): SpacedReviewCard[] {
  const currentTimestamp = now.getTime();
  return cards
    .filter((card) => new Date(card.nextReviewDue).getTime() <= currentTimestamp)
    .sort((a, b) => a.box - b.box); // Prioritize lower boxes (harder/earlier items) first
}

export interface ReviewCardSeed {
  cardId: string;
  courseId: string;
  drugOrConcept: string;
  prompt: string;
  answer: string;
  box?: 1 | 2 | 3 | 4 | 5;
  intervalDays?: number;
  status?: string | undefined;
}

export function enqueueReviewCards(
  existingCards: SpacedReviewCard[],
  newSeeds: ReviewCardSeed[],
  now: Date = new Date()
): SpacedReviewCard[] {
  const existingMap = new Map(existingCards.map((c) => [c.cardId, c]));
  const updated = [...existingCards];

  for (const seed of newSeeds) {
    if (!existingMap.has(seed.cardId)) {
      const box = (seed.box || 1) as 1 | 2 | 3 | 4 | 5;
      const intervalDays = seed.intervalDays || LEITNER_INTERVALS[box] || 1;
      const nextDueDate = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);

      const newCard: SpacedReviewCard = {
        cardId: seed.cardId,
        courseId: seed.courseId,
        drugOrConcept: seed.drugOrConcept,
        prompt: seed.prompt,
        answer: seed.answer,
        box,
        intervalDays,
        lastReviewedAt: now.toISOString(),
        nextReviewDue: nextDueDate.toISOString(),
        reviewCount: 0,
        lapseCount: 0,
      };
      updated.push(newCard);
      existingMap.set(seed.cardId, newCard);
    }
  }

  return updated;
}

export function loadLocalReviewCards(courseId: string = 'medchem'): SpacedReviewCard[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw =
      localStorage.getItem(`pharmacy_leitner_${courseId}`) ||
      localStorage.getItem(`pharmacy_review_cards_${courseId}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Failed to load local review cards:', err);
  }
  return [];
}

export function saveLocalReviewCards(courseId: string, cards: SpacedReviewCard[]): void {
  if (typeof window === 'undefined') return;
  try {
    const serialized = JSON.stringify(cards);
    localStorage.setItem(`pharmacy_leitner_${courseId}`, serialized);
    localStorage.setItem(`pharmacy_review_cards_${courseId}`, serialized);
  } catch (err) {
    console.warn('Failed to save local review cards:', err);
  }
}
