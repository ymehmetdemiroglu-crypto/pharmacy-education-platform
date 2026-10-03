const fs = require('fs');
const path = require('path');

const lesson09 = {
  "$schema": "../../../packages/platform/schema/lesson.schema.json",
  "id": "mc-mod5-les1",
  "courseId": "medchem",
  "moduleId": "mc-mod-05",
  "title": {
    "tr": "Faz I Fonksiyonelleşme: Sitokrom P450 ve Hidroksilasyon Mekanizmaları",
    "ar": "المرحلة الأولى من التحول الحيوي: آليات أكسدة وهدرلة CYP450",
    "en": "Phase I Functionalization: Cytochrome P450 Hydroxylation Mechanisms"
  },
  "order": 1,
  "access": "free",
  "objective": {
    "tr": "Sitokrom P450 katalitik döngüsünü, okso-ferril radikalini, alifatik ve aromatik hidroksilasyonu (NIH kayması) ile oksidatif dealkilasyon mekanizmalarını analiz etmek.",
    "ar": "تحليل الدورة التحفيزية لـ CYP450، والجذر الحديدي الأوكسيدي، والهدرلة الأليفاتية والعطرية (انزياح NIH)، وآليات نزع الألكيل الأكسيدي.",
    "en": "Analyze the Cytochrome P450 catalytic cycle, the oxo-ferryl radical intermediate, aliphatic and aromatic hydroxylation (NIH shift), and oxidative dealkylation mechanisms."
  },
  "description": {
    "tr": "İlaç moleküllerinde Faz I oksidasyon, redüksiyon ve hidroliz reaksiyonlarının kimyasal mekanizmalarını ve aktif metabolit oluşumunu inceleme.",
    "ar": "دراسة الآليات الكيميائية لتفاعلات الأكسدة والإرجاع والحلمهة في المرحلة الأولى من الاستقلاب الدوائي وتكوين المستقلبات الفعالة.",
    "en": "Explore the chemical mechanisms of Phase I oxidation, reduction, and hydrolysis reactions, delineating how prodrugs and active metabolites are generated."
  },
  "misconceptions": [
    {
      "tr": "Metabolizmanın daima ilacı zehirsizleştirdiği ve etkisini sonlandırdığı yanılgısı (aktif metabolitler ve biyoaktivasyon göz ardı edilir).",
      "ar": "الظن الخاطئ بأن الاستقلاب يؤدي حتماً إلى إبطال فعالية الدواء متجاهلاً التنشيط الحيوي للأدوية الطليعية والمستقلبات السامة.",
      "en": "The misconception that metabolism always detoxifies drugs and terminates pharmacologic action, ignoring bioactivation and active metabolites."
    },
    {
      "tr": "Aromatik hidroksilasyonda hidrojen atomunun doğrudan koptuğu ve aren oksit ara ürününün (NIH kaymasının) oluşmadığı düşüncesi.",
      "ar": "الاعتقاد الخاطئ بأن الهدرلة العطرية تحدث بفقد مباشر للبروتون دون تشكل أكسيد الآرين كمركب وسيط أو حدوث انزياح NIH.",
      "en": "The belief that aromatic hydroxylation involves simple direct substitution without an electrophilic arene oxide intermediate and NIH hydride shift."
    },
    {
      "tr": "Oksidatif dealkilasyonda heteroatom-karbon bağının doğrudan enzim tarafından kesildiği varsayımı (kararsız alfa-hidroksialkil ara ürünü bilinmez).",
      "ar": "الافتراض الخاطئ بأن إنزيم CYP450 يقطع رابطة كربون-ذرة غير متجانسة مباشرة دون المرور بمركب ألفا-هيدروكسي غير المستقر.",
      "en": "The false assumption that CYP450 directly cleaves the carbon-heteroatom bond rather than oxygenating the adjacent alpha-carbon to collapse spontaneously."
    }
  ],
  "sources": [
    { "file": "İlaç metabolizması-2026.pdf", "page": 1 },
    { "file": "İlaç metabolizması-2026.pdf", "page": 4 },
    { "file": "İlaç metabolizması-2026.pdf", "page": 14 },
    { "file": "İlaç metabolizması-2026.pdf", "page": 15 },
    { "file": "İlaç metabolizması-2026.pdf", "page": 16 },
    { "file": "İlaç metabolizması-2026.pdf", "page": 20 },
    { "file": "İlaç metabolizması-2026.pdf", "page": 21 },
    { "file": "İlaç metabolizması-2026.pdf", "page": 28 }
  ],
  "citations": [
    {
      "id": "CIT-MC09-01",
      "book": "Foye's Principles of Medicinal Chemistry",
      "edition": "8th ed.",
      "topic": "Phase I Drug Metabolism: Cytochrome P450 Oxygenations, NIH Shift, and Hydrolysis",
      "chapter": "Chapter 4: Drug Biotransformation",
      "page": "115-148",
      "status": "verified"
    },
    {
      "id": "CIT-MC09-02",
      "book": "Wilson and Gisvold's Textbook of Organic Medicinal and Pharmaceutical Chemistry",
      "edition": "12th ed.",
      "topic": "Metabolic Oxidation of Aliphatic and Aromatic Carbons, Dealkylation, and Amide Hydrolysis",
      "chapter": "Chapter 4: Metabolic Changes of Drugs and Related Organic Compounds",
      "page": "120-165",
      "status": "verified"
    }
  ],
  "numericClaims": [
    {
      "id": "NUM-MC09-01",
      "parameter": "CYP450 oxo-ferryl radical active oxygen valence state",
      "value": "Fe(IV)=O radical cation ([Fe4+=O]•+) requiring 2 electrons from NADPH via NADPH-P450 reductase",
      "status": "verified",
      "referencePassage": "Slide 14 & Foye Ch. 4: CYP450 catalytic cycle utilizes NADPH-P450 reductase supplying 2 electrons to form the activated oxo-ferryl species [Fe4+=O]•+."
    },
    {
      "id": "NUM-MC09-02",
      "parameter": "Phenacetin O-deethylation conversion efficiency",
      "value": ">80% converted to Paracetamol in liver microsomes via alpha-carbon hydroxylation with spontaneous formaldehyde elimination",
      "status": "verified",
      "referencePassage": "Slide 20: Phenacetin is extensively converted (>80%) via CYP-catalyzed O-deethylation to acetaminophen."
    },
    {
      "id": "NUM-MC09-03",
      "parameter": "Nordiazepam elimination half-life",
      "value": "50-100 hours (vs parent Diazepam 20-50 hours), explaining prolonged sedation via N-demethylation",
      "status": "verified",
      "referencePassage": "Slide 6 & Slide 20: N-demethylation of diazepam yields nordiazepam, an active sedative metabolite with t1/2 of 50-100 hours."
    },
    {
      "id": "NUM-MC09-04",
      "parameter": "Aspirin plasma ester hydrolysis half-life vs Procainamide amide half-life",
      "value": "~15-20 minutes (Aspirin esterase) vs 3-4 hours (Procainamide amidase)",
      "status": "verified",
      "referencePassage": "Slide 28: Esterase hydrolysis of aspirin occurs within 15-20 min; amide bonds in procainamide resist hydrolysis with t1/2 of 3-4 hours."
    }
  ],
  "spacedReviewCards": [
    {
      "cardId": "mc-mod5-les1-card1",
      "courseId": "medchem",
      "drugOrConcept": "CYP450 Katalitik Döngüsü ve Aktif Oksijen",
      "prompt": "Sitokrom P450 monooksijenaz döngüsünde inert C-H bağlarını oksitleyen nihai reaktif tür nedir ve elektronlar nereden gelir?",
      "answer": "[Fe4+=O]•+ (okso-ferril radikal katyonu); NADPH kofaktöründen NADPH-CYP450 redüktaz enzimi aracılığıyla 2 elektron aktarılmasıyla üretilir.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "mc-mod5-les1-card2",
      "courseId": "medchem",
      "drugOrConcept": "NIH Kayması (NIH Shift)",
      "prompt": "Aromatik hidroksilasyon sırasında gözlenen NIH kayması nedir ve hangi ara ürün üzerinden gerçekleşir?",
      "answer": "Aromatik halkanın epoksitlenmesiyle oluşan aren oksit ara ürünü açılırken, komşu hidritin (veya döteryumun) 1,2-karbon göçü yapması ve keto-enol tautomerisiyle fenol oluşturmasıdır.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "mc-mod5-les1-card3",
      "courseId": "medchem",
      "drugOrConcept": "Oksidatif N- ve O-Dealkilasyon Mekanizması",
      "prompt": "CYP450 enzimleri heteroatoma (N, O, S) bağlı alkil gruplarını (örn. Fenasetin, Diazepam) hangi mekanizmayla koparır?",
      "answer": "Heteroatoma komşu alfa-karbon hidroksillenir; oluşan kararsız hemiaminal veya hemiasetal ara ürünü kendiliğinden parçalanarak aldehit (formaldehit) ve dealkile ilaç açığa çıkarır.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "mc-mod5-les1-card4",
      "courseId": "medchem",
      "drugOrConcept": "Alifatik omega vs (omega-1) Oksidasyonu",
      "prompt": "Barbitüratlarda (pentobarbital) alifatik yan zincir oksidasyonunda neden sekonder alkol (omega-1) primer alkolden (omega) daha baskındır?",
      "answer": "Sekonder C-H bağından hidrojen radikali koparılması sonucu oluşan sekonder alkil radikali, primer radikale göre termodinamik olarak daha kararlıdır.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "mc-mod5-les1-card5",
      "courseId": "medchem",
      "drugOrConcept": "Ester vs Amit Hidroliz Kinetiği (Prokain vs Prokainamid)",
      "prompt": "Lokal anestezik prokain dakikalar içinde inaktive olurken, antiaritmik prokainamid neden saatlerce plazmada kararlı kalır?",
      "answer": "Plazma bütirilkolinesteraz ve karboksilesterazları ester bağını (prokain) saniyeler-dakikalar içinde hidroliz eder; amidazlar ise amit bağını (prokainamid) çok yavaş yıkar (t1/2 ≈ 3-4 saat).",
      "box": 1,
      "intervalDays": 1
    }
  ],
  "translations": {
    "tr": { "title": "Faz I Fonksiyonelleşme: Sitokrom P450 ve Hidroksilasyon Mekanizmaları" },
    "ar": { "title": "المرحلة الأولى من التحول الحيوي: آليات أكسدة وهدرلة CYP450" },
    "en": { "title": "Phase I Functionalization: Cytochrome P450 Hydroxylation Mechanisms" }
  },
  "steps": [
    {
      "id": "mc-mod5-les1-step-01",
      "stage": "hook",
      "stageIndex": 1,
      "type": "predict_reveal",
      "title": {
        "tr": "Fenasetin Bilmecesi: Ağrı Kesen Molekül Hangisi?",
        "ar": "لغز الفيناسيتين: أي الجزيئات يسكن الألم حقاً؟",
        "en": "The Phenacetin Puzzle: Which Molecule Truly Relieves Pain?"
      },
      "prompt": {
        "tr": "Yıllarca ağrı kesici olarak kullanılan fenasetin, karaciğer mikrozomlarında CYP2D6 eksikliği olan hastalarda hiç etki göstermez. Kanda analjezik etkiyi oluşturan asıl molekül kimdir ve karaciğer onu nasıl üretir?",
        "ar": "فشل الفيناسيتين المسكن تاريخياً في تسكين ألم مرضى يعانون من عوز CYP2D6. ما هو الجزيء الحقيقي المسؤول عن التسكين في الدم، وكيف ينتجه الكبد؟",
        "en": "Phenacetin was widely used as an analgesic, yet patients deficient in CYP2D6 experienced zero pain relief. What molecule actually produces the analgesic effect in blood, and how does the liver create it?"
      },
      "predictThenReveal": true,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-1a",
            "text": {
              "tr": "Fenasetin bir ön ilaçtır; karaciğer CYP enzimiyle oksidatif O-deetilasyona uğrayarak etil grubunu formaldehit olarak atar ve aktif parasetamolü açığa çıkarır.",
              "ar": "الفيناسيتين طليعة دوائية؛ يخضع لنزع إيثيل أكسيدي بإنزيمات CYP الكبدية طارحاً الألدهيد ومحرراً الباراسيتامول الفعال.",
              "en": "Phenacetin is a prodrug; hepatic CYP enzymes perform oxidative O-deethylation to cleave the ethyl group, releasing active paracetamol."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Tam isabet! Slayt 20'de gösterildiği gibi fenasetin etil eter yapısındadır. CYP enzimi etil grubunun alfa-karbonunu hidroksiller; oluşan kararsız hemiasetal asetaldehit bırakarak fenolik -OH grubunu (parasetamol) açığa çıkarır. Analjezik etkiyi oluşturan asıl tür parasetamoldür.",
              "ar": "إصابة دقيقة! كما في الشريحة 20، يمتلك الفيناسيتين إيثر إيثيلي. يهدرل CYP كربون ألفا ليتشكل هيمي أسيتال غير مستقر ينشطر محرراً أسيتالدهيد والباراسيتامول الفعال صاحب التأثير المسكن الحقيقي.",
              "en": "Direct hit! As shown in Slide 20, phenacetin is an ethyl ether. CYP oxygenates the alpha-methylene carbon to form an unstable hemiacetal that collapses, liberating acetaldehyde and active paracetamol."
            }
          },
          {
            "id": "opt-1b",
            "text": {
              "tr": "Fenasetin midedeki hidroklorik asit tarafından doğrudan morfine dönüştürülür ve opioid reseptörlerini uyarır.",
              "ar": "يتحول الفيناسيتين بحمض المعدة مباشرة إلى مورفين منشطاً المستقبلات الأفيونية.",
              "en": "Phenacetin is directly converted by stomach gastric acid into morphine, which stimulates opioid receptors."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Mide asidi dönüşümü yanılgısı: Mide asidi eter bağlarını oda sıcaklığında kıramaz ve anilid çekirdeğini morfine çeviremez. Biyotranformasyon karaciğer mikrozomlarında enzimatik olarak yürür.",
              "ar": "خطأ حمض المعدة: يعجز حمض المعدة عن كسر الروابط الإيثرية أو تحويل حلقة الأستيل أنيليد إلى مورفين؛ التحول يتم إنزيمياً بالكبد.",
              "en": "Gastric conversion fallacy: Gastric HCl cannot cleave alkyl ethers or build a phenanthrene morphine skeleton; the reaction is enzymatic in liver microsomes."
            }
          },
          {
            "id": "opt-1c",
            "text": {
              "tr": "Fenasetin böbreklerden saf halde atılır; ağrıyı kesen şey hastanın içtiği bir bardak ılık sudur.",
              "ar": "يُطرح الفيناسيتين نقياً بالكلية؛ والتسكين ناتج عن شرب المريض لكوب ماء دافئ.",
              "en": "Phenacetin is excreted unchanged by the kidneys; pain relief was purely a placebo effect from drinking water."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Plasebo yanılgısı: Fenasetin farmakolojik olarak kanıtlanmış bir analjezik öncüsüdür; metaboliti parasetamol siklooksijenaz (COX) enzimini santral olarak inhibe eder.",
              "ar": "خطأ البلاسيبو: الفيناسيتين دواء حقيقي مثبت، ومستقلبه الفعال الباراسيتامول يثبط إنزيمات سيكلوأكسيجيناز في الجهاز العصبي المركزي.",
              "en": "Placebo fallacy: Phenacetin is a verified xenobiotic whose active metabolite paracetamol inhibits central cyclooxygenase to abolish pain."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "oksidatif O-dealkilasyon", "arContext": "نزع الألكيل الأكسيدي (oxidative O-dealkylation)" },
        { "term": "ön ilaç biyoaktivasyonu", "arContext": "تنشيط الأدوية الطليعية" }
      ],
      "hints": [
        {
          "tr": "Fenasetin molekülü p-etoksiasetanilit yapısındadır (etil eter taşır).",
          "ar": "يمتلك جزيء الفيناسيتين بنية بارا-إيثوكسي أسيتانيليد (إيثر إيثيلي).",
          "en": "Phenacetin possesses a p-ethoxyacetanilide structure containing an ethyl ether."
        },
        {
          "tr": "Parasetamolün kimyasal yapısını hatırlayın: p-asetamidofenol (serbest fenolik -OH taşır).",
          "ar": "تذكر بنية الباراسيتامول: بارا-أسيتاميدوفينول (يحمل مجموعة هيدروكسيل فينولية حرة).",
          "en": "Recall paracetamol's structure: p-acetamidophenol bearing a free phenolic -OH."
        },
        {
          "tr": "Karaciğer CYP450 enzimleri etil grubunu oksitleyerek parasetamole çevirir.",
          "ar": "تؤكسد إنزيمات CYP450 الكبدية مجموعة الإيثيل لتطلق الباراسيتامول.",
          "en": "Hepatic CYP450 oxidizes the ethyl carbon to release free paracetamol and an aldehyde."
        }
      ],
      "sources": [{ "file": "İlaç metabolizması-2026.pdf", "page": 20 }]
    },
    {
      "id": "mc-mod5-les1-step-02",
      "stage": "question",
      "stageIndex": 2,
      "type": "question",
      "title": {
        "tr": "Oksijen Paradoksu: İnert C-H Bağı Nasıl Oksitlenir?",
        "ar": "مفارقة الأكسجين: كيف تتأكسد روابط C-H الخاملة؟",
        "en": "The Oxygen Paradox: How to Oxidize Inert C-H Bonds?"
      },
      "prompt": {
        "tr": "Soluduğumuz moleküler oksijen (O2) oda sıcaklığında son derece tembel ve reaktif olmayan bir gazdır. Karaciğerdeki CYP450 hem demiri, inert bir C-H bağına oksijen sokmak için O2'yi nasıl aktive eder?",
        "ar": "غاز الأكسجين الجزيئي (O2) خامل كيميائياً في حرارة الغرفة. كيف ينشط حديد الهيم في CYP450 الأكسجين ليقحمه داخل رابطة C-H أليفاتية خاملة؟",
        "en": "Molecular oxygen (O2) is triplet ground-state and unreactive toward stable bonds. How does the heme iron of CYP450 activate O2 to insert an oxygen atom into an unreactive aliphatic C-H bond?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-2a",
            "text": {
              "tr": "NADPH-P450 redüktazdan 2 elektron ve proton alarak O2'yi parçalar; aşırı reaktif demir(IV)-okso radikal katyonu ([Fe4+=O]•+) üretir.",
              "ar": "يستقبل إلكترونين من NADPH عبر إنزيم الريدوكتاز ليفصم O2، مولداً جذر حديد(IV)-أوكسو فائق التفاعلية ([Fe4+=O]•+).",
              "en": "It accepts 2 electrons from NADPH via P450 reductase and protons to cleave O2, generating a hyper-reactive iron(IV)-oxo radical cation ([Fe4+=O]•+)."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kusursuz kimyasal kavrayış! Slayt 14 ve Foye Bölüm 4'ün temeli: Sitokrom P450 katalitik döngüsünde Fe3+ heme önce substrate bağlanır, NADPH-redüktazdan ilk elektronu alarak Fe2+'ye indirgenir, O2 bağlar ve ikinci elektronla perokso köprüsü kurar. Su ayrılarak oluşan reaktif tür [Fe4+=O]•+ (okso-ferril radikali) inert C-H bağlarını hidroksilleme gücüne sahiptir.",
              "ar": "إدراك كيميائي فذ! الشريحة 14: يرتبط Fe3+ بالدواء، ويستقبل إلكتروناً أولاً ليصبح Fe2+، ثم يربط O2 ويستقبل الإلكترون الثاني. بانفصال الماء يتشكل جذر [Fe4+=O]•+ (الحديد الأوكسيدي الفيريل) القادر على هدرلة أعتى الروابط الأليفاتية.",
              "en": "Masterful biophysical insight! Slide 14: Substrate binding triggers first electron transfer reducing Fe3+ to Fe2+, binding O2, followed by a second electron and protonation to release H2O and yield the reactive oxo-ferryl radical cation [Fe4+=O]•+."
            }
          },
          {
            "id": "opt-2b",
            "text": {
              "tr": "Enzim sıcaklığını 1000°C'ye çıkararak oksijen moleküllerini plazma alevinde parçalar.",
              "ar": "يرفع الإنزيم حرارته إلى 1000 درجة مئوية ليحرق جزيئات الأكسجين بلهب البلازما.",
              "en": "The enzyme elevates internal temperature to 1000°C, cracking oxygen molecules in a microscopic plasma flame."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Sıcaklık artışı yanılgısı: Canlı sistemler izotermiktir (37°C); enzimler sıcaklığı artıramaz, aktivasyon enerjisini kuantum elektron transferiyle düşürür.",
              "ar": "خطأ الحرارة: الأنظمة الحية تعمل عند 37 مئوية وثابتة الحرارة؛ تخفض الإنزيمات طاقة التنشيط عبر نقل الإلكترونات وليس باللهب.",
              "en": "Thermal combustion fallacy: Biological catalysts function strictly at 37°C; they lower activation barriers via controlled redox transitions, not heat."
            }
          },
          {
            "id": "opt-2c",
            "text": {
              "tr": "CYP450 enzimi demir içermez; magnezyum iyonlarıyla oksijeni nükleer fisyona uğratır.",
              "ar": "لا يحتوي CYP450 على حديد، بل يستعمل المغنيسيوم لشطر الأكسجين انشطاراً نووياً.",
              "en": "CYP450 lacks iron entirely, utilizing magnesium ions to induce nuclear fission of oxygen atoms."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Biyokimya dışı distraktör: CYP450 bir hem-demir proteinidir (protoporfirin IX); nükleer reaksiyonlar biyokimyada yer almaz.",
              "ar": "خطأ كيميائي جسيم: إنزيم CYP450 بروتين هيمي يحتوي الحديد كعنصر محوري؛ والتفاعلات النووية مستحيلة بيولوجياً.",
              "en": "Biochemical absurdity: Cytochrome P450 is a heme iron (protoporphyrin IX) enzyme; nuclear fission does not occur in cell biology."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "okso-ferril radikal katyonu", "arContext": "جذر الحديد الأوكسيدي الفيريل ([Fe4+=O]•+)" },
        { "term": "NADPH-sitokrom P450 redüktaz", "arContext": "إنزيم NADPH-P450 ريدوكتاز" }
      ],
      "hints": [
        {
          "tr": "CYP450 enziminin merkezinde bir hem halkası ve bağlı Fe3+ iyonu bulunur.",
          "ar": "يحتوي مركز إنزيم CYP450 على حلقة هيم متصلة بأيون Fe3+.",
          "en": "The core of Cytochrome P450 contains a heme porphyrin ring coordinating an iron ion."
        },
        {
          "tr": "Oksijenin aktive edilmesi için dışarıdan 2 elektrona (NADPH kofaktörüne) ihtiyaç vardır.",
          "ar": "يتطلب تنشيط الأكسجين زوجاً من الإلكترونات من كوفاكتور NADPH.",
          "en": "Activating oxygen requires 2 electrons delivered sequentially from NADPH."
        },
        {
          "tr": "İki elektron ve iki proton su çıkarır; geriye kalan reaktif tür [Fe4+=O]•+ okso-ferril radikalidir.",
          "ar": "ينتج عن انتقال الإلكترونات والبروتونات خروج جزيء ماء وتشكل جذر [Fe4+=O]•+ فائق التفاعلية.",
          "en": "Water departs, leaving behind the reactive ferryl-oxo intermediate that attacks aliphatic bonds."
        }
      ],
      "sources": [{ "file": "İlaç metabolizması-2026.pdf", "page": 14 }]
    },
    {
      "id": "mc-mod5-les1-step-03",
      "stage": "intuition",
      "stageIndex": 3,
      "type": "intuition",
      "title": {
        "tr": "Sezgisel Model: Oksijen Sıçraması (Radical Rebound)",
        "ar": "النموذج الحدسي: ارتداد الهيدروكسيل الجذري (Oxygen Rebound)",
        "en": "Mental Model: The Radical Rebound Mechanism"
      },
      "prompt": {
        "tr": "CYP450'nin okso-ferril türü [Fe4+=O]•+, ilaç molekülündeki C-H bağına nasıl saldırır? Karbon atomu ile oksijen arasındaki evlilik hangi adımlarla kurulur?",
        "ar": "كيف يهاجم جذر [Fe4+=O]•+ رابطة C-H في جزيء الدواء؟ ما هي الخطوات المجهرية التي تربط ذرة الكربون بالأكسجين؟",
        "en": "How does the activated oxo-ferryl species [Fe4+=O]•+ attack a drug's C-H bond? Through what microscopic sequence is the new C-OH bond forged?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-3a",
            "text": {
              "tr": "Önce C-H bağından bir hidrojen radikali (H•) kopararak Fe-OH ve karbon radikali (C•) üretir; ardından hidroksil grubu hemen geri sıçrayarak (rebound) C-OH bağını kurar.",
              "ar": "ينتزع أولاً جذر هيدروجين (H•) مشكلاً جذر كربونياً و Fe-OH، ثم يرتد جذر الهيدروكسيل فورياً ليرتبط بالكربون صانعاً C-OH.",
              "en": "It first abstracts a hydrogen radical (H•) to generate a carbon radical (C•) and Fe-OH, followed by instantaneous hydroxyl radical rebound to forge C-OH."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Harika sezgi! John Groves tarafından aydınlatılan 'Oksijen Sıçraması' (Oxygen Rebound) mekanizması: 1. Adım: Okso-ferril oksijeni ilaçtaki hidrojeni radikalik koparır (H-abstraction). 2. Adım: Oluşan karbon radikali kafes içinde bekleyen Fe-OH'taki •OH ile pikosaniyeler içinde birleşir (rebound).",
              "ar": "حدس علمي بارع! آلية ارتداد الأكسجين (Oxygen Rebound): الخطوة 1: ينتزع الأكسجين الفيريل ذرة هيدروجين كجذر حر مشكلاً كربوناً جذرياً. الخطوة 2: يرتد جذر •OH في أجزاء من البيكوثانية ليلتحم بالكربون مشكلاً الكحول.",
              "en": "Superb intuition! The Groves 'Oxygen Rebound' mechanism: Step 1 involves hydrogen atom abstraction yielding a transient carbon-centered radical and Fe(IV)-OH. Step 2 is ultrafast radical recombination (rebound) yielding the alcohol."
            }
          },
          {
            "id": "opt-3b",
            "text": {
              "tr": "Oksijen atomu C-C bağı arasına bir kama gibi girerek karbon atomlarını birbirinden koparır.",
              "ar": "يدخل الأكسجين كإسفين بين رابطتي C-C ليفصل ذرات الكربون عن بعضها نهائياً.",
              "en": "The oxygen atom wedges directly into the C-C bond, splitting the carbon backbone in half."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Omurga parçalama yanılgısı: Hidroksilasyon karbon-karbon bağını koparmaz; C-H bağını C-OH bağına dönüştürerek moleküle bir oksijen atomu ekler.",
              "ar": "خطأ شطر الهيكل: لا تفصم الهدرلة روابط C-C بل تحول رابطة C-H إلى C-OH بإدخال ذرة أكسجين وحيدة.",
              "en": "Backbone cleavage misconception: Hydroxylation preserves the carbon framework, inserting oxygen selectively into a C-H bond."
            }
          },
          {
            "id": "opt-3c",
            "text": {
              "tr": "Molekül enzim cebine girmeden önce kanda serbest hidrojen peroksit (H2O2) banyosu yapar.",
              "ar": "يغوص الدواء في سائل بيروكسيد الهيدروجين الحر بالدم قبل دخوله جيب الإنزيم.",
              "en": "The drug molecule bathes in free circulating hydrogen peroxide (H2O2) in blood before entering the enzyme pocket."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Serbest peroksit yanılgısı: Canlı kanda serbest H2O2 dolaşmaz (katalaz hızla parçalar); tüm oksijenasyon CYP450 katalitik cebinde sıkı kontrol altında gerçekleşir.",
              "ar": "خطأ البيروكسيد الحر: لا يدور H2O2 حراً في الدم لتفكيكه بالكاتالاز؛ الأكسدة تتم حصراً داخل الجيب التحفيزي لـ CYP.",
              "en": "Free peroxide misconception: Hydrogen peroxide is strictly contained or degraded by catalase; oxygenation occurs strictly within the enzyme active site."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "oksijen sıçraması (oxygen rebound)", "arContext": "ارتداد الأكسجين الجذري (oxygen rebound)" },
        { "term": "karbon radikali ara ürünü", "arContext": "مركب الكربون الجذري الوسيط" }
      ],
      "hints": [
        {
          "tr": "Okso-ferril radikali hidrojen açlığı çeken güçlü bir kimyasal türdür.",
          "ar": "جذر الأوكسو فيريل جائع لانتزاع الهيدروجين بشراهة كيميائية بالغة.",
          "en": "The oxo-ferryl radical possesses an immense thermodynamic drive to abstract hydrogen."
        },
        {
          "tr": "C-H bağındaki hidrojen bir elektronuyla birlikte oksijene çekildiğinde karbon üzerinde ne kalır?",
          "ar": "عندما يُنتزع الهيدروجين بإلكترونه نحو الأكسجين، ماذا يتبقى على ذرة الكربون؟",
          "en": "When hydrogen is stripped with one electron, an unpaired electron remains on carbon."
        },
        {
          "tr": "Karbon radikali oluştuktan hemen sonra demire bağlı •OH grubu karbona geri sıçrayarak C-OH bağını kapatır.",
          "ar": "فور تشكل جذر الكربون، يرتد جذر •OH من الحديد ليلتحم بالكربون مشكلاً C-OH.",
          "en": "The iron-bound •OH rapidly rebounds onto the transient carbon radical to close the C-OH bond."
        }
      ],
      "sources": [{ "file": "İlaç metabolizması-2026.pdf", "page": 14 }]
    },
    {
      "id": "mc-mod5-les1-step-04",
      "stage": "visual_explanation",
      "stageIndex": 4,
      "type": "visual_explanation",
      "title": {
        "tr": "Aromatik Oksidasyon ve NIH Kayması Mekanizması",
        "ar": "الأكسدة العطرية وآلية انزياح NIH",
        "en": "Aromatic Oxygenation & The NIH Hydride Shift"
      },
      "prompt": {
        "tr": "Benzen halkası CYP450 ile oksitlendiğinde önce kararsız bir aren oksit (epoksit) oluşur. Epoksit açılırken hidrojen atomu neden çözeltiye fırlamak yerine yan karbona göç eder (NIH Kayması)?",
        "ar": "عند أكسدة حلقة البنزين بـ CYP450 يتشكل أكسيد الآرين (إيبوكسيد). عند فتح الإيبوكسيد، لماذا ينتقل الهيدروجين للكربون المجاور (انزياح NIH) بدلاً من الانفصال للمحلول؟",
        "en": "When a benzene ring is oxidized by CYP450, an unstable arene oxide epoxide forms. As it opens, why does the hydrogen atom migrate to the adjacent carbon (NIH Shift) rather than releasing into solvent?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-4a",
            "text": {
              "tr": "Epoksit açıldığında oluşan karbokatyonda pozitif yükü nötralize etmek için 1,2-hidrit göçü gerçekleşir; ardından keto-enol tautomerisi fenolü oluşturur.",
              "ar": "يؤدي فتح الإيبوكسيد لتشكل كربوكاتيون يفرض هجرة هيدريد 1،2 لمعادلة الشحنة، يليه تحول كيتو-إينول مشكلاً الفينول المستقر.",
              "en": "Epoxide cleavage creates a carbocation intermediate that triggers an intramolecular 1,2-hydride shift to relieve charge, followed by keto-enol tautomerism to phenol."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kusursuz mekanizma! Slayt 16 verisi: Aren oksit halkası açıldığında komşu karbonda karbokatyon oluşur. Ulusal Sağlık Enstitüleri'nde (NIH) döteryum izotopuyla kanıtlanan bu olayda, hidrojen atomu 1,2-kayması ile komşu karbona geçer. Oluşan dienon ara ürünü hızla enolize olarak (aromatikleşerek) kararlı fenole dönüşür.",
              "ar": "تحليل كيميائي استثنائي! الشريحة 16: عند فتح حلقة أكسيد الآرين ينشأ كربوكاتيون مجاور. كما أثبتت تجارب النظائر في NIH، يهاجر الهيدروجين انتقالاً داخلياً (1,2-hydride shift)، ثم يستعيد المركب عطريته بالتحول الإينولي السريع إلى فينول.",
              "en": "Flawless mechanistic derivation! Slide 16: Arene oxide ring opening creates a zwitterionic carbocation. Intramolecular 1,2-hydride migration (the NIH shift, proven by deuterium labeling) generates a cyclohexadienone that enolizes to restore aromatic stability."
            }
          },
          {
            "id": "opt-4b",
            "text": {
              "tr": "Aromatik halkadaki tüm karbon atomları yer değiştirerek benzen halkasını 5 üyeli siklopentana küçültür.",
              "ar": "تتبادل جميع ذرات الكربون مواقعها لتتقلص حلقة البنزين السداسية إلى حلقة خماسية.",
              "en": "All aromatic carbon atoms swap positions, permanently shrinking the 6-membered benzene ring into a 5-membered cyclopentane."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Halka küçülmesi yanılgısı: Aromatik 6 üyeli benzen çekirdeği parçalanmaz veya küçülmez; aromatik rezonans enerjisi fenol oluşumuyla tamamen korunur.",
              "ar": "خطأ تقلص الحلقة: لا تتقلص حلقة البنزين أو تفقد سداسيتها؛ بل تستعيد رنينها العطري فورياً عبر التشكل الفينولي.",
              "en": "Ring contraction fallacy: The 6-membered aromatic ring does not contract; resonance stabilization drives rapid enolization back to the intact aromatic phenol."
            }
          },
          {
            "id": "opt-4c",
            "text": {
              "tr": "Hidrojen atomu manyetik bir kuvvetle doğrudan karaciğer hücresinin çekirdeğine çekilir.",
              "ar": "ينجذب بروتون الهيدروجين بقوة مغناطيسية مباشرة إلى نواة الخلية الكبدية.",
              "en": "The hydrogen atom is pulled by magnetic forces directly into the hepatocyte cell nucleus."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Manyetik çekim yanılgısı: Kimyasal reaksiyonlar molekül içi elektron ve orbital örtüşmeleriyle yönetilir, hücresel manyetizma ile değil.",
              "ar": "خطأ الجذب المغناطيسي: تتحكم المدارات الجزيئية وحركة الشحنات بالتفاعلات، ولا وجود لقوى مغناطيسية تسحب البروتونات للنواة.",
              "en": "Magnetic fallacy: Organic mechanisms are dictated by orbital overlap and carbocation thermodynamics, not cellular magnetism."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "aren oksit (epoksit)", "arContext": "أكسيد الآرين (arene oxide)" },
        { "term": "NIH kayması (1,2-hidrit göçü)", "arContext": "انزياح NIH (هجرة هيدريد 1,2)" }
      ],
      "hints": [
        {
          "tr": "CYP450 benzen halkasına saldırdığında ilk ürün 3 üyeli bir aren oksit halkasıdır.",
          "ar": "أول ناتج لهجوم CYP450 على البنزين هو حلقة أكسيد الآرين الثلاثية.",
          "en": "CYP attack on an aromatic bond produces a strained 3-membered arene oxide."
        },
        {
          "tr": "Aren oksit halkası açıldığında yanındaki karbonda pozitif yük (karbokatyon) belirir.",
          "ar": "يولد انفتاح حلقة الإيبوكسيد شحنة موجبة (كربوكاتيون) على ذرة الكربون المجاورة.",
          "en": "Ring opening leaves an electron-deficient carbocation on the adjacent ring carbon."
        },
        {
          "tr": "Pozitif yüke komşu karbon üzerindeki hidrojen 1,2-göçü yapar (NIH kayması) ve keto formu enolize olarak fenole döner.",
          "ar": "يهاجر الهيدروجين هجرة 1،2 لمعادلة الكربوكاتيون، ثم يستعيد المركب عطريته متحولاً إلى فينول.",
          "en": "Intramolecular 1,2-hydride shift neutralizes the cation, forming a ketone that tautomerizes to phenol."
        }
      ],
      "sources": [{ "file": "İlaç metabolizması-2026.pdf", "page": 16 }]
    },
    {
      "id": "mc-mod5-les1-step-05",
      "stage": "interactive_artifact",
      "stageIndex": 5,
      "type": "metabolism_map",
      "widgetType": "MetabolismMap",
      "title": {
        "tr": "İnteraktif Metabolizma Haritası: Diazepam Biyotransformasyonu",
        "ar": "خريطة الاستقلاب التفاعلية: التحول الحيوي للديازيبام",
        "en": "Interactive Metabolism Map: Diazepam Biotransformation Pathways"
      },
      "prompt": {
        "tr": "Diazepam molekülünün Faz I metabolik bölgelerini inceleyin. İlacın sedatif etki süresini 100 saate kadar uzatan majör aktif metabolit yolunu (N1-demetilasyon) harita üzerinde tespit edin.",
        "ar": "استكشف مواقع استقلاب الديازيبام في المرحلة الأولى. حدد المسار الرئيسي المسؤول عن تكوين المستقلب الفعال طويل الأمد (نزع الميثيل N1).",
        "en": "Explore the Phase I metabolic soft-spots on Diazepam. Identify the primary bioactivation site responsible for generating the long-acting sedative metabolite Nordiazepam."
      },
      "predictThenReveal": false,
      "config": {
        "drugName": "Diazepam",
        "prompt": "Nordiazepam aktif metabolitini oluşturan N1-demetilasyon bölgesini seçin.",
        "moleculeSvgDescription": "Diazepam 1,4-benzodiazepin çekirdeği, N1-metil ve C3 pozisyonları",
        "sites": [
          {
            "id": "site_n1_demethylation",
            "label": "N1-Demetilasyon",
            "x": 120,
            "y": 60,
            "enzyme": "CYP2C19 / CYP3A4",
            "phase": "Phase I",
            "reactionType": "Oksidatif N-Dealkilasyon",
            "metaboliteOutcome": "Aktif metabolit Nordiazepam (t1/2 ≈ 50-100 saat) oluşturarak anksiyolitik etki süresini günlerce uzatır.",
            "toxicityFlag": "active_metabolite",
            "isTargetSite": true
          },
          {
            "id": "site_c3_hydroxylation",
            "label": "C3-Alifatik Hidroksilasyon",
            "x": 260,
            "y": 120,
            "enzyme": "CYP3A4",
            "phase": "Phase I",
            "reactionType": "Alifatik C-Hidroksilasyon",
            "metaboliteOutcome": "Temazepam ve takiben Oksazepam aktif metabolitlerine dönüşür; Faz II glukuronidasyonu için hazır -OH açığa çıkar.",
            "toxicityFlag": "active_metabolite",
            "isTargetSite": false
          },
          {
            "id": "site_c4_aromatic_oxidation",
            "label": "C4'-Aromatik Hidroksilasyon",
            "x": 380,
            "y": 200,
            "enzyme": "CYP2C19",
            "phase": "Phase I",
            "reactionType": "Aromatik Oksidasyon (NIH Kayması)",
            "metaboliteOutcome": "4'-Hidroksidiazepam fenolik metabolitini oluşturur; hızla inaktive edilerek atılır.",
            "toxicityFlag": "non_toxic",
            "isTargetSite": false
          }
        ],
        "source": {
          "file": "İlaç metabolizması-2026.pdf",
          "page": 20
        },
        "explanation": "CYP2C19 ve CYP3A4 diazepamın N1-metil grubunu oksitleyerek formaldehit koparır ve nordiazepama dönüştürür. Nordiazepamın eliminasyon yarı ömrü 50-100 saat olup yaşlılarda kümülatif sedasyona yol açar."
      },
      "widget": {
        "type": "MetabolismMap",
        "config": {
          "drugName": "Diazepam",
          "prompt": "Nordiazepam aktif metabolitini oluşturan N1-demetilasyon bölgesini seçin.",
          "moleculeSvgDescription": "Diazepam 1,4-benzodiazepin çekirdeği, N1-metil ve C3 pozisyonları",
          "sites": [
            {
              "id": "site_n1_demethylation",
              "label": "N1-Demetilasyon",
              "x": 120,
              "y": 60,
              "enzyme": "CYP2C19 / CYP3A4",
              "phase": "Phase I",
              "reactionType": "Oksidatif N-Dealkilasyon",
              "metaboliteOutcome": "Aktif metabolit Nordiazepam (t1/2 ≈ 50-100 saat) oluşturarak anksiyolitik etki süresini günlerce uzatır.",
              "toxicityFlag": "active_metabolite",
              "isTargetSite": true
            },
            {
              "id": "site_c3_hydroxylation",
              "label": "C3-Alifatik Hidroksilasyon",
              "x": 260,
              "y": 120,
              "enzyme": "CYP3A4",
              "phase": "Phase I",
              "reactionType": "Alifatik C-Hidroksilasyon",
              "metaboliteOutcome": "Temazepam ve takiben Oksazepam aktif metabolitlerine dönüşür; Faz II glukuronidasyonu için hazır -OH açığa çıkar.",
              "toxicityFlag": "active_metabolite",
              "isTargetSite": false
            },
            {
              "id": "site_c4_aromatic_oxidation",
              "label": "C4'-Aromatik Hidroksilasyon",
              "x": 380,
              "y": 200,
              "enzyme": "CYP2C19",
              "phase": "Phase I",
              "reactionType": "Aromatik Oksidasyon (NIH Kayması)",
              "metaboliteOutcome": "4'-Hidroksidiazepam fenolik metabolitini oluşturur; hızla inaktive edilerek atılır.",
              "toxicityFlag": "non_toxic",
              "isTargetSite": false
            }
          ],
          "source": {
            "file": "İlaç metabolizması-2026.pdf",
            "page": 20
          },
          "explanation": "CYP2C19 ve CYP3A4 diazepamın N1-metil grubunu oksitleyerek formaldehit koparır ve nordiazepama dönüştürür. Nordiazepamın eliminasyon yarı ömrü 50-100 saat olup yaşlılarda kümülatif sedasyona yol açar."
        }
      },
      "technicalTerms": [
        { "term": "oksidatif N-demetilasyon", "arContext": "نزع الميثيل النيتروجيني الأكسيدي" },
        { "term": "aktif metabolit birikimi", "arContext": "تراكم المستقلبات الفعالة" }
      ],
      "hints": [
        {
          "tr": "Nordiazepam, diazepamın N1 pozisyonundaki metil (-CH3) grubunun ayrılmış halidir.",
          "ar": "النورديازيبام هو ديازيبام فاقد لمجموعة الميثيل (-CH3) عند الموضع N1.",
          "en": "Nordiazepam is des-methyl diazepam lacking the N1 methyl substituent."
        },
        {
          "tr": "CYP2C19 ve CYP3A4 heteroatoma komşu metil grubunu oksitleyerek formaldehit açığa çıkarır.",
          "ar": "تؤكسد إنزيمات CYP مجموعة الميثيل المجاورة للنيتروجين محررة فورمالدهيد.",
          "en": "CYP enzymes oxygenate the methyl carbon adjacent to nitrogen, expelling formaldehyde."
        },
        {
          "tr": "N1-Demetilasyon bölgesi haritada hedef aktif metabolit yoludur.",
          "ar": "موقع نزع الميثيل N1 هو مسار المستقلب الفعال المستهدف على الخريطة.",
          "en": "The N1-demethylation locus is the primary target active metabolite pathway."
        }
      ],
      "sources": [{ "file": "İlaç metabolizması-2026.pdf", "page": 20 }]
    },
    {
      "id": "mc-mod5-les1-step-06",
      "stage": "guided_discovery",
      "stageIndex": 6,
      "type": "guided_discovery",
      "title": {
        "tr": "Rehberli Keşif: Oksidatif Dealkilasyonun Kararsız Ara Ürünü",
        "ar": "استكشاف موجه: المركب الوسيط غير المستقر لنزع الألكيل الأكسيدي",
        "en": "Guided Discovery: The Unstable Intermediate of Dealkylation"
      },
      "prompt": {
        "tr": "CYP450 bir N-metil veya O-etil grubunu koparırken heteroatom-karbon bağını doğrudan makas gibi kesmez. Molekülde önce hangi kararsız ara ürün oluşur ve neden kendiliğinden çöker?",
        "ar": "عندما يقتطع CYP450 مجموعة N-ميثيل أو O-إيثيل، فإنه لا يقطع الرابطة مباشرة كمقص. ما هو المركب الوسيط غير المستقر المتشكل ولماذا ينشطر ذاتياً؟",
        "en": "When CYP450 removes an N-methyl or O-ethyl group, it does not directly snip the heteroatom-carbon bond like a pair of scissors. What unstable intermediate forms, and why does it collapse spontaneously?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-6a",
            "text": {
              "tr": "Alkil grubunun alfa-karbonu hidroksillenerek kararsız bir hemiaminal veya hemiasetal oluşur; serbest elektron çifti itmesiyle aldehit koparak ayrılır.",
              "ar": "يهدرل كربون ألفا مشكلاً هيمي أمينال أو هيمي أسيتال غير مستقر؛ فينشطر تلقائياً بطرد الألدهيد بتدافع الإلكترونات.",
              "en": "The alkyl alpha-carbon is hydroxylated to an unstable hemiaminal or hemiacetal; lone-pair repulsion triggers spontaneous collapse to an aldehyde and the dealkylated drug."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Mükemmel kimyasal keşif! Slayt 20 kuralı: R-X-CH3 önce R-X-CH2OH'a (alfa-hidroksialkil) dönüşür. Aynı karbona hem heteroatom (N/O) hem -OH bağlı olması termodinamik olarak son derece kararsızdır; heteroatomun serbest elektron çifti karbon-heteroatom çift bağı oluştururken aldehit (formaldehit) serbest kalır.",
              "ar": "اكتشاف كيميائي استثنائي! قاعدة الشريحة 20: يتحول R-X-CH3 إلى R-X-CH2OH. اجتماع الهيدروكسيل وذرة النيتروجين أو الأكسجين على نفس الكربون يجعل البنية غير مستقرة، فتطرد فورمالدهيد تلقائياً.",
              "en": "Brilliant chemical insight! Slide 20 principle: R-X-CH3 is first oxygenated to an alpha-hydroxyalkyl intermediate [R-X-CH2OH]. Bearing both a heteroatom and an OH on the same carbon creates severe thermodynamic instability, spontaneously eliminating an aldehyde."
            }
          },
          {
            "id": "opt-6b",
            "text": {
              "tr": "Alkil grubu enzim tarafından sıvı azota dondurulur ve çekiç darbesiyle mekanik olarak kırılır.",
              "ar": "تُجمد مجموعة الألكيل بالنيتروجين السائل ثم تُكسر بمطرقة ميكانيكية إنزيمية.",
              "en": "The alkyl group is flash-frozen in liquid nitrogen and mechanically shattered by an enzymatic hammer."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Mekanik çekiç yanılgısı: Biyokimyasal reaksiyonlar makroskopik mekanik aletlerle değil, kovalent bağ elektronlarının orbital etkileşimleriyle yürür.",
              "ar": "خطأ التكسير الميكانيكي: التحولات البيوكيميائية تتبع حركة الإلكترونات في المدارات الجزيئية وليست أدوات كسر فيزيائية عيانية.",
              "en": "Mechanical fallacy: Biological enzymes operate via quantum electron rearrangements and orbital thermodynamics, never mechanical impact."
            }
          },
          {
            "id": "opt-6c",
            "text": {
              "tr": "Heteroatom-karbon bağı fotosentez ışığıyla kırılarak karbon dioksit gazına dönüşür.",
              "ar": "تنكسر الرابطة بضوء التمثيل الضوئي متحولة إلى غاز ثنائي أكسيد الكربون.",
              "en": "The heteroatom-carbon bond is cleaved by photosynthetic sunlight, turning into carbon dioxide gas."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Fotosentez yanılgısı: Karaciğer karanlık bir iç organdır; fotosentez yapmaz. Reaksiyon CYP450 monooksijenazı ve NADPH kofaktörüne bağımlıdır.",
              "ar": "خطأ التمثيل الضوئي: الكبد عضو داخلي محجوب عن الضوء لا يقوم بالتركيب الضوئي، والتفاعل يعتمد حصراً على إنزيمات CYP.",
              "en": "Photosynthesis misconception: The liver is an internal organ without light exposure; dealkylation is driven strictly by dark CYP redox catalysis."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "hemiaminal / carbinolamine", "arContext": "كاربينول أمين / هيمي أمينال (carbinolamine)" },
        { "term": "spontan heterolitik parçalanma", "arContext": "الانشطار غير المتجانس التلقائي" }
      ],
      "hints": [
        {
          "tr": "Bir karbon atomuna aynı anda hem azot (veya oksijen) hem de -OH bağlı olduğunda ne olur?",
          "ar": "ماذا يحدث عند ارتباط ذرة نيتروجين (أو أكسجين) ومجموعة -OH بنفس ذرة الكربون؟",
          "en": "What happens when a single carbon bears both a heteroatom (N or O) and an -OH group?"
        },
        {
          "tr": "Oluşan yapı bir hemiasetal veya hemiaminaldir ve oda sıcaklığında hızla çöker.",
          "ar": "البنية المتشكلة هي هيمي أسيتال أو هيمي أمينال غير مستقرة وتتفكك فوراً.",
          "en": "The resulting geminal adduct is inherently unstable and undergoes rapid expulsion."
        },
        {
          "tr": "Heteroatoma komşu alfa-hidroksilasyon tamamlandığında formaldehit ayrılır ve dealkile ürün açığa çıkar.",
          "ar": "بانفصال الفورمالدهيد الناتج عن هدرلة كربون ألفا، يتحرر المركب منزوع الألكيل.",
          "en": "Alpha-hydroxylation spontaneously eliminates an aldehyde, unmasking the parent heteroatom."
        }
      ],
      "sources": [{ "file": "İlaç metabolizması-2026.pdf", "page": 20 }]
    },
    {
      "id": "mc-mod5-les1-step-07",
      "stage": "formal_explanation",
      "stageIndex": 7,
      "type": "formal_explanation",
      "title": {
        "tr": "Alifatik Oksidasyon: Omega vs (Omega-1) Seçiciliği",
        "ar": "الأكسدة الأليفاتية: انتقائية أوميغا مقابل (أوميغا-1)",
        "en": "Aliphatic Oxidation: Omega vs. (Omega-1) Regioselectivity"
      },
      "prompt": {
        "tr": "Pentobarbital gibi barbitüratların alifatik yan zincirleri karaciğerde oksitlenirken, neden uçtaki primer metil karbonundan (omega) ziyade sondan bir önceki sekonder karbon (omega-1) baskın olarak hidroksillenir?",
        "ar": "عند أكسدة السلسلة الأليفاتية للباربيتورات (كالبنتوباربيتال)، لماذا تُهدرل ذرة الكربون الثانوية قبل الأخيرة (أوميغا-1) مفضلة على الميثيل الطرفي (أوميغا)؟",
        "en": "When the aliphatic side chains of barbiturates (e.g., pentobarbital) undergo hepatic oxidation, why does secondary (omega-1) hydroxylation strongly predominate over terminal (omega) methyl oxidation?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-7a",
            "text": {
              "tr": "Sekonder C-H bağından hidrojen koparılmasıyla oluşan sekonder alkil radikali, primer radikale göre termodinamik olarak çok daha kararlıdır.",
              "ar": "الجذر الكربوني الثانوي الناتج عن نزع هيدروجين من C-H ثانوية أكثر استقراراً ديناميكياً وحرارياً من الجذر الأولي.",
              "en": "Hydrogen abstraction from a secondary methylene C-H yields a secondary alkyl radical, which is thermodynamically far more stable than a primary radical."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Tam bir fiziksel organik kimya zaferi! Slayt 15 ilkesi: C-H bağ enerjileri tersiyer < sekonder < primer sırasını izler. CYP450 okso-ferril radikali en kolay koparabileceği bağı tercih eder; sekonder C-H bağının bağ disosiasyon enerjisi (~395 kJ/mol) primer metilden (~420 kJ/mol) düşüktür. Bu nedenle (omega-1) sekonder alkol metaboliti açık ara baskındır.",
              "ar": "انتصار كيميائي فيزيائي فذ! الشريحة 15: طاقة تفكك روابط C-H تتبع الترتيب: ثالثي < ثانوي < أولي. طاقة كسر الرابطة الثانوية (~395 kJ/mol) أقل من الميثيل الطرفي (~420 kJ/mol)، مما يجعل جذر (أوميغا-1) أسهل تشكلاً ومستقلبه هو السائد.",
              "en": "Physical organic chemistry triumph! Slide 15 principle: C-H bond dissociation energies follow 3° < 2° < 1°. Abstracting a secondary hydrogen requires ~25 kJ/mol less energy than primary C-H, making the (omega-1) radical pathway dramatically favored."
            }
          },
          {
            "id": "opt-7b",
            "text": {
              "tr": "Terminal metil grubu kurşun geçirmez bir zırhla kaplıdır; enzim oraya temas edemez.",
              "ar": "مجموعة الميثيل الطرفية مغلفة بدرع مضاد للرصاص يعجز الإنزيم عن لمسه.",
              "en": "The terminal methyl group is coated in an impenetrable lead shield that physically repels enzymes."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Zırh yanılgısı: Moleküllerde zırh yoktur; omega oksidasyonu da gerçekleşir (karboksilik asit verir) ancak radikal kararlılığı nedeniyle oranı (omega-1)'e göre daha düşüktür.",
              "ar": "خطأ الدرع الخيالي: لا توجد دروع جزيئية؛ أكسدة أوميغا تحدث فعلياً لتعطي حمضاً كربوكسيلياً لكن بنسبة أقل بسبب طاقة الرابطة.",
              "en": "Armor fallacy: Terminal methyls are not shielded; omega oxidation does occur (yielding carboxylic acids), but secondary omega-1 oxidation predominates thermodynamically."
            }
          },
          {
            "id": "opt-7c",
            "text": {
              "tr": "Karaciğer enzimleri sadece çift sayıda karbon içeren molekülleri tanıyabilir.",
              "ar": "تتعرف إنزيمات الكبد على الجزيئات التي تحتوي عدداً زوجياً من الكربون فقط.",
              "en": "Hepatic enzymes can only process substrates that contain an strictly even number of carbon atoms."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Tek/çift karbon kısıtlaması yanılgısı: Sitokrom P450 enzimleri hem tek hem çift sayıda karbon taşıyan yüzlerce farklı ksenobiyotiği kolaylıkla metabolize eder.",
              "ar": "خطأ شفع ووتر الكربون: تؤكسد إنزيمات CYP مئات المركبات بسلاسل فردية وزوجية الكربون دون أي تمييز حسابي.",
              "en": "Parity fallacy: Cytochrome P450 active sites accommodate xenobiotics regardless of whether their carbon chain length is odd or even."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "omega ve (omega-1) oksidasyonu", "arContext": "أكسدة أوميغا و (أوميغا-1)" },
        { "term": "bağ disosiasyon enerjisi (BDE)", "arContext": "طاقة تفكك الرابطة (BDE)" }
      ],
      "hints": [
        {
          "tr": "Alifatik zincirde terminal karbon primer (-CH3), bir önceki karbon sekonderdir (-CH2-).",
          "ar": "في السلسلة الأليفاتية، الكربون الطرفي أولي (-CH3) وما قبله ثانوي (-CH2-).",
          "en": "In an alkyl chain, the terminal carbon is primary (-CH3) and the internal carbon is secondary (-CH2-)."
        },
        {
          "tr": "Organik kimyada radikal kararlılığı sıralamasını hatırlayın: Tersiyer > Sekonder > Primer.",
          "ar": "تذكر ترتيب استقرار الجذور الحرة في الكيمياء العضوية: ثالثي > ثانوي > أولي.",
          "en": "Recall radical intermediate stability in organic chemistry: Tertiary > Secondary > Primary."
        },
        {
          "tr": "Sekonder radikali oluşturmak daha az enerji gerektirdiği için (omega-1) hidroksilasyonu majör yoldur.",
          "ar": "تشكيل الجذر الثانوي يتطلب طاقة أقل، مما يجعل هدرلة (أوميغا-1) هي المسار الغالب.",
          "en": "Because secondary C-H bonds have lower dissociation energy, (omega-1) hydroxylation is energetically favored."
        }
      ],
      "sources": [{ "file": "İlaç metabolizması-2026.pdf", "page": 15 }]
    },
    {
      "id": "mc-mod5-les1-step-08",
      "stage": "concept_check",
      "stageIndex": 8,
      "type": "concept_check",
      "title": {
        "tr": "Kavram Kontrolü: Amfetamin ve Oksidatif Deaminasyon",
        "ar": "تحقق المفاهيم: الأمفيتامين ونزع الأمين الأكسيدي",
        "en": "Concept Check: Amphetamine & Oxidative Deamination"
      },
      "prompt": {
        "tr": "Amfetamin primer bir amin taşır. CYP450 enzimi amfetaminin amino grubuna komşu alfa-karbonunu hidroksillediğinde ortaya hangi son ürünler çıkar?",
        "ar": "يحمل الأمفيتامين أميناً أولياً. عندما يهدرل إنزيم CYP450 كربون ألفا المجاور لمجموعة الأمين، ما هي النواتج النهائية المتشكلة؟",
        "en": "Amphetamine bears a primary aliphatic amine. When Cytochrome P450 hydroxylates the alpha-carbon adjacent to the amine group, what final products are generated?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-8a",
            "text": {
              "tr": "Oluşan kararsız karbinolamin kendiliğinden amonyak (NH3) gazı bırakarak fenilasetona (keton) dönüşür.",
              "ar": "ينشطر الكاربينول أمين غير المستقر تلقائياً طارحاً غاز الأمونيا (NH3) ومتحولاً إلى فينيل أسيتون (كيتون).",
              "en": "The unstable carbinolamine intermediate spontaneously eliminates ammonia (NH3) gas, collapsing into phenylacetone (ketone)."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Harika! Slayt 21'deki klasik mekanizma: Primer aminlerde alfa-hidroksilasyon imin/karbinolamin ara ürünü üretir. Su ve elektron düzenlenmesiyle amonyak (NH3) ayrılır ve molekül keton türevine (fenilaseton) dönüşerek santral stimülan etkisini tamamen kaybeder.",
              "ar": "رائع! آلية الشريحة 21 الكلاسيكية: في الأمينات الأولية ينتج عن هدرلة كربون ألفا وسيط هيمي أمينال ينشطر طارحاً الأمونيا ومكوناً فينيل أسيتون فاقد للفعالية المنبهة.",
              "en": "Spot on! Slide 21 textbook mechanism: Alpha-hydroxylation of a primary amine produces an unstable carbinolamine. Loss of ammonia (NH3) yields phenylacetone, terminating central stimulant activity."
            }
          },
          {
            "id": "opt-8b",
            "text": {
              "tr": "Amonyak yerine siyanür gazı (HCN) açığa çıkar ve anında zehirlenmeye yol açar.",
              "ar": "يتحرر غاز السيانيد السام (HCN) بدلاً من الأمونيا مسبباً تسمماً فورياً.",
              "en": "Highly lethal hydrogen cyanide (HCN) gas is released instead of ammonia, causing immediate cytotoxicity."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Toksik gaz yanılgısı: Primer amin deaminasyonunda azot atomu toksik siyanür olarak değil, zararsız fizyolojik amonyum/amonyak (NH3) olarak ayrılır ve üre döngüsüne girer.",
              "ar": "خطأ الغاز السام: يتحرر النيتروجين كأمونيا فيزيولوجية (NH3) تدخل دورة اليوريا الكبدية للتخلص منها، ولا يتكون سيانيد إطلاقاً.",
              "en": "Cyanide fallacy: Deamination releases non-toxic physiological ammonia (NH3), which is safely cleared by the hepatic urea cycle, never cyanide."
            }
          },
          {
            "id": "opt-8c",
            "text": {
              "tr": "Amfetaminin benzen halkası patlar ve molekül 3 adet asetilene parçalanır.",
              "ar": "تنفجر حلقة البنزين في الأمفيتامين ويتفتت الجزيء إلى 3 جزيئات أسيتيلين.",
              "en": "Amphetamine's benzene ring detonates, fragmenting the molecule into 3 molecules of acetylene."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Aromatik patlama yanılgısı: Benzen halkası aromatik rezonans enerjisi (150 kJ/mol) nedeniyle son derece kararlıdır; patlamaz veya asetilene parçalanmaz.",
              "ar": "خطأ انفجار الحلقة: حلقة البنزين فائقة الاستقرار بفعل طاقة الرنين العطرية؛ ولا تنفجر أو تتفكك إلى أسيتيلين بيولوجياً.",
              "en": "Ring detonation fallacy: Benzene possesses ~150 kJ/mol of aromatic resonance stabilization; it never undergoes spontaneous biological fragmentation into acetylene."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "oksidatif deaminasyon", "arContext": "نزع الأمين الأكسيدي (oxidative deamination)" },
        { "term": "amonyak eliminasyonu", "arContext": "طرح الأمونيا" }
      ],
      "hints": [
        {
          "tr": "Amfetaminde azot atomu primer amin halindedir (-CH(CH3)-NH2).",
          "ar": "تحمل جزيئة الأمفيتامين أميناً أولياً مرتبطاً بكربون ألفا (-CH(CH3)-NH2).",
          "en": "Amphetamine contains a primary amine located on a chiral alpha-carbon."
        },
        {
          "tr": "Alfa-karbon hidroksillendiğinde ortaya çıkan C(OH)-NH2 grubu kararsızdır.",
          "ar": "المجموعة الناتجة عن هدرلة كربون ألفا C(OH)-NH2 غير مستقرة كيميائياً.",
          "en": "The resulting geminal carbinolamine C(OH)-NH2 is chemically transient."
        },
        {
          "tr": "Azot atomu amonyak (NH3) olarak ayrılırken geriye keton (fenilaseton) kalır.",
          "ar": "ينفصل النيتروجين كغاز أمونيا (NH3) متبقياً كيتون (فينيل أسيتون).",
          "en": "Nitrogen departs as ammonia (NH3), leaving behind the neutral ketone phenylacetone."
        }
      ],
      "sources": [{ "file": "İlaç metabolizması-2026.pdf", "page": 21 }]
    },
    {
      "id": "mc-mod5-les1-step-09",
      "stage": "application",
      "stageIndex": 9,
      "type": "clinical_vignette",
      "title": {
        "tr": "Klinik Vaka: Prokain (Ester) vs Prokainamid (Amit) Kinetiği",
        "ar": "حالة سريرية: حركية البروكائين (إستر) مقابل البروكايناميد (أميد)",
        "en": "Clinical Vignette: Procaine (Ester) vs. Procainamide (Amide) Kinetics"
      },
      "prompt": {
        "tr": "Lokal anestezik prokain (ester) enjeksiyondan 15 dakika sonra plazmada tamamen parçalanırken, benzer yapıdaki antiaritmik prokainamid (amit) saatlerce kanda kalır. Bu kinetik uçurumun kimyasal nedeni nedir?",
        "ar": "يتفكك مخدر البروكائين (إستر) كلياً خلال 15 دقيقة في البلازما، بينما يمكث شبيهه البروكايناميد (أميد) ساعات بالدم لعلاج اللانظميات. ما سبب هذا الفارق الحركي؟",
        "en": "Local anesthetic procaine (ester) is completely cleared within 15 minutes of injection, whereas procainamide (amide) persists in blood for 4 hours to treat arrhythmias. What chemical principle explains this kinetic gap?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-9a",
            "text": {
              "tr": "Kandaki psödokolinesterazlar esterleri (prokain) dakikalar içinde yıkar; amit bağındaki azot rezonansı ise bağı kararlı kılar ve hepatik amidazlarca çok yavaş hidroliz edilir.",
              "ar": "تحلمه كولين إستراز البلازما الإستر (بروكائين) في دقائق؛ بينما يعزز رنين نيتروجين الأميد ثبات الرابطة ويجعل حلمهتها الكبدية بطيئة للغاية.",
              "en": "Blood pseudocholinesterases hydrolyze esters (procaine) within minutes; nitrogen lone-pair resonance stabilizes amide bonds, making procainamide hydrolysis by amidases orders of magnitude slower."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Harika klinik kavrayış! Slayt 28 ve Modül 3 biyoizosterizm prensibi: Plazmada bol miktarda bulunan psödokolinesteraz ve karboksilesteraz enzimleri ester bağını hızla yarar (prokain t1/2 < 1 dk). Amit grubundaki azotun serbest elektron çifti karbonil ile rezonans yaparak çift bağ karakteri kazandırır (%40). Bu rezonans kararlılığı ve amidazların düşük hızı nedeniyle prokainamid 3-4 saatlik yarı ömre ulaşır.",
              "ar": "ربط سريري فذ! الشريحة 28: إسترازات البلازما تشطر الإستر في لمح البصر (بروكائين t1/2 < 1 دقيقة). بينما يمنح رنين زوج إلكترونات النيتروجين في الأميد خواص الرابطة المضاعفة (40%)، مما يمنحه ثباتاً هائلاً ونصف عمر 3-4 ساعات.",
              "en": "Superb clinical insight! Slide 28 benchmark: Abundant circulating butyrylcholinesterases cleave ester procaine within seconds. In procainamide, nitrogen lone-pair delocalization imparts partial double-bond character to the amide, resisting esterases and demanding slow amidase clearance (t1/2 ≈ 3-4 hours)."
            }
          },
          {
            "id": "opt-9b",
            "text": {
              "tr": "Prokainamid molekülü demir içerdiği için plazma enzimlerini manyetik olarak felç eder.",
              "ar": "يحتوي البروكايناميد على حديد يشل إنزيمات البلازما مغناطيسياً.",
              "en": "Procainamide contains metallic iron that magnetically paralyzes circulating plasma esterases."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Metal içeriği yanılgısı: Prokainamid demir içermez; saf organik bir moleküldür. Enzimatik direnç metalden değil kimyasal amit bağının rezonans enerjisinden kaynaklanır.",
              "ar": "خطأ المحتوى المعدني: البروكايناميد جزيء عضوي خالٍ من المعادن؛ ومقاومته للتحلل نابعة من رنين الرابطة الأميدية التساهمية.",
              "en": "Metallic fallacy: Procainamide is a metal-free organic amide; its metabolic resistance stems purely from amide resonance stabilization."
            }
          },
          {
            "id": "opt-9c",
            "text": {
              "tr": "Prokain kanda hidroliz olmaz; sadece böbreklerden ışık hızında süzülür.",
              "ar": "لا يتحلمه البروكائين في الدم بل يُرشح كلوياً بسرعة فائقة كسرعة الضوء.",
              "en": "Procaine does not undergo blood hydrolysis; it is merely filtered through glomeruli at the speed of light."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Böbrek süzülmesi yanılgısı: Prokain böbreğe ulaşamadan kanda plazma esterazları tarafından PABA ve dietilaminoetanole parçalanır.",
              "ar": "خطأ الترشيح الكلوي: يتحلل البروكائين إنزيمياً بالدم قبل وصوله للكلية إلى PABA ودي إيثيل أمينو إيثانول.",
              "en": "Renal filtration fallacy: Procaine is extensively cleaved intravascularly by plasma esterases long before reaching the renal capillaries."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "plazma psödokolinesterazı", "arContext": "كولين إستراز البلازما الكاذب" },
        { "term": "amit rezonans kararlılığı", "arContext": "ثبات الرنين في الرابطة الأميدية" }
      ],
      "hints": [
        {
          "tr": "Prokain bir karboksilik asit esteri (-COO-), prokainamid ise bir amittir (-CONH-).",
          "ar": "البروكائين إستر كربوكسيلي (-COO-)، بينما البروكايناميد أميد (-CONH-).",
          "en": "Procaine features an ester (-COO-), while procainamide features an amide (-CONH-)."
        },
        {
          "tr": "Kanda ve dokularda yaygın bulunan esteraz enzimleri ester bağlarını saniyeler içinde hidroliz eder.",
          "ar": "إنزيمات الإستراز المتوفرة في البلازما تحلمه روابط الإستر في ثوانٍ معدودة.",
          "en": "Ubiquitous plasma esterases cleave ester bonds within seconds to minutes."
        },
        {
          "tr": "Amit bağı azotunun rezonansı bağı güçlendirir; bu yüzden karaciğer amidazları amiti çok daha yavaş yıkar.",
          "ar": "رنين إلكترونات نيتروجين الأميد يضاعف قوة الرابطة فتتحلل ببطء شديد بواسطة الأميداز الكبدي.",
          "en": "Amide resonance imparts partial double-bond character, rendering procainamide refractory to plasma esterases."
        }
      ],
      "sources": [{ "file": "İlaç metabolizması-2026.pdf", "page": 28 }]
    },
    {
      "id": "mc-mod5-les1-step-10",
      "stage": "retrieval",
      "stageIndex": 10,
      "type": "retrieval",
      "title": {
        "tr": "Aralıklı Hatırlama: Aktif Metabolit Kaskadı",
        "ar": "استرجاع تباعدي: تتابع المستقلبات الفعالة",
        "en": "Spaced Retrieval: The Active Metabolite Cascade"
      },
      "prompt": {
        "tr": "Diazepam vücutta önce Nordiazepam'a, ardından Oksazepam'a metabolize olur. Bu iki basamaklı Faz I kaskadında sırasıyla hangi iki kimyasal reaksiyon gerçekleşir?",
        "ar": "يتحول الديازيبام في الجسم إلى نورديازيبام ثم إلى أوكسازيبام. ما هما التفاعلان الكيميائيان المتتاليان في هذه السلسلة من المرحلة الأولى؟",
        "en": "Diazepam is metabolically transformed into Nordiazepam and subsequently into Oxazepam. What two sequential Phase I reactions drive this active cascade?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-10a",
            "text": {
              "tr": "1. Basamak: N1-Demetilasyon (Nordiazepam); 2. Basamak: C3-Alifatik Hidroksilasyon (Oksazepam).",
              "ar": "الخطوة 1: نزع ميثيل N1 (نورديازيبام)؛ الخطوة 2: هدرلة أليفاتية عند C3 (أوكسازيبام).",
              "en": "Step 1: Oxidative N1-demethylation (yielding Nordiazepam); Step 2: Aliphatic C3-hydroxylation (yielding Oxazepam)."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kusursuz hatırlama! Slayt 6 ve 20: Diazepam önce N1-pozisyonundaki metil grubunu CYP2C19/3A4 ile kaybederek Nordiazepam olur. Ardından CYP3A4 7 üyeli diazepin halkasının C3 karbonunu hidroksilleyerek Oksazepam'ı üretir. Her iki ürün de güçlü sedatiftir.",
              "ar": "استرجاع مثالي! شريحة 6 و 20: يفقد الديازيبام أولاً ميثيل N1 ليصبح نورديازيبام، ثم يهدرل CYP3A4 كربون C3 في حلقة الديازيبين لينتج الأوكسازيبام. وكلا المستقلبين مهدئان نشطان.",
              "en": "Flawless retrieval! Slides 6 & 20: Diazepam first undergoes N1-demethylation to yield nordiazepam. Subsequent C3-hydroxylation of the diazepine ring generates oxazepam. Both metabolites retain potent GABA-A sedative activity."
            }
          },
          {
            "id": "opt-10b",
            "text": {
              "tr": "1. Basamak: Glukuronidasyon; 2. Basamak: Sülfat konjugasyonu.",
              "ar": "الخطوة 1: الاقتران بالجلوكورونيد؛ الخطوة 2: الاقتران بالكبريتات.",
              "en": "Step 1: Glucuronidation conjugation; Step 2: Sulfate ester conjugation."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Faz karışıklığı yanılgısı: Glukuronidasyon ve sülfasyon Faz II sentetik konjugasyonlarıdır; oksazepam üretimi ise Faz I fonksiyonelleşmesidir (oksidasyon).",
              "ar": "خطأ خلط المراحل: الجلوكورونيد والكبريتات من تفاعلات المرحلة الثانية، بينما إنتاج الأوكسازيبام أكسدة من المرحلة الأولى.",
              "en": "Phase confusion: Glucuronidation and sulfation are Phase II synthetic conjugations; oxazepam generation is entirely Phase I oxidation."
            }
          },
          {
            "id": "opt-10c",
            "text": {
              "tr": "1. Basamak: Klor atomunun sodyumla değişimi; 2. Basamak: Halkanın açılması.",
              "ar": "الخطوة 1: استبدال ذرة الكلور بصوديوم؛ الخطوة 2: انفتاح الحلقة.",
              "en": "Step 1: Displacement of the chlorine atom by sodium; Step 2: Cleavage of the diazepine ring."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Aromatik klor değişimi yanılgısı: Diazepamın C7 klor atomu metabolik olarak son derece kararlıdır ve değişmez; halka da intakt kalır.",
              "ar": "خطأ استبدال الكلور: ذرة الكلور C7 في الديازيبام خاملة استقلابياً ولا تُستبدل، وتبقى الحلقة سليمة.",
              "en": "Chlorine substitution misconception: The C7 aryl chloride is metabolically inert during initial Phase I pathways; the heterocyclic ring remains closed."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "kaskad metabolizması", "arContext": "تتابع الاستقلاب (metabolic cascade)" },
        { "term": "C3-hidroksilasyonu", "arContext": "الهدرلة عند الموضع C3" }
      ],
      "hints": [
        {
          "tr": "İlk basamakta diazepamın N1 atomuna bağlı bir karbonlu metil grubu ayrılır.",
          "ar": "في الخطوة الأولى تُقتطع مجموعة الميثيل ذات الكربون الواحد من ذرة N1.",
          "en": "The first step cleaves the one-carbon methyl group linked to nitrogen N1."
        },
        {
          "tr": "İkinci basamakta 7 üyeli diazepin halkasına bir hidroksil (-OH) grubu eklenir.",
          "ar": "في الخطوة الثانية تُضاف مجموعة هيدروكسيل (-OH) لحلقة الديازيبين.",
          "en": "The second step introduces a hydroxyl group (-OH) onto the diazepine ring at position 3."
        },
        {
          "tr": "Sıralama: N-demetilasyon (Nordiazepam) ardından C3-hidroksilasyondur (Oksazepam).",
          "ar": "الترتيب هو: نزع الميثيل N1 (نورديازيبام) يليه هدرلة C3 (أوكسازيبام).",
          "en": "The sequence is N1-demethylation followed by C3-hydroxylation."
        }
      ],
      "sources": [{ "file": "İlaç metabolizması-2026.pdf", "page": 6 }]
    },
    {
      "id": "mc-mod5-les1-step-11",
      "stage": "connection",
      "stageIndex": 11,
      "type": "connection",
      "title": {
        "tr": "Geniş Bağlantı: Epoksit Hidrolaz ve Toksikolojik Kalkan",
        "ar": "آفاق متقدمة: إيبوكسيد هيدرولاز والدرع السمومي الخلوي",
        "en": "Broader Connection: Epoxide Hydrolase as a Toxicological Shield"
      },
      "prompt": {
        "tr": "Aromatik hidroksilasyonda oluşan aren oksitler (epoksitler) son derece reaktif elektrofillerdir. Karaciğerdeki Epoksit Hidrolaz enzimi bu kanserojenik reaktifleri nasıl etkisiz hale getirir?",
        "ar": "تعد أكاسيد الآرين (الإيبوكسيدات) الناتجة عن الأكسدة العطرية إلكتروفيلات عالية الخطورة. كيف يبطل إنزيم إيبوكسيد هيدرولاز الكبدي سميتها ويمنع السرطان؟",
        "en": "Arene oxide epoxides formed during aromatic oxygenation are mutagens and electrophiles. How does hepatic Epoxide Hydrolase neutralize these reactive intermediates to prevent cellular toxicity?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-11a",
            "text": {
              "tr": "Aren oksit halkasına su molekülü (H2O) katarak DNA'ya bağlanamayan kararlı trans-dihidrodiollere hidroliz eder.",
              "ar": "يضيف جزيء ماء (H2O) إلى حلقة أكسيد الآرين محولاً إياها إلى مركب trans-dihydrodiol المستقر العاجز عن طفرة DNA.",
              "en": "It adds a water molecule (H2O) across the arene oxide ring, converting it into a stable trans-dihydrodiol that cannot alkylate DNA."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Harika toksikolojik kavrayış! Slayt 16 ve 29: Eğer aren oksit hemen hidroliz edilmezse hücredeki nükleofilik DNA bazlarına ve protein tiyollerine kovalent bağlanarak mutajenez ve doku nekrozu yapar. Mikrozomal ve sitozolik Epoksit Hidrolaz enzimi stereospesifik su katılmasıyla trans-dihidrodiolleri oluşturur ve DNA'yı kollar.",
              "ar": "رؤية سمومية متعمقة! الشريحة 16 و 29: إذا نجا أكسيد الآرين من التحلل، يهاجم قواعد DNA وبروتينات الخلية بروابط تساهمية مسبباً السرطان والتنخر. يتدخل إيبوكسيد هيدرولاز بإضافة الماء ليصنع مركب trans-dihydrodiol الآمن.",
              "en": "Profound toxicological bridge! Slides 16 & 29: Unchecked arene oxides alkylate guanine bases in DNA, initiating carcinogenesis. Epoxide Hydrolase provides a defensive shield, catalyzing trans-addition of H2O to generate unreactive dihydrodiols."
            }
          },
          {
            "id": "opt-11b",
            "text": {
              "tr": "Epoksit halkasını güneş paneli gibi kullanarak hücreye elektrik enerjisi üretir.",
              "ar": "يستعمل حلقة الإيبوكسيد كخلية شمسية لتوليد الطاقة الكهربائية داخل الخلية.",
              "en": "It utilizes the epoxide ring as a photovoltaic solar cell to supply electricity to the cell."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Güneş enerjisi yanılgısı: Canlı dokularda fotovoltaik elektrik üretimi yoktur; epoksit hidrolizi enzimatik nükleofilik su katılmasıdır.",
              "ar": "خطأ الطاقة الشمسية: لا تولد الخلايا كهرباء شمسية من المستقلبات؛ التفاعل حلمهة إنزيمية مائية بحتة.",
              "en": "Photovoltaic fallacy: Biological tissues do not produce solar electricity; epoxide clearance is classical stereospecific enzymatic hydration."
            }
          },
          {
            "id": "opt-11c",
            "text": {
              "tr": "Epoksitleri doğrudan solunum havasıyla gaz halinde akciğerlerden dışarı üfler.",
              "ar": "يطرد الإيبوكسيدات غازياً مع هواء الزفير مباشرة عبر الرئتين.",
              "en": "It blows epoxides directly out of the body as volatile gases in expired lung air."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Akciğerle üfleme yanılgısı: Aren oksitler uçucu gazlar değildir; yüksek oranda reaktif katı-sıvı organik elektrofillerdir ve enzimatik detoksifikasyon gerektirir.",
              "ar": "خطأ الزفير: أكاسيد الآرين ليست غازات متطايرة بل إلكتروفيلات عالية التفاعلية تتطلب تحولاً كيميائياً مائياً للتخلص منها.",
              "en": "Volatilization fallacy: Arene oxides are highly reactive, non-volatile electrophilic intermediates that demand immediate in situ chemical hydration."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "epoksit hidrolaz", "arContext": "إنزيم إيبوكسيد هيدرولاز (epoxide hydrolase)" },
        { "term": "trans-dihidrodiol metaboliti", "arContext": "مستقلب trans-dihydrodiol" }
      ],
      "hints": [
        {
          "tr": "Epoksitler üç üyeli gergin ve elektrofilik eter halkalarıdır.",
          "ar": "الإيبوكسيدات حلقات إيثرية ثلاثية مجهدة وشديدة الألفة للإلكترونات.",
          "en": "Epoxides are strained 3-membered cyclic ethers that act as electrophiles."
        },
        {
          "tr": "Hücredeki nükleofilik DNA bazları bu halkaya saldırırsa mutasyon oluşur.",
          "ar": "إذا هاجمت قواعد DNA النيوكليوفيلية هذه الحلقة تحدث طفرات سرطانية.",
          "en": "If cellular nucleophiles (DNA, proteins) attack the ring, mutations and necrosis occur."
        },
        {
          "tr": "Epoksit hidrolaz su (H2O) katarak iki hidroksil grubu içeren trans-dihidrodiol türevine çevirir.",
          "ar": "يضيف إيبوكسيد هيدرولاز الماء ليحوله إلى مركب diol يحمل مجموعتي هيدروكسيل غير ضار.",
          "en": "Epoxide hydrolase adds water to open the ring into a benign trans-dihydrodiol."
        }
      ],
      "sources": [{ "file": "İlaç metabolizması-2026.pdf", "page": 29 }]
    },
    {
      "id": "mc-mod5-les1-step-12",
      "stage": "mastery_check",
      "stageIndex": 12,
      "type": "mastery_check",
      "title": {
        "tr": "Ustalık Sınavı: Döteryum Kinetik İzotop Etkisi ve İlaç Tasarımı",
        "ar": "اختبار التمكن: تأثير نظائر الديوتيريوم الحركي وتصميم الأدوية",
        "en": "Mastery Check: Deuterium Kinetic Isotope Effect in Drug Design"
      },
      "prompt": {
        "tr": "Bir ilaç adayının metabolik zayıf noktasındaki C-H bağı döteryum (C-D) ile değiştirilir. C-D bağının disosiasyon enerjisi daha yüksek olduğundan (kH/kD ≈ 6.5), Faz I klirensi ve yarı ömrü nasıl değişir?",
        "ar": "استُبدلت رابطة C-H برابطة ديوتيريوم (C-D) في موقع استقلابي ضعيف. مع ارتفاع طاقة تفكك C-D (kH/kD ≈ 6.5)، كيف يتأثر معدل التصفية ونصف العمر الحيوي للدواء؟",
        "en": "A metabolic soft-spot C-H bond is deuterated to C-D. Since C-D has higher zero-point bond energy (kH/kD ≈ 6.5), how do the drug's Phase I metabolic clearance and elimination half-life respond?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-12a",
            "text": {
              "tr": "C-D bağının CYP450 tarafından koparılması yavaşlar; metabolik klirens dramatik şekilde düşer ve eliminasyon yarı ömrü belirgin biçimde uzar.",
              "ar": "يتباطأ كسر رابطة C-D بواسطة CYP450؛ فتهبط التصفية الاستقلابية بشكل ملحوظ ويمتد نصف عمر الإطراح الدوائي طويلاً.",
              "en": "CYP-mediated hydrogen abstraction slows markedly; metabolic clearance plunges and elimination half-life is substantially prolonged."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Muazzam bir farmasötik kimya ustalığı! Kinetik İzotop Etkisi (KIE): Döteryum hidrojenden iki kat ağırdır; C-D bağının sıfır noktası titreşim enerjisi daha düşüktür ve bağı kırmak ~5 kJ/mol daha fazla enerji ister. CYP450'nin hız kısıtlayıcı basamağı C-H koparılması olduğundan, döterizasyon reaksiyon hızını 6-7 kat yavaşlatır. Bu strateji FDA onaylı döterlenmiş ilaçlarda (örn. dötotetrabenazin) günde tek doza geçişi sağlamıştır.",
              "ar": "تمكن كيميائي صيدلاني استثنائي! تأثير النظائر الحركي (KIE): الديوتيريوم أثقل بمرتين من الهيدروجين، ورابطة C-D أقوى بنحو 5 kJ/mol. بما أن كسر الرابطة هو الخطوة المحددة للسرعة في CYP450، فإن استبدالها بديوتيريوم يبطئ الأيض 6-7 أضعاف، وهو أساس الأدوية المديترة مثل deutetrabenazine.",
              "en": "Flawless mastery! Kinetic Isotope Effect (KIE): Deuterium doubles hydrogen's atomic mass, lowering zero-point vibrational energy and requiring ~5 kJ/mol more activation energy to break. Because C-H abstraction is the rate-limiting step in CYP catalysis, deuteration slows clearance by 6-7 fold (pioneered in FDA-approved deutetrabenazine)."
            }
          },
          {
            "id": "opt-12b",
            "text": {
              "tr": "Döteryum radyoaktif olduğundan molekül 3 saniye içinde patlayarak karaciğeri yok eder.",
              "ar": "الديوتيريوم مادة مشعة تجعل الجزيء ينفجر خلال 3 ثوانٍ مدمراً الكبد.",
              "en": "Deuterium is highly radioactive, causing the drug to detonate within 3 seconds and incinerate the liver."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Radyoaktivite yanılgısı: Döteryum (ağır hidrojen, 2H) kararlı ve tamamen non-radyoaktif bir izotoptur; radyoaktif olan trityumdur (3H).",
              "ar": "خطأ النشاط الإشعاعي: الديوتيريوم نظير طبيعي مستقر وغير مشع تماماً؛ النظير المشع للهيدروجين هو التريتيوم (3H).",
              "en": "Radioactivity misconception: Deuterium (2H) is a completely stable, non-radioactive isotope; radioactive hydrogen is tritium (3H)."
            }
          },
          {
            "id": "opt-12c",
            "text": {
              "tr": "Döteryum eklenmesi enzimin molekülü tanımasını tamamen engeller ve ilaç kanda ömür boyu kalır.",
              "ar": "يمنع الديوتيريوم تعرف الإنزيم على الدواء نهائياً ليمكث الدواء في الدم مدى الحياة.",
              "en": "Deuterium completely abolishes enzyme binding, forcing the drug to circulate in blood for the patient's entire lifetime."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kalıcı kalış yanılgısı: Döteryum atomunun van der Waals yarıçapı hidrojenle neredeyse aynıdır (izosteriktir); enzime bağlanmayı engellemez, yalnızca bağın kopma kinetiğini yavaşlatır.",
              "ar": "خطأ البقاء الأبدي: يمتلك الديوتيريوم حجماً فراغياً مطابقاً للهيدروجين؛ لذا يرتبط بالإنزيم بنفس الألفة ولكن سرعة الكسر فقط هي التي تتباطأ.",
              "en": "Steric obstruction fallacy: Deuterium has virtually identical steric dimensions to protium (it is isosteric); binding is unaffected, only the transition state bond cleavage rate is impeded."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "kinetik izotop etkisi (KIE)", "arContext": "تأثير النظائر الحركي (kinetic isotope effect)" },
        { "term": "metabolik stabilite optimizasyonu", "arContext": "تحسين الثباتية الاستقلابية" }
      ],
      "hints": [
        {
          "tr": "Döteryum hidrojenin bir nötron fazlası olan kararlı ağır izotopudur.",
          "ar": "الديوتيريوم نظير ثقيل ومستقر للهيدروجين يحمل نيوتروناً إضافياً.",
          "en": "Deuterium is a stable, non-radioactive heavy isotope of hydrogen."
        },
        {
          "tr": "C-D bağı C-H bağına göre daha kuvvetlidir ve koparılması daha zordur.",
          "ar": "رابطة C-D أقوى وأكثر ثباتاً من رابطة C-H ويصعب كسرها.",
          "en": "The C-D bond has lower zero-point energy and is significantly harder to break."
        },
        {
          "tr": "CYP450 enzimi C-D bağını çok daha yavaş koparır; bu durum ilacın yarı ömrünü uzatır.",
          "ar": "يكسر CYP رابطة C-D ببطء شديد، مما يخفض التصفية ويطيل نصف عمر الدواء في الجسم.",
          "en": "Slower bond cleavage reduces clearance, extending the drug's therapeutic half-life."
        }
      ],
      "sources": [{ "file": "İlaç metabolizması-2026.pdf", "page": 16 }]
    }
  ]
};

