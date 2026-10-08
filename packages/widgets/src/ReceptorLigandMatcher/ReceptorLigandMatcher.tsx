import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Card, Button, StickerBadge } from '@pharmacy/ui';
import { CheckCircle2, AlertCircle, Link as LinkIcon, RefreshCw } from 'lucide-react';
import { BaseWidgetProps } from '../types';
import { ReceptorLigandMatcherConfig } from './schema';

export type ReceptorLigandMatcherProps = BaseWidgetProps<
  ReceptorLigandMatcherConfig,
  Record<string, string>
>;

export const ReceptorLigandMatcher: React.FC<ReceptorLigandMatcherProps> = ({
  config,
  locale = 'en',
  onAttempt,
  onCorrect,
  onIncorrect,
  disabled = false,
  className,
}) => {
  const dict = {
    tr: {
      badge: 'Reseptör-Ligand Eşleştirici',
      source: 'Kaynak: ',
      page: 's. ',
      ligandHeader: (drug: string) => `Ligand Fonksiyonel Grupları (${drug})`,
      receptorHeader: (receptor: string) => `Bağlanma Cebi Rezidüleri (${receptor})`,
      pairedTo: 'Eşleşti: ',
      clickToSelect: '(Seçmek için tıkla)',
      linked: 'Bağlandı',
      reset: 'Eşleşmeleri Sıfırla',
      verify: 'Cep Eşleşmelerini Doğrula',
      allCorrect: 'Tüm Cep Etkileşimleri Doğrulandı!',
      mismatch: 'Uyumsuz Rezidüler Tespit Edildi',
      incorrectFeedback: 'Bir veya birden fazla ilaç fonksiyonel grubu yanlış reseptör rezidüsüyle eşleştirildi',
    },
    ar: {
      badge: 'مطابق المستقبل والمرتبط',
      source: 'المصدر: ',
      page: 'ص. ',
      ligandHeader: (drug: string) => `مجموعات المرتبط الوظيفية (${drug})`,
      receptorHeader: (receptor: string) => `ثمالات جيب الارتباط (${receptor})`,
      pairedTo: 'مقترن بـ: ',
      clickToSelect: '(انقر للاختيار)',
      linked: 'مرتبط',
      reset: 'إعادة ضبط الأزواج',
      verify: 'التحقق من تطابق الجيب',
      allCorrect: 'تم التحقق من جميع تفاعلات الجيب بنجاح!',
      mismatch: 'تم رصد ثمالات غير متطابقة',
      incorrectFeedback: 'تم ربط واحدة أو أكثر من المجموعات الوظيفية للدواء بثمالات غير صحيحة في المستقبل',
    },
    en: {
      badge: 'Receptor-Ligand Matcher',
      source: 'Source: ',
      page: 'p. ',
      ligandHeader: (drug: string) => `Ligand Functional Groups (${drug})`,
      receptorHeader: (receptor: string) => `Binding Pocket Residues (${receptor})`,
      pairedTo: 'Paired to: ',
      clickToSelect: '(Click to select)',
      linked: 'Linked',
      reset: 'Reset Pairs',
      verify: 'Verify Pocket Matches',
      allCorrect: 'All Pocket Interactions Verified!',
      mismatch: 'Mismatched Residues Detected',
      incorrectFeedback: 'One or more drug functional groups are paired with the wrong receptor residues',
    },
  }[locale || 'en'] || {
    badge: 'Receptor-Ligand Matcher',
    source: 'Source: ',
    page: 'p. ',
    ligandHeader: (drug: string) => `Ligand Functional Groups (${drug})`,
    receptorHeader: (receptor: string) => `Binding Pocket Residues (${receptor})`,
    pairedTo: 'Paired to: ',
    clickToSelect: '(Click to select)',
    linked: 'Linked',
    reset: 'Reset Pairs',
    verify: 'Verify Pocket Matches',
    allCorrect: 'All Pocket Interactions Verified!',
    mismatch: 'Mismatched Residues Detected',
    incorrectFeedback: 'One or more drug functional groups are paired with the wrong receptor residues',
  };

  const [selectedPairId, setSelectedPairId] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({}); // pairId -> residueId
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectPair = (pairId: string) => {
    if (disabled || isSubmitted) return;
    setSelectedPairId(pairId);
  };

  const handleSelectResidue = (residueId: string) => {
    if (disabled || isSubmitted || !selectedPairId) return;
    setMatches((prev) => ({
      ...prev,
      [selectedPairId]: residueId,
    }));
    setSelectedPairId(null);
  };

  const handleReset = () => {
    if (disabled) return;
    setMatches({});
    setSelectedPairId(null);
    setIsSubmitted(false);
  };

  const handleSubmit = () => {
    if (disabled || isSubmitted) return;
    setIsSubmitted(true);
    if (onAttempt) onAttempt(matches);

    const isAllCorrect = config.pairs.every(
      (p) => matches[p.id] === p.correctResidueId
    );

    if (isAllCorrect) {
      if (onCorrect) onCorrect();
    } else {
      if (onIncorrect) onIncorrect(dict.incorrectFeedback);
    }
  };

  const isComplete = config.pairs.every((p) => matches[p.id]);
  const isAllCorrect = isSubmitted && config.pairs.every((p) => matches[p.id] === p.correctResidueId);

  return (
    <Card
      variant="default"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={clsx('w-full flex flex-col gap-4', className)}
    >
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <StickerBadge variant="blue" size="sm">
            {dict.badge}
          </StickerBadge>
          <span className="text-[11px] font-mono text-gray-600 dark:text-gray-400">
            {dict.source}{config.source.file} ({dict.page}{config.source.page})
          </span>
        </div>
        <h3 className="font-display font-bold text-base sm:text-lg">
          {config.title}: {config.drugName} to {config.receptorName}
        </h3>
        <p className="text-xs font-body text-gray-700 dark:text-gray-300">
          {config.prompt} (Select a drug group from the ligand list, then click its complementary receptor residue in the binding pocket list).
        </p>
      </div>

      {/* Two-Column Matching Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Left Column: Drug Functional Groups */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-black dark:text-slate-100">
            {dict.ligandHeader(config.drugName)}
          </span>
          <div className="space-y-2">
            {config.pairs.map((pair) => {
              const matchedResidueId = matches[pair.id];
              const matchedResidue = config.residues.find((r) => r.id === matchedResidueId);
              const isSelected = selectedPairId === pair.id;
              const isCorrect = isSubmitted && matchedResidueId === pair.correctResidueId;

              return (
                <div
                  key={pair.id}
                  onClick={() => handleSelectPair(pair.id)}
                  className={clsx(
                    'p-3 border rounded-xl cursor-pointer transition-all flex flex-col gap-1',
                    isSelected && 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-200 shadow-xs',
                    !isSelected && 'bg-white dark:bg-[#1E1E1E] border-slate-200 dark:border-[#2F2F2F] hover:border-slate-300 dark:hover:border-[#383838] text-slate-900 dark:text-[#ECECEC]',
                    isSubmitted && isCorrect && 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200',
                    isSubmitted && !isCorrect && 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <strong className="text-xs font-mono">{pair.drugGroup}</strong>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-neutral-400">[{pair.energyKcalMol}]</span>
                  </div>
                  <div className="text-[11px] font-mono flex items-center gap-1 text-slate-500 dark:text-neutral-400">
                    <LinkIcon className="w-3 h-3 text-slate-400" />
                    <span>
                      {dict.pairedTo}{' '}
                      <strong className="text-slate-800 dark:text-neutral-200">{matchedResidue ? matchedResidue.residueName : dict.clickToSelect}</strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Receptor Residues */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-neutral-300">
            {dict.receptorHeader(config.receptorName)}
          </span>
          <div className="space-y-2">
            {config.residues.map((res) => {
              const isUsed = Object.values(matches).includes(res.id);

              return (
                <button
                  key={res.id}
                  type="button"
                  disabled={disabled || isSubmitted || !selectedPairId}
                  onClick={() => handleSelectResidue(res.id)}
                  className={clsx(
                    'w-full p-3 border rounded-xl text-start transition-all flex items-center justify-between',
                    selectedPairId && 'hover:border-emerald-500 hover:bg-slate-50 dark:hover:bg-[#252525] cursor-pointer shadow-xs',
                    isUsed ? 'bg-slate-100 dark:bg-[#252525] border-slate-200 dark:border-[#333333] text-slate-500 dark:text-neutral-400' : 'bg-white dark:bg-[#1E1E1E] border-slate-200 dark:border-[#2F2F2F] text-slate-900 dark:text-[#ECECEC]',
                    (!selectedPairId || isSubmitted) && 'cursor-default'
                  )}
                >
                  <div>
                    <strong className="text-xs font-mono">{res.residueName}</strong>
                    <p className="text-[10px] text-slate-500 dark:text-neutral-400">{res.description}</p>
                  </div>
                  {isUsed && (
                    <span className="text-[10px] font-mono font-semibold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-lg border border-emerald-300 dark:border-emerald-800">
                      {dict.linked}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Control Actions */}
      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" size="sm" onClick={handleReset} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
          {dict.reset}
        </Button>
        {!isSubmitted ? (
          <Button variant="primary" disabled={!isComplete || disabled} onClick={handleSubmit}>
            {dict.verify}
          </Button>
        ) : null}
      </div>

      {/* Feedback Summary */}
      {isSubmitted && (
        <div className="pt-4 border-t border-slate-200 dark:border-[#2F2F2F] space-y-3">
          <div className="flex items-center gap-2">
            {isAllCorrect ? (
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-display font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                <span>{dict.allCorrect}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-display font-bold text-sm">
                <AlertCircle className="w-5 h-5 stroke-[2.5]" />
                <span>{dict.mismatch}</span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            {config.pairs.map((p) => (
              <div key={p.id} className="p-3 bg-slate-50 dark:bg-[#252525] border border-slate-200 dark:border-[#333333] rounded-xl text-xs font-body text-slate-700 dark:text-neutral-300">
                <strong className="text-slate-900 dark:text-[#ECECEC]">{p.drugGroup} ↔ {p.correctResidueId}: </strong>
                {p.explanation}
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
