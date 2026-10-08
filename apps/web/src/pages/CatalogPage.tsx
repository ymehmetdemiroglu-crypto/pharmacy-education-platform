import React from 'react';
import { Card, Button, StickerBadge } from '@pharmacy/ui';
import { Layers, Clock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';

export const CatalogPage: React.FC = () => {
  const { locale, t } = useTranslation();

  const copy = {
    heroTitle: t('catalog.heroTitle'),
    heroDesc: t('catalog.heroDesc'),
    freemiumBadge: t('catalog.freemiumBadge'),
    freeLessonsBadge: t('catalog.freeLessonsBadge'),
    medchemTitle: t('catalog.medchemTitle'),
    medchemTagline: t('catalog.medchemTagline'),
    medchemDesc: t('catalog.medchemDesc'),
    medchemExam: t('catalog.medchemExam'),
    pharmTitle: t('catalog.pharmTitle'),
    pharmTagline: t('catalog.pharmTagline'),
    pharmDesc: t('catalog.pharmDesc'),
    pharmExam: t('catalog.pharmExam'),
    modulesCountLabel: (count: number, lessons: number) =>
      t('catalog.modulesCount', { count, lessons }),
    hoursLabel: (hours: number) =>
      t('catalog.estimatedHours', { hours }),
    examAlignmentLabel: t('catalog.examAlignment'),
    curriculumTitle: t('catalog.curriculumTitle'),
    moduleNumber: (num: number) =>
      t('catalog.moduleNumber', { num }),
    freeLessonsTag: t('catalog.freeLessonsTag'),
    noCreditCard: t('catalog.noCreditCard'),
    startFreeLessonBtn: t('catalog.startFreeLesson'),
    exploreWidgetsBtn: t('catalog.exploreWidgets'),
    viewPassesBtn: t('catalog.viewPasses'),
    medchemModules: locale === 'ar' ? [
      'المحددات الفيزيوكيميائية للفعل الدوائي',
      'الكيمياء الفراغية الجزيئية والتكامل ثلاثي الأبعاد مع المستقبل',
      'المجموعات الوظيفية والتأين والهياكل الكيميائية',
      'التماثل الحيوي الكلاسيكي وغير الكلاسيكي',
      'التحول الحيوي الدوائي والمسارات الإنزيمية',
    ] : locale === 'en' ? [
      'Physicochemical Basis of Drug Action',
      'Molecular Stereochemistry & 3D Receptor Fit',
      'Functional Groups, Ionization & Chemical Scaffolds',
      'Classical & Non-Classical Bioisosterism',
      'Drug Biotransformation & Enzymatic Pathways',
    ] : [
      'İlaç Etkisinin Fizikokimyasal Esasları',
      'Moleküler Stereokimya ve 3B Reseptör Uyumu',
      'Fonksiyonel Gruplar, İyonizasyon ve Kimyasal İskeletler',
      'Klasik ve Non-Klasik Biyoizosterizm',
      'İlaç Biyotransformasyonu ve Enzimatik Yolaklar',
    ],
    pharmModules: locale === 'ar' ? [
      'ديناميكا المستقبلات والقوى الجزيئية',
      'الديناميكا الدوائية: علاقة التركيز بالتأثير',
      'الحركية الدوائية (ADME) والتحول الحيوي في الجسم الحي',
      'علم أدوية الجهاز العصبي الذاتي',
      'علاجات الجهاز القلبي الوعائي والكلى',
      'علم أدوية الجهاز العصبي المركزي',
    ] : locale === 'en' ? [
      'Receptor Dynamics & Molecular Forces',
      'Pharmacodynamics: Concentration-Effect Dynamics',
      'Pharmacokinetics (ADME) & In Vivo Biotransformation',
      'Autonomic Nervous System Pharmacology',
      'Cardiovascular & Renal Therapeutics',
      'Central Nervous System Pharmacology',
    ] : [
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
      <section className="bg-white dark:bg-[#171717] border-b border-slate-200 dark:border-[#2F2F2F] py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <StickerBadge variant="green" size="sm">{copy.freemiumBadge}</StickerBadge>
            <StickerBadge variant="yellow" size="sm">{copy.freeLessonsBadge}</StickerBadge>
          </div>
          <h1 className="font-extrabold text-3xl sm:text-5xl tracking-tight text-slate-900 dark:text-[#ECECEC]">
            {copy.heroTitle}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-[#8E8E8E] max-w-3xl leading-relaxed">
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-[#2F2F2F] pb-4">
              <div className="space-y-1">
                <StickerBadge variant={course.badgeColor} size="sm">
                  {course.code}
                </StickerBadge>
                <h2 className="font-extrabold text-2xl sm:text-3xl tracking-tight text-slate-900 dark:text-[#ECECEC]">
                  {course.title}
                </h2>
                <p className="text-sm font-medium text-slate-500 dark:text-[#8E8E8E]">
                  {course.tagline}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-[#8E8E8E]">
                <div className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-slate-500 dark:text-[#8E8E8E]" />
                  <span>{copy.modulesCountLabel(course.modulesCount, course.totalLessons)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-500 dark:text-[#8E8E8E]" />
                  <span>{copy.hoursLabel(course.estimatedHours)}</span>
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-700 dark:text-[#CCCCCC] max-w-4xl">
              {course.description}
            </p>

            {/* Exam Alignment */}
            <div className="p-3.5 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center gap-2.5 text-xs text-slate-800 dark:text-[#ECECEC]">
              <ShieldCheck className="w-4 h-4 text-[#10A37F] shrink-0" />
              <span>
                {copy.examAlignmentLabel} <strong>{course.examAlignment}</strong>
              </span>
            </div>

            {/* Modules List */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#8E8E8E]">
                {copy.curriculumTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.modules.map((m, idx) => (
                  <Link
                    key={m.id}
                    to={`/courses/${course.id}/lessons/${idx * 5 + 1}`}
                    className="p-3.5 bg-slate-50 hover:bg-emerald-50/40 dark:bg-[#212121] dark:hover:bg-[#2A2A2A] border border-slate-200 dark:border-[#2F2F2F] rounded-xl flex items-center justify-between gap-2 transition-colors cursor-pointer group shadow-2xs"
                  >
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-semibold text-slate-500 dark:text-[#8E8E8E] uppercase">
                        {copy.moduleNumber(idx + 1)}
                      </span>
                      <h4 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-[#ECECEC] group-hover:text-[#10A37F] transition-colors">
                        {m.name}
                      </h4>
                    </div>
                    <span className="shrink-0 text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/60">
                      {copy.freeLessonsTag}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 dark:border-[#2F2F2F]">
              <span className="text-xs text-slate-500 dark:text-[#8E8E8E] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10A37F]" />
                {copy.noCreditCard}
              </span>
              <div className="flex flex-wrap gap-2.5">
                <Link to={`/courses/${course.id}/lessons/1`}>
                  <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}>
                    {copy.startFreeLessonBtn}
                  </Button>
                </Link>
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
