import React, { useState, useEffect } from 'react';
import { Button, Progress } from 'antd';
import {
  CaretRightOutlined,
  PauseOutlined,
  ReloadOutlined,
  FireOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  CheckCircleFilled,
  ThunderboltFilled,
} from '@ant-design/icons';
import { studyPulse, StudyPulseState } from '../../services/studyPulseService';

interface StudyPulseLoungeProps {
  onStartStudySession?: () => void;
}

export const StudyPulseLounge: React.FC<StudyPulseLoungeProps> = ({
  onStartStudySession,
}) => {
  const [pulse, setPulse] = useState<StudyPulseState>(studyPulse.getSnapshot());

  useEffect(() => {
    const unsub = studyPulse.subscribe((s) => setPulse(s));
    return unsub;
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const totalDuration = pulse.pomodoro.mode === 'focus' ? 25 * 60 : 5 * 60;
  const elapsed = totalDuration - pulse.pomodoro.remainingSeconds;
  const progressPercent = Math.min(100, Math.round((elapsed / totalDuration) * 100));

  return (
    <section className="bg-white dark:bg-[#171717] rounded-2xl border border-slate-200 dark:border-[#2F2F2F] p-6 sm:p-7 shadow-xs transition-colors">
      {/* Header: Co-Presence Presence Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-[#262626]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg border border-emerald-200/60 dark:border-emerald-900/60 shrink-0">
            <TeamOutlined />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#ECECEC] m-0">
                Sessiz Çalışma Salonu (Canlı Varlık)
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-[#B4B4B4] mt-0.5 mb-0">
              Şu anda <strong>{pulse.activeCount} eczacılık öğrencisi</strong> vize dersleri için odaklanmış durumda.
            </p>
          </div>
        </div>

        {/* Faculty Pills Stack */}
        <div className="flex flex-wrap items-center gap-1.5">
          {pulse.recentFaculties.slice(0, 3).map((faculty, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-[#212121] text-slate-600 dark:text-[#ECECEC] border border-slate-200 dark:border-[#2F2F2F]"
            >
              {faculty}
            </span>
          ))}
          <span className="text-[10px] text-slate-400 px-1">+2 diğer</span>
        </div>
      </div>

      {/* Main Grid: Pomodoro Focus Timer & Daily Retention Habit */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
        {/* Left: Minimalist Pomodoro Timer */}
        <div className="flex flex-col justify-between bg-slate-50 dark:bg-[#212121] p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-[#2F2F2F]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-[#ECECEC]">
                <ClockCircleOutlined className="text-emerald-500" />
                {pulse.pomodoro.mode === 'focus' ? 'Odaklanma Seansı (25 Dk)' : 'Kısa Mola (5 Dk)'}
              </span>
              <span className="text-xs text-slate-500 dark:text-[#8E8E8E]">
                {pulse.pomodoro.completedCycles} Döngü Tamamlandı
              </span>
            </div>

            {/* Big Digits Display */}
            <div className="flex items-baseline gap-3 my-2">
              <span className="font-mono text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-[#ECECEC]">
                {formatTime(pulse.pomodoro.remainingSeconds)}
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-[#8E8E8E]">
                {pulse.pomodoro.isRunning ? 'Odak Sürüyor...' : 'Duraklatıldı'}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="my-3">
              <Progress
                percent={progressPercent}
                showInfo={false}
                strokeColor="#10A37F"
                trailColor="rgba(128, 128, 128, 0.2)"
                className="m-0"
              />
            </div>
          </div>

          {/* Pomodoro Action Buttons */}
          <div className="flex items-center gap-2 mt-4">
            <Button
              type="primary"
              onClick={() => studyPulse.togglePomodoro()}
              icon={pulse.pomodoro.isRunning ? <PauseOutlined /> : <CaretRightOutlined />}
              className="flex-1 bg-[#10A37F] hover:bg-[#0E8C6D] text-white font-semibold rounded-xl h-10 border-0 shadow-xs"
            >
              {pulse.pomodoro.isRunning ? 'Durdur' : 'Odaklanmayı Başlat'}
            </Button>
            <Button
              onClick={() => studyPulse.resetPomodoro()}
              icon={<ReloadOutlined />}
              className="rounded-xl h-10 px-3 bg-white dark:bg-[#171717] border border-slate-200 dark:border-[#2F2F2F] text-slate-700 dark:text-[#ECECEC]"
              title="Sayacı Sıfırla"
            />
          </div>
        </div>

        {/* Right: Daily Habit Goal & Retention Streak */}
        <div className="flex flex-col justify-between bg-slate-50 dark:bg-[#212121] p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-[#2F2F2F]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
                <FireOutlined className="text-amber-500" /> Günlük Vize Alışkanlığı
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100/80 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                {pulse.dailyGoal.streakDays} Günlük Seri 🔥
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-[#ECECEC] mb-1">
              Bugünün Hedefi: 3 Kavram Pekiştir
            </h3>
            <p className="text-xs text-slate-500 dark:text-[#B4B4B4] mb-3">
              Her gün 3 kavram tamamlayarak vize sınavına kadar bilgileri uzun süreli hafızada tutun.
            </p>

            {/* Checklist of Today's Targets */}
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white dark:bg-[#171717] border border-slate-200/80 dark:border-[#2F2F2F]">
                <span className="flex items-center gap-2 text-slate-800 dark:text-[#ECECEC]">
                  <CheckCircleFilled className="text-emerald-500 text-sm" /> İlaç Reseptör Bağ Kuvvetleri (Slayt 2)
                </span>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">Tamamlandı</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white dark:bg-[#171717] border border-slate-200/80 dark:border-[#2F2F2F]">
                <span className="flex items-center gap-2 text-slate-800 dark:text-[#ECECEC]">
                  <CheckCircleFilled className="text-emerald-500 text-sm" /> Dibukain SAR & Karbamoilasyon (Slayt 33)
                </span>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">Tamamlandı</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white dark:bg-[#171717] border border-dashed border-amber-300 dark:border-amber-700/60">
                <span className="flex items-center gap-2 text-slate-800 dark:text-[#ECECEC]">
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-amber-500 flex items-center justify-center text-[8px] font-bold text-amber-500">3</span>
                  GPCR Sinyal Kaskadı (Gs / Gi / Gq)
                </span>
                <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold">Sırada</span>
              </div>
            </div>
          </div>

          {/* Quick CTA to Continue */}
          {onStartStudySession && (
            <Button
              onClick={onStartStudySession}
              icon={<ThunderboltFilled className="text-amber-400" />}
              className="w-full rounded-xl h-10 font-semibold bg-white dark:bg-[#171717] border border-slate-200 dark:border-[#2F2F2F] text-slate-800 dark:text-[#ECECEC] hover:border-emerald-500 shadow-xs flex items-center justify-center gap-2"
            >
              Bugünkü 3. Kavramı Tamamla & Seriyi Koru
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
