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
  className?: string;
  disabled?: boolean;
}
