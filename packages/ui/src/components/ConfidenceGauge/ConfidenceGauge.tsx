import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type ConfidenceLevel = 'sure' | 'medium' | 'guessing';

export interface ConfidenceGaugeProps {
  value?: ConfidenceLevel | null;
  onChange: (level: ConfidenceLevel) => void;
  locale?: 'tr' | 'en' | 'ar';
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

const translations = {
  en: {
    prompt: 'How sure are you?',
    sure: 'Sure',
    medium: '50-50',
    guessing: 'Guessing',
  },
  tr: {
    prompt: 'Ne kadar eminsiniz?',
    sure: 'Eminim',
    medium: 'Kararsızım',
    guessing: 'Tahmin',
  },
  ar: {
    prompt: 'ما مدى ثقتك؟',
    sure: 'متأكد',
    medium: 'متردد',
    guessing: 'تخمين',
  },
};

const optionConfig: Record<
  ConfidenceLevel,
  {
    key: ConfidenceLevel;
    activeBg: string;
    badgeText: string;
  }
> = {
  sure: {
    key: 'sure',
    activeBg: 'bg-[#6BCB77] text-black border-black',
    badgeText: '✓',
  },
  medium: {
    key: 'medium',
    activeBg: 'bg-[#FFD93D] text-black border-black',
    badgeText: '½',
  },
  guessing: {
    key: 'guessing',
    activeBg: 'bg-[#FF6B9D] text-black border-black',
    badgeText: '?',
  },
};

const levels: ConfidenceLevel[] = ['sure', 'medium', 'guessing'];

export const ConfidenceGauge: React.FC<ConfidenceGaugeProps> = ({
  value = null,
  onChange,
  locale = 'en',
  disabled = false,
  className,
  size = 'md',
}) => {
  const t = translations[locale] || translations.en;
  const isRtl = locale === 'ar';

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (disabled) return;
    let nextIndex = index;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % levels.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + levels.length) % levels.length;
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      const lvl = levels[index];
      if (lvl) onChange(lvl);
      return;
    }
    if (nextIndex !== index) {
      const nextLvl = levels[nextIndex];
      if (nextLvl) onChange(nextLvl);
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label={t.prompt}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={twMerge(
        clsx(
          'p-3 border-3 border-black dark:border-slate-700 bg-white dark:bg-[#131B2A]',
          'shadow-neo dark:shadow-neo-dark transition-all duration-150 select-none',
          className
        )
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-display text-xs uppercase tracking-wider font-extrabold text-black dark:text-white">
          {t.prompt}
        </span>
        {value && (
          <span className="text-[10px] font-mono px-1.5 py-0.5 border border-black dark:border-slate-600 bg-black/5 dark:bg-white/10 font-bold uppercase">
            {t[value]}
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {levels.map((level, idx) => {
          const isSelected = value === level;
          const conf = optionConfig[level];
          const label = t[level];

          return (
            <button
              key={level}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              tabIndex={isSelected || (!value && idx === 0) ? 0 : -1}
              onClick={() => !disabled && onChange(level)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={twMerge(
                clsx(
                  'relative flex items-center justify-center font-display font-bold uppercase transition-all duration-150',
                  'border-2 border-black dark:border-slate-600 outline-none',
                  size === 'sm' ? 'py-1 px-2 text-xs' : 'py-2 px-3 text-xs md:text-sm',
                  isSelected
                    ? `${conf.activeBg} shadow-none translate-x-0.5 translate-y-0.5 ring-2 ring-black dark:ring-white`
                    : 'bg-[#FFF8E7] dark:bg-slate-800 text-black dark:text-white hover:bg-yellow-50 dark:hover:bg-slate-700 shadow-neo-sm',
                  disabled && 'opacity-50 cursor-not-allowed hover:bg-inherit shadow-none'
                )
              )}
            >
              <span className="mr-1.5 text-xs font-mono font-black opacity-75">
                {conf.badgeText}
              </span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

ConfidenceGauge.displayName = 'ConfidenceGauge';
