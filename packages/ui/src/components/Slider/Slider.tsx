import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange,
  disabled = false,
  className,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === 'Home') {
      e.preventDefault();
      onChange(min);
    } else if (e.key === 'End') {
      e.preventDefault();
      onChange(max);
    } else if (e.key === 'PageUp') {
      e.preventDefault();
      onChange(Math.min(max, value + step * 5));
    } else if (e.key === 'PageDown') {
      e.preventDefault();
      onChange(Math.max(min, value - step * 5));
    }
  };

  const valueText = `${value} ${unit}`.trim();

  return (
    <div className={twMerge('w-full flex flex-col gap-2', className)}>
      <div className="flex justify-between items-center text-xs font-medium">
        <label htmlFor={`slider-${label}`} className="text-slate-700 dark:text-slate-300">
          {label}
        </label>
        <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 rounded-md font-mono text-xs">
          {valueText}
        </span>
      </div>
      <div className="relative flex items-center">
        <input
          id={`slider-${label}`}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          aria-valuetext={valueText}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-label={label}
          onKeyDown={handleKeyDown}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className={clsx(
            'w-full h-2 bg-slate-200 dark:bg-[#2A2A2A] rounded-full appearance-none cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-[#10A37F]/40',
            // Custom thumb styling
            '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5',
            '[&::-webkit-slider-thumb]:bg-white dark:[&::-webkit-slider-thumb]:bg-[#10A37F] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#10A37F]',
            '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer',
            '[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-white dark:[&::-moz-range-thumb]:bg-[#10A37F]',
            '[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#10A37F] [&::-moz-range-thumb]:rounded-full',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        />
      </div>
      <div className="flex justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  );
};
