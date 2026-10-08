import React, { useState, useEffect } from 'react';
import { Card, Button, StickerBadge } from '@pharmacy/ui';
import { Brain, RotateCw, CheckCircle, ArrowRight, Eye, Sparkles } from 'lucide-react';
import {
  loadLocalReviewCards,
  saveLocalReviewCards,
  getDueReviewCards,
  processCardReview,
  type SpacedReviewCard,
} from '@pharmacy/platform';
import { useTranslation } from '../context/TranslationContext';
import { Link } from 'react-router-dom';

export const ReviewPage: React.FC = () => {
  const { t } = useTranslation();
  const [courseId, setCourseId] = useState<'medchem' | 'pharmacology'>('medchem');
  const [cards, setCards] = useState<SpacedReviewCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const loaded = loadLocalReviewCards(courseId);
    setCards(loaded);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [courseId]);

  const dueCards = getDueReviewCards(cards);
  const currentCard = dueCards[currentIndex];

  const handleRate = (isCorrect: boolean) => {
    if (!currentCard) return;

    const updatedCard = processCardReview(currentCard, isCorrect);
    const updatedAll = cards.map((c) => (c.cardId === currentCard.cardId ? updatedCard : c));
    setCards(updatedAll);
    saveLocalReviewCards(courseId, updatedAll);

    setIsFlipped(false);
    if (currentIndex >= dueCards.length - 1) {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#171717] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-[#2F2F2F] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-amber-500" />
              <h1 className="font-display font-black text-2xl uppercase tracking-tight text-gray-900 dark:text-white">
                {t('review.title')}
              </h1>
            </div>
            <p className="font-body text-xs text-gray-600 dark:text-gray-400 mt-1">
              {t('review.desc')}
            </p>
          </div>

          {/* Course Switcher */}
          <div className="flex rounded-xl border border-slate-200 dark:border-[#2F2F2F] bg-slate-100 dark:bg-[#212121] p-1 shadow-xs">
            <button
              onClick={() => setCourseId('medchem')}
              className={`px-3 py-1.5 font-sans text-xs font-semibold rounded-lg transition-colors ${
                courseId === 'medchem'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t('review.medchemCourse')}
            </button>
            <button
              onClick={() => setCourseId('pharmacology')}
              className={`px-3 py-1.5 font-sans text-xs font-semibold rounded-lg transition-colors ${
                courseId === 'pharmacology'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t('review.pharmCourse')}
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between text-xs font-mono bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl p-3.5 shadow-xs">
          <span>
            {t('review.dueCards')}{' '}
            <strong>{dueCards.length}</strong> / {cards.length}
          </span>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((b) => {
              const count = cards.filter((c) => c.box === b).length;
              return (
                <span
                  key={b}
                  className="px-2 py-0.5 rounded-md border border-slate-200 dark:border-[#333333] bg-slate-50 dark:bg-[#262626] font-medium"
                  title={t('review.boxLabel', { box: b })}
                >
                  {t('review.boxShort', { box: b, count })}
                </span>
              );
            })}
          </div>
        </div>

        {/* Active Card or Empty State */}
        {currentCard ? (
          <Card
            variant="default"
            elevated
            className="p-8 space-y-6 min-h-[320px] flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <StickerBadge variant="yellow" size="sm">
                  {currentCard.drugOrConcept}
                </StickerBadge>
                <span className="font-mono text-xs text-gray-500">
                  {t('review.boxLabel', { box: currentCard.box })} • {currentIndex + 1} / {dueCards.length}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">
                  {currentCard.prompt}
                </h3>
              </div>

              {isFlipped && (
                <div className="pt-4 border-t border-slate-200 dark:border-[#2F2F2F] space-y-2">
                  <span className="font-mono text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">
                    {t('review.answerLabel')}
                  </span>
                  <p className="font-body text-base text-emerald-950 dark:text-emerald-100 bg-emerald-500/10 dark:bg-emerald-950/30 p-4 border border-emerald-500/40 rounded-xl">
                    {currentCard.answer}
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4">
              {!isFlipped ? (
                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                  onClick={() => setIsFlipped(true)}
                  leftIcon={<Eye className="w-5 h-5" />}
                >
                  {t('review.showAnswer')}
                </Button>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="danger"
                    size="lg"
                    onClick={() => handleRate(false)}
                    leftIcon={<RotateCw className="w-4 h-4" />}
                  >
                    {t('review.hardBtn')}
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => handleRate(true)}
                    rightIcon={<CheckCircle className="w-4 h-4" />}
                  >
                    {t('review.goodBtn')}
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ) : (
          <Card
            variant="default"
            elevated
            className="p-10 text-center space-y-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 mx-auto flex items-center justify-center shadow-xs">
              <Sparkles className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="space-y-2">
              <h2 className="font-display font-black text-2xl uppercase tracking-tight text-gray-950 dark:text-white">
                {t('review.allCaughtUpTitle')}
              </h2>
              <p className="font-body text-sm text-gray-700 dark:text-gray-300 max-w-md mx-auto">
                {t('review.allCaughtUpDesc')}
              </p>
            </div>
            <div className="pt-2">
              <Link to="/catalog">
                <Button variant="secondary" size="lg" rightIcon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}>
                  {t('review.exploreLessonsBtn')}
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
