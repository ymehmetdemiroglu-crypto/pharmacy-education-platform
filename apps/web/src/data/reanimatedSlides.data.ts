import { ReanimatedSlide } from '../types/slideReAnimator.types';

export const PRELOADED_REANIMATED_SLIDES: ReanimatedSlide[] = [
  {
    id: 'slide-reanim-01',
    title: 'Dibukain ve Lokal Anestezik Amit/Ester SAR',
    courseId: 'medchem',
    facultyName: 'Marmara Üniversitesi Eczacılık Fakültesi',
    deckName: 'Farmasötik Kimya II - Lokal Anestezikler',
    pageNumber: 18,
    extractedRawText: `DİBUKAİN (SİNKOKAİN) SAR ANALİZİ
Formül: 2-bütoksi-N-(2-dietilaminoetil)kinolin-4-karboksamit
Köprü Grubu: -CONH- (Amit köprüsü)
pKa: 8.9 (Tersiyer alifatik amin azot atomu)
Aromatik Çekirdek: Kinolin halkası (Lipofilikliği artıran bütoksi sübstitüenti içerir)
Etki Süresi: Çok uzun (Prokaine göre 15-20 kat daha uzun etki)
Metabolizma: Karaciğer CYP450 mikrozomal enzimleri ile yavaş metabolize olur; plazma psödokolinesterazı tarafından hidroliz edilmez!
Klinik Önem: Psödokolinesteraz atipikliği (Dibukain sayısı testi) tanısında standart referans inhibitör olarak kullanılır.`,
    entities: [
      {
        id: 'ent-01-amit',
        label: 'Amit Köprüsü (-CONH-)',
        type: 'functional_group',
        value: 'amit',
        confidence: 0.99,
        boundingBox: { x: 120, y: 140, width: 220, height: 42 }
      },
      {
        id: 'ent-01-pka',
        label: 'pKa 8.9 (Tersiyer Amin)',
        type: 'pka',
        value: 8.9,
        confidence: 0.98,
        boundingBox: { x: 380, y: 140, width: 180, height: 42 }
      },
      {
        id: 'ent-01-scaffold',
        label: 'Kinolin Çekirdeği',
        type: 'scaffold',
        value: 'kinolin',
        confidence: 0.95,
        boundingBox: { x: 120, y: 210, width: 200, height: 42 }
      },
      {
        id: 'ent-01-trap',
        label: 'TRAP-03: Ester vs Amit Hidrolizi',
        type: 'trap',
        value: 'Plazma psödokolinesteraz direnci',
        confidence: 0.97,
        boundingBox: { x: 120, y: 280, width: 340, height: 42 }
      }
    ],
    widgetConfig: {
      type: 'SarExplorer',
      title: 'Lokal Anestezik Amit vs Ester Hidroliz SAR',
      description:
        'Moleküldeki ester köprüsünü amit köprüsüyle değiştirerek plazma psödokolinesteraz direncini ve etki süresi artışını interaktif olarak test et.',
      props: {
        initialSeries: 'ester_vs_amide',
        activeDrug: 'dibucaine',
        pKa: 8.9
      }
    },
    challenge: {
      id: 'quiz-reanim-01',
      question:
        'Dibukainin prokaine kıyasla vücutta 15-20 kat daha uzun etki süresine sahip olmasının ve kanda hızla inaktive olmamasının temel kimyasal nedeni nedir?',
      hypothesisPrompt:
        'Slayttaki kimyasal yapıya bakarak dibukainin esteraz enzimlerine karşı direncini hangi fonksiyonel grubun sağladığını tahmin et.',
      options: [
        {
          id: 'opt-01-a',
          text: 'Molekülde prokaindeki ester (-COO-) yerine amit (-CONH-) bağı bulunması nedeniyle plazma psödokolinesteraz hidrolizine dirençlidir.',
          isCorrect: true,
          diagnosticFeedback:
            'Tebrikler! Ester bağı plazmada dakikalar içinde psödokolinesteraz ile yarılırken, amit bağı karaciğer CYP450 enzimleri ile çok daha yavaş hidroliz edilir.',
          trapCode: 'TRAP-03-ESTER-AMIDE'
        },
        {
          id: 'opt-01-b',
          text: 'Tersiyer aminin pKa değerinin 8.9 olması ilacın fizyolojik pH’da tamamen iyonlaşmasını engelleyerek böbrekten atılımı durdurur.',
          isCorrect: false,
          diagnosticFeedback:
            'Yanlış (TRAP-01 tuzağı). pKa 8.9 fizyolojik pH (7.4)\'te ilacın %96 iyonize olmasına neden olur; böbrek atılımını durdurmaz, etki süresi farkı metabolik bağ kararlılığından kaynaklanır.',
          trapCode: 'TRAP-01-IONIZATION'
        },
        {
          id: 'opt-01-c',
          text: 'Bütoksi grubunun elektron çekici etkisiyle kinolin halkasının aromatikliğini bozması enzimlerin bağlanmasını engeller.',
          isCorrect: false,
          diagnosticFeedback:
            'Yanlış. Bütoksi grubu aromatikliği bozmaz; güçlü lipofilik karakter katarak membran geçişini ve dokuda tutunmayı artırır.',
          trapCode: 'TRAP-03-ESTER-AMIDE'
        },
        {
          id: 'opt-01-d',
          text: 'Dibukain doğrudan asetilkolinesterazın serin hidroksiline kovalent organofosfat bağı kurarak geri dönüşümsüz bağlanır.',
          isCorrect: false,
          diagnosticFeedback:
            'Yanlış (TRAP-08 tuzağı). Kovalent serin bağı organofosfatlara özgüdür; dibukain voltaj kapılı Na+ kanallarını geri dönüşümlü bloke eder.',
          trapCode: 'TRAP-08-AChE-AGING'
        }
      ],
      hintLadder: [
        'İpucu 1 (Nudge): Prokain ve dibukainin merkezindeki karbonil komşusu heteroatoma dikkat et: oksijen mi azot mu?',
        'İpucu 2 (Clue): Plazmada serbestçe dolaşan psödokolinesteraz enzimi hangi bağı dakikalar içinde hidroliz eder?',
        'İpucu 3 (Solution): Amit köprüsü (-CONH-) plazma esterazlarına dirençlidir, yavaş hepatik klirens gerektirir.'
      ],
      slideProvenance: 'Marmara Eczacılık 2024 - Farmasötik Kimya II, Slayt 18'
    },
    ankiCards: [
      {
        id: 'anki-01-1',
        question:
          'Dibukain (sinkokain) molekülü neden prokaine göre plazma esterazları tarafından hidroliz edilmez ve etki süresi çok uzundur?',
        answer:
          'Dibukain ester (-COO-) yerine **amit (-CONH-)** köprüsüne sahiptir. Plazma psödokolinesterazı amit bağını yaramaz; eliminasyon yavaş hepatik CYP metabolizması ile gerçekleşir.',
        hintLadder: [
          'İpucu 1: Merkez köprü heteroatomuna bak.',
          'İpucu 2: Esterazlar amit bağını yarabilir mi?',
          'İpucu 3: Amit bağı plazma enzimlerine dirençlidir.'
        ],
        examTrapWarning:
          'Vize Tuzağı: Dibukain kanda esterazla yıkılmaz; karaciğer mikrozomal enzimleri ile yavaş inaktive olur!',
        tags: ['PharmLearn', 'Marmara', 'FarmasotikKimya', 'LokalAnestezikler', 'TRAP-03'],
        slideCitation: 'Marmara MedChem 2024 - Slide 18'
      },
      {
        id: 'anki-01-2',
        question: 'Klinikte "Dibukain Sayısı" testi hangi genetik enzimatik bozukluğu saptamak için kullanılır?',
        answer:
          'Genetik **atipik plazma psödokolinesteraz (butirilkolinesteraz)** enzim eksikliğini saptamak için. Normal enzim dibukainle %80 inhibe olurken atipik enzim sadece %20 inhibe olur.',
        hintLadder: [
          'İpucu 1: Süksinilkolin apne riskini hatırla.',
          'İpucu 2: İnhibisyon yüzdesi genetik mutasyona göre değişir.',
          'İpucu 3: Atipik psödokolinesteraz tanısı.'
        ],
        examTrapWarning:
          'Sınav Tuzağı: Normal kanda dibukain sayısı >80, homozigot atipik hastalarda <20’dir!',
        tags: ['PharmLearn', 'Marmara', 'Farmakoloji', 'KlinikEnzimoloji', 'DibukainSayisi'],
        slideCitation: 'Marmara MedChem 2024 - Slide 18'
      }
    ],
    uploadedAt: '2026-10-06T09:00:00Z'
  },
  {
    id: 'slide-reanim-02',
    title: 'Hill-Langmuir ve Furchgott Yedek Reseptör Deneyi',
    courseId: 'pharmacology',
    facultyName: 'Marmara Üniversitesi Eczacılık Fakültesi',
    deckName: 'Farmakoloji - Doz-Yanıt ve Reseptör Teorileri',
    pageNumber: 24,
    extractedRawText: `RESEPTÖR REZERVİ (YEDEK RESEPTÖRLER) & FURCHGOTT DENEYİ
Hill-Langmuir Doluluk Eşitliği: Fraksiyon = [D] / ([D] + Kd)
Deney Tasarımı: İzole düz kas preparatında fenoksibenzamin (kovalent alkilleyici irreversibl antagonist) ile reseptör havuzunun %90'ı kalıcı inaktive edilmiştir.
Gözlem: Kalan %10 reseptör ile tam agonist hala %100 Emax maksimal kasılma oluşturabilmektedir!
Matematiksel İlişki: EC50 = 5 nM, Kd = 50 nM (EC50 << Kd).
Sonuç: Maksimal biyolojik yanıt oluşturmak için tüm reseptörlerin dolmasına gerek yoktur. Hücre içi sinyal amplifikasyonu (ikincil haberciler: cAMP, IP3, Ca2+) yedek reseptör rezervi doğurur.`,
    entities: [
      {
        id: 'ent-02-kd',
        label: 'Kd = 50 nM (Afinite)',
        type: 'kd',
        value: 50,
        confidence: 0.99,
        boundingBox: { x: 140, y: 150, width: 170, height: 40 }
      },
      {
        id: 'ent-02-ec50',
        label: 'EC50 = 5 nM (10 Kat Yedek)',
        type: 'ec50',
        value: 5,
        confidence: 0.98,
        boundingBox: { x: 340, y: 150, width: 210, height: 40 }
      },
      {
        id: 'ent-02-emax',
        label: 'Emax = 100% (Maksimal)',
        type: 'emax',
        value: 100,
        confidence: 0.96,
        boundingBox: { x: 140, y: 220, width: 190, height: 40 }
      },
      {
        id: 'ent-02-trap',
        label: 'TRAP-02: EC50 vs Kd İlişkisi',
        type: 'trap',
        value: 'Yedek reseptör varlığında EC50 < Kd',
        confidence: 0.97,
        boundingBox: { x: 140, y: 290, width: 360, height: 40 }
      }
    ],
    widgetConfig: {
      type: 'DoseResponseCurve',
      title: 'Furchgott Yedek Reseptör Konsantrasyon-Yanıt Eğrisi',
      description:
        'İrreversibl antagonist (fenoksibenzamin) konsantrasyonunu artırarak reseptör rezervinin nasıl tüketildiğini ve Emax çöküş anını interaktif gözlemle.',
      props: {
        baselineKd: 50,
        baselineEc50: 5,
        spareReceptorPercentage: 90
      }
    },
    challenge: {
      id: 'quiz-reanim-02',
      question:
        'Bir dokuda fenoksibenzamin ile reseptör havuzunun %80’i kovalent yok edilmesine rağmen tam agonistin Emax maksimal yanıtı neden hiç düşmez?',
      hypothesisPrompt:
        'Slayttaki Kd ve EC50 değerlerini karşılaştırarak dokuda reseptörlerin tamamının dolmasına gerek olup olmadığını tahmin et.',
      options: [
        {
          id: 'opt-02-a',
          text: 'Sistemde yedek reseptör (spare receptor) rezervi vardır; sinyal iletim kaskadındaki amplifikasyon sayesinde kalan %20 reseptör tam etkiyi üretmeye yeter.',
          isCorrect: true,
          diagnosticFeedback:
            'Harika analiz! GPCR sinyal kaskadında 1 reseptör yüzlerce G-proteini ve binlerce cAMP/Ca2+ aktive ettiği için %100 yanıt için çok az reseptör doluluğu yeterlidir.',
          trapCode: 'TRAP-02-SPARE-RECEPTORS'
        },
        {
          id: 'opt-02-b',
          text: 'Fenoksibenzamin reversibl kompetitif bir ilaç olduğu için artan agonist konsantrasyonu antagonisti reseptörden söker.',
          isCorrect: false,
          diagnosticFeedback:
            'Yanlış. Fenoksibenzamin kovalent bağ kuran irreverzibl bir antagonisttir; agonist ne kadar artarsa artsın reseptörden sökülemez.',
          trapCode: 'TRAP-02-SPARE-RECEPTORS'
        },
        {
          id: 'opt-02-c',
          text: 'EC50 değeri daima Kd değerine eşit olmak zorundadır; dolayısıyla doku her dozda aynı oranda uyarılır.',
          isCorrect: false,
          diagnosticFeedback:
            'Yanlış (Önemli Vize Hatası). EC50 = Kd eşitliği yalnızca yedek reseptörün OLMADIĞI sistemlerde geçerlidir. Yedek reseptör varsa EC50 << Kd olur.',
          trapCode: 'TRAP-02-SPARE-RECEPTORS'
        },
        {
          id: 'opt-02-d',
          text: 'Agonist molekülleri allosterik bölgeye bağlanarak reseptör sayısını iki katına çıkarır.',
          isCorrect: false,
          diagnosticFeedback:
            'Yanlış. Agonist bağlanması reseptör sayısını artırmaz; reseptör sayısı sabittir veya internalizasyonla azalır.',
          trapCode: 'TRAP-02-SPARE-RECEPTORS'
        }
      ],
      hintLadder: [
        'İpucu 1 (Nudge): 1 adet aktif reseptör hücre içinde kaç molekül cAMP üretebilir?',
        'İpucu 2 (Clue): Maksimal kasılma yanıtı için dokudaki reseptörlerin yüzde kaçının dolması gerekir?',
        'İpucu 3 (Solution): Sinyal amplifikasyonu nedeniyle kalan %20 reseptör tam etki üretmeye yeterlidir (Yedek Reseptör Rezervi).'
      ],
      slideProvenance: 'Marmara Eczacılık 2024 - Farmakoloji Doz-Yanıt, Slayt 24'
    },
    ankiCards: [
      {
        id: 'anki-02-1',
        question: 'Farmakolojide bir dokuda "Yedek Reseptör (Spare Receptor)" varlığı EC50 ve Kd ilişkisini nasıl etkiler?',
        answer:
          'Yedek reseptör varlığında **EC50 < Kd** olur. Dokudaki reseptörlerin tamamı dolmadan (düşük konsantrasyonda) maksimal yanıt (Emax) elde edilir.',
        hintLadder: [
          'İpucu 1: Potens (EC50) ve afinite (Kd) kıyasla.',
          'İpucu 2: Tam etki için tüm reseptörler dolar mı?',
          'İpucu 3: EC50 küçüktür Kd.'
        ],
        examTrapWarning:
          'Sınav Tuzağı: Yedek reseptör yoksa EC50 = Kd; yedek reseptör varsa EC50 daima Kd’den küçüktür!',
        tags: ['PharmLearn', 'Marmara', 'Farmakoloji', 'DozYanit', 'TRAP-02'],
        slideCitation: 'Marmara Pharmacology 2024 - Slide 24'
      }
    ],
    uploadedAt: '2026-10-06T09:30:00Z'
  },
  {
    id: 'slide-reanim-03',
    title: 'Salisilik Asit İntramoleküler Hidrojen Bağı ve pKa Tuzağı',
    courseId: 'medchem',
    facultyName: 'Hacettepe Üniversitesi Eczacılık Fakültesi',
    deckName: 'Farmasötik Kimya I - İyonlaşma ve Dağılım Katsayısı',
    pageNumber: 12,
    extractedRawText: `SALİSİLİK ASİT (o-HİDROKSİBENZOİK ASİT) ASİTLİK ANALİZİ
Salisilik Asit pKa: 2.97 (Çok güçlü zayıf asit)
p-Hidroksibenzoik Asit pKa: 4.58 (Benzer yapı ama 40 kat daha zayıf asit!)
Fizyolojik Mide pH (1.5): Salisilik asit midede büyük oranda (%97) non-iyonizedir; pasif difüzyonla mide mukozasını hızla geçer.
Mukoza İçi pH (7.4): Hücre içine girince iyonlaşır (%99.9 iyonize); iyon tuzağı (ion trapping) oluşarak mide hasarına yol açar.
Neden pKa 2.97?: Karboksil protonu koptuğunda oluşan karboksilat anyonu (-COO-), komşu orto-fenolik hidroksil grubu ile 6 üyeli kararlı bir intramoleküler hidrojen bağı (şelat halkası) kurarak rezonans kararlılığını olağanüstü artırır!`,
    entities: [
      {
        id: 'ent-03-pka',
        label: 'pKa = 2.97 (Salisilat)',
        type: 'pka',
        value: 2.97,
        confidence: 0.99,
        boundingBox: { x: 130, y: 140, width: 190, height: 40 }
      },
      {
        id: 'ent-03-ph',
        label: 'pH = 1.5 (Mide Özsuyu)',
        type: 'ph',
        value: 1.5,
        confidence: 0.98,
        boundingBox: { x: 350, y: 140, width: 200, height: 40 }
      },
      {
        id: 'ent-03-hbond',
        label: 'İntramoleküler H-Bağı (Şelat)',
        type: 'functional_group',
        value: 'şelat halkası',
        confidence: 0.96,
        boundingBox: { x: 130, y: 210, width: 280, height: 40 }
      },
      {
        id: 'ent-03-trap',
        label: 'TRAP-01: İyon Tuzağı Mekanizması',
        type: 'trap',
        value: 'pH gradyenti ile mukoza birikimi',
        confidence: 0.97,
        boundingBox: { x: 130, y: 280, width: 330, height: 40 }
      }
    ],
    widgetConfig: {
      type: 'IonizationChamber',
      title: 'Henderson-Hasselbalch Salisilat İyonlaşma Odası',
      description:
        'Mide pH 1.5 ile mukoza içi pH 7.4 arasında salisilik asidin iyonize ve non-iyonize fraksiyon değişimini canlı olarak simüle et.',
      props: {
        pKa: 2.97,
        compoundType: 'weak_acid',
        initialPh: 1.5
      }
    },
    challenge: {
      id: 'quiz-reanim-03',
      question:
        'Salisilik asidin (pKa 2.97) p-hidroksibenzoik aside (pKa 4.58) göre yaklaşık 40 kat daha kuvvetli bir asit olmasının kimyasal gerekçesi nedir?',
      hypothesisPrompt:
        'Salisilik asit bir proton kaybettiğinde komşu orto-hidroksil grubu ile karboksilat anyonu arasında nasıl bir etkileşim oluştuğunu tahmin et.',
      options: [
        {
          id: 'opt-03-a',
          text: 'Proton ayrıldıktan sonra oluşan karboksilat anyonunun komşu orto-fenolik hidroksille kararlı 6 üyeli intramoleküler hidrojen bağı (şelat halkası) kurması konjuge bazı stabilize eder.',
          isCorrect: true,
          diagnosticFeedback:
            'Mükemmel! Konjuge baz ne kadar kararlıysa asitlik o kadar artar (pKa düşer). Para türevinde mesafe uzak olduğu için bu iç şelat halkası kurulamaz.',
          trapCode: 'TRAP-01-IONIZATION'
        },
        {
          id: 'opt-03-b',
          text: 'Orto pozisyonundaki hidroksil grubunun güçlü elektron verici mezomerik (+M) etkisi benzen halkasındaki elektron yoğunluğunu azaltır.',
          isCorrect: false,
          diagnosticFeedback:
            'Yanlış. +M etkisi halkaya elektron VERİR, asitliği artırmaz tam tersine azaltır; burada baskın kuvvet intramoleküler H-bağı stabilizasyonudur.',
          trapCode: 'TRAP-01-IONIZATION'
        },
        {
          id: 'opt-03-c',
          text: 'Salisilik asit suda çözündüğünde dimerleşerek iki karboksilik asit protonunu aynı anda çözeltiye verir.',
          isCorrect: false,
          diagnosticFeedback:
            'Yanlış. Salisilik asit monoprotik bir asittir, fizyolojik sulu ortamda serbest tek proton verir.',
          trapCode: 'TRAP-01-IONIZATION'
        },
        {
          id: 'opt-03-d',
          text: 'Salisilat iyonu midede HCl ile reaksiyona girerek çözünmeyen kovalent polimer oluşturur.',
          isCorrect: false,
          diagnosticFeedback:
            'Yanlış. Midedeki asidik ortam salisilatı iyonize formdan non-iyonize forma çevirir, polimerleşme olmaz.',
          trapCode: 'TRAP-01-IONIZATION'
        }
      ],
      hintLadder: [
        'İpucu 1 (Nudge): Bir asidin kuvveti, protonunu kaybettikten sonra kalan konjuge bazının kararlılığı ile doğru orantılıdır.',
        'İpucu 2 (Clue): Orto pozisyonundaki -OH ile -COO- grubu yan yana geldiğinde hangi bağ oluşur?',
        'İpucu 3 (Solution): 6 üyeli intramoleküler hidrojen bağı (şelat) anyonu stabilize eder ve pKa\'yı 2.97\'ye düşürür.'
      ],
      slideProvenance: 'Hacettepe Eczacılık 2024 - Farmasötik Kimya I, Slayt 12'
    },
    ankiCards: [
      {
        id: 'anki-03-1',
        question:
          'Salisilik asidin (pKa 2.97) p-hidroksibenzoik aside (pKa 4.58) göre çok daha güçlü asit olmasını sağlayan yapısal etki nedir?',
        answer:
          'Proton ayrıldığında karboksilat anyonu (-COO-) ile komşu orto-hidroksil (-OH) arasında kurulan **6 üyeli intramoleküler hidrojen bağı (şelat halkası)** konjuge bazı aşırı kararlı kılar.',
        hintLadder: [
          'İpucu 1: Konjuge baz stabilizasyonuna bak.',
          'İpucu 2: Orto vs para hidroksil mesafesi.',
          'İpucu 3: İntramoleküler H-bağı şelat halkası.'
        ],
        examTrapWarning:
          'Sınav Tuzağı: Para-hidroksibenzoik asit şelat oluşturamaz, bu yüzden pKa değeri 4.58\'dir!',
        tags: ['PharmLearn', 'Hacettepe', 'FarmasotikKimya', 'AsitBaz', 'TRAP-01'],
        slideCitation: 'Hacettepe MedChem 2024 - Slide 12'
      }
    ],
    uploadedAt: '2026-10-06T10:00:00Z'
  },
  {
    id: 'slide-reanim-04',
    title: 'Schild Regresyonu ve Kompetitif Antagonizma Eğim Analizi',
    courseId: 'pharmacology',
    facultyName: 'Hacettepe Üniversitesi Eczacılık Fakültesi',
    deckName: 'Farmakoloji - Reseptör Kinetiği ve Antagonizma',
    pageNumber: 31,
    extractedRawText: `SCHİLD REGRESYON ANALİZİ VE ARUNLAKSHANA-SCHILD DENKLEMİ
Eşitlik: log (Doz Oranı - 1) = log [B] - log Kb = log [B] + pA2
Doz Oranı (DR): Antagonist varlığında aynı etkiyi oluşturan agonist dozu [A\'] / Antagonist yokken gereken agonist dozu [A].
Regresyon Doğrusu Eğim Kriteri:
- Eğim (m) = 1.0 (95% CI: 0.95 - 1.05) ise: Basit reversibl kompetitif antagonizma kesinlikle kanıtlanmıştır. Antagonist ve agonist aynı reseptör bölgesine yarışmalı bağlanır.
- Eğim (m) < 1.0 ise: Antagonist klirensi, uptake mekanizması, allosterik modülasyon veya heterojen reseptör popülasyonu vardır; basit kompetitif model reddedilir!
pA2 Tanımı: Doz oranını tam 2 yapan (DR = 2, yani agonist dozunu iki katına çıkaran) antagonist molar konsantrasyonunun negatif logaritmasıdır (-log [B]). pA2 = -log Kb.`,
    entities: [
      {
        id: 'ent-04-slope',
        label: 'Schild Eğimi m = 1.0',
        type: 'functional_group',
        value: 'm = 1.0 (Kompetitif Doğrulama)',
        confidence: 0.99,
        boundingBox: { x: 130, y: 150, width: 220, height: 40 }
      },
      {
        id: 'ent-04-pa2',
        label: 'pA2 = 7.8 (-log Kb)',
        type: 'kd',
        value: 7.8,
        confidence: 0.98,
        boundingBox: { x: 370, y: 150, width: 180, height: 40 }
      },
      {
        id: 'ent-04-trap',
        label: 'TRAP-07: Schild Eğimi Kriteri',
        type: 'trap',
        value: 'Eğim 1.0 değilse kompetitif değildir',
        confidence: 0.97,
        boundingBox: { x: 130, y: 250, width: 330, height: 40 }
      }
    ],
    widgetConfig: {
      type: 'DoseResponseCurve',
      title: 'Schild Regresyonu ve Konsantrasyon Kayma Simülatörü',
      description:
        'Artan antagonist dozlarında agonist eğrisinin paralel sağa kaymasını ve log(DR-1) grafiğinin eğiminin 1.0 oluşunu canlı incele.',
      props: {
        mode: 'schild_regression',
        pA2: 7.8,
        theoreticalSlope: 1.0
      }
    },
    challenge: {
      id: 'quiz-reanim-04',
      question:
        'Bir farmakoloji laboratuvarında yeni bir antagonist ile yapılan Schild analizinde regresyon doğrusunun eğimi m = 0.62 olarak hesaplanmıştır. Bu deneysel bulgu nasıl yorumlanmalıdır?',
      hypothesisPrompt:
        'Schild eşitliğinde eğimin 1.0 olmasının ne anlama geldiğini ve eğim 0.62 çıktığında basit yarışmalı modelin geçerli olup olmadığını tahmin et.',
      options: [
        {
          id: 'opt-04-a',
          text: 'Basit reversibl kompetitif antagonizma modeli reddedilir; antagonist ortamdan uptake ile uzaklaştırılıyor, allosterik etki gösteriyor veya birden fazla reseptör alt tipine bağlanıyor olabilir.',
          isCorrect: true,
          diagnosticFeedback:
            'Kesinlikle doğru! Schild analizinde eğimin 1.0 olması basit kompetitifliğin olmazsa olmaz şartıdır. 1.0\'dan belirgin sapmalar (m=0.62) klerens veya allosterik etkileşimi gösterir.',
          trapCode: 'TRAP-07-SCHILD-SLOPE'
        },
        {
          id: 'opt-04-b',
          text: 'Antagonistin intrensek etkinliği (alfa) 0.62 olduğu için parsiyel agonist olarak davrandığı kanıtlanır.',
          isCorrect: false,
          diagnosticFeedback:
            'Yanlış. Schild analizinde eğim intrensek etkinliği (alfa) ölçmez; eğim bağlanma stoikiometrisini ve model uygunluğunu gösterir.',
          trapCode: 'TRAP-07-SCHILD-SLOPE'
        },
        {
          id: 'opt-04-c',
          text: 'Eğim 1.0\'dan küçük olduğu için antagonistin potensinin çok yüksek olduğu anlamına gelir.',
          isCorrect: false,
          diagnosticFeedback:
            'Yanlış. Potens pA2 veya log Kb değeriyle (x-keseni) belirlenir, doğrunun eğimiyle değil.',
          trapCode: 'TRAP-07-SCHILD-SLOPE'
        },
        {
          id: 'opt-04-d',
          text: 'Fenoksibenzamin gibi kovalent bağ kurarak reseptörleri geri dönüşümsüz inaktive ettiği kesinleşir.',
          isCorrect: false,
          diagnosticFeedback:
            'Yanlış. Kovalent inaktivasyon Emax çöküşü oluşturur; Schild doğrusu paralel eğri kaymaları temelinde hesaplanır.',
          trapCode: 'TRAP-07-SCHILD-SLOPE'
        }
      ],
      hintLadder: [
        'İpucu 1 (Nudge): Schild analizinde basit 1:1 yarışmalı kompetitif model için eğim (m) tam kaç olmalıdır?',
        'İpucu 2 (Clue): m = 1.0 dışında bir değer çıktığında basit model doğrulanabilir mi?',
        'İpucu 3 (Solution): m = 0.62 basit reversibl kompetitif modeli çürütür; allosterik modülasyon veya uptake şüphesi doğurur.'
      ],
      slideProvenance: 'Hacettepe Eczacılık 2024 - Farmakoloji Reseptör Kinetiği, Slayt 31'
    },
    ankiCards: [
      {
        id: 'anki-04-1',
        question:
          'Arunlakshana-Schild regresyon analizinde bir ilacın "Basit Reversibl Kompetitif Antagonist" olduğunu kanıtlayan kesin eğim (m) kriteri nedir?',
        answer:
          'Schild doğrusunun eğimi **tam olarak 1.0 (m = 1.0)** olmalıdır. Eğim 1.0’dan istatistiksel olarak farklıysa basit kompetitif model reddedilir.',
        hintLadder: [
          'İpucu 1: Doğrunun teorik eğimine bak.',
          'İpucu 2: 1:1 stoikiometri kuralı.',
          'İpucu 3: Eğim tam 1.0 olmalıdır.'
        ],
        examTrapWarning:
          'Sınav Tuzağı: Eğim 1.0 değilse potens hesaplanamaz; allosterizm veya uptake mekanizması aranmalıdır!',
        tags: ['PharmLearn', 'Hacettepe', 'Farmakoloji', 'SchildRegresyonu', 'TRAP-07'],
        slideCitation: 'Hacettepe Pharmacology 2024 - Slide 31'
      }
    ],
    uploadedAt: '2026-10-06T10:30:00Z'
  }
];
