import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, disabled, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium text-slate-700 dark:text-slate-300 tracking-wide"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          disabled={disabled}
          className={twMerge(
            clsx(
              'w-full px-3.5 py-2.5 bg-white dark:bg-[#1E1E1E] text-slate-900 dark:text-[#ECECEC] text-sm',
              'border border-slate-300 dark:border-[#2F2F2F] rounded-xl',
              'shadow-xs',
              'focus:outline-none focus:ring-2 focus:ring-[#10A37F]/40 focus:border-[#10A37F] dark:focus:ring-[#10A37F]/40 dark:focus:border-[#10A37F]',
              'transition-all duration-150 placeholder:text-slate-400 dark:placeholder:text-slate-500',
              error && 'border-rose-500 focus:ring-rose-500/40 focus:border-rose-500',
              disabled && 'bg-slate-100 dark:bg-[#141414] text-slate-400 dark:text-slate-600 border-slate-200 dark:border-[#262626] shadow-none cursor-not-allowed',
              className
            )
          )}
          {...props}
        />
        {error && (
          <p className="text-xs font-medium text-rose-600 dark:text-rose-400 flex items-center gap-1 mt-0.5">
            ⚠ {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
