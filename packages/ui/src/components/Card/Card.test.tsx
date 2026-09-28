import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Card } from './Card';

describe('Card Component', () => {
  it('renders content properly', () => {
    render(<Card>Molecular Scaffold Content</Card>);
    expect(screen.getByText('Molecular Scaffold Content')).toBeInTheDocument();
  });

  it('applies neo-brutalist 3px border and 6px shadow', () => {
    const { container } = render(<Card variant="default">Test Card</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('border-3');
    expect(el).toHaveClass('shadow-neo');
  });

  it('renders elevated variant with larger shadow', () => {
    const { container } = render(<Card elevated>Elevated Card</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('shadow-neo-lg');
  });
});
