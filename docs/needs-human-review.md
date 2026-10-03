# Needs Human Review Log

This registry logs all domain claims, textbook chapter citations, numeric values, and draft localization strings requiring direct confirmation from the project owner before being marked as authoritative.

---

## 1. Textbook Citations Requiring Chapter Confirmation (E1)

> **Policy**: Chapter numbers/titles from model memory must never be published as verified facts. Shipped lesson data records book + edition + topic only, with chapter/page marked `"unverified"`.

| ID | Topic | Cited Work | Claimed Section / Chapter | Status | Owner Action Needed |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CIT-MC01-01** | Thermodynamic Activity & Ferguson's Principle | Lemke & Williams (Eds.), *Foye's Principles of Medicinal Chemistry* (8th ed.) | Chapter 2: Physicochemical Properties in Relation to Biological Action | `unverified` | Verify exact chapter number, title, and page range in physical/institutional copy. |
| **CIT-MC01-02** | Ferguson's Principle of Non-Specific Action | Patrick, G. L., *An Introduction to Medicinal Chemistry* (6th ed.) | Chapter 14: Pharmacokinetics and Related Topics | `unverified` | Confirm chapter number and section heading for Ferguson principle. |
| **CIT-MC01-03** | Physicochemical Properties and Biological Activity | Wermuth, C. G., *The Practice of Medicinal Chemistry* (4th ed.) | Chapter 15: General Principles | `unverified` | Confirm chapter number and page citations. |

---

## 2. Numeric Parameter Thresholds Requiring Confirmation (E2)

> **Policy**: Do not hardcode empirical numeric ranges into lesson content or review flashcards as absolute facts without owner verification. Lesson data sets status to `"pending-human-review"`.

| ID | Parameter | Claimed Value | Lesson Step / Card | Status | Textbook Passage to Verify |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **NUM-MC01-01** | Non-Specific Thermodynamic Saturation Threshold | $a = 0.01\text{–}1.0$ (Relative Saturation $P_t / P_0$ or $S_t / S_0$) | Steps 2–4, Review Card 1 | `pending-human-review` | Verify in *Foye's* / *Patrick* whether the standard thermodynamic activity range for structurally non-specific drugs is quoted as $0.01\text{–}1.0$ or $0.1\text{–}1.0$. |
| **NUM-MC01-02** | Specific Drug Thermodynamic Activity Cutoff | $a < 0.001$ | Step 4, Step 10 | `pending-human-review` | Confirm Ferguson threshold dividing non-specific physical accumulation from stereospecific receptor binding ($a < 10^{-3}$ vs $10^{-4}$). |
| **NUM-MC01-03** | Vapor Pressure Ratio for Ether Anesthesia | $P_t / P_0 \approx 0.03$ | Step 1, Step 9 | `pending-human-review` | Check empirical vapor pressure ratio cited for diethyl ether minimum alveolar concentration (MAC) / biological activity. |
| **NUM-MC01-04** | Activity Divergence Between Specific and Non-Specific Mechanisms | $10^4$ (4 orders of magnitude difference) | Step 8 (Misconception feedback) | `pending-human-review` | Verify in *Foye's* or *Patrick* whether the relative thermodynamic activity difference between stereospecific receptor agonists ($a \sim 10^{-5}$) and non-specific membrane depressants ($a \sim 10^{-1}$) is formally quoted as 4 orders of magnitude ($10^4$). |
| **ILLUS-01** | Diethyl Ether Illustrative Dose | Tens of grams (bulk membrane accumulation) | Step 1 (Hook vignette) | `pending-human-review` | Verify whether ether dosing in inhalation anesthesia should be expressed by concentration (% MAC) rather than bulk mass ('tens of grams'). |
| **ILLUS-02** | Propranolol Illustrative Dose | Milligrams (micromolar to nanomolar) | Step 1 (Hook vignette) | `pending-human-review` | Confirm whether propranolol comparison dose should be retained as illustrative milligrams or stated with specific target plasma concentration. |
| **ILLUS-07** | Contrast Dose Comparison | 10 µg vs 500 mg | Step 8 (Contrast comparison) | `pending-human-review` | Verify illustrative model doses for contrast cases between receptor agonist and membrane depressant. |

---

## 3. Localization Drafts Requiring Native Speaker Review (E4)

> **Policy**: English (EN) is the canonical authoring source. Turkish (TR) and Arabic (AR) strings are high-fidelity drafts that must be audited for native clinical/chemical accuracy. BiDi isolation and chemical notation isolation are verified programmatically.

| ID | Locale | Module / Component | Target Term / Phrase | Status | Verification Focus |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **LOC-TR-01** | Turkish (`tr`) | Lesson 1 Header | "Termodinamik Aktivite ve Ferguson İlkesi" | `draft` | Confirm pharmacological terminology in Turkish EUS curriculum. |
| **LOC-TR-02** | Turkish (`tr`) | Structure Specificity | "Yapısal Olarak Özgül Olmayan / Özgül İlaçlar" | `draft` | Standard Turkish medicinal chemistry textbook phrasing. |
| **LOC-AR-01** | Arabic (`ar`) | Lesson 1 Header | "النشاط الديناميكي الحراري ومبدأ فيرجسون" | `draft` | Native Arabic academic phrasing for thermodynamic activity. |
| **LOC-AR-02** | Arabic (`ar`) | Structure Specificity | "الأدوية غير النوعية بنيوياً مقابل الأدوية النوعية" | `draft` | Pharmacy curriculum terminology in Gulf/Middle Eastern faculties. |
| **LOC-BIDI-01** | Arabic (`ar`) | Chemical Notation | SMILES, $P_t / P_0$, pKa, Kd values | `verified-isolated` | Programmatic LTR wrapper (`dir="ltr"`) verified in Playwright E2E. |

---

## 4. Pedagogical Formative Assessment Decisions (F2)

> **Policy**: Decisions regarding formative interactive mechanics (e.g. click-to-commit vs instant reveal) are documented for owner alignment against `docs/pedagogy-spec.md`.

| ID | Component / Step | Mechanism | Pedagogy Specification Justification | Status |
| :--- | :--- | :--- | :--- | :--- |
| **PED-DEC-01** | Step 5 Concept Checkpoint | Explicit Commit Button (`Check Answer`) required before feedback reveal | In accordance with `docs/pedagogy-spec.md` Section 3 (Predict-Then-Reveal & Deliberate Practice) and Sweller's Cognitive Load Theory, formative assessment checkpoints require the learner to deliberately commit to a chosen hypothesis before diagnostic feedback is unlocked. Instant reveal upon radio selection risks accidental feedback triggers and passive recognition rather than active cognitive retrieval. | `implemented-for-owner-review` |

