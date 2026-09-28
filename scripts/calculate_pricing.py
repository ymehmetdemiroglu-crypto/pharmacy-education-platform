#!/usr/bin/env python3
"""
scripts/calculate_pricing.py

Rigorous Unit Economics & Break-Even Modeling for Pharmacy Education Platform.
Complies with official Dodo Payments fee schedule:
- Base: 4.0% + $0.40 per successful transaction
- International cards: +1.5%
- Recurring subscriptions: +0.5%
- Currency conversion / FX payout fee: +1.5%
- Refund / chargeback reserve allowance: 3.0% of gross revenue
- Student usage model: p90 heavy-usage student (250 Gemini AI tutoring calls/mo)
"""

import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# Dodo Fee Schedule Specification (https://www.dodopayments.com/pricing, Retrieved September 2026)
DODO_BASE_PCT = 0.040          # 4.0% base rate
DODO_FIXED_USD = 0.40          # $0.40 per transaction
DODO_INTL_PCT = 0.015          # +1.5% for international payment methods
DODO_SUB_PCT = 0.005           # +0.5% for recurring subscriptions
DODO_FX_PCT = 0.015            # +1.5% cross-border FX / payout conversion
REFUND_CHARGEBACK_PCT = 0.030  # 3.0% allowance for refunds/disputes

# Monthly Fixed Costs (USD)
FIXED_FIREBASE_USD = 25.0      # Firebase Staging & Cloud Functions base
FIXED_DOMAIN_DNS_USD = 5.0     # Domain & SSL DNS management
FIXED_TOOLING_USD = 70.0       # Monitoring, build pipelines, Gemini baseline
TOTAL_FIXED_MONTHLY_USD = FIXED_FIREBASE_USD + FIXED_DOMAIN_DNS_USD + FIXED_TOOLING_USD  # $100.00/mo


def calc_tier(name, price_local, period_months, currency, fx_to_usd, is_sub=True, calls_per_mo=250):
    # Price converted to USD
    price_usd = price_local / fx_to_usd
    rev_monthly_usd = price_usd / period_months
    
    # Determine fee percentage
    is_intl = (currency != 'USD')
    dodo_pct = DODO_BASE_PCT
    if is_intl:
        dodo_pct += DODO_INTL_PCT + DODO_FX_PCT
    if is_sub and period_months in (1, 12):
        dodo_pct += DODO_SUB_PCT
        
    # Transaction fees amortized monthly
    dodo_tx_fee_usd = (price_usd * dodo_pct) + DODO_FIXED_USD
    dodo_fee_monthly_usd = dodo_tx_fee_usd / period_months
    refund_monthly_usd = rev_monthly_usd * REFUND_CHARGEBACK_PCT
    
    # p90 Gemini AI tutoring cost (250 calls/mo @ ~1,000 tokens: 800 in / 200 out)
    # Gemini 1.5/2.0 Flash: $0.075/1M input, $0.30/1M output
    ai_in_cost = (calls_per_mo * 800 / 1_000_000) * 0.075
    ai_out_cost = (calls_per_mo * 200 / 1_000_000) * 0.30
    ai_monthly_usd = ai_in_cost + ai_out_cost  # ~$0.030
    
    # Cloud hosting and Firestore (heavy student)
    infra_monthly_usd = 0.060  # $0.060
    total_var_monthly_usd = ai_monthly_usd + infra_monthly_usd  # $0.090
    
    # Total monthly cost and net contribution
    total_cost_monthly_usd = dodo_fee_monthly_usd + refund_monthly_usd + total_var_monthly_usd
    net_monthly_usd = rev_monthly_usd - total_cost_monthly_usd
    margin_pct = (net_monthly_usd / rev_monthly_usd) * 100.0
    
    # Break-even active subscriber count
    breakeven_subs = TOTAL_FIXED_MONTHLY_USD / net_monthly_usd if net_monthly_usd > 0 else float('inf')
    
    return {
        'tier': name,
        'price_local': price_local,
        'period': period_months,
        'currency': currency,
        'rev_mo_usd': rev_monthly_usd,
        'dodo_mo_usd': dodo_fee_monthly_usd,
        'refund_mo_usd': refund_monthly_usd,
        'var_mo_usd': total_var_monthly_usd,
        'net_mo_usd': net_monthly_usd,
        'margin_pct': margin_pct,
        'breakeven': breakeven_subs
    }


def main():
    plans = [
        # USD Baseline (Domestic)
        ('USD Single Mo', 14.0, 1, 'USD', 1.0, True),
        ('USD Single Sem', 49.0, 6, 'USD', 1.0, False),
        ('USD Single Ann', 89.0, 12, 'USD', 1.0, True),
        ('USD Bundle Mo', 19.0, 1, 'USD', 1.0, True),
        ('USD Bundle Sem', 69.0, 6, 'USD', 1.0, False),
        ('USD Bundle Ann', 129.0, 12, 'USD', 1.0, True),
        # SAR (Gulf PPP, FX 3.75)
        ('SAR Single Mo (55 SAR)', 55.0, 1, 'SAR', 3.75, True),
        ('SAR Single Sem (190 SAR)', 190.0, 6, 'SAR', 3.75, False),
        ('SAR Single Ann (340 SAR)', 340.0, 12, 'SAR', 3.75, True),
        ('SAR Bundle Mo (75 SAR)', 75.0, 1, 'SAR', 3.75, True),
        ('SAR Bundle Sem (265 SAR)', 265.0, 6, 'SAR', 3.75, False),
        ('SAR Bundle Ann (490 SAR)', 490.0, 12, 'SAR', 3.75, True),
        # TRY (Turkey PPP, FX 35.0)
        ('TRY Single Mo (250 TL)', 250.0, 1, 'TRY', 35.0, True),
        ('TRY Single Sem (850 TL)', 850.0, 6, 'TRY', 35.0, False),
        ('TRY Single Ann (1450 TL)', 1450.0, 12, 'TRY', 35.0, True),
        ('TRY Bundle Mo (350 TL)', 350.0, 1, 'TRY', 35.0, True),
        ('TRY Bundle Sem (1150 TL)', 1150.0, 6, 'TRY', 35.0, False),
        ('TRY Bundle Ann (2100 TL)', 2100.0, 12, 'TRY', 35.0, True),
        # TRY Stress Test (FX 40.0 Devaluation)
        ('TRY Single Mo (250 TL @ FX40)', 250.0, 1, 'TRY', 40.0, True),
        ('TRY Single Ann (1450 TL @ FX40)', 1450.0, 12, 'TRY', 40.0, True),
    ]

    print(f"{'Tier Name':30} | {'Rev/mo':>7} | {'Dodo/mo':>7} | {'Ref/mo':>6} | {'Var/mo':>6} | {'Net/mo':>7} | {'Margin%':>7} | {'Break-Even':>10}")
    print("-" * 100)
    for p in plans:
        r = calc_tier(*p)
        print(f"{r['tier']:30} | ${r['rev_mo_usd']:6.2f} | ${r['dodo_mo_usd']:6.2f} | ${r['refund_mo_usd']:5.2f} | ${r['var_mo_usd']:5.2f} | ${r['net_mo_usd']:6.2f} | {r['margin_pct']:6.1f}% | {r['breakeven']:8.1f} subs")

if __name__ == '__main__':
    main()
