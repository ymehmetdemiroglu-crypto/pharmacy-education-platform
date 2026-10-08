import { SocraticAudioPrompt } from '../types/metrobusAudio.types';

export const METROBUS_AUDIO_PROMPTS: SocraticAudioPrompt[] = [
  {
    promptId: 'MB-PHARM-01',
    trapCode: 'TRAP-08-AChE-AGING',
    courseId: 'pharmacology',
    turnIndex: 0,
    title: 'AChE Organofosfat ve Yaşlanma Kinetiği',
    topic: 'Otonom Sinir Sistemi & Toksikoloji',
    // 12 words (<= 25 constraint)
    turkishSpeechText: 'Organofosfat zehirlenmesinde pralidoksimi ilk 24 saat içinde vermezsek ne olur? Reaksiyonu açıkla.',
    expectedKeywords: [
      'yaşlanma',
      'yaşlanır',
      'alkil',
      'kovalent',
      'kalıcı',
      'kopamaz',
      'negatif yük',
      'kopması'
    ],
    misconceptionKeywords: [
      'kompetitif',
      'esteraz',
      'atropin',
      'asetilasyon'
    ],
    // 11 words (<= 20 constraint)
    affirmationText: 'Tam isabet! Alkil grubu koparak kovalent bağ kalıcılaşır ve enzim yaşlanır.',
    // 12 words (<= 22 constraint)
    verbalNudgeText: 'İpucu: Enzim üzerindeki fosfat esterinden bir alkil grubu ayrılınca ne meydana gelir?',
    detailedExplanation: 'Organofosfatlar AChE serin hidroksilini kovalent fosforiller. Saatler içinde alkil grubunun hidroliz olmasıyla ("yaşlanma") fosfat oksijeni negatif yük kazanır. Pralidoksim (2-PAM) bu negatif yükle elektrostatik itme yaşadığından enzimi artık reaktive edemez.',
    quickOptions: [
      {
        id: 'opt-1',
        label: 'Enzim yaşlanır (alkil kopar, kalıcı blokaj)',
        isCorrect: true,
        diagnosticMessage: 'Doğru: Alkil grubu ayrılarak kalıcı negatif yüklü fosfat bağı oluşur.'
      },
      {
        id: 'opt-2',
        label: 'AChE kendiliğinden dakikalar içinde açılır',
        isCorrect: false,
        diagnosticMessage: 'Yanılgı: Organofosfat kovalenttir; karbamat gibi hızla rejenere olamaz.'
      },
      {
        id: 'opt-3',
        label: 'Atropin bağlandığı için 2-PAM gereksizleşir',
        isCorrect: false,
        diagnosticMessage: 'Yanılgı: Atropin muskarinik reseptörü bloke eder; enzimi kurtarmaz.'
      }
    ]
  },
  {
    promptId: 'MB-MEDCHEM-02',
    trapCode: 'TRAP-03-ESTER-AMIDE',
    courseId: 'medchem',
    turnIndex: 1,
    title: 'Lokal Anesteziklerde Ester vs Amid Hidrolizi',
    topic: 'Farmasötik Kimya & Lokal Anestezikler',
    // 13 words (<= 25 constraint)
    turkishSpeechText: 'Prokain plazmada psödokolinesteraz ile dakikalar içinde yıkılırken, lidokain neden karaciğerde saatlerce metabolize olur?',
    expectedKeywords: [
      'amid',
      'ester',
      'rezonans',
      'kararlı',
      'direnç',
      'plazma',
      'karaciğer',
      'hidroliz'
    ],
    misconceptionKeywords: [
      'idrar',
      'dağılım',
      'iyonlaşma',
      'çift bağ'
    ],
    // 11 words (<= 20 constraint)
    affirmationText: 'Harika! Amid bağı ester bağına göre rezonans nedeniyle çok daha kararlıdır.',
    // 10 words (<= 22 constraint)
    verbalNudgeText: 'İpucu: Moleküldeki ester ve amid gruplarının kimyasal hidroliz dirençlerini karşılaştır.',
    detailedExplanation: 'Prokain bir ester türevidir ve plazma bütirilkolinesterazı ile dakikalar içinde PABA ve dietilaminoetanole hidroliz edilir. Lidokain ise amid bağı taşır; azotun ortaklanmamış elektron çifti karbonil ile rezonansa girerek hidrolize yüksek direnç kazandırır, karaciğerde CYP1A2/3A4 ile dealkile edilir.',
    quickOptions: [
      {
        id: 'opt-1',
        label: 'Amid bağı rezonans kararlılığı taşır, ester hızlı hidroliz olur',
        isCorrect: true,
        diagnosticMessage: 'Doğru: Amid bağı elektron delokalizasyonu sayesinde plazma esterazlarına dirençlidir.'
      },
      {
        id: 'opt-2',
        label: 'Lidokain plazmada hemen parçalanır',
        isCorrect: false,
        diagnosticMessage: 'Yanılgı: Plazmada hızla yıkılan prokaindir (ester), lidokain değildir (amid).'
      },
      {
        id: 'opt-3',
        label: 'Her iki ilaç da yalnızca böbrekten değişmeden atılır',
        isCorrect: false,
        diagnosticMessage: 'Yanılgı: İkisi de yoğun metabolizmaya uğrar; değişmeden atılımları düşüktür.'
      }
    ]
  },
  {
    promptId: 'MB-PHARM-03',
    trapCode: 'TRAP-07-SCHILD-SLOPE',
    courseId: 'pharmacology',
    turnIndex: 2,
    title: 'Schild Grafiğinde Non-Kompetitif Antagonizma',
    topic: 'Genel Farmakoloji & Reseptör Teorileri',
    // 12 words (<= 25 constraint)
    turkishSpeechText: 'Schild analizinde non-kompetitif antagonist eklendiğinde grafiğin eğimi ve maksimal yanıt nasıl değişir?',
    expectedKeywords: [
      'maksimal',
      'düşer',
      'azalır',
      'eğim',
      'farklı',
      'paralel değil',
      'emax',
      'sapma'
    ],
    misconceptionKeywords: [
      'paralel',
      'değişmez',
      'artar',
      'eğim 1'
    ],
    // 10 words (<= 20 constraint)
    affirmationText: 'Doğru! Non-kompetitif blokajda maksimal yanıt düşer, eğim birden farklı çıkar.',
    // 10 words (<= 22 constraint)
    verbalNudgeText: 'İpucu: Paralel sağa kayma kompetitiftir; peki reseptör sayısı geri dönüşsüz azalırsa?',
    detailedExplanation: 'Kompetitif antagonistler Schild grafiğinde eğimi tam 1 olan paralel sağa kayma yapar ($E_{\\max}$ değişmez). Non-kompetitif veya allosterik antagonistler ise agonist ile yarışmadığından reseptör havuzunu kısıtlar; $E_{\\max}$ çöker ve Schild regresyon eğimi 1 değerinden sapar.',
    quickOptions: [
      {
        id: 'opt-1',
        label: 'Emax düşer, eğim 1\'den sapar (paralellik bozulur)',
        isCorrect: true,
        diagnosticMessage: 'Doğru: Non-kompetitif blokajda agonist konsantrasyonu artırılsa da maksimal yanıt geri getirilemez.'
      },
      {
        id: 'opt-2',
        label: 'Emax değişmez, eğim tam 1 olarak sağa kayar',
        isCorrect: false,
        diagnosticMessage: 'Yanılgı: Emax\'ın korunup eğimin 1 olması kompetitif reversibl antagonistin tanımıdır.'
      },
      {
        id: 'opt-3',
        label: 'Eğri sola kayar ve potens artar',
        isCorrect: false,
        diagnosticMessage: 'Yanılgı: Antagonist eklenmesi asla agonist potensini artıramaz.'
      }
    ]
  },
  {
    promptId: 'MB-MEDCHEM-04',
    trapCode: 'TRAP-05-BIOISOSTERE-LOGP',
    courseId: 'medchem',
    turnIndex: 3,
    title: 'Sülfonamidler ve PABA Antagonizması',
    topic: 'Kemoterapötikler & Antimetabolitler',
    // 13 words (<= 25 constraint)
    turkishSpeechText: 'Sülfametoksazol bakteride folik asit sentezini hangi enzim basamağında ve hangi molekülle yarışarak engeller?',
    expectedKeywords: [
      'dihidropteroat',
      'sentaz',
      'paba',
      'folik asit',
      'kompetitif',
      'para-aminobenzoik'
    ],
    misconceptionKeywords: [
      'dihidrofolat redüktaz',
      'trimetoprim',
      'hücre duvarı',
      'ribozom'
    ],
    // 9 words (<= 20 constraint)
    affirmationText: 'Tebrikler! Dihidropteroat sentaz basamağında PABA ile kompetitif olarak yarışır.',
    // 10 words (<= 22 constraint)
    verbalNudgeText: 'İpucu: Sülfonamid kimyasal olarak para-aminobenzoik asite (PABA) benzer; hangi enzimi hedefler?',
    detailedExplanation: 'Sülfonamidler yapısal olarak PABA\'nın klasik biyoisosteridir. Bakteriyel dihidropteroat sentaz enzimini kompetitif inhibe ederek dihidropteroik asit oluşumunu engellerler. İnsan hücreleri folatı dışarıdan besinle aldığından ve sentaz enzimine sahip olmadığından selektiftir.',
    quickOptions: [
      {
        id: 'opt-1',
        label: 'Dihidropteroat sentaz enzimi üzerinde PABA ile yarışır',
        isCorrect: true,
        diagnosticMessage: 'Doğru: Sülfonamidler PABA izosteridir ve sentaz basamağını bloke eder.'
      },
      {
        id: 'opt-2',
        label: 'Dihidrofolat redüktaz üzerinde folatla yarışır',
        isCorrect: false,
        diagnosticMessage: 'Yanılgı: Dihidrofolat redüktazı sülfonamid değil, trimetoprim veya metotreksat hedefler.'
      },
      {
        id: 'opt-3',
        label: 'Bakteriyel 50S ribozomal alt birimi bloke eder',
        isCorrect: false,
        diagnosticMessage: 'Yanılgı: Ribozom inhibisyonu makrolid veya kloramfenikolün mekanizmasıdır.'
      }
    ]
  },
  {
    promptId: 'MB-PHARM-05',
    trapCode: 'TRAP-02-POTENCY-EFFICACY',
    courseId: 'pharmacology',
    turnIndex: 4,
    title: 'Parsiyel Agonistin Dual Davranışı',
    topic: 'Farmakodinamik & Reseptör Etkinliği',
    // 14 words (<= 25 constraint)
    turkishSpeechText: 'Bir parsiyel agonist, tam agonistin bulunduğu bir ortamda uygulandığında neden antagonist gibi davranır?',
    expectedKeywords: [
      'intrensek',
      'etkinlik',
      'reseptör',
      'işgal',
      'alfa',
      'düşük',
      'engeller',
      'yarışır'
    ],
    misconceptionKeywords: [
      'afinite sıfır',
      'yıkım',
      'allosterik',
      'down-regülasyon'
    ],
    // 11 words (<= 20 constraint)
    affirmationText: 'Kusursuz! Reseptörleri işgal ederek tam agonisti engeller ama intrensek etkinliği düşüktür.',
    // 13 words (<= 22 constraint)
    verbalNudgeText: 'İpucu: Reseptör afinitesi yüksektir fakat içsel aktivite (alfa değeri) sıfır ile bir arasındadır.',
    detailedExplanation: 'Parsiyel agonistlerin intrensek etkinliği 0 ile 1 arasındadır ($0 < \\alpha < 1$). Tek başlarına hafif agonist yanıt oluştururlar. Fakat tam agonist ortamındayken reseptörleri yarışarak kaplarlar; tam agonist bağlanamadığı için sistemin toplam yanıtı düşer ve net antagonist etki gözlenir (örn: Buprenorfin, Pindolol).',
    quickOptions: [
      {
        id: 'opt-1',
        label: 'Reseptörü kaplar ama içsel aktivitesi düşüktür (net yanıtı düşürür)',
        isCorrect: true,
        diagnosticMessage: 'Doğru: 0 < alpha < 1 olduğu için tam agonistin tam yanıtını engeller.'
      },
      {
        id: 'opt-2',
        label: 'Tam agonist ile kovalent kimyasal bağ kurup onu yok eder',
        isCorrect: false,
        diagnosticMessage: 'Yanılgı: Reseptör düzeyinde yarışırlar, birbirlerini kimyasal olarak yok etmezler.'
      },
      {
        id: 'opt-3',
        label: 'Reseptör afinitesi sıfırdır, bu yüzden bağlanamaz',
        isCorrect: false,
        diagnosticMessage: 'Yanılgı: Afinitesi olmasaydı reseptöre bağlanıp agonisti bloke edemezdi.'
      }
    ]
  },
  {
    promptId: 'MB-MEDCHEM-06',
    trapCode: 'TRAP-09-PRODRUG-CES1',
    courseId: 'medchem',
    turnIndex: 5,
    title: 'Ön İlaç Biyoaktivasyonu: Enalapril vs Enalaprilat',
    topic: 'Kardiyovasküler Kimya & ACE İnhibitörleri',
    // 14 words (<= 25 constraint)
    turkishSpeechText: 'Enalapril etil ester formunda verilirken, aktif inhibitör olan enalaprilat neden doğrudan oral yoldan verilemez?',
    expectedKeywords: [
      'hidrofilik',
      'iyonize',
      'polar',
      'emilemez',
      'biyoyararlanım',
      'lipofilik',
      'karboksil'
    ],
    misconceptionKeywords: [
      'karaciğer toksisitesi',
      'ilk geçiş',
      'asit kararsızlığı',
      'bağlanamaz'
    ],
    // 10 words (<= 20 constraint)
    affirmationText: 'Tam yerinde! Enalaprilat iki karboksil grubundan ötürü aşırı hidrofiliktir, emilemez.',
    // 12 words (<= 22 constraint)
    verbalNudgeText: 'İpucu: Serbest dikarboksilik asit yapısının intestinal membran lipofilitesi ve oral biyoyararlanımını düşün.',
    detailedExplanation: 'Enalaprilat molekülünde iki serbest karboksil grubu bulunur ($pKa \\approx 3.0$ ve $5.4$). Fizyolojik pH\'da her ikisi de iyonlaşarak zwitterion ve aşırı hidrofilik bir yapı oluşturur; bağırsak lipid bilayer tabakasından pasif difüzyonla geçemez. Mono-etil esteri olan Enalapril ise lipofiliktir ve karaciğer esterazları ile hidroliz edilerek aktifleşir.',
    quickOptions: [
      {
        id: 'opt-1',
        label: 'İki karboksil grubu iyonize olup bağırsaktan emilimi engeller',
        isCorrect: true,
        diagnosticMessage: 'Doğru: İki iyonize karboksil aşırı hidrofilik yapar; ester ön-ilaç şarttır.'
      },
      {
        id: 'opt-2',
        label: 'Mide asidinde parçalanıp patlar',
        isCorrect: false,
        diagnosticMessage: 'Yanılgı: Enalaprilat asit kararsızlığından değil, membranı geçemeyen polariteden dolayı oral verilemez.'
      },
      {
        id: 'opt-3',
        label: 'ACE enzimine bağlanma afinitesi yoktur',
        isCorrect: false,
        diagnosticMessage: 'Yanılgı: Enalaprilat bizzat aktif ajandır; afinitesi ön-ilaç olan enalaprilden yüzlerce kat yüksektir.'
      }
    ]
  }
];

