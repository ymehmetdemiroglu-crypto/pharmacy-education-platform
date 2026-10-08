# PROJECT: Pharmacy Education Platform (PharmLearn)
## Architecture Summary, Feature Inventory, Milestones & Interface Contracts

**Repository Root**: `C:\Users\hp\.gemini\antigravity\worktrees\valiant-raman\redesign_webapp_monetization_strategy`  
**Production Domain**: `https://optimusrufus.com`  
**Backend Provider**: Supabase Cloud (`ibyntbynqkpkkpeoudzv`) + Supabase Edge Functions + OpenRouter AI  
**Deployment Pipeline**: Cloudflare Pages (`apps/web/dist`)  
**Design Paradigm**: Minimalist ChatGPT Obsidian Squircle (`#171717`, `#212121`, `#2F2F2F`, `#10A37F`)

---

## 1. Architecture Summary

### 1.1 Architectural Vision
PharmLearn is an interactive, commercial-grade Socratic learning workspace purpose-built for pharmacy students in their high-stakes 3rd year (covering **Farmasötik Kimya** and **Farmakoloji**). The platform replaces fragmented, passive study habits (memorizing 300+ static slide decks, using isolated text-only Anki cards, or querying generic ChatGPT) with an active, multimodal, tactile study desk.

### 1.2 Tech Stack
- **Web Client**: React 18.3, TypeScript 5.5, Vite 5.4, Tailwind CSS, Ant Design 5 (custom dark squircle tokens).
- **Client State & Cache**: Zustand state machines with IndexedDB persistence (`idb-keyval`), TanStack Query v5.
- **Interactive Science Engines**: 3Dmol / WebGL chemical canvas, SmilesDrawer, KaTeX math rendering, RDKit validated structures. Two-compartment open IV PK model ($C_p(t) = A e^{-\alpha t} + B e^{-\beta t}$), Bateman $k_a \to k_e$ singularity limit, diprotic Henderson-Hasselbalch zwitterion speciation.
- **Backend & Database**: Supabase PostgreSQL 15 with `pgvector` extension (HNSW indexing $m=16, ef_{\text{construction}}=64$), Row-Level Security (RLS for auth and anon), Supabase Storage.
- **Serverless Edge Functions**: Deno TypeScript runtime executing authenticated LLM routing (`v2-tutor-service` as sole authorized gateway, 60 turns/hr rate limiting, Vault secrets), RAG retrieval, and synthetic question generation.
- **AI Routing**: Server-side OpenRouter multi-tier cascade (DeepSeek / Llama 3.3 70B for fast Socratic dialogue, Claude 3.5 Sonnet / GPT-4o for synthetic question generation, deterministic fallback for offline resilience).
- **Spaced Repetition Engine**: Calibrated FSRS-4.5 exact retrievability engine ($R(t, S) = (1 + F \cdot (t / S))^{-w}$, $F = 19/81$, $w_0 \dots w_{16}$, $I = (S / F) (R_{\text{target}}^{-1/w} - 1)$) eliminating the 3.9h premature decay bug; Anki `.apkg` export.

### 1.3 Topology & Communication
```
[Client Web Browser (React 18 + Zustand + IndexedDB)]
         |
         | Authenticated HTTPS / WSS (User Bearer JWT - Zero Plaintext Secrets)
         v
[Supabase Edge Functions (Deno Runtime - Sole Authorized LLM Gateway)]
  ├── v2-tutor-service (OpenRouter Tier 1: DeepSeek / Llama 3.3 70B, 60 turns/hr limit)
  ├── v2-twin-synthesizer (OpenRouter Tier 2: Claude 3.5 Sonnet, N-gram <15% guard)
  └── v2-rag-retriever (OpenAI text-embedding-3-small, 1536 dims)
         |
         | Internal Service Role / Stored Procedure RPCs
         v
[Supabase Database (PostgreSQL + pgvector)]
  ├── lecture_embeddings (HNSW cosine index: m=16, ef_construction=64)
  ├── lecture_concepts (Curated slide facts & misconception rubrics)
  ├── student_concept_mastery (Stability S, Retrievability R, Error tags)
  └── telemetry_events (RLS policies for auth & anon guests, IndexedDB buffer)
```

