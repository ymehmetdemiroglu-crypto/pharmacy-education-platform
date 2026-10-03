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
      return (
        <div className="min-h-screen bg-[#FFF8E7] dark:bg-[#121212] flex items-center justify-center p-4">
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
                Bir Hata Oluştu / An Error Occurred
              </h2>
              <p className="font-body text-sm text-gray-700 dark:text-gray-300">
                Uygulama beklenmeyen bir durumla karşılaştı. Öğrenme ilerlemeniz kaydedildi.
              </p>
              {this.state.error?.message && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 border-2 border-red-500 text-red-700 dark:text-red-300 text-xs font-mono text-start overflow-x-auto">
                  {this.state.error.message}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button
                variant="primary"
                onClick={this.handleReset}
                leftIcon={<RotateCcw className="w-4 h-4" />}
              >
                Yeniden Dene / Retry
              </Button>
              <Button
                variant="secondary"
                onClick={this.handleGoHome}
                leftIcon={<Home className="w-4 h-4" />}
              >
                Katalog / Catalog
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
