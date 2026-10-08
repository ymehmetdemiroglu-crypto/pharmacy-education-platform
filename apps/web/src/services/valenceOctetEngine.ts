import {
  CurvedArrow,
  DrugScaffold,
  MechanismChallenge,
  MechanismStep,
  SarEvaluationResult,
  SubstituentItem,
  SubstituentType,
  ValenceValidationResponse
} from '../types/tactileMechanism.types';

export const SUBSTITUENT_CATALOG: Record<SubstituentType, SubstituentItem> = {
  SUB_H: {
    type: 'SUB_H',
    name: 'Hidrojen',
    formula: '-H',
    hammettSigmaPara: 0.00,
    hammettSigmaMeta: 0.00,
    wildmanCrippenLogP: 0.00,
    stericTaftEs: 0.00,
    description: 'Referans sübstitüent (nötr elektronik ve sterik etki)',
    badgeColor: '#94A3B8'
  },
  SUB_CH3: {
    type: 'SUB_CH3',
    name: 'Metil',
    formula: '-CH₃',
    hammettSigmaPara: -0.17,
    hammettSigmaMeta: -0.07,
    wildmanCrippenLogP: 0.56,
    stericTaftEs: -1.24,
    description: 'Zayıf elektron verici (indüktif +I), lipofilik artış',
    badgeColor: '#3B82F6'
  },
  SUB_CL: {
    type: 'SUB_CL',
    name: 'Klor',
    formula: '-Cl',
    hammettSigmaPara: 0.23,
    hammettSigmaMeta: 0.37,
    wildmanCrippenLogP: 0.71,
    stericTaftEs: -0.97,
    description: 'Elektron çekici indüktif (-I), lipofilikliği artırır',
    badgeColor: '#10B981'
  },
  SUB_OCH3: {
    type: 'SUB_OCH3',
    name: 'Metoksi',
    formula: '-OCH₃',
    hammettSigmaPara: -0.27,
    hammettSigmaMeta: 0.12,
    wildmanCrippenLogP: -0.02,
    stericTaftEs: -0.55,
    description: 'Kuvvetli rezonans verici (+M), aromatik halkayı zenginleştirir',
    badgeColor: '#8B5CF6'
  },
  SUB_NO2: {
    type: 'SUB_NO2',
    name: 'Nitro',
    formula: '-NO₂',
    hammettSigmaPara: 0.78,
    hammettSigmaMeta: 0.71,
    wildmanCrippenLogP: -0.28,
    stericTaftEs: -2.52,
    description: 'Çok güçlü elektron çekici (-M, -I), asitliği ve polariteyi artırır',
    badgeColor: '#EF4444'
  },
  SUB_CF3: {
    type: 'SUB_CF3',
    name: 'Triflorometil',
    formula: '-CF₃',
    hammettSigmaPara: 0.54,
    hammettSigmaMeta: 0.43,
    wildmanCrippenLogP: 0.88,
    stericTaftEs: -2.40,
    description: 'Güçlü elektron çekici ve yüksek lipofilisite; metabolik kalkan',
    badgeColor: '#F59E0B'
  },
  SUB_N_CH3_2: {
    type: 'SUB_N_CH3_2',
    name: 'Dimetilamino',
    formula: '-N(CH₃)₂',
    hammettSigmaPara: -0.83,
    hammettSigmaMeta: -0.16,
    wildmanCrippenLogP: 0.18,
    stericTaftEs: -1.56,
    description: 'Aşırı güçlü rezonans verici (+M), aromatik bazisiteyi artırır',
    badgeColor: '#EC4899'
  },
  SUB_SO2NH2: {
    type: 'SUB_SO2NH2',
    name: 'Sülfamol',
    formula: '-SO₂NH₂',
    hammettSigmaPara: 0.57,
    hammettSigmaMeta: 0.46,
    wildmanCrippenLogP: -1.20,
    stericTaftEs: -1.82,
    description: 'Polar sülfonamit grubu; CA inhibitörleri ve diüretik farmakoforu',
    badgeColor: '#06B6D4'
  }
};

/**
 * Validates a student's drawn electron-pushing arrows against a chemical step
 */
