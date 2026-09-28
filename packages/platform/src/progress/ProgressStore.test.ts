import { describe, it, expect } from 'vitest';
import { calculateNewStreak, completeLesson } from './ProgressStore';
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
});
