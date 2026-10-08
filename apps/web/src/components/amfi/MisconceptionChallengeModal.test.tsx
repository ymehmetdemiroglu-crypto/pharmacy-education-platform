import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MisconceptionChallengeModal } from './MisconceptionChallengeModal';
import { CURATED_MISCONCEPTION_CHALLENGES } from '../../data/facultyAmfi.data';

describe('MisconceptionChallengeModal', () => {
  const challenge = CURATED_MISCONCEPTION_CHALLENGES['TRAP-03-ESTER-AMIDE']!;

  it('renders challenge headline, prompt, and 4 options', () => {
    render(<MisconceptionChallengeModal challenge={challenge} onClose={vi.fn()} />);

    expect(screen.getByText(/Prokain vs Lidokain ve PABA-Sülfonamid Antagonizması/i)).toBeDefined();
    expect(screen.getByText(/Prokain hidroliz edildiğinde açığa çıkan p-aminobenzoik asit/i)).toBeDefined();
    expect(screen.getByText(/PABA, bakteriyel dihidropteroat sentaz enzimi için sülfonamid ile yarışır/i)).toBeDefined();
  });

  it('keeps submit button disabled until an option is selected', () => {
    render(<MisconceptionChallengeModal challenge={challenge} onClose={vi.fn()} />);

    const submitBtn = screen.getByRole('button', { name: /Cevabı Kilitle & Amfi İstatistiğini Gör/i });
    expect((submitBtn as HTMLButtonElement).disabled).toBe(true);

    const correctOptionBtn = screen.getByText(/PABA, bakteriyel dihidropteroat sentaz/i);
    fireEvent.click(correctOptionBtn);

    expect((submitBtn as HTMLButtonElement).disabled).toBe(false);
  });

  it('expands 3-tier hint ladder sequentially', () => {
    render(<MisconceptionChallengeModal challenge={challenge} onClose={vi.fn()} />);

    const hintBtn = screen.getByRole('button', { name: /İpucu Al \(1\/3\)/i });
    fireEvent.click(hintBtn);

    expect(screen.getByText(/1\. Kademe \(İpucu\):/i)).toBeDefined();

    const hintBtn2 = screen.getByRole('button', { name: /İpucu Al \(2\/3\)/i });
    fireEvent.click(hintBtn2);

    expect(screen.getByText(/2\. Kademe \(İpuç\):/i)).toBeDefined();

    const hintBtn3 = screen.getByRole('button', { name: /İpucu Al \(3\/3\)/i });
    fireEvent.click(hintBtn3);

    expect(screen.getByText(/3\. Kademe \(Çözüm Adımı\):/i)).toBeDefined();
  });

  it('locks hypothesis, reveals verdict, cohort statistics, and calls onCompleted', () => {
    const handleCompleted = vi.fn();
    render(<MisconceptionChallengeModal challenge={challenge} onClose={vi.fn()} onCompleted={handleCompleted} />);

    // Select correct option
    const correctOptionBtn = screen.getByText(/PABA, bakteriyel dihidropteroat sentaz/i);
    fireEvent.click(correctOptionBtn);

    // Submit
    const submitBtn = screen.getByRole('button', { name: /Cevabı Kilitle & Amfi İstatistiğini Gör/i });
    fireEvent.click(submitBtn);

    expect(handleCompleted).toHaveBeenCalledWith(true);
    expect(screen.getByText(/Mükemmel! Tuzağı Başarıyla Teşhis Ettin/i)).toBeDefined();
    expect(screen.getByText(/Dönem Seçimi: %32/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Amfiye Dön/i })).toBeDefined();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<MisconceptionChallengeModal challenge={challenge} onClose={handleClose} />);

    const closeBtn = screen.getByLabelText('Kapat');
    fireEvent.click(closeBtn);

    expect(handleClose).toHaveBeenCalled();
  });
});
