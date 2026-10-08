import React, { useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  locale?: 'en' | 'tr' | 'ar';
  closeAriaLabel?: string;
}

const maxWidthMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = 'md',
  className,
  locale,
  closeAriaLabel,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const activeCloseLabel =
    closeAriaLabel ||
    (locale === 'tr'
      ? 'Kapat (Close modal)'
      : locale === 'ar'
      ? 'إغلاق (Close modal)'
      : 'Close modal');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !modalRef.current) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // [CODE-P1-01] Focus trap within modal dialog
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        const first = modalRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        first?.focus();
      }, 50);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-none animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
        className={twMerge(
          clsx(
            'w-full bg-white dark:bg-[#171717] text-slate-900 dark:text-[#ECECEC]',
            'border border-slate-200 dark:border-[#2F2F2F] rounded-2xl',
            'shadow-2xl',
            'flex flex-col overflow-hidden max-h-[90vh]',
            maxWidthMap[maxWidth],
            className
          )
        )}
      >
        {/* Header - [DES-P1-02] RTL layout handling */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-[#2F2F2F] bg-slate-50 dark:bg-[#1F1F1F]">
          <h2
            id="modal-title"
            className="font-sans font-semibold text-base sm:text-lg tracking-tight text-slate-900 dark:text-[#ECECEC]"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={activeCloseLabel}
            className="p-1.5 rounded-lg border border-transparent hover:bg-slate-200 dark:hover:bg-[#2A2A2A] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="p-4 border-t border-slate-200 dark:border-[#2F2F2F] bg-slate-50 dark:bg-[#1F1F1F]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
