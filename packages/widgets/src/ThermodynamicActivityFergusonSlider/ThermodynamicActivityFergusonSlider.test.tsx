import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import {
  ThermodynamicActivityFergusonSlider,
  calculateFergusonActivity,
  getFergusonBiologicalStatus,
} from './ThermodynamicActivityFergusonSlider';
import { thermodynamicActivityFergusonStandardDemo } from './gallery.demo';

describe('ThermodynamicActivityFergusonSlider Mathematical Boundary Cases', () => {
  it('handles boundary case a = 0 (Pt = 0 or St = 0)', () => {
    const res = calculateFergusonActivity(0, 440);
    expect(res.activity).toBe(0);
    expect(res.effectiveActivity).toBe(0);
    expect(res.isCutoff).toBe(false);
    expect(res.membraneVolumeExpansion).toBe(0);

    const status = getFergusonBiologicalStatus(0);
    expect(status.severity).toBe('normal');
    expect(status.stageTr).toContain('Bilinç Açık');
  });

  it('demonstrates Ferguson iso-activity principle across diverse anesthetics in surgical window (a = 0.02 - 0.05)', () => {
    // Diethyl Ether: P0 = 440 mmHg, Pt = 17.6 mmHg => a = 0.04
    const ether = calculateFergusonActivity(17.6, 440);
    expect(ether.activity).toBe(0.04);
    expect(ether.isCutoff).toBe(false);
    expect(getFergusonBiologicalStatus(ether.activity).severity).toBe('surgical');

    // Chloroform: P0 = 160 mmHg, Pt = 6.4 mmHg => a = 0.04
    const chloroform = calculateFergusonActivity(6.4, 160);
    expect(chloroform.activity).toBe(0.04);
    expect(getFergusonBiologicalStatus(chloroform.activity).severity).toBe('surgical');

    // Halothane: P0 = 243 mmHg, Pt = 9.72 mmHg => a = 0.04
    const halothane = calculateFergusonActivity(9.72, 243);
    expect(halothane.activity).toBe(0.04);
    expect(getFergusonBiologicalStatus(halothane.activity).severity).toBe('surgical');

    // Nitrous Oxide: P0 = 39,000 mmHg, Pt = 1560 mmHg => a = 0.04
    const n2o = calculateFergusonActivity(1560, 39000);
    expect(n2o.activity).toBe(0.04);
    expect(getFergusonBiologicalStatus(n2o.activity).severity).toBe('surgical');

    // All four structurally diverse agents have identical activity = 0.04 and expansion = 0.16%
    expect(ether.membraneVolumeExpansion).toBe(0.16);
    expect(chloroform.membraneVolumeExpansion).toBe(0.16);
    expect(halothane.membraneVolumeExpansion).toBe(0.16);
    expect(n2o.membraneVolumeExpansion).toBe(0.16);
  });

  it('handles boundary case a = 1.0 (Pt = P0 or St = S0)', () => {
    const res = calculateFergusonActivity(440, 440);
    expect(res.activity).toBe(1.0);
    expect(res.effectiveActivity).toBe(1.0);
    expect(res.isCutoff).toBe(false);
    expect(res.membraneVolumeExpansion).toBe(4.0);

    const status = getFergusonBiologicalStatus(1.0);
    expect(status.severity).toBe('toxic');
  });

  it('triggers Cutoff Phenomenon and phase saturation when a > 1.0', () => {
    // Attempting to exceed saturation: Pt = 500 mmHg, P0 = 440 mmHg => a ≈ 1.136
    const res = calculateFergusonActivity(500, 440);
    expect(res.activity).toBeGreaterThan(1.0);
    expect(res.isCutoff).toBe(true);
    // Effective activity is clamped at 1.0 because supersaturation cannot be maintained at equilibrium
    expect(res.effectiveActivity).toBe(1.0);
    expect(res.membraneVolumeExpansion).toBe(4.0);

    const status = getFergusonBiologicalStatus(res.activity);
    expect(status.severity).toBe('cutoff');
    expect(status.stageTr).toContain('Ferguson Kesilme Olgusu');
    expect(status.stageAr).toContain('ظاهرة انقطاع فيرغسون');
  });

  it('calculates solution phase thermodynamic activity (a = St / S0)', () => {
    // 1-Butanol: S0 = 1000 mM, St = 40 mM => a = 0.04
    const butanol = calculateFergusonActivity(40, 1000);
    expect(butanol.activity).toBe(0.04);
    expect(getFergusonBiologicalStatus(butanol.activity).severity).toBe('surgical');

    // 1-Octanol: S0 = 4.0 mM, St = 0.16 mM => a = 0.04
    const octanol = calculateFergusonActivity(0.16, 4.0);
    expect(octanol.activity).toBe(0.04);
    expect(getFergusonBiologicalStatus(octanol.activity).severity).toBe('surgical');
  });

  it('handles division by zero gracefully when saturationValue is 0 or negative', () => {
    const res = calculateFergusonActivity(10, 0);
    expect(res.activity).toBe(0);
    expect(res.effectiveActivity).toBe(0);
    expect(res.isCutoff).toBe(false);
  });
});

