import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
const variantStyles = {
    default: 'bg-white dark:bg-[#1E1E1E] text-black dark:text-white',
    highlight: 'bg-[#FFD93D] text-black',
    success: 'bg-[#EBFBEE] dark:bg-[#1C3322] text-black dark:text-white border-[#6BCB77]',
    misconception: 'bg-[#FFF0F5] dark:bg-[#331C24] text-black dark:text-white border-[#FF6B9D]',
    medchem: 'bg-[#EBF4FF] dark:bg-[#1C2638] text-black dark:text-white border-[#4D96FF]',
    pharm: 'bg-[#FFF5EB] dark:bg-[#38281C] text-black dark:text-white border-[#FF9F45]',
    muted: 'bg-[#F3F4F6] dark:bg-[#252525] text-black dark:text-white',
};
export const Card = React.forwardRef(({ children, className, variant = 'default', interactive = false, elevated = false, noPadding = false, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: twMerge(clsx('border-3 border-black dark:border-white rounded-none', 'transition-all duration-150 ease-neo', elevated ? 'shadow-neo-lg dark:shadow-neo-dark-lg' : 'shadow-neo dark:shadow-neo-dark', interactive && 'cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo-lg dark:hover:shadow-neo-dark-lg active:translate-x-1 active:translate-y-1 active:shadow-none', !noPadding && 'p-4 sm:p-6', variantStyles[variant], className)), ...props, children: children }));
});
Card.displayName = 'Card';
