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
    window.location.reload();
  };

  private handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/catalog';
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
          description: 'Uygulama beklenmeyen bir durumla karşılaştı. Öğrenme ilerlemeniz kaydedildi.',
          retry: 'Yeniden Dene',
          catalog: 'Katalog',
        },
        ar: {
          title: 'حدث خطأ غير متوقع',
          description: 'واجه التطبيق مشكلة غير متوقعة. تم حفظ تقدمك التعليمي بأمان.',
          retry: 'إعادة المحاولة',
          catalog: 'فهرس المقررات',
        },
        en: {
          title: 'An Error Occurred',
          description: 'The application encountered an unexpected situation. Your learning progress has been saved.',
          retry: 'Retry',
          catalog: 'Catalog',
        },
      };

      const t = copy[locale] || copy.tr;

      return (
        <div
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
          className="min-h-screen bg-[#FFF8E7] dark:bg-[#121212] flex items-center justify-center p-4"
        >
          <Card
            variant="default"
            elevated
            className="max-w-lg w-full p-8 text-center space-y-6 bg-white dark:bg-[#1E293B] border-4 border-black dark:border-slate-700 shadow-neo dark:shadow-neo-dark"
          >
            <div className="w-16 h-16 bg-[#FF6B9D] border-3 border-black mx-auto flex items-center justify-center shadow-neo">
              <AlertOctagon className="w-8 h-8 text-black" />
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-black text-2xl uppercase tracking-tight text-gray-950 dark:text-white">
                {t.title}
              </h2>
              <p className="font-body text-sm text-gray-700 dark:text-gray-300">
                {t.description}
              </p>
              {this.state.error?.message && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 border-2 border-red-500 text-red-700 dark:text-red-300 text-xs font-mono text-start overflow-x-auto" dir="ltr">
                  {this.state.error.message}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button
                variant="primary"
                onClick={this.handleReset}
                leftIcon={<RotateCcw className="w-4 h-4 rtl:rotate-180" />}
              >
                {t.retry}
              </Button>
              <Button
                variant="secondary"
                onClick={this.handleGoHome}
                leftIcon={<Home className="w-4 h-4" />}
              >
                {t.catalog}
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
