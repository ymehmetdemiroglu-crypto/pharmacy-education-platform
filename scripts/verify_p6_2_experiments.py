"""
Empirical Verification & Stress-Testing Harness for Phase 6 Learning Council Deliverable
Challenger 2: Statistical Power, Roadmap Modeling, and Pharmacological/Chemical Validity
"""

import math
from statistics import NormalDist

nd = NormalDist(mu=0.0, sigma=1.0)

def t_test_power(n_per_arm, effect_size_d, alpha, two_tailed=True):
    """Compute exact asymptotic statistical power for two-sample t-test with equal sample sizes."""
    crit_alpha = alpha / 2.0 if two_tailed else alpha
    z_crit = nd.inv_cdf(1.0 - crit_alpha)
    delta = effect_size_d * math.sqrt(n_per_arm / 2.0)
    power = (1.0 - nd.cdf(z_crit - delta)) + nd.cdf(-z_crit - delta)
    return power

def required_n_for_power(effect_size_d, alpha, target_power=0.80, two_tailed=True):
    """Calculate required sample size per arm for target power."""
    crit_alpha = alpha / 2.0 if two_tailed else alpha
    z_crit = nd.inv_cdf(1.0 - crit_alpha)
    z_beta = nd.inv_cdf(target_power)
    n = 2.0 * ((z_crit + z_beta) ** 2) / (effect_size_d ** 2)
    return math.ceil(n)

def non_inferiority_power(n_per_arm, margin_delta, sigma, alpha=0.05, true_diff=0.0):
    """Compute power for two-sample non-inferiority test (one-sided alpha)."""
    z_crit = nd.inv_cdf(1.0 - alpha)
    se = sigma * math.sqrt(2.0 / n_per_arm)
    z_stat = (true_diff + margin_delta) / se
    power = 1.0 - nd.cdf(z_crit - z_stat)
    return power, se

def non_inferiority_required_n(margin_delta, sigma, alpha=0.05, target_power=0.80, true_diff=0.0):
    """Compute required n per arm for non-inferiority."""
    z_alpha = nd.inv_cdf(1.0 - alpha)
    z_beta = nd.inv_cdf(target_power)
    n = 2.0 * ((z_alpha + z_beta) ** 2) * (sigma ** 2) / ((margin_delta + true_diff) ** 2)
    return math.ceil(n)

print("=" * 80)
print("1. EMPIRICAL EVALUATION OF 5 VALIDATION EXPERIMENTS")
print("=" * 80)

# Experiment 1: CON-028 Predict-Then-Reveal
# N=200 total (100/arm), alpha=0.01 (stated in report p < 0.01), d=0.50
p1_ideal = t_test_power(100, 0.50, alpha=0.01, two_tailed=True)
p1_att20 = t_test_power(80, 0.50, alpha=0.01, two_tailed=True)
p1_att30 = t_test_power(70, 0.50, alpha=0.01, two_tailed=True)
p1_att40 = t_test_power(60, 0.50, alpha=0.01, two_tailed=True)
p1_mod_d = t_test_power(100, 0.35, alpha=0.01, two_tailed=True)
p1_req_ideal = required_n_for_power(0.50, alpha=0.01, target_power=0.80)
p1_req_mod = required_n_for_power(0.35, alpha=0.01, target_power=0.80)

print(f"Exp 1 (CON-028) N=100/arm, alpha=0.01, d=0.50:")
print(f"  - Nominal Power: {p1_ideal*100:.2f}% (Req N/arm for 80%: {p1_req_ideal}, Total: {p1_req_ideal*2})")
print(f"  - Power with 20% delayed attrition (N=80/arm): {p1_att20*100:.2f}%")
print(f"  - Power with 30% delayed attrition (N=70/arm): {p1_att30*100:.2f}%")
print(f"  - Power with 40% delayed attrition (N=60/arm): {p1_att40*100:.2f}%")
print(f"  - Power if true effect is moderate (d=0.35, N=100/arm): {p1_mod_d*100:.2f}% (Req N/arm: {p1_req_mod})")

