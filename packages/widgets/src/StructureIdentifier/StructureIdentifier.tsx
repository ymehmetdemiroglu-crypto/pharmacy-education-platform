import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Card, Button, StickerBadge } from '@pharmacy/ui';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { BaseWidgetProps } from '../types';
import { StructureIdentifierConfig } from './schema';

export type StructureIdentifierProps = BaseWidgetProps<StructureIdentifierConfig, string>;

export const StructureIdentifier: React.FC<StructureIdentifierProps> = ({
  config,
  onAttempt,
  onCorrect,
  onIncorrect,
  disabled = false,
  className,
}) => {
  const [selectedAtomId, setSelectedAtomId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedAtom = config.atoms.find((a) => a.id === selectedAtomId);

  const handleSelectAtom = (atomId: string) => {
    if (isSubmitted || disabled) return;
    setSelectedAtomId(atomId);
  };

  const handleSubmit = () => {
    if (!selectedAtom || isSubmitted) return;
    setIsSubmitted(true);
    if (onAttempt) onAttempt(selectedAtom.id);

    if (selectedAtom.isTarget) {
      if (onCorrect) onCorrect();
    } else {
      if (onIncorrect) onIncorrect(`Selected ${selectedAtom.label} is not the target pharmacophore`);
    }
  };

  const getAtomCoordinates = (id: string) => {
    const atom = config.atoms.find((a) => a.id === id);
    return atom ? { x: atom.x, y: atom.y } : { x: 0, y: 0 };
  };

  return (
    <Card
      variant="default"
      className={clsx('w-full flex flex-col gap-4', className)}
    >
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <StickerBadge variant="blue" size="sm">
            Structure Identifier
          </StickerBadge>
          <span className="text-[11px] font-mono text-gray-600 dark:text-gray-400">
            Source: {config.source.file} (p. {config.source.page})
          </span>
        </div>
        {config.title && (
          <h3 className="font-display font-black text-base sm:text-lg uppercase">
            {config.title}
          </h3>
        )}
        <p className="font-body text-xs sm:text-sm text-gray-800 dark:text-gray-200">
          {config.prompt}
        </p>
        <p className="text-xs font-mono text-gray-600 dark:text-gray-400">
          Target: <strong>{config.targetDescription}</strong>
        </p>
      </div>

      {/* Chemical Metadata Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-[#FFF8E7] dark:bg-[#1C1C1C] border-2 border-black dark:border-white text-xs font-mono">
        <span>Molecule: <strong>{config.moleculeName}</strong></span>
        <span className="truncate max-w-xs" title={config.smiles}>
          SMILES: <code className="bg-white dark:bg-black px-1 border">{config.smiles}</code>
        </span>
      </div>

      {/* Interactive Molecule SVG Canvas */}
      <div className="w-full bg-white dark:bg-[#1A1A1A] border-3 border-black dark:border-white shadow-neo dark:shadow-neo-dark p-4 flex items-center justify-center relative overflow-hidden">
        <svg
          viewBox="0 0 400 240"
          className="w-full max-w-md h-auto select-none"
          role="img"
          aria-label={`Chemical structure of ${config.moleculeName}`}
        >
          {/* Render Chemical Bonds */}
          {config.bonds.map((bond, idx) => {
            const start = getAtomCoordinates(bond.from);
            const end = getAtomCoordinates(bond.to);
            const isDouble = bond.order === 'double';

            return (
              <g key={`bond-${idx}`}>
                <line
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke="#000000"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="dark:stroke-white"
                />
                {isDouble && (
                  <line
                    x1={start.x + 3}
                    y1={start.y + 3}
                    x2={end.x + 3}
                    y2={end.y + 3}
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="dark:stroke-white"
                  />
                )}
              </g>
            );
          })}

          {/* Render Clickable Atom Nodes */}
          {config.atoms.map((atom) => {
            const isSelected = selectedAtomId === atom.id;
            const isTarget = atom.isTarget;

            let fill = '#FFFFFF';
            const stroke = '#000000';
            if (isSelected && !isSubmitted) {
              fill = '#FFD93D';
            } else if (isSubmitted) {
              if (isTarget) {
                fill = '#6BCB77';
              } else if (isSelected && !isTarget) {
                fill = '#FF6B9D';
              }
            }

            return (
              <g
                key={atom.id}
                tabIndex={disabled || isSubmitted ? -1 : 0}
                role="button"
                aria-pressed={isSelected}
                aria-label={`Atom ${atom.label}`}
                onClick={() => handleSelectAtom(atom.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectAtom(atom.id);
                  }
                }}
                className={clsx(
                  'cursor-pointer transition-transform duration-100 focus:outline-none',
                  !isSubmitted && !disabled && 'hover:scale-125'
                )}
              >
                {/* Node Box / Circle */}
                <rect
                  x={atom.x - 14}
                  y={atom.y - 14}
                  width="28"
                  height="28"
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="3"
                  className="shadow-sm"
                />
                {/* Atom Label */}
                <text
                  x={atom.x}
                  y={atom.y + 4}
                  textAnchor="middle"
                  fill="#000000"
                  fontSize="12"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="bold"
                >
                  {atom.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Controls & Feedback */}
      {!isSubmitted ? (
        <div className="flex items-center justify-between gap-3 pt-2">
          <span className="text-xs font-mono text-gray-700 dark:text-gray-300">
            {selectedAtom ? `Selected: ${selectedAtom.label} (Node ${selectedAtom.id})` : 'Click an atom above to select'}
          </span>
          <Button
            variant="primary"
            disabled={!selectedAtomId || disabled}
            onClick={handleSubmit}
          >
            Confirm Atom Selection
          </Button>
        </div>
      ) : (
        <div className="pt-3 border-t-3 border-black dark:border-white space-y-2">
          <div className="flex items-center gap-2">
            {selectedAtom?.isTarget ? (
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-display font-black text-sm uppercase">
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                <span>Target Identified Correctly!</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-display font-black text-sm uppercase">
                <AlertCircle className="w-5 h-5 stroke-[2.5]" />
                <span>Incorrect Atom Selected</span>
              </div>
            )}
          </div>
          {selectedAtom && !selectedAtom.isTarget && selectedAtom.distractorRationale && (
            <div className="p-3 bg-[#FFF0F5] dark:bg-[#2D1B22] border-2 border-[#FF6B9D] text-xs font-body leading-relaxed text-black dark:text-white">
              <span className="font-bold font-mono text-[#D92662] dark:text-[#FF85B2] uppercase block mb-1">Misconception Note:</span>
              {selectedAtom.distractorRationale}
            </div>
          )}
          <div className="p-3 bg-[#FFFDF7] dark:bg-[#202020] border-2 border-black dark:border-white text-xs font-body leading-relaxed text-black dark:text-white shadow-[2px_2px_0px_#000000]">
            {config.explanation}
          </div>
        </div>
      )}
    </Card>
  );
};
