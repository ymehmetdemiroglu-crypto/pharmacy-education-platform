import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Progress, Tag, Input, Alert } from 'antd';
import {
  FireFilled,
  ThunderboltOutlined,
  BulbOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  CompassOutlined,
  TrophyOutlined,
  BookOutlined,
  ExperimentOutlined,
  EyeOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import { useVizeTriageStore } from '../../stores/vizeTriageStore';

export const VizeCramCarouselModal: React.FC = () => {
  const {
    isCramModalOpen,
    closeCramSession,
    currentSlideIndex,
    cramStep,
    selectedOptionId,
    revealedHintLevel,
    isAnswerCorrect,
    sessionScore,
    completedSlideIds,
    failedTrapCodes,
    getActiveSlides,
    getCurrentSlide,
    advanceToPredict,
    unlockChallenge,
    revealNextHint,
    submitAnswer,
    advanceToNextSlide,
    startCramSession,
  } = useVizeTriageStore();

  const slides = getActiveSlides();
  const slide = getCurrentSlide();
  const totalSlides = slides.length;

  const [studentHypothesis, setStudentHypothesis] = useState('');

  // Reset local hypothesis when slide changes
  useEffect(() => {
    setStudentHypothesis('');
  }, [currentSlideIndex]);

  // Keyboard navigation shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isCramModalOpen || !slide) return;

      if (e.key === 'Escape') {
        closeCramSession();
        return;
      }

      if (cramStep === 'spotlight' && e.key === 'Enter') {
        advanceToPredict();
        return;
      }

      if (cramStep === 'predict' && (e.key === 'Enter' && (e.metaKey || e.ctrlKey))) {
        unlockChallenge();
        return;
      }

      if (cramStep === 'challenge') {
        // Space or H for hint
        if (e.key.toLowerCase() === 'h' || e.code === 'Space') {
          // Avoid triggering hint when typing in input
          if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
            e.preventDefault();
            revealNextHint();
            return;
          }
        }
        // Keys 1-4 for option selection
        const keyNum = parseInt(e.key, 10);
        if (keyNum >= 1 && keyNum <= slide.cramQuestion.options.length) {
          const opt = slide.cramQuestion.options[keyNum - 1];
          if (opt) {
            submitAnswer(opt.id);
          }
        }
      }

      if (cramStep === 'verdict' && (e.key === 'Enter' || e.key === 'ArrowRight')) {
        advanceToNextSlide();
      }
    },
    [isCramModalOpen, slide, cramStep, advanceToPredict, unlockChallenge, revealNextHint, submitAnswer, advanceToNextSlide, closeCramSession]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isCramModalOpen) return null;

  return (
    <Modal
      open={isCramModalOpen}
      onCancel={closeCramSession}
      footer={null}
      width={780}
      destroyOnHidden
      centered
      className="vize-cram-modal"
      styles={{ body: { padding: 0, overflow: 'hidden', borderRadius: 20 } }}
    >
      <div
        data-testid="vize-cram-carousel-modal"
        className="bg-white dark:bg-[#171717] text-slate-900 dark:text-[#ECECEC] flex flex-col max-h-[85vh] overflow-y-auto"
      >
        {/* Modal Top Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-[#2F2F2F] flex items-center justify-between bg-slate-50 dark:bg-[#1E1E1E]">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-red-500/10 text-red-500 border border-red-500/30 flex items-center justify-center font-bold text-sm">
              <FireFilled />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-red-500">
                  Vize Hızlı Kampı
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Slayt {currentSlideIndex + 1} / {totalSlides}
                </span>
              </div>
              <h2 className="text-sm font-bold text-slate-800 dark:text-[#ECECEC] m-0 truncate max-w-md">
                {slide ? slide.title : 'Kamp Tamamlandı'}
              </h2>
            </div>
          </div>

          {slide && (
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30">
                🔥 HYS {slide.highYieldScore}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Skor: {sessionScore}
              </span>
            </div>
          )}
        </div>

        {/* 5-Step Progress Stepper */}
        {slide && cramStep !== 'mastery' && (
          <div className="px-6 py-2.5 bg-slate-100/70 dark:bg-[#212121] border-b border-slate-200 dark:border-[#2F2F2F] flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 sm:gap-3 overflow-x-auto">
              <span
                className={`flex items-center gap-1 font-semibold ${
                  cramStep === 'spotlight' ? 'text-[#10A37F]' : 'text-slate-400'
                }`}
              >
                1. Slayt Odak
              </span>
              <span className="text-slate-300 dark:text-[#3A3A3A]">›</span>
              <span
                className={`flex items-center gap-1 font-semibold ${
                  cramStep === 'predict' ? 'text-[#10A37F]' : 'text-slate-400'
                }`}
              >
                2. Hipotez Kilitle
              </span>
              <span className="text-slate-300 dark:text-[#3A3A3A]">›</span>
              <span
                className={`flex items-center gap-1 font-semibold ${
                  cramStep === 'challenge' ? 'text-[#10A37F]' : 'text-slate-400'
                }`}
              >
                3. Soru & Tuzak
              </span>
              <span className="text-slate-300 dark:text-[#3A3A3A]">›</span>
              <span
                className={`flex items-center gap-1 font-semibold ${
                  cramStep === 'verdict' ? 'text-[#10A37F]' : 'text-slate-400'
                }`}
              >
                4. Teşhis Raporu
              </span>
            </div>

            <span className="hidden sm:inline-block font-mono text-[10px] text-slate-400">
              Kısayollar: [1-4] Şıklar | [H] İpucu | [Esc] Çık
            </span>
          </div>
        )}

        {/* Step 1: Spotlight */}
        {slide && cramStep === 'spotlight' && (
          <div data-testid="cram-step-spotlight" className="p-6 flex flex-col gap-5">
            <div className="bg-slate-50 dark:bg-[#212121] p-5 rounded-2xl border border-slate-200 dark:border-[#2F2F2F]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-semibold text-slate-400">
                  {slide.lectureDeckId} • Sayfa {slide.slideNumber}
                </span>
                <Tag color="volcano" className="rounded-lg text-[10px] m-0">
                  Klasik Vize Sorusu
                </Tag>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-[#ECECEC] mb-2">
                {slide.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-[#B4B4B4] leading-relaxed mb-4">
                {slide.conceptSummary}
              </p>

              {/* Mechanism Spotlight Frame */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs">
                <strong className="block mb-1 flex items-center gap-1.5 font-bold">
                  <EyeOutlined /> Slayt Odak Noktası (Hocanın Dikkat Çektiği Kısım):
                </strong>
                <span>{slide.examQuestionSnippet}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500 dark:text-[#8E8E8E]">
                💡 Bu slaytı inceledikten sonra hocanın soracağı tuzağı tahmin edeceksin.
              </span>
              <Button
                type="primary"
                data-testid="advance-to-predict-btn"
                onClick={advanceToPredict}
                className="rounded-xl h-10 px-5 font-bold bg-[#10A37F] hover:bg-[#0E8C6D] border-0 text-white flex items-center gap-1.5"
              >
                <span>Tahminimi Kilitle →</span>
                <ArrowRightOutlined className="text-xs" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Predict-then-Reveal Hypothesis Guard */}
        {slide && cramStep === 'predict' && (
          <div data-testid="cram-step-predict" className="p-6 flex flex-col gap-5">
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl text-emerald-800 dark:text-emerald-300 text-xs">
              <strong className="block mb-1 font-bold flex items-center gap-1.5">
                <CompassOutlined /> Aktif Öğrenme Kuralı (Predict-then-Reveal):
              </strong>
              <span>
                Şıkları görmeden önce beynin kendi cevabını formüle ettiğinde, sınav anında
                hatırlama kalıcılığı %40 oranında artar.
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-[#212121] p-5 rounded-2xl border border-slate-200 dark:border-[#2F2F2F]">
              <h4 className="text-sm font-bold text-slate-900 dark:text-[#ECECEC] mb-2">
                {slide.predictPrompt}
              </h4>
              <p className="text-xs text-slate-500 dark:text-[#8E8E8E] mb-4">
                Soru şıklarını açmadan önce bu slayttan sorulacak soruyu veya düşürülecek tuzağı kısaca yazın veya aklınızda canlandırın.
              </p>

              <Input.TextArea
                rows={3}
                data-testid="hypothesis-input"
                placeholder="Örn: Serin hidroksilinin organofosfatla kovalent bağ kurması ve yaşlanma (aging) reaksiyonu sorulur..."
                value={studentHypothesis}
                onChange={(e) => setStudentHypothesis(e.target.value)}
                className="rounded-xl bg-white dark:bg-[#171717] border-slate-200 dark:border-[#2F2F2F] text-xs p-3"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">
                (İsteğe bağlı yazabilir ya da doğrudan şıkları açabilirsiniz)
              </span>
              <Button
                type="primary"
                data-testid="unlock-challenge-btn"
                onClick={unlockChallenge}
                className="rounded-xl h-10 px-5 font-bold bg-[#10A37F] hover:bg-[#0E8C6D] border-0 text-white flex items-center gap-2"
              >
                <UnlockOutlined />
                <span>Cevap Şıklarını Aç ⚡</span>
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Active Recall Challenge */}
        {slide && cramStep === 'challenge' && (
          <div data-testid="cram-step-challenge" className="p-6 flex flex-col gap-5">
            <div>
              <span className="text-xs font-bold text-red-500 uppercase tracking-wider block mb-1">
                Vize Sınav Sorusu:
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-[#ECECEC] m-0 leading-snug">
                {slide.cramQuestion.questionPrompt}
              </h3>
            </div>

            {/* 3-Tier Scaffolded Hint Ladder */}
            <div className="flex flex-col gap-2">
              {revealedHintLevel >= 1 && (
                <div
                  data-testid="hint-tier-1"
                  className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs animate-fadeIn"
                >
                  <strong className="block text-[11px] font-bold text-amber-600 dark:text-amber-400 mb-0.5">
                    💡 İpucu 1 (Düşünme Yönü):
                  </strong>
                  <span>{slide.cramQuestion.hintLadder[0]}</span>
                </div>
              )}

              {revealedHintLevel >= 2 && (
                <div
                  data-testid="hint-tier-2"
                  className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-800 dark:text-blue-300 text-xs animate-fadeIn"
                >
                  <strong className="block text-[11px] font-bold text-blue-600 dark:text-blue-400 mb-0.5">
                    💡 İpucu 2 (Bilimsel İlke):
                  </strong>
                  <span>{slide.cramQuestion.hintLadder[1]}</span>
                </div>
              )}

              {revealedHintLevel >= 3 && (
                <div
                  data-testid="hint-tier-3"
                  className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-800 dark:text-purple-300 text-xs animate-fadeIn"
                >
                  <strong className="block text-[11px] font-bold text-purple-600 dark:text-purple-400 mb-0.5">
                    💡 İpucu 3 (Çözüm Anahtarı):
                  </strong>
                  <span>{slide.cramQuestion.hintLadder[2]}</span>
                </div>
              )}

              {revealedHintLevel < 3 && (
                <Button
                  type="dashed"
                  size="small"
                  data-testid="reveal-hint-btn"
                  onClick={revealNextHint}
                  icon={<BulbOutlined />}
                  className="self-start rounded-xl text-xs font-semibold text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800 hover:border-amber-500"
                >
                  {revealedHintLevel === 0
                    ? 'İpucu İste (Kademe 1: Yönlendirme) [H]'
                    : revealedHintLevel === 1
                    ? 'İpucu 2’yi Aç (Bilimsel İlke)'
                    : 'Çözüm Anahtarını Aç (Kademe 3)'}
                </Button>
              )}
            </div>

            {/* Decontaminated Multiple-Choice Options */}
            <div className="grid grid-cols-1 gap-2.5 pt-1">
              {slide.cramQuestion.options.map((option, idx) => (
                <button
                  key={option.id}
                  data-testid={`cram-option-${option.id}`}
                  onClick={() => submitAnswer(option.id)}
                  className="w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-[#2F2F2F] bg-slate-50 dark:bg-[#212121] hover:border-[#10A37F] hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-[#2A2A2A] text-slate-700 dark:text-[#ECECEC] font-mono font-bold text-xs flex items-center justify-center group-hover:bg-[#10A37F] group-hover:text-white transition-colors">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-[#ECECEC]">
                      {option.text}
                    </span>
                  </div>
                  <ArrowRightOutlined className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Diagnostic Verdict */}
        {slide && cramStep === 'verdict' && (
          <div data-testid="cram-step-verdict" className="p-6 flex flex-col gap-5">
            {isAnswerCorrect ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                <CheckCircleFilled className="text-emerald-500 text-xl mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-400 m-0">
                    Tebrikler! Vize Tuzağına Düşmedin 🎉
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-[#B4B4B4] mt-1 mb-0">
                    Soruyu doğru çözerek sınavda en sık yapılan hatayı başarıyla atlattın.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                <CloseCircleFilled className="text-red-500 text-xl mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-red-600 dark:text-red-400 m-0">
                    Dikkat! Klasik 3. Sınıf Sınav Tuzağı ⚠️
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-[#B4B4B4] mt-1 mb-0">
                    Seçtiğin şık amfide öğrencilerin en sık yanıldığı kavramsal yanılgıyı temsil ediyor.
                  </p>
                </div>
              </div>
            )}

            {/* Diagnostic Rationale */}
            <div className="bg-slate-50 dark:bg-[#212121] p-5 rounded-2xl border border-slate-200 dark:border-[#2F2F2F]">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Bilimsel Teşhis & Açıklama:
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-[#ECECEC] leading-relaxed mb-4">
                {slide.cramQuestion.diagnosticVerdict}
              </p>

              <div className="pt-3 border-t border-slate-200 dark:border-[#2A2A2A] flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>📄 {slide.lectureDeckId}, Slayt {slide.slideNumber}</span>
                <span className="text-emerald-500 font-semibold">FSRS Bellek Modeli Güncellendi ✓</span>
              </div>
            </div>

            {/* Navigation to Next Slide */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">
                Kısayol: [Enter] veya [→]
              </span>
              <Button
                type="primary"
                data-testid="next-slide-btn"
                onClick={advanceToNextSlide}
                className="rounded-xl h-10 px-5 font-bold bg-[#10A37F] hover:bg-[#0E8C6D] border-0 text-white flex items-center gap-1.5"
              >
                <span>
                  {currentSlideIndex < totalSlides - 1 ? 'Sonraki Slayta Geç →' : 'Sonuçları Gör 🏆'}
                </span>
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Mastery & Completion */}
        {cramStep === 'mastery' && (
          <div data-testid="cram-step-mastery" className="p-8 flex flex-col items-center text-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-3xl border border-emerald-500/30">
              <TrophyOutlined />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-[#ECECEC] m-0">
                Vize Hızlı Kampı Tamamlandı!
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#B4B4B4] mt-1 mb-0 max-w-sm">
                En kritik sınav slaytlarını ve canonical tuzakları başarıyla taradın.
              </p>
            </div>

            {/* Session Stats */}
            <div className="w-full max-w-md bg-slate-50 dark:bg-[#212121] p-5 rounded-2xl border border-slate-200 dark:border-[#2F2F2F] grid grid-cols-3 gap-3">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  Kazanılan Puan
                </span>
                <span className="text-xl font-bold text-[#10A37F]">{sessionScore}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  İncelenen Slayt
                </span>
                <span className="text-xl font-bold text-slate-800 dark:text-[#ECECEC]">
                  {completedSlideIds.length}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  Hata Sayısı
                </span>
                <span className="text-xl font-bold text-red-500">
                  {failedTrapCodes.length}
                </span>
              </div>
            </div>

            {failedTrapCodes.length > 0 && (
              <div className="w-full max-w-md text-left">
                <span className="text-xs font-semibold text-slate-600 dark:text-[#B4B4B4] block mb-2">
                  Tekrar Edilmesi Gereken Tuzaklar:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {failedTrapCodes.map((code) => (
                    <Tag key={code} color="error" className="rounded-lg text-[10px] font-mono m-0">
                      ⚠️ {code}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 mt-3">
              <Button
                type="primary"
                onClick={() => startCramSession(0)}
                className="rounded-xl h-10 px-5 font-bold bg-[#10A37F] hover:bg-[#0E8C6D] border-0 text-white"
              >
                Kampı Tekrar Başlat ⚡
              </Button>
              <Button
                onClick={closeCramSession}
                className="rounded-xl h-10 px-5 font-semibold border-slate-200 dark:border-[#2F2F2F]"
              >
                Kapat ve Haritaya Dön
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
