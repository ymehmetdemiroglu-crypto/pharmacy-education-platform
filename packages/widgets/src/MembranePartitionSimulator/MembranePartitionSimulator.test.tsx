import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import {
  MembranePartitionSimulator,
  calculateLogD,
  calculateMembraneFlux,
  getBbbPenetration,
  HANSCH_SUBSTITUENTS,
} from './MembranePartitionSimulator';
import { membranePartitionStandardDemo } from './gallery.demo';

describe('MembranePartitionSimulator Mathematical Rigor', () => {
  it('calculates logD = logP - log10(2) when pH = pKa for a weak acid', () => {
    const logP = 3.0;
    const pKa = 4.5;
    const pH = 4.5;
    const logD = calculateLogD(logP, pKa, pH, 'acid');
    // log10(2) ≈ 0.30103
    expect(logD).toBeCloseTo(3.0 - Math.log10(2), 4);
    expect(logD).toBeCloseTo(2.69897, 4);
  });

  it('calculates logD = logP - log10(2) when pH = pKa for a weak base', () => {
    const logP = 2.0;
    const pKa = 8.5;
    const pH = 8.5;
    const logD = calculateLogD(logP, pKa, pH, 'base');
    expect(logD).toBeCloseTo(2.0 - Math.log10(2), 4);
    expect(logD).toBeCloseTo(1.69897, 4);
  });

  it('verifies neutral compounds maintain logD equal to logP across all pH values', () => {
    expect(calculateLogD(2.5, 4.0, 1.5, 'neutral')).toBe(2.5);
    expect(calculateLogD(2.5, 4.0, 7.4, 'neutral')).toBe(2.5);
    expect(calculateLogD(2.5, 4.0, 12.0, 'neutral')).toBe(2.5);
  });

  it('calculates logD across physiological pH shifts for an acidic drug', () => {
    const logP = 3.0;
    const pKa = 4.0;

    // At stomach pH 1.0 (un-ionized acid dominates)
    const logDStomach = calculateLogD(logP, pKa, 1.0, 'acid');
    expect(logDStomach).toBeCloseTo(3.0, 2);

    // At plasma pH 7.4 (ionized acid dominates: delta = 3.4)
    // logD ≈ 3.0 - log10(1 + 10^3.4) ≈ 3.0 - 3.4 = -0.4
    const logDPlasma = calculateLogD(logP, pKa, 7.4, 'acid');
    expect(logDPlasma).toBeCloseTo(-0.4, 1);
  });

  it('handles extreme logP and asymptotic pH delta without NaN or Infinity', () => {
    // Extreme negative logP
    expect(calculateLogD(-3.0, 4.0, 7.0, 'acid')).toBeLessThan(-3.0);
    expect(Number.isNaN(calculateLogD(-3.0, 4.0, 7.0, 'acid'))).toBe(false);

    // Extreme positive logP
    expect(calculateLogD(6.0, 4.0, 7.0, 'neutral')).toBe(6.0);

    // Extreme delta pH - pKa = 35
    const extremeDelta = calculateLogD(2.0, 1.0, 36.0, 'acid');
    expect(Number.isFinite(extremeDelta)).toBe(true);
    expect(extremeDelta).toBe(-33.0);

    // Extreme negative delta
    const extremeNegDelta = calculateLogD(2.0, 10.0, 1.0, 'acid');
    expect(Number.isFinite(extremeNegDelta)).toBe(true);
    expect(extremeNegDelta).toBeCloseTo(2.0, 1);
  });

  it('verifies Hansch pi substituent constants', () => {
    const methyl = HANSCH_SUBSTITUENTS.find((s) => s.id === 'methyl');
    const chloro = HANSCH_SUBSTITUENTS.find((s) => s.id === 'chloro');
    const hydroxy = HANSCH_SUBSTITUENTS.find((s) => s.id === 'hydroxy');
    const carboxy = HANSCH_SUBSTITUENTS.find((s) => s.id === 'carboxy');

    expect(methyl?.pi).toBe(0.52);
    expect(chloro?.pi).toBe(0.71);
    expect(hydroxy?.pi).toBe(-0.67);
    expect(carboxy?.pi).toBe(-0.32);
  });

  it('evaluates Blood-Brain Barrier (BBB) penetration classification', () => {
    // Optimal window: logD in [1.5, 3.5], logP <= 5.0
    expect(getBbbPenetration(2.0, 2.5).level).toBe('high');

    // Moderate window
    expect(getBbbPenetration(1.0, 2.5).level).toBe('moderate');
    expect(getBbbPenetration(4.0, 4.5).level).toBe('moderate');

    // Low / Impermeable due to low logD
    expect(getBbbPenetration(-0.5, 1.0).level).toBe('low');

    // Low / Impermeable due to Lipinski violation (logP > 5.0)
    expect(getBbbPenetration(2.0, 5.5).level).toBe('low');
  });

  it('calculates membrane flux with bell-shaped physiological curve', () => {
    // Center at 2.0 has high flux
    const optimalFlux = calculateMembraneFlux(2.0);
    expect(optimalFlux).toBeGreaterThan(95);

    // Very low logD has low flux
    const lowFlux = calculateMembraneFlux(-2.0);
    expect(lowFlux).toBeLessThan(10);

    // Very high logD has lower flux
    const highFlux = calculateMembraneFlux(5.5);
    expect(highFlux).toBeLessThan(10);
  });
});

