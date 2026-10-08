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
    activeBg: 'bg-emerald-600 text-white border-emerald-600 shadow-xs',
    badgeText: '✓',
  },
  medium: {
    key: 'medium',
    activeBg: 'bg-amber-500 text-white border-amber-500 shadow-xs',
    badgeText: '½',
  },
  guessing: {
    key: 'guessing',
    activeBg: 'bg-rose-500 text-white border-rose-500 shadow-xs',
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
          'p-3.5 border border-slate-200 dark:border-[#2F2F2F] bg-white dark:bg-[#1E1E1E] rounded-2xl',
          'shadow-xs transition-all duration-150 select-none',
          className
        )
      )}
    >
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-sans text-xs uppercase tracking-wider font-semibold text-slate-700 dark:text-slate-300">
          {t.prompt}
        </span>
        {value && (
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-[#2A2A2A] text-slate-700 dark:text-slate-300">
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
                  'relative flex items-center justify-center font-sans font-medium transition-all duration-150 rounded-xl',
                  'border outline-none',
                  size === 'sm' ? 'py-1 px-2 text-xs' : 'py-2 px-3 text-xs md:text-sm',
                  isSelected
                    ? `${conf.activeBg} scale-[1.02]`
                    : 'border-slate-200 dark:border-[#2F2F2F] bg-slate-50 dark:bg-[#262626] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#2F2F2F]',
                  disabled && 'opacity-50 cursor-not-allowed hover:bg-inherit shadow-none'
                )
              )}
            >
              <span className="mr-1.5 text-xs font-mono font-bold opacity-80">
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
