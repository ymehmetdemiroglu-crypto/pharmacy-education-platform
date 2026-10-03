import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { HintLadder } from './HintLadder';
import { HintLadderConfig } from './schema';

const mockConfig: HintLadderConfig = {
  stepPrompt: 'Determine which bioisosteric replacement preserves aromatic electron density.',
  hints: [
    'Focus on the 5-membered heterocycles.',
    'Thiophene has an electronegativity similar to benzene.',
    'Replace the benzene ring with thiophene (-S- for -CH=CH-).',
  ],
  source: {
    file: '1-giri-ve-temel-kavramlar.pdf',
    page: 26,
  },
};

describe('HintLadder Widget', () => {
  it('renders prompt and hints container in default English', () => {
    render(<HintLadder config={mockConfig} />);
    expect(screen.getByText(/determine which bioisosteric replacement/i)).toBeInTheDocument();
    expect(screen.getByText(/3-tier hint ladder/i)).toBeInTheDocument();
  });

  it('renders correctly in Turkish with Turkish badge and source', () => {
    render(<HintLadder config={mockConfig} locale="tr" />);
    expect(screen.getByText(/3 Aşamalı İpucu Merdiveni/i)).toBeInTheDocument();
    expect(screen.getByText(/Kaynak: 1-giri-ve-temel-kavramlar\.pdf \(s\. 26\)/i)).toBeInTheDocument();
  });

  it('renders correctly in Arabic with RTL attribute and Arabic badge', () => {
    const { container } = render(<HintLadder config={mockConfig} locale="ar" />);
    const card = container.querySelector('[dir="rtl"]');
    expect(card).toBeInTheDocument();
    expect(screen.getByText(/سلم التلميحات ثلاثي المراحل/i)).toBeInTheDocument();
    expect(screen.getByText(/المصدر: 1-giri-ve-temel-kavramlar\.pdf \(ص\. 26\)/i)).toBeInTheDocument();
  });
});
