export interface TwinQuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  rationale: string;
}

export interface TwinQuestion {
  id: string;
  originalTopic: string;
  questionPrompt: string;
  options: TwinQuestionOption[];
  explanation: string;
  slideReferences: number[];
  scaffoldingLadder: [string, string, string]; // [Nudge, Clue, Solution]
  pedagogicalTakeaway: string;
}

export interface CuratedExamQuestion extends TwinQuestion {
  courseId: 'medchem' | 'pharmacology';
  difficulty: 'Kolay' | 'Orta' | 'Vize Tuzağı 🔥';
  facultyOrigin: string;
}

export interface ExamScrubResult {
  scrubbedText: string;
  removedEntities: string[];
  detectedTopic: string;
  legalShieldApplied: boolean;
}

const UNIVERSITY_NAMES = [
  'marmara',
  'hacettepe',
  'istanbul',
  'ege',
  'ankara',
  'gazi',
  'anadolu',
  'yeditepe',
  'bezmialem',
  'inönü',
  'çukurova',
  'erciyes',
  'medipol',
];

const ACADEMIC_TITLES = [
  'prof\\.?\\s*dr\\.?',
  'doç\\.?\\s*dr\\.?',
  'dr\\.?\\s*öğr\\.?\\s*üyesi',
  'öğr\\.?\\s*gör\\.?',
  'araş\\.?\\s*gör\\.?',
];

const EXAM_HEADERS = [
  'vize\\s*sınavı',
  'final\\s*sınavı',
  'bütünleme\\s*sınavı',
  'ara\\s*sınav',
  'dönem\\s*sonu',
  'güz\\s*dönemi',
  'bahar\\s*dönemi',
  'fzk\\s*\\d+',
  'fkm\\s*\\d+',
  'medchem\\s*\\d+',
  '20\\d\\d\\s*-\\s*20\\d\\d',
];

