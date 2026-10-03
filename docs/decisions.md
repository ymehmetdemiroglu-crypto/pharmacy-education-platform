# Architecture Decision Records (ADRs)

## ADR-001: Dual Course Platform on Shared Infrastructure
- **Context**: Need to deliver two separate commercial-grade courses (Medicinal Chemistry and Pharmacology) for pharmacy students.
- **Decision**: Host both courses in a single unified web platform with independent course catalogs, progress tracking, and pricing configurations, while sharing the Neo-brutalist UI design system, widget library, Firebase authentication, and platform infrastructure.
- **Consequences**: Avoids code duplication across two separate applications while allowing tailored curriculum paths and cross-course concept linking.

---

## ADR-002: Problem-First Active Pedagogy Over Passive Video
- **Context**: Pharmacy students face high failure rates on board exams due to passive consumption of lecture recordings.
- **Decision**: Reject video lecture recordings in favor of an active, bite-sized (8–15 steps), problem-first learning architecture (predict-then-reveal, worked-example fading, immediate misconception feedback, and Leitner spaced repetition).
- **Consequences**: Dramatically improves student conceptual retention and engagement; requires higher upfront authoring rigor and custom interactive widgets.

---

## ADR-003: Neo-Brutalist Visual Design System
- **Context**: Modern medical learning apps often use cluttered or generic corporate interfaces with faint contrast.
- **Decision**: Implement a Neo-Brutalist design language featuring 3–4px solid black borders, hard 6px drop shadows, sharp corners, bold grotesque headings, and vibrant semantic accent blocks (Yellow for hints, Green for correct, Pink for incorrect).
- **Consequences**: Delivers high tactile legibility, WCAG AA compliance, and distinctive brand recognition.

---

## ADR-004: Server-Authoritative Paywall & Firestore Rules
- **Context**: Content must be monetized while offering the first 2 lessons free. Client-side gating is easily bypassed.
- **Decision**: Full paid lesson steps are stored in Firestore `/courses/{courseId}/lessons/{lessonId}` and protected by Firestore Security Rules checking user entitlement records. Client applications have read-only access to entitlements; writes are restricted exclusively to Firebase Cloud Functions.
- **Consequences**: Prevents client-side content leaks and guarantees revenue protection.

---

## ADR-005: Monorepo Structure with Strict Package Boundaries
- **Context**: Platform requires maintainable UI components, interactive widgets, and app logic.
- **Decision**: Structure as a pnpm workspace with `@pharmacy/ui` (pure styling/tokens), `@pharmacy/widgets` (pure interactive simulations), and `@pharmacy/platform` (auth, progress, access control).
- **Consequences**: Enforces clean boundaries, prevents spaghetti imports, and facilitates isolated unit testing.

---

## ADR-006: Runtime Schema Validation with Zod & Build-Time Content Linter
- **Context**: Scientific claims, chemical SMILES, and widget configurations must not degrade or cause runtime errors.
- **Decision**: Validate all widget configs and lesson JSON schemas using Zod. Implement a build-time linter that fails the build if a lesson step lacks valid file/page citations in `/materials`.
- **Consequences**: Guarantees source fidelity and prevents malformed lessons from reaching production.

---

## ADR-007 (Revised): Rejection of $288+ Baseline & Adoption of Student-Accessible Pricing
- **Context**: The original commercial proposal ($39/mo or $288–$312/yr) created an insurmountable pricing barrier for undergraduate pharmacy students and licensure candidates, conflicting with global willingness-to-pay.
- **Decision**: Formally reject Option 1 ($288/yr baseline). Adopt a materially cheaper student pricing architecture proposing three options (Option A Recommended: $14/mo, $49/semester, $89/yr; Option B: $9.99/mo, $39.99/semester, $69.99/yr; Option C: $16/mo, $59/semester, $109/yr) paired with aggressive domestic purchasing power parity (PPP) localization for Turkey (₺250/mo, ₺850/sem, ₺1,450/yr) and the Gulf (55 SAR/mo, 190 SAR/sem, 340 SAR/yr).
- **Consequences**: Maximizes initial student conversion while maintaining >93% gross margins, since variable cloud/AI costs remain under $0.05/student/month.

---

