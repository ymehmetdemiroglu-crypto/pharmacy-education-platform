import { HintLadderConfig } from './schema';

export const hintLadderStandardDemo: HintLadderConfig = {
  stepPrompt: 'Predict which functional modification protects procaine from rapid plasma esterase hydrolysis.',
  hints: [
    'Focus on the metabolic vulnerability of the ester linkage to circulating pseudocholinesterases.',
    'Classical bioisosteric replacement replaces the labile ester oxygen with a more hydrolytically stable heteroatom.',
    'Replacing -O- with -NH- yields the bioisostere procainamide: amide resonance stabilizes against esterases, increasing half-life from 1 min to ~3.5 hr.',
  ],
  source: {
    file: '1-giri-ve-temel-kavramlar.pdf',
    page: 25,
  },
};