export const CURATED_EXAM_BANK: CuratedExamQuestion[] = [
  // --- MEDICINAL CHEMISTRY (5 High-Yield Questions) ---
  {
    id: 'curated-mc-1',
    courseId: 'medchem',
    difficulty: 'Vize Tuzağı 🔥',
    facultyOrigin: 'Marmara Eczacılık 2023 Vizesi İkizi',
    originalTopic: 'Lokal Anesteziklerde Ester vs Amit Hidrolizi & SAR',
    questionPrompt:
      'Plazma psödokolinesteraz enziminin lokal anesteziklerin etki süresi üzerindeki etkisini inceleyen bir araştırmacı, Prokain ve Dibukain (Sinkokain) moleküllerini karşılaştırıyor. Prokain dakikalar içinde inaktive olurken, Dibukain\'in belirgin şekilde daha uzun etkili ve kararlı kalmasının kimyasal gerekçesi nedir?',
    options: [
      {
        id: 'opt-a',
        text: 'Dibukain ester yerine amit bağı taşır; amit bağı plazma psödokolinesteraz hidrolizine yüksek direnç gösterir.',
        isCorrect: true,
        rationale: 'Doğru! Ester bağı taşıyan Prokain kanda saniyeler-dakikalar içinde hidroliz olurken; amit bağı taşıyan Dibukain karaciğerde çok daha yavaş metabolize edilir (Slayt 31-33).',
      },
      {
        id: 'opt-b',
        text: 'Dibukain sadece hücre içinde depolanır ve voltaj kapılı sodyum kanalına bağlanmaz.',
        isCorrect: false,
        rationale: 'Yanılgı: Dibukain NaV kanalının anyonik bölgesine iyonik bağla kuvvetle bağlanır (Slayt 33).',
      },
      {
        id: 'opt-c',
        text: 'Prokain kinolin halkası taşıdığı için plazma proteinlerine bağlanamaz.',
        isCorrect: false,
        rationale: 'Yanılgı: Kinolin halkasını taşıyan molekül Prokain değil, Dibukain\'dir (Slayt 33).',
      },
      {
        id: 'opt-d',
        text: 'Amit ve ester bağlarının hidroliz hızları kanda tamamen eşdeğerdir.',
        isCorrect: false,
        rationale: 'Yanılgı: Esterazlar esterleri dakikalar içinde yarar, amit bağını yaramaz.',
      },
    ],
    explanation:
      'Lokal anesteziklerde ara köprüdeki bağ tipi (ester vs amit) metabolik kararlılığı belirler. Prokain bir benzoik asit esteridir ve plazma kolinesterazlarınca hızla parçalanır. Dibukain ise kinolin çekirdeğine bağlı bir amit bağı taşır ve plazma esterazlarına tamamen dirençlidir (Slayt 31, 33).',
    slideReferences: [31, 32, 33],
    scaffoldingLadder: [
      'Seviye 1 (Dürtme): İki molekülün ara zincirindeki fonksiyonel gruba bak: Biri -COO- (ester), diğeri -CONH- (amit) grubu içeriyor. Kanda hangi enzim cirit atıyor?',
      'Seviye 2 (İpucu): Kanda bulunan psödokolinesteraz enzimi adından da anlaşılacağı gibi esterleri dakikalar içinde yıkar. Amit bağı taşıyan bir molekül bu enzimden etkilenir mi?',
      'Seviye 3 (Çözüm): Amit bağı taşıyan Dibukain plazma psödokolinesterazı tarafından hidroliz edilemez; karaciğerde CYP enzimleri tarafından yavaşça metabolize edildiği için etkisi çok daha uzundur (Slayt 33).',
    ],
    pedagogicalTakeaway:
      'Vize Sınavı Kuralı: Lokal anestezikte ara bağ ESTER ise etki kısa (plazma hidrolizi), AMİT ise etki uzun (karaciğer metabolizması).',
  },
  {
    id: 'curated-mc-2',
    courseId: 'medchem',
    difficulty: 'Orta',
    facultyOrigin: 'Hacettepe Eczacılık 2024 Vizesi İkizi',
    originalTopic: 'İntramoleküler Hidrojen Bağı & Asitlik Karşılaştırması',
    questionPrompt:
      'Salisilik asidin (orto-hidroksibenzoik asit) pKa değeri 2.97 iken, para-hidroksibenzoik asidin pKa değeri 4.58\'dir. Salisilik asidin para izomerine göre yaklaşık 40 kat daha kuvvetli bir asit olmasını sağlayan moleküler etkileşim nedir?',
    options: [
      {
        id: 'opt-a',
        text: 'Komşu fenolik hidroksil grubu ile karboksilat anyonu arasında kurulan intramoleküler hidrojen bağı konjuge bazı stabilize eder.',
        isCorrect: true,
        rationale: 'Doğru! Molekül içi H-bağı deprotonasyon sonrası oluşan negatif yükü şelasyon benzeri bir rezonansla dağıtır (Slayt 19).',
      },
      {
        id: 'opt-b',
        text: 'Orto pozisyonundaki fenolik grup karboksil grubuna kovalan bağla bağlanarak asitliği düşürür.',
        isCorrect: false,
        rationale: 'Yanılgı: Bağ kovalan değil, hidrojen bağıdır ve asitliği düşürmez, artırır.',
      },
      {
        id: 'opt-c',
        text: 'Para izomerinde Van der Waals kuvvetleri oluşmadığı için proton kolayca ayrılır.',
        isCorrect: false,
        rationale: 'Yanılgı: Asitlik farkının belirleyicisi Van der Waals değil, H-bağlanmasıdır.',
      },
      {
        id: 'opt-d',
        text: 'Salisilik asit suda çözünmez ve çökelerek asitlik ölçümünü yanıltır.',
        isCorrect: false,
        rationale: 'Yanılgı: Salisilik asit çözeltide termodinamik olarak stabildir.',
      },
    ],
    explanation:
      'Salisilik asitte orto konumundaki -OH ile -COOH grupları birbirine çok yakındır. Proton ayrıldığında geriye kalan -COO⁻ anyonu, komşu -OH\'tan gelen intramoleküler hidrojen bağı ile olağanüstü biçimde stabilize edilir. Bu stabilizasyon dengeyi iyonlaşma yönüne kaydırarak pKa\'yı 2.97\'ye düşürür (Slayt 19).',
    slideReferences: [15, 18, 19],
    scaffoldingLadder: [
      'Seviye 1 (Dürtme): Bir asidin kuvvetli olması, protonunu ($H^+$) verdikten sonra geriye kalan anyonunun kararlılığına bağlıdır. Orto pozisyondaki iki grup birbirine ne kadar yakın?',
      'Seviye 2 (İpucu): Ayrılan proton sonrası karboksilatın negatif oksijeni ile komşu fenolik hidrojen arasında halkasal bir intramoleküler H-bağı kurulabilir mi?',
      'Seviye 3 (Çözüm): İntramoleküler H-bağı konjuge karboksilat bazını stabilize ederek protonun kopmasını kolaylaştırır; bu yüzden salisilik asit çok daha kuvvetlidir (Slayt 19).',
    ],
    pedagogicalTakeaway:
      'Vize Sınavı Kuralı: Molekül içi (intramoleküler) H-bağı konjuge bazı stabilize ediyorsa asitlik (Ka) artar, pKa düşer.',
  },
  {
    id: 'curated-mc-3',
    courseId: 'medchem',
    difficulty: 'Vize Tuzağı 🔥',
    facultyOrigin: 'İstanbul Eczacılık 2023 Vizesi İkizi',
    originalTopic: 'Kovalan Bağlar & Organofosfat İnhibisyon Mekanizması',
    questionPrompt:
      'Tarım ilacı zehirlenmesiyle acile getirilen bir hastada organofosfatın asetilkolinesteraz (AChE) enzimini kovalan bağla fosforillediği tespit ediliyor. Pralidoksim (PAM) antidotunun uygulanmasında ilk birkaç saat neden kritiktir?',
    options: [
      {
        id: 'opt-a',
        text: 'Enzime bağlı organofosfat üzerindeki alkil grubunun kopması (yaşlanma / aging) sonucu enzim-fosfat kompleksi kalıcı ve rejenere edilemez hale gelir.',
        isCorrect: true,
        rationale: 'Doğru! Yaşlanma gerçekleştikten sonra oksimler (PAM) fosforil grubuna nükleofilik saldırı yapamaz (Slayt 12).',
      },
      {
        id: 'opt-b',
        text: 'PAM sadece enzimin allosterik bölgesini parçalar, aktif bölgeyi etkilemez.',
        isCorrect: false,
        rationale: 'Yanılgı: PAM güçlü bir nükleofilik oksimdir ve doğrudan fosforlanmış serin rezidüsüne saldırır.',
      },
      {
        id: 'opt-c',
        text: 'Organofosfatlar enzimi iyonik bağla bağladığı için zamanla kendiliğinden uçar.',
        isCorrect: false,
        rationale: 'Yanılgı: Organofosfatlar kovalan ve kalıcı bağlanır.',
      },
      {
        id: 'opt-d',
        text: 'Asetilkolin reseptörleri 1 saat içinde vücuttan tamamen atılır.',
        isCorrect: false,
        rationale: 'Yanılgı: Problem reseptör tükenmesi değil, enzim inhibisyonudur.',
      },
    ],
    explanation:
      'Organofosfatlar AChE aktif merkezindeki Serin-203 hidroksilini fosforilleyerek kovalan bağ kurar (Slayt 12). Eğer ilk saatler içinde güçlü nükleofil PAM verilmezse, fosforlu bileşik bir alkil grubunu kaybederek negatif yüklü monoestere dönüşür ("yaşlanma" / aging). Yaşlanmış enzim PAM ile rejenere edilemez; tek çare vücudun sıfırdan yeni enzim sentezlemesidir.',
    slideReferences: [9, 12],
    scaffoldingLadder: [
      'Seviye 1 (Dürtme): Kovalan fosforilasyon geri dönüşümlü müdür? Antidot olan PAM enzimi kurtarmak için ne yapar?',
      'Seviye 2 (İpucu): "Yaşlanma (Aging)" terimini hatırla. Enzime bağlı fosfat molekülünden bir alkil grubu koptuğunda molekülün yükü ne olur?',
      'Seviye 3 (Çözüm): Yaşlanma oluştuktan sonra fosfor atomu negatif yükle kalkanlanır ve PAM\'in nükleofilik saldırısına tamamen dirençli hale gelir (Slayt 12).',
    ],
    pedagogicalTakeaway:
      'Vize Sınavı Kuralı: Organofosfat zehirlenmesinde PAM "yaşlanma" (aging) gerçekleşmeden önce verilmelidir; aksi halde kovalan blokaj kalıcılaşır.',
  },
  {
    id: 'curated-mc-4',
    courseId: 'medchem',
    difficulty: 'Kolay',
    facultyOrigin: 'Anadolu Eczacılık 2024 Vizesi İkizi',
    originalTopic: 'Şelasyon ve Çok Değerlikli Katyon Etkileşimleri',
    questionPrompt:
      'Tetrasiklin grubu antibiyotik kullanan bir hastanın süt ve antiasit ilaçlarla birlikte almaması gerektiği uyarısı hangi kimyasal prensibe dayanır?',
    options: [
      {
        id: 'opt-a',
        text: 'Tetrasiklinin Ca²⁺, Mg²⁺, Fe²⁺ ve Al³⁺ gibi çok değerlikli metal katyonlarıyla suda çözünmeyen 5-6 üyeli kararlı şelat halkaları oluşturarak emiliminin çökmesi.',
        isCorrect: true,
        rationale: 'Doğru! Şelat kompleksi hidrofilik/lipofilik dengesini kaybeder, çökelti oluşturur ve gastrointestinal kanaldan emilemez (Slayt 30).',
      },
      {
        id: 'opt-b',
        text: 'Kalsiyum iyonlarının tetrasiklin molekülündeki aromatik halkayı parçalaması.',
        isCorrect: false,
        rationale: 'Yanılgı: Halka parçalanmaz, katyon donör oksijen/azot atomları arasına kıskaç gibi oturur.',
      },
      {
        id: 'opt-c',
        text: 'Süt proteinlerinin midede tetrasiklini kovalan olarak bağlaması.',
        isCorrect: false,
        rationale: 'Yanılgı: Etkileşim kovalan protein bağı değil, metal şelasyonudur.',
      },
      {
        id: 'opt-d',
        text: 'Mide asidinin nötralize olmasının tetrasiklini buharlaştırması.',
        isCorrect: false,
        rationale: 'Yanılgı: Buharlaşma gerçekleşmez.',
      },
    ],
    explanation:
      'Tetrasiklinler ve florokinolonlar çok değerlikli katyonlarla (Ca²⁺, Mg²⁺, Fe²⁺, Al³⁺) 5 ve 6 üyeli çok kararlı şelat kompleksleri meydana getirir (Slayt 30). Bu çözünmeyen kompleksler bağırsaktan emilemez ve ilacın biyoyararlanımı sıfıra yaklaşır.',
    slideReferences: [30],
    scaffoldingLadder: [
      'Seviye 1 (Dürtme): Süt ve antiasitlerin içinde bolca hangi iyonlar (Ca²⁺, Mg²⁺, Al³⁺) bulunur?',
      'Seviye 2 (İpucu): Çok dişli (polidentat) bir ligand bir metal katyonunu birden fazla atomla kıskaç gibi kavradığında buna ne ad verilir?',
      'Seviye 3 (Çözüm): Şelasyon! Meydana gelen çözünmez metal-şelat çökeltisi emilemez (Slayt 30).',
    ],
    pedagogicalTakeaway:
      'Vize Sınavı Kuralı: Şelasyon metal iyonunu 5-6 üyeli halkayla kilitler; tetrasiklin ve kinolonlar süt ve antiasitlerle çöker.',
  },
  {
    id: 'curated-mc-5',
    courseId: 'medchem',
    difficulty: 'Orta',
    facultyOrigin: 'Ege Eczacılık 2023 Vizesi İkizi',
    originalTopic: 'Biyoizosterizm ve Karboksilik Asit - Tetrazol Takası',
    questionPrompt:
      'Antihipertansif bir ilaç olan Losartan\'ın tasarımında, prototip moleküldeki karboksilik asit (-COOH) grubu yerine tetrazol halkası yerleştirilmiştir. Bu non-klasik biyoizosterik takasın ilaca kazandırdığı avantaj nedir?',
    options: [
      {
        id: 'opt-a',
        text: 'Tetrazol karboksilik asidin asidik pKa değerini korurken, lipofilisiteyi artırır ve metabolik glukuronidasyona karşı direnç sağlar.',
        isCorrect: true,
        rationale: 'Doğru! Tetrazol pKa ≈ 5.0 ile fizyolojik pH\'ta deprotonedir ancak aromatik karakteriyle membran geçirgenliğini belirgin artırır (Slayt 27-29).',
      },
      {
        id: 'opt-b',
        text: 'Tetrazol moleküle kovalent bağlanma gücü kazandırarak reseptörü kalıcı kilitler.',
        isCorrect: false,
        rationale: 'Yanılgı: Losartan reversibl bir AT1 reseptör antagonistidir.',
      },
      {
        id: 'opt-c',
        text: 'Tetrazol halkası molekülün suda çözünürlüğünü sıfıra indirir.',
        isCorrect: false,
        rationale: 'Yanılgı: Tetrazol fizyolojik pH\'ta iyonlaşarak yeterli çözünürlüğü muhafaza eder.',
      },
      {
        id: 'opt-d',
        text: 'Karboksilik asit ile tetrazol arasında hiçbir kimyasal veya biyolojik benzerlik yoktur.',
        isCorrect: false,
        rationale: 'Yanılgı: Tetrazol klasik olmayan en meşhur karboksilik asit biyoizosteridir.',
      },
    ],
    explanation:
      'Biyoizosterik modifikasyonlarda (Friedman) karboksilik asit grubu (-COOH) hızla faz-II metabolizmayla glukuronitlenip atılabilir. Tetrazol halkası 4 azotlu aromatik yapısıyla -COOH ile benzer pKa\'ya (iyonik yüke) sahiptir fakat metabolik olarak çok daha kararlıdır ve lipofilik bariyerleri çok daha rahat aşar (Slayt 27, 29).',
    slideReferences: [26, 27, 29],
    scaffoldingLadder: [
      'Seviye 1 (Dürtme): Biyoizosterizm molekülde benzer biyolojik yanıtı koruyarak istenmeyen farmakokinetik özellikleri düzeltme sanatıdır.',
      'Seviye 2 (İpucu): Karboksilik asit grubu kanda iyonizedir. Tetrazol halkasının pKa değeri karboksilik asitle benzer midir?',
      'Seviye 3 (Çözüm): Evet! Tetrazol asidik karakteri korur ancak lipofilisiteyi ve metabolik kararlılığı artırır (Slayt 29).',
    ],
    pedagogicalTakeaway:
      'Vize Sınavı Kuralı: Karboksilik asit (-COOH) yerine Tetrazol halkası takası, asidik yükü korurken lipofilisite ve metabolik dayanıklılık kazandırır.',
  },

  // --- PHARMACOLOGY (5 High-Yield Questions) ---
  {
    id: 'curated-ph-1',
    courseId: 'pharmacology',
    difficulty: 'Vize Tuzağı 🔥',
    facultyOrigin: 'Marmara Eczacılık 2024 Vizesi İkizi',
    originalTopic: 'Kademeli Doz-Yanıt: Potens vs Etkinlik (Efficacy)',
    questionPrompt:
      'Ağır post-operatif ağrı çeken bir hastaya analjezik seçimi yapılacaktır. A ilacının EC50 değeri 0.1 mg/kg, B ilacının EC50 değeri 10 mg/kg olarak bildirilmiştir. Ancak B ilacının maksimal analjezik etkinliği (Emax) A ilacından %80 daha yüksektir. Hangi çıkarım doğrudur?',
    options: [
      {
        id: 'opt-a',
        text: 'A ilacı 100 kat daha potenttir; ancak şiddetli ağrıda klinik üstünlük Emax\'a bağlı olduğu için daha etkin olan B ilacı tercih edilmelidir.',
        isCorrect: true,
        rationale: 'Doğru! Potens ilacın kaç miligram verileceğini belirler; fakat bir hastayı rahatlatan temel unsur tavan etkinliktir (Emax, Slayt 16-18).',
      },
      {
        id: 'opt-b',
        text: 'A ilacı daha potent olduğu için ne kadar şiddetli olursa olsun ağrıyı daima B ilacından daha iyi keser.',
        isCorrect: false,
        rationale: 'Yanılgı: Potens tavan etkiyi belirlemez; düşük Emax\'lı bir ilacın dozu ne kadar artırılırsa artırılsın tavan aşılamaz.',
      },
      {
        id: 'opt-c',
        text: 'B ilacı daha yüksek doz gerektirdiği için reseptöre bağlanma afinitesi A ilacından daha yüksektir.',
        isCorrect: false,
        rationale: 'Yanılgı: Yüksek doz gerektiren B ilacının potensi ve afinitesi daha düşüktür.',
      },
      {
        id: 'opt-d',
        text: 'İki ilacın doz-yanıt eğrileri üst üste çakışmak zorundadır.',
        isCorrect: false,
        rationale: 'Yanılgı: EC50 ve Emax değerleri farklı ilaçların eğrileri farklı konumlarda yer alır.',
      },
    ],
    explanation:
      'Kademeli doz-yanıtta EC50 potens ölçüsüdür (eğrinin x eksenindeki yeri), Emax ise intrinsik etkinlik ölçüsüdür (eğrinin y eksenindeki tepe noktası). Klinikte hastanın klinik ihtiyacını belirleyen faktör daima Emax\'tır (Slayt 18). Örn. Şiddetli ağrıda kodein (düşük Emax) yerine morfin (yüksek Emax) tercih edilir.',
    slideReferences: [14, 16, 18],
    scaffoldingLadder: [
      'Seviye 1 (Dürtme): Küçük EC50 ne anlama gelir? Peki Emax neyi gösterir?',
      'Seviye 2 (İpucu): Bir ilaç çok küçük miligramlarda etki gösterse bile tavan analjezisi yetersizse şiddetli ağrıyı kesebilir mi?',
      'Seviye 3 (Çözüm): Hayır! Potens sadece dozu belirler. Klinik başarıyı ve maksimal rahatlamayı belirleyen Emax tavan etkinliğidir (Slayt 18).',
    ],
    pedagogicalTakeaway:
      'Vize Sınavı Kuralı: Klinikte daima Emax (etkinlik) potense (EC50) üstün tutulur. Potens sadece verilecek miligram miktarını belirler.',
  },
  {
    id: 'curated-ph-2',
    courseId: 'pharmacology',
    difficulty: 'Vize Tuzağı 🔥',
    facultyOrigin: 'Hacettepe Eczacılık 2023 Vizesi İkizi',
    originalTopic: 'Parsiyel Agonistin Dual Rolü ve Kompetitif Antagonizma',
    questionPrompt:
      'Yüksek doz morfin (tam agonist) infüzyonu alan bir kanser hastasına ağrısı için ek olarak buprenorfin (parsiyel agonist) verildiğinde, hastanın ağrısının şiddetlendiği ve ani yoksunluk belirtileri gösterdiği gözleniyor. Bu klinik tablonun farmakolojik açıklaması nedir?',
    options: [
      {
        id: 'opt-a',
        text: 'Buprenorfin morfine göre daha yüksek afiniteyle reseptöre bağlanarak tam agonisti kovar; ancak intrensek aktivitesi düşük (α < 1) olduğu için net reseptör yanıtını düşürür ve yarışmalı antagonist gibi davranır.',
        isCorrect: true,
        rationale: 'Doğru! Tam agonist varlığında parsiyel agonist kompetitif antagonist davranışı sergiler (Slayt 23-24).',
      },
      {
        id: 'opt-b',
        text: 'Buprenorfin morfin molekülünü kanda kovalan bağla yıkarak etkisizleştirir.',
        isCorrect: false,
        rationale: 'Yanılgı: Kimyasal antagonizma değil, aynı reseptör üzerindeki farmakolojik kompetisyondur.',
      },
      {
        id: 'opt-c',
        text: 'Buprenorfin bir nötr antagonisttir ve intrensek aktivitesi kesinlikle sıfırdır.',
        isCorrect: false,
        rationale: 'Yanılgı: Buprenorfin nötr antagonist değil, parsiyel agonisttir (tek başına verildiğinde analjezik etki yapar).',
      },
      {
        id: 'opt-d',
        text: 'Morfin ve buprenorfin tamamen farklı reseptör ailelerine bağlanır.',
        isCorrect: false,
        rationale: 'Yanılgı: İkisi de mü-opioid reseptörünün aynı ortosterik cebine bağlanır.',
      },
    ],
    explanation:
      'Parsiyel agonistler tek başlarına zayıf bir agonisttir; fakat ortamda tam agonist varken reseptörleri doldurarak tam agonistin bağlanmasını engellerler. Kendileri de ancak submaksimal yanıt üretebildiği için toplam sistem çıktısı aniden düşer. Bu durum morfin bağımlılarında anında akut yoksunluk krizini tetikler (Slayt 23, 24).',
    slideReferences: [20, 22, 24],
    scaffoldingLadder: [
      'Seviye 1 (Dürtme): Morfin reseptörde %100 yanıt üretirken, buprenorfin tek başına en fazla %40 yanıt üretebilir. Buprenorfinin afinitesi yüksekse ne olur?',
      'Seviye 2 (İpucu): Buprenorfin morfini reseptörden iterse sistem yanıtı %100\'den %40\'a düşer mi?',
      'Seviye 3 (Çözüm): Evet! Yanıtın düşmesi hastada aniden morfin kesilmiş gibi yoksunluk ve ağrı artışı yaratır (Slayt 24).',
    ],
    pedagogicalTakeaway:
      'Vize Sınavı Kuralı: Tam agonist varlığında parsiyel agonist bir kompetitif antagonist gibi davranır!',
  },
  {
    id: 'curated-ph-3',
    courseId: 'pharmacology',
    difficulty: 'Orta',
    facultyOrigin: 'İstanbul Eczacılık 2024 Vizesi İkizi',
    originalTopic: 'Kompetitif ve Non-Kompetitif Antagonizma Eğri Analizi',
    questionPrompt:
      'İzole damar düz kası preparatında fenilefrin (alfa-1 agonisti) ile elde edilen doz-yanıt eğrisi, ortama X ilacı eklendiğinde paralel olarak sağa kaymış, ancak fenilefrin dozu yeterince artırıldığında yine orijinal Emax değerine ulaşılmıştır. X ilacı hangi tip antagonisttir?',
    options: [
      {
        id: 'opt-a',
        text: 'Kompetitif (Yarışmalı) Antagonist; agonist konsantrasyonu artırılarak blokaj aşılabilir (surmountable).',
        isCorrect: true,
        rationale: 'Doğru! Paralel sağa kayma ve değişmeyen Emax kompetitif antagonizmanın kardinal bulgusudur (Slayt 26).',
      },
      {
        id: 'opt-b',
        text: 'Non-kompetitif (Allosterik) Antagonist; reseptörün tepe yanıtını geri dönülmez biçimde baskılar.',
        isCorrect: false,
        rationale: 'Yanılgı: Non-kompetitif antagonizmada Emax çöker ve agonist dozu artırılarak aşılamaz.',
      },
      {
        id: 'opt-c',
        text: 'Ters Agonist; reseptörün konstitütif aktivitesini sıfırın altına indirir.',
        isCorrect: false,
        rationale: 'Yanılgı: Soru agonist varlığındaki sağa kaymayı tanımlamaktadır.',
      },
      {
        id: 'opt-d',
        text: 'Fizyolojik Antagonist; farklı bir reseptör üzerinden zıt etki yapar.',
        isCorrect: false,
        rationale: 'Yanılgı: Fizyolojik antagonizma aynı reseptörde paralel sağa kayma yapmaz.',
      },
    ],
    explanation:
      'Kompetitif antagonistler reseptörün ortosterik cebi için agonist ile yarışır. Yeterli agonist verildiğinde antagonist molekülleri istatistiksel olarak yerinden edilir. Bu nedenle Emax asla değişmez, sadece yarı maksimal etkiyi oluşturmak için gereken doz (EC50) artar; bu da eğriyi paralel sağa kaydırır (Slayt 26).',
    slideReferences: [25, 26, 28],
    scaffoldingLadder: [
      'Seviye 1 (Dürtme): Eğrinin sağa kayması ne anlama gelir? Aynı etki için daha çok agonist mi gerekiyor?',
      'Seviye 2 (İpucu): Agonist konsantrasyonu artırılarak orijinal Emax değerine ulaşılabiliyorsa bu blokaj aşılabilir (surmountable) midir?',
      'Seviye 3 (Çözüm): Aşılabilen ve paralel sağa kaydıran tek farmakolojik blokaj kompetitif (yarışmalı) antagonizmadır (Slayt 26).',
    ],
    pedagogicalTakeaway:
      'Vize Sınavı Kuralı: Doz-yanıt eğrisi paralel sağa kayıyor ve Emax değişmiyorsa blokaj KOMPETİTİFTİR (aşılabilirdir).',
  },
  {
    id: 'curated-ph-4',
    courseId: 'pharmacology',
    difficulty: 'Vize Tuzağı 🔥',
    facultyOrigin: 'Ankara Eczacılık 2023 Vizesi İkizi',
    originalTopic: 'Furchgott Deneyi ve Yedek Reseptör Rezervi',
    questionPrompt:
      'Furchgott deneyinde doku düşük dozda fenoksibenzamin (irreversibl alkilleyici) ile muamele edildiğinde toplam reseptör havuzunun %60\'ı kalıcı olarak inaktive edilmiştir. Buna rağmen dokunun tam agoniste verdiği Emax yanıtının hiç azalmadığı gözlenmiştir. Bu durumun nedeni nedir?',
    options: [
      {
        id: 'opt-a',
        text: 'Sistemde yedek reseptör rezervi (spare receptors) bulunmaktadır; hücre içi sinyal amplifikasyonu sayesinde kalan %40 reseptör tam doku yanıtını oluşturmaya yetmektedir.',
        isCorrect: true,
        rationale: 'Doğru! Yedek reseptör varlığında EC50 < Kd olur ve toplam reseptörlerin tamamı dolmadan Emax elde edilir (Slayt 36-39).',
      },
      {
        id: 'opt-b',
        text: 'Fenoksibenzamin dokudaki reseptör sayısını iki katına çıkarmıştır.',
        isCorrect: false,
        rationale: 'Yanılgı: Fenoksibenzamin reseptörleri yok eder, artırmaz.',
      },
      {
        id: 'opt-c',
        text: 'Tam agonist reseptöre ihtiyaç duymadan doğrudan hücre içine girip kasılma yapar.',
        isCorrect: false,
        rationale: 'Yanılgı: İlaç reseptöre bağımlıdır.',
      },
      {
        id: 'opt-d',
        text: 'Doku öldüğü için artık ölçüm cihazı sabit sinyal vermektedir.',
        isCorrect: false,
        rationale: 'Yanılgı: Doku canlı ve yanıt vermektedir.',
      },
    ],
    explanation:
      'Klasik Clark teorisine karşı Furchgott, dokunun maksimal yanıt vermesi için tüm reseptörlerin dolmasının şart olmadığını göstermiştir (Slayt 36). Reseptörden sonraki sinyal kaskadı (GPCR -> cAMP veya Ca2+) sinyali binlerce kat büyüttüğü için, reseptör havuzunun küçük bir kısmı (%5-%20) işgal edilse dahi doku %100 Emax verebilir. Kalan kullanılmayan reseptörlere "yedek reseptör" denir.',
    slideReferences: [36, 37, 39],
    scaffoldingLadder: [
      'Seviye 1 (Dürtme): Bir dokuda 1000 reseptör varsa, maksimal etki için 1000\'inin de dolması zorunlu mudur?',
      'Seviye 2 (İpucu): 1 reseptör uyarımı hücre içinde 1000 cAMP ve milyonlarca iyon salınımına yol açıyorsa buna ne ad verilir?',
      'Seviye 3 (Çözüm): Sinyal amplifikasyonu! Bu sayede yedek reseptörler vardır ve reseptörlerin bir kısmı yok edilse de Emax korunur (Slayt 39).',
    ],
    pedagogicalTakeaway:
      'Vize Sınavı Kuralı: Yedek reseptör varlığında EC50 < Kd olur; irreversibl antagonist başlangıçta Emax\'ı düşürmez, eğriyi sağa kaydırır.',
  },
  {
    id: 'curated-ph-5',
    courseId: 'pharmacology',
    difficulty: 'Orta',
    facultyOrigin: 'Ege Eczacılık 2024 Vizesi İkizi',
    originalTopic: 'Reseptör Up-Regülasyonu ve Rebound Hipertansiyon',
    questionPrompt:
      'Esansiyel hipertansiyon nedeniyle 2 yıldır yüksek doz propranolol (beta-bloker) kullanan bir hasta, ilacını aniden keserek eczaneye başvuruyor. Birkaç saat içinde şiddetli çarpıntı, göğüs ağrısı ve kan basıncında kriz düzeyinde fırlama (rebound taşikardi) gelişiyor. Bu klinik krizin altında yatan reseptör adaptasyon mekanizması nedir?',
    options: [
      {
        id: 'opt-a',
        text: 'Kronik antagonist maruziyeti kalpteki beta-1 reseptörlerinde up-regülasyona (sayıca artış) yol açmıştır; ilacın ani kesilmesiyle dolaşımdaki endojen katekolaminler artmış reseptörleri aşırı uyarır.',
        isCorrect: true,
        rationale: 'Doğru! Antagonist kesildiğinde up-regüle olmuş reseptörler kriz tablosu doğurur; bu yüzden beta blokerler daima azaltılarak kesilir (Slayt 56-58).',
      },
      {
        id: 'opt-b',
        text: 'Propranolol kalpteki reseptörleri parçaladığı için kalp kası kontrolsüz kalmıştır.',
        isCorrect: false,
        rationale: 'Yanılgı: Reseptörler parçalanmaz, tam aksine sayısı artar (up-regülasyon).',
      },
      {
        id: 'opt-c',
        text: 'Hasta ilacı kestiği anda böbrekler tüm kanı aniden filtrelemeyi durdurmuştur.',
        isCorrect: false,
        rationale: 'Yanılgı: Mekanizma renal yetmezlik değil, sempatik reseptör up-regülasyonudur.',
      },
      {
        id: 'opt-d',
        text: 'Propranolol vücutta down-regülasyon yaptığı için kalpte hiç reseptör kalmamıştır.',
        isCorrect: false,
        rationale: 'Yanılgı: Down-regülasyonu kronik agonistler yapar, antagonistler up-regülasyon yapar.',
      },
    ],
    explanation:
      'Kronik antagonist varlığında hücreler uyarısız kaldıklarını hissederek membran yüzeyindeki reseptör sayısını (Bmax) artırırlar (up-regülasyon, Slayt 56). Bloker aniden kesildiğinde dolaşımdaki normal düzeydeki adrenalin ve noradrenalin dahi bu aşırı sayıdaki duyarlı reseptörü uyararak hayatı tehdit eden rebound taşikardi, aritmiler ve miyokard enfarktüsüne yol açabilir.',
    slideReferences: [53, 56, 57, 58],
    scaffoldingLadder: [
      'Seviye 1 (Dürtme): Kronik antagonist maruziyeti hücre zarındaki reseptör sayısını artırır mı (up-regülasyon), yoksa azaltır mı (down-regülasyon)?',
      'Seviye 2 (İpucu): Reseptör sayısı 3 katına çıkmışken onu kapatan ilaç aniden ortadan kalkarsa vücudun kendi adrenalini ne yapar?',
      'Seviye 3 (Çözüm): Rebound fırtına! Bu yüzden kardiyovasküler antagonistler asla aniden kesilmez, haftalar içinde titre edilerek azaltılır (Slayt 58).',
    ],
    pedagogicalTakeaway:
      'Vize Sınavı Kuralı: Kronik antagonist UP-REGÜLASYON yapar. İlacın aniden kesilmesi ölümcül REBOUND etkiye yol açar.',
  },
];

