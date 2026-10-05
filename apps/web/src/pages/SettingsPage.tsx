import React, { useState } from 'react';
import { Card, Button, StickerBadge } from '@pharmacy/ui';
import { User, CreditCard, Trash2, ShieldAlert, ExternalLink } from 'lucide-react';
import { useAuth } from '@pharmacy/platform';
import { useTranslation } from '../context/TranslationContext';
import { callCreateCustomerPortalSession, callDeleteUserAccount } from '../lib/billing';
import { Link } from 'react-router-dom';

export const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleOpenCustomerPortal = async () => {
    try {
      setLoadingPortal(true);
      setStatusMessage(null);
      const res = await callCreateCustomerPortalSession({
        returnUrl: window.location.href,
        sendEmail: true,
      });

      if (res?.data?.portalUrl) {
        window.location.href = res.data.portalUrl;
      } else {
        throw new Error('Billing portal session URL not returned.');
      }
    } catch (err: any) {
      console.error('Portal session error:', err);
      setStatusMessage(t('settings.portalError', { error: err.message || 'Please try again.' }));
    } finally {
      setLoadingPortal(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation.trim().toUpperCase() !== 'DELETE') {
      alert(t('settings.typeDeleteToConfirm'));
      return;
    }

    try {
      setIsDeleting(true);
      await callDeleteUserAccount();
      logout();
      alert(t('settings.deleteSuccessAlert'));
      window.location.href = '/catalog';
    } catch (err: any) {
      console.error('Account deletion error:', err);
      alert(t('settings.deleteFailedAlert', { error: err.message || 'Contact support' }));
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] dark:bg-[#121212] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="border-b-3 border-black dark:border-slate-700 pb-4">
          <div className="flex items-center gap-2">
            <User className="w-6 h-6 text-indigo-500" />
            <h1 className="font-display font-black text-2xl uppercase tracking-tight text-gray-900 dark:text-white">
              {t('settings.headerTitle')}
            </h1>
          </div>
          <p className="font-body text-xs text-gray-600 dark:text-gray-400 mt-1">
            {t('settings.headerDesc')}
          </p>
        </div>

        {statusMessage && (
          <div className="p-3 bg-red-100 dark:bg-red-950/60 border-2 border-red-600 text-red-800 dark:text-red-200 text-xs font-mono">
            {statusMessage}
          </div>
        )}

        {/* Profile Details Card */}
        <Card variant="default" elevated className="p-6 space-y-4 bg-white dark:bg-slate-900 border-4 border-black dark:border-slate-700 shadow-neo">
          <div className="flex items-center justify-between border-b-2 border-black/10 dark:border-slate-700 pb-3">
            <div>
              <h2 className="font-display font-bold text-base text-gray-900 dark:text-white">
                {user?.displayName || t('settings.studentName')}
              </h2>
              <span className="font-mono text-xs text-gray-500">{user?.email}</span>
            </div>
            <StickerBadge
              variant={user?.plan === 'premium' ? 'green' : user?.plan === 'trial' ? 'yellow' : 'pink'}
              size="sm"
            >
              {user?.plan?.toUpperCase() || 'FREE'}
            </StickerBadge>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <span className="text-gray-500 block">{t('settings.faculty')}</span>
              <strong className="text-gray-900 dark:text-white">{user?.university || 'İstanbul Üniversitesi'}</strong>
            </div>
            <div>
              <span className="text-gray-500 block">{t('settings.country')}</span>
              <strong className="text-gray-900 dark:text-white">{user?.country || 'TR'}</strong>
            </div>
          </div>
        </Card>

        {/* Subscription & Billing Management */}
        <Card variant="default" elevated className="p-6 space-y-4 bg-white dark:bg-slate-900 border-4 border-black dark:border-slate-700 shadow-neo">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-600" />
            <h3 className="font-display font-bold text-base text-gray-900 dark:text-white">
              {t('settings.billingTitle')}
            </h3>
          </div>
          <p className="font-body text-xs text-gray-600 dark:text-gray-400">
            {t('settings.billingDesc')}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Button
              variant="secondary"
              isLoading={loadingPortal}
              onClick={handleOpenCustomerPortal}
              rightIcon={<ExternalLink className="w-4 h-4" />}
            >
              {t('settings.openPortal')}
            </Button>
            <Link to="/pricing">
              <Button variant="primary">
                {t('settings.pricingPlans')}
              </Button>
            </Link>
          </div>
        </Card>

        {/* KVKK / GDPR Account Deletion Card */}
        <Card variant="default" className="p-6 space-y-4 bg-red-50/50 dark:bg-red-950/20 border-3 border-red-500 dark:border-red-800">
          <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <h3 className="font-display font-bold text-base">
              {t('settings.deleteTitle')}
            </h3>
          </div>
          <p className="font-body text-xs text-red-900 dark:text-red-200">
            {t('settings.deleteDesc')}
          </p>

          <Button
            variant="danger"
            size="sm"
            onClick={() => setShowDeleteModal(true)}
            leftIcon={<Trash2 className="w-4 h-4" />}
          >
            {t('settings.deleteBtn')}
          </Button>
        </Card>
      </div>

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border-4 border-black dark:border-slate-700 max-w-md w-full p-6 space-y-4 shadow-neo">
            <h3 className="font-display font-black text-lg text-red-600 uppercase">
              {t('settings.confirmTitle')}
            </h3>
            <p className="text-xs font-mono text-gray-700 dark:text-gray-300">
              {t('settings.confirmPrompt')}
            </p>
            <input
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder="DELETE"
              className="w-full p-2 border-2 border-black dark:border-slate-700 font-mono text-sm uppercase"
            />
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setShowDeleteModal(false)}>
                {t('settings.cancel')}
              </Button>
              <Button
                variant="danger"
                size="sm"
                isLoading={isDeleting}
                onClick={handleDeleteAccount}
              >
                {t('settings.confirmDelete')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
