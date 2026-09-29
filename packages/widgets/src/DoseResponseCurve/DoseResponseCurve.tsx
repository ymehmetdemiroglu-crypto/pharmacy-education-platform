import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Card, StickerBadge, Slider } from '@pharmacy/ui';
import { BaseWidgetProps } from '../types';
import { DoseResponseCurveConfig } from './schema';
import { ModelIllustrationNotice } from '../common/ModelIllustrationNotice';

export type DoseResponseCurveProps = BaseWidgetProps<DoseResponseCurveConfig, { ec50: number; emax: number; mode: string }>;

export const DoseResponseCurve: React.FC<DoseResponseCurveProps> = ({
  config,
  onAttempt,
  disabled = false,
  className,
}) => {
  const [activeMode, setActiveMode] = useState<string>(config.modes[0] || 'agonist');
  const [logEc50, setLogEc50] = useState<number>(-7); // 10^-7 M = 100 nM
  const [emax, setEmax] = useState<number>(config.defaultEmax || 100);
  const [antagonistConc, setAntagonistConc] = useState<number>(3); // 3x Ki

  // Mathematical Hill Equation calculation
  // logD ranges from -10 to -3 (0.1 nM to 1 mM)
  const points: { logDose: number; response: number }[] = [];
  const compPoints: { logDose: number; response: number }[] = [];

  let effectiveLogEc50 = logEc50;
  let effectiveEmax = emax;

  if (activeMode === 'partial_agonist') {
    effectiveEmax = Math.min(emax, 50);
  } else if (activeMode === 'competitive_antagonist') {
    // Shifts curve right by log(1 + [I]/Ki)
    effectiveLogEc50 = logEc50 + Math.log10(1 + antagonistConc);
  } else if (activeMode === 'noncompetitive_antagonist') {
    // Depresses Emax by factor (1 + [I]/Ki)
    effectiveEmax = emax / (1 + antagonistConc * 0.4);
  }

  for (let d = -10; d <= -3; d += 0.2) {
    const exponent = 1.0 * (d - effectiveLogEc50);
    const resp = (effectiveEmax * Math.pow(10, exponent)) / (1 + Math.pow(10, exponent));
    points.push({ logDose: d, response: Math.max(0, Math.min(100, resp)) });

    // Also calculate baseline agonist for visual comparison
    if (activeMode !== 'agonist') {
      const baseExp = 1.0 * (d - logEc50);
      const baseResp = (emax * Math.pow(10, baseExp)) / (1 + Math.pow(10, baseExp));
      compPoints.push({ logDose: d, response: Math.max(0, Math.min(100, baseResp)) });
    }
  }

  // SVG coordinate mapping
  // X: -10 to -3 -> 50 to 360 px
  // Y: 0 to 100% -> 200 to 30 px
  const mapX = (logD: number) => 50 + ((logD - (-10)) / (-3 - (-10))) * 320;
  const mapY = (resp: number) => 210 - (resp / 100) * 170;

  const pathData = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${mapX(p.logDose)} ${mapY(p.response)}`)
    .join(' ');

  const compPathData = compPoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${mapX(p.logDose)} ${mapY(p.response)}`)
    .join(' ');

  const handleModeChange = (mode: string) => {
    setActiveMode(mode);
    if (onAttempt) onAttempt({ ec50: Math.pow(10, effectiveLogEc50), emax: effectiveEmax, mode });
  };

  return (
    <Card variant="default" className={clsx('w-full flex flex-col gap-4', className)}>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <StickerBadge variant="orange" size="sm">
            Dose-Response Simulator
          </StickerBadge>
          <span className="text-[11px] font-mono text-gray-600 dark:text-gray-400">
            Source: {config.source.file} (p. {config.source.page})
          </span>
        </div>
        <h3 className="font-display font-bold text-base sm:text-lg">
          {config.title}
        </h3>
        <p className="text-xs font-body text-gray-700 dark:text-gray-300">
          {config.prompt}
        </p>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {config.modes.map((mode) => (
          <button
            key={mode}
            type="button"
            disabled={disabled}
            onClick={() => handleModeChange(mode)}
            className={clsx(
              'px-3 py-1.5 text-xs font-mono font-bold uppercase border-2 border-black dark:border-white transition-all',
              activeMode === mode
                ? 'bg-[#FF9F45] text-black shadow-[2px_2px_0px_#000000] scale-102'
                : 'bg-white dark:bg-[#202020] text-black dark:text-white hover:bg-gray-100'
            )}
          >
            {mode.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* SVG Canvas Curve */}
      <div className="w-full bg-white dark:bg-[#1E1E1E] border-3 border-black dark:border-white shadow-neo dark:shadow-neo-dark p-3">
        <svg
          viewBox="0 0 400 240"
          className="w-full h-auto select-none"
          role="img"
          aria-label="Dose response curve plot"
        >
          {/* Grid lines */}
          <line x1="50" y1="40" x2="370" y2="40" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="50" y1="125" x2="370" y2="125" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="50" y1="210" x2="370" y2="210" stroke="#E5E7EB" strokeWidth="1" />

          {/* Axes */}
          <line x1="50" y1="30" x2="50" y2="210" stroke="#000000" strokeWidth="3" className="dark:stroke-white" />
          <line x1="50" y1="210" x2="380" y2="210" stroke="#000000" strokeWidth="3" className="dark:stroke-white" />

          {/* Axis Labels */}
          <text x="35" y="45" textAnchor="end" fontSize="10" fontFamily="monospace" fill="currentColor">100%</text>
          <text x="35" y="130" textAnchor="end" fontSize="10" fontFamily="monospace" fill="currentColor">50%</text>
          <text x="35" y="215" textAnchor="end" fontSize="10" fontFamily="monospace" fill="currentColor">0%</text>

          <text x="50" y="226" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">10⁻¹⁰</text>
          <text x="141" y="226" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">10⁻⁸</text>
          <text x="233" y="226" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">10⁻⁶</text>
          <text x="324" y="226" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">10⁻⁴</text>
          <text x="215" y="238" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="bold" fill="currentColor">log[Dose] (Molar)</text>

          {/* Baseline Curve if antagonist mode active */}
          {compPoints.length > 0 && (
            <path
              d={compPathData}
              fill="none"
              stroke="#A0AEC0"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />
          )}

          {/* Main Dynamic Curve */}
          <path
            d={pathData}
            fill="none"
            stroke="#FF9F45"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* EC50 Point Indicator */}
          <circle
            cx={mapX(effectiveLogEc50)}
            cy={mapY(effectiveEmax / 2)}
            r="5"
            fill="#FFD93D"
            stroke="#000000"
            strokeWidth="2.5"
          />
        </svg>

        {/* Legend */}
        <div aria-live="polite" className="flex items-center justify-between mt-2 pt-2 border-t border-black/10 dark:border-white/10 text-[11px] font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-[#FF9F45] border border-black inline-block" /> Active Response
            </span>
            {compPoints.length > 0 && (
              <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <span className="w-3 h-0.5 border-t border-dashed border-gray-400 inline-block" /> Agonist Alone
              </span>
            )}
          </div>
          <div>
            Apparent EC₅₀: <strong>10^{effectiveLogEc50.toFixed(1)} M</strong> | E_max: <strong>{Math.round(effectiveEmax)}%</strong>
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-gray-50 dark:bg-[#1E1E1E] border-2 border-black dark:border-white">
        <Slider
          label="Agonist Potency (log EC50)"
          value={logEc50}
          min={-9}
          max={-5}
          step={0.5}
          unit="M"
          onChange={setLogEc50}
          disabled={disabled}
        />

        {(activeMode === 'competitive_antagonist' || activeMode === 'noncompetitive_antagonist') ? (
          <Slider
            label="Antagonist Ratio ([I] / Ki)"
            value={antagonistConc}
            min={1}
            max={10}
            step={1}
            unit="x"
            onChange={setAntagonistConc}
            disabled={disabled}
          />
        ) : (
          <Slider
            label="Maximal Efficacy (Emax)"
            value={emax}
            min={20}
            max={100}
            step={5}
            unit="%"
            onChange={setEmax}
            disabled={disabled || activeMode === 'partial_agonist'}
          />
        )}
      </div>

      {/* Model Illustration Notice (Rule 6) */}
      <ModelIllustrationNotice
        equation="E = (E_max * [D]^n) / (EC_50^n + [D]^n)"
        sourceReference="Katzung Basic & Clinical Pharmacology, Chapter 2 (Drug Receptors & Pharmacodynamics)"
        assumptions={[
          'Equilibrium mass-action binding with no spare receptor reserve',
          'Hill coefficient n = 1.0 (non-cooperative binding)',
          'Schild competitive model: apparent EC50 = EC50 * (1 + [I]/Ki)',
        ]}
      />
    </Card>
  );
};
