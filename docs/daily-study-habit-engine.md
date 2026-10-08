# Daily Study Habit Engine & Radical Product Differentiators Specification

**Document Class**: Product Architecture & Pedagogical Specification  
**Status**: Authoritative / Final  
**Date**: October 7, 2026  
**Author**: Teamwork Audit & Pedagogy Worker (`worker_audit_and_pedagogy`)  
**Target Platform**: PharmLearn Workspace (`apps/web`, `packages/widgets`, `packages/platform`, `supabase/`)  
**Design Standard**: ChatGPT Obsidian Squircle System (`#212121`, `#171717`, `#2F2F2F`, `#10A37F`, `rounded-xl`/`rounded-2xl`)

---

## Executive Summary & Product Thesis

Pharmacy students face a high-stakes, memory-saturated curriculum. In Turkish pharmacy faculties (Eczacılık Fakültesi), third year is the pivotal elimination year (*"eleme sınıfı"*), where students simultaneously take *Farmasötik Kimya I & II*, *Farmakoloji I & II*, and *Farmasötik Teknoloji*. 

Today, students default to **two deeply flawed study habits**:
1. **Passive Slide Memorization**: Rereading professor lecture slides 3–5 times before midterms (*Vize*). This creates a dangerous **illusion of competence** (Karpicke et al.) without training retrieval pathways.
2. **Disconnected Flashcard Grinding (Anki)**: Memorizing isolated factual associations without understanding underlying chemical mechanisms, receptor kinetics, or structure-activity relationships.

### The PharmLearn Thesis
PharmLearn replaces passive reading and isolated flashcards with an **interactive, daily active-recall study workspace**. By uniting:
- Bite-sized daily retrieval loops calibrated to upcoming exam schedules,
- A legally airtight, privacy-preserving past-exam (*"Çıkmış Soru"*) twin synthesis engine,
- Persistent longitudinal diagnostic memory that detects and remedies conceptual misconceptions,
- Tactile micro-tools for direct molecular and pharmacokinetic manipulation, and
- An ambient, non-toxic community momentum layer,

PharmLearn transforms from a transactional course reader into the **essential daily operating system** for pharmacy student academic survival.

---

## Feature 1: Daily High-Yield Challenge Loop ("Günün 10 Sorusuna Odaklan" / Daily 10)

### 1.1 Habit Loop Specification

The Daily 10 engine implements a four-stage habit formation architecture engineered for daily active use (DAU):

```
+----------------------------------------------------------------------------------------------------+
|                                    DAILY 10 HABIT FORMATION LOOP                                   |
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|    1. TRIGGER                                                2. ACTIVE-RECALL ACTION               |
|    • 08:30 Morning Mobile Push / Web Badge                   • Exactly 10 Micro-Challenges (5-7m)  |
|    • "Bugünkü 10 Vize Sorun Hazır: Salisilat SAR             • Predict-Then-Reveal Step 1          |
|      ve Beta-Blokör Kinetiği"                                • Tactile Micro-Tool Interaction      |
|    • Dynamic Exam Countdown Widget ("Vizeye 18 Gün")         • 3-Tier Scaffolding Ladders          |
|                    │                                                         │                     |
|                    ▼                                                         ▼                     |
|    4. VARIABLE REWARD & FEEDBACK                             3. SPACED SCHEDULE UPDATE             |
|    • Diagnostic Rationale & Slide Citations                  • FSRS-4.5 Retrievability Update      |
|    • Instant Concept Mastery Delta (+4% SAR)                 • Interval Shift: [1, 3, 7, 14, 30 d] |
|    • Visual Flame Streak Increment                           • Persistent Misconception Sync       |
|                                                                                                    |
+----------------------------------------------------------------------------------------------------+
```

#### A. Trigger
- **Scheduled Smart Notification**: Delivered at 08:30 (customizable per student preference) via Web Push and daily dashboard badge:
  *Copy*: *"Bugünkü 10 Vize Sorun Hazır: Prof. Dr. Bedia Kaymakçıoğlu'nun Salisilat SAR ve Beta-Blokör Seçicilik tuzakları seni bekliyor. (Tahmini süre: 6 dk)"*
- **Contextual Countdown Banner**: The header displays dynamic academic countdowns (*"Güz Vizesine 14 Gün Kaldı"*), elevating urgency.

#### B. Active-Recall Interaction (The 10 Challenges)
- Exactly 10 progressive micro-challenges per day:
  - **Cards 1–3 (Spaced Review)**: High-yield questions previously seen at $t - 1$, $t - 3$, or $t - 7$ days that are due for reinforcement.
  - **Cards 4–7 (Curriculum Progression)**: New concepts mapped to the student's active lecture module.
  - **Cards 8–9 (Tactile Simulation)**: Interactive widget challenge (e.g. adjusting a pKa slider or swapping a bioisostere).
  - **Card 10 (Vize Trap / Synthesized Twin)**: High-difficulty past-exam twin question integrating two concepts.
- **Cognitive Design**: Every step enforces **Predict-Then-Reveal** (`predictThenReveal: true`) with strict $\le 40$-word prompts. The student must commit to a hypothesis before viewing the explanation.

#### C. Reward & Diagnostic Feedback
- **Immediate Misconception Feedback**: Incorrect answers do not say "Yanlış." They diagnose the specific mental model error:
  *Example*: *"Hata: Salisilik asitteki pKa düşüşünü rezonansa bağladınız. Asıl etken fenolik hidroksil ile karboksilat arasındaki molekül içi hidrojen bağıdır [Slayt 14]."*
- **Mastery Score Delta**: Visual green increment badge (`+3% Farmasötik Kimya Vize Hazırlığı`).
- **Streak Preservation**: Daily flame counter increment with streak freeze protection (1 free freeze per 7 active days).

#### D. Spaced Review Interval Schedule (FSRS-4.5 Exact Mathematical Formulation)
The engine utilizes the **Free Spaced Repetition Scheduler (FSRS-4.5)** algorithm, replacing the flawed legacy Leitner exponential model:

##### 1. Retrievability Equation
$$R(t, S) = \left( 1 + F \cdot \frac{t}{S} \right)^{-w}$$
where:
- $t$: Elapsed time in days since the last review.
- $S$: Memory stability in days (defined as the time required for retrievability to drop from 100% to $R_{\text{target}}$).
- $F$: Fixed scaling factor $F = \frac{19}{81} \approx 0.2345679$.
- $w$: Power decay parameter, typically $w = 0.5$ (or parameter weight $w_{15} \approx 0.45 \dots 0.55$).

##### 2. Parameter Vector $W = [w_0, w_1, \dots, w_{16}]$ (17 Weights)
- **Initial Stability** for grade $G \in \{1: \text{Again}, 2: \text{Hard}, 3: \text{Good}, 4: \text{Easy}\}$:
  $$S_0(G) = w_{G-1} \quad (w_0 = 0.4, w_1 = 1.2, w_2 = 3.2, w_3 = 8.5)$$
- **Initial Difficulty**:
  $$D_0(G) = w_4 - e^{w_5 (G - 1)} + 1 \quad (w_4 = 4.0, w_5 = 0.5)$$
- **Difficulty Update**:
  $$D' = w_7 D_0(3) + (1 - w_7) \cdot \text{clamp}\left( D - w_6 (G - 3), 1, 10 \right)$$
