import React, { useState } from 'react';
import { Button, Alert, Tag, Steps } from 'antd';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  QuestionCircleOutlined,
  BulbOutlined,
  RightOutlined,
  RobotOutlined,
} from '@ant-design/icons';
import type { LectureConcept } from '@pharmacy/widgets';
import { realtimeTelemetry } from '../../services/realtimeTelemetryService';

interface ConceptQuizWidgetProps {
  concept: LectureConcept;
  onMasteryAchieved?: (conceptId: string) => void;
  onAskTutor?: (question: string) => void;
}

export const ConceptQuizWidget: React.FC<ConceptQuizWidgetProps> = ({
  concept,
  onMasteryAchieved,
  onAskTutor,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hintTier, setHintTier] = useState<number>(0);

  const rawConfig = concept.widget?.config as any;
  const options: { id: string; text?: string; label?: string; isCorrect: boolean; distractorRationale?: string; misconceptionFeedback?: string }[] =
    rawConfig?.options || [];
  const prompt = rawConfig?.prompt || concept.studentTask;
  const explanation = rawConfig?.explanation || concept.scientificSummary;

  const selectedOption = options.find((o) => o.id === selectedOptionId);
  const isCorrect = selectedOption?.isCorrect ?? false;

  const handleSelect = (id: string) => {
    if (isSubmitted && isCorrect) return; // locked once correct
    setSelectedOptionId(id);
    setIsSubmitted(false);
  };

  const handleSubmit = () => {
    if (!selectedOptionId) return;
    setIsSubmitted(true);
    if (isCorrect) {
      onMasteryAchieved?.(concept.id);
    }

    realtimeTelemetry.emitTelemetry({
      widgetId: 'concept_quiz',
      action: 'answer_submitted',
      summary: `Slayt ${concept.slideNumbers.join(', ')} konsept sorusuna ${isCorrect ? 'DOĞRU' : 'HATALI'} yanıt verildi.`,
      metrics: { conceptId: concept.id, isCorrect, slideNumbers: concept.slideNumbers },
      misconceptionAlert: isCorrect
        ? null
        : {
            title: `Kavram Yanılgısı (Slayt ${concept.slideNumbers.join(', ')})`,
            rationale: selectedOption?.distractorRationale || selectedOption?.misconceptionFeedback || 'Seçtiğiniz seçenek slayttaki kimyasal bağ prensiplerine uymamaktadır.',
            suggestedQuestion: `Slayt ${concept.slideNumbers.join(', ')} sorusundaki "${selectedOption?.text || selectedOption?.label}" yanıtımın neden hatalı olduğunu açıklar mısın?`,
            severity: 'medium',
          },
    });
  };

  const handleRevealNextHint = () => {
    if (hintTier < concept.scaffoldingLadder.length) {
      setHintTier((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131B2A] p-4 sm:p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2.5">
        <span className="font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
          <QuestionCircleOutlined className="text-sm" />
          Konsept Kontrolü
        </span>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-slate-200 dark:border-slate-700">
          Slayt {concept.slideNumbers.join(', ')}
        </span>
      </div>

      <p className="font-medium text-sm leading-relaxed text-slate-900 dark:text-slate-100 m-0">
        {prompt}
      </p>

      {/* Options */}
      <div className="flex flex-col gap-2">
        {options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          let btnStyle = 'border-slate-200 dark:border-slate-700/80 hover:border-slate-400 dark:hover:border-slate-500 bg-slate-50/50 dark:bg-slate-800/40';
          if (isSelected) {
            btnStyle = 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200';
          }
          if (isSubmitted) {
            if (opt.isCorrect) {
              btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200';
            } else if (isSelected && !opt.isCorrect) {
              btnStyle = 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200';
            }
          }

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelect(opt.id)}
              className={`w-full text-start p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors flex items-start gap-2.5 ${btnStyle} cursor-pointer`}
            >
              <span className="font-mono text-xs text-gray-500 mt-0.5 shrink-0">
                {isSubmitted && opt.isCorrect ? (
                  <CheckCircleFilled className="text-emerald-600 text-sm inline" />
                ) : isSubmitted && isSelected && !opt.isCorrect ? (
                  <CloseCircleFilled className="text-red-600 text-sm inline" />
                ) : (
                  <span className="inline-block w-4 text-center">•</span>
                )}
              </span>
              <span>{opt.text || opt.label}</span>
            </button>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-2">
          <Button
            type="primary"
            onClick={handleSubmit}
            disabled={!selectedOptionId || (isSubmitted && isCorrect)}
            className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-sm rounded-xl px-5 h-9 font-semibold"
          >
            {isSubmitted && isCorrect ? 'Doğrulandı ✓' : 'Cevabı Onayla'}
          </Button>

          {concept.scaffoldingLadder.length > 0 && hintTier < concept.scaffoldingLadder.length && (
            <Button
              icon={<BulbOutlined />}
              onClick={handleRevealNextHint}
              size="middle"
              className="rounded-xl h-9"
            >
              İpucu İste ({hintTier + 1}/3)
            </Button>
          )}
        </div>

        {onAskTutor && (
          <Button
            type="link"
            size="small"
            icon={<RobotOutlined className="text-blue-500" />}
            onClick={() => onAskTutor(`Bu soruda zorlandım: "${prompt}". Bana Sokratik bir ipucu verir misin?`)}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 p-0 rounded-lg"
          >
            Tutor'a Sor →
          </Button>
        )}
      </div>

      {/* 3-Tier Scaffolding Ladder Progression */}
      {concept.scaffoldingLadder.length > 0 && (
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
          <Steps
            size="small"
            current={hintTier}
            items={[
              { title: 'Sezgi (Nudge)', description: hintTier >= 1 ? 'Açıldı' : 'Kilitli' },
              { title: 'İpucu (Clue)', description: hintTier >= 2 ? 'Açıldı' : 'Kilitli' },
              { title: 'Çözüm İskelesi', description: hintTier >= 3 ? 'Açıldı' : 'Kilitli' },
            ]}
          />
        </div>
      )}

      {/* Scaffolding Hint Ladder display */}
      {hintTier > 0 && (
        <div className="flex flex-col gap-1.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 p-3.5 rounded-xl text-xs">
          <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
            <BulbOutlined className="text-amber-600 text-sm" />
            {hintTier === 1 ? '1. Seviye Sezgi İpucu (Nudge):' : hintTier === 2 ? '2. Seviye Kavram İpucu (Clue):' : '3. Seviye Çözüm İskelesi (Scaffold):'}
          </span>
          <p className="text-amber-950 dark:text-amber-100 font-medium m-0 leading-relaxed">
            {concept.scaffoldingLadder[hintTier - 1]}
          </p>
        </div>
      )}

      {/* Feedback Alert */}
      {isSubmitted && (
        <Alert
          type={isCorrect ? 'success' : 'error'}
          showIcon
          className="rounded-xl"
          message={isCorrect ? 'Tebrikler, Doğru Yanıt!' : 'Kavram Yanılgısı Belirlendi'}
          description={
            <div className="flex flex-col gap-1 text-xs mt-1">
              {!isCorrect && selectedOption && (
                <p className="font-medium text-red-700 dark:text-red-300">
                  {selectedOption.distractorRationale || selectedOption.misconceptionFeedback || 'Seçtiğiniz seçenek slayttaki kimyasal bağ prensiplerine uymamaktadır.'}
                </p>
              )}
              <p className="text-gray-700 dark:text-gray-300">{explanation}</p>
            </div>
          }
        />
      )}
    </div>
  );
};
