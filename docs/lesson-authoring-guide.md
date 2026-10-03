# Lesson Authoring Guide & Step Construction Protocol

## 1. Overview
This guide provides authors and curriculum agents with a deterministic protocol for constructing interactive pharmacy lessons. Every lesson is an atomic JSON data structure representing an 8–15 step active learning journey.

---

## 2. Step Construction Workflow

1. **Identify the Core Objective**: Every lesson must have exactly one single-sentence objective (e.g., *"Predict how bioisosteric replacement of a carboxylic acid with a tetrazole alters drug lipophilicity and oral bioavailability"*).
2. **Review Source Materials**: Open the corresponding PDF in `/materials/<course>/` and note the relevant pages, equations, and structures.
3. **Map the 12-Stage Anatomy**: Outline the flow from Hook to Recap (see [`/docs/pedagogy-spec.md`](file:///C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/docs/pedagogy-spec.md)).
4. **Select Appropriate Interactive Widgets**:
   - Molecular structure exploration -> `sar_explorer` or `structure_identifier`
   - Receptor dynamics / pharmacology -> `dose_response_curve` or `receptor_ligand_matcher`
   - Clearance / dosing / concentration -> `pk_simulator`
   - Biotransformation pathways -> `metabolism_map` or `mechanism_pathway`
   - Conceptual discrimination -> `predict_reveal`, `concept_checkpoint`, or `clinical_vignette`
5. **Draft Interactive Prompts (<40 words)**: Formulate concise questions prompting active predictions or selections.
6. **Construct the 3-Tier Hint Ladder**:
   - Hint 1: Visual/directional nudge.
   - Hint 2: Fundamental physical/chemical law.
   - Hint 3: Explicit worked solution.
7. **Document Full Provenance**: Record exact file name and page numbers in `sources`.
8. **Draft Misconception Distractors**: For MCQs or multi-select options, write specific counter-explanations for each distractor.

---

## 3. Strict Schema Structure (JSON)

```json
{
  "id": "medchem-bioisosterism-01",
  "courseId": "medchem",
  "moduleId": "mod-02-bioisosterism",
  "title": "Carboxylic Acid Bioisosteres: The Tetrazole Shift",
  "order": 1,
  "access": "free",
  "objective": "Understand how replacing a carboxylic acid with a tetrazole maintains receptor acidity while enhancing lipophilicity.",
  "steps": [
    {
      "id": "step-01-hook",
      "type": "predict_reveal",
      "prompt": "Angiotensin II receptor blockers require an acidic group. Why might chemists replace this -COOH with a 5-membered tetrazole ring?",
      "config": {
        "options": [
          { "id": "a", "label": "To make the drug completely non-ionizable at pH 7.4" },
          { "id": "b", "label": "To preserve negative charge while increasing oral absorption", "correct": true },
          { "id": "c", "label": "To prevent all liver metabolism entirely" }
        ],
        "revealContent": "Tetrazoles possess a similar pKa (~4.5-5.0) to carboxylic acids, maintaining essential ionic receptor contacts, but distribute charge across four nitrogen atoms to dramatically enhance membrane permeability."
      },
      "hints": [
        "Compare the number of nitrogen atoms in a tetrazole with oxygen in a carboxylic acid.",
        "Consider how charge delocalization affects lipophilicity (logP) and cell membrane transit.",
        "Tetrazoles have similar pKa (~4.5) to carboxylic acids, preserving ionization while improving permeability."
      ],
      "feedback": {
        "correct": "Excellent! Tetrazole mimics the carboxylate anion at physiological pH, but its delocalized aromatic system boosts lipophilicity.",
        "incorrect": "Review pKa values. Tetrazoles are acidic, not neutral!",
        "misconceptions": {
          "a": "Tetrazoles actually ionize readily at physiological pH because their conjugate base is resonance-stabilized across 4 nitrogen atoms.",
          "c": "Tetrazoles do not halt hepatic metabolism; in fact, they undergo glucuronidation."
        }
      },
      "sources": [
        { "file": "Biyoizosterizm.pdf", "page": 8 }
      ],
      "verified": false
    }
  ],
  "spacedReviewItems": [
    "card-tetrazole-pka",
    "card-tetrazole-charge-delocalization",
    "card-classical-vs-nonclassical-bioisosteres"
  ],
  "misconceptions": [
    "Confusing tetrazole aromatic nitrogen ring with neutral or basic aliphatic amines",
    "Assuming bioisosterism only preserves physical shape without altering electronic properties"
  ]
}
```

---

## 4. Authoring Pre-Flight Checklist
Before committing any lesson JSON to `/courses/<courseId>/lessons/`:
- [ ] Exactly one clear learning objective defined.
- [ ] Between 8 and 15 interactive steps present.
- [ ] No step prompt exceeds 40 words of prose.
- [ ] No more than 2 "read-only" cards present.
- [ ] Every step has exactly 3 hints ordered by increasing clarity.
- [ ] Every step includes valid `sources` referencing real files in `/materials/`.
- [ ] Every distractor has a misconception explanation.
- [ ] Exactly 3 spaced-review item IDs are designated.
- [ ] Content passes `pnpm lint:content` with 0 errors.
