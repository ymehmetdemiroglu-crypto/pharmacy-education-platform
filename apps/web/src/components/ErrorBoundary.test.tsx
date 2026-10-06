import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

const BombComponent: React.FC<{ shouldThrow?: boolean }> = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Simulation WebGL context lost error');
  }
  return <div>Normal Content Safe</div>;
};

describe('ErrorBoundary', () => {
  // Suppress console.error in tests for intentional exception
  const originalError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
  });
  afterEach(() => {
    console.error = originalError;
  });

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <BombComponent shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Normal Content Safe')).toBeTruthy();
  });

  it('catches uncaught rendering error and displays Obsidian fallback card with actions', () => {
    render(
      <ErrorBoundary>
        <BombComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    // Fallback UI should render
    expect(screen.getByText(/Bir Hata Oluştu/i)).toBeTruthy();
    expect(screen.getByText(/Simulation WebGL context lost error/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /Yeniden Dene & Tuvali Başlat/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /Ana Sayfaya Dön/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /Önbelleği Sıfırla/i })).toBeTruthy();
  });
});
