import { onCall, HttpsError, onRequest } from 'firebase-functions/v2/https';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import crypto from 'crypto';

if (getApps().length === 0) {
  initializeApp();
}
const defaultDb = getFirestore();

import { appLogger } from './logger.js';
import { enforceCallableGuards } from './security.js';

/**
 * Normalizes email address to prevent trial abuse via dot-aliasing or plus-addressing:
 * - Lowercases and trims whitespace.
 * - Strips '.' characters in Gmail / Googlemail usernames.
 * - Strips '+' addressing sub-tags for all domains.
 */
export function normalizeEmail(email: string): string {
  const parts = email.toLowerCase().trim().split('@');
  if (parts.length !== 2) return email.toLowerCase().trim();
  const [localPart, domain] = parts;
  if (!localPart || !domain) return email.toLowerCase().trim();

  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    const cleanLocal = localPart.replace(/\./g, '').split('+')[0];
    return `${cleanLocal}@gmail.com`;
  }

  const cleanLocal = localPart.split('+')[0];
  return `${cleanLocal}@${domain}`;
}

/**
 * executeStartFreeTrial:
 * Pure handler function enforcing single-use 7-day trial atomic transaction.
 * Includes cheap trial abuse mitigations:
 * 1. Verified email requirement.
 * 2. Canonical normalized email deduplication via /trial_claims collection.
 * 3. Prevention of duplicate trials per user and overwriting active paid accounts.
 */
export async function executeStartFreeTrial(
  firestoreDb: any,
  userId: string,
  authUser?: { email?: string; emailVerified?: boolean }
) {
  const userRef = firestoreDb.collection('users').doc(userId);
  const entitlementRef = userRef.collection('entitlements').doc('dual_bundle');

  const now = new Date();
  const trialDurationMs = 7 * 24 * 60 * 60 * 1000;
  const trialEnds = new Date(now.getTime() + trialDurationMs);

  return firestoreDb.runTransaction(async (transaction: any) => {
    const userDoc = await transaction.get(userRef);
    if (!userDoc.exists) {
      throw new Error('failed-precondition: User profile does not exist.');
    }

    const userData = userDoc.data();

    // SEC-P1-03: Guard against overwriting active paid premium accounts
    if (userData?.plan === 'premium') {
      throw new Error('failed-precondition: Account already holds active Premium access.');
    }

    if (userData?.trialUsed === true) {
      throw new Error('failed-precondition: You have already activated your 7-day free trial on this account.');
    }

    // Abuse Mitigation 1: Email verification requirement (if email present)
    const userEmail = authUser?.email || userData?.email;
    const isEmailVerified = authUser?.emailVerified ?? userData?.emailVerified ?? true;

    if (isEmailVerified === false) {
      throw new Error('failed-precondition: Verified email address required to activate free trial.');
    }

    // Abuse Mitigation 2: Normalized email deduplication check via trial_claims
    let claimRef: any = null;
    let normalized = '';
    if (userEmail) {
      normalized = normalizeEmail(userEmail);
      claimRef = firestoreDb.collection('trial_claims').doc(normalized);
      const claimSnap = await transaction.get(claimRef);
      if (claimSnap.exists) {
        throw new Error('failed-precondition: A free trial has already been claimed for this email address.');
      }
    }

    // 1. Record canonical trial claim
    if (claimRef && userEmail) {
      transaction.set(claimRef, {
        claimedByUid: userId,
        claimedAt: now,
        originalEmail: userEmail,
        normalizedEmail: normalized,
      });
    }

    // 2. Update user profile to trial plan
    transaction.update(userRef, {
      plan: 'trial',
      trialUsed: true,
      trialStartedAt: now,
      trialEndsAt: trialEnds,
      lastActiveAt: now,
    });

    // 3. Authoritatively provision dual_bundle entitlement
    transaction.set(entitlementRef, {
      courseId: 'dual_bundle',
      entitlementId: `ent-trial-${userId}`,
      plan: 'trial',
      status: 'active',
      planId: 'trial_7day',
      entitlements: ['all_lessons', 'advanced_hints', 'ai_feedback', 'cross_device_sync'],
      billingCycle: 'trial',
      currency: 'USD',
      amountPaid: 0,
      paymentGateway: 'system',
      gatewaySubscriptionId: null,
      gatewayOrderId: null,
      startedAt: now,
      expiresAt: trialEnds,
      autoRenew: false,
      revokedAt: null,
    });

    return {
      success: true,
      trialStartedAt: now.toISOString(),
      trialEndsAt: trialEnds.toISOString(),
      plan: 'trial',
    };
  });
}

/**
 * startFreeTrial:
 * Server-enforces single-use 7-day free trial across both courses (MedChem & Pharmacology).
 * Atomic transaction verifies trialUsed == false, guards against overwriting active premium,
 * updates user profile, and creates dual_bundle entitlement.
 */
export const startFreeTrial = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'User must be authenticated to start a free trial.');
  }

  enforceCallableGuards(request, 'startFreeTrial', { maxRequests: 5 });

  const authUser = {
    email: request.auth.token.email,
    emailVerified: Boolean(request.auth.token.email_verified),
  };

  try {
    return await executeStartFreeTrial(defaultDb, request.auth.uid, authUser);
  } catch (err: any) {
    appLogger.reportError(err, { uid: request.auth.uid, endpoint: 'startFreeTrial' });
    const msg = err.message || '';
    if (
      msg.includes('already activated') ||
      msg.includes('already holds active Premium') ||
      msg.includes('already been claimed') ||
      msg.includes('Verified email address required')
    ) {
      throw new HttpsError('failed-precondition', msg);
    }
    if (msg.includes('not exist')) {
      throw new HttpsError('not-found', msg);
    }
    throw new HttpsError('internal', msg);
  }
});

