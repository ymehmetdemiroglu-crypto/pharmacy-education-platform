import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface SkeletonLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = 'w-full',
  height = 'h-16',
  className,
  ...props
}) => {
  return (
    <div
      role="status"
      aria-label="Loading content"
      className={twMerge(
        clsx(
          width,
          height,
          'bg-slate-200/70 dark:bg-[#252525] border border-slate-200 dark:border-[#2F2F2F] rounded-xl',
          'shadow-xs animate-pulse transition-opacity duration-200',
          className
        )
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
