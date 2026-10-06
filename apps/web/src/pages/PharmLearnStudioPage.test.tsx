import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PharmLearnStudioPage } from './PharmLearnStudioPage';

// Mock translation context
vi.mock('../context/TranslationContext', () => ({
  useTranslation: () => ({
    locale: 'tr',
    t: (k: string) => k,
  }),
}));

// Mutable mock user for auth testing
let mockUser: any = null;

// Mock platform useAuth
vi.mock('@pharmacy/platform', () => ({
  useAuth: () => ({
    user: mockUser,
    startTrial: vi.fn(),
    logout: vi.fn(),
    signInGuest: vi.fn(),
  }),
  OAuthProviderDisabledError: class extends Error {},
}));

describe('PharmLearnStudioPage (Clean 2-Pane Study Workspace)', () => {
  beforeEach(() => {
    mockUser = null;
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
    vi.clearAllMocks();

    // Mock matchMedia for Ant Design responsive layout
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    // Mock HTMLCanvasElement.prototype.getContext for JSDOM
    const mockGrad = { addColorStop: vi.fn() };
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      fillText: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      scale: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
      measureText: vi.fn().mockReturnValue({ width: 10 }),
      createRadialGradient: vi.fn().mockReturnValue(mockGrad),
      createLinearGradient: vi.fn().mockReturnValue(mockGrad),
    }) as any;
  });

  it('renders the clean minimalist hero landing when unauthenticated', async () => {
    mockUser = null;

    render(
      <BrowserRouter>
        <PharmLearnStudioPage />
      </BrowserRouter>
    );

    // Hero title and CTA
    expect(screen.getByText(/Eczacılık Vize Derslerini/i)).toBeTruthy();
    expect(screen.getByText(/Öğrenmeye Başla/i)).toBeTruthy();
    expect(screen.getAllByRole('button', { name: /Giriş Yap/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/33 slaytlık/i).length).toBeGreaterThan(0);
  });

  it('renders the clean 2-pane workspace with top bar and lecture when authenticated', async () => {
    mockUser = {
      userId: 'usr-12345',
      email: 'student@pharmacy.edu.tr',
      displayName: 'Eczacılık Öğrencisi',
      plan: 'free',
    };

    render(
      <BrowserRouter>
        <PharmLearnStudioPage />
      </BrowserRouter>
    );

    // Top Bar Brand & Lecture Selector
    expect(screen.getAllByText(/PharmLearn/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/İlaç Reseptör Etkileşimi/i).length).toBeGreaterThan(0);

    // AI Tutor Header
    expect(screen.getAllByText(/AI Sokratik Eğitmen/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/33 Slayt Doğrulandı/i)).toBeTruthy();

    // 3D/2D Molecular Viewer
    expect(screen.getByText(/3D WebGL/i)).toBeTruthy();
    expect(screen.getByText(/2D Yapı/i)).toBeTruthy();

    // SAR Matrix
    expect(screen.getByText(/Dinamik SAR Matrisi/i)).toBeTruthy();
  });

  it('allows sending a question to the Socratic AI Tutor and receives slide-cited reply', async () => {
    mockUser = {
      userId: 'usr-12345',
      email: 'student@pharmacy.edu.tr',
      displayName: 'Eczacılık Öğrencisi',
      plan: 'free',
    };

    render(
      <BrowserRouter>
        <PharmLearnStudioPage />
      </BrowserRouter>
    );

    // Click quick prompt chip
    const chip = screen.getByText(/Dibukain molekülünün çoklu reseptör bağları nelerdir\?/i);
    fireEvent.click(chip);

    await waitFor(
      () => {
        // User message rendered
        expect(screen.getAllByText(/Dibukain molekülünün çoklu reseptör bağları/i).length).toBeGreaterThan(0);
        // Socratic Tutor response grounded in Slide 33
        expect(screen.getAllByText(/Harika bir entegrasyon sorusu/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/Slayt 33/i).length).toBeGreaterThan(0);
      },
      { timeout: 4000 }
    );
  });
});
