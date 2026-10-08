import React, { useState, useEffect } from 'react';
import { Modal, Button, Progress, Tag } from 'antd';
import {
  FireFilled,
  BulbOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  ArrowRightOutlined,
  DownloadOutlined,
  ThunderboltOutlined,
  ExperimentOutlined,
  BookOutlined,
  SafetyCertificateOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import {
  CANONICAL_DAILY_TEN_QUESTIONS,
  DailyChallengeStep,
  DailySessionState,
  loadDailySession,
  submitChallengeStep,
  exportDailyTenToAnkiTsv,
  getTodayDateString,
} from '../../services/dailyHabitService';
import {
  loadMisconceptionStore,
  CANONICAL_MISCONCEPTIONS,
  MisconceptionCode,
} from '../../services/misconceptionService';

interface DailyChallengeModalProps {
  open: boolean;
  onClose: () => void;
  onCompleteSession?: (earnedXP: number, finalScore: number) => void;
}

export const DailyChallengeModal: React.FC<DailyChallengeModalProps> = ({
  open,
  onClose,
  onCompleteSession,
}) => {
  const [session, setSession] = useState<DailySessionState>(() => loadDailySession());
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isStepSubmitted, setIsStepSubmitted] = useState<boolean>(false);
  const [revealedHintTier, setRevealedHintTier] = useState<number>(0);

  // Tactile slider state for simulation cards
  const [sliderValue, setSliderValue] = useState<number>(7.4);

  const steps = CANONICAL_DAILY_TEN_QUESTIONS;
  const currentStep: DailyChallengeStep | undefined = steps[currentStepIdx];

  // Refresh session when modal opens
  useEffect(() => {
    if (open) {
      const fresh = loadDailySession();
      setSession(fresh);
      if (fresh.isCompleted) {
        setCurrentStepIdx(9);
      } else {
        setCurrentStepIdx(Math.min(fresh.currentStepIndex, 9));
      }
      setSelectedOptionId(null);
      setIsStepSubmitted(false);
      setRevealedHintTier(0);
    }
  }, [open]);

  // Reset local state when step index changes
  useEffect(() => {
    if (currentStep) {
      const alreadyAnsweredId = session.answers[currentStep.id];
      if (alreadyAnsweredId) {
        setSelectedOptionId(alreadyAnsweredId);
        setIsStepSubmitted(true);
      } else {
        setSelectedOptionId(null);
        setIsStepSubmitted(false);
      }
      setRevealedHintTier(0);
      if (currentStep.tactileConfig) {
        setSliderValue(Number(currentStep.tactileConfig.initialValue) || 7.4);
      }
    }
  }, [currentStepIdx, session.answers, currentStep]);

  if (!currentStep) return null;

  const handleSelectOption = (optionId: string) => {
    if (isStepSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmitCurrentStep = () => {
    if (!selectedOptionId || isStepSubmitted) return;

    const result = submitChallengeStep(
      currentStep,
      selectedOptionId,
      revealedHintTier,
      session.date
    );

    setSession(result.session);
    setIsStepSubmitted(true);

    if (result.session.isCompleted && onCompleteSession) {
      onCompleteSession(result.session.earnedXP, result.session.score);
    }
  };

  const handleNextStep = () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handleDownloadAnki = () => {
    const tsvContent = exportDailyTenToAnkiTsv(steps);
    const blob = new Blob([tsvContent], { type: 'text/tab-separated-values;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PharmLearn_Daily10_${getTodayDateString()}.tsv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const selectedOption = currentStep.options.find((o) => o.id === selectedOptionId);
  const correctOption = currentStep.options.find((o) => o.isCorrect);
  const isCorrect = selectedOption?.isCorrect ?? false;
  const progressPercent = Math.round(((currentStepIdx + 1) / steps.length) * 100);

  // Type badge formatting
  const renderTypeTag = (type: DailyChallengeStep['type']) => {
    switch (type) {
      case 'spaced_review':
        return (
          <Tag className="rounded-md border-0 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium px-2 py-0.5 text-[11px]">
            ⚡ FSRS Aralıklı Tekrar
          </Tag>
        );
      case 'curriculum_progression':
        return (
          <Tag className="rounded-md border-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium px-2 py-0.5 text-[11px]">
            📚 Müfredat İlerlemesi
          </Tag>
        );
      case 'tactile_simulation':
        return (
          <Tag className="rounded-md border-0 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium px-2 py-0.5 text-[11px]">
            🔬 Dokunsal Simülasyon
          </Tag>
        );
      case 'vize_trap_twin':
        return (
          <Tag className="rounded-md border-0 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-medium px-2 py-0.5 text-[11px]">
            🔥 Vize Tuzağı İkizi
          </Tag>
        );
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={780}
      centered
      className="pharmlearn-obsidian-modal"
      styles={{
        content: {
          backgroundColor: '#171717',
          borderColor: '#2F2F2F',
          borderRadius: '1.25rem',
          padding: '1.5rem',
          color: '#ECECEC',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <div className="flex flex-col gap-5 text-slate-100">
        {/* Header: Progress, Streak & Step Index */}
        <div className="flex flex-col gap-2 pb-4 border-b border-[#2F2F2F]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-[#10A37F]">
                <ThunderboltOutlined className="text-base" />
              </span>
              <div>
                <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#ECECEC] m-0">
                  Günün 10 Yüksek Verimli Vize Sorusu
                </h2>
                <span className="text-xs text-[#8E8E8E]">
                  Tahmini süre: 5-7 dk • FSRS-4.5 Kalibrasyonlu
                </span>
              </div>
            </div>

            {/* Streak & XP Counter */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">
                <FireFilled className="text-amber-500" /> 4 Günlük Seri
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-500/10 text-[#10A37F] text-xs font-semibold border border-emerald-500/20">
                +{session.earnedXP} XP
              </span>
            </div>
          </div>

          {/* Progress Bar & Indicators */}
          <div className="flex items-center gap-3 mt-1">
            <div className="flex-1">
              <Progress
                percent={progressPercent}
                showInfo={false}
                strokeColor="#10A37F"
                trailColor="#2A2A2A"
                size={['100%', 6]}
              />
            </div>
            <span className="text-xs font-mono font-semibold text-[#B4B4B4] shrink-0">
              Soru {currentStepIdx + 1} / {steps.length}
            </span>
          </div>
        </div>

        {/* Challenge Body */}
        {session.isCompleted && currentStepIdx === steps.length - 1 && isStepSubmitted ? (
          /* Completion Celebration View */
          <div className="py-6 flex flex-col items-center text-center gap-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-3xl text-[#10A37F] shadow-sm">
              <CheckOutlined />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#ECECEC] m-0">
                Tebrikler! Günün 10 Sorusunu Tamamladınız 🎉
              </h3>
              <p className="text-sm text-[#8E8E8E] mt-1.5 max-w-md mx-auto">
                Bugünkü aktif hatırlama seansı tamamlandı. Skorunuz:{' '}
                <strong className="text-emerald-400 font-semibold">{session.score} / 10</strong>.
                Hafıza izleriniz FSRS-4.5 eğrisine işlendi.
              </p>
            </div>

            {/* Achievement Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg">
              <div className="p-3.5 rounded-xl bg-[#212121] border border-[#2F2F2F] flex flex-col items-center">
                <span className="text-xs text-[#8E8E8E]">Kazanılan XP</span>
                <span className="text-lg font-bold text-[#10A37F] mt-0.5">+{session.earnedXP} XP</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#212121] border border-[#2F2F2F] flex flex-col items-center">
                <span className="text-xs text-[#8E8E8E]">Doğruluk Oranı</span>
                <span className="text-lg font-bold text-slate-100 mt-0.5">
                  %{Math.round((session.score / steps.length) * 100)}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#212121] border border-[#2F2F2F] flex flex-col items-center">
                <span className="text-xs text-[#8E8E8E]">Sonraki Tekrar</span>
                <span className="text-lg font-bold text-blue-400 mt-0.5">1-3 Gün</span>
              </div>
            </div>

            {/* Anki Export Action */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full mt-2">
              <Button
                type="default"
                onClick={handleDownloadAnki}
                icon={<DownloadOutlined className="text-[#10A37F]" />}
                className="w-full sm:w-auto rounded-xl h-11 px-5 bg-[#212121] border border-[#2F2F2F] text-slate-200 hover:border-emerald-500 font-semibold text-xs flex items-center justify-center gap-2"
              >
                Anki Destesine Aktar (.tsv) 📥
              </Button>
              <Button
                type="primary"
                onClick={onClose}
                className="w-full sm:w-auto rounded-xl h-11 px-8 bg-[#10A37F] hover:bg-[#0E8C6D] border-0 text-white font-semibold text-xs flex items-center justify-center"
              >
                Panoya Dön
              </Button>
            </div>
          </div>
        ) : (
          /* Active Question Flow */
          <div className="flex flex-col gap-4">
            {/* Meta Tags & Slide Citation */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {renderTypeTag(currentStep.type)}
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#B4B4B4] bg-[#212121] px-2.5 py-0.5 rounded-md border border-[#2F2F2F]">
                  {currentStep.courseId === 'medchem' ? (
                    <>
                      <ExperimentOutlined className="text-blue-400" /> Farmasötik Kimya
                    </>
                  ) : (
                    <>
                      <BookOutlined className="text-purple-400" /> Farmakoloji
                    </>
                  )}
                </span>
              </div>

              <span className="text-[11px] font-mono text-[#8E8E8E] bg-[#212121] px-2 py-0.5 rounded border border-[#2F2F2F]">
                📖 {currentStep.slideCitation}
              </span>
            </div>

            {/* Prompt Card */}
            <div className="bg-[#212121] rounded-2xl border border-[#2F2F2F] p-5 shadow-xs">
              <div className="text-xs font-semibold text-[#10A37F] uppercase tracking-wider mb-1.5">
                {currentStep.topic} • {currentStep.subtopic}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#ECECEC] leading-snug m-0">
                {currentStep.prompt}
              </h3>

              {/* Tactile Simulation Widget if present */}
              {currentStep.tactileConfig && (
                <div className="mt-4 p-4 rounded-xl bg-[#171717] border border-[#2A2A2A] flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs text-[#B4B4B4]">
                    <span className="font-semibold flex items-center gap-1.5 text-slate-300">
                      <ExperimentOutlined className="text-[#10A37F]" /> Fizikokimyasal Simülasyon Çubuğu
                    </span>
                    <span className="font-mono text-[#10A37F] font-bold">
                      {sliderValue} {currentStep.tactileConfig.unit || ''}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={12}
                    step={0.1}
                    value={sliderValue}
                    onChange={(e) => setSliderValue(parseFloat(e.target.value))}
                    disabled={isStepSubmitted}
                    className="w-full accent-[#10A37F] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-[#8E8E8E]">
                    <span>Mide (pH 2.0)</span>
                    <span className="text-[#10A37F] font-semibold">Fizyolojik Kan (pH 7.4)</span>
                    <span>İnce Bağırsak (pH 8.5)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Options List */}
            <div className="flex flex-col gap-2.5">
              {currentStep.options.map((option, idx) => {
                const isSelected = selectedOptionId === option.id;
                let optionStyle =
                  'bg-[#212121] border-[#2F2F2F] hover:border-[#10A37F]/50 text-slate-200';

                if (isSelected && !isStepSubmitted) {
                  optionStyle = 'bg-[#2A2A2A] border-[#10A37F] ring-1 ring-[#10A37F] text-white';
                }

                if (isStepSubmitted) {
                  if (option.isCorrect) {
                    optionStyle =
                      'bg-emerald-950/40 border-emerald-500/80 text-emerald-200 ring-1 ring-emerald-500/60';
                  } else if (isSelected && !option.isCorrect) {
                    optionStyle =
                      'bg-rose-950/40 border-rose-500/80 text-rose-200 ring-1 ring-rose-500/60';
                  } else {
                    optionStyle = 'bg-[#1A1A1A] border-[#2A2A2A] text-slate-400 opacity-60';
                  }
                }

                const letter = String.fromCharCode(65 + idx);

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelectOption(option.id)}
                    disabled={isStepSubmitted}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer disabled:cursor-default ${optionStyle}`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border ${
                        isStepSubmitted && option.isCorrect
                          ? 'bg-emerald-600 border-emerald-500 text-white'
                          : isStepSubmitted && isSelected && !option.isCorrect
                          ? 'bg-rose-600 border-rose-500 text-white'
                          : isSelected
                          ? 'bg-[#10A37F] border-[#10A37F] text-white'
                          : 'bg-[#2A2A2A] border-[#383838] text-slate-300'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="text-xs sm:text-sm font-medium leading-relaxed flex-1">
                      {option.text}
                    </span>

                    {/* Status Icons */}
                    {isStepSubmitted && option.isCorrect && (
                      <CheckCircleFilled className="text-emerald-400 text-base shrink-0 mt-0.5" />
                    )}
                    {isStepSubmitted && isSelected && !option.isCorrect && (
                      <CloseCircleFilled className="text-rose-400 text-base shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Diagnostic Misconception Feedback Card */}
            {isStepSubmitted && selectedOption && (
              <div
                className={`p-4 rounded-xl border animate-fadeIn ${
                  isCorrect
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                    : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1 text-xs font-bold">
                  {isCorrect ? (
                    <>
                      <CheckCircleFilled className="text-emerald-400" />
                      <span>Doğru Çözüm Rasyoneli:</span>
                    </>
                  ) : (
                    <>
                      <CloseCircleFilled className="text-rose-400" />
                      <span>Teşhis Edilen Yanılgı Tuzağı:</span>
                    </>
                  )}
                </div>
                <p className="text-xs leading-relaxed m-0">{selectedOption.diagnosticFeedback}</p>

                {/* Chemical Takeaway Note */}
                <div className="mt-2.5 pt-2 border-t border-slate-700/50 text-[11px] text-slate-300">
                  <span className="font-semibold text-slate-200">💡 Temel Çıkarım: </span>
                  {currentStep.takeaway}
                </div>
              </div>
            )}

            {/* 3-Tier Scaffolding Hint Ladder */}
            {!isStepSubmitted && (
              <div className="rounded-xl border border-[#2F2F2F] bg-[#1A1A1A] p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <BulbOutlined className="text-amber-400" /> Sokratik İpucu İste
                  </span>
                  {revealedHintTier < 3 && (
                    <Button
                      size="small"
                      type="link"
                      onClick={() => setRevealedHintTier((prev) => Math.min(3, prev + 1))}
                      className="text-xs text-[#10A37F] p-0 font-medium hover:text-emerald-400"
                    >
                      {revealedHintTier === 0
                        ? '1. Basamağı Aç (Nudge)'
                        : revealedHintTier === 1
                        ? '2. Basamağı Aç (Clue)'
                        : '3. Basamağı Aç (Solution)'}
                    </Button>
                  )}
                </div>

                {revealedHintTier > 0 && (
                  <div className="flex flex-col gap-1.5 pt-1">
                    {currentStep.hints.slice(0, revealedHintTier).map((hint, idx) => (
                      <div
                        key={idx}
                        className="text-xs p-2 rounded-lg bg-[#212121] border border-[#2F2F2F] text-slate-300 leading-relaxed"
                      >
                        <strong className="text-amber-400">
                          {idx === 0 ? 'Seviye 1 (Nudge): ' : idx === 1 ? 'Seviye 2 (Clue): ' : 'Seviye 3 (Solution): '}
                        </strong>
                        {hint}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-[#2F2F2F]">
              <span className="text-xs text-[#8E8E8E]">
                {isStepSubmitted
                  ? isCorrect
                    ? 'Doğru cevap! FSRS güncellendi.'
                    : 'Yanılgı hafızaya kaydedildi.'
                  : 'Predict-then-reveal: Bir şık seçip cevabı onaylayın.'}
              </span>

              <div className="flex items-center gap-2">
                {!isStepSubmitted ? (
                  <Button
                    type="primary"
                    disabled={!selectedOptionId}
                    onClick={handleSubmitCurrentStep}
                    className="rounded-xl px-5 h-10 bg-[#10A37F] hover:bg-[#0E8C6D] border-0 text-white font-semibold text-xs flex items-center gap-1.5 disabled:bg-[#2A2A2A] disabled:text-[#666666]"
                  >
                    Cevabı Onayla
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    onClick={handleNextStep}
                    icon={<ArrowRightOutlined />}
                    className="rounded-xl px-5 h-10 bg-[#10A37F] hover:bg-[#0E8C6D] border-0 text-white font-semibold text-xs flex items-center gap-1.5"
                  >
                    {currentStepIdx < steps.length - 1 ? 'Sonraki Soruya Geç' : 'Oturumu Tamamla'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
