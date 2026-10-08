/**
 * Daily Study Habit Engine Service ("Günün 10 Sorusuna Odaklan")
 * Implements the 10-step daily challenge loop, FSRS-4.5 interval updates,
 * diagnostic misconception integration, and Anki export.
 * Specification: docs/daily-study-habit-engine.md Section 1
 */

import {
  FsrsCard,
  processFsrsCardReview,
  exportToAnkiTsv,
  FsrsGrade,
} from '@pharmacy/platform';
import {
  MisconceptionCode,
  recordMisconceptionOutcome,
} from './misconceptionService';

export interface ChallengeOption {
  id: string;
  text: string;
  isCorrect: boolean;
  diagnosticFeedback: string;
  trapCode?: MisconceptionCode;
}

export interface DailyChallengeStep {
  id: string;
  stepNumber: number; // 1 to 10
  type: 'spaced_review' | 'curriculum_progression' | 'tactile_simulation' | 'vize_trap_twin';
  courseId: 'medchem' | 'pharmacology';
  topic: string;
  subtopic: string;
  prompt: string; // Strict <= 40 words
  slideCitation: string;
  predictThenReveal: boolean;
  options: ChallengeOption[];
  hints: [string, string, string]; // [Nudge, Clue, Solution]
  tactileConfig?: {
    type: 'pka_slider' | 'sar_bioisostere' | 'gpcr_cascade';
    initialValue: number | string;
    targetValue: number | string;
    unit?: string;
  };
  takeaway: string;
}

export interface DailySessionState {
  date: string; // YYYY-MM-DD
  isCompleted: boolean;
  currentStepIndex: number;
  answers: Record<string, string>; // stepId -> optionId
  stepGrades: Record<string, FsrsGrade>;
  score: number; // Correct count
  earnedXP: number;
  completedAt?: string;
}

