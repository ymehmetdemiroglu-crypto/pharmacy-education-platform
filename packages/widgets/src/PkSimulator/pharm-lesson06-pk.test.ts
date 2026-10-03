import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { PkSimulatorConfigSchema } from './schema';

describe('Pharmacology Lesson 06 PkSimulator Configuration Validation', () => {
  it('validates lesson-06 step 5 widget config against PkSimulatorConfigSchema', () => {
    const lessonPath = path.resolve(__dirname, '../../../../courses/pharmacology/lessons/lesson-06.json');
    const raw = fs.readFileSync(lessonPath, 'utf8');
    const lesson = JSON.parse(raw);
    const step5 = lesson.steps[4];

    expect(step5.widgetType).toBe('PkSimulator');
    expect(step5.widget.type).toBe('PkSimulator');

    const result = PkSimulatorConfigSchema.safeParse(step5.widget.config);
    if (!result.success) {
      console.error(JSON.stringify(result.error.format(), null, 2));
    }
    expect(result.success).toBe(true);

    const config = result.data!;
    expect(config.drugName).toContain('Propranolol');
    expect(config.defaultDoseMg).toBe(80);
    expect(config.defaultClearanceLHr).toBe(60);
    expect(config.defaultVdL).toBe(280);
    expect(config.defaultBioavailabilityF).toBe(0.25);
    expect(config.routes).toContain('iv_bolus');
    expect(config.routes).toContain('oral');
    expect(config.source.page).toBe(42);

    // Also check step5.config matches widget.config
    expect(step5.config).toEqual(step5.widget.config);
  });
});
