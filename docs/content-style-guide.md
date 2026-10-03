# Content Style Guide: Pharmacy & Medical Chemistry

## 1. Pedagogical Tone & Voice
- **Tone**: Rigorous, encouraging, inquisitive, precise. Speak peer-to-peer with the student as a future pharmacist or medicinal chemist.
- **Problem-First Framing**: Frame statements around mechanisms and causal questions ("What occurs when...", "Notice the electron density at...", "Predict how clearance shifts if...").
- **Conciseness**: Eliminate pedagogical fluff ("In this lesson we will learn...", "As you know..."). Dive straight into the structural or biological challenge.

---

## 2. Bilingual Standards & Language Handling (Turkish / English)
The initial source materials are authored in Turkish academic terminology. To support pharmacy students preparing for both domestic practice/exams (EUS) and international licensure (NAPLEX / PEBC / USMLE), content adheres to strict bilingual rules:

### 2.1 Terminology Mapping Rules
- **Core Drug Names**: Use International Nonproprietary Names (INN / USAN) in English / standard Latinate scientific form (e.g., *Propranolol*, *Morphine*, *Diazepam*, *Omeprazole*). Turkish vernacular names are placed in parentheses where relevant (e.g., *Asetilsalisilik Asit*).
- **Chemical & Functional Groups**: Standard Turkish academic nomenclature paired with international chemical symbols:
  - *Karboksilik asit* / Carboxylic acid (`-COOH`)
  - *Tersiyer amin* / Tertiary amine (`-NR3`)
  - *Fenol* / Phenol (`-OH` on aromatic ring)
  - *Biyoizoster* / Bioisostere
  - *Yapı-Etki İlişkileri (YEİ)* / Structure-Activity Relationships (SAR)
- **Pharmacological Parameters**: Keep standardized international abbreviations in English:
  - $EC_{50}$ (Half maximal effective concentration)
  - $IC_{50}$ (Half maximal inhibitory concentration)
  - $E_{max}$ (Maximal response)
  - $K_d$ (Dissociation constant)
  - $V_d$ (Apparent volume of distribution)
  - $CL$ (Clearance)
  - $t_{1/2}$ (Elimination half-life)
  - $AUC$ (Area under the concentration-time curve)
  - $F$ (Bioavailability fraction)

### 2.2 Internationalization (i18n) Scaffolding
- All strings must be extracted into localized message bundles (`/locales/en.json`, `/locales/tr.json`).
- Dynamic numbers, dates, and decimals must use locale-aware formatters (`Intl.NumberFormat`).

---

## 3. Scientific Notation & Typography Standards

### 3.1 Chemistry & Molecular Notation
- **SMILES Strings**: Formatted strictly in monospaced code blocks (`JetBrains Mono`): `CC(=O)Oc1ccccc1C(=O)O` (Aspirin).
- **Chemical Formulas**: Rendered with proper sub/superscripts: $\text{H}_2\text{O}$, $\text{CO}_2$, $\text{NH}_4^+$.
- **Stereochemistry**: Explicitly denote chiral designations: *(R)*-thalidomide, *(S)*-enantiomer, *cis*/*trans*, *(E)*/*(Z)*. Italicize configurational descriptors.

### 3.2 Pharmacokinetic & Physical Units
- Always specify explicit, standardized units:
  - Concentration: $\mu\text{g/mL}$, $\text{mg/L}$, $\text{nM}$, $\mu\text{M}$.
  - Clearance: $\text{L/h}$, $\text{mL/min}$, $\text{mL/min/kg}$.
  - Volume of Distribution: $\text{L}$, $\text{L/kg}$.
  - Time: $\text{h}$, $\text{min}$.
  - Dose: $\text{mg}$, $\mu\text{g}$, $\text{mg/kg}$.

---

## 4. Writing Misconception Feedback
Feedback after student choices must never simply state "Correct" or "Incorrect":
- **Correct Feedback Pattern**:
  `"[Affirmation] — [Key Mechanistic Rationale in 1-2 sentences]."`
  *Example*: "Correct! The tertiary amine is protonated at physiological pH (7.4), allowing it to form a strong ionic bond with the aspartate residue."
- **Incorrect Feedback Pattern (Misconception Diagnosis)**:
  `"[Acknowledge intuition] -> [Identify false assumption] -> [Provide structural counter-evidence]."`
  *Example*: "Not quite. While methyl groups do increase lipophilicity, here the methyl group introduces steric hindrance that clashes with the pocket, reducing binding affinity 10-fold."
