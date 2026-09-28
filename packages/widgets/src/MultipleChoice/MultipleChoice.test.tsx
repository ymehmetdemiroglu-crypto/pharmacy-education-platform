import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MultipleChoice } from './MultipleChoice';
import { MultipleChoiceConfig } from './schema';

const mockMcq: MultipleChoiceConfig = {
  prompt: 'Which functional group acts as a classic hydrogen bond donor in biological systems?',
  options: [
    {
      id: 'opt-1',
      text: 'Tertiary amine (-NR3)',
      isCorrect: false,
      distractorRationale: 'Tertiary amines have no hydrogen attached to the nitrogen, so they can only act as hydrogen bond acceptors.',
    },
    {
      id: 'opt-2',
      text: 'Phenolic hydroxyl (-OH)',
      isCorrect: true,
    },
    {
      id: 'opt-3',
      text: 'Ether oxygen (-O-)',
      isCorrect: false,
      distractorRationale: 'Ether oxygens have lone pairs but no attached hydrogen, acting strictly as acceptors.',
    },
  ],
  isMultiSelect: false,
  explanation: 'Phenols possess an -OH group where the hydrogen atom is polar and can be donated to electronegative heteroatoms (O, N) in the receptor pocket.',
  source: {
    file: '2-reseptrler.pdf',
    page: 18,
  },
};

describe('MultipleChoice Widget', () => {
  it('renders question and choices', () => {
    render(<MultipleChoice config={mockMcq} />);
    expect(screen.getByText(/which functional group acts as a classic/i)).toBeInTheDocument();
    expect(screen.getByText('Phenolic hydroxyl (-OH)')).toBeInTheDocument();
  });

  it('selects option and triggers onCorrect for correct answer', () => {
    const handleCorrect = vi.fn();
    render(<MultipleChoice config={mockMcq} onCorrect={handleCorrect} />);

    fireEvent.click(screen.getByText('Phenolic hydroxyl (-OH)'));
    fireEvent.click(screen.getByRole('button', { name: /check answer/i }));

    expect(handleCorrect).toHaveBeenCalled();
    expect(screen.getByText('Correct!')).toBeInTheDocument();
  });

  it('shows distractor rationale on incorrect selection', () => {
    const handleIncorrect = vi.fn();
    render(<MultipleChoice config={mockMcq} onIncorrect={handleIncorrect} />);

    fireEvent.click(screen.getByText('Tertiary amine (-NR3)'));
    fireEvent.click(screen.getByRole('button', { name: /check answer/i }));

    expect(handleIncorrect).toHaveBeenCalled();
    expect(screen.getByText(/tertiary amines have no hydrogen attached/i)).toBeInTheDocument();
  });
});
