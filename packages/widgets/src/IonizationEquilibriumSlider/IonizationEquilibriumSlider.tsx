import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Card, StickerBadge, Slider, TechnicalTermBadge } from '@pharmacy/ui';
import { BaseSimulationWidgetProps } from '../types';
import { IonizationEquilibriumConfig } from './schema';
import { ModelIllustrationNotice } from '../common/ModelIllustrationNotice';

export interface IonizationEquilibriumState {
  pH: number;
  pKa: number;
  drugType: 'acid' | 'base';
  ionizedPct: number;
  unIonizedPct: number;
}

export interface IonizationEquilibriumSliderProps extends BaseSimulationWidgetProps {
  config?: IonizationEquilibriumConfig;
  className?: string;
  disabled?: boolean;
}

interface PresetCompound {
  id: string;
  nameTr: string;
  nameAr: string;
  nameEn: string;
  type: 'acid' | 'base';
  pKa: number;
}

const PRESETS: PresetCompound[] = [
  { id: 'aspirin', nameTr: 'Aspirin (Asetilsalisilik Asit)', nameAr: 'الأسبرين (حمض أسيتيل ساليسيليك)', nameEn: 'Aspirin (Acetylsalicylic Acid)', type: 'acid', pKa: 3.5 },
  { id: 'ibuprofen', nameTr: 'İbuprofen', nameAr: 'إيبوبروفين', nameEn: 'Ibuprofen', type: 'acid', pKa: 4.4 },
  { id: 'diazepam', nameTr: 'Diazepam', nameAr: 'ديازيبام', nameEn: 'Diazepam', type: 'base', pKa: 3.4 },
  { id: 'propranolol', nameTr: 'Propranolol', nameAr: 'بروبرانولول', nameEn: 'Propranolol', type: 'base', pKa: 9.5 },
  { id: 'custom', nameTr: 'Özel Bileşik', nameAr: 'مركب مخصص', nameEn: 'Custom Compound', type: 'acid', pKa: 4.5 },
];

export const BIOLOGICAL_COMPARTMENTS = [
  { id: 'stomach', nameTr: 'Mide', nameAr: 'المعدة', nameEn: 'Stomach', pH: 1.5, icon: '🫁' },
  { id: 'duodenum', nameTr: 'Duedonum', nameAr: 'الاثني عشر', nameEn: 'Duodenum', pH: 6.0, icon: '🔄' },
  { id: 'plasma', nameTr: 'Plazma (Kan)', nameAr: 'بلازما الدم', nameEn: 'Blood Plasma', pH: 7.4, icon: '🩸' },
  { id: 'urine', nameTr: 'İdrar', nameAr: 'البول', nameEn: 'Urine', pH: 5.5, icon: '🧪' },
] as const;

export function calculateIonization(pH: number, pKa: number, type: 'acid' | 'base') {
  const delta = pH - pKa;
  let ionizedPct: number;
  let unIonizedPct: number;

  if (type === 'acid') {
    if (delta >= 10) {
      ionizedPct = 100;
      unIonizedPct = 0;
    } else if (delta <= -10) {
      ionizedPct = 0;
      unIonizedPct = 100;
    } else {
      ionizedPct = 100 / (1 + Math.pow(10, -delta));
      unIonizedPct = 100 - ionizedPct;
    }
  } else {
    if (delta >= 10) {
      ionizedPct = 0;
      unIonizedPct = 100;
    } else if (delta <= -10) {
      ionizedPct = 100;
      unIonizedPct = 0;
    } else {
      unIonizedPct = 100 / (1 + Math.pow(10, -delta));
      ionizedPct = 100 - unIonizedPct;
    }
  }

  return {
    ionizedPct: Math.max(0, Math.min(100, ionizedPct)),
    unIonizedPct: Math.max(0, Math.min(100, unIonizedPct)),
  };
}

