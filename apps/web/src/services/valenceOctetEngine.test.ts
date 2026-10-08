import { describe, expect, it } from 'vitest';
import {
  calculateHammettPkaShift,
  calculateSarProperties,
  calculateWildmanCrippenDeltaLogP,
  SUBSTITUENT_CATALOG,
  validateElectronPush
} from './valenceOctetEngine';
import {
  CurvedArrow,
  DrugScaffold,
  MechanismChallenge
} from '../types/tactileMechanism.types';

const MOCK_CHALLENGE: MechanismChallenge = {
  id: 'ache-serine-attack',
  title: 'AChE Serin-203 Asetilasyonu',
  subtitle: 'Nükleofilik atak ve tetrahedral ara ürün',
  courseId: 'medchem',
  sourceFile: 'medchem_hafta1_bilesikler.pdf',
  sourcePage: 12,
  canonicalTrapCode: 'TRAP-08-AChE-AGING',
  drivingForceExplanation: 'Ser-203 hidroksil oksijeni, karbonil karbonuna nükleofilik saldırı yapar.',
  reactantSmiles: 'CC(=O)OCC[N+](C)(C)C',
  initialPoints: [
    {
      id: 'ser_o',
      atomIndex: 0,
      pointType: 'ATOM_LONE_PAIR',
      atomSymbol: 'O',
      label: 'Ser-203 :O',
      x: 100,
      y: 100,
      formalCharge: 0,
      valenceElectrons: 6,
      isLonePair: true,
      isPiBond: false
    },
    {
      id: 'carb_c',
      atomIndex: 1,
      pointType: 'ATOM_ELECTROPHILE',
      atomSymbol: 'C',
      label: 'Karbonil C',
      x: 200,
      y: 100,
      formalCharge: 0,
      valenceElectrons: 4,
      isLonePair: false,
      isPiBond: false
    },
    {
      id: 'pi_bond',
      atomIndex: 2,
      pointType: 'PI_BOND_MIDPOINT',
      atomSymbol: 'C',
      label: 'C=O π-Bağı',
      x: 200,
      y: 70,
      formalCharge: 0,
      valenceElectrons: 4,
      isLonePair: false,
      isPiBond: true
    },
    {
      id: 'carb_o',
      atomIndex: 3,
      pointType: 'ATOM_ELECTROPHILE',
      atomSymbol: 'O',
      label: 'Karbonil O',
      x: 200,
      y: 40,
      formalCharge: 0,
      valenceElectrons: 6,
      isLonePair: true,
      isPiBond: false
    }
  ],
  initialBonds: [
    { id: 'b1', fromIndex: 1, toIndex: 3, bondOrder: 2 }
  ],
  steps: [
    {
      stepNumber: 1,
      description: 'Serin-203 nükleofilik saldırısı ve C=O pi-bağının açılması',
      donorPointId: 'ser_o',
      acceptorPointId: 'carb_c',
      secondaryDonorPointId: 'pi_bond',
      secondaryAcceptorPointId: 'carb_o',
      expectedArrowCount: 2,
      hintLadder: [
        'Nükleofil olarak Ser-203 oksijeninin serbest elektron çiftini kullanın.',
        'Karbon 4 bağa sahip olduğu için pi-bağını açmadan yeni bağ yapamaz.',
        'Ser-203\'ten karbonil karbonuna ve C=O çift bağından oksijene iki ok çizin.'
      ],
      explanation: 'Tetrahedral ara ürün oluşur; karbonil oksijeni negatif formal yük kazanır.',
      intermediateName: 'Tetrahedral Ara Ürün'
    }
  ],
  demoArrows: []
};

