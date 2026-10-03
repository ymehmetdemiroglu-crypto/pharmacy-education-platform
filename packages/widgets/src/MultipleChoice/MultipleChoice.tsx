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

          let optionStyle = 'bg-white dark:bg-[#1E293B] text-black dark:text-slate-100 hover:bg-gray-50 dark:hover:bg-slate-800';
          if (isSelected && !isSubmitted) {
            optionStyle = 'bg-[#FFD93D] text-black font-bold shadow-neo-sm translate-x-1';
          } else if (isSubmitted) {
            if (correct) {
              optionStyle = 'bg-[#EBFBEE] dark:bg-[#072518] border-[#6BCB77] dark:border-emerald-600 text-black dark:text-emerald-200 font-bold';
            } else if (isSelected && !correct) {
              optionStyle = 'bg-[#FFF0F5] dark:bg-[#2A0E18] border-[#FF6B9D] dark:border-rose-600 text-black dark:text-rose-200';
            } else {
              optionStyle = 'opacity-60 bg-gray-100 dark:bg-[#0B0F17] text-gray-500 dark:text-slate-400';
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
                  'w-full text-start p-3 border-3 border-black dark:border-slate-700 rounded-none font-body text-sm',
                  'transition-all duration-150 flex items-center justify-between gap-3',
                  optionStyle,
                  disabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                <span>{opt.text}</span>
                <span className="shrink-0 flex items-center gap-1.5">
                  {isSubmitted && correct && <Check className="w-5 h-5 text-emerald-600 stroke-[3]" />}
                  {isSubmitted && isSelected && !correct && (
                    <X className="w-5 h-5 text-rose-600 stroke-[3]" />
                  )}
                  {!isSubmitted && (
                    <span
                      className={clsx(
                        'w-4 h-4 border-2 border-black dark:border-slate-700 inline-block',
                        isSelected ? 'bg-black dark:bg-amber-400' : 'bg-white dark:bg-[#131B2A]'
                      )}
                    />
                  )}
                </span>
              </button>

              {/* Show distractor rationale when selected and incorrect */}
              {isSubmitted && isSelected && !correct && opt.distractorRationale && (
                <div className="p-2.5 bg-[#FFE4E6] dark:bg-[#2A0E18] border-2 border-black dark:border-rose-600 text-xs font-body text-rose-900 dark:text-rose-200">
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
        <div className="pt-3 border-t-3 border-black dark:border-slate-700 space-y-2">
          <div className="flex items-center gap-2">
            {config.options
              .filter((o) => o.isCorrect)
              .every((o) => selectedIds.includes(o.id)) &&
            selectedIds.every((id) => isOptionCorrect(id)) ? (
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-display font-black text-sm uppercase">
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                <span>{dict.correct}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-display font-black text-sm uppercase">
                <AlertCircle className="w-5 h-5 stroke-[2.5]" />
                <span>{dict.needsReview}</span>
              </div>
            )}
          </div>
          <div className="p-3 bg-[#FFFDF7] dark:bg-[#1E293B] border-2 border-black dark:border-slate-700 shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#030712]">
            <span className="text-xs font-mono font-bold uppercase text-gray-700 dark:text-slate-300">{dict.explanation}</span>
            <p className="text-xs font-body leading-relaxed pt-1 text-gray-800 dark:text-slate-200">
              {config.explanation}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};
