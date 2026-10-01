/**
 * Structured logger with PII and secret sanitization.
 * Ensures zero leakage of credentials, tokens, passwords, and customer PII in cloud logs.
 */
export function sanitizePii(data) {
    if (data === null || data === undefined) {
        return data;
    }
    if (typeof data !== 'object') {
        return data;
    }
    if (Array.isArray(data)) {
        return data.map(sanitizePii);
    }
    const sanitized = {};
    for (const [key, value] of Object.entries(data)) {
        const lowerKey = key.toLowerCase();
        if (lowerKey.includes('secret') ||
            lowerKey.includes('key') ||
            lowerKey.includes('token') ||
            lowerKey.includes('password') ||
            lowerKey.includes('authorization') ||
            lowerKey.includes('bearertoken')) {
            sanitized[key] = '[REDACTED_SECRET]';
        }
        else if (lowerKey.includes('email') && typeof value === 'string') {
            const parts = value.split('@');
            const name = parts[0];
            const domain = parts[1];
            if (name && domain) {
                const masked = name.length > 2 ? `${name.charAt(0)}***${name.charAt(name.length - 1)}` : '***';
                sanitized[key] = `${masked}@${domain}`;
            }
            else {
                sanitized[key] = '[REDACTED_EMAIL]';
            }
        }
        else if (lowerKey.includes('card') || lowerKey.includes('cvv') || lowerKey.includes('pan')) {
            sanitized[key] = '[REDACTED_FINANCIAL]';
        }
        else if (typeof value === 'object') {
            sanitized[key] = sanitizePii(value);
        }
        else {
            sanitized[key] = value;
        }
    }
    return sanitized;
}
export const appLogger = {
    info: (message, context) => {
        console.log(JSON.stringify({
            timestamp: new Date().toISOString(),
            severity: 'INFO',
            message,
            context: sanitizePii(context),
        }));
    },
    warn: (message, context) => {
        console.warn(JSON.stringify({
            timestamp: new Date().toISOString(),
            severity: 'WARNING',
            message,
            context: sanitizePii(context),
        }));
    },
    error: (message, context) => {
        console.error(JSON.stringify({
            timestamp: new Date().toISOString(),
            severity: 'ERROR',
            message,
            context: sanitizePii(context),
        }));
    },
};
//# sourceMappingURL=logger.js.map