import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Check } from 'lucide-react';

export interface StepDotsProps {
  totalSteps: number;
  currentStepIndex: number;
  completedStepIndices?: number[];
  onSelectStep?: (index: number) => void;
  className?: string;
}

export const StepDots: React.FC<StepDotsProps> = ({
  totalSteps,
  currentStepIndex,
  completedStepIndices = [],
  onSelectStep,
  className,
}) => {
  return (
    <div
      role="navigation"
      aria-label="Lesson Progress"
      className={twMerge(
        clsx('flex items-center gap-0.5 sm:gap-1 rtl:space-x-reverse overflow-x-auto py-1', className)
      )}
    >
      {Array.from({ length: totalSteps }, (_, idx) => {
        const isCurrent = idx === currentStepIndex;
        const isCompleted = completedStepIndices.includes(idx);
        const isClickable = Boolean(onSelectStep && (isCompleted || idx <= currentStepIndex + 1));

        return (
          <button
            key={idx}
            type="button"
            disabled={!isClickable}
            onClick={() => onSelectStep && onSelectStep(idx)}
            aria-label={`Step ${idx + 1}${isCurrent ? ' (current)' : ''}${isCompleted ? ' (completed)' : ''}`}
            aria-current={isCurrent ? 'step' : undefined}
            className={clsx(
              'min-w-[28px] sm:min-w-[36px] md:min-w-[40px] min-h-[32px] sm:min-h-[40px] p-0.5 sm:p-1 flex items-center justify-center select-none rounded-lg',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10A37F]',
              isClickable ? 'cursor-pointer' : 'cursor-default'
            )}
          >
            <div
              className={clsx(
                'w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-[10px] sm:text-xs font-mono font-medium select-none rounded-full',
                'transition-all duration-150',
                // State styles
                isCurrent &&
                  'bg-[#10A37F] text-white shadow-xs scale-110 ring-2 ring-[#10A37F]/30 z-10 font-bold',
                isCompleted &&
                  !isCurrent &&
                  'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30',
                !isCurrent &&
                  !isCompleted &&
                  'bg-slate-100 dark:bg-[#262626] text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-[#333333]',
                isClickable && !isCurrent && 'hover:scale-105 hover:bg-slate-200 dark:hover:bg-[#303030]'
              )}
            >
              {isCompleted && !isCurrent ? (
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              ) : (
                <span>{idx + 1}</span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};
