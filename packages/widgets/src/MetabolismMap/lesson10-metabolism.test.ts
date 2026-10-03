import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { MetabolismMapConfigSchema } from './schema';

describe('Lesson 10 MetabolismMap Configuration Validation', () => {
  it('validates lesson-10 step 5 config against MetabolismMapConfigSchema', () => {
    const lessonPath = path.resolve(__dirname, '../../../../courses/medchem/lessons/lesson-10.json');
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
    expect(config.drugName.length).toBeGreaterThan(0);
    expect(config.sites.length).toBeGreaterThanOrEqual(2);
    expect(config.sites.some((s) => s.isTargetSite)).toBe(true);
  });
});
