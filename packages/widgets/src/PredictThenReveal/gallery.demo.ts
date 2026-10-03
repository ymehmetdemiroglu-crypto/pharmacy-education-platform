import { PredictThenRevealConfig } from './schema';

export const predictThenRevealStandardDemo: PredictThenRevealConfig = {
  prompt: 'Predict the effect of tetrazole bioisosterism on carboxylic acid acidity',
  scenarioDescription:
    'A medicinal chemist substitutes a 5-tetrazolyl group for the -COOH group on an ARB scaffold. What happens to physiological ionization and oral bioavailability?',
  options: [
    {
      id: 'opt-a',
      label: 'The tetrazole is completely un-ionized at pH 7.4 because nitrogen is basic',
      isCorrect: false,
      misconceptionFeedback:
        'Tetrazole has a pKa of ~4.9 due to resonance stabilization of the anion over 4 nitrogens; it is ~99% ionized at physiological pH.',
    },
    {
      id: 'opt-b',
      label: 'The tetrazole mimics the carboxylate anion while enhancing lipophilicity (10x higher logP)',
      isCorrect: true,
    },
    {
      id: 'opt-c',
      label: 'The tetrazole undergoes rapid first-pass esterase cleavage',
      isCorrect: false,
      misconceptionFeedback:
        'Tetrazoles are not esters and are resistant to metabolic esterase hydrolysis, which is why they improve metabolic stability.',
    },
  ],
  revealedOutcome:
    'The 5-tetrazolyl group exhibits a pKa of 4.9 and distributes negative charge across the ring, preserving essential salt-bridge receptor contacts while increasing membrane permeation 10-fold.',
  explanation:
    'Tetrazole is a classical non-classical bioisostere of carboxylic acid (Burger / Thornber). Its larger planar volume and higher lipophilicity enhance receptor residence time and oral absorption.',
  source: {
    file: '1-giri-ve-temel-kavramlar.pdf',
    page: 24,
  },
};
