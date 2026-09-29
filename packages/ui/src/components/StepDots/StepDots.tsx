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
              // Responsive touch hit target area (compact on mobile to prevent clipping)
              'min-w-[28px] sm:min-w-[40px] md:min-w-[44px] min-h-[36px] sm:min-h-[44px] p-0.5 sm:p-1.5 flex items-center justify-center select-none rounded-none',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-[#F59E0B]',
              isClickable ? 'cursor-pointer' : 'cursor-default'
            )}
          >
            <div
              className={clsx(
                'w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-[9px] sm:text-[10px] font-mono font-bold select-none rounded-none',
                'transition-all duration-150 ease-neo',
                // State styles
                isCurrent &&
                  'bg-[#FFD93D] border-2 sm:border-3 border-black text-black shadow-[2px_2px_0px_#000000] scale-110 z-10',
                isCompleted &&
                  !isCurrent &&
                  'bg-[#6BCB77] border-2 border-black text-black shadow-[1px_1px_0px_#000000]',
                !isCurrent &&
                  !isCompleted &&
                  'bg-white dark:bg-[#1E293B] border-2 border-black/60 dark:border-slate-700 text-gray-700 dark:text-slate-300',
                isClickable && !isCurrent && 'hover:scale-105'
              )}
            >
              {isCompleted && !isCurrent ? (
                <Check className="w-3.5 h-3.5 stroke-[3]" />
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
