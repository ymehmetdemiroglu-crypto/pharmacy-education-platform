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
  primary: 'bg-[#10A37F] text-white hover:bg-[#0E8C6D] active:bg-[#0D7A5F] border-0 shadow-xs',
  secondary: 'bg-white dark:bg-[#212121] text-slate-800 dark:text-[#ECECEC] border border-slate-200 dark:border-[#2F2F2F] hover:bg-slate-50 dark:hover:bg-[#2A2A2A] shadow-xs',
  success: 'bg-emerald-600 text-white hover:bg-emerald-700 border-0 shadow-xs',
  danger: 'bg-rose-600 text-white hover:bg-rose-700 border-0 shadow-xs',
  medchem: 'bg-blue-600 text-white hover:bg-blue-700 border-0 shadow-xs',
  pharm: 'bg-amber-600 text-white hover:bg-amber-700 border-0 shadow-xs',
  ghost: 'bg-transparent text-slate-700 dark:text-[#ECECEC] hover:bg-slate-100 dark:hover:bg-[#2F2F2F] border-0',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs font-medium gap-1.5 rounded-lg',
  md: 'px-4 py-2 text-sm font-medium gap-2 rounded-xl',
  lg: 'px-6 py-2.5 text-base font-semibold gap-2.5 rounded-xl',
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
            // Modern ergonomic squircle standards (ChatGPT Obsidian palette)
            'inline-flex items-center justify-center font-sans tracking-normal select-none transition-all duration-150',
            // Focus ring standards
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10A37F] focus-visible:ring-offset-2',
            // Disabled / Loading state
            isEffectiveDisabled && 'opacity-50 cursor-not-allowed shadow-none',
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
            <span>Yükleniyor...</span>
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
