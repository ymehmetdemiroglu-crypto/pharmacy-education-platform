# Architectural & Pedagogical Master Blueprint
## The Unified Daily Study Workspace for Pharmacy Students

**Document ID**: `PEP-ARCH-BLUEPRINT-2026-V2`  
**Version**: `2.0.0-PROD`  
**Status**: `APPROVED FOR IMPLEMENTATION`  
**Date**: October 7, 2026  
**Target Systems**: `apps/web`, `packages/widgets`, `packages/ui`, `packages/platform`, `supabase/`, `functions/`

---

## 1. Executive Summary & Architectural Vision

### 1.1 The Core Problem & Status Quo Forensic Synthesis
Turkish pharmacy students in Year 3 face what is universally recognized as the elimination year (*"eleme sınıfı"* / *"baraj sınıfı"*). The academic curriculum demands the simultaneous mastery of **Farmasötik Kimya I & II** (Medicinal Chemistry) and **Farmakoloji I & II** (Pharmacology). Midterms (*Vize*) and finals demand not merely factual recall, but high-dimensional structural, mathematical, and mechanistic synthesis:
1. Tracing how a chemical substituent alteration changes membrane permeability ($\text{LogP}$), ionization ($\text{pKa}$), and receptor binding affinity ($K_d$).
2. Deriving receptor downstream cascades ($G_{\alpha s}, G_{\alpha i}, G_{\alpha q}$) and distinguishing competitive versus non-competitive curve shifts under spare receptor reserves (Furchgott model).
3. Analyzing past exam questions (*"çıkmış sorular"*) that professors reuse with altered clinical vignettes or chemical derivatives.

Currently, students cope by juggling fragmented, passive resources:
- **Static Lecture Slide Decks**: Memorizing 300+ slides per exam without active recall, falling victim to the illusion of competence.
- **Anki Flashcards**: Memorizing isolated text facts stripped of 3D chemical scaffolds, dynamic physiological curves, or professor slide contexts.
- **Generic ChatGPT**: Asking ungrounded LLMs that hallucinate chemical structures, lack slide citations, and deliver passive walls of text instead of Socratic guidance.

### 1.2 Forensic Audit Synthesis: The 10 Friction Points
The exhaustive forensic audit conducted across the codebase uncovered 10 critical bottlenecks that currently prevent PharmLearn from becoming the student's daily study desk:

```
+----+------------------------------------+---------------------------------------------------------------+-----------------------------------------------------------------+
| #  | Friction Bottleneck                | File & Line Reference                                         | Root Cause & Engineering Failure                                |
+----+------------------------------------+---------------------------------------------------------------+-----------------------------------------------------------------+
| 01 | Mobile Touch Failure in 3D Viewer  | apps/web/src/components/widgets/DualModeMoleculeViewer.tsx:403| Mouse listeners bound exclusively; zero onTouch* handlers.     |
| 02 | Catalog Routing Bifurcation        | apps/web/src/pages/CatalogPage.tsx:194, App.tsx:37-53           | Catalog generates 1-based index links that fail in lessonsMap,  |
|    |                                    |                                                               | silently trapping students in MedChem Lesson 1.                 |
| 03 | Simulated Notes Vault & Fake URL   | apps/web/src/services/studentDocumentService.ts:186, 246      | Hardcoded https://supabase.local/ URL; ignores uploaded text and |
|    |                                    |                                                               | returns static Procaine/Dibucaine cards from localStorage.      |
| 04 | 100% Failure Rate in pgvector RAG  | apps/web/src/services/lectureRagService.ts:236-241            | RPC call omits required query_embedding parameter; falls back   |
|    |                                    |                                                               | to 20 hardcoded JS nodes with substring matching.               |
| 05 | Disconnected Spaced Review Queue   | apps/web/src/pages/LessonPage.tsx:311, ReviewPage.tsx:28      | enqueueReviewCards is only called in legacy LessonPage; Studio  |
|    |                                    |                                                               | widgets never enqueue review items; /review stays empty.        |
| 06 | Plaintext API Secret Leak          | apps/web/src/services/tutorService.ts:62                      | Hardcoded sk-or-v1-... token bundled into client JavaScript.    |
| 07 | Ephemeral In-Memory State & Loss   | apps/web/src/components/layout/TutorChatPane.tsx:28-41        | Chat history and diagnosed misconceptions reside in React state |
|    |                                    |                                                               | and in-memory arrays; wiped on page reload or route change.     |
| 08 | Visual Identity Split              | tailwind.config.js vs PharmLearnShell.tsx                     | 4px black borders & 6px neo-brutalist drop shadows clash with   |
|    |                                    |                                                               | modern ChatGPT Obsidian #212121 rounded squircles.              |
| 09 | Missing GPCR Final Challenge       | apps/web/src/components/widgets/ReceptorSignalingVisualizer.ts| STEP_CHALLENGES omits step 3; question unmounts abruptly at    |
|    |                                    |                                                               | "Hücresel Yanıt" stage.                                         |
| 10 | Static Shallow SAR Matrix          | apps/web/src/components/widgets/SarMatrixWidget.tsx:15        | Renders a static Ant Design table instead of the live multi-     |
|    |                                    |                                                               | position calculator from packages/widgets/SarExplorer.          |
+----+------------------------------------+---------------------------------------------------------------+-----------------------------------------------------------------+
```

### 1.3 The Unified Architectural Vision: The Daily Socratic Study Desk
This master blueprint unifies the fragmented `/studio`, `/catalog`, `/courses`, and `/tutor` routes into **ONE cohesive daily study workspace**:
1. **Universal Modern Squircle Shell**: Retiring the dual-routing split. The universal workspace provides an interactive dual-pane view: the authentic verified lecture material / PDF slide viewer on the left, and tactile pharmacy simulators paired with a Socratic AI drawer on the right.
2. **Production-Grade Supabase pgvector RAG**: Real vector embeddings (`vector(1536)`) generated server-side for all authentic Marmara University slide decks, queryable via type-safe RPCs with exact bounding-box slide rendering.
3. **OpenRouter Server-Side Model Router**: Complete elimination of client secrets. All LLM turns proxy through an authenticated Supabase Edge Function (`v2-tutor-service`) with tiered models (DeepSeek / Llama 3.3 70B for fast Socratic dialogue, Claude 3.5 Sonnet / GPT-4o for complex past-exam twin synthesis, and a deterministic state machine for offline fallback).
4. **FSRS Spaced Repetition & Persistent Misconception Memory**: Continuous synchronization of student struggles (e.g. pKa ionization traps, spare receptor shifts) into `student_concept_mastery`, automatically driving the Daily 10 active-recall loop with Anki `.apkg` export.

---

## 2. Technical Architecture & System Topology

### 2.1 System Topology Diagram

