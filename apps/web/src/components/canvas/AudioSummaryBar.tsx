import React, { useState, useEffect, useRef } from 'react';
import { Button, Slider, Select, Tag, Tooltip } from 'antd';
import {
  CaretRightOutlined,
  PauseOutlined,
  SoundOutlined,
  ReloadOutlined,
  RobotOutlined,
} from '@ant-design/icons';
import { getAudioSummaryForLecture, type TranscriptCue } from '../../services/audioService';

interface AudioSummaryBarProps {
  lectureSlug: string;
  onCueChange?: (cue: TranscriptCue | null) => void;
  onAskTutorAboutAudio?: (text: string) => void;
}

export const AudioSummaryBar: React.FC<AudioSummaryBarProps> = ({
  lectureSlug,
  onCueChange,
  onAskTutorAboutAudio,
}) => {
  const summary = getAudioSummaryForLecture(lectureSlug);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [currentCue, setCurrentCue] = useState<TranscriptCue | null>(null);

  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<any>(null);

  // Find active cue
  useEffect(() => {
    const cue = summary.cues.find(
      (c) => currentTime >= c.startTime && currentTime < c.endTime
    ) || null;
    setCurrentCue(cue);
    onCueChange?.(cue);
  }, [currentTime, summary.cues, onCueChange]);

  // Audio / Speech synthesis tick
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= summary.duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackRate);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackRate, summary.duration]);

  // Browser speech synthesis for live vocal reading
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPlaying && currentCue) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentCue.text);
      utterance.lang = 'tr-TR';
      utterance.rate = playbackRate;
      utterance.onend = () => {};
      synthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } else if (!isPlaying) {
      window.speechSynthesis.cancel();
    }
  }, [currentCue?.id, isPlaying, playbackRate]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="sticky top-0 z-20 flex flex-col gap-2.5 bg-white/95 dark:bg-[#171717]/95 text-slate-900 dark:text-[#ECECEC] p-3.5 rounded-2xl border border-slate-200 dark:border-[#2F2F2F] shadow-xs backdrop-blur-md transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <Button
            type="primary"
            icon={isPlaying ? <PauseOutlined className="text-white text-sm" /> : <CaretRightOutlined className="text-white text-sm ml-0.5" />}
            onClick={handlePlayPause}
            className="bg-[#10A37F] hover:bg-[#0E8C6D] border-0 flex items-center justify-center text-white rounded-xl w-9 h-9 shadow-xs"
          />
          <Tooltip title="Başa Sar">
            <Button
              size="small"
              icon={<ReloadOutlined className="text-xs" />}
              onClick={handleReset}
              className="bg-slate-100 dark:bg-[#2A2A2A] text-slate-700 dark:text-[#ECECEC] border-slate-200 dark:border-[#2F2F2F] rounded-xl w-8 h-8 flex items-center justify-center"
            />
          </Tooltip>

          <div className="flex flex-col">
            <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-[#ECECEC] flex items-center gap-1.5">
              <SoundOutlined className="text-[#10A37F] inline" />
              Sesli Ders Özeti (Slayt 1–33 Vize İncelemesi)
            </span>
            <span className="font-mono text-[11px] text-slate-500 dark:text-[#8E8E8E]">
              {formatTime(currentTime)} / {formatTime(summary.duration)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {currentCue && (
            <Tag className="font-mono text-[11px] rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60">
              Slayt {currentCue.slide}
            </Tag>
          )}

          <Select
            size="small"
            value={playbackRate}
            onChange={setPlaybackRate}
            className="w-20 rounded-xl"
            options={[
              { label: '1.0x', value: 1.0 },
              { label: '1.25x', value: 1.25 },
              { label: '1.5x', value: 1.5 },
            ]}
          />
        </div>
      </div>

      {/* Progress Slider */}
      <div className="px-1 -my-1">
        <Slider
          min={0}
          max={summary.duration}
          value={currentTime}
          onChange={(val) => {
            setCurrentTime(val);
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
              window.speechSynthesis.cancel();
            }
          }}
          tooltip={{ formatter: (val) => formatTime(val || 0) }}
        />
      </div>

      {/* Active Live Transcript Cue with Sentence Highlight */}
      {currentCue && (
        <div className="flex items-start justify-between gap-2.5 bg-slate-50 dark:bg-[#212121] border border-slate-200 dark:border-[#2F2F2F] rounded-xl p-3 text-xs">
          <div className="flex items-start gap-2 flex-1">
            <span className="w-2 h-2 rounded-full bg-[#10A37F] animate-pulse mt-1 shrink-0" />
            <p className="font-medium text-slate-800 dark:text-[#ECECEC] leading-snug m-0">
              <strong className="text-[#10A37F] mr-1.5 font-mono">[{formatTime(currentCue.startTime)}]</strong>
              {currentCue.text}
            </p>
          </div>

          {onAskTutorAboutAudio && (
            <Button
              size="small"
              icon={<RobotOutlined className="text-amber-500" />}
              onClick={() => onAskTutorAboutAudio(`Sesli özetteki şu açıklamayı derinleştirir misin: "${currentCue.text}"?`)}
              className="rounded-xl bg-white dark:bg-[#171717] border-slate-200 dark:border-[#2F2F2F] text-amber-600 dark:text-amber-400 font-semibold text-xs shrink-0 hover:border-amber-500"
            >
              Tutor'a Sor
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
