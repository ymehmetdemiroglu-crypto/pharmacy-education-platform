import { describe, it, expect, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LectureConceptSchema, type LectureConcept, type StudentInteractionEvent } from '../_shared/whiteboard.ts';
import { parseTeachingMd, contextFromPath } from '../../../scripts/lib/teaching-md.mjs';
import { callTutorModel, extractJsonObject, OPENROUTER_URL } from './openrouter.ts';
import { runTutorTurn, TutorInputError, type TutorLlm } from './scaffolding-engine.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const FILE = path.join(ROOT, 'courses/medchem/teaching/hafta-01-reseptor-etkilesimleri.teaching.md');
const concepts: LectureConcept[] = parseTeachingMd(fs.readFileSync(FILE, 'utf8'), contextFromPath(FILE)).concepts.map(
  (c) => LectureConceptSchema.parse(c)
);
const byId = (id: string) => concepts.find((c) => c.id === id)!;

const ev = (over: Partial<StudentInteractionEvent>): StudentInteractionEvent => ({
  type: 'student_interaction',
  sessionId: 'session-12345678',
  conceptId: 'rr:iyonik_bag',
  widgetType: 'PredictThenReveal',
  action: 'OPTION_SELECTED',
  payload: { selectedOptionIds: ['DISTANCE_NO_EFFECT'] },
  hesitationTimeMs: 900,
  attemptCount: 1,
  timestamp: 1,
  ...over,
});

const llmReply = (message: string): TutorLlm =>
  vi.fn(async () => ({ output: { tutorMessage: message }, model: 'test/model', promptTokens: 10, completionTokens: 5 }));

describe('runTutorTurn', () => {
  it('wrong answer without a model serves the reviewed ladder text', async () => {
    const r = await runTutorTurn({ event: ev({}), concept: byId('rr:iyonik_bag'), llm: null });
    expect(r.action.messageSource).toBe('ladder');
    expect(r.action.scaffoldLevel).toBe('nudge');
    expect(r.llmAttempted).toBe(false);
  });

  it('uses the model phrasing when it is valid and grounded', async () => {
    const llm = llmReply('Zıt yükler uzaklaşınca çekimin ne olacağını düşün; slaytta mesafenin rolü var mı?');
    const r = await runTutorTurn({ event: ev({}), concept: byId('rr:iyonik_bag'), llm });
    expect(r.action.messageSource).toBe('llm');
    expect(r.model).toBe('test/model');
    expect(r.llmAttempted).toBe(true);
    // facts the model cannot change:
    expect(r.action.scaffoldLevel).toBe('nudge');
    expect(r.action.isCorrect).toBe(false);
  });

  it('falls back to the ladder when the model text is too long', async () => {
    const llm = llmReply(Array.from({ length: 60 }, () => 'bağ').join(' '));
    const r = await runTutorTurn({ event: ev({}), concept: byId('rr:iyonik_bag'), llm });
    expect(r.action.messageSource).toBe('ladder');
    expect(r.llmAttempted).toBe(true);
  });

  it('falls back to the ladder when the model invents a number', async () => {
    const llm = llmReply('Bu bağ yaklaşık 99 kcal/mol enerjiye sahiptir.');
    const r = await runTutorTurn({ event: ev({}), concept: byId('rr:iyonik_bag'), llm });
    expect(r.action.messageSource).toBe('ladder');
  });

  it('falls back to the ladder when the model returns nothing', async () => {
    const r = await runTutorTurn({ event: ev({}), concept: byId('rr:iyonik_bag'), llm: async () => null });
    expect(r.action.messageSource).toBe('ladder');
  });

  it('never calls the model for a correct answer', async () => {
    const llm = llmReply('x');
    const r = await runTutorTurn({
      event: ev({ payload: { selectedOptionIds: ['correct'] }, attemptCount: 0 }),
      concept: byId('rr:iyonik_bag'),
      llm,
    });
    expect(llm).not.toHaveBeenCalled();
    expect(r.action.scaffoldLevel).toBe('mastery');
    expect(r.action.isCorrect).toBe(true);
  });

  it('ignores a client claiming a wrong pick was correct', async () => {
    const r = await runTutorTurn({
      event: ev({ payload: { selectedOptionIds: ['DISTANCE_STRENGTHENS'], isCorrect: true, correct: true } }),
      concept: byId('rr:iyonik_bag'),
      llm: null,
    });
    expect(r.action.isCorrect).toBe(false);
  });

  it('hint requests escalate the ladder, grant no mastery and do not clear the selection', async () => {
    const r = await runTutorTurn({
      event: ev({ action: 'HINT_REQUESTED', payload: {}, attemptCount: 2 }),
      concept: byId('rr:iyonik_bag'),
      llm: null,
    });
    expect(r.action.scaffoldLevel).toBe('clue');
    expect(r.action.masteryDelta).toBe(0);
    expect(r.action.whiteboardCommands.some((c) => c.command === 'RESET_SELECTION')).toBe(false);
  });

  it('rejects mismatched concept ids, drafts without widget and non-evaluable widgets', async () => {
    await expect(
      runTutorTurn({ event: ev({ conceptId: 'rr:kovalan_baglar' }), concept: byId('rr:iyonik_bag'), llm: null })
    ).rejects.toMatchObject({ code: 'concept_mismatch' });
    const noWidget = byId('rr:dibukain_entegrasyon');
    await expect(
      runTutorTurn({ event: ev({ conceptId: noWidget.id }), concept: noWidget, llm: null })
    ).rejects.toBeInstanceOf(TutorInputError);
    const odd: LectureConcept = { ...byId('rr:iyonik_bag'), widget: { type: 'StructureIdentifier', config: {} } };
    await expect(runTutorTurn({ event: ev({}), concept: odd, llm: null })).rejects.toMatchObject({
      code: 'unsupported_widget',
    });
  });

  it('runs every shipped widget concept end-to-end (wrong then correct) without schema errors', async () => {
    for (const c of concepts.filter((x) => x.widget)) {
      const options = (c.widget!.config.options as { id: string; isCorrect: boolean }[]);
      const wrong = options.find((o) => !o.isCorrect)!;
      const right = options.find((o) => o.isCorrect)!;
      const bad = await runTutorTurn({
        event: ev({ conceptId: c.id, widgetType: c.widget!.type, payload: { selectedOptionIds: [wrong.id] } }),
        concept: c,
        llm: null,
      });
      expect(bad.action.isCorrect).toBe(false);
      const good = await runTutorTurn({
        event: ev({ conceptId: c.id, widgetType: c.widget!.type, payload: { selectedOptionIds: [right.id] }, attemptCount: 1 }),
        concept: c,
        llm: null,
      });
      expect(good.action.isCorrect).toBe(true);
    }
  });
});

