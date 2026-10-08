import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MetrobusAudioView } from './MetrobusAudioView';

// Mock speech synthesis and AudioContext
beforeEach(() => {
  vi.stubGlobal('SpeechSynthesisUtterance', vi.fn().mockImplementation((text) => ({
    text,
    lang: 'tr-TR',
    rate: 1.0,
    onend: null,
    onerror: null
  })));

  vi.stubGlobal('speechSynthesis', {
    speak: vi.fn(),
    cancel: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn()
  });

  const MockAudioContext = vi.fn().mockImplementation(() => ({
    state: 'running',
    currentTime: 0,
    resume: vi.fn().mockResolvedValue(undefined),
    createOscillator: vi.fn().mockReturnValue({
      type: 'sine',
      frequency: {
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
        linearRampToValueAtTime: vi.fn()
      },
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn()
    }),
    createGain: vi.fn().mockReturnValue({
      gain: {
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn()
      },
      connect: vi.fn()
    }),
    destination: {}
  }));

  vi.stubGlobal('AudioContext', MockAudioContext);
});

describe('MetrobusAudioView Commuter Interaction & Accessibility', () => {
  it('renders the commuter interface with pulse orb, route switcher, and offline tunnel badge', () => {
    render(<MetrobusAudioView />);

    expect(screen.getByText('Metrobüs Modu')).toBeDefined();
    expect(screen.getByText(/Tünel Çevrimdışı Hazır/i)).toBeDefined();
    expect(screen.getByTestId('metrobus-voice-orb')).toBeDefined();
    expect(screen.getByTestId('metrobus-repeat-btn')).toBeDefined();
    expect(screen.getByTestId('metrobus-hint-btn')).toBeDefined();
  });

  it('switches transit modes when route buttons are clicked', () => {
    render(<MetrobusAudioView />);

    const marmarayBtn = screen.getByText('Marmaray');
    fireEvent.click(marmarayBtn);

    const matches = screen.getAllByText(/Marmaray & M2 Metro/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it('toggles DSP acoustic filter on and off', () => {
    render(<MetrobusAudioView />);

    const filterBtn = screen.getByText(/Dizel Filtresi: AKTİF/i);
    expect(filterBtn).toBeDefined();

    fireEvent.click(filterBtn);
    expect(screen.getByText(/Filtresiz Ham Ses/i)).toBeDefined();
  });

  it('unlocks verbal nudge drawer when hint button is clicked', () => {
    render(<MetrobusAudioView />);

    const hintBtn = screen.getByTestId('metrobus-hint-btn');
    fireEvent.click(hintBtn);

    expect(screen.getByTestId('metrobus-hint-box')).toBeDefined();
    expect(screen.getByText(/1. Kademe Sözlü İpucu/i)).toBeDefined();
  });

  it('evaluates quick touch response and displays verdict feedback with next CTA', () => {
    render(<MetrobusAudioView />);

    // Click the correct quick response option
    const correctOptionBtn = screen.getByText(/Enzim yaşlanır \(alkil kopar, kalıcı blokaj\)/i);
    fireEvent.click(correctOptionBtn);

    // Verdict box appears
    expect(screen.getByTestId('metrobus-verdict-box')).toBeDefined();
    expect(screen.getByText('Tam İsabet!')).toBeDefined();
    expect(screen.getByText(/\+10 XP/i)).toBeDefined();

    // Click next prompt
    const nextBtn = screen.getByTestId('metrobus-next-btn');
    fireEvent.click(nextBtn);

    // Should advance to prompt 2 (Lokal Anestezikler)
    expect(screen.getByText(/Lokal Anesteziklerde Ester vs Amid Hidrolizi/i)).toBeDefined();
  });

  it('allows clicking repeat prompt without penalty', () => {
    render(<MetrobusAudioView />);

    const repeatBtn = screen.getByTestId('metrobus-repeat-btn');
    fireEvent.click(repeatBtn);

    expect(window.speechSynthesis.speak).toHaveBeenCalled();
  });
});
