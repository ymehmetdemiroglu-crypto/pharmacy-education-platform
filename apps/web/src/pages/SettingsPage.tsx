import React, { useState } from 'react';
import { Card, Button, StickerBadge } from '@pharmacy/ui';
import { User, CreditCard, Trash2, ShieldAlert, ExternalLink } from 'lucide-react';
import { useAuth } from '@pharmacy/platform';
import { useTranslation } from '../context/TranslationContext';
import { callCreateCustomerPortalSession, callDeleteUserAccount } from '../lib/firebase';
import { Link } from 'react-router-dom';

export const SettingsPage: React.FC = () => {
  const { locale } = useTranslation();
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
      setStatusMessage(
        locale === 'tr'
          ? `Müşteri paneli açılamadı: ${err.message || 'Lütfen tekrar deneyin.'}`
          : `تعذر فتح بوابة الفواتير: ${err.message || 'يرجى المحاولة مجدداً.'}`
      );
    } finally {
      setLoadingPortal(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation.trim().toUpperCase() !== 'DELETE') {
      alert(locale === 'tr' ? 'Lütfen onaylamak için DELETE yazın.' : 'يرجى كتابة DELETE للتأكيد.');
      return;
    }

    try {
      setIsDeleting(true);
      await callDeleteUserAccount();
      logout();
      alert(
        locale === 'tr'
          ? 'Hesabınız ve tüm kişisel verileriniz KVKK/GDPR kapsamında başarıyla silindi.'
          : 'تم حذف حسابك وجميع بياناتك الشخصية بنجاح وفق معايير الخصوصية.'
      );
      window.location.href = '/catalog';
    } catch (err: any) {
      console.error('Account deletion error:', err);
      alert(
        locale === 'tr'
          ? `Hesap silme başarısız oldu: ${err.message || 'Lütfen müşteri hizmetleriyle iletişime geçin.'}`
          : `فشل حذف الحساب: ${err.message || 'يرجى التواصل مع الدعم.'}`
      );
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
              {locale === 'tr' ? 'Hesap & Abonelik Ayarları' : locale === 'ar' ? 'إعدادات الحساب والاشتراك' : 'Account & Subscription Settings'}
            </h1>
          </div>
          <p className="font-body text-xs text-gray-600 dark:text-gray-400 mt-1">
            {locale === 'tr'
              ? 'Öğrenci profili, Dodo Payments abonelik yönetimi ve KVKK veri hakları'
              : locale === 'ar'
              ? 'الملف الشخصي، إدارة اشتراكات Dodo Payments، وحقوق الخصوصية'
              : 'Student profile, billing management via Dodo Payments, and privacy controls'}
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
                {user?.displayName || 'Öğrenci / Student'}
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
              <span className="text-gray-500 block">Fakülte / Faculty:</span>
              <strong className="text-gray-900 dark:text-white">{user?.university || 'İstanbul Üniversitesi'}</strong>
            </div>
            <div>
              <span className="text-gray-500 block">Ülke / Country:</span>
              <strong className="text-gray-900 dark:text-white">{user?.country || 'TR'}</strong>
            </div>
          </div>
        </Card>

        {/* Subscription & Billing Management */}
        <Card variant="default" elevated className="p-6 space-y-4 bg-white dark:bg-slate-900 border-4 border-black dark:border-slate-700 shadow-neo">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-600" />
            <h3 className="font-display font-bold text-base text-gray-900 dark:text-white">
              {locale === 'tr' ? 'Abonelik & Ödeme Yönetimi' : locale === 'ar' ? 'إدارة الاشتراك والفواتير' : 'Billing & Subscriptions'}
            </h3>
          </div>
          <p className="font-body text-xs text-gray-600 dark:text-gray-400">
            {locale === 'tr'
              ? 'Faturalarınızı görüntüleyin, kart bilgilerinizi güncelleyin veya planınızı self-servis Dodo Payments müşteri portalından değiştirin.'
              : locale === 'ar'
              ? 'عرض الفواتير، تحديث البطاقات، أو تغيير الخطة عبر بوابة المشترك المعتمدة.'
              : 'View invoices, update cards, or modify subscription plans via Dodo Payments self-service customer portal.'}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Button
              variant="secondary"
              isLoading={loadingPortal}
              onClick={handleOpenCustomerPortal}
              rightIcon={<ExternalLink className="w-4 h-4" />}
            >
              {locale === 'tr' ? 'Müşteri Portalını Aç (Dodo)' : locale === 'ar' ? 'فتح بوابة المشترك (Dodo)' : 'Open Customer Portal'}
            </Button>
            <Link to="/pricing">
              <Button variant="primary">
                {locale === 'tr' ? 'Fiyatlandırma & Planlar' : locale === 'ar' ? 'الخطط والأسعار' : 'Pricing & Plans'}
              </Button>
            </Link>
          </div>
        </Card>

        {/* KVKK / GDPR Account Deletion Card */}
        <Card variant="default" className="p-6 space-y-4 bg-red-50/50 dark:bg-red-950/20 border-3 border-red-500 dark:border-red-800">
          <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <h3 className="font-display font-bold text-base">
              {locale === 'tr' ? 'KVKK / GDPR: Hesabı ve Verileri Sil' : locale === 'ar' ? 'حذف الحساب والبيانات' : 'Delete Account & Privacy Data'}
            </h3>
          </div>
          <p className="font-body text-xs text-red-900 dark:text-red-200">
            {locale === 'tr'
              ? 'Hesabınızı sildiğinizde; aktif abonelikleriniz iptal edilir, tüm öğrenme ilerlemeniz ve aralıklı tekrar kartlarınız kalıcı olarak silinir. Bu işlem geri alınamaz.'
              : locale === 'ar'
              ? 'عند حذف الحساب، سيتم إلغاء الاشتراكات النشطة وحذف سجلات التقدم وبطاقات المراجعة نهائياً دون إمكانية للاسترجاع.'
              : 'Deleting your account cancels active subscriptions and permanently wipes all study progress and review flashcards.'}
          </p>

          <Button
            variant="danger"
            size="sm"
            onClick={() => setShowDeleteModal(true)}
            leftIcon={<Trash2 className="w-4 h-4" />}
          >
            {locale === 'tr' ? 'Hesabımı Kalıcı Olarak Sil' : locale === 'ar' ? 'حذف حسابي نهائياً' : 'Permanently Delete Account'}
          </Button>
        </Card>
      </div>

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border-4 border-black dark:border-slate-700 max-w-md w-full p-6 space-y-4 shadow-neo">
            <h3 className="font-display font-black text-lg text-red-600 uppercase">
              {locale === 'tr' ? 'Hesap Silme Onayı' : locale === 'ar' ? 'تأكيد حذف الحساب' : 'Confirm Account Deletion'}
            </h3>
            <p className="text-xs font-mono text-gray-700 dark:text-gray-300">
              {locale === 'tr'
                ? 'Onaylamak için lütfen aşağıdaki kutuya DELETE yazın:'
                : locale === 'ar'
                ? 'يرجى كتابة DELETE في المربع أدناه للتأكيد:'
                : 'Please type DELETE into the input box below to confirm:'}
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
                {locale === 'tr' ? 'Vazgeç' : locale === 'ar' ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button
                variant="danger"
                size="sm"
                isLoading={isDeleting}
                onClick={handleDeleteAccount}
              >
                {locale === 'tr' ? 'Onayla ve Sil' : locale === 'ar' ? 'تأكيد الحذف' : 'Confirm Delete'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