- **Stability Update on Successful Recall ($G \ge 2$)**:
  $$S' = S \cdot \left( 1 + e^{w_8} \cdot (11 - D) \cdot S^{-w_9} \cdot \left( e^{w_{10} (1 - R)} - 1 \right) \right)$$
- **Stability Update on Memory Lapse ($G = 1$)**:
  $$S' = w_{11} \cdot D^{-w_{12}} \cdot \left( (S + 1)^{w_{13}} - 1 \right) \cdot e^{w_{14} (1 - R)}$$

##### 3. Optimal Interval Calculation ($I$)
For a desired target retrievability $R_{\text{target}}$ (standard: $0.85$ or $0.90$):
$$R_{\text{target}} = \left( 1 + F \cdot \frac{I}{S} \right)^{-w} \implies 1 + F \cdot \frac{I}{S} = R_{\text{target}}^{-1/w}$$
$$I = \frac{S}{F} \cdot \left( R_{\text{target}}^{-1/w} - 1 \right)$$
For $w = 0.5$ and $R_{\text{target}} = 0.85$:
$$R_{\text{target}}^{-1/0.5} = 0.85^{-2} \approx 1.38408$$
$$I = \frac{S}{19/81} \cdot (1.38408 - 1) = S \cdot 4.26316 \cdot 0.38408 \approx 1.637 \cdot S$$

##### 4. Resolution of the 3.9-Hour Premature Decay Bug in LeitnerEngine
In the legacy `LeitnerEngine.ts`:
- Stability $S$ was naively hardcoded equal to the interval in days ($S = 1.0\text{ d}$ for Box 1, $3.0\text{ d}$ for Box 2).
- Retrievability was calculated as $R(t) = e^{-t / S}$.
- `getDueReviewCards` evaluated `dueByDate || (calculateCardRetrievability(card, now) <= 0.85)`.
- Because $t = -S \ln(0.85) \approx 0.16252 \times S$, Box 1 cards dropped below 0.85 in just **$0.16252 \times 24\text{ h} = 3.9\text{ hours}$**.
- The OR condition caused newly graduated cards to resurface 3.9 hours after study on the exact same day, creating cognitive overload and backlog avalanches.
- **The Remediation**: Under FSRS-4.5, $I$ is explicitly derived from $R_{\text{target}}$ so that $R(I, S) = R_{\text{target}}$ precisely at the intended due date. For Leitner fallback mode, $S$ is calibrated as $S = \frac{\text{Interval}}{-\ln(R_{\text{target}})} \approx 6.153 \times \text{Interval}$, and `dueByDecay` is strictly restricted to lapsed cards ($lapses > 0$).

---

### 1.2 Cognitive Science Rationale

1. **Retrieval Practice (Roediger & Karpicke, 2006)**:
   Testing is not merely a measurement tool; it is an active memory modifier. Actively producing an answer produces significantly greater retention at 1 week and 1 month than repeated study sessions.
2. **Desirable Difficulties (Bjork & Bjork, 2011)**:
   By spacing practice across expanding intervals and interleaving related topics (e.g. contrasting ester hydrolysis with amide hydrolysis on alternating days), the difficulty of retrieval increases, cementing deep structural memory.
3. **Interleaving vs Blocked Practice (Rohrer & Taylor, 2007)**:
   Traditional study blocks all NSAIDs together, then all Local Anesthetics. Daily 10 interleaves them, forcing students to discriminate between mechanisms rather than relying on category priming.

---

### 1.3 UI Wireframe & User Journey

#### Daily 10 UI Wireframe (ChatGPT Obsidian Squircle Theme)

```
+---------------------------------------------------------------------------------+
|  PharmLearn Studio               [🔥 14 Günlük Seri]   [Güz Vizesi: 18 Gün Kaldı] |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  ┌── GÜNÜN 10 YÜKSEK VERİMLİ VİZE SORUSU ────────────────────────────────────┐ |
|  │  İlerleme: [██████████░░░░░░░░░░░░░░░░░░░░] Soru 4 / 10   (Kalan: 4 dk)   │ |
|  └───────────────────────────────────────────────────────────────────────────┘ |
|                                                                                 |
|  ┌── Soru Kartı (rounded-2xl bg-[#212121] border border-[#2F2F2F]) ──────────┐ |
|  │                                                                           │ |
|  │  [Farmasötik Kimya 1] • [Slayt 31-33] • [Vize Tuzağı]                     │ |
|  │                                                                           │ |
|  │  Prokain ve Dibukain molekülleri plazmada karşılaştırıldığında, hangisi   │ |
|  │  psödokolinesteraz hidrolizine tam direnç göstererek daha uzun etki eder? │ |
|  │                                                                           │ |
|  │  (A) Prokain — PABA aromatik halkasındaki rezonans nedeniyle              │ |
|  │  (B) Dibukain — Ara zincirinde ester yerine amit köprüsü taşıdığı için    │ |
|  │  (C) Prokain — Tersiyer amin grubunun protonlanması nedeniyle             │ |
|  │  (D) Dibukain — Butoksi zincirinin esterazı inhibe etmesi nedeniyle       │ |
|  │                                                                           │ |
|  │  ┌── 💡 İpucu İste (rounded-xl bg-[#2A2A2A] text-slate-300) ──────────────┐│ |
|  │  │ Seviye 1 (Nudge): İki molekülün ara zincir fonksiyonel gruplarını      ││ |
|  │  │ incele. Biri ester, diğeri nedir?                                      ││ |
|  │  └────────────────────────────────────────────────────────────────────────┘│ |
|  │                                                                           │ |
|  │  [  Cevabı Onayla  ] (rounded-xl bg-[#10A37F] text-white hover:bg-emerald)│ |
|  └───────────────────────────────────────────────────────────────────────────┘ |
|                                                                                 |
|  ┌── Oturum Özeti Çubuğu ─────────────────────────────────────────────────────┐ |
|  │  Bugün: 3 Doğru • 0 Yanlış • Kazanılan: +12 XP • Misconception Hafızası: 0 │ |
|  └───────────────────────────────────────────────────────────────────────────┘ |
+---------------------------------------------------------------------------------+
```

#### User Journey: Daily Morning Session
1. **08:30**: Student opens smartphone or browser. Notification brings them directly to `/daily`.
2. **08:31**: Card 1 presents a spaced review question from last Thursday regarding Henderson-Hasselbalch ionization.
3. **08:33**: Card 4 presents an interactive SAR question. Student taps the quinoline ring on an embedded 2D structure.
4. **08:36**: Card 8 presents a tactile slider. Student shifts blood pH to 7.4 and observes un-ionized fraction drop to 1%.
5. **08:38**: Card 10 is solved. Complete screen renders:
   - Green summary banner: *"Günün 10'u Tamamlandı! Seri: 15 Gün."*
   - Mastery report: *"Rezonans ve Amit Stabilitesi kavramında ustalaştın."*
   - Next review scheduled: 3 cards due tomorrow, 7 cards in 3 days.

---

## Feature 2: Abstract Pharmacological Concept Extractor & Independent Synthetic Socratic Question Generator
### (Soyut Farmakolojik Konsept Çıkarıcı ve Bağımsız Sentetik Sokratik Soru Üreticisi)

