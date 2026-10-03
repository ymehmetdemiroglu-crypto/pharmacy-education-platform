import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Card, Button, StickerBadge, ConfidenceGauge, ConfidenceLevel } from '@pharmacy/ui';
import { CheckCircle2, AlertCircle, ArrowRight, Zap } from 'lucide-react';
import { BaseWidgetProps } from '../types';
import { PredictThenRevealConfig } from './schema';

export type PredictThenRevealProps = BaseWidgetProps<PredictThenRevealConfig, any>;

export const PredictThenReveal: React.FC<PredictThenRevealProps> = ({
  config,
  onAttempt,
  onCorrect,
  onIncorrect,
  locale = 'en',
  disabled = false,
  className,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<ConfidenceLevel | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const dict = {
    tr: {
      badge: 'Tahmin Et ve Gör',
      source: 'Kaynak: ',
      page: 's. ',
      step1: '1. Adım: Hipotezinizi Belirleyin',
      selected: '[Seçildi]',
      step2: '2. Adım: Güven Seviyenizi Belirleyin',
      revealBtn: 'Deneysel Sonucu Gör',
      confirmed: 'Hipotez Deneyle Doğrulandı',
      misconceptionAlert: 'Beklenmeyen Sonuç / Yanılgı Uyarısı',
      hypercorrectionTitle: 'Yüksek Güvenilirlikli Yanılgı (Hiper-Düzeltme Fırsatı)',
      hypercorrectionDesc:
        'Öğrenme bilimi (Butterfield & Metcalfe, 2001), tam emin olunan yanılgıların düzeltilmesinin uzun vadeli hafıza ve klinik muhakemede en yüksek kalıcılığı sağladığını kanıtlar.',
      targetedNote: 'Hedefe Yönelik Not: ',
      finding: 'Deneysel Bulgu:',
    },
    ar: {
      badge: 'توقع ثم اكتشف',
      source: 'المصدر: ',
      page: 'ص. ',
      step1: 'الخطوة 1: حدد فرضيتك',
      selected: '[تم الاختيار]',
      step2: 'الخطوة 2: قيّم درجة ثقتك',
      revealBtn: 'كشف النتيجة التجريبية',
      confirmed: 'تم تأكيد الفرضية بالتجربة',
      misconceptionAlert: 'نتيجة غير متوقعة / تنبيه مغالطة',
      hypercorrectionTitle: 'فرصة التصحيح الفائق (مغالطة عالية الثقة)',
      hypercorrectionDesc:
        'تثبت علوم التعلم (Butterfield & Metcalfe, 2001) أن تصحيح الأخطاء المرتكبة بثقة تامة يحقق أعلى درجات التثبيت في الذاكرة طويلة المدى.',
      targetedNote: 'ملاحظة تشخيصية: ',
      finding: 'النتيجة التجريبية:',
    },
    en: {
      badge: 'Predict-Then-Reveal',
      source: 'Source: ',
      page: 'p. ',
      step1: 'Step 1: Commit your hypothesis',
      selected: '[Selected]',
      step2: 'Step 2: Rate your confidence',
      revealBtn: 'Reveal Experimental Outcome',
      confirmed: 'Hypothesis Confirmed by Experiment',
      misconceptionAlert: 'Unexpected Outcome / Misconception Alert',
      hypercorrectionTitle: 'Hypercorrection Opportunity',
      hypercorrectionDesc:
        'Learning science (Butterfield & Metcalfe, 2001) proves that correcting high-confidence errors yields the greatest long-term retention and clinical reasoning.',
      targetedNote: 'Targeted Note: ',
      finding: 'Experimental Finding:',
    },
  }[locale || 'en'] || {
    badge: 'Predict-Then-Reveal',
    source: 'Source: ',
    page: 'p. ',
    step1: 'Step 1: Commit your hypothesis',
    selected: '[Selected]',
    step2: 'Step 2: Rate your confidence',
    revealBtn: 'Reveal Experimental Outcome',
    confirmed: 'Hypothesis Confirmed by Experiment',
    misconceptionAlert: 'Unexpected Outcome / Misconception Alert',
    hypercorrectionTitle: 'Hypercorrection Opportunity',
    hypercorrectionDesc:
      'Learning science (Butterfield & Metcalfe, 2001) proves that correcting high-confidence errors yields the greatest long-term retention and clinical reasoning.',
    targetedNote: 'Targeted Note: ',
    finding: 'Experimental Finding:',
  };

  const selectedOption = config.options.find((o) => o.id === selectedOptionId);

  const handleSelect = (id: string) => {
    if (isRevealed || disabled) return;
    setSelectedOptionId(id);
  };

  const handleReveal = () => {
    if (!selectedOption || isRevealed) return;
    setIsRevealed(true);
    if (onAttempt) onAttempt(selectedOption.id);

    if (selectedOption.isCorrect) {
      if (onCorrect) onCorrect();
    } else {
      if (onIncorrect) onIncorrect(selectedOption.misconceptionFeedback);
    }
  };

  const isHighConfidenceError = !selectedOption?.isCorrect && confidence === 'sure';

  return (
    <Card
      variant={isRevealed ? (selectedOption?.isCorrect ? 'success' : 'misconception') : 'default'}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={clsx(
        'w-full flex flex-col gap-4 transition-all duration-200',
        isRevealed && selectedOption?.isCorrect && 'transform -translate-y-1',
        className
      )}
    >
      {/* Scenario Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <StickerBadge variant="blue" size="sm">
            {dict.badge}
          </StickerBadge>
          <span className="text-[11px] font-mono text-gray-600 dark:text-gray-400">
            {dict.source}{config.source.file} ({dict.page}{config.source.page})
          </span>
        </div>
        <h3 className="font-display font-black text-base sm:text-lg uppercase tracking-tight">
          {config.prompt}
        </h3>
        <p className="font-body text-sm leading-relaxed text-gray-800 dark:text-gray-200">
          {config.scenarioDescription}
        </p>
      </div>

      {/* Options Selection */}
      <div className="space-y-2.5">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
          {dict.step1}
        </span>
        <div className="grid grid-cols-1 gap-2">
          {config.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                disabled={isRevealed || disabled}
                onClick={() => handleSelect(opt.id)}
                className={clsx(
                  'w-full text-start p-3 border-3 border-black dark:border-slate-700 rounded-none font-body text-sm',
                  'transition-all duration-150 flex items-center justify-between',
                  isSelected
                    ? 'bg-[#FFD93D] text-black shadow-neo-sm font-bold translate-x-1'
                    : 'bg-white dark:bg-[#1E293B] text-black dark:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800',
                  disabled && 'opacity-60 cursor-not-allowed'
                )}
              >
                <span>{opt.label}</span>
                {isSelected && <span className="text-xs font-mono uppercase ms-2">{dict.selected}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Metacognitive Confidence Rating Gauge */}
      {selectedOptionId && !isRevealed && (
        <div className="space-y-1.5 animate-in fade-in duration-150">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
            {dict.step2}
          </span>
          <ConfidenceGauge
            value={confidence}
            onChange={(lvl) => setConfidence(lvl)}
            locale={locale}
            disabled={disabled || isRevealed}
            size="sm"
          />
        </div>
      )}

      {/* Reveal Action / Outcome */}
      {!isRevealed ? (
        <div className="pt-2">
          <Button
            variant="primary"
            disabled={!selectedOptionId || disabled}
            onClick={handleReveal}
            rightIcon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}
          >
            {dict.revealBtn}
          </Button>
        </div>
      ) : (
        <div className="pt-3 border-t-3 border-black dark:border-slate-700 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            {selectedOption?.isCorrect ? (
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-display font-black text-sm uppercase">
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                <span>{dict.confirmed}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-display font-black text-sm uppercase">
                <AlertCircle className="w-5 h-5 stroke-[2.5]" />
                <span>{dict.misconceptionAlert}</span>
              </div>
            )}
          </div>

          {/* Hypercorrection Alert Banner */}
          {isHighConfidenceError && (
            <div
              data-testid="hypercorrection-alert"
              className="p-3 bg-[#FF6B9D] text-black border-3 border-black font-body text-xs shadow-neo-sm flex items-start gap-2"
            >
              <Zap className="w-4 h-4 shrink-0 fill-current mt-0.5" />
              <div>
                <strong className="font-display font-black uppercase tracking-wider block">
                  {dict.hypercorrectionTitle}
                </strong>
                <p className="mt-0.5 leading-relaxed">
                  {dict.hypercorrectionDesc}
                </p>
              </div>
            </div>
          )}

          {/* Targeted Misconception feedback if incorrect */}
          {!selectedOption?.isCorrect && selectedOption?.misconceptionFeedback && (
            <div className="p-3 bg-[#FFE4E6] dark:bg-[#2A0E18] border-2 border-black dark:border-rose-600 font-body text-xs leading-relaxed text-rose-900 dark:text-rose-200">
              <strong>{dict.targetedNote}</strong>
              {selectedOption.misconceptionFeedback}
            </div>
          )}

          {/* Outcome & Full Explanation */}
          <div className="p-3 bg-white dark:bg-[#1E293B] border-2 border-black dark:border-slate-700 space-y-1.5 shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#030712] text-black dark:text-slate-100">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
              {dict.finding}
            </span>
            <p className="font-body text-sm font-semibold">{config.revealedOutcome}</p>
            <p className="font-body text-xs text-gray-700 dark:text-slate-300 leading-relaxed pt-1">
              {config.explanation}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};
