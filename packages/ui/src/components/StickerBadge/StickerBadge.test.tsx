import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { StickerBadge } from './StickerBadge';

describe('StickerBadge Component', () => {
  it('renders text with badge styles', () => {
    render(<StickerBadge variant="green">Bioisostere</StickerBadge>);
    const badge = screen.getByText('Bioisostere');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('border');
    expect(badge).toHaveClass('rounded-full');
  });
});
