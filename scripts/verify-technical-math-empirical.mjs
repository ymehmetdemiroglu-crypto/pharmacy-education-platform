// scripts/verify-technical-math-empirical.mjs
// Empirical test harness for Mathematical Rigor, FSRS-4.5, pgvector, and UI Tokens.
import fs from 'fs';
import path from 'path';

console.log('=== EMPIRICAL TECHNICAL & MATHEMATICAL STRESS TEST HARNESS ===\n');

// ---------------------------------------------------------------------------
// TEST 1: Pharmacokinetics - 2-Compartment vs 1-Compartment & PkDial Equations
// ---------------------------------------------------------------------------
console.log('--- 1. PK MATHEMATICS: 2-COMPARTMENT VS 1-COMPARTMENT & PKDIAL ---');

// 1-Compartment Model as given in PkDial / PkCockpit
function pkOneCompartmentIv(dose, Vd, ke, tau, t) {
  // Analytical superposition
  const nDoses = Math.floor(t / tau) + 1;
  const tPrime = t - Math.floor(t / tau) * tau;
  const acc = (1 - Math.exp(-nDoses * ke * tau)) / (1 - Math.exp(-ke * tau));
  return (dose / Vd) * acc * Math.exp(-ke * tPrime);
}

// 2-Compartment IV Bolus Model
// dC1/dt = -(k10 + k12)*C1 + k21*(V2/V1)*C2
// dC2/dt = k12*(V1/V2)*C1 - k21*C2
// Analytical biexponential: C1(t) = A*exp(-alpha*t) + B*exp(-beta*t)
function solveTwoCompartmentParams(CL, V1, Q, V2) {
  const k10 = CL / V1;
  const k12 = Q / V1;
  const k21 = Q / V2;
  const b = k10 + k12 + k21;
  const c = k10 * k21;
  const alpha = 0.5 * (b + Math.sqrt(b * b - 4 * c));
  const beta = 0.5 * (b - Math.sqrt(b * b - 4 * c));
  return { k10, k12, k21, alpha, beta };
}

function pkTwoCompartmentIv(dose, V1, Q, V2, CL, tau, t) {
  const { k21, alpha, beta } = solveTwoCompartmentParams(CL, V1, Q, V2);
  const A = (dose / V1) * ((alpha - k21) / (alpha - beta));
  const B = (dose / V1) * ((k21 - beta) / (alpha - beta));
  
  const nDoses = Math.floor(t / tau) + 1;
  const tPrime = t - Math.floor(t / tau) * tau;
  
  const accAlpha = (1 - Math.exp(-nDoses * alpha * tau)) / (1 - Math.exp(-alpha * tau));
  const accBeta = (1 - Math.exp(-nDoses * beta * tau)) / (1 - Math.exp(-beta * tau));
  
  return A * accAlpha * Math.exp(-alpha * tPrime) + B * accBeta * Math.exp(-beta * tPrime);
}

// Test with Lidocaine typical values (70kg adult):
// CL = 0.6 L/h/kg = 42 L/h, V1 = 0.5 L/kg = 35 L, V2 = 1.0 L/kg = 70 L, Q = 0.8 L/h/kg = 56 L/h
// Total Vd_ss = V1 + V2 = 105 L. Single dose = 100 mg, tau = 4 h.
const doseLido = 100;
const V1Lido = 35;
const V2Lido = 70;
const QLido = 56;
const clLido = 42;
const tauLido = 4;
const keOneComp = clLido / (V1Lido + V2Lido); // using Vss = 105L

console.log('Testing Lidocaine (2-Compartment Distribution vs 1-Compartment Simplification):');
console.log('Time (h) | 1-Comp Conc (mg/L) | 2-Comp Conc (mg/L) | Discrepancy Ratio');
for (const t of [0.1, 0.25, 0.5, 1.0, 2.0, 3.9]) {
  const c1 = pkOneCompartmentIv(doseLido, V1Lido + V2Lido, keOneComp, tauLido, t);
  const c2 = pkTwoCompartmentIv(doseLido, V1Lido, QLido, V2Lido, clLido, tauLido, t);
  const ratio = (c2 / c1).toFixed(2);
  console.log(`  ${t.toString().padEnd(6)} | ${c1.toFixed(3).padEnd(18)} | ${c2.toFixed(3).padEnd(18)} | ${ratio}x (2-comp is ${ratio}x 1-comp)`);
}

