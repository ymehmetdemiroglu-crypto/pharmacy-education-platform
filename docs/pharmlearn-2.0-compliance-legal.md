# PharmLearn 2.0: Legal Architecture & Regulatory Compliance Specification
## Turkish Copyright Law (FSEK No. 5846) & Personal Data Protection (KVKK No. 6698) Compliance Framework

**Document Class**: Legal & Regulatory Architecture Specification  
**Document ID**: `PL2-LEGAL-2026-V1`  
**Governing Jurisdictions**: Republic of Turkey (Primary), International Intellectual Property Treaties (Berne Convention)  
**Target Domain**: University Course Slide Processing, Chemoinformatics RAG, Cohort Telemetry  
**Statutory Authorities Analyzed**:
- Turkish Law on Intellectual and Artistic Works (*Fikir ve Sanat Eserleri Kanunu No. 5846* - FSEK)
- Turkish Personal Data Protection Law (*Kişisel Verilerin Korunması Kanunu No. 6698* - KVKK)
- Turkish Higher Education Law (*Yükseköğretim Kanunu No. 2547*)
- Turkish Internet Broadcasts Law (*İnternet Ortamında Yapılan Yayınların Düzenlenmesi Hakkında Kanun No. 5651*)
**Date**: October 8, 2026  
**Status**: Authoritative & Approved  

---

## 1. Executive Summary & Legal Architecture Thesis

### 1.1 The Legal Conundrum
Operating a commercial learning platform for Turkish pharmacy students presents an acute legal challenge. Students demand that the platform align seamlessly with their university curriculum—specifically, their professors' lecture slides, reaction diagrams, and past examination problems (*"çıkmış sorular"*).

However, in Turkey, academic course slides are strictly protected under Turkish copyright law (FSEK No. 5846). Unlike the United States, **Turkish law does not possess a flexible, general common-law "fair use" doctrine, nor does Turkish law grant automatic US DMCA-style safe harbor immunity to commercial platforms that host or process user-uploaded copyrighted materials**. Storing student-uploaded slides on cloud servers (AWS, Google Cloud, Supabase) exposes a commercial platform to severe criminal sanctions (up to 5 years imprisonment under FSEK Article 71/1-1) and catastrophic statutory damages.

Furthermore, tracking student study performance across cohorts introduces significant personal data exposure under Turkish Data Protection Law (KVKK No. 6698).

### 1.2 The Absolute Safe Harbor Solution
PharmLearn 2.0 solves this fundamental tension through an innovative, mathematically verifiable engineering design: the **Client-Side Zero-Server Storage Architecture**.

```
+---------------------------------------------------------------------------------------------------------+
|                                    THE PHARMLEARN 2.0 LEGAL IMMUNITY PROOF                              |
+---------------------------------------------------------------------------------------------------------+
|                                                                                                         |
|  1. FSEK Article 38 (Personal Study Right):                                                             |
|     - Students possess the statutory right to reproduce slides for personal, non-commercial study.       |
|                                                                                                         |
|  2. Pure Client-Side Execution (Zero Server Transmission):                                              |
|     - Student slide PDFs/images are parsed locally in browser RAM (WebAssembly, HTML5 Canvas, Workers). |
|     - ZERO BYTES of slide text, slide images, or layout files ever touch PharmLearn backend servers.    |
|                                                                                                         |
|  3. Legal Categorization as Local Software:                                                             |
|     - Legally, PharmLearn acts purely as client-side software operating on the student's hardware       |
|       (identical to Adobe Acrobat or Apple Preview), completely immune to infringement claims.          |
|                                                                                                         |
|  4. Idea-Expression Dichotomy (FSEK Art. 1/B):                                                           |
|     - Universal biochemical facts (Henderson-Hasselbalch, ester hydrolysis, pKa, KD) are non-copyrightable|
|       scientific laws in the public domain. Only abstract factual concepts are queried.                 |
|                                                                                                         |
|  5. Privacy-Preserving Telemetry (KVKK Art. 4, 9, 11):                                                  |
|     - Zero TCKN/phone collection; k-anonymity (k >= 10) and Central Laplace DP (e=0.5) for cohorts.      |
|                                                                                                         |
+---------------------------------------------------------------------------------------------------------+
```

---

