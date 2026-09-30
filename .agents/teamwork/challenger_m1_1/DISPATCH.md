## 2026-09-30T07:02:06Z

You are challenger_m1_1, a teamwork_preview_challenger acting as the Code Reviewer and Fixer Agent.
Your working directory is: C:\Users\hp\.gemini\antigravity\worktrees\valiant-raman\pharmacy_education_platform_setup\.agents\teamwork\challenger_m1_1\
The project root is: C:\Users\hp\.gemini\antigravity\worktrees\valiant-raman\pharmacy_education_platform_setup\

MANDATORY FIRST STEP: Read ORIGINAL_REQUEST.md at:
C:\Users\hp\.gemini\antigravity\worktrees\valiant-raman\pharmacy_education_platform_setup\.agents\teamwork\ORIGINAL_REQUEST.md
Also read PROJECT.md at:
C:\Users\hp\.gemini\antigravity\worktrees\valiant-raman\pharmacy_education_platform_setup\PROJECT.md
Also read the detailed codebase gap analysis at:
C:\Users\hp\.gemini\antigravity\worktrees\valiant-raman\pharmacy_education_platform_setup\.agents\teamwork\explorer_codebase_1\analysis.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your task is to implement and fix all gaps for Milestone 1 (Global Localization, Terminology Governance, RTL/LTR Layout Isolation, and Design System Hardening):
1. Implement centralized i18n dictionaries in apps/web/src/locales/ (tr.json and ar.json) covering 100% of UI strings (Navbar, Footer, Catalog, Course, Lesson, Pricing, Profile, Modals, Gallery, and Widgets).
2. Create TranslationContext and useTranslation hook in apps/web/src/context/TranslationContext.tsx, replacing fragile inline ternaries across pages and components.
3. In apps/web/src/main.tsx, initialize ThemeProvider with defaultLocale="tr" (Turkish primary default).
4. Strictly enforce canonical "Farmasötik Kimya" (eliminate all instances of "Medisinal Kimya" and "MedKim"):
   - Fix courses/medchem/course.config.json:4 to "title": "Farmasötik Kimya".
   - Fix apps/web/src/pages/PricingPage.tsx:34 to "Farmasötik Kimya".
   - Update supportedLocales in courses/medchem/course.config.json and courses/pharmacology/course.config.json to ["tr", "ar"].
5. Implement The Special Arabic Rule:
   - Create <TechnicalTermBadge> in packages/ui/src/components/TechnicalTermBadge/ with dedicated semantic typography, badge styling, and tooltip definition support. Export from packages/ui.
   - Remove the forced dir="ltr" hack from apps/web/src/pages/LessonPage.tsx (lines 457, 467, 543, 600, 616, 620). Arabic instructional prose must render in RTL with technical keywords rendered via <TechnicalTermBadge>.
6. Enforce Bidirectional RTL/LTR Layout & Isolation:
   - Verify <html dir="rtl" lang="ar"> when active locale is Arabic.
   - Add strict dir="ltr" isolation wrappers around all molecular SVG canvases, Cartesian plots, KaTeX math blocks, and numerical tables.
   - Fix logical margin/padding properties (e.g. start/end instead of hardcoded left/right in badges and progress bars).
7. Design System Focus Rings & Palette Compliance:
   - Standardize all focus rings to #F59E0B warm amber in dark mode (replace #FFD93D in Input.tsx:34, AuthModal.tsx:404, PaywallModal.tsx:214-216).
   - Verify pure white cages (border-white) are eliminated.
8. Enforce Exclusively Turkish Lira (TRY / ₺) Pricing:
   - Update courses/medchem/pricing.json and courses/pharmacology/pricing.json to currencyDefault: "TRY" and remove foreign currencies (USD, SAR, EUR).
   - Update packages/ui/src/components/PaywallModal/PaywallModal.tsx to restrict Currency to 'TRY'.
   - Fix Turkish strings inside Arabic dictionaries in PricingPage.tsx (translate guaranteeFreeLessons and guaranteeCardlessTrial into proper Arabic).
9. Run all build, test, typecheck, lint, and claim-inventory commands:
   - pnpm -r --workspace-concurrency=1 run test
   - pnpm -r --workspace-concurrency=1 run typecheck
   - pnpm -r run lint
   - pnpm run build
   - pnpm claim-inventory

## 2026-09-30T07:50:26Z
**Context**: Status check on Milestone 1 verification
**Content**: Checking in on your background verification run. What command is currently running and what is the status?
**Action**: Please report status or proceed to generate changes.md and handoff.md once tests complete.

