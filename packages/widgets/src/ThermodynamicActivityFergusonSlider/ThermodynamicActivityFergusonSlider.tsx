import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Card, StickerBadge, Slider, TechnicalTermBadge } from '@pharmacy/ui';
import { BaseSimulationWidgetProps } from '../types';
import { ThermodynamicActivityFergusonConfig } from './schema';
import { ModelIllustrationNotice } from '../common/ModelIllustrationNotice';

export interface FergusonState {
  mode: 'vapor' | 'solution';
  targetValue: number;
  saturationValue: number;
  activity: number;
  effectiveActivity: number;
  isCutoff: boolean;
  membraneVolumeExpansion: number;
}

export interface ThermodynamicActivityFergusonSliderProps
  extends BaseSimulationWidgetProps {
  config?: ThermodynamicActivityFergusonConfig;
  className?: string;
  disabled?: boolean;
}

export interface FergusonAgent {
  id: string;
  nameTr: string;
  nameAr: string;
  nameEn?: string;
  mode: 'vapor' | 'solution';
  saturationValue: number;
  unit: string;
  surgicalTarget: number;
}

export const FERGUSON_AGENTS: FergusonAgent[] = [
  {
    id: 'ether',
    nameTr: 'Dietil Eter',
    nameAr: 'ثنائي إيثيل الإيثر',
    nameEn: 'Diethyl Ether',
    mode: 'vapor',
    saturationValue: 440,
    unit: 'mmHg',
    surgicalTarget: 17.6,
  },
  {
    id: 'chloroform',
    nameTr: 'Kloroform',
    nameAr: 'كلوروفورم',
    nameEn: 'Chloroform',
    mode: 'vapor',
    saturationValue: 160,
    unit: 'mmHg',
    surgicalTarget: 6.4,
  },
  {
    id: 'halothane',
    nameTr: 'Halotan',
    nameAr: 'هالوثان',
    nameEn: 'Halothane',
    mode: 'vapor',
    saturationValue: 243,
    unit: 'mmHg',
    surgicalTarget: 9.7,
  },
  {
    id: 'n2o',
    nameTr: 'Azot Protoksit (N₂O)',
    nameAr: 'أكسيد النيتروز (N₂O)',
    nameEn: 'Nitrous Oxide (N₂O)',
    mode: 'vapor',
    saturationValue: 39000,
    unit: 'mmHg',
    surgicalTarget: 1560,
  },
  {
    id: 'butanol',
    nameTr: '1-Bütanol',
    nameAr: '1-بيوتانول',
    nameEn: '1-Butanol',
    mode: 'solution',
    saturationValue: 1000,
    unit: 'mM',
    surgicalTarget: 40,
  },
  {
    id: 'octanol',
    nameTr: '1-Oktanol',
    nameAr: '1-أوكتانول',
    nameEn: '1-Octanol',
    mode: 'solution',
    saturationValue: 4.0,
    unit: 'mM',
    surgicalTarget: 0.16,
  },
  {
    id: 'dodecanol',
    nameTr: '1-Dodekanol (Kesilme Örneği)',
    nameAr: '1-دوديكانول (مثال الانقطاع)',
    nameEn: '1-Dodecanol (Cutoff Example)',
    mode: 'solution',
    saturationValue: 0.02,
    unit: 'mM',
    surgicalTarget: 0.02,
  },
];

export function calculateFergusonActivity(
  targetValue: number,
  saturationValue: number
): {
  activity: number;
  effectiveActivity: number;
  isCutoff: boolean;
  membraneVolumeExpansion: number;
} {
  if (saturationValue <= 0) {
    return {
      activity: 0,
      effectiveActivity: 0,
      isCutoff: false,
      membraneVolumeExpansion: 0,
    };
  }

  const rawActivity = targetValue / saturationValue;
  const activity = Math.round(rawActivity * 1000) / 1000;
  const effectiveActivity = Math.min(1.0, activity);
  const isCutoff = activity > 1.0;
  const membraneVolumeExpansion = Math.round(4.0 * effectiveActivity * 100) / 100;

  return {
    activity,
    effectiveActivity,
    isCutoff,
    membraneVolumeExpansion,
  };
}

