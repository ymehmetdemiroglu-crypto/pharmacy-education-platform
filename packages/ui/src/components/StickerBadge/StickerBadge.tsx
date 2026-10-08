import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type BadgeVariant =
  | 'yellow'
  | 'green'
  | 'pink'
  | 'blue'
  | 'orange'
  | 'black'
  | 'outline';

export interface StickerBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

const variantStyles: Record<BadgeVariant, string> = {
  yellow: 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60',
  green: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60',
  pink: 'bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60',
  blue: 'bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60',
  orange: 'bg-orange-50 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300 border border-orange-200 dark:border-orange-800/60',
  black: 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border border-transparent',
  outline: 'bg-transparent text-slate-700 dark:text-[#ECECEC] border border-slate-200 dark:border-[#2F2F2F]',
};

export const StickerBadge: React.FC<StickerBadgeProps> = ({
  children,
  className,
  variant = 'yellow',
  size = 'md',
  ...props
}) => {
  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center font-sans font-medium select-none rounded-full',
          size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs',
          variantStyles[variant],
          className
        )
      )}
      {...props}
    >
      {children}
    </span>
  );
};
