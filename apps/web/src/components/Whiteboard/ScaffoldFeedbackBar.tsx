import React from 'react';
import type { ScaffoldLevel } from '@pharmacy/widgets';
import type { WbStrings } from '../../lib/whiteboardStrings';

const ORDER: Exclude<ScaffoldLevel, 'mastery'>[] = ['nudge', 'clue', 'remediation'];

const ACTIVE_COLOUR: Record<ScaffoldLevel, string> = {
  nudge: 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700/50',
  clue: 'bg-amber-200/80 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200 border-amber-400 dark:border-amber-600/60',
  remediation: 'bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-700/50',
  mastery: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700/50',
};

export interface ScaffoldFeedbackBarProps {
  level: ScaffoldLevel | null;
  text: WbStrings;
}

/**
 * Three-segment ladder indicator (Nudge -> Clue -> Solution). Colour is never the only signal:
 * every segment carries its text label. Only opacity/colour change, so there is no layout shift.
 */
export const ScaffoldFeedbackBar: React.FC<ScaffoldFeedbackBarProps> = ({ level, text }) => {
  const labels: Record<(typeof ORDER)[number], string> = {
    nudge: text.levelNudge,
    clue: text.levelClue,
    remediation: text.levelRemediation,
  };
  const reached = level === null ? -1 : level === 'mastery' ? ORDER.length : ORDER.indexOf(level);

  return (
    <div className="grid grid-cols-3 gap-2" role="img" aria-label={level === 'mastery' ? text.levelMastery : level ? labels[level] : text.tutorIdle}>
      {ORDER.map((step, i) => {
        const on = i <= reached && level !== null;
        const colour = level === 'mastery' ? ACTIVE_COLOUR.mastery : ACTIVE_COLOUR[step];
        return (
          <div
            key={step}
            className={`border rounded-lg px-2 py-1 text-center font-mono text-[11px] font-semibold tracking-wide transition-opacity duration-200 ease-out ${
              on ? `${colour} opacity-100 shadow-xs` : 'bg-slate-100 dark:bg-[#212121] border-slate-200 dark:border-[#2F2F2F] text-slate-400 dark:text-slate-500 opacity-60'
            }`}
          >
            {labels[step]}
          </div>
        );
      })}
    </div>
  );
};
