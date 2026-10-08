import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { VizeCramCarouselModal } from './VizeCramCarouselModal';
import { useVizeTriageStore } from '../../stores/vizeTriageStore';

describe('VizeCramCarouselModal', () => {
  beforeEach(() => {
    localStorage.clear();
    useVizeTriageStore.getState().resetSession();
    useVizeTriageStore.getState().setCourse('medchem');
    useVizeTriageStore.getState().startCramSession(0);

    window.matchMedia =
      window.matchMedia ||
      function () {
        return {
          matches: false,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        };
      };
  });

  it('renders Step 1: Spotlight with mechanism spotlight details', () => {
    render(<VizeCramCarouselModal />);

    expect(screen.getByTestId('vize-cram-carousel-modal')).toBeDefined();
    expect(screen.getByTestId('cram-step-spotlight')).toBeDefined();
    expect(screen.getByText(/Vize Hızlı Kampı/i)).toBeDefined();
    expect(screen.getByText(/Slayt Odak Noktası/i)).toBeDefined();
    expect(screen.getByTestId('advance-to-predict-btn')).toBeDefined();
  });

  it('advances from Spotlight to Predict step and unlocks Challenge step', () => {
    render(<VizeCramCarouselModal />);

    // Click advance to predict
    fireEvent.click(screen.getByTestId('advance-to-predict-btn'));

    expect(screen.getByTestId('cram-step-predict')).toBeDefined();
    expect(screen.getByText(/Aktif Öğrenme Kuralı \(Predict-then-Reveal\)/i)).toBeDefined();

    // Type a hypothesis
    const hypothesisInput = screen.getByTestId('hypothesis-input');
    fireEvent.change(hypothesisInput, { target: { value: 'Serin hidroksili kovalent fosforilasyon' } });

    // Click unlock challenge
    const unlockBtn = screen.getByTestId('unlock-challenge-btn');
    fireEvent.click(unlockBtn);

    expect(screen.getByTestId('cram-step-challenge')).toBeDefined();
    expect(screen.getByText(/Vize Sınav Sorusu:/i)).toBeDefined();
  });

  it('progressively reveals 3-tier scaffolding hint ladder in Challenge step', () => {
    render(<VizeCramCarouselModal />);

    // Navigate to challenge step
    fireEvent.click(screen.getByTestId('advance-to-predict-btn'));
    fireEvent.click(screen.getByTestId('unlock-challenge-btn'));

    // Initially no hints are shown
    expect(screen.queryByTestId('hint-tier-1')).toBeNull();

    // Reveal Tier 1: Nudge
    const hintBtn = screen.getByTestId('reveal-hint-btn');
    fireEvent.click(hintBtn);
    expect(screen.getByTestId('hint-tier-1')).toBeDefined();

    // Reveal Tier 2: Clue
    fireEvent.click(screen.getByTestId('reveal-hint-btn'));
    expect(screen.getByTestId('hint-tier-2')).toBeDefined();

    // Reveal Tier 3: Solution
    fireEvent.click(screen.getByTestId('reveal-hint-btn'));
    expect(screen.getByTestId('hint-tier-3')).toBeDefined();
  });

  it('submits option and displays diagnostic verdict and citation', () => {
    render(<VizeCramCarouselModal />);

    // Navigate to challenge step
    fireEvent.click(screen.getByTestId('advance-to-predict-btn'));
    fireEvent.click(screen.getByTestId('unlock-challenge-btn'));

    const slide = useVizeTriageStore.getState().getCurrentSlide();
    expect(slide).toBeDefined();

    // Submit the correct option
    const correctOption = slide!.cramQuestion.options.find((o) => o.isCorrect)!;
    const optionBtn = screen.getByTestId(`cram-option-${correctOption.id}`);
    fireEvent.click(optionBtn);

    // Verify verdict step
    expect(screen.getByTestId('cram-step-verdict')).toBeDefined();
    expect(screen.getByText(/Tebrikler! Vize Tuzağına Düşmedin/i)).toBeDefined();
    expect(screen.getByText(/Bilimsel Teşhis & Açıklama:/i)).toBeDefined();
    expect(screen.getByTestId('next-slide-btn')).toBeDefined();
  });

  it('closes modal on escape key press', () => {
    render(<VizeCramCarouselModal />);

    expect(useVizeTriageStore.getState().isCramModalOpen).toBe(true);

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(useVizeTriageStore.getState().isCramModalOpen).toBe(false);
  });
});
