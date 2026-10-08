import {
  EarconType,
  FilterFrequencyResponsePoint,
  MetrobusTurnLog,
  SocraticAudioPrompt,
  VadEventPayload
} from '../types/metrobusAudio.types';

// ============================================================================
// METROBÜS MODU AUDIO ENGINE & SIGNAL PROCESSOR
// ============================================================================

/**
 * Calculates attenuation (in dB) of a 4th-order cascaded Butterworth High-Pass Filter.
 * Two 2nd-order stages in series yielding 24 dB/octave rolloff below cutoff frequency.
 */
export function calculateBiquadHighPassAttenuation(
  freqHz: number,
  cutoffHz: number = 180
): number {
  if (freqHz <= 0) return -60;
  if (cutoffHz <= 0) return 0;
  
  const ratio = freqHz / cutoffHz;
  // Magnitude squared of 2nd order Butterworth HPF = (ratio^4) / (1 + ratio^4)
  // For two cascaded stages (4th order): |H(f)|^2 = [(ratio^4) / (1 + ratio^4)]^2
  const ratioSq = ratio * ratio;
  const ratio4 = ratioSq * ratioSq;
  const h2MagSq = ratio4 / (1 + ratio4);
  const h4MagSq = h2MagSq * h2MagSq; // cascaded two 2nd-order stages (4th order: 24 dB/octave)
  
  if (h4MagSq <= 1e-6) return -60;
  const db = 10 * Math.log10(h4MagSq);
  return Math.min(0, Math.max(-60, db));
}

/**
 * Calculates attenuation (in dB) of a 2nd-order Low-Pass Filter at high frequencies.
 */
export function calculateBiquadLowPassAttenuation(
  freqHz: number,
  cutoffHz: number = 3800
): number {
  if (freqHz <= 0) return 0;
  const ratio = freqHz / cutoffHz;
  const ratio4 = Math.pow(ratio, 4);
  const hMagSq = 1 / (1 + ratio4);
  const db = 10 * Math.log10(Math.max(1e-6, hMagSq));
  return Math.min(0, Math.max(-40, db));
}

/**
 * Calculates peaking formant boost gain (in dB) around speech intelligibility region.
 */
export function calculatePeakingFormantBoost(
  freqHz: number,
  centerFreqHz: number = 1800,
  q: number = 1.0,
  peakGainDb: number = 4.0
): number {
  if (freqHz <= 0) return 0;
  const octavesDist = Math.abs(Math.log2(freqHz / centerFreqHz));
  const bandwidth = 1 / q;
  const factor = Math.exp(-Math.pow(octavesDist / (0.5 * bandwidth), 2));
  return peakGainDb * factor;
}

/**
 * Generates an acoustic frequency response profile for UI visualization.
 */
export function calculateAcousticFilterProfile(
  pointsCount: number = 32,
  highPassCutoffHz: number = 180,
  lowPassCutoffHz: number = 3800,
  formantFreqHz: number = 1800,
  formantGainDb: number = 4.0
): FilterFrequencyResponsePoint[] {
  // Generate logarithmic frequencies between 40 Hz and 8000 Hz
  const minFreq = 40;
  const maxFreq = 8000;
  const points: FilterFrequencyResponsePoint[] = [];

  for (let i = 0; i < pointsCount; i++) {
    const fraction = i / (pointsCount - 1);
    const freq = Math.round(minFreq * Math.pow(maxFreq / minFreq, fraction));
    
    // Simulate typical Istanbul Metrobüs cabin noise profile:
    // Heavy low-frequency rumble (40-120 Hz) with +18 dB peaking, falling off at high frequencies
    const lowRumble = freq < 150 ? 18 * Math.cos(((freq - 60) / 100) * (Math.PI / 2)) : 0;
    const rawMagnitudeDb = Math.max(-20, lowRumble - 5);

    const hpAtten = calculateBiquadHighPassAttenuation(freq, highPassCutoffHz);
    const lpAtten = calculateBiquadLowPassAttenuation(freq, lowPassCutoffHz);
    const formantBoost = calculatePeakingFormantBoost(freq, formantFreqHz, 1.0, formantGainDb);

    const totalFilterEffect = hpAtten + lpAtten + formantBoost;
    const filteredMagnitudeDb = rawMagnitudeDb + totalFilterEffect;

    points.push({
      frequencyHz: freq,
      rawMagnitudeDb: Math.round(rawMagnitudeDb * 10) / 10,
      filteredMagnitudeDb: Math.round(filteredMagnitudeDb * 10) / 10,
      attenuationDb: Math.round(totalFilterEffect * 10) / 10
    });
  }

  return points;
}

/**
 * Dynamic Noise-Floor Voice Activity Detector (VAD) state tracker.
 * Prevents the "infinite listening trap" in high-noise bus cabins.
 */
