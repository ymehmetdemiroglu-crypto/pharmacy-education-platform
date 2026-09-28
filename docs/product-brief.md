# Product Brief: Interactive Pharmacy Education Platform

## 1. Product Summary
The Pharmacy Education Platform is a commercial-grade, active-learning web application specifically tailored for undergraduate pharmacy students, licensure candidates (e.g., Turkey EUS, US NAPLEX, Gulf SPLE), and practicing clinical pharmacists. 

Unlike traditional passive video courses (e.g., Osmosis, Lecturio) or generic STEM platforms (e.g., Brilliant), our platform provides **deep, interactive pharmaceutical science mastery** through hands-on chemical structure manipulation, pharmacokinetic simulations, receptor binding mechanics, and clinical vignette challenges.

---

## 2. Target Audience & Personas

1. **Undergraduate Pharmacy Students (Years 2–4)**:
   - Struggling with abstract medicinal chemistry SAR (Structure-Activity Relationships) and pharmacology mechanisms of action.
   - Need intuitive, visual, problem-first explanations to pass university semester exams.
2. **Postgraduate Licensure Candidates (EUS, NAPLEX, PEBC, SPLE)**:
   - Need high-yield retrieval practice, clinical scenario transfer, and spaced repetition to retain drug classes, side effects, and dosing kinetics.
3. **Faculty & Academic Tutors**:
   - Seek curriculum-aligned interactive simulations to assign as pre-lecture active homework.

---

## 3. Core Product Offerings: The Two Courses

### Course A: Medicinal Chemistry (MedChem)
- **Source Material**: University lecture series (`/materials/medchem`).
- **Core Topics**: Chemical bonds in drug-receptor interactions, functional groups & physicochemical properties (pKa, logP, ionization), bioisosterism, drug metabolism (Phase I functionalization & Phase II conjugation), drug isomerism and stereoselectivity.
- **Key Interactivities**: Interactive 2D atom/region selection, bioisosteric substitution comparisons, metabolism soft-spot mapping, solubility prediction curves.

### Course B: Pharmacology
- **Source Material**: University pharmacology curriculum (`/materials/pharmacology`).
- **Core Topics**: Pharmacodynamics (agonists, partial agonists, competitive/non-competitive antagonists, Hill equations, receptor reserve), Pharmacokinetics (ADME, one/two-compartment models, Vd, Clearance, half-life, steady-state regimens), autonomic nervous system pharmacology, cardiovascular therapeutics.
- **Key Interactivities**: Live dose-response curve modulators, multi-compartment PK infusion/bolus simulators, receptor-ligand pairing challenges, mechanism of action pathway builders.

### Cross-Course Interleaving (Bridge Points)
Where domain materials intersect (e.g., how chemical modification of an aryloxypropanolamine beta-blocker affects its beta-1 vs beta-2 selectivity and half-life), the platform provides seamless cross-course bridge cards linking MedChem SAR directly to Pharmacology clinical outcomes.

---

## 4. Key Differentiating Features

- **Problem-First Micro-Steps**: 8–15 interactive screens per lesson, <40 words prose per step, immediate misconception feedback.
- **Interactive Simulation Engine**: RDKit/SmilesDrawer for 2D molecular rendering and mathematical models for live PK and dose-response dynamics.
- **Automated Leitner Spaced Review**: Daily mixed review queue maintaining long-term memory across semesters.
- **Neo-Brutalist Visual System**: High-contrast, distraction-free visual aesthetic optimized for cognitive clarity and mobile thumb-reachability.
- **Freemium Dual Tier**: First 2 lessons in each course are free forever; subsequent lessons unlock via single-course or bundled premium passes.

---

## 5. Technology Stack & Deployment Architecture
- **Frontend SPA**: React 18, TypeScript (Strict), Vite, Tailwind CSS, React Router, TanStack Query, Zustand.
- **Component Libraries**: Custom `@pharmacy/ui` (Neo-brutalist tokens) and `@pharmacy/widgets` (Zod-validated interactive widgets).
- **Backend & Cloud Services**: Google Cloud Platform / Firebase (Authentication, Cloud Firestore, Cloud Functions for Node 20/22, Firebase Hosting with preview channels).
- **Security & Monetization**: Server-authoritative access control (`hasAccess`), paywall state management, and upcoming Dodo Payments webhook integration.
