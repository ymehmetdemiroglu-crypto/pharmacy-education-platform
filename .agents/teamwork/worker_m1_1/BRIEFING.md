# BRIEFING — 2026-09-30T06:38:18Z

## Mission
Execute Milestone 1: Global Localization, Terminology Governance, RTL/LTR Layout Isolation, and Design System Hardening.

## 🔒 My Identity
- Archetype: worker
- Roles: implementer, qa, specialist
- Working directory: C:\Users\hp\.gemini\antigravity\worktrees\valiant-raman\pharmacy_education_platform_setup\.agents\teamwork\worker_m1_1\
- Original parent: 2616c629-9eef-41a0-8f10-f94696a2793e
- Milestone: Milestone 1: Global Localization, Terminology Governance, RTL/LTR Layout Isolation, and Design System Hardening

## 🔒 Key Constraints
- DO NOT CHEAT. All implementations must be genuine.
- No dummy/facade implementations, no hardcoding test results.
- Centralized i18n dictionaries in apps/web/src/locales/ (tr.json and ar.json) covering 100% of UI strings.
- TranslationContext and useTranslation in apps/web/src/context/TranslationContext.tsx.
- Default locale 'tr' in apps/web/src/main.tsx ThemeProvider.
- Canonical "Farmasötik Kimya" (eliminate "Medisinal Kimya" and "MedKim").
- Special Arabic Rule: TechnicalTermBadge in packages/ui, prose in RTL with technical terms badged. Remove forced dir="ltr" hacks from LessonPage.tsx.
- Bidirectional RTL/LTR layout & isolation: <html dir="rtl" lang="ar">, dir="ltr" around molecular SVGs, math, Cartesian plots, tables.
- Design system: #F59E0B focus rings, eliminate pure white cages.
- Exclusively Turkish Lira (TRY / ₺) pricing across courses and PaywallModal.
- Verification: pnpm test, typecheck, lint, build, claim-inventory.

## Current Parent
- Conversation ID: 2616c629-9eef-41a0-8f10-f94696a2793e
- Updated: not yet

## Task Summary
- **What to build**: Localization, Terminology, RTL/LTR layout isolation, Design system hardening, TRY pricing
- **Success criteria**: All 9 requirements satisfied, tests/typecheck/lint/build passing, claim-inventory passes.
- **Interface contracts**: PROJECT.md
- **Code layout**: apps/web, packages/ui, courses/

## Key Decisions Made
- Starting task execution with discovery of documents.

## Change Tracker
- **Files modified**: None yet
- **Build status**: Pending
- **Pending issues**: None

## Quality Status
- **Build/test result**: Not run yet
- **Lint status**: Not run yet
- **Tests added/modified**: None yet

## Loaded Skills
- None loaded yet

## Artifact Index
- DISPATCH.md — Assignment instructions
- BRIEFING.md — Situational awareness
- progress.md — Liveness heartbeat
- changes.md — Change log
- handoff.md — Final handoff report
