import { z } from 'zod';
import { HttpsError } from 'firebase-functions/v2/https';
import { getAppConfig, getDodoClient, resolveProductId } from './config.js';
// -------------------------------------------------------------
// ZOD SCHEMAS
// -------------------------------------------------------------
export const CreateCheckoutSessionInputSchema = z.object({
    courseId: z.enum(['medchem', 'pharmacology', 'dual_bundle']),
    planId: z.enum(['monthly', 'semester_pass', 'annual']),
    currency: z.enum(['TRY', 'USD', 'SAR']).default('TRY'),
    returnUrl: z.string().url().optional(),
});
export const CreateCustomerPortalSessionInputSchema = z.object({
    returnUrl: z.string().url().optional(),
    sendEmail: z.boolean().optional().default(false),
});
export const CancelSubscriptionInputSchema = z.object({
    courseId: z.enum(['medchem', 'pharmacology', 'dual_bundle']),
    cancelImmediately: z.boolean().default(false),
    reason: z.string().max(500).optional(),
});
export const ChangeSubscriptionPlanInputSchema = z.object({
    courseId: z.enum(['medchem', 'pharmacology', 'dual_bundle']),
    newPlanId: z.enum(['monthly', 'semester_pass', 'annual']),
    prorationMode: z.enum([
        'difference_immediately',
        'prorated_immediately',
        'full_immediately',
        'do_not_bill',
    ]).default('difference_immediately'),
});
// -------------------------------------------------------------
// PURE HANDLERS (Exported for direct unit / emulator testing)
// -------------------------------------------------------------
/**
 * executeCreateCheckoutSession:
 * Validates inputs with Zod, queries user profile, maps to Dodo Product ID,
 * and calls official DodoPayments SDK client.checkoutSessions.create().
 */
export async function executeCreateCheckoutSession(firestoreDb, authUid, rawInput, dodoClientOverride) {
    const parseResult = CreateCheckoutSessionInputSchema.safeParse(rawInput);
    if (!parseResult.success) {
        const errorMsg = parseResult.error.issues.map((e) => e.message).join('; ');
        throw new HttpsError('invalid-argument', `Invalid checkout session parameters: ${errorMsg}`);
    }
    const { courseId, planId, currency, returnUrl } = parseResult.data;
    const userRef = firestoreDb.collection('users').doc(authUid);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
        throw new HttpsError('not-found', 'User profile not found. Please log in first.');
    }
    const userData = userDoc.data();
    const userEmail = userData?.email || `${authUid}@student.pharmacy.internal`;
    const userName = userData?.displayName || 'Pharmacy Student';
    const appConfig = getAppConfig();
    const dodoClient = dodoClientOverride || getDodoClient();
    const productId = resolveProductId(courseId, planId, appConfig.dodoEnv);
    const fallbackReturnUrl = `${appConfig.appBaseUrl}/courses/${courseId}?payment=success`;
    const finalReturnUrl = returnUrl || fallbackReturnUrl;
    try {
        const session = await dodoClient.checkoutSessions.create({
            product_cart: [{ product_id: productId, quantity: 1 }],
            customer: {
                email: userEmail,
                name: userName,
            },
            return_url: finalReturnUrl,
            billing_currency: currency,
            metadata: {
                userId: authUid,
                courseId,
                planId,
                dodoEnv: appConfig.dodoEnv,
            },
        });
        return {
            sessionId: session.session_id,
            checkoutUrl: session.checkout_url,
        };
    }
    catch (err) {
        const message = err?.message || 'Error communicating with Dodo Payments API';
        throw new HttpsError('internal', `Checkout session creation failed: ${message}`);
    }
}
/**
 * executeCreateCustomerPortalSession:
 * Retrieves user's dodoCustomerId and requests 24h portal magic link via SDK.
 */
export async function executeCreateCustomerPortalSession(firestoreDb, authUid, rawInput, dodoClientOverride) {
    const parseResult = CreateCustomerPortalSessionInputSchema.safeParse(rawInput);
    if (!parseResult.success) {
        const errorMsg = parseResult.error.issues.map((e) => e.message).join('; ');
        throw new HttpsError('invalid-argument', `Invalid portal session parameters: ${errorMsg}`);
    }
    const { returnUrl, sendEmail } = parseResult.data;
    const userDoc = await firestoreDb.collection('users').doc(authUid).get();
    if (!userDoc.exists) {
        throw new HttpsError('not-found', 'User profile not found.');
    }
    const userData = userDoc.data();
    const customerId = userData?.dodoCustomerId;
    if (!customerId) {
        throw new HttpsError('failed-precondition', 'No active Dodo Payments customer account linked to this user. Please complete a purchase first.');
    }
    const appConfig = getAppConfig();
    const dodoClient = dodoClientOverride || getDodoClient();
    try {
        const portalSession = await dodoClient.customers.customerPortal.create(customerId, {
            return_url: returnUrl || `${appConfig.appBaseUrl}/profile`,
            send_email: sendEmail,
        });
        return {
            portalUrl: portalSession.portal_url || portalSession.url,
            expiresAt: portalSession.expires_at,
        };
    }
    catch (err) {
        throw new HttpsError('internal', `Customer portal session creation failed: ${err.message || err}`);
    }
}
/**
 * executeCancelSubscription:
 * Authoritatively cancels recurring subscription via SDK.
 * - cancelImmediately = true: passes status: 'cancelled' (cancels NOW).
 * - cancelImmediately = false: passes cancel_at_next_billing_date: true (cancels at cycle end).
 */
