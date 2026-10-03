import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ConfidenceGauge } from './ConfidenceGauge';

describe('ConfidenceGauge Component', () => {
  it('renders prompt and options correctly for en locale', () => {
    const handleChange = vi.fn();
    render(<ConfidenceGauge onChange={handleChange} locale="en" />);

    expect(screen.getByRole('radiogroup', { name: /how sure are you\?/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /sure/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /50-50/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /guessing/i })).toBeInTheDocument();
  });

  it('renders prompt and options correctly for tr locale', () => {
    const handleChange = vi.fn();
    render(<ConfidenceGauge onChange={handleChange} locale="tr" />);

    expect(screen.getByRole('radiogroup', { name: /ne kadar eminsiniz\?/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /eminim/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /kararsızım/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /tahmin/i })).toBeInTheDocument();
  });

  it('triggers onChange when an option is clicked', () => {
    const handleChange = vi.fn();
    render(<ConfidenceGauge onChange={handleChange} locale="en" />);

    fireEvent.click(screen.getByRole('radio', { name: /sure/i }));
    expect(handleChange).toHaveBeenCalledWith('sure');

    fireEvent.click(screen.getByRole('radio', { name: /guessing/i }));
    expect(handleChange).toHaveBeenCalledWith('guessing');
  });

  it('does not trigger onChange when disabled', () => {
    const handleChange = vi.fn();
    render(<ConfidenceGauge disabled onChange={handleChange} locale="en" />);

    const radio = screen.getByRole('radio', { name: /sure/i });
    expect(radio).toBeDisabled();
    fireEvent.click(radio);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('handles keyboard navigation using arrow keys', () => {
    const handleChange = vi.fn();
    render(<ConfidenceGauge value="sure" onChange={handleChange} locale="en" />);

    const sureRadio = screen.getByRole('radio', { name: /sure/i });
    fireEvent.keyDown(sureRadio, { key: 'ArrowRight' });
    expect(handleChange).toHaveBeenCalledWith('medium');
  });

  it('marks selected radio button with aria-checked', () => {
    const handleChange = vi.fn();
    render(<ConfidenceGauge value="medium" onChange={handleChange} locale="en" />);

    expect(screen.getByRole('radio', { name: /sure/i })).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByRole('radio', { name: /50-50/i })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: /guessing/i })).toHaveAttribute('aria-checked', 'false');
  });
});