```
+-------------------------------------------------------------------------------------------------------+
|                                  CLIENT SINGLE-PAGE APPLICATION                                       |
|                                (React 18 + Vite + Tailwind CSS + Zustand)                             |
|                                                                                                       |
|  +-------------------------------------------------------------------------------------------------+  |
|  | Universal Workspace Shell (PharmLearnShell.tsx)                                                  |  |
|  | +-----------------------+ +-------------------------------------+ +--------------------------+ |  |
|  | | Navigation Sidebar    | | Main Interactive Stage              | | Socratic Tutor Drawer    | |  |
|  | | - Course Switcher     | | - Dual Mode: Slide PDF / Markdown   | | - Streaming Token Flow   | |  |
|  | | - 22-Lesson Tree      | | - Tactile Domain Widget Stage       | | - Slide Tag Citations    | |  |
|  | | - Daily 10 Challenge  | |   (SAR, PK, Ionization, GPCR)       | | - 3-Tier Hint Ladder     | |  |
|  | | - Vize Exam Countdown | | - Bounding Box Diagram Overlay      | | - Diagnostic Feedback    | |  |
|  | +-----------------------+ +-------------------------------------+ +--------------------------+ |  |
|  | +---------------------------------------------------------------------------------------------+ |  |
|  | | Quick Study Dock (Tactile Tools: Henderson-Hasselbalch, SAR Modifier, PK Sandbox, Anki Add)| |  |
|  | +---------------------------------------------------------------------------------------------+ |  |
|  +-------------------------------------------------------------------------------------------------+  |
|                                                                                                       |
|  Client State Machine (Zustand):                                                                      |
|  - useStudySessionStore: Active lesson, concept, widget parameters, Pomodoro timer                    |
|  - useMisconceptionStore: Diagnosed student traps, error taxonomy, adaptation weights                 |
|  - useReviewQueueStore: FSRS v4 memory stability, retrievability decay, due cards                    |
|  - IndexedDB Persistence (idb-keyval): Complete offline-first storage of session state & notes        |
+---------------------------------------------------+---------------------------------------------------+
                                                    | Authenticated HTTPS / WSS
                                                    | (Bearer User JWT - Zero Secrets)
                                                    v
+-------------------------------------------------------------------------------------------------------+
|                                    SUPABASE CLOUD INFRASTRUCTURE                                      |
|                                                                                                       |
|  +-------------------------------------------------------------------------------------------------+  |
|  | Supabase Edge Functions (Deno Runtime)                                                          |  |
|  |                                                                                                 |  |
|  | 1. v2-tutor-service:                                                                            |  |
|  |    - Validates user JWT & quota limits                                                          |  |
|  |    - Fetches semantic context via pgvector RPC                                                  |  |
|  |    - Dispatches to OpenRouter Tier 1 (DeepSeek / Llama 3.3 70B) with streaming SSE              |  |
|  |    - Enforces strict Socratic contract (<=40 words, plain intuition first, ladder tiering)       |  |
|  |    - Asynchronously logs telemetry & updates student_concept_mastery                            |  |
|  |                                                                                                 |  |
|  | 2. v2-twin-synthesizer:                                                                         |  |
|  |    - Ingests raw student past-exam text or image uploads                                        |  |
|  |    - Strips all student/faculty PII, de-identifies questions                                    |  |
|  |    - Routes to OpenRouter Tier 2 (Claude 3.5 Sonnet / GPT-4o)                                   |  |
|  |    - Synthesizes copyright-free "Exam Twins" with 3-tier hints & misconception rubrics          |  |
|  |                                                                                                 |  |
|  | 3. v2-rag-retriever:                                                                            |  |
|  |    - Generates 1536-dim embedding via OpenAI text-embedding-3-small                              |  |
|  |    - Executes match_lecture_concepts stored procedure on pgvector database                      |  |
|  |    - Returns verified slide numbers, bounding boxes, and scientific facts                       |  |
|  +-------------------------------------------------------------------------------------------------+  |
|                                                    |
|                                                    v
|  +-------------------------------------------------------------------------------------------------+  |
|  | PostgreSQL Database with pgvector Extension                                                     |  |
|  |                                                                                                 |  |
|  | - lecture_embeddings: vector(1536) with IVFFlat index (<=> cosine distance)                     |  |
|  | - lecture_concepts: Slide summaries, verified chemical structures, misconception maps           |  |
|  | - student_concept_mastery: Stability S, Retrievability R, diagnosed error tags, attempt history   |  |
|  | - student_documents: User-uploaded notes with Supabase Storage RLS (auth.uid() = user_id)        |  |
|  | - telemetry_events: Interaction latency, widget slider adjustments, hesitation ms               |  |
|  +-------------------------------------------------------------------------------------------------+  |
+-------------------------------------------------------------------------------------------------------+
```

### 2.2 Client Single-Page Architecture
- **Framework**: React 18.3.1 + TypeScript 5.5 + Vite 5.4.
- **Routing**: Unified single-page application utilizing React Router DOM v6 with dynamic slug-based loading:
  - `/` or `/workspace`: Universal study workspace loading active course/lecture.
  - `/workspace/:courseId/:lectureSlug`: Direct deep-linking to any of the 22+ authored lessons.
  - `/workspace/review`: Dedicated FSRS active-recall review queue.
  - `/workspace/daily`: Daily High-Yield 10 challenge engine.
  - `/workspace/vault`: Authenticated student notes vault and past-exam twin manager.
  - `/reset-password`: Mobile-responsive password recovery page.
- **State Architecture**:
  - Global client state is managed via **Zustand** stores with persistent offline hydration via `idb-keyval`.
  - Asynchronous remote data caching and background invalidation is powered by **TanStack Query v5**.

---

## 3. Supabase pgvector RAG Pipeline (Production Grade)

### 3.1 Remote pgvector Schema & Migration Design
The RAG pipeline operates on a dedicated `lecture_embeddings` table and an updated `lecture_concepts` table residing in PostgreSQL with the `vector` extension.

```sql
-- Migration: 20261008000000_production_pgvector_rag.sql
-- Enables vector extension in extensions schema
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;

-- 1. Chunked Lecture Text & Semantic Embeddings Table
CREATE TABLE IF NOT EXISTS public.lecture_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id TEXT NOT NULL CHECK (course_id IN ('medchem', 'pharmacology')),
    lecture_slug TEXT NOT NULL,
    deck_filename TEXT NOT NULL,
    slide_number INT NOT NULL,
    chunk_index INT NOT NULL,
    token_count INT NOT NULL,
    chunk_content TEXT NOT NULL,
    concept_tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    bounding_box JSONB, -- Optional { x: number, y: number, w: number, h: number }
    embedding extensions.vector(1536) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Hierarchical Navigable Small World (HNSW) Index for sub-10ms high-recall queries
-- Resolves IVFFlat cold-start recall collapse on unseeded/small datasets (<10,000 rows)
CREATE INDEX IF NOT EXISTS lecture_embeddings_hnsw_idx
    ON public.lecture_embeddings
    USING hnsw (embedding extensions.vector_cosine_ops)
    WITH (m = 16, ef_construction = 64);

CREATE INDEX IF NOT EXISTS lecture_embeddings_lookup_idx
    ON public.lecture_embeddings (course_id, lecture_slug, slide_number);

-- 2. Enhanced Production Stored Procedure: match_lecture_concepts
-- Drop conflicting legacy function signatures to prevent PostgreSQL return table type collision (ARC-01)
DROP FUNCTION IF EXISTS public.match_lecture_concepts(extensions.vector, text, text, double precision, integer);
DROP FUNCTION IF EXISTS public.match_lecture_concepts(extensions.vector, text, text, float, integer);

CREATE OR REPLACE FUNCTION public.match_lecture_concepts(
    query_embedding extensions.vector(1536),
    p_course_id TEXT,
    p_lecture_slug TEXT DEFAULT NULL,
    match_threshold FLOAT DEFAULT 0.40,
    match_count INT DEFAULT 4
)
RETURNS TABLE (
    id UUID,
    course_id TEXT,
    lecture_slug TEXT,
    deck_filename TEXT,
    slide_number INT,
    chunk_content TEXT,
    concept_tags TEXT[],
    bounding_box JSONB,
    similarity FLOAT
)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public, extensions
AS $$
    SELECT
        le.id,
        le.course_id,
        le.lecture_slug,
        le.deck_filename,
        le.slide_number,
        le.chunk_content,
        le.concept_tags,
        le.bounding_box,
        1 - (le.embedding <=> query_embedding) AS similarity
    FROM public.lecture_embeddings le
    WHERE (p_course_id = 'all' OR le.course_id = p_course_id)
      AND (p_lecture_slug IS NULL OR le.lecture_slug = p_lecture_slug)
      AND (1 - (le.embedding <=> query_embedding)) >= match_threshold
    ORDER BY le.embedding <=> query_embedding ASC
    LIMIT match_count;
$$;
```

