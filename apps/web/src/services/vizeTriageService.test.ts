import { describe, it, expect } from 'vitest';
import { VizeTriageService } from './vizeTriageService';

describe('VizeTriageService', () => {
  describe('calculateCalendarAmplifier', () => {
    it('returns 1.0 when examDate is undefined', () => {
      expect(VizeTriageService.calculateCalendarAmplifier()).toBe(1.0);
    });

    it('returns 1.25 on exact exam date (maximum surge)', () => {
      const now = new Date('2026-11-15T10:00:00Z');
      const examDate = new Date('2026-11-15T10:00:00Z');
      expect(VizeTriageService.calculateCalendarAmplifier(examDate, now)).toBe(1.25);
    });

    it('decays symmetrically pre-exam and post-exam', () => {
      const examDate = new Date('2026-11-15T10:00:00Z');
      const pre7Days = new Date('2026-11-08T10:00:00Z');
      const post7Days = new Date('2026-11-22T10:00:00Z');

      const gammaPre = VizeTriageService.calculateCalendarAmplifier(examDate, pre7Days);
      const gammaPost = VizeTriageService.calculateCalendarAmplifier(examDate, post7Days);

      expect(gammaPre).toBeCloseTo(1.092, 2);
      expect(gammaPost).toBeCloseTo(1.092, 2);
      expect(gammaPre).toBeCloseTo(gammaPost, 4);
    });

    it('decays toward 1.0 when 30 days away', () => {
      const examDate = new Date('2026-11-15T10:00:00Z');
      const post30Days = new Date('2026-12-15T10:00:00Z');
      const gamma = VizeTriageService.calculateCalendarAmplifier(examDate, post30Days);
      expect(gamma).toBeCloseTo(1.003, 2);
    });
  });

  describe('calculateHYS', () => {
    it('returns 0 and CONTEXT_TIER_3 when all factors are zero', () => {
      const result = VizeTriageService.calculateHYS({
        c_freq: 0,
        e_emph: 0,
        s_struct: 0,
        m_cohort: 0,
        gamma_cal: 1.0
      });
      expect(result.score).toBe(0);
      expect(result.tier).toBe('CONTEXT_TIER_3');
      expect(result.gammaCal).toBe(1.0);
    });

    it('returns 100 and CRITICAL_TIER_1 when all factors are maximal', () => {
      const result = VizeTriageService.calculateHYS({
        c_freq: 3.0,
        e_emph: 2.5,
        s_struct: 2.0,
        m_cohort: 2.5,
        gamma_cal: 1.0
      });
      expect(result.score).toBe(100);
      expect(result.tier).toBe('CRITICAL_TIER_1');
    });

    it('assigns SUPPORTING_TIER_2 when score is between 45 and 74', () => {
      // 50% across all factors -> z = 0.50 -> HYS = 50
      const result = VizeTriageService.calculateHYS({
        c_freq: 1.5,
        e_emph: 1.25,
        s_struct: 1.0,
        m_cohort: 1.25,
        gamma_cal: 1.0
      });
      expect(result.score).toBe(50);
      expect(result.tier).toBe('SUPPORTING_TIER_2');
    });

    it('multiplies base score by exam calendar amplifier correctly', () => {
      const now = new Date('2026-11-15T10:00:00Z');
      const examDate = new Date('2026-11-15T10:00:00Z'); // gamma = 1.25
      const result = VizeTriageService.calculateHYS(
        {
          c_freq: 1.8, // 60%
          e_emph: 1.5, // 60%
          s_struct: 1.2, // 60%
          m_cohort: 1.5, // 60%
          gamma_cal: 1.0
        },
        examDate,
        now
      );
      // base = 60 * 1.25 = 75
      expect(result.score).toBe(75);
      expect(result.tier).toBe('CRITICAL_TIER_1');
    });
  });

  describe('slide queries & filtering', () => {
    it('returns MedChem slides sorted descending by highYieldScore', () => {
      const slides = VizeTriageService.getSlidesForCourse('medchem');
      expect(slides.length).toBeGreaterThan(0);
      for (let i = 0; i < slides.length - 1; i++) {
        expect(slides[i]!.highYieldScore).toBeGreaterThanOrEqual(slides[i + 1]!.highYieldScore);
      }
    });

    it('returns Pharmacology slides sorted descending by highYieldScore', () => {
      const slides = VizeTriageService.getSlidesForCourse('pharmacology');
      expect(slides.length).toBeGreaterThan(0);
      for (let i = 0; i < slides.length - 1; i++) {
        expect(slides[i]!.highYieldScore).toBeGreaterThanOrEqual(slides[i + 1]!.highYieldScore);
      }
    });

    it('filters slides by CRITICAL_TIER_1', () => {
      const criticalSlides = VizeTriageService.getSlidesForCourse('medchem', 'CRITICAL_TIER_1');
      expect(criticalSlides.length).toBeGreaterThan(0);
      criticalSlides.forEach((s) => {
        expect(s.tier).toBe('CRITICAL_TIER_1');
        expect(s.highYieldScore).toBeGreaterThanOrEqual(75);
      });
    });

    it('returns Top N cram slides with getTopCramSlides', () => {
      const cramSlides = VizeTriageService.getTopCramSlides('medchem', 3);
      expect(cramSlides.length).toBe(3);
      expect(cramSlides[0]!.highYieldScore).toBeGreaterThanOrEqual(cramSlides[1]!.highYieldScore);
    });

    it('calculates deck statistics with accurate counts', () => {
      const stats = VizeTriageService.calculateDeckStatistics('pharmacology');
      expect(stats.totalSlides).toBe(5);
      expect(stats.criticalCount).toBe(5);
      expect(stats.averageHys).toBeGreaterThan(80);
    });
  });
});
