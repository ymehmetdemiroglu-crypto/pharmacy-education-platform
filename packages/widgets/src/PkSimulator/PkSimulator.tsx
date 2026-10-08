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
  locale = 'en',
  onAttempt: _onAttempt,
  disabled = false,
  className,
}) => {
  const dict = {
    tr: {
      badge: 'PK Simülatörü (1-Kompartman)',
      source: 'Kaynak: ',
      page: 's. ',
      profileSuffix: 'Farmakokinetik Profili',
      ivBolus: 'IV Bolus',
      oral: 'Oral (F=0.7)',
      multipleDosing: 'Çoklu Doz (Kararlı Durum)',
      plotAria: 'Plazma ilaç konsantrasyonu - zaman eğrisi',
      therapeuticWindow: 'Terapötik Pencere',
      timeAxis: 'Zaman (Saat)',
      halfLife: 'Yarılanma Ömrü',
      hrUnit: 'saat',
      eliminationRate: 'Eliminasyon Hızı (ke)',
      peakCp: 'Tepe Konsantrasyon (Cmax)',
      avgCss: 'Ortalama Css',
      na: 'Yok',
      dose: 'Doz (mg)',
      clearance: 'Klerens (CL)',
      vd: 'Dağılım Hacmi (Vd)',
      dosingInterval: 'Doz Aralığı (Tau)',
      hoursUnit: 'saat',
      assumptions: [
        'Anlık homojen dağılım (1-kompartmanlı model)',
        'Birinci derece doğrusal eliminasyon kinetiği (doymamış enzimler)',
        'IV için tam sistemik emilim; oral yol için sabit Ka',
      ],
    },
    ar: {
      badge: 'محاكي الحركية الدوائية (حجرة واحدة)',
      source: 'المصدر: ',
      page: 'ص. ',
      profileSuffix: 'الملف الحركي الدوائي',
      ivBolus: 'حقنة وريدية مباشرة',
      oral: 'فموي (F=0.7)',
      multipleDosing: 'جرعات متكررة (حالة الاستقرار)',
      plotAria: 'منحنى تركيز الدواء في البلازما مقابل الزمن',
      therapeuticWindow: 'النافذة العلاجية',
      timeAxis: 'الزمن (ساعات)',
      halfLife: 'عمر النصف الإطراحي',
      hrUnit: 'ساعة',
      eliminationRate: 'معدل الإطراح (ke)',
      peakCp: 'ذروة التركيز (Cmax)',
      avgCss: 'متوسط التركيز المستقر Css',
      na: 'غير متاح',
      dose: 'الجرعة (ملغ)',
      clearance: 'التصفية (CL)',
      vd: 'حجم التوزع (Vd)',
      dosingInterval: 'الفترة الفاصلة بين الجرعات (Tau)',
      hoursUnit: 'ساعات',
      assumptions: [
        'توزع فوري متجانس (نموذج الحجرة الواحدة)',
        'حركية إطراح خطية من الرتبة الأولى (إنزيمات غير مشبعة)',
        'امتصاص جهازي كامل للحقن الوريدي؛ ثابت امتصاص ثابت للطريق الفموي',
      ],
    },
    en: {
      badge: 'PK Simulator (1-Compartment)',
      source: 'Source: ',
      page: 'p. ',
      profileSuffix: 'Pharmacokinetic Profile',
      ivBolus: 'IV Bolus',
      oral: 'Oral (F=0.7)',
      multipleDosing: 'Multiple Dosing (Steady State)',
      plotAria: 'Plasma drug concentration versus time curve',
      therapeuticWindow: 'Therapeutic Window',
      timeAxis: 'Time (Hours)',
      halfLife: 'Elimination Half-Life',
      hrUnit: 'hr',
      eliminationRate: 'Elimination Rate (ke)',
      peakCp: 'Peak Cp (Cmax)',
      avgCss: 'Average Css',
      na: 'N/A',
      dose: 'Dose (mg)',
      clearance: 'Clearance (CL)',
      vd: 'Volume of Dist. (Vd)',
      dosingInterval: 'Dosing Interval (Tau)',
      hoursUnit: 'hours',
      assumptions: [
        'Instantaneous uniform distribution (1-compartment model)',
        'First-order linear elimination kinetics (un-saturated enzymes)',
        'Complete systemic absorption for IV; constant Ka for oral route',
      ],
    },
  }[locale || 'en'] || {
    badge: 'PK Simulator (1-Compartment)',
    source: 'Source: ',
    page: 'p. ',
    profileSuffix: 'Pharmacokinetic Profile',
    ivBolus: 'IV Bolus',
    oral: 'Oral (F=0.7)',
    multipleDosing: 'Multiple Dosing (Steady State)',
    plotAria: 'Plasma drug concentration versus time curve',
    therapeuticWindow: 'Therapeutic Window',
    timeAxis: 'Time (Hours)',
    halfLife: 'Elimination Half-Life',
    hrUnit: 'hr',
    eliminationRate: 'Elimination Rate (ke)',
    peakCp: 'Peak Cp (Cmax)',
    avgCss: 'Average Css',
    na: 'N/A',
    dose: 'Dose (mg)',
    clearance: 'Clearance (CL)',
    vd: 'Volume of Dist. (Vd)',
    dosingInterval: 'Dosing Interval (Tau)',
    hoursUnit: 'hours',
    assumptions: [
      'Instantaneous uniform distribution (1-compartment model)',
      'First-order linear elimination kinetics (un-saturated enzymes)',
      'Complete systemic absorption for IV; constant Ka for oral route',
    ],
  };

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
    <Card
      variant="default"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={clsx('w-full flex flex-col gap-4', className)}
    >
      {/* Header */}
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
          {config.drugName} {dict.profileSuffix}
        </h3>
        <p className="text-xs font-body text-gray-700 dark:text-gray-300">{config.prompt}</p>
      </div>

      {/* Route & Multi-dose toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-[#171717] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl">
        <div className="flex items-center gap-2">
          {config.routes.map((r) => (
            <button
              key={r}
              type="button"
              disabled={disabled}
              onClick={() => setRoute(r)}
              className={clsx(
                'px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all',
                route === r
                  ? 'bg-[#10A37F] text-white border-[#10A37F] shadow-xs'
                  : 'bg-white dark:bg-[#252525] border-slate-200 dark:border-[#383838] text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-[#2C2C2C]'
              )}
            >
              {r === 'iv_bolus' ? dict.ivBolus : dict.oral}
            </button>
          ))}
        </div>

        <Toggle
          label={dict.multipleDosing}
          checked={isMultipleDosing}
          onChange={setIsMultipleDosing}
          disabled={disabled}
        />
      </div>

      {/* SVG Concentration-Time Plot */}
      <div className="w-full bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl shadow-xs p-4" dir="ltr">
        <svg
          viewBox="0 0 400 240"
          className="w-full h-auto select-none"
          role="img"
          aria-label={dict.plotAria}
        >
          {/* Shaded Green Therapeutic Target Range */}
          <rect
            x="50"
            y={winTopY}
            width="320"
            height={winHeight}
            fill="#10A37F"
            fillOpacity="0.12"
            stroke="#10A37F"
            strokeWidth="1"
            strokeDasharray="4 2"
            rx="4"
          />
          <text
            x="365"
            y={winTopY + 12}
            textAnchor="end"
            fontSize="9"
            fontFamily="monospace"
            fill="#10A37F"
            fontWeight="bold"
          >
            {dict.therapeuticWindow} ({config.therapeuticWindow[0]}–{config.therapeuticWindow[1]} mg/L)
          </text>

          {/* Axes */}
          <line x1="50" y1="30" x2="50" y2="210" stroke="#94A3B8" strokeWidth="1" />
          <line x1="50" y1="210" x2="380" y2="210" stroke="#94A3B8" strokeWidth="1" />

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
            {dict.timeAxis}
          </text>

          {/* Concentration Curve */}
          <path
            d={pathData}
            fill="none"
            stroke="#10A37F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Readout Summary */}
        <div aria-live="polite" className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-[#2F2F2F] text-xs font-mono text-center">
          <div className="bg-slate-50 dark:bg-[#252525] p-2.5 border border-slate-200 dark:border-[#333333] rounded-xl text-slate-800 dark:text-[#ECECEC] shadow-2xs">
            <span className="text-[10px] text-slate-500 dark:text-neutral-400 uppercase block">{dict.halfLife}</span>
            <strong className="text-emerald-700 dark:text-emerald-400">{tHalf} {dict.hrUnit}</strong>
          </div>
          <div className="bg-slate-50 dark:bg-[#252525] p-2.5 border border-slate-200 dark:border-[#333333] rounded-xl text-slate-800 dark:text-[#ECECEC] shadow-2xs">
            <span className="text-[10px] text-slate-500 dark:text-neutral-400 uppercase block">{dict.eliminationRate}</span>
            <strong className="text-slate-900 dark:text-[#ECECEC]">{ke.toFixed(3)} h⁻¹</strong>
          </div>
          <div className="bg-slate-50 dark:bg-[#252525] p-2.5 border border-slate-200 dark:border-[#333333] rounded-xl text-slate-800 dark:text-[#ECECEC] shadow-2xs">
            <span className="text-[10px] text-slate-500 dark:text-neutral-400 uppercase block">{dict.peakCp}</span>
            <strong className="text-slate-900 dark:text-[#ECECEC]">{maxObservedCp.toFixed(1)} mg/L</strong>
          </div>
          <div className="bg-slate-50 dark:bg-[#252525] p-2.5 border border-slate-200 dark:border-[#333333] rounded-xl text-slate-800 dark:text-[#ECECEC] shadow-2xs">
            <span className="text-[10px] text-slate-500 dark:text-neutral-400 uppercase block">{dict.avgCss}</span>
            <strong className="text-slate-900 dark:text-[#ECECEC]">{isMultipleDosing ? `${cssAvg} mg/L` : dict.na}</strong>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 dark:bg-[#171717] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl shadow-xs">
        <Slider
          label={dict.dose}
          value={doseMg}
          min={50}
          max={1000}
          step={50}
          unit="mg"
          onChange={setDoseMg}
          disabled={disabled}
        />
        <Slider
          label={dict.clearance}
          value={clLHr}
          min={1}
          max={20}
          step={0.5}
          unit="L/h"
          onChange={setClLHr}
          disabled={disabled}
        />
        <Slider
          label={dict.vd}
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
        <div className="p-4 bg-slate-50 dark:bg-[#171717] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl shadow-xs">
          <Slider
            label={dict.dosingInterval}
            value={tauHr}
            min={4}
            max={24}
            step={4}
            unit={dict.hoursUnit}
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
        assumptions={dict.assumptions}
      />
    </Card>
  );
};
