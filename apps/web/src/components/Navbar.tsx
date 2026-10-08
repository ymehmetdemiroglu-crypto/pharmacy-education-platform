import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@pharmacy/ui';
import { useAuth } from '@pharmacy/platform';
import { StickerBadge } from '@pharmacy/ui';
import { Sun, Moon, Sparkles, BookOpen, Layers, CreditCard, LogIn, User, RotateCw } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';
import { FREE_PILOT_MODE } from '../lib/billing';
import { wbText } from '../lib/whiteboardStrings';
import { AuthModal } from './AuthModal';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useTranslation();
  const { user, startTrial, logout } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const location = useLocation();

  const handleLocaleChange = (newLocale: 'tr' | 'ar' | 'en') => {
    setLocale(newLocale);
  };

  const navLinks = [
    { to: '/dashboard', label: wbText(locale).dashTitle, icon: Sparkles },
    { to: '/gallery', label: t('navbar.gallery'), icon: Layers },
    { to: '/catalog', label: t('navbar.courses'), icon: BookOpen },
    { to: '/review', label: t('navbar.review'), icon: RotateCw },
    { to: '/pricing', label: t('navbar.pricing'), icon: CreditCard },
  ].filter((link) => !(FREE_PILOT_MODE && link.to === '/pricing'));

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-[#171717]/90 backdrop-blur-sm border-b border-slate-200 dark:border-[#2F2F2F] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <Link
          to="/studio"
          className="flex items-center gap-2 select-none group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-xl bg-[#10A37F] text-white flex items-center justify-center font-bold text-sm shadow-xs transition-transform group-hover:scale-105">
            PL
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-sm sm:text-base tracking-tight text-slate-900 dark:text-[#ECECEC] leading-none">
              {t('navbar.brandName')}
            </span>
            <span className="text-[10px] font-sans text-slate-500 dark:text-slate-400">
              {t('navbar.brandSubtitle')}
            </span>
          </div>
        </Link>

        {/* Navigation items */}
        <nav className="hidden lg:flex items-center gap-1 font-sans text-xs font-medium">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-[#10A37F] dark:text-[#10A37F] font-semibold border border-emerald-200/60 dark:border-emerald-900/60'
                    : 'text-slate-600 dark:text-[#B4B4B4] hover:bg-slate-100 dark:hover:bg-[#252525] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Controls: Locales, Theme, Trial Action */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Multilingual Locale Picker (TR default primary, AR RTL, EN) */}
          <div className="flex items-center rounded-xl border border-slate-200 dark:border-[#2F2F2F] bg-slate-50 dark:bg-[#212121] p-0.5 text-xs font-medium">
            <button
              type="button"
              onClick={() => handleLocaleChange('tr')}
              className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                locale === 'tr'
                  ? 'bg-white dark:bg-[#2F2F2F] text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Türkçe (Varsayılan)"
            >
              TR
            </button>
            <button
              type="button"
              onClick={() => handleLocaleChange('ar')}
              className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                locale === 'ar'
                  ? 'bg-white dark:bg-[#2F2F2F] text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="العربية (RTL)"
            >
              AR
            </button>
            <button
              type="button"
              onClick={() => handleLocaleChange('en')}
              className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                locale === 'en'
                  ? 'bg-white dark:bg-[#2F2F2F] text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t('navbar.toggleTheme')}
            className="p-2 rounded-xl border border-slate-200 dark:border-[#2F2F2F] bg-slate-50 dark:bg-[#212121] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#2A2A2A] transition-colors cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-slate-700" />
            )}
          </button>

          {/* User / Trial badge */}
          {user?.plan === 'trial' ? (
            <StickerBadge variant="yellow" size="sm" className="inline-flex">
              {t('navbar.trialActive')}
            </StickerBadge>
          ) : user?.plan === 'premium' ? (
            <StickerBadge variant="green" size="sm" className="inline-flex">
              {t('navbar.passActive')}
            </StickerBadge>
          ) : FREE_PILOT_MODE ? null : (
            <button
              type="button"
              onClick={startTrial}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#10A37F] hover:bg-[#0E8C6D] active:bg-[#0C7A5F] text-white text-xs font-medium transition-colors shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('navbar.freeTrial')}</span>
            </button>
          )}

          {/* Student Auth / Login Button */}
          {user?.email ? (
            <div className="flex items-center gap-1.5 text-xs font-medium">
              <Link
                to="/settings"
                className="hidden lg:inline-flex items-center gap-1 text-slate-700 dark:text-[#ECECEC] hover:text-[#10A37F] transition-colors px-2 py-1"
                title="Hesap Ayarları / Settings"
              >
                <User className="w-3.5 h-3.5" />
                <span className="max-w-[110px] truncate">
                  {user.displayName || user.email.split('@')[0]}
                </span>
              </Link>
              <button
                type="button"
                onClick={logout}
                className="text-xs py-1.5 px-2.5 rounded-xl border border-slate-200 dark:border-[#2F2F2F] hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 dark:text-rose-400 font-medium transition-colors cursor-pointer"
              >
                {t('navbar.logout')}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setAuthModalOpen(true)}
              className="text-xs py-1.5 px-3 rounded-xl border border-slate-200 dark:border-[#2F2F2F] bg-white dark:bg-[#212121] hover:bg-slate-50 dark:hover:bg-[#2A2A2A] text-slate-800 dark:text-[#ECECEC] font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <LogIn className="hidden sm:block w-3.5 h-3.5" />
              <span>{t('navbar.login')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Student Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </header>
  );
};
