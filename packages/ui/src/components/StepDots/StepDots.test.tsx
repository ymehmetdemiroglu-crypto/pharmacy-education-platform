import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { StepDots } from './StepDots';

describe('StepDots Component', () => {
  it('renders correct number of step buttons', () => {
    render(<StepDots totalSteps={5} currentStepIndex={2} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);
  });

  it('marks current step with aria-current="step"', () => {
    render(<StepDots totalSteps={4} currentStepIndex={1} />);
    const currentBtn = screen.getByLabelText(/step 2 \(current\)/i);
    expect(currentBtn).toHaveAttribute('aria-current', 'step');
  });

  it('triggers onSelectStep when clicked', () => {
    const handleSelect = vi.fn();
    render(
      <StepDots
        totalSteps={3}
        currentStepIndex={1}
        completedStepIndices={[0]}
        onSelectStep={handleSelect}
      />
    );
    const step1 = screen.getByLabelText(/step 1/i);
    fireEvent.click(step1);
    expect(handleSelect).toHaveBeenCalledWith(0);
  });
});
