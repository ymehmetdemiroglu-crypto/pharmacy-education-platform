import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DynamicLessonCanvas } from './DynamicLessonCanvas';
import { realtimeTelemetry } from '../../services/realtimeTelemetryService';

describe('DynamicLessonCanvas', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders lesson header, 12-stage stepper, and initial step prompt for a pharmacology lesson', () => {
    render(<DynamicLessonCanvas lessonId="pharm-1" onAskTutor={vi.fn()} />);

    // Check course badge & title
    expect(screen.getByText(/Farmakoloji/i)).toBeTruthy();
    expect(screen.getByText(/12 Aşamalı Ustalık Döngüsü/i)).toBeTruthy();

    // Check step 1 (Klinik Vaka)
    expect(screen.getByText(/Aşama 1 \/ 12 • Klinik Vaka/i)).toBeTruthy();
  });

  it('renders interactive widget and quiz options when step contains them', () => {
    render(<DynamicLessonCanvas lessonId="mc-mod1-les1" onAskTutor={vi.fn()} />);

    // Step 2 is question/prediction
    const step2Button = screen.getByText('Tahmin & Hipotez');
    fireEvent.click(step2Button);

    expect(screen.getByText(/Aşama 2 \/ 12 • Tahmin & Hipotez/i)).toBeTruthy();
    expect(screen.getByText(/Hipotezinizi Seçin ve Test Edin/i)).toBeTruthy();
  });

  it('submits quiz answer, triggers diagnostic feedback and telemetry', () => {
    const telemetrySpy = vi.spyOn(realtimeTelemetry, 'emitTelemetry');
    render(<DynamicLessonCanvas lessonId="mc-mod1-les1" onAskTutor={vi.fn()} />);

    // Go to step 2
    fireEvent.click(screen.getByText('Tahmin & Hipotez'));

    // Select an option
    const options = screen.getAllByRole('button');
    const quizOption = options.find((btn) => btn.textContent?.includes('bağıl doygunluk') || btn.textContent?.includes('kovalent'));
    expect(quizOption).toBeDefined();

    if (quizOption) {
      fireEvent.click(quizOption);
      const verifyButton = screen.getByText(/Cevabı Kontrol Et & Doğrula/i);
      fireEvent.click(verifyButton);

      expect(telemetrySpy).toHaveBeenCalledWith(
        expect.objectContaining({
          widgetId: 'concept_quiz',
          action: 'answer_submitted',
        })
      );
    }
  });

  it('invokes onAskTutor with current step context', () => {
    const mockAskTutor = vi.fn();
    render(<DynamicLessonCanvas lessonId="pharm-1" onAskTutor={mockAskTutor} />);

    const askButton = screen.getByText(/Bu Adımı AI Tutor'a Sor/i);
    fireEvent.click(askButton);

    expect(mockAskTutor).toHaveBeenCalledTimes(1);
    expect(mockAskTutor).toHaveBeenCalledWith(
      expect.stringContaining('Bu konseptin farmasötik mekanizmasını açıklar mısın?')
    );
  });
});
