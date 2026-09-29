import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Button } from '../Button/Button';

export interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'w-full p-8 sm:p-12 text-center flex flex-col items-center justify-center',
          'border-3 border-black dark:border-slate-700 rounded-none',
          'shadow-neo dark:shadow-neo-dark',
          'bg-[repeating-linear-gradient(45deg,#FFF8E7,#FFF8E7_10px,#F3ECE0_10px,#F3ECE0_20px)]',
          'dark:bg-[repeating-linear-gradient(45deg,#0B0F17,#0B0F17_10px,#131B2A_10px,#131B2A_20px)]',
          className
        )
      )}
    >
      <div className="p-4 bg-white dark:bg-[#1E293B] border-3 border-black dark:border-slate-700 shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#030712] mb-4 text-black dark:text-slate-100">
        {icon}
      </div>
      <h3 className="font-display font-black text-lg sm:text-xl uppercase tracking-tight text-black dark:text-slate-100 mb-2">
        {title}
      </h3>
      <p className="font-body text-sm text-gray-700 dark:text-slate-300 max-w-md mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