---

## 2. Feature Inventory

The following catalog indexes all features, capabilities, and remediations identified across the forensic audit, user requirements, and platform roadmap:

| Feature ID | Feature Name | Source / Requirement | Target Milestone | Status | Description |
|---|---|---|:---:|:---:|---|
| **FEAT-SEC-01** | Secret Sanitation & Client Purge | Survey F-06 / AGENTS.md R7 | M1 | Completed | Purged plaintext OpenRouter API key from `tutorService.ts:62`; CI/CD regex bundle scan in `test-prod-bundle.mjs` blocking `sk-or-`. |
| **FEAT-SEC-02** | Authenticated Edge Function Proxy | Survey F-06 / Req R3 | M1 | Completed | Proxied all LLM turns through `v2-tutor-service` with JWT verification, 60 turns/hr rate limit, and Vault key storage. Verified by `tutor.test.ts`. |
| **FEAT-SHELL-01**| Universal Workspace Shell | Survey F-02 / Req R1 | M2 | Completed | Unified Obsidian squircle workspace shell in `App.tsx`, `PharmLearnStudioPage.tsx`, and `PharmLearnShell.tsx` with instant guest exploration mode. |
| **FEAT-SHELL-02**| Dynamic 22-Lesson Loader | Survey F-02 / Req R1 | M2 | Completed | Loaded all 22 lessons dynamically from `curriculum.client.ts` via `DynamicLessonCanvas.tsx` and dropdown menu. |
| **FEAT-WIDGET-01**| Mobile Touch Gestures in 3D Viewer | Survey F-01 / Req R1 | M2 | Completed | Added `onTouchStart`, `onTouchMove`, `onTouchEnd` listeners to `DualModeMoleculeViewer.tsx`. Verified by `DualModeMoleculeViewer.test.tsx`. |
| **FEAT-WIDGET-02**| GPCR Step 4 Challenge Remediation | Survey F-09 / Req R1 | M2 | Completed | Added challenge for step 3 in `ReceptorSignalingVisualizer.tsx` ("Hücresel Yanıt" for Gs, Gi, Gq). Verified by `ReceptorSignalingVisualizer.test.tsx`. |
| **FEAT-WIDGET-03**| Tactile SAR Scaffold Explorer | Survey F-10 / Req R2 | M2 | Completed | Added live substituent selector, QSAR calculations (LogP, potency, permeability), and Socratic tutor dispatch in `SarMatrixWidget.tsx`. |
| **FEAT-RAG-01** | Production pgvector Schema Migration | Survey F-04 / Req R3 | M3 | Completed | Prepared and tested `20261007000000_fix_rag_signature_and_hybrid.sql` with vector similarity, keyword ILIKE, and lecture fallback. |
| **FEAT-RAG-02** | Slide Extraction & Ingestion Pipeline | Survey F-04 / Req R3 | M3 | Completed | Ingested and embedded all 10 MedChem and 10 Pharmacology knowledge nodes with verified provenance in `courses/*/teaching/*.teaching.md`. |
| **FEAT-RAG-03** | Type-Safe Client RPC Execution | Survey F-04 / Req R3 | M3 | Completed | Type-safe hybrid search in `LectureRagService.retrieveRelevantNodes()` with zero-latency client caching and authentic slide citations. |
| **FEAT-RAG-04** | Visual Slide PDF & Bounding Box Overlay | Survey Obs / Req R3 | M3 | Completed | Render authentic slide images with emerald bounding-box overlays on cited mechanisms. |
| **FEAT-TUTOR-01**| Tier 1 Fast Socratic Streaming | Survey F-05 / Req R1 | M4 | Completed | Stream 40-word Socratic turns via authenticated `v2-tutor-service` with 3-tier scaffolding ladders. |
| **FEAT-TUTOR-02**| Abstract Concept Extractor & Synth Gen | Req R2 / Challenger 1 | M4 | Completed | Ephemeral client OCR (0 server persistence), FSEK 5846 / KVKK 6698 compliance in `pastExamService.ts` & `PastExamPracticeModal.tsx`. |
| **FEAT-TUTOR-03**| Tier 3 Deterministic Offline Fallback| Survey F-05 / Req R3 | M4 | Completed | Full Socratic reasoning engine across all 20 MedChem & Pharmacology concepts with slide citations and scaffolding ladders. |
| **FEAT-STUDY-01**| Authenticated Student Notes Vault | Survey F-03 / Req R1 | M4 | Completed | Notes storage in `StudentDocumentVaultModal.tsx` and `studentDocumentService.ts`. |
| **FEAT-STATE-01**| Unified Zustand State Machine | Survey F-07 / Req R3 | M5 | Completed | State machines for study sessions, daily challenges, and review queues. |
| **FEAT-STATE-02**| Persistent Misconception Diagnostic | Req R2 / Original Req | M5 | Completed | Track individual student error traps across sessions in `misconceptionService.ts` and adapt question sequencing. |
| **FEAT-FSRS-01** | Exact FSRS-4.5 Spaced Repetition Engine| Survey F-05 / Challenger 2 | M5 | Completed | Calibrated FSRS-4.5 math (F=19/81, W vector, I calculation) in `FsrsEngine.ts` resolving 3.9h premature decay bug in LeitnerEngine. |
| **FEAT-FSRS-02** | Anki (.apkg/.tsv) Deck Export | Survey Rec / Req R2 | M5 | Completed | 1-click export of student review cards into Anki TSV format in `FsrsEngine.ts` and `DailyChallengeModal.tsx`. |
| **FEAT-HABIT-01**| Daily 10 High-Yield Exam Loop | Req R2 / Original Req | M5 | Completed | Daily 10 active-recall question sequence driving daily active use (DAU) before exams in `dailyHabitService.ts` & `DailyChallengeModal.tsx`. |
| **FEAT-TELE-01** | Telemetry & Hesitation Tracking | Req R3 / Backend Spec| M5 | Completed | Telemetry logging in `realtimeTelemetryService.ts` with anon guest RLS & IndexedDB buffer. |
| **FEAT-E2E-01**  | Brave Dual-Shield Playwright Suite | AGENTS.md R4 / DoD | M6 | Completed | Visual verification across Obsidian workspace, 3D molecule viewer, Daily Challenge modal, and Socratic hints captured in artifacts. |
| **FEAT-DEPLOY-01**| User-Gated Production Deployment | AGENTS.md R9, 11-12 | M6 | Ready for User Gate | Mandatory interactive User Confirmation STOP Gate before Cloudflare Pages deploy (optimusrufus.com); zero localhost. |

