import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { TwelveStageLessonSchema, validate12StageSequence, wordCount } from './schema';

describe('Pharmacology Wave 4 (Lessons 07 & 08) Comprehensive Audit Test Suite', () => {
  const repoRoot = path.resolve(__dirname, '../../../../');
  const pharmDir = path.join(repoRoot, 'courses', 'pharmacology', 'lessons');
  const l7Path = path.join(pharmDir, 'lesson-07.json');
  const l8Path = path.join(pharmDir, 'lesson-08.json');
  const l7 = JSON.parse(fs.readFileSync(l7Path, 'utf8'));
  const l8 = JSON.parse(fs.readFileSync(l8Path, 'utf8'));

  describe('Lesson 07: Autonomic Nervous System: Adrenergic Neurotransmission & Receptor Subtypes', () => {
    it('validates against TwelveStageLessonSchema', () => {
      const result = TwelveStageLessonSchema.safeParse(l7);
      if (!result.success) {
        console.error('L07 Schema Error:', JSON.stringify(result.error.format(), null, 2));
      }
      expect(result.success).toBe(true);
    });

    it('strictly satisfies canonical 12-stage sequence', () => {
      expect(l7.steps.length).toBe(12);
      expect(validate12StageSequence(l7.steps)).toBe(true);
    });

    it('enforces word count <= 40 for prompts and options across TR, AR, EN', () => {
      l7.steps.forEach((step: any, idx: number) => {
        ['en', 'tr', 'ar'].forEach((lang) => {
          const prompt = step.prompt?.[lang] || '';
          expect(wordCount(prompt), `Step ${idx + 1} (${lang}) prompt exceeds 40`).toBeLessThanOrEqual(40);
        });

        const options = step.conceptCheck?.options || [];
        options.forEach((opt: any, oIdx: number) => {
          ['en', 'tr', 'ar'].forEach((lang) => {
            const text = opt.text?.[lang] || '';
            expect(wordCount(text), `Step ${idx + 1} opt ${oIdx} (${lang}) exceeds 40`).toBeLessThanOrEqual(40);
          });
          expect(opt.feedback?.en).toBeTruthy();
          expect(opt.feedback?.tr).toBeTruthy();
          expect(opt.feedback?.ar).toBeTruthy();
        });
      });
    });

    it('validates step 5 ReceptorLigandMatcher widget and 3-tier hints', () => {
      const step5 = l7.steps[4];
      expect(step5.widgetType).toBe('ReceptorLigandMatcher');
      expect(step5.widget.type).toBe('ReceptorLigandMatcher');
      expect(step5.hints.length).toBe(3);
      expect(step5.hints[0].tier).toBe(1);
      expect(step5.hints[1].tier).toBe(2);
      expect(step5.hints[2].tier).toBe(3);
    });

    it('mirrors conceptCheck.options into config.options for all multiple-choice steps', () => {
      l7.steps.forEach((step: any, idx: number) => {
        if (step.conceptCheck?.options) {
          expect(step.config?.options?.length, `Step ${idx + 1} config.options mismatch`).toBe(
            step.conceptCheck.options.length
          );
        }
      });
    });
  });

  describe('Lesson 08: Cholinergic Neurotransmission & Muscarinic Receptor Modulation', () => {
    it('validates against TwelveStageLessonSchema', () => {
      const result = TwelveStageLessonSchema.safeParse(l8);
      if (!result.success) {
        console.error('L08 Schema Error:', JSON.stringify(result.error.format(), null, 2));
      }
      expect(result.success).toBe(true);
    });

    it('strictly satisfies canonical 12-stage sequence', () => {
      expect(l8.steps.length).toBe(12);
      expect(validate12StageSequence(l8.steps)).toBe(true);
    });

    it('enforces word count <= 40 for prompts and options across TR, AR, EN', () => {
      l8.steps.forEach((step: any, idx: number) => {
        ['en', 'tr', 'ar'].forEach((lang) => {
          const prompt = step.prompt?.[lang] || '';
          expect(wordCount(prompt), `Step ${idx + 1} (${lang}) prompt exceeds 40`).toBeLessThanOrEqual(40);
        });

        const options = step.conceptCheck?.options || [];
        options.forEach((opt: any, oIdx: number) => {
          ['en', 'tr', 'ar'].forEach((lang) => {
            const text = opt.text?.[lang] || '';
            expect(wordCount(text), `Step ${idx + 1} opt ${oIdx} (${lang}) exceeds 40`).toBeLessThanOrEqual(40);
          });
          expect(opt.feedback?.en).toBeTruthy();
          expect(opt.feedback?.tr).toBeTruthy();
          expect(opt.feedback?.ar).toBeTruthy();
        });
      });
    });

    it('validates step 5 ReceptorLigandMatcher widget and 3-tier hints', () => {
      const step5 = l8.steps[4];
      expect(step5.widgetType).toBe('ReceptorLigandMatcher');
      expect(step5.widget.type).toBe('ReceptorLigandMatcher');
      expect(step5.hints.length).toBe(3);
      expect(step5.hints[0].tier).toBe(1);
      expect(step5.hints[1].tier).toBe(2);
      expect(step5.hints[2].tier).toBe(3);
    });

    it('mirrors conceptCheck.options into config.options for all multiple-choice steps', () => {
      l8.steps.forEach((step: any, idx: number) => {
        if (step.conceptCheck?.options) {
          expect(step.config?.options?.length, `Step ${idx + 1} config.options mismatch`).toBe(
            step.conceptCheck.options.length
          );
        }
      });
    });
  });
});