### 3.2 Ingestion & Semantic Chunking Pipeline
The ingestion pipeline processes the 6 authentic Marmara University MedChem decks and authenticated Pharmacology decks:
1. **Extraction**: `pdfjs-dist` extracts text strings and coordinates for every slide page.
2. **Chunking Strategy**:
   - Chunk Size: Exactly 500 tokens with 100-token sliding overlap.
   - Preservation: Chemical formulas ($\text{pKa}$, $\text{LogP}$, SMILES) and enzyme classifications (CYP450, PLC, adenylate cyclase) are retained in markdown format.
   - Metadata Tagging: Every chunk is tagged with `{ course_id, lecture_slug, deck_filename, slide_number, professor: "Prof. Dr. Bedia Kaymakçıoğlu" }`.
3. **Embedding Generation**: Chunks are embedded via OpenAI `text-embedding-3-small` (1536 dimensions) using normalized vectors.

### 3.3 Type-Safe Client RPC Call Implementation
The client service `lectureRagService.ts` calls `v2-rag-retriever` or direct Supabase RPC safely with strict parameter typing:

```typescript
// apps/web/src/services/lectureRagService.ts
import { getSupabase } from './supabaseClient';

export interface LectureMatchResult {
  id: string;
  courseId: 'medchem' | 'pharmacology';
  lectureSlug: string;
  deckFilename: string;
  slideNumber: number;
  chunkContent: string;
  conceptTags: string[];
  boundingBox?: { x: number; y: number; w: number; h: number };
  similarity: number;
}

export async function searchLectureSlides(
  queryEmbedding: number[],
  courseId: 'medchem' | 'pharmacology' | 'all',
  lectureSlug?: string,
  threshold: number = 0.45,
  limit: number = 4
): Promise<LectureMatchResult[]> {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Supabase client unavailable');

  // Strictly passes query_embedding as first parameter
  const { data, error } = await supabase.rpc('match_lecture_concepts', {
    query_embedding: queryEmbedding,
    p_course_id: courseId,
    p_lecture_slug: lectureSlug || null,
    match_threshold: threshold,
    match_count: limit,
  });

  if (error) {
    console.error('[RAG] Stored procedure execution failed:', error);
    throw error;
  }

  return (data || []).map((row: any) => ({
    id: row.id,
    courseId: row.course_id,
    lectureSlug: row.lecture_slug,
    deckFilename: row.deck_filename,
    slideNumber: row.slide_number,
    chunkContent: row.chunk_content,
    conceptTags: row.concept_tags || [],
    boundingBox: row.bounding_box || undefined,
    similarity: Number(row.similarity),
  }));
}
```

### 3.4 Visual Slide Citation & Diagram Overlay Engine
Instead of scrolling to an artificial markdown anchor on a page, the UI renders the exact slide page and highlights the referenced region:
- **PDF Renderer**: Renders the slide image from `/materials` (or web-optimized WebP previews hosted in Supabase Storage).
- **Bounding Box Overlay**: Draws an emerald squircle (`border: 2px solid #10A37F; background: rgba(16, 163, 127, 0.12); border-radius: 8px;`) around the exact molecular structure, equation, or table cited by the AI tutor.
- **Side-by-Side Presentation**: Clicking `[Slayt 33: Dibukain]` in the Socratic chat splits or docks the slide viewer directly in the Main Interactive Stage.

---

## 4. OpenRouter Model Routing & Security Architecture

### 4.1 Zero-Secret Invariant, Edge Function Gateway & CI/CD Secret Scan Guard
- **Banishment of Plaintext Keys**: `apps/web/src/services/tutorService.ts:62` is completely purged of `'sk-or-v1-...'`. No API key exists in any client source file or runtime bundle.
- **Sole Authorized LLM Gateway (`v2-tutor-service`)**:
  - All requests to OpenRouter are made server-side exclusively inside `supabase/functions/v2-tutor-service/index.ts`.
  - The OpenRouter API key is stored exclusively in Supabase Vault and accessed via `Deno.env.get('OPENROUTER_API_KEY')`. Client browsers have zero direct access to LLM credentials.
- **JWT Authentication & Quota Enforcement**:
  - The Edge Function verifies the client's Supabase JWT via `auth.getUser(token)`. Anonymous or unauthenticated requests are rejected with HTTP 401.
  - Enforces per-user rate limiting (strictly capped at 60 turns/hour for active students) tracked via sliding-window Redis/database counters to prevent denial-of-wallet attacks.
- **Automated CI/CD Secret Release Guard (`scripts/test-prod-bundle.mjs`)**:
  - The production bundle validation script `scripts/test-prod-bundle.mjs` enforces regex scans over all compiled JavaScript chunks in `apps/web/dist/assets/`:
    ```javascript
    // Added to FORBIDDEN_TOKENS and regex validators:
    /sk-or-v1-[a-f0-9]{64}/i,
    /sk-or-/i,
    /VITE_OPENROUTER_API_KEY/i
    ```
  - If any compiled file matches `sk-or-`, the build immediately terminates with non-zero exit code 1, aborting CI/CD and blocking production deployment.

### 4.2 Multi-Tier Model Cascade & Fallback Matrix

```
+---------------------------------------------------------------------------------------------------------+
|                                  OPENROUTER MODEL ROUTING MATRIX                                        |
+--------+---------------------------------------+-------------+---------+--------------------------------+
| Tier   | Primary Models                        | Max Budget  | Timeout | Intended Pedagogical Role      |
+--------+---------------------------------------+-------------+---------+--------------------------------+
| Tier 1 | deepseek/deepseek-chat                | $0.0004/turn| 3,500ms | Fast Socratic reasoning,       |
|        | meta-llama/llama-3.3-70b-instruct     |             |         | 40-word prompts, hint ladders, |
|        | qwen/qwen-2.5-72b-instruct            |             |         | misconception feedback.        |
+--------+---------------------------------------+-------------+---------+--------------------------------+
| Tier 2 | anthropic/claude-3.5-sonnet           | $0.008/turn | 9,000ms | Abstract concept extraction,   |
|        | openai/gpt-4o                         |             |         | synthetic question generation, |
|        | deepseek/deepseek-r1                  |             |         | clinical case formulation.     |
+--------+---------------------------------------+-------------+---------+--------------------------------+
| Tier 3 | Deterministic Socratic State Machine  | $0.000      | 0ms     | Offline fallback, network loss,|
|        | (Local verified knowledge nodes)      |             |         | quota exhaustion safeguard.    |
+--------+---------------------------------------+-------------+---------+--------------------------------+
```