---

## 3. Milestones Table

| Milestone ID | Milestone Name | Phase | Dependencies | Status | Verification Gate |
|---|---|:---:|---|:---:|---|
| **M1** | Security Hardening & Secret Purge | Phase 1 | None | Completed | `git grep "sk-or-v1" apps/web/` verified 0 matches; Edge Function returns 401 without valid JWT. |
| **M2** | Universal Workspace Shell & Routing Consolidation | Phase 2 | M1 | Completed | All 22 lessons accessible via UI; 3D viewer touch gestures verified; tactile SAR explorer verified. |
| **M3** | Production pgvector RAG & Slide Ingestion Pipeline | Phase 3 | M1 | Completed | 20 concepts across MedChem and Pharmacology verified, hybrid search RPC defined, `lectureRagService.test.ts` 6/6 green. |
| **M4** | Socratic AI Tutor & Past-Exam Twin Generator | Phase 4 | M2, M3 | Completed | Socratic turns, 3-tier scaffolding ladders, past-exam twin synthesis, `tutorService.test.ts` 6/6 green. |
| **M5** | Misconception Diagnostics & FSRS Spaced Repetition | Phase 5 | M4 | Completed | FSRS-4.5 engine verified; Daily 10 challenge verified; misconception memory verified; Anki export verified (18/18 tests green). |
| **M6** | End-to-End Verification & Cloudflare Deployment | Phase 6 | M1-M5 | Ready for User Gate | 474/474 tests pass (100% green); 0 TS errors; Clean production bundle verified; Interactive User Confirmation STOP Gate presented to user. |


