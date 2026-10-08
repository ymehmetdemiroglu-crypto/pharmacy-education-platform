import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Card, Button, StickerBadge } from '@pharmacy/ui';
import { CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react';
import { BaseWidgetProps } from '../types';
import { MetabolismMapConfig, MetabolicSite } from './schema';

export type MetabolismMapProps = BaseWidgetProps<MetabolismMapConfig, string>;

const STRINGS = {
  en: {
    badge: 'Metabolism & Biotransformation Map',
    source: 'Source',
    pageAbbr: 'p.',
    title: (drug: string) => `${drug} Biotransformation Pathways`,
    core: (drug: string) => `${drug} Core`,
    svgAria: (drug: string) => `Metabolic transformation map for ${drug}`,
    siteAria: (label: string, enzyme: string) => `Metabolic Site: ${label} via ${enzyme}`,
    selectedPathway: 'Selected Pathway:',
    bioactivation: 'Bioactivation / Toxic',
    outcome: 'Outcome:',
    confirmPrompt: 'Click confirm to verify toxic risk pathway',
    selectPrompt: 'Select a metabolic site on the diagram',
    confirmBtn: 'Confirm Target Site',
    correctTitle: 'Correct Metabolic Vulnerability Identified!',
    incorrectTitle: 'Incorrect Pathway Selected',
    incorrectFeedback: (enzyme: string) => `Selected site is mediated by ${enzyme}, not the target toxic pathway`,
  },
  tr: {
    badge: 'Metabolizma ve Biyotansformasyon Haritası',
    source: 'Kaynak',
    pageAbbr: 's.',
    title: (drug: string) => `${drug} Biyotansformasyon Yolakları`,
    core: (drug: string) => `${drug} Çekirdeği`,
    svgAria: (drug: string) => `${drug} için metabolik dönüşüm haritası`,
    siteAria: (label: string, enzyme: string) => `Metabolik Bölge: ${enzyme} aracılığıyla ${label}`,
    selectedPathway: 'Seçilen Yolak:',
    bioactivation: 'Biyoaktivasyon / Toksik',
    outcome: 'Sonuç:',
    confirmPrompt: 'Toksik risk yolağını doğrulamak için onayla butonuna tıklayın',
    selectPrompt: 'Diyagramdan bir metabolik bölge seçin',
    confirmBtn: 'Hedef Bölgeyi Onayla',
    correctTitle: 'Doğru Metabolik Duyarlılık Tespit Edildi!',
    incorrectTitle: 'Yanlış Yolak Seçildi',
    incorrectFeedback: (enzyme: string) => `Seçilen bölge ${enzyme} aracılıdır, hedef toksik yolak değildir`,
  },
  ar: {
    badge: 'خريطة الاستقلاب والتحول الحيوي',
    source: 'المصدر',
    pageAbbr: 'ص.',
    title: (drug: string) => `مسارات التحول الحيوي لـ ${drug}`,
    core: (drug: string) => `هيكل ${drug}`,
    svgAria: (drug: string) => `خريطة التحول الحيوي لـ ${drug}`,
    siteAria: (label: string, enzyme: string) => `موقع الاستقلاب: ${label} عبر ${enzyme}`,
    selectedPathway: 'المسار المحدد:',
    bioactivation: 'تنشيط حيوي / سام',
    outcome: 'النتيجة:',
    confirmPrompt: 'انقر فوق تأكيد للتحقق من مسار الخطر السمي',
    selectPrompt: 'حدد موقعاً استقلابياً من المخطط',
    confirmBtn: 'تأكيد الموقع المستهدف',
    correctTitle: 'تم تحديد نقطة الضعف الاستقلابية الصحيحة بنجاح!',
    incorrectTitle: 'تم اختيار مسار غير صحيح',
    incorrectFeedback: (enzyme: string) => `الموقع المحدد يتم بوساطة ${enzyme}، وليس المسار السمي المستهدف`,
  },
};

export const MetabolismMap: React.FC<MetabolismMapProps> = ({
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
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedSite: MetabolicSite | undefined = config.sites.find(
    (s) => s.id === selectedSiteId
  );

  const handleSelectSite = (siteId: string) => {
    if (disabled || isSubmitted) return;
    setSelectedSiteId(siteId);
  };

  const handleSubmit = () => {
    if (!selectedSite || isSubmitted || disabled) return;
    setIsSubmitted(true);
    if (onAttempt) onAttempt(selectedSite.id);

    if (selectedSite.isTargetSite) {
      if (onCorrect) onCorrect();
    } else {
      if (onIncorrect) onIncorrect(t.incorrectFeedback(selectedSite.enzyme));
    }
  };

  return (
    <Card
      variant="default"
      dir={isRtl ? 'rtl' : 'ltr'}
      className={clsx('w-full flex flex-col gap-4 text-start', className)}
    >
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <StickerBadge variant="pink" size="sm">
            {t.badge}
          </StickerBadge>
          <span className="text-[11px] font-mono text-gray-600 dark:text-gray-400">
            {t.source}: {config.source.file} ({t.pageAbbr} {config.source.page})
          </span>
        </div>
        <h3 className="font-display font-bold text-base sm:text-lg">
          {t.title(config.drugName)}
        </h3>
        <p className="text-xs font-body text-gray-700 dark:text-gray-300">
          {config.prompt}
        </p>
      </div>

      {/* Interactive Molecule & Metabolic Sites Diagram */}
      <div className="w-full bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl shadow-xs p-4 flex flex-col items-center" dir="ltr">
        <svg
          viewBox="0 0 400 200"
          className="w-full max-w-md h-auto select-none"
          role="img"
          aria-label={t.svgAria(config.drugName)}
        >
          {/* Central Chemical Scaffold Placeholder */}
          <rect
            x="140"
            y="70"
            width="120"
            height="60"
            rx="12"
            fill="#F1F5F9"
            stroke="#CBD5E1"
            strokeWidth="1.5"
            className="dark:fill-[#252525] dark:stroke-[#383838]"
          />
          <text
            x="200"
            y="105"
            textAnchor="middle"
            fontSize="12"
            fontFamily="Space Grotesk, sans-serif"
            fontWeight="bold"
            fill="currentColor"
          >
            {t.core(config.drugName)}
          </text>

          {/* Connectors & Metabolic Hotspots */}
          {config.sites.map((site) => {
            const isSelected = selectedSiteId === site.id;
            const isCorrect = site.isTargetSite;

            let badgeFill = '#F8FAFC';
            let badgeStroke = '#CBD5E1';
            let textFill = '#0F172A';

            if (isSubmitted) {
              if (isCorrect) {
                badgeFill = '#10A37F';
                badgeStroke = '#059669';
                textFill = '#FFFFFF';
              } else if (isSelected) {
                badgeFill = '#F43F5E';
                badgeStroke = '#E11D48';
                textFill = '#FFFFFF';
              } else {
                badgeFill = '#94A3B8';
                badgeStroke = '#64748B';
                textFill = '#FFFFFF';
              }
            } else if (isSelected) {
              badgeFill = '#10A37F';
              badgeStroke = '#059669';
              textFill = '#FFFFFF';
            }

            return (
              <g
                key={site.id}
                role="button"
                tabIndex={disabled || isSubmitted ? -1 : 0}
                aria-pressed={isSelected}
                aria-label={t.siteAria(site.label, site.enzyme)}
                onClick={() => handleSelectSite(site.id)}
                className="cursor-pointer transition-transform duration-150 hover:scale-105 focus:outline-none"
              >
                {/* Connecting line */}
                <line
                  x1="200"
                  y1="100"
                  x2={site.x}
                  y2={site.y}
                  stroke="#94A3B8"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />

                {/* Hotspot Box */}
                <rect
                  x={site.x - 45}
                  y={site.y - 18}
                  width="90"
                  height="36"
                  rx="8"
                  ry="8"
                  fill={badgeFill}
                  stroke={badgeStroke}
                  strokeWidth="1.5"
                  className={isSelected ? 'filter drop-shadow-sm' : ''}
                />
                <text
                  x={site.x}
                  y={site.y - 3}
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                  fill={textFill}
                >
                  {site.label}
                </text>
                <text
                  x={site.x}
                  y={site.y + 11}
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="monospace"
                  fill={textFill}
                >
                  [{site.enzyme}]
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Site Detail Inspection */}
      {selectedSite && (
        <div className="p-4 bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-xl shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-900 dark:text-[#ECECEC]">
              {t.selectedPathway} {selectedSite.label} ({selectedSite.reactionType})
            </span>
            <div className="flex items-center gap-1.5">
              <StickerBadge
                variant={selectedSite.phase === 'Phase I' ? 'blue' : 'green'}
                size="sm"
              >
                {selectedSite.phase}
              </StickerBadge>
              {selectedSite.toxicityFlag === 'toxic' && (
                <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 rounded px-2 py-0.5 text-[10px] font-mono font-semibold">
                  <AlertTriangle className="w-3 h-3" /> {t.bioactivation}
                </span>
              )}
            </div>
          </div>
          <p className="text-xs font-sans text-slate-600 dark:text-neutral-300">
            <strong>{t.outcome} </strong> {selectedSite.metaboliteOutcome}
          </p>
        </div>
      )}

      {/* Submit / Outcome */}
      {!isSubmitted ? (
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-500 dark:text-neutral-400">
            {selectedSite ? t.confirmPrompt : t.selectPrompt}
          </span>
          <Button
            variant="primary"
            disabled={!selectedSiteId || disabled}
            onClick={handleSubmit}
          >
            {t.confirmBtn}
          </Button>
        </div>
      ) : (
        <div className="pt-3 border-t border-slate-200 dark:border-[#2F2F2F] space-y-2">
          <div className="flex items-center gap-2">
            {selectedSite?.isTargetSite ? (
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                <span>{t.correctTitle}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-sm">
                <AlertCircle className="w-5 h-5 stroke-[2.5]" />
                <span>{t.incorrectTitle}</span>
              </div>
            )}
          </div>
          <div className="p-4 bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-xl text-xs font-sans leading-relaxed text-slate-800 dark:text-[#ECECEC] shadow-xs">
            {config.explanation}
          </div>
        </div>
      )}
    </Card>
  );
};