### 4.3 Socratic Prompt Contract & Decontamination
To guarantee that the AI Tutor acts as a genuine Socratic tutor rather than a passive answer bot, the Edge Function enforces a strict pedagogical contract:

```typescript
// supabase/functions/v2-tutor-service/prompt.ts
export function buildSocraticPrompt(context: {
  conceptTitle: string;
  scientificFacts: string[];
  studentAction: string;
  misconceptionAlert?: string;
  hintLevel: 'nudge' | 'clue' | 'solution';
  history: Array<{ role: 'user' | 'assistant'; content: string }>;
}): string {
  return `Sen, 3. sınıf Eczacılık öğrencilerine rehberlik eden Sokratik bir Farmasötik Kimya ve Farmakoloji eğitmenisin.

KATI PEDAGOJİK KURALLAR:
1. ASLA doğrudan nihai cevabı, seçeneği veya formülü söyleme (Seviye 'solution' olmadıkça).
2. Maksimum 40 kelime kullan.
3. Önce sezgisel düşünce adımı sun, ardından bilimsel terimi bağla.
4. Yalnızca aşağıdaki DOĞRULANMIŞ DERS SLAYTI BİLGİLERİNE dayan:
${context.scientificFacts.map((f, i) => `[Slayt Bilgisi ${i + 1}]: ${f}`).join('\n')}

5. Mevcut İskele Seviyesi: ${context.hintLevel.toUpperCase()}
   - NUDGE: Öğrenciye düşündürücü açık uçlu soru sor.
   - CLUE: Mekanizmadaki kritik atom/fonksiyonel grubu işaret et, sonucu sorma.
   - SOLUTION: Slayt referansıyla doğru mekanizmayı net açıkla.

${context.misconceptionAlert ? `DİKKAT: Öğrenci şu yanılgıya düştü: "${context.misconceptionAlert}". Bu yanılgıyı aşağılamadan, doğrusuyla zıtlaştır.` : ''}
`;
}
```

### 4.4 Abstract Pharmacological Concept Extractor & Independent Synthetic Socratic Question Generator (`v2-twin-synthesizer`)
To provide high-yield exam preparation while guaranteeing 100% immunity under copyright and data protection laws:
1. **100% Client-Side Ephemeral Ingestion & Zero Server Persistence**:
   - Student uploads (camera photo, scanned PDF, pasted text) are processed strictly in-browser via Tesseract.js / PDF.js.
   - Raw image files, PDFs, and raw OCR text **NEVER leave the browser and are NEVER persisted on Supabase Storage or PostgreSQL**.
2. **Strict Turkish Law on Intellectual and Artistic Works (FSEK No. 5846) Compliance**:
   - Replaces the legally dangerous "past-exam twin" concept with an **Abstract Pharmacological Concept Extractor**.
   - No reproduction (*çoğaltma* - Art. 21) or unauthorized derivative adaptation (*işleme* - Art. 6).
   - Zero moral rights violations (*adın belirtilmesi salahiyeti* - Art. 15, Art. 71).
   - Only the abstract biophysical principle (e.g. "Pseudocholinesterase ester hydrolysis kinetics vs amide CYP metabolism") is formulated into a Canonical Abstract Problem Spec (CAPS) and transmitted.
3. **Automated N-Gram Lexical Overlap Rejection Guard (<15% Overlap)**:
   - The Edge Function calculates 3-gram lexical overlap between student input text and generated question:
     $$\text{Overlap}_{3\text{-gram}} = \frac{|G_3(\text{Input}) \cap G_3(\text{Generated})|}{|G_3(\text{Generated})|} < 0.15$$
   - If overlap exceeds $15\%$, the response is rejected and regenerated from abstract principles, ensuring genuine independent synthesis.
4. **Strict Ban on University & Professor Branding**:
   - The generator is strictly forbidden from outputting university or faculty names (e.g. never *"Marmara 2023 İkizi"*).
   - All questions are branded neutrally: `"Sentetik Farmakoloji Sokratik İkizi — Konsept: [Konsept Başlığı]"`.
5. **Strict Turkish KVKK No. 6698 Privacy Compliance**:
   - Client-side pre-processing scrubs 11-digit T.C. Kimlik numbers (`\b[1-9]\d{10}\b`), student names, student IDs, dates, and course codes before network calls.
   - Eliminates illegal cross-border personal data transfers under KVKK Art. 9.

---

## 5. Client-Side State Machine, Telemetry & Offline Resilience

### 5.1 Zustand State Machine Specifications

#### Store 1: `useStudySessionStore`
Manages the active workspace stage, lesson progression, and widget parameters:
```typescript
// apps/web/src/stores/useStudySessionStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';

// IndexedDB storage adapter for large offline payloads
const idbStorage = {
  getItem: async (name: string): Promise<string | null> => (await get(name)) || null,
  setItem: async (name: string, value: string): Promise<void> => { await set(name, value); },
  removeItem: async (name: string): Promise<void> => { await del(name); },
};

export interface StudySessionState {
  activeCourseId: 'medchem' | 'pharmacology';
  activeLectureSlug: string;
  activeConceptId: string;
  activeWidgetType: string;
  activeWidgetState: Record<string, any>;
  slideViewerOpen: boolean;
  activeSlideNumber: number;
  pomodoroSecondsRemaining: number;
  isPomodoroActive: boolean;
  
  // Actions
  setActiveLecture: (courseId: 'medchem' | 'pharmacology', slug: string) => void;
  setActiveConcept: (conceptId: string, widgetType: string, initialState?: any) => void;
  updateWidgetState: (newState: Record<string, any>) => void;
  openSlideAt: (slideNumber: number) => void;
  closeSlideViewer: () => void;
  tickPomodoro: () => void;
  resetPomodoro: (minutes?: number) => void;
}

export const useStudySessionStore = create<StudySessionState>()(
  persist(
    (set, get) => ({
      activeCourseId: 'medchem',
      activeLectureSlug: 'ilac-reseptor-etkilesimi',
      activeConceptId: 'rr:receptor_tanimi',
      activeWidgetType: 'ReceptorSignalingVisualizer',
      activeWidgetState: {},
      slideViewerOpen: false,
      activeSlideNumber: 1,
      pomodoroSecondsRemaining: 25 * 60,
      isPomodoroActive: false,

      setActiveLecture: (courseId, slug) => set({ activeCourseId: courseId, activeLectureSlug: slug }),
      setActiveConcept: (conceptId, widgetType, initialState = {}) =>
        set({ activeConceptId: conceptId, activeWidgetType: widgetType, activeWidgetState: initialState }),
      updateWidgetState: (newState) =>
        set((state) => ({ activeWidgetState: { ...state.activeWidgetState, ...newState } })),
      openSlideAt: (slideNumber) => set({ slideViewerOpen: true, activeSlideNumber: slideNumber }),
      closeSlideViewer: () => set({ slideViewerOpen: false }),
      tickPomodoro: () => set((state) => ({ pomodoroSecondsRemaining: Math.max(0, state.pomodoroSecondsRemaining - 1) })),
      resetPomodoro: (minutes = 25) => set({ pomodoroSecondsRemaining: minutes * 60, isPomodoroActive: false }),
    }),
    {
      name: 'pep_study_session_v2',
      storage: createJSONStorage(() => idbStorage),
    }
  )
);
```