## ADR-008: Merchant of Record (MoR) with Dodo Payments for Global & Turkish Checkout
- **Context**: The platform targets domestic Turkish pharmacy students (EUS candidates) alongside international students (NAPLEX/PEBC). Direct Stripe processing requires multi-jurisdiction tax registration, complex foreign entity management, and suffers high Turkish bank debit card decline rates without 3D Secure domestic routing.
- **Decision**: Adopt Dodo Payments as the primary Merchant of Record. Dodo handles global sales tax/VAT remittance, native 3D Secure processing for Turkish cards, multi-currency display (USD, TRY, SAR, EUR), and published fee schedules (4% + $0.40 base, +1.5% international, +0.5% subscription, +1.5% FX).
- **Turkish Domestic Card & Currency Verification**:
  - Dodo supports direct checkout in TRY and SAR via local currency presentation.
  - Turkish Visa and Mastercard debit/credit cards issued by major domestic banks (İş Bankası, Garanti BBVA, Akbank, Yapı Kredi, Ziraat) process seamlessly via 3D Secure.
  - **Domestic Fallback Protocol**: For local Turkish cards running on the domestic **Troy** payment scheme that may not be supported by international card rails, the platform architecture provides a dedicated localized gateway fallback using **iyzico / Param POS** webhooks mapped into the identical `/users/{userId}/entitlements` schema.
- **Consequences**: Eliminates legal tax filing overhead, ensures high conversion rates for Turkish students, and handles subscription billing and semester passes natively with an explicit fallback path for domestic Troy cards.

---

## ADR-009: Serverless Cloud Functions v2 with Secret Manager & Webhook Idempotency
- **Context**: Entitlement provisioning and checkout creation must be cryptographically secure and tamper-proof while remaining cost-effective with zero baseline server idle charges.
- **Decision**: Implement serverless Cloud Functions v2 (TypeScript on Node 20/22) in `europe-west1` / `europe-west3`. Store payment secrets exclusively in Google Cloud Secret Manager. Enforce transactional webhook idempotency via `/webhook_events/{eventId}` in Cloud Firestore.
- **Consequences**: Prevents double-provisioning replay attacks, guarantees 100% server-authoritative entitlements, and maintains zero idle infrastructure costs during initial phases.

---

## ADR-010: Permanent Freemium Tier & Server-Enforced 7-Day Free Trial
- **Context**: Gating entire courses behind hard paywalls after an introduction discourages students from exploring advanced modules. Requiring credit cards upfront for trials creates trust friction and accidental rebill disputes.
- **Decision**:
  1. Permanent Freemium: Lessons 1 and 2 of **every single module** are free forever, alongside core widgets and Tier 1 nudge hints.
  2. 7-Day Free Trial: Full Premium access granted for 168 hours with zero credit card required. Auto-downgrades to Free on Day 8 with 100% of user progress, XP, and spaced review records preserved.
  3. Server Enforcement: Single trial per account enforced via Cloud Functions Admin SDK and protected Firestore flags (`trialUsed: true`), strictly unmodifiable by clients.
- **Consequences**: Dramatically increases product exposure and student trust while completely preventing trial-looping exploits.

---

## ADR-011: Mandatory Independent Review Loop & Playwright Brave Harness
- **Context**: Self-reviewing author agents suffer from confirmation bias and overlook edge cases, visual defects, and security flaws.
- **Decision**:
  1. No author agent may approve its own work.
  2. Before any STOP gate, spawn 5 fresh-context reviewer subagents (Design Critic, Code Reviewer, Security Reviewer, Content/Pedagogy Reviewer, QA Agent) that document findings in `docs/reviews/<phase>-iteration-<n>-<role>.md` using P0/P1/P2 severities.
  3. Author fixes all P0/P1 issues; fresh reviewer instances re-audit until zero P0/P1 remain (max 4 iterations).
  4. QA executes Playwright against the host's Brave Browser (`C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe`) testing both Shields Default and Shields Off across 13 states, 3 viewports, 2 themes, and 3 locales, inspecting visual screenshots and asserting 0 console errors, 0 failed requests, and axe-core a11y compliance.
- **Consequences**: Guarantees institutional-grade software quality and eliminates undetected regressions before user gate reviews.

---

## ADR-012: Refined Neo-Brutalist Motion System & Performance Budgets
- **Context**: Cluttered or exaggerated animations create cognitive fatigue, layout jank, and nausea in dense scientific learning interfaces.
- **Decision**:
  1. Enforce strict micro-interaction durations of 150–250ms and transitions up to 400ms using `cubic-bezier(0.22, 1, 0.36, 1)`.
  2. Animate `transform` and `opacity` ONLY; strictly ban layout-thrashing properties (`width`, `height`, `margin`, `padding`).
  3. Replace violent screen shakes and distracting confetti with subtle 4px directional micro-shifts and soft color tints.
  4. Obey `prefers-reduced-motion: reduce` by disabling transforms completely.
  5. Enforce Playwright video checks for zero long frames (>50ms) and CLS < 0.05.
- **Consequences**: Delivers crisp, tactile responsiveness without motion sickness or frame rate degradation.

---

