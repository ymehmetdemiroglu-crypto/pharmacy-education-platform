import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { TactileArrowCanvas } from './TactileArrowCanvas';
import { MECHANISM_CHALLENGES } from '../../data/tactileMechanisms.data';

const mockChallenge = MECHANISM_CHALLENGES[0]!;

describe('TactileArrowCanvas', () => {
  it('renders canvas with trap badge, title, and fading stage indicator', () => {
    render(
      <TactileArrowCanvas
        challenge={mockChallenge}
        currentStepIndex={0}
        fadingStage="STAGE_DEMO"
      />
    );

    expect(screen.getByTestId('tactile-arrow-canvas')).toBeDefined();
    expect(screen.getByText('TRAP-08-AChE-AGING')).toBeDefined();
    expect(screen.getByText(mockChallenge.title)).toBeDefined();
    expect(screen.getByText('1. Demo')).toBeDefined();
  });

  it('allows switching fading stages via pills', () => {
    const onStageChange = vi.fn();
    render(
      <TactileArrowCanvas
        challenge={mockChallenge}
        currentStepIndex={0}
        fadingStage="STAGE_DEMO"
        onFadingStageChange={onStageChange}
      />
    );

    const stage2Btn = screen.getByText('2. Yarı İpucu');
    fireEvent.click(stage2Btn);
    expect(onStageChange).toHaveBeenCalledWith('STAGE_FADED_1');
  });

  it('triggers validation callback when validate button is clicked in stage FADED_1', () => {
    const onValidation = vi.fn();
    render(
      <TactileArrowCanvas
        challenge={mockChallenge}
        currentStepIndex={0}
        fadingStage="STAGE_FADED_1"
        onValidationResult={onValidation}
      />
    );

    const validateBtn = screen.getByText(/Mekanizmayı Doğrula/i);
    fireEvent.click(validateBtn);

    expect(onValidation).toHaveBeenCalled();
  });

  it('handles clear/reset action cleanly', () => {
    render(
      <TactileArrowCanvas
        challenge={mockChallenge}
        currentStepIndex={0}
        fadingStage="STAGE_INDEPENDENT"
      />
    );

    const resetBtn = screen.getByText(/Temizle/i) as HTMLButtonElement;
    expect(resetBtn.disabled).toBe(true);
  });
});
