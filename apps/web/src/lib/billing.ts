import { supabase } from '@pharmacy/platform';

/**
 * Billing & account client (Supabase-only backend).
 *
 * Replaces the former Firebase callable wrappers. During the free class pilot
 * (FREE_PILOT_MODE) payments are intentionally switched off: checkout, portal
 * and trial calls reject with BillingUnavailableError, and callers already fall
 * back to their non-payment paths. The Dodo Payments contract (docs/payments-plan.md)
 * stays documented and is re-enabled by porting it to a Supabase Edge Function.
 */

const metaEnv = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;

/** Paywall gating is OFF unless explicitly disabled with VITE_FREE_PILOT_MODE=false. */
export const FREE_PILOT_MODE: boolean = metaEnv?.VITE_FREE_PILOT_MODE !== 'false';

export class BillingUnavailableError extends Error {
  constructor(message = 'Ödemeler pilot dönemi boyunca kapalıdır. Sınıfımız için tüm içerik ücretsiz.') {
    super(message);
    this.name = 'BillingUnavailableError';
  }
}

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

interface CallResult<T> {
  data: T;
}

function billingOff<T>(): Promise<CallResult<T>> {
  return Promise.reject(new BillingUnavailableError());
}

export const callStartFreeTrial = (): Promise<
  CallResult<{ success: boolean; trialStartedAt: string; trialEndsAt: string; plan: string }>
> => billingOff();

export const callCreateCheckoutSession = (
  _params: CreateCheckoutSessionParams
): Promise<CallResult<{ checkoutUrl: string; sessionId: string }>> => billingOff();

export const callCreateCustomerPortalSession = (
  _params: CreateCustomerPortalSessionParams
): Promise<CallResult<{ portalUrl: string; expiresAt?: string }>> => billingOff();

/**
 * KVKK / GDPR erasure. Invokes the `delete-account` Edge Function, which verifies the
 * caller's JWT and deletes that user (progress rows cascade). Not deployed until the
 * project owner approves remote Supabase changes.
 */
export async function callDeleteUserAccount(): Promise<CallResult<{ success: boolean; message: string }>> {
  const { data, error } = await supabase.functions.invoke('delete-account', { method: 'POST' });
  if (error) {
    throw new Error(error.message || 'Account deletion failed');
  }
  return { data: data as { success: boolean; message: string } };
}
