import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { TwelveStageLessonSchema, validate12StageSequence, wordCount } from './schema';

describe('Pharmacology Wave 6 (Lessons 11 & 12) Comprehensive Audit Test Suite', () => {
  const repoRoot = path.resolve(__dirname, '../../../../');
  const pharmDir = path.join(repoRoot, 'courses', 'pharmacology', 'lessons');
  const l11Path = path.join(pharmDir, 'lesson-11.json');
  const l12Path = path.join(pharmDir, 'lesson-12.json');
  const l11 = JSON.parse(fs.readFileSync(l11Path, 'utf8'));
  const l12 = JSON.parse(fs.readFileSync(l12Path, 'utf8'));

  describe('Lesson 11: GABAergic Neurotransmission & Positive Allosteric Modulators', () => {
    it('validates against TwelveStageLessonSchema', () => {
      const result = TwelveStageLessonSchema.safeParse(l11);
      if (!result.success) {
        console.error('L11 Schema Error:', JSON.stringify(result.error.format(), null, 2));
      }
      expect(result.success).toBe(true);
    });

    it('strictly satisfies canonical 12-stage sequence', () => {
      expect(l11.steps.length).toBe(12);
      expect(validate12StageSequence(l11.steps)).toBe(true);
    });

    it('enforces word count <= 40 for prompts and options across TR, AR, EN', () => {
      l11.steps.forEach((step: any, idx: number) => {
        ['en', 'tr', 'ar'].forEach((lang) => {
          const prompt = step.prompt?.[lang] || '';
          expect(wordCount(prompt), `Step ${idx + 1} (${lang}) prompt exceeds 40: "${prompt}"`).toBeLessThanOrEqual(40);
        });

        const options = step.conceptCheck?.options || [];
        if (idx !== 4) {
          expect(options.length, `Step ${idx + 1} must have 4 options`).toBe(4);
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
      const step5 = l11.steps[4];
      expect(step5.widgetType).toBe('DoseResponseCurve');
      expect(step5.widget.type).toBe('DoseResponseCurve');
      l11.steps.forEach((step: any, idx: number) => {
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
      l11.steps.forEach((step: any, idx: number) => {
        if (step.conceptCheck?.options && step.conceptCheck.options.length > 0) {
          expect(step.config?.options?.length, `Step ${idx + 1} config.options mismatch`).toBe(
            step.conceptCheck.options.length
          );
        }
      });
    });

    it('verifies Step 12 Flumazenil / TCA overdose transfer challenge', () => {
      const step12 = l11.steps[11];
      expect(step12.stage).toBe('mastery_check');
      expect(step12.prompt.en).toContain('flumazenil');
      expect(step12.prompt.en).toContain('QRS');
      expect(step12.prompt.en).toContain('aVR');
    });
  });

  describe('Lesson 12: Dopaminergic Pathways and Antipsychotic Receptor Profiles', () => {
    it('validates against TwelveStageLessonSchema', () => {
      const result = TwelveStageLessonSchema.safeParse(l12);
      if (!result.success) {
        console.error('L12 Schema Error:', JSON.stringify(result.error.format(), null, 2));
      }
      expect(result.success).toBe(true);
    });

    it('strictly satisfies canonical 12-stage sequence', () => {
      expect(l12.steps.length).toBe(12);
      expect(validate12StageSequence(l12.steps)).toBe(true);
    });

    it('enforces word count <= 40 for prompts and options across TR, AR, EN', () => {
      l12.steps.forEach((step: any, idx: number) => {
        ['en', 'tr', 'ar'].forEach((lang) => {
          const prompt = step.prompt?.[lang] || '';
          expect(wordCount(prompt), `Step ${idx + 1} (${lang}) prompt exceeds 40: "${prompt}"`).toBeLessThanOrEqual(40);
        });

        const options = step.conceptCheck?.options || [];
        if (idx !== 4) {
          expect(options.length, `Step ${idx + 1} must have 4 options`).toBe(4);
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

    it('validates step 5 ReceptorLigandMatcher widget and 3-tier hints across all steps', () => {
      const step5 = l12.steps[4];
      expect(step5.widgetType).toBe('ReceptorLigandMatcher');
      expect(step5.widget.type).toBe('ReceptorLigandMatcher');
      l12.steps.forEach((step: any, idx: number) => {
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
      l12.steps.forEach((step: any, idx: number) => {
        if (step.conceptCheck?.options && step.conceptCheck.options.length > 0) {
          expect(step.config?.options?.length, `Step ${idx + 1} config.options mismatch`).toBe(
            step.conceptCheck.options.length
          );
        }
      });
    });

    it('verifies Step 12 Aripiprazole rotation and PET occupancy transfer challenge', () => {
      const step12 = l12.steps[11];
      expect(step12.stage).toBe('mastery_check');
      expect(step12.prompt.en).toContain('prolactin');
      expect(step12.prompt.en).toContain('occupancy');
      expect(step12.conceptCheck.options[0].text.en).toContain('Aripiprazole');
    });
  });
});
