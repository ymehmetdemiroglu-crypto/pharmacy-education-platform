# Forensic Status Quo Audit: Architectural, Pedagogical, and Systems Analysis of PharmLearn

**Document Class**: Platform Engineering & Pedagogical Audit  
**Status**: Authoritative / Final  
**Date**: October 7, 2026  
**Auditor**: Teamwork Audit & Pedagogy Worker (`worker_audit_and_pedagogy`)  
**Target Codebase**: `pharmacy-education-platform` (`apps/web`, `packages/widgets`, `packages/ui`, `packages/platform`, `supabase/`, `courses/`, `/materials`)  
**Associated Baseline Documents**: `AGENTS.md`, `docs/pedagogy-spec.md`, `docs/ui-guidelines.md`

---

## Executive Summary & Forensic Scorecard

An exhaustive forensic audit was conducted across the entire PharmLearn repository to evaluate its technical stability, pedagogical integrity, and operational readiness for third-year pharmacy students (*Farmasötik Kimya* and *Farmakoloji*). 

The audit reveals a platform undergoing an incomplete architectural and paradigm transition:
1. **Curricular Disparity & Ghost Citations**: While Medicinal Chemistry contains 6 authentic lecture decks from Marmara University Faculty of Pharmacy (Prof. Dr. Bedia Kaymakçıoğlu), Pharmacology relies on non-existent "ghost decks" to satisfy schema constraints, violating platform source fidelity rules. Furthermore, catalog navigation links are misaligned with lesson registry keys, trapping students in Lesson 1.
2. **Interactive Widget Degradation & Mobile Gesture Failure**: The flagship 3D molecule viewer lacks touch event handlers entirely (preventing mobile rotation), the GPCR cascade visualizer drops its final challenge, the primary Studio SAR matrix is reduced to a static Ant Design table despite a rich interactive SAR engine existing elsewhere in the repo, and the Whiteboard Tutor downgrades all rich simulators to simple Multiple Choice cards.
3. **Simulated RAG & Plaintext Credential Exposure**: The advertised Supabase `pgvector` semantic retrieval is completely inoperative due to a fatal RPC argument omission, silently falling back to a static 20-node JavaScript array with naive substring matching. A plaintext OpenRouter API key is exposed directly in client source code.
4. **Mocked Notes Vault & Severed Retention Loop**: The Notes Vault contains no file upload or OCR capability, generates fake `https://supabase.local/` URLs, stores notes unencrypted in browser `localStorage`, and returns static hardcoded flashcards regardless of what text the student inputs. Furthermore, modern Studio widgets never enqueue review cards, leaving the Leitner spaced repetition engine permanently empty.

### Forensic Scorecard

| Assessment Domain | Score (/10) | Verified Strengths | Critical Vulnerabilities & Pedagogical Gaps |
| :--- | :---: | :--- | :--- |
| **1. Curriculum Alignment & Materials** | **4.0** | Authentic 6-deck Marmara MedChem source base; 22 compiled lessons in `curriculum.client.ts`. | 4 ghost Pharmacology slide decks; broken Catalog routing looping to Lesson 1; single-lecture hardcoding in Studio. |
| **2. Interactive Widgets & Cognitive Load** | **5.0** | Scientifically accurate Hill and 1-compartment PK equations; 3-tier hint ladders. | Zero mobile touch handlers in 3D viewer; GPCR Step 3 challenge omitted; Whiteboard downgrades widgets to MCQ; static SAR table. |
| **3. AI Tutor & RAG Pipeline** | **3.0** | Socratic system prompts drafted; 40-word cognitive ceiling defined. | Plaintext API key leak; 100% pgvector RPC crash; static 20-node array fallback; deterministic fallback gives direct answers. |
| **4. Notes Vault & Spaced Repetition** | **3.0** | Clean user-facing modal UI; Leitner algorithm authored in `platform`. | Mocked upload; fake `supabase.local` URL; static Procaine/Dibucaine cards; Studio never calls `enqueueReviewCards`. |
| **5. Design System & Visual Hierarchy** | **4.5** | Modern ChatGPT Obsidian squircle theme in Studio (`#212121`, `#10A37F`). | Coexistence with legacy Neo-Brutalist routes (3-4px black borders, hard drop shadows) creating severe cognitive whiplash. |

---

## 1. Curriculum Alignment & Lecture Materials

### 1.1 Authentic vs Phantom Slide Decks
Per **AGENTS.md Non-Negotiable Rule 1 (Source Fidelity)**, every medical/chemical claim, value, structure, mechanism, and equation MUST trace directly to a verified file and page/slide in `/materials`.

The repository contains 8 physical PDF slide decks located in the source repository:
- **Medicinal Chemistry (`materials/medchem/`)** — 6 Authentic Decks:
  1. `Farmasötik ve Medisinal Kimya 1-Giriş.pdf` (23 pages): Ferguson principle, thermodynamic activity ($a = P_t/P_0$), structurally specific vs non-specific agents, homologous series cutoff effect.
  2. `İlaçlarda Yapı Etki İlişkileri-Çözünürlük.pdf` (29 pages): Solubility, partition coefficient (LogP), Henderson-Hasselbalch ionization equilibrium, dielectric constant, absorption barriers.
  3. `Fonksiyonel gruplar.pdf` (36 pages): Chemical nomenclature, functional groups, heterocycles (pyridine, pyrimidine, imidazole, quinoline), electronic and steric effects.
  4. `İlaçlarda  İzomeri.pdf` (43 pages): Geometric and optical isomerism, eutomer/distomer pairs, eudismic ratio, Pfeiffer's rule, Easson-Stedman 3-point attachment hypothesis.
  5. `Biyoizosterizm.pdf` (15 pages): Classical bioisosteres (Grimm hydride displacement law, Erlenmeyer rules), non-classical bioisosteres (carboxylic acid to tetrazole).
  6. `İlaç metabolizması-2026.pdf` (44 pages): Phase I biotransformations (oxidation via CYP450, reduction, hydrolysis), Phase II conjugations (glucuronidation, sulfation, acetylation polymorphisms), enzyme induction/inhibition.
