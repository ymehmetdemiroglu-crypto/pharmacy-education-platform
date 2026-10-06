import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StudyPulseLounge } from './StudyPulseLounge';
import { studyPulse } from '../../services/studyPulseService';

describe('StudyPulseLounge', () => {
  beforeEach(() => {
    studyPulse.resetPomodoro();
  });

  it('renders co-presence active student count, pomodoro timer and daily streak', () => {
    const handleStart = vi.fn();
    render(<StudyPulseLounge onStartStudySession={handleStart} />);

    // Co-presence
    expect(screen.getByText(/Sessiz Çalışma Salonu/i)).toBeTruthy();
    expect(screen.getAllByText(/eczacılık öğrencisi/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Marmara Eczacılık/i)).toBeTruthy();

    // Pomodoro timer display
    expect(screen.getByText(/Odaklanma Seansı/i)).toBeTruthy();
    expect(screen.getByText('25:00')).toBeTruthy();
    expect(screen.getByRole('button', { name: /Odaklanmayı Başlat/i })).toBeTruthy();

    // Daily habit goal & streak
    expect(screen.getByText(/Bugünün Hedefi: 3 Kavram Pekiştir/i)).toBeTruthy();
    expect(screen.getAllByText(/Günlük Seri/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/İlaç Reseptör Bağ Kuvvetleri/i)).toBeTruthy();
  });

  it('toggles pomodoro timer state and triggers study session callback', () => {
    const handleStart = vi.fn();
    render(<StudyPulseLounge onStartStudySession={handleStart} />);

    const startBtn = screen.getByRole('button', { name: /Odaklanmayı Başlat/i });
    fireEvent.click(startBtn);

    expect(screen.getByRole('button', { name: /Durdur/i })).toBeTruthy();

    const streakBtn = screen.getByRole('button', { name: /Bugünkü 3. Kavramı Tamamla & Seriyi Koru/i });
    fireEvent.click(streakBtn);
    expect(handleStart).toHaveBeenCalled();
  });
});
