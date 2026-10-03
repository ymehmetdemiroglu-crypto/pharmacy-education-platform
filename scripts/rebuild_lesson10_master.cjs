const fs = require('fs');

const lesson10 = {
  "$schema": "../../../packages/platform/schema/lesson.schema.json",
  "id": "mc-mod5-les2",
  "courseId": "medchem",
  "moduleId": "mc-mod-05",
  "title": {
    "tr": "Faz II Konjugasyonu: Glukuronidasyon, Sülfasyon ve Glutatyon Detoksifikasyonu",
    "ar": "المرحلة الثانية: مسارات الاقتران بالجلوكورونيد والكبريتات والجلوتاثيون",
    "en": "Phase II Conjugation: Glucuronidation, Sulfation & Glutathione Pathways"
  },
  "order": 2,
  "access": "free",
  "objective": {
    "tr": "Faz II konjugasyon yolaklarını (UGT/UDPGA, SULT/PAPS, NAT-2/Asetil-KoA, GST/GSH) ve parasetamol hepatotoksisitesinin moleküler mekanizmasını analiz etmek.",
    "ar": "تحليل مسارات الاقتران الحيوي من المرحلة الثانية والآلية الجزيئية لسمية الباراسيتامول الكبدية وطرق الوقاية بـ NAC.",
    "en": "Analyze Phase II biosynthetic conjugation pathways (UGT, SULT, NAT, GST) and the molecular mechanisms of paracetamol hepatotoxicity and N-acetylcysteine rescue."
  },
  "description": {
    "tr": "Faz II konjugasyon reaksiyonlarının enzim kinetiğini, kofaktör donörlerini, parasetamol hepatotoksisitesi mekanizmasını ve farmakogenetik asetilasyon polimorfizmini inceleme.",
    "ar": "استقصاء حركية إنزيمات الاقتران في المرحلة الثانية، وكواشفها المانحة، وآلية سمية الباراسيتامول الكبدية والتباين الوراثي للأستلة.",
    "en": "Examine Phase II conjugation kinetics, cofactor donors, paracetamol hepatotoxicity and antidote rescue mechanisms, and pharmacogenetic acetylation polymorphism."
  },
  "misconceptions": [
    {
      "tr": "Tüm Faz II konjugasyon reaksiyonlarının polariteyi ve suda çözünürlüğü mutlaka artırdığı yanılgısı (Asetilasyon polariteyi azaltır ve kristalüri yapar!).",
      "ar": "الظن الخاطئ بأن جميع تفاعلات الاقتران تزيد من قطبية الدواء وذوبانيته (الأستلة تقلل القطبية وتسبب البيلة البلورية!).",
      "en": "The misconception that all Phase II conjugations increase water solubility (Acetylation actually decreases polarity, causing sulfadiazine crystalluria!)."
    },
    {
      "tr": "Parasetamol aşırı dozunda karaciğer hasarının parasetamolün kendisi tarafından oluşturulduğu düşüncesi (Gerçek toksin CYP2E1'in ürettiği elektrofil NAPQI'dir).",
      "ar": "الاعتقاد الخاطئ بأن الباراسيتامول نفسه يدمر الكبد (السم الفعلي هو NAPQI الناتج عن CYP2E1 عند نفاد مخزون الجلوتاثيون).",
      "en": "The misconception that paracetamol itself directly destroys hepatocytes, ignoring CYP2E1 bioactivation to the electrophilic NAPQI quinoneimine."
    },
    {
      "tr": "Bütün Faz II transferaz enzimlerinin sitozolde bulunduğu düşüncesi (UGT enzimi mikrozomaldir, endoplazmik retikulum membranına gömülüdür).",
      "ar": "الاعتقاد الخاطئ بوجود جميع إنزيمات الاقتران في السيتوزول (إنزيم UGT ميكروزومي مدمج في غشاء الشبكة الإندوبلازمية).",
      "en": "The false assumption that all Phase II transferases reside in the cytosol, missing that UGT is an integral endoplasmic reticulum membrane enzyme."
    }
  ],
  "sources": [
    { "file": "İlaç metabolizması-2026.pdf", "page": 2 },
    { "file": "İlaç metabolizması-2026.pdf", "page": 4 },
    { "file": "İlaç metabolizması-2026.pdf", "page": 31 },
    { "file": "İlaç metabolizması-2026.pdf", "page": 32 },
    { "file": "İlaç metabolizması-2026.pdf", "page": 33 },
    { "file": "İlaç metabolizması-2026.pdf", "page": 35 },
    { "file": "İlaç metabolizması-2026.pdf", "page": 36 },
    { "file": "İlaç metabolizması-2026.pdf", "page": 37 },
    { "file": "İlaç metabolizması-2026.pdf", "page": 40 },
    { "file": "İlaç metabolizması-2026.pdf", "page": 44 }
  ],
  "citations": [
    {
      "id": "CIT-MC10-01",
      "book": "Foye's Principles of Medicinal Chemistry",
      "edition": "8th ed.",
      "topic": "Phase II Conjugation Reactions: Glucuronidation, Sulfation, and Glutathione Trapping",
      "chapter": "Chapter 4",
      "page": "149-182",
      "status": "verified"
    },
    {
      "id": "CIT-MC10-02",
      "book": "Wilson and Gisvold's Textbook of Organic Medicinal and Pharmaceutical Chemistry",
      "edition": "12th ed.",
      "topic": "Conjugation Pathways and Metabolic Toxicities",
      "chapter": "Chapter 3",
      "page": "90-124",
      "status": "verified"
    }
  ],
  "spacedReviewCards": [
    {
      "cardId": "mc-mod5-les2-card1",
      "courseId": "medchem",
      "drugOrConcept": "Glukuronidasyon Kofaktörü ve Lokalizasyonu",
      "prompt": "UGT enzimlerinin kullandığı aktif kofaktör nedir ve enzim nerede yerleşiktir?",
      "answer": "Kofaktör UDP-glukuronik asittir (UDPGA); UGT enzimi endoplazmik retikulum membranında (mikrozomal) yerleşiktir.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "mc-mod5-les2-card2",
      "courseId": "medchem",
      "drugOrConcept": "Asetilasyon İstisnası ve Kristalüri",
      "prompt": "Hangi Faz II konjugasyonu polariteyi azaltır ve hangi klinik riski doğurur?",
      "answer": "NAT aracılı N-asetilasyon polariteyi azaltır; sülfadiazin asetil türevi asidik idrarda çökerek kristalüriye yol açar.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "mc-mod5-les2-card3",
      "courseId": "medchem",
      "drugOrConcept": "Parasetamol Toksisitesi ve NAC Antidotu",
      "prompt": "Parasetamol aşırı dozunda hangi reaktif toksin oluşur ve N-asetilsistein (NAC) nasıl tedavi eder?",
      "answer": "CYP2E1 toksik elektrofil NAPQI üretir; NAC hücresel glutatyon (GSH) sentezini yenileyerek NAPQI'yi detoksifiye eder.",
      "box": 1,
      "intervalDays": 1
    }
  ],
  "translations": {
    "tr": { "title": "Faz II Konjugasyonu: Glukuronidasyon, Sülfasyon ve Glutatyon Detoksifikasyonu" },
    "ar": { "title": "المرحلة الثانية: مسارات الاقتران بالجلوكورونيد والكبريتات والجلوتاثيون" }
  },
  "steps": [
    {
      "id": "mc-mod5-les2-step-01",
      "stage": "hook",
      "stageIndex": 1,
      "type": "predict_reveal",
      "title": {
        "tr": "Parasetamol Paradoksu: Terapötik Doz vs Aşırı Doz",
        "ar": "مفارقة الباراسيتامول: الجرعة العلاجية مقابل المفرطة",
        "en": "The Paracetamol Paradox: Therapeutic vs Overdose"
      },
      "prompt": {
        "tr": "Terapötik 500 mg parasetamol zararsızca atılırken, 10 gramlık yüksek doz neden karaciğer hücrelerinde öldürücü fulminan nekroza yol açar?",
        "ar": "لماذا يطرح 500 ملغ من الباراسيتامول بأمان بينما تسبب جرعة 10 غرامات تنخراً كبدياً صاعقاً ومميتاً؟",
        "en": "Why does a therapeutic 500 mg dose of paracetamol clear harmlessly, whereas an acute 10 g overdose causes fatal centrilobular hepatic necrosis?"
      },
      "predictThenReveal": true,
      "config": {
        "revealedOutcome": "Terapötik dozda güvenli Faz II yolları (%60 glukuronid, %35 sülfat) ilacı hızla atar; aşırı dozda bu yollar doyar ve CYP2E1 toksik NAPQI üretir.",
        "options": []
      },
      "technicalTerms": [
        { "term": "Faz II metabolizması", "arContext": "المرحلة الثانية من الاستقلاب" },
        { "term": "NAPQI", "arContext": "المستقلب السام للباراسيتامول" }
      ],
      "hints": [
        {
          "tr": "Terapötik dozda baskın olan Faz II enzimlerinin (UGT ve SULT) kapasite sınırını düşünün.",
          "ar": "فكر في حدود سعة إنزيمات المرحلة الثانية (UGT و SULT) السائدة بالجرعة العلاجية.",
          "en": "Consider the capacity saturation threshold of the predominant Phase II enzymes (UGT and SULT)."
        },
        {
          "tr": "Kapasite aşılınca fazla moleküllerin CYP2E1 oksidasyonuna yönelerek hangi elektrofilik toksini oluşturduğunu hatırlayın.",
          "ar": "تذكر أي وسيط إلكتروفيلي سام يتشكل عند تحول الفائض إلى أكسدة CYP2E1.",
          "en": "Recall which reactive electrophile forms when excess drug spills into the minor CYP2E1 pathway."
        },
        {
          "tr": "Sülfasyon ve glukuronidasyon doyar; fazla parasetamol CYP2E1 ile reaktif NAPQI'ye dönüşür, hepatik glutatyon (GSH) tükenir.",
          "ar": "يتشبع الاقتران؛ يتحول الفائض بـ CYP2E1 إلى NAPQI السام الذي يستنزف مخزون الجلوتاثيون الكبدي.",
          "en": "High-capacity conjugation saturates; excess shunts to CYP2E1 forming toxic NAPQI which depletes protective hepatic glutathione."
        }
      ],
      "conceptCheck": {
        "options": [
          {
            "id": "opt-1a",
            "text": {
              "tr": "Karaciğerdeki UGT ve SULT enzimleri doyar, CYP2E1 toksik NAPQI üretir ve hücresel koruyucu glutatyon (GSH) rezervi tamamen tükenir.",
              "ar": "تتشبع مسارات UGT و SULT، وينتج CYP2E1 وسيط NAPQI السام الذي يستنزف مخزون الجلوتاثيون الواقي.",
              "en": "Hepatic UGT and SULT pathways saturate; CYP2E1 generates toxic electrophile NAPQI, entirely exhausting cellular glutathione (GSH) defenses."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kusursuz klinik biyokimya analizi! Slayt 35-36: Dozun %95'i normalde UGT ve SULT ile atılır; aşırı dozda bu doyunca CYP2E1 toksik NAPQI üretir ve GSH tükenir.",
              "ar": "تحليل كيميائي حيوي متقن! شريحة 35-36: يطرح 95% طبيعياً بـ UGT و SULT؛ بالجرعة المفرطة يشبع المسار ويتراكم NAPQI.",
              "en": "Flawless biochemical deduction! Slides 35-36: Normally 95% clears via UGT/SULT; saturation shunts drug to CYP2E1, exhausting GSH."
            }
          },
          {
            "id": "opt-1b",
            "text": {
              "tr": "Parasetamol gastrointestinal kanalda mide asidiyle birleşerek doğrudan hidroklorik aside dönüşür ve midenin delinmesine yol açar.",
              "ar": "يتحد الباراسيتامول في المعدة مع الحمض ليتحول إلى حمض هيدروكلوريك مركز يسبب انثقاب جدار المعدة.",
              "en": "Paracetamol combines with gastric acid in the stomach to convert into concentrated hydrochloric acid, perforating the stomach."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Mide asidi yanılgısı: Parasetamol korozif asit üretmez veya mide delinmesi yapmaz; toksisite mide ile değil, karaciğerdeki hepatosit nekrozu ile ilgilidir (Slayt 35).",
              "ar": "مغالطة حموضة المعدة: الباراسيتامول لا يولد حمضاً معدياً ولا يثقب المعدة؛ السمية كبدية ناجمة عن تنخر الخلايا الكبدية.",
              "en": "Gastric acidity fallacy: Paracetamol does not generate corrosive acids; toxicity is strictly centrilobular hepatocyte necrosis."
            }
          },
          {
            "id": "opt-1c",
            "text": {
              "tr": "Parasetamol doğrudan hepatosit çekirdeğindeki DNA'ya bağlanarak tüm RNA polimeraz enzimlerini 5 saniyede durdurur.",
              "ar": "يرتبط الباراسيتامول تساهمياً بالحمض النووي DNA للخلايا الكبدية ويوقف التعبير الجيني كلياً في 5 ثوانٍ.",
              "en": "Paracetamol covalently binds hepatocyte nuclear DNA directly, shutting down all RNA polymerases in 5 seconds."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Doğrudan DNA hasarı yanılgısı: Parasetamol nükleer DNA'ya doğrudan saldırmaz; toksisiteyi yapan ara ürün NAPQI'dir ve hedefi mitokondriyal protein tiyolleridir (Slayt 35-36).",
              "ar": "مغالطة الارتباط المباشر بالـ DNA: الجزيء الأصلي لا يرتبط بالـ DNA؛ السمية يسببها NAPQI بمهاجمة مجموعات الثيول بالبروتينات الميتوكوندرية.",
              "en": "Direct DNA binding fallacy: Parent paracetamol is inert to DNA; reactive intermediate NAPQI covalently attacks mitochondrial protein sulfhydryls."
            }
          }
        ]
      }
    },
    {
      "id": "mc-mod5-les2-step-02",
      "stage": "question",
      "stageIndex": 2,
      "type": "question",
      "title": {
        "tr": "Enzim Kinetiği: SULT vs UGT Kapasite Farkı",
        "ar": "حركية الإنزيمات: فارق السعة بين SULT و UGT",
        "en": "Enzyme Kinetics: SULT vs UGT Capacity Divergence"
      },
      "prompt": {
        "tr": "Düşük terapötik dozda sülfasyon (SULT) baskınken, doz arttığında glukuronidasyon (UGT) yolunun ana metabolizma yolu haline gelmesinin biyokimyasal nedeni nedir?",
        "ar": "بينما تسود الكبرتة (SULT) في الجرعات المنخفضة، ما هو السبب الكيميائي الحيوي لسيادة الجلوكورونيد (UGT) مع زيادة الجرعة؟",
        "en": "Why does sulfation (SULT) dominate at low therapeutic doses, whereas glucuronidation (UGT) becomes the primary pathway as drug concentration escalates?"
      },
      "config": {
        "options": []
      },
      "technicalTerms": [
        { "term": "enzim kapasitesi", "arContext": "سعة الإنزيم التحفيزية" },
        { "term": "kofaktör havuzu", "arContext": "مخزون العامل المساعد الخلوي" }
      ],
      "hints": [
        {
          "tr": "İki enzimin substrata olan ilgisini (afinite / Km) ve hücre içi kofaktör havuzlarının (PAPS vs UDPGA) bolluğunu karşılaştırın.",
          "ar": "قارن بين ألفة الإنزيمين للركيزة ووفرة مخزون العوامل المساعدة (PAPS مقابل UDPGA).",
          "en": "Compare the substrate affinity (Km) and cellular donor cofactor pool abundance (PAPS vs UDPGA)."
        },
        {
          "tr": "Sülfotransferaz yüksek afiniteye sahiptir ancak sınırlı PAPS kofaktörü nedeniyle hızla doyar.",
          "ar": "يمتلك SULT ألفة عالية جداً لكنه يشبع بسرعة بسبب محدودية مخزون كاشف PAPS.",
          "en": "Sulfotransferase possesses high affinity but saturates rapidly due to limited intracellular PAPS cofactor."
        },
        {
          "tr": "SULT yüksek afiniteli/düşük kapasitelidir; UGT ise düşük afiniteli/yüksek kapasitelidir (bol miktarda UDPGA glukoz rezervi vardır).",
          "ar": "SULT عالي الألفة منخفض السعة؛ بينما UGT عالي السعة لوفرة مخزون UDPGA المشتق من الجلوكوز.",
          "en": "SULT is high-affinity/low-capacity (saturable PAPS); UGT is high-capacity backed by abundant UDPGA glucose stores."
        }
      ],
      "conceptCheck": {
        "options": [
          {
            "id": "opt-2a",
            "text": {
              "tr": "SULT yüksek afiniteli / düşük kapasitelidir (PAPS kofaktörü hızla tükenir); UGT ise düşük afiniteli / yüksek kapasitelidir (devasa UDPGA havuzuna sahiptir).",
              "ar": "إنزيم SULT عالي الألفة منخفض السعة (ينفد PAPS سريعاً)؛ بينما UGT عالي السعة بفضل مخزون UDPGA الهائل.",
              "en": "SULT is high-affinity but low-capacity (PAPS depletes rapidly); UGT is high-capacity, sustained by an abundant UDPGA pool."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kusursuz enzim kinetiği! Slayt 32 ve 33: SULT fenollere yüksek afinite gösterir ama kofaktör PAPS sınırlıdır; UGT ise yüksek dozları karşılayabilen ana yoldur.",
              "ar": "حركية إنزيمية متقنة! شريحة 32 و 33: SULT عالي الألفة لكن PAPS محدود؛ بينما UGT هو المسار عالي السعة الحاسم.",
              "en": "Flawless enzyme kinetics! Slides 32 & 33: SULT has high affinity but limited PAPS; UGT provides the massive high-capacity clearance."
            }
          },
          {
            "id": "opt-2b",
            "text": {
              "tr": "UGT ve SULT enzimlerinin kinetik kapasiteleri ve kofaktör havuzları tamamen eşittir; ayrım sadece ilacın verildiği saate bağlıdır.",
              "ar": "السعة الحركية ومخزون العوامل المساعدة لـ UGT و SULT متطابقان؛ والفارق يرتبط فقط بوقت تناول الدواء.",
              "en": "UGT and SULT have identical capacities and cofactor pools; divergence depends exclusively on time of administration."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Eşit kapasite yanılgısı: İki yolak eşit değildir; sülfatlama kofaktörü PAPS hücrede hızla tükenir, oysa glukuronidasyon yüksek kapasiteli ana detoksifikasyon yoludur.",
              "ar": "مغالطة تساوي السعة: المساران غير متكافئين؛ ينفد PAPS بسرعة بينما يمتلك الجلوكورونيد سعة تطهير هائلة.",
              "en": "Equal capacity fallacy: The pathways are asymmetric; PAPS is rapidly exhausted, while UGT serves as the high-capacity clearance sink."
            }
          },
          {
            "id": "opt-2c",
            "text": {
              "tr": "Sülfasyon sadece yağda çözünen gaz anesteziklerde gerçekleşir; katı oral ilaçlar sülfatlanamaz.",
              "ar": "تحدث الكبرتة حصراً في المخدرات الغازية المنحلة بالدسم، ولا يمكن أن تخضع الأدوية الصلبة الفموية للكبرتة.",
              "en": "Sulfation occurs exclusively with lipid-soluble volatile anesthetics; solid oral pharmaceuticals cannot be sulfated."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Faz kısıtlaması yanılgısı: SULT enzimleri fenolik -OH, alifatik alkol ve amin taşıyan katı oral ilaçları hızla sülfat esterlerine dönüştürür (Slayt 32).",
              "ar": "مغالطة الحالة الفيزيائية: إنزيمات SULT تؤستر هيدروكسيلات الفينول والألكيل في الأدوية الصلبة بفاعلية عالية.",
              "en": "Physical state myth: Cytosolic SULTs avidly sulfate phenolic -OH and amine groups on standard solid oral xenobiotics."
            }
          }
        ]
      }
    },
    {
      "id": "mc-mod5-les2-step-03",
      "stage": "intuition",
      "stageIndex": 3,
      "type": "intuition",
      "title": {
        "tr": "Kapasite Doygunluğu ve Toksik Şant",
        "ar": "تشبع السعة والتحول السام",
        "en": "Capacity Saturation & The Toxic Shunt"
      },
      "prompt": {
        "tr": "SULT tek şeritli hızlı gişe, UGT ise 20 kapılı devasa limandır. Parasetamol dozu artıp SULT gişesi tıkandığında moleküller nereye yönelir?",
        "ar": "SULT هو ممر سريع مفرد، و UGT ميناء عملاق ذو 20 بوابة. عند زيادة جرعة الباراسيتامول واختناق SULT، أين تتجه الجزيئات؟",
        "en": "Think of SULT as a fast single-lane toll and UGT as a 20-gate cargo terminal. When excess drug saturates SULT, where do molecules flow?"
      },
      "config": {
        "options": []
      },
      "technicalTerms": [
        { "term": "metabolik şant", "arContext": "التحويل الاستقلابي البديل" },
        { "term": "doygunluk kinetiği", "arContext": "حركية التشبع الإنزيمي" }
      ],
      "hints": [
        {
          "tr": "Dar kapasiteli yol tıkandığında moleküllerin geniş kapasiteli UGT limanına akacağını düşünün.",
          "ar": "فكر في أن الجزيئات تتدفق نحو ميناء UGT واسع السعة عند انسداد الممر الضيق.",
          "en": "Consider that molecules divert to the expansive 20-gate UGT terminal once the single lane bottlenecks."
        },
        {
          "tr": "Her iki Faz II yolu da kapasiteyi aştığında, arta kalan moleküllerin hangi Faz I oksidasyon yoluna şant olacağını hatırlayın.",
          "ar": "تذكر أي مسار أكسدة من المرحلة الأولى يستقبل الفائض عند تجاوز سعة كلا المسارين.",
          "en": "Recall which minor Phase I pathway absorbs the overflow when even high-capacity Phase II saturates."
        },
        {
          "tr": "SULT doyar; trafik önce yüksek kapasiteli UGT'ye, her ikisi de aşırı dozda doyunca toksik CYP2E1 oksidasyonuna akar.",
          "ar": "يشبع SULT فيتدفق للجلوكورونيد؛ وعند الجرعة المفرطة يفيض إلى أكسدة CYP2E1 السامة.",
          "en": "SULT saturates, shunting traffic to UGT; when massive overdose overwhelms both, spillover enters toxic CYP2E1."
        }
      ],
      "conceptCheck": {
        "options": [
          {
            "id": "opt-3a",
            "text": {
              "tr": "SULT tek şeridi hızla doyuma ulaşır; kalan trafik önce devasa UGT yoluna, aşırı dozda her ikisi de doyunca toksik CYP2E1 yoluna akar.",
              "ar": "يشبع مسار SULT الضيق سريعاً؛ فيتدفق الحمل إلى UGT، وعند الجرعة المفرطة يفيض نحو مسار CYP2E1 السام.",
              "en": "SULT saturates rapidly; flux diverts to high-capacity UGT, and upon massive overdose overload, spills into toxic CYP2E1."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Mükemmel zihinsel model! Slayt 35: Terapötik dozda SULT ve UGT yükü paylaşır; aşırı dozda kapasite aşılınca toksik CYP2E1 şantı başlar.",
              "ar": "نموذج ذهني متألق! شريحة 35: في الجرعة العادية يتقاسم SULT و UGT العبء؛ وبالجرعة السامة يفيض الفائض إلى CYP2E1.",
              "en": "Superb conceptual model! Slide 35: Therapeutic doses clear via SULT and UGT; severe overdose saturates both, triggering the toxic shunt."
            }
          },
          {
            "id": "opt-3b",
            "text": {
              "tr": "SULT doyuma ulaştığında moleküller metabolize olmadan doğrudan kan dolaşımında birikir ve beyne sızar.",
              "ar": "عند تشبع SULT، تتراكم الجزيئات دون استقلاب في الدورة الدموية وتتسرب للدماغ.",
              "en": "When SULT saturates, molecules fail to metabolize at all, accumulating passively in blood and crossing into the brain."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Alternatif yolak göz ardı etme yanılgısı: SULT doysa bile yüksek kapasiteli UGT devreye girerek ilacın büyük kısmını güvenle temizler (Slayt 35).",
              "ar": "مغالطة إغفال المسارات البديلة: حتى مع تشبع SULT، يتدخل إنزيم UGT عالي السعة لتطهير معظم الجرعة بأمان.",
              "en": "Alternative pathway omission: UGT provides a massive backup reservoir, safely clearing the majority of drug even after SULT saturates."
            }
          },
          {
            "id": "opt-3c",
            "text": {
              "tr": "SULT doyuma ulaştığında karaciğer hücresi ilacı safra kanalına fırlatarak bağırsaktan tekrar geri emer.",
              "ar": "عند تشبع SULT، تطرح الخلية الكبدية الدواء في الصفراء ليعاد امتصاصه معوياً.",
              "en": "Upon SULT saturation, hepatocytes expel intact drug into bile to be endlessly reabsorbed via enterohepatic cycling."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Safraya kaçış yanılgısı: İlaç doygunlukta doğrudan safraya kaçmaz; karaciğerdeki UGT ve CYP enzimleri metabolizmayı yürütmeye devam eder.",
              "ar": "مغالطة الهروب الصفراوي: لا يهرب الدواء للصفراء مباشرة بل تتولى إنزيمات UGT و CYP استقلابه.",
              "en": "Biliary escape fallacy: Drugs do not bypass metabolism into bile; hepatic UGT and CYP enzymes continue competitive clearance."
            }
          }
        ]
      }
    },
    {
      "id": "mc-mod5-les2-step-04",
      "stage": "visual_explanation",
      "stageIndex": 4,
      "type": "visual_explanation",
      "title": {
        "tr": "Asetilasyon İstisnası: Polarite Azalması ve Kristalüri",
        "ar": "استثناء الأستلة: نقص القطبية والبيلة البلورية",
        "en": "The Acetylation Paradox: Reduced Polarity & Crystalluria"
      },
      "prompt": {
        "tr": "Diğer Faz II reaksiyonları ilacı aşırı polar yaparken, NAT aracılı N-asetilasyon neden molekülün polaritesini azaltarak böbrekte kristalüriye yol açar?",
        "ar": "بينما تجعل تفاعلات المرحلة الثانية الأخرى الدواء قطبياً، لماذا تنقص أستلة NAT القطبية وتسبب البيلة البلورية؟",
        "en": "While other Phase II pathways drastically increase polarity, why does NAT-mediated N-acetylation decrease polarity and precipitate renal crystalluria?"
      },
      "config": {
        "options": []
      },
      "technicalTerms": [
        { "term": "kristalüri", "arContext": "تشكل بلورات في البول" },
        { "term": "NAT-2", "arContext": "إنزيم N-أسيتيل ترانسفيراز" }
      ],
      "hints": [
        {
          "tr": "Aromatik bir primer aminin (-NH2) asetil-KoA ile nötr bir amite (-NHCOCH3) dönüştürülmesini düşünün.",
          "ar": "فكر في تحول الأمين العطري الأولي (-NH2) إلى أميد معتدل (-NHCOCH3) بواسطة أسيتيل-CoA.",
          "en": "Consider the conversion of a basic aromatic primary amine (-NH2) into a neutral amide (-NHCOCH3)."
        },
        {
          "tr": "Amid azotunun rezonans nedeniyle bazik iyonlaşma yeteneğini kaybettiğini ve asidik idrarda çözünemediğini hatırlayın.",
          "ar": "تذكر أن نيتروجين الأميد يفقد قدرته على التأين القاعدي بالرنين ويعجز عن الذوبان في البول الحمضي.",
          "en": "Recall that amide resonance quenches basic protonation, eliminating aqueous solubility in acidic urine."
        },
        {
          "tr": "Asetilasyon bazik amini nötr amite çevirir; iyonlaşabilirliği siler, lipofiliteti artırır ve asidik idrarda çökerek kristalüri yapar.",
          "ar": "تحول الأستلة الأمين إلى أميد معتدل؛ مما يلغي التأين ويزيد محبة الدهون مسبباً ترسب البلورات في البول الحمضي.",
          "en": "Acetylation converts basic amines to neutral amides; loss of ionization increases lipophilicity, precipitating in acid urine."
        }
      ],
      "conceptCheck": {
        "options": [
          {
            "id": "opt-4a",
            "text": {
              "tr": "Asetilasyon bazik primer amini nötr amite çevirir; iyonlaşabilirliği silerek lipofiliteti artırır ve asidik idrarda kristalüriye yol açar.",
              "ar": "تحول الأستلة الأمين القاعدي إلى أميد معتدل؛ مما يلغي التأين ويزيد محبة الدهون مسبباً ترسب بلورات في البول الحمضي.",
              "en": "Acetylation masks the basic primary amine into a neutral amide, eliminating ionization and provoking crystalluria in acidic urine."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kritik sınav bilgisi! Slayt 2 ve 31: Faz II'nin büyük istisnası asetilasyondur. İlacı daha apolar yapar ve sülfadiazin kristalürisinin temel nedenidir.",
              "ar": "معلومة امتحانية جوهرية! شريحة 2 و 31: الاستثناء الأكبر في المرحلة الثانية هو الأستلة؛ إذ تقلل القطبية وتسبب البيلة البلورية.",
              "en": "Crucial exam insight! Slides 2 & 31: The major Phase II exception is acetylation. It renders metabolites less polar, causing crystalluria."
            }
          },
          {
            "id": "opt-4b",
            "text": {
              "tr": "Asetilasyon moleküle 10 adet negatif yük katarak polariteyi 1000 kat artırır.",
              "ar": "تضيف الأستلة 10 شحنات سالبة إلى الجزيء فتضاعف القطبية 1000 مرة.",
              "en": "Acetylation attaches 10 permanent negative charges, multiplying polarity by 1000-fold."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Yük artışı yanılgısı: Asetil grubu (-COCH3) yüksüz ve nötrdür; tam aksine bazik primer aminin pozitif yük alabilme yeteneğini yok ederek molekülü daha apolar yapar (Slayt 2 ve 31).",
              "ar": "مغالطة زيادة الشحنة: مجموعة الأسيتيل (-COCH3) معتدلة؛ وتلغي شحنة الأمين مما يجعل المركب أقل قطبية.",
              "en": "Charge multiplication myth: The acetyl group (-COCH3) is neutral; it extinguishes basic ionization, rendering the molecule less polar."
            }
          },
          {
            "id": "opt-4c",
            "text": {
              "tr": "Asetilasyon reaksiyonu molekülün molekül ağırlığını 1000 Dalton'a çıkararak böbrek filtrasyonunu durdurur.",
              "ar": "يرفع تفاعل الأستلة الوزن الجزيئي إلى 1000 دالتون مما يوقف الترشيح الكبيبي الكبدي كلياً.",
              "en": "Acetylation expands molecular weight to over 1000 Daltons, completely arresting glomerular filtration."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Aşırı kütle artışı yanılgısı: Asetilasyon moleküle sadece 42 Dalton (bir asetil grubu) ekler; böbrek filtrasyonunu durdurmaz ama asidik tübüler idrarda çözünürlüğü düşürür.",
              "ar": "مغالطة التضخم الكتلي: تضيف الأستلة 42 دالتون فقط؛ ولا توقف الترشيح بل تقلل الانحلال في البول الحمضي.",
              "en": "Massive mass fallacy: Acetylation adds merely 42 Daltons; it does not block filtration, but drops aqueous solubility in tubular fluid."
            }
          }
        ]
      }
    },
    {
      "id": "mc-mod5-les2-step-05",
      "stage": "interactive_artifact",
      "stageIndex": 5,
      "type": "metabolism_map",
      "widgetType": "MetabolismMap",
      "title": {
        "tr": "İnteraktif Metabolizma Haritası: Parasetamol Toksisite Kavşağı",
        "ar": "خريطة الاستقلاب التفاعلية: مفترق طرق سمية الباراسيتامول",
        "en": "Interactive Metabolism Map: Paracetamol Toxicity Junction"
      },
      "prompt": {
        "tr": "Parasetamol aşırı dozunda karaciğer nekrozundan sorumlu reaktif elektrofilik NAPQI ara ürününü üreten toksik oksidasyon yolunu seçin.",
        "ar": "حدد المسار التأكسدي السام المسؤول عن توليد وسيط NAPQI الإلكتروفيلي المسبب للتنخر الكبدي عند الجرعة المفرطة.",
        "en": "Identify the toxic oxidative pathway generating reactive electrophile NAPQI, the causative agent of acute hepatic necrosis in paracetamol overdose."
      },
      "widget": {
        "type": "MetabolismMap",
        "config": {
          "drugName": "Paracetamol (Asetaminofen)",
          "prompt": "Parasetamol aşırı dozunda karaciğer nekrozu yapan reaktif NAPQI yolunu haritada seçin.",
          "moleculeSvgDescription": "p-Asetamidofenol çekirdek yapısı ve Faz I / Faz II yolakları",
          "sites": [
            {
              "id": "site_cyp2e1",
              "label": "N-Hidroksilasyon / NAPQI",
              "x": 100,
              "y": 50,
              "enzyme": "CYP2E1 / CYP3A4",
              "phase": "Phase I",
              "reactionType": "Oksidasyon / Biyoaktivasyon",
              "metaboliteOutcome": "Aşırı dozda GSH tükenince karaciğer nekrozu yapan reaktif elektrofil N-asetil-p-benzokinonimin (NAPQI).",
              "toxicityFlag": "toxic",
              "isTargetSite": true
            },
            {
              "id": "site_ugt",
              "label": "4-O-Glukuronidasyon",
              "x": 310,
              "y": 50,
              "enzyme": "UGT1A6 / UGT1A9",
              "phase": "Phase II",
              "reactionType": "Glukuronid Konjugasyonu",
              "metaboliteOutcome": "Terapötik dozun %50-60'ını oluşturan zararsız ve suda çok çözünen parasetamol-O-glukuronit.",
              "toxicityFlag": "non_toxic",
              "isTargetSite": false
            },
            {
              "id": "site_sult",
              "label": "4-O-Sülfasyon",
              "x": 200,
              "y": 160,
              "enzyme": "SULT1A1",
              "phase": "Phase II",
              "reactionType": "Sülfat Konjugasyonu",
              "metaboliteOutcome": "Terapötik dozun %25-35'ini oluşturan, yetişkinde hızla doyan yüksek afiniteli sülfat esteri.",
              "toxicityFlag": "non_toxic",
              "isTargetSite": false
            },
            {
              "id": "site_gst",
              "label": "Glutatyon Konjugasyonu",
              "x": 100,
              "y": 160,
              "enzyme": "GST",
              "phase": "Phase II",
              "reactionType": "Merkaptürik Asit Yolak",
              "metaboliteOutcome": "Normal dozda oluşan az miktardaki NAPQI'yi yakalayarak zararsız merkaptürik asit türevi halinde idrara verir.",
              "toxicityFlag": "non_toxic",
              "isTargetSite": false
            }
          ],
          "source": {
            "file": "İlaç metabolizması-2026.pdf",
            "page": 35
          },
          "explanation": "Parasetamol aşırı dozunda (>10 g) yüksek kapasiteli UGT ve SULT yolakları doyar. Fazla ilaç CYP2E1 ile oksitlenerek elektrofilik NAPQI'ye dönüşür. Hepatik glutatyon (GSH) depoları %70'in üzerinde tükenince serbest NAPQI hepatosit mitokondri proteinlerine kovalent bağlanarak fulminan nekroz yapar."
        }
      },
      "config": {
        "drugName": "Paracetamol (Asetaminofen)",
        "prompt": "Parasetamol aşırı dozunda karaciğer nekrozu yapan reaktif NAPQI yolunu haritada seçin.",
        "moleculeSvgDescription": "p-Asetamidofenol çekirdek yapısı ve Faz I / Faz II yolakları",
        "sites": [
          {
            "id": "site_cyp2e1",
            "label": "N-Hidroksilasyon / NAPQI",
            "x": 100,
            "y": 50,
            "enzyme": "CYP2E1 / CYP3A4",
            "phase": "Phase I",
            "reactionType": "Oksidasyon / Biyoaktivasyon",
            "metaboliteOutcome": "Aşırı dozda GSH tükenince karaciğer nekrozu yapan reaktif elektrofil N-asetil-p-benzokinonimin (NAPQI).",
            "toxicityFlag": "toxic",
            "isTargetSite": true
          },
          {
            "id": "site_ugt",
            "label": "4-O-Glukuronidasyon",
            "x": 310,
            "y": 50,
            "enzyme": "UGT1A6 / UGT1A9",
            "phase": "Phase II",
            "reactionType": "Glukuronid Konjugasyonu",
            "metaboliteOutcome": "Terapötik dozun %50-60'ını oluşturan zararsız ve suda çok çözünen parasetamol-O-glukuronit.",
            "toxicityFlag": "non_toxic",
            "isTargetSite": false
          },
          {
            "id": "site_sult",
            "label": "4-O-Sülfasyon",
            "x": 200,
            "y": 160,
            "enzyme": "SULT1A1",
            "phase": "Phase II",
            "reactionType": "Sülfat Konjugasyonu",
            "metaboliteOutcome": "Terapötik dozun %25-35'ini oluşturan, yetişkinde hızla doyan yüksek afiniteli sülfat esteri.",
            "toxicityFlag": "non_toxic",
            "isTargetSite": false
          },
          {
            "id": "site_gst",
            "label": "Glutatyon Konjugasyonu",
            "x": 100,
            "y": 160,
            "enzyme": "GST",
            "phase": "Phase II",
            "reactionType": "Merkaptürik Asit Yolak",
            "metaboliteOutcome": "Normal dozda oluşan az miktardaki NAPQI'yi yakalayarak zararsız merkaptürik asit türevi halinde idrara verir.",
            "toxicityFlag": "non_toxic",
            "isTargetSite": false
          }
        ],
        "source": {
          "file": "İlaç metabolizması-2026.pdf",
          "page": 35
        },
        "explanation": "Parasetamol aşırı dozunda (>10 g) yüksek kapasiteli UGT ve SULT yolakları doyar. Fazla ilaç CYP2E1 ile oksitlenerek elektrofilik NAPQI'ye dönüşür. Hepatik glutatyon (GSH) depoları %70'in üzerinde tükenince serbest NAPQI hepatosit mitokondri proteinlerine kovalent bağlanarak fulminan nekroz yapar."
      },
      "technicalTerms": [
        { "term": "CYP2E1", "arContext": "إنزيم الأكسدة المحفز للسمية" },
        { "term": "glutatyon", "arContext": "مضاد الأكسدة الخلوي GSH" }
      ],
      "hints": [
        {
          "tr": "Karaciğer hasarını yapan metabolitin Faz I CYP enzimi tarafından oluşturulan toksik bir kinonimin olduğunu hatırlayın.",
          "ar": "تذكر أن المستقلب المسبب للسمية هو كينون إيمين يتشكل بإنزيم CYP من المرحلة الأولى.",
          "en": "Remember that the necrosis-causing agent is a reactive quinoneimine produced by a Phase I CYP enzyme."
        },
        {
          "tr": "Glukuronidasyon ve sülfasyon detoksifiye edici güvenli Faz II yollarıdır; hedef bölge toksik etiketli CYP yoludur.",
          "ar": "مسارات الجلوكورونيد والكبريتات آمنة ومزيلة للسمية؛ الموقع المستهدف يحمل علامة سام من CYP.",
          "en": "Glucuronidation and sulfation are protective non-toxic Phase II pathways; the target is the toxic CYP route."
        },
        {
          "tr": "CYP2E1 / CYP3A4 N-hidroksilasyon bölgesi NAPQI üretir; bu reaktif elektrofil hedef toksisite basamağıdır.",
          "ar": "موقع N-هدرلة CYP2E1 ينتج NAPQI وهو الوسيط المستهدف المسبب للسمية.",
          "en": "The CYP2E1/CYP3A4 N-hydroxylation site generates NAPQI, representing the critical target bioactivation site."
        }
      ]
    },
    {
      "id": "mc-mod5-les2-step-06",
      "stage": "guided_discovery",
      "stageIndex": 6,
      "type": "guided_discovery",
      "title": {
        "tr": "Glutatyon İşlenmesi: Merkaptürik Asit Yolak",
        "ar": "معالجة الجلوتاثيون: مسار حمض المركابتوريك",
        "en": "Glutathione Processing: The Mercapturic Acid Pathway"
      },
      "prompt": {
        "tr": "Toksik bir elektrofil glutatyon (GSH: Glu-Cys-Gly) ile yakalandığında oluşan 3 amino asitlik devasa konjugat, idrarla atılmak için hangi adımlarla budanır?",
        "ar": "عند اصطياد وسيط سام بالجلوتاثيون (GSH)، كيف يفكك الجسم هذا المقترن الضخم خطوة بخطوة ليطرحه بوليًا؟",
        "en": "When a toxic electrophile is trapped by glutathione (Glu-Cys-Gly), through which sequential enzymatic steps is this bulky adduct trimmed for urinary excretion?"
      },
      "config": {
        "options": []
      },
      "technicalTerms": [
        { "term": "merkaptürik asit", "arContext": "حمض مركابتوريك (المشتق البولي النهائي)" },
        { "term": "peptidaz", "arContext": "إنزيمات تفكيك الروابط الببتيدية" }
      ],
      "hints": [
        {
          "tr": "Glutatyonun bir tripeptit (gamma-glutamil-sisteinil-glisin) olduğunu ve vücudun amino asitleri geri kazanmak istediğini hatırlayın.",
          "ar": "تذكر أن الجلوتاثيون ثلاثي ببتيد (غلوتاميل-سيستينيل-غليسين) والجسم يسعى لاستعادة الأحماض الأمينية الثمينة.",
          "en": "Recall that glutathione is a tripeptide and the body recycles valuable glutamate and glycine residues."
        },
        {
          "tr": "Sisteinil konjugatı kaldıktan sonra son basamakta hangi Faz II transferaz enzimi devreye girer?",
          "ar": "بعد بقاء مشتق السيستين، أي إنزيم ناقل أسيتيل يتدخل في الخطوة الأخيرة لتكوين حمض المركابتوريك؟",
          "en": "After peptidases cleave glutamate and glycine, which enzyme acetylates the remaining cysteine conjugate?"
        },
        {
          "tr": "Önce glutamat (gGT) ardından glisin (dipeptidaz) koparılır; kalan sistein NAT ile N-asetillenerek polar merkaptürik asit olarak idrarla atılır.",
          "ar": "يُفصل الغلوتامات ثم الغليسين؛ ثم يؤستل السيستين بـ NAT ليطرح كحمض مركابتوريك في البول.",
          "en": "Glutamate and glycine are cleaved sequentially; the residual cysteine is N-acetylated into an excreted mercapturic acid."
        }
      ],
      "conceptCheck": {
        "options": [
          {
            "id": "opt-6a",
            "text": {
              "tr": "Önce glutamat (gGT) ardından glisin (dipeptidaz) koparılır; kalan sistein konjugatı NAT ile N-asetillenerek polar merkaptürik asit türevi halinde idrarla atılır.",
              "ar": "يُفصل الغلوتامات بـ gGT ثم الغليسين بإنزيم الببتيداز، ثم يؤستل السيستين بـ NAT ليطرح كحمض مركابتوريك في البول.",
              "en": "Glutamate (gGT) and glycine (dipeptidase) are sequentially cleaved; residual cysteine is N-acetylated by NAT into urinary mercapturic acid."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kusursuz metabolizma bilgisi! Slayt 36: GSH konjugatları idrarda doğrudan görülmez; gama-glutamil transpeptidaz ve asetilasyon ile merkaptürik asite dönüşür.",
              "ar": "معرفة استقلابية متكاملة! شريحة 36: لا تُطرح مقترنات GSH مباشرة بل تتحول بإنزيمات الببتيداز والأستلة إلى حمض المركابتوريك.",
              "en": "Flawless pathway tracking! Slide 36: Intact GSH conjugates are degraded by peptidases and acetylated into urinary mercapturic acids."
            }
          },
          {
            "id": "opt-6b",
            "text": {
              "tr": "Tripeptit hiç parçalanmaz; doğrudan hepatik ven yoluyla kalbe pompalanıp ter bezleriyle dışarı atılır.",
              "ar": "لا يتفكك ثلاثي الببتيد إطلاقاً؛ بل يضخ للقلب ويطرح كاملاً عبر الغدد العرقية.",
              "en": "The tripeptide conjugate is never cleaved; it pumps intact into systemic circulation and exits via sweat glands."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Ter bezleri yanılgısı: İntakt glutatyon konjugatları kanda serbest dolaşmaz; böbrek tübüllerinde gama-glutamil transferaz ve dipeptidaz ile işlenip asetillenerek idrarla atılır (Slayt 36).",
              "ar": "مغالطة الغدد العرقية: لا تطرح مقترنات الجلوتاثيون بالعرق بل تعالج كلوياً وتؤستل لتطرح في البول كحمض مركابتوريك.",
              "en": "Sweat gland fallacy: Intact glutathione adducts are not excreted in sweat; they undergo renal enzymatic trimming into mercapturic acids."
            }
          },
          {
            "id": "opt-6c",
            "text": {
              "tr": "Glutatyon konjugatı karaciğerde kolesterole dönüştürülüp hücre membranlarına yapı taşı yapılır.",
              "ar": "يتحول مقترن الجلوتاثيون في الكبد إلى كوليسترول ليدخل في بناء الأغشية الخلوية.",
              "en": "The glutathione conjugate is converted into cholesterol in hepatocytes to serve as a cell membrane structural lipid."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Lipit sentezi yanılgısı: Ksenobiyotik konjugatları hücresel yapı taşlarına (kolesterol vb.) dönüştürülemez; vücuttan atılmak üzere merkaptürik asite çevrilir.",
              "ar": "مغالطة تخليق الدهون: لا تتحول مقترنات المواد الغريبة إلى كوليسترول بل تطرح بوليًا بعد معالجتها لحمض مركابتوريك.",
              "en": "Lipid synthesis misconception: Xenobiotic conjugates are not shunted into cholesterol biosynthesis; they are cleared as mercapturic acids."
            }
          }
        ]
      }
    },
    {
      "id": "mc-mod5-les2-step-07",
      "stage": "formal_explanation",
      "stageIndex": 7,
      "type": "formal_explanation",
      "title": {
        "tr": "Farmakogenetik: Yavaş Asetilatör Fenotipi ve İzoniyazid",
        "ar": "علم الوراثة الدوائي: نمط الأستلة البطيء والإيزونيازيد",
        "en": "Pharmacogenetics: Slow Acetylators & Isoniazid"
      },
      "prompt": {
        "tr": "NAT-2 enzim polimorfizminde yavaş asetilatör fenotipine sahip bireylerde izoniyazid tedavisi sırasında hangi klinik komplikasyon riski belirgin artar?",
        "ar": "في النمط الجيني بطيء الأستلة لإنزيم NAT-2، ما هو الاختلاط السريري الخطير الذي يزداد بشدة أثناء علاج الإيزونيازيد؟",
        "en": "In individuals with the slow acetylator NAT-2 phenotype, which serious clinical adverse event increases significantly during isoniazid antitubercular therapy?"
      },
      "config": {
        "options": []
      },
      "technicalTerms": [
        { "term": "yavaş asetilatör", "arContext": "النمط الجيني بطيء الأستلة" },
        { "term": "periferik nöropati", "arContext": "الاعتلال العصبي المحيطي" }
      ],
      "hints": [
        {
          "tr": "Yavaş asetilatörlerde ilacın karaciğerden temizlenme hızının düşeceğini ve plazma konsantrasyonunun birikeceğini düşünün.",
          "ar": "فكر في أن بطيئي الأستلة يعانون من بطء التخلص الكبدي وتراكم الدواء في البلازما.",
          "en": "Consider that slow acetylators exhibit reduced clearance, leading to accumulation of parent drug in systemic circulation."
        },
        {
          "tr": "İzoniyazidin hangi vitaminin (B6 / piridoksin) atılımını artırarak sinir liflerinde hasar yaptığını hatırlayın.",
          "ar": "تذكر أي فيتامين (B6 / بيريدوكسين) يرتبط به الإيزونيازيد ويسبب نقصه تلف الأعصاب.",
          "en": "Recall which neuroprotective vitamin (B6 / pyridoxine) is antagonized and depleted by unmetabolized isoniazid."
        },
        {
          "tr": "İzoniyazid yavaş asetilatörlerde birikir, piridoksin tükenir ve periferik nöropati ile ilaca bağlı lupus (SLE) riski katlanır.",
          "ar": "يتراكم الإيزونيازيد مسبباً نقص البيريدوكسين والاعتلال العصبي المحيطي ومرض الذئبة الحمامية الدوائي.",
          "en": "Isoniazid accumulates, depleting pyridoxine (B6) and triggering severe peripheral neuropathy and drug-induced lupus."
        }
      ],
      "conceptCheck": {
        "options": [
          {
            "id": "opt-7a",
            "text": {
              "tr": "NAT-2 enzim polimorfizmi: Yavaş asetilatörlerde enzim aktivitesi düşüktür; izoniyazid kanda birikerek B6 vitamini eksikliği ve periferik nöropati yapar.",
              "ar": "تعدد أشكال NAT-2: في بطيئي الأستلة ينخفض النشاط فيتراكم الإيزونيازيد مسبباً عوز B6 واعتلالاً عصبياً محيطياً.",
              "en": "NAT-2 polymorphism: Slow acetylators exhibit reduced activity; unmetabolized isoniazid accumulates, depleting vitamin B6 and precipitating neuropathy."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kritik sınav ve klinik bilgi! Slayt 40: Türk ve Avrupa toplumlarının %50-60'ı yavaş asetilatördür; izoniyazid nöropatisi ve hidralazin lupusu bu grupta sıktır.",
              "ar": "معلومة سريرية وامتحانية بالغة الأهمية! شريحة 40: 50-60% من مجتمعاتنا بطيئو الأستلة، مما يرفع خطر النوبات العصبية والذئبة الدوائية.",
              "en": "Critical pharmacogenetic landmark! Slide 40: 50-60% of regional populations are slow acetylators, highly vulnerable to neuropathy."
            }
          },
          {
            "id": "opt-7b",
            "text": {
              "tr": "Yavaş asetilatörlerde karaciğer metabolizması tamamen durmuştur ve hiçbir ilaç metabolize edilemez.",
              "ar": "يتوقف الاستقلاب الكبدي كلياً لدى بطيئي الأستلة ويعجز الكبد عن استقلاب أي دواء.",
              "en": "Slow acetylators suffer total shutdown of all hepatic metabolic enzymes, unable to clear any xenobiotic."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Genel metabolik durma yanılgısı: Polimorfizm yalnızca NAT-2 enzimine özgüdür; CYP ve UGT gibi diğer tüm enzim sistemleri bu bireylerde tamamen normal çalışır (Slayt 40).",
              "ar": "مغالطة التوقف الكبدي الشامل: يقتصر الخلل الوراثي على إنزيم NAT-2 فقط؛ بينما تعمل إنزيمات CYP و UGT بكفاءة طبيعية تماماً.",
              "en": "Universal metabolic shutdown fallacy: The genetic defect is confined strictly to NAT-2; CYP and UGT superfamilies operate with full normal capacity."
            }
          },
          {
            "id": "opt-7c",
            "text": {
              "tr": "Hızlı asetilatörler ilacı hiç metabolize edemez çünkü enzim substratı tanıyamayacak kadar hızlı hareket eder.",
              "ar": "يعجز سريعو الأستلة عن استقلاب الدواء لأن حركة الإنزيم فائقة السرعة تمنع التعرف على الركيزة.",
              "en": "Rapid acetylators cannot metabolize drugs at all because enzymatic molecular turnover moves too quickly to recognize substrates."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Hızlı hareket yanılgısı: Hızlı asetilatörlerde (Eskimo ve Japonlar %90-100) NAT-2 enzim miktarı veya aktivitesi yüksektir; ilaç hızla inaktive olur ve standart dozda tedavi yetersizliği doğabilir.",
              "ar": "مغالطة السرعة المانعة: لدى سريعي الأستلة (اليابانيون 90%) نشاط إنزيمي عالٍ جداً؛ مما يسرع تعطيل الدواء ويهدد بفشل العلاج.",
              "en": "Rapid movement myth: Rapid acetylators (Japanese/Inuit 90-100%) express high NAT-2 levels, clearing drugs prematurely and risking under-treatment."
            }
          }
        ]
      }
    },
    {
      "id": "mc-mod5-les2-step-08",
      "stage": "concept_check",
      "stageIndex": 8,
      "type": "concept_check",
      "title": {
        "tr": "Hücresel Lokalizasyon: Mikrozomal UGT vs Sitozolik Enzimler",
        "ar": "التوضع الخلوي: إنزيم UGT الميكروزومي مقابل السيتوزولي",
        "en": "Cellular Localization: Microsomal UGT vs Cytosolic Enzymes"
      },
      "prompt": {
        "tr": "Glukuronidasyon reaksiyonunu katalizleyen UDP-glukuroniltransferaz (UGT) enzimleri hücrenin hangi alt organelinde ve kompartımanında yerleşiktir?",
        "ar": "أين تتوضع إنزيمات UDP-غلوكورونيل ترانسفيراز (UGT) داخل الخلية الكبدية مقارنة ببقية إنزيمات المرحلة الثانية؟",
        "en": "Unlike mostly cytosolic Phase II enzymes, where in the hepatocyte are UDP-glucuronosyltransferase (UGT) enzymes structurally localized?"
      },
      "config": {
        "options": []
      },
      "technicalTerms": [
        { "term": "mikrozomal", "arContext": "ميكروزومي (مرتبط بالشبكة الإندوبلازمية)" },
        { "term": "UGT", "arContext": "إنزيم جلوكورونيل ترانسفيراز" }
      ],
      "hints": [
        {
          "tr": "İlaç metabolizması deneylerinde santrifüj sonrası mikrozomal fraksiyonda hangi Faz II enziminin çöktüğünü hatırlayın.",
          "ar": "تذكر أي إنزيم من المرحلة الثانية يترسب مع الجسيمات الصغرى (الميكروزومات) بعد التثفيل فائق السرعة.",
          "en": "Recall which single Phase II transferase enzyme pellets down with the microsomal fraction upon ultracentrifugation."
        },
        {
          "tr": "Sülfotransferazlar (SULT), N-asetiltransferazlar (NAT) ve GST sitozolde serbestçe yüzerken UGT bir membrana gömülüdür.",
          "ar": "بينما تسبح SULT و NAT و GST بحرية في العصارة الخلوية، يرتبط UGT بغشاء عضي داخل خلوي.",
          "en": "While SULT, NAT, and GST float freely in the soluble cytosol, UGT is permanently anchored in a membrane."
        },
        {
          "tr": "UGT endoplazmik retikulum (ER) lümen membranına gömülü mikrozomal bir enzimdir; kofaktörü UDPGA sitozolden taşınır.",
          "ar": "UGT إنزيم ميكروزومي منغرس في غشاء الشبكة الإندوبلازمية؛ وينتقل عامله المساعد UDPGA من السيتوزول.",
          "en": "UGT is membrane-bound in the endoplasmic reticulum (microsomal); its cofactor UDPGA is transported from cytosol."
        }
      ],
      "conceptCheck": {
        "options": [
          {
            "id": "opt-8a",
            "text": {
              "tr": "UDP-Glukuroniltransferaz (UGT); endoplazmik retikulum membranına gömülü mikrozomal bir enzimdir (SULT, NAT ve GST ise sitozoliktir).",
              "ar": "إنزيم UGT؛ وهو إنزيم ميكروزومي مرتبط بغشاء الشبكة الإندوبلازمية (بينما SULT و NAT و GST سيتوزولية).",
              "en": "UDP-Glucuronosyltransferase (UGT); an integral endoplasmic reticulum membrane-bound enzyme (whereas SULT, NAT, and GST are cytosolic)."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Fevkalade hücresel biyoloji bilgisi! Slayt 33 ve Sınav Uyarıları: Öğrencilerin en sık düştüğü hata tüm Faz II enzimlerini sitozolik sanmaktır; UGT mikrozomaldir.",
              "ar": "معرفة خلوية استثنائية! شريحة 33 وملاحظات الامتحان: الخطأ الشائع هو اعتبار كل المرحلة الثانية سيتوزولية؛ إنزيم UGT ميكروزومي حصراً.",
              "en": "Superb cell biology mastery! Slide 33 & Exam warnings: Students commonly assume all Phase II is cytosolic; UGT is exclusively microsomal."
            }
          },
          {
            "id": "opt-8b",
            "text": {
              "tr": "Sülfotransferaz (SULT); sadece mitokondri iç zarında ATP sentaz ile kompleks halinde çalışır.",
              "ar": "إنزيم SULT؛ يتوضع حصراً في الغشاء الداخلي للميتوكوندريا مرتبطاً بمركب ATP سنتيز.",
              "en": "Sulfotransferase (SULT); functions exclusively embedded in the mitochondrial inner membrane with ATP synthase."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Mitokondriyal SULT yanılgısı: SULT enzimleri sitozolde serbestçe bulunur; membranlara bağlı değildir (Slayt 32 ve 37).",
              "ar": "مغالطة التوضع الميتوكوندري لـ SULT: إنزيمات SULT قابلة للذوبان في السيتوزول وغير مرتبطة بأغشية.",
              "en": "Mitochondrial SULT misconception: SULT enzymes are soluble cytosolic proteins, never anchored to mitochondrial membranes."
            }
          },
          {
            "id": "opt-8c",
            "text": {
              "tr": "Glutatyon S-transferaz (GST); yalnızca hücre dışı kan plazmasında aktiftir.",
              "ar": "إنزيم GST؛ ينشط حصراً خارج الخلايا في بلازما الدم.",
              "en": "Glutathione S-transferase (GST); active exclusively in extracellular blood plasma."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Hücre dışı GST yanılgısı: GST enzimleri hücresel sitozolde yerleşiktir; hücre içi elektrofilleri yakalayarak DNA ve proteinleri korur.",
              "ar": "مغالطة نشاط GST خارج الخلوي: يتوضع GST داخل السيتوزول الخلوي ليحمي البروتينات والحمض النووي من الإلكتروفيلات.",
              "en": "Extracellular GST fallacy: GST is abundant within the intracellular cytosol, defending cellular proteins from electrophilic attack."
            }
          }
        ]
      }
    },
    {
      "id": "mc-mod5-les2-step-09",
      "stage": "application",
      "stageIndex": 9,
      "type": "clinical_vignette",
      "title": {
        "tr": "Antidot Kurtarma Mekanizması: N-Asetilsistein (NAC)",
        "ar": "آلية إنقاذ الترياق: N-أسيتيل سيستين (NAC)",
        "en": "Antidote Rescue Mechanism: N-Acetylcysteine (NAC)"
      },
      "prompt": {
        "tr": "Parasetamol zehirlenmesinde antidot olan N-Asetilsistein (NAC) ilk 8-10 saat içinde başlandığında karaciğeri %100 kurtarırken, 24 saatten sonra neden yetersiz kalır? Biyokimyasal kurtarma mekanizması nedir?",
        "ar": "لماذا ينقذ الترياق N-أسيتيل سيستين (NAC) الكبد بنسبة 100% في أول 8-10 ساعات بينما يعجز بعد 24 ساعة؟ ما هي آليته الكيميائية الحيوية؟",
        "en": "Why does the antidote N-Acetylcysteine (NAC) offer near 100% hepatoprotection within 8-10 hours, yet lose efficacy after 24 hours? What is its molecular rescue mechanism?"
      },
      "config": {
        "options": []
      },
      "technicalTerms": [
        { "term": "N-asetilsistein", "arContext": "ترياق التسمم بالباراسيتامول" },
        { "term": "tiyol grubu", "arContext": "مجموعة السلفهيدريل -SH" }
      ],
      "hints": [
        {
          "tr": "Hücrede NAPQI'yi yakalayan doğal molekül olan glutatyonun (GSH: tripeptit) yapısındaki serbest nükleofilik amino asidi düşünün.",
          "ar": "فكر في الحمض الأميني ذي الثيول الحر في الجلوتاثيون (GSH) المسؤول عن اصطياد NAPQI نكليوفيلياً.",
          "en": "Consider the nucleophilic free-thiol amino acid in glutathione (GSH) that traps reactive electrophilic NAPQI."
        },
        {
          "tr": "Hücre içi glutatyon sentezinde hız kısıtlayıcı basamağın sistein amino asidi temini olduğunu hatırlayın.",
          "ar": "تذكر أن الخطوة المحددة لسرعة اصطناع الجلوتاثيون داخل الخلية هي توفر الحمض الأميني سيستين.",
          "en": "Recall that intracellular cysteine availability is the rate-limiting precursor in hepatic glutathione resynthesis."
        },
        {
          "tr": "NAC serbest sistein havuzunu doldurarak GSH sentezini hızlandırır; ancak gecikildiğinde NAPQI mitokondri proteinlerine bağlanıp nekrozu tamamlamıştır.",
          "ar": "يوفر NAC السيستين لإعادة تصنيع الجلوتاثيون؛ لكن التأخر يسمح لـ NAPQI بالارتباط بالبروتينات وبدء التنخر غير العكوس.",
          "en": "NAC replenishes cysteine for GSH synthesis; late administration fails because NAPQI has already covalently destroyed mitochondrial proteins."
        }
      ],
      "conceptCheck": {
        "options": [
          {
            "id": "opt-9a",
            "text": {
              "tr": "NAC serbest sistein sağlayarak tükenen glutatyon (GSH) sentezini hızla yeniler; ancak GSH >%70 tükendikten sonra NAPQI proteinlere kovalent bağlanıp geri dönüşsüz nekroz başlatmıştır.",
              "ar": "يوفر NAC السيستين لإعادة اصطناع الجلوتاثيون؛ لكن استنزاف GSH لأكثر من 70% يسمح لـ NAPQI بالارتباط التساهمي وإحداث تنخر غير عكوس.",
              "en": "NAC supplies cysteine to regenerate depleted GSH; delayed therapy fails because NAPQI has already covalently bound mitochondrial proteins, triggering necrosis."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Hayati farmasötik kimya antidot mekanizması! Slayt 36: NAC glutatyon öncülüdür; ilk 8-10 saatte verildiğinde hepatik nekrozu %100'e yakın önler.",
              "ar": "آلية ترياق منقذة للحياة! شريحة 36: NAC طليعة للجلوتاثيون؛ إعطاؤه في أول 8-10 ساعات يمنع التنخر الكبدي تماماً.",
              "en": "Life-saving antidotal mechanism! Slide 36: NAC is a GSH precursor; timely administration within 8-10 hours prevents hepatic necrosis."
            }
          },
          {
            "id": "opt-9b",
            "text": {
              "tr": "NAC karaciğer hücrelerine kalsiyum pompalayarak hepatositleri taşa dönüştürür ve ilacın girmesini engeller.",
              "ar": "يضخ NAC الكالسيوم إلى خلايا الكبد محولاً إياها إلى بنية صخرية تمنع دخول الدواء.",
              "en": "NAC pumps calcium into hepatocytes to petrify liver tissue, physically sealing cells against paracetamol entry."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kalsifikasyon yanılgısı: NAC bir kalsiyum pompası değildir; hücre içi sistein öncülü olarak glutatyon (GSH) sentezini restore eder (Slayt 36).",
              "ar": "مغالطة التكلس: NAC ليس مضخة كالسيوم؛ دوره يكمن في توفير السيستين لتجديد اصطناع الجلوتاثيون الخلوي.",
              "en": "Petrification myth: NAC has no calcification properties; its sole therapeutic action is replenishing intracellular cysteine for GSH resynthesis."
            }
          },
          {
            "id": "opt-9c",
            "text": {
              "tr": "24 saat sonra parasetamol molekülleri kendi aralarında polimerleşerek kauçuk benzeri elastik bir kitle oluşturur.",
              "ar": "تتبلمر جزيئات الباراسيتامول بعد 24 ساعة مشكلة كتلة مطاطية تسد الأوعية الكبدية.",
              "en": "After 24 hours, paracetamol molecules polymerize into an inert rubber-like elastomer obstructing hepatic sinusoids."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Polimerleşme yanılgısı: Hasarın sebebi polimerleşme değil; serbest elektrofil NAPQI'nin hayati mitokondriyal enzimlerdeki sistein tiyollerine kovalent bağlanarak hücre ölümünü tetiklemesidir.",
              "ar": "مغالطة البلمرة: سبب الأذية ليس البلمرة، بل الارتباط التساهمي لوسيط NAPQI الإلكتروفيلي ببروتينات الميتوكوندريا الحيوية.",
              "en": "Polymerization misconception: Damage stems not from polymer massing, but from covalent attack by electrophilic NAPQI on vital mitochondrial enzymes."
            }
          }
        ]
      }
    },
    {
      "id": "mc-mod5-les2-step-10",
      "stage": "retrieval",
      "stageIndex": 10,
      "type": "retrieval",
      "title": {
        "tr": "Kofaktör Eşleştirme: Aktif Donör Moleküller",
        "ar": "مطابقة العوامل المساعدة: الجزيئات المانحة المنشطة",
        "en": "Cofactor Matching: Activated Donor Substrates"
      },
      "prompt": {
        "tr": "Faz II konjugasyon enzimlerinin kullandığı aktif donör kofaktörleri doğru eşleştiren seçenek hangisidir? (UGT, SULT, NAT, GST)",
        "ar": "ما هو الخيار الذي يطابق بدقة العوامل المساعدة المنشطة مع إنزيماتها المقترنة؟ (UGT, SULT, NAT, GST)",
        "en": "Which combination correctly matches each Phase II transferase with its physiological activated donor cofactor? (UGT, SULT, NAT, GST)"
      },
      "config": {
        "options": []
      },
      "technicalTerms": [
        { "term": "UDPGA", "arContext": "حمض يوريدين ثنائي فوسفات الجلوكورونيك" },
        { "term": "PAPS", "arContext": "فوسفوأدينوزين فوسفوكبريتات" }
      ],
      "hints": [
        {
          "tr": "Glukuronidasyon üridin nükleotidini (UDPGA), sülfasyon adenozin fosfatını (PAPS) kullanır.",
          "ar": "يستخدم الجلوكورونيد نكليوتيد اليوريدين (UDPGA)، وتستخدم الكبرتة فوسفات الأدينوزين (PAPS).",
          "en": "Glucuronidation harnesses a uridine nucleotide (UDPGA); sulfation utilizes adenosine phosphosulfate (PAPS)."
        },
        {
          "tr": "Asetilasyon asetil-KoA'yı, glutatyon konjugasyonu ise nükleofilik tiyollü tripeptit GSH'yi kullanır.",
          "ar": "تستخدم الأستلة أسيتيل-CoA، ويستخدم الاقتران بالجلوتاثيون الببتيد الثلاثي النكليوفيلي GSH.",
          "en": "Acetylation recruits Acetyl-CoA; glutathione conjugation directly utilizes the nucleophilic tripeptide GSH."
        },
        {
          "tr": "UGT: UDPGA; SULT: PAPS; NAT: Asetil-KoA; GST: Glutatyon (GSH).",
          "ar": "UGT: UDPGA؛ SULT: PAPS؛ NAT: أسيتيل-CoA؛ GST: جلوتاثيون (GSH).",
          "en": "UGT: UDPGA; SULT: PAPS; NAT: Acetyl-CoA; GST: Glutathione (GSH)."
        }
      ],
      "conceptCheck": {
        "options": [
          {
            "id": "opt-10a",
            "text": {
              "tr": "UGT: UDPGA (Üridin difosfat glukuronik asit); SULT: PAPS; NAT: Asetil-KoA; GST: Glutatyon (GSH).",
              "ar": "UGT: UDPGA؛ SULT: PAPS؛ NAT: أسيتيل-CoA؛ GST: جلوتاثيون (GSH).",
              "en": "UGT: UDPGA (Uridine diphosphate glucuronic acid); SULT: PAPS; NAT: Acetyl-CoA; GST: Glutathione (GSH)."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kusursuz geri çağırma! Slayt 37-38: Tablodaki tüm kofaktörler eksiksiz ve doğru eşleştirilmiştir.",
              "ar": "استرجاع مثالي! شريحة 37-38: تطابق كامل ودقيق لجميع العوامل المساعدة المنشطة في الجدول المرجعي.",
              "en": "Flawless retrieval! Slides 37-38: Perfect alignment of all high-energy biological conjugation cofactors."
            }
          },
          {
            "id": "opt-10b",
            "text": {
              "tr": "UGT: ATP; SULT: NADH; NAT: Sitrik asit; GST: Kolesterol.",
              "ar": "UGT: ATP؛ SULT: NADH؛ NAT: حمض الليمون؛ GST: كوليسترول.",
              "en": "UGT: ATP; SULT: NADH; NAT: Citric acid; GST: Cholesterol."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kofaktör donör karışıklığı: Faz II transferazları kovalent konjugasyon için aktive edilmiş özel donör kofaktörler (UDPGA, PAPS, Asetil-KoA, GSH) kullanır (Slayt 37-38).",
              "ar": "خلط العوامل المساعدة: تتطلب تفاعلات الاقتران كواشف نوعية عالية الطاقة (UDPGA, PAPS, Acetyl-CoA, GSH).",
              "en": "Cofactor mismatch: Biosynthetic Phase II transferases strictly require specialized activated donors (UDPGA, PAPS, Acetyl-CoA, GSH)."
            }
          },
          {
            "id": "opt-10c",
            "text": {
              "tr": "UGT: Glutatyon; SULT: Glisin; NAT: Metiyonin; GST: Glukuronik asit.",
              "ar": "UGT: جلوتاثيون؛ SULT: غليسين؛ NAT: ميثيونين؛ GST: حمض الجلوكورونيك.",
              "en": "UGT: Glutathione; SULT: Glycine; NAT: Methionine; GST: Glucuronic acid."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Eşleştirme hatası: Glutatyon GST'nin, glukuronik asit (UDPGA) ise UGT'nin substratıdır; aralarındaki roller karıştırılmamalıdır.",
              "ar": "خطأ في المطابقة: الجلوتاثيون ركيزة GST، وحمض الجلوكورونيك ركيزة UGT؛ لا يجوز الخلط بينهما.",
              "en": "Permutation error: Glutathione pairs with GST and UDPGA with UGT; biological donor specificity is rigid."
            }
          }
        ]
      }
    },
    {
      "id": "mc-mod5-les2-step-11",
      "stage": "connection",
      "stageIndex": 11,
      "type": "connection",
      "title": {
        "tr": "Ön-İlaç Tasarımı: Metenaminin Asidik İdrarda Biyoaktivasyonu",
        "ar": "تصميم الطليعة الدوائية: التنشيط الحيوي للميثينامين",
        "en": "Prodrug Design: Methenamine Activation in Acidic Urine"
      },
      "prompt": {
        "tr": "Üriner antiseptik Metenamin, kanda tamamen inaktifken neden yalnızca asidik idrarda (pH < 5.5) güçlü antibakteriyel formaldehit salar?",
        "ar": "لماذا يبقى مطهر المجاري البولية ميثينامين خاملاً في الدم ولا يحرر الفورمالدهيد القاتل للجراثيم إلا في البول الحمضي؟",
        "en": "Why is the urinary antiseptic methenamine chemically stable at blood pH 7.4, yet spontaneously liberates bactericidal formaldehyde exclusively in acidic urine?"
      },
      "config": {
        "options": []
      },
      "technicalTerms": [
        { "term": "metenamin", "arContext": "ميثينامين (مطهر بولي)" },
        { "term": "formaldehit", "arContext": "الفورمالدهيد المطهر" }
      ],
      "hints": [
        {
          "tr": "Hekzametilentetramin kafes yapısının nötr fizyolojik pH 7.4'teki kimyasal kararlılığını düşünün.",
          "ar": "فكر في الاستقرار الكيميائي لهيكل الميثينامين القفصي في pH الدم الفيزيولوجي المعتدل 7.4.",
          "en": "Consider the chemical stability of the hexamethylenetetramine cage at neutral blood pH 7.4."
        },
        {
          "tr": "İdrar pH'ı 5.5'in altına düştüğünde ortamdaki yüksek hidronyum (H+) konsantrasyonunun kafes bağlarına etkisini hatırlayın.",
          "ar": "تذكر أثر التركيز العالي لأيونات الهيدرونيوم H+ في البول الحمضي على روابط هيكل الميثينامين.",
          "en": "Recall how high proton concentration in acidic urine drives non-enzymatic spontaneous hydrolysis of the cage."
        },
        {
          "tr": "Metenamin pH < 5.5 asidik idrarda kendiliğinden hidroliz olarak 6 formaldehit ve 4 amonyuma parçalanır; bakteriyel proteinleri denatüre eder.",
          "ar": "يتحلمه الميثينامين تلقائياً في البول الحمضي إلى 6 جزيئات فورمالدهيد و4 أمونيوم ليدمر بروتينات البكتيريا.",
          "en": "Methenamine undergoes non-enzymatic acid hydrolysis at pH < 5.5 into 6 formaldehyde molecules, denaturing bacterial proteins."
        }
      ],
      "conceptCheck": {
        "options": [
          {
            "id": "opt-11a",
            "text": {
              "tr": "Asidik idrarda (pH < 5.5) kendiliğinden hidroliz olarak 6 mol formaldehit ve 4 mol amonyuma parçalanır; serbest formaldehit bakterileri denatüre eder.",
              "ar": "يتحلمه تلقائياً في البول الحمضي (pH < 5.5) إلى 6 مول فورمالدهيد و 4 مول أمونيوم؛ ليدمر بروتينات البكتيريا.",
              "en": "Spontaneously hydrolyzes at urine pH < 5.5 into 6 moles of formaldehyde and 4 moles of ammonia; formaldehyde denatures bacteria."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Harika ön-ilaç kimyası! Slayt 44: Metenamin enzimsiz spontan parçalanan metabonat/prodrug örneğidir; bakteriler formaldehite asla direnç geliştiremez.",
              "ar": "كيمياء طليعة دوائية مبهرة! شريحة 44: يتحلل الميثينامين ذاتياً بلا إنزيمات، ولا تستطيع البكتيريا تطوير أي مقاومة ضد الفورمالدهيد.",
              "en": "Superb prodrug chemistry! Slide 44: Methenamine is a non-enzymatic metabonate prodrug; bacteria cannot develop resistance to formaldehyde."
            }
          },
          {
            "id": "opt-11b",
            "text": {
              "tr": "Metenamin böbrek tübüllerinde penisiline dönüşerek bakteriyel hücre duvarı sentezini durdurur.",
              "ar": "يتحول الميثينامين في النبيبات الكلوية إلى بنسلين يثبط بناء جدار الخلية البكتيرية.",
              "en": "Methenamine converts enzymatically in renal tubules into penicillin to inhibit bacterial peptidoglycan synthesis."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Penisilin dönüşümü yanılgısı: Metenamin bir antibiyotik öncülü değildir; trisiklik kafes yapısı asidik idrarda kendiliğinden non-enzimatik hidrolizle formaldehite ayrışır (Slayt 44).",
              "ar": "مغالطة التحول لبنسلين: الميثينامين ليس طليعة بنسلين؛ تفككه كيميائي حمضي مباشر يحرر الفورمالدهيد المطهر.",
              "en": "Penicillin conversion myth: Methenamine is not a beta-lactam precursor; its cage hydrolyzes non-enzymatically under acid to formaldehyde."
            }
          },
          {
            "id": "opt-11c",
            "text": {
              "tr": "Metenamin kanda serbest formaldehit salarak tüm damar endotelini ve alyuvarları parçalar.",
              "ar": "يحرر الميثينامين الفورمالدهيد الحر في الدم مدمراً البطانة الوعائية وكريات الدم الحمراء.",
              "en": "Methenamine liberates free formaldehyde directly into circulating blood, hemolyzing red blood cells."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Sistemik toksisite yanılgısı: Metenamin fizyolojik kan pH'ında (7.4) son derece stabildir ve formaldehit salmaz; aktivasyon yalnızca asidik idrarda (pH < 5.5) gerçekleşir.",
              "ar": "مغالطة السمية الجهازية: الميثينامين مستقر تماماً في pH الدم 7.4 ولا يحرر أي فورمالدهيد إلا في البول الحمضي حصراً.",
              "en": "Systemic toxicity fallacy: The cage is completely stable at blood pH 7.4; selective antiseptic action requires acidic urine pH < 5.5."
            }
          }
        ]
      }
    },
    {
      "id": "mc-mod5-les2-step-12",
      "stage": "mastery_check",
      "stageIndex": 12,
      "type": "mastery_check",
      "title": {
        "tr": "Ustalık Sınavı: Doz Aşımı Kinetik Hesabı ve Nekroz Eşiği",
        "ar": "امتحان الإتقان: حساب حركية الجرعة المفرطة وعتبة التنخر",
        "en": "Mastery Check: Overdose Kinetics & Necrosis Threshold"
      },
      "prompt": {
        "tr": "Bir hasta 10 g (66 mmol) parasetamol yutar. SULT 10 mmol'de, UGT 40 mmol'de doyar. Kalan 16 mmol CYP2E1 ile 16 mmol NAPQI üretir. Karaciğer GSH rezervi 10 mmol olduğuna göre klinik sonuç ne olur?",
        "ar": "ابتلع مريض 10 غرامات (66 مليمول) باراسيتامول. تشبع SULT عند 10، و UGT عند 40، وولد CYP2E1 نحو 16 مليمول NAPQI. إذا كان مخزون GSH هو 10 مليمول، ما النتيجة؟",
        "en": "A patient ingests 10 g (66 mmol) paracetamol. SULT saturates at 10 mmol, UGT at 40 mmol. Remaining 16 mmol yields 16 mmol NAPQI via CYP2E1. With 10 mmol hepatic GSH, what occurs?"
      },
      "config": {
        "options": []
      },
      "technicalTerms": [
        { "term": "GSH tükenmesi", "arContext": "استنزاف مخزون الجلوتاثيون" },
        { "term": "kovalent bağlanma", "arContext": "الارتباط التساهمي المرضي" }
      ],
      "hints": [
        {
          "tr": "16 mmol toksik NAPQI'nin mevcut 10 mmol glutatyonu tamamen tüketip tüketmeyeceğini hesaplayın.",
          "ar": "احسب ما إذا كان 16 مليمول من NAPQI سيستنزف بالكامل مخزون الـ 10 مليمول من الجلوتاثيون.",
          "en": "Calculate whether 16 mmol of reactive NAPQI will completely exhaust the available 10 mmol glutathione pool."
        },
        {
          "tr": "Hücresel glutatyon %70'in üzerinde tükendiğinde arta kalan serbest NAPQI'nin (6 mmol) hepatosit mitokondri proteinlerine ne yapacağını düşünün.",
          "ar": "فكر في مصير الفائض البالغ 6 مليمول من NAPQI عند استنزاف الجلوتاثيون بنسبة تتجاوز 70%.",
          "en": "Consider what the un-trapped 6 mmol of NAPQI does once glutathione defense drops below the critical 30% survival threshold."
        },
        {
          "tr": "GSH rezervi %100 tükenir; kalan 6 mmol serbest elektrofil NAPQI hepatosit proteinlerine kovalent bağlanarak fulminan nekroz ve karaciğer yetmezliği başlatır.",
          "ar": "يستنزف الجلوتاثيون 100%؛ ويرتبط الفائض (6 مليمول) تساهمياً ببروتينات الكبد مسبباً تنخراً صاعقاً وقاتلاً.",
          "en": "Glutathione depletes 100%; residual 6 mmol un-neutralized NAPQI covalently attacks hepatocyte proteins, initiating fulminant necrosis."
        }
      ],
      "conceptCheck": {
        "options": [
          {
            "id": "opt-12a",
            "text": {
              "tr": "Glutatyon %100 tükenir; arta kalan 6 mmol serbest NAPQI hepatosit proteinlerine kovalent bağlanarak fulminan karaciğer nekrozunu tetikler.",
              "ar": "يستنزف الجلوتاثيون بنسبة 100%؛ ويرتبط الفائض (6 مليمول) تساهمياً ببروتينات الخلايا الكبدية مسبباً تنخراً كبدياً صاعقاً.",
              "en": "Glutathione is 100% depleted; the excess 6 mmol of free NAPQI covalently attacks hepatocyte vital proteins, triggering fulminant hepatic necrosis."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Harika kantitatif farmasötik kimya ustalığı! Slayt 35-36: GSH tükenmesi >%70 olduğunda hücre nekroza gider; bu hastada 6 mmol fazla toksin fulminan karaciğer yetmezliği yapar.",
              "ar": "إتقان كيميائي صيدلاني كمي رائع! شريحة 35-36: عندما يتجاوز استنزاف GSH نسبة 70%، تتنخر الخلايا؛ 6 مليمول فائضة تحدث فشلاً كبدياً صاعقاً.",
              "en": "Masterful quantitative toxicology! Slides 35-36: Exceeding 70% GSH depletion triggers fatal covalent adducts on mitochondrial proteins."
            }
          },
          {
            "id": "opt-12b",
            "text": {
              "tr": "Glutatyon hiç azalmaz çünkü karaciğer parasetamolü görünce sonsuz miktarda glutatyon sentezleyebilir.",
              "ar": "لا ينقص الجلوتاثيون إطلاقاً لأن الكبد يصطنع كميات لا نهائية منه فور دخول الباراسيتامول.",
              "en": "Glutathione never depletes because hepatocytes synthesize unlimited instantaneous reserve upon drug sensing."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Sonsuz kapasite yanılgısı: Hepatik sistein ve GSH rezervleri sınırlıdır (yaklaşık 10 mmol); yüksek dozda rezervler hızla tükenir (>%70 depletion) ve hücresel savunma çöker (Slayt 35-36).",
              "ar": "مغالطة السعة اللانهائية: مخزون السيستين و GSH محدود (حوالي 10 مليمول)؛ وينهار الدفاع الخلوي فور نفاد المخزون.",
              "en": "Infinite capacity fallacy: Hepatic GSH reserves are strictly finite (~10 mmol); overwhelming electrophilic flux swiftly exhausts cellular defenses."
            }
          },
          {
            "id": "opt-12c",
            "text": {
              "tr": "6 mmol serbest NAPQI vücuttan buharlaşarak akciğerler yoluyla nefesle dışarı atılır.",
              "ar": "يتبخر الفائض البالغ 6 مليمول من NAPQI خارج الجسم ويطرح غازياً عبر الرئتين مع الزفير.",
              "en": "The residual 6 mmol of NAPQI spontaneously vaporizes and is exhaled harmlessly through the lungs."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Gaz atılımı yanılgısı: NAPQI uçucu bir gaz değildir; son derece reaktif elektrofilik bir kinonimindir ve karaciğer proteinlerindeki nükleofilik tiyollerle (-SH) anında kovalent bağ kurar.",
              "ar": "مغالطة الإطراح الغازي: NAPQI ليس غازاً متطايراً بل وسيط إلكتروفيلي عالي التفاعلية يرتبط فوراً بثيولات البروتينات الخلوية.",
              "en": "Gaseous exhalation myth: NAPQI is a non-volatile reactive electrophile that instantly alkylates cellular nucleophiles."
            }
          }
        ]
      }
    }
  ]
};

// Mirror conceptCheck.options into config.options for all steps
lesson10.steps.forEach(s => {
  if (s.conceptCheck?.options && s.config) {
    s.config.options = s.conceptCheck.options.map(opt => ({
      id: opt.id,
      text: opt.text?.tr || opt.text,
      isCorrect: opt.isCorrect,
      misconceptionFeedback: opt.misconceptionFeedback?.tr || opt.misconceptionFeedback
    }));
  }
});

const outputPath = 'courses/medchem/lessons/lesson-10.json';
fs.writeFileSync(outputPath, JSON.stringify(lesson10, null, 2), 'utf8');
console.log('Successfully generated clean publication-grade lesson-10.json at:', outputPath);

const mainRepoPath = 'c:/Users/hp/Documents/antigravity/valiant-raman/courses/medchem/lessons/lesson-10.json';
fs.writeFileSync(mainRepoPath, JSON.stringify(lesson10, null, 2), 'utf8');
console.log('Successfully synced clean publication-grade lesson-10.json to main repo at:', mainRepoPath);
