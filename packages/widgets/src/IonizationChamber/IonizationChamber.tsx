import React, { useState, useId } from 'react';
import { clsx } from 'clsx';
import { Card, StickerBadge, Button } from '@pharmacy/ui';
import { BaseSimulationWidgetProps, calculateIonizationFractions } from '../types';
import { IonizationChamberConfig } from './schema';
import { ModelIllustrationNotice } from '../common/ModelIllustrationNotice';

export interface IonizationChamberProps extends BaseSimulationWidgetProps {
  config?: Partial<IonizationChamberConfig>;
  className?: string;
}

const DEFAULT_CONFIG: IonizationChamberConfig = {
  drugName: 'Aspirin (Asetilsalisilik Asit)',
  pKa: 3.5,
  drugType: 'weak_acid',
  compartmentA: {
    name: 'Mide Lümeni (Stomach)',
    defaultPh: 1.5,
    minPh: 1.0,
    maxPh: 8.5,
    surfaceAreaM2: 1.0,
  },
  compartmentB: {
    name: 'Sistemik Kan (Blood)',
    ph: 7.4,
    surfaceAreaM2: 32.0,
  },
  maxParticleCount: 20,
  equationRef: 'Helander & Fändriks (2014); Foye Principles of Medicinal Chemistry 8th ed.',
};

