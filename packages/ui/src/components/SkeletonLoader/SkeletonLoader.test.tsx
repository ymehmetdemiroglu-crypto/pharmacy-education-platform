import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { SkeletonLoader } from './SkeletonLoader';

describe('SkeletonLoader Component', () => {
  it('renders with loading accessibility role', () => {
    render(<SkeletonLoader height="h-24" />);
    const el = screen.getByRole('status');
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass('h-24');
    expect(el).toHaveClass('border');
  });
});
