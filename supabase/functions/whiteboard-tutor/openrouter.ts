import { LlmTutorOutputSchema, type LlmTutorOutput } from '../_shared/whiteboard.ts';

/**
 * Models are tried in order. All IDs below were present in OpenRouter's public /models list when
 * this was written; override with the TUTOR_MODELS secret (comma separated) without a redeploy.
 */
export const DEFAULT_MODELS = [
  'inclusionai/ling-3.0-flash-sante',
  'qwen/qwen3.8-27b:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
  'google/gemma-4-26b-a4b-it:free',
];

export const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

export interface LlmCallResult {
  output: LlmTutorOutput;
  model: string;
  promptTokens: number | null;
  completionTokens: number | null;
}

export interface LlmCallArgs {
  apiKey: string;
  models: string[];
  system: string;
  user: string;
  /** per-model timeout */
  timeoutMs?: number;
  /** overall budget across the whole cascade */
  budgetMs?: number;
  fetchImpl?: typeof fetch;
  now?: () => number;
}

const MAX_TOKENS = 700; // headroom: reasoning-capable free models may spend tokens before the answer

/** Pull the first JSON object out of a string (models sometimes wrap it in prose or fences). */
export function extractJsonObject(text: string): unknown {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start < 0 || end <= start) return undefined;
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return undefined;
  }
}

/**
 * Cascade through the model list. Any HTTP error, timeout, empty reply or schema-invalid reply
 * moves on to the next model; null means "use the reviewed ladder text instead".
 * The API key is only ever placed in the Authorization header and never logged.
 */
export async function callTutorModel(args: LlmCallArgs): Promise<LlmCallResult | null> {
  const doFetch = args.fetchImpl ?? fetch;
  const now = args.now ?? Date.now;
  const started = now();
  const budget = args.budgetMs ?? 14_000;

  for (const model of args.models) {
    const remaining = budget - (now() - started);
    if (remaining <= 500) return null;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), Math.min(args.timeoutMs ?? 8_000, remaining));
    try {
      const res = await doFetch(OPENROUTER_URL, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${args.apiKey}`,
          'Content-Type': 'application/json',
          'X-Title': 'Pharmacy Education Platform',
        },
        body: JSON.stringify({
          model,
          temperature: 0.3,
          max_tokens: MAX_TOKENS,
          reasoning: { effort: 'low' },
          response_format: {
            type: 'json_schema',
            json_schema: {
              name: 'tutor_message',
              strict: true,
              schema: {
                type: 'object',
                properties: { tutorMessage: { type: 'string' } },
                required: ['tutorMessage'],
                additionalProperties: false,
              },
            },
          },
          messages: [
            { role: 'system', content: args.system },
            { role: 'user', content: args.user },
          ],
        }),
      });
      if (!res.ok) continue;
      const json = (await res.json()) as {
        choices?: { message?: { content?: string | null } }[];
        usage?: { prompt_tokens?: number; completion_tokens?: number };
      };
      const content = json.choices?.[0]?.message?.content;
      if (!content) continue;
      const parsed = LlmTutorOutputSchema.safeParse(extractJsonObject(content));
      if (!parsed.success) continue;
      return {
        output: parsed.data,
        model,
        promptTokens: json.usage?.prompt_tokens ?? null,
        completionTokens: json.usage?.completion_tokens ?? null,
      };
    } catch {
      // network error / abort -> next model
    } finally {
      clearTimeout(timer);
    }
  }
  return null;
}
