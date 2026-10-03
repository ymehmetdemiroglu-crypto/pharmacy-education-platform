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

/**
 * Mid-Lesson Step Progress Autosave
 * Updates current lesson and step index without modifying completion or awarding XP.
 */
export function updateStepProgress(
  current: UserProgress,
  lessonId: string,
  stepIndex: number
): UserProgress {
  return {
    ...current,
    currentLessonId: lessonId,
    currentStepIndex: stepIndex,
  };
}

/**
 * Guest-to-Cloud Merge Policy
 * Reconciles local guest offline achievements with an authenticated cloud account:
 * - Completed lessons are unioned without duplicates
 * - Total XP takes the maximum of guest vs cloud
 * - Streak days take the maximum of guest vs cloud
 * - Most recent streak date is retained
 * - Active lesson and step index preserved
 */
export function mergeGuestProgressWithCloud(
  guest: UserProgress,
  cloud: UserProgress | null
): UserProgress {
  if (!cloud) return guest;
  const allCompleted = Array.from(
    new Set([...guest.completedLessonIds, ...cloud.completedLessonIds])
  );
  return {
    ...cloud,
    completedLessonIds: allCompleted,
    totalXP: Math.max(guest.totalXP, cloud.totalXP),
    streakDays: Math.max(guest.streakDays, cloud.streakDays),
    lastStreakDate:
      guest.lastStreakDate > cloud.lastStreakDate
        ? guest.lastStreakDate
        : cloud.lastStreakDate,
    currentLessonId: guest.currentLessonId || cloud.currentLessonId,
    currentStepIndex:
      typeof guest.currentStepIndex === 'number'
        ? guest.currentStepIndex
        : cloud.currentStepIndex,
  };
}

export async function syncProgressToSupabase(progress: UserProgress): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const { supabase } = await import('../supabase');
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    await supabase.from('user_progress').upsert({
      user_id: session.user.id,
      course_id: progress.courseId,
      completed_lesson_ids: progress.completedLessonIds,
      current_module_id: progress.currentModuleId,
      current_lesson_id: progress.currentLessonId,
      current_step_index: progress.currentStepIndex,
      streak_days: progress.streakDays,
      last_streak_date: progress.lastStreakDate || null,
      total_xp: progress.totalXP,
      accuracy_rate: progress.accuracyRate,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'user_id,course_id'
    });
  } catch (err) {
    console.warn('[Supabase Progress Sync Note]:', err);
  }
}

export async function fetchProgressFromSupabase(courseId: string = 'medchem'): Promise<UserProgress | null> {
  if (typeof window === 'undefined') return null;
  try {
    const { supabase } = await import('../supabase');
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return null;

    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('course_id', courseId)
      .maybeSingle();

    if (error || !data) return null;

    return {
      courseId: data.course_id,
      completedLessonIds: data.completed_lesson_ids || [],
      currentModuleId: data.current_module_id || (courseId === 'medchem' ? 'mc-mod-01' : 'pharm-mod-01'),
      currentLessonId: data.current_lesson_id || (courseId === 'medchem' ? 'mc-mod1-les1' : 'pharm-mod1-les1'),
      currentStepIndex: data.current_step_index || 0,
      streakDays: data.streak_days || 0,
      lastStreakDate: data.last_streak_date || '',
      totalXP: data.total_xp || 0,
      accuracyRate: Number(data.accuracy_rate) || 100,
    };
  } catch (err) {
    console.warn('[Supabase Progress Fetch Note]:', err);
    return null;
  }
}
