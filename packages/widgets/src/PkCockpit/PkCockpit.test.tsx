import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PkCockpit } from './PkCockpit';

describe('PkCockpit Component', () => {
  const defaultConfig = {
    drugName: 'Teofilin PK İzlem Modeli',
    defaultDoseMg: 400,
    defaultTauHours: 8,
    defaultClearanceLHr: 3.0,
    defaultVdL: 35,
    defaultKa: 1.5,
    defaultBioavailabilityF: 0.9,
    mecMgL: 10,
    mtcMgL: 20,
  };

  it('renders default therapeutic state with time course curve and model notice', () => {
    render(<PkCockpit config={defaultConfig} />);

    expect(screen.getByText(/Farmakokinetik Kokpit/i)).toBeInTheDocument();
    expect(screen.getByTestId('pk-time-course-curve')).toBeInTheDocument();
    expect(screen.getByTestId('therapeutic-window-rect')).toBeInTheDocument();
    expect(screen.getByTestId('model-illustration-notice')).toBeInTheDocument();

    // Default 400 mg q8h: Css,avg = (0.9 * 400) / (3.0 * 8) = 360 / 24 = 15.0 mg/L
    expect(screen.getByTestId('metric-css-avg')).toHaveTextContent('15.0 mg/L');
    expect(screen.getByTestId('alert-target-range')).toBeInTheDocument();
  });

  it('triggers toxicity alert when dose is escalated above therapeutic window', () => {
    render(<PkCockpit config={defaultConfig} />);

    // Step up dose to 1000 mg
    const doseInput = screen.getByLabelText(/Doz miktarı ayarı/i);
    fireEvent.change(doseInput, { target: { value: '1000' } });

    expect(screen.getByTestId('value-dose')).toHaveTextContent('1000 mg');
    expect(screen.getByTestId('alert-toxicity-warning')).toBeInTheDocument();
    expect(screen.queryByTestId('alert-target-range')).not.toBeInTheDocument();
  });

  it('triggers subtherapeutic trough alert when dosing interval is expanded', () => {
    render(<PkCockpit config={defaultConfig} />);

    // Expand tau to 24h
    const tauInput = screen.getByLabelText(/Doz aralığı tau ayarı/i);
    fireEvent.change(tauInput, { target: { value: '24' } });

    expect(screen.getByTestId('value-tau')).toHaveTextContent('24 saat');
    expect(screen.getByTestId('alert-subtherapeutic-warning')).toBeInTheDocument();
  });

  it('toggles between Oral and IV Bolus routes updating bioavailability', () => {
    render(<PkCockpit config={defaultConfig} />);

    fireEvent.click(screen.getByTestId('toggle-iv'));
    // IV Bolus has F=1.0, so Css,avg = 400 / 24 = 16.7 mg/L
    expect(screen.getByTestId('metric-css-avg')).toHaveTextContent('16.7 mg/L');
  });

  it('adjusts dose using stepper buttons', () => {
    render(<PkCockpit config={defaultConfig} />);

    const decDoseBtn = screen.getByLabelText(/Dozu 50 mg azalt/i);
    fireEvent.click(decDoseBtn);

    expect(screen.getByTestId('value-dose')).toHaveTextContent('350 mg');
  });
});