describe('MembranePartitionSimulator Widget Component', () => {
  it('renders correctly with default config in Turkish', () => {
    render(<MembranePartitionSimulator config={membranePartitionStandardDemo} />);

    expect(screen.getByText(/Membran Partisyon Simülatörü/i)).toBeInTheDocument();
    expect(screen.getByRole('term', { name: /logP \/ logD/i })).toBeInTheDocument();
    expect(screen.getByText(/Temel logP/i)).toBeInTheDocument();
    expect(screen.getByText(/Hansch Sübstitüent/i)).toBeInTheDocument();
    expect(screen.getByText(/Sulu Faz \(Aqueous\)/i)).toBeInTheDocument();
  });

  it('adds Hansch substituent and updates effective logP', () => {
    render(<MembranePartitionSimulator config={membranePartitionStandardDemo} />);

    // Default base logP is 2.5
    expect(screen.getByText('2.50')).toBeInTheDocument();

    // Click + button for chloro (pi = +0.71)
    const plusButtons = screen.getAllByRole('button', { name: '+' });
    // Chloro is the 2nd substituent (index 1)
    expect(plusButtons[1]).toBeDefined();
    fireEvent.click(plusButtons[1]!);

    // Effective logP should now be 2.5 + 0.71 = 3.21
    expect(screen.getByText('3.21')).toBeInTheDocument();
  });

  it('triggers Lipinski Rule of 5 warning when logP exceeds 5.0', () => {
    render(
      <MembranePartitionSimulator
        config={{ ...membranePartitionStandardDemo, defaultLogP: 5.5 }}
      />
    );

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent(/Lipinski 5 Kuralı/i);
    expect(alert).toHaveTextContent(/5\.5 > 5\.0/);
  });

  it('renders properly in Arabic locale with Special Arabic Rule compliance', () => {
    render(
      <MembranePartitionSimulator
        config={membranePartitionStandardDemo}
        locale="ar"
      />
    );

    expect(screen.getByText(/محاكي التقسيم الغشائي/i)).toBeInTheDocument();
    expect(screen.getByRole('term', { name: /logP \/ logD/i })).toBeInTheDocument();
    expect(screen.getByText(/نوع المركب:/i)).toBeInTheDocument();
    expect(screen.getByText(/إضافة المجموعات الوظيفية/i)).toBeInTheDocument();
  });

  it('enforces strict dir="ltr" isolation on SVG and plot containers', () => {
    const { container } = render(
      <MembranePartitionSimulator
        config={membranePartitionStandardDemo}
        locale="ar"
      />
    );

    const ltrContainers = container.querySelectorAll('[dir="ltr"]');
    expect(ltrContainers.length).toBeGreaterThanOrEqual(2);
  });
});