- **Pharmacology (`materials/pharmacology/`)** — Only 2 Decks:
  1. `İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf` (33 pages): Authored by Prof. Dr. Bedia Kaymakçıoğlu (Department of Pharmaceutical Chemistry). Covers receptor types, covalent bonds, ionic bonds, hydrogen bonding, charge-transfer, van der Waals, hydrophobic entropy, and chelation.
  2. `İlaç metabolizması-2026.pdf` (44 pages): Exact bitwise duplicate of the MedChem metabolism deck.

#### The Ghost Deck Infraction
In `courses/pharmacology/course.config.json` and individual lesson JSON manifests, the curriculum references four slide decks that **do not exist anywhere in the repository or on disk**:
- `Farmakodinami-Doz Yanıt.pdf`: Cited in `course.config.json:83` (Module 2) and `courses/pharmacology/lessons/lesson-03.json:37`.
- `Otonom Sinir Sistemi.pdf`: Cited in `course.config.json:199` (Module 4) and `courses/pharmacology/lessons/lesson-07.json`.
- `Kardiyovasküler Sistem.pdf`: Cited in `course.config.json:256` (Module 5) and `courses/pharmacology/lessons/lesson-09.json`.
- `Santral Sinir Sistemi.pdf`: Cited in `course.config.json:314` (Module 6) and `courses/pharmacology/lessons/lesson-11.json`.

```json
// courses/pharmacology/course.config.json:82-84
"sourceDecks": [
  "Farmakodinami-Doz Yanıt.pdf"
]
```
**Forensic Assessment**: The Pharmacology authoring pipeline created dummy source references to bypass automated Zod schema validation (`sources: { file: string, page: number }[]`). The instructional text was synthesized from standard international textbooks (*Katzung*, *Goodman & Gilman*) rather than authentic lecture slides, violating Rule 1. Any student cross-referencing citations with their physical course materials encounters broken, unverifiable sources.

---

### 1.2 Single-Lecture Hardcoding in Studio Workspace
The flagship ChatGPT Obsidian squircle document canvas is locked to a single lecture:
- **File Citations**: `apps/web/src/components/canvas/MarkdownDocumentViewer.tsx:34-50`, `apps/web/src/components/layout/PharmLearnShell.tsx:47, 162-207`.
```tsx
// apps/web/src/components/canvas/MarkdownDocumentViewer.tsx:34-50
<span ...>Farmasötik Kimya 1</span>
<span ...>Ders 01 • Vize Konusu</span>
<span ...>Doğrulanmış Slayt Özeti (33 Slayt)</span>
<h1>İlaç Reseptör Etkileşimi (Kimyasal Bağlar)</h1>
<p>Marmara Üniversitesi Eczacılık Fakültesi — <strong>Prof. Dr. Bedia Kaymakçıoğlu</strong> ders notlarından derlenmiştir.</p>
```
- In `PharmLearnShell.tsx:162-207`, lecture menu items for `medchem-2`, `medchem-3`, and `pharm-1` are explicitly flagged `disabled: true` ("Yakında").
- In `courses/`, only one `.teaching.md` file exists: `courses/medchem/teaching/hafta-01-reseptor-etkilesimleri.teaching.md`.
- **Student Impact**: Even though 22 comprehensive lessons are compiled in `curriculum.client.ts` (representing over 2.3 MB of active-recall content), a student entering the modern Studio workspace cannot access anything beyond Lecture 1.

---

### 1.3 Catalog Routing 1-Based Indexing Mismatch & Silent Fallback
A critical navigation bug exists between the Course Catalog and the Lesson Runner:
- **File Citations**:
  - `apps/web/src/pages/CatalogPage.tsx:194`
  - `apps/web/src/data/lessons.ts:7-11`
  - `apps/web/src/pages/LessonPage.tsx:175-181`

```tsx
// apps/web/src/pages/CatalogPage.tsx:194
<Link
  key={m.id}
  to={`/courses/${course.id}/lessons/${idx * 5 + 1}`}
  ...
>
```
`CatalogPage.tsx` constructs URLs using arithmetic 1-based indices for module start lessons:
- Module 1: `/courses/medchem/lessons/1`
- Module 2: `/courses/medchem/lessons/6`
- Module 3: `/courses/medchem/lessons/11`
- Module 4: `/courses/medchem/lessons/16`
- Module 5: `/courses/medchem/lessons/21`

However, in `apps/web/src/data/lessons.ts`:
```ts
// apps/web/src/data/lessons.ts:7-11
export const lessonsMap: Record<string, LessonData> = {
  ...allClientLessons,
  '1': lesson01,
  'mc-mod1-les1': lesson01,
};
```
`allClientLessons` is keyed by canonical slug IDs (e.g. `mc-mod1-les1`, `mc-mod2-les1`, `pharm-mod1-les1`). The only numeric string key registered is `'1'`.

In `apps/web/src/pages/LessonPage.tsx`:
```tsx
// apps/web/src/pages/LessonPage.tsx:175-181
const lookupKey = lessonsMap[lessonId]
  ? lessonId
  : lessonsMap[`${inferredCourseId}-${lessonId}`]
  ? `${inferredCourseId}-${lessonId}`
  : lessonId;

const lesson: LessonData = lessonsMap[lookupKey] || lesson01;
```
When a student clicks Module 2 (`/courses/medchem/lessons/6`):
1. `lessonId` is `'6'`.
2. `lessonsMap['6']` is `undefined`.
3. `lessonsMap['medchem-6']` is `undefined`.
4. `lessonsMap[lookupKey]` evaluates to `undefined`.
5. The fallback `|| lesson01` triggers silently.
6. The student is served **MedChem Lesson 1** ("İlaç Reseptör Etkileşimi").

When a student clicks Pharmacology Module 1 (`/courses/pharmacology/lessons/1`):
1. `lessonId` is `'1'`.
2. `lessonsMap['1']` resolves to `lesson01` (MedChem Lesson 1).
3. The Pharmacology student is served **Medicinal Chemistry Lesson 1**.

