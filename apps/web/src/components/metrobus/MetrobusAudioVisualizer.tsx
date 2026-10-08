import React, { useMemo } from 'react';
import { calculateAcousticFilterProfile } from '../../services/metrobusAudioEngine';
import { AudioDrillStatus } from '../../types/metrobusAudio.types';

interface MetrobusAudioVisualizerProps {
  status: AudioDrillStatus;
  acousticFilterEnabled: boolean;
  transitLabel: string;
  showEqCurve?: boolean;
}

export const MetrobusAudioVisualizer: React.FC<MetrobusAudioVisualizerProps> = ({
  status,
  acousticFilterEnabled,
  transitLabel,
  showEqCurve = false
}) => {
  // Generate 24 visualizer frequency bars
  const bars = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      let heightPct = 15;
      if (status === 'PROMPT_PLAYING') {
        heightPct = 25 + Math.sin((i / 24) * Math.PI * 3 + Date.now() / 150) * 35 + Math.random() * 25;
      } else if (status === 'LISTENING') {
        heightPct = 20 + Math.sin((i / 24) * Math.PI * 4) * 45 + Math.random() * 30;
      } else if (status === 'AFFIRMATION') {
        heightPct = 60 + Math.sin((i / 24) * Math.PI * 2) * 30;
      } else if (status === 'VERBAL_NUDGE') {
        heightPct = 35 + Math.sin(i) * 20;
      }
      return Math.max(10, Math.min(95, Math.round(heightPct)));
    });
  }, [status]);

  const profilePoints = useMemo(() => {
    return calculateAcousticFilterProfile(24, 180, 3800, 1800, 4.0);
  }, []);

  return (
    <div className="w-full bg-[#1A1A1A] dark:bg-[#141414] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl p-4 text-white shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono tracking-wide text-neutral-300 font-semibold">
            {acousticFilterEnabled ? 'DSP Kaskat Biquad Filtresi (4. Derece)' : 'Ham Ses Girişi (Filtresiz)'}
          </span>
        </div>
        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#262626] text-neutral-300 border border-[#383838]">
          {transitLabel}
        </span>
      </div>

      {showEqCurve ? (
        // EQ Frequency Response SVG
        <div className="relative h-24 w-full bg-[#111111] border border-[#262626] rounded-xl p-2 mb-2">
          <svg className="w-full h-full" viewBox="0 0 240 70" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="35" x2="240" y2="35" stroke="#262626" strokeDasharray="3,3" />
            <line x1="60" y1="0" x2="60" y2="70" stroke="#1F1F1F" />
            <line x1="120" y1="0" x2="120" y2="70" stroke="#1F1F1F" />
            <line x1="180" y1="0" x2="180" y2="70" stroke="#1F1F1F" />

            {/* Raw Cabin Noise (Red/Rose dashed line showing diesel rumble at low freqs) */}
            <polyline
              fill="none"
              stroke="#F43F5E"
              strokeWidth="1.5"
              strokeDasharray="3,3"
              opacity="0.8"
              points={profilePoints
                .map((pt, idx) => {
                  const x = (idx / (profilePoints.length - 1)) * 240;
                  const y = 35 - pt.rawMagnitudeDb * 1.5;
                  return `${x},${Math.max(5, Math.min(65, y))}`;
                })
                .join(' ')}
            />

            {/* Filtered Profile (Emerald solid curve showing -24 dB attenuation at <150 Hz) */}
            {acousticFilterEnabled && (
              <polyline
                fill="none"
                stroke="#10A37F"
                strokeWidth="2.5"
                points={profilePoints
                  .map((pt, idx) => {
                    const x = (idx / (profilePoints.length - 1)) * 240;
                    const y = 35 - pt.filteredMagnitudeDb * 1.5;
                    return `${x},${Math.max(5, Math.min(65, y))}`;
                  })
                  .join(' ')}
              />
            )}
          </svg>

          {/* Legend */}
          <div className="absolute bottom-1.5 right-2.5 flex items-center gap-3 text-[10px] font-mono">
            <span className="text-rose-400 flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-0.5 bg-rose-400" /> Dizel Gürültüsü (&lt;150Hz)
            </span>
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-0.5 bg-emerald-400" /> Filtrelenmiş Ses (+4dB)
            </span>
          </div>
        </div>
      ) : (
        // Dynamic Waveform Spectrum Bars
        <div className="h-14 w-full flex items-end justify-between gap-1 px-2 bg-[#111111] border border-[#262626] rounded-xl py-2">
          {bars.map((height, idx) => {
            const isSpeechZone = idx >= 6 && idx <= 18;
            let barColor = '#3B82F6'; // modern indigo/blue
            if (status === 'LISTENING') barColor = '#10A37F'; // emerald
            if (status === 'AFFIRMATION') barColor = '#10A37F';
            if (status === 'VERBAL_NUDGE') barColor = '#F59E0B'; // amber
            if (!acousticFilterEnabled && idx < 6) barColor = '#F43F5E'; // rose low diesel rumble

            return (
              <div
                key={idx}
                className="flex-1 rounded-t-sm transition-all duration-100"
                style={{
                  height: `${height}%`,
                  backgroundColor: barColor,
                  opacity: isSpeechZone ? 1.0 : 0.45
                }}
              />
            );
          })}
        </div>
      )}

      <div className="flex items-center justify-between mt-2 text-[10px] font-mono text-neutral-400">
        <span>40 Hz (Dizel Motor)</span>
        <span>1.8 kHz (Ses Formantı)</span>
        <span>8.0 kHz</span>
      </div>
    </div>
  );
};
