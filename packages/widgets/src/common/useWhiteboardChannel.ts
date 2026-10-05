import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AiTutorActionSchema,
  StudentInteractionEventSchema,
  type AiTutorAction,
  type StudentInteractionEvent,
} from './WhiteboardProtocol';

/** Structural subset of SupabaseClient used here, so this package needs no Supabase dependency. */
export interface WhiteboardChannelLike {
  on(
    type: 'broadcast',
    filter: { event: string },
    callback: (message: { payload?: unknown }) => void
  ): WhiteboardChannelLike;
  subscribe(callback?: (status: string) => void): unknown;
}

export interface WhiteboardSupabaseLike {
  channel(topic: string, opts?: Record<string, unknown>): WhiteboardChannelLike;
  removeChannel(channel: WhiteboardChannelLike): unknown;
  functions: {
    invoke(
      name: string,
      opts: { body: unknown }
    ): Promise<{ data: unknown; error: { message?: string } | null }>;
  };
}

export type WhiteboardConnection = 'connecting' | 'connected' | 'offline';

export type InteractionInput = Omit<StudentInteractionEvent, 'type' | 'sessionId' | 'timestamp'>;

export interface UseWhiteboardChannelOptions {
  supabase: WhiteboardSupabaseLike;
  /** auth.uid(); the private channel topic is whiteboard:<userId>:<sessionId> (enforced by RLS). */
  userId: string;
  sessionId: string;
  onTutorAction: (action: AiTutorAction) => void;
  /**
   * Used when the Edge Function is unreachable / not deployed / returns something invalid.
   * Typically the same deterministic engine the server uses, run locally.
   */
  fallback?: (event: StudentInteractionEvent) => AiTutorAction | Promise<AiTutorAction>;
  /** ms before an Edge Function call is abandoned (default 10s). */
  timeoutMs?: number;
}

export const TUTOR_FUNCTION_NAME = 'whiteboard-tutor';

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('tutor_timeout')), ms);
    promise.then(
      (v) => {
        clearTimeout(timer);
        resolve(v);
      },
      (e) => {
        clearTimeout(timer);
        reject(e);
      }
    );
  });
}

/**
 * Whiteboard state stream.
 *  - student -> tutor: validated event sent to the `whiteboard-tutor` Edge Function (authenticated, rate limited)
 *  - tutor -> student: the function's response, plus an optional server push on the private Broadcast channel
 * One channel per hook instance (the previous design opened a new one per message).
 */
export function useWhiteboardChannel(options: UseWhiteboardChannelOptions) {
  const { supabase, userId, sessionId, timeoutMs = 10_000 } = options;
  const [connection, setConnection] = useState<WhiteboardConnection>('connecting');
  const [pending, setPending] = useState(false);

  // Keep latest callbacks in refs so identity changes never tear down the channel.
  const onActionRef = useRef(options.onTutorAction);
  const fallbackRef = useRef(options.fallback);
  onActionRef.current = options.onTutorAction;
  fallbackRef.current = options.fallback;
  const lastKeyRef = useRef<{ key: string; at: number } | null>(null);

  const deliver = useCallback((action: AiTutorAction) => {
    const key = JSON.stringify(action);
    const last = lastKeyRef.current;
    const now = Date.now();
    if (last && last.key === key && now - last.at < 3000) return; // same action via response + broadcast
    lastKeyRef.current = { key, at: now };
    onActionRef.current(action);
  }, []);

  useEffect(() => {
    setConnection('connecting');
    let channel: WhiteboardChannelLike | null = null;
    try {
      channel = supabase.channel(`whiteboard:${userId}:${sessionId}`, {
        config: { private: true, broadcast: { self: false } },
      });
      channel
        .on('broadcast', { event: 'ai_tutor_action' }, ({ payload }) => {
          const parsed = AiTutorActionSchema.safeParse(payload);
          if (parsed.success) deliver(parsed.data);
        })
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') setConnection('connected');
          else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
            setConnection('offline');
          }
        });
    } catch {
      setConnection('offline');
    }
    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [supabase, userId, sessionId, deliver]);

  const sendInteraction = useCallback(
    async (input: InteractionInput): Promise<AiTutorAction | null> => {
      const event = StudentInteractionEventSchema.parse({
        ...input,
        type: 'student_interaction',
        sessionId,
        timestamp: Date.now(),
      });
      setPending(true);
      try {
        try {
          const { data, error } = await withTimeout(
            supabase.functions.invoke(TUTOR_FUNCTION_NAME, { body: event }),
            timeoutMs
          );
          if (error) throw new Error(error.message ?? 'tutor_error');
          const action = AiTutorActionSchema.parse((data as { action?: unknown } | null)?.action);
          deliver(action);
          return action;
        } catch {
          const fb = fallbackRef.current;
          if (!fb) return null;
          const action = AiTutorActionSchema.parse(await fb(event));
          deliver(action);
          return action;
        }
      } finally {
        setPending(false);
      }
    },
    [supabase, sessionId, timeoutMs, deliver]
  );

  return { sendInteraction, connection, pending };
}
