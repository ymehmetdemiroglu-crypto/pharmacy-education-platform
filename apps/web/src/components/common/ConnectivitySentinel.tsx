import React, { useState, useEffect } from 'react';
import { WifiOutlined, CheckCircleFilled, CloseOutlined } from '@ant-design/icons';

interface ConnectivitySentinelProps {
  initialOnlineState?: boolean;
}

export const ConnectivitySentinel: React.FC<ConnectivitySentinelProps> = ({
  initialOnlineState,
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    if (typeof initialOnlineState === 'boolean') return initialOnlineState;
    if (typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean') {
      return navigator.onLine;
    }
    return true;
  });

  const [hasBeenOffline, setHasBeenOffline] = useState(false);
  const [showReconnectedBanner, setShowReconnectedBanner] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setDismissed(false);
      if (hasBeenOffline) {
        setShowReconnectedBanner(true);
        const timer = setTimeout(() => {
          setShowReconnectedBanner(false);
        }, 3500);
        return () => clearTimeout(timer);
      }
      return undefined;
    };

    const handleOffline = () => {
      setIsOnline(false);
      setHasBeenOffline(true);
      setShowReconnectedBanner(false);
      setDismissed(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [hasBeenOffline]);

  if (dismissed) return null;

  // OFFLINE STATE BANNER
  if (!isOnline) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="fixed top-3 left-1/2 -translate-x-1/2 z-50 animate-fadeIn"
      >
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-amber-50 dark:bg-[#1A1813] border border-amber-300 dark:border-amber-700/60 text-amber-900 dark:text-amber-200 shadow-md text-xs font-medium backdrop-blur-md">
          <WifiOutlined className="text-amber-600 dark:text-amber-400 text-sm" />
          <span>
            <strong>Çevrimdışı Mod:</strong> İlerlemeleriniz ve notlarınız yerel olarak güvenle kaydediliyor.
          </span>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Kapat"
            className="ml-1 text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-100 cursor-pointer p-0.5"
          >
            <CloseOutlined className="text-[10px]" />
          </button>
        </div>
      </div>
    );
  }

  // RECONNECTED STATE BANNER
  if (showReconnectedBanner) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="fixed top-3 left-1/2 -translate-x-1/2 z-50 animate-fadeIn"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-[#121B17] border border-emerald-300 dark:border-emerald-700/60 text-emerald-900 dark:text-emerald-200 shadow-md text-xs font-medium backdrop-blur-md">
          <CheckCircleFilled className="text-emerald-600 dark:text-emerald-400 text-sm" />
          <span>
            <strong>Yeniden Bağlandı:</strong> İnternet bağlantısı sağlandı, veriler senkronize.
          </span>
          <button
            type="button"
            onClick={() => setShowReconnectedBanner(false)}
            aria-label="Kapat"
            className="ml-1 text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-100 cursor-pointer p-0.5"
          >
            <CloseOutlined className="text-[10px]" />
          </button>
        </div>
      </div>
    );
  }

  return null;
};
