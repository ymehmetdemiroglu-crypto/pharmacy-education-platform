import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { DoseResponseCurve } from './DoseResponseCurve';
import { DoseResponseCurveConfig } from './schema';

const mockCurve: DoseResponseCurveConfig = {
  title: 'Competitive vs Non-competitive Antagonism',
  prompt: 'Observe the shift in the dose-response relationship when an antagonist is present.',
  defaultEc50: 1e-7,
  defaultEmax: 100,
  defaultHillSlope: 1.0,
  modes: ['agonist', 'competitive_antagonist', 'noncompetitive_antagonist', 'partial_agonist'],
  source: {
    file: '2-reseptrler.pdf',
    page: 29,
  },
  explanation: 'Competitive antagonists cause a parallel rightward shift with insurmountable Emax, whereas non-competitive antagonists crush Emax.',
};

describe('DoseResponseCurve Widget', () => {
  it('renders curve canvas, tabs, and model disclaimer', () => {
    render(<DoseResponseCurve config={mockCurve} />);
    expect(screen.getByText('Competitive vs Non-competitive Antagonism')).toBeInTheDocument();
    expect(screen.getByText(/model illustration/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /dose response curve plot/i })).toBeInTheDocument();
  });

  it('switches to competitive antagonist mode and shows comparison baseline', () => {
    render(<DoseResponseCurve config={mockCurve} />);
    const compBtn = screen.getByRole('button', { name: /^competitive antagonist$/i });
    fireEvent.click(compBtn);

    expect(screen.getByText(/agonist alone/i)).toBeInTheDocument();
    expect(screen.getByText(/antagonist ratio/i)).toBeInTheDocument();
  });

  it('renders correctly in Turkish (tr) locale', () => {
    render(<DoseResponseCurve config={mockCurve} locale="tr" />);
    expect(screen.getByText('Doz-Yanıt Simülatörü')).toBeInTheDocument();
    expect(screen.getByText('Model İllüstrasyonu')).toBeInTheDocument();
    expect(screen.getByText('Parsiyel Agonist')).toBeInTheDocument();
  });

  it('renders correctly in Arabic (ar) locale with RTL', () => {
    const { container } = render(<DoseResponseCurve config={mockCurve} locale="ar" />);
    expect(screen.getByText('محاكي الجرعة والاستجابة')).toBeInTheDocument();
    expect(screen.getByText('نموذج محاكاة توضيحي')).toBeInTheDocument();
    expect(screen.getByText('ناهض جزئي')).toBeInTheDocument();
    expect(container.firstChild).toHaveAttribute('dir', 'rtl');
  });
});