const STRINGS = {
  tr: {
    title: 'İyonizasyon ve Membran Geçiş Odası',
    subtitle: (drugName: string, pKa: number) => `${drugName} (pKa: ${pKa})`,
    phControl: 'Ortam pH Seviyesi:',
    areaControl: 'Mukozal Yüzey Alanı:',
    stomachPreset: 'Mide (pH 1.5, ~1 m²)',
    intestinePreset: 'İnce Bağırsak (pH 6.5, ~32 m²)',
    ionizedLabel: 'İyonize Fraksiyon (Geçemez)',
    nonIonizedLabel: 'Nötr Fraksiyon (Geçer)',
    membraneLabel: 'Lipid Çift Tabaka (Hücre Zarı)',
    membraneSub: 'Lipofilik Bariyer (P)',
    bloodLabel: 'Mezenterik Kan Akımı (pH 7.4)',
    massFlux: 'Göreceli Emilim Akısı (J = P · A · C):',
    fluxUnit: 'akı birimi',
    areaLabel: (area: number) => `Alan: ${area} m²`,
    acidic: '(Asidik)',
    basic: '(Bazik)',
    ratioHalf: (pKa: number) => `pH = pKa (${pKa.toFixed(1)}) → %50 : %50`,
    paradoxAlert: 'Aspirin Paradoksu: Midede %99 nötr molekül bulunmasına rağmen, ince bağırsağın 30 katlık dev yüzey alanı (~32 m²) ve Le Chatelier çekimi emilimin %90+ oranında bağırsaktan gerçekleşmesini sağlar.',
    modelEq: 'pH - pKa = log([A⁻]/[HA]) | J = P · A · ΔC',
    modelSource: 'Prof. Dr. Bedia Kaymakçıoğlu, Farmasötik Kimya; Helander & Fändriks (2014)',
    drugTypeLabels: {
      weak_acid: 'ZAYIF ASİT',
      weak_base: 'ZAYIF BAZ',
    },
    defaultDrugName: 'Aspirin (Asetilsalisilik Asit)',
    defaultCompartmentA: 'Mide Lümeni',
    defaultCompartmentB: 'Sistemik Kan',
    assumptions: [
      "Pasif transselüler geçiş Fick'in birinci difüzyon yasasına uyar.",
      'İyonize türler (A⁻) ihmal edilebilir lipid çift tabaka geçirgenliğine sahiptir.',
      'İnce bağırsak mukozal yüzey alanı (~30-32 m²) Helander ve Fändriks (2014) mikrovillüs ölçümlerine dayanır.',
    ],
  },
  en: {
    title: 'Ionization & Membrane Permeation Chamber',
    subtitle: (drugName: string, pKa: number) => `${drugName} (pKa: ${pKa})`,
    phControl: 'Medium pH Level:',
    areaControl: 'Mucosal Surface Area:',
    stomachPreset: 'Stomach (pH 1.5, ~1 m²)',
    intestinePreset: 'Intestine (pH 6.5, ~32 m²)',
    ionizedLabel: 'Ionized Fraction (Blocked)',
    nonIonizedLabel: 'Neutral Fraction (Crosses)',
    membraneLabel: 'Lipid Bilayer Membrane',
    membraneSub: 'Lipophilic Barrier (P)',
    bloodLabel: 'Systemic Blood (pH 7.4)',
    massFlux: 'Relative Mass Flux (J = P · A · C):',
    fluxUnit: 'flux units',
    areaLabel: (area: number) => `Area: ${area} m²`,
    acidic: '(Acidic)',
    basic: '(Basic)',
    ratioHalf: (pKa: number) => `pH = pKa (${pKa.toFixed(1)}) → 50% : 50%`,
    paradoxAlert: 'Aspirin Paradox: Although 99% un-ionized in stomach, the intestine\'s 30-fold larger surface area (~32 m²) and sink condition drive >90% of total absorption.',
    modelEq: 'pH - pKa = log([A⁻]/[HA]) | J = P · A · ΔC',
    modelSource: 'Prof. Dr. Bedia Kaymakçıoğlu, Farmasötik Kimya; Helander & Fändriks (2014)',
    drugTypeLabels: {
      weak_acid: 'WEAK ACID',
      weak_base: 'WEAK BASE',
    },
    defaultDrugName: 'Aspirin (Acetylsalicylic Acid)',
    defaultCompartmentA: 'Gastric Lumen',
    defaultCompartmentB: 'Systemic Blood',
    assumptions: [
      'Passive transcellular permeation follows Fick\'s first law of diffusion.',
      'Ionized species (A⁻) have negligible passive lipid bilayer permeability.',
      'Intestinal mucosal surface area (~30–32 m²) follows Helander & Fändriks (2014) physiological microvilli measurements.',
    ],
  },
  ar: {
    title: 'حجيرة التأين ونفوذية الأغشية الخلوية',
    subtitle: (drugName: string, pKa: number) => `${drugName} (pKa: ${pKa})`,
    phControl: 'درجة حموضة الوسط (pH):',
    areaControl: 'مساحة السطح المخاطي:',
    stomachPreset: 'المعدة (pH 1.5، ~1 م²)',
    intestinePreset: 'الأمعاء (pH 6.5، ~32 م²)',
    ionizedLabel: 'الكسر المتأين (ممنوع العبور)',
    nonIonizedLabel: 'الكسر المتعادل (يعبر الغشاء)',
    membraneLabel: 'غشاء ثنائي الطبقة الشحمية',
    membraneSub: 'حاجز محب للدهون (P)',
    bloodLabel: 'التروية الدموية (pH 7.4)',
    massFlux: 'تدفق الامتصاص النسبي (J = P · A · C):',
    fluxUnit: 'وحدة تدفق',
    areaLabel: (area: number) => `المساحة: ${area} م²`,
    acidic: '(حمضي)',
    basic: '(قاعدي)',
    ratioHalf: (pKa: number) => `pH = pKa (${pKa.toFixed(1)}) → %50 : %50`,
    paradoxAlert: 'مفارقة الأسبرين: رغم أن 99% منه غير متأين بالمعدة، فإن مساحة الأمعاء الأكبر بـ 30 ضعفاً (~32 م²) تجعل 90%+ من الامتصاص معوياً.',
    modelEq: 'pH - pKa = log([A⁻]/[HA]) | J = P · A · ΔC',
    modelSource: 'Prof. Dr. Bedia Kaymakçıoğlu, Farmasötik Kimya; Helander & Fändriks (2014)',
    drugTypeLabels: {
      weak_acid: 'حمض ضعيف',
      weak_base: 'قاعدة ضعيفة',
    },
    defaultDrugName: 'الأسبرين (حمض أسيتيل ساليسيليك)',
    defaultCompartmentA: 'تجويف المعدة',
    defaultCompartmentB: 'الدم الجهازي',
    assumptions: [
      'يتبع النفاذ السلبي عبر الخلايا قانون فيك الأول للانتشار.',
      'الأنواع المتأينة (A⁻) نفاذيتها عبر الغشاء الدهني مهملة.',
      'مساحة السطح المخاطي المعوي (~30-32 م²) تستند لقياسات هيلاندر وفاندريكس (2014).',
    ],
  },
};