export async function executeCancelSubscription(firestoreDb, authUid, rawInput, dodoClientOverride) {
    const parseResult = CancelSubscriptionInputSchema.safeParse(rawInput);
    if (!parseResult.success) {
        const errorMsg = parseResult.error.issues.map((e) => e.message).join('; ');
        throw new HttpsError('invalid-argument', `Invalid cancellation parameters: ${errorMsg}`);
    }
    const { courseId, cancelImmediately, reason } = parseResult.data;
    const entitlementRef = firestoreDb
        .collection('users')
        .doc(authUid)
        .collection('entitlements')
        .doc(courseId);
    const entitlementDoc = await entitlementRef.get();
    if (!entitlementDoc.exists) {
        throw new HttpsError('not-found', `No entitlement found for course '${courseId}'`);
    }
    const entData = entitlementDoc.data();
    const subscriptionId = entData?.gatewaySubscriptionId;
    if (!subscriptionId) {
        throw new HttpsError('failed-precondition', 'No recurring subscription ID linked to this entitlement.');
    }
    const dodoClient = dodoClientOverride || getDodoClient();
    try {
        if (cancelImmediately) {
            // Immediate cancellation
            await dodoClient.subscriptions.update(subscriptionId, {
                status: 'cancelled',
                cancel_reason: 'cancelled_by_customer',
                cancellation_comment: reason || 'Cancelled by user via dashboard',
            });
            // Update Firestore entitlement immediately
            await entitlementRef.set({
                status: 'canceled',
                autoRenew: false,
                revokedAt: new Date(),
            }, { merge: true });
        }
        else {
            // Schedule cancellation at next billing date (graceful period end)
            await dodoClient.subscriptions.update(subscriptionId, {
                cancel_at_next_billing_date: true,
                cancel_reason: 'cancelled_by_customer',
                cancellation_comment: reason || 'Cancelled by user for end of period',
            });
            await entitlementRef.set({
                autoRenew: false,
                cancelAtPeriodEnd: true,
            }, { merge: true });
        }
        return {
            success: true,
            subscriptionId,
            cancelImmediately,
            message: cancelImmediately
                ? 'Subscription was cancelled immediately.'
                : 'Subscription is scheduled to cancel at the end of the billing period.',
        };
    }
    catch (err) {
        throw new HttpsError('internal', `Subscription cancellation failed: ${err.message || err}`);
    }
}
/**
 * executeChangeSubscriptionPlan:
 * Modifies subscription plan and handles proration mode via SDK changePlan().
 */
export async function executeChangeSubscriptionPlan(firestoreDb, authUid, rawInput, dodoClientOverride) {
    const parseResult = ChangeSubscriptionPlanInputSchema.safeParse(rawInput);
    if (!parseResult.success) {
        const errorMsg = parseResult.error.issues.map((e) => e.message).join('; ');
        throw new HttpsError('invalid-argument', `Invalid plan change parameters: ${errorMsg}`);
    }
    const { courseId, newPlanId, prorationMode } = parseResult.data;
    const entitlementRef = firestoreDb
        .collection('users')
        .doc(authUid)
        .collection('entitlements')
        .doc(courseId);
    const entitlementDoc = await entitlementRef.get();
    if (!entitlementDoc.exists) {
        throw new HttpsError('not-found', `No entitlement found for course '${courseId}'`);
    }
    const entData = entitlementDoc.data();
    const subscriptionId = entData?.gatewaySubscriptionId;
    if (!subscriptionId) {
        throw new HttpsError('failed-precondition', 'No recurring subscription ID linked to this entitlement.');
    }
    const appConfig = getAppConfig();
    const dodoClient = dodoClientOverride || getDodoClient();
    const newProductId = resolveProductId(courseId, newPlanId, appConfig.dodoEnv);
    try {
        const changeRes = await dodoClient.subscriptions.changePlan(subscriptionId, {
            product_id: newProductId,
            proration_billing_mode: prorationMode,
            quantity: 1,
            effective_at: 'immediately',
        });
        // Optimistically update plan in entitlement
        await entitlementRef.set({
            planId: newPlanId,
            updatedAt: new Date(),
        }, { merge: true });
        return {
            success: true,
            subscriptionId,
            newPlanId,
            status: changeRes.status || 'plan_change_requested',
        };
    }
    catch (err) {
        throw new HttpsError('internal', `Plan change failed: ${err.message || err}`);
    }
}
//# sourceMappingURL=payments.js.map