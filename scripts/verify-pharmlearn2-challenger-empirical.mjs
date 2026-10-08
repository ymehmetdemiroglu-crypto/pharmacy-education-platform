// scripts/verify-pharmlearn2-challenger-empirical.mjs
// Adversarial Empirical Stress Test Harness for PharmLearn 2.0:
// 1. High-Yield Score (HYS_s) Mathematical Rigor & Edge Cases
// 2. Cohort Differential Privacy & k-Anonymity Reconstruction Attacks
// 3. FSEK No. 5846 Turkish Copyright Vulnerability Matrix

console.log('================================================================================');
console.log('   PHARMLEARN 2.0 EMPIRICAL ADVERSARIAL STRESS TEST HARNESS (SPEC 2)            ');
console.log('================================================================================\n');

// ==============================================================================
// 1. HIGH-YIELD SCORE (HYS_s) MATHEMATICAL FORMULATION STRESS TEST
// ==============================================================================
console.log('>>> [TEST 1] HIGH-YIELD SCORE (HYS_s) MATHEMATICAL FORMULATION');

function sigmoid(z) {
  return 1 / (1 + Math.exp(-z));
}

function gammaCal(t, Texam) {
  // Texam and t in days
  const diffDays = Math.max(0, Texam - t);
  return 1.0 + 0.25 * Math.exp(-diffDays / 7.0);
}

function calculateHYS_Literal(C_freq, E_emph, S_struct, M_cohort, t, Texam) {
  const w1 = 0.35, w2 = 0.25, w3 = 0.20, w4 = 0.20;
  const z = w1 * C_freq + w2 * E_emph + w3 * S_struct + w4 * M_cohort;
  const sig = sigmoid(z);
  const gamma = gammaCal(t, Texam);
  return Math.min(100, Math.round(100 * sig * gamma));
}

function calculateHYS_WithMidpoint(C_freq, E_emph, S_struct, M_cohort, t, Texam, z0 = 1.8) {
  const w1 = 0.35, w2 = 0.25, w3 = 0.20, w4 = 0.20;
  const z = w1 * C_freq + w2 * E_emph + w3 * S_struct + w4 * M_cohort;
  const sig = sigmoid(z - z0);
  const gamma = gammaCal(t, Texam);
  return Math.min(100, Math.round(100 * sig * gamma));
}

// 1.1 Zero Factor Extreme Edge Case
console.log('\n--- 1.1 Zero Input Edge Case (Completely Irrelevant Slide) ---');
const hysZero_Literal_Start = calculateHYS_Literal(0, 0, 0, 0, 0, 90);
const hysZero_Literal_Exam = calculateHYS_Literal(0, 0, 0, 0, 90, 90);
console.log(`Literal Formula (C=0, E=0, S=0, M=0, t=0, Texam=90): HYS = ${hysZero_Literal_Start}`);
console.log(`Literal Formula (C=0, E=0, S=0, M=0, t=90, Texam=90): HYS = ${hysZero_Literal_Exam}`);
console.log(`CRITICAL FLAW: Min score is ${hysZero_Literal_Start} at t=0 and ${hysZero_Literal_Exam} at exam time!`);
console.log(`Roadmap spec claims Cool Gray is HYS < 45. Can any slide EVER be Cool Gray? -> ${hysZero_Literal_Start < 45 ? 'YES' : 'NO (IMPOSSIBLE! Cool Gray is 100% dead code!)'}`);

// 1.2 Max Factor Edge Case
console.log('\n--- 1.2 Maximum Input Edge Case (Maximal High-Yield Slide) ---');
// C_freq max = 3.0, E_emph max = 2.5, S_struct max = 2.0, M_cohort max = 2.5
const hysMax_Literal_Start = calculateHYS_Literal(3.0, 2.5, 2.0, 2.5, 0, 90);
const hysMax_Literal_Exam = calculateHYS_Literal(3.0, 2.5, 2.0, 2.5, 90, 90);
console.log(`Literal Formula (Max factors, t=0, Texam=90): HYS = ${hysMax_Literal_Start}`);
console.log(`Literal Formula (Max factors, t=90, Texam=90): HYS = ${hysMax_Literal_Exam}`);