# Experiment 2: CON-001 Spaced Retrieval Scheduler
# N=240 total (120/arm), Non-inferiority margin Delta = 3%, 20-item exam
print(f"\nExp 2 (CON-001) Non-inferiority Test (Delta=3.0%, N=120/arm, alpha=0.05):")
for sigma in [8.0, 10.0, 12.0, 15.0]:
    p2, se2 = non_inferiority_power(120, margin_delta=3.0, sigma=sigma, alpha=0.05, true_diff=0.0)
    req_n = non_inferiority_required_n(margin_delta=3.0, sigma=sigma, alpha=0.05, target_power=0.80)
    print(f"  - Sigma = {sigma:4.1f}%: SE = {se2:5.3f}%, Power = {p2*100:5.2f}%, Req N/arm for 80% = {req_n} (Total N = {req_n*2})")

# Experiment 3: CON-070 Henderson-Hasselbalch Chamber
# N=180 total (90/arm), report sets alpha < 0.001, d=0.65
p3_ideal = t_test_power(90, 0.65, alpha=0.001, two_tailed=True)
p3_mod_d = t_test_power(90, 0.50, alpha=0.001, two_tailed=True)
p3_std_a = t_test_power(90, 0.50, alpha=0.05, two_tailed=True)
p3_req_001 = required_n_for_power(0.65, alpha=0.001, target_power=0.80)
print(f"\nExp 3 (CON-070) N=90/arm, alpha=0.001:")
print(f"  - Power at d=0.65, alpha=0.001: {p3_ideal*100:.2f}% (Req N/arm for 80%: {p3_req_001})")
print(f"  - Power at d=0.50, alpha=0.001: {p3_mod_d*100:.2f}% (RISK: Underpowered for moderate effect at alpha=0.001)")
print(f"  - Power at d=0.50 with standard alpha=0.05: {p3_std_a*100:.2f}%")

# Experiment 4: CON-031 3-Tier Hint Ladder
# N=160 total (80/arm), alpha=0.01, d=0.50
p4_near = t_test_power(80, 0.50, alpha=0.01, two_tailed=True)
p4_small = t_test_power(80, 0.35, alpha=0.01, two_tailed=True)
p4_req = required_n_for_power(0.50, alpha=0.01, target_power=0.80)
print(f"\nExp 4 (CON-031) N=80/arm, alpha=0.01:")
print(f"  - Power for near-transfer (d=0.50): {p4_near*100:.2f}% (Req N/arm for 80%: {p4_req})")
print(f"  - Power for moderate effect (d=0.35): {p4_small*100:.2f}%")
print(f"  - TAUTOLOGICAL METRIC: Arm A enforces a 5s/10s timer, making <3s requests physically impossible!")

# Experiment 5: CON-067 Bioisosteric Workbench
# N=150 total (75/arm), report sets alpha < 0.001, d=0.55
p5_ideal = t_test_power(75, 0.55, alpha=0.001, two_tailed=True)
p5_std_a = t_test_power(75, 0.55, alpha=0.05, two_tailed=True)
p5_req_001 = required_n_for_power(0.55, alpha=0.001, target_power=0.80)
p5_req_05 = required_n_for_power(0.55, alpha=0.05, target_power=0.80)
print(f"\nExp 5 (CON-067) N=75/arm, alpha=0.001, d=0.55:")
print(f"  - CRITICAL DEFECT: Statistical Power at alpha=0.001 is ONLY {p5_ideal*100:.2f}%!")
print(f"  - False Negative Risk (Type II Error): {100.0 - p5_ideal*100:.2f}%!")
print(f"  - Required N per arm for 80% power at alpha=0.001: {p5_req_001} (Total N = {p5_req_001*2})")
print(f"  - Power if alpha were standard 0.05: {p5_std_a*100:.2f}% (Req N/arm: {p5_req_05})")

