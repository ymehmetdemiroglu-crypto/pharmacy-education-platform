import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Card, StickerBadge, Slider, Toggle } from '@pharmacy/ui';
import { BaseWidgetProps } from '../types';
import { PkSimulatorConfig } from './schema';
import { ModelIllustrationNotice } from '../common/ModelIllustrationNotice';

export type PkSimulatorProps = BaseWidgetProps<
  PkSimulatorConfig,
  { dose: number; cl: number; vd: number; route: string; isMultipleDose: boolean }
>;

export const PkSimulator: React.FC<PkSimulatorProps> = ({
  config,
  locale = 'tr',
  onAttempt: _onAttempt,
  disabled = false,
  className,
}) => {
  const [route, setRoute] = useState<'iv_bolus' | 'oral'>('iv_bolus');
  const [doseMg, setDoseMg] = useState<number>(config.defaultDoseMg);
  const [clLHr, setClLHr] = useState<number>(config.defaultClearanceLHr);
  const [vdL, setVdL] = useState<number>(config.defaultVdL);
  const [tauHr, setTauHr] = useState<number>(8);
  const [isMultipleDosing, setIsMultipleDosing] = useState(false);

  // Derived PK parameters
  const ke = clLHr / vdL; // 1/hr
  const tHalf = Math.round((0.693 / ke) * 10) / 10; // hr
  const F = route === 'oral' ? config.defaultBioavailabilityF : 1.0;
  const ka = config.defaultKa;

  // Generate Cp vs Time points (0 to 48 hr)
  const maxTime = isMultipleDosing ? 48 : 24;
  const timeStep = 0.5;
  const points: { time: number; cp: number }[] = [];

  let maxObservedCp = 0;

  for (let t = 0; t <= maxTime; t += timeStep) {
    let cp = 0;

    if (!isMultipleDosing) {
      if (route === 'iv_bolus') {
        cp = (doseMg / vdL) * Math.exp(-ke * t);
      } else {
        // Oral 1-compartment
        if (ka !== ke) {
          cp =
            ((F * doseMg * ka) / (vdL * (ka - ke))) *
            (Math.exp(-ke * t) - Math.exp(-ka * t));
        } else {
          cp = ((F * doseMg * ka * t) / vdL) * Math.exp(-ke * t);
        }
      }
    } else {
      // Multiple dosing superposition
      const numDoses = Math.floor(t / tauHr) + 1;
      for (let n = 0; n < numDoses; n++) {
        const timeSinceDose = t - n * tauHr;
        if (timeSinceDose >= 0) {
          if (route === 'iv_bolus') {
            cp += (doseMg / vdL) * Math.exp(-ke * timeSinceDose);
          } else {
            cp +=
              ((F * doseMg * ka) / (vdL * (ka - ke))) *
              (Math.exp(-ke * timeSinceDose) - Math.exp(-ka * timeSinceDose));
          }
        }
      }
    }

    const safeCp = Math.max(0, cp);
    if (safeCp > maxObservedCp) maxObservedCp = safeCp;
    points.push({ time: t, cp: safeCp });
  }

  // Plot scaling
  const chartMaxY = Math.max(config.therapeuticWindow[1] * 1.4, maxObservedCp * 1.2, 10);
  const mapX = (t: number) => 50 + (t / maxTime) * 320;
  const mapY = (c: number) => 210 - (c / chartMaxY) * 170;

  const pathData = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${mapX(p.time)} ${mapY(p.cp)}`)
    .join(' ');

  // Therapeutic range Y coordinates
  const winTopY = mapY(config.therapeuticWindow[1]);
  const winBottomY = mapY(config.therapeuticWindow[0]);
  const winHeight = Math.max(2, winBottomY - winTopY);

  const cssAvg = Math.round(((F * doseMg) / (clLHr * tauHr)) * 10) / 10;

  return (
    <Card variant="default" className={clsx('w-full flex flex-col gap-4', className)}>
      {/* Header */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <StickerBadge variant="orange" size="sm">
            PK Simulator (1-Compartment)
          </StickerBadge>
          <span className="text-[11px] font-mono text-gray-600 dark:text-gray-400">
            Source: {config.source.file} (p. {config.source.page})
          </span>
        </div>
        <h3 className="font-display font-bold text-base sm:text-lg">
          {config.drugName} Pharmacokinetic Profile
        </h3>
        <p className="text-xs font-body text-gray-700 dark:text-gray-300">{config.prompt}</p>
      </div>

      {/* Route & Multi-dose toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 bg-gray-50 dark:bg-[#131B2A] border-2 border-black dark:border-slate-700">
        <div className="flex items-center gap-2">
          {config.routes.map((r) => (
            <button
              key={r}
              type="button"
              disabled={disabled}
              onClick={() => setRoute(r)}
              className={clsx(
                'px-3 py-1 text-xs font-mono font-bold uppercase border-2 border-black dark:border-slate-700 transition-all',
                route === r
                  ? 'bg-[#FF9F45] text-black shadow-[2px_2px_0px_#000000]'
                  : 'bg-white dark:bg-[#1E293B] text-black dark:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800'
              )}
            >
              {r === 'iv_bolus' ? 'IV Bolus' : 'Oral (F=0.7)'}
            </button>
          ))}
        </div>

        <Toggle
          label="Multiple Dosing (Steady State)"
          checked={isMultipleDosing}
          onChange={setIsMultipleDosing}
          disabled={disabled}
        />
      </div>

      {/* SVG Concentration-Time Plot */}
      <div className="w-full bg-white dark:bg-[#131B2A] border-3 border-black dark:border-slate-700 shadow-neo dark:shadow-neo-dark p-3" dir="ltr">
        <svg
          viewBox="0 0 400 240"
          className="w-full h-auto select-none"
          role="img"
          aria-label="Plasma drug concentration versus time curve"
        >
          {/* Shaded Green Therapeutic Target Range */}
          <rect
            x="50"
            y={winTopY}
            width="320"
            height={winHeight}
            fill="#6BCB77"
            fillOpacity="0.2"
            stroke="#6BCB77"
            strokeWidth="1"
            strokeDasharray="4 2"
          />
          <text
            x="365"
            y={winTopY + 12}
            textAnchor="end"
            fontSize="9"
            fontFamily="monospace"
            fill="#2E7D32"
            fontWeight="bold"
          >
            Therapeutic Window ({config.therapeuticWindow[0]}–{config.therapeuticWindow[1]} mg/L)
          </text>

          {/* Axes */}
          <line x1="50" y1="30" x2="50" y2="210" stroke="#000000" strokeWidth="3" className="dark:stroke-slate-500" />
          <line x1="50" y1="210" x2="380" y2="210" stroke="#000000" strokeWidth="3" className="dark:stroke-slate-500" />

          {/* Axis Labels */}
          <text x="35" y="40" textAnchor="end" fontSize="10" fontFamily="monospace" fill="currentColor">
            {Math.round(chartMaxY)}
          </text>
          <text x="35" y="215" textAnchor="end" fontSize="10" fontFamily="monospace" fill="currentColor">
            0
          </text>

          <text x="50" y="226" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">0h</text>
          <text x="130" y="226" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">{maxTime / 4}h</text>
          <text x="210" y="226" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">{maxTime / 2}h</text>
          <text x="290" y="226" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">{(maxTime * 3) / 4}h</text>
          <text x="370" y="226" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">{maxTime}h</text>

          <text x="210" y="238" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="bold" fill="currentColor">
            Time (Hours)
          </text>

          {/* Concentration Curve */}
          <path
            d={pathData}
            fill="none"
            stroke="#FF9F45"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Readout Summary */}
        <div aria-live="polite" className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-2 border-t border-black/10 dark:border-slate-700 text-xs font-mono text-center">
          <div className="bg-gray-50 dark:bg-[#1E293B] p-1.5 border border-black/20 dark:border-slate-700 text-black dark:text-slate-100">
            <span className="text-[10px] text-gray-700 dark:text-slate-300 uppercase block">Elimination Half-Life</span>
            <strong>{tHalf} hr</strong>
          </div>
          <div className="bg-gray-50 dark:bg-[#1E293B] p-1.5 border border-black/20 dark:border-slate-700 text-black dark:text-slate-100">
            <span className="text-[10px] text-gray-700 dark:text-slate-300 uppercase block">Elimination Rate (ke)</span>
            <strong>{ke.toFixed(3)} h⁻¹</strong>
          </div>
          <div className="bg-gray-50 dark:bg-[#1E293B] p-1.5 border border-black/20 dark:border-slate-700 text-black dark:text-slate-100">
            <span className="text-[10px] text-gray-700 dark:text-slate-300 uppercase block">Peak Cp (Cmax)</span>
            <strong>{maxObservedCp.toFixed(1)} mg/L</strong>
          </div>
          <div className="bg-gray-50 dark:bg-[#1E293B] p-1.5 border border-black/20 dark:border-slate-700 text-black dark:text-slate-100">
            <span className="text-[10px] text-gray-700 dark:text-slate-300 uppercase block">Average Css</span>
            <strong>{isMultipleDosing ? `${cssAvg} mg/L` : 'N/A'}</strong>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-gray-50 dark:bg-[#131B2A] border-2 border-black dark:border-slate-700">
        <Slider
          label="Dose (mg)"
          value={doseMg}
          min={50}
          max={1000}
          step={50}
          unit="mg"
          onChange={setDoseMg}
          disabled={disabled}
        />
        <Slider
          label="Clearance (CL)"
          value={clLHr}
          min={1}
          max={20}
          step={0.5}
          unit="L/h"
          onChange={setClLHr}
          disabled={disabled}
        />
        <Slider
          label="Volume of Dist. (Vd)"
          value={vdL}
          min={10}
          max={150}
          step={5}
          unit="L"
          onChange={setVdL}
          disabled={disabled}
        />
      </div>

      {isMultipleDosing && (
        <div className="p-3 bg-white dark:bg-[#131B2A] border-2 border-black dark:border-slate-700">
          <Slider
            label="Dosing Interval (Tau)"
            value={tauHr}
            min={4}
            max={24}
            step={4}
            unit="hours"
            onChange={setTauHr}
            disabled={disabled}
          />
        </div>
      )}

      {/* Model Illustration Notice (Rule 6) */}
      <ModelIllustrationNotice
        locale={locale}
        equation="Cp(t) = (D / Vd) * e^(-(CL/Vd)*t)   [IV Bolus 1-Compartment]"
        sourceReference="Rowland and Tozer's Clinical Pharmacokinetics and Pharmacodynamics (4th ed.)"
        assumptions={[
          'Instantaneous uniform distribution (1-compartment model)',
          'First-order linear elimination kinetics (un-saturated enzymes)',
          'Complete systemic absorption for IV; constant Ka for oral route',
        ]}
      />
    </Card>
  );
};
