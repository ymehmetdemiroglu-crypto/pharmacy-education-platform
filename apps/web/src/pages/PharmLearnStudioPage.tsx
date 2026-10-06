import React, { useState } from 'react';
import { Button } from 'antd';
import { useAuth } from '@pharmacy/platform';
import { PharmLearnShell } from '../components/layout/PharmLearnShell';
import { AuthModal } from '../components/AuthModal';
import {
  RightOutlined,
  BookOutlined,
  ExperimentOutlined,
  RobotOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from '@ant-design/icons';

export const PharmLearnStudioPage: React.FC = () => {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authDefaultTab, setAuthDefaultTab] = useState<'login' | 'signup'>('signup');

  // A student is authenticated if they have a real Supabase user email (not guest)
  const isAuthenticated = Boolean(user && user.email && !user.userId.startsWith('guest-'));

  if (isAuthenticated) {
    return (
      <div className="h-screen w-screen overflow-hidden">
        <PharmLearnShell
          onOpenAuthModal={() => {
            setAuthDefaultTab('login');
            setIsAuthModalOpen(true);
          }}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          defaultTab={authDefaultTab}
        />
      </div>
    );
  }

  // Clean Minimalist Hero Landing for Unauthenticated Visitors
  return (
    <div className="min-h-screen w-screen bg-white dark:bg-[#212121] text-slate-900 dark:text-[#ECECEC] flex flex-col justify-between font-sans antialiased transition-colors">
      {/* Minimal Top Header */}
      <header className="h-14 border-b border-slate-200 dark:border-[#2F2F2F] bg-white/80 dark:bg-[#171717]/80 backdrop-blur-sm px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-[#10A37F] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            PL
          </div>
          <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-[#ECECEC]">PharmLearn</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 ml-1">
            Beta
          </span>
        </div>

        <Button
          type="text"
          icon={<UserOutlined />}
          onClick={() => {
            setAuthDefaultTab('login');
            setIsAuthModalOpen(true);
          }}
          className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 rounded-xl"
        >
          Giriş Yap
        </Button>
      </header>

      {/* Hero Canvas */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-6 shadow-xs">
            <ThunderboltOutlined className="text-emerald-500" />
            <span>Farmasötik Kimya & Farmakoloji AI Çalışma Alanı</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-[#ECECEC] leading-tight mb-4">
            Eczacılık Vize Derslerini{' '}
            <span className="text-[#10A37F]">İnteraktif Modeller</span> ile Çalışın
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-[#B4B4B4] max-w-lg mb-8 leading-relaxed">
            Prof. Dr. Bedia Kaymakçıoğlu'nun 33 slaytlık <strong>İlaç Reseptör Etkileşimi</strong> ders notunu 3D WebGL moleküler yapıları, SAR matrisi ve Sokratik AI eğitmen ile keşfedin.
          </p>

          {/* Single Primary Call to Action */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-10">
            <Button
              type="primary"
              size="large"
              icon={<RightOutlined />}
              onClick={() => {
                setAuthDefaultTab('signup');
                setIsAuthModalOpen(true);
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#10A37F] hover:bg-[#0E8C6D] text-white text-sm font-semibold px-6 h-11 rounded-xl shadow-xs border-0"
            >
              Öğrenmeye Başla
            </Button>

            <Button
              size="large"
              onClick={() => {
                setAuthDefaultTab('login');
                setIsAuthModalOpen(true);
              }}
              className="w-full sm:w-auto text-xs font-medium h-11 rounded-xl border-slate-200 dark:border-[#2F2F2F] text-slate-700 dark:text-[#ECECEC] bg-white dark:bg-[#171717] hover:bg-slate-50 dark:hover:bg-[#252525]"
            >
              Zaten hesabın var mı? Giriş Yap
            </Button>
          </div>

          {/* 3 Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full text-start">
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-[#2F2F2F] bg-white dark:bg-[#171717] shadow-xs">
              <BookOutlined className="text-[#10A37F] text-base mb-2 block" />
              <h3 className="font-semibold text-xs text-slate-900 dark:text-[#ECECEC] mb-1">
                Doğrulanmış Slayt Özeti
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-[#B4B4B4] m-0 leading-relaxed">
                33 slaytlık ders içeriği 10 odaklanmış kavram ve kesin slayt atıflarıyla sunulur.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-[#2F2F2F] bg-white dark:bg-[#171717] shadow-xs">
              <ExperimentOutlined className="text-emerald-500 text-base mb-2 block" />
              <h3 className="font-semibold text-xs text-slate-900 dark:text-[#ECECEC] mb-1">
                3D & 2D Molekül Modeli
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-[#B4B4B4] m-0 leading-relaxed">
                Dibukain, Prokain ve Lidokain yapılarını döndürün, bağlanma bölgelerini inceleyin.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-[#2F2F2F] bg-white dark:bg-[#171717] shadow-xs">
              <RobotOutlined className="text-amber-500 text-base mb-2 block" />
              <h3 className="font-semibold text-xs text-slate-900 dark:text-[#ECECEC] mb-1">
                Sokratik AI Eğitmen
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-[#B4B4B4] m-0 leading-relaxed">
                Metinden seçtiğiniz her cümlenin sezgisel açıklamasını slayt referansıyla anında alın.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="h-10 border-t border-slate-200 dark:border-[#2F2F2F] px-6 flex items-center justify-between text-[11px] text-slate-500 dark:text-[#8E8E8E]">
        <span>PharmLearn © 2026 • Eczacılık Öğrenci Platformu</span>
        <span className="font-mono">Marmara Üniv. Farmasötik Kimya 1</span>
      </footer>

      {/* Supabase Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authDefaultTab}
      />
    </div>
  );
};
