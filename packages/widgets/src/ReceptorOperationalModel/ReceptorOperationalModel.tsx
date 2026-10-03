import React, { useState, useId } from 'react';
import { ReceptorOperationalConfig, ReceptorOperationalConfigSchema } from './schema';
import { BaseWidgetProps, calculateBlackLeffEffect } from '../types';

export interface ReceptorOperationalModelProps extends BaseWidgetProps<ReceptorOperationalConfig> {
  onParamChange?: (tau: number, KA: number, ec50: number) => void;
}

export const ReceptorOperationalModel: React.FC<ReceptorOperationalModelProps> = ({
  config: rawConfig,
  locale = 'tr',
  className = '',
  onParamChange,
}) => {
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
      className={`p-6 bg-[#FFF8E7] border-4 border-black shadow-[6px_6px_0px_#000000] rounded-none max-w-3xl mx-auto font-sans text-black ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b-4 border-black gap-2">
        <div>
          <span className="inline-block text-xs uppercase tracking-widest font-black bg-[#6BCB77] text-black px-2 py-0.5 border-2 border-black mb-1">
            Black-Leff Operasyonel Agonizma Modeli
          </span>
          <h3 id={headingId} className="text-xl sm:text-2xl font-black uppercase tracking-tight">
            Yedek Reseptör & Operasyonel Etkinlik (τ)
          </h3>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => applyPreset(10.0, -6.0, 0)}
            data-testid="preset-full-agonist"
            className="px-2 py-1 bg-white border-2 border-black font-bold text-xs hover:bg-gray-100"
          >
            Tam Agonist (τ=10)
          </button>
          <button
            type="button"
            onClick={() => applyPreset(0.8, -6.0, 0)}
            data-testid="preset-partial-agonist"
            className="px-2 py-1 bg-white border-2 border-black font-bold text-xs hover:bg-gray-100"
          >
            Parsiyel Agonist (τ=0.8)
          </button>
          <button
            type="button"
            onClick={() => applyPreset(10.0, -6.0, 80)}
            data-testid="preset-depleted-reserve"
            className="px-2 py-1 bg-white border-2 border-black font-bold text-xs hover:bg-gray-100"
          >
            %80 Blokaj (Kovalent)
          </button>
        </div>
      </div>

      {/* Main Interactive Graph & Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* SVG Curve Plot (2 cols) */}
        <div className="md:col-span-2 bg-white border-4 border-black p-4 flex flex-col items-center">
          <div className="w-full flex justify-between items-center text-xs font-mono font-bold mb-2">
            <span>Doz-Yanıt Eğrisi (Black-Leff 1983)</span>
            <span className="text-gray-500">Hedef: {config.targetReceptor}</span>
          </div>

          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto bg-[#FAFAFA] border-2 border-black"
            aria-label="Black-Leff Doz-Yanıt Eğrisi Grafiği"
          >
            {/* Grid & Axis Lines */}
            <line
              x1={padding.left}
              y1={padding.top}
              x2={padding.left}
              y2={padding.top + plotHeight}
              stroke="#000"
              strokeWidth="2"
            />
            <line
              x1={padding.left}
              y1={padding.top + plotHeight}
              x2={padding.left + plotWidth}
              y2={padding.top + plotHeight}
              stroke="#000"
              strokeWidth="2"
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
                  <line x1={x} y1={padding.top + plotHeight} x2={x} y2={padding.top + plotHeight + 5} stroke="#000" strokeWidth="2" />
                  <text x={x} y={padding.top + plotHeight + 18} textAnchor="middle" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    10^{val}
                  </text>
                </g>
              );
            })}

            {/* Axis Labels */}
            <text x={padding.left + plotWidth / 2} y={svgHeight - 6} textAnchor="middle" fontSize="10" fontWeight="bold">
              [Agonist Derişimi] (M, logaritmik)
            </text>

            {/* Observed Curve */}
            <path
              data-testid="black-leff-curve"
              d={pathD}
              fill="none"
              stroke="#000"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* EC50 Guide Lines */}
            <line
              x1={ec50X}
              y1={ec50Y}
              x2={ec50X}
              y2={padding.top + plotHeight}
              stroke="#4D96FF"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
            <line
              x1={padding.left}
              y1={ec50Y}
              x2={ec50X}
              y2={ec50Y}
              stroke="#4D96FF"
              strokeWidth="2"
              strokeDasharray="3 3"
            />

            {/* EC50 Point Marker */}
            <circle cx={ec50X} cy={ec50Y} r="5" fill="#4D96FF" stroke="#000" strokeWidth="2" />
          </svg>
        </div>

        {/* Calculated Biophysical Metrics (1 col) */}
        <div className="bg-white border-4 border-black p-4 flex flex-col justify-between">
          <div>
            <div className="text-xs font-black uppercase text-gray-500 mb-2">Canlı Hesaplama Paneli</div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-2 bg-gray-50 border-2 border-black">
                <div className="text-gray-600">Gözlenen Maksimal Etki (Emax):</div>
                <div data-testid="metric-emax" className="text-lg font-black text-black">
                  {observedEmax.toFixed(1)}%
                </div>
              </div>

              <div className="p-2 bg-gray-50 border-2 border-black">
                <div className="text-gray-600">Operasyonel Potens (EC50):</div>
                <div data-testid="metric-ec50" className="text-base font-black text-[#4D96FF]">
                  {(ec50 * 1e6).toFixed(2)} μM <span className="text-[10px] text-gray-500">(10^{logEC50.toFixed(2)})</span>
                </div>
              </div>

              <div className="p-2 bg-gray-50 border-2 border-black">
                <div className="text-gray-600">EC50'deki Reseptör Doluluk Oranı (ρ):</div>
                <div data-testid="metric-occupancy" className="text-base font-black text-black">
                  %{occupancyAtEC50.toFixed(1)}
                </div>
              </div>

              <div
                data-testid="spare-receptor-banner"
                className={`p-2 border-2 border-black font-sans font-bold text-xs ${
                  spareReceptorPercent > 50
                    ? 'bg-[#E8F5E9] text-green-900 border-green-700'
                    : spareReceptorPercent > 10
                    ? 'bg-[#FFF9C4] text-yellow-900 border-yellow-700'
                    : 'bg-[#FFEBEE] text-red-900 border-red-700'
                }`}
              >
                {spareReceptorPercent > 50
                  ? `★ Yüksek Yedek Rezerv: %${spareReceptorPercent.toFixed(0)} reseptör boşta!`
                  : spareReceptorPercent > 10
                  ? `Yedek Rezerv: %${spareReceptorPercent.toFixed(0)}`
                  : '⚠ Sıfır Yedek Rezerv: Parsiyel Agonist davranışı!'}
              </div>
            </div>
          </div>

          <div className="text-[11px] text-gray-600 leading-tight mt-3">
            τ = [Rt] / KE. τ yükseldikçe EC50 sola kayar ve maksimum yanıt için daha az reseptör doluluğu yeterli olur.
          </div>
        </div>
      </div>

      {/* Interactive Controls & WCAG 2.2 Steppers */}
      <div className="p-4 bg-white border-4 border-black mb-4">
        <div className="text-xs font-black uppercase tracking-wider mb-4">Model Parametre Denetleyicileri</div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Parameter 1: Operational Efficacy (tau) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs font-bold font-mono">
              <span>Operasyonel Etkinlik (τ):</span>
              <span data-testid="value-tau" className="text-black font-black">{tau.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="20"
              step="0.1"
              value={tau}
              onChange={(e) => setTau(parseFloat(e.target.value))}
              aria-label="Operasyonel Etkinlik tau ayarı"
              className="w-full accent-black cursor-pointer"
            />
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setTau((prev) => Math.max(0.1, parseFloat((prev - 0.5).toFixed(1))))}
                aria-label="tau değerini 0.5 azalt"
                className="px-2 py-0.5 bg-gray-200 border-2 border-black font-mono font-bold text-xs"
              >
                -0.5
              </button>
              <button
                type="button"
                onClick={() => setTau((prev) => Math.min(20, parseFloat((prev + 0.5).toFixed(1))))}
                aria-label="tau değerini 0.5 artır"
                className="px-2 py-0.5 bg-gray-200 border-2 border-black font-mono font-bold text-xs"
              >
                +0.5
              </button>
            </div>
          </div>

          {/* Parameter 2: Affinity (logKA) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs font-bold font-mono">
              <span>Ayrışma Sabiti (log KA):</span>
              <span className="text-black font-black">{logKA.toFixed(1)} M</span>
            </div>
            <input
              type="range"
              min="-8"
              max="-4"
              step="0.2"
              value={logKA}
              onChange={(e) => setLogKA(parseFloat(e.target.value))}
              aria-label="log KA afinite ayarı"
              className="w-full accent-black cursor-pointer"
            />
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setLogKA((prev) => Math.max(-8, parseFloat((prev - 0.2).toFixed(1))))}
                aria-label="log KA değerini 0.2 azalt"
                className="px-2 py-0.5 bg-gray-200 border-2 border-black font-mono font-bold text-xs"
              >
                -0.2
              </button>
              <button
                type="button"
                onClick={() => setLogKA((prev) => Math.min(-4, parseFloat((prev + 0.2).toFixed(1))))}
                aria-label="log KA değerini 0.2 artır"
                className="px-2 py-0.5 bg-gray-200 border-2 border-black font-mono font-bold text-xs"
              >
                +0.2
              </button>
            </div>
          </div>

          {/* Parameter 3: Irreversible Receptor Blockade (%) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs font-bold font-mono">
              <span>Kovalent Blokaj (Rezerv Kaybı):</span>
              <span data-testid="value-blockade" className="text-red-600 font-black">%{blockadePercent}</span>
            </div>
            <input
              type="range"
              min="0"
              max="95"
              step="5"
              value={blockadePercent}
              onChange={(e) => setBlockadePercent(parseInt(e.target.value, 10))}
              aria-label="Kovalent blokaj yüzdesi ayarı"
              className="w-full accent-red-600 cursor-pointer"
            />
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setBlockadePercent((prev) => Math.max(0, prev - 10))}
                aria-label="Blokajı yüzde 10 azalt"
                className="px-2 py-0.5 bg-gray-200 border-2 border-black font-mono font-bold text-xs"
              >
                -10%
              </button>
              <button
                type="button"
                onClick={() => setBlockadePercent((prev) => Math.min(95, prev + 10))}
                aria-label="Blokajı yüzde 10 artır"
                className="px-2 py-0.5 bg-gray-200 border-2 border-black font-mono font-bold text-xs"
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
        className="p-3 bg-[#FFF] border-2 border-black text-xs text-gray-700 font-mono leading-relaxed"
      >
        <span className="font-bold text-black uppercase">Model İllüstrasyonu Notu:</span>{' '}
        {'Black & Leff operasyonel modelinde (1983) agonist yanıtı Effect = (Emax · τⁿ · [A]ⁿ) / ((KA + [A])ⁿ + τⁿ · [A]ⁿ) kapalı formülüyle hesaplanır. Operasyonel etkinlik τ = [Rt] / KE doku reseptör yoğunluğu [Rt] ile orantılıdır. Yüksek τ değerinde sistemde yedek reseptör bulunur ve EC50 = KA / (1 + τ) afinite sabiti KA\'dan çok daha düşüktür. Referans: ' + config.equationRef}
      </aside>
    </section>
  );
};
