import { describe, it, expect } from 'vitest';
import { pastExamService, CURATED_EXAM_BANK } from './pastExamService';

describe('pastExamService', () => {
  it('contains exactly 10 reviewed high-yield curated exam questions across MedChem and Pharmacology', () => {
    expect(CURATED_EXAM_BANK.length).toBe(10);
    const medchemQuestions = pastExamService.getCuratedQuestions('medchem');
    const pharmQuestions = pastExamService.getCuratedQuestions('pharmacology');
    expect(medchemQuestions.length).toBe(5);
    expect(pharmQuestions.length).toBe(5);

    // Verify all questions have 4 diagnostic options, 3-tier scaffolding ladders, and slide references
    CURATED_EXAM_BANK.forEach((q) => {
      expect(q.options.length).toBe(4);
      expect(q.options.filter((o) => o.isCorrect).length).toBe(1);
      expect(q.scaffoldingLadder.length).toBe(3);
      expect(q.slideReferences.length).toBeGreaterThan(0);
      expect(q.facultyOrigin).toBeTruthy();
      expect(q.pedagogicalTakeaway).toBeTruthy();
    });
  });

  it('retrieves questions by specific ID', () => {
    const q = pastExamService.getQuestionById('curated-ph-1');
    expect(q).toBeDefined();
    expect(q?.originalTopic).toContain('Potens vs Etkinlik');
    expect(q?.slideReferences).toContain(18);
  });

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
