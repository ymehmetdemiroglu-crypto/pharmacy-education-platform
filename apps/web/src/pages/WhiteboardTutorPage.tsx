import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, StickerBadge } from '@pharmacy/ui';
import { supabase } from '@pharmacy/platform';
import {
  MASTERY_THRESHOLD,
  MultipleChoice,
  PredictThenReveal,
  useWhiteboardChannel,
  type AiTutorAction,
  type LectureConcept,
  type WhiteboardSupabaseLike,
} from '@pharmacy/widgets';
import { useTranslation } from '../context/TranslationContext';
import { TutorChatOverlay } from '../components/Whiteboard/TutorChatOverlay';
import {
  buildDailySession,
  getAllConcepts,
  getLectures,
  localTutorFallback,
  newSessionId,
  offlineSupabase,
} from '../lib/whiteboardSession';
import { useMastery, useRealSession } from '../lib/useWhiteboardSession';
import { wbText, type WbStrings } from '../lib/whiteboardStrings';

interface OptionLike {
  id: string;
  isCorrect: boolean;
  text?: string;
  label?: string;
}

function optionsOf(concept: LectureConcept): OptionLike[] {
  const raw = concept.widget?.config['options'];
  return Array.isArray(raw) ? (raw as OptionLike[]) : [];
}

/** The tutor can hide a distractor, but never the correct option and never below 2 choices. */
function configWithout(concept: LectureConcept, eliminated: string[]): Record<string, unknown> {
  const config = concept.widget?.config ?? {};
  const kept = optionsOf(concept).filter((o) => o.isCorrect || !eliminated.includes(o.id));
  return kept.length >= 2 ? { ...config, options: kept } : config;
}

interface RunnerProps {
  concepts: LectureConcept[];
  title: string;
  userId: string | null;
  text: WbStrings;
  widgetLocale: 'tr' | 'en';
}

