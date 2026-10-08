import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MisconceptionSurgeBanner } from './MisconceptionSurgeBanner';
import { MisconceptionSurgeBroadcast } from '../../types/facultyAmfi.types';

describe('MisconceptionSurgeBanner', () => {
  const mockAlert: MisconceptionSurgeBroadcast = {
    event_type: 'MISCONCEPTION_SURGE',
    trap_code: 'TRAP-03-ESTER-AMIDE',
    faculty_slug: 'marmara-eczacilik',
    course_id: 'medchem',
    slide_number: 28,
    trapped_student_ratio: 0.68,
    sample_size_k: 18,
    headline: "🔥 Amfi Uyarısı: Dönem arkadaşlarının %68'i Slayt 28'deki Ester-Amit tuzağında takıldı!",
    diagnostic_prompt: 'Prokain hidrolizi sonucu açığa çıkan PABA neden sülfonamid antibakteriyel etkisini tamamen yok eder?',
    action_url: '/workspace/medchem?trap=TRAP-03'
  };

  it('renders headline, failure percentage, and k-anonymity badge', () => {
    render(<MisconceptionSurgeBanner alert={mockAlert} onOpenChallenge={vi.fn()} />);

    expect(screen.getByText(/Dönem arkadaşlarının %68'i Slayt 28'deki Ester-Amit tuzağında takıldı!/i)).toBeDefined();
    expect(screen.getByText(/%68 Yanılma Oranı/i)).toBeDefined();
    expect(screen.getByText(/k ≥ 10 K-Anonimlik/i)).toBeDefined();
  });

  it('calls onOpenChallenge when CTA button is clicked', () => {
    const handleOpen = vi.fn();
    render(<MisconceptionSurgeBanner alert={mockAlert} onOpenChallenge={handleOpen} />);

    const button = screen.getByRole('button', { name: /Tuzak Mücadelesine Katıl/i });
    fireEvent.click(button);

    expect(handleOpen).toHaveBeenCalledWith('TRAP-03-ESTER-AMIDE');
  });

  it('calls onDismiss when close button is clicked', () => {
    const handleDismiss = vi.fn();
    render(<MisconceptionSurgeBanner alert={mockAlert} onOpenChallenge={vi.fn()} onDismiss={handleDismiss} />);

    const closeBtn = screen.getByLabelText('Uyanı kapat');
    fireEvent.click(closeBtn);

    expect(handleDismiss).toHaveBeenCalled();
  });
});
