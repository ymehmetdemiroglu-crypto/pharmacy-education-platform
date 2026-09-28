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

## ADR-007: Premium Commercial Pricing Band (20–30% Above Brilliant)
- **Context**: Need to position the product appropriately against broad general education platforms (Brilliant) and expensive board review suites (UWorld, Sketchy).
- **Decision**: Target the single course at **$39/month** or **$288/year**, and the dual course bundle at **$49/month** or **$348/year**, backed by regional PPP adjustments for Turkey (₺650/mo) and the Gulf (145 SAR/mo).
- **Consequences**: Captures high-margin professional education willingness-to-pay while remaining accessible via student-focused semester passes.

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

