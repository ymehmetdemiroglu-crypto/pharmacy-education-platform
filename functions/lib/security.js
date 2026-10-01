import { HttpsError } from 'firebase-functions/v2/https';
import { checkRateLimit } from './rateLimiter.js';
import { appLogger } from './logger.js';
/**
 * Enforces App Check verification and rate limiting on callable endpoints.
 */
export function enforceCallableGuards(request, endpointName, options = {}) {
    const maxRequests = options.maxRequests ?? 10;
    const windowMs = options.windowMs ?? 60000;
    // 1. App Check enforcement
    // Check explicit option or environment toggle ENFORCE_APP_CHECK
    const shouldEnforceAppCheck = options.requireAppCheck ?? (process.env.ENFORCE_APP_CHECK === 'true');
    if (shouldEnforceAppCheck && !request.app) {
        appLogger.warn(`App Check verification failed on ${endpointName}`, {
            endpoint: endpointName,
            uid: request.auth?.uid,
        });
        throw new HttpsError('unauthenticated', 'The function must be called from an App Check verified app.');
    }
    // 2. Sliding window rate limiting
    const callerKey = request.auth?.uid || request.rawRequest?.ip || 'anonymous';
    const limitKey = `${endpointName}:${callerKey}`;
    const rateLimit = checkRateLimit(limitKey, maxRequests, windowMs);
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