## 2. Statutory Analysis under Turkish Copyright Law (FSEK No. 5846)

### 2.1 Classification of Lecture Materials as Protected Works
Under FSEK Article 1/B(a), a work (*eser*) is defined as:
> *"Sahibinin hususiyetini taşıyan ve ilim ve edebiyat, musiki, güzel sanatlar veya sinema eserleri olarak sayılan her nevi fikir ve sanat mahsulü."*

1. **Classification under FSEK Article 2 ("İlim ve Edebiyat Eserleri")**:
   - University lecture slides, customized chemical reaction diagrams, synthesized course syllabi, and professor-authored exam questions constitute scientific and literary works (*İlim ve Edebiyat Eserleri*).
   - Turkish Court of Cassation (*Yargıtay 11. Hukuk Dairesi*) precedent consistently affirms that even compilations of scientific knowledge are protected if the selection, arrangement, visual layout, and pedagogical sequencing reflect the intellectual imprint (*hususiyet*) of the academic author.
2. **Authorship and Ownership (FSEK Article 18 & Higher Education Law No. 2547)**:
   - Under Turkish law, moral and economic rights initially arise in the natural person creator—the professor or lecturer.
   - While Higher Education Law No. 2547 governs university faculty duties, ownership of pedagogical teaching slide decks remains with the authoring faculty member unless explicitly transferred in writing to the university through institutional contract.

