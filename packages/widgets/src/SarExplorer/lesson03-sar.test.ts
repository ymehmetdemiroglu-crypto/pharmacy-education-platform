import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { SarExplorerConfigSchema } from './schema';

describe('Lesson 03 SarExplorer Configuration Validation', () => {
  it('validates lesson-03 step 5 widget config against SarExplorerConfigSchema', () => {
    const lessonPath = path.resolve(__dirname, '../../../../courses/medchem/lessons/lesson-03.json');
    const raw = fs.readFileSync(lessonPath, 'utf8');
    const lesson = JSON.parse(raw);
    const step5 = lesson.steps[4];

    expect(step5.widgetType).toBe('SarExplorer');
    expect(step5.widget.type).toBe('SarExplorer');

    const result = SarExplorerConfigSchema.safeParse(step5.widget.config);
    if (!result.success) {
      console.error(JSON.stringify(result.error.format(), null, 2));
    }
    expect(result.success).toBe(true);

    const config = result.data!;
    expect(config.scaffoldName).toBe('Lokal Anestezik Prokain Türevleri');
    expect(config.positions.length).toBe(2);
    expect(config.baseAffinityNm).toBe(1200);
    expect(config.targetGoal.targetOptionIds).toEqual(['r1-butox', 'r2-diethyl']);
  });
});
