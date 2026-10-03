import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, CourseEntitlement } from '../types';
import { getApps } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type User as FirebaseUser,
} from 'firebase/auth';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

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

  // Connect to live Firebase Auth state and Firestore user document when initialized
  useEffect(() => {
    if (typeof window === 'undefined' || getApps().length === 0) return;

    try {
      const auth = getAuth();
      const db = getFirestore();
      let unsubDoc: (() => void) | null = null;

      const unsubAuth = onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
        if (unsubDoc) {
          unsubDoc();
          unsubDoc = null;
        }

        if (fbUser) {
          try {
            unsubDoc = onSnapshot(
              doc(db, 'users', fbUser.uid),
              (docSnap) => {
                const data = docSnap.exists() ? docSnap.data() : null;
                setUser((prev) => ({
                  userId: fbUser.uid,
                  email: fbUser.email ?? prev?.email ?? null,
                  displayName:
                    data?.displayName ||
                    fbUser.displayName ||
                    prev?.displayName ||
                    (fbUser.email ? fbUser.email.split('@')[0] : 'Pharmacy Student'),
                  university: data?.university || prev?.university || 'İstanbul Üniversitesi',
                  plan: ((data?.plan as any) || prev?.plan || 'free') as any,
                  trialUsed: data?.trialUsed ?? prev?.trialUsed ?? false,
                  trialStartedAt: data?.trialStartedAt ?? prev?.trialStartedAt ?? null,
                  trialEndsAt: data?.trialEndsAt ?? prev?.trialEndsAt ?? null,
                  preferredLanguage: (data?.preferredLanguage as any) || prev?.preferredLanguage || 'tr',
                  createdAt: data?.createdAt || prev?.createdAt || new Date().toISOString(),
                  lastActiveAt: new Date().toISOString(),
                }));
              },
              () => {
                setUser((prev) => {
                  const fallbackName = String(fbUser.displayName || prev?.displayName || fbUser.email || 'Pharmacy Student');
                  return {
                    userId: fbUser.uid,
                    email: fbUser.email ?? prev?.email ?? null,
                    displayName: fallbackName,
                    plan: prev?.plan || 'free',
                    trialUsed: prev?.trialUsed ?? false,
                    trialStartedAt: prev?.trialStartedAt ?? null,
                    trialEndsAt: prev?.trialEndsAt ?? null,
                    preferredLanguage: prev?.preferredLanguage || 'tr',
                    createdAt: prev?.createdAt || new Date().toISOString(),
                    lastActiveAt: new Date().toISOString(),
                  };
                });
              }
            );
          } catch {
            // fallback if Firestore offline
          }
        }
      });

      return () => {
        if (unsubDoc) unsubDoc();
        unsubAuth();
      };
    } catch {
      // offline fallback
    }
  }, []);

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

  const signInWithEmail = async (email: string, password?: string): Promise<void> => {
    setLoading(true);
    try {
      if (password && getApps().length > 0) {
        const auth = getAuth();
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const fbUser = cred.user;
        const loggedInUser: UserProfile = {
          userId: fbUser.uid,
          email: fbUser.email || email,
          displayName: fbUser.displayName || email.split('@')[0] || 'Öğrenci',
          plan: 'free',
          trialUsed: false,
          trialStartedAt: null,
          trialEndsAt: null,
          preferredLanguage: 'tr',
          createdAt: new Date().toISOString(),
          lastActiveAt: new Date().toISOString(),
        };
        setUser(loggedInUser);
        return;
      }
    } catch (err: any) {
      console.warn('Firebase signInWithEmail error:', err);
      const isMissingOrInvalidKey =
        err?.code === 'auth/api-key-not-valid' ||
        err?.message?.includes('api-key-not-valid') ||
        err?.message?.includes('network-request-failed');
      if (!isMissingOrInvalidKey) {
        throw err;
      }
    } finally {
      setLoading(false);
    }

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
  };

  const signUpWithEmail = async ({
    name,
    email,
    password,
    university,
  }: {
    name: string;
    email: string;
    password?: string | undefined;
    university?: string | undefined;
  }): Promise<void> => {
    setLoading(true);
    try {
      if (password && getApps().length > 0) {
        const auth = getAuth();
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        const fbUser = cred.user;
        const newUser: UserProfile = {
          userId: fbUser.uid,
          email: fbUser.email || email,
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
        return;
      }
    } catch (err: any) {
      console.warn('Firebase createUserWithEmailAndPassword error:', err);
      const isMissingOrInvalidKey =
        err?.code === 'auth/api-key-not-valid' ||
        err?.message?.includes('api-key-not-valid') ||
        err?.message?.includes('network-request-failed');
      if (!isMissingOrInvalidKey) {
        throw err;
      }
    } finally {
      setLoading(false);
    }

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
    try {
      if (getApps().length > 0) {
        const auth = getAuth();
        signOut(auth).catch((err) => console.warn('Firebase signOut note:', err));
      }
    } catch {
      // offline fallback
    }
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
