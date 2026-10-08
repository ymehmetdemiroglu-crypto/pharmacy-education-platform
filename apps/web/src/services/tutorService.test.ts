import { describe, it, expect } from 'vitest';
import { askTutor } from './tutorService';

describe('tutorService', () => {
  it('generates a pedagogical socratic reply for salicylic acid question', async () => {
    const res = await askTutor({
      prompt: 'Salisilik asit pKa ve aktivite farkı nedir?',
      conversationHistory: [],
    });

    expect(res).toBeDefined();
    expect(res.sender).toBe('tutor');
    expect(res.content).toBeTruthy();
    expect(res.slideCitation?.slideNumbers).toBeDefined();
  });

  it('generates a pedagogical socratic reply for dibucaine question', async () => {
    const res = await askTutor({
      prompt: 'Dibukain SAR yapısı nedir?',
      conversationHistory: [],
    });

    expect(res).toBeDefined();
    expect(res.sender).toBe('tutor');
    expect(res.content).toBeTruthy();
  });

  it('generates a pedagogical socratic reply for Pharmacology Kd and affinity question', async () => {
    const res = await askTutor({
      prompt: 'Kd nedir ve afinite ile nasıl ilişkilidir?',
      conversationHistory: [],
    });

    expect(res).toBeDefined();
    expect(res.sender).toBe('tutor');
    expect(res.content).toContain('Kd');
    expect(res.content).toContain('afinite');
    expect(res.slideCitation?.slideNumbers).toBeDefined();
  });

  it('generates a pedagogical socratic reply for Pharmacology EC50 and Emax question', async () => {
    const res = await askTutor({
      prompt: 'EC50 ve Emax arasındaki fark nedir, hangisi daha önemlidir?',
      conversationHistory: [],
    });

    expect(res).toBeDefined();
    expect(res.sender).toBe('tutor');
    expect(res.content).toContain('Emax');
    expect(res.content).toContain('EC50');
  });

  it('generates a pedagogical socratic reply for competitive antagonism question', async () => {
    const res = await askTutor({
      prompt: 'Kompetitif antagonist dozu artırıldığında eğriye ne olur?',
      conversationHistory: [],
    });

    expect(res).toBeDefined();
    expect(res.sender).toBe('tutor');
    expect(res.content).toContain('sağa kayar');
    expect(res.content).toContain('Emax değişmez');
  });

  it('generates a pedagogical socratic reply for spare receptors and Furchgott question', async () => {
    const res = await askTutor({
      prompt: 'Yedek reseptör nedir ve fenoksibenzamin Furchgott deneyinde ne gözlenir?',
      conversationHistory: [],
    });

    expect(res).toBeDefined();
    expect(res.sender).toBe('tutor');
    expect(res.content).toContain('yedek reseptör');
    expect(res.slideCitation?.slideNumbers).toContain(39);
  });
});

