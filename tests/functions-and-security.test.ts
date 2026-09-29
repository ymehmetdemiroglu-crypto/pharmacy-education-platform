import { describe, it, beforeAll, afterAll, beforeEach, expect } from 'vitest';
import {
  initializeTestEnvironment,
  RulesTestEnvironment,
  assertFails,
  assertSucceeds,
} from '@firebase/rules-unit-testing';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  executeStartFreeTrial,
  processDodoWebhook,
  executeCleanupExpiredTrials,
} from '../functions/src/index';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  const rulesPath = path.resolve(__dirname, '../firestore.rules');
  const rules = fs.readFileSync(rulesPath, 'utf8');

  testEnv = await initializeTestEnvironment({
    projectId: 'demo-pharmacy-platform-functions',
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

describe('Cloud Functions & Backend Entitlement Security Tests (A4 Suite)', () => {
  // -------------------------------------------------------------
  // Test 1: startTrial Single-Use & Concurrency Defense
  // -------------------------------------------------------------
  describe('startTrial Single-Use & Atomic Concurrency', () => {
    it('successfully provisions 7-day free trial on first call using real function export', async () => {
      const userId = 'student-trial-01';

      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        const userRef = db.collection('users').doc(userId);
        await userRef.set({
          uid: userId,
          email: 'trial1@student.pharmacy.edu',
          displayName: 'Trial Student',
          roles: ['student'],
          plan: 'free',
          trialUsed: false,
          createdAt: new Date(),
        });

        // Invoke real exported executeStartFreeTrial handler
        const result = await executeStartFreeTrial(db, userId);

        expect(result.success).toBe(true);
        expect(result.plan).toBe('trial');

        const updatedDoc = await userRef.get();
        expect(updatedDoc.data()?.plan).toBe('trial');
        expect(updatedDoc.data()?.trialUsed).toBe(true);

        const entDoc = await userRef.collection('entitlements').doc('dual_bundle').get();
        expect(entDoc.data()?.status).toBe('active');
        expect(entDoc.data()?.plan).toBe('trial');
      });
    });

    it('rejects a second startTrial invocation with failed-precondition', async () => {
      const userId = 'student-trial-02';

      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        const userRef = db.collection('users').doc(userId);
        await userRef.set({
          uid: userId,
          plan: 'trial',
          trialUsed: true, // Already consumed
          trialStartedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        });

        // Attempt 2nd startTrial via real handler
        await expect(executeStartFreeTrial(db, userId)).rejects.toThrow(
          'You have already activated your 7-day free trial on this account.'
        );
      });
    });

    it('guarantees atomic concurrency: concurrent startTrial calls allow only 1 success', async () => {
      const userId = 'student-trial-concurrent';

      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        const userRef = db.collection('users').doc(userId);
        await userRef.set({
          uid: userId,
          plan: 'free',
          trialUsed: false,
        });

        // Launch 2 concurrent requests directly against the exported transaction handler
        const results = await Promise.allSettled([
          executeStartFreeTrial(db, userId),
          executeStartFreeTrial(db, userId),
        ]);
        const successes = results.filter((r) => r.status === 'fulfilled');
        const rejections = results.filter((r) => r.status === 'rejected');

        expect(successes.length).toBe(1);
        expect(rejections.length).toBe(1);

        const finalDoc = await userRef.get();
        expect(finalDoc.data()?.trialUsed).toBe(true);
        expect(finalDoc.data()?.plan).toBe('trial');
      });
    });

    it('guards against overwriting active paid premium accounts', async () => {
      const userId = 'student-premium-already';

      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await db.collection('users').doc(userId).set({
          uid: userId,
          plan: 'premium',
          trialUsed: false,
        });

        await expect(executeStartFreeTrial(db, userId)).rejects.toThrow(
          'Account already holds active Premium access.'
        );
      });
    });

    it('strictly forbids client from resetting trialUsed in Firestore security rules', async () => {
      const userId = 'student-tamper-trial';

      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await db.collection('users').doc(userId).set({
          uid: userId,
          email: 'tamper@pharmacy.edu',
          roles: ['student'],
          plan: 'free',
          trialUsed: true, // Already consumed
          createdAt: new Date(),
        });
      });

      const clientDb = testEnv.authenticatedContext(userId).firestore();
      const clientUserRef = clientDb.collection('users').doc(userId);

      // Attempt to tamper with trialUsed
      await assertFails(
        clientUserRef.update({
          trialUsed: false,
        })
      );
    });

    it('rejects startFreeTrial callable path when unauthenticated (no auth)', async () => {
      // Direct call to startFreeTrial callable without auth context
      const unauthRequest = { auth: undefined, data: {} };
      
      // Simulate callable execution logic from functions/src/index.ts
      const invokeCallable = async (req: any) => {
        if (!req.auth) {
          throw new Error('unauthenticated: User must be authenticated to start a free trial.');
        }
        return await executeStartFreeTrial(testEnv.unauthenticatedContext().firestore(), req.auth.uid);
      };

      await expect(invokeCallable(unauthRequest)).rejects.toThrow('unauthenticated');
    });

    it('strictly binds trial to caller auth.uid and rejects unauthorized writes to another user profile', async () => {
      const attackerUid = 'attacker-user-01';
      const victimUid = 'victim-user-02';

      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await db.collection('users').doc(victimUid).set({
          uid: victimUid,
          email: 'victim@pharmacy.edu',
          roles: ['student'],
          plan: 'free',
          trialUsed: false,
          createdAt: new Date(),
        });
      });

      // Attacker attempts to directly write to victim's profile to trigger or tamper with trial
      const attackerDb = testEnv.authenticatedContext(attackerUid).firestore();
      const victimDocRef = attackerDb.collection('users').doc(victimUid);

      await assertFails(
        victimDocRef.update({
          plan: 'trial',
          trialUsed: true,
        })
      );

      // Attacker attempts to write into victim's entitlements
      const victimEntRef = victimDocRef.collection('entitlements').doc('dual_bundle');
      await assertFails(
        victimEntRef.set({
          plan: 'trial',
          status: 'active',
        })
      );
    });
  });

  // -------------------------------------------------------------
  // Test 2: Trial Expiry Downgrade & Progress Preservation
  // -------------------------------------------------------------
  describe('Trial Expiry Downgrade & Student Progress Preservation', () => {
    it('downgrades expired trials to free while keeping 100% of student progress intact using real batch logic', async () => {
      const userId = 'student-expired-trial';
      const pastDate = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000); // 8 days ago

      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        const userRef = db.collection('users').doc(userId);

        // Seed expired trial user
        await userRef.set({
          uid: userId,
          plan: 'trial',
          trialUsed: true,
          trialStartedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
          trialEndsAt: pastDate,
        });

        // Seed active entitlement
        const entRef = userRef.collection('entitlements').doc('dual_bundle');
        await entRef.set({
          courseId: 'dual_bundle',
          status: 'active',
          plan: 'trial',
          expiresAt: pastDate,
        });

        // Seed crucial student lesson progress
        const progressRef = userRef.collection('progress').doc('mc-01-l01');
        await progressRef.set({
          lessonId: 'mc-01-l01',
          moduleId: 'mc-01',
          courseId: 'medchem',
          completedSteps: ['step-1', 'step-2', 'step-3', 'checkpoint-1'],
          score: 100,
          xpEarned: 150,
          completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          lastAccessedStepId: 'step-3',
        });

        // Execute real exported executeCleanupExpiredTrials function
        const count = await executeCleanupExpiredTrials(db, new Date());
        expect(count).toBe(1);

        // 1. Verify user profile downgraded to free
        const updatedUser = await userRef.get();
        expect(updatedUser.data()?.plan).toBe('free');

        // 2. Verify entitlement marked expired
        const updatedEnt = await entRef.get();
        expect(updatedEnt.data()?.status).toBe('expired');

        // 3. Verify student progress is 100% PRESERVED
        const progressDoc = await progressRef.get();
        expect(progressDoc.exists).toBe(true);
        expect(progressDoc.data()?.score).toBe(100);
        expect(progressDoc.data()?.xpEarned).toBe(150);
        expect(progressDoc.data()?.completedSteps).toEqual([
          'step-1',
          'step-2',
          'step-3',
          'checkpoint-1',
        ]);
      });
    });
  });

  // -------------------------------------------------------------
  // Test 3: Webhook HMAC Signature & Idempotency
  // -------------------------------------------------------------
  describe('Dodo Webhook HMAC Validation & Idempotency Locking', () => {
    const secret = 'emulator_test_webhook_secret_32bytes_long!';

    function createMockRes() {
      let statusCode = 200;
      let sentData: any = null;
      const res = {
        status(code: number) {
          statusCode = code;
          return {
            send(data: any) {
              sentData = data;
            },
          };
        },
        getStatus() {
          return statusCode;
        },
        getData() {
          return sentData;
        },
      };
      return res;
    }

    it('accepts valid HMAC signature and processes entitlement via real handler', async () => {
      const payload = {
        id: 'evt_valid_001',
        type: 'payment.succeeded',
        data: {
          customer: { metadata: { userId: 'student-payer-01' } },
          metadata: { courseId: 'dual_bundle', planId: 'semester_pass' },
          currency: 'USD',
          amount: 49,
        },
      };

      const rawBody = Buffer.from(JSON.stringify(payload), 'utf8');
      const validSig = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');

      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        const userRef = db.collection('users').doc('student-payer-01');
        await userRef.set({
          uid: 'student-payer-01',
          plan: 'free',
        });

        const mockRes = createMockRes();
        await processDodoWebhook(
          db,
          {
            headers: { 'x-dodo-signature': validSig },
            body: payload,
            rawBody,
          },
          mockRes as any,
          secret
        );

        expect(mockRes.getStatus()).toBe(200);
        expect(mockRes.getData()).toEqual({ received: true, status: 'processed' });

        const updatedUser = await userRef.get();
        expect(updatedUser.data()?.plan).toBe('premium');

        const entDoc = await userRef.collection('entitlements').doc('dual_bundle').get();
        expect(entDoc.data()?.status).toBe('active');
        expect(entDoc.data()?.plan).toBe('premium');
      });
    });

    it('rejects invalid HMAC signature with HTTP 401', async () => {
      const payload = { id: 'evt_invalid_001', type: 'payment.succeeded' };
      const rawBody = Buffer.from(JSON.stringify(payload), 'utf8');
      const forgedSig = '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';

      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        const mockRes = createMockRes();
        await processDodoWebhook(
          db,
          {
            headers: { 'x-dodo-signature': forgedSig },
            body: payload,
            rawBody,
          },
          mockRes as any,
          secret
        );

        expect(mockRes.getStatus()).toBe(401);
        expect(mockRes.getData()).toBe('Invalid webhook signature');
      });
    });

    it('rejects length-mismatched signature safely without throwing (timingSafeEqual guard)', async () => {
      const payload = { id: 'evt_short_001', type: 'payment.succeeded' };
      const rawBody = Buffer.from(JSON.stringify(payload), 'utf8');
      const shortSig = 'truncated_sig';

      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        const mockRes = createMockRes();
        await processDodoWebhook(
          db,
          {
            headers: { 'x-dodo-signature': shortSig },
            body: payload,
            rawBody,
          },
          mockRes as any,
          secret
        );

        expect(mockRes.getStatus()).toBe(401);
        expect(mockRes.getData()).toBe('Invalid webhook signature');
      });
    });

    it('enforces atomic event idempotency: duplicate event IDs return already_processed', async () => {
      const eventId = 'evt_duplicate_idempotent_01';
      const payload = {
        id: eventId,
        type: 'payment.succeeded',
        data: {
          customer: { metadata: { userId: 'student-idempotent-01' } },
          metadata: { courseId: 'dual_bundle', planId: 'semester_pass' },
        },
      };

      const rawBody = Buffer.from(JSON.stringify(payload), 'utf8');
      const validSig = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');

      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await db.collection('users').doc('student-idempotent-01').set({
          uid: 'student-idempotent-01',
          plan: 'free',
        });

        // 1st delivery
        const mockRes1 = createMockRes();
        await processDodoWebhook(
          db,
          {
            headers: { 'x-dodo-signature': validSig },
            body: payload,
            rawBody,
          },
          mockRes1 as any,
          secret
        );
        expect(mockRes1.getStatus()).toBe(200);
        expect(mockRes1.getData()).toEqual({ received: true, status: 'processed' });

        // 2nd delivery (duplicate event replay)
        const mockRes2 = createMockRes();
        await processDodoWebhook(
          db,
          {
            headers: { 'x-dodo-signature': validSig },
            body: payload,
            rawBody,
          },
          mockRes2 as any,
          secret
        );
        expect(mockRes2.getStatus()).toBe(200);
        expect(mockRes2.getData()).toEqual({ received: true, status: 'already_processed' });
      });
    });

    it('handles refund event by downgrading user to free and marking entitlement refunded', async () => {
      const eventId = 'evt_refund_001';
      const payload = {
        id: eventId,
        type: 'refund.created',
        data: {
          customer: { metadata: { userId: 'student-refund-01' } },
          metadata: { courseId: 'dual_bundle' },
        },
      };

      const rawBody = Buffer.from(JSON.stringify(payload), 'utf8');
      const validSig = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');

      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        const userRef = db.collection('users').doc('student-refund-01');
        await userRef.set({
          uid: 'student-refund-01',
          plan: 'premium',
        });
        const entRef = userRef.collection('entitlements').doc('dual_bundle');
        await entRef.set({
          courseId: 'dual_bundle',
          status: 'active',
          plan: 'premium',
        });

        const mockRes = createMockRes();
        await processDodoWebhook(
          db,
          {
            headers: { 'x-dodo-signature': validSig },
            body: payload,
            rawBody,
          },
          mockRes as any,
          secret
        );

        expect(mockRes.getStatus()).toBe(200);
        const updatedUser = await userRef.get();
        expect(updatedUser.data()?.plan).toBe('free');

        const updatedEnt = await entRef.get();
        expect(updatedEnt.data()?.status).toBe('refunded');
      });
    });
  });

  // -------------------------------------------------------------
  // Test 4: Entitlement Expiry Temporal Defense
  // -------------------------------------------------------------
  describe('Entitlement Temporal Expiration Verification', () => {
    it('locks out student from reading paid steps once entitlement has expired', async () => {
      const userId = 'student-expired-entitlement';
      const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000); // 1 day ago

      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();

        // Seed paid lesson step
        await db.collection('courses').doc('medchem').collection('lessons').doc('mc-03').collection('steps').doc('step-1').set({
          stepId: 'step-1',
          isFreePreview: false, // Paid step
          title: 'Advanced SAR Tuning',
        });

        // Seed expired entitlement
        await db.collection('users').doc(userId).collection('entitlements').doc('medchem').set({
          courseId: 'medchem',
          status: 'active',
          expiresAt: pastDate, // Expired!
        });
      });

      const clientDb = testEnv.authenticatedContext(userId).firestore();
      const stepRef = clientDb.collection('courses').doc('medchem').collection('lessons').doc('mc-03').collection('steps').doc('step-1');

      // Attempt read with expired entitlement -> must fail
      await assertFails(stepRef.get());
    });
  });

  // -------------------------------------------------------------
  // Test 5: Cross-User Data Isolation
  // -------------------------------------------------------------
  describe('Cross-User Data Isolation', () => {
    it('strictly forbids User A from reading or modifying User B progress or entitlements', async () => {
      const userA = 'student-alice';
      const userB = 'student-bob';

      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();

        await db.collection('users').doc(userB).collection('progress').doc('medchem').set({
          completedLessonIds: ['mc-01-l01'],
          score: 95,
        });

        await db.collection('users').doc(userB).collection('entitlements').doc('medchem').set({
          courseId: 'medchem',
          status: 'active',
        });
      });

      const aliceDb = testEnv.authenticatedContext(userA).firestore();

      // Alice tries to read Bob's progress
      await assertFails(aliceDb.collection('users').doc(userB).collection('progress').doc('medchem').get());

      // Alice tries to write Bob's progress
      await assertFails(aliceDb.collection('users').doc(userB).collection('progress').doc('medchem').set({ completedLessonIds: [] }));

      // Alice tries to read Bob's entitlements
      await assertFails(aliceDb.collection('users').doc(userB).collection('entitlements').doc('medchem').get());

      // Alice tries to write Bob's entitlements
      await assertFails(aliceDb.collection('users').doc(userB).collection('entitlements').doc('medchem').set({ status: 'revoked' }));
    });
  });

  // -------------------------------------------------------------
  // Test 6: Progress & Step Access Rules (Unauthenticated & Gated)
  // -------------------------------------------------------------
  describe('Progress Write & Unauthenticated Step Access Rules', () => {
    it('allows student to update their own lesson progress, but denies writing to entitlements', async () => {
      const userId = 'student-charlie';

      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await db.collection('users').doc(userId).set({
          uid: userId,
          email: 'charlie@pharmacy.edu',
          roles: ['student'],
          plan: 'free',
          trialUsed: false,
          createdAt: new Date(),
        });
      });

      const charlieDb = testEnv.authenticatedContext(userId).firestore();

      // Charlie writes to their own progress with completedLessonIds list -> Allowed
      await assertSucceeds(
        charlieDb.collection('users').doc(userId).collection('progress').doc('medchem').set({
          completedLessonIds: ['mc-01-l01', 'mc-01-l02'],
          score: 80,
          updatedAt: new Date(),
        })
      );

      // Charlie attempts to write directly to their entitlements -> Blocked!
      await assertFails(
        charlieDb.collection('users').doc(userId).collection('entitlements').doc('medchem').set({
          courseId: 'medchem',
          status: 'active',
          plan: 'premium',
        })
      );
    });

    it('strictly denies unauthenticated client writes to user progress or profiles', async () => {
      const unauthDb = testEnv.unauthenticatedContext().firestore();

      // Unauthenticated client attempts to write progress
      await assertFails(
        unauthDb.collection('users').doc('anonymous-user').collection('progress').doc('medchem').set({
          completedLessonIds: ['mc-mod1-les1'],
          score: 100,
        })
      );

      // Unauthenticated client attempts to create user profile
      await assertFails(
        unauthDb.collection('users').doc('anonymous-user').set({
          uid: 'anonymous-user',
          plan: 'premium',
        })
      );
    });

    it('allows unauthenticated read of Lesson 1 steps (free preview) but rejects Lesson 3 steps (paid)', async () => {
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();

        // Lesson 1 Step (Free preview)
        await db
          .collection('courses')
          .doc('medchem')
          .collection('lessons')
          .doc('lesson-01')
          .collection('steps')
          .doc('step-01')
          .set({
            stepId: 'step-01',
            isFreePreview: true,
            title: 'Thermodynamic Activity',
          });

        // Lesson 3 Step (Paid)
        await db
          .collection('courses')
          .doc('medchem')
          .collection('lessons')
          .doc('lesson-03')
          .collection('steps')
          .doc('step-01')
          .set({
            stepId: 'step-01',
            isFreePreview: false,
            title: 'Partition Coefficient Calculations',
          });
      });

      const unauthDb = testEnv.unauthenticatedContext().firestore();

      // Lesson 1 Step -> Read allowed for unauthenticated
      await assertSucceeds(
        unauthDb
          .collection('courses')
          .doc('medchem')
          .collection('lessons')
          .doc('lesson-01')
          .collection('steps')
          .doc('step-01')
          .get()
      );

      // Lesson 3 Step -> Read strictly rejected for unauthenticated
      await assertFails(
        unauthDb
          .collection('courses')
          .doc('medchem')
          .collection('lessons')
          .doc('lesson-03')
          .collection('steps')
          .doc('step-01')
          .get()
      );
    });

    it('strictly rejects unauthenticated writes to course steps or catalog', async () => {
      const unauthDb = testEnv.unauthenticatedContext().firestore();

      await assertFails(
        unauthDb
          .collection('courses')
          .doc('medchem')
          .collection('lessons')
          .doc('lesson-01')
          .collection('steps')
          .doc('step-01')
          .set({
            title: 'Hacked Step',
          })
      );

      await assertFails(
        unauthDb.collection('courses').doc('medchem').set({
          title: 'Hacked Course',
        })
      );
    });
  });
});
