import React from 'react';
import { clsx } from 'clsx';
import { Sparkles, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../Button/Button';
import { useTheme } from '../../theme/ThemeProvider';

export type TrialBannerStatus = 'free_preview' | 'active_trial' | 'expired_trial';

export interface TrialBannerProps {
  status: TrialBannerStatus;
  daysRemaining?: number;
  onActionClick: () => void;
  className?: string;
}

export const TrialBanner: React.FC<TrialBannerProps> = ({
  status,
  daysRemaining = 7,
  onActionClick,
  className,
}) => {
  const { locale } = useTheme();

  const copy = {
    tr: {
      ariaLabel: 'Hesap Planı Durumu',
      freePreviewText: (
        <span>
          Tüm modüllerde 1. ve 2. dersler <strong>Kalıcı Olarak Ücretsizdir</strong>. Tam erişim için hazır mısınız?
        </span>
      ),
      freePreviewBtn: '7 Günlük Ücretsiz Denemeyi Başlat',
      activeTrialText: (
        <span>
          7 Günlük Premium Ücretsiz Deneme Aktif — <strong>{daysRemaining} gün kaldı</strong>. Tüm modüller ve analiz araçları açık.
        </span>
      ),
      activeTrialBtn: 'Öğrenci Aboneliklerini İncele',
      expiredTrialText: (
        <span>
          7 günlük deneme süreniz sona erdi. Öğrenme ilerlemenizin %100'ü güvenle saklanıyor!
        </span>
      ),
      expiredTrialBtn: 'Akademik Abonelik Seç',
    },
    ar: {
      ariaLabel: 'حالة خطة الحساب',
      freePreviewText: (
        <bdi dir="rtl">
          الدرسان 1 و2 من جميع الموديولات <strong>مجانيان دائماً</strong>. هل أنت مستعد للوصول الكامل؟
        </bdi>
      ),
      freePreviewBtn: 'ابدأ التجربة المجانية لـ 7 أيام',
      activeTrialText: (
        <bdi dir="rtl">
          تجربة باقة بريميوم المجانية نشطة — <strong>متبقي {daysRemaining} أيام</strong>. جميع الموديولات والأدوات مفتوحة.
        </bdi>
      ),
      activeTrialBtn: 'عرض الاشتراكات الطلابية',
      expiredTrialText: (
        <bdi dir="rtl">
          انتهت فترتك التجريبية (7 أيام). تقدمك التعليمي محفوظ بنسبة 100%!
        </bdi>
      ),
      expiredTrialBtn: 'اختر الاشتراك الأكاديمي',
    },
    en: {
      ariaLabel: 'Account Plan Status',
      freePreviewText: (
        <span>
          Lessons 1 & 2 of all modules are <strong>Free Forever</strong>. Ready for full access?
        </span>
      ),
      freePreviewBtn: 'Start 7-Day Free Trial',
      activeTrialText: (
        <span>
          7-Day Premium Free Trial Active — <strong>{daysRemaining} day{daysRemaining === 1 ? '' : 's'} remaining</strong>. All modules and AI tools unlocked.
        </span>
      ),
      activeTrialBtn: 'View Student Passes',
      expiredTrialText: (
        <span>
          Your 7-day trial has ended. 100% of your learning progress is saved!
        </span>
      ),
      expiredTrialBtn: 'Choose Academic Pass',
    },
  }[locale] || {
    ariaLabel: 'Hesap Planı Durumu',
    freePreviewText: (
      <span>
        Tüm modüllerde 1. ve 2. dersler <strong>Kalıcı Olarak Ücretsizdir</strong>. Tam erişim için hazır mısınız?
      </span>
    ),
    freePreviewBtn: '7 Günlük Ücretsiz Denemeyi Başlat',
    activeTrialText: (
      <span>
        7 Günlük Premium Ücretsiz Deneme Aktif — <strong>{daysRemaining} gün kaldı</strong>. Tüm modüller ve analiz araçları açık.
      </span>
    ),
    activeTrialBtn: 'Öğrenci Aboneliklerini İncele',
    expiredTrialText: (
      <span>
        7 günlük deneme süreniz sona erdi. Öğrenme ilerlemenizin %100'ü güvenle saklanıyor!
      </span>
    ),
    expiredTrialBtn: 'Akademik Abonelik Seç',
  };

  const getButtonText = () => {
    switch (status) {
      case 'active_trial':
        return copy.activeTrialBtn;
      case 'free_preview':
        return copy.freePreviewBtn;
      case 'expired_trial':
        return copy.expiredTrialBtn;
      default:
        return '';
    }
  };

  return (
    <aside
      aria-label={copy.ariaLabel}
      className={clsx(
        'w-full py-2.5 px-4 sm:px-6 border-b-3 border-black dark:border-slate-700 select-none',
        'flex flex-col sm:flex-row items-center justify-between gap-3',
        status === 'active_trial' && 'bg-[#FFD93D] text-black',
        status === 'free_preview' && 'bg-[#FFF8E7] dark:bg-[#131B2A] text-black dark:text-slate-100',
        status === 'expired_trial' && 'bg-[#FF6B9D] text-black',
        className
      )}
    >
      <div className="flex items-center gap-2.5 text-xs sm:text-sm font-display font-bold">
        {status === 'active_trial' && (
          <>
            <Clock className="w-4 h-4 shrink-0 stroke-[2.5]" />
            {copy.activeTrialText}
          </>
        )}
        {status === 'free_preview' && (
          <>
            <Sparkles className="w-4 h-4 shrink-0 stroke-[2.5] text-amber-600" />
            {copy.freePreviewText}
          </>
        )}
        {status === 'expired_trial' && (
          <>
            <Clock className="w-4 h-4 shrink-0 stroke-[2.5]" />
            {copy.expiredTrialText}
          </>
        )}
      </div>

      <div className="shrink-0">
        <Button
          size="sm"
          variant={status === 'active_trial' ? 'secondary' : 'primary'}
          onClick={onActionClick}
          rightIcon={<ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />}
        >
          {locale === 'ar' ? (
            <bdi dir="rtl">{getButtonText()}</bdi>
          ) : (
            getButtonText()
          )}
        </Button>
      </div>
    </aside>
  );
};