print("\n" + "=" * 80)
print("2. ROADMAP & RESOURCE BOTTLENECK MODELING")
print("=" * 80)
total_participants = 200 + 240 + 180 + 160 + 150
print(f"Total Student Participants Required Across 5 Experiments: {total_participants}")
avg_class_size = 100
participation_rate = 0.25
students_per_fac = avg_class_size * participation_rate
required_faculties = math.ceil(total_participants / students_per_fac)
print(f"Faculty Cohort Model (avg class {avg_class_size}, {participation_rate*100:.0f}% opt-in):")
print(f"  - Recruitable students per university faculty: ~{students_per_fac:.0f}")
print(f"  - Required Pharmacy Faculties to partner: {required_faculties}")
print(f"  - Concurrency Contention: Exp 4 (2 weeks) and Exp 5 (3 weeks) both scheduled in Days 31-60.")
print(f"  - Attrition & Cross-Contamination Risk: High if students participate in multiple concurrent pilots.")

total_modules = 22
lessons_per_mod = 3
total_lessons = total_modules * lessons_per_mod
stages_per_lesson = 12
total_steps = total_lessons * stages_per_lesson
total_hints = total_steps * 3
days_avail = 60 # Days 31-90
print(f"\nCurriculum Authoring Throughput Analysis:")
print(f"  - Modules: {total_modules}")
print(f"  - Total Lessons (assuming 3 per module): {total_lessons}")
print(f"  - Total 12-Stage Pedagogical Steps: {total_steps}")
print(f"  - Total Hint Tiers (3 per problem): {total_hints}")
print(f"  - Authoring Rate Required (Days 31-90, 60 days): {total_steps / days_avail:.1f} steps/day")
print(f"  - Hint Ladders Required per day: {total_hints / days_avail:.1f} hint tiers/day")

print("\n" + "=" * 80)
print("3. PHARMACOLOGICAL & CHEMICAL VALIDITY CALCULATIONS")
print("=" * 80)

pKa = 3.5
def hh_acid(pH, pKa):
    ratio = 10.0 ** (pH - pKa) # [A-] / [HA]
    pct_ionized = (ratio / (1.0 + ratio)) * 100.0
    pct_unionized = (1.0 / (1.0 + ratio)) * 100.0
    return ratio, pct_ionized, pct_unionized

print("Henderson-Hasselbalch for Salicylate (pKa = 3.5):")
for ph in [1.5, 5.5, 7.0, 7.4, 8.0]:
    r, ionized, unionized = hh_acid(ph, pKa)
    print(f"  - pH {ph:3.1f}: [A-]/[HA] = {r:10.4f} | Ionized (A-): {ionized:8.5f}% | Unionized (HA): {unionized:8.5f}%")

r_55, ion_55, union_55 = hh_acid(5.5, pKa)
r_80, ion_80, union_80 = hh_acid(8.0, pKa)
ratio_reabsorption_reduction = union_55 / union_80
print(f"\nClinical Trapping Analysis (Salicylate Toxicity):")
print(f"  - Baseline urine pH 5.5 is ALREADY {ion_55:.2f}% ionized!")
print(f"  - At pH 8.0, salicylate is {ion_80:.5f}% ionized (99.997%), NOT 99.97% (which is pH 7.0)!")
print(f"  - Reabsorbable HA drops from {union_55:.4f}% to {union_80:.6f}% -> Factor of {ratio_reabsorption_reduction:.1f}x reduction!")
print(f"  - Finding: Report claims 'Alkalinize urine to trap >99% of salicylate' which obscures that baseline pH 5.5 is already 99.01% ionized!")

print("\nAtenolol Chemical Verification:")
print("  - IUPAC: 2-[4-[2-hydroxy-3-(propan-2-ylamino)propoxy]phenyl]acetamide")
print("  - Para (4-position) substituent: Acetamide / carbamoylmethyl (-CH2-CONH2)")
print("  - Finding: Called '4-amidoethoxy moiety' in CON-031 line 159 (Chemical nomenclature error).")

print("\nDale's Vasomotor Reversal Verification:")
print("  - Report description (line 67): 'receives IV epinephrine followed immediately by an alpha-1 blocker (phentolamine)'")
print("  - Finding: Classic Dale's reversal requires alpha-blocker PRE-TREATMENT. Administering epinephrine first causes acute hypertensive surge.")
