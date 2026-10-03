import { z } from 'zod';

export const maxWords = (limit: number = 40) =>
  z.string().refine(
    (val) => val.trim().split(/\s+/).filter(Boolean).length <= limit,
    { message: `Prompt must not exceed ${limit} words` }
  );

export interface WidgetEventHandlers<T = any> {
  onAttempt?: (answer: T) => void;
  onHint?: (hintIndex: number) => void;
  onCorrect?: () => void;
  onIncorrect?: (misconceptionKey?: string) => void;
}

export interface BaseWidgetProps<C, A = any> extends WidgetEventHandlers<A> {
  config: C;
  locale?: 'tr' | 'ar' | 'en';
  className?: string;
  disabled?: boolean;
}

export interface BaseSimulationWidgetProps {
  locale?: 'tr' | 'ar' | 'en';
  readOnly?: boolean;
  initialState?: Record<string, any>;
  onStateChange?: (state: Record<string, any>) => void;
  onPredict?: (hypothesis: any) => void;
}

/**
 * Closed-form Henderson-Hasselbalch calculation for weak acids and weak bases.
 * Weak acid: HA <=> H+ + A-  =>  pH - pKa = log([A-]/[HA])  =>  fraction ionized = 1 / (1 + 10^(pKa - pH))
 * Weak base: BH+ <=> H+ + B  =>  pH - pKa = log([B]/[BH+])  =>  fraction ionized = 1 / (1 + 10^(pH - pKa))
 */
export function calculateIonizationFractions(
  pH: number,
  pKa: number,
  drugType: 'weak_acid' | 'weak_base' | 'neutral'
): { ionizedFraction: number; nonIonizedFraction: number; ratioIonizedToNonIonized: number } {
  if (drugType === 'neutral') {
    return { ionizedFraction: 0, nonIonizedFraction: 1, ratioIonizedToNonIonized: 0 };
  }
  const delta = drugType === 'weak_acid' ? pKa - pH : pH - pKa;
  const ratio = Math.pow(10, -delta);
  const ionizedFraction = ratio / (1 + ratio);
  const nonIonizedFraction = 1 - ionizedFraction;
  return { ionizedFraction, nonIonizedFraction, ratioIonizedToNonIonized: ratio };
}

/**
 * Black & Leff Operational Model of Agonism (Black & Leff, Proc R Soc Lond B 1983).
 * Effect = (Emax * tau^n * [A]^n) / (([A] + KA)^n + tau^n * [A]^n)
 * When n = 1: Effect = (Emax * tau * [A]) / (KA + (1 + tau) * [A])
 * EC50 = KA / (1 + tau)
 * Emax_observed = Emax * tau / (1 + tau)
 */
export function calculateBlackLeffEffect(
  concentration: number,
  tau: number,
  KA: number,
  n: number = 1,
  Emax: number = 100
): number {
  if (concentration <= 0 || tau <= 0 || KA <= 0) return 0;
  const concN = Math.pow(concentration, n);
  const tauN = Math.pow(tau, n);
  const numerator = Emax * tauN * concN;
  const denominator = Math.pow(concentration + KA, n) + tauN * concN;
  return numerator / denominator;
}

export interface CompartmentSpec {
  name: string;
  pH: number;
  volumeL?: number;
  surfaceAreaM2?: number; // e.g. Stomach ~1 m², Intestine ~30-32 m² (Helander & Fändriks 2014)
}


export interface AccessibleStepperProps {
  step: number;
  min: number;
  max: number;
  ariaLabel: string;
  getAriaValueText?: (value: number) => string;
}

