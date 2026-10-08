import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Card, StickerBadge, Slider, TechnicalTermBadge } from '@pharmacy/ui';
import { BaseSimulationWidgetProps } from '../types';
import { MembranePartitionConfig } from './schema';
import { ModelIllustrationNotice } from '../common/ModelIllustrationNotice';

export interface MembranePartitionState {
  logP: number;
  logD: number;
  pH: number;
  pKa: number;
  compoundType: 'acid' | 'base' | 'neutral';
  membraneFlux: number;
}

export interface MembranePartitionSimulatorProps extends BaseSimulationWidgetProps {
  config?: MembranePartitionConfig;
  className?: string;
  disabled?: boolean;
}

export interface Substituent {
  id: string;
  nameTr: string;
  nameAr: string;
  nameEn?: string;
  formula: string;
  pi: number;
}

export const HANSCH_SUBSTITUENTS: Substituent[] = [
  { id: 'methyl', nameTr: 'Metil (-CH₃)', nameAr: 'ميثيل (-CH₃)', nameEn: 'Methyl (-CH₃)', formula: '-CH₃', pi: 0.52 },
  { id: 'chloro', nameTr: 'Kloro (-Cl)', nameAr: 'كلورو (-Cl)', nameEn: 'Chloro (-Cl)', formula: '-Cl', pi: 0.71 },
  { id: 'hydroxy', nameTr: 'Hidroksil (-OH)', nameAr: 'هيدروكسيل (-OH)', nameEn: 'Hydroxyl (-OH)', formula: '-OH', pi: -0.67 },
  { id: 'carboxy', nameTr: 'Karboksil (-COOH)', nameAr: 'كاربوكسيل (-COOH)', nameEn: 'Carboxyl (-COOH)', formula: '-COOH', pi: -0.32 },
];

export function calculateLogD(
  logP: number,
  pKa: number,
  pH: number,
  type: 'acid' | 'base' | 'neutral'
): number {
  if (type === 'neutral') {
    return logP;
  }

  const delta = type === 'acid' ? pH - pKa : pKa - pH;

  if (delta > 30) {
    return logP - delta;
  }
  if (delta < -30) {
    return logP;
  }

  const ionFactor = Math.log10(1 + Math.pow(10, delta));
  return logP - ionFactor;
}

export function calculateMembraneFlux(logD: number): number {
  const center = 2.0;
  const spread = 1.4;
  const flux = 100 * Math.exp(-Math.pow(logD - center, 2) / (2 * Math.pow(spread, 2)));
  return Math.max(0, Math.min(100, flux));
}

export function getBbbPenetration(logD: number, logP: number): {
  statusTr: string;
  statusAr: string;
  statusEn: string;
  level: 'high' | 'moderate' | 'low';
} {
  if (logP > 5.0 || logD < 0.5 || logD > 4.5) {
    return {
      statusTr: 'Düşük (KBB Geçişi Zayıf)',
      statusAr: 'ضعيفة (عبور KBB ضعيف)',
      statusEn: 'Low (Poor BBB Penetration)',
      level: 'low',
    };
  }
  if (logD >= 1.5 && logD <= 3.5) {
    return {
      statusTr: 'Yüksek (KBB Geçişi Optimum)',
      statusAr: 'عالية (عبور KBB مثالي)',
      statusEn: 'High (Optimal BBB Penetration)',
      level: 'high',
    };
  }
  return {
    statusTr: 'Orta (Kısmi KBB Geçişi)',
    statusAr: 'متوسطة (عبور KBB جزئي)',
    statusEn: 'Moderate (Partial BBB Penetration)',
    level: 'moderate',
  };
}