### 2.1 The Legal & Academic Problem & Statutory Resolution
In Turkish pharmacy faculties, students frequently rely on past exam questions (*"Çıkmış Sorular"*). However, commercial platforms handling raw exam questions face catastrophic legal and pedagogical liabilities:
1. **Turkish Law on Intellectual and Artistic Works (FSEK No. 5846)**:
   - Exam questions authored by university professors are protected original intellectual works under FSEK.
   - Turkish law provides **zero DMCA-style safe harbor**.
   - Reproducing (*çoğaltma* - FSEK Art. 21) or storing student uploads on a server exposes the platform to immediate copyright infringement claims.
   - Producing direct "twins" that merely alter minor variables without authorization constitutes an unauthorized derivative adaptation (*izinsiz işleme* - FSEK Art. 6).
   - Stripping a professor's name while copying question substance constitutes a criminal violation of the author's moral rights (*adın belirtilmesi salahiyetinin ihlali* - FSEK Art. 15 & Art. 71/1-1).
2. **Turkish Personal Data Protection Law (KVKK No. 6698)**:
   - Student exam papers frequently contain student names, 11-digit Turkish National ID numbers (T.C. Kimlik No), student ID numbers, dates, and biometric handwriting.
   - Transmitting unscrubbed exam images or text to third-party US-based LLM APIs (OpenRouter, Anthropic, OpenAI) violates KVKK Art. 9 (unauthorized cross-border personal data transfer) and KVKK Art. 5/6.
3. **Rote Memorization Failure**: Students memorize the surface letter of the answer (e.g. "C şıkkı") without understanding the chemical principle. When the professor alters a substituent in the final exam, the student fails.

### 2.2 The 5-Stage Zero-Knowledge, Zero-Persistence Architecture

```
+----------------------------------------------------------------------------------------------------+
|            ABSTRACT CONCEPT EXTRACTOR & INDEPENDENT SYNTHETIC SOCRATIC QUESTION PIPELINE          |
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|  [ Student Input ] ──> (1) 100% Client-Side Ephemeral Ingestion & OCR                              |
|  • Phone photo / PDF       • In-browser canvas grayscale/thresholding + Tesseract.js / PDF.js      |
|  • Raw exam sheet          • Raw image/PDF NEVER leaves the client browser (0 server persistence)  |
|                                     │                                                              |
|                                     ▼                                                              |
|                        (2) Strict Client-Side KVKK & FSEK Sanitization Engine                      |
|                          • Algorithmic scrubbing of 11-digit T.C. Kimlik numbers, student names    |
|                          • Regex redaction of faculty, professor titles (inc. initials), dates     |
|                          • Strips layout coordinates, stamps, watermarks, student handwriting      |
|                                     │                                                              |
|                                     ▼                                                              |
|                        (3) Abstract Concept Extractor (CAPS Formulator)                            |
|                          • Maps prompt to abstract biophysical principle (e.g. "Ester Hydrolysis") |
|                          • Output: Canonical Abstract Problem Spec (CAPS) — NO EXAM TEXT SENT      |
|                                     │                                                              |
|                                     ▼                                                              |
|                        (4) Independent Synthetic Socratic Question Generator (Edge Function)      |
|                          • Selects novel, orthogonal drug molecules (e.g. Articaine vs Bupivacaine)|
|                          • Synthesizes 100% original question, 4 distractors, diagnostic feedbacks |
|                          • Automated N-gram lexical overlap rejection guard (<15% 3-gram overlap)  |
|                          • Strictly banned: No university or professor branding in generated text  |
|                                     │                                                              |
|                                     ▼                                                              |
|                        (5) Ephemeral Discard & Zero-Knowledge Storage                              |
|                          • Raw input and OCR text are permanently purged from browser memory       |
|                          • Only the synthetic Socratic question is stored in student study queue   |
|                          • ZERO COPYRIGHT EXPOSURE UNDER FSEK NO. 5846 & KVKK NO. 6698             |
|                                                                                                    |
+----------------------------------------------------------------------------------------------------+
```

---

### 2.3 Strict Client-Side KVKK & Legal Sanitization Specification

To guarantee zero personal data leakage and zero copyright exposure, all scrubbing executes inside the client browser **before any network transmission**:

```typescript
// Client-side Sanitization Engine (ClientOcrCanvas.tsx / deidentificationService.ts)

export interface DeidentificationRule {
  name: string;
  pattern: RegExp;
  replacement: string;
}

export const LEGAL_AND_KVKK_SCRUBBING_RULES: DeidentificationRule[] = [
  // 1. KVKK: 11-Digit Turkish Republic National ID Number (T.C. Kimlik No)
  {
    name: 'TC_KIMLIK_NO',
    pattern: /\b[1-9]\d{10}\b/g,
    replacement: '[T.C. KİMLİK NO SİLİNDİ]',
  },

  // 2. KVKK: Student Names, Student Numbers, and Signatures
  {
    name: 'STUDENT_INFO',
    pattern: /(Öğrenci\s*(Adı|Soyadı|No|Numarası)?|Öğr\.\s*No)\s*[:.]?\s*([A-ZÇĞİÖŞÜ0-9a-zçğıöşü\s]{3,30})/gi,
    replacement: '[ÖĞRENCİ BİLGİSİ SİLİNDİ]',
  },

  // 3. FSEK: All Turkish Universities & Faculties (Comprehensive 81 Provinces & Foundations)
  {
    name: 'UNIVERSITY_FACULTY',
    pattern: /\b([A-ZÇĞİÖŞÜ][a-zçğıöşü]+(?:\s+[A-ZÇĞİÖŞÜ][a-zçğıöşü]+)*)\s+(Üniversitesi|Yüksekokulu|Enstitüsü|Fakültesi)\b/gi,
    replacement: '[ÜNİVERSİTE/FAKÜLTE SİLİNDİ]',
  },

  // 4. FSEK: Academic Titles, Professor Names & Abbreviated Initials (e.g. Prof. Dr. B. Kaymakçıoğlu)
  {
    name: 'ACADEMIC_PERSONNEL',
    pattern: /(Prof\.|Doç\.|Dr\.|Öğr\.\s*Gör\.|Arş\.\s*Gör\.)\s*(Dr\.)?\s*([A-ZÇĞİÖŞÜ]\.?\s*)?([A-ZÇĞİÖŞÜ][a-zçğıöşü]+)/gi,
    replacement: '[ÖĞRETİM ÜYESİ SİLİNDİ]',
  },

  // 5. Exam Session, Year, and Course Codes
  {
    name: 'EXAM_METADATA',
    pattern: /\b(20[12]\d[-/]\s*20[12]\d|\b20[12]\d\b)\s*(Güz|Bahar|Yaz)?\s*(Vize|Final|Bütünleme|Ara\s*Sınav|Mazeret)\b/gi,
    replacement: '[SINAV DÖNEMİ SİLİNDİ]',
  },
  {
    name: 'COURSE_CODES',
    pattern: /\b(ECZ|FKIM|FARM|FAR|KİM)\s*[-_]?\s*\d{3,4}\b/gi,
    replacement: '[DERS KODU SİLİNDİ]',
  },

  // 6. Point Distributions and Question Number Headers
  {
    name: 'POINT_HEADERS',
    pattern: /\(\s*\d{1,2}\s*(puan|pt|not|pts)\s*\)/gi,
    replacement: '',
  },
  {
    name: 'QUESTION_NUMBERING',
    pattern: /^\s*(Soru|Q)\s*\d{1,2}\s*[:.)-]/gim,
    replacement: '',
  },
];
```

