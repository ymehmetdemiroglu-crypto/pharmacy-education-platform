const fs = require('fs');
const path = require('path');

const lesson06 = {
  "$schema": "../../../packages/platform/schema/lesson.schema.json",
  "id": "mc-mod3-les2",
  "courseId": "medchem",
  "moduleId": "mc-mod-03",
  "title": {
    "tr": "Klasik Olmayan Biyoizosterler: Karboksilik Asit ve Tetrazol",
    "ar": "المتشابهات الحيوية غير الكلاسيكية: حمض الكربوكسيل والتترازول",
    "en": "Non-Classical Bioisosteres: Carboxylic Acid & Tetrazole"
  },
  "order": 2,
  "access": "free",
  "objective": {
    "tr": "Karboksilik asit, tetrazol, sülfonamid ve hidroksimetil gibi non-klasik biyoizosterleri uygulayarak ilaçların oral biyoyararlanımını, metabolik kararlılığını ve reseptör seçiciliğini optimize etmek.",
    "ar": "تطبيق المتشابهات الحيوية غير الكلاسيكية (التترازول، السلفوناميد، وهيدروكسي ميثيل) لتحسين التوافر الحيوي الفموي، والثباتية الاستقلابية، وانتقائية المستقبل في الأدوية.",
    "en": "Design non-classical bioisosteric replacements (tetrazole, sulfonamide, hydroxymethyl) to optimize oral bioavailability, resolve pharmacokinetic liabilities, and evade metabolic inactivation."
  },
  "misconceptions": [
    {
      "tr": "4 adet azot içeren 1H-tetrazol halkasının amonyak veya piridin gibi bazik olması gerektiği yanılgısı.",
      "ar": "الظن الخاطئ بوجوب كون حلقة 1H-tetrazole المحتوية على 4 نيتروجينات قاعدية كالأمونيا أو البيريدين.",
      "en": "The misconception that a 4-nitrogen tetrazole ring must be basic like ammonia or pyridine."
    },
    {
      "tr": "Karboksilik asit ve tetrazolün fizyolojik pH'ta aynı oranda iyonize olmalarına rağmen membran geçirgenliklerinin aynı olacağı varsayımı (desolvasyon cezasının göz ardı edilmesi).",
      "ar": "الافتراض الخاطئ بتماثل النفاذية الغشائية للحمض والتترازول لتشابه تأينهما متجاهلاً فارق طاقة نزع الماء (desolvation).",
      "en": "The assumption that carboxylic acid and tetrazole share identical membrane permeability simply because both are ionized at physiological pH."
    },
    {
      "tr": "Biyoizosterik değişimin yalnızca atom sayısı ve değerlik elektronları eşit olan gruplarla (klasik izosterizm) yapılabileceği düşüncesi.",
      "ar": "الاعتقاد الخاطئ بأن التبديل البيوإيزوستيري يقتصر حصراً على المجموعات المتطابقة في عدد الذرات وإلكترونات التكافؤ.",
      "en": "The belief that bioisosteric design is strictly limited to groups with identical atom counts and valence electrons."
    }
  ],
  "sources": [
    { "file": "Biyoizosterizm.pdf", "page": 5 },
    { "file": "Biyoizosterizm.pdf", "page": 9 },
    { "file": "Biyoizosterizm.pdf", "page": 10 },
    { "file": "Biyoizosterizm.pdf", "page": 11 },
    { "file": "Biyoizosterizm.pdf", "page": 12 },
    { "file": "Biyoizosterizm.pdf", "page": 14 },
    { "file": "Biyoizosterizm.pdf", "page": 15 }
  ],
  "citations": [
    {
      "id": "CIT-MC06-01",
      "book": "Foye's Principles of Medicinal Chemistry",
      "edition": "8th ed.",
      "topic": "Non-Classical Bioisosteres: Acid Isosteres, Tetrazoles, and Peptidomimetics",
      "chapter": "Chapter 2",
      "page": "50-68",
      "status": "verified"
    },
    {
      "id": "CIT-MC06-02",
      "book": "Wilson and Gisvold's Textbook of Organic Medicinal and Pharmaceutical Chemistry",
      "edition": "12th ed.",
      "topic": "Bioisosterism in Drug Design: Non-Classical Replacements and Carboxylic Acid Mimics",
      "chapter": "Chapter 3",
      "page": "80-101",
      "status": "verified"
    }
  ],
  "numericClaims": [
    {
      "id": "NUM-MC06-01",
      "parameter": "Losartan oral bioavailability increase with tetrazole substitution",
      "value": "3% to 33% (10-fold increase)",
      "status": "verified",
      "referencePassage": "Slide 9: Replacing -COOH with 1H-tetrazole in AT1 antagonists increased oral bioavailability from 3% to 33% while preserving pKa ~4.8."
    },
    {
      "id": "NUM-MC06-02",
      "parameter": "1H-Tetrazole vs Carboxylic acid pKa and logP values",
      "value": "pKa 4.5-4.9 vs 4.2-4.5; logP 2.1 vs 0.8",
      "status": "verified",
      "referencePassage": "Slide 9: 1H-tetrazole has pKa ~4.5-4.9, closely matching carboxylic acid (~4.2-4.5), but exhibits logP ~2.1 vs ~0.8 (10-fold lipophilicity advantage)."
    },
    {
      "id": "NUM-MC06-03",
      "parameter": "Hydration water shell count: Carboxylate vs Tetrazole",
      "value": "6 water molecules vs 2 water molecules",
      "status": "verified",
      "referencePassage": "Blueprint Cluster 3: Carboxylate locks ~6 rigid hydration water molecules, whereas delocalized tetrazole traps only ~2 water molecules, drastically lowering the desolvation penalty."
    },
    {
      "id": "NUM-MC06-04",
      "parameter": "Procaine vs Procainamide plasma half-life",
      "value": "Seconds (<1 min) vs 3-4 hours",
      "status": "verified",
      "referencePassage": "Slide 15: Ester procaine is cleaved by pseudocholinesterase in seconds; bioisosteric amide procainamide resists esterase hydrolysis with half-life of 3-4 hours."
    }
  ],
  "spacedReviewCards": [
    {
      "cardId": "mc-mod3-les2-card1",
      "courseId": "medchem",
      "drugOrConcept": "Tetrazol Halkasının Asitlik Mekanizması",
      "prompt": "1H-tetrazol halkası 4 adet azot içermesine rağmen neden bir baz değil, karboksilik asit gibi asidiktir (pKa 4.5-4.9)?",
      "answer": "Deprotonlandığında oluşan negatif yük, 5 üyeli düzlemsel aromatik halkanın 4 elektronegatif azotu üzerinde rezonansla delokalize olur ve konjuge bazı aşırı kararlı kılar.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "mc-mod3-les2-card2",
      "courseId": "medchem",
      "drugOrConcept": "Tetrazolün Biyoyararlanım Üstünlüğü",
      "prompt": "Karboksilik asit yerine tetrazol halkası geçirilmesi (örn. Losartan) oral biyoyararlanımı neden 10 kat artırır?",
      "answer": "Tetrazolün negatif yükü delokalize olduğundan hidrasyon kafesi küçüktür (desolvasyon cezası düşüktür) ve lipofilisitesi (logP) ~1.3 birim daha yüksektir.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "mc-mod3-les2-card3",
      "courseId": "medchem",
      "drugOrConcept": "Salbütamol Hidroksimetil Modifikasyonu",
      "prompt": "Salbütamolde adrenalinin meta-fenolik -OH grubu neden hidroksimetil (-CH2OH) ile değiştirilmiştir?",
      "answer": "Beta-2 reseptör serini ile hidrojen bağını korurken, katekol geometrisini bozarak COMT enziminin hızlı metabolik metilasyonunu tamamen bloke etmek için.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "mc-mod3-les2-card4",
      "courseId": "medchem",
      "drugOrConcept": "Sülfanilamid Antimetaboliti",
      "prompt": "Sülfanilamid bakterilerde hangi doğal metabolitin non-klasik biyoizosterik antimetabolitidir?",
      "answer": "p-Aminobenzoik asidin (PABA); dihidropteroat sentaz enzimini yarışmalı bloke ederek folik asit sentezini durdurur.",
      "box": 1,
      "intervalDays": 1
    }
  ],
  "translations": {
    "tr": {
      "title": "Klasik Olmayan Biyoizosterler: Karboksilik Asit ve Tetrazol"
    },
    "ar": {
      "title": "المتشابهات الحيوية غير الكلاسيكية: حمض الكربوكسيل والتترازول"
    }
  },
  "steps": [
    {
      "id": "mc-mod3-les2-step-01",
      "stage": "hook",
      "stageIndex": 1,
      "type": "predict_reveal",
      "title": {
        "tr": "Losartan Devrimi ve Dört Azotlu Asit Çelişkisi",
        "ar": "ثورة اللوسارتان ومفارقة النيتروجينات الأربعة الحامضية",
        "en": "The Losartan Breakthrough & The 4-Nitrogen Acid Paradox"
      },
      "prompt": {
        "tr": "Peptid kökenli tansiyon ilacı öncülerinde benzoik asit (-COOH) bağırsaktan emilmiyor ve biyoyararlanım <%3 kalıyordu. Kimyagerler asidi çıkarıp 4 azotlu tetrazol taktılar; emilim 10 kat arttı! 4 azotlu halka nasıl asit gibi davranır?",
        "ar": "فشلت طليعة خافضات الضغط الببتيدية لضعف امتصاص حمض البنزويك (-COOH) وتوافره الحيوي (<3%). استبدل الكيميائيون الحمض بحلقة تترازول بـ 4 نيتروجينات؛ فارتفع الامتصاص 10 أضعاف! كيف تتصرف حلقة 4 نيتروجينات كحمض؟",
        "en": "Early peptide-derived AT1 antagonists failed clinically because benzoic acid (-COOH) had <3% bioavailability. Chemists replaced -COOH with a 4-nitrogen tetrazole ring, boosting bioavailability 10-fold! How can a 4-nitrogen ring act like an acid?"
      },
      "predictThenReveal": true,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-1a",
            "text": {
              "tr": "Tetrazol halkasındaki N-H protonu ayrıldığında negatif yük 4 azot atomu üzerine rezonansla yayılır; konjuge baz aşırı kararlı hale gelerek asidik pKa (4.5-4.9) üretir.",
              "ar": "عند فقد بروتون N-H في التترازول، تتوزع الشحنة السالبة بالرنين على 4 ذرات نيتروجين؛ مما يمنح القاعدة المقترنة ثباتاً استثنائياً وسلوكاً حامضياً (pKa 4.5-4.9).",
              "en": "Deprotonating the tetrazole N-H disperses the negative charge across 4 nitrogens via aromatic resonance, conferring an acidic pKa (4.5-4.9) identical to carboxylates."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Doğru! Tetrazol halkası 4 elektronegatif azota sahiptir. Deprotonasyonla oluşan negatif yük 5 üyeli düzlemsel aromatik halka boyunca yayılır; konjuge baz kararlı olduğundan pKa'sı karboksilik aside (4.5-4.9) eşitlenir.",
              "ar": "صحيح! تمتلك حلقة التترازول 4 ذرات نيتروجين كهروسلبية. تتوزع الشحنة السالبة الناتجة عن نزع البروتون على الحلقة العطرية؛ مما يمنحها ثباتاً وقيمة pKa حامضية (4.5-4.9) تماثل الكربوكسيل.",
              "en": "Correct! Tetrazole contains 4 electronegative nitrogens. The deprotonated conjugate base is stabilized by planar aromatic resonance, yielding an acidic pKa (4.5-4.9) mimicking carboxylic acid."
            }
          },
          {
            "id": "opt-1b",
            "text": {
              "tr": "4 azot atomu bağırsak lümenindeki hidroklorik asidi emerek molekülü kimyasal olarak asitlendirir.",
              "ar": "تمتص ذرات النيتروجين الأربع حمض كلور الماء المعوي لترفع حموضة الجزيء كيميائياً.",
              "en": "The 4 nitrogen atoms absorb hydrochloric acid in the gut lumen, chemically acidifying the drug."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Dış asit absorbsiyonu yanılgısı: Asitlik ilacın çevreden asit çekmesi değil, molekülün kendi içsel proton verme yatkınlığı ve anyon kararlılığıdır.",
              "ar": "خطأ امتصاص الحمض: الحامضية خاصية بنيوية ذاتية تعتمد على منح البروتون وثبات الأنيون، وليست امتصاصاً لأحماض المعدة.",
              "en": "Acid absorption misconception: Acidity is an intrinsic thermodynamic tendency to dissociate a proton, not external acid uptake."
            }
          },
          {
            "id": "opt-1c",
            "text": {
              "tr": "Tetrazol aslında kuvvetli bir bazdır; bağırsak hücre zarlarını delerek pasif sızıntı oluşturur.",
              "ar": "التترازول في الحقيقة قاعدة قوية؛ تثقب أغشية الخلايا المعوية مسببة تسرباً للداخل.",
              "en": "Tetrazole is actually a strong base that chemically punctures gut membranes to leak inside."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Bazik membran hasarı yanılgısı: Tetrazol fizyolojik pH'ta zayıf asit anyonudur (pKa ~4.8), baz değildir ve membranları delmez.",
              "ar": "خطأ تخريب الغشاء: التترازول حمض ضعيف يتأين عند pH الفيزيولوجي، وليس قاعدة أكالة تخرب جدار الأمعاء.",
              "en": "Basic puncture misconception: Tetrazole is a weak acid (pKa ~4.8), not a corrosive base that punctures cellular membranes."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "tetrazol halkası", "arContext": "حلقة التترازول (tetrazole ring)" },
        { "term": "non-klasik biyoizoster", "arContext": "المتشابه الحيوي غير الكلاسيكي" }
      ],
      "hints": [
        {
          "tr": "Bir asidin gücünü, protonunu verdikten sonra geriye kalan konjuge bazının kararlılığı belirler.",
          "ar": "تتحدد قوة أي حمض بمدى استقرار وثبات قاعدته المقترنة بعد فقد البروتون.",
          "en": "Acid strength is determined by the thermodynamic stability of its deprotonated conjugate base."
        },
        {
          "tr": "Tetrazol 5 üyeli düzlemsel bir halkadır ve 4 adet elektronegatif azot atomu taşır.",
          "ar": "التترازول حلقة خماسية مستوية تحتوي 4 ذرات نيتروجين عالية الكهروسلبية.",
          "en": "Tetrazole is a planar 5-membered aromatic ring containing 4 electronegative nitrogen atoms."
        },
        {
          "tr": "Negatif yük 4 azot atomu üzerine rezonansla delokalize olur; bu rezonans kararlılığı tetrazole karboksilik asitle aynı pKa'yı kazandırır.",
          "ar": "تتوزع الشحنة السالبة بالرنين على ذرات النيتروجين الأربع، مانحة التترازول حامضية مطابقة لحمض الكربوكسيل.",
          "en": "Resonance delocalizes the negative charge across all 4 nitrogens, stabilizing the anion and producing an acidic pKa of 4.5-4.9."
        }
      ],
      "sources": [{ "file": "Biyoizosterizm.pdf", "page": 9 }]
    },
    {
      "id": "mc-mod3-les2-step-02",
      "stage": "question",
      "stageIndex": 2,
      "type": "question",
      "title": {
        "tr": "Aktif Soru: Azotlu Bir Halka Nasıl Asit Olur?",
        "ar": "سؤال تفاعلي: كيف تتصرف حلقة نيتروجينية كحمض؟",
        "en": "Active Question: How Can a Nitrogen Ring Act Like an Acid?"
      },
      "prompt": {
        "tr": "Amonyak (NH3) ve piridin gibi azotlu bileşikler bazik iken, 1H-tetrazol halkasının karboksilik asitle neredeyse aynı asidik pKa değerine (~4.8) sahip olmasının kuantum kimyasal nedeni nedir?",
        "ar": "بينما تعتبر المركبات النيتروجينية كالأمونيا والبيريدين قاعدية، ما هو السبب الكيميائي الكمي لامتلاك حلقة 1H-tetrazole قيمة pKa حامضية (~4.8) مطابقة لحمض الكربوكسيل؟",
        "en": "While nitrogenous compounds like ammonia and pyridine are basic, what fundamental quantum-chemical mechanism grants the 1H-tetrazole ring an acidic pKa (~4.8) virtually identical to a carboxylic acid?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-2a",
            "text": {
              "tr": "Deprotonasyon sonucu oluşan anyon, 5 üyeli düzlemsel halkada 6 pi-elektronlu aromatik Hückel sextetini korur ve negatif yük 4 elektronegatif azota delokalize olur.",
              "ar": "يحافظ الأنيون الناتج عن نزع البروتون على سداسي هوكل العطري بـ 6 إلكترونات باي المستوية، وتتوزع الشحنة السالبة على 4 ذرات نيتروجين كهروسلبية.",
              "en": "The deprotonated anion preserves a planar 6 pi-electron aromatic Hückel sextet, delocalizing negative charge across 4 electronegative nitrogens."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Mükemmel! Piridin veya amonyakta azotun serbest elektron çifti lokalizedir ve proton bağlar (bazdır). Tetrazolden proton ayrıldığında ise oluşan tetrazolat anyonu 6 pi-elektronlu aromatik bir sextet oluşturarak olağanüstü kararlı hale gelir.",
              "ar": "ممتاز! في الأمونيا يكون الزوج الإلكتروني موضعياً فيستقبل بروتوناً (قاعدة). أما في التترازول فينتج أنيون عطري مستوٍ بـ 6 إلكترونات باي شديد الاستقرار.",
              "en": "Brilliant! Ammonia's lone pair is localized and basic. In tetrazole, deprotonation yields an aromatic 6 pi-electron sextet delocalized over 4 nitrogens, creating profound conjugate base stability."
            }
          },
          {
            "id": "opt-2b",
            "text": {
              "tr": "Tetrazol halkasındaki azotlar oda sıcaklığında oksijen atomuna dönüşerek karbonil bağı oluşturur.",
              "ar": "تتحول ذرات النيتروجين في التترازول عند حرارة الغرفة إلى ذرات أكسجين لتشكل كربونيل.",
              "en": "The nitrogens in tetrazole spontaneously transmute into oxygens at room temperature to form carbonyls."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Atom dönüşüm yanılgısı: Kimyasal atomlar birbirine dönüşmez; benzerlik elektronik yük delokalizasyonundan doğar.",
              "ar": "خطأ التحول الذري: لا تتحول الذرات لبعضها؛ التشابه الحيوي ينبع من التطابق في الحجم الفراغي وتوزع الشحنة.",
              "en": "Transmutation misconception: Atoms never transmute chemically; bioisosterism relies on electrostatic surface matching."
            }
          },
          {
            "id": "opt-2c",
            "text": {
              "tr": "Azot atomları pozitif proton yayarak çözeltiyi asitlendiren radyoaktif izotoplar içerir.",
              "ar": "تحتوي ذرات النيتروجين على نظائر مشعة تطلق بروتونات موجبة ترفع حموضة المحلول.",
              "en": "The nitrogens contain radioactive isotopes emitting free protons to acidify surrounding media."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Radyoaktif yanılgı: İlaç kimyasında kararlı izotoplar kullanılır; pKa kimyasal asit ayrışma dengesidir.",
              "ar": "خطأ الإشعاع: تستخدم الأدوية نظائر مستقرة كيميائياً، وقيمة pKa تعبر عن توازن كيميائي عكوس.",
              "en": "Radioactivity misconception: Drug molecules are stable organic compounds; pKa represents chemical dissociation equilibrium."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "Hückel aromatik sexteti", "arContext": "سداسي هوكل العطري (Hückel sextet)" },
        { "term": "konjuge baz kararlılığı", "arContext": "ثبات القاعدة المقترنة" }
      ],
      "hints": [
        {
          "tr": "Aromatiklik kuralını hatırlayın: 4n + 2 pi-elektronu içeren halkalar aşırı kararlıdır.",
          "ar": "تذكر قاعدة العطرية: الحلقات المحتوية على 4n + 2 إلكترون باي تكون فائقة الثبات.",
          "en": "Recall Hückel's aromaticity rule: planar rings with 4n + 2 pi-electrons are exceptionally stable."
        },
        {
          "tr": "N-H protonu ayrılınca geriye kalan elektron çifti halkanın pi-sistemine katılarak 6 pi-elektronlu aromatik bir anyon kurar.",
          "ar": "عند مغادرة البروتون، ينضم الزوج الإلكتروني لسحابة باي مشكلاً أنيوناً عطرياً بـ 6 إلكترونات.",
          "en": "When the N-H proton departs, the remaining electron pair joins the cyclic pi system, completing a 6 pi aromatic anion."
        },
        {
          "tr": "Bu aromatik delokalizasyon protonun kolayca ayrılmasını sağlar; sonuçta pKa ~4.8 olan karboksilik asit benzeri asidik bir merkez doğar.",
          "ar": "يسهل هذا الرنين خروج البروتون، منتجاً مركزاً حامضياً بـ pKa ~4.8 مطابقاً لحمض الكربوكسيل.",
          "en": "This aromatic delocalization strongly drives deprotonation, producing an acidic pKa of ~4.8 matching carboxylates."
        }
      ],
      "sources": [{ "file": "Biyoizosterizm.pdf", "page": 9 }]
    },
    {
      "id": "mc-mod3-les2-step-03",
      "stage": "intuition",
      "stageIndex": 3,
      "type": "intuition",
      "title": {
        "tr": "Sezgisel Model: Yayılmış Bulut vs Kilitli Küre",
        "ar": "النموذج الحسي: سحابة منتشرة مقابل شحنة محتبسة",
        "en": "Intuitive Mental Model: Diffuse Cloud vs Locked Sphere"
      },
      "prompt": {
        "tr": "Ağır bir yükü iki parmağınızla taşımak canınızı yakar, ancak sırt çantasının geniş askılarına yaymak yükü hafifletir. Negatif yükün iki oksijen yerine beş halka atomuna yayılması biyoyararlanımı nasıl etkiler?",
        "ar": "حمل ثقل بإصبعين يسبب ألماً شديداً، بينما توزيعه على حقيبة ظهر عريضة يخفف العبء. كيف يؤثر توزيع الشحنة السالبة على خمس ذرات بدلاً من ذرتي أكسجين على الامتصاص؟",
        "en": "Pinching a heavy weight with two fingers is painful, but spreading it across a wide backpack strap feels effortless. How does delocalizing -1 charge across five ring atoms boost membrane permeability?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-3a",
            "text": {
              "tr": "Yük yayılınca su molekülleri sıkı bir hidrasyon kafesi oluşturamaz (desolvasyon cezası 6 sudan 2 suya iner); molekül lipit membranlardan sürtünmesizce süzülür.",
              "ar": "بتوزع الشحنة تعجز المياه عن تشكيل قفص هيدرات صلب (تهبط المياه المحتجزة من 6 إلى 2)؛ فيعبر الجزيء الأغشية الدهنية بسلاسة.",
              "en": "Diffusing the charge prevents tight water trapping (desolvation drops from 6 to 2 waters); the lipophilic ring easily traverses lipid membranes."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Harika bir fizikokimyasal sezgi! Karboksilatta negatif yük 2 oksijende yoğunlaşır ve 6 su molekülünü katı bir buz kafesi gibi kilitler (yüksek desolvasyon engeli). Tetrazolda ise yük 5 atoma yayıldığı için su gevşek tutunur (sadece 2 su); zar geçişi 10 kat hızlanır.",
              "ar": "حدس فيزيوكيميائي رائع! يركز الكربوكسيل الشحنة على ذرتي أكسجين فيحتجز 6 جزيئات ماء بقسوة. أما التترازول فيوزعها برقة محتجزاً جزيئين فقط؛ فتنخفض طاقة نزع الماء ويعبر الغشاء أسرع بـ 10 مرات.",
              "en": "Brilliant biophysical intuition! Carboxylate concentrates charge on 2 oxygens, locking 6 water molecules tightly. Tetrazole spreads charge over 5 atoms, trapping only 2 waters and slashing the desolvation penalty."
            }
          },
          {
            "id": "opt-3b",
            "text": {
              "tr": "Geniş yük dağılımı molekülü o kadar ağırlaştırır ki yerçekimiyle bağırsaktan kana doğru akar.",
              "ar": "يجعل توزع الشحنة الجزيء ثقيلاً جداً فيسحبه الامتصاص لداخل الدم بفعل الجاذبية.",
              "en": "Charge diffusion makes the molecule so dense that gravity pulls it across the intestinal lining."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Yerçekimi yanılgısı: İlaç emilimi yerçekimiyle değil, pasif difüzyon ve Fick kanununa göre kimyasal gradyanla yürür.",
              "ar": "خطأ الجاذبية: الامتصاص تحكمه قوانين فيك للانتشار المنفعل والانحلال الدهني وليس الجاذبية الأرضية.",
              "en": "Gravity misconception: Drug absorption follows passive diffusion and Fick's law across chemical gradients, not gravitational forces."
            }
          },
          {
            "id": "opt-3c",
            "text": {
              "tr": "Yükün yayılması su moleküllerini buharlaştırarak bağırsak lümenini tamamen kurutur.",
              "ar": "يؤدي انتشار الشحنة إلى تبخير جزيئات الماء وتجفيف لمعة الأمعاء بالكامل.",
              "en": "Spreading the charge evaporates surrounding water, completely desiccating the intestinal lumen."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Termal buharlaşma yanılgısı: İlaç molekülleri su buharlaştırmaz; hidrasyon serbest enerjisi moleküler seviyede su ayrışmasını belirler.",
              "ar": "خطأ التبخير: الجزيئات الدوائية لا تبخر الماء؛ بل تحدد طاقة الإماهة الحرة مدى سهولة التحرر من الماء.",
              "en": "Evaporation misconception: Small molecules do not boil water; desolvation free energy governs stripping hydration shells."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "desolvasyon cezası", "arContext": "طاقة نزع الماء (desolvation penalty)" },
        { "term": "hidrasyon kafesi", "arContext": "قفص الإماهة (hydration cage)" }
      ],
      "hints": [
        {
          "tr": "Karboksilat anyonunun etrafını saran su moleküllerini hayal edin: Yük yoğunlaştıkça su daha sıkı kilitlenir.",
          "ar": "تخيل جزيئات الماء المحيطة بشحنة الكربوكسيل: كلما تركزت الشحنة ارتبط الماء بقوة أكبر.",
          "en": "Picture the hydration shell around carboxylate: concentrated charge traps water molecules tightly."
        },
        {
          "tr": "Bir ilacın lipit zardan geçebilmesi için önce etrafındaki su moleküllerini üzerinden soyup atması (desolvasyon) gerekir.",
          "ar": "لعبور الغشاء الدهني، يجب أن يتجرد الدواء أولاً من قفص الماء المحيط به.",
          "en": "To enter a lipid membrane, a drug must shed its surrounding water molecules (desolvation)."
        },
        {
          "tr": "Tetrazolda yük yayıldığı için su molekülleri zayıf tutunur; desolvasyon enerjisi düşer ve zar geçirgenliği fırlar.",
          "ar": "يرتبط الماء برخاوة مع التترازول بسبب تشتت الشحنة، فتهبط طاقة نزع الماء وتقفز النفاذية.",
          "en": "Tetrazole's diffuse charge weakly holds water, minimizing desolvation cost and multiplying lipid permeability."
        }
      ],
      "sources": [{ "file": "Biyoizosterizm.pdf", "page": 9 }]
    },
    {
      "id": "mc-mod3-les2-step-04",
      "stage": "visual_explanation",
      "stageIndex": 4,
      "type": "visual_explanation",
      "title": {
        "tr": "Görsel Profil: Karboksilik Asit vs 1H-Tetrazol",
        "ar": "الملف البصري: حمض الكربوكسيل مقابل 1H-تترازول",
        "en": "Visual Profile: Carboxylic Acid vs 1H-Tetrazole"
      },
      "prompt": {
        "tr": "Karboksilik asit (-COOH) ile 1H-tetrazolün fizikokimyasal profilini kıyaslayın: Her ikisinin de pKa'sı asidiktir (~4.2-4.8). Ancak tetrazolün logP'si 1.3 birim daha yüksektir. Bu durum klinik performansı nasıl değiştirir?",
        "ar": "قارن الخواص بين -COOH و 1H-tetrazole: كلاهما حامضي (pKa ~4.2-4.8). لكن logP للتترازول أعلى بـ 1.3 وحدة. كيف يغير هذا الأداء السريري؟",
        "en": "Compare carboxylic acid (-COOH) and 1H-tetrazole: both are acidic (pKa ~4.2-4.8). Yet tetrazole's logP is 1.3 units higher. How does this lipophilicity advantage transform clinical pharmacokinetics?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-4a",
            "text": {
              "tr": "Tetrazol AT1 reseptöründeki arginin ile iyonik bağı korurken, 10 kat artan lipofilisitesi sayesinde oral emilimi %3'ten %33'e çıkarır ve metabolik glukuronidasyona direnir.",
              "ar": "يحفظ التترازول الرابطة الأيونية مع أرجنين المستقبل AT1، وبفضل زيادة الانحلال بالدهن 10 أضعاف يقفز الامتصاص من 3% إلى 33% ويقاوم الاقتران بالغلوبيولين.",
              "en": "Tetrazole preserves the essential ionic salt bridge with receptor arginine while its 10-fold lipophilicity gain multiplies bioavailability from 3% to 33% and evades glucuronidation."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Doğru! Tetrazolün logP değeri ~2.1 iken karboksilik asidinki ~0.8'dir. ΔlogP ≈ +1.3 olması ilacın biyolojik membranlardan geçişini 10 kat artırır. Ayrıca açil glukuronid oluşumunu önleyerek klerensi stabilize eder.",
              "ar": "صحيح! تبلغ logP للتترازول ~2.1 مقابل ~0.8 للكربوكسيل؛ هذا الفارق (+1.3) يرفع النفاذية المعوية 10 أضعاف ويمنع تكوين غلوكورونيدات الأسيل السامة.",
              "en": "Correct! Tetrazole's logP (~2.1) exceeds -COOH (~0.8) by +1.3 log units, yielding a 10-fold permeability boost while eliminating reactive acyl glucuronide formation."
            }
          },
          {
            "id": "opt-4b",
            "text": {
              "tr": "Tetrazol kana geçtiği anda çöker ve damarları tıkayarak tansiyonu mekanik olarak düşürür.",
              "ar": "يترسب التترازول فور دخوله الدم فيسد الأوعية خافضاً الضغط ميكانيكياً.",
              "en": "Tetrazole precipitates in plasma upon absorption, mechanically obstructing arterioles to lower blood pressure."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Damar tıkanıklığı yanılgısı: Losartan tamamen çözünür bir oral tablettir; mekanik tıkaç değil biyokimyasal AT1 reseptör antagonistidir.",
              "ar": "خطأ الانسداد الميكانيكي: لوسارتان دواء ذواب بالكامل ولا يترسب في الأوعية؛ تأثيره ناتج عن إحصار مستقبلات AT1.",
              "en": "Vessel occlusion misconception: Losartan is fully soluble; it lowers pressure pharmacologically via AT1 receptor blockade, not arterial plugging."
            }
          },
          {
            "id": "opt-4c",
            "text": {
              "tr": "logP'nin artması ilacın idrara geçişini imkansız kılarak vücutta ömür boyu kalmasını sağlar.",
              "ar": "تمنع زيادة logP طرح الدواء في البول نهائياً ليبقى في الجسم مدى الحياة.",
              "en": "Elevated logP completely prevents renal excretion, trapping the drug in the body indefinitely."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Ömür boyu tutulum yanılgısı: Losartan hepatik CYP oksidasyonuyla karboksilik asit metabolitine (EXP-3174) çevrilir ve safra/idrarla dengeli atılır.",
              "ar": "خطأ البقاء الأبدي: يُستقلب لوسارتان كبدياً ليعطي مستقلب EXP-3174 الفعال ويُطرح بتوازن عبر البول والصفراء.",
              "en": "Indefinite retention misconception: Losartan is metabolized by CYP2C9 to active metabolite EXP-3174 and cleared via biliary and renal routes."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "lipofilisite farkı (ΔlogP)", "arContext": "فارق الانحلال الدهني (ΔlogP)" },
        { "term": "açil glukuronidasyonu", "arContext": "اقتران أسيل غلوكورونيد" }
      ],
      "hints": [
        {
          "tr": "LogP logaritmik bir ölçektir: 1 birimlik artış lipofilisitede 10 kat artış demektir.",
          "ar": "مقياس logP لوغاريتمي: زيادة وحدة واحدة تعني تضاعف الانحلال بالدهن 10 مرات.",
          "en": "LogP is logarithmic: a 1.3-unit increase corresponds to over a 10-fold increase in lipid partitioning."
        },
        {
          "tr": "Karboksilik asit taşıyan öncünün biyoyararlanımı <%3 iken, tetrazollü losartanın biyoyararlanımı %33'tür.",
          "ar": "قفز التوافر الحيوي من أقل من 3% في طليعة الكربوكسيل إلى 33% في اللوسارتان.",
          "en": "Bioavailability jumped from <3% in the carboxylate precursor to 33% in tetrazole-bearing losartan."
        },
        {
          "tr": "Tetrazol karboksilatın arginin ile yaptığı iyonik bağı korurken, yüksek lipofilisitesiyle oral emilimi katlar.",
          "ar": "يحفظ التترازول الارتباط الأيوني الأساسي مع الأرجنين، رافعاً الامتصاص الفموي بفضل انحلاله الدهني المتفوق.",
          "en": "Tetrazole preserves the essential ionic interaction with receptor arginine while boosting oral uptake via superior lipophilicity."
        }
      ],
      "sources": [{ "file": "Biyoizosterizm.pdf", "page": 9 }]
    },
    {
      "id": "mc-mod3-les2-step-05",
      "stage": "interactive_artifact",
      "stageIndex": 5,
      "type": "sar_explorer",
      "widgetType": "SarExplorer",
      "title": {
        "tr": "İnteraktif Laboratuvar: Losartan Asidik İzoster Kaşifi",
        "ar": "مختبر تفاعلي: مستكشف إيزوستيرات لوسارتان الحامضية",
        "en": "Interactive Lab: Losartan Acidic Bioisostere Explorer"
      },
      "prompt": {
        "tr": "Losartan bifenil iskeletinde R1 pozisyonundaki asidik fonksiyonel grubu değiştirin. Hedef: pKa < 5.0 ve logP > 1.8 sağlayarak oral biyoyararlanımı ve reseptör afinitesini optimize edin.",
        "ar": "غير المجموعة الوظيفية الحامضية في الموضع R1 لهيكل لوسارتان. الهدف: تحقيق pKa < 5.0 و logP > 1.8 لتحسين التوافر الحيوي الفموي والألفة نحو المستقبل.",
        "en": "Modify the acidic functional group at position R1 of the losartan scaffold. Goal: Achieve pKa < 5.0 and logP > 1.8 to maximize oral bioavailability and target affinity."
      },
      "predictThenReveal": false,
      "config": {
        "scaffoldName": "Bifenil AT1 Reseptör Bloker İskeleti (Losartan Core)",
        "scaffoldDescription": "Bifenil iskeletinde orto-konumundaki asidik grubu biyoizosterik olarak optimize edin.",
        "baseLogP": 0.8,
        "basePka": 4.2,
        "baseAffinityNm": 120.0,
        "positions": [
          {
            "positionName": "R1 (Orto-Asidik Pozisyon)",
            "defaultOptionId": "opt_cooh",
            "options": [
              {
                "id": "opt_cooh",
                "name": "Karboksilik Asit (-COOH)",
                "structureSnippet": "-COOH",
                "deltaLogP": 0.0,
                "deltaPka": 0.0,
                "affinityMultiplier": 1.0,
                "toxicityRisk": "low"
              },
              {
                "id": "opt_tetrazole",
                "name": "1H-Tetrazol Halkası",
                "structureSnippet": "-CN4H",
                "deltaLogP": 1.3,
                "deltaPka": 0.6,
                "affinityMultiplier": 12.0,
                "toxicityRisk": "low"
              },
              {
                "id": "opt_ester",
                "name": "Metil Ester (-COOCH3)",
                "structureSnippet": "-COOCH3",
                "deltaLogP": 1.8,
                "deltaPka": 8.0,
                "affinityMultiplier": 0.05,
                "toxicityRisk": "low"
              },
              {
                "id": "opt_sulfonamide",
                "name": "Açilsülfonamid (-CONHSO2CH3)",
                "structureSnippet": "-CONHSO2CH3",
                "deltaLogP": 0.9,
                "deltaPka": 0.3,
                "affinityMultiplier": 8.0,
                "toxicityRisk": "low"
              }
            ]
          }
        ],
        "targetGoal": {
          "description": "logP > 1.8 ve Kd <= 15 nM ile yüksek oral biyoyararlanım ve güçlü AT1 blokajı sağlayın.",
          "minLogP": 1.8,
          "maxLogP": 2.5,
          "maxAffinityNm": 15.0,
          "targetOptionIds": ["opt_tetrazole"]
        },
        "explanation": "1H-tetrazol halkası karboksilatın asidik pKa'sını (~4.8) korurken lipofilisiteyi artırır (logP 0.8 -> 2.1), desolvasyon cezasını azaltır ve oral biyoyararlanımı %3'ten %33'e fırlatır.",
        "source": {
          "file": "Biyoizosterizm.pdf",
          "page": 9
        }
      },
      "technicalTerms": [
        { "term": "bifenil iskeleti", "arContext": "هيكل ثنائي الفينيل (biphenyl core)" },
        { "term": "AT1 reseptör blokeri", "arContext": "حاصر مستقبلات AT1" }
      ],
      "hints": [
        {
          "tr": "Metil ester nötrdür; asidik proton taşımadığından AT1 reseptör afinitesini yok eder.",
          "ar": "إستر الميثيل غير حامضي؛ فغياب الشحنة السالبة يدمر الألفة لمستقبل AT1 تماماً.",
          "en": "The methyl ester lacks an acidic proton, abolishing the ionic salt bridge and destroying affinity."
        },
        {
          "tr": "Karboksilik asit çok polardır (logP 0.8); oral emilimi düşüktür.",
          "ar": "حمض الكربوكسيل شديد القطبية (logP 0.8)، مما يحد من امتصاصه الفموي.",
          "en": "Carboxylic acid is too polar (logP 0.8), suffering from poor membrane permeability."
        },
        {
          "tr": "1H-tetrazol seçeneğini takın: logP 2.1'e çıkar ve Kd 10 nM seviyesine iner.",
          "ar": "اختر 1H-tetrazole: يقفز logP إلى 2.1 وتهبط Kd إلى 10 nM محققة الهدف.",
          "en": "Install 1H-tetrazole: logP reaches 2.1 and Kd drops to 10 nM, satisfying all target criteria."
        }
      ],
      "sources": [{ "file": "Biyoizosterizm.pdf", "page": 9 }]
    },
    {
      "id": "mc-mod3-les2-step-06",
      "stage": "guided_discovery",
      "stageIndex": 6,
      "type": "guided_discovery",
      "title": {
        "tr": "Rehberli Keşif: Fenolik Hidroksil ve Salbütamol Devrimi",
        "ar": "استكشاف موجه: الهيدروكسيل الفينولي وثورة السالبوتامول",
        "en": "Guided Discovery: Phenolic Hydroxyl & The Salbutamol Leap"
      },
      "prompt": {
        "tr": "Adrenalindeki meta-fenolik -OH grubu COMT enzimiyle hızla metillenerek dakikalar içinde etkisizleşir. Salbütamolde bu -OH yerine hidroksimetil (-CH2OH) konulması etki süresini nasıl saatlere uzatır?",
        "ar": "تتخرب مجموعة -OH الفينولية في الأدرينالين بأنزيم COMT خلال دقائق. كيف يؤدي استبدالها بـ hydroxymethyl (-CH2OH) في السالبوتامول إلى إطالة التأثير لساعات؟",
        "en": "Adrenaline's meta-phenolic -OH is rapidly methylated by COMT within minutes. In salbutamol, how does swapping this -OH for hydroxymethyl (-CH2OH) extend bronchodilator duration from minutes to hours?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-6a",
            "text": {
              "tr": "Hidroksimetil grubu beta-2 reseptör serini ile hidrojen bağını korur; ancak katekol geometrisi bozulduğu için COMT enzimi substrat olarak tanıyamaz.",
              "ar": "تحفظ مجموعة هيدروكسي ميثيل الرابطة الهيدروجينية مع سيرين مستقبل بيتا-2؛ لكن تشوه هندسة الكاتيكول يعطل تعرف أنزيم COMT عليها.",
              "en": "The hydroxymethyl group donates an essential H-bond to beta-2 receptor serine, but destroys catechol geometry so COMT cannot recognize it."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Harika bir keşif! Adrenalin COMT enzimi tarafından saniyeler içinde inaktive edilir. Salbütamoldeki -CH2OH grubu araya 1 karbon sokarak katekol cebi uyumunu bozar; COMT enzimi metilasyon yapamaz ama beta-2 reseptör H-bağı aynen korunur (Slide 10).",
              "ar": "اكتشاف رائع! يثبط COMT الأدرينالين خلال ثوانٍ. تفصل ذرة الكربون الإضافية في -CH2OH زاوية التفاعل مع أنزيم COMT فيفشل في تثبيطه، بينما يبقى الارتباط الهيدروجيني مع مستقبل بيتا-2 سليماً.",
              "en": "Superb discovery! Adrenaline is cleared rapidly by COMT. Adding a methylene spacer (-CH2OH) disrupts catechol recognition by COMT while preserving H-bonding with beta-2 receptor serine."
            }
          },
          {
            "id": "opt-6b",
            "text": {
              "tr": "-CH2OH grubu COMT enzimini kovalent olarak patlatıp karaciğeri yok eder.",
              "ar": "تفجر مجموعة -CH2OH أنزيم COMT تساهمياً مخربة الكبد.",
              "en": "The -CH2OH group violently detonates COMT enzymes, obliterating liver tissue."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Enzim patlaması yanılgısı: Salbütamol son derece güvenli bir astım ilacıdır; enzim yıkımı değil sterik substrat uyuşmazlığı vardır.",
              "ar": "خطأ التخريب: السالبوتامول دواء آمن وموجه؛ الآلية تعتمد على عدم التعرف الفراغي وليس تفجير الأنزيم.",
              "en": "Enzyme explosion misconception: Salbutamol is a safe selective bronchodilator; it evades COMT via steric evasion, not enzymatic lysis."
            }
          },
          {
            "id": "opt-6c",
            "text": {
              "tr": "Salbütamol kovalent bir bağla akciğer bronşlarına ömür boyu kaynaklanır.",
              "ar": "يلتحم السالبوتامول برابطة تساهمية دائمة مدى الحياة مع القصبات الهوائية.",
              "en": "Salbutamol welds permanently into bronchial tissue through irreversible covalent bonds."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kovalent kaynak yanılgısı: Salbütamol geri dönüşümlü bir beta-2 agonistidir; etki süresi kovalent bağlanmadan değil COMT direncinden uzar.",
              "ar": "خطأ الارتباط التساهمي: يرتبط السالبوتامول بروابط غير تساهمية عكوسة؛ وطول المفعول ينبع من مقاومة الاستقلاب.",
              "en": "Covalent binding misconception: Salbutamol binds reversibly via non-covalent forces; its extended duration arises from metabolic COMT resistance."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "katekol-O-metiltransferaz (COMT)", "arContext": "أنزيم COMT" },
        { "term": "hidroksimetil biyoizosteri", "arContext": "إيزوستير هيدروكسي ميثيل" }
      ],
      "hints": [
        {
          "tr": "COMT enziminin metilasyon yapabilmesi için yan yana iki fenolik -OH (katekol) grubu görmesi şarttır.",
          "ar": "يشترط أنزيم COMT وجود مجموعتي فينول متجاورتين (كاتيكول) ليرتبط وينقل الميثيل.",
          "en": "COMT strictly requires an ortho-dihydroxy benzene (catechol) architecture to methylate."
        },
        {
          "tr": "Hidroksimetil (-CH2OH) grubunda oksijen aromatik halkaya doğrudan bağlı değildir; arada bir karbon vardır.",
          "ar": "في مجموعة هيدروكسي ميثيل (-CH2OH)، يفصل كربون أليفاتي بين الأكسجين والحلقة العطرية.",
          "en": "In hydroxymethyl (-CH2OH), an aliphatic carbon separates the oxygen from the aromatic ring."
        },
        {
          "tr": "Bu aralık COMT enzimini engeller, ancak beta-2 reseptör serini ile hidrojen bağı kurmaya devam eder.",
          "ar": "تمنع هذه المسافة أنزيم COMT بينما تحافظ على الرابطة الهيدروجينية مع سيرين مستقبل بيتا-2.",
          "en": "This spacer frustrates COMT binding while preserving the essential hydrogen bond with receptor serine."
        }
      ],
      "sources": [{ "file": "Biyoizosterizm.pdf", "page": 10 }]
    },
    {
      "id": "mc-mod3-les2-step-07",
      "stage": "formal_explanation",
      "stageIndex": 7,
      "type": "formal_explanation",
      "title": {
        "tr": "Formal Farmakoloji: PABA vs Sülfanilamid Antimetaboliti",
        "ar": "الدوائيات المنهجية: PABA مقابل سلفانيلاميد كمضاد استقلاب",
        "en": "Formal Pharmacology: PABA vs Sulfanilamide Antimetabolite"
      },
      "prompt": {
        "tr": "Bakteriler folik asit sentezinde p-aminobenzoik asit (PABA) kullanır. Sülfanilamid (-SO2NH2), PABA'nın (-COOH) non-klasik biyoizosteri olarak dihidropteroat sentaz enzimini hangi mekanizmayla felç eder?",
        "ar": "تستخدم الجراثيم PABA لبناء حمض الفوليك. كيف يشل السلفانيلاميد (-SO2NH2) كمتشابه غير كلاسيكي لحمض الكربوكسيل أنزيم dihydropteroate synthase؟",
        "en": "Bacteria require p-aminobenzoic acid (PABA) to synthesize folic acid. How does sulfanilamide (-SO2NH2), acting as a non-classical bioisostere of -COOH, competitively paralyze dihydropteroate synthase?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-7a",
            "text": {
              "tr": "Sülfonamid grubu benzer geometrik boyuta ve polariteye sahiptir; enzimin aktif cebine yarışmalı oturur ancak pteridin halkasına bağlanamaz ve sahte ürün sentezi durdurur.",
              "ar": "تمتلك مجموعة السلفوناميد حجماً وقطبية مشابهة؛ فترسو تنافسياً في جيب الأنزيم مانعة إتمام اصطناع الفولات وتوقف تكاثر البكتيريا.",
              "en": "The sulfonamide group shares matching geometry and charge distribution, competitively docking into the active site while aborting downstream folate condensation."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Doğru! Sülfanilamidin -SO2NH2 grubu PABA'nın -COOH grubu ile tetrahedral geometri ve yük polaritesi açısından non-klasik biyoizosteriktir. Dihidropteroat sentazı yarışmalı bloke ederek bakteriyostatik etki sağlar (Slide 15).",
              "ar": "صحيح! تشابه مجموعة -SO2NH2 مجموعة -COOH فراغياً وقطبياً؛ فتحتل الموقع الفعال وتوقف اصطناع الفوليك جاعلة البكتيريا عاجزة عن الانقسام.",
              "en": "Correct! The -SO2NH2 group is a non-classical bioisostere of -COOH, mimicking geometry and charge distribution to competitively inhibit dihydropteroate synthase."
            }
          },
          {
            "id": "opt-7b",
            "text": {
              "tr": "Sülfanilamid bakteri hücresini fiziksel olarak kurşun geçirmez bir zırhla kaplar.",
              "ar": "يغلف السلفانيلاميد الخلية البكتيرية بدرع مضاد للرصاص يمنع حركتها.",
              "en": "Sulfanilamide physically coats bacterial walls with bulletproof armor."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Fiziksel zırh yanılgısı: Sülfanilamid metabolik bir enzim inhibitörüdür, hücre duvarı zırhı değildir.",
              "ar": "خطأ الدرع الفيزيائي: السلفانيلاميد مثبط أنزيمي استقلابي وليس درعاً جدارياً.",
              "en": "Armor misconception: Sulfanilamide is an intracellular antimetabolite enzyme inhibitor, not a physical surface coating."
            }
          },
          {
            "id": "opt-7c",
            "text": {
              "tr": "Sülfanilamid insan DNA'sını hedef alarak tüm vücut hücrelerini yok eder.",
              "ar": "يستهدف السلفانيلاميد DNA البشري مدمراً كافة خلايا الجسم.",
              "en": "Sulfanilamide targets human host DNA, obliterating mammalian cells."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Konak toksisitesi yanılgısı: İnsanlar folik asidi diyetle hazır alır, de novo sentezlemez; bu yüzden sülfamitler selektif toksiktir.",
              "ar": "خطأ سمية المضيف: يحصل الإنسان على حمض الفوليك جاهزاً من الغذاء ولا يصنعه؛ لذا يتميز السلفانيلاميد بسمية انتقائية ممتازة.",
              "en": "Host toxicity misconception: Humans obtain folate preformed from diet lacking dihydropteroate synthase; sulfonamides exhibit excellent selective toxicity."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "dihidropteroat sentaz", "arContext": "أنزيم دي هيدروبتيروات سنثاز" },
        { "term": "sülfonamid izosteri", "arContext": "إيزوستير السلفوناميد" }
      ],
      "hints": [
        {
          "tr": "PABA: p-NH2-C6H4-COOH. Sülfanilamid: p-NH2-C6H4-SO2NH2.",
          "ar": "قارن الصيغتين: PABA ينتهي بـ -COOH، بينما السلفانيلاميد ينتهي بـ -SO2NH2.",
          "en": "Compare structures: PABA bears a -COOH, whereas sulfanilamide bears a -SO2NH2 group."
        },
        {
          "tr": "-SO2NH2 grubu -COOH ile benzer atomlar arası mesafeye ve negatif yük polaritesine sahiptir.",
          "ar": "تمتلك مجموعة -SO2NH2 أبعاداً فراغية وقطبية شحنة مماثلة لمجموعة -COOH.",
          "en": "-SO2NH2 mimics the interatomic distance and electronegative charge density of -COOH."
        },
        {
          "tr": "Sülfanilamid enzimi PABA gibi aldatır ve aktif cebi tıkayarak folik asit sentezini yarışmalı olarak durdurur.",
          "ar": "يخدع السلفانيلاميد الأنزيم كبديل لـ PABA، محتلاً الجيب ومعطلاً بناء الفوليك تنافسياً.",
          "en": "Sulfanilamide acts as an antimetabolite decoy, competitively blocking PABA utilization in folate synthesis."
        }
      ],
      "sources": [{ "file": "Biyoizosterizm.pdf", "page": 15 }]
    },
    {
      "id": "mc-mod3-les2-step-08",
      "stage": "concept_check",
      "stageIndex": 8,
      "type": "concept_check",
      "title": {
        "tr": "Kavram Kontrolü: İntestinal pH ve İyonizasyon Paradoksu",
        "ar": "فحص المفاهيم: درجة حموضة الأمعاء ومفارقة التأين",
        "en": "Concept Check: Intestinal pH & The Ionization Paradox"
      },
      "prompt": {
        "tr": "İnce bağırsak lümeninde (pH 6.5) karboksilik asitli bir ilaç (pKa 4.2) %99.5 oranında iyonizedir. Tetrazol analogu (pKa 4.9) ise %97.5 iyonizedir. Tetrazolün membran geçirgenliği neden yine de katbekat üstündür?",
        "ar": "عند pH الأمعاء 6.5، يتأين حمض الكربوكسيل (pKa 4.2) بنسبة 99.5%، بينما يتأين التترازول (pKa 4.9) بنسبة 97.5%. لماذا تفوق نفاذية التترازول نظيره بأضعاف مضاعفة؟",
        "en": "At intestinal pH 6.5, carboxylic acid (pKa 4.2) is 99.5% ionized, while tetrazole (pKa 4.9) is 97.5% ionized. Why does tetrazole still display drastically superior membrane flux?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-8a",
            "text": {
              "tr": "Tetrazolün hem nötr formu daha lipofiliktir (ΔlogP ~+1.3) hem de anyonik formunun hidrasyon enerjisi çok düşüktür; zardan geçiş desolvasyon bariyeri önemsizleşir.",
              "ar": "يمتلك التترازول انحلالاً دهنياً أعلى (ΔlogP ~+1.3) وطاقة إماهة شاردية منخفضة جداً؛ مما يجعل حاجز نزع الماء لعبور الغشاء ضئيلاً للغاية.",
              "en": "Tetrazole exhibits higher intrinsic lipophilicity (ΔlogP ~+1.3) and a vastly lower ionic desolvation penalty, slashing the thermodynamic barrier for membrane partitioning."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kusursuz çıkarım! %97.5 iyonize olması %2.5 nötr form demektir (karboksilik asidin 5 katı serbest nötr fraksiyon). Ayrıca delokalize tetrazolat anyonunun desolvasyon cezası çok düşük olduğundan anyonik halde bile zardan pasif sızabilir.",
              "ar": "استنتاج متقن! نسبة تأين 97.5% تعني وجود 2.5% من الشكل النيتروني غير المشحون (5 أضعاف الكربوكسيل). كما أن الشحنة المشتتة تقلل طاقة نزع الماء مما يسمح بنفاذية نفاثة.",
              "en": "Superb deduction! 97.5% ionization leaves 2.5% neutral species (5x more than carboxylate's 0.5%). Furthermore, diffuse charge delocalization dramatically lowers the desolvation barrier."
            }
          },
          {
            "id": "opt-8b",
            "text": {
              "tr": "İyonize olan moleküller lipit zarlardan yüksüz moleküllere göre 1000 kat daha hızlı geçer.",
              "ar": "تعبر الجزيئات المتأينة الأغشية الدهنية بسرعة تفوق الجزيئات غير المشحونة بألف مرة.",
              "en": "Ionized species penetrate lipid bilayers 1000 times faster than neutral lipophilic molecules."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "İyon difüzyon yanılgısı: İyonik yükler hidrofobik lipit çift katmanından neredeyse hiç geçemez; desolvasyon bariyeri devasadır.",
              "ar": "خطأ نفاذية الأيونات: تعجز الشحنات عن عبور صلب الغشاء الدهني اللاقطبي؛ الحقيقة أن الشكل غير المتأين هو المسؤول عن العبور.",
              "en": "Ion diffusion misconception: Hydrophobic lipid bilayers strongly repel charged species due to immense Born desolvation energy."
            }
          },
          {
            "id": "opt-8c",
            "text": {
              "tr": "pH 6.5'te tetrazol kovalent bağlarını parçalayarak gaz haline gelir ve buharlaşır.",
              "ar": "يتفكك التترازول عند pH 6.5 إلى غاز يتبخر عبر جدار الأمعاء.",
              "en": "At pH 6.5, tetrazole fragments into volatile gas that evaporates across the gut mucosa."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Buharlaşma yanılgısı: Tetrazol fizyolojik sıvılarda stabil, çözünür bir katıdır; gaza dönüşmez.",
              "ar": "خطأ التبخر: التترازول مركب حلقي شديد الثبات ولا يتحول لغاز إطلاقاً.",
              "en": "Evaporation misconception: Tetrazole is a chemically stable aromatic heterocycle; it does not fragment into gas."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "Henderson-Hasselbalch dengesi", "arContext": "توازن هندرسون-هاسلبالخ" },
        { "term": "nötr fraksiyon emilimi", "arContext": "امتصاص الجزء غير المتأين" }
      ],
      "hints": [
        {
          "tr": "Henderson-Hasselbalch eşitliğini düşünün: pH - pKa farkına göre nötr fraksiyonu hesaplayın.",
          "ar": "فكر في معادلة هندرسون-هاسلبالخ لحساب نسبة الجزء غير المتأين عند pH 6.5.",
          "en": "Apply Henderson-Hasselbalch: calculate the non-ionized fraction at pH 6.5."
        },
        {
          "tr": "Karboksilik asitte nötr fraksiyon %0.5 iken, tetrazolda nötr fraksiyon %2.5'tir (5 kat daha fazla).",
          "ar": "الجزء غير المتأين في الكربوكسيل 0.5%، بينما في التترازول يبلغ 2.5% (أعلى بـ 5 أضعاف).",
          "en": "Non-ionized fraction: 0.5% for carboxylate vs 2.5% for tetrazole (a 5-fold surplus)."
        },
        {
          "tr": "Tetrazolün hem nötr fraksiyonu 5 kat fazladır hem de logP değeri 10 kat daha yüksektir; bu iki faktör zardan geçişi patlatır.",
          "ar": "يمتلك التترازول جزءاً غير متأين أعلى بـ 5 أضعاف مع انحلال دهني أعلى بـ 10 أضعاف، مما يضاعف الامتصاص.",
          "en": "A 5-fold higher non-ionized fraction combined with a 10-fold higher intrinsic logP drives dramatic membrane flux."
        }
      ],
      "sources": [{ "file": "Biyoizosterizm.pdf", "page": 9 }]
    },
    {
      "id": "mc-mod3-les2-step-09",
      "stage": "application",
      "stageIndex": 9,
      "type": "clinical_vignette",
      "title": {
        "tr": "Klinik Vaka: ARB'lerde Açil Glukuronidasyon Toksisitesinden Kaçış",
        "ar": "حالة سريرية: تفادي سمية غلوكورونيدات الأسيل في مركبات ARB",
        "en": "Clinical Vignette: Evading Acyl Glucuronide Toxicity in ARBs"
      },
      "prompt": {
        "tr": "Karboksilik asit taşıyan NSAİİ'ler ve ARB öncüleri karaciğerde açil glukuronidlere dönüşerek toksik reaktif metabolitler oluşturur. Losartan ve kandesartandaki tetrazol halkası bu toksisiteyi ve hızlı klerensi nasıl önler?",
        "ar": "تتحول مضادات الالتهاب الحاملة لـ -COOH في الكبد إلى غلوكورونيدات أسيل سامة تفاعلية. كيف تمنع حلقة التترازول في لوسارتان وكانيديسارتان هذه السمية والتصفية السريعة؟",
        "en": "Carboxylic acid drugs frequently form chemically reactive acyl glucuronides, triggering hepatotoxicity. How does the tetrazole ring in ARBs like losartan and candesartan abolish this toxic liability and rapid clearance?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-9a",
            "text": {
              "tr": "Tetrazol halkası UGT enzimlerinin açil glukuronidasyon nükleofilik atağına dirençlidir; reaktif elektrofilik esterler oluşturmaz ve yarılanma ömrünü uzatır.",
              "ar": "تقاوم حلقة التترازول أنزيمات UGT؛ فلا تشكل إسترات كهرومحبّة سامة وتطيل نصف العمر الحيوي بأمان تام.",
              "en": "Tetrazole resists UGT nucleophilic acyl transfer, preventing the generation of reactive electrophilic acyl glucuronides and dramatically extending duration."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kesinlikle doğru! Karboksilik asitler UGT enzimlerince 1-O-açil glukuronidlere çevrilir. Bu metabolitler protein lizini ile kovalent bağ yaparak immünolojik toksisiteye yol açar. Tetrazol halkası ise açil ester oluşturamaz; güvenli ve uzun etki sağlar.",
              "ar": "صحيح تماماً! تشكل الأحماض غلوكورونيدات أسيل تفاعلية تتصل تساهمياً ببروتينات الكبد مسببة سمية نسيجية. بينما يعجز التترازول عن تشكيل هذه الروابط الخطرة.",
              "en": "Spot on! Carboxylic acids form reactive 1-O-acyl glucuronides that covalently haptenate host proteins. Tetrazole cannot form reactive acyl-linked conjugates, eliminating idiosyncratic toxicity."
            }
          },
          {
            "id": "opt-9b",
            "text": {
              "tr": "Tetrazol tüm karaciğer enzimlerini irreversibl felç ederek metabolizmayı tamamen durdurur.",
              "ar": "يشل التترازول كافة أنزيمات الكبد معطلاً الاستقلاب في الجسم نهائياً.",
              "en": "Tetrazole irreversibly paralyzes all hepatic metabolic enzymes, shutting down liver clearance completely."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Karaciğer felci yanılgısı: ARB'ler güvenli kronik ilaçlardır; hepatik enzim yıkımı yapmazlar.",
              "ar": "خطأ شلل الكبد: أدوية ARB آمنة ومدروسة كبدياً؛ ولا تسبب شللاً استقلابياً.",
              "en": "Liver failure misconception: ARBs are well-tolerated antihypertensives that undergo controlled CYP oxidation without hepatic damage."
            }
          },
          {
            "id": "opt-9c",
            "text": {
              "tr": "Tetrazol karaciğere hiç uğramadan yalnızca tükürük bezleri üzerinden doğrudan atılır.",
              "ar": "يطرح التترازول حصراً عبر الغدد اللعابية دون المرور بالكبد نهائياً.",
              "en": "Tetrazole bypasses liver transit entirely, being excreted exclusively into saliva."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Tükürük eliminasyon yanılgısı: Losartan karaciğerde kontrollü olarak CYP2C9/3A4 ile aktif karboksilatına (EXP-3174) oksitlenir.",
              "ar": "خطأ اللعاب: يمر الدواء بالدوران البابي الكبدي الطبيعي ويطرح بالبول والبراز.",
              "en": "Salivary misconception: Losartan undergoes first-pass hepatic oxidation to form active EXP-3174 before biliary and renal excretion."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "açil glukuronid toksisitesi", "arContext": "سمية غلوكورونيد الأسيل (acyl glucuronide toxicity)" },
        { "term": "anjiyotensin reseptör blokeri (ARB)", "arContext": "حاصرات مستقبلات الأنجيوتنسين (ARB)" }
      ],
      "hints": [
        {
          "tr": "Karboksilik asitlerin Faz II glukuronidasyonunda açil bağı kararsızdır; proteinlerle istenmeyen kovalent bağlar kurar.",
          "ar": "تكون رابطة أسيل غلوكورونيد الناتجة عن الكربوكسيل غير مستقرة كيميائياً وتتفاعل مع البروتينات.",
          "en": "Carboxylic acid Phase II glucuronidation yields chemically labile acyl-linked electrophiles."
        },
        {
          "tr": "Tetrazol bir karboksilik asit değildir; açil grubu taşımaz.",
          "ar": "التترازول حلقة عطرية ولا يحتوي على مجموعة كربونيل أسيلية.",
          "en": "Tetrazole is an aromatic ring lacking a carbonyl group, precluding acyl ester conjugation."
        },
        {
          "tr": "Tetrazol açil glukuronidasyona uğramaz; böylece reaktif metabolit toksisitesi ortadan kalkar ve yarı ömür uzar.",
          "ar": "يقاوم التترازول هذا النمط من الاقتران، مما يزيل السمية التفاعلية ويطيل عمر الدواء في البلازما.",
          "en": "Tetrazole resists acyl glucuronidation, eliminating reactive metabolite formation and sustaining predictable exposure."
        }
      ],
      "sources": [{ "file": "Biyoizosterizm.pdf", "page": 9 }]
    },
    {
      "id": "mc-mod3-les2-step-10",
      "stage": "retrieval",
      "stageIndex": 10,
      "type": "retrieval",
      "title": {
        "tr": "Aralıklı Hatırlama: Prokain vs Prokainamid Yarı Ömür Farkı",
        "ar": "استرجاع متباعد: فارق نصف العمر بين البروكائين والبروكائيناميد",
        "en": "Spaced Retrieval: Procaine vs Procainamide Half-Life"
      },
      "prompt": {
        "tr": "Prokain (ester) plazmada psödokolinesteraz ile saniyeler içinde hidroliz olurken, amit izosteri olan prokainamidin yarılanma ömrü neden 3-4 saate uzar? Hangi bağ kararlılığı devreye girer?",
        "ar": "بينما يتحلل البروكائين (إستر) خلال ثوانٍ بأنزيمات الكولينستراز، لماذا يمتد نصف عمر نظيره الأميدي بروكائيناميد إلى 3-4 ساعات؟ ما نوع ثبات الرابطة؟",
        "en": "While ester procaine is cleaved by pseudocholinesterase in seconds, why does its amide bioisostere procainamide survive for 3-4 hours in plasma? What orbital resonance protects it?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-10a",
            "text": {
              "tr": "Azotun serbest elektron çifti karbonile güçlü rezonansla katılarak (kısmi çift bağ karakteri) karbonil karbonunun elektrofilikliğini düşürür ve esterazların nükleofilik atağını engeller.",
              "ar": "يشارك زوج إلكترونات النيتروجين برنين قوي مع الكربونيل (مانحاً طابع الرابطة المزدوجة)؛ مخفضاً كهرومحبيتها ومقاوماً حلمهة الأستراز.",
              "en": "Nitrogen lone-pair resonance into the carbonyl imparts partial double-bond character, dampening electrophilicity and shielding against esterase nucleophilic attack."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Harika bir bağ teorisi hatırlaması! Amit azotunun ortaklanmamış elektron çifti karbonil ile güçlü rezonans yapar. C-N bağı kısmi çift bağ karakteri kazanır ve karbonil karbonu elektrofilik nükleofilik hidrolize dirençli hale gelir (Slide 15).",
              "ar": "تذكر ممتاز لنظرية الروابط! يشارك زوج النيتروجين برنين كثيف مع الكربونيل مانحاً الرابطة طابعاً مزدوجاً يجعلها منيعة على الحلمهة الاسترازية.",
              "en": "Superb resonance recall! Amide nitrogen delocalizes its lone pair into the carbonyl, creating partial double-bond character that thwarts esterase nucleophilic attack."
            }
          },
          {
            "id": "opt-10b",
            "text": {
              "tr": "Prokainamid molekülü kandaki kalsiyum ile taşlaşarak katı bir kireç tabakasına dönüşür.",
              "ar": "يتكلس جزيء بروكائيناميد مع كالسيوم الدم متحولاً إلى ترسبات حجرية صلبة.",
              "en": "Procainamide binds serum calcium, precipitating into an impenetrable limestone matrix."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kireçlenme yanılgısı: Prokainamid çözünür bir Sınıf IA antiaritmiktir; kalsiyum çökeltisi yapmaz.",
              "ar": "خطأ التكلس: البروكائيناميد دواء قلبي نظامي ذواب بالكامل ولا يتفاعل ترسبياً مع الكالسيوم.",
              "en": "Calcification misconception: Procainamide is a soluble Class IA antiarrhythmic small molecule, not a calcium precipitant."
            }
          },
          {
            "id": "opt-10c",
            "text": {
              "tr": "Amit bağı ester bağından 100 kat daha zayıftır, bu yüzden enzimler bağı bulamaz.",
              "ar": "رابطة الأميد أضعف بمئة مرة من الإستر مما يجعل الأنزيم عاجزاً عن رصدها.",
              "en": "Amide bonds are 100-fold weaker than esters, hiding from enzyme recognition."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Zayıf bağ yanılgısı: Amit bağı rezonans sayesinde esterden çok daha dayanıklıdır ve hidrolize dirençlidir.",
              "ar": "خطأ ضعف الرابطة: رابطة الأميد أكثر ثباتاً ومقاومة للحلمهة بمراحل مقارنة بالإستر.",
              "en": "Weak bond misconception: Amide bonds possess greater thermodynamic and kinetic stability against hydrolysis than esters."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "amit rezonans kararlılığı", "arContext": "ثبات رنين الأميد (amide resonance)" },
        { "term": "psödokolinesteraz hidrolizi", "arContext": "حلمهة أنزيم كولينستراز الكاذب" }
      ],
      "hints": [
        {
          "tr": "Esterde oksijen atomu vardır (-COO-); amitte ise azot atomu (-CONH-) bulunur.",
          "ar": "يحتوي الإستر على أكسجين (-COO-)، بينما يحتوي الأميد على نيتروجين (-CONH-).",
          "en": "Esters contain oxygen (-COO-); amides contain nitrogen (-CONH-)."
        },
        {
          "tr": "Azot, oksijene göre elektron çiftini karbonile çok daha hevesle verir (daha az elektronegatiftir).",
          "ar": "يتنازل النيتروجين عن زوجه الإلكتروني للكربونيل بسهولة أكبر من الأكسجين لقلة كهروسلبيته.",
          "en": "Nitrogen is less electronegative than oxygen, donating its lone pair into the carbonyl more readily."
        },
        {
          "tr": "Bu güçlü rezonans amit bağını düzlemsel ve kısmi çift bağlı kılar; esteraz enzimleri amiti parçalayamaz.",
          "ar": "يمنح هذا الرنين الرابطة طابعاً مزدوجاً مستوياً يجعلها مستعصية على التحلل بأنزيمات الإستراز.",
          "en": "This robust resonance imparts partial double-bond character, rendering procainamide refractory to plasma esterases."
        }
      ],
      "sources": [{ "file": "Biyoizosterizm.pdf", "page": 15 }]
    },
    {
      "id": "mc-mod3-les2-step-11",
      "stage": "connection",
      "stageIndex": 11,
      "type": "connection",
      "title": {
        "tr": "Bağlantı: Faz I/II Metabolizmasını Biyoizosterizm ile Savuşturmak",
        "ar": "ربط المفاهيم: درء استقلاب الطور الأول والثاني بالبيوإيزوستيرية",
        "en": "Cross-Topic Bridge: Evading Phase I/II Metabolism via Bioisosterism"
      },
      "prompt": {
        "tr": "Non-klasik biyoizosterik modifikasyonlar (tetrazol, amit, hidroksimetil), ilaçları Faz I sitokrom oksidasyonundan ve Faz II UGT/SULT konjugasyonundan nasıl korur? Gelecek metabolizma modülüyle bağlantıyı kurun:",
        "ar": "كيف تحمي التعديلات غير الكلاسيكية (التترازول، الأميد، هيدروكسي ميثيل) الأدوية من أكسدة السيتوكروم واقتران UGT/SULT؟ اربط بموديول الاستقلاب القادم:",
        "en": "How do non-classical bioisosteric replacements (tetrazole, amide, hydroxymethyl) shield drug candidates from Phase I CYP oxidation and Phase II UGT/SULT clearance? Connect to Module 5 Drug Metabolism:"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-11a",
            "text": {
              "tr": "Hassas metabolik odak noktalarını (karboksilat, katekol -OH, ester) enzimatik tanımanın dışına çıkararak ilaca metabolik direnç kazandırır ve yarı ömrü rasyonel olarak uzatır.",
              "ar": "تبعد المواقع الاستقلابية الحساسة (الكربوكسيل، الكاتيكول، الإستر) عن التعرف الأنزيمي؛ مانحة الدواء ثباتاً استقلابياً يطيل فاعليته.",
              "en": "They replace metabolically vulnerable soft spots (carboxylate, catechol -OH, ester) with enzyme-refractory mimics, rationally extending therapeutic half-life."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Mükemmel köprü! Biyoizosterizm farmakoforun reseptör cebindeki temasını korurken, vücudun Faz I ve Faz II metabolik makinelerine (CYP, UGT, SULT, COMT, esterazlar) karşı moleküle kamuflaj zırhı giydirir.",
              "ar": "ربط رائع! تحفظ المتشابهات الحيوية الارتباط الفعال بالمستقبل، بينما توفر درع تمويه ضد ترسانة أنزيمات الاستقلاب الكبدية (CYP و UGT و COMT).",
              "en": "Superb bridge! Bioisosterism preserves receptor pharmacophore contacts while cloaking vulnerable functional groups from Phase I (CYP) and Phase II (UGT, SULT, COMT) enzymes."
            }
          },
          {
            "id": "opt-11b",
            "text": {
              "tr": "Biyoizosterik ilaçlar vücuttaki tüm sitokrom ve glukuronidaz genlerini susturur.",
              "ar": "تقوم الأدوية البيوإيزوستيرية بإسكات وتثبيط كافة جينات السيتوكروم والغلوبيولين في الجسم.",
              "en": "Bioisosteres permanently silence all CYP and UGT gene transcription in human tissues."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Gen susturma yanılgısı: İlaç substrat yapısı değişir; hastanın genomu veya metabolik enzimleri genetik olarak susturulmaz.",
              "ar": "خطأ إسكات الجينات: التعديل يتم في بنية الدواء المتفاعلة وليس عبر تعطيل جينات المريض.",
              "en": "Gene silencing misconception: Bioisosteric modification alters ligand structure, not host metabolic gene expression."
            }
          },
          {
            "id": "opt-11c",
            "text": {
              "tr": "Metabolizmadan kaçan her ilaç zehirli bir radyoaktif atığa dönüşür.",
              "ar": "يتحول كل دواء يفلت من الاستقلاب إلى نفايات مشعة سامة.",
              "en": "Any drug evading hepatic metabolism inevitably degrades into radioactive biohazard."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Radyoaktif atık yanılgısı: Kararlı ilaçlar böbreklerden veya safradan değişmeden güvenle atılır.",
              "ar": "خطأ الإشعاع: تطرح الأدوية المقاومة للاستقلاب بسلام دون تغير عبر الكلى أو الصفراء.",
              "en": "Radioactive hazard misconception: Stable drugs are cleared intact via renal filtration or biliary transport without radiochemical degradation."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "Faz I/II metabolizma kamuflajı", "arContext": "تمويه استقلاب الطور الأول والثاني" },
        { "term": "metabolik odak noktası (soft spot)", "arContext": "الموقع الاستقلابي القابل للتخريب" }
      ],
      "hints": [
        {
          "tr": "İlaç metabolizmasında amaç molekülü hidrofilik yapıp vücuttan atmaktır.",
          "ar": "يهدف استقلاب الدواء إلى زيادة قطبيته وتسهيل طرحه خارج الجسم.",
          "en": "Drug metabolism transforms lipophilic xenobiotics into polar conjugates for excretion."
        },
        {
          "tr": "Enzimler belirli kimyasal grupları tanır (örneğin COMT katekol arar, esteraz ester arar, UGT karboksilat arar).",
          "ar": "تتعرف الأنزيمات على مجموعات محددة (يبحث COMT عن الكاتيكول، والأستراز عن الإستر، و UGT عن الكربوكسيل).",
          "en": "Metabolic enzymes recognize specific motifs (COMT targets catechols, esterases target esters, UGT targets carboxylates)."
        },
        {
          "tr": "Biyoizosterik gruplar bu enzimlerin nükleofilik veya oksidatif atağını sterik/elektronik olarak boşa çıkarır.",
          "ar": "تحبط المجموعات البيوإيزوستيرية هجوم هذه الأنزيمات فراغياً وإلكترونياً.",
          "en": "Bioisosteres subvert metabolic attack electronically and sterically while maintaining receptor fit."
        }
      ],
      "sources": [{ "file": "Biyoizosterizm.pdf", "page": 10 }]
    },
    {
      "id": "mc-mod3-les2-step-12",
      "stage": "mastery_check",
      "stageIndex": 12,
      "type": "mastery_check",
      "title": {
        "tr": "Ustalık Sınavı: COX-2 İnhibitöründe Asidik İzoster Tasarımı",
        "ar": "اختبار الإتقان: تصميم إيزوستير حامضي لمثبط COX-2",
        "en": "Mastery Challenge: Non-Classical Acidic Isostere in COX-2 Design"
      },
      "prompt": {
        "tr": "Yeni bir COX-2 inhibitörü adayı terminal -COOH grubu yüzünden yalnızca %4 biyoyararlanım göstermekte ve mide ülseri yapmaktadır. COX-2 aktif cebindeki arginin ile bağı koruyan ve emilimi artıran non-klasik asidik izoster öneriniz:",
        "ar": "يعاني مرشح مثبط COX-2 جديد من توافر حيوي ضعيف (4%) وقرحة معدية بسبب مجموعة -COOH. اقترح بديلاً حامضياً غير كلاسيكي يرفع الامتصاص ويحفظ الارتباط بأرجنين COX-2:",
        "en": "A promising COX-2 inhibitor suffers from 4% oral bioavailability and gastric ulceration due to a terminal -COOH. Propose a non-classical acidic bioisostere that preserves active site arginine binding while maximizing lipophilicity:"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-12a",
            "text": {
              "tr": "1H-Tetrazol veya metilsülfonamid (-SO2NHCH3); asidik pKa (~4.5-5.5) ile Arg513'e iyonik bağı korurken lipofilisiteyi artırır, desolvasyonu düşürür ve mide irritasyonunu önler.",
              "ar": "1H-Tetrazole أو ميثيل سلفوناميد؛ يحافظان على pKa الحامضية والارتباط الأيوني مع Arg513 مع رفع النفاذية الدهنية وتجنب التخريش المعدي.",
              "en": "1H-Tetrazole or methyl sulfonamide; preserving acidic pKa (~4.5-5.5) for ionic docking to Arg513 while boosting logP, slashing desolvation, and eliminating gastric ulceration."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Tebrikler, mükemmel bir farmasötik kimya çözümü! Terminal -COOH yerine tetrazol veya sülfonamid getirilmesi: 1) pKa'yı ~4.5-5.5 aralığında tutarak Arg513 ile tuz köprüsünü korur, 2) logP'yi artırıp desolvasyonu azaltarak biyoyararlanımı fırlatır, 3) lokal serbest asit etkisini kırarak mide mukozasını korur.",
              "ar": "تهانينا، حل دوائي متقن! استبدال -COOH بالتترازول أو السلفوناميد: 1) يحفظ الرابطة الأيونية مع Arg513، 2) يرفع التوافر الحيوي لتقليل طاقة نزع الماء، 3) يحمي الغشاء المعدي من القرحة.",
              "en": "Mastery demonstrated! Swapping terminal -COOH for tetrazole or sulfonamide preserves ionic pairing with Arg513, multiplies oral bioavailability via lowered desolvation, and spares gastric mucosa from direct acid injury."
            }
          },
          {
            "id": "opt-12b",
            "text": {
              "tr": "Kuvaterner amonyum (-N+Me3); kalıcı pozitif yüküyle mide asidini nötralize eder ancak COX-2'ye hiç bağlanamaz.",
              "ar": "أمونيوم رباعي (-N+Me3)؛ يعادل حمض المعدة بشحنته الموجبة لكنه يفقد الارتباط تماماً مع COX-2.",
              "en": "Quaternary ammonium (-N+Me3); neutralizes gastric acid but completely destroys COX-2 active site binding."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Zıt yük yanılgısı: Reseptördeki hedef amino asit Arginindir (pozitif katyonik guanidinyum). Pozitif amonyum takılırsa iki pozitif yük birbirini iter ve afinite sıfıra iner.",
              "ar": "خطأ تنافر الشحنات: ثمالة الأرجنين في الموقع الفعال موجبة الشحنة؛ إضافة أمونيوم موجب يسبب تنافراً كهربائياً عنيفاً يلغي الفعالية.",
              "en": "Charge clash misconception: Target Arg513 bears a positive guanidinium ion; an ammonium substituent causes severe electrostatic repulsion."
            }
          },
          {
            "id": "opt-12c",
            "text": {
              "tr": "Sadece saf benzen halkası; hiçbir fonksiyonel grup taşımayan moleküller tüm enzimlere eşit bağlanır.",
              "ar": "حلقة بنزين مجردة؛ فالجزيئات الخالية من المجموعات ترتبط بكافة الأنزيمات بالتساوي.",
              "en": "An unsubstituted benzene ring; functional-group-free scaffolds bind all enzymes equally."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Apolar yanılgı: Arg513 katyonu güçlü bir iyonik/dipol eşleşme arar; apolar benzen halkası bu bağı sağlayamaz.",
              "ar": "خطأ اللاقطبية: يتطلب جيب أرجنين Arg513 مجموعة حامضية قطبية؛ ولا تستطيع حلقة البنزين المجردة تشكيل هذا الجسر الأيوني.",
              "en": "Apolar misconception: Arg513 requires a complementary acidic anionic pharmacophore; an apolar benzene ring cannot form the crucial salt bridge."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "COX-2 aktif cebi", "arContext": "جيب COX-2 الفعال" },
        { "term": "asidik biyoizosterik değişim", "arContext": "التبديل البيوإيزوستيري الحامضي" }
      ],
      "hints": [
        {
          "tr": "Hedef amino asit Arginindir (pozitif guanidinyum başı taşır). Karşısına negatif/asidik bir grup gelmelidir.",
          "ar": "الحمض الأميني المستهدف هو الأرجنين (موجب الشحنة)؛ لذا يلزم وجود مجموعة مقابلة ذات شحنة سالبة/حامضية.",
          "en": "Target Arg513 bears a cationic guanidinium group, requiring a complementary acidic/anionic partner."
        },
        {
          "tr": "Karboksilik asidin asidik pKa'sını (~4.5-5.5) taklit eden ancak daha lipofilik olan non-klasik grupları hatırlayın.",
          "ar": "تذكر المتشابهات غير الكلاسيكية التي تحاكي حامضية الكربوكسيل مع انحلال دهني أفضل.",
          "en": "Recall non-classical groups that mimic carboxylic acid pKa (~4.5-5.5) with higher lipophilicity."
        },
        {
          "tr": "1H-tetrazol veya sülfonamid grupları Arg513 ile tuzu korur, logP'yi artırıp biyoyararlanımı kurtarır ve mide tahrişini önler.",
          "ar": "يحقق التترازول أو السلفوناميد الرابطة الأيونية مع رفع النفاذية ومنع تخريش المعدة.",
          "en": "1H-tetrazole or acyl sulfonamide preserves the Arg513 salt bridge, elevates logP, and abolishes ulcerogenicity."
        }
      ],
      "sources": [{ "file": "Biyoizosterizm.pdf", "page": 9 }]
    }
  ]
};

const targetPath = path.resolve(__dirname, '../courses/medchem/lessons/lesson-06.json');
fs.writeFileSync(targetPath, JSON.stringify(lesson06, null, 2) + '\n', 'utf8');
console.log('Successfully wrote lesson-06.json to:', targetPath);
