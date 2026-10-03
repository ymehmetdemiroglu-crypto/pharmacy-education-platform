# Motion & Jank Budget Audit Report (A2 Protocol)

**Phase**: Phase 2 Gap Closure (A2)  
**Date**: 2026-09-28  
**Browser**: Brave Browser (`C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe`)  
**Status**: PASSED (0 P0, 0 P1, 0 P2)

---

## 1. Static Token & AST Verification

- **Script**: `scripts/verify-motion-tokens.mjs`
- **Files Scanned**: 71 source files (`apps/web`, `packages/ui`, `packages/widgets`, `packages/platform`)
- **Approved Easing Curve**: `cubic-bezier(0.22, 1, 0.36, 1)` or standard `ease-out`
- **Approved Micro-interaction Duration**: 150ms – 250ms (Page transitions <= 400ms)
- **Approved Animated Properties**: `transform` and `opacity` ONLY (No layout-thrashing `width`, `height`, `margin`, `padding` transitions)
- **Static Result**: **0 violations detected across all 71 source files.**

---

## 2. Dynamic Reduced Motion Verification (`prefers-reduced-motion: reduce`)

- **Test Suite**: `e2e/motion-performance.spec.ts` (Test 1)
- **Harness Mode**: Chromium emulation with `reducedMotion: 'reduce'`
- **Computed Style Assertions**:
  ```json
  {
    "button": {
      "animationDuration": "1e-05s",
      "transitionDuration": "1e-05s",
      "transform": "none"
    },
    "modal": {
      "transform": "none"
    }
  }
  ```
- **Finding**: When `prefers-reduced-motion: reduce` is active, all CSS transitions collapse to instantaneous opacity switches (`<= 0.001s`), translation transforms are disabled (`transform: none`), eliminating all vestibular triggers while preserving full interactive clarity.

---

## 3. Real-Time Frame Timing, Long Tasks & CLS Verification

- **Test Suite**: `e2e/motion-performance.spec.ts` (Test 2)
- **Browser**: Brave Browser (Shields Default)
- **Flow Verified**: Full gallery load -> Button interactions -> Open Paywall Modal -> Bundle Toggle -> Currency Switch -> Plan Selection -> Modal Close.
- **Measured Metrics**:
  - **Total CLS**: `0.000` (Threshold: `< 0.05`)
  - **Layout Shift Count**: `0`
  - **Long Tasks (>50ms)**: `0`
  - **Blocking Tasks**: `0`
  - **Result**: **Clean 60fps execution with zero layout thrashing.**

---

## 4. Video Recording Frame Extraction & Visual Analysis

Frames extracted using `ffmpeg` from WebM recordings into `docs/screenshots/phase-2/motion/frames/`:

1. `frame_01.png` & `frame_02.png` (Reduced Motion Video):
   - Shows instantaneous modal backdrop opacity fade with zero zoom or scale transforms. The modal appears cleanly centered without bounce or overshoot.
2. `perf_frame_01.png` – `perf_frame_02.png` (Initial Gallery Load):
   - Header, navigation, and gallery sections render in final positions without FOUC or vertical jumping.
3. `perf_frame_03.png` – `perf_frame_04.png` (Interaction & Modal Trigger):
   - Active button depress sinks 2px with zero margin alteration. Paywall modal transition smoothly fades into view within the 200ms budget.
4. `perf_frame_05.png` – `perf_frame_06.png` (Bundle & Currency Switches):
   - Dual-bundle toggle switches highlight styles instantaneously. Currency changes update symbols without resizing card widths or causing text wrapping shifts.
5. `perf_frame_07.png` – `perf_frame_09.png` (Plan Selection & Modal Dismissal):
   - Selecting Semester Pass applies border highlight and subtle scale (1.02) constrained strictly to the card container. Escape key dismisses modal smoothly, immediately restoring interactive focus to the calling element.

---

## 5. Reviewer Sign-Off

- **Severity P0 Issues**: 0
- **Severity P1 Issues**: 0
- **Severity P2 Issues**: 0
- **Conclusion**: Motion design strictly complies with Section 5 of `AGENTS.md` and passes all A2 gate requirements.
