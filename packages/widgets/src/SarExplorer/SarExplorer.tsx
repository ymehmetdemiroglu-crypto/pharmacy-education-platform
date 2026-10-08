import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Card, Button, StickerBadge } from '@pharmacy/ui';
import { CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { BaseWidgetProps } from '../types';
import { SarExplorerConfig } from './schema';

export type SarExplorerProps = BaseWidgetProps<SarExplorerConfig, Record<string, string>>;

export const SarExplorer: React.FC<SarExplorerProps> = ({
  config,
  locale = 'en',
  onAttempt,
  onCorrect,
  onIncorrect,
  disabled = false,
  className,
}) => {
  const dict = {
    tr: {
      badge: 'SAR Gezgini',
      source: 'Kaynak: ',
      page: 's. ',
      titleSuffix: 'Yapı-Aktivite Optimizasyonu',
      target: 'Optimizasyon Hedefi: ',
      logP: 'LogP (Lipofisite)',
      pKa: 'pKa',
      affinityKd: 'Afinite Kd',
      site: 'Sübstitüsyon Bölgesi: ',
      affinityLabel: 'Afinite: ',
      reset: 'İskeleti Sıfırla',
      testCandidate: 'Aday Bileşiği Test Et',
      achieved: 'Hedef Aday Profiline Ulaşıldı!',
      suboptimal: 'Hedef Dışı SAR Dengesi',
      incorrectFeedback: 'Sübstitüent kombinasyonu hedef afinite veya lipofisiteyi karşılamıyor',
    },
    ar: {
      badge: 'مستكشف علاقة البنية بالفاعلية (SAR)',
      source: 'المصدر: ',
      page: 'ص. ',
      titleSuffix: 'تحسين بنية وفاعلية الدواء',
      target: 'هدف التحسين: ',
      logP: 'LogP (الألفة للدهن)',
      pKa: 'pKa',
      affinityKd: 'الألفة Kd',
      site: 'موقع الاستبدال: ',
      affinityLabel: 'الألفة: ',
      reset: 'إعادة ضبط الهيكل',
      testCandidate: 'اختبار ألفة المركب المرشح',
      achieved: 'تم تحقيق الملف المطلوب للمركب المرشح!',
      suboptimal: 'توازن غير أمثل لعلاقة البنية بالفاعلية',
      incorrectFeedback: 'توليفة المجموعات البديلة لا تحقق الألفة أو الألفة للدهن المستهدفة',
    },
    en: {
      badge: 'SAR Explorer',
      source: 'Source: ',
      page: 'p. ',
      titleSuffix: 'Structure-Activity Optimization',
      target: 'Optimization Target: ',
      logP: 'LogP (Lipophilicity)',
      pKa: 'pKa',
      affinityKd: 'Affinity Kd',
      site: 'Substitution Site: ',
      affinityLabel: 'Affinity: ',
      reset: 'Reset Scaffold',
      testCandidate: 'Test Candidate Affinity',
      achieved: 'Target Candidate Profile Achieved!',
      suboptimal: 'Sub-optimal SAR Balance',
      incorrectFeedback: 'Substituent combination does not meet target affinity or lipophilicity',
    },
  }[locale || 'en'] || {
    badge: 'SAR Explorer',
    source: 'Source: ',
    page: 'p. ',
    titleSuffix: 'Structure-Activity Optimization',
    target: 'Optimization Target: ',
    logP: 'LogP (Lipophilicity)',
    pKa: 'pKa',
    affinityKd: 'Affinity Kd',
    site: 'Substitution Site: ',
    affinityLabel: 'Affinity: ',
    reset: 'Reset Scaffold',
    testCandidate: 'Test Candidate Affinity',
    achieved: 'Target Candidate Profile Achieved!',
    suboptimal: 'Sub-optimal SAR Balance',
    incorrectFeedback: 'Substituent combination does not meet target affinity or lipophilicity',
  };

  const [selectedSubstituents, setSelectedSubstituents] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    config.positions.forEach((pos) => {
      initial[pos.positionName] = pos.defaultOptionId;
    });
    return initial;
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Compute live properties
  let currentLogP = config.baseLogP;
  let currentPka = config.basePka;
  let affinityFactor = 1.0;

  config.positions.forEach((pos) => {
    const selectedId = selectedSubstituents[pos.positionName];
    const option = pos.options.find((o) => o.id === selectedId);
    if (option) {
      currentLogP += option.deltaLogP;
      currentPka += option.deltaPka;
      affinityFactor *= option.affinityMultiplier;
    }
  });

  const currentAffinityNm = Math.round((config.baseAffinityNm / affinityFactor) * 10) / 10;
  const roundedLogP = Math.round(currentLogP * 100) / 100;
  const roundedPka = Math.round(currentPka * 10) / 10;

  const handleSelectSubstituent = (positionName: string, optionId: string) => {
    if (disabled || isSubmitted) return;
    setSelectedSubstituents((prev) => ({
      ...prev,
      [positionName]: optionId,
    }));
  };

  const handleReset = () => {
    if (disabled) return;
    const initial: Record<string, string> = {};
    config.positions.forEach((pos) => {
      initial[pos.positionName] = pos.defaultOptionId;
    });
    setSelectedSubstituents(initial);
    setIsSubmitted(false);
  };

  const handleSubmit = () => {
    if (disabled || isSubmitted) return;
    setIsSubmitted(true);
    if (onAttempt) onAttempt(selectedSubstituents);

    const target = config.targetGoal;
    const currentOptionIds = Object.values(selectedSubstituents);
    const hasTargetOptions = target.targetOptionIds.every((id) => currentOptionIds.includes(id));

    const satisfiesLogP =
      (target.minLogP === undefined || currentLogP >= target.minLogP) &&
      (target.maxLogP === undefined || currentLogP <= target.maxLogP);

    const satisfiesAffinity =
      target.maxAffinityNm === undefined || currentAffinityNm <= target.maxAffinityNm;

    if (hasTargetOptions || (satisfiesLogP && satisfiesAffinity)) {
      if (onCorrect) onCorrect();
    } else {
      if (onIncorrect) onIncorrect(dict.incorrectFeedback);
    }
  };

  const isSuccess =
    isSubmitted &&
    (config.targetGoal.targetOptionIds.every((id) => Object.values(selectedSubstituents).includes(id)) ||
      ((config.targetGoal.minLogP === undefined || currentLogP >= config.targetGoal.minLogP) &&
        (config.targetGoal.maxLogP === undefined || currentLogP <= config.targetGoal.maxLogP) &&
        (config.targetGoal.maxAffinityNm === undefined || currentAffinityNm <= config.targetGoal.maxAffinityNm)));

  return (
    <Card
      variant="default"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={clsx('w-full flex flex-col gap-4', className)}
    >
      {/* Header */}
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <StickerBadge variant="blue" size="sm">
            {dict.badge}
          </StickerBadge>
          <span className="text-[11px] font-mono text-gray-600 dark:text-gray-400">
            {dict.source}{config.source.file} ({dict.page}{config.source.page})
          </span>
        </div>
        <h3 className="font-display font-black text-base sm:text-lg">
          {config.scaffoldName} {dict.titleSuffix}
        </h3>
        <p className="text-xs font-body text-gray-700 dark:text-gray-300">
          {config.scaffoldDescription}
        </p>
      </div>

      {/* Target Goal Banner */}
      <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs font-mono text-slate-800 dark:text-neutral-200 shadow-xs">
        <span className="font-bold text-amber-800 dark:text-amber-400 uppercase mr-1">{dict.target}</span>
        <span>{config.targetGoal.description}</span>
      </div>

      {/* Dynamic Property Readout Box */}
      <div className="grid grid-cols-3 gap-3 p-4 bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl shadow-xs text-center" dir="ltr">
        <div>
          <span className="text-[10px] font-mono text-slate-500 dark:text-neutral-400 uppercase block font-medium">{dict.logP}</span>
          <span className="font-mono font-bold text-lg text-slate-900 dark:text-[#ECECEC]">
            {roundedLogP}
          </span>
        </div>
        <div className="border-x border-slate-200 dark:border-[#383838]">
          <span className="text-[10px] font-mono text-slate-500 dark:text-neutral-400 uppercase block font-medium">{dict.pKa}</span>
          <span className="font-mono font-bold text-lg text-slate-900 dark:text-[#ECECEC]">
            {roundedPka}
          </span>
        </div>
        <div>
          <span className="text-[10px] font-mono text-slate-500 dark:text-neutral-400 uppercase block font-medium">{dict.affinityKd}</span>
          <span className="font-mono font-bold text-lg text-emerald-600 dark:text-emerald-400">
            {currentAffinityNm} nM
          </span>
        </div>
      </div>

      {/* Position Substituent Selectors */}
      <div className="space-y-4">
        {config.positions.map((pos) => {
          const currentSelected = selectedSubstituents[pos.positionName];

          return (
            <div key={pos.positionName} className="space-y-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-neutral-300">
                {dict.site}{pos.positionName}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {pos.options.map((opt) => {
                  const isSelected = currentSelected === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={disabled || isSubmitted}
                      onClick={() => handleSelectSubstituent(pos.positionName, opt.id)}
                      className={clsx(
                        'p-3 border rounded-xl text-start transition-all flex flex-col justify-between shadow-2xs',
                        isSelected
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-500/20 shadow-xs'
                          : 'bg-white dark:bg-[#252525] border-slate-200 dark:border-[#383838] text-slate-800 dark:text-neutral-200 hover:bg-slate-50 dark:hover:bg-[#2A2A2A]'
                      )}
                    >
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold">{opt.name}</span>
                        <code className="text-[10px] px-1 py-0.5 bg-slate-100 dark:bg-[#333333] rounded text-slate-600 dark:text-neutral-300" dir="ltr">{opt.structureSnippet}</code>
                      </div>
                      <div className={clsx(
                        "mt-2 text-[10px] font-mono flex justify-between",
                        isSelected ? "text-emerald-800 dark:text-emerald-300 font-semibold" : "text-slate-500 dark:text-neutral-400"
                      )}>
                        <span>ΔlogP: {opt.deltaLogP > 0 ? `+${opt.deltaLogP}` : opt.deltaLogP}</span>
                        <span>{dict.affinityLabel}{opt.affinityMultiplier}x</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 gap-3">
        <Button variant="ghost" size="sm" onClick={handleReset} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
          {dict.reset}
        </Button>
        {!isSubmitted ? (
          <Button variant="primary" disabled={disabled} onClick={handleSubmit}>
            {dict.testCandidate}
          </Button>
        ) : null}
      </div>

      {/* Result Outcome */}
      {isSubmitted && (
        <div className="pt-4 border-t border-slate-200 dark:border-[#2F2F2F] space-y-3">
          <div className="flex items-center gap-2">
            {isSuccess ? (
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-display font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                <span>{dict.achieved}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-display font-bold text-sm">
                <AlertCircle className="w-5 h-5 stroke-[2.5]" />
                <span>{dict.suboptimal}</span>
              </div>
            )}
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-[#252525] border border-slate-200 dark:border-[#333333] rounded-xl text-xs font-body leading-relaxed text-slate-800 dark:text-neutral-200 shadow-xs">
            {config.explanation}
          </div>
        </div>
      )}
    </Card>
  );
};
