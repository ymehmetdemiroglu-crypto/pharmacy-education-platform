import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { DoseResponseCurveConfigSchema } from './schema';

describe('Pharmacology Lesson 09 DoseResponseCurve Configuration Validation', () => {
  it('validates lesson-09 step 5 widget config against DoseResponseCurveConfigSchema', () => {
    const lessonPath = path.resolve(__dirname, '../../../../courses/pharmacology/lessons/lesson-09.json');
    const raw = fs.readFileSync(lessonPath, 'utf8');
    const lesson = JSON.parse(raw);
    const step5 = lesson.steps[4];

    expect(step5.widgetType).toBe('DoseResponseCurve');
    expect(step5.widget.type).toBe('DoseResponseCurve');

    const result = DoseResponseCurveConfigSchema.safeParse(step5.widget.config);
    if (!result.success) {
      console.error(JSON.stringify(result.error.format(), null, 2));
    }
    expect(result.success).toBe(true);

    const config = result.data!;
    expect(config.title).toContain('Anjiyotensin II');
    expect(config.defaultEc50).toBe(1.0);
    expect(config.defaultEmax).toBe(100);
    expect(config.modes).toContain('agonist');
    expect(config.modes).toContain('competitive_antagonist');
    expect(config.modes).toContain('noncompetitive_antagonist');
    expect(config.source.page).toBe(8);

    // Also check step5.config matches widget.config
    expect(step5.config).toEqual(step5.widget.config);
  });
});