**Student Impact**: 21 out of 22 lessons cannot be accessed from the catalog. The user is perpetually trapped in MedChem Lesson 1, creating total navigation paralysis.

---

## 2. Interactive Widgets: Pedagogical Depth & Cognitive Load

### 2.1 DualModeMoleculeViewer: Touch Gesture Failure & Projection Artifacts
The 3D molecular inspection widget is intended to develop spatial understanding of drug-receptor binding pockets (Dibucaine, Procaine, Lidocaine).
- **File Citation**: `apps/web/src/components/widgets/DualModeMoleculeViewer.tsx:403-406`
```tsx
// apps/web/src/components/widgets/DualModeMoleculeViewer.tsx:403-406
<div
  className="w-full flex flex-col items-center cursor-grab active:cursor-grabbing select-none"
  onMouseDown={handleMouseDown}
  onMouseMove={handleMouseMove}
  onMouseUp={handleMouseUp}
  onMouseLeave={handleMouseUp}
>
  <canvas ref={canvasRef} width={540} height={320} ... />
</div>
```
- **Mobile Touch Handler Absence**: The container attaches exclusively `onMouseDown`, `onMouseMove`, `onMouseUp`, and `onMouseLeave`. It attaches **zero touch handlers** (`onTouchStart`, `onTouchMove`, `onTouchEnd`). On smartphones and tablets, dragging fingers across the canvas does not rotate the molecule; it triggers browser viewport scrolling.
- **Passive Wheel Violation** (`DualModeMoleculeViewer.tsx:395`):
  ```tsx
  onWheel={(e) => {
    e.preventDefault();
    setZoom((z) => Math.min(2.5, Math.max(0.5, z - e.deltaY * 0.001)));
  }}
  ```
  Calling `e.preventDefault()` inside a passive React `onWheel` listener on a standard `<div>` triggers recurring browser console violations (`[Intervention] Unable to preventDefault inside passive event listener`) and causes jittery scrolling.
- **Pseudo-3D Canvas Rendering** (`DualModeMoleculeViewer.tsx:238`): The component header advertises "3D WebGL", but line 238 requests `canvas.getContext('2d')`. The rendering is done via rudimentary CPU software trigonometry (`cosX`, `sinX`, `cosY`, `sinY`) with manual Painter's sorting. It lacks lighting models, depth testing, molecular surface representations, and PDB/SMILES parsers.
- **Static 2D Polygons** (`DualModeMoleculeViewer.tsx:81-96, 131-145`): The 2D mode renders hand-coded SVG polygons for only 3 molecules. It cannot render arbitrary SMILES or user-modified derivatives.

---

### 2.2 ReceptorSignalingVisualizer: Omission of Final Step Challenge
The GPCR signaling widget illustrates the heterotrimeric G-protein cascade across Gs, Gi, and Gq pathways.
- **File Citation**: `apps/web/src/components/widgets/ReceptorSignalingVisualizer.tsx:75-147, 418`
```tsx
// apps/web/src/components/widgets/ReceptorSignalingVisualizer.tsx:75-147
const STEP_CHALLENGES: Record<number, Record<GProteinType, StepChallenge>> = {
  0: { Gs: {...}, Gi: {...}, Gq: {...} }, // Step 1: Ligand Binding
  1: { Gs: {...}, Gi: {...}, Gq: {...} }, // Step 2: G-Protein Activation & GDP/GTP exchange
  2: { Gs: {...}, Gi: {...}, Gq: {...} }, // Step 3: Effector Enzyme Activation
  // KEY 3 IS COMPLETELY MISSING!
};
```
In line 418:
```tsx
// apps/web/src/components/widgets/ReceptorSignalingVisualizer.tsx:418
{challenge && currentStep < 3 && (
  <div className="flex flex-col gap-3 p-4 rounded-xl ...">
    {challenge.prompt}
    ...
  </div>
)}
```
- **Pedagogical Failure**: At Step 4 ("Hücresel Yanıt" / Cellular Response, step index `3`), which represents the culmination of the entire signaling cascade (PKA phosphorylation, Ca²⁺ release, contraction/relaxation), the challenge is omitted from `STEP_CHALLENGES`. Furthermore, the guard `currentStep < 3` causes the interactive predict-then-reveal challenge card to abruptly unmount. The student transitions from active retrieval into passive viewing precisely at the most clinically relevant step.
- **Non-Tactile Diagram**: The SVG diagram (lines 296–396) is purely decorative. Students cannot drag the agonist into the orthosteric binding site, toggle GDP/GTP exchange, or manipulate the downstream ion channels. Interaction is limited to clicking numeric step pills below the graphic.

---

### 2.3 SarMatrixWidget vs SarExplorer: Duplication & Shallow Table Reality
Structure-Activity Relationship (SAR) analysis is the core competency of third-year medicinal chemistry.
- **File Citations**:
  - `apps/web/src/components/widgets/SarMatrixWidget.tsx:15-82`
  - `packages/widgets/src/SarExplorer/SarExplorer.tsx:99-116, 197`
- **Studio SAR Implementation (`SarMatrixWidget.tsx`)**:
  Renders an Ant Design `<Table>` displaying 3 static rows for ester vs amide stability and 3 static rows for amino group ionization. The interaction is limited to expanding table rows to read static text. The student cannot modify substituents, substitute bioisosteres, or observe changes in affinity.
- **Unused Core Engine (`SarExplorer.tsx`)**:
  In `packages/widgets`, a fully functional interactive SAR simulator already exists. It models a multi-substituent core with live mathematical recalculation of:
  $$\text{LogP} = \text{LogP}_{\text{core}} + \sum \pi_R$$
  $$\text{pKa} = \text{pKa}_{\text{base}} - \sum \sigma_R$$
  $$K_d = 10^{-\text{p}K_d}$$
  However, this dynamic widget is styled in legacy Neo-Brutalist tokens (`border-3 border-black`, `shadow-neo`, `#FFD93D`) and is completely excluded from the primary Studio workspace.

