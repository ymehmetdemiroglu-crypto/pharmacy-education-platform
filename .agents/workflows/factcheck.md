# /factcheck Workflow

## Description
Runs the adversarial fact-check audit on candidate lesson JSON files against the `/materials` source PDFs.

## Execution Steps
1. Target course and lesson specification (e.g., `courses/medchem/lessons/lesson-01.json`).
2. Run build-time content linter:
   ```bash
   pnpm lint:content
   ```
3. For each step:
   - Validate existence of referenced PDF in `/materials/<course>/`.
   - Verify page number and extract text context.
   - Verify SMILES with RDKit parser.
   - Verify formula variables and units.
4. Record audit entry in `/docs/qa/<course>-factcheck.md`.
5. Return Pass/Fail summary with detailed failure breakdown if any discrepancy is found.
