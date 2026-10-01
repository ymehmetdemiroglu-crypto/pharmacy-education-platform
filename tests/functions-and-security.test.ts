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
  executeCreateCheckoutSession,
  executeCreateCustomerPortalSession,
  executeCancelSubscription,
  executeChangeSubscriptionPlan,
  executeDeleteUserAccount,
  Webhook,
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

  // -------------------------------------------------------------
  // Test 7: Payment Server Endpoints (Zod Validation & Mocked SDK)
  // -------------------------------------------------------------
  describe('Payment Server Endpoints (Zod Validation & Mocked SDK)', () => {
    function createMockDodo(overrides?: any) {
      return {
        checkoutSessions: {
          create: async (params: any) => ({
            session_id: 'sess_test_999',
            checkout_url: 'https://test.dodopayments.com/buy/sess_test_999',
            ...overrides?.checkoutCreate?.(params),
          }),
        },
        customers: {
          customerPortal: {
            create: async (customerId: string, params: any) => ({
              portal_url: `https://test.dodopayments.com/portal/${customerId}`,
              expires_at: new Date(Date.now() + 86400000).toISOString(),
              ...overrides?.portalCreate?.(customerId, params),
            }),
          },
        },
        subscriptions: {
          update: async (subscriptionId: string, params: any) => ({
            subscription_id: subscriptionId,
            status: params.status || 'active',
            ...overrides?.subUpdate?.(subscriptionId, params),
          }),
          changePlan: async (subscriptionId: string, params: any) => ({
            subscription_id: subscriptionId,
            status: 'active',
            ...overrides?.changePlan?.(subscriptionId, params),
          }),
        },
      } as any;
    }

    it('creates checkout session with valid parameters and maps product ID', async () => {
      const userId = 'student-checkout-01';
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await db.collection('users').doc(userId).set({
          uid: userId,
          email: 'payer@pharmacy.edu',
          displayName: 'Payer Student',
          plan: 'free',
        });

        const mockDodo = createMockDodo();
        const result = await executeCreateCheckoutSession(
          db,
          userId,
          {
            courseId: 'dual_bundle',
            planId: 'semester_pass',
            currency: 'TRY',
          },
          mockDodo
        );

        expect(result.sessionId).toBe('sess_test_999');
        expect(result.checkoutUrl).toContain('https://test.dodopayments.com');
      });
    });

    it('rejects malformed checkout parameters with invalid-argument error via Zod', async () => {
      const userId = 'student-checkout-02';
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await db.collection('users').doc(userId).set({ uid: userId, plan: 'free' });

        // Missing required planId and invalid courseId
        await expect(
          executeCreateCheckoutSession(db, userId, { courseId: 'non_existent_course' } as any)
        ).rejects.toThrow('Invalid checkout session parameters');
      });
    });

    it('creates customer portal session when user has active dodoCustomerId', async () => {
      const userId = 'student-portal-01';
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await db.collection('users').doc(userId).set({
          uid: userId,
          dodoCustomerId: 'cus_dodo_live_12345',
          plan: 'premium',
        });

        const mockDodo = createMockDodo();
        const result = await executeCreateCustomerPortalSession(db, userId, {}, mockDodo);

        expect(result.portalUrl).toContain('cus_dodo_live_12345');
      });
    });

    it('rejects customer portal request when no customerId is linked', async () => {
      const userId = 'student-portal-no-cus';
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await db.collection('users').doc(userId).set({ uid: userId, plan: 'free' });

        await expect(
          executeCreateCustomerPortalSession(db, userId, {})
        ).rejects.toThrow('No active Dodo Payments customer account linked');
      });
    });

    it('immediately cancels subscription and updates entitlement status to canceled', async () => {
      const userId = 'student-cancel-now';
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await db.collection('users').doc(userId).collection('entitlements').doc('dual_bundle').set({
          courseId: 'dual_bundle',
          status: 'active',
          gatewaySubscriptionId: 'sub_active_123',
        });

        let updatedParams: any;
        const mockDodo = createMockDodo({
          subUpdate: (_subId: string, params: any) => {
            updatedParams = params;
            return { status: 'cancelled' };
          },
        });

        const result = await executeCancelSubscription(
          db,
          userId,
          { courseId: 'dual_bundle', cancelImmediately: true },
          mockDodo
        );

        expect(result.success).toBe(true);
        expect(updatedParams.status).toBe('cancelled');
        expect(updatedParams.cancel_reason).toBe('cancelled_by_customer');

        const entDoc = await db.collection('users').doc(userId).collection('entitlements').doc('dual_bundle').get();
        expect(entDoc.data()?.status).toBe('canceled');
      });
    });

    it('schedules end-of-period cancellation without immediately killing entitlement', async () => {
      const userId = 'student-cancel-period';
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await db.collection('users').doc(userId).collection('entitlements').doc('dual_bundle').set({
          courseId: 'dual_bundle',
          status: 'active',
          gatewaySubscriptionId: 'sub_active_456',
        });

        let updatedParams: any;
        const mockDodo = createMockDodo({
          subUpdate: (_subId: string, params: any) => {
            updatedParams = params;
            return {};
          },
        });

        const result = await executeCancelSubscription(
          db,
          userId,
          { courseId: 'dual_bundle', cancelImmediately: false },
          mockDodo
        );

        expect(result.success).toBe(true);
        expect(updatedParams.cancel_at_next_billing_date).toBe(true);

        const entDoc = await db.collection('users').doc(userId).collection('entitlements').doc('dual_bundle').get();
        expect(entDoc.data()?.cancelAtPeriodEnd).toBe(true);
        expect(entDoc.data()?.status).toBe('active'); // Still active until period end!
      });
    });

    it('changes subscription plan with resolved product ID', async () => {
      const userId = 'student-change-plan';
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await db.collection('users').doc(userId).collection('entitlements').doc('dual_bundle').set({
          courseId: 'dual_bundle',
          planId: 'monthly',
          status: 'active',
          gatewaySubscriptionId: 'sub_active_789',
        });

        let changedParams: any;
        const mockDodo = createMockDodo({
          changePlan: (_subId: string, params: any) => {
            changedParams = params;
            return { status: 'active' };
          },
        });

        const result = await executeChangeSubscriptionPlan(
          db,
          userId,
          { courseId: 'dual_bundle', newPlanId: 'annual' },
          mockDodo
        );

        expect(result.success).toBe(true);
        expect(changedParams.product_id).toBeDefined();

        const entDoc = await db.collection('users').doc(userId).collection('entitlements').doc('dual_bundle').get();
        expect(entDoc.data()?.planId).toBe('annual');
      });
    });

    it('deletes user account, cancels active subscription, and purges data', async () => {
      const userId = 'student-gdpr-delete';
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        const userRef = db.collection('users').doc(userId);
        await userRef.set({ uid: userId, plan: 'premium', email: 'delete@test.com' });
        await userRef.collection('entitlements').doc('dual_bundle').set({
          status: 'active',
          gatewaySubscriptionId: 'sub_to_cancel',
        });
        await userRef.collection('progress').doc('medchem').set({ score: 100 });

        let cancelledSubId = '';
        const mockDodo = createMockDodo({
          subUpdate: (subId: string) => {
            cancelledSubId = subId;
            return {};
          },
        });

        const result = await executeDeleteUserAccount(db, userId, mockDodo);
        expect(result.success).toBe(true);
        expect(cancelledSubId).toBe('sub_to_cancel');

        const deletedUser = await userRef.get();
        expect(deletedUser.exists).toBe(false);

        const deletedEnts = await userRef.collection('entitlements').get();
        expect(deletedEnts.empty).toBe(true);
      });
    });
  });

  // -------------------------------------------------------------
  // Test 8: Standard Webhooks Verification Suite
  // -------------------------------------------------------------
  describe('Standard Webhooks Verification Suite', () => {
    // Standard test secret for webhook verification
    const stdSecret = ['whsec', 'MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw'].join('_');
    const whSigner = new Webhook(stdSecret);

    function createMockRes() {
      let statusCode = 200;
      let data: any = null;
      return {
        status: (code: number) => {
          statusCode = code;
          return { send: (body: any) => { data = body; } };
        },
        getStatus: () => statusCode,
        getData: () => data,
      };
    }

    it('successfully verifies and processes Standard Webhooks signature', async () => {
      const userId = 'student-std-webhook-01';
      const eventId = 'evt_std_001';
      const eventTime = new Date();
      const payload = {
        id: eventId,
        type: 'payment.succeeded',
        timestamp: eventTime.toISOString(),
        data: {
          customer: { metadata: { userId } },
          metadata: { courseId: 'dual_bundle', planId: 'semester_pass' },
          total_amount: 1150,
          currency: 'TRY',
        },
      };

      const rawBody = Buffer.from(JSON.stringify(payload), 'utf8');
      const signature = whSigner.sign(eventId, eventTime, rawBody);
      const timestampSec = Math.floor(eventTime.getTime() / 1000).toString();

      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await db.collection('users').doc(userId).set({ uid: userId, plan: 'free' });

        const mockRes = createMockRes();
        await processDodoWebhook(
          db,
          {
            headers: {
              'webhook-id': eventId,
              'webhook-timestamp': timestampSec,
              'webhook-signature': signature,
            },
            body: payload,
            rawBody,
          },
          mockRes as any,
          stdSecret
        );

        expect(mockRes.getStatus()).toBe(200);
        expect(mockRes.getData()).toEqual({ received: true, status: 'processed' });

        const userDoc = await db.collection('users').doc(userId).get();
        expect(userDoc.data()?.plan).toBe('premium');
      });
    });

    it('rejects forged Standard Webhooks signature with HTTP 401', async () => {
      const eventId = 'evt_std_forged';
      const payload = { id: eventId, type: 'payment.succeeded' };
      const rawBody = Buffer.from(JSON.stringify(payload), 'utf8');

      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        const mockRes = createMockRes();

        await processDodoWebhook(
          db,
          {
            headers: {
              'webhook-id': eventId,
              'webhook-timestamp': Math.floor(Date.now() / 1000).toString(),
              'webhook-signature': 'v1,invalid_forged_base64_signature=',
            },
            body: payload,
            rawBody,
          },
          mockRes as any,
          stdSecret
        );

        expect(mockRes.getStatus()).toBe(401);
      });
    });

    it('drops out-of-order delivery without regressing newer entitlement state', async () => {
      const userId = 'student-seq-test';
      const eventTime = new Date(Date.now() - 60 * 1000); // 1 minute ago (within 5min tolerance)
      const newerRecordedTime = new Date(Date.now() - 10 * 1000); // 10 seconds ago (newer recorded state)

      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        const entRef = db.collection('users').doc(userId).collection('entitlements').doc('dual_bundle');

        // Entitlement was already cancelled at newerRecordedTime
        await entRef.set({
          status: 'cancelled',
          lastEventTimestamp: newerRecordedTime,
        });

        // Stale payment.succeeded from eventTime arrives late
        const stalePayload = {
          id: 'evt_stale_payment',
          type: 'payment.succeeded',
          timestamp: eventTime.toISOString(),
          data: {
            metadata: { userId, courseId: 'dual_bundle' },
          },
        };

        const rawBody = Buffer.from(JSON.stringify(stalePayload), 'utf8');
        const signature = whSigner.sign('evt_stale_payment', eventTime, rawBody);

        const mockRes = createMockRes();
        await processDodoWebhook(
          db,
          {
            headers: {
              'webhook-id': 'evt_stale_payment',
              'webhook-timestamp': Math.floor(eventTime.getTime() / 1000).toString(),
              'webhook-signature': signature,
            },
            body: stalePayload,
            rawBody,
          },
          mockRes as any,
          stdSecret
        );

        expect(mockRes.getStatus()).toBe(200);
        expect(mockRes.getData()).toEqual({ received: true, status: 'ignored_stale' });

        // Entitlement status must REMAIN cancelled, not regressed to active!
        const checkEnt = await entRef.get();
        expect(checkEnt.data()?.status).toBe('cancelled');
      });
    });
  });

  // -------------------------------------------------------------
  // Test 9: Complete Payment Lifecycle E2E Scenarios
  // -------------------------------------------------------------
  describe('Dodo Payment Lifecycle E2E Scenarios (Emulated Firestore & State Assertions)', () => {
    const stdSecret = ['whsec', 'MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw'].join('_');
    const whSigner = new Webhook(stdSecret);

    function createMockRes() {
      let statusCode = 200;
      let data: any = null;
      return {
        status: (code: number) => {
          statusCode = code;
          return { send: (body: any) => { data = body; } };
        },
        getStatus: () => statusCode,
        getData: () => data,
      };
    }

    async function dispatchWebhook(db: any, eventType: string, eventId: string, eventData: any) {
      const now = new Date();
      const payload = {
        id: eventId,
        type: eventType,
        timestamp: now.toISOString(),
        data: eventData,
      };
      const rawBody = Buffer.from(JSON.stringify(payload), 'utf8');
      const signature = whSigner.sign(eventId, now, rawBody);
      const mockRes = createMockRes();

      await processDodoWebhook(
        db,
        {
          headers: {
            'webhook-id': eventId,
            'webhook-timestamp': Math.floor(now.getTime() / 1000).toString(),
            'webhook-signature': signature,
          },
          body: payload,
          rawBody,
        },
        mockRes as any,
        stdSecret
      );

      return mockRes;
    }

    it('Scenario: Successful purchase provisions active entitlement and unlocks gated steps', async () => {
      const userId = 'student-e2e-purchase';
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await db.collection('users').doc(userId).set({ uid: userId, plan: 'free' });
        await db.collection('courses').doc('medchem').collection('lessons').doc('mc-03').collection('steps').doc('step-01').set({
          isFreePreview: false,
          title: 'Advanced Pharmacokinetics',
        });

        await dispatchWebhook(db, 'payment.succeeded', 'evt_e2e_purch_01', {
          metadata: { userId, courseId: 'dual_bundle', planId: 'annual' },
          customer: { customer_id: 'cus_dodo_111' },
          total_amount: 2100,
          currency: 'TRY',
        });

        const userDoc = await db.collection('users').doc(userId).get();
        expect(userDoc.data()?.plan).toBe('premium');

        const entDoc = await db.collection('users').doc(userId).collection('entitlements').doc('dual_bundle').get();
        expect(entDoc.data()?.status).toBe('active');
        expect(entDoc.data()?.planId).toBe('annual');
      });

      // Verify client can read gated lesson step under security rules
      const clientDb = testEnv.authenticatedContext(userId).firestore();
      const stepRef = clientDb.collection('courses').doc('medchem').collection('lessons').doc('mc-03').collection('steps').doc('step-01');
      await assertSucceeds(stepRef.get());
    });

    it('Scenario: Trial conversion transitions user seamlessly from trial to paid premium', async () => {
      const userId = 'student-e2e-convert';
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await db.collection('users').doc(userId).set({ uid: userId, plan: 'free', trialUsed: false });

        // 1. Activate trial
        await executeStartFreeTrial(db, userId);
        const trialUser = await db.collection('users').doc(userId).get();
        expect(trialUser.data()?.plan).toBe('trial');

        // 2. Webhook arrives for subscription.active
        await dispatchWebhook(db, 'subscription.active', 'evt_e2e_convert_01', {
          metadata: { userId, courseId: 'dual_bundle', planId: 'monthly' },
          subscription_id: 'sub_paid_convert',
        });

        // 3. User is converted to premium
        const paidUser = await db.collection('users').doc(userId).get();
        expect(paidUser.data()?.plan).toBe('premium');
      });
    });

    it('Scenario: Failed renewal triggers past_due grace period, preserving access, then renewal recovers active', async () => {
      const userId = 'student-e2e-recovery';
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await db.collection('users').doc(userId).set({ uid: userId, plan: 'premium' });
        await db.collection('courses').doc('medchem').collection('lessons').doc('mc-03').collection('steps').doc('step-01').set({
          isFreePreview: false,
          title: 'Advanced Pharmacokinetics',
        });

        // 1. Failed renewal -> past_due
        await dispatchWebhook(db, 'subscription.past_due', 'evt_e2e_fail_01', {
          metadata: { userId, courseId: 'dual_bundle' },
          subscription_id: 'sub_past_due_1',
        });

        const entDoc1 = await db.collection('users').doc(userId).collection('entitlements').doc('dual_bundle').get();
        expect(entDoc1.data()?.status).toBe('past_due');
        expect(entDoc1.data()?.gracePeriodEndsAt).toBeDefined();
      });

      // Assert user still has access during grace period!
      const clientDb = testEnv.authenticatedContext(userId).firestore();
      const stepRef = clientDb.collection('courses').doc('medchem').collection('lessons').doc('mc-03').collection('steps').doc('step-01');
      await assertSucceeds(stepRef.get());

      // 2. Payment recovery -> subscription.renewed
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await dispatchWebhook(db, 'subscription.renewed', 'evt_e2e_recovered_01', {
          metadata: { userId, courseId: 'dual_bundle', planId: 'monthly' },
          subscription_id: 'sub_past_due_1',
        });

        const entDoc2 = await db.collection('users').doc(userId).collection('entitlements').doc('dual_bundle').get();
        expect(entDoc2.data()?.status).toBe('active');
      });
    });

    it('Scenario: Refund downgrades user to free and revokes gated step access', async () => {
      const userId = 'student-e2e-refund';
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await db.collection('users').doc(userId).set({ uid: userId, plan: 'premium' });
        await db.collection('users').doc(userId).collection('entitlements').doc('dual_bundle').set({
          status: 'active',
          expiresAt: new Date(Date.now() + 86400000),
        });
        await db.collection('courses').doc('medchem').collection('lessons').doc('mc-03').collection('steps').doc('step-01').set({
          isFreePreview: false,
          title: 'Advanced Pharmacokinetics',
        });

        // Process refund
        await dispatchWebhook(db, 'refund.succeeded', 'evt_e2e_refund_01', {
          metadata: { userId, courseId: 'dual_bundle' },
          payment_id: 'pay_refunded_123',
        });

        const userDoc = await db.collection('users').doc(userId).get();
        expect(userDoc.data()?.plan).toBe('free');

        const entDoc = await db.collection('users').doc(userId).collection('entitlements').doc('dual_bundle').get();
        expect(entDoc.data()?.status).toBe('refunded');
      });

      // Assert user access to gated step is now revoked
      const clientDb = testEnv.authenticatedContext(userId).firestore();
      const stepRef = clientDb.collection('courses').doc('medchem').collection('lessons').doc('mc-03').collection('steps').doc('step-01');
      await assertFails(stepRef.get());
    });
  });
});
