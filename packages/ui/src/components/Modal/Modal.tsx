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
            'w-full bg-white dark:bg-[#131B2A] text-black dark:text-slate-100',
            'border-4 border-black dark:border-slate-700 rounded-none',
            'shadow-[8px_8px_0px_#000000] dark:shadow-[8px_8px_0px_#030712]',
            'flex flex-col overflow-hidden max-h-[90vh]',
            maxWidthMap[maxWidth],
            className
          )
        )}
      >
        {/* Header - [DES-P1-02] RTL layout handling */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b-3 border-black dark:border-slate-700 bg-[#FFF8E7] dark:bg-[#0B0F17]">
          <h2
            id="modal-title"
            className="font-display font-black text-lg sm:text-xl tracking-tight uppercase"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={activeCloseLabel}
            className="p-1.5 border-2 border-black dark:border-slate-700 hover:bg-black/10 dark:hover:bg-slate-800 text-black dark:text-slate-100 active:translate-x-0.5 active:translate-y-0.5 transition-transform"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="p-4 border-t-3 border-black dark:border-slate-700 bg-[#FFF8E7] dark:bg-[#0B0F17]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
