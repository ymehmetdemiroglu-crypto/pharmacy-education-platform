import { UserProgress } from '../types';

export function calculateNewStreak(
  lastStreakDate: string, // YYYY-MM-DD
  currentStreak: number,
  now: Date = new Date()
): { streakDays: number; lastStreakDate: string } {
  const todayStr = now.toISOString().slice(0, 10);
  if (lastStreakDate === todayStr) {
    // Already studied today
    return { streakDays: currentStreak, lastStreakDate };
  }

  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  if (lastStreakDate === yesterdayStr) {
    // Consecutive day
    return { streakDays: currentStreak + 1, lastStreakDate: todayStr };
  }

  // Broken streak
  return { streakDays: 1, lastStreakDate: todayStr };
}

export function completeLesson(
  current: UserProgress,
  lessonId: string,
  now: Date = new Date()
): UserProgress {
  const isAlreadyCompleted = current.completedLessonIds.includes(lessonId);
  const completedLessonIds = isAlreadyCompleted
    ? current.completedLessonIds
    : [...current.completedLessonIds, lessonId];

  const streak = calculateNewStreak(current.lastStreakDate, current.streakDays, now);

  return {
    ...current,
    completedLessonIds,
    streakDays: streak.streakDays,
    lastStreakDate: streak.lastStreakDate,
    totalXP: current.totalXP + (isAlreadyCompleted ? 5 : 50),
    currentLessonId: lessonId,
  };
}
