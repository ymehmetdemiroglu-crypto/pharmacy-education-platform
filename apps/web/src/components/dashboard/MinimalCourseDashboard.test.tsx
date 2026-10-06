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
});
