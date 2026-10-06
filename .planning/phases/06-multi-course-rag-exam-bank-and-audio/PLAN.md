# Phase 06: Multi-Course RAG (Pharmacology MD Nodes), Socratic Exam Bank & Audio Pipeline

**Phase Goal**: Complete the pedagogical multi-course expansion by creating 10 atomic, easily digestible Markdown knowledge nodes for Course B (Pharmacology), integrating multi-course RAG in `lectureRagService`, creating a pre-loaded curated bank of FSEK-safe isomorphic twin past-exam questions with Socratic hint ladders, and implementing synchronized audio-karaoke summaries.

---

## Plan 06-01: Pharmacology Atomic Markdown Knowledge Nodes & Multi-Course RAG Expansion
- **Artifacts**: `courses/pharmacology/knowledge_nodes/*.md` (10 nodes)
- **Features**:
  - Convert Prof. Dr. Feyza Arıcıoğlu Pharmacology lectures into 10 atomic, digestible Markdown nodes with YAML frontmatter, plain intuition first, mathematical formulas ($K_d$, $EC_{50}$, Hill-Langmuir equation, Schild equation), and high-frequency exam traps.
  - Upgrade `apps/web/src/services/lectureRagService.ts` to support multi-course filtering (`medchem`, `pharmacology`, or `all`), intelligent keyword scoring, and slide citation synthesis.
  - Add unit tests in `apps/web/src/services/lectureRagService.test.ts`.

## Plan 06-02: Curated Çıkmış Soru Bankası & Multi-Topic Socratic Practice
- **Artifacts**: `apps/web/src/services/pastExamService.ts`, `apps/web/src/components/exam/PastExamPracticeModal.tsx`
- **Features**:
  - Expand `pastExamService` with a pre-loaded bank of 10 high-yield isomorphic twin exam questions (5 MedChem, 5 Pharmacology) derived from authentic Turkish pharmacy university vize/final exams (Marmara, Hacettepe, İÜ).
  - Add "Hazır Çıkmış Sorular" tab in `PastExamPracticeModal` allowing students to browse questions by topic, difficulty ("Vize Tuzağı 🔥", "Orta", "Klasik"), and course.
  - Implement full 3-tier Socratic hint ladder (Nudge -> Clue -> Solution) and diagnostic feedback for each question.
  - Add unit tests in `apps/web/src/components/exam/PastExamPracticeModal.test.tsx`.

## Plan 06-03: Synchronized Audio-Karaoke Summary & Socratic Audio Inquiry
- **Artifacts**: `apps/web/src/services/audioService.ts`, `apps/web/src/components/canvas/AudioSummaryBar.tsx`
- **Features**:
  - Add audio summary scripts and timestamped cues for Pharmacology lectures in addition to MedChem.
  - Add interactive phrase highlighting and auto-scrolling cue ticker in `AudioSummaryBar.tsx`.
  - Add quick Socratic inquiry button ("Bu Cümleyi Tutor'a Sor") that feeds the currently playing audio sentence into `TutorChatPane`.
  - Add unit tests in `apps/web/src/components/canvas/AudioSummaryBar.test.tsx`.

## Plan 06-04: Rigorous Verification, Brave Playwright Screenshots & Showcase Gallery
- **Artifacts**: `scripts/capture-ui-screenshots.mjs`, `scripts/build-showcase-html.mjs`, `pharmlearn_showcase.html`
- **Features**:
  - Run all Vitest unit test suites (`pnpm --filter @pharmacy/web test`).
  - Run full TypeScript type check (`pnpm --filter @pharmacy/web typecheck`).
  - Capture new high-res UI screenshots with Brave Browser (Question Bank tab, Pharmacology Tutor RAG, Audio Karaoke highlight).
  - Re-generate `pharmlearn_showcase.html` with updated Base64 embedded galleries.
