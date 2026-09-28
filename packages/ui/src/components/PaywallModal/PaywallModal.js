import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { clsx } from 'clsx';
import { Check, ShieldCheck, Sparkles } from 'lucide-react';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { StickerBadge } from '../StickerBadge/StickerBadge';
const pricingTable = {
    USD: {
        single: { monthly: 14, semester: 49, annual: 89 },
        bundle: { monthly: 19, semester: 69, annual: 129 },
        symbol: '$',
    },
    TRY: {
        single: { monthly: 250, semester: 850, annual: 1450 },
        bundle: { monthly: 350, semester: 1150, annual: 2100 },
        symbol: '₺',
    },
    SAR: {
        single: { monthly: 55, semester: 190, annual: 340 },
        bundle: { monthly: 75, semester: 265, annual: 490 },
        symbol: 'SAR ',
    },
};
export const PaywallModal = ({ isOpen, onClose, canStartTrial = true, onStartTrial, onSelectPlan, }) => {
    const [currency, setCurrency] = useState('USD');
    const [isBundle, setIsBundle] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState('semester');
    const prices = pricingTable[currency];
    const activePrices = isBundle ? prices.bundle : prices.single;
    const handleCheckout = () => {
        if (onSelectPlan) {
            onSelectPlan(selectedPlan, currency, isBundle);
        }
    };
    return (_jsx(Modal, { isOpen: isOpen, onClose: onClose, title: "Unlock Full Pharmacy Mastery", maxWidth: "lg", children: _jsxs("div", { className: "space-y-6", children: [canStartTrial && onStartTrial && (_jsxs("div", { className: "p-4 bg-[#FFF8E7] dark:bg-[#252525] border-3 border-black dark:border-white shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#FFFFFF] flex flex-col sm:flex-row items-center justify-between gap-3", children: [_jsxs("div", { className: "space-y-1 text-center sm:text-left", children: [_jsxs("div", { className: "inline-flex items-center gap-1.5 font-display font-black text-sm uppercase text-[#D97706] dark:text-[#FBBF24]", children: [_jsx(Sparkles, { className: "w-4 h-4" }), " 7-Day Free Trial Available"] }), _jsx("p", { className: "text-xs text-gray-700 dark:text-gray-300", children: "Experience all 55 modules, advanced hints & AI explanations with zero credit card commitment." })] }), _jsx(Button, { variant: "primary", size: "sm", onClick: onStartTrial, className: "shrink-0 whitespace-nowrap", children: "Start Free Trial" })] })), _jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 border-b-2 border-black/20 dark:border-white/20 pb-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { type: "button", onClick: () => setIsBundle(false), className: clsx('px-3 py-1 text-xs font-mono font-bold border-2 border-black', !isBundle ? 'bg-[#FFD93D] shadow-[2px_2px_0px_#000000]' : 'bg-white dark:bg-black'), children: "Single Course" }), _jsx("button", { type: "button", onClick: () => setIsBundle(true), className: clsx('px-3 py-1 text-xs font-mono font-bold border-2 border-black', isBundle ? 'bg-[#FFD93D] shadow-[2px_2px_0px_#000000]' : 'bg-white dark:bg-black'), children: "Dual Bundle (Both Courses)" })] }), _jsxs("div", { className: "flex items-center gap-1 font-mono text-xs", children: [_jsx("span", { className: "text-gray-500 font-bold uppercase mr-1", children: "Currency:" }), ['USD', 'TRY', 'SAR'].map((curr) => (_jsx("button", { type: "button", onClick: () => setCurrency(curr), className: clsx('px-2 py-0.5 border border-black dark:border-white font-bold', currency === curr
                                        ? 'bg-black text-white dark:bg-white dark:text-black'
                                        : 'bg-transparent text-black dark:text-white'), children: curr }, curr)))] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [_jsxs("div", { onClick: () => setSelectedPlan('monthly'), className: clsx('p-3.5 border-3 border-black dark:border-white cursor-pointer transition-all duration-150 relative', selectedPlan === 'monthly'
                                ? 'bg-white dark:bg-[#252525] shadow-neo dark:shadow-neo-dark ring-2 ring-[#FFD93D]'
                                : 'bg-gray-50 dark:bg-[#181818] hover:bg-white'), children: [_jsx("span", { className: "text-xs font-mono font-bold uppercase text-gray-500", children: "Monthly" }), _jsxs("div", { className: "my-2", children: [_jsxs("span", { className: "font-display font-black text-2xl", children: [prices.symbol, activePrices.monthly] }), _jsx("span", { className: "text-xs font-mono text-gray-500", children: "/mo" })] }), _jsx("p", { className: "text-[11px] text-gray-600 dark:text-gray-400", children: "Flexible month-to-month access" })] }), _jsxs("div", { onClick: () => setSelectedPlan('semester'), className: clsx('p-3.5 border-3 border-black dark:border-white cursor-pointer transition-all duration-150 relative bg-[#FFFDF7] dark:bg-[#202020]', selectedPlan === 'semester'
                                ? 'shadow-neo-lg dark:shadow-neo-dark-lg ring-3 ring-black dark:ring-white scale-[1.02] z-10'
                                : 'hover:bg-white'), children: [_jsx("div", { className: "absolute -top-3 left-3", children: _jsx(StickerBadge, { variant: "green", size: "sm", children: "Most Popular" }) }), _jsx("span", { className: "text-xs font-mono font-bold uppercase text-emerald-600", children: "Semester Pass" }), _jsxs("div", { className: "my-2", children: [_jsxs("span", { className: "font-display font-black text-2xl", children: [prices.symbol, activePrices.semester] }), _jsx("span", { className: "text-xs font-mono text-gray-500", children: "/sem" })] }), _jsx("p", { className: "text-[11px] text-gray-600 dark:text-gray-400", children: "6 full months of exam prep (~40% discount)" })] }), _jsxs("div", { onClick: () => setSelectedPlan('annual'), className: clsx('p-3.5 border-3 border-black dark:border-white cursor-pointer transition-all duration-150 relative', selectedPlan === 'annual'
                                ? 'bg-white dark:bg-[#252525] shadow-neo dark:shadow-neo-dark ring-2 ring-[#FFD93D]'
                                : 'bg-gray-50 dark:bg-[#181818] hover:bg-white'), children: [_jsx("div", { className: "absolute -top-3 left-3", children: _jsx(StickerBadge, { variant: "yellow", size: "sm", children: "Best Value" }) }), _jsx("span", { className: "text-xs font-mono font-bold uppercase text-amber-600", children: "Annual Pass" }), _jsxs("div", { className: "my-2", children: [_jsxs("span", { className: "font-display font-black text-2xl", children: [prices.symbol, activePrices.annual] }), _jsx("span", { className: "text-xs font-mono text-gray-500", children: "/yr" })] }), _jsx("p", { className: "text-[11px] text-gray-600 dark:text-gray-400", children: "Full 12 months for licensing board exams" })] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Check, { className: "w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" }), _jsx("span", { children: "All 55 interactive modules & widgets" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Check, { className: "w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" }), _jsx("span", { children: "Tier 2 & 3 solution step hints" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Check, { className: "w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" }), _jsx("span", { children: "Targeted misconception feedback" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Check, { className: "w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" }), _jsx("span", { children: "Cross-device spaced repetition sync" })] })] }), _jsxs("div", { className: "pt-2 flex flex-col gap-3", children: [_jsxs(Button, { variant: "primary", fullWidth: true, size: "lg", onClick: handleCheckout, children: ["Continue with ", selectedPlan, " Pass \u2014 ", prices.symbol, activePrices[selectedPlan]] }), _jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(ShieldCheck, { className: "w-4 h-4 text-emerald-600" }), "Secure 1-click checkout powered by Dodo Payments"] }), _jsx("button", { type: "button", onClick: onClose, className: "underline font-bold text-gray-700 dark:text-gray-300 hover:text-black", children: "Continue Free with Lessons 1 & 2" })] })] })] }) }));
};
