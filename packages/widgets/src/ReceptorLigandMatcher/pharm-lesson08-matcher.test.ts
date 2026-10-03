import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { ReceptorLigandMatcherConfigSchema } from './schema';

describe('Pharmacology Lesson 08 ReceptorLigandMatcher Configuration Validation', () => {
  it('validates lesson-08 step 5 config against ReceptorLigandMatcherConfigSchema', () => {
    const lessonPath = path.resolve(__dirname, '../../../../courses/pharmacology/lessons/lesson-08.json');
    const raw = fs.readFileSync(lessonPath, 'utf8');
    const lesson = JSON.parse(raw);
    const step5 = lesson.steps[4];

    expect(step5.widgetType).toBe('ReceptorLigandMatcher');
    expect(step5.widget.type).toBe('ReceptorLigandMatcher');

    const result = ReceptorLigandMatcherConfigSchema.safeParse(step5.config);
    if (!result.success) {
      console.error(JSON.stringify(result.error.format(), null, 2));
    }
    expect(result.success).toBe(true);

    const config = result.data!;
    expect(config.drugName).toContain('Asetilkolin');
    expect(config.pairs.length).toBe(4);
    expect(config.residues.length).toBe(5);

    // Verify bond types in Acetylcholine M3 multipoint model
    const bondTypes = config.pairs.map((p) => p.bondType);
    expect(bondTypes).toContain('ionic');
    expect(bondTypes).toContain('pi_pi');
    expect(bondTypes).toContain('h_bond');
    expect(bondTypes).toContain('van_der_waals');

    // Also check widget.config matches step5.config
    expect(step5.widget.config).toEqual(step5.config);
  });
});
