import { createClient, SupabaseClient } from '@supabase/supabase-js';

const metaEnv = typeof import.meta !== 'undefined' ? (import.meta as any).env : undefined;

const SUPABASE_URL =
  metaEnv?.VITE_SUPABASE_URL ||
  'https://ibyntbynqkpkkpeoudzv.supabase.co';

const SUPABASE_ANON_KEY =
  metaEnv?.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_Df_D7IPDzVKcUhsxynB5sQ_06q_DAym';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!supabaseInstance) {
    supabaseInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return supabaseInstance;
}

export const supabase = getSupabase();