---

## 4. Interface Contracts

### 4.1 Supabase Edge Functions ↔ Web Client

#### A. `v2-tutor-service` (Socratic AI Tutor)
- **Endpoint**: `POST https://<project-ref>.supabase.co/functions/v1/v2-tutor-service`
- **Headers**:
  ```http
  Authorization: Bearer <SUPABASE_USER_JWT>
  Content-Type: application/json
  Accept: text/event-stream
  ```
- **Request Payload**:
  ```json
  {
    "courseId": "medchem",
    "lectureSlug": "ilac-reseptor-etkilesimi",
    "conceptId": "rr:iyonik_bag",
    "currentWidgetType": "DualModeMoleculeViewer",
    "studentMessage": "Bu bağ fizyolojik pH'da neden tersinirdir?",
    "hintLevel": "nudge",
    "recentHistory": [
      { "role": "user", "content": "İyonik bağın kuvveti ne kadardır?" },
      { "role": "assistant", "content": "İyonik bağ 5-10 kcal/mol kuvvetindedir [Slayt 14]." }
    ]
  }
  ```
- **Streaming Response (Server-Sent Events)**:
  ```http
  data: {"type": "token", "token": "İyonik"}
  data: {"type": "token", "token": " bağ"}
  ...
  data: {"type": "citation", "deck": "İlaç Reseptör Etkileşimi.pdf", "slide": 14, "boundingBox": {"x": 120, "y": 340, "w": 400, "h": 220}}
  data: {"type": "action_pill", "label": "Slaydı Aç", "action": "open_slide", "slide": 14}
  data: {"type": "done", "masteryDelta": 0.05}
  ```

#### B. `v2-twin-synthesizer` (Abstract Pharmacological Concept Extractor & Independent Synthetic Socratic Question Generator)
- **Legal & Compliance Boundary**: Strict compliance with Turkish Law on Intellectual and Artistic Works (FSEK No. 5846 Art. 6, 15, 21, 71) and KVKK No. 6698.
  - **100% Client-Side Ephemeral Processing**: OCR (Tesseract.js / WebAssembly) runs strictly in the browser. Zero server persistence of raw student notes, uploads, or images.
  - **Client-Side KVKK Redaction**: Automatic Regex scrubbing of T.C. Kimlik numbers, student names, IDs, dates, and faculty names before payload construction.
  - **Automated N-Gram Overlap Guard**: Automated rejection if 3-gram lexical overlap between synthesized question and client concept inputs exceeds 15% (`lexicalOverlapScore < 0.15`).
  - **Zero University / Faculty Branding**: Output is strictly unbranded, purely synthetic pharmacological pedagogy.
- **Endpoint**: `POST https://<project-ref>.supabase.co/functions/v1/v2-twin-synthesizer`
- **Request Payload (CAPS - Concept Abstraction Payload Schema)**:
  ```json
  {
    "extractedConcepts": [
      { "conceptName": "Aromatic amide bond hydrolysis stability", "chemicalContext": "Lidocaine vs Procaine" },
      { "conceptName": "Voltage-gated sodium channel blocking SAR", "chemicalContext": "Lipophilic aromatic ring + intermediate alkyl chain + tertiary amine" }
    ],
    "targetTopic": "local_anesthetics_sar",
    "courseId": "medchem",
    "bloomLevel": "Application"
  }
  ```
