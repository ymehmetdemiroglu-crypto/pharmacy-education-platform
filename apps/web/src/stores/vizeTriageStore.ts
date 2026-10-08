import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  CanonicalTrapCode,
  HighYieldSlide,
  HighYieldSlideTier
} from '../types/vizeTriage.types';
import { VizeTriageService } from '../services/vizeTriageService';

export type CramStepPhase = 'spotlight' | 'predict' | 'challenge' | 'verdict' | 'mastery';

export interface VizeTriageState {
  activeCourseId: 'medchem' | 'pharmacology';
  activeTierFilter: HighYieldSlideTier | 'all';
  isCramModalOpen: boolean;
  currentSlideIndex: number;
  cramStep: CramStepPhase;
  selectedOptionId: string | null;
  revealedHintLevel: number; // 0: None, 1: Nudge, 2: Clue, 3: Solution
  isAnswerCorrect: boolean | null;
  sessionScore: number;
  completedSlideIds: string[];
  failedTrapCodes: CanonicalTrapCode[];

  // Actions
  setCourse: (courseId: 'medchem' | 'pharmacology') => void;
  setTierFilter: (tier: HighYieldSlideTier | 'all') => void;
  startCramSession: (slideIndex?: number) => void;
  closeCramSession: () => void;
  advanceToPredict: () => void;
  unlockChallenge: () => void;
  revealNextHint: () => void;
  submitAnswer: (optionId: string) => { isCorrect: boolean; diagnosedTrap?: CanonicalTrapCode | undefined };
  advanceToNextSlide: () => boolean; // returns true if has more slides
  resetSession: () => void;

  // Computed Selectors
  getActiveSlides: () => HighYieldSlide[];
  getCurrentSlide: () => HighYieldSlide | undefined;
}

export const useVizeTriageStore = create<VizeTriageState>()(
  persist(
    (set, get) => ({
      activeCourseId: 'medchem',
      activeTierFilter: 'all',
      isCramModalOpen: false,
      currentSlideIndex: 0,
      cramStep: 'spotlight',
      selectedOptionId: null,
      revealedHintLevel: 0,
      isAnswerCorrect: null,
      sessionScore: 0,
      completedSlideIds: [],
      failedTrapCodes: [],

      setCourse: (courseId) => {
        set({
          activeCourseId: courseId,
          currentSlideIndex: 0,
          cramStep: 'spotlight',
          selectedOptionId: null,
          revealedHintLevel: 0,
          isAnswerCorrect: null
        });
      },

      setTierFilter: (tier) => {
        set({
          activeTierFilter: tier,
          currentSlideIndex: 0
        });
      },

      startCramSession: (slideIndex = 0) => {
        const slides = get().getActiveSlides();
        const validIndex = Math.min(Math.max(0, slideIndex), Math.max(0, slides.length - 1));
        set({
          isCramModalOpen: true,
          currentSlideIndex: validIndex,
          cramStep: 'spotlight',
          selectedOptionId: null,
          revealedHintLevel: 0,
          isAnswerCorrect: null
        });
      },

      closeCramSession: () => {
        set({ isCramModalOpen: false });
      },

      advanceToPredict: () => {
        set({ cramStep: 'predict' });
      },

      unlockChallenge: () => {
        set({ cramStep: 'challenge' });
      },

      revealNextHint: () => {
        const currentLevel = get().revealedHintLevel;
        if (currentLevel < 3) {
          set({ revealedHintLevel: currentLevel + 1 });
        }
      },

      submitAnswer: (optionId) => {
        const currentSlide = get().getCurrentSlide();
        if (!currentSlide) return { isCorrect: false };

        const option = currentSlide.cramQuestion.options.find((opt) => opt.id === optionId);
        const isCorrect = !!option?.isCorrect;
        const diagnosedTrap = option?.misconceptionDiagnosed;

        set((state) => ({
          selectedOptionId: optionId,
          isAnswerCorrect: isCorrect,
          cramStep: 'verdict',
          sessionScore: isCorrect ? state.sessionScore + 10 : state.sessionScore,
          completedSlideIds: state.completedSlideIds.includes(currentSlide.slideId)
            ? state.completedSlideIds
            : [...state.completedSlideIds, currentSlide.slideId],
          failedTrapCodes:
            !isCorrect && diagnosedTrap && !state.failedTrapCodes.includes(diagnosedTrap)
              ? [...state.failedTrapCodes, diagnosedTrap]
              : state.failedTrapCodes
        }));

        return { isCorrect, diagnosedTrap };
      },

      advanceToNextSlide: () => {
        const slides = get().getActiveSlides();
        const nextIndex = get().currentSlideIndex + 1;

        if (nextIndex < slides.length) {
          set({
            currentSlideIndex: nextIndex,
            cramStep: 'spotlight',
            selectedOptionId: null,
            revealedHintLevel: 0,
            isAnswerCorrect: null
          });
          return true;
        } else {
          set({ cramStep: 'mastery' });
          return false;
        }
      },

      resetSession: () => {
        set({
          currentSlideIndex: 0,
          cramStep: 'spotlight',
          selectedOptionId: null,
          revealedHintLevel: 0,
          isAnswerCorrect: null,
          sessionScore: 0
        });
      },

      getActiveSlides: () => {
        const { activeCourseId, activeTierFilter } = get();
        return VizeTriageService.getSlidesForCourse(activeCourseId, activeTierFilter);
      },

      getCurrentSlide: () => {
        const slides = get().getActiveSlides();
        return slides[get().currentSlideIndex];
      }
    }),
    {
      name: 'pharmlearn-vize-triage-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        activeCourseId: state.activeCourseId,
        activeTierFilter: state.activeTierFilter,
        completedSlideIds: state.completedSlideIds,
        failedTrapCodes: state.failedTrapCodes,
        sessionScore: state.sessionScore
      })
    }
  )
);
