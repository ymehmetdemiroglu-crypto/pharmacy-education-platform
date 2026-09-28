import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('pharmacy_user_profile');
            if (saved) {
                try {
                    return JSON.parse(saved);
                }
                catch {
                    return null;
                }
            }
        }
        // Default guest profile
        return {
            userId: 'guest-' + Math.random().toString(36).substring(2, 9),
            displayName: 'Pharmacy Student',
            plan: 'free',
            trialUsed: false,
            trialStartedAt: null,
            trialEndsAt: null,
            preferredLanguage: 'en',
            createdAt: new Date().toISOString(),
            lastActiveAt: new Date().toISOString(),
        };
    });
    const [entitlements, setEntitlements] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('pharmacy_entitlements');
            if (saved) {
                try {
                    return JSON.parse(saved);
                }
                catch {
                    return [];
                }
            }
        }
        return [];
    });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (user && typeof window !== 'undefined') {
            localStorage.setItem('pharmacy_user_profile', JSON.stringify(user));
        }
    }, [user]);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('pharmacy_entitlements', JSON.stringify(entitlements));
        }
    }, [entitlements]);
    const signInGuest = () => {
        setLoading(true);
        const guestUser = {
            userId: 'guest-' + Math.random().toString(36).substring(2, 9),
            displayName: 'Guest Student',
            plan: 'free',
            trialUsed: false,
            trialStartedAt: null,
            trialEndsAt: null,
            preferredLanguage: 'en',
            createdAt: new Date().toISOString(),
            lastActiveAt: new Date().toISOString(),
        };
        setUser(guestUser);
        setEntitlements([]);
        setLoading(false);
    };
    const startTrial = async () => {
        if (!user)
            return false;
        if (user.trialUsed) {
            return false; // Server-enforced single-use trial
        }
        const now = new Date();
        const trialEnds = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        const updatedUser = {
            ...user,
            plan: 'trial',
            trialUsed: true,
            trialStartedAt: now.toISOString(),
            trialEndsAt: trialEnds.toISOString(),
            lastActiveAt: now.toISOString(),
        };
        const dualTrialEntitlement = {
            courseId: 'dual_bundle',
            entitlementId: 'ent-trial-' + Date.now(),
            plan: 'trial',
            status: 'active',
            planId: 'trial_7day',
            startedAt: now.toISOString(),
            expiresAt: trialEnds.toISOString(),
            autoRenew: false,
        };
        setUser(updatedUser);
        setEntitlements([dualTrialEntitlement]);
        return true;
    };
    const logout = () => {
        setUser(null);
        setEntitlements([]);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('pharmacy_user_profile');
            localStorage.removeItem('pharmacy_entitlements');
        }
    };
    return (_jsx(AuthContext.Provider, { value: {
            user,
            entitlements,
            loading,
            signInGuest,
            startTrial,
            logout,
        }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
