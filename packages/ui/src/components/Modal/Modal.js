import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { X } from 'lucide-react';
const maxWidthMap = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
};
export const Modal = ({ isOpen, onClose, title, children, footer, maxWidth = 'md', className, }) => {
    const modalRef = useRef(null);
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);
    if (!isOpen)
        return null;
    return (_jsx("div", { role: "dialog", "aria-modal": "true", "aria-labelledby": "modal-title", className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none animate-in fade-in duration-150", onClick: (e) => {
            if (e.target === e.currentTarget)
                onClose();
        }, children: _jsxs("div", { ref: modalRef, className: twMerge(clsx('w-full bg-white dark:bg-[#1E1E1E] text-black dark:text-white', 'border-4 border-black dark:border-white rounded-none', 'shadow-[8px_8px_0px_#000000] dark:shadow-[8px_8px_0px_#FFFFFF]', 'flex flex-col overflow-hidden max-h-[90vh]', maxWidthMap[maxWidth], className)), children: [_jsxs("div", { className: "flex items-center justify-between p-4 sm:p-5 border-b-3 border-black dark:border-white bg-[#FFF8E7] dark:bg-[#121212]", children: [_jsx("h2", { id: "modal-title", className: "font-display font-black text-lg sm:text-xl tracking-tight uppercase", children: title }), _jsx("button", { type: "button", onClick: onClose, "aria-label": "Close modal", className: "p-1.5 border-2 border-black dark:border-white hover:bg-black/10 dark:hover:bg-white/10 active:translate-x-0.5 active:translate-y-0.5 transition-transform", children: _jsx(X, { className: "w-5 h-5 stroke-[2.5]" }) })] }), _jsx("div", { className: "p-4 sm:p-6 overflow-y-auto space-y-4", children: children }), footer && (_jsx("div", { className: "p-4 border-t-3 border-black dark:border-white bg-[#F9F9F9] dark:bg-[#252525] flex justify-end gap-3", children: footer }))] }) }));
};
