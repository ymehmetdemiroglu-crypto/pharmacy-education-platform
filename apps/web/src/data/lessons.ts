import type { LessonData } from '@pharmacy/platform';
import { clientLesson01 } from './lesson01.client';
import { allClientLessons } from './curriculum.client';

export const lesson01: LessonData = clientLesson01;

export const lessonsMap: Record<string, LessonData> = {
  ...allClientLessons,
  '1': lesson01,
  'mc-mod1-les1': lesson01,
};
