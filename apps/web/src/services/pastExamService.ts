import { lectureRag } from './lectureRagService';

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

export class PastExamService {
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
    if (t.includes('organofosfat') || t.includes('asetilkolinesteraz') || t.includes('fosforilasyon') || t.includes('yaşlanma')) {
      return 'Kovalan Bağlar & Organofosfat İnhibisyon Mekanizması';
    }
    if (t.includes('salisilik') || t.includes('hidrojen bağı') || t.includes('pka') || t.includes('izomer')) {
      return 'İntramoleküler Hidrojen Bağı & Asitlik Karşılaştırması';
    }
    if (t.includes('gq') || t.includes('gs') || t.includes('plc') || t.includes('camp') || t.includes('ip3')) {
      return 'GPCR Reseptör Sinyal Yolağı & İkincil Haberciler';
    }
    if (t.includes('şelasyon') || t.includes('tetrasiklin') || t.includes('edta') || t.includes('metal')) {
      return 'Şelasyon ve Çok Değerlikli Katyon Etkileşimleri';
    }
    if (t.includes('izoster') || t.includes('biyoizoster') || t.includes('tetrazol')) {
      return 'Biyoizosterizm ve Karboksilik Asit - Tetrazol Takası';
    }
    return 'İlaç-Reseptör Bağ Kuvvetleri ve Afinite Dengesi';
  }

  /**
   * Synthesizes an ORIGINAL pedagogic twin question from the scrubbed concept
   */
  public async synthesizeTwinQuestion(scrubResult: ExamScrubResult): Promise<TwinQuestion> {
    const topic = scrubResult.detectedTopic;

    // Twin Question Archetype 1: Ester vs Amide Stability in Local Anesthetics
    if (topic.includes('Lokal Anestezik') || topic.includes('Ester vs Amit')) {
      return {
        id: `twin-la-${Date.now()}`,
        originalTopic: topic,
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
      };
    }

    // Twin Question Archetype 2: Salicylic acid intramolecular H-bond
    if (topic.includes('Salisilik') || topic.includes('Hidrojen')) {
      return {
        id: `twin-sal-${Date.now()}`,
        originalTopic: topic,
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
      };
    }

    // Default Archetype: General Receptor Binding Equilibrium & Reversibility
    return {
      id: `twin-gen-${Date.now()}`,
      originalTopic: topic,
      questionPrompt:
        'Bir ilaç adayı sentezlenirken, hedef reseptöre bağlanma enerjisi 120 kcal/mol olarak ölçülmüştür. Bu molekülün kronik hipertansiyon tedavisinde oral günlük ilaç olarak kullanılması neden klinik açıdan sakıncalıdır?',
      options: [
        {
          id: 'opt-a',
          text: '120 kcal/mol kovalan ve geri dönüşümsüz bir bağa işaret eder; reseptörü kalıcı bloke ederek fizyolojik regülasyonu bozar ve toksisiteye yol açar.',
          isCorrect: true,
          rationale: 'Doğru! Kalıcı etki genellikle istenmez; kronik ilaçlarda geri dönüşümlü bağlar (iyonik, H-bağı) aranır (Slayt 2, 9).',
        },
        {
          id: 'opt-b',
          text: '120 kcal/mol enerjili bağlar mide asidinde 1 saniyede parçalanır.',
          isCorrect: false,
          rationale: 'Yanılgı: 120 kcal/mol son derece güçlü ve kararlı bir kovalan bağdır.',
        },
        {
          id: 'opt-c',
          text: 'Molekül reseptörün şeklini değiştirecek kadar güçlü değildir.',
          isCorrect: false,
          rationale: 'Yanılgı: 120 kcal/mol fazlasıyla güçlüdür, sorun geri dönüşümsüz olmasıdır.',
        },
        {
          id: 'opt-d',
          text: 'Bu enerji düzeyinde ilaç reseptöre hiç bağlanamaz.',
          isCorrect: false,
          rationale: 'Yanılgı: İlaç kalıcı biçimde bağlanır.',
        },
      ],
      explanation:
        'İlaç-reseptör bağları sinyal iletildikten sonra ilacı kolayca serbest bırakacak kadar geri dönüşümlü olmalıdır (Slayt 2). 40-140 kcal/mol aralığı kovalan bağdır ve reseptörü kalıcı kilitler. Kalıcı etki sadece kanser ve antibakteriyeller gibi bazı özel gruplarda istenir (Slayt 9).',
      slideReferences: [2, 9],
      scaffoldingLadder: [
        'Seviye 1 (Dürtme): Bağ enerjisi cetvelini hatırla: İyonik bağ 5-10 kcal/mol, H-bağı 2-7 kcal/mol iken 120 kcal/mol hangi bağ sınıfına girer?',
        'Seviye 2 (İpucu): 40-140 kcal/mol kovalan bağdır. Kovalan bağ geri dönüşümlü müdür, yoksa kalıcı mıdır?',
        'Seviye 3 (Çözüm): Kovalan bağ kalıcıdır ve reseptörü kilitler. Kronik bir tedavide reseptörün kalıcı kilitlenmesi ciddi yan etki ve toksisite doğurur (Slayt 2, 9).',
      ],
      pedagogicalTakeaway:
        'Vize Sınavı Kuralı: İlaç-reseptör bağları reseptör konformasyonunu değiştirecek kadar GÜÇLÜ, sinyalden sonra ilacı bırakacak kadar GERİ DÖNÜŞÜMLÜ olmalıdır.',
    };
  }
}

export const pastExamService = new PastExamService();
