import { describe, it, expect, beforeEach } from 'vitest';
import { useVizeTriageStore } from './vizeTriageStore';

describe('useVizeTriageStore', () => {
  beforeEach(() => {
    const store = useVizeTriageStore.getState();
    store.resetSession();
    store.setCourse('medchem');
    store.setTierFilter('all');
    store.closeCramSession();
  });

  it('initializes with default course and retrieves active slides', () => {
    const store = useVizeTriageStore.getState();
    expect(store.activeCourseId).toBe('medchem');
    expect(store.activeTierFilter).toBe('all');
    const slides = store.getActiveSlides();
    expect(slides.length).toBeGreaterThan(0);
    expect(slides[0]!.courseId).toBe('medchem');
  });

  it('switches course and updates current slide', () => {
    const store = useVizeTriageStore.getState();
    store.setCourse('pharmacology');
    expect(useVizeTriageStore.getState().activeCourseId).toBe('pharmacology');
    const currentSlide = useVizeTriageStore.getState().getCurrentSlide();
    expect(currentSlide?.courseId).toBe('pharmacology');
  });

  it('opens and closes cram session', () => {
    const store = useVizeTriageStore.getState();
    store.startCramSession(1);
    expect(useVizeTriageStore.getState().isCramModalOpen).toBe(true);
    expect(useVizeTriageStore.getState().currentSlideIndex).toBe(1);
    expect(useVizeTriageStore.getState().cramStep).toBe('spotlight');

    useVizeTriageStore.getState().closeCramSession();
    expect(useVizeTriageStore.getState().isCramModalOpen).toBe(false);
  });

  it('handles step progression: spotlight -> predict -> challenge -> verdict', () => {
    const store = useVizeTriageStore.getState();
    store.startCramSession(0);

    store.advanceToPredict();
    expect(useVizeTriageStore.getState().cramStep).toBe('predict');

    store.unlockChallenge();
    expect(useVizeTriageStore.getState().cramStep).toBe('challenge');

    const currentSlide = store.getCurrentSlide()!;
    const correctOpt = currentSlide.cramQuestion.options.find((o) => o.isCorrect)!;

    const result = store.submitAnswer(correctOpt.id);
    expect(result.isCorrect).toBe(true);
    expect(useVizeTriageStore.getState().cramStep).toBe('verdict');
    expect(useVizeTriageStore.getState().isAnswerCorrect).toBe(true);
    expect(useVizeTriageStore.getState().sessionScore).toBe(10);
  });

  it('reveals 3-tier scaffolding hint ladder up to tier 3', () => {
    const store = useVizeTriageStore.getState();
    store.startCramSession(0);
    expect(useVizeTriageStore.getState().revealedHintLevel).toBe(0);

    store.revealNextHint();
    expect(useVizeTriageStore.getState().revealedHintLevel).toBe(1);

    store.revealNextHint();
    expect(useVizeTriageStore.getState().revealedHintLevel).toBe(2);

    store.revealNextHint();
    expect(useVizeTriageStore.getState().revealedHintLevel).toBe(3);

    // Stays bounded at 3
    store.revealNextHint();
    expect(useVizeTriageStore.getState().revealedHintLevel).toBe(3);
  });

  it('records failed misconceptions on incorrect answer', () => {
    const store = useVizeTriageStore.getState();
    store.startCramSession(0);
    store.unlockChallenge();

    const currentSlide = store.getCurrentSlide()!;
    const wrongOpt = currentSlide.cramQuestion.options.find((o) => !o.isCorrect)!;

    const result = store.submitAnswer(wrongOpt.id);
    expect(result.isCorrect).toBe(false);
    expect(useVizeTriageStore.getState().isAnswerCorrect).toBe(false);
    if (result.diagnosedTrap) {
      expect(useVizeTriageStore.getState().failedTrapCodes).toContain(result.diagnosedTrap);
    }
  });
});
