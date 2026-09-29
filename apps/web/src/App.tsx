import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { GalleryPage } from './pages/GalleryPage';
import { CatalogPage } from './pages/CatalogPage';
import { PricingPage } from './pages/PricingPage';
import { LessonPage } from './pages/LessonPage';
import { TrialBanner, PaywallModal } from '@pharmacy/ui';
import { useAuth } from '@pharmacy/platform';

export const App: React.FC = () => {
  const { user } = useAuth();
  const [paywallOpen, setPaywallOpen] = useState(false);

  const calculateDaysRemaining = () => {
    if (!user?.trialEndsAt) return 7;
    const diffMs = new Date(user.trialEndsAt).getTime() - Date.now();
    return Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8E7] dark:bg-[#121212] text-black dark:text-white transition-colors duration-150">
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
        <Routes>
          <Route path="/" element={<Navigate to="/gallery" replace />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/courses/medchem/lessons/:lessonId" element={<LessonPage />} />
          <Route path="/courses/medchem/lessons" element={<Navigate to="/courses/medchem/lessons/1" replace />} />
          <Route path="*" element={<Navigate to="/gallery" replace />} />
        </Routes>
      </main>

      {/* Neo-Brutalist Footer */}
      <footer className="border-t-3 border-black dark:border-white bg-white dark:bg-[#1A1A1A] py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="font-bold uppercase tracking-wider">
              PharmLearn Education Platform
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              Commercial-grade interactive learning for Medicinal Chemistry & Pharmacology
            </span>
          </div>

          <div className="text-center sm:text-right text-gray-700 dark:text-gray-300">
            <p>100% Originally Authored Curriculum • Native Vector SMILES</p>
            <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-0.5">
              Source slide references cited for academic verifiability.
            </p>
          </div>
        </div>
      </footer>

      {/* Global Paywall Modal */}
      <PaywallModal
        isOpen={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        onSelectPlan={() => setPaywallOpen(false)}
        onStartTrial={() => setPaywallOpen(false)}
      />
    </div>
  );
};
