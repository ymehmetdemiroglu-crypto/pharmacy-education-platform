import React, { useState, useMemo } from 'react';
import { Card, Tag, Button, Input, Segmented, Progress, Tooltip } from 'antd';
import {
  FireFilled,
  WarningFilled,
  InfoCircleOutlined,
  SearchOutlined,
  ThunderboltOutlined,
  ExperimentOutlined,
  BookOutlined,
  CheckCircleFilled,
  ArrowRightOutlined,
  ReloadOutlined,
  SafetyCertificateOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import { useVizeTriageStore } from '../../stores/vizeTriageStore';
import { VizeTriageService } from '../../services/vizeTriageService';
import { HighYieldSlide, HighYieldSlideTier } from '../../types/vizeTriage.types';
import { VizeCramCarouselModal } from './VizeCramCarouselModal';

interface SlideHeatmapViewProps {
  onBackToCanvas?: () => void;
}

export const SlideHeatmapView: React.FC<SlideHeatmapViewProps> = () => {
  const {
    activeCourseId,
    activeTierFilter,
    setCourse,
    setTierFilter,
    startCramSession,
    completedSlideIds,
    failedTrapCodes,
    resetSession,
  } = useVizeTriageStore();

  const [searchQuery, setSearchQuery] = useState('');

  // Course Deck Statistics
  const deckStats = useMemo(() => {
    return VizeTriageService.getDeckStatistics(activeCourseId);
  }, [activeCourseId]);

  // Filtered Slides
  const filteredSlides = useMemo(() => {
    const base = VizeTriageService.getSlidesByCourse(activeCourseId);
    return base.filter((slide) => {
      // Tier filter
      if (activeTierFilter !== 'all' && slide.tier !== activeTierFilter) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = slide.title.toLowerCase().includes(query);
        const matchesConcept = slide.conceptSummary.toLowerCase().includes(query);
        const matchesTraps = slide.linkedTrapCodes.some((trap) =>
          trap.toLowerCase().includes(query)
        );
        const matchesPrompt = slide.predictPrompt.toLowerCase().includes(query);
        return matchesTitle || matchesConcept || matchesTraps || matchesPrompt;
      }
      return true;
    });
  }, [activeCourseId, activeTierFilter, searchQuery]);

  const getTierBadge = (tier: HighYieldSlideTier, score: number) => {
    switch (tier) {
      case 'CRITICAL_TIER_1':
        return (
          <span
            data-testid="thermal-badge-red"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30"
          >
            <FireFilled className="text-red-500" />
            <span>HYS: {score} 🔥 Soru Garantili</span>
          </span>
        );
      case 'SUPPORTING_TIER_2':
        return (
          <span
            data-testid="thermal-badge-amber"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30"
          >
            <WarningFilled className="text-amber-500" />
            <span>HYS: {score} ⚠️ Orta Risk</span>
          </span>
        );
      case 'CONTEXT_TIER_3':
      default:
        return (
          <span
            data-testid="thermal-badge-cool"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/30"
          >
            <InfoCircleOutlined />
            <span>HYS: {score} ❄️ Düşük İhtimal</span>
          </span>
        );
    }
  };

  return (
    <div
      data-testid="slide-heatmap-view"
      className="max-w-6xl mx-auto py-6 px-4 sm:px-6 flex flex-col gap-6 animate-fadeIn text-slate-900 dark:text-[#ECECEC]"
    >
      {/* Hero Header & Pareto Stats */}
      <section className="bg-white dark:bg-[#171717] rounded-2xl border border-slate-200 dark:border-[#2F2F2F] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold border border-red-500/30">
                <FireFilled className="text-red-500" /> Vize Triage Engine (HYS™)
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/30">
                <SafetyCertificateOutlined /> FSEK No:5846 İhlalsiz Sıfır-Sunucu Sandbox
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight m-0 text-slate-900 dark:text-[#ECECEC]">
              Slayt Isı Haritası & Vize Kampı
            </h1>
            <p className="text-sm text-slate-500 dark:text-[#B4B4B4] mt-2 mb-0 max-w-2xl leading-relaxed">
              Yüzlerce sayfalık ders slaytları arasında kaybolmayın. Vize Triage Algoritması,
              çıkmış sınav frekansları, hoca vurguları ve amfi hata oranlarına göre en kritik %20
              slaytı belirler.
            </p>

            {/* Quick Actions */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button
                type="primary"
                data-testid="hero-start-cram-btn"
                onClick={() => startCramSession(0)}
                icon={<ThunderboltOutlined />}
                className="h-10 px-5 rounded-xl font-bold text-sm bg-[#10A37F] hover:bg-[#0E8C6D] border-0 text-white shadow-xs flex items-center gap-2"
              >
                1-Tıkla Vize Kampına Başla ⚡ ({deckStats.criticalTierCount} Kritik Slayt)
              </Button>

              {completedSlideIds.length > 0 && (
                <Button
                  onClick={resetSession}
                  icon={<ReloadOutlined />}
                  className="h-10 px-4 rounded-xl text-xs font-semibold border-slate-200 dark:border-[#2F2F2F] text-slate-600 dark:text-[#B4B4B4]"
                >
                  İlerlemeyi Sıfırla ({completedSlideIds.length} Tamamlandı)
                </Button>
              )}
            </div>
          </div>

          {/* Pareto Deck Metrics Card */}
          <div className="w-full lg:w-auto bg-slate-50 dark:bg-[#212121] p-5 rounded-2xl border border-slate-200 dark:border-[#2F2F2F] flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-[11px] font-medium text-slate-500 dark:text-[#8E8E8E] uppercase tracking-wider">
                  Ortalama Sınav Verimi
                </span>
                <span className="text-2xl font-bold text-red-500 flex items-center gap-1">
                  HYS {deckStats.averageHYS} <span className="text-xs text-slate-400">/ 100</span>
                </span>
              </div>
              <div className="h-8 w-px bg-slate-200 dark:bg-[#2F2F2F]" />
              <div className="flex flex-col">
                <span className="text-[11px] font-medium text-slate-500 dark:text-[#8E8E8E] uppercase tracking-wider">
                  Soru Garantili
                </span>
                <span className="text-2xl font-bold text-emerald-500">
                  {deckStats.criticalTierCount}{' '}
                  <span className="text-xs text-slate-400">/ {deckStats.totalSlides} Slayt</span>
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-[#2F2F2F] text-[11px] text-slate-500 dark:text-[#8E8E8E] flex items-center gap-2">
              <BarChartOutlined className="text-emerald-500" />
              <span>
                <strong>Pareto Kuralı:</strong> Slaytların %20'si vize sorularının %80'ini getirir.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Control Bar: Course Selector + Search + Thermal Filter */}
      <section className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Course Switcher */}
        <Segmented
          value={activeCourseId}
          onChange={(val) => setCourse(val as 'medchem' | 'pharmacology')}
          options={[
            {
              value: 'medchem',
              label: (
                <div
                  data-testid="segment-medchem"
                  onClick={() => setCourse('medchem')}
                  className="flex items-center gap-2 px-2 py-1 font-semibold text-xs"
                >
                  <ExperimentOutlined className="text-blue-500" />
                  <span>Farmasötik Kimya</span>
                </div>
              ),
            },
            {
              value: 'pharmacology',
              label: (
                <div
                  data-testid="segment-pharmacology"
                  onClick={() => setCourse('pharmacology')}
                  className="flex items-center gap-2 px-2 py-1 font-semibold text-xs"
                >
                  <BookOutlined className="text-amber-500" />
                  <span>Farmakoloji</span>
                </div>
              ),
            },
          ]}
          className="bg-slate-100 dark:bg-[#171717] p-1 rounded-xl border border-slate-200 dark:border-[#2F2F2F]"
        />

        {/* Search Input */}
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Slayt adı, mekanizma veya tuzak kodu ara (örn. Schild, Asetilkolin)..."
            prefix={<SearchOutlined className="text-slate-400" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            allowClear
            className="rounded-xl h-10 bg-white dark:bg-[#171717] border-slate-200 dark:border-[#2F2F2F]"
          />
        </div>

        {/* Tier Filter Tabs */}
        <Segmented
          value={activeTierFilter}
          onChange={(val) => setTierFilter(val as HighYieldSlideTier | 'all')}
          options={[
            {
              value: 'all',
              label: (
                <span
                  data-testid="tier-filter-all"
                  onClick={() => setTierFilter('all')}
                  className="text-xs font-medium"
                >
                  Tümü ({deckStats.totalSlides})
                </span>
              ),
            },
            {
              value: 'CRITICAL_TIER_1',
              label: (
                <span
                  data-testid="tier-filter-critical"
                  onClick={() => setTierFilter('CRITICAL_TIER_1')}
                  className="text-xs font-semibold text-red-500 flex items-center gap-1"
                >
                  <FireFilled /> Soru Garantili ({deckStats.criticalTierCount})
                </span>
              ),
            },
            {
              value: 'SUPPORTING_TIER_2',
              label: (
                <span
                  data-testid="tier-filter-supporting"
                  onClick={() => setTierFilter('SUPPORTING_TIER_2')}
                  className="text-xs font-semibold text-amber-500 flex items-center gap-1"
                >
                  <WarningFilled /> Orta Risk ({deckStats.supportingTierCount})
                </span>
              ),
            },
            {
              value: 'CONTEXT_TIER_3',
              label: (
                <span
                  data-testid="tier-filter-context"
                  onClick={() => setTierFilter('CONTEXT_TIER_3')}
                  className="text-xs font-medium text-slate-400"
                >
                  Düşük ({deckStats.contextTierCount})
                </span>
              ),
            },
          ]}
          className="bg-slate-100 dark:bg-[#171717] p-1 rounded-xl border border-slate-200 dark:border-[#2F2F2F]"
        />
      </section>

      {/* Slide Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSlides.map((slide, index) => {
          const isCompleted = completedSlideIds.includes(slide.slideId);
          const hasFailedTrap = slide.linkedTrapCodes.some((t) => failedTrapCodes.includes(t));

          return (
            <Card
              key={slide.slideId}
              data-testid={`slide-card-${slide.slideId}`}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-[#2F2F2F] bg-white dark:bg-[#171717] hover:border-[#10A37F]/60 dark:hover:border-[#10A37F]/60 transition-all duration-200 shadow-2xs hover:shadow-sm"
              styles={{ body: { padding: '20px', display: 'flex', flexDirection: 'column', height: '100%' } }}
            >
              {/* Header with Slide # and Thermal Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-slate-500 dark:text-[#8E8E8E]">
                  SLAYT #{slide.slideNumber}
                </span>
                {getTierBadge(slide.tier, slide.highYieldScore)}
              </div>

              {/* Title & Concept */}
              <div className="flex-1 mb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-[#ECECEC] m-0 group-hover:text-[#10A37F] transition-colors leading-snug">
                  {slide.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-[#B4B4B4] mt-2 mb-3 line-clamp-2 leading-relaxed">
                  {slide.conceptSummary}
                </p>

                {/* Provenance Citation */}
                <div className="text-[11px] font-mono text-slate-400 dark:text-[#6E6E6E] truncate mb-3">
                  📄 {slide.lectureDeckId}, Slayt {slide.slideNumber}
                </div>

                {/* Linked Traps Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {slide.linkedTrapCodes.map((trap) => (
                    <Tag
                      key={trap}
                      color={hasFailedTrap ? 'error' : 'default'}
                      className="text-[10px] font-mono rounded-lg border-slate-200 dark:border-[#2F2F2F] dark:bg-[#212121] dark:text-[#ECECEC] m-0"
                    >
                      ⚠️ {trap}
                    </Tag>
                  ))}
                </div>

                {/* Factor Breakdown Bar */}
                <div className="bg-slate-50 dark:bg-[#212121] p-2.5 rounded-xl border border-slate-100 dark:border-[#282828] text-[11px] grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Çıkmış Frekansı:</span>
                    <span className="font-bold text-slate-700 dark:text-[#ECECEC]">
                      {(slide.rawFactors.c_freq * 33.3).toFixed(0)}% Ağırlık
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Amfi Yanılma:</span>
                    <span className="font-bold text-red-500">
                      {(slide.rawFactors.m_cohort * 40).toFixed(0)}% Hata
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer CTA & Status */}
              <div className="pt-3 border-t border-slate-100 dark:border-[#262626] flex items-center justify-between gap-3">
                {isCompleted ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircleFilled /> Tamamlandı
                  </span>
                ) : (
                  <span className="text-xs text-slate-400">Henüz Çözülmedi</span>
                )}

                <Button
                  type="primary"
                  size="small"
                  onClick={() => startCramSession(index)}
                  className="rounded-xl text-xs font-bold bg-[#10A37F] hover:bg-[#0E8C6D] border-0 text-white flex items-center gap-1"
                >
                  <span>Tuzağı Çöz</span>
                  <ArrowRightOutlined className="text-[10px]" />
                </Button>
              </div>
            </Card>
          );
        })}
      </section>

      {/* Empty State */}
      {filteredSlides.length === 0 && (
        <div className="bg-white dark:bg-[#171717] rounded-2xl border border-dashed border-slate-300 dark:border-[#2F2F2F] p-12 text-center">
          <InfoCircleOutlined className="text-3xl text-slate-400 mb-3" />
          <h3 className="text-base font-semibold text-slate-800 dark:text-[#ECECEC]">
            Kriterlere uygun slayt bulunamadı
          </h3>
          <p className="text-xs text-slate-500 dark:text-[#8E8E8E] max-w-sm mx-auto mt-1 mb-4">
            Arama terimini değiştirebilir veya filtreyi "Tümü" olarak ayarlayabilirsiniz.
          </p>
          <Button onClick={() => { setSearchQuery(''); setTierFilter('all'); }}>
            Filtreleri Temizle
          </Button>
        </div>
      )}

      {/* 1-Click Vize Cram Carousel Modal */}
      <VizeCramCarouselModal />
    </div>
  );
};