---

### 2.4 Canonical Abstract Problem Spec (CAPS) & Automated N-Gram Overlap Guard

#### Canonical Abstract Problem Spec (CAPS)
The extracted conceptual payload sent to the Edge Function contains **zero text from the student's exam sheet**. It isolates purely the invariant biochemical and pharmacological principles:

```json
{
  "pharmacologicalDomain": "Medicinal Chemistry",
  "primaryMechanism": "Ester vs Amide Local Anesthetic Hydrolysis Kinetics",
  "underlyingPrinciple": "Plasma pseudocholinesterase enzyme sensitivity vs hepatic CYP cleavage",
  "chemicalScaffoldClass": "Benzoic acid ester vs Amino amide",
  "pedagogicalObjective": "Infer duration of action and allergic risk from functional bridge chemistry"
}
```

#### Automated N-Gram Lexical Overlap Rejection Guard (<15% Overlap)
To prove that the generated question is a genuine independent synthesis rather than a derivative work (*işleme eser*), the Edge Function executes an automated N-gram rejection check:

$$\text{Overlap}_{3\text{-gram}} = \frac{|G_3(\text{Input}_{\text{OCR}}) \cap G_3(\text{Generated})|}{|G_3(\text{Generated})|}$$

- **Strict Enforcement Rule**: $\text{Overlap}_{3\text{-gram}} < 0.15$ ($< 15\%$).
- If $\text{Overlap}_{3\text{-gram}} \ge 0.15$, the synthesis is immediately aborted, discarded, and regenerated with higher structural divergence.
- This mathematically guarantees that no consecutive phrases, vignettes, or distinctive phrasing from the professor's exam are reproduced.

#### Strict Ban on University & Professor Branding
- **Hard Rule**: The system strictly bans citing university names or professor branding in generated questions.
- **Forbidden**: Never say *"Marmara 2023 İkizi"*, *"Hacettepe 2024 Vizesi İkizi"*, or *"Prof. Dr. X'in Vize Sorusu"*.
- **Mandatory Canonical Branding**:
  `"Sentetik Farmakoloji Sokratik İkizi — Konsept: [Konsept Başlığı]"`  
  *(Örn: "Sentetik Farmasötik Kimya Sokratik İkizi — Konsept: Ester/Amit Lokal Anestezik Stabilitesi")*

---

### 2.5 UI Wireframe & User Journey

```
+---------------------------------------------------------------------------------+
|  Sentetik Sokratik Soru Laboratuvarı              [🔒 FSEK & KVKK Tam Koruma]   |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  ┌── 1. Adım: Yerel İnceleme (100% Cihaz İçi / Sıfır Sunucu Kaydı) ───────────┐ │
|  │  ┌──────────────────────────────────────────────────────────────────────┐ │ │
|  │  │  📷 Soru Fotoğrafını Sürükle veya Kamerayla Çek                      │ │ │
|  │  │  (PDF, PNG, JPG kabul edilir. Yüklenen görsel asla sunucuya gitmez)  │ │ │
|  │  └──────────────────────────────────────────────────────────────────────┘ │ │
|  │  Cihaz İçi OCR: [Yerel Tesseract Çalıştı • Ham Görsel Bellekten Silindi]    │ │
|  │  [✓] KVKK & FSEK Filtresi: T.C. Kimlik No, İsim ve Üniversite Silindi.      │ │
|  │  [✓] Soyut Konsept Çıkarıldı: "Ester vs Amit Lokal Anestezik Hidrolizi"     │ │
|  │  [✓] N-Gram Benzerlik Denetimi: %4.2 (Eşik <%15 - Bağımsız Sentez Onaylı)   │ │
|  └───────────────────────────────────────────────────────────────────────────┘ │
|                                                                                 |
|  ┌── 2. Adım: Sentetik Sokratik Soru Üretildi! (rounded-2xl border-[#10A37F]) ─┐ │
|  │                                                                           │ │
|  │  ✨ Sentetik Farmasötik Kimya Sokratik İkizi                              │ │
|  │     Konsept: Ester/Amit Lokal Anestezik Biyotransformasyonu               │ │
|  │                                                                           │ │
|  │  "Artikain molekülü tiyofen halkasında bir metil ester grubu taşırken,    │ │
|  │   Bupivakain bir amid bağı içerir. Artikainin sistemik toksisite riskinin  │ │
|  │   bupivakaine göre belirgin şekilde daha düşük olmasının temel nedeni     │ │
|  │   aşağıdakilerden hangisidir?"                                            │ │
|  │                                                                           │ │
|  │  (A) Tiyofen halkasındaki esterin plazma karboksilesterazlarıyla [✓]       │ │
|  │      hızla inaktif asit metabolitine hidroliz olması                      │ │
|  │  (B) Artikainin sodyum kanallarına kovalent olarak bağlanması              │ │
|  │  (C) Bupivakainin sadece böbrek glomerüler filtrasyonu ile atılması        │ │
|  │  (D) Artikainin fizyolojik pH'da %100 iyonlaşarak zarı hiç geçememesi     │ │
|  │                                                                           │ │
|  │  ┌── Pedagojik Konsept Eşleşmesi ───────────────────────────────────────┐ │ │
|  │  │ Bu sentetik soru, incelediğiniz konseptteki 'Lokal Anesteziklerde    │ │ │
|  │  │ Biyotransformasyon ve Esteraz Duyarlılığı' ilkesini test eder.       │ │ │
|  │  │ Doğrulanmış Ders Kaynağı: [İlaç Metabolizması, Slayt 18-20]          │ │ │
|  │  └──────────────────────────────────────────────────────────────────────┘ │ │
|  │                                                                           │ │
|  │  [  Bu Soruyu Günlük 10 Tekrarına Ekle (+FSRS)  ]                          │ │
|  └───────────────────────────────────────────────────────────────────────────┘ │
+---------------------------------------------------------------------------------+
```

---

## Feature 3: Persistent Misconception Diagnostic Memory

### 3.1 The 6 Lethal Turkish Pharmacy Misconception Traps

Based on forensic curriculum analysis and historical examination patterns across Turkish faculties of pharmacy, the system tracks 6 high-prevalence conceptual failure modes:

