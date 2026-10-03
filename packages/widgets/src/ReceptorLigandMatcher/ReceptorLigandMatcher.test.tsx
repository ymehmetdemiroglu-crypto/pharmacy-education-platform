import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ReceptorLigandMatcher } from './ReceptorLigandMatcher';
import { ReceptorLigandMatcherConfig } from './schema';

const mockMatcher: ReceptorLigandMatcherConfig = {
  title: 'Beta-1 Adrenergic Receptor Binding Forces',
  prompt: 'Pair each norepinephrine functional group with its complementary pocket residue.',
  drugName: 'Norepinephrine',
  receptorName: 'Beta-1 Receptor',
  pairs: [
    {
      id: 'p1',
      drugGroup: 'Protonated Primary Amine (-NH3+)',
      correctResidueId: 'r-asp',
      bondType: 'ionic',
      energyKcalMol: '5-10 kcal/mol',
      explanation: 'Forms an essential salt bridge with Asp121 (TM3).',
    },
    {
      id: 'p2',
      drugGroup: 'Catechol meta-OH',
      correctResidueId: 'r-ser',
      bondType: 'h_bond',
      energyKcalMol: '2-5 kcal/mol',
      explanation: 'Hydrogen bonds with Ser211 (TM5).',
    },
  ],
  residues: [
    { id: 'r-asp', residueName: 'Asp121', description: 'Deprotonated carboxylate on TM3' },
    { id: 'r-ser', residueName: 'Ser211', description: 'Serine hydroxyl on TM5' },
    { id: 'r-phe', residueName: 'Phe290', description: 'Aromatic phenyl on TM6' },
  ],
  source: {
    file: '2-reseptrler.pdf',
    page: 24,
  },
};

describe('ReceptorLigandMatcher Widget', () => {
  it('renders drug and receptor groups', () => {
    render(<ReceptorLigandMatcher config={mockMatcher} />);
    expect(screen.getByText(/norepinephrine to beta-1 receptor/i)).toBeInTheDocument();
    expect(screen.getByText(/protonated primary amine/i)).toBeInTheDocument();
    expect(screen.getByText('Asp121')).toBeInTheDocument();
  });

  it('pairs groups and confirms correct matches', () => {
    const handleCorrect = vi.fn();
    render(<ReceptorLigandMatcher config={mockMatcher} onCorrect={handleCorrect} />);

    // Select pair 1, then click Asp121
    fireEvent.click(screen.getByText(/protonated primary amine/i));
    fireEvent.click(screen.getByText('Asp121'));

    // Select pair 2, then click Ser211
    fireEvent.click(screen.getByText(/catechol meta-oh/i));
    fireEvent.click(screen.getByText('Ser211'));

    // Submit
    const verifyBtn = screen.getByRole('button', { name: /verify pocket matches/i });
    expect(verifyBtn).not.toBeDisabled();
    fireEvent.click(verifyBtn);

    expect(handleCorrect).toHaveBeenCalled();
    expect(screen.getByText(/all pocket interactions verified!/i)).toBeInTheDocument();
  });
});
