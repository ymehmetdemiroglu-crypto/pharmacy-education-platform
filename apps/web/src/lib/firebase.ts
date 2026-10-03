import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, Auth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, Firestore } from 'firebase/firestore';
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
  CustomProvider,
  AppCheck,
} from 'firebase/app-check';
import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
  Functions,
} from 'firebase/functions';

/**
 * Firebase Client Configuration
 * Populated from Vite environment variables (VITE_FIREBASE_*)
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1234567890',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1234567890:web:abcdef',
};

// Initialize Firebase App
export const app: FirebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize App Check
export let appCheck: AppCheck | null = null;

const reCaptchaKey = import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY;
const isDev = import.meta.env.DEV;
const isTest = import.meta.env.MODE === 'test';

if (typeof window !== 'undefined' && !isTest) {
  try {
    if (isDev) {
      // In development, enable debug token to bypass reCAPTCHA scoring against localhost
      // Yahya can set a custom debug token or generate one in browser console
      const debugToken =
        import.meta.env.VITE_FIREBASE_APPCHECK_DEBUG_TOKEN || true;
      (window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = debugToken;

      if (reCaptchaKey) {
        appCheck = initializeAppCheck(app, {
          provider: new ReCaptchaV3Provider(reCaptchaKey),
          isTokenAutoRefreshEnabled: true,
        });
      } else {
        // Fallback custom provider for local development without reCAPTCHA key
        appCheck = initializeAppCheck(app, {
          provider: new CustomProvider({
            getToken: async () => ({
              token: 'dev-debug-app-check-token',
              expireTimeMillis: Date.now() + 3600 * 1000,
            }),
          }),
          isTokenAutoRefreshEnabled: true,
        });
      }
    } else if (reCaptchaKey) {
      // Production: Enforced reCAPTCHA v3 provider
      appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(reCaptchaKey),
        isTokenAutoRefreshEnabled: true,
      });
    }
  } catch (err) {
    console.warn('[AppCheck] Initialization warning:', err);
  }
}

// Initialize Firebase Auth, Firestore, and Functions SDKs
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const functions: Functions = getFunctions(app);

// Connect to Firebase emulators if configured
if (
  import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true' &&
  typeof window !== 'undefined'
) {
  const emulatorHost = import.meta.env.VITE_FIREBASE_EMULATOR_HOST || '127.0.0.1';
  const functionsPort = Number(import.meta.env.VITE_FUNCTIONS_EMULATOR_PORT) || 5001;
  const authPort = Number(import.meta.env.VITE_AUTH_EMULATOR_PORT) || 9099;
  const firestorePort = Number(import.meta.env.VITE_FIRESTORE_EMULATOR_PORT) || 8080;

  connectFunctionsEmulator(functions, emulatorHost, functionsPort);
  connectAuthEmulator(auth, `http://${emulatorHost}:${authPort}`, { disableWarnings: true });
  connectFirestoreEmulator(db, emulatorHost, firestorePort);
}

// Typed callable wrappers
export interface CreateCheckoutSessionParams {
  courseId: 'medchem' | 'pharmacology' | 'dual_bundle';
  planId: 'monthly' | 'semester_pass' | 'annual';
  currency?: 'TRY' | 'USD' | 'SAR';
  returnUrl?: string;
}

export interface CreateCustomerPortalSessionParams {
  returnUrl?: string;
  sendEmail?: boolean;
}

export interface CancelSubscriptionParams {
  courseId: 'medchem' | 'pharmacology' | 'dual_bundle';
  cancelImmediately?: boolean;
  reason?: string;
}

export interface ChangeSubscriptionPlanParams {
  courseId: 'medchem' | 'pharmacology' | 'dual_bundle';
  newPlanId: 'monthly' | 'semester_pass' | 'annual';
  prorationMode?: 'difference_immediately' | 'prorated_immediately' | 'full_immediately' | 'do_not_bill';
}

export const callStartFreeTrial = httpsCallable<void, { success: boolean; trialStartedAt: string; trialEndsAt: string; plan: string }>(
  functions,
  'startFreeTrial'
);

export const callCreateCheckoutSession = httpsCallable<CreateCheckoutSessionParams, { checkoutUrl: string; sessionId: string }>(
  functions,
  'createCheckoutSession'
);

export const callCreateCustomerPortalSession = httpsCallable<CreateCustomerPortalSessionParams, { portalUrl: string; expiresAt?: string }>(
  functions,
  'createCustomerPortalSession'
);

export const callCancelSubscription = httpsCallable<CancelSubscriptionParams, { success: boolean; subscriptionId: string; cancelImmediately: boolean; message: string }>(
  functions,
  'cancelSubscription'
);

export const callChangeSubscriptionPlan = httpsCallable<ChangeSubscriptionPlanParams, { success: boolean; subscriptionId: string; newPlanId: string; status: string }>(
  functions,
  'changeSubscriptionPlan'
);

export const callDeleteUserAccount = httpsCallable<void, { success: boolean; message: string }>(
  functions,
  'deleteUserAccount'
);
