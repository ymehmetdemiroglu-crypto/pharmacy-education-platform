import React, { useState, useId } from 'react';
import { ReceptorOperationalConfig, ReceptorOperationalConfigSchema } from './schema';
import { BaseWidgetProps, calculateBlackLeffEffect } from '../types';

export interface ReceptorOperationalModelProps extends BaseWidgetProps<ReceptorOperationalConfig> {
  onParamChange?: (tau: number, KA: number, ec50: number) => void;
}

const STRINGS = {
  tr: {
    badge: 'Black-Leff Operasyonel Agonizma Modeli',
    title: 'Yedek Reseptör & Operasyonel Etkinlik (τ)',
    presetFull: 'Tam Agonist (τ=10)',
    presetPartial: 'Parsiyel Agonist (τ=0.8)',
    presetBlockade: '%80 Blokaj (Kovalent)',
    plotTitle: 'Doz-Yanıt Eğrisi (Black-Leff 1983)',
    target: (receptor: string) => `Hedef: ${receptor}`,
    plotAria: 'Black-Leff Doz-Yanıt Eğrisi Grafiği',
    xAxisLabel: '[Agonist Derişimi] (M, logaritmik)',
    panelTitle: 'Canlı Hesaplama Paneli',
    emaxLabel: 'Gözlenen Maksimal Etki (Emax):',
    ec50Label: 'Operasyonel Potens (EC50):',
    occupancyLabel: "EC50'deki Reseptör Doluluk Oranı (ρ):",
    occupancyVal: (val: string) => `%${val}`,
    spareHigh: (pct: string) => `★ Yüksek Yedek Rezerv: %${pct} reseptör boşta!`,
    spareMid: (pct: string) => `Yedek Rezerv: %${pct}`,
    spareZero: '⚠ Sıfır Yedek Rezerv: Parsiyel Agonist davranışı!',
    footnote: 'τ = [Rt] / KE. τ yükseldikçe EC50 sola kayar ve maksimum yanıt için daha az reseptör doluluğu yeterli olur.',
    controlsTitle: 'Model Parametre Denetleyicileri',
    paramTau: 'Operasyonel Etkinlik (τ):',
    tauAria: 'Operasyonel Etkinlik tau ayarı',
    tauDecAria: 'tau değerini 0.5 azalt',
    tauIncAria: 'tau değerini 0.5 artır',
    paramLogKA: 'Ayrışma Sabiti (log KA):',
    logKAAria: 'log KA afinite ayarı',
    logKADecAria: 'log KA değerini 0.2 azalt',
    logKAIncAria: 'log KA değerini 0.2 artır',
    paramBlockade: 'Kovalent Blokaj (Rezerv Kaybı):',
    blockadeVal: (pct: number) => `%${pct}`,
    blockadeAria: 'Kovalent blokaj yüzdesi ayarı',
    blockadeDecAria: 'Blokajı yüzde 10 azalt',
    blockadeIncAria: 'Blokajı yüzde 10 artır',
    noticeLabel: 'Model İllüstrasyonu Notu:',
    noticeText: (ref: string) =>
      "Black & Leff operasyonel modelinde (1983) agonist yanıtı Effect = (Emax · τⁿ · [A]ⁿ) / ((KA + [A])ⁿ + τⁿ · [A]ⁿ) kapalı formülüyle hesaplanır. Operasyonel etkinlik τ = [Rt] / KE doku reseptör yoğunluğu [Rt] ile orantılıdır. Yüksek τ değerinde sistemde yedek reseptör bulunur ve EC50 = KA / (1 + τ) afinite sabiti KA'dan çok daha düşüktür. Referans: " + ref,
  },
  en: {
    badge: 'Black-Leff Operational Model of Agonism',
    title: 'Spare Receptors & Operational Efficacy (τ)',
    presetFull: 'Full Agonist (τ=10)',
    presetPartial: 'Partial Agonist (τ=0.8)',
    presetBlockade: '80% Blockade (Covalent)',
    plotTitle: 'Dose-Response Curve (Black-Leff 1983)',
    target: (receptor: string) => `Target: ${receptor}`,
    plotAria: 'Black-Leff Dose-Response Curve Plot',
    xAxisLabel: '[Agonist Concentration] (M, logarithmic)',
    panelTitle: 'Live Derivation Panel',
    emaxLabel: 'Observed Maximal Effect (Emax):',
    ec50Label: 'Operational Potency (EC50):',
    occupancyLabel: 'Receptor Occupancy at EC50 (ρ):',
    occupancyVal: (val: string) => `${val}%`,
    spareHigh: (pct: string) => `★ High Spare Reserve: ${pct}% receptors uncoupled!`,
    spareMid: (pct: string) => `Spare Reserve: ${pct}%`,
    spareZero: '⚠ Zero Spare Reserve: Partial Agonist behavior!',
    footnote: 'τ = [Rt] / KE. As τ increases, EC50 shifts leftward and less receptor occupancy is required for maximum response.',
    controlsTitle: 'Model Parameter Controllers',
    paramTau: 'Operational Efficacy (τ):',
    tauAria: 'Operational efficacy tau adjustment',
    tauDecAria: 'Decrease tau by 0.5',
    tauIncAria: 'Increase tau by 0.5',
    paramLogKA: 'Dissociation Constant (log KA):',
    logKAAria: 'log KA affinity adjustment',
    logKADecAria: 'Decrease log KA by 0.2',
    logKAIncAria: 'Increase log KA by 0.2',
    paramBlockade: 'Covalent Blockade (Reserve Depletion):',
    blockadeVal: (pct: number) => `${pct}%`,
    blockadeAria: 'Covalent blockade percentage adjustment',
    blockadeDecAria: 'Decrease blockade by 10%',
    blockadeIncAria: 'Increase blockade by 10%',
    noticeLabel: 'Model Illustration Notice:',
    noticeText: (ref: string) =>
      'In the Black & Leff operational model (1983), agonist response is calculated via Effect = (Emax · τⁿ · [A]ⁿ) / ((KA + [A])ⁿ + τⁿ · [A]ⁿ). Operational efficacy τ = [Rt] / KE is proportional to tissue receptor density [Rt]. At high τ, spare receptors exist and EC50 = KA / (1 + τ) is substantially lower than affinity constant KA. Reference: ' + ref,
  },
  ar: {
    badge: 'نموذج بلاك-ليف التشغيلي للألفة والفاعلية',
    title: 'المستقبلات الفائضة والفاعلية التشغيلية (τ)',
    presetFull: 'ناهض كامل (τ=10)',
    presetPartial: 'ناهض جزئي (τ=0.8)',
    presetBlockade: 'حصار 80% (تساهمي)',
    plotTitle: 'منحنى الجرعة والاستجابة (بلاك-ليف 1983)',
    target: (receptor: string) => `الهدف: ${receptor}`,
    plotAria: 'مخطط منحنى الجرعة والاستجابة لبلاك-ليف',
    xAxisLabel: '[تركيز الناهض] (مولار، لوغاريتمي)',
    panelTitle: 'لوحة الحسابات الحية',
    emaxLabel: 'التأثير الأقصى الملاحظ (Emax):',
    ec50Label: 'القوة التشغيلية (EC50):',
    occupancyLabel: 'نسبة إشغال المستقبلات عند EC50 (ρ):',
    occupancyVal: (val: string) => `%${val}`,
    spareHigh: (pct: string) => `★ فائض مستقبلات مرتفع: %${pct} من المستقبلات غير مقترنة!`,
    spareMid: (pct: string) => `الفائض الاحتياطي: %${pct}`,
    spareZero: '⚠ لا يوجد فائض احتياطي: سلوك ناهض جزئي!',
    footnote: 'τ = [Rt] / KE. كلما زادت قيمة τ، ينزاح EC50 نحو اليسار ويكفي إشغال عدد أقل من المستقبلات لبلوغ الاستجابة القصوى.',
    controlsTitle: 'عناصر التحكم في معاملات النموذج',
    paramTau: 'الفاعلية التشغيلية (τ):',
    tauAria: 'ضبط الفاعلية التشغيلية تاو',
    tauDecAria: 'تقليل تاو بمقدار 0.5',
    tauIncAria: 'زيادة تاو بمقدار 0.5',
    paramLogKA: 'ثابت التفكك (log KA):',
    logKAAria: 'ضبط ألفة log KA',
    logKADecAria: 'تقليل log KA بمقدار 0.2',
    logKAIncAria: 'زيادة log KA بمقدار 0.2',
    paramBlockade: 'الحصار التساهمي (فقد الاحتياطي):',
    blockadeVal: (pct: number) => `%${pct}`,
    blockadeAria: 'ضبط نسبة الحصار التساهمي',
    blockadeDecAria: 'تقليل الحصار بنسبة 10%',
    blockadeIncAria: 'زيادة الحصار بنسبة 10%',
    noticeLabel: 'ملاحظة نموذج المحاكاة التوضيحي:',
    noticeText: (ref: string) =>
      'في نموذج بلاك وليف التشغيلي (1983)، تُحسب استجابة الناهض بواسطة المعادلة: Effect = (Emax · τⁿ · [A]ⁿ) / ((KA + [A])ⁿ + τⁿ · [A]ⁿ). الفاعلية التشغيلية τ = [Rt] / KE تتناسب طردياً مع كثافة المستقبلات النسيجية [Rt]. عند القيم العالية لـ τ، تتواجد مستقبلات فائضة ويكون EC50 = KA / (1 + τ) أقل بكثير من ثابت الألفة KA. المرجع: ' + ref,
  },
};