export function validateElectronPush(
  arrows: CurvedArrow[],
  challenge: MechanismChallenge,
  stepIndex: number
): ValenceValidationResponse {
  const step: MechanismStep | undefined = challenge.steps[stepIndex];
  if (!step) {
    return {
      isValid: false,
      isHypervalentAllowed: true,
      errorCode: 'NONE',
      feedbackTurkish: 'Geçersiz basamak indeksi.'
    };
  }

  if (arrows.length === 0) {
    return {
      isValid: false,
      isHypervalentAllowed: true,
      errorCode: 'NONE',
      feedbackTurkish: 'Lütfen elektron akışını göstermek için en az bir eğri ok çiziniz.'
    };
  }

  const primaryArrow = arrows[0];
  if (!primaryArrow) {
    return {
      isValid: false,
      isHypervalentAllowed: true,
      errorCode: 'NONE',
      feedbackTurkish: 'Geçersiz ok girdisi.'
    };
  }

  // 1. Validate primary donor
  if (primaryArrow.donor.id !== step.donorPointId) {
    return {
      isValid: false,
      isHypervalentAllowed: true,
      errorCode: 'INCORRECT_DONOR',
      violatingAtomIndex: primaryArrow.donor.atomIndex,
      feedbackTurkish: `Elektron kaynağı hatalı! Ok, nükleofil olan ${step.donorPointId} atomunun serbest elektron çiftinden başlamalıdır.`
    };
  }

  // 2. Validate primary acceptor
  if (primaryArrow.acceptor.id !== step.acceptorPointId) {
    return {
      isValid: false,
      isHypervalentAllowed: true,
      errorCode: 'UNREACTIVE_ELECTROPHILE',
      violatingAtomIndex: primaryArrow.acceptor.atomIndex,
      feedbackTurkish: `Hedef elektrofil hatalı! Nükleofil bu merkeze değil, elektrofilik ${step.acceptorPointId} merkezine saldırmalıdır.`
    };
  }

  // 3. Texas Carbon Check (Strict Octet Violation for Period 2 Carbon)
  const acceptorSymbol = primaryArrow.acceptor.atomSymbol;
  const isCarbonAcceptor = acceptorSymbol === 'C';
  const requiresSecondaryArrow = step.expectedArrowCount > 1;

  if (isCarbonAcceptor && requiresSecondaryArrow && arrows.length === 1) {
    return {
      isValid: false,
      isHypervalentAllowed: true,
      errorCode: 'VALENCE_OCTET_VIOLATION',
      violatingAtomIndex: primaryArrow.acceptor.atomIndex,
      feedbackTurkish: 'Texas Karbon Hatası! Karbon 5 bağ yapamaz (oktet aşımı). Karbonil pi-bağını oksijene açan 2. rezonans okunu da çizmelisiniz.'
    };
  }

  // 4. Secondary Arrow Validation if required
  if (requiresSecondaryArrow) {
    if (arrows.length < 2) {
      return {
        isValid: false,
        isHypervalentAllowed: true,
        errorCode: 'MISSING_PI_RESONANCE_ARROW',
        feedbackTurkish: 'İkinci elektron akış oku eksik! Karbonil çift bağındaki pi-elektronlarını oksijene aktarınız.'
      };
    }

    const secondaryArrow = arrows[1];
    if (!secondaryArrow) {
      return {
        isValid: false,
        isHypervalentAllowed: true,
        errorCode: 'MISSING_PI_RESONANCE_ARROW',
        feedbackTurkish: 'İkinci elektron akış oku eksik!'
      };
    }

    if (step.secondaryDonorPointId && secondaryArrow.donor.id !== step.secondaryDonorPointId) {
      return {
        isValid: false,
        isHypervalentAllowed: true,
        errorCode: 'MISSING_PI_RESONANCE_ARROW',
        feedbackTurkish: 'İkinci ok karbonil pi-bağından başlamalıdır.'
      };
    }

    if (step.secondaryAcceptorPointId && secondaryArrow.acceptor.id !== step.secondaryAcceptorPointId) {
      return {
        isValid: false,
        isHypervalentAllowed: true,
        errorCode: 'MISSING_PI_RESONANCE_ARROW',
        feedbackTurkish: 'İkinci ok elektronegatif oksijen atomuna yönelmelidir.'
      };
    }
  }

  // 5. Hypervalent Heteroatom Verification (Phosphorus P(V) & Sulfur S(VI))
  const isPhosphorus = acceptorSymbol === 'P';
  const isSulfur = acceptorSymbol === 'S';
  if (isPhosphorus || isSulfur) {
    return {
      isValid: true,
      isHypervalentAllowed: true,
      errorCode: 'NONE',
      feedbackTurkish: isPhosphorus
        ? 'Doğru! Fosfor 3. periyot elementi olduğu için d-orbitallerini kullanarak 5 bağ yapabilir (hipervalan geçiş hali).'
        : 'Doğru! Kükürt 3. periyot elementi olarak oktet genişlemesiyle 6 bağa kadar kararlı kalabilir.',
      formalCharges: { [acceptorSymbol]: 0 },
      resultingIntermediateSmiles: challenge.reactantSmiles
    };
  }

  // Success path
  return {
    isValid: true,
    isHypervalentAllowed: true,
    errorCode: 'NONE',
    feedbackTurkish: `Harika! ${step.intermediateName} başarıyla oluşturuldu. ${step.explanation}`,
    formalCharges: {
      'C': 0,
      'O': -1
    },
    resultingIntermediateSmiles: challenge.reactantSmiles
  };
}

