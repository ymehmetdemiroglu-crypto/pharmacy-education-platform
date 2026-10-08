import React, { useState } from 'react';
import { MisconceptionChallenge } from '../../types/facultyAmfi.types';

export interface MisconceptionChallengeModalProps {
  challenge: MisconceptionChallenge;
  onClose: () => void;
  onCompleted?: (isCorrect: boolean) => void;
}

export const MisconceptionChallengeModal: React.FC<MisconceptionChallengeModalProps> = ({
  challenge,
  onClose,
  onCompleted
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [hintTier, setHintTier] = useState<number>(0); // 0 = none, 1 = nudge, 2 = clue, 3 = solution

  const selectedOption = challenge.options.find((o) => o.id === selectedOptionId);
  const isCorrect = selectedOption?.isCorrect ?? false;

  const handleSelect = (id: string) => {
    if (!isSubmitted) {
      setSelectedOptionId(id);
    }
  };

  const handleSubmit = () => {
    if (selectedOptionId && !isSubmitted) {
      setIsSubmitted(true);
      if (onCompleted) {
        onCompleted(isCorrect);
      }
    }
  };

  const handleNextHint = () => {
    if (hintTier < 3) {
      setHintTier((prev) => prev + 1);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="challenge-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
    >
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border-4 border-black bg-[#FFF8E7] p-6 text-slate-900 shadow-[8px_8px_0px_#000000] dark:bg-[#121212] dark:text-slate-100">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b-2 border-black/20 pb-4 dark:border-white/20">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-rose-600 px-2 py-0.5 text-xs font-black uppercase tracking-wider text-white">
                Sınıf Tuzak Mücadelesi ⚡
              </span>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Slayt {challenge.slideNumber} • {challenge.trapCode}
              </span>
            </div>
            <h3 id="challenge-title" className="mt-1 font-heading text-lg font-black md:text-xl">
              {challenge.headline}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-black bg-white font-black text-black shadow-[2px_2px_0px_#000000] hover:bg-slate-100 dark:bg-slate-800 dark:text-white"
          >
            ✕
          </button>
        </div>

        {/* Question Prompt */}
        <div className="mt-4 rounded-xl border-2 border-black bg-white p-4 shadow-[4px_4px_0px_#000000] dark:bg-slate-900">
          <p className="font-heading text-base font-bold leading-relaxed text-slate-900 dark:text-slate-100">
            {challenge.questionPrompt}
          </p>
        </div>

        {/* 3-Tier Scaffolded Hint Ladder */}
        {!isSubmitted && (
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                İpucu Merdiveni
              </span>
              {hintTier < 3 && (
                <button
                  type="button"
                  onClick={handleNextHint}
                  className="flex items-center gap-1 rounded border-2 border-black bg-yellow-300 px-2.5 py-1 text-xs font-black text-black shadow-[2px_2px_0px_#000000] hover:bg-yellow-200"
                >
                  <span>💡 İpucu Al ({hintTier + 1}/3)</span>
                </button>
              )}
            </div>

            {hintTier > 0 && (
              <div className="mt-2 space-y-2">
                {hintTier >= 1 && (
                  <div className="rounded-lg border-2 border-black bg-yellow-100 p-2.5 text-xs text-slate-900 dark:bg-yellow-950/50 dark:text-yellow-100">
                    <strong className="font-bold">1. Kademe (İpucu):</strong> {challenge.hintLadder[0]}
                  </div>
                )}
                {hintTier >= 2 && (
                  <div className="rounded-lg border-2 border-black bg-amber-100 p-2.5 text-xs text-slate-900 dark:bg-amber-950/50 dark:text-amber-100">
                    <strong className="font-bold">2. Kademe (İpuç):</strong> {challenge.hintLadder[1]}
                  </div>
                )}
                {hintTier >= 3 && (
                  <div className="rounded-lg border-2 border-black bg-orange-100 p-2.5 text-xs text-slate-900 dark:bg-orange-950/50 dark:text-orange-100">
                    <strong className="font-bold">3. Kademe (Çözüm Adımı):</strong> {challenge.hintLadder[2]}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 4 Predict-Then-Reveal Options */}
        <div className="mt-5 space-y-2.5">
          {challenge.options.map((option, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const isSelected = selectedOptionId === option.id;

            let optionStyle =
              'border-2 border-black bg-white hover:bg-amber-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100';

            if (!isSubmitted) {
              if (isSelected) {
                optionStyle = 'border-3 border-black bg-amber-200 shadow-[4px_4px_0px_#000000] text-black';
              }
            } else {
              if (option.isCorrect) {
                optionStyle =
                  'border-3 border-black bg-emerald-100 dark:bg-emerald-950/60 text-slate-900 dark:text-emerald-100 shadow-[4px_4px_0px_#000000]';
              } else if (isSelected && !option.isCorrect) {
                optionStyle =
                  'border-3 border-black bg-rose-100 dark:bg-rose-950/60 text-slate-900 dark:text-rose-100 shadow-[4px_4px_0px_#000000]';
              } else {
                optionStyle = 'opacity-60 border-2 border-black bg-white dark:bg-slate-900';
              }
            }

            return (
              <button
                key={option.id}
                type="button"
                disabled={isSubmitted}
                onClick={() => handleSelect(option.id)}
                className={`w-full rounded-xl p-3.5 text-left transition-all ${optionStyle}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-black bg-black font-mono text-xs font-black text-white">
                    {letter}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold leading-normal md:text-sm">{option.text}</p>
                    {isSubmitted && (
                      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-black/10 pt-2 text-[11px] font-semibold dark:border-white/10">
                        <span className={option.isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}>
                          {option.misconceptionDiagnosis}
                        </span>
                        <span className="rounded bg-black/10 px-1.5 py-0.5 text-black dark:bg-white/10 dark:text-white">
                          Dönem Seçimi: %{option.cohortPickPercentage}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Verdict & Diagnostic Feedback */}
        {isSubmitted && (
          <div className="mt-5 space-y-4">
            <div
              className={`rounded-xl border-3 border-black p-4 shadow-[4px_4px_0px_#000000] ${
                isCorrect
                  ? 'bg-emerald-100 text-slate-900 dark:bg-emerald-950/60 dark:text-emerald-100'
                  : 'bg-rose-100 text-slate-900 dark:bg-rose-950/60 dark:text-rose-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{isCorrect ? '✅' : '⚠️'}</span>
                <h4 className="font-heading text-sm font-black md:text-base">
                  {isCorrect
                    ? 'Mükemmel! Tuzağı Başarıyla Teşhis Ettin'
                    : 'Tuzak Teşhis Edildi! Sınıfın Çoğunluğu da Buraya Takıldı'}
                </h4>
              </div>
              <p className="mt-2 text-xs font-medium leading-relaxed">
                {challenge.diagnosticExplanation}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-black/10 pt-2 text-[11px] font-bold dark:border-white/10">
                <span>📚 Kaynak: {challenge.sourceAttribution.file} (Slayt {challenge.sourceAttribution.pageOrSlide})</span>
                <span>
                  {isCorrect
                    ? '🏆 Sınıfın sadece %32\'si bu tuzağı aşabildi!'
                    : '👥 Dönem arkadaşlarının %68\'i de bu tuzakta yanıldı.'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-end gap-3 border-t-2 border-black/20 pt-4 dark:border-white/20">
          {!isSubmitted ? (
            <button
              type="button"
              disabled={!selectedOptionId}
              onClick={handleSubmit}
              className="flex items-center gap-2 rounded-xl border-3 border-black bg-emerald-400 px-6 py-2.5 font-heading text-sm font-black text-black shadow-[4px_4px_0px_#000000] transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40 active:translate-x-0.5 active:translate-y-0.5"
            >
              <span>Cevabı Kilitle & Amfi İstatistiğini Gör</span>
              <span aria-hidden="true">🔒</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 rounded-xl border-3 border-black bg-black px-6 py-2.5 font-heading text-sm font-black text-white shadow-[4px_4px_0px_#666666] transition hover:bg-slate-800"
            >
              <span>Amfiye Dön</span>
              <span aria-hidden="true">🏛️</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
