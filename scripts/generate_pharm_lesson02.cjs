const fs = require('fs');
const path = require('path');

const lesson02 = {
  "$schema": "../../../packages/platform/schema/lesson.schema.json",
  "id": "pharm-mod1-les2",
  "courseId": "pharmacology",
  "moduleId": "ph-mod-01",
  "title": {
    "tr": "Kütle Hareketi Kanunu, Kd ve Reseptör Doluluk Dengesi",
    "ar": "قانون فعل الكتلة وثابت Kd وتوازن إشغال المستقبِلات",
    "en": "Law of Mass Action, Kd & Receptor Occupancy Equilibrium"
  },
  "order": 2,
  "access": "free",
  "objective": {
    "tr": "Kütle hareketi kanununu ve Hill-Langmuir fraksiyonel doluluk denklemini uygulayarak Kd ve afiniteyi hesaplamak, buprenorfin parsiyel agonist paradoksunu ve yedek reseptör rezervini açıklamak.",
    "ar": "تطبيق قانون فعل الكتلة ومعادلة إشغال المستقبِلات لحساب Kd والألفة الدوائية، وتفسير مفارقة البوبرينورفين وظاهرة المستقبِلات الاحتياطية.",
    "en": "Apply the law of mass action and fractional occupancy equation to calculate Kd and affinity, resolving the buprenorphine paradox and spare receptor reserves."
  },
  "misconceptions": [
    {
      "tr": "Kd ayrışma sabiti sayısal olarak ne kadar büyükse ilacın reseptörüne o kadar güçlü bağlandığı yanılgısı (düşük Kd daha yüksek afiniteyi gösterir).",
      "ar": "الظن الخاطئ بأن زيادة قيمة ثابت التفكك Kd تعني ارتباطاً أقوى بالمستقبل (انخفاض Kd يدل على ألفة أعلى).",
      "en": "The misconception that a higher dissociation constant Kd indicates tighter receptor binding (lower Kd reflects higher affinity)."
    },
    {
      "tr": "Maksimum biyolojik etkinin (Emax) elde edilebilmesi için dokudaki reseptörlerin tamamının (%100) işgal edilmesinin zorunlu olduğu yanılgısı (Furchgott yedek reseptör rezervi).",
      "ar": "الاعتقاد الخاطئ بأن تحقيق أقصى استجابة حيوية (Emax) يتطلب حتماً إشغال 100% من المستقبِلات (ظاهرة الاحتياطي الوظيفي لـ Furchgott).",
      "en": "The belief that producing maximum biological effect (Emax) requires 100% receptor occupancy, neglecting spare receptor reserves."
    },
    {
      "tr": "Yüksek afiniteli bir ilacın her zaman güçlü bir tam agonist olacağı düşüncesi (buprenorfin gibi yüksek afiniteli parsiyel agonistler tam agonistin etkisini antagonize eder).",
      "ar": "الظن الخاطئ بأن الدواء ذو الألفة الأعلى يكون دوماً منبهاً كاملاً أقوى، متجاهلاً أن المنبهات الجزئية عالية الألفة تنافس وتكبح المنبه الكامل.",
      "en": "The misconception that high affinity guarantees high efficacy, overlooking high-affinity partial agonists like buprenorphine that precipitate withdrawal."
    }
  ],
  "sources": [
    {
      "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf",
      "page": 4
    },
    {
      "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf",
      "page": 6
    },
    {
      "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf",
      "page": 34
    }
  ],
  "citations": [
    {
      "id": "CIT-PH02-01",
      "book": "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
      "edition": "14th ed.",
      "topic": "Drug-Receptor Interactions and Quantitative Dynamics: Mass Action Kinetics & Receptor Occupancy",
      "chapter": "Chapter 3",
      "page": "52-70",
      "status": "verified"
    },
    {
      "id": "CIT-PH02-02",
      "book": "Katzung Basic & Clinical Pharmacology",
      "edition": "15th ed.",
      "topic": "Receptor-Effector Coupling & Spare Receptors: Signaling Mechanisms & Drug Action",
      "chapter": "Chapter 2",
      "page": "25-42",
      "status": "verified"
    }
  ],
  "numericClaims": [
    {
      "id": "NUM-PH02-01",
      "parameter": "Kd Konsantrasyonunda Reseptör Doluluk Oranı",
      "value": "50% (theta = 0.50)",
      "status": "verified",
      "referencePassage": "Slide 34: [D] = Kd olduğunda fraksiyonel reseptör doluluğu theta = Kd / (Kd + Kd) = 0.50 (%50 doluluk) olur."
    },
    {
      "id": "NUM-PH02-02",
      "parameter": "Buprenorfin vs Morfin Afinite ve Efikasitesi",
      "value": "Kd ≈ 0.1 nM (Buprenorfin) vs Kd ≈ 2 nM (Morfin), alfa ≈ 0.35",
      "status": "verified",
      "referencePassage": "Slide 34 & Goodman & Gilman Ch.3: Buprenorfin 20 kat yüksek afiniteye sahip bir parsiyel agonisttir; morfini kovarak akut yoksunluk tetikler."
    },
    {
      "id": "NUM-PH02-03",
      "parameter": "Furchgott Yedek Reseptör Oranı (Miyokard)",
      "value": "90-95% yedek reseptör rezervi (Emax için <%5 doluluk)",
      "status": "verified",
      "referencePassage": "Slide 34: Furchgott teorisine göre dokularda maksimum yanıt için reseptörlerin sadece %1-5'inin işgali yeterlidir."
    },
    {
      "id": "NUM-PH02-04",
      "parameter": "Rezidans Süresi Denklemi",
      "value": "tau = 1 / koff",
      "status": "verified",
      "referencePassage": "Slide 34: Ortalama bağlanma kalış süresi ayrışma hız sabitinin tersidir (tau = 1 / koff)."
    }
  ],
  "spacedReviewCards": [
    {
      "cardId": "pharm-mod1-les2-card1",
      "courseId": "pharmacology",
      "drugOrConcept": "Kd Ayrışma Sabiti Tanımı",
      "prompt": "Kd ayrışma sabiti biyofiziksel konsantrasyon cinsinden neyi ifade eder ve afinite ile nasıl ilişkilidir?",
      "answer": "Reseptörlerin tam olarak %50'sinin işgal edildiği serbest ilaç konsantrasyonudur (Kd = koff / kon). Kd ne kadar küçükse afinite (Ka = 1/Kd) o kadar yüksektir.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "pharm-mod1-les2-card2",
      "courseId": "pharmacology",
      "drugOrConcept": "Hill-Langmuir Reseptör Doluluk Formülü",
      "prompt": "Fraksiyonel reseptör doluluğu (theta), serbest ilaç [D] ve Kd cinsinden nasıl formüle edilir?",
      "answer": "theta = [D] / ([D] + Kd). İlaç konsantrasyonu [D] = Kd olduğunda theta = 0.50 (%50 doluluk) elde edilir.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "pharm-mod1-les2-card3",
      "courseId": "pharmacology",
      "drugOrConcept": "Furchgott Yedek Reseptör (Spare Receptors) Teorisi",
      "prompt": "Yedek reseptör rezervi olan bir dokuda agonist için EC50 ile Kd arasındaki ilişki nasıldır?",
      "answer": "EC50 değeri Kd değerinden çok daha düşüktür (EC50 < Kd); doku maksimum cevaba (Emax) reseptör havuzunun yalnızca küçük bir yüzdesi işgal edildiğinde ulaşır.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "pharm-mod1-les2-card4",
      "courseId": "pharmacology",
      "drugOrConcept": "Buprenorfin Akut Yoksunluk Paradoksu",
      "prompt": "Morfin bağımlısı bir hastaya sublingual buprenorfin verildiğinde neden anında akut yoksunluk krizi (precipitated withdrawal) patlak verir?",
      "answer": "Buprenorfinin mu-opioid afinitesi çok yüksek (Kd ≈ 0.1 nM) olduğundan morfini (Kd ≈ 2 nM) kovar; fakat intrinsik aktivitesi düşük (alfa ≈ 0.35) olduğu için net reseptör uyarısı aniden %100'den %35'e düşer.",
      "box": 1,
      "intervalDays": 1
    }
  ],
  "translations": {
    "tr": {
      "title": "Kütle Hareketi Kanunu, Kd ve Reseptör Doluluk Dengesi"
    },
    "ar": {
      "title": "قانون فعل الكتلة وثابت Kd وتوازن إشغال المستقبِلات"
    }
  },
  "steps": [
    {
      "id": "pharm-mod1-les2-step-01",
      "stage": "hook",
      "stageIndex": 1,
      "type": "predict_reveal",
      "title": {
        "tr": "Klinik Paradoks: Buprenorfin ve Hızlı Yoksunluk Krizi",
        "ar": "مفارقة سريرية: البوبرينورفين ونوبة الانسحاب الحاد",
        "en": "Clinical Paradox: Buprenorphine Precipitated Withdrawal"
      },
      "prompt": {
        "tr": "Yüksek doz morfin kullanan bir hastaya, çok daha yüksek afiniteli bir opioid olan buprenorfin veriliyor. Hasta komaya girmek yerine dakikalar içinde şiddetli akut yoksunluk krizine giriyor. Neden?",
        "ar": "مريض يتناول جرعة عالية من المورفين، يُعطى بوبرينورفين ذو الألفة الفائقة. بدلاً من دخول غيبوبة أفيونية، يصاب بأعراض انسحاب حادة خلال دقائق! لماذا؟",
        "en": "A patient on high-dose morphine receives buprenorphine, an opioid with far higher affinity. Instead of deepening narcosis, acute opioid withdrawal explodes within minutes! Why?"
      },
      "predictThenReveal": true,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-1a",
            "text": {
              "tr": "Buprenorfin çok yüksek afinitesiyle morfini reseptörden kovar; ancak kendisi düşük efikasiteli parsiyel agonist olduğundan net sinyali %100'den %35'e düşürür.",
              "ar": "يطرد البوبرينورفين المورفين بألفته العالية؛ لكنه كمنبه جزئي ضعيف الفاعلية يخفض إشارة التنبيه فوراً من 100% إلى 35%.",
              "en": "Buprenorphine's sub-nanomolar affinity displaces morphine, but its low partial agonist efficacy plunges signaling from 100% to 35%."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Doğru! Buprenorfin yüksek afiniteye (Kd ≈ 0.1 nM) fakat düşük intrinsik aktiviteye (alfa ≈ 0.35) sahiptir. Morfini (Kd ≈ 2 nM, alfa = 1) kovar ve opioid uyarısını aniden çökertir (Slayt 34).",
              "ar": "صحيح! يملك البوبرينورفين ألفة فائقة (Kd ≈ 0.1 nM) لكن فاعليته الذاتية منخفضة (alfa ≈ 0.35). يزيح المورفين لتهبط الاستجابة فجأة.",
              "en": "Correct! Buprenorphine has sub-nanomolar affinity (Kd ≈ 0.1 nM) but low intrinsic efficacy (alpha ≈ 0.35). It displaces morphine, collapsing activation."
            }
          },
          {
            "id": "opt-1b",
            "text": {
              "tr": "Buprenorfin morfin molekülünü kanda kovalent olarak parçalayarak idrarla atar.",
              "ar": "يقوم البوبرينورفين بتكسير جزيئات المورفين في الدم تساهمياً ليطرحها عبر البول.",
              "en": "Buprenorphine covalently degrades circulating morphine molecules, expelling them in urine."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kimyasal parçalama yanılgısı: Buprenorfin kimyasal bir enzim veya antikor değildir; mu-opioid reseptöründe yarışan farmakodinamik bir liganddır.",
              "ar": "خطأ التفكيك الكيميائي: ليس البوبرينورفين أنزيماً أو مضاداً كيميائياً، بل ربيط دوائي ينافس على المستقبل الأفيوني.",
              "en": "Degradation misconception: Buprenorphine is not a metabolic enzyme; it is a competitive pharmacological ligand at mu receptors."
            }
          },
          {
            "id": "opt-1c",
            "text": {
              "tr": "Buprenorfin kanda morfinin proteine bağlanmasını %100 bloke ederek toksik serbest morfin dalgası yaratır.",
              "ar": "يعطل البوبرينورفين ارتباط المورفين ببروتينات الدم كلياً ليطلق موجة سامة من المورفين الحر.",
              "en": "Buprenorphine completely blocks morphine protein binding, generating a surge of free toxic morphine."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Plazma proteini yanılgısı: Serbest morfin dalgası oluşsaydı hasta yoksunluğa değil, solunum depresyonu ve komaya girerdi. Olay reseptör düzeyindeki kompetisyondur.",
              "ar": "خطأ إزاحة البروتين: لو تحرر المورفين لدخل المريض في غيبوبة أفيونية وتثبيط تنفسي بدلاً من أعراض الانسحاب الحادة.",
              "en": "Protein displacement misconception: Excess free morphine would cause coma and respiratory depression, not acute withdrawal."
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
          "term": "akut tetiklenmiş yoksunluk",
          "arContext": "متلازمة الانسحاب الحاد المحفز"
        }
      ],
      "hints": [
        {
          "tr": "Afinite (reseptöre tutunma gücü) ile efikasite (reseptörü aktive etme gücü) arasındaki farkı düşünün.",
          "ar": "فكر في الفارق الحاسم بين الألفة (قوة الالتصاق بالمستقبل) والفاعلية (القدرة على تشغيل المستقبل).",
          "en": "Distinguish between target affinity (binding tenacity) and intrinsic efficacy (activation strength)."
        },
        {
          "tr": "Buprenorfin reseptöre morfinden çok daha sıkı bağlanır ama reseptörü sadece kısmen uyarabilir.",
          "ar": "يرتبط البوبرينورفين بالمستقبل بإحكام يفوق المورفين، لكنه يشغله جزئياً فقط.",
          "en": "Buprenorphine binds much tighter than morphine, but stimulates the receptor only partially."
        },
        {
          "tr": "Tam agonist morfini kovan bu zayıf uyarıcı, net opioid sinyalini anında düşürerek yoksunluk krizi patlatır.",
          "ar": "طرد المنبه الكامل واستبداله بمنبه جزئي يهبط بمستوى التنبيه فوراً مفجراً أعراض الانسحاب.",
          "en": "Displacing a full agonist with a partial agonist plunges net stimulation, precipitating immediate withdrawal."
        }
      ],
      "sources": [
        {
          "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf",
          "page": 34
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-1a",
            "text": "Buprenorfin çok yüksek afinitesiyle morfini reseptörden kovar; ancak kendisi düşük efikasiteli parsiyel agonist olduğundan net sinyali %100'den %35'e düşürür.",
            "isCorrect": true,
            "misconceptionFeedback": "Doğru! Buprenorfin yüksek afiniteye (Kd ≈ 0.1 nM) fakat düşük intrinsik aktiviteye (alfa ≈ 0.35) sahiptir. Morfini (Kd ≈ 2 nM, alfa = 1) kovar ve opioid uyarısını aniden çökertir (Slayt 34)."
          },
          {
            "id": "opt-1b",
            "text": "Buprenorfin morfin molekülünü kanda kovalent olarak parçalayarak idrarla atar.",
            "isCorrect": false,
            "misconceptionFeedback": "Kimyasal parçalama yanılgısı: Buprenorfin kimyasal bir enzim veya antikor değildir; mu-opioid reseptöründe yarışan farmakodinamik bir liganddır."
          },
          {
            "id": "opt-1c",
            "text": "Buprenorfin kanda morfinin proteine bağlanmasını %100 bloke ederek toksik serbest morfin dalgası yaratır.",
            "isCorrect": false,
            "misconceptionFeedback": "Plazma proteini yanılgısı: Serbest morfin dalgası oluşsaydı hasta yoksunluğa değil, solunum depresyonu ve komaya girerdi. Olay reseptör düzeyindeki kompetisyondur."
          }
        ],
        "revealedOutcome": {
          "tr": "Buprenorfin yüksek afinitesiyle morfini kovar; ancak düşük intrinsik aktivitesi (alfa ≈ 0.35) nedeniyle net opioid uyarısı aniden düşer ve akut yoksunluk patlak verir.",
          "ar": "يطرد البوبرينورفين المورفين بألفته العالية؛ ولأن فاعليته الذاتية منخفضة، تهبط الاستجابة الأفيونية فوراً مسببة نوبة انسحاب حادة.",
          "en": "Buprenorphine's high affinity displaces morphine; its low intrinsic efficacy then plunges opioid stimulation, precipitating acute withdrawal."
        },
        "explanation": {
          "tr": "Slayt 34'teki Ariëns teorisine göre: Bir ilacın reseptör işgali tek başına etkiyi garanti etmez. Yüksek afiniteli bir parsiyel agonist, tam agonist varlığında bir antagonist gibi davranır.",
          "ar": "وفق نظرية Ariëns في الشريحة 34: إشغال المستقبل وحده لا يضمن الاستجابة؛ المنبه الجزئي عالي الألفة يسلك سلوك المضاد بوجود منبه كامل.",
          "en": "Per Ariëns' intrinsic activity theory (Slide 34): high affinity alone does not dictate response magnitude. A high-affinity partial agonist acts as an antagonist against a full agonist."
        }
      }
    },
    {
      "id": "pharm-mod1-les2-step-02",
      "stage": "question",
      "stageIndex": 2,
      "type": "question",
      "title": {
        "tr": "Kütle Hareketi ve Kd: Yarı Doluluk Noktası",
        "ar": "فعل الكتلة وثابت Kd: نقطة نصف الإشغال",
        "en": "Mass Action & Kd: The Half-Saturation Threshold"
      },
      "prompt": {
        "tr": "Kütle Hareketi Kanununa göre, ortamdaki serbest ilaç konsantrasyonu ilacın Kd ayrışma sabitine eşit olduğunda ([D] = Kd), reseptörlerin yüzde kaçı işgal edilmiştir?",
        "ar": "وفق قانون فعل الكتلة، عندما يتساوى تركيز الدواء الحر في الوسط مع ثابت التفكك ([D] = Kd)، ما هي النسبة المئوية لإشغال المستقبِلات؟",
        "en": "According to the Law of Mass Action, when the free drug concentration equals the dissociation constant ([D] = Kd), what percentage of receptors is occupied?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-2a",
            "text": {
              "tr": "Tam olarak %50'si doludur; theta = [D] / ([D] + Kd) = Kd / (2Kd) = 0.50.",
              "ar": "50% منها تماماً؛ نسبة الإشغال theta = [D] / ([D] + Kd) = 0.50.",
              "en": "Exactly 50% are occupied; fractional occupancy theta = [D] / ([D] + Kd) = 0.50."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kesinlikle doğru! Kd'nin matematiksel ve biyofiziksel tanımı budur: Toplam reseptörlerin tam olarak yarısının (%50) bağlandığı serbest ilaç konsantrasyonudur (Slayt 34).",
              "ar": "صحيح تماماً! هذا هو التعريف الرياضي والفيزيائي لـ Kd: تركيز الدواء الحر الذي يشغل 50% تماماً من إجمالي المستقبِلات (شريحة 34).",
              "en": "Exactly correct! This is the precise definition of Kd: the free ligand concentration at which 50% of total receptors are bound."
            }
          },
          {
            "id": "opt-2b",
            "text": {
              "tr": "%100'ü tamamen doludur; Kd tam doygunluğa ulaşılan eşik konsantrasyonudur.",
              "ar": "100% منها بالكامل؛ يمثل Kd تركيز العتبة للوصول إلى التشبع التام.",
              "en": "100% fully occupied; Kd is the threshold concentration required to saturate all receptors."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Tam doygunluk yanılgısı: [D] = Kd olduğunda reseptörlerin tamamı değil, sadece yarısı doludur. %99 doluluk için konsantrasyonun Kd'nin en az 100 katı olması gerekir.",
              "ar": "خطأ التشبع التام: عند [D] = Kd يمتلئ النصف فقط؛ ويتطلب الوصول إلى 99% إشغال تركيزاً يفوق Kd بمئة ضعف.",
              "en": "Saturation misconception: At [D] = Kd, only half the receptors are occupied. Reaching 99% occupancy requires [D] to be 100 times Kd."
            }
          },
          {
            "id": "opt-2c",
            "text": {
              "tr": "%0'ı doludur; Kd ilacın reseptörden ayrılmaya başladığı alt konsantrasyondur.",
              "ar": "0% منها؛ يمثل Kd الحد الأدنى من التركيز الذي يبدأ عنده الدواء بالانفصال.",
              "en": "0% occupied; Kd is the minimum baseline concentration where drug begins dissociating."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Sıfır doluluk yanılgısı: Bağlanma dinamik bir dengedir; konsantrasyon arttıkça doluluk artar. [D] = Kd seviyesinde reseptörlerin tam %50'si komplekstir.",
              "ar": "خطأ انعدام الإشغال: الارتباط توازن ديناميكي؛ عند وصول التركيز إلى قيمة Kd تكون نصف المستقبِلات مشغولة بالمعقد.",
              "en": "Zero occupancy misconception: Binding is a dynamic equilibrium; at [D] = Kd, exactly half the receptor pool exists as drug-receptor complex."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "ayrışma sabiti (Kd)",
          "arContext": "ثابت التفكك (Kd)"
        },
        {
          "term": "fraksiyonel doluluk (theta)",
          "arContext": "نسبة الإشغال الكسرية (theta)"
        }
      ],
      "hints": [
        {
          "tr": "Hill-Langmuir denklemini hatırlayın: theta = [D] / ([D] + Kd).",
          "ar": "تذكر معادلة هيل-لانغموير: theta = [D] / ([D] + Kd).",
          "en": "Recall the Hill-Langmuir occupancy equation: theta = [D] / ([D] + Kd)."
        },
        {
          "tr": "[D] yerine Kd koyun: Kd / (Kd + Kd).",
          "ar": "عوض Kd مكان [D]: تصبح المعادلة Kd / (Kd + Kd).",
          "en": "Substitute Kd for [D]: the ratio simplifies to Kd / (Kd + Kd)."
        },
        {
          "tr": "Kd / 2Kd = 1/2 = 0.50, yani reseptörlerin tam olarak %50'si doludur.",
          "ar": "Kd / 2Kd = 1/2 = 0.50، أي أن 50% تماماً من المستقبِلات مشغولة.",
          "en": "Kd / 2Kd equals 0.50; exactly half the receptor population is occupied."
        }
      ],
      "sources": [
        {
          "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf",
          "page": 34
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-2a",
            "text": "Tam olarak %50'si doludur; theta = [D] / ([D] + Kd) = Kd / (2Kd) = 0.50.",
            "isCorrect": true,
            "misconceptionFeedback": "Kesinlikle doğru! Kd'nin matematiksel ve biyofiziksel tanımı budur: Toplam reseptörlerin tam olarak yarısının (%50) bağlandığı serbest ilaç konsantrasyonudur (Slayt 34)."
          },
          {
            "id": "opt-2b",
            "text": "%100'ü tamamen doludur; Kd tam doygunluğa ulaşılan eşik konsantrasyonudur.",
            "isCorrect": false,
            "misconceptionFeedback": "Tam doygunluk yanılgısı: [D] = Kd olduğunda reseptörlerin tamamı değil, sadece yarısı doludur. %99 doluluk için konsantrasyonun Kd'nin en az 100 katı olması gerekir."
          },
          {
            "id": "opt-2c",
            "text": "%0'ı doludur; Kd ilacın reseptörden ayrılmaya başladığı alt konsantrasyondur.",
            "isCorrect": false,
            "misconceptionFeedback": "Sıfır doluluk yanılgısı: Bağlanma dinamik bir dengedir; konsantrasyon arttıkça doluluk artar. [D] = Kd seviyesinde reseptörlerin tam %50'si komplekstir."
          }
        ],
        "revealedOutcome": {
          "tr": "[D] = Kd olduğunda fraksiyonel reseptör doluluğu theta = Kd / (Kd + Kd) = 0.50 (%50 doluluk) olur.",
          "ar": "عندما يكون [D] = Kd تصبح نسبة إشغال المستقبِلات theta = 0.50 (50% إشغال).",
          "en": "When [D] = Kd, fractional receptor occupancy theta = Kd / (Kd + Kd) = 0.50 (50% occupancy)."
        },
        "explanation": {
          "tr": "Kütle hareketi kanununa göre denge anında kon*[D]*[R] = koff*[DR] dir. Buradan türetilen Kd = koff / kon sabiti, reseptörlerin yarı yarıya doyduğu serbest ligand derişimidir (Slayt 34).",
          "ar": "وفق قانون فعل الكتلة عند التوازن: سرعة الارتباط تساوي سرعة التفكك. ثابت Kd = koff / kon يمثل تركيز الربيط الذي يضمن إشغال نصف المستقبِلات بالضبط (شريحة 34).",
          "en": "At equilibrium, kon*[D]*[R] = koff*[DR]. The equilibrium dissociation constant Kd = koff/kon is the concentration occupying 50% of available receptors."
        }
      }
    },
    {
      "id": "pharm-mod1-les2-step-03",
      "stage": "intuition",
      "stageIndex": 3,
      "type": "intuition",
      "title": {
        "tr": "Afinite Sezgisi: Ters Orantılı Kd Ölçeği",
        "ar": "حدس الألفة الدوائية: مقياس Kd العكسي",
        "en": "Affinity Intuition: The Inverse Kd Scale"
      },
      "prompt": {
        "tr": "İki ilaç düşünün: İlaç A'nın Kd değeri 0.1 nM, İlaç B'nin Kd değeri 100 nM'dir. Aynı hedef reseptör için hangisi daha yüksek bağlanma afinitesine sahiptir?",
        "ar": "تأمل دواءين: الدواء A يملك Kd = 0.1 nM، بينما الدواء B يملك Kd = 100 nM. أيهما يملك ألفة ارتباط أعلى بالمستقبل المستهدف؟",
        "en": "Consider two drugs: Drug A has Kd = 0.1 nM, while Drug B has Kd = 100 nM. Which drug possesses the higher binding affinity for the target receptor?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-3a",
            "text": {
              "tr": "İlaç A; Kd değeri ne kadar düşükse, reseptörlerin %50'sini doyurmak için gereken molekül sayısı o kadar azdır ve afinite 1000 kat daha yüksektir.",
              "ar": "الدواء A؛ كلما انخفضت قيمة Kd، قل التركيز اللازم لإشغال 50% من المستقبِلات، وكانت الألفة أعلى بألف ضعف.",
              "en": "Drug A; a lower Kd means far fewer molecules are needed to achieve 50% occupancy, reflecting 1000-fold higher affinity."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Harika! Afinite Ka = 1 / Kd bağıntısıyla tanımlanır. Kd küçüldükçe ilacın reseptöre ilgisi katlanarak artar; 0.1 nM'lik ilaç 100 nM'likten 1000 kat daha güçlü bağlanır (Slayt 34).",
              "ar": "رائع! تُعرف الألفة بالمعادلة Ka = 1 / Kd. كلما صغرت Kd زاد الارتباط إحكاماً؛ فالدواء ذو 0.1 nM يرتبط بقوة تفوق الآخر بألف مرة (شريحة 34).",
              "en": "Great! Affinity is the reciprocal of dissociation (Ka = 1/Kd). A Kd of 0.1 nM binds 1000 times more avidly than 100 nM."
            }
          },
          {
            "id": "opt-3b",
            "text": {
              "tr": "İlaç B; Kd değeri ne kadar büyükse moleküller o kadar hızlı yapışır ve afinite artar.",
              "ar": "الدواء B؛ كلما زادت قيمة Kd، التصقت الجزيئات بالمستقبل أسرع وارتفعت الألفة.",
              "en": "Drug B; larger Kd values indicate faster binding association and therefore higher affinity."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Ayrışma vs bağlanma yanılgısı: Kd bağlanma değil ayrışma (dissociation) sabitidir. Yüksek Kd, ilacın reseptörden çok hızlı koptuğunu (koff yüksek) ve afinitenin düşük olduğunu gösterir.",
              "ar": "خطأ التفكك والارتباط: Kd هو ثابت التفكك؛ وارتفاع قيمته يعني سرعة انفصال الدواء (koff مرتفع) وضعف الألفة.",
              "en": "Dissociation misconception: Kd measures dissociation. A high Kd means rapid target departure (high koff) and weak affinity."
            }
          },
          {
            "id": "opt-3c",
            "text": {
              "tr": "Her iki ilacın afinitesi aynıdır; Kd sadece ilacın molekül ağırlığını temsil eder.",
              "ar": "كلا الدواءين متطابقان في الألفة؛ إذ يمثل Kd مجرد الوزن الجزيئي للدواء.",
              "en": "Both drugs have identical affinity; Kd merely reflects molecular weight."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Molekül ağırlığı yanılgısı: Kd molekül ağırlığıyla değil, kimyasal bağlanma dengesi ve Gibbs serbest enerjisiyle (Delta G) doğrudan ilişkilidir.",
              "ar": "خطأ الوزن الجزيئي: لا يعبر Kd عن الوزن الجزيئي إطلاقاً، بل يرتبط مباشرة بطاقة غيبس الحرة للارتباط والتوازن الكيميائي.",
              "en": "Molecular weight misconception: Kd is thermodynamic binding free energy (Delta G), unrelated to molecular mass."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "bağlanma afinitesi",
          "arContext": "ألفة الارتباط (binding affinity)"
        },
        {
          "term": "ayrışma hızı (koff)",
          "arContext": "معدل التفكك (koff)"
        }
      ],
      "hints": [
        {
          "tr": "Kd bir 'ayrışma' sabitidir; ilacın reseptörü ne kadar kolay terk ettiğini gösterir.",
          "ar": "ثابت Kd هو ثابت 'تفكك'؛ يقيس مدى سهولة مغادرة الدواء للمستقبل.",
          "en": "Kd is a 'dissociation' constant reflecting how readily a drug leaves its target."
        },
        {
          "tr": "Az miktarda molekülle bile reseptörü doldurabilen ilaç mı, yoksa çok miktarda molekül gerektiren mi daha isteklidir?",
          "ar": "هل الدواء الذي يملأ المستقبل بتركيز شحيح أشد رغبة في الارتباط، أم الذي يتطلب تركيزاً غفيراً؟",
          "en": "Does a drug needing few molecules to occupy targets have higher or lower affinity?"
        },
        {
          "tr": "Kd ne kadar küçükse afinite o kadar büyüktür: Ka = 1 / Kd. 0.1 nM olan İlaç A 1000 kat daha güçlü afiniteye sahiptir.",
          "ar": "كلما صغر Kd زادت الألفة: Ka = 1 / Kd. الدواء A ذو 0.1 nM أشد ألفة بألف ضعف.",
          "en": "Smaller Kd indicates higher affinity: Ka = 1/Kd. Drug A (0.1 nM) is 1000-fold more avid."
        }
      ],
      "sources": [
        {
          "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf",
          "page": 34
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-3a",
            "text": "İlaç A; Kd değeri ne kadar düşükse, reseptörlerin %50'sini doyurmak için gereken molekül sayısı o kadar azdır ve afinite 1000 kat daha yüksektir.",
            "isCorrect": true,
            "misconceptionFeedback": "Harika! Afinite Ka = 1 / Kd bağıntısıyla tanımlanır. Kd küçüldükçe ilacın reseptöre ilgisi katlanarak artar; 0.1 nM'lik ilaç 100 nM'likten 1000 kat daha güçlü bağlanır (Slayt 34)."
          },
          {
            "id": "opt-3b",
            "text": "İlaç B; Kd değeri ne kadar büyükse moleküller o kadar hızlı yapışır ve afinite artar.",
            "isCorrect": false,
            "misconceptionFeedback": "Ayrışma vs bağlanma yanılgısı: Kd bağlanma değil ayrışma (dissociation) sabitidir. Yüksek Kd, ilacın reseptörden çok hızlı koptuğunu (koff yüksek) ve afinitenin düşük olduğunu gösterir."
          },
          {
            "id": "opt-3c",
            "text": "Her iki ilacın afinitesi aynıdır; Kd sadece ilacın molekül ağırlığını temsil eder.",
            "isCorrect": false,
            "misconceptionFeedback": "Molekül ağırlığı yanılgısı: Kd molekül ağırlığıyla değil, kimyasal bağlanma dengesi ve Gibbs serbest enerjisiyle (Delta G) doğrudan ilişkilidir."
          }
        ],
        "revealedOutcome": {
          "tr": "Afinite Kd ile ters orantılıdır (Ka = 1 / Kd). Kd = 0.1 nM olan İlaç A, Kd = 100 nM olan İlaç B'ye göre reseptöre 1000 kat daha yüksek afiniteyle bağlanır.",
          "ar": "تتناسب الألفة عكساً مع Kd (Ka = 1 / Kd). الدواء A ذو Kd = 0.1 nM يرتبط بألفة تفوق الدواء B بمئة ضعف.",
          "en": "Affinity is inversely proportional to Kd (Ka = 1/Kd). Drug A (Kd = 0.1 nM) binds with 1000-fold higher affinity than Drug B (100 nM)."
        },
        "explanation": {
          "tr": "Düşük Kd, ilacın çok düşük konsantrasyonlarda bile reseptörün yarısını işgal edebildiğini gösterir. Bu durum daha yüksek bağlanma gücü, daha düşük terapötik doz ve daha az hedef dışı toksisite anlamına gelir (Slayt 34).",
          "ar": "يعني انخفاض Kd قدرة الدواء على إشغال نصف المستقبِلات بتركيز ضئيل جداً، مما يترجم سريرياً إلى فاعلية بجرعات منخفضة وأمان أعلى (شريحة 34).",
          "en": "A lower Kd demonstrates target occupancy at trace concentrations, enabling lower therapeutic dosing and reduced off-target liabilities."
        }
      }
    },
    {
      "id": "pharm-mod1-les2-step-04",
      "stage": "visual_explanation",
      "stageIndex": 4,
      "type": "visual_explanation",
      "title": {
        "tr": "Görsel Matematik: Hiperbolden Sigmoidal Eğriye",
        "ar": "الرياضيات البصرية: من القطع الزائد إلى المنحنى السيني",
        "en": "Visual Math: From Hyperbola to Sigmoidal Curve"
      },
      "prompt": {
        "tr": "Doz-yanıt eğrisinin logaritmik eksenini inceleyin: Eksen lineerden logaritmaya çevrildiğinde hiperbolik eğri neden zarif bir S-biçimli (sigmoidal) eğriye dönüşür?",
        "ar": "تأمل المحور اللوغاريتمي لمنحنى الجرعة والاستجابة: لماذا يتحول المنحنى الزائدي إلى منحنى سيني أنيق (sigmoidal) عند تحويل المحور من الخطي إلى اللوغاريتمي؟",
        "en": "Examine the log dose-response curve: why does the rectangular hyperbola transform into a symmetric sigmoidal S-curve upon logarithmic transformation?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-4a",
            "text": {
              "tr": "Logaritmik skala, çok geniş bir konsantrasyon aralığını (4-5 logaritma basamağı) tek bir grafik üzerinde simetrik ve ölçülebilir hale getirir.",
              "ar": "المقياس اللوغاريتمي يضغط مجالاً واسعاً من التراكيز (4-5 مراتب عشرية) ليصبح متناظراً وقابلاً للقياس والمقارنة على رسم بياني واحد.",
              "en": "The logarithmic scale compresses vast concentration spans (4-5 orders of magnitude) into a symmetric, clinically measurable curve."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Mükemmel! Lineer grafikte düşük dozlar sıfıra sıkışırken yüksek dozlar sonsuza uzanır. Logaritmik dönüşüm, EC50 noktasını eğrinin simetrik büküm noktası (inflection point) haline getirir (Slayt 34).",
              "ar": "ممتاز! في الرسم الخطي تتكدس الجرعات المنخفضة بينما يمتد المنحنى في اللانهاية. يحول اللوغاريتم نقطة EC50 إلى نقطة انقلاب متناظرة (شريحة 34).",
              "en": "Perfect! Linear plots compress low doses near zero. Logarithmic transformation turns EC50 into a symmetric inflection point."
            }
          },
          {
            "id": "opt-4b",
            "text": {
              "tr": "Logaritma dönüşümü ilacın kovalent bağ kurmasını sağlayarak yanıtı lineerleştirir.",
              "ar": "يقوم التحويل اللوغاريتمي بتحفيز الدواء على تشكيل روابط تساهمية لتصبح الاستجابة خطية.",
              "en": "Logarithmic transformation induces covalent binding in the drug, linearizing cellular responses."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Fiziksel anlam yanılgısı: Logaritma ekseni sadece bir veri görselleştirme aracıdır; ilacın kimyasal bağ yapısını veya kovalent doğasını asla etkileyemez.",
              "ar": "خطأ التفسير الفيزيائي: المقياس اللوغاريتمي مجرد أداة رياضية لتمثيل البيانات، ولا يغير كيمياء الروابط الحيوية مطلقاً.",
              "en": "Data representation misconception: Log scales are mathematical plotting tools; they do not alter chemical bonds."
            }
          },
          {
            "id": "opt-4c",
            "text": {
              "tr": "Sigmoidal dönüşüm reseptörlerin tamamının aynı anda tek bir molekülle doymasını zorunlu kılar.",
              "ar": "يفرض التحول السيني امتلاء كافة المستقبِلات بجزيء دوائي واحد في الوقت ذاته.",
              "en": "Sigmoidal conversion forces all receptors to simultaneously saturate with a single ligand molecule."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Doygunluk yanılgısı: Sigmoidal eğri Hill-Langmuir kütle hareketi dengesini simetrik olarak gösterir; tek bir molekülle tüm reseptörlerin doyması fizikokimyasal olarak imkansızdır.",
              "ar": "خطأ التشبع المتزامن: يعكس المنحنى السيني توازن فعل الكتلة تدريجياً؛ ومستحيل فيزيائياً أن يملأ جزيء واحد كافة المستقبِلات.",
              "en": "Simultaneous saturation misconception: Sigmoidal curves depict graded mass-action equilibria; individual molecules cannot bind all receptors at once."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "sigmoidal eğri",
          "arContext": "المنحنى السيني (sigmoidal curve)"
        },
        {
          "term": "infleksiyon noktası (EC50)",
          "arContext": "نقطة الانقلاب (EC50)"
        }
      ],
      "hints": [
        {
          "tr": "İlaç konsantrasyonlarının 0.001 nM'den 10,000 nM'ye kadar uzandığını düşünün.",
          "ar": "فكر في مجال تراكيز الأدوية الممتد من 0.001 nM إلى 10,000 nM.",
          "en": "Consider concentration ranges spanning from 0.001 nM up to 10,000 nM."
        },
        {
          "tr": "Lineer bir cetvelde 0.001 ile 10,000'i aynı anda okumak mümkün müdür?",
          "ar": "هل يمكن قراءة 0.001 و 10,000 بوضوح على مسطرة خطية واحدة؟",
          "en": "Can you distinguish 0.001 and 10,000 clearly on a single linear ruler?"
        },
        {
          "tr": "Logaritma skalası geniş aralıkları sıkıştırır; hiperbolü orta noktası EC50 olan simetrik S-eğrisine dönüştürür.",
          "ar": "يضغط المقياس اللوغاريتمي المجالات الشاسعة ليحول القطع الزائد إلى منحنى S متناظر مركزه EC50.",
          "en": "Log transformation compresses wide ranges, creating a symmetric S-curve centered at EC50."
        }
      ],
      "sources": [
        {
          "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf",
          "page": 34
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-4a",
            "text": "Logaritmik skala, çok geniş bir konsantrasyon aralığını (4-5 logaritma basamağı) tek bir grafik üzerinde simetrik ve ölçülebilir hale getirir.",
            "isCorrect": true,
            "misconceptionFeedback": "Mükemmel! Lineer grafikte düşük dozlar sıfıra sıkışırken yüksek dozlar sonsuza uzanır. Logaritmik dönüşüm, EC50 noktasını eğrinin simetrik büküm noktası (inflection point) haline getirir (Slayt 34)."
          },
          {
            "id": "opt-4b",
            "text": "Logaritma dönüşümü ilacın kovalent bağ kurmasını sağlayarak yanıtı lineerleştirir.",
            "isCorrect": false,
            "misconceptionFeedback": "Fiziksel anlam yanılgısı: Logaritma ekseni sadece bir veri görselleştirme aracıdır; ilacın kimyasal bağ yapısını veya kovalent doğasını asla etkileyemez."
          },
          {
            "id": "opt-4c",
            "text": "Sigmoidal dönüşüm reseptörlerin tamamının aynı anda tek bir molekülle doymasını zorunlu kılar.",
            "isCorrect": false,
            "misconceptionFeedback": "Doygunluk yanılgısı: Sigmoidal eğri Hill-Langmuir kütle hareketi dengesini simetrik olarak gösterir; tek bir molekülle tüm reseptörlerin doyması fizikokimyasal olarak imkansızdır."
          }
        ],
        "revealedOutcome": {
          "tr": "Logaritma skalası konsantrasyonu log[D] olarak dönüştürerek hiperbolik eğriyi simetrik sigmoidal S-eğrisine çevirir. EC50 noktası büküm noktasında kolayca okunur.",
          "ar": "يحول المقياس اللوغاريتمي التركيز إلى log[D] ليتحول المنحنى إلى شكل S متناظر؛ وتُقرأ قيمة EC50 بسهولة عند نقطة الانقلاب.",
          "en": "Log-transforming concentration into log[D] converts hyperbolas into sigmoidal S-curves, allowing straightforward EC50 readout at the inflection point."
        },
        "explanation": {
          "tr": "Hill-Langmuir denklemi lineer eksende asimptotik hiperbol verirken, log eksende lojistik fonksiyona dönüşür. Bu durum farmakolojide agonistlerin güçlerini (EC50) ve maksimum yanıtlarını (Emax) kıyaslamanın standart yoludur (Slayt 34).",
          "ar": "تتحول معادلة هيل-لانغموير إلى دالة لوجستية سينيّة على المحور اللوغاريتمي، مما يوفر الطريقة المعيارية للمقارنة بين فاعلية الأدوية (EC50) وأقصى استجابة (Emax) (شريحة 34).",
          "en": "Hill-Langmuir kinetics transform into a symmetrical logistic function on log axes, providing the pharmacology standard for comparing EC50 potency and Emax efficacy."
        }
      }
    },
    {
      "id": "pharm-mod1-les2-step-05",
      "stage": "interactive_artifact",
      "stageIndex": 5,
      "type": "dose_response_curve",
      "widgetType": "DoseResponseCurve",
      "title": {
        "tr": "İnteraktif Laboratuvar: Doz-Yanıt Dinamikleri",
        "ar": "مختبر تفاعلي: ديناميكا الجرعة والاستجابة",
        "en": "Interactive Lab: Dose-Response Dynamics"
      },
      "prompt": {
        "tr": "İnteraktif Doz-Yanıt laboratuvarında Agonist, Parsiyel Agonist ve Kompetitif Antagonist modlarını test ederek EC50 kaymasını ve Emax tavanını inceleyin.",
        "ar": "في مختبر الجرعة والاستجابة التفاعلي، اختبر أنماط المنبه والمنبه الجزئي والمضاد التنافسي لملاحظة إزاحة EC50 وتغير سقف الاستجابة Emax.",
        "en": "In the interactive Dose-Response lab, toggle Agonist, Partial Agonist, and Competitive Antagonist modes to inspect EC50 shifts and Emax ceilings."
      },
      "predictThenReveal": false,
      "config": {
        "title": "Farmakolojik Doz-Yanıt ve Reseptör Doluluk Simülatörü",
        "prompt": "Agonist, parsiyel agonist ve antagonist modlarını karşılaştırarak eğrilerin kaymasını inceleyin.",
        "defaultEc50": 10,
        "defaultEmax": 100,
        "defaultHillSlope": 1,
        "modes": [
          "agonist",
          "partial_agonist",
          "competitive_antagonist",
          "noncompetitive_antagonist"
        ],
        "source": {
          "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf",
          "page": 34
        },
        "explanation": "Tam agonist Emax=%100 üretir. Parsiyel agonist (örn. buprenorfin) reseptörü %100 doldursa dahi submaksimal etki (Emax=%35) verir. Kompetitif antagonist eğriyi paralel sağa kaydırırken, nonkompetitif antagonist Emax tavanını ezer."
      },
      "widget": {
        "type": "DoseResponseCurve",
        "config": {
          "title": "Farmakolojik Doz-Yanıt ve Reseptör Doluluk Simülatörü",
          "prompt": "Agonist, parsiyel agonist ve antagonist modlarını karşılaştırarak eğrilerin kaymasını inceleyin.",
          "defaultEc50": 10,
          "defaultEmax": 100,
          "defaultHillSlope": 1,
          "modes": [
            "agonist",
            "partial_agonist",
            "competitive_antagonist",
            "noncompetitive_antagonist"
          ],
          "source": {
            "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf",
            "page": 34
          },
          "explanation": "Tam agonist Emax=%100 üretir. Parsiyel agonist (örn. buprenorfin) reseptörü %100 doldursa dahi submaksimal etki (Emax=%35) verir. Kompetitif antagonist eğriyi paralel sağa kaydırırken, nonkompetitif antagonist Emax tavanını ezer."
        }
      },
      "technicalTerms": [
        {
          "term": "Emax (maksimum etki)",
          "arContext": "أقصى استجابة حيوية (Emax)"
        },
        {
          "term": "EC50 (yarı maksimal konsantrasyon)",
          "arContext": "التركيز الفعال النصفي (EC50)"
        }
      ],
      "hints": [
        {
          "tr": "Kompetitif antagonist moduna geçin: Emax değişmeden eğrinin nasıl sağa ötelendiğini görün.",
          "ar": "انتقل إلى نمط المضاد التنافسي: لاحظ كيف ينزاح المنحنى يميناً دون انخفاض Emax.",
          "en": "Switch to competitive antagonist mode: observe the parallel rightward shift with preserved Emax."
        },
        {
          "tr": "Parsiyel agonist modunda tavanın (Emax) düşmesine dikkat edin: Ne kadar doz verirseniz verin %100'e ulaşamaz.",
          "ar": "انتبه لهبوط سقف الاستجابة في نمط المنبه الجزئي: مهما رفعت الجرعة لن تبلغ 100%.",
          "en": "Notice the depressed Emax ceiling in partial agonist mode: no dose escalation reaches 100%."
        },
        {
          "tr": "Kompetitif antagonist sağa kaydırır (surmountable); nonkompetitif ise Emax'ı aşağı çeker (insurmountable).",
          "ar": "المضاد التنافسي يزيح لليمين؛ بينما غير التنافسي يهبط بسقف Emax قسراً.",
          "en": "Competitive blockers cause surmountable right shifts; noncompetitive blockers depress Emax."
        }
      ],
      "sources": [
        {
          "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf",
          "page": 34
        }
      ]
    },
    {
      "id": "pharm-mod1-les2-step-06",
      "stage": "guided_discovery",
      "stageIndex": 6,
      "type": "guided_discovery",
      "title": {
        "tr": "Kritik Ayrım: Afinite ve İntrinsik Aktivite (Ariëns)",
        "ar": "التمييز الحاسم: الألفة والفاعلية الذاتية (Ariëns)",
        "en": "Critical Distinction: Affinity vs Intrinsic Activity (Ariëns)"
      },
      "prompt": {
        "tr": "Stephenson ve Ariëns'e göre bir ilacın reseptörüne çok sıkı bağlanması (yüksek afinite), hücrede mutlaka maksimum bir biyolojik yanıt oluşturacağını garanti eder mi?",
        "ar": "وفقاً لـ Stephenson و Ariëns، هل يضمن الارتباط الشديد للمركب بمستقبله (الألفة العالية) حتماً إحداث أقصى استجابة حيوية في الخلية؟",
        "en": "According to Stephenson and Ariëns, does tight receptor binding (high affinity) guarantee maximal biological response in the target cell?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-6a",
            "text": {
              "tr": "Hayır; afinite sadece bağlanma gücünü (Kd) belirler, oysa yanıt oluşturabilmek için ilacın intrinsik aktiviteye (alfa / efikasite) sahip olması gerekir.",
              "ar": "كلا؛ تحدد الألفة قوة الارتباط فقط (Kd)، بينما يتطلب إحداث الاستجابة امتلاك الدواء فاعلية ذاتية (alfa / efficacy).",
              "en": "No; affinity solely governs binding occupancy (Kd), whereas biological activation strictly requires intrinsic activity (alpha / efficacy)."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Doğru! Ariëns (1954) afinite ile intrinsik aktiviteyi (alfa) ayırmıştır. Bir antagonist (örn. nalokson) pikomolar afiniteyle bağlanabilir ama alfa = 0 olduğu için sıfır sinyal üretir (Slayt 34).",
              "ar": "صحيح! فصل Ariëns عام 1954 بين الألفة والفاعلية الذاتية (alfa). يرتبط المضاد (كالنالوكسون) بألفة بيكومولية فائقة لكنه ينتج صفراً من الإشارة لأن alfa = 0.",
              "en": "Correct! Ariëns (1954) bifurcated affinity from intrinsic activity (alpha). Antagonists bind with picomolar tenacity yet yield zero activation (alpha = 0)."
            }
          },
          {
            "id": "opt-6b",
            "text": {
              "tr": "Evet; Clark teorisine göre işgal edilen her reseptör istisnasız %100 tam biyolojik sinyal üretmek zorundadır.",
              "ar": "نعم؛ وفق نظرية كلارك يُلزم كل مستقبل مشغول بإنتاج 100% من الإشارة الحيوية الكاملة دون استثناء.",
              "en": "Yes; according to Clark's theory, every occupied receptor is strictly required to generate a 100% maximal biological stimulus."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Klasik teori yanılgısı: Clark'ın işgal teorisi (1926) antagonistlerin varlığını açıklayamadığı için terk edilmiştir; Ariëns ve Stephenson intrinsik aktivite kavramını getirmiştir.",
              "ar": "خطأ النظرية الكلاسيكية: عجزت نظرية كلارك (1926) عن تفسير عمل المضادات فتم تعديلها؛ وأدخل Ariëns مفهوم الفاعلية الذاتية.",
              "en": "Clark theory limitation: Clark's 1926 model could not explain antagonists or partial agonists; Ariëns and Stephenson revised it."
            }
          },
          {
            "id": "opt-6c",
            "text": {
              "tr": "Evet; yüksek afiniteli moleküller kovalent bağ kurarak reseptörü daima tam güçle aktive eder.",
              "ar": "نعم؛ لأن الجزيئات عالية الألفة تؤسس روابط تساهمية تشغل المستقبل بالطاقة القصوى دوماً.",
              "en": "Yes; high-affinity ligands form covalent bonds that always drive maximum receptor activation."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Afinite-kovalent karışıklığı: Yüksek afinite kovalent bağ demek değildir; reversible non-kovalent bağlarla da pikomolar afinite sağlanabilir ve bu aktivasyonu garanti etmez.",
              "ar": "خلط الألفة بالتساهمية: لا تعني الألفة العالية روابط تساهمية؛ بل يمكن تحقيقها بروابط عكوسة، ولا علاقة لها بحجم التنشيط الخلوي.",
              "en": "Covalent confusion: Picomolar affinity is achievable via reversible contacts and implies nothing about intrinsic activation."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "intrinsik aktivite (alfa)",
          "arContext": "الفاعلية الذاتية (intrinsic activity)"
        },
        {
          "term": "efikasite",
          "arContext": "الفعالية القصوى (efficacy)"
        }
      ],
      "hints": [
        {
          "tr": "Bir anahtarın kilide girmesi (afinite) ile kilidi çevirebilmesi (efikasite) arasındaki farkı hayal edin.",
          "ar": "تخيل الفارق بين دخول المفتاح في القفل (الألفة) وقدرته على إدارة القفل لفتحه (الفاعلية).",
          "en": "Envision the difference between a key fitting into a lock (affinity) and turning the cylinder (efficacy)."
        },
        {
          "tr": "Kusursuz oturan ama dönmeyen sahte bir anahtar kilidi kilitler: Bu bir antagonisttir.",
          "ar": "المفتاح الذي يطابق القفل تماماً لكنه لا يدور يعطل الباب: هذا هو المضاد التنافسي.",
          "en": "A key that fits perfectly but cannot turn jams the deadbolt: this is an antagonist."
        },
        {
          "tr": "Afinite bağlanmayı belirler; reseptörü konformasyonel olarak aktive edip yanıt doğurmak ise intrinsik aktivite (alfa) gerektirir.",
          "ar": "الألفة تضمن الالتصاق؛ وتشغيل المستقبل يتطلب فاعلية ذاتية مستقلة (alfa).",
          "en": "Affinity governs docking; conformational activation requires independent intrinsic activity (alpha)."
        }
      ],
      "sources": [
        {
          "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf",
          "page": 34
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-6a",
            "text": "Hayır; afinite sadece bağlanma gücünü (Kd) belirler, oysa yanıt oluşturabilmek için ilacın intrinsik aktiviteye (alfa / efikasite) sahip olması gerekir.",
            "isCorrect": true,
            "misconceptionFeedback": "Doğru! Ariëns (1954) afinite ile intrinsik aktiviteyi (alfa) ayırmıştır. Bir antagonist (örn. nalokson) pikomolar afiniteyle bağlanabilir ama alfa = 0 olduğu için sıfır sinyal üretir (Slayt 34)."
          },
          {
            "id": "opt-6b",
            "text": "Evet; Clark teorisine göre işgal edilen her reseptör istisnasız %100 tam biyolojik sinyal üretmek zorundadır.",
            "isCorrect": false,
            "misconceptionFeedback": "Klasik teori yanılgısı: Clark'ın işgal teorisi (1926) antagonistlerin varlığını açıklayamadığı için terk edilmiştir; Ariëns ve Stephenson intrinsik aktivite kavramını getirmiştir."
          },
          {
            "id": "opt-6c",
            "text": "Evet; yüksek afiniteli moleküller kovalent bağ kurarak reseptörü daima tam güçle aktive eder.",
            "isCorrect": false,
            "misconceptionFeedback": "Afinite-kovalent karışıklığı: Yüksek afinite kovalent bağ demek değildir; reversible non-kovalent bağlarla da pikomolar afinite sağlanabilir ve bu aktivasyonu garanti etmez."
          }
        ],
        "revealedOutcome": {
          "tr": "Afinite (Kd) ile Efikasite (alfa) iki bağımsız parametredir. Antagonistlerin afinitesi çok yüksek olabilir (alfa = 0); parsiyel agonistler submaksimal etki üretir (0 < alfa < 1).",
          "ar": "الألفة (Kd) والفاعلية الذاتية (alfa) عاملان مستقلان؛ يملك المضاد ألفة عالية مع alfa = 0، والمنبه الجزئي يملك 0 < alfa < 1.",
          "en": "Affinity (Kd) and Intrinsic Efficacy (alpha) are orthogonal parameters. Antagonists possess high affinity with alpha = 0; partial agonists yield 0 < alpha < 1."
        },
        "explanation": {
          "tr": "Ariëns teorisi farmakolojik yanıtı E / Emax = alfa * [DR] / [Rtotal] olarak formüle eder. Tam agonistte alfa = 1, parsiyel agonistte 0 < alfa < 1, kompetitif antagonistte ise alfa = 0'dır (Slayt 34).",
          "ar": "صاغ Ariëns الاستجابة بالمعادلة: E / Emax = alfa * [DR] / [Rtotal]. للمنبه الكامل alfa = 1، وللمنبه الجزئي 0 < alfa < 1، وللمضاد alfa = 0 (شريحة 34).",
          "en": "Ariëns formalized response as E / Emax = alpha * [DR] / [Rtotal]. Full agonists exhibit alpha = 1, partial agonists 0 < alpha < 1, and antagonists alpha = 0."
        }
      }
    },
    {
      "id": "pharm-mod1-les2-step-07",
      "stage": "formal_explanation",
      "stageIndex": 7,
      "type": "formal_explanation",
      "title": {
        "tr": "Furchgott Teorisi: Yedek Reseptörler (Receptor Reserve)",
        "ar": "نظرية Furchgott: المستقبِلات الاحتياطية وفائض الحساسية",
        "en": "Furchgott Theory: Spare Receptors & Receptor Reserve"
      },
      "prompt": {
        "tr": "Furchgott'un Yedek Reseptör (Receptor Reserve) Teorisine göre, kalp kasında adrenalinin maksimum kasılma yanıtı (Emax) oluşturması için reseptörlerin ne kadarı işgal edilmelidir?",
        "ar": "وفق نظرية المستقبِلات الاحتياطية لـ Furchgott، كم تبلغ نسبة إشغال المستقبِلات اللازمة لإحداث أقصى استجابة تقلصية قلبية (Emax) بالأدرينالين؟",
        "en": "According to Furchgott's Spare Receptor Theory, what fraction of myocardial beta-1 receptors must be occupied by adrenaline to elicit Emax?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-7a",
            "text": {
              "tr": "Reseptörlerin yalnızca %1-5'inin işgal edilmesi tam maksimum kasılma cevabını (Emax) tetiklemek için yeterlidir; geriye kalan %95 yedek rezervdir.",
              "ar": "يكفي إشغال 1-5% فقط من المستقبِلات لإطلاق أقصى تقلص قلبي (Emax)؛ والـ 95% الباقية تمثل احتياطياً وظيفياً.",
              "en": "Occupying merely 1-5% of receptors suffices to elicit Emax; the remaining 95% constitute a functional spare receptor reserve."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Tebrikler! Slayt 34'te belirtildiği gibi dokularda hücresel sinyal amplifikasyonu (G-proteini, adenilat siklaz, cAMP kaskadı) sayesinde maksimum etki için havuzun sadece %1-5'inin uyarılması yeterlidir.",
              "ar": "أحسنت! بفضل التضخيم الخلوي للإشارة (بروتينات G، شلال cAMP)، يكفي تنبيه 1-5% من المستقبِلات لبلوغ الاستجابة القصوى (شريحة 34).",
              "en": "Bravo! Intracellular signal cascades (Gs -> adenylate cyclase -> cAMP) amplify signaling so that 1-5% occupancy drives 100% tissue response."
            }
          },
          {
            "id": "opt-7b",
            "text": {
              "tr": "Dokudaki reseptör havuzunun tam olarak %100'ünün agonist ile kilitlenmesi şarttır.",
              "ar": "يُشترط قفل 100% تماماً من حوض المستقبِلات بالمنبه للوصول للاستجابة القصوى.",
              "en": "Exactly 100% of the receptor pool must be saturated with agonist to achieve maximum response."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "İşgal teorisi yanılgısı: Bu varsayım Clark'ın 1926 modeline aittir; Furchgott yedek reseptörlerin varlığını kanıtlayarak %100 işgal gerekmediğini göstermiştir.",
              "ar": "خطأ نظرية الإشغال: ينتمي هذا الافتراض لنموذج كلارك القديم؛ وأثبت Furchgott تجريبياً عدم الحاجة لإشغال 100%.",
              "en": "Clark assumption error: Furchgott disproved the requirement for 100% occupancy by demonstrating spare receptor reserves."
            }
          },
          {
            "id": "opt-7c",
            "text": {
              "tr": "Emax cevabı için reseptörlerin en az %50'sinin (Kd kadar) işgal edilmesi zorunludur.",
              "ar": "يتطلب Emax إشغال ما لا يقل عن 50% من المستقبِلات (بما يعادل تركيز Kd).",
              "en": "Achieving Emax strictly mandates occupying at least 50% of targets (equivalent to Kd)."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "EC50 ve Kd karışıklığı: Yedek reseptör olan dokularda EC50 << Kd'dir. Yani yarı maksimal yanıt (%50 etki) %1'den bile az dolulukta elde edilebilir (Slayt 34).",
              "ar": "خلط EC50 بـ Kd: بوجود احتياطي وظيفي تكون EC50 أصغر بكثير من Kd؛ ويتحقق نصف التأثير بإشغال أقل من 1%.",
              "en": "EC50 vs Kd confusion: In spare receptor tissues, EC50 << Kd. A 50% response occurs at <1% receptor occupancy."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "yedek reseptör (spare receptor)",
          "arContext": "المستقبِل الاحتياطي (spare receptor)"
        },
        {
          "term": "sinyal amplifikasyonu",
          "arContext": "تضخيم الإشارة الخلوية"
        }
      ],
      "hints": [
        {
          "tr": "Kalp kasındaki adrenerjik sinyal iletimindeki kaskad çarpanını düşünün (tek bir reseptör binlerce cAMP üretir).",
          "ar": "فكر في معامل التضخيم المتسلسل في القلب (مستقبل مفرد يولد آلاف جزيئات cAMP).",
          "en": "Consider intracellular cascade multipliers in myocardium (one receptor activates thousands of cAMPs)."
        },
        {
          "tr": "Maksimum kasılma gücüne ulaşmak için tüm reseptörleri doldurmak gerekir mi?",
          "ar": "هل يلزم ملء كافة المستقبِلات للوصول إلى أقصى قوة انقباضية؟",
          "en": "Is full target occupancy required to exhaust the contractile machinery?"
        },
        {
          "tr": "Sadece %1-5 reseptör doluluğu Emax oluşturur; kalan %95 reseptör dokunun duyarlılığını artıran yedek rezervdir.",
          "ar": "إشغال 1-5% فقط يحقق Emax، والـ 95% الباقية هي احتياطي يضمن حساسية الخلية وسرعة استجابتها.",
          "en": "Only 1-5% occupancy yields Emax; remaining 95% are spare receptors ensuring high tissue sensitivity."
        }
      ],
      "sources": [
        {
          "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf",
          "page": 34
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-7a",
            "text": "Reseptörlerin yalnızca %1-5'inin işgal edilmesi tam maksimum kasılma cevabını (Emax) tetiklemek için yeterlidir; geriye kalan %95 yedek rezervdir.",
            "isCorrect": true,
            "misconceptionFeedback": "Tebrikler! Slayt 34'te belirtildiği gibi dokularda hücresel sinyal amplifikasyonu (G-proteini, adenilat siklaz, cAMP kaskadı) sayesinde maksimum etki için havuzun sadece %1-5'inin uyarılması yeterlidir."
          },
          {
            "id": "opt-7b",
            "text": "Dokudaki reseptör havuzunun tam olarak %100'ünün agonist ile kilitlenmesi şarttır.",
            "isCorrect": false,
            "misconceptionFeedback": "İşgal teorisi yanılgısı: Bu varsayım Clark'ın 1926 modeline aittir; Furchgott yedek reseptörlerin varlığını kanıtlayarak %100 işgal gerekmediğini göstermiştir."
          },
          {
            "id": "opt-7c",
            "text": "Emax cevabı için reseptörlerin en az %50'sinin (Kd kadar) işgal edilmesi zorunludur.",
            "isCorrect": false,
            "misconceptionFeedback": "EC50 ve Kd karışıklığı: Yedek reseptör olan dokularda EC50 << Kd'dir. Yani yarı maksimal yanıt (%50 etki) %1'den bile az dolulukta elde edilebilir (Slayt 34)."
          }
        ],
        "revealedOutcome": {
          "tr": "Furchgott teorisi: Miyokardda maksimum yanıt (Emax) için beta-1 reseptörlerinin %1-5'inin işgali yeterlidir. Geri kalan %95 yedek reseptör rezervidir.",
          "ar": "نظرية Furchgott: يكفي إشغال 1-5% من مستقبلات بيتا-1 لتحقيق أقصى استجابة قلبية، والـ 95% الباقية هي احتياطي وظيفي.",
          "en": "Furchgott Theory: 1-5% occupancy of myocardial beta-1 receptors produces Emax; the remaining 95% represent receptor reserve."
        },
        "explanation": {
          "tr": "Yedek reseptör varlığında agonist doz-yanıt eğrisi reseptör bağlama eğrisinin soluna kayar (EC50 < Kd). Bu biyolojik mekanizma dokunun düşük hormon/ilaç derişimlerine bile maksimum yanıt verebilmesini sağlar (Slayt 34).",
          "ar": "بوجود مستقبِلات احتياطية، ينزاح منحنى الاستجابة إلى يسار منحنى الارتباط (EC50 < Kd)، مما يمنح النسيج حساسية فائقة للهرمونات والأدوية (شريحة 34).",
          "en": "Spare receptors shift the functional response curve to the left of the binding curve (EC50 < Kd), conferring exquisite tissue sensitivity."
        }
      }
    },
    {
      "id": "pharm-mod1-les2-step-08",
      "stage": "concept_check",
      "stageIndex": 8,
      "type": "concept_check",
      "title": {
        "tr": "Kavram Kontrolü: Rezidans Süresi ve Ayrışma Kinetiği",
        "ar": "تحقق المفهوم: زمن المكوث وحركية التفكك",
        "en": "Concept Check: Residence Time & Dissociation Kinetics"
      },
      "prompt": {
        "tr": "Bir ilacın ayrışma hız sabiti (koff) saniyede 0.001 s^-1 ise, bu ilacın reseptör üzerindeki ortalama kalış süresi (rezidans süresi, tau = 1/koff) ne kadardır?",
        "ar": "إذا كان ثابت سرعة تفكك دواء (koff) يساوي 0.001 s^-1، فكم يبلغ متوسط زمن مكوثه على المستقبل (tau = 1/koff)؟",
        "en": "If a drug's dissociation rate constant (koff) is 0.001 s^-1, what is the mean drug-target residence time (tau = 1/koff)?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-8a",
            "text": {
              "tr": "1000 saniye (yaklaşık 16.6 dakika); yavaş ayrışma oranı uzun bir rezidans süresi ve sustained farmakolojik etki sağlar.",
              "ar": "1000 ثانية (قرابة 16.6 دقيقة)؛ يوفر معدل التفكك البطيء زمن مكوث مديد وتأثيراً دوائياً مستداماً.",
              "en": "1000 seconds (~16.6 minutes); a slow off-rate confers long residence time and sustained target coverage."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kusursuz hesaplama! Rezidans süresi tau = 1 / koff formülüyle hesaplanır: 1 / 0.001 s^-1 = 1000 saniye. Plazma konsantrasyonu düşse bile ilaç reseptörde kalarak etkiyi sürdürür (Slayt 34).",
              "ar": "حساب دقيق! يحسب زمن المكوث بالمعادلة: tau = 1 / koff = 1000 ثانية. يستمر التأثير حتى لو انخفض تركيز الدواء في البلازما.",
              "en": "Flawless computation! Residence time tau = 1/koff = 1000 seconds. Target inhibition persists even after plasma drug washout."
            }
          },
          {
            "id": "opt-8b",
            "text": {
              "tr": "0.001 saniye (1 milisaniye); molekül reseptörden anında fırlar.",
              "ar": "0.001 ثانية (1 ميلي ثانية)؛ ينفلت الجزيء من المستقبل على الفور.",
              "en": "0.001 seconds (1 millisecond); the ligand instantly dissociates from the binding pocket."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Formül tersliği yanılgısı: Rezidans süresi koff'un kendisi değil, çarpmaya göre tersidir (tau = 1 / koff). 0.001 s^-1 ayrışma hızı çok yavaş bir ayrılmayı gösterir.",
              "ar": "خطأ مقلوب القانون: زمن المكوث هو مقلوب koff وليس قيمته المجردة؛ فمعدل 0.001 يعني تفككاً بطيئاً جداً.",
              "en": "Reciprocal error: Residence time is the reciprocal of off-rate (tau = 1/koff), representing a long 1000-second occupancy."
            }
          },
          {
            "id": "opt-8c",
            "text": {
              "tr": "1 saniye; tüm non-kovalent ilaçlar reseptörde tam olarak 1 saniye bağlı kalır.",
              "ar": "ثانية واحدة؛ تبقى كافة الأدوية غير التساهمية مرتبطة لمدة ثانية واحدة بالضبط.",
              "en": "1 second; all non-covalent therapeutic drugs reside on receptors for exactly one second."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Sabit süre yanılgısı: Rezidans süresi kimyasal bağ enerjisine göre milisaniyelerden günlere kadar değişir; sabit bir süre yoktur.",
              "ar": "خطأ الزمن الثابت: يتباين زمن المكوث من أجزاء الثانية إلى أيام بحسب طاقة الروابط؛ ولا يوجد زمن ثابت.",
              "en": "Fixed duration fallacy: Target residence times vary from milliseconds to hours depending on bond networks."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "rezidans süresi (tau)",
          "arContext": "زمن المكوث (residence time)"
        },
        {
          "term": "ayrışma kinetiği (koff)",
          "arContext": "حركية التفكك (koff)"
        }
      ],
      "hints": [
        {
          "tr": "Rezidans süresi formülünü hatırlayın: tau = 1 / koff.",
          "ar": "تذكر معادلة زمن المكوث: tau = 1 / koff.",
          "en": "Recall the target residence time equation: tau = 1 / koff."
        },
        {
          "tr": "1 sayısını 0.001'e bölün: 1 / 10^-3 = ?",
          "ar": "اقسم الرقم 1 على 0.001: 1 / (1/1000) = ؟",
          "en": "Divide 1 by 0.001: 1 / 10^-3 = ?"
        },
        {
          "tr": "Sonuç 1000 saniyedir (yaklaşık 16.6 dakika).",
          "ar": "النتيجة هي 1000 ثانية (ما يقارب 16.6 دقيقة).",
          "en": "The calculation yields 1000 seconds (~16.6 minutes)."
        }
      ],
      "sources": [
        {
          "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf",
          "page": 34
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-8a",
            "text": "1000 saniye (yaklaşık 16.6 dakika); yavaş ayrışma oranı uzun bir rezidans süresi ve sustained farmakolojik etki sağlar.",
            "isCorrect": true,
            "misconceptionFeedback": "Kusursuz hesaplama! Rezidans süresi tau = 1 / koff formülüyle hesaplanır: 1 / 0.001 s^-1 = 1000 saniye. Plazma konsantrasyonu düşse bile ilaç reseptörde kalarak etkiyi sürdürür (Slayt 34)."
          },
          {
            "id": "opt-8b",
            "text": "0.001 saniye (1 milisaniye); molekül reseptörden anında fırlar.",
            "isCorrect": false,
            "misconceptionFeedback": "Formül tersliği yanılgısı: Rezidans süresi koff'un kendisi değil, çarpmaya göre tersidir (tau = 1 / koff). 0.001 s^-1 ayrışma hızı çok yavaş bir ayrılmayı gösterir."
          },
          {
            "id": "opt-8c",
            "text": "1 saniye; tüm non-kovalent ilaçlar reseptörde tam olarak 1 saniye bağlı kalır.",
            "isCorrect": false,
            "misconceptionFeedback": "Sabit süre yanılgısı: Rezidans süresi kimyasal bağ enerjisine göre milisaniyelerden günlere kadar değişir; sabit bir süre yoktur."
          }
        ],
        "revealedOutcome": {
          "tr": "Rezidans süresi tau = 1 / koff = 1 / 0.001 s^-1 = 1000 saniyedir (~16.6 dakika). Yavaş koff katsayısı ilacın hedefte uzun süre kalarak etki göstermesini sağlar.",
          "ar": "زمن المكوث tau = 1 / koff = 1000 ثانية (~16.6 دقيقة). يتيح معدل التفكك البطيء بقاء الدواء على الهدف واستمرار فاعليته.",
          "en": "Residence time tau = 1/koff = 1000 seconds (~16.6 minutes). Slow off-rates prolong target engagement independent of plasma half-life."
        },
        "explanation": {
          "tr": "Modern ilaç keşfinde rezidans süresi (tau) afinite kadar kritik bir parametredir. Yavaş ayrışan ilaçlar (düşük koff), plazma yarı ömrü kısa olsa dahi reseptör üzerinde uzun süre kalarak günde tek doz kullanım konforu sağlar (Slayt 34).",
          "ar": "في علم الأدوية الحديث، يعتبر زمن المكوث (tau) معياراً حيوياً كالألفة؛ فالأدوية بطيئة التفكك تدوم فاعليتها على المستقبل طويلاً حتى بعد زوالها من البلازما (شريحة 34).",
          "en": "Modern drug discovery emphasizes residence time (tau = 1/koff). Drugs with slow off-rates sustain pharmacodynamic efficacy long after plasma clearance."
        }
      }
    },
    {
      "id": "pharm-mod1-les2-step-09",
      "stage": "application",
      "stageIndex": 9,
      "type": "clinical_vignette",
      "title": {
        "tr": "Klinik Protokol: Buprenorfin İndüksiyonu ve COWS Skoru",
        "ar": "بروتوكول سريري: بدء علاج البوبرينورفين ومقياس COWS",
        "en": "Clinical Protocol: Buprenorphine Induction & COWS Score"
      },
      "prompt": {
        "tr": "Metadon idamesindeki bir hastaya yoksunluk krizini tetiklemeden buprenorfin başlanmak isteniyor. Klinik farmakolojiye göre buprenorfin uygulaması ne zaman başlatılmalıdır?",
        "ar": "لمريض خاضع لعلاج الميثادون، يراد البدء بالبوبرينورفين دون تحفيز متلازمة انسحاب مفاجئة. متى يجب إعطاء الجرعة سريرياً؟",
        "en": "In a patient maintained on methadone, how should buprenorphine induction be timed to avoid precipitating acute opioid withdrawal?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-9a",
            "text": {
              "tr": "Hastada orta derecede objektif morfin/metadon yoksunluk belirtileri (COWS skoru > 12) başlayıp reseptör doluluğu doğal olarak düştükten sonra.",
              "ar": "بعد بدء ظهور أعراض انسحاب موضوعية معتدلة (مقياس COWS > 12) وهبوط إشغال المستقبِلات طبيعياً.",
              "en": "Only after objective opioid withdrawal appears (COWS score > 12), ensuring mu-receptor occupancy has naturally cleared."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Hayati bir klinik kural! Buprenorfin ancak reseptör havuzundaki tam agonist konsantrasyonu düşüp hasta hafif yoksunluğa girdiğinde verilir. Aksi halde morfini anında kovar ve feci bir kriz patlatır.",
              "ar": "قاعدة سريرية ذهبية! لا يُعطى البوبرينورفين إلا بعد تراجع إشغال المنبه الكامل وبدء الانسحاب؛ وإلا طرد المورفين مفجراً أزمة انسحابية عنيفة.",
              "en": "Vital clinical dogma! Buprenorphine must only be introduced when receptor occupancy has declined; giving it prematurely triggers severe precipitated withdrawal."
            }
          },
          {
            "id": "opt-9b",
            "text": {
              "tr": "Hasta son metadon dozunu alır almaz, tam kanda metadon konsantrasyonu en yüksek zirvedeyken (Cmax).",
              "ar": "فور تناول المريض آخر جرعة ميثادون، في ذروة تركيزه بالبلازما (Cmax).",
              "en": "Immediately following the last methadone dose, precisely at peak plasma concentration (Cmax)."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Ölümcül klinik hata: Cmax anında reseptörler %100 metadon ile doludur. Buprenorfin verilirse metadonu kovar ve net sinyali anında %35'e düşürerek en şiddetli krizi başlatır.",
              "ar": "خطأ سريري فادح: عند ذروة Cmax تكون المستقبِلات ممتلئة بالميثادون؛ إعطاء البوبرينورفين يطرده فوراً ويفجر نوبة انسحاب مروعة.",
              "en": "Catastrophic error: At Cmax, receptors are saturated with full agonist. Buprenorphine will displace it, precipitating acute withdrawal."
            }
          },
          {
            "id": "opt-9c",
            "text": {
              "tr": "Yüksek doz nalokson infüzyonuyla tüm reseptörler kovalent olarak yok edildikten 24 saat sonra.",
              "ar": "بعد مرور 24 ساعة على تدمير كافة المستقبِلات تساهمياً بجرعة عالية من النالوكسون.",
              "en": "24 hours after destroying all mu receptors covalently via high-dose intravenous naloxone."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Mekanizma saçmalığı: Nalokson kovalent değildir (reversibl kompetitif antagonisttir) ve elektif indüksiyonda böyle bir uygulama kontrendikedir.",
              "ar": "خطأ بيولوجي: النالوكسون مضاد عكوس وليس تساهمياً مدمراً؛ ومثل هذا الإجراء غير مقبول سريرياً.",
              "en": "Pharmacological absurdity: Naloxone is a reversible competitive antagonist, not a covalent receptor-destroying toxin."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "COWS skoru (Klinik Opioid Yoksunluk Skalası)",
          "arContext": "مقياس COWS للانسحاب الأفيوني السريري"
        },
        {
          "term": "buprenorfin indüksiyonu",
          "arContext": "بدء المعالجة بالبوبرينورفين"
        }
      ],
      "hints": [
        {
          "tr": "Buprenorfinin reseptördeki tam agonistleri (metadon/morfin) kovan yüksek afinitesini hatırlayın.",
          "ar": "تذكر ألفة البوبرينورفين الفائقة التي تطرد المنبهات الكاملة كالميثادون والمورفين.",
          "en": "Remember buprenorphine's fierce affinity displacing full agonists from mu receptors."
        },
        {
          "tr": "Eğer reseptörler hala metadon ile doluysa, buprenorfin verilince ne olur?",
          "ar": "إذا كانت المستقبِلات ما تزال ممتلئة بالميثادون، ماذا يحدث فور دخول البوبرينورفين؟",
          "en": "If receptors remain fully occupied by methadone, what happens when buprenorphine enters?"
        },
        {
          "tr": "Metadonun reseptörden doğal olarak ayrışması ve hastanın hafif yoksunluğa girmesi (COWS > 12) beklenmelidir.",
          "ar": "يجب انتظار انفصال الميثادون طبيعياً ودخول المريض في انسحاب خفيف (COWS > 12).",
          "en": "Wait until methadone dissociates and objective withdrawal develops (COWS > 12)."
        }
      ],
      "sources": [
        {
          "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf",
          "page": 34
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-9a",
            "text": "Hastada orta derecede objektif morfin/metadon yoksunluk belirtileri (COWS skoru > 12) başlayıp reseptör doluluğu doğal olarak düştükten sonra.",
            "isCorrect": true,
            "misconceptionFeedback": "Hayati bir klinik kural! Buprenorfin ancak reseptör havuzundaki tam agonist konsantrasyonu düşüp hasta hafif yoksunluğa girdiğinde verilir. Aksi halde morfini anında kovar ve feci bir kriz patlatır."
          },
          {
            "id": "opt-9b",
            "text": "Hasta son metadon dozunu alır almaz, tam kanda metadon konsantrasyonu en yüksek zirvedeyken (Cmax).",
            "isCorrect": false,
            "misconceptionFeedback": "Ölümcül klinik hata: Cmax anında reseptörler %100 metadon ile doludur. Buprenorfin verilirse metadonu kovar ve net sinyali anında %35'e düşürerek en şiddetli krizi başlatır."
          },
          {
            "id": "opt-9c",
            "text": "Yüksek doz nalokson infüzyonuyla tüm reseptörler kovalent olarak yok edildikten 24 saat sonra.",
            "isCorrect": false,
            "misconceptionFeedback": "Mekanizma saçmalığı: Nalokson kovalent değildir (reversibl kompetitif antagonisttir) ve elektif indüksiyonda böyle bir uygulama kontrendikedir."
          }
        ],
        "revealedOutcome": {
          "tr": "Buprenorfin indüksiyonu için altın kural: Hastanın hafif/orta yoksunlukta (COWS > 12) olması beklenir. Böylece reseptör doluluğu düşmüş olur ve buprenorfin agonist gibi davranarak hastayı rahatlatır.",
          "ar": "القاعدة الذهبية لبدء البوبرينورفين: انتظار دخول المريض في انسحاب معتدل (COWS > 12)؛ ليعمل البوبرينورفين كمنبه يريح المريض بدلاً من طرد الدواء السابق.",
          "en": "Golden induction rule: wait for mild-moderate withdrawal (COWS > 12). With low baseline occupancy, buprenorphine acts as an agonist, relieving symptoms."
        },
        "explanation": {
          "tr": "Hasta tam agonist etkisi altındayken parsiyel agonist verilirse antagonizma oluşur. Hasta yoksunluktayken verilirse parsiyel agonizm net stimülasyonu sıfırdan %35'e çıkararak tedavi edici olur (Slayt 34).",
          "ar": "إعطاء المنبه الجزئي بوجود منبه كامل يولد مناهضة (انسحاب حاد). أما إعطاؤه أثناء الانسحاب فيرفع التنبيه من الصفر إلى 35% فيحقق الشفاء (شريحة 34).",
          "en": "Administering a partial agonist during full agonism causes functional antagonism. Giving it during withdrawal elevates activation from 0 to 35%, providing therapeutic relief."
        }
      }
    },
    {
      "id": "pharm-mod1-les2-step-10",
      "stage": "retrieval",
      "stageIndex": 10,
      "type": "retrieval",
      "title": {
        "tr": "Geri Çağırma: Kompetitif Antagonizma Eğri Kayması",
        "ar": "استرجاع: إزاحة منحنى المناهضة التنافسية",
        "en": "Active Recall: Competitive Antagonist Surmountable Shift"
      },
      "prompt": {
        "tr": "Kompetitif bir antagonist (örn. nalokson) sisteme eklendiğinde, agonist doz-yanıt eğrisinde nasıl bir değişim gözlenir?",
        "ar": "عند إضافة مضاد تنافسي (مثل نالوكسون) إلى النظام، ما التغير الملاحظ على منحنى الجرعة والاستجابة للمنبه؟",
        "en": "When a competitive antagonist (e.g., naloxone) is introduced, what distinct shift occurs in the agonist dose-response curve?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-10a",
            "text": {
              "tr": "Eğri Emax yüksekliği değişmeksizin paralel olarak sağa kayar; artan agonist konsantrasyonu antagonisti tamamen yenebilir (surmountable).",
              "ar": "ينزاح المنحنى يميناً بشكل موازٍ دون أي هبوط في Emax؛ ويمكن للجرعات العالية من المنبه التغلب على المضاد كلياً.",
              "en": "The curve shifts in parallel to the right with unchanged Emax; higher agonist concentrations fully surmount antagonism."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Doğru! Kompetitif antagonist aynı bağlanma bölgesi için yarışır. Yeterince agonist verilirse antagonist reseptörden kovulur ve Emax korunur (surmountable antagonizma) (Slayt 34).",
              "ar": "صحيح! ينافس المضاد التنافسي على نفس الموقع؛ وبزيادة تركيز المنبه يُطرد المضاد ويبقى Emax ثابتاً (مناهضة يمكن التغلب عليها) (شريحة 34).",
              "en": "Correct! Competitive antagonists compete for the same pocket. Escalating agonist concentrations outcompete the blocker, fully restoring Emax."
            }
          },
          {
            "id": "opt-10b",
            "text": {
              "tr": "Emax tavanı yarıya iner fakat EC50 değeri sola kayar.",
              "ar": "يهبط سقف Emax إلى النصف بينما ينزاح EC50 إلى اليسار.",
              "en": "The Emax ceiling is halved while the EC50 value shifts to the left."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Nonkompetitif ayrımı yanılgısı: Emax'ı düşüren nonkompetitif veya geri dönüşümsüz antagonistlerdir. Kompetitif antagonist Emax tavanını asla düşürmez.",
              "ar": "خطأ التمييز عن غير التنافسي: انخفاض Emax خاص بالمضادات غير التنافسية أو التساهمية؛ أما التنافسي فيحافظ على Emax.",
              "en": "Noncompetitive confusion: Emax depression is the hallmark of noncompetitive or irreversible antagonism; competitive blockers preserve Emax."
            }
          },
          {
            "id": "opt-10c",
            "text": {
              "tr": "Eğri sola kayar çünkü antagonist agonistin afinitesini allosterik olarak 10 kat artırır.",
              "ar": "ينزاح المنحنى لليسار لأن المضاد يرفع ألفة المنبه بنحو عشرة أضعاف تباعدياً.",
              "en": "The curve shifts to the left because the antagonist allosterically enhances agonist affinity 10-fold."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Yön yanılgısı: Antagonist yarışarak agonistin görünür potansını düşürür ve eğriyi sağa iter (daha yüksek agonist konsantrasyonu gerekir); sola kaydırma agonist veya PAM özelliğidir.",
              "ar": "خطأ اتجاه الإزاحة: ينافس المضاد المنبه فيخفض فاعليته الظاهرية ويدفعه يميناً، بينما الإزاحة لليسار تخص المنبهات أو المعدلات الإيجابية.",
              "en": "Direction error: Antagonists demand higher agonist concentrations to achieve effects, shifting curves rightward, never leftward."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "kompetitif antagonizma",
          "arContext": "المناهضة التنافسية (competitive antagonism)"
        },
        {
          "term": "aşılabilir blokaj (surmountable)",
          "arContext": "حصار قابل للتغلب عليه"
        }
      ],
      "hints": [
        {
          "tr": "İki ligand aynı reseptör cebi için yarışıyor; birinin miktarını devasa artırırsanız ne olur?",
          "ar": "يتنافس ربيطان على نفس جيب المستقبل؛ ماذا يحدث لو ضاعفت تركيز أحدهما لدرجة هائلة؟",
          "en": "Two ligands compete for the same pocket; what happens if you massively increase agonist concentration?"
        },
        {
          "tr": "Yüksek agonist konsantrasyonu kompetitif antagonisti kovar ve maksimum cevaba yine ulaşılır.",
          "ar": "يطرد التركيز العالي من المنبه المضاد التنافسي، ويمكن الوصول للاستجابة القصوى مجدداً.",
          "en": "High agonist concentrations displace competitive blockers, fully restoring maximal response."
        },
        {
          "tr": "Emax değişmez, eğri paralel olarak sağa kayar (surmountable antagonizma).",
          "ar": "يبقى Emax ثابتاً، وينزاح المنحنى بشكل موازٍ إلى اليمين.",
          "en": "Emax remains unaltered while the curve shifts parallel to the right."
        }
      ],
      "sources": [
        {
          "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf",
          "page": 34
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-10a",
            "text": "Eğri Emax yüksekliği değişmeksizin paralel olarak sağa kayar; artan agonist konsantrasyonu antagonisti tamamen yenebilir (surmountable).",
            "isCorrect": true,
            "misconceptionFeedback": "Doğru! Kompetitif antagonist aynı bağlanma bölgesi için yarışır. Yeterince agonist verilirse antagonist reseptörden kovulur ve Emax korunur (surmountable antagonizma) (Slayt 34)."
          },
          {
            "id": "opt-10b",
            "text": "Emax tavanı yarıya iner fakat EC50 değeri sola kayar.",
            "isCorrect": false,
            "misconceptionFeedback": "Nonkompetitif ayrımı yanılgısı: Emax'ı düşüren nonkompetitif veya geri dönüşümsüz antagonistlerdir. Kompetitif antagonist Emax tavanını asla düşürmez."
          },
          {
            "id": "opt-10c",
            "text": "Eğri sola kayar çünkü antagonist agonistin afinitesini allosterik olarak 10 kat artırır.",
            "isCorrect": false,
            "misconceptionFeedback": "Yön yanılgısı: Antagonist yarışarak agonistin görünür potansını düşürür ve eğriyi sağa iter (daha yüksek agonist konsantrasyonu gerekir); sola kaydırma agonist veya PAM özelliğidir."
          }
        ],
        "revealedOutcome": {
          "tr": "Kompetitif antagonistler agonist eğrisini paralel sağa kaydırır (EC50 artar); ancak Emax korunur çünkü aşırı agonist antagonisti yener (surmountable).",
          "ar": "تزيح المضادات التنافسية منحنى المنبه يميناً بشكل موازٍ (يزداد EC50) مع بقاء Emax ثابتاً لإمكانية التغلب على الحصار بالجرعات العالية.",
          "en": "Competitive antagonists cause a parallel rightward shift in the agonist curve (increased EC50) without depressing Emax (surmountable antagonism)."
        },
        "explanation": {
          "tr": "Schild analizi prensiplerine göre kompetitif antagonizmada agonist ve antagonist aynı reseptör bölgesi için yarışır. Ortamdaki serbest agonist arttıkça fraksiyonel işgal agoniste döner ve maksimum yanıt korunur (Slayt 34).",
          "ar": "وفق تحليل Schild، يتنافس المنبه والمضاد على الموقع ذاته؛ وبرفع تركيز المنبه يتحول إشغال المستقبِلات لصالحه ويُستعاد Emax بالكامل (شريحة 34).",
          "en": "Per Schild analysis, competitive ligands vie for identical binding sites. Elevating agonist concentration outcompetes the antagonist, preserving Emax."
        }
      }
    },
    {
      "id": "pharm-mod1-les2-step-11",
      "stage": "connection",
      "stageIndex": 11,
      "type": "connection",
      "title": {
        "tr": "Kavramsal Köprü: Kovalent Blokaj ve Yedek Reseptör Tükenişi",
        "ar": "جسر المفاهيم: الحصار التساهمي ونفاد الاحتياطي الوظيفي",
        "en": "Conceptual Bridge: Covalent Blockade & Spare Receptor Depletion"
      },
      "prompt": {
        "tr": "Fenoksibenzamin gibi geri dönüşümsüz (kovalent) bir alfa bloker dokuya uygulandığında, yedek reseptör rezervi tükenene kadar agonist eğrisinde ne gözlenir?",
        "ar": "عند تطبيق حاصر ألفا تساهمي غير عكوس (فينوكسي بنزامين)، ماذا يطرأ على منحنى المنبه حتى يستنفد الاحتياطي الوظيفي تماماً؟",
        "en": "When an irreversible covalent blocker (phenoxybenzamine) is applied, what happens to the agonist curve before the spare receptor reserve is exhausted?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-11a",
            "text": {
              "tr": "Emax düşmez, eğri başlangıçta paralel sağa kayar; ancak tüm yedek reseptörler kovalent bloke olunca Emax çökmeye başlar.",
              "ar": "لا ينخفض Emax وينزاح المنحنى يميناً في البداية؛ لكن بمجرد نفاد الاحتياطي الوظيفي يبدأ سقف Emax بالانهيار.",
              "en": "Emax is initially preserved and the curve shifts rightward; only when the receptor reserve is fully exhausted does Emax collapse."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Harika bir köprü! Furchgott'un klasik deneyinde fenoksibenzamin kademeli olarak reseptörleri kovalent yok eder. Yedek reseptörler tükenene kadar kalan serbest reseptörler %100 yanıt verebilir; rezerv bitince Emax düşer (Slayt 34).",
              "ar": "ربط رائع للمفاهيم! في تجارب Furchgott يُعطل الفينوكسي بنزامين المستقبِلات تساهمياً؛ وطالما وُجد احتياطي يتحقق Emax، حتى ينفد الاحتياطي فيهبط السقف (شريحة 34).",
              "en": "Brilliant bridge! In Furchgott's experiments, phenoxybenzamine alkylates alpha receptors. Emax holds until the spare reserve is exhausted; only then does efficacy drop."
            }
          },
          {
            "id": "opt-11b",
            "text": {
              "tr": "İlk molekül bağlandığı anda Emax anında sıfırlanır ve agonist hiçbir kasılma oluşturamaz.",
              "ar": "فور ارتباط أول جزيء يهبط Emax للصفر مباشرة ويعجز المنبه عن إحداث أي استجابة.",
              "en": "Upon binding the first blocker molecule, Emax instantly drops to zero, abolishing all agonist contraction."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Rezerv yok sayma yanılgısı: Dokuda %90 yedek reseptör varsa, ilacın reseptörlerin %50'sini kovalent kitlemesi bile Emax'ı düşürmez; kalan %50 tam yanıt vermeye yeterlidir.",
              "ar": "خطأ إغفال الاحتياطي: بوجود 90% مستقبِلات احتياطية، فإن حجب 50% منها لن ينقص Emax لأن الـ 50% الباقية كافية للاستجابة القصوى.",
              "en": "Spare receptor denial: If a tissue has a 90% reserve, alkylating 50% of receptors leaves ample spare targets to still achieve 100% Emax."
            }
          },
          {
            "id": "opt-11c",
            "text": {
              "tr": "Eğri sola kayar çünkü kovalent blokaj diğer reseptörlerin afinitesini 100 kat artırır.",
              "ar": "ينزاح المنحنى لليسار لأن الحصار التساهمي يرفع ألفة باقي المستقبِلات بمئة ضعف.",
              "en": "The curve shifts leftward because covalent blockade allosterically boosts affinity of remaining targets 100-fold."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Afinite artışı yanılgısı: Kovalent blokaj kalan reseptörlerin afinitesini artırmaz; sadece toplam işlevsel reseptör havuzunu eksiltir.",
              "ar": "خطأ زيادة الألفة: لا يرفع الحصار التساهمي ألفة باقي المستقبِلات، بل ينقص العدد الكلي للمستقبِلات العاملة فقط.",
              "en": "Affinity fantasy: Irreversible alkylation decreases functional target numbers; it never augments receptor affinity."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "fenoksibenzamin",
          "arContext": "فينوكسي بنزامين"
        },
        {
          "term": "geri dönüşümsüz (non-surmountable) blokaj",
          "arContext": "حصار غير عكوس وغير قابل للتغلب عليه"
        }
      ],
      "hints": [
        {
          "tr": "Dokuda %95 yedek reseptör olduğunu ve kovalent blokerin reseptörlerin %50'sini öldürdüğünü varsayın.",
          "ar": "افترض وجود 95% مستقبِلات احتياطية، وقام الحاصر التساهمي بتعطيل 50% منها.",
          "en": "Assume a 95% receptor reserve and an irreversible blocker disabling 50% of total targets."
        },
        {
          "tr": "Geriye kalan %45'lik reseptör havuzu, tam etki için gereken %5'i karşılayabilir mi?",
          "ar": "هل يكفي الـ 45% المتبقي من المستقبِلات لتغطية الـ 5% اللازمة للاستجابة القصوى؟",
          "en": "Does the remaining 45% pool suffice to deliver the 5% needed for full Emax?"
        },
        {
          "tr": "Evet, karşılar! Emax korunur ve eğri sağa kayar; ancak blokaj rezervi aşınca Emax çöker.",
          "ar": "نعم تكفي وزيادة! يبقى Emax ثابتاً وينزاح المنحنى يميناً، حتى يتجاوز الحصار نسبة الاحتياطي فيهبط Emax.",
          "en": "Yes! Emax is preserved and shifts right until blockade exceeds the spare threshold, collapsing Emax."
        }
      ],
      "sources": [
        {
          "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf",
          "page": 34
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-11a",
            "text": "Emax düşmez, eğri başlangıçta paralel sağa kayar; ancak tüm yedek reseptörler kovalent bloke olunca Emax çökmeye başlar.",
            "isCorrect": true,
            "misconceptionFeedback": "Harika bir köprü! Furchgott'un klasik deneyinde fenoksibenzamin kademeli olarak reseptörleri kovalent yok eder. Yedek reseptörler tükenene kadar kalan serbest reseptörler %100 yanıt verebilir; rezerv bitince Emax düşer (Slayt 34)."
          },
          {
            "id": "opt-11b",
            "text": "İlk molekül bağlandığı anda Emax anında sıfırlanır ve agonist hiçbir kasılma oluşturamaz.",
            "isCorrect": false,
            "misconceptionFeedback": "Rezerv yok sayma yanılgısı: Dokuda %90 yedek reseptör varsa, ilacın reseptörlerin %50'sini kovalent kitlemesi bile Emax'ı düşürmez; kalan %50 tam yanıt vermeye yeterlidir."
          },
          {
            "id": "opt-11c",
            "text": "Eğri sola kayar çünkü kovalent blokaj diğer reseptörlerin afinitesini 100 kat artırır.",
            "isCorrect": false,
            "misconceptionFeedback": "Afinite artışı yanılgısı: Kovalent blokaj kalan reseptörlerin afinitesini artırmaz; sadece toplam işlevsel reseptör havuzunu eksiltir."
          }
        ],
        "revealedOutcome": {
          "tr": "Geri dönüşümsüz antagonistler yedek reseptör rezervi tükenene kadar Emax'ı düşürmeden eğriyi sağa kaydırır. Rezerv aşıldığında ise aşılmaz (insurmountable) Emax çöküşü başlar.",
          "ar": "تزيح المضادات غير العكوسة المنحنى يميناً دون إنقاص Emax طالما وُجد احتياطي وظيفي؛ وبمجرد استنفاد الاحتياطي يبدأ انهيار Emax الحتمي.",
          "en": "Irreversible antagonists initially shift agonist curves rightward with preserved Emax; once the spare reserve is exhausted, insurmountable Emax depression occurs."
        },
        "explanation": {
          "tr": "Furchgott'un yedek reseptör teorisinin deneysel kanıtı fenoksibenzamin ile yapılmıştır. Kovalent alkilasyon reseptör sayısını azaltsa da, geriye kalan reseptörler doku amplifikasyonuyla tam yanıt oluşturmaya devam eder (Slayt 10, 34).",
          "ar": "أُثبتت نظرية Furchgott تجريبياً باستخدام الفينوكسي بنزامين؛ فرغم تناقص المستقبِلات بالألكلة التساهمية، تكفي البقية لتوليد استجابة تامة بفضل التضخيم الخلوي (شريحة 10، 34).",
          "en": "Furchgott validated spare receptor theory using phenoxybenzamine: covalent target alkylation reduces target pools, yet remaining receptors sustain 100% Emax via signal amplification."
        }
      }
    },
    {
      "id": "pharm-mod1-les2-step-12",
      "stage": "mastery_check",
      "stageIndex": 12,
      "type": "mastery_check",
      "title": {
        "tr": "Ustalık Sınavı: Parsiyel Agonistin Çift Yüzlü Doğası",
        "ar": "اختبار الإتقان: الطبيعة المزدوجة للمنبه الجزئي",
        "en": "Mastery Check: Dual Nature of Partial Agonists"
      },
      "prompt": {
        "tr": "Bir hastada kalp yetmezliği için parsiyel beta-1 agonisti xamoterol veriliyor. Dinlenim halinde nabzı artarken, egzersiz sırasında neden tam tersine taşikardiyi baskılar?",
        "ar": "مريض قصور قلب يُعطى xamoterol (منبه بيتا-1 جزئي). يرفع الدواء نبضه أثناء الراحة، لكنه أثناء الجهد العنيف يكبح تسرع القلب! لماذا؟",
        "en": "Heart failure patient receives xamoterol (partial beta-1 agonist). At rest, it modestly raises heart rate, but during heavy exercise it paradoxically suppresses tachycardia! Why?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-12a",
            "text": {
              "tr": "Dinlenimde düşük sempatik tonda agonist gibi davranarak nabzı artırır; egzersizde yoğun salınan tam agonist adrenalini yarışarak engellediği için antagonist gibi davranır.",
              "ar": "يعمل كمنبه أثناء الراحة لانخفاض النغمة الودية فيرفع النبض، بينما ينافس الأدرينالين الكامل المفرز بغزارة أثناء الجهد فيسلك سلوك المضاد.",
              "en": "Acts as an agonist at rest under low sympathetic tone, but competitively blocks abundant full agonist adrenaline during exercise, acting as an antagonist."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Mükemmel bir farmakolojik ustalık! Parsiyel agonistler çift yönlü moleküllerdir: Endojen tonus düşükken net agonizma (%35) üretirler; endojen tam agonist yoğunlaştığında ise reseptörü işgal edip uyarımı %100'den %35'e frenlerler (Slayt 34).",
              "ar": "قمة الإتقان الدوائي! المنبه الجزئي سيف ذو حدين: بوجود نغمة منخفضة يرفع التنبيه لـ 35%، وبوجود منبه كامل عاصف يحجب المستقبل ليعمل كمضاد كابح (شريحة 34).",
              "en": "Peak pharmacological mastery! Partial agonists act conditionally: elevating activation from basal 0 to 35% at rest, while capping adrenergic surges from 100 down to 35%."
            }
          },
          {
            "id": "opt-12b",
            "text": {
              "tr": "Egzersiz sırasında yükselen vücut sıcaklığı ilacın yapısını kovalent olarak parçalayarak beta blokere dönüştürür.",
              "ar": "تؤدي حرارة الجسم المرتفعة بالجهد لتفكيك بنية الدواء تساهمياً ليتحول إلى حاصر بيتا.",
              "en": "Elevated body temperature during exertion covalently cleaves the drug molecule, converting it into a beta blocker."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Termal parçalanma yanılgısı: Fizyolojik egzersiz sıcaklığı molekülü kimyasal olarak parçalamaz; mekanizma endojen ligand konsantrasyonuyla rekabettir.",
              "ar": "خطأ التفكك الحراري: لا تفكك حرارة الجهد بنية الدواء؛ بل تكمن الآلية في المنافسة الحركية مع الأدرينالين الداخلي.",
              "en": "Thermal cleavage fallacy: Exertion temperatures do not chemically degrade drugs; the effect is purely competitive pharmacodynamics."
            }
          },
          {
            "id": "opt-12c",
            "text": {
              "tr": "Dinlenimde kalpteki beta reseptörlerini artırır, egzersizde ise tüm reseptörleri lizozomlarda yok eder.",
              "ar": "يرفع عدد مستقبلات بيتا بالراحة، ويدمر كافة المستقبِلات في الجسيمات الحالة بالجهد.",
              "en": "It upregulates beta receptors at rest, while selectively destroying all targets in lysosomes during exercise."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Reseptör regülasyonu yanılgısı: Up-regülasyon ve down-regülasyon günlerce sürer; dakikalar içinde değişen etki tamamen Ariëns parsiyel agonizma dengesidir.",
              "ar": "خطأ تنظيم المستقبلات: يستغرق تعديل عدد المستقبِلات أياماً؛ أما التأثير الفوري خلال دقائق فيعود لتوازن المنبه الجزئي لـ Ariëns.",
              "en": "Regulation fallacy: Receptor upregulation takes days; instantaneous exercise dynamics reflect Ariëns partial agonist competition."
            }
          }
        ]
      },
      "technicalTerms": [
        {
          "term": "koşullu antagonizma",
          "arContext": "المناهضة الشرطية (conditional antagonism)"
        },
        {
          "term": "endojen sempatik tonus",
          "arContext": "النغمة الودية الداخلية"
        }
      ],
      "hints": [
        {
          "tr": "Parsiyel agonistin intrinsik aktivitesini (alfa ≈ 0.40) ve ortamdaki endojen adrenalin seviyesini düşünün.",
          "ar": "فكر في الفاعلية الذاتية للمنبه الجزئي (alfa ≈ 0.40) ومستوى الأدرينالين الداخلي المحيط.",
          "en": "Consider the partial agonist's intrinsic activity (alpha ≈ 0.40) relative to ambient adrenaline."
        },
        {
          "tr": "Dinlenimde ortamda adrenalin azdır; ilaç reseptörü uyararak nabzı yükseltir.",
          "ar": "أثناء الراحة يقل الأدرينالين، فيشغل الدواء المستقبِلات ليرفع النبض إلى 40%.",
          "en": "At rest, adrenaline is sparse; the drug occupies targets and elevates tone toward 40%."
        },
        {
          "tr": "Egzersizde adrenalin %100 güçle fırlar; ilaç ise araya girip sinyali %40'ta sınırlandırarak taşikardiyi önler.",
          "ar": "أثناء الجهد ينطلق الأدرينالين بطاقة 100%؛ فيحجز الدواء المستقبلات كابحاً التنبيه عند 40%.",
          "en": "During exercise, adrenaline spikes; xamoterol limits net activation to 40%, preventing tachycardia."
        }
      ],
      "sources": [
        {
          "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf",
          "page": 34
        }
      ],
      "config": {
        "options": [
          {
            "id": "opt-12a",
            "text": "Dinlenimde düşük sempatik tonda agonist gibi davranarak nabzı artırır; egzersizde yoğun salınan tam agonist adrenalini yarışarak engellediği için antagonist gibi davranır.",
            "isCorrect": true,
            "misconceptionFeedback": "Mükemmel bir farmakolojik ustalık! Parsiyel agonistler çift yönlü moleküllerdir: Endojen tonus düşükken net agonizma (%35) üretirler; endojen tam agonist yoğunlaştığında ise reseptörü işgal edip uyarımı %100'den %35'e frenlerler (Slayt 34)."
          },
          {
            "id": "opt-12b",
            "text": "Egzersiz sırasında yükselen vücut sıcaklığı ilacın yapısını kovalent olarak parçalayarak beta blokere dönüştürür.",
            "isCorrect": false,
            "misconceptionFeedback": "Termal parçalanma yanılgısı: Fizyolojik egzersiz sıcaklığı molekülü kimyasal olarak parçalamaz; mekanizma endojen ligand konsantrasyonuyla rekabettir."
          },
          {
            "id": "opt-12c",
            "text": "Dinlenimde kalpteki beta reseptörlerini artırır, egzersizde ise tüm reseptörleri lizozomlarda yok eder.",
            "isCorrect": false,
            "misconceptionFeedback": "Reseptör regülasyonu yanılgısı: Up-regülasyon ve down-regülasyon günlerce sürer; dakikalar içinde değişen etki tamamen Ariëns parsiyel agonizma dengesidir."
          }
        ],
        "revealedOutcome": {
          "tr": "Parsiyel agonistler endojen ligand konsantrasyonuna göre çift yönlü çalışır: Bazal durumda agonist gibi davranırken, yüksek agonist varlığında antagonist gibi davranarak sistemi stabilize eder.",
          "ar": "تعمل المنبهات الجزئية بشكل مزدوج بحسب تركيز الربيط الداخلي: تسلك سلوك المنبه بالراحة وسلوك المضاد أثناء التدفق الأدريناليني، مما يثبت استجابة العضو.",
          "en": "Partial agonists function as bi-directional stabilizers: acting as agonists at baseline, but transitioning into functional antagonists during full agonist surges."
        },
        "explanation": {
          "tr": "Ariëns ve Stephenson modellerinde parsiyel agonistler sabit bir intrinsik aktiviteye (0 < alfa < 1) sahiptir. Endojen sinyal seviyesi alfa değerinin altındayken uyarır, üzerindeyken ise reseptörleri işgal ederek uyarımı sınırlar (Slayt 34).",
          "ar": "في نماذج Ariëns و Stephenson، تملك المنبهات الجزئية فاعلية ثابتة (0 < alfa < 1)؛ فإذا كانت الإشارة الداخلية أقل من alfa فإنها تحفزها، وإذا كانت أعلى فإنها تكبحها (شريحة 34).",
          "en": "Under Ariëns-Stephenson models, partial agonists possess intermediate efficacy (0 < alpha < 1), elevating sub-threshold signaling while dampening excessive physiological surges."
        }
      }
    }
  ]
};

const targetPath = path.resolve(__dirname, '../courses/pharmacology/lessons/lesson-02.json');
fs.writeFileSync(targetPath, JSON.stringify(lesson02, null, 2), 'utf8');
console.log('Successfully written lesson-02.json to:', targetPath);

const targetPathRoot = 'c:/Users/hp/Documents/antigravity/valiant-raman/courses/pharmacology/lessons/lesson-02.json';
try {
  fs.writeFileSync(targetPathRoot, JSON.stringify(lesson02, null, 2), 'utf8');
  console.log('Successfully synced to:', targetPathRoot);
} catch (e) {
  console.warn('Warning: Could not sync to root workspace:', e.message);
}

