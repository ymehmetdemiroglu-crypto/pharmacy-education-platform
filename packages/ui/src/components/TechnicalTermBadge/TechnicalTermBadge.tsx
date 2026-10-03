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
          'font-mono font-bold text-xs uppercase tracking-wide',
          'rounded-sm select-none',
          // Academic Midnight Slate palette
          'bg-slate-900 dark:bg-[#1E293B] text-amber-400 dark:text-amber-300',
          'border border-[#F59E0B]/60 dark:border-[#F59E0B]/50',
          'shadow-[1px_1px_0px_#000000] dark:shadow-[1px_1px_0px_#030712]',
          // Focus and interactive styles
          'focus:outline-none focus:ring-1 focus:ring-[#F59E0B]',
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
