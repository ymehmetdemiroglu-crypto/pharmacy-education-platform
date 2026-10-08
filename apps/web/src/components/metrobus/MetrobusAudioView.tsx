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
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4 p-4 font-sans text-neutral-900 select-none pb-20">
      {/* Top Navigation & Commuter Status Bar */}
      <div className="flex items-center justify-between bg-[#FFF8E7] border-3 border-black p-3 shadow-[4px_4px_0px_#000]">
        <div className="flex items-center gap-2">
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              className="p-1.5 bg-white border-2 border-black hover:bg-neutral-100 font-mono text-sm font-bold active:translate-x-0.5 active:translate-y-0.5"
              title="Panele Dön"
            >
              ← Geri
            </button>
          )}
          <span className="text-xl">{transitConfig.icon}</span>
          <div>
            <h1 className="text-sm font-black uppercase tracking-tight">Metrobüs Modu</h1>
            <p className="text-[11px] font-mono text-neutral-600 font-bold">
              {transitConfig.label}
            </p>
          </div>
        </div>

        {/* Offline tunnel cache & XP badge */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block px-2 py-0.5 bg-[#6BCB77] border-2 border-black text-[10px] font-mono font-bold text-black shadow-[2px_2px_0px_#000]">
            Tünel Çevrimdışı Hazır ⚡
          </span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FFD93D] border-2 border-black text-xs font-mono font-black shadow-[2px_2px_0px_#000]">
            <span>🔥 {streakCount} Seri</span>
            <span>•</span>
            <span>+{sessionXp} XP</span>
          </div>
        </div>
      </div>

      {/* Transit Route Switcher Strip */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {(Object.keys(TRANSIT_MODE_CONFIGS) as TransitMode[]).map(mode => {
          const cfg = TRANSIT_MODE_CONFIGS[mode];
          const isSelected = transitMode === mode;
          return (
            <button
              key={mode}
              onClick={() => setTransitMode(mode)}
              className={`flex items-center gap-1 px-3 py-1.5 border-2 border-black text-xs font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-black text-white shadow-[3px_3px_0px_#FFD93D]'
                  : 'bg-white hover:bg-neutral-100 text-neutral-800'
              }`}
            >
              <span>{cfg.icon}</span>
              <span>{mode === 'METROBUS' ? 'Metrobüs' : mode === 'MARMARAY' ? 'Marmaray' : mode === 'METRO' ? 'M4 Metro' : mode === 'OTOBUS' ? 'Otobüs' : 'Sessiz'}</span>
            </button>
          );
        })}
      </div>

      {/* Acoustic Filter Status & EQ toggle */}
      <div className="flex items-center justify-between px-1">
        <button
          onClick={() => setAcousticFilterEnabled(!acousticFilterEnabled)}
          className={`flex items-center gap-1.5 px-3 py-1 border-2 border-black text-xs font-mono font-bold ${
            acousticFilterEnabled
              ? 'bg-[#6BCB77] text-black shadow-[2px_2px_0px_#000]'
              : 'bg-neutral-300 text-neutral-700'
          }`}
        >
          <span>{acousticFilterEnabled ? '🛡️ Dizel Filtresi: AKTİF (-24dB)' : '⚠️ Filtresiz Ham Ses'}</span>
        </button>

        <button
          onClick={() => setShowEqCurve(!showEqCurve)}
          className="text-xs font-mono font-bold text-neutral-200 hover:text-white bg-neutral-900 hover:bg-neutral-800 px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_#000]"
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
      <div className="flex flex-col items-center justify-center py-6 bg-gradient-to-b from-[#FFF8E7] to-[#FFE8A3] border-3 border-black shadow-[6px_6px_0px_#000] relative overflow-hidden">
        {/* Decorative background radar circles */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-64 h-64 border-2 border-black rounded-full animate-ping duration-1000" />
          <div className="w-48 h-48 border-2 border-black rounded-full" />
        </div>

        {/* Pulse Orb */}
        <div className="relative z-10 flex flex-col items-center">
          <button
            onClick={() => {
              if (drillStatus === 'IDLE') {
                startPromptPlayback();
              } else if (drillStatus === 'LISTENING') {
                // If student taps while listening, simulate speech completion
                handleEvaluateAnswer(currentPrompt.expectedKeywords[0]!);
              } else if (drillStatus === 'PROMPT_PLAYING') {
                handleRepeatPrompt();
              }
            }}
            className={`w-32 h-32 rounded-full border-4 border-black flex flex-col items-center justify-center shadow-[6px_6px_0px_#000] active:scale-95 transition-all duration-200 cursor-pointer ${
              drillStatus === 'IDLE'
                ? 'bg-[#4D96FF] text-white hover:bg-blue-600'
                : drillStatus === 'PROMPT_PLAYING'
                ? 'bg-[#FFD93D] text-black animate-pulse'
                : drillStatus === 'LISTENING'
                ? 'bg-[#6BCB77] text-black shadow-[0_0_25px_#6BCB77]'
                : drillStatus === 'AFFIRMATION'
                ? 'bg-[#6BCB77] text-white'
                : drillStatus === 'VERBAL_NUDGE'
                ? 'bg-[#FFD93D] text-black'
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
            <span className="text-[11px] font-black font-mono uppercase tracking-wider text-center px-2">
              {drillStatus === 'IDLE' && 'BAŞLA'}
              {drillStatus === 'PROMPT_PLAYING' && 'OKUNUYOR'}
              {drillStatus === 'LISTENING' && 'DİNLİYOR...'}
              {drillStatus === 'EVALUATING' && 'DEĞERLENDİRME'}
              {drillStatus === 'AFFIRMATION' && 'TAM İSABET'}
              {drillStatus === 'VERBAL_NUDGE' && 'İPUCU'}
            </span>
          </button>

          {/* Subtext under Orb */}
          <div className="mt-3 text-center">
            <p className="text-xs font-bold font-mono text-neutral-700">
              {drillStatus === 'IDLE' && 'Kulaklık mikrofona konuşun veya dokunun'}
              {drillStatus === 'PROMPT_PLAYING' && 'Sesli soru okunuyor (AirPods aktif)'}
              {drillStatus === 'LISTENING' && 'Cevabınızı söyleyin (Örn: "Enzim yaşlanır")'}
              {drillStatus === 'AFFIRMATION' && 'Harika! 10 XP kazandınız'}
              {drillStatus === 'VERBAL_NUDGE' && 'İpucu dinlendi, cevabı tekrar deneyin'}
            </p>
          </div>
        </div>

        {/* 1-Tap Repeat Action (No penalty) */}
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={handleRepeatPrompt}
            className="px-4 py-2 bg-white border-2 border-black font-mono font-bold text-xs shadow-[3px_3px_0px_#000] hover:bg-neutral-100 active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5"
            data-testid="metrobus-repeat-btn"
          >
            <span>🔄</span>
            <span>Tekrar Dinle (0 Ceza)</span>
          </button>

          <button
            onClick={handleUnlockHint}
            className="px-4 py-2 bg-[#FFD93D] border-2 border-black font-mono font-bold text-xs shadow-[3px_3px_0px_#000] hover:bg-yellow-400 active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5"
            data-testid="metrobus-hint-btn"
          >
            <span>💡</span>
            <span>Sözlü İpucu</span>
          </button>
        </div>
      </div>

      {/* Socratic Question Card */}
      <div className="bg-white border-3 border-black p-4 shadow-[5px_5px_0px_#000]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#4D96FF] text-white border-2 border-black text-[10px] font-mono font-bold">
              {currentPrompt.courseId === 'medchem' ? 'Farmasötik Kimya' : 'Farmakoloji'}
            </span>
            <span className="px-2 py-0.5 bg-[#FF6B9D] text-black border-2 border-black text-[10px] font-mono font-bold">
              {currentPrompt.trapCode}
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-neutral-500">
            Soru {currentPromptIndex + 1} / {METROBUS_AUDIO_PROMPTS.length}
          </span>
        </div>

        <h2 className="text-base font-black mb-1">{currentPrompt.title}</h2>
        <p className="text-xs text-neutral-600 font-mono mb-3">{currentPrompt.topic}</p>

        {/* Turkish speech prompt text (strictly <= 25 words) */}
        <div className="bg-[#FFF8E7] border-2 border-black p-3 mb-3">
          <p className="text-sm font-bold text-neutral-900 leading-snug">
            "{currentPrompt.turkishSpeechText}"
          </p>
          <div className="mt-1 text-right">
            <span className="text-[10px] font-mono text-neutral-500">
              Konuşma Sınırı: {currentPrompt.turkishSpeechText.split(/\s+/).length} kelime (Maks 25)
            </span>
          </div>
        </div>

        {/* Verbal Nudge Drawer if unlocked */}
        {isHintUnlocked && (
          <div className="bg-[#FFF9D2] border-2 border-black p-3 mb-3 border-dashed" data-testid="metrobus-hint-box">
            <div className="flex items-center gap-1.5 mb-1 text-xs font-bold text-neutral-800">
              <span>💡</span>
              <span>1. Kademe Sözlü İpucu:</span>
            </div>
            <p className="text-xs font-medium text-neutral-900">
              {currentPrompt.verbalNudgeText}
            </p>
          </div>
        )}

        {/* Commuter Touch Fallback Options (for silent subway / packed bus) */}
        <div>
          <p className="text-xs font-mono font-bold text-neutral-600 mb-2">
            🚇 Sessiz Metrobüs / Dokunmatik Hızlı Yanıt:
          </p>
          <div className="flex flex-col gap-2">
            {currentPrompt.quickOptions.map(option => (
              <button
                key={option.id}
                onClick={() => handleEvaluateAnswer(option.label)}
                className="w-full text-left p-2.5 bg-neutral-50 hover:bg-neutral-100 border-2 border-black text-xs font-medium active:bg-neutral-200 transition-colors shadow-[2px_2px_0px_#000]"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Verdict & Feedback Modal Card */}
      {verdict && (
        <div
          className={`border-3 border-black p-4 shadow-[6px_6px_0px_#000] animate-fadeIn ${
            verdict === 'CORRECT'
              ? 'bg-[#E8F8EA] border-black'
              : 'bg-[#FFF0F5] border-black'
          }`}
          data-testid="metrobus-verdict-box"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{verdict === 'CORRECT' ? '🎉' : '⚠️'}</span>
              <h3 className="text-base font-black">
                {verdict === 'CORRECT' ? 'Tam İsabet!' : 'Vize Tuzağı Saptandı!'}
              </h3>
            </div>
            {verdict === 'CORRECT' && (
              <span className="px-2 py-0.5 bg-[#6BCB77] border-2 border-black text-xs font-mono font-bold">
                +10 XP
              </span>
            )}
          </div>

          <p className="text-xs font-bold text-neutral-800 mb-2">
            {verdict === 'CORRECT'
              ? currentPrompt.affirmationText
              : 'Verilen cevap yaygın bir kavram yanılgısına işaret ediyor.'}
          </p>

          <div className="bg-white border-2 border-black p-2.5 text-xs text-neutral-700 mb-3">
            <span className="font-bold text-black block mb-1">Mekanizma Açıklaması:</span>
            {currentPrompt.detailedExplanation}
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              onClick={handleNextPrompt}
              className="px-5 py-2.5 bg-black text-white hover:bg-neutral-800 border-2 border-black font-mono font-bold text-xs shadow-[3px_3px_0px_#FFD93D] active:translate-x-0.5 active:translate-y-0.5"
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
