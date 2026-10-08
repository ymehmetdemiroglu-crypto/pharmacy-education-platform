import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  AudioDrillStatus,
  MetrobusTurnLog,
  SocraticAudioPrompt,
  TransitMode
} from '../../types/metrobusAudio.types';
import {
  METROBUS_AUDIO_PROMPTS,
  TRANSIT_MODE_CONFIGS
} from '../../data/metrobusAudio.data';
import {
  DynamicNoiseFloorVAD,
  evaluateStudentVoiceAnswer,
  playSynthesizedEarcon
} from '../../services/metrobusAudioEngine';
import { MetrobusAudioVisualizer } from './MetrobusAudioVisualizer';

interface MetrobusAudioViewProps {
  onBackToDashboard?: () => void;
  initialTransitMode?: TransitMode;
}

export const MetrobusAudioView: React.FC<MetrobusAudioViewProps> = ({
  onBackToDashboard,
  initialTransitMode = 'METROBUS'
}) => {
  // State
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [drillStatus, setDrillStatus] = useState<AudioDrillStatus>('IDLE');
  const [transitMode, setTransitMode] = useState<TransitMode>(initialTransitMode);
  const [acousticFilterEnabled, setAcousticFilterEnabled] = useState(true);
  const [showEqCurve, setShowEqCurve] = useState(false);
  const [streakCount, setStreakCount] = useState(3);
  const [sessionXp, setSessionXp] = useState(30);
  const [isHintUnlocked, setIsHintUnlocked] = useState(false);
  const [verdict, setVerdict] = useState<MetrobusTurnLog['evaluatedVerdict'] | null>(null);
  const [transcript, setTranscript] = useState('');
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(false);

  // VAD & Engine refs
  const vadRef = useRef(new DynamicNoiseFloorVAD(0.035, 0.05));
  const recognitionRef = useRef<any>(null);

  const currentPrompt: SocraticAudioPrompt =
    METROBUS_AUDIO_PROMPTS[currentPromptIndex] ?? METROBUS_AUDIO_PROMPTS[0]!;
  const transitConfig = TRANSIT_MODE_CONFIGS[transitMode];

  // Initialize Speech Recognition check
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechClass =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechClass) {
        setSpeechRecognitionSupported(true);
      }
    }
  }, []);

  // Play audio earcon helper
  const triggerEarcon = useCallback(async (type: any) => {
    try {
      await playSynthesizedEarcon(type);
    } catch {
      // Ignore in environments without AudioContext
    }
  }, []);

  // Text-To-Speech playback of Turkish prompt
  const speakText = useCallback(
    (text: string, onEndCallback?: () => void) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        if (onEndCallback) onEndCallback();
        return;
      }
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'tr-TR';
        utterance.rate = 1.05; // Slightly faster commuter cadence
        utterance.onend = () => {
          if (onEndCallback) onEndCallback();
        };
        utterance.onerror = () => {
          if (onEndCallback) onEndCallback();
        };
        window.speechSynthesis.speak(utterance);
      } catch {
        if (onEndCallback) onEndCallback();
      }
    },
    []
  );

  // Start prompt audio playback
  const startPromptPlayback = useCallback(() => {
    setDrillStatus('PROMPT_PLAYING');
    setVerdict(null);
    setTranscript('');
    setIsHintUnlocked(false);
    triggerEarcon('PROMPT_START');

    speakText(currentPrompt.turkishSpeechText, () => {
      // Prompt ended -> transition to listening
      setDrillStatus('LISTENING');
      triggerEarcon('LISTENING_ACTIVE');
    });
  }, [currentPrompt, speakText, triggerEarcon]);

  // Handle Repeat ("Tekrar Et") with 0 penalty
  const handleRepeatPrompt = useCallback(() => {
    triggerEarcon('REPEAT_CHIME');
    startPromptPlayback();
  }, [startPromptPlayback, triggerEarcon]);

  // Handle Verbal Nudge / Hint unlock
  const handleUnlockHint = useCallback(() => {
    setIsHintUnlocked(true);
    triggerEarcon('NUDGE_CHIME');
    setDrillStatus('VERBAL_NUDGE');
    speakText(currentPrompt.verbalNudgeText, () => {
      setDrillStatus('LISTENING');
    });
  }, [currentPrompt, speakText, triggerEarcon]);

  // Handle student answer evaluation
  const handleEvaluateAnswer = useCallback(
    (spokenText: string) => {
      setDrillStatus('EVALUATING');
      setTranscript(spokenText);

      const evaluationVerdict = evaluateStudentVoiceAnswer(spokenText, currentPrompt);

      if (evaluationVerdict === 'REPEAT_REQUESTED') {
        handleRepeatPrompt();
        return;
      }

      setVerdict(evaluationVerdict);

      if (evaluationVerdict === 'CORRECT') {
        triggerEarcon('CORRECT_CHIME');
        setDrillStatus('AFFIRMATION');
        setStreakCount(prev => prev + 1);
        setSessionXp(prev => prev + 10);
        speakText(currentPrompt.affirmationText);
      } else if (evaluationVerdict === 'MISCONCEPTION_TRIGGERED') {
        triggerEarcon('ERROR_CHIME');
        setDrillStatus('VERBAL_NUDGE');
        speakText('Dikkat: Bu yaygın bir vize tuzağıdır! İpucunu dinle: ' + currentPrompt.verbalNudgeText);
      } else {
        triggerEarcon('NUDGE_CHIME');
        setDrillStatus('VERBAL_NUDGE');
        speakText(currentPrompt.verbalNudgeText);
      }
    },
    [currentPrompt, handleRepeatPrompt, speakText, triggerEarcon]
  );

  // Advance to next prompt
  const handleNextPrompt = useCallback(() => {
    const nextIdx = (currentPromptIndex + 1) % METROBUS_AUDIO_PROMPTS.length;
    setCurrentPromptIndex(nextIdx);
    setDrillStatus('IDLE');
    setVerdict(null);
    setTranscript('');
    setIsHintUnlocked(false);
  }, [currentPromptIndex]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-5 p-4 sm:p-6 font-sans text-slate-900 dark:text-[#ECECEC] select-none pb-24 animate-fadeIn">
      {/* Top Navigation & Commuter Status Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl p-4 shadow-xs">
        <div className="flex items-center gap-3">
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              className="px-3 py-1.5 bg-slate-100 dark:bg-[#2A2A2A] hover:bg-slate-200 dark:hover:bg-[#333333] border border-slate-300 dark:border-[#383838] rounded-xl text-xs font-semibold text-slate-700 dark:text-[#ECECEC] transition-colors"
              title="Panele Dön"
            >
              ← Geri
            </button>
          )}
          <span className="text-2xl">{transitConfig.icon}</span>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-slate-900 dark:text-[#ECECEC]">
              Metrobüs Modu
            </h1>
            <p className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">
              {transitConfig.label}
            </p>
          </div>
        </div>

        {/* Offline tunnel cache & XP badge */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-200 dark:border-emerald-800/60 rounded-xl">
            Tünel Çevrimdışı Hazır ⚡
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-semibold border border-amber-200 dark:border-amber-800/60 rounded-xl">
            <span>🔥 {streakCount} Seri</span>
            <span>•</span>
            <span>+{sessionXp} XP</span>
          </div>
        </div>
      </div>

      {/* Transit Route Switcher Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {(Object.keys(TRANSIT_MODE_CONFIGS) as TransitMode[]).map(mode => {
          const cfg = TRANSIT_MODE_CONFIGS[mode];
          const isSelected = transitMode === mode;
          return (
            <button
              key={mode}
              onClick={() => setTransitMode(mode)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white dark:bg-[#1E1E1E] text-slate-700 dark:text-neutral-300 border-slate-200 dark:border-[#2F2F2F] hover:bg-slate-50 dark:hover:bg-[#262626]'
              }`}
            >
              <span>{cfg.icon}</span>
              <span>
                {mode === 'METROBUS'
                  ? 'Metrobüs'
                  : mode === 'MARMARAY'
                  ? 'Marmaray'
                  : mode === 'METRO'
                  ? 'M4 Metro'
                  : mode === 'OTOBUS'
                  ? 'Otobüs'
                  : 'Sessiz'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Acoustic Filter Status & EQ toggle */}
      <div className="flex items-center justify-between px-1">
        <button
          onClick={() => setAcousticFilterEnabled(!acousticFilterEnabled)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
            acousticFilterEnabled
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400'
              : 'bg-slate-100 dark:bg-[#262626] border-slate-300 dark:border-[#383838] text-slate-600 dark:text-neutral-400'
          }`}
        >
          <span>{acousticFilterEnabled ? '🛡️ Dizel Filtresi: AKTİF (-24dB)' : '⚠️ Filtresiz Ham Ses'}</span>
        </button>

        <button
          onClick={() => setShowEqCurve(!showEqCurve)}
          className="text-xs font-mono font-medium px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#2A2A2A] hover:bg-slate-200 dark:hover:bg-[#333333] border border-slate-200 dark:border-[#383838] text-slate-700 dark:text-neutral-300 transition-colors"
        >
          {showEqCurve ? '📊 Spektrum Çubukları' : '📈 DSP EQ Eğrisi'}
        </button>
      </div>

      {/* Acoustic Real-Time Visualizer */}
      <MetrobusAudioVisualizer
        status={drillStatus}
        acousticFilterEnabled={acousticFilterEnabled}
        transitLabel={transitConfig.label}
        showEqCurve={showEqCurve}
      />

      {/* Central Commuter Thumb Zone: Glowing Voice Orb */}
      <div className="flex flex-col items-center justify-center py-10 bg-gradient-to-b from-white to-slate-50/80 dark:from-[#1E1E1E] dark:to-[#171717] border border-slate-200 dark:border-[#2F2F2F] rounded-3xl shadow-xs relative overflow-hidden">
        {/* Subtle ambient ripple rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-56 h-56 border border-emerald-500/40 rounded-full animate-ping duration-1000" />
          <div className="w-44 h-44 border border-emerald-500/30 rounded-full" />
        </div>

        {/* Pulse Orb */}
        <div className="relative z-10 flex flex-col items-center">
          <button
            onClick={() => {
              if (drillStatus === 'IDLE') {
                startPromptPlayback();
              } else if (drillStatus === 'LISTENING') {
                handleEvaluateAnswer(currentPrompt.expectedKeywords[0]!);
              } else if (drillStatus === 'PROMPT_PLAYING') {
                handleRepeatPrompt();
              }
            }}
            className={`w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer shadow-lg active:scale-95 ${
              drillStatus === 'IDLE'
                ? 'bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-blue-500/20 hover:scale-105'
                : drillStatus === 'PROMPT_PLAYING'
                ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-white shadow-amber-500/25 animate-pulse'
                : drillStatus === 'LISTENING'
                ? 'bg-gradient-to-tr from-emerald-600 to-teal-400 text-white shadow-emerald-500/30 ring-8 ring-emerald-500/20 animate-pulse'
                : drillStatus === 'AFFIRMATION'
                ? 'bg-gradient-to-tr from-emerald-500 to-emerald-600 text-white shadow-emerald-500/30 scale-105'
                : drillStatus === 'VERBAL_NUDGE'
                ? 'bg-gradient-to-tr from-amber-500 to-amber-600 text-white shadow-amber-500/25'
                : 'bg-neutral-800 text-white'
            }`}
            data-testid="metrobus-voice-orb"
          >
            <span className="text-3xl mb-1">
              {drillStatus === 'IDLE' && '🎙️'}
              {drillStatus === 'PROMPT_PLAYING' && '🔊'}
              {drillStatus === 'LISTENING' && '👂'}
              {drillStatus === 'EVALUATING' && '⚙️'}
              {drillStatus === 'AFFIRMATION' && '✓'}
              {drillStatus === 'VERBAL_NUDGE' && '💡'}
            </span>
            <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-center px-2">
              {drillStatus === 'IDLE' && 'BAŞLA'}
              {drillStatus === 'PROMPT_PLAYING' && 'OKUNUYOR'}
              {drillStatus === 'LISTENING' && 'DİNLİYOR...'}
              {drillStatus === 'EVALUATING' && 'DEĞERLENDİRME'}
              {drillStatus === 'AFFIRMATION' && 'TAM İSABET'}
              {drillStatus === 'VERBAL_NUDGE' && 'İPUCU'}
            </span>
          </button>

          {/* Subtext under Orb */}
          <div className="mt-4 text-center">
            <p className="text-xs font-medium text-slate-600 dark:text-neutral-400">
              {drillStatus === 'IDLE' && 'Kulaklık mikrofona konuşun veya dokunun'}
              {drillStatus === 'PROMPT_PLAYING' && 'Sesli soru okunuyor (AirPods aktif)'}
              {drillStatus === 'LISTENING' && 'Cevabınızı söyleyin (Örn: "Enzim yaşlanır")'}
              {drillStatus === 'AFFIRMATION' && 'Harika! 10 XP kazandınız'}
              {drillStatus === 'VERBAL_NUDGE' && 'İpucu dinlendi, cevabı tekrar deneyin'}
            </p>
          </div>
        </div>

        {/* 1-Tap Repeat Action (No penalty) */}
        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={handleRepeatPrompt}
            className="px-4 py-2 bg-white dark:bg-[#252525] border border-slate-200 dark:border-[#383838] hover:bg-slate-50 dark:hover:bg-[#2C2C2C] text-slate-800 dark:text-neutral-200 rounded-xl font-medium text-xs shadow-2xs flex items-center gap-1.5 transition-colors"
            data-testid="metrobus-repeat-btn"
          >
            <span>🔄</span>
            <span>Tekrar Dinle (0 Ceza)</span>
          </button>

          <button
            onClick={handleUnlockHint}
            className="px-4 py-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-400 rounded-xl font-medium text-xs shadow-2xs flex items-center gap-1.5 transition-colors"
            data-testid="metrobus-hint-btn"
          >
            <span>💡</span>
            <span>Sözlü İpucu</span>
          </button>
        </div>
      </div>

      {/* Socratic Question Card */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 rounded-lg text-[11px] font-semibold">
              {currentPrompt.courseId === 'medchem' ? 'Farmasötik Kimya' : 'Farmakoloji'}
            </span>
            <span className="px-2.5 py-0.5 bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 rounded-lg text-[11px] font-mono font-semibold">
              {currentPrompt.trapCode}
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400 dark:text-neutral-500">
            Soru {currentPromptIndex + 1} / {METROBUS_AUDIO_PROMPTS.length}
          </span>
        </div>

        <h2 className="text-base font-bold mb-1 text-slate-900 dark:text-[#ECECEC]">{currentPrompt.title}</h2>
        <p className="text-xs text-slate-500 dark:text-neutral-400 mb-4">{currentPrompt.topic}</p>

        {/* Turkish speech prompt text (strictly <= 25 words) */}
        <div className="bg-slate-50 dark:bg-[#252525] border border-slate-200 dark:border-[#333333] rounded-xl p-4 mb-4">
          <p className="text-sm font-medium text-slate-900 dark:text-[#ECECEC] leading-relaxed">
            "{currentPrompt.turkishSpeechText}"
          </p>
          <div className="mt-2 text-right">
            <span className="text-[10px] font-mono text-slate-400 dark:text-neutral-500">
              Konuşma Sınırı: {currentPrompt.turkishSpeechText.split(/\s+/).length} kelime (Maks 25)
            </span>
          </div>
        </div>

        {/* Verbal Nudge Drawer if unlocked */}
        {isHintUnlocked && (
          <div className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl p-4 mb-4" data-testid="metrobus-hint-box">
            <div className="flex items-center gap-1.5 mb-1.5 text-xs font-semibold text-amber-800 dark:text-amber-400">
              <span>💡</span>
              <span>1. Kademe Sözlü İpucu:</span>
            </div>
            <p className="text-xs font-medium text-slate-800 dark:text-neutral-200 leading-relaxed">
              {currentPrompt.verbalNudgeText}
            </p>
          </div>
        )}

        {/* Commuter Touch Fallback Options (for silent subway / packed bus) */}
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-neutral-400 mb-2.5">
            🚇 Sessiz Metrobüs / Dokunmatik Hızlı Yanıt:
          </p>
          <div className="flex flex-col gap-2">
            {currentPrompt.quickOptions.map(option => (
              <button
                key={option.id}
                onClick={() => handleEvaluateAnswer(option.label)}
                className="w-full text-left p-3.5 bg-slate-50/70 dark:bg-[#252525] hover:bg-slate-100 dark:hover:bg-[#2C2C2C] border border-slate-200 dark:border-[#333333] rounded-xl text-xs font-medium text-slate-800 dark:text-[#ECECEC] transition-all shadow-2xs"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Verdict & Feedback Card */}
      {verdict && (
        <div
          className={`border rounded-2xl p-6 shadow-sm animate-fadeIn ${
            verdict === 'CORRECT'
              ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/80'
              : 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800/80'
          }`}
          data-testid="metrobus-verdict-box"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{verdict === 'CORRECT' ? '🎉' : '⚠️'}</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-[#ECECEC]">
                {verdict === 'CORRECT' ? 'Tam İsabet!' : 'Vize Tuzağı Saptandı!'}
              </h3>
            </div>
            {verdict === 'CORRECT' && (
              <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 rounded-lg text-xs font-semibold">
                +10 XP
              </span>
            )}
          </div>

          <p className="text-xs font-medium text-slate-800 dark:text-neutral-200 mb-3 leading-relaxed">
            {verdict === 'CORRECT'
              ? currentPrompt.affirmationText
              : 'Verilen cevap yaygın bir kavram yanılgısına işaret ediyor.'}
          </p>

          <div className="bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-xl p-4 text-xs text-slate-700 dark:text-neutral-300 mb-4 leading-relaxed">
            <span className="font-semibold text-slate-900 dark:text-[#ECECEC] block mb-1">Mekanizma Açıklaması:</span>
            {currentPrompt.detailedExplanation}
          </div>

          <div className="flex items-center justify-end">
            <button
              onClick={handleNextPrompt}
              className="px-6 py-2.5 bg-[#10A37F] hover:bg-[#0E8C6D] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
              data-testid="metrobus-next-btn"
            >
              Sonraki Soru ⚡ →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
