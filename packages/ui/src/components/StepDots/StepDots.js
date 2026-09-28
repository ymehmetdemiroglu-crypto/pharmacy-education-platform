import { jsx as _jsx } from "react/jsx-runtime";
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Check } from 'lucide-react';
export const StepDots = ({ totalSteps, currentStepIndex, completedStepIndices = [], onSelectStep, className, }) => {
    return (_jsx("div", { role: "navigation", "aria-label": "Lesson Progress", className: twMerge(clsx('flex items-center gap-2 rtl:space-x-reverse overflow-x-auto py-1', className)), children: Array.from({ length: totalSteps }, (_, idx) => {
            const isCurrent = idx === currentStepIndex;
            const isCompleted = completedStepIndices.includes(idx);
            const isClickable = Boolean(onSelectStep && (isCompleted || idx <= currentStepIndex + 1));
            return (_jsx("button", { type: "button", disabled: !isClickable, onClick: () => onSelectStep && onSelectStep(idx), "aria-label": `Step ${idx + 1}${isCurrent ? ' (current)' : ''}${isCompleted ? ' (completed)' : ''}`, "aria-current": isCurrent ? 'step' : undefined, className: clsx('w-5 h-5 flex items-center justify-center text-[10px] font-mono font-bold select-none rounded-none', 'transition-all duration-150 ease-neo', 
                // State styles
                isCurrent &&
                    'bg-[#FFD93D] border-3 border-black text-black shadow-[2px_2px_0px_#000000] scale-110 z-10', isCompleted &&
                    !isCurrent &&
                    'bg-[#6BCB77] border-2 border-black text-black shadow-[1px_1px_0px_#000000]', !isCurrent &&
                    !isCompleted &&
                    'bg-white dark:bg-[#252525] border-2 border-black/60 dark:border-white/60 text-gray-400', 
                // Focus ring
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white', isClickable ? 'cursor-pointer hover:scale-105' : 'cursor-default'), children: isCompleted && !isCurrent ? (_jsx(Check, { className: "w-3 h-3 stroke-[3]" })) : (_jsx("span", { children: idx + 1 })) }, idx));
        }) }));
};
