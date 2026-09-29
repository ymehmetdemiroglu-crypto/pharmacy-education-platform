# Independent Review Report — Code Reviewer
**Phase**: Phase 3: Vertical Slice A (Course A: MedChem Lesson 1 & Freemium Platform)  
**Iteration**: 1  
**Reviewer Role**: Code Reviewer (Independent Fresh-Context Instance)  
**Date**: 2026-09-29  
**Verdict**: **CHANGES REQUESTED (1 P0 Blocker, 4 P1 Critical Issues, 3 P2 Minor Observations)**  

---

## 1. Executive Summary

As the independent Code Reviewer for **Phase 3: Vertical Slice A**, an exhaustive technical audit of the codebase was conducted across:
1. `apps/web/src/pages/LessonPage.tsx` and routing in `apps/web/src/App.tsx`
2. `packages/platform/src/curriculum/schema.ts`, `ProgressStore.ts`, and `LeitnerEngine.ts`
3. Monorepo architecture, TypeScript strictness (`pnpm typecheck`), and linting (`pnpm lint`)
4. Package tests (`pnpm test`) and E2E verification

### High-Level Summary
- **Unit Test Suite**: **76 passed tests across 27 test files** (Platform: 30 passed, UI: 27 passed, Widgets: 19 passed).
- **ESLint 9**: Clean pass across all 5 workspace projects (0 errors, 0 warnings).
- **TypeScript**: Clean compilation when serialized, but `pnpm typecheck` without concurrency control crashes on Windows due to Node heap exhaustion (`FATAL ERROR: young object promotion failed`).
- **Critical Finding**: A fatal bug exists in `LessonPage.tsx` where clicking the primary completion button ("Complete & Return to Catalog") navigates away without calling `completeLesson()`, `saveLocalProgress()`, or `enqueueReviewCards()`. Students completing the lesson via mouse never receive XP, streak updates, or Leitner card scheduling.
- **Leitner Engine Bug**: `enqueueReviewCards()` hardcodes `nextReviewDue` to +1 day outside the loop regardless of card box or specified interval days.
- **Accessibility & HTML**: Nested duplicate `<main>` landmarks between `App.tsx` and `LessonPage.tsx`, missing `aria-live` regions for diagnostic misconception feedback, and keyboard arrow navigation conflicts.

---

## 2. Actual Terminal Execution Logs

### 2.1 Monorepo Unit Test Suite (`pnpm test`)
```text
$ pnpm -r --workspace-concurrency=1 run test
Scope: 5 of 6 workspace projects
$ vitest run

 RUN  v3.2.7 C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/packages/platform

 ✓ src/curriculum/lesson01.test.ts (17 tests) 38ms
 ✓ src/spaced_repetition/LeitnerEngine.test.ts (3 tests) 2ms
 ✓ src/progress/ProgressStore.test.ts (4 tests) 1ms
 ✓ src/access/AccessControl.test.ts (6 tests) 2ms

 Test Files  4 passed (4)
      Tests  30 passed (30)
   Start at  09:42:04
   Duration  2.99s (transform 346ms, setup 0ms, collect 738ms, tests 43ms, environment 0ms, prepare 1.37s)

$ vitest run

 RUN  v3.2.7 C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/packages/ui

 ✓ src/components/HintDrawer/HintDrawer.test.tsx (2 tests) 237ms
 ✓ src/components/PaywallModal/PaywallModal.test.tsx (2 tests) 117ms
 ✓ src/components/StepDots/StepDots.test.tsx (3 tests) 35ms
 ✓ src/components/Button/Button.test.tsx (4 tests) 58ms
 ✓ src/components/TrialBanner/TrialBanner.test.tsx (2 tests) 16ms
 ✓ src/components/Slider/Slider.test.tsx (1 test) 16ms
 ✓ src/components/Modal/Modal.test.tsx (3 tests) 19ms
 ✓ src/components/EmptyState/EmptyState.test.tsx (1 test) 14ms
 ✓ src/components/Input/Input.test.tsx (2 tests) 36ms
 ✓ src/components/Toggle/Toggle.test.tsx (1 test) 14ms
 ✓ src/components/ProgressBar/ProgressBar.test.tsx (1 test) 5ms
 ✓ src/components/Card/Card.test.tsx (3 tests) 5ms
 ✓ src/components/SkeletonLoader/SkeletonLoader.test.tsx (1 test) 5ms
 ✓ src/components/StickerBadge/StickerBadge.test.tsx (1 test) 2ms

 Test Files  14 passed (14)
      Tests  27 passed (27)
   Start at  09:42:08
   Duration  10.01s (transform 629ms, setup 1.63s, collect 4.51s, tests 581ms, environment 2.62s, prepare 278ms)

$ vitest run

 RUN  v3.2.7 C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/packages/widgets

 ✓ src/SarExplorer/SarExplorer.test.tsx (2 tests) 369ms
 ✓ src/ReceptorLigandMatcher/ReceptorLigandMatcher.test.tsx (2 tests) 121ms
 ✓ src/PkSimulator/PkSimulator.test.tsx (2 tests) 100ms
 ✓ src/PredictThenReveal/PredictThenReveal.test.tsx (3 tests) 61ms
 ✓ src/DoseResponseCurve/DoseResponseCurve.test.tsx (2 tests) 76ms
 ✓ src/StructureIdentifier/StructureIdentifier.test.tsx (2 tests) 53ms
 ✓ src/MultipleChoice/MultipleChoice.test.tsx (3 tests) 43ms
 ✓ src/MetabolismMap/MetabolismMap.test.tsx (2 tests) 37ms
 ✓ src/HintLadder/HintLadder.test.tsx (1 test) 7ms

 Test Files  9 passed (9)
      Tests  19 passed (19)
   Start at  09:42:20
   Duration  7.61s (transform 741ms, setup 762ms, collect 3.76s, tests 867ms, environment 1.55s, prepare 279ms)
```
**Outcome**: All 76 tests passed (100% pass rate).

