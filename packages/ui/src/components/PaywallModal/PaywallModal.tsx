import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Check, ShieldCheck, Sparkles } from 'lucide-react';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { ThemeContext } from '../../theme/ThemeProvider';

export type Currency = 'TRY' | 'USD';
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
  USD: {
    single: { monthly: 14, semester: 49, annual: 89 },
    bundle: { monthly: 19, semester: 69, annual: 129 },
    symbol: '$',
  },
};

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  canStartTrial = true,
  defaultCurrency = 'TRY',
  onStartTrial,
  onSelectPlan,
}) => {
  const themeCtx = React.useContext(ThemeContext);
  const themeLocale = themeCtx?.locale;

  const [currency] = useState<Currency>(defaultCurrency);
  const [isBundle, setIsBundle] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('semester');

  const prices = pricingTable[currency] || pricingTable.TRY;
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
        <div className="w-full flex flex-col gap-3">
          <Button variant="primary" fullWidth size="lg" onClick={handleCheckout} className="h-11 rounded-xl font-semibold">
            {footerCtaText}
          </Button>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-[#8E8E8E] gap-2">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#10A37F] shrink-0" />
              {themeLocale === 'tr'
                ? 'Dodo Payments ile güvenli tek tıkla ödeme (₺ TRY)'
                : themeLocale === 'ar'
                ? 'دفع آمن بنقرة واحدة بالليرة التركية (₺ TRY) عبر Dodo Payments'
                : 'Secure 1-click checkout powered by Dodo Payments (₺ TRY)'}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-medium text-slate-600 dark:text-[#CCCCCC] hover:text-[#10A37F] dark:hover:text-[#10A37F] underline transition-colors cursor-pointer"
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
      <div className="space-y-4">
        {/* Trial banner highlight if eligible */}
        {canStartTrial && onStartTrial && (
          <div className="p-3.5 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center justify-between gap-3 shadow-xs">
            <div className="space-y-0.5">
              <div className="inline-flex items-center gap-1.5 font-semibold text-xs text-emerald-800 dark:text-emerald-300">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                {themeLocale === 'tr'
                  ? '7 Günlük Ücretsiz Deneme'
                  : themeLocale === 'ar'
                  ? 'تجربة مجانية لمدة 7 أيام'
                  : '7-Day Free Trial Available'}
              </div>
              <p className="hidden sm:block text-xs text-emerald-700 dark:text-emerald-400/80">
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
              className="shrink-0 whitespace-nowrap text-xs py-1.5 px-3 rounded-lg"
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
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-[#2F2F2F] pb-3">
          {/* Bundle Toggle */}
          <div className="flex items-center p-0.5 bg-slate-100 dark:bg-[#212121] rounded-xl border border-slate-200 dark:border-[#2F2F2F]">
            <button
              type="button"
              onClick={() => setIsBundle(false)}
              className={clsx(
                'px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer',
                !isBundle
                  ? 'bg-white dark:bg-[#2F2F2F] text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-[#8E8E8E] hover:text-slate-900 dark:hover:text-white'
              )}
            >
              {themeLocale === 'tr' ? 'Tek Ders' : themeLocale === 'ar' ? 'مقرر واحد' : 'Single Course'}
            </button>
            <button
              type="button"
              onClick={() => setIsBundle(true)}
              className={clsx(
                'px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer',
                isBundle
                  ? 'bg-white dark:bg-[#2F2F2F] text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-[#8E8E8E] hover:text-slate-900 dark:hover:text-white'
              )}
            >
              {themeLocale === 'tr' ? 'İkili Paket' : themeLocale === 'ar' ? 'الحزمة المزدوجة' : 'Dual Bundle (Both Courses)'}
            </button>
          </div>

          {/* Exclusive TRY Currency Badge */}
          <div className="flex items-center gap-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
              ₺ TRY
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid (All 3 plans visible side-by-side) */}
        <div role="radiogroup" aria-label="Select an academic pass plan" className="grid grid-cols-3 gap-2.5 sm:gap-3">
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
              'p-3 sm:p-4 rounded-xl border cursor-pointer transition-all duration-150 relative flex flex-col justify-between',
              selectedPlan === 'monthly'
                ? 'border-[#10A37F] bg-emerald-50/30 dark:bg-emerald-950/20 ring-1 ring-[#10A37F] shadow-xs'
                : 'border-slate-200 dark:border-[#2F2F2F] bg-white dark:bg-[#171717] hover:border-slate-300 dark:hover:border-slate-600'
            )}
          >
            <div>
              <span className="text-xs font-semibold text-slate-700 dark:text-[#CCCCCC] block">
                {planLabels.monthly}
              </span>
              <div className="my-1.5 flex items-baseline gap-1" dir="ltr">
                <span className="font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white">
                  {prices.symbol}{activePrices.monthly}
                </span>
                <span className="text-xs text-slate-500 dark:text-[#8E8E8E]">/ay</span>
              </div>
            </div>
            <p className="hidden sm:block text-[11px] text-slate-500 dark:text-[#8E8E8E] leading-snug">
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
              'p-3 sm:p-4 rounded-xl border cursor-pointer transition-all duration-150 relative flex flex-col justify-between',
              selectedPlan === 'semester'
                ? 'border-[#10A37F] bg-emerald-50/30 dark:bg-emerald-950/20 ring-2 ring-[#10A37F] shadow-xs scale-[1.01]'
                : 'border-slate-200 dark:border-[#2F2F2F] bg-white dark:bg-[#171717] hover:border-slate-300 dark:hover:border-slate-600'
            )}
          >
            <div className="absolute -top-2.5 start-3">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#10A37F] text-white shadow-xs">
                {themeLocale === 'tr' ? 'Popüler' : themeLocale === 'ar' ? 'شائع' : 'Most Popular'}
              </span>
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 block">
                {planLabels.semester}
              </span>
              <div className="my-1.5 flex items-baseline gap-1" dir="ltr">
                <span className="font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white">
                  {prices.symbol}{activePrices.semester}
                </span>
                <span className="text-xs text-slate-500 dark:text-[#8E8E8E]">/dönem</span>
              </div>
            </div>
            <p className="hidden sm:block text-[11px] text-slate-500 dark:text-[#8E8E8E] leading-snug">
              {themeLocale === 'tr'
                ? '6 tam ay (~%40 tasarruf)'
                : themeLocale === 'ar'
                ? '6 أشهر كاملة (خصم ~40%)'
                : '6 full months (~40% discount)'}
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
              'p-3 sm:p-4 rounded-xl border cursor-pointer transition-all duration-150 relative flex flex-col justify-between',
              selectedPlan === 'annual'
                ? 'border-[#10A37F] bg-emerald-50/30 dark:bg-emerald-950/20 ring-1 ring-[#10A37F] shadow-xs'
                : 'border-slate-200 dark:border-[#2F2F2F] bg-white dark:bg-[#171717] hover:border-slate-300 dark:hover:border-slate-600'
            )}
          >
            <div className="absolute -top-2.5 start-3">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-xs">
                {themeLocale === 'tr' ? 'En İyi Değer' : themeLocale === 'ar' ? 'أفضل' : 'Best Value'}
              </span>
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-700 dark:text-[#CCCCCC] block">
                {planLabels.annual}
              </span>
              <div className="my-1.5 flex items-baseline gap-1" dir="ltr">
                <span className="font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white">
                  {prices.symbol}{activePrices.annual}
                </span>
                <span className="text-xs text-slate-500 dark:text-[#8E8E8E]">/yıl</span>
              </div>
            </div>
            <p className="hidden sm:block text-[11px] text-slate-500 dark:text-[#8E8E8E] leading-snug">
              {themeLocale === 'tr'
                ? '12 ay tam sınav hazırlığı'
                : themeLocale === 'ar'
                ? '12 شهراً كاملاً للاختبارات'
                : 'Full 12 months exam prep'}
            </p>
          </div>
        </div>

        {/* Value Proposition Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-[#CCCCCC] pt-1">
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-[#10A37F] shrink-0" />
            <span>
              {themeLocale === 'tr'
                ? '11 interaktif modül ve bileşenin tümü'
                : themeLocale === 'ar'
                ? 'جميع الوحدات التفاعلية الـ 11 والأدوات'
                : 'All 11 interactive modules & widgets'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-[#10A37F] shrink-0" />
            <span>
              {themeLocale === 'tr'
                ? '2. ve 3. Aşama çözüm adımı ipuçları'
                : themeLocale === 'ar'
                ? 'تلميحات خطوات الحل للمستويين 2 و 3'
                : 'Tier 2 & 3 solution step hints'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-[#10A37F] shrink-0" />
            <span>
              {themeLocale === 'tr'
                ? 'Hedefe yönelik kavram yanılgısı geri bildirimi'
                : themeLocale === 'ar'
                ? 'ملاحظات تشخيصية موجهة للمفاهيم الخاطئة'
                : 'Targeted misconception feedback'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-[#10A37F] shrink-0" />
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
