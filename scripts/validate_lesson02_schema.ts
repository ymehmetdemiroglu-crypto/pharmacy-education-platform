import fs from 'fs';
import { TwelveStageLessonSchema } from '../packages/platform/src/curriculum/schema.ts';

const raw = fs.readFileSync('courses/medchem/lessons/lesson-02.json', 'utf8');
const data = JSON.parse(raw);

try {
  const parsed = TwelveStageLessonSchema.parse(data);
  console.log('✅ TwelveStageLessonSchema.parse SUCCESS!');
  console.log('Parsed Lesson ID:', parsed.id);
  console.log('Parsed Lesson Steps:', parsed.steps.length);
} catch (err) {
  console.error('❌ TwelveStageLessonSchema.parse FAILED:');
  console.error(err);
  process.exit(1);
}