/**
 * Calculates Hammett pKa shift: Delta pKa = -rho * sigma_x
 */
export function calculateHammettPkaShift(
  substituent: SubstituentType,
  isPara: boolean,
  rho: number = 1.0
): number {
  const item = SUBSTITUENT_CATALOG[substituent];
  const sigma = isPara ? item.hammettSigmaPara : item.hammettSigmaMeta;
  return Number((-rho * sigma).toFixed(2));
}

/**
 * Calculates Wildman-Crippen lipophilicity change Delta LogP
 */
export function calculateWildmanCrippenDeltaLogP(substituent: SubstituentType): number {
  const item = SUBSTITUENT_CATALOG[substituent];
  return item.wildmanCrippenLogP;
}

/**
 * Evaluates full SAR properties for a given scaffold with applied substituents
 */
export function calculateSarProperties(
  scaffold: DrugScaffold,
  activePositions: Record<string, SubstituentType>
): SarEvaluationResult {
  let totalDeltaLogP = 0;
  let totalDeltaPka = 0;
  let totalStericEs = 0;

  for (const pos of scaffold.positions) {
    const currentSub = activePositions[pos.id] || pos.currentSubstituent;
    const item = SUBSTITUENT_CATALOG[currentSub];

    totalDeltaLogP += item.wildmanCrippenLogP;
    totalStericEs += item.stericTaftEs;

    const isPara = pos.positionType === 'para';
    const sigma = isPara ? item.hammettSigmaPara : item.hammettSigmaMeta;
    totalDeltaPka += -scaffold.reactionRho * sigma;
  }

  const calculatedLogP = Number((scaffold.baseLogP + totalDeltaLogP).toFixed(2));
  const calculatedPka = Number((scaffold.basePka + totalDeltaPka).toFixed(2));

  // Metabolic half-life calculation:
  // Ortho steric hindrance (negative Es) shields ester/amide bond from enzymatic cleavage (CYP or esterases)
  const stericShielding = Math.abs(Math.min(totalStericEs, 0));
  const halfLifeMultiplier = Math.max(0.5, 1.0 + (stericShielding * 0.45));
  const estimatedHalfLifeHours = Number((scaffold.baseHalfLifeHours * halfLifeMultiplier).toFixed(1));

  // Receptor affinity: optimal logP window (1.8 to 2.8) yields highest score
  const logPOptimalDistance = Math.abs(calculatedLogP - 2.3);
  const affinityPenalty = Math.min(45, logPOptimalDistance * 18);
  const receptorAffinityScore = Math.max(10, Math.min(100, Math.round(scaffold.baseReceptorAffinity - affinityPenalty)));

  // Steric hindrance score (0 to 100)
  const stericHindranceScore = Math.min(100, Math.round(Math.abs(totalStericEs) * 22));

  // Clinical Summary
  let clinicalSummary = '';
  if (calculatedLogP > 3.0) {
    clinicalSummary = 'Aşırı lipofilik: Doku birikimi ve uzun etki süresi artar, ancak toksisite riski yükselebilir.';
  } else if (calculatedLogP < 1.0) {
    clinicalSummary = 'Yüksek hidrofilik: Membran geçirgenliği düşüktür; renal eliminasyon hızlanır.';
  } else {
    clinicalSummary = 'Optimal biyofiziksel aralık: Dengeli membran permeabilitesi ve reseptör etkileşimi.';
  }

  return {
    deltaLogP: Number(totalDeltaLogP.toFixed(2)),
    calculatedLogP,
    deltaPka: Number(totalDeltaPka.toFixed(2)),
    calculatedPka,
    estimatedHalfLifeHours,
    receptorAffinityScore,
    stericHindranceScore,
    clinicalSummary
  };
}
