import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { SubstituentSnapPalette } from './SubstituentSnapPalette';
import { DRUG_SCAFFOLDS } from '../../data/tactileMechanisms.data';

const mockScaffold = DRUG_SCAFFOLDS[0]!;

describe('SubstituentSnapPalette', () => {
  it('renders scaffold details, drug class, and functional group palette', () => {
    render(<SubstituentSnapPalette scaffold={mockScaffold} />);

    expect(screen.getByTestId('substituent-snap-palette')).toBeDefined();
    expect(screen.getByText(mockScaffold.drugClass)).toBeDefined();
    expect(screen.getByText(mockScaffold.name)).toBeDefined();
    expect(screen.getByText('Lipofilisite (log P):')).toBeDefined();
    expect(screen.getByText('Asitlik/Bazisite (pKa):')).toBeDefined();
    expect(screen.getByText('-NO₂')).toBeDefined();
    expect(screen.getByText('-CF₃')).toBeDefined();
  });

  it('allows applying a substituent and calls onSubstituentChange', () => {
    const onChange = vi.fn();
    render(<SubstituentSnapPalette scaffold={mockScaffold} onSubstituentChange={onChange} />);

    const nitroBtn = screen.getByRole('button', { name: /-NO₂/i });
    fireEvent.click(nitroBtn);

    expect(onChange).toHaveBeenCalledWith(mockScaffold.positions[0]!.id, 'SUB_NO2');
  });

  it('resets back to baseline when Varsayılana Dön is clicked', () => {
    render(<SubstituentSnapPalette scaffold={mockScaffold} />);

    const resetBtn = screen.getByRole('button', { name: /Varsayılana Dön/i });
    fireEvent.click(resetBtn);

    expect(screen.getByText('2.14')).toBeDefined(); // Base logP
  });
});
