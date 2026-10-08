import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type CardVariant =
  | 'default'
  | 'highlight'
  | 'success'
  | 'misconception'
  | 'medchem'
  | 'pharm'
  | 'muted';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  interactive?: boolean;
  elevated?: boolean;
  noPadding?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white dark:bg-[#171717] text-slate-900 dark:text-[#ECECEC] border-slate-200 dark:border-[#2F2F2F]',
  highlight: 'bg-amber-50/70 dark:bg-amber-950/30 text-amber-950 dark:text-amber-200 border-amber-200 dark:border-amber-800/60',
  success: 'bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800/60',
  misconception: 'bg-rose-50/70 dark:bg-rose-950/30 text-rose-950 dark:text-rose-200 border-rose-200 dark:border-rose-800/60',
  medchem: 'bg-blue-50/70 dark:bg-blue-950/30 text-blue-950 dark:text-blue-200 border-blue-200 dark:border-blue-800/60',
  pharm: 'bg-orange-50/70 dark:bg-orange-950/30 text-orange-950 dark:text-orange-200 border-orange-200 dark:border-orange-800/60',
  muted: 'bg-slate-50 dark:bg-[#212121] text-slate-700 dark:text-[#CCCCCC] border-slate-200 dark:border-[#2F2F2F]',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className,
      variant = 'default',
      interactive = false,
      elevated = false,
      noPadding = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'border rounded-2xl transition-all duration-200',
            elevated ? 'shadow-md dark:shadow-black/40' : 'shadow-xs',
            interactive && 'cursor-pointer hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm active:scale-[0.99]',
            !noPadding && 'p-4 sm:p-6',
            variantStyles[variant],
            className
          )
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