```
+---------------------------------------------------------------------------------------------------------------+
|                                      THE 6 PERSISTENT PHARMACY MISCONCEPTION TRAPS                            |
+--------------------+-------------------------------------------+----------------------------------------------+
| Misconception ID   | Name & Core Fallacy                       | Clinical & Chemical Truth                    |
+--------------------+-------------------------------------------+----------------------------------------------+
| **TRAP-01**        | **pKa & Henderson-Hasselbalch Ionization**| Only un-ionized drug diffuses passively. Weak|
|                    | *"Düşük pH her molekülü iyonlaştırır"*    | acids (pKa 3.5) ionize at pH > pKa; weak bases|
|                    | veya *"İyonlaşan molekül daha iyi emilir"*| (pKa 8.5) ionize at pH < pKa. Ion trapping in|
|                    | veya *"Tüm amfoterik ilaçlar monoprotik"* | urine works via this law. Amphoteric/zwitter- |
|                    |                                           | ions (Ciprofloxacin) require diprotic models. |
+--------------------+-------------------------------------------+----------------------------------------------+
| **TRAP-02**        | **Potency (EC50) vs Efficacy (Emax)**     | Potency dictates the dose in milligrams.     |
|                    | *"Daha potent olan ilaç daima daha yüksek*| Efficacy dictates maximum clinical ceiling.  |
|                    | *klinik tavan etki sağlar"*               | Codeine cannot relieve severe pain even at   |
|                    |                                           | toxic doses because its Emax is lower.       |
+--------------------+-------------------------------------------+----------------------------------------------+
| **TRAP-03**        | **Ester vs Amide Local Anesthetic Hydro-**| Esters (procaine) are degraded in seconds by |
|                    | **lysis & Allergic Profile**              | plasma pseudocholinesterase and yield PABA   |
|                    | *"Amitler plazmada parçalanır"* veya      | (allergy risk). Amides (lidocaine, dibucaine)|
|                    | *"Tüm lokal anestezikler PABA alerjisi    | are resistant, requiring slow hepatic CYP    |
|                    | yapar"*                                   | metabolism; zero PABA metabolite.            |
+--------------------+-------------------------------------------+----------------------------------------------+
| **TRAP-04**        | **Adrenergic Subtype Selectivity**        | α1: Gq (PLC, IP3/DAG, Ca2+ ↑, vasocons-      |
|                    | **Inversion (α1 vs β2)**                  | triction). β2: Gs (AC, cAMP ↑, PKA, vasodi-  |
|                    | *"Adrenalin sadece damarları kasar"*      | latation & bronchodilatation). Epinephrine   |
|                    |                                           | causes low-dose β2 vasodilation and high-    |
|                    |                                           | dose α1 vasoconstriction.                    |
+--------------------+-------------------------------------------+----------------------------------------------+
| **TRAP-05**        | **Bioisosteric Replacement Pitfalls**     | Grimm hydride displacement rules (classical) |
|                    | *"Biyoizoster değişimi molekülün farmako- | preserve valence electron configuration.     |
|                    | forunu ve LogP'sini asla değiştirmez"*    | Non-classical (carboxylic acid to tetrazole) |
|                    |                                           | maintains planar acidity (pKa ~4.5) while    |
|                    |                                           | dramatically increasing LogP (10x lipophilic)|
+--------------------+-------------------------------------------+----------------------------------------------+
| **TRAP-06**        | **Phase I vs Phase II Polarity Inversion**| Phase I (CYP functionalization) does not al- |
|                    | *"Faz I reaksiyonları ilacı anında vücuttan| ways render metabolites inactive or polar    |
|                    | atılacak kadar hidrofilik yapar"*         | enough for excretion. Phase II conjugation   |
|                    |                                           | (glucuronidation, sulfation) creates bulky,  |
|                    |                                           | highly ionized, excretable conjugates.       |
+--------------------+-------------------------------------------+----------------------------------------------+
```

#### Amphoteric & Zwitterionic Ionization Equilibrium (Mathematical Formulation)
While monoprotic drugs obey the classical Henderson-Hasselbalch ratio:
$$\text{Weak Acid: } \frac{[A^-]}{[HA]} = 10^{\text{pH} - \text{pKa}} \implies f_{\text{un-ionized}} = \frac{1}{1 + 10^{\text{pH} - \text{pKa}}}$$
$$\text{Weak Base: } \frac{[B]}{[BH^+]} = 10^{\text{pH} - \text{pKa}} \implies f_{\text{un-ionized}} = \frac{1}{1 + 10^{\text{pKa} - \text{pH}}}$$

Third-year pharmacy students are routinely tested on **amphoteric / zwitterionic drugs** (e.g. Fluoroquinolones like **Ciprofloxacin**, $\text{pKa}_1 = 6.09$ carboxylic acid, $\text{pKa}_2 = 8.74$ piperazinyl secondary amine; $\beta$-lactams like Ampicillin). Diprotic speciation requires simultaneous equilibrium:

$$[H_2A^+] \overset{K_{a1}}{\rightleftharpoons} [HA^\pm] + [H^+] \overset{K_{a2}}{\rightleftharpoons} [A^-] + 2[H^+]$$

The exact molar fraction of each species is:
$$f_{\text{cation}} [H_2A^+] = \frac{[H^+]^2}{[H^+]^2 + K_{a1} [H^+] + K_{a1} K_{a2}}$$
$$f_{\text{zwitterion}} [HA^\pm] = \frac{K_{a1} [H^+]}{[H^+]^2 + K_{a1} [H^+] + K_{a1} K_{a2}}$$
$$f_{\text{anion}} [A^-] = \frac{K_{a1} K_{a2}}{[H^+]^2 + K_{a1} [H^+] + K_{a1} K_{a2}}$$

**Empirical Verification at Blood pH 7.4** ($[H^+] = 10^{-7.4} \approx 3.98 \times 10^{-8}\text{ M}$):
- $K_{a1} = 10^{-6.09} \approx 8.128 \times 10^{-7}$
- $K_{a2} = 10^{-8.74} \approx 1.820 \times 10^{-9}$
- **Cation ($H_2A^+$)**: $4.47\%$
- **Zwitterion ($HA^\pm$)**: $\mathbf{91.35\%}$ (Predominant net-neutral species capable of porin crossing)
- **Anion ($A^-$)**: $4.18\%$

Treating Ciprofloxacin with naive monoprotic acid/base equations predicts 0% or 95% single-charge ionization, missing the 91.35% zwitterionic fraction that determines physiological tissue distribution and precipitation in acidic urine (crystalluria risk).

---

### 3.2 Database Schema: `student_misconceptions`

To make diagnostic tracking persistent across devices, sessions, and months, the database implements a dedicated schema:

```sql
-- Migration: 20261007120000_student_misconceptions_memory.sql

CREATE TABLE IF NOT EXISTS public.student_misconceptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    misconception_code TEXT NOT NULL, -- e.g. 'TRAP-01-IONIZATION'
    domain TEXT NOT NULL,             -- 'medchem' | 'pharmacology'
    concept_title TEXT NOT NULL,
    trigger_count INT NOT NULL DEFAULT 1,
    consecutive_correct INT NOT NULL DEFAULT 0,
    confidence_score FLOAT NOT NULL DEFAULT 0.2, -- 0.0 (deeply confused) to 1.0 (mastered)
    last_triggered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMPTZ,
    remediation_history JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_misconception UNIQUE (user_id, misconception_code)
);

CREATE INDEX idx_student_misconceptions_user ON public.student_misconceptions(user_id, confidence_score);
```

#### Diagnostic State Machine & Adaptive Question Sequencing Algorithm

