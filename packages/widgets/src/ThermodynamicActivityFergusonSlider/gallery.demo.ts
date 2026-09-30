import { ThermodynamicActivityFergusonConfig } from './schema';

export const thermodynamicActivityFergusonStandardDemo: ThermodynamicActivityFergusonConfig =
  {
    title: 'Ferguson Prensibi & Termodinamik Aktivite',
    prompt:
      'Yapısal olmayan anestetiklerin termodinamik aktivitesini (a = Pt/P0) ayarlayarak anestezi penceresini ve faz doygunluğu kesilme sınırını inceleyin.',
    defaultMode: 'vapor',
    defaultAgent: 'ether',
    locale: 'tr',
    source: {
      file: 'Farmasötik Kimya 1-Giriş.pdf',
      page: 19,
    },
    explanation:
      'Ferguson prensibine göre kimyasal yapıları tamamen farklı olan maddeler, eşit termodinamik aktivite değerlerinde (a ≈ 0.02-0.05) aynı biyolojik etkiyi (cerrahi anestezi) gösterirler.',
  };
