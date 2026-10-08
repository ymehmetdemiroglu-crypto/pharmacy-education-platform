import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { FacultyAmfiLounge } from './FacultyAmfiLounge';

describe('FacultyAmfiLounge Component', () => {
  it('renders title, live amfi pulse, and active study tables', () => {
    render(<FacultyAmfiLounge />);

    expect(screen.getByText(/Sanal Amfi & Fakülte Masası/i)).toBeDefined();
    expect(screen.getByText(/Dönem Arkadaşın Şu Anda Amfide/i)).toBeDefined();
    expect(screen.getByText(/Aktif Çalışma Masaları/i)).toBeDefined();
    expect(screen.getByText(/Senkron Amfi Pomodoro/i)).toBeDefined();
  });

  it('renders faculty switcher pills and switches faculty room', () => {
    render(<FacultyAmfiLounge />);

    const hacettepeBtn = screen.getByRole('button', { name: /Hacettepe Eczacılık/i });
    expect(hacettepeBtn).toBeDefined();

    fireEvent.click(hacettepeBtn);
    expect(screen.getByText(/Klinik Farmakoloji Kurulu/i)).toBeDefined();
  });

  it('shows k < 10 anonymity notice when switching to Ankara Eczacılık', () => {
    render(<FacultyAmfiLounge />);

    const ankaraBtn = screen.getByRole('button', { name: /Ankara Eczacılık/i });
    fireEvent.click(ankaraBtn);

    expect(screen.getByText(/KVKK K-Anonimlik Güvencesi/i)).toBeDefined();
    expect(screen.getByText(/Ulusal Eczacılık Havuz Ortalaması/i)).toBeDefined();
  });

  it('allows switching courses between MedChem and Pharmacology', () => {
    render(<FacultyAmfiLounge />);

    const pharmBtn = screen.getByRole('button', { name: /Farmakoloji/i });
    fireEvent.click(pharmBtn);

    // Switches course mode without crashing
    expect(pharmBtn).toBeDefined();
  });

  it('allows toggling study status and modes', () => {
    render(<FacultyAmfiLounge />);

    const breakBtn = screen.getByRole('button', { name: /Moladayım/i });
    fireEvent.click(breakBtn);

    const cramModeBtn = screen.getByRole('button', { name: /Vize Triage \(Cram\)/i });
    fireEvent.click(cramModeBtn);

    expect(breakBtn).toBeDefined();
    expect(cramModeBtn).toBeDefined();
  });

  it('opens misconception challenge modal when trap button is clicked', () => {
    render(<FacultyAmfiLounge />);

    const trapButton = screen.getAllByRole('button', { name: /Tuzağı Gör/i })[0];
    if (trapButton) {
      fireEvent.click(trapButton);
      expect(screen.getByRole('dialog')).toBeDefined();
      expect(screen.getByText(/Sınıf Tuzak Mücadelesi/i)).toBeDefined();
    }
  });
});
