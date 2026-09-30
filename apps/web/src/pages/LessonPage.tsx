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
  TechnicalTermBadge,
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
import {
  getLessonInteractiveData,
  type InteractivePreset,
  type InteractiveMission,
} from '../data/interactiveLessons';
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
} from '@pharmacy/widgets';

function getLocalizedText(
  value: string | { tr?: string; ar?: string; en?: string } | undefined,
  currentLocale: string
): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    if (currentLocale === 'en' && value.en) return value.en;
    if (currentLocale === 'ar' && value.ar) return value.ar;
    if (currentLocale === 'tr' && value.tr) return value.tr;
    return value.tr || value.en || value.ar || '';
  }
  return String(value);
}

function getDefaultWidgetType(lessonId: string): string {
  if (lessonId === 'mc-mod1-les1') return 'ThermodynamicActivityFergusonSlider';
  if (lessonId === 'mc-mod1-les2') return 'IonizationEquilibriumSlider';
  if (lessonId.startsWith('mc-mod2') || lessonId === 'mc-mod4-les2') return 'SarExplorer';
  if (lessonId.startsWith('mc-mod3')) return 'StructureIdentifier';
  if (lessonId === 'mc-mod4-les1' || lessonId.startsWith('pharm-mod1') || lessonId.startsWith('pharm-mod4')) return 'ReceptorLigandMatcher';
  if (lessonId.startsWith('pharm-mod2')) return 'DoseResponseCurve';
  if (lessonId.startsWith('pharm-mod3')) return 'PkSimulator';
  if (lessonId.startsWith('mc-mod5') || lessonId.startsWith('pharm-mod5') || lessonId.startsWith('pharm-mod6')) return 'MetabolismMap';
  return 'ThermodynamicActivityFergusonSlider';
}

function renderInteractiveWidget(
  widgetType: string | undefined,
  config: any,
  locale: 'tr' | 'ar' | 'en' = 'tr',
  onParamChange?: (key: string, val: any) => void
) {
  const mergedConfig = { ...config };
  if (onParamChange) {
    mergedConfig.onChange = (val: any) => onParamChange('primary', val);
  }

  switch (widgetType) {
    case 'ThermodynamicActivityFergusonSlider':
      return <ThermodynamicActivityFergusonSlider config={{ ...thermodynamicActivityFergusonStandardDemo, ...mergedConfig }} locale={locale} />;
    case 'IonizationEquilibriumSlider':
      return <IonizationEquilibriumSlider config={{ ...ionizationEquilibriumStandardDemo, ...mergedConfig }} locale={locale} />;
    case 'SarExplorer':
      return <SarExplorer config={{ ...sarExplorerStandardDemo, ...mergedConfig }} />;
    case 'ReceptorLigandMatcher':
      return <ReceptorLigandMatcher config={{ ...receptorLigandMatcherStandardDemo, ...mergedConfig }} />;
    case 'StructureIdentifier':
      return <StructureIdentifier config={{ ...structureIdentifierStandardDemo, ...mergedConfig }} />;
    case 'MetabolismMap':
      return <MetabolismMap config={{ ...metabolismMapStandardDemo, ...mergedConfig }} />;
    case 'DoseResponseCurve':
      return <DoseResponseCurve config={{ ...doseResponseCurveStandardDemo, ...mergedConfig }} locale={locale} />;
    case 'PkSimulator':
      return <PkSimulator config={{ ...pkSimulatorStandardDemo, ...mergedConfig }} locale={locale} />;
    case 'MembranePartitionSimulator':
      return <MembranePartitionSimulator config={{ ...membranePartitionStandardDemo, ...mergedConfig }} locale={locale} />;
    default:
      return null;
  }
}

const STAGE_META: Record<string, { tr: string; ar: string; en: string; variant: 'blue' | 'yellow' | 'green' | 'orange' }> = {
  hook: { tr: '1. Klinik Kanca', ar: '1. لغز سريري وحيوي', en: '1. Clinical Puzzle', variant: 'blue' },
  question: { tr: '2. Tahmin Hipotezi', ar: '2. فرضية التوقع', en: '2. Prediction Hypothesis', variant: 'yellow' },
  intuition: { tr: '3. Fiziksel Sezgi ve Analoji', ar: '3. الحدس الفيزيائي والتشبيه', en: '3. Physical Intuition & Analogy', variant: 'orange' },
  visual_explanation: { tr: '4. Görsel Mekanizma', ar: '4. التوضيح البصري للميكانيكية', en: '4. Visual Mechanism', variant: 'blue' },
  interactive_artifact: { tr: '5. İnteraktif Simülasyon', ar: '5. المحاكاة التفاعلية الحيوية', en: '5. Interactive Simulation', variant: 'green' },
  guided_discovery: { tr: '6. Rehberli Keşif', ar: '6. الاستكشاف الموجه', en: '6. Guided Discovery', variant: 'yellow' },
  formal_explanation: { tr: '7. Formal Bilimsel İlke', ar: '7. الصياغة العلمية الدقيقة', en: '7. Formal Scientific Principle', variant: 'blue' },
  concept_check: { tr: '8. Kavram Denetimi', ar: '8. فحص المفاهيم وتصحيحها', en: '8. Concept Check', variant: 'yellow' },
  application: { tr: '9. Klinik Uygulama', ar: '9. التطبيق السريري والتصميمي', en: '9. Clinical Application', variant: 'blue' },
  retrieval: { tr: '10. Aralıklı Hatırlama', ar: '10. الاسترجاع المتباعد', en: '10. Spaced Retrieval', variant: 'orange' },
  connection: { tr: '11. İleri Bağlantı', ar: '11. الربط المفاهيمي القادم', en: '11. Conceptual Connection', variant: 'blue' },
  mastery_check: { tr: '12. Ustalık Sınavı', ar: '12. اختبار الإتقان النهائي', en: '12. Mastery Assessment', variant: 'green' },
};

