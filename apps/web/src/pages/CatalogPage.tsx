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
      pharmTitle: 'Course B: Pharmacology',
      pharmTagline: 'Receptor Dynamics, Signal Transduction & Pharmacokinetics',
      exploreBtn: 'Explore Course Curriculum',
    },
    tr: {
      heroTitle: 'Eczacılık Ders Kataloğu',
      heroDesc: 'Eczacılık öğrencileri için özel olarak tasarlanmış iki kapsamlı ve etkileşimli ders. Her modül, kavramları derinlemesine öğrenmeniz için ilk iki dersi tamamen ücretsiz sunar.',
      freemiumBadge: 'Kalıcı Ücretsiz Erişim',
      freeLessonsBadge: 'Her Modülde 1. ve 2. Ders Ücretsiz',
      medchemTitle: 'Ders A: Farmasötik Kimya (MedChem)',
      medchemTagline: 'Yapı-Etki İlişkileri (SAR), Biyoizosterizm ve İlaç Tasarımı',
      pharmTitle: 'Ders B: Farmakoloji',
      pharmTagline: 'Reseptör Dinamikleri, Sinyal İletimi ve Farmakokinetik',
      exploreBtn: 'Müfredatı İncele',
    },
    ar: {
      heroTitle: 'دليل المقررات الصيدلانية',
      heroDesc: 'مقرران جامعيان تفاعليان ومتقنان صُمما خصيصاً لطلاب كليات الصيدلة. يبدأ كل موديول بدرسين مجانيين بالكامل لضمان استيعاب المفاهيم الأساسية.',
      freemiumBadge: 'نموذج مجاني دائم',
      freeLessonsBadge: 'الدرس 1 و 2 مجاناً في كل موديول',
      medchemTitle: 'المقرر أ: الكيمياء الدوائية',
      medchemTagline: 'علاقات البنية بالفعالية الحيوية والتصميم الدوائي',
      pharmTitle: 'المقرر ب: علم الأدوية (الفارماكولوجي)',
      pharmTagline: 'ديناميكا المستقبلات ونقل الإشارة والحركية الدوائية',
      exploreBtn: 'استكشف المنهج الدراسي',
    },
  }[locale] || {
    heroTitle: 'Pharmacy Course Catalog',
    heroDesc: 'Two distinct, rigorous university-level courses engineered specifically for pharmacy students. Every module starts with two free interactive lessons to guarantee deep conceptual grasp before committing.',
    freemiumBadge: 'Permanent Freemium',
    freeLessonsBadge: 'Lessons 1 & 2 Free Forever',
    medchemTitle: 'Course A: Medicinal Chemistry',
    medchemTagline: 'Structure-Activity Relationships, Bioisosterism & Drug Design',
    pharmTitle: 'Course B: Pharmacology',
    pharmTagline: 'Receptor Dynamics, Signal Transduction & Pharmacokinetics',
    exploreBtn: 'Explore Course Curriculum',
  };

  const courses = [
    {
      id: 'medchem',
      title: copy.medchemTitle,
      tagline: copy.medchemTagline,
      accent: 'blue',
      badgeColor: 'blue' as const,
      modulesCount: 5,
      totalLessons: 25,
      estimatedHours: 20,
      description:
        'Master the chemical logic behind pharmaceutical action. Discover how functional group modifications, ionization, lipophilicity, and bioisosteres dictate receptor binding and drug metabolism.',
      examAlignment: 'NAPLEX (Area 1) • EUS Pharmacy Licensure • SPLE',
      modules: [
        { id: 'mc-01', name: 'Physicochemical Properties & Bioisosterism', freeLessons: 2, totalLessons: 5 },
        { id: 'mc-02', name: 'Drug Metabolism & Biotransformation Pathways', freeLessons: 2, totalLessons: 5 },
        { id: 'mc-03', name: 'Receptor Binding Forces & Enthalpic Tuning', freeLessons: 2, totalLessons: 5 },
        { id: 'mc-04', name: 'Antimicrobial SAR & Mechanism-Based Design', freeLessons: 2, totalLessons: 5 },
        { id: 'mc-05', name: 'Cardiovascular Pharmacophore Optimization', freeLessons: 2, totalLessons: 5 },
      ],
    },
    {
      id: 'pharmacology',
      title: copy.pharmTitle,
      tagline: copy.pharmTagline,
      accent: 'orange',
      badgeColor: 'orange' as const,
      modulesCount: 6,
      totalLessons: 30,
      estimatedHours: 24,
      description:
        'Explore the mathematical and physiological principles governing drug response. Model agonist efficacy, competitive antagonism, GPCR signaling cascades, and one-compartment PK in real-time.',
      examAlignment: 'NAPLEX (Area 2 & 3) • EUS Clinical Pharmacology • SPLE',
      modules: [
        { id: 'ph-01', name: 'Receptor Theory & Graded Dose-Response Curves', freeLessons: 2, totalLessons: 5 },
        { id: 'ph-02', name: 'GPCR Transduction & Allosteric Modulation', freeLessons: 2, totalLessons: 5 },
        { id: 'ph-03', name: 'Clinical Pharmacokinetics & Dosing Regimens', freeLessons: 2, totalLessons: 5 },
        { id: 'ph-04', name: 'Autonomic Nervous System Pharmacology', freeLessons: 2, totalLessons: 5 },
        { id: 'ph-05', name: 'Renal & Cardiovascular Drug Dynamics', freeLessons: 2, totalLessons: 5 },
        { id: 'ph-06', name: 'Neuropharmacology & Central Neurotransmission', freeLessons: 2, totalLessons: 5 },
      ],
    },
  ];

  return (
    <div className="w-full pb-20 space-y-12">
      {/* Catalog Hero */}
      <section className="bg-[#FFF8E7] dark:bg-[#121212] border-b-3 border-black dark:border-white py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <StickerBadge variant="green" size="sm">{copy.freemiumBadge}</StickerBadge>
            <StickerBadge variant="yellow" size="sm">{copy.freeLessonsBadge}</StickerBadge>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-black dark:text-white">
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black/20 dark:border-white/20 pb-4">
              <div className="space-y-1">
                <StickerBadge variant={course.badgeColor} size="sm">
                  {course.id.toUpperCase()}
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
                  <span>{course.modulesCount} Modules ({course.totalLessons} Lessons)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  <span>~{course.estimatedHours} Hours</span>
                </div>
              </div>
            </div>

            <p className="font-body text-sm leading-relaxed text-gray-800 dark:text-gray-200 max-w-4xl">
              {course.description}
            </p>

            {/* Exam Alignment */}
            <div className="p-3 bg-[#FFFDF7] dark:bg-[#202020] border-2 border-black dark:border-white flex items-center gap-2 text-xs font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Exam Alignment: <strong>{course.examAlignment}</strong></span>
            </div>

            {/* Modules List */}
            <div className="space-y-3">
              <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Course Curriculum Modules
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.modules.map((m, idx) => (
                  <div
                    key={m.id}
                    className="p-3 bg-gray-50 dark:bg-[#252525] border-2 border-black dark:border-white flex items-center justify-between gap-2"
                  >
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono font-semibold text-gray-700 dark:text-gray-300 uppercase">
                        Module 0{idx + 1}
                      </span>
                      <h4 className="font-display font-bold text-xs sm:text-sm">
                        {m.name}
                      </h4>
                    </div>
                    <span className="shrink-0 text-[10px] font-mono font-bold bg-[#6BCB77] text-black px-1.5 py-0.5 border border-black">
                      2 Lessons Free
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t-2 border-black/20 dark:border-white/20">
              <span className="text-xs font-mono text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                No credit card required to start free lessons
              </span>
              <div className="flex flex-wrap gap-3">
                {course.id === 'medchem' && (
                  <Link to="/courses/medchem/lessons/1">
                    <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Start Free Lesson 1
                    </Button>
                  </Link>
                )}
                <Link to="/gallery">
                  <Button variant="secondary" size="md">
                    Explore Widgets
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="secondary" size="md">
                    View Student Passes
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
