/**
 * tests/trial-emulator-lifecycle.test.ts
 * 
 * Real Backend Free Trial Lifecycle & Downgrade Preservation Test (C1 Requirement).
 * 
 * Verified against the real Firebase Firestore Emulator (not client-side mocks or simulated localStorage).
 * 
 * Execution Flow:
 * 1. Seed user profile, progress doc (/users/{uid}/progress/mc-mod1-les1), and 3 Leitner cards (/users/{uid}/review_cards/{cardId}) in Firestore.
 * 2. Invoke real startFreeTrial transaction handler (functions/src/index.ts -> executeStartFreeTrial).
 * 3. Assert active trial plan and active dual_bundle entitlement in Firestore.
 * 4. Invoke real cleanupExpiredTrials batch cron handler (functions/src/index.ts -> executeCleanupExpiredTrials).
 * 5. Assert user downgraded to plan: 'free' and entitlement marked 'expired'.
 * 6. Assert remote Firestore progress document and review cards are 100% INTACT post-downgrade.
 * 7. Assert second startTrial invocation is rejected with failed-precondition.
 */

import { describe, it, beforeAll, afterAll, beforeEach, expect } from 'vitest';
import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import fs from 'fs';
import path from 'path';
import {
  executeStartFreeTrial,
  executeCleanupExpiredTrials,
} from '../functions/src/index';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  const rulesPath = path.resolve(__dirname, '../firestore.rules');
  const rules = fs.readFileSync(rulesPath, 'utf8');

  testEnv = await initializeTestEnvironment({
    projectId: 'demo-pharmacy-platform-trial-e2e',
    firestore: {
      rules,
      host: '127.0.0.1',
      port: 8080,
    },
  });
});

afterAll(async () => {
  if (testEnv) {
    await testEnv.cleanup();
  }
});

beforeEach(async () => {
  if (testEnv) {
    await testEnv.clearFirestore();
  }
});