---

### 2.2 TypeScript Strictness Audit

#### Concurrent `pnpm typecheck` (Default in package.json) — CRASH:
```text
$ pnpm -r run typecheck
Scope: 5 of 6 workspace projects
functions typecheck$ tsc --noEmit
packages/platform typecheck$ tsc --noEmit
packages/ui typecheck$ tsc --noEmit
functions typecheck: Done
packages/platform typecheck: Done
packages/ui typecheck: Done
packages/widgets typecheck$ tsc --noEmit
packages/widgets typecheck: Done
apps/web typecheck$ tsc --noEmit
apps/web typecheck: 
apps/web typecheck: <--- Last few GCs --->
apps/web typecheck: 
apps/web typecheck: [6628:0000013B784AD000]     3272 ms: Scavenge (interleaved) 71.6 (105.7) -> 62.8 (183.0) MB, pooled: 0 MB, 34.04 / 0.00 ms  (average mu = 0.972, current mu = 0.972) allocation failure; 
apps/web typecheck: 
apps/web typecheck: FATAL ERROR: MarkCompactCollector: young object promotion failed Allocation failed - JavaScript heap out of memory
apps/web typecheck: Failed
[ELIFECYCLE] Command failed with exit code 134.
Error: ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL
```

#### Serialized `pnpm -r --workspace-concurrency=1 run typecheck` — PASS:
```text
$ pnpm -r --workspace-concurrency=1 run typecheck
Scope: 5 of 6 workspace projects
$ tsc --noEmit
$ tsc --noEmit
$ tsc --noEmit
$ tsc --noEmit
$ tsc --noEmit
Exit code: 0
```
**Outcome**: Zero TypeScript compile errors exist in code, but `package.json` script definition lacks concurrency control.

---

### 2.3 ESLint 9 Flat Config Audit (`pnpm lint`)
```text
$ pnpm -r run lint
Scope: 5 of 6 workspace projects
packages/platform lint$ eslint src/
packages/ui lint$ eslint src/
packages/platform lint: Done
packages/ui lint: Done
packages/widgets lint$ eslint src/
packages/widgets lint: Done
apps/web lint$ eslint src/
apps/web lint: Done
Exit code: 0
```
**Outcome**: 0 errors, 0 warnings.

---

## 3. "Attempted to Break" Audit Log

