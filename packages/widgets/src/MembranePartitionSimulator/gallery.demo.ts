import { MembranePartitionConfig } from './schema';

export const membranePartitionStandardDemo: MembranePartitionConfig = {
  title: 'Lipit Membran Partisyonu & logD Simülasyonu',
  prompt: 'Ortam pH değeri ve fonksiyonel grup sübstitüsyonlarının (Hansch π) logD ve membran geçirgenliğine etkisini inceleyin.',
  defaultLogP: 2.5,
  defaultPka: 4.2,
  defaultPh: 7.4,
  defaultCompoundType: 'acid',
  locale: 'tr',
  source: {
    file: 'Farmasötik Kimya 1-Giriş.pdf',
    page: 25,
  },
  explanation: 'Fizyolojik pH 7.4 ortamında zayıf asitlerin logD değeri iyonlaşma nedeniyle logP değerinden belirgin ölçüde düşüktür; bu durum pasif transselüler difüzyonu sınırlar.',
};
