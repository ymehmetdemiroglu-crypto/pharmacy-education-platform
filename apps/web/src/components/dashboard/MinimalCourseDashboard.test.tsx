import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MinimalCourseDashboard } from './MinimalCourseDashboard';

describe('MinimalCourseDashboard', () => {
  it('renders exam readiness countdown, score, and course cards', () => {
    const handleSelect = vi.fn();
    render(
      <MinimalCourseDashboard
        onSelectLecture={handleSelect}
        completedConceptsCount={7}
        totalConceptsCount={10}
      />
    );

    // Exam countdown
    expect(screen.getByText(/Bahar Vizesine 28 Gün Kaldı/i)).toBeTruthy();
    expect(screen.getAllByText(/4 Günlük Seri/i).length).toBeGreaterThan(0);

    // Readiness score
    expect(screen.getAllByText(/%70/).length).toBeGreaterThan(0);
    expect(screen.getByText(/10 Kavram Tamam/i)).toBeTruthy();

    // Courses
    expect(screen.getByText(/Farmasötik Kimya 1/i)).toBeTruthy();
    expect(screen.getByText(/İlaç Reseptör Etkileşimi/i)).toBeTruthy();
    expect(screen.getByText(/Farmakoloji 1/i)).toBeTruthy();
  });

  it('triggers onSelectLecture when action button is clicked', () => {
    const handleSelect = vi.fn();
    render(<MinimalCourseDashboard onSelectLecture={handleSelect} />);

    const continueBtn = screen.getByRole('button', { name: /Çalışmaya Devam Et/i });
    fireEvent.click(continueBtn);

    expect(handleSelect).toHaveBeenCalledWith('medchem-1');
  });

  it('opens DailyChallengeModal when Günün 10 Sorusuna Başla button is clicked', () => {
    render(<MinimalCourseDashboard onSelectLecture={vi.fn()} />);

    const dailyBtn = screen.getByRole('button', { name: /Günün 10 Sorusuna Başla/i });
    fireEvent.click(dailyBtn);

    expect(screen.getByText('Günün 10 Yüksek Verimli Vize Sorusu')).toBeDefined();
    expect(screen.getByText(/Soru 1 \/ 10/i)).toBeDefined();
  });

  it('triggers onOpenTriage when Vize Kampı button is clicked', () => {
    const handleTriage = vi.fn();
    render(<MinimalCourseDashboard onSelectLecture={vi.fn()} onOpenTriage={handleTriage} />);

    const cramBtn = screen.getByTestId('dashboard-vize-cram-btn');
    fireEvent.click(cramBtn);

    expect(handleTriage).toHaveBeenCalled();
  });

  it('triggers onOpenReanimator when Fotokopiden Canlandır button is clicked', () => {
    const handleReanimator = vi.fn();
    render(<MinimalCourseDashboard onSelectLecture={vi.fn()} onOpenReanimator={handleReanimator} />);

    const reanimatorBtn = screen.getByTestId('dashboard-reanimator-btn');
    fireEvent.click(reanimatorBtn);

    expect(handleReanimator).toHaveBeenCalled();
  });

  it('triggers onOpenTactile when Çizerek Öğren button is clicked', () => {
    const handleTactile = vi.fn();
    render(<MinimalCourseDashboard onSelectLecture={vi.fn()} onOpenTactile={handleTactile} />);

    const tactileBtn = screen.getByTestId('dashboard-tactile-btn');
    fireEvent.click(tactileBtn);

    expect(handleTactile).toHaveBeenCalled();
  });

  it('triggers onOpenAmfi when Sanal Amfi button is clicked', () => {
    const handleAmfi = vi.fn();
    render(<MinimalCourseDashboard onSelectLecture={vi.fn()} onOpenAmfi={handleAmfi} />);

    const amfiBtn = screen.getByTestId('dashboard-amfi-btn');
    fireEvent.click(amfiBtn);

    expect(handleAmfi).toHaveBeenCalled();
  });
});


