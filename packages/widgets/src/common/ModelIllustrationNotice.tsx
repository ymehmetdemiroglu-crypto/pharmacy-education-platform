import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import { StickerBadge } from '@pharmacy/ui';

export interface ModelIllustrationNoticeProps {
  equation: string;
  sourceReference: string;
  assumptions?: string[];
  locale?: 'tr' | 'ar' | 'en';
  className?: string;
}

export const ModelIllustrationNotice: React.FC<ModelIllustrationNoticeProps> = ({
  equation,
  sourceReference,
  assumptions,
  locale = 'tr',
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const t = {
    tr: {
      badge: 'Model İllüstrasyonu',
      subtitle: 'Eğitim amaçlı basitleştirilmiş biyo-fizikokimyasal simülasyon modeli',
      viewEq: 'Denklemi Görüntüle',
      hideEq: 'Denklemi Gizle',
      governingEq: 'Yönetici Denklem: ',
      source: 'Akademik Kaynak: ',
      assumptions: 'Model Varsayımları: ',
    },
    ar: {
      badge: 'نموذج محاكاة توضيحي',
      subtitle: 'نموذج محاكاة فيزيائية حيوية مبسط لأغراض تعليمية',
      viewEq: 'عرض المعادلة الرياضية',
      hideEq: 'إخفاء المعادلة',
      governingEq: 'المعادلة الحاكمة: ',
      source: 'المرجع الأكاديمي: ',
      assumptions: 'افتراضات النموذج: ',
    },
    en: {
      badge: 'Model Illustration',
      subtitle: 'Simplified educational biophysical simulation model',
      viewEq: 'View Equation',
      hideEq: 'Hide Equation',
      governingEq: 'Governing Equation: ',
      source: 'Academic Source: ',
      assumptions: 'Model Assumptions: ',
    },
  }[locale || 'en'] || {
    badge: 'Model Illustration',
    subtitle: 'Simplified educational biophysical simulation model',
    viewEq: 'View Equation',
    hideEq: 'Hide Equation',
    governingEq: 'Governing Equation: ',
    source: 'Academic Source: ',
    assumptions: 'Model Assumptions: ',
  };

  return (
    <div
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      aria-label={t.badge}
      className={`border-2 border-black dark:border-slate-700 bg-[#FFFDF7] dark:bg-[#131B2A] p-2 text-xs font-mono select-none text-black dark:text-slate-100 ${className || ''}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <StickerBadge variant="yellow" size="sm">
            {t.badge}
          </StickerBadge>
          <span className="text-[11px] text-gray-700 dark:text-slate-300">
            {t.subtitle}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          className="flex items-center gap-1 font-bold underline hover:text-amber-500 cursor-pointer"
        >
          <Info className="w-3.5 h-3.5" />
          <span>{isExpanded ? t.hideEq : t.viewEq}</span>
          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-2 pt-2 border-t border-black/20 dark:border-slate-700 space-y-1.5 text-[11px]">
          <div>
            <span className="font-bold text-gray-700 dark:text-slate-300">{t.governingEq}</span>
            <code className="bg-black/5 dark:bg-[#1E293B] px-1 py-0.5 font-mono text-black dark:text-amber-300 border border-black/20 dark:border-slate-700" dir="ltr">
              {equation}
            </code>
          </div>
          <div>
            <span className="font-bold text-gray-700 dark:text-slate-300">{t.source}</span>
            <span className="italic text-gray-700 dark:text-slate-300">
              {sourceReference?.replace(/Farmasötik ve Medisinal Kimya/g, 'Farmasötik Kimya').replace(/Medisinal Kimya/g, 'Farmasötik Kimya')}
            </span>
          </div>
          {assumptions && assumptions.length > 0 && (
            <div>
              <span className="font-bold text-gray-700 dark:text-slate-300">{t.assumptions}</span>
              <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-gray-600 dark:text-slate-400">
                {assumptions.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
