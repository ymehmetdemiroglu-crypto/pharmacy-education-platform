import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Card, StickerBadge, Slider } from '@pharmacy/ui';
import { BaseWidgetProps } from '../types';
import { DoseResponseCurveConfig } from './schema';
import { ModelIllustrationNotice } from '../common/ModelIllustrationNotice';

export type DoseResponseCurveProps = BaseWidgetProps<DoseResponseCurveConfig, { ec50: number; emax: number; mode: string }>;

export const DoseResponseCurve: React.FC<DoseResponseCurveProps> = ({
  config,
  locale = 'en',
  onAttempt,
  disabled = false,
  className,
}) => {
  const dict = {
    tr: {
      badge: 'Doz-Yanıt Simülatörü',
      source: 'Kaynak: ',
      page: 's. ',
      modes: {
        agonist: 'Agonist',
        partial_agonist: 'Parsiyel Agonist',
        competitive_antagonist: 'Yarışmalı Antagonist',
        noncompetitive_antagonist: 'Yarışmasız Antagonist',
      } as Record<string, string>,
      xAxis: 'log[Doz] (Molar)',
      plotAria: 'Doz yanıt eğrisi grafiği',
      activeResponse: 'Aktif Yanıt',
      agonistAlone: 'Tek Başına Agonist',
      apparentEc50: 'Görünür EC₅₀: ',
      emax: 'E_maks: ',
      agonistPotency: 'Agonist Potensi (log EC50)',
      antagonistRatio: 'Antagonist Oranı ([I] / Ki)',
      maximalEfficacy: 'Maksimal Etkinlik (Emax)',
      assumptions: [
        'Yedek reseptör rezervi bulunmayan kütle-etki dengesi bağlanması',
        'Hill katsayısı n = 1.0 (kooperatif olmayan bağlanma)',
        'Schild yarışmalı modeli: görünür EC50 = EC50 * (1 + [I]/Ki)',
      ],
    },
    ar: {
      badge: 'محاكي الجرعة والاستجابة',
      source: 'المصدر: ',
      page: 'ص. ',
      modes: {
        agonist: 'ناهض',
        partial_agonist: 'ناهض جزئي',
        competitive_antagonist: 'مناهض تنافسي',
        noncompetitive_antagonist: 'مناهض غير تنافسي',
      } as Record<string, string>,
      xAxis: 'log[الجرعة] (مولار)',
      plotAria: 'رسم منحنى الجرعة والاستجابة',
      activeResponse: 'الاستجابة النشطة',
      agonistAlone: 'الناهض بمفرده',
      apparentEc50: 'التركيز الفعّال الظاهري EC₅₀: ',
      emax: 'الاستجابة القصوى E_max: ',
      agonistPotency: 'فاعلية الناهض (log EC50)',
      antagonistRatio: 'نسبة المناهض ([I] / Ki)',
      maximalEfficacy: 'الفعالية القصوى (Emax)',
      assumptions: [
        'ارتباط توازن فعل الكتلة مع غياب المستقبلات الاحتياطية',
        'معامل هيل n = 1.0 (ارتباط غير تعاوني)',
        'نموذج شيلد التنافسي: التركيز الفعال الظاهري EC50 = EC50 * (1 + [I]/Ki)',
      ],
    },
    en: {
      badge: 'Dose-Response Simulator',
      source: 'Source: ',
      page: 'p. ',
      modes: {
        agonist: 'Agonist',
        partial_agonist: 'Partial Agonist',
        competitive_antagonist: 'Competitive Antagonist',
        noncompetitive_antagonist: 'Noncompetitive Antagonist',
      } as Record<string, string>,
      xAxis: 'log[Dose] (Molar)',
      plotAria: 'Dose response curve plot',
      activeResponse: 'Active Response',
      agonistAlone: 'Agonist Alone',
      apparentEc50: 'Apparent EC₅₀: ',
      emax: 'E_max: ',
      agonistPotency: 'Agonist Potency (log EC50)',
      antagonistRatio: 'Antagonist Ratio ([I] / Ki)',
      maximalEfficacy: 'Maximal Efficacy (Emax)',
      assumptions: [
        'Equilibrium mass-action binding with no spare receptor reserve',
        'Hill coefficient n = 1.0 (non-cooperative binding)',
        'Schild competitive model: apparent EC50 = EC50 * (1 + [I]/Ki)',
      ],
    },
  }[locale || 'en'] || {
    badge: 'Dose-Response Simulator',
    source: 'Source: ',
    page: 'p. ',
    modes: {
      agonist: 'Agonist',
      partial_agonist: 'Partial Agonist',
      competitive_antagonist: 'Competitive Antagonist',
      noncompetitive_antagonist: 'Noncompetitive Antagonist',
    } as Record<string, string>,
    xAxis: 'log[Dose] (Molar)',
    plotAria: 'Dose response curve plot',
    activeResponse: 'Active Response',
    agonistAlone: 'Agonist Alone',
    apparentEc50: 'Apparent EC₅₀: ',
    emax: 'E_max: ',
    agonistPotency: 'Agonist Potency (log EC50)',
    antagonistRatio: 'Antagonist Ratio ([I] / Ki)',
    maximalEfficacy: 'Maximal Efficacy (Emax)',
    assumptions: [
      'Equilibrium mass-action binding with no spare receptor reserve',
      'Hill coefficient n = 1.0 (non-cooperative binding)',
      'Schild competitive model: apparent EC50 = EC50 * (1 + [I]/Ki)',
    ],
  };

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
    <Card
      variant="default"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={clsx('w-full flex flex-col gap-4', className)}
    >
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <StickerBadge variant="orange" size="sm">
            {dict.badge}
          </StickerBadge>
          <span className="text-[11px] font-mono text-gray-600 dark:text-gray-400">
            {dict.source}{config.source.file} ({dict.page}{config.source.page})
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
              'px-3.5 py-1.5 text-xs font-mono font-semibold uppercase rounded-xl border transition-all',
              activeMode === mode
                ? 'bg-[#10A37F] text-white border-[#10A37F] shadow-xs'
                : 'bg-white dark:bg-[#252525] text-slate-700 dark:text-neutral-300 border-slate-200 dark:border-[#383838] hover:bg-slate-50 dark:hover:bg-[#2C2C2C]'
            )}
          >
            {dict.modes[mode] || mode.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* SVG Canvas Curve */}
      <div className="w-full bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl shadow-xs p-4" dir="ltr">
        <svg
          viewBox="0 0 400 240"
          className="w-full h-auto select-none"
          role="img"
          aria-label={dict.plotAria}
        >
          {/* Grid lines */}
          <line x1="50" y1="40" x2="370" y2="40" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" className="dark:stroke-[#2F2F2F]" />
          <line x1="50" y1="125" x2="370" y2="125" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" className="dark:stroke-[#2F2F2F]" />
          <line x1="50" y1="210" x2="370" y2="210" stroke="#E2E8F0" strokeWidth="1" className="dark:stroke-[#2F2F2F]" />

          {/* Axes */}
          <line x1="50" y1="30" x2="50" y2="210" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="50" y1="210" x2="380" y2="210" stroke="#94A3B8" strokeWidth="1.5" />

          {/* Axis Labels */}
          <text x="35" y="45" textAnchor="end" fontSize="10" fontFamily="monospace" fill="#64748B">100%</text>
          <text x="35" y="130" textAnchor="end" fontSize="10" fontFamily="monospace" fill="#64748B">50%</text>
          <text x="35" y="215" textAnchor="end" fontSize="10" fontFamily="monospace" fill="#64748B">0%</text>

          <text x="50" y="226" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#64748B">10⁻¹⁰</text>
          <text x="141" y="226" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#64748B">10⁻⁸</text>
          <text x="233" y="226" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#64748B">10⁻⁶</text>
          <text x="324" y="226" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#64748B">10⁻⁴</text>
          <text x="215" y="238" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="600" fill="#64748B">{dict.xAxis}</text>

          {/* Baseline Curve if antagonist mode active */}
          {compPoints.length > 0 && (
            <path
              d={compPathData}
              fill="none"
              stroke="#94A3B8"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          )}

          {/* Main Dynamic Curve */}
          <path
            d={pathData}
            fill="none"
            stroke="#10A37F"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* EC50 Point Indicator */}
          <circle
            cx={mapX(effectiveLogEc50)}
            cy={mapY(effectiveEmax / 2)}
            r="4.5"
            fill="#10A37F"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
        </svg>

        {/* Legend */}
        <div aria-live="polite" className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200 dark:border-[#2F2F2F] text-[11px] font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-neutral-300 font-medium">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm inline-block" /> {dict.activeResponse}
            </span>
            {compPoints.length > 0 && (
              <span className="flex items-center gap-1.5 text-slate-500 dark:text-neutral-400">
                <span className="w-3 h-0.5 border-t border-dashed border-slate-400 inline-block" /> {dict.agonistAlone}
              </span>
            )}
          </div>
          <div className="text-slate-600 dark:text-neutral-400">
            {dict.apparentEc50}<strong className="text-slate-900 dark:text-[#ECECEC]">10^{effectiveLogEc50.toFixed(1)} M</strong> | {dict.emax}<strong className="text-slate-900 dark:text-[#ECECEC]">{Math.round(effectiveEmax)}%</strong>
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl shadow-xs">
        <Slider
          label={dict.agonistPotency}
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
            label={dict.antagonistRatio}
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
            label={dict.maximalEfficacy}
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
        locale={locale}
        equation="E = (E_max * [D]^n) / (EC_50^n + [D]^n)"
        sourceReference="Katzung Basic & Clinical Pharmacology, Chapter 2 (Drug Receptors & Pharmacodynamics)"
        assumptions={dict.assumptions}
      />
    </Card>
  );
};