// 1.3 Testing with Midpoint z0 = 1.8 (If formula intended sigma(z - z0))
console.log('\n--- 1.3 Formula with z0 = 1.8 Subtraction ---');
const hysZero_Midpoint_Start = calculateHYS_WithMidpoint(0, 0, 0, 0, 0, 90, 1.8);
const hysMax_Midpoint_Start = calculateHYS_WithMidpoint(3.0, 2.5, 2.0, 2.5, 0, 90, 1.8);
const hysMax_Midpoint_Exam = calculateHYS_WithMidpoint(3.0, 2.5, 2.0, 2.5, 90, 90, 1.8);
console.log(`With z0=1.8 (C=0, E=0, S=0, M=0, t=0): HYS = ${hysZero_Midpoint_Start}`);
console.log(`With z0=1.8 (Max factors, t=0, Texam=90): HYS = ${hysMax_Midpoint_Start}`);
console.log(`With z0=1.8 (Max factors, t=90, Texam=90): HYS = ${hysMax_Midpoint_Exam}`);
console.log(`CRITICAL FLAW: At baseline t=0 (normal semester weeks), a MAXIMUM slide achieves only HYS = ${hysMax_Midpoint_Start}!`);
console.log(`Pillars spec defines CRITICAL_TIER_1 as HYS >= 75. Can a maximal slide reach Tier 1 during regular semester? -> ${hysMax_Midpoint_Start >= 75 ? 'YES' : 'NO (Fails to reach 75!)'}`);

// 1.4 Post-Exam Calendar Behavior (t > Texam)
console.log('\n--- 1.4 Calendar Decay Function γ_cal(t) Behavior Post-Exam ---');
const gammaValues = [
  { t: 0, desc: 'Semester Start (t=0)' },
  { t: 60, desc: '30 Days Before (t=60)' },
  { t: 83, desc: '7 Days Before (t=83)' },
  { t: 89, desc: '1 Day Before (t=89)' },
  { t: 90, desc: 'Exam Day (t=90)' },
  { t: 91, desc: '1 Day AFTER Exam (t=91)' },
  { t: 100, desc: '10 Days AFTER Exam (t=100)' },
  { t: 120, desc: '30 Days AFTER Exam (t=120)' }
];
for (const g of gammaValues) {
  const gamma = gammaCal(g.t, 90);
  console.log(`  ${g.desc.padEnd(28)}: γ_cal = ${gamma.toFixed(5)}`);
}
console.log(`CRITICAL FLAW: After exam date (t > Texam), max(0, Texam - t) = 0!`);
console.log(`γ_cal(t) is PERMANENTLY STUCK AT 1.25000 post-exam instead of decaying back to 1.0!`);

// 1.5 Division by Zero & NaN Tests
console.log('\n--- 1.5 Division by Zero / NaN Vulnerability Tests ---');
// M_cohort formula: 2.5 * (1 - N_correct / N_attempts)
function calculateMcohort(N_correct, N_attempts) {
  if (N_attempts < 10) return 1.25; // per spec
  return 2.5 * (1 - N_correct / N_attempts);
}
console.log(`M_cohort with N_attempts=0 (spec guard): ${calculateMcohort(0, 0)}`);
const unguardedM = 2.5 * (1 - 0 / 0);
console.log(`Unguarded M_cohort with N_attempts=0: ${unguardedM} (Produces NaN!)`);

// Cosine similarity with empty slide vector
function cosineSim(u, v) {
  const dot = u.reduce((acc, val, i) => acc + val * v[i], 0);
  const normU = Math.sqrt(u.reduce((acc, val) => acc + val * val, 0));
  const normV = Math.sqrt(v.reduce((acc, val) => acc + val * val, 0));
  return dot / (normU * normV);
}
const u_empty = [0, 0, 0, 0];
const v_exam = [0.5, 0.2, 0.8, 0.1];
console.log(`Cosine similarity on image/diagram-only slide (zero vector): ${cosineSim(u_empty, v_exam)} (Produces NaN!)`);


// ==============================================================================
// 2. COHORT DIFFERENTIAL PRIVACY & k-ANONYMITY RECONSTRUCTION ATTACK SIMULATION
// ==============================================================================
console.log('\n================================================================================');
console.log('>>> [TEST 2] COHORT DIFFERENTIAL PRIVACY & k-ANONYMITY ATTACK SIMULATION');

