import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { SarExplorer } from './SarExplorer';
import { SarExplorerConfig } from './schema';

const mockSar: SarExplorerConfig = {
  scaffoldName: 'Aryloxypropanolamine',
  scaffoldDescription: 'Beta-blocker core pharmacophore SAR optimization.',
  baseLogP: 1.2,
  basePka: 9.2,
  baseAffinityNm: 100,
  positions: [
    {
      positionName: 'R1 (N-Alkyl)',
      defaultOptionId: 'r1-me',
      options: [
        {
          id: 'r1-me',
          name: 'Methyl (-CH3)',
          structureSnippet: '-CH3',
          deltaLogP: 0.5,
          deltaPka: 0.1,
          affinityMultiplier: 1.0,
          toxicityRisk: 'low',
        },
        {
          id: 'r1-ipr',
          name: 'Isopropyl (-iPr)',
          structureSnippet: '-CH(CH3)2',
          deltaLogP: 1.3,
          deltaPka: 0.2,
          affinityMultiplier: 10.0, // Kd drops to 10 nM
          toxicityRisk: 'low',
        },
      ],
    },
  ],
  targetGoal: {
    description: 'Achieve Kd <= 10 nM with logP between 2.0 and 3.0',
    minLogP: 2.0,
    maxLogP: 3.0,
    maxAffinityNm: 10,
    targetOptionIds: ['r1-ipr'],
  },
  explanation: 'Bulky N-alkyl substituents like isopropyl fit snugly into the hydrophobic accessory pocket of the beta-1 receptor.',
  source: {
    file: '2-reseptrler.pdf',
    page: 26,
  },
};

describe('SarExplorer Widget', () => {
  it('renders scaffold properties and updates dynamically on selection', () => {
    render(<SarExplorer config={mockSar} />);
    expect(screen.getByText(/aryloxypropanolamine structure-activity optimization/i)).toBeInTheDocument();
    expect(screen.getByText('100 nM')).toBeInTheDocument();

    // Select isopropyl substituent
    const iprBtn = screen.getByRole('button', { name: /isopropyl/i });
    fireEvent.click(iprBtn);

    // Affinity should update to 10 nM
    expect(screen.getByText('10 nM')).toBeInTheDocument();
  });

  it('triggers onCorrect when goal conditions are met', () => {
    const handleCorrect = vi.fn();
    render(<SarExplorer config={mockSar} onCorrect={handleCorrect} />);

    fireEvent.click(screen.getByRole('button', { name: /isopropyl/i }));
    fireEvent.click(screen.getByRole('button', { name: /test candidate affinity/i }));

    expect(handleCorrect).toHaveBeenCalled();
    expect(screen.getByText(/target candidate profile achieved!/i)).toBeInTheDocument();
  });
});
