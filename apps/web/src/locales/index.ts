import tr from './tr.json';
import ar from './ar.json';
import en from './en.json';

export type Locale = 'tr' | 'ar' | 'en';

export const dictionaries = {
  tr,
  ar,
  en,
} as const;

export type TranslationKey = string;

export { tr, ar, en };
