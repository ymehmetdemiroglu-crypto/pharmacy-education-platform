import DodoPayments from 'dodopayments';

export type DodoEnvironmentMode = 'test' | 'live';

export interface ProductPlanConfig {
  courseId: 'medchem' | 'pharmacology' | 'dual_bundle';
  planId: 'monthly' | 'semester_pass' | 'annual';
  testProductId: string;
  liveProductId: string;
  defaultPrice: number; // in primary unit
  currency: 'TRY' | 'USD' | 'SAR';
}

/**
 * Canonical product mapping across courses and plans.
 * Product IDs can be overridden via environment variables for live or test setups.
 */
export const PRODUCT_CATALOG: Record<string, ProductPlanConfig> = {
  // Course A: Farmasötik Kimya
  'medchem:monthly': {
    courseId: 'medchem',
    planId: 'monthly',
    testProductId: process.env.DODO_PRODUCT_MEDCHEM_MONTHLY || 'pdt_test_mc_monthly',
    liveProductId: process.env.DODO_PRODUCT_LIVE_MEDCHEM_MONTHLY || 'pdt_live_mc_monthly',
    defaultPrice: 250,
    currency: 'TRY',
  },
  'medchem:semester_pass': {
    courseId: 'medchem',
    planId: 'semester_pass',
    testProductId: process.env.DODO_PRODUCT_MEDCHEM_SEMESTER || 'pdt_test_mc_semester',
    liveProductId: process.env.DODO_PRODUCT_LIVE_MEDCHEM_SEMESTER || 'pdt_live_mc_semester',
    defaultPrice: 850,
    currency: 'TRY',
  },
  'medchem:annual': {
    courseId: 'medchem',
    planId: 'annual',
    testProductId: process.env.DODO_PRODUCT_MEDCHEM_ANNUAL || 'pdt_test_mc_annual',
    liveProductId: process.env.DODO_PRODUCT_LIVE_MEDCHEM_ANNUAL || 'pdt_live_mc_annual',
    defaultPrice: 1450,
    currency: 'TRY',
  },

  // Course B: Farmakoloji
  'pharmacology:monthly': {
    courseId: 'pharmacology',
    planId: 'monthly',
    testProductId: process.env.DODO_PRODUCT_PHARM_MONTHLY || 'pdt_test_ph_monthly',
    liveProductId: process.env.DODO_PRODUCT_LIVE_PHARM_MONTHLY || 'pdt_live_ph_monthly',
    defaultPrice: 250,
    currency: 'TRY',
  },
  'pharmacology:semester_pass': {
    courseId: 'pharmacology',
    planId: 'semester_pass',
    testProductId: process.env.DODO_PRODUCT_PHARM_SEMESTER || 'pdt_test_ph_semester',
    liveProductId: process.env.DODO_PRODUCT_LIVE_PHARM_SEMESTER || 'pdt_live_ph_semester',
    defaultPrice: 850,
    currency: 'TRY',
  },
  'pharmacology:annual': {
    courseId: 'pharmacology',
    planId: 'annual',
    testProductId: process.env.DODO_PRODUCT_PHARM_ANNUAL || 'pdt_test_ph_annual',
    liveProductId: process.env.DODO_PRODUCT_LIVE_PHARM_ANNUAL || 'pdt_live_ph_annual',
    defaultPrice: 1450,
    currency: 'TRY',
  },

  // Dual Bundle (Both Courses)
  'dual_bundle:monthly': {
    courseId: 'dual_bundle',
    planId: 'monthly',
    testProductId: process.env.DODO_PRODUCT_DUAL_MONTHLY || 'pdt_test_dual_monthly',
    liveProductId: process.env.DODO_PRODUCT_LIVE_DUAL_MONTHLY || 'pdt_live_dual_monthly',
    defaultPrice: 400,
    currency: 'TRY',
  },
  'dual_bundle:semester_pass': {
    courseId: 'dual_bundle',
    planId: 'semester_pass',
    testProductId: process.env.DODO_PRODUCT_DUAL_SEMESTER || 'pdt_test_dual_semester',
    liveProductId: process.env.DODO_PRODUCT_LIVE_DUAL_SEMESTER || 'pdt_live_dual_semester',
    defaultPrice: 1350,
    currency: 'TRY',
  },
  'dual_bundle:annual': {
    courseId: 'dual_bundle',
    planId: 'annual',
    testProductId: process.env.DODO_PRODUCT_DUAL_ANNUAL || 'pdt_test_dual_annual',
    liveProductId: process.env.DODO_PRODUCT_LIVE_DUAL_ANNUAL || 'pdt_live_dual_annual',
    defaultPrice: 2300,
    currency: 'TRY',
  },
};

export interface AppConfig {
  dodoEnv: DodoEnvironmentMode;
  sdkEnvironment: 'test_mode' | 'live_mode';
  apiKey: string;
  webhookSecret: string;
  appBaseUrl: string;
}

/**
 * Returns single-switch environment configuration.
 * When DODO_ENV='live', it loads live credentials; otherwise defaults strictly to test mode.
 */
export function getAppConfig(): AppConfig {
  const dodoEnv: DodoEnvironmentMode = (process.env.DODO_ENV === 'live') ? 'live' : 'test';
  const sdkEnvironment: 'test_mode' | 'live_mode' = dodoEnv === 'live' ? 'live_mode' : 'test_mode';

  const apiKey = (dodoEnv === 'live'
    ? process.env.DODO_PAYMENTS_API_KEY_LIVE
    : process.env.DODO_PAYMENTS_API_KEY_TEST) || process.env.DODO_PAYMENTS_API_KEY || 'test_dummy_key';

  const webhookSecret = (dodoEnv === 'live'
    ? process.env.DODO_PAYMENTS_WEBHOOK_KEY_LIVE
    : process.env.DODO_PAYMENTS_WEBHOOK_KEY_TEST) || process.env.DODO_PAYMENTS_WEBHOOK_KEY || process.env.DODO_WEBHOOK_SECRET || (dodoEnv === 'live' ? '' : 'test_whsec_dummy');

  const appBaseUrl = process.env.APP_BASE_URL || 'http://localhost:5173';

  return {
    dodoEnv,
    sdkEnvironment,
    apiKey,
    webhookSecret,
    appBaseUrl,
  };
}

/**
 * Returns configured DodoPayments official SDK instance.
 */
export function getDodoClient(configOverride?: Partial<AppConfig>): DodoPayments {
  const cfg = { ...getAppConfig(), ...configOverride };
  return new DodoPayments({
    bearerToken: cfg.apiKey,
    environment: cfg.sdkEnvironment,
    webhookKey: cfg.webhookSecret,
    timeout: 15000,
  });
}

/**
 * Resolves product ID based on course, plan, and active environment.
 */
export function resolveProductId(courseId: string, planId: string, env: DodoEnvironmentMode): string {
  const key = `${courseId}:${planId}`;
  const config = PRODUCT_CATALOG[key];
  if (!config) {
    throw new Error(`No product configured for course '${courseId}' and plan '${planId}'`);
  }
  return env === 'live' ? config.liveProductId : config.testProductId;
}

/**
 * Reverse resolves a product ID into courseId and planId.
 */
export function reverseResolveProductId(productId: string): { courseId: string; planId: string } | null {
  for (const item of Object.values(PRODUCT_CATALOG)) {
    if (item.testProductId === productId || item.liveProductId === productId) {
      return { courseId: item.courseId, planId: item.planId };
    }
  }
  return null;
}
