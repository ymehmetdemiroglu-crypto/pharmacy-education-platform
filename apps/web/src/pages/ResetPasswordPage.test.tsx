import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const mockUpdatePassword = vi.fn();
const mockGetSession = vi.fn();
const mockOnAuthStateChange = vi.fn();

vi.mock('@pharmacy/platform', () => ({
  useAuth: () => ({
    user: { email: 'student@pharmacy.edu.tr' },
    updatePassword: mockUpdatePassword,
  }),
  supabase: {
    auth: {
      getSession: () => mockGetSession(),
      onAuthStateChange: (...args: any[]) => mockOnAuthStateChange(...args),
      updateUser: vi.fn(),
    },
  },
}));

vi.mock('../context/TranslationContext', () => ({
  useTranslation: () => ({
    locale: 'tr',
    t: (key: string) => {
      const dict: Record<string, string> = {
        'resetPasswordPage.title': 'Yeni Şifre Belirleyin',
        'resetPasswordPage.desc': 'Hesabınız için yeni ve güvenli bir şifre giriniz.',
        'resetPasswordPage.newPassword': 'Yeni Şifre',
        'resetPasswordPage.newPasswordPlaceholder': 'En az 6 karakter',
        'resetPasswordPage.confirmPassword': 'Yeni Şifre (Tekrar)',
        'resetPasswordPage.confirmPasswordPlaceholder': 'Şifrenizi tekrar girin',
        'resetPasswordPage.submit': 'Şifremi Güncelle',
        'resetPasswordPage.passwordsDoNotMatch': 'Girdiğiniz şifreler birbiriyle eşleşmiyor.',
        'resetPasswordPage.passwordTooShort': 'Şifreniz en az 6 karakter olmalıdır.',
        'resetPasswordPage.success': 'Şifreniz başarıyla güncellendi! Giriş yapılıyor...',
        'resetPasswordPage.error': 'Şifre güncellenirken bir hata oluştu.',
        'resetPasswordPage.goToDashboard': 'Öğrenci Paneline Git',
        'resetPasswordPage.invalidSession': 'Geçerli bir şifre sıfırlama oturumu bulunamadı.',
        'modals.auth.fillAllFields': 'Lütfen tüm alanları doldurunuz.',
      };
      return dict[key] || key;
    },
    dir: 'ltr',
    setLocale: () => undefined,
  }),
}));

import { ResetPasswordPage } from './ResetPasswordPage';

describe('ResetPasswordPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetSession.mockResolvedValue({ data: { session: { user: { id: 'u1' } } } });
    mockOnAuthStateChange.mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } });
  });

  const renderPage = () =>
    render(
      <MemoryRouter initialEntries={['/reset-password']}>
        <Routes>
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/dashboard" element={<div>Dashboard Page</div>} />
        </Routes>
      </MemoryRouter>
    );

  it('renders password inputs and submit button', async () => {
    renderPage();
    expect(await screen.findByRole('heading', { level: 1, name: 'Yeni Şifre Belirleyin' })).toBeTruthy();
    expect(screen.getByPlaceholderText('En az 6 karakter')).toBeTruthy();
    expect(screen.getByPlaceholderText('Şifrenizi tekrar girin')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Şifremi Güncelle' })).toBeTruthy();
  });

  it('shows error if password is shorter than 6 characters', async () => {
    renderPage();
    await screen.findByRole('heading', { level: 1 });

    fireEvent.change(screen.getByPlaceholderText('En az 6 karakter'), {
      target: { value: '123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Şifrenizi tekrar girin'), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Şifremi Güncelle' }));

    expect(await screen.findByText('Şifreniz en az 6 karakter olmalıdır.')).toBeTruthy();
    expect(mockUpdatePassword).not.toHaveBeenCalled();
  });

  it('shows error if passwords do not match', async () => {
    renderPage();
    await screen.findByRole('heading', { level: 1 });

    fireEvent.change(screen.getByPlaceholderText('En az 6 karakter'), {
      target: { value: 'secret123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Şifrenizi tekrar girin'), {
      target: { value: 'different123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Şifremi Güncelle' }));

    expect(await screen.findByText('Girdiğiniz şifreler birbiriyle eşleşmiyor.')).toBeTruthy();
    expect(mockUpdatePassword).not.toHaveBeenCalled();
  });

  it('submits successfully when passwords match and are >= 6 chars', async () => {
    mockUpdatePassword.mockResolvedValueOnce(undefined);
    renderPage();
    await screen.findByRole('heading', { level: 1 });

    fireEvent.change(screen.getByPlaceholderText('En az 6 karakter'), {
      target: { value: 'newSecurePass123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Şifrenizi tekrar girin'), {
      target: { value: 'newSecurePass123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Şifremi Güncelle' }));

    await waitFor(() => {
      expect(mockUpdatePassword).toHaveBeenCalledWith('newSecurePass123');
    });

    expect(await screen.findByText('Şifreniz başarıyla güncellendi! Giriş yapılıyor...')).toBeTruthy();
  });
});
