# Phase 13 Plan: Pillar 5 — "Metrobüs Modu" (Audio Socratic Micro-Dosing & Web Audio API Transit Filtering)

## 1. Objectives & Architectural Boundaries
1. Deliver hands-free, conversational audio micro-dosing tailored for crowded public transit commutes (Istanbul Metrobüs, Marmaray, M2/M4 Metro, Ankara EGO).
2. Enforce the **Auditory Modality Question Scope Constraint (Learning Science Invariant)**:
   - Question scope is strictly confined to conceptual pharmacology (ADME, receptor dynamics, autonomic drugs, Schild regression) and non-spatial medicinal chemistry (ester vs amide hydrolysis kinetics, organophosphate aging, prodrug bioactivation).
   - Complex 3D spatial stereochemistry ($R/S$ priority inversions, dihedral angles, multi-substituent SAR matrices) is **strictly excluded** from audio-only mode to prevent phonological loop overload.
   - Strict Turkish word constraints: prompts $\le 25$ words, affirmations $\le 20$ words, verbal nudges $\le 22$ words.
3. Web Audio API Acoustic Filter Pipeline:
   - Cascaded 4th-order High-Pass filter (two series BiquadFilterNodes at 180 Hz, $Q=0.707$, 24 dB/octave attenuation) to eliminate low-frequency diesel engine rumble ($<150\text{ Hz}$).
   - Low-Pass filter (3800 Hz) to eliminate high-frequency brake and pneumatic door hiss.
   - Peaking formant boost (1800 Hz, $+4\text{ dB}$, $Q=1.0$) to amplify Turkish vocal intelligibility.
   - Dynamic noise-floor tracking VAD ($\alpha = 0.05$) preventing the "infinite listening trap" in high-noise cabins.
4. UI & Single-Thumb Commuter UX:
   - Centered glowing voice pulse orb with audio status (IDLE, PROMPT_PLAYING, LISTENING, EVALUATING, AFFIRMATION, VERBAL_NUDGE).
   - "Tekrar Et" (Repeat/Rewind) loop with 0 penalty.
   - Quick touch response buttons for silent subway tunnels or packed buses where speaking aloud is socially uncomfortable.
   - Web Audio synthesizer earcons (440Hz chime, 880Hz blip, correct chime, nudge chime).
5. Comprehensive test coverage, monorepo typecheck, prod bundle audit, and Brave visual verification (screenshots 53 to 58).

---

## 2. Execution Waves

### Wave 1: Types, Schemas & Ground-Truth Turkish Audio Cards
- `apps/web/src/types/metrobusAudio.types.ts`:
  - `AudioSessionConfigSchema`, `SocraticAudioPromptSchema`, `VadEventPayloadSchema`, `MetrobusTurnLogSchema`, `AudioDrillSessionState`, `EarconType`.
- `apps/web/src/data/metrobusAudio.data.ts`:
  - 6 authentic, verified Turkish clinical pharmacology & non-spatial MedChem prompt cards adhering strictly to $\le 25$ words and zero 3D stereochemistry.

### Wave 2: Audio Engine, Filter Math & Intent Parser
- `apps/web/src/services/metrobusAudioEngine.ts` and `apps/web/src/services/metrobusAudioEngine.test.ts`:
  - Pure Biquad filter response simulation ($|H(f)|$ calculation for high-pass, low-pass, peaking).
  - Pure dynamic noise-floor VAD math with exponential smoothing.
  - Turkish fuzzy keyword evaluator (`toLocaleLowerCase('tr-TR')`).
  - Web Audio Context earcon tone synthesizer.
  - Speech synthesis & recognition abstraction with graceful fallback for simulated environments.

### Wave 3: Single-Thumb Commuter UI & Shell Navigation
- `apps/web/src/components/metrobus/MetrobusAudioVisualizer.tsx`: Real-time audio waveform and EQ filter response display.
- `apps/web/src/components/metrobus/MetrobusAudioView.tsx` and `apps/web/src/components/metrobus/MetrobusAudioView.test.tsx`:
  - Neo-Brutalist commuter UI with large thumb zones, pulse orb, filter toggles, streak counter, quick reply chips, and offline cache badge.
- Integration:
  - Add `'metrobus'` tab to `Segmented` options in `apps/web/src/components/layout/PharmLearnShell.tsx`.
  - Add CTA card in `apps/web/src/components/dashboard/MinimalCourseDashboard.tsx`.

### Wave 4: Verification, Quality Gates & Visual Documentation
- Monorepo typecheck: `pnpm -r --workspace-concurrency=1 run typecheck`.
- Vitest unit tests: `pnpm --filter @pharmacy/web test`.
- Prod bundle dev-notes audit: `node scripts/test-prod-bundle.mjs`.
- Playwright Brave visual verification: `scripts/capture-metrobus-visual.mjs` (screenshots 53 to 58).
- Update roadmap, state, walkthrough, and commit/sync to `master`.
