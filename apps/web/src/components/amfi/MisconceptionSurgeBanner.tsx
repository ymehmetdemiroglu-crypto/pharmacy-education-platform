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
      className="relative overflow-hidden rounded-2xl border border-amber-300 dark:border-amber-800/60 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 p-4 sm:p-5 shadow-xs transition-all"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Left: Flame Icon + Headline & Prompt */}
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-300 dark:border-amber-700/60 bg-amber-500/20 text-xl font-bold animate-pulse shadow-2xs">
            🔥
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-rose-600/90 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
                Amfi Radarı ⚡
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Slayt {alert.slide_number} • %{percentageDisplay} Yanılma Oranı ({alert.sample_size_k} öğrenci)
              </span>
              <span className="rounded-md border border-slate-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                k ≥ 10 K-Anonimlik
              </span>
            </div>
            <h4 className="mt-1 text-sm font-bold text-slate-900 dark:text-white md:text-base">
              {alert.headline}
            </h4>
            <p className="mt-0.5 line-clamp-2 text-xs font-medium text-slate-600 dark:text-slate-300">
              "{alert.diagnostic_prompt}"
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex shrink-0 items-center gap-2 self-end md:self-center">
          <button
            type="button"
            onClick={() => onOpenChallenge(alert.trap_code)}
            className="flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors active:scale-95"
          >
            <span>Tuzak Mücadelesine Katıl</span>
            <span aria-hidden="true">⚡</span>
          </button>
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Uyanı kapat"
              className="rounded-xl border border-slate-200 dark:border-[#383838] bg-white dark:bg-[#252525] px-2.5 py-2 text-xs font-semibold text-slate-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-[#2C2C2C] transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
