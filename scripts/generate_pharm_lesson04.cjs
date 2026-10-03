const fs = require('fs');
const path = require('path');

const lesson04 = {
  "$schema": "../../../packages/platform/schema/lesson.schema.json",
  "id": "pharm-mod2-les2",
  "courseId": "pharmacology",
  "moduleId": "ph-mod-02",
  "title": {
    "tr": "Reseptör Antagonizmi: Yarışmalı ve Yarışmasız Blokaj",
    "ar": "مناهضة المستقبِلات: الحصار التنافسي وغير التنافسي",
    "en": "Receptor Antagonism: Competitive & Non-Competitive Blockade"
  },
  "order": 2,
  "access": "free",
  "objective": {
    "tr": "Yarışmalı (kompetitif) ve yarışmasız (non-kompetitif) antagonizma mekanizmalarını ayırt etmek, Schild denklemini uygulayarak pA2 ve Kb afinitesini hesaplamak.",
    "ar": "التمييز بين آليات المناهضة التنافسية وغير التنافسية، وتطبيق معادلة Schild لحساب pA2 وثابت الألفة Kb بدقة.",
    "en": "Distinguish competitive from non-competitive antagonism mechanisms, and apply the Schild equation to calculate pA2 and Kb affinity constants."
  },
  "misconceptions": [
    {
      "tr": "Yarışmasız (allosterik veya kovalent) antagonistlerin oluşturduğu biyolojik blokajın ortamdaki agonist konsantrasyonu sonsuza kadar artırılarak aşılabileceği yanılgısı.",
      "ar": "الاعتقاد الخاطئ بإمكانية التغلب على الحصار غير التنافسي (التباعدي أو التساهمي) بمجرد زيادة تركيز المنبه إلى ما لا نهاية.",
      "en": "The misconception that non-competitive or irreversible blockade can eventually be overcome by escalating agonist concentration indefinitely."
    },
    {
      "tr": "pA2 değerinin antagonistin toksik veya ölümcül dozunu temsil ettiği yanılgısı (aslında doz oranını r=2 yapan afinite indeksidir: pA2 = -log Kb).",
      "ar": "الظن الخاطئ بأن قيمة pA2 تعبر عن الجرعة السامة أو القاتلة للمضاد (بينما هي مؤشر ألفة المضاد الذي يضاعف جرعة المنبه: pA2 = -log Kb).",
      "en": "The misconception that pA2 reflects an antagonist's toxicity or lethal dose, rather than its equilibrium affinity index where r = 2 (pA2 = -log Kb)."
    },
    {
      "tr": "Aşırı doz fentanil zehirlenmesinde tek bir ampul nalokson uygulamasının hastayı kalıcı olarak kurtaracağı varsayımı (naloksonun yarı ömrü fentanilden çok daha kısadır, etki geçince solunum arresti tekrarlar).",
      "ar": "الافتراض الخاطئ بأن جرعة وحيدة من النالوكسون كافية لعلاج التسمم بالفنتانيل بشكل نهائي (عمر النصف للنالوكسون أقصر بكثير، وسيعود التثبيط التنفسي).",
      "en": "The dangerous assumption that a single dose of naloxone permanently resolves fentanyl overdose, ignoring that naloxone's short half-life permits rebound respiratory arrest."
    }
  ],
  "sources": [
    {
      "file": "Farmakodinami-Doz Yanıt.pdf",
      "page": 24
    },
    {
      "file": "Farmakodinami-Doz Yanıt.pdf",
      "page": 26
    },
    {
      "file": "Farmakodinami-Doz Yanıt.pdf",
      "page": 28
    },
    {
      "file": "Farmakodinami-Doz Yanıt.pdf",
      "page": 30
    },
    {
      "file": "Farmakodinami-Doz Yanıt.pdf",
      "page": 33
    }
  ],
  "citations": [
    {
      "id": "CIT-PH04-01",
      "book": "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
      "edition": "14th ed.",
      "topic": "Receptor Antagonism: Competitive, Noncompetitive, and Schild Analysis",
      "chapter": "Chapter 3",
      "page": "60-80",
      "status": "verified"
    },
    {
      "id": "CIT-PH04-02",
      "book": "Katzung Basic & Clinical Pharmacology",
      "edition": "15th ed.",
      "topic": "Competitive & Irreversible Antagonists, Allosteric Modulators, and Quantitation",
      "chapter": "Chapter 2",
      "page": "28-44",
      "status": "verified"
    }
  ],
  "numericClaims": [
    {
      "id": "NUM-PH04-01",
      "parameter": "Schild Regresyon Doğru Eğimi (Kompetitif 1:1)",
      "value": "Eğim = 1.0 (log(r-1) = log[B] - log Kb)",
      "status": "verified",
      "referencePassage": "Slide 28 & Goodman & Gilman Ch.3: Basit kompetitif antagonizmada Schild doğrusunun eğimi tam 1.0'dir; x kesişimi pA2 = -log Kb değerini verir."
    },
    {
      "id": "NUM-PH04-02",
      "parameter": "Doz Oranı (r = 2) Tanımı ve pA2",
      "value": "r = 2 -> log(2-1) = 0 -> [B] = Kb -> pA2 = -log Kb",
      "status": "verified",
      "referencePassage": "Slide 30: pA2, agonist dozunu 2 katına çıkaran (r=2) antagonist molar konsantrasyonunun negatif logaritmasıdır."
    },
    {
      "id": "NUM-PH04-03",
      "parameter": "Nalokson vs Fentanil Plazma Yarı Ömrü",
      "value": "t1/2 ≈ 30-60 dk (Nalokson) vs t1/2 ≈ 3-7 saat (Fentanil)",
      "status": "verified",
      "referencePassage": "Katzung Ch.31: Naloksonun hızlı klirensi nedeniyle fentanil aşırı dozlarında tekrarlayan doz veya infüzyon gerekir."
    }
  ],
  "spacedReviewCards": [
    {
      "cardId": "pharm-mod2-les2-card1",
      "courseId": "pharmacology",
      "drugOrConcept": "Kompetitif Antagonizma Eğri Belirtisi",
      "prompt": "Yarışmalı (kompetitif) bir antagonist agonist doz-yanıt eğrisinde ne tür bir değişim yaratır?",
      "answer": "Maksimum yanıtı (Emax) değiştirmeden eğriyi paralel olarak sağa kaydırır; artan agonist dozuyla blokaj tamamen aşılabilir (surmountable).",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "pharm-mod2-les2-card2",
      "courseId": "pharmacology",
      "drugOrConcept": "Non-Kompetitif / İrreversibl Antagonizma",
      "prompt": "Non-kompetitif veya geri dönüşümsüz (kovalent) antagonistlerin eğrideki karakteristik imzası nedir?",
      "answer": "Yedek reseptör rezervi aşıldıktan sonra maksimum yanıt tavanını (Emax) aşılmaz biçimde aşağı bastırır (depresyon).",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "pharm-mod2-les2-card3",
      "courseId": "pharmacology",
      "drugOrConcept": "Schild Eşitliği ve Eğim 1.0",
      "prompt": "Schild grafiğinde log(r-1) vs log[B] doğrusunun eğiminin tam 1.0 çıkması neyi kanıtlar?",
      "answer": "Antagonist ile agonistin tek bir reseptör cebi için 1:1 oranında yarışmalı (kompetitif) etkileştiğini kanıtlar.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "pharm-mod2-les2-card4",
      "courseId": "pharmacology",
      "drugOrConcept": "pA2 Değeri Tanımı ve Anlamı",
      "prompt": "Schild analizindeki pA2 değeri biyofiziksel olarak neyi ifade eder?",
      "answer": "Agonistin aynı yanıtı vermesi için dozunu 2 katına (doz oranı r = 2) çıkarmayı gerektiren antagonist derişiminin negatif logaritmasıdır (-log Kb).",
      "box": 1,
      "intervalDays": 1
    }
  ],
  "translations": {
    "tr": {
      "title": "Reseptör Antagonizmi: Yarışmalı ve Yarışmasız Blokaj"
    },
    "ar": {
      "title": "مناهضة المستقبِلات: الحصار التنافسي وغير التنافسي"
    }
  },
  "steps": [
    {
      "id": "pharm-mod2-les2-step-01",
      "stage": "hook",
      "stageIndex": 1,
      "type": "predict_reveal",
      "title": {
        "tr": "Klinik Paradoks: Aşılabilen ve Aşılamayan Blokaj",
        "ar": "مفارقة سريرية: الحصار القابل وغير القابل للتجاوز",
        "en": "Clinical Paradox: Surmountable vs Insurmountable Blockade"
      },
      "prompt": {
        "tr": "Organ banyosunda atropinle durdurulan bağırsak kasılması asetilkolin artırılarak tamamen kurtarılırken; feokromositomada fenoksibenzamin blokajı devasa adrenalin patlamalarıyla neden aşılamaz?",
        "ar": "بينما يُستعاد تقلص الأمعاء المحصور بالأتروبين بزيادة تركيز أستيل كولين، يعجز الأدرينالين المتدفق بغزارة في ورم القواتم عن كسر حصار فينوكسي بنزامين! لماذا؟",
        "en": "While intestinal spasm blocked by atropine is fully restored by adding acetylcholine, phenoxybenzamine blockade in pheochromocytoma resists even massive adrenaline surges. Why?"
      },
      "predictThenReveal": true,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-1a",
            "text": {
              "tr": "Atropin tersinir yarışmalı (kompetitif) olup agonist artışıyla aşılabilir; fenoksibenzamin ise alfa reseptörleri kovalent alkilasyonla kalıcı kilitlediği için aşılamaz (insurmountable).",
              "ar": "الأتروبين مضاد تنافسي عكوس يمكن تجاوزه بزيادة المنبه؛ بينما يقفل فينوكسي بنزامين مستقبلات ألفا تساهمياً بشكل غير عكوس وغير قابل للتجاوز.",
              "en": "Atropine is a reversible competitive blocker surmounted by excess agonist; phenoxybenzamine locks alpha receptors irreversibly via covalent alkylation."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Doğru! Kompetitif antagonistler dinamik dengededir ve aşırı agonist tarafından kovulabilir (surmountable). Kovalent veya non-kompetitif antagonistler ise reseptör sayısını eksilttiği için aşılamaz (insurmountable).",
              "ar": "صحيح! تخضع المضادات التنافسية لتوازن حركي ويمكن للمنبه طردها؛ بينما تنقص المواد التساهمية حوض المستقبِلات بشكل نهائي غير قابل للكسر.",
              "en": "Correct! Competitive blockers follow dynamic equilibria and can be outcompeted; covalent alkylators permanently diminish functional target pools."
            }
          },
          {
            "id": "opt-1b",
            "text": {
              "tr": "Atropin kanda asetilkolini kovalent parçalar; fenoksibenzamin ise adrenalinin kalbe girmesini mekanik olarak perdeler.",
              "ar": "يقوم الأتروبين بتفكيك أستيل كولين تساهمياً، بينما يشكل فينوكسي بنزامين حاجزاً ميكانيكياً يمنع دخول الأدرينالين للقلب.",
              "en": "Atropine covalently cleaves acetylcholine in blood, whereas phenoxybenzamine forms a physical barrier around cardiac tissue."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kimyasal parçalama yanılgısı: Atropin muskarinik reseptör aktif cebinde yarışır; asetilkolini parçalamaz. İki antagonistin farkı kovalent vs non-kovalent doğalarıdır.",
              "ar": "خطأ التفكيك الكيميائي: ينافس الأتروبين على الجيب النشط للمستقبل المسكاريني؛ والفارق الجوهري يكمن في عكوسية الروابط مقابل الرابطة التساهمية.",
              "en": "Degradation error: Atropine competes at muscarinic receptor pockets; the divergence stems from reversible versus covalent chemical bonding."
            }
          },
          {
            "id": "opt-1c",
            "text": {
              "tr": "Adrenalin fenoksibenzamin varlığında hemen inaktif bir serotonine dönüşerek reseptörden kaçar.",
              "ar": "يتحول الأدرينالين فوراً بوجود فينوكسي بنزامين إلى سيروتونين خامل يهرب من المستقبل.",
              "en": "Adrenaline transforms into inactive serotonin in the presence of phenoxybenzamine, avoiding receptor engagement."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Biyokimyasal saçmalık: Adrenalin serotonine dönüşemez; fenoksibenzamin alfa-adrenerjik reseptörleri kovalent bloke eder ve aşırı adrenalin bile bu kilitli reseptörleri açamaz.",
              "ar": "خطأ كيميائي حيوي فادح: لا يتحول الأدرينالين إلى سيروتونين؛ بل يقفل فينوكسي بنزامين مستقبلات ألفا تساهمياً ليعجز الأدرينالين عن تشغيلها.",
              "en": "Biochemical absurdity: Adrenaline cannot transform into serotonin; phenoxybenzamine permanently alkylates alpha receptors."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "aşılabilir (surmountable) blokaj",
          "arContext": "حصار قابل للتجاوز (surmountable)"
        },
        {
          "term": "aşılamaz (insurmountable) blokaj",
          "arContext": "حصار غير قابل للتجاوز (insurmountable)"
        }
      ],
      "hints": [
        {
          "tr": "Ligandın reseptör cebinden ayrılıp ayrılamayacağını (reversibilite) düşünün.",
          "ar": "فكر في قدرة الربيط على الانفصال عن جيب المستقبل (العكوسية).",
          "en": "Consider whether the ligand can dissociate from the binding pocket (reversibility)."
        },
        {
          "tr": "Atropin tersinir non-kovalent bağlarla tutunur; asetilkolin artırılınca yarışmayı kazanır.",
          "ar": "يرتبط الأتروبين بروابط غير تساهمية عكوسة، فيطرده أستيل كولين بزيادة الجرعة.",
          "en": "Atropine binds reversibly via non-covalent forces; adding acetylcholine outcompetes it."
        },
        {
          "tr": "Fenoksibenzamin kovalent alkilasyon yapar (50-150 kcal/mol); adrenalin ne kadar çok olursa olsun bağı koparamaz.",
          "ar": "يؤسس فينوكسي بنزامين ألكلة تساهمية؛ ومهما زاد الأدرينالين فلن يستطيع كسر الرابطة.",
          "en": "Phenoxybenzamine alkylates targets covalently; no amount of adrenaline can break that bond."
        }
      ],
      "sources": [
        {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 24
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-1a",
            "text": "Atropin tersinir yarışmalı (kompetitif) olup agonist artışıyla aşılabilir; fenoksibenzamin ise alfa reseptörleri kovalent alkilasyonla kalıcı kilitlediği için aşılamaz (insurmountable).",
            "isCorrect": true,
            "misconceptionFeedback": "Doğru! Kompetitif antagonistler dinamik dengededir ve aşırı agonist tarafından kovulabilir (surmountable). Kovalent veya non-kompetitif antagonistler ise reseptör sayısını eksilttiği için aşılamaz (insurmountable)."
          },
          {
            "id": "opt-1b",
            "text": "Atropin kanda asetilkolini kovalent parçalar; fenoksibenzamin ise adrenalinin kalbe girmesini mekanik olarak perdeler.",
            "isCorrect": false,
            "misconceptionFeedback": "Kimyasal parçalama yanılgısı: Atropin muskarinik reseptör aktif cebinde yarışır; asetilkolini parçalamaz. İki antagonistin farkı kovalent vs non-kovalent doğalarıdır."
          },
          {
            "id": "opt-1c",
            "text": "Adrenalin fenoksibenzamin varlığında hemen inaktif bir serotonine dönüşerek reseptörden kaçar.",
            "isCorrect": false,
            "misconceptionFeedback": "Biyokimyasal saçmalık: Adrenalin serotonine dönüşemez; fenoksibenzamin alfa-adrenerjik reseptörleri kovalent bloke eder ve aşırı adrenalin bile bu kilitli reseptörleri açamaz."
          }
        ],
        "revealedOutcome": {
          "tr": "Atropin kompetitif antagonisttir: Agonist artırılarak blokaj tamamen aşılabilir (surmountable, Emax korunur). Fenoksibenzamin kovalent/irreversibl blokerdir: Agonist ne kadar artırılırsa artırılsın blokaj aşılamaz (insurmountable, Emax çöker).",
          "ar": "الأتروبين مضاد تنافسي: يمكن كسر حصاره بالكامل بزيادة المنبه (Emax ثابت). أما فينوكسي بنزامين فمضاد تساهمي غير عكوس: لا يمكن كسر حصاره أبداً (يهبط سقف Emax).",
          "en": "Atropine is competitive: blockade is fully surmountable by excess agonist (preserved Emax). Phenoxybenzamine is irreversible: blockade is insurmountable (depressed Emax)."
        },
        "explanation": {
          "tr": "Antagonizma sınıflamasında temel ayrım: Kompetitif antagonistler aynı ortosterik bölgeye tersinir bağlanarak eğriyi paralel sağa kaydırır (surmountable). Non-kompetitif veya kovalent antagonistler ise Emax tavanını aşılmaz biçimde ezer (Farmakodinami Slayt 24).",
          "ar": "التصنيف الجوهري للمناهضة: ترتبط المضادات التنافسية عكوسياً بنفس الموقع لتزيح المنحنى يميناً، بينما تهبط المضادات غير التنافسية أو التساهمية بسقف Emax قسراً.",
          "en": "Fundamental distinction: competitive blockers bind orthosteric sites reversibly (parallel right shift, surmountable); non-competitive/covalent blockers crush Emax."
        }
      }
    },
    {
      "id": "pharm-mod2-les2-step-02",
      "stage": "question",
      "stageIndex": 2,
      "type": "question",
      "title": {
        "tr": "Karakteristik İmza: Paralel Sağa Kayma",
        "ar": "البصمة المميزة: الانزياح الموازي نحو اليمين",
        "en": "Characteristic Signature: Parallel Rightward Shift"
      },
      "prompt": {
        "tr": "Konsantrasyon-yanıt eğrisinde kompetitif bir antagonistin varlığında eğrinin eğimi ve maksimum tavanı (Emax) değişmeden sağa paralel kayması neyi kanıtlar?",
        "ar": "على منحنى التركيز والاستجابة، ماذا يثبت انزياح المنحنى يميناً بشكل موازٍ مع بقاء الميل وأقصى استجابة (Emax) دون تغيير بوجود مضاد تنافسي؟",
        "en": "On a concentration-response plot, what does a parallel rightward shift with preserved slope and unchanged maximal response (Emax) prove regarding antagonism?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-2a",
            "text": {
              "tr": "Antagonist ve agonistin aynı ortosterik bağlanma bölgesi için yarıştığını ve yeterli agonist verildiğinde blokajın tamamen aşılabileceğini kanıtlar.",
              "ar": "يثبت تنافس المنبه والمضاد على نفس موقع الارتباط الأصيل (orthosteric)، وإمكانية التغلب على الحصار تماماً بزيادة المنبه.",
              "en": "It proves that agonist and antagonist compete for identical orthosteric sites, and that antagonism is fully surmountable by escalating agonist."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Doğru! Eğim ve Emax değişmeksizin eğrinin sağa kayması (surmountable rightward shift) klasik kompetitif farmakolojik antagonizmanın altın standardıdır (Slayt 26).",
              "ar": "صحيح! انزياح المنحنى يميناً بشكل موازٍ مع ثبات الميل وEmax هو المعيار الذهبي لإثبات المناهضة التنافسية الدوائية الحقيقية.",
              "en": "Correct! A parallel rightward displacement with identical slope and unaltered Emax is the gold standard for competitive pharmacological antagonism."
            }
          },
          {
            "id": "opt-2b",
            "text": {
              "tr": "Antagonistin reseptörü kalıcı olarak yıktığını ve yeni reseptör sentezlendiğini kanıtlar.",
              "ar": "يثبت أن المضاد قد خرب المستقبل نهائياً وتم تصنيع مستقبلات بديلة.",
              "en": "It proves that the antagonist permanently degraded the receptor, triggering de novo protein synthesis."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kalıcı hasar yanılgısı: Reseptör tahribatı Emax'ı çökerterek non-paralel depresyon yaratır; paralel sağa kayma dinamik ve tersinir yer değiştirmedir.",
              "ar": "خطأ التخريب الدائم: يؤدي تدمير المستقبِلات إلى هبوط سقف Emax؛ بينما يمثل الانزياح الموازي إزاحة حركية عكوسة نقية.",
              "en": "Destruction error: Target degradation depresses Emax; parallel rightward shifts represent reversible mass-action displacement."
            }
          },
          {
            "id": "opt-2c",
            "text": {
              "tr": "Agonistin hücre içinde kovalent bağlar kurarak ilacın atılımını durdurduğunu kanıtlar.",
              "ar": "يثبت تشكيل المنبه روابط تساهمية داخل الخلية عطلت إطراح الدواء.",
              "en": "It proves that the agonist forms intracellular covalent bonds that halt drug clearance."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kinetik yanılgı: Doz-yanıt eğrileri reseptör işgalini gösterir; eliminasyon klirensi veya kovalent tutulma ile doğrudan ilişkili değildir.",
              "ar": "خطأ حركي: تقيس منحنيات الجرعة والاستجابة إشغال المستقبِلات؛ ولا علاقة لها بالإطراح أو الارتباط التساهمي الداخلي.",
              "en": "Kinetic confusion: In vitro dose-response measures receptor occupancy; it is unrelated to systemic clearance or covalent trapping."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "paralel sağa kayma",
          "arContext": "الانزياح الموازي نحو اليمين"
        },
        {
          "term": "ortosterik bağlanma bölgesi",
          "arContext": "موقع الارتباط الأصيل (orthosteric site)"
        }
      ],
      "hints": [
        {
          "tr": "Eğrinin eğimi değişmemiş ve tepe noktası (Emax) hala %100'e ulaşıyor.",
          "ar": "ميل المنحنى لم يتغير والقمة (Emax) ما تزال تبلغ 100%.",
          "en": "Curve slope is unchanged and the peak (Emax) still reaches 100%."
        },
        {
          "tr": "Sadece aynı etkiyi almak için daha yüksek konsantrasyonda agonist gerekiyor.",
          "ar": "يتطلب الأمر فقط تركيزاً أعلى من المنبه للحصول على نفس الاستجابة.",
          "en": "Higher agonist concentrations are simply needed to match former response levels."
        },
        {
          "tr": "Bu durum iki molekülün aynı cebe yarıştığını ve aşırı agonist ile antagonistin kovulabildiğini kanıtlar.",
          "ar": "يثبت هذا تنافس الجزيئين على نفس الجيب وإمكانية طرد المضاد بزيادة المنبه.",
          "en": "This proves both molecules vie for the same site, and excess agonist displaces the blocker."
        }
      ],
      "sources": [
        {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 26
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-2a",
            "text": "Antagonist ve agonistin aynı ortosterik bağlanma bölgesi için yarıştığını ve yeterli agonist verildiğinde blokajın tamamen aşılabileceğini kanıtlar.",
            "isCorrect": true,
            "misconceptionFeedback": "Doğru! Eğim ve Emax değişmeksizin eğrinin sağa kayması (surmountable rightward shift) klasik kompetitif farmakolojik antagonizmanın altın standardıdır (Slayt 26)."
          },
          {
            "id": "opt-2b",
            "text": "Antagonistin reseptörü kalıcı olarak yıktığını ve yeni reseptör sentezlendiğini kanıtlar.",
            "isCorrect": false,
            "misconceptionFeedback": "Kalıcı hasar yanılgısı: Reseptör tahribatı Emax'ı çökerterek non-paralel depresyon yaratır; paralel sağa kayma dinamik ve tersinir yer değiştirmedir."
          },
          {
            "id": "opt-2c",
            "text": "Agonistin hücre içinde kovalent bağlar kurarak ilacın atılımını durdurduğunu kanıtlar.",
            "isCorrect": false,
            "misconceptionFeedback": "Kinetik yanılgı: Doz-yanıt eğrileri reseptör işgalini gösterir; eliminasyon klirensi veya kovalent tutulma ile doğrudan ilişkili değildir."
          }
        ],
        "revealedOutcome": {
          "tr": "Paralel sağa kayma: Kompetitif antagonist ortamdayken Emax ve eğim korunur, yalnızca görünür EC50 artar (eğri sağa ötelenir). Bu durum yarışmalı ve aşılabilir blokajın kesin kanıtıdır.",
          "ar": "الانزياح الموازي: بوجود مضاد تنافسي يثبت Emax والميل ويزداد EC50 الظاهري فقط؛ وهو البرهان القاطع على المناهضة التنافسية القابلة للتجاوز.",
          "en": "Parallel rightward shift: In competitive antagonism, Emax and slope remain constant while apparent EC50 increases. This proves surmountable, orthosteric competition."
        },
        "explanation": {
          "tr": "Gaddum denklemi: [DR] / [Rt] = [A] / ([A] + Ka * (1 + [B]/Kb)). Antagonist [B] arttıkça agonistin afinite paydası çarpanla büyür; bu durum eğriyi şeklini bozmadan sağa öteler (Slayt 26).",
          "ar": "معادلة Gaddum: وجود المضاد [B] يضاعف مقام الألفة بعامل تمدد دون المساس بسعة النسيج القصوى، فينزاح المنحنى يميناً بتناظر تام.",
          "en": "Gaddum equation demonstrates that antagonist concentration [B] scales apparent Kd by (1 + [B]/Kb), shifting curves horizontally without altering maximum capacity."
        }
      }
    },
    {
      "id": "pharm-mod2-les2-step-03",
      "stage": "intuition",
      "stageIndex": 3,
      "type": "intuition",
      "title": {
        "tr": "Schild Sezgisi: Doz Oranı (r) Nedir?",
        "ar": "حدس Schild: ما هي نسبة الجرعة (r)؟",
        "en": "Schild Intuition: What is Dose Ratio (r)?"
      },
      "prompt": {
        "tr": "Doz oranı (r = [A']/[A]), antagonist varlığında aynı biyolojik yanıtı elde etmek için gereken agonist katıdır. r = 10 ise bu durum ne anlama gelir?",
        "ar": "نسبة الجرعة (r = [A']/[A]) هي مضاعف المنبه اللازم لتحقيق نفس الاستجابة بوجود المضاد. إذا كانت r = 10، فماذا يعني ذلك حدسياً؟",
        "en": "The dose ratio (r = [A']/[A]) represents the fold-increase in agonist concentration needed to match control responses. What does r = 10 intuitively signify?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-3a",
            "text": {
              "tr": "Antagonist varlığında aynı biyolojik etkiyi (örneğin %50 kasılma) üretebilmek için agonist dozunu tam 10 kat artırmak gerekmektedir.",
              "ar": "يتطلب تحقيق نفس الاستجابة الحيوية (مثلاً 50% تقلص) بوجود المضاد مضاعفة جرعة المنبه 10 مرات تماماً.",
              "en": "To produce an identical biological effect (e.g. 50% contraction) in the presence of antagonist, agonist dose must be increased exactly 10-fold."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kesinlikle doğru! Doz oranı r, antagonistin yarattığı sağa kayma faktörüdür. r = 10 demek, ilacın aynı yanıtı vermesi için 10 kat daha yoğun verilmesi demektir (Slayt 28).",
              "ar": "صحيح تماماً! نسبة الجرعة r هي معامل الإزاحة لليمين؛ وتعني r = 10 مضاعفة الجرعة عشر مرات لمعادلة حجب المضاد.",
              "en": "Exactly right! Dose ratio r is the horizontal shift factor. r = 10 means 10-fold more agonist is required to match baseline activation."
            }
          },
          {
            "id": "opt-3b",
            "text": {
              "tr": "Dokudaki reseptörlerin %90'ının kovalent olarak tahrip edildiği anlamına gelir.",
              "ar": "يعني أن 90% من مستقبلات النسيج قد دُمرت تساهمياً بشكل نهائي.",
              "en": "It means that 90% of tissue receptors have been covalently destroyed."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kovalent tahribat yanılgısı: Doz oranı kompetitif yarışmayı ifade eder; reseptörler sağlamdır ve agonist artırılarak hepsi geri kazanılabilir.",
              "ar": "خطأ التدمير التساهمي: تعبر نسبة الجرعة عن منافسة نقية؛ والمستقبلات سليمة تماماً ويمكن استعادتها بزيادة المنبه.",
              "en": "Covalent destruction error: Dose ratio reflects reversible competition; receptors remain functional and fully recoverable."
            }
          },
          {
            "id": "opt-3c",
            "text": {
              "tr": "İlacın karaciğerdeki yarı ömrünün 10 dakikaya indiği anlamına gelir.",
              "ar": "يعني هبوط عمر النصف الحيوي للدواء في الكبد إلى 10 دقائق.",
              "en": "It means the drug's hepatic half-life has plummeted to 10 minutes."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Klirens yanılgısı: Doz oranı in vitro veya in vivo farmakodinamik reseptör afinite metriğidir; karaciğer yarı ömrüyle ilişkili değildir.",
              "ar": "خطأ التصفية الكبدية: نسبة الجرعة مقياس دوائي لديناميكا المستقبلات، ولا شأن لها بعمر النصف الاستقلابي.",
              "en": "Clearance error: Dose ratio measures target pharmacodynamics in tissue baths; it is unrelated to metabolic half-life."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "doz oranı (dose ratio, r)",
          "arContext": "نسبة الجرعة (dose ratio, r)"
        },
        {
          "term": "Gaddum-Schild kayma faktörü",
          "arContext": "معامل إزاحة Gaddum-Schild"
        }
      ],
      "hints": [
        {
          "tr": "r = [A'] / [A] formülünü inceleyin: Antagonistli doz bölü kontrol dozu.",
          "ar": "تأمل معادلة r = [A'] / [A]: تركيز المنبه بوجود المضاد مقسوماً على تركيز الشاهد.",
          "en": "Inspect r = [A'] / [A]: agonist concentration with antagonist divided by control."
        },
        {
          "tr": "Eğer r = 10 ise, pay paydadan 10 kat daha büyüktür.",
          "ar": "إذا كانت r = 10، فالبسط أكبر من المقام بعشر مرات.",
          "en": "If r = 10, the numerator is 10 times larger than the denominator."
        },
        {
          "tr": "Yani aynı etkiyi almak için 10 kat agonist dozu gerekir.",
          "ar": "أي أنك تحتاج لعشرة أضعاف الجرعة للحصول على نفس النتيجة.",
          "en": "Hence you need 10 times the agonist concentration to produce the same effect."
        }
      ],
      "sources": [
        {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 28
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-3a",
            "text": "Antagonist varlığında aynı biyolojik etkiyi (örneğin %50 kasılma) üretebilmek için agonist dozunu tam 10 kat artırmak gerekmektedir.",
            "isCorrect": true,
            "misconceptionFeedback": "Kesinlikle doğru! Doz oranı r, antagonistin yarattığı sağa kayma faktörüdür. r = 10 demek, ilacın aynı yanıtı vermesi için 10 kat daha yoğun verilmesi demektir (Slayt 28)."
          },
          {
            "id": "opt-3b",
            "text": "Dokudaki reseptörlerin %90'ının kovalent olarak tahrip edildiği anlamına gelir.",
            "isCorrect": false,
            "misconceptionFeedback": "Kovalent tahribat yanılgısı: Doz oranı kompetitif yarışmayı ifade eder; reseptörler sağlamdır ve agonist artırılarak hepsi geri kazanılabilir."
          },
          {
            "id": "opt-3c",
            "text": "İlacın karaciğerdeki yarı ömrünün 10 dakikaya indiği anlamına gelir.",
            "isCorrect": false,
            "misconceptionFeedback": "Klirens yanılgısı: Doz oranı in vitro veya in vivo farmakodinamik reseptör afinite metriğidir; karaciğer yarı ömrüyle ilişkili değildir."
          }
        ],
        "revealedOutcome": {
          "tr": "Doz oranı r = 10: Kompetitif antagonist varlığında eğri 10 kat sağa kaymıştır. Aynı kasılmayı oluşturmak için agonist derişimi tam 10 katına çıkarılmalıdır.",
          "ar": "نسبة الجرعة r = 10: انزاح المنحنى يميناً بمقدار 10 أضعاف؛ ويلزم رفع تركيز المنبه 10 مرات لإحداث نفس التأثير.",
          "en": "Dose ratio r = 10: The agonist curve shifts 10-fold rightward. Exactly 10 times more agonist is required to match baseline response."
        },
        "explanation": {
          "tr": "Schild analizinin temeli doz oranına (r) dayanır: r - 1 = [B] / Kb. Doz oranı antagonist konsantrasyonuyla doğru orantılı olarak büyür (Slayt 28).",
          "ar": "يقوم تحليل Schild على نسبة الجرعة: r - 1 = [B] / Kb؛ حيث تتناسب الزيادة في نسبة الجرعة طرداً مع تركيز المضاد.",
          "en": "Schild analysis relies on dose ratio: r - 1 = [B] / Kb. As antagonist concentration [B] rises, the required agonist multiplier scales linearly."
        }
      }
    },
    {
      "id": "pharm-mod2-les2-step-04",
      "stage": "visual_explanation",
      "stageIndex": 4,
      "type": "visual_explanation",
      "title": {
        "tr": "Görsel Regresyon: Schild Grafiği ve pA2",
        "ar": "الانحدار البصري: مخطط Schild وقيمة pA2",
        "en": "Visual Regression: The Schild Plot & pA2"
      },
      "prompt": {
        "tr": "Schild regresyon grafiğinde log(r-1) değerine karşı log[B] çizildiğinde doğrunun eğiminin 1.0 çıkması ve x-ekseni kesişimi neyi ifade eder?",
        "ar": "في مخطط انحدار Schild، عند رسم log(r-1) مقابل log[B]، ماذا يعني ميل الخط البالغ 1.0 بالضبط ونقطة تقاطعه مع المحور السيني؟",
        "en": "In a Schild plot, when log(r-1) is plotted against log[B], what does a regression slope of exactly 1.0 and its x-intercept signify?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-4a",
            "text": {
              "tr": "Eğim 1.0 ise basit yarışmalı kompetitif antagonizmayı (1:1 bağlanma) doğrular; x-ekseni kesişimi ise antagonistin afinite sabiti olan pA2 (-log Kb) değerini verir.",
              "ar": "يثبت الميل 1.0 المناهضة التنافسية البسيطة (ارتباط 1:1)؛ ونقطة التقاطع مع المحور السيني تعطي قيمة pA2 (-log Kb) لألفة المضاد.",
              "en": "A slope of 1.0 confirms simple competitive antagonism (1:1 binding); the x-intercept yields the antagonist affinity index pA2 (-log Kb)."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kusursuz! Schild denklemi: log(r-1) = log[B] - log(Kb). log(r-1)=0 (yani r=2) olduğunda log[B] = log(Kb) olur ve x-ekseni kesişimi doğrudan pA2 = -log(Kb)'yi verir (Slayt 28).",
              "ar": "إتقان تام! معادلة Schild: log(r-1) = log[B] - log(Kb). عند log(r-1)=0 (أي r=2) يصبح log[B] = log(Kb)، ونقطة التقاطع تعطي pA2 = -log(Kb).",
              "en": "Flawless! Schild equation: log(r-1) = log[B] - log(Kb). When log(r-1) = 0 (r=2), log[B] = log(Kb), and the intercept directly yields pA2."
            }
          },
          {
            "id": "opt-4b",
            "text": {
              "tr": "Eğim 1.0 ise antagonistin reseptörü kovalent olarak parçaladığını doğrular; kesişim ise ilacın öldürücü dozunu (LD50) verir.",
              "ar": "يثبت الميل 1.0 أن المضاد فكك المستقبل تساهمياً، ونقطة التقاطع تعبر عن الجرعة القاتلة (LD50).",
              "en": "A slope of 1.0 proves covalent receptor degradation, while the intercept indicates the lethal median dose (LD50)."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kovalent yanılgısı: Kovalent ajanlarda Schild doğrusu kurulamaz (eğim 1 çıkmaz ve Emax düşer); Schild analizi saf tersinir kompetitif bağlanmanın kanıtıdır.",
              "ar": "خطأ التساهمية: تفشل معادلة Schild مع المواد التساهمية؛ فالميل 1.0 برهان حصري على التنافس العكوس النقي.",
              "en": "Covalent error: Covalent blockers distort Schild regressions; unity slope (1.0) strictly proves reversible orthosteric competition."
            }
          },
          {
            "id": "opt-4c",
            "text": {
              "tr": "Eğim 1.0 ise agonist ile antagonistin kimyasal olarak nötralize olduğunu ve reseptörün devre dışı kaldığını gösterir.",
              "ar": "يدل الميل 1.0 على حدوث تعادل كيميائي بين المنبه والمضاد وخروج المستقبل من التفاعل.",
              "en": "A slope of 1.0 indicates that agonist and antagonist chemically neutralize each other, bypassing target receptors."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kimyasal nötralizasyon yanılgısı: Schild analizi reseptör düzeyindeki kompetisyonu inceler; moleküllerin birbirini kimyasal olarak yok etmesini değil.",
              "ar": "خطأ التعادل الكيميائي: يحلل مخطط Schild التنافس على جيب المستقبل الحيوي، وليس التفاعل الكيميائي المباشر في المحلول.",
              "en": "Neutralization error: Schild plots analyze receptor binding pocket equilibria, not direct solution chemistry neutralization."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "Schild eşitliği",
          "arContext": "معادلة Schild"
        },
        {
          "term": "pA2 (-log Kb)",
          "arContext": "مؤشر pA2 (-log Kb)"
        }
      ],
      "hints": [
        {
          "tr": "Schild doğrusunun formülü: y = m*x + c -> log(r-1) = 1.0 * log[B] - log(Kb).",
          "ar": "معادلة خط Schild: log(r-1) = 1.0 * log[B] - log(Kb).",
          "en": "Schild line equation: log(r-1) = 1.0 * log[B] - log(Kb)."
        },
        {
          "tr": "Eğim 1.0 çıktığında 1 agonist molekülüne karşı 1 antagonist molekülü yarışıyor demektir.",
          "ar": "عندما يكون الميل 1.0 فهذا يعني تنافس جزيء منبه واحد مع جزيء مضاد واحد.",
          "en": "Unity slope (1.0) confirms 1:1 equimolar competition at target binding pockets."
        },
        {
          "tr": "Doğrunun y = 0 eksenini kestiği nokta pA2 (-log Kb) afinitesini verir.",
          "ar": "نقطة تقاطع الخط مع y = 0 تعطي قيمة pA2 مساوية لـ -log Kb.",
          "en": "The point intersecting y = 0 directly reveals antagonist affinity: pA2 = -log Kb."
        }
      ],
      "sources": [
        {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 28
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-4a",
            "text": "Eğim 1.0 ise basit yarışmalı kompetitif antagonizmayı (1:1 bağlanma) doğrular; x-ekseni kesişimi ise antagonistin afinite sabiti olan pA2 (-log Kb) değerini verir.",
            "isCorrect": true,
            "misconceptionFeedback": "Kusursuz! Schild denklemi: log(r-1) = log[B] - log(Kb). log(r-1)=0 (yani r=2) olduğunda log[B] = log(Kb) olur ve x-ekseni kesişimi doğrudan pA2 = -log(Kb)'yi verir (Slayt 28)."
          },
          {
            "id": "opt-4b",
            "text": "Eğim 1.0 ise antagonistin reseptörü kovalent olarak parçaladığını doğrular; kesişim ise ilacın öldürücü dozunu (LD50) verir.",
            "isCorrect": false,
            "misconceptionFeedback": "Kovalent yanılgısı: Kovalent ajanlarda Schild doğrusu kurulamaz (eğim 1 çıkmaz ve Emax düşer); Schild analizi saf tersinir kompetitif bağlanmanın kanıtıdır."
          },
          {
            "id": "opt-4c",
            "text": "Eğim 1.0 ise agonist ile antagonistin kimyasal olarak nötralize olduğunu ve reseptörün devre dışı kaldığını gösterir.",
            "isCorrect": false,
            "misconceptionFeedback": "Kimyasal nötralizasyon yanılgısı: Schild analizi reseptör düzeyindeki kompetisyonu inceler; moleküllerin birbirini kimyasal olarak yok etmesini değil."
          }
        ],
        "revealedOutcome": {
          "tr": "Schild regresyonunda eğim = 1.0 ise bu basit kompetitif antagonizmanın kanıtıdır. Doğrunun yatay eksenle kesişim noktası antagonistin afinite ölçüsü olan pA2 (-log Kb) değeridir.",
          "ar": "في انحدار Schild، الميل = 1.0 يثبت المناهضة التنافسية النقية؛ ونقطة التقاطع مع المحور الأفقي تمثل قيمة pA2 (-log Kb) المعبرة عن ألفة المضاد.",
          "en": "In Schild regression, slope = 1.0 validates simple competitive antagonism. The x-axis intercept equals pA2 (-log Kb), quantifying antagonist affinity."
        },
        "explanation": {
          "tr": "Schild analizi farmakolojide bir ilacın gerçek bir kompetitif antagonist olup olmadığını belirlemenin en titiz yöntemidir. Eğim 1.0'den istatistiksel olarak saparsa allosterik modülasyon veya non-spesifik bağlanma şüphe edilir (Slayt 28).",
          "ar": "يمثل تحليل Schild الطريقة الأكثر صرامة لإثبات المناهضة التنافسية؛ وأي انحراف للميل عن 1.0 يثير الشك بوجود تعديل تباعدي أو ارتباط غير نوعي.",
          "en": "Schild analysis is the definitive pharmacodynamic proof of competitive antagonism. Slopes deviating from 1.0 indicate allosteric effects or non-specific binding."
        }
      }
    },
    {
      "id": "pharm-mod2-les2-step-05",
      "stage": "interactive_artifact",
      "stageIndex": 5,
      "type": "dose_response_curve",
      "widgetType": "DoseResponseCurve",
      "title": {
        "tr": "İnteraktif Laboratuvar: Kompetitif vs Non-kompetitif Blokaj",
        "ar": "مختبر تفاعلي: الحصار التنافسي مقابل غير التنافسي",
        "en": "Interactive Lab: Competitive vs Non-Competitive Blockade"
      },
      "prompt": {
        "tr": "Doz-Yanıt laboratuvarında Kompetitif ve Non-kompetitif Antagonist modlarını test edin; artan antagonist dozlarında surmountable paralel kayma ile Emax çöküşünü karşılaştırın.",
        "ar": "في مختبر الجرعة والاستجابة، اختبر نمطي المضاد التنافسي وغير التنافسي؛ وقارن بين الإزاحة الموازية القابلة للتجاوز وانهيار سقف Emax عند زيادة الجرعة.",
        "en": "In the Dose-Response lab, toggle Competitive and Non-Competitive Antagonist modes; contrast surmountable parallel shifts against insurmountable Emax depression under escalating blocker concentrations."
      },
      "predictThenReveal": false,
      "config": {
        "title": "Reseptör Antagonizma Simülatörü ve Schild Analizi",
        "prompt": "Kompetitif (paralel kayma) ve non-kompetitif (Emax depresyonu) modları karşılaştırın.",
        "defaultEc50": 10,
        "defaultEmax": 100,
        "defaultHillSlope": 1,
        "modes": [
          "agonist",
          "competitive_antagonist",
          "noncompetitive_antagonist",
          "partial_agonist"
        ],
        "source": {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 28
        },
        "explanation": "Kompetitif antagonistler aynı cebe reversibl bağlanarak eğriyi sağa kaydırır (Emax korunur). Nonkompetitif/kovalent antagonistler ise reseptörü kullanım dışı bırakarak Emax tavanını aşılmaz biçimde çökertir."
      },
      "widget": {
        "type": "DoseResponseCurve",
        "config": {
          "title": "Reseptör Antagonizma Simülatörü ve Schild Analizi",
          "prompt": "Kompetitif (paralel kayma) ve non-kompetitif (Emax depresyonu) modları karşılaştırın.",
          "defaultEc50": 10,
          "defaultEmax": 100,
          "defaultHillSlope": 1,
          "modes": [
            "agonist",
            "competitive_antagonist",
            "noncompetitive_antagonist",
            "partial_agonist"
          ],
          "source": {
            "file": "Farmakodinami-Doz Yanıt.pdf",
            "page": 28
          },
          "explanation": "Kompetitif antagonistler aynı cebe reversibl bağlanarak eğriyi sağa kaydırır (Emax korunur). Nonkompetitif/kovalent antagonistler ise reseptörü kullanım dışı bırakarak Emax tavanını aşılmaz biçimde çökertir."
        }
      },
      "technicalTerms": [
        {
          "term": "Emax depresyonu (insurmountable)",
          "arContext": "هبوط سقف Emax غير القابل للتجاوز"
        },
        {
          "term": "Gaddum-Schild eğri ötelemesi",
          "arContext": "إزاحة المنحنى لـ Gaddum-Schild"
        }
      ],
      "hints": [
        {
          "tr": "Kompetitif modda dozu artırın: Eğri sağa kayar ama tepe yüksekliği (%100) asla düşmez.",
          "ar": "في النمط التنافسي ارفع الجرعة: ينزاح المنحنى يميناً ويبقى سقف الاستجابة 100%.",
          "en": "In competitive mode, escalate blocker dose: curve shifts rightward, preserving 100% Emax."
        },
        {
          "tr": "Non-kompetitif moda geçin: Doz arttıkça Emax tavanının %80, %50, %20'ye çöktüğünü görün.",
          "ar": "انتقل للنمط غير التنافسي: لاحظ كيف يهبط سقف Emax إلى 80%، 50%، 20%.",
          "en": "Switch to non-competitive mode: observe the Emax ceiling collapse to 80%, 50%, 20%."
        },
        {
          "tr": "Kompetitif blokaj aşılabilir (surmountable); non-kompetitif blokaj ise aşılamazdır (insurmountable).",
          "ar": "الحصار التنافسي يمكن تجاوزه، بينما الحصار غير التنافسي مستحيل التجاوز.",
          "en": "Competitive blockade is surmountable; non-competitive blockade is insurmountable."
        }
      ],
      "sources": [
        {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 28
        }
      ]
    },
    {
      "id": "pharm-mod2-les2-step-06",
      "stage": "guided_discovery",
      "stageIndex": 6,
      "type": "guided_discovery",
      "title": {
        "tr": "Mekanizma Ayrımı: Allosterik Non-Kompetitif Antagonizma",
        "ar": "التمييز الآلي: المناهضة التباعدية غير التنافسية",
        "en": "Mechanistic Distinction: Allosteric Non-Competitive Antagonism"
      },
      "prompt": {
        "tr": "Bir antagonist agonist bağlanma cebi yerine reseptörün farklı bir allosterik bölgesine bağlandığında, yüksek agonist konsantrasyonu bu blokajı neden yenemez?",
        "ar": "عندما يرتبط مضاد بموقع تباعدي (allosteric) مختلف عن جيب المنبه، لماذا يعجز التركيز العالي جداً من المنبه عن تجاوز هذا الحصار؟",
        "en": "When an antagonist binds to an allosteric site rather than the agonist binding pocket, why can escalating agonist concentrations never surmount this blockade?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-6a",
            "text": {
              "tr": "Allosterik bağlanma reseptörün konformasyonunu bozarak aktif bölgenin sinyal iletmesini engeller; agonist kendi cebine bağlansa bile efektör aktive olamaz (aşılamaz Emax depresyonu).",
              "ar": "يشوه الارتباط التباعدي بنية المستقبل فيمنع نقل الإشارة؛ وحتى لو ارتبط المنبه بجيبه لا يتفعل المستجيب الخلوي (هبوط غير قابل للكسر في Emax).",
              "en": "Allosteric binding distorts receptor tertiary conformation, preventing signal transduction; even if agonist binds its pocket, downstream effectors cannot activate."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Harika keşif! Agonist ve allosterik antagonist farklı ceplere bağlandığı için birbirini kovamazlar. Agonist bağlansa dahi reseptör sinyali iletemez; bu yüzden Emax aşılmaz biçimde çöker (Slayt 30).",
              "ar": "اكتشاف رائع! لا يمكن للمنبه طرد المضاد التباعدي لاختلاف موقعيهما؛ ورغم ارتباط المنبه، يعجز المستقبل المشوه عن توليد الاستجابة، فيهبط Emax.",
              "en": "Great discovery! Agonist and allosteric antagonist dock at distinct pockets and cannot physically displace each other; signaling fails, depressing Emax."
            }
          },
          {
            "id": "opt-6b",
            "text": {
              "tr": "Allosterik antagonist kanda agonisti arayıp bularak molekülü kovalent olarak yok eder.",
              "ar": "يقوم المضاد التباعدي بالبحث عن المنبه في الدم وتفكيكه تساهمياً.",
              "en": "The allosteric antagonist seeks out agonist molecules in circulating blood and covalently degrades them."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Moleküler imha yanılgısı: Allosterik modülatörler hedef reseptör proteinine bağlanır; plazmada ligand parçalamazlar.",
              "ar": "خطأ التدمير الجزيئي: ترتبط المعدلات التباعدية ببروتين المستقبل في الخلية، ولا شأن لها بتفكيك المنبه في البلازما.",
              "en": "Molecular destruction fallacy: Allosteric modulators bind the receptor macromolecule; they do not destroy ligands in plasma."
            }
          },
          {
            "id": "opt-6c",
            "text": {
              "tr": "Allosterik bölgeye bağlanan ilaçlar hücre zarını tamamen eriterek reseptörleri sitoplazmaya döker.",
              "ar": "تذيب الأدوية المرتبطة بالموقع التباعدي غشاء الخلية كلياً فتسقط المستقبِلات داخل الهيولى.",
              "en": "Drugs binding allosteric sites completely dissolve the cell membrane, shedding receptors into cytoplasm."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Membran lizis yanılgısı: Allosterik ligandlar hücresel zarı eritmez; proteinin 3 boyutlu şeklini nano-ölçekte hafifçe değiştirirler.",
              "ar": "خطأ حل الغشاء: لا تذيب الروابط التباعدية الأغشية الخلوية؛ بل تعدل البنية الفراغية ثلاثية الأبعاد للبروتين فقط.",
              "en": "Membrane lysis error: Allosteric ligands do not lyse lipid bilayers; they induce subtle tertiary conformational shifts in receptor proteins."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "allosterik modülasyon",
          "arContext": "التعديل التباعدي (allosteric modulation)"
        },
        {
          "term": "konformasyonel kenetlenme kaybı",
          "arContext": "فقدان الاقتران الشكلي"
        }
      ],
      "hints": [
        {
          "tr": "Agonistin bağlandığı kapı ile antagonistin bağlandığı kapının farklı olduğunu düşünün.",
          "ar": "تخيل أن الباب الذي يدخل منه المنبه مختلف تماماً عن الباب الذي يدخل منه المضاد.",
          "en": "Picture two distinct doors: one for the agonist, another for the allosteric antagonist."
        },
        {
          "tr": "Agonist kendi kapısından girse bile, diğer kapıdaki kilit mekanizmayı felç etmiştir.",
          "ar": "حتى لو دخل المنبه من بابه، فإن قفل الباب الآخر يشل حركة الآلية بالكامل.",
          "en": "Even if the agonist enters its door, the lock on the second door paralyzes the machinery."
        },
        {
          "tr": "Agonisti ne kadar artırırsanız artırın, diğer cepteki antagonisti yerinden sökemez.",
          "ar": "مهما كدست المنبه، فلن يستطيع إزاحة المضاد المستقر في الجيب الآخر.",
          "en": "No amount of agonist can displace the antagonist residing in that independent pocket."
        }
      ],
      "sources": [
        {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 30
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-6a",
            "text": "Allosterik bağlanma reseptörün konformasyonunu bozarak aktif bölgenin sinyal iletmesini engeller; agonist kendi cebine bağlansa bile efektör aktive olamaz (aşılamaz Emax depresyonu).",
            "isCorrect": true,
            "misconceptionFeedback": "Harika keşif! Agonist ve allosterik antagonist farklı ceplere bağlandığı için birbirini kovamazlar. Agonist bağlansa dahi reseptör sinyali iletemez; bu yüzden Emax aşılmaz biçimde çöker (Slayt 30)."
          },
          {
            "id": "opt-6b",
            "text": "Allosterik antagonist kanda agonisti arayıp bularak molekülü kovalent olarak yok eder.",
            "isCorrect": false,
            "misconceptionFeedback": "Moleküler imha yanılgısı: Allosterik modülatörler hedef reseptör proteinine bağlanır; plazmada ligand parçalamazlar."
          },
          {
            "id": "opt-6c",
            "text": "Allosterik bölgeye bağlanan ilaçlar hücre zarını tamamen eriterek reseptörleri sitoplazmaya döker.",
            "isCorrect": false,
            "misconceptionFeedback": "Membran lizis yanılgısı: Allosterik ligandlar hücresel zarı eritmez; proteinin 3 boyutlu şeklini nano-ölçekte hafifçe değiştirirler."
          }
        ],
        "revealedOutcome": {
          "tr": "Allosterik non-kompetitif antagonizma: Antagonist farklı bir cebe bağlandığı için agonist konsantrasyonu artırılarak yerinden sökülemez. Reseptör sinyal üretemez ve Emax aşılmaz biçimde çöker.",
          "ar": "المناهضة التباعدية غير التنافسية: يرتبط المضاد بجيب مستقل ولا يمكن طرده بزيادة المنبه؛ فيعجز المستقبل عن نقل الإشارة ويهبط سقف Emax حتماً.",
          "en": "Allosteric non-competitive antagonism: Binding an independent allosteric pocket precludes competitive displacement. Transduction is compromised and Emax collapses."
        },
        "explanation": {
          "tr": "Non-kompetitif antagonizmada agonist ve antagonist farklı bölgelere bağlanır. Bu durum reseptörün maksimum yanıt kapasitesini (Emax) düşürür; aşırı agonist eklenmesi bu depresyonu geri çeviremez (insurmountable, Slayt 30).",
          "ar": "في المناهضة غير التنافسية ترتبط الجزيئات بمواقع متباينة؛ مما ينقص قدرة النسيج القصوى (Emax) بحيث تعجز الجرعات العالية عن استعادتها.",
          "en": "In non-competitive antagonism, distinct binding topographies mean agonist titration cannot surmount target blockade, leading to insurmountable Emax depression."
        }
      }
    },
    {
      "id": "pharm-mod2-les2-step-07",
      "stage": "formal_explanation",
      "stageIndex": 7,
      "type": "formal_explanation",
      "title": {
        "tr": "Formal Teori: pA2 Tanımı ve Schild Eşitliği",
        "ar": "النظرية الصورية: تعريف pA2 ومعادلة Schild",
        "en": "Formal Theory: Definition of pA2 & Schild Equation"
      },
      "prompt": {
        "tr": "Schild eşitliğinde pA2 değeri farmakolojik olarak neyi ifade eder ve antagonistin afinitesi (Kb) ile formülasyonel ilişkisi nedir?",
        "ar": "في معادلة Schild، ماذا تعني قيمة pA2 دوائياً وما هي علاقتها الرياضية بثابت تفكك المضاد (Kb)؟",
        "en": "In Schild analysis, what does the pA2 value pharmacologically designate, and what is its mathematical relationship to the antagonist dissociation constant (Kb)?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-7a",
            "text": {
              "tr": "pA2, agonist dozunu 2 katına çıkarmayı (doz oranı r = 2) gerektiren antagonist derişiminin negatif logaritmasıdır (-log[B]); Schild eğimi 1.0 olduğunda pA2 = -log Kb olur.",
              "ar": "تمثل pA2 اللوغاريتم السالب لتركيز المضاد الذي يتطلب مضاعفة جرعة المنبه مرتين (r=2)؛ وعندما يكون ميل Schild مساوياً 1.0 فإن pA2 = -log Kb.",
              "en": "pA2 is the negative logarithm of antagonist concentration that requires doubling agonist dose (dose ratio r = 2); when Schild slope is 1.0, pA2 = -log Kb."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Tam isabet! Schild formülü: log(r-1) = log[B] - log Kb. r = 2 olduğunda log(2-1) = log(1) = 0 olur; buradan log[B] = log Kb, dolayısıyla -log[B] = -log Kb = pA2 elde edilir (Slayt 28).",
              "ar": "أصبت بدقة! معادلة Schild: log(r-1) = log[B] - log Kb. عندما r = 2، يصبح log(1) = 0، ومنها pA2 = -log[B] = -log Kb.",
              "en": "Bullseye! In the Schild equation, r = 2 yields log(2-1) = 0, meaning log[B] = log Kb, thus establishing pA2 = -log[B] = -log Kb."
            }
          },
          {
            "id": "opt-7b",
            "text": {
              "tr": "pA2, antagonistin hastadaki toksik ölümcül dozunun (LD50) logaritmik katsayısıdır.",
              "ar": "تمثل pA2 المعامل اللوغاريتمي للجرعة القاتلة المميتة للمضاد (LD50).",
              "en": "pA2 represents the logarithmic transformation of the antagonist's median lethal toxic dose (LD50)."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Toksisite yanılgısı: pA2 bir toksisite dozu değildir; kompetitif antagonistin hedef reseptöre afinitesini belirten son derece zarif bir biyofiziksel indekstir.",
              "ar": "خطأ السمية: ليست pA2 معياراً للسمية؛ بل هي مؤشر فيزيائي حيوي راقٍ يحدد ألفة المضاد التنافسي للمستقبل.",
              "en": "Toxicity error: pA2 is not a lethal metric; it is an elegant biophysical index quantifying competitive target affinity."
            }
          },
          {
            "id": "opt-7c",
            "text": {
              "tr": "pA2, ilacın plazma proteinlerine %50 bağlandığı andaki pH değerini temsil eder.",
              "ar": "تمثل pA2 درجة حموضة البلازما (pH) التي يرتبط عندها 50% من الدواء بالبروتينات.",
              "en": "pA2 represents the solution pH at which exactly 50% of the drug binds to plasma albumin."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Fizikokimya karışıklığı: pA2 çözelti pH'sı veya plazma proteini değildir; Heinz Otto Schild tarafından tanımlanan antagonist afinite değeridir.",
              "ar": "خلط فيزيائي: لا تعبر pA2 عن درجة الحموضة أو ارتباط البروتين؛ بل هي ثابت ألفة المضاد الذي صاغه Heinz Otto Schild.",
              "en": "Physicochemical confusion: pA2 is neither solution pH nor protein binding; it is Heinz Otto Schild's competitive affinity constant."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "pA2 değeri",
          "arContext": "قيمة pA2 الدوائية"
        },
        {
          "term": "antagonist denge sabiti (Kb)",
          "arContext": "ثابت تفكك المضاد (Kb)"
        }
      ],
      "hints": [
        {
          "tr": "Schild formülünde r yerine 2 koyun: log(r-1) = log(2-1) = log(1) = 0.",
          "ar": "عوض r = 2 في معادلة Schild: تصبح log(2-1) = log(1) = 0.",
          "en": "Substitute r = 2 into Schild's equation: log(r-1) = log(2-1) = log(1) = 0."
        },
        {
          "tr": "0 = log[B] - log Kb -> log[B] = log Kb.",
          "ar": "0 = log[B] - log Kb، أي أن log[B] = log Kb.",
          "en": "0 = log[B] - log Kb implies log[B] = log Kb."
        },
        {
          "tr": "pA2 = -log[B] = -log Kb'dir. Dozu 2 kat artıran antagonist konsantrasyonunun negatif logaritmasıdır.",
          "ar": "pA2 = -log[B] = -log Kb؛ وهو اللوغاريتم السالب لتركيز المضاد الذي يضاعف جرعة المنبه مرتين.",
          "en": "pA2 = -log[B] = -log Kb: the negative log of antagonist concentration doubling required agonist."
        }
      ],
      "sources": [
        {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 28
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-7a",
            "text": "pA2, agonist dozunu 2 katına çıkarmayı (doz oranı r = 2) gerektiren antagonist derişiminin negatif logaritmasıdır (-log[B]); Schild eğimi 1.0 olduğunda pA2 = -log Kb olur.",
            "isCorrect": true,
            "misconceptionFeedback": "Tam isabet! Schild formülü: log(r-1) = log[B] - log Kb. r = 2 olduğunda log(2-1) = log(1) = 0 olur; buradan log[B] = log Kb, dolayısıyla -log[B] = -log Kb = pA2 elde edilir (Slayt 28)."
          },
          {
            "id": "opt-7b",
            "text": "pA2, antagonistin hastadaki toksik ölümcül dozunun (LD50) logaritmik katsayısıdır.",
            "isCorrect": false,
            "misconceptionFeedback": "Toksisite yanılgısı: pA2 bir toksisite dozu değildir; kompetitif antagonistin hedef reseptöre afinitesini belirten son derece zarif bir biyofiziksel indekstir."
          },
          {
            "id": "opt-7c",
            "text": "pA2, ilacın plazma proteinlerine %50 bağlandığı andaki pH değerini temsil eder.",
            "isCorrect": false,
            "misconceptionFeedback": "Fizikokimya karışıklığı: pA2 çözelti pH'sı veya plazma proteini değildir; Heinz Otto Schild tarafından tanımlanan antagonist afinite değeridir."
          }
        ],
        "revealedOutcome": {
          "tr": "pA2 = -log Kb: Agonist dozunu tam 2 katına çıkarmayı (r=2) gerektiren antagonist derişiminin negatif logaritmasıdır. pA2 ne kadar büyükse, antagonist o kadar yüksek afiniteye sahiptir.",
          "ar": "pA2 = -log Kb: اللوغاريتم السالب لتركيز المضاد الذي يضاعف جرعة المنبه (r=2). كلما كبرت قيمة pA2، كانت ألفة المضاد للمستقبل أعلى.",
          "en": "pA2 = -log Kb: the negative log of antagonist concentration doubling required agonist (r=2). Larger pA2 values denote higher competitive affinity."
        },
        "explanation": {
          "tr": "Schild analizi matematiksel zarafeti: Doz oranı r=2 olduğunda formül sadeleşir. Örneğin pA2 = 9 olan bir ilacın Kb değeri 10^-9 M (1 nM)'dir; yani pikomolar/nanomolar düzeyde olağanüstü güçlü bir antagonisttir (Slayt 28).",
          "ar": "أناقة تحليل Schild الرياضية: عند r=2 تتبسط المعادلة؛ فإذا كانت pA2 = 9 فإن Kb = 1 nM، مما يدل على مضاد فائق الألفة بتركيز نانومولي.",
          "en": "Mathematical beauty of Schild analysis: at r=2, the equation collapses cleanly. A pA2 of 9 means Kb = 1 nM, signifying high nanomolar potency."
        }
      }
    },
    {
      "id": "pharm-mod2-les2-step-08",
      "stage": "concept_check",
      "stageIndex": 8,
      "type": "concept_check",
      "title": {
        "tr": "Kavram Kontrolü: Schild pA2 Sayısal Analizi",
        "ar": "تحقق المفهوم: الحساب العددي لـ pA2 في تحليل Schild",
        "en": "Concept Check: Quantitative Schild pA2 Calculation"
      },
      "prompt": {
        "tr": "Kompetitif bir antagonistin Kb değeri 10^-8 M (10 nM) ise, bu antagonist için hesaplanan pA2 değeri kaçtır?",
        "ar": "إذا كان ثابت التفكك لمضاد تنافسي Kb = 10^-8 M (أي 10 nM)، فكم تبلغ قيمة pA2 المحسوبة لهذا المضاد؟",
        "en": "If a competitive antagonist exhibits an equilibrium dissociation constant Kb = 10^-8 M (10 nM), what is its calculated pA2 value?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-8a",
            "text": {
              "tr": "pA2 = 8; çünkü pA2 = -log(Kb) = -log(10^-8) = 8.",
              "ar": "pA2 = 8؛ لأن pA2 = -log(Kb) = -log(10^-8) = 8.",
              "en": "pA2 = 8; because pA2 = -log(Kb) = -log(10^-8) = 8."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kusursuz! pA2 doğrudan -log(Kb) formülünden hesaplanır: -log(10^-8) = -(-8) = 8. Bu ilacın 10 nM derişimi agonist dozunu 2 katına çıkarır (r = 2).",
              "ar": "حساب متقن! تطبق pA2 مباشرة من -log(Kb) = -(-8) = 8. تركيز 10 nM من هذا الدواء يضاعف جرعة المنبه مرتين (r = 2).",
              "en": "Flawless! pA2 is directly -log(Kb) = -(-8) = 8. A 10 nM concentration doubles the required agonist dose (r = 2)."
            }
          },
          {
            "id": "opt-8b",
            "text": {
              "tr": "pA2 = -8; logaritmik değerler farmakolojide daima negatif işaretli yazılmak zorundadır.",
              "ar": "pA2 = -8؛ يجب كتابة القيم اللوغاريتمية الدوائية بإشارة سالبة دوماً.",
              "en": "pA2 = -8; pharmacological log scales are strictly mandated to retain negative signs."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "İşaret yanılgısı: 'p' operatörü (pH veya pKa gibi) başında zaten eksi taşır (-log); -(-8) pozitif 8 yapar.",
              "ar": "خطأ الإشارة: يشير الرمز 'p' (كما في pH و pKa) إلى مقلوب اللوغاريتم السالب (-log)، فيتحول السالب إلى موجب (+8).",
              "en": "Sign convention error: The 'p' operator denotes -log; taking -(-8) yields a positive index of 8."
            }
          },
          {
            "id": "opt-8c",
            "text": {
              "tr": "pA2 = 10; çünkü konsantrasyon 10 nM olarak verilmiştir.",
              "ar": "pA2 = 10؛ لأن التركيز معطى بالقيمة 10 nM.",
              "en": "pA2 = 10; because the concentration was given as 10 nM."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Birim yanılgısı: pA2 molar konsantrasyonun (M) negatif logaritmasıdır; 10 nM = 10^-8 M olduğundan logaritması 8'dir, 10 değil.",
              "ar": "خطأ الواحدات: يحسب pA2 بالتركيز المولي (M)؛ وبما أن 10 nM = 10^-8 M فإن الناتج هو 8 وليس 10.",
              "en": "Unit error: pA2 operates on molarity (M). Since 10 nM = 10^-8 M, the negative log is 8, not 10."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "negatif logaritmik afinite indeksi",
          "arContext": "مؤشر الألفة اللوغاريتمي السالب"
        },
        {
          "term": "nanomolar disosiyasyon (nM)",
          "arContext": "التفكك النانومولي (nM)"
        }
      ],
      "hints": [
        {
          "tr": "pA2 = -log(Kb) formülünü kullanın.",
          "ar": "طبق القانون: pA2 = -log(Kb).",
          "en": "Apply the governing equation: pA2 = -log(Kb)."
        },
        {
          "tr": "Kb = 10^-8 M derişiminin negatif logaritmasını alın: -log(10^-8).",
          "ar": "احسب اللوغاريتم السالب للقيمة 10^-8 M: -log(10^-8).",
          "en": "Take the negative log of 10^-8 M: -log(10^-8)."
        },
        {
          "tr": "-(-8) = +8.",
          "ar": "-(-8) = +8.",
          "en": "-(-8) = +8."
        }
      ],
      "sources": [
        {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 28
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-8a",
            "text": "pA2 = 8; çünkü pA2 = -log(Kb) = -log(10^-8) = 8.",
            "isCorrect": true,
            "misconceptionFeedback": "Kusursuz! pA2 doğrudan -log(Kb) formülünden hesaplanır: -log(10^-8) = -(-8) = 8. Bu ilacın 10 nM derişimi agonist dozunu 2 katına çıkarır (r = 2)."
          },
          {
            "id": "opt-8b",
            "text": "pA2 = -8; logaritmik değerler farmakolojide daima negatif işaretli yazılmak zorundadır.",
            "isCorrect": false,
            "misconceptionFeedback": "İşaret yanılgısı: 'p' operatörü (pH veya pKa gibi) başında zaten eksi taşır (-log); -(-8) pozitif 8 yapar."
          },
          {
            "id": "opt-8c",
            "text": "pA2 = 10; çünkü konsantrasyon 10 nM olarak verilmiştir.",
            "isCorrect": false,
            "misconceptionFeedback": "Birim yanılgısı: pA2 molar konsantrasyonun (M) negatif logaritmasıdır; 10 nM = 10^-8 M olduğundan logaritması 8'dir, 10 değil."
          }
        ],
        "revealedOutcome": {
          "tr": "Kb = 10^-8 M (10 nM) için pA2 = -log(10^-8) = 8. Bu antagonist 10 nM derişimde agonist dozunu tam iki katına çıkarır (r = 2).",
          "ar": "من أجل Kb = 10^-8 M، فإن pA2 = 8. يضاعف هذا المضاد جرعة المنبه مرتين عند تركيز 10 nM.",
          "en": "For Kb = 10^-8 M (10 nM), pA2 = -log(10^-8) = 8. This antagonist doubles the required agonist concentration (r = 2) at 10 nM."
        },
        "explanation": {
          "tr": "pA2 ölçeği tıpkı pH gibi logaritmiktir: pA2 değeri 1 birim artarsa (örn. 8'den 9'a), ilacın afinitesi 10 kat artmış demektir. Bu sayede antagonistlerin potensleri kolayca karşılaştırılır (Slayt 28).",
          "ar": "مقياس pA2 لوغاريتمي كالـ pH: زيادة وحدة واحدة في pA2 (من 8 إلى 9) تعني تضاعف الألفة 10 مرات، مما يسهل مقارنة فاعلية المضادات.",
          "en": "pA2 is logarithmic like pH: a 1-unit increase (e.g. 8 to 9) denotes a 10-fold gain in affinity, enabling clean cross-drug comparisons."
        }
      }
    },
    {
      "id": "pharm-mod2-les2-step-09",
      "stage": "application",
      "stageIndex": 9,
      "type": "clinical_vignette",
      "title": {
        "tr": "Klinik Vaka: Aşırı Doz Fentanil ve Nalokson Reboundu",
        "ar": "حالة سريرية: جرعة فنتانيل زائدة وانتكاسة النالوكسون",
        "en": "Clinical Case: Fentanyl Overdose & Naloxone Rebound"
      },
      "prompt": {
        "tr": "Aşırı doz fentanil ile solunumu duran bir hastaya nalokson uygulanıyor. Dakikalar içinde hasta uyanıyor fakat 45 dakika sonra yeniden solunum depresyonuna giriyor. Neden?",
        "ar": "لمريض بتثبيط تنفسي ناتج عن جرعة زائدة من الفنتانيل، يُعطى نالوكسون. يستيقظ المريض فوراً، لكن بعد 45 دقيقة يعود التثبيط التنفسي مجدداً! لماذا؟",
        "en": "A patient in respiratory arrest from fentanyl overdose receives naloxone, waking up promptly. Yet 45 minutes later, severe respiratory depression re-emerges. Why?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-9a",
            "text": {
              "tr": "Nalokson kompetitif ve tersinir bir antagonisttir; plazma yarı ömrü (30-60 dk) fentanilden çok daha kısa olduğu için vücuttan hızla temizlenir ve fentanil reseptörleri yeniden işgal eder.",
              "ar": "النالوكسون مضاد تنافسي عكوس؛ ولأن عمر نصفه (30-60 دقيقة) أقصر بكثير من الفنتانيل، يُطرح سريعاً ليعاود الفنتانيل شغل المستقبِلات.",
              "en": "Naloxone is a reversible competitive blocker; its short half-life (30-60 min) clears it rapidly, allowing longer-acting fentanyl to reoccupy targets."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Hayati bir acil tıp kuralı! Nalokson tersinir bir kompetitif antagonisttir. Fentanil lipofilik ve uzun ömürlüyken (3-7 saat), nalokson 45 dakikada temizlenir; kompetisyon fentanile döner ve solunum yeniden durur.",
              "ar": "قاعدة طوارئ منقذة للحياة! النالوكسون مضاد تنافسي عكوس؛ يزول خلال 45 دقيقة بينما يدوم الفنتانيل لساعات، فتعود الغيبوبة التنفسية.",
              "en": "Life-saving emergency pearl! Naloxone is competitive and reversible. Its rapid clearance (30-60 min) relative to fentanyl (hours) permits lethal rebound."
            }
          },
          {
            "id": "opt-9b",
            "text": {
              "tr": "Fentanil nalokson moleküllerini kovalent olarak parçalayarak kendini korumaya almıştır.",
              "ar": "قام الفنتانيل بتكسير جزيئات النالوكسون تساهمياً لحماية نفسه.",
              "en": "Fentanyl chemically cleaves naloxone molecules, defending itself from competitive displacement."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kimyasal parçalanma yanılgısı: Fentanil naloksonu parçalayamaz; nalokson karaciğerde glukuronidasyonla fizyolojik olarak metabolize edilir.",
              "ar": "خطأ التخريب الكيميائي: لا يفكك الفنتانيل النالوكسون؛ بل يُستقلب النالوكسون طبيعياً بالاقتران الكبدي في البلازما.",
              "en": "Degradation error: Fentanyl cannot cleave naloxone; naloxone is cleared physiologically via hepatic glucuronidation."
            }
          },
          {
            "id": "opt-9c",
            "text": {
              "tr": "Nalokson tek dozda reseptörleri kovalent bloke ettiği için fentanil allosterik reseptörlere kaçmıştır.",
              "ar": "حجب النالوكسون المستقبِلات تساهمياً بجرعة وحيدة، فهرب الفنتانيل نحو مستقبلات تباعدية.",
              "en": "Naloxone covalently blocked receptors, prompting fentanyl to migrate into allosteric pockets."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kovalent blokaj yanılgısı: Nalokson asla kovalent değildir, saf kompetitiftir; kovalent olsaydı hasta saatlerce uyanık kalırdı.",
              "ar": "خطأ الحصار التساهمي: النالوكسون مضاد عكوس نقي وليس تساهمياً؛ ولو كان تساهمياً لدام الاستيقاظ لساعات طويلة.",
              "en": "Covalent error: Naloxone is non-covalent and competitive; had it been irreversible, antagonism would persist for hours."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "kompetitif tersinirlik",
          "arContext": "العكوسية التنافسية"
        },
        {
          "term": "rebound solunum depresyonu",
          "arContext": "الانتكاس التنفسي الارتدادي"
        }
      ],
      "hints": [
        {
          "tr": "Naloksonun vücuttaki yarı ömrü (30-60 dakika) ile fentanilin yarı ömrünü (3-7 saat) kıyaslayın.",
          "ar": "قارن عمر نصف النالوكسون (30-60 دقيقة) بعمر نصف الفنتانيل (3-7 ساعات).",
          "en": "Contrast naloxone's short half-life (30-60 min) with fentanyl's duration (3-7 hours)."
        },
        {
          "tr": "Nalokson kandan temizlendiğinde geride kalan fentanile ne olur?",
          "ar": "عندما يزول النالوكسون من الدم، ماذا سيحدث للفنتانيل المتبقي؟",
          "en": "When naloxone clears from circulation, what happens to lingering fentanyl?"
        },
        {
          "tr": "Nalokson yarışmalı bir antagonist olduğu için konsantrasyonu düşünce fentanil reseptörleri yeniden ele geçirir.",
          "ar": "بما أنه مضاد تنافسي، فإن هبوط تركيزه يسمح للفنتانيل بإعادة احتلال المستقبِلات.",
          "en": "Being competitive, dropping naloxone levels permit fentanyl to reoccupy targets."
        }
      ],
      "sources": [
        {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 26
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-9a",
            "text": "Nalokson kompetitif ve tersinir bir antagonisttir; plazma yarı ömrü (30-60 dk) fentanilden çok daha kısa olduğu için vücuttan hızla temizlenir ve fentanil reseptörleri yeniden işgal eder.",
            "isCorrect": true,
            "misconceptionFeedback": "Hayati bir acil tıp kuralı! Nalokson tersinir bir kompetitif antagonisttir. Fentanil lipofilik ve uzun ömürlüyken (3-7 saat), nalokson 45 dakikada temizlenir; kompetisyon fentanile döner ve solunum yeniden durur."
          },
          {
            "id": "opt-9b",
            "text": "Fentanil nalokson moleküllerini kovalent olarak parçalayarak kendini korumaya almıştır.",
            "isCorrect": false,
            "misconceptionFeedback": "Kimyasal parçalanma yanılgısı: Fentanil naloksonu parçalayamaz; nalokson karaciğerde glukuronidasyonla fizyolojik olarak metabolize edilir."
          },
          {
            "id": "opt-9c",
            "text": "Nalokson tek dozda reseptörleri kovalent bloke ettiği için fentanil allosterik reseptörlere kaçmıştır.",
            "isCorrect": false,
            "misconceptionFeedback": "Kovalent blokaj yanılgısı: Nalokson asla kovalent değildir, saf kompetitiftir; kovalent olsaydı hasta saatlerce uyanık kalırdı."
          }
        ],
        "revealedOutcome": {
          "tr": "Nalokson tersinir kompetitif bir antagonisttir (t1/2 ≈ 30-60 dk). Fentanil kanda saatlerce kaldığı için nalokson temizlenince reseptörleri yeniden işgal eder; tekrarlayan doz veya IV infüzyon şarttır.",
          "ar": "النالوكسون مضاد تنافسي عكوس سريع الزوال (t1/2 ≈ 30-60 دقيقة). يدوم الفنتانيل لساعات ليعيد شغل المستقبِلات؛ ولذا يلزم تكرار الجرعات أو التسريب المستمر.",
          "en": "Naloxone is reversible and competitive (t1/2 ≈ 30-60 min). Long-acting fentanyl re-engages cleared targets; repeated dosing or continuous infusion is mandatory."
        },
        "explanation": {
          "tr": "Farmakokinetik-farmakodinamik uyumsuzluk: Bir kompetitif antagonistin koruyuculuğu kanda yeterli konsantrasyonda ([B] > Kb) kaldığı sürece geçerlidir. Antagonist temizlendiğinde kütle hareketi dengesi agoniste geri döner (Slayt 26).",
          "ar": "عدم التطابق الحركي الدوائي: تستمر حماية المضاد التنافسي طالما بقي تركيزه كافياً ([B] > Kb)؛ وبزواله ينحاز التوازن مجدداً للمنبه المتبقي.",
          "en": "PK-PD mismatch: competitive protection lasts only while antagonist levels satisfy [B] > Kb. Once cleared, mass-action equilibria swing back to agonist."
        }
      }
    },
    {
      "id": "pharm-mod2-les2-step-10",
      "stage": "retrieval",
      "stageIndex": 10,
      "type": "retrieval",
      "title": {
        "tr": "Geri Çağırma: Antagonizma Türleri Hiyerarşisi",
        "ar": "استرجاع: تصنيف وتسلسل أنواع المناهضة",
        "en": "Active Recall: Taxonomy of Antagonism Types"
      },
      "prompt": {
        "tr": "Anafilaktik şokta salınan histaminin bronkokonstriktör etkisini, aynı reseptöre bağlanmadan beta-2 reseptörleri üzerinden bronkodilalasyon yaparak geri çeviren adrenalin hangi tür antagonizma örneğidir?",
        "ar": "في الصدمة التأقية، يعاكس الأدرينالين تشنج القصبات الناتج عن الهستامين عبر مستقبلات بيتا-2 المستقلة بدلاً من منافسة مستقبلات الهستامين. ما نوع هذه المناهضة؟",
        "en": "During anaphylaxis, adrenaline reverses histamine-induced bronchospasm via independent beta-2 receptors rather than histamine receptors. What class of antagonism does this represent?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-10a",
            "text": {
              "tr": "Fizyolojik (fonksiyonel) antagonizma; iki farklı agonist zıt reseptör sistemleri üzerinden birbirine zıt biyolojik yanıtlar oluşturur.",
              "ar": "مناهضة فيزيولوجية (وظيفية)؛ حيث يشغل ربيطان مستقبلين مختلفين لإنتاج استجابتين متعاكستين في النسيج.",
              "en": "Physiological (functional) antagonism; two independent agonists act on distinct receptor systems to produce opposing biological effects."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Doğru! Histamin H1 reseptörünü (bronkokonstriksiyon), adrenalin ise beta-2 reseptörünü (bronkodilatasyon) uyarır. Reseptör için yarışmazlar; zıt hücresel yollarla birbirini dengelerler.",
              "ar": "صحيح! ينشط الهستامين مستقبلات H1 (تقبض)، وينشط الأدرينالين مستقبلات بيتا-2 (توسع)؛ لا يتنافسان على المستقبل بل يتعاكسان وظيفياً.",
              "en": "Correct! Histamine acts on H1 (constriction), adrenaline on beta-2 (dilation). They act through opposing physiological pathways without target competition."
            }
          },
          {
            "id": "opt-10b",
            "text": {
              "tr": "Kimyasal antagonizma; adrenalin histamin molekülünü kanda kovalent bağlarla nötralize eder.",
              "ar": "مناهضة كيميائية؛ حيث يربط الأدرينالين جزيئات الهستامين تساهمياً في الدم ويبطلها.",
              "en": "Chemical antagonism; adrenaline covalently binds and neutralizes histamine directly in circulation."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kimyasal antagonizma yanılgısı: Kimyasal antagonizma iki ilacın doğrudan birbiriyle reaksiyona girmesidir (örn. protaminin heparini bağlaması); adrenalin histaminle reaksiyona girmez.",
              "ar": "خطأ المناهضة الكيميائية: تحدث المناهضة الكيميائية بتفاعل جزيئين مباشرة (كالبروتامين والهيبارين)؛ ولا يتفاعل الأدرينالين مع الهستامين كيميائياً.",
              "en": "Chemical antagonism error: Chemical antagonism is direct drug-drug binding (e.g. protamine-heparin); adrenaline does not react with histamine."
            }
          },
          {
            "id": "opt-10c",
            "text": {
              "tr": "Kompetitif farmakolojik antagonizma; adrenalin doğrudan histamin H1 reseptör cebi için yarışır.",
              "ar": "مناهضة دوائية تنافسية؛ ينافس الأدرينالين الهستامين مباشرة على نفس الجيب النشط لمستقبل H1.",
              "en": "Competitive pharmacological antagonism; adrenaline directly competes for the histaminergic H1 receptor pocket."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Reseptör hedef yanılgısı: Adrenalin H1 reseptörüne bağlanamaz; adrenerjik beta-2 reseptörünün agonistidir.",
              "ar": "خطأ موقع المستقبل: لا يرتبط الأدرينالين بمستقبلات H1 إطلاقاً؛ بل هو منبه نوعي لمستقبلات بيتا-2 الأدرينالينية.",
              "en": "Target error: Adrenaline does not dock into H1 histaminergic pockets; it is a selective adrenergic beta-2 agonist."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "fizyolojik (fonksiyonel) antagonizma",
          "arContext": "المناهضة الفيزيولوجية (الوظيفية)"
        },
        {
          "term": "kimyasal antagonizma",
          "arContext": "المناهضة الكيميائية"
        }
      ],
      "hints": [
        {
          "tr": "Adrenalin ile histaminin aynı reseptöre mi, yoksa farklı reseptörlere mi bağlandığına bakın.",
          "ar": "هل يرتبط الأدرينالين والهستامين بنفس المستقبل أم بمستقبلين مختلفين؟",
          "en": "Consider whether adrenaline and histamine target the same receptor or distinct targets."
        },
        {
          "tr": "Histamin H1 reseptöründen kasar, adrenalin beta-2 reseptöründen gevşetir.",
          "ar": "يقبض الهستامين عبر H1، ويرخي الأدرينالين عبر بيتا-2.",
          "en": "Histamine constricts via H1; adrenaline relaxes via beta-2."
        },
        {
          "tr": "Farklı reseptörler üzerinden zıt etkiler oluşturulmasına 'fizyolojik (fonksiyonel) antagonizma' denir.",
          "ar": "توليد استجابتين متعاكستين عبر مستقبلين مختلفين يسمى 'مناهضة فيزيولوجية (وظيفية)'.",
          "en": "Opposing actions via independent receptor systems define 'physiological (functional) antagonism'."
        }
      ],
      "sources": [
        {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 33
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-10a",
            "text": "Fizyolojik (fonksiyonel) antagonizma; iki farklı agonist zıt reseptör sistemleri üzerinden birbirine zıt biyolojik yanıtlar oluşturur.",
            "isCorrect": true,
            "misconceptionFeedback": "Doğru! Histamin H1 reseptörünü (bronkokonstriksiyon), adrenalin ise beta-2 reseptörünü (bronkodilatasyon) uyarır. Reseptör için yarışmazlar; zıt hücresel yollarla birbirini dengelerler."
          },
          {
            "id": "opt-10b",
            "text": "Kimyasal antagonizma; adrenalin histamin molekülünü kanda kovalent bağlarla nötralize eder.",
            "isCorrect": false,
            "misconceptionFeedback": "Kimyasal antagonizma yanılgısı: Kimyasal antagonizma iki ilacın doğrudan birbiriyle reaksiyona girmesidir (örn. protaminin heparini bağlaması); adrenalin histaminle reaksiyona girmez."
          },
          {
            "id": "opt-10c",
            "text": "Kompetitif farmakolojik antagonizma; adrenalin doğrudan histamin H1 reseptör cebi için yarışır.",
            "isCorrect": false,
            "misconceptionFeedback": "Reseptör hedef yanılgısı: Adrenalin H1 reseptörüne bağlanamaz; adrenerjik beta-2 reseptörünün agonistidir."
          }
        ],
        "revealedOutcome": {
          "tr": "Adrenalin ve histamin fizyolojik antagonisttir: Ayrı reseptör sistemleri (beta-2 vs H1) üzerinden birbirine zıt biyolojik etkiler oluşturarak organ düzeyinde denge sağlarlar.",
          "ar": "الأدرينالين والهستامين مناهضان فيزيولوجيان: يعملان عبر مستقبلين مستقلين (بيتا-2 مقابل H1) بآليات متعاكسة تروض التشنج على مستوى العضو.",
          "en": "Adrenaline and histamine represent physiological antagonism: distinct receptor systems (beta-2 vs H1) generating opposing functional outputs at the organ level."
        },
        "explanation": {
          "tr": "Farmakolojide 4 antagonizma türü: 1) Farmakolojik (kompetitif/non-kompetitif), 2) Fizyolojik/fonksiyonel (zıt reseptörler), 3) Kimyasal (doğrudan moleküler şelasyon/nötralizasyon), 4) Farmakokinetik (indüksiyonla atılımı hızlandırma, Slayt 33).",
          "ar": "أنواع المناهضة الأربعة: 1) دوائية (تنافسية/غير تنافسية)، 2) فيزيولوجية وظيفية (مستقبلات متعاكسة)، 3) كيميائية (تعادل مباشر)، 4) حركية دوائية (تسريع الإطراح).",
          "en": "4 Antagonism types: 1) Pharmacological (orthosteric/allosteric), 2) Physiological (opposing pathways), 3) Chemical (direct neutralization), 4) Pharmacokinetic (clearance acceleration)."
        }
      }
    },
    {
      "id": "pharm-mod2-les2-step-11",
      "stage": "connection",
      "stageIndex": 11,
      "type": "connection",
      "title": {
        "tr": "Kavramsal Köprü: Feokromositomada Kovalent Blokaj Güvencesi",
        "ar": "جسر المفاهيم: أمان الحصار التساهمي في ورم القواتم",
        "en": "Conceptual Bridge: Covalent Blockade Safety in Pheochromocytoma"
      },
      "prompt": {
        "tr": "Feokromositoma cerrahisinde tümör manipülasyonuyla kana devasa katekolamin fırtınası saçılır. Ameliyat öncesi hazırlıkta prazosin (kompetitif) yerine neden fenoksibenzamin (geri dönüşümsüz) tercih edilir?",
        "ar": "أثناء جراحة ورم القواتم، تنطلق عاصفة كاتيكولامينية هائلة بالدم. في التحضير الجراحي، لماذا يُفضل فينوكسي بنزامين (غير العكوس) على برازوسين (التنافسي)؟",
        "en": "During pheochromocytoma resection, tumor manipulation dumps massive catecholamine surges. Pre-operatively, why is irreversible phenoxybenzamine preferred over competitive prazosin?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-11a",
            "text": {
              "tr": "Masif katekolamin deşarjı yarışmalı prazosin blokajını kolayca aşarak ölümcül hipertansif krize yol açabilir; oysa fenoksibenzamin reseptörleri kovalent kilitlediği için blokaj aşılamaz.",
              "ar": "التدفق الكاتيكولاميني الهائل سيتجاوز بسهولة حصار برازوسين التنافسي مفجراً أزمة فرط ضغط مميتة؛ بينما حصار فينوكسي بنزامين التساهمي مستحيل التجاوز.",
              "en": "Massive catecholamine surges easily overcome competitive prazosin blockade, causing fatal hypertensive crises; phenoxybenzamine's covalent bond is insurmountable."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Harika klinik kavrayış! Cerrah tümöre dokunduğunda katekolaminler 100 kat fırlar. Bu fırtına kompetitif bir blokerin sağa kaymasını tamamen yener (surmount eder). Fenoksibenzamin ise kovalent alkilasyonla Emax'ı çökerterek damarları krizden korur.",
              "ar": "فهم سريري رائع! عند لمس الورم ترتفع الكاتيكولامينات بمئة ضعف فتكسر الحصار التنافسي للبرازوسين؛ أما فينوكسي بنزامين فيقفل المستقبِلات تساهمياً حامياً المريض.",
              "en": "Brilliant insight! Tumor manipulation triggers 100-fold catecholamine surges that easily surmount competitive prazosin; covalent phenoxybenzamine prevents catastrophic crisis."
            }
          },
          {
            "id": "opt-11b",
            "text": {
              "tr": "Prazosin kanda tümör hücrelerinin bölünmesini hızlandırarak metastaza yol açar.",
              "ar": "يسرع برازوسين انقسام الخلايا الورمية في الدم مما يسبب انبثاثات خبيثة.",
              "en": "Prazosin accelerates tumor cell mitosis in circulating blood, promoting malignant metastasis."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Onkolojik saçmalık: Prazosin bir alfa-1 blokerdir; tümör proliferasyonu yapmaz. Sorun onkolojik değil, kompetitif surmountable olmasından doğan hemodinamik yetersizliktir.",
              "ar": "خطأ ورمي فادح: برازوسين حاصر ألفا-1 وليس محفزاً للورم؛ وسبب استبعاده هو سهولة كسر حصاره التنافسي بالتدفق الهرموني.",
              "en": "Oncological absurdity: Prazosin does not stimulate mitosis; the issue is pure hemodynamics—its competitive blockade is surmountable by massive adrenaline."
            }
          },
          {
            "id": "opt-11c",
            "text": {
              "tr": "Fenoksibenzamin ameliyat sırasında kalbi durdurarak kanamayı sıfıra indirir.",
              "ar": "يقوم فينوكسي بنزامين بإيقاف القلب أثناء الجراحة لمنع النزف كلياً.",
              "en": "Phenoxybenzamine stops the heart during surgery to reduce blood loss to zero."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Fizyolojik saçmalık: Fenoksibenzamin kardiyak arrest yapmaz; damarlardaki alfa reseptörleri bloke ederek vazokonstriksiyonu önler.",
              "ar": "خطأ فيزيولوجي فادح: لا يوقف فينوكسي بنزامين القلب؛ بل يحجب مستقبلات ألفا الوعائية ليمنع التقبض الوعائي الشديد.",
              "en": "Physiological absurdity: Phenoxybenzamine does not induce cardiac arrest; it blocks vascular alpha receptors, preventing lethal vasoconstriction."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "katekolamin fırtınası",
          "arContext": "عاصفة الكاتيكولامينات"
        },
        {
          "term": "kovalent kilitlenme güvencesi",
          "arContext": "أمان الحصار التساهمي غير العكوس"
        }
      ],
      "hints": [
        {
          "tr": "Ameliyat esnasında kanda adrenalin miktarının 100 katına çıktığını düşünün.",
          "ar": "تخيل تضاعف الأدرينالين مئة مرة في الدم أثناء العملية.",
          "en": "Imagine circulating adrenaline spiking 100-fold during surgery."
        },
        {
          "tr": "Kompetitif bir ilaç (prazosin) bu devasa agonist artışı karşısında ne yapar?",
          "ar": "ماذا سيحل بمضاد تنافسي (برازوسين) أمام هذا الطوفان من المنبه؟",
          "en": "What happens to a competitive blocker (prazosin) in the face of this massive surge?"
        },
        {
          "tr": "Yarışmayı kaybeder ve aşılır; oysa kovalent fenoksibenzamin asla aşılamaz.",
          "ar": "سيخسر المنافسة ويُكسر حصاره؛ بينما الحصار التساهمي لفينوكسي بنزامين لا يُكسر أبداً.",
          "en": "It is outcompeted and surmounted; covalent phenoxybenzamine remains insurmountable."
        }
      ],
      "sources": [
        {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 24
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-11a",
            "text": "Masif katekolamin deşarjı yarışmalı prazosin blokajını kolayca aşarak ölümcül hipertansif krize yol açabilir; oysa fenoksibenzamin reseptörleri kovalent kilitlediği için blokaj aşılamaz.",
            "isCorrect": true,
            "misconceptionFeedback": "Harika klinik kavrayış! Cerrah tümöre dokunduğunda katekolaminler 100 kat fırlar. Bu fırtına kompetitif bir blokerin sağa kaymasını tamamen yener (surmount eder). Fenoksibenzamin ise kovalent alkilasyonla Emax'ı çökerterek damarları krizden korur."
          },
          {
            "id": "opt-11b",
            "text": "Prazosin kanda tümör hücrelerinin bölünmesini hızlandırarak metastaza yol açar.",
            "isCorrect": false,
            "misconceptionFeedback": "Onkolojik saçmalık: Prazosin bir alfa-1 blokerdir; tümör proliferasyonu yapmaz. Sorun onkolojik değil, kompetitif surmountable olmasından doğan hemodinamik yetersizliktir."
          },
          {
            "id": "opt-11c",
            "text": "Fenoksibenzamin ameliyat sırasında kalbi durdurarak kanamayı sıfıra indirir.",
            "isCorrect": false,
            "misconceptionFeedback": "Fizyolojik saçmalık: Fenoksibenzamin kardiyak arrest yapmaz; damarlardaki alfa reseptörleri bloke ederek vazokonstriksiyonu önler."
          }
        ],
        "revealedOutcome": {
          "tr": "Feokromositoma hazırlığında kovalent blokaj: Masif katekolamin fırtınası yarışmalı prazosini kolayca aşabilir. Kovalent bağlı fenoksibenzamin ise reseptör sayısını eksilttiği için katekolamin fırtınası tarafından asla yenilemez (insurmountable).",
          "ar": "الحصار التساهمي في ورم القواتم: يستطيع طوفان الأدرينالين كسر حصار برازوسين التنافسي؛ بينما يعجز تماماً عن تجاوز حصار فينوكسي بنزامين التساهمي الدائم.",
          "en": "Covalent blockade in pheochromocytoma: massive catecholamine storms surmount competitive prazosin; irreversible phenoxybenzamine guarantees insurmountable vascular protection."
        },
        "explanation": {
          "tr": "Kovalent antagonistler (fenoksibenzamin) reseptör havuzunu kovalent alkilasyonla inaktive eder. Bu sayede agonistin konsantrasyonu 1000 kat artsa bile kasılma tavanı (Emax) bastırılmış kalır ve ölümcül hipertansif krizler önlenir (Slayt 24).",
          "ar": "تعطل المضادات التساهمية حوض المستقبِلات نهائياً؛ فحتى لو تضاعف تركيز المنبه ألف مرة، يبقى سقف الاستجابة Emax مكبوحاً مانعاً السكتة وفرط الضغط القاتل.",
          "en": "Covalent blockers eliminate functional receptors via alkylation. Even with 1000-fold agonist spikes, tissue Emax remains firmly suppressed, preventing fatal stroke."
        }
      }
    },
    {
      "id": "pharm-mod2-les2-step-12",
      "stage": "mastery_check",
      "stageIndex": 12,
      "type": "mastery_check",
      "title": {
        "tr": "Ustalık Sınavı: NX-40 Serotonin Antagonisti ve Schild Analizi",
        "ar": "اختبار الإتقان: مضاد السيروتونين NX-40 وتحليل Schild",
        "en": "Mastery Check: Serotonin Antagonist NX-40 & Schild Analysis"
      },
      "prompt": {
        "tr": "Bir araştırmacı serotonin 5-HT2A reseptörüne bağlanan NX-40 molekülünü test ediyor. Schild eğimini 1.0, x-ekseni kesişimini -9.0 (pA2 = 9.0) buluyor. Bu deneyden hangi kesin farmakolojik sonuç çıkar?",
        "ar": "باحث يختبر المركب NX-40 على مستقبل السيروتونين 5-HT2A. وجد أن ميل Schild يساوي 1.0، وتقاطع المحور السيني عند -9.0 (pA2 = 9.0). ما النتيجة الدوائية القاطعة؟",
        "en": "Investigating agent NX-40 at 5-HT2A receptors, a researcher observes a Schild slope of 1.0 and an x-intercept of -9.0 (pA2 = 9.0). What definitive pharmacological conclusion is drawn?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-12a",
            "text": {
              "tr": "NX-40 basit, reversibl ve tam kompetitif bir antagonisttir; 5-HT2A reseptörüne Kd = 1 nM (10^-9 M) gibi nanomolar yüksek bir afiniteyle bağlanır.",
              "ar": "NX-40 مضاد تنافسي عكوس نقي وبسيط؛ يرتبط بمستقبل 5-HT2A بألفة نانومولية فائقة قدرها Kd = 1 nM (10^-9 M).",
              "en": "NX-40 is a simple, reversible competitive antagonist; binding 5-HT2A receptors with high nanomolar affinity (Kd = 1 nM / 10^-9 M)."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kusursuz ustalık! Eğim 1.0 basit kompetisyonu kanıtlar. x kesişimi -9.0 ise pA2 = 9.0 demektir; Kb = 10^-9 M = 1 nM olarak hesaplanır. NX-40 nanomolar güçlü bir kompetitif antagonisttir (Slayt 28).",
              "ar": "قمة الإتقان الدوائي! الميل 1.0 يثبت التنافس العكوس النقي، والتقاطع عند -9.0 يعني pA2 = 9.0 وبالتالي Kb = 10^-9 M = 1 nM بألفة فائقة.",
              "en": "Peak pharmacological mastery! A slope of 1.0 proves simple competition. The -9.0 intercept reveals pA2 = 9.0, yielding Kb = 1 nM."
            }
          },
          {
            "id": "opt-12b",
            "text": {
              "tr": "NX-40 reseptörü kovalent olarak yok eden bir alkilleyici ajandır; pA2 = 9.0 değeri aşırı hücre ölümünü gösterir.",
              "ar": "NX-40 مركب مؤلكل يدمر المستقبل تساهمياً؛ وقيمة pA2 = 9.0 تدل على موت خلوي واسع.",
              "en": "NX-40 is a covalent alkylator destroying receptors; pA2 = 9.0 denotes extensive cellular apoptosis."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Schild yorumlama yanılgısı: Kovalent ajanlarda Schild eğimi 1.0 çıkmaz; eğim 1.0 tersinir kompetitif bağlanmanın mutlak kanıtıdır.",
              "ar": "خطأ تفسير Schild: لا يمكن للمواد التساهمية إعطاء ميل Schild مساوياً 1.0؛ فالميل 1.0 هو البرهان الحصري على التنافس العكوس.",
              "en": "Schild misinterpretation: Irreversible agents distort regressions; a slope of exactly 1.0 strictly validates reversible orthosteric competition."
            }
          },
          {
            "id": "opt-12c",
            "text": {
              "tr": "NX-40 bir tam agonisttir ve serotoninden 9 kat daha fazla hücre içi kalsiyum salıverir.",
              "ar": "NX-40 منبه كامل يحرر كالسيوم داخل خلوي يفوق السيروتونين بتسعة أضعاف.",
              "en": "NX-40 is a full agonist that mobilizes 9-fold more intracellular calcium than endogenous serotonin."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Agonist-antagonist karışıklığı: Schild analizi agonistler için değil, antagonistlerin afinitesini ölçmek için yapılır; pA2 = 9.0 güçlü bir blokeri tanımlar.",
              "ar": "خلط المنبه بالمضاد: يُجرى تحليل Schild حصراً لقياس ألفة المضادات؛ وقيمة pA2 = 9.0 تدل على حاصر فائق القوة وليس منبهاً.",
              "en": "Agonist-antagonist confusion: Schild analyses evaluate antagonists; pA2 = 9.0 designates an extraordinarily potent blocker, not an agonist."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "5-HT2A reseptör antagonizmi",
          "arContext": "مناهضة مستقبلات 5-HT2A"
        },
        {
          "term": "nanomolar dissosiyasyon sabiti (Kb = 1 nM)",
          "arContext": "ثابت التفكك النانومولي (Kb = 1 nM)"
        }
      ],
      "hints": [
        {
          "tr": "Schild doğrusunun eğiminin tam 1.0 olması ne anlama gelir? (Yarışmalı kompetitif).",
          "ar": "ماذا يعني أن ميل خط Schild يساوي 1.0 تماماً؟ (تنافسي عكوس).",
          "en": "What does a Schild slope of exactly 1.0 prove? (Competitive reversible)."
        },
        {
          "tr": "x-ekseni kesişimi -9.0 ise: log(Kb) = -9.0 -> Kb = 10^-9 M = 1 nM.",
          "ar": "إذا كان التقاطع عند -9.0: فإن log(Kb) = -9.0 وبالتالي Kb = 10^-9 M = 1 nM.",
          "en": "If x-intercept is -9.0: log(Kb) = -9.0 -> Kb = 10^-9 M = 1 nM."
        },
        {
          "tr": "NX-40, 1 nM afiniteye sahip saf bir kompetitif antagonisttir.",
          "ar": "المركب NX-40 هو مضاد تنافسي نقي بألفة فائقة قدرها 1 nM.",
          "en": "NX-40 is a pure competitive antagonist with 1 nM affinity."
        }
      ],
      "sources": [
        {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 28
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-12a",
            "text": "NX-40 basit, reversibl ve tam kompetitif bir antagonisttir; 5-HT2A reseptörüne Kd = 1 nM (10^-9 M) gibi nanomolar yüksek bir afiniteyle bağlanır.",
            "isCorrect": true,
            "misconceptionFeedback": "Kusursuz ustalık! Eğim 1.0 basit kompetisyonu kanıtlar. x kesişimi -9.0 ise pA2 = 9.0 demektir; Kb = 10^-9 M = 1 nM olarak hesaplanır. NX-40 nanomolar güçlü bir kompetitif antagonisttir (Slayt 28)."
          },
          {
            "id": "opt-12b",
            "text": "NX-40 reseptörü kovalent olarak yok eden bir alkilleyici ajandır; pA2 = 9.0 değeri aşırı hücre ölümünü gösterir.",
            "isCorrect": false,
            "misconceptionFeedback": "Schild yorumlama yanılgısı: Kovalent ajanlarda Schild eğimi 1.0 çıkmaz; eğim 1.0 tersinir kompetitif bağlanmanın mutlak kanıtıdır."
          },
          {
            "id": "opt-12c",
            "text": "NX-40 bir tam agonisttir ve serotoninden 9 kat daha fazla hücre içi kalsiyum salıverir.",
            "isCorrect": false,
            "misconceptionFeedback": "Agonist-antagonist karışıklığı: Schild analizi agonistler için değil, antagonistlerin afinitesini ölçmek için yapılır; pA2 = 9.0 güçlü bir blokeri tanımlar."
          }
        ],
        "revealedOutcome": {
          "tr": "NX-40 için Schild eğimi 1.0 ve pA2 = 9.0: İlaç 5-HT2A reseptöründe 1:1 yarışmalı, reversibl ve kompetitif bir antagonisttir. Bağlanma afinitesi Kb = 10^-9 M = 1 nM'dir.",
          "ar": "ميل Schild = 1.0 و pA2 = 9.0 للمركب NX-40: يثبت أنه مضاد تنافسي عكوس بنسبة 1:1 لمستقبل 5-HT2A بألفة نانومولية قدرها Kb = 1 nM.",
          "en": "For NX-40, Schild slope = 1.0 and pA2 = 9.0: proves simple, reversible 1:1 competitive antagonism at 5-HT2A receptors with Kb = 1 nM."
        },
        "explanation": {
          "tr": "Schild analizinin gücü: İlacın konsantrasyon-etki eğrilerini farklı antagonist dozlarında kaydırarak elde edilen eğim 1.0 ise, molekülün saf bir kompetitif bloker olduğu ve pA2 değerinin doğrudan afiniteyi verdiği kesinleşir (Slayt 28).",
          "ar": "قوة تحليل Schild: عندما ينتج عن إزاحة المنحنيات ميل يساوي 1.0، نتأكد يقينياً أن الدواء مضاد تنافسي نقي وأن pA2 تعكس ألفته الحقيقية مباشرة.",
          "en": "The definitive power of Schild analysis: unity slope confirms pure orthosteric competition, ensuring pA2 directly reflects thermodynamic affinity."
        }
      }
    }
  ]
};

const targetPath = path.resolve(__dirname, '../courses/pharmacology/lessons/lesson-04.json');
fs.writeFileSync(targetPath, JSON.stringify(lesson04, null, 2), 'utf8');
console.log('Successfully written lesson-04.json to:', targetPath);