```
                  ┌───────────────────────────────┐
                  │ Student Answers Question      │
                  └──────────────┬────────────────┘
                                 │
                 Selects Distractor with Diagnostic Tag?
                                 │
                YES ─────────────┴───────────── NO
                 │                               │
                 ▼                               ▼
    ┌──────────────────────────┐   ┌──────────────────────────┐
    │ Increment trigger_count  │   │ Increment consecutive_   │
    │ consecutive_correct = 0  │   │ correct counter (+1)     │
    │ confidence_score =       │   │ confidence_score =       │
    │   max(0.1, score - 0.3)  │   │   min(1.0, score + 0.25) │
    └────────────┬─────────────┘   └─────────────┬────────────┘
                 │                               │
                 ▼                               ▼
    ┌──────────────────────────┐   ┌──────────────────────────┐
    │ Queue Targeted Socratic  │   │ If consecutive_correct   │
    │ Remediation Step in Next │   │ >= 3, set resolved_at    │
    │ Turn (Interleaved)       │   │ to NOW() [Mastery State] │
    └──────────────────────────┘   └──────────────────────────┘
```

When generating the next Daily 10 or lesson sequence, the scheduler queries:
```sql
SELECT misconception_code, concept_title 
FROM public.student_misconceptions
WHERE user_id = :userId AND resolved_at IS NULL
ORDER BY confidence_score ASC, last_triggered_at DESC
LIMIT 2;
```
These active misconceptions are injected as priority retrieval items in the next morning's challenge.

---

### 3.3 UI Wireframe & Remediation Modal

```
+---------------------------------------------------------------------------------+
|  Kişisel Yanılgı & Vize Teşhis Radarı             [Teşhis Edilen: 3 Kritik Tuzak] |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  ┌── Aktif Yanılgı Teşhisi: pKa ve İyonlaşma Tuzağı (TRAP-01) ────────────────┐ │
|  │                                                                           │ │
|  │  ⚠️ Son 7 günde 3 kez tetiklendi!                                         │ │
|  │  "Zayıf asitlerin (örn. Aspirin) asidik midede iyonlaşarak emildiğini      │ │
|  │   düşünme eğilimindesiniz."                                               │ │
|  │                                                                           │ │
|  │  ┌── Sokratik Telafi Egzersizi ─────────────────────────────────────────┐ │ │
|  │  │                                                                      │ │ │
|  │  │  pH = 1.4 (Mide sıvısı) ve Aspirin (pKa = 3.5).                      │ │ │
|  │  │  Henderson-Hasselbalch: pH - pKa = log([A-] / [HA]) = 1.4 - 3.5 = -2.1│ │ │
|  │  │  Bu ortamda molekülün %99'u İYONLAŞMAMIŞ [HA] haldedir!              │ │ │
|  │  │  Soru: Mide epitel membranından sadece hangi form geçer?             │ │ │
|  │  │                                                                      │ │ │
|  │  │  ( ) İyonlaşmış [A-]    (•) İyonlaşmamış [HA] (Lipofilik)            │ │ │
|  │  └──────────────────────────────────────────────────────────────────────┘ │ │
|  │                                                                           │ │
|  │  [  Telafi Sorusunu Çöz ve Bu Yanılgıyı Sil  ] (bg-[#10A37F] text-white)   │ │
|  └───────────────────────────────────────────────────────────────────────────┘ │
+---------------------------------------------------------------------------------+
```

---

## Feature 4: Interactive Tactile Micro-Tools

To replace static lecture memorization with active experimentation, PharmLearn specifies 3 dedicated micro-tools:

### 4.1 Micro-Tool 1: `MolecularBioisostereBench`
- **Objective**: Allows students to swap functional groups on a core drug scaffold and observe real-time recalculation of physicochemical parameters and receptor binding dynamics.
- **Physical Interaction**:
  - Core scaffold: Angiotensin receptor blocker (Sartan core) or Local Anesthetic core.
  - Interactive replacement bench:
    - Replace Carboxylic Acid ($-COOH$) with **Tetrazole** (Non-classical bioisostere).
    - Replace Benzene ring with **Thiophene** or **Pyridine** ring.
    - Replace Ester ($-COO-$) with **Amide** ($-CONH-$).
- **Live Output Displays**:
  - Calculated $\text{LogP}$ shift: Shows $+1.2$ lipophilicity gain for tetrazole.
  - Ionization at $\text{pH } 7.4$: Shows both maintain negative charge, but tetrazole distributes charge over a 5-membered aromatic ring with enhanced metabolic stability.
  - $K_d$ binding prediction delta.

#### Wireframe: `MolecularBioisostereBench`
```
+---------------------------------------------------------------------------------+
|  MolecularBioisostereBench — Biyoizosterik Değişim Laboratuvarı                 |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  ┌── Molekül Tuvali ────────────────────────┐ ┌── Biyoizosterik Parça Paleti ──┐ │
|  │                                          │ │ Değiştirilecek Grup: R-1       │ │
|  │        [Ar] ── ( R-1 )                   │ │                                │ │
|  │          │                               │ │ [ -COOH (Karboksilat) ]        │ │
|  │        [Bifenil Çekirdeği]               │ │ [ Tetrazol Halkası ]    <Seçili│ │
|  │                                          │ │ [ -SO2NH2 (Sülfonamit) ]       │ │
|  │  R-1 Konumunda: TETRAZOL TAKILDI         │ │ [ -CONH-OH (Hidroksamat) ]     │ │
|  └──────────────────────────────────────────┘ └────────────────────────────────┘ │
|                                                                                 |
|  ┌── Canlı Fizikokimyasal Hesaplama Paneli (rounded-xl bg-[#171717]) ────────┐ │
|  │  LogP (Lipofiliklik):    3.4  (▲ +1.1 artış, hücre zarı geçişi 8x hızlı)  │ │
|  │  pKa:                    4.5  (Plazma pH 7.4'te %99.8 iyonize / kararlı)  │ │
|  │  Metabolik Kararlılık:   YÜKSEK (Glukuronidasyona dirençli)              │ │
|  │  Reseptör Afinitesi:     Kd = 2.1 nM (Angiotensin AT1 reseptörüne sıkı)   │ │
|  └───────────────────────────────────────────────────────────────────────────┘ │
+---------------------------------------------------------------------------------+
```

---

### 4.2 Micro-Tool 2: `PathwayFluxNavigator`
- **Objective**: Dynamic biochemical and GPCR/enzyme cascade simulator where students interactively apply agonists, antagonists, or enzyme modulators to track signal amplification flux.
- **Physical Interaction**:
  - Students drag a ligand token (e.g. Isoproterenol or Propranolol) into the GPCR binding pocket.
  - Active nodes glow with pulsating signal flux:
    $\text{Ligand} \to \text{GPCR} \to \text{G}_{\alpha s} \text{-GTP} \to \text{Adenylyl Cyclase} \to \text{cAMP } (\times 100) \to \text{PKA} \to \text{Ca}^{2+} \text{ Channel Phosphorylation}$.
  - Students can drop **Forskolin** (direct AC activator) or **IBMX / Sildenafil** (PDE inhibitors) into the cytosol to test signal amplification without receptor involvement.

