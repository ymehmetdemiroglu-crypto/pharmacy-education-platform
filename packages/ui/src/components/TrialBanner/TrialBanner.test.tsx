import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { TrialBanner } from './TrialBanner';
import { ThemeProvider } from '../../theme/ThemeProvider';

describe('TrialBanner Component', () => {
  it('renders default Turkish free preview banner with start trial CTA', () => {
    const handleClick = vi.fn();
    render(<TrialBanner status="free_preview" onActionClick={handleClick} />);
    expect(screen.getByText(/Tüm modüllerde 1\. ve 2\. dersler/i)).toBeInTheDocument();
    expect(screen.getByText(/Kalıcı Olarak Ücretsizdir/i)).toBeInTheDocument();
    const btn = screen.getByRole('button', { name: /7 Günlük Ücretsiz Denemeyi Başlat/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders default Turkish active trial with remaining days', () => {
    const handleClick = vi.fn();
    render(<TrialBanner status="active_trial" daysRemaining={4} onActionClick={handleClick} />);
    expect(screen.getByText(/4 gün kaldı/i)).toBeInTheDocument();
    expect(screen.getByText(/7 Günlük Premium Ücretsiz Deneme Aktif/i)).toBeInTheDocument();
    const btn = screen.getByRole('button', { name: /Öğrenci Aboneliklerini İncele/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders default Turkish expired trial banner', () => {
    const handleClick = vi.fn();
    render(<TrialBanner status="expired_trial" onActionClick={handleClick} />);
    expect(screen.getByText(/7 günlük deneme süreniz sona erdi/i)).toBeInTheDocument();
    const btn = screen.getByRole('button', { name: /Akademik Abonelik Seç/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders authentic Arabic copy with bdi isolation when locale is ar', () => {
    const handleClick = vi.fn();
    render(
      <ThemeProvider defaultLocale="ar">
        <TrialBanner status="free_preview" onActionClick={handleClick} />
      </ThemeProvider>
    );
    expect(screen.getByText(/الدرسان 1 و2 من جميع الموديولات/i)).toBeInTheDocument();
    expect(screen.getByText(/مجانيان دائماً/i)).toBeInTheDocument();
    const btn = screen.getByRole('button', { name: /ابدأ التجربة المجانية لـ 7 أيام/i });
    expect(btn).toBeInTheDocument();
  });

  it('renders authentic Arabic active trial and expired trial copy', () => {
    const { unmount } = render(
      <ThemeProvider defaultLocale="ar">
        <TrialBanner status="active_trial" daysRemaining={3} onActionClick={() => {}} />
      </ThemeProvider>
    );
    expect(screen.getByText(/متبقي 3 أيام/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /عرض الاشتراكات الطلابية/i })).toBeInTheDocument();
    unmount();

    render(
      <ThemeProvider defaultLocale="ar">
        <TrialBanner status="expired_trial" onActionClick={() => {}} />
      </ThemeProvider>
    );
    expect(screen.getByText(/انتهت فترتك التجريبية/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /اختر الاشتراك الأكاديمي/i })).toBeInTheDocument();
  });

  it('renders English copy when locale is en', () => {
    render(
      <ThemeProvider defaultLocale="en">
        <TrialBanner status="free_preview" onActionClick={() => {}} />
      </ThemeProvider>
    );
    expect(screen.getByText(/lessons 1 & 2 of all modules are/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start 7-day free trial/i })).toBeInTheDocument();
  });
});