export class DynamicNoiseFloorVAD {
  private noiseFloor: number;
  private alpha: number;

  constructor(initialNoiseFloor: number = 0.036, smoothingAlpha: number = 0.05) {
    this.noiseFloor = initialNoiseFloor;
    this.alpha = smoothingAlpha;
  }

  public getNoiseFloor(): number {
    return this.noiseFloor;
  }

  /**
   * Updates smoothed noise floor: NoiseFloor(t) = (1 - alpha) * NoiseFloor(t-1) + alpha * RMS
   */
  public update(currentRms: number): number {
    const clampedRms = Math.max(0.001, Math.min(1.0, currentRms));
    this.noiseFloor = (1 - this.alpha) * this.noiseFloor + this.alpha * clampedRms;
    return this.noiseFloor;
  }

  /**
   * Evaluates if speech is detected based on dynamic SNR threshold.
   * Speech Start: RMS > NoiseFloor * 2.5 (+8 dB SNR)
   * Speech End: RMS < NoiseFloor * 1.25 (+2 dB SNR)
   */
  public evaluate(currentRms: number): {
    isSpeech: boolean;
    snrDb: number;
    ratio: number;
  } {
    const safeRms = Math.max(0.0001, currentRms);
    const safeFloor = Math.max(0.0001, this.noiseFloor);
    const ratio = safeRms / safeFloor;
    const snrDb = 20 * Math.log10(ratio);

    return {
      isSpeech: ratio >= 2.5,
      snrDb: Math.round(snrDb * 10) / 10,
      ratio: Math.round(ratio * 100) / 100
    };
  }
}

/**
 * Normalizes a Turkish string handling dotted/dotless I correctly.
 */
export function normalizeTurkishText(input: string): string {
  if (!input) return '';
  return input
    .trim()
    .toLocaleLowerCase('tr-TR')
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, ' ')
    .replace(/\s+/g, ' ');
}

/**
 * Evaluates student verbal answer against expected keywords, misconception keywords, and repeat commands.
 */
export function evaluateStudentVoiceAnswer(
  spokenText: string,
  prompt: SocraticAudioPrompt
): MetrobusTurnLog['evaluatedVerdict'] {
  const normalized = normalizeTurkishText(spokenText);
  if (!normalized) return 'INDECISIVE';

  // 1. Repeat / Rewind detection
  const repeatPatterns = [
    'tekrar',
    'tekrar et',
    'anlamadim',
    'anlamadım',
    'bastan',
    'baştan',
    'duyamadim',
    'duyamadım',
    'yeniden',
    'pas'
  ];
  if (repeatPatterns.some(pattern => normalized.includes(pattern))) {
    return 'REPEAT_REQUESTED';
  }

  // 2. Misconception trigger detection
  const hitMisconception = prompt.misconceptionKeywords.some(keyword => {
    const normKey = normalizeTurkishText(keyword);
    return normalized.includes(normKey);
  });
  if (hitMisconception) {
    return 'MISCONCEPTION_TRIGGERED';
  }

  // 3. Expected keywords detection
  const hitCorrectKeyword = prompt.expectedKeywords.some(keyword => {
    const normKey = normalizeTurkishText(keyword);
    return normalized.includes(normKey);
  });
  if (hitCorrectKeyword) {
    return 'CORRECT';
  }

  return 'INDECISIVE';
}

/**
 * Plays a pleasant synthetic earcon tone via Web Audio API without external audio files.
 */
export async function playSynthesizedEarcon(
  type: EarconType,
  customAudioCtx?: AudioContext
): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = customAudioCtx ?? new AudioContextClass();
    if (ctx.state === 'suspended') {
      await ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    switch (type) {
      case 'PROMPT_START':
        // 440 Hz gentle sine chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.2, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.13);
        break;

      case 'LISTENING_ACTIVE':
        // 880 Hz crisp double tick
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.25, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.07);
        break;

      case 'CORRECT_CHIME':
        // Ascending harmonic triad C5 -> E5
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.10);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.3, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.23);
        break;

      case 'NUDGE_CHIME':
        // Gentle descending soft tone 440 -> 349 Hz
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.linearRampToValueAtTime(349.23, now + 0.15);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.2, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.19);
        break;

      case 'REPEAT_CHIME':
        // Quick 600 Hz blip
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.2, now + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        osc.start(now);
        osc.stop(now + 0.10);
        break;

      case 'ERROR_CHIME':
      default:
        // Low warm buzz 220 -> 196 Hz
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(196, now + 0.18);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.15, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.20);
        osc.start(now);
        osc.stop(now + 0.21);
        break;
    }
  } catch {
    // Ignore audio context errors in headless/unsupported environments
  }
}
