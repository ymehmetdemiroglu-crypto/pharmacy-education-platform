# Pricing Analysis & Commercial Monetization Model

## 1. Executive Summary & Objective
The commercial objective is to price the two courses (Medicinal Chemistry and Pharmacology) at a **20% to 30% premium over Brilliant's baseline comparable rate**, while ensuring the pricing is defensible against specialized medical/pharmacy test-preparation competitors and aligned with regional willingness to pay (purchasing power parity).

---

## 2. Brilliant Baseline Verification & Scope Comparison

### 2.1 Brilliant US Pricing Benchmark (Verified September 2026)
- **Source**: Brilliant official subscription portal & published documentation.
- **Current Standard Rates**:
  - **Month-to-Month Plan**: **$29.99 to $30.00 / month** (billed monthly).
  - **Annual Plan**: **$240.00 / year** (effective $20.00 / month, billed as single payment).
- **Target 20% – 30% Premium Band**:
  - **Monthly Target**: $30.00 * 1.20 to 1.30 = **$36.00 to $39.00 / month**.
  - **Annual Target**: $240.00 * 1.20 to 1.30 = **$288.00 to $312.00 / year** ($24.00 to $26.00 / month effective).

### 2.2 Honest Scope Comparison: Brilliant vs. Specialized Pharmacy Platform
| Dimension | Brilliant.org | Our Pharmacy Platform |
| :--- | :--- | :--- |
| **Catalog Breadth** | 40+ broad STEM courses (math, physics, CS, data analysis) | 2 deep, specialized professional courses (MedChem & Pharmacology) |
| **Subject Depth** | Introductory to intermediate foundational intuition | Advanced professional pharmacy curriculum (graduate / licensure level) |
| **Licensure Exam Alignment** | None (General intellectual enrichment) | Direct alignment with high-stakes board exams (EUS, NAPLEX, PEBC, SPLE) |
| **Domain Tools** | Generic logic, slider, and graph puzzles | Specialized chemistry tools (SMILES 2D structure editor, PK multi-compartment simulator, metabolism maps) |
| **Retention Architecture** | Daily general streak puzzles | Automated Leitner spaced repetition with 5 boxes tied directly to drug classes |
| **Value Justification for Premium** | Broad consumer subscription | Direct career & licensing ROI: passing high-stakes board exams on the first attempt |

---

## 3. Competitive Landscape: Pharmacy & Medical Education

We surveyed 5 major comparable specialized education platforms across the US, Europe, Turkey, and the Gulf:

| Platform | Core Focus | Pricing Model | Price Range (USD Equivalent) | Regional Positioning |
| :--- | :--- | :--- | :--- | :--- |
| **UWorld / RxPrep** | NAPLEX / Pharmacy Board Exam Prep | Fixed access tiers (30-day, 90-day, 360-day) | **$999 / year** for full suite ($250 / 90 days) | US standard; very high price, text/qbank heavy |
| **Sketchy** | Visual mnemonic video courses (Pharm, Micro) | Fixed duration passes (6, 12, 24 months) | **~$330 / year** ($220 / 6 months) | Global medical/pharmacy; passive cartoon videos |
| **Osmosis (Elsevier)** | Medical & pharmacy sciences video library + flashcards | Recurring annual subscription | **~$200 – $300 / year** (~$35 / month) | Comprehensive didactic medical library |
| **Lecturio** | Medical/pharmacy video lectures + question bank | Monthly / Annual recurring | **$20 – $35 / month** ($240 / year) | Broad clinical science video lectures |
| **EUSCEPTE / Nettekurs** | Turkish Pharmacy Specialization (EUS) Exam Prep | Modular video & question packages | **₺1,500 – ₺6,000 / course** (~$45 – $175 USD) | Turkey domestic market; video lecture recording format |

---

## 4. Concrete Pricing Options

