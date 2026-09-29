import type { LessonData } from '@pharmacy/platform';
import { clientLesson01 } from './lesson01.client';

let baseLesson: LessonData = clientLesson01;

// In dev environment, dynamic import allows viewing full raw JSON with internal review notes
if (import.meta.env.DEV) {
  try {
    const devModule = await import('../../../../courses/medchem/lessons/lesson-01.json');
    if (devModule?.default) {
      baseLesson = devModule.default as unknown as LessonData;
    }
  } catch {
    // Fall back to clientLesson01
  }
}

export const lesson01: LessonData = baseLesson;

export const lessonsMap: Record<string, LessonData> = {
  '1': lesson01,
  'mc-mod1-les1': lesson01,
};
