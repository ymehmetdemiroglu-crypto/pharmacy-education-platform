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
  const { t } = useTranslation();
  const [sliderVal, setSliderVal] = useState(50);
  const [toggleVal, setToggleVal] = useState(true);
  const [inputVal, setInputVal] = useState('7.4');
  const [stepDotIdx, setStepDotIdx] = useState(2);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [activeWidgetTab, setActiveWidgetTab] = useState<string>('sar');

  const widgets = [
    { id: 'sar', name: 'SAR Explorer', component: <SarExplorer config={sarExplorerStandardDemo} /> },
    { id: 'ionization', name: 'Ionization Equilibrium', component: <IonizationEquilibriumSlider config={ionizationEquilibriumStandardDemo} /> },
    { id: 'membrane-partition', name: 'Membrane Partition (logD)', component: <MembranePartitionSimulator config={membranePartitionStandardDemo} /> },
    { id: 'ferguson', name: 'Ferguson Activity Slider', component: <ThermodynamicActivityFergusonSlider config={thermodynamicActivityFergusonStandardDemo} /> },
    { id: 'structure', name: 'Structure Identifier', component: <StructureIdentifier config={structureIdentifierStandardDemo} /> },
    { id: 'dose-response', name: 'Dose-Response Curve', component: <DoseResponseCurve config={doseResponseCurveStandardDemo} /> },
    { id: 'pk', name: 'PK Simulator', component: <PkSimulator config={pkSimulatorStandardDemo} /> },
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
          <h2 className="font-display font-black text-xl uppercase tracking-tight">1. Trial & Plan Banners</h2>
          <p className="text-xs text-gray-600 dark:text-gray-400">Header banners displaying student subscription and trial state.</p>
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
            <h2 className="font-display font-black text-xl uppercase tracking-tight">2. Interactive Pharmacy Widgets</h2>
            <p className="text-xs text-gray-600 dark:text-gray-400">Data-driven, accessible widgets with Zod configuration and event emission.</p>
          </div>
          <StickerBadge variant="orange" size="sm">9 Dedicated Widgets</StickerBadge>
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
          <h2 className="font-display font-black text-xl uppercase tracking-tight">3. Neo-Brutalist UI Primitives</h2>
          <p className="text-xs text-gray-600 dark:text-gray-400">Tactile, high-contrast building blocks adhering to 3px borders and 6px shadows.</p>
        </div>

        {/* Buttons Grid with State Matrix */}
        <div data-testid="section-buttons" className="space-y-3">
          <h3 className="font-mono font-bold text-xs uppercase text-gray-700 dark:text-gray-300">Buttons & State Matrix (Default, Hover, Focus, Disabled, Loading)</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" data-testid="btn-default">Default (Primary)</Button>
            <Button variant="secondary" data-testid="btn-secondary">Secondary</Button>
            <Button variant="success" data-testid="btn-success">Success</Button>
            <Button variant="danger" data-testid="btn-danger">Danger</Button>
            <Button variant="medchem">MedChem</Button>
            <Button variant="pharm">Pharm</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" disabled data-testid="btn-disabled">Disabled State</Button>
            <Button variant="primary" isLoading data-testid="btn-loading">Loading State</Button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="space-y-3">
          <h3 className="font-mono font-bold text-xs uppercase text-gray-700 dark:text-gray-300">Cards & Surface Containers (Default, Highlight, Misconception, Success)</h3>
          <div data-testid="section-cards" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Card variant="default" data-testid="card-default">
              <h4 className="font-display font-bold text-sm uppercase">Default Card</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">3px black border, 6px hard shadow.</p>
            </Card>
            <Card variant="highlight" data-testid="card-highlight">
              <h4 className="font-display font-bold text-sm uppercase">Highlight Card</h4>
              <p className="text-xs text-black dark:text-amber-200 mt-1">Yellow surface for key rules and checkpoints.</p>
            </Card>
            <Card variant="misconception" data-testid="card-misconception">
              <h4 className="font-display font-bold text-sm uppercase text-rose-800 dark:text-rose-200">Misconception Card</h4>
              <p className="text-xs text-rose-700 dark:text-rose-300 mt-1">Targeted feedback on cognitive traps.</p>
            </Card>
            <Card variant="success" data-testid="card-success">
              <h4 className="font-display font-bold text-sm uppercase text-emerald-800 dark:text-emerald-200">Success Card</h4>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">Positive reinforcement & mastery verified.</p>
            </Card>
          </div>
        </div>

        {/* StepDots & ProgressBars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div data-testid="section-steppers" className="space-y-3 p-4 bg-white dark:bg-[#131B2A] border-2 border-black dark:border-slate-700">
            <h3 className="font-mono font-bold text-xs uppercase text-gray-700 dark:text-gray-300">StepDots Stepper (Default, Active, Completed)</h3>
            <div className="space-y-3">
              <StepDots
                totalSteps={6}
                currentStepIndex={stepDotIdx}
                completedStepIndices={[0, 1]}
                onSelectStep={setStepDotIdx}
                data-testid="stepdots-interactive"
              />
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-[11px] font-mono text-gray-700 dark:text-gray-300 block mb-1">Completed State:</span>
                <StepDots
                  totalSteps={5}
                  currentStepIndex={4}
                  completedStepIndices={[0, 1, 2, 3, 4]}
                  data-testid="stepdots-completed"
                />
              </div>
            </div>
            <p className="text-[11px] font-mono text-gray-700 dark:text-gray-300">Click a dot to change active step.</p>
          </div>

          <div data-testid="section-progress" className="space-y-3 p-4 bg-white dark:bg-[#131B2A] border-2 border-black dark:border-slate-700">
            <h3 className="font-mono font-bold text-xs uppercase text-gray-700 dark:text-gray-300">Progress Bars (In-Progress, Completed, Small)</h3>
            <div className="space-y-3">
              <ProgressBar value={68} label="Course Progress (In Progress)" variant="green" data-testid="progress-in-progress" />
              <ProgressBar value={100} label="Module Mastery (Completed)" variant="green" data-testid="progress-completed" />
              <ProgressBar value={40} label="Diagnostic Accuracy (Small)" variant="yellow" size="sm" data-testid="progress-small" />
            </div>
          </div>
        </div>

        {/* Form Controls: Input, Slider, Toggle across all states */}
        <div className="space-y-4">
          <h3 className="font-mono font-bold text-xs uppercase text-gray-700 dark:text-gray-300">
            Form Controls State Matrix (Default, Focus, Error, Disabled)
          </h3>
          <div data-testid="section-form-controls" className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4 bg-white dark:bg-[#131B2A] border-3 border-black dark:border-slate-700 shadow-neo dark:shadow-neo-dark">
            <div className="space-y-4">
              <Input
                label="Physiological pH (Default)"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                helperText="Standard buffer range 7.35–7.45"
                data-testid="input-default"
              />
              <Input
                label="Acid Dissociation Constant (Error State)"
                value="99.9"
                error="Value exceeds valid aqueous pKa spectrum (-2 to 16)"
                data-testid="input-error"
                readOnly
              />
              <Input
                label="Avogadro Constant (Disabled State)"
                value="6.022e23 mol⁻¹"
                disabled
                data-testid="input-disabled"
              />
            </div>

            <div className="space-y-6">
              <Slider
                label="Drug Concentration (Default)"
                value={sliderVal}
                min={0}
                max={100}
                unit="μM"
                onChange={setSliderVal}
                data-testid="slider-default"
              />
              <Slider
                label="Receptor Density (Disabled State)"
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
                label="Real-Time Simulation (Default / Checked)"
                checked={toggleVal}
                onChange={setToggleVal}
                data-testid="toggle-checked"
              />
              <Toggle
                label="Subcellular Compartmentalization (Unchecked)"
                checked={false}
                onChange={() => {}}
                data-testid="toggle-unchecked"
              />
              <Toggle
                label="Allosteric Cooperative Binding (Disabled)"
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
              title="Review Queue Empty"
              description="You have cleared all active Leitner spaced review cards for today. Keep up the high retention!"
              actionLabel="Start New Module"
              onAction={() => alert('Navigating to next module!')}
            />
          </div>

          <div
            data-testid="state-loading"
            className="space-y-4 p-6 bg-white dark:bg-[#131B2A] border-3 border-black dark:border-slate-700 shadow-neo dark:shadow-neo-dark flex flex-col justify-center"
          >
            <span className="text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300">Skeleton Loaders (Loading State — Zero CLS)</span>
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
          alert('7-Day Free Trial Activated!');
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
