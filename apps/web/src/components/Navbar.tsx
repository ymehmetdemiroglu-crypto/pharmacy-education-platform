import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@pharmacy/ui';
import { useAuth } from '@pharmacy/platform';
import { Button, StickerBadge } from '@pharmacy/ui';
import { Sun, Moon, Sparkles, BookOpen, Layers, CreditCard, LogIn, User } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';
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
    { to: '/gallery', label: t('navbar.gallery'), icon: Layers },
    { to: '/catalog', label: t('navbar.courses'), icon: BookOpen },
    { to: '/pricing', label: t('navbar.pricing'), icon: CreditCard },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-[#131B2A] border-b-3 border-black dark:border-slate-700 shadow-[0_4px_0_0_#000000] dark:shadow-[0_4px_0_0_#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          to="/gallery"
          className="flex items-center gap-2 select-none group focus:outline-none"
        >
          <div className="w-9 h-9 bg-[#FFD93D] text-black border-3 border-black flex items-center justify-center font-black text-lg shadow-[2px_2px_0px_#000000] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
            Rx
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-base sm:text-lg uppercase tracking-tight text-black dark:text-slate-100 leading-none">
              {t('navbar.brandName')}
            </span>
            <span className="text-[10px] font-mono text-gray-600 dark:text-slate-400 uppercase tracking-wider">
              {t('navbar.brandSubtitle')}
            </span>
          </div>
        </Link>

        {/* Navigation items */}
        <nav className="hidden md:flex items-center gap-1 font-mono text-xs font-bold uppercase">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 border-2 transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#FFD93D] text-black border-black shadow-[2px_2px_0px_#000000]'
                    : 'bg-transparent border-transparent hover:border-black/30 dark:hover:border-slate-600 text-black dark:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Controls: Locales, Theme, Trial Action */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Multilingual Locale Picker (TR default primary, AR RTL, EN) */}
          <div className="flex items-center border-2 border-black dark:border-slate-700 text-xs font-mono font-bold">
            <button
              type="button"
              onClick={() => handleLocaleChange('tr')}
              className={`px-2.5 py-1 ${locale === 'tr' ? 'bg-black text-white dark:bg-amber-400 dark:text-black' : 'hover:bg-gray-100 dark:hover:bg-slate-800 text-black dark:text-slate-200'}`}
              title="Türkçe (Varsayılan)"
            >
              TR
            </button>
            <button
              type="button"
              onClick={() => handleLocaleChange('ar')}
              className={`px-2.5 py-1 border-l border-black dark:border-slate-700 ${locale === 'ar' ? 'bg-black text-white dark:bg-amber-400 dark:text-black' : 'hover:bg-gray-100 dark:hover:bg-slate-800 text-black dark:text-slate-200'}`}
              title="العربية (RTL)"
            >
              AR
            </button>
            <button
              type="button"
              onClick={() => handleLocaleChange('en')}
              className={`px-2.5 py-1 border-l border-black dark:border-slate-700 ${locale === 'en' ? 'bg-black text-white dark:bg-amber-400 dark:text-black' : 'hover:bg-gray-100 dark:hover:bg-slate-800 text-black dark:text-slate-200'}`}
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
            className="p-1.5 border-2 border-black dark:border-slate-700 bg-[#FFF8E7] dark:bg-[#1E293B] shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#030712] active:translate-x-0.5 active:translate-y-0.5 transition-transform"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#FFD93D]" />
            ) : (
              <Moon className="w-4 h-4 text-black" />
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
          ) : (
            <Button
              size="sm"
              variant="primary"
              onClick={startTrial}
              className="hidden sm:inline-flex"
              leftIcon={<Sparkles className="w-3.5 h-3.5" />}
            >
              {t('navbar.freeTrial')}
            </Button>
          )}

          {/* Student Auth / Login Button */}
          {user?.email ? (
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <span className="hidden lg:inline-flex items-center gap-1 font-bold text-gray-800 dark:text-slate-200">
                <User className="w-3.5 h-3.5" />
                <span className="max-w-[110px] truncate" title={user.displayName || user.email}>
                  {user.displayName || user.email.split('@')[0]}
                </span>
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={logout}
                className="text-xs py-1 px-2 border-2 border-black dark:border-slate-700 hover:bg-rose-100 dark:hover:bg-rose-950/40"
              >
                {t('navbar.logout')}
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setAuthModalOpen(true)}
              className="text-xs py-1 px-2 sm:px-3 border-2 border-black dark:border-slate-700"
              leftIcon={<LogIn className="w-3.5 h-3.5" />}
            >
              {t('navbar.login')}
            </Button>
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
