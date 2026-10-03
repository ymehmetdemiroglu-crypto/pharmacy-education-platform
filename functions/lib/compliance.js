import { HttpsError } from 'firebase-functions/v2/https';
import { getDodoClient } from './config.js';
import { appLogger } from './logger.js';
import { getAuth } from 'firebase-admin/auth';
/**
 * executeDeleteUserAccount:
 * Authoritatively deletes a user account for GDPR / KVKK compliance.
 * 1. Checks and cancels any active Dodo Payments subscriptions associated with the user.
 * 2. Purges user subcollections (progress, entitlements).
 * 3. Purges user profile document.
 * 4. Purges Firebase Auth account record.
 */
export async function executeDeleteUserAccount(firestoreDb, authUid, dodoClientOverride) {
    appLogger.info('Initiating GDPR/KVKK account deletion', { authUid });
    const userRef = firestoreDb.collection('users').doc(authUid);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
        throw new HttpsError('not-found', 'User profile not found.');
    }
    const dodoClient = dodoClientOverride || getDodoClient();
    // 1. Cancel active Dodo subscriptions
    const entitlementsSnap = await userRef.collection('entitlements').get();
    for (const entDoc of entitlementsSnap.docs) {
        const data = entDoc.data();
        const subId = data?.gatewaySubscriptionId;
        if (subId && (data?.status === 'active' || data?.status === 'past_due')) {
            try {
                appLogger.info('Cancelling active subscription for account deletion', { subId, authUid });
                await dodoClient.subscriptions.update(subId, {
                    status: 'cancelled',
                    cancel_reason: 'cancelled_by_customer',
                    cancellation_comment: 'Account deleted by customer via GDPR/KVKK request',
                });
            }
            catch (cancelErr) {
                appLogger.warn('Failed to cancel subscription during account deletion', {
                    subId,
                    error: cancelErr.message,
                });
            }
        }
    }
    // 2. Delete entitlements subcollection
    for (const doc of entitlementsSnap.docs) {
        await doc.ref.delete();
    }
    // 3. Delete progress subcollection
    const progressSnap = await userRef.collection('progress').get();
    for (const doc of progressSnap.docs) {
        await doc.ref.delete();
    }
    // 4. Delete spaced repetition & review cards subcollections
    const spacedRepSnap = await userRef.collection('spaced_repetition').get();
    for (const doc of spacedRepSnap.docs) {
        await doc.ref.delete();
    }
    const reviewCardsSnap = await userRef.collection('review_cards').get();
    for (const doc of reviewCardsSnap.docs) {
        await doc.ref.delete();
    }
    // 5. Delete user document
    await userRef.delete();
    // 5. Delete Firebase Auth record if available
    try {
        if (process.env.FIREBASE_AUTH_EMULATOR_HOST || process.env.NODE_ENV === 'production') {
            const auth = getAuth();
            await Promise.race([
                auth.deleteUser(authUid),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Auth timeout')), 500)),
            ]);
        }
    }
    catch (authErr) {
        appLogger.warn('Firebase Auth user deletion notice', { error: authErr.message });
    }
    appLogger.info('GDPR/KVKK account deletion completed successfully', { authUid });
    return { success: true, message: 'Account and associated personal data successfully deleted.' };
}
//# sourceMappingURL=compliance.js.map