---

### 2.4 WhiteboardTutorPage: Binary Ternary Degrading Rich Simulators
The AI Whiteboard Tutor (`/tutor/:lectureSlug`) was designed to provide interactive multimodal teaching.
- **File Citation**: `apps/web/src/pages/WhiteboardTutorPage.tsx:219-235`
```tsx
// apps/web/src/pages/WhiteboardTutorPage.tsx:219-235
<div key={`${concept.id}-${widgetKey}`} className="touch-manipulation" data-testid="widget-host">
  {concept.widget?.type === 'PredictThenReveal' ? (
    <PredictThenReveal
      config={config as never}
      {...widgetCommon}
      onAttempt={(id: string) => {
        selected.current = [id];
      }}
    />
  ) : (
    <MultipleChoice
      config={config as never}
      {...widgetCommon}
      onAttempt={(ids: string[]) => {
        selected.current = ids;
      }}
    />
  )}
</div>
```
- Line 92 explicit developer comment:
  ```tsx
  // HIGHLIGHT_ATOM / PULSE_SUBSTRUCTURE: no atom-level widget in this lecture; SHOW_SLIDE_CITATION: always visible
  ```
- **Pedagogical Failure**: Despite having over 10 specialized interactive widgets in the repository (`DoseResponseCurve`, `PkSimulator`, `IonizationEquilibriumSlider`, `SarExplorer`, `ReceptorLigandMatcher`), `WhiteboardTutorPage` evaluates a rigid binary condition: if the widget is not explicitly `PredictThenReveal`, it renders `MultipleChoice`. Every complex simulation step is degraded into a multiple-choice quiz, reducing the "AI Whiteboard" to a simple web quiz.

---

### 2.5 Pharmacokinetic Curve & Dose-Response Model Evaluation
- **File Citations**:
  - `apps/web/src/components/widgets/PkCurveWidget.tsx:20-65, 207`
  - `packages/widgets/src/PkSimulator/PkSimulator.tsx:1-403`
  - `packages/widgets/src/DoseResponseCurve/DoseResponseCurve.tsx:1-250`
- **PkCurveWidget.tsx**:
  Implements a standard 1-compartment Bateman function:
  $$C(t) = \frac{F \cdot D \cdot k_a}{V_d (k_a - k_e)} \left( e^{-k_e t} - e^{-k_a t} \right)$$
  - *Pedagogical Deficit*: It is strictly single-dose. Third-year pharmacy exams prioritize **multiple dosing kinetics**: accumulation ratio ($R = 1 / (1 - e^{-k_e \tau})$), steady-state fluctuations ($C_{ss,\max}$ and $C_{ss,\min}$), dosing intervals ($\tau$), and loading doses ($D_L = C_{ss} \cdot V_d$). `PkCurveWidget` cannot illustrate steady-state accumulation.
  - *Disjoint Implementation*: In `packages/widgets/PkSimulator`, a multi-dose steady-state simulation engine with IV bolus, oral dosing, and renal clearance toggles is fully implemented, but once again locked inside legacy routes and absent from Studio.

---

## 3. Socratic AI Tutor & OpenRouter RAG Fidelity

### 3.1 Architectural Bifurcation
The platform operates two independent, conflicting AI tutoring subsystems:

```
+----------------------------------------------------------------------------------------------------+
|                                    TUTOR ARCHITECTURAL SPLIT                                       |
+------------------------------------+---------------------------------------------------------------+
| Feature Dimension                  | System A: Whiteboard Stepper   | System B: Studio Chat        |
+------------------------------------+--------------------------------+------------------------------+
| Route                              | /tutor/:lectureSlug            | /studio, /                   |
| Source File                        | WhiteboardTutorPage.tsx        | TutorChatPane.tsx            |
| Execution Runtime                  | Supabase Edge Function         | Direct Browser Client Fetch  |
| Freeform Text Input                | NO (Radio buttons & stepper)   | YES (Chat prompt box)        |
| Telemetry & Mastery Persistence    | Writes to student_concept_     | ZERO persistence (ephemeral  |
|                                    | mastery table via service role | in-memory useState array)    |
| API Key Exposure                   | Backend environment variable   | Plaintext key in client code |
+------------------------------------+--------------------------------+------------------------------+
```

---

### 3.2 Plaintext API Secret Exposure in Client Frontend & CI/CD Guard Gap
Per **AGENTS.md Non-Negotiable Rule 7 (Zero Secrets in Repo)**:
- **File Citation**: `apps/web/src/services/tutorService.ts:58-63`
```typescript
// apps/web/src/services/tutorService.ts:58-63
const openRouterKey =
  apiKey ||
  (typeof window !== 'undefined' ? localStorage.getItem('pep_openrouter_key') || '' : '') ||
  (import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined) ||
  'sk-or-v1-REDACTED_DEV_KEY_DO_NOT_COMMIT';
```
- **Severity**: **P0 Critical Security Blocker**.
- **Production Asset Compilation**: When compiling the production web client via `pnpm --filter @pharmacy/web build`, the plaintext key is compiled directly into browser-accessible assets:
  ```javascript
  // apps/web/dist/assets/PharmLearnStudioPage-DIciigZ-.js:380
  ...d=a||typeof window<"u"&&localStorage.getItem("pep_openrouter_key")||""||"sk-or-v1-REDACTED_DEV_KEY_DO_NOT_COMMIT";
  ```
  Any client inspecting network requests or running regex scans over production JavaScript can extract this key, draining the platform owner's balance.
- **CI/CD Release Guard Blind Spot**: In `scripts/test-prod-bundle.mjs:39-56`, `FORBIDDEN_TOKENS` checks for `service_role`, `whsec_`, `dodo_live_`, `dodo_test_`, and `-----BEGIN PRIVATE KEY-----`, but completely omits `sk-or-v1` and OpenRouter API key patterns. The bundle verification exited with code 0 ("All 202 production bundle files are 100% clean") despite distributing a live secret.
- **Missing Serverless Gateway**: Furthermore, while the architecture specifications cite `supabase/functions/v2-tutor-service`, this directory does not exist on disk. `TutorChatPane.tsx` relies exclusively on the direct, unauthenticated client browser fetch in `tutorService.ts:103`, with zero Supabase JWT authentication and zero per-user rate limiting.

