import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReceptorSignalingVisualizer } from './ReceptorSignalingVisualizer';
import { realtimeTelemetry } from '../../services/realtimeTelemetryService';

describe('ReceptorSignalingVisualizer', () => {
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

  it('renders GPCR simulator with initial Gs subtype', () => {
    const onAskTutor = vi.fn();
    render(<ReceptorSignalingVisualizer onAskTutor={onAskTutor} />);

    expect(screen.getByText('Reseptör Sinyal Yolağı & GPCR Kaskad Simülatörü')).toBeTruthy();
    expect(screen.getByText('Slayt 5 & 6')).toBeTruthy();
    expect(screen.getByText('Gs (cAMP ↑)')).toBeTruthy();
  });

  it('switches to Gq subtype and updates membrane pathway details', () => {
    const onAskTutor = vi.fn();
    render(<ReceptorSignalingVisualizer onAskTutor={onAskTutor} />);

    const gqBtn = screen.getByText('Gq (IP3/Ca²⁺ ↑)');
    fireEvent.click(gqBtn);

    expect(screen.getByText('Gq (IP3/Ca²⁺ ↑)')).toBeTruthy();
    expect(screen.getByText(/α1 Adrenerjik, M1 & M3 Muskarinik/i)).toBeTruthy();
    expect(screen.getByText(/PIP2 → IP3 \(Ca²⁺ salınımı\) \+ DAG/i)).toBeTruthy();
  });

  it('navigates through steps via Tahmini Doğrula and Sonraki Aşamaya İlerle', () => {
    const onAskTutor = vi.fn();
    render(<ReceptorSignalingVisualizer onAskTutor={onAskTutor} />);

    // Select the correct first option for Gs
    const correctOpt = screen.getByText('Reseptör 7-transmembran heliksinde konformasyon değişimi oluşur');
    fireEvent.click(correctOpt);

    const verifyBtn = screen.getByText('Tahmini Doğrula');
    fireEvent.click(verifyBtn);

    expect(screen.getByText('Doğru Tahmin!')).toBeTruthy();

    const nextBtn = screen.getByText('Sonraki Aşamaya İlerle →');
    fireEvent.click(nextBtn);

    // Step 2 prompt should now be rendered
    expect(screen.getByText(/2. Adım: Aktifleşen Gs-alfa alt biriminde/i)).toBeTruthy();
  });

  it('evaluates misconception in predict-then-reveal challenge and fires telemetry', () => {
    const onAskTutor = vi.fn();
    const telemetrySpy = vi.spyOn(realtimeTelemetry, 'emitTelemetry');

    render(<ReceptorSignalingVisualizer onAskTutor={onAskTutor} />);

    // Click incorrect option for Gs step 1
    const wrongOpt = screen.getByText('Reseptör derhal hücre içine endositozla çekilir');
    fireEvent.click(wrongOpt);

    const verifyBtn = screen.getByText('Tahmini Doğrula');
    fireEvent.click(verifyBtn);

    // Should display pedagogical feedback alert
    expect(screen.getByText('Pedagojik Geri Bildirim')).toBeTruthy();
    expect(screen.getByText(/Endositoz desensitizasyonda uzun vadede olur/i)).toBeTruthy();

    // Verify telemetry with misconception alert was emitted
    expect(telemetrySpy).toHaveBeenCalledWith(
      expect.objectContaining({
        widgetId: 'gpcr_visualizer',
        misconceptionAlert: expect.objectContaining({
          title: expect.stringContaining('GPCR Sinyal Yanılgısı'),
        }),
      })
    );
  });
});
