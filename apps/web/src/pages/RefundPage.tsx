import React from 'react';
import { Card, Button, StickerBadge } from '@pharmacy/ui';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';

export const RefundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link to="/pricing">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2 rtl:rotate-180" />
            {t('legal.refund.backBtn')}
          </Button>
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <StickerBadge variant="outline">{t('legal.refund.badge')}</StickerBadge>
          <span className="text-xs font-mono text-gray-500">{t('legal.refund.effectiveDate')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight flex items-center gap-3">
          <RefreshCw className="w-8 h-8 text-[#4CAF50]" />
          {t('legal.refund.title')}
        </h1>
        <p className="text-gray-700 dark:text-slate-300 mt-2 font-mono text-sm">
          {t('legal.refund.subtitle')}
        </p>
      </div>

      <Card className="p-6 sm:p-8 space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold uppercase mb-2">{t('legal.refund.sec1Title')}</h2>
          <p className="text-gray-700 dark:text-slate-300">
            {t('legal.refund.sec1Body')}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase mb-2">{t('legal.refund.sec2Title')}</h2>
          <p className="text-gray-700 dark:text-slate-300">
            {t('legal.refund.sec2Body')}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase mb-2">{t('legal.refund.sec3Title')}</h2>
          <p className="text-gray-700 dark:text-slate-300">
            {t('legal.refund.sec3Body')}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase mb-2">{t('legal.refund.sec4Title')}</h2>
          <p className="text-gray-700 dark:text-slate-300">
            {t('legal.refund.sec4Body')}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase mb-2">{t('legal.refund.sec5Title')}</h2>
          <p className="text-gray-700 dark:text-slate-300">
            {t('legal.refund.sec5Body')}
          </p>
        </section>
      </Card>
    </div>
  );
};
