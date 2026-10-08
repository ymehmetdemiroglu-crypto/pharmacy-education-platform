import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@pharmacy/ui';
import { useAuth } from '@pharmacy/platform';
import { supabase } from '@pharmacy/platform';
import { KeyRound, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

export const ResetPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const { updatePassword, user } = useAuth();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [hasValidSession, setHasValidSession] = useState<boolean | null>(null);

  useEffect(() => {
    const scrubUrlTokens = () => {
      if (typeof window !== 'undefined' && (window.location.hash || window.location.search)) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    };

    // 1. Check for URL error fragments (e.g. expired or invalid reset link)
    const hash = window.location.hash;
    const search = window.location.search;
    const params = new URLSearchParams(hash.replace(/^#/, '') || search);
    const errorDesc = params.get('error_description');

    if (errorDesc) {
      setError(decodeURIComponent(errorDesc).replace(/\+/g, ' '));
      setHasValidSession(false);
      scrubUrlTokens();
      return;
    }

    // 2. Check current session or listen for PASSWORD_RECOVERY event
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setHasValidSession(true);
        scrubUrlTokens();
      } else {
        // Give listener a moment in case token exchange is in-flight
        setTimeout(() => {
          supabase.auth.getSession().then(({ data: { session: retrySession } }) => {
            setHasValidSession(!!retrySession);
            scrubUrlTokens();
          });
        }, 800);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || (event === 'SIGNED_IN' && session)) {
        setHasValidSession(true);
        setError(null);
        scrubUrlTokens();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hasValidSession === false) {
      setError(t('resetPasswordPage.invalidSession'));
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError(t('modals.auth.fillAllFields'));
      return;
    }

    if (newPassword.length < 6) {
      setError(t('resetPasswordPage.passwordTooShort'));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t('resetPasswordPage.passwordsDoNotMatch'));
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (updatePassword) {
        await updatePassword(newPassword);
      } else {
        const { error: sbErr } = await supabase.auth.updateUser({
          password: newPassword,
        });
        if (sbErr) throw sbErr;
      }

      setSuccess(true);
      if (typeof window !== 'undefined' && (window.location.hash || window.location.search)) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err: any) {
      setError(err?.message || t('resetPasswordPage.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
      <div className="bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl shadow-xs p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="space-y-2 pb-4 border-b border-slate-100 dark:border-[#2F2F2F]">
          <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl flex items-center justify-center">
            <KeyRound className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-[#ECECEC]">
            {t('resetPasswordPage.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400">
            {t('resetPasswordPage.desc')}
          </p>
        </div>

        {/* Status Alerts */}
        {error && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 rounded-xl flex items-start gap-2.5 text-xs font-semibold text-rose-800 dark:text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {hasValidSession === false && !error && (
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
            <span>{t('resetPasswordPage.invalidSession')}</span>
          </div>
        )}

        {success ? (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>{t('resetPasswordPage.success')}</span>
            </div>

            <Button
              type="button"
              variant="primary"
              fullWidth
              size="md"
              onClick={() => navigate('/dashboard')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {t('resetPasswordPage.goToDashboard')}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={t('resetPasswordPage.newPassword')}
              type="password"
              placeholder={t('resetPasswordPage.newPasswordPlaceholder')}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isSubmitting || hasValidSession === false}
              required
            />

            <Input
              label={t('resetPasswordPage.confirmPassword')}
              type="password"
              placeholder={t('resetPasswordPage.confirmPasswordPlaceholder')}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isSubmitting || hasValidSession === false}
              required
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="md"
              isLoading={isSubmitting}
              disabled={isSubmitting || hasValidSession === false}
              leftIcon={<KeyRound className="w-4 h-4" />}
            >
              {t('resetPasswordPage.submit')}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