---

### 3.3 Fatal Parameter Mismatch in pgvector RPC Retrieval
The platform advertises a Supabase `pgvector` semantic retrieval engine over lecture slides.
- **File Citations**:
  - `apps/web/src/services/lectureRagService.ts:236-241`
  - `supabase/migrations/20261004000000_init_whiteboard_rag.sql:35-41`

In the database migration:
```sql
-- supabase/migrations/20261004000000_init_whiteboard_rag.sql:35-41
CREATE OR REPLACE FUNCTION public.match_lecture_concepts(
    query_embedding extensions.vector(1536),
    p_course_id TEXT,
    p_lecture_slug TEXT DEFAULT NULL,
    match_threshold FLOAT DEFAULT 0.5,
    match_count INT DEFAULT 3
)
```
In the client service:
```typescript
// apps/web/src/services/lectureRagService.ts:236-241
const { data, error } = await client.rpc('match_lecture_concepts', {
  p_course_id: targetCourse === 'all' ? 'medchem' : targetCourse,
  p_lecture_slug: targetCourse === 'pharmacology' ? 'farmakoloji-temelleri' : 'ilac-reseptor-etkilesimi',
  match_threshold: 0.5,
  match_count: limit,
});
```
- **Root Cause**: The PostgreSQL stored procedure requires `query_embedding` as its **first positional argument** without a default value. The TypeScript client completely omits `query_embedding`.
- **Result**: Every call to `client.rpc('match_lecture_concepts')` fails immediately with a PostgREST schema mismatch error (`42883: function public.match_lecture_concepts(...) does not exist or parameter mismatch`).
- In `lectureRagService.ts:257-259`: The exception is silently caught in an empty `catch {}` block.
- **Database Status**: Migration `20261004000000_init_whiteboard_rag.sql` line 25 sets `embedding` to `NULL`. The curriculum ingestion script (`scripts/ingest-teaching-md.mjs`) never generates vector embeddings. Even if the RPC signature were valid, the `embedding IS NOT NULL` SQL filter would return zero rows.

---

### 3.4 Fallback to 20-Node Static Array with Substring Matching
Because the vector RPC crashes 100% of the time, retrieval defaults entirely to an in-memory fallback:
- **File Citation**: `apps/web/src/services/lectureRagService.ts:15-217, 267-285`
- Consists of a static array `ATOMIC_KNOWLEDGE_NODES` containing exactly **10 MedChem nodes** and **10 Pharmacology nodes**.
- Scoring logic:
```typescript
// apps/web/src/services/lectureRagService.ts:267-270
if (node.title.toLowerCase().includes(q)) score += 10;
if (node.summary.toLowerCase().includes(q)) score += 6;
if (node.contentMarkdown.toLowerCase().includes(q)) score += 4;
```
- **Pedagogical Failure**: There is zero semantic search, zero cosine similarity, and zero contextual comprehension. If a student asks a clinical case question, uses English terminology, or phrases a query without the exact Turkish substrings in those 20 nodes, retrieval returns zero relevant context.

---

### 3.5 Breakdown of Socratic Pedagogy in Offline Fallback
When OpenRouter models fail, timeout, or run in test environments, `tutorService.ts` executes `generateDeterministicTutorReply` (lines 168–395).
Although the system prompt mandates Socratic guided inquiry, the offline engine provides **verbatim declarative answers**:
- **Line 183 (Gq / PLC / IP3 / DAG)**:  
  *"Gq kenetli reseptör uyarımında hedef enzim Fosfolipaz C'dir (PLC) [Slayt 6]. PLC, membran fosfolipiti PIP2'yi parçalayarak iki kritik ikincil haberci üretir: IP3 endoplazmik retikulumdan Ca²⁺ salınımını tetikler; DAG ise membran yüzeyinde Protein Kinaz C'yi (PKC) aktive eder. Bu yolda cAMP üretilmez!"*
- **Line 203 (Gs / Gi / cAMP)**:  
  *"Gs proteini adenilat siklazı uyararak cAMP artışı ve PKA aktivasyonu sağlar; Gi proteini ise adenilat siklazı inhibe ederek hücre içi cAMP düzeyini baskılar [Slayt 6]."*
- **Line 266 (Beta-Lactam vs Organophosphate)**:  
  *"Organofosfatlar asetilkolin esterazın serinini FOSFORİLLER [Slayt 12]; beta-laktam antibiyotikler ise transpeptidaz serinini AÇİLLER [Slayt 11]."*
- **Line 287 (Hydrophobic Interactions & Entropy)**:  
  *"Hidrofobik etkileşimin enerjisi oluşan bir kimyasal bağdan DEĞİL; apolar gruplar yaklaşırken sıkışmış su moleküllerinin serbest kalarak sistemin ENTROPİSİNİ artırmasından (ΔS > 0) gelir [Slayt 25]!"*

In 8 out of 9 domain topics, the tutor acts as an encyclopedic fact dispenser rather than a Socratic mentor, eliminating desirable difficulties and fostering passive memorization.

---

### 3.6 Slide Citation Disconnect
- **File Citations**: `apps/web/src/components/tutor/TutorMessageBubble.tsx:68-84`, `apps/web/src/components/layout/PharmLearnShell.tsx:88-123`
- Tutor replies render citation tags (e.g. `[Slayt 6 →]`).
- Clicking the tag invokes `handleNavigateToSlide`, which checks a static dictionary `slideToConceptMap` and executes `document.getElementById('concept-1')?.scrollIntoView()`.
- **UX Reality**: The platform never renders the actual lecture slide, diagram, or molecular structure. It merely scrolls the browser window down the synthetic markdown document. Students cannot see the professor's original slides or molecular graphics.

