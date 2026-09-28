import { jsx as _jsx } from "react/jsx-runtime";
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
const variantStyles = {
    yellow: 'bg-[#FFD93D] text-black border-black',
    green: 'bg-[#6BCB77] text-black border-black',
    pink: 'bg-[#FF6B9D] text-black border-black',
    blue: 'bg-[#4D96FF] text-black border-black',
    orange: 'bg-[#FF9F45] text-black border-black',
    black: 'bg-black text-white border-black dark:border-white',
    outline: 'bg-transparent text-black dark:text-white border-black dark:border-white',
};
export const StickerBadge = ({ children, className, variant = 'yellow', size = 'md', ...props }) => {
    return (_jsx("span", { className: twMerge(clsx('inline-flex items-center font-mono font-bold uppercase tracking-wider select-none', 'border-2 border-black rounded-none shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#FFFFFF]', size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs', variantStyles[variant], className)), ...props, children: children }));
};
