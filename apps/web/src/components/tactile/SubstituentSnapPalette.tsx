import React, { useMemo, useState } from 'react';
import {
  DrugScaffold,
  SubstituentType
} from '../../types/tactileMechanism.types';
import {
  calculateSarProperties,
  SUBSTITUENT_CATALOG
} from '../../services/valenceOctetEngine';

interface SubstituentSnapPaletteProps {
  scaffold: DrugScaffold;
  onSubstituentChange?: (positionId: string, substituent: SubstituentType) => void;
}

export const SubstituentSnapPalette: React.FC<SubstituentSnapPaletteProps> = ({
  scaffold,
  onSubstituentChange
}) => {
  // Map of position ID to selected substituent
  const [activeSubstituents, setActiveSubstituents] = useState<Record<string, SubstituentType>>(() => {
    const initial: Record<string, SubstituentType> = {};
    for (const pos of scaffold.positions) {
      initial[pos.id] = pos.currentSubstituent;
    }
    return initial;
  });

  // Currently focused hotspot on the chemical structure
  const [selectedPositionId, setSelectedPositionId] = useState<string>(
    scaffold.positions[0]?.id || ''
  );

  // Active SAR calculations
  const sarResult = useMemo(() => {
    return calculateSarProperties(scaffold, activeSubstituents);
  }, [scaffold, activeSubstituents]);

  const handleApplySubstituent = (subType: SubstituentType) => {
    if (!selectedPositionId) return;

    const updated = {
      ...activeSubstituents,
      [selectedPositionId]: subType
    };
    setActiveSubstituents(updated);
    onSubstituentChange?.(selectedPositionId, subType);

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(15);
    }
  };

  const handleResetToBaseline = () => {
    const resetMap: Record<string, SubstituentType> = {};
    for (const pos of scaffold.positions) {
      resetMap[pos.id] = pos.currentSubstituent;
    }
    setActiveSubstituents(resetMap);
  };

  const selectedPosition = scaffold.positions.find((p) => p.id === selectedPositionId);

  return (
    <div
      className="flex flex-col bg-[#1A1A1A] border-2 border-[#2E2E2E] rounded-2xl overflow-hidden shadow-2xl"
      data-testid="substituent-snap-palette"
    >
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-[#212121] border-b border-[#2E2E2E] gap-2">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30">
            {scaffold.drugClass}
          </span>
          <h3 className="text-sm font-semibold text-white tracking-wide mt-1">
            {scaffold.name}
          </h3>
        </div>
        <button
          type="button"
          onClick={handleResetToBaseline}
          className="text-xs px-3 py-1.5 rounded-lg bg-[#282828] hover:bg-[#333333] text-neutral-300 transition-colors"
        >
          🔄 Varsayılana Dön
        </button>
      </div>

      {/* 2-Column SAR Workstation: Left Scaffold & Hotspots, Right Real-Time Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-[#2E2E2E]">
        {/* Left: 2D Chemical Scaffold & Hotspots (7 cols) */}
        <div className="lg:col-span-7 p-5 bg-[#141414] border-b lg:border-b-0 lg:border-r border-[#2E2E2E] flex flex-col justify-between">
          <div className="text-xs text-neutral-400 mb-3 flex items-center justify-between">
            <span>Bağlanma Konumu Seçin:</span>
            <span className="font-mono text-[11px] text-neutral-400">
              Seçili: <strong className="text-emerald-400">{selectedPosition?.label || 'Yok'}</strong>
            </span>
          </div>

          {/* Scaffold Hotspot Visualizer */}
          <div className="relative w-full h-[230px] bg-[#181818] rounded-xl border border-[#262626] overflow-hidden flex items-center justify-center p-3">
            <svg viewBox="0 0 460 220" className="w-full h-full">
              {/* Scaffold skeletal representation lines */}
              <path
                d="M 120 110 L 160 85 L 200 110 L 200 155 L 160 180 L 120 155 Z"
                fill="#202020"
                stroke="#404040"
                strokeWidth="3"
              />
              <circle cx="160" cy="132" r="22" fill="none" stroke="#404040" strokeWidth="2" strokeDasharray="5 3" />
              {/* Chain links */}
              <line x1="200" y1="132" x2="260" y2="132" stroke="#404040" strokeWidth="3" />
              <line x1="260" y1="132" x2="290" y2="105" stroke="#404040" strokeWidth="3" />
              <line x1="290" y1="105" x2="330" y2="132" stroke="#404040" strokeWidth="3" />
              <line x1="330" y1="132" x2="380" y2="132" stroke="#404040" strokeWidth="3" />

              {/* Position Hotspot Buttons */}
              {scaffold.positions.map((pos) => {
                const currentSub = activeSubstituents[pos.id] || pos.currentSubstituent;
                const subItem = SUBSTITUENT_CATALOG[currentSub];
                const isSelected = selectedPositionId === pos.id;

                return (
                  <g
                    key={pos.id}
                    className="cursor-pointer transition-all duration-150"
                    onClick={() => setSelectedPositionId(pos.id)}
                  >
                    {isSelected && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="24"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2.5"
                        strokeDasharray="4 2"
                        className="animate-spin"
                        style={{ animationDuration: '8s' }}
                      />
                    )}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="18"
                      fill={isSelected ? '#10B981' : '#262626'}
                      stroke={subItem.badgeColor}
                      strokeWidth="2.5"
                    />
                    <text
                      x={pos.x}
                      y={pos.y + 4}
                      textAnchor="middle"
                      fill={isSelected ? '#000000' : '#FFFFFF'}
                      fontSize="10px"
                      fontWeight="bold"
                      fontFamily="monospace"
                      className="pointer-events-none select-none"
                    >
                      {subItem.formula}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Selected Hotspot Details */}
          <div className="mt-3 flex items-center justify-between text-xs bg-[#1C1C1C] px-3 py-2 rounded-lg border border-[#2E2E2E]">
            <span className="text-neutral-400">
              Konum: <strong className="text-neutral-200">{selectedPosition?.label}</strong>
            </span>
            <span className="text-neutral-400">
              Bağlı Grup:{' '}
              <strong style={{ color: selectedPosition ? SUBSTITUENT_CATALOG[activeSubstituents[selectedPosition.id] || selectedPosition.currentSubstituent].badgeColor : '#fff' }}>
                {selectedPosition
                  ? SUBSTITUENT_CATALOG[activeSubstituents[selectedPosition.id] || selectedPosition.currentSubstituent].name
                  : ''}
              </strong>
            </span>
          </div>
        </div>

        {/* Right: Real-Time Physicochemical Gauges (5 cols) */}
        <div className="lg:col-span-5 p-5 bg-[#181818] flex flex-col justify-between space-y-4">
          <div className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
            Biyofiziksel & SAR Göstergeleri
          </div>

          <div className="space-y-3.5">
            {/* LogP Meter */}
            <div className="bg-[#1F1F1F] p-3 rounded-xl border border-[#2E2E2E]">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-neutral-300 font-medium">Lipofilisite (log P):</span>
                <span className="font-mono font-bold text-sm text-emerald-400">
                  {sarResult.calculatedLogP}
                  <span className="text-[11px] font-normal text-neutral-400 ml-1">
                    ({sarResult.deltaLogP >= 0 ? `+${sarResult.deltaLogP}` : sarResult.deltaLogP})
                  </span>
                </span>
              </div>
              <div className="w-full h-2 bg-[#2D2D2D] rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, Math.max(10, ((sarResult.calculatedLogP + 1) / 6) * 100))}%`
                  }}
                />
              </div>
            </div>

            {/* pKa Meter */}
            <div className="bg-[#1F1F1F] p-3 rounded-xl border border-[#2E2E2E]">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-neutral-300 font-medium">Asitlik/Bazisite (pKa):</span>
                <span className="font-mono font-bold text-sm text-blue-400">
                  {sarResult.calculatedPka}
                  <span className="text-[11px] font-normal text-neutral-400 ml-1">
                    ({sarResult.deltaPka >= 0 ? `+${sarResult.deltaPka}` : sarResult.deltaPka})
                  </span>
                </span>
              </div>
              <div className="w-full h-2 bg-[#2D2D2D] rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, Math.max(10, (sarResult.calculatedPka / 14) * 100))}%`
                  }}
                />
              </div>
            </div>

            {/* Half-Life & Receptor Affinity Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-[#1F1F1F] p-2.5 rounded-xl border border-[#2E2E2E] text-center">
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider mb-1">
                  Yarılanma Ömrü
                </div>
                <div className="text-base font-bold font-mono text-amber-400">
                  {sarResult.estimatedHalfLifeHours} sa
                </div>
                <div className="text-[9px] text-neutral-400 mt-0.5">Enzimatik stabilite</div>
              </div>

              <div className="bg-[#1F1F1F] p-2.5 rounded-xl border border-[#2E2E2E] text-center">
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider mb-1">
                  Reseptör Afinitesi
                </div>
                <div className="text-base font-bold font-mono text-purple-400">
                  %{sarResult.receptorAffinityScore}
                </div>
                <div className="text-[9px] text-neutral-400 mt-0.5">Hedef cebi uyumu</div>
              </div>
            </div>

            {/* Clinical interpretation statement */}
            <div className="text-[11px] text-neutral-300 bg-[#242424] p-2.5 rounded-lg border border-[#2F2F2F] leading-relaxed">
              💡 {sarResult.clinicalSummary}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Substituent Palette (8 Chips) */}
      <div className="p-4 bg-[#1F1F1F]">
        <div className="text-xs font-semibold text-neutral-300 mb-2.5 flex items-center justify-between">
          <span>Fonksiyonel Grup Paleti (Seçili Konuma Ekle):</span>
          <span className="text-[11px] text-neutral-400">Hammett σ & Wildman-Crippen ΔlogP</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {(Object.keys(SUBSTITUENT_CATALOG) as SubstituentType[]).map((subKey) => {
            const item = SUBSTITUENT_CATALOG[subKey];
            const isCurrentlyApplied =
              selectedPosition && activeSubstituents[selectedPosition.id] === subKey;

            return (
              <button
                key={subKey}
                type="button"
                onClick={() => handleApplySubstituent(subKey)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                  isCurrentlyApplied
                    ? 'bg-neutral-800 border-emerald-400 ring-2 ring-emerald-500/30'
                    : 'bg-[#171717] border-[#2C2C2C] hover:border-neutral-500 hover:bg-[#222222]'
                }`}
              >
                <span
                  className="font-mono font-bold text-xs px-2 py-0.5 rounded mb-1"
                  style={{
                    backgroundColor: `${item.badgeColor}20`,
                    color: item.badgeColor
                  }}
                >
                  {item.formula}
                </span>
                <span className="text-[11px] font-medium text-neutral-200 truncate w-full">
                  {item.name}
                </span>
                <span className="text-[9px] font-mono text-neutral-400 mt-0.5">
                  ΔlogP: {item.wildmanCrippenLogP >= 0 ? `+${item.wildmanCrippenLogP}` : item.wildmanCrippenLogP}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
