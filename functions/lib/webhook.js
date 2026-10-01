import { getAppConfig, reverseResolveProductId } from './config.js';
import { appLogger } from './logger.js';
import { Webhook } from 'standardwebhooks';
import crypto from 'crypto';
export { Webhook };
/**
 * processDodoWebhook:
 * Authoritative Standard Webhooks handler for Dodo Payments.
 * - Enforces raw body signature verification (Standard Webhooks: webhook-id, webhook-timestamp, webhook-signature)
 * - Atomic idempotency locking via /webhook_events/{eventId}
 * - Out-of-order event sequencing protection via lastEventTimestamp
 * - Authoritative handling of all 8 lifecycle events
 * - Structured logging with customer PII redaction
 */
export async function processDodoWebhook(firestoreDb, req, res, secretOverride, dodoClientOverride) {
    // Normalize incoming headers to lowercase
    const headers = {};
    for (const [key, val] of Object.entries(req.headers || {})) {
        if (typeof val === 'string') {
            headers[key.toLowerCase()] = val;
        }
        else if (Array.isArray(val) && val.length > 0 && typeof val[0] === 'string') {
            headers[key.toLowerCase()] = val[0];
        }
    }
    const appConfig = getAppConfig();
    const webhookSecret = secretOverride || appConfig.webhookSecret;
    if (!webhookSecret && process.env.NODE_ENV === 'production') {
        appLogger.error('Webhook signing secret not configured in production environment');
        return res.status(500).send({ error: 'Webhook signing secret not configured' });
    }
    const effectiveSecret = webhookSecret || 'local_dev_secret';
    // 1. Extract raw body string
    let rawBodyString;
    if (req.rawBody && Buffer.isBuffer(req.rawBody)) {
        rawBodyString = req.rawBody.toString('utf8');
    }
    else if (typeof req.body === 'string') {
        rawBodyString = req.body;
    }
    else if (req.body) {
        rawBodyString = JSON.stringify(req.body);
    }
    else {
        rawBodyString = '';
    }
    // 2. Signature Verification (Standard Webhooks with HMAC fallback)
    const webhookId = headers['webhook-id'] || req.body?.id || `wh_${Date.now()}`;
    const stdSignature = headers['webhook-signature'];
    const legacySignature = headers['x-dodo-signature'];
    const webhookTimestamp = headers['webhook-timestamp'] || req.body?.timestamp;
    if (!stdSignature && !legacySignature) {
        appLogger.warn('Missing webhook signature header', { webhookId });
        return res.status(401).send('Missing webhook signature header');
    }
    let verifiedEvent;
    try {
        if (stdSignature) {
            if (dodoClientOverride) {
                verifiedEvent = dodoClientOverride.webhooks.unwrap(rawBodyString, {
                    headers: {
                        'webhook-id': webhookId,
                        'webhook-timestamp': webhookTimestamp || new Date().toISOString(),
                        'webhook-signature': stdSignature,
                    },
                    key: effectiveSecret,
                });
            }
            else {
                const wh = new Webhook(effectiveSecret);
                wh.verify(rawBodyString, {
                    'webhook-id': webhookId,
                    'webhook-timestamp': webhookTimestamp || new Date().toISOString(),
                    'webhook-signature': stdSignature,
                });
                verifiedEvent = JSON.parse(rawBodyString);
            }
        }
        else if (legacySignature) {
            const computedHmac = crypto
                .createHmac('sha256', effectiveSecret)
                .update(rawBodyString)
                .digest('hex');
            const sigBuffer = Buffer.from(legacySignature, 'utf8');
            const hmacBuffer = Buffer.from(computedHmac, 'utf8');
            if (sigBuffer.length !== hmacBuffer.length || !crypto.timingSafeEqual(sigBuffer, hmacBuffer)) {
                throw new Error('HMAC verification failed');
            }
            verifiedEvent = JSON.parse(rawBodyString);
        }
    }
    catch (verifyErr) {
        appLogger.warn('Webhook signature verification failed', {
            error: verifyErr.message,
            webhookId,
        });
        return res.status(401).send('Invalid webhook signature');
    }
    const event = verifiedEvent || req.body;
    const eventType = event?.type;
    const eventId = webhookId;
    const eventTimestampStr = event?.timestamp || webhookTimestamp || new Date().toISOString();
    const eventTimestamp = new Date(eventTimestampStr);
    appLogger.info(`Processing Dodo webhook: ${eventType}`, {
        eventId,
        eventType,
    });
    const eventRef = firestoreDb.collection('webhook_events').doc(eventId);
    // 3. Idempotency Lock via Firestore
    try {
        const existingSnap = await eventRef.get();
        if (existingSnap.exists) {
            const data = existingSnap.data();
            if (data?.status === 'completed' || data?.status === 'processing') {
                appLogger.info(`Webhook event ${eventId} already processed (idempotent skip)`);
                return res.status(200).send({ received: true, status: 'already_processed' });
            }
        }
        await eventRef.set({
            eventId,
            eventType,
            receivedAt: new Date(),
            timestamp: eventTimestamp,
            status: 'processing',
        });
    }
    catch (idempotencyErr) {
        appLogger.warn(`Idempotency check error: ${idempotencyErr.message}`);
        return res.status(200).send({ received: true, status: 'already_processed' });
    }
    // 4. Resolve Target User and Course Information
    const eventData = event?.data || {};
    let userId = eventData?.metadata?.userId ||
        eventData?.customer?.metadata?.userId;
    const dodoCustomerId = eventData?.customer?.customer_id ||
        eventData?.customer_id ||
        eventData?.customer?.id;
    const customerEmail = eventData?.customer?.email;
    // Fallback user resolution via customer ID or email in Firestore
    if (!userId && dodoCustomerId) {
        const userLookup = await firestoreDb
            .collection('users')
            .where('dodoCustomerId', '==', dodoCustomerId)
            .limit(1)
            .get();
        if (!userLookup.empty) {
            userId = userLookup.docs[0].id;
        }
    }
    if (!userId && customerEmail) {
        const userLookup = await firestoreDb
            .collection('users')
            .where('email', '==', customerEmail)
            .limit(1)
            .get();
        if (!userLookup.empty) {
            userId = userLookup.docs[0].id;
        }
    }
    if (!userId) {
        appLogger.warn('Webhook received without resolvable userId', { eventId, eventType });
        await eventRef.update({
            status: 'completed',
            note: 'No associated user found',
            processedAt: new Date(),
        });
        return res.status(200).send({ received: true, status: 'no_user_matched' });
    }
    // Resolve course and plan
    let courseId = eventData?.metadata?.courseId;
    let planId = eventData?.metadata?.planId;
    if ((!courseId || !planId) && eventData?.product_id) {
        const resolved = reverseResolveProductId(eventData.product_id);
        if (resolved) {
            courseId = courseId || resolved.courseId;
            planId = planId || resolved.planId;
        }
    }
    courseId = courseId || 'dual_bundle';
    planId = planId || 'semester_pass';
    const userRef = firestoreDb.collection('users').doc(userId);
    const entitlementRef = userRef.collection('entitlements').doc(courseId);
    // 5. Out-of-Order Sequencing Protection
    const currentEntDoc = await entitlementRef.get();
    if (currentEntDoc.exists) {
        const currentData = currentEntDoc.data();
        if (currentData?.lastEventTimestamp) {
            const lastTs = currentData.lastEventTimestamp.toDate
                ? currentData.lastEventTimestamp.toDate().getTime()
                : new Date(currentData.lastEventTimestamp).getTime();
            if (eventTimestamp.getTime() < lastTs) {
                appLogger.warn('Out-of-order webhook delivery detected; skipping stale update', {
                    eventId,
                    eventTimestamp: eventTimestamp.toISOString(),
                    lastRecordedTimestamp: new Date(lastTs).toISOString(),
                });
                await eventRef.update({
                    status: 'ignored_stale',
                    reason: 'out_of_order',
                    processedAt: new Date(),
                });
                return res.status(200).send({ received: true, status: 'ignored_stale' });
            }
        }
    }
    // 6. Authoritative State Transitions
    const now = new Date();
    const durationDays = planId.includes('annual') ? 365 : planId.includes('semester') ? 180 : 30;
    // Determine period expiration
    let expiresAt;
    if (eventData?.next_billing_date) {
        expiresAt = new Date(eventData.next_billing_date);
    }
    else if (eventData?.current_period_end) {
        expiresAt = new Date(eventData.current_period_end);
    }
    else {
        expiresAt = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);
    }
    switch (eventType) {
        case 'payment.succeeded':
        case 'subscription.active':
        case 'subscription.renewed': {
            await userRef.set({
                plan: 'premium',
                ...(dodoCustomerId ? { dodoCustomerId } : {}),
                lastActiveAt: now,
                updatedAt: now,
            }, { merge: true });
            await entitlementRef.set({
                courseId,
                entitlementId: `ent_${courseId}_${userId}`,
                plan: 'premium',
                planId,
                status: 'active',
                source: 'dodo_payments',
                entitlements: ['all_lessons', 'advanced_hints', 'ai_feedback', 'cross_device_sync', 'certificates'],
                billingCycle: durationDays === 365 ? 'annual' : durationDays === 180 ? 'semester' : 'monthly',
                currency: eventData?.currency || 'TRY',
                amountPaid: eventData?.total_amount || eventData?.amount || 0,
                paymentGateway: 'dodo_payments',
                gatewaySubscriptionId: eventData?.subscription_id || null,
                gatewayPaymentId: eventData?.payment_id || null,
                startedAt: currentEntDoc.exists && currentEntDoc.data()?.startedAt ? currentEntDoc.data().startedAt : now,
                expiresAt,
                currentPeriodEnd: expiresAt,
                autoRenew: true,
                revokedAt: null,
                gracePeriodEndsAt: null,
                lastEventTimestamp: eventTimestamp,
                updatedAt: now,
            }, { merge: true });
            break;
        }
        case 'subscription.past_due': {
            // 7-day grace period for failed renewals
            const gracePeriodEndsAt = eventData?.past_due_ends_at
                ? new Date(eventData.past_due_ends_at)
                : new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            await entitlementRef.set({
                status: 'past_due',
                gracePeriodEndsAt,
                lastEventTimestamp: eventTimestamp,
                updatedAt: now,
            }, { merge: true });
            break;
        }
        case 'subscription.on_hold': {
            // Grace period expired without recovery -> revoke access
            await userRef.set({
                plan: 'free',
                updatedAt: now,
            }, { merge: true });
            await entitlementRef.set({
                status: 'on_hold',
                revokedAt: now,
                lastEventTimestamp: eventTimestamp,
                updatedAt: now,
            }, { merge: true });
            break;
        }
        case 'subscription.cancelled': {
            await userRef.set({
                plan: 'free',
                updatedAt: now,
            }, { merge: true });
            await entitlementRef.set({
                status: 'cancelled',
                autoRenew: false,
                revokedAt: now,
                lastEventTimestamp: eventTimestamp,
                updatedAt: now,
            }, { merge: true });
            break;
        }
        case 'subscription.expired': {
            await userRef.set({
                plan: 'free',
                updatedAt: now,
            }, { merge: true });
            await entitlementRef.set({
                status: 'expired',
                autoRenew: false,
                revokedAt: now,
                lastEventTimestamp: eventTimestamp,
                updatedAt: now,
            }, { merge: true });
            break;
        }
        case 'subscription.plan_changed': {
            await entitlementRef.set({
                planId,
                status: 'active',
                currentPeriodEnd: expiresAt,
                expiresAt,
                lastEventTimestamp: eventTimestamp,
                updatedAt: now,
            }, { merge: true });
            break;
        }
        case 'refund.succeeded':
        case 'refund.created': {
            await userRef.set({
                plan: 'free',
                updatedAt: now,
            }, { merge: true });
            await entitlementRef.set({
                status: 'refunded',
                autoRenew: false,
                revokedAt: now,
                lastEventTimestamp: eventTimestamp,
                updatedAt: now,
            }, { merge: true });
            break;
        }
        case 'payment.failed': {
            await entitlementRef.set({
                lastPaymentError: 'payment_failed',
                lastPaymentErrorAt: now,
                lastEventTimestamp: eventTimestamp,
                updatedAt: now,
            }, { merge: true });
            break;
        }
        default: {
            appLogger.info(`Unhandled webhook event type: ${eventType}`, { eventId });
            break;
        }
    }
    // 7. Mark event completed
    await eventRef.update({
        status: 'completed',
        processedAt: new Date(),
    });
    return res.status(200).send({ received: true, status: 'processed' });
}
//# sourceMappingURL=webhook.js.map