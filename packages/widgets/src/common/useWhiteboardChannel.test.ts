import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import {
  useWhiteboardChannel,
  TUTOR_FUNCTION_NAME,
  type WhiteboardChannelLike,
  type WhiteboardSupabaseLike,
} from './useWhiteboardChannel';
import { buildLadderAction, type AiTutorAction, type LectureConcept } from './WhiteboardProtocol';

const concept: LectureConcept = {
  id: 'rr:test',
  courseId: 'medchem',
  lectureSlug: 'test',
  sortOrder: 1,
  sourceDeck: 'deck.pdf',
  slideNumbers: [2],
  conceptTitle: 'Test',
  scientificSummary: 'Özet',
  recommendedWidget: 'MultipleChoice',
  widget: {
    type: 'MultipleChoice',
    config: { options: [{ id: 'correct', isCorrect: true }, { id: 'WRONG', isCorrect: false }] },
  },
  studentTask: 'Görev',
  scaffoldingLadder: ['bir', 'iki', 'üç'],
  misconceptionMap: { WRONG: { diagnosis: 'yanlış', slides: [2] } },
  status: 'draft',
};
const sampleAction = (): AiTutorAction =>
  buildLadderAction({ concept, isCorrect: false, attemptCount: 1, pickedOptionIds: ['WRONG'], misconceptionKeys: ['WRONG'] });

interface Harness {
  supabase: WhiteboardSupabaseLike;
  channel: { on: ReturnType<typeof vi.fn>; subscribe: ReturnType<typeof vi.fn> };
  invoke: ReturnType<typeof vi.fn>;
  removeChannel: ReturnType<typeof vi.fn>;
  channelFactory: ReturnType<typeof vi.fn>;
  emitBroadcast: (payload: unknown) => void;
  emitStatus: (s: string) => void;
}

function harness(invokeImpl?: () => Promise<{ data: unknown; error: { message?: string } | null }>): Harness {
  let broadcastCb: (m: { payload?: unknown }) => void = () => {};
  let statusCb: (s: string) => void = () => {};
  const channel = {
    on: vi.fn((_t: string, _f: unknown, cb: (m: { payload?: unknown }) => void) => {
      broadcastCb = cb;
      return channel as unknown as WhiteboardChannelLike;
    }),
    subscribe: vi.fn((cb?: (s: string) => void) => {
      if (cb) statusCb = cb;
    }),
  };
  const invoke = vi.fn(invokeImpl ?? (async () => ({ data: { action: sampleAction() }, error: null })));
  const removeChannel = vi.fn();
  const channelFactory = vi.fn(() => channel as unknown as WhiteboardChannelLike);
  return {
    supabase: { channel: channelFactory, removeChannel, functions: { invoke } } as unknown as WhiteboardSupabaseLike,
    channel, invoke, removeChannel, channelFactory,
    emitBroadcast: (p) => broadcastCb({ payload: p }),
    emitStatus: (s) => statusCb(s),
  };
}

const input = {
  conceptId: 'rr:test',
  widgetType: 'MultipleChoice',
  action: 'OPTION_SELECTED' as const,
  payload: { selectedOptionIds: ['WRONG'] },
  hesitationTimeMs: 100,
  attemptCount: 1,
};