export const TRANSIT_MODE_CONFIGS = {
  METROBUS: {
    label: 'Metrobüs (Zincirlikuyu - Beylikdüzü)',
    noiseDescription: 'Dizel motor 40-150 Hz gürültüsü & körük titreşimi',
    highPassCutoff: 180,
    lowPassCutoff: 3800,
    peakingGain: 4.5,
    attenuationDb: 26,
    icon: '🚌'
  },
  MARMARAY: {
    label: 'Marmaray & M2 Metro (Tünel)',
    noiseDescription: 'Ray sürtünme tizliği & tünel hava basıncı',
    highPassCutoff: 160,
    lowPassCutoff: 3600,
    peakingGain: 5.0,
    attenuationDb: 28,
    icon: '🚇'
  },
  METRO: {
    label: 'M4 / M7 Şehir Metrosu',
    noiseDescription: 'Elektromotor uğultusu & anons parazitleri',
    highPassCutoff: 150,
    lowPassCutoff: 3900,
    peakingGain: 4.0,
    attenuationDb: 22,
    icon: '🚊'
  },
  OTOBUS: {
    label: 'EGO / İETT Belediye Otobüsü',
    noiseDescription: 'Rölanti motor homurtusu & durak dur-kalk',
    highPassCutoff: 175,
    lowPassCutoff: 4000,
    peakingGain: 3.5,
    attenuationDb: 24,
    icon: '🚍'
  },
  SESSIZ_MOD: {
    label: 'Sessiz Vagon / Kütüphane',
    noiseDescription: 'Filtresiz saf ses veya sessiz dokunmatik yanıt',
    highPassCutoff: 80,
    lowPassCutoff: 8000,
    peakingGain: 0,
    attenuationDb: 0,
    icon: '🤫'
  }
};
