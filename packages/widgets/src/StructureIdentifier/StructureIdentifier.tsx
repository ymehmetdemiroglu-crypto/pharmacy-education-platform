import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Card, Button, StickerBadge } from '@pharmacy/ui';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { BaseWidgetProps } from '../types';
import { StructureIdentifierConfig } from './schema';

export type StructureIdentifierProps = BaseWidgetProps<StructureIdentifierConfig, string>;

const STRINGS = {
  en: {
    badge: 'Structure Identifier',
    source: 'Source',
    pageAbbr: 'p.',
    target: 'Target',
    molecule: 'Molecule',
    smiles: 'SMILES',
    selected: 'Selected',
    node: 'Node',
    promptClick: 'Click an atom above to select',
    confirm: 'Confirm Atom Selection',
    correctTitle: 'Target Identified Correctly!',
    incorrectTitle: 'Incorrect Atom Selected',
    misconception: 'Misconception Note:',
    incorrectFallback: (label: string) => `Selected ${label} is not the target pharmacophore`,
    atomAria: (label: string) => `Atom ${label}`,
    svgAria: (name: string) => `Chemical structure of ${name}`,
  },
  tr: {
    badge: 'Yapı Tanımlayıcı',
    source: 'Kaynak',
    pageAbbr: 's.',
    target: 'Hedef',
    molecule: 'Molekül',
    smiles: 'SMILES',
    selected: 'Seçilen',
    node: 'Düğüm',
    promptClick: 'Seçmek için yukarıdaki bir atoma tıklayın',
    confirm: 'Atom Seçimini Onayla',
    correctTitle: 'Hedef Başarıyla Belirlendi!',
    incorrectTitle: 'Yanlış Atom Seçildi',
    misconception: 'Kavram Yanılgısı Notu:',
    incorrectFallback: (label: string) => `Seçilen ${label} hedef farmakofor değildir`,
    atomAria: (label: string) => `Atom ${label}`,
    svgAria: (name: string) => `${name} kimyasal yapısı`,
  },
  ar: {
    badge: 'محدد البنية الكيميائية',
    source: 'المصدر',
    pageAbbr: 'ص.',
    target: 'الهدف',
    molecule: 'الجزيء',
    smiles: 'SMILES',
    selected: 'المحدد',
    node: 'العقدة',
    promptClick: 'انقر على ذرة أعلاه لتحديدها',
    confirm: 'تأكيد اختيار الذرة',
    correctTitle: 'تم تحديد الهدف بنجاح!',
    incorrectTitle: 'تم اختيار ذرة غير صحيحة',
    misconception: 'ملاحظة حول الفهم الخاطئ:',
    incorrectFallback: (label: string) => `الذرة المحددة ${label} ليست المجموعة الفارماكوفورية المستهدفة`,
    atomAria: (label: string) => `ذرة ${label}`,
    svgAria: (name: string) => `البنية الكيميائية لمركب ${name}`,
  },
};