export const IonizationChamber: React.FC<IonizationChamberProps> = ({
  config: userConfig,
  locale = 'tr',
  readOnly = false,
  className,
  onStateChange,
}) => {
  const isAr = locale === 'ar';
  const t = STRINGS[locale] || STRINGS.tr;

  const drugName = userConfig?.drugName || t.defaultDrugName;
  const compartmentAName = userConfig?.compartmentA?.name || t.defaultCompartmentA;
  const compartmentBName = userConfig?.compartmentB?.name || t.defaultCompartmentB;

  const config: IonizationChamberConfig = {
    ...DEFAULT_CONFIG,
    drugName,
    ...userConfig,
    compartmentA: {
      ...DEFAULT_CONFIG.compartmentA,
      name: compartmentAName,
      ...userConfig?.compartmentA,
    },
    compartmentB: {
      ...DEFAULT_CONFIG.compartmentB,
      name: compartmentBName,
      ...userConfig?.compartmentB,
    },
  };

  const [currentPh, setCurrentPh] = useState<number>(config.compartmentA.defaultPh);
  const [currentSurfaceArea, setCurrentSurfaceArea] = useState<number>(config.compartmentA.surfaceAreaM2);
  const sliderId = useId();

  const fractions = calculateIonizationFractions(currentPh, config.pKa, config.drugType);
  const ionizedPct = Math.round(fractions.ionizedFraction * 1000) / 10;
  const nonIonizedPct = Math.round(fractions.nonIonizedFraction * 1000) / 10;

  // Relative mucosal flux: Flux ~ Permeability * Area * C_nonionized
  const relativeFlux = Math.round(currentSurfaceArea * fractions.nonIonizedFraction * 100);

  const handlePhChange = (newPh: number) => {
    const clamped = Math.max(config.compartmentA.minPh, Math.min(config.compartmentA.maxPh, Math.round(newPh * 10) / 10));
    setCurrentPh(clamped);
    onStateChange?.({ ph: clamped, surfaceArea: currentSurfaceArea, ionizedPct, nonIonizedPct });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (readOnly) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      handlePhChange(currentPh + 0.1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      handlePhChange(currentPh - 0.1);
    } else if (e.key === 'PageUp') {
      e.preventDefault();
      handlePhChange(currentPh + 1.0);
    } else if (e.key === 'PageDown') {
      e.preventDefault();
      handlePhChange(currentPh - 1.0);
    }
  };

  const totalDots = config.maxParticleCount;
  const ionizedDots = Math.round((ionizedPct / 100) * totalDots);
  const nonIonizedDots = totalDots - ionizedDots;

  return (
    <Card
      role="region"
      aria-label={t.title}
      dir={isAr ? 'rtl' : 'ltr'}
      className={clsx('space-y-4 p-4 md:p-6 bg-[#FFF8E7] dark:bg-[#0B0F17] text-start', className)}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-3 border-black dark:border-slate-700 pb-3">
        <div>
          <h3 className="font-display font-black text-base md:text-lg uppercase tracking-tight text-black dark:text-white">
            {t.title}
          </h3>
          <p className="font-mono text-xs text-gray-700 dark:text-slate-300">
            {t.subtitle(config.drugName, config.pKa)}
          </p>
        </div>
        <StickerBadge variant="blue" size="sm">
          {t.drugTypeLabels[config.drugType as keyof typeof t.drugTypeLabels] || config.drugType.toUpperCase().replace('_', ' ')}
        </StickerBadge>
      </div>

      {/* Preset Quick Selectors */}
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={currentPh <= 2.5 ? 'primary' : 'secondary'}
          onClick={() => {
            handlePhChange(1.5);
            setCurrentSurfaceArea(1.0);
          }}
          disabled={readOnly}
        >
          {t.stomachPreset}
        </Button>
        <Button
          size="sm"
          variant={currentPh >= 6.0 && currentPh <= 7.0 ? 'primary' : 'secondary'}
          onClick={() => {
            handlePhChange(6.5);
            setCurrentSurfaceArea(32.0);
          }}
          disabled={readOnly}
        >
          {t.intestinePreset}
        </Button>
      </div>

      {/* Interactive pH Stepper (WCAG 2.2 Compliant) */}
      <div className="bg-white dark:bg-[#131B2A] border-3 border-black dark:border-slate-700 p-3 shadow-neo-sm">
        <div className="flex justify-between items-center mb-1">
          <label
            htmlFor={sliderId}
            className="font-display font-extrabold text-xs uppercase tracking-wider text-black dark:text-white"
          >
            {t.phControl} <span className="font-mono text-sm text-[#4D96FF]">pH {currentPh.toFixed(1)}</span>
          </label>
          <span className="font-mono text-xs text-gray-600 dark:text-slate-400">
            pKₐ = {config.pKa.toFixed(1)}
          </span>
        </div>

        <input
          id={sliderId}
          type="range"
          min={config.compartmentA.minPh}
          max={config.compartmentA.maxPh}
          step={0.1}
          value={currentPh}
          disabled={readOnly}
          onChange={(e) => handlePhChange(parseFloat(e.target.value))}
          onKeyDown={handleKeyDown}
          aria-valuemin={config.compartmentA.minPh}
          aria-valuemax={config.compartmentA.maxPh}
          aria-valuenow={currentPh}
          aria-valuetext={`pH ${currentPh.toFixed(1)}, ${nonIonizedPct}% neutral, ${ionizedPct}% ionized`}
          className="w-full accent-black dark:accent-[#FFD93D] cursor-pointer"
        />

        <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-1">
          <span>pH {config.compartmentA.minPh.toFixed(1)} {t.acidic}</span>
          <span className="font-bold text-black dark:text-white">{t.ratioHalf(config.pKa)}</span>
          <span>pH {config.compartmentA.maxPh.toFixed(1)} {t.basic}</span>
        </div>
      </div>

      {/* Biophysical Chamber Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 border-3 border-black dark:border-slate-700 bg-white dark:bg-[#131B2A] p-4 shadow-neo">
        {/* Left: Donor Lumen Compartment */}
        <div className="md:col-span-2 space-y-2">
          <div className="flex items-center justify-between border-b-2 border-black dark:border-slate-700 pb-1">
            <span className="font-display font-bold text-xs uppercase text-black dark:text-white">
              {config.compartmentA.name}
            </span>
            <span className="font-mono text-xs px-1.5 py-0.5 bg-yellow-100 dark:bg-yellow-950/40 text-black dark:text-white border border-black">
              {t.areaLabel(currentSurfaceArea)}
            </span>
          </div>

          <div className="min-h-[140px] border-2 border-dashed border-black/30 dark:border-slate-700 p-2 flex flex-wrap content-start gap-1.5 bg-[#FFFDF7] dark:bg-[#1A2234]">
            {Array.from({ length: totalDots }).map((_, idx) => {
              const isIonized = idx < ionizedDots;
              return (
                <div
                  key={idx}
                  title={isIonized ? `${t.ionizedLabel}` : `${t.nonIonizedLabel}`}
                  className={clsx(
                    'w-6 h-6 border-2 border-black flex items-center justify-center text-[10px] font-mono font-bold select-none transition-transform duration-150',
                    isIonized
                      ? 'bg-[#FF6B9D] text-black shadow-[0_0_8px_rgba(255,107,157,0.6)]'
                      : 'bg-[#6BCB77] text-black'
                  )}
                >
                  {isIonized ? 'A⁻' : 'HA'}
                </div>
              );
            })}
          </div>

          {/* Ratio summary bar */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-1.5 bg-[#6BCB77]/20 border border-black dark:border-slate-700 text-black dark:text-white">
              <span className="font-bold">HA:</span> {nonIonizedPct}%
            </div>
            <div className="p-1.5 bg-[#FF6B9D]/20 border border-black dark:border-slate-700 text-black dark:text-white">
              <span className="font-bold">A⁻:</span> {ionizedPct}%
            </div>
          </div>
        </div>

        {/* Center: Lipid Bilayer Barrier */}
        <div className="md:col-span-1 flex flex-col items-center justify-center border-2 border-black dark:border-slate-700 bg-amber-100 dark:bg-amber-950/30 p-2 text-center">
          <div className="w-2 h-16 bg-amber-400 dark:bg-amber-600 border border-black my-1" />
          <span className="font-display font-extrabold text-[10px] uppercase tracking-tighter text-black dark:text-white leading-tight">
            {t.membraneLabel}
          </span>
          <span className="font-mono text-[9px] text-gray-600 dark:text-slate-400 mt-1">
            {t.membraneSub}
          </span>
        </div>

        {/* Right: Receptor / Blood Sink Compartment */}
        <div className="md:col-span-2 space-y-2">
          <div className="flex items-center justify-between border-b-2 border-black dark:border-slate-700 pb-1">
            <span className="font-display font-bold text-xs uppercase text-black dark:text-white">
              {config.compartmentB.name}
            </span>
            <span className="font-mono text-xs px-1.5 py-0.5 bg-blue-100 dark:bg-blue-950/40 text-black dark:text-white border border-black">
              pH {config.compartmentB.ph}
            </span>
          </div>

          <div className="min-h-[140px] border-2 border-dashed border-black/30 dark:border-slate-700 p-3 flex flex-col justify-center items-center bg-[#F0F7FF] dark:bg-[#162238] text-center">
            <span className="font-mono text-xs text-gray-700 dark:text-slate-300">
              {t.massFlux}
            </span>
            <span className="font-display text-2xl font-black text-black dark:text-white my-1">
              {relativeFlux} <span className="text-xs font-mono font-normal">{t.fluxUnit}</span>
            </span>
            <span className="text-[11px] font-mono text-gray-600 dark:text-slate-400">
              J = P · ({currentSurfaceArea} m²) · ({nonIonizedPct}%)
            </span>
          </div>

          <div className="p-1.5 bg-blue-50 dark:bg-blue-950/20 border border-black dark:border-slate-700 text-[11px] font-mono text-black dark:text-white">
            {t.bloodLabel}
          </div>
        </div>
      </div>

      {/* Clinical Insight / Paradox Callout */}
      <div className="p-3 bg-white dark:bg-[#131B2A] border-2 border-black dark:border-slate-700 text-xs text-black dark:text-slate-200">
        <span className="font-bold text-amber-600 dark:text-amber-400 mr-1">💡</span>
        {t.paradoxAlert}
      </div>

      {/* Model Transparency Disclaimer */}
      <ModelIllustrationNotice
        equation={t.modelEq}
        sourceReference={t.modelSource}
        locale={locale}
        assumptions={t.assumptions}
      />
    </Card>
  );
};

IonizationChamber.displayName = 'IonizationChamber';
