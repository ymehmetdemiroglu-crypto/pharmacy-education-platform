import React, { useState, useRef, useContext, useEffect } from 'react';
import { clsx } from 'clsx';
import { Lightbulb, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../Button/Button';
import { ThemeContext } from '../../theme/ThemeProvider';

export interface HintDrawerProps {
  hints: string[]; // max 3 hints: [Tier 1, Tier 2, Tier 3]
  isPremiumOrTrial?: boolean | undefined;
  onUpgradeClick?: (() => void) | undefined;
  className?: string | undefined;
}

export const HintDrawer: React.FC<HintDrawerProps> = ({
  hints,
  isPremiumOrTrial = false,
  onUpgradeClick,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unlockedTier, setUnlockedTier] = useState<number>(0); // 0 = none, 1, 2, 3
  const containerRef = useRef<HTMLDivElement>(null);
  const themeCtx = useContext(ThemeContext);
  const locale = themeCtx?.locale || 'en';

  useEffect(() => {
    if (isOpen && containerRef.current && typeof containerRef.current.scrollIntoView === 'function') {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isOpen, unlockedTier]);

  const handleNextHint = () => {
    if (!isOpen) {
      setIsOpen(true);
      setUnlockedTier(1);
      return;
    }

    if (unlockedTier === 1 && !isPremiumOrTrial) {
      // Locked behind premium
      if (onUpgradeClick) onUpgradeClick();
      return;
    }

    if (unlockedTier < hints.length) {
      setUnlockedTier((prev) => prev + 1);
    }
  };

  const getTierLabel = (tierIndex: number) => {
    if (locale === 'tr') {
      switch (tierIndex) {
        case 0:
          return '1. Aşama: Yönlendirici İpucu';
        case 1:
          return '2. Aşama: Yapısal İpucu';
        case 2:
          return '3. Aşama: Tam Çözüm Adımı';
        default:
          return `İpucu ${tierIndex + 1}`;
      }
    }
    if (locale === 'ar') {
      switch (tierIndex) {
        case 0:
          return 'المستوى 1: تلميح توجيهي';
        case 1:
          return 'المستوى 2: تلميح بنيوي';
        case 2:
          return 'المستوى 3: خطوة الحل الكاملة';
        default:
          return `تلميح ${tierIndex + 1}`;
      }
    }
    switch (tierIndex) {
      case 0:
        return 'Tier 1: Guiding Nudge';
      case 1:
        return 'Tier 2: Structural Clue';
      case 2:
        return 'Tier 3: Complete Solution';
      default:
        return `Hint ${tierIndex + 1}`;
    }
  };

  const headerTitle =
    locale === 'tr'
      ? `İpucu Basamakları (${unlockedTier}/${hints.length} Açık)`
      : locale === 'ar'
      ? `سلم التلميحات (${unlockedTier}/${hints.length} متاح)`
      : `Hint Ladder (${unlockedTier}/${hints.length} Unlocked)`;

  const buttonText =
    unlockedTier === 0
      ? locale === 'tr'
        ? 'İpucu Lazım mı?'
        : locale === 'ar'
        ? 'هل تحتاج تلميحاً؟'
        : 'Need a Hint?'
      : locale === 'tr'
      ? 'Sonraki Seviye'
      : locale === 'ar'
      ? 'المستوى التالي'
      : 'Next Tier';

  return (
    <div
      ref={containerRef}
      className={clsx(
        'w-full bg-[#FFFDF7] dark:bg-[#1C1C1C] border-3 border-black dark:border-white rounded-none',
        'shadow-neo dark:shadow-neo-dark transition-all duration-200',
        className
      )}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between p-3 border-b-3 border-black dark:border-white bg-[#FFD93D] text-black">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 stroke-[2.5]" />
          <span className="font-display font-black text-xs sm:text-sm uppercase tracking-tight">
            {headerTitle}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {unlockedTier < hints.length && (
            <Button
              size="sm"
              variant="secondary"
              onClick={handleNextHint}
              className="!border-black !text-black !bg-white hover:!bg-gray-100 !shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5"
              leftIcon={
                unlockedTier >= 1 && !isPremiumOrTrial ? (
                  <Lock className="w-3.5 h-3.5 text-black" />
                ) : undefined
              }
            >
              {buttonText}
            </Button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Collapse hints' : 'Expand hints'}
            className="p-1 border-2 border-black hover:bg-black/10 active:translate-y-0.5"
          >
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Body content */}
      {isOpen && (
        <div className="p-4 space-y-3">
          {hints.map((hint, idx) => {
            const isRevealed = idx < unlockedTier;
            const isLockedPremium = idx >= 1 && !isPremiumOrTrial;

            return (
              <div
                key={idx}
                className={clsx(
                  'p-3 border-2 border-black dark:border-white rounded-none transition-all duration-150',
                  isRevealed
                    ? 'bg-white dark:bg-[#252525] text-black dark:text-white shadow-[2px_2px_0px_#000000]'
                    : 'bg-gray-100 dark:bg-[#181818] text-gray-400 border-dashed'
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-black dark:text-white">
                    {getTierLabel(idx)}
                  </span>
                  {!isPremiumOrTrial && idx >= 1 && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-[#FF6B9D] text-black px-1.5 py-0.5 border border-black">
                      <Lock className="w-2.5 h-2.5" /> Premium
                    </span>
                  )}
                </div>

                {isRevealed ? (
                  <p className="text-sm font-body leading-relaxed">{hint}</p>
                ) : isLockedPremium ? (
                  <div className="flex items-center justify-between text-xs py-1">
                    <span className="italic text-gray-700 dark:text-gray-300">
                      {locale === 'tr'
                        ? 'Aşama 2 ve 3 ipuçları 7 Günlük Ücretsiz Deneme veya Paket ile açılır'
                        : locale === 'ar'
                        ? 'يتم فتح التلميحين 2 و 3 عبر التجربة المجانية لمدة 7 أيام أو باقة الطالب'
                        : 'Tier 2 & 3 hints unlock with 7-Day Free Trial or Pass'}
                    </span>
                    {onUpgradeClick && (
                      <button
                        type="button"
                        onClick={onUpgradeClick}
                        className="font-bold underline text-black dark:text-white hover:text-blue-600"
                      >
                        {locale === 'tr' ? 'Ücretsiz Dene' : locale === 'ar' ? 'جرّب مجاناً' : 'Try Free'}
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-xs italic text-gray-400">Click &quot;Next Tier&quot; to reveal</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
