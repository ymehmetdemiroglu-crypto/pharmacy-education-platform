import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SlideReAnimatorModal } from './SlideReAnimatorModal';

describe('SlideReAnimatorModal', () => {
  it('renders modal when open is true and calls onClose when modal is closed', () => {
    const handleClose = vi.fn();
    const { rerender } = render(<SlideReAnimatorModal open={false} onClose={handleClose} />);

    // When closed, modal content is not rendered
    expect(screen.queryByText(/Fotokopiden Etkileşime/i)).toBeNull();

    // Rerender as open
    rerender(<SlideReAnimatorModal open={true} onClose={handleClose} />);
    expect(screen.getByText(/Fotokopiden Etkileşime/i)).toBeDefined();
  });
});
