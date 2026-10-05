import React, { useState } from 'react';
import { Modal, Button, Input } from '@pharmacy/ui';
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
        {/* Neo-brutalist Tab Switcher */}
        <div className="grid grid-cols-2 gap-2 border-b-2 border-black/20 dark:border-slate-700 pb-3">
          <button
            type="button"
            onClick={() => handleTabSwitch('login')}
            className={`py-2 px-3 text-xs sm:text-sm font-mono font-bold uppercase border-2 border-black dark:border-slate-700 flex items-center justify-center gap-2 transition-all ${
              tab === 'login'
                ? 'bg-[#FFD93D] text-black shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#030712]'
                : 'bg-white dark:bg-[#1E293B] text-black dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>{t('modals.auth.loginTab')}</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch('signup')}
            className={`py-2 px-3 text-xs sm:text-sm font-mono font-bold uppercase border-2 border-black dark:border-slate-700 flex items-center justify-center gap-2 transition-all ${
              tab === 'signup'
                ? 'bg-[#FFD93D] text-black shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#030712]'
                : 'bg-white dark:bg-[#1E293B] text-black dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>{t('modals.auth.signupTab')}</span>
          </button>
        </div>

        {/* Google OAuth Disabled In-App Neo-Brutalist Notice Card */}
        {googleDisabledNotice && (
          <div
            data-testid="google-oauth-disabled-notice"
            className="border-4 border-black dark:border-slate-700 bg-[#FFF8E7] dark:bg-[#0F172A] p-4 shadow-[6px_6px_0px_#000000] dark:shadow-[6px_6px_0px_#030712] space-y-3 rounded-none animate-in fade-in duration-200"
          >
            {/* Warning Badge & Header */}
            <div className="flex items-center gap-2.5 pb-2.5 border-b-2 border-black/20 dark:border-slate-700">
              <div className="w-7 h-7 bg-[#FFD93D] border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000000]">
                <AlertTriangle className="w-4 h-4 text-black" />
              </div>
              <h4 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-black dark:text-slate-100">
                {t('modals.auth.googleNotice.title')}
              </h4>
            </div>

            {/* Localized Explanation */}
            <p className="font-sans text-xs sm:text-sm text-gray-800 dark:text-slate-200 leading-relaxed font-medium">
              {t('modals.auth.googleNotice.description')}
            </p>

            {/* Admin Guidance / Tip */}
            <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 border-2 border-black/30 dark:border-slate-600 text-[11px] font-mono text-amber-900 dark:text-amber-200 leading-normal">
              {t('modals.auth.googleNotice.adminTip')}
            </div>

            {/* Email/Password Fallback CTA */}
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
              className="w-full py-2.5 px-3 bg-[#6BCB77] hover:bg-[#58ba64] text-black font-mono text-xs sm:text-sm font-bold uppercase border-3 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>{t('modals.auth.googleNotice.useEmailCta')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Status Alerts */}
        {error && (
          <div className="p-3 bg-[#FF6B9D]/20 border-2 border-black dark:border-slate-700 shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#030712] flex items-center gap-2 text-xs font-mono font-bold text-rose-800 dark:text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 bg-emerald-100 dark:bg-emerald-950/60 border-2 border-black dark:border-slate-700 shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#030712] flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Tab 1: Log In Form */}
        {tab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <Input
              label={t('modals.auth.email')}
              type="email"
              placeholder={t('modals.auth.emailPlaceholder')}
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              disabled={isSubmitting}
              required
            />

            <Input
              label={t('modals.auth.password')}
              type="password"
              placeholder={t('modals.auth.passwordPlaceholder')}
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              disabled={isSubmitting}
              required
            />

            <div className="flex justify-end -mt-2">
              <button
                type="button"
                onClick={() => {
                  setTab('forgot-password');
                  resetForm();
                }}
                className="text-xs font-mono font-bold text-gray-700 dark:text-slate-300 hover:text-black dark:hover:text-white underline hover:no-underline cursor-pointer"
              >
                {t('modals.auth.forgotPasswordLink')}
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="md"
              isLoading={isSubmitting}
              leftIcon={<LogIn className="w-4 h-4" />}
            >
              {t('modals.auth.submitLogin')}
            </Button>

            {/* Neo-brutalist Divider */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t-2 border-black/20 dark:border-slate-700"></div>
              <span className="flex-shrink mx-3 font-mono text-[11px] font-bold text-gray-500 uppercase">
                {t('modals.auth.orText')}
              </span>
              <div className="flex-grow border-t-2 border-black/20 dark:border-slate-700"></div>
            </div>

            <Button
              type="button"
              variant="secondary"
              fullWidth
              size="md"
              disabled={isSubmitting}
              onClick={handleGoogleAuth}
              leftIcon={<GoogleIcon className="w-4 h-4" />}
            >
              {t('modals.auth.googleContinue')}
            </Button>
          </form>
        )}

        {/* Tab 3: Forgot Password Form */}
        {tab === 'forgot-password' && (
          <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
            <p className="font-sans text-xs sm:text-sm text-gray-700 dark:text-slate-300 font-medium">
              {t('modals.auth.forgotPasswordDesc')}
            </p>

            <Input
              label={t('modals.auth.email')}
              type="email"
              placeholder={t('modals.auth.emailPlaceholder')}
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              disabled={isSubmitting}
              required
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="md"
              isLoading={isSubmitting}
              leftIcon={<KeyRound className="w-4 h-4" />}
            >
              {t('modals.auth.sendResetLink')}
            </Button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setTab('login');
                  resetForm();
                }}
                className="text-xs font-mono font-bold text-gray-700 dark:text-slate-300 hover:text-black dark:hover:text-white underline hover:no-underline cursor-pointer"
              >
                ← {t('modals.auth.backToLogin')}
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Sign Up Form */}
        {tab === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-3.5">
            <Input
              label={t('modals.auth.fullName')}
              type="text"
              placeholder={t('modals.auth.fullNamePlaceholder')}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={isSubmitting}
              required
            />

            <Input
              label={t('modals.auth.email')}
              type="email"
              placeholder={t('modals.auth.emailPlaceholder')}
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              disabled={isSubmitting}
              required
            />

            <Input
              label={t('modals.auth.password')}
              type="password"
              placeholder={t('modals.auth.passwordPlaceholder')}
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              disabled={isSubmitting}
              required
            />

            {/* Eczacılık Fakültesi Dropdown */}
            <div className="w-full flex flex-col gap-1.5">
              <label
                htmlFor="faculty-select"
                className="text-xs font-mono font-bold uppercase tracking-wider text-black dark:text-slate-100 flex items-center gap-1.5"
              >
                <GraduationCap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>{t('modals.auth.faculty')}</span>
              </label>
              <select
                id="faculty-select"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                disabled={isSubmitting}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-[#131B2A] text-black dark:text-slate-100 font-mono text-sm border-3 border-black dark:border-slate-700 rounded-none shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#030712] focus:outline-none focus:ring-2 focus:ring-[#FFD93D] dark:focus:ring-[#F59E0B] transition-all duration-150"
              >
                {PHARMACY_FACULTIES.map((fac) => (
                  <option key={fac} value={fac} className="bg-white dark:bg-[#131B2A] text-black dark:text-slate-100">
                    {fac}
                  </option>
                ))}
              </select>
            </div>

            {/* Free lessons guarantee note */}
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border-2 border-black dark:border-slate-700 shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#030712] flex items-center gap-2 text-[11px] font-mono text-emerald-800 dark:text-emerald-300">
              <Sparkles className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{t('modals.auth.unlock22Lessons')}</span>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="md"
              isLoading={isSubmitting}
              leftIcon={<UserPlus className="w-4 h-4" />}
            >
              {t('modals.auth.signupAndStart')}
            </Button>
          </form>
        )}
      </div>
    </Modal>
  );
};