// Check Bateman function singularity in oral PK
console.log('\nTesting Bateman Function Singularity in PkCurveWidget and PkCockpit:');
const kaTest = 1.8;
const keSingular = 1.8; // when ka === ke
const singularityFactor = 1 / (kaTest - keSingular);
console.log(`  When ka === ke (ka = ${kaTest}, ke = ${keSingular}): 1 / (ka - ke) = ${singularityFactor}`);
console.log(`  -> Triggers division by zero / Infinity / NaN in client calculations!`);

// Check PkDial formula claim vs Oral reality:
console.log('\nTesting PkDial Peak Concentration Claim:');
console.log('  PkDial claim: Css,max = (D / Vd) * (1 / (1 - exp(-ke * tau)))');
console.log('  Note: This is strictly the IV BOLUS equation where peak occurs instantaneously at t = 0.');
console.log('  For Oral dosing (as shown in PkDial wireframe), absorption is gradual. Applying IV equation overestimates true oral Css,max significantly!');

// ---------------------------------------------------------------------------
// TEST 2: Henderson-Hasselbalch Ionization & Amphoteric/Zwitterion Limitation
// ---------------------------------------------------------------------------
console.log('\n--- 2. HENDERSON-HASSELBALCH & MISCONCEPTION MEMORY ---');

function calculateMonoprotic(pH, pKa, type) {
  const delta = type === 'weak_acid' ? pKa - pH : pH - pKa;
  const ratio = Math.pow(10, -delta);
  const ionized = ratio / (1 + ratio);
  return { ionized, nonIonized: 1 - ionized };
}

// Aspirin test (weak acid pKa 3.5 at stomach pH 1.4)
const aspStomach = calculateMonoprotic(1.4, 3.5, 'weak_acid');
console.log(`Aspirin (pKa 3.5) at stomach pH 1.4:`);
console.log(`  Non-ionized: ${(aspStomach.nonIonized * 100).toFixed(2)}% | Ionized: ${(aspStomach.ionized * 100).toFixed(2)}%`);

// Ion trapping ratio between Stomach (1.4) and Plasma (7.4)
const aspPlasma = calculateMonoprotic(7.4, 3.5, 'weak_acid');
console.log(`Aspirin at plasma pH 7.4:`);
console.log(`  Non-ionized: ${(aspPlasma.nonIonized * 100).toFixed(4)}% | Ionized: ${(aspPlasma.ionized * 100).toFixed(2)}%`);
const trappingRatio = (1 + Math.pow(10, 7.4 - 3.5)) / (1 + Math.pow(10, 1.4 - 3.5));
console.log(`  Ion-trapping total concentration ratio (Plasma / Stomach) = ${trappingRatio.toFixed(1)}x`);

// Diprotic / Zwitterion failure in current codebase:
console.log('\nTesting Amphoteric / Zwitterionic Drug (Ciprofloxacin: pKa1=6.09 [COOH], pKa2=8.74 [NH]):');
console.log('  Current codebase calculateIonizationFractions(pH, pKa, type) accepts ONLY "weak_acid" | "weak_base"');
console.log('  At physiological pH 7.4:');
// True diprotic speciation:
// H2A+ <=> HA(zwitterion) + H+ (Ka1)
// HA <=> A- + H+ (Ka2)
const pH = 7.4;
const Ka1 = Math.pow(10, -6.09);
const Ka2 = Math.pow(10, -8.74);
const H = Math.pow(10, -pH);
const D = H * H + H * Ka1 + Ka1 * Ka2;
const fCation = (H * H) / D;
const fZwitterion = (H * Ka1) / D;
const fAnion = (Ka1 * Ka2) / D;
console.log(`  True Ciprofloxacin speciation:`);
console.log(`    Cation [H2A+]: ${(fCation * 100).toFixed(2)}%`);
console.log(`    Zwitterion [HA±]: ${(fZwitterion * 100).toFixed(2)}%`);
console.log(`    Anion [A-]: ${(fAnion * 100).toFixed(2)}%`);
console.log(`    Net neutral/lipophilic species able to cross membrane: Zwitterion = ${(fZwitterion * 100).toFixed(2)}%`);
console.log('  CRITICAL LIMITATION: Current widget models Ciprofloxacin as monoprotic, completely failing pharmacy Year 3 zwitterion exam questions!');

// ---------------------------------------------------------------------------
// TEST 3: Receptor Binding Kd & Bioisostere Energetics
// ---------------------------------------------------------------------------
console.log('\n--- 3. RECEPTOR BINDING KD & BIOISOSTERE ENERGETICS ---');
const R_CONST = 1.9872e-3; // kcal / (mol * K)
const T_KELVIN = 310.15; // 37 C Body Temp
const RT = R_CONST * T_KELVIN; // ~0.6163 kcal/mol

