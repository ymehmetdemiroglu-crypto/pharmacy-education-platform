import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SarMatrixWidget } from './SarMatrixWidget';
import { realtimeTelemetry } from '../../services/realtimeTelemetryService';

describe('SarMatrixWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('renders default table view with Ester vs Amit series', () => {
    render(<SarMatrixWidget />);
    expect(screen.getByText(/Dinamik SAR Matrisi/i)).toBeTruthy();
    expect(screen.getByText(/Prokain \(-COO- ester\)/i)).toBeTruthy();
    expect(screen.getByText(/Lidokain \/ Dibukain/i)).toBeTruthy();
  });

  it('switches to tactile explorer mode and renders substituents selectors', () => {
    const telemetrySpy = vi.spyOn(realtimeTelemetry, 'emitTelemetry');
    render(<SarMatrixWidget />);

    const explorerTab = screen.getByText(/Canlı Sübstitüent Deneyi/i);
    fireEvent.click(explorerTab);

    expect(screen.getByText(/Sentezlenen İskelet:/i)).toBeTruthy();
    expect(screen.getByText(/R1: Aromatik Halka/i)).toBeTruthy();
    expect(screen.getByText(/R2: Köprü İzosteri/i)).toBeTruthy();
    expect(screen.getByText(/R3: Terminal Amin/i)).toBeTruthy();
    expect(telemetrySpy).toHaveBeenCalledWith(
      expect.objectContaining({
        widgetId: 'sar_matrix',
        action: 'substituents_changed',
      })
    );
  });

  it('emits high severity misconception alert when quaternary nitrogen is selected', () => {
    const telemetrySpy = vi.spyOn(realtimeTelemetry, 'emitTelemetry');
    render(<SarMatrixWidget />);

    // Switch to tactile explorer
    fireEvent.click(screen.getByText(/Canlı Sübstitüent Deneyi/i));

    // Select Quaternary Azot in R3
    const quatButton = screen.getByText(/Kuaterner Azot/i);
    fireEvent.click(quatButton);

    expect(telemetrySpy).toHaveBeenCalledWith(
      expect.objectContaining({
        widgetId: 'sar_matrix',
        metrics: expect.objectContaining({
          r3: 'quaternary',
          membranePerm: 'blocked',
        }),
        misconceptionAlert: expect.objectContaining({
          title: expect.stringContaining('Kuaterner Azot Bariyeri Hatası'),
          severity: 'high',
        }),
      })
    );
  });

  it('invokes onAskTutor with synthesized molecule data when button is clicked', () => {
    const mockAskTutor = vi.fn();
    render(<SarMatrixWidget onAskTutor={mockAskTutor} />);

    // Switch to tactile explorer
    fireEvent.click(screen.getByText(/Canlı Sübstitüent Deneyi/i));

    const askButton = screen.getByText(/Bu Molekülü Tutor'a Sor/i);
    fireEvent.click(askButton);

    expect(mockAskTutor).toHaveBeenCalledTimes(1);
    expect(mockAskTutor).toHaveBeenCalledWith(
      expect.stringContaining('Tasarladığım molekül: R1=')
    );
  });
});
