import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface TechnicalTermBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  term: string; // Canonical Turkish / international pharmacological term
  category?: 'chemical' | 'pharmacological' | 'anatomical' | string;
  transliteration?: string; // Optional Arabic transliteration
  definitionKey?: string; // Translation key for tooltip definition
  definition?: string; // Optional direct tooltip definition text
  className?: string;
  onClick?: () => void;
}

/**
 * TechnicalTermBadge
 * 
 * Enforces "The Special Arabic Rule" (R2 / R3):
 * In Arabic prose, scientific and pharmacological key terms remain in canonical
 * Turkish / international nomenclature (e.g., 'mitokondri', 'reseptör', 'iyonizasyon').
 * 
 * Renders an inline semantic badge in strict LTR mode (`dir="ltr"`) with Academic Midnight Slate
 * styling (`#1E293B` surface, `#F59E0B` warm amber border) and accessible tooltip definition support.
 */
export const TechnicalTermBadge: React.FC<TechnicalTermBadgeProps> = ({
  term,
  transliteration,
  definitionKey,
  definition,
  className,
  onClick,
  ...rest
}) => {
  const tooltipText = definition || definitionKey;

  return (
    <span
      dir="ltr"
      role="term"
      tabIndex={tooltipText ? 0 : undefined}
      title={tooltipText}
      aria-label={tooltipText ? `${term}: ${tooltipText}` : term}
      onClick={onClick}
      className={twMerge(
        clsx(
          // Semantic inline layout and typography
          'inline-flex items-center gap-1 px-1.5 py-0.5 my-0.5 mx-1 align-baseline',
          'font-mono font-medium text-xs tracking-wide',
          'rounded-md select-none',
          // Academic Slate palette
          'bg-slate-100 dark:bg-[#262626] text-amber-800 dark:text-amber-300',
          'border border-amber-300/80 dark:border-amber-700/60',
          'shadow-xs',
          // Focus and interactive styles
          'focus:outline-none focus:ring-1 focus:ring-[#10A37F]',
          tooltipText && 'cursor-help border-b-2',
          className
        )
      )}
      {...rest}
    >
      <span className="font-mono">{term}</span>
      {transliteration && (
        <span
          className="text-[10px] font-normal text-amber-200/70 dark:text-slate-400 lowercase tracking-normal"
          aria-hidden="true"
        >
          ({transliteration})
        </span>
      )}
    </span>
  );
};

TechnicalTermBadge.displayName = 'TechnicalTermBadge';
