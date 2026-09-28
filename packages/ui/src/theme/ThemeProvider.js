import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
const ThemeContext = createContext(undefined);
export const ThemeProvider = ({ children, defaultTheme = 'light', defaultLocale = 'en', }) => {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('pharmacy_theme');
            if (saved === 'light' || saved === 'dark')
                return saved;
            if (window.matchMedia('(prefers-color-scheme: dark)').matches)
                return 'dark';
        }
        return defaultTheme;
    });
    const [locale, setLocale] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('pharmacy_locale');
            if (saved === 'en' || saved === 'tr' || saved === 'ar')
                return saved;
        }
        return defaultLocale;
    });
    const direction = locale === 'ar' ? 'rtl' : 'ltr';
    useEffect(() => {
        if (typeof window === 'undefined')
            return;
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        }
        else {
            root.classList.remove('dark');
        }
        localStorage.setItem('pharmacy_theme', theme);
    }, [theme]);
    useEffect(() => {
        if (typeof window === 'undefined')
            return;
        const root = document.documentElement;
        root.setAttribute('dir', direction);
        root.setAttribute('lang', locale);
        localStorage.setItem('pharmacy_locale', locale);
    }, [direction, locale]);
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };
    return (_jsx(ThemeContext.Provider, { value: {
            theme,
            direction,
            locale,
            setTheme,
            setLocale,
            toggleTheme,
        }, children: _jsx("div", { className: `app-root ${theme} ${direction}`, dir: direction, children: children }) }));
};
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
