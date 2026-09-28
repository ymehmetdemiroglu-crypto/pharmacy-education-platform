import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Check, ShieldCheck, Sparkles } from 'lucide-react';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { StickerBadge } from '../StickerBadge/StickerBadge';

export type Currency = 'USD' | 'TRY' | 'SAR';
export type PlanType = 'monthly' | 'semester' | 'annual';

export interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  canStartTrial?: boolean;
  onStartTrial?: () => void;
  onSelectPlan?: (plan: PlanType, currency: Currency, isBundle: boolean) => void;
}

interface PriceData {
  single: { monthly: number; semester: number; annual: number };
  bundle: { monthly: number; semester: number; annual: number };
  symbol: string;
}

const pricingTable: Record<Currency, PriceData> = {
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

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  canStartTrial = true,
  onStartTrial,
  onSelectPlan,
}) => {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [isBundle, setIsBundle] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('semester');

  const prices = pricingTable[currency];
  const activePrices = isBundle ? prices.bundle : prices.single;

  const handleCheckout = () => {
    if (onSelectPlan) {
      onSelectPlan(selectedPlan, currency, isBundle);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Unlock Full Pharmacy Mastery"
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Trial banner highlight if eligible */}
        {canStartTrial && onStartTrial && (
          <div className="p-4 bg-[#FFF8E7] dark:bg-[#252525] border-3 border-black dark:border-white shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#FFFFFF] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 font-display font-black text-sm uppercase text-[#D97706] dark:text-[#FBBF24]">
                <Sparkles className="w-4 h-4" /> 7-Day Free Trial Available
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300">
                Experience all 55 modules, advanced hints & AI explanations with zero credit card commitment.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={onStartTrial}
              className="shrink-0 whitespace-nowrap"
            >
              Start Free Trial
            </Button>
          </div>
        )}

        {/* Currency & Bundle Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black/20 dark:border-white/20 pb-4">
          {/* Bundle Toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsBundle(false)}
              className={clsx(
                'px-3 py-1 text-xs font-mono font-bold border-2 border-black',
                !isBundle ? 'bg-[#FFD93D] shadow-[2px_2px_0px_#000000]' : 'bg-white dark:bg-black'
              )}
            >
              Single Course
            </button>
            <button
              type="button"
              onClick={() => setIsBundle(true)}
              className={clsx(
                'px-3 py-1 text-xs font-mono font-bold border-2 border-black',
                isBundle ? 'bg-[#FFD93D] shadow-[2px_2px_0px_#000000]' : 'bg-white dark:bg-black'
              )}
            >
              Dual Bundle (Both Courses)
            </button>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-1 font-mono text-xs">
            <span className="text-gray-500 font-bold uppercase mr-1">Currency:</span>
            {(['USD', 'TRY', 'SAR'] as Currency[]).map((curr) => (
              <button
                key={curr}
                type="button"
                onClick={() => setCurrency(curr)}
                className={clsx(
                  'px-2 py-0.5 border border-black dark:border-white font-bold',
                  currency === curr
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-transparent text-black dark:text-white'
                )}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Monthly */}
          <div
            onClick={() => setSelectedPlan('monthly')}
            className={clsx(
              'p-3.5 border-3 border-black dark:border-white cursor-pointer transition-all duration-150 relative',
              selectedPlan === 'monthly'
                ? 'bg-white dark:bg-[#252525] shadow-neo dark:shadow-neo-dark ring-2 ring-[#FFD93D]'
                : 'bg-gray-50 dark:bg-[#181818] hover:bg-white'
            )}
          >
            <span className="text-xs font-mono font-bold uppercase text-gray-500">Monthly</span>
            <div className="my-2">
              <span className="font-display font-black text-2xl">
                {prices.symbol}{activePrices.monthly}
              </span>
              <span className="text-xs font-mono text-gray-500">/mo</span>
            </div>
            <p className="text-[11px] text-gray-600 dark:text-gray-400">Flexible month-to-month access</p>
          </div>

          {/* Semester */}
          <div
            onClick={() => setSelectedPlan('semester')}
            className={clsx(
              'p-3.5 border-3 border-black dark:border-white cursor-pointer transition-all duration-150 relative bg-[#FFFDF7] dark:bg-[#202020]',
              selectedPlan === 'semester'
                ? 'shadow-neo-lg dark:shadow-neo-dark-lg ring-3 ring-black dark:ring-white scale-[1.02] z-10'
                : 'hover:bg-white'
            )}
          >
            <div className="absolute -top-3 left-3">
              <StickerBadge variant="green" size="sm">
                Most Popular
              </StickerBadge>
            </div>
            <span className="text-xs font-mono font-bold uppercase text-emerald-600">Semester Pass</span>
            <div className="my-2">
              <span className="font-display font-black text-2xl">
                {prices.symbol}{activePrices.semester}
              </span>
              <span className="text-xs font-mono text-gray-500">/sem</span>
            </div>
            <p className="text-[11px] text-gray-600 dark:text-gray-400">
              6 full months of exam prep (~40% discount)
            </p>
          </div>

          {/* Annual */}
          <div
            onClick={() => setSelectedPlan('annual')}
            className={clsx(
              'p-3.5 border-3 border-black dark:border-white cursor-pointer transition-all duration-150 relative',
              selectedPlan === 'annual'
                ? 'bg-white dark:bg-[#252525] shadow-neo dark:shadow-neo-dark ring-2 ring-[#FFD93D]'
                : 'bg-gray-50 dark:bg-[#181818] hover:bg-white'
            )}
          >
            <div className="absolute -top-3 left-3">
              <StickerBadge variant="yellow" size="sm">
                Best Value
              </StickerBadge>
            </div>
            <span className="text-xs font-mono font-bold uppercase text-amber-600">Annual Pass</span>
            <div className="my-2">
              <span className="font-display font-black text-2xl">
                {prices.symbol}{activePrices.annual}
              </span>
              <span className="text-xs font-mono text-gray-500">/yr</span>
            </div>
            <p className="text-[11px] text-gray-600 dark:text-gray-400">Full 12 months for licensing board exams</p>
          </div>
        </div>

        {/* Value Proposition Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" />
            <span>All 55 interactive modules & widgets</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" />
            <span>Tier 2 & 3 solution step hints</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" />
            <span>Targeted misconception feedback</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" />
            <span>Cross-device spaced repetition sync</span>
          </div>
        </div>

        {/* Action Buttons & Guarantees */}
        <div className="pt-2 flex flex-col gap-3">
          <Button variant="primary" fullWidth size="lg" onClick={handleCheckout}>
            Continue with {selectedPlan} Pass — {prices.symbol}{activePrices[selectedPlan]}
          </Button>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Secure 1-click checkout powered by Dodo Payments
            </span>
            <button
              type="button"
              onClick={onClose}
              className="underline font-bold text-gray-700 dark:text-gray-300 hover:text-black"
            >
              Continue Free with Lessons 1 & 2
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