#### Store 2: `useMisconceptionStore`
Tracks persistent student errors across sessions:
```typescript
// apps/web/src/stores/useMisconceptionStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';

export interface MisconceptionRecord {
  misconceptionId: string;
  topic: 'pka_ionization' | 'potency_vs_efficacy' | 'partial_agonist_antagonism' | 'spare_receptors' | 'eudismic_ratio' | 'lipophilicity_cutoff';
  conceptId: string;
  triggerCount: number;
  lastTriggeredAt: string;
  resolved: boolean;
}

export interface MisconceptionState {
  records: Record<string, MisconceptionRecord>;
  recordMisconception: (misconceptionId: string, topic: MisconceptionRecord['topic'], conceptId: string) => void;
  resolveMisconception: (misconceptionId: string) => void;
  getActiveMisconceptionTopics: () => string[];
}

export const useMisconceptionStore = create<MisconceptionState>()(
  persist(
    (set, get) => ({
      records: {},
      recordMisconception: (misconceptionId, topic, conceptId) =>
        set((state) => {
          const current = state.records[misconceptionId] || {
            misconceptionId,
            topic,
            conceptId,
            triggerCount: 0,
            lastTriggeredAt: new Date().toISOString(),
            resolved: false,
          };
          return {
            records: {
              ...state.records,
              [misconceptionId]: {
                ...current,
                triggerCount: current.triggerCount + 1,
                lastTriggeredAt: new Date().toISOString(),
                resolved: false,
              },
            },
          };
        }),
      resolveMisconception: (misconceptionId) =>
        set((state) => {
          if (!state.records[misconceptionId]) return state;
          return {
            records: {
              ...state.records,
              [misconceptionId]: { ...state.records[misconceptionId], resolved: true },
            },
          };
        }),
      getActiveMisconceptionTopics: () => {
        const records = get().records;
        return Object.values(records)
          .filter((r) => !r.resolved)
          .map((r) => r.topic);
      },
    }),
    {
      name: 'pep_misconceptions_v2',
      storage: createJSONStorage(() => ({
        getItem: async (name: string) => (await get(name)) || null,
        setItem: async (name: string, value: string) => { await set(name, value); },
        removeItem: async (name: string) => { await del(name); },
      })),
    }
  )
);
```

#### Store 3: `useReviewQueueStore` (FSRS-4.5 Spaced Repetition Engine)
Implements the calibrated Free Spaced Repetition Scheduler (FSRS-4.5), eliminating the 3.9-hour premature decay bug of legacy Leitner:

##### Mathematical Formulation:
- **Retrievability Decay**:
  $$R(t, S) = \left( 1 + F \cdot \frac{t}{S} \right)^{-w} \quad \text{where } F = \frac{19}{81} \approx 0.2345679, \quad w = 0.5$$
- **17-Weight Parameter Vector**: $W = [w_0, \dots, w_{16}]$ with initial stability $S_0(G) = w_{G-1}$, initial difficulty $D_0(G) = w_4 - e^{w_5 (G - 1)} + 1$, and update rules for successful recall vs memory lapse.
- **Optimal Review Interval ($I$)**:
  $$I = \frac{S}{F} \cdot \left( R_{\text{target}}^{-1/w} - 1 \right)$$
  For $R_{\text{target}} = 0.85$ and $w = 0.5$: $I \approx 1.637 \cdot S$.
- **Resolution of 3.9-Hour Premature Decay**:
  In legacy `LeitnerEngine.ts`, setting $S = 1.0\text{ d}$ with $R(t) = e^{-t/S}$ caused $R(t) \le 0.85$ at $t = -S \ln(0.85) = 3.9\text{ hours}$. Because `getDueReviewCards` used `dueByDate || dueByDecay`, cards resurfaced on the same day. Under FSRS-4.5, $I$ is calculated directly from $R_{\text{target}}$, ensuring cards become due only when calendar elapsed time satisfies $R(t, S) \le R_{\text{target}}$.

```typescript
// apps/web/src/stores/useReviewQueueStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';
import { SpacedReviewCard } from '@pharmacy/platform';
import { processCardReview, calculateCardRetrievability } from '@pharmacy/platform';

export interface ReviewQueueState {
  cards: Record<string, SpacedReviewCard>;
  enqueueCard: (card: SpacedReviewCard) => void;
  submitReviewResult: (cardId: string, isCorrect: boolean) => void;
  getDueCards: () => SpacedReviewCard[];
  exportToAnkiPayload: () => Array<{ front: string; back: string; tags: string[] }>;
}

export const useReviewQueueStore = create<ReviewQueueState>()(
  persist(
    (set, get) => ({
      cards: {},
      enqueueCard: (card) =>
        set((state) => ({ cards: { ...state.cards, [card.id]: card } })),
      submitReviewResult: (cardId, isCorrect) =>
        set((state) => {
          const card = state.cards[cardId];
          if (!card) return state;
          const updated = processCardReview(card, isCorrect, new Date());
          return { cards: { ...state.cards, [cardId]: updated } };
        }),
      getDueCards: () => {
        const now = new Date();
        return Object.values(get().cards).filter((card) => {
          const r = calculateCardRetrievability(card, now);
          const dueDate = new Date(card.nextReviewDue);
          return r < 0.85 || dueDate <= now;
        });
      },
      exportToAnkiPayload: () => {
        return Object.values(get().cards).map((c) => ({
          front: c.question,
          back: `<div>${c.answer}</div><hr/><small>Kaynak: ${c.lessonId}</small>`,
          tags: ['pharmlearn', c.courseId, `box_${c.box}`],
        }));
      },
    }),
    {
      name: 'pep_review_queue_v2',
      storage: createJSONStorage(() => ({
        getItem: async (name: string) => (await get(name)) || null,
        setItem: async (name: string, value: string) => { await set(name, value); },
        removeItem: async (name: string) => { await del(name); },
      })),
    }
  )
);
```

### 5.2 Telemetry Schema, Anonymous Tracking & Offline Buffering
To track student friction and validate pedagogical outcomes without third-party tracking cookies, with explicit support for unauthenticated guest sessions (ARC-03):

