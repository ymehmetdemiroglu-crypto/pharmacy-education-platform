/**
 * Persistent Misconception Diagnostic Memory Service
 * Implements tracking, confidence calibration, and adaptive sequencing for the 6 Turkish Pharmacy Traps
 * Specification: docs/daily-study-habit-engine.md Section 3
 */

export type MisconceptionCode =
  | 'TRAP-01-IONIZATION'
  | 'TRAP-02-POTENCY-EFFICACY'
  | 'TRAP-03-ESTER-AMIDE'
  | 'TRAP-04-ADRENERGIC-INVERSION'
  | 'TRAP-05-BIOISOSTERE-LOGP'
  | 'TRAP-06-PHASE-METABOLISM';

export interface MisconceptionDefinition {
  code: MisconceptionCode;
  domain: 'medchem' | 'pharmacology';
  title: string;
  fallacy: string;
  chemicalTruth: string;
  slideReference: string;
  defaultConfidence: number;
}

export interface RemediationEntry {
  timestamp: string;
  questionId: string;
  wasCorrect: boolean;
  selectedTrap?: string | undefined;
  confidenceDelta: number;
}


export interface MisconceptionRecord {
  code: MisconceptionCode;
  domain: 'medchem' | 'pharmacology';
  title: string;
  triggerCount: number;
  consecutiveCorrect: number;
  confidenceScore: number; // 0.0 (deeply confused) to 1.0 (mastered)
  lastTriggeredAt: string;
  resolvedAt: string | null;
  remediationHistory: RemediationEntry[];
}

export const CANONICAL_MISCONCEPTIONS: Record<MisconceptionCode, MisconceptionDefinition> = {
  'TRAP-01-IONIZATION': {
    code: 'TRAP-01-IONIZATION',
    domain: 'medchem',
    title: 'pKa & Henderson-Hasselbalch İyonlaşma Yanılgısı',
    fallacy: 'Düşük pH her molekülü iyonlaştırır veya iyonlaşan molekül zardan daha iyi emilir.',
    chemicalTruth:
      'Yalnızca iyonlaşmamış fraksiyon pasif difüzyonla geçer. Zayıf asitler bazik pH\'da, zayıf bazlar asidik pH\'da iyonlaşır. Siprofloksasin gibi amfoterik ilaçlar fizyolojik pH 7.4\'te %91.35 zwitterion formundadır.',
    slideReference: 'Fizikokimyasal Özellikler, Slayt 14-17',
    defaultConfidence: 0.5,
  },
  'TRAP-02-POTENCY-EFFICACY': {
    code: 'TRAP-02-POTENCY-EFFICACY',
    domain: 'pharmacology',
    title: 'Potens (EC50) vs Efikasite (Emax) Karışıklığı',
    fallacy: 'Daha potent olan ilaç daima daha yüksek klinik tavan etki sağlar.',
    chemicalTruth:
      'Potens sadece miligram cinsinden gereken dozu belirler. Klinik maksimum tavan etkiyi efikasite (Emax) tayin eder. Kodein ne kadar yüksek dozda verilirse verilsin morfinin analjezik tavanına ulaşamaz.',
    slideReference: 'Doz-Yanıt İlişkileri, Slayt 22-25',
    defaultConfidence: 0.5,
  },
  'TRAP-03-ESTER-AMIDE': {
    code: 'TRAP-03-ESTER-AMIDE',
    domain: 'medchem',
    title: 'Ester vs Amit Lokal Anestezik Hidrolizi & Alerji Profili',
    fallacy: 'Amitler plazmada parçalanır veya tüm lokal anestezikler PABA alerjisi yapar.',
    chemicalTruth:
      'Esterler (prokain) psödokolinesteraz ile saniyeler içinde PABA metabolitine hidroliz olur (alerjenik). Amitler (lidokain, dibukain) plazma esterazına tam dirençlidir ve yavaş karaciğer CYP metabolizması gerektirir.',
    slideReference: 'Lokal Anestezikler SAR, Slayt 31-33',
    defaultConfidence: 0.5,
  },
  'TRAP-04-ADRENERGIC-INVERSION': {
    code: 'TRAP-04-ADRENERGIC-INVERSION',
    domain: 'pharmacology',
    title: 'Adrenerjik Alt Tip Seçicilik Tersinmesi (α1 vs β2)',
    fallacy: 'Adrenalin damarları sadece kasar; kan basıncını her dozda artırır.',
    chemicalTruth:
      'Adrenalin fizyolojik düşük dozda yüksek afiniteli β2 reseptörlerini uyararak vazodilatasyon yapar. Yüksek konsantrasyonlarda ise baskın α1 (Gq) etkisi ile genel vazokonstriksiyona yol açar.',
    slideReference: 'Otonom Sinir Sistemi, Slayt 19-21',
    defaultConfidence: 0.5,
  },
  'TRAP-05-BIOISOSTERE-LOGP': {
    code: 'TRAP-05-BIOISOSTERE-LOGP',
    domain: 'medchem',
    title: 'Biyoizoster Değişiminde LogP & Asitlik Tuzağı',
    fallacy: 'Biyoizoster değişimi molekülün farmakoforunu ve LogP değerini asla değiştirmez.',
    chemicalTruth:
      'Karboksilik asit yerine 5-sübstitüe tetrazol değişimi planar asitliği korurken (pKa ~4.5-4.9), lipofilitiyi (LogP) yaklaşık 10 kat artırarak membran geçirgenliğini dramatik yükseltir.',
    slideReference: 'Biyoizosterizm İlkeleri, Slayt 8-11',
    defaultConfidence: 0.5,
  },
  'TRAP-06-PHASE-METABOLISM': {
    code: 'TRAP-06-PHASE-METABOLISM',
    domain: 'pharmacology',
    title: 'Faz I vs Faz II Metabolizma Polarite İnversiyonu',
    fallacy: 'Faz I reaksiyonları ilacı anında vücuttan atılacak kadar hidrofilik yapar.',
    chemicalTruth:
      'Faz I (CYP fonksiyonlandırma) sadece fonksiyonel tutunma grubu (-OH, -NH2, -COOH) ekler; molekülü her zaman yeterince polar yapmaz. Faz II konjugasyonu (glukuronidasyon, sülfasyon) asıl atılabilir polar metaboliti oluşturur.',
    slideReference: 'İlaç Metabolizması, Slayt 5-9',
    defaultConfidence: 0.5,
  },
};

