import { DoseResponseCurveConfig } from './schema';

export const doseResponseCurveStandardDemo: DoseResponseCurveConfig = {
  title: 'Adrenoceptor Agonist vs Antagonist Graded Dose-Response',
  prompt:
    'Investigate how isoproterenol (full beta-agonist) responsiveness changes in the presence of propranolol (competitive) versus phenoxybenzamine (irreversible non-competitive).',
  defaultEc50: 1e-7,
  defaultEmax: 100,
  defaultHillSlope: 1.0,
  modes: ['agonist', 'partial_agonist', 'competitive_antagonist', 'noncompetitive_antagonist'],
  source: {
    file: '2-reseptrler.pdf',
    page: 30,
  },
  explanation:
    'A competitive antagonist occupies the receptor reversibly and can be completely overcome by increasing agonist concentration (surmountable, identical Emax). An irreversible antagonist reduces functional receptor density, diminishing maximal cardiac contractile response (insurmountable, depressed Emax).',
};
