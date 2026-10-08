import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DailyChallengeModal } from './DailyChallengeModal';
import { clearMisconceptionStore } from '../../services/misconceptionService';

describe('DailyChallengeModal', () => {
  beforeEach(() => {
    localStorage.clear();
    clearMisconceptionStore();
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

  it('renders modal with step 1 and options when open', () => {
    render(<DailyChallengeModal open={true} onClose={vi.fn()} />);

    expect(screen.getByText('Günün 10 Yüksek Verimli Vize Sorusu')).toBeDefined();
    expect(screen.getByText(/Soru 1 \/ 10/i)).toBeDefined();
    expect(screen.getByText(/asetilsalisilik asidin klirensini hızlandırmak/i)).toBeDefined();
    expect(screen.getByText(/İdrarı sodyum bikarbonat ile bazikleştirmek/i)).toBeDefined();
  });

  it('reveals 3-tier scaffolding hint ladder on click', () => {
    render(<DailyChallengeModal open={true} onClose={vi.fn()} />);

    // Initially hint levels are not revealed
    expect(screen.queryByText(/Seviye 1 \(Nudge\):/i)).toBeNull();

    // Click 1st hint level
    const hintBtn = screen.getByText(/1\. Basamağı Aç \(Nudge\)/i);
    fireEvent.click(hintBtn);

    expect(screen.getByText(/Seviye 1 \(Nudge\):/i)).toBeDefined();
  });

  it('submits option, reveals diagnostic feedback, and enables next step button', () => {
    render(<DailyChallengeModal open={true} onClose={vi.fn()} />);

    // Select the correct option A
    const optionA = screen.getByText(/İdrarı sodyum bikarbonat ile bazikleştirmek/i);
    fireEvent.click(optionA);

    // Confirm button should be clickable
    const submitBtn = screen.getByText('Cevabı Onayla');
    fireEvent.click(submitBtn);

    // Diagnostic feedback should appear
    expect(screen.getByText(/Doğru Çözüm Rasyoneli:/i)).toBeDefined();
    expect(screen.getAllByText(/iyon tuzağı/i).length).toBeGreaterThanOrEqual(1);

    // "Sonraki Soruya Geç" button should now be visible
    expect(screen.getByText('Sonraki Soruya Geç')).toBeDefined();
  });
});
