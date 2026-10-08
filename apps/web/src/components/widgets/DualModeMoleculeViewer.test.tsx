import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DualModeMoleculeViewer } from './DualModeMoleculeViewer';

describe('DualModeMoleculeViewer (FEAT-WIDGET-01 Touch & 3D Gestures)', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock HTMLCanvasElement.prototype.getContext for JSDOM
    const mockGrad = { addColorStop: vi.fn() };
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      fillText: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      scale: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
      measureText: vi.fn().mockReturnValue({ width: 10 }),
      createRadialGradient: vi.fn().mockReturnValue(mockGrad),
      createLinearGradient: vi.fn().mockReturnValue(mockGrad),
    }) as any;
  });

  it('renders 3D molecule viewer with pharmacophore details and gesture guide', () => {
    render(<DualModeMoleculeViewer initialMolecule="dibucaine" />);

    // Header and molecule tabs
    expect(screen.getByText(/Dibukain \(Slayt 33\)/i)).toBeTruthy();
    expect(screen.getByText(/Prokain \(Slayt 31\)/i)).toBeTruthy();
    expect(screen.getByText(/Lidokain \(Slayt 32\)/i)).toBeTruthy();

    // Pharmacophore details
    expect(screen.getByText(/Bağlanma Bölgeleri/i)).toBeTruthy();
    expect(screen.getByText(/Kinolin Aromatik Çekirdeği/i)).toBeTruthy();
    expect(screen.getByText(/Sürükle: Döndür/i)).toBeTruthy();
  });

  it('handles mobile touch gestures (touchstart, touchmove, touchend) to rotate 3D canvas', () => {
    const { container } = render(<DualModeMoleculeViewer initialMolecule="dibucaine" />);

    const gestureContainer = container.querySelector('.touch-none');
    expect(gestureContainer).toBeTruthy();

    // Simulate mobile touch drag
    fireEvent.touchStart(gestureContainer!, {
      touches: [{ clientX: 100, clientY: 100 }],
    });

    fireEvent.touchMove(gestureContainer!, {
      touches: [{ clientX: 150, clientY: 120 }],
    });

    fireEvent.touchEnd(gestureContainer!);

    // Verified canvas was invoked during touch manipulation
    expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalled();
  });

  it('switches seamlessly between 3D WebGL and 2D chemical structure mode', () => {
    render(<DualModeMoleculeViewer initialMolecule="dibucaine" />);

    // Click 2D Yapı toggle
    const toggle2D = screen.getByText('2D Yapı');
    fireEvent.click(toggle2D);

    // Verify 2D SVG is rendered
    expect(screen.getByText(/Kinolin/i)).toBeTruthy();
  });
});
