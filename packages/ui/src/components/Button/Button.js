import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
const variantStyles = {
    primary: 'bg-[#FFD93D] text-black hover:bg-[#FACC15]',
    secondary: 'bg-white dark:bg-[#1E1E1E] text-black dark:text-white',
    success: 'bg-[#6BCB77] text-black hover:bg-[#5BB866]',
    danger: 'bg-[#FF6B9D] text-black hover:bg-[#FF558F]',
    medchem: 'bg-[#4D96FF] text-black hover:bg-[#3B82F6]',
    pharm: 'bg-[#FF9F45] text-black hover:bg-[#F97316]',
    ghost: 'bg-transparent text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10',
};
const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs font-bold gap-1.5',
    md: 'px-4 py-2 text-sm font-bold gap-2',
    lg: 'px-6 py-3 text-base font-bold gap-2.5',
};
export const Button = React.forwardRef(({ children, className, variant = 'primary', size = 'md', fullWidth = false, disabled = false, leftIcon, rightIcon, type = 'button', ...props }, ref) => {
    return (_jsxs("button", { ref: ref, type: type, disabled: disabled, className: twMerge(clsx(
        // Base structural Neo-Brutalist styles
        'inline-flex items-center justify-center font-display tracking-tight uppercase select-none', 'border-3 border-black dark:border-white rounded-none', 'transition-all duration-150 ease-neo', 
        // Elevation & drop shadow
        !disabled && 'shadow-neo dark:shadow-neo-dark hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo-lg dark:hover:shadow-neo-dark-lg active:translate-x-1.5 active:translate-y-1.5 active:shadow-none', 
        // Focus ring standards
        'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2', 
        // Disabled state
        disabled && 'bg-gray-200 dark:bg-gray-800 text-gray-500 border-gray-400 dark:border-gray-600 shadow-none cursor-not-allowed', variantStyles[variant], sizeStyles[size], fullWidth && 'w-full', className)), ...props, children: [leftIcon && _jsx("span", { className: "inline-flex shrink-0", children: leftIcon }), _jsx("span", { children: children }), rightIcon && _jsx("span", { className: "inline-flex shrink-0", children: rightIcon })] }));
});
Button.displayName = 'Button';
