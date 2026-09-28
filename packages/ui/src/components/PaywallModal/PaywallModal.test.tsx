import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { PaywallModal } from './PaywallModal';

describe('PaywallModal Component', () => {
  it('switches currency when currency buttons are clicked', () => {
    render(<PaywallModal isOpen={true} onClose={() => {}} />);
    expect(screen.getByText('$49')).toBeInTheDocument(); // USD default semester

    fireEvent.click(screen.getByRole('button', { name: 'TRY' }));
    expect(screen.getByText('₺850')).toBeInTheDocument(); // TRY semester

    fireEvent.click(screen.getByRole('button', { name: 'SAR' }));
    expect(screen.getByText('SAR 190')).toBeInTheDocument(); // SAR semester
  });

  it('triggers onStartTrial when trial button clicked', () => {
    const handleStartTrial = vi.fn();
    render(<PaywallModal isOpen={true} onClose={() => {}} onStartTrial={handleStartTrial} canStartTrial={true} />);
    fireEvent.click(screen.getByRole('button', { name: /start free trial/i }));
    expect(handleStartTrial).toHaveBeenCalled();
  });
});
