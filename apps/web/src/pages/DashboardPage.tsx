import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, StickerBadge } from '@pharmacy/ui';
import { MASTERY_THRESHOLD, readinessPercent } from '@pharmacy/widgets';
import { useTranslation } from '../context/TranslationContext';
import { buildDailySession, daysUntilExam, getAllConcepts, getLectures } from '../lib/whiteboardSession';
import { useMastery, useRealSession } from '../lib/useWhiteboardSession';
import { wbText } from '../lib/whiteboardStrings';

/** Arc starts at 12 o'clock and runs clockwise (path, not a CSS rotation, so reduced-motion CSS cannot flip it). */
const ARC = 'M60 16 a44 44 0 1 1 0 88 a44 44 0 1 1 0 -88';

const ReadinessGauge: React.FC<{ percent: number; label: string }> = ({ percent, label }) => (
  <div className="relative h-36 w-36 shrink-0" role="img" aria-label={`${label}: ${percent}%`}>
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
      <circle cx="60" cy="60" r="56" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
      <path d={ARC} fill="none" stroke="#E5E7EB" strokeWidth="12" />
      {percent > 0 ? (
        <path d={ARC} fill="none" stroke="#6BCB77" strokeWidth="12" pathLength={100} strokeDasharray={`${percent} 100`} />
      ) : null}
    </svg>
    <span className="absolute inset-0 flex items-center justify-center font-display text-3xl font-black">{percent}%</span>
  </div>
);

export const DashboardPage: React.FC = () => {
  const { locale } = useTranslation();
  const text = wbText(locale);
  const { userId } = useRealSession();
  const { mastery } = useMastery(userId);

  const lectures = useMemo(() => getLectures(), []);
  const concepts = useMemo(() => getAllConcepts().filter((c) => c.widget !== null), []);
  const readiness = readinessPercent(
    concepts.map((c) => mastery[c.id] ?? 0),
    concepts.length
  );
  const daily = buildDailySession(lectures, mastery);
  const weakest = [...concepts].sort((a, b) => (mastery[a.id] ?? 0) - (mastery[b.id] ?? 0)).slice(0, 3);
  const days = daysUntilExam(import.meta.env['VITE_MEDCHEM_EXAM_DATE'] as string | undefined);

  const countdown =
    days === null ? text.examUnset : days > 0 ? text.daysLeft(days) : days === 0 ? text.examToday : text.examPassed;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="font-display text-2xl font-black uppercase tracking-tight sm:text-3xl">{text.dashTitle}</h1>
        <StickerBadge variant="blue">{text.pilotBadge}</StickerBadge>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex items-center gap-4 border-4 shadow-[6px_6px_0_0_#000000]">
          <ReadinessGauge percent={readiness} label={text.readiness} />
          <div className="flex min-w-0 flex-col gap-1">
            <span className="font-mono text-xs font-bold uppercase">{text.examCountdown}</span>
            <span className="font-display text-xl font-black" data-testid="exam-countdown">
              {countdown}
            </span>
            <span className="text-sm text-gray-700">{text.readinessHint}</span>
          </div>
        </Card>

        <Card variant="highlight" className="flex flex-col gap-3 border-4 shadow-[6px_6px_0_0_#000000]">
          <h2 className="font-display text-xl font-black uppercase">{text.daily10}</h2>
          <p className="text-sm font-semibold">{daily.length > 0 ? text.daily10Desc : text.daily10Empty}</p>
          {daily.length > 0 ? (
            <Link to="/tutor/daily" className="inline-flex">
              <Button variant="secondary">{text.daily10Start}</Button>
            </Link>
          ) : null}
        </Card>
      </div>

      <Card className="flex flex-col gap-3 border-4 shadow-[6px_6px_0_0_#000000]">
        <h2 className="font-display text-lg font-black uppercase">{text.weakest}</h2>
        <ul className="flex flex-col gap-2">
          {weakest.map((c) => {
            const m = mastery[c.id];
            return (
              <li key={c.id} className="flex items-center justify-between gap-2 border-3 border-black bg-white p-2 text-sm">
                <span>{c.conceptTitle}</span>
                <StickerBadge variant={m === undefined ? 'outline' : m >= MASTERY_THRESHOLD ? 'green' : 'pink'} size="sm">
                  {m === undefined ? text.notStarted : text.masteryPct(Math.round(m * 100))}
                </StickerBadge>
              </li>
            );
          })}
        </ul>
      </Card>

      <section aria-label={text.catalog} className="flex flex-col gap-3">
        <h2 className="font-display text-lg font-black uppercase">{text.catalog}</h2>
        {lectures.map((l) => (
          <Card key={l.slug} variant="medchem" className="flex flex-wrap items-center justify-between gap-3 border-4 shadow-[6px_6px_0_0_#000000]">
            <div className="flex min-w-0 flex-col gap-1">
              <span className="font-display text-lg font-black">{l.deck.replace(/\.pdf$/i, '')}</span>
              <span className="font-mono text-xs">{text.conceptsCount(l.concepts.length)}</span>
            </div>
            <Link to={`/tutor/${l.slug}`} className="inline-flex">
              <Button variant="medchem">{text.open}</Button>
            </Link>
          </Card>
        ))}
      </section>
    </div>
  );
};
