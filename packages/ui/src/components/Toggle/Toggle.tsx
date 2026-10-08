import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  className,
}) => {
  return (
    <label
      className={twMerge(
        clsx(
          'inline-flex items-center gap-3 select-none cursor-pointer',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )
      )}
    >
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
        />
        {/* Track */}
        <div
          className={clsx(
            'w-11 h-6 rounded-full transition-colors duration-200 pointer-events-none border border-transparent shadow-xs',
            checked ? 'bg-[#10A37F]' : 'bg-slate-300 dark:bg-[#333333]'
          )}
        />
        {/* Thumb */}
        <div
          className={clsx(
            'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 pointer-events-none',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </div>
      <span className="text-xs font-medium text-slate-700 dark:text-slate-300 tracking-wide">
        {label}
      </span>
    </label>
  );
};
