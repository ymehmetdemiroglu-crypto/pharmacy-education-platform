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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn"
    >
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 dark:border-[#2F2F2F] bg-white dark:bg-[#1E1E1E] p-6 sm:p-8 text-slate-900 dark:text-[#ECECEC] shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200/80 dark:border-[#2E2E2E] pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-rose-600/90 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
                Sınıf Tuzak Mücadelesi ⚡
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-neutral-400">
                Slayt {challenge.slideNumber} • {challenge.trapCode}
              </span>
            </div>
            <h3 id="challenge-title" className="mt-1.5 text-lg font-bold text-slate-900 dark:text-[#ECECEC] md:text-xl">
              {challenge.headline}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 dark:border-[#383838] bg-slate-100 dark:bg-[#2A2A2A] text-slate-600 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-[#333333] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Question Prompt */}
        <div className="mt-4 rounded-2xl border border-slate-200 dark:border-[#333333] bg-slate-50 dark:bg-[#252525] p-5 shadow-2xs">
          <p className="text-sm sm:text-base font-semibold leading-relaxed text-slate-900 dark:text-[#ECECEC]">
            {challenge.questionPrompt}
          </p>
        </div>

        {/* 3-Tier Scaffolded Hint Ladder */}
        {!isSubmitted && (
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-neutral-400">
                İpucu Merdiveni
              </span>
              {hintTier < 3 && (
                <button
                  type="button"
                  onClick={handleNextHint}
                  className="flex items-center gap-1.5 rounded-xl border border-amber-300 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors"
                >
                  <span>💡 İpucu Al ({hintTier + 1}/3)</span>
                </button>
              )}
            </div>

            {hintTier > 0 && (
              <div className="mt-2.5 space-y-2">
                {hintTier >= 1 && (
                  <div className="rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50/70 dark:bg-amber-950/30 p-3 text-xs text-slate-800 dark:text-amber-200 leading-relaxed">
                    <strong className="font-semibold text-amber-900 dark:text-amber-300">1. Kademe (İpucu):</strong> {challenge.hintLadder[0]}
                  </div>
                )}
                {hintTier >= 2 && (
                  <div className="rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50/70 dark:bg-amber-950/30 p-3 text-xs text-slate-800 dark:text-amber-200 leading-relaxed">
                    <strong className="font-semibold text-amber-900 dark:text-amber-300">2. Kademe (İpuç):</strong> {challenge.hintLadder[1]}
                  </div>
                )}
                {hintTier >= 3 && (
                  <div className="rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50/70 dark:bg-amber-950/30 p-3 text-xs text-slate-800 dark:text-amber-200 leading-relaxed">
                    <strong className="font-semibold text-amber-900 dark:text-amber-300">3. Kademe (Çözüm Adımı):</strong> {challenge.hintLadder[2]}
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
              'border border-slate-200 dark:border-[#2F2F2F] bg-slate-50/60 dark:bg-[#252525] hover:bg-slate-100 dark:hover:bg-[#2C2C2C] text-slate-800 dark:text-[#ECECEC]';

            if (!isSubmitted) {
              if (isSelected) {
                optionStyle = 'border-2 border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 shadow-xs';
              }
            } else {
              if (option.isCorrect) {
                optionStyle =
                  'border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-slate-900 dark:text-emerald-100 shadow-xs';
              } else if (isSelected && !option.isCorrect) {
                optionStyle =
                  'border-2 border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-slate-900 dark:text-rose-100 shadow-xs';
              } else {
                optionStyle = 'opacity-50 border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]';
              }
            }

            return (
              <button
                key={option.id}
                type="button"
                disabled={isSubmitted}
                onClick={() => handleSelect(option.id)}
                className={`w-full rounded-xl p-3.5 sm:p-4 text-left transition-all ${optionStyle}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-200 dark:bg-[#333333] font-mono text-xs font-bold text-slate-700 dark:text-neutral-300">
                    {letter}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold leading-normal md:text-sm text-slate-900 dark:text-[#ECECEC]">{option.text}</p>
                    {isSubmitted && (
                      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 dark:border-[#333333] pt-2 text-[11px] font-medium">
                        <span className={option.isCorrect ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : 'text-rose-700 dark:text-rose-400 font-semibold'}>
                          {option.misconceptionDiagnosis}
                        </span>
                        <span className="rounded-md bg-slate-200/70 dark:bg-[#333333] px-2 py-0.5 text-slate-700 dark:text-neutral-300 font-mono">
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
              className={`rounded-2xl border p-5 shadow-xs ${
                isCorrect
                  ? 'border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/90 dark:bg-emerald-950/40 text-slate-900 dark:text-emerald-100'
                  : 'border-rose-300 dark:border-rose-800/80 bg-rose-50/90 dark:bg-rose-950/40 text-slate-900 dark:text-rose-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{isCorrect ? '✅' : '⚠️'}</span>
                <h4 className="text-sm font-bold md:text-base">
                  {isCorrect
                    ? 'Mükemmel! Tuzağı Başarıyla Teşhis Ettin'
                    : 'Tuzak Teşhis Edildi! Sınıfın Çoğunluğu da Buraya Takıldı'}
                </h4>
              </div>
              <p className="mt-2 text-xs font-medium leading-relaxed text-slate-800 dark:text-neutral-200">
                {challenge.diagnosticExplanation}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-slate-200 dark:border-[#383838] pt-2.5 text-[11px] font-medium text-slate-600 dark:text-neutral-400">
                <span>📚 Kaynak: {challenge.sourceAttribution.file} (Slayt {challenge.sourceAttribution.pageOrSlide})</span>
                <span className="font-semibold">
                  {isCorrect
                    ? '🏆 Sınıfın sadece %32\'si bu tuzağı aşabildi!'
                    : '👥 Dönem arkadaşlarının %68\'i de bu tuzakta yanıldı.'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-200/80 dark:border-[#2E2E2E] pt-4">
          {!isSubmitted ? (
            <button
              type="button"
              disabled={!selectedOptionId}
              onClick={handleSubmit}
              className="flex items-center gap-2 rounded-xl bg-[#10A37F] hover:bg-[#0E8C6D] px-6 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span>Cevabı Kilitle & Amfi İstatistiğini Gör</span>
              <span aria-hidden="true">🔒</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-[#2A2A2A] hover:bg-slate-800 dark:hover:bg-[#333333] px-6 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors"
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