export function getFergusonBiologicalStatus(activity: number): {
  stageTr: string;
  stageAr: string;
  stageEn?: string;
  descriptionTr: string;
  descriptionAr: string;
  descriptionEn?: string;
  severity: 'normal' | 'sedation' | 'surgical' | 'deep' | 'toxic' | 'cutoff';
} {
  if (activity <= 0.0) {
    return {
      stageTr: 'Bilinç Açık (Etki Yok)',
      stageAr: 'واعي (لا يوجد تأثير بيولوجي)',
      stageEn: 'Full Consciousness (No Effect)',
      descriptionTr: 'Sistemik depresyon gözlenmez; nöronal membran dinlenim durumundadır.',
      descriptionAr: 'لا يلاحظ تثبيط جهازي؛ الغشاء العصبي في حالة راحة.',
      descriptionEn: 'No systemic depression observed; neuronal membrane is at resting state.',
      severity: 'normal',
    };
  }
  if (activity < 0.01) {
    return {
      stageTr: 'Bilinç Açık / Subklinik Etki',
      stageAr: 'واعي / تأثير تحت سريري',
      stageEn: 'Full Consciousness / Subclinical Effect',
      descriptionTr: 'Aktivite anestetik eşiğin altındadır; klinik sedasyon oluşmaz.',
      descriptionAr: 'النشاط تحت العتبة التخديرية؛ لا يحدث تخدير سريري.',
      descriptionEn: 'Activity is below anesthetic threshold; no clinical sedation occurs.',
      severity: 'normal',
    };
  }
  if (activity < 0.02) {
    return {
      stageTr: 'Hafif Sedasyon',
      stageAr: 'تخدير خفيف (Sedasyon)',
      stageEn: 'Mild Sedation',
      descriptionTr: 'Hafif anksiyoliz ve psikomotor yavaşlama başlar.',
      descriptionAr: 'يبدأ تخفيف القلق وتباطؤ الحركة النفسية.',
      descriptionEn: 'Mild anxiolysis and psychomotor slowing begin.',
      severity: 'sedation',
    };
  }
  if (activity <= 0.05) {
    return {
      stageTr: 'Cerrahi Anestezi (Ferguson Penceresi)',
      stageAr: 'تخدير جراحي (نافذة فيرغسون المتساوية)',
      stageEn: 'Surgical Anesthesia (Ferguson Window)',
      descriptionTr: 'Optimal cerrahi anestezi aralığı (a ≈ 0.02-0.05). Tüm yapısal olmayan ajanlar bu aralıkta eşit anestezi oluşturur.',
      descriptionAr: 'النطاق المثالي للتخدير الجراحي (a ≈ 0.02-0.05). تنتج جميع المواد غير النوعية تخديراً متساوياً عند هذا النشاط.',
      descriptionEn: 'Optimal surgical anesthesia window (a ≈ 0.02-0.05). All structurally non-specific agents produce equal anesthesia in this window.',
      severity: 'surgical',
    };
  }
  if (activity <= 0.10) {
    return {
      stageTr: 'Derin Anestezi / Medüller Baskılanma',
      stageAr: 'تخدير عميق / تثبيط نخاعي',
      stageEn: 'Deep Anesthesia / Medullary Depression',
      descriptionTr: 'Derin santral sinir sistemi depresyonu; refleksler ve otonom yanıtlar kaybolur.',
      descriptionAr: 'تثبيط عميق للجهاز العصبي المركزي؛ فقدان المنعكسات.',
      descriptionEn: 'Deep central nervous system depression; reflexes and autonomic responses diminish.',
      severity: 'deep',
    };
  }
  if (activity <= 1.0) {
    return {
      stageTr: 'Ölümcül Kardiyorespiratuvar Kollaps',
      stageAr: 'انهيار قلبي تنفسي قاتل',
      stageEn: 'Fatal Cardiorespiratory Collapse',
      descriptionTr: 'Solunum merkezi felci ve geri dönüşsüz kardiyovasküler arrest riski.',
      descriptionAr: 'شلل المركز التنفسي وخطر توقف القلب والأوعية الدموية غير القابل للعكس.',
      descriptionEn: 'Respiratory center paralysis and irreversible cardiovascular arrest risk.',
      severity: 'toxic',
    };
  }
  return {
    stageTr: 'Ferguson Kesilme Olgusu (Faz Doygunluğu / Çökelti)',
    stageAr: 'ظاهرة انقطاع فيرغسون (تشبع الطور / ترسب)',
    stageEn: 'Ferguson Cutoff Phenomenon (Phase Saturation / Precipitate)',
    descriptionTr: 'a > 1.0 durumu termodinamik dengede sürdürülemez. Faz ayrışması ve çökelti oluşur; biyolojik aktivite artışı durur.',
    descriptionAr: 'لا يمكن الحفاظ على حالة a > 1.0 في التوازن الديناميكي الحراري. ينفصل الطور ويترسب الدواء؛ يتوقف تصاعد النشاط الحيوي.',
    descriptionEn: 'a > 1.0 cannot be maintained at thermodynamic equilibrium. Phase separation and precipitation occur; biological activity plateaus.',
    severity: 'cutoff',
  };
}