export const CANONICAL_DAILY_TEN_QUESTIONS: DailyChallengeStep[] = [
  // --- CARDS 1-3: SPACED REVIEW (Active Recall) ---
  {
    id: 'daily-q01',
    stepNumber: 1,
    type: 'spaced_review',
    courseId: 'medchem',
    topic: 'Fizikokimyasal Özellikler',
    subtopic: 'Henderson-Hasselbalch & Pasif Difüzyon',
    prompt: 'İdrar pH\'sı 5.0 olan bir hastada, pKa\'sı 3.5 olan asetilsalisilik asidin klirensini hızlandırmak için hangi fizyolojik müdahale yapılmalıdır?',
    slideCitation: 'Fizikokimyasal Özellikler, Slayt 16',
    predictThenReveal: true,
    options: [
      {
        id: 'opt-1a',
        text: 'İdrarı sodyum bikarbonat ile bazikleştirmek',
        isCorrect: true,
        diagnosticFeedback: 'Doğru: Zayıf asitler bazik ortamda (pH > pKa) iyonlaşır (iyon tuzağı). İyonlaşan asit tübüllerden geri emilemeyerek hızla atılır.',
        trapCode: 'TRAP-01-IONIZATION',
      },
      {
        id: 'opt-1b',
        text: 'İdrarı amonyum klorür ile asitleştirmek',
        isCorrect: false,
        diagnosticFeedback: 'Tuzak: Asidik ortamda zayıf asit moleküler forma döner; tübüllerden lipofilik pasif difüzyonla geri emilerek kanda birikir.',
        trapCode: 'TRAP-01-IONIZATION',
      },
      {
        id: 'opt-1c',
        text: 'Plazma protein bağlama oranını düşürmek',
        isCorrect: false,
        diagnosticFeedback: 'Yanlış: Plazma protein oranı renal tübüler iyon tuzağı kinetiğini doğrudan belirlemez.',
      },
      {
        id: 'opt-1d',
        text: 'Glomerüler filtrasyonu durdurmak',
        isCorrect: false,
        diagnosticFeedback: 'Yanlış: Filtrasyonun durdurulması klirensi hızlandırmaz, tam aksine toksisiteyi artırır.',
      },
    ],
    hints: [
      'Nudge: Zayıf asitlerin iyonlaşma dengesini hatırla: pH arttıkça iyonize form artar mı?',
      'Clue: İyonlaşan moleküller lipit çift tabakadan geçemez (iyon tuzağı).',
      'Solution: Sodyum bikarbonat verilerek idrar alkali yapılır (pH 7-8), salisilat iyonlaşır ve geri emilemez.',
    ],
    takeaway: 'Zayıf asit zehirlenmelerinde (aspirin) idrar sodyum bikarbonatla bazikleştirilerek iyon tuzağı oluşturulur.',
  },
  {
    id: 'daily-q02',
    stepNumber: 2,
    type: 'spaced_review',
    courseId: 'pharmacology',
    topic: 'Doz-Yanıt İlişkileri',
    subtopic: 'Potens (EC50) vs Efikasite (Emax)',
    prompt: 'İlaç A\'nın EC50 değeri 2 nM, Emax değeri %60; İlaç B\'nin EC50 değeri 50 nM, Emax değeri %100\'dür. Şiddetli ağrıda hangisi tercih edilmelidir?',
    slideCitation: 'Doz-Yanıt Eğrileri, Slayt 24',
    predictThenReveal: true,
    options: [
      {
        id: 'opt-2a',
        text: 'İlaç B — Klinik tavan analjeziyi sadece Emax belirler',
        isCorrect: true,
        diagnosticFeedback: 'Doğru: Potens sadece gereken dozu belirler. Klinik maksimum cevabı efikasite (Emax) tayin eder.',
        trapCode: 'TRAP-02-POTENCY-EFFICACY',
      },
      {
        id: 'opt-2b',
        text: 'İlaç A — Düşük EC50 her zaman daha güçlü klinik tavan sağlar',
        isCorrect: false,
        diagnosticFeedback: 'Tuzak: Potens (düşük EC50) dozu azaltır, fakat tavan etkiyi artıramaz. İlaç A parsiyel agonisttir.',
        trapCode: 'TRAP-02-POTENCY-EFFICACY',
      },
      {
        id: 'opt-2c',
        text: 'İlaç A — Yüksek dozda verildiğinde Emax %100\'e ulaşır',
        isCorrect: false,
        diagnosticFeedback: 'Tuzak: Parsiyel agonistin dozu ne kadar artırılırsa artırılsın tavan etkisi intrinsik aktivitesiyle sınırlıdır (%60).',
        trapCode: 'TRAP-02-POTENCY-EFFICACY',
      },
      {
        id: 'opt-2d',
        text: 'Fark etmez — İki molekül aynı reseptörü uyardığı için klinik etki eşittir',
        isCorrect: false,
        diagnosticFeedback: 'Yanlış: İntrinsik aktiviteleri farklıdır (0.60 vs 1.00).',
      },
    ],
    hints: [
      'Nudge: EC50 eğrinin yatay eksendeki konumunu, Emax ise dikey tavanını gösterir.',
      'Clue: Şiddetli ağrıda daha az miligram almak mı yoksa daha yüksek ağrı kesici tavan mı kritiktir?',
      'Solution: Efikasitesi %100 olan İlaç B tercih edilmelidir. İlaç A parsiyel agonisttir.',
    ],
    takeaway: 'Potens (EC50) miligramı, Efikasite (Emax) ise klinik tavan etkiyi belirler.',
  },
  {
    id: 'daily-q03',
    stepNumber: 3,
    type: 'spaced_review',
    courseId: 'medchem',
    topic: 'Lokal Anestezikler SAR',
    subtopic: 'Ester vs Amit Hidrolizi & Alerji Riski',
    prompt: 'Prokain ve Lidokain moleküllerinden hangisi psödokolinesteraz enzimince plazmada saniyeler içinde hidroliz olarak PABA türevi alerjik metabolit oluşturur?',
    slideCitation: 'Lokal Anestezikler SAR, Slayt 32',
    predictThenReveal: true,
    options: [
      {
        id: 'opt-3a',
        text: 'Prokain — Ara zincirinde ester köprüsü taşıdığı için',
        isCorrect: true,
        diagnosticFeedback: 'Doğru: Ester lokal anestezikler (prokain, tetrakain) plazma psödokolinesterazıyla saniyeler içinde parçalanır ve PABA açığa çıkarır.',
        trapCode: 'TRAP-03-ESTER-AMIDE',
      },
      {
        id: 'opt-3b',
        text: 'Lidokain — Amit bağı esterazlara karşı daha dayanıksız olduğu için',
        isCorrect: false,
        diagnosticFeedback: 'Tuzak: Amit bağları plazma esterazlarına tam dirençlidir; karaciğer CYP enzimleri ile metabolize edilir.',
        trapCode: 'TRAP-03-ESTER-AMIDE',
      },
      {
        id: 'opt-3c',
        text: 'Her ikisi de — Plazma esterazları tüm anestezikleri eşit hızda yıkar',
        isCorrect: false,
        diagnosticFeedback: 'Yanlış: Esterazlar sadece ester köprülerini yıkar, amitleri tanıyamaz.',
        trapCode: 'TRAP-03-ESTER-AMIDE',
      },
      {
        id: 'opt-3d',
        text: 'Yalnızca Lidokain — PABA alerjisi amit yapılı moleküllere özgüdür',
        isCorrect: false,
        diagnosticFeedback: 'Tuzak: Amit türevlerinde PABA metaboliti oluşmaz, alerji riski çok düşüktür.',
        trapCode: 'TRAP-03-ESTER-AMIDE',
      },
    ],
    hints: [
      'Nudge: Prokain yapısındaki -COO- ester bağı ile Lidokain yapısındaki -NH-CO- amit bağını kıyasla.',
      'Clue: Plazmada dolaşan psödokolinesteraz enzimi hangi bağı kesebilir?',
      'Solution: Prokain esterdir; esteraz ile hızla para-aminobenzoik asite (PABA) hidroliz olur.',
    ],
    takeaway: 'Ester lokal anestezikler (Prokain) plazmada hızla hidroliz olup PABA alerjisi riski taşırken, amitler (Lidokain) karaciğerde metabolize olur.',
  },

  // --- CARDS 4-7: CURRICULUM PROGRESSION ---
  {
    id: 'daily-q04',
    stepNumber: 4,
    type: 'curriculum_progression',
    courseId: 'pharmacology',
    topic: 'Reseptör Sinyal Yolakları',
    subtopic: 'Gq Heterotrimerik Kaskadı',
    prompt: 'Gq kenetli bir reseptör (örn. α1 veya M1/M3) uyarıldığında hücre içinde hangi ikincil haberciler tetiklenir?',
    slideCitation: 'GPCR Sinyal Yolakları, Slayt 12-14',
    predictThenReveal: true,
    options: [
      {
        id: 'opt-4a',
        text: 'Fosfolipaz C aktive olur → IP3 ve DAG üretilir → Hücre içi Ca2+ artar',
        isCorrect: true,
        diagnosticFeedback: 'Doğru: Gq proteini PLC-β enzimini uyarır. PIP2 parçalanarak IP3 (kalsiyum salınımı) ve DAG (PKC aktivasyonu) oluşur.',
      },
      {
        id: 'opt-4b',
        text: 'Adenilat siklaz aktive olur → cAMP artar → PKA uyarılır',
        isCorrect: false,
        diagnosticFeedback: 'Yanlış: Bu kaskat Gs proteinine aittir (örn. β1, β2 reseptörleri).',
      },
      {
        id: 'opt-4c',
        text: 'Adenilat siklaz inhibe olur → cAMP azalır',
        isCorrect: false,
        diagnosticFeedback: 'Yanlış: Bu yolak Gi proteinine aittir (örn. α2, M2 reseptörleri).',
      },
      {
        id: 'opt-4d',
        text: 'Tirozin kinaz doğrudan otofosforillenir',
        isCorrect: false,
        diagnosticFeedback: 'Yanlış: Bu mekanizma insülin ve büyüme faktörü reseptörlerine aittir, GPCR\'lara değil.',
      },
    ],
    hints: [
      'Nudge: G proteinleri üçe ayrılır: Gs (uyarıcı cAMP), Gi (inhibitör cAMP), Gq (kalsiyum).',
      'Clue: Membrandaki PIP2 fosfolipidini yıkan enzim hangisidir?',
      'Solution: Gq → Fosfolipaz C (PLC) → IP3 (Ca2+ ↑) + DAG (PKC ↑).',
    ],
    takeaway: 'Gq proteini Fosfolipaz C aracılığıyla IP3/DAG üreterek hücre içi serbest kalsiyumu artırır.',
  },
  {
    id: 'daily-q05',
    stepNumber: 5,
    type: 'curriculum_progression',
    courseId: 'medchem',
    topic: 'Biyoizosterizm İlkeleri',
    subtopic: 'Karboksilik Asit & 5-Sübstitüe Tetrazol',
    prompt: 'Bir ilaçtaki -COOH grubu yerine 5-sübstitüe tetrazol halkası getirildiğinde molekülde hangi temel fizikokimyasal değişim gözlenir?',
    slideCitation: 'Biyoizosterizm İlkeleri, Slayt 9',
    predictThenReveal: true,
    options: [
      {
        id: 'opt-5a',
        text: 'Asitlik (pKa ~4.5-4.9) korunur, fakat lipofiliti (LogP) belirgin artarak zar geçişi yükselir',
        isCorrect: true,
        diagnosticFeedback: 'Doğru: Tetrazol halkası -COOH ile benzer pKa\'ya sahip planar bir non-klasik biyoizosterdir; lipofilitiyi ~10 kat artırır.',
        trapCode: 'TRAP-05-BIOISOSTERE-LOGP',
      },
      {
        id: 'opt-5b',
        text: 'Molekül asitliğini tamamen kaybederek bazik karaktere bürünür',
        isCorrect: false,
        diagnosticFeedback: 'Tuzak: 5-sübstitüe tetrazol halkasındaki azot atomları üzerindeki hidrojen pKa ~4.5 civarında asidiktir.',
        trapCode: 'TRAP-05-BIOISOSTERE-LOGP',
      },
      {
        id: 'opt-5c',
        text: 'Molekül suda çözünmez hale gelerek tamamen çöker',
        isCorrect: false,
        diagnosticFeedback: 'Yanlış: Fizyolojik pH\'da iyonlaşabildiği için suda çözünürlüğü korunur.',
      },
      {
        id: 'opt-5d',
        text: 'Molekülün LogP değeri sıfıra düşer',
        isCorrect: false,
        diagnosticFeedback: 'Tuzak: Tetrazol aromatik elektron bulutu ve lipofilik çekirdeği nedeniyle LogP değerini düşürmez, artırır.',
        trapCode: 'TRAP-05-BIOISOSTERE-LOGP',
      },
    ],
    hints: [
      'Nudge: Losartan molekülünü hatırla. Karboksilik asit yerine ne yerleştirilmişti?',
      'Clue: Tetrazol 4 azotlu bir halkadır ancak protonu kolayca verebilir.',
      'Solution: Tetrazol asitliği (pKa ~4.5) korurken LogP\'yi artırarak biyoyararlanımı yükseltir.',
    ],
    takeaway: '5-Sübstitüe tetrazol, karboksilik asidin asitliğini korurken lipofiliti ve biyoyararlanımı artıran klasik olmayan biyoizosterdir.',
  },
  {
    id: 'daily-q06',
    stepNumber: 6,
    type: 'curriculum_progression',
    courseId: 'pharmacology',
    topic: 'Otonom Sinir Sistemi',
    subtopic: 'Adrenerjik Reseptör Tersinmesi',
    prompt: 'Düşük doz adrenalin infüzyonunda periferik damar direncinin düşmesi (vazodilatasyon) hangi reseptör alt tipinin afinite üstünlüğü ile açıklanır?',
    slideCitation: 'Adrenerjik Reseptörler, Slayt 20',
    predictThenReveal: true,
    options: [
      {
        id: 'opt-6a',
        text: 'β2 reseptörlerinin adrenaline karşı α1 reseptörlerinden daha yüksek afiniteli olması',
        isCorrect: true,
        diagnosticFeedback: 'Doğru: Düşük konsantrasyonda adrenalin yüksek afiniteli β2 (Gs) reseptörlerine bağlanarak iskelet kası damarlarında vazodilatasyon yapar.',
        trapCode: 'TRAP-04-ADRENERGIC-INVERSION',
      },
      {
        id: 'opt-6b',
        text: 'α1 reseptörlerinin sadece damar gevşetici etki göstermesi',
        isCorrect: false,
        diagnosticFeedback: 'Tuzak: α1 reseptörleri Gq kenetlidir ve kalsiyum artışıyla daima vazokonstriksiyon (daralma) yapar.',
        trapCode: 'TRAP-04-ADRENERGIC-INVERSION',
      },
      {
        id: 'opt-6c',
        text: 'β1 reseptörlerinin kalp hızını yavaşlatması',
        isCorrect: false,
        diagnosticFeedback: 'Yanlış: β1 kalbi hızlandırır ve kasılmayı artırır.',
      },
      {
        id: 'opt-6d',
        text: 'Adrenalinin muskarinik M2 reseptörlerini bloke etmesi',
        isCorrect: false,
        diagnosticFeedback: 'Yanlış: Adrenalin adrenerjik bir agonisttir; muskarinik reseptörlerle doğrudan etkileşmez.',
      },
    ],
    hints: [
      'Nudge: Damar yatağında iki zıt kuvvet vardır: α1 (daraltıcı) ve β2 (genişletici).',
      'Clue: Düşük plazma seviyesinde hangi reseptör ilaca daha açtır?',
      'Solution: Adrenalinin β2 afinitesi α1\'den yüksektir; bu nedenle düşük dozda β2 vazodilatasyonu baskındır.',
    ],
    takeaway: 'Adrenalin düşük dozda yüksek afiniteli β2 ile vazodilatasyon, yüksek dozda ise baskın α1 ile vazokonstriksiyon oluşturur.',
  },
  {
    id: 'daily-q07',
    stepNumber: 7,
    type: 'curriculum_progression',
    courseId: 'pharmacology',
    topic: 'İlaç Metabolizması',
    subtopic: 'Faz I vs Faz II Biyotransformasyon',
    prompt: 'Karaciğerde Faz I (CYP450) oksidasyonuna uğrayan bir lipofilik ksenobiyotiğin Faz II glukuronidasyona gereksinim duymasının temel nedeni nedir?',
    slideCitation: 'İlaç Metabolizması, Slayt 7',
    predictThenReveal: true,
    options: [
      {
        id: 'opt-7a',
        text: 'Faz I ürününün genellikle henüz renal yoldan atılacak kadar polar olmaması ve fonksiyonel grup açığa çıkarması',
        isCorrect: true,
        diagnosticFeedback: 'Doğru: Faz I sadece bir tutunma noktası (-OH, -COOH) ekler. Molekül hala lipofilik olabilir. Faz II glukuronik asit ekleyerek kütleyi ve iyonlaşmayı artırıp atılımı sağlar.',
        trapCode: 'TRAP-06-PHASE-METABOLISM',
      },
      {
        id: 'opt-7b',
        text: 'Faz I enzimlerinin molekülün molekül ağırlığını 10 katına çıkarması',
        isCorrect: false,
        diagnosticFeedback: 'Yanlış: Faz I ağırlığı anlamlı değiştirmez; bir tek oksijen veya hidroksil grubu ekler.',
      },
      {
        id: 'opt-7c',
        text: 'Faz II reaksiyonlarının daima molekülü daha lipofilik yapması',
        isCorrect: false,
        diagnosticFeedback: 'Tuzak: Glukuronidasyon son derece polardır ve suda çözünürlüğü katbekat artırır.',
        trapCode: 'TRAP-06-PHASE-METABOLISM',
      },
      {
        id: 'opt-7d',
        text: 'Tüm ilaçların Faz I basamağını tamamen atlayarak doğrudan Faz II\'ye geçmesi',
        isCorrect: false,
        diagnosticFeedback: 'Yanlış: Sadece hazır tutunma grubu (-OH, -NH2) olan ilaçlar (örn. morfin) doğrudan Faz II\'ye girebilir.',
      },
    ],
    hints: [
      'Nudge: Faz I reaksiyonunun birincil amacı molekülü yok etmek midir yoksa işlevselleştirmek (functionalization) midir?',
      'Clue: Renal atılım için molekülün iyonize ve yüksek oranda hidrofilik olması şarttır.',
      'Solution: Faz I sadece polar kanca (-OH) açar; Faz II bu kancaya hacimli glukuronat bağlayarak suda çözünür kılar.',
    ],
    takeaway: 'Faz I fonksiyonel kanca oluşturur; Faz II konjugasyonu moleküle polar hacim ekleyerek renal/biliyer atılımı tamamlar.',
  },

  // --- CARDS 8-9: TACTILE SIMULATIONS ---
  {
    id: 'daily-q08',
    stepNumber: 8,
    type: 'tactile_simulation',
    courseId: 'medchem',
    topic: 'Fizikokimyasal Simülasyon',
    subtopic: 'Amfoterik Siprofloksasin İyonlaşma Speciasyonu',
    prompt: 'Siprofloksasin (pKa1=6.09 karboksil, pKa2=8.74 piperazin) kan pH\'sı 7.4\'te ağırlıklı olarak hangi formda bulunur?',
    slideCitation: 'Fizikokimyasal Özellikler, Slayt 18',
    predictThenReveal: true,
    tactileConfig: {
      type: 'pka_slider',
      initialValue: 7.4,
      targetValue: 7.4,
      unit: 'pH',
    },
    options: [
      {
        id: 'opt-8a',
        text: '%91.35 Zwitterion (Net yüksüz diprotik dipol)',
        isCorrect: true,
        diagnosticFeedback: 'Doğru: pH 7.4 iki pKa arasındadır. Karboksil grubu deprotonlanmış (-COO⁻), piperazin protonlanmıştır (-NH₂⁺). Net yük sıfırdır ve porinlerden bu form geçer.',
        trapCode: 'TRAP-01-IONIZATION',
      },
      {
        id: 'opt-8b',
        text: '%99.9 Katyonik (Her iki grup protonlu)',
        isCorrect: false,
        diagnosticFeedback: 'Tuzak: Katyonik form sadece asidik pH < 6.09 koşullarında oluşur.',
        trapCode: 'TRAP-01-IONIZATION',
      },
      {
        id: 'opt-8c',
        text: '%99.9 Anyonik (Her iki grup deprotonlu)',
        isCorrect: false,
        diagnosticFeedback: 'Tuzak: Anyonik form sadece bazik pH > 8.74 koşullarında hakimdir.',
        trapCode: 'TRAP-01-IONIZATION',
      },
      {
        id: 'opt-8d',
        text: '%50 Katyon + %50 Anyon',
        isCorrect: false,
        diagnosticFeedback: 'Yanlış: İki pKa arasındaki geniş aralık (6.09 - 8.74) zwitterionik bölgeyi %91\'in üzerine taşır.',
      },
    ],
    hints: [
      'Nudge: 7.4 değeri 6.09\'dan büyük, 8.74\'ten küçüktür. Grupların iyonlaşma durumlarını ayrı ayrı düşün.',
      'Clue: -COOH grubu 7.4\'te protonunu vermiş (-COO⁻), amin grubu ise henüz protonunu korumaktadır (-NH₂⁺).',
      'Solution: Diprotik Henderson-Hasselbalch dengesi uyarınca %91.35 oranında zwitterion mevcuttur.',
    ],
    takeaway: 'Siprofloksasin fizyolojik pH 7.4\'te %91.35 zwitterion formundadır; bu net nötr form bakteriyel porinleri geçer.',
  },
  {
    id: 'daily-q09',
    stepNumber: 9,
    type: 'tactile_simulation',
    courseId: 'pharmacology',
    topic: 'Farmakokinetik Simülasyon',
    subtopic: 'İki Kompartmanlı Açık İntravenöz Model',
    prompt: 'Lipofilik bir ilaç (örn. Tiyopental veya Fentanil) IV bolus verildiğinde plazma konsantrasyonundaki ilk hızlı düşüş (alfa fazı) neyi temsil eder?',
    slideCitation: 'Farmakokinetik Modeller, Slayt 28',
    predictThenReveal: true,
    tactileConfig: {
      type: 'pka_slider',
      initialValue: 1,
      targetValue: 2,
      unit: 'Kompartman',
    },
    options: [
      {
        id: 'opt-9a',
        text: 'Merkezi kompartmandan periferik dokulara (kas, yağ) hızlı dağılım fazı',
        isCorrect: true,
        diagnosticFeedback: 'Doğru: Lipofilik ilaçlarda erken hızlı konsantrasyon düşüşü eliminasyon değil, dokulara dağılım (alfa fazı) sonucudur.',
      },
      {
        id: 'opt-9b',
        text: 'İlacın karaciğerde tamamen parçalanarak yok olması',
        isCorrect: false,
        diagnosticFeedback: 'Tuzak: Erken faz eliminasyon değil dokusal dağılımdır. Eliminasyon daha yavaş olan beta fazında gerçekleşir.',
      },
      {
        id: 'opt-9c',
        text: 'İlacın plazma proteinlerine bağlanıp inaktif kalması',
        isCorrect: false,
        diagnosticFeedback: 'Yanlış: Protein bağlama mikrosaniyeler içinde dengeye gelir; saatler süren eğriyi açıklamaz.',
      },
      {
        id: 'opt-9d',
        text: 'Böbrek glomerüllerinin tıkanması',
        isCorrect: false,
        diagnosticFeedback: 'Yanlış: Glomerüler tıkanma klirensi düşürür, konsantrasyonu düşürmez.',
      },
    ],
    hints: [
      'Nudge: İki kompartmanlı modelde eğri iki eğim gösterir: dik düşen alfa ve yatık beta.',
      'Clue: Tiyopental hastayı birkaç dakikada uyandırır. İlaç vücuttan atıldığı için mi yoksa beyinden kas/yağa dağıldığı için mi?',
      'Solution: Alfa fazı dokulara dağılımdır. Gerçek eliminasyon beta fazında gerçekleşir.',
    ],
    takeaway: 'İki kompartmanlı modelde alfa fazı periferik dokulara hızlı dağılımı, beta fazı ise gerçek eliminasyonu gösterir.',
  },

  // --- CARD 10: VIZE TRAP TWIN ---
  {
    id: 'daily-q10',
    stepNumber: 10,
    type: 'vize_trap_twin',
    courseId: 'medchem',
    topic: 'Vize Sentez Tuzağı',
    subtopic: 'Salisilat Rezonansı vs İntramoleküler H-Bağı',
    prompt: 'Salisilik asidin (orto-hidroksibenzoik asit, pKa 2.97) benzoik asitten (pKa 4.19) 16 kat daha kuvvetli asit olmasının asıl mekanizması nedir?',
    slideCitation: 'Farmasötik Kimya 1, Vize Tuzağı Slayt 14',
    predictThenReveal: true,
    options: [
      {
        id: 'opt-10a',
        text: 'Fenolik hidroksil grubu ile karboksilat anyonu arasındaki molekül içi hidrojen bağı ile konjüge bazın kararlı kılınması',
        isCorrect: true,
        diagnosticFeedback: 'Doğru: Proton ayrıldığında geriye kalan -COO⁻ anyonu, komşu fenolik -OH ile 6 üyeli molekül içi H-bağı halkası kurar. Bu olağanüstü kararlılık asitliği 16 kat artırır.',
      },
      {
        id: 'opt-10b',
        text: 'Fenolik -OH grubunun kuvvetli elektron çekici rezonans (-M) etkisi yapması',
        isCorrect: false,
        diagnosticFeedback: 'Tuzak: Fenolik -OH aromatik halkaya rezonansla elektron verir (+M), elektron çekmez! Asitliği artıran rezonans değil molekül içi H-bağıdır.',
        trapCode: 'TRAP-01-IONIZATION',
      },
      {
        id: 'opt-10c',
        text: 'Molekülün sudaki çözünürlüğünün sıfıra inmesi',
        isCorrect: false,
        diagnosticFeedback: 'Yanlış: Çözünürlük asitlik sabiti pKa\'yı doğrudan belirlemez.',
      },
      {
        id: 'opt-10d',
        text: 'Salisilik asidin dimerleşerek iki proton birden vermesi',
        isCorrect: false,
        diagnosticFeedback: 'Yanlış: Salisilik asit monoprotik karboksilik asit olarak davranır (ilk basamakta).',
      },
    ],
    hints: [
      'Nudge: Orto konumundaki iki oksijen atomu arasındaki mesafeyi düşün.',
      'Clue: Karboksil grubu protonunu verdiğinde komşu fenolik hidrojen ile nasıl bir bağ kurabilir?',
      'Solution: Karboksilat anyonu intramoleküler hidrojen bağı ile 6 üyeli psödo-halka oluşturarak anyonu stabilize eder.',
    ],
    takeaway: 'Salisilat anyonu molekül içi hidrojen bağı ile olağanüstü kararlı kılınır; bu nedenle salisilik asit benzoik asitten çok daha kuvvetli bir asittir.',
  },
];

