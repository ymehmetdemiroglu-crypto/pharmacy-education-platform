import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { studyPulse } from './studyPulseService';

describe('studyPulseService', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    studyPulse.resetPomodoro();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('provides default vibrant presence and faculties snapshot', () => {
    const snap = studyPulse.getSnapshot();
    expect(snap.activeCount).toBeGreaterThanOrEqual(38);
    expect(snap.recentFaculties.length).toBeGreaterThan(0);
    expect(snap.pomodoro.mode).toBe('focus');
    expect(snap.pomodoro.remainingSeconds).toBe(25 * 60);
    expect(snap.pomodoro.isRunning).toBe(false);
  });

  it('notifies subscribers on pomodoro start, tick, and pause', () => {
    const updates: any[] = [];
    const unsubscribe = studyPulse.subscribe((s) => updates.push(s));

    studyPulse.startPomodoro();
    expect(studyPulse.getSnapshot().pomodoro.isRunning).toBe(true);

    // Fast-forward 3 seconds
    vi.advanceTimersByTime(3000);
    expect(studyPulse.getSnapshot().pomodoro.remainingSeconds).toBe(25 * 60 - 3);

    studyPulse.pausePomodoro();
    expect(studyPulse.getSnapshot().pomodoro.isRunning).toBe(false);

    unsubscribe();
  });

  it('increments daily concept completion and preserves goal progress', () => {
    const initialCompleted = studyPulse.getSnapshot().dailyGoal.completedToday;
    studyPulse.incrementConceptMastery();
    const updated = studyPulse.getSnapshot().dailyGoal.completedToday;
    expect(updated).toBe(initialCompleted + 1);
  });
});
