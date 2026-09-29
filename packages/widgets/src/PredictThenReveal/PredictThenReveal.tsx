import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Card, Button, StickerBadge } from '@pharmacy/ui';
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { BaseWidgetProps } from '../types';
import { PredictThenRevealConfig } from './schema';

export type PredictThenRevealProps = BaseWidgetProps<PredictThenRevealConfig, string>;

export const PredictThenReveal: React.FC<PredictThenRevealProps> = ({
  config,
  onAttempt,
  onCorrect,
  onIncorrect,
  disabled = false,
  className,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

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

  return (
    <Card
      variant={isRevealed ? (selectedOption?.isCorrect ? 'success' : 'misconception') : 'default'}
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
            Predict-Then-Reveal
          </StickerBadge>
          <span className="text-[11px] font-mono text-gray-600 dark:text-gray-400">
            Source: {config.source.file} (p. {config.source.page})
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
          Step 1: Commit your hypothesis
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
                  'w-full text-left p-3 border-3 border-black dark:border-slate-700 rounded-none font-body text-sm',
                  'transition-all duration-150 flex items-center justify-between',
                  isSelected
                    ? 'bg-[#FFD93D] text-black shadow-neo-sm font-bold translate-x-1'
                    : 'bg-white dark:bg-[#1E293B] text-black dark:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800',
                  disabled && 'opacity-60 cursor-not-allowed'
                )}
              >
                <span>{opt.label}</span>
                {isSelected && <span className="text-xs font-mono uppercase ml-2">[Selected]</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reveal Action / Outcome */}
      {!isRevealed ? (
        <div className="pt-2">
          <Button
            variant="primary"
            disabled={!selectedOptionId || disabled}
            onClick={handleReveal}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Reveal Experimental Outcome
          </Button>
        </div>
      ) : (
        <div className="pt-3 border-t-3 border-black dark:border-slate-700 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            {selectedOption?.isCorrect ? (
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-display font-black text-sm uppercase">
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                <span>Hypothesis Confirmed by Experiment</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-display font-black text-sm uppercase">
                <AlertCircle className="w-5 h-5 stroke-[2.5]" />
                <span>Unexpected Outcome / Misconception Alert</span>
              </div>
            )}
          </div>

          {/* Targeted Misconception feedback if incorrect */}
          {!selectedOption?.isCorrect && selectedOption?.misconceptionFeedback && (
            <div className="p-3 bg-[#FFE4E6] dark:bg-[#2A0E18] border-2 border-black dark:border-rose-600 font-body text-xs leading-relaxed text-rose-900 dark:text-rose-200">
              <strong>Targeted Note: </strong>
              {selectedOption.misconceptionFeedback}
            </div>
          )}

          {/* Outcome & Full Explanation */}
          <div className="p-3 bg-white dark:bg-[#1E293B] border-2 border-black dark:border-slate-700 space-y-1.5 shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#030712] text-black dark:text-slate-100">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
              Experimental Finding:
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
