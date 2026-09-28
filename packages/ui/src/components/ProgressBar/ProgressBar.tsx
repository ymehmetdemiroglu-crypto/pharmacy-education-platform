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
  green: 'bg-[#6BCB77]',
  yellow: 'bg-[#FFD93D]',
  blue: 'bg-[#4D96FF]',
  orange: 'bg-[#FF9F45]',
};

const heightMap = {
  sm: 'h-2.5',
  md: 'h-4',
  lg: 'h-6',
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
        <div className="flex justify-between items-center text-xs font-mono font-bold mb-1.5 uppercase">
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
          'w-full bg-white dark:bg-[#252525] border-3 border-black dark:border-white rounded-none',
          'shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#FFFFFF] overflow-hidden',
          heightMap[size]
        )}
      >
        <div
          className={clsx(
            'h-full border-r-3 border-black dark:border-white transition-all duration-300 ease-neo',
            colorMap[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