describe('ThermodynamicActivityFergusonSlider Widget Component', () => {
  it('renders correctly with default config in Turkish', () => {
    render(
      <ThermodynamicActivityFergusonSlider
        config={thermodynamicActivityFergusonStandardDemo}
      />
    );

    expect(screen.getByText(/Ferguson Prensibi Simülatörü/i)).toBeInTheDocument();
    expect(screen.getByRole('term', { name: /Ferguson Prensibi/i })).toBeInTheDocument();
    expect(
      screen.getByRole('term', { name: /Termodinamik Aktivite \(a\)/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Dietil Eter/i)).toBeInTheDocument();
    expect(screen.getByText(/Buhar Fazı/i)).toBeInTheDocument();
    expect(screen.getByText(/Cerrahi Anestezi \(Ferguson Penceresi\)/i)).toBeInTheDocument();
  });

  it('switches between vapor phase and solution phase', () => {
    render(
      <ThermodynamicActivityFergusonSlider
        config={thermodynamicActivityFergusonStandardDemo}
      />
    );

    // Switch to solution phase
    const solutionBtn = screen.getByRole('button', { name: /Çözelti Fazı/i });
    fireEvent.click(solutionBtn);

    expect(screen.getByText(/1-Bütanol/i)).toBeInTheDocument();
    expect(screen.getByText(/S₀ \(Doygunluk Çözünürlüğü\)/i)).toBeInTheDocument();
  });

  it('switches agent presets and updates target values', () => {
    render(
      <ThermodynamicActivityFergusonSlider
        config={thermodynamicActivityFergusonStandardDemo}
      />
    );

    // Click Chloroform preset
    const chloroformBtn = screen.getByRole('button', { name: /Kloroform/i });
    fireEvent.click(chloroformBtn);

    expect(screen.getByText(/160 mmHg/)).toBeInTheDocument();
  });

  it('displays Cutoff Warning banner when a > 1.0', () => {
    render(
      <ThermodynamicActivityFergusonSlider
        config={thermodynamicActivityFergusonStandardDemo}
        initialState={{ targetValue: 500 }}
      />
    );

    expect(screen.getByText(/CUTOFF TRIGGERED/i)).toBeInTheDocument();
    expect(screen.getByText(/KESİLME OLGUSU \(CUTOFF\)/i)).toBeInTheDocument();
  });

  it('renders properly in Arabic locale adhering to Special Arabic Rule', () => {
    render(
      <ThermodynamicActivityFergusonSlider
        config={thermodynamicActivityFergusonStandardDemo}
        locale="ar"
      />
    );

    expect(screen.getByText(/محاكي مبدأ فيرغسون/i)).toBeInTheDocument();
    // Preserves canonical Turkish badges
    expect(screen.getByRole('term', { name: /Ferguson Prensibi/i })).toBeInTheDocument();
    expect(
      screen.getByRole('term', { name: /Termodinamik Aktivite \(a\)/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/المركبات النموذجية:/i)).toBeInTheDocument();
  });

  it('enforces strict dir="ltr" isolation on SVG and gauge scale', () => {
    const { container } = render(
      <ThermodynamicActivityFergusonSlider
        config={thermodynamicActivityFergusonStandardDemo}
        locale="ar"
      />
    );

    const ltrContainers = container.querySelectorAll('[dir="ltr"]');
    expect(ltrContainers.length).toBeGreaterThanOrEqual(2);
  });
});
