import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { StructureIdentifierConfigSchema } from './schema';

describe('Lesson 05 StructureIdentifier Configuration Validation', () => {
  it('validates lesson-05 step 5 config against StructureIdentifierConfigSchema', () => {
    const lessonPath = path.resolve(__dirname, '../../../../courses/medchem/lessons/lesson-05.json');
    const raw = fs.readFileSync(lessonPath, 'utf8');
    const lesson = JSON.parse(raw);
    const step5 = lesson.steps[4];

    expect(step5.widgetType).toBe('StructureIdentifier');

    const result = StructureIdentifierConfigSchema.safeParse(step5.config);
    if (!result.success) {
      console.error(JSON.stringify(result.error.format(), null, 2));
    }
    expect(result.success).toBe(true);

    const config = result.data!;
    expect(config.moleculeName).toContain('Difenhidramin');
    expect(config.atoms.length).toBeGreaterThanOrEqual(3);
    const target = config.atoms.find((a) => a.isTarget);
    expect(target).toBeDefined();
    expect(target?.id).toBe('atom_O');
  });
});
