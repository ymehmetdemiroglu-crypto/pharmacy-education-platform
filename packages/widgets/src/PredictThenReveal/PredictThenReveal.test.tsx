import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { PredictThenReveal } from './PredictThenReveal';
import { PredictThenRevealConfig } from './schema';

const mockConfig: PredictThenRevealConfig = {
  prompt: 'Predict solubility change upon esterification of benzoic acid',
  scenarioDescription: 'When benzoic acid is converted to methyl benzoate, how does aqueous solubility change?',
  options: [
    {
      id: 'opt-1',
      label: 'Solubility increases due to the extra methyl carbon',
      isCorrect: false,
      misconceptionFeedback: 'Adding nonpolar hydrocarbon chains reduces water solubility; esterification also removes the hydrogen bond donor.',
    },
    {
      id: 'opt-2',
      label: 'Solubility decreases because the ionizable carboxylic acid is capped',
      isCorrect: true,
    },
  ],
  revealedOutcome: 'Methyl benzoate is markedly less water-soluble than sodium benzoate (logP increases from ~1.8 to ~2.1).',
  explanation: 'Esters lack the strong acidic proton capable of ionizing in aqueous buffer at physiological pH.',
  source: {
    file: '1-giri-ve-temel-kavramlar.pdf',
    page: 14,
  },
};

describe('PredictThenReveal Widget', () => {
  it('renders prompt and options', () => {
    render(<PredictThenReveal config={mockConfig} />);
    expect(screen.getByText(/predict solubility change/i)).toBeInTheDocument();
    expect(screen.getByText(/step 1: commit your hypothesis/i)).toBeInTheDocument();
  });

  it('enables reveal button only after an option is selected', () => {
    const handleCorrect = vi.fn();
    render(<PredictThenReveal config={mockConfig} onCorrect={handleCorrect} />);

    const revealBtn = screen.getByRole('button', { name: /reveal experimental outcome/i });
    expect(revealBtn).toBeDisabled();

    // Select correct option
    fireEvent.click(screen.getByText(/solubility decreases because/i));
    expect(revealBtn).not.toBeDisabled();

    // Click reveal
    fireEvent.click(revealBtn);
    expect(handleCorrect).toHaveBeenCalled();
    expect(screen.getByText(/hypothesis confirmed by experiment/i)).toBeInTheDocument();
  });

  it('triggers onIncorrect with misconception feedback when wrong option chosen', () => {
    const handleIncorrect = vi.fn();
    render(<PredictThenReveal config={mockConfig} onIncorrect={handleIncorrect} />);

    // Select incorrect option
    fireEvent.click(screen.getByText(/solubility increases due to/i));
    fireEvent.click(screen.getByRole('button', { name: /reveal experimental outcome/i }));

    expect(handleIncorrect).toHaveBeenCalled();
    expect(screen.getByText(/unexpected outcome \/ misconception alert/i)).toBeInTheDocument();
  });
});
