import { describe, it, expect, beforeEach } from 'vitest';
import { useSlideReAnimatorStore } from './useSlideReAnimatorStore';
import { PRELOADED_REANIMATED_SLIDES } from '../data/reanimatedSlides.data';

describe('useSlideReAnimatorStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useSlideReAnimatorStore.setState({
      slides: PRELOADED_REANIMATED_SLIDES,
      activeSlideId: PRELOADED_REANIMATED_SLIDES[0]!.id,
      activeCourse: 'medchem',
      activeTab: 'simulator',
      isUploading: false,
      uploadError: null,
      hypothesisText: '',
      isHypothesisCommitted: false,
      selectedOptionId: null,
      revealedHintsCount: 0,
      isQuizSubmitted: false,
      lastQuizResult: null
    });
  });

  it('initializes with pre-loaded slides and first slide active', () => {
    const state = useSlideReAnimatorStore.getState();
    expect(state.slides.length).toBeGreaterThanOrEqual(4);
    expect(state.activeSlideId).toBe(PRELOADED_REANIMATED_SLIDES[0]!.id);
    expect(state.activeTab).toBe('simulator');
  });

  it('switches course and activates the first matching slide', () => {
    const store = useSlideReAnimatorStore.getState();
    store.setCourse('pharmacology');

    const updated = useSlideReAnimatorStore.getState();
    expect(updated.activeCourse).toBe('pharmacology');
    const activeSlide = updated.getActiveSlide();
    expect(activeSlide.courseId).toBe('pharmacology');
  });

  it('enforces predict-then-reveal hypothesis lock before option selection', () => {
    const store = useSlideReAnimatorStore.getState();
    const activeSlide = store.getActiveSlide();
    const firstOptionId = activeSlide.challenge.options[0]!.id;

    // Attempt select option before hypothesis committed
    store.selectOption(firstOptionId);
    expect(useSlideReAnimatorStore.getState().selectedOptionId).toBeNull();

    // Commit hypothesis
    store.setHypothesis('Moleküldeki amit köprüsü stabilite sağlar.');
    store.commitHypothesis();
    expect(useSlideReAnimatorStore.getState().isHypothesisCommitted).toBe(true);

    // Now select option succeeds
    store.selectOption(firstOptionId);
    expect(useSlideReAnimatorStore.getState().selectedOptionId).toBe(firstOptionId);
  });

  it('reveals hints sequentially up to 3 tiers', () => {
    const store = useSlideReAnimatorStore.getState();
    expect(store.revealedHintsCount).toBe(0);

    store.revealNextHint();
    expect(useSlideReAnimatorStore.getState().revealedHintsCount).toBe(1);

    store.revealNextHint();
    expect(useSlideReAnimatorStore.getState().revealedHintsCount).toBe(2);

    store.revealNextHint();
    expect(useSlideReAnimatorStore.getState().revealedHintsCount).toBe(3);

    store.revealNextHint(); // Clamped at 3
    expect(useSlideReAnimatorStore.getState().revealedHintsCount).toBe(3);
  });

  it('submits quiz and records diagnostic feedback', () => {
    const store = useSlideReAnimatorStore.getState();
    const activeSlide = store.getActiveSlide();
    const correctOption = activeSlide.challenge.options.find((o) => o.isCorrect)!;

    store.commitHypothesis();
    store.selectOption(correctOption.id);

    const result = store.submitQuiz();
    expect(result).not.toBeNull();
    expect(result?.isCorrect).toBe(true);

    const finalState = useSlideReAnimatorStore.getState();
    expect(finalState.isQuizSubmitted).toBe(true);
    expect(finalState.lastQuizResult?.isCorrect).toBe(true);
  });

  it('uploads and re-animates a new slide', async () => {
    const store = useSlideReAnimatorStore.getState();
    const blob = new Blob(['mock slide binary'], { type: 'image/png' });

    const newSlide = await store.uploadAndReanimate(blob, {
      title: 'Hacettepe Organofosfat Slaytı',
      courseId: 'medchem',
      facultyName: 'Hacettepe Üniversitesi Eczacılık',
      rawText: 'Organofosfatlar AChE serin hidroksili ile kovalent fosforilasyon yapar. Yaşlanma (aging) reaksiyonu.'
    });

    expect(newSlide).toBeDefined();
    expect(newSlide.title).toBe('Hacettepe Organofosfat Slaytı');

    const updated = useSlideReAnimatorStore.getState();
    expect(updated.activeSlideId).toBe(newSlide.id);
    expect(updated.slides.some((s) => s.id === newSlide.id)).toBe(true);
  });

  it('generates Anki TSV export string with tags and html format', () => {
    const store = useSlideReAnimatorStore.getState();
    const tsv = store.getAnkiTsv();

    expect(tsv).toContain('#separator:tab');
    expect(tsv).toContain('#html:true');
    expect(tsv).toContain('#tags column:4');
    expect(tsv).toContain('PharmLearn');
  });
});
