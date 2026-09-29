import React, { useState } from 'react';
import { Card, Button, StickerBadge, useTheme } from '@pharmacy/ui';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useAuth } from '@pharmacy/platform';

export const PricingPage: React.FC = () => {
  const { locale } = useTheme();
  const [isBundle, setIsBundle] = useState(false);
  const { startTrial } = useAuth();

  // All pricing is strictly in Turkish Lira (₺)
  const prices = {
    single: {
      monthly: '₺250',
      semester: '₺850',
      annual: '₺1.450',
    },
    bundle: {
      monthly: '₺350',
      semester: '₺1.150',
      annual: '₺2.100',
    },
  };

  const copy = {
    tr: {
      badgeEconomics: 'Öğrenci Dostu Fiyatlandırma',
      badgeTrial: '7 Günlük Kartsız Deneme Sürümü',
      guaranteeFreeLessons: 'Her modülde 1. ve 2. dersler Kalıcı Olarak Ücretsizdir (Toplam 22 ders bedelsiz)',
      guaranteeCardlessTrial: '7 Günlük Kartsız Deneme Sürümü',
      heroTitle: 'Şeffaf Akademik Abonelikler',
      heroDesc: 'Eczacılık fakültesi öğrencileri için yüksek kavrama odaklı eğitim. Her modülün ilk iki dersine kalıcı ücretsiz erişim ve kredi kartı gerektirmeyen 7 günlük deneme sürümü.',
      scopeLabel: 'Kapsam:',
      singleCourse: 'Tek Ders (MedKim veya Farmakoloji)',
      dualBundle: 'İkili Paket (Her İki Ders)',
      monthlyTitle: 'Aylık Abonelik (Monthly Pass)',
      monthlyPeriod: '/ ay',
      monthlyDesc: 'İstediğiniz zaman iptal edin. Vize ve ara sınavlara hazırlık için ideal.',
      monthlyCta: 'Aylık Seç',
      semesterTitle: 'Dönemlik Abonelik (Semester Pass)',
      semesterPeriod: '/ dönem (6 ay)',
      semesterDesc: 'Aylık plana kıyasla ~%40 tasarrufla tüm üniversite döneminizi kapsar.',
      semesterBadge: '★ En Popüler',
      semesterCta: 'Dönemlik Başlat',
      annualTitle: 'Yıllık Abonelik (Annual Pass)',
      annualPeriod: '/ yıl (12 ay)',
      annualDesc: 'Tüm yıl boyunca komite ve EUS / lisanslama sınavlarına eksiksiz hazırlık.',
      annualBadge: 'En İyi Değer',
      annualCta: 'Yıllık Seç',
      trialBannerTitle: 'Henüz hazır değil misiniz? 7 Günlük Kartsız Deneme Sürümünü Başlatın',
      trialBannerDesc: 'Kredi kartı gerekmeden tek tıkla anında aktivasyon. 8. günde otomatik olarak ücretsiz sürüme geçer, ilerlemenizin %100\'ü korunur.',
      trialBannerCta: '7 Günlük Ücretsiz Denemeyi Başlat',
      features: {
        monthly: [
          'Tüm ders ve modüllere tam erişim',
          'İnteraktif simulation widgetları',
          '2. ve 3. Aşama ipucu çözümleri',
        ],
        semester: [
          '6 tam ay kesintisiz erişim',
          'Leitner aralıklı tekrar kuyruğu',
          'Cihazlar arası ilerleme eşitleme',
          'Eczacılık yeterlilik ön testleri',
        ],
        annual: [
          '12 ay boyunca tüm güncellemeler ve yeni modüller',
          'Öncelikli yeni etken madde ve mekanizma simülasyonları',
          'Resmi ders tamamlama sertifikası',
          'Kapsamlı lisanslama ve EUS hazırlık arşivi',
        ],
      },
    },
    en: {
      badgeEconomics: 'Student-First Economics',
      badgeTrial: '7-Day Card-Free Trial',
      guaranteeFreeLessons: 'Her modülde 1. ve 2. dersler Kalıcı Olarak Ücretsizdir (Toplam 22 ders bedelsiz)',
      guaranteeCardlessTrial: '7 Günlük Kartsız Deneme Sürümü',
      heroTitle: 'Transparent Academic Passes',
      heroDesc: 'High-comprehension pharmacy education built for students. Permanent free access to the first two lessons of every module, plus 7-day trials with zero card commitment.',
      scopeLabel: 'Scope:',
      singleCourse: 'Single Course (MedChem or Pharm)',
      dualBundle: 'Dual Bundle (Both Courses)',
      monthlyTitle: 'Monthly Pass (Aylık)',
      monthlyPeriod: '/ month',
      monthlyDesc: 'Cancel anytime. Ideal for targeted mid-term cramming.',
      monthlyCta: 'Choose Monthly',
      semesterTitle: 'Semester Pass (Dönemlik)',
      semesterPeriod: '/ semester (6 mo)',
      semesterDesc: 'Covers your entire university term at ~40% discount vs monthly.',
      semesterBadge: '★ Most Popular',
      semesterCta: 'Get Semester Pass',
      annualTitle: 'Annual Pass (Yıllık)',
      annualPeriod: '/ year (12 mo)',
      annualDesc: '12 full months for licensure exam prep (NAPLEX / EUS / SPLE).',
      annualBadge: 'Best Value',
      annualCta: 'Choose Annual',
      trialBannerTitle: 'Not ready to commit? Start your 7-Day Free Trial',
      trialBannerDesc: 'Instant 1-click activation without upfront credit card requirements. Auto-downgrades on Day 8 with 100% of your progress preserved.',
      trialBannerCta: 'Activate 7-Day Free Trial',
      features: {
        monthly: [
          'Full access to all lessons & modules',
          'Interactive simulation widgets',
          'Tier 2 & 3 solution step hints',
        ],
        semester: [
          '6 full months of continuous access',
          'Leitner spaced repetition queue',
          'Cross-device progress sync',
          'Licensure pre-test diagnostics',
        ],
        annual: [
          'Full year of updates & new modules',
          'Priority access to new drug widgets',
          'Course completion certificate',
          'Comprehensive board review materials',
        ],
      },
    },
    ar: {
      badgeEconomics: 'اقتصاديات داعمة للطلاب',
      badgeTrial: 'تجربة مجانية لمدة 7 أيام بدون بطاقة',
      guaranteeFreeLessons: 'Her modülde 1. ve 2. dersler Kalıcı Olarak Ücretsizdir (Toplam 22 ders bedelsiz)',
      guaranteeCardlessTrial: '7 Günlük Kartsız Deneme Sürümü',
      heroTitle: 'اشتراكات أكاديمية شفافة',
      heroDesc: 'تعليم صيدلاني عالي الفهم والاستيعاب مخصص للطلاب. وصول مجاني دائم لأول درسين من كل موديول مع تجربة مجانية لمدة 7 أيام دون الحاجة لبطاقة ائتمانية.',
      scopeLabel: 'النطاق:',
      singleCourse: 'مقرر واحد (الكيمياء الدوائية أو علم الأدوية)',
      dualBundle: 'الحزمة المزدوجة (كلا المقررين)',
      monthlyTitle: 'الاشتراك الشهري (Monthly Pass)',
      monthlyPeriod: '/ شهر',
      monthlyDesc: 'إلغاء في أي وقت. مثالي للمراجعة المركزة قبل الامتحانات الفصلية.',
      monthlyCta: 'اختيار الشهري',
      semesterTitle: 'اشتراك الفصل الدراسي (Semester Pass)',
      semesterPeriod: '/ فصل (6 أشهر)',
      semesterDesc: 'يغطي فصلك الدراسي الجامعي بالكامل بخصم يصل إلى 40% مقارنة بالشهري.',
      semesterBadge: '★ الأكثر شيوعاً',
      semesterCta: 'الحصول على اشتراك الفصل',
      annualTitle: 'الاشتراك السنوي (Annual Pass)',
      annualPeriod: '/ سنة (12 شهراً)',
      annualDesc: '12 شهراً كاملاً للتحضير لامتحانات البورد والتراخيص الصيدلانية.',
      annualBadge: 'أفضل قيمة',
      annualCta: 'اختيار السنوي',
      trialBannerTitle: 'لست مستعداً بعد؟ ابدأ تجربتك المجانية لمدة 7 أيام',
      trialBannerDesc: 'تفعيل فوري بنقرة واحدة دون الحاجة لإدخال بطاقة ائتمان. تخفيض تلقائي في اليوم 8 مع الاحتفاظ بـ 100% من تقدمك الدراسي.',
      trialBannerCta: 'بدء التجربة المجانية لمدة 7 أيام',
      features: {
        monthly: [
          'وصول كامل إلى جميع الدروس والوحدات',
          'أدوات المحاكاة التفاعلية',
          'تلميحات خطوات الحل للمستويين 2 و 3',
        ],
        semester: [
          '6 أشهر كاملة من الوصول المستمر',
          'طابور التكرار المتباعد لايتنر',
          'مزامنة التقدم عبر مختلف الأجهزة',
          'اختبارات تشخيصية قبل الامتحانات',
        ],
        annual: [
          'سنة كاملة من التحديثات والوحدات الجديدة',
          'أولوية الوصول إلى أدوات الأدوية الجديدة',
          'شهادة إتمام المقرر',
          'بنك أسئلة لاختبارات التراخيص',
        ],
      },
    },
  }[locale] || {
    badgeEconomics: 'Student-First Economics',
    badgeTrial: '7-Day Card-Free Trial',
    guaranteeFreeLessons: 'Her modülde 1. ve 2. dersler Kalıcı Olarak Ücretsizdir (Toplam 22 ders bedelsiz)',
    guaranteeCardlessTrial: '7 Günlük Kartsız Deneme Sürümü',
    heroTitle: 'Transparent Academic Passes',
    heroDesc: 'High-comprehension pharmacy education built for students. Permanent free access to the first two lessons of every module, plus 7-day trials with zero card commitment.',
    scopeLabel: 'Scope:',
    singleCourse: 'Single Course (MedChem or Pharm)',
    dualBundle: 'Dual Bundle (Both Courses)',
    monthlyTitle: 'Monthly Pass',
    monthlyPeriod: '/ month',
    monthlyDesc: 'Cancel anytime. Ideal for targeted mid-term cramming.',
    monthlyCta: 'Choose Monthly',
    semesterTitle: 'Semester Pass',
    semesterPeriod: '/ semester (6 mo)',
    semesterDesc: 'Covers your entire university term at ~40% discount vs monthly.',
    semesterBadge: '★ Most Popular',
    semesterCta: 'Get Semester Pass',
    annualTitle: 'Annual Pass',
    annualPeriod: '/ year (12 mo)',
    annualDesc: '12 full months for licensure exam prep (NAPLEX / EUS / SPLE).',
    annualBadge: 'Best Value',
    annualCta: 'Choose Annual',
    trialBannerTitle: 'Not ready to commit? Start your 7-Day Free Trial',
    trialBannerDesc: 'Instant 1-click activation without upfront credit card requirements. Auto-downgrades on Day 8 with 100% of your progress preserved.',
    trialBannerCta: 'Activate 7-Day Free Trial',
    features: {
      monthly: [
        'Full access to all lessons & modules',
        'Interactive simulation widgets',
        'Tier 2 & 3 solution step hints',
      ],
      semester: [
        '6 full months of continuous access',
        'Leitner spaced repetition queue',
        'Cross-device progress sync',
        'Licensure pre-test diagnostics',
      ],
      annual: [
        'Full year of updates & new modules',
        'Priority access to new drug widgets',
        'Course completion certificate',
        'Comprehensive board review materials',
      ],
    },
  };

  const active = isBundle ? prices.bundle : prices.single;

  return (
    <div className="w-full pb-20 space-y-10">
      {/* Header Hero */}
      <section className="bg-[#FFF8E7] dark:bg-[#0B0F17] border-b-3 border-black dark:border-slate-700 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2">
            <StickerBadge variant="green" size="sm">{copy.badgeEconomics}</StickerBadge>
            <StickerBadge variant="yellow" size="sm">{copy.badgeTrial}</StickerBadge>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-black dark:text-slate-100">
            {copy.heroTitle}
          </h1>
          <p className="font-body text-base sm:text-lg text-gray-800 dark:text-gray-200 max-w-2xl mx-auto leading-relaxed">
            {copy.heroDesc}
          </p>
        </div>
      </section>

      {/* Student Guarantees Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border-3 border-black dark:border-slate-700 shadow-neo dark:shadow-neo-dark flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-400 border-2 border-black flex items-center justify-center font-bold text-black shrink-0">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block">
                {locale === 'tr' ? 'Kalıcı Ücretsiz Erişim' : locale === 'ar' ? 'وصول مجاني دائم' : 'Permanent Free Access'}
              </span>
              <p className="font-display font-black text-sm sm:text-base text-black dark:text-slate-100 leading-snug">
                {copy.guaranteeFreeLessons}
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#FFD93D]/25 dark:bg-[#FFD93D]/10 border-3 border-black dark:border-slate-700 shadow-neo dark:shadow-neo-dark flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FFD93D] border-2 border-black flex items-center justify-center font-bold text-black shrink-0">
              <Sparkles className="w-6 h-6 text-black" />
            </div>
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
                {locale === 'tr' ? 'Risksiz Başlangıç' : locale === 'ar' ? 'بداية بلا مخاطر' : 'Risk-Free Guarantee'}
              </span>
              <p className="font-display font-black text-sm sm:text-base text-black dark:text-slate-100 leading-snug">
                {copy.guaranteeCardlessTrial}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Controls: Bundle Scope in strictly TRY */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white dark:bg-[#131B2A] border-3 border-black dark:border-slate-700 shadow-neo dark:shadow-neo-dark">
          {/* Bundle Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300 mr-2">
              {copy.scopeLabel}
            </span>
            <button
              type="button"
              onClick={() => setIsBundle(false)}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase border-2 border-black dark:border-slate-700 transition-colors ${
                !isBundle
                  ? 'bg-[#FFD93D] text-black shadow-[2px_2px_0px_#000000]'
                  : 'bg-white dark:bg-[#1E293B] text-black dark:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800'
              }`}
            >
              {copy.singleCourse}
            </button>
            <button
              type="button"
              onClick={() => setIsBundle(true)}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase border-2 border-black dark:border-slate-700 transition-colors ${
                isBundle
                  ? 'bg-[#FFD93D] text-black shadow-[2px_2px_0px_#000000]'
                  : 'bg-white dark:bg-[#1E293B] text-black dark:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800'
              }`}
            >
              {copy.dualBundle}
            </button>
          </div>

          {/* Strictly Turkish Lira Indicator */}
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span className="px-3 py-1 bg-black text-white dark:bg-[#1E293B] dark:text-slate-100 font-bold border-2 border-black dark:border-slate-700 shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#030712] flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-[#FFD93D]" />
              <span>₺ TRY Fiyatlandırma</span>
            </span>
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Monthly */}
          <Card variant="default" className="p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300">
                {copy.monthlyTitle}
              </span>
              <div className="flex items-baseline gap-1" dir="ltr">
                <span className="font-display font-black text-4xl">{active.monthly}</span>
                <span className="font-mono text-xs text-gray-700 dark:text-gray-300">{copy.monthlyPeriod}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {copy.monthlyDesc}
              </p>
              <ul className="space-y-2 pt-2 text-xs font-mono">
                {copy.features.monthly.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button variant="secondary" fullWidth onClick={() => alert('Proceeding to monthly checkout')}>
              {copy.monthlyCta}
            </Button>
          </Card>

          {/* Semester (Recommended - Most Popular) */}
          <Card
            variant="default"
            elevated
            className="p-6 space-y-5 flex flex-col justify-between relative bg-[#FFFDF7] dark:bg-[#131B2A] ring-3 ring-black dark:ring-amber-500 scale-[102%] z-10"
          >
            <div className="absolute -top-3.5 left-6">
              <StickerBadge variant="green" size="md">
                {copy.semesterBadge}
              </StickerBadge>
            </div>
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono font-bold uppercase text-emerald-700 dark:text-emerald-400">
                {copy.semesterTitle}
              </span>
              <div className="flex items-baseline gap-1" dir="ltr">
                <span className="font-display font-black text-4xl">{active.semester}</span>
                <span className="font-mono text-xs text-gray-700 dark:text-gray-300">{copy.semesterPeriod}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {copy.semesterDesc}
              </p>
              <ul className="space-y-2 pt-2 text-xs font-mono">
                {copy.features.semester.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button variant="primary" size="lg" fullWidth onClick={() => alert('Proceeding to semester checkout')}>
              {copy.semesterCta}
            </Button>
          </Card>

          {/* Annual (Best Value) */}
          <Card variant="default" className="p-6 space-y-5 flex flex-col justify-between relative">
            <div className="absolute -top-3 left-6">
              <StickerBadge variant="yellow" size="sm">
                {copy.annualBadge}
              </StickerBadge>
            </div>
            <div className="space-y-3 pt-1">
              <span className="text-xs font-mono font-bold uppercase text-amber-700 dark:text-amber-400">
                {copy.annualTitle}
              </span>
              <div className="flex items-baseline gap-1" dir="ltr">
                <span className="font-display font-black text-4xl">{active.annual}</span>
                <span className="font-mono text-xs text-gray-700 dark:text-gray-300">{copy.annualPeriod}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {copy.annualDesc}
              </p>
              <ul className="space-y-2 pt-2 text-xs font-mono">
                {copy.features.annual.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button variant="secondary" fullWidth onClick={() => alert('Proceeding to annual checkout')}>
              {copy.annualCta}
            </Button>
          </Card>
        </div>

        {/* 7-Day Free Trial Banner */}
        <div className="p-6 bg-[#FFF8E7] dark:bg-[#131B2A] border-3 border-black dark:border-slate-700 shadow-neo dark:shadow-neo-dark flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-display font-black text-lg uppercase flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              {copy.trialBannerTitle}
            </h3>
            <p className="text-xs font-body text-gray-700 dark:text-gray-300">
              {copy.trialBannerDesc}
            </p>
          </div>
          <Button
            variant="primary"
            onClick={async () => {
              const res = await startTrial();
              if (res) alert(locale === 'tr' ? '7 Günlük Ücretsiz Deneme Başlatıldı!' : '7-Day Free Trial Activated!');
              else alert(locale === 'tr' ? 'Deneme sürümü zaten kullanılmış veya aktif.' : 'Trial already utilized or active.');
            }}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {copy.trialBannerCta}
          </Button>
        </div>
      </section>
    </div>
  );
};
