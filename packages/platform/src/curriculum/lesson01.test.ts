import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import {
  LessonSchema,
  wordCount,
  hasCourseAccess,
  completeLesson,
  getDefaultProgress,
  enqueueReviewCards,
  UserProfile,
  CourseEntitlement,
} from '../index';

describe('Lesson 01 Content & Schema Compliance', () => {
  const lessonPath = path.resolve(__dirname, '../../../../courses/medchem/lessons/lesson-01.json');
  const rawData = fs.readFileSync(lessonPath, 'utf8');
  const lessonJson = JSON.parse(rawData);

  it('validates strictly against LessonSchema with zero errors', () => {
    const parseResult = LessonSchema.safeParse(lessonJson);
    if (!parseResult.success) {
      console.error(JSON.stringify(parseResult.error.format(), null, 2));
    }
    expect(parseResult.success).toBe(true);
  });

  it('has exact approved title and ID', () => {
    expect(lessonJson.title).toBe('Thermodynamic Activity & The Ferguson Principle');
    expect(lessonJson.id).toBe('mc-mod1-les1');
    expect(lessonJson.courseId).toBe('medchem');
    expect(lessonJson.order).toBe(1);
    expect(lessonJson.access).toBe('free');
  });

  it('contains exactly 10 bite-sized steps', () => {
    expect(lessonJson.steps.length).toBe(10);
  });

  it('strictly enforces <= 40 words of instructional prose on every step', () => {
    lessonJson.steps.forEach((step: any, index: number) => {
      const count = wordCount(step.prompt);
      expect(
        count,
        `Step ${index + 1} (${step.id}) has ${count} words, exceeding strict limit of 40!`
      ).toBeLessThanOrEqual(40);
    });
  });

  it('enforces predict-then-reveal mechanics on concept steps (2, 3, 4, 6, 7, 8, 9)', () => {
    const predictStepIndices = [1, 2, 3, 5, 6, 7, 8]; // 0-indexed for steps 2, 3, 4, 6, 7, 8, 9
    const exemptStepIndices = [0, 4, 9]; // steps 1, 5, 10

    predictStepIndices.forEach((idx) => {
      const step = lessonJson.steps[idx];
      expect(step.predictThenReveal, `Step ${idx + 1} must have predictThenReveal: true`).toBe(true);
      expect(step.config.options.length, `Step ${idx + 1} must have options`).toBeGreaterThanOrEqual(2);
      expect(step.config.revealedOutcome, `Step ${idx + 1} must have revealedOutcome`).toBeTruthy();
      expect(step.config.explanation, `Step ${idx + 1} must have explanation`).toBeTruthy();
    });

    exemptStepIndices.forEach((idx) => {
      const step = lessonJson.steps[idx];
      expect(step.predictThenReveal, `Step ${idx + 1} must be exempt from predictThenReveal`).toBe(false);
    });
  });

  it('provides 3 populated hint tiers for every step', () => {
    lessonJson.steps.forEach((step: any, index: number) => {
      expect(step.hints.length, `Step ${index + 1} must have exactly 3 hints`).toBe(3);
      expect(step.hints[0].length).toBeGreaterThan(10); // Tier 1: Nudge
      expect(step.hints[1].length).toBeGreaterThan(10); // Tier 2: Clue
      expect(step.hints[2].length).toBeGreaterThan(10); // Tier 3: Solution
    });
  });

  it('strictly complies with Citation Policy (E1): book + edition + topic only, chapter/page marked unverified', () => {
    expect(lessonJson.citations.length).toBeGreaterThanOrEqual(3);

    lessonJson.citations.forEach((c: any) => {
      expect(c.book).toBeTruthy();
      expect(c.edition).toBeTruthy();
      expect(c.topic).toBeTruthy();
      // E1 non-negotiable: Chapter and page must NOT be asserted as verified facts
      expect(c.chapter).toBe('unverified');
      expect(c.page).toBe('unverified');
      expect(c.status).toBe('unverified');
    });
  });

  it('strictly complies with Numeric Claims Policy (E2): saturation threshold marked pending-human-review', () => {
    expect(lessonJson.numericClaims).toBeDefined();
    const saturationClaim = lessonJson.numericClaims.find(
      (n: any) => n.id === 'NUM-MC01-01'
    );
    expect(saturationClaim).toBeDefined();
    expect(saturationClaim.status).toBe('pending-human-review');

    // Also verify in Spaced Review Card 1
    const card1 = lessonJson.spacedReviewCards.find(
      (c: any) => c.cardId === 'mc-mod1-les1-card1'
    );
    expect(card1).toBeDefined();
    expect(card1.status).toBe('pending-human-review');
  });

  it('seeds exactly 3 review cards into Leitner Box 1 with 1-day intervals', () => {
    expect(lessonJson.spacedReviewCards.length).toBe(3);

    lessonJson.spacedReviewCards.forEach((card: any) => {
      expect(card.box).toBe(1);
      expect(card.intervalDays).toBe(1);
      expect(card.prompt.length).toBeGreaterThan(10);
      expect(card.answer.length).toBeGreaterThan(10);
    });
  });
});

