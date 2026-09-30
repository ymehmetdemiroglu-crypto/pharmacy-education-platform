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
            className="text-xs font-mono font-bold uppercase tracking-wider text-black dark:text-slate-100"
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
              'w-full px-3.5 py-2.5 bg-white dark:bg-[#131B2A] text-black dark:text-slate-100 font-mono text-sm',
              'border-3 border-black dark:border-slate-700 rounded-none',
              'shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#030712]',
              'focus:outline-none focus:ring-2 focus:ring-[#FFD93D] dark:focus:ring-[#F59E0B] focus:shadow-[6px_6px_0px_#000000] dark:focus:shadow-[6px_6px_0px_#030712]',
              'transition-all duration-150',
              error && 'border-[#FF6B9D] focus:ring-[#FF6B9D]',
              disabled && 'bg-gray-200 dark:bg-gray-800 text-gray-400 border-gray-400 shadow-none cursor-not-allowed',
              className
            )
          )}
          {...props}
        />
        {error && (
          <p className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1 mt-0.5">
            ⚠ {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-xs font-mono text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
