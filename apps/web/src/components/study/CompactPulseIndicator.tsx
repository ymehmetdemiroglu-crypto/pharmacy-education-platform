import React, { useState, useEffect } from 'react';
import { Button, Tooltip, Popover } from 'antd';
import {
  CaretRightOutlined,
  PauseOutlined,
  ReloadOutlined,
  FireOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { studyPulse, StudyPulseState } from '../../services/studyPulseService';

export const CompactPulseIndicator: React.FC = () => {
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

  const popoverContent = (
    <div className="w-64 p-2 flex flex-col gap-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#2F2F2F] pb-2">
        <span className="font-semibold text-slate-800 dark:text-[#ECECEC] flex items-center gap-1.5">
          <TeamOutlined className="text-emerald-500" /> Canlı Çalışma Nabzı
        </span>
        <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold text-[10px]">
          {pulse.activeCount} Öğrenci Aktif
        </span>
      </div>

      {/* Pomodoro Quick Controls */}
      <div className="flex items-center justify-between bg-slate-50 dark:bg-[#212121] p-2.5 rounded-xl border border-slate-200 dark:border-[#2F2F2F]">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 dark:text-[#8E8E8E] uppercase tracking-wider font-semibold">
            {pulse.pomodoro.mode === 'focus' ? '🎯 Odaklanma' : '☕ Mola'}
          </span>
          <span className="font-mono text-base font-bold text-slate-900 dark:text-[#ECECEC]">
            {formatTime(pulse.pomodoro.remainingSeconds)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="text"
            size="small"
            onClick={() => studyPulse.togglePomodoro()}
            icon={pulse.pomodoro.isRunning ? <PauseOutlined /> : <CaretRightOutlined />}
            className="rounded-lg bg-white dark:bg-[#171717] border border-slate-200 dark:border-[#2F2F2F] text-slate-700 dark:text-[#ECECEC]"
          />
          <Button
            type="text"
            size="small"
            onClick={() => studyPulse.resetPomodoro()}
            icon={<ReloadOutlined className="text-[10px]" />}
            className="rounded-lg text-slate-500 dark:text-[#8E8E8E]"
          />
        </div>
      </div>

      {/* Daily Goal Quick Tracker */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-slate-600 dark:text-[#B4B4B4] flex items-center gap-1">
          <FireOutlined className="text-amber-500" /> {pulse.dailyGoal.streakDays} Günlük Seri
        </span>
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          {pulse.dailyGoal.completedToday} / {pulse.dailyGoal.targetToday} Hedef
        </span>
      </div>
    </div>
  );

  return (
    <Popover content={popoverContent} trigger="click" placement="bottomRight">
      <div
        className="hidden md:inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-[#212121] border border-slate-200 dark:border-[#2F2F2F] cursor-pointer hover:border-emerald-500/50 transition-colors select-none text-xs"
        title="Canlı Çalışma Nabzı & Pomodoro"
      >
        {/* Pulsing indicator */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>

        <span className="font-medium text-slate-700 dark:text-[#B4B4B4] text-[11px]">
          <strong className="text-slate-900 dark:text-[#ECECEC]">{pulse.activeCount}</strong> akran çalışıyor
        </span>

        <span className="h-3 w-px bg-slate-200 dark:bg-[#2F2F2F]" />

        {/* Mini Pomodoro Counter */}
        <span className="font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
          {pulse.pomodoro.isRunning && (
            <span className="animate-pulse">●</span>
          )}
          {formatTime(pulse.pomodoro.remainingSeconds)}
        </span>
      </div>
    </Popover>
  );
};
