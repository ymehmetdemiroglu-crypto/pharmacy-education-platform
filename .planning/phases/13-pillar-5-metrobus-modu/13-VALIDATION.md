# Phase 13 Validation: Pillar 5 — "Metrobüs Modu"

## 1. Automated Unit Tests (Vitest)
1. **Acoustic Filter & VAD Engine (`metrobusAudioEngine.test.ts`)**:
   - Verify 4th-order cascaded high-pass filter frequency response attenuation ($<150\text{ Hz}$).
   - Verify dynamic noise-floor tracking adapts to changing ambient RMS ($\alpha = 0.05$).
   - Verify speech start trigger requires SNR $\ge 8\text{ dB}$ above noise floor.
   - Verify semantic keyword evaluator recognizes correct vs misconception keywords in Turkish.
   - Verify Turkish locale lowercasing (`i`/`İ` and `ı`/`I`) handles drug names correctly.
   - Verify synthetic audio earcon tone generation produces valid audio buffers.
2. **Metrobüs Audio View Component (`MetrobusAudioView.test.tsx`)**:
   - Verify rendering of commuter interface, central glowing orb, and audio visualizer.
   - Verify acoustic filter toggle switches filter on/off.
   - Verify card navigation (next/prev audio card).
   - Verify verbal nudge button unlocks Tier 1 hint.
   - Verify quick touch response buttons allow submitting answers without speaking.
   - Verify feedback screen displays diagnosis, score update, and next button.

## 2. Monorepo Quality & Typecheck Gates
- `pnpm -r --workspace-concurrency=1 run typecheck` passes with 0 errors across all 4 packages.
- `pnpm --filter @pharmacy/web test -- --run` passes 100% green.
- `node scripts/test-prod-bundle.mjs` verifies 0 dev notes leaked in production bundle.

## 3. Playwright Visual Verification in Brave Browser
- Script: `scripts/capture-metrobus-visual.mjs`
- Executable: `C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe`
- Verification Screenshots:
  - `53_metrobus_overview.png`: Full commuter interface with central pulse orb and acoustic filter active.
  - `54_metrobus_acoustic_filter.png`: Acoustic transit filter details with cascaded Biquad EQ curve.
  - `55_metrobus_speaking_prompt.png`: AI speaking state with active question prompt and animated visualizer.
  - `56_metrobus_hint_ladder.png`: Verbal nudge unlocked with audio replay button.
  - `57_metrobus_voice_listening.png`: Student answering state with glowing green listening orb.
  - `58_metrobus_feedback_verdict.png`: Affirmation verdict screen with score update and diagnostic explanation.