describe('Freemium & Trial Lifecycle Rules', () => {
  it('allows unauthenticated guest to access Lesson 1 & Lesson 2 (Free Preview)', () => {
    const hasAccessL1 = hasCourseAccess(null, [], 'medchem', { isFreePreview: true });
    expect(hasAccessL1).toBe(true);

    const hasAccessL2 = hasCourseAccess(null, [], 'medchem', { isFreePreview: true });
    expect(hasAccessL2).toBe(true);
  });

  it('denies unauthenticated guest access to Lesson 3 (Paid)', () => {
    const hasAccessL3 = hasCourseAccess(null, [], 'medchem', { isFreePreview: false });
    expect(hasAccessL3).toBe(false);
  });

  it('denies authenticated free student access to Lesson 3 without active trial or entitlement', () => {
    const freeUser: UserProfile = {
      userId: 'student-free-01',
      plan: 'free',
      trialUsed: false,
      preferredLanguage: 'en',
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };

    const hasAccess = hasCourseAccess(freeUser, [], 'medchem', { isFreePreview: false });
    expect(hasAccess).toBe(false);
  });

  it('grants access to Lesson 3 when user has active trial', () => {
    const now = new Date();
    const trialUser: UserProfile = {
      userId: 'student-trial-01',
      plan: 'trial',
      trialUsed: true,
      trialStartedAt: now.toISOString(),
      trialEndsAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      preferredLanguage: 'en',
      createdAt: now.toISOString(),
      lastActiveAt: now.toISOString(),
    };

    const hasAccess = hasCourseAccess(trialUser, [], 'medchem', { isFreePreview: false });
    expect(hasAccess).toBe(true);
  });

  it('denies access to Lesson 3 when trial has expired and user has no paid entitlement', () => {
    const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24); // 1 day ago
    const expiredUser: UserProfile = {
      userId: 'student-expired-01',
      plan: 'trial',
      trialUsed: true,
      trialStartedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      trialEndsAt: pastDate.toISOString(),
      preferredLanguage: 'en',
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };

    const hasAccess = hasCourseAccess(expiredUser, [], 'medchem', { isFreePreview: false });
    expect(hasAccess).toBe(false);
  });

  it('grants access when user holds active dual_bundle entitlement', () => {
    const freeUser: UserProfile = {
      userId: 'student-bundle-01',
      plan: 'free',
      trialUsed: true,
      preferredLanguage: 'en',
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };

    const activeEntitlement: CourseEntitlement = {
      courseId: 'dual_bundle',
      entitlementId: 'ent-bundle-01',
      plan: 'premium',
      status: 'active',
      planId: 'semester_pass',
      startedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
      autoRenew: true,
    };

    const hasAccess = hasCourseAccess(freeUser, [activeEntitlement], 'medchem', {
      isFreePreview: false,
    });
    expect(hasAccess).toBe(true);
  });

  it('completes Lesson 1, awards 50 XP, and increments daily streak', () => {
    const initialProgress = getDefaultProgress('medchem');
    expect(initialProgress.totalXP).toBe(0);
    expect(initialProgress.streakDays).toBe(0);

    const updated = completeLesson(initialProgress, 'mc-mod1-les1', new Date());
    expect(updated.completedLessonIds).toContain('mc-mod1-les1');
    expect(updated.totalXP).toBe(50);
    expect(updated.streakDays).toBe(1);
  });

  it('enqueues 3 review cards into Leitner Box 1 without duplicates', () => {
    const seeds = [
      {
        cardId: 'c1',
        courseId: 'medchem',
        drugOrConcept: 'Concept 1',
        prompt: 'Prompt 1',
        answer: 'Ans 1',
        box: 1 as const,
        intervalDays: 1,
      },
      {
        cardId: 'c2',
        courseId: 'medchem',
        drugOrConcept: 'Concept 2',
        prompt: 'Prompt 2',
        answer: 'Ans 2',
        box: 1 as const,
        intervalDays: 1,
      },
    ];

    const cards = enqueueReviewCards([], seeds);
    expect(cards.length).toBe(2);
    expect(cards[0]?.box).toBe(1);
    expect(cards[0]?.intervalDays).toBe(1);

    // Re-enqueuing does not create duplicates
    const cards2 = enqueueReviewCards(cards, seeds);
    expect(cards2.length).toBe(2);
  });
});
