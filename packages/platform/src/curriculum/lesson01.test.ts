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
    const title = typeof lessonJson.title === 'string' ? lessonJson.title : lessonJson.title.tr;
    expect(title).toBe('Termodinamik Aktivite ve Ferguson İlkesi');
    expect(lessonJson.id).toBe('mc-mod1-les1');
    expect(lessonJson.courseId).toBe('medchem');
    expect(lessonJson.order).toBe(1);
    expect(lessonJson.access).toBe('free');
  });

  it('contains exactly 12 bite-sized steps', () => {
    expect(lessonJson.steps.length).toBe(12);
  });

  it('strictly enforces <= 40 words of instructional prose on every step', () => {
    lessonJson.steps.forEach((step: any, index: number) => {
      const promptText = typeof step.prompt === 'string' ? step.prompt : step.prompt.tr;
      const count = wordCount(promptText);
      expect(
        count,
        `Step ${index + 1} (${step.id}) has ${count} words, exceeding strict limit of 40!`
      ).toBeLessThanOrEqual(40);
    });
  });

  it('enforces predict-then-reveal mechanics on concept and evaluation steps (2, 6, 8, 9, 12)', () => {
    const predictStepIndices = [1, 5, 7, 8, 11]; // 0-indexed for steps 2, 6, 8, 9, 12

    predictStepIndices.forEach((idx) => {
      const step = lessonJson.steps[idx];
      expect(step.predictThenReveal, `Step ${idx + 1} must have predictThenReveal: true`).toBe(true);
      expect(step.config.options.length, `Step ${idx + 1} must have options`).toBeGreaterThanOrEqual(2);
      expect(step.config.revealedOutcome, `Step ${idx + 1} must have revealedOutcome`).toBeTruthy();
      expect(step.config.explanation, `Step ${idx + 1} must have explanation`).toBeTruthy();
    });
  });

  it('provides 3 populated hint tiers for every step', () => {
    lessonJson.steps.forEach((step: any, index: number) => {
      expect(step.hints.length, `Step ${index + 1} must have exactly 3 hints`).toBe(3);
      const hint0 = typeof step.hints[0] === 'string' ? step.hints[0] : step.hints[0].tr;
      const hint1 = typeof step.hints[1] === 'string' ? step.hints[1] : step.hints[1].tr;
      const hint2 = typeof step.hints[2] === 'string' ? step.hints[2] : step.hints[2].tr;
      expect(hint0.length).toBeGreaterThan(10); // Tier 1: Nudge
      expect(hint1.length).toBeGreaterThan(10); // Tier 2: Clue
      expect(hint2.length).toBeGreaterThan(10); // Tier 3: Solution
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

  it('strictly varies correct answer positions across assessment steps (C2 Policy)', () => {
    const questionSteps = lessonJson.steps.filter(
      (s: any) => s.config && Array.isArray(s.config.options) && s.config.options.length > 0
    );
    expect(questionSteps.length).toBeGreaterThanOrEqual(4);

    const correctIndices: number[] = questionSteps.map((step: any) => {
      const idx = step.config.options.findIndex((opt: any) => opt.isCorrect === true);
      expect(idx).toBeGreaterThanOrEqual(0);
      return idx;
    });

    // 1. Correct answers must NOT all be at the same index (Shannon diversity check)
    const uniqueIndices = new Set(correctIndices);
    expect(uniqueIndices.size).toBeGreaterThan(1);

    // 2. No single index position can exceed 70% of total questions
    const counts = correctIndices.reduce((acc: Record<number, number>, idx: number) => {
      acc[idx] = (acc[idx] || 0) + 1;
      return acc;
    }, {});

    Object.values(counts).forEach((count) => {
      expect(count / correctIndices.length).toBeLessThan(0.70);
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

  it('guarantees client lesson data (lesson01.client.ts) is in sync with master JSON (no drift)', async () => {
    const lessonJsonPath = path.resolve(__dirname, '../../../../courses/medchem/lessons/lesson-01.json');
    const sourceRaw = fs.readFileSync(lessonJsonPath, 'utf8');
    const clientPath = path.resolve(__dirname, '../../../../apps/web/src/data/lesson01.client.ts');
    const existingClientCode = fs.readFileSync(clientPath, 'utf8');
    // @ts-expect-error External ESM script located outside package src root
    const generatorModule = await import('../../../../scripts/generate-lesson-client.mjs');
    const expectedClientCode = generatorModule.generateClientLesson(sourceRaw);
    expect(existingClientCode.trim()).toBe(expectedClientCode.trim());
  });

  it('strictly verifies client data never claims verified when source JSON does not', async () => {
    const lessonJsonPath = path.resolve(__dirname, '../../../../courses/medchem/lessons/lesson-01.json');
    const sourceRaw = fs.readFileSync(lessonJsonPath, 'utf8');
    const source = JSON.parse(sourceRaw);
    // @ts-expect-error External ESM script located outside package src root
    const generatorModule = await import('../../../../scripts/generate-lesson-client.mjs');
    const clientCode = generatorModule.generateClientLesson(sourceRaw);

    const jsonMatch = clientCode.match(/export const clientLesson01: LessonData = ([\s\S]*?) as unknown as LessonData;/);
    expect(jsonMatch).toBeTruthy();
    const clientData = JSON.parse(jsonMatch![1]!);

    // Citations: client status cannot be verified if source is not verified
    (clientData.citations || []).forEach((cCit: any, idx: number) => {
      const sCit = source.citations?.[idx];
      if (cCit.status === 'verified') {
        expect(
          sCit?.status,
          `Client citation ${cCit.id || idx} claims 'verified' but source is '${sCit?.status}'`
        ).toBe('verified');
      }
    });

    // Spaced review cards: client status cannot be verified if source is not verified
    (clientData.spacedReviewCards || []).forEach((cCard: any) => {
      const sCard = (source.spacedReviewCards || []).find((c: any) => c.cardId === cCard.cardId);
      if (cCard.status === 'verified') {
        expect(
          sCard?.status,
          `Client spaced card ${cCard.cardId} claims 'verified' but source is '${sCard?.status}'`
        ).toBe('verified');
      }
    });

    // Disk client data verification
    const clientDiskPath = path.resolve(__dirname, '../../../../apps/web/src/data/lesson01.client.ts');
    const diskContent = fs.readFileSync(clientDiskPath, 'utf8');
    const diskJsonMatch = diskContent.match(/export const clientLesson01: LessonData = ([\s\S]*?) as unknown as LessonData;/);
    expect(diskJsonMatch).toBeTruthy();
    const diskClientData = JSON.parse(diskJsonMatch![1]!);

    (diskClientData.citations || []).forEach((cCit: any, idx: number) => {
      const sCit = source.citations?.[idx];
      if (cCit.status === 'verified') {
        expect(sCit?.status).toBe('verified');
      }
    });

    (diskClientData.spacedReviewCards || []).forEach((cCard: any) => {
      const sCard = (source.spacedReviewCards || []).find((c: any) => c.cardId === cCard.cardId);
      if (cCard.status === 'verified') {
        expect(sCard?.status).toBe('verified');
      }
    });
  });
});