- **Response Payload**:
  ```json
  {
    "synthesizedQuestion": {
      "title": "Bupivakain ve Mepivakain Biyodönüşüm ve SAR Analizi",
      "prompt": "Bupivakain molekülünün amid bağı içerdiği bilinmektedir. Bu yapının prokain gibi ester tipi anesteziklere kıyasla plazmada daha uzun etki süresi göstermesinin temel kimyasal nedeni nedir?",
      "options": [
        { "id": "opt-1", "text": "Amid bağı, psödokolinesteraz enzim hidrolizine ester bağına kıyasla çok daha dirençlidir.", "isCorrect": true },
        { "id": "opt-2", "text": "Amid grubu fizyolojik pH'da tersinir kovalent bağ oluşturarak hidrolizi engeller.", "isCorrect": false, "diagnosedMisconception": "kovalent_anestezik_yanilgisi" }
      ],
      "hintLadder": [
        "Nudge: Ester ve amid bağlarının enzimatik hidroliz hızlarını kıyaslayın.",
        "Clue: Plazma kolinesterazları esterleri saniyeler içinde parçalarken amidleri parçalayamaz.",
        "Solution: Amid bağı psödokolinesteraz hidrolizine dirençlidir; karaciğerde hepatik mikrozomal enzimlerle yavaş metabolize olur [Slayt 33]."
      ],
      "citation": { "deck": "İlaç Reseptör Etkileşimi.pdf", "slide": 33 }
    },
    "lexicalOverlapScore": 0.04
  }
  ```

---

### 4.2 Supabase pgvector RPC Signature

```sql
-- Production HNSW Vector Index (cosine distance)
CREATE INDEX IF NOT EXISTS lecture_chunks_hnsw_idx 
ON public.lecture_chunks 
USING hnsw (embedding vector_cosine_ops) 
WITH (m = 16, ef_construction = 64);

-- Idempotency Guard: Drop previous signatures prior to definition
DROP FUNCTION IF EXISTS public.match_lecture_concepts(vector, double precision, integer);
DROP FUNCTION IF EXISTS public.match_lecture_concepts(extensions.vector, text, text, double precision, integer);

-- Function Signature: match_lecture_concepts
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
);
```

TypeScript Client Invocation Contract:
```typescript
const { data, error } = await supabase.rpc('match_lecture_concepts', {
  query_embedding: vector1536,
  p_course_id: 'medchem',
  p_lecture_slug: 'ilac-reseptor-etkilesimi',
  match_threshold: 0.45,
  match_count: 4,
});
```

---

### 4.3 FSRS-4.5 Spaced Repetition Engine Contract

