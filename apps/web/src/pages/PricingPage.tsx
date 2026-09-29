import React, { useState } from 'react';
import { Card, Button, StickerBadge, useTheme } from '@pharmacy/ui';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '@pharmacy/platform';

type Currency = 'USD' | 'TRY' | 'SAR';

export const PricingPage: React.FC = () => {
  const { locale } = useTheme();
  const [currency, setCurrency] = useState<Currency>(() => (locale === 'tr' ? 'TRY' : locale === 'ar' ? 'SAR' : 'USD'));
  const [isBundle, setIsBundle] = useState(false);
  const { startTrial } = useAuth();

  React.useEffect(() => {
    if (locale === 'tr') setCurrency('TRY');
    else if (locale === 'ar') setCurrency('SAR');
    else setCurrency('USD');
  }, [locale]);

  const prices = {
    USD: {
      single: { monthly: 14, semester: 49, annual: 89, symbol: '$' },
      bundle: { monthly: 19, semester: 69, annual: 129, symbol: '$' },
    },
    TRY: {
      single: { monthly: 250, semester: 850, annual: 1450, symbol: '₺' },
      bundle: { monthly: 350, semester: 1150, annual: 2100, symbol: '₺' },
    },
    SAR: {
      single: { monthly: 55, semester: 190, annual: 340, symbol: 'SAR ' },
      bundle: { monthly: 75, semester: 265, annual: 490, symbol: 'SAR ' },
    },
  };

  const copy = {
    en: {
      badgeEconomics: 'Student-First Economics',
      badgeTrial: '7-Day Free Trial',
      heroTitle: 'Transparent Academic Passes',
      heroDesc: 'High-comprehension pharmacy education built for students. Permanent free access to the first two lessons of every module, plus 7-day trials with zero card commitment.',
    },
    tr: {
      badgeEconomics: 'Öğrenci Dostu Fiyatlandırma',
      badgeTrial: '7 Günlük Ücretsiz Deneme',
      heroTitle: 'Şeffaf Akademik Abonelikler',
      heroDesc: 'Eczacılık öğrencileri için yüksek kavrama odaklı eğitim. Her modülün ilk iki dersine kalıcı ücretsiz erişim ve kredi kartı gerektirmeyen 7 günlük deneme sürümü.',
    },
    ar: {
      badgeEconomics: 'اقتصاديات داعمة للطلاب',
      badgeTrial: 'تجربة مجانية لمدة 7 أيام',
      heroTitle: 'اشتراكات أكاديمية شفافة',
      heroDesc: 'تعليم صيدلاني عالي الفهم والاستيعاب مخصص للطلاب. وصول مجاني دائم لأول درسين من كل موديول مع تجربة مجانية لمدة 7 أيام دون الحاجة لبطاقة ائتمانية.',
    },
  }[locale] || {
    badgeEconomics: 'Student-First Economics',
    badgeTrial: '7-Day Free Trial',
    heroTitle: 'Transparent Academic Passes',
    heroDesc: 'High-comprehension pharmacy education built for students. Permanent free access to the first two lessons of every module, plus 7-day trials with zero card commitment.',
  };

  const active = isBundle ? prices[currency].bundle : prices[currency].single;
  const symbol = prices[currency].single.symbol;

  return (
    <div className="w-full pb-20 space-y-12">
      {/* Header Hero */}
      <section className="bg-[#FFF8E7] dark:bg-[#121212] border-b-3 border-black dark:border-white py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2">
            <StickerBadge variant="green" size="sm">{copy.badgeEconomics}</StickerBadge>
            <StickerBadge variant="yellow" size="sm">{copy.badgeTrial}</StickerBadge>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-black dark:text-white">
            {copy.heroTitle}
          </h1>
          <p className="font-body text-base sm:text-lg text-gray-800 dark:text-gray-200 max-w-2xl mx-auto leading-relaxed">
            {copy.heroDesc}
          </p>
        </div>
      </section>

      {/* Pricing Controls: Bundle + Currency */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white dark:bg-[#1E1E1E] border-3 border-black dark:border-white shadow-neo dark:shadow-neo-dark">
          {/* Bundle Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300 mr-2">Scope:</span>
            <button
              type="button"
              onClick={() => setIsBundle(false)}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase border-2 border-black dark:border-white ${
                !isBundle ? 'bg-[#FFD93D] text-black shadow-[2px_2px_0px_#000000]' : 'bg-white dark:bg-black text-black dark:text-white'
              }`}
            >
              Single Course (MedChem or Pharm)
            </button>
            <button
              type="button"
              onClick={() => setIsBundle(true)}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase border-2 border-black dark:border-white ${
                isBundle ? 'bg-[#FFD93D] text-black shadow-[2px_2px_0px_#000000]' : 'bg-white dark:bg-black text-black dark:text-white'
              }`}
            >
              Dual Bundle (Both Courses)
            </button>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300 mr-1">Currency:</span>
            {(['USD', 'TRY', 'SAR'] as Currency[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                className={`px-2.5 py-1 text-xs font-mono font-bold border-2 border-black dark:border-white ${
                  currency === c
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Monthly */}
          <Card variant="default" className="p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300">Monthly Pass</span>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-black text-4xl">{symbol}{active.monthly}</span>
                <span className="font-mono text-xs text-gray-700 dark:text-gray-300">/ month</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Cancel anytime. Ideal for targeted mid-term cramming.
              </p>
              <ul className="space-y-2 pt-2 text-xs font-mono">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>Full access to all lessons</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>Interactive simulation widgets</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>Tier 2 & 3 solution step hints</span>
                </li>
              </ul>
            </div>
            <Button variant="secondary" fullWidth onClick={() => alert('Proceeding to monthly checkout')}>
              Choose Monthly
            </Button>
          </Card>

          {/* Semester (Recommended) */}
          <Card
            variant="default"
            elevated
            className="p-6 space-y-5 flex flex-col justify-between relative bg-[#FFFDF7] dark:bg-[#1E1E1E] ring-3 ring-black dark:ring-white scale-[1.02] z-10"
          >
            <div className="absolute -top-3.5 left-6">
              <StickerBadge variant="green" size="md">
                ★ Most Popular (Recommended)
              </StickerBadge>
            </div>
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono font-bold uppercase text-emerald-700 dark:text-emerald-400">Semester Pass</span>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-black text-4xl">{symbol}{active.semester}</span>
                <span className="font-mono text-xs text-gray-700 dark:text-gray-300">/ semester (6 mo)</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Covers your entire university term at ~40% discount vs monthly.
              </p>
              <ul className="space-y-2 pt-2 text-xs font-mono">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>6 full months of continuous access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>Leitner spaced repetition queue</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>Cross-device progress sync</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>Licensure pre-test diagnostics</span>
                </li>
              </ul>
            </div>
            <Button variant="primary" size="lg" fullWidth onClick={() => alert('Proceeding to semester checkout')}>
              Get Semester Pass
            </Button>
          </Card>

          {/* Annual */}
          <Card variant="default" className="p-6 space-y-5 flex flex-col justify-between relative">
            <div className="absolute -top-3 left-6">
              <StickerBadge variant="yellow" size="sm">
                Best Value
              </StickerBadge>
            </div>
            <div className="space-y-3 pt-1">
              <span className="text-xs font-mono font-bold uppercase text-amber-700 dark:text-amber-400">Annual Pass</span>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-black text-4xl">{symbol}{active.annual}</span>
                <span className="font-mono text-xs text-gray-700 dark:text-gray-300">/ year (12 mo)</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                12 full months for licensure exam prep (NAPLEX / EUS / SPLE).
              </p>
              <ul className="space-y-2 pt-2 text-xs font-mono">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>Full year of updates & new modules</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>Priority access to new drug widgets</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>Course completion certificate</span>
                </li>
              </ul>
            </div>
            <Button variant="secondary" fullWidth onClick={() => alert('Proceeding to annual checkout')}>
              Choose Annual
            </Button>
          </Card>
        </div>

        {/* 7-Day Free Trial Banner */}
        <div className="p-6 bg-[#FFF8E7] dark:bg-[#202020] border-3 border-black dark:border-white shadow-neo dark:shadow-neo-dark flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-display font-black text-lg uppercase flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              Not ready to commit? Start your 7-Day Free Trial
            </h3>
            <p className="text-xs font-body text-gray-700 dark:text-gray-300">
              Instant 1-click activation without upfront credit card requirements. Auto-downgrades on Day 8 with 100% of your progress preserved.
            </p>
          </div>
          <Button
            variant="primary"
            onClick={async () => {
              const res = await startTrial();
              if (res) alert('7-Day Free Trial Activated!');
              else alert('Trial already utilized or active.');
            }}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Activate 7-Day Free Trial
          </Button>
        </div>
      </section>
    </div>
  );
};
