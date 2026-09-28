import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { TrialBanner } from './TrialBanner';

describe('TrialBanner Component', () => {
  it('renders free preview banner with start trial CTA', () => {
    const handleClick = vi.fn();
    render(<TrialBanner status="free_preview" onActionClick={handleClick} />);
    expect(screen.getByText(/lessons 1 & 2 of all modules are/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /start 7-day free trial/i }));
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders active trial with remaining days', () => {
    render(<TrialBanner status="active_trial" daysRemaining={4} onActionClick={() => {}} />);
    expect(screen.getByText(/4 days remaining/i)).toBeInTheDocument();
  });
});
