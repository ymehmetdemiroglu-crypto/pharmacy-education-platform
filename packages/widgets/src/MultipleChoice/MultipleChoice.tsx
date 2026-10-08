import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Card, Button, StickerBadge } from '@pharmacy/ui';
import { Check, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { BaseWidgetProps } from '../types';
import { MultipleChoiceConfig } from './schema';

export type MultipleChoiceProps = BaseWidgetProps<MultipleChoiceConfig, string[]>;

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  config,
  locale = 'en',
  onAttempt,
  onCorrect,
  onIncorrect,
  disabled = false,
  className,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dict = {
    tr: {
      multiSelectBadge: 'Çoklu Seçim Sorusu',
      singleSelectBadge: 'Tekli Seçim Sorusu',
      source: 'Kaynak: ',
      page: 's. ',
      checkAnswer: 'Yanıtı Kontrol Et',
      correct: 'Doğru!',
      needsReview: 'Gözden Geçirilmeli',
      misconception: 'Kavram Yanılgısı: ',
      explanation: 'Açıklama:',
    },
    ar: {
      multiSelectBadge: 'سؤال متعدد الخيارات',
      singleSelectBadge: 'سؤال باختيار وحيد',
      source: 'المصدر: ',
      page: 'ص. ',
      checkAnswer: 'تحقق من الإجابة',
      correct: 'صحيح!',
      needsReview: 'بحاجة للمراجعة',
      misconception: 'مغالطة شائعة: ',
      explanation: 'التوضيح:',
    },
    en: {
      multiSelectBadge: 'Multi-Select Question',
      singleSelectBadge: 'Multiple Choice Question',
      source: 'Source: ',
      page: 'p. ',
      checkAnswer: 'Check Answer',
      correct: 'Correct!',
      needsReview: 'Needs Review',
      misconception: 'Misconception: ',
      explanation: 'Explanation:',
    },
  }[locale || 'en'] || {
    multiSelectBadge: 'Multi-Select Question',
    singleSelectBadge: 'Multiple Choice Question',
    source: 'Source: ',
    page: 'p. ',
    checkAnswer: 'Check Answer',
    correct: 'Correct!',
    needsReview: 'Needs Review',
    misconception: 'Misconception: ',
    explanation: 'Explanation:',
  };

  const toggleSelect = (id: string) => {
    if (isSubmitted || disabled) return;
    if (config.isMultiSelect) {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setSelectedIds([id]);
    }
  };

  const handleSubmit = () => {
    if (selectedIds.length === 0 || isSubmitted) return;
    setIsSubmitted(true);
    if (onAttempt) onAttempt(selectedIds);

    const correctIds = config.options.filter((o) => o.isCorrect).map((o) => o.id);
    const isSuccess =
      selectedIds.length === correctIds.length &&
      selectedIds.every((id) => correctIds.includes(id));

    if (isSuccess) {
      if (onCorrect) onCorrect();
    } else {
      const wrongSelected = config.options.find((o) => selectedIds.includes(o.id) && !o.isCorrect);
      if (onIncorrect) onIncorrect(wrongSelected?.distractorRationale);
    }
  };

  const isOptionCorrect = (id: string) => config.options.find((o) => o.id === id)?.isCorrect;

  return (
    <Card
      variant="default"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={clsx('w-full flex flex-col gap-4', className)}
    >
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <StickerBadge variant="orange" size="sm">
            {config.isMultiSelect ? dict.multiSelectBadge : dict.singleSelectBadge}
          </StickerBadge>
          <span className="text-[11px] font-mono text-gray-600 dark:text-gray-400">
            {dict.source}{config.source.file} ({dict.page}{config.source.page})
          </span>
        </div>
        <h3 className="font-display font-bold text-base sm:text-lg leading-snug">
          {config.prompt}
        </h3>
      </div>

      {/* Options list */}
      <div className="space-y-2" role={config.isMultiSelect ? 'group' : 'radiogroup'}>
        {config.options.map((opt) => {
          const isSelected = selectedIds.includes(opt.id);
          const correct = isOptionCorrect(opt.id);

          let optionStyle = 'bg-white dark:bg-[#1E1E1E] border-slate-200 dark:border-[#2F2F2F] text-slate-800 dark:text-[#ECECEC] hover:bg-slate-50 dark:hover:bg-[#252525] shadow-2xs';
          if (isSelected && !isSubmitted) {
            optionStyle = 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-500 dark:border-emerald-600 text-emerald-950 dark:text-emerald-200 font-semibold shadow-xs ring-1 ring-emerald-500/20';
          } else if (isSubmitted) {
            if (correct) {
              optionStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-semibold shadow-xs';
            } else if (isSelected && !correct) {
              optionStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-200 shadow-xs';
            } else {
              optionStyle = 'opacity-50 bg-slate-50 dark:bg-[#171717] border-slate-200 dark:border-[#2F2F2F] text-slate-400 dark:text-neutral-500';
            }
          }

          return (
            <div key={opt.id} className="space-y-1">
              <button
                type="button"
                role={config.isMultiSelect ? 'checkbox' : 'radio'}
                aria-checked={isSelected}
                disabled={isSubmitted || disabled}
                onClick={() => toggleSelect(opt.id)}
                className={clsx(
                  'w-full text-start p-3.5 border rounded-xl font-sans text-sm',
                  'transition-all duration-150 flex items-center justify-between gap-3',
                  optionStyle,
                  disabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                <span>{opt.text}</span>
                <span className="shrink-0 flex items-center gap-1.5">
                  {isSubmitted && correct && <Check className="w-5 h-5 text-emerald-600 stroke-[2.5]" />}
                  {isSubmitted && isSelected && !correct && (
                    <X className="w-5 h-5 text-rose-600 stroke-[2.5]" />
                  )}
                  {!isSubmitted && (
                    <span
                      className={clsx(
                        'w-4 h-4 rounded-full border inline-block transition-colors',
                        isSelected
                          ? 'bg-emerald-600 border-emerald-600 ring-2 ring-emerald-500/20'
                          : 'border-slate-300 dark:border-[#383838] bg-white dark:bg-[#252525]'
                      )}
                    />
                  )}
                </span>
              </button>

              {/* Show distractor rationale when selected and incorrect */}
              {isSubmitted && isSelected && !correct && opt.distractorRationale && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 rounded-xl text-xs font-sans text-rose-900 dark:text-rose-200 leading-relaxed">
                  <strong>{dict.misconception}</strong>
                  {opt.distractorRationale}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit / Explanation */}
      {!isSubmitted ? (
        <div className="pt-2">
          <Button
            variant="primary"
            disabled={selectedIds.length === 0 || disabled}
            onClick={handleSubmit}
          >
            {dict.checkAnswer}
          </Button>
        </div>
      ) : (
        <div className="pt-3 border-t border-slate-200 dark:border-[#2F2F2F] space-y-2">
          <div className="flex items-center gap-2">
            {config.options
              .filter((o) => o.isCorrect)
              .every((o) => selectedIds.includes(o.id)) &&
            selectedIds.every((id) => isOptionCorrect(id)) ? (
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                <span>{dict.correct}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-sm">
                <AlertCircle className="w-5 h-5 stroke-[2.5]" />
                <span>{dict.needsReview}</span>
              </div>
            )}
          </div>
          <div className="p-4 bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-xl shadow-xs">
            <span className="text-xs font-semibold uppercase text-slate-500 dark:text-neutral-400">{dict.explanation}</span>
            <p className="text-xs font-sans leading-relaxed pt-1 text-slate-800 dark:text-neutral-200">
              {config.explanation}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};
