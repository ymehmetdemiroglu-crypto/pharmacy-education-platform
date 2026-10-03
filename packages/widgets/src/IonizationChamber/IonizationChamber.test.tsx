import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { IonizationChamber } from './IonizationChamber';

describe('IonizationChamber Widget', () => {
  it('renders correctly with default Aspirin configuration', () => {
    render(<IonizationChamber locale="en" />);

    expect(screen.getByText(/ionization & membrane permeation chamber/i)).toBeInTheDocument();
    expect(screen.getAllByText(/aspirin/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/stomach \(ph 1\.5, ~1 m²\)/i)).toBeInTheDocument();
    expect(screen.getByText(/intestine \(ph 6\.5, ~32 m²\)/i)).toBeInTheDocument();
  });

  it('calculates 99% un-ionized fraction at stomach pH 1.5 for weak acid (pKa 3.5)', () => {
    render(
      <IonizationChamber
        locale="en"
        config={{
          pKa: 3.5,
          drugType: 'weak_acid',
          compartmentA: {
            name: 'Stomach',
            defaultPh: 1.5,
            minPh: 1.0,
            maxPh: 8.0,
            surfaceAreaM2: 1.0,
          },
        }}
      />
    );

    // At pH 1.5 with pKa 3.5: 99% HA, 1% A-
    expect(screen.getByText(/ha:/i)).toBeInTheDocument();
    expect(screen.getAllByText(/99%/i).length).toBeGreaterThanOrEqual(1);
  });

  it('updates surface area and flux when switching between stomach and intestine presets', () => {
    render(<IonizationChamber locale="en" />);

    const intestineBtn = screen.getByRole('button', { name: /intestine \(ph 6\.5, ~32 m²\)/i });
    fireEvent.click(intestineBtn);

    // Surface area updates to 32 m²
    expect(screen.getByText(/area: 32 m²/i)).toBeInTheDocument();
    expect(screen.getByText(/j = p · \(32 m²\)/i)).toBeInTheDocument();
  });

  it('supports keyboard navigation via arrow keys on the pH slider (WCAG 2.2)', () => {
    const handleStateChange = vi.fn();
    render(<IonizationChamber locale="en" onStateChange={handleStateChange} />);

    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowRight' });

    // 1.5 + 0.1 = 1.6
    expect(handleStateChange).toHaveBeenCalledWith(
      expect.objectContaining({ ph: 1.6 })
    );
  });

  it('displays the transparent model illustration disclaimer and equation', () => {
    render(<IonizationChamber locale="en" />);

    expect(screen.getByText(/model illustration/i)).toBeInTheDocument();
    expect(screen.getByText(/view equation/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/view equation/i));
    expect(screen.getByText(/ph - pka = log\(\[a⁻\]\/\[ha\]\)/i)).toBeInTheDocument();
  });

  it('renders correctly in Turkish with pure Turkish labels', () => {
    render(<IonizationChamber locale="tr" />);

    expect(screen.getByText(/İyonizasyon ve Membran Geçiş Odası/i)).toBeInTheDocument();
    expect(screen.getByText(/Mide \(pH 1\.5, ~1 m²\)/i)).toBeInTheDocument();
    expect(screen.getByText(/ZAYIF ASİT/i)).toBeInTheDocument();
    expect(screen.getByText(/Alan: 1 m²/i)).toBeInTheDocument();
  });

  it('renders correctly in Arabic with RTL direction and native Arabic labels', () => {
    const { container } = render(<IonizationChamber locale="ar" />);

    const card = container.querySelector('[dir="rtl"]');
    expect(card).toBeInTheDocument();
    expect(screen.getByText(/حجيرة التأين ونفوذية الأغشية الخلوية/i)).toBeInTheDocument();
    expect(screen.getByText(/حمض ضعيف/i)).toBeInTheDocument();
    expect(screen.getByText(/المساحة: 1 م²/i)).toBeInTheDocument();
  });
});
