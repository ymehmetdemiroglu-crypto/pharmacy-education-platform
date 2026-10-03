import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EassonStedmanStage } from './EassonStedmanStage';

describe('EassonStedmanStage Component', () => {
  const defaultConfig = {
    drugName: 'Propranolol',
    eutomerName: '(S)-propranolol',
    distomerName: '(R)-propranolol',
    targetReceptor: 'β1-Adrenerjik Reseptör',
    deltaGEutomer: -11.5,
    deltaGDistomer: -8.5,
    equationRef: 'Easson-Stedman Hypothesis (1933)',
    initialEnantiomer: 'eutomer' as const,
  };

  it('renders correctly with default eutomer configuration and model notice', () => {
    render(<EassonStedmanStage config={defaultConfig} />);

    expect(screen.getByText(/Easson-Stedman 3-Noktalı Kenetlenme/i)).toBeInTheDocument();
    expect(screen.getByTestId('toggle-eutomer')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-distomer')).toBeInTheDocument();
    expect(screen.getByTestId('model-illustration-notice')).toBeInTheDocument();
  });

  it('demonstrates 3/3 contacts docked when eutomer is aligned', () => {
    render(<EassonStedmanStage config={defaultConfig} />);

    // Align to pocket
    fireEvent.click(screen.getByTestId('snap-bioactive-button'));

    expect(screen.getByTestId('locus-1-status')).toHaveTextContent(/KENETLENDİ/i);
    expect(screen.getByTestId('locus-2-status')).toHaveTextContent(/KENETLENDİ/i);
    expect(screen.getByTestId('locus-3-status')).toHaveTextContent(/KENETLENDİ/i);
    expect(screen.getByTestId('docking-result-banner')).toHaveTextContent('TEMAS SKORU: 3 / 3');
    expect(screen.getByTestId('docking-result-banner')).toHaveTextContent('ΔG = -11.5 kcal/mol');
  });

  it('demonstrates only 2/3 contacts docked when distomer is selected due to OH inversion', () => {
    render(<EassonStedmanStage config={defaultConfig} />);

    // Switch to distomer
    fireEvent.click(screen.getByTestId('toggle-distomer'));
    // Align to pocket
    fireEvent.click(screen.getByTestId('snap-bioactive-button'));

    expect(screen.getByTestId('locus-1-status')).toHaveTextContent(/KENETLENDİ/i);
    // Locus 2 must fail for distomer!
    expect(screen.getByTestId('locus-2-status')).toHaveTextContent(/STERİK ÇATIŞMA \/ BOŞTA/i);
    expect(screen.getByTestId('locus-3-status')).toHaveTextContent(/KENETLENDİ/i);

    expect(screen.getByTestId('docking-result-banner')).toHaveTextContent('TEMAS SKORU: 2 / 3');
    expect(screen.getByTestId('docking-result-banner')).toHaveTextContent('ΔG = -8.5 kcal/mol');
    expect(screen.getByTestId('docking-result-banner')).toHaveTextContent(/Distomer zayıf bağlanır/i);
  });

  it('updates rotation angle when stepper buttons are clicked', () => {
    render(<EassonStedmanStage config={defaultConfig} />);

    const rotateXButton = screen.getByLabelText(/X ekseninde ileriye 15 derece döndür/i);
    fireEvent.click(rotateXButton);

    expect(screen.getByText(/Açı: X:15°/i)).toBeInTheDocument();
  });

  it('resets rotation when snap to pocket is clicked', () => {
    render(<EassonStedmanStage config={defaultConfig} />);

    const rotateYButton = screen.getByLabelText(/Y ekseninde sağa 15 derece döndür/i);
    fireEvent.click(rotateYButton);
    fireEvent.click(rotateYButton);

    expect(screen.getByText(/Açı:.*Y:30°/i)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('snap-bioactive-button'));
    expect(screen.getByText(/Açı: X:0° \| Y:0° \| Z:0°/i)).toBeInTheDocument();
  });

  it('renders correctly in English', () => {
    render(<EassonStedmanStage config={defaultConfig} locale="en" />);
    expect(screen.getByText(/Easson-Stedman 3-Point Attachment/i)).toBeInTheDocument();
    expect(screen.getByTestId('toggle-eutomer')).toHaveTextContent(/Eutomer/i);
    expect(screen.getByTestId('snap-bioactive-button')).toHaveTextContent('Snap to Bioactive Pocket');
  });

  it('renders correctly in Arabic with RTL direction', () => {
    const { container } = render(<EassonStedmanStage config={defaultConfig} locale="ar" />);
    expect(container.firstChild).toHaveAttribute('dir', 'rtl');
    expect(screen.getByText(/نموذج إيسون-ستيدمان للالتحام ثلاثي النقاط/i)).toBeInTheDocument();
    expect(screen.getByTestId('toggle-eutomer')).toHaveTextContent(/المصاوغ الفعال/i);
    expect(screen.getByTestId('snap-bioactive-button')).toHaveTextContent('محاذاة مع الجيب الحيوي');
  });
});

