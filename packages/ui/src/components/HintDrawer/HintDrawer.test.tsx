import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { HintDrawer } from './HintDrawer';

describe('HintDrawer Component', () => {
  const hints = ['Consider the ester bond.', 'Look at the aromatic ring.', 'The carboxylate group binds Arg212.'];

  it('renders closed initially and expands on button click', () => {
    render(<HintDrawer hints={hints} isPremiumOrTrial={true} />);
    expect(screen.getByText(/hint ladder \(0\/3 unlocked\)/i)).toBeInTheDocument();

    const hintBtn = screen.getByRole('button', { name: /need a hint\?/i });
    fireEvent.click(hintBtn);

    expect(screen.getByText('Consider the ester bond.')).toBeInTheDocument();
  });

  it('triggers upgrade callback on Tier 2 if user is on free tier', () => {
    const handleUpgrade = vi.fn();
    render(<HintDrawer hints={hints} isPremiumOrTrial={false} onUpgradeClick={handleUpgrade} />);

    // Unlock Tier 1
    fireEvent.click(screen.getByRole('button', { name: /need a hint\?/i }));
    expect(screen.getByText('Consider the ester bond.')).toBeInTheDocument();

    // Attempt to unlock Tier 2
    fireEvent.click(screen.getByRole('button', { name: /next tier/i }));
    expect(handleUpgrade).toHaveBeenCalled();
  });
});
