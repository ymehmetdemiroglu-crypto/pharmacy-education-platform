# Agent Playbook & Autonomous Execution Architecture

## 1. Executive Summary & Objective
This playbook formalizes autonomous orchestration principles for the Pharmacy Education Platform development cycle. Operating multi-agent software engineering systems with large language models (specifically Gemini Flash and Gemini Pro in Antigravity) requires strict context management, deterministic contract handoffs, defensive tooling, and rigorous verification gates to eliminate hallucinations, context drift, and silent degradation.

---

## 2. Antigravity & Gemini Core Conventions (Official Standards)

### 2.1 Workspace Architecture
- **Invariable Rules (`.agents/rules/*.md`)**: Rules that are loaded into memory and applied unconditionally to every agent run. They govern coding standards, security, design, and content provenance.
- **Skills (`.agents/skills/<name>/SKILL.md`)**: Specialized domain capabilities with YAML frontmatter (`name`, `description`). Skills encapsulate procedural recipes (e.g., content extraction, widget development, emulator test execution).
- **Workflows (`.agents/workflows/*.md`)**: Deterministic slash-command procedures defining multi-step repeatable operations (`/phase-status`, `/factcheck`, `/deploy-staging`).
- **Artifacts**: Persistent, self-contained documentation objects (implementation plans, task lists, walkthroughs) that communicate state across agent sessions.

### 2.2 Context Window Management & Anti-Drift Policies
- **File System as Primary Memory**: Never depend on conversational LLM chat memory across phases. Chat history compresses and drops subtleties. Write all requirements, schemas, state, and decisions directly to markdown and JSON on disk.
- **Single-Purpose Subagent Isolation**: Subagents are instantiated with narrow, highly scoped objectives (e.g., extracting one PDF, building one widget). They report findings via structured message handoffs and exit cleanly.
- **No Mid-Task Chatter**: Subagents must avoid chatter or interim status reports back to the orchestrator; they execute their instructions, run tests, and emit a single comprehensive final report.

---

## 3. Community Practice Synthesis & Empirical Verification

We analyzed active community findings (r/GoogleAntigravity, r/ChatGPTCoding, r/Bard, r/Firebase, r/webdev) regarding agentic coding with Gemini Flash, cross-referencing each technique against official documentation and empirical software engineering tests.

### 3.1 Adopted Techniques (Justified & Verified)

| # | Technique | Community Source | Official/Secondary Validation | Implementation in this Project |
|---|---|---|---|---|
| 1 | **Contract-First Zod Validation** | r/webdev, r/typescript | Zod official docs; TypeScript Compiler | Every widget config and lesson step payload is schema-validated at runtime. Content linter fails build if invalid. |
| 2 | **Explicit File Pointers Over Broad Walks** | r/GoogleAntigravity | Antigravity Tool Performance Guidelines | Replace recursive directory sweeps with targeted file views and structured indexing (`inventory.md`). |
| 3 | **Two-Tiered Firestore Rules Testing** | r/Firebase | Firebase Security Rules Unit Testing Guide | Automated unit tests on local emulator (`@firebase/rules-unit-testing`) before any deployment. |
| 4 | **Skepticism & Adversarial Verification** | r/ChatGPTCoding | Software Quality Engineering Standards | Independent fact-checking agent audits claims against source PDFs; claims without explicit sources fail. |
| 5 | **Memory-Safe Node Spawns** | Node.js Community | Node V8 Engine Documentation | Set `NODE_OPTIONS="--max-old-space-size=4096"` in build scripts on Windows environments to prevent out-of-memory errors during tooling execution. |
| 6 | **State Isolation via Worktrees** | Git Community | Git SCM documentation | Isolate active feature development within dedicated git worktrees, preventing unstaged conflicts. |

### 3.2 Rejected Techniques (Invalidated or High-Risk)

| Rejected Technique | Claimed Benefit | Reason for Rejection & Evidence |
|---|---|---|
| **Injecting full PDF dumps directly into prompt context** | "Allows model to see all context at once" | **REJECTED**: Massive prompt bloat causes attention degradation, loss of precise slide number citations, and token expense. Ingestion must use chunked concept extraction into structured JSON. |
| **Client-side entitlement checks only (`isAdmin`, `isPaid`)** | "Simplifies frontend routing logic" | **REJECTED (Severe Security Vulnerability)**: Client-side checks are trivially bypassed by users via dev tools. Firestore security rules and server-authoritative entitlements (`hasAccess`) are mandatory. |
| **Using relaxed `any` in TypeScript for rapid widget scaffolding** | "Speeds up initial MVP delivery" | **REJECTED**: Causes fragile widget contracts, silent runtime errors in interactive steps, and broken grading feedback. Strict TypeScript mode enforced. |
| **Relying on LLM self-evaluation without running test commands** | "Saves execution time and tool calls" | **REJECTED**: Models routinely report tests passing when syntax errors or missing exports exist. Direct execution of `pnpm test` and `pnpm test:rules` is non-negotiable. |
| **Dynamic web scraping of paywalled competitors for content ideas** | "Ensures parity with market leaders" | **REJECTED (Legal & Ethical Gate)**: Violates Rule 4 and terms of service. Our pedagogy is grounded exclusively in peer-reviewed learning science and original synthesis of `/materials`. |

---

## 4. Prompting & Orchestration Patterns for Gemini Models

### 4.1 Chain-of-Verification (CoVe) for Medical & Chemical Claims
When extracting or authoring chemical mechanisms:
1. **Draft Step**: Author draft explanation and interaction.
2. **Generate Citation Query**: Extract the specific chemical claim (e.g., "Propranolol has an aryloxypropanolamine scaffold").
3. **Verify Against Source**: Check `/materials/medchem/<file>.pdf` at cited page.
4. **Final Gate**: If verified, set `verified: true`; if not found in lecture slides, mark `[NOT IN MATERIALS]` and escalate to `/docs/open-questions.md`.

### 4.2 Step Word Budget Enforcement
- Gemini models tend to provide complete, thorough explanations that easily exceed 150 words.
- In interactive learning, cognitive overload occurs if explanatory text exceeds 40 words before student action.
- Enforcement: Prompts instruct: *"You have a hard limit of 40 words for the prompt text. Force learning through the widget interaction, not passive reading."* The content linter asserts `prompt.split(' ').length <= 40`.

---

## 5. Firebase Security Rules Pitfalls & Mitigations

1. **Pitfall: Neglecting Create vs. Update Separation**:
   - *Risk*: A rule allowing write might let an authenticated student modify `completedSteps` while also tampering with `masteryScore` or injecting foreign admin fields.
   - *Mitigation*: Enforce `request.resource.data.diff(resource.data).affectedKeys().hasOnly(['completedSteps', 'lastPosition', 'updatedAt'])`.
2. **Pitfall: Recursive or Expensive `get()` Calls**:
   - *Risk*: Rules evaluating multiple `get()` calls per document read explode Firestore billing and hit document evaluation limits.
   - *Mitigation*: Structure lesson documents so `access == 'free'` is evaluated immediately on the lesson document itself without a secondary lookup. Paid lessons evaluate a single `get()` to `/users/$(request.auth.uid)/entitlements/$(courseId)`.
3. **Pitfall: Storage Exhaustion via Unbounded Arrays**:
   - *Risk*: Malicious clients spamming `completedSteps` arrays can expand a document beyond the 1MB Firestore limit.
   - *Mitigation*: Enforce `request.resource.data.completedSteps.size() < 1000`.
