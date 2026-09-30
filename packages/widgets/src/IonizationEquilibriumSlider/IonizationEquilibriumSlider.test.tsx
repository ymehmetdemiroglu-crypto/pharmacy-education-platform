import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import {
  IonizationEquilibriumSlider,
  calculateIonization,
  BIOLOGICAL_COMPARTMENTS,
} from './IonizationEquilibriumSlider';
import { ionizationEquilibriumStandardDemo } from './gallery.demo';

describe('IonizationEquilibrium Mathematical Calculations', () => {
  it('yields exactly 50% ionized and 50% un-ionized when pH = pKa for a weak acid', () => {
    const res = calculateIonization(4.5, 4.5, 'acid');
    expect(res.ionizedPct).toBeCloseTo(50.0, 5);
    expect(res.unIonizedPct).toBeCloseTo(50.0, 5);
  });

  it('yields exactly 50% ionized and 50% un-ionized when pH = pKa for a weak base', () => {
    const res = calculateIonization(8.0, 8.0, 'base');
    expect(res.ionizedPct).toBeCloseTo(50.0, 5);
    expect(res.unIonizedPct).toBeCloseTo(50.0, 5);
  });

  it('calculates un-ionized and ionized percentages correctly across acid pH spectrum', () => {
    // Aspirin: pKa 3.5 (Weak Acid)
    // In stomach pH 1.5: delta = 1.5 - 3.5 = -2
    // % ionized = 100 / (1 + 10^2) = 100 / 101 ≈ 0.99%
    // % un-ionized ≈ 99.01%
    const stomach = calculateIonization(1.5, 3.5, 'acid');
    expect(stomach.unIonizedPct).toBeCloseTo(99.01, 1);
    expect(stomach.ionizedPct).toBeCloseTo(0.99, 1);

    // In plasma pH 7.4: delta = 7.4 - 3.5 = +3.9
    // % ionized = 100 / (1 + 10^-3.9) ≈ 99.987%
    // % un-ionized ≈ 0.013%
    const plasma = calculateIonization(7.4, 3.5, 'acid');
    expect(plasma.ionizedPct).toBeGreaterThan(99.9);
    expect(plasma.unIonizedPct).toBeLessThan(0.1);
  });

  it('calculates un-ionized and ionized percentages correctly for weak bases', () => {
    // Propranolol: pKa 9.5 (Weak Base)
    // In plasma pH 7.4: delta = 7.4 - 9.5 = -2.1
    // For base: % un-ionized = 100 / (1 + 10^2.1) ≈ 0.78%
    // % ionized ≈ 99.22%
    const plasmaBase = calculateIonization(7.4, 9.5, 'base');
    expect(plasmaBase.ionizedPct).toBeCloseTo(99.22, 1);
    expect(plasmaBase.unIonizedPct).toBeCloseTo(0.78, 1);

    // At high basic pH 12.0: delta = 12.0 - 9.5 = +2.5
    // % un-ionized ≈ 99.68%
    const basicEnv = calculateIonization(12.0, 9.5, 'base');
    expect(basicEnv.unIonizedPct).toBeGreaterThan(99.0);
    expect(basicEnv.ionizedPct).toBeLessThan(1.0);
  });

  it('handles extreme asymptotic boundary cases without NaN or overflow', () => {
    // Extreme pH 14, pKa 1 for acid -> 100% ionized
    const extremeAcidHigh = calculateIonization(14, 1, 'acid');
    expect(extremeAcidHigh.ionizedPct).toBe(100);
    expect(extremeAcidHigh.unIonizedPct).toBe(0);

    // Extreme pH 1, pKa 14 for acid -> 100% un-ionized
    const extremeAcidLow = calculateIonization(1, 14, 'acid');
    expect(extremeAcidLow.ionizedPct).toBe(0);
    expect(extremeAcidLow.unIonizedPct).toBe(100);

    // Extreme pH 14, pKa 1 for base -> 100% un-ionized
    const extremeBaseHigh = calculateIonization(14, 1, 'base');
    expect(extremeBaseHigh.ionizedPct).toBe(0);
    expect(extremeBaseHigh.unIonizedPct).toBe(100);

    // Extreme pH 1, pKa 14 for base -> 100% ionized
    const extremeBaseLow = calculateIonization(1, 14, 'base');
    expect(extremeBaseLow.ionizedPct).toBe(100);
    expect(extremeBaseLow.unIonizedPct).toBe(0);
  });

  it('verifies biological pH gradient compartments specification', () => {
    expect(BIOLOGICAL_COMPARTMENTS).toHaveLength(4);
    const compartmentsMap = Object.fromEntries(
      BIOLOGICAL_COMPARTMENTS.map((c) => [c.id, c.pH])
    );
    expect(compartmentsMap.stomach).toBe(1.5);
    expect(compartmentsMap.duodenum).toBe(6.0);
    expect(compartmentsMap.plasma).toBe(7.4);
    expect(compartmentsMap.urine).toBe(5.5);
  });
});

describe('IonizationEquilibriumSlider Widget Component', () => {
  it('renders correctly with default config in Turkish', () => {
    render(<IonizationEquilibriumSlider config={ionizationEquilibriumStandardDemo} />);

    expect(screen.getByText(/İyonizasyon Dengesi Simülatörü/i)).toBeInTheDocument();
    expect(screen.getByRole('term', { name: /Henderson-Hasselbalch/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Mide/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Duedonum/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Plazma/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/İdrar/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('switches preset compounds and toggles drug type', () => {
    render(<IonizationEquilibriumSlider config={ionizationEquilibriumStandardDemo} />);

    // Click Ibuprofen preset
    const ibupBtn = screen.getByRole('button', { name: /İbuprofen/i });
    fireEvent.click(ibupBtn);

    // Check that pKa displayed changed
    const pkaMatches = screen.getAllByText(/4.4/);
    expect(pkaMatches.length).toBeGreaterThan(0);

    // Toggle drug type to base
    const baseBtn = screen.getByRole('button', { name: /Zayıf Baz/i });
    fireEvent.click(baseBtn);
    expect(baseBtn).toBeInTheDocument();
  });

  it('renders properly in Arabic locale adhering to Special Arabic Rule', () => {
    render(
      <IonizationEquilibriumSlider
        config={ionizationEquilibriumStandardDemo}
        locale="ar"
      />
    );

    // Arabic header badge
    expect(screen.getByText(/محاكي التوازن الأيوني/i)).toBeInTheDocument();
    // Turkish canonical badge preserved via role="term"
    expect(screen.getByRole('term', { name: /Henderson-Hasselbalch/i })).toBeInTheDocument();
    // Arabic compartments
    expect(screen.getByText(/المعدة/i)).toBeInTheDocument();
    expect(screen.getByText(/الاثني عشر/i)).toBeInTheDocument();
    expect(screen.getByText(/بلازما الدم/i)).toBeInTheDocument();
    expect(screen.getByText(/البول/i)).toBeInTheDocument();
  });

  it('enforces strict dir="ltr" isolation for visual elements', () => {
    const { container } = render(
      <IonizationEquilibriumSlider
        config={ionizationEquilibriumStandardDemo}
        locale="ar"
      />
    );

    const ltrContainers = container.querySelectorAll('[dir="ltr"]');
    expect(ltrContainers.length).toBeGreaterThanOrEqual(3);
  });
});
