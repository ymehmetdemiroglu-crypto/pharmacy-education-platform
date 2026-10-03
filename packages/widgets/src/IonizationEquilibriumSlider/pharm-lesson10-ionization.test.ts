import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { IonizationEquilibriumConfigSchema } from './schema';

describe('Pharmacology Lesson 10 IonizationEquilibriumSlider Configuration Validation', () => {
  it('validates lesson-10 step 5 widget config against IonizationEquilibriumConfigSchema', () => {
    const lessonPath = path.resolve(__dirname, '../../../../courses/pharmacology/lessons/lesson-10.json');
    const raw = fs.readFileSync(lessonPath, 'utf8');
    const lesson = JSON.parse(raw);
    const step5 = lesson.steps[4];

    expect(step5.widgetType).toBe('IonizationEquilibriumSlider');
    expect(step5.widget.type).toBe('IonizationEquilibriumSlider');

    const result = IonizationEquilibriumConfigSchema.safeParse(step5.widget.config);
    if (!result.success) {
      console.error(JSON.stringify(result.error.format(), null, 2));
    }
    expect(result.success).toBe(true);

    const config = result.data!;
    expect(config.title).toContain('Tübüler');
    expect(config.drugName).toContain('Furosemid');
    expect(config.defaultPka).toBe(3.9);
    expect(config.defaultPh).toBe(5.5);
    expect(config.defaultDrugType).toBe('acid');
    expect(config.showBioGradients).toBe(true);
    expect(config.source?.page).toBe(24);

    // Also check step5.config matches widget.config
    expect(step5.config).toEqual(step5.widget.config);
  });
});
