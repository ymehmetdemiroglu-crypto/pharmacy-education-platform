import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { AudioSummaryBar } from './AudioSummaryBar';

describe('AudioSummaryBar', () => {
  beforeEach(() => {
    // Mock speechSynthesis
    const mockSpeechSynthesis = {
      speak: vi.fn(),
      cancel: vi.fn(),
      pause: vi.fn(),
      resume: vi.fn(),
    };
    Object.defineProperty(window, 'speechSynthesis', {
      writable: true,
      value: mockSpeechSynthesis,
    });
  });

  it('renders audio player with MedChem summary by default', () => {
    render(<AudioSummaryBar lectureSlug="reseptor-etkilesimleri" />);
    expect(screen.getByText(/İlaç Reseptör Etkileşimi/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /caret-right/i })).toBeTruthy();
  });

  it('renders Pharmacology audio summary when pharmacology slug is passed', () => {
    render(<AudioSummaryBar lectureSlug="farmakoloji-temelleri" />);
    expect(screen.getByText(/Farmakoloji Temelleri/i)).toBeTruthy();
  });

  it('handles play toggle and displays active cue', async () => {
    const handleAskTutor = vi.fn();
    render(
      <AudioSummaryBar
        lectureSlug="reseptor-etkilesimleri"
        onAskTutorAboutAudio={handleAskTutor}
      />
    );

    const playBtn = screen.getByRole('button', { name: /caret-right/i });
    fireEvent.click(playBtn);

    // Initial cue should be active at t=0
    expect(screen.getByText(/Slayt 2/i)).toBeTruthy();
    expect(screen.getByText(/İlaç etkisini anlamak için/i)).toBeTruthy();

    // "Tutor'a Sor" button should be rendered
    const tutorBtn = screen.getByRole('button', { name: /Tutor'a Sor/i });
    expect(tutorBtn).toBeTruthy();

    fireEvent.click(tutorBtn);
    expect(handleAskTutor).toHaveBeenCalled();
  });
});