const DAILY_SESSION_KEY_PREFIX = 'pharmlearn_daily_session_';

export function getTodayDateString(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export function loadDailySession(dateStr: string = getTodayDateString()): DailySessionState {
  if (typeof window === 'undefined') {
    return {
      date: dateStr,
      isCompleted: false,
      currentStepIndex: 0,
      answers: {},
      stepGrades: {},
      score: 0,
      earnedXP: 0,
    };
  }

  try {
    const raw = localStorage.getItem(`${DAILY_SESSION_KEY_PREFIX}${dateStr}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('[DailyHabitService] Error loading daily session:', err);
  }

  return {
    date: dateStr,
    isCompleted: false,
    currentStepIndex: 0,
    answers: {},
    stepGrades: {},
    score: 0,
    earnedXP: 0,
  };
}

export function saveDailySession(session: DailySessionState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${DAILY_SESSION_KEY_PREFIX}${session.date}`, JSON.stringify(session));
  } catch (err) {
    console.warn('[DailyHabitService] Error saving daily session:', err);
  }
}

/**
 * Submits an answer for a specific challenge step.
 * Updates FSRS card scheduling, triggers misconception tracking, and advances session state.
 */
export function submitChallengeStep(
  step: DailyChallengeStep,
  selectedOptionId: string,
  hintsUsedCount: number,
  sessionDate: string = getTodayDateString()
): {
  isCorrect: boolean;
  selectedOption: ChallengeOption;
  session: DailySessionState;
} {
  const session = loadDailySession(sessionDate);
  const selectedOption = step.options.find((o) => o.id === selectedOptionId);
  if (!selectedOption) {
    throw new Error(`Option with id ${selectedOptionId} not found in step ${step.id}`);
  }

  const isCorrect = selectedOption.isCorrect;

  // Grade determination for FSRS:
  // Correct without hints -> Grade 4 (Easy)
  // Correct with hints -> Grade 3 (Good)
  // Incorrect with trap -> Grade 1 (Again)
  // Incorrect general -> Grade 2 (Hard)
  let grade: FsrsGrade;
  if (isCorrect) {
    grade = hintsUsedCount === 0 ? 4 : 3;
  } else {
    grade = selectedOption.trapCode ? 1 : 2;
  }

  // Update Misconception Diagnostic Memory if this option had a trap
  if (selectedOption.trapCode) {
    recordMisconceptionOutcome(
      selectedOption.trapCode,
      step.id,
      isCorrect,
      selectedOption.text
    );
  }

  // Update session record
  session.answers[step.id] = selectedOptionId;
  session.stepGrades[step.id] = grade;
  if (isCorrect) {
    session.score += 1;
    session.earnedXP += 10;
  } else {
    session.earnedXP += 2; // Desirable difficulty engagement credit
  }

  const isLastStep = step.stepNumber >= CANONICAL_DAILY_TEN_QUESTIONS.length;
  if (isLastStep) {
    session.isCompleted = true;
    session.completedAt = new Date().toISOString();
    session.earnedXP += 50; // Bonus completion XP
  } else {
    session.currentStepIndex = Math.max(session.currentStepIndex, step.stepNumber);
  }

  saveDailySession(session);
  return { isCorrect, selectedOption, session };
}

/**
 * Exports current daily challenge questions into Anki TSV format
 */
export function exportDailyTenToAnkiTsv(steps: DailyChallengeStep[] = CANONICAL_DAILY_TEN_QUESTIONS): string {
  const cards: FsrsCard[] = steps.map((s) => {
    const correctOpt = s.options.find((o) => o.isCorrect);
    return {
      cardId: s.id,
      courseId: s.courseId,
      drugOrConcept: s.topic,
      prompt: `<b>[${s.courseId.toUpperCase()}] ${s.topic}</b><br>${s.prompt}`,
      answer: `<b>Doğru Cevap:</b> ${correctOpt?.text || ''}<br><br><b>Açıklama:</b> ${correctOpt?.diagnosticFeedback || s.takeaway}<br><br><i>Kaynak: ${s.slideCitation}</i>`,
      stability: 3.2,
      difficulty: 5.0,
      reps: 1,
      lapses: 0,
      state: 'review',
      lastReviewedAt: new Date().toISOString(),
      nextReviewDue: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
  });

  return exportToAnkiTsv(cards);
}
