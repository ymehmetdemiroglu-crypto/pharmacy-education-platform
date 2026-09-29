import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, CourseEntitlement } from '../types';

export interface AuthContextType {
  user: UserProfile | null;
  entitlements: CourseEntitlement[];
  loading: boolean;
  signInGuest: () => void;
  signInWithEmail?: (email: string, password?: string | undefined) => Promise<void>;
  signUpWithEmail?: (details: { name: string; email: string; password?: string | undefined; university?: string | undefined }) => Promise<void>;
  signInWithGoogle?: () => Promise<void>;
  startTrial: () => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pharmacy_user_profile');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
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
      preferredLanguage: 'tr',
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };
  });

  const [entitlements, setEntitlements] = useState<CourseEntitlement[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pharmacy_entitlements');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
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
    const guestUser: UserProfile = {
      userId: 'guest-' + Math.random().toString(36).substring(2, 9),
      displayName: 'Guest Student',
      plan: 'free',
      trialUsed: false,
      trialStartedAt: null,
      trialEndsAt: null,
      preferredLanguage: 'tr',
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };
    setUser(guestUser);
    setEntitlements([]);
    setLoading(false);
  };

  const startTrial = async (): Promise<boolean> => {
    if (!user) return false;
    if (user.trialUsed) {
      return false; // Server-enforced single-use trial
    }

    const now = new Date();
    const trialEnds = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const updatedUser: UserProfile = {
      ...user,
      plan: 'trial',
      trialUsed: true,
      trialStartedAt: now.toISOString(),
      trialEndsAt: trialEnds.toISOString(),
      lastActiveAt: now.toISOString(),
    };

    const dualTrialEntitlement: CourseEntitlement = {
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

  const signInWithEmail = async (email: string, _password?: string): Promise<void> => {
    setLoading(true);
    const existing = user || ({} as Partial<UserProfile>);
    const nameFromEmail = email.split('@')[0] || 'Öğrenci';
    const loggedInUser: UserProfile = {
      userId: 'usr-' + Math.random().toString(36).substring(2, 9),
      email,
      displayName: existing.displayName && !existing.displayName.includes('Guest') ? existing.displayName : nameFromEmail,
      university: existing.university || 'İstanbul Üniversitesi',
      plan: existing.plan || 'free',
      trialUsed: existing.trialUsed ?? false,
      trialStartedAt: existing.trialStartedAt ?? null,
      trialEndsAt: existing.trialEndsAt ?? null,
      preferredLanguage: existing.preferredLanguage || 'tr',
      createdAt: existing.createdAt || new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };
    setUser(loggedInUser);
    setLoading(false);
  };

  const signUpWithEmail = async ({
    name,
    email,
    university,
  }: {
    name: string;
    email: string;
    password?: string | undefined;
    university?: string | undefined;
  }): Promise<void> => {
    setLoading(true);
    const newUser: UserProfile = {
      userId: 'usr-' + Math.random().toString(36).substring(2, 9),
      email,
      displayName: name,
      university: university || 'İstanbul Üniversitesi',
      plan: 'free',
      trialUsed: false,
      trialStartedAt: null,
      trialEndsAt: null,
      preferredLanguage: 'tr',
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };
    setUser(newUser);
    setLoading(false);
  };

  const signInWithGoogle = async (): Promise<void> => {
    setLoading(true);
    const googleUser: UserProfile = {
      userId: 'g-user-' + Math.random().toString(36).substring(2, 9),
      email: 'student@istanbul.edu.tr',
      displayName: 'Ecz. Öğrencisi',
      university: 'İstanbul Üniversitesi',
      plan: 'free',
      trialUsed: false,
      trialStartedAt: null,
      trialEndsAt: null,
      preferredLanguage: 'tr',
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };
    setUser(googleUser);
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    setEntitlements([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pharmacy_user_profile');
      localStorage.removeItem('pharmacy_entitlements');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        entitlements,
        loading,
        signInGuest,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        startTrial,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
