import React, { useState } from 'react';
import { Modal, Button, Input } from '@pharmacy/ui';
import { useAuth } from '@pharmacy/platform';
import { LogIn, UserPlus, Sparkles, CheckCircle2, AlertCircle, GraduationCap } from 'lucide-react';
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
  const { signInGuest, signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();

  const [tab, setTab] = useState<'login' | 'signup'>(defaultTab);

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

  const resetForm = () => {
    setError(null);
    setSuccessMessage(null);
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
      if (msg.includes('provider is not enabled') || msg.includes('validation_failed') || msg.includes('Unsupported provider')) {
        setError(t('modals.auth.googleNotConfigured'));
      } else {
        setError(err?.message || t('modals.auth.googleError'));
      }
      setIsSubmitting(false);
    }
  };

  const modalTitle = tab === 'login' ? t('modals.auth.loginTitle') : t('modals.auth.signupTitle');

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
