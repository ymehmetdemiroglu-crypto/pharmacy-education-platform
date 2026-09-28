---
name: factcheck-lesson
description: Conducts rigorous independent auditing of lesson content against source materials in /materials, verifying claims, chemical structures, equations, and page numbers.
---

# Fact-Check Lesson Skill

## Purpose
Acts as the adversarial content verification gate, guaranteeing that every scientific assertion is factually sound, grounded in source PDFs, and free of hallucinations or copyright infringement.

## Audit Workflow
For every step in a candidate lesson:
1. **Source Cross-Check**:
   - Open cited PDF in `/materials/<course>/`.
   - Navigate to cited `page` / slide number.
   - Confirm that the claim, concept, drug name, or constant matches the source exactly.
2. **Re-phrasing Check**:
   - Compare explanation against source text. Verify zero verbatim sentence copying.
3. **Structure & SMILES Validation**:
   - Validate SMILES string with RDKit syntax checker.
   - Verify atom connectivity, stereochemistry (R/S, E/Z), and chiral centers against source graphic.
4. **Equation Verification**:
   - Check formula algebra, variable units, and physiological constants.
5. **Output Fact-Check Report**:
   - Log audit results to `/docs/qa/<course>-factcheck.md` with Pass/Fail status, exact source page citation, and notes.
   - Any failure halts the release pipeline immediately.
