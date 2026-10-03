import { MultipleChoiceConfig } from './schema';

export const mcqStandardDemo: MultipleChoiceConfig = {
  prompt: 'Which thermodynamic force provides the greatest individual binding enthalpy in drug-receptor interactions?',
  options: [
    {
      id: 'opt-cov',
      text: 'Covalent bond (40–140 kcal/mol)',
      isCorrect: true,
    },
    {
      id: 'opt-ionic',
      text: 'Ionic / Salt bridge (5–10 kcal/mol)',
      isCorrect: false,
      distractorRationale: 'While ionic bonds are the strongest non-covalent interactions, covalent bonds form shared electron pairs that are nearly 10x stronger.',
    },
    {
      id: 'opt-hbond',
      text: 'Hydrogen bond (2–7 kcal/mol)',
      isCorrect: false,
      distractorRationale: 'Hydrogen bonds are critical for molecular orientation and specificity, but individual H-bond energies are much lower than covalent bonds.',
    },
    {
      id: 'opt-vdw',
      text: 'Van der Waals forces (0.5–1 kcal/mol)',
      isCorrect: false,
      distractorRationale: 'Van der Waals forces are the weakest individual interactions, requiring tight steric complementarity to accumulate meaningful affinity.',
    },
  ],
  isMultiSelect: false,
  explanation: 'Covalent interactions form irreversible or pseudo-irreversible drug-receptor complexes with bond energies up to 140 kcal/mol (e.g. aspirin acetylating COX, omeprazole inhibiting H+/K+ ATPase).',
  source: {
    file: '2-reseptrler.pdf',
    page: 22,
  },
};
