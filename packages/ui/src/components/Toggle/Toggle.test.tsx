import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Toggle } from './Toggle';

describe('Toggle Component', () => {
  it('toggles when clicked', () => {
    const handleChange = vi.fn();
    render(<Toggle label="Show Therapeutic Range" checked={false} onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(true);
  });
});
