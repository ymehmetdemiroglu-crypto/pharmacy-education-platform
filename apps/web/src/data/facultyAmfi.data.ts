import {
  FacultyRoomConfig,
  MisconceptionChallenge,
  MisconceptionSurgeBroadcast
} from '../types/facultyAmfi.types';

// ============================================================================
// CURATED TURKISH PHARMACY FACULTIES & AMFİ STUDY TABLES
// ============================================================================

export const CURATED_FACULTY_ROOMS: FacultyRoomConfig[] = [
  {
    slug: 'marmara-eczacilik',
    name: 'Marmara Üniversitesi Eczacılık Fakültesi',
    shortName: 'Marmara Eczacılık',
    city: 'İstanbul (Haydarpaşa / Başıbüyük)',
    logoColor: '#059669',
    activeStudentsCount: 42,
    isNationalAggregate: false,
    curriculumFocus: 'Farmasötik Kimya I & Farmakoloji Entegre Kurulu (3. Sınıf)',
    activeTables: [
      {
        tableId: 'tbl-marmara-medchem-01',
        moduleId: 'hafta-06-metabolizma',
        moduleTitle: 'Hafta 6: Lokal Anestezikler ve Ester/Amit Hidrolizi',
        topicDescription: 'Slayt 28: Prokain vs Lidokain hidroliz kinetiği & PABA sülfonamid rekabeti',
        currentSlideNumber: 28,
        activeStudentCount: 18,
        courseId: 'medchem',
        activeTrapCode: 'TRAP-03-ESTER-AMIDE'
      },
      {
        tableId: 'tbl-marmara-medchem-02',
        moduleId: 'hafta-04-kolinerjik',
        moduleTitle: 'Hafta 4: Asetilkolinesteraz İnhibitörleri ve Yaşlanma',
        topicDescription: 'Slayt 14: Organofosfat kovalent bağı ve dealkilasyon yaşlanması',
        currentSlideNumber: 14,
        activeStudentCount: 14,
        courseId: 'medchem',
        activeTrapCode: 'TRAP-08-AChE-AGING'
      },
      {
        tableId: 'tbl-marmara-pharm-01',
        moduleId: 'hafta-02-reseptor-teorisi',
        moduleTitle: 'Hafta 2: Reseptör Teorisi ve Konsantrasyon-Etki',
        topicDescription: 'Slayt 19: Schild regresyon eğimi ve allosterik modülatörler',
        currentSlideNumber: 19,
        activeStudentCount: 10,
        courseId: 'pharmacology',
        activeTrapCode: 'TRAP-07-SCHILD-SLOPE'
      }
    ],
    currentSurgeAlert: {
      event_type: 'MISCONCEPTION_SURGE',
      trap_code: 'TRAP-03-ESTER-AMIDE',
      faculty_slug: 'marmara-eczacilik',
      course_id: 'medchem',
      slide_number: 28,
      trapped_student_ratio: 0.68,
      sample_size_k: 18,
      headline: "🔥 Amfi Uyarısı: Dönem arkadaşlarının %68'i Slayt 28'deki Ester-Amit tuzağında takıldı!",
      diagnostic_prompt: 'Prokain hidrolizi sonucu açığa çıkan PABA neden sülfonamid antibakteriyel etkisini tamamen yok eder?',
      action_url: '/workspace/medchem?trap=TRAP-03'
    }
  },
  {
    slug: 'hacettepe-eczacilik',
    name: 'Hacettepe Üniversitesi Eczacılık Fakültesi',
    shortName: 'Hacettepe Eczacılık',
    city: 'Ankara (Sıhhiye)',
    logoColor: '#2563EB',
    activeStudentsCount: 36,
    isNationalAggregate: false,
    curriculumFocus: 'Farmasötik Kimya II & Klinik Farmakoloji Kurulu',
    activeTables: [
      {
        tableId: 'tbl-hacettepe-pharm-01',
        moduleId: 'hafta-02-reseptor-teorisi',
        moduleTitle: 'Hafta 2: Reseptör Teorisi ve Doz-Yanıt Kinetiği',
        topicDescription: 'Slayt 19: Schild analizi non-lineeritesi ve kompetitif olmayan blokaj',
        currentSlideNumber: 19,
        activeStudentCount: 16,
        courseId: 'pharmacology',
        activeTrapCode: 'TRAP-07-SCHILD-SLOPE'
      },
      {
        tableId: 'tbl-hacettepe-medchem-01',
        moduleId: 'hafta-05-beta-laktamlar',
        moduleTitle: 'Hafta 5: Beta-Laktam Antibiyotikler ve PBP Açilasyonu',
        topicDescription: 'Slayt 31: Dört üyeli halka gerginliği ve serin nükleofilik atağı',
        currentSlideNumber: 31,
        activeStudentCount: 12,
        courseId: 'medchem'
      },
      {
        tableId: 'tbl-hacettepe-pharm-02',
        moduleId: 'hafta-01-adme-farmakokinetik',
        moduleTitle: 'Hafta 1: İlaç Absorpsiyonu ve Membran Geçirgenliği',
        topicDescription: 'Slayt 08: Henderson-Hasselbalch ve iyon tuzağı teorisi',
        currentSlideNumber: 8,
        activeStudentCount: 8,
        courseId: 'pharmacology',
        activeTrapCode: 'TRAP-01-IONIZATION'
      }
    ],
    currentSurgeAlert: {
      event_type: 'MISCONCEPTION_SURGE',
      trap_code: 'TRAP-07-SCHILD-SLOPE',
      faculty_slug: 'hacettepe-eczacilik',
      course_id: 'pharmacology',
      slide_number: 19,
      trapped_student_ratio: 0.72,
      sample_size_k: 16,
      headline: "🔥 Amfi Uyarısı: Dönem arkadaşlarının %72'si Slayt 19'daki Schild eğiminde ters köşe oldu!",
      diagnostic_prompt: 'Schild regresyonunda eğimin 1.0 yerine 0.62 çıkması allosterik bağlanmayı nasıl doğrular?',
      action_url: '/workspace/pharmacology?trap=TRAP-07'
    }
  },
  {
    slug: 'istanbul-eczacilik',
    name: 'İstanbul Üniversitesi Eczacılık Fakültesi',
    shortName: 'İstanbul Eczacılık',
    city: 'İstanbul (Beyazıt)',
    logoColor: '#7C3AED',
    activeStudentsCount: 28,
    isNationalAggregate: false,
    curriculumFocus: 'Farmasötik Kimya & Biyokimya Entegre Programı',
    activeTables: [
      {
        tableId: 'tbl-istanbul-medchem-01',
        moduleId: 'hafta-04-kolinerjik',
        moduleTitle: 'Hafta 4: AChE İnhibitörleri ve Organofosfat Yaşlanması',
        topicDescription: 'Slayt 14: Karbamat vs Organofosfat kovalent stabilitesi',
        currentSlideNumber: 14,
        activeStudentCount: 15,
        courseId: 'medchem',
        activeTrapCode: 'TRAP-08-AChE-AGING'
      },
      {
        tableId: 'tbl-istanbul-pharm-01',
        moduleId: 'hafta-03-adrenerjik',
        moduleTitle: 'Hafta 3: Adrenerjik Reseptörler ve Sempatomimetikler',
        topicDescription: 'Slayt 22: Katekol halkası ve alfa/beta selektivite kuralları',
        currentSlideNumber: 22,
        activeStudentCount: 13,
        courseId: 'pharmacology',
        activeTrapCode: 'TRAP-04-ADRENERGIC-INVERSION'
      }
    ],
    currentSurgeAlert: {
      event_type: 'MISCONCEPTION_SURGE',
      trap_code: 'TRAP-08-AChE-AGING',
      faculty_slug: 'istanbul-eczacilik',
      course_id: 'medchem',
      slide_number: 14,
      trapped_student_ratio: 0.64,
      sample_size_k: 15,
      headline: "🔥 Amfi Uyarısı: Dönem arkadaşlarının %64'ü Slayt 14'teki Yaşlanma tuzağında takıldı!",
      diagnostic_prompt: 'Organofosfatla zehirlenen hastaya 36 saat sonra verilen PAM neden AChE reaktivasyonu sağlayamaz?',
      action_url: '/workspace/medchem?trap=TRAP-08'
    }
  },
  {
    slug: 'ankara-eczacilik',
    name: 'Ankara Üniversitesi Eczacılık Fakültesi',
    shortName: 'Ankara Eczacılık',
    city: 'Ankara (Tandoğan)',
    logoColor: '#D97706',
    activeStudentsCount: 6, // k < 10 threshold triggered!
    isNationalAggregate: true,
    curriculumFocus: 'Farmakoloji & Toksikoloji Modülleri',
    activeTables: [
      {
        tableId: 'tbl-ankara-pharm-01',
        moduleId: 'hafta-06-cyp-etkilesimleri',
        moduleTitle: 'Hafta 6: CYP İzoenzimleri ve İlaç Etkileşimleri',
        topicDescription: 'Slayt 24: CYP3A4 indüksiyonu ve terapötik indeks daralması',
        currentSlideNumber: 24,
        activeStudentCount: 4,
        courseId: 'pharmacology'
      },
      {
        tableId: 'tbl-ankara-pharm-02',
        moduleId: 'hafta-02-reseptor-teorisi',
        moduleTitle: 'Hafta 2: Reseptör Rezervi ve Spare Receptors',
        topicDescription: 'Slayt 11: Maksimal etki için fraksiyonel doluluk oranı',
        currentSlideNumber: 11,
        activeStudentCount: 2,
        courseId: 'pharmacology',
        activeTrapCode: 'TRAP-02-SPARE-RECEPTORS'
      }
    ],
    currentSurgeAlert: undefined
  },
  {
    slug: 'turkiye-geneli',
    name: 'Türkiye Geneli Eczacılık Havuz Amfisi',
    shortName: 'Ulusal Amfi',
    city: 'Türkiye (Tüm Eczacılık Fakülteleri)',
    logoColor: '#E11D48',
    activeStudentsCount: 184,
    isNationalAggregate: true,
    curriculumFocus: 'Ulusal Eczacılık Çekirdek Eğitim Programı (ÇEP)',
    activeTables: [
      {
        tableId: 'tbl-national-medchem-vize',
        moduleId: 'vize-triage-medchem',
        moduleTitle: 'MedChem Vize Triage (En Yüksek İhtimalli Slaytlar)',
        topicDescription: 'Slayt 28: Lokal anestezik hidrolizi, AChE kovalent bağı ve Hammett denklemi',
        currentSlideNumber: 28,
        activeStudentCount: 78,
        courseId: 'medchem',
        activeTrapCode: 'TRAP-03-ESTER-AMIDE'
      },
      {
        tableId: 'tbl-national-pharm-formuller',
        moduleId: 'vize-triage-pharm',
        moduleTitle: 'Farmakoloji Genel Prensipler & Formüller Masası',
        topicDescription: 'Slayt 19: Schild regresyonu, klirens, yükleme dozu ve yarılanma ömrü',
        currentSlideNumber: 19,
        activeStudentCount: 64,
        courseId: 'pharmacology',
        activeTrapCode: 'TRAP-07-SCHILD-SLOPE'
      },
      {
        tableId: 'tbl-national-tactile-lab',
        moduleId: 'cizerek-ogren-lab',
        moduleTitle: 'Çizerek Öğren: Mekanizma ve Elektron Oku Laboratuvarı',
        topicDescription: 'AChE Serin-203 atağı, organofosfat P(V) geçiş hali ve beta-laktam açilasyonu',
        currentSlideNumber: 14,
        activeStudentCount: 42,
        courseId: 'medchem',
        activeTrapCode: 'TRAP-08-AChE-AGING'
      }
    ],
    currentSurgeAlert: {
      event_type: 'MISCONCEPTION_SURGE',
      trap_code: 'TRAP-03-ESTER-AMIDE',
      faculty_slug: 'turkiye-geneli',
      course_id: 'medchem',
      slide_number: 28,
      trapped_student_ratio: 0.65,
      sample_size_k: 78,
      headline: "🔥 Ulusal Havuz Uyarısı: Türkiye genelinde öğrencilerin %65'i Ester-Amit hidroliz tuzağında takıldı!",
      diagnostic_prompt: 'Prokain hidrolizi sonucu açığa çıkan PABA neden sülfonamid antibakteriyel etkisini tamamen felç eder?',
      action_url: '/workspace/medchem?trap=TRAP-03'
    }
  }
];