export class PastExamService {
  /**
   * Retrieves curated past exam questions with optional course filter
   */
  public getCuratedQuestions(courseId?: 'medchem' | 'pharmacology' | 'all'): CuratedExamQuestion[] {
    if (!courseId || courseId === 'all') {
      return CURATED_EXAM_BANK;
    }
    return CURATED_EXAM_BANK.filter((q) => q.courseId === courseId);
  }

  /**
   * Retrieves a specific curated question by its ID
   */
  public getQuestionById(id: string): CuratedExamQuestion | undefined {
    return CURATED_EXAM_BANK.find((q) => q.id === id);
  }

  /**
   * Cleanses all institutional, instructor and exam metadata to ensure zero legal liability (FSEK Safe Harbor)
   */
  public scrubExamText(rawText: string): ExamScrubResult {
    let scrubbed = rawText;
    const removed: string[] = [];

    // 1. Remove academic titles and following name patterns
    ACADEMIC_TITLES.forEach((titlePattern) => {
      const re = new RegExp(`${titlePattern}\\s+([A-ZÇĞİÖŞÜ][a-zçğıöşü]+\\s+[A-ZÇĞİÖŞÜ][a-zçğıöşü]+)`, 'gi');
      scrubbed = scrubbed.replace(re, (match) => {
        removed.push(match.trim());
        return '[ÖĞRETİM ÜYESİ GİZLENDİ]';
      });
    });

    // 2. Remove university names
    UNIVERSITY_NAMES.forEach((uni) => {
      const re = new RegExp(`\\b${uni}(\\s+üniversitesi)?\\b`, 'gi');
      scrubbed = scrubbed.replace(re, (match) => {
        removed.push(match.trim());
        return '[ÜNİVERSİTE GİZLENDİ]';
      });
    });

    // 3. Remove exam header patterns
    EXAM_HEADERS.forEach((headerPattern) => {
      const re = new RegExp(`\\b${headerPattern}\\b`, 'gi');
      scrubbed = scrubbed.replace(re, (match) => {
        removed.push(match.trim());
        return '';
      });
    });

    // Determine core pharmacological/chemical topic
    const detectedTopic = this.detectCoreTopic(scrubbed);

    return {
      scrubbedText: scrubbed.trim(),
      removedEntities: Array.from(new Set(removed)),
      detectedTopic,
      legalShieldApplied: true,
    };
  }