```typescript
export type FSRSRating = 1 | 2 | 3 | 4; // 1: Again, 2: Hard, 3: Good, 4: Easy
export type FSRSState = 0 | 1 | 2 | 3;  // 0: New, 1: Learning, 2: Review, 3: Relearning

export interface FSRSCard {
  id: string;
  courseId: 'medchem' | 'pharmacology';
  lessonId: string;
  conceptId: string;
  question: string;
  answer: string;
  stability: number;           // S: Memory stability in days
  difficulty: number;          // D: 1.0 to 10.0 scale
  elapsed_days: number;        // Days since last review
  scheduled_days: number;      // Target interval in days
  reps: number;                // Total repetition count
  lapses: number;              // Total forgotten count
  state: FSRSState;
  last_review?: string;        // ISO 8601 timestamp
  due: string;                // ISO 8601 timestamp
}

/**
 * FSRS-4.5 Retrievability Power Decay Equation:
 * R(t, S) = (1 + FACTOR * (t / S))^(-w)
 * where FACTOR = 19 / 81 (~0.2345679) and decay exponent w = 0.5 (or W[16]).
 */
export const FSRS_FACTOR = 19 / 81;
export const FSRS_DECAY = 0.5;
export const TARGET_RETRIEVABILITY = 0.85;

export function calculateRetrievability(card: FSRSCard, now: Date): number {
  if (!card.last_review) return 0;
  const elapsedDays = Math.max(0, (now.getTime() - new Date(card.last_review).getTime()) / (1000 * 60 * 60 * 24));
  return Math.pow(1 + FSRS_FACTOR * (elapsedDays / card.stability), -FSRS_DECAY);
}

/**
 * Next Interval Calculation:
 * I = (S / F) * (R_target^(-1/w) - 1)
 * 
 * Defect Resolution Note:
 * Resolves the premature Leitner decay defect where LeitnerEngine evaluated `dueByDate || (R <= 0.85)`
 * with exponential R(t) = exp(-t/S). With S = 1.0 d, cards matured prematurely at
 * -1.0 * ln(0.85) * 24 h = 3.9 hours. FSRS-4.5 schedules full multi-day intervals (I >= 1.0 d = 24.0 h).
 */
export function calculateNextInterval(stability: number, targetR: number = TARGET_RETRIEVABILITY): number {
  const interval = (stability / FSRS_FACTOR) * (Math.pow(targetR, -1 / FSRS_DECAY) - 1);
  return Math.max(1, Math.round(interval));
}

export function processCardReview(
  card: FSRSCard,
  rating: FSRSRating,
  now: Date
): FSRSCard;
```

---

## 5. Code Layout Conventions

The repository follows a strict monorepo architecture. Code changes must respect file boundaries:

```
/
├── apps/
│   └── web/                                  # Vite + React 18 SPA
│       ├── src/
│       │   ├── components/
│       │   │   ├── layout/                   # Universal shell, header, sidebar, chat drawer
│       │   │   ├── stage/                    # Main interactive stage, PDF slide viewer
│       │   │   ├── widgets/                  # Tactile domain widgets (squircle-styled)
│       │   │   ├── vault/                    # Authenticated student notes vault
│       │   │   └── exam/                     # Past-exam twin generator modal
│       │   ├── stores/                       # Zustand state machines (session, misconception, review)
│       │   ├── services/                     # Supabase Edge Function clients & telemetry
│       │   └── data/                         # curriculum.client.ts (22 lessons)
├── packages/
│   ├── ui/                                   # Shared Obsidian Squircle UI components
│   ├── widgets/                              # Pure mathematical & physiological simulators
│   └── platform/                             # Auth, FSRS spaced repetition, access control
├── supabase/
│   ├── migrations/                           # PostgreSQL schemas, pgvector tables, RLS policies
│   └── functions/                            # Deno Edge Functions (v2-tutor-service, v2-twin-synthesizer)
├── materials/                                # Source PDF lecture slides (verified Marmara ECZ 335)
├── docs/                                     # Architecture, security, and verification artifacts
└── PROJECT.md                                # Root Project Orchestration Index
```

### Invariant Discipline
1. **Zero `.agents/teamwork/` Source Code**: The `.agents/teamwork/` directory is reserved exclusively for agent communication and metadata (`BRIEFING.md`, `progress.md`, `handoff.md`). No production code, tests, or stylesheets may be placed there.
2. **Zero Plaintext Secrets**: Secrets live exclusively in Supabase project environment variables.
3. **Zero Localhost in Client Runtime**: All URLs resolve dynamically via `window.location.origin` with production fallback to `https://optimusrufus.com`.
4. **Minimalist Squircle Standard**: Every new or refactored component must employ `#171717` / `#212121` / `#2F2F2F` / `#10A37F` and `rounded-xl` / `rounded-2xl` geometry.
5. **Mandatory Interactive User Confirmation STOP Gates**: In accordance with the Integrity Mandate, production deployments (`npx wrangler pages deploy`) and remote live database migrations (`supabase db push`) strictly require an interactive user confirmation STOP Gate. Author and worker agents must never bypass this gate autonomously.

---

*Authored by the Architecture & Blueprint Worker. Maintained under the Project Orchestration Pattern.*
