import lesson01Json from '../../../../courses/medchem/lessons/lesson-01.json';
import { LessonData, LessonSchema } from '@pharmacy/platform';

// Validate at load time
export const lesson01: LessonData = LessonSchema.parse(lesson01Json);

export const lessonsMap: Record<string, LessonData> = {
  '1': lesson01,
  'mc-mod1-les1': lesson01,
};
