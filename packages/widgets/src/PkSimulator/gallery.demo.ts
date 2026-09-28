import { PkSimulatorConfig } from './schema';

export const pkSimulatorStandardDemo: PkSimulatorConfig = {
  drugName: 'Gentamicin',
  prompt:
    'Design an aminoglycoside regimen targeting a peak concentration of 6–10 mg/L and a trough under 2 mg/L to minimize nephrotoxicity.',
  defaultDoseMg: 120,
  defaultClearanceLHr: 4.5,
  defaultVdL: 20,
  defaultBioavailabilityF: 1.0,
  defaultKa: 2.0,
  therapeuticWindow: [2, 10],
  routes: ['iv_bolus'],
  source: {
    file: '2-reseptrler.pdf',
    page: 33,
  },
  explanation:
    'Aminoglycosides display concentration-dependent bacterial killing (Cmax/MIC ratio >= 10) and post-antibiotic effect. Maintaining troughs below 2 mg/L prevents saturable accumulation in renal cortical proximal tubular cells.',
};