export const LessonPage: React.FC = () => {
  const { lessonId = '1', courseId: routeCourseId } = useParams<{ lessonId: string; courseId?: string }>();
  const { locale } = useTheme();
  const { user, entitlements, startTrial } = useAuth();

  const isPharmPath =
    typeof window !== 'undefined' &&
    (window.location.pathname.includes('/pharmacology') || lessonId.startsWith('pharm'));
  const inferredCourseId = (routeCourseId || (isPharmPath ? 'pharmacology' : 'medchem')) as 'medchem' | 'pharmacology';

  const lookupKey = lessonsMap[lessonId]
    ? lessonId
    : lessonsMap[`${inferredCourseId}-${lessonId}`]
    ? `${inferredCourseId}-${lessonId}`
    : lessonId;

  const lesson: LessonData = lessonsMap[lookupKey] || lesson01;
  const courseId = (lesson.courseId as 'medchem' | 'pharmacology') || inferredCourseId;
  const lessonTitle =
    (locale === 'en' && ((lesson.title as any)?.en || (typeof lesson.title === 'string' ? lesson.title : ''))) ||
    (locale !== 'en' && (lesson.translations as any)?.[locale]?.title) ||
    getLocalizedText(lesson.title, locale);

  const isFreePreviewLesson =
    lessonId !== '3' && lessonId !== 'mc-mod1-les3' && (lesson.access === 'free' || lesson.order <= 2);

  const hasAccess = hasCourseAccess(user, entitlements, courseId, {
    isFreePreview: isFreePreviewLesson,
  });

  const isPremiumOrTrial =
    user?.plan === 'trial' ||
    user?.plan === 'premium' ||
    entitlements.some(
      (e) => (e.courseId === courseId || e.courseId === 'dual_bundle') && e.status === 'active'
    );

  // Local progress & review cards state
  const [progress, setProgress] = useState(() => loadLocalProgress(courseId));
  const [currentStepIndex, setCurrentStepIndex] = useState(() => {
    const savedProgress = loadLocalProgress(courseId);
    if (
      savedProgress &&
      savedProgress.currentLessonId === lesson.id &&
      typeof savedProgress.currentStepIndex === 'number' &&
      savedProgress.currentStepIndex > 0
    ) {
      return Math.min(savedProgress.currentStepIndex, (lesson.steps?.length || 12) - 1);
    }
    return 0;
  });
  const [stepInteractions, setStepInteractions] = useState<
    Record<number, { selectedId?: string; isRevealed?: boolean; isCorrect?: boolean }>
  >({});
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);

  // Interactive Learning Journey state
  const interactiveData = getLessonInteractiveData(lesson.id);
  const [activeJourneyPhase, setActiveJourneyPhase] = useState<'explore' | 'missions' | 'quiz'>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search).get('phase');
      if (p === 'quiz' || p === 'missions' || p === 'explore') return p;
    }
    return 'explore';
  });
  const [simParams, setSimParams] = useState<Record<string, any>>(interactiveData.defaultParams);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(interactiveData.presets[0]?.id || null);
  const [completedMissions, setCompletedMissions] = useState<Record<string, boolean>>({});
  const [missionXPAwarded, setMissionXPAwarded] = useState<number>(0);

  // Paywall guard
  useEffect(() => {
    if (!hasAccess && !isFreePreviewLesson) {
      setIsPaywallOpen(true);
    }
  }, [hasAccess, isFreePreviewLesson]);

  // Load saved step index from progress if valid
  useEffect(() => {
    const savedProgress = loadLocalProgress(courseId);
    setProgress(savedProgress);
    if (
      savedProgress &&
      savedProgress.currentLessonId === lesson.id &&
      typeof savedProgress.currentStepIndex === 'number' &&
      savedProgress.currentStepIndex > 0
    ) {
      setCurrentStepIndex(Math.min(savedProgress.currentStepIndex, (lesson.steps?.length || 12) - 1));
      setActiveJourneyPhase('quiz');
    }
  }, [lessonId, lesson, courseId]);

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
    const options = ((currentStep as any).conceptCheck?.options || currentStep.config?.options) as
      | Array<{ id: string; isCorrect: boolean }>
      | undefined;
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

      const existingCards = loadLocalReviewCards(courseId);
      const updatedCards = enqueueReviewCards(existingCards, lesson.spacedReviewCards, new Date());
      saveLocalReviewCards(courseId, updatedCards);

      setLessonCompleted(true);
    }
  }, [lessonCompleted, progress, lesson, courseId]);

  const persistStepProgress = useCallback(
    (stepIdx: number) => {
      setProgress((prev) => {
        const base: UserProgress = prev || {
          courseId,
          completedLessonIds: [],
          currentModuleId: lesson.moduleId || (courseId === 'pharmacology' ? 'pharm-mod-01' : 'mc-mod-01'),
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
    [lesson.id, lesson.moduleId, courseId]
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

  // Persist completion and enqueue cards as soon as user arrives at Step 10/12 Recap
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

  // Preset activation
  const handleSelectPreset = (preset: InteractivePreset) => {
    setSelectedPresetId(preset.id);
    setSimParams((prev) => ({ ...prev, ...preset.params }));

    // Check if activating this preset satisfies any missions
    interactiveData.missions.forEach((m) => {
      if (!completedMissions[m.id] && m.validator(preset.params)) {
        setCompletedMissions((prev) => ({ ...prev, [m.id]: true }));
        setMissionXPAwarded((prev) => prev + m.rewardXP);
        setProgress((prev) => {
          const updated = { ...prev, totalXP: (prev?.totalXP || 0) + m.rewardXP };
          saveLocalProgress(updated);
          return updated;
        });
      }
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        isPaywallOpen ||
        ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName) ||
        (e.target as HTMLElement)?.getAttribute('role') === 'radio'
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        if (activeJourneyPhase !== 'quiz') {
          setActiveJourneyPhase('quiz');
          return;
        }
        const canAdvance =
          !currentStep?.predictThenReveal ||
          currentInteraction.isRevealed ||
          currentStepIndex === 0 ||
          currentStepIndex === totalSteps - 1;
        if (canAdvance) {
          handleNextStep();
        }
      } else if (e.key === 'ArrowLeft') {
        if (activeJourneyPhase === 'quiz') {
          handlePrevStep();
        }
      } else if (['1', '2', '3', '4'].includes(e.key) && activeJourneyPhase === 'quiz') {
        const idx = parseInt(e.key, 10) - 1;
        const options = (currentStep?.config?.options || (currentStep as any)?.conceptCheck?.options) as
          | Array<{ id: string; isCorrect: boolean }>
          | undefined;
        if (options && options[idx] && !currentInteraction.isRevealed) {
          handleSelectOption(options[idx]!.id, options[idx]!.isCorrect);
        }
      } else if (e.key === 'Enter' && activeJourneyPhase === 'quiz') {
        if (currentInteraction.selectedId && !currentInteraction.isRevealed) {
          handleRevealPrediction();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isPaywallOpen,
    activeJourneyPhase,
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
              {locale === 'tr' ? 'Premium Ders (Kilitli)' : locale === 'ar' ? 'درس مدفوع (مغلق)' : 'Premium Lesson (Locked)'}
            </StickerBadge>
            <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight">
              {locale === 'tr'
                ? 'İleri Modüllere ve Analiz Araçlarına Erişin'
                : locale === 'ar'
                ? 'الوصول إلى الموديولات المتقدمة وأدوات المحاكاة'
                : 'Unlock Full Course Modules & Lab Tools'}
            </h1>
            <p className="font-body text-sm text-gray-700 dark:text-gray-300">
              {locale === 'tr'
                ? 'Tüm modüllerde 1. ve 2. dersler kalıcı olarak ücretsizdir. İleri yapı-etki ilişkilerini keşfetmek için 7 günlük ücretsiz denemenizi başlatın.'
                : locale === 'ar'
                ? 'الدرسان 1 و2 من جميع الموديولات مجانيان دائماً. لمتابعة دراسة العلاقات البنيوية المتقدمة، ابدأ تجربتك المجانية لـ 7 أيام.'
                : 'Lessons 1 & 2 of every module are free forever. To continue through advanced structure-activity relationships and complete exam prep, activate your 7-day free trial or select an academic pass.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={handleStartTrialClick}
              leftIcon={<Sparkles className="w-5 h-5" />}
            >
              {locale === 'tr' ? '7 Günlük Ücretsiz Denemeyi Başlat' : locale === 'ar' ? 'ابدأ التجربة المجانية لـ 7 أيام' : 'Start 7-Day Free Trial'}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setIsPaywallOpen(true)}
            >
              {locale === 'tr' ? 'Öğrenci Aboneliklerini İncele' : locale === 'ar' ? 'عرض الاشتراكات الطلابية' : 'View Student Passes'}
            </Button>
          </div>

          <div className="pt-4 border-t-2 border-black/10 dark:border-slate-700 text-xs font-mono text-gray-600 dark:text-gray-400">
            <Link to="/courses/medchem/lessons/1" className="underline hover:text-black dark:hover:text-amber-400 font-bold">
              {locale === 'tr' ? '← Ücretsiz Ders 1\'e Dön' : locale === 'ar' ? '← العودة إلى الدرس 1 المجاني' : '← Return to Free Lesson 1'}
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
    return <div className="p-8 text-center font-mono">{locale === 'tr' ? 'Ders adımı yükleniyor...' : locale === 'ar' ? 'جارٍ تحميل الخطوة...' : 'Loading step...'}</div>;
  }

  const options = (((currentStep as any).conceptCheck?.options || currentStep.config?.options) as Array<{
    id: string;
    label?: string;
    text?: string | { tr?: string; ar?: string; en?: string };
    isCorrect: boolean;
    misconceptionFeedback?: string | { tr?: string; ar?: string; en?: string };
    distractorRationale?: string;
  }>) || [];

  const selectedOpt = options.find((o) => o.id === currentInteraction.selectedId);
  const hasOptions = options.length > 0;
  const canProceed =
    (!hasOptions && !isPredictStep) ||
    currentStep.stage === 'interactive_artifact' ||
    currentStep.stage === 'visual_explanation' ||
    currentStep.stage === 'intuition' ||
    currentStep.stage === 'hook' ||
    currentStep.stage === 'formal_explanation' ||
    currentStep.stage === 'connection' ||
    currentStep.stage === 'retrieval' ||
    currentInteraction.isRevealed ||
    currentStepIndex === 0 ||
    currentStepIndex === totalSteps - 1;

  const stageMeta = currentStep.stage ? STAGE_META[currentStep.stage] : undefined;

  const hudStatus = interactiveData.evaluateHud(simParams, locale);

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
    lessonMastered: locale === 'tr' ? 'Ders Başarıyla Tamamlandı!' : locale === 'ar' ? 'تم إتقان الدرس بنجاح!' : 'Lesson Mastered!',
    recapSubtitle: locale === 'tr' ? '+50 XP Kazanıldı • Günlük Seri Korundu • 1. Kutuya 3 Tekrar Kartı Eklendi' : locale === 'ar' ? '+50 نقطة خبرة • الحفاظ على الأيام المتتالية • أضيفت 3 بطاقات إلى الصندوق 1' : '+50 XP Earned • Daily Streak Maintained • 3 Review Cards Added to Box 1',

    // 3-Phase Journey Navigation
    phase1Explore: locale === 'tr' ? '1. Keşfet ve Anla' : locale === 'ar' ? '1. استكشف وافهم' : '1. Explore & Understand',
    phase2Missions: locale === 'tr' ? '2. Uygulamalı Görevler' : locale === 'ar' ? '2. مهام تطبيقية' : '2. Guided Missions',
    phase3Quiz: locale === 'tr' ? '3. Kavram Testi & Ustalık' : locale === 'ar' ? '3. اختبار المفاهيم' : '3. Concept Quiz',
    exploreBannerTitle: locale === 'tr' ? 'Biyofiziksel Simülasyon Laboratuvarı' : locale === 'ar' ? 'مختبر المحاكاة الفيزيائية الحيوية' : 'Biophysical Simulation Lab',
    exploreBannerSubtitle:
      locale === 'tr'
        ? 'Sorulara geçmeden önce, parametreleri değiştirerek moleküllerin membran ve reseptör davranışını canlı keşfedin.'
        : locale === 'ar'
        ? 'قبل البدء بالأسئلة، تفاعل مع المعاملات واكتشف سلوك الجزيئات الحيوية في الأغشية والمستقبلات.'
        : 'Before testing concepts, manipulate parameters to build intuitive understanding of molecular behavior.',
    presetsTitle: locale === 'tr' ? 'Klinik ve Fakülte Hazır Ayarları' : locale === 'ar' ? 'الحالات السريرية والتدريسية الجاهزة' : 'Clinical & Faculty Presets',
    liveHudTitle: locale === 'tr' ? 'Canlı Biyofiziksel Durum Monitörü' : locale === 'ar' ? 'شاشة المراقبة الفيزيائية الحيوية الفورية' : 'Live Biophysical Status HUD',
    goToMissions: locale === 'tr' ? 'Keşfi Tamamladım, Görevlere Başla → (+25 XP)' : locale === 'ar' ? 'أنهيت الاستكشاف، ابدأ بالمهام → (+25 XP)' : 'Exploration Done, Start Missions → (+25 XP)',
    goToQuiz: locale === 'tr' ? 'Görevler Tamamlandı! Kavram Testine Geç → (+50 XP)' : locale === 'ar' ? 'أنجزت المهام! انتقل إلى اختبار المفاهيم → (+50 XP)' : 'Missions Solved! Start Concept Quiz → (+50 XP)',
    howItWorksToggle: locale === 'tr' ? 'Nasıl Çalışır? Biyofiziksel İlkeler ve Formüller' : locale === 'ar' ? 'كيف يعمل؟ المبادئ الفيزيائية الحيوية والمعادلات' : 'How It Works: Principles & Formulas',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28 md:pb-6 space-y-6 scroll-pt-20">
      {/* Top Header / Context Bar */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-3 border-black dark:border-slate-700 pb-4">
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
              {courseId === 'pharmacology' ? 'Farmakoloji' : 'Farmasötik Kimya'} • {lesson.moduleId || 'Mod 01'}
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
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF8E7] dark:bg-[#1E293B] border-2 border-black dark:border-slate-700 shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#030712]">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span className="font-bold">{progress.streakDays} {t.dayStreak}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFD93D] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
            <Award className="w-4 h-4" />
            <span className="font-bold">{progress.totalXP} XP</span>
          </div>
        </div>
      </header>

      {/* Persistent Progress Indicator */}
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
                setActiveJourneyPhase('quiz');
              }
            }}
          />
        </div>
      </div>

      {/* 3-Phase Concept Journey Navigation Bar */}
      <nav
        aria-label="Lesson Journey Navigation"
        className="flex items-center gap-1 sm:gap-2 p-1.5 bg-white dark:bg-[#131B2A] border-3 border-black dark:border-slate-700 shadow-neo-sm overflow-x-auto scrollbar-none"
      >
        <button
          type="button"
          onClick={() => setActiveJourneyPhase('explore')}
          className={`flex items-center gap-1.5 px-3 py-2 font-display font-black text-xs sm:text-sm uppercase tracking-tight transition-all shrink-0 ${
            activeJourneyPhase === 'explore'
              ? 'bg-[#4D96FF] text-white border-2 border-black dark:border-blue-400 shadow-[2px_2px_0px_#000000] ring-2 ring-black'
              : 'hover:bg-black/5 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{t.phase1Explore}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveJourneyPhase('missions')}
          className={`flex items-center gap-1.5 px-3 py-2 font-display font-black text-xs sm:text-sm uppercase tracking-tight transition-all shrink-0 ${
            activeJourneyPhase === 'missions'
              ? 'bg-[#FFD93D] text-black border-2 border-black dark:border-amber-400 shadow-[2px_2px_0px_#000000] ring-2 ring-black'
              : 'hover:bg-black/5 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-orange-600" />
          <span>{t.phase2Missions}</span>
          {Object.keys(completedMissions).length > 0 && (
            <span className="px-1.5 py-0.2 bg-black text-white text-[10px] font-mono">
              {Object.keys(completedMissions).length}/{interactiveData.missions.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveJourneyPhase('quiz')}
          className={`flex items-center gap-1.5 px-3 py-2 font-display font-black text-xs sm:text-sm uppercase tracking-tight transition-all shrink-0 ${
            activeJourneyPhase === 'quiz'
              ? 'bg-[#6BCB77] text-black border-2 border-black dark:border-emerald-400 shadow-[2px_2px_0px_#000000] ring-2 ring-black'
              : 'hover:bg-black/5 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300'
          }`}
        >
          <Award className="w-4 h-4 text-emerald-800" />
          <span>{t.phase3Quiz}</span>
          <span className="px-1.5 py-0.2 bg-black/10 dark:bg-white/20 text-[10px] font-mono">
            {currentStepIndex + 1}/{totalSteps}
          </span>
        </button>
      </nav>

      {/* PHASE 1: KEŞFET VE ANLA (EXPLORE & UNDERSTAND) */}
      {activeJourneyPhase === 'explore' && (
        <article aria-label="Interactive Simulation Lab" className="space-y-6 animate-in fade-in duration-200">
          <Card variant="default" elevated className="p-6 sm:p-8 space-y-6 border-3 border-black dark:border-slate-700 shadow-neo dark:shadow-neo-dark">
            <div className="space-y-2 border-b-2 border-black/15 dark:border-slate-700 pb-4">
              <div className="flex items-center justify-between">
                <StickerBadge variant="blue" size="md">
                  🔬 {t.exploreBannerTitle}
                </StickerBadge>
                <span className="text-xs font-mono text-gray-600 dark:text-gray-400">
                  {interactiveData.facultySource.instructor}
                </span>
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight">
                {getLocalizedText(interactiveData.howItWorks.title, locale)}
              </h2>
              <p className="font-body text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {t.exploreBannerSubtitle}
              </p>
            </div>

            {/* 1-Click Clinical / Faculty Presets */}
            <div className="space-y-2.5">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                ⚡ {t.presetsTitle}:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {interactiveData.presets.map((preset: InteractivePreset) => {
                  const isSelected = selectedPresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className={`p-3 border-2 border-black dark:border-slate-700 text-start space-y-1.5 transition-all ${
                        isSelected
                          ? 'bg-[#FFD93D] text-black shadow-neo-sm ring-2 ring-black -translate-y-0.5'
                          : 'bg-[#FFFDF7] dark:bg-[#1E293B] text-black dark:text-slate-100 hover:bg-gray-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display font-black text-xs uppercase tracking-tight line-clamp-1">
                          {getLocalizedText(preset.label, locale)}
                        </span>
                        <span className="text-[10px] font-mono px-1 bg-black text-white shrink-0">
                          {getLocalizedText(preset.badge, locale)}
                        </span>
                      </div>
                      <p className="text-[11px] font-body text-gray-600 dark:text-gray-300 line-clamp-2 leading-snug">
                        {getLocalizedText(preset.description, locale)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Front & Center Interactive Biophysical Widget */}
            <div className="p-4 bg-gray-50 dark:bg-[#0B0F17] border-3 border-black dark:border-slate-700 shadow-inner">
              {renderInteractiveWidget(
                interactiveData.widgetType || getDefaultWidgetType(lesson.id),
                simParams,
                locale,
                (key, val) => setSimParams((prev) => ({ ...prev, [key]: val }))
              )}
            </div>

            {/* Live Biophysical HUD / Inspection Card */}
            <div className="p-4 bg-[#FFFDF7] dark:bg-[#1E293B] border-2 border-black dark:border-slate-700 space-y-2 shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#030712]">
              <div className="flex items-center justify-between border-b border-black/10 dark:border-slate-700 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    {t.liveHudTitle}
                  </span>
                </div>
                <StickerBadge variant={hudStatus.stateColor === 'green' ? 'green' : hudStatus.stateColor === 'rose' ? 'pink' : 'yellow'} size="sm">
                  {hudStatus.stateLabel} • {hudStatus.valueDisplay}
                </StickerBadge>
              </div>
              <p className="font-body text-xs sm:text-sm text-black dark:text-slate-100 leading-relaxed">
                {hudStatus.analysis}
              </p>
              <div className="text-[10px] font-mono text-gray-500 dark:text-gray-400 pt-1">
                📚 {interactiveData.facultySource.deck} • {interactiveData.facultySource.slides}
              </div>
            </div>

            {/* Expandable "How It Works" Guide */}
            <div className="border-2 border-black dark:border-slate-700 p-4 bg-white dark:bg-[#131B2A] space-y-3">
              <h3 className="font-display font-black text-sm uppercase tracking-tight flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                {t.howItWorksToggle}
              </h3>
              {interactiveData.howItWorks.coreFormula && (
                <div className="p-3 bg-gray-50 dark:bg-[#0B0F17] border border-black dark:border-slate-700 font-mono text-center text-sm font-bold text-blue-700 dark:text-blue-400">
                  {interactiveData.howItWorks.coreFormula}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs leading-relaxed">
                {interactiveData.howItWorks.takeaways.map((takeaway, idx) => (
                  <div key={idx} className="p-2.5 bg-gray-50 dark:bg-slate-800/50 border border-black/10 dark:border-slate-700 space-y-1">
                    <span className="font-bold text-black dark:text-slate-100">
                      {getLocalizedText(takeaway.title, locale)}
                    </span>
                    <p className="text-gray-600 dark:text-gray-300">
                      {getLocalizedText(takeaway.body, locale)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Advance to Guided Missions Button */}
            <div className="pt-2 flex justify-end">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  setActiveJourneyPhase('missions');
                  window.scrollTo(0, 0);
                }}
                rightIcon={<ArrowRight className="w-5 h-5 rtl:rotate-180" />}
              >
                {t.goToMissions}
              </Button>
            </div>
          </Card>
        </article>
      )}

      {/* PHASE 2: UYGULAMALI GÖREVLER (GUIDED MISSIONS) */}
      {activeJourneyPhase === 'missions' && (
        <section aria-label="Guided Interactive Missions" className="space-y-6 animate-in fade-in duration-200">
          <Card variant="default" elevated className="p-6 sm:p-8 space-y-6 border-3 border-black dark:border-slate-700 shadow-neo dark:shadow-neo-dark">
            <div className="space-y-2 border-b-2 border-black/15 dark:border-slate-700 pb-4">
              <div className="flex items-center justify-between">
                <StickerBadge variant="yellow" size="md">
                  🎯 {t.phase2Missions}
                </StickerBadge>
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                  +{missionXPAwarded} XP Kazanıldı
                </span>
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight">
                {locale === 'tr' ? 'Biyofiziksel Çözüm Görevleri' : locale === 'ar' ? 'مهام الحلول الفيزيائية الحيوية' : 'Biophysical Application Missions'}
              </h2>
              <p className="font-body text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {locale === 'tr'
                  ? 'Aşağıdaki görevleri tamamlamak için simülatördeki değerleri hedef aralıklara getirin veya klinik seçenekleri analiz edin.'
                  : locale === 'ar'
                  ? 'اضبط معاملات المحاكاة أو حلل السيناريوهات السريرية لإنجاز المهام التطبيقية أدناه.'
                  : 'Manipulate simulator parameters into target ranges or analyze clinical scenarios to complete the missions.'}
              </p>
            </div>

            {/* Interactive Simulation Mini-Lab */}
            <div className="p-4 bg-gray-50 dark:bg-[#0B0F17] border-2 border-black dark:border-slate-700">
              {renderInteractiveWidget(
                interactiveData.widgetType || getDefaultWidgetType(lesson.id),
                simParams,
                locale,
                (key, val) => setSimParams((prev) => ({ ...prev, [key]: val }))
              )}
            </div>

            {/* Missions List */}
            <div className="space-y-4">
              {interactiveData.missions.map((mission: InteractiveMission, idx: number) => {
                const isDone = Boolean(completedMissions[mission.id]);
                return (
                  <div
                    key={mission.id}
                    className={`p-4 border-2 border-black dark:border-slate-700 transition-all ${
                      isDone
                        ? 'bg-[#EBFBEE] dark:bg-[#072518] shadow-neo-sm'
                        : 'bg-white dark:bg-[#1E293B]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/10 dark:border-slate-700 pb-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                          isDone ? 'bg-emerald-600 text-white' : 'bg-black text-white'
                        }`}>
                          {idx + 1}
                        </span>
                        <h4 className="font-display font-black text-sm uppercase">
                          {getLocalizedText(mission.title, locale)}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <StickerBadge variant={isDone ? 'green' : 'yellow'} size="sm">
                          {isDone ? `✓ +${mission.rewardXP} XP` : `+${mission.rewardXP} XP`}
                        </StickerBadge>
                      </div>
                    </div>

                    <p className="font-body text-xs sm:text-sm text-black dark:text-slate-100 leading-relaxed">
                      {getLocalizedText(mission.instruction, locale)}
                    </p>

                    {isDone ? (
                      <div className="mt-3 p-2.5 bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-600 text-emerald-950 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-300 stroke-[3]" />
                        <span>{getLocalizedText(mission.successMessage, locale)}</span>
                      </div>
                    ) : (
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400">
                          💡 {locale === 'tr' ? 'İpucu: ' : locale === 'ar' ? 'تلميح: ' : 'Hint: '}
                          {getLocalizedText(mission.hint, locale)}
                        </span>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            if (mission.validator(simParams)) {
                              setCompletedMissions((prev) => ({ ...prev, [mission.id]: true }));
                              setMissionXPAwarded((prev) => prev + mission.rewardXP);
                              setProgress((prev) => {
                                const updated = { ...prev, totalXP: (prev?.totalXP || 0) + mission.rewardXP };
                                saveLocalProgress(updated);
                                return updated;
                              });
                            } else {
                              alert(
                                locale === 'tr'
                                  ? 'Görev parametreleri henüz karşılanmadı. Simülatörü ayarlayıp tekrar deneyin.'
                                  : locale === 'ar'
                                  ? 'لم يتم استيفاء شروط المهمة بعد. اضبط المحاكاة وحاول مجدداً.'
                                  : 'Mission target parameters not yet met. Adjust simulation controls and verify again.'
                              );
                            }
                          }}
                        >
                          {locale === 'tr' ? 'Durumu Doğrula' : locale === 'ar' ? 'تحقق من النتيجة' : 'Verify State'}
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Advance to Concept Quiz Button */}
            <div className="pt-2 flex justify-between items-center gap-3">
              <Button
                variant="secondary"
                size="md"
                onClick={() => setActiveJourneyPhase('explore')}
                leftIcon={<ChevronLeft className="w-4 h-4 rtl:rotate-180" />}
              >
                {t.previous}
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  setActiveJourneyPhase('quiz');
                  window.scrollTo(0, 0);
                }}
                rightIcon={<ArrowRight className="w-5 h-5 rtl:rotate-180" />}
              >
                {t.goToQuiz}
              </Button>
            </div>
          </Card>
        </section>
      )}

      {/* PHASE 3: KAVRAM TESTİ & USTALIK (CONCEPT QUIZ & MASTERY CHECK) */}
      {activeJourneyPhase === 'quiz' && (
        <section aria-label="Step-by-Step Concept Mastery Quiz" className="space-y-6 animate-in fade-in duration-200">
          {/* Main Interactive Step Card */}
          <article className="space-y-6">
            <Card
              variant="default"
              elevated
              className="p-6 sm:p-8 space-y-6 border-3 border-black dark:border-slate-700 shadow-neo dark:shadow-neo-dark transition-all duration-200"
            >
              {/* Step Badge & Title */}
              <div className="space-y-2 border-b-2 border-black/15 dark:border-slate-700 pb-4">
                <div className="flex items-center justify-between">
                  <StickerBadge
                    variant={
                      stageMeta
                        ? stageMeta.variant
                        : isPredictStep
                        ? 'yellow'
                        : currentStepIndex === totalSteps - 1
                        ? 'green'
                        : 'blue'
                    }
                    size="sm"
                  >
                    {stageMeta
                      ? locale === 'ar'
                        ? stageMeta.ar
                        : stageMeta.tr
                      : isPredictStep
                      ? t.predictThenReveal
                      : currentStepIndex === totalSteps - 1
                      ? t.lessonRecap
                      : t.conceptVignette}
                  </StickerBadge>
                  <span className="text-[11px] font-mono text-gray-600 dark:text-gray-400">
                    ID: {currentStep.id}
                  </span>
                </div>

                <h2 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-black dark:text-slate-100">
                  {getLocalizedText(currentStep.title, locale)}
                </h2>

                {/* Strict 40-word prompt */}
                <p className="font-body text-base sm:text-lg font-semibold text-black dark:text-slate-100 leading-relaxed">
                  {getLocalizedText(currentStep.prompt, locale)}
                </p>

                {/* Canonical Technical Terms */}
                {Array.isArray(currentStep.technicalTerms) && currentStep.technicalTerms.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    <span className="text-[11px] font-mono text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      {locale === 'ar' ? 'المصطلحات المركزية:' : 'Anahtar Terimler:'}
                    </span>
                    {currentStep.technicalTerms.map((tt: any, idx: number) => {
                      const termStr = typeof tt === 'string' ? tt : tt.term || tt.tr || '';
                      return <TechnicalTermBadge key={idx} term={termStr} category="pharmacology" />;
                    })}
                  </div>
                )}
              </div>

              {/* STEP-SPECIFIC WIDGET BODIES */}

              {/* Step 1: Hook Comparison Vignette (Lesson 1 or lessons with drugA/drugB) */}
              {currentStepIndex === 0 && (Boolean(currentStep.config?.drugA) || lesson.id === 'mc-mod1-les1') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-[#FFFDF7] dark:bg-[#1E293B] border-2 border-black dark:border-slate-700 shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#030712] space-y-2 text-start">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold uppercase text-blue-700 dark:text-blue-400">
                        {locale === 'ar' ? 'المادة أ:' : locale === 'tr' ? 'Madde A:' : 'Agent A:'}
                      </span>
                      <TechnicalTermBadge term="Diethyl Ether" category="chemical" />
                      <span className="text-xs font-mono text-gray-600 dark:text-gray-400">
                        ({locale === 'ar' ? 'مخدر عام' : locale === 'tr' ? 'Anestezik' : 'Anesthetic'})
                      </span>
                    </div>
                    <div className="text-xs font-mono space-y-1">
                      <p><strong>{locale === 'ar' ? 'الجرعة السريرية:' : locale === 'tr' ? 'Klinik Doz:' : 'Clinical Dose:'}</strong> {locale === 'tr' ? '~20–50 gram (kanda yüksek molar konsantrasyon)' : locale === 'ar' ? '~20–50 غرام (تركيز جزيئي مرتفع في الدم)' : '~20–50 grams (high molar concentration in blood)'}</p>
                      <p><strong>{locale === 'ar' ? 'الهدف:' : locale === 'tr' ? 'Hedef:' : 'Target:'}</strong> {locale === 'tr' ? 'Hücre zarı lipidleri / fiziksel düzensizlik' : locale === 'ar' ? 'دهون الغشاء الخلوي / اضطراب فيزيائي' : 'Membrane lipids / physical disorder'}</p>
                      <p><strong>{locale === 'ar' ? 'النشاط الديناميكي الحراري:' : locale === 'tr' ? 'Termodinamik Aktivite:' : 'Thermodynamic Activity:'}</strong> <span className="font-bold text-amber-700 dark:text-amber-300">{locale === 'tr' ? 'a ≈ 0.03–0.05 (Yüksek Bağıl Doygunluk)' : locale === 'ar' ? 'a ≈ 0.03–0.05 (تشبع نسبي مرتفع)' : 'a ≈ 0.03–0.05 (High Saturation)'}</span></p>
                    </div>
                  </div>

                  <div className="p-4 bg-[#FFFDF7] dark:bg-[#1E293B] border-2 border-black dark:border-slate-700 shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#030712] space-y-2 text-start">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold uppercase text-emerald-700 dark:text-emerald-400">
                        {locale === 'ar' ? 'المادة ب:' : locale === 'tr' ? 'Madde B:' : 'Agent B:'}
                      </span>
                      <TechnicalTermBadge term="Propranolol" category="chemical" />
                      <span className="text-xs font-mono text-gray-600 dark:text-gray-400">
                        ({locale === 'ar' ? 'حاصر بيتا' : locale === 'tr' ? 'Beta-Blokör' : 'Beta-Blocker'})
                      </span>
                    </div>
                    <div className="text-xs font-mono space-y-1">
                      <p><strong>{locale === 'ar' ? 'الجرعة السريرية:' : locale === 'tr' ? 'Klinik Doz:' : 'Clinical Dose:'}</strong> {locale === 'tr' ? '10–40 miligram (nanomolar konsantrasyon)' : locale === 'ar' ? '10–40 ميلي غرام (تركيز نانومولي)' : '10–40 milligrams (nanomolar concentration)'}</p>
                      <p><strong>{locale === 'ar' ? 'الهدف:' : locale === 'tr' ? 'Hedef:' : 'Target:'}</strong> {locale === 'tr' ? 'Stereo-seçici β1/β2 reseptör cebi' : locale === 'ar' ? 'جيب مستقبلات β1/β2 الانتقائي فراغياً' : 'Stereoselective β1/β2 receptor pocket'}</p>
                      <p><strong>{locale === 'ar' ? 'النشاط الديناميكي الحراري:' : locale === 'tr' ? 'Termodinamik Aktivite:' : 'Thermodynamic Activity:'}</strong> <span className="font-bold text-emerald-700 dark:text-emerald-300">{locale === 'tr' ? 'a < 0.0001 (Aşırı Seyreltik / Yüksek Özgüllük)' : locale === 'ar' ? 'a < 0.0001 (تخفيف فائق / نوعية مرتفعة)' : 'a < 0.0001 (Extreme Dilution)'}</span></p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5 / Interactive Artifact Widget */}
              {(currentStep.stage === 'interactive_artifact' ||
                Boolean(currentStep.widgetType) ||
                Boolean((currentStep as any).widget) ||
                (currentStepIndex === 4 && totalSteps >= 12)) && (
                <div className="pt-2">
                  {renderInteractiveWidget(
                    currentStep.widgetType ||
                      (currentStep as any).widget?.type ||
                      getDefaultWidgetType(lesson.id),
                    (currentStep as any).widget?.config || currentStep.config,
                    locale
                  )}
                </div>
              )}

              {/* Formal Formula Callout (Stage 7) */}
              {currentStep.stage === 'formal_explanation' && Boolean(currentStep.config?.formula) && (
                <div className="p-4 bg-gray-50 dark:bg-[#131B2A] border-2 border-black dark:border-slate-700 font-mono text-center text-sm sm:text-base font-bold text-blue-700 dark:text-blue-400">
                  {String(currentStep.config.formula)}
                </div>
              )}

              {/* Retrieval Target Concept Callout (Stage 10) */}
              {currentStep.stage === 'retrieval' && Boolean(currentStep.config?.targetConcept) && (
                <div className="p-4 bg-purple-50 dark:bg-purple-950/20 border-2 border-black dark:border-slate-700 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-purple-800 dark:text-purple-300">
                    {locale === 'ar' ? 'المفهوم المستهدف:' : 'Hedef Kavram:'}
                  </span>
                  <TechnicalTermBadge term={String(currentStep.config.targetConcept)} category="pharmacology" />
                </div>
              )}

              {/* Predict / MCQ Options Steps (Steps 2-9 / 12) */}
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
                      const optText = typeof opt.text === 'object' ? getLocalizedText(opt.text, locale) : (opt.label || opt.text || '');
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
                          className={`w-full text-start p-3.5 border-3 border-black dark:border-slate-700 rounded-none font-body text-sm sm:text-base transition-all duration-150 flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#FFD93D] text-black shadow-neo-sm font-bold ltr:translate-x-1 rtl:-translate-x-1 ring-2 ring-black'
                              : 'bg-white dark:bg-[#1E293B] text-black dark:text-slate-100 hover:bg-gray-50 dark:hover:bg-slate-800'
                          } ${isRevealed ? 'cursor-default' : 'cursor-pointer'}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 border-2 border-black dark:border-slate-700 flex items-center justify-center font-mono text-xs font-bold shrink-0 bg-white dark:bg-[#131B2A] text-black dark:text-slate-100">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span>{optText}</span>
                          </div>
                          {isSelected && (
                            <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 bg-black text-white ms-2 shrink-0">
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
                      className="pt-4 border-t-3 border-black dark:border-slate-700 space-y-3 animate-in fade-in duration-200"
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
                          className={`p-3 border-2 border-black dark:border-slate-700 font-body text-xs sm:text-sm leading-relaxed ${
                            selectedOpt.isCorrect
                              ? 'bg-[#E8F5E9] dark:bg-[#064E3B]/40 text-emerald-950 dark:text-emerald-100'
                              : 'bg-[#FFE4E6] dark:bg-[#4C0519]/40 text-black dark:text-rose-200'
                          }`}
                        >
                          <strong>
                            {selectedOpt.isCorrect
                              ? (locale === 'tr' ? 'Açıklama: ' : locale === 'ar' ? 'التفسير: ' : 'Rationale: ')
                              : (locale === 'tr' ? 'Nedeni: ' : locale === 'ar' ? 'السبب: ' : 'Why this happens: ')}
                          </strong>
                          {typeof selectedOpt.misconceptionFeedback === 'object'
                            ? getLocalizedText(selectedOpt.misconceptionFeedback, locale)
                            : (selectedOpt.misconceptionFeedback || selectedOpt.distractorRationale)}
                        </div>
                      )}

                      {/* Model Outcome & Rationale */}
                      <div className="p-4 bg-white dark:bg-[#131B2A] border-2 border-black dark:border-slate-700 space-y-2 shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#030712]">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                          {locale === 'tr' ? 'Bilimsel Çıkarım:' : locale === 'ar' ? 'الاستنتاج العلمي:' : 'Scientific Deduction:'}
                        </span>
                        <p className="font-body text-sm sm:text-base font-bold text-black dark:text-slate-100">
                          {getLocalizedText(currentStep.config?.revealedOutcome as any, locale) || getLocalizedText(currentStep.config?.explanation as any, locale)}
                        </p>
                        {Boolean(currentStep.config?.explanation && currentStep.config?.revealedOutcome) && (
                          <p className="font-body text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed pt-1">
                            {getLocalizedText(currentStep.config?.explanation as any, locale)}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 10/12: Recap, Celebration & Flashcards Enqueue */}
              {currentStepIndex === totalSteps - 1 && (
                <div className="space-y-6 pt-2">
                  <div className="p-4 bg-[#6BCB77]/20 border-3 border-black dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
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
                          className="p-3 bg-[#FFFDF7] dark:bg-[#131B2A] border-2 border-black dark:border-slate-700 shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#030712] flex flex-col justify-between gap-2"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-mono font-bold uppercase text-gray-700 dark:text-gray-300">
                                {locale === 'tr' ? `Kart 0${idx + 1}` : locale === 'ar' ? `بطاقة 0${idx + 1}` : `Card 0${idx + 1}`}
                              </span>
                            </div>
                            <p className="font-display font-bold text-xs line-clamp-2">
                              {getLocalizedText(card.drugOrConcept as any, locale) || card.drugOrConcept}
                            </p>
                            <p className="text-[11px] font-body text-gray-600 dark:text-gray-400 mt-1 line-clamp-3">
                              {getLocalizedText(card.prompt as any, locale) || card.prompt}
                            </p>
                          </div>
                          <div className="pt-2 border-t border-black/10 dark:border-slate-700 text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">
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
                  hints={
                    Array.isArray(currentStep?.hints)
                      ? currentStep.hints.map((h) => getLocalizedText(h, locale))
                      : []
                  }
                  isPremiumOrTrial={isPremiumOrTrial}
                  onUpgradeClick={() => setIsPaywallOpen(true)}
                />
              </div>

              {/* Step Navigation Controls (Desktop) */}
              <div className="hidden md:flex pt-4 border-t-3 border-black dark:border-slate-700 items-center justify-between gap-4">
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
        </section>
      )}

      {/* Sticky Bottom Action Bar on Mobile Viewports (<768px) per Section 6 of ui-guidelines */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-[#131B2A] border-t-3 border-black dark:border-slate-700 p-3 shadow-neo dark:shadow-neo-dark flex items-center justify-between gap-2">
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
      <footer className="border-2 border-black dark:border-slate-700 bg-[#FFFDF7] dark:bg-[#131B2A]">
        <button
          type="button"
          onClick={() => setSourcesOpen(!sourcesOpen)}
          className="w-full p-3 flex items-center justify-between text-start hover:bg-black/5 dark:hover:bg-slate-800 transition-colors"
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
          <div className="p-4 border-t-2 border-black dark:border-slate-700 space-y-4 text-xs font-mono">
            {/* Textbook Citations */}
            <div className="space-y-2">
              <span className="font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                References:
              </span>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-800 dark:text-gray-200">
                {(lesson.citations || []).map((c: StepCitation) => (
                  <li key={c.id}>
                    <strong>{c.book}</strong> ({c.edition}) • Topic: &quot;{c.topic}&quot;
                  </li>
                ))}
              </ul>
            </div>

            {/* University Lecture Provenance */}
            <div className="space-y-1">
              <span className="font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Academic Lecture Slide Provenance:
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                Course: <code>{interactiveData.facultySource.courseName}</code> ({interactiveData.facultySource.instructor}).
                Deck: <code>{interactiveData.facultySource.deck}</code> ({interactiveData.facultySource.slides}).
              </p>
            </div>
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
