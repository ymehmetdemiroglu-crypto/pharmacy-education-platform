import React from 'react';
import { Menu, Switch, Tag, Button, Progress } from 'antd';
import {
  ExperimentOutlined,
  MedicineBoxOutlined,
  SunOutlined,
  MoonOutlined,
  ThunderboltOutlined,
  UserOutlined,
  LogoutOutlined,
  LockOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useAuth } from '@pharmacy/platform';

interface NavigationSidebarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenAuthModal: () => void;
  masteryCount?: number;
  totalConcepts?: number;
}

export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  isDark,
  onToggleTheme,
  onOpenAuthModal,
  masteryCount = 3,
  totalConcepts = 10,
}) => {
  const { user, logout } = useAuth();

  const progressPercent = Math.round((masteryCount / totalConcepts) * 100);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#171717] border-r border-slate-200 dark:border-[#2F2F2F] text-slate-800 dark:text-[#ECECEC] select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-200 dark:border-[#2F2F2F] bg-slate-50 dark:bg-[#1A1A1A]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-[#252525] text-white flex items-center justify-center font-bold font-sans text-base shadow-xs">
            PL
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-base tracking-tight uppercase">
              PharmLearn
            </span>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
              Codex Studio Beta
            </span>
          </div>
        </div>

        {/* Free Beta Active Badge */}
        <div className="mt-3 flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
            <ThunderboltOutlined className="text-emerald-500" />
            <span>Erken Erişim Beta</span>
          </div>
          <Tag color="green" className="m-0 text-[10px] rounded-lg">AKTİF</Tag>
        </div>
      </div>

      {/* Course Tree Navigation */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Course A: Farmasötik Kimya */}
        <div>
          <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold font-display uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <ExperimentOutlined className="text-blue-500" />
            <span>Farmasötik Kimya</span>
          </div>

          <div className="mt-1 space-y-1">
            {/* Active Flagship Lecture */}
            <div className="p-3 rounded-xl border border-blue-500/30 dark:border-blue-500/40 bg-blue-50/50 dark:bg-blue-950/20 shadow-xs cursor-pointer">
              <div className="flex items-start justify-between gap-1">
                <span className="font-bold text-xs text-blue-900 dark:text-blue-200 leading-snug">
                  İlaç Reseptör Etkileşimi (Kimyasal Bağlar)
                </span>
                <Tag color="blue" className="text-[9px] font-mono m-0 shrink-0 rounded-lg">
                  FLAGSHIP
                </Tag>
              </div>

              <div className="mt-2 flex flex-col gap-1">
                <div className="flex justify-between text-[10px] font-mono text-gray-500">
                  <span>Vize Ustalığı:</span>
                  <span className="font-bold text-blue-600">{masteryCount}/{totalConcepts} Konsept</span>
                </div>
                <Progress percent={progressPercent} size="small" strokeColor="#2563EB" />
              </div>
            </div>

            {/* Upcoming Modules */}
            <div className="p-2.5 rounded-xl border border-transparent hover:border-slate-300 dark:hover:border-slate-700 text-xs text-gray-600 dark:text-gray-400 flex items-center justify-between opacity-75">
              <span>Fizikokimyasal Özellikler & İyonlaşma</span>
              <LockOutlined className="text-xs" />
            </div>
            <div className="p-2.5 rounded-xl border border-transparent hover:border-slate-300 dark:hover:border-slate-700 text-xs text-gray-600 dark:text-gray-400 flex items-center justify-between opacity-75">
              <span>İlaç Metabolizması (Faz I & II)</span>
              <LockOutlined className="text-xs" />
            </div>
          </div>
        </div>

        {/* Course B: Farmakoloji */}
        <div>
          <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold font-display uppercase tracking-wider text-orange-600 dark:text-orange-400">
            <MedicineBoxOutlined className="text-orange-500" />
            <span>Farmakoloji</span>
          </div>

          <div className="mt-1 space-y-1">
            <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-gray-700 dark:text-gray-300 flex items-center justify-between">
              <span>Farmakodinami & Reseptör Teorileri</span>
              <Tag color="orange" className="text-[9px] m-0 rounded-lg">Hazırlanıyor</Tag>
            </div>
            <div className="p-2.5 rounded-xl border border-transparent text-xs text-gray-500 flex items-center justify-between opacity-75">
              <span>ADME & Farmakokinetik</span>
              <LockOutlined className="text-xs" />
            </div>
            <div className="p-2.5 rounded-xl border border-transparent text-xs text-gray-500 flex items-center justify-between opacity-75">
              <span>Otonom Sinir Sistemi</span>
              <LockOutlined className="text-xs" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer: Theme Toggle & User Status */}
      <div className="p-3 border-t border-slate-200 dark:border-[#2F2F2F] bg-slate-50 dark:bg-[#1A1A1A] flex flex-col gap-2.5">
        {/* Theme Toggle */}
        <div className="flex items-center justify-between text-xs px-1 font-mono">
          <span className="flex items-center gap-1.5">
            {isDark ? <MoonOutlined className="text-blue-400" /> : <SunOutlined className="text-amber-500" />}
            <span>Tema: {isDark ? 'Codex Dark' : 'Aydınlık'}</span>
          </span>
          <Switch checked={isDark} onChange={onToggleTheme} size="small" />
        </div>

        {/* User / Sign-in Section */}
        {user ? (
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-6 h-6 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
                {(user.email ?? 'E')[0]?.toUpperCase() || 'E'}
              </div>
              <span className="truncate font-medium">{user.email}</span>
            </div>
            <Button
              type="text"
              size="small"
              icon={<LogoutOutlined />}
              onClick={() => logout?.()}
              className="text-[11px] text-red-600 hover:text-red-700 font-semibold shrink-0 ml-1 rounded-lg"
            >
              Çıkış
            </Button>
          </div>
        ) : (
          <Button
            type="primary"
            onClick={onOpenAuthModal}
            icon={<UserOutlined />}
            className="w-full bg-black hover:bg-slate-800 text-white font-bold text-xs h-9 rounded-xl border-0 shadow-sm"
          >
            Öğrenci Girişi / Kayıt
          </Button>
        )}
      </div>
    </div>
  );
};
