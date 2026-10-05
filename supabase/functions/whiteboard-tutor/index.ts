// Supabase Edge Function (Deno): whiteboard-tutor
//
// POST /functions/v1/whiteboard-tutor   body: StudentInteractionEvent   -> { action, mastery }
//
// Secrets (set with `supabase secrets set`, NEVER committed):
//   OPENROUTER_API_KEY        optional; without it the tutor serves the reviewed ladder text only
//   TUTOR_MODELS              optional, comma separated model ids (default list in openrouter.ts)
//   ALLOW_DRAFT_CONCEPTS      'true' to serve concepts whose status is still 'draft' (pilot testing)
//   TUTOR_DAILY_EVENT_LIMIT   hard cap of tutor turns per user per 24h   (default 400)
//   TUTOR_DAILY_LLM_LIMIT     cap of model calls per user per 24h        (default 80)
//   BROADCAST_ENABLED         'true' to also push the action on the private Realtime channel
// SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY / SUPABASE_ANON_KEY are injected by the platform.
import { createClient } from '@supabase/supabase-js';
import {
  applyMasteryDelta,
  conceptFromRow,
  StudentInteractionEventSchema,
  type LectureConceptRow,
} from '../_shared/whiteboard.ts';
import { callTutorModel, DEFAULT_MODELS } from './openrouter.ts';
import { runTutorTurn, TutorInputError, type TutorLlm } from './scaffolding-engine.ts';

declare const Deno: {
  env: { get(name: string): string | undefined };
  serve(handler: (req: Request) => Response | Promise<Response>): void;
};

const MAX_BODY_BYTES = 8 * 1024;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

const intEnv = (name: string, fallback: number): number => {
  const n = Number(Deno.env.get(name));
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceKey) return json({ error: 'server_misconfigured' }, 500);
  const db = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

  // 1. Authenticate: the caller's JWT must resolve to a real user.
  const token = (req.headers.get('Authorization') ?? '').replace(/^Bearer\s+/i, '');
  if (!token) return json({ error: 'unauthorized' }, 401);
  const { data: userData, error: userError } = await db.auth.getUser(token);
  if (userError || !userData.user) return json({ error: 'unauthorized' }, 401);
  const userId = userData.user.id;

  // 2. Parse + validate input (bounded size, strict schema).
  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return json({ error: 'payload_too_large' }, 413);
  let parsedBody: unknown;
  try {
    parsedBody = JSON.parse(raw);
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }
  const parsed = StudentInteractionEventSchema.safeParse(parsedBody);
  if (!parsed.success) return json({ error: 'invalid_event' }, 400);
  const event = parsed.data;

  // 3. Per-user daily limits (cost guard).
  const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const { count: eventCount } = await db
    .from('tutor_events')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', since);
  if ((eventCount ?? 0) >= intEnv('TUTOR_DAILY_EVENT_LIMIT', 400)) {
    return json({ error: 'daily_limit_reached' }, 429);
  }
  const { count: llmCount } = await db
    .from('tutor_events')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('llm_used', true)
    .gte('created_at', since);
  const llmAllowed = (llmCount ?? 0) < intEnv('TUTOR_DAILY_LLM_LIMIT', 80);

  // 4. Load the reviewed concept.
  const { data: row, error: rowError } = await db
    .from('lecture_concepts')
    .select('*')
    .eq('id', event.conceptId)
    .maybeSingle();
  if (rowError) return json({ error: 'concept_lookup_failed' }, 502);
  if (!row) return json({ error: 'concept_not_found' }, 404);
  if (row.status !== 'verified' && Deno.env.get('ALLOW_DRAFT_CONCEPTS') !== 'true') {
    return json({ error: 'concept_not_verified' }, 409);
  }
  let concept;
  try {
    concept = conceptFromRow(row as LectureConceptRow);
  } catch {
    return json({ error: 'concept_invalid' }, 500);
  }

  // 5. Tutor turn.
  const apiKey = Deno.env.get('OPENROUTER_API_KEY');
  const models = (Deno.env.get('TUTOR_MODELS') ?? '')
    .split(',')
    .map((m) => m.trim())
    .filter(Boolean);
  const llm: TutorLlm | null =
    apiKey && llmAllowed
      ? (system, user) =>
          callTutorModel({ apiKey, models: models.length > 0 ? models : DEFAULT_MODELS, system, user })
      : null;

  const started = Date.now();
  let result;
  try {
    result = await runTutorTurn({ event, concept, llm });
  } catch (e) {
    if (e instanceof TutorInputError) return json({ error: e.code }, 422);
    return json({ error: 'tutor_failed' }, 500);
  }
  const { action } = result;

  // 6. Persist usage + mastery (service role; clients cannot write these tables).
  await db.from('tutor_events').insert({
    user_id: userId,
    concept_id: concept.id,
    model: result.model,
    scaffold_level: action.scaffoldLevel,
    llm_used: result.llmAttempted,
    latency_ms: Date.now() - started,
    prompt_tokens: result.promptTokens,
    completion_tokens: result.completionTokens,
  });

  let masteryScore = 0;
  const { data: existing } = await db
    .from('student_concept_mastery')
    .select('*')
    .eq('user_id', userId)
    .eq('concept_id', concept.id)
    .maybeSingle();
  masteryScore = applyMasteryDelta(existing?.mastery_score ?? 0, action.masteryDelta);
  if (event.action !== 'HINT_REQUESTED') {
    const attempts = (existing?.total_attempts ?? 0) + 1;
    const prevAvg = existing?.hesitation_avg_ms ?? 0;
    const misconceptions = new Set<string>(existing?.diagnosed_misconceptions ?? []);
    if (!action.isCorrect) {
      const picked = event.payload['selectedOptionIds'];
      if (Array.isArray(picked)) {
        for (const id of picked) {
          if (typeof id === 'string' && concept.misconceptionMap[id]) misconceptions.add(id);
        }
      }
    }
    await db.from('student_concept_mastery').upsert({
      user_id: userId,
      concept_id: concept.id,
      course_id: concept.courseId,
      mastery_score: masteryScore,
      total_attempts: attempts,
      successful_attempts: (existing?.successful_attempts ?? 0) + (action.isCorrect ? 1 : 0),
      hesitation_avg_ms: Math.round((prevAvg * (attempts - 1) + event.hesitationTimeMs) / attempts),
      diagnosed_misconceptions: [...misconceptions],
      last_attempted_at: new Date().toISOString(),
    });
  }

  // 7. Optional best-effort push on the private Realtime channel (multi-device). Off by default.
  if (Deno.env.get('BROADCAST_ENABLED') === 'true') {
    try {
      const channel = db.channel(`whiteboard:${userId}:${event.sessionId}`, { config: { private: true } });
      await Promise.race([
        channel.send({ type: 'broadcast', event: 'ai_tutor_action', payload: action }),
        new Promise((resolve) => setTimeout(resolve, 1500)),
      ]);
      await db.removeChannel(channel);
    } catch {
      // never fail the turn because of the broadcast
    }
  }

  return json({ action, mastery: { conceptId: concept.id, score: masteryScore } });
});
