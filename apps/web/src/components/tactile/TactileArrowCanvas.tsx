import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  ChemicalPoint,
  CurvedArrow,
  MechanismChallenge,
  MechanismFadingStage,
  ValenceValidationResponse
} from '../../types/tactileMechanism.types';
import { validateElectronPush } from '../../services/valenceOctetEngine';

interface TactileArrowCanvasProps {
  challenge: MechanismChallenge;
  currentStepIndex?: number;
  fadingStage: MechanismFadingStage;
  onFadingStageChange?: (stage: MechanismFadingStage) => void;
  onValidationResult?: (result: ValenceValidationResponse) => void;
  onStepComplete?: () => void;
}

export const TactileArrowCanvas: React.FC<TactileArrowCanvasProps> = ({
  challenge,
  currentStepIndex = 0,
  fadingStage,
  onFadingStageChange,
  onValidationResult,
  onStepComplete
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Arrows drawn by the student in the current stage
  const [drawnArrows, setDrawnArrows] = useState<CurvedArrow[]>([]);
  // Currently active dragging stroke
  const [activeDrag, setActiveDrag] = useState<{
    donor: ChemicalPoint;
    currentX: number;
    currentY: number;
    snappedAcceptor: ChemicalPoint | null;
  } | null>(null);

  const [validationResponse, setValidationResponse] = useState<ValenceValidationResponse | null>(null);

  const currentStep = challenge.steps[currentStepIndex] || challenge.steps[0]!;

  // Pre-drawn scaffolded arrows depending on fading stage
  const scaffoldedArrows = useMemo(() => {
    if (fadingStage === 'STAGE_DEMO') {
      return challenge.demoArrows;
    }
    if (fadingStage === 'STAGE_FADED_1') {
      // Primary arrow is pre-drawn as a scaffold
      const demo1 = challenge.demoArrows[0];
      return demo1 ? [demo1] : [];
    }
    return [];
  }, [fadingStage, challenge.demoArrows]);

  // Combined visible arrows
  const visibleArrows = useMemo(() => {
    return [...scaffoldedArrows, ...drawnArrows];
  }, [scaffoldedArrows, drawnArrows]);

  // Utility to convert pointer coordinates to SVG coordinate space
  const getSvgCoordinates = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = 500 / rect.width;
    const scaleY = 320 / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }, []);

  // Find nearest chemical point within snap distance (56px)
  const findNearestPoint = useCallback(
    (x: number, y: number, excludeId?: string): ChemicalPoint | null => {
      let closest: ChemicalPoint | null = null;
      let minDistance = 48; // max snap radius in SVG units

      for (const pt of challenge.initialPoints) {
        if (excludeId && pt.id === excludeId) continue;
        const dx = pt.x - x;
        const dy = pt.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDistance) {
          minDistance = dist;
          closest = pt;
        }
      }
      return closest;
    },
    [challenge.initialPoints]
  );

  // Calculate Bézier control point with perpendicular offset
  const calculateBezierControl = useCallback(
    (p0: { x: number; y: number }, p1: { x: number; y: number }) => {
      const mx = (p0.x + p1.x) / 2;
      const my = (p0.y + p1.y) / 2;
      const dx = p1.x - p0.x;
      const dy = p1.y - p0.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;

      // Normal perpendicular vector
      const nx = -dy / dist;
      const ny = dx / dist;

      // 0.25 curvature factor
      const h = 0.25 * dist;
      return {
        x: mx + nx * h,
        y: my + ny * h
      };
    },
    []
  );

  // Pointer event handlers for drawing arrows
  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (fadingStage === 'STAGE_DEMO') return;
    (e.target as Element).setPointerCapture?.(e.pointerId);

    const { x, y } = getSvgCoordinates(e);
    const donor = findNearestPoint(x, y);

    if (donor) {
      setActiveDrag({
        donor,
        currentX: x,
        currentY: y,
        snappedAcceptor: null
      });
    }
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!activeDrag) return;
    const { x, y } = getSvgCoordinates(e);
    const nearestAcceptor = findNearestPoint(x, y, activeDrag.donor.id);

    setActiveDrag((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        currentX: x,
        currentY: y,
        snappedAcceptor: nearestAcceptor
      };
    });
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!activeDrag) return;
    (e.target as Element).releasePointerCapture?.(e.pointerId);

    const { donor, snappedAcceptor, currentX, currentY } = activeDrag;
    setActiveDrag(null);

    // If snapped to an acceptor different from donor, finalize the arrow
    if (snappedAcceptor && snappedAcceptor.id !== donor.id) {
      const p0 = { x: donor.x, y: donor.y };
      const p1 = { x: snappedAcceptor.x, y: snappedAcceptor.y };
      const pCtrl = calculateBezierControl(p0, p1);

      const newArrow: CurvedArrow = {
        id: `arrow_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        donor,
        acceptor: snappedAcceptor,
        arrowType: 'ELECTRON_PAIR',
        p0,
        pCtrl,
        p1,
        isSnapped: true,
        snapDistancePx: 56
      };

      const updatedArrows = [...drawnArrows, newArrow];
      setDrawnArrows(updatedArrows);

      // Trigger soft click vibration
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate?.(15);
      }
    }
  };

  const handlePointerCancel = () => {
    setActiveDrag(null);
  };

  // Perform validation of the drawn mechanism
  const handleValidateMechanism = () => {
    const totalArrows = [...scaffoldedArrows, ...drawnArrows];
    const result = validateElectronPush(totalArrows, challenge, currentStepIndex);
    setValidationResponse(result);
    onValidationResult?.(result);

    if (result.isValid) {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate?.(25);
      }
      onStepComplete?.();
    } else {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate?.([30, 20, 30]);
      }
    }
  };

  const handleUndoArrow = () => {
    setDrawnArrows((prev) => prev.slice(0, -1));
    setValidationResponse(null);
  };

  const handleResetCanvas = () => {
    setDrawnArrows([]);
    setValidationResponse(null);
  };

  return (
    <div
      className="flex flex-col bg-[#1A1A1A] border-2 border-[#2E2E2E] rounded-2xl overflow-hidden shadow-2xl select-none"
      data-testid="tactile-arrow-canvas"
    >
      {/* Top Header & Fading Stage Indicator */}
      <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-[#212121] border-b border-[#2E2E2E] gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            {challenge.canonicalTrapCode}
          </span>
          <h3 className="text-sm font-semibold text-white tracking-wide truncate max-w-xs md:max-w-md">
            {challenge.title}
          </h3>
        </div>

        {/* Fading Stage Pills */}
        <div className="flex items-center gap-1.5 bg-[#141414] p-1 rounded-lg border border-[#2E2E2E]">
          {(
            [
              { key: 'STAGE_DEMO', label: '1. Demo' },
              { key: 'STAGE_FADED_1', label: '2. Yarı İpucu' },
              { key: 'STAGE_FADED_2', label: '3. Hedefli' },
              { key: 'STAGE_INDEPENDENT', label: '4. Bağımsız' }
            ] as const
          ).map((stage) => {
            const isActive = fadingStage === stage.key;
            return (
              <button
                key={stage.key}
                type="button"
                onClick={() => {
                  onFadingStageChange?.(stage.key);
                  setDrawnArrows([]);
                  setValidationResponse(null);
                }}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-md transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-black font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-[#262626]'
                }`}
              >
                {stage.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage Instruction Banner */}
      <div className="px-5 py-2.5 bg-[#171717] border-b border-[#2E2E2E] flex items-center justify-between text-xs text-neutral-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            {fadingStage === 'STAGE_DEMO' && 'Uzman Gösterimi: Elektronların hareket yönünü ve nükleofilik saldırıyı inceleyin.'}
            {fadingStage === 'STAGE_FADED_1' && '1. Ok çizilmiştir. Karbonun oktetini korumak için karbonil pi-bağını oksijene açan oku çiziniz.'}
            {fadingStage === 'STAGE_FADED_2' && 'Yanıp sönen amber renkli merkezleri takip ederek nükleofil ve pi-açılma oklarını çiziniz.'}
            {fadingStage === 'STAGE_INDEPENDENT' && 'Tüm mekanizmayı ipucu olmadan serbestçe çiziniz. Texas Karbon oktet hatasına dikkat edin!'}
          </span>
        </div>
        <div className="text-[11px] text-neutral-400 font-mono">
          Basamak {currentStep.stepNumber} / {challenge.steps.length}
        </div>
      </div>

      {/* Interactive Chemical Canvas */}
      <div className="relative w-full h-[320px] bg-[#121212] overflow-hidden flex items-center justify-center">
        <svg
          ref={svgRef}
          viewBox="0 0 500 320"
          className="w-full h-full cursor-crosshair touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          {/* Defs for arrowheads & gradients */}
          <defs>
            <marker
              id="arrowhead-double"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10B981" />
            </marker>
            <marker
              id="arrowhead-demo"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3B82F6" />
            </marker>
            <marker
              id="arrowhead-active"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#F59E0B" />
            </marker>
          </defs>

          {/* Grid background dots */}
          <pattern id="dot-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.75" fill="#2E2E2E" />
          </pattern>
          <rect width="500" height="320" fill="url(#dot-grid)" />

          {/* Covalent Chemical Bonds */}
          {challenge.initialBonds.map((bond) => {
            const fromPt = challenge.initialPoints.find((p) => p.atomIndex === bond.fromIndex);
            const toPt = challenge.initialPoints.find((p) => p.atomIndex === bond.toIndex);
            if (!fromPt || !toPt) return null;

            if (bond.bondOrder === 2) {
              // Double bond rendering
              const dx = toPt.x - fromPt.x;
              const dy = toPt.y - fromPt.y;
              const len = Math.sqrt(dx * dx + dy * dy) || 1;
              const offX = (-dy / len) * 4;
              const offY = (dx / len) * 4;

              return (
                <g key={bond.id}>
                  <line
                    x1={fromPt.x + offX}
                    y1={fromPt.y + offY}
                    x2={toPt.x + offX}
                    y2={toPt.y + offY}
                    stroke="#525252"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1={fromPt.x - offX}
                    y1={fromPt.y - offY}
                    x2={toPt.x - offX}
                    y2={toPt.y - offY}
                    stroke="#525252"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </g>
              );
            }

            return (
              <line
                key={bond.id}
                x1={fromPt.x}
                y1={fromPt.y}
                x2={toPt.x}
                y2={toPt.y}
                stroke="#525252"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            );
          })}

          {/* Chemical Points (Atoms, Lone Pairs, Pi-bonds) */}
          {challenge.initialPoints.map((point) => {
            const isTargetInStage2 =
              fadingStage === 'STAGE_FADED_2' &&
              (point.id === currentStep.donorPointId ||
                point.id === currentStep.acceptorPointId ||
                point.id === currentStep.secondaryDonorPointId ||
                point.id === currentStep.secondaryAcceptorPointId);

            const isPointHovered = activeDrag?.snappedAcceptor?.id === point.id;

            return (
              <g key={point.id} className="transition-transform duration-150">
                {/* Stage 2 Pulsing Amber Target */}
                {isTargetInStage2 && (
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="26"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                    className="animate-spin"
                    style={{ animationDuration: '6s' }}
                  />
                )}

                {/* Snap Target Glow */}
                {isPointHovered && (
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="24"
                    fill="#10B981"
                    fillOpacity="0.25"
                    stroke="#10B981"
                    strokeWidth="2"
                  />
                )}

                {/* Main Node Circle */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={point.isPiBond ? 14 : 18}
                  fill={point.isPiBond ? '#1E293B' : '#262626'}
                  stroke={
                    isPointHovered
                      ? '#10B981'
                      : point.isPiBond
                      ? '#38BDF8'
                      : point.atomSymbol === 'O'
                      ? '#EF4444'
                      : point.atomSymbol === 'N'
                      ? '#3B82F6'
                      : point.atomSymbol === 'P'
                      ? '#F59E0B'
                      : '#A3A3A3'
                  }
                  strokeWidth="2.5"
                />

                {/* Chemical Label */}
                <text
                  x={point.x}
                  y={point.y + 4}
                  textAnchor="middle"
                  fill="#F9FAFB"
                  fontSize={point.isPiBond ? '9px' : '11px'}
                  fontWeight="bold"
                  fontFamily="monospace"
                  className="pointer-events-none select-none"
                >
                  {point.label}
                </text>
              </g>
            );
          })}

          {/* Render Completed & Scaffolded Curved Arrows */}
          {visibleArrows.map((arrow, idx) => {
            const pathData = `M ${arrow.p0.x} ${arrow.p0.y} Q ${arrow.pCtrl.x} ${arrow.pCtrl.y} ${arrow.p1.x} ${arrow.p1.y}`;
            const isDemo = fadingStage === 'STAGE_DEMO';

            return (
              <g key={arrow.id || idx}>
                {/* Glow path */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={isDemo ? '#3B82F6' : '#10B981'}
                  strokeWidth="6"
                  strokeOpacity="0.2"
                  strokeLinecap="round"
                />
                {/* Sharp main Bézier curve */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={isDemo ? '#3B82F6' : '#10B981'}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  markerEnd={isDemo ? 'url(#arrowhead-demo)' : 'url(#arrowhead-double)'}
                  strokeDasharray={isDemo ? '6 3' : undefined}
                />
              </g>
            );
          })}

          {/* Active Live Dragging Arrow */}
          {activeDrag && (
            <g>
              {(() => {
                const p0 = { x: activeDrag.donor.x, y: activeDrag.donor.y };
                const p1 = activeDrag.snappedAcceptor
                  ? { x: activeDrag.snappedAcceptor.x, y: activeDrag.snappedAcceptor.y }
                  : { x: activeDrag.currentX, y: activeDrag.currentY };
                const pCtrl = calculateBezierControl(p0, p1);
                const pathData = `M ${p0.x} ${p0.y} Q ${pCtrl.x} ${pCtrl.y} ${p1.x} ${p1.y}`;

                return (
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="5 3"
                    markerEnd="url(#arrowhead-active)"
                  />
                );
              })()}
            </g>
          )}
        </svg>

        {/* Floating Tooltips or Feedback Overlays */}
        {validationResponse && (
          <div
            className={`absolute bottom-3 left-4 right-4 p-3 rounded-xl border backdrop-blur-md shadow-xl transition-all duration-200 ${
              validationResponse.isValid
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/85 border-rose-500/60 text-rose-200'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <span className="text-base mt-0.5">
                {validationResponse.isValid ? '✨' : '⚠️'}
              </span>
              <div className="text-xs leading-relaxed flex-1">
                <span className="font-bold block mb-0.5">
                  {validationResponse.isValid ? 'Doğru Mekanizma!' : 'Yanılgı Teşhisi:'}
                </span>
                {validationResponse.feedbackTurkish}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Control Bar Actions */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#1C1C1C] border-t border-[#2E2E2E]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleUndoArrow}
            disabled={drawnArrows.length === 0}
            className="text-xs px-3 py-1.5 rounded-lg bg-[#262626] hover:bg-[#303030] text-neutral-300 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            ↩ Geri Al
          </button>
          <button
            type="button"
            onClick={handleResetCanvas}
            disabled={drawnArrows.length === 0 && !validationResponse}
            className="text-xs px-3 py-1.5 rounded-lg bg-[#262626] hover:bg-[#303030] text-neutral-300 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            🗑️ Temizle
          </button>
        </div>

        <div className="flex items-center gap-3">
          {fadingStage === 'STAGE_DEMO' ? (
            <button
              type="button"
              onClick={() => onFadingStageChange?.('STAGE_FADED_1')}
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-colors"
            >
              Uygulamaya Başla ➔
            </button>
          ) : (
            <button
              type="button"
              onClick={handleValidateMechanism}
              disabled={drawnArrows.length === 0 && fadingStage !== 'STAGE_FADED_1'}
              className="text-xs font-bold px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black shadow-md transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
            >
              Mekanizmayı Doğrula ⚡
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
