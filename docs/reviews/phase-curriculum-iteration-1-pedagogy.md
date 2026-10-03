# Independent Pedagogy & Content Review Report

**Phase**: Curriculum & Content Audit  
**Iteration**: 1  
**Role**: Pedagogy & Content Critic Subagent  
**Date**: October 2, 2026  
**Final Verdict**: **FAIL** (3 P0 Blockers, 52 P1 Critical Findings, 0 P2 Findings)

---

## 1. Executive Summary

An independent pedagogical, structural, and factual audit was performed across all 22 interactive lessons (10 Medicinal Chemistry lessons in `courses/medchem/lessons/` and 12 Pharmacology lessons in `courses/pharmacology/lessons/`).

The audit evaluated 5 core pedagogical criteria:
1. **12-Stage Mastery Progression**: Canonical 12-stage cognitive sequence (`hook` $\to$ `mastery_check`).
2. **Predict-First & Predict-Then-Reveal Mechanics**: Mandatory `predictThenReveal: true` on Step 1 (`hook`).
3. **3-Tier Scaffolded Hint Ladders**: Exactly 3 non-generic tiers (`nudge`, `clue`, `solution`) per problem step across English, Turkish, and Arabic.
4. **Cognitive Load Ceiling**: Instructional prompt length $\le 40$ words across `en`, `tr`, and `ar`.
5. **Claim Inventory Tracing & Content String Guard**: Zero forbidden unvetted raw tokens (`'0.01'`, `'1.0'`, `'Chapter'`, `'Ch.'`) and full slide provenance tracing vs `/materials`.

---

## 2. Audit Summary Table

| Focus Area | Status | Findings Summary |
| :--- | :---: | :--- |
| **1. 12-Stage Mastery Progression** | **PASS** | 100% of 22 lessons contain exactly 12 steps matching canonical stage sequence. |
| **2. Predict-First Mechanics** | **FAIL (P0)** | 3 lessons have `predictThenReveal: false` on Step 1 (`hook`). |
| **3. 3-Tier Hint Ladders** | **PASS** | All interactive and evaluation steps contain complete 3-tier localized hint ladders. |
| **4. Cognitive Load Ceiling ($\le 40$ words)** | **PASS** | 100% of step prompts across `en`, `tr`, `ar` meet the $\le 40$-word ceiling. |
| **5. Claim Inventory & String Guard** | **FAIL (P1)** | 52 instances of forbidden unvetted raw tokens (`0.01`, `1.0`) in student content. |

---

## 3. Detailed Findings

### 3.1 P0 Blockers (Fatal Violations)

1. **`courses/medchem/lessons/lesson-01.json:143`**
   - **Category**: Predict-then-reveal Mechanics
   - **Issue**: Step 1 (`mc-mod1-les1-step-01`, stage `hook`) sets `"predictThenReveal": false`.
   - **Violation**: Violates Section 1 of `.agents/rules/curriculum-authoring-invariants.md` (Predict-First Mandate). Step 1 must compel active student prediction before revealing explanation.
   - **Action Required**: Change `"predictThenReveal": false` to `"predictThenReveal": true`.

2. **`courses/pharmacology/lessons/lesson-11.json:80`**
   - **Category**: Predict-then-reveal Mechanics
   - **Issue**: Step 1 (`pharm-mod6-les1-step-01`, stage `hook`) sets `"predictThenReveal": false`.
   - **Violation**: Violates Section 1 of `.agents/rules/curriculum-authoring-invariants.md` (Predict-First Mandate).
   - **Action Required**: Change `"predictThenReveal": false` to `"predictThenReveal": true`.

3. **`courses/pharmacology/lessons/lesson-12.json:80`**
   - **Category**: Predict-then-reveal Mechanics
   - **Issue**: Step 1 (`pharm-mod6-les2-step-01`, stage `hook`) sets `"predictThenReveal": false`.
   - **Violation**: Violates Section 1 of `.agents/rules/curriculum-authoring-invariants.md` (Predict-First Mandate).
   - **Action Required**: Change `"predictThenReveal": false` to `"predictThenReveal": true`.

---

### 3.2 P1 Critical Findings (Content Guard Violations)

The Content String Guard (`scripts/claim-inventory.mjs`) scans all student-facing text for forbidden unvetted raw float/citation tokens (`'0.01'`, `'1.0'`, `'Chapter'`, `'Ch.'`). 52 unvetted tokens were identified:

1. **`courses/medchem/lessons/lesson-02.json:694`**
   - **Category**: Claim Inventory Guard
   - **Issue**: 5 occurrences of forbidden unvetted token `"0.01"` in step options/feedback text.
   - **Action Required**: Register numeric claim in `numericClaims` inventory registry or convert to explicit structured parameter.

2. **`courses/medchem/lessons/lesson-02.json:1081`**
   - **Category**: Claim Inventory Guard
   - **Issue**: 1 occurrence of forbidden unvetted token `"1.0"` in student-facing explanation.
   - **Action Required**: Clean raw decimal token or map to claim registry.

3. **`courses/medchem/lessons/lesson-04.json:918`**
   - **Category**: Claim Inventory Guard
   - **Issue**: 1 occurrence of forbidden unvetted token `"1.0"`.
   - **Action Required**: Clean raw decimal token or map to claim registry.

4. **`courses/pharmacology/lessons/lesson-03.json:85`**
   - **Category**: Claim Inventory Guard
   - **Issue**: 2 occurrences of forbidden unvetted token `"1.0"`.
   - **Action Required**: Clean raw decimal token or map to claim registry.

5. **`courses/pharmacology/lessons/lesson-04.json:81`**
   - **Category**: Claim Inventory Guard
   - **Issue**: 35 occurrences of forbidden unvetted token `"1.0"` across step configurations and distractors.
   - **Action Required**: Clean raw decimal tokens or map to claim registry.

6. **`courses/pharmacology/lessons/lesson-06.json:484`**
   - **Category**: Claim Inventory Guard
   - **Issue**: 8 occurrences of forbidden unvetted token `"1.0"`.
   - **Action Required**: Clean raw decimal tokens or map to claim registry.

---

## 4. Verification & Recommendations

1. **Immediate Remediation**:
   - Fix all 3 P0 blockers by setting `"predictThenReveal": true` on step 1 of `medchem/lesson-01.json`, `pharmacology/lesson-11.json`, and `pharmacology/lesson-12.json`.
   - Remediate all 52 forbidden raw decimal strings in student-facing content to pass the `claim-inventory.mjs` content guard.
2. **Re-Run Verification**:
   - Execute `node scratch/run_full_critic_audit.mjs` and `node scripts/claim-inventory.mjs` to verify zero remaining P0/P1 findings.
   - Re-generate client data via `node scripts/generate-all-client-lessons.mjs`.

---

**Report Authored By**: Pedagogy & Content Critic Subagent  
**Status**: Signed Off (Verdict: FAIL)
