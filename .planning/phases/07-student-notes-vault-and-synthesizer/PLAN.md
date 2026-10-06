# Phase 07: Student Notes Vault, Document Ingestion & AI Smart Study Guide Synthesizer (PRD 3.1)

**Phase Goal**: Empower pharmacy students to securely upload, organize, and study from their own university lecture notes, PDF slides, and summaries. Connect to Supabase Storage with local fallback, automatically synthesize structured Socratic study guides and active-recall flashcards from uploaded documents, and integrate seamlessly into the minimalist dashboard and Socratic AI Tutor.

---

## Plan 07-01: Student Document & Storage Service (`studentDocumentService.ts`)
- **Artifacts**: `apps/web/src/services/studentDocumentService.ts`
- **Features**:
  - Secure document metadata and file handling for `.pdf`, `.md`, `.txt`, and images.
  - Hybrid storage: Supabase Storage bucket `student-documents` with transparent offline/localStorage fallback.
  - Text extraction and semantic parsing into structured sections (Title, Course, Faculty, Key Concepts, High-Frequency Exam Traps).
  - Pre-loaded sample student notes for instant exploration (e.g., *"Marmara Eczacılık 3. Sınıf Farmakoloji Vize Notu"* and *"Hacettepe Eczacılık MedChem SAR Özeti"*).
  - Unit tests in `apps/web/src/services/studentDocumentService.test.ts`.

## Plan 07-02: AI Smart Study Guide & Socratic Flashcard Synthesizer
- **Artifacts**: `apps/web/src/components/vault/StudentDocumentVaultModal.tsx`, `apps/web/src/components/vault/StudyGuideView.tsx`
- **Features**:
  - Ant Design squircle modal with two primary views:
    1. **Doküman Kasası (Document Vault)**: Filter by course (Farmasötik Kimya, Farmakoloji, Tümü), upload drag-and-drop zone with progress and size guards (15MB), list of uploaded documents with date and page count.
    2. **Akıllı Vize Çalışma Rehberi (AI Study Guide)**: Automatically generates 3 structured pillars:
       - *Kritik Vize Kavramları (Key Concept Cards)* with page tags.
       - *Sokratik Hatırlama Kartları (Active Recall Flashcards)* with flip interaction and 3-tier hints.
       - *Sınav Yanılgı Uyarıları (Exam Pitfall Alerts)* diagnosing named 3rd-year pharmacy misconceptions.
  - One-click "Tutor'a Gönder" button linking any note excerpt directly to `TutorChatPane`.
  - Connect entry point into `MinimalCourseDashboard.tsx`.

## Plan 07-03: Vitest Integration Testing & Edge Case Hardening
- **Artifacts**: `apps/web/src/components/vault/StudentDocumentVaultModal.test.tsx`
- **Features**:
  - Test document upload, filtering, view switching, study guide rendering, and flashcard interaction.
  - Test graceful error handling when invalid file types or oversized files are uploaded.
  - Verify 0 regression across existing 14 test suites.

## Plan 07-04: Brave Browser Automated UI Verification & Showcase Gallery
- **Artifacts**: `scripts/capture-ui-screenshots.mjs`, `scripts/build-showcase-html.mjs`, `pharmlearn_showcase.html`
- **Features**:
  - Automate Brave Browser to capture:
    - `21_student_vault_documents.png`: Document vault with uploaded PDFs and course filters.
    - `22_synthesized_study_guide.png`: Synthesized study guide with interactive flashcards and exam traps.
  - Re-build `pharmlearn_showcase.html` with all 22 views embedded as Base64.
  - TypeScript `tsc --noEmit` 0 errors.
  - Clean git commit.
