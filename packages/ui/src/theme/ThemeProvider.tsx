import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';
export type Direction = 'ltr' | 'rtl';
export type Locale = 'en' | 'tr' | 'ar';

export interface ThemeContextType {
  theme: Theme;
  direction: Direction;
  locale: Locale;
  setTheme: (theme: Theme) => void;
  setLocale: (locale: Locale) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultLocale?: Locale;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'light',
  defaultLocale = 'tr',
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pharmacy_theme') as Theme | null;
      if (saved === 'light' || saved === 'dark') return saved;
      if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return defaultTheme;
  });

  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pharmacy_locale') as Locale | null;
      if (saved === 'en' || saved === 'tr' || saved === 'ar') return saved;
    }
    return defaultLocale;
  });

  const direction: Direction = locale === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('pharmacy_theme', theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    root.setAttribute('dir', direction);
    root.setAttribute('lang', locale);
    localStorage.setItem('pharmacy_locale', locale);
  }, [direction, locale]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        direction,
        locale,
        setTheme,
        setLocale,
        toggleTheme,
      }}
    >
      <div className={`app-root ${theme} ${direction}`} dir={direction}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: 'light',
      direction: 'ltr',
      locale: 'tr',
      setTheme: () => {},
      setLocale: () => {},
      toggleTheme: () => {},
    };
  }
  return context;
};