## ADR-013: Private Reference IP Protocol & 100% De Novo Authoring
- **Context**: Source lecture slides in `/materials/` lack explicit written commercial copyright clearance.
- **Decision**: Formally classify `/materials/` strictly as private internal reference data. All platform instructional content, problem sets, hints, and explanations MUST be authored 100% de novo. No lecture slides, university figures, or verbatim texts are published. All chemical structures are rendered via native SMILES (RDKit / SmilesDrawer) and diagrams in SVG. Every lesson step logs source citations in `sources: { file, page }` and assets are tracked in `docs/asset-log.md`. Pharmacology curriculum structure is synthesized using standard global pharmacology textbooks (Katzung, Goodman & Gilman) as independent scientific references, anchored on the unique 33-page receptor deck.
- **Consequences**: Eliminates copyright infringement liability while maintaining total scientific fidelity and institutional credibility.

---

## ADR-014: Dedicated Staging Environment & Cost-Safety Budget Guard
- **Context**: Reusing ad-hoc or shared GCP projects (such as `scientific-coil-24dh4`) introduces cross-project blast radiuses, unintended billing, and security confusion.
- **Decision**: Mandate a dedicated Google Cloud staging project (`pharmacy-platform-staging`). Autonomous agents are strictly forbidden from running billing-linked steps. Every staging environment requires an active `$25/month` Cloud Billing Budget Alert with 50%, 80%, and 100% notification thresholds.
- **Consequences**: Guarantees zero billing surprises, prevents multi-tenant interference, and enforces emulator-first verification prior to cloud deployment.

---

## ADR-015: Option A Commercial Pricing Lock & p90 Unit Economics Guard
- **Context**: Verification required that Option A ($14/mo, $49/sem, $89/yr; TRY ₺250/mo; SAR 55/mo) maintains >70% gross margins after accounting for Dodo Payments' fixed per-transaction fee ($0.30) on localized currency transactions and Gemini AI token consumption for a 90th-percentile heavy student.
- **Decision**: Lock Option A as the platform's commercial pricing baseline. Unit economics recomputed under p90 heavy usage (250 AI calls/mo = 250k tokens, 500MB egress, 1500 Firestore reads = $0.090/mo variable cost) and Dodo fees show gross margins between 90.3% (TRY monthly stress-test) and 95.7% (USD annual). Break-even is achieved at 6–15 subscribers for USD and 16–36 subscribers for Turkey PPP.
- **Consequences**: Confirms strong financial solvency (>90% gross margins) while providing ultra-accessible pricing for global pharmacy students.

---

## ADR-016: Single-Thread Test Concurrency & Memory Safety
- **Context**: Running concurrent Vite preview servers, multiple real Brave browser instances, and multiple Vitest worker threads on local Windows development environments caused system commit memory exhaustion (`0xC000012D` / `0x80004005`).
- **Decision**: Configure root `vitest.config.ts` and workspace package configs with single-thread execution (`pool: 'threads'`, `threads: { singleThread: true }`). Configure package script `"test": "pnpm -r --workspace-concurrency=1 run test"`. Constrain emulator JVM heap to `-Xmx256m -Xms64m` in `scripts/run-rules-tests.mjs`.
- **Consequences**: Guarantees deterministic, memory-safe test execution across constrained local developer workstations and CI runners without paging file exhaustion.

---

## ADR-017: Exact Playwright Locators for Multi-Currency & Multi-Locale Testing
- **Context**: In rich internationalized UI testing, short strings such as currency codes (`SAR`, `TRY`) and locale tags (`AR`, `EN`) match substrings in other component titles (e.g. `SAR Explorer`, `Start Lesson`).
- **Decision**: Enforce `{ exact: true }` on all button, link, and label locators for currencies and locales in Playwright test suites (e.g. `page.getByRole('button', { name: 'SAR', exact: true })`).
- **Consequences**: Prevents strict-mode ambiguity crashes and ensures resilient cross-viewport automated testing.

---

## ADR-018: Webhook Cryptographic Verification & Atomic Idempotency
- **Context**: Insecure webhook endpoints can allow forged payments, side-channel timing attacks, or duplicate entitlement grants during network retries.
- **Decision**: In `functions/src/index.ts`, require `x-dodo-signature` header on all inbound webhook requests, compare signatures using constant-time `crypto.timingSafeEqual` over raw request buffers, fail closed in production if `DODO_WEBHOOK_SECRET` is unset, and implement atomic idempotency locks in Cloud Firestore via `db.collection('webhook_events').doc(eventId).create()`. Route updates strictly based on `event.type`.
- **Consequences**: Prevents timing attacks, prevents forged payment events, prevents duplicate replay processing, and ensures tamper-proof user entitlement states.

