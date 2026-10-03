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
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-[#FFF8E7] dark:bg-[#1E293B] border-2 border-black dark:border-slate-700 text-xs font-mono">
        <span>{t.molecule}: <strong>{config.moleculeName}</strong></span>
        <span className="truncate max-w-xs" title={config.smiles}>
          {t.smiles}: <code className="bg-white dark:bg-[#0B0F17] px-1 border border-black/20 dark:border-slate-700" dir="ltr">{config.smiles}</code>
        </span>
      </div>

      {/* Interactive Molecule SVG Canvas */}
      <div className="w-full bg-white dark:bg-[#131B2A] border-3 border-black dark:border-slate-700 shadow-neo dark:shadow-neo-dark p-4 flex items-center justify-center relative overflow-hidden" dir="ltr">
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
                  stroke="#000000"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="dark:stroke-slate-300"
                />
                {isDouble && (
                  <line
                    x1={start.x + 3}
                    y1={start.y + 3}
                    x2={end.x + 3}
                    y2={end.y + 3}
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="dark:stroke-slate-300"
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
            const stroke = '#000000';
            if (isSelected && !isSubmitted) {
              fill = '#FFD93D';
            } else if (isSubmitted) {
              if (isTarget) {
                fill = '#6BCB77';
              } else if (isSelected && !isTarget) {
                fill = '#FF6B9D';
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
                  !isSubmitted && !disabled && 'hover:scale-125'
                )}
              >
                {/* Node Box / Circle */}
                <rect
                  x={atom.x - 14}
                  y={atom.y - 14}
                  width="28"
                  height="28"
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="3"
                  className="shadow-sm"
                />
                {/* Atom Label */}
                <text
                  x={atom.x}
                  y={atom.y + 4}
                  textAnchor="middle"
                  fill="#000000"
                  fontSize="12"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="bold"
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
          <span className="text-xs font-mono text-gray-700 dark:text-gray-300">
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
        <div className="pt-3 border-t-3 border-black dark:border-slate-700 space-y-2">
          <div className="flex items-center gap-2">
            {selectedAtom?.isTarget ? (
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-display font-black text-sm uppercase">
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                <span>{t.correctTitle}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-display font-black text-sm uppercase">
                <AlertCircle className="w-5 h-5 stroke-[2.5]" />
                <span>{t.incorrectTitle}</span>
              </div>
            )}
          </div>
          {selectedAtom && !selectedAtom.isTarget && selectedAtom.distractorRationale && (
            <div className="p-3 bg-[#FFF0F5] dark:bg-[#2D1B22] border-2 border-[#FF6B9D] text-xs font-body leading-relaxed text-black dark:text-rose-200">
              <span className="font-bold font-mono text-[#D92662] dark:text-[#FF85B2] uppercase block mb-1">{t.misconception}</span>
              {selectedAtom.distractorRationale}
            </div>
          )}
          <div className="p-3 bg-[#FFFDF7] dark:bg-[#1E293B] border-2 border-black dark:border-slate-700 text-xs font-body leading-relaxed text-black dark:text-slate-100 shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#030712]">
            {config.explanation}
          </div>
        </div>
      )}
    </Card>
  );
};
