import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PastExamPracticeModal } from './PastExamPracticeModal';

describe('PastExamPracticeModal', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('renders legal disclaimer and allows past exam question submission', async () => {
    const handleClose = vi.fn();
    render(<PastExamPracticeModal open={true} onClose={handleClose} />);

    // Title and Legal Shield
    expect(screen.getByText(/Çıkmış Soru Analizi & İkiz Soru Sentez Motoru/i)).toBeTruthy();
    expect(screen.getByText(/Hukuki & Telif Kalkanı/i)).toBeTruthy();

    // Text area and action button
    const submitBtn = screen.getByRole('button', { name: /Anonimleştir & İkiz Soru Üret/i });
    expect(submitBtn).toBeTruthy();

    fireEvent.click(submitBtn);

    // Wait for synthesized twin question to render
    await waitFor(() => {
      expect(screen.getByText(/Sentezlenen Pedagojik İkiz Soru/i)).toBeTruthy();
      expect(screen.getByText(/Hukuki Kalkan Aktif/i)).toBeTruthy();
      expect(screen.getByRole('button', { name: /Sokratik İpucu İste/i })).toBeTruthy();
    });
  });

  it('allows revealing Socratic hint steps and selecting an option', async () => {
    const handleClose = vi.fn();
    render(<PastExamPracticeModal open={true} onClose={handleClose} />);

    const submitBtn = screen.getByRole('button', { name: /Anonimleştir & İkiz Soru Üret/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Sentezlenen Pedagojik İkiz Soru/i)).toBeTruthy();
    });

    // Reveal hint
    const hintBtn = screen.getByRole('button', { name: /Sokratik İpucu İste/i });
    fireEvent.click(hintBtn);

    expect(screen.getByText(/Seviye 1/i)).toBeTruthy();

    // Select the correct option
    const option = screen.getByText(/Dibukain ester yerine amit bağı taşır/i);
    fireEvent.click(option);

    const checkBtn = screen.getByRole('button', { name: /Seçimi Kontrol Et/i });
    fireEvent.click(checkBtn);

    expect(screen.getByText(/Vize Sınavı Kuralı/i)).toBeTruthy();
  });
});
