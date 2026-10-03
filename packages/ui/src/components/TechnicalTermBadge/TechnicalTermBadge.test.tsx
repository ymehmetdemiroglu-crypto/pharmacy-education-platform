import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { TechnicalTermBadge } from './TechnicalTermBadge';

describe('TechnicalTermBadge Component', () => {
  it('renders term in strict LTR semantic badge with amber styling', () => {
    render(<TechnicalTermBadge term="Ferguson İlkesi" />);
    const badge = screen.getByRole('term');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('Ferguson İlkesi');
    expect(badge).toHaveAttribute('dir', 'ltr');
    expect(badge).toHaveClass('font-mono');
  });

  it('renders optional Arabic transliteration when provided', () => {
    render(
      <TechnicalTermBadge
        term="mitokondri"
        transliteration="ميتوكوندريا"
      />
    );
    const badge = screen.getByRole('term');
    expect(badge).toHaveTextContent('mitokondri');
    expect(badge).toHaveTextContent('(ميتوكوندريا)');
  });

  it('provides accessible tooltip definition and keyboard focus when definition is passed', () => {
    render(
      <TechnicalTermBadge
        term="iyonizasyon"
        definition="Molekülün elektriksel yük kazanma süreci"
      />
    );
    const badge = screen.getByRole('term');
    expect(badge).toHaveAttribute('title', 'Molekülün elektriksel yük kazanma süreci');
    expect(badge).toHaveAttribute('tabIndex', '0');
    expect(badge).toHaveAttribute('aria-label', 'iyonizasyon: Molekülün elektriksel yük kazanma süreci');
  });
});
