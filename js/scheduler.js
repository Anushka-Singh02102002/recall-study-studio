
export function getNextReviewDate(box, knowsAnswer, today = new Date()) {
    const intervals = [1, 2, 4, 8, 16];

    const nextBox = knowsAnswer
        ? Math.min(box + 1, 5)
        : 1;

    const daysToWait = intervals[nextBox - 1];

    const nextReview = new Date(today);
    nextReview.setDate(nextReview.getDate() + daysToWait);

    return {
        box: nextBox,
        nextReview: nextReview.toISOString().slice(0, 10)
    };
}
