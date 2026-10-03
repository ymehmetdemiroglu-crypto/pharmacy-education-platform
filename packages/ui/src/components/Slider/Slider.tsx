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
      <div className="flex justify-between items-center text-xs font-mono font-bold uppercase">
        <label htmlFor={`slider-${label}`} className="text-black dark:text-slate-100">
          {label}
        </label>
        <span className="px-2 py-0.5 bg-[#FFD93D] border-2 border-black text-black font-mono">
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
            'w-full h-3 bg-white dark:bg-[#1E293B] border-3 border-black dark:border-slate-700 rounded-none appearance-none cursor-pointer',
            'shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#030712]',
            'focus:outline-none focus:ring-2 focus:ring-[#FFD93D] dark:focus:ring-[#F59E0B]',
            // Custom thumb styling
            '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6',
            '[&::-webkit-slider-thumb]:bg-[#FFD93D] [&::-webkit-slider-thumb]:border-3 [&::-webkit-slider-thumb]:border-black',
            '[&::-webkit-slider-thumb]:shadow-[2px_2px_0px_#000000] [&::-webkit-slider-thumb]:cursor-pointer',
            '[&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:bg-[#FFD93D]',
            '[&::-moz-range-thumb]:border-3 [&::-moz-range-thumb]:border-black [&::-moz-range-thumb]:rounded-none',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        />
      </div>
      <div className="flex justify-between text-[10px] font-mono text-gray-500 dark:text-slate-400">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  );
};
