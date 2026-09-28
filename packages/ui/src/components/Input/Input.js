import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export const Input = React.forwardRef(({ className, label, error, helperText, disabled, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    return (_jsxs("div", { className: "w-full flex flex-col gap-1.5", children: [label && (_jsx("label", { htmlFor: inputId, className: "text-xs font-mono font-bold uppercase tracking-wider text-black dark:text-white", children: label })), _jsx("input", { id: inputId, ref: ref, disabled: disabled, className: twMerge(clsx('w-full px-3.5 py-2.5 bg-white dark:bg-[#1E1E1E] text-black dark:text-white font-mono text-sm', 'border-3 border-black dark:border-white rounded-none', 'shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#FFFFFF]', 'focus:outline-none focus:ring-2 focus:ring-[#FFD93D] focus:shadow-[6px_6px_0px_#000000] dark:focus:shadow-[6px_6px_0px_#FFFFFF]', 'transition-all duration-150', error && 'border-[#FF6B9D] focus:ring-[#FF6B9D]', disabled && 'bg-gray-200 dark:bg-gray-800 text-gray-400 border-gray-400 shadow-none cursor-not-allowed', className)), ...props }), error && (_jsxs("p", { className: "text-xs font-mono font-bold text-[#FF6B9D] flex items-center gap-1 mt-0.5", children: ["\u26A0 ", error] })), !error && helperText && (_jsx("p", { className: "text-xs font-mono text-gray-500 dark:text-gray-400", children: helperText }))] }));
});
Input.displayName = 'Input';
