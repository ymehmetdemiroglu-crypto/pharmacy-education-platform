import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Card, Button, StickerBadge } from '@pharmacy/ui';
import { CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react';
import { BaseWidgetProps } from '../types';
import { MetabolismMapConfig, MetabolicSite } from './schema';

export type MetabolismMapProps = BaseWidgetProps<MetabolismMapConfig, string>;

export const MetabolismMap: React.FC<MetabolismMapProps> = ({
  config,
  onAttempt,
  onCorrect,
  onIncorrect,
  disabled = false,
  className,
}) => {
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedSite: MetabolicSite | undefined = config.sites.find(
    (s) => s.id === selectedSiteId
  );

  const handleSelectSite = (siteId: string) => {
    if (disabled || isSubmitted) return;
    setSelectedSiteId(siteId);
  };

  const handleSubmit = () => {
    if (!selectedSite || isSubmitted || disabled) return;
    setIsSubmitted(true);
    if (onAttempt) onAttempt(selectedSite.id);

    if (selectedSite.isTargetSite) {
      if (onCorrect) onCorrect();
    } else {
      if (onIncorrect) onIncorrect(`Selected site is mediated by ${selectedSite.enzyme}, not the target toxic pathway`);
    }
  };

  return (
    <Card variant="default" className={clsx('w-full flex flex-col gap-4', className)}>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <StickerBadge variant="pink" size="sm">
            Metabolism & Biotransformation Map
          </StickerBadge>
          <span className="text-[11px] font-mono text-gray-600 dark:text-gray-400">
            Source: {config.source.file} (p. {config.source.page})
          </span>
        </div>
        <h3 className="font-display font-bold text-base sm:text-lg">
          {config.drugName} Biotransformation Pathways
        </h3>
        <p className="text-xs font-body text-gray-700 dark:text-gray-300">
          {config.prompt}
        </p>
      </div>

      {/* Interactive Molecule & Metabolic Sites Diagram */}
      <div className="w-full bg-white dark:bg-[#1E1E1E] border-3 border-black dark:border-white shadow-neo dark:shadow-neo-dark p-4 flex flex-col items-center">
        <svg
          viewBox="0 0 400 200"
          className="w-full max-w-md h-auto select-none"
          role="img"
          aria-label={`Metabolic transformation map for ${config.drugName}`}
        >
          {/* Central Chemical Scaffold Placeholder */}
          <rect
            x="140"
            y="70"
            width="120"
            height="60"
            fill="#FFF8E7"
            stroke="#000000"
            strokeWidth="3"
            className="dark:fill-[#2A2A2A] dark:stroke-white"
          />
          <text
            x="200"
            y="105"
            textAnchor="middle"
            fontSize="12"
            fontFamily="Space Grotesk, sans-serif"
            fontWeight="bold"
            fill="currentColor"
          >
            {config.drugName} Core
          </text>

          {/* Connectors & Metabolic Hotspots */}
          {config.sites.map((site) => {
            const isSelected = selectedSiteId === site.id;
            const isCorrect = site.isTargetSite;

            let badgeFill = '#FFD93D';
            if (isSubmitted) {
              badgeFill = isCorrect ? '#6BCB77' : '#FF6B9D';
            } else if (isSelected) {
              badgeFill = '#FF9F45';
            }

            return (
              <g
                key={site.id}
                role="button"
                tabIndex={disabled || isSubmitted ? -1 : 0}
                aria-pressed={isSelected}
                aria-label={`Metabolic Site: ${site.label} via ${site.enzyme}`}
                onClick={() => handleSelectSite(site.id)}
                className="cursor-pointer transition-transform duration-100 hover:scale-110 focus:outline-none"
              >
                {/* Connecting arrow/line */}
                <line
                  x1="200"
                  y1="100"
                  x2={site.x}
                  y2={site.y}
                  stroke="#000000"
                  strokeWidth="2.5"
                  strokeDasharray="4 3"
                  className="dark:stroke-white"
                />

                {/* Hotspot Box */}
                <rect
                  x={site.x - 45}
                  y={site.y - 18}
                  width="90"
                  height="36"
                  fill={badgeFill}
                  stroke="#000000"
                  strokeWidth="2.5"
                  className={isSelected ? 'filter drop-shadow-md' : ''}
                />
                <text
                  x={site.x}
                  y={site.y - 3}
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                  fill="#000000"
                >
                  {site.label}
                </text>
                <text
                  x={site.x}
                  y={site.y + 11}
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="monospace"
                  fill="#000000"
                >
                  [{site.enzyme}]
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Site Detail Inspection */}
      {selectedSite && (
        <div className="p-3 bg-[#FFFDF7] dark:bg-[#202020] border-2 border-black dark:border-white shadow-[2px_2px_0px_#000000] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-black dark:text-white">
              Selected Pathway: {selectedSite.label} ({selectedSite.reactionType})
            </span>
            <div className="flex items-center gap-1.5">
              <StickerBadge
                variant={selectedSite.phase === 'Phase I' ? 'blue' : 'green'}
                size="sm"
              >
                {selectedSite.phase}
              </StickerBadge>
              {selectedSite.toxicityFlag === 'toxic' && (
                <span className="inline-flex items-center gap-1 bg-[#FF6B9D] text-black px-1.5 py-0.5 border border-black text-[10px] font-mono font-bold">
                  <AlertTriangle className="w-3 h-3" /> Bioactivation / Toxic
                </span>
              )}
            </div>
          </div>
          <p className="text-xs font-body text-gray-700 dark:text-gray-300">
            <strong>Outcome: </strong> {selectedSite.metaboliteOutcome}
          </p>
        </div>
      )}

      {/* Submit / Outcome */}
      {!isSubmitted ? (
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs font-mono text-gray-700 dark:text-gray-300">
            {selectedSite ? 'Click confirm to verify toxic risk pathway' : 'Select a metabolic site on the diagram'}
          </span>
          <Button
            variant="primary"
            disabled={!selectedSiteId || disabled}
            onClick={handleSubmit}
          >
            Confirm Target Site
          </Button>
        </div>
      ) : (
        <div className="pt-3 border-t-3 border-black dark:border-white space-y-2">
          <div className="flex items-center gap-2">
            {selectedSite?.isTargetSite ? (
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-display font-black text-sm uppercase">
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                <span>Correct Metabolic Vulnerability Identified!</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-display font-black text-sm uppercase">
                <AlertCircle className="w-5 h-5 stroke-[2.5]" />
                <span>Incorrect Pathway Selected</span>
              </div>
            )}
          </div>
          <div className="p-3 bg-white dark:bg-[#1E1E1E] border-2 border-black dark:border-white text-xs font-body leading-relaxed text-black dark:text-white shadow-[2px_2px_0px_#000000]">
            {config.explanation}
          </div>
        </div>
      )}
    </Card>
  );
};