import {
  executeCreateCheckoutSession,
  executeCreateCustomerPortalSession,
  executeCancelSubscription,
  executeChangeSubscriptionPlan,
} from './payments.js';
import { processDodoWebhook, Webhook } from './webhook.js';
import { executeDeleteUserAccount } from './compliance.js';

import { checkRateLimit, resetRateLimits } from './rateLimiter.js';

export {
  executeCreateCheckoutSession,
  executeCreateCustomerPortalSession,
  executeCancelSubscription,
  executeChangeSubscriptionPlan,
  processDodoWebhook,
  executeDeleteUserAccount,
  Webhook,
  checkRateLimit,
  resetRateLimits,
  enforceCallableGuards,
};

/**
 * createCheckoutSession:
 * Validates inputs with Zod and generates Dodo Payments checkout session using official SDK.
 */
export const createCheckoutSession = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'User must be authenticated.');
  }
  enforceCallableGuards(request, 'createCheckoutSession', { maxRequests: 10 });
  try {
    return await executeCreateCheckoutSession(defaultDb, request.auth.uid, request.data);
  } catch (err: any) {
    appLogger.reportError(err, { uid: request.auth.uid, endpoint: 'createCheckoutSession' });
    throw err;
  }
});

/**
 * createCustomerPortalSession:
 * Validates inputs and generates 24h Customer Portal session URL.
 */
export const createCustomerPortalSession = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'User must be authenticated.');
  }
  enforceCallableGuards(request, 'createCustomerPortalSession', { maxRequests: 10 });
  try {
    return await executeCreateCustomerPortalSession(defaultDb, request.auth.uid, request.data);
  } catch (err: any) {
    appLogger.reportError(err, { uid: request.auth.uid, endpoint: 'createCustomerPortalSession' });
    throw err;
  }
});

/**
 * cancelSubscription:
 * Immediately cancels or schedules period-end cancellation for recurring subscriptions.
 */
export const cancelSubscription = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'User must be authenticated.');
  }
  enforceCallableGuards(request, 'cancelSubscription', { maxRequests: 5 });
  try {
    return await executeCancelSubscription(defaultDb, request.auth.uid, request.data);
  } catch (err: any) {
    appLogger.reportError(err, { uid: request.auth.uid, endpoint: 'cancelSubscription' });
    throw err;
  }
});

/**
 * changeSubscriptionPlan:
 * Upgrades or downgrades subscription plan with specified proration mode.
 */
export const changeSubscriptionPlan = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'User must be authenticated.');
  }
  enforceCallableGuards(request, 'changeSubscriptionPlan', { maxRequests: 5 });
  try {
    return await executeChangeSubscriptionPlan(defaultDb, request.auth.uid, request.data);
  } catch (err: any) {
    appLogger.reportError(err, { uid: request.auth.uid, endpoint: 'changeSubscriptionPlan' });
    throw err;
  }
});

/**
 * deleteUserAccount:
 * GDPR & KVKK compliant account deletion callable.
 * Authoritatively cancels active Dodo Payments subscriptions and purges all user data.
 */
export const deleteUserAccount = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'User must be authenticated.');
  }
  enforceCallableGuards(request, 'deleteUserAccount', { maxRequests: 3 });
  try {
    return await executeDeleteUserAccount(defaultDb, request.auth.uid);
  } catch (err: any) {
    appLogger.reportError(err, { uid: request.auth.uid, endpoint: 'deleteUserAccount' });
    throw err;
  }
});

/**
 * handleDodoWebhook:
 * Validates Standard Webhooks signatures on the raw request body, guarantees event
 * idempotency in /webhook_events, ensures out-of-order delivery protection, and authoritatively
 * mutates user entitlements upon payment and subscription lifecycle transitions.
 */
export const handleDodoWebhook = onRequest(async (req, res) => {
  return await processDodoWebhook(defaultDb, req as any, res as any);
});

/**
 * executeCleanupExpiredTrials:
 * Pure batch logic automatically downgrading expired trials while preserving student progress.
 */
export async function executeCleanupExpiredTrials(firestoreDb: any, nowTime: Date = new Date()) {
  const expiredUsersSnapshot = await firestoreDb
    .collection('users')
    .where('plan', '==', 'trial')
    .where('trialEndsAt', '<=', nowTime)
    .limit(200)
    .get();

  const batch = firestoreDb.batch();
  let count = 0;

  for (const doc of expiredUsersSnapshot.docs) {
    count++;
    // 1. Downgrade user plan to free
    batch.update(doc.ref, {
      plan: 'free',
      lastActiveAt: nowTime,
    });

    // 2. SEC-P1-04: Gracefully mark dual_bundle entitlement expired using merge
    const dualRef = doc.ref.collection('entitlements').doc('dual_bundle');
    batch.set(
      dualRef,
      {
        status: 'expired',
        revokedAt: nowTime,
      },
      { merge: true }
    );
  }

  if (count > 0) {
    await batch.commit();
  }
  return count;
}

/**
 * cleanupExpiredTrials:
 * Scheduled daily cron that automatically downgrades expired trials (now > trialEndsAt)
 * to 'free' while permanently preserving 100% of user progress.
 */
export const cleanupExpiredTrials = onSchedule('every 24 hours', async () => {
  await executeCleanupExpiredTrials(defaultDb);
});