```sql
CREATE TABLE IF NOT EXISTS public.telemetry_events (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    session_id TEXT NOT NULL,
    course_id TEXT NOT NULL,
    lecture_slug TEXT NOT NULL,
    concept_id TEXT,
    event_type TEXT NOT NULL, -- 'widget_interaction', 'misconception_triggered', 'hint_requested', 'question_answered'
    event_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    interaction_duration_ms INT NOT NULL DEFAULT 0,
    hesitation_ms INT NOT NULL DEFAULT 0,
    hint_depth INT NOT NULL DEFAULT 0, -- 0 = none, 1 = nudge, 2 = clue, 3 = solution
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.telemetry_events ENABLE ROW LEVEL SECURITY;

-- 1. Authenticated students insert own telemetry
CREATE POLICY "Authenticated users insert telemetry" ON public.telemetry_events
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- 2. Anonymous freemium guest tracking (ARC-03: prevents 403 console errors for unauthenticated visitors)
CREATE POLICY "Anonymous guests insert telemetry" ON public.telemetry_events
    FOR INSERT TO anon WITH CHECK (user_id IS NULL);

-- 3. Read access restricted to the user's own event history
CREATE POLICY "Users read own telemetry" ON public.telemetry_events
    FOR SELECT TO authenticated USING (auth.uid() = user_id);
```

*Client Offline Buffering*: If the client is offline or telemetry network requests fail, events are appended to IndexedDB table `pep_buffered_telemetry` and flushed in batches of 25 upon network reconnection.

---

### 5.3 Biophysical & Pharmacokinetic Mathematical Engines

#### A. Two-Compartment Open IV Bolus Model (`PkDial`)
For lipophilic drugs exhibiting distinct distribution and elimination phases (e.g. Lidocaine):
- Micro-rate constants: $k_{10} = \frac{CL}{V_1}$, $k_{12} = \frac{Q}{V_1}$, $k_{21} = \frac{Q}{V_2}$.
- Hybrid rate constants:
  $$\alpha, \beta = \frac{(k_{10} + k_{12} + k_{21}) \pm \sqrt{(k_{10} + k_{12} + k_{21})^2 - 4 k_{10} k_{21}}}{2} \quad (\alpha > \beta)$$
- Coefficients:
  $$A = \frac{D \cdot (\alpha - k_{21})}{V_1 (\alpha - \beta)}, \quad B = \frac{D \cdot (k_{21} - \beta)}{V_1 (\alpha - \beta)}, \quad C_p(0) = A + B = \frac{D}{V_1}$$
- Exact time course:
  $$C_p(t) = A \cdot e^{-\alpha t} + B \cdot e^{-\beta t}$$
  Resolves the $2.38\times$ early-phase underestimation inherent in naive 1-compartment simulations.

#### B. Oral Absorption Bateman Kinetics & Singularity Handling
For oral dosing with first-order absorption ($k_a$) and elimination ($k_e$):
$$C_p(t) = \frac{F \cdot D \cdot k_a}{V_d (k_a - k_e)} \left( e^{-k_e t} - e^{-k_a t} \right)$$
When $k_a \to k_e$, division by zero is handled analytically via L'Hôpital's rule:
$$\lim_{k_a \to k_e} C_p(t) = \frac{F \cdot D \cdot k_e}{V_d} \cdot t \cdot e^{-k_e t}$$
Implemented with runtime epsilon guard: `if (Math.abs(ka - ke) < 0.0001) return (F * D * ke / Vd) * t * Math.exp(-ke * t);`.

#### C. Henderson-Hasselbalch Amphoteric & Zwitterionic Speciation
For diprotic/zwitterionic drugs (e.g. Ciprofloxacin, $pKa_1 = 6.09, pKa_2 = 8.74$):
$$f_{H_2A^+} = \frac{[H^+]^2}{[H^+]^2 + K_{a1} [H^+] + K_{a1} K_{a2}}$$
$$f_{HA^\pm} = \frac{K_{a1} [H^+]}{[H^+]^2 + K_{a1} [H^+] + K_{a1} K_{a2}} \quad (\mathbf{91.35\%} \text{ at pH 7.4})$$
$$f_{A^-} = \frac{K_{a1} K_{a2}}{[H^+]^2 + K_{a1} [H^+] + K_{a1} K_{a2}}$$
Provides exact speciation for bacterial porin crossing and urinary crystallization prediction.
```

---

## 6. Minimalist ChatGPT Obsidian Squircle Visual Design Standards

### 6.1 Color Palette & Token Specifications
The platform abandons all 4px black borders, harsh 6px drop shadows, and bright cream canvases. The entire design system unifies under the **ChatGPT Obsidian Squircle** palette:

```css
/* Design Tokens: ChatGPT Obsidian Squircle */
:root {
  /* Surfaces & Canvases */
  --bg-canvas: #171717;        /* Obsidian Deep Canvas */
  --bg-panel: #212121;         /* Primary Card / Pane Background */
  --bg-panel-hover: #262626;   /* Subtle Interactive Hover */
  --bg-subtle: #2A2A2A;        /* Inner Wells, Input Fields */

  /* Borders & Dividers */
  --border-subtle: #2F2F2F;    /* Primary 1px Squircle Border */
  --border-focus: #10A37F;     /* Active Focus Highlight */

  /* Semantic Accents */
  --brand-emerald: #10A37F;    /* Primary Brand / Action */
  --brand-emerald-hover: #0E8E6D;
  --status-success: #34D399;   /* Correct Answer / High Retrievability */
  --status-alert: #F87171;     /* Misconception Diagnostic Alert */
  --status-warning: #FBBF24;   /* Tier 2 Hint / Caution */

  /* Course Accents */
  --course-medchem: #60A5FA;   /* Pharmaceutical Chemistry Blue */
  --course-pharm: #FB923C;     /* Pharmacology Coral Orange */

  /* Typography Colors */
  --text-primary: #ECECEC;     /* High Contrast Text */
  --text-secondary: #B4B4B4;   /* Explanatory Body / Metadata */
  --text-tertiary: #737373;    /* Timestamps, Disabled Indicators */
}
```

### 6.2 Geometry, Shadows & Motion Rules
1. **Borders & Radii**:
   - Standard Cards & Modals: `rounded-xl` (12px) or `rounded-2xl` (16px).
   - Border: Exactly `1px solid #2F2F2F`.
   - **Forbidden**: `border-3`, `border-4`, and `#000000` borders are strictly banned.
2. **Shadows**:
   - Zero hard drop shadows (`shadow-neo`).
   - Use soft ambient elevation: `box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.5)`.
3. **Typography**:
   - UI & Body: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`.
   - Molecular SMILES, pKa, Math, Equations: `JetBrains Mono`, `monospace`.
   - Pharmacokinetic & Physical Equations: Formatted natively using KaTeX.
4. **Micro-Motion**:
   - Transitions: 150ms–200ms `ease-out`.
   - No bouncy overshoot animations; animate only `opacity` and `transform: translateY(-2px)`.

### 6.3 Core Workspace Component Specifications

#### A. Workspace Header (`WorkspaceHeader.tsx`)
- Height: 56px, background `#171717`, border bottom `1px solid #2F2F2F`.
- Left: Course selector (`Farmasötik Kimya` ↔ `Farmakoloji`) with active pill indicator.
- Center: Active lecture breadcrumb (`Modül 1: Temel Kavramlar > İlaç Reseptör Etkileşimi`).
- Right:
  - Daily 10 Streak Flame icon (`🔥 5 Gün`).
  - Pomodoro timer squircle badge (`⏱ 24:18`).
  - Study Vault button with cloud sync status pill.
  - User profile avatar with dropdown.

