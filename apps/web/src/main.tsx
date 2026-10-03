import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@pharmacy/ui';
import { AuthProvider } from '@pharmacy/platform';
import { TranslationProvider } from './context/TranslationContext';
import { App } from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" defaultLocale="tr">
        <TranslationProvider defaultLocale="tr">
          <AuthProvider>
            <App />
          </AuthProvider>
        </TranslationProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
