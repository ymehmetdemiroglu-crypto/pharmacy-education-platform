import { IonizationEquilibriumConfig } from './schema';

export const ionizationEquilibriumStandardDemo: IonizationEquilibriumConfig = {
  title: 'İyonizasyon Dengesi & Henderson-Hasselbalch',
  prompt: 'Aspirin (pKa 3.5) için ortam pH değişiminin iyonizasyon ve membran geçirgenliğine etkisini inceleyin.',
  drugName: 'Aspirin',
  defaultPka: 3.5,
  defaultPh: 7.4,
  defaultDrugType: 'acid',
  locale: 'tr',
  showBioGradients: true,
  source: {
    file: 'Farmasötik Kimya 1-Giriş.pdf',
    page: 21,
  },
  explanation: 'Zayıf asitler düşük pH (mide) ortamında iyonize olmayarak membranlardan hızla emilirken, plazmada (pH 7.4) iyonize olarak kanda tutulurlar.',
};
