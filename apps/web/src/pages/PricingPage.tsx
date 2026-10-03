import React, { useState } from 'react';
import { Card, Button, StickerBadge } from '@pharmacy/ui';
import { Check, Sparkles, ArrowRight, Zap, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useAuth } from '@pharmacy/platform';
import { useTranslation } from '../context/TranslationContext';
import { dictionaries } from '../locales';
import { callCreateCheckoutSession, callStartFreeTrial } from '../lib/firebase';

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
      <section className="bg-[#FFF8E7] dark:bg-[#0B0F17] border-b-3 border-black dark:border-slate-700 py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <StickerBadge variant="green" size="sm">
              {copy.badgeEconomics}
            </StickerBadge>
            <StickerBadge variant="yellow" size="sm">
              {copy.badgeTrial}
            </StickerBadge>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-black dark:text-slate-100">
            {copy.heroTitle}
          </h1>
          <p className="font-body text-base sm:text-lg text-gray-800 dark:text-gray-200 max-w-2xl leading-relaxed">
            {copy.heroDesc}
          </p>
        </div>
      </section>

      {/* Guaranteed Free Tier Highlights */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border-3 border-black dark:border-slate-700 shadow-neo dark:shadow-neo-dark flex items-center gap-3">
            <div className="w-10 h-10 bg-[#6BCB77] border-2 border-black flex items-center justify-center font-bold text-black shrink-0">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block">
                {t('catalog.freemiumBadge')}
              </span>
              <p className="font-display font-black text-sm sm:text-base text-black dark:text-slate-100 leading-snug">
                {copy.guaranteeFreeLessons}
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#FFD93D]/25 dark:bg-[#FFD93D]/10 border-3 border-black dark:border-slate-700 shadow-neo dark:shadow-neo-dark flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FFD93D] border-2 border-black flex items-center justify-center font-bold text-black shrink-0">
              <Sparkles className="w-6 h-6 text-black" />
            </div>
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
                {t('pricing.riskFreeStart')}
              </span>
              <p className="font-display font-black text-sm sm:text-base text-black dark:text-slate-100 leading-snug">
                {copy.guaranteeCardlessTrial}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Controls: Bundle Scope in strictly TRY */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white dark:bg-[#131B2A] border-3 border-black dark:border-slate-700 shadow-neo dark:shadow-neo-dark">
          {/* Bundle Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300 mr-2">
              {copy.scopeLabel}
            </span>
            <button
              type="button"
              onClick={() => setIsBundle(false)}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase border-2 border-black dark:border-slate-700 transition-colors ${
                !isBundle
                  ? 'bg-[#FFD93D] text-black shadow-[2px_2px_0px_#000000]'
                  : 'bg-white dark:bg-[#1E293B] text-black dark:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800'
              }`}
            >
              {copy.singleCourse}
            </button>
            <button
              type="button"
              onClick={() => setIsBundle(true)}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase border-2 border-black dark:border-slate-700 transition-colors ${
                isBundle
                  ? 'bg-[#FFD93D] text-black shadow-[2px_2px_0px_#000000]'
                  : 'bg-white dark:bg-[#1E293B] text-black dark:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800'
              }`}
            >
              {copy.dualBundle}
            </button>
          </div>

          {/* Strictly Turkish Lira Indicator */}
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span className="px-3 py-1 bg-black text-white dark:bg-[#1E293B] dark:text-slate-100 font-bold border-2 border-black dark:border-slate-700 shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#030712] flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-[#FFD93D]" />
              <span>{copy.currencyBadge}</span>
            </span>
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Monthly */}
          <Card variant="default" className="p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300">
                {copy.monthlyTitle}
              </span>
              <div className="flex items-baseline gap-1" dir="ltr">
                <span className="font-display font-black text-4xl">{active.monthly}</span>
                <span className="font-mono text-xs text-gray-700 dark:text-gray-300">{copy.monthlyPeriod}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {copy.monthlyDesc}
              </p>
              <ul className="space-y-2 pt-2 text-xs font-mono">
                {copy.features.monthly.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            {errorMessage && (
              <div className="p-3 bg-red-100 dark:bg-red-950/60 border-2 border-red-600 text-red-800 dark:text-red-200 text-xs font-mono flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
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
            className="p-6 space-y-5 flex flex-col justify-between relative bg-[#FFFDF7] dark:bg-[#131B2A] ring-3 ring-black dark:ring-amber-500 scale-[102%] z-10"
          >
            <div className="absolute -top-3.5 start-6">
              <StickerBadge variant="green" size="md">
                {copy.semesterBadge}
              </StickerBadge>
            </div>
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono font-bold uppercase text-emerald-700 dark:text-emerald-400">
                {copy.semesterTitle}
              </span>
              <div className="flex items-baseline gap-1" dir="ltr">
                <span className="font-display font-black text-4xl">{active.semester}</span>
                <span className="font-mono text-xs text-gray-700 dark:text-gray-300">{copy.semesterPeriod}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {copy.semesterDesc}
              </p>
              <ul className="space-y-2 pt-2 text-xs font-mono">
                {copy.features.semester.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
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
            <div className="absolute -top-3 start-6">
              <StickerBadge variant="yellow" size="sm">
                {copy.annualBadge}
              </StickerBadge>
            </div>
            <div className="space-y-3 pt-1">
              <span className="text-xs font-mono font-bold uppercase text-amber-700 dark:text-amber-400">
                {copy.annualTitle}
              </span>
              <div className="flex items-baseline gap-1" dir="ltr">
                <span className="font-display font-black text-4xl">{active.annual}</span>
                <span className="font-mono text-xs text-gray-700 dark:text-gray-300">{copy.annualPeriod}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {copy.annualDesc}
              </p>
              <ul className="space-y-2 pt-2 text-xs font-mono">
                {copy.features.annual.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
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
        <div className="p-6 bg-[#FFF8E7] dark:bg-[#131B2A] border-3 border-black dark:border-slate-700 shadow-neo dark:shadow-neo-dark flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-display font-black text-lg uppercase flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              {copy.trialBannerTitle}
            </h3>
            <p className="text-xs font-body text-gray-700 dark:text-gray-300">
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
