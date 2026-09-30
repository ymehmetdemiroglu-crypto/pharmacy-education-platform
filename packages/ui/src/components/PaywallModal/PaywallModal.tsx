import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Check, ShieldCheck, Sparkles } from 'lucide-react';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { StickerBadge } from '../StickerBadge/StickerBadge';

import { ThemeContext } from '../../theme/ThemeProvider';

export type Currency = 'TRY';
export type PlanType = 'monthly' | 'semester' | 'annual';

export interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  canStartTrial?: boolean;
  defaultCurrency?: Currency;
  onStartTrial?: () => void;
  onSelectPlan?: (plan: PlanType, currency: Currency, isBundle: boolean) => void;
}

interface PriceData {
  single: { monthly: number; semester: number; annual: number };
  bundle: { monthly: number; semester: number; annual: number };
  symbol: string;
}

const pricingTable: Record<Currency, PriceData> = {
  TRY: {
    single: { monthly: 250, semester: 850, annual: 1450 },
    bundle: { monthly: 350, semester: 1150, annual: 2100 },
    symbol: '₺',
  },
};

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  canStartTrial = true,
  onStartTrial,
  onSelectPlan,
}) => {
  const themeCtx = React.useContext(ThemeContext);
  const themeLocale = themeCtx?.locale;

  const currency: Currency = 'TRY';
  const [isBundle, setIsBundle] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('semester');

  const prices = pricingTable.TRY;
  const activePrices = isBundle ? prices.bundle : prices.single;

  const handleCheckout = () => {
    if (onSelectPlan) {
      onSelectPlan(selectedPlan, currency, isBundle);
    }
  };

  const modalTitle =
    themeLocale === 'tr'
      ? 'Tüm Eczacılık Müfredatını Aç'
      : themeLocale === 'ar'
      ? 'فتح الإتقان الكامل للعلوم الصيدلانية'
      : 'Unlock Full Pharmacy Mastery';

  const planLabels = {
    monthly: themeLocale === 'tr' ? 'Aylık' : themeLocale === 'ar' ? 'شهري' : 'Monthly',
    semester: themeLocale === 'tr' ? 'Dönemlik Paket' : themeLocale === 'ar' ? 'باقة الفصل الدراسي' : 'Semester Pass',
    annual: themeLocale === 'tr' ? 'Yıllık Paket' : themeLocale === 'ar' ? 'الباقة السنوية' : 'Annual Pass',
  };

  const footerCtaText =
    themeLocale === 'tr'
      ? `${planLabels[selectedPlan]} ile Devam Et — ${prices.symbol}${activePrices[selectedPlan]}`
      : themeLocale === 'ar'
      ? `المتابعة مع ${planLabels[selectedPlan]} — ${prices.symbol}${activePrices[selectedPlan]}`
      : `Continue with ${selectedPlan === 'semester' ? 'Semester' : selectedPlan === 'annual' ? 'Annual' : 'Monthly'} Pass — ${prices.symbol}${activePrices[selectedPlan]}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      maxWidth="lg"
      footer={
        <div className="w-full flex flex-col gap-2.5">
          <Button variant="primary" fullWidth size="lg" onClick={handleCheckout} className="py-2.5 sm:py-3">
            {footerCtaText}
          </Button>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-gray-700 dark:text-gray-300 gap-1.5">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
              {themeLocale === 'tr'
                ? 'Dodo Payments ile güvenli tek tıkla ödeme (₺ TRY)'
                : themeLocale === 'ar'
                ? 'دفع آمن بنقرة واحدة بالليرة التركية (₺ TRY) عبر Dodo Payments'
                : 'Secure 1-click checkout powered by Dodo Payments (₺ TRY)'}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="underline font-bold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
            >
              {themeLocale === 'tr'
                ? 'Ders 1 ve 2 ile Ücretsiz Devam Et'
                : themeLocale === 'ar'
                ? 'المتابعة مجاناً مع الدرسين 1 و 2'
                : 'Continue Free with Lessons 1 & 2'}
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-3 sm:space-y-4">
        {/* Trial banner highlight if eligible */}
        {canStartTrial && onStartTrial && (
          <div className="p-2 sm:p-3 bg-[#FFF8E7] dark:bg-[#1E293B] border-2 sm:border-3 border-black dark:border-slate-700 shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#030712] flex items-center justify-between gap-2">
            <div className="space-y-0.5">
              <div className="inline-flex items-center gap-1.5 font-display font-black text-xs sm:text-sm uppercase text-[#92400E] dark:text-amber-400">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />{' '}
                {themeLocale === 'tr'
                  ? '7 Günlük Ücretsiz Deneme'
                  : themeLocale === 'ar'
                  ? 'تجربة مجانية لمدة 7 أيام'
                  : '7-Day Free Trial Available'}
              </div>
              <p className="hidden sm:block text-[11px] text-gray-700 dark:text-slate-300">
                {themeLocale === 'tr'
                  ? 'Kredi kartı gerekmeden 11 modülün tümünü ve gelişmiş ipuçlarını deneyimleyin.'
                  : themeLocale === 'ar'
                  ? 'استكشف جميع الوحدات الـ 11 والتلميحات المتقدمة دون الحاجة لبطاقة ائتمان.'
                  : 'Experience all 11 modules, advanced hints & AI explanations with zero credit card commitment.'}
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={onStartTrial}
              className="shrink-0 whitespace-nowrap text-xs py-1 px-2.5"
            >
              {themeLocale === 'tr'
                ? 'Ücretsiz Denemeyi Başlat'
                : themeLocale === 'ar'
                ? 'بدء التجربة المجانية'
                : 'Start Free Trial'}
            </Button>
          </div>
        )}

        {/* Bundle Selector & Exclusive TRY Currency */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 border-b-2 border-black/20 dark:border-slate-700 pb-2.5">
          {/* Bundle Toggle */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsBundle(false)}
              className={clsx(
                'px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-mono font-bold border-2 border-black dark:border-slate-700',
                !isBundle
                  ? 'bg-[#FFD93D] text-black shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#030712]'
                  : 'bg-white dark:bg-[#1E293B] text-black dark:text-slate-200'
              )}
            >
              {themeLocale === 'tr' ? 'Tek Ders' : themeLocale === 'ar' ? 'مقرر واحد' : 'Single Course'}
            </button>
            <button
              type="button"
              onClick={() => setIsBundle(true)}
              className={clsx(
                'px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-mono font-bold border-2 border-black dark:border-slate-700',
                isBundle
                  ? 'bg-[#FFD93D] text-black shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#030712]'
                  : 'bg-white dark:bg-[#1E293B] text-black dark:text-slate-200'
              )}
            >
              {themeLocale === 'tr' ? 'İkili Paket' : themeLocale === 'ar' ? 'الحزمة المزدوجة' : 'Dual Bundle (Both Courses)'}
            </button>
          </div>

          {/* Exclusive TRY Currency Badge */}
          <div className="flex items-center gap-1 font-mono text-xs">
            <span className="px-2 py-0.5 border-2 border-black dark:border-slate-700 font-bold text-[11px] sm:text-xs bg-[#FFD93D] text-black shadow-[1px_1px_0px_#000000]">
              ₺ TRY
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid (All 3 plans visible side-by-side) */}
        <div role="radiogroup" aria-label="Select an academic pass plan" className="grid grid-cols-3 gap-1.5 sm:gap-3">
          {/* Monthly */}
          <div
            role="radio"
            aria-checked={selectedPlan === 'monthly'}
            tabIndex={0}
            onClick={() => setSelectedPlan('monthly')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedPlan('monthly');
              }
            }}
            className={clsx(
              'p-2 sm:p-3.5 border-2 sm:border-3 border-black dark:border-slate-700 cursor-pointer transition-all duration-150 relative focus:outline-none focus:ring-2 sm:focus:ring-3 focus:ring-[#FFD93D] dark:focus:ring-[#F59E0B]',
              selectedPlan === 'monthly'
                ? 'bg-white dark:bg-[#1E293B] shadow-neo sm:shadow-neo dark:shadow-neo-dark ring-2 ring-[#FFD93D] dark:ring-[#F59E0B]'
                : 'bg-gray-50 dark:bg-[#0B0F17] hover:bg-white'
            )}
          >
            <span className="text-[9px] sm:text-xs font-mono font-bold uppercase text-gray-700 dark:text-slate-300 leading-tight block break-words">
              {planLabels.monthly}
            </span>
            <div className="my-0.5 sm:my-1.5 flex items-baseline gap-0.5 sm:gap-1" dir="ltr">
              <span className="font-display font-black text-lg sm:text-2xl">
                {prices.symbol}{activePrices.monthly}
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-gray-700 dark:text-slate-300">/mo</span>
            </div>
            <p className="hidden sm:block text-[10px] sm:text-[11px] text-gray-600 dark:text-slate-400">
              {themeLocale === 'tr'
                ? 'Aydan aya esnek erişim'
                : themeLocale === 'ar'
                ? 'اشتراك شهري مرن'
                : 'Flexible month-to-month access'}
            </p>
          </div>

          {/* Semester */}
          <div
            role="radio"
            aria-checked={selectedPlan === 'semester'}
            tabIndex={0}
            onClick={() => setSelectedPlan('semester')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedPlan('semester');
              }
            }}
            className={clsx(
              'p-2 sm:p-3.5 border-2 sm:border-3 border-black dark:border-slate-700 cursor-pointer transition-all duration-150 relative bg-[#FFFDF7] dark:bg-[#131B2A] focus:outline-none focus:ring-2 sm:focus:ring-3 focus:ring-[#FFD93D] dark:focus:ring-[#F59E0B]',
              selectedPlan === 'semester'
                ? 'shadow-neo sm:shadow-neo-lg dark:shadow-neo-dark-lg ring-2 sm:ring-3 ring-black dark:ring-amber-500 scale-[1.01] sm:scale-[1.02] z-10'
                : 'hover:bg-white'
            )}
          >
            <div className="absolute -top-2 start-1 sm:-top-3 sm:start-3">
              <StickerBadge variant="green" size="sm" className="scale-75 sm:scale-100 origin-top-left rtl:origin-top-right px-1 py-0 text-[9px] sm:text-xs">
                {themeLocale === 'tr' ? 'Popüler' : themeLocale === 'ar' ? 'شائع' : 'Most Popular'}
              </StickerBadge>
            </div>
            <span className="text-[9px] sm:text-xs font-mono font-bold uppercase text-emerald-800 dark:text-emerald-300 leading-tight block break-words">
              {planLabels.semester}
            </span>
            <div className="my-0.5 sm:my-1.5 flex items-baseline gap-0.5 sm:gap-1" dir="ltr">
              <span className="font-display font-black text-lg sm:text-2xl">
                {prices.symbol}{activePrices.semester}
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-gray-700 dark:text-slate-300">/sem</span>
            </div>
            <p className="hidden sm:block text-[10px] sm:text-[11px] text-gray-600 dark:text-slate-400">
              {themeLocale === 'tr'
                ? '6 tam ay boyunca sınav hazırlığı (~%40 indirim)'
                : themeLocale === 'ar'
                ? '6 أشهر كاملة للتحضير للاختبارات (خصم ~40%)'
                : '6 full months of exam prep (~40% discount)'}
            </p>
          </div>

          {/* Annual */}
          <div
            role="radio"
            aria-checked={selectedPlan === 'annual'}
            tabIndex={0}
            onClick={() => setSelectedPlan('annual')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedPlan('annual');
              }
            }}
            className={clsx(
              'p-2 sm:p-3.5 border-2 sm:border-3 border-black dark:border-slate-700 cursor-pointer transition-all duration-150 relative focus:outline-none focus:ring-2 sm:focus:ring-3 focus:ring-[#FFD93D] dark:focus:ring-[#F59E0B]',
              selectedPlan === 'annual'
                ? 'bg-white dark:bg-[#1E293B] shadow-neo sm:shadow-neo dark:shadow-neo-dark ring-2 ring-[#FFD93D] dark:ring-[#F59E0B]'
                : 'bg-gray-50 dark:bg-[#0B0F17] hover:bg-white'
            )}
          >
            <div className="absolute -top-2 start-1 sm:-top-3 sm:start-3">
              <StickerBadge variant="yellow" size="sm" className="scale-75 sm:scale-100 origin-top-left rtl:origin-top-right px-1 py-0 text-[9px] sm:text-xs">
                {themeLocale === 'tr' ? 'Değer' : themeLocale === 'ar' ? 'أفضل' : 'Best Value'}
              </StickerBadge>
            </div>
            <span className="text-[9px] sm:text-xs font-mono font-bold uppercase text-amber-800 dark:text-amber-300 leading-tight block break-words">
              {planLabels.annual}
            </span>
            <div className="my-0.5 sm:my-1.5 flex items-baseline gap-0.5 sm:gap-1" dir="ltr">
              <span className="font-display font-black text-lg sm:text-2xl">
                {prices.symbol}{activePrices.annual}
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-gray-700 dark:text-slate-300">/yr</span>
            </div>
            <p className="hidden sm:block text-[10px] sm:text-[11px] text-gray-600 dark:text-gray-400">
              {themeLocale === 'tr'
                ? 'Kurul ve lisanslama sınavlarına hazırlık'
                : themeLocale === 'ar'
                ? '12 شهراً كاملاً لاختبارات البورد والترخيص'
                : 'Full 12 months for licensing board exams'}
            </p>
          </div>
        </div>

        {/* Value Proposition Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
            <span>
              {themeLocale === 'tr'
                ? '11 interaktif modül ve bileşenin tümü'
                : themeLocale === 'ar'
                ? 'جميع الوحدات التفاعلية الـ 11 والأدوات'
                : 'All 11 interactive modules & widgets'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
            <span>
              {themeLocale === 'tr'
                ? '2. ve 3. Aşama çözüm adımı ipuçları'
                : themeLocale === 'ar'
                ? 'تلميحات خطوات الحل للمستويين 2 و 3'
                : 'Tier 2 & 3 solution step hints'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
            <span>
              {themeLocale === 'tr'
                ? 'Hedefe yönelik kavram yanılgısı geri bildirimi'
                : themeLocale === 'ar'
                ? 'ملاحظات تشخيصية موجهة للمفاهيم الخاطئة'
                : 'Targeted misconception feedback'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
            <span>
              {themeLocale === 'tr'
                ? 'Cihazlar arası aralıklı tekrar eşitlemesi'
                : themeLocale === 'ar'
                ? 'مزامنة التكرار المتباعد عبر الأجهزة'
                : 'Cross-device spaced repetition sync'}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
