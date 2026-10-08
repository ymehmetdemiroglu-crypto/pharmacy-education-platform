import { DrugScaffold, MechanismChallenge } from '../types/tactileMechanism.types';

export const MECHANISM_CHALLENGES: MechanismChallenge[] = [
  {
    id: 'mech-ache-serine',
    title: 'Asetilkolinesteraz Serin-203 Asetilasyonu',
    subtitle: 'Nükleofilik saldırı, pi-açılması ve tetrahedral ara ürün',
    courseId: 'medchem',
    sourceFile: 'medchem_hafta1_bilesikler.pdf',
    sourcePage: 12,
    canonicalTrapCode: 'TRAP-08-AChE-AGING',
    drivingForceExplanation: 'Katalitik üçlüdeki Histidin-440 tarafından aktive edilen Serin-203 alkoksit oksijeni, asetilkolinin kısmi pozitif karbonil karbonuna (δ+) nükleofilik saldırı yapar.',
    reactantSmiles: 'CC(=O)OCC[N+](C)(C)C',
    initialPoints: [
      {
        id: 'ser203_o',
        atomIndex: 0,
        pointType: 'ATOM_LONE_PAIR',
        atomSymbol: 'O',
        label: 'Ser-203 :O⁻',
        x: 120,
        y: 220,
        formalCharge: -1,
        valenceElectrons: 7,
        isLonePair: true,
        isPiBond: false
      },
      {
        id: 'carb_c',
        atomIndex: 1,
        pointType: 'ATOM_ELECTROPHILE',
        atomSymbol: 'C',
        label: 'Karbonil C',
        x: 260,
        y: 220,
        formalCharge: 0,
        valenceElectrons: 4,
        isLonePair: false,
        isPiBond: false
      },
      {
        id: 'pi_co',
        atomIndex: 2,
        pointType: 'PI_BOND_MIDPOINT',
        atomSymbol: 'C',
        label: 'C=O π-Bağı',
        x: 260,
        y: 160,
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
        x: 260,
        y: 100,
        formalCharge: 0,
        valenceElectrons: 6,
        isLonePair: true,
        isPiBond: false
      },
      {
        id: 'choline_o',
        atomIndex: 4,
        pointType: 'ATOM_ELECTROPHILE',
        atomSymbol: 'O',
        label: '-O-Kolin',
        x: 390,
        y: 220,
        formalCharge: 0,
        valenceElectrons: 6,
        isLonePair: true,
        isPiBond: false
      }
    ],
    initialBonds: [
      { id: 'b_co', fromIndex: 1, toIndex: 3, bondOrder: 2 },
      { id: 'b_c_choline', fromIndex: 1, toIndex: 4, bondOrder: 1 }
    ],
    steps: [
      {
        stepNumber: 1,
        description: 'Ser-203 nükleofilik saldırısı ve karbonil pi-bağının açılması',
        donorPointId: 'ser203_o',
        acceptorPointId: 'carb_c',
        secondaryDonorPointId: 'pi_co',
        secondaryAcceptorPointId: 'carb_o',
        expectedArrowCount: 2,
        hintLadder: [
          'Ser-203 oksijeninin serbest elektron çiftinden başlayarak elektrofilik karbonil karbonuna bir ok çekin.',
          'Karbon 5 bağ yapamayacağı için (Texas Karbon!), aynı anda çift bağdaki pi-elektronlarını oksijene aktarmalısınız.',
          '1. ok: Ser-203 :O⁻ -> Karbonil C. 2. ok: C=O π-Bağı -> Karbonil O.'
        ],
        explanation: 'Tetrahedral ara ürün meydana gelir. Karbon atomu sp2 düzlemsel geometriden sp3 tetrahedral geometriye geçer.',
        intermediateName: 'Tetrahedral Enzim-Substrat Kompleksi'
      }
    ],
    demoArrows: [
      {
        id: 'demo_1',
        donor: {
          id: 'ser203_o',
          atomIndex: 0,
          pointType: 'ATOM_LONE_PAIR',
          atomSymbol: 'O',
          label: 'Ser-203 :O⁻',
          x: 120,
          y: 220,
          formalCharge: -1,
          valenceElectrons: 7,
          isLonePair: true,
          isPiBond: false
        },
        acceptor: {
          id: 'carb_c',
          atomIndex: 1,
          pointType: 'ATOM_ELECTROPHILE',
          atomSymbol: 'C',
          label: 'Karbonil C',
          x: 260,
          y: 220,
          formalCharge: 0,
          valenceElectrons: 4,
          isLonePair: false,
          isPiBond: false
        },
        arrowType: 'ELECTRON_PAIR',
        p0: { x: 120, y: 220 },
        pCtrl: { x: 190, y: 185 },
        p1: { x: 260, y: 220 },
        isSnapped: true,
        snapDistancePx: 56
      },
      {
        id: 'demo_2',
        donor: {
          id: 'pi_co',
          atomIndex: 2,
          pointType: 'PI_BOND_MIDPOINT',
          atomSymbol: 'C',
          label: 'C=O π-Bağı',
          x: 260,
          y: 160,
          formalCharge: 0,
          valenceElectrons: 4,
          isLonePair: false,
          isPiBond: true
        },
        acceptor: {
          id: 'carb_o',
          atomIndex: 3,
          pointType: 'ATOM_ELECTROPHILE',
          atomSymbol: 'O',
          label: 'Karbonil O',
          x: 260,
          y: 100,
          formalCharge: 0,
          valenceElectrons: 6,
          isLonePair: true,
          isPiBond: false
        },
        arrowType: 'ELECTRON_PAIR',
        p0: { x: 260, y: 160 },
        pCtrl: { x: 280, y: 130 },
        p1: { x: 260, y: 100 },
        isSnapped: true,
        snapDistancePx: 56
      }
    ]
  },
  {
    id: 'mech-organophosphate-aging',
    title: 'Organofosfat Zehirlenmesi ve Hipervalan P(V) Atağı',
    subtitle: 'Kovalent fosforilasyon ve Pralidoksim (2-PAM) direnci',
    courseId: 'medchem',
    sourceFile: 'medchem_hafta1_bilesikler.pdf',
    sourcePage: 14,
    canonicalTrapCode: 'TRAP-08-AChE-AGING',
    drivingForceExplanation: 'Sarin ve DFP gibi organofosfatlar, fosfor üzerindeki güçlü elektrofilik karakter nedeniyle Ser-203 ile kovalent stabil fosfoester bağı kurar.',
    reactantSmiles: 'COP(=O)(C)F',
    initialPoints: [
      {
        id: 'ser_o_p',
        atomIndex: 0,
        pointType: 'ATOM_LONE_PAIR',
        atomSymbol: 'O',
        label: 'Ser-203 :OH',
        x: 120,
        y: 200,
        formalCharge: 0,
        valenceElectrons: 6,
        isLonePair: true,
        isPiBond: false
      },
      {
        id: 'phosphorus_p',
        atomIndex: 1,
        pointType: 'ATOM_ELECTROPHILE',
        atomSymbol: 'P',
        label: 'Fosfor P(V)',
        x: 270,
        y: 200,
        formalCharge: 0,
        valenceElectrons: 5,
        isLonePair: false,
        isPiBond: false
      },
      {
        id: 'fluoride_f',
        atomIndex: 2,
        pointType: 'ATOM_ELECTROPHILE',
        atomSymbol: 'F',
        label: 'Ayrılan Flor -F',
        x: 410,
        y: 200,
        formalCharge: 0,
        valenceElectrons: 7,
        isLonePair: true,
        isPiBond: false
      }
    ],
    initialBonds: [
      { id: 'b_pf', fromIndex: 1, toIndex: 2, bondOrder: 1 }
    ],
    steps: [
      {
        stepNumber: 1,
        description: 'Ser-203 oksijeninden fosfor atomuna nükleofilik saldırı (P hipervalan)',
        donorPointId: 'ser_o_p',
        acceptorPointId: 'phosphorus_p',
        expectedArrowCount: 1,
        hintLadder: [
          'Serin hidroksil oksijeninden pentavalent fosfor atomuna doğru ok çizin.',
          'Fosfor 3. periyot elementi olduğu için oktet kuralını aşabilir (10 değerlik elektronu alabilir).',
          'Tek bir ok Ser-203 -> P yönünde yeterlidir.'
        ],
        explanation: 'Fosfor geçici olarak pentakoordine trigonal bipiramidal geçiş kompleksine ulaşır; flor ayrılır.',
        intermediateName: 'Fosforillenmiş Enzim (Kovalent Adükt)'
      }
    ],
    demoArrows: [
      {
        id: 'demo_p',
        donor: {
          id: 'ser_o_p',
          atomIndex: 0,
          pointType: 'ATOM_LONE_PAIR',
          atomSymbol: 'O',
          label: 'Ser-203 :OH',
          x: 120,
          y: 200,
          formalCharge: 0,
          valenceElectrons: 6,
          isLonePair: true,
          isPiBond: false
        },
        acceptor: {
          id: 'phosphorus_p',
          atomIndex: 1,
          pointType: 'ATOM_ELECTROPHILE',
          atomSymbol: 'P',
          label: 'Fosfor P(V)',
          x: 270,
          y: 200,
          formalCharge: 0,
          valenceElectrons: 5,
          isLonePair: false,
          isPiBond: false
        },
        arrowType: 'ELECTRON_PAIR',
        p0: { x: 120, y: 200 },
        pCtrl: { x: 195, y: 165 },
        p1: { x: 270, y: 200 },
        isSnapped: true,
        snapDistancePx: 56
      }
    ]
  },
  {
    id: 'mech-procaine-hydrolysis',
    title: 'Lokal Anestezik Ester Hidrolizi (Prokain)',
    subtitle: 'Psödokolinesteraz duyarlılığı ve PABA alerjen oluşumu',
    courseId: 'medchem',
    sourceFile: 'medchem_lokal_anestezikler.pdf',
    sourcePage: 28,
    canonicalTrapCode: 'TRAP-03-ESTER-AMIDE',
    drivingForceExplanation: 'Prokaindeki ester bağı plazma psödokolinesterazı tarafından hızla hidrolize edilir; metabolit para-aminobenzoik asit (PABA) alerjik reaksiyonların primer kaynağıdır.',
    reactantSmiles: 'CCN(CC)CCOC(=O)C1=CC=C(C=C1)N',
    initialPoints: [
      {
        id: 'water_o',
        atomIndex: 0,
        pointType: 'ATOM_LONE_PAIR',
        atomSymbol: 'O',
        label: 'H₂O :OH⁻',
        x: 110,
        y: 220,
        formalCharge: -1,
        valenceElectrons: 7,
        isLonePair: true,
        isPiBond: false
      },
      {
        id: 'ester_c',
        atomIndex: 1,
        pointType: 'ATOM_ELECTROPHILE',
        atomSymbol: 'C',
        label: 'Ester C=O',
        x: 250,
        y: 220,
        formalCharge: 0,
        valenceElectrons: 4,
        isLonePair: false,
        isPiBond: false
      },
      {
        id: 'pi_ester_co',
        atomIndex: 2,
        pointType: 'PI_BOND_MIDPOINT',
        atomSymbol: 'C',
        label: 'π(C=O)',
        x: 250,
        y: 160,
        formalCharge: 0,
        valenceElectrons: 4,
        isLonePair: false,
        isPiBond: true
      },
      {
        id: 'ester_o',
        atomIndex: 3,
        pointType: 'ATOM_ELECTROPHILE',
        atomSymbol: 'O',
        label: 'Karbonil O',
        x: 250,
        y: 100,
        formalCharge: 0,
        valenceElectrons: 6,
        isLonePair: true,
        isPiBond: false
      },
      {
        id: 'deae_leaving',
        atomIndex: 4,
        pointType: 'ATOM_ELECTROPHILE',
        atomSymbol: 'O',
        label: '-O-DEAE',
        x: 380,
        y: 220,
        formalCharge: 0,
        valenceElectrons: 6,
        isLonePair: true,
        isPiBond: false
      }
    ],
    initialBonds: [
      { id: 'b_eco', fromIndex: 1, toIndex: 3, bondOrder: 2 },
      { id: 'b_edeae', fromIndex: 1, toIndex: 4, bondOrder: 1 }
    ],
    steps: [
      {
        stepNumber: 1,
        description: 'Su molekülünün ester karboniline nükleofilik saldırısı ve C=O pi-bağının açılması',
        donorPointId: 'water_o',
        acceptorPointId: 'ester_c',
        secondaryDonorPointId: 'pi_ester_co',
        secondaryAcceptorPointId: 'ester_o',
        expectedArrowCount: 2,
        hintLadder: [
          'Su/hidroksil oksijeninden başlayarak ester karboniline ok çekin.',
          'Karbonil oksijenine giden ikinci rezonans okunu çizmeyi unutmayın.',
          '1. ok: H₂O -> Ester C. 2. ok: π(C=O) -> Karbonil O.'
        ],
        explanation: 'Tetrahedral ara ürün oluşur; ester bağı amit bağına kıyasla çok daha düşük aktivasyon enerjisiyle yarılır.',
        intermediateName: 'Ester Hidroliz Tetrahedral Kompleksi'
      }
    ],
    demoArrows: [
      {
        id: 'demo_proc_1',
        donor: {
          id: 'water_o',
          atomIndex: 0,
          pointType: 'ATOM_LONE_PAIR',
          atomSymbol: 'O',
          label: 'H₂O :OH⁻',
          x: 110,
          y: 220,
          formalCharge: -1,
          valenceElectrons: 7,
          isLonePair: true,
          isPiBond: false
        },
        acceptor: {
          id: 'ester_c',
          atomIndex: 1,
          pointType: 'ATOM_ELECTROPHILE',
          atomSymbol: 'C',
          label: 'Ester C=O',
          x: 250,
          y: 220,
          formalCharge: 0,
          valenceElectrons: 4,
          isLonePair: false,
          isPiBond: false
        },
        arrowType: 'ELECTRON_PAIR',
        p0: { x: 110, y: 220 },
        pCtrl: { x: 180, y: 185 },
        p1: { x: 250, y: 220 },
        isSnapped: true,
        snapDistancePx: 56
      },
      {
        id: 'demo_proc_2',
        donor: {
          id: 'pi_ester_co',
          atomIndex: 2,
          pointType: 'PI_BOND_MIDPOINT',
          atomSymbol: 'C',
          label: 'π(C=O)',
          x: 250,
          y: 160,
          formalCharge: 0,
          valenceElectrons: 4,
          isLonePair: false,
          isPiBond: true
        },
        acceptor: {
          id: 'ester_o',
          atomIndex: 3,
          pointType: 'ATOM_ELECTROPHILE',
          atomSymbol: 'O',
          label: 'Karbonil O',
          x: 250,
          y: 100,
          formalCharge: 0,
          valenceElectrons: 6,
          isLonePair: true,
          isPiBond: false
        },
        arrowType: 'ELECTRON_PAIR',
        p0: { x: 250, y: 160 },
        pCtrl: { x: 270, y: 130 },
        p1: { x: 250, y: 100 },
        isSnapped: true,
        snapDistancePx: 56
      }
    ]
  },
  {
    id: 'mech-beta-lactam-opening',
    title: 'Beta-Laktam Halka Gerginliği ve Serin Açilasyonu',
    subtitle: 'Penisilinlerin PBP transpeptidaz enzimini intihar inhibisyonu ile bağlaması',
    courseId: 'medchem',
    sourceFile: 'medchem_antibiyotikler.pdf',
    sourcePage: 35,
    canonicalTrapCode: 'TRAP-09-PRODRUG-CES1',
    drivingForceExplanation: '4 üyeli beta-laktam halkasındaki 90 derecelik açı deformasyonu (ring strain), karbonil grubunun reaktivitesini dramatik ölçüde artırarak bakteri hücre duvarı sentezini durdurur.',
    reactantSmiles: 'CC1(C(N2C(S1)C(C2=O)NC(=O)CC3=CC=CC=C3)C(=O)O)C',
    initialPoints: [
      {
        id: 'pbp_ser_o',
        atomIndex: 0,
        pointType: 'ATOM_LONE_PAIR',
        atomSymbol: 'O',
        label: 'PBP Ser :OH',
        x: 110,
        y: 210,
        formalCharge: 0,
        valenceElectrons: 6,
        isLonePair: true,
        isPiBond: false
      },
      {
        id: 'lactam_c',
        atomIndex: 1,
        pointType: 'ATOM_ELECTROPHILE',
        atomSymbol: 'C',
        label: 'Laktam C=O',
        x: 250,
        y: 210,
        formalCharge: 0,
        valenceElectrons: 4,
        isLonePair: false,
        isPiBond: false
      },
      {
        id: 'pi_lactam',
        atomIndex: 2,
        pointType: 'PI_BOND_MIDPOINT',
        atomSymbol: 'C',
        label: 'π(C=O)',
        x: 250,
        y: 150,
        formalCharge: 0,
        valenceElectrons: 4,
        isLonePair: false,
        isPiBond: true
      },
      {
        id: 'lactam_o',
        atomIndex: 3,
        pointType: 'ATOM_ELECTROPHILE',
        atomSymbol: 'O',
        label: 'Karbonil O',
        x: 250,
        y: 90,
        formalCharge: 0,
        valenceElectrons: 6,
        isLonePair: true,
        isPiBond: false
      }
    ],
    initialBonds: [
      { id: 'b_lactam_co', fromIndex: 1, toIndex: 3, bondOrder: 2 }
    ],
    steps: [
      {
        stepNumber: 1,
        description: 'Bakteriyel transpeptidaz serin hidroksilinin 4 üyeli laktam karboniline saldırısı',
        donorPointId: 'pbp_ser_o',
        acceptorPointId: 'lactam_c',
        secondaryDonorPointId: 'pi_lactam',
        secondaryAcceptorPointId: 'lactam_o',
        expectedArrowCount: 2,
        hintLadder: [
          'PBP enziminin serin oksijeninden gergin laktam karboniline ok çizin.',
          'Karbonil pi-bağını oksijene açarak oktet kuralını koruyun.',
          'PBP Ser:OH -> Laktam C ve π(C=O) -> Laktam O.'
        ],
        explanation: 'Açil-enzim kovalent kompleksi oluşur; 4 üyeli halka kırılarak geri dönüşümsüz inhibisyon tamamlanır.',
        intermediateName: 'Açil-Enzim Kovalent Kompleksi'
      }
    ],
    demoArrows: [
      {
        id: 'demo_pen_1',
        donor: {
          id: 'pbp_ser_o',
          atomIndex: 0,
          pointType: 'ATOM_LONE_PAIR',
          atomSymbol: 'O',
          label: 'PBP Ser :OH',
          x: 110,
          y: 210,
          formalCharge: 0,
          valenceElectrons: 6,
          isLonePair: true,
          isPiBond: false
        },
        acceptor: {
          id: 'lactam_c',
          atomIndex: 1,
          pointType: 'ATOM_ELECTROPHILE',
          atomSymbol: 'C',
          label: 'Laktam C=O',
          x: 250,
          y: 210,
          formalCharge: 0,
          valenceElectrons: 4,
          isLonePair: false,
          isPiBond: false
        },
        arrowType: 'ELECTRON_PAIR',
        p0: { x: 110, y: 210 },
        pCtrl: { x: 180, y: 175 },
        p1: { x: 250, y: 210 },
        isSnapped: true,
        snapDistancePx: 56
      },
      {
        id: 'demo_pen_2',
        donor: {
          id: 'pi_lactam',
          atomIndex: 2,
          pointType: 'PI_BOND_MIDPOINT',
          atomSymbol: 'C',
          label: 'π(C=O)',
          x: 250,
          y: 150,
          formalCharge: 0,
          valenceElectrons: 4,
          isLonePair: false,
          isPiBond: true
        },
        acceptor: {
          id: 'lactam_o',
          atomIndex: 3,
          pointType: 'ATOM_ELECTROPHILE',
          atomSymbol: 'O',
          label: 'Karbonil O',
          x: 250,
          y: 90,
          formalCharge: 0,
          valenceElectrons: 6,
          isLonePair: true,
          isPiBond: false
        },
        arrowType: 'ELECTRON_PAIR',
        p0: { x: 250, y: 150 },
        pCtrl: { x: 270, y: 120 },
        p1: { x: 250, y: 90 },
        isSnapped: true,
        snapDistancePx: 56
      }
    ]
  }
];

