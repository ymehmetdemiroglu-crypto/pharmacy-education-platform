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
  const { locale } = useTranslation();
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
    <div className="min-h-screen bg-[#FFF8E7] dark:bg-[#121212] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-3 border-black dark:border-slate-700 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-amber-500" />
              <h1 className="font-display font-black text-2xl uppercase tracking-tight text-gray-900 dark:text-white">
                {locale === 'tr' ? 'Aralıklı Tekrar Kuyruğu' : locale === 'ar' ? 'طابور التكرار المتباعد' : 'Spaced Review Queue'}
              </h1>
            </div>
            <p className="font-body text-xs text-gray-600 dark:text-gray-400 mt-1">
              {locale === 'tr'
                ? 'Leitner 5 kutulu hafıza algoritması ile kalıcı ezberleme'
                : locale === 'ar'
                ? 'تكرار ذكي بنظام لايتنر ذو الـ 5 صناديق لتثبيت المعلومات'
                : 'Long-term retention powered by 5-box Leitner memory engine'}
            </p>
          </div>

          {/* Course Switcher */}
          <div className="flex border-3 border-black dark:border-slate-700 bg-white dark:bg-slate-800 shadow-neo-sm">
            <button
              onClick={() => setCourseId('medchem')}
              className={`px-3 py-1.5 font-mono text-xs font-bold uppercase transition-colors ${
                courseId === 'medchem'
                  ? 'bg-[#4D96FF] text-black font-black'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
            >
              MedChem
            </button>
            <button
              onClick={() => setCourseId('pharmacology')}
              className={`px-3 py-1.5 font-mono text-xs font-bold uppercase border-s-3 border-black dark:border-slate-700 transition-colors ${
                courseId === 'pharmacology'
                  ? 'bg-[#FF9F45] text-black font-black'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
            >
              Pharm
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between text-xs font-mono bg-white dark:bg-slate-900 border-3 border-black dark:border-slate-700 p-3 shadow-neo-sm">
          <span>
            {locale === 'tr' ? 'Bekleyen Kart:' : locale === 'ar' ? 'بطاقات مستحقة:' : 'Due Cards:'}{' '}
            <strong>{dueCards.length}</strong> / {cards.length}
          </span>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((b) => {
              const count = cards.filter((c) => c.box === b).length;
              return (
                <span
                  key={b}
                  className="px-1.5 py-0.5 border border-black dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
                  title={`Box ${b}`}
                >
                  B{b}:{count}
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
            className="p-8 space-y-6 bg-white dark:bg-slate-900 border-4 border-black dark:border-slate-700 shadow-neo min-h-[320px] flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <StickerBadge variant="yellow" size="sm">
                  {currentCard.drugOrConcept}
                </StickerBadge>
                <span className="font-mono text-xs text-gray-500">
                  Box {currentCard.box} • {currentIndex + 1} / {dueCards.length}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">
                  {currentCard.prompt}
                </h3>
              </div>

              {isFlipped && (
                <div className="pt-4 border-t-3 border-black/10 dark:border-slate-700 space-y-2">
                  <span className="font-mono text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">
                    {locale === 'tr' ? 'Cevap:' : locale === 'ar' ? 'الإجابة:' : 'Answer:'}
                  </span>
                  <p className="font-body text-base text-gray-800 dark:text-gray-200 bg-emerald-50 dark:bg-emerald-950/30 p-4 border-2 border-emerald-500">
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
                  {locale === 'tr' ? 'Cevabı Göster' : locale === 'ar' ? 'إظهار الإجابة' : 'Show Answer'}
                </Button>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="danger"
                    size="lg"
                    onClick={() => handleRate(false)}
                    leftIcon={<RotateCw className="w-4 h-4" />}
                  >
                    {locale === 'tr' ? 'Zor (Kutu 1)' : locale === 'ar' ? 'صعب (صندوق 1)' : 'Hard (Box 1)'}
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => handleRate(true)}
                    rightIcon={<CheckCircle className="w-4 h-4" />}
                  >
                    {locale === 'tr' ? 'Biliyorum (+1 Kutu)' : locale === 'ar' ? 'أعرفه (+1 صندوق)' : 'Good (+1 Box)'}
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ) : (
          <Card
            variant="default"
            elevated
            className="p-10 text-center space-y-6 bg-white dark:bg-slate-900 border-4 border-black dark:border-slate-700 shadow-neo"
          >
            <div className="w-16 h-16 bg-[#6BCB77] border-3 border-black mx-auto flex items-center justify-center shadow-neo">
              <Sparkles className="w-8 h-8 text-black" />
            </div>
            <div className="space-y-2">
              <h2 className="font-display font-black text-2xl uppercase tracking-tight text-gray-950 dark:text-white">
                {locale === 'tr' ? 'Tebrikler! Kuyruk Tamamlandı' : locale === 'ar' ? 'تهانينا! اكتملت المراجعة' : 'All Caught Up!'}
              </h2>
              <p className="font-body text-sm text-gray-700 dark:text-gray-300 max-w-md mx-auto">
                {locale === 'tr'
                  ? 'Şu anda tekrar edilmesi gereken kartınız bulunmuyor. Yeni dersleri tamamladıkça hafıza kartlarınız otomatik olarak buraya eklenecektir.'
                  : locale === 'ar'
                  ? 'لا توجد بطاقات مستحقة للمراجعة حالياً. ستضاف بطاقات جديدة تلقائياً عند إكمال الدروس.'
                  : 'No flashcards are due for review right now. Complete new lessons to automatically enqueue fresh review targets.'}
              </p>
            </div>
            <div className="pt-2">
              <Link to="/catalog">
                <Button variant="secondary" size="lg" rightIcon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}>
                  {locale === 'tr' ? 'Kataloğa Dön' : locale === 'ar' ? 'العودة إلى المقررات' : 'Explore Lessons'}
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