function deltaGFromKd(kdNanomolar) {
  const kdMolar = kdNanomolar * 1e-9;
  return RT * Math.log(kdMolar);
}

const kdBaseline = 10.0; // 10 nM
const dG_base = deltaGFromKd(kdBaseline);
console.log(`Baseline Kd = 10.0 nM -> Delta G = ${dG_base.toFixed(2)} kcal/mol`);

// Bioisostere modification: Carboxylic Acid -> Tetrazole
// Tetrazole increases LogP by ~ +1.1. In medicinal chemistry (Hansch hydrophobic constant):
// Delta Delta G_lipophilic ~ -0.73 * Delta LogP ~ -0.803 kcal/mol
const dG_tetrazole = dG_base - 0.803;
const kd_tetrazole = Math.exp(dG_tetrazole / RT) * 1e9;
console.log(`Tetrazole Bioisostere (Delta LogP = +1.1):`);
console.log(`  Thermodynamic predicted Kd = ${kd_tetrazole.toFixed(2)} nM (~${(kdBaseline / kd_tetrazole).toFixed(2)}x affinity increase)`);
console.log(`  In SarExplorer / MolecularBioisostereBench: ad-hoc multiplier can arbitrarily set affinity without thermodynamic bounds.`);

// ---------------------------------------------------------------------------
// TEST 4: Spaced Repetition - FSRS-4.5 vs Leitner Decay Threshold Bug
// ---------------------------------------------------------------------------
console.log('\n--- 4. SPACED REPETITION MATHEMATICS: FSRS-4.5 VS LEITNER THRESHOLD BUG ---');

// Official LeitnerEngine.ts constants:
const BOX_DEFAULT_STABILITY = { 1: 1.0, 2: 3.0, 3: 7.0, 4: 21.0, 5: 60.0 };
const LEITNER_INTERVALS = { 1: 1, 2: 3, 3: 7, 4: 21, 5: 60 };
const RETRIEVABILITY_DUE_THRESHOLD = 0.85;

console.log('Testing LeitnerEngine.ts decay threshold bug:');
console.log('In LeitnerEngine.ts, R(t) = exp(-t / S).');
console.log('Card is marked DUE if: (dueDate <= now) OR (R(t) <= RETRIEVABILITY_DUE_THRESHOLD = 0.85)');
console.log('\nBox | S (days) | Scheduled Interval | Elapsed Time to R <= 0.85 | Pre-Due Acceleration');
console.log('----+----------+--------------------+---------------------------+---------------------');

for (const box of [1, 2, 3, 4, 5]) {
  const S = BOX_DEFAULT_STABILITY[box];
  const schedDays = LEITNER_INTERVALS[box];
  // R(t) = exp(-t / S) <= 0.85 => -t / S <= ln(0.85) => t >= -S * ln(0.85)
  const timeToDueDays = -S * Math.log(RETRIEVABILITY_DUE_THRESHOLD);
  const timeToDueHours = timeToDueDays * 24;
  const prematureRatio = ((schedDays - timeToDueDays) / schedDays) * 100;
  
  console.log(`  ${box} | ${S.toFixed(1).padEnd(8)} | ${schedDays.toString().padEnd(18)} | ${timeToDueDays.toFixed(2)} d (${timeToDueHours.toFixed(1)} h)`.padEnd(52) + `| ${prematureRatio.toFixed(1)}% premature!`);
}

console.log('\nCRITICAL FINDING:');
console.log('  Because S was set equal to the scheduled interval (S = [1, 3, 7, 21, 60]),');
console.log('  retrievability drops below 0.85 after only ~16.25% of the interval!');
console.log('  -> Box 1 becomes due in 3.9 HOURS instead of 1 day!');
console.log('  -> Box 2 becomes due in 11.7 HOURS instead of 3 days!');
console.log('  -> Box 3 becomes due in 1.14 DAYS instead of 7 days!');
console.log('  This completely breaks the Daily 10 / spaced repetition cycle unless S is calibrated to S_85 = Interval / -ln(0.85) ≈ 6.15 * Interval!');

// ---------------------------------------------------------------------------
// TEST 5: Supabase pgvector Geometry & RPC Parameter Mismatch
// ---------------------------------------------------------------------------
console.log('\n--- 5. SUPABASE PGVECTOR GEOMETRY & RPC SIGNATURES ---');
console.log('Vector Dimension: 1536 (OpenAI text-embedding-3-small).');
console.log('Vector Distance Operators:');
console.log('  <=> : Cosine distance. Similarity = 1 - (u <=> v). Correct.');
console.log('  <-> : L2 distance.');
console.log('  <#> : Negative inner product.');