export const StructureIdentifier: React.FC<StructureIdentifierProps> = ({
  config,
  locale = 'en',
  onAttempt,
  onCorrect,
  onIncorrect,
  disabled = false,
  className,
}) => {
  const t = STRINGS[locale] ?? STRINGS.en;
  const isRtl = locale === 'ar';
  const [selectedAtomId, setSelectedAtomId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedAtom = config.atoms.find((a) => a.id === selectedAtomId);

  const handleSelectAtom = (atomId: string) => {
    if (isSubmitted || disabled) return;
    setSelectedAtomId(atomId);
  };

  const handleSubmit = () => {
    if (!selectedAtom || isSubmitted) return;
    setIsSubmitted(true);
    if (onAttempt) onAttempt(selectedAtom.id);

    if (selectedAtom.isTarget) {
      if (onCorrect) onCorrect();
    } else {
      if (onIncorrect) onIncorrect(t.incorrectFallback(selectedAtom.label));
    }
  };

  const getAtomCoordinates = (id: string) => {
    const atom = config.atoms.find((a) => a.id === id);
    return atom ? { x: atom.x, y: atom.y } : { x: 0, y: 0 };
  };

  return (
    <Card
      variant="default"
      dir={isRtl ? 'rtl' : 'ltr'}
      className={clsx('w-full flex flex-col gap-4 text-start', className)}
    >
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <StickerBadge variant="blue" size="sm">
            {t.badge}
          </StickerBadge>
          <span className="text-[11px] font-mono text-gray-600 dark:text-gray-400">
            {t.source}: {config.source.file} ({t.pageAbbr} {config.source.page})
          </span>
        </div>
        {config.title && (
          <h3 className="font-display font-black text-base sm:text-lg uppercase">
            {config.title}
          </h3>
        )}
        <p className="font-body text-xs sm:text-sm text-gray-800 dark:text-gray-200">
          {config.prompt}
        </p>
        <p className="text-xs font-mono text-gray-600 dark:text-gray-400">
          {t.target}: <strong>{config.targetDescription}</strong>
        </p>
      </div>

      {/* Chemical Metadata Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-xl text-xs font-mono text-slate-800 dark:text-neutral-200 shadow-2xs">
        <span>{t.molecule}: <strong className="text-slate-900 dark:text-[#ECECEC]">{config.moleculeName}</strong></span>
        <span className="truncate max-w-xs" title={config.smiles}>
          {t.smiles}: <code className="bg-white dark:bg-[#252525] px-1.5 py-0.5 rounded border border-slate-200 dark:border-[#333333] text-slate-700 dark:text-neutral-300" dir="ltr">{config.smiles}</code>
        </span>
      </div>

      {/* Interactive Molecule SVG Canvas */}
      <div className="w-full bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl shadow-xs p-6 flex items-center justify-center relative overflow-hidden" dir="ltr">
        <svg
          viewBox="0 0 400 240"
          className="w-full max-w-md h-auto select-none"
          role="img"
          aria-label={t.svgAria(config.moleculeName)}
        >
          {/* Render Chemical Bonds */}
          {config.bonds.map((bond, idx) => {
            const start = getAtomCoordinates(bond.from);
            const end = getAtomCoordinates(bond.to);
            const isDouble = bond.order === 'double';

            return (
              <g key={`bond-${idx}`}>
                <line
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke="#94A3B8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {isDouble && (
                  <line
                    x1={start.x + 3}
                    y1={start.y + 3}
                    x2={end.x + 3}
                    y2={end.y + 3}
                    stroke="#94A3B8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                )}
              </g>
            );
          })}

          {/* Render Clickable Atom Nodes */}
          {config.atoms.map((atom) => {
            const isSelected = selectedAtomId === atom.id;
            const isTarget = atom.isTarget;

            let fill = '#FFFFFF';
            let stroke = '#CBD5E1';
            let textColor = '#0F172A';

            if (isSelected && !isSubmitted) {
              fill = '#10A37F';
              stroke = '#10A37F';
              textColor = '#FFFFFF';
            } else if (isSubmitted) {
              if (isTarget) {
                fill = '#10A37F';
                stroke = '#059669';
                textColor = '#FFFFFF';
              } else if (isSelected && !isTarget) {
                fill = '#F43F5E';
                stroke = '#E11D48';
                textColor = '#FFFFFF';
              }
            }

            return (
              <g
                key={atom.id}
                tabIndex={disabled || isSubmitted ? -1 : 0}
                role="button"
                aria-pressed={isSelected}
                aria-label={t.atomAria(atom.label)}
                onClick={() => handleSelectAtom(atom.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectAtom(atom.id);
                  }
                }}
                className={clsx(
                  'cursor-pointer transition-transform duration-100 focus:outline-none',
                  !isSubmitted && !disabled && 'hover:scale-115'
                )}
              >
                {/* Node Squircle */}
                <rect
                  x={atom.x - 14}
                  y={atom.y - 14}
                  width="28"
                  height="28"
                  rx="6"
                  ry="6"
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="1.5"
                  className="shadow-xs transition-colors"
                />
                {/* Atom Label */}
                <text
                  x={atom.x}
                  y={atom.y + 4}
                  textAnchor="middle"
                  fill={textColor}
                  fontSize="12"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="600"
                >
                  {atom.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Controls & Feedback */}
      {!isSubmitted ? (
        <div className="flex items-center justify-between gap-3 pt-2">
          <span className="text-xs font-mono text-slate-600 dark:text-neutral-400">
            {selectedAtom ? `${t.selected}: ${selectedAtom.label} (${t.node} ${selectedAtom.id})` : t.promptClick}
          </span>
          <Button
            variant="primary"
            disabled={!selectedAtomId || disabled}
            onClick={handleSubmit}
          >
            {t.confirm}
          </Button>
        </div>
      ) : (
        <div className="pt-4 border-t border-slate-200 dark:border-[#2F2F2F] space-y-3">
          <div className="flex items-center gap-2">
            {selectedAtom?.isTarget ? (
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-display font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                <span>{t.correctTitle}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-display font-bold text-sm">
                <AlertCircle className="w-5 h-5 stroke-[2.5]" />
                <span>{t.incorrectTitle}</span>
              </div>
            )}
          </div>
          {selectedAtom && !selectedAtom.isTarget && selectedAtom.distractorRationale && (
            <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 rounded-xl text-xs font-body leading-relaxed text-rose-900 dark:text-rose-200">
              <span className="font-bold font-mono text-rose-700 dark:text-rose-400 uppercase block mb-1">{t.misconception}</span>
              {selectedAtom.distractorRationale}
            </div>
          )}
          <div className="p-3.5 bg-slate-50 dark:bg-[#252525] border border-slate-200 dark:border-[#333333] rounded-xl text-xs font-body leading-relaxed text-slate-800 dark:text-neutral-200 shadow-xs">
            {config.explanation}
          </div>
        </div>
      )}
    </Card>
  );
};
