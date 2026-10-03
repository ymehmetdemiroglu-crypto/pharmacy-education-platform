import { SarExplorerConfig } from './schema';

export const sarExplorerStandardDemo: SarExplorerConfig = {
  scaffoldName: 'Propranolol Analogs',
  scaffoldDescription:
    'Optimize aryloxypropanolamine beta-antagonists for target affinity and lipophilicity.',
  baseLogP: 1.1,
  basePka: 9.3,
  baseAffinityNm: 150,
  positions: [
    {
      positionName: 'R1 (N-Alkyl substituent)',
      defaultOptionId: 'r1-me',
      options: [
        {
          id: 'r1-me',
          name: 'Methyl (-CH3)',
          structureSnippet: '-CH3',
          deltaLogP: 0.4,
          deltaPka: 0.1,
          affinityMultiplier: 1.0,
          toxicityRisk: 'low',
        },
        {
          id: 'r1-ipr',
          name: 'Isopropyl (-CH(CH3)2)',
          structureSnippet: '-iPr',
          deltaLogP: 1.3,
          deltaPka: 0.2,
          affinityMultiplier: 12.0,
          toxicityRisk: 'low',
        },
        {
          id: 'r1-tbu',
          name: 'tert-Butyl (-C(CH3)3)',
          structureSnippet: '-tBu',
          deltaLogP: 1.7,
          deltaPka: 0.2,
          affinityMultiplier: 15.0,
          toxicityRisk: 'low',
        },
      ],
    },
    {
      positionName: 'R2 (Aromatic ring system)',
      defaultOptionId: 'r2-phenyl',
      options: [
        {
          id: 'r2-phenyl',
          name: 'Phenyl (Benzene)',
          structureSnippet: '-C6H5',
          deltaLogP: 0.0,
          deltaPka: 0.0,
          affinityMultiplier: 1.0,
          toxicityRisk: 'low',
        },
        {
          id: 'r2-naphthyl',
          name: '1-Naphthyl (Propranolol)',
          structureSnippet: '-C10H7',
          deltaLogP: 1.1,
          deltaPka: 0.0,
          affinityMultiplier: 10.0,
          toxicityRisk: 'low',
        },
        {
          id: 'r2-para-amide',
          name: 'p-Acetamido (Atenolol-type)',
          structureSnippet: '-p-NHAc',
          deltaLogP: -1.2,
          deltaPka: 0.0,
          affinityMultiplier: 8.0,
          toxicityRisk: 'low',
        },
      ],
    },
  ],
  targetGoal: {
    description: 'Achieve Kd <= 2 nM and logP between 2.0 and 3.5.',
    minLogP: 2.0,
    maxLogP: 3.5,
    maxAffinityNm: 2,
    targetOptionIds: ['r1-ipr', 'r2-naphthyl'],
  },
  explanation:
    'Pairing the bulky lipophilic 1-naphthyl ring with isopropylamine yields propranolol, providing nanomolar beta-blocker affinity.',
  source: {
    file: '2-reseptrler.pdf',
    page: 27,
  },
};
