import React, { useState, useId } from 'react';
import { PkCockpitConfig, PkCockpitConfigSchema } from './schema';
import { BaseWidgetProps } from '../types';

export interface PkCockpitProps extends BaseWidgetProps<PkCockpitConfig> {
  onDoseChange?: (dose: number, tau: number) => void;
}

export const PkCockpit: React.FC<PkCockpitProps> = ({
  config: rawConfig,
  locale = 'tr',
  className = '',
  onDoseChange,
}) => {
  const config = PkCockpitConfigSchema.parse(rawConfig || {});

  const dict = {
    tr: {
      badge: 'Çoklu-Doz PK Simülatörü & Güvenlik İzlemi',
      title: 'Farmakokinetik Kokpit (PkCockpit)',
      oralRoute: (F: number) => `Oral Tablet (F=${F})`,
      ivRoute: 'IV Bolus (F=1.0)',
      plotTitle: 'Zaman-Konsantrasyon Eğrisi (5 Dozluk Kümülatif Profil)',
      plotAria: 'Farmakokinetik Çoklu Doz Konsantrasyon Grafiği',
      timeAxis: 'Zaman (saat)',
      dataHeader: 'Kararlı Durum (Css) Verileri',
      peak: 'Tepe (Css,max):',
      trough: 'Dip (Css,min):',
      average: 'Ortalama (Css,avg):',
      accumulation: 'Kümülasyon (R_acc):',
      halfLife: 'Yarılanma Ömrü (t1/2):',
      hoursUnit: 'saat',
      optimalAlert: '✓ Terapötik Aralıkta: Tepe ve dip derişimler hedef güvenlik sınırları içinde!',
      toxicAlert: (max: string) => `⚠ Toksisite Uyarısı: Tepe konsantrasyonu (${max} mg/L) MTC tavanını aştı!`,
      subtherapeuticAlert: (min: string) => `⚠ Subterapötik Uyarı: Dip konsantrasyonu (${min} mg/L) MEC tabanının altına düşüyor!`,
      paramsHeader: 'Dozaj ve Farmakokinetik Parametreleri',
      singleDoseAmount: 'Tek Doz Miktarı:',
      doseAria: 'Doz miktarı ayarı',
      decDoseAria: 'Dozu 50 mg azalt',
      incDoseAria: 'Dozu 50 mg artır',
      dosingInterval: 'Doz Aralığı (τ):',
      tauAria: 'Doz aralığı tau ayarı',
      decTauAria: 'Doz aralığını 2 saat azalt',
      incTauAria: 'Doz aralığını 2 saat artır',
      clearance: 'Vücut Klerensi (CL):',
      clAria: 'Klerens ayarı',
      decClAria: 'Klerensi 0.5 L/h azalt',
      incClAria: 'Klerensi 0.5 L/h artır',
      noticeHeader: 'Model İllüstrasyonu Notu:',
      noticeText: 'Çoklu doz farmakokinetik simülasyonu analitik süperpozisyon prensibiyle modellenmiştir. Kararlı durum birikim katsayısı R_acc = 1 / (1 - e^(-ke·τ)) ve ortalama kararlı durum konsantrasyonu C_ss_avg = (F·Doz) / (CL·τ) formülleriyle hesaplanır. Terapötik pencere (MEC-MTC) aşımı durumunda toksik ya da etkisiz plazma düzeyleri tetiklenir. Referans: ',
    },
    ar: {
      badge: 'محاكي الحركية الدوائية للجرعات المتكررة ومراقبة السلامة',
      title: 'قمرة قيادة الحركية الدوائية (PkCockpit)',
      oralRoute: (F: number) => `قرص فموي (F=${F})`,
      ivRoute: 'حقنة وريدية مباشرة (F=1.0)',
      plotTitle: 'منحنى التركيز مقابل الزمن (ملف تراكمي لخمس جرعات)',
      plotAria: 'رسم بياني لتركيز الجرعات المتكررة في الحركية الدوائية',
      timeAxis: 'الزمن (ساعات)',
      dataHeader: 'بيانات حالة الاستقرار (Css)',
      peak: 'الذروة (Css,max):',
      trough: 'القاع (Css,min):',
      average: 'المتوسط (Css,avg):',
      accumulation: 'التراكم (R_acc):',
      halfLife: 'عمر النصف (t1/2):',
      hoursUnit: 'ساعات',
      optimalAlert: '✓ ضمن النافذة العلاجية: تركيزات الذروة والقاع ضمن الحدود الآمنة المستهدفة!',
      toxicAlert: (max: string) => `⚠ تحذير من السمية: تركيز الذروة (${max} ملغ/لتر) تجاوز الحد الأقصى الآمن MTC!`,
      subtherapeuticAlert: (min: string) => `⚠ تحذير دون علاجي: تركيز القاع (${min} ملغ/لتر) هبط دون الحد الأدنى الفعال MEC!`,
      paramsHeader: 'معايير الجرعة والحركية الدوائية',
      singleDoseAmount: 'مقدار الجرعة المفردة:',
      doseAria: 'ضبط مقدار الجرعة',
      decDoseAria: 'إنقاص الجرعة 50 ملغ',
      incDoseAria: 'زيادة الجرعة 50 ملغ',
      dosingInterval: 'الفترة الفاصلة بين الجرعات (τ):',
      tauAria: 'ضبط الفترة الفاصلة tau',
      decTauAria: 'إنقاص الفترة الفاصلة ساعتين',
      incTauAria: 'زيادة الفترة الفاصلة ساعتين',
      clearance: 'التصفية الكلية بالجسم (CL):',
      clAria: 'ضبط معدل التصفية',
      decClAria: 'إنقاص التصفية بمقدار 0.5 لتر/ساعة',
      incClAria: 'زيادة التصفية بمقدار 0.5 لتر/ساعة',
      noticeHeader: 'ملاحظة النموذج التوضيحي:',
      noticeText: 'تمت نمذجة محاكاة الحركية الدوائية للجرعات المتكررة وفق مبدأ التراكب التحليلي. يُحسب معامل التراكم R_acc = 1 / (1 - e^(-ke·τ)) ومتوسط التركيز في حالة الاستقرار C_ss_avg = (F·Dose) / (CL·τ). تجاوز النافذة العلاجية (MEC-MTC) يؤدي إلى مستويات سامة أو غير علاجية. المرجع: ',
    },
    en: {
      badge: 'Multi-Dose PK Simulator & Safety Monitor',
      title: 'Pharmacokinetic Cockpit (PkCockpit)',
      oralRoute: (F: number) => `Oral Tablet (F=${F})`,
      ivRoute: 'IV Bolus (F=1.0)',
      plotTitle: 'Concentration-Time Curve (5-Dose Cumulative Profile)',
      plotAria: 'Pharmacokinetic Multi-Dose Concentration Plot',
      timeAxis: 'Time (hours)',
      dataHeader: 'Steady State (Css) Metrics',
      peak: 'Peak (Css,max):',
      trough: 'Trough (Css,min):',
      average: 'Average (Css,avg):',
      accumulation: 'Accumulation (R_acc):',
      halfLife: 'Half-Life (t1/2):',
      hoursUnit: 'hours',
      optimalAlert: '✓ In Therapeutic Window: Peak and trough concentrations remain within target safety bounds!',
      toxicAlert: (max: string) => `⚠ Toxicity Alert: Peak concentration (${max} mg/L) exceeded MTC limit!`,
      subtherapeuticAlert: (min: string) => `⚠ Subtherapeutic Alert: Trough concentration (${min} mg/L) fell below MEC threshold!`,
      paramsHeader: 'Dosing & Pharmacokinetic Parameters',
      singleDoseAmount: 'Unit Dose Amount:',
      doseAria: 'Dose amount setting',
      decDoseAria: 'Decrease dose by 50 mg',
      incDoseAria: 'Increase dose by 50 mg',
      dosingInterval: 'Dosing Interval (τ):',
      tauAria: 'Dosing interval tau setting',
      decTauAria: 'Decrease dosing interval by 2 hours',
      incTauAria: 'Increase dosing interval by 2 hours',
      clearance: 'Total Clearance (CL):',
      clAria: 'Clearance setting',
      decClAria: 'Decrease clearance by 0.5 L/h',
      incClAria: 'Increase clearance by 0.5 L/h',
      noticeHeader: 'Model Illustration Note:',
      noticeText: 'Multi-dose pharmacokinetic simulation is modeled using analytical superposition. Steady-state accumulation ratio R_acc = 1 / (1 - e^(-ke·τ)) and average steady-state concentration C_ss_avg = (F·Dose) / (CL·τ). Crossing the therapeutic window (MEC-MTC) triggers toxic or subtherapeutic alerts. Reference: ',
    },
  }[locale || 'tr'] || {
    badge: 'Çoklu-Doz PK Simülatörü & Güvenlik İzlemi',
    title: 'Farmakokinetik Kokpit (PkCockpit)',
    oralRoute: (F: number) => `Oral Tablet (F=${F})`,
    ivRoute: 'IV Bolus (F=1.0)',
    plotTitle: 'Zaman-Konsantrasyon Eğrisi (5 Dozluk Kümülatif Profil)',
    plotAria: 'Farmakokinetik Çoklu Doz Konsantrasyon Grafiği',
    timeAxis: 'Zaman (saat)',
    dataHeader: 'Kararlı Durum (Css) Verileri',
    peak: 'Tepe (Css,max):',
    trough: 'Dip (Css,min):',
    average: 'Ortalama (Css,avg):',
    accumulation: 'Kümülasyon (R_acc):',
    halfLife: 'Yarılanma Ömrü (t1/2):',
    hoursUnit: 'saat',
    optimalAlert: '✓ Terapötik Aralıkta: Tepe ve dip derişimler hedef güvenlik sınırları içinde!',
    toxicAlert: (max: string) => `⚠ Toksisite Uyarısı: Tepe konsantrasyonu (${max} mg/L) MTC tavanını aştı!`,
    subtherapeuticAlert: (min: string) => `⚠ Subterapötik Uyarı: Dip konsantrasyonu (${min} mg/L) MEC tabanının altına düşüyor!`,
    paramsHeader: 'Dozaj ve Farmakokinetik Parametreleri',
    singleDoseAmount: 'Tek Doz Miktarı:',
    doseAria: 'Doz miktarı ayarı',
    decDoseAria: 'Dozu 50 mg azalt',
    incDoseAria: 'Dozu 50 mg artır',
    dosingInterval: 'Doz Aralığı (τ):',
    tauAria: 'Doz aralığı tau ayarı',
    decTauAria: 'Doz aralığını 2 saat azalt',
    incTauAria: 'Doz aralığını 2 saat artır',
    clearance: 'Vücut Klerensi (CL):',
    clAria: 'Klerens ayarı',
    decClAria: 'Klerensi 0.5 L/h azalt',
    incClAria: 'Klerensi 0.5 L/h artır',
    noticeHeader: 'Model İllüstrasyonu Notu:',
    noticeText: 'Çoklu doz farmakokinetik simülasyonu analitik süperpozisyon prensibiyle modellenmiştir. Kararlı durum birikim katsayısı R_acc = 1 / (1 - e^(-ke·τ)) ve ortalama kararlı durum konsantrasyonu C_ss_avg = (F·Doz) / (CL·τ) formülleriyle hesaplanır. Terapötik pencere (MEC-MTC) aşımı durumunda toksik ya da etkisiz plazma düzeyleri tetiklenir. Referans: ',
  };

  const [doseMg, setDoseMg] = useState<number>(config.defaultDoseMg);
  const [tauHours, setTauHours] = useState<number>(config.defaultTauHours);
  const [clearanceLHr, setClearanceLHr] = useState<number>(config.defaultClearanceLHr);
  const [vdL, setVdL] = useState<number>(config.defaultVdL);
  const [route, setRoute] = useState<'oral' | 'iv_bolus'>(config.defaultRoute);

  const headingId = useId();

  // Basic PK rate constants
  // ke = CL / Vd (1/h)
  const ke = clearanceLHr / vdL;
  const halfLifeHours = 0.693 / ke;
  const ka = config.defaultKa;
  const F = route === 'iv_bolus' ? 1.0 : config.defaultBioavailabilityF;

  // Accumulation factor: R_acc = 1 / (1 - exp(-ke * tau))
  const rAcc = 1 / (1 - Math.exp(-ke * tauHours));

  // Steady-state average concentration: C_ss_avg = (F * Dose) / (CL * tau)
  const cssAvg = (F * doseMg) / (clearanceLHr * tauHours);

  // Steady-state peak & trough estimation
  let cssMax: number;
  let cssMin: number;

  if (route === 'iv_bolus') {
    cssMax = (doseMg / vdL) * rAcc;
    cssMin = cssMax * Math.exp(-ke * tauHours);
  } else {
    // Oral t_max at steady-state
    const tMax = Math.log(ka / ke) / (ka - ke);
    const oralFactor = (F * doseMg * ka) / (vdL * (ka - ke));
    cssMax =
      oralFactor *
      (rAcc * Math.exp(-ke * tMax) - (1 / (1 - Math.exp(-ka * tauHours))) * Math.exp(-ka * tMax));
    // Trough at t' = tau (immediately before next dose)
    cssMin =
      oralFactor *
      (rAcc * Math.exp(-ke * tauHours) -
        (1 / (1 - Math.exp(-ka * tauHours))) * Math.exp(-ka * tauHours));
  }

  // Safety Window checks
  const isToxic = cssMax > config.mtcMgL;
  const isSubtherapeutic = cssMin < config.mecMgL;
  const isOptimal = !isToxic && !isSubtherapeutic;

  // Generate Multi-Dose Simulation Profile across N=5 consecutive doses
  const totalDoses = 5;
  const totalTimeHours = totalDoses * tauHours;
  const numPlotSteps = 120;
  const plotData: { time: number; conc: number }[] = [];

  for (let step = 0; step <= numPlotSteps; step++) {
    const t = (step / numPlotSteps) * totalTimeHours;
    const currentDoseIndex = Math.min(totalDoses, Math.floor(t / tauHours) + 1);
    const tPrime = t - (currentDoseIndex - 1) * tauHours;

    let c = 0;
    if (route === 'iv_bolus') {
      const accTerm = (1 - Math.exp(-currentDoseIndex * ke * tauHours)) / (1 - Math.exp(-ke * tauHours));
      c = (doseMg / vdL) * accTerm * Math.exp(-ke * tPrime);
    } else {
      const accTermKe = (1 - Math.exp(-currentDoseIndex * ke * tauHours)) / (1 - Math.exp(-ke * tauHours));
      const accTermKa = (1 - Math.exp(-currentDoseIndex * ka * tauHours)) / (1 - Math.exp(-ka * tauHours));
      const factor = (F * doseMg * ka) / (vdL * (ka - ke));
      c = Math.max(0, factor * (accTermKe * Math.exp(-ke * tPrime) - accTermKa * Math.exp(-ka * tPrime)));
    }
    plotData.push({ time: t, conc: c });
  }

  // SVG dimensions
  const svgWidth = 520;
  const svgHeight = 250;
  const padding = { top: 20, right: 30, bottom: 40, left: 50 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  // Y-axis scaling: max concentration up to 1.3 * max(cssMax, mtc)
  const yMax = Math.max(config.mtcMgL * 1.4, cssMax * 1.25, 25);

  const toSvgX = (t: number) => padding.left + (t / totalTimeHours) * plotWidth;
  const toSvgY = (conc: number) => padding.top + plotHeight - (Math.min(yMax, conc) / yMax) * plotHeight;

  const pathD = plotData
    .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${toSvgX(pt.time).toFixed(1)} ${toSvgY(pt.conc).toFixed(1)}`)
    .join(' ');

  // Therapeutic Window Rect coordinates
  const mecY = toSvgY(config.mecMgL);
  const mtcY = toSvgY(config.mtcMgL);
  const windowHeight = mecY - mtcY;

  return (
    <section
      role="region"
      aria-labelledby={headingId}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`p-6 bg-[#FFF8E7] border-4 border-black shadow-[6px_6px_0px_#000000] rounded-none max-w-3xl mx-auto font-sans text-black ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b-4 border-black gap-2">
        <div>
          <span className="inline-block text-xs uppercase tracking-widest font-black bg-[#FF9F45] text-black px-2 py-0.5 border-2 border-black mb-1">
            {dict.badge}
          </span>
          <h3 id={headingId} className="text-xl sm:text-2xl font-black uppercase tracking-tight">
            {dict.title}
          </h3>
        </div>

        {/* Route Toggle */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setRoute('oral')}
            data-testid="toggle-oral"
            className={`px-3 py-1 font-bold text-xs border-2 border-black ${
              route === 'oral' ? 'bg-[#FFD93D] text-black shadow-[2px_2px_0px_#000000]' : 'bg-white'
            }`}
          >
            {dict.oralRoute(config.defaultBioavailabilityF)}
          </button>
          <button
            type="button"
            onClick={() => setRoute('iv_bolus')}
            data-testid="toggle-iv"
            className={`px-3 py-1 font-bold text-xs border-2 border-black ${
              route === 'iv_bolus' ? 'bg-[#FFD93D] text-black shadow-[2px_2px_0px_#000000]' : 'bg-white'
            }`}
          >
            {dict.ivRoute}
          </button>
        </div>
      </div>

      {/* Main Vector Multi-Dose Time Course & Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* SVG Plot (2 cols) */}
        <div className="md:col-span-2 bg-white border-4 border-black p-4 flex flex-col items-center">
          <div className="w-full flex justify-between items-center text-xs font-mono font-bold mb-2">
            <span>{dict.plotTitle}</span>
            <span className="text-gray-500">{config.drugName}</span>
          </div>

          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto bg-[#FAFAFA] border-2 border-black"
            aria-label={dict.plotAria}
          >
            {/* Shaded Green Therapeutic Target Window */}
            <rect
              data-testid="therapeutic-window-rect"
              x={padding.left}
              y={mtcY}
              width={plotWidth}
              height={Math.max(0, windowHeight)}
              fill="#E8F5E9"
              opacity="0.8"
            />

            {/* MTC & MEC Dashed Lines */}
            <line
              x1={padding.left}
              y1={mtcY}
              x2={padding.left + plotWidth}
              y2={mtcY}
              stroke="#D32F2F"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <text x={padding.left + plotWidth - 5} y={mtcY - 4} textAnchor="end" fontSize="9" fontWeight="bold" fill="#D32F2F">
              MTC ({config.mtcMgL} mg/L)
            </text>

            <line
              x1={padding.left}
              y1={mecY}
              x2={padding.left + plotWidth}
              y2={mecY}
              stroke="#F57C00"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <text x={padding.left + plotWidth - 5} y={mecY + 12} textAnchor="end" fontSize="9" fontWeight="bold" fill="#F57C00">
              MEC ({config.mecMgL} mg/L)
            </text>

            {/* Steady State Average Line */}
            <line
              x1={padding.left}
              y1={toSvgY(cssAvg)}
              x2={padding.left + plotWidth}
              y2={toSvgY(cssAvg)}
              stroke="#1976D2"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />

            {/* Concentration Curve */}
            <path
              data-testid="pk-time-course-curve"
              d={pathD}
              fill="none"
              stroke="#000"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Axis Lines */}
            <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + plotHeight} stroke="#000" strokeWidth="2" />
            <line x1={padding.left} y1={padding.top + plotHeight} x2={padding.left + plotWidth} y2={padding.top + plotHeight} stroke="#000" strokeWidth="2" />

            {/* X-axis ticks (doses) */}
            {Array.from({ length: totalDoses + 1 }).map((_, idx) => {
              const t = idx * tauHours;
              const x = toSvgX(t);
              return (
                <g key={idx}>
                  <line x1={x} y1={padding.top + plotHeight} x2={x} y2={padding.top + plotHeight + 5} stroke="#000" strokeWidth="2" />
                  <text x={x} y={padding.top + plotHeight + 16} textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    {t}h
                  </text>
                </g>
              );
            })}

            {/* Y-axis Ticks */}
            {[0, Math.round(yMax / 2), Math.round(yMax)].map((val) => {
              const y = toSvgY(val);
              return (
                <g key={val}>
                  <line x1={padding.left - 4} y1={y} x2={padding.left} y2={y} stroke="#000" strokeWidth="2" />
                  <text x={padding.left - 6} y={y + 3} textAnchor="end" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    {val}
                  </text>
                </g>
              );
            })}

            <text x={padding.left + plotWidth / 2} y={svgHeight - 6} textAnchor="middle" fontSize="10" fontWeight="bold">
              {dict.timeAxis}
            </text>
          </svg>
        </div>

        {/* Calculated Safety & Accumulation Metrics (1 col) */}
        <div className="bg-white border-4 border-black p-4 flex flex-col justify-between">
          <div>
            <div className="text-xs font-black uppercase text-gray-500 mb-2">{dict.dataHeader}</div>

            <div className="space-y-2.5 font-mono text-xs mb-3">
              <div className="p-2 bg-gray-50 border-2 border-black flex justify-between">
                <span className="text-gray-600">{dict.peak}</span>
                <span data-testid="metric-css-max" className={`font-black ${isToxic ? 'text-red-600' : 'text-black'}`}>
                  {cssMax.toFixed(1)} mg/L
                </span>
              </div>

              <div className="p-2 bg-gray-50 border-2 border-black flex justify-between">
                <span className="text-gray-600">{dict.trough}</span>
                <span data-testid="metric-css-min" className={`font-black ${isSubtherapeutic ? 'text-amber-600' : 'text-black'}`}>
                  {cssMin.toFixed(1)} mg/L
                </span>
              </div>

              <div className="p-2 bg-gray-50 border-2 border-black flex justify-between">
                <span className="text-gray-600">{dict.average}</span>
                <span data-testid="metric-css-avg" className="font-black text-blue-700">
                  {cssAvg.toFixed(1)} mg/L
                </span>
              </div>

              <div className="p-2 bg-gray-50 border-2 border-black flex justify-between">
                <span className="text-gray-600">{dict.accumulation}</span>
                <span data-testid="metric-r-acc" className="font-black text-black">
                  {rAcc.toFixed(2)}x
                </span>
              </div>

              <div className="p-2 bg-gray-50 border-2 border-black flex justify-between">
                <span className="text-gray-600">{dict.halfLife}</span>
                <span data-testid="metric-half-life" className="font-black text-black">
                  {halfLifeHours.toFixed(1)} {dict.hoursUnit}
                </span>
              </div>
            </div>

            {/* Safety Notification Alert Banner */}
            {isOptimal && (
              <div
                data-testid="alert-target-range"
                className="p-2.5 bg-[#E8F5E9] border-2 border-green-700 text-green-900 font-sans font-bold text-xs"
              >
                {dict.optimalAlert}
              </div>
            )}
            {isToxic && (
              <div
                data-testid="alert-toxicity-warning"
                className="p-2.5 bg-[#FFEBEE] border-2 border-red-700 text-red-900 font-sans font-bold text-xs"
              >
                {dict.toxicAlert(cssMax.toFixed(1))}
              </div>
            )}
            {isSubtherapeutic && (
              <div
                data-testid="alert-subtherapeutic-warning"
                className="p-2.5 bg-[#FFF9C4] border-2 border-amber-700 text-amber-900 font-sans font-bold text-xs mt-1.5"
              >
                {dict.subtherapeuticAlert(cssMin.toFixed(1))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Sliders & WCAG 2.2 Controls */}
      <div className="p-4 bg-white border-4 border-black mb-4">
        <div className="text-xs font-black uppercase tracking-wider mb-4">{dict.paramsHeader}</div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Dose (mg) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs font-bold font-mono">
              <span>{dict.singleDoseAmount}</span>
              <span data-testid="value-dose" className="text-black font-black">{doseMg} mg</span>
            </div>
            <input
              type="range"
              min="100"
              max="1200"
              step="50"
              value={doseMg}
              onChange={(e) => setDoseMg(parseInt(e.target.value, 10))}
              aria-label={dict.doseAria}
              className="w-full accent-black cursor-pointer"
            />
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setDoseMg((prev) => Math.max(100, prev - 50))}
                aria-label={dict.decDoseAria}
                className="px-2 py-0.5 bg-gray-200 border-2 border-black font-mono font-bold text-xs"
              >
                -50 mg
              </button>
              <button
                type="button"
                onClick={() => setDoseMg((prev) => Math.min(1200, prev + 50))}
                aria-label={dict.incDoseAria}
                className="px-2 py-0.5 bg-gray-200 border-2 border-black font-mono font-bold text-xs"
              >
                +50 mg
              </button>
            </div>
          </div>

          {/* Dosing Interval (tau) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs font-bold font-mono">
              <span>{dict.dosingInterval}</span>
              <span data-testid="value-tau" className="text-black font-black">{tauHours} {dict.hoursUnit}</span>
            </div>
            <input
              type="range"
              min="4"
              max="24"
              step="2"
              value={tauHours}
              onChange={(e) => setTauHours(parseInt(e.target.value, 10))}
              aria-label={dict.tauAria}
              className="w-full accent-black cursor-pointer"
            />
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setTauHours((prev) => Math.max(4, prev - 2))}
                aria-label={dict.decTauAria}
                className="px-2 py-0.5 bg-gray-200 border-2 border-black font-mono font-bold text-xs"
              >
                -2h
              </button>
              <button
                type="button"
                onClick={() => setTauHours((prev) => Math.min(24, prev + 2))}
                aria-label={dict.incTauAria}
                className="px-2 py-0.5 bg-gray-200 border-2 border-black font-mono font-bold text-xs"
              >
                +2h
              </button>
            </div>
          </div>

          {/* Clearance (CL) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs font-bold font-mono">
              <span>{dict.clearance}</span>
              <span data-testid="value-cl" className="text-black font-black">{clearanceLHr.toFixed(1)} L/h</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="10.0"
              step="0.5"
              value={clearanceLHr}
              onChange={(e) => setClearanceLHr(parseFloat(e.target.value))}
              aria-label={dict.clAria}
              className="w-full accent-black cursor-pointer"
            />
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setClearanceLHr((prev) => Math.max(1.0, parseFloat((prev - 0.5).toFixed(1))))}
                aria-label={dict.decClAria}
                className="px-2 py-0.5 bg-gray-200 border-2 border-black font-mono font-bold text-xs"
              >
                -0.5
              </button>
              <button
                type="button"
                onClick={() => setClearanceLHr((prev) => Math.min(10.0, parseFloat((prev + 0.5).toFixed(1))))}
                aria-label={dict.incClAria}
                className="px-2 py-0.5 bg-gray-200 border-2 border-black font-mono font-bold text-xs"
              >
                +0.5
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
        <span className="font-bold text-black uppercase">{dict.noticeHeader}</span>{' '}
        {dict.noticeText + config.equationRef}
      </aside>
    </section>
  );
};
