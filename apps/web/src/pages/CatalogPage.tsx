import React from 'react';
import { Card, Button, StickerBadge, useTheme } from '@pharmacy/ui';
import { Layers, Clock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CatalogPage: React.FC = () => {
  const { locale } = useTheme();

  const copy = {
    en: {
      heroTitle: 'Pharmacy Course Catalog',
      heroDesc: 'Two distinct, rigorous university-level courses engineered specifically for pharmacy students. Every module starts with two free interactive lessons to guarantee deep conceptual grasp before committing.',
      freemiumBadge: 'Permanent Freemium',
      freeLessonsBadge: 'Lessons 1 & 2 Free Forever',
      medchemTitle: 'Course A: Medicinal Chemistry',
      medchemTagline: 'Structure-Activity Relationships, Bioisosterism & Drug Design',
      medchemDesc: 'Master the chemical logic behind pharmaceutical action. Discover how functional group modifications, ionization, lipophilicity, and bioisosteres dictate receptor binding and drug metabolism.',
      medchemExam: 'NAPLEX (Area 1) • EUS Pharmacy Licensure • SPLE',
      pharmTitle: 'Course B: Pharmacology',
      pharmTagline: 'Receptor Dynamics, Signal Transduction & Pharmacokinetics',
      pharmDesc: 'Explore the mathematical and physiological principles governing drug response. Model agonist efficacy, competitive antagonism, GPCR signaling cascades, and one-compartment PK in real-time.',
      pharmExam: 'NAPLEX (Area 2 & 3) • EUS Clinical Pharmacology • SPLE',
      modulesCountLabel: (count: number, lessons: number) => `${count} Modules (${lessons} Lessons)`,
      hoursLabel: (hours: number) => `~${hours} Hours`,
      examAlignmentLabel: 'Exam Alignment:',
      curriculumTitle: 'Course Curriculum Modules',
      moduleNumber: (num: number) => `Module 0${num}`,
      freeLessonsTag: '2 Lessons Free',
      noCreditCard: 'No credit card required to start free lessons',
      startFreeLessonBtn: 'Start Free Lesson 1',
      exploreWidgetsBtn: 'Explore Widgets',
      viewPassesBtn: 'View Student Passes',
      medchemModules: [
        'Physicochemical Determinants of Drug Action',
        'Molecular Stereochemistry & 3D Receptor Complementarity',
        'Functional Groups, Ionization & Chemical Scaffolds',
        'Classical & Non-Classical Bioisosterism',
        'Drug Biotransformation & Enzymatic Pathways',
      ],
      pharmModules: [
        'Receptor Dynamics & Molecular Forces',
        'Pharmacodynamics: Concentration-Effect Dynamics',
        'Pharmacokinetics & In Vivo Biotransformation',
        'Autonomic Nervous System Pharmacology',
        'Cardiovascular & Renal Therapeutics',
        'Central Nervous System Pharmacology',
      ],
    },
    tr: {
      heroTitle: 'Eczacılık Ders Kataloğu',
      heroDesc: 'Eczacılık fakültesi öğrencileri için özel olarak tasarlanmış iki kapsamlı ve etkileşimli ders. Her modül, kavramları derinlemesine öğrenmeniz için ilk iki dersi kalıcı olarak tamamen ücretsiz sunar.',
      freemiumBadge: 'Kalıcı Ücretsiz Erişim',
      freeLessonsBadge: 'Her Modülde 1. ve 2. Ders Kalıcı Olarak Ücretsiz',
      medchemTitle: 'Ders A: Farmasötik Kimya',
      medchemTagline: 'Yapı-Etki İlişkileri (SAR), Biyoizosterizm ve İlaç Tasarımı',
      medchemDesc: 'Farmasötik etkinin ardındaki kimyasal mantığı ve moleküler mekanizmaları derinlemesine kavrayın. Fonksiyonel grup modifikasyonlarının, iyonizasyon dengelerinin, lipofilitenin ve biyoizosterik yer değiştirmelerin reseptör bağlanması ve ilaç metabolizmasını nasıl yönlendirdiğini interaktif modellerle analiz edin.',
      medchemExam: 'EUS Eczacılıkta Uzmanlık Sınavı • NAPLEX • SPLE',
      pharmTitle: 'Ders B: Farmakoloji',
      pharmTagline: 'Reseptör Dinamikleri, Sinyal İletimi ve Farmakokinetik (ADME)',
      pharmDesc: 'İlaç-organizma etkileşimlerini yöneten matematiksel, hücresel ve fizyolojik ilkeleri keşfedin. Agonist etkinliği, yarışmalı ve yarışmasız antagonizma, GPCR sinyal iletim kaskadları ile tek kompartmanlı farmakokinetik modelleri gerçek zamanlı parametrelerle simüle edin.',
      pharmExam: 'EUS Klinik Eczacılık & Farmakoloji • NAPLEX • SPLE',
      modulesCountLabel: (count: number, lessons: number) => `${count} Modül (${lessons} Ders)`,
      hoursLabel: (hours: number) => `~${hours} Saat`,
      examAlignmentLabel: 'Sınav Uyumu:',
      curriculumTitle: 'Ders Müfredat Modülleri',
      moduleNumber: (num: number) => `Modül 0${num}`,
      freeLessonsTag: '2 Ders Ücretsiz',
      noCreditCard: 'Ücretsiz derslere başlamak için kredi kartı gerekmez',
      startFreeLessonBtn: 'Ücretsiz 1. Derse Başla',
      exploreWidgetsBtn: 'Etkileşimli Araçları İncele',
      viewPassesBtn: 'Öğrenci Aboneliklerini İncele',
      medchemModules: [
        'İlaç Etkisinin Fizikokimyasal Esasları',
        'Moleküler Stereokimya ve 3B Reseptör Uyumu',
        'Fonksiyonel Gruplar, İyonizasyon ve Kimyasal İskeletler',
        'Klasik ve Non-Klasik Biyoizosterizm',
        'İlaç Biyotransformasyonu ve Enzimatik Yolaklar',
      ],
      pharmModules: [
        'Reseptör Dinamikleri ve Moleküler Kuvvetler',
        'Farmakodinami: Konsantrasyon-Etki Dinamikleri',
        'Farmakokinetik (ADME) ve İn Vivo Biyotransformasyon',
        'Otonom Sinir Sistemi Farmakolojisi',
        'Kardiyovasküler ve Renal Terapötikler',
        'Merkezi Sinir Sistemi Farmakolojisi',
      ],
    },
    ar: {
      heroTitle: 'دليل المقررات الصيدلانية',
      heroDesc: 'مقرران جامعيان تفاعليان ومتقنان صُمما خصيصاً لطلاب كليات الصيدلة. يبدأ كل موديول بدرسين مجانيين بالكامل لضمان استيعاب المفاهيم الأساسية.',
      freemiumBadge: 'نموذج مجاني دائم',
      freeLessonsBadge: 'الدرس 1 و 2 مجاناً في كل موديول',
      medchemTitle: 'المقرر أ: الكيمياء الدوائية',
      medchemTagline: 'علاقات البنية بالفعالية الحيوية (SAR) والتصميم الدوائي',
      medchemDesc: 'أتقن المنطق الكيميائي وراء الفعل الصيدلاني. اكتشف كيف تحدد تعديلات المجموعات الوظيفية والتأين والألفة للدهون والمتماثلات الحيوية الارتباط بالمستقبلات واستقلاب الدواء.',
      medchemExam: 'امتحان مزاولة المهنة الصيدلانية SPLE • EUS • NAPLEX',
      pharmTitle: 'المقرر ب: علم الأدوية (الفارماكولوجي)',
      pharmTagline: 'ديناميكا المستقبلات ونقل الإشارة والحركية الدوائية (ADME)',
      pharmDesc: 'استكشف المبادئ الرياضية والفسيولوجية التي تحكم الاستجابة الدوائية. نمذجة فعالية المحاكي والتعاكس التنافسي وشلالات إشارات مستقبلات GPCR وحركية الدواء في الوقت الفعلي.',
      pharmExam: 'علم الأدوية السريري SPLE • EUS • NAPLEX',
      modulesCountLabel: (count: number, lessons: number) => `${count} موديولات (${lessons} درساً)`,
      hoursLabel: (hours: number) => `~${hours} ساعة`,
      examAlignmentLabel: 'التوافق مع الاختبارات الترخيصية:',
      curriculumTitle: 'موديولات المنهج الدراسي',
      moduleNumber: (num: number) => `موديول 0${num}`,
      freeLessonsTag: 'درسان مجاناً',
      noCreditCard: 'لا يلزم إدخال بطاقة ائتمان لبدء الدروس المجانية',
      startFreeLessonBtn: 'ابدأ الدرس 1 المجاني',
      exploreWidgetsBtn: 'استكشف الأدوات التفاعلية',
      viewPassesBtn: 'عرض الاشتراكات الطلابية',
      medchemModules: [
        'المحددات الفيزيوكيميائية للفعل الدوائي',
        'الكيمياء الفراغية الجزيئية والتكامل ثلاثي الأبعاد مع المستقبل',
        'المجموعات الوظيفية والتأين والهياكل الكيميائية',
        'التماثل الحيوي الكلاسيكي وغير الكلاسيكي',
        'التحول الحيوي الدوائي والمسارات الإنزيمية',
      ],
      pharmModules: [
        'ديناميكا المستقبلات والقوى الجزيئية',
        'الديناميكا الدوائية: علاقة التركيز بالتأثير',
        'الحركية الدوائية (ADME) والتحول الحيوي في الجسم الحي',
        'علم أدوية الجهاز العصبي الذاتي',
        'علاجات الجهاز القلبي الوعائي والكلى',
        'علم أدوية الجهاز العصبي المركزي',
      ],
    },
  }[locale] || {
    heroTitle: 'Eczacılık Ders Kataloğu',
    heroDesc: 'Eczacılık fakültesi öğrencileri için özel olarak tasarlanmış iki kapsamlı ve etkileşimli ders. Her modül, kavramları derinlemesine öğrenmeniz için ilk iki dersi kalıcı olarak tamamen ücretsiz sunar.',
    freemiumBadge: 'Kalıcı Ücretsiz Erişim',
    freeLessonsBadge: 'Her Modülde 1. ve 2. Ders Kalıcı Olarak Ücretsiz',
    medchemTitle: 'Ders A: Farmasötik Kimya',
    medchemTagline: 'Yapı-Etki İlişkileri (SAR), Biyoizosterizm ve İlaç Tasarımı',
    medchemDesc: 'Farmasötik etkinin ardındaki kimyasal mantığı ve moleküler mekanizmaları derinlemesine kavrayın. Fonksiyonel grup modifikasyonlarının, iyonizasyon dengelerinin, lipofilitenin ve biyoizosterik yer değiştirmelerin reseptör bağlanması ve ilaç metabolizmasını nasıl yönlendirdiğini interaktif modellerle analiz edin.',
    medchemExam: 'EUS Eczacılıkta Uzmanlık Sınavı • NAPLEX • SPLE',
    pharmTitle: 'Ders B: Farmakoloji',
    pharmTagline: 'Reseptör Dinamikleri, Sinyal İletimi ve Farmakokinetik (ADME)',
    pharmDesc: 'İlaç-organizma etkileşimlerini yöneten matematiksel, hücresel ve fizyolojik ilkeleri keşfedin. Agonist etkinliği, yarışmalı ve yarışmasız antagonizma, GPCR sinyal iletim kaskadları ile tek kompartmanlı farmakokinetik modelleri gerçek zamanlı parametrelerle simüle edin.',
    pharmExam: 'EUS Klinik Eczacılık & Farmakoloji • NAPLEX • SPLE',
    modulesCountLabel: (count: number, lessons: number) => `${count} Modül (${lessons} Ders)`,
    hoursLabel: (hours: number) => `~${hours} Saat`,
    examAlignmentLabel: 'Sınav Uyumu:',
    curriculumTitle: 'Ders Müfredat Modülleri',
    moduleNumber: (num: number) => `Modül 0${num}`,
    freeLessonsTag: '2 Ders Ücretsiz',
    noCreditCard: 'Ücretsiz derslere başlamak için kredi kartı gerekmez',
    startFreeLessonBtn: 'Ücretsiz 1. Derse Başla',
    exploreWidgetsBtn: 'Etkileşimli Araçları İncele',
    viewPassesBtn: 'Öğrenci Aboneliklerini İncele',
    medchemModules: [
      'İlaç Etkisinin Fizikokimyasal Esasları',
      'Moleküler Stereokimya ve 3B Reseptör Uyumu',
      'Fonksiyonel Gruplar, İyonizasyon ve Kimyasal İskeletler',
      'Klasik ve Non-Klasik Biyoizosterizm',
      'İlaç Biyotransformasyonu ve Enzimatik Yolaklar',
    ],
    pharmModules: [
      'Reseptör Dinamikleri ve Moleküler Kuvvetler',
      'Farmakodinami: Konsantrasyon-Etki Dinamikleri',
      'Farmakokinetik (ADME) ve İn Vivo Biyotransformasyon',
      'Otonom Sinir Sistemi Farmakolojisi',
      'Kardiyovasküler ve Renal Terapötikler',
      'Merkezi Sinir Sistemi Farmakolojisi',
    ],
  };

  const courses = [
    {
      id: 'medchem',
      code: 'MEDCHEM',
      title: copy.medchemTitle,
      tagline: copy.medchemTagline,
      accent: 'blue',
      badgeColor: 'blue' as const,
      modulesCount: 5,
      totalLessons: 25,
      estimatedHours: 20,
      description: copy.medchemDesc,
      examAlignment: copy.medchemExam,
      modules: copy.medchemModules.map((name, idx) => ({
        id: `mc-0${idx + 1}`,
        name,
        freeLessons: 2,
        totalLessons: 5,
      })),
    },
    {
      id: 'pharmacology',
      code: 'PHARMACOLOGY',
      title: copy.pharmTitle,
      tagline: copy.pharmTagline,
      accent: 'orange',
      badgeColor: 'orange' as const,
      modulesCount: 6,
      totalLessons: 30,
      estimatedHours: 24,
      description: copy.pharmDesc,
      examAlignment: copy.pharmExam,
      modules: copy.pharmModules.map((name, idx) => ({
        id: `ph-0${idx + 1}`,
        name,
        freeLessons: 2,
        totalLessons: 5,
      })),
    },
  ];

  return (
    <div className="w-full pb-20 space-y-12">
      {/* Catalog Hero */}
      <section className="bg-[#FFF8E7] dark:bg-[#0B0F17] border-b-3 border-black dark:border-slate-700 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <StickerBadge variant="green" size="sm">{copy.freemiumBadge}</StickerBadge>
            <StickerBadge variant="yellow" size="sm">{copy.freeLessonsBadge}</StickerBadge>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-black dark:text-slate-100">
            {copy.heroTitle}
          </h1>
          <p className="font-body text-base sm:text-lg text-gray-800 dark:text-gray-200 max-w-3xl leading-relaxed">
            {copy.heroDesc}
          </p>
        </div>
      </section>

      {/* Courses Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        {courses.map((course) => (
          <Card
            key={course.id}
            variant="default"
            elevated
            className="p-6 sm:p-8 space-y-6"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black/20 dark:border-slate-700 pb-4">
              <div className="space-y-1">
                <StickerBadge variant={course.badgeColor} size="sm">
                  {course.code}
                </StickerBadge>
                <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight">
                  {course.title}
                </h2>
                <p className="font-body text-sm font-semibold text-gray-600 dark:text-gray-400">
                  {course.tagline}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  <span>{copy.modulesCountLabel(course.modulesCount, course.totalLessons)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  <span>{copy.hoursLabel(course.estimatedHours)}</span>
                </div>
              </div>
            </div>

            <p className="font-body text-sm leading-relaxed text-gray-800 dark:text-gray-200 max-w-4xl">
              {course.description}
            </p>

            {/* Exam Alignment */}
            <div className="p-3 bg-[#FFFDF7] dark:bg-[#1E293B] border-2 border-black dark:border-slate-700 flex items-center gap-2 text-xs font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {copy.examAlignmentLabel} <strong>{course.examAlignment}</strong>
              </span>
            </div>

            {/* Modules List */}
            <div className="space-y-3">
              <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">
                {copy.curriculumTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.modules.map((m, idx) => (
                  <div
                    key={m.id}
                    className="p-3 bg-gray-50 dark:bg-[#1E293B] border-2 border-black dark:border-slate-700 flex items-center justify-between gap-2"
                  >
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono font-semibold text-gray-700 dark:text-gray-300 uppercase">
                        {copy.moduleNumber(idx + 1)}
                      </span>
                      <h4 className="font-display font-bold text-xs sm:text-sm">
                        {m.name}
                      </h4>
                    </div>
                    <span className="shrink-0 text-[10px] font-mono font-bold bg-[#6BCB77] text-black px-1.5 py-0.5 border border-black">
                      {copy.freeLessonsTag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t-2 border-black/20 dark:border-slate-700">
              <span className="text-xs font-mono text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {copy.noCreditCard}
              </span>
              <div className="flex flex-wrap gap-3">
                {course.id === 'medchem' && (
                  <Link to="/courses/medchem/lessons/1">
                    <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}>
                      {copy.startFreeLessonBtn}
                    </Button>
                  </Link>
                )}
                <Link to="/gallery">
                  <Button variant="secondary" size="md">
                    {copy.exploreWidgetsBtn}
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="secondary" size="md">
                    {copy.viewPassesBtn}
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
};
