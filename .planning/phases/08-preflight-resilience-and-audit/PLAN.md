# Phase 08: Pre-Flight Launch Audit, Edge-Case Resilience & Socratic Guardrails

**Phase Goal**: Address all pre-launch polish, offline resilience, and edge-case handling before the platform goes live. Ensure zero unhandled exceptions, zero data loss, rock-solid offline behavior with connectivity detection, polished error boundaries adhering to the ChatGPT theme, and a comprehensive pre-flight verification audit document.

---

## Plan 08-01: Offline Sentinel & Connection Status Pill (`ConnectivitySentinel.tsx`)
- **Features**:
  - Live listener for `window.addEventListener('online')` and `window.addEventListener('offline')`.
  - Non-intrusive floating status notification pill styled with ChatGPT dark tokens:
    - Offline: *"Çevrimdışı Mod: Tüm ilerlemeniz ve notlarınız yerel olarak güvenle saklanıyor 📶"*
    - Back online: Auto-reconnect banner showing *"Yeniden Bağlandı: Değişiklikler eşitlendi ✓"* with 3s auto-dismiss.
  - Wire into `PharmLearnShell.tsx`.
  - Unit tests in `apps/web/src/components/common/ConnectivitySentinel.test.tsx`.

## Plan 08-02: Obsidian-Themed ErrorBoundary & Canvas Recovery
- **Features**:
  - Refactor `apps/web/src/components/ErrorBoundary.tsx` to detect dark mode (`dark` class on root) and render a clean ChatGPT Obsidian card (`#171717` card, `#2F2F2F` border, `#10A37F` emerald retry button).
  - Context recovery action that safely clears corrupted local cache while preserving authenticated user identity and study progress.
  - Unit tests verifying fallback rendering and retry button actions.

## Plan 08-03: Pre-Flight Launch Audit Document (`docs/PREFLIGHT_LAUNCH_AUDIT.md`)
- **Features**:
  - Verification of physical slide deck sources (8 decks across MedChem & Pharmacology).
  - FSEK Safe Harbor legal compliance audit for past exam questions.
  - Student Document Vault privacy and Supabase Storage encryption audit.
  - Dodo Payments and Turkish Lira PPP pricing checks.
  - Localhost zero-dependency and Cloudflare Pages SPA deployment checks.

## Plan 08-04: Full Verification, Brave UI Captures & Showcase Compilation
- **Features**:
  - Run full Vitest suite (17/17 test files, 100% passing).
  - Run `tsc --noEmit` (0 errors).
  - Capture any final state screenshots and ensure `pharmlearn_showcase.html` is up-to-date.
  - Clean git commit.
