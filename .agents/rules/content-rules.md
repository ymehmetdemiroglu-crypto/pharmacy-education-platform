# Content & Pedagogical Integrity Rules

## 1. Absolute Source Fidelity
- Every chemical fact, mechanism, pharmacological constant (EC50, Kd, pKa, Vd, t1/2), reaction equation, and SAR relationship MUST originate from a documented file and page/slide in `/materials`.
- If an essential bridge concept is missing in the lecture materials:
  - Do NOT hallucinate or fill from general training memory.
  - Insert token: `[NOT IN MATERIALS]`.
  - Log an entry to [`/docs/open-questions.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/open-questions.md) with context, impact on lesson flow, and proposed resolution for human review.

## 2. Mandatory Provenance & Source Metadata
- Every step object in lesson JSON must contain the `sources` array:
  ```json
  "sources": [
    { "file": "Farmasötik ve Medisinal Kimya 1-Giriş.pdf", "page": 14 }
  ]
  ```
- Build-time content linter MUST fail if `sources` is empty or references a non-existent file.
- The end-of-lesson view MUST display a clickable/collapsible "Sources & References" section rendering all cited materials.

## 3. Copyright & Original Expression (No Verbatim Republishing)
- University slides and textbooks are protected intellectual property.
- Verbatim copying of paragraphs, problem statements, or lecture bullet lists is strictly forbidden. All concepts must be rephrased into original instructional explanations.
- NEVER embed raw slide images, textbook screen captures, or photocopied figures.
- Recreate diagrams cleanly using SVG code or interactive widgets.
- Recreate chemical structures programmatically (SMILES strings rendered via RDKit / SmilesDrawer).
- Log every newly rendered graphic or structure in `/docs/asset-log.md`.

## 4. Chemical Structure & Simulation Quality Gates
- **Structure Safety**: All chemical SMILES data must have `verified: false` until verified by domain human expert.
- **Model Disclaimers**: All kinetic simulations (PK, one-compartment models, dose-response curves) must display:
  `"Model Illustration: For educational simulation only. Governed by [Equation Name] from [Source Ref]."`

## 5. Concise Bite-Sized Learning Constraints
- Maximum 40 words of expository text per interactive step (excluding question prompt).
- Pure "read" informational cards are strictly limited to at most 2 per lesson.
- Learning is active: every step must demand an explicit user interaction (prediction, slider adjustment, atom selection, matching) before revealing the full conceptual rationale.
- Explanations must target the specific misconception inherent in the chosen option or input.
