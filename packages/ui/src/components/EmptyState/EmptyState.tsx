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
          'border border-slate-200 dark:border-[#2F2F2F] rounded-2xl',
          'shadow-xs bg-slate-50/50 dark:bg-[#1E1E1E]/50 backdrop-blur-sm',
          className
        )
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#2A2A2A] border border-slate-200 dark:border-[#333333] shadow-xs flex items-center justify-center text-slate-700 dark:text-slate-200 mb-4">
        {icon}
      </div>
      <h3 className="font-sans font-bold text-lg sm:text-xl text-slate-900 dark:text-[#ECECEC] mb-1.5 tracking-tight">
        {title}
      </h3>
      <p className="font-sans text-sm text-slate-600 dark:text-slate-400 max-w-md mb-6 leading-relaxed">
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
