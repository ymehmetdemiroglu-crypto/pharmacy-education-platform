const fs = require('fs');
const path = require('path');

const lesson03 = {
  "$schema": "../../../packages/platform/schema/lesson.schema.json",
  "id": "pharm-mod2-les1",
  "courseId": "pharmacology",
  "moduleId": "ph-mod-02",
  "title": {
    "tr": "Kademeli Doz-Yanıt Eğrileri ve İntrinsik Etkinlik",
    "ar": "منحنيات الجرعة والاستجابة التدرجية والفعالية الذاتية",
    "en": "Graded Dose-Response Curves & Intrinsic Efficacy"
  },
  "order": 1,
  "access": "free",
  "objective": {
    "tr": "Potens (EC50) ve efikasite (Emax) ayrımını yapmak, Ariëns ve Stephenson modellerini uygulayarak parsiyel agonizm ve doku yedek reseptör rezervini analiz etmek.",
    "ar": "التمييز الدقيق بين القوة (EC50) والفعالية (Emax)، وتطبيق نموذجي Ariëns و Stephenson لتحليل التنبيه الجزئي والاحتياطي الوظيفي للمستقبِلات.",
    "en": "Differentiate potency (EC50) from efficacy (Emax), and apply Ariëns and Stephenson models to analyze partial agonism and tissue spare receptor reserves."
  },
  "misconceptions": [
    {
      "tr": "Daha düşük dozda etki gösteren (potensi yüksek, düşük EC50) bir ilacın klinik olarak mutlaka daha yüksek bir maksimum etki (Emax) üreteceği yanılgısı.",
      "ar": "الظن الخاطئ بأن الدواء الأكثر قوة (EC50 أقل) يحقق حتماً استجابة حيوية أعظمية سريرية أكبر (Emax).",
      "en": "The misconception that a drug with higher potency (lower EC50) necessarily achieves greater maximal clinical efficacy (Emax)."
    },
    {
      "tr": "Parsiyel agonistlerin tüm dokularda ve her koşulda aynı oranda submaksimal etki göstereceği düşüncesi (efektör kenetlenmesi ve yedek reseptör rezervine göre tam agoniste dönüşebilir).",
      "ar": "الاعتقاد الخاطئ بأن المنبهات الجزئية تعطي نفس الاستجابة دون القصوى في كافة الأنسجة (قد تسلك سلوك المنبه الكامل بوجود احتياطي وظيفي ضخم).",
      "en": "The belief that partial agonist efficacy is immutable across tissues, overlooking that abundant spare receptor reserves can convert them into functional full agonists."
    },
    {
      "tr": "Morfin bağımlısına verilen yüksek afiniteli bir parsiyel agonistin (buprenorfin) ağrıyı daha da derin keseceği varsayımı (aksine tam agonisti kovarak akut yoksunluk krizi patlatır).",
      "ar": "الافتراض الخاطئ بأن إعطاء منبه جزئي فائق الألفة (بوبرينورفين) لمريض معتمد على المورفين سيزيد التسكين (بل يطرد المورفين مفجراً نوبة انسحاب حادة).",
      "en": "The misconception that co-administering high-affinity buprenorphine with morphine deepens analgesia, rather than precipitating acute opioid withdrawal."
    }
  ],
  "sources": [
    {
      "file": "Farmakodinami-Doz Yanıt.pdf",
      "page": 4
    },
    {
      "file": "Farmakodinami-Doz Yanıt.pdf",
      "page": 8
    },
    {
      "file": "Farmakodinami-Doz Yanıt.pdf",
      "page": 12
    },
    {
      "file": "Farmakodinami-Doz Yanıt.pdf",
      "page": 15
    },
    {
      "file": "Farmakodinami-Doz Yanıt.pdf",
      "page": 19
    },
    {
      "file": "Farmakodinami-Doz Yanıt.pdf",
      "page": 22
    }
  ],
  "citations": [
    {
      "id": "CIT-PH03-01",
      "book": "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
      "edition": "14th ed.",
      "topic": "Graded Dose-Response Relationships, Potency, Efficacy, and Spare Receptors",
      "chapter": "Chapter 3",
      "page": "55-75",
      "status": "verified"
    },
    {
      "id": "CIT-PH03-02",
      "book": "Katzung Basic & Clinical Pharmacology",
      "edition": "15th ed.",
      "topic": "Drug Receptors & Pharmacodynamics: Graded Dose-Response Curves & Partial Agonists",
      "chapter": "Chapter 2",
      "page": "22-38",
      "status": "verified"
    }
  ],
  "numericClaims": [
    {
      "id": "NUM-PH03-01",
      "parameter": "Buprenorfin vs Morfin İntrinsik Aktivite Oranı",
      "value": "alfa ≈ 0.35 (Buprenorfin) vs alfa = 1.0 (Morfin)",
      "status": "verified",
      "referencePassage": "Goodman & Gilman Ch.3: Buprenorfin mu-reseptörlerinde parsiyel agonisttir (alfa ≈ 0.3-0.4), morfin ise tam agonisttir (alfa = 1.0)."
    },
    {
      "id": "NUM-PH03-02",
      "parameter": "Furchgott Yedek Reseptör Oranı ve EC50 Kayması",
      "value": "EC50 << Kd (Miyokardiyumda %95 yedek reseptör)",
      "status": "verified",
      "referencePassage": "Slide 19 & Katzung Ch.2: Kalp kasında maksimum inotropik yanıt için beta-1 reseptörlerinin %5'inden azı yeterlidir; EC50 belirgin sola kayar."
    },
    {
      "id": "NUM-PH03-03",
      "parameter": "Pindolol İntrinsik Sempatomimetik Aktivite (ISA)",
      "value": "alfa ≈ 0.15-0.25 bazal beta stimülasyonu",
      "status": "verified",
      "referencePassage": "Katzung Ch.10: Pindolol parsiyel beta agonisttir (%15-25 ISA); dinlenim bradikardisini önler."
    }
  ],
  "spacedReviewCards": [
    {
      "cardId": "pharm-mod2-les1-card1",
      "courseId": "pharmacology",
      "drugOrConcept": "Potens (EC50) vs Efikasite (Emax)",
      "prompt": "Bir ilacın potansi ile efikasitesi (maksimum etkinliği) doz-yanıt eğrisinde hangi eksen parametreleriyle ifade edilir?",
      "answer": "Potens yatay eksendeki EC50 konumuyla (düşük EC50 = yüksek potens), efikasite ise dikey eksendeki Emax tavan yüksekliğiyle ifade edilir.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "pharm-mod2-les1-card2",
      "courseId": "pharmacology",
      "drugOrConcept": "Ariëns İntrinsik Aktivite (alfa)",
      "prompt": "Ariëns modeline göre tam agonist, parsiyel agonist ve kompetitif antagonistin alfa değerleri nedir?",
      "answer": "Tam agonist alfa = 1, parsiyel agonist 0 < alfa < 1, kompetitif antagonist alfa = 0.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "pharm-mod2-les1-card3",
      "courseId": "pharmacology",
      "drugOrConcept": "Pindolol ISA Mekanizması",
      "prompt": "Pindolol gibi ISA pozitif beta blokerlerin saf antagonist propranolole göre bradikardik hastalardaki üstünlüğü nedir?",
      "answer": "Parsiyel agonist etkisiyle kalpte bazal sempatik tonusu (%15-25) koruyarak aşırı bradikardiyi ve kardiyak duraklamayı önler.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "pharm-mod2-les1-card4",
      "courseId": "pharmacology",
      "drugOrConcept": "Dokuya Özgü Parsiyel Agonizm (Receptor Reserve)",
      "prompt": "Orta derecede efikasiteye sahip bir ilaç neden sağlıklı dokuda tam agonist, yetmezlikli dokuda parsiyel agonist gibi davranır?",
      "answer": "Sağlıklı dokudaki geniş yedek reseptör rezervi düşük uyarımı tam yanıta amplifiye eder; yetmezlikte rezerv kaybolunca submaksimal tavan ortaya çıkar.",
      "box": 1,
      "intervalDays": 1
    }
  ],
  "translations": {
    "tr": {
      "title": "Kademeli Doz-Yanıt Eğrileri ve İntrinsik Etkinlik"
    },
    "ar": {
      "title": "منحنيات الجرعة والاستجابة التدرجية والفعالية الذاتية"
    }
  },
  "steps": [
    {
      "id": "pharm-mod2-les1-step-01",
      "stage": "hook",
      "stageIndex": 1,
      "type": "predict_reveal",
      "title": {
        "tr": "Klinik Paradoks: Buprenorfin ile Tetiklenen Kriz",
        "ar": "مفارقة سريرية: نوبة الانسحاب المحفزة بالبوبرينورفين",
        "en": "Clinical Paradox: Buprenorphine Precipitated Withdrawal"
      },
      "prompt": {
        "tr": "Morfin infüzyonundaki kanser hastasına şiddetli ağrı atağı için yüksek afiniteli buprenorfin ekleniyor. Hasta derin bir sedasyona girmek yerine 15 dakikada şiddetli terleme, kusma ve akut yoksunluk krizine giriyor. Neden?",
        "ar": "لمريض سرطان خاضع للمورفين، يُعطى بوبرينورفين فائق الألفة لألم حاد مفاجئ. بدلاً من تسكين عميق، يصاب خلال 15 دقيقة بتعرق شديد وإقياء ونوبة انسحاب حادة! لماذا؟",
        "en": "A cancer patient on continuous morphine receives high-affinity buprenorphine for breakthrough pain. Instead of deepening sedation, severe vomiting, diaphoresis, and acute opioid withdrawal erupt within 15 minutes! Why?"
      },
      "predictThenReveal": true,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-1a",
            "text": {
              "tr": "Buprenorfin yüksek afinitesiyle morfini reseptörden kovar; ancak düşük intrinsik aktivitesi (alfa ≈ 0.35) nedeniyle net reseptör aktivasyonu aniden düşer.",
              "ar": "يطرد البوبرينورفين المورفين بألفته العالية؛ ولأن فاعليته الذاتية منخفضة (alfa ≈ 0.35)، تهبط الاستجابة الكلية فجأة وتفجر متلازمة الانسحاب.",
              "en": "Buprenorphine's sub-nanomolar affinity displaces morphine; its lower intrinsic efficacy (alpha ≈ 0.35) then abruptly plunges net opioid signaling."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Doğru! Buprenorfin sub-nanomolar afiniteyle (Kd ≈ 0.1 nM) morfini (Kd ≈ 2 nM) kovar; ancak kendisi parsiyel agonist olduğu için uyarımı %100'den %35'e düşürerek yoksunluk patlatır.",
              "ar": "صحيح! يزيح البوبرينورفين المورفين بألفته الفائقة؛ ولكنه كمنبه جزئي يخفض التنبيه من 100% إلى 35% مما يحفز متلازمة انسحاب حادة فورية.",
              "en": "Correct! Buprenorphine's high affinity displaces morphine, but its partial agonist profile drops activation to 35%, precipitating withdrawal."
            }
          },
          {
            "id": "opt-1b",
            "text": {
              "tr": "Buprenorfin karaciğerde CYP3A4 enzimini hızlandırarak kandaki tüm morfini saniyeler içinde metabolize eder.",
              "ar": "يقوم البوبرينورفين بتحفيز أنزيم CYP3A4 كبدياً ليفكك كامل المورفين في الدم خلال ثوانٍ.",
              "en": "Buprenorphine hyper-induces hepatic CYP3A4, clearing all circulating morphine from blood within seconds."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Metabolik yanılgı: Enzim indüksiyonu günler sürer; 15 dakikada gelişen kriz farmakokinetik klirens değil, reseptör düzeyindeki farmakodinamik yer değiştirmedir.",
              "ar": "خطأ الاستقلاب: يستغرق التحفيز الأنزيمي أياماً؛ والأزمة الصاعقة خلال دقائق تعود لتنافس دوائي مباشر على المستقبلات.",
              "en": "Metabolic misconception: Enzyme induction takes days; rapid 15-minute crisis is pharmacodynamic receptor displacement, not clearance."
            }
          },
          {
            "id": "opt-1c",
            "text": {
              "tr": "Buprenorfin morfin moleküllerine kovalent olarak bağlanarak onları inaktif şelat adüktlerine dönüştürür.",
              "ar": "يرتبط البوبرينورفين تساهمياً بجزيئات المورفين ليحولها إلى معقدات تمخلب خاملة.",
              "en": "Buprenorphine binds covalently to morphine molecules, neutralizing them into inactive chelate adducts."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kimyasal antikor yanılgısı: İki opioid molekülü birbiriyle kovalent bağlanmaz; etki mu-reseptör aktif cebindeki kompetisyondan kaynaklanır.",
              "ar": "خطأ التمخلب الكيميائي: لا يتفاعل الأفيونان كيميائياً في الدم؛ بل يتنافسان على الجيب النشط للمستقبل الأفيوني mu.",
              "en": "Chemical neutralization misconception: Opioids do not react chemically with each other; antagonism occurs at the receptor level."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "parsiyel agonist",
          "arContext": "المنبه الجزئي (partial agonist)"
        },
        {
          "term": "tetiklenmiş yoksunluk",
          "arContext": "الانسحاب المحفز (precipitated withdrawal)"
        }
      ],
      "hints": [
        {
          "tr": "Afinite (bağlanma gücü) ile efikasite (etki gücü) arasındaki farkı hatırlayın.",
          "ar": "تذكر الفارق الحاسم بين الألفة (الارتباط) والفاعلية القصوى (التأثير).",
          "en": "Recall the distinction between target affinity and intrinsic efficacy."
        },
        {
          "tr": "Buprenorfin reseptöre morfinden çok daha sıkı bağlanır fakat reseptörü sadece kısmen uyarabilir.",
          "ar": "يرتبط البوبرينورفين بألفة أشد من المورفين، لكنه ينشط المستقبل جزئياً فقط.",
          "en": "Buprenorphine binds much tighter than morphine, but only stimulates the receptor partially."
        },
        {
          "tr": "Tam agonist morfini kovan parsiyel agonist, net opioid uyarısını anında %35'e düşürür.",
          "ar": "طرد المنبه الكامل واستبداله بمنبه جزئي يهبط بالتنبيه إلى 35% فجأة مسبباً الأزمة.",
          "en": "Displacing a full agonist with a partial agonist plunges stimulation from 100% to 35%."
        }
      ],
      "sources": [
        {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 12
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-1a",
            "text": "Buprenorfin yüksek afinitesiyle morfini reseptörden kovar; ancak düşük intrinsik aktivitesi (alfa ≈ 0.35) nedeniyle net reseptör aktivasyonu aniden düşer.",
            "isCorrect": true,
            "misconceptionFeedback": "Doğru! Buprenorfin sub-nanomolar afiniteyle (Kd ≈ 0.1 nM) morfini (Kd ≈ 2 nM) kovar; ancak kendisi parsiyel agonist olduğu için uyarımı %100'den %35'e düşürerek yoksunluk patlatır."
          },
          {
            "id": "opt-1b",
            "text": "Buprenorfin karaciğerde CYP3A4 enzimini hızlandırarak kandaki tüm morfini saniyeler içinde metabolize eder.",
            "isCorrect": false,
            "misconceptionFeedback": "Metabolik yanılgı: Enzim indüksiyonu günler sürer; 15 dakikada gelişen kriz farmakokinetik klirens değil, reseptör düzeyindeki farmakodinamik yer değiştirmedir."
          },
          {
            "id": "opt-1c",
            "text": "Buprenorfin morfin moleküllerine kovalent olarak bağlanarak onları inaktif şelat adüktlerine dönüştürür.",
            "isCorrect": false,
            "misconceptionFeedback": "Kimyasal antikor yanılgısı: İki opioid molekülü birbiriyle kovalent bağlanmaz; etki mu-reseptör aktif cebindeki kompetisyondan kaynaklanır."
          }
        ],
        "revealedOutcome": {
          "tr": "Buprenorfin yüksek afinitesiyle morfini kovar; fakat intrinsik etkinliği düşük olduğu için net sinyali anında %100'den %35'e düşürerek akut yoksunluk krizi başlatır.",
          "ar": "يطرد البوبرينورفين المورفين بألفته الفائقة؛ ولأن فاعليته منخفضة، تهبط الاستجابة فجأة من 100% إلى 35% مفجرة نوبة انسحاب حادة.",
          "en": "Buprenorphine displaces morphine with high affinity; its low partial efficacy then plunges signaling from 100% to 35%, triggering acute withdrawal."
        },
        "explanation": {
          "tr": "Doz-yanıt teorisinde parsiyel agonistler çift yönlüdür: Tek başlarınayken agonist, tam agonist varlığında ise kompetitif antagonist gibi davranırlar (Farmakodinami Slayt 12).",
          "ar": "في نظرية الجرعة والاستجابة، تسلك المنبهات الجزئية سلوكاً مزدوجاً: منبه بمفردها، ومضاد تنافسي بوجود منبه كامل.",
          "en": "In dose-response theory, partial agonists display dual behavior: agonists in isolation, but functional antagonists in the presence of full agonists."
        }
      }
    },
    {
      "id": "pharm-mod2-les1-step-02",
      "stage": "question",
      "stageIndex": 2,
      "type": "question",
      "title": {
        "tr": "Temel Ayrım: Potens (EC50) vs Efikasite (Emax)",
        "ar": "التمييز الجوهري: القوة (EC50) والفعالية (Emax)",
        "en": "Core Distinction: Potency (EC50) vs Efficacy (Emax)"
      },
      "prompt": {
        "tr": "İki analjezikten İlaç X'in EC50'si 1 mg, İlaç Y'nin EC50'si 50 mg'dır; ancak her ikisi de ağrıyı %100 kesebilmektedir. İlaç X için hangisi doğrudur?",
        "ar": "بين مسكنين، يملك الدواء X تركيز EC50 = 1 mg، والدواء Y يملك EC50 = 50 mg؛ لكن كلاهما يسكن الألم بنسبة 100%. ما الصحيح عن الدواء X؟",
        "en": "Between two analgesics, Drug X has EC50 = 1 mg, while Drug Y has EC50 = 50 mg; yet both completely abolish pain (Emax = 100%). What is true of Drug X?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-2a",
            "text": {
              "tr": "İlaç X, İlaç Y'den 50 kat daha potenttir (yüksek potens); fakat her ikisinin de maksimum efikasitesi (Emax) tamamen eşittir.",
              "ar": "الدواء X أكثر قوة (potency) بـ 50 مرة من الدواء Y؛ لكن الفعالية القصوى (Emax) متطابقة تماماً لكلا الدواءين.",
              "en": "Drug X is 50-fold more potent than Drug Y, yet their maximal efficacy (Emax) is perfectly identical."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Harika! Potens yatay eksendeki dozu (EC50) belirler; 1 mg 50 mg'dan 50 kat daha potenttir. Efikasite ise tavan yüksekliktir (Emax = %100) ve ikisinde de aynıdır.",
              "ar": "رائع! تعبر القوة عن موضع الجرعة أفقياً (EC50)؛ فـ 1 mg أكثر قوة بـ 50 مرة. أما الفعالية فهي سقف الاستجابة الشاقولي (Emax = 100%) وهي متساوية.",
              "en": "Great! Potency reflects horizontal curve placement (EC50); 1 mg is 50-fold more potent. Efficacy is the vertical ceiling (Emax = 100%), which is identical."
            }
          },
          {
            "id": "opt-2b",
            "text": {
              "tr": "İlaç X'in efikasitesi İlaç Y'den 50 kat üstündür ve terminal kanser ağrılarında mutlaka daha üstün bir rahatlama sağlar.",
              "ar": "فعالية الدواء X تفوق الدواء Y بخمسين ضعفاً وسيحقق حتماً تسكيناً أفضل في آلام السرطان الشديدة.",
              "en": "Drug X's efficacy is 50-fold superior to Drug Y, guaranteeing superior relief in severe cancer pain."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Efikasite-potens karışıklığı: Potens sadece gereken miligram miktarını gösterir; her iki ilaç da yeterli dozda ağrıyı %100 keser, tavan etkinlikleri eşittir.",
              "ar": "خلط الفعالية بالقوة: تحدد القوة مقدار الميليغرامات فقط؛ وكلا الدواءين يسكنان الألم بنسبة 100% عند الجرعة الكافية بسقف متساوٍ.",
              "en": "Potency-efficacy confusion: Potency reflects required dose; both drugs reach 100% pain relief, meaning identical clinical efficacy ceilings."
            }
          },
          {
            "id": "opt-2c",
            "text": {
              "tr": "İlaç X'in reseptöre bağlanması kovalenttir; bu yüzden 50 kat daha az dozla etki gösterebilmektedir.",
              "ar": "ارتباط الدواء X بالمستقبل تساهمي غير عكوس؛ ولذا يعمل بجرعة أقل بخمسين ضعفاً.",
              "en": "Drug X binds targets covalently, which is why it operates at 50-fold lower dosage."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kovalent bağ yanılgısı: Yüksek potens kovalent bağlanma demek değildir; non-kovalent bağların yüksek afinite sağlamasıyla da düşük EC50 elde edilir.",
              "ar": "خطأ الرابطة التساهمية: لا تعني القوة العالية روابط تساهمية؛ بل يمكن للألفة العالية غير التساهمية تحقيق EC50 منخفض جداً.",
              "en": "Covalent misconception: High potency does not imply covalent bonding; high-affinity reversible interactions readily achieve low EC50."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "potens (EC50)",
          "arContext": "القوة الدوائية (potency)"
        },
        {
          "term": "efikasite (Emax)",
          "arContext": "الفعالية القصوى (efficacy)"
        }
      ],
      "hints": [
        {
          "tr": "EC50 yatay eksende, Emax ise dikey eksendedir.",
          "ar": "يقع تركيز EC50 على المحور الأفقي، بينما يقع سقف Emax على المحور الشاقولي.",
          "en": "EC50 is plotted on the horizontal axis; Emax on the vertical axis."
        },
        {
          "tr": "Daha az dozla aynı yanıtı veren ilaç daha 'potent'tir.",
          "ar": "الدواء الذي يحقق نفس الاستجابة بجرعة أقل يعتبر أكثر 'قوة'.",
          "en": "A drug producing identical effects at lower doses is more 'potent'."
        },
        {
          "tr": "Her ikisi de ağrıyı %100 kestiği için efikasiteleri (Emax) tamamen eşittir.",
          "ar": "بما أن كلاهما يسكن الألم بنسبة 100%، فإن فعاليتهما القصوى متطابقة.",
          "en": "Since both abolish 100% of pain, their maximal efficacies are identical."
        }
      ],
      "sources": [
        {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 8
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-2a",
            "text": "İlaç X, İlaç Y'den 50 kat daha potenttir (yüksek potens); fakat her ikisinin de maksimum efikasitesi (Emax) tamamen eşittir.",
            "isCorrect": true,
            "misconceptionFeedback": "Harika! Potens yatay eksendeki dozu (EC50) belirler; 1 mg 50 mg'dan 50 kat daha potenttir. Efikasite ise tavan yüksekliktir (Emax = %100) ve ikisinde de aynıdır."
          },
          {
            "id": "opt-2b",
            "text": "İlaç X'in efikasitesi İlaç Y'den 50 kat üstündür ve terminal kanser ağrılarında mutlaka daha üstün bir rahatlama sağlar.",
            "isCorrect": false,
            "misconceptionFeedback": "Efikasite-potens karışıklığı: Potens sadece gereken miligram miktarını gösterir; her iki ilaç da yeterli dozda ağrıyı %100 keser, tavan etkinlikleri eşittir."
          },
          {
            "id": "opt-2c",
            "text": "İlaç X'in reseptöre bağlanması kovalenttir; bu yüzden 50 kat daha az dozla etki gösterebilmektedir.",
            "isCorrect": false,
            "misconceptionFeedback": "Kovalent bağ yanılgısı: Yüksek potens kovalent bağlanma demek değildir; non-kovalent bağların yüksek afinite sağlamasıyla da düşük EC50 elde edilir."
          }
        ],
        "revealedOutcome": {
          "tr": "İlaç X 50 kat daha potenttir (EC50=1 mg vs 50 mg). Ancak her iki ilacın klinik tavanı (%100 analjezi) eşittir, yani efikasiteleri aynıdır.",
          "ar": "الدواء X أكثر قوة بـ 50 مرة (EC50 = 1 mg مقابل 50 mg)؛ لكن السقف السريري متطابق (100% تسكين)، أي أن الفعالية القصوى متساوية.",
          "en": "Drug X is 50-fold more potent (EC50 = 1 mg vs 50 mg), but both share identical 100% analgesic efficacy ceilings."
        },
        "explanation": {
          "tr": "Farmakolojide klinik başarıyı belirleyen asıl parametre efikasitedir (Emax). Potens (EC50) sadece tabletin kaç miligram olacağını belirlerken, efikasite ilacın hastayı ne kadar tedavi edebileceğini belirler (Slayt 8).",
          "ar": "في علم الأدوية، الفعالية (Emax) هي المحدد الحاسم للنجاح السريري. بينما تحدد القوة (EC50) حجم حبة الدواء بالميليغرامات فقط.",
          "en": "Maximal efficacy (Emax) dictates clinical ceiling. Potency (EC50) merely sets pill dosage weight, not ultimate therapeutic ceiling."
        }
      }
    },
    {
      "id": "pharm-mod2-les1-step-03",
      "stage": "intuition",
      "stageIndex": 3,
      "type": "intuition",
      "title": {
        "tr": "Klinik Sezgi: Pindolol ve İntrinsik Sempatomimetik Aktivite (ISA)",
        "ar": "الحدس السريري: بيندولول والنشاط الودي الداخلي (ISA)",
        "en": "Clinical Intuition: Pindolol & Intrinsic Sympathomimetic Activity"
      },
      "prompt": {
        "tr": "Astımlı bir hipertansiyon hastasında, tam antagonist propranolol bronkospazm yaparken; parsiyel agonist pindolol (ISA pozitif) neden bronş tonusunu tehlikeli biçimde düşürmez?",
        "ar": "لمريض ربو وضغط دم، يسبب بروبرانولول (مضاد كامل) تشنجاً قصبياً؛ بينما لا يسبب بيندولول (منبه جزئي ذو نشاط ودي داخلي) هذا التشنج الخطير! لماذا؟",
        "en": "In a hypertensive asthmatic, pure antagonist propranolol triggers bronchospasm, whereas partial agonist pindolol (with ISA) does not provoke severe airway constriction. Why?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-3a",
            "text": {
              "tr": "Pindolol beta-2 reseptörlerine bağlandığında bazal seviyede (%15-25) hafif bir agonistik uyarı (intrinsik sempatomimetik aktivite) sürdürerek bronşların tamamen kasılmasını engeller.",
              "ar": "يحافظ بيندولول على تنبيه قاعدي خفيف (15-25%) لمستقبلات بيتا-2 (نشاط ودي داخلي)، مانعاً التشنج القصبي التام.",
              "en": "Pindolol sustains low-level baseline beta-2 stimulation (15-25% ISA), preventing full, unopposed bronchoconstriction."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kesinlikle! Propranolol saf antagonisttir (alfa=0) ve sempatik tonusu sıfırlayarak bronkospazm yapar. Pindolol ise parsiyel agonisttir (alfa ≈ 0.20); dinlenimde hafif gevşeme sağlar.",
              "ar": "بالتأكيد! بروبرانولول مضاد نقي (alfa=0) يصفر النغمة الودية فيحدث تشنجاً. أما بيندولول فمنبه جزئي (alfa ≈ 0.20) يحافظ على ارتخاء قصبي طفيف.",
              "en": "Exactly! Propranolol is a pure antagonist (alpha=0), wiping out tone. Pindolol is a partial agonist (alpha ≈ 0.20), preserving basal dilation."
            }
          },
          {
            "id": "opt-3b",
            "text": {
              "tr": "Pindolol bronşlardaki beta-2 reseptörlerini tamamen görmezden gelir ve yalnızca böbrek alfa reseptörlerine kilitlenir.",
              "ar": "يتجاهل بيندولول مستقبلات بيتا-2 القصبية كلياً وينقفل حصراً على مستقبلات ألفا الكلوية.",
              "en": "Pindolol completely ignores airway beta-2 targets, binding selectively to renal alpha receptors."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Seçicilik yanılgısı: Pindolol non-selektif bir beta blokerdir; beta-2 reseptörlerine bağlanır ancak onları kısmen uyardığı için koruyucudur.",
              "ar": "خطأ الانتقائية: بيندولول حاصر بيتا غير انتقائي؛ يرتبط بمستقبلات بيتا-2 القصبية لكنه يحميها بالتنبيه الجزئي.",
              "en": "Selectivity misconception: Pindolol is a non-selective beta ligand; safety stems from partial agonism, not receptor avoidance."
            }
          },
          {
            "id": "opt-3c",
            "text": {
              "tr": "Pindolol kanda histamine dönüşerek bronkodilalasyon yapar ve propranololün etkisini sıfırlar.",
              "ar": "يتحول بيندولول في الدم إلى هستامين موسع للقصبات ليلغي تأثير البروبرانولول.",
              "en": "Pindolol metabolizes in blood into histamine, which dilates bronchi and neutralizes propranolol."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Farmakolojik saçmalık: Histamin bronkodilatör değil, şiddetli bronkokonstriktördür; pindolol histaminle ilişkili değildir.",
              "ar": "خطأ دوائي فادح: الهستامين مقبض قصبي شديد؛ ولا علاقة لبيندولول بإنتاج الهستامين.",
              "en": "Pharmacological absurdity: Histamine is a powerful bronchoconstrictor; pindolol is an adrenergic ligand unrelated to histamine."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "intrinsik sempatomimetik aktivite (ISA)",
          "arContext": "النشاط الودي الداخلي (ISA)"
        },
        {
          "term": "bazal tonus",
          "arContext": "النغمة القاعدية (basal tone)"
        }
      ],
      "hints": [
        {
          "tr": "Propranolol ile pindolol arasındaki efikasite (alfa) farkını düşünün.",
          "ar": "قارن بين الفاعلية الذاتية (alpha) لبروبرانولول وبيندولول.",
          "en": "Contrast the intrinsic activity (alpha) of propranolol versus pindolol."
        },
        {
          "tr": "Propranolol reseptörü tamamen susturur (alfa = 0); pindolol ise hafifçe uyarır (alfa ≈ 0.20).",
          "ar": "يخمد بروبرانولول المستقبل كلياً (alfa = 0)؛ بينما يشغله بيندولول جزئياً (alfa ≈ 0.20).",
          "en": "Propranolol silences targets (alpha = 0); pindolol maintains weak stimulation (alpha ≈ 0.20)."
        },
        {
          "tr": "Bu hafif bazal uyarı (ISA) bronşların aşırı kasılmasını engelleyen bir koruma kalkanı sunar.",
          "ar": "هذا التنبيه القاعدي الطفيف (ISA) يمنع التشنج القصبي المفرط.",
          "en": "This baseline stimulus (ISA) buffers against severe bronchoconstriction."
        }
      ],
      "sources": [
        {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 15
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-3a",
            "text": "Pindolol beta-2 reseptörlerine bağlandığında bazal seviyede (%15-25) hafif bir agonistik uyarı (intrinsik sempatomimetik aktivite) sürdürerek bronşların tamamen kasılmasını engeller.",
            "isCorrect": true,
            "misconceptionFeedback": "Kesinlikle! Propranolol saf antagonisttir (alfa=0) ve sempatik tonusu sıfırlayarak bronkospazm yapar. Pindolol ise parsiyel agonisttir (alfa ≈ 0.20); dinlenimde hafif gevşeme sağlar."
          },
          {
            "id": "opt-3b",
            "text": "Pindolol bronşlardaki beta-2 reseptörlerini tamamen görmezden gelir ve yalnızca böbrek alfa reseptörlerine kilitlenir.",
            "isCorrect": false,
            "misconceptionFeedback": "Seçicilik yanılgısı: Pindolol non-selektif bir beta blokerdir; beta-2 reseptörlerine bağlanır ancak onları kısmen uyardığı için koruyucudur."
          },
          {
            "id": "opt-3c",
            "text": "Pindolol kanda histamine dönüşerek bronkodilalasyon yapar ve propranololün etkisini sıfırlar.",
            "isCorrect": false,
            "misconceptionFeedback": "Farmakolojik saçmalık: Histamin bronkodilatör değil, şiddetli bronkokonstriktördür; pindolol histaminle ilişkili değildir."
          }
        ],
        "revealedOutcome": {
          "tr": "Pindolol parsiyel agonisttir (ISA pozitif). Saf antagonist propranolol gibi sempatik tonusu sıfırlamaz; %15-25 düzeyinde bazal beta-2 uyarısı sağlayarak bronkospazmı önler.",
          "ar": "بيندولول منبه جزئي (ISA إيجابي)؛ لا يخمد النغمة الودية كالبروبرانولول، بل يحافظ على تنبيه قاعدي بنسبة 15-25% يمنع التشنج القصبي.",
          "en": "Pindolol is a partial agonist (ISA-positive). Unlike pure antagonist propranolol, it preserves 15-25% basal beta-2 stimulation, preventing airway spasm."
        },
        "explanation": {
          "tr": "İntrinsik sempatomimetik aktiviteye (ISA) sahip beta blokerler, endojen katekolamin seviyesi yüksekken antagonist, düşükken zayıf agonist davranırlar. Bu özellik bradikardi ve astım eğilimli hastalarda klinik avantaj sağlar (Slayt 15).",
          "ar": "حاصرات بيتا ذات النشاط الودي الداخلي (ISA) تسلك سلوك المضاد عند تدفق الكاتيكولامينات، والمنبه بالراحة؛ مما يفيد مرضى بطء القلب والربو.",
          "en": "ISA beta-blockers act as antagonists during catecholamine surges, but maintain weak agonism at rest, buffering against bradycardia and asthma exacerbations."
        }
      }
    },
    {
      "id": "pharm-mod2-les1-step-04",
      "stage": "visual_explanation",
      "stageIndex": 4,
      "type": "visual_explanation",
      "title": {
        "tr": "Görsel Model: Ariëns (alfa) vs Stephenson (e)",
        "ar": "النموذج البصري: Ariëns (alpha) مقابل Stephenson (e)",
        "en": "Visual Modeling: Ariëns (alpha) vs Stephenson (e)"
      },
      "prompt": {
        "tr": "Ariëns'in 'intrinsik aktivite' (alfa) modeli ile Stephenson'ın 'stimulus-efikasite' (e) modeli arasındaki temel fark doz-yanıt eğrisinde nasıl görselleşir?",
        "ar": "كيف يتمايز نموذج 'الفاعلية الذاتية' (alpha) لـ Ariëns عن نموذج 'الفعالية والتحفيز' (e) لـ Stephenson بصرياً على منحنى الجرعة والاستجابة؟",
        "en": "How is the fundamental difference between Ariëns' intrinsic activity (alpha) and Stephenson's stimulus-efficacy (e) visually captured on a dose-response plot?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-4a",
            "text": {
              "tr": "Ariëns yanıtı doğrudan reseptör doluluğuyla sınırlandırırken (alfa * theta); Stephenson doku rezervini açıklayarak düşük dolulukta bile maksimum yanıt üreten 'efikasite' (e) kavramını tanımlar.",
              "ar": "يقيد Ariëns الاستجابة بنسبة إشغال المستقبِلات (alpha * theta)؛ بينما يفسر Stephenson الاحتياطي الوظيفي بإمكانية بلوغ Emax بإشغال ضئيل عبر الفعالية (e).",
              "en": "Ariëns restricts response linearly to occupancy (alpha * theta); Stephenson accommodates spare reserves, showing high efficacy (e) triggers Emax at minimal occupancy."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kusursuz kavrayış! Ariëns modelinde %100 etki için %100 doluluk gerekirken; Stephenson stimulus (S = e * theta) kavramıyla non-lineer amplifikasyonu ve yedek reseptörleri açıklamıştır.",
              "ar": "فهم استثنائي! تطلب نموذج Ariëns إشغال 100% لبلوغ Emax؛ بينما أثبت Stephenson عبر التحفيز (S = e * theta) إمكانية بلوغ Emax بإشغال 1% فقط.",
              "en": "Flawless! Ariëns required 100% occupancy for 100% effect; Stephenson decoupled occupancy via stimulus (S = e * theta), predicting spare receptors."
            }
          },
          {
            "id": "opt-4b",
            "text": {
              "tr": "Ariëns sadece antagonistleri, Stephenson ise yalnızca kovalent bağ kuran toksik molekülleri inceler.",
              "ar": "يدرس Ariëns المضادات فقط، بينما يدرس Stephenson الجزيئات السامة المرتبطة تساهمياً حصراً.",
              "en": "Ariëns solely evaluates antagonists, while Stephenson exclusively models toxic covalent alkylators."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kapsam yanılgısı: Her iki bilim insanı da agonist ve parsiyel agonistleri modellemiştir; Stephenson kovalent ajanları değil doku amplifikasyonunu formüle etmiştir.",
              "ar": "خطأ النطاق: قام كلاهما بنمذجة المنبهات والمنبهات الجزئية؛ ولم يقتصر Stephenson على المواد التساهمية بل صاغ التضخيم الخلوي.",
              "en": "Scope misconception: Both scientists modeled reversible agonists; Stephenson introduced stimulus-response coupling, not covalent toxins."
            }
          },
          {
            "id": "opt-4c",
            "text": {
              "tr": "Stephenson modelinde EC50 değeri daima Kd değerinden 100 kat daha büyüktür.",
              "ar": "في نموذج Stephenson تكون قيمة EC50 دائماً أكبر بمئة ضعف من قيمة Kd.",
              "en": "Under Stephenson's model, the EC50 value is perpetually 100-fold greater than Kd."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Yön yanılgısı: Stephenson ve Furchgott modellerinde yedek reseptör rezervi nedeniyle EC50 << Kd olur (eğri sola kayar), asla daha büyük olmaz.",
              "ar": "خطأ الاتجاه: بوجود احتياطي وظيفي في نموذج Stephenson يكون EC50 أصغر بكثير من Kd (ينزاح لليسار) وليس العكس.",
              "en": "Direction error: In Stephenson's spare receptor model, EC50 << Kd (curve shifts leftward), never rightward."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "Stephenson efikasitesi (e)",
          "arContext": "فعالية Stephenson (e)"
        },
        {
          "term": "stimulus-yanıt kenetlenmesi",
          "arContext": "اقتران التحفيز بالاستجابة"
        }
      ],
      "hints": [
        {
          "tr": "Ariëns: Yanıt = alfa * doluluk (lineer işgal).",
          "ar": "نموذج Ariëns: الاستجابة = alfa * نسبة الإشغال (اقتران خطي).",
          "en": "Ariëns: Response = alpha * occupancy (linear coupling)."
        },
        {
          "tr": "Stephenson: İlaç bir stimulus (S = e * theta) üretir, doku bunu non-lineer olarak cevaba çevirir.",
          "ar": "نموذج Stephenson: يولد الدواء تحفيزاً (S = e * theta) يحوله النسيج غير خطياً إلى استجابة.",
          "en": "Stephenson: Drug creates stimulus (S = e * theta); tissue converts it non-linearly."
        },
        {
          "tr": "Stephenson sayesinde reseptörlerin yalnızca %1'i doluyken bile tam yanıt (%100) alınabileceği anlaşılmıştır.",
          "ar": "أثبت Stephenson إمكانية تحقيق استجابة 100% بإشغال 1% فقط من المستقبِلات بفضل الاحتياطي.",
          "en": "Stephenson proved that 1% occupancy can trigger 100% response when efficacy (e) is high."
        }
      ],
      "sources": [
        {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 19
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-4a",
            "text": "Ariëns yanıtı doğrudan reseptör doluluğuyla sınırlandırırken (alfa * theta); Stephenson doku rezervini açıklayarak düşük dolulukta bile maksimum yanıt üreten 'efikasite' (e) kavramını tanımlar.",
            "isCorrect": true,
            "misconceptionFeedback": "Kusursuz kavrayış! Ariëns modelinde %100 etki için %100 doluluk gerekirken; Stephenson stimulus (S = e * theta) kavramıyla non-lineer amplifikasyonu ve yedek reseptörleri açıklamıştır."
          },
          {
            "id": "opt-4b",
            "text": "Ariëns sadece antagonistleri, Stephenson ise yalnızca kovalent bağ kuran toksik molekülleri inceler.",
            "isCorrect": false,
            "misconceptionFeedback": "Kapsam yanılgısı: Her iki bilim insanı da agonist ve parsiyel agonistleri modellemiştir; Stephenson kovalent ajanları değil doku amplifikasyonunu formüle etmiştir."
          },
          {
            "id": "opt-4c",
            "text": "Stephenson modelinde EC50 değeri daima Kd değerinden 100 kat daha büyüktür.",
            "isCorrect": false,
            "misconceptionFeedback": "Yön yanılgısı: Stephenson ve Furchgott modellerinde yedek reseptör rezervi nedeniyle EC50 << Kd olur (eğri sola kayar), asla daha büyük olmaz."
          }
        ],
        "revealedOutcome": {
          "tr": "Ariëns modeli yanıtı doğrudan dolulukla sınırlandırır. Stephenson efikasite (e) ve stimulus fonksiyonunu tanımlayarak minimal dolulukta tam yanıt oluşturan yedek reseptörleri açıklamıştır.",
          "ar": "قيد Ariëns الاستجابة بالإشغال المباشر؛ بينما فسر Stephenson عبر الفعالية (e) ودالة التحفيز ظاهرة المستقبِلات الاحتياطية وتضخيم الإشارة.",
          "en": "Ariëns capped response linearly to occupancy. Stephenson defined efficacy (e) and stimulus, predicting full responses at minimal occupancy."
        },
        "explanation": {
          "tr": "Stephenson'ın 1956 uyarı teorisi: Yüksek efikasiteli bir tam agonist (yüksek e), reseptör havuzunun minik bir fraksiyonunu uyararak dokunun maksimum kasılma/iletim kapasitesini tüketir. Kalan reseptörler yedektir (Slayt 19).",
          "ar": "نظرية Stephenson للتحفيز (1956): يستطيع المنبه ذو الفعالية الفائقة استنفاد قدرة النسيج القصوى بإشغال نسبة ضئيلة من المستقبِلات، وما تبقى يعتبر احتياطياً.",
          "en": "Stephenson's 1956 stimulus theory: High-efficacy agonists (large e) saturate tissue response capacity at minimal occupancy, establishing receptor reserves."
        }
      }
    },
    {
      "id": "pharm-mod2-les1-step-05",
      "stage": "interactive_artifact",
      "stageIndex": 5,
      "type": "dose_response_curve",
      "widgetType": "DoseResponseCurve",
      "title": {
        "tr": "İnteraktif Laboratuvar: Doz-Yanıt ve Efikasite",
        "ar": "مختبر تفاعلي: منحنى الجرعة والاستجابة والفعالية",
        "en": "Interactive Lab: Dose-Response & Efficacy"
      },
      "prompt": {
        "tr": "Doz-Yanıt laboratuvarında Tam Agonist ve Parsiyel Agonist modlarını karşılaştırın; EC50 kaymasını ve Emax tavanındaki düşüşü canlı manipüle edin.",
        "ar": "في مختبر الجرعة والاستجابة، قارن بين المنبه الكامل والمنبه الجزئي؛ وتحكم حياً بإزاحة EC50 وانخفاض سقف الاستجابة Emax.",
        "en": "In the Dose-Response lab, compare Full Agonist and Partial Agonist modes; dynamically manipulate EC50 shifts and Emax efficacy ceilings."
      },
      "predictThenReveal": false,
      "config": {
        "title": "Kademeli Doz-Yanıt ve Efikasite Simülatörü",
        "prompt": "Tam agonist ve parsiyel agonist eğrilerini inceleyerek Emax tavanını karşılaştırın.",
        "defaultEc50": 5,
        "defaultEmax": 100,
        "defaultHillSlope": 1,
        "modes": [
          "agonist",
          "partial_agonist",
          "competitive_antagonist",
          "noncompetitive_antagonist"
        ],
        "source": {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 12
        },
        "explanation": "Tam agonist (Emax=%100) sistemi tam kapasite aktive eder. Parsiyel agonist (Emax=%35) tüm reseptörleri doldursa da submaksimal yanıt verir; tam agonist varlığında kompetitif antagonist gibi davranır."
      },
      "widget": {
        "type": "DoseResponseCurve",
        "config": {
          "title": "Kademeli Doz-Yanıt ve Efikasite Simülatörü",
          "prompt": "Tam agonist ve parsiyel agonist eğrilerini inceleyerek Emax tavanını karşılaştırın.",
          "defaultEc50": 5,
          "defaultEmax": 100,
          "defaultHillSlope": 1,
          "modes": [
            "agonist",
            "partial_agonist",
            "competitive_antagonist",
            "noncompetitive_antagonist"
          ],
          "source": {
            "file": "Farmakodinami-Doz Yanıt.pdf",
            "page": 12
          },
          "explanation": "Tam agonist (Emax=%100) sistemi tam kapasite aktive eder. Parsiyel agonist (Emax=%35) tüm reseptörleri doldursa da submaksimal yanıt verir; tam agonist varlığında kompetitif antagonist gibi davranır."
        }
      },
      "technicalTerms": [
        {
          "term": "submaksimal tavan (Emax)",
          "arContext": "السقف دون الأقصى (submaximal ceiling)"
        },
        {
          "term": "Hill katsayısı",
          "arContext": "معامل هيل (Hill coefficient)"
        }
      ],
      "hints": [
        {
          "tr": "Parsiyel agonist moduna geçin ve Emax tavanının %35'e kilitlendiğini görün.",
          "ar": "انتقل لنمط المنبه الجزئي ولاحظ كيف ينقفل سقف Emax عند 35%.",
          "en": "Switch to partial agonist mode and observe the Emax ceiling capped at 35%."
        },
        {
          "tr": "Dozu ne kadar artırırsanız artırın, parsiyel agonist asla tam agonistin %100 seviyesine çıkamaz.",
          "ar": "مهما ضاعفت الجرعة، لن يصل المنبه الجزئي إطلاقاً لسقف المنبه الكامل 100%.",
          "en": "No dose escalation allows the partial agonist to reach the 100% full agonist ceiling."
        },
        {
          "tr": "Aynı ortamda tam agonist varken parsiyel agonist reseptörleri işgal ederek uyarımı %35'te sınırlar.",
          "ar": "بوجود منبه كامل، يحجز المنبه الجزئي المستقبِلات حابساً الاستجابة عند 35%.",
          "en": "In the presence of a full agonist, partial agonist occupancy caps net stimulation at 35%."
        }
      ],
      "sources": [
        {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 12
        }
      ]
    },
    {
      "id": "pharm-mod2-les1-step-06",
      "stage": "guided_discovery",
      "stageIndex": 6,
      "type": "guided_discovery",
      "title": {
        "tr": "Deneysel Vaka: CR-10 ve Dokuya Özgü Parsiyel Agonizm",
        "ar": "حالة تجريبية: CR-10 والتنبيه الجزئي المعتمد على النسيج",
        "en": "Experimental Case: CR-10 & Tissue-Dependent Partial Agonism"
      },
      "prompt": {
        "tr": "Deneysel inotropik ajan CR-10, sağlıklı köpek kalbinde güçlü bir tam agonistken (Emax=%100); yetmezlikli insan atriyumunda neden zayıf bir parsiyel agoniste (Emax=%20) dönüşür?",
        "ar": "المركب القلبي التجريبي CR-10 يعمل كمنبه كامل قوي (Emax=100%) في قلب كلب سليم؛ لكنه في أذينة بشرية مصابة بقصور يتحول لمنبه جزئي ضعيف (Emax=20%)! لماذا؟",
        "en": "Experimental inotrope CR-10 acts as a full agonist (Emax=100%) in healthy canine myocardium, yet becomes a weak partial agonist (Emax=20%) in failing human atrium! Why?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-6a",
            "text": {
              "tr": "Yetmezlikli insan kalbinde beta reseptörleri ve efektör kenetlenmesi azaldığı için (yedek reseptör kaybı), orta efikasiteli bir ligand artık maksimum yanıt üretemez.",
              "ar": "بسبب تراجع كثافة مستقبلات بيتا والاقتران الخلوي في القلب البشري المريض (فقدان الاحتياطي)، يعجز المركب متوسط الفعالية عن تحقيق Emax.",
              "en": "In failing human myocardium, downregulated beta receptors and uncoupled effectors (loss of spare reserve) prevent intermediate-efficacy ligands from reaching Emax."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Muhteşem bir keşif! Bir ilacın tam mı parsiyel mi agonist olacağı sadece moleküle değil, dokudaki reseptör yoğunluğuna ve yedek reseptör rezervine bağlıdır (Slayt 22).",
              "ar": "اكتشاف باهر! لا تتحدد صفة المنبه (كامل أم جزئي) ببنية الجزيء وحدها، بل بكثافة المستقبِلات والاحتياطي الوظيفي المتاح في النسيج (شريحة 22).",
              "en": "Magnificent discovery! Full vs partial agonism is not an intrinsic property of the drug alone, but a function of tissue receptor density and reserve."
            }
          },
          {
            "id": "opt-6b",
            "text": {
              "tr": "İnsan atriyumu ilacın kimyasal yapısını anında hidroksilleyerek bir beta blokere dönüştürür.",
              "ar": "يقوم الأذين البشري بهدركسة بنية الدواء فوراً ليتحول إلى حاصر بيتا مثبط.",
              "en": "Human atrial tissue immediately hydroxylates the drug, converting it chemically into an antagonist."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Biyokimyasal yanılgı: Organ banyosunda molekül yapısı değişmez; fark dokudaki sinyal amplifikasyonu ve yedek reseptör kapasitesidir.",
              "ar": "خطأ كيميائي حيوي: لا تتغير بنية الجزيء في الحمام النسيجي؛ بل يعود الفارق لتضخيم الإشارة وسعة المستقبِلات الاحتياطية.",
              "en": "Biochemical misconception: Ligand structures do not mutate in organ baths; differences stem from receptor reserve density."
            }
          },
          {
            "id": "opt-6c",
            "text": {
              "tr": "Köpek kalbinde beta reseptörleri kovalent, insan kalbinde ise sadece van der Waals bağları kurar.",
              "ar": "ترتبط مستقبلات قلب الكلب بروابط تساهمية، بينما قلب الإنسان بروابط فان دير فالس فقط.",
              "en": "Canine myocardial targets form covalent bonds, whereas human targets form only van der Waals contacts."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Bağ türü yanılgısı: CR-10 her iki türde de aynı tersinir non-kovalent bağlarla bağlanır; türler arası fark reseptör sayısı ve kenetlenme verimidir.",
              "ar": "خطأ نوع الرابطة: يرتبط CR-10 بنفس الروابط غير التساهمية العكوسة؛ ويكمن الفارق في عدد المستقبِلات وكفاءة الاقتران.",
              "en": "Bond type error: CR-10 forms identical non-covalent interactions in both species; the difference is receptor reserve magnitude."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "dokuya özgü agonizm",
          "arContext": "التنبيه المعتمد على النسيج"
        },
        {
          "term": "reseptör down-regülasyonu",
          "arContext": "تنظيم المستقبلات نحو الهبوط"
        }
      ],
      "hints": [
        {
          "tr": "Kronik kalp yetmezliğinde kardiyak beta-1 reseptörlerinin sayısına ne olduğunu düşünün.",
          "ar": "فكر في مصير عدد مستقبلات بيتا-1 القلبية في قصور القلب المزمن.",
          "en": "Consider what happens to beta-1 receptor numbers in chronic heart failure."
        },
        {
          "tr": "Reseptörler down-regüle olur ve yedek reseptör rezervi tükenir.",
          "ar": "يحدث هبوط في تنظيم المستقبِلات وينفد الاحتياطي الوظيفي.",
          "en": "Receptors downregulate and spare receptor reserves vanish."
        },
        {
          "tr": "Köpek kalbinde bol yedek reseptör CR-10'u tam agonist yaparken; insan yetmezliğinde rezerv olmadığı için Emax çöker.",
          "ar": "الاحتياطي الضخم في قلب الكلب يجعل CR-10 منبهاً كاملاً، بينما غياب الاحتياطي في الإنسان يسقط Emax لـ 20%.",
          "en": "Plentiful canine reserve yields full agonism; absent human reserve exposes partial agonist limitations."
        }
      ],
      "sources": [
        {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 22
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-6a",
            "text": "Yetmezlikli insan kalbinde beta reseptörleri ve efektör kenetlenmesi azaldığı için (yedek reseptör kaybı), orta efikasiteli bir ligand artık maksimum yanıt üretemez.",
            "isCorrect": true,
            "misconceptionFeedback": "Muhteşem bir keşif! Bir ilacın tam mı parsiyel mi agonist olacağı sadece moleküle değil, dokudaki reseptör yoğunluğuna ve yedek reseptör rezervine bağlıdır (Slayt 22)."
          },
          {
            "id": "opt-6b",
            "text": "İnsan atriyumu ilacın kimyasal yapısını anında hidroksilleyerek bir beta blokere dönüştürür.",
            "isCorrect": false,
            "misconceptionFeedback": "Biyokimyasal yanılgı: Organ banyosunda molekül yapısı değişmez; fark dokudaki sinyal amplifikasyonu ve yedek reseptör kapasitesidir."
          },
          {
            "id": "opt-6c",
            "text": "Köpek kalbinde beta reseptörleri kovalent, insan kalbinde ise sadece van der Waals bağları kurar.",
            "isCorrect": false,
            "misconceptionFeedback": "Bağ türü yanılgısı: CR-10 her iki türde de aynı tersinir non-kovalent bağlarla bağlanır; türler arası fark reseptör sayısı ve kenetlenme verimidir."
          }
        ],
        "revealedOutcome": {
          "tr": "Agonist profili dokuya bağlıdır: CR-10 sağlıklı köpek kalbinde geniş yedek reseptör sayesinde tam agonisttir (Emax=%100). Yetmezlikli insan kalbinde reseptörler down-regüle olduğu için parsiyel agonisttir (Emax=%20).",
          "ar": "يعتمد التنبيه على النسيج: يعمل CR-10 كمنبه كامل في قلب الكلب لوجود احتياطي وظيفي ضخم (Emax=100%)، ويتحول لمنبه جزئي (Emax=20%) في القلب البشري المريض لنفاد الاحتياطي.",
          "en": "Agonism is tissue-dependent: CR-10 acts as a full agonist in canine tissue due to spare reserves, but collapses to a partial agonist in human heart failure due to receptor downregulation."
        },
        "explanation": {
          "tr": "Kenbar ve Furchgott prensiplerine göre: Bir ilacın intrinsik efikasitesi (e) sabittir; fakat oluşturduğu biyolojik yanıt dokunun reseptör havuzu büyüklüğü ([Rt]) ile çarpılır. Doku rezervi azalınca tam agonistler parsiyel agoniste dönüşür (Slayt 22).",
          "ar": "وفق مبادئ Furchgott: فعالية الدواء الذاتية (e) ثابتة؛ لكن الاستجابة الحيوية تتضاعف بحجم حوض المستقبِلات ([Rt]). وعند تراجع الاحتياطي تتحول المنبهات الكاملة لمنبهات جزئية.",
          "en": "Per Furchgott: intrinsic efficacy (e) is constant, but tissue stimulus multiplies by target density ([Rt]). When reserves decline, former full agonists become partial agonists."
        }
      }
    },
    {
      "id": "pharm-mod2-les1-step-07",
      "stage": "formal_explanation",
      "stageIndex": 7,
      "type": "formal_explanation",
      "title": {
        "tr": "Formal Teori: Furchgott Yedek Reseptör Matematiği",
        "ar": "النظرية الصورية: رياضيات المستقبِلات الاحتياطية لـ Furchgott",
        "en": "Formal Theory: Furchgott Spare Receptor Mathematics"
      },
      "prompt": {
        "tr": "Furchgott'un matematiksel modeline göre, bir dokuda yüksek oranda yedek reseptör rezervi bulunduğunda agonist için EC50 ile Kd ilişkisi nasıldır?",
        "ar": "وفق نموذج Furchgott الرياضي، عندما يمتلك النسيج فائضاً كبيراً من المستقبِلات الاحتياطية، ما العلاقة بين EC50 و Kd للمنبه؟",
        "en": "According to Furchgott's mathematical formulation, when a tissue possesses a large spare receptor reserve, what is the precise relationship between agonist EC50 and Kd?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-7a",
            "text": {
              "tr": "EC50 değeri Kd'den çok daha düşüktür (EC50 << Kd); doku maksimum cevaba reseptörlerin yalnızca küçük bir fraksiyonu dolduğunda ulaşır.",
              "ar": "قيمة EC50 أصغر بكثير من Kd (أي EC50 << Kd)؛ ويصل النسيج لأقصى استجابة بإشغال نسبة ضئيلة جداً من المستقبِلات.",
              "en": "EC50 is substantially lower than Kd (EC50 << Kd); tissue reaches maximal response when only a small fraction of receptors is bound."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Mükemmel matematiksel kavrayış! Doku %50 yanıta reseptörlerin yalnızca %1'i dolduğunda ulaşabildiği için EC50 eğrisi Kd bağlama eğrisinin çok soluna kayar (Slayt 19).",
              "ar": "إدراك رياضي متقن! يتحقق نصف التأثير بإشغال 1% فقط من المستقبِلات؛ ولذا ينزاح منحنى الاستجابة EC50 بعيداً إلى يسار منحنى الارتباط Kd.",
              "en": "Flawless mathematical grasp! 50% response occurs at ~1% occupancy; hence the functional EC50 curve lies far to the left of the Kd binding curve."
            }
          },
          {
            "id": "opt-7b",
            "text": {
              "tr": "EC50 değeri mutlaka Kd değerine tam olarak eşit olmak zorundadır (EC50 = Kd).",
              "ar": "يجب أن تتساوى قيمة EC50 تماماً مع قيمة Kd (أي EC50 = Kd).",
              "en": "The EC50 value must be strictly identical to Kd (EC50 = Kd) under all conditions."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Klasik yanılgı: EC50 = Kd eşitliği sadece yedek reseptörün sıfır olduğu ve lineer kenetlenen sistemlerde görülür; yedek reseptör olan dokularda EC50 << Kd'dir.",
              "ar": "خطأ النموذج القديم: تتساوى EC50 مع Kd فقط في غياب المستقبِلات الاحتياطية؛ أما بوجود الاحتياطي فالاستجابة تسبق الارتباط (EC50 << Kd).",
              "en": "Classic misconception: EC50 = Kd only when spare receptors are absent; in reserve-rich tissues, EC50 is far below Kd."
            }
          },
          {
            "id": "opt-7c",
            "text": {
              "tr": "EC50 değeri Kd'den 1000 kat daha büyüktür çünkü yedek reseptörler ilacı nötralize eder.",
              "ar": "قيمة EC50 أكبر بألف ضعف من Kd لأن المستقبِلات الاحتياطية تعطل الدواء.",
              "en": "EC50 is 1000-fold larger than Kd because spare receptors neutralize active drug."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Yedek reseptör fonksiyonu yanılgısı: Yedek reseptörler ilacı nötralize etmez; dokunun duyarlılığını artırarak düşük dozlarda bile tam yanıt üretmesini sağlar.",
              "ar": "خطأ وظيفة الاحتياطي: لا تعطل المستقبِلات الاحتياطية الدواء؛ بل تمنح الخلية حساسية فائقة للاستجابة بجرعات ضئيلة جداً.",
              "en": "Neutralization misconception: Spare receptors do not destroy drugs; they amplify cellular sensitivity, shifting curves leftward."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "yedek reseptör rezervi",
          "arContext": "الاحتياطي الوظيفي للمستقبِلات"
        },
        {
          "term": "EC50 << Kd sola kayma",
          "arContext": "إزاحة الاستجابة لليسار (EC50 << Kd)"
        }
      ],
      "hints": [
        {
          "tr": "Maksimum yanıt için reseptörlerin yalnızca %2'sinin işgal edilmesinin yettiği bir dokuyu hayal edin.",
          "ar": "تخيل نسيجاً تكفيه نسبة 2% فقط من إشغال المستقبِلات لإعطاء أقصى استجابة.",
          "en": "Picture a tissue where occupying only 2% of targets produces full maximal effect."
        },
        {
          "tr": "Yarı maksimal (%50) yanıt için gereken ilaç konsantrasyonu (EC50) çok düşük olacaktır.",
          "ar": "سيكون تركيز الدواء اللازم لإحداث نصف الاستجابة (EC50) ضئيلاً جداً.",
          "en": "The drug concentration producing half-maximal response (EC50) will be miniscule."
        },
        {
          "tr": "Kd ise reseptörlerin %50'sini doldurmak için gereken konsantrasyondur; dolayısıyla EC50 << Kd olur.",
          "ar": "بينما يتطلب Kd إشغال 50% من المستقبِلات فعلياً؛ ولذا يكون EC50 << Kd حتماً.",
          "en": "Kd requires 50% physical occupancy; hence EC50 << Kd by orders of magnitude."
        }
      ],
      "sources": [
        {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 19
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-7a",
            "text": "EC50 değeri Kd'den çok daha düşüktür (EC50 << Kd); doku maksimum cevaba reseptörlerin yalnızca küçük bir fraksiyonu dolduğunda ulaşır.",
            "isCorrect": true,
            "misconceptionFeedback": "Mükemmel matematiksel kavrayış! Doku %50 yanıta reseptörlerin yalnızca %1'i dolduğunda ulaşabildiği için EC50 eğrisi Kd bağlama eğrisinin çok soluna kayar (Slayt 19)."
          },
          {
            "id": "opt-7b",
            "text": "EC50 değeri mutlaka Kd değerine tam olarak eşit olmak zorundadır (EC50 = Kd).",
            "isCorrect": false,
            "misconceptionFeedback": "Klasik yanılgı: EC50 = Kd eşitliği sadece yedek reseptörün sıfır olduğu ve lineer kenetlenen sistemlerde görülür; yedek reseptör olan dokularda EC50 << Kd'dir."
          },
          {
            "id": "opt-7c",
            "text": "EC50 değeri Kd'den 1000 kat daha büyüktür çünkü yedek reseptörler ilacı nötralize eder.",
            "isCorrect": false,
            "misconceptionFeedback": "Yedek reseptör fonksiyonu yanılgısı: Yedek reseptörler ilacı nötralize etmez; dokunun duyarlılığını artırarak düşük dozlarda bile tam yanıt üretmesini sağlar."
          }
        ],
        "revealedOutcome": {
          "tr": "Yedek reseptör varlığında fonksiyonel yanıt eğrisi bağlama eğrisinin solundadır (EC50 << Kd). Doku, toplam reseptörlerin çok küçük bir yüzdesi işgal edildiğinde Emax üretir.",
          "ar": "بوجود مستقبِلات احتياطية يقع منحنى الاستجابة إلى يسار منحنى الارتباط (EC50 << Kd)؛ ويتحقق Emax بإشغال نسبة مئوية ضئيلة من المستقبِلات.",
          "en": "In spare receptor systems, functional response lies left of binding (EC50 << Kd). Tissues achieve Emax when only a tiny fraction of receptors is occupied."
        },
        "explanation": {
          "tr": "Furchgott teorisine göre hücre içi kaskad amplifikasyonu (1 aktif GPCR -> 100 G-proteini -> 10,000 cAMP), hücrenin yanıt kapasitesini reseptör doygunluğundan çok önce tüketir. Bu sayede EC50 Kd'den onlarca kat küçük olur (Slayt 19).",
          "ar": "وفق نظرية Furchgott، يؤدي التضخيم الخلوي (مستقبل واحد ينشط 100 بروتين G وآلاف جزيئات cAMP) لاستنفاد قدرة الخلية قبل تشبع المستقبِلات بكثير (EC50 << Kd).",
          "en": "Intracellular enzymatic amplification cascades saturate downstream effector capacity well before receptors reach saturation, driving EC50 far below Kd."
        }
      }
    },
    {
      "id": "pharm-mod2-les1-step-08",
      "stage": "concept_check",
      "stageIndex": 8,
      "type": "concept_check",
      "title": {
        "tr": "Kavram Kontrolü: İntrinsik Aktivite (alfa) Hesaplaması",
        "ar": "تحقق المفهوم: حساب الفاعلية الذاتية (alpha)",
        "en": "Concept Check: Calculating Intrinsic Activity (alpha)"
      },
      "prompt": {
        "tr": "Bir organ banyosunda tam agonist asetilkolin 100 gram kasılma üretirken, eşit reseptör işgalinde İlaç Z 40 gram kasılma üretmektedir. İlaç Z'nin intrinsik aktivitesi (alfa) nedir?",
        "ar": "في حمام نسيجي، يولد أستيل كولين (منبه كامل) تقلصاً بقوة 100 غرام، بينما يولد الدواء Z بنفس نسبة الإشغال 40 غراماً. ما الفاعلية الذاتية (alpha) للدواء Z؟",
        "en": "In an isolated tissue bath, full agonist acetylcholine elicits 100 g contraction. At identical receptor occupancy, Drug Z elicits 40 g. What is Drug Z's intrinsic activity (alpha)?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-8a",
            "text": {
              "tr": "alfa = 0.40; İlaç Z submaksimal yanıt üreten bir parsiyel agonisttir.",
              "ar": "alfa = 0.40؛ الدواء Z منبه جزئي يحقق استجابة دون القصوى.",
              "en": "alpha = 0.40; Drug Z is a partial agonist producing submaximal contraction."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kusursuz! Ariëns formülü: alfa = E_ilaç / E_tam_agonist = 40 g / 100 g = 0.40. İlaç Z 0 < alfa < 1 aralığında klasik bir parsiyel agonisttir.",
              "ar": "حساب متقن! قانون Ariëns: الفاعلية alfa = استجابة الدواء / أقصى استجابة للمنبه الكامل = 40 / 100 = 0.40، وهو منبه جزئي كلاسيكي.",
              "en": "Flawless! Ariëns formula: alpha = E_drug / E_full_agonist = 40 g / 100 g = 0.40, placing Drug Z squarely as a partial agonist."
            }
          },
          {
            "id": "opt-8b",
            "text": {
              "tr": "alfa = 1.0; çünkü reseptörün tamamını doldurabilmektedir.",
              "ar": "alfa = 1.0؛ لأنه قادر على إشغال كامل المستقبِلات في النسيج.",
              "en": "alpha = 1.0; because it is capable of occupying 100% of available receptors."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "İşgal-etkinlik ayrımı yanılgısı: Reseptörlerin tamamını doldurmak afinite ile ilgilidir; intrinsik aktivite (alfa) üretilen yanıtın tavan oranıdır (40/100 = 0.40).",
              "ar": "خطأ الخلط بين الإشغال والفاعلية: يتبع الامتلاء للألفة والجرعة؛ أما الفاعلية الذاتية (alpha) فهي نسبة الاستجابة الناتجة (40/100 = 0.40).",
              "en": "Occupancy vs efficacy confusion: Occupying all targets reflects concentration; intrinsic activity (alpha) is the fractional response ratio (40/100 = 0.40)."
            }
          },
          {
            "id": "opt-8c",
            "text": {
              "tr": "alfa = 0; çünkü 100 gramlık tam yanıta ulaşamamıştır.",
              "ar": "alfa = 0؛ لأنه عجز عن الوصول للاستجابة التامة 100 غرام.",
              "en": "alpha = 0; because it failed to achieve the full 100 g biological contraction."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Sıfır efikasite yanılgısı: alfa = 0 kompetitif antagonistler için geçerlidir; 40 gram kasılma oluşturan bir ajan sıfır değil, parsiyel agonisttir (alfa = 0.40).",
              "ar": "خطأ الفاعلية الصفرية: تخص alfa = 0 المضادات النقية العاجزة عن إحداث أي تقلص؛ أما هنا فالاستجابة 40 غراماً تمثل منبهاً جزئياً.",
              "en": "Zero efficacy fallacy: alpha = 0 is reserved for pure antagonists; generating 40 g demonstrates partial agonism (alpha = 0.40)."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "intrinsik aktivite katsayısı (alfa)",
          "arContext": "معامل الفاعلية الذاتية (alpha)"
        },
        {
          "term": "organ banyosu biyoanalizi",
          "arContext": "المقايسة الحيوية في الحمام النسيجي"
        }
      ],
      "hints": [
        {
          "tr": "Ariëns intrinsik aktivite formülünü hatırlayın: alfa = Emax(test) / Emax(tam agonist).",
          "ar": "تذكر قانون Ariëns للفاعلية الذاتية: alfa = أقصى استجابة للدواء / أقصى استجابة للمنبه الكامل.",
          "en": "Recall Ariëns' intrinsic activity equation: alpha = Emax(test) / Emax(full agonist)."
        },
        {
          "tr": "Test ilacı 40 g, tam agonist 100 g üretmiştir.",
          "ar": "أنتج الدواء المختبر 40 غراماً، بينما المنبه الكامل 100 غرام.",
          "en": "Test drug produces 40 g; full agonist produces 100 g."
        },
        {
          "tr": "40 / 100 = 0.40.",
          "ar": "40 مقسومة على 100 تساوي 0.40.",
          "en": "40 divided by 100 equals 0.40."
        }
      ],
      "sources": [
        {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 12
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-8a",
            "text": "alfa = 0.40; İlaç Z submaksimal yanıt üreten bir parsiyel agonisttir.",
            "isCorrect": true,
            "misconceptionFeedback": "Kusursuz! Ariëns formülü: alfa = E_ilaç / E_tam_agonist = 40 g / 100 g = 0.40. İlaç Z 0 < alfa < 1 aralığında klasik bir parsiyel agonisttir."
          },
          {
            "id": "opt-8b",
            "text": "alfa = 1.0; çünkü reseptörün tamamını doldurabilmektedir.",
            "isCorrect": false,
            "misconceptionFeedback": "İşgal-etkinlik ayrımı yanılgısı: Reseptörlerin tamamını doldurmak afinite ile ilgilidir; intrinsik aktivite (alfa) üretilen yanıtın tavan oranıdır (40/100 = 0.40)."
          },
          {
            "id": "opt-8c",
            "text": "alfa = 0; çünkü 100 gramlık tam yanıta ulaşamamıştır.",
            "isCorrect": false,
            "misconceptionFeedback": "Sıfır efikasite yanılgısı: alfa = 0 kompetitif antagonistler için geçerlidir; 40 gram kasılma oluşturan bir ajan sıfır değil, parsiyel agonisttir (alfa = 0.40)."
          }
        ],
        "revealedOutcome": {
          "tr": "İlaç Z'nin intrinsik aktivitesi alfa = 40 g / 100 g = 0.40'tır. 0 < alfa < 1 aralığında olduğu için klasik bir parsiyel agonisttir.",
          "ar": "الفاعلية الذاتية للدواء Z هي alfa = 40 / 100 = 0.40؛ وبما أنها تقع بين 0 و 1 فهو منبه جزئي كلاسيكي.",
          "en": "Drug Z's intrinsic activity alpha = 40 g / 100 g = 0.40. Falling between 0 and 1, it is a classic partial agonist."
        },
        "explanation": {
          "tr": "Ariëns modelinde alfa katsayısı ilacın reseptörü ne derece aktif konformasyona geçirebildiğini gösterir. alfa = 1 tam agonist, alfa = 0 antagonist, aradaki değerler parsiyel agonisttir (Slayt 12).",
          "ar": "يقيس معامل alfa قدرة الدواء على تثبيت المستقبل في الحالة النشطة. يمثل 1 منبهاً كاملاً، و0 مضاداً، والقيم البينية منبهاً جزئياً.",
          "en": "The alpha coefficient quantifies a ligand's ability to drive active receptor conformation: alpha = 1 (full), alpha = 0 (antagonist), intermediate values (partial)."
        }
      }
    },
    {
      "id": "pharm-mod2-les1-step-09",
      "stage": "application",
      "stageIndex": 9,
      "type": "clinical_vignette",
      "title": {
        "tr": "Klinik Protokol: Buprenorfin Geçişinde Yoksunluk Yönetimi",
        "ar": "بروتوكول سريري: إدارة الانتقال إلى البوبرينورفين وتجنب الانسحاب",
        "en": "Clinical Protocol: Managing Buprenorphine Transition Without Withdrawal"
      },
      "prompt": {
        "tr": "Opioid kullanım bozukluğu tedavisinde tam agonist metadondan parsiyel agonist buprenorfine geçiş yapılırken hasta neden en az 24 saat yoksunlukta bekletilir?",
        "ar": "في علاج الإدمان الأفيوني، عند الانتقال من ميثادون (منبه كامل) إلى بوبرينورفين (منبه جزئي)، لماذا يُترك المريض 24 ساعة على الأقل في حالة انسحاب؟",
        "en": "In opioid use disorder treatment, when transitioning from full agonist methadone to partial agonist buprenorphine, why must patients endure at least 24 hours of active withdrawal?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-9a",
            "text": {
              "tr": "Metadon reseptörlerden doğal olarak ayrışıp reseptör doluluğu düşmeden buprenorfin verilirse, yüksek afinitesiyle metadonu kovarak feci bir yoksunluk krizi tetikler.",
              "ar": "إذا أُعطي البوبرينورفين قبل انفصال الميثادون وهبوط نسبة الإشغال طبيعياً، سيطرد الميثادون بألفته العالية مفجراً نوبة انسحاب حادة كارثية.",
              "en": "If buprenorphine is given before methadone naturally dissociates and occupancy drops, its superior affinity will displace methadone, precipitating severe withdrawal."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kesinlikle hayati bir kural! Buprenorfin tam agonist doluluğu varken verilirse antagonist gibi davranır. Reseptörler boşalınca verildiğinde ise agonist gibi davranarak hastayı rahatlatır.",
              "ar": "قاعدة سريرية جوهرية! بوجود إشغال كامل للميثادون يتصرف البوبرينورفين كمضاد كابح؛ أما عند فراغ المستقبِلات فيعمل كمنبه يريح المريض.",
              "en": "Critical clinical dogma! In the presence of full agonist occupancy, buprenorphine functions as an antagonist; given when targets clear, it acts as a soothing agonist."
            }
          },
          {
            "id": "opt-9b",
            "text": {
              "tr": "Metadon kanda buprenorfini kovalent olarak yıkarak ilacın karaciğere ulaşmasını engeller.",
              "ar": "يقوم الميثادون بتكسير البوبرينورفين تساهمياً في الدم مانعاً وصوله إلى الكبد.",
              "en": "Methadone chemically degrades circulating buprenorphine, preventing it from reaching hepatic targets."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kimyasal parçalanma yanılgısı: Metadon buprenorfini parçalamaz; etkileşim tamamen hedef mu-opioid reseptörü üzerindeki farmakodinamik yarışmadır.",
              "ar": "خطأ التخريب الكيميائي: لا يكسر الميثادون جزيئات البوبرينورفين؛ بل يدور التفاعل بالكامل حول التنافس على مستقبلات mu الأفيونية.",
              "en": "Chemical destruction error: Methadone does not degrade buprenorphine; competition is purely pharmacodynamic at mu receptors."
            }
          },
          {
            "id": "opt-9c",
            "text": {
              "tr": "24 saatlik süre karaciğerin buprenorfin için yeni reseptörler sentezlemesi için biyolojik olarak zorunludur.",
              "ar": "فترة الـ 24 ساعة ضرورية بيولوجياً لقيام الكبد بتصنيع مستقبلات جديدة للبوبرينورفين.",
              "en": "The 24-hour interval is biologically required for the liver to synthesize brand-new buprenorphine receptors."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Reseptör sentez yeri yanılgısı: Karaciğer opioid reseptörü üretmez, nöronlar üretir; 24 saatlik bekleme süresi yeni reseptör sentezi için değil, metadonun reseptörden temizlenmesi içindir.",
              "ar": "خطأ مكان تصنيع المستقبلات: لا يصنع الكبد مستقبلات أفيونية، بل الخلايا العصبية؛ والهدف من الانتظار هو إفراغ المستقبِلات من الميثادون.",
              "en": "Anatomical misconception: The liver does not produce opioid receptors; 24 hours allows methadone dissociation, not de novo protein synthesis."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "buprenorfin indüksiyon aralığı",
          "arContext": "فترة التحريض بالبوبرينورفين"
        },
        {
          "term": "mu-opioid reseptör kompetisyonu",
          "arContext": "التنافس على مستقبلات mu الأفيونية"
        }
      ],
      "hints": [
        {
          "tr": "Buprenorfinin yüksek afiniteli bir parsiyel agonist olduğunu unutmayın.",
          "ar": "تذكر أن البوبرينورفين منبه جزئي فائق الألفة.",
          "en": "Remember that buprenorphine is a high-affinity partial agonist."
        },
        {
          "tr": "Reseptörler metadon ile doluyken girerse uyarımı %100'den %35'e düşürür.",
          "ar": "إذا دخل والمستقبلات ممتلئة بالميثادون، سيهبط بالتحفيز من 100% إلى 35%.",
          "en": "If it binds while receptors are saturated with methadone, it drops activation to 35%."
        },
        {
          "tr": "Metadonun reseptörden ayrışması ve reseptör doluluğunun düşmesi beklenmelidir.",
          "ar": "يجب انتظار انفصال الميثادون وهبوط نسبة الإشغال في المستقبِلات.",
          "en": "One must wait for methadone dissociation and declining target occupancy."
        }
      ],
      "sources": [
        {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 12
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-9a",
            "text": "Metadon reseptörlerden doğal olarak ayrışıp reseptör doluluğu düşmeden buprenorfin verilirse, yüksek afinitesiyle metadonu kovarak feci bir yoksunluk krizi tetikler.",
            "isCorrect": true,
            "misconceptionFeedback": "Kesinlikle hayati bir kural! Buprenorfin tam agonist doluluğu varken verilirse antagonist gibi davranır. Reseptörler boşalınca verildiğinde ise agonist gibi davranarak hastayı rahatlatır."
          },
          {
            "id": "opt-9b",
            "text": "Metadon kanda buprenorfini kovalent olarak yıkarak ilacın karaciğere ulaşmasını engeller.",
            "isCorrect": false,
            "misconceptionFeedback": "Kimyasal parçalanma yanılgısı: Metadon buprenorfini parçalamaz; etkileşim tamamen hedef mu-opioid reseptörü üzerindeki farmakodinamik yarışmadır."
          },
          {
            "id": "opt-9c",
            "text": "24 saatlik süre karaciğerin buprenorfin için yeni reseptörler sentezlemesi için biyolojik olarak zorunludur.",
            "isCorrect": false,
            "misconceptionFeedback": "Reseptör sentez yeri yanılgısı: Karaciğer opioid reseptörü üretmez, nöronlar üretir; 24 saatlik bekleme süresi yeni reseptör sentezi için değil, metadonun reseptörden temizlenmesi içindir."
          }
        ],
        "revealedOutcome": {
          "tr": "Buprenorfin indüksiyon protokolü: Hastada objektif hafif yoksunluk belirtileri beklenir. Metadon reseptörleri terk ettiğinde buprenorfin agonist gibi davranarak semptomları yatıştırır.",
          "ar": "بروتوكول البوبرينورفين: انتظار ظهور علامات انسحاب موضوعية؛ فبمجرد مغادرة الميثادون للمستقبِلات يعمل البوبرينورفين كمنبه يخفف الأعراض بأمان.",
          "en": "Buprenorphine protocol: induction requires mild-moderate objective withdrawal. Once methadone clears targets, buprenorphine acts as an agonist, relieving distress."
        },
        "explanation": {
          "tr": "Parsiyel agonistler koşullu davranır: Endojen agonist sinyali yüksekken onu baskılarlar (antagonizma), sinyal yokken ise uyarırlar (agonizma). Bu ilke buprenorfin indüksiyonunun temelini oluşturur (Slayt 12).",
          "ar": "تعمل المنبهات الجزئية بشكل شرطي: تكبح الإشارة عند تدفق المنبه الكامل، وتنشطها عند غيابه. ويشكل هذا المبدأ أساس بروتوكول العلاج بالبوبرينورفين.",
          "en": "Partial agonists are conditional: damping high full-agonist signaling while elevating sub-basal tones. This governs safe buprenorphine induction timing."
        }
      }
    },
    {
      "id": "pharm-mod2-les1-step-10",
      "stage": "retrieval",
      "stageIndex": 10,
      "type": "retrieval",
      "title": {
        "tr": "Geri Çağırma: Agonist ve Antagonist Spektrumu",
        "ar": "استرجاع: طيف المنبهات والمضادات الحيوية",
        "en": "Active Recall: Agonist-Antagonist Spectrum"
      },
      "prompt": {
        "tr": "Bir doz-yanıt deneyinde test edilen üç ajandan hangisi reseptöre yüksek afiniteyle bağlanmasına rağmen alfa = 0 olduğu için hiçbir biyolojik stimulus üretemez?",
        "ar": "بين ثلاثة مركبات في تجربة الجرعة والاستجابة، أي مركب يرتبط بالمستقبل بألفة عالية لكنه لا يولد أي تحفيز حيوي لكون alfa = 0؟",
        "en": "Among three agents evaluated in a dose-response assay, which binds targets with high affinity yet generates zero biological stimulus because its intrinsic activity alpha = 0?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-10a",
            "text": {
              "tr": "Saf kompetitif antagonist (örn. nalokson); afinitesi vardır ancak intrinsik aktivitesi sıfırdır (alfa = 0).",
              "ar": "المضاد التنافسي النقي (مثل نالوكسون)؛ يملك ألفة ارتباط قوية لكن فاعليته الذاتية معدومة (alfa = 0).",
              "en": "Pure competitive antagonist (e.g., naloxone); possessing robust affinity yet zero intrinsic activity (alpha = 0)."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Doğru! Ariëns sınıflamasında alfa = 0 kompetitif antagonistleri tanımlar. Reseptöre bağlanırlar ancak aktif konformasyonu tetikleyemezler.",
              "ar": "صحيح! يعرف تصنيف Ariëns المضادات بـ alfa = 0؛ فهي ترسو بالجيب لكنها تعجز عن تحفيز البنية النشطة للمستقبل.",
              "en": "Correct! Ariëns classifies pure antagonists as alpha = 0. They occupy binding alcoves without stabilizing active conformations."
            }
          },
          {
            "id": "opt-10b",
            "text": {
              "tr": "Tam agonist (örn. fentanil); en yüksek afiniteye sahip olduğu için daima alfa = 0 kabul edilir.",
              "ar": "المنبه الكامل (مثل فنتانيل)؛ لامتلاكه أعلى ألفة يعتبر دوماً ذو alfa = 0.",
              "en": "Full agonist (e.g., fentanyl); having the highest affinity, it is designated with alpha = 0."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Tam agonist katsayısı yanılgısı: Tam agonist maksimum stimulus üretir ve alfa = 1.0 olarak tanımlanır, alfa = 0 değil.",
              "ar": "خطأ معامل المنبه الكامل: يحقق المنبه الكامل أقصى تحفيز وتكون alfa = 1.0 لديه وليست صفراً.",
              "en": "Full agonist coefficient error: Full agonists produce maximum activation and have alpha = 1.0, not zero."
            }
          },
          {
            "id": "opt-10c",
            "text": {
              "tr": "Ters agonist (örn. rimonabant); bazal konstitütif aktiviteyi sıfırladığı için afinitesi sıfırdır.",
              "ar": "المنبه العكسي (مثل ريمونابانت)؛ يملك ألفة معدومة لأنه يخمد النشاط التأسيسي القاعدي.",
              "en": "Inverse agonist (e.g., rimonabant); having zero affinity because it silences basal constitutive activity."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Ters agonist afinite yanılgısı: Ters agonistlerin yüksek afinitesi vardır; inaktif konformasyonu stabilize ederek bazal aktiviteyi sıfırın altına çekerler (alfa < 0).",
              "ar": "خطأ ألفة المنبه العكسي: يمتلك المنبه العكسي ألفة عالية جداً، ويخفض النشاط القاعدي لما دون الصفر (alfa < 0).",
              "en": "Inverse agonist affinity error: Inverse agonists possess high affinity; they stabilize inactive states below baseline (alpha < 0)."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "kompetitif antagonist (alfa = 0)",
          "arContext": "المضاد التنافسي (alfa = 0)"
        },
        {
          "term": "konstitütif aktivite",
          "arContext": "النشاط التأسيسي للمستقبل"
        }
      ],
      "hints": [
        {
          "tr": "Afinite var (bağlanıyor) ama etki sıfır (uyarmıyor).",
          "ar": "الألفة موجودة (يرتبط) لكن التأثير معدوم (لا ينشط).",
          "en": "Affinity is present (it binds) but response is absent (no activation)."
        },
        {
          "tr": "Ariëns skalasında alfa = 0 değerini hatırlayın.",
          "ar": "تذكر القيمة alfa = 0 على مقياس Ariëns.",
          "en": "Recall the alpha = 0 value on Ariëns' scale."
        },
        {
          "tr": "Bu ajan yarışmalı kompetitif antagonisttir (örn. nalokson).",
          "ar": "هذا المركب هو مضاد تنافسي (مثل النالوكسون).",
          "en": "This agent is a competitive antagonist (e.g., naloxone)."
        }
      ],
      "sources": [
        {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 12
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-10a",
            "text": "Saf kompetitif antagonist (örn. nalokson); afinitesi vardır ancak intrinsik aktivitesi sıfırdır (alfa = 0).",
            "isCorrect": true,
            "misconceptionFeedback": "Doğru! Ariëns sınıflamasında alfa = 0 kompetitif antagonistleri tanımlar. Reseptöre bağlanırlar ancak aktif konformasyonu tetikleyemezler."
          },
          {
            "id": "opt-10b",
            "text": "Tam agonist (örn. fentanil); en yüksek afiniteye sahip olduğu için daima alfa = 0 kabul edilir.",
            "isCorrect": false,
            "misconceptionFeedback": "Tam agonist katsayısı yanılgısı: Tam agonist maksimum stimulus üretir ve alfa = 1.0 olarak tanımlanır, alfa = 0 değil."
          },
          {
            "id": "opt-10c",
            "text": "Ters agonist (örn. rimonabant); bazal konstitütif aktiviteyi sıfırladığı için afinitesi sıfırdır.",
            "isCorrect": false,
            "misconceptionFeedback": "Ters agonist afinite yanılgısı: Ters agonistlerin yüksek afinitesi vardır; inaktif konformasyonu stabilize ederek bazal aktiviteyi sıfırın altına çekerler (alfa < 0)."
          }
        ],
        "revealedOutcome": {
          "tr": "Kompetitif antagonistler reseptöre yüksek afiniteyle bağlanır fakat intrinsik aktiviteleri sıfırdır (alfa = 0). Parsiyel agonistler 0 < alfa < 1, tam agonistler alfa = 1'dir.",
          "ar": "ترتبط المضادات التنافسية بألفة عالية لكن فاعليتها معدومة (alfa = 0)؛ المنبه الجزئي 0 < alfa < 1 والمنبه الكامل alfa = 1.",
          "en": "Competitive antagonists bind avidly with zero intrinsic efficacy (alpha = 0). Partial agonists have 0 < alpha < 1, full agonists alpha = 1."
        },
        "explanation": {
          "tr": "Farmakolojik spektrum: Tam Agonist (alfa = 1) -> Parsiyel Agonist (0 < alfa < 1) -> Nötral Antagonist (alfa = 0) -> Ters Agonist (alfa < 0). Antagonist afiniteye sahiptir fakat biyolojik stimulus oluşturamaz (Slayt 12).",
          "ar": "الطيف الدوائي: منبه كامل (1) -> منبه جزئي (0 إلى 1) -> مضاد حيادي (0) -> منبه عكسي (أقل من 0). يملك المضاد ألفة خالية من أي تحفيز حيوي.",
          "en": "Pharmacological spectrum: Full Agonist (1) -> Partial (0-1) -> Neutral Antagonist (0) -> Inverse Agonist (<0). Antagonists bind without generating stimulus."
        }
      }
    },
    {
      "id": "pharm-mod2-les1-step-11",
      "stage": "connection",
      "stageIndex": 11,
      "type": "connection",
      "title": {
        "tr": "Kavramsal Köprü: Yaşlı Hastada Pindolol vs Propranolol",
        "ar": "جسر المفاهيم: بيندولول مقابل بروبرانولول في المسنين",
        "en": "Conceptual Bridge: Pindolol vs Propranolol in Geriatric Care"
      },
      "prompt": {
        "tr": "Dinlenim nabzı 52 olan yaşlı bir hipertansif hastada, propranolol yerine neden intrinsik sempatomimetik aktiviteye (ISA) sahip pindolol tercih edilir?",
        "ar": "لمريض مسن يعاني من ارتفاع ضغط ونبض منخفض بالراحة (52 نبضة/د)، لماذا يُفضل بيندولول ذو النشاط الودي الداخلي (ISA) على بروبرانولول؟",
        "en": "In an elderly hypertensive patient with resting bradycardia (52 bpm), why is pindolol (with intrinsic sympathomimetic activity) preferred over pure antagonist propranolol?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-11a",
            "text": {
              "tr": "Pindolol parsiyel agonisttir; dinlenimde kalpte bazal beta uyarımı sağlayarak aşırı bradikardi ve asistol riskini önlerken, egzersiz taşikardisini ve tansiyonu düşürür.",
              "ar": "بيندولول منبه جزئي؛ يحافظ على تنبيه بيتا قاعدي بالراحة لتجنب بطء القلب الشديد، بينما يكبح تسرع القلب الإجهادي ويروض الضغط.",
              "en": "Pindolol is a partial agonist; preserving baseline cardiac beta stimulation at rest to avert severe bradycardia, while suppressing exertional tachycardia and hypertension."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Klinik ustalık! Saf antagonist propranolol dinlenim nabzını 40'ın altına düşürerek kalp bloğu yapabilir. Pindolol parsiyel agonist profiliyle dinlenimde kalbi korur, eforda ise tansiyonu düşürür.",
              "ar": "إتقان سريري! قد يهبط بروبرانولول (المضاد النقي) بالنبض لما دون 40 مسبباً إحصاراً قلبياً؛ بينما يحمي بيندولول القلب بالراحة ويكبح الضغط بالجهد.",
              "en": "Clinical mastery! Pure antagonist propranolol drops resting pulse below 40 bpm (heart block). Pindolol buffers resting rate while controlling exertion pressure."
            }
          },
          {
            "id": "opt-11b",
            "text": {
              "tr": "Pindolol kalsiyum kanallarını bloke ederek kalp atım hızını 120'ye sabitler.",
              "ar": "يقوم بيندولول بحصر قنوات الكالسيوم ليثبت ضربات القلب عند 120 نبضة/دقيقة.",
              "en": "Pindolol selectively blocks L-type calcium channels, fixing heart rate rigidly at 120 bpm."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "İlaç sınıfı yanılgısı: Pindolol bir kalsiyum bloker değildir, adrenerjik beta reseptör ligandıdır ve nabzı 120'ye çıkarmaz.",
              "ar": "خطأ فئة الدواء: ليس بيندولول حاصراً للكالسيوم بل ربيط لمستقبلات بيتا الأدرينالينية، ولا يرفع النبض إلى 120.",
              "en": "Drug class misconception: Pindolol is a beta-adrenergic partial agonist, not a calcium channel blocker; it does not force rate to 120."
            }
          },
          {
            "id": "opt-11c",
            "text": {
              "tr": "Pindolol propranololden 100 kat daha güçlü bir tam agonist olup kalbi sürekli aşırı uyarır.",
              "ar": "بيندولول منبه كامل أقوى بمئة ضعف من بروبرانولول ويحفز القلب باستمرار مفرط.",
              "en": "Pindolol is a full agonist 100-fold more potent than propranolol, perpetually driving cardiac tachycardia."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Agonist derecesi yanılgısı: Pindolol tam agonist değil, zayıf bir parsiyel agonisttir (alfa ≈ 0.20); kalbi aşırı uyarmaz, sadece durmasını engeller.",
              "ar": "خطأ درجة التنبيه: بيندولول ليس منبهاً كاملاً بل منبه جزئي خفيف (alfa ≈ 0.20)؛ لا يجهد القلب بل يمنع توقفه فقط.",
              "en": "Agonist grade error: Pindolol is a weak partial agonist (alpha ≈ 0.20), not a hyper-stimulating full agonist."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "dinlenim bradikardisi",
          "arContext": "بطء القلب أثناء الراحة"
        },
        {
          "term": "parsiyel agonistik tamponlama",
          "arContext": "التخفيف التوازني بالمنبه الجزئي"
        }
      ],
      "hints": [
        {
          "tr": "Hastanın nabzının zaten 52 (bradikardik) olduğunu dikkate alın.",
          "ar": "انتبه إلى أن نبض المريض منخفض أصلاً (52 نبضة/دقيقة).",
          "en": "Note that the patient's baseline heart rate is already bradycardic (52 bpm)."
        },
        {
          "tr": "Saf bir antagonist (propranolol) nabzı tehlikeli seviyede (örn. 38) düşürebilir.",
          "ar": "المضاد النقي (بروبرانولول) قد يهبط بالنبض لمستويات حرجة (38 نبضة/د).",
          "en": "A pure antagonist (propranolol) can crash heart rate into dangerous territory (<40 bpm)."
        },
        {
          "tr": "Parsiyel agonist pindolol bazal tonusu koruyarak aşırı bradikardiden korur.",
          "ar": "المنبه الجزئي بيندولول يحافظ على النغمة القاعدية ويحمي من بطء القلب المفرط.",
          "en": "Partial agonist pindolol maintains basal tone, shielding against catastrophic bradycardia."
        }
      ],
      "sources": [
        {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 15
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-11a",
            "text": "Pindolol parsiyel agonisttir; dinlenimde kalpte bazal beta uyarımı sağlayarak aşırı bradikardi ve asistol riskini önlerken, egzersiz taşikardisini ve tansiyonu düşürür.",
            "isCorrect": true,
            "misconceptionFeedback": "Klinik ustalık! Saf antagonist propranolol dinlenim nabzını 40'ın altına düşürerek kalp bloğu yapabilir. Pindolol parsiyel agonist profiliyle dinlenimde kalbi korur, eforda ise tansiyonu düşürür."
          },
          {
            "id": "opt-11b",
            "text": "Pindolol kalsiyum kanallarını bloke ederek kalp atım hızını 120'ye sabitler.",
            "isCorrect": false,
            "misconceptionFeedback": "İlaç sınıfı yanılgısı: Pindolol bir kalsiyum bloker değildir, adrenerjik beta reseptör ligandıdır ve nabzı 120'ye çıkarmaz."
          },
          {
            "id": "opt-11c",
            "text": "Pindolol propranololden 100 kat daha güçlü bir tam agonist olup kalbi sürekli aşırı uyarır.",
            "isCorrect": false,
            "misconceptionFeedback": "Agonist derecesi yanılgısı: Pindolol tam agonist değil, zayıf bir parsiyel agonisttir (alfa ≈ 0.20); kalbi aşırı uyarmaz, sadece durmasını engeller."
          }
        ],
        "revealedOutcome": {
          "tr": "Pindolol (ISA+), dinlenimde bazal sempatik deşarjı (%15-25) koruyarak bradikardik hastaları kardiyak arrestten korur; egzersizde ise tansiyon ve taşikardiyi baskılar.",
          "ar": "يحافظ بيندولول (ISA+) على نغمة ودية قاعدية (15-25%) تقي مريض بطء القلب من توقف النبض، بينما يكبح الضغط وتسرع القلب أثناء الجهد.",
          "en": "Pindolol (ISA+) sustains 15-25% baseline sympathetic drive, protecting bradycardic patients from heart block while controlling exertional pressure."
        },
        "explanation": {
          "tr": "Parsiyel agonist beta blokerler 'akıllı moleküller' gibi davranır: Vücudun kendi sempatik tonusu düşükken zayıf bir kardiyak destek sağlar, katekolamin fırtınasında ise reseptörleri kapatarak aşırı uyarımı önler (Slayt 15).",
          "ar": "تسلك حاصرات بيتا ذات التنبيه الجزئي سلوكاً ذكياً: توفر دعماً قلبياً طفيفاً عند خمول الجهاز الودي، وتغلق المستقبِلات لحماية القلب عند فوران الأدرينالين.",
          "en": "ISA beta-blockers provide stabilizing bidirectional control: offering mild inotropic support at baseline while blunting dangerous catecholaminergic surges."
        }
      }
    },
    {
      "id": "pharm-mod2-les1-step-12",
      "stage": "mastery_check",
      "stageIndex": 12,
      "type": "mastery_check",
      "title": {
        "tr": "Ustalık Sınavı: Farmakolojik Yanıtın İki Belirleyicisi",
        "ar": "اختبار الإتقان: محددا الاستجابة الدوائية",
        "en": "Mastery Check: Two Determinants of Pharmacological Response"
      },
      "prompt": {
        "tr": "Bir molekülün aynı reseptör havuzunda bazen tam agonist, bazen parsiyel agonist, bazen de antagonist davranabilmesi farmakolojide hangi iki faktörün dinamik etkileşimiyle belirlenir?",
        "ar": "قدرة جزيء ما على التصرف كمنبه كامل تارة، وكمنبه جزئي أو مضاد تارة أخرى لنفس المستقبل، تتحدد بأي عاملين ديناميكيين في علم الأدوية؟",
        "en": "A drug's ability to act as a full agonist, partial agonist, or antagonist at the same receptor is dictated by which two interacting determinants?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-12a",
            "text": {
              "tr": "İlacın sahip olduğu sabit intrinsik efikasite (e) ile hedef dokunun reseptör yoğunluğu ve sinyal amplifikasyon kapasitesi (yedek reseptör rezervi).",
              "ar": "الفعالية الذاتية الثابتة للدواء (e) وكثافة مستقبِلات النسيج وقدرته على تضخيم الإشارة (الاحتياطي الوظيفي).",
              "en": "The drug's invariant intrinsic efficacy (e) interacting with the target tissue's receptor density and coupling amplification (spare receptor reserve)."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kusursuz ustalık! Stephenson ve Furchgott'un modern farmakolojiye en büyük katkısı budur: Efikasite ilaca, rezerv ise dokuya aittir. İkisinin çarpımı klinik yanıtı belirler (Slayt 19, 22).",
              "ar": "إتقان دوائي رفيع! هذه أعظم مساهمة لـ Stephenson و Furchgott: الفعالية ملك للدواء والاحتياطي ملك للنسيج، وحاصل تفاعلهما هو المحدد للاستجابة السريرية.",
              "en": "Flawless mastery! Stephenson and Furchgott's enduring insight: efficacy belongs to the drug, reserve belongs to the tissue; their interplay dictates clinical response."
            }
          },
          {
            "id": "opt-12b",
            "text": {
              "tr": "İlacın molekül ağırlığı ile hastanın idrar pH'sının asitliği.",
              "ar": "الوزن الجزيئي للدواء ودرجة حموضة بول المريض (pH).",
              "en": "The drug's molecular weight interacting with the acidity of patient urinary pH."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Farmakokinetik yanılgısı: Molekül ağırlığı ve idrar pH'sı renal atılımı belirler; reseptör seviyesindeki agonizma/antagonizma dengesini asla belirleyemez.",
              "ar": "خطأ حركية الدواء: يؤثر الوزن وحموضة البول على الإطراح الكلوي، ولا علاقة لهما بآلية التنبيه والمناهضة على مستوى المستقبل.",
              "en": "Pharmacokinetic confusion: Molecular weight and urine pH govern elimination; they have zero bearing on target efficacy mechanisms."
            }
          },
          {
            "id": "opt-12c",
            "text": {
              "tr": "İlacın sadece kovalent bağ yapabilme potansiyeli ve hastanın kan grubu.",
              "ar": "قدرة الدواء على تشكيل روابط تساهمية وفصيلة دم المريض.",
              "en": "The drug's covalent bonding capability interacting with patient ABO blood type."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Biyolojik saçmalık: Agonistler reversibl bağlanır ve kan grubunun reseptör efikasitesi üzerinde hiçbir etkisi yoktur.",
              "ar": "خطأ بيولوجي فادح: ترتبط المنبهات بروابط عكوسة، ولا علاقة لفصيلة الدم بفعالية المستقبلات إطلاقاً.",
              "en": "Biological absurdity: Reversible agonists operate independently of ABO blood types; efficacy is conformational coupling."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "intrinsik efikasite (e)",
          "arContext": "الفعالية الذاتية (intrinsic efficacy)"
        },
        {
          "term": "doku reseptör rezervi",
          "arContext": "احتياطي مستقبِلات النسيج"
        }
      ],
      "hints": [
        {
          "tr": "Biri ilacın kimyasal yapısına ait (efikasite), diğeri ise hastanın hedef dokusuna aittir (rezonans/rezerv).",
          "ar": "أحدهما يخص بنية الدواء الكيميائية (الفعالية)، والآخر يخص نسيج المريض المستهدف (الاحتياطي).",
          "en": "One factor belongs to the drug molecule (efficacy); the other belongs to the target tissue (reserve)."
        },
        {
          "tr": "CR-10 örneğini hatırlayın: İlaç aynıydı, ancak dokudaki yedek reseptör havuzu farklıydı.",
          "ar": "تذكر تجربة CR-10: الدواء هو ذاته، لكن حوض المستقبِلات الاحتياطية اختلف بين النسيجين.",
          "en": "Recall the CR-10 case: the drug was identical, but target tissue receptor reserves differed."
        },
        {
          "tr": "İlacın intrinsik efikasitesi (e) ile dokunun reseptör rezervinin çarpımı yanıtı belirler.",
          "ar": "حاصل تفاعل فعالية الدواء الذاتية (e) مع الاحتياطي الوظيفي للنسيج هو من يحدد النتيجة.",
          "en": "The interaction between drug efficacy (e) and tissue receptor reserve governs output."
        }
      ],
      "sources": [
        {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 19
        },
        {
          "file": "Farmakodinami-Doz Yanıt.pdf",
          "page": 22
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-12a",
            "text": "İlacın sahip olduğu sabit intrinsik efikasite (e) ile hedef dokunun reseptör yoğunluğu ve sinyal amplifikasyon kapasitesi (yedek reseptör rezervi).",
            "isCorrect": true,
            "misconceptionFeedback": "Kusursuz ustalık! Stephenson ve Furchgott'un modern farmakolojiye en büyük katkısı budur: Efikasite ilaca, rezerv ise dokuya aittir. İkisinin çarpımı klinik yanıtı belirler (Slayt 19, 22)."
          },
          {
            "id": "opt-12b",
            "text": "İlacın molekül ağırlığı ile hastanın idrar pH'sının asitliği.",
            "isCorrect": false,
            "misconceptionFeedback": "Farmakokinetik yanılgısı: Molekül ağırlığı ve idrar pH'sı renal atılımı belirler; reseptör seviyesindeki agonizma/antagonizma dengesini asla belirleyemez."
          },
          {
            "id": "opt-12c",
            "text": "İlacın sadece kovalent bağ yapabilme potansiyeli ve hastanın kan grubu.",
            "isCorrect": false,
            "misconceptionFeedback": "Biyolojik saçmalık: Agonistler reversibl bağlanır ve kan grubunun reseptör efikasitesi üzerinde hiçbir etkisi yoktur."
          }
        ],
        "revealedOutcome": {
          "tr": "Farmakolojik yanıt, ilacın sahip olduğu intrinsik efikasite (e) ile dokunun reseptör rezervinin ortak ürünüdür. Bu dinamik ilişki bir ilacın farklı dokularda neden farklı yanıtlar verdiğini açıklar.",
          "ar": "الاستجابة الدوائية ثمرة مشتركة لفاعلية الدواء الذاتية (e) واحتياطي مستقبِلات النسيج؛ وتفسر هذه الديناميكية تباين استجابة الأنسجة لنفس الدواء.",
          "en": "Pharmacological response is the joint product of drug intrinsic efficacy (e) and tissue receptor reserve, explaining why a single ligand displays divergent tissue behaviors."
        },
        "explanation": {
          "tr": "Modern reseptör teorisinin zirvesi: İlaç molekülü reseptöre 'efikasite' (e) kazandırır; doku ise bu uyarıyı 'yedek reseptör ve efektör kaskadı' ile büyütür. Bu iki bileşeni anlamak rasyonel farmakoterapiyi yönetmenin anahtarıdır (Slayt 19, 22).",
          "ar": "قمة نظرية المستقبلات الحديثة: يمنح الدواء المستقبل الفعالية (e)، بينما يضخم النسيج هذا التحفيز عبر الاحتياطي وشلال الإشارات الخلوية.",
          "en": "Pinnacle of modern pharmacodynamics: drugs contribute intrinsic efficacy (e); tissues contribute receptor reserve and cascade amplification to create therapeutic response."
        }
      }
    }
  ]
};

const targetPath = path.resolve(__dirname, '../courses/pharmacology/lessons/lesson-03.json');
fs.writeFileSync(targetPath, JSON.stringify(lesson03, null, 2), 'utf8');
console.log('Successfully written lesson-03.json to:', targetPath);
