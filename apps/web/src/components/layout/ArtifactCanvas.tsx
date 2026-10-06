import React, { useRef } from 'react';
import { Tag } from 'antd';
import { MarkdownDocumentViewer } from '../canvas/MarkdownDocumentViewer';
import { TextSelectionPopover } from '../canvas/TextSelectionPopover';

const { CheckableTag } = Tag;

interface ArtifactCanvasProps {
  onAskTutor: (query: string) => void;
  activeConceptId?: string | undefined;
  onActiveConceptChange?: (conceptId: string) => void;
}

const CONCEPTS_NAV = [
  { id: 'concept-1', label: '1. Bağ Dengesi', slide: 2 },
  { id: 'concept-2', label: '2. Kovalan Bağ', slide: 9 },
  { id: 'concept-3', label: '3. İyonik & Mesafe', slide: 13 },
  { id: 'concept-4', label: '4. H-Bağı', slide: 15 },
  { id: 'concept-6', label: '6. Dipol Kuvvetleri', slide: 20 },
  { id: 'concept-7', label: '7. Yük Transferi', slide: 22 },
  { id: 'concept-8', label: '8. VdW & Entropi', slide: 25 },
  { id: 'concept-9', label: '9. Şelasyon', slide: 30 },
  { id: 'concept-10', label: '10. Dibukain Entegrasyonu', slide: 33 },
];

export const ArtifactCanvas: React.FC<ArtifactCanvasProps> = ({
  onAskTutor,
  activeConceptId,
  onActiveConceptChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex-1 h-full overflow-y-auto bg-[#F8FAFC] dark:bg-[#0B0F17] p-4 sm:p-8"
    >
      {/* Floating Text Selection Action for Instant Socratic Tutor */}
      <TextSelectionPopover
        containerRef={containerRef}
        onAskTutor={(selectedText) => {
          onAskTutor(`Bu bölümü açıklar mısın: "${selectedText}"`);
        }}
      />

      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Minimalist Concept Quick Navigation Bar */}
        <div className="flex flex-wrap items-center gap-1.5 py-2 px-3 bg-white dark:bg-[#131B2A] rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
          <span className="text-[11px] font-medium text-gray-500 mr-1 shrink-0">Bölümler:</span>
          {CONCEPTS_NAV.map((c) => {
            const isSelected = activeConceptId === c.id;
            return (
              <CheckableTag
                key={c.id}
                checked={isSelected}
                onChange={() => {
                  scrollToSection(c.id);
                  onActiveConceptChange?.(c.id);
                }}
                className="text-[11px] font-medium transition-all cursor-pointer m-0.5"
              >
                {c.label} <span className="opacity-60 text-[10px] ml-0.5">(S{c.slide})</span>
              </CheckableTag>
            );
          })}
        </div>

        {/* Clean, Spacious Interactive Document Surface */}
        <article className="bg-white dark:bg-[#131B2A] rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm">
          <MarkdownDocumentViewer
            onAskTutor={onAskTutor}
            activeConceptId={activeConceptId}
          />
        </article>
      </div>
    </div>
  );
};
