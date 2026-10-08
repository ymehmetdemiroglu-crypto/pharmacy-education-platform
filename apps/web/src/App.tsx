import React, { useState, Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ErrorBoundary } from './components/ErrorBoundary';
import { TrialBanner, PaywallModal, SkeletonLoader } from '@pharmacy/ui';
import { useAuth } from '@pharmacy/platform';
import { callCreateCheckoutSession, callStartFreeTrial } from './lib/billing';
import { useTranslation } from './context/TranslationContext';

const PharmLearnStudioPage = lazy(() => import('./pages/PharmLearnStudioPage').then((m) => ({ default: m.PharmLearnStudioPage })));
const DashboardPage = lazy(() => import('./pages/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const WhiteboardTutorPage = lazy(() => import('./pages/WhiteboardTutorPage').then((m) => ({ default: m.WhiteboardTutorPage })));
const CatalogPage = lazy(() => import('./pages/CatalogPage').then((m) => ({ default: m.CatalogPage })));
const LessonPage = lazy(() => import('./pages/LessonPage').then((m) => ({ default: m.LessonPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then((m) => ({ default: m.GalleryPage })));
const PricingPage = lazy(() => import('./pages/PricingPage').then((m) => ({ default: m.PricingPage })));
const ReviewPage = lazy(() => import('./pages/ReviewPage').then((m) => ({ default: m.ReviewPage })));
const SettingsPage = lazy(() => import('./pages/SettingsPage').then((m) => ({ default: m.SettingsPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })));
const RefundPage = lazy(() => import('./pages/RefundPage').then((m) => ({ default: m.RefundPage })));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage })));

export const App: React.FC = () => {
  const { user, startTrial } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [paywallOpen, setPaywallOpen] = useState(false);

  const calculateDaysRemaining = () => {
    if (!user?.trialEndsAt) return 7;
    const diffMs = new Date(user.trialEndsAt).getTime() - Date.now();
    return Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  };

  const location = useLocation();
  const isStudio =
    location.pathname === '/' ||
    location.pathname === '/studio' ||
    location.pathname.startsWith('/workspace');

  if (isStudio) {
    return (
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="h-screen w-screen flex items-center justify-center font-mono bg-slate-900 text-white">
              PharmLearn Studio Yükleniyor...
            </div>
          }
        >
          <PharmLearnStudioPage />
        </Suspense>
      </ErrorBoundary>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#212121] text-slate-900 dark:text-[#ECECEC] transition-colors duration-150">
      <Navbar />

      {/* Account Plan Status Banner */}
      {user?.plan === 'trial' ? (
        <TrialBanner
          status="active_trial"
          daysRemaining={calculateDaysRemaining()}
          onActionClick={() => setPaywallOpen(true)}
        />
      ) : user?.trialUsed && user?.plan === 'free' ? (
        <TrialBanner
          status="expired_trial"
          onActionClick={() => setPaywallOpen(true)}
        />
      ) : null}

      <main className="flex-1">
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-4">
                <SkeletonLoader height="h-24" />
                <SkeletonLoader height="h-48" />
                <SkeletonLoader height="h-48" />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<PharmLearnStudioPage />} />
              <Route path="/studio" element={<PharmLearnStudioPage />} />
              <Route path="/workspace" element={<PharmLearnStudioPage />} />
              <Route path="/workspace/:courseId/:lessonId" element={<PharmLearnStudioPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/tutor/:lectureSlug" element={<WhiteboardTutorPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/review" element={<ReviewPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/refund" element={<RefundPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/courses/medchem/lessons/:lessonId" element={<LessonPage />} />
              <Route path="/courses/medchem/lessons" element={<Navigate to="/courses/medchem/lessons/1" replace />} />
              <Route path="/courses/pharmacology/lessons/:lessonId" element={<LessonPage />} />
              <Route path="/courses/pharmacology/lessons" element={<Navigate to="/courses/pharmacology/lessons/1" replace />} />
              <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonPage />} />
              <Route path="/courses/:courseId/lessons" element={<Navigate to="/catalog" replace />} />
              <Route path="*" element={<Navigate to="/catalog" replace />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>

      {/* Modern Studio Footer */}
      <footer className="border-t border-slate-200 dark:border-[#2F2F2F] bg-white dark:bg-[#171717] py-6 px-4 sm:px-6 text-slate-800 dark:text-[#ECECEC] transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans">
          <div className="flex flex-col gap-1 text-center sm:text-start">
            <span className="font-semibold tracking-tight text-slate-900 dark:text-[#ECECEC]">
              {t('footer.platformName')}
            </span>
            <span className="text-slate-500 dark:text-[#8E8E8E]">
              {t('footer.tagline')}
            </span>
            <div className="flex flex-wrap gap-4 mt-2 text-[11px] font-sans">
              <Link to="/terms" className="hover:underline text-slate-600 dark:text-slate-400">
                {t('footer.terms')}
              </Link>
              <Link to="/privacy" className="hover:underline text-slate-600 dark:text-slate-400">
                {t('footer.privacy')}
              </Link>
              <Link to="/refund" className="hover:underline text-slate-600 dark:text-slate-400">
                {t('footer.refund')}
              </Link>
              <Link to="/settings" className="hover:underline text-slate-600 dark:text-slate-400">
                {t('footer.settings')}
              </Link>
            </div>
          </div>

          <div className="text-center sm:text-end text-slate-500 dark:text-[#8E8E8E]">
            <p>{t('footer.curriculumBadge')}</p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
              {t('footer.slideCitation')}
            </p>
          </div>
        </div>
      </footer>

      {/* Global Paywall Modal */}
      <PaywallModal
        isOpen={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        onSelectPlan={async (plan, currency, isBundle) => {
          try {
            const res = await callCreateCheckoutSession({
              courseId: isBundle ? 'dual_bundle' : 'medchem',
              planId: plan === 'semester' ? 'semester_pass' : plan,
              currency,
              returnUrl: window.location.href,
            });
            if (res.data?.checkoutUrl) {
              window.location.href = res.data.checkoutUrl;
            } else {
              setPaywallOpen(false);
              navigate('/pricing');
            }
          } catch (err) {
            console.error('Checkout error:', err);
            setPaywallOpen(false);
            navigate('/pricing');
          }
        }}
        onStartTrial={async () => {
          try {
            await callStartFreeTrial();
          } catch (err) {
            console.warn('Backend trial activation notice:', err);
          }
          await startTrial();
          setPaywallOpen(false);
        }}
      />
    </div>
  );
};
