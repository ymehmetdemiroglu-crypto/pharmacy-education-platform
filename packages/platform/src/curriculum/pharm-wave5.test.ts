import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { TwelveStageLessonSchema, validate12StageSequence, wordCount } from './schema';

describe('Pharmacology Wave 5 (Lessons 09 & 10) Comprehensive Audit Test Suite', () => {
  const repoRoot = path.resolve(__dirname, '../../../../');
  const pharmDir = path.join(repoRoot, 'courses', 'pharmacology', 'lessons');
  const l9Path = path.join(pharmDir, 'lesson-09.json');
  const l10Path = path.join(pharmDir, 'lesson-10.json');
  const l9 = JSON.parse(fs.readFileSync(l9Path, 'utf8'));
  const l10 = JSON.parse(fs.readFileSync(l10Path, 'utf8'));

  describe('Lesson 09: Renin-Angiotensin-Aldosterone System (RAAS) Pharmacotherapy', () => {
    it('validates against TwelveStageLessonSchema', () => {
      const result = TwelveStageLessonSchema.safeParse(l9);
      if (!result.success) {
        console.error('L09 Schema Error:', JSON.stringify(result.error.format(), null, 2));
      }
      expect(result.success).toBe(true);
    });

    it('strictly satisfies canonical 12-stage sequence', () => {
      expect(l9.steps.length).toBe(12);
      expect(validate12StageSequence(l9.steps)).toBe(true);
    });

    it('enforces word count <= 40 for prompts and options across TR, AR, EN', () => {
      l9.steps.forEach((step: any, idx: number) => {
        ['en', 'tr', 'ar'].forEach((lang) => {
          const prompt = step.prompt?.[lang] || '';
          expect(wordCount(prompt), `Step ${idx + 1} (${lang}) prompt exceeds 40: "${prompt}"`).toBeLessThanOrEqual(40);
        });

        const options = step.conceptCheck?.options || [];
        if (idx !== 4) {
          expect(options.length, `Step ${idx + 1} must have at least 3 options`).toBeGreaterThanOrEqual(3);
        }
        options.forEach((opt: any, oIdx: number) => {
          ['en', 'tr', 'ar'].forEach((lang) => {
            const text = opt.text?.[lang] || '';
            expect(wordCount(text), `Step ${idx + 1} opt ${oIdx} (${lang}) exceeds 40: "${text}"`).toBeLessThanOrEqual(40);
          });
          expect(opt.feedback?.en, `Step ${idx + 1} opt ${oIdx} missing en feedback`).toBeTruthy();
          expect(opt.feedback?.tr, `Step ${idx + 1} opt ${oIdx} missing tr feedback`).toBeTruthy();
          expect(opt.feedback?.ar, `Step ${idx + 1} opt ${oIdx} missing ar feedback`).toBeTruthy();
        });
      });
    });

    it('validates step 5 DoseResponseCurve widget and 3-tier hints across all steps', () => {
      const step5 = l9.steps[4];
      expect(step5.widgetType).toBe('DoseResponseCurve');
      expect(step5.widget.type).toBe('DoseResponseCurve');
      l9.steps.forEach((step: any, idx: number) => {
        expect(Array.isArray(step.hints), `Step ${idx + 1} hints must be an array`).toBe(true);
        expect(step.hints.length, `Step ${idx + 1} must have exactly 3 hint tiers`).toBe(3);
        expect(step.hints[0].tier).toBe(1);
        expect(step.hints[1].tier).toBe(2);
        expect(step.hints[2].tier).toBe(3);
        ['en', 'tr', 'ar'].forEach((lang) => {
          expect(step.hints[0][lang]).toBeTruthy();
          expect(step.hints[1][lang]).toBeTruthy();
          expect(step.hints[2][lang]).toBeTruthy();
        });
      });
    });

    it('mirrors conceptCheck.options into config.options for all multiple-choice steps', () => {
      l9.steps.forEach((step: any, idx: number) => {
        if (step.conceptCheck?.options && step.conceptCheck.options.length > 0) {
          expect(step.config?.options?.length, `Step ${idx + 1} config.options mismatch`).toBe(
            step.conceptCheck.options.length
          );
        }
      });
    });

    it('verifies Step 12 biochemical panel diagnosis case challenge', () => {
      const step12 = l9.steps[11];
      expect(step12.stage).toBe('mastery_check');
      expect(step12.prompt.en).toContain('PRA');
      expect(step12.prompt.en).toContain('bradykinin');
      expect(step12.prompt.en).toContain('hyperkalemia');
    });
  });

  describe('Lesson 10: Diuretic Mechanisms & Tubular Electrolyte Transport', () => {
    it('validates against TwelveStageLessonSchema', () => {
      const result = TwelveStageLessonSchema.safeParse(l10);
      if (!result.success) {
        console.error('L10 Schema Error:', JSON.stringify(result.error.format(), null, 2));
      }
      expect(result.success).toBe(true);
    });

    it('strictly satisfies canonical 12-stage sequence', () => {
      expect(l10.steps.length).toBe(12);
      expect(validate12StageSequence(l10.steps)).toBe(true);
    });

    it('enforces word count <= 40 for prompts and options across TR, AR, EN', () => {
      l10.steps.forEach((step: any, idx: number) => {
        ['en', 'tr', 'ar'].forEach((lang) => {
          const prompt = step.prompt?.[lang] || '';
          expect(wordCount(prompt), `Step ${idx + 1} (${lang}) prompt exceeds 40: "${prompt}"`).toBeLessThanOrEqual(40);
        });

        const options = step.conceptCheck?.options || [];
        if (idx !== 4) {
          expect(options.length, `Step ${idx + 1} must have at least 3 options`).toBeGreaterThanOrEqual(3);
        }
        options.forEach((opt: any, oIdx: number) => {
          ['en', 'tr', 'ar'].forEach((lang) => {
            const text = opt.text?.[lang] || '';
            expect(wordCount(text), `Step ${idx + 1} opt ${oIdx} (${lang}) exceeds 40: "${text}"`).toBeLessThanOrEqual(40);
          });
          expect(opt.feedback?.en, `Step ${idx + 1} opt ${oIdx} missing en feedback`).toBeTruthy();
          expect(opt.feedback?.tr, `Step ${idx + 1} opt ${oIdx} missing tr feedback`).toBeTruthy();
          expect(opt.feedback?.ar, `Step ${idx + 1} opt ${oIdx} missing ar feedback`).toBeTruthy();
        });
      });
    });

    it('validates step 5 IonizationEquilibriumSlider widget and 3-tier hints across all steps', () => {
      const step5 = l10.steps[4];
      expect(step5.widgetType).toBe('IonizationEquilibriumSlider');
      expect(step5.widget.type).toBe('IonizationEquilibriumSlider');
      l10.steps.forEach((step: any, idx: number) => {
        expect(Array.isArray(step.hints), `Step ${idx + 1} hints must be an array`).toBe(true);
        expect(step.hints.length, `Step ${idx + 1} must have exactly 3 hint tiers`).toBe(3);
        expect(step.hints[0].tier).toBe(1);
        expect(step.hints[1].tier).toBe(2);
        expect(step.hints[2].tier).toBe(3);
        ['en', 'tr', 'ar'].forEach((lang) => {
          expect(step.hints[0][lang]).toBeTruthy();
          expect(step.hints[1][lang]).toBeTruthy();
          expect(step.hints[2][lang]).toBeTruthy();
        });
      });
    });

    it('mirrors conceptCheck.options into config.options for all multiple-choice steps', () => {
      l10.steps.forEach((step: any, idx: number) => {
        if (step.conceptCheck?.options && step.conceptCheck.options.length > 0) {
          expect(step.config?.options?.length, `Step ${idx + 1} config.options mismatch`).toBe(
            step.conceptCheck.options.length
          );
        }
      });
    });

    it('verifies Step 12 arterial blood gas and electrolyte panel transfer challenge', () => {
      const step12 = l10.steps[11];
      expect(step12.stage).toBe('mastery_check');
      expect(step12.prompt.en).toContain('Arterial pH');
      expect(step12.prompt.en).toContain('hypercalciuria');
    });
  });
});
