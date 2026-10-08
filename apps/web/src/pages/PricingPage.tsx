import React, { useState } from 'react';
import { Card, Button, StickerBadge } from '@pharmacy/ui';
import { Check, Sparkles, ArrowRight, Zap, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useAuth } from '@pharmacy/platform';
import { useTranslation } from '../context/TranslationContext';
import { dictionaries } from '../locales';
import { callCreateCheckoutSession, callStartFreeTrial } from '../lib/billing';

export const PricingPage: React.FC = () => {
  const { locale, t } = useTranslation();
  const [isBundle, setIsBundle] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { startTrial } = useAuth();

  const handleCheckout = async (planId: 'monthly' | 'semester_pass' | 'annual') => {
    try {
      setLoadingPlan(planId);
      setErrorMessage(null);
      const courseId: 'medchem' | 'pharmacology' | 'dual_bundle' = isBundle ? 'dual_bundle' : 'medchem';
      const returnUrl = `${window.location.origin}/pricing?checkout=success`;
      const res = await callCreateCheckoutSession({
        courseId,
        planId,
        currency: 'TRY',
        returnUrl,
      });

      if (res?.data?.checkoutUrl) {
        window.location.href = res.data.checkoutUrl;
      } else {
        throw new Error('Checkout session URL was not returned.');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setErrorMessage(
        t('pricing.checkoutRedirectError', { error: err.message || (locale === 'tr' ? 'Lütfen tekrar deneyin.' : locale === 'ar' ? 'يرجى المحاولة مرة أخرى.' : 'Please try again.') })
      );
    } finally {
      setLoadingPlan(null);
    }
  };

  const handleTrialActivation = async () => {
    try {
      setLoadingPlan('trial');
      setErrorMessage(null);
      const res = await callStartFreeTrial();
      if (res?.data?.success) {
        alert(t('pricing.trialActivatedAlert'));
        window.location.reload();
        return;
      }
    } catch (err: any) {
      console.warn('Backend trial callable fallback to local state:', err);
    }

    const localSuccess = await startTrial();
    if (localSuccess) {
      alert(t('pricing.trialActivatedAlert'));
    } else {
      alert(t('pricing.trialAlreadyClaimedAlert'));
    }
    setLoadingPlan(null);
  };

  // All pricing is strictly in Turkish Lira (₺)
  const prices = {
    single: {
      monthly: '₺250',
      semester: '₺850',
      annual: '₺1.450',
    },
    bundle: {
      monthly: '₺350',
      semester: '₺1.150',
      annual: '₺2.100',
    },
  };

  const copy = {
    badgeEconomics: t('pricing.badgeEconomics'),
    badgeTrial: t('pricing.badgeTrial'),
    guaranteeFreeLessons: t('pricing.guaranteeFreeLessons'),
    guaranteeCardlessTrial: t('pricing.guaranteeCardlessTrial'),
    heroTitle: t('pricing.heroTitle'),
    heroDesc: t('pricing.heroDesc'),
    scopeLabel: t('pricing.scopeLabel'),
    singleCourse: t('pricing.singleCourse'),
    dualBundle: t('pricing.dualBundle'),
    monthlyTitle: t('pricing.monthlyTitle'),
    monthlyPeriod: t('pricing.monthlyPeriod'),
    monthlyDesc: t('pricing.monthlyDesc'),
    monthlyCta: t('pricing.monthlyCta'),
    semesterTitle: t('pricing.semesterTitle'),
    semesterPeriod: t('pricing.semesterPeriod'),
    semesterDesc: t('pricing.semesterDesc'),
    semesterBadge: t('pricing.semesterBadge'),
    semesterCta: t('pricing.semesterCta'),
    annualTitle: t('pricing.annualTitle'),
    annualPeriod: t('pricing.annualPeriod'),
    annualDesc: t('pricing.annualDesc'),
    annualBadge: t('pricing.annualBadge'),
    annualCta: t('pricing.annualCta'),
    trialBannerTitle: t('pricing.trialBannerTitle'),
    trialBannerDesc: t('pricing.trialBannerDesc'),
    trialBannerCta: t('pricing.trialBannerCta'),
    currencyBadge: t('pricing.currencyBadge'),
    features: (dictionaries[locale] || dictionaries.tr).pricing.features,
  };

  const active = isBundle ? prices.bundle : prices.single;

  return (
    <div className="w-full pb-20 space-y-12">
      {/* Hero Header */}
      <section className="bg-white dark:bg-[#171717] border-b border-slate-200 dark:border-[#2F2F2F] py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <StickerBadge variant="green" size="sm">
              {copy.badgeEconomics}
            </StickerBadge>
            <StickerBadge variant="yellow" size="sm">
              {copy.badgeTrial}
            </StickerBadge>
          </div>
          <h1 className="font-extrabold text-3xl sm:text-5xl tracking-tight text-slate-900 dark:text-[#ECECEC]">
            {copy.heroTitle}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-[#8E8E8E] max-w-2xl leading-relaxed">
            {copy.heroDesc}
          </p>
        </div>
      </section>

      {/* Guaranteed Free Tier Highlights */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-xl shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-[#10A37F] shrink-0">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block">
                {t('catalog.freemiumBadge')}
              </span>
              <p className="font-bold text-sm sm:text-base text-slate-900 dark:text-[#ECECEC] leading-snug">
                {copy.guaranteeFreeLessons}
              </p>
            </div>
          </div>

          <div className="p-4 bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/60 flex items-center justify-center text-amber-600 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
                {t('pricing.riskFreeStart')}
              </span>
              <p className="font-bold text-sm sm:text-base text-slate-900 dark:text-[#ECECEC] leading-snug">
                {copy.guaranteeCardlessTrial}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Controls: Bundle Scope in strictly TRY */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3.5 bg-white dark:bg-[#171717] rounded-xl border border-slate-200 dark:border-[#2F2F2F] shadow-xs">
          {/* Bundle Toggle */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-slate-500 dark:text-[#8E8E8E]">
              {copy.scopeLabel}
            </span>
            <div className="flex items-center p-0.5 bg-slate-100 dark:bg-[#212121] rounded-xl border border-slate-200 dark:border-[#2F2F2F]">
              <button
                type="button"
                onClick={() => setIsBundle(false)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  !isBundle
                    ? 'bg-white dark:bg-[#2F2F2F] text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-[#8E8E8E] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {copy.singleCourse}
              </button>
              <button
                type="button"
                onClick={() => setIsBundle(true)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  isBundle
                    ? 'bg-white dark:bg-[#2F2F2F] text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-[#8E8E8E] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {copy.dualBundle}
              </button>
            </div>
          </div>

          {/* Strictly Turkish Lira Indicator */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="px-2.5 py-0.5 rounded-full font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-emerald-500" />
              <span>{copy.currencyBadge}</span>
            </span>
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Monthly */}
          <Card variant="default" className="p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-600 dark:text-[#8E8E8E]">
                {copy.monthlyTitle}
              </span>
              <div className="flex items-baseline gap-1" dir="ltr">
                <span className="font-extrabold text-3xl text-slate-900 dark:text-[#ECECEC]">{active.monthly}</span>
                <span className="text-xs text-slate-500 dark:text-[#8E8E8E]">{copy.monthlyPeriod}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-[#8E8E8E]">
                {copy.monthlyDesc}
              </p>
              <ul className="space-y-2 pt-2 text-xs text-slate-700 dark:text-[#CCCCCC]">
                {copy.features.monthly.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#10A37F] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            {errorMessage && (
              <div className="p-3 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs rounded-xl flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}
            <Button
              variant="secondary"
              fullWidth
              isLoading={loadingPlan === 'monthly'}
              onClick={() => handleCheckout('monthly')}
            >
              {copy.monthlyCta}
            </Button>
          </Card>

          {/* Semester (Recommended - Most Popular) */}
          <Card
            variant="default"
            elevated
            className="p-6 space-y-5 flex flex-col justify-between relative border-2 border-[#10A37F] bg-emerald-50/20 dark:bg-emerald-950/20 shadow-sm scale-[101%] z-10"
          >
            <div className="absolute -top-3 start-6">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#10A37F] text-white shadow-xs">
                {copy.semesterBadge}
              </span>
            </div>
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-[#10A37F]">
                {copy.semesterTitle}
              </span>
              <div className="flex items-baseline gap-1" dir="ltr">
                <span className="font-extrabold text-3xl text-slate-900 dark:text-[#ECECEC]">{active.semester}</span>
                <span className="text-xs text-slate-500 dark:text-[#8E8E8E]">{copy.semesterPeriod}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-[#8E8E8E]">
                {copy.semesterDesc}
              </p>
              <ul className="space-y-2 pt-2 text-xs text-slate-700 dark:text-[#CCCCCC]">
                {copy.features.semester.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#10A37F] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              isLoading={loadingPlan === 'semester_pass'}
              onClick={() => handleCheckout('semester_pass')}
            >
              {copy.semesterCta}
            </Button>
          </Card>

          {/* Annual (Best Value) */}
          <Card variant="default" className="p-6 space-y-5 flex flex-col justify-between relative">
            <div className="absolute -top-2.5 start-6">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-xs">
                {copy.annualBadge}
              </span>
            </div>
            <div className="space-y-3 pt-1">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                {copy.annualTitle}
              </span>
              <div className="flex items-baseline gap-1" dir="ltr">
                <span className="font-extrabold text-3xl text-slate-900 dark:text-[#ECECEC]">{active.annual}</span>
                <span className="text-xs text-slate-500 dark:text-[#8E8E8E]">{copy.annualPeriod}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-[#8E8E8E]">
                {copy.annualDesc}
              </p>
              <ul className="space-y-2 pt-2 text-xs text-slate-700 dark:text-[#CCCCCC]">
                {copy.features.annual.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button
              variant="secondary"
              fullWidth
              isLoading={loadingPlan === 'annual'}
              onClick={() => handleCheckout('annual')}
            >
              {copy.annualCta}
            </Button>
          </Card>
        </div>

        {/* 7-Day Free Trial Banner */}
        <div className="p-6 bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-base text-slate-900 dark:text-[#ECECEC] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              {copy.trialBannerTitle}
            </h3>
            <p className="text-xs text-slate-600 dark:text-[#8E8E8E]">
              {copy.trialBannerDesc}
            </p>
          </div>
          <Button
            variant="primary"
            isLoading={loadingPlan === 'trial'}
            onClick={handleTrialActivation}
            rightIcon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}
          >
            {copy.trialBannerCta}
          </Button>
        </div>
      </section>
    </div>
  );
};
