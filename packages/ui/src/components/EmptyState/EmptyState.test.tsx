import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { EmptyState } from './EmptyState';
import { BookOpen } from 'lucide-react';

describe('EmptyState Component', () => {
  it('renders title, description and triggers action', () => {
    const handleAction = vi.fn();
    render(
      <EmptyState
        icon={<BookOpen data-testid="icon" />}
        title="No Spaced Reviews Due"
        description="You have mastered all review cards for today."
        actionLabel="Explore New Lessons"
        onAction={handleAction}
      />
    );
    expect(screen.getByText('No Spaced Reviews Due')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /explore new lessons/i }));
    expect(handleAction).toHaveBeenCalled();
  });
});
