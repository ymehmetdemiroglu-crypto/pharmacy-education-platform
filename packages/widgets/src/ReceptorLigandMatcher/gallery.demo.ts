import { ReceptorLigandMatcherConfig } from './schema';

export const receptorLigandMatcherStandardDemo: ReceptorLigandMatcherConfig = {
  title: 'Adrenaline Beta-2 GPCR Pocket Pharmacophore Mapping',
  prompt: 'Match each chemical moiety of epinephrine to the specific amino acid residues inside the beta-2 receptor active site.',
  drugName: 'Epinephrine',
  receptorName: 'Beta-2 Adrenergic Receptor',
  pairs: [
    {
      id: 'p-nh',
      drugGroup: 'Secondary Ammonium (-NH2+-CH3)',
      correctResidueId: 'res-asp113',
      bondType: 'ionic',
      energyKcalMol: '7-10 kcal/mol',
      explanation: 'Asp113 in TM3 provides the invariant negative counterion required for high-affinity anchoring of all biogenic amine ligands.',
    },
    {
      id: 'p-oh-beta',
      drugGroup: 'Chiral (R)-beta-Hydroxyl (-OH)',
      correctResidueId: 'res-asn293',
      bondType: 'h_bond',
      energyKcalMol: '3-5 kcal/mol',
      explanation: 'Asn293 in TM6 forms a stereospecific hydrogen bond, fulfilling the Easson-Stedman hypothesis (100x potency over dopamine).',
    },
    {
      id: 'p-meta-oh',
      drugGroup: 'Catechol meta-OH',
      correctResidueId: 'res-ser204',
      bondType: 'h_bond',
      energyKcalMol: '2-4 kcal/mol',
      explanation: 'Ser204 in TM5 acts as an essential H-bond partner that initiates receptor activation and outward TM6 movement.',
    },
    {
      id: 'p-para-oh',
      drugGroup: 'Catechol para-OH',
      correctResidueId: 'res-ser207',
      bondType: 'h_bond',
      energyKcalMol: '2-4 kcal/mol',
      explanation: 'Ser207 in TM5 anchors the distal catechol ring oxygen, conferring full agonist signaling capacity.',
    },
  ],
  residues: [
    { id: 'res-asp113', residueName: 'Asp113 (TM3)', description: 'Conserved aspartate salt-bridge anchor' },
    { id: 'res-asn293', residueName: 'Asn293 (TM6)', description: 'Chiral beta-hydroxyl hydrogen bond acceptor' },
    { id: 'res-ser204', residueName: 'Ser204 (TM5)', description: 'Agonist activation trigger for meta-OH' },
    { id: 'res-ser207', residueName: 'Ser207 (TM5)', description: 'TM5 hydrogen bonding partner for para-OH' },
    { id: 'res-phe290', residueName: 'Phe290 (TM6)', description: 'Aromatic microswitch phenylalanine' },
  ],
  source: {
    file: '2-reseptrler.pdf',
    page: 25,
  },
};
