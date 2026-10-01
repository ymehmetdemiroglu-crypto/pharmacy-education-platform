import { onCall, HttpsError, onRequest } from 'firebase-functions/v2/https';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import crypto from 'crypto';
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
export { executeCreateCheckoutSession, executeCreateCustomerPortalSession, executeCancelSubscription, executeChangeSubscriptionPlan, };
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
 * processDodoWebhook:
 * Pure handler function validating HMAC signatures and applying idempotent entitlement updates.
 * Exported for testing directly against live Firestore emulators.
 */
export async function processDodoWebhook(firestoreDb, req, res, secretOverride) {
    const signature = req.headers['x-dodo-signature'];
    const webhookSecret = secretOverride || process.env.DODO_WEBHOOK_SECRET;
    // SEC-P0-03: Webhook secret must be explicitly configured; fail closed in production
    if (!webhookSecret && process.env.NODE_ENV === 'production') {
        res.status(500).send('Webhook signing secret not configured');
        return;
    }
    const effectiveSecret = webhookSecret || 'emulator_secret_for_local_dev_only';
    // SEC-P0-01: Signature is strictly mandatory
    if (!signature) {
        res.status(401).send('Missing x-dodo-signature header');
        return;
    }
    // SEC-P1-01 & SEC-P0-02: Use raw buffer and timing-safe equality comparison
    const rawBody = req.rawBody || Buffer.from(JSON.stringify(req.body));
    const computedHmac = crypto
        .createHmac('sha256', effectiveSecret)
        .update(rawBody)
        .digest('hex');
    const sigBuffer = Buffer.from(signature, 'utf8');
    const hmacBuffer = Buffer.from(computedHmac, 'utf8');
    if (sigBuffer.length !== hmacBuffer.length || !crypto.timingSafeEqual(sigBuffer, hmacBuffer)) {
        res.status(401).send('Invalid webhook signature');
        return;
    }
    const event = req.body;
    const eventId = event?.id || `evt_${Date.now()}`;
    const eventRef = firestoreDb.collection('webhook_events').doc(eventId);
    // SEC-P1-02: Atomic idempotency lock via create() or transaction
    try {
        if (typeof eventRef.create === 'function') {
            await eventRef.create({
                eventId,
                gateway: 'dodo_payments',
                eventType: event?.type || 'unknown',
                receivedAt: new Date(),
                status: 'processing',
                rawPayload: event,
            });
        }
        else {
            await firestoreDb.runTransaction(async (transaction) => {
                const existing = await transaction.get(eventRef);
                if (existing.exists) {
                    throw new Error('ALREADY_EXISTS');
                }
                transaction.set(eventRef, {
                    eventId,
                    gateway: 'dodo_payments',
                    eventType: event?.type || 'unknown',
                    receivedAt: new Date(),
                    status: 'processing',
                    rawPayload: event,
                });
            });
        }
    }
    catch (err) {
        // If document already exists (code 6 / ALREADY_EXISTS), idempotency succeeded
        res.status(200).send({ received: true, status: 'already_processed' });
        return;
    }
    // SEC-P0-04: Route state updates authoritatively by event type
    const eventType = event?.type;
    const customerId = event?.data?.customer?.metadata?.userId || event?.data?.metadata?.userId;
    const courseId = event?.data?.metadata?.courseId || 'dual_bundle';
    const planId = event?.data?.metadata?.planId || 'semester_pass';
    if (customerId) {
        const userRef = firestoreDb.collection('users').doc(customerId);
        const entitlementRef = userRef.collection('entitlements').doc(courseId);
        const now = new Date();
        if (eventType === 'payment.succeeded' || eventType === 'subscription.active') {
            const durationDays = planId.includes('annual') ? 365 : planId.includes('semester') ? 180 : 30;
            const expiresAt = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);
            await userRef.update({
                plan: 'premium',
                lastActiveAt: now,
            });
            await entitlementRef.set({
                courseId,
                entitlementId: `ent-${eventId}`,
                plan: 'premium',
                status: 'active',
                planId,
                entitlements: ['all_lessons', 'advanced_hints', 'ai_feedback', 'cross_device_sync', 'certificates'],
                billingCycle: durationDays === 365 ? 'annual' : durationDays === 180 ? 'semester' : 'monthly',
                currency: event?.data?.currency || 'USD',
                amountPaid: event?.data?.amount || 49,
                paymentGateway: 'dodo_payments',
                gatewaySubscriptionId: event?.data?.subscription_id || null,
                gatewayOrderId: event?.data?.order_id || null,
                startedAt: now,
                expiresAt,
                autoRenew: true,
                revokedAt: null,
            });
        }
        else if (eventType === 'refund.created' ||
            eventType === 'payment.failed' ||
            eventType === 'subscription.cancelled') {
            await userRef.update({
                plan: 'free',
                lastActiveAt: now,
            });
            await entitlementRef.set({
                status: eventType === 'refund.created' ? 'refunded' : 'expired',
                revokedAt: now,
                autoRenew: false,
            }, { merge: true });
        }
        await eventRef.update({
            status: 'success',
            processedAt: new Date(),
        });
    }
    res.status(200).send({ received: true, status: 'processed' });
}
/**
 * handleDodoWebhook:
 * Validates HMAC signature with constant-time comparison, guarantees event idempotency in /webhook_events,
 * and updates user entitlements upon successful payment, subscription renewal, or refund.
 */
export const handleDodoWebhook = onRequest(async (req, res) => {
    return processDodoWebhook(defaultDb, req, res);
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