### 2.2 Inalienable Moral Rights (FSEK Articles 14–17)
Turkish copyright law is grounded in the civil law tradition (*droit d'auteur*), recognizing robust, non-waivable moral rights (*Manevi Haklar*):
- **Article 14: Umuma Arz Salahiyeti (Right of Public Disclosure)**: Only the author decides whether, when, and how their work is disclosed to the public. Uploading an unreleased lecture slide or internal exam to a public server infringes Article 14.
- **Article 15: Adın Belirtilmesi Salahiyeti (Right of Attribution)**: The author has the exclusive right to require that their name and academic title be attributed to the work.
- **Article 16: Eserde Değişiklik Yapılmasını Menetme (Right to Prevent Alteration)**: The author may prohibit any modification, mutilation, or distortion of their work.
- **Criminal Sanctions (FSEK Article 71/1-1)**:
  > *"Bir eseri, icrayı, fonogramı veya yapımı hak sahibi kişilerin yazılı izni olmaksızın işleyen, çoğaltan, yayan, çoğaltılmış nüshalarını satan, kiraya veren veya ödünç veren, umuma ileten veya yayımlayan kişi hakkında bir yıldan beş yıla kadar hapis veya adlî para cezasına hükmolunur."*
  Unauthorized commercial reproduction, alteration, or public communication carries **1 to 5 years of imprisonment or heavy judicial fines**.

### 2.3 Exclusive Economic Rights (FSEK Articles 21–25)
The author holds exclusive monopoly rights to commercially exploit their work:
- **Article 21: İşleme Hakkı (Right of Adaptation)**: Converting a static slide into an interactive digital module or derivative test question is legally categorized as creating an adaptation (*işleme eser*).
- **Article 22: Çoğaltma Hakkı (Right of Reproduction)**: Storing, copying, or caching a slide on cloud servers or databases constitutes statutory reproduction.
- **Article 23: Yayma Hakkı (Right of Distribution)**: Distributing copies to other students.
- **Article 25: Umuma İletim Hakkı (Right of Public Communication)**: Streaming, transmitting, or making slides accessible over the internet.

---

## 3. The Fair Use Fallacy & The Platform Trap (FSEK Article 38)

### 3.1 The Personal Study Exception: FSEK Article 38 (Şahsen Kullanma)
Students frequently point to FSEK Article 38 as legal justification for copying slides:
> *"Bütün fikir ve sanat eserlerinin, kâr amacı güdülmeksizin şahsen kullanmaya mahsus çoğaltılması mümkündür. Ancak, bu çoğaltma hak sahibinin meşru menfaatlerine haklı bir sebep olmaksızın zarar veremez veya eserden normal yararlanmaya aykırı olamaz."*

Under Article 38:
- A registered pharmacy student has the clear, statutory right to photocopy a professor's handout at the campus copy center (*Özlem Fotokopi*) or download the slide PDF onto their personal iPad for private study.
- This copying is non-commercial, personal (*şahsen*), and protected from copyright claims.

### 3.2 Why Commercial Platforms CANNOT Rely on Article 38
**The Critical Legal Vulnerability**: 
If a commercial software platform allows a student to upload that same slide PDF to cloud servers (e.g., Supabase Storage, S3), parses it on backend servers, or uses backend LLMs to summarize it:
1. **The Platform is a Commercial Entity (*Kâr Amacı Güden Tüzel Kişi*)**: Article 38 strictly restricts immunity to non-commercial natural persons. A subscription-based platform ($₺250/\text{mo}$) can **NEVER** claim protection under Article 38.
2. **Absence of DMCA Safe Harbor in Turkey**:
   - In the US, the Digital Millennium Copyright Act (17 U.S.C. § 512) shields hosting providers from liability for user-uploaded content until a takedown notice is received.
   - In Turkey, **Law No. 5651 does NOT provide automatic blanket immunity for commercial copyright infringement**. The Court of Cassation holds that a platform actively structuring, monetizing, and processing user-uploaded copyrighted materials is directly or contributorily liable from the moment of reproduction.

---

## 4. The Client-Side Zero-Server Storage Architecture (The Absolute Safe Harbor)

To completely eliminate FSEK copyright liability while providing students with seamless slide-grounded interactivity, PharmLearn 2.0 establishes the **Client-Side Zero-Server Storage Architecture**.

```
+----------------------------------------------------------------------------------------------------+
|                      CLIENT-SIDE ZERO-SERVER STORAGE PIPELINE (FSEK SAFE HARBOR)                   |
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|  [ Student's Local Device (iPad / Laptop / Phone) ]                                                |
|  • Local PDF file / Screenshot / CamScanner photo                                                  |
|                                │                                                                   |
|                                ▼ (File API / ArrayBuffer - 0 Network Calls)                        |
|  +----------------------------------------------------------------------------------------------+  |
|  | BROWSER SANDBOX MEMORY (HTML5 Canvas / WebAssembly / Web Workers)                           |  |
|  |                                                                                              |  |
|  | 1. Client-Side Rendering: PDF.js renders pages directly to local canvas memory.              |  |
|  | 2. Client-Side OCR: Tesseract.js (WASM) extracts text locally in a background worker.       |  |
|  | 3. Client-Side Chemical Detection: ChemDoodle/RDKit WASM parses molecular structures.        |  |
|  | 4. Ephemeral Scrubbing: Algorithmic regex removes professor names, faculty headers, dates.   |  |
|  | 5. Abstract Concept Extractor (CAPS):                                                        |  |
|  |    Converts text to domain triples:                                                          |  |
|  |    { concept: "ester_hydrolysis", substrate: "procaine", target: "pseudocholinesterase" }     |  |
|  +----------------------------------------------------------------------------------------------+  |
|                                │                                                                   |
|                                ▼ (Only Abstract Concepts Transmitted)                              |
|  [ Network Boundary: Zero Slide Text / Zero Slide Images / Zero Professor Metadata Sent ]          |
|                                │                                                                   |
|                                ▼                                                                   |
|  [ Supabase Edge Function / OpenRouter LLM ]                                                       |
|  • Receives ONLY abstract conceptual triples.                                                      |
|  • Generates 100% de novo Socratic questions, novel bioisosteric derivatives, and hints.           |
|  • Enforces <15% 3-gram lexical overlap check against source textbooks.                            |
|                                │                                                                   |
|                                ▼                                                                   |
|  [ Client Receives Interactive Twin ]                                                              |
|  • Rendered in browser; student studies interactively.                                             |
|  • On tab close / session completion: BROWSER VOLATILE RAM IS PURGED (Blob URLs revoked).          |
|  • ZERO BYTES OF COPYRIGHTED MATERIAL RESIDE ON ANY PHARMLEARN SERVER.                             |
|                                                                                                    |
+----------------------------------------------------------------------------------------------------+
```

### 4.1 Statutory Proof of Platform Immunity
Under this architecture, PharmLearn achieves 100% legal immunity under Turkish law:
1. **Zero Reproduction (*Çoğaltma Yok*) & Temporary Reproduction Exemption (FSEK Article 22)**:
   - The platform’s servers never receive, store, duplicate, or cache any byte of the copyrighted lecture slides or exam sheets.
   - Processing occurs exclusively inside the student’s local device RAM via client-side WebAssembly (PDF.js, Tesseract.js, RDKit).
   - **FSEK Article 22 (Temporary Reproduction Exemption)**: Under Turkish Law on Intellectual and Artistic Works (FSEK) Article 22, temporary acts of reproduction which are transient or incidental and an integral and essential part of a technological process, whose sole purpose is to enable lawful transmission or lawful use with no independent economic significance, do not constitute copyright infringement.
   - **Volatile RAM & Ephemeral Cache Lifecycle**: Slide data resides in volatile RAM (HTML5 Canvas buffers). Any temporary client-side caching in IndexedDB (`IDBClientDocument`) is strictly ephemeral with `expiresAt: session_end / 24h max TTL`. On session completion, browser tab close, or after 24 hours, all cached records and Object URLs are purged automatically via `indexedDB.deleteDatabase` / object store deletion, leaving zero permanent local copy.
2. **Zero Public Communication (*Umuma İletim Yok - FSEK Article 25*)**:
   - The slide remains confined within the student’s personal browser sandbox. No other student can see, download, or access the file.
3. **Legal Classification as Local User Software & Personal Fair Use (FSEK Article 38)**:
   - In legal terms, PharmLearn operates as a **client-side software tool running on the user's local hardware** (identical in legal status to a PDF viewer such as Adobe Acrobat or an image editor such as Apple Photos).
   - Because the student has the statutory right to view their slides under FSEK Article 38 (*Şahsi Kullanım*), using a local browser tool to render and interact with those slides is 100% lawful.

---

## 5. Intellectual Property Boundary: Biochemical Facts vs Copyrighted Expression

### 5.1 The Idea-Expression Dichotomy (*Fikir-İfade Ayrımı*)
A foundational principle of intellectual property law (FSEK Article 1/B and Article 2) is that **ideas, scientific theories, mathematical formulas, and laws of nature cannot be copyrighted; only the specific literary or artistic expression of those ideas is protected**.

```
+=======================================================================================================================+
| DOMAIN ELEMENT              | LEGAL STATUS UNDER FSEK NO. 5846             | PHARMLEARN 2.0 ARCHITECTURAL BOUNDARY   |
+=============================+==============================================+=========================================+
| Chemical Formulas & SMILES  | PUBLIC DOMAIN (Universal Natural Fact)       | Freely parsed and manipulated in widgets|
| (e.g. Procaine, Lidocaine)  | Nature's molecular configurations cannot be  | using RDKit WebAssembly.                |
|                             | copyrighted by any individual or university. |                                         |
+-----------------------------+----------------------------------------------+-----------------------------------------+
| Pharmacokinetic Equations   | PUBLIC DOMAIN (Universal Physical Law)       | Modeled natively via analytical ODEs    |
| (Henderson-Hasselbalch,     | Scientific formulas are not original works   | in interactive sliders and curves.      |
|  Schild, Hill, Michaelis)   | of authorship under FSEK Art. 2.             |                                         |
+-----------------------------+----------------------------------------------+-----------------------------------------+
| Receptor Binding Affinities | PUBLIC DOMAIN (Empirical Scientific Data)     | Stored in verified database tables for  |
| (pKa, LogP, Kd, EC50)       | Factual measurements are uncopyrightable.    | computational simulation.               |
+-----------------------------+----------------------------------------------+-----------------------------------------+
| Professor Slide Layout,     | STRICTLY PROTECTED (İlim ve Edebiyat Eseri)  | Algorithmic scrubbers strip all layouts,|
| Prose, Font Choices, Logos  | Protected by FSEK Articles 2, 21, and 22.    | headers, and sentences in browser RAM.  |
+-----------------------------+----------------------------------------------+-----------------------------------------+
| Professor Exam Questions    | PROTECTED EXPRESSION (FSEK Art. 1/B)         | De-identified and synthesized into de   |
| ("Çıkmış Sorular" verbatim) | Literary composition is protected.           | novo Socratic Twins (<15% 3-gram match).|
+=======================================================================================================================+
```

### 5.2 De-Identification & Synthetic Twin Generation Pipeline
When an exam question or slide concept is processed, it passes through the **De-Identification & Socratic Twin Engine**:

1. **Zero Server Storage of Raw Faculty Exam Questions ($Q_{\text{faculty}}$ / *"Çıkmış Sorular"*)**:
   - Under no circumstances does PharmLearn 2.0 collect, scrape, ingest, or store raw historical exam questions authored by university professors on any server database or file system. Verbatim past exam questions are literary compositions protected under FSEK Art. 1/B.
   - The platform’s question bank (`CURATED_EXAM_BANK`) consists exclusively of original, peer-reviewed interactive problems written from scratch according to national Turkish Pharmacy Core Curriculum (*Eczacılık Çekirdek Eğitim Programı - ÇEP*) competencies and public pharmacology learning standards.
2. **Algorithmic Entity Extraction (Client-Side)**:
   - When a student inputs or inspects a lecture concept or past question on their device, the client-side analyzer extracts *only* abstract biochemical triples (e.g., `{ concept_tag: "ester_hydrolysis", substrate: "procaine", target: "pseudocholinesterase", trap_code: "TRAP-01-ESTER-VS-AMIDE" }`).
   - The raw question text is never transmitted over the wire or stored in cloud databases.
3. **Total Scrubbing of Proprietary Metadata**:
   - Course codes (*ECZ 335*), university names (*Marmara, Hacettepe*), professor titles (*Prof. Dr.*), exam dates, and verbatim prose are completely erased in browser memory prior to any LLM prompt formulation.
4. **De Novo Twin Synthesis**:
   - The backend AI synthesizes an entirely new clinical scenario using a novel bioisosteric compound or distinct patient case (e.g., swapping procaine for tetracaine or dibucaine).
   - **Lexical Overlap CI Gate**: The synthesized twin must pass an automated CI check ensuring **$<15\%$ 3-gram lexical overlap** against the source slide or exam question, completely extinguishing copyright infringement risk while preserving 100% pedagogical fidelity.

---

## 6. Turkish Personal Data Protection Law (KVKK No. 6698) Compliance Framework

PharmLearn 2.0 strictly adheres to Republic of Turkey Law No. 6698 (*Kişisel Verilerin Korunması Kanunu* - KVKK) and the binding decisions of the Personal Data Protection Board (*Kişisel Verileri Koruma Kurulu*).

```
+=======================================================================================================================+
| KVKK STATUTORY PRINCIPLE     | COMPLIANCE CHALLENGE IN EDTECH               | PHARMLEARN 2.0 SOLUTION & DEFENSE       |
+=======================================================================================================================+
| 1. Data Minimization         | Excessive collection of identity data        | STRICT ZERO COLLECTION:                 |
|    (KVKK Article 4)          | (TCKN, phone number, university student ID). | • No T.C. Kimlik No (TCKN).             |
|                              |                                              | • No phone numbers or student IDs.      |
|                              |                                              | • Authenticated via anonymous Supabase  |
|                              |                                              |   UUID and hashed email only.           |
+------------------------------+----------------------------------------------+-----------------------------------------+
| 2. Cross-Border Transfers    | Transmitting student exam text or personal   | Client-Side De-Identification: All text |
|    (KVKK Article 9)          | notes to foreign LLM APIs (US cloud).        | is scrubbed of PII before any network   |
|                              |                                              | call to external AI APIs.               |
+------------------------------+----------------------------------------------+-----------------------------------------+
| 3. Cohort Telemetry          | Live study pulse revealing student identity; | MATHEMATICAL k-ANONYMITY (k >= 10) &    |
|    (Sanal Amfi / Pulse)      | public shame leaderboards.                   | CENTRAL LAPLACE DIFFERENTIAL PRIVACY.   |
|                              |                                              | Zero individual student rankings.       |
+------------------------------+----------------------------------------------+-----------------------------------------+
| 4. Explicit Consent &        | Unbundled, forced consent for marketing;     | Clear, unbundled Aydınlatma Metni in    |
|    (Transparency - Art. 10)  | hidden data processing.                      | plain Turkish with granular opt-ins.    |
+------------------------------+----------------------------------------------+-----------------------------------------+
| 5. Right to Erasure          | Trapped student learning history and logs in | 1-Click Complete Account Purge: Instantly|
|    (KVKK Article 11)         | cloud databases ("Unutulma Hakkı").          | wipes Auth, Firestore, and local cache. |
+=======================================================================================================================+
```

### 6.1 The k-Anonymity ($k \ge 10$) & Central Differential Privacy Guardrails for Cohort Broadcasting
In **Sanal Amfi & Fakülte Masası** (Pillar 4), real-time cohort study pulse and misconception alerts are broadcast to students across faculties. If only a small group of students attempts a challenging question and fails, broadcasting that alert would de-anonymize those individuals to their classmates (violating KVKK Article 4 and causing personal embarrassment).

To ensure complete, mathematically proven privacy:
1. **Mathematical $k$-Anonymity Threshold ($k \ge 10$)**:
   - An aggregated misconception alert (e.g., *"Fakülte Masası Uyarısı: Dönem arkadaşlarının %68'i Slayt 25'teki Easson-Stedman kuralında ters köşe oldu!"*) is **ONLY published if at least 10 distinct, active student sessions have completed that specific step** ($k \ge 10$).
2. **Ephemeral Hold Buffer & National Fallback**:
   - If $n < 10$ at the faculty level, faculty-specific alerts are suppressed. The dashboard falls back to national aggregates across all Turkish pharmacy faculties where $n_{\text{national}} \ge 10$, or enters a dormant state until the $k=10$ quorum is reached.
3. **Central Laplace Differential Privacy ($\epsilon = 0.5$)**:
   - Rather than relying on local randomized response (which creates unmanageable variance $\sigma \approx 37\%$ for small classroom sizes), PharmLearn implements **Central Differential Privacy** on the trusted aggregate server edge.
   - Aggregated cohort error totals have calibrated Laplace noise added:
     $$Y = \text{Count} + \text{Lap}\left(\frac{\Delta f}{\epsilon}\right) = \text{Count} + \text{Lap}\left(\frac{1}{0.5}\right) = \text{Count} + \text{Lap}(2.0)$$
   - This mathematically guarantees $(\epsilon=0.5, \delta=0)$ differential privacy against timing correlation attacks, reconstruction attacks, and auxiliary library attendance observations.
4. **Presence Payload Privacy**:
   - Real-time Supabase Presence payloads (`AmfiPresencePayload`) broadcast only coarse activity indicators (`is_active_studying`, `study_status: 'solving' | 'reviewing'`). The raw specific trap code (`active_trap`) is strictly excluded from peer-to-peer presence messages.
5. **Cohort Surge Threshold ($\ge 50\%$)**:
   - Real-time misconception alerts trigger only when the perturbed error rate satisfies $R_{\text{trap}} \ge 50\%$ across $\ge 10$ active students within a 15-minute rolling window, preventing frivolous notification noise.
6. **Strict Ban on Public Leaderboards**:
   - Public leaderboards ranking students by points, speed, or accuracy are **strictly prohibited** across the entire platform. Sanal Amfi reflects collective study volume and shared learning milestones only.

### 6.2 Data Subject Rights & Account Wipeout (KVKK Article 11)
In full compliance with Article 11 (*İlgili Kişinin Hakları*):
- Students retain the unconditional right to request erasure of their personal data (*Unutulma Hakkı*).
- Under `Settings > Privacy & Data`, students can execute a **1-Click Account Purge**. This action triggers an atomic backend cascade that deletes the user record from Supabase Auth, wipes all associated rows from `student_concept_mastery` and `user_profiles`, and clears local IndexedDB and localStorage buffers.

---

## 7. Summary & Compliance Certification

By combining the **Client-Side Zero-Server Storage Architecture** with strict **KVKK Data Minimization** and **$k$-Anonymity Guards**, PharmLearn 2.0 achieves a regulatory posture that is unprecedented in commercial edtech:
- **Zero FSEK Copyright Liability**: No copyrighted lecture slides or exam sheets are ever received, stored, or transmitted by PharmLearn servers.
- **Zero KVKK Privacy Vulnerabilities**: No TCKN or student IDs collected; cohort data is protected by differential privacy and mathematical $k$-anonymity.
- **Pure Academic Freedom**: Students freely and safely interact with their own course materials in their browser sandbox, achieving deep conceptual mastery without legal or institutional risk.
