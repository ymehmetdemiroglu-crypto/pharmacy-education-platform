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
            'w-12 h-6 border-3 border-black dark:border-white transition-colors duration-150 pointer-events-none',
            'shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#FFFFFF]',
            checked ? 'bg-[#6BCB77]' : 'bg-gray-200 dark:bg-gray-700'
          )}
        />
        {/* Thumb */}
        <div
          className={clsx(
            'absolute top-0.5 left-0.5 w-5 h-5 bg-white border-2 border-black transition-transform duration-150 pointer-events-none',
            checked ? 'translate-x-6 bg-[#FFD93D]' : 'translate-x-0'
          )}
        />
      </div>
      <span className="text-xs font-mono font-bold uppercase tracking-wider text-black dark:text-white">
        {label}
      </span>
    </label>
  );
};