const STORAGE_KEY = 'pharmlearn_misconception_store_v1';

export function initializeMisconceptionStore(): Record<MisconceptionCode, MisconceptionRecord> {
  const records: Partial<Record<MisconceptionCode, MisconceptionRecord>> = {};
  for (const [code, def] of Object.entries(CANONICAL_MISCONCEPTIONS)) {
    const mCode = code as MisconceptionCode;
    records[mCode] = {
      code: mCode,
      domain: def.domain,
      title: def.title,
      triggerCount: 0,
      consecutiveCorrect: 0,
      confidenceScore: def.defaultConfidence,
      lastTriggeredAt: '',
      resolvedAt: null,
      remediationHistory: [],
    };
  }
  return records as Record<MisconceptionCode, MisconceptionRecord>;
}

export function loadMisconceptionStore(): Record<MisconceptionCode, MisconceptionRecord> {
  if (typeof window === 'undefined') return initializeMisconceptionStore();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const defaults = initializeMisconceptionStore();
      return { ...defaults, ...parsed };
    }
  } catch (err) {
    console.warn('[MisconceptionStore] Error loading from storage:', err);
  }
  return initializeMisconceptionStore();
}

export function saveMisconceptionStore(records: Record<MisconceptionCode, MisconceptionRecord>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (err) {
    console.warn('[MisconceptionStore] Error saving to storage:', err);
  }
}

/**
 * Records a diagnostic interaction with an active question.
 * Updates confidence score, trigger counts, and mastery state.
 */
export function recordMisconceptionOutcome(
  code: MisconceptionCode,
  questionId: string,
  wasCorrect: boolean,
  selectedTrap?: string,
  now: Date = new Date()
): MisconceptionRecord {
  const store = loadMisconceptionStore();
  const current = store[code] || {
    code,
    domain: CANONICAL_MISCONCEPTIONS[code]?.domain || 'medchem',
    title: CANONICAL_MISCONCEPTIONS[code]?.title || code,
    triggerCount: 0,
    consecutiveCorrect: 0,
    confidenceScore: 0.5,
    lastTriggeredAt: '',
    resolvedAt: null,
    remediationHistory: [],
  };

  let newConfidence: number;
  let newConsecutive: number;
  let newTriggerCount = current.triggerCount;
  let newResolvedAt = current.resolvedAt;

  if (wasCorrect) {
    // Mastery progression: increase confidence
    newConsecutive = current.consecutiveCorrect + 1;
    const boost = newConsecutive >= 3 ? 0.25 : 0.15;
    newConfidence = Math.min(1.0, Number((current.confidenceScore + boost).toFixed(2)));
    if (newConfidence >= 0.85 && newConsecutive >= 2) {
      newResolvedAt = now.toISOString();
    }
  } else {
    // Trap triggered: decrease confidence
    newTriggerCount += 1;
    newConsecutive = 0;
    const penalty = 0.25;
    newConfidence = Math.max(0.05, Number((current.confidenceScore - penalty).toFixed(2)));
    newResolvedAt = null; // Unresolve
  }

  const confidenceDelta = Number((newConfidence - current.confidenceScore).toFixed(2));
  const newEntry: RemediationEntry = {
    timestamp: now.toISOString(),
    questionId,
    wasCorrect,
    selectedTrap,
    confidenceDelta,
  };

  const updated: MisconceptionRecord = {
    ...current,
    triggerCount: newTriggerCount,
    consecutiveCorrect: newConsecutive,
    confidenceScore: newConfidence,
    lastTriggeredAt: now.toISOString(),
    resolvedAt: newResolvedAt,
    remediationHistory: [newEntry, ...current.remediationHistory.slice(0, 19)], // Keep last 20
  };

  store[code] = updated;
  saveMisconceptionStore(store);
  return updated;
}

/**
 * Returns prioritized misconceptions that require immediate review or remediation.
 */
export function getActiveRemediationQueue(): MisconceptionRecord[] {
  const store = loadMisconceptionStore();
  return Object.values(store)
    .filter((rec) => rec.confidenceScore < 0.8 || rec.consecutiveCorrect < 2)
    .sort((a, b) => a.confidenceScore - b.confidenceScore);
}

/**
 * Resets all diagnostic records for testing or user profile reset.
 */
export function clearMisconceptionStore(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}
