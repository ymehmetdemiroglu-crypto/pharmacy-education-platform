# /phase-status Workflow

## Description
Quickly checks current milestone and phase progress, open blockers, test pass rates, and next required actions.

## Execution Steps
1. Read current active phase in `AGENTS.md` and `/docs/decisions.md`.
2. Inspect open questions in `/docs/open-questions.md`.
3. Check git branch status and uncommitted changes:
   ```bash
   git status --short
   ```
4. Output concise summary:
   - **Current Phase**: [Phase Number & Name]
   - **Artifacts Completed**: [List of documents/packages ready]
   - **Blockers / Decisions Needed**: [Items requiring user gate approval]
   - **Next Action**: [Immediate next implementation step]
