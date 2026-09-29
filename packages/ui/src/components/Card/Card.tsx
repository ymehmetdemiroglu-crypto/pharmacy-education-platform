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
  default: 'bg-white dark:bg-[#131B2A] text-black dark:text-slate-100',
  highlight: 'bg-[#FFD93D] dark:bg-[#2A2008] text-black dark:text-amber-200 border-black dark:border-amber-600',
  success: 'bg-[#EBFBEE] dark:bg-[#072518] text-black dark:text-emerald-200 border-[#6BCB77] dark:border-emerald-600',
  misconception: 'bg-[#FFF0F5] dark:bg-[#2A0E18] text-black dark:text-rose-200 border-[#FF6B9D] dark:border-rose-600',
  medchem: 'bg-[#EBF4FF] dark:bg-[#0D2038] text-black dark:text-blue-200 border-[#4D96FF] dark:border-blue-600',
  pharm: 'bg-[#FFF5EB] dark:bg-[#2E1A0E] text-black dark:text-orange-200 border-[#FF9F45] dark:border-orange-600',
  muted: 'bg-[#F3F4F6] dark:bg-[#1E293B] text-black dark:text-slate-300',
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
            'border-3 border-black dark:border-slate-700 rounded-none',
            'transition-all duration-150 ease-neo',
            elevated ? 'shadow-neo-lg dark:shadow-neo-dark-lg' : 'shadow-neo dark:shadow-neo-dark',
            interactive && 'cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo-lg dark:hover:shadow-neo-dark-lg active:translate-x-1 active:translate-y-1 active:shadow-none',
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
