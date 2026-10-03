/**
 * scripts/build-22-lessons.mjs
 * 
 * Script that defines and generates all 22 permanently free lessons across:
 * - Farmasötik Kimya (Course A, 5 modules x 2 lessons = 10 lessons)
 * - Farmakoloji (Course B, 6 modules x 2 lessons = 12 lessons)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

export const wordCount = (text) => {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
};

export function makeStep(id, stage, stageIndex, title, prompt, predictThenReveal, extra = {}) {
  const trWords = wordCount(prompt.tr);
  const arWords = wordCount(prompt.ar);
  if (trWords > 40) {
    throw new Error(`Step ${id} (${stage}) prompt.tr exceeds 40 words (${trWords}): "${prompt.tr}"`);
  }
  if (arWords > 40) {
    throw new Error(`Step ${id} (${stage}) prompt.ar exceeds 40 words (${arWords}): "${prompt.ar}"`);
  }

  const step = {
    id,
    stage,
    stageIndex,
    title,
    prompt,
    predictThenReveal,
    config: extra.config || {},
    technicalTerms: (extra.technicalTerms && extra.technicalTerms.length > 0)
      ? extra.technicalTerms
      : [
          { term: 'etki mekanizması', arContext: 'آلية التأثير الدوائي' },
          { term: 'reseptör', arContext: 'المستقبِل الحيوي' }
        ],
    hints: extra.hints || [
      {
        tr: 'Birinci seviye ipucu: Temel kavramı göz önünde bulundurun.',
        ar: 'تلميح المستوى الأول: انظر في المفهوم الجوهري.',
        en: 'Tier 1 Hint: Consider the foundational concept.'
      },
      {
        tr: 'İkinci seviye ipucu: Moleküler etkileşim mekanizmasını hatırlayın.',
        ar: 'تلميح المستوى الثاني: تذكر آلية التفاعل الجزيئي.',
        en: 'Tier 2 Hint: Recall the molecular interaction mechanism.'
      },
      {
        tr: 'Üçüncü seviye ipucu: İlgili farmakolojik kuralı doğrudan uygulayın.',
        ar: 'تلميح المستوى الثالث: طبق القاعدة الدوائية المعنية مباشرة.',
        en: 'Tier 3 Hint: Directly apply the relevant pharmacological rule.'
      }
    ]
  };

  if (extra.widget) {
    step.widgetType = extra.widget.type;
    step.widget = extra.widget;
  }
  if (extra.conceptCheck) {
    step.conceptCheck = extra.conceptCheck;
  }
  if (extra.numericClaims) {
    step.numericClaims = extra.numericClaims;
  }

  return step;
}

console.log('Builder module ready.');
