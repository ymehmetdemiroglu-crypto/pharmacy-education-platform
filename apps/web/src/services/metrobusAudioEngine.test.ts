import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  calculateBiquadHighPassAttenuation,
  calculateBiquadLowPassAttenuation,
  calculatePeakingFormantBoost,
  calculateAcousticFilterProfile,
  DynamicNoiseFloorVAD,
  normalizeTurkishText,
  evaluateStudentVoiceAnswer,
  playSynthesizedEarcon
} from './metrobusAudioEngine';
import { METROBUS_AUDIO_PROMPTS } from '../data/metrobusAudio.data';

describe('MetrobusAudioEngine Signal Processing & Learning Invariants', () => {
  describe('Biquad Acoustic Filter Math', () => {
    it('attenuates diesel engine rumble (< 150 Hz) by over 20 dB with 4th-order cascaded HPF', () => {
      // 90 Hz is one octave below the 180 Hz cutoff
      const attenAt90Hz = calculateBiquadHighPassAttenuation(90, 180);
      expect(attenAt90Hz).toBeLessThan(-20);
      expect(attenAt90Hz).toBeGreaterThan(-30);

      // At 60 Hz (deep diesel combustion idle harmonic)
      const attenAt60Hz = calculateBiquadHighPassAttenuation(60, 180);
      expect(attenAt60Hz).toBeLessThan(-30);
    });

    it('preserves speech fundamentals above cutoff (300 Hz - 2500 Hz)', () => {
      const attenAt500Hz = calculateBiquadHighPassAttenuation(500, 180);
      expect(attenAt500Hz).toBeCloseTo(0, 0);

      const attenAt1000Hz = calculateBiquadHighPassAttenuation(1000, 180);
      expect(attenAt1000Hz).toBeCloseTo(0, 1);
    });

    it('attenuates high-frequency pneumatic hiss (> 4000 Hz) via Low-Pass filter', () => {
      const attenAt3800Hz = calculateBiquadLowPassAttenuation(3800, 3800);
      expect(attenAt3800Hz).toBeCloseTo(-3, 0);

      const attenAt8000Hz = calculateBiquadLowPassAttenuation(8000, 3800);
      expect(attenAt8000Hz).toBeLessThan(-12);
    });

    it('boosts Turkish consonant formant intelligibility at 1800 Hz (+4 dB)', () => {
      const boostAtCenter = calculatePeakingFormantBoost(1800, 1800, 1.0, 4.0);
      expect(boostAtCenter).toBeCloseTo(4.0, 1);

      const boostFarAway = calculatePeakingFormantBoost(100, 1800, 1.0, 4.0);
      expect(boostFarAway).toBeLessThan(0.1);
    });

    it('generates a full 32-point acoustic filter profile curve', () => {
      const profile = calculateAcousticFilterProfile(32, 180, 3800, 1800, 4.0);
      expect(profile).toHaveLength(32);
      expect(profile[0]!.frequencyHz).toBe(40);
      expect(profile[profile.length - 1]!.frequencyHz).toBe(8000);
      // Low rumble must be heavily attenuated in total filter effect
      expect(profile[0]!.attenuationDb).toBeLessThan(-20);
    });
  });

  describe('Dynamic Noise-Floor VAD', () => {
    it('adapts noise floor smoothly using exponential moving average (alpha = 0.05)', () => {
      const vad = new DynamicNoiseFloorVAD(0.035, 0.05);
      expect(vad.getNoiseFloor()).toBe(0.035);

      // Feed higher cabin noise RMS
      vad.update(0.08);
      // Expected: (1 - 0.05) * 0.035 + 0.05 * 0.08 = 0.95 * 0.035 + 0.004 = 0.03325 + 0.004 = 0.03725
      expect(vad.getNoiseFloor()).toBeCloseTo(0.03725, 4);
    });

    it('triggers speech when SNR >= 8 dB (ratio >= 2.5) above dynamic noise floor', () => {
      const vad = new DynamicNoiseFloorVAD(0.04, 0.05);
      // Student speaks with RMS = 0.12 (ratio 3.0, SNR ~ 9.5 dB)
      const result = vad.evaluate(0.12);
      expect(result.isSpeech).toBe(true);
      expect(result.snrDb).toBeGreaterThan(8.0);
      expect(result.ratio).toBeGreaterThanOrEqual(2.5);
    });

    it('rejects ambient transit noise when ratio < 2.5', () => {
      const vad = new DynamicNoiseFloorVAD(0.04, 0.05);
      // Cabin rumble fluctuation RMS = 0.05 (ratio 1.25)
      const result = vad.evaluate(0.05);
      expect(result.isSpeech).toBe(false);
      expect(result.snrDb).toBeLessThan(8.0);
    });
  });

  describe('Turkish Semantic Evaluator & Intent Parser', () => {
    const prompt = METROBUS_AUDIO_PROMPTS[0]!; // Organofosfat & AChE yaşlanma

    it('correctly handles Turkish dotted and dotless I normalization', () => {
      expect(normalizeTurkishText('İLAÇLARIN YAŞLANMASI')).toBe('ilaçların yaşlanması');
      expect(normalizeTurkishText('LİDOKAİN HİDROLİZİ')).toBe('lidokain hidrolizi');
      expect(normalizeTurkishText('IŞIK KONTROLÜ')).toBe('ışık kontrolü');
    });

    it('detects repeat request keywords ("tekrar et", "anlamadım")', () => {
      expect(evaluateStudentVoiceAnswer('Lütfen tekrar et duyamadım', prompt)).toBe('REPEAT_REQUESTED');
      expect(evaluateStudentVoiceAnswer('Anlamadım baştan söyler misin', prompt)).toBe('REPEAT_REQUESTED');
    });

    it('identifies misconception trigger keywords ("kompetitif", "atropin")', () => {
      expect(evaluateStudentVoiceAnswer('Çünkü bu kompetitif bir bağlanmadır', prompt)).toBe('MISCONCEPTION_TRIGGERED');
      expect(evaluateStudentVoiceAnswer('Atropin verildiği için bloke olur', prompt)).toBe('MISCONCEPTION_TRIGGERED');
    });

    it('identifies correct answer keywords ("yaşlanma", "alkil kovalent kopamaz")', () => {
      expect(evaluateStudentVoiceAnswer('Enzim yaşlanıyor alkil grubu koptuğu için', prompt)).toBe('CORRECT');
      expect(evaluateStudentVoiceAnswer('Fosfat bağı kovalent ve kalıcı hale gelir', prompt)).toBe('CORRECT');
    });

    it('returns INDECISIVE for irrelevant responses', () => {
      expect(evaluateStudentVoiceAnswer('Hangi duraktayız acaba', prompt)).toBe('INDECISIVE');
      expect(evaluateStudentVoiceAnswer('', prompt)).toBe('INDECISIVE');
    });
  });

  describe('Pedagogical Word Count & Question Scope Boundaries', () => {
    it('strictly satisfies <= 25 words for all Turkish audio prompts', () => {
      METROBUS_AUDIO_PROMPTS.forEach(prompt => {
        const words = prompt.turkishSpeechText.trim().split(/\s+/);
        expect(words.length).toBeLessThanOrEqual(25);
      });
    });

    it('strictly satisfies <= 20 words for all affirmations', () => {
      METROBUS_AUDIO_PROMPTS.forEach(prompt => {
        const words = prompt.affirmationText.trim().split(/\s+/);
        expect(words.length).toBeLessThanOrEqual(20);
      });
    });

    it('strictly satisfies <= 22 words for all verbal nudges', () => {
      METROBUS_AUDIO_PROMPTS.forEach(prompt => {
        const words = prompt.verbalNudgeText.trim().split(/\s+/);
        expect(words.length).toBeLessThanOrEqual(22);
      });
    });

    it('strictly excludes 3D stereochemistry rotation terms from all audio prompts', () => {
      const prohibited3DStereoTerms = [
        'cahn-ingold-prelog',
        'kiralite',
        'enantiyomerik fazlalık',
        'dihedral',
        'rotasyon açısı',
        'torsiyon',
        'konformasyonel analiz',
        'aksiyel-ekvatoryal'
      ];

      METROBUS_AUDIO_PROMPTS.forEach(prompt => {
        const text = normalizeTurkishText(prompt.turkishSpeechText);
        prohibited3DStereoTerms.forEach(term => {
          expect(text.includes(term)).toBe(false);
        });
      });
    });
  });

  describe('Synthesized Earcon Audio Generator', () => {
    it('executes safely in simulated test environments without throw', async () => {
      await expect(playSynthesizedEarcon('PROMPT_START')).resolves.toBeUndefined();
      await expect(playSynthesizedEarcon('LISTENING_ACTIVE')).resolves.toBeUndefined();
      await expect(playSynthesizedEarcon('CORRECT_CHIME')).resolves.toBeUndefined();
      await expect(playSynthesizedEarcon('NUDGE_CHIME')).resolves.toBeUndefined();
      await expect(playSynthesizedEarcon('REPEAT_CHIME')).resolves.toBeUndefined();
      await expect(playSynthesizedEarcon('ERROR_CHIME')).resolves.toBeUndefined();
    });
  });
});
