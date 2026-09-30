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
  formula: string;
  pi: number;
}

export const HANSCH_SUBSTITUENTS: Substituent[] = [
  { id: 'methyl', nameTr: 'Metil (-CH₃)', nameAr: 'ميثيل (-CH₃)', formula: '-CH₃', pi: 0.52 },
  { id: 'chloro', nameTr: 'Kloro (-Cl)', nameAr: 'كلورو (-Cl)', formula: '-Cl', pi: 0.71 },
  { id: 'hydroxy', nameTr: 'Hidroksil (-OH)', nameAr: 'هيدروكسيل (-OH)', formula: '-OH', pi: -0.67 },
  { id: 'carboxy', nameTr: 'Karboksil (-COOH)', nameAr: 'كاربوكسيل (-COOH)', formula: '-COOH', pi: -0.32 },
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
  level: 'high' | 'moderate' | 'low';
} {
  if (logP > 5.0 || logD < 0.5 || logD > 4.5) {
    return {
      statusTr: 'Düşük / Geçirimsiz (KBB Geçişi Zayıf)',
      statusAr: 'ضعيفة أو غير نافذة (عبور KBB ضعيف)',
      level: 'low',
    };
  }
  if (logD >= 1.5 && logD <= 3.5) {
    return {
      statusTr: 'Yüksek (KBB Geçişi Optimum)',
      statusAr: 'عالية (عبور KBB مثالي)',
      level: 'high',
    };
  }
  return {
    statusTr: 'Orta (Kısmi KBB Geçişi)',
    statusAr: 'متوسطة (عبور KBB جزئي)',
    level: 'moderate',
  };
}

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
  const activeLocale = propLocale || config?.locale || 'tr';
  const isAr = activeLocale === 'ar';

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
      className={clsx(
        'w-full flex flex-col gap-4 text-black dark:text-slate-100',
        className
      )}
    >
      {/* Header */}
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <StickerBadge variant="orange" size="sm">
              {isAr ? 'محاكي التقسيم الغشائي' : 'Membran Partisyon Simülatörü'}
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
          {config?.title ||
            (isAr
              ? 'محاكاة توزيع الدواء عبر الغشاء الدهني وحساب logP و logD'
              : 'Lipit Membran Partisyonu ve logP / logD Dağılım Simülatörü')}
        </h3>

        <p className="text-xs font-body text-gray-700 dark:text-gray-300">
          {config?.prompt ||
            (isAr
              ? 'دراسة نفاذية الدواء عبر الغشاء الدهني اعتماداً على lipofiliklik (logP) وتأثير pH الوسط على معامل التوزيع (logD).'
              : 'Lipofiliklik (logP) ve ortam pH bağımlı dağılım katsayısının (logD) pasif transselüler membran geçişine etkisini simüle edin.')}
        </p>
      </div>

      {/* Compound Type Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 bg-gray-50 dark:bg-[#131B2A] border-2 border-black dark:border-slate-700">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase text-gray-800 dark:text-slate-200">
            {isAr ? 'نوع المركب:' : 'Bileşik Türü:'}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={disabled}
              onClick={() => handleCompoundTypeChange('acid')}
              className={clsx(
                'px-3 py-1 text-xs font-mono font-bold uppercase border-2 border-black dark:border-slate-700 transition-all',
                compoundType === 'acid'
                  ? 'bg-[#FFD93D] text-black shadow-[2px_2px_0px_#000000]'
                  : 'bg-white dark:bg-[#1E293B] text-black dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
              )}
            >
              {isAr ? 'Zayıf Asit (حمض ضعيف)' : 'Zayıf Asit (Acid)'}
            </button>
            <button
              type="button"
              disabled={disabled}
              onClick={() => handleCompoundTypeChange('base')}
              className={clsx(
                'px-3 py-1 text-xs font-mono font-bold uppercase border-2 border-black dark:border-slate-700 transition-all',
                compoundType === 'base'
                  ? 'bg-[#6BCB77] text-black shadow-[2px_2px_0px_#000000]'
                  : 'bg-white dark:bg-[#1E293B] text-black dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
              )}
            >
              {isAr ? 'Zayıf Baz (قاعدة ضعيفة)' : 'Zayıf Baz (Base)'}
            </button>
            <button
              type="button"
              disabled={disabled}
              onClick={() => handleCompoundTypeChange('neutral')}
              className={clsx(
                'px-3 py-1 text-xs font-mono font-bold uppercase border-2 border-black dark:border-slate-700 transition-all',
                compoundType === 'neutral'
                  ? 'bg-[#4D96FF] text-white shadow-[2px_2px_0px_#000000]'
                  : 'bg-white dark:bg-[#1E293B] text-black dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
              )}
            >
              {isAr ? 'Nötr (مركب غير قابل للتأين)' : 'Nötr (Neutral)'}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono" dir="ltr">
          <span className="font-bold text-gray-600 dark:text-slate-400">Total π Shift:</span>
          <span
            className={clsx(
              'px-2 py-0.5 border border-black/30 dark:border-slate-600 font-bold',
              substituentPiSum > 0
                ? 'bg-amber-100 text-amber-900'
                : substituentPiSum < 0
                ? 'bg-blue-100 text-blue-900'
                : 'bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-slate-200'
            )}
          >
            {(substituentPiSum >= 0 ? '+' : '') + substituentPiSum.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Hansch Substituent Modifiers */}
      <div className="p-3 bg-white dark:bg-[#131B2A] border-2 border-black dark:border-slate-700 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
            {isAr ? 'إضافة المجموعات الوظيفية (Hansch π):' : 'Hansch Sübstitüent Ekleme (π Sabiti):'}
          </span>
          <span className="text-[11px] font-mono text-gray-500 dark:text-slate-400">
            Hansch Additivity Rule
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {HANSCH_SUBSTITUENTS.map((sub) => {
            const count = activeSubstituents[sub.id] || 0;
            return (
              <div
                key={sub.id}
                className="p-2 border border-black/30 dark:border-slate-700 bg-gray-50 dark:bg-[#1E293B] flex flex-col gap-1 items-center justify-between"
              >
                <div className="text-[11px] font-mono font-bold text-center">
                  <span>{isAr ? sub.nameAr : sub.nameTr}</span>
                  <span
                    className={clsx(
                      'block text-[10px]',
                      sub.pi > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'
                    )}
                  >
                    π = {sub.pi > 0 ? `+${sub.pi}` : sub.pi}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 mt-1">
                  <button
                    type="button"
                    disabled={disabled || count === 0}
                    onClick={() => handleSubstituentChange(sub.id, -1)}
                    className="w-5 h-5 flex items-center justify-center font-mono font-bold text-xs bg-white dark:bg-slate-700 border border-black dark:border-slate-600 disabled:opacity-30"
                  >
                    -
                  </button>
                  <span className="font-mono text-xs font-bold w-4 text-center">{count}</span>
                  <button
                    type="button"
                    disabled={disabled || count >= 3}
                    onClick={() => handleSubstituentChange(sub.id, 1)}
                    className="w-5 h-5 flex items-center justify-center font-mono font-bold text-xs bg-white dark:bg-slate-700 border border-black dark:border-slate-600 disabled:opacity-30"
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-gray-50 dark:bg-[#131B2A] border-2 border-black dark:border-slate-700">
        <Slider
          label={isAr ? 'الأساسي (logP)' : 'Temel logP (Oktanol/Su)'}
          value={baseLogP}
          min={-2.0}
          max={6.0}
          step={0.1}
          onChange={handleBaseLogPChange}
          disabled={disabled}
        />
        <Slider
          label={isAr ? 'ثابت التأين (pKa)' : 'İyonizasyon (pKa)'}
          value={pKa}
          min={1.0}
          max={12.0}
          step={0.1}
          onChange={handlePkaChange}
          disabled={disabled || compoundType === 'neutral'}
        />
        <Slider
          label={isAr ? 'pH الوسط المائي' : 'Sulu Faz pH'}
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
          className="p-2.5 bg-amber-500/20 border-2 border-amber-600 text-amber-950 dark:text-amber-200 text-xs font-mono font-bold flex items-center justify-between"
        >
          <span>
            ⚠️ {isAr ? 'تحذير قاعدة ليبينسكي 5:' : 'Lipinski 5 Kuralı Uyarısı:'}{' '}
            {effectiveLogP} &gt; 5.0 (Aşırı lipofilik, zayıf sulu çözünürlük)
          </span>
          <TechnicalTermBadge term="Lipinski Rule of 5" />
        </div>
      )}

      {/* SVG Membrane Cross-Section & Particle Partition Visualizer (Strict LTR Isolation) */}
      <div
        className="w-full bg-white dark:bg-[#131B2A] border-3 border-black dark:border-slate-700 shadow-neo dark:shadow-neo-dark p-3.5 space-y-3"
        dir="ltr"
      >
        <div className="flex items-center justify-between text-xs font-mono font-bold">
          <span className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400">
            <span className="w-3.5 h-3.5 bg-blue-500 border border-black inline-block" />
            Sulu Faz (Aqueous): {aqueousCount} Molekül
          </span>
          <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
            <span className="w-3.5 h-3.5 bg-amber-500 border border-black inline-block" />
            Lipit Çift Tabaka Çekirdeği: {lipidCount} Molekül
          </span>
        </div>

        <svg
          viewBox="0 0 500 180"
          className="w-full h-auto select-none border-2 border-black dark:border-slate-700 bg-[#F8FAFC] dark:bg-[#0B0F17]"
          role="img"
          aria-label="Membrane lipid partition cross section"
        >
          {/* Upper Aqueous Phase */}
          <rect x="0" y="0" width="500" height="45" fill="#3B82F6" fillOpacity="0.12" />
          <text x="25" y="22" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#1D4ED8">
            Dış Sulu Ortam (Donor Kompartmanı)
          </text>

          {/* Lipid Bilayer */}
          <rect x="0" y="45" width="500" height="90" fill="#F59E0B" fillOpacity="0.16" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />

          {/* Upper polar head leaflet */}
          {Array.from({ length: 25 }).map((_, i) => (
            <circle key={`top-head-${i}`} cx={10 + i * 20} cy="48" r="4.5" fill="#3B82F6" stroke="#000" strokeWidth="1" />
          ))}

          {/* Lower polar head leaflet */}
          {Array.from({ length: 25 }).map((_, i) => (
            <circle key={`bottom-head-${i}`} cx={10 + i * 20} cy="132" r="4.5" fill="#3B82F6" stroke="#000" strokeWidth="1" />
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
          <rect x="0" y="135" width="500" height="45" fill="#10B981" fillOpacity="0.10" />
          <text x="25" y="160" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#047857">
            İç Hücresel / Alıcı Faz (Acceptor Kompartmanı)
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
                stroke="#000000"
                strokeWidth="1.2"
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
                r="5.5"
                fill="#F59E0B"
                stroke="#000000"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Diffusion Flux Vector Indicator */}
          {membraneFlux > 10 && (
            <g>
              <line x1="470" y1="20" x2="470" y2="155" stroke="#10B981" strokeWidth={membraneFlux > 50 ? '3.5' : '2'} strokeDasharray="4 2" />
              <polygon points="470,165 464,153 476,153" fill="#10B981" />
              <text x="460" y="90" fontSize="9" fontFamily="monospace" fill="#10B981" fontWeight="bold" textAnchor="end">
                Flux: {membraneFlux}%
              </text>
            </g>
          )}
        </svg>

        {/* Readout Summary Grid */}
        <div
          aria-live="polite"
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-black/10 dark:border-slate-800 text-xs font-mono text-center"
        >
          <div className="bg-gray-50 dark:bg-[#1E293B] p-2 border border-black/20 dark:border-slate-700">
            <span className="text-[10px] text-gray-600 dark:text-slate-400 block uppercase">
              {isAr ? 'مجموع logP' : 'Efektif logP'}
            </span>
            <strong className="text-sm font-bold">{effectiveLogP.toFixed(2)}</strong>
          </div>

          <div className="bg-gray-50 dark:bg-[#1E293B] p-2 border border-black/20 dark:border-slate-700">
            <span className="text-[10px] text-gray-600 dark:text-slate-400 block uppercase">
              {isAr ? 'معامل التوزيع (logD)' : 'Fizyolojik logD'}
            </span>
            <strong className="text-sm font-bold text-amber-600 dark:text-amber-400">
              {calculatedLogD.toFixed(2)}
            </strong>
          </div>

          <div className="bg-gray-50 dark:bg-[#1E293B] p-2 border border-black/20 dark:border-slate-700">
            <span className="text-[10px] text-gray-600 dark:text-slate-400 block uppercase">
              {isAr ? 'نفاذية الغشاء' : 'Membran Geçirgenliği'}
            </span>
            <strong className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {membraneFlux}%
            </strong>
          </div>

          <div className="bg-gray-50 dark:bg-[#1E293B] p-2 border border-black/20 dark:border-slate-700">
            <span className="text-[10px] text-gray-600 dark:text-slate-400 block uppercase">
              {isAr ? 'نفاذية KBB' : 'KBB Geçirgenliği'}
            </span>
            <span
              className={clsx(
                'text-[10px] font-bold block mt-0.5',
                bbbStatus.level === 'high'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : bbbStatus.level === 'moderate'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-amber-600 dark:text-amber-400'
              )}
            >
              {isAr ? bbbStatus.statusAr : bbbStatus.statusTr}
            </span>
          </div>
        </div>
      </div>

      {/* Model Illustration Notice */}
      <ModelIllustrationNotice
        equation={
          compoundType === 'acid'
            ? 'logD = logP - log10(1 + 10^(pH - pKa))   [Asidik İyonlaşma Modeli]'
            : compoundType === 'base'
            ? 'logD = logP - log10(1 + 10^(pKa - pH))   [Bazik İyonlaşma Modeli]'
            : 'logD = logP   [Nötr Moleküler Partisyon]'
        }
        sourceReference="Hansch, C. & Leo, A. (1979) Substituent Constants for Correlation Analysis in Chemistry and Biology; Lipinski, C.A. et al. (1997) Advanced Drug Delivery Reviews"
        assumptions={[
          'Oktanol fazı hücresel lipit çift tabakanın hidrofobik çekirdeğini temsil eder',
          'Sübstitüent lipofiliklik katkıları Hansch eşitliği uyarınca toplanabilirdir (logP_toplam = logP_temel + Σπ)',
          'Yalnızca iyonize olmamış türler oktanol/lipit çekirdeğe partisyon eder (pH bölme hipotezi)',
          'Membran geçirgenliği aşırı lipofiliklik durumunda (logP > 5.0) sulu faz çözünme kısıtlamasına uğrar',
        ]}
      />
    </Card>
  );
};
