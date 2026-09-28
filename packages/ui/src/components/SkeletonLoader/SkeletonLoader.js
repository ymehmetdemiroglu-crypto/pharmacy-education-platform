import { jsx as _jsx } from "react/jsx-runtime";
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export const SkeletonLoader = ({ width = 'w-full', height = 'h-16', className, ...props }) => {
    return (_jsx("div", { role: "status", "aria-label": "Loading content", className: twMerge(clsx(width, height, 'bg-gray-200 dark:bg-[#252525] border-3 border-black dark:border-white rounded-none', 'shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#FFFFFF]', 'animate-pulse transition-opacity duration-200', className)), ...props, children: _jsx("span", { className: "sr-only", children: "Loading..." }) }));
};
