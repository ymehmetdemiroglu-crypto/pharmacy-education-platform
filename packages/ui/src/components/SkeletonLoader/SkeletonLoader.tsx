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
          'bg-gray-200 dark:bg-[#1E293B] border-3 border-black dark:border-slate-700 rounded-none',
          'shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#030712]',
          'animate-pulse transition-opacity duration-200',
          className
        )
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
