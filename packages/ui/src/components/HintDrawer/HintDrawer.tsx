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
  locale?: 'tr' | 'ar' | 'en' | undefined;
}

export const HintDrawer: React.FC<HintDrawerProps> = ({
  hints,
  isPremiumOrTrial = false,
  onUpgradeClick,
  className,
  locale: propLocale,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unlockedTier, setUnlockedTier] = useState<number>(0); // 0 = none, 1, 2, 3
  const containerRef = useRef<HTMLDivElement>(null);
  const themeCtx = useContext(ThemeContext);
  const locale = propLocale || themeCtx?.locale || 'en';

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

  const toggleAriaLabel = isOpen
    ? locale === 'tr'
      ? 'İpuçlarını daralt'
      : locale === 'ar'
      ? 'طي التلميحات'
      : 'Collapse hints'
    : locale === 'tr'
    ? 'İpuçlarını genişlet'
    : locale === 'ar'
    ? 'توسيع التلميحات'
    : 'Expand hints';

  return (
    <div
      ref={containerRef}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={clsx(
        'w-full bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl text-start',
        'shadow-xs transition-all duration-200 overflow-hidden',
        className
      )}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between p-3.5 border-b border-slate-100 dark:border-[#2A2A2A] bg-slate-50/80 dark:bg-[#252525]/80">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          <span className="font-sans font-semibold text-xs sm:text-sm tracking-tight text-slate-800 dark:text-slate-200">
            {headerTitle}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {unlockedTier < hints.length && (
            <Button
              size="sm"
              variant="secondary"
              onClick={handleNextHint}
              className="text-xs py-1 px-2.5 rounded-lg"
              leftIcon={
                unlockedTier >= 1 && !isPremiumOrTrial ? (
                  <Lock className="w-3 h-3 text-slate-400" />
                ) : undefined
              }
            >
              {buttonText}
            </Button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={toggleAriaLabel}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-[#333333] hover:bg-slate-100 dark:hover:bg-[#333333] text-slate-500 dark:text-slate-400 transition-colors"
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
                  'p-3.5 border rounded-xl transition-all duration-150',
                  isRevealed
                    ? 'border-slate-200 dark:border-[#2F2F2F] bg-slate-50/50 dark:bg-[#262626]/50 text-slate-800 dark:text-slate-200 shadow-xs'
                    : 'border-dashed border-slate-200 dark:border-[#2F2F2F] bg-slate-50/20 dark:bg-[#141414] text-slate-400 dark:text-slate-600'
                )}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {getTierLabel(idx)}
                  </span>
                  {!isPremiumOrTrial && idx >= 1 && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/40">
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
                        className="font-bold underline text-black dark:text-slate-100 hover:text-blue-600"
                      >
                        {locale === 'tr' ? 'Ücretsiz Dene' : locale === 'ar' ? 'جرّب مجاناً' : 'Try Free'}
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-xs italic text-gray-400">
                    {locale === 'tr'
                      ? 'Görüntülemek için "Sonraki Seviye"ye tıklayın'
                      : locale === 'ar'
                      ? 'انقر على "المستوى التالي" لكشف التلميح'
                      : 'Click "Next Tier" to reveal'}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
