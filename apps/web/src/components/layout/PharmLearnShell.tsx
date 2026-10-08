import React, { useState, useEffect } from 'react';
import { ConfigProvider, App, Drawer, Dropdown, FloatButton, Tooltip, Button, Segmented, theme } from 'antd';
import type { MenuProps } from 'antd';
import {
  RobotOutlined,
  SunOutlined,
  MoonOutlined,
  DownOutlined,
  BookOutlined,
  ExperimentOutlined,
  LogoutOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  FolderOpenOutlined,
  CrownOutlined,
  ThunderboltOutlined,
  FireFilled,
  EditOutlined,
  TeamOutlined,
  SoundOutlined,
} from '@ant-design/icons';
import { TutorChatPane } from './TutorChatPane';
import { ArtifactCanvas } from './ArtifactCanvas';
import { DynamicLessonCanvas } from '../canvas/DynamicLessonCanvas';
import { MinimalCourseDashboard } from '../dashboard/MinimalCourseDashboard';
import { SlideHeatmapView } from '../triage/SlideHeatmapView';
import { SlideReAnimatorView } from '../reanimator/SlideReAnimatorView';
import { TactileMechanismView } from '../tactile/TactileMechanismView';
import { FacultyAmfiLounge } from '../amfi/FacultyAmfiLounge';
import { MetrobusAudioView } from '../metrobus/MetrobusAudioView';
import { CompactPulseIndicator } from '../study/CompactPulseIndicator';
import { StudentDocumentVaultModal } from '../vault/StudentDocumentVaultModal';
import { DailyChallengeModal } from '../study/DailyChallengeModal';
import { ConnectivitySentinel } from '../common/ConnectivitySentinel';

import { useAuth } from '@pharmacy/platform';
import { PaywallModal } from '@pharmacy/ui';
import { callCreateCheckoutSession } from '../../lib/billing';
import { allClientLessons } from '../../data/curriculum.client';

interface PharmLearnShellProps {
  onOpenAuthModal?: () => void;
}

