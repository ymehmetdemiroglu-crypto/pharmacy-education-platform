import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { useTheme } from '@pharmacy/ui';
import { dictionaries, type Locale } from '../locales';

export interface TranslationContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  dir: 'ltr' | 'rtl';
}

export const TranslationContext = createContext<TranslationContextValue | undefined>(undefined);

function getNestedValue(obj: Record<string, any>, path: string): any {
  const parts = path.split('.');
  let current: any = obj;
  for (const part of parts) {
    if (current === undefined || current === null) return undefined;
    current = current[part];
  }
  return current;
}

export interface TranslationProviderProps {
  children: React.ReactNode;
  defaultLocale?: Locale;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({
  children,
  defaultLocale: _defaultLocale = 'tr',
}) => {
  const theme = useTheme();

  // Active locale with Turkish as canonical primary default
  const activeLocale: Locale = theme.locale === 'ar' ? 'ar' : theme.locale === 'en' ? 'en' : 'tr';

  const setLocale = useCallback(
    (newLocale: Locale) => {
      theme.setLocale(newLocale);
    },
    [theme]
  );

  const dir: 'ltr' | 'rtl' = activeLocale === 'ar' ? 'rtl' : 'ltr';

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const activeDict = dictionaries[activeLocale] || dictionaries.tr;
      const fallbackDict = dictionaries.tr;

      let value = getNestedValue(activeDict, key);
      if (value === undefined) {
        value = getNestedValue(fallbackDict, key);
      }

      if (typeof value !== 'string') {
        if (value !== undefined) {
          return String(value);
        }
        return key;
      }

      if (!params) {
        return value;
      }

      // Replace {paramName} with value
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        if (params[paramKey] !== undefined) {
          return String(params[paramKey]);
        }
        return match;
      });
    },
    [activeLocale]
  );

  const value = useMemo<TranslationContextValue>(
    () => ({
      locale: activeLocale,
      setLocale,
      t,
      dir,
    }),
    [activeLocale, setLocale, t, dir]
  );

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export function useTranslation(): TranslationContextValue {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
