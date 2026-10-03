import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ClinicalOrderVerification, CANONICAL_CLINICAL_CASES } from './ClinicalOrderVerification';

describe('ClinicalOrderVerification Component', () => {
  it('renders the station with default Case 1 (Ciprofloxacin & CaCO3)', () => {
    render(<ClinicalOrderVerification />);

    expect(screen.getByTestId('clinical-order-verification-station')).toBeDefined();
    expect(screen.getByText(/Klinik Eczacı İstemi Doğrulama İstasyonu/i)).toBeDefined();
    expect(screen.getByText(/Siprofloksasin \(Ciprofloxacin\)/i)).toBeDefined();
    expect(screen.getByText(/Kalsiyum Karbonat \(CaCO₃\)/i)).toBeDefined();
    expect(screen.getByText(/Osteopeni/i)).toBeDefined();
  });

  it('correctly validates Case 1 spacing decision and rejects erroneous Al/Mg >80% conflation', () => {
    const handleVerify = vi.fn();
    render(<ClinicalOrderVerification onVerify={handleVerify} />);

    // Select correct spacing option: 2 saat önce / 6 saat sonra
    const spacingOption = screen.getByText(/Siprofloksasini kalsiyumdan en az 2 saat önce veya 6 saat sonra ver/i);
    fireEvent.click(spacingOption);

    const submitBtn = screen.getByRole('button', { name: /İstemi Onayla \/ Kararı Kaydet/i });
    fireEvent.click(submitBtn);

    expect(handleVerify).toHaveBeenCalledWith(
      expect.objectContaining({
        caseId: 'ciprofloxacin_caco3',
        isCorrect: true,
      })
    );
    expect(screen.getByText(/Klinik Olarak Kusursuz!/i)).toBeDefined();
    expect(screen.getByText(/bidentat şelasyon engellenir/i)).toBeDefined();
  });

  it('switches to Case 2 (Simvastatin & Clarithromycin) and identifies contraindicated combination', () => {
    const handleVerify = vi.fn();
    render(<ClinicalOrderVerification onVerify={handleVerify} />);

    // Click tab 2
    const case2Tab = screen.getByRole('tab', { name: /2: Statin & Makrolid/i });
    fireEvent.click(case2Tab);

    expect(screen.getByText(/Klaritromisin \(Clarithromycin\)/i)).toBeDefined();
    expect(screen.getAllByText(/Simvastatin/i).length).toBeGreaterThan(0);

    // Select correct option: Hold simvastatin or switch to azithromycin
    const correctOption = screen.getByText(/Klaritromisin süresince simvastatin kesilmeli veya antibiyotik Azitromisin'e geçilmelidir/i);
    fireEvent.click(correctOption);

    const submitBtn = screen.getByRole('button', { name: /İstemi Onayla \/ Kararı Kaydet/i });
    fireEvent.click(submitBtn);

    expect(handleVerify).toHaveBeenCalledWith(
      expect.objectContaining({
        caseId: 'simvastatin_clarithromycin',
        isCorrect: true,
      })
    );
    expect(screen.getByText(/Mükemmel Klinik Karar!/i)).toBeDefined();
    expect(screen.getByText(/10–12 kat/i)).toBeDefined();
  });

  it('switches to Case 3 (Warfarin & Heparin) and diagnoses early Factor VII INR misconception vs Factor II/X latency', () => {
    render(<ClinicalOrderVerification />);

    // Click tab 3
    const case3Tab = screen.getByRole('tab', { name: /3: Varfarin & Heparin/i });
    fireEvent.click(case3Tab);

    expect(screen.getByText(/Akut Proksimal Derin Ven Trombozu \(DVT\)/i)).toBeDefined();
    expect(screen.getByText(/INR = 2.2/i)).toBeDefined();

    // Student makes common mistake: approves stopping enoxaparin on day 2 because INR reaches 2.2
    const mistakeOption = screen.getByText(/Enoksaparini kesmeyi onayla: Hedef INR sağlandı/i);
    fireEvent.click(mistakeOption);

    const submitBtn = screen.getByRole('button', { name: /İstemi Onayla \/ Kararı Kaydet/i });
    fireEvent.click(submitBtn);

    // Verifies diagnostic misconception feedback
    expect(screen.getByText(/Kritik Klinik Tuzak!/i)).toBeDefined();
    expect(screen.getByText(/Faktör VII/i)).toBeDefined();
    expect(screen.getByText(/Faktör II \(t½ ~60–72 saat\)/i)).toBeDefined();
  });

  it('toggles the biophysical mechanism explanation and displays citation', () => {
    render(<ClinicalOrderVerification />);

    const toggleBtn = screen.getByRole('button', { name: /Biyofiziksel Mekanizma İncele/i });
    fireEvent.click(toggleBtn);

    expect(screen.getByText(/Moleküler & Farmakolojik Mekanizma Özeti/i)).toBeDefined();
    expect(screen.getByText(/C3 karboksil ve C4 okso oksijenleri/i)).toBeDefined();
    expect(screen.getByText(/Model İllüstrasyonu/i)).toBeDefined();
  });
});