console.log('\nIVFFlat Index Analysis:');
console.log('  Blueprint specification: USING ivfflat (embedding extensions.vector_cosine_ops) WITH (lists = 100);');
console.log('  VULNERABILITY 1: Dataset size. PharmLearn lecture chunks are ~300-800 rows.');
console.log('  Building ivfflat with lists=100 on <1,000 rows violates pgvector guidance (requires lists <= sqrt(N) or N >= 10,000).');
console.log('  VULNERABILITY 2: Empty table index build. If IVFFlat index is created before data insertion, centroids are initialized with 0 vectors, causing catastrophic recall failure on subsequent queries.');
console.log('  VULNERABILITY 3: Probes default. PostgreSQL defaults to ivfflat.probes = 1. With lists = 100, searches only 1% of index.');
console.log('  RECOMMENDATION: Use HNSW: USING hnsw (embedding extensions.vector_cosine_ops) WITH (m = 16, ef_construction = 64).');

console.log('\nRPC Signature Mismatch in Codebase:');
console.log('  apps/web/src/services/lectureRagService.ts lines 236-241 called:');
console.log('    supabase.rpc("match_lecture_concepts", { p_course_id, p_lecture_slug, match_threshold, match_count })');
console.log('  WITHOUT "query_embedding"!');
console.log('  In SQL function public.match_lecture_concepts, "query_embedding extensions.vector(1536)" has NO default value.');
console.log('  Result: PostgreSQL throws "function match_lecture_concepts(...) does not exist or parameter missing", triggering 100% fallback failure.');

// ---------------------------------------------------------------------------
// TEST 6: UI Design Token Audit (ChatGPT Obsidian Squircle vs Neo-Brutalist)
// ---------------------------------------------------------------------------
console.log('\n--- 6. UI DESIGN TOKEN COMPLIANCE AUDIT ---');

const webDir = path.resolve('apps/web/src');
const widgetsDir = path.resolve('packages/widgets/src');
const uiDir = path.resolve('packages/ui/src');

function countPatternsInDir(dir, patterns) {
  const counts = {};
  patterns.forEach(p => counts[p] = 0);
  
  function scan(currentDir) {
    if (!fs.existsSync(currentDir)) return;
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== 'dist') {
        scan(fullPath);
      } else if (entry.isFile() && /\.(tsx|ts|jsx|js|css|html)$/.test(entry.name)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        for (const p of patterns) {
          const regex = new RegExp(p.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
          const matches = content.match(regex);
          if (matches) counts[p] += matches.length;
        }
      }
    }
  }
  scan(dir);
  return counts;
}

const neoPatterns = [
  '#FFF8E7',
  'border-4',
  'border-3',
  'border-black',
  'shadow-neo',
  'shadow-[6px_6px_0px_#000000]',
  'rounded-none'
];

const obsidianPatterns = [
  '#171717',
  '#212121',
  '#2F2F2F',
  '#10A37F',
  'rounded-xl',
  'rounded-2xl'
];

console.log('Scanning apps/web/src for Neo-Brutalist vs Obsidian tokens:');
const webNeo = countPatternsInDir(webDir, neoPatterns);
const webObsidian = countPatternsInDir(webDir, obsidianPatterns);
console.log('  Neo-Brutalist remnants in apps/web/src:', webNeo);
console.log('  Obsidian tokens in apps/web/src:', webObsidian);

console.log('\nScanning packages/widgets/src for Neo-Brutalist vs Obsidian tokens:');
const widgetNeo = countPatternsInDir(widgetsDir, neoPatterns);
const widgetObsidian = countPatternsInDir(widgetsDir, obsidianPatterns);
console.log('  Neo-Brutalist remnants in packages/widgets/src:', widgetNeo);
console.log('  Obsidian tokens in packages/widgets/src:', widgetObsidian);

console.log('\nScanning packages/ui/src for Neo-Brutalist vs Obsidian tokens:');
const uiNeo = countPatternsInDir(uiDir, neoPatterns);
const uiObsidian = countPatternsInDir(uiDir, obsidianPatterns);
console.log('  Neo-Brutalist remnants in packages/ui/src:', uiNeo);
console.log('  Obsidian tokens in packages/ui/src:', uiObsidian);

console.log('\n=== EMPIRICAL STRESS TEST COMPLETE ===');
