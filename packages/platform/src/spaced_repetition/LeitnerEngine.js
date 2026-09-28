export const LEITNER_INTERVALS = {
    1: 1, // 1 day
    2: 3, // 3 days
    3: 7, // 7 days
    4: 14, // 14 days
    5: 30, // 30 days
};
export function processCardReview(card, isCorrect, now = new Date()) {
    let nextBox = card.box;
    let lapseCount = card.lapseCount;
    if (isCorrect) {
        if (card.box < 5) {
            nextBox = (card.box + 1);
        }
    }
    else {
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
export function getDueReviewCards(cards, now = new Date()) {
    const currentTimestamp = now.getTime();
    return cards
        .filter((card) => new Date(card.nextReviewDue).getTime() <= currentTimestamp)
        .sort((a, b) => a.box - b.box); // Prioritize lower boxes (harder/earlier items) first
}