const LectureRunner: React.FC<RunnerProps> = ({ concepts, title, userId, text, widgetLocale }) => {
  const [index, setIndex] = useState(0);
  const [widgetKey, setWidgetKey] = useState(0);
  const [action, setAction] = useState<AiTutorAction | null>(null);
  const [eliminated, setEliminated] = useState<string[]>([]);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [complete, setComplete] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);
  const [finished, setFinished] = useState(false);
  const sessionId = useMemo(() => newSessionId(), []);
  const { mastery, addDelta } = useMastery(userId);

  const concept = concepts[index] as LectureConcept;
  const failures = useRef(0);
  const selected = useRef<string[]>([]);
  const shownAt = useRef(Date.now());
  const fromHint = useRef(false);
  const conceptRef = useRef(concept);
  conceptRef.current = concept;

  const client = (userId ? supabase : offlineSupabase) as unknown as WhiteboardSupabaseLike;
  const fallback = useMemo(() => localTutorFallback(concept), [concept]);

  const onTutorAction = useCallback(
    (a: AiTutorAction) => {
      if (a.conceptId !== conceptRef.current.id) return; // late reply for a concept we already left
      setAction(a);
      addDelta(a.conceptId, a.masteryDelta);
      for (const cmd of a.whiteboardCommands) {
        if (cmd.command === 'ELIMINATE_OPTION' && cmd.target) {
          const target = cmd.target;
          setEliminated((prev) => (prev.includes(target) ? prev : [...prev, target]));
          if (!fromHint.current) setWidgetKey((k) => k + 1);
        } else if (cmd.command === 'RESET_SELECTION' && !fromHint.current && !a.isComplete) {
          setWidgetKey((k) => k + 1);
        } else if (cmd.command === 'HIGHLIGHT_OPTION' && cmd.target) {
          setHighlightId(cmd.target);
        }
        // HIGHLIGHT_ATOM / PULSE_SUBSTRUCTURE: no atom-level widget in this lecture; SHOW_SLIDE_CITATION: always visible
      }
      if (a.isComplete) setComplete(true);
    },
    [addDelta]
  );

  const { sendInteraction, connection, pending } = useWhiteboardChannel({
    supabase: client,
    userId: userId ?? 'guest',
    sessionId,
    onTutorAction,
    fallback: (event) => {
      setUsedFallback(true);
      return fallback(event);
    },
  });

  // New concept => clean board.
  useEffect(() => {
    failures.current = 0;
    selected.current = [];
    shownAt.current = Date.now();
    fromHint.current = false;
    setAction(null);
    setEliminated([]);
    setHighlightId(null);
    setComplete(false);
    setWidgetKey((k) => k + 1);
  }, [concept.id]);

  const send = useCallback(
    async (kind: 'OPTION_SELECTED' | 'HINT_REQUESTED', correct: boolean) => {
      const c = conceptRef.current;
      fromHint.current = kind === 'HINT_REQUESTED';
      if (kind === 'HINT_REQUESTED' || !correct) failures.current += 1;
      try {
        await sendInteraction({
          conceptId: c.id,
          widgetType: c.widget?.type ?? 'MultipleChoice',
          action: kind,
          payload: kind === 'OPTION_SELECTED' ? { selectedOptionIds: selected.current } : {},
          hesitationTimeMs: Math.min(3_600_000, Math.max(0, Date.now() - shownAt.current)),
          attemptCount: Math.min(50, failures.current),
        });
      } catch {
        // schema rejection of our own event would be a programming error; keep the board usable
      }
      shownAt.current = Date.now();
    },
    [sendInteraction]
  );

  const widgetCommon = {
    locale: widgetLocale,
    disabled: pending || complete,
    onCorrect: () => void send('OPTION_SELECTED', true),
    onIncorrect: () => void send('OPTION_SELECTED', false),
  };

  const config = configWithout(concept, eliminated);
  const highlighted = highlightId ? optionsOf(concept).find((o) => o.id === highlightId) : undefined;
  const highlightedText = highlighted ? (highlighted.text ?? highlighted.label ?? null) : null;
  const isDraft = concept.status === 'draft';

  if (finished) {
    const sources = new Map<string, Set<number>>();
    for (const c of concepts) {
      const set = sources.get(c.sourceDeck) ?? new Set<number>();
      c.slideNumbers.forEach((n) => set.add(n));
      sources.set(c.sourceDeck, set);
    }
    return (
      <Card className="mx-auto flex max-w-2xl flex-col gap-4" data-testid="lecture-summary">
        <h1 className="font-display text-2xl font-black uppercase">{text.summaryTitle}</h1>
        <p className="font-semibold">{title}</p>
        <section aria-label={text.summaryMastery} className="flex flex-col gap-2">
          <h2 className="font-mono text-sm font-bold uppercase">{text.summaryMastery}</h2>
          <ul className="flex flex-col gap-2">
            {concepts.map((c) => {
              const pct = Math.round((mastery[c.id] ?? 0) * 100);
              return (
                <li key={c.id} className="flex items-center justify-between gap-2 border border-slate-200 dark:border-[#2F2F2F] bg-white dark:bg-[#1E1E1E] p-3 rounded-xl text-sm">
                  <span>{c.conceptTitle}</span>
                  <StickerBadge variant={(mastery[c.id] ?? 0) >= MASTERY_THRESHOLD ? 'green' : 'pink'} size="sm">
                    {text.masteryPct(pct)}
                  </StickerBadge>
                </li>
              );
            })}
          </ul>
        </section>
        <section aria-label={text.summarySources} className="flex flex-col gap-1">
          <h2 className="font-mono text-sm font-bold uppercase">{text.summarySources}</h2>
          <ul className="font-mono text-xs">
            {[...sources.entries()].map(([deck, slides]) => (
              <li key={deck}>
                {deck} · {text.slide} {[...slides].sort((a, b) => a - b).join(', ')}
              </li>
            ))}
          </ul>
        </section>
        <Link to="/dashboard" className="inline-flex">
          <Button variant="primary">{text.backToDashboard}</Button>
        </Link>
      </Card>
    );
  }

  const last = index === concepts.length - 1;

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]">
      <section aria-label={concept.conceptTitle} className="flex min-w-0 flex-col gap-4">
        <header className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold uppercase text-gray-700">
              {title} · {text.concept} {index + 1} {text.of} {concepts.length}
            </span>
            <h1 className="font-display text-xl font-black uppercase tracking-tight sm:text-2xl">{concept.conceptTitle}</h1>
          </div>
          <StickerBadge variant="blue" size="sm">
            {text.slide} {concept.slideNumbers.join(', ')}
          </StickerBadge>
        </header>

        <div key={`${concept.id}-${widgetKey}`} className="touch-manipulation" data-testid="widget-host">
          {concept.widget?.type === 'PredictThenReveal' ? (
            <PredictThenReveal
              config={config as never}
              {...widgetCommon}
              onAttempt={(id: string) => {
                selected.current = [id];
              }}
            />
          ) : (
            <MultipleChoice
              config={config as never}
              {...widgetCommon}
              onAttempt={(ids: string[]) => {
                selected.current = ids;
              }}
            />
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => void send('HINT_REQUESTED', false)} disabled={pending || complete}>
            {text.askHint}
          </Button>
          {complete ? (
            <Button
              variant="success"
              onClick={() => (last ? setFinished(true) : setIndex((i) => i + 1))}
              data-testid="next-concept"
            >
              {last ? text.finish : text.next}
            </Button>
          ) : null}
        </div>
      </section>

      <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <TutorChatOverlay
          action={action}
          pending={pending}
          connection={connection}
          text={text}
          highlightedOptionText={highlightedText}
          isDraft={isDraft}
          usedFallback={usedFallback}
          guest={!userId}
        />
      </aside>
    </div>
  );
};

export const WhiteboardTutorPage: React.FC = () => {
  const { lectureSlug = '' } = useParams();
  const { locale } = useTranslation();
  const text = wbText(locale);
  const widgetLocale: 'tr' | 'en' = locale === 'en' ? 'en' : 'tr';
  const { userId, ready } = useRealSession();
  const { mastery } = useMastery(userId);

  const resolved = useMemo(() => {
    const lectures = getLectures();
    if (lectureSlug === 'daily') {
      const ids = buildDailySession(lectures, mastery);
      const byId = new Map(getAllConcepts().map((c) => [c.id, c]));
      // freeze on first resolution: mastery changes during the session must not reshuffle the queue
      return { title: text.daily10, concepts: ids.map((id) => byId.get(id)).filter((c): c is LectureConcept => !!c) };
    }
    const lecture = lectures.find((l) => l.slug === lectureSlug);
    return { title: lecture?.deck.replace(/\.pdf$/i, '') ?? '', concepts: lecture?.concepts ?? [] };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lectureSlug, ready]);

  if (!ready) {
    return <div className="mx-auto max-w-3xl p-8 font-mono text-sm">{text.loadingConcept}</div>;
  }

  if (resolved.concepts.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col gap-4 p-8">
        <Card className="rounded-2xl border border-slate-200 dark:border-[#2F2F2F] shadow-xs">
          <p className="font-semibold">{lectureSlug === 'daily' ? text.daily10Empty : text.noConcepts}</p>
        </Card>
        <Link to="/dashboard" className="inline-flex">
          <Button variant="secondary">{text.backToDashboard}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh]">
      <LectureRunner
        key={lectureSlug}
        concepts={resolved.concepts}
        title={resolved.title}
        userId={userId}
        text={text}
        widgetLocale={widgetLocale}
      />
    </div>
  );
};
