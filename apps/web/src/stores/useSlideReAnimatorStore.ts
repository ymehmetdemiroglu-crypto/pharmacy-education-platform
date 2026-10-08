import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ReanimatedSlide } from '../types/slideReAnimator.types';
import { PRELOADED_REANIMATED_SLIDES } from '../data/reanimatedSlides.data';
import { slideStorageService } from '../services/slideStorageService';
import {
  synthesizeSlideReanimation,
  generateAnkiTsvExport
} from '../services/slideReAnimatorService';

export type ReAnimatorViewTab = 'simulator' | 'quiz' | 'anki';

export interface SlideReAnimatorState {
  slides: ReanimatedSlide[];
  activeSlideId: string;
  activeCourse: 'medchem' | 'pharmacology';
  activeTab: ReAnimatorViewTab;
  isUploading: boolean;
  uploadError: string | null;

  // Quiz & Misconception State
  hypothesisText: string;
  isHypothesisCommitted: boolean;
  selectedOptionId: string | null;
  revealedHintsCount: number; // 0, 1, 2, 3
  isQuizSubmitted: boolean;
  lastQuizResult: { isCorrect: boolean; feedback: string } | null;

  // Actions
  initialize: () => void;
  setCourse: (course: 'medchem' | 'pharmacology') => void;
  setActiveSlide: (slideId: string) => void;
  setActiveTab: (tab: ReAnimatorViewTab) => void;
  setHypothesis: (text: string) => void;
  commitHypothesis: () => void;
  selectOption: (optionId: string) => void;
  revealNextHint: () => void;
  submitQuiz: () => { isCorrect: boolean; feedback: string } | null;
  resetQuizProgression: () => void;

  // Slide Creation & Storage Actions
  uploadAndReanimate: (
    file: File | Blob,
    meta: {
      title: string;
      courseId: 'medchem' | 'pharmacology';
      facultyName?: string;
      rawText?: string;
    }
  ) => Promise<ReanimatedSlide>;
  deleteSlide: (slideId: string) => boolean;

  // Computed Selectors
  getActiveSlide: () => ReanimatedSlide;
  getAnkiTsv: () => string;
}

export const useSlideReAnimatorStore = create<SlideReAnimatorState>()(
  persist(
    (set, get) => ({
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
      lastQuizResult: null,

      initialize: () => {
        const storedSlides = slideStorageService.getReanimatedSlides();
        const activeCourse = get().activeCourse;
        const matching = storedSlides.find((s) => s.courseId === activeCourse) || storedSlides[0];
        set({
          slides: storedSlides,
          activeSlideId: matching ? matching.id : PRELOADED_REANIMATED_SLIDES[0]!.id
        });
      },

      setCourse: (course) => {
        const slides = get().slides;
        const firstMatching = slides.find((s) => s.courseId === course);
        set({
          activeCourse: course,
          activeSlideId: firstMatching ? firstMatching.id : get().activeSlideId,
          hypothesisText: '',
          isHypothesisCommitted: false,
          selectedOptionId: null,
          revealedHintsCount: 0,
          isQuizSubmitted: false,
          lastQuizResult: null
        });
      },

      setActiveSlide: (slideId) => {
        set({
          activeSlideId: slideId,
          hypothesisText: '',
          isHypothesisCommitted: false,
          selectedOptionId: null,
          revealedHintsCount: 0,
          isQuizSubmitted: false,
          lastQuizResult: null
        });
      },

      setActiveTab: (tab) => {
        set({ activeTab: tab });
      },

      setHypothesis: (text) => {
        set({ hypothesisText: text });
      },

      commitHypothesis: () => {
        set({ isHypothesisCommitted: true });
      },

      selectOption: (optionId) => {
        if (!get().isHypothesisCommitted || get().isQuizSubmitted) return;
        set({ selectedOptionId: optionId });
      },

      revealNextHint: () => {
        const current = get().revealedHintsCount;
        if (current < 3) {
          set({ revealedHintsCount: current + 1 });
        }
      },

      submitQuiz: () => {
        const { selectedOptionId, isHypothesisCommitted, isQuizSubmitted } = get();
        if (!isHypothesisCommitted || !selectedOptionId || isQuizSubmitted) {
          return null;
        }

        const activeSlide = get().getActiveSlide();
        const option = activeSlide.challenge.options.find((o) => o.id === selectedOptionId);
        if (!option) return null;

        const result = {
          isCorrect: option.isCorrect,
          feedback: option.diagnosticFeedback
        };

        set({
          isQuizSubmitted: true,
          lastQuizResult: result
        });

        return result;
      },

      resetQuizProgression: () => {
        set({
          hypothesisText: '',
          isHypothesisCommitted: false,
          selectedOptionId: null,
          revealedHintsCount: 0,
          isQuizSubmitted: false,
          lastQuizResult: null
        });
      },

      uploadAndReanimate: async (file, meta) => {
        set({ isUploading: true, uploadError: null });
        try {
          const fileName = file instanceof File ? file.name : `${meta.title}.png`;
          const { storageUrl, objectUrl } = await slideStorageService.uploadSlideMedia(
            file,
            fileName
          );

          const reanimated = synthesizeSlideReanimation({
            title: meta.title,
            rawText: meta.rawText || `${meta.title}\n${fileName} içeriğinden tespit edilen farmakolojik parametreler...`,
            courseId: meta.courseId,
            facultyName: meta.facultyName || 'Eczacılık Fakültesi',
            imageUrl: objectUrl || storageUrl,
            storageUrl
          });

          slideStorageService.saveReanimatedSlide(reanimated);

          set((state) => ({
            slides: [reanimated, ...state.slides.filter((s) => s.id !== reanimated.id)],
            activeSlideId: reanimated.id,
            activeCourse: reanimated.courseId,
            isUploading: false,
            hypothesisText: '',
            isHypothesisCommitted: false,
            selectedOptionId: null,
            revealedHintsCount: 0,
            isQuizSubmitted: false,
            lastQuizResult: null
          }));

          return reanimated;
        } catch (err: any) {
          set({
            isUploading: false,
            uploadError: err?.message || 'Slayt işlenirken bir hata oluştu.'
          });
          throw err;
        }
      },

      deleteSlide: (slideId) => {
        const deleted = slideStorageService.deleteReanimatedSlide(slideId);
        if (deleted) {
          const remaining = get().slides.filter((s) => s.id !== slideId);
          set({
            slides: remaining,
            activeSlideId: remaining[0]?.id || PRELOADED_REANIMATED_SLIDES[0]!.id
          });
        }
        return deleted;
      },

      getActiveSlide: (): ReanimatedSlide => {
        const { slides, activeSlideId } = get();
        const found = slides.find((s) => s.id === activeSlideId);
        return found || slides[0] || PRELOADED_REANIMATED_SLIDES[0]!;
      },

      getAnkiTsv: () => {
        const slide = get().getActiveSlide();
        return generateAnkiTsvExport(slide.ankiCards, {
          title: slide.title,
          courseId: slide.courseId,
          facultyName: slide.facultyName
        });
      }
    }),
    {
      name: 'pharmlearn_slide_reanimator_v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        activeSlideId: state.activeSlideId,
        activeCourse: state.activeCourse,
        activeTab: state.activeTab
      })
    }
  )
);