// Mirror conceptCheck into config for all MCQ steps (all except Step 5)
lesson09.steps.forEach((step, idx) => {
  const stepNum = idx + 1;
  if (stepNum !== 5 && step.conceptCheck && step.conceptCheck.options) {
    const correctOpt = step.conceptCheck.options.find(o => o.isCorrect) || step.conceptCheck.options[0];
    
    const mirroredOptions = step.conceptCheck.options.map(opt => ({
      id: opt.id,
      text: typeof opt.text === 'object' ? opt.text.tr : opt.text,
      isCorrect: opt.isCorrect,
      misconceptionFeedback: typeof opt.misconceptionFeedback === 'object' ? opt.misconceptionFeedback.tr : opt.misconceptionFeedback
    }));
    
    step.config = {
      options: mirroredOptions,
      revealedOutcome: typeof correctOpt.text === 'object' ? correctOpt.text : { tr: correctOpt.text, ar: correctOpt.text, en: correctOpt.text },
      explanation: typeof correctOpt.misconceptionFeedback === 'object' ? correctOpt.misconceptionFeedback : { tr: correctOpt.misconceptionFeedback, ar: correctOpt.misconceptionFeedback, en: correctOpt.misconceptionFeedback }
    };
  }
});

const outputPath = path.resolve(__dirname, '../courses/medchem/lessons/lesson-09.json');
fs.writeFileSync(outputPath, JSON.stringify(lesson09, null, 2), 'utf8');
console.log('Successfully wrote lesson-09.json to:', outputPath);
