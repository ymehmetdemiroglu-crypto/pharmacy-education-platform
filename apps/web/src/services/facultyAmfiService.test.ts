import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  generateEphemeralStudentId,
  getCurrentDailySalt,
  generateLaplaceNoise,
  applyDifferentialPrivacy,
  checkKAnonymity,
  evaluateMisconceptionSurge,
  getCohortPomodoroState,
  FacultyAmfiService
} from './facultyAmfiService';

describe('FacultyAmfiService & Privacy Engine', () => {
  describe('KVKK Rolling Daily Ephemeral Hash', () => {
    it('generates a 64-character hex string', () => {
      const ephemeralId = generateEphemeralStudentId('student-123', 'salt-2026-10-08');
      expect(ephemeralId).toHaveLength(64);
      expect(/^[0-9a-f]{64}$/.test(ephemeralId)).toBe(true);
    });

    it('is strictly deterministic for identical user and daily salt', () => {
      const id1 = generateEphemeralStudentId('student-456', 'salt-day-1');
      const id2 = generateEphemeralStudentId('student-456', 'salt-day-1');
      expect(id1).toBe(id2);
    });

    it('produces completely different hashes for different daily salts (anti-correlation)', () => {
      const day1 = generateEphemeralStudentId('student-456', 'salt-day-1');
      const day2 = generateEphemeralStudentId('student-456', 'salt-day-2');
      expect(day1).not.toBe(day2);
    });

    it('getCurrentDailySalt returns a non-empty string containing date prefix', () => {
      const salt = getCurrentDailySalt();
      expect(salt.startsWith('salt_')).toBe(true);
      expect(salt.endsWith('_amfi_kvkk')).toBe(true);
    });
  });

  describe('Central Laplace Differential Privacy', () => {
    it('generates zero-mean Laplace noise', () => {
      const samples: number[] = [];
      for (let i = 0; i < 500; i++) {
        samples.push(generateLaplaceNoise(2.0));
      }
      const mean = samples.reduce((acc, v) => acc + v, 0) / samples.length;
      expect(Math.abs(mean)).toBeLessThan(1.0);
    });

    it('clamps output count to non-negative integer >= 0', () => {
      for (let i = 0; i < 50; i++) {
        const noisy = applyDifferentialPrivacy(2, 0.5, 1);
        expect(noisy).toBeGreaterThanOrEqual(0);
        expect(Number.isInteger(noisy)).toBe(true);
      }
    });
  });

  describe('k-Anonymity Guard (k >= 10)', () => {
    it('rejects cohort sizes below 10 to prevent Sybil and re-identification attacks', () => {
      expect(checkKAnonymity(0)).toBe(false);
      expect(checkKAnonymity(5)).toBe(false);
      expect(checkKAnonymity(9)).toBe(false);
    });

    it('accepts cohort sizes >= 10', () => {
      expect(checkKAnonymity(10)).toBe(true);
      expect(checkKAnonymity(42)).toBe(true);
    });
  });

  describe('Misconception Surge Detection Engine', () => {
    const now = Date.now();

    it('does not trigger a surge if sample size in sliding window is < minK (k < 10)', () => {
      const attempts = [
        { trapCode: 'TRAP-03-ESTER-AMIDE' as const, isCorrect: false, timestamp: now - 1000, slideNumber: 28 },
        { trapCode: 'TRAP-03-ESTER-AMIDE' as const, isCorrect: false, timestamp: now - 2000, slideNumber: 28 },
        { trapCode: 'TRAP-03-ESTER-AMIDE' as const, isCorrect: false, timestamp: now - 3000, slideNumber: 28 }
      ];

      const result = evaluateMisconceptionSurge(attempts, 'TRAP-03-ESTER-AMIDE', 15 * 60 * 1000, 10, 0.5, now);
      expect(result.isSurge).toBe(false);
      expect(result.sampleSize).toBe(3);
    });

    it('triggers a surge when sample size >= 10 and failure ratio >= 50%', () => {
      const attempts: Array<{
        trapCode: 'TRAP-03-ESTER-AMIDE';
        isCorrect: boolean;
        timestamp: number;
        slideNumber: number;
      }> = [];

      for (let i = 0; i < 12; i++) {
        attempts.push({
          trapCode: 'TRAP-03-ESTER-AMIDE',
          isCorrect: i >= 8, // 8 incorrect, 4 correct = 66.7% failure
          timestamp: now - (i * 10000),
          slideNumber: 28
        });
      }

      const result = evaluateMisconceptionSurge(attempts, 'TRAP-03-ESTER-AMIDE', 15 * 60 * 1000, 10, 0.5, now);
      expect(result.isSurge).toBe(true);
      expect(result.sampleSize).toBe(12);
      expect(result.ratio).toBeGreaterThanOrEqual(0.5);
      expect(result.slideNumber).toBe(28);
    });

    it('does not trigger a surge if failure ratio is below 50%', () => {
      const attempts: Array<{
        trapCode: 'TRAP-03-ESTER-AMIDE';
        isCorrect: boolean;
        timestamp: number;
        slideNumber: number;
      }> = [];

      for (let i = 0; i < 15; i++) {
        attempts.push({
          trapCode: 'TRAP-03-ESTER-AMIDE',
          isCorrect: i >= 4, // 4 incorrect, 11 correct = 26.7% failure
          timestamp: now - (i * 10000),
          slideNumber: 28
        });
      }

      const result = evaluateMisconceptionSurge(attempts, 'TRAP-03-ESTER-AMIDE', 15 * 60 * 1000, 10, 0.5, now);
      expect(result.isSurge).toBe(false);
      expect(result.ratio).toBeLessThan(0.5);
    });
  });

  describe('Synchronized Cohort Pomodoro State', () => {
    it('returns focus mode during the first 25 minutes of a 30-minute block', () => {
      const fakeEpoch = 10 * 60 * 1000; // Minute 10
      const pomodoro = getCohortPomodoroState(fakeEpoch);
      expect(pomodoro.mode).toBe('focus');
      expect(pomodoro.totalMinutes).toBe(25);
      expect(pomodoro.remainingSeconds).toBe(15 * 60);
      expect(pomodoro.formattedTime).toBe('15:00');
    });

    it('returns break mode during minutes 25 to 30 of a 30-minute block', () => {
      const fakeEpoch = 27 * 60 * 1000; // Minute 27
      const pomodoro = getCohortPomodoroState(fakeEpoch);
      expect(pomodoro.mode).toBe('break');
      expect(pomodoro.totalMinutes).toBe(5);
      expect(pomodoro.remainingSeconds).toBe(3 * 60);
      expect(pomodoro.formattedTime).toBe('03:00');
    });
  });

  describe('FacultyAmfiService Singleton & Subscription', () => {
    let service: FacultyAmfiService;

    beforeEach(() => {
      service = FacultyAmfiService.getInstance();
    });

    it('exposes curated faculties including Marmara, Hacettepe, Istanbul, Ankara, and Ulusal Amfi', () => {
      const faculties = service.getCuratedFaculties();
      expect(faculties.length).toBeGreaterThanOrEqual(5);
      const slugs = faculties.map((f) => f.slug);
      expect(slugs).toContain('marmara-eczacilik');
      expect(slugs).toContain('hacettepe-eczacilik');
      expect(slugs).toContain('istanbul-eczacilik');
      expect(slugs).toContain('ankara-eczacilik');
      expect(slugs).toContain('turkiye-geneli');
    });

    it('notifies subscribers upon room subscription', () => {
      const onPresenceUpdate = vi.fn();
      const onSurgeAlert = vi.fn();

      const unsubscribe = service.subscribeToRoom('marmara-eczacilik', 'medchem', {
        onPresenceUpdate,
        onSurgeAlert
      });

      expect(onPresenceUpdate).toHaveBeenCalled();
      expect(service.getActiveFacultySlug()).toBe('marmara-eczacilik');
      expect(service.getActiveCourseId()).toBe('medchem');

      unsubscribe();
    });

    it('resolves curated challenge for canonical trap codes', () => {
      const challenge = service.getChallengeForTrap('TRAP-03-ESTER-AMIDE');
      expect(challenge).toBeDefined();
      expect(challenge?.trapCode).toBe('TRAP-03-ESTER-AMIDE');
      expect(challenge?.options).toHaveLength(4);
      expect(challenge?.hintLadder).toHaveLength(3);
    });

    it('updates study status and mode', () => {
      service.setStudyStatus('idle');
      service.setMode('vize_triage');
      service.setActiveModule('hafta-02-reseptor-teorisi');
      // Should not throw and preserves state
      expect(service.getStudentEphemeralId()).toHaveLength(64);
    });
  });
});
