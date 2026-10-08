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
      className={`border border-slate-200 dark:border-[#2F2F2F] rounded-xl bg-slate-50/70 dark:bg-[#1E1E1E] p-3 text-xs font-sans select-none text-slate-800 dark:text-[#ECECEC] shadow-2xs ${className || ''}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 rounded-md text-[11px] font-semibold">
            {t.badge}
          </span>
          <span className="text-[11px] text-slate-500 dark:text-neutral-400">
            {t.subtitle}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          className="flex items-center gap-1 font-semibold text-slate-600 dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
        >
          <Info className="w-3.5 h-3.5" />
          <span>{isExpanded ? t.hideEq : t.viewEq}</span>
          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-[#2F2F2F] space-y-2 text-[11px]">
          <div>
            <span className="font-semibold text-slate-700 dark:text-neutral-300">{t.governingEq}</span>
            <code className="bg-slate-100 dark:bg-[#252525] px-1.5 py-0.5 font-mono text-emerald-700 dark:text-emerald-400 border border-slate-200 dark:border-[#333333] rounded" dir="ltr">
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
