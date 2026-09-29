import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'medchem'
  | 'pharm'
  | 'ghost';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[#FFD93D] text-black hover:bg-[#FACC15]',
  secondary: 'bg-white dark:bg-[#131B2A] text-black dark:text-slate-100',
  success: 'bg-[#6BCB77] text-black hover:bg-[#5BB866]',
  danger: 'bg-[#FF6B9D] text-black hover:bg-[#FF558F]',
  medchem: 'bg-[#4D96FF] text-black hover:bg-[#3B82F6]',
  pharm: 'bg-[#FF9F45] text-black hover:bg-[#F97316]',
  ghost: 'bg-transparent text-black dark:text-slate-100 hover:bg-black/5 dark:hover:bg-slate-800/50',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs font-bold gap-1.5',
  md: 'px-4 py-2 text-sm font-bold gap-2',
  lg: 'px-6 py-3 text-base font-bold gap-2.5',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      disabled = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isEffectiveDisabled = disabled || isLoading;
    return (
      <button
        ref={ref}
        type={type}
        disabled={isEffectiveDisabled}
        aria-busy={isLoading}
        className={twMerge(
          clsx(
            // Base structural Neo-Brutalist styles
            'inline-flex items-center justify-center font-display tracking-tight uppercase select-none',
            'border-3 border-black dark:border-slate-700 rounded-none',
            'transition-all duration-150 ease-neo',
            // Elevation & drop shadow
            !isEffectiveDisabled && 'shadow-neo dark:shadow-neo-dark hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo-lg dark:hover:shadow-neo-dark-lg active:translate-x-1.5 active:translate-y-1.5 active:shadow-none',
            // Focus ring standards
            'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-black dark:focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2',
            // Disabled / Loading state
            isEffectiveDisabled && 'bg-gray-200 dark:bg-gray-800 text-gray-500 border-gray-400 dark:border-gray-600 shadow-none cursor-not-allowed',
            variantStyles[variant],
            sizeStyles[size],
            fullWidth && 'w-full',
            className
          )
        )}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              role="status"
              aria-label="Loading"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading...</span>
          </span>
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
