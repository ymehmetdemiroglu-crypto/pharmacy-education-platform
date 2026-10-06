import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, Button } from '@pharmacy/ui';
import { AlertOctagon, RotateCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (typeof window !== 'undefined' && window.location) {
      window.location.reload();
    }
  };

  private handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    if (typeof window !== 'undefined' && window.location) {
      window.location.href = '/';
    }
  };

  private handleClearCache = () => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.clear();
        localStorage.removeItem('pharmlearn_active_concept');
        localStorage.removeItem('pep_codex_active_lecture');
      } catch {
        // ignore
      }
      this.handleReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      const getLocale = (): 'tr' | 'ar' | 'en' => {
        if (typeof window !== 'undefined') {
          const saved = localStorage.getItem('pharmacy_locale');
          if (saved === 'tr' || saved === 'ar' || saved === 'en') return saved;
          const docLang = document.documentElement.getAttribute('lang');
          if (docLang === 'tr' || docLang === 'ar' || docLang === 'en') return docLang;
        }
        return 'tr';
      };

      const locale = getLocale();
      const copy = {
        tr: {
          title: 'Bir Hata Oluştu',
          description: 'Çalışma alanı beklenmeyen bir durumla karşılaştı. İlerlemeniz ve notlarınız yerel olarak güvenle kaydedildi.',
          retry: 'Yeniden Dene & Tuvali Başlat',
          catalog: 'Ana Sayfaya Dön',
          clearCache: 'Önbelleği Sıfırla',
        },
        ar: {
          title: 'حدث خطأ غير متوقع',
          description: 'واجهت مساحة العمل مشكلة غير متوقعة. تم حفظ تقدمك التعليمي وملاحظاتك بأمان.',
          retry: 'إعادة المحاولة وتشغيل اللوحة',
          catalog: 'العودة للرئيسية',
          clearCache: 'إعادة ضبط الذاكرة',
        },
        en: {
          title: 'An Error Occurred',
          description: 'The study workspace encountered an unexpected issue. Your progress and notes are safely preserved.',
          retry: 'Retry & Restart Workspace',
          catalog: 'Return Home',
          clearCache: 'Reset Cache',
        },
      };

      const t = copy[locale] || copy.tr;

      return (
        <div
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
          className="min-h-screen bg-slate-50 dark:bg-[#212121] flex items-center justify-center p-4 transition-colors"
        >
          <div
            className="max-w-lg w-full p-6 sm:p-8 text-center space-y-5 bg-white dark:bg-[#171717] border border-slate-200 dark:border-[#2F2F2F] rounded-2xl shadow-xl"
          >
            <div className="w-14 h-14 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-2xl mx-auto flex items-center justify-center text-rose-600 dark:text-rose-400">
              <AlertOctagon className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h2 className="font-bold text-xl sm:text-2xl text-slate-900 dark:text-[#ECECEC] m-0">
                {t.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-[#B4B4B4] leading-relaxed">
                {t.description}
              </p>
              {this.state.error?.message && (
                <div className="p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-800 dark:text-rose-300 text-xs font-mono text-start overflow-x-auto" dir="ltr">
                  {this.state.error.message}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#10A37F] hover:bg-[#0E8C6D] active:scale-95 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer border-0"
              >
                <RotateCcw className="w-3.5 h-3.5 rtl:rotate-180" />
                <span>{t.retry}</span>
              </button>
              <button
                type="button"
                onClick={this.handleGoHome}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-[#2A2A2A] hover:bg-slate-200 dark:hover:bg-[#333333] text-slate-800 dark:text-[#ECECEC] text-xs font-semibold border border-slate-200 dark:border-[#2F2F2F] shadow-xs transition-all cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>{t.catalog}</span>
              </button>
              <button
                type="button"
                onClick={this.handleClearCache}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-slate-500 hover:text-rose-500 text-[11px] font-medium transition-all cursor-pointer bg-transparent border-0"
              >
                <span>{t.clearCache}</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