const MOCK_SCAFFOLD: DrugScaffold = {
  id: 'procaine-lidocaine',
  name: 'Lokal Anestezik Çekirdeği (Prokain/Lidokain)',
  drugClass: 'Lokal Anestezikler',
  baseSmiles: 'CCN(CC)CCOC(=O)C1=CC=C(C=C1)N',
  baseLogP: 2.14,
  basePka: 8.90,
  reactionRho: 1.0,
  baseHalfLifeHours: 0.8,
  baseReceptorAffinity: 85,
  positions: [
    { id: 'p_para', label: 'Para (4-Konumu)', positionType: 'para', x: 50, y: 150, currentSubstituent: 'SUB_H' },
    { id: 'p_ortho', label: 'Ortho (2-Konumu)', positionType: 'ortho', x: 80, y: 100, currentSubstituent: 'SUB_H' }
  ],
  description: 'Aromatik halka üzerindeki sübstitüentlerin hidroliz ve etki süresine etkisi.',
  clinicalContext: 'Prokain plazmada psödokolinesteraz ile saniyeler içinde hidroliz olur.',
  sources: [{ file: 'medchem_lokal_anestezikler.pdf', page: 18 }]
};

describe('valenceOctetEngine', () => {
  it('correctly maps all 8 substituents with physical constants', () => {
    expect(SUBSTITUENT_CATALOG.SUB_H.wildmanCrippenLogP).toBe(0.00);
    expect(SUBSTITUENT_CATALOG.SUB_CH3.wildmanCrippenLogP).toBe(0.56);
    expect(SUBSTITUENT_CATALOG.SUB_NO2.hammettSigmaPara).toBe(0.78);
    expect(SUBSTITUENT_CATALOG.SUB_CF3.wildmanCrippenLogP).toBe(0.88);
    expect(SUBSTITUENT_CATALOG.SUB_SO2NH2.wildmanCrippenLogP).toBe(-1.20);
  });

  it('detects Texas Carbon (VALENCE_OCTET_VIOLATION) when carbonyl pi-bond is not opened', () => {
    const singleArrow: CurvedArrow = {
      id: 'a1',
      donor: MOCK_CHALLENGE.initialPoints[0]!,
      acceptor: MOCK_CHALLENGE.initialPoints[1]!,
      arrowType: 'ELECTRON_PAIR',
      p0: { x: 100, y: 100 },
      pCtrl: { x: 150, y: 75 },
      p1: { x: 200, y: 100 },
      isSnapped: true,
      snapDistancePx: 56
    };

    const result = validateElectronPush([singleArrow], MOCK_CHALLENGE, 0);
    expect(result.isValid).toBe(false);
    expect(result.errorCode).toBe('VALENCE_OCTET_VIOLATION');
    expect(result.feedbackTurkish).toContain('Texas Karbon Hatası');
  });

  it('accepts valid dual-arrow mechanism forming tetrahedral intermediate', () => {
    const arrow1: CurvedArrow = {
      id: 'a1',
      donor: MOCK_CHALLENGE.initialPoints[0]!,
      acceptor: MOCK_CHALLENGE.initialPoints[1]!,
      arrowType: 'ELECTRON_PAIR',
      p0: { x: 100, y: 100 },
      pCtrl: { x: 150, y: 75 },
      p1: { x: 200, y: 100 },
      isSnapped: true,
      snapDistancePx: 56
    };

    const arrow2: CurvedArrow = {
      id: 'a2',
      donor: MOCK_CHALLENGE.initialPoints[2]!,
      acceptor: MOCK_CHALLENGE.initialPoints[3]!,
      arrowType: 'ELECTRON_PAIR',
      p0: { x: 200, y: 70 },
      pCtrl: { x: 215, y: 55 },
      p1: { x: 200, y: 40 },
      isSnapped: true,
      snapDistancePx: 56
    };

    const result = validateElectronPush([arrow1, arrow2], MOCK_CHALLENGE, 0);
    expect(result.isValid).toBe(true);
    expect(result.errorCode).toBe('NONE');
    expect(result.feedbackTurkish).toContain('Tetrahedral Ara Ürün');
    expect(result.formalCharges).toEqual({ 'C': 0, 'O': -1 });
  });

  it('rejects incorrect donor atom with INCORRECT_DONOR error', () => {
    const wrongArrow: CurvedArrow = {
      id: 'a_wrong',
      donor: MOCK_CHALLENGE.initialPoints[3]!, // carbonyl O instead of Ser-203 O
      acceptor: MOCK_CHALLENGE.initialPoints[1]!,
      arrowType: 'ELECTRON_PAIR',
      p0: { x: 200, y: 40 },
      pCtrl: { x: 200, y: 70 },
      p1: { x: 200, y: 100 },
      isSnapped: true,
      snapDistancePx: 56
    };

    const result = validateElectronPush([wrongArrow], MOCK_CHALLENGE, 0);
    expect(result.isValid).toBe(false);
    expect(result.errorCode).toBe('INCORRECT_DONOR');
  });

  it('supports hypervalent phosphorus attack without octet violation', () => {
    const phosphChallenge: MechanismChallenge = {
      ...MOCK_CHALLENGE,
      id: 'organophosphate-attack',
      initialPoints: [
        {
          id: 'oxime_o',
          atomIndex: 0,
          pointType: 'ATOM_LONE_PAIR',
          atomSymbol: 'O',
          label: '2-PAM :O⁻',
          x: 100,
          y: 100,
          formalCharge: -1,
          valenceElectrons: 7,
          isLonePair: true,
          isPiBond: false
        },
        {
          id: 'sarin_p',
          atomIndex: 1,
          pointType: 'ATOM_ELECTROPHILE',
          atomSymbol: 'P',
          label: 'Fosfor P(V)',
          x: 200,
          y: 100,
          formalCharge: 0,
          valenceElectrons: 5,
          isLonePair: false,
          isPiBond: false
        }
      ],
      steps: [
        {
          stepNumber: 1,
          description: 'Pralidoksim ile fosfor atağı',
          donorPointId: 'oxime_o',
          acceptorPointId: 'sarin_p',
          expectedArrowCount: 1,
          hintLadder: ['2-PAM oksim oksijeninden fosfora saldırın.', 'Fosfor hipervalandır.', 'Tek ok yeterlidir.'],
          explanation: 'Fosfor pentakoordine geçiş hali oluşturur.',
          intermediateName: 'Pentakoordine Fosfor'
        }
      ]
    };

    const pArrow: CurvedArrow = {
      id: 'a_p',
      donor: phosphChallenge.initialPoints[0]!,
      acceptor: phosphChallenge.initialPoints[1]!,
      arrowType: 'ELECTRON_PAIR',
      p0: { x: 100, y: 100 },
      pCtrl: { x: 150, y: 75 },
      p1: { x: 200, y: 100 },
      isSnapped: true,
      snapDistancePx: 56
    };

    const result = validateElectronPush([pArrow], phosphChallenge, 0);
    expect(result.isValid).toBe(true);
    expect(result.errorCode).toBe('NONE');
    expect(result.feedbackTurkish).toContain('Fosfor 3. periyot elementi');
  });

  it('calculates Hammett pKa shifts correctly', () => {
    // -NO2 on para: sigma = +0.78, rho = 1.0 => Delta pKa = -0.78
    expect(calculateHammettPkaShift('SUB_NO2', true, 1.0)).toBe(-0.78);
    // -OCH3 on para: sigma = -0.27, rho = 1.0 => Delta pKa = +0.27
    expect(calculateHammettPkaShift('SUB_OCH3', true, 1.0)).toBe(0.27);
  });

  it('calculates SAR properties dynamically with substituent changes', () => {
    const sarBaseline = calculateSarProperties(MOCK_SCAFFOLD, {});
    expect(sarBaseline.calculatedLogP).toBe(2.14);
    expect(sarBaseline.calculatedPka).toBe(8.90);

    // Add ortho-methyl and para-chloro
    const modified = calculateSarProperties(MOCK_SCAFFOLD, {
      p_ortho: 'SUB_CH3',
      p_para: 'SUB_CL'
    });

    // Delta logP: 0.56 (CH3) + 0.71 (Cl) = 1.27
    expect(modified.deltaLogP).toBe(1.27);
    expect(modified.calculatedLogP).toBe(3.41);
    // Ortho methyl steric protection increases half life
    expect(modified.estimatedHalfLifeHours).toBeGreaterThan(MOCK_SCAFFOLD.baseHalfLifeHours);
  });
});
