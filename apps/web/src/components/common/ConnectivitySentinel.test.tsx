import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ConnectivitySentinel } from './ConnectivitySentinel';

describe('ConnectivitySentinel', () => {
  it('renders nothing when initially online', () => {
    const { container } = render(<ConnectivitySentinel initialOnlineState={true} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders offline pill when initial state is offline and allows manual dismiss', () => {
    render(<ConnectivitySentinel initialOnlineState={false} />);

    expect(screen.getByRole('status')).toBeTruthy();
    expect(screen.getByText(/Çevrimdışı Mod:/i)).toBeTruthy();

    const closeBtn = screen.getByRole('button', { name: /Kapat/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('status')).toBeNull();
  });

  it('responds to offline and online window events', () => {
    render(<ConnectivitySentinel initialOnlineState={true} />);

    // Trigger offline
    act(() => {
      window.dispatchEvent(new Event('offline'));
    });

    expect(screen.getByText(/Çevrimdışı Mod:/i)).toBeTruthy();

    // Trigger online
    act(() => {
      window.dispatchEvent(new Event('online'));
    });

    expect(screen.getByText(/Yeniden Bağlandı:/i)).toBeTruthy();
  });
});
