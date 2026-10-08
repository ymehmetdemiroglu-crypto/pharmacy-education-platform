import {
  HighYieldFactorWeights,
  HighYieldSlide,
  HighYieldSlideTier
} from '../types/vizeTriage.types';
import { INITIAL_HIGH_YIELD_SLIDES } from '../data/highYieldSlides.data';

export class VizeTriageService {
  /**
   * Calculates the bidirectional calendar proximity amplifier:
   * γ_cal(t) = 1.0 + 0.25 * exp(-|T_exam - t| / 7)
   * Decays symmetrically in both pre-exam and post-exam directions.
   */
  public static calculateCalendarAmplifier(examDate?: Date, now: Date = new Date()): number {
    if (!examDate) return 1.0;
    const diffMs = Math.abs(examDate.getTime() - now.getTime());
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    const gamma = 1.0 + 0.25 * Math.exp(-diffDays / 7.0);
    return Math.min(1.25, Math.max(1.0, gamma));
  }

  /**
   * Calculates the High-Yield Score (HYS_s) across normalized weights:
   * w1 = 0.35 (past exam frequency)
   * w2 = 0.25 (professor typography/emphasis)
   * w3 = 0.20 (chemical structure / equation density)
   * w4 = 0.20 (cohort error vulnerability)
   */
  public static calculateHYS(
    factors: HighYieldFactorWeights,
    examDate?: Date,
    now: Date = new Date()
  ): { score: number; tier: HighYieldSlideTier; gammaCal: number } {
    // Normalization bounds from spec: c_freq in [0, 3.0], e_emph in [0, 2.5], s_struct in [0, 2.0], m_cohort in [0, 2.5]
    const normC = Math.min(1.0, Math.max(0, factors.c_freq / 3.0));
    const normE = Math.min(1.0, Math.max(0, factors.e_emph / 2.5));
    const normS = Math.min(1.0, Math.max(0, factors.s_struct / 2.0));
    const normM = Math.min(1.0, Math.max(0, factors.m_cohort / 2.5));

    const z = 0.35 * normC + 0.25 * normE + 0.20 * normS + 0.20 * normM;
    const baseHys = Math.min(100, Math.max(0, Math.round(100 * z)));

    const gammaCal = this.calculateCalendarAmplifier(examDate, now);
    const finalScore = Math.min(100, Math.max(0, Math.round(baseHys * gammaCal)));

    let tier: HighYieldSlideTier = 'CONTEXT_TIER_3';
    if (finalScore >= 75) {
      tier = 'CRITICAL_TIER_1';
    } else if (finalScore >= 45) {
      tier = 'SUPPORTING_TIER_2';
    }

    return {
      score: finalScore,
      tier,
      gammaCal
    };
  }

  /**
   * Retrieves all verified slides for a course with dynamic calendar score adjustment
   */
  public static getSlidesForCourse(
    courseId: 'medchem' | 'pharmacology',
    filterTier?: HighYieldSlideTier | 'all',
    examDate?: Date,
    now: Date = new Date()
  ): HighYieldSlide[] {
    const rawSlides = INITIAL_HIGH_YIELD_SLIDES.filter((s) => s.courseId === courseId);

    const evaluated = rawSlides.map((slide) => {
      const { score, tier, gammaCal } = this.calculateHYS(
        { ...slide.rawFactors, gamma_cal: slide.rawFactors.gamma_cal || 1.0 },
        examDate,
        now
      );
      return {
        ...slide,
        highYieldScore: score,
        tier,
        rawFactors: {
          ...slide.rawFactors,
          gamma_cal: gammaCal
        }
      };
    });

    evaluated.sort((a, b) => b.highYieldScore - a.highYieldScore);

    if (!filterTier || filterTier === 'all') {
      return evaluated;
    }

    return evaluated.filter((s) => s.tier === filterTier);
  }

  /**
   * Selects the Top N% critical cram slides for 1-click Vize Cram Mode
   */
  public static getTopCramSlides(
    courseId: 'medchem' | 'pharmacology',
    limit: number = 5,
    examDate?: Date,
    now: Date = new Date()
  ): HighYieldSlide[] {
    const slides = this.getSlidesForCourse(courseId, 'all', examDate, now);
    const critical = slides.filter((s) => s.tier === 'CRITICAL_TIER_1');
    if (critical.length >= limit) {
      return critical.slice(0, limit);
    }
    return slides.slice(0, limit);
  }

  public static getSlideById(slideId: string): HighYieldSlide | undefined {
    return INITIAL_HIGH_YIELD_SLIDES.find((s) => s.slideId === slideId);
  }

  public static calculateDeckStatistics(
    courseId: 'medchem' | 'pharmacology',
    examDate?: Date,
    now: Date = new Date()
  ): {
    totalSlides: number;
    criticalCount: number;
    supportingCount: number;
    contextCount: number;
    averageHys: number;
  } {
    const slides = this.getSlidesForCourse(courseId, 'all', examDate, now);
    const criticalCount = slides.filter((s) => s.tier === 'CRITICAL_TIER_1').length;
    const supportingCount = slides.filter((s) => s.tier === 'SUPPORTING_TIER_2').length;
    const contextCount = slides.filter((s) => s.tier === 'CONTEXT_TIER_3').length;
    const sumHys = slides.reduce((acc, s) => acc + s.highYieldScore, 0);
    const averageHys = slides.length > 0 ? Math.round(sumHys / slides.length) : 0;

    return {
      totalSlides: slides.length,
      criticalCount,
      supportingCount,
      contextCount,
      averageHys
    };
  }

  /**
   * Convenience alias matching presentation layer requirements
   */
  public static getDeckStatistics(
    courseId: 'medchem' | 'pharmacology',
    examDate?: Date,
    now: Date = new Date()
  ): {
    totalSlides: number;
    criticalTierCount: number;
    supportingTierCount: number;
    contextTierCount: number;
    averageHYS: number;
  } {
    const stats = this.calculateDeckStatistics(courseId, examDate, now);
    return {
      totalSlides: stats.totalSlides,
      criticalTierCount: stats.criticalCount,
      supportingTierCount: stats.supportingCount,
      contextTierCount: stats.contextCount,
      averageHYS: stats.averageHys
    };
  }

  public static getSlidesByCourse(
    courseId: 'medchem' | 'pharmacology',
    filterTier?: HighYieldSlideTier | 'all',
    examDate?: Date,
    now: Date = new Date()
  ): HighYieldSlide[] {
    return this.getSlidesForCourse(courseId, filterTier, examDate, now);
  }
}
