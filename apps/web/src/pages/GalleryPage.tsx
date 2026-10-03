import React, { useState } from 'react';
import {
  Button,
  Card,
  StickerBadge,
  StepDots,
  ProgressBar,
  Input,
  Slider,
  Toggle,
  EmptyState,
  SkeletonLoader,
  TrialBanner,
  PaywallModal,
} from '@pharmacy/ui';
import { useTranslation } from '../context/TranslationContext';
import {
  PredictThenReveal,
  predictThenRevealStandardDemo,
  MultipleChoice,
  mcqStandardDemo,
  HintLadder,
  hintLadderStandardDemo,
  StructureIdentifier,
  structureIdentifierStandardDemo,
  SarExplorer,
  sarExplorerStandardDemo,
  DoseResponseCurve,
  doseResponseCurveStandardDemo,
  PkSimulator,
  pkSimulatorStandardDemo,
  ReceptorLigandMatcher,
  receptorLigandMatcherStandardDemo,
  MetabolismMap,
  metabolismMapStandardDemo,
  IonizationEquilibriumSlider,
  ionizationEquilibriumStandardDemo,
  MembranePartitionSimulator,
  membranePartitionStandardDemo,
  ThermodynamicActivityFergusonSlider,
  thermodynamicActivityFergusonStandardDemo,
} from '@pharmacy/widgets';
import { BookOpen, Sparkles } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { t, locale } = useTranslation();
  const [sliderVal, setSliderVal] = useState(50);
  const [toggleVal, setToggleVal] = useState(true);
  const [inputVal, setInputVal] = useState('7.4');
  const [stepDotIdx, setStepDotIdx] = useState(2);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [activeWidgetTab, setActiveWidgetTab] = useState<string>('sar');

  const widgets = [
    { id: 'sar', name: 'SAR Explorer', component: <SarExplorer config={sarExplorerStandardDemo} /> },
    { id: 'ionization', name: 'Ionization Equilibrium', component: <IonizationEquilibriumSlider config={ionizationEquilibriumStandardDemo} locale={locale} /> },
    { id: 'membrane-partition', name: 'Membrane Partition (logD)', component: <MembranePartitionSimulator config={membranePartitionStandardDemo} locale={locale} /> },
    { id: 'ferguson', name: 'Ferguson Activity Slider', component: <ThermodynamicActivityFergusonSlider config={thermodynamicActivityFergusonStandardDemo} locale={locale} /> },
    { id: 'structure', name: 'Structure Identifier', component: <StructureIdentifier config={structureIdentifierStandardDemo} /> },
    { id: 'dose-response', name: 'Dose-Response Curve', component: <DoseResponseCurve config={doseResponseCurveStandardDemo} locale={locale} /> },
    { id: 'pk', name: 'PK Simulator', component: <PkSimulator config={pkSimulatorStandardDemo} locale={locale} /> },
    { id: 'predict', name: 'Predict-Then-Reveal', component: <PredictThenReveal config={predictThenRevealStandardDemo} /> },
    { id: 'mcq', name: 'Multiple Choice (MCQ)', component: <MultipleChoice config={mcqStandardDemo} /> },
    { id: 'matcher', name: 'Receptor Matcher', component: <ReceptorLigandMatcher config={receptorLigandMatcherStandardDemo} /> },
    { id: 'metabolism', name: 'Metabolism Map', component: <MetabolismMap config={metabolismMapStandardDemo} /> },
    { id: 'hints', name: 'Hint Ladder', component: <HintLadder config={hintLadderStandardDemo} /> },
  ];

  return (
    <div className="w-full pb-20 space-y-12">
      {/* Hero Header */}
      <section className="bg-[#FFF8E7] dark:bg-[#0B0F17] border-b-3 border-black dark:border-slate-700 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <StickerBadge variant="black" size="sm">{t('gallery.badgeGallery')}</StickerBadge>
            <StickerBadge variant="green" size="sm">{t('gallery.commercialGrade')}</StickerBadge>
            <StickerBadge variant="yellow" size="sm">{t('gallery.neoBrutalist')}</StickerBadge>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-black dark:text-slate-100">
            {t('gallery.heroTitle')}
          </h1>
          <p className="font-body text-base sm:text-lg text-gray-800 dark:text-gray-200 max-w-3xl leading-relaxed">
            {t('gallery.heroDesc')}
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => setIsPaywallOpen(true)} leftIcon={<Sparkles className="w-4 h-4" />}>
              {t('gallery.paywallBtn')}
            </Button>
          </div>
        </div>
      </section>

      {/* Trial Banners Showcase */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="border-b-2 border-black/20 dark:border-slate-700 pb-2">
          <h2 className="font-display font-black text-xl uppercase tracking-tight">{t('gallery.sectionBanners')}</h2>
          <p className="text-xs text-gray-600 dark:text-gray-400">{t('gallery.sectionBannersDesc')}</p>
        </div>
        <div data-testid="section-trial-banners" className="space-y-3">
          <div data-testid="banner-free-preview">
            <TrialBanner status="free_preview" onActionClick={() => setIsPaywallOpen(true)} />
          </div>
          <div data-testid="banner-active-trial">
            <TrialBanner status="active_trial" daysRemaining={5} onActionClick={() => setIsPaywallOpen(true)} />
          </div>
          <div data-testid="banner-expired-trial">
            <TrialBanner status="expired_trial" onActionClick={() => setIsPaywallOpen(true)} />
          </div>
        </div>
      </section>

      {/* Interactive Pharmacy Widgets Showcase */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="border-b-2 border-black/20 dark:border-slate-700 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-display font-black text-xl uppercase tracking-tight">{t('gallery.sectionWidgets')}</h2>
            <p className="text-xs text-gray-600 dark:text-gray-400">{t('gallery.sectionWidgetsDesc')}</p>
          </div>
          <StickerBadge variant="orange" size="sm">{t('gallery.dedicatedWidgets')}</StickerBadge>
        </div>

        {/* Widget Selector Pills */}
        <div className="flex flex-wrap gap-2">
          {widgets.map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() => setActiveWidgetTab(w.id)}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase border-2 border-black dark:border-slate-700 transition-all ${
                activeWidgetTab === w.id
                  ? 'bg-[#FFD93D] text-black shadow-[3px_3px_0px_#000000] scale-102'
                  : 'bg-white dark:bg-[#1E293B] text-black dark:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800'
              }`}
            >
              {w.name}
            </button>
          ))}
        </div>

        {/* Active Widget Display */}
        <div data-testid="active-widget-container" className="p-2 sm:p-4 bg-gray-50 dark:bg-[#0B0F17] border-3 border-black dark:border-slate-700 shadow-neo dark:shadow-neo-dark">
          {widgets.find((w) => w.id === activeWidgetTab)?.component}
        </div>
      </section>

      {/* Core UI Components Showcase */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="border-b-2 border-black/20 dark:border-slate-700 pb-2">
          <h2 className="font-display font-black text-xl uppercase tracking-tight">{t('gallery.sectionPrimitives')}</h2>
          <p className="text-xs text-gray-600 dark:text-gray-400">{t('gallery.sectionPrimitivesDesc')}</p>
        </div>

        {/* Buttons Grid with State Matrix */}
        <div data-testid="section-buttons" className="space-y-3">
          <h3 className="font-mono font-bold text-xs uppercase text-gray-700 dark:text-gray-300">{t('gallery.sectionButtons')}</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" data-testid="btn-default">{t('gallery.buttons.default')}</Button>
            <Button variant="secondary" data-testid="btn-secondary">{t('gallery.buttons.secondary')}</Button>
            <Button variant="success" data-testid="btn-success">{t('gallery.buttons.success')}</Button>
            <Button variant="danger" data-testid="btn-danger">{t('gallery.buttons.danger')}</Button>
            <Button variant="medchem">{t('gallery.buttons.medchem')}</Button>
            <Button variant="pharm">{t('gallery.buttons.pharm')}</Button>
            <Button variant="ghost">{t('gallery.buttons.ghost')}</Button>
            <Button variant="primary" disabled data-testid="btn-disabled">{t('gallery.buttons.disabled')}</Button>
            <Button variant="primary" isLoading data-testid="btn-loading">{t('gallery.buttons.loading')}</Button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="space-y-3">
          <h3 className="font-mono font-bold text-xs uppercase text-gray-700 dark:text-gray-300">{t('gallery.sectionCards')}</h3>
          <div data-testid="section-cards" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Card variant="default" data-testid="card-default">
              <h4 className="font-display font-bold text-sm uppercase">{t('gallery.cards.defaultTitle')}</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{t('gallery.cards.defaultDesc')}</p>
            </Card>
            <Card variant="highlight" data-testid="card-highlight">
              <h4 className="font-display font-bold text-sm uppercase">{t('gallery.cards.highlightTitle')}</h4>
              <p className="text-xs text-black dark:text-amber-200 mt-1">{t('gallery.cards.highlightDesc')}</p>
            </Card>
            <Card variant="misconception" data-testid="card-misconception">
              <h4 className="font-display font-bold text-sm uppercase text-rose-800 dark:text-rose-200">{t('gallery.cards.misconceptionTitle')}</h4>
              <p className="text-xs text-rose-700 dark:text-rose-300 mt-1">{t('gallery.cards.misconceptionDesc')}</p>
            </Card>
            <Card variant="success" data-testid="card-success">
              <h4 className="font-display font-bold text-sm uppercase text-emerald-800 dark:text-emerald-200">{t('gallery.cards.successTitle')}</h4>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">{t('gallery.cards.successDesc')}</p>
            </Card>
          </div>
        </div>

        {/* StepDots & ProgressBars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div data-testid="section-steppers" className="space-y-3 p-4 bg-white dark:bg-[#131B2A] border-2 border-black dark:border-slate-700">
            <h3 className="font-mono font-bold text-xs uppercase text-gray-700 dark:text-gray-300">{t('gallery.sectionSteppers')}</h3>
            <div className="space-y-3">
              <StepDots
                totalSteps={6}
                currentStepIndex={stepDotIdx}
                completedStepIndices={[0, 1]}
                onSelectStep={setStepDotIdx}
                data-testid="stepdots-interactive"
              />
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-[11px] font-mono text-gray-700 dark:text-gray-300 block mb-1">
                  {locale === 'tr' ? 'Tamamlanmış Durum:' : locale === 'ar' ? 'حالة الاكتمال:' : 'Completed State:'}
                </span>
                <StepDots
                  totalSteps={5}
                  currentStepIndex={4}
                  completedStepIndices={[0, 1, 2, 3, 4]}
                  data-testid="stepdots-completed"
                />
              </div>
            </div>
            <p className="text-[11px] font-mono text-gray-700 dark:text-gray-300">
              {locale === 'tr' ? 'Aktif adımı değiştirmek için bir noktaya tıklayın.' : locale === 'ar' ? 'انقر على النقطة لتغيير الخطوة النشطة.' : 'Click a dot to change active step.'}
            </p>
          </div>

          <div data-testid="section-progress" className="space-y-3 p-4 bg-white dark:bg-[#131B2A] border-2 border-black dark:border-slate-700">
            <h3 className="font-mono font-bold text-xs uppercase text-gray-700 dark:text-gray-300">{t('gallery.sectionProgress')}</h3>
            <div className="space-y-3">
              <ProgressBar
                value={68}
                label={locale === 'tr' ? 'Ders İlerlemesi (Devam Ediyor)' : locale === 'ar' ? 'تقدم المسار (قيد الإنجاز)' : 'Course Progress (In Progress)'}
                variant="green"
                data-testid="progress-in-progress"
              />
              <ProgressBar
                value={100}
                label={locale === 'tr' ? 'Modül Ustalığı (Tamamlandı)' : locale === 'ar' ? 'إتقان الموديول (مكتمل)' : 'Module Mastery (Completed)'}
                variant="green"
                data-testid="progress-completed"
              />
              <ProgressBar
                value={40}
                label={locale === 'tr' ? 'Tanısal Doğruluk (Küçük)' : locale === 'ar' ? 'الدقة التشخيصية (صغير)' : 'Diagnostic Accuracy (Small)'}
                variant="yellow"
                size="sm"
                data-testid="progress-small"
              />
            </div>
          </div>
        </div>

        {/* Form Controls: Input, Slider, Toggle across all states */}
        <div className="space-y-4">
          <h3 className="font-mono font-bold text-xs uppercase text-gray-700 dark:text-gray-300">
            {t('gallery.sectionFormControls')}
          </h3>
          <div data-testid="section-form-controls" className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4 bg-white dark:bg-[#131B2A] border-3 border-black dark:border-slate-700 shadow-neo dark:shadow-neo-dark">
            <div className="space-y-4">
              <Input
                label={t('gallery.formControls.phLabel')}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                helperText={t('gallery.formControls.phHelper')}
                data-testid="input-default"
              />
              <Input
                label={t('gallery.formControls.pkaLabel')}
                value="99.9"
                error={t('gallery.formControls.pkaError')}
                data-testid="input-error"
                readOnly
              />
              <Input
                label={t('gallery.formControls.avogadroLabel')}
                value="6.022e23 mol⁻¹"
                disabled
                data-testid="input-disabled"
              />
            </div>

            <div className="space-y-6">
              <Slider
                label={t('gallery.formControls.concLabel')}
                value={sliderVal}
                min={0}
                max={100}
                unit="μM"
                onChange={setSliderVal}
                data-testid="slider-default"
              />
              <Slider
                label={t('gallery.formControls.receptorLabel')}
                value={25}
                min={0}
                max={100}
                unit="fmol/mg"
                disabled
                onChange={() => {}}
                data-testid="slider-disabled"
              />
            </div>

            <div className="flex flex-col justify-center space-y-4">
              <Toggle
                label={t('gallery.formControls.simToggle')}
                checked={toggleVal}
                onChange={setToggleVal}
                data-testid="toggle-checked"
              />
              <Toggle
                label={t('gallery.formControls.compToggle')}
                checked={false}
                onChange={() => {}}
                data-testid="toggle-unchecked"
              />
              <Toggle
                label={t('gallery.formControls.allostericToggle')}
                checked={true}
                disabled
                onChange={() => {}}
                data-testid="toggle-disabled"
              />
            </div>
          </div>
        </div>

        {/* Empty State & Skeleton Loader */}
        <div data-testid="section-empty-skeleton" className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div data-testid="state-empty">
            <EmptyState
              icon={<BookOpen className="w-8 h-8" />}
              title={t('gallery.emptyReviewTitle')}
              description={t('gallery.emptyReviewDesc')}
              actionLabel={t('gallery.emptyReviewAction')}
              onAction={() => alert('Navigating to next module!')}
            />
          </div>

          <div
            data-testid="state-loading"
            className="space-y-4 p-6 bg-white dark:bg-[#131B2A] border-3 border-black dark:border-slate-700 shadow-neo dark:shadow-neo-dark flex flex-col justify-center"
          >
            <span className="text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300">
              {t('gallery.skeletonTitle')}
            </span>
            <SkeletonLoader height="h-8" />
            <SkeletonLoader height="h-16" />
            <SkeletonLoader height="h-10" />
          </div>
        </div>
      </section>

      {/* Paywall Modal Instance */}
      <PaywallModal
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        canStartTrial={true}
        onStartTrial={() => {
          alert(t('pricing.trialActivatedAlert'));
          setIsPaywallOpen(false);
        }}
        onSelectPlan={(plan, curr, isBundle) => {
          alert(`Proceeding to checkout: ${plan} (${curr}), Bundle: ${isBundle}`);
          setIsPaywallOpen(false);
        }}
      />
    </div>
  );
};
