import React, { useState } from 'react';
import { Modal } from '@pharmacy/ui';
import { useAuth, OAuthProviderDisabledError } from '@pharmacy/platform';
import { LogIn, UserPlus, Sparkles, CheckCircle2, AlertCircle, GraduationCap, AlertTriangle, ArrowRight, KeyRound } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
  onSuccess?: () => void;
}

const PHARMACY_FACULTIES = [
  'İstanbul Üniversitesi',
  'Marmara Üniversitesi',
  'Ankara Üniversitesi',
  'Hacettepe Üniversitesi',
  'Bezmialem Vakıf Üniversitesi',
  'Ege Üniversitesi',
  'Yeditepe Üniversitesi',
  'Gazi Üniversitesi',
  'Anadolu Üniversitesi',
  'Diğer',
];

const GoogleIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'login',
  onSuccess,
}) => {
  const { t } = useTranslation();
  const { signInGuest, signInWithEmail, signUpWithEmail, signInWithGoogle, resetPasswordForEmail } = useAuth();

  const [tab, setTab] = useState<'login' | 'signup' | 'forgot-password'>(defaultTab);

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [faculty, setFaculty] = useState(PHARMACY_FACULTIES[0]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [googleDisabledNotice, setGoogleDisabledNotice] = useState(false);

  const resetForm = () => {
    setError(null);
    setSuccessMessage(null);
    setGoogleDisabledNotice(false);
    setIsSubmitting(false);
  };

  const handleTabSwitch = (newTab: 'login' | 'signup') => {
    setTab(newTab);
    resetForm();
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setError(t('modals.auth.loginRequired'));
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (signInWithEmail) {
        await signInWithEmail(loginEmail.trim(), loginPassword);
      } else {
        signInGuest();
      }

      setSuccessMessage(t('modals.auth.loginSuccess'));

      setTimeout(() => {
        setIsSubmitting(false);
        onClose();
        if (onSuccess) onSuccess();
      }, 600);
    } catch (err: any) {
      setError(err?.message || t('modals.auth.loginFailed'));
      setIsSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !signupEmail.trim() || !signupPassword.trim()) {
      setError(t('modals.auth.fillAllFields'));
      return;
    }

    if (signupPassword.length < 6) {
      setError(t('modals.auth.passwordMinLength'));
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (signUpWithEmail) {
        await signUpWithEmail({
          name: fullName.trim(),
          email: signupEmail.trim(),
          password: signupPassword,
          ...(faculty ? { university: faculty } : {}),
        });
      } else {
        signInGuest();
      }

      setSuccessMessage(t('modals.auth.welcomeRegistration', { faculty: faculty || '' }));

      setTimeout(() => {
        setIsSubmitting(false);
        onClose();
        if (onSuccess) onSuccess();
      }, 700);
    } catch (err: any) {
      setError(err?.message || t('modals.auth.signupFailed'));
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsSubmitting(true);
    setError(null);
    setGoogleDisabledNotice(false);

    try {
      if (signInWithGoogle) {
        await signInWithGoogle();
      } else {
        signInGuest();
      }

      setSuccessMessage(t('modals.auth.googleSuccess'));

      setTimeout(() => {
        setIsSubmitting(false);
        onClose();
        if (onSuccess) onSuccess();
      }, 600);
    } catch (err: any) {
      const msg = err?.message || '';
      if (
        err instanceof OAuthProviderDisabledError ||
        err?.name === 'OAuthProviderDisabledError' ||
        err?.code === 'oauth_provider_disabled' ||
        msg.includes('provider is not enabled') ||
        msg.includes('validation_failed') ||
        msg.includes('Unsupported provider')
      ) {
        setGoogleDisabledNotice(true);
        setError(null);
      } else {
        setError(err?.message || t('modals.auth.googleError'));
      }
      setIsSubmitting(false);
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setError(t('modals.auth.resetEmailRequired'));
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (resetPasswordForEmail) {
        await resetPasswordForEmail(loginEmail.trim());
      }
      setSuccessMessage(t('modals.auth.resetEmailSent'));
    } catch (err: any) {
      setError(err?.message || t('modals.auth.resetEmailFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalTitle =
    tab === 'login'
      ? t('modals.auth.loginTitle')
      : tab === 'signup'
      ? t('modals.auth.signupTitle')
      : t('modals.auth.forgotPasswordTitle');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      maxWidth="md"
    >
      <div className="space-y-4">
        {/* ChatGPT Style Squircle Segmented Tabs */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 dark:bg-[#262626] rounded-xl">
          <button
            type="button"
            onClick={() => handleTabSwitch('login')}
            className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              tab === 'login'
                ? 'bg-white dark:bg-[#171717] text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-500 dark:text-[#8E8E8E] hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>{t('modals.auth.loginTab')}</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch('signup')}
            className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              tab === 'signup'
                ? 'bg-white dark:bg-[#171717] text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-500 dark:text-[#8E8E8E] hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>{t('modals.auth.signupTab')}</span>
          </button>
        </div>

        {/* Google OAuth Notice Card */}
        {googleDisabledNotice && (
          <div
            data-testid="google-oauth-disabled-notice"
            className="rounded-xl border border-amber-300 dark:border-amber-800/80 bg-amber-50/80 dark:bg-amber-950/40 p-4 space-y-3 animate-in fade-in duration-200"
          >
            <div className="flex items-center gap-2.5 pb-2 border-b border-amber-200 dark:border-amber-800/50">
              <div className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <h4 className="font-sans text-xs sm:text-sm font-semibold text-amber-900 dark:text-amber-200">
                {t('modals.auth.googleNotice.title')}
              </h4>
            </div>

            <p className="font-sans text-xs text-amber-900/90 dark:text-amber-200/90 leading-relaxed">
              {t('modals.auth.googleNotice.description')}
            </p>

            <div className="p-2.5 bg-amber-100/50 dark:bg-amber-900/30 rounded-lg text-[11px] font-mono text-amber-900 dark:text-amber-300 leading-normal">
              {t('modals.auth.googleNotice.adminTip')}
            </div>

            <button
              type="button"
              onClick={() => {
                setGoogleDisabledNotice(false);
                setTab('login');
                setTimeout(() => {
                  const input = document.querySelector<HTMLInputElement>('input[type="email"]');
                  input?.focus();
                }, 50);
              }}
              className="w-full py-2.5 px-3 bg-[#10A37F] hover:bg-[#0E8C6D] active:bg-[#0C7A5F] text-white font-sans text-xs sm:text-sm font-medium rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <LogIn className="w-4 h-4" />
              <span>{t('modals.auth.googleNotice.useEmailCta')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Status Alerts */}
        {error && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-xl flex items-center gap-2 text-xs font-medium text-rose-800 dark:text-rose-300 shadow-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 rounded-xl flex items-center gap-2 text-xs font-medium text-emerald-800 dark:text-emerald-300 shadow-xs">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Tab 1: Log In Form */}
        {tab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700 dark:text-[#B4B4B4]">
                {t('modals.auth.email')}
              </label>
              <input
                type="email"
                placeholder={t('modals.auth.emailPlaceholder')}
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                disabled={isSubmitting}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#212121] text-slate-900 dark:text-[#ECECEC] text-sm border border-slate-200 dark:border-[#2F2F2F] rounded-xl focus:outline-none focus:border-[#10A37F] focus:ring-2 focus:ring-[#10A37F]/20 dark:focus:ring-[#10A37F]/30 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700 dark:text-[#B4B4B4]">
                {t('modals.auth.password')}
              </label>
              <input
                type="password"
                placeholder={t('modals.auth.passwordPlaceholder')}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                disabled={isSubmitting}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#212121] text-slate-900 dark:text-[#ECECEC] text-sm border border-slate-200 dark:border-[#2F2F2F] rounded-xl focus:outline-none focus:border-[#10A37F] focus:ring-2 focus:ring-[#10A37F]/20 dark:focus:ring-[#10A37F]/30 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-xs"
              />
            </div>

            <div className="flex justify-end -mt-1">
              <button
                type="button"
                onClick={() => {
                  setTab('forgot-password');
                  resetForm();
                }}
                className="text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium cursor-pointer"
              >
                {t('modals.auth.forgotPasswordLink')}
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-[#10A37F] hover:bg-[#0E8C6D] active:bg-[#0C7A5F] text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>{t('modals.auth.submitLogin')}</span>
            </button>

            {/* Subtle Divider */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200 dark:border-[#2F2F2F]"></div>
              <span className="flex-shrink mx-3 text-xs font-medium text-slate-400 dark:text-[#7A7A7A]">
                {t('modals.auth.orText')}
              </span>
              <div className="flex-grow border-t border-slate-200 dark:border-[#2F2F2F]"></div>
            </div>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleGoogleAuth}
              className="w-full py-2.5 px-4 bg-white dark:bg-[#212121] hover:bg-slate-50 dark:hover:bg-[#2A2A2A] text-slate-800 dark:text-[#ECECEC] border border-slate-200 dark:border-[#2F2F2F] rounded-xl font-medium text-sm flex items-center justify-center gap-2.5 transition-colors shadow-xs disabled:opacity-60 cursor-pointer"
            >
              <GoogleIcon className="w-4 h-4 shrink-0" />
              <span>{t('modals.auth.googleContinue')}</span>
            </button>
          </form>
        )}

        {/* Tab 3: Forgot Password Form */}
        {tab === 'forgot-password' && (
          <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#B4B4B4] leading-relaxed">
              {t('modals.auth.forgotPasswordDesc')}
            </p>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700 dark:text-[#B4B4B4]">
                {t('modals.auth.email')}
              </label>
              <input
                type="email"
                placeholder={t('modals.auth.emailPlaceholder')}
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                disabled={isSubmitting}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#212121] text-slate-900 dark:text-[#ECECEC] text-sm border border-slate-200 dark:border-[#2F2F2F] rounded-xl focus:outline-none focus:border-[#10A37F] focus:ring-2 focus:ring-[#10A37F]/20 dark:focus:ring-[#10A37F]/30 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-xs"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-[#10A37F] hover:bg-[#0E8C6D] active:bg-[#0C7A5F] text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>{t('modals.auth.sendResetLink')}</span>
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setTab('login');
                  resetForm();
                }}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium cursor-pointer"
              >
                ← {t('modals.auth.backToLogin')}
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Sign Up Form */}
        {tab === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-3.5">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700 dark:text-[#B4B4B4]">
                {t('modals.auth.fullName')}
              </label>
              <input
                type="text"
                placeholder={t('modals.auth.fullNamePlaceholder')}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isSubmitting}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#212121] text-slate-900 dark:text-[#ECECEC] text-sm border border-slate-200 dark:border-[#2F2F2F] rounded-xl focus:outline-none focus:border-[#10A37F] focus:ring-2 focus:ring-[#10A37F]/20 dark:focus:ring-[#10A37F]/30 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700 dark:text-[#B4B4B4]">
                {t('modals.auth.email')}
              </label>
              <input
                type="email"
                placeholder={t('modals.auth.emailPlaceholder')}
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                disabled={isSubmitting}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#212121] text-slate-900 dark:text-[#ECECEC] text-sm border border-slate-200 dark:border-[#2F2F2F] rounded-xl focus:outline-none focus:border-[#10A37F] focus:ring-2 focus:ring-[#10A37F]/20 dark:focus:ring-[#10A37F]/30 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700 dark:text-[#B4B4B4]">
                {t('modals.auth.password')}
              </label>
              <input
                type="password"
                placeholder={t('modals.auth.passwordPlaceholder')}
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                disabled={isSubmitting}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#212121] text-slate-900 dark:text-[#ECECEC] text-sm border border-slate-200 dark:border-[#2F2F2F] rounded-xl focus:outline-none focus:border-[#10A37F] focus:ring-2 focus:ring-[#10A37F]/20 dark:focus:ring-[#10A37F]/30 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-xs"
              />
            </div>

            {/* Eczacılık Fakültesi Dropdown */}
            <div className="w-full flex flex-col gap-1.5">
              <label
                htmlFor="faculty-select"
                className="text-xs font-medium text-slate-700 dark:text-[#B4B4B4] flex items-center gap-1.5"
              >
                <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                <span>{t('modals.auth.faculty')}</span>
              </label>
              <select
                id="faculty-select"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                disabled={isSubmitting}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#212121] text-slate-900 dark:text-[#ECECEC] font-sans text-sm border border-slate-200 dark:border-[#2F2F2F] rounded-xl shadow-xs focus:outline-none focus:border-[#10A37F] focus:ring-2 focus:ring-[#10A37F]/20 transition-all cursor-pointer"
              >
                {PHARMACY_FACULTIES.map((fac) => (
                  <option key={fac} value={fac} className="bg-white dark:bg-[#212121] text-slate-900 dark:text-[#ECECEC]">
                    {fac}
                  </option>
                ))}
              </select>
            </div>

            {/* Free lessons guarantee note */}
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
              <Sparkles className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>{t('modals.auth.unlock22Lessons')}</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-[#10A37F] hover:bg-[#0E8C6D] active:bg-[#0C7A5F] text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>{t('modals.auth.signupAndStart')}</span>
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
};
