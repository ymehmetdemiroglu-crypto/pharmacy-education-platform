import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { ReceptorLigandMatcherConfigSchema } from './schema';

describe('Lesson 04 ReceptorLigandMatcher Configuration Validation', () => {
  it('validates lesson-04 step 5 config against ReceptorLigandMatcherConfigSchema', () => {
    const lessonPath = path.resolve(__dirname, '../../../../courses/medchem/lessons/lesson-04.json');
    const raw = fs.readFileSync(lessonPath, 'utf8');
    const lesson = JSON.parse(raw);
    const step5 = lesson.steps[4];

    expect(step5.widgetType).toBe('ReceptorLigandMatcher');

    const result = ReceptorLigandMatcherConfigSchema.safeParse(step5.config);
    if (!result.success) {
      console.error(JSON.stringify(result.error.format(), null, 2));
    }
    expect(result.success).toBe(true);

    const config = result.data!;
    expect(config.drugName).toBe('(R)-Adrenalin');
    expect(config.pairs.length).toBe(3);
    expect(config.residues.length).toBe(5);
  });
});
