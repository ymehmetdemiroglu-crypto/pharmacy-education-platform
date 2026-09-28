---
name: pricing-analysis
description: Analyzes commercial pricing, evaluates willingness-to-pay across pharmacy student cohorts, builds unit economics models, and maintains course pricing.json configs.
---

# Pricing Analysis Skill

## Purpose
Provides data-driven pricing recommendations positioned at a 20–30% premium over Brilliant's baseline, anchored in professional pharmacy licensure value, clinical outcomes, and regional purchasing power parity (PPP).

## Analysis Workflow
1. **Benchmark Tracking**:
   - Track Brilliant baseline pricing (Verified Sept 2026: $240/yr annual, $30/mo month-to-month).
   - Target 20–30% premium band: $288–$312/year, $36–$39/month.
2. **Competitor Benchmarking**:
   - Compare pricing models of specialized medical/pharmacy platforms (Sketchy: ~$330/yr; Osmosis: ~$200-$300/yr; UWorld RxPrep: $999/yr; Turkish EUS prep: 1,500 - 6,000 TL).
3. **Unit Economics & Margin Calculation**:
   - Calculate infrastructure costs per active user (Firestore reads/writes, Cloud Functions invocations, Cloud Hosting bandwidth).
   - Incorporate payment processor fees (Dodo Payments: ~3-5% + fixed fee).
   - Model subscriber breakeven thresholds.
4. **Configuration Output**:
   - Output pricing schemas to `/courses/<courseId>/pricing.json` (amounts, currencies, intervals, bundle discounts).
   - Never hardcode prices in UI components.
