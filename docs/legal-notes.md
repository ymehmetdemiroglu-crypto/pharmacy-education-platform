# Legal, Privacy & Compliance Notes

## 1. Intellectual Property & Course Materials Rights Gate (Critical)

> [!WARNING] **Mandatory Commercial Rights Gate**
> The source materials in `/materials/medchem` and `/materials/pharmacology` represent university lecture presentations and academic curriculum slides.
> 
> **Rule**: Before ANY paid course content is deployed to a commercial production environment or offered for sale, the project owner MUST confirm written authorization, license, or copyright clearance from the authors/institutions holding the copyright.
> 
> **Status**: PENDING USER CONFIRMATION AT PHASE 1 GATE.
> 
> **Protection Mechanism**: All platform text, diagrams, and code are written from scratch in original wording. No university slides, diagrams, or verbatim text are published.

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
