import { describe, it, expect } from 'vitest';
import {
  calculateNewStreak,
  completeLesson,
  updateStepProgress,
  mergeGuestProgressWithCloud,
} from './ProgressStore';
import { UserProgress } from '../types';

describe('ProgressStore and Streak Engine', () => {
  it('increments streak on consecutive days', () => {
    const today = new Date('2026-09-28T10:00:00Z');
    const res = calculateNewStreak('2026-09-27', 3, today);
    expect(res.streakDays).toBe(4);
    expect(res.lastStreakDate).toBe('2026-09-28');
  });

  it('keeps streak unchanged if lesson already completed today', () => {
    const today = new Date('2026-09-28T10:00:00Z');
    const res = calculateNewStreak('2026-09-28', 5, today);
    expect(res.streakDays).toBe(5);
    expect(res.lastStreakDate).toBe('2026-09-28');
  });

  it('resets streak to 1 after a lapse day', () => {
    const today = new Date('2026-09-28T10:00:00Z');
    const res = calculateNewStreak('2026-09-25', 12, today); // 3 days ago
    expect(res.streakDays).toBe(1);
    expect(res.lastStreakDate).toBe('2026-09-28');
  });

  it('adds completed lesson and grants 50 XP', () => {
    const initialProgress: UserProgress = {
      courseId: 'medchem',
      completedLessonIds: ['mc-les-01'],
      currentModuleId: 'mc-mod-01',
      currentLessonId: 'mc-les-01',
      currentStepIndex: 10,
      streakDays: 1,
      lastStreakDate: '2026-09-27',
      totalXP: 50,
      accuracyRate: 90,
    };

    const updated = completeLesson(initialProgress, 'mc-les-02', new Date('2026-09-28T12:00:00Z'));
    expect(updated.completedLessonIds).toContain('mc-les-02');
    expect(updated.totalXP).toBe(100);
    expect(updated.streakDays).toBe(2);
  });

  it('updates step progress for mid-lesson autosave without altering completion or XP', () => {
    const initialProgress: UserProgress = {
      courseId: 'medchem',
      completedLessonIds: [],
      currentModuleId: 'mc-mod-01',
      currentLessonId: 'mc-mod1-les1',
      currentStepIndex: 0,
      streakDays: 0,
      lastStreakDate: '',
      totalXP: 0,
      accuracyRate: 100,
    };

    const midLesson = updateStepProgress(initialProgress, 'mc-mod1-les1', 4);
    expect(midLesson.currentLessonId).toBe('mc-mod1-les1');
    expect(midLesson.currentStepIndex).toBe(4);
    expect(midLesson.completedLessonIds.length).toBe(0);
    expect(midLesson.totalXP).toBe(0);
  });

  it('correctly merges guest offline progress into cloud account on login', () => {
    const guestProgress: UserProgress = {
      courseId: 'medchem',
      completedLessonIds: ['mc-mod1-les1'],
      currentModuleId: 'mc-mod-01',
      currentLessonId: 'mc-mod1-les1',
      currentStepIndex: 9,
      streakDays: 2,
      lastStreakDate: '2026-09-28',
      totalXP: 50,
      accuracyRate: 100,
    };

    const cloudProgress: UserProgress = {
      courseId: 'medchem',
      completedLessonIds: ['mc-mod1-les2'],
      currentModuleId: 'mc-mod-01',
      currentLessonId: 'mc-mod1-les2',
      currentStepIndex: 2,
      streakDays: 1,
      lastStreakDate: '2026-09-27',
      totalXP: 40,
      accuracyRate: 95,
    };

    const merged = mergeGuestProgressWithCloud(guestProgress, cloudProgress);
    // Lessons unioned
    expect(merged.completedLessonIds).toContain('mc-mod1-les1');
    expect(merged.completedLessonIds).toContain('mc-mod1-les2');
    expect(merged.completedLessonIds.length).toBe(2);
    // Max XP & streak
    expect(merged.totalXP).toBe(50);
    expect(merged.streakDays).toBe(2);
    expect(merged.lastStreakDate).toBe('2026-09-28');
  });
});

