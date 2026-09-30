import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import { StickerBadge } from '@pharmacy/ui';

export interface ModelIllustrationNoticeProps {
  equation: string;
  sourceReference: string;
  assumptions?: string[];
  className?: string;
}

export const ModelIllustrationNotice: React.FC<ModelIllustrationNoticeProps> = ({
  equation,
  sourceReference,
  assumptions,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      aria-label="Mathematical Model Disclaimer"
      className={`border-2 border-black dark:border-slate-700 bg-[#FFFDF7] dark:bg-[#131B2A] p-2 text-xs font-mono select-none text-black dark:text-slate-100 ${className || ''}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <StickerBadge variant="yellow" size="sm">
            Model Illustration
          </StickerBadge>
          <span className="text-[11px] text-gray-700 dark:text-slate-300">
            Simplified educational mathematical model
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          className="flex items-center gap-1 font-bold underline hover:text-amber-500"
        >
          <Info className="w-3.5 h-3.5" />
          <span>{isExpanded ? 'Hide Equation' : 'View Equation'}</span>
          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-2 pt-2 border-t border-black/20 dark:border-slate-700 space-y-1.5 text-[11px]">
          <div>
            <span className="font-bold text-gray-700 dark:text-slate-300">Governing Equation: </span>
            <code className="bg-black/5 dark:bg-[#1E293B] px-1 py-0.5 font-mono text-black dark:text-amber-300 border border-black/20 dark:border-slate-700" dir="ltr">
              {equation}
            </code>
          </div>
          <div>
            <span className="font-bold text-gray-700 dark:text-slate-300">Source: </span>
            <span className="italic text-gray-700 dark:text-slate-300">{sourceReference}</span>
          </div>
          {assumptions && assumptions.length > 0 && (
            <div>
              <span className="font-bold text-gray-700 dark:text-slate-300">Assumptions: </span>
              <ul className="list-disc list-inside text-gray-600 dark:text-slate-400 pl-1">
                {assumptions.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
