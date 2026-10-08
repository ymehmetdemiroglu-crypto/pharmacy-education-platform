import { describe, it, expect, beforeEach } from 'vitest';
import {
  CANONICAL_DAILY_TEN_QUESTIONS,
  loadDailySession,
  saveDailySession,
  submitChallengeStep,
  exportDailyTenToAnkiTsv,
  getTodayDateString,
} from './dailyHabitService';
import { clearMisconceptionStore, loadMisconceptionStore } from './misconceptionService';

describe('Daily Study Habit Engine Service', () => {
  const testDate = '2026-10-07';

  beforeEach(() => {
    localStorage.clear();
    clearMisconceptionStore();
  });

  it('provides exactly 10 canonical daily challenge steps covering MedChem and Pharmacology', () => {
    expect(CANONICAL_DAILY_TEN_QUESTIONS).toHaveLength(10);

    const stepTypes = CANONICAL_DAILY_TEN_QUESTIONS.map((s) => s.type);
    expect(stepTypes.slice(0, 3)).toEqual(['spaced_review', 'spaced_review', 'spaced_review']);
    expect(stepTypes.slice(3, 7)).toEqual([
      'curriculum_progression',
      'curriculum_progression',
      'curriculum_progression',
      'curriculum_progression',
    ]);
    expect(stepTypes.slice(7, 9)).toEqual(['tactile_simulation', 'tactile_simulation']);
    expect(stepTypes[9]).toBe('vize_trap_twin');
  });

  it('enforces word count ceiling (<= 40 words) and predict-then-reveal on all steps', () => {
    for (const step of CANONICAL_DAILY_TEN_QUESTIONS) {
      expect(step.predictThenReveal).toBe(true);
      const wordCount = step.prompt.trim().split(/\s+/).length;
      expect(wordCount).toBeLessThanOrEqual(40);
      expect(step.hints).toHaveLength(3);
      expect(step.slideCitation).toBeTruthy();
    }
  });

  it('updates session score, XP, and triggers misconception tracking on trap answer', () => {
    const step1 = CANONICAL_DAILY_TEN_QUESTIONS[0]!;
    // Option 1b is the trap ("İdrarı amonyum klorür ile asitleştirmek")
    const trapOptId = 'opt-1b';

    const result = submitChallengeStep(step1, trapOptId, 0, testDate);
    expect(result.isCorrect).toBe(false);
    expect(result.session.score).toBe(0);
    expect(result.session.earnedXP).toBe(2); // Engagement XP
    expect(result.session.stepGrades[step1.id]).toBe(1); // Grade 1 (Again)

    // Check that TRAP-01 was recorded
    const misconceptionStore = loadMisconceptionStore();
    expect(misconceptionStore['TRAP-01-IONIZATION'].triggerCount).toBe(1);
    expect(misconceptionStore['TRAP-01-IONIZATION'].consecutiveCorrect).toBe(0);
  });

  it('marks daily challenge completed upon solving the 10th question and awards bonus XP', () => {
    const step10 = CANONICAL_DAILY_TEN_QUESTIONS[9]!;
    const correctOptId = 'opt-10a';

    const result = submitChallengeStep(step10, correctOptId, 0, testDate);
    expect(result.isCorrect).toBe(true);
    expect(result.session.isCompleted).toBe(true);
    expect(result.session.completedAt).toBeDefined();
    expect(result.session.earnedXP).toBeGreaterThanOrEqual(60); // 10 + 50 bonus
  });


  it('exports daily questions to standard Anki TSV format with tags and slides', () => {
    const tsv = exportDailyTenToAnkiTsv();
    expect(tsv).toContain('#separator:Tab');
    expect(tsv).toContain('#html:true');
    expect(tsv).toContain('İdrar pH');
    expect(tsv).toContain('Fizikokimyasal Özellikler, Slayt 16');
  });
});