| Test Case | Scenario / Input | Expected Result | Actual Result | Status |
|:---|:---|:---|:---|:---|
| **BREAK-01** | Mouse-click completion on Step 10 | `completeLesson()`, `saveLocalProgress()`, `enqueueReviewCards()` execute and persist to `localStorage`. | `<Link to="/catalog">` navigates immediately without executing completion logic. All progress and XP lost! | **BROKEN (P0)** |
| **BREAK-02** | `enqueueReviewCards()` with seed having `box: 3, intervalDays: 7` | `newCard.nextReviewDue` scheduled +7 days from `now`. | `nextDueDate` is hardcoded to +1 day outside loop; `nextReviewDue` set to +1 day regardless of seed interval! | **BROKEN (P1)** |
| **BREAK-03** | Keyboard navigation while focus is on option radio buttons | Pressing `ArrowRight` moves focus to next option in group per W3C APG. | Global `window` listener intercepts `ArrowRight`, skipping to next lesson step without answering. | **BROKEN (P1)** |
| **BREAK-04** | Screen reader navigation of prediction reveal | Screen reader announces "Hypothesis Confirmed" or diagnostic misconception. | Revealed container lacks `aria-live` or `role="status"`. Screen reader remains silent. | **BROKEN (P1)** |
| **BREAK-05** | HTML landmark nesting audit | Only one `<main>` landmark exists in document tree. | `<main>` in `LessonPage.tsx` is nested inside `<main>` in `App.tsx`. | **BROKEN (P1)** |
| **BREAK-06** | Daylight saving / UTC midnight study streak | Consecutive study session at 00:30 local time (UTC+3) maintains streak. | Evaluated via UTC `toISOString().slice(0, 10)`; behaves predictably across standard UTC day boundaries. | **PASS** |
| **BREAK-07** | Same-day lesson re-completion | Second completion grants review XP (+5) without duplicating lesson ID. | `completedLessonIds` remains deduplicated, `totalXP` increments by 5. | **PASS** |
| **BREAK-08** | Packaging boundaries & internal source leaks | No workspace package imports internal `/src` paths of another. | Zero cross-package internal source leaks found. Clean package exports. | **PASS** |

---

## 4. Detailed Findings & Action Items

### P0 (Blockers)

#### `CODE-P0-01`: Lesson Completion, XP Awarding, and Leitner Enqueueing Bypassed on Step 10
- **File**: `apps/web/src/pages/LessonPage.tsx:123-140` and `apps/web/src/pages/LessonPage.tsx:613-622`
- **Description**: The lesson completion logic is situated inside `handleNextStep()` in an `else if (!lessonCompleted)` branch:
  ```tsx
  const handleNextStep = useCallback(() => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (!lessonCompleted) {
      const updatedProgress = completeLesson(progress, lesson.id, new Date());
      setProgress(updatedProgress);
      saveLocalProgress(updatedProgress);
      const existingCards = loadLocalReviewCards('medchem');
      const updatedCards = enqueueReviewCards(existingCards, lesson.spacedReviewCards, new Date());
      saveLocalReviewCards('medchem', updatedCards);
      setLessonCompleted(true);
    }
  }, [...]);
  ```
  However, on Step 10 (`currentStepIndex === totalSteps - 1`), the rendered button is:
  ```tsx
  <Link to="/catalog">
    <Button
      variant="primary"
      size="md"
      rightIcon={<ArrowRight className="w-4 h-4" />}
    >
      Complete & Return to Catalog
    </Button>
  </Link>
  ```
  This button has **no `onClick` handler**; it simply navigates directly to `/catalog`. `handleNextStep()` is never called when clicking this button.
- **Impact**: Any student completing Lesson 1 with a mouse or touch device never has their completion recorded, never receives +50 XP, never has their streak updated, and never has the 3 Leitner cards enqueued into their review queue.
- **Actionable Fix**: Either auto-complete upon reaching Step 10 via `useEffect`, or add an explicit `onClick` to the completion button:
  ```tsx
  <Button
    variant="primary"
    size="md"
    onClick={() => {
      const updatedProgress = completeLesson(progress, lesson.id, new Date());
      setProgress(updatedProgress);
      saveLocalProgress(updatedProgress);
      const existingCards = loadLocalReviewCards('medchem');
      const updatedCards = enqueueReviewCards(existingCards, lesson.spacedReviewCards, new Date());
      saveLocalReviewCards('medchem', updatedCards);
      setLessonCompleted(true);
    }}
    rightIcon={<ArrowRight className="w-4 h-4" />}
  >
    Complete & Return to Catalog
  </Button>
  ```

---

### P1 (Critical Issues)

#### `CODE-P1-01`: Hardcoded +1 Day Due Date in `enqueueReviewCards` Regardless of Seed Box/Interval
- **File**: `packages/platform/src/spaced_repetition/LeitnerEngine.ts:70-71, 84-86`
- **Description**: In `enqueueReviewCards`:
  ```ts
  const intervalDays = 1;
  const nextDueDate = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);
  // ... inside loop:
  nextReviewDue: nextDueDate.toISOString(),
  ```
  `nextDueDate` is calculated once outside the loop. If a seed card defines `box: 3, intervalDays: 7`, `newCard.intervalDays` receives 7, but `newCard.nextReviewDue` is set to `nextDueDate` (which is hardcoded to +1 day). Additionally, if `seed.box` is supplied without `intervalDays`, `intervalDays` defaults to `1` instead of `LEITNER_INTERVALS[seed.box]`.
