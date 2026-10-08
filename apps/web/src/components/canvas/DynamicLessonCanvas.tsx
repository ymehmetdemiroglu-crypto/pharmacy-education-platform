import React, { useState, useMemo, useEffect } from 'react';
import { Tag, Button, Progress } from 'antd';
import {
  ExperimentOutlined,
  BookOutlined,
  RobotOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  BulbOutlined,
  InfoCircleOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { allClientLessons } from '../../data/curriculum.client';
import { realtimeTelemetry } from '../../services/realtimeTelemetryService';
import type { LessonData, LessonStep } from '@pharmacy/platform';
import {
  ThermodynamicActivityFergusonSlider,
  thermodynamicActivityFergusonStandardDemo,
  IonizationEquilibriumSlider,
  ionizationEquilibriumStandardDemo,
  SarExplorer,
  sarExplorerStandardDemo,
  ReceptorLigandMatcher,
  receptorLigandMatcherStandardDemo,
  StructureIdentifier,
  structureIdentifierStandardDemo,
  MetabolismMap,
  metabolismMapStandardDemo,
  DoseResponseCurve,
  doseResponseCurveStandardDemo,
  PkSimulator,
  pkSimulatorStandardDemo,
  MembranePartitionSimulator,
  membranePartitionStandardDemo,
  IonizationChamber,
  EassonStedmanStage,
  ReceptorOperationalModel,
  PkCockpit,
  ClinicalOrderVerification,
} from '@pharmacy/widgets';

interface DynamicLessonCanvasProps {
  lessonId: string;
  onAskTutor: (prompt: string) => void;
}

function getLocalizedStr(val: any, fallback = ''): string {
  if (!val) return fallback;
  if (typeof val === 'string') return val;
  if (typeof val === 'object') return val.tr || val.en || val.ar || fallback;
  return String(val);
}

const STAGE_LABELS: Record<string, { title: string; num: number }> = {
  hook: { title: 'Klinik Vaka', num: 1 },
  question: { title: 'Tahmin & Hipotez', num: 2 },
  intuition: { title: 'Fiziksel Sezgi', num: 3 },
  visual_explanation: { title: 'Görsel Mekanizma', num: 4 },
  interactive_artifact: { title: 'İnteraktif Simülatör', num: 5 },
  guided_discovery: { title: 'Rehberli Keşif', num: 6 },
  formal_explanation: { title: 'Bilimsel Formülasyon', num: 7 },
  concept_check: { title: 'Kavram Denetimi', num: 8 },
  application: { title: 'Klinik Uygulama', num: 9 },
  retrieval: { title: 'Aktif Hatırlama', num: 10 },
  connection: { title: 'İleri Bağlantı', num: 11 },
  mastery_check: { title: 'Ustalık Sınavı', num: 12 },
};

function renderWidget(widgetType: string | undefined, config: any) {
  const mergedConfig = { ...config };
  switch (widgetType) {
    case 'ThermodynamicActivityFergusonSlider':
      return <ThermodynamicActivityFergusonSlider config={{ ...thermodynamicActivityFergusonStandardDemo, ...mergedConfig }} locale="tr" />;
    case 'IonizationEquilibriumSlider':
      return <IonizationEquilibriumSlider config={{ ...ionizationEquilibriumStandardDemo, ...mergedConfig }} locale="tr" />;
    case 'SarExplorer':
      return <SarExplorer config={{ ...sarExplorerStandardDemo, ...mergedConfig }} locale="tr" />;
    case 'ReceptorLigandMatcher':
      return <ReceptorLigandMatcher config={{ ...receptorLigandMatcherStandardDemo, ...mergedConfig }} locale="tr" />;
    case 'StructureIdentifier':
      return <StructureIdentifier config={{ ...structureIdentifierStandardDemo, ...mergedConfig }} locale="tr" />;
    case 'MetabolismMap':
      return <MetabolismMap config={{ ...metabolismMapStandardDemo, ...mergedConfig }} locale="tr" />;
    case 'DoseResponseCurve':
      return <DoseResponseCurve config={{ ...doseResponseCurveStandardDemo, ...mergedConfig }} locale="tr" />;
    case 'PkSimulator':
      return <PkSimulator config={{ ...pkSimulatorStandardDemo, ...mergedConfig }} locale="tr" />;
    case 'MembranePartitionSimulator':
      return <MembranePartitionSimulator config={{ ...membranePartitionStandardDemo, ...mergedConfig }} locale="tr" />;
    case 'IonizationChamber':
      return <IonizationChamber config={mergedConfig} locale="tr" />;
    case 'EassonStedmanStage':
      return <EassonStedmanStage config={mergedConfig} locale="tr" />;
    case 'ReceptorOperationalModel':
      return <ReceptorOperationalModel config={mergedConfig} locale="tr" />;
    case 'PkCockpit':
      return <PkCockpit config={mergedConfig} locale="tr" />;
    case 'ClinicalOrderVerification':
      return <ClinicalOrderVerification config={mergedConfig} locale="tr" />;
    default:
      return null;
  }
}

export const DynamicLessonCanvas: React.FC<DynamicLessonCanvasProps> = ({ lessonId, onAskTutor }) => {
  const lesson: LessonData = useMemo(() => {
    return allClientLessons[lessonId] || allClientLessons['mc-mod1-les1'] || ({} as LessonData);
  }, [lessonId]);

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [openHintLevel, setOpenHintLevel] = useState<number>(0);

  // Reset interactions when changing lesson
  useEffect(() => {
    setCurrentStepIndex(0);
    setSelectedOptionId(null);
    setIsRevealed(false);
    setOpenHintLevel(0);
  }, [lessonId]);

  // Reset interactions when changing step
  const handleStepChange = (index: number) => {
    setCurrentStepIndex(index);
    setSelectedOptionId(null);
    setIsRevealed(false);
    setOpenHintLevel(0);
  };

  const currentStep: LessonStep | undefined = lesson.steps?.[currentStepIndex];
  const stageMeta = currentStep
    ? STAGE_LABELS[currentStep.stage || 'hook'] || { title: currentStep.stage || 'Aşama', num: currentStepIndex + 1 }
    : { title: '', num: 1 };
  const totalSteps = lesson.steps?.length || 12;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  // Extract quiz options if present
  const quizOptions = useMemo(() => {
    if (!currentStep) return [];
    const check = (currentStep as any).conceptCheck || currentStep.config;
    if (check && Array.isArray(check.options)) {
      return check.options;
    }
    return [];
  }, [currentStep]);

  // Telemetry on step view & quiz answer
  useEffect(() => {
    if (!currentStep) return;
    realtimeTelemetry.emitTelemetry({
      widgetId: 'concept_quiz',
      action: 'step_viewed',
      summary: `Ders: ${getLocalizedStr(lesson.title, lessonId)} • Adım ${currentStepIndex + 1}: ${stageMeta.title}`,
      metrics: {
        lessonId,
        stepIndex: currentStepIndex,
        stage: currentStep.stage,
      },
    });
  }, [lessonId, currentStepIndex, lesson, currentStep, stageMeta.title]);

  const handleSelectOption = (optId: string) => {
    setSelectedOptionId(optId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOptionId || !currentStep) return;
    setIsRevealed(true);
    const selectedOpt = quizOptions.find((o: any) => o.id === selectedOptionId);
    const isCorrect = selectedOpt ? selectedOpt.isCorrect : false;

    realtimeTelemetry.emitTelemetry({
      widgetId: 'concept_quiz',
      action: 'answer_submitted',
      summary: `Cevap: ${isCorrect ? 'DOĞRU' : 'YANLIŞ'} • Seçim: ${selectedOptionId}`,
      metrics: {
        isCorrect,
        optionId: selectedOptionId,
        stepIndex: currentStepIndex,
      },
      misconceptionAlert: !isCorrect && selectedOpt?.misconceptionFeedback
        ? {
            title: 'Kavram Yanılgısı Teşhis Edildi',
            rationale: typeof selectedOpt.misconceptionFeedback === 'string' ? selectedOpt.misconceptionFeedback : selectedOpt.misconceptionFeedback.tr,
            suggestedQuestion: `Bu soruda yanlış seçeneği işaretledim. ${selectedOpt.text?.tr || ''} şıkkının neden hatalı olduğunu ve doğru yaklaşımı açıklar mısın?`,
            severity: 'medium',
          }
        : null,
    });
  };

  if (!lesson || !currentStep) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-slate-500">
        Ders verisi yükleniyor...
      </div>
    );
  }

  const isCourseMedChem = lesson.courseId === 'medchem';

  return (
    <div className="relative flex-1 h-full overflow-y-auto bg-slate-50 dark:bg-[#212121] p-4 sm:p-8 transition-colors">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Lesson Header Card */}
        <article className="bg-white dark:bg-[#171717] rounded-2xl border border-slate-200 dark:border-[#2F2F2F] p-5 sm:p-7 shadow-xs transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3 border-b border-slate-200 dark:border-[#2F2F2F] pb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-lg font-semibold border ${
                isCourseMedChem
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border-blue-200 dark:border-blue-900/60'
                  : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-900/60'
              }`}>
                {isCourseMedChem ? <ExperimentOutlined className="mr-1" /> : <BookOutlined className="mr-1" />}
                {isCourseMedChem ? 'Farmasötik Kimya' : 'Farmakoloji'}
              </span>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 dark:bg-[#2A2A2A] dark:text-[#B4B4B4] border border-slate-200 dark:border-[#2F2F2F]">
                Ders {lesson.order}
              </span>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60">
                12 Aşamalı Ustalık Döngüsü
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">İlerleme: %{progressPercent}</span>
              <div className="w-24">
                <Progress percent={progressPercent} size="small" showInfo={false} strokeColor="#10A37F" />
              </div>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-[#ECECEC] m-0 mb-2">
            {getLocalizedStr(lesson.title, lessonId)}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-[#B4B4B4] m-0 leading-relaxed">
            {getLocalizedStr(lesson.objective)}
          </p>
        </article>

        {/* 12-Stage Mastery Step Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2 px-1">
          {lesson.steps.map((st, idx) => {
            const isCurrent = idx === currentStepIndex;
            const meta = STAGE_LABELS[st.stage || 'hook'] || { title: st.stage || 'Aşama', num: idx + 1 };
            return (
              <button
                key={st.id || idx}
                onClick={() => handleStepChange(idx)}
                className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-[#10A37F] text-white shadow-xs font-semibold'
                    : 'bg-white dark:bg-[#171717] text-slate-700 dark:text-[#CCCCCC] border border-slate-200 dark:border-[#2F2F2F] hover:border-slate-400'
                }`}
              >
                <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                  isCurrent ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-[#2A2A2A] text-slate-500'
                }`}>
                  {idx + 1}
                </span>
                <span>{meta.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main Step Interaction Canvas */}
        <article className="bg-white dark:bg-[#171717] rounded-2xl border border-slate-200 dark:border-[#2F2F2F] p-6 sm:p-8 shadow-xs transition-colors flex flex-col gap-6">
          {/* Step Stage Pill & Title */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#10A37F]">
                Aşama {currentStepIndex + 1} / {totalSteps} • {stageMeta.title}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-[#ECECEC] m-0 mb-3">
              {getLocalizedStr(currentStep.title)}
            </h2>
            <div className="text-sm sm:text-base text-slate-700 dark:text-[#D1D5DB] leading-relaxed bg-slate-50 dark:bg-[#212121] p-4 rounded-xl border border-slate-200 dark:border-[#2F2F2F]">
              {getLocalizedStr(currentStep.prompt)}
            </div>
          </div>

          {/* Interactive Widget if configured */}
          {(currentStep.widgetType || currentStep.widget?.type) && (
            <div className="border border-slate-200 dark:border-[#2F2F2F] rounded-xl p-4 bg-slate-50/50 dark:bg-[#1A1A1A]">
              {renderWidget(
                currentStep.widgetType || currentStep.widget?.type,
                currentStep.widget?.config || currentStep.config
              )}
            </div>
          )}

          {/* Predict-Then-Reveal / Multiple Choice Quiz Section */}
          {quizOptions.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#8E8E8E] m-0">
                Hipotezinizi Seçin ve Test Edin:
              </h3>
              <div className="flex flex-col gap-2">
                {quizOptions.map((opt: any) => {
                  const isSelected = selectedOptionId === opt.id;
                  const optText = opt.text?.tr || (typeof opt.text === 'string' ? opt.text : opt.id);
                  let stateStyle = 'bg-white dark:bg-[#171717] border-slate-200 dark:border-[#2F2F2F] text-slate-800 dark:text-[#ECECEC] hover:border-slate-400';

                  if (isRevealed) {
                    if (opt.isCorrect) {
                      stateStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold';
                    } else if (isSelected) {
                      stateStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200';
                    }
                  } else if (isSelected) {
                    stateStyle = 'bg-emerald-50 dark:bg-emerald-950/30 border-[#10A37F] text-slate-900 dark:text-white font-medium ring-1 ring-[#10A37F]';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => !isRevealed && handleSelectOption(opt.id)}
                      disabled={isRevealed}
                      className={`text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${stateStyle}`}
                    >
                      <span className="font-mono text-xs font-bold mt-0.5 shrink-0 opacity-60">
                        {opt.id.split('-').pop()?.toUpperCase()}
                      </span>
                      <span className="flex-1 leading-snug">{optText}</span>
                      {isRevealed && opt.isCorrect && (
                        <CheckCircleFilled className="text-emerald-500 text-base shrink-0 mt-0.5" />
                      )}
                      {isRevealed && isSelected && !opt.isCorrect && (
                        <CloseCircleFilled className="text-rose-500 text-base shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Reveal / Check Button */}
              {!isRevealed ? (
                <Button
                  type="primary"
                  size="large"
                  disabled={!selectedOptionId}
                  onClick={handleCheckAnswer}
                  className="bg-[#10A37F] hover:bg-[#0E8C6D] text-white font-semibold rounded-xl h-11 border-0 shadow-xs mt-2"
                >
                  Cevabı Kontrol Et & Doğrula
                </Button>
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#212121] border border-slate-200 dark:border-[#2F2F2F] text-xs sm:text-sm mt-2 flex flex-col gap-2 animate-fadeIn">
                  <div className="font-bold flex items-center gap-1.5 text-slate-900 dark:text-[#ECECEC]">
                    {quizOptions.find((o: any) => o.id === selectedOptionId)?.isCorrect ? (
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircleFilled /> Tebrikler, Doğru Çözüm!
                      </span>
                    ) : (
                      <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                        <CloseCircleFilled /> Yanılgı Analizi & Geri Bildirim:
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 dark:text-[#B4B4B4] m-0 leading-relaxed">
                    {(() => {
                      const sel = quizOptions.find((o: any) => o.id === selectedOptionId);
                      if (!sel) return '';
                      const fb = sel.misconceptionFeedback;
                      if (!fb) return 'Mekanizmayı inceleyiniz.';
                      return typeof fb === 'string' ? fb : fb.tr;
                    })()}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 3-Tier Scaffolded Hint Ladder */}
          {Array.isArray(currentStep.hints) && currentStep.hints.length > 0 && (
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 dark:border-[#262626]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-[#8E8E8E] flex items-center gap-1">
                  <BulbOutlined className="text-amber-500" /> Kademeli Sokratik İpuçları
                </span>
                <span className="text-[11px] text-slate-400">
                  {openHintLevel} / {currentStep.hints.length} İpucu Açık
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                {currentStep.hints.map((hint: any, hIdx: number) => {
                  const isUnlocked = hIdx < openHintLevel;
                  const hintText = typeof hint === 'string' ? hint : hint.tr || hint.en;
                  const tierLabel = hIdx === 0 ? 'İpucu 1: Yönlendirme (Nudge)' : hIdx === 1 ? 'İpucu 2: Mekanizma İpucu (Clue)' : 'İpucu 3: Tam Çözüm (Solution)';

                  if (!isUnlocked) {
                    if (hIdx === openHintLevel) {
                      return (
                        <Button
                          key={hIdx}
                          onClick={() => setOpenHintLevel(openHintLevel + 1)}
                          className="text-left text-xs rounded-xl h-9 border-dashed border-amber-300 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 flex items-center gap-2"
                        >
                          <BulbOutlined /> {tierLabel} Aç
                        </Button>
                      );
                    }
                    return null;
                  }

                  return (
                    <div
                      key={hIdx}
                      className="p-3 bg-amber-50/80 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 leading-relaxed"
                    >
                      <strong className="block mb-0.5 text-amber-700 dark:text-amber-400">{tierLabel}</strong>
                      {hintText}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step Actions: Ask Tutor & Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-[#2F2F2F]">
            <Button
              type="default"
              icon={<RobotOutlined className="text-[#10A37F]" />}
              onClick={() =>
                onAskTutor(
                  `Ders: "${getLocalizedStr(lesson.title, lessonId)}", Aşama: "${stageMeta.title}". Adım sorusu: "${getLocalizedStr(currentStep.prompt)}". Bu konseptin farmasötik mekanizmasını açıklar mısın?`
                )
              }
              className="rounded-xl text-xs font-semibold h-10 px-4 bg-slate-50 dark:bg-[#212121] border-slate-200 dark:border-[#2F2F2F] text-slate-800 dark:text-[#ECECEC] hover:border-[#10A37F]"
            >
              Bu Adımı AI Tutor'a Sor
            </Button>

            <div className="flex items-center gap-2">
              <Button
                disabled={currentStepIndex === 0}
                onClick={() => handleStepChange(currentStepIndex - 1)}
                icon={<ArrowLeftOutlined />}
                className="rounded-xl text-xs h-10 px-3"
              >
                Önceki Adım
              </Button>

              <Button
                type="primary"
                disabled={currentStepIndex === totalSteps - 1}
                onClick={() => handleStepChange(currentStepIndex + 1)}
                icon={<ArrowRightOutlined />}
                className="rounded-xl text-xs font-semibold h-10 px-4 bg-[#10A37F] hover:bg-[#0E8C6D] border-0"
              >
                Sonraki Adım
              </Button>
            </div>
          </div>
        </article>

        {/* Source Attribution Footer */}
        {Array.isArray(currentStep.sources) && currentStep.sources.length > 0 && (
          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-[#8E8E8E] px-2">
            <SafetyCertificateOutlined className="text-[#10A37F]" />
            <span>Bilimsel Kaynak Doğrulaması:</span>
            {currentStep.sources.map((s, idx) => (
              <span key={idx} className="font-mono bg-white dark:bg-[#171717] px-2 py-0.5 rounded border border-slate-200 dark:border-[#2F2F2F]">
                {s.file} (Slayt {s.page})
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
