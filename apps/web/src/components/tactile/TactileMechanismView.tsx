import React, { useState } from 'react';
import {
  MechanismChallenge,
  MechanismFadingStage,
  ValenceValidationResponse
} from '../../types/tactileMechanism.types';
import {
  DRUG_SCAFFOLDS,
  MECHANISM_CHALLENGES
} from '../../data/tactileMechanisms.data';
import { TactileArrowCanvas } from './TactileArrowCanvas';
import { SubstituentSnapPalette } from './SubstituentSnapPalette';

type TactileMode = 'arrow_pushing' | 'sar_snapping';

export const TactileMechanismView: React.FC = () => {
  const [activeMode, setActiveMode] = useState<TactileMode>('arrow_pushing');

  // Selected mechanism challenge in arrow pushing mode
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(
    MECHANISM_CHALLENGES[0]?.id || ''
  );
  const [fadingStage, setFadingStage] = useState<MechanismFadingStage>('STAGE_DEMO');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [unlockedHintTier, setUnlockedHintTier] = useState<number>(0);
  const [lastValidation, setLastValidation] = useState<ValenceValidationResponse | null>(null);

  // Selected scaffold in SAR snapping mode
  const [selectedScaffoldId, setSelectedScaffoldId] = useState<string>(
    DRUG_SCAFFOLDS[0]?.id || ''
  );

  const activeChallenge =
    MECHANISM_CHALLENGES.find((c) => c.id === selectedChallengeId) || MECHANISM_CHALLENGES[0]!;

  const activeScaffold =
    DRUG_SCAFFOLDS.find((s) => s.id === selectedScaffoldId) || DRUG_SCAFFOLDS[0]!;

  const currentStep = activeChallenge.steps[currentStepIndex] || activeChallenge.steps[0]!;

  const handleChallengeChange = (challengeId: string) => {
    setSelectedChallengeId(challengeId);
    setFadingStage('STAGE_DEMO');
    setCurrentStepIndex(0);
    setUnlockedHintTier(0);
    setLastValidation(null);
  };

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 text-neutral-100"
      data-testid="tactile-mechanism-view"
    >
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-[#2C2C2C] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Pillar 3: Çizerek Öğren ✍️
            </span>
            <span className="text-xs text-neutral-400">
              Farmasötik Kimya I & II
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Taktil Reaksiyon Mekanizmaları & SAR Çalışma Alanı
          </h1>
          <p className="text-xs text-neutral-400 mt-1 max-w-2xl leading-relaxed">
            Dokunmatik ekran veya Apple Pencil ile elektron akışı çizin; Texas Karbon (oktet aşımı) ve hipervalan P(V) geçiş hallerini motor-uzaysal olarak deneyimleyin.
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center p-1 bg-[#1C1C1C] rounded-xl border border-[#2E2E2E] self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveMode('arrow_pushing')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'arrow_pushing'
                ? 'bg-emerald-500 text-black shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-[#252525]'
            }`}
          >
            <span>🏹</span>
            <span>Elektron Oku Çizimi</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('sar_snapping')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'sar_snapping'
                ? 'bg-emerald-500 text-black shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-[#252525]'
            }`}
          >
            <span>🧩</span>
            <span>Sübstitüent Tak-Çıkar (SAR)</span>
          </button>
        </div>
      </div>

      {/* MODE 1: TACTILE ARROW PUSHING WORKSPACE */}
      {activeMode === 'arrow_pushing' && (
        <div className="space-y-6">
          {/* Challenge Selector Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-neutral-400 font-medium mr-1">Mekanizma Seç:</span>
            {MECHANISM_CHALLENGES.map((ch) => {
              const isSelected = ch.id === selectedChallengeId;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => handleChallengeChange(ch.id)}
                  className={`text-xs px-3.5 py-1.5 rounded-lg border transition-all ${
                    isSelected
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-semibold'
                      : 'bg-[#181818] border-[#2C2C2C] text-neutral-400 hover:text-white hover:bg-[#222222]'
                  }`}
                >
                  {ch.title}
                </button>
              );
            })}
          </div>

          {/* Main 2-Column Workstation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Tactile Arrow Canvas (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <TactileArrowCanvas
                challenge={activeChallenge}
                currentStepIndex={currentStepIndex}
                fadingStage={fadingStage}
                onFadingStageChange={setFadingStage}
                onValidationResult={setLastValidation}
              />

              {/* Chemical Driving Force Accordion */}
              <div className="bg-[#181818] p-4 rounded-xl border border-[#2E2E2E]">
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-200 mb-1.5">
                  <span className="text-emerald-400">⚡</span>
                  <span>Mekanizmanın Termodinamik & Kimyasal İtici Gücü:</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {activeChallenge.drivingForceExplanation}
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-400 border-t border-[#262626] pt-2">
                  <span>
                    Kaynak Deck: <strong className="text-neutral-300">{activeChallenge.sourceFile}</strong> (Slayt {activeChallenge.sourcePage})
                  </span>
                  <span className="font-mono text-emerald-400">
                    SMILES: {activeChallenge.reactantSmiles}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Socratic Feedback & 3-Tier Hint Ladder (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              {/* Socratic Hint Ladder Card */}
              <div className="bg-[#181818] p-4 rounded-xl border border-[#2E2E2E] space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                    Sokratik İpucu Merdiveni
                  </h3>
                  <span className="text-[11px] font-mono text-amber-400">
                    {unlockedHintTier}/3 Açıldı
                  </span>
                </div>

                <div className="space-y-2">
                  {currentStep.hintLadder.map((hint, idx) => {
                    const tierNumber = idx + 1;
                    const isUnlocked = unlockedHintTier >= tierNumber;
                    const tierTitles = ['Tier 1: Nudge (Hafif İtme)', 'Tier 2: Clue (Kimyasal İpucu)', 'Tier 3: Solution (Tam Çözüm)'];

                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border text-xs transition-all ${
                          isUnlocked
                            ? 'bg-[#222222] border-amber-500/40 text-neutral-200'
                            : 'bg-[#141414] border-[#252525] text-neutral-400'
                        }`}
                      >
                        <div className="font-semibold text-[11px] mb-1 text-amber-400/90">
                          {tierTitles[idx]}
                        </div>
                        {isUnlocked ? (
                          <div className="leading-relaxed">{hint}</div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setUnlockedHintTier(tierNumber)}
                            className="text-xs text-neutral-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
                          >
                            <span>🔒 İpucunu Aç ({tierTitles[idx]?.split(' ')[0]})</span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Canonical Trap Warning Box */}
              <div className="bg-[#1C1518] p-4 rounded-xl border border-rose-900/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                  <span>🚨</span>
                  <span>Klasik Sınav Tuzağı ({activeChallenge.canonicalTrapCode})</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Öğrencilerin en sık yaptığı hata: Karbonil karbonuna saldırırken çift bağı açmamak ve Texas Karbon (5 bağ) çizmektir.
                  Marmara ve Hacettepe sınavlarında bu hata doğrudan basamak puanını sıfırlar.
                </p>
              </div>

              {/* Progress Summary Pill */}
              <div className="bg-[#141414] p-3 rounded-xl border border-[#262626] flex items-center justify-between text-xs text-neutral-400">
                <span>Ara Ürün Hedefi:</span>
                <strong className="text-emerald-400">{currentStep.intermediateName}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: SAR SUBSTITUENT SNAPPING WORKSPACE */}
      {activeMode === 'sar_snapping' && (
        <div className="space-y-6">
          {/* Scaffold Selector Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-neutral-400 font-medium mr-1">İskelet Seç:</span>
            {DRUG_SCAFFOLDS.map((sc) => {
              const isSelected = sc.id === selectedScaffoldId;
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setSelectedScaffoldId(sc.id)}
                  className={`text-xs px-3.5 py-1.5 rounded-lg border transition-all ${
                    isSelected
                      ? 'bg-blue-950/60 border-blue-500 text-blue-300 font-semibold'
                      : 'bg-[#181818] border-[#2C2C2C] text-neutral-400 hover:text-white hover:bg-[#222222]'
                  }`}
                >
                  {sc.name}
                </button>
              );
            })}
          </div>

          {/* Mount Substituent Snap Palette */}
          <SubstituentSnapPalette scaffold={activeScaffold} />

          {/* Clinical Context & Exam Comparison Box */}
          <div className="bg-[#181818] p-5 rounded-2xl border border-[#2E2E2E] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <span>📚</span>
              <span>Klinik Önemi & Sınav Karşılaştırması</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {activeScaffold.clinicalContext}
            </p>
            <div className="text-[11px] text-neutral-400 pt-2 border-t border-[#262626] flex items-center justify-between">
              <span>{activeScaffold.description}</span>
              <span className="font-mono text-neutral-400">
                Hammett Reaksiyon Sabiti (ρ): {activeScaffold.reactionRho}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
