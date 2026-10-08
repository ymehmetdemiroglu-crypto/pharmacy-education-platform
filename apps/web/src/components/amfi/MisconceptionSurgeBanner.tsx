import React from 'react';
import { MisconceptionSurgeBroadcast } from '../../types/facultyAmfi.types';

export interface MisconceptionSurgeBannerProps {
  alert: MisconceptionSurgeBroadcast;
  onOpenChallenge: (trapCode: string) => void;
  onDismiss?: () => void;
}

export const MisconceptionSurgeBanner: React.FC<MisconceptionSurgeBannerProps> = ({
  alert,
  onOpenChallenge,
  onDismiss
}) => {
  const percentageDisplay = Math.round(alert.trapped_student_ratio * 100);

  return (
    <div
      role="alert"
      aria-label="Amfi Tuzak Uyarısı"
      className="relative overflow-hidden rounded-xl border-3 border-black bg-gradient-to-r from-amber-500/20 via-rose-500/15 to-amber-500/20 p-4 shadow-[5px_5px_0px_#000000] transition-all"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Left: Flame Icon + Headline & Prompt */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-amber-400 text-xl font-black shadow-[2px_2px_0px_#000000] animate-pulse">
            🔥
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-rose-600 px-2 py-0.5 text-xs font-black uppercase tracking-wider text-white">
                Amfi Radarı ⚡
              </span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Slayt {alert.slide_number} • %{percentageDisplay} Yanılma Oranı ({alert.sample_size_k} öğrenci)
              </span>
              <span className="rounded border border-black/40 bg-white/70 px-1.5 py-0.2 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                k ≥ 10 K-Anonimlik
              </span>
            </div>
            <h4 className="mt-1 font-heading text-sm font-black text-slate-900 dark:text-white md:text-base">
              {alert.headline}
            </h4>
            <p className="mt-0.5 line-clamp-2 text-xs font-medium text-slate-700 dark:text-slate-300">
              "{alert.diagnostic_prompt}"
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex shrink-0 items-center gap-2 self-end md:self-center">
          <button
            type="button"
            onClick={() => onOpenChallenge(alert.trap_code)}
            className="flex items-center gap-1.5 rounded-lg border-2 border-black bg-amber-400 px-4 py-2 font-heading text-xs font-black text-black shadow-[3px_3px_0px_#000000] transition hover:bg-amber-300 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000]"
          >
            <span>Tuzak Mücadelesine Katıl</span>
            <span aria-hidden="true">⚡</span>
          </button>
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Uyanı kapat"
              className="rounded-lg border-2 border-black bg-white px-2.5 py-2 text-xs font-black text-slate-700 shadow-[2px_2px_0px_#000000] hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
