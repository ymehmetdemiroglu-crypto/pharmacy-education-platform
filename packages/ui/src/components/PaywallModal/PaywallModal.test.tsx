import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { PaywallModal } from './PaywallModal';

describe('PaywallModal Component', () => {
  it('renders clean TRY pricing exclusively and supports bundle toggle', () => {
    render(<PaywallModal isOpen={true} onClose={() => {}} />);
    // Exclusively Turkish Lira (₺)
    expect(screen.getByText('₺250')).toBeInTheDocument();
    expect(screen.getByText('₺850')).toBeInTheDocument();
    expect(screen.getByText('₺1450')).toBeInTheDocument();

    // Toggle to Dual Bundle
    fireEvent.click(screen.getByRole('button', { name: /dual bundle/i }));
    expect(screen.getByText('₺350')).toBeInTheDocument();
    expect(screen.getByText('₺1150')).toBeInTheDocument();
    expect(screen.getByText('₺2100')).toBeInTheDocument();
  });

  it('triggers onStartTrial when trial button clicked', () => {
    const handleStartTrial = vi.fn();
    render(<PaywallModal isOpen={true} onClose={() => {}} onStartTrial={handleStartTrial} canStartTrial={true} />);
    fireEvent.click(screen.getByRole('button', { name: /start free trial/i }));
    expect(handleStartTrial).toHaveBeenCalled();
  });

  it('calls onSelectPlan with TRY currency when checkout button is clicked', () => {
    const handleSelectPlan = vi.fn();
    render(<PaywallModal isOpen={true} onClose={() => {}} onSelectPlan={handleSelectPlan} />);
    const ctaButton = screen.getByRole('button', { name: /continue with semester pass/i });
    expect(ctaButton).toBeInTheDocument();
    fireEvent.click(ctaButton);
    expect(handleSelectPlan).toHaveBeenCalledWith('semester', 'TRY', false);
  });

  it('renders student-first USD pricing when defaultCurrency is USD', () => {
    const handleSelectPlan = vi.fn();
    render(<PaywallModal isOpen={true} onClose={() => {}} defaultCurrency="USD" onSelectPlan={handleSelectPlan} />);
    expect(screen.getByText('$14')).toBeInTheDocument();
    expect(screen.getByText('$49')).toBeInTheDocument();
    expect(screen.getByText('$89')).toBeInTheDocument();

    const ctaButton = screen.getByRole('button', { name: /continue with semester pass/i });
    fireEvent.click(ctaButton);
    expect(handleSelectPlan).toHaveBeenCalledWith('semester', 'USD', false);
  });
});
