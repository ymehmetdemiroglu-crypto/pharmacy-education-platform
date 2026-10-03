import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { ReceptorLigandMatcherConfigSchema } from './schema';

describe('Lesson 08 ReceptorLigandMatcher Configuration Validation', () => {
  it('validates lesson-08 step 5 widget config against ReceptorLigandMatcherConfigSchema', () => {
    const lessonPath = path.resolve(__dirname, '../../../../courses/medchem/lessons/lesson-08.json');
    const raw = fs.readFileSync(lessonPath, 'utf8');
    const lesson = JSON.parse(raw);
    const step5 = lesson.steps[4];

    expect(step5.widgetType).toBe('ReceptorLigandMatcher');
    expect(step5.widget.type).toBe('ReceptorLigandMatcher');

    const result = ReceptorLigandMatcherConfigSchema.safeParse(step5.widget.config);
    if (!result.success) {
      console.error(JSON.stringify(result.error.format(), null, 2));
    }
    expect(result.success).toBe(true);

    const config = result.data!;
    expect(config.drugName).toContain('Asetilkolin');
    expect(config.pairs.length).toBe(4);
    expect(config.residues.length).toBe(3);

    // Verify gauche maps to muscarinic and anti maps to nicotinic
    const gauche = config.pairs.find((p) => p.id === 'pair_gauche');
    const anti = config.pairs.find((p) => p.id === 'pair_anti');
    expect(gauche?.correctResidueId).toBe('res_muscarinic');
    expect(anti?.correctResidueId).toBe('res_nicotinic');

    // Verify cyclopropyl analogs
    const cisCyclo = config.pairs.find((p) => p.id === 'pair_cis_cyclo');
    const transCyclo = config.pairs.find((p) => p.id === 'pair_trans_cyclo');
    expect(cisCyclo?.correctResidueId).toBe('res_muscarinic');
    expect(transCyclo?.correctResidueId).toBe('res_nicotinic');
  });
});
