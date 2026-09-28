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
} from '@pharmacy/widgets';
import { BookOpen, Sparkles } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [sliderVal, setSliderVal] = useState(50);
  const [toggleVal, setToggleVal] = useState(true);
  const [inputVal, setInputVal] = useState('7.4');
  const [stepDotIdx, setStepDotIdx] = useState(2);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [activeWidgetTab, setActiveWidgetTab] = useState<string>('sar');

  const widgets = [
    { id: 'sar', name: 'SAR Explorer', component: <SarExplorer config={sarExplorerStandardDemo} /> },
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
      <section className="bg-[#FFF8E7] dark:bg-[#121212] border-b-3 border-black dark:border-white py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <StickerBadge variant="black" size="sm">Design System & Component Gallery</StickerBadge>
            <StickerBadge variant="green" size="sm">Commercial Grade</StickerBadge>
            <StickerBadge variant="yellow" size="sm">Neo-Brutalist</StickerBadge>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-black dark:text-white">
            Pharmacy Interactive Gallery
          </h1>
          <p className="font-body text-base sm:text-lg text-gray-800 dark:text-gray-200 max-w-3xl leading-relaxed">
            A comprehensive, battle-tested suite of accessible Neo-Brutalist UI components and domain-specific interactive pharmacy widgets designed for active, learn-by-doing education.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => setIsPaywallOpen(true)} leftIcon={<Sparkles className="w-4 h-4" />}>
              Open Paywall & Pass Modal
            </Button>
          </div>
        </div>
      </section>

      {/* Trial Banners Showcase */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="border-b-2 border-black/20 dark:border-white/20 pb-2">
          <h2 className="font-display font-black text-xl uppercase tracking-tight">1. Trial & Plan Banners</h2>
          <p className="text-xs text-gray-600 dark:text-gray-400">Header banners displaying student subscription and trial state.</p>
        </div>
        <div className="space-y-3">
          <TrialBanner status="free_preview" onActionClick={() => setIsPaywallOpen(true)} />
          <TrialBanner status="active_trial" daysRemaining={5} onActionClick={() => setIsPaywallOpen(true)} />
          <TrialBanner status="expired_trial" onActionClick={() => setIsPaywallOpen(true)} />
        </div>
      </section>

      {/* Interactive Pharmacy Widgets Showcase */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="border-b-2 border-black/20 dark:border-white/20 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase border-2 border-black dark:border-white transition-all ${
                activeWidgetTab === w.id
                  ? 'bg-[#FFD93D] text-black shadow-[3px_3px_0px_#000000] scale-102'
                  : 'bg-white dark:bg-[#202020] text-black dark:text-white hover:bg-gray-100'
              }`}
            >
              {w.name}
            </button>
          ))}
        </div>

        {/* Active Widget Display */}
        <div className="p-2 sm:p-4 bg-gray-50 dark:bg-[#151515] border-3 border-black dark:border-white shadow-neo dark:shadow-neo-dark">
          {widgets.find((w) => w.id === activeWidgetTab)?.component}
        </div>
      </section>

      {/* Core UI Components Showcase */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="border-b-2 border-black/20 dark:border-white/20 pb-2">
          <h2 className="font-display font-black text-xl uppercase tracking-tight">3. Neo-Brutalist UI Primitives</h2>
          <p className="text-xs text-gray-600 dark:text-gray-400">Tactile, high-contrast building blocks adhering to 3px borders and 6px shadows.</p>
        </div>

        {/* Buttons Grid */}
        <div className="space-y-3">
          <h3 className="font-mono font-bold text-xs uppercase text-gray-500">Buttons & Variants</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary (Yellow)</Button>
            <Button variant="secondary">Secondary (White)</Button>
            <Button variant="success">Success (Green)</Button>
            <Button variant="danger">Danger (Pink)</Button>
            <Button variant="medchem">MedChem (Blue)</Button>
            <Button variant="pharm">Pharm (Orange)</Button>
            <Button variant="ghost">Ghost Border</Button>
            <Button variant="primary" disabled>Disabled State</Button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="space-y-3">
          <h3 className="font-mono font-bold text-xs uppercase text-gray-500">Cards & Surface Containers</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card variant="default">
              <h4 className="font-display font-bold text-sm uppercase">Default Card</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">3px black border, 6px hard shadow.</p>
            </Card>
            <Card variant="highlight">
              <h4 className="font-display font-bold text-sm uppercase">Highlight Card</h4>
              <p className="text-xs text-black mt-1">Yellow surface for key rules and checkpoints.</p>
            </Card>
            <Card variant="misconception">
              <h4 className="font-display font-bold text-sm uppercase text-rose-800 dark:text-rose-200">Misconception Card</h4>
              <p className="text-xs text-rose-700 dark:text-rose-300 mt-1">Targeted feedback on cognitive traps.</p>
            </Card>
          </div>
        </div>

        {/* StepDots & ProgressBars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3 p-4 bg-white dark:bg-[#1E1E1E] border-2 border-black dark:border-white">
            <h3 className="font-mono font-bold text-xs uppercase text-gray-500">StepDots Stepper</h3>
            <StepDots
              totalSteps={6}
              currentStepIndex={stepDotIdx}
              completedStepIndices={[0, 1]}
              onSelectStep={setStepDotIdx}
            />
            <p className="text-[11px] font-mono text-gray-500">Click a dot to change active step.</p>
          </div>

          <div className="space-y-3 p-4 bg-white dark:bg-[#1E1E1E] border-2 border-black dark:border-white">
            <h3 className="font-mono font-bold text-xs uppercase text-gray-500">Progress Bars</h3>
            <ProgressBar value={68} label="Course Progress" variant="green" />
            <ProgressBar value={40} label="Diagnostic Accuracy" variant="yellow" size="sm" />
          </div>
        </div>

        {/* Form Controls: Input, Slider, Toggle */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4 bg-white dark:bg-[#1E1E1E] border-3 border-black dark:border-white shadow-neo dark:shadow-neo-dark">
          <Input
            label="Physiological pH"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            helperText="Standard buffer range 7.35–7.45"
          />

          <Slider
            label="Concentration"
            value={sliderVal}
            min={0}
            max={100}
            unit="μM"
            onChange={setSliderVal}
          />

          <div className="flex flex-col justify-center">
            <Toggle
              label="Enable Real-Time Simulation"
              checked={toggleVal}
              onChange={setToggleVal}
            />
          </div>
        </div>

        {/* Empty State & Skeleton Loader */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <EmptyState
            icon={<BookOpen className="w-8 h-8" />}
            title="Review Queue Empty"
            description="You have cleared all active Leitner spaced review cards for today. Keep up the high retention!"
            actionLabel="Start New Module"
            onAction={() => alert('Navigating to next module!')}
          />

          <div className="space-y-4 p-6 bg-white dark:bg-[#1E1E1E] border-3 border-black dark:border-white shadow-neo dark:shadow-neo-dark flex flex-col justify-center">
            <span className="text-xs font-mono font-bold uppercase text-gray-500">Skeleton Loaders (No layout shift)</span>
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
