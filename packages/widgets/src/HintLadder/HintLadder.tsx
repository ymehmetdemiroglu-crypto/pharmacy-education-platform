import React from 'react';
import { Card, HintDrawer, StickerBadge } from '@pharmacy/ui';
import { BaseWidgetProps } from '../types';
import { HintLadderConfig } from './schema';

export interface HintLadderProps extends BaseWidgetProps<HintLadderConfig, number> {
  isPremiumOrTrial?: boolean;
  onUpgradeClick?: () => void;
}

const STRINGS = {
  tr: {
    badge: '3 Aşamalı İpucu Merdiveni',
    sourceLabel: 'Kaynak:',
    pageLabel: 's.',
  },
  en: {
    badge: '3-Tier Hint Ladder',
    sourceLabel: 'Source:',
    pageLabel: 'p.',
  },
  ar: {
    badge: 'سلم التلميحات ثلاثي المراحل',
    sourceLabel: 'المصدر:',
    pageLabel: 'ص.',
  },
};

export const HintLadder: React.FC<HintLadderProps> = ({
  config,
  onHint: _onHint,
  isPremiumOrTrial = false,
  onUpgradeClick,
  className,
  locale = 'en',
}) => {
  const isAr = locale === 'ar';
  const t = STRINGS[locale] || STRINGS.en;

  return (
    <Card
      variant="default"
      dir={isAr ? 'rtl' : 'ltr'}
      className={`w-full flex flex-col gap-3 text-start ${className || ''}`}
    >
      <div className="flex items-center justify-between">
        <StickerBadge variant="yellow" size="sm">
          {t.badge}
        </StickerBadge>
        <span className="text-[11px] font-mono text-gray-600 dark:text-gray-400">
          {t.sourceLabel} {config.source.file} ({t.pageLabel} {config.source.page})
        </span>
      </div>

      <p className="font-body text-sm font-semibold text-black dark:text-slate-100">
        {config.stepPrompt}
      </p>

      <HintDrawer
        hints={config.hints}
        isPremiumOrTrial={isPremiumOrTrial}
        onUpgradeClick={onUpgradeClick}
        locale={locale}
      />
    </Card>
  );
};
