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

  it('renders curated question bank and lets student select a question to solve', async () => {
    const handleClose = vi.fn();
    render(<PastExamPracticeModal open={true} onClose={handleClose} />);

    // Title and Legal Shield
    expect(screen.getByText(/Çıkmış Soru Analizi & İkiz Soru Sentez Motoru/i)).toBeTruthy();
    expect(screen.getByText(/Hukuki & Telif Kalkanı/i)).toBeTruthy();

    // Check that curated questions are visible
    expect(screen.getByText(/Hazır Çıkmış Soru Bankası/i)).toBeTruthy();
    expect(screen.getByText(/Lokal Anesteziklerde Ester vs Amit Hidrolizi & SAR/i)).toBeTruthy();

    // Click on the first question to solve it
    const questionCard = screen.getByText(/Lokal Anesteziklerde Ester vs Amit Hidrolizi & SAR/i);
    fireEvent.click(questionCard);

    // Active question solver rendered
    await waitFor(() => {
      expect(screen.getByText(/Sentezlenen Pedagojik İkiz Soru/i)).toBeTruthy();
      expect(screen.getByRole('button', { name: /Sokratik İpucu İste/i })).toBeTruthy();
    });

    // Request Socratic hint
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

  it('allows switching to upload tab, scrubbing text and synthesizing twin question', async () => {
    const handleClose = vi.fn();
    render(<PastExamPracticeModal open={true} onClose={handleClose} />);

    // Switch to upload tab
    const uploadTab = screen.getByText(/Kendi Sorunu Yükle & Anonimleştir/i);
    fireEvent.click(uploadTab);

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
});
