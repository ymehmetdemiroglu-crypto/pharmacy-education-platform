import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { SarExplorerConfigSchema } from './schema';

describe('Lesson 06 SarExplorer Configuration Validation', () => {
  it('validates lesson-06 step 5 widget config against SarExplorerConfigSchema', () => {
    const lessonPath = path.resolve(__dirname, '../../../../courses/medchem/lessons/lesson-06.json');
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
    expect(config.scaffoldName).toContain('Losartan Core');
    expect(config.positions.length).toBe(1);
    expect(config.targetGoal.targetOptionIds).toEqual(['opt_tetrazole']);
    
    // Check that tetrazole satisfies the goal
    const tetrazole = config.positions[0]!.options.find(o => o.id === 'opt_tetrazole');
    expect(tetrazole).toBeDefined();
    const finalLogP = config.baseLogP + tetrazole!.deltaLogP; // 0.8 + 1.3 = 2.1
    expect(finalLogP).toBeGreaterThanOrEqual(config.targetGoal.minLogP!);
    expect(finalLogP).toBeLessThanOrEqual(config.targetGoal.maxLogP!);
    
    const finalAffinity = config.baseAffinityNm / tetrazole!.affinityMultiplier; // 120 / 12 = 10 nM
    expect(finalAffinity).toBeLessThanOrEqual(config.targetGoal.maxAffinityNm!);
  });
});
