import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SlideReAnimatorView } from './SlideReAnimatorView';
import { useSlideReAnimatorStore } from '../../stores/useSlideReAnimatorStore';
import { PRELOADED_REANIMATED_SLIDES } from '../../data/reanimatedSlides.data';

// Mock antd message to prevent jsdom errors
vi.mock('antd', async () => {
  const actual = await vi.importActual('antd');
  return {
    ...actual,
    message: {
      success: vi.fn(),
      error: vi.fn(),
      info: vi.fn(),
      warning: vi.fn()
    }
  };
});

describe('SlideReAnimatorView', () => {
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

    // Mock URL methods for jsdom
    window.URL.createObjectURL = vi.fn(() => `blob:mock-url-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`);
    window.URL.revokeObjectURL = vi.fn();

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn().mockReturnValue(false),
      })),
    });
  });

  it('renders title, course switcher, and exemplar quick pills', () => {
    render(<SlideReAnimatorView />);

    expect(
      screen.getByText(/Fotokopiden Etkileşime \(Dynamic Slide Re-Animator\)/i)
    ).toBeDefined();
    expect(screen.getByText('Farmasötik Kimya')).toBeDefined();
    expect(screen.getByText('Farmakoloji')).toBeDefined();
    expect(screen.getByText('Slayt Yükle 📸')).toBeDefined();

    // Check exemplar pill
    expect(screen.getAllByText(PRELOADED_REANIMATED_SLIDES[0]!.title).length).toBeGreaterThan(0);
  });

  it('displays entity chips and active slide title', () => {
    render(<SlideReAnimatorView />);

    const firstSlide = PRELOADED_REANIMATED_SLIDES[0]!;
    expect(screen.getAllByText(firstSlide.title).length).toBeGreaterThan(0);

    // Verify entity chips exist
    firstSlide.entities.forEach((ent) => {
      expect(screen.getByText(ent.label)).toBeDefined();
    });
  });

  it('switches to quiz tab, enforces predict hypothesis before unlocking options, and submits answer', async () => {
    render(<SlideReAnimatorView />);

    // Switch to quiz tab
    const quizTabBtn = screen.getByText('Vize Meydan Okuma');
    fireEvent.click(quizTabBtn);

    // Predict-then-reveal hypothesis prompt should be visible
    expect(screen.getByText(/1\. Adım: Predict-then-Reveal/i)).toBeDefined();
    const unlockBtn = screen.getByText(/Tahminimi Kaydet ve Soruyu Aç/i).closest('button');
    expect(unlockBtn).toBeTruthy();
    expect(unlockBtn?.disabled).toBe(true);

    // Enter hypothesis
    const textarea = screen.getByPlaceholderText(/Kendi hipotezini yaz/i);
    fireEvent.change(textarea, { target: { value: 'Amit bağı psödokolinesteraz tarafından yıkılmaz.' } });
    expect(unlockBtn?.disabled).toBe(false);

    // Commit hypothesis
    if (unlockBtn) {
      fireEvent.click(unlockBtn);
    }

    // Now question options should appear
    await waitFor(() => {
      expect(screen.getByText('VİZE SORUSU')).toBeDefined();
    });

    const activeSlide = PRELOADED_REANIMATED_SLIDES[0]!;
    const correctOpt = activeSlide.challenge.options.find((o) => o.isCorrect)!;
    const optionEl = screen.getByText(correctOpt.text);
    fireEvent.click(optionEl);

    // Submit answer
    const submitBtn = screen.getByText(/Cevabı Onayla 🎯/i);
    fireEvent.click(submitBtn);

    // Diagnostic verdict should be displayed
    await waitFor(() => {
      expect(screen.getByText('Doğru Teşhis!')).toBeDefined();
    });
  });

  it('switches to anki tab and triggers export download', () => {
    render(<SlideReAnimatorView />);

    // Switch to anki tab
    const ankiTabBtn = screen.getByText(/Anki \(/i);
    fireEvent.click(ankiTabBtn);

    expect(screen.getByText('1-Tıkla Anki İçe Aktarım')).toBeDefined();

    const downloadButtons = screen.getAllByText(/Anki \(\.txt\) İndir|Anki \(\.txt\) Dosyasını İndir/i);
    expect(downloadButtons.length).toBeGreaterThan(0);

    // Click download
    fireEvent.click(downloadButtons[0]!);
    expect(window.URL.createObjectURL).toHaveBeenCalled();
  });
});
