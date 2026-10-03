import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { StructureIdentifier } from './StructureIdentifier';
import { StructureIdentifierConfig } from './schema';

const mockConfig: StructureIdentifierConfig = {
  title: 'Identify Ester Hydrolysis Site',
  prompt: 'Click the ester carbonyl carbon targeted by plasma esterases in procaine.',
  moleculeName: 'Procaine',
  smiles: 'CCN(CC)CCOC(=O)C1=CC=C(N)C=C1',
  atoms: [
    { id: 'a1', label: 'N1', x: 60, y: 120, isTarget: false },
    { id: 'a2', label: 'C2', x: 120, y: 120, isTarget: false },
    { id: 'a3', label: 'O3', x: 180, y: 120, isTarget: false },
    { id: 'a4', label: 'C=O', x: 240, y: 120, isTarget: true, hintName: 'Ester Carbonyl' },
    { id: 'a5', label: 'Ph', x: 300, y: 120, isTarget: false },
  ],
  bonds: [
    { from: 'a1', to: 'a2', order: 'single' },
    { from: 'a2', to: 'a3', order: 'single' },
    { from: 'a3', to: 'a4', order: 'single' },
    { from: 'a4', to: 'a5', order: 'single' },
  ],
  targetDescription: 'Ester carbonyl carbon (C=O)',
  explanation: 'The electrophilic carbonyl carbon of the ester linkage undergoes nucleophilic attack by the active site serine of butyrylcholinesterase.',
  source: {
    file: '1-giri-ve-temel-kavramlar.pdf',
    page: 25,
  },
};

describe('StructureIdentifier Widget', () => {
  it('renders molecule name and SVG atoms', () => {
    render(<StructureIdentifier config={mockConfig} />);
    expect(screen.getByText('Procaine')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /atom c=o/i })).toBeInTheDocument();
  });

  it('selects target atom and confirms successfully', () => {
    const handleCorrect = vi.fn();
    render(<StructureIdentifier config={mockConfig} onCorrect={handleCorrect} />);

    const targetAtom = screen.getByRole('button', { name: /atom c=o/i });
    fireEvent.click(targetAtom);

    const submitBtn = screen.getByRole('button', { name: /confirm atom selection/i });
    fireEvent.click(submitBtn);

    expect(handleCorrect).toHaveBeenCalled();
    expect(screen.getByText(/target identified correctly!/i)).toBeInTheDocument();
  });

  it('renders correctly in Turkish', () => {
    render(<StructureIdentifier config={mockConfig} locale="tr" />);
    expect(screen.getByText('Yapı Tanımlayıcı')).toBeInTheDocument();
    expect(screen.getByText(/seçmek için yukarıdaki bir atoma tıklayın/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /atom seçimini onayla/i })).toBeInTheDocument();
  });

  it('renders correctly in Arabic with RTL direction', () => {
    const { container } = render(<StructureIdentifier config={mockConfig} locale="ar" />);
    expect(container.firstChild).toHaveAttribute('dir', 'rtl');
    expect(screen.getByText('محدد البنية الكيميائية')).toBeInTheDocument();
    expect(screen.getByText(/انقر على ذرة أعلاه لتحديدها/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /تأكيد اختيار الذرة/i })).toBeInTheDocument();
  });
});