export const ThermodynamicActivityFergusonSlider: React.FC<
  ThermodynamicActivityFergusonSliderProps
> = ({
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
  const isEn = activeLocale === 'en';

  const [mode, setMode] = useState<'vapor' | 'solution'>(
    initialState?.mode ?? config?.defaultMode ?? 'vapor'
  );
  const [selectedAgentId, setSelectedAgentId] = useState<string>(
    initialState?.agentId ?? config?.defaultAgent ?? 'ether'
  );

  const DEFAULT_AGENT: FergusonAgent = FERGUSON_AGENTS[0]!;

  const currentAgent: FergusonAgent =
    FERGUSON_AGENTS.find((a) => a.id === selectedAgentId) ?? DEFAULT_AGENT;

  const [targetValue, setTargetValue] = useState<number>(
    initialState?.targetValue ?? currentAgent.surgicalTarget
  );

  const calc = calculateFergusonActivity(targetValue, currentAgent.saturationValue);
  const biologicalStatus = getFergusonBiologicalStatus(calc.activity);

  const notifyChange = (newTarget: number, newAgent: FergusonAgent, newMode: 'vapor' | 'solution') => {
    const res = calculateFergusonActivity(newTarget, newAgent.saturationValue);
    if (onStateChange) {
      onStateChange({
        mode: newMode,
        targetValue: newTarget,
        saturationValue: newAgent.saturationValue,
        activity: res.activity,
        effectiveActivity: res.effectiveActivity,
        isCutoff: res.isCutoff,
        membraneVolumeExpansion: res.membraneVolumeExpansion,
      });
    }
  };

  const handleModeChange = (newMode: 'vapor' | 'solution') => {
    if (disabled) return;
    setMode(newMode);
    const firstAgentOfMode: FergusonAgent =
      FERGUSON_AGENTS.find((a) => a.mode === newMode) ?? DEFAULT_AGENT;
    setSelectedAgentId(firstAgentOfMode.id);
    setTargetValue(firstAgentOfMode.surgicalTarget);
    notifyChange(firstAgentOfMode.surgicalTarget, firstAgentOfMode, newMode);
  };

  const handleAgentSelect = (agent: FergusonAgent) => {
    if (disabled) return;
    setSelectedAgentId(agent.id);
    setTargetValue(agent.surgicalTarget);
    notifyChange(agent.surgicalTarget, agent, mode);
  };

  const handleTargetValueChange = (val: number) => {
    setTargetValue(val);
    notifyChange(val, currentAgent, mode);
  };

  // Slider bounds: 0 to 1.25 * saturationValue
  const maxSliderValue = Math.round(currentAgent.saturationValue * 1.25 * 100) / 100;
  const sliderStep =
    currentAgent.saturationValue > 1000
      ? 50
      : currentAgent.saturationValue > 10
      ? 1
      : currentAgent.saturationValue > 0.1
      ? 0.05
      : 0.001;

  // Visual gauge markers
  // Scale from a = 0.0 to 1.25
  const mapActivityToGaugePercent = (act: number) => {
    return Math.max(0, Math.min(100, (act / 1.25) * 100));
  };

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
              {isEn ? 'Ferguson Principle Simulator' : isAr ? 'محاكي مبدأ فيرغسون' : 'Ferguson Prensibi Simülatörü'}
            </StickerBadge>
            <TechnicalTermBadge term="Ferguson Prensibi" />
            <TechnicalTermBadge term="Termodinamik Aktivite (a)" />
          </div>
          {config?.source && (
            <span className="text-[11px] font-mono text-gray-600 dark:text-gray-400" dir="ltr">
              Source: {config.source.file?.replace(/Farmasötik ve Medisinal Kimya/g, 'Farmasötik Kimya').replace(/Medisinal Kimya/g, 'Farmasötik Kimya')} (p. {config.source.page})
            </span>
          )}
        </div>

        <h3 className="font-display font-bold text-base sm:text-lg">
          {config?.title ||
            (isEn
              ? 'Thermodynamic Activity & Ferguson Principle Simulator'
              : isAr
              ? 'محاكاة النشاط الديناميكي الحراري وظاهرة الانقطاع (مبدأ فيرغسون)'
              : 'Termodinamik Aktivite & Ferguson Kesilme Olgusu Simülatörü')}
        </h3>

        <p className="text-xs font-body text-gray-700 dark:text-gray-300">
          {config?.prompt ||
            (isEn
              ? 'Investigate structurally non-specific bioactivity, the Ferguson iso-activity surgical window (a ≈ 0.02-0.05), and phase saturation cutoff.'
              : isAr
              ? 'استكشف كيف تنتج المواد غير النوعية التخدير عند نشاط ديناميكي حراري متساوٍ (a ≈ 0.02-0.05) ولاحظ ظاهرة الانقطاع عند a > 1.0.'
              : 'Yapısal olmayan biyoaktiviteyi, Ferguson izo-aktivite cerrahi anestezi penceresini (a ≈ 0.02-0.05) ve faz doygunluğu kesilme olgusunu inceleyin.')}
        </p>
      </div>

      {/* Mode Selector: Vapor Phase vs Solution Phase */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase text-slate-700 dark:text-neutral-300">
            {isEn ? 'Phase Type:' : isAr ? 'طور المحاكاة:' : 'Faz Türü:'}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={disabled}
              onClick={() => handleModeChange('vapor')}
              className={clsx(
                'px-3.5 py-1.5 text-xs font-mono font-semibold uppercase rounded-xl border transition-all',
                mode === 'vapor'
                  ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                  : 'bg-white dark:bg-[#252525] text-slate-700 dark:text-neutral-300 border-slate-200 dark:border-[#383838] hover:bg-slate-100 dark:hover:bg-[#2C2C2C]'
              )}
            >
              {isEn ? 'Vapor Phase (a = Pt/P₀)' : isAr ? 'طور البخار (a = Pt/P₀)' : 'Buhar Fazı (a = Pt/P₀)'}
            </button>
            <button
              type="button"
              disabled={disabled}
              onClick={() => handleModeChange('solution')}
              className={clsx(
                'px-3.5 py-1.5 text-xs font-mono font-semibold uppercase rounded-xl border transition-all',
                mode === 'solution'
                  ? 'bg-[#10A37F] text-white border-[#10A37F] shadow-xs'
                  : 'bg-white dark:bg-[#252525] text-slate-700 dark:text-neutral-300 border-slate-200 dark:border-[#383838] hover:bg-slate-100 dark:hover:bg-[#2C2C2C]'
              )}
            >
              {isEn ? 'Solution Phase (a = St/S₀)' : isAr ? 'طور المحلول (a = St/S₀)' : 'Çözelti Fazı (a = St/S₀)'}
            </button>
          </div>
        </div>

        <div className="text-xs font-mono font-semibold text-slate-700 dark:text-neutral-300" dir="ltr">
          {mode === 'vapor'
            ? isEn
              ? 'P₀ (Saturation Vapor Pressure)'
              : isAr
              ? 'P₀ (ضغط بخار الإشباع)'
              : 'P₀ (Doygunluk Basıncı)'
            : isEn
            ? 'S₀ (Saturation Solubility)'
            : isAr
            ? 'S₀ (ذائبية الإشباع)'
            : 'S₀ (Doygunluk Çözünürlüğü)'}
          :{' '}
          <span className="px-2 py-0.5 bg-slate-100 dark:bg-[#2A2A2A] border border-slate-200 dark:border-[#383838] rounded-lg">
            {currentAgent.saturationValue} {currentAgent.unit}
          </span>
        </div>
      </div>

      {/* Preset Agent Selector */}
      <div className="flex flex-col gap-1.5 p-3 bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl shadow-xs">
        <span className="text-[11px] font-mono font-semibold uppercase text-slate-500 dark:text-neutral-400">
          {isEn ? 'Model Agents:' : isAr ? 'المركبات النموذجية:' : 'Model Ajanlar:'}
        </span>
        <div className="flex flex-wrap gap-2">
          {FERGUSON_AGENTS.filter((a) => a.mode === mode).map((agent) => {
            const isSelected = selectedAgentId === agent.id;
            return (
              <button
                key={agent.id}
                type="button"
                disabled={disabled}
                onClick={() => handleAgentSelect(agent)}
                className={clsx(
                  'px-3 py-1.5 text-xs font-mono font-semibold rounded-xl border transition-all',
                  isSelected
                    ? 'bg-[#10A37F] text-white border-[#10A37F] shadow-xs'
                    : 'bg-slate-50 dark:bg-[#252525] text-slate-700 dark:text-neutral-300 border-slate-200 dark:border-[#383838] hover:bg-slate-100 dark:hover:bg-[#2C2C2C]'
                )}
              >
                {isEn ? (agent.nameEn || agent.nameTr) : isAr ? agent.nameAr : agent.nameTr}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Slider for Pt or St */}
      <div className="p-4 bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl shadow-xs">
        <Slider
          label={
            mode === 'vapor'
              ? isEn
                ? 'Applied Partial Vapor Pressure (Pt)'
                : isAr
                ? 'الضغط الجزئي الفعلي (Pt)'
                : 'Uygulanan Kısmi Buhar Basıncı (Pt)'
              : isEn
              ? 'Applied Solution Concentration (St)'
              : isAr
              ? 'التركيز المولي الفعلي (St)'
              : 'Uygulanan Çözelti Konsantrasyonu (St)'
          }
          value={targetValue}
          min={0}
          max={maxSliderValue}
          step={sliderStep}
          unit={currentAgent.unit}
          onChange={handleTargetValueChange}
          disabled={disabled}
        />
      </div>

      {/* Real-Time Thermodynamic Activity Gauge & Scale (Strict LTR Isolation) */}
      <div
        className="w-full bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl shadow-xs p-4 space-y-3"
        dir="ltr"
      >
        <div className="flex items-center justify-between text-xs font-mono font-semibold">
          <span className="text-slate-700 dark:text-neutral-300">
            Thermodynamic Activity (a = {mode === 'vapor' ? 'Pt/P₀' : 'St/S₀'}):{' '}
            <strong className="text-sm font-bold text-amber-600 dark:text-amber-400">
              {calc.activity.toFixed(3)}
            </strong>
          </span>
          <span>
            {calc.isCutoff ? (
              <span className="text-purple-600 dark:text-purple-400 font-semibold animate-pulse">
                ⚠️ a &gt; 1.0 (CUTOFF TRIGGERED)
              </span>
            ) : (
              <span className="text-slate-500 dark:text-neutral-400">
                Eff. Activity: {calc.effectiveActivity.toFixed(3)}
              </span>
            )}
          </span>
        </div>

        {/* Visual Thermodynamic Activity Scale / Track */}
        <div className="relative w-full h-7 border border-slate-300 dark:border-[#383838] rounded-xl bg-slate-200 dark:bg-neutral-800 flex overflow-hidden">
          {/* Conscious Zone: 0 to 0.02 (0 to 1.6% width) */}
          <div
            style={{ width: `${mapActivityToGaugePercent(0.02)}%` }}
            className="h-full bg-emerald-400 flex items-center justify-center text-[9px] font-mono font-bold text-slate-900"
            title="Conscious (a < 0.02)"
          />

          {/* Ferguson Anesthesia Window: 0.02 to 0.05 (1.6% to 4% width) */}
          <div
            style={{
              width: `${mapActivityToGaugePercent(0.05) - mapActivityToGaugePercent(0.02)}%`,
            }}
            className="h-full bg-amber-400 flex items-center justify-center text-[9px] font-mono font-bold text-slate-900 border-x border-amber-600/30"
            title="Ferguson Surgical Window (a: 0.02 - 0.05)"
          />

          {/* Deep Depression: 0.05 to 0.10 */}
          <div
            style={{
              width: `${mapActivityToGaugePercent(0.1) - mapActivityToGaugePercent(0.05)}%`,
            }}
            className="h-full bg-orange-400"
            title="Deep Depression (a: 0.05 - 0.10)"
          />

          {/* Fatal Collapse Zone: 0.10 to 1.00 */}
          <div
            style={{
              width: `${mapActivityToGaugePercent(1.0) - mapActivityToGaugePercent(0.1)}%`,
            }}
            className="h-full bg-rose-500"
            title="Fatal Cardiorespiratory Collapse (a: 0.10 - 1.00)"
          />

          {/* Cutoff / Precipitation Zone: 1.00 to 1.25 */}
          <div
            style={{ width: `${100 - mapActivityToGaugePercent(1.0)}%` }}
            className="h-full bg-purple-700 bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,rgba(0,0,0,0.3)_6px,rgba(0,0,0,0.3)_12px)] flex items-center justify-center text-[9px] font-mono font-bold text-white"
            title="Cutoff Phenomenon (a > 1.0, Phase Saturation)"
          >
            Cutoff
          </div>

          {/* Pointer indicator */}
          <div
            style={{
              left: `${mapActivityToGaugePercent(calc.activity)}%`,
            }}
            className="absolute top-0 bottom-0 w-1 bg-slate-900 dark:bg-white shadow-xs -translate-x-1/2 z-10 rounded-full"
          />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-500 dark:text-neutral-400 pt-1">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-sm inline-block" />{' '}
              {isEn ? 'Conscious (0-0.02)' : isAr ? 'واعي (0-0.02)' : 'Bilinç (0-0.02)'}
            </span>
            <span className="flex items-center gap-1 font-semibold text-amber-700 dark:text-amber-400">
              <span className="w-2.5 h-2.5 bg-amber-400 rounded-sm inline-block" />{' '}
              {isEn ? 'Ferguson Anesthesia (0.02-0.05)' : isAr ? 'تخدير فيرغسون (0.02-0.05)' : 'Ferguson Anestezi (0.02-0.05)'}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-rose-500 rounded-sm inline-block" />{' '}
              {isEn ? 'Toxic (0.10-1.0)' : isAr ? 'سام (0.10-1.0)' : 'Toksik (0.10-1.0)'}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-purple-700 rounded-sm inline-block" />{' '}
              {isEn ? 'Cutoff (>1.0)' : isAr ? 'انقطاع (>1.0)' : 'Kesilme (>1.0)'}
            </span>
          </div>
          <div>
            {isEn ? 'Saturation Threshold: a = 1.00' : isAr ? 'عتبة الإشباع: a = 1.00' : 'Doygunluk Eşiği: a = 1.00'}
          </div>
        </div>
      </div>

      {/* Biological Response Card */}
      <div
        className={clsx(
          'p-4 border rounded-2xl flex flex-col gap-1.5 shadow-xs transition-colors',
          biologicalStatus.severity === 'surgical'
            ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800'
            : biologicalStatus.severity === 'cutoff'
            ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800'
            : biologicalStatus.severity === 'toxic'
            ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800'
            : biologicalStatus.severity === 'deep'
            ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-300 dark:border-orange-800'
            : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
        )}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-neutral-300">
            {isEn ? 'Biological & Clinical Status:' : isAr ? 'الحالة الحيوية والسريرية:' : 'Biyolojik ve Klinik Durum:'}
          </span>
          <span className="text-xs font-mono font-bold text-slate-900 dark:text-[#ECECEC]">
            {isEn ? (biologicalStatus.stageEn || biologicalStatus.stageTr) : isAr ? biologicalStatus.stageAr : biologicalStatus.stageTr}
          </span>
        </div>
        <p className="text-xs font-body text-slate-600 dark:text-neutral-300 leading-relaxed">
          {isEn ? (biologicalStatus.descriptionEn || biologicalStatus.descriptionTr) : isAr ? biologicalStatus.descriptionAr : biologicalStatus.descriptionTr}
        </p>
      </div>

      {/* Membrane Expansion & Phase Separation SVG (Strict LTR Isolation) */}
      <div
        className="w-full bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl shadow-xs p-4"
        dir="ltr"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-semibold uppercase text-slate-700 dark:text-neutral-300">
            {isEn
              ? 'Neuronal Membrane Volume Expansion (ΔV/V Model):'
              : isAr
              ? 'التمدد الحجمي للغشاء العصبي (نموذج ΔV/V):'
              : 'Nöronal Membran Hacimsel Genleşmesi (ΔV/V Modeli):'}
          </span>
          <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
            ΔV/V = +{calc.membraneVolumeExpansion}%
          </span>
        </div>

        <svg
          viewBox="0 0 500 150"
          className="w-full h-auto select-none border border-slate-200 dark:border-[#2F2F2F] rounded-xl bg-slate-50 dark:bg-[#171717]"
          role="img"
          aria-label="Membrane volume expansion and phase cutoff diagram"
        >
          {/* Unperturbed reference outline */}
          <rect
            x="40"
            y="45"
            width="420"
            height="60"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* Dynamic Expanding Membrane */}
          {/* Thickness increases slightly with activity, width expands */}
          <rect
            x={40 - calc.membraneVolumeExpansion * 2.5}
            y={45 - calc.membraneVolumeExpansion * 1.5}
            width={420 + calc.membraneVolumeExpansion * 5}
            height={60 + calc.membraneVolumeExpansion * 3}
            fill="#F59E0B"
            fillOpacity={0.15 + calc.effectiveActivity * 0.25}
            stroke="#D97706"
            strokeWidth="2"
          />

          {/* Lipophilic Dissolved Molecules */}
          {Array.from({
            length: Math.min(30, Math.round(calc.effectiveActivity * 25)),
          }).map((_, i) => (
            <circle
              key={`dis-${i}`}
              cx={60 + ((i * 37) % 380)}
              cy={55 + ((i * 19) % 40)}
              r="4"
              fill="#F59E0B"
              stroke="#B45309"
              strokeWidth="1"
            />
          ))}

          {/* Central Ion Channel Compressed by Lateral Pressure */}
          <rect
            x="240"
            y={42 - calc.membraneVolumeExpansion * 1.5}
            width={Math.max(4, 20 - calc.membraneVolumeExpansion * 3.5)}
            height={66 + calc.membraneVolumeExpansion * 3}
            fill="#3B82F6"
            stroke="#1D4ED8"
            strokeWidth="1.5"
          />
          <text
            x="250"
            y="135"
            fontSize="9"
            fontFamily="monospace"
            textAnchor="middle"
            fill="currentColor"
          >
            {calc.activity >= 0.02
              ? isEn
                ? 'Channel Closed (Lateral Pressure)'
                : isAr
                ? 'القناة مغلقة (ضغط جانبي)'
                : 'Kanal Kapalı (Lateral Basınç)'
              : isEn
              ? 'Ion Channel Open'
              : isAr
              ? 'القناة الأيونية مفتوحة'
              : 'İyon Kanalı Açık'}
          </text>

          {/* Cutoff Phase Saturation / Precipitation Overlay */}
          {calc.isCutoff && (
            <g>
              <rect x="0" y="0" width="500" height="35" fill="#7E22CE" fillOpacity="0.2" />
              <text
                x="250"
                y="22"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
                fill="#7E22CE"
              >
                {isEn
                  ? '⚠️ CUTOFF PHENOMENON: PRECIPITATION & PHASE SEPARATION'
                  : isAr
                  ? '⚠️ ظاهرة الانقطاع: ترسب وانفصال الطور'
                  : '⚠️ KESİLME OLGUSU (CUTOFF): ÇÖKELTİ & FAZ AYRIŞMASI'}
              </text>

              {/* Precipitate crystals */}
              {Array.from({ length: 8 }).map((_, i) => (
                <polygon
                  key={`cryst-${i}`}
                  points={`${80 + i * 45},15 ${85 + i * 45},8 ${90 + i * 45},15 ${85 + i * 45},22`}
                  fill="#7E22CE"
                  stroke="#581C87"
                  strokeWidth="1"
                />
              ))}
            </g>
          )}
        </svg>
      </div>

      {/* Model Illustration Notice */}
      <ModelIllustrationNotice
        locale={activeLocale as 'tr' | 'ar' | 'en'}
        equation={
          mode === 'vapor'
            ? isEn
              ? 'a = Pt / P₀   (Vapor Phase Thermodynamic Activity Equation)'
              : isAr
              ? 'a = Pt / P₀   (معادلة النشاط الديناميكي الحراري لطور البخار)'
              : 'a = Pt / P₀   (Buhar Fazı Termodinamik Aktivite Eşitliği)'
            : isEn
            ? 'a = St / S₀   (Solution Phase Thermodynamic Activity Equation)'
            : isAr
            ? 'a = St / S₀   (معادلة النشاط الديناميكي الحراري لطور المحلول)'
            : 'a = St / S₀   (Çözelti Fazı Termodinamik Aktivite Eşitliği)'
        }
        sourceReference="Ferguson, J. (1939) Proc. R. Soc. Lond. B 127:387-404; Foye's Principles of Medicinal Chemistry (8th ed.)"
        assumptions={
          isEn
            ? [
                'Structurally non-specific bioactivity depends on thermodynamic activity (a) in the cellular biophase, not specific receptor binding',
                'All volatile anesthetics and physical depressants produce surgical anesthesia in the a ≈ 0.02 - 0.05 range',
                'Under thermodynamic equilibrium, thermodynamic activity cannot exceed unity (a = 1.0)',
                'When the solubility or vapor pressure limit is exceeded, phase separation occurs (Cutoff Phenomenon)',
              ]
            : isAr
            ? [
                'النشاط الحيوي غير النوعي يعتمد على النشاط الديناميكي الحراري (a) في الطور الحيوي، وليس على الارتباط بمستقبل نوعي',
                'تنتج جميع المخدرات الطيارة والمثبطات الفيزيائية تخديراً جراحياً في النطاق a ≈ 0.02 - 0.05',
                'في ظروف التوازن الديناميكي الحراري، لا يمكن أن يتجاوز النشاط الديناميكي الحراري القيمة 1.0',
                'عند تجاوز حد الذائبية أو ضغط البخار، يحدث انفصال للطور (ظاهرة الانقطاع)',
              ]
            : [
                'Yapısal olmayan biyoaktivite spesifik reseptör bağlanmasına değil, hücresel biyofazdaki termodinamik aktiviteye (a) bağlıdır',
                'Tüm uçucu anestetikler ve fiziksel depresanlar a ≈ 0.02 - 0.05 aralığında cerrahi anestezi oluşturur',
                'Termodinamik denge koşullarında termodinamik aktivite birim değeri (a = 1.0) aşamaz',
                'Çözünürlük veya buhar basıncı limiti aşıldığında madde faz ayrışmasına uğrar (Kesilme Olgusu)',
              ]
        }
      />
    </Card>
  );
};
