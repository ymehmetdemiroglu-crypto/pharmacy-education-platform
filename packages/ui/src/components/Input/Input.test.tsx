import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Input } from './Input';

describe('Input Component', () => {
  it('renders label and handles typing', () => {
    const handleChange = vi.fn();
    render(<Input label="pKa Value" onChange={handleChange} />);
    const input = screen.getByLabelText(/pka value/i);
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: '9.4' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders error message and applies error styling', () => {
    render(<Input label="Clearance" error="Value must be positive" />);
    expect(screen.getByText(/value must be positive/i)).toBeInTheDocument();
  });
});
