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
                  <Link
                    key={m.id}
                    to={`/courses/${course.id}/lessons/${idx * 5 + 1}`}
                    className="p-3 bg-gray-50 hover:bg-amber-50 dark:bg-[#1E293B] dark:hover:bg-[#28384E] border-2 border-black dark:border-slate-700 flex items-center justify-between gap-2 transition-colors cursor-pointer group"
                  >
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono font-semibold text-gray-700 dark:text-gray-300 uppercase">
                        {copy.moduleNumber(idx + 1)}
                      </span>
                      <h4 className="font-display font-bold text-xs sm:text-sm group-hover:text-[#4D96FF] transition-colors">
                        {m.name}
                      </h4>
                    </div>
                    <span className="shrink-0 text-[10px] font-mono font-bold bg-[#6BCB77] text-black px-1.5 py-0.5 border border-black shadow-[1px_1px_0px_#000000]">
                      {copy.freeLessonsTag}
                    </span>
                  </Link>
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
