import { onCall, HttpsError, onRequest } from 'firebase-functions/v2/https';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
if (getApps().length === 0) {
    initializeApp();
}
const defaultDb = getFirestore();
/**
 * executeStartFreeTrial:
 * Pure handler function enforcing single-use 7-day trial atomic transaction.
 * Exported for direct unit/integration testing against live Firestore emulators.
 */
export async function executeStartFreeTrial(firestoreDb, userId) {
    const userRef = firestoreDb.collection('users').doc(userId);
    const entitlementRef = userRef.collection('entitlements').doc('dual_bundle');
    const now = new Date();
    const trialDurationMs = 7 * 24 * 60 * 60 * 1000;
    const trialEnds = new Date(now.getTime() + trialDurationMs);
    return firestoreDb.runTransaction(async (transaction) => {
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
        // 1. Update user profile to trial plan
        transaction.update(userRef, {
            plan: 'trial',
            trialUsed: true,
            trialStartedAt: now,
            trialEndsAt: trialEnds,
            lastActiveAt: now,
        });
        // 2. Authoritatively provision dual_bundle entitlement
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
    try {
        return await executeStartFreeTrial(defaultDb, request.auth.uid);
    }
    catch (err) {
        const msg = err.message || '';
        if (msg.includes('already activated') || msg.includes('already holds active Premium')) {
            throw new HttpsError('failed-precondition', msg);
        }
        if (msg.includes('not exist')) {
            throw new HttpsError('not-found', msg);
        }
        throw new HttpsError('internal', msg);
    }
});
import { executeCreateCheckoutSession, executeCreateCustomerPortalSession, executeCancelSubscription, executeChangeSubscriptionPlan, } from './payments.js';
import { processDodoWebhook, Webhook } from './webhook.js';
import { executeDeleteUserAccount } from './compliance.js';
export { executeCreateCheckoutSession, executeCreateCustomerPortalSession, executeCancelSubscription, executeChangeSubscriptionPlan, processDodoWebhook, executeDeleteUserAccount, Webhook, };
/**
 * createCheckoutSession:
 * Validates inputs with Zod and generates Dodo Payments checkout session using official SDK.
 */
export const createCheckoutSession = onCall(async (request) => {
    if (!request.auth) {
        throw new HttpsError('unauthenticated', 'User must be authenticated.');
    }
    return await executeCreateCheckoutSession(defaultDb, request.auth.uid, request.data);
});
/**
 * createCustomerPortalSession:
 * Validates inputs and generates 24h Customer Portal session URL.
 */
export const createCustomerPortalSession = onCall(async (request) => {
    if (!request.auth) {
        throw new HttpsError('unauthenticated', 'User must be authenticated.');
    }
    return await executeCreateCustomerPortalSession(defaultDb, request.auth.uid, request.data);
});
/**
 * cancelSubscription:
 * Immediately cancels or schedules period-end cancellation for recurring subscriptions.
 */
export const cancelSubscription = onCall(async (request) => {
    if (!request.auth) {
        throw new HttpsError('unauthenticated', 'User must be authenticated.');
    }
    return await executeCancelSubscription(defaultDb, request.auth.uid, request.data);
});
/**
 * changeSubscriptionPlan:
 * Upgrades or downgrades subscription plan with specified proration mode.
 */
export const changeSubscriptionPlan = onCall(async (request) => {
    if (!request.auth) {
        throw new HttpsError('unauthenticated', 'User must be authenticated.');
    }
    return await executeChangeSubscriptionPlan(defaultDb, request.auth.uid, request.data);
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
    return await executeDeleteUserAccount(defaultDb, request.auth.uid);
});
/**
 * handleDodoWebhook:
 * Validates Standard Webhooks signatures on the raw request body, guarantees event
 * idempotency in /webhook_events, ensures out-of-order delivery protection, and authoritatively
 * mutates user entitlements upon payment and subscription lifecycle transitions.
 */
export const handleDodoWebhook = onRequest(async (req, res) => {
    return await processDodoWebhook(defaultDb, req, res);
});
/**
 * executeCleanupExpiredTrials:
 * Pure batch logic automatically downgrading expired trials while preserving student progress.
 */
export async function executeCleanupExpiredTrials(firestoreDb, nowTime = new Date()) {
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
        batch.set(dualRef, {
            status: 'expired',
            revokedAt: nowTime,
        }, { merge: true });
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
//# sourceMappingURL=index.js.map