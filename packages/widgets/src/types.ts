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
