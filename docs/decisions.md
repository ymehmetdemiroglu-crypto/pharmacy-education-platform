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
- **Decision**: Adopt Dodo Payments as the primary Merchant of Record. Dodo handles global sales tax/VAT remittance, native 3D Secure processing for Turkish cards, multi-currency display (USD, TRY, SAR, EUR), and competitive transaction fees (~3.5% + $0.30).
- **Consequences**: Eliminates legal tax filing overhead, ensures high conversion rates for Turkish students, and handles subscription billing and semester passes natively.

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