#### Wireframe: `PathwayFluxNavigator`
```
+---------------------------------------------------------------------------------+
|  PathwayFluxNavigator — GPCR & Sinyal Akış Laboratuvarı                         |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  Seçili Yolak: [ Gs (cAMP ↑) ]    [ Gi (cAMP ↓) ]    [ Gq (PLC / IP3 / Ca2+) ]  |
|                                                                                 |
|  Ligand Deposu: [ İsoprenalin (Agonist) ] [ Propranolol (Antagonist) ]          |
|                 [ Forskolin (AC Aktivatörü) ] [ Teofilin (PDE İnhibitörü) ]     |
|                                                                                 |
|  ┌── Dinamik Membran Sinyal Akışı (SVG Canvas) ───────────────────────────────┐ │
|  │                                                                           │ │
|  │      [Ligand: İsoprenalin]                                                │ │
|  │               │                                                           │ │
|  │               ▼                                                           │ │
|  │      [β1 Reseptörü (Aktif)] ───> [Gs-GTP Alt Birimi]                      │ │
|  │                                          │                                │ │
|  │                                          ▼                                │ │
|  │                             [Adenilat Siklaz] (Hız: 450 devir/sn)         │ │
|  │                                          │                                │ │
|  │                                          ▼                                │ │
|  │                             cAMP Havuzu: [████████████████] (Yüksek)      │ │
|  │                                          │                                │ │
|  │                                          ▼                                │ │
|  │                                   [PKA Aktivasyonu]                       │ │
|  │                                          │                                │ │
|  │                                          ▼                                │ │
|  │                         Hücresel Yanıt: Pozitif İnotropik & Kronotropik   │ │
|  └───────────────────────────────────────────────────────────────────────────┘ │
|                                                                                 |
|  Sokratik Soru: Hücreye eklenen Teofilin, cAMP düzeyini reseptörsüz nasıl      │ │
|  yükseltti? (A) Adenilat siklazı uyararak   (B) Fosfodiesterazı inhibe ederek  │ │
+---------------------------------------------------------------------------------+
```

---

### 4.3 Micro-Tool 3: `PkDial` (Pharmacokinetic Cockpit)
- **Objective**: Multi-dial pharmacokinetic simulator illustrating multiple dosing, multi-compartment disposition, accumulation, and therapeutic window management.
- **Physical Interaction**:
  - Dials and Mode Selector:
    - Mode Toggle: **[2-Bölmeli IV Bolus (Lidokain/Digoksin)]** ↔ **[1-Bölmeli Oral Çoklu Doz (Antibiyotik/NSAİİ)]**
    - Rotary Dials:
      1. **Doz ($D$)**: $50 \text{ mg} \dots 1000 \text{ mg}$
      2. **Doz Aralığı ($\tau$)**: $4 \text{ h} \dots 24 \text{ h}$
      3. **Klirens ($CL$)**: $0.5 \text{ L/h} \dots 50 \text{ L/h}$
      4. **Merkezi Dağılım Hacmi ($V_1$ veya $V_d$)**: $10 \text{ L} \dots 100 \text{ L}$
      5. **Periferik Dağılım Hacmi ($V_2$) & İnterkompartman Klirens ($Q$)** (2-Bölmeli Mod)
      6. **Emilim Hız Sabiti ($k_a$)** (Oral Mod)

#### Mathematical Formulation 1: Two-Compartment Open IV Bolus Model
For lipophilic drugs that rapidly distribute into peripheral tissues (e.g. **Lidocaine**, Digoxin, Thiopental), single-compartment models fail catastrophically ($2.38\times$ error at early times). The central ($V_1$) and peripheral ($V_2$) compartments exchange drug via distribution clearance $Q$:

##### Micro-Rate Constants:
$$k_{10} = \frac{CL}{V_1}, \quad k_{12} = \frac{Q}{V_1}, \quad k_{21} = \frac{Q}{V_2}$$

##### Hybrid Rate Constants ($\alpha$ Dağılım, $\beta$ Eliminasyon):
$$\alpha, \beta = \frac{(k_{10} + k_{12} + k_{21}) \pm \sqrt{(k_{10} + k_{12} + k_{21})^2 - 4 k_{10} k_{21}}}{2} \quad (\alpha > \beta)$$

##### Zero-Intercept Coefficients ($A$ ve $B$):
$$A = \frac{D \cdot (\alpha - k_{21})}{V_1 \cdot (\alpha - \beta)}, \quad B = \frac{D \cdot (k_{21} - \beta)}{V_1 \cdot (\alpha - \beta)}$$
$$C_p(0) = A + B = \frac{D}{V_1}$$

##### Exact Plasma Concentration Biphasic Decay:
$$C_p(t) = A \cdot e^{-\alpha \cdot t} + B \cdot e^{-\beta \cdot t}$$

*Clinical Significance*: At $t = 0.1\text{ h}$ for Lidocaine ($V_1 = 35\text{L}, V_2 = 70\text{L}, CL = 42\text{L/h}, Q = 56\text{L/h}$), $C_p(0.1\text{h}) = 2.174\text{ mg/L}$. A naive 1-compartment model predicts $0.915\text{ mg/L}$ ($2.38\times$ underestimation), hiding acute central nervous system and cardiac toxicity risks from students.

---

#### Mathematical Formulation 2: Oral Dosing Bateman Kinetics & The $k_a = k_e$ Singularity
For oral administration, plasma concentration follows the Bateman function:
$$C_p(t) = \frac{F \cdot D \cdot k_a}{V_d (k_a - k_e)} \left( e^{-k_e t} - e^{-k_a t} \right)$$

##### Resolution of the $k_a = k_e$ Singularity via L'Hôpital Limit:
When absorption rate exactly equals elimination rate ($k_a \to k_e$, e.g. in sustained-release formulations where $k_a = 1.8\text{ h}^{-1}, k_e = 1.8\text{ h}^{-1}$), $(k_a - k_e) \to 0$, producing division by zero (`Infinity` / `NaN`).
Evaluating the analytical limit via L'Hôpital's rule with respect to $k_a$:
$$\lim_{k_a \to k_e} C_p(t) = \lim_{k_a \to k_e} \frac{F \cdot D \cdot \frac{d}{dk_a} [k_a (e^{-k_e t} - e^{-k_a t})]}{V_d \cdot \frac{d}{dk_a} [k_a - k_e]} = \frac{F \cdot D \cdot k_e}{V_d} \cdot t \cdot e^{-k_e t}$$

##### Runtime Epsilon Guard:
```typescript
export function calculateOralConcentration(
  t: number,
  D: number,
  F: number,
  Vd: number,
  ka: number,
  ke: number
): number {
  if (Math.abs(ka - ke) < 0.0001) {
    // Exact L'Hopital limit prevents NaN/Infinity rendering crashes
    return (F * D * ke / Vd) * t * Math.exp(-ke * t);
  }
  return (F * D * ka / (Vd * (ka - ke))) * (Math.exp(-ke * t) - Math.exp(-ka * t));
}
```

##### Multi-Dose Steady-State Superposition ($C_{ss}$):
$$C_{ss}(t) = \frac{F \cdot D \cdot k_a}{V_d (k_a - k_e)} \left[ \frac{e^{-k_e t}}{1 - e^{-k_e \tau}} - \frac{e^{-k_a t}}{1 - e^{-k_a \tau}} \right] \quad (0 \le t < \tau)$$
$$t_{\max, ss} = \frac{\ln\left( \frac{k_a (1 - e^{-k_e \tau})}{k_e (1 - e^{-k_a \tau})} \right)}{k_a - k_e}$$
- Akümülasyon Oranı: $R = \frac{1}{1 - e^{-k_e \tau}}$
- Ortalama Kararlı Durum Konsantrasyonu: $C_{ss,\text{avg}} = \frac{F \cdot D}{CL \cdot \tau}$

