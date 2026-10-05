import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@pharmacy/platform';
import { applyMasteryDelta } from '@pharmacy/widgets';
import { loadLocalMastery, mergeMastery, saveLocalMastery, type MasteryMap } from './whiteboardSession';

/**
 * AuthContext also exposes a local *guest* user that is not a Supabase session, so the tutor must ask
 * Supabase directly: only a real session may call the Edge Function / subscribe to the private channel.
 */
export function useRealSession(): { userId: string | null; ready: boolean } {
  const [userId, setUserId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (alive) setUserId(data.session?.user.id ?? null);
      })
      .catch(() => undefined)
      .finally(() => {
        if (alive) setReady(true);
      });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (alive) setUserId(session?.user.id ?? null);
    });
    return () => {
      alive = false;
      data.subscription.unsubscribe();
    };
  }, []);

  return { userId, ready };
}

/** Local mastery (always) merged with the server copy when signed in. Server never lowers local progress. */
export function useMastery(userId: string | null) {
  const [mastery, setMastery] = useState<MasteryMap>(() => loadLocalMastery());

  useEffect(() => {
    if (!userId) return;
    let alive = true;
    void (async () => {
      try {
        const { data, error } = await supabase.from('student_concept_mastery').select('concept_id, mastery_score');
        if (error || !Array.isArray(data) || !alive) return;
        const server: MasteryMap = {};
        for (const row of data as { concept_id?: unknown; mastery_score?: unknown }[]) {
          if (typeof row.concept_id === 'string' && typeof row.mastery_score === 'number') {
            server[row.concept_id] = row.mastery_score;
          }
        }
        setMastery((local) => {
          const merged = mergeMastery(local, server);
          saveLocalMastery(merged);
          return merged;
        });
      } catch {
        // table missing (migration not applied yet) or offline: keep local progress
      }
    })();
    return () => {
      alive = false;
    };
  }, [userId]);

  const addDelta = useCallback((conceptId: string, delta: number) => {
    setMastery((prev) => {
      const next = { ...prev, [conceptId]: applyMasteryDelta(prev[conceptId] ?? 0, delta) };
      saveLocalMastery(next);
      return next;
    });
  }, []);

  return { mastery, addDelta };
}