export const PharmLearnShell: React.FC<PharmLearnShellProps> = ({ onOpenAuthModal }) => {
  const { user, logout, startTrial } = useAuth();

  // Theme state: default dark per user PRD
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('pep_codex_theme');
      if (stored) return stored === 'dark';
      return true;
    }
    return true;
  });

  const [activeConceptId, setActiveConceptId] = useState<string>('rr:receptor_tanimi');
  const [selectedLectureId, setSelectedLectureId] = useState<string>('medchem-1');
  const [tutorQuery, setTutorQuery] = useState<string | null>(null);

  // 2-Pane desktop layout state: open by default per /grill-me agreement
  const [isTutorOpen, setIsTutorOpen] = useState(true);

  // Active view: Canvas, Dashboard, Tactile, Reanimator, Triage, Amfi, or Metrobus
  const [activeView, setActiveView] = useState<'canvas' | 'dashboard' | 'triage' | 'reanimator' | 'tactile' | 'amfi' | 'metrobus'>('canvas');

  // Mobile drawer state
  const [isMobileTutorOpen, setIsMobileTutorOpen] = useState(false);

  // Student Document Vault modal state
  const [isVaultOpen, setIsVaultOpen] = useState(false);

  // Daily Challenge modal state
  const [isDailyChallengeOpen, setIsDailyChallengeOpen] = useState(false);

  // Academic Pass / Paywall modal state
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);


  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pep_codex_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pep_codex_theme', 'light');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleAskTutor = (query: string) => {
    setTutorQuery(query);
    if (window.innerWidth < 768) {
      setIsMobileTutorOpen(true);
    } else {
      setIsTutorOpen(true);
    }
  };

  const handleNavigateToSlide = (slideNumber: number) => {
    const slideToConceptMap: Record<number, string> = {
      2: 'concept-1',
      3: 'concept-1',
      5: 'concept-1',
      6: 'concept-1',
      9: 'concept-2',
      10: 'concept-2',
      11: 'concept-2',
      12: 'concept-2',
      13: 'concept-3',
      14: 'concept-3',
      15: 'concept-4',
      17: 'concept-4',
      19: 'concept-4',
      20: 'concept-6',
      21: 'concept-6',
      22: 'concept-7',
      23: 'concept-7',
      24: 'concept-8',
      25: 'concept-8',
      26: 'concept-9',
      28: 'concept-9',
      30: 'concept-9',
      33: 'concept-10',
    };

    const targetSection = slideToConceptMap[slideNumber] || 'concept-1';
    const el = document.getElementById(targetSection);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (window.innerWidth < 768) {
      setIsMobileTutorOpen(false);
    }
  };

  const handleExecuteCanvasAction = (target: string) => {
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (window.innerWidth < 768) {
      setIsMobileTutorOpen(false);
    }
  };

  // 22-Lesson Curriculum Definitions for MedChem and Pharmacology
  const medchemLessons = [
    { id: 'medchem-1', title: 'İlaç Reseptör Etkileşimi (Kimyasal Bağlar)', slides: '33 Slayt' },
    { id: 'medchem-2', title: 'İyonlaşma Dengesi ve pH Bağımlı Dağılma', slides: '28 Slayt' },
    { id: 'medchem-3', title: 'Lokal Anesteziklerde SAR ve İzosterizm', slides: '30 Slayt' },
    { id: 'medchem-4', title: 'Genel Anesteziklerde Membran Etkileşimleri', slides: '26 Slayt' },
    { id: 'medchem-5', title: 'Sedatif-Hipnotiklerde Kimyasal Sınıflandırma', slides: '32 Slayt' },
    { id: 'medchem-6', title: 'Antiepileptik İlaçlarda Farmakofor Analizi', slides: '34 Slayt' },
    { id: 'medchem-7', title: 'Antipsikotiklerde Fenotiyazin SAR ve Biyoizosterizm', slides: '35 Slayt' },
    { id: 'medchem-8', title: 'Antidepresanlarda Geri Alım İnhibitör Yapıları', slides: '31 Slayt' },
    { id: 'medchem-9', title: 'Opioid Analjeziklerde Morfinan İskeleti ve SAR', slides: '36 Slayt' },
    { id: 'medchem-10', title: 'NSAİİ Ajanlarda Karboksilik Asit Türevleri', slides: '29 Slayt' },
  ];

  const pharmLessons = [
    { id: 'pharm-1', title: 'Reseptör Tipleri ve Sinyal İletim Mekanizmaları', slides: '40 Slayt' },
    { id: 'pharm-2', title: 'İkinci Haberciler (cAMP, IP3/DAG) ve Kaskatlar', slides: '35 Slayt' },
    { id: 'pharm-3', title: 'Konsantrasyon-Etki İlişkileri ve Agonist Tipleri', slides: '32 Slayt' },
    { id: 'pharm-4', title: 'Antagonizma Türleri (Yarışmalı vs Yarışmasız)', slides: '28 Slayt' },
    { id: 'pharm-5', title: 'İlaç Absorpsiyonu ve Biyoyararlanım', slides: '30 Slayt' },
    { id: 'pharm-6', title: 'Dağılım Hacmi ve Plazma Proteinlerine Bağlanma', slides: '33 Slayt' },
    { id: 'pharm-7', title: 'Kolinerjik Sistem ve Reseptör Alt Tipleri', slides: '42 Slayt' },
    { id: 'pharm-8', title: 'Adrenerjik Sistem ve Sempatomimetikler', slides: '38 Slayt' },
    { id: 'pharm-9', title: 'Otonom Sinir Sistemi İlaç Etkileşimleri', slides: '36 Slayt' },
    { id: 'pharm-10', title: 'Kardiyovasküler Farmakolojiye Giriş', slides: '45 Slayt' },
    { id: 'pharm-11', title: 'Antihipertansif İlaç Grupları ve Mekanizmaları', slides: '40 Slayt' },
    { id: 'pharm-12', title: 'Santral Sinir Sistemi Farmakolojisi ve Nörotransmisyon', slides: '44 Slayt' },
  ];

  const lectureMenuItems: MenuProps['items'] = [
    {
      key: 'course-header-medchem',
      type: 'group',
      label: (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          <ExperimentOutlined className="text-sm" /> Farmasötik Kimya (10 Ders)
        </span>
      ),
      children: medchemLessons.map((l) => ({
        key: l.id,
        label: (
          <div className="flex items-center justify-between gap-4 py-1">
            <div>
              <div className={`font-semibold text-xs ${selectedLectureId === l.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-800 dark:text-[#ECECEC]'}`}>
                {l.title}
              </div>
              <div className="text-[11px] text-gray-500">{l.slides}</div>
            </div>
            {selectedLectureId === l.id && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                AKTİF
              </span>
            )}
          </div>
        ),
      })),
    },
    {
      type: 'divider',
    },
    {
      key: 'course-header-pharm',
      type: 'group',
      label: (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
          <BookOutlined className="text-sm" /> Farmakoloji (12 Ders)
        </span>
      ),
      children: pharmLessons.map((l) => ({
        key: l.id,
        label: (
          <div className="flex items-center justify-between gap-4 py-1">
            <div>
              <div className={`font-semibold text-xs ${selectedLectureId === l.id ? 'text-amber-600 dark:text-amber-400' : 'text-slate-800 dark:text-[#ECECEC]'}`}>
                {l.title}
              </div>
              <div className="text-[11px] text-gray-500">{l.slides}</div>
            </div>
            {selectedLectureId === l.id && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                AKTİF
              </span>
            )}
          </div>
        ),
      })),
    },
  ];

  const selectedLesson = allClientLessons[selectedLectureId] || allClientLessons['mc-mod1-les1'];
  const isMedChem = selectedLectureId.startsWith('medchem') || selectedLesson?.courseId === 'medchem';
  const courseDisplayPrefix = isMedChem ? 'Farmasötik Kimya ›' : 'Farmakoloji ›';
  const lessonDisplayTitle = selectedLectureId === 'medchem-1'
    ? 'İlaç Reseptör Etkileşimi'
    : (typeof selectedLesson?.title === 'object' ? (selectedLesson.title.tr || selectedLectureId) : (selectedLesson?.title || selectedLectureId));

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#10A37F', // OpenAI Emerald
          colorSuccess: '#10A37F',
          colorWarning: '#F59E0B',
          colorError: '#EF4444',
          colorInfo: '#10A37F',
          colorBgBase: isDark ? '#212121' : '#FFFFFF',
          colorBgContainer: isDark ? '#171717' : '#FFFFFF',
          colorBgLayout: isDark ? '#212121' : '#F9F9F9',
          colorBorder: isDark ? '#2F2F2F' : '#E5E5E5',
          colorBorderSecondary: isDark ? '#262626' : '#F0F0F0',
          colorText: isDark ? '#ECECEC' : '#0D0D0D',
          colorTextSecondary: isDark ? '#B4B4B4' : '#5D5D5D',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          borderRadius: 12,
          borderRadiusLG: 16,
          borderRadiusSM: 8,
          borderRadiusXS: 6,
        },
        components: {
          Card: {
            headerHeight: 44,
            headerFontSize: 13,
            bodyPadding: 20,
            borderRadiusLG: 16,
          },
          Table: {
            headerBg: isDark ? '#262626' : '#F9F9F9',
            headerColor: isDark ? '#ECECEC' : '#333333',
            rowHoverBg: isDark ? '#202020' : '#F4F4F4',
            borderRadius: 12,
          },
          Segmented: {
            trackBg: isDark ? '#2A2A2A' : '#EFEFEF',
            itemSelectedBg: isDark ? '#10A37F' : '#FFFFFF',
            itemSelectedColor: isDark ? '#FFFFFF' : '#0D0D0D',
            borderRadius: 12,
            borderRadiusSM: 8,
          },
          Tag: {
            borderRadiusSM: 8,
          },
          Button: {
            controlHeight: 36,
            borderRadius: 12,
            borderRadiusSM: 8,
            borderRadiusLG: 16,
          },
          Input: {
            borderRadius: 12,
          },
        },
      }}
    >
      <App>
        <div className="flex flex-col h-screen w-screen overflow-hidden bg-white dark:bg-[#212121] text-slate-900 dark:text-[#ECECEC] font-sans antialiased">
        {/* Ultra-Minimalist Top Bar (48px) */}
        <header className="h-12 shrink-0 border-b border-slate-200 dark:border-[#2F2F2F] bg-white dark:bg-[#171717] px-4 flex items-center justify-between z-30 select-none">
          {/* Left: Brand + View Switcher + Course/Lecture Dropdown */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-[#10A37F] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                PL
              </div>
              <span className="font-bold text-sm tracking-tight hidden sm:inline">
                PharmLearn
              </span>
            </div>

            <div className="h-4 w-px bg-slate-200 dark:bg-[#2F2F2F] hidden sm:block" />

            {/* View Switcher: Tuval vs Pano vs Çizerek Öğren vs Slayt Canlandır vs Vize Triage vs Sanal Amfi */}
            <Segmented
              value={activeView}
              onChange={(val) => setActiveView(val as 'canvas' | 'dashboard' | 'triage' | 'reanimator' | 'tactile' | 'amfi')}
              options={[
                {
                  label: (
                    <span className="flex items-center gap-1.5" title="Çalışma Tuvali">
                      <FileTextOutlined />
                      <span className="hidden sm:inline">Çalışma Tuvali</span>
                    </span>
                  ),
                  value: 'canvas',
                },
                {
                  label: (
                    <span className="flex items-center gap-1.5" title="Ders Panosu">
                      <AppstoreOutlined />
                      <span className="hidden sm:inline">Ders Panosu</span>
                    </span>
                  ),
                  value: 'dashboard',
                },
                {
                  label: (
                    <span className="flex items-center gap-1.5 text-emerald-500 font-semibold" title="Sanal Amfi & Fakülte Masası">
                      <TeamOutlined className="text-emerald-500" />
                      <span className="hidden sm:inline">Sanal Amfi 🏛️</span>
                    </span>
                  ),
                  value: 'amfi',
                },
                {
                  label: (
                    <span className="flex items-center gap-1.5 text-amber-500 font-semibold" title="Metrobüs Sesli Mod">
                      <SoundOutlined className="text-amber-500" />
                      <span className="hidden sm:inline">Metrobüs Modu 🚌</span>
                    </span>
                  ),
                  value: 'metrobus',
                },
                {
                  label: (
                    <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold" title="Çizerek Öğren">
                      <EditOutlined className="text-emerald-600 dark:text-emerald-400" />
                      <span className="hidden sm:inline">Çizerek Öğren ✍️</span>
                    </span>
                  ),
                  value: 'tactile',
                },
                {
                  label: (
                    <span className="flex items-center gap-1.5 text-blue-500 font-semibold" title="Slayt Canlandır">
                      <ExperimentOutlined className="text-blue-500" />
                      <span className="hidden sm:inline">Slayt Canlandır 🔬</span>
                    </span>
                  ),
                  value: 'reanimator',
                },
                {
                  label: (
                    <span className="flex items-center gap-1.5 text-red-500 font-semibold" title="Vize Isı Haritası">
                      <FireFilled className="text-red-500" />
                      <span className="hidden sm:inline">Vize Triage ⚡</span>
                    </span>
                  ),
                  value: 'triage',
                },
              ]}
              className="inline-flex text-xs font-medium bg-slate-100 dark:bg-[#2A2A2A]"
            />

            {/* Lecture Dropdown Selector */}
            <Dropdown
              menu={{
                items: lectureMenuItems,
                onClick: ({ key }) => {
                  setSelectedLectureId(key);
                  setActiveView('canvas');
                },
              }}
              trigger={['click']}
            >
              <Button
                type="text"
                className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-slate-700 dark:text-[#ECECEC]"
              >
                <span className="text-gray-400 hidden md:inline">{courseDisplayPrefix}</span>
                <span className="font-semibold truncate max-w-[110px] sm:max-w-xs">
                  {lessonDisplayTitle}
                </span>
                <DownOutlined className="text-[10px] text-gray-400" />
              </Button>
            </Dropdown>
          </div>

          {/* Right: Actions (Study Pulse, Theme, User, AI Tutor Toggle) */}
          <div className="flex items-center gap-2">
            {/* Live Co-Presence & Pomodoro Indicator */}
            <CompactPulseIndicator />

            {/* Academic Pass / Premium Modal Trigger */}
            <Tooltip title="Akademik Paketler & Ücretsiz Deneme">
              <Button
                type="text"
                onClick={() => setIsPaywallOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold text-[#10A37F] bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 shadow-2xs"
                icon={<CrownOutlined className="text-[#10A37F] text-xs" />}
              >
                <span>Premium</span>
              </Button>
            </Tooltip>

            {/* Student Notes Vault Trigger */}
            <Tooltip title="Ders Notlarım & Doküman Deposu">
              <Button
                type="text"
                onClick={() => setIsVaultOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs text-slate-700 dark:text-[#ECECEC] hover:text-[#10A37F]"
                icon={<FolderOpenOutlined className="text-emerald-500 text-sm" />}
              >
                <span>Notlarım</span>
              </Button>
            </Tooltip>

            {/* Daily 10 High Yield Challenge Trigger */}
            <Tooltip title="Günün 10 Yüksek Verimli Vize Sorusu (FSRS-4.5)">
              <Button
                type="text"
                onClick={() => setIsDailyChallengeOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold text-amber-500 bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 shadow-2xs"
                icon={<ThunderboltOutlined className="text-amber-500 text-xs" />}
              >
                <span>Günün 10'u ⚡</span>
              </Button>
            </Tooltip>


            {/* Sanal Amfi Live Presence Quick Trigger */}
            <Tooltip title="Sanal Amfi & Fakülte Masasını Aç">
              <button
                type="button"
                onClick={() => setActiveView('amfi')}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 transition cursor-pointer"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>42 Amfide</span>
              </button>
            </Tooltip>

            {/* Theme Toggle */}
            <Tooltip title={isDark ? 'Açık Temaya Geç' : 'Koyu Temaya Geç'}>
              <Button
                type="text"
                onClick={handleToggleTheme}
                className="flex items-center justify-center w-8 h-8 rounded-xl text-slate-600 dark:text-[#ECECEC]"
                icon={isDark ? <SunOutlined className="text-amber-400 text-sm" /> : <MoonOutlined className="text-slate-600 text-sm" />}
              />
            </Tooltip>

            {/* User Account Indicator */}
            {user ? (
              <Button
                type="text"
                onClick={logout}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs text-slate-600 dark:text-[#ECECEC]"
                title="Çıkış Yap"
                icon={<UserOutlined />}
              >
                <span className="max-w-[100px] truncate">{user.email?.split('@')[0]}</span>
                <LogoutOutlined className="text-gray-400 text-[10px]" />
              </Button>
            ) : onOpenAuthModal ? (
              <Button
                type="primary"
                onClick={onOpenAuthModal}
                className="rounded-xl px-4 font-medium text-xs bg-[#10A37F] hover:bg-[#0E8C6D] border-0"
              >
                Giriş Yap
              </Button>
            ) : null}

            {/* Desktop AI Tutor Panel Toggle */}
            {activeView === 'canvas' && (
              <Button
                type={isTutorOpen ? 'primary' : 'default'}
                ghost={isTutorOpen}
                onClick={() => setIsTutorOpen(!isTutorOpen)}
                icon={<RobotOutlined className="text-emerald-500" />}
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl text-xs font-semibold shadow-xs"
              >
                <span>AI Tutor</span>
                {isTutorOpen ? (
                  <MenuFoldOutlined className="text-gray-400 text-xs ml-0.5" />
                ) : (
                  <MenuUnfoldOutlined className="text-gray-400 text-xs ml-0.5" />
                )}
              </Button>
            )}
          </div>
        </header>

        {/* 2-Pane Workspace, Dashboard, or Vize Triage */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Main Content Area */}
          {activeView === 'metrobus' ? (
            <main className="flex-1 h-full overflow-y-auto bg-slate-50 dark:bg-[#212121]">
              <MetrobusAudioView onBackToDashboard={() => setActiveView('dashboard')} />
            </main>
          ) : activeView === 'amfi' ? (
            <main className="flex-1 h-full overflow-y-auto bg-slate-50 dark:bg-[#212121]">
              <FacultyAmfiLounge
                initialCourseId={isMedChem ? 'medchem' : 'pharmacology'}
                onNavigateToModule={(_moduleId, slideNumber) => {
                  setActiveView('canvas');
                  if (slideNumber) handleNavigateToSlide(slideNumber);
                }}
              />
            </main>
          ) : activeView === 'tactile' ? (
            <main className="flex-1 h-full overflow-y-auto bg-slate-50 dark:bg-[#212121]">
              <TactileMechanismView />
            </main>
          ) : activeView === 'reanimator' ? (
            <main className="flex-1 h-full overflow-y-auto bg-slate-50 dark:bg-[#212121]">
              <SlideReAnimatorView onBackToDashboard={() => setActiveView('dashboard')} />
            </main>
          ) : activeView === 'triage' ? (
            <main className="flex-1 h-full overflow-y-auto bg-slate-50 dark:bg-[#212121]">
              <SlideHeatmapView onBackToCanvas={() => setActiveView('canvas')} />
            </main>
          ) : activeView === 'dashboard' ? (
            <main className="flex-1 h-full overflow-y-auto bg-slate-50 dark:bg-[#212121]">
              <MinimalCourseDashboard
                onSelectLecture={(id) => {
                  setSelectedLectureId(id);
                  setActiveView('canvas');
                }}
                onAskTutor={(prompt) => {
                  setActiveView('canvas');
                  handleAskTutor(prompt);
                }}
                onOpenTriage={() => setActiveView('triage')}
                onOpenReanimator={() => setActiveView('reanimator')}
                onOpenTactile={() => setActiveView('tactile')}
                onOpenAmfi={() => setActiveView('amfi')}
                onOpenMetrobus={() => setActiveView('metrobus')}
              />
            </main>
          ) : (
            <>
              {/* Main Study Canvas (Spacious Left/Center Pane) */}
              <main className="flex-1 h-full overflow-hidden flex flex-col">
                {selectedLectureId === 'medchem-1' ? (
                  <ArtifactCanvas
                    onAskTutor={handleAskTutor}
                    activeConceptId={activeConceptId}
                    onActiveConceptChange={setActiveConceptId}
                  />
                ) : (
                  <DynamicLessonCanvas
                    lessonId={selectedLectureId}
                    onAskTutor={handleAskTutor}
                  />
                )}
              </main>

              {/* Right Pane: AI Socratic Tutor (Desktop) */}
              {isTutorOpen && (
                <aside className="hidden md:flex flex-col w-[380px] shrink-0 h-full border-l border-slate-200 dark:border-[#2F2F2F] bg-white dark:bg-[#171717] z-20">
                  <TutorChatPane
                    activeConceptId={activeConceptId}
                    onNavigateToSlide={handleNavigateToSlide}
                    onExecuteCanvasAction={handleExecuteCanvasAction}
                    externalPrompt={tutorQuery}
                    onClearExternalPrompt={() => setTutorQuery(null)}
                    onClose={() => setIsTutorOpen(false)}
                  />
                </aside>
              )}

              {/* Mobile Slide-Over AI Tutor Drawer */}
              <Drawer
                placement="right"
                open={isMobileTutorOpen}
                onClose={() => setIsMobileTutorOpen(false)}
                width="100%"
                styles={{ body: { padding: 0 } }}
              >
                <TutorChatPane
                  activeConceptId={activeConceptId}
                  onNavigateToSlide={handleNavigateToSlide}
                  onExecuteCanvasAction={handleExecuteCanvasAction}
                  externalPrompt={tutorQuery}
                  onClearExternalPrompt={() => setTutorQuery(null)}
                  onClose={() => setIsMobileTutorOpen(false)}
                />
              </Drawer>

              {/* Floating AI Tutor Bubble Button (Mobile Only) */}
              <button
                type="button"
                onClick={() => setIsMobileTutorOpen(true)}
                className="md:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#10A37F] hover:bg-[#0E8C6D] active:scale-95 text-white font-medium px-4 py-3 rounded-2xl shadow-lg transition-transform cursor-pointer"
              >
                <RobotOutlined className="text-base text-yellow-300" />
                <span className="text-xs font-semibold">AI Tutor'a Sor</span>
              </button>
            </>
          )}
        </div>

        {/* Network & Offline Connectivity Sentinel */}
        <ConnectivitySentinel />

        {/* Student Personal Notes Vault & AI Study Guide Synthesizer */}
        <StudentDocumentVaultModal
          open={isVaultOpen}
          onClose={() => setIsVaultOpen(false)}
          onAskTutorAboutExcerpt={handleAskTutor}
        />

        {/* Daily 10 High-Yield Challenge Loop Modal */}
        <DailyChallengeModal
          open={isDailyChallengeOpen}
          onClose={() => setIsDailyChallengeOpen(false)}
        />

        {/* Academic Pass & Paywall Modal */}

        <PaywallModal
          isOpen={isPaywallOpen}
          onClose={() => setIsPaywallOpen(false)}
          canStartTrial={user?.plan === 'free' && !user?.trialUsed}
          onStartTrial={async () => {
            if (startTrial) {
              await startTrial();
            }
            setIsPaywallOpen(false);
          }}
          onSelectPlan={async (plan) => {
            const planIdMap: Record<string, 'monthly' | 'semester_pass' | 'annual'> = {
              monthly: 'monthly',
              semester: 'semester_pass',
              annual: 'annual',
            };
            const mappedPlanId = planIdMap[plan] || 'semester_pass';
            try {
              const res = await callCreateCheckoutSession({
                courseId: 'medchem',
                planId: mappedPlanId,
                currency: 'TRY',
                returnUrl: `${window.location.origin}/studio?checkout=success`,
              });
              if (res?.data?.checkoutUrl) {
                window.location.href = res.data.checkoutUrl;
              }
            } catch (e) {
              console.error('Checkout error:', e);
            }
          }}
        />
      </div>
    </App>
    </ConfigProvider>
  );
};