describe('useWhiteboardChannel', () => {
  beforeEach(() => vi.useRealTimers());
  afterEach(() => vi.useRealTimers());

  it('opens exactly ONE private channel per session (not one per message) and cleans it up', async () => {
    const h = harness();
    const onTutorAction = vi.fn();
    const { result, unmount, rerender } = renderHook(
      (p: { n: number }) =>
        useWhiteboardChannel({ supabase: h.supabase, userId: 'u1', sessionId: 'session-12345', onTutorAction: () => onTutorAction(p.n) }),
      { initialProps: { n: 1 } }
    );
    await act(async () => { await result.current.sendInteraction(input); });
    await act(async () => { await result.current.sendInteraction({ ...input, attemptCount: 2 }); });
    rerender({ n: 2 }); // new callback identity must not resubscribe
    expect(h.channelFactory).toHaveBeenCalledTimes(1);
    expect(h.channelFactory).toHaveBeenCalledWith('whiteboard:u1:session-12345', { config: { private: true, broadcast: { self: false } } });
    unmount();
    expect(h.removeChannel).toHaveBeenCalledTimes(1);
  });

  it('invokes the edge function with a validated event and delivers the parsed action', async () => {
    const h = harness();
    const onTutorAction = vi.fn();
    const { result } = renderHook(() =>
      useWhiteboardChannel({ supabase: h.supabase, userId: 'u1', sessionId: 'session-12345', onTutorAction })
    );
    let action: AiTutorAction | null = null;
    await act(async () => { action = await result.current.sendInteraction(input); });
    expect(action).not.toBeNull();
    expect(onTutorAction).toHaveBeenCalledTimes(1);
    const [name, opts] = h.invoke.mock.calls[0]!;
    expect(name).toBe(TUTOR_FUNCTION_NAME);
    expect((opts as { body: Record<string, unknown> }).body).toMatchObject({
      type: 'student_interaction', sessionId: 'session-12345', conceptId: 'rr:test', action: 'OPTION_SELECTED',
    });
  });

  it('refuses to send a malformed event (bad session id) instead of hitting the network', async () => {
    const h = harness();
    const { result } = renderHook(() =>
      useWhiteboardChannel({ supabase: h.supabase, userId: 'u1', sessionId: '../etc', onTutorAction: vi.fn() })
    );
    await expect(result.current.sendInteraction(input)).rejects.toThrow();
    expect(h.invoke).not.toHaveBeenCalled();
  });

  it('uses the offline fallback when the function errors, returns garbage, or times out', async () => {
    for (const impl of [
      async () => ({ data: null, error: { message: 'FunctionsHttpError' } }),
      async () => ({ data: { action: { nope: true } }, error: null }),
      () => new Promise<never>(() => {}), // never resolves
    ]) {
      const h = harness(impl);
      const onTutorAction = vi.fn();
      const fallback = vi.fn(async () => sampleAction());
      const { result } = renderHook(() =>
        useWhiteboardChannel({ supabase: h.supabase, userId: 'u1', sessionId: 'session-12345', onTutorAction, fallback, timeoutMs: 30 })
      );
      await act(async () => { await result.current.sendInteraction(input); });
      expect(fallback).toHaveBeenCalledTimes(1);
      expect(onTutorAction).toHaveBeenCalledTimes(1);
    }
  });

  it('returns null (no throw) when the function fails and there is no fallback', async () => {
    const h = harness(async () => ({ data: null, error: { message: 'x' } }));
    const { result } = renderHook(() =>
      useWhiteboardChannel({ supabase: h.supabase, userId: 'u1', sessionId: 'session-12345', onTutorAction: vi.fn() })
    );
    let out: AiTutorAction | null = sampleAction();
    await act(async () => { out = await result.current.sendInteraction(input); });
    expect(out).toBeNull();
  });

  it('applies a broadcast action once, ignores invalid broadcasts, and de-duplicates response + broadcast', async () => {
    const h = harness();
    const onTutorAction = vi.fn();
    const { result } = renderHook(() =>
      useWhiteboardChannel({ supabase: h.supabase, userId: 'u1', sessionId: 'session-12345', onTutorAction })
    );
    act(() => h.emitBroadcast({ junk: 1 }));
    expect(onTutorAction).not.toHaveBeenCalled();
    act(() => h.emitBroadcast(sampleAction()));
    expect(onTutorAction).toHaveBeenCalledTimes(1);
    await act(async () => { await result.current.sendInteraction(input); }); // identical action via HTTP
    expect(onTutorAction).toHaveBeenCalledTimes(1);
  });

  it('tracks connection status', async () => {
    const h = harness();
    const { result } = renderHook(() =>
      useWhiteboardChannel({ supabase: h.supabase, userId: 'u1', sessionId: 'session-12345', onTutorAction: vi.fn() })
    );
    expect(result.current.connection).toBe('connecting');
    act(() => h.emitStatus('SUBSCRIBED'));
    await waitFor(() => expect(result.current.connection).toBe('connected'));
    act(() => h.emitStatus('CLOSED'));
    await waitFor(() => expect(result.current.connection).toBe('offline'));
  });
});
