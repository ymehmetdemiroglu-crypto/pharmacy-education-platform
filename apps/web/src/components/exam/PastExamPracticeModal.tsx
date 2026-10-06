import React, { useState } from 'react';
import { Modal, Input, Button, Alert, Radio, Steps, Space, Tag } from 'antd';
import {
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  BulbOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  ReloadOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { pastExamService, TwinQuestion, ExamScrubResult } from '../../services/pastExamService';

interface PastExamPracticeModalProps {
  open: boolean;
  onClose: () => void;
}

export const PastExamPracticeModal: React.FC<PastExamPracticeModalProps> = ({
  open,
  onClose,
}) => {
  const [rawText, setRawText] = useState(
    'Marmara Üniversitesi Eczacılık 2023 Vizesi: Prokain ile Dibukain etki sürelerini ve stabilitelerini karşılaştırınız.'
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [scrubResult, setScrubResult] = useState<ExamScrubResult | null>(null);
  const [twinQuestion, setTwinQuestion] = useState<TwinQuestion | null>(null);

  // Solving state
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [revealedHintTier, setRevealedHintTier] = useState<number>(0);

  const handleSynthesize = async () => {
    if (!rawText.trim()) return;
    setIsProcessing(true);

    // 1. Scrub institution & instructor identities (Legal Shield)
    const scrubbed = pastExamService.scrubExamText(rawText);
    setScrubResult(scrubbed);

    // 2. Synthesize original isomorphic twin question
    const twin = await pastExamService.synthesizeTwinQuestion(scrubbed);
    setTwinQuestion(twin);

    // Reset interaction state
    setSelectedOptionId(null);
    setIsSubmitted(false);
    setRevealedHintTier(0);
    setIsProcessing(false);
  };

  const handleReset = () => {
    setScrubResult(null);
    setTwinQuestion(null);
    setSelectedOptionId(null);
    setIsSubmitted(false);
    setRevealedHintTier(0);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={720}
      centered
      getContainer={false}
      transitionName=""
      maskTransitionName=""
      className="past-exam-modal"
      title={
        <div className="flex items-center gap-2 pt-1">
          <div className="w-7 h-7 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm border border-emerald-200 dark:border-emerald-800">
            <SafetyCertificateOutlined />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-[#ECECEC] m-0">
              Çıkmış Soru Analizi & İkiz Soru Sentez Motoru
            </h3>
            <p className="text-[11px] text-slate-400 font-normal m-0">
              Telif korumalı anonimleştirme ve Sokratik vize pratiği
            </p>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-4 py-2">
        {/* Legal Shield Disclaimer */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#171717] border border-slate-200 dark:border-[#2F2F2F] text-xs text-slate-600 dark:text-[#B4B4B4] flex items-start gap-2.5">
          <SafetyCertificateOutlined className="text-emerald-500 text-base mt-0.5 shrink-0" />
          <div>
            <strong className="text-slate-800 dark:text-[#ECECEC]">Hukuki & Telif Kalkanı:</strong>{' '}
            Yüklediğiniz sınav sorusu üniversite ve hoca isimlerinden tamamen arındırılır. Orijinal sınav kağıdı asla
            kamuya açık yayınlanmaz; arka planda çekirdek kimya/farmakoloji kavramı analiz edilerek özgün bir{' '}
            <strong className="text-emerald-600 dark:text-emerald-400">Pedagojik İkiz Soru</strong> sentezlenir.
          </div>
        </div>

        {!twinQuestion ? (
          /* Step 1: Input / Paste */
          <div className="flex flex-col gap-3">
            <label className="text-xs font-semibold text-slate-700 dark:text-[#ECECEC]">
              Geçmiş Yıl Sınav Sorusunu Yapıştırın veya Yazın:
            </label>
            <Input.TextArea
              rows={4}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Örn: 2023 Vizesi: Prokain ve Dibukain etki sürelerini ester-amit bağı açısından kıyaslayınız..."
              className="rounded-xl font-sans text-xs bg-white dark:bg-[#212121] border-slate-200 dark:border-[#2F2F2F] text-slate-900 dark:text-[#ECECEC]"
            />

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-400">
                Örnek: Marmara, Hacettepe, İstanbul Eczacılık vize soruları
              </span>
              <Button
                type="primary"
                onClick={handleSynthesize}
                loading={isProcessing}
                icon={<ThunderboltOutlined />}
                className="bg-[#10A37F] hover:bg-[#0E8C6D] text-white font-semibold rounded-xl h-10 px-5 border-0 shadow-xs"
              >
                Anonimleştir & İkiz Soru Üret
              </Button>
            </div>
          </div>
        ) : (
          /* Step 2: Interactive Twin Question Solver */
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Scrubbed Banner */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-xs">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                <CheckCircleFilled className="text-emerald-500" />
                <span>
                  <strong>Hukuki Kalkan Aktif:</strong> {scrubResult?.removedEntities.length ? scrubResult.removedEntities.join(', ') : 'Öğretim kurumu'} ibareleri temizlendi.
                </span>
              </div>
              <Button
                size="small"
                type="text"
                onClick={handleReset}
                icon={<ReloadOutlined />}
                className="text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400"
              >
                Yeni Soru Gir
              </Button>
            </div>

            {/* Twin Question Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#171717] border border-slate-200 dark:border-[#2F2F2F] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
                  Sentezlenen Pedagojik İkiz Soru
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Slayt {twinQuestion.slideReferences.join(', ')} Atıflı
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-[#ECECEC] m-0 leading-relaxed">
                {twinQuestion.questionPrompt}
              </h4>

              {/* Options */}
              <div className="flex flex-col gap-2.5">
                {twinQuestion.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  let cardStyle = 'border-slate-200 dark:border-[#2F2F2F] hover:border-slate-400 dark:hover:border-[#555]';

                  if (isSubmitted) {
                    if (opt.isCorrect) {
                      cardStyle = 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200';
                    } else if (isSelected && !opt.isCorrect) {
                      cardStyle = 'border-rose-500 bg-rose-50/40 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200';
                    }
                  } else if (isSelected) {
                    cardStyle = 'border-emerald-500 bg-slate-50 dark:bg-[#262626]';
                  }

                  return (
                    <div
                      key={opt.id}
                      onClick={() => !isSubmitted && setSelectedOptionId(opt.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 text-xs ${cardStyle}`}
                    >
                      <span className="font-medium text-slate-800 dark:text-[#ECECEC] leading-relaxed">
                        {opt.text}
                      </span>
                      {isSubmitted && opt.isCorrect && (
                        <CheckCircleFilled className="text-emerald-500 text-sm shrink-0 mt-0.5" />
                      )}
                      {isSubmitted && isSelected && !opt.isCorrect && (
                        <CloseCircleFilled className="text-rose-500 text-sm shrink-0 mt-0.5" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Action & Socratic Hint Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-[#262626]">
                <Button
                  onClick={() => setRevealedHintTier((t) => Math.min(3, t + 1))}
                  disabled={revealedHintTier >= 3}
                  icon={<BulbOutlined className="text-amber-500" />}
                  className="rounded-xl text-xs font-medium text-slate-700 dark:text-[#ECECEC] border-slate-200 dark:border-[#2F2F2F]"
                >
                  {revealedHintTier === 0
                    ? 'Sokratik İpucu İste (1/3)'
                    : revealedHintTier === 1
                    ? 'Daha Güçlü İpucu (2/3)'
                    : revealedHintTier === 2
                    ? 'Çözüm İskelesi (3/3)'
                    : 'Tüm İpuçları Açık'}
                </Button>

                {!isSubmitted ? (
                  <Button
                    type="primary"
                    disabled={!selectedOptionId}
                    onClick={() => setIsSubmitted(true)}
                    className="bg-[#10A37F] hover:bg-[#0E8C6D] text-white font-semibold rounded-xl text-xs px-6 h-9 border-0 shadow-xs"
                  >
                    Seçimi Kontrol Et
                  </Button>
                ) : (
                  <Button
                    onClick={handleReset}
                    className="rounded-xl text-xs border-slate-200 dark:border-[#2F2F2F] text-slate-700 dark:text-[#ECECEC]"
                  >
                    Başka Soru Çöz
                  </Button>
                )}
              </div>

              {/* Revealed Hints */}
              {revealedHintTier > 0 && (
                <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 text-xs">
                  {twinQuestion.scaffoldingLadder.slice(0, revealedHintTier).map((hint, idx) => (
                    <div key={idx} className="text-amber-900 dark:text-amber-200">
                      <strong>{hint.split(':')[0]}:</strong>{hint.substring(hint.indexOf(':') + 1)}
                    </div>
                  ))}
                </div>
              )}

              {/* Submitted Feedback & Takeaway */}
              {isSubmitted && (
                <div className="flex flex-col gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#212121] border border-slate-200 dark:border-[#2F2F2F] text-xs">
                    <p className="text-slate-800 dark:text-[#ECECEC] m-0 leading-relaxed">
                      {twinQuestion.explanation}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-semibold flex items-center gap-2">
                    <BookOutlined /> {twinQuestion.pedagogicalTakeaway}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
