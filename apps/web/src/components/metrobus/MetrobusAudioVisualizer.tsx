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
    <div className="w-full bg-[#1A1A1A] border-3 border-black shadow-[4px_4px_0px_#000] p-3 text-white rounded-none">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#6BCB77] animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-bold">
            {acousticFilterEnabled ? 'DSP Kaskat Biquad Filtresi (4. Derece)' : 'Ham Ses Girişi (Filtresiz)'}
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-800 text-yellow-400 border border-neutral-700">
          {transitLabel}
        </span>
      </div>

      {showEqCurve ? (
        // EQ Frequency Response SVG
        <div className="relative h-20 w-full bg-neutral-900 border border-neutral-800 p-1 mb-2">
          <svg className="w-full h-full" viewBox="0 0 240 70" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="35" x2="240" y2="35" stroke="#333" strokeDasharray="2,2" />
            <line x1="60" y1="0" x2="60" y2="70" stroke="#262626" />
            <line x1="120" y1="0" x2="120" y2="70" stroke="#262626" />
            <line x1="180" y1="0" x2="180" y2="70" stroke="#262626" />

            {/* Raw Cabin Noise (Red dashed line showing diesel rumble at low freqs) */}
            <polyline
              fill="none"
              stroke="#FF6B9D"
              strokeWidth="2"
              strokeDasharray="3,3"
              opacity="0.8"
              points={profilePoints
                .map((pt, idx) => {
                  const x = (idx / (profilePoints.length - 1)) * 240;
                  // Map rawMagnitudeDb (-20 to +20) to SVG y (65 to 5)
                  const y = 35 - pt.rawMagnitudeDb * 1.5;
                  return `${x},${Math.max(5, Math.min(65, y))}`;
                })
                .join(' ')}
            />

            {/* Filtered Profile (Green solid curve showing -24 dB attenuation at <150 Hz) */}
            {acousticFilterEnabled && (
              <polyline
                fill="none"
                stroke="#6BCB77"
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
          <div className="absolute bottom-1 right-2 flex items-center gap-3 text-[9px] font-mono">
            <span className="text-[#FF6B9D] flex items-center gap-1">
              <span className="inline-block w-2 h-0.5 bg-[#FF6B9D]" /> Dizel Gürültüsü (&lt;150Hz)
            </span>
            <span className="text-[#6BCB77] flex items-center gap-1">
              <span className="inline-block w-2 h-0.5 bg-[#6BCB77]" /> Filtrelenmiş Ses (+4dB Formant)
            </span>
          </div>
        </div>
      ) : (
        // Dynamic Waveform Spectrum Bars
        <div className="h-12 w-full flex items-end justify-between gap-1 px-1 bg-black/60 border border-neutral-800 py-1">
          {bars.map((height, idx) => {
            const isSpeechZone = idx >= 6 && idx <= 18;
            let barColor = '#4D96FF'; // default cyan/blue
            if (status === 'LISTENING') barColor = '#6BCB77'; // emerald
            if (status === 'AFFIRMATION') barColor = '#6BCB77';
            if (status === 'VERBAL_NUDGE') barColor = '#FFD93D';
            if (!acousticFilterEnabled && idx < 6) barColor = '#FF6B9D'; // red low diesel rumble

            return (
              <div
                key={idx}
                className="flex-1 rounded-none transition-all duration-100"
                style={{
                  height: `${height}%`,
                  backgroundColor: barColor,
                  opacity: isSpeechZone ? 1.0 : 0.6
                }}
              />
            );
          })}
        </div>
      )}

      <div className="flex items-center justify-between mt-1 text-[10px] font-mono text-neutral-400">
        <span>40 Hz (Dizel Motor)</span>
        <span>1.8 kHz (Ses Formantı)</span>
        <span>8.0 kHz</span>
      </div>
    </div>
  );
};