---

## 4. Notes Vault & Document Workflows

### 4.1 Mocked Document Ingestion & Fake Storage URLs
The "Kişisel Not Kasası" (Student Document Vault) is presented to students as a secure, encrypted personal study repository.
- **File Citations**:
  - `apps/web/src/components/vault/StudentDocumentVaultModal.tsx:346-391`
  - `apps/web/src/services/studentDocumentService.ts:36, 180-190`
- **Modal Form Reality**: There is no `<input type="file" accept=".pdf,...">` element. The student must manually enter a text title and paste raw text into a textarea.
- **Fabricated Cloud Storage**:
```typescript
// apps/web/src/services/studentDocumentService.ts:186
storageUrl = `https://supabase.local/storage/v1/object/public/student-documents/${id}_${payload.fileName}`;
```
The service constructs a mock URL pointing to `https://supabase.local/`. No file upload occurs.
- **Ephemeral LocalStorage**: Documents are stored in `window.localStorage['pharmlearn_student_documents_v1']`. If a student clears their cache, switches to incognito mode, or changes devices, all uploaded notes are permanently deleted.
- **Misleading Security Badge**: `StudentDocumentVaultModal.tsx:148` displays a lock icon asserting: *"Kişisel & Şifreli Alan: Yüklediğiniz notlar yalnızca size özeldir ve Supabase Storage alanınızda güvenle saklanır."* In reality, no encryption exists, and data never leaves local storage.

---

### 4.2 Simulated AI Study Guide Synthesis
- **File Citation**: `apps/web/src/services/studentDocumentService.ts:242-309`
```typescript
// apps/web/src/services/studentDocumentService.ts:242-245
public generateStudyGuideForDocument(
  doc: StudentDocument,
  rawContent?: string
): SynthesizedStudyGuide {
  const isMedChem = doc.courseId === 'medchem';
  if (isMedChem) {
    return {
      documentId: doc.id,
      summaryTitle: `${doc.fileName.replace(/\.[^/.]+$/, '')} — Sokratik Vize Notu`,
      courseId: doc.courseId,
      overview: 'Yüklenen ders notundan çıkarılan moleküler bağlanma modelleri...',
      keyPoints: [ ... ], // Hardcoded Procaine vs Dibucaine!
      cards: [
        {
          id: `card-${doc.id}-1`,
          conceptTitle: 'Lokal Anesteziklerde Ester vs Amit Stabilitesi',
          question: 'Prokain kanda dakikalar içinde etkisini kaybederken, Dibukain neden saatlerce stabil kalır?',
          answer: 'Prokain ester bağı taşır...',
        }
      ]
    };
  }
  return {
    // Hardcoded Potency vs Efficacy cards!
  };
}
```
- **Critical Finding**: The method parameter `rawContent` is **completely unused**. Whether a student pastes lecture notes on penicillins, oncology agents, or cardiovascular drugs, the service returns identical, pre-baked flashcards on Procaine vs Dibucaine or Potency vs Efficacy. The AI Study Guide generator is entirely simulated.

---

### 4.3 Severed Spaced Repetition Loop & The 3.9-Hour Premature Decay Bug
- **File Citations**:
  - `apps/web/src/pages/LessonPage.tsx:24, 311`
  - `apps/web/src/pages/ReviewPage.tsx:28`
  - `packages/platform/src/spaced_repetition/LeitnerEngine.ts:11-19, 58-61, 110-114`
- Grep analysis across `apps/web/src` reveals that `enqueueReviewCards` is called **exclusively in `LessonPage.tsx:311`**:
```typescript
// apps/web/src/pages/LessonPage.tsx:311
const updatedCards = enqueueReviewCards(existingCards, lesson.spacedReviewCards, new Date());
```
- Modern Studio components (`ConceptQuizWidget`, `ReceptorSignalingVisualizer`, `DualModeMoleculeViewer`, `PastExamPracticeModal`, `StudentDocumentVaultModal`) **never call `enqueueReviewCards`**.
- When a student completes activities in the Studio workspace and navigates to `/review`, `ReviewPage.tsx:28` calculates `dueCards = getDueReviewCards(cards)`. Because `cards` is an empty array `[]`, the student is greeted by an empty state screen.
- **The 3.9-Hour Premature Decay Bug**: Even when cards are enqueued, `LeitnerEngine.ts` contains a mathematical flaw in stability and retrievability calculation. Lines 11–13 define `BOX_DEFAULT_STABILITY = { 1: 1.0, 2: 3.0, 3: 7.0, 4: 21.0, 5: 60.0 }`, where stability $S$ is set equal to the calendar interval in days. Line 26 defines `RETRIEVABILITY_DUE_THRESHOLD = 0.85` and line 28 calculates $R(t) = e^{-t / S}$.
  In `getDueReviewCards`:
  ```typescript
  const dueByDate = new Date(card.nextReviewDue).getTime() <= currentTimestamp;
  const dueByDecay = calculateCardRetrievability(card, now) <= retrievabilityThreshold;
  return dueByDate || dueByDecay;
  ```
  Retrievability drops below $0.85$ when $t = -S \ln(0.85) \approx 0.16252 \times S$.
  For Box 1 ($S = 1.0$ day, 24 hours): $t = 0.16252 \times 24\text{ h} = \mathbf{3.9\text{ hours}}$.
  Because `dueByDecay` is checked via logical OR (`||`), cards scheduled for tomorrow morning decay below 0.85 in just 3.9 hours and resurface on the exact same day, completely destroying the spaced repetition schedule and overloading students with premature reviews.

---

### 4.4 Past-Exam De-Identification Failures & Legal Exposure (FSEK & KVKK)
- **File Citations**:
  - `apps/web/src/services/pastExamService.ts:76, 121, 166, 211`
  - `apps/web/src/components/exam/PastExamPracticeModal.tsx`