const STRINGS = {
  tr: {
    badge: 'Membran Partisyon Simülatörü',
    defaultTitle: 'Lipit Membran Partisyonu ve Dağılım Simülatörü',
    defaultPrompt: 'Lipofiliklik (logP) ve ortam pH bağımlı dağılım katsayısının (logD) pasif transselüler membran geçişine etkisini simüle edin.',
    compoundTypeLabel: 'Bileşik Türü:',
    acid: 'Zayıf Asit',
    base: 'Zayıf Baz',
    neutral: 'Nötr',
    totalPiShift: 'Toplam π Kayması:',
    hanschTitle: 'Hansch Sübstitüent Ekleme (π Sabiti):',
    hanschRule: 'Hansch Toplanabilirlik Kuralı',
    baseLogPLabel: 'Temel logP (Oktanol-Su)',
    pKaLabel: 'İyonizasyon (pKa)',
    pHLabel: 'Sulu Faz pH',
    lipinskiWarning: (logP: number) => `⚠️ Lipinski 5 Kuralı Uyarısı: ${logP} > 5.0 (Aşırı lipofilik, zayıf sulu çözünürlük)`,
    aqueousLegend: (count: number) => `Sulu Faz: ${count} Molekül`,
    lipidLegend: (count: number) => `Lipit Çift Tabaka Çekirdeği: ${count} Molekül`,
    donorCompartment: 'Dış Sulu Ortam (Donör Kompartmanı)',
    acceptorCompartment: 'İç Hücresel Alıcı Faz (Akseptör Kompartmanı)',
    effectiveLogP: 'Efektif logP',
    physioLogD: 'Fizyolojik logD',
    membranePermeability: 'Membran Geçirgenliği',
    bbbPermeability: 'KBB Geçirgenliği',
    svgAria: 'Membran lipit partisyonu kesit görünümü',
    flux: (flux: number) => `Akı: %${flux}`,
    modelAssumptions: [
      'Oktanol fazı hücresel lipit çift tabakanın hidrofobik çekirdeğini temsil eder',
      'Sübstitüent lipofiliklik katkıları Hansch eşitliği uyarınca toplanabilirdir (logP_toplam = logP_temel + Σπ)',
      'Yalnızca iyonize olmamış türler oktanol/lipit çekirdeğe partisyon eder (pH bölme hipotezi)',
      'Membran geçirgenliği aşırı lipofiliklik durumunda (logP > 5.0) sulu faz çözünme kısıtlamasına uğrar',
    ],
    equationAcid: 'logD = logP - log10(1 + 10^(pH - pKa))   [Asidik İyonlaşma Modeli]',
    equationBase: 'logD = logP - log10(1 + 10^(pKa - pH))   [Bazik İyonlaşma Modeli]',
    equationNeutral: 'logD = logP   [Nötr Moleküler Partisyon]',
  },
  en: {
    badge: 'Membrane Partition Simulator',
    defaultTitle: 'Lipid Membrane Partitioning and Distribution Simulator',
    defaultPrompt: 'Simulate the effect of lipophilicity (logP) and pH-dependent distribution coefficient (logD) on passive transcellular membrane permeation.',
    compoundTypeLabel: 'Compound Type:',
    acid: 'Weak Acid',
    base: 'Weak Base',
    neutral: 'Neutral',
    totalPiShift: 'Total π Shift:',
    hanschTitle: 'Add Hansch Substituents (π Constant):',
    hanschRule: 'Hansch Additivity Rule',
    baseLogPLabel: 'Base logP (Octanol-Water)',
    pKaLabel: 'Ionization (pKa)',
    pHLabel: 'Aqueous Phase pH',
    lipinskiWarning: (logP: number) => `⚠️ Lipinski Rule of 5 Warning: ${logP} > 5.0 (Excessive lipophilicity, poor aqueous solubility)`,
    aqueousLegend: (count: number) => `Aqueous Phase: ${count} Molecules`,
    lipidLegend: (count: number) => `Lipid Bilayer Core: ${count} Molecules`,
    donorCompartment: 'External Aqueous Phase (Donor Compartment)',
    acceptorCompartment: 'Intracellular Receptor Phase (Acceptor Compartment)',
    effectiveLogP: 'Effective logP',
    physioLogD: 'Physiological logD',
    membranePermeability: 'Membrane Permeability',
    bbbPermeability: 'BBB Permeability',
    svgAria: 'Membrane lipid partition cross section',
    flux: (flux: number) => `Flux: ${flux}%`,
    modelAssumptions: [
      'The octanol phase models the hydrophobic core of the cellular lipid bilayer',
      'Substituent lipophilicity contributions are additive according to Hansch equation (total logP = base logP + Σπ)',
      'Only unionized species partition into the octanol/lipid core (pH-partition hypothesis)',
      'Membrane permeation is restricted by poor aqueous solubility at excessive lipophilicity (logP > 5.0)',
    ],
    equationAcid: 'logD = logP - log10(1 + 10^(pH - pKa))   [Acidic Ionization Model]',
    equationBase: 'logD = logP - log10(1 + 10^(pKa - pH))   [Basic Ionization Model]',
    equationNeutral: 'logD = logP   [Neutral Molecular Partition]',
  },
  ar: {
    badge: 'محاكي التقسيم الغشائي',
    defaultTitle: 'محاكاة توزيع الدواء عبر الغشاء الدهني وحساب logP و logD',
    defaultPrompt: 'دراسة نفاذية الدواء عبر الغشاء الدهني اعتماداً على المحبة للدهون (logP) وتأثير باهاء الوسط على معامل التوزيع (logD).',
    compoundTypeLabel: 'نوع المركب:',
    acid: 'حمض ضعيف',
    base: 'قاعدة ضعيفة',
    neutral: 'متعادل',
    totalPiShift: 'إجمالي انزياح π:',
    hanschTitle: 'إضافة المجموعات الوظيفية (ثابت π):',
    hanschRule: 'قاعدة هانش الجمعية',
    baseLogPLabel: 'logP الأساسي (أوكتانول-ماء)',
    pKaLabel: 'ثابت التأين (pKa)',
    pHLabel: 'باهاء الطور المائي',
    lipinskiWarning: (logP: number) => `⚠️ تحذير قاعدة ليبينسكي الخماسية: ${logP} > 5.0 (شديد المحبة للدهون، ذوبانية مائية ضعيفة)`,
    aqueousLegend: (count: number) => `الطور المائي: ${count} جزيئات`,
    lipidLegend: (count: number) => `لب الطبقة الدهنية الثنائية: ${count} جزيئات`,
    donorCompartment: 'الوسط المائي الخارجي (حجرة المانح)',
    acceptorCompartment: 'الطور الخلوي الداخلي (حجرة المستقبل)',
    effectiveLogP: 'logP الفعال',
    physioLogD: 'معامل التوزيع الفسيولوجي (logD)',
    membranePermeability: 'نفاذية الغشاء',
    bbbPermeability: 'نفاذية الحاجز الدموي الدماغي',
    svgAria: 'مخطط مقطعي لتوزيع الدواء في الغشاء الدهني',
    flux: (flux: number) => `التدفق: %${flux}`,
    modelAssumptions: [
      'يمثل طور الأوكتانول اللب الكاره للماء للطبقة المزدوجة الدهنية الخلوية',
      'مساهمات المحبة للدهون للمجموعات الوظيفية تجميعية وفق معادلة هانش (إجمالي logP = الأساسي + Σπ)',
      'الأنواع غير المتأينة فقط هي التي تتوزع في اللب الدهني (فرضية تقسيم باهاء الوسط)',
      'تتقيد نفاذية الغشاء بضعف الذوبانية المائية عند المحبة المفرطة للدهون (logP > 5.0)',
    ],
    equationAcid: 'logD = logP - log10(1 + 10^(pH - pKa))   [نموذج التأين الحمضي]',
    equationBase: 'logD = logP - log10(1 + 10^(pKa - pH))   [نموذج التأين القاعدي]',
    equationNeutral: 'logD = logP   [التوزيع الجزيئي المتعادل]',
  },
};

