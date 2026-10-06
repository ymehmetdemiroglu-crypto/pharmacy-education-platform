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
    <div className="sticky top-0 z-20 flex flex-col gap-2 bg-slate-900 text-white p-3 rounded-2xl border-2 border-black shadow-md backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button
            type="primary"
            icon={isPlaying ? <PauseOutlined className="text-black text-base" /> : <CaretRightOutlined className="text-black text-base ml-0.5" />}
            onClick={handlePlayPause}
            className="bg-emerald-500 hover:bg-emerald-400 border-0 flex items-center justify-center text-black rounded-xl w-9 h-9 shadow-sm"
          />
          <Tooltip title="Başa Sar">
            <Button
              size="small"
              icon={<ReloadOutlined className="text-xs" />}
              onClick={handleReset}
              className="bg-slate-800 text-slate-300 border-slate-700 rounded-xl w-8 h-8 flex items-center justify-center"
            />
          </Tooltip>

          <div className="flex flex-col">
            <span className="font-display font-bold text-xs sm:text-sm text-slate-100 flex items-center gap-1.5">
              <SoundOutlined className="text-emerald-400 inline" />
              Sesli Ders Özeti (Slayt 1–33 Vize İncelemesi)
            </span>
            <span className="font-mono text-[11px] text-slate-400">
              {formatTime(currentTime)} / {formatTime(summary.duration)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {currentCue && (
            <Tag color="cyan" className="font-mono text-[11px] rounded-lg">
              Slayt {currentCue.slide}
            </Tag>
          )}

          <Select
            size="small"
            value={playbackRate}
            onChange={setPlaybackRate}
            className="w-20"
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
        <div className="flex items-start justify-between gap-2 bg-slate-800/80 border border-slate-700/80 rounded-xl p-2.5 text-xs">
          <div className="flex items-start gap-1.5 flex-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mt-1 shrink-0" />
            <p className="font-medium text-slate-200 leading-snug">
              <strong className="text-emerald-400 mr-1">[{formatTime(currentCue.startTime)}]</strong>
              {currentCue.text}
            </p>
          </div>

          {onAskTutorAboutAudio && (
            <Button
              size="small"
              icon={<RobotOutlined className="text-amber-400" />}
              onClick={() => onAskTutorAboutAudio(`Sesli özetteki şu açıklamayı derinleştirir misin: "${currentCue.text}"?`)}
              className="rounded-xl bg-slate-900/60 border-slate-700 text-amber-300 hover:text-amber-200 font-semibold text-xs shrink-0"
            >
              Tutor'a Sor
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