export const DRUG_SCAFFOLDS: DrugScaffold[] = [
  {
    id: 'scaffold-procaine-lidocaine',
    name: 'Lokal Anestezik Çekirdeği (Prokain/Lidokain Analoğu)',
    drugClass: 'Lokal Anestezikler',
    baseSmiles: 'CCN(CC)CCOC(=O)C1=CC=C(C=C1)N',
    baseLogP: 2.14,
    basePka: 8.90,
    reactionRho: 1.0,
    baseHalfLifeHours: 0.8,
    baseReceptorAffinity: 82,
    positions: [
      {
        id: 'pos_para',
        label: 'Para (4-Pozisyonu)',
        positionType: 'para',
        x: 60,
        y: 160,
        currentSubstituent: 'SUB_H'
      },
      {
        id: 'pos_ortho_1',
        label: 'Ortho (2-Pozisyonu)',
        positionType: 'ortho',
        x: 110,
        y: 100,
        currentSubstituent: 'SUB_H'
      },
      {
        id: 'pos_ortho_2',
        label: 'Ortho (6-Pozisyonu)',
        positionType: 'ortho',
        x: 110,
        y: 220,
        currentSubstituent: 'SUB_H'
      },
      {
        id: 'pos_amine_n',
        label: 'Tersiyer Amin',
        positionType: 'amine_n',
        x: 370,
        y: 160,
        currentSubstituent: 'SUB_H'
      }
    ],
    description: 'Aromatik halkadaki sübstitüentlerin lipofilisiteye ve esteraz hidroliz hızına etkisi. Ortho-metil grupları sterik engel sağlayarak ester/amit bağını korur (Lidokain etkisi).',
    clinicalContext: 'Prokain kanda psödokolinesteraz ile saniyeler içinde hidrolize uğrarken, Lidokaindeki 2,6-dimetil koruması etki süresini 1.5-2 saate çıkarır.',
    sources: [
      { file: 'medchem_lokal_anestezikler.pdf', page: 18 },
      { file: 'medchem_lokal_anestezikler.pdf', page: 28 }
    ]
  },
  {
    id: 'scaffold-propranolol',
    name: 'Ariloksipropanolamin Çekirdeği (Beta-Bloker)',
    drugClass: 'Beta-Adrenerjik Antagonistler',
    baseSmiles: 'CC(C)NCC(COC1=CC=CC2=CC=CC=C12)O',
    baseLogP: 2.60,
    basePka: 9.45,
    reactionRho: 0.85,
    baseHalfLifeHours: 4.0,
    baseReceptorAffinity: 92,
    positions: [
      {
        id: 'pos_ring_para',
        label: 'Aromatik Para',
        positionType: 'para',
        x: 70,
        y: 160,
        currentSubstituent: 'SUB_H'
      },
      {
        id: 'pos_amine_r',
        label: 'Amin Grubu R',
        positionType: 'amine_n',
        x: 350,
        y: 160,
        currentSubstituent: 'SUB_CH3'
      }
    ],
    description: 'Ariloksipropanolamin iskeletinde naftil halkası lipofilik bağlanma cebine oturur. Amin üzerindeki hacimli izopropil/t-butil grupları beta-reseptör afinitesini maksimize eder.',
    clinicalContext: '(S)-Propranolol 3 noktalı bağlanma ile ötomerdır (affinite 100 kat yüksektir). Amine hidrofilik sübstitüent eklenmesi SSS geçişini ve kabus yan etkisini azaltır.',
    sources: [
      { file: 'medchem_adrenerjikler.pdf', page: 22 },
      { file: 'pharmacology_adrenerjikler.pdf', page: 34 }
    ]
  },
  {
    id: 'scaffold-nifedipine',
    name: '1,4-Dihidropiridin Çekirdeği (Nifedipin Analoğu)',
    drugClass: 'Kalsiyum Kanal Blokerleri',
    baseSmiles: 'CC1=C(C(C(=C(N1)C)C(=O)OC)C2=CC=CC=C2[N+](=O)[O-])C(=O)OC',
    baseLogP: 2.20,
    basePka: 5.30,
    reactionRho: 0.95,
    baseHalfLifeHours: 2.0,
    baseReceptorAffinity: 88,
    positions: [
      {
        id: 'pos_c3_ester',
        label: 'C3 Ester Zinciri',
        positionType: 'c3_ester',
        x: 120,
        y: 90,
        currentSubstituent: 'SUB_CH3'
      },
      {
        id: 'pos_c5_ester',
        label: 'C5 Ester Zinciri',
        positionType: 'c5_ester',
        x: 280,
        y: 90,
        currentSubstituent: 'SUB_CH3'
      },
      {
        id: 'pos_c4_phenyl',
        label: 'C4 Fenil Ortho/Meta',
        positionType: 'ortho',
        x: 200,
        y: 220,
        currentSubstituent: 'SUB_NO2'
      }
    ],
    description: 'C3 ve C5 ester gruplarının asimetrisi vasküler seçiciliği belirler. C4 fenil halkasındaki elektron çekici gruplar (-NO2, -CF3) dihidropiridin halkasının bükük kayık konformasyonunu kilitler.',
    clinicalContext: 'C3/C5 ester zincirleri uzadıkça (Amlodipin, Felodipin) doku depolanması artar ve yarılanma ömrü 2 saatten 35 saate çıkar.',
    sources: [
      { file: 'medchem_kardiyovaskuler.pdf', page: 41 }
    ]
  }
];