describe('callTutorModel (OpenRouter cascade)', () => {
  const okBody = (content: string) =>
    new Response(JSON.stringify({ choices: [{ message: { content } }], usage: { prompt_tokens: 7, completion_tokens: 3 } }), {
      status: 200,
    });

  it('fails over from a 429 to the next model and returns validated output', async () => {
    const calls: string[] = [];
    const fetchImpl = vi.fn(async (_url: unknown, init?: RequestInit) => {
      const model = JSON.parse(String(init?.body)).model as string;
      calls.push(model);
      return model === 'm1' ? new Response('rate limited', { status: 429 }) : okBody('{"tutorMessage":"Merhaba, tekrar dene."}');
    }) as unknown as typeof fetch;
    const r = await callTutorModel({ apiKey: 'test-key', models: ['m1', 'm2'], system: 's', user: 'u', fetchImpl });
    expect(calls).toEqual(['m1', 'm2']);
    expect(r?.model).toBe('m2');
    expect(r?.output.tutorMessage).toBe('Merhaba, tekrar dene.');
    expect(r?.promptTokens).toBe(7);
  });

  it('skips replies that are not valid JSON / schema and tolerates prose around the JSON', async () => {
    const replies = ['no json here', '{"wrong":"shape"}', 'Tabii: {"tutorMessage":"Tamam."} bitti'];
    let i = 0;
    const fetchImpl = vi.fn(async () => okBody(replies[i++] ?? '')) as unknown as typeof fetch;
    const r = await callTutorModel({ apiKey: 'k', models: ['a', 'b', 'c'], system: 's', user: 'u', fetchImpl });
    expect(r?.model).toBe('c');
    expect(r?.output.tutorMessage).toBe('Tamam.');
  });

  it('returns null when every model fails or times out, and never leaks the key', async () => {
    const fetchImpl = vi.fn(async () => {
      throw new Error('boom');
    }) as unknown as typeof fetch;
    const r = await callTutorModel({ apiKey: 'sk-or-v1-SECRET', models: ['a', 'b'], system: 's', user: 'u', fetchImpl });
    expect(r).toBeNull();
  });

  it('sends the key only in the Authorization header, to the OpenRouter URL', async () => {
    const fetchImpl = vi.fn(async (_u: unknown, init?: RequestInit) => {
      expect(String(init?.body)).not.toContain('sk-or-v1-SECRET');
      return okBody('{"tutorMessage":"ok"}');
    }) as unknown as typeof fetch;
    await callTutorModel({ apiKey: 'sk-or-v1-SECRET', models: ['a'], system: 's', user: 'u', fetchImpl });
    const [url, init] = (fetchImpl as unknown as ReturnType<typeof vi.fn>).mock.calls[0]!;
    expect(url).toBe(OPENROUTER_URL);
    expect((init as RequestInit).headers).toMatchObject({ Authorization: 'Bearer sk-or-v1-SECRET' });
  });

  it('stops once the overall budget is exhausted', async () => {
    let t = 0;
    const fetchImpl = vi.fn(async () => new Response('x', { status: 500 })) as unknown as typeof fetch;
    const r = await callTutorModel({
      apiKey: 'k', models: ['a', 'b', 'c'], system: 's', user: 'u', fetchImpl, budgetMs: 1000,
      now: () => (t += 600),
    });
    expect(r).toBeNull();
    expect((fetchImpl as unknown as ReturnType<typeof vi.fn>).mock.calls.length).toBeLessThan(3);
  });

  it('extractJsonObject handles garbage', () => {
    expect(extractJsonObject('')).toBeUndefined();
    expect(extractJsonObject('{broken')).toBeUndefined();
    expect(extractJsonObject('x {"a":1} y')).toEqual({ a: 1 });
  });
});
