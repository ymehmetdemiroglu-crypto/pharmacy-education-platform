import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MetabolismMap } from './MetabolismMap';
import { MetabolismMapConfig } from './schema';

const mockMetabolism: MetabolismMapConfig = {
  drugName: 'Paracetamol',
  prompt: 'Identify the metabolic pathway responsible for hepatotoxic quinoneimine formation.',
  moleculeSvgDescription: 'Acetaminophen core',
  sites: [
    {
      id: 's-cyp',
      label: 'N-Hydroxylation',
      x: 100,
      y: 40,
      enzyme: 'CYP2E1',
      phase: 'Phase I',
      reactionType: 'Oxidation / Bioactivation',
      metaboliteOutcome: 'Forms reactive electrophile NAPQI, causing glutathione depletion and hepatic necrosis.',
      toxicityFlag: 'toxic',
      isTargetSite: true,
    },
    {
      id: 's-ugt',
      label: '4-O-Glucuronidation',
      x: 300,
      y: 40,
      enzyme: 'UGT1A6',
      phase: 'Phase II',
      reactionType: 'Glucuronide Conjugation',
      metaboliteOutcome: 'Inert, highly water-soluble glucuronide cleared rapidly by the kidneys (55% of dose).',
      toxicityFlag: 'non_toxic',
      isTargetSite: false,
    },
  ],
  source: {
    file: '1-giri-ve-temel-kavramlar.pdf',
    page: 28,
  },
  explanation: 'CYP2E1 oxidizes paracetamol to N-acetyl-p-benzoquinone imine (NAPQI). Under overdose conditions, hepatic glutathione is depleted, leading to covalent binding with mitochondrial proteins.',
};

describe('MetabolismMap Widget', () => {
  it('renders drug name and clickable metabolic sites', () => {
    render(<MetabolismMap config={mockMetabolism} />);
    expect(screen.getByText(/paracetamol biotransformation pathways/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /metabolic site: n-hydroxylation via cyp2e1/i })).toBeInTheDocument();
  });

  it('selects target site and triggers onCorrect', () => {
    const handleCorrect = vi.fn();
    render(<MetabolismMap config={mockMetabolism} onCorrect={handleCorrect} />);

    const cypSite = screen.getByRole('button', { name: /metabolic site: n-hydroxylation via cyp2e1/i });
    fireEvent.click(cypSite);

    const submitBtn = screen.getByRole('button', { name: /confirm target site/i });
    fireEvent.click(submitBtn);

    expect(handleCorrect).toHaveBeenCalled();
    expect(screen.getByText(/correct metabolic vulnerability identified!/i)).toBeInTheDocument();
  });

  it('renders correctly in Turkish', () => {
    render(<MetabolismMap config={mockMetabolism} locale="tr" />);
    expect(screen.getByText(/metabolizma ve biyotansformasyon haritası/i)).toBeInTheDocument();
    expect(screen.getByText(/paracetamol biyotansformasyon yolakları/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /hedef bölgeyi onayla/i })).toBeInTheDocument();
  });

  it('renders correctly in Arabic with RTL direction', () => {
    const { container } = render(<MetabolismMap config={mockMetabolism} locale="ar" />);
    expect(container.firstChild).toHaveAttribute('dir', 'rtl');
    expect(screen.getByText(/خريطة الاستقلاب والتحول الحيوي/i)).toBeInTheDocument();
    expect(screen.getByText(/مسارات التحول الحيوي لـ Paracetamol/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /تأكيد الموقع المستهدف/i })).toBeInTheDocument();
  });
});