### Option 1 (Recommended): Tiered Professional Pass (Semester & Annual Focus)
Tailored to university pharmacy semester timelines and licensure exam study cycles.
- **Single Course (MedChem OR Pharmacology)**:
  - Monthly: **$39 / month**
  - Semester Pass (6 Months): **$169 one-time** ($28.16 / mo effective)
  - Annual Pass (12 Months): **$288 / year** ($24.00 / mo effective)
- **Dual Course Bundle (MedChem + Pharmacology All-Access)**:
  - Monthly: **$49 / month**
  - Semester Pass (6 Months): **$229 one-time** ($38.16 / mo effective)
  - Annual Pass (12 Months): **$348 / year** ($29.00 / mo effective)
- **Regional / Purchasing Power Parity (PPP)**:
  - **Turkey (TRY)**: Single Course Monthly = **₺650/mo**; Semester = **₺2,750**; Annual = **₺4,800**. Dual Bundle = **₺850/mo**; Annual = **₺5,900**.
  - **Gulf / Saudi Arabia (SAR)**: Single Course Monthly = **145 SAR/mo**; Annual = **1,080 SAR/yr**. Dual Bundle Annual = **1,300 SAR/yr**.
- **Free Preview Scope**: First 2 lessons in both courses are free forever without credit card.
- **Refund Policy**: 14-day full money-back guarantee if less than 3 paid lessons completed.

### Option 2: Pure Recurring Brilliant-Style Model (Premium Single Price)
Mimics Brilliant's catalog subscription model at the 25% premium mark.
- **All-Access Pass (Both Courses Included)**:
  - Monthly: **$38 / month**
  - Annual: **$300 / year** ($25.00 / month billed annually)
  - Turkey PPP: **₺750 / month** or **₺5,500 / year**
- **Pros**: Simple mental model; maximizes recurring subscription predictability.
- **Cons**: Pharmacy students taking only MedChem in semester 1 may resist paying for both courses upfront.

### Option 3: Perpetual Lifetime / Licensing Model (One-Time Payment)
- **Single Course Lifetime**: **$249 one-time**
- **Dual Course Lifetime**: **$399 one-time**
- **Pros**: Popular among students who dislike recurring SaaS subscriptions.
- **Cons**: High customer acquisition cost hurdle; eliminates recurring revenue stream needed for continuous hosting/AI updates.

---

## 5. Unit Economics & Breakeven Analysis

### 5.1 Variable Infrastructure Costs per Active Student per Month
| Cost Component | Unit Cost / Usage | Estimated Monthly Cost per Active Student |
| :--- | :--- | :--- |
| **Firebase Cloud Hosting** | 100MB static cache reads | $0.015 |
| **Cloud Firestore Reads** | ~300 reads/month (lesson steps + catalog) | $0.002 |
| **Cloud Firestore Writes** | ~50 writes/month (step completions + review queue) | $0.001 |
| **Cloud Functions (Invocations & CPU)** | Auth triggers + entitlement checks | $0.005 |
| **Total Cloud Hosting Infrastructure** | | **~$0.023 / student / month** |
| **Payment Gateway (Dodo Payments)** | ~3.5% + $0.30 per transaction | **~$1.66 on a $39/mo plan** |
| **Net Operational Cost per Active User** | | **~$1.70 / month** |

### 5.2 Margin & Breakeven Threshold
- **Gross Margin**: At $39/month, net revenue after infrastructure and payment fees is **$37.30 (95.6% margin)**. At Turkish PPP (₺650 / ~$19 USD), net margin exceeds **90%**.
- **Breakeven Volume**: Fixed costs for development tooling, domains, and monitoring are ~$100/month. Breakeven is achieved with just **3 active US subscribers** or **6 Turkish PPP subscribers**.

---

## 6. Implementation Strategy & Course Pricing Schema

All final pricing configurations will be maintained exclusively in `/courses/<courseId>/pricing.json`. The user retains final authority to select Option 1, 2, or 3 before launch.
