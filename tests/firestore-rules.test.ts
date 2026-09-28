import { describe, it, beforeAll, afterAll, beforeEach, expect } from 'vitest';
import {
  initializeTestEnvironment,
  RulesTestEnvironment,
  assertFails,
  assertSucceeds,
} from '@firebase/rules-unit-testing';
import fs from 'fs';
import path from 'path';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  const rulesPath = path.resolve(__dirname, '../firestore.rules');
  const rules = fs.readFileSync(rulesPath, 'utf8');

  testEnv = await initializeTestEnvironment({
    projectId: 'demo-pharmacy-platform',
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

describe('Firestore Security Rules Testing', () => {
  it('allows public unauthenticated read of courses, modules, and lessons', async () => {
    // Seed catalog via admin context
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore();
      await db.collection('courses').doc('medchem').set({
        title: 'Medicinal Chemistry',
        published: true,
      });
      await db.collection('courses').doc('medchem').collection('modules').doc('mc-mod-01').set({
        title: 'Physicochemical Properties',
      });
      await db.collection('courses').doc('medchem').collection('lessons').doc('mc-les-01').set({
        title: 'Bioisosterism',
        isFreePreview: true,
      });
    });

    const unauthDb = testEnv.unauthenticatedContext().firestore();

    // Verify public read
    await assertSucceeds(unauthDb.collection('courses').doc('medchem').get());
    await assertSucceeds(
      unauthDb.collection('courses').doc('medchem').collection('modules').doc('mc-mod-01').get()
    );
    await assertSucceeds(
      unauthDb.collection('courses').doc('medchem').collection('lessons').doc('mc-les-01').get()
    );

    // Verify public write is denied
    await assertFails(
      unauthDb.collection('courses').doc('medchem').set({ title: 'Hacked Title' })
    );
  });

  it('allows unauthenticated read of free preview steps (Lessons 1 & 2)', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore();
      await db
        .collection('courses')
        .doc('medchem')
        .collection('lessons')
        .doc('mc-les-01')
        .collection('steps')
        .doc('step-01')
        .set({
          isFreePreview: true,
          prompt: 'Predict the effect of tetrazole substitution',
        });
    });

    const unauthDb = testEnv.unauthenticatedContext().firestore();
    await assertSucceeds(
      unauthDb
        .collection('courses')
        .doc('medchem')
        .collection('lessons')
        .doc('mc-les-01')
        .collection('steps')
        .doc('step-01')
        .get()
    );
  });

  it('denies unauthenticated and free tier read of paid steps (Lesson 3+)', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore();
      await db
        .collection('courses')
        .doc('medchem')
        .collection('lessons')
        .doc('mc-les-03')
        .set({
          isFreePreview: false,
          title: 'Advanced SAR Exploration',
        });

      await db
        .collection('courses')
        .doc('medchem')
        .collection('lessons')
        .doc('mc-les-03')
        .collection('steps')
        .doc('step-paid')
        .set({
          isFreePreview: false,
          prompt: 'Proprietary clinical challenge question',
        });
    });

    const unauthDb = testEnv.unauthenticatedContext().firestore();
    const studentDb = testEnv.authenticatedContext('student-free').firestore();

    // Denied for unauthenticated
    await assertFails(
      unauthDb
        .collection('courses')
        .doc('medchem')
        .collection('lessons')
        .doc('mc-les-03')
        .collection('steps')
        .doc('step-paid')
        .get()
    );

    // Denied for authenticated student without entitlement
    await assertFails(
      studentDb
        .collection('courses')
        .doc('medchem')
        .collection('lessons')
        .doc('mc-les-03')
        .collection('steps')
        .doc('step-paid')
        .get()
    );
  });

  it('allows access to paid steps when student has active, unexpired entitlement', async () => {
    const studentUid = 'student-pro';

    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore();

      // Seed paid step
      await db
        .collection('courses')
        .doc('medchem')
        .collection('lessons')
        .doc('mc-les-04')
        .collection('steps')
        .doc('step-paid')
        .set({
          isFreePreview: false,
          prompt: 'Advanced lead optimization step',
        });

      // Seed active entitlement (expires 10 days in future)
      const futureTime = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);
      await db
        .collection('users')
        .doc(studentUid)
        .collection('entitlements')
        .doc('medchem')
        .set({
          courseId: 'medchem',
          status: 'active',
          expiresAt: futureTime,
        });
    });

    const studentDb = testEnv.authenticatedContext(studentUid).firestore();
    await assertSucceeds(
      studentDb
        .collection('courses')
        .doc('medchem')
        .collection('lessons')
        .doc('mc-les-04')
        .collection('steps')
        .doc('step-paid')
        .get()
    );
  });

  it('strictly forbids client writes to entitlements subcollection', async () => {
    const studentUid = 'student-hacker';
    const studentDb = testEnv.authenticatedContext(studentUid).firestore();

    // Student attempts to self-grant lifetime access
    await assertFails(
      studentDb
        .collection('users')
        .doc(studentUid)
        .collection('entitlements')
        .doc('dual_bundle')
        .set({
          status: 'active',
          plan: 'premium',
          expiresAt: new Date(Date.now() + 1000 * 24 * 60 * 60 * 1000),
        })
    );
  });

  it('prevents user from modifying sensitive profile fields (plan, trialUsed, roles)', async () => {
    const studentUid = 'student-tamper';

    // Seed valid user profile
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore();
      await db.collection('users').doc(studentUid).set({
        userId: studentUid,
        email: 'student@example.com',
        displayName: 'Student',
        plan: 'free',
        trialUsed: true,
        preferredLanguage: 'en',
      });
    });

    const studentDb = testEnv.authenticatedContext(studentUid).firestore();

    // Allowed: update display name or language
    await assertSucceeds(
      studentDb.collection('users').doc(studentUid).update({
        displayName: 'Dr. Student',
        preferredLanguage: 'tr',
      })
    );

    // Forbidden: modify plan directly
    await assertFails(
      studentDb.collection('users').doc(studentUid).update({
        plan: 'premium',
      })
    );

    // Forbidden: reset trialUsed flag from true to false
    await assertFails(
      studentDb.collection('users').doc(studentUid).update({
        trialUsed: false,
      })
    );

    // Forbidden: self-grant admin role
    await assertFails(
      studentDb.collection('users').doc(studentUid).update({
        roles: ['admin'],
      })
    );
  });

  it('denies access to paid steps when entitlement has expired in the past', async () => {
    const expiredStudentUid = 'student-expired';
    const courseId = 'pharmacology';
    const lessonId = 'ph-les-03';
    const stepId = 'step-paid-01';

    // Seed paid step and expired entitlement
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore();
      await db
        .collection('courses')
        .doc(courseId)
        .collection('lessons')
        .doc(lessonId)
        .collection('steps')
        .doc(stepId)
        .set({
          isFreePreview: false,
          prompt: 'Advanced Hill equation derivation',
        });

      await db
        .collection('users')
        .doc(expiredStudentUid)
        .collection('entitlements')
        .doc(courseId)
        .set({
          status: 'active',
          // Expired 2 days ago
          expiresAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        });
    });

    const studentDb = testEnv.authenticatedContext(expiredStudentUid).firestore();
    await assertFails(
      studentDb
        .collection('courses')
        .doc(courseId)
        .collection('lessons')
        .doc(lessonId)
        .collection('steps')
        .doc(stepId)
        .get()
    );
  });

  it('forbids client from self-creating a profile with sensitive fields (roles, plan, trialUsed)', async () => {
    const newUid = 'student-new-attacker';
    const studentDb = testEnv.authenticatedContext(newUid).firestore();

    // Attacker tries to create document with plan: 'premium'
    await assertFails(
      studentDb.collection('users').doc(newUid).set({
        userId: newUid,
        plan: 'premium',
        email: 'attacker@example.com',
      })
    );

    // Attacker tries to create document with roles: ['admin']
    await assertFails(
      studentDb.collection('users').doc(newUid).set({
        userId: newUid,
        roles: ['admin'],
        email: 'attacker@example.com',
      })
    );

    // Legitimate user creation without sensitive fields succeeds
    await assertSucceeds(
      studentDb.collection('users').doc(newUid).set({
        userId: newUid,
        email: 'legit@example.com',
        displayName: 'Legitimate Student',
        preferredLanguage: 'en',
      })
    );
  });

  it('allows access to paid steps when user has an active dual_bundle entitlement', async () => {
    const bundleStudentUid = 'student-bundle-holder';
    const courseId = 'medchem';
    const lessonId = 'mc-les-04';
    const stepId = 'step-01';

    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore();
      await db
        .collection('courses')
        .doc(courseId)
        .collection('lessons')
        .doc(lessonId)
        .collection('steps')
        .doc(stepId)
        .set({
          isFreePreview: false,
          prompt: 'Propranolol SAR analysis',
        });

      // Grant dual_bundle entitlement
      await db
        .collection('users')
        .doc(bundleStudentUid)
        .collection('entitlements')
        .doc('dual_bundle')
        .set({
          status: 'active',
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });
    });

    const studentDb = testEnv.authenticatedContext(bundleStudentUid).firestore();
    await assertSucceeds(
      studentDb
        .collection('courses')
        .doc(courseId)
        .collection('lessons')
        .doc(lessonId)
        .collection('steps')
        .doc(stepId)
        .get()
    );
  });
});

