import React from 'react';
import type { ScaffoldLevel } from '@pharmacy/widgets';
import type { WbStrings } from '../../lib/whiteboardStrings';

const ORDER: Exclude<ScaffoldLevel, 'mastery'>[] = ['nudge', 'clue', 'remediation'];

const ACTIVE_COLOUR: Record<ScaffoldLevel, string> = {
  nudge: 'bg-[#FFD93D]',
  clue: 'bg-[#FFD93D]',
  remediation: 'bg-[#FF6B9D]',
  mastery: 'bg-[#6BCB77]',
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
            className={`border-3 border-black px-2 py-1 text-center font-mono text-[11px] font-bold uppercase tracking-wide text-black transition-opacity duration-200 ease-out ${
              on ? `${colour} opacity-100` : 'bg-white opacity-60'
            }`}
          >
            {labels[step]}
          </div>
        );
      })}
    </div>
  );
};
