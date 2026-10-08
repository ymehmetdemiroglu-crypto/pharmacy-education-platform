import { describe, it, expect, beforeEach } from 'vitest';
import {
  initializeMisconceptionStore,
  loadMisconceptionStore,
  recordMisconceptionOutcome,
  getActiveRemediationQueue,
  clearMisconceptionStore,
  CANONICAL_MISCONCEPTIONS,
} from './misconceptionService';

describe('Persistent Misconception Diagnostic Memory Service', () => {
  beforeEach(() => {
    clearMisconceptionStore();
  });

  it('initializes canonical 6 Turkish pharmacy misconception traps', () => {
    const store = initializeMisconceptionStore();
    expect(Object.keys(store)).toHaveLength(6);
    expect(store['TRAP-01-IONIZATION']).toBeDefined();
    expect(store['TRAP-01-IONIZATION'].domain).toBe('medchem');
    expect(store['TRAP-02-POTENCY-EFFICACY'].domain).toBe('pharmacology');
    expect(store['TRAP-03-ESTER-AMIDE'].domain).toBe('medchem');
    expect(store['TRAP-04-ADRENERGIC-INVERSION'].domain).toBe('pharmacology');
    expect(store['TRAP-05-BIOISOSTERE-LOGP'].domain).toBe('medchem');
    expect(store['TRAP-06-PHASE-METABOLISM'].domain).toBe('pharmacology');
  });

  it('penalizes confidence and resets consecutive correct upon triggering a trap', () => {
    const code = 'TRAP-01-IONIZATION';
    const updated = recordMisconceptionOutcome(code, 'q-101', false, 'pKa < pH assumption');

    expect(updated.triggerCount).toBe(1);
    expect(updated.consecutiveCorrect).toBe(0);
    expect(updated.confidenceScore).toBeLessThan(CANONICAL_MISCONCEPTIONS[code].defaultConfidence);
    expect(updated.resolvedAt).toBeNull();
    expect(updated.remediationHistory).toHaveLength(1);
    expect(updated.remediationHistory[0]?.wasCorrect).toBe(false);
  });

  it('rewards repeated correct answers and marks concept resolved at threshold', () => {
    const code = 'TRAP-03-ESTER-AMIDE';

    // Step 1: correct answer
    const r1 = recordMisconceptionOutcome(code, 'q-201', true);
    expect(r1.consecutiveCorrect).toBe(1);
    expect(r1.confidenceScore).toBeGreaterThan(0.5);

    // Step 2: second correct answer
    const r2 = recordMisconceptionOutcome(code, 'q-202', true);
    expect(r2.consecutiveCorrect).toBe(2);

    // Step 3: third correct answer (reaches >= 0.85 threshold)
    const r3 = recordMisconceptionOutcome(code, 'q-203', true);
    expect(r3.consecutiveCorrect).toBe(3);
    expect(r3.confidenceScore).toBeGreaterThanOrEqual(0.85);
    expect(r3.resolvedAt).not.toBeNull();
  });

  it('orders active remediation queue by lowest confidence first', () => {
    // Make TRAP-02 heavily confused
    recordMisconceptionOutcome('TRAP-02-POTENCY-EFFICACY', 'q-301', false);
    recordMisconceptionOutcome('TRAP-02-POTENCY-EFFICACY', 'q-302', false);

    // Make TRAP-05 moderately competent
    recordMisconceptionOutcome('TRAP-05-BIOISOSTERE-LOGP', 'q-401', true);

    const queue = getActiveRemediationQueue();
    expect(queue.length).toBeGreaterThan(0);
    expect(queue[0]?.code).toBe('TRAP-02-POTENCY-EFFICACY');
    const lastItem = queue[queue.length - 1];
    expect(queue[0]?.confidenceScore).toBeLessThan(lastItem?.confidenceScore ?? 1);
  });
});

