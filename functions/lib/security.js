import { HttpsError } from 'firebase-functions/v2/https';
import { checkFirestoreRateLimit, checkRateLimit } from './rateLimiter.js';
import { appLogger } from './logger.js';
/**
 * Enforces App Check verification and Firestore-backed rate limiting on callable endpoints.
 * App Check defaults to ENFORCED outside emulators.
 */
export async function enforceCallableGuards(request, endpointName, firestoreDbOrOptions, maybeOptions) {
    let firestoreDb = undefined;
    let options = {};
    if (firestoreDbOrOptions && typeof firestoreDbOrOptions.collection === 'function') {
        firestoreDb = firestoreDbOrOptions;
        options = maybeOptions || {};
    }
    else if (firestoreDbOrOptions && typeof firestoreDbOrOptions === 'object') {
        options = firestoreDbOrOptions;
    }
    const maxRequests = options.maxRequests ?? 10;
    const windowMs = options.windowMs ?? 60000;
    // 1. App Check enforcement
    // Defaults to enforced outside emulators unless explicitly disabled
    const isEmulator = process.env.FUNCTIONS_EMULATOR === 'true' ||
        process.env.NODE_ENV === 'test' ||
        Boolean(process.env.FIRESTORE_EMULATOR_HOST);
    const shouldEnforceAppCheck = options.requireAppCheck !== undefined
        ? options.requireAppCheck
        : process.env.ENFORCE_APP_CHECK === 'true' || (!isEmulator && process.env.ENFORCE_APP_CHECK !== 'false');
    if (shouldEnforceAppCheck && !request.app) {
        appLogger.warn(`App Check verification failed on ${endpointName}`, {
            endpoint: endpointName,
            uid: request.auth?.uid,
        });
        throw new HttpsError('unauthenticated', 'The function must be called from an App Check verified app.');
    }
    // 2. Rate limiting by auth UID or IP
    const callerKey = request.auth?.uid || request.rawRequest?.ip || 'anonymous';
    let rateLimit;
    if (firestoreDb) {
        rateLimit = await checkFirestoreRateLimit(firestoreDb, callerKey, endpointName, maxRequests, windowMs);
    }
    else {
        rateLimit = checkRateLimit(`${endpointName}:${callerKey}`, maxRequests, windowMs);
    }
    if (!rateLimit.allowed) {
        appLogger.warn(`Rate limit exceeded on ${endpointName}`, {
            endpoint: endpointName,
            callerKey,
            resetAt: new Date(rateLimit.resetAt).toISOString(),
        });
        throw new HttpsError('resource-exhausted', `Rate limit exceeded for ${endpointName}. Please wait a few moments before trying again.`);
    }
}
//# sourceMappingURL=security.js.map