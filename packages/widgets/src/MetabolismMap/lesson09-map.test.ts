import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { MetabolismMapConfigSchema } from './schema';

describe('Lesson 09 MetabolismMap Configuration Validation', () => {
  it('validates lesson-09 step 5 config against MetabolismMapConfigSchema', () => {
    const lessonPath = path.resolve(__dirname, '../../../../courses/medchem/lessons/lesson-09.json');
    const raw = fs.readFileSync(lessonPath, 'utf8');
    const lesson = JSON.parse(raw);
    const step5 = lesson.steps[4];

    expect(step5.widgetType).toBe('MetabolismMap');
    expect(step5.widget.type).toBe('MetabolismMap');

    const result = MetabolismMapConfigSchema.safeParse(step5.widget.config);
    if (!result.success) {
      console.error(JSON.stringify(result.error.format(), null, 2));
    }
    expect(result.success).toBe(true);

    const config = result.data!;
    expect(config.drugName).toBe('Diazepam');
    expect(config.sites.length).toBe(3);
    const target = config.sites.find(s => s.isTargetSite);
    expect(target).toBeDefined();
    expect(target!.id).toBe('site_n1_demethylation');
    expect(target!.enzyme).toContain('CYP');
  });
});
