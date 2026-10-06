import { describe, it, expect } from 'vitest';
import { pastExamService } from './pastExamService';

describe('pastExamService', () => {
  it('scrubs university names, professor titles, and exam headers to ensure zero legal liability', () => {
    const rawExamSnippet = `
      Marmara Üniversitesi Eczacılık Fakültesi
      Prof. Dr. Bedia Kaymakçıoğlu 2023-2024 Güz Dönemi Vize Sınavı
      Soru: Prokain ile Dibukain etki sürelerini karşılaştırınız.
    `;

    const result = pastExamService.scrubExamText(rawExamSnippet);

    // Assert that protected entities are scrubbed
    expect(result.legalShieldApplied).toBe(true);
    expect(result.scrubbedText).not.toContain('Marmara Üniversitesi');
    expect(result.scrubbedText).not.toContain('Bedia Kaymakçıoğlu');
    expect(result.scrubbedText).toContain('[ÜNİVERSİTE GİZLENDİ]');
    expect(result.scrubbedText).toContain('[ÖĞRETİM ÜYESİ GİZLENDİ]');
    expect(result.detectedTopic).toContain('Lokal Anestezik');
  });

  it('synthesizes an original isomorphic twin question with Socratic scaffolding ladder', async () => {
    const scrubbed = pastExamService.scrubExamText('Prokain ve Dibukain ester amit hidroliz hızı');
    const twin = await pastExamService.synthesizeTwinQuestion(scrubbed);

    expect(twin.id).toBeDefined();
    expect(twin.questionPrompt).toBeDefined();
    expect(twin.options.length).toBe(4);
    expect(twin.options.some((o) => o.isCorrect)).toBe(true);
    expect(twin.scaffoldingLadder.length).toBe(3);
    expect(twin.slideReferences).toContain(33);
    expect(twin.pedagogicalTakeaway).toBeTruthy();
  });
});