export const ReceptorOperationalModel: React.FC<ReceptorOperationalModelProps> = ({
  config: rawConfig,
  locale = 'tr',
  className = '',
  onParamChange,
}) => {
  const t = STRINGS[locale] ?? STRINGS.tr;
  const isRtl = locale === 'ar';
  const config = ReceptorOperationalConfigSchema.parse(rawConfig || {});
  
  // Interactive parameters
  const [tau, setTau] = useState<number>(config.defaultTau);
  const [logKA, setLogKA] = useState<number>(config.defaultLogKA); // e.g. -6 => KA = 10^-6 M = 1 uM
  const [slopeN, setSlopeN] = useState<number>(config.defaultSlopeN);
  const [blockadePercent, setBlockadePercent] = useState<number>(0); // Irreversible alkylation (0 to 90%)

  const headingId = useId();

  // Effective tau after irreversible receptor reserve depletion
  const effectiveTau = Math.max(0.01, tau * (1 - blockadePercent / 100));
  const KA = Math.pow(10, logKA);

  // Closed-form mathematical derivations
  // Emax_obs = Emax * (tau^n) / (1 + tau^n)
  const tauPowN = Math.pow(effectiveTau, slopeN);
  const observedEmax = (config.systemEmax * tauPowN) / (1 + tauPowN);

  // EC50 = KA / ((2 + tau^n)^(1/n) - 1)
  const ec50 = slopeN === 1
    ? KA / (1 + effectiveTau)
    : KA / (Math.pow(2 + tauPowN, 1 / slopeN) - 1);
  const logEC50 = Math.log10(ec50);

  // Occupancy at EC50: rho = [A] / (KA + [A]) = EC50 / (KA + EC50)
  const occupancyAtEC50 = (ec50 / (KA + ec50)) * 100;
  // Spare receptor reserve at 50% response: 100% - occupancy%
  const spareReceptorPercent = Math.max(0, 100 - occupancyAtEC50);

  // Generate SVG curve points across 8 log concentration units (-10 to -2)
  const minLogConc = -10;
  const maxLogConc = -2;
  const numPoints = 60;
  const points: { logC: number; effect: number }[] = [];

  for (let i = 0; i <= numPoints; i++) {
    const logC = minLogConc + (i / numPoints) * (maxLogConc - minLogConc);
    const conc = Math.pow(10, logC);
    const effect = calculateBlackLeffEffect(conc, effectiveTau, KA, slopeN, config.systemEmax);
    points.push({ logC, effect });
  }

  // SVG dimensions
  const svgWidth = 500;
  const svgHeight = 240;
  const padding = { top: 20, right: 30, bottom: 40, left: 50 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  const toSvgX = (logC: number) =>
    padding.left + ((logC - minLogConc) / (maxLogConc - minLogConc)) * plotWidth;
  const toSvgY = (effect: number) =>
    padding.top + plotHeight - (effect / config.systemEmax) * plotHeight;

  const pathD = points
    .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${toSvgX(pt.logC).toFixed(1)} ${toSvgY(pt.effect).toFixed(1)}`)
    .join(' ');

  // EC50 visual marker coordinates
  const ec50X = toSvgX(Math.max(minLogConc, Math.min(maxLogConc, logEC50)));
  const ec50Y = toSvgY(observedEmax / 2);

  // Presets
  const applyPreset = (presetTau: number, presetLogKA: number, presetBlockade: number) => {
    setTau(presetTau);
    setLogKA(presetLogKA);
    setBlockadePercent(presetBlockade);
  };

  return (
    <section
      role="region"
      aria-labelledby={headingId}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`p-6 bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl shadow-xs max-w-3xl mx-auto font-sans text-slate-900 dark:text-[#ECECEC] text-start ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-[#2F2F2F] gap-2">
        <div>
          <span className="inline-block text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-2.5 py-0.5 border border-emerald-200 dark:border-emerald-800/60 rounded-md mb-1">
            {t.badge}
          </span>
          <h3 id={headingId} className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-[#ECECEC]">
            {t.title}
          </h3>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => applyPreset(10.0, -6.0, 0)}
            data-testid="preset-full-agonist"
            className="px-2.5 py-1 bg-white dark:bg-[#252525] border border-slate-200 dark:border-[#383838] rounded-lg font-semibold text-xs text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-[#2C2C2C] shadow-2xs"
          >
            {t.presetFull}
          </button>
          <button
            type="button"
            onClick={() => applyPreset(0.8, -6.0, 0)}
            data-testid="preset-partial-agonist"
            className="px-2.5 py-1 bg-white dark:bg-[#252525] border border-slate-200 dark:border-[#383838] rounded-lg font-semibold text-xs text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-[#2C2C2C] shadow-2xs"
          >
            {t.presetPartial}
          </button>
          <button
            type="button"
            onClick={() => applyPreset(10.0, -6.0, 80)}
            data-testid="preset-depleted-reserve"
            className="px-2.5 py-1 bg-white dark:bg-[#252525] border border-slate-200 dark:border-[#383838] rounded-lg font-semibold text-xs text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-[#2C2C2C] shadow-2xs"
          >
            {t.presetBlockade}
          </button>
        </div>
      </div>

      {/* Main Interactive Graph & Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* SVG Curve Plot (2 cols) */}
        <div className="md:col-span-2 bg-slate-50 dark:bg-[#171717] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl p-4 flex flex-col items-center">
          <div className="w-full flex justify-between items-center text-xs font-mono font-semibold mb-2 text-slate-800 dark:text-[#ECECEC]">
            <span>{t.plotTitle}</span>
            <span className="text-slate-400 dark:text-neutral-500">{t.target(config.targetReceptor)}</span>
          </div>

          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-xl"
            aria-label={t.plotAria}
          >
            {/* Grid & Axis Lines */}
            <line
              x1={padding.left}
              y1={padding.top}
              x2={padding.left}
              y2={padding.top + plotHeight}
              stroke="#94A3B8"
              strokeWidth="1"
            />
            <line
              x1={padding.left}
              y1={padding.top + plotHeight}
              x2={padding.left + plotWidth}
              y2={padding.top + plotHeight}
              stroke="#94A3B8"
              strokeWidth="1"
            />

            {/* Y-axis Ticks (% Effect: 0, 50, 100) */}
            {[0, 50, 100].map((val) => {
              const y = toSvgY(val);
              return (
                <g key={val}>
                  <line x1={padding.left - 5} y1={y} x2={padding.left} y2={y} stroke="#000" strokeWidth="2" />
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={padding.left + plotWidth}
                    y2={y}
                    stroke="#E0E0E0"
                    strokeDasharray="4 4"
                  />
                  <text x={padding.left - 8} y={y + 4} textAnchor="end" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    {val}%
                  </text>
                </g>
              );
            })}

            {/* X-axis Ticks (log[A]: -10, -8, -6, -4, -2) */}
            {[-10, -8, -6, -4, -2].map((val) => {
              const x = toSvgX(val);
              return (
                <g key={val}>
                  <line x1={x} y1={padding.top + plotHeight} x2={x} y2={padding.top + plotHeight + 4} stroke="#94A3B8" strokeWidth="1" />
                  <text x={x} y={padding.top + plotHeight + 16} textAnchor="middle" fontSize="10" fontFamily="monospace" className="fill-slate-600 dark:fill-slate-400">
                    10^{val}
                  </text>
                </g>
              );
            })}

            {/* Axis Labels */}
            <text x={padding.left + plotWidth / 2} y={svgHeight - 6} textAnchor="middle" fontSize="11" fontWeight="600" className="fill-slate-700 dark:fill-slate-300">
              {t.xAxisLabel}
            </text>

            {/* Observed Curve */}
            <path
              data-testid="black-leff-curve"
              d={pathD}
              fill="none"
              stroke="#10A37F"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* EC50 Guide Lines */}
            <line
              x1={ec50X}
              y1={ec50Y}
              x2={ec50X}
              y2={padding.top + plotHeight}
              stroke="#0284C7"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <line
              x1={padding.left}
              y1={ec50Y}
              x2={ec50X}
              y2={ec50Y}
              stroke="#0284C7"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />

            {/* EC50 Point Marker */}
            <circle cx={ec50X} cy={ec50Y} r="4.5" fill="#0284C7" stroke="#FFFFFF" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Calculated Biophysical Metrics (1 col) */}
        <div className="bg-slate-50 dark:bg-[#171717] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl p-4 flex flex-col justify-between shadow-xs">
          <div>
            <div className="text-xs font-semibold uppercase text-slate-500 dark:text-neutral-400 mb-2">{t.panelTitle}</div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-xl shadow-2xs">
                <div className="text-slate-500 dark:text-neutral-400 text-xs">{t.emaxLabel}</div>
                <div data-testid="metric-emax" className="text-lg font-bold text-slate-900 dark:text-[#ECECEC]">
                  {observedEmax.toFixed(1)}%
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-xl shadow-2xs">
                <div className="text-slate-500 dark:text-neutral-400 text-xs">{t.ec50Label}</div>
                <div data-testid="metric-ec50" className="text-base font-bold text-blue-600 dark:text-blue-400">
                  {(ec50 * 1e6).toFixed(2)} μM <span className="text-[10px] text-slate-400 dark:text-neutral-500">(10^{logEC50.toFixed(2)})</span>
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-xl shadow-2xs">
                <div className="text-slate-500 dark:text-neutral-400 text-xs">{t.occupancyLabel}</div>
                <div data-testid="metric-occupancy" className="text-base font-bold text-slate-900 dark:text-[#ECECEC]">
                  {t.occupancyVal(occupancyAtEC50.toFixed(1))}
                </div>
              </div>

              <div
                data-testid="spare-receptor-banner"
                className={`p-3 border rounded-xl font-medium text-xs shadow-2xs ${
                  spareReceptorPercent > 50
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/60'
                    : spareReceptorPercent > 10
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800/60'
                    : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800/60'
                }`}
              >
                {spareReceptorPercent > 50
                  ? t.spareHigh(spareReceptorPercent.toFixed(0))
                  : spareReceptorPercent > 10
                  ? t.spareMid(spareReceptorPercent.toFixed(0))
                  : t.spareZero}
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-neutral-400 leading-tight mt-3">
            {t.footnote}
          </div>
        </div>
      </div>

      {/* Interactive Controls & WCAG 2.2 Steppers */}
      <div className="p-5 bg-slate-50 dark:bg-[#171717] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl mb-4 shadow-xs">
        <div className="text-xs font-semibold uppercase text-slate-500 dark:text-neutral-400 mb-4">{t.controlsTitle}</div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Parameter 1: Operational Efficacy (tau) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs font-semibold font-mono text-slate-800 dark:text-[#ECECEC]">
              <span>{t.paramTau}</span>
              <span data-testid="value-tau" className="text-emerald-700 dark:text-emerald-400 font-bold">{tau.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="20"
              step="0.1"
              value={tau}
              onChange={(e) => setTau(parseFloat(e.target.value))}
              aria-label={t.tauAria}
              className="w-full accent-[#10A37F] cursor-pointer"
            />
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setTau((prev) => Math.max(0.1, parseFloat((prev - 0.5).toFixed(1))))}
                aria-label={t.tauDecAria}
                className="px-2.5 py-1 bg-white dark:bg-[#252525] border border-slate-200 dark:border-[#383838] rounded-lg font-mono font-semibold text-xs text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-[#2C2C2C] shadow-2xs"
              >
                -0.5
              </button>
              <button
                type="button"
                onClick={() => setTau((prev) => Math.min(20, parseFloat((prev + 0.5).toFixed(1))))}
                aria-label={t.tauIncAria}
                className="px-2.5 py-1 bg-white dark:bg-[#252525] border border-slate-200 dark:border-[#383838] rounded-lg font-mono font-semibold text-xs text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-[#2C2C2C] shadow-2xs"
              >
                +0.5
              </button>
            </div>
          </div>

          {/* Parameter 2: Affinity (logKA) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs font-semibold font-mono text-slate-800 dark:text-[#ECECEC]">
              <span>{t.paramLogKA}</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">{logKA.toFixed(1)} M</span>
            </div>
            <input
              type="range"
              min="-8"
              max="-4"
              step="0.2"
              value={logKA}
              onChange={(e) => setLogKA(parseFloat(e.target.value))}
              aria-label={t.logKAAria}
              className="w-full accent-[#10A37F] cursor-pointer"
            />
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setLogKA((prev) => Math.max(-8, parseFloat((prev - 0.2).toFixed(1))))}
                aria-label={t.logKADecAria}
                className="px-2.5 py-1 bg-white dark:bg-[#252525] border border-slate-200 dark:border-[#383838] rounded-lg font-mono font-semibold text-xs text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-[#2C2C2C] shadow-2xs"
              >
                -0.2
              </button>
              <button
                type="button"
                onClick={() => setLogKA((prev) => Math.min(-4, parseFloat((prev + 0.2).toFixed(1))))}
                aria-label={t.logKAIncAria}
                className="px-2.5 py-1 bg-white dark:bg-[#252525] border border-slate-200 dark:border-[#383838] rounded-lg font-mono font-semibold text-xs text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-[#2C2C2C] shadow-2xs"
              >
                +0.2
              </button>
            </div>
          </div>

          {/* Parameter 3: Irreversible Receptor Blockade (%) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs font-semibold font-mono text-slate-800 dark:text-[#ECECEC]">
              <span>{t.paramBlockade}</span>
              <span data-testid="value-blockade" className="text-rose-600 dark:text-rose-400 font-bold">{t.blockadeVal(blockadePercent)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="95"
              step="5"
              value={blockadePercent}
              onChange={(e) => setBlockadePercent(parseInt(e.target.value, 10))}
              aria-label={t.blockadeAria}
              className="w-full accent-rose-600 cursor-pointer"
            />
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setBlockadePercent((prev) => Math.max(0, prev - 10))}
                aria-label={t.blockadeDecAria}
                className="px-2.5 py-1 bg-white dark:bg-[#252525] border border-slate-200 dark:border-[#383838] rounded-lg font-mono font-semibold text-xs text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-[#2C2C2C] shadow-2xs"
              >
                -10%
              </button>
              <button
                type="button"
                onClick={() => setBlockadePercent((prev) => Math.min(95, prev + 10))}
                aria-label={t.blockadeIncAria}
                className="px-2.5 py-1 bg-white dark:bg-[#252525] border border-slate-200 dark:border-[#383838] rounded-lg font-mono font-semibold text-xs text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-[#2C2C2C] shadow-2xs"
              >
                +10%
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Model Illustration Notice */}
      <aside
        data-testid="model-illustration-notice"
        className="p-4 bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-xl text-xs text-slate-600 dark:text-neutral-400 font-sans leading-relaxed shadow-2xs"
      >
        <span className="font-semibold text-slate-900 dark:text-[#ECECEC] uppercase">{t.noticeLabel}</span>{' '}
        {t.noticeText(config.equationRef)}
      </aside>
    </section>
  );
};
