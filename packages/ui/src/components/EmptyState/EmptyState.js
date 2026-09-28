import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Button } from '../Button/Button';
export const EmptyState = ({ icon, title, description, actionLabel, onAction, className, }) => {
    return (_jsxs("div", { className: twMerge(clsx('w-full p-8 sm:p-12 text-center flex flex-col items-center justify-center', 'border-3 border-black dark:border-white rounded-none', 'shadow-neo dark:shadow-neo-dark', 'bg-[repeating-linear-gradient(45deg,#FFF8E7,#FFF8E7_10px,#F3ECE0_10px,#F3ECE0_20px)]', 'dark:bg-[repeating-linear-gradient(45deg,#181818,#181818_10px,#222222_10px,#222222_20px)]', className)), children: [_jsx("div", { className: "p-4 bg-white dark:bg-[#252525] border-3 border-black dark:border-white shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#FFFFFF] mb-4 text-black dark:text-white", children: icon }), _jsx("h3", { className: "font-display font-black text-lg sm:text-xl uppercase tracking-tight text-black dark:text-white mb-2", children: title }), _jsx("p", { className: "font-body text-sm text-gray-700 dark:text-gray-300 max-w-md mb-6 leading-relaxed", children: description }), actionLabel && onAction && (_jsx(Button, { variant: "primary", onClick: onAction, children: actionLabel }))] }));
};