// ============================================================================
// CURATED CANONICAL MISCONCEPTION CHALLENGES
// ============================================================================

export const CURATED_MISCONCEPTION_CHALLENGES: Record<string, MisconceptionChallenge> = {
  'TRAP-03-ESTER-AMIDE': {
    challengeId: 'chal-trap-03-ester-amide',
    trapCode: 'TRAP-03-ESTER-AMIDE',
    facultySlug: 'marmara-eczacilik',
    courseId: 'medchem',
    slideNumber: 28,
    headline: '🔥 Amfi Uyarısı: Prokain vs Lidokain ve PABA-Sülfonamid Antagonizması',
    questionPrompt:
      'Prokain hidroliz edildiğinde açığa çıkan p-aminobenzoik asit (PABA), eş zamanlı sülfonamid antibakteriyel tedavisi alan bir hastada neden terapötik yetersizliğe yol açar?',
    options: [
      {
        id: 'opt-a',
        text: 'PABA doğrudan sülfonamid molekülünü ester bağından parçalayarak hidroliz eder.',
        isCorrect: false,
        misconceptionDiagnosis:
          'PABA esteraz aktivitesine sahip değildir; sülfonamidler de ester değil sülfonamit bağı içerir.',
        cohortPickPercentage: 14
      },
      {
        id: 'opt-b',
        text: 'PABA, bakteriyel dihidropteroat sentaz enzimi için sülfonamid ile yarışır; serbest PABA konsantrasyonu artınca enzimi sülfonamidden kurtarır.',
        isCorrect: true,
        misconceptionDiagnosis:
          'DOĞRU: Sülfonamidler PABA antimetabolitidir; prokainden salınan serbest PABA kompetitif inhibisyonu aşarak folat sentezini yeniden başlatır.',
        cohortPickPercentage: 32
      },
      {
        id: 'opt-c',
        text: 'PABA idrarı kuvvetli asitleştirerek sülfonamidin renal tübüler atılımını 10 kat hızlandırır.',
        isCorrect: false,
        misconceptionDiagnosis:
          'PABA fizyolojik pH’ta zayıf amfoteriktir; idrar pH’ını değiştirerek sülfonamid klerensini dramatik artırmaz.',
        cohortPickPercentage: 38
      },
      {
        id: 'opt-d',
        text: 'PABA sitokrom P450 3A4 enzimini indükleyerek sülfonamid hepatik klirensini hızlandırır.',
        isCorrect: false,
        misconceptionDiagnosis:
          'PABA CYP3A4 indükleyicisi değildir; sülfonamidlerin temel metabolizması N4-asetilasyondur.',
        cohortPickPercentage: 16
      }
    ],
    hintLadder: [
      'Sülfonamidlerin etki mekanizmasını hatırla: Hangi endojen bileşiğin yapısal analoğu olarak bakteriyel folik asit sentezini bloke ederler?',
      'Sülfonamid yarışmalı (kompetitif) bir antimetabolittir. Yarıştığı doğal substrat serbest kalıp yoğunluğu arttığında denge hangi yöne kayar?',
      'Sülfonamidler PABA yapısal analoğudur. Prokain ester hidroliziyle ortama serbest PABA salar; ortamda artan PABA dihidropteroat sentaz enzimini sülfonamidden geri alır ve antibakteriyel etki söner.'
    ],
    diagnosticExplanation:
      'Prokain bir benzoik asit esteridir ve plazma psödokolinesterazı tarafından hızla PABA ve dietilaminoetanole hidroliz edilir. Sülfonamidler bakteriyel folik asit sentezinde PABA ile yarışarak dihidropteroat sentazı bloke eder. Prokain verildiğinde serbest kalan yüksek PABA konsantrasyonu kompetitif blokajı aşar ve sülfonamid etkisini felç eder. Bu yüzden lidokain gibi amid türevi lokal anestezikler bu etkileşime girmez.',
    sourceAttribution: {
      file: 'materials/medchem/Lokal_Anestezikler_SAR.pdf',
      pageOrSlide: 28
    }
  },
  'TRAP-07-SCHILD-SLOPE': {
    challengeId: 'chal-trap-07-schild-slope',
    trapCode: 'TRAP-07-SCHILD-SLOPE',
    facultySlug: 'hacettepe-eczacilik',
    courseId: 'pharmacology',
    slideNumber: 19,
    headline: '🔥 Amfi Uyarısı: Schild Regresyon Eğimi ve Allosterik Modülasyon',
    questionPrompt:
      'Schild analizinde log(DR - 1) değerine karşı log[B] grafiğinde regresyon eğiminin 1.0 yerine belirgin derecede küçük çıkması (m = 0.62) neyi kanıtlar?',
    options: [
      {
        id: 'opt-a',
        text: 'Antagonistin basit sintopik kompetisyon yerine allosterik bölgeye bağlandığını veya non-spesifik tutulum yaptığını gösterir.',
        isCorrect: true,
        misconceptionDiagnosis:
          'DOĞRU: Schild eğiminin 1.0 olması tek cepli basit kompetitif bağlanmayı gösterir; m < 1.0 allosterik modülasyonu veya dokuda non-spesifik bağlanmayı kanıtlar.',
        cohortPickPercentage: 28
      },
      {
        id: 'opt-b',
        text: 'Deneyde kompetitif geri dönüşümlü bir bağlanma olduğunu ve pA2 = -log KB eşitliğinin kusursuz geçerli olduğunu kanıtlar.',
        isCorrect: false,
        misconceptionDiagnosis:
          'Eğim 1.0 olmadığında pA2 doğrudan -log KB değerine eşit olamaz; sintopik kompetisyon hipotezi çöker.',
        cohortPickPercentage: 42
      },
      {
        id: 'opt-c',
        text: 'Antagonist konsantrasyonunun reseptör rezervini (spare receptor) tamamen tükettiğini kanıtlar.',
        isCorrect: false,
        misconceptionDiagnosis:
          'Reseptör rezervi kompetitif antagonistlerin Schild eğimini değiştirmez; agonist eğrisini etkiler.',
        cohortPickPercentage: 20
      },
      {
        id: 'opt-d',
        text: 'Agonistin parsiyel agonist olduğunu ve intrensek aktivitesinin sıfır olduğunu gösterir.',
        isCorrect: false,
        misconceptionDiagnosis:
          'Schild denklemi antagonist özellikleri analiz eder; intrensek aktivitenin sıfır olması antagonist tanımıdır, eğim anomalisi değildir.',
        cohortPickPercentage: 10
      }
    ],
    hintLadder: [
      'Klasik Arunlakshana-Schild denkleminin türetilmesindeki temel şartı hatırla: Eğimin tam 1.0 olması ne anlama gelir?',
      'Eğim 1.0 ise agonist ve antagonist aynı ortosterik bağlanma cebi için 1:1 yarışır. Eğim < 1.0 olduğunda agonist konsantrasyonu artırılsa bile antagonizma tam geri çevrilemez.',
      'Schild eğiminin 1.0 olmaması (m ≠ 1.0) basit kompetitif yarışmanın ihlal edildiğini gösterir; m < 1.0 allosterik modülasyon, doymayan non-spesifik tutulum veya dokuda antagonist klerensi olduğunu doğrular.'
    ],
    diagnosticExplanation:
      'Klasik Schild analizinde sintopik (ortosterik) kompetitif antagonistler için eğim kesin olarak 1.0 olmak zorundadır. Eğimin 1.0’dan küçük olması (m < 1.0), antagonizmanın basit 1:1 sintopik yarışma ile açıklanamayacağını, allosterik modülasyon, negatif kooperatif bağlanma veya antagonistin dokuda birikerek dengeye ulaşmadığını gösterir.',
    sourceAttribution: {
      file: 'materials/pharmacology/Reseptor_Teorisi_ve_Doz_Yanit.pdf',
      pageOrSlide: 19
    }
  },
  'TRAP-08-AChE-AGING': {
    challengeId: 'chal-trap-08-ache-aging',
    trapCode: 'TRAP-08-AChE-AGING',
    facultySlug: 'istanbul-eczacilik',
    courseId: 'medchem',
    slideNumber: 14,
    headline: '🔥 Amfi Uyarısı: Organofosfat Yaşlanması (Aging) ve PAM Rezistansı',
    questionPrompt:
      'Organofosfatla zehirlenen bir hastaya 36 saat sonra Pralidoksim (PAM) uygulandığında asetilkolinesteraz enziminin reaktive OLMAMASININ moleküler sebebi nedir?',
    options: [
      {
        id: 'opt-a',
        text: 'Enzimdeki fosfat grubunun bir alkil grubu kaybederek negatif yüklü monoalkil-fosfata dönüşmesi (Yaşlanma).',
        isCorrect: true,
        misconceptionDiagnosis:
          'DOĞRU: P-O-R bağının kopması sonucu oluşan P-O- anyonu elektrofilik fosfor merkezini stabilize eder; PAM nükleofili saldıramaz.',
        cohortPickPercentage: 36
      },
      {
        id: 'opt-b',
        text: 'PAM molekülünün kan-beyin bariyerini aşamayarak periferik sinapslarda birikmesi.',
        isCorrect: false,
        misconceptionDiagnosis:
          'PAM kuaterner amonyum yapısı nedeniyle KBB’yi aşamaz ancak periferde reaktivasyon yapabilir; 36 saatte periferde de çalışmamasının sebebi enzimin yaşlanmasıdır.',
        cohortPickPercentage: 34
      },
      {
        id: 'opt-c',
        text: 'AChE enziminin anyonik cebindeki triptofan kalıntısının geri dönüşümsüz olarak parçalanması.',
        isCorrect: false,
        misconceptionDiagnosis:
          'Organofosfat triptofanı parçalamaz; esteratik cebindeki Serin-203 hidroksili ile kovalent fosfoester bağı kurar.',
        cohortPickPercentage: 18
      },
      {
        id: 'opt-d',
        text: 'Organofosfatın esteraz enzimi yerine plazma albüminine kovalent bağlanması.',
        isCorrect: false,
        misconceptionDiagnosis:
          'Albümin psödokolinesteraz gibi çalışabilir ancak toksisitenin ve reaktivasyon direncinin nedeni sinaptik AChE yaşlanmasıdır.',
        cohortPickPercentage: 12
      }
    ],
    hintLadder: [
      'Organofosfatın serin-203 hidroksili ile kurduğu kovalent fosfoester bağını ve fosfora bağlı alkoksi (-OR) gruplarını düşün.',
      'Zaman geçtikçe (özellikle soman ve sarinde saatler içinde) fosfora bağlı alkoksi grubunun spontan hidrolizi (dealkilasyon) gerçekleşir.',
      'Dealkilasyon sonucu fosfat grubunda net bir negatif yük (P-O⁻) kalır. Negatif yük elektrofilik fosfor merkezinin elektron açığını kapatır; nükleofilik PAM oksim grubu hücum edemez.'
    ],
    diagnosticExplanation:
      'Organofosfatlar AChE serin-203 hidroksilini kovalent olarak fosforiller. Zamanla fosfat grubuna bağlı alkil gruplarından biri spontan hidrolizle kopar (P-O-R → P-O⁻). Açığa çıkan negatif yük fosfor atomunun elektrofilitesini dramatik şekilde düşürür. Nükleofilik reaktivatör olan PAM (oksim grubu), elektrofilik olmayan bu anyonik fosfora hücum edemez; bu duruma "yaşlanma" (aging) denir.',
    sourceAttribution: {
      file: 'materials/medchem/Kolinerjik_Sistem_ve_AChE.pdf',
      pageOrSlide: 14
    }
  },
  'TRAP-01-IONIZATION': {
    challengeId: 'chal-trap-01-ionization',
    trapCode: 'TRAP-01-IONIZATION',
    facultySlug: 'marmara-eczacilik',
    courseId: 'pharmacology',
    slideNumber: 8,
    headline: '🔥 Amfi Uyarısı: İyonizasyon Derecesi ve Mide Absorpsiyon Paradoksu',
    questionPrompt:
      'Asetilsalisilik asit (pKa = 3.5) midede (pH = 1.5) %99 non-iyonize formda bulunmasına rağmen, neden asıl emilimi midede değil ince bağırsakta gerçekleşir?',
    options: [
      {
        id: 'opt-a',
        text: 'Mide mukozasındaki mukus tabakasının negatif yükü non-iyonize molekülleri elektriksel olarak iter.',
        isCorrect: false,
        misconceptionDiagnosis:
          'Mukus glikoproteinleri anyonik olsa da elektriksel itme non-iyonize molekülleri etkilemez.',
        cohortPickPercentage: 15
      },
      {
        id: 'opt-b',
        text: 'İnce bağırsağın mikrovillüsleri sayesinde devasa yüzey alanına (~200 m²) ve yüksek vaskülarizasyona sahip olması.',
        isCorrect: true,
        misconceptionDiagnosis:
          'DOĞRU: Fick difüzyon kanununda yüzey alanı (A) geçirgenlik katsayısından (P) çok daha baskındır; 200 m² alan iyonizasyon dezavantajını tamamen telafi eder.',
        cohortPickPercentage: 35
      },
      {
        id: 'opt-c',
        text: 'Aspirinin ince bağırsakta esteraz enzimi tarafından salisilik aside parçalanması emilimi hızlandırır.',
        isCorrect: false,
        misconceptionDiagnosis:
          'Salisilik asidin emilim hızı aspirinden üstün değildir; metabolizma emilimi açıklayan temel faktör değildir.',
        cohortPickPercentage: 22
      },
      {
        id: 'opt-d',
        text: 'İnce bağırsakta iyonize olan moleküllerin pasif difüzyon hızının non-iyonize moleküllerden yüksek olması.',
        isCorrect: false,
        misconceptionDiagnosis:
          'İyonize moleküller lipit çift tabakadan pasif difüzyonla geçemez; iyonize form emilimi yavaşlatır.',
        cohortPickPercentage: 28
      }
    ],
    hintLadder: [
      'Fick Difüzyon Kanununu hatırla: dQ/dt = (D · A · K / h) · (C1 - C2). Hangi değişken organlar arasında en büyük farkı yaratır?',
      'Midenin iç yüzey alanı yaklaşık 1 m² iken, mikrovillüslerle kaplı ince bağırsağın yüzey alanı bir tenis kortu büyüklüğündedir (~200 m²).',
      'İnce bağırsakta aspirin iyonize olsa bile, 200 kat büyük temas yüzeyi ve zengin mezenterik kan akımı iyonizasyon dezavantajını ezer geçer.'
    ],
    diagnosticExplanation:
      'Henderson-Hasselbalch denklemine göre zayıf asit olan aspirin midede %99 non-iyonize ve lipofilik formdadır. Ancak mide yüzey alanı sadece 1 m² iken ince bağırsak mikrovillüsleri 200 m² yüzey alanı sunar. Fick difüzyon kanununda yüzey alanı (A) geçirgenlik katsayısından çok daha baskındır; bu nedenle iyonize olsa dahi aspirinin %85’i ince bağırsaktan emilir.',
    sourceAttribution: {
      file: 'materials/pharmacology/Farmakokinetik_Giris.pdf',
      pageOrSlide: 8
    }
  }
};
