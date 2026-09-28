import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Slider } from './Slider';

describe('Slider Component', () => {
  it('renders slider and updates on change', () => {
    const handleChange = vi.fn();
    render(
      <Slider
        label="Dose (mg)"
        value={100}
        min={0}
        max={500}
        unit="mg"
        onChange={handleChange}
      />
    );
    expect(screen.getByText('Dose (mg)')).toBeInTheDocument();
    expect(screen.getByText('100 mg')).toBeInTheDocument();

    const input = screen.getByRole('slider');
    fireEvent.change(input, { target: { value: '250' } });
    expect(handleChange).toHaveBeenCalledWith(250);
  });
});