// 2.1 Small Cohort Attack (n = 4 < k = 5)
console.log('\n--- 2.1 Small Cohort Sybil / Incremental Join Attack ---');
// Suppose an attacker creates 4 student accounts in an elective cohort (or monitors 4 accounts).
// Attacker answers 0 (correct) for all 4 puppet accounts.
// Ground truth of puppet accounts: x_1 = 0, x_2 = 0, x_3 = 0, x_4 = 0.
// Victim student (n=5) enters and answers x_victim.
// When n=4, display was "Amfi verisi toplanıyor".
// When n=5, aggregate Marmara stats are unlocked and broadcast:
// Suppose the broadcast or API reveals aggregate error count or percentage.
console.log('Simulating Sybil Attack in n=5 cohort:');
console.log('  Attacker controls 4 puppet accounts (x_1=0, x_2=0, x_3=0, x_4=0).');
console.log('  Victim enters as 5th student (n=5 >= k=5 threshold crossed!).');

// 2.2 Randomized Response Reconstruction & Likelihood Ratio
console.log('\n--- 2.2 Randomized Response (ε = 1.0) Likelihood & Posterior Leakage ---');
const epsilon = 1.0;
const p_true = Math.exp(epsilon) / (1 + Math.exp(epsilon)); // P(x_rep = 1 | x = 1) ≈ 0.731
const p_false = 1 / (1 + Math.exp(epsilon));                // P(x_rep = 1 | x = 0) ≈ 0.269

console.log(`Randomized Response Parameters (ε = ${epsilon}):`);
console.log(`  P(Reported=1 | True=1) = ${p_true.toFixed(4)}`);
console.log(`  P(Reported=1 | True=0) = ${p_false.toFixed(4)}`);
console.log(`  Likelihood Ratio = ${(p_true / p_false).toFixed(4)} (equals e^1 = ${Math.exp(1).toFixed(4)})`);

// 2.3 MISCONCEPTION_SURGE Threshold Trigger Leakage Simulation
console.log('\n--- 2.3 MISCONCEPTION_SURGE Broadcast Trigger Attack ---');
// Spec rule: "Condition: Trapped Ratio >= 35% across >= 8 active students"
// Attacker scenario: Study group of N = 8 students.
// Attacker knows that 2 students made errors, 5 students got it right among the 7 peers.
// Error count so far = 2 out of 7 (Ratio = 2/7 = 28.57% < 35%, NO SURGE).
// Now Student 8 (Victim) submits their answer.
// If Student 8 submits Error (1): Count becomes 3/8 = 37.50% >= 35% -> MISCONCEPTION_SURGE FIRES!
// If Student 8 submits Correct (0): Count becomes 2/8 = 25.00% < 35% -> NO SURGE!

const TRIALS = 50000;
let surgeFired_Given_VictimTrue1 = 0;
let surgeFired_Given_VictimTrue0 = 0;

for (let i = 0; i < TRIALS; i++) {
  // Scenario with client-side randomized response:
  // Peer 1, 2 have true=1 -> perturbed bits
  const b1 = Math.random() < p_true ? 1 : 0;
  const b2 = Math.random() < p_true ? 1 : 0;
  // Peers 3..7 have true=0 -> perturbed bits
  let peerCount = b1 + b2;
  for (let j = 3; j <= 7; j++) {
    peerCount += Math.random() < p_false ? 1 : 0;
  }
  
  // Victim is True Error (1)
  const victimPerturbed_1 = Math.random() < p_true ? 1 : 0;
  const total_1 = peerCount + victimPerturbed_1;
  if (total_1 / 8 >= 0.35) surgeFired_Given_VictimTrue1++;
  
  // Victim is True Correct (0)
  const victimPerturbed_0 = Math.random() < p_false ? 1 : 0;
  const total_0 = peerCount + victimPerturbed_0;
  if (total_0 / 8 >= 0.35) surgeFired_Given_VictimTrue0++;
}

const p_surge_given_1 = surgeFired_Given_VictimTrue1 / TRIALS;
const p_surge_given_0 = surgeFired_Given_VictimTrue0 / TRIALS;
// Assuming neutral prior P(Victim=1) = 0.5
const p_victim1_given_surge = (p_surge_given_1 * 0.5) / (p_surge_given_1 * 0.5 + p_surge_given_0 * 0.5);

