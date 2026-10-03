import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { PkSimulator } from './PkSimulator';
import { PkSimulatorConfig } from './schema';

const mockPk: PkSimulatorConfig = {
  drugName: 'Theophylline',
  prompt: 'Simulate the plasma concentration time-course of theophylline to prevent toxicity.',
  defaultDoseMg: 300,
  defaultClearanceLHr: 3.0,
  defaultVdL: 35,
  defaultBioavailabilityF: 1.0,
  defaultKa: 1.8,
  therapeuticWindow: [10, 20],
  routes: ['iv_bolus', 'oral'],
  source: {
    file: '2-reseptrler.pdf',
    page: 32,
  },
  explanation: 'Theophylline has a narrow therapeutic window (10–20 mg/L). Excessive dosing leads to tachyarrhythmias and seizures.',
};

describe('PkSimulator Widget', () => {
  it('renders drug name, canvas, and mathematical disclaimer', () => {
    render(<PkSimulator config={mockPk} />);
    expect(screen.getByText(/theophylline pharmacokinetic profile/i)).toBeInTheDocument();
    expect(screen.getByText(/therapeutic window \(10–20 mg\/l\)/i)).toBeInTheDocument();
    expect(screen.getByText(/model illustration/i)).toBeInTheDocument();
  });

  it('toggles multiple dosing mode', () => {
    render(<PkSimulator config={mockPk} />);
    const multiToggle = screen.getByRole('checkbox', { name: /multiple dosing/i });
    expect(multiToggle).not.toBeChecked();

    fireEvent.click(multiToggle);
    expect(multiToggle).toBeChecked();
    expect(screen.getByText(/dosing interval \(tau\)/i)).toBeInTheDocument();
  });
});