- **Explicit Faculty Exam Provenance in Source Code**:
  `pastExamService.ts` contains hardcoded metadata claiming direct provenance from Turkish university exams:
  - Line 76: `facultyOrigin: 'Marmara Eczacılık 2023 Vizesi İkizi'`
  - Line 121: `facultyOrigin: 'Hacettepe Eczacılık 2024 Vizesi İkizi'`
  - Line 166: `facultyOrigin: 'İstanbul Eczacılık 2023 Vizesi İkizi'`
  - Line 211: `facultyOrigin: 'Anadolu Eczacılık 2024 Vizesi İkizi'`
- **Turkish FSEK No. 5846 Copyright Exposure**:
  Under the Turkish Law on Intellectual and Artistic Works (FSEK No. 5846), exam questions authored by academic faculty are protected intellectual creations. Turkish law recognizes **zero DMCA-style safe harbors**. Stripping a professor's name while deriving questions without authorization creates liabilities under:
  - Art. 6 & Art. 21: Unauthorized derivative adaptations (*izinsiz işleme ve çoğaltma*).
  - Art. 15 & Art. 71/1-1: Moral rights violation (*adın belirtilmesi salahiyetinin ihlali*).
- **KVKK No. 6698 Privacy & PII Leakage**:
  Adversarial testing of the regex de-identification scrubber revealed that:
  - Non-whitelisted university names (e.g. "Sağlık Bilimleri Üniversitesi") were not scrubbed.
  - Abbreviated faculty titles (e.g. "Prof. Dr. B. Kaymakçıoğlu") bypassed the title regex.
  - 11-digit T.C. Kimlik numbers (`\b[1-9]\d{10}\b`), student names, and student numbers were not scrubbed.
  Transmitting unscrubbed student exam photos or OCR text containing biometric handwriting and Turkish national IDs to external LLMs (OpenRouter in the US) constitutes a direct violation of KVKK Art. 9 (illegal cross-border personal data transfer) and KVKK Art. 5/6.

---

### 4.5 Mathematical & Biophysical Deficiencies in Pharmacokinetics & Ionization
- **File Citations**:
  - `apps/web/src/components/widgets/PkCurveWidget.tsx:24`
  - `packages/widgets/src/types.ts:36-49`
  - `docs/daily-study-habit-engine.md:530-535`
- **Bateman Function Singularity at $k_a = k_e$**:
  In `PkCurveWidget.tsx:24`:
  ```typescript
  const factor = (F * dose * ka) / (Math.max(0.1, Vd) * (ka - ke));
  ```
  When absorption rate equals elimination rate ($k_a = k_e$, e.g. sustained release formulations where $k_a = 1.8, k_e = 1.8$), $(k_a - k_e) = 0$, producing division by zero (`Infinity` and `NaN`), crashing canvas rendering. The analytical limit requires L'Hôpital evaluation: $\lim_{k_a \to k_e} C_p(t) = \frac{F \cdot D \cdot k_e}{V_d} \cdot t \cdot e^{-k_e t}$.
- **Two-Compartment Pharmacokinetic Omission**:
  `PkCurveWidget` models drugs solely using 1-compartment IV bolus equations. In reality, lipophilic drugs like Lidocaine follow a **two-compartment open model**:
  $$C_p(t) = A \cdot e^{-\alpha t} + B \cdot e^{-\beta t}$$
  Empirical benchmarking reveals that at $t = 0.1\text{ h}$, a 1-compartment model underestimates Lidocaine plasma concentration by **$2.38\times$** ($0.915\text{ mg/L}$ vs $2.174\text{ mg/L}$), severely misleading students on acute toxicity thresholds.
- **Monoprotic Henderson-Hasselbalch Ionization vs Zwitterions**:
  `calculateIonizationFractions(pH, pKa, drugType)` only supports `'weak_acid' | 'weak_base' | 'neutral'`. For amphoteric/zwitterionic fluoroquinolones like Ciprofloxacin ($pKa_1 = 6.09, pKa_2 = 8.74$), at physiological pH 7.4 the true speciation is:
  - Cation $[H_2A^+]$: $4.47\%$
  - Zwitterion $[HA^\pm]$: $\mathbf{91.35\%}$
  - Anion $[A^-]$: $4.18\%$
  Treating Ciprofloxacin as monoprotic fails to compute the dominant zwitterionic species that governs bacterial membrane porin permeation.

---

## 5. Comprehensive Friction Matrix (10 Cataloged Points)

The following matrix documents the 10 most critical bottlenecks impacting the student journey, evaluated against platform integrity and pedagogical standards:

| ID | Bottleneck Name | User Journey Stage | Observed Student Impact | Technical & Pedagogical Root Cause | Exact File & Line Citations | Severity |
| :---: | :--- | :--- | :--- | :--- | :--- | :---: |
| **F-01** | **Mobile Touch Failure in 3D Molecule Viewer** | Core Lesson Study / Molecule Inspection | Smartphone & tablet students cannot rotate 3D structures. Dragging gestures cause unwanted page scrolling. | Canvas interaction is bound strictly to `onMouseDown`/`MouseMove`; `onTouch*` listeners are completely omitted. | `apps/web/src/components/widgets/DualModeMoleculeViewer.tsx:403-406` | **P0** |
| **F-02** | **Broken Catalog Routing Trapping in Lesson 1** | Course Discovery & Navigation | Clicking any module link outside Lesson 1 redirects back to MedChem Lesson 1. 21 of 22 lessons unreachable. | `CatalogPage` uses 1-based index stepping (`idx * 5 + 1`) while `lessonsMap` keys use slugs; unhandled fallback defaults to `lesson01`. | `apps/web/src/pages/CatalogPage.tsx:194`, `apps/web/src/pages/LessonPage.tsx:181`, `apps/web/src/data/lessons.ts:7-11` | **P0** |
| **F-03** | **Plaintext OpenRouter API Key Leaked in Client** | Application Initialization | Security vulnerability: Production web bundle exposes live OpenRouter credentials to public inspection. | Fallback key literal `'sk-or-v1-...'` hardcoded in frontend service instead of proxying through backend Edge Functions. | `apps/web/src/services/tutorService.ts:62` | **P0** |
| **F-04** | **100% Failure Rate in pgvector Semantic RAG** | Socratic AI Tutoring | Vector slide search fails on every turn, silently falling back to a static 20-node array with keyword matching. | Client `client.rpc` call omits mandatory first parameter `query_embedding extensions.vector(1536)`. | `apps/web/src/services/lectureRagService.ts:236-241`, `supabase/migrations/20261004000000_init_whiteboard_rag.sql:35-41` | **P0** |
| **F-05** | **Simulated Study Guide & Static Notes Cards** | Notes Vault & Exam Preparation | Uploading any document returns static Procaine/Dibucaine cards. Notes are stored unencrypted in `localStorage`. | `generateStudyGuideForDocument` ignores `rawContent`; service fabricates `https://supabase.local/` URLs. | `apps/web/src/services/studentDocumentService.ts:186, 242-309`, `StudentDocumentVaultModal.tsx:346-391` | **P1** |
| **F-06** | **Severed Spaced Repetition Retention Loop** | Daily Study & Memory Review | Practicing inside the modern Studio workspace produces 0 review cards. The `/review` queue stays permanently empty. | `enqueueReviewCards` is only triggered in legacy `LessonPage.tsx`; Studio widgets never enqueue review items. | `apps/web/src/pages/LessonPage.tsx:311`, `apps/web/src/pages/ReviewPage.tsx:28` | **P1** |
| **F-07** | **Phantom Slide Decks in Pharmacology** | Syllabus & Provenance Verification | Students cannot verify pharmacology claims against physical lecture decks. Citations reference non-existent files. | 4 placeholder PDF filenames inserted in curriculum config without physical source slide files. | `courses/pharmacology/course.config.json:83, 199, 256, 314`, `lessons/lesson-03.json:37` | **P1** |
| **F-08** | **Whiteboard Tutor Widget Downgrade to MCQ** | Interactive Tutoring | Complex simulation steps are downgraded to simple multiple-choice quizzes, losing interactive tactile value. | `WhiteboardTutorPage` evaluates a binary condition: if not `PredictThenReveal`, it renders `MultipleChoice`. | `apps/web/src/pages/WhiteboardTutorPage.tsx:219-235` | **P1** |
| **F-09** | **Abrupt Disappearance of GPCR Final Challenge** | Interactive Simulation | Step 4 of the GPCR signaling cascade ("Hücresel Yanıt") abruptly unmounts the challenge question. | `STEP_CHALLENGES` omits key `3`, and line 418 enforces `currentStep < 3`, terminating retrieval prematurely. | `apps/web/src/components/widgets/ReceptorSignalingVisualizer.tsx:75-147, 418` | **P1** |
| **F-10** | **Shallow Static SAR Table in Studio Canvas** | Medicinal Chemistry Study | Students passively read an Ant Design table instead of interactively swapping substituents to observe LogP/affinity shifts. | Studio uses static `SarMatrixWidget` rather than adapting dynamic `SarExplorer` from `packages/widgets`. | `apps/web/src/components/widgets/SarMatrixWidget.tsx:15-82`, `packages/widgets/src/SarExplorer/SarExplorer.tsx:99-116` | **P1** |

---

## 6. Remediation Strategy & Architectural Synthesis

To resolve all **P0** and **P1** findings and establish PharmLearn as an authoritative, daily workspace for pharmacy students, the following remediation directives must be implemented:

1. **Purge Plaintext Secrets & Secure AI Inference (Remediating F-03)**:
   - Strip the plaintext OpenRouter key from `apps/web/src/services/tutorService.ts:62`.
   - Route all chat completions and embeddings through authenticated Supabase Edge Functions (`/functions/v1/socratic-tutor`).
2. **Repair Catalog Routing & Multi-Lecture Loading (Remediating F-02 & F-07)**:
   - Update `CatalogPage.tsx` to link to canonical slug IDs (`mc-mod1-les1`, `pharm-mod1-les1`) or map module indices explicitly in `lessonsMap`.
   - Generalize `MarkdownDocumentViewer.tsx` to dynamically accept `lectureSlug`, loading any of the 22 client lessons from `curriculum.client.ts`.
   - Reconcile Pharmacology citations in `course.config.json`, marking unverified slide references as `[NOT IN MATERIALS]` in `docs/open-questions.md`.
3. **Restore pgvector Semantic Search (Remediating F-04)**:
   - Implement query embedding generation via OpenAI `text-embedding-3-small` in an Edge Function before calling `match_lecture_concepts`.
   - Populate the `embedding` column in `public.lecture_concepts` using a batch ingestion script over chunked lecture markdown.
4. **Fix Mobile Touch Gestures in 3D Canvas (Remediating F-01)**:
   - Add pointer/touch event handlers (`onTouchStart`, `onTouchMove`, `onTouchEnd`) to `DualModeMoleculeViewer.tsx` with proper touch coordinate mapping and CSS `touch-action: none`.
5. **Complete Widget Challenges & Integrate SAR Engine (Remediating F-08, F-09, F-10)**:
   - Add Step 3 challenge definition to `ReceptorSignalingVisualizer.tsx` and adjust guard to `currentStep <= 3`.
   - Replace static `SarMatrixWidget` in Studio with `SarExplorer` from `packages/widgets`, styled in ChatGPT Obsidian squircle tokens.
   - Refactor `WhiteboardTutorPage.tsx` to render rich interactive simulators dynamically rather than falling back to `MultipleChoice`.
6. **Implement Authentic Notes Vault & Reconnect Spaced Repetition (Remediating F-05, F-06)**:
   - Add authentic client-side PDF text extraction (PDF.js) and Supabase Storage upload with user-isolated RLS.
   - Pass extracted text into OpenRouter to synthesize genuine, document-specific flashcards.
   - Connect all Studio interactive widgets and quiz submissions directly to `LeitnerEngine.ts` via `enqueueReviewCards`.

---

*Forensic Audit completed and certified by Teamwork Audit & Pedagogy Worker.*
