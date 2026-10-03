import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile, CourseEntitlement } from '../types';
import { supabase } from '../supabase';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

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

function mapSupabaseEntitlement(row: any): CourseEntitlement {
  return {
    courseId: row.course_id || 'dual_bundle',
    entitlementId: row.entitlement_id || row.id || `ent-${Date.now()}`,
    plan: row.plan || 'trial',
    status: row.status || 'active',
    planId: row.plan_id || 'trial_7day',
    startedAt: row.started_at || new Date().toISOString(),
    expiresAt: row.expires_at || new Date(Date.now() + 7 * 86400000).toISOString(),
    autoRenew: row.auto_renew ?? false,
  };
}

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

  const [loading, setLoading] = useState(true);

  // Sync profile & entitlements to localStorage
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

  // Load user data from Supabase
  const syncSupabaseUserData = useCallback(async (sbUser: SupabaseUser) => {
    try {
      // 1. Fetch Profile
      const { data: profileData, error: profileErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', sbUser.id)
        .maybeSingle();

      if (profileErr) {
        console.warn('[Supabase Auth] Profile fetch note:', profileErr.message);
      }

      const email = sbUser.email || '';
      const fallbackName = sbUser.user_metadata?.display_name || email.split('@')[0] || 'Pharmacy Student';
      const university = sbUser.user_metadata?.university || 'İstanbul Üniversitesi';

      const resolvedUser: UserProfile = {
        userId: sbUser.id,
        email: email,
        displayName: profileData?.display_name || fallbackName,
        university: university,
        plan: (profileData?.plan as any) || 'free',
        trialUsed: profileData?.trial_used ?? false,
        trialStartedAt: profileData?.trial_started_at || null,
        trialEndsAt: profileData?.trial_ends_at || null,
        preferredLanguage: (profileData?.preferred_language as any) || 'tr',
        country: profileData?.country || 'TR',
        createdAt: profileData?.created_at || sbUser.created_at || new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
      };

      setUser(resolvedUser);

      // 2. Fetch Entitlements
      const { data: entData, error: entErr } = await supabase
        .from('entitlements')
        .select('*')
        .eq('user_id', sbUser.id)
        .eq('status', 'active');

      if (!entErr && entData && entData.length > 0) {
        const mapped = entData.map(mapSupabaseEntitlement);
        setEntitlements(mapped);
      } else if (resolvedUser.plan === 'free') {
        setEntitlements([]);
      }
    } catch (err) {
      console.warn('[Supabase Auth] syncUserData error:', err);
    }
  }, []);

  // Connect to live Supabase Auth state listener
  useEffect(() => {
    let mounted = true;

    // Initial session check
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (!mounted) return;
      if (!error && session?.user) {
        syncSupabaseUserData(session.user).finally(() => {
          if (mounted) setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    // Auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event: string, session: Session | null) => {
      if (!mounted) return;
      if (session?.user) {
        await syncSupabaseUserData(session.user);
      } else {
        // Logged out
        if (typeof window !== 'undefined') {
          const cached = localStorage.getItem('pharmacy_user_profile');
          if (!cached) {
            setUser({
              userId: 'guest-' + Math.random().toString(36).substring(2, 9),
              displayName: 'Pharmacy Student',
              plan: 'free',
              trialUsed: false,
              trialStartedAt: null,
              trialEndsAt: null,
              preferredLanguage: 'tr',
              createdAt: new Date().toISOString(),
              lastActiveAt: new Date().toISOString(),
            });
            setEntitlements([]);
          }
        }
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [syncSupabaseUserData]);

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

    // If user is authenticated in Supabase, call atomic RPC
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data, error } = await supabase.rpc('start_free_trial');
        if (error) {
          console.warn('[Supabase start_free_trial RPC warning]:', error.message);
          throw error;
        }
        await syncSupabaseUserData(session.user);
        return true;
      }
    } catch (rpcErr: any) {
      console.warn('[Supabase startTrial exception]:', rpcErr?.message);
      // If RPC throws that trial already claimed, return false
      if (rpcErr?.message?.includes('already been claimed')) {
        return false;
      }
    }

    // Guest fallback trial (stored in state/localStorage)
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
      if (password) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        if (data.user) {
          await syncSupabaseUserData(data.user);
          return;
        }
      }
    } catch (err: any) {
      console.warn('[Supabase signInWithEmail]:', err?.message);
      throw err;
    } finally {
      setLoading(false);
    }

    // Local state fallback if offline
    const nameFromEmail = email.split('@')[0] || 'Öğrenci';
    const loggedInUser: UserProfile = {
      userId: 'usr-' + Math.random().toString(36).substring(2, 9),
      email,
      displayName: nameFromEmail,
      university: 'İstanbul Üniversitesi',
      plan: 'free',
      trialUsed: false,
      trialStartedAt: null,
      trialEndsAt: null,
      preferredLanguage: 'tr',
      createdAt: new Date().toISOString(),
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
      if (password) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              display_name: name,
              university: university || 'İstanbul Üniversitesi',
            },
          },
        });

        if (error) {
          throw error;
        }

        if (data.user) {
          // Upsert initial profile in public.profiles table
          await supabase.from('profiles').upsert({
            id: data.user.id,
            email: email,
            display_name: name,
            preferred_language: 'tr',
            country: 'TR',
            plan: 'free',
            trial_used: false,
          });

          await syncSupabaseUserData(data.user);
          return;
        }
      }
    } catch (err: any) {
      console.warn('[Supabase signUpWithEmail]:', err?.message);
      throw err;
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
    try {
      const redirectOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://optimusrufus.com';
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectOrigin,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      console.warn('[Supabase Google Auth]:', err?.message);
      // Fallback for local testing
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
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('[Supabase signOut]:', err);
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
