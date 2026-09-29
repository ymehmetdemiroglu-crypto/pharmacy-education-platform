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

export function getDefaultProgress(courseId: string = 'medchem'): UserProgress {
  return {
    courseId,
    completedLessonIds: [],
    currentModuleId: 'mc-mod-01',
    currentLessonId: 'mc-mod1-les1',
    currentStepIndex: 0,
    streakDays: 0,
    lastStreakDate: '',
    totalXP: 0,
    accuracyRate: 100,
  };
}

export function loadLocalProgress(courseId: string = 'medchem'): UserProgress {
  if (typeof window === 'undefined') return getDefaultProgress(courseId);
  try {
    const raw = localStorage.getItem(`pharmacy_progress_${courseId}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Failed to load local progress:', err);
  }
  return getDefaultProgress(courseId);
}

export function saveLocalProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`pharmacy_progress_${progress.courseId}`, JSON.stringify(progress));
  } catch (err) {
    console.warn('Failed to save local progress:', err);
  }
}
