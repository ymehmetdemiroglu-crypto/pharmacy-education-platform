// Supabase Edge Function (Deno): delete-account  (KVKK / GDPR erasure; replaces the Firebase deleteUserAccount callable)
// Verifies the caller's JWT, then deletes THAT user only. Rows referencing auth.users with ON DELETE CASCADE
// (mastery, tutor events) are removed by the database. Not deployed until the project owner approves.
import { createClient } from '@supabase/supabase-js';

declare const Deno: {
  env: { get(name: string): string | undefined };
  serve(handler: (req: Request) => Response | Promise<Response>): void;
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);

  const url = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !serviceKey) return json({ error: 'server_misconfigured' }, 500);
  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

  const token = (req.headers.get('Authorization') ?? '').replace(/^Bearer\s+/i, '');
  if (!token) return json({ error: 'unauthorized' }, 401);
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) return json({ error: 'unauthorized' }, 401);

  const { error: deleteError } = await admin.auth.admin.deleteUser(data.user.id);
  if (deleteError) return json({ error: 'delete_failed' }, 500);
  return json({ success: true, message: 'Hesabın ve ilişkili verilerin silindi.' });
});