#### B. Lesson & Curriculum Sidebar (`CurriculumSidebar.tsx`)
- Width: 280px (collapsible to 64px icon rail).
- Layout: 22 lessons organized into 6 modules per course.
- Features:
  - Mini circular progress ring on each lesson item showing concept mastery (0%–100%).
  - Vize Exam countdown banner (`📅 Vizeye 18 Gün Kaldı`).
  - "Günün 10 Sorusu" (Daily 10) high-yield quick launcher.

#### C. Main Interactive Stage (`MainInteractiveStage.tsx`)
- Layout: Flexible 2-column or tabbed workspace:
  - **Left / Tab 1**: Lecture Document & Authentic Slide Viewer (`PDFSlideViewer.tsx`). Displays high-resolution slides with bounding-box highlights.
  - **Right / Tab 2**: Interactive Domain Widget (`DynamicWidgetHost.tsx`). Hosts the live domain simulators:
    - *SAR Scaffold Explorer*: Drag-and-drop functional groups (esters vs amides, amine chains) calculating live $\text{LogP}$ and $K_d$.
    - *Henderson-Hasselbalch Ionization Chamber*: Dragging pH slider (1.2 to 8.0) shows Henderson-Hasselbalch Henderson ratio and membrane permeation.
    - *Dose-Response Cockpit*: Shifting full agonist, partial agonist, and irreversible antagonist curves with spare receptor toggles.
    - *3D Molecule Viewer*: Touch-enabled orbital rotation with pharmacophore highlighting.

#### D. Socratic Chat Drawer (`SocraticTutorDrawer.tsx`)
- Width: 380px docked or floating drawer.
- Background: `#212121`, border left `1px solid #2F2F2F`.
- Chat Bubble:
  - Background: `#2A2A2A` (tutor) vs `#10A37F` (student).
  - Header: Verified source badge: `[Slayt 33 Atfı]`.
  - Content: Max 40 words, intuitive phrasing followed by technical term.
  - Interactive Action Pill: `[Bu Slaydı Aç →]` or `[Kimyasal Yapıda Gör →]`.
- Input Bar: Autogrow text area, "Sokratik İpucu İste" button, and fast prompt chips (`"Bu bağ tipi neden tersinirdir?"`, `"Prokain neden daha kararsız?"`).

#### E. Quick Study Dock (`QuickStudyDock.tsx`)
- Position: Floating squircle dock at bottom right.
- Fast Tactile Tools:
  1. *pH-pKa İyonlaşma Hesaplayıcı*: Instant ratio calculator for stomach (pH 1.5) vs blood (pH 7.4) vs urine (pH 5.0–8.0).
  2. *Reçete & İlaç Etkileşim Kontrolü*: CYP450 inducer/inhibitor lookup.
  3. *Anki'ye Ekle*: 1-click card creation from current widget state.

---

### 6.4 Comprehensive Token Migration Bridge Table (Neo-Brutalism → Obsidian Squircle)
To resolve the governance and visual discrepancy between legacy 4px black borders/drop shadows and modern studio workspaces, the following token bridge defines the canonical mapping:

```
+-------------------------------------------------------------------------------------------------------------------------+
|                                        DESIGN TOKEN MIGRATION BRIDGE MATRIX                                             |
+-------------------+-----------------------------------------+-----------------------------------------+-----------------+
| Token Dimension   | Legacy Neo-Brutalist (Deprecated)       | Modern Obsidian Squircle (Target)       | Migration Scope |
+-------------------+-----------------------------------------+-----------------------------------------+-----------------+
| Main Canvas       | #FFF8E7 (Warm Cream / Tan)              | #171717 (Deep Obsidian Canvas)          | Shell, Body     |
| Card / Panel      | #FFFFFF (Pure White)                    | #212121 (Graphite Panel)                | Modals, Cards   |
| Inner Well        | #F4F4F0 (Subtle Cream Gray)             | #2A2A2A (Subtle Well / Input)           | Inputs, Code    |
| Border Width      | 3px or 4px solid                        | 1px solid                               | All components  |
| Border Color      | #000000 (Pure Black)                    | #2F2F2F (Subtle Slate Divider)          | All components  |
| Corner Geometry   | rounded-none (0px) / rounded-sm (4px)   | rounded-xl (12px) / rounded-2xl (16px)  | Squircles       |
| Drop Shadow       | 6px 6px 0px #000000 (Zero-blur hard)    | 0 4px 20px -2px rgba(0, 0, 0, 0.5)      | Soft elevation  |
| Primary Brand     | #FFD93D (Sharp Canary Yellow)           | #10A37F (ChatGPT Emerald / Mint)        | CTAs, Action    |
| Primary Hover     | #F4C430 with 0px sink                   | #0E8E6D with translateY(-1px)           | Buttons         |
| Success Accent    | #6BCB77 (Light Green + Black Border)    | #34D399 (Emerald Green Soft Pill)       | Correct Answers |
| Alert / Trap      | #FF6B9D (Punch Pink + Black Border)     | #F87171 (Warm Rose Squircle Pill)       | Misconceptions  |
| Course A (MedChem)| #4D96FF (Vibrant Cyan Blue)             | #60A5FA (Refined Cornflower Blue)       | Course Badge    |
| Course B (Pharm)  | #FF9F45 (Vibrant Orange)                | #FB923C (Warm Amber Coral)              | Course Badge    |
| Typography Header | Archivo Black / Space Grotesk           | Inter Display (semibold 600)            | Headings        |
| Typography Mono   | JetBrains Mono (black background)       | JetBrains Mono (#ECECEC on #2A2A2A)     | SMILES, pKa     |
+-------------------+-----------------------------------------+-----------------------------------------+-----------------+
```

---

### 6.5 Mobile Responsive Tabbed Layout State Machine (ARC-05)
On viewports $< 768\text{px}$ (smartphones 375px–414px), side-by-side split view causes catastrophic horizontal squishing and layout breaking. The interface collapses into a dedicated **Tabbed State Machine**:

```
+---------------------------------------------------------------------------------+
|  PharmLearn Mobile                [🔥 5] [24:18]   [= Menü]                     |
+---------------------------------------------------------------------------------+
|  ┌── Segmentli Sekme Çubuğu (bg-[#212121] border border-[#2F2F2F] rounded-xl) ┐ │
|  │  [ 📄 Slaytlar ]       [ 🧪 Tuval (Aktif) ]       [ 💬 AI Tutor ]            │ │
|  └───────────────────────────────────────────────────────────────────────────┘ │
|                                                                                 |
|  [Aktif Sekme: Tuval / Simülatör]                                               |
|  - Dokunmatik 3D Molekül / PkDial / SAR Kontrolleri                             |
|  - touch-action: none (Tuval içinde sürükleme gezinmeyi engellemez)             |
|  - Sayfa kaydırma tuval dışındaki alanda touch-action: pan-y olarak çalışır     |
|                                                                                 |
|  ┌── Yüzen Hızlı Aksiyon Butonu (Floating Quick Pill) ────────────────────────┐ │
|  │  [ 💡 Sokratik İpucu İste (💬 AI Tutor Sekmesine Git) ]                    │ │
|  └───────────────────────────────────────────────────────────────────────────┘ │
+---------------------------------------------------------------------------------+
```
- **State Machine Store**: `mobileActiveTab: 'slides' | 'canvas' | 'tutor'` managed in `useStudySessionStore`.
- **Cross-Tab Deep Linking**: When the Socratic Tutor cites a slide (e.g. `[Slayt 14: İyonlaşma]`), clicking the citation pill programmatically transitions `mobileActiveTab = 'slides'` and auto-scrolls to the bounding box.