console.log(`Empirical Simulation (50,000 trials with background knowledge of 7 peers):`);
console.log(`  P(MISCONCEPTION_SURGE fires | Victim Made Error) = ${(p_surge_given_1 * 100).toFixed(2)}%`);
console.log(`  P(MISCONCEPTION_SURGE fires | Victim was Correct) = ${(p_surge_given_0 * 100).toFixed(2)}%`);
console.log(`  Posterior P(Victim Made Error | MISCONCEPTION_SURGE Received) = ${(p_victim1_given_surge * 100).toFixed(2)}%`);
console.log(`CRITICAL PRIVACY FLAW: The broadcast trigger itself acts as a single-bit leakage channel!`);
console.log(`An adversary observing the broadcast can infer the victim's mistake with ${(p_victim1_given_surge * 100).toFixed(2)}% confidence!`);
console.log(`And if the Edge Function checks TRUE answers without DP noise on the trigger, the confidence is 100.0%!`);


// ==============================================================================
// 3. FSEK NO. 5846 TURKISH COPYRIGHT VULNERABILITY MATRIX
// ==============================================================================
console.log('\n================================================================================');
console.log('>>> [TEST 3] FSEK NO. 5846 TURKISH COPYRIGHT VULNERABILITY ANALYSIS');

const legalChallenges = [
  {
    statute: 'FSEK Art. 22 (Çoğaltma Hakkı)',
    claim: 'Zero server storage immunizes platform from reproduction liability.',
    adversarial_counter: 'FSEK Art. 22 explicitly protects against "geçici veya sürekli olarak çoğaltılması" (temporary or permanent reproduction). Turkey has NO InfoSoc Art 5(1) statutory exemption for transient RAM caching. Furthermore, IndexedDB stores slides for 7 days (expiresAt TTL)!',
    risk: 'CRITICAL',
    verdict: 'VULNERABLE'
  },
  {
    statute: 'FSEK Art. 21 (İşleme Hakkı)',
    claim: 'Platform merely displays interactive widgets; student owns local processing.',
    adversarial_counter: 'Pillar 2 specifically parses copyrighted slide figures and texts into interactive simulations, Anki decks, and Socratic twins. Under FSEK Art. 6 and 21, creating adaptations without author consent is prohibited. Commercial software facilitating this acts as an accomplice (TBK m. 61).',
    risk: 'HIGH',
    verdict: 'VULNERABLE'
  },
  {
    statute: 'FSEK Art. 38 (Şahsen Kullanma)',
    claim: 'Students have statutory right to study slides personally.',
    adversarial_counter: 'Art. 38 applies ONLY to non-commercial natural persons ("kâr amacı güdülmeksizin"). A commercial subscription service (₺250/mo) CANNOT shelter under a student\'s personal use defense. Yargıtay precedents on commercial copy centers and study software consistently reject this defense.',
    risk: 'CRITICAL',
    verdict: 'VULNERABLE'
  },
  {
    statute: 'Past Exam Ontology (Q_faculty / Çıkmış Sorular)',
    claim: 'Cosine similarity C_freq matches slides against past faculty exam database.',
    adversarial_counter: 'To compute C_freq = sum cos(e_s, e_q), the platform MUST store and index authentic faculty exam questions (Q_faculty) in Supabase/pgvector! University exam questions are copyrighted literary works. Storing them on servers without university license constitutes DIRECT copyright infringement under FSEK Art. 71/1-1 (1 to 5 years imprisonment).',
    risk: 'BLOCKER',
    verdict: 'FATAL FLAW'
  }
];

for (const c of legalChallenges) {
  console.log(`\nStatute: ${c.statute}`);
  console.log(`  Platform Defense: ${c.claim}`);
  console.log(`  Adversarial Challenge: ${c.adversarial_counter}`);
  console.log(`  Risk Level: ${c.risk} | Status: ${c.verdict}`);
}

console.log('\n================================================================================');
console.log('   STRESS TEST COMPLETE: 3 MAJOR ARCHITECTURAL FAILURES IDENTIFIED               ');
console.log('================================================================================');
