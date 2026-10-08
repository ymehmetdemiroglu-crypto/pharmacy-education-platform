import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { TactileMechanismView } from './TactileMechanismView';

describe('TactileMechanismView', () => {
  it('renders default arrow pushing workspace with challenge selector and canvas', () => {
    render(<TactileMechanismView />);

    expect(screen.getByTestId('tactile-mechanism-view')).toBeDefined();
    expect(screen.getByText(/Taktil Reaksiyon Mekanizmaları/i)).toBeDefined();
    expect(screen.getByText('Elektron Oku Çizimi')).toBeDefined();
    expect(screen.getByText('Sübstitüent Tak-Çıkar (SAR)')).toBeDefined();
    expect(screen.getByTestId('tactile-arrow-canvas')).toBeDefined();
  });

  it('switches to SAR snapping mode when tab is clicked', () => {
    render(<TactileMechanismView />);

    const sarTab = screen.getByRole('button', { name: /Sübstitüent Tak-Çıkar/i });
    fireEvent.click(sarTab);

    expect(screen.getByTestId('substituent-snap-palette')).toBeDefined();
    expect(screen.getByText(/Klinik Önemi & Sınav Karşılaştırması/i)).toBeDefined();
  });

  it('switches challenge within arrow pushing mode', () => {
    render(<TactileMechanismView />);

    const secondChallengeBtn = screen.getByRole('button', { name: /Organofosfat Zehirlenmesi/i });
    fireEvent.click(secondChallengeBtn);

    const matchingTitles = screen.getAllByText(/Organofosfat Zehirlenmesi/i);
    expect(matchingTitles.length).toBeGreaterThan(0);
  });

  it('unlocks 3-tier hints sequentially', () => {
    render(<TactileMechanismView />);

    const unlockButtons = screen.getAllByRole('button', { name: /İpucunu Aç/i });
    expect(unlockButtons.length).toBe(3);

    fireEvent.click(unlockButtons[0]!);

    expect(screen.getByText(/1\/3 Açıldı/i)).toBeDefined();
  });
});
