import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Card, Button, StickerBadge } from '@pharmacy/ui';
import { CheckCircle2, AlertCircle, Link as LinkIcon, RefreshCw } from 'lucide-react';
import { BaseWidgetProps } from '../types';
import { ReceptorLigandMatcherConfig } from './schema';

export type ReceptorLigandMatcherProps = BaseWidgetProps<
  ReceptorLigandMatcherConfig,
  Record<string, string>
>;

export const ReceptorLigandMatcher: React.FC<ReceptorLigandMatcherProps> = ({
  config,
  onAttempt,
  onCorrect,
  onIncorrect,
  disabled = false,
  className,
}) => {
  const [selectedPairId, setSelectedPairId] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({}); // pairId -> residueId
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectPair = (pairId: string) => {
    if (disabled || isSubmitted) return;
    setSelectedPairId(pairId);
  };

  const handleSelectResidue = (residueId: string) => {
    if (disabled || isSubmitted || !selectedPairId) return;
    setMatches((prev) => ({
      ...prev,
      [selectedPairId]: residueId,
    }));
    setSelectedPairId(null);
  };

  const handleReset = () => {
    if (disabled) return;
    setMatches({});
    setSelectedPairId(null);
    setIsSubmitted(false);
  };

  const handleSubmit = () => {
    if (disabled || isSubmitted) return;
    setIsSubmitted(true);
    if (onAttempt) onAttempt(matches);

    const isAllCorrect = config.pairs.every(
      (p) => matches[p.id] === p.correctResidueId
    );

    if (isAllCorrect) {
      if (onCorrect) onCorrect();
    } else {
      if (onIncorrect) onIncorrect('One or more drug functional groups are paired with the wrong receptor residues');
    }
  };

  const isComplete = config.pairs.every((p) => matches[p.id]);
  const isAllCorrect = isSubmitted && config.pairs.every((p) => matches[p.id] === p.correctResidueId);

  return (
    <Card variant="default" className={clsx('w-full flex flex-col gap-4', className)}>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <StickerBadge variant="blue" size="sm">
            Receptor-Ligand Matcher
          </StickerBadge>
          <span className="text-[11px] font-mono text-gray-500">
            Source: {config.source.file} (p. {config.source.page})
          </span>
        </div>
        <h3 className="font-display font-bold text-base sm:text-lg">
          {config.title}: {config.drugName} to {config.receptorName}
        </h3>
        <p className="text-xs font-body text-gray-700 dark:text-gray-300">
          {config.prompt} (Select a drug group on the left, then click its complementary receptor residue on the right).
        </p>
      </div>

      {/* Two-Column Matching Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Left Column: Drug Functional Groups */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-black dark:text-white">
            Ligand Functional Groups ({config.drugName})
          </span>
          <div className="space-y-2">
            {config.pairs.map((pair) => {
              const matchedResidueId = matches[pair.id];
              const matchedResidue = config.residues.find((r) => r.id === matchedResidueId);
              const isSelected = selectedPairId === pair.id;
              const isCorrect = isSubmitted && matchedResidueId === pair.correctResidueId;

              return (
                <div
                  key={pair.id}
                  onClick={() => handleSelectPair(pair.id)}
                  className={clsx(
                    'p-3 border-2 border-black dark:border-white cursor-pointer transition-all flex flex-col gap-1',
                    isSelected && 'ring-2 ring-[#FFD93D] bg-[#FFF8E7] dark:bg-[#252525] shadow-neo-sm translate-x-1',
                    !isSelected && 'bg-white dark:bg-[#1E1E1E] hover:bg-gray-50',
                    isSubmitted && isCorrect && 'border-[#6BCB77] bg-[#EBFBEE] dark:bg-[#1C3322]',
                    isSubmitted && !isCorrect && 'border-[#FF6B9D] bg-[#FFF0F5] dark:bg-[#331C24]'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <strong className="text-xs font-mono">{pair.drugGroup}</strong>
                    <span className="text-[10px] font-mono text-gray-500">[{pair.energyKcalMol}]</span>
                  </div>
                  <div className="text-[11px] font-mono flex items-center gap-1 text-gray-700 dark:text-gray-300">
                    <LinkIcon className="w-3 h-3 text-gray-400" />
                    <span>
                      Paired to:{' '}
                      <strong>{matchedResidue ? matchedResidue.residueName : '(Click to select)'}</strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Receptor Residues */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-black dark:text-white">
            Binding Pocket Residues ({config.receptorName})
          </span>
          <div className="space-y-2">
            {config.residues.map((res) => {
              const isUsed = Object.values(matches).includes(res.id);

              return (
                <button
                  key={res.id}
                  type="button"
                  disabled={disabled || isSubmitted || !selectedPairId}
                  onClick={() => handleSelectResidue(res.id)}
                  className={clsx(
                    'w-full p-2.5 border-2 border-black dark:border-white text-left transition-all flex items-center justify-between',
                    selectedPairId && 'hover:bg-[#FFD93D] hover:text-black cursor-pointer shadow-sm',
                    isUsed ? 'bg-gray-100 dark:bg-[#252525] border-dashed text-gray-700 dark:text-gray-300' : 'bg-white dark:bg-[#1E1E1E]',
                    (!selectedPairId || isSubmitted) && 'cursor-default'
                  )}
                >
                  <div>
                    <strong className="text-xs font-mono">{res.residueName}</strong>
                    <p className="text-[10px] text-gray-500">{res.description}</p>
                  </div>
                  {isUsed && (
                    <span className="text-[10px] font-mono font-bold bg-[#FFD93D] text-black px-1.5 py-0.5 border border-black">
                      Linked
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Control Actions */}
      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" size="sm" onClick={handleReset} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
          Reset Pairs
        </Button>
        {!isSubmitted ? (
          <Button variant="primary" disabled={!isComplete || disabled} onClick={handleSubmit}>
            Verify Pocket Matches
          </Button>
        ) : null}
      </div>

      {/* Feedback Summary */}
      {isSubmitted && (
        <div className="pt-3 border-t-3 border-black dark:border-white space-y-2">
          <div className="flex items-center gap-2">
            {isAllCorrect ? (
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-display font-black text-sm uppercase">
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                <span>All Pocket Interactions Verified!</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-display font-black text-sm uppercase">
                <AlertCircle className="w-5 h-5 stroke-[2.5]" />
                <span>Mismatched Residues Detected</span>
              </div>
            )}
          </div>
          <div className="space-y-1.5">
            {config.pairs.map((p) => (
              <div key={p.id} className="p-2 bg-[#FFFDF7] dark:bg-[#202020] border border-black/20 text-xs font-body">
                <strong>{p.drugGroup} ↔ {p.correctResidueId}: </strong>
                {p.explanation}
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
