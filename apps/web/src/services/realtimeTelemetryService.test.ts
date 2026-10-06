import { describe, it, expect, vi } from 'vitest';
import { realtimeTelemetry, type WidgetTelemetryEvent } from './realtimeTelemetryService';

describe('RealtimeTelemetryService', () => {
  it('subscribes to events, emits telemetry, and unregisters cleanly', () => {
    const listener = vi.fn();
    const unsubscribe = realtimeTelemetry.subscribe(listener);

    realtimeTelemetry.emitTelemetry({
      widgetId: 'pk_curve',
      action: 'params_changed',
      summary: 'Doz 250 mg yapıldı',
      metrics: { dose: 250 },
    });

    expect(listener).toHaveBeenCalledTimes(1);
    const event: WidgetTelemetryEvent = listener.mock.calls[0]![0];
    expect(event.widgetId).toBe('pk_curve');
    expect(event.summary).toBe('Doz 250 mg yapıldı');
    expect(event.metrics?.['dose']).toBe(250);

    // Unsubscribe
    unsubscribe();
    realtimeTelemetry.emitTelemetry({
      widgetId: 'molecule_viewer',
      action: 'site_clicked',
      summary: 'Kolin grubu seçildi',
    });

    // Should not be called again
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('formats student canvas state for tutor context injection', () => {
    realtimeTelemetry.emitTelemetry({
      widgetId: 'gpcr_visualizer',
      action: 'misconception_occurred',
      summary: 'Gq kaskadı için Adenilat Siklaz seçildi',
      metrics: { pathway: 'Gq' },
      misconceptionAlert: {
        title: 'Gq vs Gs Efektör Yanılgısı',
        rationale: 'Gq adenilat siklazı uyarmaz, PLC uyarır',
        suggestedQuestion: 'Gq ve PLC ilişkisi nedir?',
      },
    });

    const contextStr = realtimeTelemetry.getFormattedContextForTutor();
    expect(contextStr).toContain('[ÖĞRENCİNİN CANLI TUVAL ETKİLEŞİM DURUMU]:');
    expect(contextStr).toContain('GPCR_VISUALIZER');
    expect(contextStr).toContain('Gq vs Gs Efektör Yanılgısı');
  });
});