describe('Real Firebase Emulator Free Trial Lifecycle & Data Integrity E2E (C1 Suite)', () => {
  it('calls real startFreeTrial and real cleanupExpiredTrials on emulator, asserting Firestore progress and cards stay 100% intact after downgrade', async () => {
    const userId = 'student-real-backend-e2e';
    const courseId = 'medchem';
    const lessonId = 'mc-mod1-les1';

    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore();
      const userRef = db.collection('users').doc(userId);

      // 1. Initial State: Free student profile
      await userRef.set({
        uid: userId,
        email: 'student.e2e@pharmacy.edu.tr',
        displayName: 'Trial E2E Student',
        roles: ['student'],
        plan: 'free',
        trialUsed: false,
        createdAt: new Date(),
        lastActiveAt: new Date(),
      });

      // 2. Initial State: Student completes Lesson 1 and accumulates progress in Firestore
      const progressRef = userRef.collection('progress').doc(lessonId);
      await progressRef.set({
        lessonId: lessonId,
        courseId: courseId,
        moduleId: 'mc-mod-01',
        completedSteps: [
          'step-1', 'step-2', 'step-3', 'step-4', 'step-5',
          'step-6', 'step-7', 'step-8', 'step-9', 'step-10'
        ],
        completed: true,
        score: 100,
        totalXP: 50,
        streakDays: 1,
        lastStreakDate: '2026-09-29',
        completedAt: new Date(),
      });

      // 3. Initial State: 3 Spaced Review Cards seeded in user's review_cards subcollection
      const cardCollection = userRef.collection('review_cards');
      const seededCards = [
        {
          cardId: 'mc-mod1-les1-card1',
          drugOrConcept: 'Ferguson Saturation Threshold',
          prompt: 'What is the relative thermodynamic saturation range defining non-specific drug action?',
          answer: 'High relative saturation threshold (substantial fraction of equilibrium)',
          box: 1,
          intervalDays: 1,
          nextDueDate: new Date(Date.now() + 86400000),
          createdAt: new Date(),
        },
        {
          cardId: 'mc-mod1-les1-card2',
          drugOrConcept: 'Chemical Structure Alteration',
          prompt: 'How does altering the chemical core affect structurally specific vs non-specific drugs?',
          answer: 'Structurally specific drugs abolish activity; non-specific drugs retain similar biological effect.',
          box: 1,
          intervalDays: 1,
          nextDueDate: new Date(Date.now() + 86400000),
          createdAt: new Date(),
        },
        {
          cardId: 'mc-mod1-les1-card3',
          drugOrConcept: 'Clinical Classification',
          prompt: 'Classify inhalation anesthetics vs stereoselective beta-blockers according to Ferguson.',
          answer: 'Inhalation anesthetics are non-specific; beta-blockers are structurally specific.',
          box: 1,
          intervalDays: 1,
          nextDueDate: new Date(Date.now() + 86400000),
          createdAt: new Date(),
        }
      ];

      for (const card of seededCards) {
        await cardCollection.doc(card.cardId).set(card);
      }

      // =======================================================================
      // STEP A: Execute REAL startFreeTrial Cloud Function transaction
      // =======================================================================
      const trialResult = await executeStartFreeTrial(db, userId);

      expect(trialResult.success).toBe(true);
      expect(trialResult.plan).toBe('trial');

      // Assert user doc updated in Firestore
      const userAfterTrial = await userRef.get();
      const userData = userAfterTrial.data();
      expect(userData?.plan).toBe('trial');
      expect(userData?.trialUsed).toBe(true);
      expect(userData?.trialStartedAt).toBeDefined();
      expect(userData?.trialEndsAt).toBeDefined();

      // Assert entitlement created in Firestore
      const entDoc = await userRef.collection('entitlements').doc('dual_bundle').get();
      expect(entDoc.exists).toBe(true);
      expect(entDoc.data()?.status).toBe('active');
      expect(entDoc.data()?.plan).toBe('trial');

      // =======================================================================
      // STEP B: Execute REAL cleanupExpiredTrials Cloud Function batch sweeper
      // =======================================================================
      // Simulate 8 days elapsed (past trialEndsAt)
      const eightDaysLater = new Date(Date.now() + 8 * 24 * 60 * 60 * 1000);
      const downgradedCount = await executeCleanupExpiredTrials(db, eightDaysLater);

      expect(downgradedCount).toBe(1);

      // Assert user profile downgraded to 'free' in Firestore
      const userAfterExpiry = await userRef.get();
      expect(userAfterExpiry.data()?.plan).toBe('free');

      // Assert entitlement updated to 'expired' in Firestore
      const entAfterExpiry = await userRef.collection('entitlements').doc('dual_bundle').get();
      expect(entAfterExpiry.data()?.status).toBe('expired');

      // =======================================================================
      // STEP C: Assert remote Firestore progress & cards are 100% INTACT
      // =======================================================================
      const progressAfterDowngrade = await progressRef.get();
      expect(progressAfterDowngrade.exists).toBe(true);
      const prog = progressAfterDowngrade.data();
      expect(prog?.completed).toBe(true);
      expect(prog?.totalXP).toBe(50);
      expect(prog?.score).toBe(100);
      expect(prog?.completedSteps.length).toBe(10);
      expect(prog?.completedSteps).toContain('step-1');
      expect(prog?.completedSteps).toContain('step-10');

      // Assert all 3 review cards in Firestore subcollection are 100% intact
      const cardsSnapshot = await cardCollection.get();
      expect(cardsSnapshot.size).toBe(3);

      const card1 = cardsSnapshot.docs.find(d => d.id === 'mc-mod1-les1-card1')?.data();
      expect(card1).toBeDefined();
      expect(card1?.drugOrConcept).toBe('Ferguson Saturation Threshold');
      expect(card1?.box).toBe(1);
      expect(card1?.intervalDays).toBe(1);

      const card2 = cardsSnapshot.docs.find(d => d.id === 'mc-mod1-les1-card2')?.data();
      expect(card2).toBeDefined();
      expect(card2?.drugOrConcept).toBe('Chemical Structure Alteration');

      const card3 = cardsSnapshot.docs.find(d => d.id === 'mc-mod1-les1-card3')?.data();
      expect(card3).toBeDefined();
      expect(card3?.drugOrConcept).toBe('Clinical Classification');

      // =======================================================================
      // STEP D: Assert server-side single-use enforcement rejects 2nd trial
      // =======================================================================
      await expect(executeStartFreeTrial(db, userId)).rejects.toThrow(
        'You have already activated your 7-day free trial on this account.'
      );
    });
  });
});
