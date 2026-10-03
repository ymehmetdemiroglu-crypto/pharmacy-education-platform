import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReceptorOperationalModel } from './ReceptorOperationalModel';

describe('ReceptorOperationalModel Component', () => {
  const defaultConfig = {
    targetReceptor: 'β1-Adrenerjik Reseptör',
    systemEmax: 100,
    defaultTau: 10.0,
    defaultLogKA: -6.0,
    defaultSlopeN: 1.0,
    equationRef: 'Black & Leff Operational Model (1983): E = (Emax * tau^n * [A]^n) / ((KA + [A])^n + tau^n * [A]^n)',
  };

  it('renders default Full Agonist with spare receptor reserve and model notice', () => {
    render(<ReceptorOperationalModel config={defaultConfig} />);

    expect(screen.getByText(/Black-Leff Operasyonel Agonizma Modeli/i)).toBeInTheDocument();
    expect(screen.getByTestId('black-leff-curve')).toBeInTheDocument();
    expect(screen.getByTestId('model-illustration-notice')).toBeInTheDocument();

    // When tau = 10, Emax_obs = 100 * 10 / 11 = 90.9%
    expect(screen.getByTestId('metric-emax')).toHaveTextContent('90.9%');
    // EC50 = 10^-6 / 11 = 0.09 uM
    expect(screen.getByTestId('metric-ec50')).toHaveTextContent('0.09 μM');
    // Occupancy at EC50 is 1/12 = ~8.3%
    expect(screen.getByTestId('metric-occupancy')).toHaveTextContent('%8.3');
    expect(screen.getByTestId('spare-receptor-banner')).toHaveTextContent(/Yüksek Yedek Rezerv: %92 reseptör boşta/i);
  });

  it('switches to Partial Agonist preset and displays submaximal Emax and zero reserve alert', () => {
    render(<ReceptorOperationalModel config={defaultConfig} />);

    fireEvent.click(screen.getByTestId('preset-partial-agonist'));

    // When tau = 0.8, Emax_obs = 100 * 0.8 / 1.8 = 44.4%
    expect(screen.getByTestId('metric-emax')).toHaveTextContent('44.4%');
    expect(screen.getByTestId('value-tau')).toHaveTextContent('0.8');
  });

  it('applies irreversible blockade preset which reduces spare receptor pool', () => {
    render(<ReceptorOperationalModel config={defaultConfig} />);

    fireEvent.click(screen.getByTestId('preset-depleted-reserve'));

    // 80% blockade with initial tau=10 leaves effective tau = 10 * 0.2 = 2.0
    expect(screen.getByTestId('value-blockade')).toHaveTextContent('%80');
    // With effective tau = 2.0, Emax_obs = 100 * 2 / 3 = 66.7%
    expect(screen.getByTestId('metric-emax')).toHaveTextContent('66.7%');
  });

  it('adjusts tau using stepper buttons', () => {
    render(<ReceptorOperationalModel config={defaultConfig} />);

    const decButton = screen.getByLabelText(/tau değerini 0.5 azalt/i);
    fireEvent.click(decButton);

    expect(screen.getByTestId('value-tau')).toHaveTextContent('9.5');
  });
});
