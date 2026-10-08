import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Card } from './Card';

describe('Card Component', () => {
  it('renders content properly', () => {
    render(<Card>Molecular Scaffold Content</Card>);
    expect(screen.getByText('Molecular Scaffold Content')).toBeInTheDocument();
  });

  it('applies squircle rounded-2xl and border classes', () => {
    const { container } = render(<Card variant="default">Test Card</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('rounded-2xl');
    expect(el).toHaveClass('border');
  });

  it('renders elevated variant with larger shadow', () => {
    const { container } = render(<Card elevated>Elevated Card</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('shadow-md');
  });
});