export const MembranePartitionSimulator: React.FC<MembranePartitionSimulatorProps> = ({
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
  const activeLocale = (propLocale || config?.locale || 'tr') as 'tr' | 'ar' | 'en';
  const isAr = activeLocale === 'ar';
  const t = STRINGS[activeLocale] || STRINGS.tr;

  const [baseLogP, setBaseLogP] = useState<number>(
    initialState?.logP ?? config?.defaultLogP ?? 2.5
  );
  const [pKa, setPka] = useState<number>(
    initialState?.pKa ?? config?.defaultPka ?? 4.0
  );
  const [pH, setPh] = useState<number>(
    initialState?.pH ?? config?.defaultPh ?? 7.4
  );
  const [compoundType, setCompoundType] = useState<'acid' | 'base' | 'neutral'>(
    initialState?.compoundType ?? config?.defaultCompoundType ?? 'acid'
  );

  const [activeSubstituents, setActiveSubstituents] = useState<Record<string, number>>({
    methyl: 0,
    chloro: 0,
    hydroxy: 0,
    carboxy: 0,
  });

  const substituentPiSum = Object.entries(activeSubstituents).reduce(
    (sum, [id, count]) => {
      const sub = HANSCH_SUBSTITUENTS.find((s) => s.id === id);
      return sum + (sub ? sub.pi * count : 0);
    },
    0
  );

  const effectiveLogP = Math.round((baseLogP + substituentPiSum) * 100) / 100;
  const calculatedLogD = Math.round(calculateLogD(effectiveLogP, pKa, pH, compoundType) * 100) / 100;
  const membraneFlux = Math.round(calculateMembraneFlux(calculatedLogD));
  const bbbStatus = getBbbPenetration(calculatedLogD, effectiveLogP);
  const isLipinskiViolated = effectiveLogP > 5.0;

  const notifyChange = (
    newLogP: number,
    newLogD: number,
    newPh: number,
    newPka: number,
    newType: 'acid' | 'base' | 'neutral'
  ) => {
    if (onStateChange) {
      onStateChange({
        logP: newLogP,
        logD: newLogD,
        pH: newPh,
        pKa: newPka,
        compoundType: newType,
        membraneFlux: calculateMembraneFlux(newLogD),
      });
    }
  };

  const handleBaseLogPChange = (val: number) => {
    setBaseLogP(val);
    const newEffLogP = Math.round((val + substituentPiSum) * 100) / 100;
    const newLogD = Math.round(calculateLogD(newEffLogP, pKa, pH, compoundType) * 100) / 100;
    notifyChange(newEffLogP, newLogD, pH, pKa, compoundType);
  };

  const handlePkaChange = (val: number) => {
    setPka(val);
    const newLogD = Math.round(calculateLogD(effectiveLogP, val, pH, compoundType) * 100) / 100;
    notifyChange(effectiveLogP, newLogD, pH, val, compoundType);
  };

  const handlePhChange = (val: number) => {
    setPh(val);
    const newLogD = Math.round(calculateLogD(effectiveLogP, pKa, val, compoundType) * 100) / 100;
    notifyChange(effectiveLogP, newLogD, val, pKa, compoundType);
  };

  const handleCompoundTypeChange = (type: 'acid' | 'base' | 'neutral') => {
    if (disabled) return;
    setCompoundType(type);
    const newLogD = Math.round(calculateLogD(effectiveLogP, pKa, pH, type) * 100) / 100;
    notifyChange(effectiveLogP, newLogD, pH, pKa, type);
  };

  const handleSubstituentChange = (id: string, delta: number) => {
    if (disabled) return;
    setActiveSubstituents((prev) => {
      const cur = prev[id] || 0;
      const next = Math.max(0, Math.min(3, cur + delta));
      const nextState = { ...prev, [id]: next };
      const nextPi = Object.entries(nextState).reduce((sum, [subId, count]) => {
        const sub = HANSCH_SUBSTITUENTS.find((s) => s.id === subId);
        return sum + (sub ? sub.pi * count : 0);
      }, 0);
      const newEffLogP = Math.round((baseLogP + nextPi) * 100) / 100;
      const newLogD = Math.round(calculateLogD(newEffLogP, pKa, pH, compoundType) * 100) / 100;
      notifyChange(newEffLogP, newLogD, pH, pKa, compoundType);
      return nextState;
    });
  };

  // Visual partition calculations for SVG
  const lipidPartitionRatio = Math.max(0.05, Math.min(0.95, 1 / (1 + Math.pow(10, -calculatedLogD))));
  const totalVisualMolecules = 24;
  const lipidCount = Math.round(totalVisualMolecules * lipidPartitionRatio);
  const aqueousCount = totalVisualMolecules - lipidCount;

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
              {t.badge}
            </StickerBadge>
            <TechnicalTermBadge term="logP / logD" />
          </div>
          {config?.source && (
            <span className="text-[11px] font-mono text-gray-600 dark:text-gray-400" dir="ltr">
              Source: {config.source.file} (p. {config.source.page})
            </span>
          )}
        </div>

        <h3 className="font-display font-bold text-base sm:text-lg">
          {config?.title || t.defaultTitle}
        </h3>

        <p className="text-xs font-body text-gray-700 dark:text-gray-300">
          {config?.prompt || t.defaultPrompt}
        </p>
      </div>

      {/* Compound Type Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase text-slate-700 dark:text-neutral-300">
            {t.compoundTypeLabel}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={disabled}
              onClick={() => handleCompoundTypeChange('acid')}
              className={clsx(
                'px-3.5 py-1.5 text-xs font-mono font-semibold uppercase rounded-xl border transition-all',
                compoundType === 'acid'
                  ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                  : 'bg-white dark:bg-[#252525] text-slate-700 dark:text-neutral-300 border-slate-200 dark:border-[#383838] hover:bg-slate-100 dark:hover:bg-[#2C2C2C]'
              )}
            >
              {t.acid}
            </button>
            <button
              type="button"
              disabled={disabled}
              onClick={() => handleCompoundTypeChange('base')}
              className={clsx(
                'px-3.5 py-1.5 text-xs font-mono font-semibold uppercase rounded-xl border transition-all',
                compoundType === 'base'
                  ? 'bg-[#10A37F] text-white border-[#10A37F] shadow-xs'
                  : 'bg-white dark:bg-[#252525] text-slate-700 dark:text-neutral-300 border-slate-200 dark:border-[#383838] hover:bg-slate-100 dark:hover:bg-[#2C2C2C]'
              )}
            >
              {t.base}
            </button>
            <button
              type="button"
              disabled={disabled}
              onClick={() => handleCompoundTypeChange('neutral')}
              className={clsx(
                'px-3.5 py-1.5 text-xs font-mono font-semibold uppercase rounded-xl border transition-all',
                compoundType === 'neutral'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white dark:bg-[#252525] text-slate-700 dark:text-neutral-300 border-slate-200 dark:border-[#383838] hover:bg-slate-100 dark:hover:bg-[#2C2C2C]'
              )}
            >
              {t.neutral}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono" dir="ltr">
          <span className="font-semibold text-slate-500 dark:text-neutral-400">{t.totalPiShift}</span>
          <span
            className={clsx(
              'px-2 py-0.5 border rounded-lg font-semibold',
              substituentPiSum > 0
                ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                : substituentPiSum < 0
                ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800'
                : 'bg-slate-100 dark:bg-[#2A2A2A] text-slate-700 dark:text-neutral-300 border-slate-200 dark:border-[#383838]'
            )}
          >
            {(substituentPiSum >= 0 ? '+' : '') + substituentPiSum.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Hansch Substituent Modifiers */}
      <div className="p-4 bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-neutral-300">
            {t.hanschTitle}
          </span>
          <span className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">
            {t.hanschRule}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {HANSCH_SUBSTITUENTS.map((sub) => {
            const count = activeSubstituents[sub.id] || 0;
            const subName = activeLocale === 'ar' ? sub.nameAr : activeLocale === 'en' ? (sub.nameEn || sub.nameTr) : sub.nameTr;
            return (
              <div
                key={sub.id}
                className="p-2.5 border border-slate-200 dark:border-[#333333] rounded-xl bg-slate-50 dark:bg-[#252525] flex flex-col gap-1 items-center justify-between"
              >
                <div className="text-[11px] font-mono font-semibold text-center">
                  <span className="text-slate-900 dark:text-[#ECECEC]">{subName}</span>
                  <span
                    className={clsx(
                      'block text-[10px]',
                      sub.pi > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'
                    )}
                  >
                    π = {sub.pi > 0 ? `+${sub.pi}` : sub.pi}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-1" dir="ltr">
                  <button
                    type="button"
                    disabled={disabled || count === 0}
                    onClick={() => handleSubstituentChange(sub.id, -1)}
                    className="w-6 h-6 flex items-center justify-center font-mono font-bold text-xs bg-white dark:bg-[#333333] border border-slate-300 dark:border-[#444444] rounded-md hover:bg-slate-100 dark:hover:bg-[#3C3C3C] text-slate-800 dark:text-white disabled:opacity-30 transition-colors"
                  >
                    -
                  </button>
                  <span className="font-mono text-xs font-semibold w-4 text-center text-slate-800 dark:text-neutral-200">{count}</span>
                  <button
                    type="button"
                    disabled={disabled || count >= 3}
                    onClick={() => handleSubstituentChange(sub.id, 1)}
                    className="w-6 h-6 flex items-center justify-center font-mono font-bold text-xs bg-white dark:bg-[#333333] border border-slate-300 dark:border-[#444444] rounded-md hover:bg-slate-100 dark:hover:bg-[#3C3C3C] text-slate-800 dark:text-white disabled:opacity-30 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sliders: Base logP, pKa (if not neutral), pH */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl shadow-xs">
        <Slider
          label={t.baseLogPLabel}
          value={baseLogP}
          min={-2.0}
          max={6.0}
          step={0.1}
          onChange={handleBaseLogPChange}
          disabled={disabled}
        />
        <Slider
          label={t.pKaLabel}
          value={pKa}
          min={1.0}
          max={12.0}
          step={0.1}
          onChange={handlePkaChange}
          disabled={disabled || compoundType === 'neutral'}
        />
        <Slider
          label={t.pHLabel}
          value={pH}
          min={1.0}
          max={10.0}
          step={0.1}
          onChange={handlePhChange}
          disabled={disabled}
        />
      </div>

      {/* Lipinski Rule of 5 Warning Banner */}
      {isLipinskiViolated && (
        <div
          role="alert"
          className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-xl text-amber-900 dark:text-amber-200 text-xs font-mono font-semibold flex items-center justify-between"
        >
          <span>
            {t.lipinskiWarning(effectiveLogP)}
          </span>
          <TechnicalTermBadge term="Lipinski Rule of 5" />
        </div>
      )}

      {/* SVG Membrane Cross-Section & Particle Partition Visualizer (Strict LTR Isolation) */}
      <div
        className="w-full bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl shadow-xs p-4 space-y-3"
        dir="ltr"
      >
        <div className="flex items-center justify-between text-xs font-mono font-semibold">
          <span className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400">
            <span className="w-3 h-3 bg-blue-500 rounded-sm inline-block" />
            {t.aqueousLegend(aqueousCount)}
          </span>
          <span className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
            <span className="w-3 h-3 bg-amber-500 rounded-sm inline-block" />
            {t.lipidLegend(lipidCount)}
          </span>
        </div>

        <svg
          viewBox="0 0 500 180"
          className="w-full h-auto select-none border border-slate-200 dark:border-[#2F2F2F] rounded-xl bg-slate-50 dark:bg-[#171717]"
          role="img"
          aria-label={t.svgAria}
        >
          {/* Upper Aqueous Phase */}
          <rect x="0" y="0" width="500" height="45" fill="#3B82F6" fillOpacity="0.08" />
          <text x="25" y="22" fontSize="10" fontFamily="monospace" fontWeight="600" fill="#2563EB">
            {t.donorCompartment}
          </text>

          {/* Lipid Bilayer */}
          <rect x="0" y="45" width="500" height="90" fill="#F59E0B" fillOpacity="0.10" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />

          {/* Upper polar head leaflet */}
          {Array.from({ length: 25 }).map((_, i) => (
            <circle key={`top-head-${i}`} cx={10 + i * 20} cy="48" r="4.5" fill="#3B82F6" stroke="#2563EB" strokeWidth="1" />
          ))}

          {/* Lower polar head leaflet */}
          {Array.from({ length: 25 }).map((_, i) => (
            <circle key={`bottom-head-${i}`} cx={10 + i * 20} cy="132" r="4.5" fill="#3B82F6" stroke="#2563EB" strokeWidth="1" />
          ))}

          {/* Hydrocarbon lipid tails */}
          {Array.from({ length: 25 }).map((_, i) => {
            const x = 10 + i * 20;
            return (
              <g key={`tails-${i}`}>
                <line x1={x - 2} y1="52" x2={x - 2} y2="85" stroke="#D97706" strokeWidth="1.2" />
                <line x1={x + 2} y1="52" x2={x + 2} y2="85" stroke="#D97706" strokeWidth="1.2" />
                <line x1={x - 2} y1="128" x2={x - 2} y2="95" stroke="#D97706" strokeWidth="1.2" />
                <line x1={x + 2} y1="128" x2={x + 2} y2="95" stroke="#D97706" strokeWidth="1.2" />
              </g>
            );
          })}

          {/* Lower Aqueous Phase */}
          <rect x="0" y="135" width="500" height="45" fill="#10B981" fillOpacity="0.08" />
          <text x="25" y="160" fontSize="10" fontFamily="monospace" fontWeight="600" fill="#059669">
            {t.acceptorCompartment}
          </text>

          {/* Render Partitioned Molecules in Aqueous (top and bottom) */}
          {Array.from({ length: aqueousCount }).map((_, i) => {
            const isTop = i % 2 === 0;
            const x = 40 + ((i * 37) % 420);
            const y = isTop ? 15 + ((i * 13) % 20) : 145 + ((i * 11) % 20);
            return (
              <circle
                key={`aq-${i}`}
                cx={x}
                cy={y}
                r="4.5"
                fill="#3B82F6"
                stroke="#2563EB"
                strokeWidth="1"
              />
            );
          })}

          {/* Render Partitioned Molecules in Lipid Core */}
          {Array.from({ length: lipidCount }).map((_, i) => {
            const x = 30 + ((i * 31) % 440);
            const y = 70 + ((i * 17) % 40);
            return (
              <circle
                key={`lip-${i}`}
                cx={x}
                cy={y}
                r="5"
                fill="#F59E0B"
                stroke="#B45309"
                strokeWidth="1.2"
              />
            );
          })}

          {/* Diffusion Flux Vector Indicator */}
          {membraneFlux > 10 && (
            <g>
              <line x1="470" y1="20" x2="470" y2="155" stroke="#10B981" strokeWidth={membraneFlux > 50 ? '3' : '1.5'} strokeDasharray="4 2" />
              <polygon points="470,165 464,153 476,153" fill="#10B981" />
              <text x="460" y="90" fontSize="9" fontFamily="monospace" fill="#059669" fontWeight="bold" textAnchor="end">
                {t.flux(membraneFlux)}
              </text>
            </g>
          )}
        </svg>

        {/* Readout Summary Grid */}
        <div
          aria-live="polite"
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-200 dark:border-[#2F2F2F] text-xs font-mono text-center"
        >
          <div className="bg-slate-50 dark:bg-[#252525] p-3 border border-slate-200 dark:border-[#333333] rounded-xl">
            <span className="text-[10px] text-slate-500 dark:text-neutral-400 block uppercase font-medium">
              {t.effectiveLogP}
            </span>
            <strong className="text-sm font-bold text-slate-900 dark:text-[#ECECEC]">{effectiveLogP.toFixed(2)}</strong>
          </div>

          <div className="bg-slate-50 dark:bg-[#252525] p-3 border border-slate-200 dark:border-[#333333] rounded-xl">
            <span className="text-[10px] text-slate-500 dark:text-neutral-400 block uppercase font-medium">
              {t.physioLogD}
            </span>
            <strong className="text-sm font-bold text-amber-600 dark:text-amber-400">
              {calculatedLogD.toFixed(2)}
            </strong>
          </div>

          <div className="bg-slate-50 dark:bg-[#252525] p-3 border border-slate-200 dark:border-[#333333] rounded-xl">
            <span className="text-[10px] text-slate-500 dark:text-neutral-400 block uppercase font-medium">
              {t.membranePermeability}
            </span>
            <strong className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {membraneFlux}%
            </strong>
          </div>

          <div className="bg-slate-50 dark:bg-[#252525] p-3 border border-slate-200 dark:border-[#333333] rounded-xl">
            <span className="text-[10px] text-slate-500 dark:text-neutral-400 block uppercase font-medium">
              {t.bbbPermeability}
            </span>
            <span
              className={clsx(
                'text-[10px] font-semibold block mt-0.5',
                bbbStatus.level === 'high'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : bbbStatus.level === 'moderate'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-amber-700 dark:text-amber-400'
              )}
            >
              {activeLocale === 'ar' ? bbbStatus.statusAr : activeLocale === 'en' ? bbbStatus.statusEn : bbbStatus.statusTr}
            </span>
          </div>
        </div>
      </div>

      {/* Model Illustration Notice */}
      <ModelIllustrationNotice
        locale={activeLocale}
        equation={
          compoundType === 'acid'
            ? t.equationAcid
            : compoundType === 'base'
            ? t.equationBase
            : t.equationNeutral
        }
        sourceReference="Hansch, C. & Leo, A. (1979) Substituent Constants for Correlation Analysis in Chemistry and Biology; Lipinski, C.A. et al. (1997) Advanced Drug Delivery Reviews"
        assumptions={t.modelAssumptions}
      />
    </Card>
  );
};
