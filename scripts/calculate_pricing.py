# scripts/calculate_pricing.py
import sys

def calc_tier(name, price_local, period_months, currency, fx_to_usd, dodo_pct=0.035, dodo_fixed_usd=0.30, calls_per_mo=250):
    # price in USD
    price_usd = price_local / fx_to_usd
    # Dodo per transaction fee in USD
    dodo_fee_tx_usd = (price_usd * dodo_pct) + dodo_fixed_usd
    dodo_fee_monthly_usd = dodo_fee_tx_usd / period_months
    
    # Revenue monthly USD
    rev_monthly_usd = price_usd / period_months
    
    # p90 Gemini AI cost: 250 calls/mo @ ~1,000 tokens (800 in / 200 out) = 200k in, 50k out
    # Gemini 1.5/2.0 Flash: $0.075/1M input, $0.30/1M output
    ai_in_cost = (calls_per_mo * 800 / 1_000_000) * 0.075
    ai_out_cost = (calls_per_mo * 200 / 1_000_000) * 0.30
    ai_cost_monthly = ai_in_cost + ai_out_cost  # ~$0.030
    
    # Heavy user p90 cloud infrastructure:
    # Hosting/bandwidth (500MB egress): ~$0.035
    # Firestore (1500 reads, 300 writes): ~$0.015
    # Cloud Functions (300 invocations): ~$0.010
    infra_monthly = 0.060
    total_var_monthly_usd = ai_cost_monthly + infra_monthly
    
    total_cost_monthly_usd = dodo_fee_monthly_usd + total_var_monthly_usd
    net_margin_monthly_usd = rev_monthly_usd - total_cost_monthly_usd
    margin_pct = (net_margin_monthly_usd / rev_monthly_usd) * 100
    
    fixed_platform_overhead_mo = 100.0  # $100/mo
    breakeven_subs = fixed_platform_overhead_mo / net_margin_monthly_usd if net_margin_monthly_usd > 0 else float('inf')
    
    return {
        'tier': name,
        'price_local': price_local,
        'period': period_months,
        'currency': currency,
        'rev_mo_usd': rev_monthly_usd,
        'dodo_mo_usd': dodo_fee_monthly_usd,
        'var_mo_usd': total_var_monthly_usd,
        'net_mo_usd': net_margin_monthly_usd,
        'margin_pct': margin_pct,
        'breakeven': breakeven_subs
    }

plans = [
    # USD Baseline
    ('USD Single Mo', 14.0, 1, 'USD', 1.0),
    ('USD Single Sem', 49.0, 6, 'USD', 1.0),
    ('USD Single Ann', 89.0, 12, 'USD', 1.0),
    ('USD Bundle Mo', 19.0, 1, 'USD', 1.0),
    ('USD Bundle Sem', 69.0, 6, 'USD', 1.0),
    ('USD Bundle Ann', 129.0, 12, 'USD', 1.0),
    # SAR (3.75)
    ('SAR Single Mo (55 SAR)', 55.0, 1, 'SAR', 3.75),
    ('SAR Single Sem (190 SAR)', 190.0, 6, 'SAR', 3.75),
    ('SAR Single Ann (340 SAR)', 340.0, 12, 'SAR', 3.75),
    ('SAR Bundle Mo (75 SAR)', 75.0, 1, 'SAR', 3.75),
    ('SAR Bundle Sem (265 SAR)', 265.0, 6, 'SAR', 3.75),
    ('SAR Bundle Ann (490 SAR)', 490.0, 12, 'SAR', 3.75),
    # TRY (35.0)
    ('TRY Single Mo (250 TL)', 250.0, 1, 'TRY', 35.0),
    ('TRY Single Sem (850 TL)', 850.0, 6, 'TRY', 35.0),
    ('TRY Single Ann (1450 TL)', 1450.0, 12, 'TRY', 35.0),
    ('TRY Bundle Mo (350 TL)', 350.0, 1, 'TRY', 35.0),
    ('TRY Bundle Sem (1150 TL)', 1150.0, 6, 'TRY', 35.0),
    ('TRY Bundle Ann (2100 TL)', 2100.0, 12, 'TRY', 35.0),
    # TRY stress test at FX 40.0
    ('TRY Single Mo (250 TL @ FX40)', 250.0, 1, 'TRY', 40.0),
    ('TRY Single Ann (1450 TL @ FX40)', 1450.0, 12, 'TRY', 40.0),
]

print(f"{'Tier Name':32} | {'Rev/mo':>7} | {'Dodo/mo':>7} | {'Var/mo':>7} | {'Net/mo':>7} | {'Margin%':>7} | {'Break-Even':>10}")
print("-" * 92)
for p in plans:
    r = calc_tier(*p)
    print(f"{r['tier']:32} | ${r['rev_mo_usd']:6.2f} | ${r['dodo_mo_usd']:6.2f} | ${r['var_mo_usd']:6.2f} | ${r['net_mo_usd']:6.2f} | {r['margin_pct']:6.1f}% | {r['breakeven']:8.1f} subs")