#### Wireframe: `PkDial` (Obsidian Squircle Theme)
```
+---------------------------------------------------------------------------------+
|  PkDial — Çoklu Doz & 2-Bölmeli Kararlı Durum (Css) Akümülasyon Kokpiti         |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  Model: (•) 2-Bölmeli Açık IV (Lidokain)     ( ) 1-Bölmeli Oral (Bateman)       |
|                                                                                 |
|  ┌── Kadran Kontrolleri (Rotary / Slider Dials) ──────────────────────────────┐ │
|  │  Doz (D): [ 100 mg ]         Doz Aralığı (τ): [ 6 saat ]                   │ │
|  │  V1 (Merkezi): [ 35 L ]      V2 (Periferik): [ 70 L ]                      │ │
|  │  Klirens (CL): [ 42 L/h ]    Dağılım Klirensi (Q): [ 56 L/h ]              │ │
|  │  Hesaplanan: α = 2.45 h⁻¹ (t½,α = 17 dk) | β = 0.35 h⁻¹ (t½,β = 1.98 saat)  │ │
|  └───────────────────────────────────────────────────────────────────────────┘ │
|                                                                                 |
|  ┌── Çift-Üstel Plazma Eğrisi (Cp = A·e^(-αt) + B·e^(-βt)) ───────────────────┐ │
|  │  mg/L                                                                      │ │
|  │   5.0 ┼ - - - - - - - - - - - - - - - - - MTC (Toksik Sınır: 5.0 mg/L)      │ │
|  │   2.5 ┼  \  (Hızlı Dağılım Fazı α)                                         │ │
|  │   1.5 ┼ - -\ - - - - - - - - - - - - - -  MEC (Etkinlik Sınırı: 1.5 mg/L)   │ │
|  │   1.0 ┼     \──────\──────\──────\        (Eliminasyon Fazı β)             │ │
|  │   0.0 ┼──────┴──────┴──────┴──────┴──────────────────────────────────────  │ │
|  │       0      6      12     18     24 saat                                  │ │
|  └───────────────────────────────────────────────────────────────────────────┘ │
|                                                                                 |
|  Klinik Rapor: Dağılım fazı konsantrasyonu tek-bölmeliye göre 2.38x yüksek.     │ │
|  Bolus enjeksiyon sonrası ilk 15 dakikada aritmik toksisite riski yok.          │ │
+---------------------------------------------------------------------------------+
```

---

## Feature 5: Cohesive Community Pulse & Study Momentum Layer

### 5.1 Non-Toxic Motivation vs Vanity Gamification
Traditional learning platforms often fail by adding excessive, distracting gamification: sound effects, confetti bursts, cartoon mascots, and public league demotions. Pharmacy students preparing for demanding professional examinations find these childish and patronizing.

PharmLearn introduces an **Ambient Academic Pulse** modeled after academic reading rooms:
- **Zero Toxic Leaderboards**: No humiliating "küme düşme" (league demotion) mechanics.
- **Anonymized Cohort Presence**: Shows active students in aggregate:
  *"Şu anda Türkiye genelinde 142 eczacılık öğrencisi İlaç Reseptör Etkileşimi çalışıyor."*
- **"Study With Me" Silent Focus Rooms**: Synchronized 25-minute Pomodoro focus blocks with silent, focused peers.
- **Faculty Mastery Heatmap**: Aggregated, non-competitive mastery indicators across Turkish faculties (Marmara, Hacettepe, İstanbul, Ankara, Ege), highlighting topics where students nationwide struggle most (e.g. "Ülke genelinde pKa İyonlaşma Tuzağı başarı oranı: %44").

---

### 5.2 UI Wireframe & Community Pulse Layout

```
+---------------------------------------------------------------------------------+
|  PharmLearn Topluluk Nabzı                         [🟢 184 Öğrenci Çevrimiçi]   |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  ┌── Canlı Çözüm Akışı (Toast Ticker) ────────────────────────────────────────┐ │
|  │  ⚡ Az önce: Hacettepe'den bir öğrenci 'Salisilat SAR' sorusunu çözdü (+FSRS)│ │
|  │  ⚡ 2 dk önce: Marmara'dan bir öğrenci 'Gq/PLC Kaskadı' telafisini tamamladı│ │
|  └───────────────────────────────────────────────────────────────────────────┘ │
|                                                                                 |
|  ┌── Sessiz Çalışma Odası (Study With Me) ────────────────────────────────────┐ │
|  │  [☕ Vize Maratonu Odası #3] • 28 Eczacılık Öğrencisi Odada                │ │
|  │  Odak Blok: 18:42 / 25:00   (Pomodoro Modu)                                │ │
|  │  [ Odaya Sessizce Katıl ] (Mikrofon/kamera yok, sadece ortak odak ritmi)   │ │
|  └───────────────────────────────────────────────────────────────────────────┘ │
|                                                                                 |
|  ┌── Fakülteler Arası Kavram Haritası (Kolektif Zorluk Alanları) ──────────────┐ │
|  │  Türkiye Genelinde Bu Hafta En Çok Yanılınan 3 Kavram:                     │ │
|  │  1. Henderson-Hasselbalch İyon Tuzağı (%42 Yanıt Başarısı)                 │ │
|  │  2. Fenoksibenzamin Yedek Reseptör Eğri Kayması (%38 Başarı)               │ │
|  │  3. Amit vs Ester Lokal Anestezik Hidrolizi (%51 Başarı)                   │ │
|  │  [ Bu 3 Konuyu Hemen Test Et (10 Soru) ]                                   │ │
|  └───────────────────────────────────────────────────────────────────────────┘ │
+---------------------------------------------------------------------------------+
```

---

## Technical Feasibility & Implementation Blueprint

### Summary of Component Architecture

| Feature | Primary Frontend Modules | Backend / Edge Infrastructure | Target Persistence |
| :--- | :--- | :--- | :--- |
| **1. Daily 10 Challenge** | `DailyChallengePage.tsx`, `DailyQuizCard.tsx`, `StreakBadge.tsx` | Supabase Edge Function `daily-scheduler` | `student_daily_streaks`, `public.review_cards` |
| **2. Past-Exam Twin Generator** | `PastExamTwinModal.tsx`, `ClientOcrCanvas.tsx` | Tesseract.js client-side OCR + OpenRouter LLM via Edge Function | `zero-knowledge` (raw deleted, twins in `study_twins`) |
| **3. Misconception Memory** | `MisconceptionRadar.tsx`, `RemediationModal.tsx` | `student-telemetry` Edge Function | `public.student_misconceptions` table |
| **4. Tactile Micro-Tools** | `MolecularBioisostereBench.tsx`, `PathwayFluxNavigator.tsx`, `PkDial.tsx` | Pure client-side WebGL / SVG canvas + RDKit/SmilesDrawer | Local interactive state + telemetry event stream |
| **5. Community Pulse** | `CommunityPulseBar.tsx`, `StudyRoomModal.tsx` | Supabase Realtime Channels (`study-pulse`, `room-{id}`) | Ephemeral Supabase Realtime Presence |

---

*Specification authored and certified by Teamwork Audit & Pedagogy Worker.*
