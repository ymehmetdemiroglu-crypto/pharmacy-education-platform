/**
 * Rate Limiting Module for Cloud Functions Callable Endpoints
 *
 * Provides Firestore-backed transactional rate limiting per authenticated user / IP,
 * with atomic counters, sliding windows, and scheduled TTL cleanup.
 */
/**
 * Checks and increments a Firestore-backed transactional rate limit.
 * Uses atomic transaction on doc: `rate_limits/{userId}_{endpoint}`.
 *
 * @param firestoreDb Firestore database instance
 * @param userId Authenticated user UID or client IP
 * @param endpoint Callable endpoint name (e.g. 'createCheckoutSession')
 * @param maxRequests Maximum allowable requests per window (default: 5)
 * @param windowMs Duration of the rate limit window in ms (default: 60,000 ms = 1 min)
 */
export async function checkFirestoreRateLimit(firestoreDb, userId, endpoint, maxRequests = 5, windowMs = 60000) {
    const docId = `${userId.replace(/[^a-zA-Z0-9_-]/g, '_')}_${endpoint}`;
    const docRef = firestoreDb.collection('rate_limits').doc(docId);
    const now = Date.now();
    return await firestoreDb.runTransaction(async (transaction) => {
        const snap = await transaction.get(docRef);
        if (!snap.exists) {
            const resetAt = now + windowMs;
            transaction.set(docRef, {
                id: docId,
                userId,
                endpoint,
                count: 1,
                windowStart: new Date(now),
                windowEnd: new Date(resetAt),
                updatedAt: new Date(now),
            });
            return { allowed: true, remaining: maxRequests - 1, resetAt };
        }
        const data = snap.data();
        const windowEndMs = data.windowEnd?.toDate
            ? data.windowEnd.toDate().getTime()
            : new Date(data.windowEnd).getTime();
        // If window has passed, reset window
        if (now > windowEndMs) {
            const resetAt = now + windowMs;
            transaction.set(docRef, {
                id: docId,
                userId,
                endpoint,
                count: 1,
                windowStart: new Date(now),
                windowEnd: new Date(resetAt),
                updatedAt: new Date(now),
            });
            return { allowed: true, remaining: maxRequests - 1, resetAt };
        }
        // If limit reached, return disallowed
        if (data.count >= maxRequests) {
            return { allowed: false, remaining: 0, resetAt: windowEndMs };
        }
        // Increment count
        const newCount = data.count + 1;
        transaction.update(docRef, {
            count: newCount,
            updatedAt: new Date(now),
        });
        return { allowed: true, remaining: maxRequests - newCount, resetAt: windowEndMs };
    });
}
/**
 * Scheduled TTL cleanup for expired rate limit records in Firestore.
 * Deletes all documents where windowEnd < nowTime.
 */
export async function cleanupExpiredRateLimits(firestoreDb, nowTime = new Date()) {
    const expiredSnap = await firestoreDb
        .collection('rate_limits')
        .where('windowEnd', '<', nowTime)
        .limit(200)
        .get();
    if (expiredSnap.empty) {
        return 0;
    }
    const batch = firestoreDb.batch();
    for (const doc of expiredSnap.docs) {
        batch.delete(doc.ref);
    }
    await batch.commit();
    return expiredSnap.size;
}
const inMemoryStore = new Map();
export function checkRateLimit(key, maxRequests = 5, windowMs = 60000) {
    const now = Date.now();
    const record = inMemoryStore.get(key);
    if (!record || now > record.resetAt) {
        const newRecord = { count: 1, resetAt: now + windowMs };
        inMemoryStore.set(key, newRecord);
        return { allowed: true, remaining: maxRequests - 1, resetAt: newRecord.resetAt };
    }
    if (record.count >= maxRequests) {
        return { allowed: false, remaining: 0, resetAt: record.resetAt };
    }
    record.count += 1;
    return { allowed: true, remaining: maxRequests - record.count, resetAt: record.resetAt };
}
export function resetRateLimits() {
    inMemoryStore.clear();
}
//# sourceMappingURL=rateLimiter.js.map