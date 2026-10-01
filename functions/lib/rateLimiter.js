/**
 * Rate Limiting Module for Cloud Functions Callable Endpoints
 *
 * Provides sliding-window rate limiting per authenticated user / IP to prevent
 * checkout spam, trial brute-forcing, and endpoint abuse.
 */
const rateLimitStore = new Map();
/**
 * Checks and increments the rate limit counter for a given key.
 *
 * @param key Unique identifier (e.g. `checkout:${userId}`)
 * @param maxRequests Maximum allowable requests in the window
 * @param windowMs Duration of the window in milliseconds (default: 60,000 ms = 1 min)
 */
export function checkRateLimit(key, maxRequests = 5, windowMs = 60000) {
    const now = Date.now();
    const record = rateLimitStore.get(key);
    if (!record || now > record.resetAt) {
        const newRecord = { count: 1, resetAt: now + windowMs };
        rateLimitStore.set(key, newRecord);
        return { allowed: true, remaining: maxRequests - 1, resetAt: newRecord.resetAt };
    }
    if (record.count >= maxRequests) {
        return { allowed: false, remaining: 0, resetAt: record.resetAt };
    }
    record.count += 1;
    return { allowed: true, remaining: maxRequests - record.count, resetAt: record.resetAt };
}
/**
 * Resets the in-memory rate limit store (useful for tests).
 */
export function resetRateLimits() {
    rateLimitStore.clear();
}
//# sourceMappingURL=rateLimiter.js.map