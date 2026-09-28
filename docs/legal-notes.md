# Legal, Privacy & Compliance Notes

## 1. Intellectual Property & Course Materials Rights Gate (CODIFIED & RESOLVED)

> [!IMPORTANT] **Codified IP Architecture & Private Reference Rule**
> At the Phase 1 Stop Gate, the project owner confirmed: **No written commercial authorization exists for the slide materials.**
> 
> **Operational Status**: RESOLVED & CODIFIED (Phase 1 Gate Decision).
> 
> **Mandatory Operating Rules**:
> 1. **Private Internal Reference Only**: The decks in `/materials/medchem` and `/materials/pharmacology` are classified strictly as private reference material for internal scientific accuracy and curriculum verification. They MUST NEVER be served, bundled, exposed, or made downloadable to end users.
> 2. **100% Original Authorship**: All shipped platform instructional prose, step explanations, multiple-choice distractors, diagnostic questions, hints, and clinical vignettes MUST be authored completely de novo in original wording. No verbatim copying, structural mirroring, or slide paraphrasing is permitted.
> 3. **Native Asset Recreation**: Raw lecture slides, diagrams, and scanned figures must NEVER be embedded or displayed in the platform. All chemical structures are rendered natively via SMILES (validated with SmilesDrawer / RDKit), and all biological pathway diagrams are recreated as native, semantic SVGs.
> 4. **Provenance & Asset Logging**: Every lesson step data schema maintains a verifiable provenance trail (`sources: { file: string; page: number | string }[]`) for internal pedagogical auditing. All recreated structural and conceptual assets are logged in [`/docs/asset-log.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/asset-log.md).
> 5. **Pharmacology Reference Standard**: Pharmacology curriculum structure is synthesized using standard global pharmacology compendia (Katzung's *Basic & Clinical Pharmacology*, Goodman & Gilman's *The Pharmacological Basis of Therapeutics*) as independent pedagogical reference points, anchored on the unique 33-page receptor deck. Every lesson undergoes rigorous `/factcheck` against foundational pharmacology.

---

## 2. Statutory Medical & Educational Disclaimer

Every lesson screen, pharmacokinetic simulator, and application footer MUST prominently display:

```text
STATUTORY MEDICAL EDUCATION DISCLAIMER:
This platform and its interactive simulators are designed solely for pharmacy education and academic training. The materials, drug properties, simulated pharmacokinetic curves, and mechanisms presented do NOT constitute clinical guidance, medical advice, patient diagnosis, or dosing instructions. Healthcare professionals must consult official compendia, clinical guidelines, and drug package inserts before prescribing or administering medications.
```

---

## 3. Data Protection & Privacy Architecture (KVKK & GDPR Compliance)

### 3.1 Regulatory Framework
- **Turkey**: Law on the Protection of Personal Data (KVKK No. 6698).
- **European Union / Global**: General Data Protection Regulation (GDPR).

### 3.2 Key Compliance Implementations
1. **Data Minimization**:
   - Only store `uid`, email, display name, user locale, completed step IDs, quiz attempt scores, and streak data.
   - Do NOT collect national identity numbers (TCKN), phone numbers, or physical addresses unless legally required by tax authorities during paid checkout.
2. **Consent & Cookie Banner**:
   - Explicit opt-in consent for analytics cookies before firing tracking scripts.
3. **Data Subject Rights (Access & Erasure Flow)**:
   - Account deletion button in user settings triggers Cloud Function `deleteUserAccount` which purges the user's Firestore document, progress subcollection, and Firebase Auth record.
   - User data export (`GET /api/user/export`) delivers a JSON bundle containing all stored progress and scores.
4. **Zero PII in Analytics**:
   - Custom analytics events (`lesson_started`, `step_attempted`, `hint_used`) transmit only hashed step IDs and non-identifiable timestamps.

---

## 4. Draft Legal Templates *(Not formal legal advice; requires attorney review)*

### 4.1 Terms of Service (Summary Draft)
- **Grant of License**: Limited, non-exclusive, non-transferable individual license for personal academic study.
- **Restrictions**: Reverse-engineering, automated data scraping, and sharing account credentials to bypass course paywalls are strictly prohibited.
- **Termination**: Accounts found sharing credentials or scraping interactive assets will be terminated without refund.

### 4.2 Refund Policy (Draft)
- **14-Day Money-Back Guarantee**: A full refund will be granted within 14 days of purchase provided the learner has completed fewer than 3 paid lessons.
- **Refund Processing**: Handled automatically via payment processor (Dodo Payments webhook revokes entitlement upon refund).
