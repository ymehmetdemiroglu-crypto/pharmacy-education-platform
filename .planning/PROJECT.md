# Project: Pharmacy Education Platform

## Mission & Purpose
Build and operate a commercial-grade interactive learning platform hosting two separate university-level courses:
1. **Course A: Medicinal Chemistry (Farmasötik Kimya)**
2. **Course B: Pharmacology (Farmakoloji)**

Both courses adhere strictly to:
- **Pedagogical Model**: Active learn-by-doing (Brilliant-inspired: predict-then-reveal, prompt $\le 40$ words, 3-tier scaffolded hint ladders, hypercorrection on confident errors, spaced review).
- **Visual Design**: Refined Neo-Brutalism (3-4px high-contrast borders `#000000`, 6px hard zero-blur drop shadows, Space Grotesk / Inter / JetBrains Mono typography, CSS `transform`/`opacity` motion only).
- **Physical Grounding**: 100% of clinical, chemical, and pharmacokinetic claims strictly traced to verified physical lecture decks in `/materials`.
- **Epistemic Integrity**: No synthetic ungrounded mechanisms or hallucinated numbers; live maintenance of `docs/gaps.md`.

## Workspace & Architecture
- **Monorepo**: `@pharmacy/ui`, `@pharmacy/widgets`, `@pharmacy/platform`, `@pharmacy/web`.
- **Workspaces**: Main workspace (`c:/Users/hp/Documents/antigravity/valiant-raman`) and active worktree (`C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup`). Both must stay synchronized.
