# Phase 12 Plan: Pillar 4 — "Sanal Amfi & Fakülte Masası" (Faculty Study Pulse, Anonymized Cohort Co-Presence & Misconception Surge Broadcast)

## Execution Tasks

### Task 1: Type Definitions & Data Contracts
- File: `apps/web/src/types/facultyAmfi.types.ts`
- Implement Zod schemas and TypeScript types:
  - `AmfiPresencePayloadSchema` (`presence_ref`, `student_ephemeral_id`, `faculty_slug`, `course_id`, `active_module`, `study_status`, `is_active_studying`, `mode`, `joined_at`)
  - `MisconceptionSurgeBroadcastSchema` (`event_type`, `trap_code`, `faculty_slug`, `course_id`, `slide_number`, `trapped_student_ratio`, `sample_size_k`, `headline`, `diagnostic_prompt`, `action_url`)
  - `CohortErrorTelemetryReportSchema` (`faculty_slug`, `course_id`, `module_id`, `slide_number`, `trap_code`, `is_correct`, `timestamp`)
  - `CohortHeatmapStatsSchema` (`faculty_slug`, `course_id`, `activeStudentsOnline`, `isNationalAggregate`, `topMisconceptions`, `generatedAt`)
  - `FacultyRoomConfigSchema` (`slug`, `name`, `shortName`, `city`, `logoColor`, `activeStudentsCount`, `activeModules`, `currentSurgeAlert`)
  - `MisconceptionChallengeSchema` (question, options, diagnostic feedback, 3-tier hint ladder, source attribution)

### Task 2: Ground-Truth Curated Faculty Rooms & Misconception Data
- File: `apps/web/src/data/facultyAmfi.data.ts`
- Implement:
  - 5 authentic faculty rooms:
    1. Marmara Üniversitesi Eczacılık Fakültesi (`marmara-eczacilik`)
    2. Hacettepe Üniversitesi Eczacılık Fakültesi (`hacettepe-eczacilik`)
    3. İstanbul Üniversitesi Eczacılık Fakültesi (`istanbul-eczacilik`)
    4. Ankara Üniversitesi Eczacılık Fakültesi (`ankara-eczacilik`)
    5. Türkiye Geneli Eczacılık Havuzu (`turkiye-geneli`) (National fallback)
  - Active study tables per faculty with module titles, topics, slide numbers, and student headcounts.
  - Authentic Misconception Surge challenges mapped to `/materials/` and canonical traps (`TRAP-03-ESTER-AMIDE`, `TRAP-07-SCHILD-SLOPE`, `TRAP-08-AChE-AGING`, `TRAP-01-LOGP-PKA`).

### Task 3: Differential Privacy & Realtime Cohort Engine
- File: `apps/web/src/services/facultyAmfiService.ts`
- Methods:
  - `generateEphemeralStudentId(userId, dailySalt)`: Rolling daily HMAC-SHA256 hash.
  - `generateLaplaceNoise(scale)`: Mathematical Central Laplace noise mechanism $b = \Delta f / \epsilon = 2.0$.
  - `applyDifferentialPrivacy(count, epsilon)`: Calibrated noise addition with non-negative lower bound.
  - `checkKAnonymity(cohortSize, minK)`: $k \ge 10$ anonymity gate.
  - `FacultyAmfiService`: Room subscription, heartbeat interval (60s), telemetry reporting, sliding window surge detection, and mock/offline fallback.
- Unit Tests: `apps/web/src/services/facultyAmfiService.test.ts`

### Task 4: Misconception Surge Alert Banner Component
- File: `apps/web/src/components/amfi/MisconceptionSurgeBanner.tsx`
- Features:
  - Ambient squircle banner with pulsating flame indicator (`🔥 Amfi Uyarısı`).
  - Headline, percentage failed, and active student count.
  - "Tuzak Mücadelesine Katıl ⚡" action CTA and dismiss toggle.
- Unit Tests: `apps/web/src/components/amfi/MisconceptionSurgeBanner.test.tsx`

### Task 5: Misconception Challenge Modal Component
- File: `apps/web/src/components/amfi/MisconceptionChallengeModal.tsx`
- Features:
  - Predict-then-reveal hypothesis lock.
  - 4 diagnostic options targeting canonical pharmacy misconceptions.
  - 3-tier scaffolded hint ladder (Nudge, Clue, Solution).
  - Diagnostic feedback card with authentic slide citation.
  - Cohort comparison stats (*"Dönem arkadaşlarının %68'i de senin gibi B şıkkında yanıldı"*).
- Unit Tests: `apps/web/src/components/amfi/MisconceptionChallengeModal.test.tsx`

### Task 6: Faculty Amfi Lounge Full Workspace View
- File: `apps/web/src/components/amfi/FacultyAmfiLounge.tsx`
- Features:
  - Obsidian & Emerald Neo-Brutalist dashboard.
  - Faculty selector pill bar (Marmara, Hacettepe, İstanbul, Ankara, Ulusal Havuz).
  - Live pulse radar indicator with active student counter.
  - Virtual study tables grouped by active course modules.
  - Synchronized cohort Pomodoro timer widget (25 min focus / 5 min break).
  - KVKK No. 6698 privacy badge and $k$-anonymity explanation.
- Unit Tests: `apps/web/src/components/amfi/FacultyAmfiLounge.test.tsx`

### Task 7: Shell & Dashboard Integration
- File: `apps/web/src/components/layout/PharmLearnShell.tsx`
  - Add `'amfi'` navigation tab (`Sanal Amfi 🏛️`).
  - Top bar live peer indicator (`🟢 42 Amfide`).
- File: `apps/web/src/components/dashboard/MinimalCourseDashboard.tsx`
  - Add `"Sanal Amfi & Fakülte Masası 🏛️"` quick-action CTA button.

### Task 8: Verification & Brave Browser Visual Walkthrough
- Automated Playwright script: `scripts/capture-amfi-visual.mjs`
- Capture visual screenshots in `brain/screenshots/` (screenshots 47 to 52).
- Monorepo typecheck & test suite pass (100% green).
- Fast-forward synchronize `master` branch.
