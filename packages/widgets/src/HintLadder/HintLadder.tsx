import React from 'react';
import { Card, HintDrawer, StickerBadge } from '@pharmacy/ui';
import { BaseWidgetProps } from '../types';
import { HintLadderConfig } from './schema';

export interface HintLadderProps extends BaseWidgetProps<HintLadderConfig, number> {
  isPremiumOrTrial?: boolean;
  onUpgradeClick?: () => void;
}

export const HintLadder: React.FC<HintLadderProps> = ({
  config,
  onHint: _onHint,
  isPremiumOrTrial = false,
  onUpgradeClick,
  className,
}) => {
  return (
    <Card variant="default" className={`w-full flex flex-col gap-3 ${className || ''}`}>
      <div className="flex items-center justify-between">
        <StickerBadge variant="yellow" size="sm">
          3-Tier Hint Ladder
        </StickerBadge>
        <span className="text-[11px] font-mono text-gray-600 dark:text-gray-400">
          Source: {config.source.file} (p. {config.source.page})
        </span>
      </div>

      <p className="font-body text-sm font-semibold text-black dark:text-slate-100">
        {config.stepPrompt}
      </p>

      <HintDrawer
        hints={config.hints}
        isPremiumOrTrial={isPremiumOrTrial}
        onUpgradeClick={onUpgradeClick}
      />
    </Card>
  );
};
