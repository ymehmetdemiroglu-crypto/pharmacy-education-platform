import React, { useState, useEffect } from 'react';
import { ConfigProvider, App, Drawer, Dropdown, FloatButton, Tooltip, Button, theme } from 'antd';
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
} from '@ant-design/icons';
import { TutorChatPane } from './TutorChatPane';
import { ArtifactCanvas } from './ArtifactCanvas';
import { useAuth } from '@pharmacy/platform';

interface PharmLearnShellProps {
  onOpenAuthModal?: () => void;
}

export const PharmLearnShell: React.FC<PharmLearnShellProps> = ({ onOpenAuthModal }) => {
  const { user, logout } = useAuth();

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
  const [tutorQuery, setTutorQuery] = useState<string | null>(null);

  // 2-Pane desktop layout state: open by default per /grill-me agreement
  const [isTutorOpen, setIsTutorOpen] = useState(true);

  // Mobile drawer state
  const [isMobileTutorOpen, setIsMobileTutorOpen] = useState(false);

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

  // Lecture directory menu items
  const lectureMenuItems: MenuProps['items'] = [
    {
      key: 'course-header',
      type: 'group',
      label: (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          <ExperimentOutlined className="text-sm" /> Farmasötik Kimya
        </span>
      ),
      children: [
        {
          key: 'medchem-1',
          label: (
            <div className="flex items-center justify-between gap-4 py-1">
              <div>
                <div className="font-semibold text-xs text-blue-600 dark:text-blue-400">
                  İlaç Reseptör Etkileşimi (Kimyasal Bağlar)
                </div>
                <div className="text-[11px] text-gray-500">Prof. Dr. Bedia Kaymakçıoğlu • 33 Slayt</div>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                AKTİF
              </span>
            </div>
          ),
        },
        {
          key: 'medchem-2',
          disabled: true,
          label: (
            <div className="flex items-center justify-between gap-4 py-1 opacity-60">
              <span className="text-xs">Fizikokimyasal Özellikler & İyonlaşma</span>
              <span className="text-[10px] text-gray-400 font-mono">Yakında</span>
            </div>
          ),
        },
        {
          key: 'medchem-3',
          disabled: true,
          label: (
            <div className="flex items-center justify-between gap-4 py-1 opacity-60">
              <span className="text-xs">İlaç Metabolizması (Faz I & II)</span>
              <span className="text-[10px] text-gray-400 font-mono">Yakında</span>
            </div>
          ),
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'pharm-header',
      type: 'group',
      label: (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
          <BookOutlined className="text-sm" /> Farmakoloji
        </span>
      ),
      children: [
        {
          key: 'pharm-1',
          disabled: true,
          label: (
            <div className="flex items-center justify-between gap-4 py-1 opacity-60">
              <span className="text-xs">Farmakodinamik & Reseptör Sinyal Yolakları</span>
              <span className="text-[10px] text-gray-400 font-mono">Yakında</span>
            </div>
          ),
        },
      ],
    },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#2563EB',
          colorSuccess: '#10B981',
          colorWarning: '#F59E0B',
          colorError: '#EF4444',
          colorInfo: '#0EA5E9',
          colorBgBase: isDark ? '#0B0F17' : '#FFFFFF',
          colorBgContainer: isDark ? '#131B2A' : '#FFFFFF',
          colorBgLayout: isDark ? '#0B0F17' : '#F8FAFC',
          colorBorder: isDark ? '#1E293B' : '#E2E8F0',
          colorBorderSecondary: isDark ? '#1E293B' : '#F1F5F9',
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
            headerBg: isDark ? '#1E293B' : '#F8FAFC',
            headerColor: isDark ? '#CBD5E1' : '#475569',
            rowHoverBg: isDark ? '#1E293B' : '#F1F5F9',
            borderRadius: 12,
          },
          Segmented: {
            trackBg: isDark ? '#1E293B' : '#F1F5F9',
            itemSelectedBg: isDark ? '#2563EB' : '#FFFFFF',
            itemSelectedColor: isDark ? '#FFFFFF' : '#0F172A',
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
        <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#F8FAFC] dark:bg-[#0B0F17] text-slate-900 dark:text-[#F1F5F9] font-sans antialiased">
        {/* Ultra-Minimalist Top Bar (48px) */}
        <header className="h-12 shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131B2A] px-4 flex items-center justify-between z-30 select-none">
          {/* Left: Brand + Course/Lecture Dropdown */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                PL
              </div>
              <span className="font-bold text-sm tracking-tight hidden sm:inline">
                PharmLearn
              </span>
            </div>

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

            {/* Lecture Dropdown Selector */}
            <Dropdown menu={{ items: lectureMenuItems }} trigger={['click']}>
              <Button
                type="text"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all"
              >
                <span className="text-gray-500 dark:text-gray-400 hidden md:inline">Farmasötik Kimya ›</span>
                <span className="font-semibold text-slate-800 dark:text-slate-100 truncate max-w-[200px] sm:max-w-xs">
                  İlaç Reseptör Etkileşimi
                </span>
                <DownOutlined className="text-[10px] text-gray-400" />
              </Button>
            </Dropdown>
          </div>

          {/* Right: Actions (Theme, User, AI Tutor Toggle) */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Tooltip title={isDark ? 'Açık Temaya Geç' : 'Koyu Temaya Geç'}>
              <Button
                type="text"
                onClick={handleToggleTheme}
                className="flex items-center justify-center w-8 h-8 rounded-xl"
                icon={isDark ? <SunOutlined className="text-amber-400 text-sm" /> : <MoonOutlined className="text-slate-600 text-sm" />}
              />
            </Tooltip>

            {/* User Account Indicator */}
            {user ? (
              <Button
                type="text"
                onClick={logout}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs"
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
                className="rounded-xl px-4 font-medium text-xs"
              >
                Giriş Yap
              </Button>
            ) : null}

            {/* Desktop AI Tutor Panel Toggle */}
            <Button
              type={isTutorOpen ? 'primary' : 'default'}
              ghost={isTutorOpen}
              onClick={() => setIsTutorOpen(!isTutorOpen)}
              icon={<RobotOutlined className="text-blue-500" />}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl text-xs font-semibold shadow-xs"
            >
              <span>AI Tutor</span>
              {isTutorOpen ? (
                <MenuFoldOutlined className="text-gray-400 text-xs ml-0.5" />
              ) : (
                <MenuUnfoldOutlined className="text-gray-400 text-xs ml-0.5" />
              )}
            </Button>
          </div>
        </header>

        {/* 2-Pane Workspace */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Main Study Canvas (Spacious Left/Center Pane) */}
          <main className="flex-1 h-full overflow-hidden flex flex-col">
            <ArtifactCanvas
              onAskTutor={handleAskTutor}
              activeConceptId={activeConceptId}
              onActiveConceptChange={setActiveConceptId}
            />
          </main>

          {/* Right Pane: AI Socratic Tutor (Desktop) */}
          {isTutorOpen && (
            <aside className="hidden md:flex flex-col w-[380px] shrink-0 h-full border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131B2A] z-20">
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
            className="md:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium px-4 py-3 rounded-2xl shadow-xl border border-blue-400/30 transition-transform cursor-pointer"
          >
            <RobotOutlined className="text-base text-yellow-300" />
            <span className="text-xs font-semibold">AI Tutor'a Sor</span>
          </button>
        </div>
      </div>
    </App>
    </ConfigProvider>
  );
};
