import React from 'react';
import { Card, StickerBadge } from '@pharmacy/ui';
import type { AiTutorAction, WhiteboardConnection } from '@pharmacy/widgets';
import type { WbStrings } from '../../lib/whiteboardStrings';
import { ScaffoldFeedbackBar } from './ScaffoldFeedbackBar';

export interface TutorChatOverlayProps {
  action: AiTutorAction | null;
  pending: boolean;
  connection: WhiteboardConnection;
  text: WbStrings;
  /** Text of the option the tutor highlighted on the board (remediation step). */
  highlightedOptionText: string | null;
  isDraft: boolean;
  /** Shown when the Edge Function could not be reached and the local ladder answered. */
  usedFallback: boolean;
  guest: boolean;
}

const TONE: Record<AiTutorAction['scaffoldLevel'], 'yellow' | 'pink' | 'green'> = {
  nudge: 'yellow',
  clue: 'yellow',
  remediation: 'pink',
  mastery: 'green',
};

export const TutorChatOverlay: React.FC<TutorChatOverlayProps> = ({
  action,
  pending,
  connection,
  text,
  highlightedOptionText,
  isDraft,
  usedFallback,
  guest,
}) => {
  const levelLabel = action
    ? { nudge: text.levelNudge, clue: text.levelClue, remediation: text.levelRemediation, mastery: text.levelMastery }[action.scaffoldLevel]
    : null;
  const connLabel =
    connection === 'connected' ? text.connConnected : connection === 'connecting' ? text.connConnecting : text.connOffline;

  return (
    <Card className="flex flex-col gap-4 border-4 shadow-[6px_6px_0_0_#000000]" data-testid="tutor-panel">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-lg font-black uppercase tracking-tight">{text.tutorTitle}</h2>
        <div className="flex flex-wrap items-center gap-2">
          {isDraft ? <StickerBadge variant="yellow" size="sm">{text.draftBadge}</StickerBadge> : <StickerBadge variant="green" size="sm">{text.verifiedBadge}</StickerBadge>}
          <StickerBadge variant="outline" size="sm" aria-label={`${text.connLabel}: ${connLabel}`}>
            {connLabel}
          </StickerBadge>
        </div>
      </div>

      <ScaffoldFeedbackBar level={action?.scaffoldLevel ?? null} text={text} />

      {/* aria-live so screen readers announce the tutor reply; min-h avoids layout shift between states */}
      <div className="min-h-[120px]" aria-live="polite" aria-atomic="true">
        {pending ? (
          <p className="font-mono text-sm text-gray-700">{text.tutorThinking}</p>
        ) : action ? (
          <div
            key={`${action.scaffoldLevel}-${action.tutorMessage}`}
            className="flex flex-col gap-3 motion-safe:animate-[wb-in_200ms_cubic-bezier(0.22,1,0.36,1)]"
          >
            <div className="flex flex-wrap items-center gap-2">
              <StickerBadge variant={TONE[action.scaffoldLevel]} size="sm">{levelLabel}</StickerBadge>
              <StickerBadge variant="outline" size="sm">
                {action.messageSource === 'llm' ? text.sourceLlm : text.sourceLadder}
              </StickerBadge>
            </div>
            <p className="text-base font-semibold leading-snug">{action.tutorMessage}</p>
            {highlightedOptionText ? (
              <p className="border-3 border-black bg-[#6BCB77] p-2 text-sm font-bold">
                {text.correctAnswerIs}: {highlightedOptionText}
              </p>
            ) : null}
            <p className="font-mono text-xs text-gray-700">
              {text.deck}: {action.slideCitation.deck} · {text.slide} {action.slideCitation.slideNumbers.join(', ')}
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-800">{text.tutorIdle}</p>
        )}
      </div>

      {usedFallback ? <p className="border-3 border-black bg-white p-2 text-xs font-mono">{text.offlineNote}</p> : null}
      {guest ? <p className="border-3 border-black bg-white p-2 text-xs font-mono">{text.guestNote}</p> : null}
      <p className="text-xs text-gray-600">{text.modelNotice}</p>
    </Card>
  );
};