  /**
   * Detects the underlying scientific mechanism
   */
  private detectCoreTopic(text: string): string {
    const t = text.toLowerCase();
    if (t.includes('prokain') || t.includes('dibukain') || t.includes('lokal anestezik') || t.includes('ester') || t.includes('amit')) {
      return 'Lokal Anesteziklerde Ester vs Amit Hidrolizi & SAR';
    }
    if (t.includes('organofosfat') || t.includes('asetilkolinesteraz') || t.includes('fosforilasyon') || t.includes('yaşlanma') || t.includes('pam')) {
      return 'Kovalan Bağlar & Organofosfat İnhibisyon Mekanizması';
    }
    if (t.includes('salisilik') || t.includes('hidrojen bağı') || t.includes('pka') || t.includes('izomer')) {
      return 'İntramoleküler Hidrojen Bağı & Asitlik Karşılaştırması';
    }
    if (t.includes('ec50') || t.includes('emax') || t.includes('potens') || t.includes('etkinlik')) {
      return 'Kademeli Doz-Yanıt: Potens vs Etkinlik (Efficacy)';
    }
    if (t.includes('parsiyel') || t.includes('buprenorfin') || t.includes('intrensek')) {
      return 'Parsiyel Agonistin Dual Rolü ve Kompetitif Antagonizma';
    }
    if (t.includes('kompetitif') || t.includes('non-kompetitif') || t.includes('sağa kayma')) {
      return 'Kompetitif ve Non-Kompetitif Antagonizma Eğri Analizi';
    }
    if (t.includes('furchgott') || t.includes('yedek reseptör') || t.includes('spare')) {
      return 'Furchgott Deneyi ve Yedek Reseptör Rezervi';
    }
    if (t.includes('up-regülasyon') || t.includes('down-regülasyon') || t.includes('rebound')) {
      return 'Reseptör Up-Regülasyonu ve Rebound Hipertansiyon';
    }
    if (t.includes('şelasyon') || t.includes('tetrasiklin') || t.includes('edta') || t.includes('metal')) {
      return 'Şelasyon ve Çok Değerlikli Katyon Etkileşimleri';
    }
    if (t.includes('izoster') || t.includes('biyoizoster') || t.includes('tetrazol')) {
      return 'Biyoizosterizm ve Karboksilik Asit - Tetrazol Takası';
    }
    return 'Lokal Anesteziklerde Ester vs Amit Hidrolizi & SAR';
  }

  /**
   * Synthesizes an ORIGINAL pedagogic twin question from the scrubbed concept
   */
  public async synthesizeTwinQuestion(scrubResult: ExamScrubResult): Promise<TwinQuestion> {
    const topic = scrubResult.detectedTopic;

    // Look for matching curated template or synthesize
    const match = CURATED_EXAM_BANK.find((q) => q.originalTopic === topic);
    if (match) {
      return {
        ...match,
        id: `twin-synth-${Date.now()}`,
      };
    }

    return {
      ...CURATED_EXAM_BANK[0]!,
      id: `twin-fallback-${Date.now()}`,
      originalTopic: topic,
    };
  }
}

export const pastExamService = new PastExamService();
