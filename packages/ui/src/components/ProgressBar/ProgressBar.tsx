import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  variant?: 'green' | 'yellow' | 'blue' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const colorMap = {
  green: 'bg-[#10A37F]',
  yellow: 'bg-amber-500',
  blue: 'bg-blue-500',
  orange: 'bg-orange-500',
};

const heightMap = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  variant = 'green',
  size = 'md',
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={twMerge('w-full', className)}>
      {label && (
        <div className="flex justify-between items-center text-xs font-sans font-medium text-slate-600 dark:text-[#8E8E8E] mb-1.5">
          <span>{label}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Progress'}
        className={clsx(
          'w-full bg-slate-100 dark:bg-[#2F2F2F] rounded-full overflow-hidden border border-slate-200 dark:border-[#383838]',
          heightMap[size]
        )}
      >
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-300 ease-out',
            colorMap[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