- **Actionable Fix**: Compute `intervalDays` and `nextDueDate` inside the loop per card seed:
  ```ts
  const box = seed.box ?? 1;
  const cardInterval = seed.intervalDays ?? LEITNER_INTERVALS[box] ?? 1;
  const cardDueDate = new Date(now.getTime() + cardInterval * 24 * 60 * 60 * 1000);
  // assign box, cardInterval, and cardDueDate.toISOString()
  ```

#### `CODE-P1-02`: Missing `aria-live` Region for Dynamic Misconception & Outcome Feedback
- **File**: `apps/web/src/pages/LessonPage.tsx:469-509`
- **Description**: When a student clicks "Commit Hypothesis & Reveal Outcome", the feedback panel mounts dynamically into the DOM without `aria-live="polite"` or `role="status"` or `aria-atomic="true"`. Screen readers do not announce the diagnostic feedback or outcome.
- **Actionable Fix**: Wrap the revealed outcome container in a live region:
  ```tsx
  <div role="status" aria-live="polite" aria-atomic="true" className="...">
  ```

#### `CODE-P1-03`: Global Arrow Key Navigation Conflicts with Option Selection & Lacks Roving Tabindex
- **File**: `apps/web/src/pages/LessonPage.tsx:150-182, 417-451`
- **Description**: 
  1. The options list uses `role="radiogroup"` and `role="radio"`, but all buttons have `tabIndex={0}`, violating the W3C APG roving tabindex requirement (`tabIndex={isSelected ? 0 : -1}`).
  2. The global `window` keydown listener listens for `ArrowLeft` / `ArrowRight`. If a user is focused on a radio option and presses `ArrowRight` (the standard radio navigation key), the window listener advances the whole lesson step instead of changing the radio selection.
- **Actionable Fix**:
  1. Add roving tabindex to options: `tabIndex={isSelected || (!currentInteraction.selectedId && idx === 0) ? 0 : -1}`.
  2. Check `if ((e.target as HTMLElement)?.closest('[role="radiogroup"]')) return;` in `handleKeyDown` when processing `ArrowLeft` / `ArrowRight`.

#### `CODE-P1-04`: Semantic HTML Violation: Duplicate Nested `<main>` Landmarks
- **File**: `apps/web/src/App.tsx:14` and `apps/web/src/pages/LessonPage.tsx:345`
- **Description**: `App.tsx` wraps routes in `<main className="flex-1">`. `LessonPage.tsx` line 345 renders `<main><Card ...></main>`, resulting in a `<main>` nested inside another `<main>`, violating HTML5 and WCAG AA landmark specifications.
- **Actionable Fix**: Change `<main>` in `LessonPage.tsx` to `<section aria-label="Interactive Lesson Step">` or `<div>`.

---

### P2 (Minor Observations)

#### `CODE-P2-01`: Root `package.json` Typecheck Script Lacks Workspace Concurrency Guard
- **File**: `package.json:10`
- **Description**: `"typecheck": "pnpm -r run typecheck"` causes Node.js heap memory exhaustion on Windows during concurrent compilation across 5 packages.
- **Actionable Fix**: Update `package.json` to `"typecheck": "pnpm -r --workspace-concurrency=1 run typecheck"`.

#### `CODE-P2-02`: Loose `z.any()` in Step Schema Forces Brittle In-Page Type Assertions
- **File**: `packages/platform/src/curriculum/schema.ts:65`
- **Description**: `config: z.record(z.any())` introduces `any` types into TypeScript inference, necessitating manual casts (`as Array<{ id: string; isCorrect: boolean }>`, `as string`) in `LessonPage.tsx`.
- **Actionable Fix**: Define typed config schemas or use `z.record(z.unknown())`.

#### `CODE-P2-03`: Step Index and Active Interactions Not Restored on Reload
- **File**: `apps/web/src/pages/LessonPage.tsx:82-85`
- **Description**: `useEffect` loads progress on reload, but only sets `progress` state without updating `currentStepIndex` to `savedProgress.currentStepIndex`.
- **Actionable Fix**: Set `setCurrentStepIndex(savedProgress.currentStepIndex)` on reload if matching current lesson.

---

## 5. Verdict & Next Steps

**Verdict: CHANGES REQUESTED**
- **Blockers**: 1 P0 (`CODE-P0-01`)
- **Critical Issues**: 4 P1 (`CODE-P1-01`, `CODE-P1-02`, `CODE-P1-03`, `CODE-P1-04`)
- **Minor Observations**: 3 P2 (`CODE-P2-01`, `CODE-P2-02`, `CODE-P2-03`)

Per Section 3 of `AGENTS.md`, author agents must address all P0 and P1 findings before Phase 3 can proceed through sign-off.
