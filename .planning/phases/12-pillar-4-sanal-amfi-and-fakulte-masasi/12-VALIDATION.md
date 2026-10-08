# Phase 12 Validation: Pillar 4 — "Sanal Amfi & Fakülte Masası"

## 1. Automated Unit Tests (Vitest)
1. **Differential Privacy & Anonymity Engine (`facultyAmfiService.test.ts`)**:
   - Verify Laplace noise follows calibrated scale $b = 2.0$ ($\epsilon = 0.5$).
   - Verify $k$-anonymity gate ($k < 10 \implies \text{National aggregate}$, $k \ge 10 \implies \text{Cohort aggregate}$).
   - Verify rolling daily salt produces consistent 64-char hex hashes per day and changes across different salts.
   - Verify sliding window surge detector triggers `MISCONCEPTION_SURGE` broadcast when $\ge 50\%$ failure rate is reached across $\ge 10$ attempts.
2. **Faculty Amfi Lounge Component (`FacultyAmfiLounge.test.tsx`)**:
   - Verify faculty switcher updates room state and tables.
   - Verify live headcount and table active counts render correctly.
   - Verify $k < 10$ fallback banner renders when selecting low-count room.
   - Verify Pomodoro timer synchronization displays correct remaining time and mode.
3. **Misconception Surge Banner & Modal (`MisconceptionSurgeBanner.test.tsx` & `MisconceptionChallengeModal.test.tsx`)**:
   - Verify banner displays surge headline and failure percentage.
   - Verify clicking challenge button opens modal.
   - Verify predict-then-reveal lock (cannot submit without selection, feedback revealed upon submit).
   - Verify 3-tier hint ladder progression.
   - Verify cohort comparison verdict displays accurately.

## 2. Monorepo Quality & Typecheck Gates
- `pnpm -r --workspace-concurrency=1 run typecheck` passes with 0 errors across all 4 packages.
- `pnpm --filter @pharmacy/web test -- --run` passes 100% green.
- `node scripts/test-prod-bundle.mjs` verifies 0 dev notes leaked in production bundle.

## 3. Playwright Visual Verification in Brave Browser
- Script: `scripts/capture-amfi-visual.mjs`
- Executable: `C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe`
- Verification Screenshots:
  - `47_amfi_overview.png`: Full Sanal Amfi lounge with live pulse, table cards, and Pomodoro block.
  - `48_amfi_faculty_switch.png`: Faculty switcher dropdown / selection showing Marmara, Hacettepe, Istanbul, etc.
  - `49_amfi_k_anonymity_fallback.png`: $k < 10$ room showing privacy badge and national aggregate fallback.
  - `50_amfi_surge_banner.png`: Ambient squircle alert banner mounted at top of amfi.
  - `51_amfi_challenge_predict.png`: Misconception challenge modal with predict-then-reveal options.
  - `52_amfi_challenge_verdict.png`: Challenge verdict with diagnostic explanation and cohort error statistics.