export const IonizationEquilibriumSlider: React.FC<IonizationEquilibriumSliderProps> = ({
  config,
  locale: propLocale,
  readOnly = false,
  initialState,
  onStateChange,
  onPredict: _onPredict,
  disabled: propDisabled = false,
  className,
}) => {
  const disabled = readOnly || propDisabled;
  const activeLocale: 'tr' | 'ar' | 'en' = propLocale || (config?.locale as any) || 'tr';
  const isAr = activeLocale === 'ar';
  const isEn = activeLocale === 'en';

  const [pKa, setPka] = useState<number>(
    initialState?.pKa ?? config?.defaultPka ?? 3.5
  );
  const [pH, setPh] = useState<number>(
    initialState?.pH ?? config?.defaultPh ?? 7.4
  );
  const [drugType, setDrugType] = useState<'acid' | 'base'>(
    initialState?.drugType ?? config?.defaultDrugType ?? 'acid'
  );
  const [selectedPreset, setSelectedPreset] = useState<string>('aspirin');

  const { ionizedPct, unIonizedPct } = calculateIonization(pH, pKa, drugType);

  const notifyChange = (newPh: number, newPka: number, newType: 'acid' | 'base') => {
    const res = calculateIonization(newPh, newPka, newType);
    if (onStateChange) {
      onStateChange({
        pH: newPh,
        pKa: newPka,
        drugType: newType,
        ionizedPct: res.ionizedPct,
        unIonizedPct: res.unIonizedPct,
      });
    }
  };

  const handlePresetSelect = (preset: PresetCompound) => {
    if (disabled) return;
    setSelectedPreset(preset.id);
    if (preset.id !== 'custom') {
      setPka(preset.pKa);
      setDrugType(preset.type);
      notifyChange(pH, preset.pKa, preset.type);
    }
  };

  const handlePkaChange = (newPka: number) => {
    setPka(newPka);
    setSelectedPreset('custom');
    notifyChange(pH, newPka, drugType);
  };

  const handlePhChange = (newPh: number) => {
    setPh(newPh);
    notifyChange(newPh, pKa, drugType);
  };

  const handleTypeToggle = (type: 'acid' | 'base') => {
    if (disabled) return;
    setDrugType(type);
    setSelectedPreset('custom');
    notifyChange(pH, pKa, type);
  };

  // Biological gradient calculations
  const bioGradients = BIOLOGICAL_COMPARTMENTS.map((comp) => {
    const calc = calculateIonization(comp.pH, pKa, drugType);
    let statusTextTr = 'Yüksek Geçirgenlik (Emilim Yüksek)';
    let statusTextAr = 'نفاذية عالية (امتصاص مرتفع)';
    let statusTextEn = 'High Permeability (Rapid Absorption)';
    let statusColor = 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500';

    if (calc.unIonizedPct < 10) {
      statusTextTr = 'İyon Tuzağı (Membrandan Geçemez)';
      statusTextAr = 'احتباس أيوني (لا ينفذ عبر الغشاء)';
      statusTextEn = 'Ion Trapping (Cannot Cross Membrane)';
      statusColor = 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-500';
    } else if (calc.unIonizedPct < 50) {
      statusTextTr = 'Orta Geçirgenlik (Kısmi Emilim)';
      statusTextAr = 'نفاذية متوسطة (امتصاص جزئي)';
      statusTextEn = 'Moderate Permeability (Partial Absorption)';
      statusColor = 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-500';
    }

    return {
      ...comp,
      unIonizedPct: calc.unIonizedPct,
      ionizedPct: calc.ionizedPct,
      statusText: isEn ? statusTextEn : isAr ? statusTextAr : statusTextTr,
      statusColor,
    };
  });

  const getPresetName = (preset: PresetCompound) => {
    if (isEn) return preset.nameEn;
    if (isAr) return preset.nameAr;
    return preset.nameTr;
  };

  const labels = {
    tr: {
      badge: 'İyonizasyon Dengesi Simülatörü',
      title: 'İyonizasyon Dengesi ve Membran Geçirgenliği Simülatörü',
      prompt: 'Henderson-Hasselbalch eşitliğini incelemek için pH ve pKa değerlerini ayarlayın; iyonize ve non-iyonize türlerin biyolojik dağılımını gözlemleyin.',
      presets: 'Model Bileşikler:',
      compType: 'Bileşik Türü:',
      acid: 'Zayıf Asit',
      base: 'Zayıf Baz',
      pka: 'İyonizasyon Sabiti (pKa)',
      ph: 'Ortam pH Değeri',
      unionized: 'İyonize Olmamış',
      ionized: 'İyonize',
      equilibrium: 'pH = pKa: %50 - %50 Dengesi',
      membraneTitle: 'Lipit Çift Tabaka Difüzyon Modeli:',
      passiveActive: '🟢 Pasif Difüzyon Etkin',
      ionicRepelled: '🔴 İyonik Yansıma Hakim',
      repulsion: 'Elektrostatik İtme',
      gradientsTitle: 'Biyolojik pH Gradyanlarında Dağılım:',
      gradientsSub: 'pH 1.5 | pH 6.0 | pH 7.4 | pH 5.5',
      nonIonLabel: 'Non-İyon',
      ionLabel: 'İyon',
    },
    ar: {
      badge: 'محاكي التوازن الأيوني',
      title: 'محاكاة توازن التأين والنفاذية الغشائية',
      prompt: 'تحكم في قيم pH و pKa لدراسة توازن Henderson-Hasselbalch ومعدلات النفاذية عبر الأغشية الحيوية.',
      presets: 'المركبات النموذجية:',
      compType: 'طبيعة المركب:',
      acid: 'حمض ضعيف',
      base: 'قاعدة ضعيفة',
      pka: 'ثابت التأين (pKa)',
      ph: 'الأس الهيدروجيني للوسط (pH)',
      unionized: 'غير متأين',
      ionized: 'متأين',
      equilibrium: 'pH = pKa: توازن %50 - %50',
      membraneTitle: 'نموذج النفاذية عبر الطبقة الشحمية الثنائية:',
      passiveActive: '🟢 انتشار بسيط فعّال',
      ionicRepelled: '🔴 انعكاس شاردي مهيمن',
      repulsion: 'تنافر إلكتروستاتيكي',
      gradientsTitle: 'التوزيع عبر تدرجات pH الحيوية:',
      gradientsSub: 'pH 1.5 | pH 6.0 | pH 7.4 | pH 5.5',
      nonIonLabel: 'غير متأين',
      ionLabel: 'متأين',
    },
    en: {
      badge: 'Ionization Equilibrium Simulator',
      title: 'Ionization Equilibrium & Membrane Permeability Simulator',
      prompt: 'Adjust pH and pKa values to explore the Henderson-Hasselbalch equilibrium; observe the biological partition of ionized vs un-ionized species.',
      presets: 'Model Compounds:',
      compType: 'Compound Nature:',
      acid: 'Weak Acid',
      base: 'Weak Base',
      pka: 'Ionization Constant (pKa)',
      ph: 'Environmental pH',
      unionized: 'Un-ionized',
      ionized: 'Ionized',
      equilibrium: 'pH = pKa: 50% - 50% Equilibrium',
      membraneTitle: 'Lipid Bilayer Diffusion Model:',
      passiveActive: '🟢 Passive Diffusion Active',
      ionicRepelled: '🔴 Ionic Reflection Dominant',
      repulsion: 'Electrostatic Repulsion',
      gradientsTitle: 'Distribution Across Physiological pH Gradients:',
      gradientsSub: 'pH 1.5 | pH 6.0 | pH 7.4 | pH 5.5',
      nonIonLabel: 'Un-ionized',
      ionLabel: 'Ionized',
    },
  }[activeLocale];

  const assumptions = {
    tr: [
      'Seyreltik sulu biyofazda aktivite katsayısı γ ≈ 1.0 (ideal çözelti)',
      'Yalnızca iyonize olmamış (nötr) moleküler türler lipit çift tabakadan pasif difüzyonla geçer (pH Bölme Hipotezi)',
      'İyonik türler elektriksel çift tabaka tarafından itilerek elektrostatik bariyere uğrar',
      'Aktif taşıyıcılar ve parasellüler transport bu modelde ihmal edilmiştir',
    ],
    ar: [
      'معامل الفاعلية γ ≈ 1.0 في الحيز المائي المخفف (محلول مثالي)',
      'فقط الجزيئات غير المتأينة (المحايدة) تعبر الطبقة الشحمية الثنائية عبر الانتشار البسيط (فرضية تجزئة pH)',
      'الجزيئات المشحونة تتنافر مع رؤوس الدهون الفسفورية القطبية مما يشكل حاجزاً إلكتروستاتيكياً',
      'تم إهمال النواقل النشطة والانتشار عبر الوصلات الخلوية في هذا النموذج التعليمي',
    ],
    en: [
      'Activity coefficient γ ≈ 1.0 in dilute aqueous biophase (ideal solution)',
      'Only un-ionized (neutral) species cross lipid bilayers via passive transcellular diffusion (pH Partition Hypothesis)',
      'Charged ionic species encounter an electrostatic barrier at the polar head groups',
      'Active transporters and paracellular transport are neglected in this foundational model',
    ],
  }[activeLocale];

  return (
    <Card
      variant="default"
      dir={isAr ? 'rtl' : 'ltr'}
      className={clsx(
        'w-full flex flex-col gap-4 text-black dark:text-slate-100 text-start',
        className
      )}
    >
      {/* Header */}
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <StickerBadge variant="orange" size="sm">
              {labels.badge}
            </StickerBadge>
            <TechnicalTermBadge term="Henderson-Hasselbalch" />
          </div>
          {config?.source && (
            <span className="text-[11px] font-mono text-gray-600 dark:text-gray-400" dir="ltr">
              Source: {config.source.file} (p. {config.source.page})
            </span>
          )}
        </div>

        <h3 className="font-display font-bold text-base sm:text-lg">
          {config?.title || labels.title}
        </h3>

        <p className="text-xs font-body text-gray-700 dark:text-gray-300">
          {config?.prompt || labels.prompt}
        </p>
      </div>

      {/* Preset Molecules Selector */}
      <div className="flex flex-col gap-1.5 p-2.5 bg-gray-50 dark:bg-[#131B2A] border-2 border-black dark:border-slate-700">
        <span className="text-[11px] font-mono font-bold uppercase text-gray-700 dark:text-slate-300">
          {labels.presets}
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => {
            const isSelected = selectedPreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                disabled={disabled}
                onClick={() => handlePresetSelect(preset)}
                className={clsx(
                  'px-2.5 py-1 text-xs font-mono font-bold border-2 border-black dark:border-slate-700 transition-all cursor-pointer',
                  isSelected
                    ? 'bg-[#FF9F45] text-black shadow-[2px_2px_0px_#000000] scale-102'
                    : 'bg-white dark:bg-[#1E293B] text-black dark:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800'
                )}
              >
                {getPresetName(preset)}
                {preset.id !== 'custom' && ` (pKa ${preset.pKa})`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Drug Type Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 bg-white dark:bg-[#131B2A] border-2 border-black dark:border-slate-700">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase">
            {labels.compType}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={disabled}
              onClick={() => handleTypeToggle('acid')}
              className={clsx(
                'px-3 py-1 text-xs font-mono font-bold uppercase border-2 border-black dark:border-slate-700 transition-all cursor-pointer',
                drugType === 'acid'
                  ? 'bg-[#FFD93D] text-black shadow-[2px_2px_0px_#000000]'
                  : 'bg-white dark:bg-[#1E293B] text-black dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
              )}
            >
              {labels.acid}
            </button>
            <button
              type="button"
              disabled={disabled}
              onClick={() => handleTypeToggle('base')}
              className={clsx(
                'px-3 py-1 text-xs font-mono font-bold uppercase border-2 border-black dark:border-slate-700 transition-all cursor-pointer',
                drugType === 'base'
                  ? 'bg-[#6BCB77] text-black shadow-[2px_2px_0px_#000000]'
                  : 'bg-white dark:bg-[#1E293B] text-black dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
              )}
            >
              {labels.base}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono" dir="ltr">
          <span className="font-bold text-amber-800 dark:text-amber-400">Δ = pH - pKa:</span>
          <span className="px-2 py-0.5 bg-gray-100 dark:bg-slate-800 border border-black/30 dark:border-slate-600 font-bold">
            {(pH - pKa >= 0 ? '+' : '') + (pH - pKa).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Sliders for pKa and pH */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-gray-50 dark:bg-[#131B2A] border-2 border-black dark:border-slate-700">
        <Slider
          label={labels.pka}
          value={pKa}
          min={1.0}
          max={12.0}
          step={0.1}
          onChange={handlePkaChange}
          disabled={disabled}
        />
        <Slider
          label={labels.ph}
          value={pH}
          min={1.0}
          max={14.0}
          step={0.1}
          onChange={handlePhChange}
          disabled={disabled}
        />
      </div>

      {/* Real-Time Visual Fraction Bar (Strict LTR Container Isolation) */}
      <div
        className="w-full bg-white dark:bg-[#131B2A] border-3 border-black dark:border-slate-700 shadow-neo dark:shadow-neo-dark p-3.5 space-y-3"
        dir="ltr"
      >
        <div className="flex items-center justify-between text-xs font-mono font-bold">
          <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
            <span className="w-3.5 h-3.5 bg-emerald-500 border border-black inline-block" />
            {`${labels.unionized} [${drugType === 'acid' ? 'HA' : 'B'}]: ${unIonizedPct.toFixed(1)}%`}
          </span>

          <span className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400">
            <span className="w-3.5 h-3.5 bg-blue-500 border border-black inline-block" />
            {`${labels.ionized} [${drugType === 'acid' ? 'A⁻' : 'BH⁺'}]: ${ionizedPct.toFixed(1)}%`}
          </span>
        </div>

        {/* Stacked Fraction Bar */}
        <div
          role="progressbar"
          aria-valuenow={Math.round(unIonizedPct)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Ionization fraction percentage bar"
          className="w-full h-8 flex border-3 border-black dark:border-slate-700 bg-gray-200 dark:bg-slate-800 overflow-hidden shadow-[2px_2px_0px_#000000]"
        >
          <div
            style={{ width: `${unIonizedPct}%` }}
            className="h-full bg-emerald-500 flex items-center justify-center text-xs font-mono font-bold text-white transition-all duration-150 overflow-hidden"
            title={`Un-ionized: ${unIonizedPct.toFixed(1)}%`}
          >
            {unIonizedPct >= 12 && `${unIonizedPct.toFixed(0)}% [${drugType === 'acid' ? 'HA' : 'B'}]`}
          </div>
          <div
            style={{ width: `${ionizedPct}%` }}
            className="h-full bg-blue-500 flex items-center justify-center text-xs font-mono font-bold text-white transition-all duration-150 overflow-hidden"
            title={`Ionized: ${ionizedPct.toFixed(1)}%`}
          >
            {ionizedPct >= 12 && `${ionizedPct.toFixed(0)}% [${drugType === 'acid' ? 'A⁻' : 'BH⁺'}]`}
          </div>
        </div>

        {/* Equivalence Milestone Indicator */}
        <div className="flex items-center justify-between text-[11px] font-mono text-gray-600 dark:text-slate-400 pt-1 border-t border-black/10 dark:border-slate-800">
          <span>{labels.equilibrium}</span>
          <span>
            {drugType === 'acid'
              ? `log([A⁻]/[HA]) = ${(pH - pKa).toFixed(2)}`
              : `log([B]/[BH⁺]) = ${(pH - pKa).toFixed(2)}`}
          </span>
        </div>
      </div>

      {/* Lipid Bilayer Membrane Diffusion Visualizer (Strict LTR Container Isolation) */}
      <div
        className="w-full bg-white dark:bg-[#131B2A] border-3 border-black dark:border-slate-700 shadow-neo dark:shadow-neo-dark p-3"
        dir="ltr"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-bold uppercase text-gray-800 dark:text-slate-200">
            {labels.membraneTitle}
          </span>
          <span className="text-[11px] font-mono text-gray-500 dark:text-slate-400">
            {unIonizedPct >= 50 ? labels.passiveActive : labels.ionicRepelled}
          </span>
        </div>

        <svg
          viewBox="0 0 500 160"
          className="w-full h-auto select-none bg-[#F8FAFC] dark:bg-[#0B0F17] border-2 border-black dark:border-slate-700"
          role="img"
          aria-label="Lipid bilayer membrane model diagram"
        >
          {/* Header Zones */}
          <rect x="0" y="0" width="180" height="30" fill="#E2E8F0" className="dark:fill-slate-800" />
          <text x="90" y="20" textAnchor="middle" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="currentColor">
            {isEn ? 'Donor Aqueous (GI Lumen)' : isAr ? 'الوسط المائي المانح (تجويف الأنبوب)' : 'Verici Sulu Faz (Lümen)'}
          </text>

          <rect x="180" y="0" width="140" height="30" fill="#FEF3C7" className="dark:fill-amber-950/60" />
          <text x="250" y="20" textAnchor="middle" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#D97706">
            {isEn ? 'Lipid Bilayer Membrane' : isAr ? 'الغشاء الشحمي الثنائي' : 'Lipit Çift Tabaka'}
          </text>

          <rect x="320" y="0" width="180" height="30" fill="#E2E8F0" className="dark:fill-slate-800" />
          <text x="410" y="20" textAnchor="middle" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="currentColor">
            {isEn ? 'Acceptor Aqueous (Capillary Blood)' : isAr ? 'الوسط المستقبل (الدوران الدموي)' : 'Alıcı Sulu Faz (Plazma)'}
          </text>

          {/* Left Aqueous Zone */}
          <rect x="0" y="30" width="180" height="130" fill="#3B82F6" fillOpacity="0.08" />

          {/* Bilayer Center Zone */}
          <rect x="180" y="30" width="140" height="130" fill="#F59E0B" fillOpacity="0.12" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 2" />

          {/* Right Aqueous Zone */}
          <rect x="320" y="30" width="180" height="130" fill="#10B981" fillOpacity="0.08" />

          {/* Bilayer Polar Heads and Hydrocarbon Tails */}
          {Array.from({ length: 8 }).map((_, i) => {
            const y = 42 + i * 14;
            return (
              <g key={`bilayer-left-${i}`}>
                {/* Left leaflet outer heads */}
                <circle cx="190" cy={y} r="5" fill="#3B82F6" stroke="#000" strokeWidth="1" />
                <line x1="195" y1={y} x2="230" y2={y - 1} stroke="#D97706" strokeWidth="1.5" />
                <line x1="195" y1={y} x2="230" y2={y + 1} stroke="#D97706" strokeWidth="1.5" />

                {/* Right leaflet outer heads */}
                <circle cx="310" cy={y} r="5" fill="#3B82F6" stroke="#000" strokeWidth="1" />
                <line x1="305" y1={y} x2="270" y2={y - 1} stroke="#D97706" strokeWidth="1.5" />
                <line x1="305" y1={y} x2="270" y2={y + 1} stroke="#D97706" strokeWidth="1.5" />
              </g>
            );
          })}

          {/* Un-ionized Permeable Particles Crossing */}
          {unIonizedPct > 5 && (
            <g>
              <circle cx="100" cy="65" r="7" fill="#10B981" stroke="#000" strokeWidth="1.5" />
              <text x="100" y="68" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="#FFF" fontWeight="bold">
                {drugType === 'acid' ? 'HA' : 'B'}
              </text>
              <path d="M 112 65 Q 250 55 380 65" fill="none" stroke="#10B981" strokeWidth="2.5" strokeDasharray="4 2" />
              <circle cx="250" cy="59" r="6" fill="#10B981" stroke="#000" strokeWidth="1.5" />
              <circle cx="395" cy="65" r="7" fill="#10B981" stroke="#000" strokeWidth="1.5" />
              <polygon points="405,65 397,61 397,69" fill="#10B981" />

              <circle cx="60" cy="115" r="7" fill="#10B981" stroke="#000" strokeWidth="1.5" />
              <text x="60" y="118" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="#FFF" fontWeight="bold">
                {drugType === 'acid' ? 'HA' : 'B'}
              </text>
              <path d="M 72 115 Q 250 125 390 115" fill="none" stroke="#10B981" strokeWidth="2.5" strokeDasharray="4 2" />
              <circle cx="250" cy="120" r="6" fill="#10B981" stroke="#000" strokeWidth="1.5" />
              <circle cx="405" cy="115" r="7" fill="#10B981" stroke="#000" strokeWidth="1.5" />
              <polygon points="415,115 407,111 407,119" fill="#10B981" />
            </g>
          )}

          {/* Ionized Polar Particles Repelled */}
          {ionizedPct > 5 && (
            <g>
              <circle cx="120" cy="95" r="7" fill="#3B82F6" stroke="#000" strokeWidth="1.5" />
              <text x="120" y="98" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="#FFF" fontWeight="bold">
                {drugType === 'acid' ? 'A⁻' : 'BH⁺'}
              </text>
              <path d="M 130 95 Q 185 95 180 80 Q 170 70 120 75" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 2" />
              <polygon points="115,75 125,71 123,79" fill="#EF4444" />
              <text x="150" y="112" fontSize="8" fontFamily="monospace" fill="#EF4444" fontWeight="bold">
                {labels.repulsion}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Biological pH Gradients (4 Compartments) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
            {labels.gradientsTitle}
          </h4>
          <span className="text-[11px] font-mono text-gray-500 dark:text-slate-400">
            {labels.gradientsSub}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {bioGradients.map((bg) => {
            const compName = isEn ? bg.nameEn : isAr ? bg.nameAr : bg.nameTr;
            return (
              <div
                key={bg.id}
                className="p-2.5 bg-white dark:bg-[#131B2A] border-2 border-black dark:border-slate-700 flex flex-col gap-1.5 shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#030712]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold flex items-center gap-1">
                    <span>{bg.icon}</span>
                    <span>{compName}</span>
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-[#FFD93D] border border-black text-black">
                    pH {bg.pH}
                  </span>
                </div>

                {/* Mini visual ratio bar */}
                <div
                  className="w-full h-3 border border-black dark:border-slate-700 flex bg-gray-200 dark:bg-slate-800 overflow-hidden"
                  dir="ltr"
                >
                  <div
                    style={{ width: `${bg.unIonizedPct}%` }}
                    className="bg-emerald-500 h-full"
                    title={`Un-ionized: ${bg.unIonizedPct.toFixed(1)}%`}
                  />
                  <div
                    style={{ width: `${bg.ionizedPct}%` }}
                    className="bg-blue-500 h-full"
                    title={`Ionized: ${bg.ionizedPct.toFixed(1)}%`}
                  />
                </div>

                <div className="flex justify-between text-[11px] font-mono" dir="ltr">
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                    {bg.unIonizedPct.toFixed(1)}% {labels.nonIonLabel}
                  </span>
                  <span className="text-blue-700 dark:text-blue-400">
                    {bg.ionizedPct.toFixed(1)}% {labels.ionLabel}
                  </span>
                </div>

                <div
                  className={clsx(
                    'text-[10px] font-mono font-bold p-1 border text-center mt-auto',
                    bg.statusColor
                  )}
                >
                  {bg.statusText}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Model Illustration Notice */}
      <ModelIllustrationNotice
        locale={activeLocale}
        equation={
          activeLocale === 'tr'
            ? (drugType === 'acid'
                ? 'pH = pKa + log([A⁻] / [HA])  =>  % İyonize = 100 / (1 + 10^(pKa - pH))'
                : 'pH = pKa + log([B] / [BH⁺])  =>  % İyonize = 100 / (1 + 10^(pH - pKa))')
            : activeLocale === 'ar'
            ? (drugType === 'acid'
                ? 'pH = pKa + log([A⁻] / [HA])  =>  % المتأين = 100 / (1 + 10^(pKa - pH))'
                : 'pH = pKa + log([B] / [BH⁺])  =>  % المتأين = 100 / (1 + 10^(pH - pKa))')
            : (drugType === 'acid'
                ? 'pH = pKa + log([A⁻] / [HA])  =>  % Ionized = 100 / (1 + 10^(pKa - pH))'
                : 'pH = pKa + log([B] / [BH⁺])  =>  % Ionized = 100 / (1 + 10^(pH - pKa))')
        }
        sourceReference="Foye's Principles of Medicinal Chemistry (8th ed.) & Katzung Basic and Clinical Pharmacology (15th ed.)"
        assumptions={assumptions}
      />
    </Card>
  );
};
