import { getSupabase } from '@pharmacy/platform';

export type WidgetType =
  | 'pk_curve'
  | 'molecule_viewer'
  | 'sar_matrix'
  | 'gpcr_visualizer'
  | 'concept_quiz';

export interface MisconceptionAlert {
  title: string;
  rationale: string;
  suggestedQuestion: string;
  severity?: 'low' | 'medium' | 'high';
}

export interface WidgetTelemetryEvent {
  id: string;
  widgetId: WidgetType;
  action: string;
  summary: string;
  metrics?: Record<string, any>;
  misconceptionAlert?: MisconceptionAlert | null;
  timestamp: number;
}

type TelemetryListener = (event: WidgetTelemetryEvent) => void;

class RealtimeTelemetryService {
  private localListeners: Set<TelemetryListener> = new Set();
  private history: WidgetTelemetryEvent[] = [];
  private latestByWidget: Map<WidgetType, WidgetTelemetryEvent> = new Map();
  private supabaseChannel: any = null;
  private channelName = 'workspace:telemetry';
  private isChannelReady = false;

  constructor() {
    this.initSupabaseRealtime();
  }

  private initSupabaseRealtime() {
    try {
      const client = getSupabase();
      if (!client || typeof client.channel !== 'function') {
        return;
      }

      this.supabaseChannel = client.channel(this.channelName);

      this.supabaseChannel
        .on('broadcast', { event: 'widget_telemetry' }, (payload: { payload: WidgetTelemetryEvent }) => {
          if (payload && payload.payload) {
            this.handleIncomingTelemetry(payload.payload, false);
          }
        })
        .subscribe((status: string) => {
          if (status === 'SUBSCRIBED') {
            this.isChannelReady = true;
          }
        });
    } catch {
      // In-memory fallback remains 100% active
    }
  }

  private handleIncomingTelemetry(event: WidgetTelemetryEvent, broadcastToRemote = true) {
    this.history.push(event);
    if (this.history.length > 30) {
      this.history.shift();
    }
    this.latestByWidget.set(event.widgetId, event);

    // Notify local subscribers
    this.localListeners.forEach((listener) => {
      try {
        listener(event);
      } catch (err) {
        console.error('[Telemetry] listener error:', err);
      }
    });

    // Broadcast through Supabase Realtime if connected and originated locally
    if (broadcastToRemote && this.supabaseChannel && this.isChannelReady) {
      try {
        this.supabaseChannel.send({
          type: 'broadcast',
          event: 'widget_telemetry',
          payload: event,
        });
      } catch {
        // Safe silent fail
      }
    }
  }

  /**
   * Emit an interaction event from any interactive widget
   */
  public emitTelemetry(params: {
    widgetId: WidgetType;
    action: string;
    summary: string;
    metrics?: Record<string, any>;
    misconceptionAlert?: MisconceptionAlert | null;
  }) {
    const event: WidgetTelemetryEvent = {
      id: `tel-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      widgetId: params.widgetId,
      action: params.action,
      summary: params.summary,
      metrics: params.metrics || {},
      misconceptionAlert: params.misconceptionAlert || null,
      timestamp: Date.now(),
    };

    this.handleIncomingTelemetry(event, true);
  }

  /**
   * Subscribe to live telemetry events (used by Socratic AI Tutor)
   */
  public subscribe(listener: TelemetryListener): () => void {
    this.localListeners.add(listener);
    return () => {
      this.localListeners.delete(listener);
    };
  }

  /**
   * Returns recent events history
   */
  public getHistory(): WidgetTelemetryEvent[] {
    return [...this.history];
  }

  /**
   * Returns latest event for a specific widget
   */
  public getLatestState(widgetId: WidgetType): WidgetTelemetryEvent | undefined {
    return this.latestByWidget.get(widgetId);
  }

  /**
   * Formats current student canvas state into a concise prompt inject for the AI Tutor
   */
  public getFormattedContextForTutor(): string {
    if (this.latestByWidget.size === 0) {
      return '';
    }

    const lines: string[] = ['[ÖĞRENCİNİN CANLI TUVAL ETKİLEŞİM DURUMU]:'];
    this.latestByWidget.forEach((ev, wId) => {
      lines.push(`- ${wId.toUpperCase()}: ${ev.summary}`);
      if (ev.metrics && Object.keys(ev.metrics).length > 0) {
        const metricsStr = Object.entries(ev.metrics)
          .map(([k, v]) => `${k}=${v}`)
          .join(', ');
        lines.push(`  Ölçümler: ${metricsStr}`);
      }
      if (ev.misconceptionAlert) {
        lines.push(`  ⚠️ Tespit Edilen Yanılgı: "${ev.misconceptionAlert.title}" (${ev.misconceptionAlert.rationale})`);
      }
    });

    return lines.join('\n');
  }
}

export const realtimeTelemetry = new RealtimeTelemetryService();
