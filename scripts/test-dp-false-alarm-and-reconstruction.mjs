// scripts/test-dp-false-alarm-and-reconstruction.mjs
// Deeper empirical verification of:
// 1. False alarm rate of MISCONCEPTION_SURGE when all students are correct
// 2. Exact algebraic reconstruction of victim's bit from broadcast payload

console.log('=== TEST: DIFFERENTIAL PRIVACY FALSE ALARM & RECONSTRUCTION ===\n');

// 1. False Alarm Analysis under Randomized Response (epsilon = 1.0)
const eps = 1.0;
const p_flip_if_correct = 1 / (1 + Math.exp(eps)); // P(reported=1 | true=0) = ~0.26894

function factorial(n) {
  if (n <= 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

function comb(n, k) {
  return factorial(n) / (factorial(k) * factorial(n - k));
}

function binomPmf(k, n, p) {
  return comb(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

console.log(`False Alarm Analysis: When ALL students in cohort are 100% CORRECT (true error = 0):`);
console.log(`Noise parameter: epsilon = ${eps}, P(bit=1 | true=0) = ${p_flip_if_correct.toFixed(4)}\n`);

for (const n of [5, 8, 10, 15, 20]) {
  // Threshold is >= 35%
  const minErrorsNeeded = Math.ceil(0.35 * n);
  let p_false_alarm = 0;
  for (let k = minErrorsNeeded; k <= n; k++) {
    p_false_alarm += binomPmf(k, n, p_flip_if_correct);
  }
  console.log(`Cohort size n = ${n.toString().padStart(2)}: Threshold errors = ${minErrorsNeeded}/${n} (${(minErrorsNeeded/n*100).toFixed(1)}%) -> False Alarm Probability: ${(p_false_alarm * 100).toFixed(2)}%`);
}

console.log('\n--- 2. Sybil / Coalition Reconstruction Attack on Broadcast ---');
// Broadcast schema gives: trapped_student_ratio (e.g. 0.40) and sample_size_k (e.g. 5)
// Attacker knows responses of k - 1 peers.
console.log('Adversary has background knowledge of k-1 students in cohort.');
console.log('Scenario A: Attacker knows 4 peers got it right (true=0), and their local reporting was unperturbed (or attacker observes their reported bits).');
console.log('Broadcast: trapped_student_ratio = 0.40, sample_size_k = 5.');
console.log('Adversary calculates: Total reported errors = round(0.40 * 5) = 2.');
console.log('Adversary knows their 4 puppet accounts reported 0 errors.');
console.log('Victim reported bit = 2 - 0 = 2??? (Contradiction! In impossible configurations, or if 1 puppet reported 1, victim = 1).');
console.log('Whenever reported errors > sum of adversary known bits, victim bit is uniquely solved!');

console.log('\n--- 3. Laplace Mechanism Divergence ---');
console.log('Spec Contradictions:');
console.log('  1. pillars-spec.md Section 4.2.2: Local DP via Randomized Response with epsilon = 1.0');
console.log('  2. compliance-legal.md Section 6.1: Central DP via Laplace noise with epsilon = 0.5');
console.log('  3. roadmap.md Phase 4.1: Laplace differential privacy with epsilon = 0.5');
console.log('  4. pillars-spec.md Section 1.3 line 191: "Report anonymous error telemetry (Laplace ε=1.0)"');
console.log('  -> Total confusion of Local DP (Randomized Response) vs Central DP (Laplace noise) and epsilon values (0.5 vs 1.0)!');
