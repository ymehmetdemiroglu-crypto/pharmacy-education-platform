import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { StudentDocumentVaultModal } from './StudentDocumentVaultModal';

describe('StudentDocumentVaultModal', () => {
  beforeEach(() => {
    localStorage.clear();
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
  });

  it('renders vault modal with seed documents and encryption notice', () => {
    const handleClose = vi.fn();
    render(<StudentDocumentVaultModal open={true} onClose={handleClose} />);

    // Header & notice
    expect(screen.getByText(/Ders Notlarım & Doküman Deposu/i)).toBeTruthy();
    expect(screen.getByText(/Kişisel & Şifreli Alan/i)).toBeTruthy();

    // Check seed documents rendered in list
    expect(screen.getByText(/Marmara_Eczacilik_Farmakoloji_DozYanit_Vize_Notu.pdf/i)).toBeTruthy();
    expect(screen.getByText(/Hacettepe_MedChem_SAR_ve_Bag_Kuvvetleri_Ozeti.pdf/i)).toBeTruthy();
  });

  it('opens and closes upload form, allows creating a new document note', async () => {
    const handleClose = vi.fn();
    render(<StudentDocumentVaultModal open={true} onClose={handleClose} />);

    const uploadBtn = screen.getByRole('button', { name: /Yeni Not Ekle/i });
    fireEvent.click(uploadBtn);

    // Form fields visible
    expect(screen.getByText(/Ders Notu veya PDF Yükleme Formu/i)).toBeTruthy();

    const titleInput = screen.getByPlaceholderText(/Örn: Istanbul_Eczacilik_Toksikoloji_Vize.pdf/i);
    fireEvent.change(titleInput, { target: { value: 'Ankara_Eczacilik_Biyofarmasotik.pdf' } });

    const submitBtn = screen.getByRole('button', { name: /Kaydet & Vize Rehberi Üret/i });
    fireEvent.click(submitBtn);

    // Wait for document guide to open
    await waitFor(() => {
      expect(screen.getByText(/Doküman Listesine Dön/i)).toBeTruthy();
    });
  });

  it('navigates to synthesized AI study guide, flips flashcards, requests hints and asks tutor', async () => {
    const handleClose = vi.fn();
    const handleAskTutor = vi.fn();

    render(
      <StudentDocumentVaultModal
        open={true}
        onClose={handleClose}
        onAskTutorAboutExcerpt={handleAskTutor}
      />
    );

    // Click on Marmara Pharmacology note
    const docCard = screen.getByText(/Marmara_Eczacilik_Farmakoloji_DozYanit_Vize_Notu.pdf/i);
    fireEvent.click(docCard);

    // Study Guide header & overview
    await waitFor(() => {
      expect(screen.getByText(/Doz-Yanıt İlişkileri ve Reseptör Teorileri Vize Rehberi/i)).toBeTruthy();
      expect(screen.getByText(/Vize İçin Kritik Temel İlkeler/i)).toBeTruthy();
      expect(screen.getByText(/Aktif Hatırlama & Sokratik Vize Flaşkartları/i)).toBeTruthy();
    });

    // Check first flashcard
    expect(screen.getByText(/Hill-Langmuir Reseptör Doluluk Kuralı/i)).toBeTruthy();
    expect(screen.getByText(/Vize Tuzağı:/i)).toBeTruthy();

    // Request hint
    const hintBtn = screen.getAllByRole('button', { name: /İpucu İste/i })[0]!;
    fireEvent.click(hintBtn);
    expect(screen.getByText(/Seviye 1/i)).toBeTruthy();

    // Reveal answer
    const revealBtn = screen.getAllByRole('button', { name: /Cevabı Gör/i })[0]!;
    fireEvent.click(revealBtn);
    expect(screen.getByText(/Cevap & Açıklama:/i)).toBeTruthy();

    // Ask tutor about excerpt
    const askTutorBtn = screen.getAllByRole('button', { name: /Tutor'a Sor/i })[0]!;
    fireEvent.click(askTutorBtn);

    expect(handleAskTutor).toHaveBeenCalled();
    expect(handleClose).toHaveBeenCalled();
  });
});
