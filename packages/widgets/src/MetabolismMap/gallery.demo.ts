import { MetabolismMapConfig } from './schema';

export const metabolismMapStandardDemo: MetabolismMapConfig = {
  drugName: 'Acetaminophen (Paracetamol)',
  prompt: 'Identify which metabolic pathway generates the reactive hepatotoxic electrophile NAPQI.',
  moleculeSvgDescription: 'p-Acetamidophenol structure',
  sites: [
    {
      id: 'site-cyp2e1',
      label: 'N-Hydroxylation',
      x: 90,
      y: 45,
      enzyme: 'CYP2E1 / CYP3A4',
      phase: 'Phase I',
      reactionType: 'Oxidation / Bioactivation',
      metaboliteOutcome:
        'Converts 5–10% of therapeutic dose into N-acetyl-p-benzoquinone imine (NAPQI). Detoxified safely by glutathione (GSH) at therapeutic doses.',
      toxicityFlag: 'toxic',
      isTargetSite: true,
    },
    {
      id: 'site-ugt',
      label: 'Phenol Glucuronidation',
      x: 310,
      y: 45,
      enzyme: 'UGT1A6 / UGT1A9',
      phase: 'Phase II',
      reactionType: 'Glucuronide Conjugation',
      metaboliteOutcome:
        'Forms paracetamol-4-O-glucuronide, accounting for 50–60% of total urinary excretion. Non-toxic and rapidly excreted.',
      toxicityFlag: 'non_toxic',
      isTargetSite: false,
    },
    {
      id: 'site-sult',
      label: 'Phenol Sulfonation',
      x: 200,
      y: 165,
      enzyme: 'SULT1A1',
      phase: 'Phase II',
      reactionType: 'Sulfate Conjugation',
      metaboliteOutcome:
        'Forms paracetamol sulfate (25–35% of dose). Saturable high-affinity low-capacity pathway in adults.',
      toxicityFlag: 'non_toxic',
      isTargetSite: false,
    },
  ],
  source: {
    file: '1-giri-ve-temel-kavramlar.pdf',
    page: 28,
  },
  explanation:
    'In acute acetaminophen overdose, high-capacity sulfation and glucuronidation pathways saturate. Shunting excess drug to CYP2E1 rapidly depletes hepatic glutathione stores (>70% depletion). Unconjugated NAPQI covalently binds cysteinyl sulfhydryl groups on vital hepatocyte mitochondrial enzymes, causing centrilobular necrosis.',
};
