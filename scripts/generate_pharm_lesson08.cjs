const fs = require('fs');
const path = require('path');

const lesson08 = {
  id: "pharm-mod4-les2",
  courseId: "pharmacology",
  moduleId: "ph-mod-04",
  title: {
    tr: "Kolinerjik Transmisyon ve Muskarinik Reseptör Modülasyonu",
    ar: "النقل العصبي الكوليني وتعديل المستقبِلات الموسكارينية",
    en: "Cholinergic Neurotransmission & Muscarinic Receptor Modulation"
  },
  order: 2,
  access: "free",
  objective: {
    tr: "Asetilkolin sentez ve yıkım döngüsünü, muskarinik (M1-M5) ve nikotinik (Nn, Nm) reseptör alt tiplerini, organofosfat toksidromunu ve Tensilon testini yönetmek.",
    ar: "إتقان دورة اصطناع وحلمهة الأسيتيل كولين، والأنماط الموسكارينية (M1-M5) والنيكوتينية (Nn, Nm)، ومتلازمة التسمم بالفوسفور العضوي واختبار تينسيلون.",
    en: "Master acetylcholine synthesis and hydrolysis, muscarinic (M1-M5) and nicotinic (Nn, Nm) receptor subtypes, organophosphate toxidrome, and Tensilon testing."
  },
  misconceptions: [
    {
      tr: "Atropinin tüm kolinerjik reseptörleri bloke eden evrensel bir panzehir olduğu yanılgısı (atropin yalnızca muskarinik M1-M5 reseptörlerini bloke eder; çizgili kas nikotinik Nm reseptörlerine sıfır afinitesi vardır).",
      ar: "الظن الخاطئ بأن الأتروبين ترياق شامل يعطل كل المستقبلات الكولينية (الأتروبين يحصر المستقبلات الموسكارينية فقط، ولا يملك أي ألفة لمستقبلات Nm العضلية الهيكلية).",
      en: "The misconception that atropine is a universal cholinergic antagonist (atropine selectively blocks muscarinic M1-M5 receptors with zero activity at nicotinic Nm endplates)."
    },
    {
      tr: "Miyasteni krizinde zayıflık hisseden hastaya körlemesine kolinesteraz inhibitörü verilmesi yanılgısı (hastalık miyastenik kriz değil aşırı doz kolinerjik kriz ise, ilaç depolarizan felci şiddetlendirip hastayı boğabilir).",
      ar: "الاعتقاد الخاطئ بإمكانية إعطاء مثبطات الكولينستراز عميانياً عند تفاقم الوهن العضلي (إذا كانت النوبة كولينية ناتجة عن فرط الجرعة، فإن الدواء يعمق الشلل الاستقطابي ويفضي للوفاة).",
      en: "The dangerous practice of blindly giving AChE inhibitors in myasthenic weakness (if the event is an overtreatment cholinergic crisis, adding drug deepens depolarizing paralysis into fatal asphyxiation)."
    }
  ],
  sources: [
    {
      file: "Otonom Sinir Sistemi.pdf",
      page: 22
    }
  ],
  citations: [
    {
      id: "CIT-KATZUNG-CH07-P105",
      book: "Katzung's Basic & Clinical Pharmacology",
      edition: "15th ed.",
      topic: "Cholinoceptor-Activating & Cholinesterase-Inhibiting Drugs",
      chapter: "Chapter 7: Cholinoceptor-Activating & Cholinesterase-Inhibiting Drugs",
      page: "pp. 105-125",
      status: "verified"
    },
    {
      id: "CIT-GG-CH07-P135",
      book: "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
      edition: "14th ed.",
      topic: "Muscarinic Receptor Agonists and Antagonists",
      chapter: "Chapter 7: Muscarinic Receptor Agonists and Antagonists",
      page: "pp. 135-155",
      status: "verified"
    }
  ],
  spacedReviewCards: [
    {
      cardId: "pharm-mod4-les2-card1",
      courseId: "pharmacology",
      drugOrConcept: "Atropin Paradoksu ve Nikotinik Felç",
      prompt: "Organofosfat zehirlenmesinde yüksek doz atropin sekresyonları durdurduğu halde diyafram kas felcini neden önleyemez?",
      answer: "Atropin yalnızca muskarinik (M1-M5) reseptörleri bloke eder; nöromusküler kavşaktaki nikotinik (Nm) reseptörleri bloke edemez. Pralidoksim (2-PAM) gereklidir.",
      box: 1,
      intervalDays: 1
    },
    {
      cardId: "pharm-mod4-les2-card2",
      courseId: "pharmacology",
      drugOrConcept: "Endotelyal M3 Paradoksu",
      prompt: "Damar düz kasında parasempatik innervasyon olmadığı halde intravenöz asetilkolin neden güçlü vazodilatasyon yapar?",
      answer: "Endotel hücrelerindeki M3 reseptörleri Gq/Ca2+ ile endotelyal nitrik oksit sentazı (eNOS) aktive eder; salınan NO düz kasa diffüze olup cGMP ile gevşeme sağlar.",
      box: 1,
      intervalDays: 1
    },
    {
      cardId: "pharm-mod4-les2-card3",
      courseId: "pharmacology",
      drugOrConcept: "Tensilon Testi Ayırıcı Tanısı",
      prompt: "Miyastenia Gravis krizinde ultra kısa etkili edrofonyum (Tensilon) verildiğinde klinik yanıt nasıl yorumlanır?",
      answer: "Kas gücü anında düzelirse Miyastenik Krizdir (yetersiz ACh); kas felci daha da kötüleşir ve fasikülasyon artarsa Kolinerjik Krizdir (aşırı ACh / depolarizasyon bloku).",
      box: 1,
      intervalDays: 1
    },
    {
      cardId: "pharm-mod4-les2-card4",
      courseId: "pharmacology",
      drugOrConcept: "Pralidoksim ve Yaşlanma (Aging)",
      prompt: "Organofosfat zehirlenmesinde pralidoksim (2-PAM) neden ilk saatlerde hızla uygulanmalıdır?",
      answer: "Organofosfat-AChE kompleksi alkil grubunu kaybedip 'yaşlanma' (aging) sürecine girdiğinde kovalent bağ kalıcılaşır ve enzim artık reaktive edilemez.",
      box: 1,
      intervalDays: 1
    }
  ],
  steps: [
    // Step 1: Hook (predict_reveal, predictThenReveal: true)
    {
      id: "pharm-mod4-les2-step1",
      order: 1,
      stageIndex: 1,
      stage: "hook",
      type: "predict_reveal",
      title: {
        tr: "Klinik Paradoks: Organofosfat Zehirlenmesi ve Atropin İflası",
        ar: "مفارقة سريرية: تسمم الفوسفور العضوي وعجز الأتروبين",
        en: "Clinical Paradox: Organophosphate Poisoning & Atropine Failure"
      },
      predictThenReveal: true,
      prompt: {
        tr: "Tarım ilacıyla zehirlenen çiftçiye yüksek doz atropin veriliyor. Tükürük ve hırıltı tamamen kesildiği halde, hasta neden dakikalar içinde diyafram felcine girip solunum arrestiyle boğulur?",
        ar: "مزارع تسمم بمبيد حشري عولج بجرعات عالية من الأتروبين فجفت إفرازاته تماماً. رغم ذلك، لماذا أصيب بشلل الحجاب الحاجز واختنق بانهيار تنفسي؟",
        en: "A pesticide-poisoned farmer receives high-dose IV atropine. Bronchial secretions instantly clear, yet the patient suddenly suffers diaphragmatic paralysis and respiratory arrest! Why?"
      },
      conceptCheck: {
        question: {
          tr: "Atropinin organofosfat zehirlenmesinde solunum sekresyonlarını mükemmel kuruttuğu halde çizgili kas felcini önleyememesinin nedeni nedir?",
          ar: "ما السبب الدوائي لنجاح الأتروبين في تجفيف الإفرازات وفشله التام في منع شلل العضلات التنفسية؟",
          en: "What pharmacological property explains why atropine clears secretions but completely fails to prevent neuromuscular paralysis?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Atropin selektif muskarinik (M) antagonisttir; nöromusküler kavşaktaki nikotinik (Nm) reseptörlerine sıfır afinitesi vardır ve depolarizan felci durduramaz.",
              ar: "الأتروبين حاصر موسكاريني (M) انتقائي؛ ولا يملك أي ألفة لمستقبلات النيكوتين (Nm) في الوصل العصبي العضلي فلا يمنع الشلل.",
              en: "Atropine is a selective muscarinic antagonist; it has zero affinity for nicotinic (Nm) endplates and cannot halt depolarizing paralysis."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Harika klinik teşhis! Atropin muskarinik (M1-M5) reseptörleri kurtarır ama nikotinik (Nm) çizgili kas plaklarına dokunamaz. Nikotinik felci kırmak için enzimi reaktive eden Pralidoksim (2-PAM) şarttır.",
              ar: "تشخيص سريري متقن! ينقذ الأتروبين مستقبلات M لكنه عاجز أمام مستقبلات Nm النيكوتينية. لفك شلل العضلات يلزم ترياق براليدوكسيم (2-PAM) فوراً.",
              en: "Superb clinical reasoning! Atropine rescues muscarinic targets but cannot touch nicotinic Nm plates. Reversing neuromuscular paralysis mandates Pralidoxime (2-PAM)."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Atropin diyafram kasına ulaştığında kas liflerindeki aktin ipliklerini kimyasal olarak çözer.",
              ar: "يحلل الأتروبين عند وصوله للحجاب الحاجز خيوط الأكتين العضلية كيميائياً.",
              en: "Atropine chemically digests actin filaments within diaphragmatic muscle fibers upon arrival."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Atropin kas proteinlerini sindiren bir proteaz değildir; o kompetitif bir GPCR antagonistidir.",
              ar: "غير صحيح: الأتروبين ليس إنزيماً هاضماً للبروتينات؛ بل هو حاصر تنافسي للمستقبلات المقترنة ببروتين G.",
              en: "Incorrect: Atropine is not a proteolytic enzyme; it is a competitive GPCR antagonist."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Organofosfat molekülleri atropini kovalent olarak yakalayarak kana geçişini mekanik perdeler.",
              ar: "تحتجز جزيئات الفوسفور العضوي الأتروبين بروابط تساهمية وتمنع انتشاره في الدم.",
              en: "Organophosphate molecules covalently capture atropine, physically preventing its systemic distribution."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Atropin organofosfata bağlanmaz; asetilkolinesteraz enzimine de dokunmaz. Yalnızca muskarinik reseptör cebinde yarışır.",
              ar: "غير صحيح: لا يرتبط الأتروبين بالفوسفور العضوي؛ بل ينافس الأسيتيل كولين على مستقبلات المسكارين فقط.",
              en: "Incorrect: Atropine does not react with organophosphates; it competes with acetylcholine exclusively at muscarinic sites."
            }
          }
        ]
      },
      technicalTerms: [
        {
          term: "Muskarinik Selektivite",
          transcription: "Muscarinic Selectivity",
          definition: "Atropinin muskarinik (M1-M5) GPCR reseptörlerini bloke ederken nikotinik (Nn, Nm) iyon kanallarına bağlanmaması özelliği.",
          ar: {
            term: "الانتقائية الموسكارينية",
            transcription: "Muscarinic Selectivity",
            definition: "خاصية الأتروبين في حصر مستقبلات المسكارين دون التأثير على القنوات الأيونية النيكوتينية في الوصل العضلي."
          },
          en: {
            term: "Muscarinic Selectivity",
            transcription: "Muscarinic Selectivity",
            definition: "The pharmacological selectivity of atropine for muscarinic GPCRs over nicotinic ligand-gated ion channels."
          }
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Solunum yollarındaki bezler muskarinik (M3) mi, yoksa nikotinik (Nm) reseptörlerle mi kontrol edilir?",
          ar: "هل تخضع الغدد التنفسية لمستقبلات المسكارين (M3) أم النيكوتين (Nm)؟",
          en: "Are airway glands regulated by muscarinic (M3) or nicotinic (Nm) receptors?"
        },
        {
          tier: 2,
          tr: "Diyafram çizgili kasındaki nöromusküler kavşak reseptörü hangisidir? Nikotinik Nm.",
          ar: "ما المستقبل المتوضع في الوصل العصبي العضلي لعضلة الحجاب الحاجز؟ مستقبل Nm النيكوتيني.",
          en: "Which receptor operates at the neuromuscular endplate of the diaphragm? Nicotinic Nm."
        },
        {
          tier: 3,
          tr: "Atropin muskarinik M3'ü bloke eder ama nikotinik Nm'ye hiç bağlanamaz; felci çözmek için pralidoksim şarttır.",
          ar: "يحصر الأتروبين M3 لكنه عاجز عن حصر Nm؛ ولعلاج الشلل العضلي لا بد من براليدوكسيم لإحياء الإنزيم.",
          en: "Atropine blocks muscarinic M3 but cannot touch nicotinic Nm; reversing paralysis requires pralidoxime."
        }
      ]
    },

    // Step 2: Question
    {
      id: "pharm-mod4-les2-step2",
      order: 2,
      stageIndex: 2,
      stage: "question",
      type: "question",
      title: {
        tr: "Kavramsal Soru: İyon Kanalı vs Yavaş GPCR",
        ar: "سؤال مفاهيمي: القنوات الأيونية السريعة مقابل GPCR البطيء",
        en: "Conceptual Question: Fast Ion Channels vs Slow GPCRs"
      },
      prompt: {
        tr: "Aynı asetilkolin molekülü çizgili kasta milisaniyeler içinde ani depolarizasyon yaparken; kalpte neden yüzlerce milisaniye süren yavaş bir hiperpolarizasyon ve bradikardi yaratır?",
        ar: "كيف لجزيء الأسيتيل كولين أن يحدث زوال استقطاب خلال ميلي ثوانٍ في العضلات الهيكلية، بينما يسبب في القلب فرط استقطاب بطيئاً وبطء نبض مديد؟",
        en: "How can the exact same acetylcholine molecule trigger millisecond depolarization in skeletal muscle, while provoking prolonged hyperpolarization and bradycardia in the heart?"
      },
      conceptCheck: {
        question: {
          tr: "Nikotinik ve muskarinik reseptörlerin aktivasyon hızları ve hücresel mekanizmaları arasındaki temel fark nedir?",
          ar: "ما الفارق الجوهري بين سرعة تفعيل وآلية عمل المستقبلات النيكوتينية والموسكارينية؟",
          en: "What fundamental divergence in mechanism dictates the speed difference between nicotinic and muscarinic signaling?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Nikotinik Nm doğrudan Na+/K+ geçiren ligand kapılı iyon kanalıdır (hızlı); muskarinik M2 ise Gi/GIRK yolağıyla çalışan 7-TM GPCR'dır (yavaş).",
              ar: "النيكوتيني Nm قناة أيونية مباشرة للصوديوم والبوتاسيوم (سريعة)؛ بينما الموسكاريني M2 مقترن بـ Gi/GIRK (بطيء).",
              en: "Nicotinic Nm is a direct ligand-gated cation channel (fast); muscarinic M2 is a 7-TM GPCR coupled to Gi/GIRK potassium channels (slow)."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Kusursuz biyofiziksel açıklama! İyon kanalı kapısını 1 milisaniyede açar. GPCR ise heterotrimerik G-proteini ayrışması ve GIRK kanalı açılması gerektirdiğinden yüzlerce milisaniye sürer.",
              ar: "تفسير فيزيائي حيوي بارع! تفتح القناة الأيونية خلال جزء من الألف من الثانية؛ بينما يتطلب GPCR تفكك بروتين G وفتح قنوات GIRK مما يستغرق وقتاً أطول.",
              en: "Flawless biophysical distinction! Ion channels open in under a millisecond; GPCR cascades require subunit dissociation and second messengers, taking hundreds of milliseconds."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Kalpteki asetilkolin molekülleri çizgili kastakilerden 1000 kat daha ağırdır.",
              ar: "جزيئات الأسيتيل كولين في القلب أثقل بـ 1000 مرة من جزيئاتها في العضلات الهيكلية.",
              en: "Acetylcholine molecules perfusing the heart are 1,000 times heavier than those in skeletal muscle."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Asetilkolin tek ve değişmez bir kimyasal maddedir (MW = 146 Da); dokuya göre moleküler ağırlığı değişemez.",
              ar: "غير صحيح: الأسيتيل كولين مركب كيميائي ثابت الوزن والتركيب في كل الأنسجة دون تغيير.",
              en: "Incorrect: Acetylcholine is an invariant chemical structure (MW = 146 Da); its molecular weight never changes across tissues."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Çizgili kasta asetilkolin mitokondriye girer, kalpte ise hücre dışı kıkırdakta hapsolur.",
              ar: "في العضلات يدخل الأسيتيل كولين الميتوكوندريا، وفي القلب يحبس في الغضاريف الخارجية.",
              en: "Acetylcholine enters mitochondria in skeletal muscle, but remains trapped in extracellular cartilage in the heart."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Asetilkolin hücre içine girmez; membran yüzeyindeki nikotinik veya muskarinik reseptörlerine bağlanır.",
              ar: "غير صحيح: الأسيتيل كولين لا يدخل الخلايا ولا الميتوكوندريا، بل يرتبط بالمستقبلات الغشائية السطحية.",
              en: "Incorrect: Acetylcholine does not enter intracellular organelles; it acts on external cell-surface receptors."
            }
          }
        ]
      },
      technicalTerms: [
        {
          term: "Ligand Kapılı İyon Kanalı",
          transcription: "Ligand-Gated Ion Channel",
          definition: "Nörotransmitterin doğrudan bağlanmasıyla konformasyon değiştirip milisaniyeler içinde iyon akışı sağlayan pentamerik kanal.",
          ar: {
            term: "القناة الأيونية المبوبة بالربيط",
            transcription: "Ligand-Gated Ion Channel",
            definition: "قناة بروتينية خماسية تفتح بوابتها مباشرة إثر ارتباط الناقل العصبي لتمرير الأيونات خلال أجزاء من الألف من الثانية."
          },
          en: {
            term: "Ionotropic Channel",
            transcription: "Ligand-Gated Ion Channel",
            definition: "A pentameric cell-surface receptor that directly forms an ion-conducting pore opening within milliseconds upon agonist binding."
          }
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Çizgili kas plaklarındaki reseptör iyon kanalı mıdır, yoksa G-proteini midir?",
          ar: "هل مستقبلات الوصل العصبي العضلي قناة أيونية أم بروتين G؟",
          en: "Is the skeletal muscle endplate receptor an ion channel or a G-protein coupled receptor?"
        },
        {
          tier: 2,
          tr: "Nikotinik reseptör doğrudan sodyum geçiren bir iyon kanalıdır (anlık yanıt).",
          ar: "المستقبل النيكوتيني قناة أيونية تمرر الصوديوم فوراً (استجابة لحظية).",
          en: "The nicotinic receptor is a direct sodium-permeable ion channel (instantaneous response)."
        },
        {
          tier: 3,
          tr: "Kalpteki M2 muskarinik reseptör GPCR'dır; Gi ve potasyum (GIRK) kanalları üzerinden yavaşça kalbi yavaşlatır.",
          ar: "مستقبل M2 القلبي مقترن ببروتين G؛ ويهدئ القلب ببطء عبر قنوات البوتاسيوم GIRK.",
          en: "Cardiac M2 is a GPCR; it slows heart rate gradually by opening GIRK potassium channels via Gi."
        }
      ]
    },

    // Step 3: Intuition
    {
      id: "pharm-mod4-les1-step3",
      order: 3,
      stageIndex: 3,
      stage: "intuition",
      type: "intuition",
      title: {
        tr: "Fiziksel Sezgi: Asma Köprü vs Belediye Habercisi",
        ar: "الحدس الفيزيائي: الجسر المتحرك مقابل رسول البلدية",
        en: "Physical Intuition: The Drawbridge vs The City Hall Messenger"
      },
      prompt: {
        tr: "Mekanik bir manivelayı çekip kapıyı anında açmak mı daha hızlıdır, yoksa belediye binasına haberci gönderip kalabalık odalardan talimat çıkartmak mı?",
        ar: "هل سحب رافعة ميكانيكية لفتح البوابة فوراً أسرع، أم إرسال رسول إلى دار البلدية ليمر بالمكاتب ويجلب الأوامر؟",
        en: "Is pulling a mechanical lever to fling open a gate faster, or dispatching a runner through city hall corridors to fetch instructions?"
      },
      conceptCheck: {
        question: {
          tr: "Asma köprü manivelası ve belediye habercisi analojisi kolinerjik iletimde neyi simgeler?",
          ar: "ماذا يمثل تشبيه رافعة الجسر ورسول دار البلدية في النقل الكوليني؟",
          en: "What do the mechanical drawbridge lever and city hall messenger symbolize in cholinergic signaling?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Manivela doğrudan açılan nikotinik iyon kanallarını; haberci ise hücre içi ikinci ulak kaskadını işleten muskarinik GPCR'ları simgeler.",
              ar: "الرافعة ترمز للقنوات النيكوتينية المباشرة؛ والرسول يرمز لشلال الرسل الثواني في مستقبلات GPCR الموسكارينية.",
              en: "The lever represents directly gated nicotinic ion channels; the messenger represents muscarinic GPCR second messenger cascades."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Kusursuz sezgi! İyonotropik nikotinik iletim manivela gibi anında iyon akıtır; metabotropik muskarinik iletim ise haberci gibi hücre içinde basamak basamak ilerler.",
              ar: "حدس سليم! النقل النيكوتيني رافعة تفتح مسار الأيونات بلحظة؛ بينما النقل الموسكارين يتنقل عبر خطوات خلوية متعددة كرسول متأنٍ.",
              en: "Spot on! Ionotropic nicotinic signaling acts like a direct mechanical lever; metabotropic muscarinic cascades diffuse instructions step-by-step."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Manivela karaciğerde safra üretimini; haberci ise idrarda protein kaçağını simgeler.",
              ar: "الرافعة ترمز لإنتاج الصفراء؛ والرسول يرمز لتسرب البروتين في البول.",
              en: "The lever represents hepatic bile secretion; the messenger represents urinary protein leakage."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Analoji nörotransmisyonun biyofiziksel hız farkını açıklar; safra veya böbrekle ilgisi yoktur.",
              ar: "غير صحيح: التشبيه يوضح فارق السرعة الفيزيائي الحيوي للنقل العصبي ولا علاقة له بالصفراء أو الكلى.",
              en: "Incorrect: The analogy contrasts the biophysical speeds of neurotransmission, completely unrelated to bile."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Manivela asetilkolinesteraz enzimini; haberci ise kolin molekülünün kendisini simgeler.",
              ar: "الرافعة ترمز لإنزيم الكولينستراز؛ والرسول يرمز لجزيء الكولين نفسه.",
              en: "The lever represents the acetylcholinesterase enzyme; the messenger represents the choline molecule."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Analoji reseptör tiplerini (iyonotropik vs metabotropik) karşılaştırır, enzimatik yıkımı değil.",
              ar: "غير صحيح: التشبيه يقارن آليات عمل المستقبلات (أيوني مقابل بروتين G) وليس التفكك الإنزيمي.",
              en: "Incorrect: The analogy contrasts receptor transduction types, not enzymatic degradation."
            }
          }
        ]
      },
      technicalTerms: [
        {
          term: "İyonotropik vs Metabotropik",
          transcription: "Ionotropic vs Metabotropic",
          definition: "Doğrudan iyon kanalı açan reseptörler (nikotinik) ile hücre içi metabolik yolakları başlatan reseptörlerin (muskarinik) temel ayrımı.",
          ar: {
            term: "أيوني مقابل أيضي",
            transcription: "Ionotropic vs Metabotropic",
            definition: "الفارق الأساسي بين المستقبلات المرتبطة مباشرة بقناة أيونية (النيكوتينية) وتلك المقترنة بمسارات أيضية خلوية (الموسكارينية)."
          },
          en: {
            term: "Transduction Types",
            transcription: "Ionotropic vs Metabotropic",
            definition: "The fundamental distinction between directly pore-forming receptors (ionotropic) and intracellular cascade-initiating GPCRs (metabotropic)."
          }
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Manivela çekildiğinde arada aracı olmaksızın fiziksel bir kapı doğrudan açılır.",
          ar: "عند سحب الرافعة، تفتح البوابة الفيزيائية مباشرة دون أي وسيط.",
          en: "When the lever is pulled, a physical gate flings open without any intermediate."
        },
        {
          tier: 2,
          tr: "Haberci ise binaya girip odaları dolaşmak zorundadır (G-proteini, ikinci ulaklar).",
          ar: "أما الرسول فيجب أن يعبر الممرات ويوصل الأوراق خطوة بخطوة (بروتين G والرسل الثواني).",
          en: "The messenger must navigate hallways and hand off documents (G-proteins, second messengers)."
        },
        {
          tier: 3,
          tr: "Nikotinik = manivela (milisaniyelik akım); Muskarinik = haberci (yavaş hücresel kaskad).",
          ar: "نيكوتيني = رافعة مباشرة (تيار بالميلي ثانية)؛ موسكاريني = رسول خلوي متأنٍ.",
          en: "Nicotinic = lever (millisecond flux); Muscarinic = messenger (intracellular cascade)."
        }
      ]
    },

    // Step 4: Visual Explanation
    {
      id: "pharm-mod4-les2-step4",
      order: 4,
      stageIndex: 4,
      stage: "visual_explanation",
      type: "visual_explanation",
      title: {
        tr: "Görsel Açıklama: Asetilkolin Yaşam Döngüsü ve Sinaps",
        ar: "الشرح البصري: دورة حياة الأسيتيل كولين في المشبك",
        en: "Visual Explanation: Acetylcholine Synaptic Life Cycle"
      },
      prompt: {
        tr: "Kolinerjik sinaps şemasına bakın: Hız kısıtlayıcı kolin geri alımı, ChAT ile asetilasyon, veziküler depolama, SNARE ekzositozu ve AChE ile 1 milisaniyede yıkım.",
        ar: "تأمل مخطط المشبك الكوليني: التقاط الكولين المحدد للسرعة، اصطناع ChAT، التخزين الحويصلي، قذف SNARE، والحلمهة بـ AChE في ميلي ثانية.",
        en: "Examine the cholinergic synapse: Rate-limiting choline uptake, ChAT synthesis, vesicular storage, SNARE exocytosis, and rapid AChE hydrolysis within 1 millisecond."
      },
      conceptCheck: {
        question: {
          tr: "Asetilkolin sentezinde hız kısıtlayıcı basamak ve botulinum toksininin felç edici etki noktası hangi seçenekte doğru verilmiştir?",
          ar: "ما هي الخطوة المحددة لسرعة اصطناع الأسيتيل كولين، وما نقطة تأثير سم البوتولينوم الشال؟",
          en: "What is the rate-limiting step of ACh synthesis, and what is the molecular target of botulinum toxin?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Hız kısıtlayıcı basamak sodyum bağımlı kolin geri alımıdır; botulinum toksini ise vezikül SNARE proteinlerini keserek ekzositozu engeller.",
              ar: "الخطوة المحددة للسرعة هي التقاط الكولين المعتمد على الصوديوم؛ وسم البوتولينوم يقطع بروتينات SNARE لمنع تحرر الحويصلات.",
              en: "The rate-limiting step is sodium-dependent choline uptake; botulinum toxin cleaves vesicular SNARE proteins, blocking exocytosis."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Harika moleküler kavrayış! Hemikolinyum kolin taşıyıcısını bloke ederek sentezi durdurur. Botulinum ise SNAP-25 ve sintaksin SNARE proteinlerini parçalayarak gevşek felç yapar.",
              ar: "إدراك جزيئي سليم! يثبط الهيميكولينيوم ناقل الكولين؛ بينما يقص سم البوتولينوم بروتينات SNAP-25 لمنع قذف الأسيتيل كولين وإحداث شلل رخو.",
              en: "Superb molecular knowledge! Hemicholinium blocks choline uptake. Botulinum toxin cleaves SNAP-25/syntaxin SNARE complexes, causing flaccid paralysis."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Hız kısıtlayıcı basamak idrardan asetat emilimidir; botulinum toksini ise asetilkolinesteraz enzimini aşırı çalıştırır.",
              ar: "الخطوة المحددة هي امتصاص الأسيتات من البول؛ وسم البوتولينوم يفرط في تنشيط إنزيم الكولينستراز.",
              en: "The rate-limiting step is renal acetate reabsorption; botulinum toxin hyper-activates acetylcholinesterase."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Asetat mitokondriyal asetil-KoA'dan gelir. Botulinum toksini AChE'yi değil, SNARE ekzositoz makinesini kilitler.",
              ar: "غير صحيح: الأسيتات تشتق من أسيتيل كو-A؛ وسم البوتولينوم يعطل بروتينات التحام الحويصلات SNARE وليس الكولينستراز.",
              en: "Incorrect: Acetate derives from mitochondrial acetyl-CoA. Botulinum disables the SNARE fusion machinery, not AChE."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Hız kısıtlayıcı basamak veziküllerin patlamasıdır; botulinum toksini sinir hücresinin çekirdeğini eritir.",
              ar: "الخطوة المحددة هي انفجار الحويصلات؛ وسم البوتولينوم يذيب نواة الخلية العصبية.",
              en: "The rate-limiting step is vesicular bursting; botulinum toxin dissolves the neuronal nucleus."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Vezikül kaynaşması düzenli bir ekzositozdur. Botulinum toksini nöronu eritmez, spesifik SNARE peptit bağlarını keser.",
              ar: "غير صحيح: اندماج الحويصلات قذف منظم؛ وسم البوتولينوم إنزيم نوعي يقطع روابط ببتيدية في SNARE دون حل النواة.",
              en: "Incorrect: Vesicle release is tightly coordinated exocytosis; botulinum is a zinc-endopeptidase cleaving specific peptide bonds."
            }
          }
        ]
      },
      technicalTerms: [
        {
          term: "SNARE Kompleksi",
          transcription: "SNARE Complex",
          definition: "Sinaptik veziküllerin presinaptik plazma zarına tutunup nörotransmitter salmasını sağlayan protein köprüsü (SNAP-25, Sintaksin, Sinaptobrevin).",
          ar: {
            term: "معقد بروتينات SNARE",
            transcription: "SNARE Complex",
            definition: "المعقد البروتيني المسؤول عن التحام الحويصلات المشبكية بالغشاء العصبي وتحرير النواقل (SNAP-25 وسينتاكسين).",
          },
          en: {
            term: "SNARE Complex",
            transcription: "SNARE Complex",
            definition: "The core protein machinery (SNAP-25, syntaxin, synaptobrevin) mediating synaptic vesicle fusion and neurotransmitter exocytosis."
          }
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Asetilkolin sentezinin hammaddesi olan kolin sinir hücresine nasıl girer? Yüksek afiniteli taşıyıcıyla.",
          ar: "كيف يدخل الكولين إلى الخلية العصبية لاصطناع الدواء؟ عبر ناقل عالي الألفة محدد للسرعة.",
          en: "How does choline enter the nerve terminal? Via a high-affinity rate-limiting transporter."
        },
        {
          tier: 2,
          tr: "Botulinum toksini veziküllerin zarla birleşmesini (ekzositoz) engelleyen bir çinkolu peptidazdır.",
          ar: "سم البوتولينوم إنزيم ببتيداز يعطل التحام الحويصلات بالغشاء الخلوي.",
          en: "Botulinum toxin is an endopeptidase that disables vesicle-membrane fusion."
        },
        {
          tier: 3,
          tr: "Kolin alımı hız kısıtlayıcıdır; Botulinum SNARE proteinlerini keserek asetilkolin salınımını tamamen durdurur.",
          ar: "التقاط الكولين يحدد السرعة؛ ويقص البوتولينوم بروتينات SNARE ليمنع إفراز الأسيتيل كولين.",
          en: "Choline uptake is rate-limiting; Botulinum cleaves SNAREs, completely arresting ACh exocytosis."
        }
      ]
    },

    // Step 5: Interactive Artifact (ReceptorLigandMatcher)
    {
      id: "pharm-mod4-les2-step5",
      order: 5,
      stageIndex: 5,
      stage: "interactive_artifact",
      type: "interactive_artifact",
      title: {
        tr: "İnteraktif Deney: Asetilkolin-M3 Reseptör Kenetlenmesi",
        ar: "تجربة تفاعلية: تطابق الأسيتيل كولين مع مستقبل M3",
        en: "Interactive Experiment: Acetylcholine-M3 Receptor Docking"
      },
      prompt: {
        tr: "Asetilkolinin kuaterner amonyum, ester karbonil ve etilen gruplarını M3 muskarinik reseptör aktif cebindeki Asp147, Tyr506, Asn507 ve Trp199 kalıntılarıyla eşleştirin.",
        ar: "طابق مجموعات الأمونيوم الرباعي وإستر الكربونيل والإيثيلين للأسيتيل كولين مع ثمالات Asp147 و Tyr506 و Asn507 و Trp199 في جيب مستقبل M3.",
        en: "Dock acetylcholine into the M3 muscarinic pocket by matching its quaternary ammonium, ester carbonyl, and ethylene spacer to Asp147, Tyr506, Asn507, and Trp199."
      },
      widgetType: "ReceptorLigandMatcher",
      widget: {
        type: "ReceptorLigandMatcher",
        config: {
          title: "Asetilkolin - M3 Muskarinik Reseptör Kenetlenmesi",
          prompt: "Asetilkolin molekülünün yapısal kısımlarını M3 reseptör cebindeki amino asit kalıntılarıyla eşleştirin.",
          drugName: "Asetilkolin (Acetylcholine)",
          receptorName: "M3 Muskarinik GPCR",
          pairs: [
            {
              id: "pair-1",
              drugGroup: "Kuaterner Amonyum Katyonu (-N+(CH3)3)",
              correctResidueId: "res-asp147",
              bondType: "ionic",
              energyKcalMol: "-6 to -10 kcal/mol",
              explanation: "Pozitif yüklü kuaterner amonyum başı, TM3 heliksindeki Asp147 karboksilat anyonu ile zorunlu elektrostatik tuz köprüsü kurar."
            },
            {
              id: "pair-2",
              drugGroup: "Kuaterner Amonyum Metil Grupları",
              correctResidueId: "res-tyr506",
              bondType: "pi_pi",
              energyKcalMol: "-3 to -6 kcal/mol",
              explanation: "Kuaterner amonyumun pozitif yükü, TM6 heliksindeki Tyr506 aromatik halkasının pi elektron bulutuyla katyon-pi etkileşimi yapar."
            },
            {
              id: "pair-3",
              drugGroup: "Ester Karbonil Oksijeni (C=O)",
              correctResidueId: "res-asn507",
              bondType: "h_bond",
              energyKcalMol: "-3 to -6 kcal/mol",
              explanation: "Ester karbonil oksijeni, TM6'daki Asn507 yan zincir amidi ile spesifik dipol-dipol hidrojen bağı kurar."
            },
            {
              id: "pair-4",
              drugGroup: "Etilen Köprüsü (-CH2-CH2-)",
              correctResidueId: "res-trp199",
              bondType: "van_der_waals",
              energyKcalMol: "-1.5 to -3 kcal/mol",
              explanation: "İki karbonlu etilen köprüsü, TM5 heliksindeki Trp199 indol halkasıyla hidrofobik van der Waals teması kurar."
            }
          ],
          residues: [
            {
              id: "res-asp147",
              residueName: "Asp147 (TM3)",
              description: "Negatif yüklü aspartat kalıntısı; asetilkolinin kuaterner amonyum katyonunu tuz köprüsüyle bağlar."
            },
            {
              id: "res-tyr506",
              residueName: "Tyr506 (TM6)",
              description: "Aromatik tirozin halkası; kuaterner amonyum ile katyon-pi etkileşimi oluşturur."
            },
            {
              id: "res-asn507",
              residueName: "Asn507 (TM6)",
              description: "Polar asparajin kalıntısı; ester karbonil grubuyla hidrojen bağı akseptörü/donörü olarak etkileşir."
            },
            {
              id: "res-trp199",
              residueName: "Trp199 (TM5)",
              description: "Büyük aromatik triptofan kalıntısı; etilen köprüsünü van der Waals temaslarıyla destekler."
            },
            {
              id: "res-leu225",
              residueName: "Leu225 (TM5)",
              description: "Hidrofobik lösin yan zinciri; terminal asetil metil grubunu çevreleyen apolar cep."
            }
          ],
          source: {
            file: "Otonom Sinir Sistemi.pdf",
            page: 22
          }
        }
      },
      config: {
        title: "Asetilkolin - M3 Muskarinik Reseptör Kenetlenmesi",
        prompt: "Asetilkolin molekülünün yapısal kısımlarını M3 reseptör cebindeki amino asit kalıntılarıyla eşleştirin.",
        drugName: "Asetilkolin (Acetylcholine)",
        receptorName: "M3 Muskarinik GPCR",
        pairs: [
          {
            id: "pair-1",
            drugGroup: "Kuaterner Amonyum Katyonu (-N+(CH3)3)",
            correctResidueId: "res-asp147",
            bondType: "ionic",
            energyKcalMol: "-6 to -10 kcal/mol",
            explanation: "Pozitif yüklü kuaterner amonyum başı, TM3 heliksindeki Asp147 karboksilat anyonu ile zorunlu elektrostatik tuz köprüsü kurar."
          },
          {
            id: "pair-2",
            drugGroup: "Kuaterner Amonyum Metil Grupları",
            correctResidueId: "res-tyr506",
            bondType: "pi_pi",
            energyKcalMol: "-3 to -6 kcal/mol",
            explanation: "Kuaterner amonyumun pozitif yükü, TM6 heliksindeki Tyr506 aromatik halkasının pi elektron bulutuyla katyon-pi etkileşimi yapar."
          },
          {
            id: "pair-3",
            drugGroup: "Ester Karbonil Oksijeni (C=O)",
            correctResidueId: "res-asn507",
            bondType: "h_bond",
            energyKcalMol: "-3 to -6 kcal/mol",
            explanation: "Ester karbonil oksijeni, TM6'daki Asn507 yan zincir amidi ile spesifik dipol-dipol hidrojen bağı kurar."
          },
          {
            id: "pair-4",
            drugGroup: "Etilen Köprüsü (-CH2-CH2-)",
            correctResidueId: "res-trp199",
            bondType: "van_der_waals",
            energyKcalMol: "-1.5 to -3 kcal/mol",
            explanation: "İki karbonlu etilen köprüsü, TM5 heliksindeki Trp199 indol halkasıyla hidrofobik van der Waals teması kurar."
          }
        ],
        residues: [
          {
            id: "res-asp147",
            residueName: "Asp147 (TM3)",
            description: "Negatif yüklü aspartat kalıntısı; asetilkolinin kuaterner amonyum katyonunu tuz köprüsüyle bağlar."
          },
          {
            id: "res-tyr506",
            residueName: "Tyr506 (TM6)",
            description: "Aromatik tirozin halkası; kuaterner amonyum ile katyon-pi etkileşimi oluşturur."
          },
          {
            id: "res-asn507",
            residueName: "Asn507 (TM6)",
            description: "Polar asparajin kalıntısı; ester karbonil grubuyla hidrojen bağı akseptörü/donörü olarak etkileşir."
          },
          {
            id: "res-trp199",
            residueName: "Trp199 (TM5)",
            description: "Büyük aromatik triptofan kalıntısı; etilen köprüsünü van der Waals temaslarıyla destekler."
          },
          {
            id: "res-leu225",
            residueName: "Leu225 (TM5)",
            description: "Hidrofobik lösin yan zinciri; terminal asetil metil grubunu çevreleyen apolar cep."
          }
        ],
        source: {
          file: "Otonom Sinir Sistemi.pdf",
          page: 22
        }
      },
      technicalTerms: [
        {
          term: "Katyon-Pi Etkileşimi",
          transcription: "Cation-Pi Interaction",
          definition: "Pozitif yüklü bir kuaterner amonyum iyonu ile aromatik bir halkanın elektron bulutu arasındaki elektrostatik çekim kuvveti.",
          ar: {
            term: "تأثر الكاتيون بحلقة باي",
            transcription: "Cation-Pi Interaction",
            definition: "قوة التجاذب الكهروستاتيكي غير التساهمية بين شحنة كاتيون الأمونيوم الموجبة وسحابة إلكترونات باي العطرية."
          },
          en: {
            term: "Cation-Pi Bond",
            transcription: "Cation-Pi Interaction",
            definition: "The non-covalent electrostatic attraction between a positively charged cation and the electron-rich pi-face of an aromatic ring."
          }
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Pozitif kuaterner amonyum başı negatif yüklü hangi amino asitle tuz köprüsü yapar?",
          ar: "مع أي حمض أميني سالب الشحنة يشكل كاتيون الأمونيوم الرباعي جسراً ملحياً؟",
          en: "With which negatively charged residue does the quaternary ammonium cation form a salt bridge?"
        },
        {
          tier: 2,
          tr: "Asp147 karboksilatı kuaterner azotu tutar; Tyr506 aromatik halkasıyla katyon-pi bağı kurar.",
          ar: "يلتقط Asp147 الشحنة الموجبة أيونياً؛ وتثبت حلقة Tyr506 الكاتيون برابطة كاتيون-باي.",
          en: "Asp147 captures the positive nitrogen ionically; Tyr506 stabilizes it via cation-pi attraction."
        },
        {
          tier: 3,
          tr: "Asn507 karbonil ile hidrojen bağı yapar, Trp199 etilen köprüsünü van der Waals ile sarar.",
          ar: "يشكل Asn507 رابطة هيدروجينية مع الكربونيل، ويثبت Trp199 جسر الإيثيلين بفان دير فالس.",
          en: "Asn507 H-bonds to carbonyl oxygen, and Trp199 grips the ethylene spacer via van der Waals forces."
        }
      ]
    },

    // Step 6: Guided Discovery
    {
      id: "pharm-mod4-les2-step6",
      order: 6,
      stageIndex: 6,
      stage: "guided_discovery",
      type: "guided_discovery",
      title: {
        tr: "Rehberli Keşif: Endotelyal M3 Vazodilatasyon Paradoksu",
        ar: "اكتشاف موجه: مفارقة توسع الأوعية عبر مستقبل M3 البطاني",
        en: "Guided Discovery: Endothelial M3 Vasodilatation Paradox"
      },
      prompt: {
        tr: "Damar düz kaslarında parasempatik sinir innervasyonu yoktur. Öyleyse intravenöz asetilkolin enjekte edildiğinde kan damarları nasıl aniden gevşeyip tansiyonu düşürür?",
        ar: "لا تمتلك العضلات الوعائية الملساء أي تعصيب لاودي. كيف يحدث حقن الأسيتيل كولين وريدياً ارتخاءً وعائياً مفاجئاً وهبوطاً في الضغط؟",
        en: "Vascular smooth muscle lacks parasympathetic nerve supply. How then does IV acetylcholine injection trigger profound vasodilatation and systemic hypotension?"
      },
      conceptCheck: {
        question: {
          tr: "Asetilkolinin damar endoteli varlığında gevşeme (vazodilatasyon), endotel sıyrıldığında ise kasılma (vazokonstriksiyon) yapmasının nedeni nedir?",
          ar: "ما السبب في تسبب الأسيتيل كولين بتوسع الأوعية بوجود البطانة السليمة، وانقباضها عند كشط بطانة الوعاء؟",
          en: "Why does acetylcholine induce vasodilatation in intact vessels, but paradoxical vasoconstriction in endothelium-denuded vessels?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Sağlam endoteldeki M3 reseptörleri Gq ile eNOS'u aktive edip Nitrik Oksit (NO) üretir; NO düz kasta cGMP ile gevşeme sağlar. Endotelsiz damarda ise doğrudan düz kas M3'ü kasılma yapar.",
              ar: "تنشط مستقبلات M3 البطانية إنزيم eNOS لإنتاج أكسيد النيتريك (NO) المرخي عبر cGMP؛ وعند غياب البطانة ينشط M3 العضلي المقلص مباشرة.",
              en: "Intact endothelial M3 activates eNOS via Gq to release Nitric Oxide (NO) and cGMP; denuded vessels expose smooth muscle M3 directly causing constriction."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Nobel ödüllü Furchgott keşfi! Damar lümenindeki endotel M3 uyarımıyla EDRF (Nitrik Oksit) salarak damarı gevşetir. Aterosklerozda endotel hasarlıysa asetilkolin damarı kasar!",
              ar: "اكتشاف فورشغوت الحائز على نوبل! تفرز البطانة السليمة NO المرخي للأوعية؛ أما في تصلب الشرايين التالف البطانة، فإن الأسيتيل كولين يقبض الوعاء بشكل شاذ.",
              en: "Furchgott's Nobel-winning discovery! Intact endothelium releases NO (EDRF) to dilate smooth muscle. In denuded or atherosclerotic vessels, ACh directly constricts smooth muscle!"
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Asetilkolin plazma kalsiyumunu kimyasal olarak bağlayıp damar lümenini boş bir vakuma çevirir.",
              ar: "يرسب الأسيتيل كولين كالسيوم البلازما كيميائياً ليحول لمعة الوعاء إلى فراغ هوائي.",
              en: "Acetylcholine chemically chelates plasma calcium, turning the vascular lumen into a hollow vacuum."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Asetilkolin şelat yapıcı bir ajan değildir; kalsiyum endotel hücresi içinde kalmodulin ve eNOS'u aktive etmek için artar.",
              ar: "غير صحيح: الأسيتيل كولين ليس مادة مخلبية؛ والكالسيوم يرتفع داخل خلايا البطانة لتفعيل إنزيم eNOS.",
              en: "Incorrect: Acetylcholine is not a calcium chelator; intracellular calcium rises within endothelial cells to activate eNOS."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Endotel hücreleri asetilkolini doğrudan noradrenalin sentezleyen bir fabrikaya dönüştürür.",
              ar: "تحول خلايا البطانة الأسيتيل كولين مباشرة إلى مصنع لاصطناع النورأدرينالين.",
              en: "Endothelial cells immediately convert acetylcholine into a biochemical factory synthesizing norepinephrine."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Noradrenalin sempatik bir vazokonstriktördür; vazodilatasyonun nedeni endotelden salınan gaz halindeki Nitrik Oksittir.",
              ar: "غير صحيح: النورأدرينالين مقبض وعائي ودي؛ والتوسع ناتج عن انتشار غاز أكسيد النيتريك (NO).",
              en: "Incorrect: Norepinephrine is a vasoconstrictor; vasodilatation is mediated by endothelial release of the gas Nitric Oxide (NO)."
            }
          }
        ]
      },
      technicalTerms: [
        {
          term: "Endotelyal Nitrik Oksit Sentaz",
          transcription: "Endothelial Nitric Oxide Synthase (eNOS)",
          definition: "Endotel hücrelerinde kalsiyum-kalmodulin ile aktive olan ve L-argininden nitrik oksit (NO) sentezleyen enzim.",
          ar: {
            term: "إنزيم سينثاز أكسيد النيتريك البطاني",
            transcription: "Endothelial Nitric Oxide Synthase (eNOS)",
            definition: "إنزيم ينشطه الكالسيوم في الخلايا البطانية ليصطنع غاز أكسيد النيتريك المرخي للعضلات الوعائية من الأرجينين."
          },
          en: {
            term: "eNOS",
            transcription: "Endothelial Nitric Oxide Synthase (eNOS)",
            definition: "The calcium-calmodulin activated endothelial enzyme that synthesizes the vasodilator Nitric Oxide (NO) from L-arginine."
          }
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Asetilkolin doğrudan kas hücresine mi yoksa önce damarın içini döşeyen endotel tabakasına mı çarpar?",
          ar: "هل يلامس الأسيتيل كولين خلايا العضلات مباشرة أم يصطدم أولاً بالطبقة البطانية المبطنة للوعاء؟",
          en: "Does circulating acetylcholine hit smooth muscle directly or first contact the inner endothelial lining?"
        },
        {
          tier: 2,
          tr: "Endotel hücreleri M3 reseptörleriyle uyarılınca hangi damar genişletici gazı salgılar? Nitrik Oksit (NO).",
          ar: "أي غاز موسع للأوعية تفرزه خلايا البطانة عند تنشيط مستقبلاتها M3؟ غاز أكسيد النيتريك (NO).",
          en: "Which vasodilator gas do endothelial cells release when stimulated via M3? Nitric Oxide (NO)."
        },
        {
          tier: 3,
          tr: "Endotel sağlamsa NO düz kasa geçip cGMP ile damarı gevşetir; endotel hasarlıysa asetilkolin damarı kasar.",
          ar: "مع بطانة سليمة يفرز NO ليرخي العضلات عبر cGMP؛ وبغياب البطانة تنقبض العضلات مباشرة.",
          en: "Intact endothelium produces NO to relax smooth muscle via cGMP; stripped endothelium constricts."
        }
      ]
    },

    // Step 7: Formal Explanation
    {
      id: "pharm-mod4-les2-step7",
      order: 7,
      stageIndex: 7,
      stage: "formal_explanation",
      type: "formal_explanation",
      title: {
        tr: "Biçimsel Açıklama: Kolinerjik Reseptör Kanonik Mimarisi",
        ar: "الشرح المنهجي: البنية المعتمدة للمستقبلات الكولينية",
        en: "Formal Explanation: Canonical Cholinoceptor Architecture"
      },
      prompt: {
        tr: "Kanonik kolinerjik sınıflamayı inceleyin: M1, M3, M5 (Gq ile IP3/DAG/Ca2+); M2, M4 (Gi ile cAMP düşüşü ve GIRK potasyum kanalı); Nn ve Nm (pentamerik ligand kapılı iyon kanalları).",
        ar: "تأمل التصنيف الكوليني المعتمد: M1 و M3 و M5 (Gq لرفع الكالسيوم)؛ و M2 و M4 (Gi لخفض cAMP وتفعيل GIRK)؛ و Nn و Nm (قنوات أيونية خماسية).",
        en: "Review canonical cholinoceptor classification: M1, M3, M5 (Gq/IP3/Ca2+); M2, M4 (Gi/lowering cAMP and opening GIRK); Nn and Nm (pentameric ligand-gated cation channels)."
      },
      conceptCheck: {
        question: {
          tr: "Parasempatik uyarım sırasında kalbin yavaşlamasını (bradikardi) ve tükürük salgısının artmasını sağlayan spesifik muskarinik reseptörler ve G-proteinleri hangileridir?",
          ar: "ما المستقبلات الموسكارينية وبروتينات G المسؤولة على التوالي عن إبطاء القلب وزيادة إفراز اللعاب؟",
          en: "Which specific muscarinic receptors and G-proteins mediate vagal bradycardia and profuse salivation, respectively?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Kalpte M2 reseptörü (Gi ile GIRK potasyum kanalı açar); tükürük bezinde M3 reseptörü (Gq ile hücre içi Ca2+ artırır).",
              ar: "في القلب مستقبل M2 (مقترن بـ Gi لفتح قنوات البوتاسيوم)؛ وفي الغدد اللعابية مستقبل M3 (مقترن بـ Gq لرفع الكالسيوم).",
              en: "In the heart M2 (Gi opens GIRK potassium channels); in salivary glands M3 (Gq elevates intracellular Ca2+)."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Kusursuz otonom eşleştirme! M2 sinoatriyal düğümde hiperpolarizasyonla nabzı düşürür; M3 ekzokrin bezlerde veziküler tükürük salgısını patlatır.",
              ar: "اقتران ذاتي متقن! يحدث M2 فرط استقطاب في العقدة الجيبية ليهدئ القلب؛ بينما يفجر M3 إفراز اللعاب في الغدد الإفرازية.",
              en: "Flawless autonomic mapping! M2 hyperpolarizes the SA node via GIRK to slow heart rate; M3 triggers exocrine salivation via calcium surge."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Kalpte M3 reseptörü (Gs ile cAMP artışı); tükürük bezinde M2 reseptörü (Gi ile enzimleri parçalar).",
              ar: "في القلب مستقبل M3 (يرفع cAMP عبر Gs)؛ وفي اللعاب مستقبل M2 (يفكك الإنزيمات عبر Gi).",
              en: "In the heart M3 (elevates cAMP via Gs); in salivary glands M2 (degrades enzymes via Gi)."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Muskarinik reseptörler Gs ile kenetlenmez. Kalpteki M2'dir ve Gi kullanır; bezlerdeki M3'tür ve Gq kullanır.",
              ar: "غير صحيح: لا تقترن مستقبلات المسكارين بـ Gs إطلاقاً. قلبياً يسود M2 عبر Gi؛ وغدياً يسود M3 عبر Gq.",
              en: "Incorrect: Muscarinic receptors never couple to Gs. Cardiac receptor is M2 (Gi); exocrine glandular receptor is M3 (Gq)."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Kalpte Nm reseptörü (sodyum kanalı); tükürük bezinde Nn reseptörü (kalsiyum pompası).",
              ar: "في القلب مستقبل Nm (قناة صوديوم)؛ وفي الغدد اللعابية مستقبل Nn (مضخة كالسيوم).",
              en: "In the heart Nm receptor (sodium channel); in salivary glands Nn receptor (calcium pump)."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Nm çizgili kas motor uç plağındadır, kalpte değil. Tükürük bezleri muskarinik M3 ile inerve edilir.",
              ar: "غير صحيح: يتواجد Nm في الصفيحة الحركية للعضلات الإرادية وليس بالقلب. والغدد اللعابية تنبهها مستقبلات M3 الموسكارينية.",
              en: "Incorrect: Nm is located at skeletal neuromuscular junctions, not the heart. Salivary secretion is driven by muscarinic M3."
            }
          }
        ]
      },
      technicalTerms: [
        {
          term: "GIRK Potasyum Kanalı",
          transcription: "G-Protein-Inwardly-Rectifying Potassium Channel (GIRK)",
          definition: "M2 reseptörünün Gi beta-gama alt birimi tarafından doğrudan açılarak SA düğümünü hiperpolarize eden potasyum kanalı.",
          ar: {
            term: "قنوات البوتاسيوم المقومة للداخل (GIRK)",
            transcription: "GIRK Potassium Channel",
            definition: "قنوات بوتاسيوم تفتحها تحت وحدة بيتا-غاما لبروتين Gi لتحدث فرط استقطاب في القلب وتباعد ضرباته."
          },
          en: {
            term: "GIRK Channel",
            transcription: "GIRK Potassium Channel",
            definition: "Inwardly-rectifying potassium channels opened directly by G-protein beta-gamma subunits following M2 receptor activation to slow heart rate."
          }
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Kalpte hangi muskarinik alt tip bulunur? M2. Bezlerde hangisi bulunur? M3.",
          ar: "ما النمط الموسكاريني القلبي؟ M2. وما النمط الغدي؟ M3.",
          en: "Which muscarinic subtype operates in the heart? M2. In glands? M3."
        },
        {
          tier: 2,
          tr: "M2 reseptörü inhibitör Gi ile; M3 reseptörü kalsiyum artıran Gq ile kenetlidir.",
          ar: "يقترن M2 ببروتين Gi المثبط؛ بينما يقترن M3 ببروتين Gq المحفز للكالسيوم.",
          en: "M2 couples to inhibitory Gi; M3 couples to calcium-mobilizing Gq."
        },
        {
          tier: 3,
          tr: "Eşleştirme: Kalp = M2 (Gi -> GIRK ile bradikardi); Tükürük = M3 (Gq -> IP3/Ca2+ ile sekresyon).",
          ar: "الارتباط الصحيح: القلب = M2 (بطء نبض بـ GIRK)؛ اللعاب = M3 (إفرازات غزيرة بالكالسيوم).",
          en: "Mapping: Heart = M2 (Gi -> GIRK bradycardia); Saliva = M3 (Gq -> IP3/Ca2+ exocrine secretion)."
        }
      ]
    },

    // Step 8: Concept Check
    {
      id: "pharm-mod4-les2-step8",
      order: 8,
      stageIndex: 8,
      stage: "concept_check",
      type: "concept_check",
      title: {
        tr: "Kavram Kontrolü: Tropikamid Göz Muayenesi",
        ar: "اختبار المفهوم: فحص قاع العين بقطرة تروبيكاميد",
        en: "Concept Check: Tropicamide Fundus Examination"
      },
      prompt: {
        tr: "Göz dibi muayenesi için hastaya muskarinik antagonist tropikamid damlatılıyor. İlaç gözde aynı anda hangi iki görsel ve pupil değişikliğini yaratır?",
        ar: "قطر طبيب عيون قطرة تروبيكاميد (مضاد مسكاريني) لفحص قاع العين. ما التغيران البصريان المتزامنان اللذان يحدثهما الدواء في العين؟",
        en: "An ophthalmologist instills the muscarinic antagonist tropicamide for fundus exam. Which two pupillary and visual changes occur simultaneously in the patient?"
      },
      conceptCheck: {
        question: {
          tr: "Muskarinik antagonistlerin göz içi kaslar üzerindeki farmakolojik etkileri hangi seçenekte eksiksiz doğru tanımlanmıştır?",
          ar: "ما الآثار الدوائية لحاصرات المسكارين على عضلات العين الداخلية بدقة؟",
          en: "What specific ocular muscle actions are produced by muscarinic receptor blockade in the eye?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Pupilla sfinkterini felç ederek midriyazis (göz bebeği büyümesi) ve silier kası gevşeterek siklopleji (yakın görme uyumu kaybı) yapar.",
              ar: "يشل العضلة العاصرة لحدقة العين مسبباً اتساع الحدقة (mydriasis)، ويرخي العضلة الهدبية مسبباً شلل المطابقة للرؤية القريبة (cycloplegia).",
              en: "Paralysis of pupillary sphincter causes mydriasis (dilated pupil), and relaxation of ciliary muscle causes cycloplegia (loss of near accommodation)."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Doğru klinik tespit! M3 sfinkter kası felç olunca sempatik radyal kas engelsiz göz bebeğini büyütür (midriyazis). M3 silier kas gevşeyince zonül lifleri gerilir, lens yassılaşır ve hasta yakını göremez (siklopleji).",
              ar: "تشخيص سريري دقيق! شلل العاصرة M3 يفسح المجال لتوسع الحدقة ودياً؛ وارتخاء العضلة الهدبية يسطح العدسة فيعجز المريض عن القراءة القريبة.",
              en: "Spot on! M3 blockade of pupillary sphincter allows unopposed sympathetic radial dilation (mydriasis). M3 blockade of ciliary muscle flattens the lens, causing loss of near accommodation (cycloplegia)."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Gözyaşı bezlerini aşırı uyararak sel gibi yaş akıtır ve göz bebeğini iğne deliği kadar küçültür (miyozis).",
              ar: "يفرط في إثارة الغدد الدمعية ليفيض الدمع كالسيل، ويضيق الحدقة كخرم الإبرة (تضيق الحدقة).",
              en: "It hyper-stimulates lacrimal glands causing profuse tearing and constricts pupils to pinpoints (miosis)."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Tam tersi! Tropikamid bir antagonisttir; gözyaşını kurutur ve göz bebeğini büyütür (midriyazis). Miyozis ve gözyaşı muskarinik agonistlerin etkisidir.",
              ar: "العكس تماماً! التروبيكاميد حاصر يجفف الدموع ويوسع الحدقة؛ بينما التضيق والإدماع من صفات المنبهات المسكارينية.",
              en: "The exact opposite! Tropicamide is an antagonist; it arrests lacrimation and dilates pupils (mydriasis). Pinpoint pupils and tearing indicate cholinergic agonists."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Kornea epiteli üzerinde katarakt tabakası oluşturarak hastanın retinasını ultraviyole ışınlarından korur.",
              ar: "يشكل طبقة عتامة كثيفة على القرنية لحماية الشبكية من الأشعة فوق البنفسجية.",
              en: "It deposits an opaque cataract layer across the cornea to shield the retina from ultraviolet light."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Tropikamid katarakt yapmaz; etkisi birkaç saat süren tamamen fonksiyonel bir otonomik kas blokajıdır.",
              ar: "غير صحيح: التروبيكاميد لا يسبب الساد؛ بل يحدث حصاراً وظيفياً عكوساً لعضلات العين يستمر ساعات.",
              en: "Incorrect: Tropicamide does not induce cataracts; it causes a transient, reversible pharmacological blockade lasting a few hours."
            }
          }
        ]
      },
      technicalTerms: [
        {
          term: "Siklopleji",
          transcription: "Cycloplegia",
          definition: "Silier kasın muskarinik blokajla felç olması sonucu gözün yakın nesnelere odaklanma (akomodasyon) yeteneğini kaybetmesi.",
          ar: {
            term: "شلل المطابقة البصرية",
            transcription: "Cycloplegia",
            definition: "فقدان العين قدرتها على التكيف لرؤية الأشياء القريبة نتيجة شلل العضلة الهدبية بحاصرات المسكارين."
          },
          en: {
            term: "Cycloplegia",
            transcription: "Cycloplegia",
            definition: "Paralysis of the ciliary muscle of the eye resulting in loss of accommodation for near vision."
          }
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Tropikamid bir muskarinik agonist mi, yoksa blokör (antagonist) müdür? Blokördür.",
          ar: "هل التروبيكاميد منبه أم حاصر مسكاريني؟ إنه حاصر (مضاد تنافسي).",
          en: "Is tropicamide a muscarinic agonist or blocker (antagonist)? It is an antagonist."
        },
        {
          tier: 2,
          tr: "Göz bebeğini büzen sfinkter kası bloke olursa göz bebeği ne olur? Büyür (midriyazis).",
          ar: "إذا شلت العضلة العاصرة المضيعة للحدقة، فماذا يحدث للحدقة؟ تتسع (mydriasis).",
          en: "If the pupillary sphincter muscle is paralyzed, what happens to the pupil? It dilates (mydriasis)."
        },
        {
          tier: 3,
          tr: "Sfinkter felci midriyazis (büyüme), silier kas felci ise siklopleji (yakını görememe) yapar.",
          ar: "شلل العاصرة يسبب اتساع الحدقة، وشلل الهدبية يسبب شلل المطابقة للرؤية القريبة.",
          en: "Sphincter paralysis yields mydriasis (dilation); ciliary paralysis yields cycloplegia (loss of near vision)."
        }
      ]
    },

    // Step 9: Application
    {
      id: "pharm-mod4-les2-step9",
      order: 9,
      stageIndex: 9,
      stage: "application",
      type: "clinical_vignette",
      title: {
        tr: "Klinik Uygulama: Tensilon Testi ile Kriz Ayrımı",
        ar: "تطبيق سريري: اختبار تينسيلون والتفريق بين الأزمتين",
        en: "Clinical Vignette: Tensilon Test Crisis Differentiation"
      },
      prompt: {
        tr: "Miyastenia Gravis hastası piridostigmin kullanırken ani solunum kası felciyle acile geliyor. Nörolog ultra kısa etkili edrofonyum (Tensilon) testi uyguluyor. Hastanın yanıtı nasıl yorumlanır?",
        ar: "مريض وهن عضلي وخيم يعالج ببيريدوستيغمين وصل للطوارئ بانهيار تنفسي. حقن الطبيب إدروفونيوم (تينسيلون) فائق قصر الأمد. كيف تفسر النتيجة؟",
        en: "A Myasthenia Gravis patient on pyridostigmine presents with acute respiratory paralysis. The neurologist injects ultra-short-acting edrophonium (Tensilon). How is the response interpreted?"
      },
      conceptCheck: {
        question: {
          tr: "Tensilon (edrofonyum) testi sonrasında miyastenik kriz ile kolinerjik kriz ayırıcı tanısı nasıl konur?",
          ar: "كيف يميز اختبار تينسيلون (إدروفونيوم) بين النوبة الوهنية والنوبة الكولينية بدقة؟",
          en: "How does the Tensilon (edrophonium) test definitively differentiate a Myasthenic Crisis from a Cholinergic Crisis?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Kas gücü anında düzelirse yetersiz dozdur (Miyastenik Kriz); güç daha da kötüleşir ve fasikülasyon artarsa aşırı dozdur (Kolinerjik Kriz).",
              ar: "إذا استعاد المريض قوته فوراً فالجرعة ناقصة (نوبة وهنية)؛ وإذا ساء الشلل وازدادت الرجفانات فالجرعة مفرطة (نوبة كولينية).",
              en: "If muscle strength immediately improves, it is undertreatment (Myasthenic Crisis); if paralysis worsens with fasciculations, it is overtreatment (Cholinergic Crisis)."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Hayati klinik ayrım! Miyastenik krizde kavşakta ACh azdır; edrofonyum ACh'yi artırıp hastayı kurtarır. Kolinerjik krizde ise zaten aşırı ACh depolarizasyon bloku yapmıştır; edrofonyum durumu daha da kötüleştirir!",
              ar: "فارق سريري منقذ للحياة! في الوهن يفتقر المشبك للأسيتيل كولين فينقذه الإدروفونيوم. أما في النوبة الكولينية فالإفراط شل المستقبلات استقطابياً، والإدروفونيوم يعمق الكارثة!",
              en: "Crucial lifesaving distinction! In myasthenic crisis, ACh is deficient; edrophonium restores strength. In cholinergic crisis, excessive ACh causes depolarizing block; edrophonium worsens the paralysis!"
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Edrofonyum kan şekerini ölçerek hastanın diyabetik komada olup olmadığını anlar.",
              ar: "يقيس الإدروفونيوم سكر الدم لتحديد ما إذا كان المريض في غيبوبة سكرية.",
              en: "Edrophonium measures blood glucose to determine if the patient is in a diabetic coma."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Edrofonyum glukoz ölçmez; o tersinir ve ultra kısa etkili bir asetilkolinesteraz enzim inhibitörüdür.",
              ar: "غير صحيح: الإدروفونيوم لا يقيس السكر؛ بل هو مثبط فائق قصر الأمد لإنزيم الأسيتيل كولينستراز.",
              en: "Incorrect: Edrophonium does not assess glucose; it is a reversible, ultra-short-acting acetylcholinesterase inhibitor."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Her iki durumda da kas gücü değişmez; edrofonyum yalnızca idrarın rengini maviye boyar.",
              ar: "في الحالتين لا تتغير القوة؛ وينحصر أثر الإدروفونيوم في تلوين البول بالأزرق.",
              en: "In both conditions muscle strength remains identical; edrophonium solely turns urine bright blue."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Edrofonyum dramatik motor yanıtlar üretir; idrar boyaması tıbbi bir distraktördür.",
              ar: "غير صحيح: يحدث الإدروفونيوم استجابات عضلية جذرية حاسمة ولا علاقة له بتلوين البول.",
              en: "Incorrect: Edrophonium produces dramatic, diagnostic neuromuscular alterations; urine discoloration is an invented distractor."
            }
          }
        ]
      },
      technicalTerms: [
        {
          term: "Tensilon Testi",
          transcription: "Tensilon Test",
          definition: "Ultra kısa etkili kolinesteraz inhibitörü edrofonyum ile miyastenik kriz ve kolinerjik kriz ayrımını sağlayan tanısal test.",
          ar: {
            term: "اختبار تينسيلون",
            transcription: "Tensilon Test",
            definition: "اختبار تشخيصي يحقن فيه الإدروفونيوم فائق قصر الأمد للتفريق بين النوبة الوهنية ونوبة فرط الدواء الكولينية."
          },
          en: {
            term: "Tensilon Test",
            transcription: "Tensilon Test",
            definition: "A rapid diagnostic challenge using ultra-short-acting edrophonium to differentiate myasthenic weakness from cholinergic depolarizing crisis."
          }
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Edrofonyum sinaptik aralıktaki asetilkolin miktarını birkaç dakikalığına hızla artırır.",
          ar: "يرفع الإدروفونيوم تركيز الأسيتيل كولين في المشبك العصبي العضلي لعدة دقائق.",
          en: "Edrophonium rapidly elevates acetylcholine in the synaptic cleft for several minutes."
        },
        {
          tier: 2,
          tr: "Sorun asetilkolin azlığıysa (miyasteni) kas anında toparlar ve güçlenir.",
          ar: "إذا كانت المشكلة نقصاً في النواقل (أزمة وهنية) تستعيد العضلات قوتها فوراً.",
          en: "If the issue is transmitter deficiency (myasthenia), muscle strength immediately surges."
        },
        {
          tier: 3,
          tr: "Düzelme = Miyastenik kriz (ilacı artır); Kötüleşme = Kolinerjik kriz (ilacı kes, atropin hazırla).",
          ar: "تحسن = نوبة وهنية (زد الجرعة)؛ تدهور = نوبة كولينية (أوقف الدواء فوراً وحضر الأتروبين).",
          en: "Improvement = Myasthenic crisis (increase dose); Worsening = Cholinergic crisis (stop drug, give atropine)."
        }
      ]
    },

    // Step 10: Retrieval
    {
      id: "pharm-mod4-les2-step10",
      order: 10,
      stageIndex: 10,
      stage: "retrieval",
      type: "retrieval",
      title: {
        tr: "Hafıza Yoklama: Kolinesteraz Reaktivatörü",
        ar: "استرجاع معرفي: منشط إنزيم الكولينستراز",
        en: "Retrieval: Cholinesterase Reactivator Antidote"
      },
      prompt: {
        tr: "Organofosfat zehirlenmesinde fosforillenerek kilitlenen asetilkolinesteraz enzimini yaşlanma (aging) gerçekleşmeden önce reaktive edebilen özgül kimyasal panzehir hangisidir?",
        ar: "ما هو الترياق الكيميائي النوعي القادر على فك ارتباط الفوسفور العضوي وإعادة تنشيط إنزيم الكولينستراز قبل حدوث التعمير (aging)؟",
        en: "Which specific pharmacological antidote reactivates organophosphate-phosphorylated acetylcholinesterase before irreversible chemical aging occurs?"
      },
      conceptCheck: {
        question: {
          tr: "Asetilkolinesteraz enzimini fosfattan nükleofilik saldırıyla kurtaran doğru panzehir ve etki mekanizması hangisidir?",
          ar: "ما الترياق الصحيح وآلية هجومه النكليوفيلي لتحرير إنزيم الكولينستراز من الفوسفور؟",
          en: "Which antidote and molecular nucleophilic mechanism successfully regenerates functional acetylcholinesterase?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Pralidoksim (2-PAM); oksim grubuyla enzimin aktif serin kalıntısına bağlı fosfor atomuna nükleofilik saldırı yaparak enzimi serbest bırakır.",
              ar: "براليدوكسيم (2-PAM)؛ حيث تشن مجموعة الأوكسيم هجوماً نكليوفيلياً على ذرة الفوسفور لتحرير ثمالة السيرين في الإنزيم.",
              en: "Pralidoxime (2-PAM); its oxime group mounts a nucleophilic attack on the organophosphate phosphorus, regenerating active serine."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Kusursuz toksikolojik hafıza! Pralidoksim kimyasal bir enzim reaktivatörüdür. Ancak organofosfat alkil grubunu kaybedip 'yaşlandığında' (aging) bu bağ kırılamaz hale gelir.",
              ar: "استرجاع سمومي متقن! البراليدوكسيم منشط إنزيمي كيميائي؛ لكنه يفشل إذا تأخر العلاج وخضع المعقد للتعمير (aging).",
              en: "Flawless toxicological retrieval! Pralidoxime is a chemical enzyme regenerator. However, once the phosphate loses an alkyl group (aging), regeneration becomes impossible."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Atropin; fosfat molekülünü mideye doğru çekerek dışkıyla atılmasını sağlayan bir nükleofildir.",
              ar: "الأتروبين؛ حيث يسحب جزيئات الفوسفات نحو المعدة ليتم إطراحها مع البراز.",
              en: "Atropine; a nucleophile that pulls phosphate molecules into the gastric lumen for fecal excretion."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Kritik yanılgı! Atropin enzime dokunamaz ve nükleofil değildir; o sadece muskarinik reseptörleri yarışmalı bloke eder.",
              ar: "مغالطة خطيرة! الأتروبين لا يلمس الإنزيم وليس كاشفاً نكليوفيلياً؛ إنه يحصر مستقبلات المسكارين فقط.",
              en: "Critical misconception! Atropine cannot regenerate the enzyme and possesses no nucleophilic activity; it solely blocks muscarinic receptors."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Neostigmin; kovalent bağı kesen bir antibiyotiktir.",
              ar: "نيوستيغمين؛ مضاد حيوي يقطع الرابطة التساهمية.",
              en: "Neostigmine; an antibiotic that cleaves covalent bonds."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Neostigmin bir antibiyotik değil, karbamat yapılı bir kolinesteraz inhibitörüdür; verilirse enzimi daha da kilitler!",
              ar: "غير صحيح: النيوستيغمين مثبط للكولينستراز وليس مضاداً حيوياً؛ وإعطاؤه هنا يعمق التسمم!",
              en: "Incorrect: Neostigmine is a carbamate AChE inhibitor; giving it in organophosphate poisoning worsens inhibition!"
            }
          }
        ]
      },
      technicalTerms: [
        {
          term: "Kolinesteraz Reaktivatörü",
          transcription: "Cholinesterase Reactivator",
          definition: "Oksim grubu içeren ve organofosfatla inaktive olmuş asetilkolinesterazı nükleofilik reaksiyonla serbest bırakan ajan (2-PAM).",
          ar: {
            term: "منشط الكولينستراز",
            transcription: "Cholinesterase Reactivator",
            definition: "مركب يحمل مجموعة أوكسيم يهاجم الفوسفور نكليوفيلياً لإحياء إنزيم الكولينستراز المشلول (مثل 2-PAM)."
          },
          en: {
            term: "Oxime Reactivator",
            transcription: "Cholinesterase Reactivator",
            definition: "An oxime-containing nucleophilic antidote (e.g. 2-PAM) that regenerates organophosphate-inhibited acetylcholinesterase."
          }
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Atropin reseptörü korur; enzimi kim kurtarır? Oksim yapısındaki reaktivatör.",
          ar: "الأتروبين يحمي المستقبل؛ فمن يحرر الإنزيم نفسه؟ ترياق يحمل مجموعة أوكسيم.",
          en: "Atropine shields the receptor; what rescues the enzyme itself? An oxime reactivator."
        },
        {
          tier: 2,
          tr: "Pralidoksim (2-PAM) fosfor atomuna saldırarak serin kalıntısını serbest bırakır.",
          ar: "يهاجم براليدوكسيم (2-PAM) ذرة الفوسفور ليفصلها عن الإنزيم.",
          en: "Pralidoxime (2-PAM) attacks the electrophilic phosphorus to liberate the catalytic serine."
        },
        {
          tier: 3,
          tr: "Panzehir Pralidoksimdir (2-PAM); yaşlanma (aging) gerçekleşmeden önce ilk saatlerde verilmelidir.",
          ar: "الترياق هو براليدوكسيم (2-PAM)؛ ويجب إعطاؤه في الساعات الأولى قبل حدوث التعمير (aging).",
          en: "The antidote is Pralidoxime (2-PAM); it must be administered early before chemical aging locks the enzyme."
        }
      ]
    },

    // Step 11: Connection
    {
      id: "pharm-mod4-les2-step11",
      order: 11,
      stageIndex: 11,
      stage: "connection",
      type: "connection",
      title: {
        tr: "Bütünsel Bağlantı: Botulinum vs Tetanoz Nörotoksinleri",
        ar: "الربط الشامل: سم البوتولينوم مقابل سم الكزاز",
        en: "Holistic Connection: Botulinum vs Tetanus Neurotoxins"
      },
      prompt: {
        tr: "Hem Botulinum hem Tetanoz toksinleri sinaptik vezikül SNARE proteinlerini kesen çinkolu endopeptidazlardır. Peki nasıl olur da Botulinum gevşek felç yaparken, Tetanoz tam tersine spastik kasılma krizine yol açar?",
        ar: "كلا سمي البوتولينوم والكزاز يقطعان بروتينات SNARE بنفس الآلية. لماذا يسبب البوتولينوم شللاً رخواً، بينما يسبب الكزاز تشنجاً كزازياً عاتياً؟",
        en: "Both Botulinum and Tetanus toxins cleave SNARE proteins. Why then does Botulinum produce flaccid paralysis, while Tetanus provokes violent spastic convulsions?"
      },
      conceptCheck: {
        question: {
          tr: "Botulinum ve Tetanoz toksinlerinin moleküler hedefleri aynı olduğu halde zıt klinik tablolar (gevşek vs spastik felç) yaratmalarının nedeni nedir?",
          ar: "ما السبب في تسبب سمي البوتولينوم والكزاز في مظهرين متناقضين (شلل رخو مقابل شلل تشنجي) رغم تشابه آليتهما؟",
          en: "What cellular targeting difference causes Botulinum and Tetanus toxins to produce opposite clinical states (flaccid vs spastic paralysis)?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Botulinum periferik motor sinir ucunda kalarak asetilkolin salınımını durdurur (gevşek felç); Tetanoz ise retrograd aksonal taşınmayla omurilikteki inhibitör internöronlara (GABA/glisin) gidip freni keser (spastik kasılma).",
              ar: "يستقر البوتولينوم محيطياً فيمنع الأسيتيل كولين (شلل رخو)؛ بينما يهاجر الكزاز رجوعياً للنخاع الشوكي ليقطع كبح GABA والغليسين (تشنج كزازي).",
              en: "Botulinum acts locally at peripheral motor terminals blocking ACh (flaccid); Tetanus undergoes retrograde transport to spinal cord, disabling inhibitory GABA/glycine interneurons (spastic)."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Kusursuz nörofarmakolojik kavrayış! Her iki toksin de sinaptobrevin/SNARE keser. Ancak Tetanoz omurilik inhibitör internöronlarını (Renshaw hücreleri) felç ettiği için motor nöronlar durmaksızın ateşlenir ve spastik kriz patlar.",
              ar: "إدراك دوائي عصبي بديع! كلا السمّين يقصان SNARE، لكن الكزاز يشل عصبونات رينشو الكابحة في النخاع الشوكي، فتفرط الأعصاب الحركية في إطلاق النبضات المتشنجة.",
              en: "Superb neuropharmacological synthesis! Both cleave synaptobrevin/SNAREs. But Tetanus travels retrogradely to spinal Renshaw interneurons, cutting the GABA/glycine brake to unleash continuous motor spasm."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Botulinum toksini kas liflerine kalsiyum doldurur; Tetanoz toksini ise kalsiyumu tamamen buharlaştırır.",
              ar: "يملأ سم البوتولينوم العضلات بالكالسيوم، بينما يبخر سم الكزاز الكالسيوم تماماً.",
              en: "Botulinum toxin floods muscle fibers with calcium, whereas Tetanus toxin evaporates all calcium."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Toksinler kalsiyumu buharlaştırmaz. Mekanizma nörotransmitter veziküllerinin presinaptik füzyonunu yöneten SNARE kompleksinin kesilmesidir.",
              ar: "غير صحيح: السموم لا تبخر الكالسيوم؛ الآلية جزيئية بحتة تخص قطع بروتينات التحام الحويصلات العصبية.",
              en: "Incorrect: Toxins do not alter elemental calcium; they enzymatically cleave the SNARE exocytosis machinery."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Botulinum yalnızca kadınlarda, Tetanoz ise yalnızca erkeklerde aktiftir.",
              ar: "البوتولينوم فعال فقط لدى الإناث، بينما الكزاز فعال فقط لدى الذكور.",
              en: "Botulinum toxin is exclusively active in females, while Tetanus toxin affects only males."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Absürt yanılgı: Her iki toksin de tüm insanlarda ve omurgalılarda eşit derecede ölümcüldür.",
              ar: "خطأ فادح: كلا الذيفانين شديدا السمية وقاتلان لجميع البشر بغض النظر عن الجنس.",
              en: "Absurd misconception: Both neurotoxins exhibit lethal potency in all humans regardless of sex."
            }
          }
        ]
      },
      technicalTerms: [
        {
          term: "Retrograd Aksonal Taşınma",
          transcription: "Retrograde Axonal Transport",
          definition: "Moleküllerin veya toksinlerin (Tetanoz) akson ucundan nöron gövdesine ve santral sinir sistemine dynein motor proteinleriyle geriye doğru taşınması.",
          ar: {
            term: "النقل المحواري الرجوعي",
            transcription: "Retrograde Axonal Transport",
            definition: "حركة الجزيئات أو الذيفانات على طول المحور العصبي من المحيط نحو جسم الخلية العصبية والجهاز المركزي عبر بروتينات الداينين."
          },
          en: {
            term: "Retrograde Transport",
            transcription: "Retrograde Axonal Transport",
            definition: "The dynein-driven movement of molecules or toxins from peripheral axon terminals back to the neuronal soma and CNS."
          }
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Botulinum periferde motor sinir ucunda mı kalır, yoksa omuriliğe mi tırmanır?",
          ar: "هل يستقر البوتولينوم في الوصل المحيطي، أم يهاجر صعوداً إلى النخاع الشوكي؟",
          en: "Does Botulinum remain at the peripheral junction, or does it migrate to the spinal cord?"
        },
        {
          tier: 2,
          tr: "Tetanoz toksini geriye doğru (retrograd) omuriliğe tırmanır ve inhibitör internöronları (GABA/glisin) susturur.",
          ar: "يهاجر سم الكزاز رجوعياً إلى النخاع الشوكي ويسكت العصبونات الكابحة (GABA والغليسين).",
          en: "Tetanus toxin migrates retrogradely to the spinal cord, silencing inhibitory interneurons (GABA/glycine)."
        },
        {
          tier: 3,
          tr: "Botulinum asetilkolini keser (gevşek felç); Tetanoz inhibitör freni keser (spastik kasılma).",
          ar: "البوتولينوم يقطع الأسيتيل كولين (شلل رخو)؛ والكزاز يقطع الفرامل المثبطة (تشنج كزازي).",
          en: "Botulinum cuts acetylcholine (flaccid); Tetanus cuts the inhibitory brake (spastic rigidity)."
        }
      ]
    },

    // Step 12: Mastery Check
    {
      id: "pharm-mod4-les2-step12",
      order: 12,
      stageIndex: 12,
      stage: "mastery_check",
      type: "mastery_check",
      title: {
        tr: "Ustalık Sınavı: Antikolinerjik Toksidrom ve Fizostigmin Kurtarması",
        ar: "اختبار الإتقان: متلازمة التسمم بمضادات الكولين والإنقاذ بفيزوستيغمين",
        en: "Mastery Check: Anticholinergic Toxidrome & Physostigmine Rescue"
      },
      prompt: {
        tr: "Bilinmeyen zehirlenme: Ateş 40°C, kıpkırmızı kuru cilt, aşırı ağız kuruluğu, fiks dilate pupiller, idrar retansiyonu ve ajite hezeyan. Toksidromu, reseptör mekanizmasını ve kan-beyin bariyerini geçen panzehiri seçin.",
        ar: "تسمم مجهول: حرارة 40°C، جلد جاف أحمر، جفاف فم شديد، حدقات متسعة ثابتة، احتباس بول وهذيان هائج. حدد المتلازمة والآلية والترياق العابر للحاجز الدماغي.",
        en: "Unknown poisoning: Fever 40°C, flushed dry skin, extreme xerostomia, fixed dilated pupils, urinary retention, agitated delirium. Identify toxidrome, mechanism, and the blood-brain barrier-penetrating antidote."
      },
      conceptCheck: {
        question: {
          tr: "Bu klinik vakanın toksidromu, bloke olan reseptör grubu ve santral deliryumu düzeltebilecek doğru panzehir hangisidir?",
          ar: "ما هي متلازمة هذا المريض، والمستقبلات المحصورة، والترياق القادر على عبور الدماغ وعكس الهذيان؟",
          en: "What is this patient's toxidrome, blocked receptor class, and the correct antidote capable of crossing into the CNS?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Antikolinerjik (antimuskarinik) toksidrom; M1-M5 reseptör blokajı; panzehir tersiyer amin yapısındaki Fizostigmindir (kan-beyin bariyerini geçer).",
              ar: "متلازمة مضادات الكولين؛ حصر مستقبلات M1-M5؛ والترياق هو فيزوستيغمين (أمين ثلاثي يعبر الحاجز الدموي الدماغي).",
              en: "Anticholinergic (antimuscarinic) toxidrome; M1-M5 blockade; antidote is tertiary amine Physostigmine (crosses the blood-brain barrier)."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Kusursuz toksikoloji ustalığı! Klasik mnemoni: 'Yarasa gibi kör, deli gibi çılgın, pancar gibi kırmızı, çöl gibi kuru'. Neostigmin kuaterner olduğu için beyne geçemez ve deliryumu çözemez; tersiyer fizostigmin şarttır.",
              ar: "إتقان سمومي رائع! العلامات الكلاسيكية: أعمى، مجنون، أحمر، جاف. النيوستيغمين مركب رباعي لا يعبر للمخ؛ لذا يشترط الفيزوستيغمين الثلاثي لعكس الهذيان.",
              en: "Complete toxicological mastery! Classic rule: 'Blind as a bat, mad as a hatter, red as a beet, dry as a bone'. Quaternary neostigmine fails in the CNS; tertiary physostigmine is mandatory."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Kolinerjik toksidrom; aşırı nikotinik uyarım; panzehir yüksek doz asetilkolin infüzyonudur.",
              ar: "متلازمة كولينية؛ فرط تنبيه نيكوتيني؛ والترياق هو تسريب جرعات عالية من الأسيتيل كولين.",
              en: "Cholinergic toxidrome; excessive nicotinic stimulation; antidote is high-dose acetylcholine infusion."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Tam tersi! Hasta kupkuru (terleme, tükürük sıfır). Kolinerjik krizde hasta salya sümük sırılsıklam olur (SLUDGE). Asetilkolin vermek hastayı öldürür.",
              ar: "العكس تماماً! المريض جاف تماماً؛ بينما التسمم الكوليني يغرق المريض بالإفرازات (SLUDGE). حقن الأسيتيل كولين مميت هنا.",
              en: "The exact opposite! The patient is bone-dry (zero sweat, saliva). Cholinergic crisis floods secretions (SLUDGE). Infusing acetylcholine would be fatal."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Opioid toksidromu; mu-reseptör aşırı aktivasyonu; panzehir intravenöz naloksondur.",
              ar: "متلازمة أفيونية؛ فرط تنشيط مستقبلات mu؛ والترياق هو نالوكسون وريدياً.",
              en: "Opioid toxidrome; mu-receptor hyper-activation; antidote is intravenous naloxone."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Opioid zehirlenmesinde göz bebekleri iğne ucu kadar küçülür (miyozis) ve solunum depresyonu olur; fiks midriyazis, kuru cilt ve ateş antikolinerjiktir.",
              ar: "غير صحيح: التسمم الأفيوني يتميز بحدقات دقيقة كخرم الإبرة وتثبيط تنفسي؛ بينما الحرارة والحدقات المتسعة علامة لمضادات الكولين.",
              en: "Incorrect: Opioid overdose features pinpoint pupils (miosis) and respiratory depression; dilated pupils, flushed skin, and hyperthermia indicate anticholinergics."
            }
          }
        ]
      },
      technicalTerms: [
        {
          term: "Antikolinerjik Toksidrom",
          transcription: "Anticholinergic Toxidrome",
          definition: "Muskarinik reseptörlerin bloke olmasıyla ortaya çıkan hipertermi, kuru cilt, midriyazis, taşikardi, üriner retansiyon ve hezeyan tablosu.",
          ar: {
            term: "متلازمة مضادات الكولين السمومية",
            transcription: "Anticholinergic Toxidrome",
            definition: "المظاهر السريرية للتسمم بحاصرات المسكارين: جفاف الجلد والأغشية، توسع الحدقات، تسرع القلب، احتباس البول والهذيان الحاد."
          },
          en: {
            term: "Anticholinergic Toxidrome",
            transcription: "Anticholinergic Toxidrome",
            definition: "The clinical constellation of antimuscarinic poisoning: hyperthermia, flushed dry skin, mydriasis, tachycardia, urinary retention, and delirium."
          }
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Hasta kupkuru, cildi kırmızı, ateşi yüksek ve göz bebekleri sonuna kadar açık (midriyazis).",
          ar: "المريض جاف تماماً، جلده محمر، حرارته مرتفعة، وحدقاته متسعة كلياً.",
          en: "The patient is bone-dry, flushed red, febrile, with fully dilated pupils (mydriasis)."
        },
        {
          tier: 2,
          tr: "Bu klasik antikolinerjik (antimuskarinik) zehirlenmedir (örn. atropin, skopolamin).",
          ar: "هذا تسمم كلاسيكي بمضادات المسكارين (مثل الأتروبين أو الداتورة).",
          en: "This is a classic antimuscarinic poisoning (e.g. atropine, belladonna alkaloids)."
        },
        {
          tier: 3,
          tr: "Santral deliryumu çözmek için kan-beyin bariyerini geçen tersiyer amin Fizostigmin verilmelidir.",
          ar: "لعكس الهذيان الدماغي، يشترط إعطاء فيزوستيغمين (أمين ثلاثي غير متأين يعبر للمخ).",
          en: "To reverse central delirium, tertiary amine Physostigmine must be given because it crosses the BBB."
        }
      ]
    }
  ]
};

const targetPath = path.resolve(__dirname, '../courses/pharmacology/lessons/lesson-08.json');
fs.writeFileSync(targetPath, JSON.stringify(lesson08, null, 2), 'utf8');
console.log('Successfully written lesson-08.json to:', targetPath);
