import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Card,
  Button,
  StickerBadge,
  ProgressBar,
  StepDots,
  HintDrawer,
  PaywallModal,
  useTheme,
} from '@pharmacy/ui';
import {
  useAuth,
  hasCourseAccess,
  completeLesson,
  updateStepProgress,
  loadLocalProgress,
  saveLocalProgress,
  loadLocalReviewCards,
  saveLocalReviewCards,
  enqueueReviewCards,
  type LessonStep,
  type LessonData,
  type StepCitation,
  type SpacedReviewCardSeed,
  type UserProgress,
} from '@pharmacy/platform';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Lock,
  ArrowRight,
  Flame,
  Award,
  BookOpen,
  Info,
  Check,
} from 'lucide-react';
import { lessonsMap, lesson01 } from '../data/lessons';

export const LessonPage: React.FC = () => {
  const { lessonId = '1' } = useParams<{ lessonId: string }>();
  const { locale } = useTheme();
  const { user, entitlements, startTrial } = useAuth();

  const lesson: LessonData = (lessonId && lessonsMap[lessonId]) ? lessonsMap[lessonId]! : lesson01;
  const lessonTitle = (locale !== 'en' && lesson.translations?.[locale]?.title) || lesson.title;
  const isFreePreviewLesson = lessonId === '1' || lessonId === '2' || lessonId === 'mc-mod1-les1' || lessonId === 'mc-mod1-les2';

  // Check course access
  const hasAccess = hasCourseAccess(user, entitlements, 'medchem', {
    isFreePreview: isFreePreviewLesson,
  });

  const isPremiumOrTrial =
    user?.plan === 'trial' ||
    user?.plan === 'premium' ||
    entitlements.some(
      (e) => (e.courseId === 'medchem' || e.courseId === 'dual_bundle') && e.status === 'active'
    );

  // Local progress & review cards state
  const [progress, setProgress] = useState(() => loadLocalProgress('medchem'));
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepInteractions, setStepInteractions] = useState<
    Record<number, { selectedId?: string; isRevealed?: boolean; isCorrect?: boolean }>
  >({});
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);

  // If user tries to access locked lesson 3+, open paywall
  useEffect(() => {
    if (!hasAccess && !isFreePreviewLesson) {
      setIsPaywallOpen(true);
    }
  }, [hasAccess, isFreePreviewLesson]);

  // Load saved step index from progress if valid
  useEffect(() => {
    const savedProgress = loadLocalProgress('medchem');
    setProgress(savedProgress);
    if (
      savedProgress &&
      savedProgress.currentLessonId === lesson.id &&
      typeof savedProgress.currentStepIndex === 'number' &&
      savedProgress.currentStepIndex > 0
    ) {
      setCurrentStepIndex(Math.min(savedProgress.currentStepIndex, (lesson.steps?.length || 10) - 1));
    }
  }, [lessonId, lesson]);

  const currentStep: LessonStep | undefined = lesson?.steps[currentStepIndex];
  const isPredictStep = Boolean(currentStep?.predictThenReveal);
  const totalSteps = lesson?.steps.length || 10;
  const currentInteraction = stepInteractions[currentStepIndex] || {};

  // Step completion logic
  const handleSelectOption = (optionId: string, _isCorrect?: boolean) => {
    setStepInteractions((prev) => ({
      ...prev,
      [currentStepIndex]: {
        ...prev[currentStepIndex],
        selectedId: optionId,
        isRevealed: false,
        isCorrect: false,
      },
    }));
  };

  const handleRevealPrediction = () => {
    const selected = currentInteraction.selectedId;
    if (!selected || !currentStep) return;

    let isCorrect = false;
    const options = currentStep.config.options as Array<{ id: string; isCorrect: boolean }> | undefined;
    if (options) {
      const match = options.find((o) => o.id === selected);
      isCorrect = match ? match.isCorrect : false;
    }

    setStepInteractions((prev) => ({
      ...prev,
      [currentStepIndex]: {
        ...prev[currentStepIndex],
        isRevealed: true,
        isCorrect,
      },
    }));
  };

  const handleCompleteLesson = useCallback(() => {
    if (!lessonCompleted) {
      const updatedProgress = completeLesson(progress, lesson.id, new Date());
      setProgress(updatedProgress);
      saveLocalProgress(updatedProgress);

      const existingCards = loadLocalReviewCards('medchem');
      const updatedCards = enqueueReviewCards(existingCards, lesson.spacedReviewCards, new Date());
      saveLocalReviewCards('medchem', updatedCards);

      setLessonCompleted(true);
    }
  }, [lessonCompleted, progress, lesson]);

  const persistStepProgress = useCallback(
    (stepIdx: number) => {
      setProgress((prev) => {
        const base: UserProgress = prev || {
          courseId: 'medchem',
          completedLessonIds: [],
          currentModuleId: 'mc-mod-01',
          currentLessonId: lesson.id,
          currentStepIndex: stepIdx,
          streakDays: 0,
          lastStreakDate: '',
          totalXP: 0,
          accuracyRate: 100,
        };
        const updated = updateStepProgress(base, lesson.id, stepIdx);
        saveLocalProgress(updated);
        return updated;
      });
    },
    [lesson.id]
  );

  const handleNextStep = useCallback(() => {
    if (currentStepIndex < totalSteps - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      persistStepProgress(nextIdx);
      window.scrollTo(0, 0);
    } else {
      handleCompleteLesson();
    }
  }, [currentStepIndex, totalSteps, handleCompleteLesson, persistStepProgress]);

  // Persist completion and enqueue cards as soon as user arrives at Step 10 Recap
  useEffect(() => {
    if (currentStepIndex === totalSteps - 1) {
      handleCompleteLesson();
    }
  }, [currentStepIndex, totalSteps, handleCompleteLesson]);

  const handlePrevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      persistStepProgress(prevIdx);
      window.scrollTo(0, 0);
    }
  }, [currentStepIndex, persistStepProgress]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if modal is open or typing in an input or navigating a radio group
      if (
        isPaywallOpen ||
        ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName) ||
        (e.target as HTMLElement)?.getAttribute('role') === 'radio'
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        const canAdvance =
          !currentStep?.predictThenReveal ||
          currentInteraction.isRevealed ||
          currentStepIndex === 0 ||
          currentStepIndex === totalSteps - 1;
        if (canAdvance) {
          handleNextStep();
        }
      } else if (e.key === 'ArrowLeft') {
        handlePrevStep();
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        const options = currentStep?.config.options as Array<{ id: string; isCorrect: boolean }> | undefined;
        if (options && options[idx] && !currentInteraction.isRevealed) {
          handleSelectOption(options[idx]!.id, options[idx]!.isCorrect);
        }
      } else if (e.key === 'Enter') {
        if (currentInteraction.selectedId && !currentInteraction.isRevealed) {
          handleRevealPrediction();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isPaywallOpen,
    currentStep,
    currentInteraction,
    currentStepIndex,
    totalSteps,
    handleNextStep,
    handlePrevStep,
    handleRevealPrediction,
  ]);

  const handleStartTrialClick = async () => {
    const success = await startTrial();
    if (success) {
      setIsPaywallOpen(false);
    }
  };

  // Locked lesson paywall screen
  if (!hasAccess && !isFreePreviewLesson) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <Card variant="default" elevated className="max-w-xl w-full p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-[#FF6B9D] border-3 border-black mx-auto flex items-center justify-center shadow-neo">
            <Lock className="w-8 h-8 text-black" />
          </div>

          <div className="space-y-2">
            <StickerBadge variant="pink" size="md">
              Premium Lesson (Locked)
            </StickerBadge>
            <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight">
              Unlock Lesson 3: The Partition Coefficient
            </h1>
            <p className="font-body text-sm text-gray-700 dark:text-gray-300">
              Lessons 1 & 2 of every module are free forever. To continue through advanced
              structure-activity relationships and complete exam prep, activate your 7-day free trial or select an academic pass.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={handleStartTrialClick}
              leftIcon={<Sparkles className="w-5 h-5" />}
            >
              Start 7-Day Free Trial
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setIsPaywallOpen(true)}
            >
              View Student Passes
            </Button>
          </div>

          <div className="pt-4 border-t-2 border-black/10 dark:border-white/10 text-xs font-mono text-gray-600 dark:text-gray-400">
            <Link to="/courses/medchem/lessons/1" className="underline hover:text-black dark:hover:text-white font-bold">
              ← Return to Free Lesson 1
            </Link>
          </div>

          <PaywallModal
            isOpen={isPaywallOpen}
            onClose={() => setIsPaywallOpen(false)}
            onStartTrial={handleStartTrialClick}
          />
        </Card>
      </div>
    );
  }

  if (!currentStep) {
    return <div>Loading step...</div>;
  }

  const options = (currentStep.config.options as Array<{
    id: string;
    label?: string;
    text?: string;
    isCorrect: boolean;
    misconceptionFeedback?: string;
    distractorRationale?: string;
  }>) || [];

  const selectedOpt = options.find((o) => o.id === currentInteraction.selectedId);
  const hasOptions = options.length > 0;
  const canProceed =
    (!hasOptions && !isPredictStep) ||
    currentInteraction.isRevealed ||
    currentStepIndex === 0 ||
    currentStepIndex === totalSteps - 1;

  const t = {
    catalog: locale === 'tr' ? 'Katalog' : locale === 'ar' ? 'المقررات' : 'Catalog',
    freeForever: locale === 'tr' ? 'Sürekli Ücretsiz' : locale === 'ar' ? 'مجاني دائماً' : 'Free Forever',
    dayStreak: locale === 'tr' ? 'Günlük Seri' : locale === 'ar' ? 'أيام متتالية' : 'Day Streak',
    step: locale === 'tr' ? 'Adım' : locale === 'ar' ? 'الخطوة' : 'Step',
    of: locale === 'tr' ? '/' : locale === 'ar' ? 'من' : 'of',
    complete: locale === 'tr' ? 'Tamamlandı' : locale === 'ar' ? 'مكتمل' : 'Complete',
    predictThenReveal: locale === 'tr' ? 'Tahmin Et ve Gör' : locale === 'ar' ? 'توقع ثم اكتشف' : 'Predict-Then-Reveal',
    lessonRecap: locale === 'tr' ? 'Ders Özeti ve Tekrar' : locale === 'ar' ? 'ملخص الدرس والمراجعة' : 'Lesson Recap & Flashcards',
    conceptVignette: locale === 'tr' ? 'Kavram Girişi' : locale === 'ar' ? 'مدخل المفهوم' : 'Concept Vignette',
    choosePrediction: locale === 'tr' ? 'Tahmin hipotezinizi seçin:' : locale === 'ar' ? 'اختر فرضيتك التوقعية:' : 'Choose your prediction hypothesis:',
    selectConclusion: locale === 'tr' ? 'En doğru sonucu seçin:' : locale === 'ar' ? 'اختر النتيجة الأكثر دقة:' : 'Select the most accurate conclusion:',
    commitHypothesis: locale === 'tr' ? 'Hipotezi Onayla ve Sonucu Gör' : locale === 'ar' ? 'تأكيد الفرضية وكشف النتيجة' : 'Commit Hypothesis & Reveal Outcome',
    checkAnswer: locale === 'tr' ? 'Cevabı Kontrol Et' : locale === 'ar' ? 'تحقق من الإجابة' : 'Check Answer',
    previous: locale === 'tr' ? 'Önceki' : locale === 'ar' ? 'السابق' : 'Previous',
    continueToStep: (n: number) =>
      locale === 'tr' ? `Adım ${n}'e Devam Et` : locale === 'ar' ? `المتابعة إلى الخطوة ${n}` : `Continue to Step ${n}`,
    completeAndReturn: locale === 'tr' ? 'Dersi Tamamla ve Kataloğa Dön' : locale === 'ar' ? 'إكمال الدرس والعودة إلى المقررات' : 'Complete & Return to Catalog',
    academicSources: locale === 'tr' ? 'Akademik Kaynaklar ve Ders Kitabı Doğrulaması' : locale === 'ar' ? 'المصادر الأكاديمية والتحقق من المراجع' : 'Academic Sources & Textbook Verification',
    hideSources: locale === 'tr' ? 'Kaynakları Gizle' : locale === 'ar' ? 'إخفاء المصادر' : 'Hide Sources',
    viewCitations: locale === 'tr' ? 'Akademik Alıntıları Görüntüle' : locale === 'ar' ? 'عرض الاستشهادات الأكاديمية' : 'View Academic Citations',
    lessonMastered: locale === 'tr' ? 'Ders 1 Başarıyla Tamamlandı!' : locale === 'ar' ? 'تم إتقان الدرس 1 بنجاح!' : 'Lesson 1 Mastered!',
    recapSubtitle: locale === 'tr' ? '+50 XP Kazanıldı • Günlük Seri Korundu • 1. Kutuya 3 Tekrar Kartı Eklendi' : locale === 'ar' ? '+50 نقطة خبرة • الحفاظ على الأيام المتتالية • أضيفت 3 بطاقات إلى الصندوق 1' : '+50 XP Earned • Daily Streak Maintained • 3 Review Cards Added to Box 1',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28 md:pb-6 space-y-6 scroll-pt-20">
      {/* Top Header / Context Bar */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-3 border-black dark:border-white pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              to="/catalog"
              className="text-xs font-mono font-bold uppercase underline hover:text-blue-600 flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-180" /> {t.catalog}
            </Link>
            <span className="text-gray-400">•</span>
            <StickerBadge variant="blue" size="sm">
              MedChem • Mod 01
            </StickerBadge>
            <StickerBadge variant="green" size="sm">
              {t.freeForever}
            </StickerBadge>
          </div>
          <h1 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight">
            {lessonTitle}
          </h1>
        </div>

        {/* Stats: Streak & XP */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF8E7] dark:bg-[#202020] border-2 border-black dark:border-white shadow-[2px_2px_0px_#000000]">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span className="font-bold">{progress.streakDays} {t.dayStreak}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFD93D] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
            <Award className="w-4 h-4" />
            <span className="font-bold">{progress.totalXP} XP</span>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
          <span>
            {t.step} {currentStepIndex + 1} {t.of} {totalSteps}
          </span>
          <span>{Math.round(((currentStepIndex + 1) / totalSteps) * 100)}% {t.complete}</span>
        </div>
        <ProgressBar
          value={((currentStepIndex + 1) / totalSteps) * 100}
          size="md"
          variant="blue"
        />
        <div className="pt-1 flex items-center justify-start sm:justify-center overflow-x-auto py-1 scrollbar-none max-w-full px-1">
          <StepDots
            totalSteps={totalSteps}
            currentStepIndex={currentStepIndex}
            completedStepIndices={Object.keys(stepInteractions)
              .filter((k) => stepInteractions[Number(k)]?.isRevealed)
              .map(Number)}
            onSelectStep={(idx: number) => {
              if (idx <= currentStepIndex || stepInteractions[idx]?.isRevealed) {
                setCurrentStepIndex(idx);
                persistStepProgress(idx);
              }
            }}
          />
        </div>
      </div>

      {/* Main Interactive Step Card */}
      <article className="space-y-6">
      <Card
        variant="default"
        elevated
        className="p-6 sm:p-8 space-y-6 border-3 border-black dark:border-white shadow-neo transition-all duration-200"
      >
        {/* Step Badge & Title */}
        <div className="space-y-2 border-b-2 border-black/15 dark:border-white/15 pb-4">
          <div className="flex items-center justify-between">
            <StickerBadge
              variant={isPredictStep ? 'yellow' : currentStepIndex === totalSteps - 1 ? 'green' : 'blue'}
              size="sm"
            >
              {isPredictStep
                ? t.predictThenReveal
                : currentStepIndex === totalSteps - 1
                ? t.lessonRecap
                : t.conceptVignette}
            </StickerBadge>
            <span className="text-[11px] font-mono text-gray-600 dark:text-gray-400">
              ID: {currentStep.id}
            </span>
          </div>

          <h2 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-black dark:text-white">
            {currentStep.title}
          </h2>

          {/* Strict 40-word prompt */}
          <p
            className="font-body text-base sm:text-lg font-semibold text-black dark:text-white leading-relaxed"
            dir={locale === 'ar' ? 'ltr' : undefined}
          >
            {currentStep.prompt}
          </p>
        </div>

        {/* STEP-SPECIFIC WIDGET BODIES */}

        {/* Step 1: Hook Comparison Vignette */}
        {currentStepIndex === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2" dir={locale === 'ar' ? 'ltr' : undefined}>
            <div className="p-4 bg-[#FFFDF7] dark:bg-[#1C1C1C] border-2 border-black dark:border-white shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#FFFFFF] space-y-2 text-left">
              <span className="text-xs font-mono font-bold uppercase text-blue-700 dark:text-blue-400">
                Agent A: Diethyl Ether (Anesthetic)
              </span>
              <div className="text-xs font-mono space-y-1">
                <p><strong>Clinical Dose:</strong> ~20–50 grams (high molar concentration in blood)</p>
                <p><strong>Target:</strong> Membrane lipids / physical disorder</p>
                <p><strong>Thermodynamic Activity:</strong> <span className="font-bold text-amber-700 dark:text-amber-300">a ≈ 0.03–0.05 (High Saturation)</span></p>
              </div>
            </div>

            <div className="p-4 bg-[#FFFDF7] dark:bg-[#1C1C1C] border-2 border-black dark:border-white shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#FFFFFF] space-y-2 text-left">
              <span className="text-xs font-mono font-bold uppercase text-emerald-700 dark:text-emerald-400">
                Agent B: Propranolol (Beta-Blocker)
              </span>
              <div className="text-xs font-mono space-y-1">
                <p><strong>Clinical Dose:</strong> 10–40 milligrams (nanomolar concentration)</p>
                <p><strong>Target:</strong> Stereoselective β1/β2 receptor pocket</p>
                <p><strong>Thermodynamic Activity:</strong> <span className="font-bold text-emerald-700 dark:text-emerald-300">a &lt; 0.0001 (Extreme Dilution)</span></p>
              </div>
            </div>
          </div>
        )}

        {/* Predict / MCQ Options Steps (Steps 2-9) */}
        {options.length > 0 && (
          <div className="space-y-3 pt-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              {isPredictStep && !currentInteraction.isRevealed
                ? t.choosePrediction
                : t.selectConclusion}
            </span>

            <div role="radiogroup" aria-label="Step options" className="grid grid-cols-1 gap-2.5">
              {options.map((opt, idx) => {
                const isSelected = currentInteraction.selectedId === opt.id;
                const optText = opt.label || opt.text || '';
                const isRevealed = Boolean(currentInteraction.isRevealed);
                const tabIndex = isSelected || (!currentInteraction.selectedId && idx === 0) ? 0 : -1;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={tabIndex}
                    disabled={isRevealed}
                    onClick={() => handleSelectOption(opt.id, opt.isCorrect)}
                    onKeyDown={(e) => {
                      if (isRevealed) return;
                      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                        e.preventDefault();
                        e.stopPropagation();
                        const nextIdx = (idx + 1) % options.length;
                        handleSelectOption(options[nextIdx]!.id, options[nextIdx]!.isCorrect);
                        (e.currentTarget.parentElement?.children[nextIdx] as HTMLElement)?.focus();
                      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                        e.preventDefault();
                        e.stopPropagation();
                        const prevIdx = (idx - 1 + options.length) % options.length;
                        handleSelectOption(options[prevIdx]!.id, options[prevIdx]!.isCorrect);
                        (e.currentTarget.parentElement?.children[prevIdx] as HTMLElement)?.focus();
                      }
                    }}
                    className={`w-full text-left p-3.5 border-3 border-black dark:border-white rounded-none font-body text-sm sm:text-base transition-all duration-150 flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#FFD93D] text-black shadow-neo-sm font-bold translate-x-1 ring-2 ring-black'
                        : 'bg-white dark:bg-[#202020] text-black dark:text-white hover:bg-gray-50 dark:hover:bg-[#282828]'
                    } ${isRevealed ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 border-2 border-black dark:border-white flex items-center justify-center font-mono text-xs font-bold shrink-0 bg-white text-black">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span dir={locale === 'ar' ? 'ltr' : undefined}>{optText}</span>
                    </div>
                    {isSelected && (
                      <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 bg-black text-white ml-2 shrink-0">
                        {locale === 'tr' ? 'Seçildi' : locale === 'ar' ? 'محدد' : 'Selected'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Lock-In / Reveal Button */}
            {!currentInteraction.isRevealed && (
              <div className="pt-3">
                <Button
                  variant="primary"
                  size="md"
                  disabled={!currentInteraction.selectedId}
                  onClick={handleRevealPrediction}
                  rightIcon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}
                >
                  {isPredictStep ? t.commitHypothesis : t.checkAnswer}
                </Button>
              </div>
            )}

            {/* Revealed Outcome & Misconception Feedback */}
            {currentInteraction.isRevealed && selectedOpt && (
              <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="pt-4 border-t-3 border-black dark:border-white space-y-3 animate-in fade-in duration-200"
              >
                <div className="flex items-center gap-2">
                  {selectedOpt.isCorrect ? (
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-display font-black text-sm uppercase">
                      <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                      <span>{locale === 'tr' ? 'Hipotez Doğrulandı' : locale === 'ar' ? 'تم تأكيد الفرضية' : 'Hypothesis Confirmed'}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-display font-black text-sm uppercase">
                      <AlertCircle className="w-5 h-5 stroke-[2.5]" />
                      <span>{locale === 'tr' ? 'Tanısal Geri Bildirim: Yanılgı Belirlendi' : locale === 'ar' ? 'ملاحظة تشخيصية: تم تحديد مفهوم خاطئ' : 'Diagnostic Feedback: Misconception Identified'}</span>
                    </div>
                  )}
                </div>

                {/* Rationale / Misconception Feedback */}
                {(selectedOpt.misconceptionFeedback || selectedOpt.distractorRationale) && (
                  <div
                    className={`p-3 border-2 border-black font-body text-xs sm:text-sm leading-relaxed ${
                      selectedOpt.isCorrect
                        ? 'bg-[#E8F5E9] dark:bg-[#1B3820] text-emerald-950 dark:text-emerald-100'
                        : 'bg-[#FFE4E6] dark:bg-[#3F1B24] text-black dark:text-white'
                    }`}
                    dir={locale === 'ar' ? 'ltr' : undefined}
                  >
                    <strong>
                      {selectedOpt.isCorrect
                        ? (locale === 'tr' ? 'Açıklama: ' : locale === 'ar' ? 'التفسير: ' : 'Rationale: ')
                        : (locale === 'tr' ? 'Nedeni: ' : locale === 'ar' ? 'السبب: ' : 'Why this happens: ')}
                    </strong>
                    {selectedOpt.misconceptionFeedback || selectedOpt.distractorRationale}
                  </div>
                )}

                {/* Model Outcome & Rationale */}
                <div className="p-4 bg-white dark:bg-[#1E1E1E] border-2 border-black dark:border-white space-y-2 shadow-[2px_2px_0px_#000000]">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    {locale === 'tr' ? 'Bilimsel Çıkarım:' : locale === 'ar' ? 'الاستنتاج العلمي:' : 'Scientific Deduction:'}
                  </span>
                  <p className="font-body text-sm sm:text-base font-bold text-black dark:text-white" dir={locale === 'ar' ? 'ltr' : undefined}>
                    {(currentStep.config.revealedOutcome as string) || (currentStep.config.explanation as string)}
                  </p>
                  {Boolean(currentStep.config.explanation && currentStep.config.revealedOutcome) && (
                    <p className="font-body text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed pt-1" dir={locale === 'ar' ? 'ltr' : undefined}>
                      {currentStep.config.explanation as string}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 10: Recap, Celebration & Flashcards Enqueue */}
        {currentStepIndex === totalSteps - 1 && (
          <div className="space-y-6 pt-2">
            {/* Completion Banner */}
            <div className="p-4 bg-[#6BCB77]/20 border-3 border-black dark:border-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#6BCB77] border-2 border-black flex items-center justify-center shrink-0">
                  <Check className="w-7 h-7 text-black stroke-[3]" />
                </div>
                <div>
                  <h3 className="font-display font-black text-lg uppercase">
                    {t.lessonMastered}
                  </h3>
                  <p className="text-xs font-mono text-gray-700 dark:text-gray-300">
                    {t.recapSubtitle}
                  </p>
                </div>
              </div>
              <StickerBadge variant="green" size="md">
                +50 XP
              </StickerBadge>
            </div>

            {/* Enqueued Review Cards Preview */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  {locale === 'tr'
                    ? '1. Kutuya Eklenen Leitner Aralıklı Tekrar Kartları (24 Saat İçinde Tekrar)'
                    : locale === 'ar'
                    ? 'بطاقات التكرار المتباعد المضافة إلى الصندوق 1 (مراجعة خلال 24 ساعة)'
                    : 'Enqueued Leitner Spaced Review Cards (Box 1 • Review in 24 Hours)'}
                </h4>
                <span className="text-[11px] font-mono text-gray-600 dark:text-gray-400">
                  {locale === 'tr' ? '3 Kart Hazır' : locale === 'ar' ? '3 بطاقات جاهزة' : '3 Cards Ready'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {lesson.spacedReviewCards.map((card: SpacedReviewCardSeed, idx: number) => (
                  <div
                    key={card.cardId}
                    className="p-3 bg-[#FFFDF7] dark:bg-[#1E1E1E] border-2 border-black dark:border-white shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#FFFFFF] flex flex-col justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono font-bold uppercase text-gray-700 dark:text-gray-300">
                          {locale === 'tr' ? `Kart 0${idx + 1}` : locale === 'ar' ? `بطاقة 0${idx + 1}` : `Card 0${idx + 1}`}
                        </span>
                        {import.meta.env.DEV && card.status === 'pending-human-review' && (
                          <span className="text-[9px] font-mono bg-yellow-200 text-black px-1 border border-black">
                            {locale === 'tr' ? 'İnceleme Gerekli' : locale === 'ar' ? 'مراجعة مطلوبة' : 'Review Required'}
                          </span>
                        )}
                      </div>
                      <p className="font-display font-bold text-xs line-clamp-2">
                        {card.drugOrConcept}
                      </p>
                      <p className="text-[11px] font-body text-gray-600 dark:text-gray-400 mt-1 line-clamp-3">
                        {card.prompt}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-black/10 dark:border-white/10 text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                      {locale === 'tr' ? '1. Kutu (Aralık: 1 Gün)' : locale === 'ar' ? 'الصندوق 1 (الفاصل: يوم واحد)' : 'Box 1 (Interval: 1 Day)'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3-Tier Hint Ladder */}
        <div className="pt-2">
          <HintDrawer
            hints={currentStep.hints}
            isPremiumOrTrial={isPremiumOrTrial}
            onUpgradeClick={() => setIsPaywallOpen(true)}
          />
        </div>

        {/* Step Navigation Controls (Desktop) */}
        <div className="hidden md:flex pt-4 border-t-3 border-black dark:border-white items-center justify-between gap-4">
          <Button
            variant="secondary"
            size="md"
            disabled={currentStepIndex === 0}
            onClick={handlePrevStep}
            leftIcon={<ChevronLeft className="w-4 h-4 rtl:rotate-180" />}
          >
            {t.previous}
          </Button>

          {currentStepIndex < totalSteps - 1 ? (
            <Button
              variant="primary"
              size="md"
              disabled={!canProceed}
              onClick={handleNextStep}
              rightIcon={<ChevronRight className="w-4 h-4 rtl:rotate-180" />}
            >
              {t.continueToStep(currentStepIndex + 2)}
            </Button>
          ) : (
            <Link to="/catalog" onClick={handleCompleteLesson}>
              <Button
                variant="primary"
                size="md"
                onClick={handleCompleteLesson}
                rightIcon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}
              >
                {t.completeAndReturn}
              </Button>
            </Link>
          )}
        </div>
      </Card>
      </article>

      {/* Sticky Bottom Action Bar on Mobile Viewports (<768px) per Section 6 of ui-guidelines */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-[#1A1A1A] border-t-3 border-black dark:border-white p-3 shadow-neo flex items-center justify-between gap-2">
        {currentStepIndex > 0 ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePrevStep}
            leftIcon={<ChevronLeft className="w-4 h-4 rtl:rotate-180" />}
          >
            {t.previous}
          </Button>
        ) : (
          <div className="w-16" />
        )}

        {currentStepIndex < totalSteps - 1 ? (
          <Button
            variant="primary"
            size="sm"
            disabled={!canProceed}
            onClick={handleNextStep}
            className="flex-1"
            rightIcon={<ChevronRight className="w-4 h-4 rtl:rotate-180" />}
          >
            {t.continueToStep(currentStepIndex + 2)}
          </Button>
        ) : (
          <Link to="/catalog" onClick={handleCompleteLesson} className="flex-1">
            <Button
              variant="primary"
              size="sm"
              fullWidth
              onClick={handleCompleteLesson}
              rightIcon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}
            >
              {t.completeAndReturn}
            </Button>
          </Link>
        )}
      </div>

      {/* Sources & Citations Drawer (E1 & Non-Negotiable Provenance) */}
      <footer className="border-2 border-black dark:border-white bg-[#FFFDF7] dark:bg-[#1A1A1A]">
        <button
          type="button"
          onClick={() => setSourcesOpen(!sourcesOpen)}
          className="w-full p-3 flex items-center justify-between text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="font-display font-black text-xs uppercase tracking-tight">
              {t.academicSources}
            </span>
          </div>
          <span className="text-xs font-mono underline font-bold">
            {sourcesOpen ? t.hideSources : t.viewCitations}
          </span>
        </button>

        {sourcesOpen && (
          <div className="p-4 border-t-2 border-black dark:border-white space-y-4 text-xs font-mono">
            {/* Textbook Citations (E1 Policy) */}
            <div className="space-y-2">
              <span className="font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                {import.meta.env.DEV
                  ? 'Authoritative Textbook References (Citation Status: Unverified per E1 Policy):'
                  : 'Authoritative Textbook References:'}
              </span>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-800 dark:text-gray-200">
                {lesson.citations.map((c: StepCitation) => (
                  <li key={c.id}>
                    <strong>{c.book}</strong> ({c.edition}) • Topic: &quot;{c.topic}&quot;
                    {import.meta.env.DEV && (
                      <span className="italic text-gray-600 dark:text-gray-400">
                        {' '}[Section: {c.chapter}, Page: {c.page} — Pending Physical Copy Verification]
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* University Lecture Provenance */}
            {import.meta.env.DEV && (
              <div className="space-y-1">
                <span className="font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Internal Lecture Materials Provenance:
                </span>
                <p className="text-gray-800 dark:text-gray-200">
                  Source Slides: <code>Farmasötik ve Medisinal Kimya 1-Giriş.pdf</code> (Slides 17–23).
                  Recreated natively via Neo-Brutalist vector components; zero university slide images embedded.
                  Logged in <code>docs/asset-log.md</code> under <code>mc-asset-004</code>.
                </p>
              </div>
            )}

            {/* Numeric Parameters Disclaimer (E2 Policy) */}
            {import.meta.env.DEV && (
              <div className="p-2.5 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-700 text-yellow-900 dark:text-yellow-200 flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Empirical Threshold Note (E2):</strong> The thermodynamic saturation range{' '}
                  <code>[pending-human-review: saturation threshold]</code> is registered in <code>docs/needs-human-review.md</code> as{' '}
                  <code>pending-human-review</code> for direct owner verification against primary literature.
                </span>
              </div>
            )}
          </div>
        )}
      </footer>

      {/* Paywall & Trial Activation Modal */}
      <PaywallModal
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        canStartTrial={user ? !user.trialUsed : true}
        onStartTrial={handleStartTrialClick}
        onSelectPlan={(plan, curr, isBundle) => {
          alert(`Checkout initiated for ${plan} plan in ${curr} (Bundle: ${isBundle}). (Emulator sandbox)`);
          setIsPaywallOpen(false);
        }}
      />
    </div>
  );
};
