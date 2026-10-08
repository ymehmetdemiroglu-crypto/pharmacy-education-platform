import { describe, it, expect, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { parseTeachingMd, contextFromPath } from '../../../../scripts/lib/teaching-md.mjs';
import { MultipleChoice } from '../MultipleChoice/MultipleChoice';
import { MultipleChoiceConfigSchema } from '../MultipleChoice/schema';
import { PredictThenReveal } from '../PredictThenReveal/PredictThenReveal';
import { PredictThenRevealConfigSchema } from '../PredictThenReveal/schema';
import { LectureConceptSchema } from './WhiteboardProtocol';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const FILE = path.join(ROOT, 'courses/medchem/teaching/hafta-01-reseptor-etkilesimleri.teaching.md');
const parsed = parseTeachingMd(fs.readFileSync(FILE, 'utf8'), contextFromPath(FILE));
const withWidget = parsed.concepts.filter((c) => c.widget);

describe('teaching blueprint: hafta-01-reseptor-etkilesimleri', () => {
  it('parses with zero structural errors and 10 concepts', () => {
    expect(parsed.errors).toEqual([]);
    expect(parsed.concepts).toHaveLength(10);
    expect(parsed.deck).toBe('İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf');
  });

  it('tracks concept verification status as valid (draft or verified)', () => {
    expect(parsed.concepts.every((c) => c.status === 'draft' || c.status === 'verified')).toBe(true);
  });

  it('validates against the runtime concept schema (3-tier ladder, <=40 words)', () => {
    for (const c of parsed.concepts) expect(() => LectureConceptSchema.parse(c)).not.toThrow();
  });

  it('never ships a widget for items that are unverified in the slides (dibukain, slide 16 order, slide 27 charges)', () => {
    const dibukain = parsed.concepts.find((c) => c.id === 'rr:dibukain_entegrasyon')!;
    expect(dibukain.widget).toBeNull();
    const text = JSON.stringify(parsed.concepts.map((c) => c.widget));
    expect(text).not.toMatch(/OH\s*···\s*N/);
    expect(text).not.toMatch(/Ni\+\+\+|Pd\+\+\+/);
    // no invented SMILES anywhere
    expect(text).not.toMatch(/smiles/i);
  });

  it('every wrong option id maps to a diagnosed misconception, and every claim carries a slide source', () => {
    for (const c of withWidget) {
      const cfg = c.widget!.config as { options: { id: string; isCorrect: boolean }[]; source: { file: string; page: number } };
      for (const o of cfg.options.filter((x) => !x.isCorrect)) expect(c.misconceptionMap[o.id]).toBeDefined();
      expect(cfg.source.file).toBe(parsed.deck);
      expect(c.slideNumbers).toContain(cfg.source.page);
      for (const m of Object.values(c.misconceptionMap)) expect(m.slides.length).toBeGreaterThan(0);
    }
  });

  it('widget configs satisfy the real MultipleChoice / PredictThenReveal Zod schemas', () => {
    for (const c of withWidget) {
      const schema =
        c.widget!.type === 'MultipleChoice'
          ? MultipleChoiceConfigSchema
          : c.widget!.type === 'PredictThenReveal'
            ? PredictThenRevealConfigSchema
            : null;
      expect(schema, `no schema for ${c.widget!.type}`).not.toBeNull();
      expect(() => schema!.parse(c.widget!.config), c.id).not.toThrow();
    }
  });

  it('every shipped widget renders and reports onCorrect for the correct option and onIncorrect for a distractor', () => {
    for (const c of withWidget) {
      const cfg = c.widget!.config as {
        options: { id: string; isCorrect: boolean; text?: string; label?: string }[];
      };
      const textOf = (o: { text?: string; label?: string }) => (o.text ?? o.label)!;
      const isMc = c.widget!.type === 'MultipleChoice';

      for (const wantCorrect of [true, false]) {
        const option = cfg.options.find((o) => o.isCorrect === wantCorrect)!;
        const onCorrect = vi.fn();
        const onIncorrect = vi.fn();
        const { unmount } = render(
          isMc
            ? React.createElement(MultipleChoice, { config: c.widget!.config as never, locale: 'en', onCorrect, onIncorrect })
            : React.createElement(PredictThenReveal, { config: c.widget!.config as never, locale: 'en', onCorrect, onIncorrect })
        );
        fireEvent.click(screen.getByText(textOf(option)));
        fireEvent.click(screen.getByRole('button', { name: isMc ? /check answer/i : /reveal experimental outcome/i }));
        expect(wantCorrect ? onCorrect : onIncorrect, `${c.id} wantCorrect=${wantCorrect}`).toHaveBeenCalledTimes(1);
        expect(wantCorrect ? onIncorrect : onCorrect).not.toHaveBeenCalled();
        unmount();
      }
    }
  });
});