---

## 7. Phased Execution Roadmap & Verification Gates

```
+---------------------------------------------------------------------------------------------------------+
|                                    6-PHASE EXECUTION ROADMAP                                            |
+-------+---------------------------------------+-----------+---------------------------------------------+
| Phase | Scope & Objective                     | Timeline  | Objective Verification Gate                 |
+-------+---------------------------------------+-----------+---------------------------------------------+
| P1    | Security Hardening & Secret Purge     | Milestone | - Plaintext OpenRouter key completely purged|
|       | - Strip sk-or-v1 from client bundle   | 1         |   from apps/web (0 matches in git grep).    |
|       | - Deploy v2-tutor-service Edge Func   |           | - CI/CD test-prod-bundle regex guard passes.|
|       | - Configure Supabase server secrets   |           | - Edge Function rejects no-JWT requests(401)|
+-------+---------------------------------------+-----------+---------------------------------------------+
| P2    | Routing & Shell Consolidation         | Milestone | - Single universal shell in App.tsx.        |
|       | - Eliminate App.tsx route fork        | 2         | - All 22 lessons load via catalog/sidebar.  |
|       | - Unify under Obsidian Squircle UI    |           | - DualModeMoleculeViewer touch events pass  |
|       | - Fix mobile touch in 3D viewer       |           |   on mobile Brave browser emulation.        |
+-------+---------------------------------------+-----------+---------------------------------------------+
| P3    | Production pgvector Pipeline          | Milestone | - SQL migration applied on Supabase.        |
|       | - Prepend DROP FUNCTION for clean sig | 3         | - Deploy HNSW index (m=16, ef_const=64).    |
|       | - Ingest all 6 MedChem decks          |           | - RPC match_lecture_concepts executes       |
|       | - Connect client RPC with embeddings  |           |   with query_embedding (0 SQL errors).      |
+-------+---------------------------------------+-----------+---------------------------------------------+
| P4    | Socratic AI Tutor & Synthesizer Engine| Milestone | - Edge Function streams Socratic responses. |
|       | - Implement Tier 1/2/3 cascade        | 4         | - Word count <= 40 verified on 100 turns.   |
|       | - Synthesizer with N-gram overlap <15%|           | - Zero server persistence of student uploads|
|       | - Connect slide PDF rendering engine  |           | - FSEK & KVKK client scrubbing validated.   |
+-------+---------------------------------------+-----------+---------------------------------------------+
| P5    | Misconception Memory & FSRS Spaced Rev| Milestone | - Zustand stores persist in IndexedDB.      |
|       | - FSRS-4.5 exact formulation active   | 5         | - Resolves 3.9h premature decay bug.        |
|       | - Two-comp PK & Bateman limit active  |           | - Incorrect answers enqueue review cards.   |
|       | - Anki .apkg export functionality     |           | - Anki export file validates successfully.  |
+-------+---------------------------------------+-----------+---------------------------------------------+
| P6    | End-to-End Verification & Production  | Milestone | - All Vitest unit test suites pass (100%).  |
|       | - Playwright Brave dual-shield tests  | 6         | - Playwright passes on Mobile/Desktop.      |
|       | - Zero localhost in runtime calls     |           | - INTERACTIVE USER CONFIRMATION STOP GATE:  |
|       | - User-confirmed Cloudflare Pages dep |           |   Zero autonomous production deployment!    |
+-------+---------------------------------------+-----------+---------------------------------------------+
```

### Detailed Phase Gates & Threat Mitigations

#### Phase 1 Gate: Security Hardening & Secret Purge
- **Threat**: Client token leakage allowing unauthorized LLM spend and quota depletion.
- **Verification Command**:
  ```bash
  git grep "sk-or-v1" apps/web/
  ```
  Must output `0` matches.
- **Edge Function Verification**:
  Direct `curl` to `https://ibyntbynqkpkkpeoudzv.supabase.co/functions/v1/v2-tutor-service` without `Authorization: Bearer <JWT>` returns HTTP 401.

#### Phase 2 Gate: Routing & Universal Squircle Consolidation
- **Threat**: Breaking backward compatibility or trapping users in unmapped lessons.
- **Verification Program**:
  Automated test suite navigating through all 22 lesson slugs (`mc-mod1-les1` through `pharm-mod6-les2`), asserting that every slug renders valid lesson content and zero fallbacks to `lesson01`.
- **Touch Gesture Verification**:
  Playwright script issuing touch drag events (`page.touchscreen.tap`, `page.touchscreen.move`) on `#molecule-canvas`, asserting non-zero rotation matrices.

#### Phase 3 Gate: Production pgvector & Ingestion Verification
- **Threat**: Stored procedure signature mismatch crashing the client RAG service.
- **Verification Test**:
  Vitest integration test executing `searchLectureSlides(embedding, 'medchem')` with a synthetic 1536-dimensional vector, asserting HTTP 200 and structured array return with valid `slideNumber` and `similarity >= 0.40`.

#### Phase 4 Gate: Socratic Pedagogical Guardrail Verification
- **Threat**: LLM drifting into passive, direct-answer delivery; copyright/privacy exposure.
- **Verification Script**:
  Run 50 automated evaluation prompts against `v2-tutor-service` and `v2-twin-synthesizer`. Assert that:
  - 100% of responses contain $\le 40$ words.
  - 100% of responses end with a guiding question or thought step (when hint level is `nudge` or `clue`).
  - 100% of responses include a verified `[Slayt X]` citation.
  - N-gram overlap test verifies $< 15\%$ 3-gram overlap between student prompt and synthetic output.
  - Zero server persistence of student image/PDF files in Supabase storage buckets.

#### Phase 5 Gate: Spaced Repetition & Daily Habit Verification
- **Threat**: Desynchronization between widget interactions and review cards; premature due dates.
- **Verification**:
  Answer a concept check incorrectly in `ConceptQuizWidget`. Inspect `useReviewQueueStore.getState().cards`, verifying that a card for this concept was enqueued with calibrated stability and scheduled review due date honoring $R(I, S) = R_{\text{target}}$ without same-day decay.

#### Phase 6 Gate: Production Deployment & Zero-Localhost Verification (MANDATORY USER STOP GATE)
- **Non-Negotiable User Confirmation STOP Gate (AGENTS.md Rule 9 & DoD 7)**:
  - **Zero Autonomous Deployment**: Autonomous agents and CI pipelines are **STRICTLY PROHIBITED** from executing `npx wrangler pages deploy` or live database migrations without explicit interactive human user confirmation.
  - Before Phase 6 deployment can be initiated, the orchestrator MUST pause and present the full verification audit report to the human user, requesting direct authorization.
- **Threat**: Localhost fallbacks breaking authentication on physical mobile devices.
- **Verification**:
  Inspect built assets in `apps/web/dist`:
  ```bash
  grep -r "127.0.0.1" apps/web/dist/
  grep -r "localhost" apps/web/dist/
  ```
  Must yield 0 runtime references. Password reset and verification emails point to `https://optimusrufus.com`.

---

*Authored by the Architecture & Blueprint Worker. Certified with Adversarial Remediation Hardening.*
