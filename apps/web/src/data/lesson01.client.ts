import type { LessonData } from '@pharmacy/platform';

/**
 * Production-ready client lesson data for Course A Lesson 1.
 * Free of internal audit tokens, unverified notes, or developer review tags.
 */
export const clientLesson01: LessonData = {
  "id": "mc-mod1-les1",
  "courseId": "medchem",
  "moduleId": "mc-mod-01",
  "title": {
    "tr": "Termodinamik Aktivite ve Ferguson İlkesi",
    "ar": "النشاط الديناميكي الحراري ومبدأ Ferguson",
    "en": "Thermodynamic Activity & The Ferguson Principle"
  },
  "order": 1,
  "access": "free",
  "objective": {
    "tr": "Yapısal olarak özgül olmayan ilaçların etki mekanizmasını termodinamik aktivite ve doygunluk dengesiyle açıklamak.",
    "ar": "توضيح آلية التأثير غير النوعي بنيوياً للأدوية عبر النشاط الديناميكي الحراري (termodinamik aktivite) وتوازن التشبع.",
    "en": "Differentiate structurally specific from structurally non-specific drugs using thermodynamic activity thresholds."
  },
  "misconceptions": [
    {
      "tr": "Tüm ilaçların spesifik bir protein reseptörüne kilit-anahtar uyumuyla bağlandığı yanılgısı.",
      "ar": "الاعتقاد الخاطئ بأن جميع الأدوية تتطلب ارتباطاً نوعياً مع (reseptör) بروتيني نوعي.",
      "en": "The misconception that all drugs must bind specific stereoselective protein receptors."
    },
    {
      "tr": "Kimyasal olarak farklı genel anesteziklerin farklı biyofazik mekanizmalarla etki ettiği varsayımı.",
      "ar": "الافتراض الخاطئ بأن المخدرات العامة المختلفة كيميائياً تعمل بآليات (biyofaz) مستقلة.",
      "en": "The assumption that chemically diverse general anesthetics operate via distinct biophasic mechanisms."
    }
  ],
  "sources": [
    {
      "file": "Farmasötik ve Medisinal Kimya 1-Giriş.pdf",
      "page": 17
    }
  ],
  "citations": [
    {
      "id": "cit-ref-01",
      "book": "Foye's Principles of Medicinal Chemistry",
      "edition": "8th ed.",
      "topic": "Thermodynamic Activity & Ferguson Principle"
    },
    {
      "id": "cit-ref-02",
      "book": "An Introduction to Medicinal Chemistry",
      "edition": "6th ed., Patrick",
      "topic": "Ferguson's Principle of Non-Specific Action"
    },
    {
      "id": "cit-ref-03",
      "book": "The Practice of Medicinal Chemistry",
      "edition": "4th ed., Wermuth",
      "topic": "Physicochemical Properties and Biological Activity"
    }
  ],
  "spacedReviewCards": [
    {
      "cardId": "mc-mod1-les1-card1",
      "courseId": "medchem",
      "drugOrConcept": "Ferguson İlkesi ve Doygunluk",
      "prompt": "What is the relative thermodynamic saturation range defining non-specific drugs?",
      "answer": "Yapısal olarak özgül olmayan bileşikler yüksek bağıl doygunlukta (a ≈ 0.03-0.05) etki gösterir.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "mc-mod1-les1-card2",
      "courseId": "medchem",
      "drugOrConcept": "Termodinamik Aktivite Denklemi",
      "prompt": "Gaz fazındaki bileşikler için termodinamik aktivite nasıl formüle edilir?",
      "answer": "Kısmi buhar basıncının doygun buhar basıncına oranı: a = Pt / P0.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "mc-mod1-les1-card3",
      "courseId": "medchem",
      "drugOrConcept": "Özgül ve Özgül Olmayan Etki Ayrımı",
      "prompt": "Bir ilacın termodinamik aktivitesi a < 0.001 ise hangi etki mekanizması beklenir?",
      "answer": "Stereo-spesifik reseptör bağlanması ile karakterize yapısal olarak özgül etki.",
      "box": 1,
      "intervalDays": 1
    }
  ],
  "translations": {
    "tr": {
      "title": "Termodinamik Aktivite ve Ferguson İlkesi"
    },
    "ar": {
      "title": "النشاط الديناميكي الحراري ومبدأ Ferguson"
    }
  },
  "steps": [
    {
      "id": "mc-mod1-les1-step-01",
      "stage": "hook",
      "stageIndex": 1,
      "title": {
        "tr": "Klinik Çelişki: Gramlar ve Mikrogramlar",
        "ar": "المفارقة السريرية: غرامات مقابل ميكروغرامات",
        "en": "Two Drugs, Vastly Different Quantities"
      },
      "prompt": {
        "tr": "Dietil eter ile cerrahi anestezi onlarca gram gerektirirken, propranolol miligramlarla etki eder. Bu devasa doz farkının kökeni nedir?",
        "ar": "يتطلب التخدير بـ Diethyl Ether عشرات الغرامات، بينما يعمل Propranolol بالمليغرامات. ما أصل هذا الفارق الهائل في الجرعة؟",
        "en": "General anesthesia with ether requires tens of grams, while beta-blocker propranolol acts at milligram doses. What causes this immense dose divergence?"
      },
      "predictThenReveal": false,
      "config": {
        "drugA": {
          "name": "Diethyl Ether",
          "dose": "Tens of grams (high molar concentration)"
        },
        "drugB": {
          "name": "Propranolol",
          "dose": "Milligrams (micromolar to nanomolar)"
        }
      },
      "technicalTerms": [
        {
          "term": "termodinamik aktivite",
          "arContext": "النشاط الديناميكي الحراري"
        },
        {
          "term": "reseptör",
          "arContext": "المستقبِل الدوائي النوعي"
        }
      ],
      "hints": [
        {
          "tr": "Moleküllerin etki ettiği biyolojik hedeflerin niteliğini düşünün.",
          "ar": "فكر في طبيعة الأهداف البيولوجية التي تؤثر عليها الجزيئات.",
          "en": "Consider the nature of the biological targets these molecules act upon."
        },
        {
          "tr": "Bir madde zarı fiziksel olarak bozar, diğeri tek bir reseptöre bağlanır.",
          "ar": "مادة تعطل الغشاء فيزيائياً، والأخرى ترتبط بمستقبِل مفرد.",
          "en": "One substance physically perturbs the membrane; the other binds a single receptor pocket."
        },
        {
          "tr": "Spesifik olmayan etki yüksek doygunluk gerektirir.",
          "ar": "التأثير غير النوعي يتطلب تشبعاً عالياً.",
          "en": "Non-specific action requires high relative saturation."
        }
      ]
    },
    {
      "id": "mc-mod1-les1-step-02",
      "stage": "question",
      "stageIndex": 2,
      "title": {
        "tr": "Tahmin: Eşit Doygunlukta Anestezi",
        "ar": "توقع: التخدير عند التساوي في التشبع",
        "en": "Prediction: Anesthesia at Equal Saturation"
      },
      "prompt": {
        "tr": "Farklı kimyasal yapılardaki gazlar aynı bağıl doygunluğa (Pt / P0) ulaştığında anestezi derinliği nasıl değişir?",
        "ar": "عندما تصل غازات متباينة كيميائياً لنفس نسبة التشبع النسبي (Pt / P0)، كيف يتغير عمق التخدير؟",
        "en": "When chemically diverse volatile agents reach equal relative saturation (Pt / P0), how does their depth of anesthesia compare?"
      },
      "predictThenReveal": true,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-a",
            "text": {
              "tr": "Farklı yapılara bağlı olarak tamamen farklı etkiler gösterirler.",
              "ar": "تظهر تأثيرات متباينة تماماً تبعاً لاختلاف بنيتها.",
              "en": "They exhibit completely different effects based on differing chemical structures."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Ferguson ilkesine göre kimyasal yapı değil, termodinamik aktivite belirleyicidir.",
              "ar": "وفق مبدأ Ferguson، النشاط الديناميكي الحراري هو الحاكم وليس البنية.",
              "en": "According to Ferguson's principle, thermodynamic activity governs biological depression, not chemical structure."
            }
          },
          {
            "id": "opt-b",
            "text": {
              "tr": "Yalnızca molekül ağırlığı küçük olanlar anestezi yapar.",
              "ar": "الجزيئات ذات الوزن الجزيئي الصغير فقط تحدث تخديراً.",
              "en": "Only volatile molecules with low molecular weight produce surgical anesthesia."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Molekül ağırlığı tek başına anestezi gücünü tayin etmez.",
              "ar": "الوزن الجزيئي وحده لا يحدد القوة التخديرية.",
              "en": "Molecular weight alone does not dictate anesthetic potency."
            }
          },
          {
            "id": "opt-c",
            "text": {
              "tr": "Kimyasal yapıdan bağımsız olarak yaklaşık aynı derecede anestezi oluştururlar.",
              "ar": "تحدث نفس درجة التخدير تقريباً بغض النظر عن البنية الكيميائية.",
              "en": "They produce approximately the same depth of anesthesia regardless of chemical structure."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Doğru! Bağıl doygunluk eşit olduğunda biyofazdaki termodinamik kaçma eğilimi eşittir.",
              "ar": "صحيح! عند تساوي التشبع، يكون ميل الهروب الديناميكي متساوياً.",
              "en": "Correct! At equal relative saturation, thermodynamic escaping tendency in the biophase is identical."
            }
          }
        ]
      },
      "config": {
        "options": [
          {
            "id": "opt-a",
            "text": "Farklı yapılara bağlı olarak tamamen farklı etkiler gösterirler.",
            "isCorrect": false
          },
          {
            "id": "opt-b",
            "text": "Yalnızca molekül ağırlığı küçük olanlar anestezi yapar.",
            "isCorrect": false
          },
          {
            "id": "opt-c",
            "text": "Kimyasal yapıdan bağımsız olarak yaklaşık aynı derecede anestezi oluştururlar.",
            "isCorrect": true
          }
        ],
        "revealedOutcome": "Tüm uçucu anestezikler a = Pt / P0 ≈ 0.03-0.05 aralığında cerrahi anestezi oluşturur.",
        "explanation": "Ferguson ilkesine göre yapısal olarak özgül olmayan maddeler eşit bağıl doygunlukta eşit biyolojik yanıt verir."
      },
      "technicalTerms": [
        {
          "term": "Ferguson ilkesi",
          "arContext": "مبدأ Ferguson"
        },
        {
          "term": "bağıl doygunluk",
          "arContext": "التشبع النسبي"
        }
      ],
      "hints": [
        {
          "tr": "Termodinamik aktivite fazlar arası dengeyi temsil eder.",
          "ar": "يمثل النشاط الديناميكي الحراري التوازن بين الأطوار.",
          "en": "Thermodynamic activity represents equilibrium across biophasic compartments."
        },
        {
          "tr": "Biyofazdaki kaçma eğilimini göz önüne alın.",
          "ar": "ضع في اعتبارك ميل الهروب في الطور الحيوي.",
          "en": "Consider the escaping tendency of volatile molecules into the biophase."
        },
        {
          "tr": "Pt / P0 oranı eşit olduğunda zardaki yoğunlaşma eşittir.",
          "ar": "عند تساوي نسبة Pt / P0 يتساوى التركيز في الغشاء.",
          "en": "Equal partial saturation yields equal membrane concentration."
        }
      ]
    },
    {
      "id": "mc-mod1-les1-step-03",
      "stage": "intuition",
      "stageIndex": 3,
      "title": {
        "tr": "Sezgisel Model: Zardan Kaçma Eğilimi",
        "ar": "النموذج الحدسي: ميل الهروب من الغشاء",
        "en": "Intuitive Model: Escaping Tendency from Membrane"
      },
      "prompt": {
        "tr": "Bir sıvıyı buharlaşmaya zorlayan iç basınç gibi, çözücüdeki moleküller de doymuşluk arttıkça zarlara itilir. Doygunluk yükseldikçe ne olur?",
        "ar": "كما يدفع الضغط الداخلي السائل للتبخر، تندفع الجزيئات نحو الأغشية مع اقتراب التشبع. ماذا يحدث عند زيادة التشبع؟",
        "en": "Thermodynamic activity measures a molecule's escaping tendency from its biophasic solution into target cellular lipid bilayers."
      },
      "predictThenReveal": false,
      "config": {
        "analogy": "Crowded room escaping tendency"
      },
      "technicalTerms": [
        {
          "term": "kaçma eğilimi",
          "arContext": "ميل الهروب الجزيئي"
        },
        {
          "term": "biyofaz",
          "arContext": "الطور الحيوي الغشائي"
        }
      ],
      "hints": [
        {
          "tr": "Molekül kendi fazında sıkıştıkça hücre zarına kaçar.",
          "ar": "كلما انحصر الجزيء في طوره هرب إلى غشاء الخلية.",
          "en": "As molecules crowd their initial phase, they escape into cellular lipid membranes."
        },
        {
          "tr": "Zar lipidlerine yerleşen moleküller zarı genişletir.",
          "ar": "الجزيئات المستقرة في دهون الغشاء تؤدي لتمدده.",
          "en": "Molecules intercalating into lipid bilayers cause physical membrane expansion."
        },
        {
          "tr": "Bu durum iyon kanallarının iletimini bloke eder.",
          "ar": "هذا يغلق القنوات الأيونية ميكانيكياً.",
          "en": "This expansion mechanically compresses and blocks ion channel conduction."
        }
      ]
    },
    {
      "id": "mc-mod1-les1-step-04",
      "stage": "visual_explanation",
      "stageIndex": 4,
      "title": {
        "tr": "Görselleştirme: Lipid Çift Katmanının Genişlemesi",
        "ar": "التوضيح البصري: تمدد طبقة الدهون الثنائية",
        "en": "Visualization: Lipid Bilayer Expansion"
      },
      "prompt": {
        "tr": "Termodinamik aktivite a arttıkça lipid çift katmanına yerleşen moleküller membran hacmini genişletir (Delta V). Bu durum nöronal iletimi durdurur.",
        "ar": "مع ارتفاع النشاط termodinamik aktivite تتكدس الجزيئات في الطبقة الثنائية وتحدث تمدداً حجمياً يعطل السيالة العصبية.",
        "en": "Accumulation of structurally non-specific molecules expands the neuronal membrane volume, mechanically compressing vital ion channel pores."
      },
      "predictThenReveal": false,
      "config": {
        "diagram": "membrane_expansion_svg"
      },
      "technicalTerms": [
        {
          "term": "lipid çift katmanı",
          "arContext": "طبقة الدهون الثنائية"
        },
        {
          "term": "membran hacmi",
          "arContext": "حجم الغشاء الخلوي"
        }
      ],
      "hints": [
        {
          "tr": "Zar kalınlaşması iyon kanallarına baskı uygular.",
          "ar": "سماكة الغشاء تضغط على القنوات الأيونية.",
          "en": "Membrane thickening exerts lateral pressure on neuronal ion channels."
        },
        {
          "tr": "Sodyum geçişi durunca aksiyon potansiyeli kaybolur.",
          "ar": "يتوقف جهد الفعل بتعطل شوارد الصوديوم.",
          "en": "When sodium influx is halted, nerve action potentials cannot propagate."
        },
        {
          "tr": "Kritik hacim hipotezi anestezinin fiziksel temelidir.",
          "ar": "فرضية الحجم الحرج هي أساس التخدير الفيزيائي.",
          "en": "The critical volume hypothesis provides the physical basis for anesthesia."
        }
      ]
    },
    {
      "id": "mc-mod1-les1-step-05",
      "stage": "interactive_artifact",
      "stageIndex": 5,
      "title": {
        "tr": "İnteraktif Simülasyon: Ferguson Slider",
        "ar": "المحاكاة التفاعلية: زالق Ferguson",
        "en": "Interactive Simulation: Ferguson Slider"
      },
      "prompt": {
        "tr": "Kısmi buhar basıncını artırarak termodinamik aktiviteyi (a) ve membran hacim genişlemesini gözlemleyin. Anestezi eşiği hangi değerdedir?",
        "ar": "قم بزيادة الضغط الجزئي لملاحظة النشاط الديناميكي وتمدد الغشاء. عند أي قيمة يقع عتبة التخدير الجراحي؟",
        "en": "Modulate partial vapor pressure to examine the iso-activity anesthetic window and phase cutoff boundaries."
      },
      "predictThenReveal": false,
      "widgetType": "ThermodynamicActivityFergusonSlider",
      "widget": {
        "type": "ThermodynamicActivityFergusonSlider",
        "config": {
          "compound": "diethyl_ether",
          "p0": 440,
          "pt": 15,
          "anestheticThreshold": 0.03
        }
      },
      "config": {
        "defaultAgent": "diethyl_ether",
        "initialPt": 15
      },
      "technicalTerms": [
        {
          "term": "kısmi buhar basıncı",
          "arContext": "الضغط الجزئي للبخار"
        },
        {
          "term": "anestezi eşiği",
          "arContext": "عتبة التخدير"
        }
      ],
      "hints": [
        {
          "tr": "Kısmi basıncı artırarak anestezi eşiğini belirleyin.",
          "ar": "قم بزيادة الضغط الجزئي لتحديد عتبة التخدير.",
          "en": "Increase partial vapor pressure to identify the surgical anesthesia threshold."
        },
        {
          "tr": "a = Pt / P0 oranını kontrol edin.",
          "ar": "تحقق من النسبة a = Pt / P0.",
          "en": "Monitor the relative saturation ratio."
        },
        {
          "tr": "a değeri 0.03 ile 0.05 arasına ulaştığında anestezi başlar.",
          "ar": "يبدأ التخدير عندما تصل قيمة a بين 0.03 و 0.05.",
          "en": "Anesthesia occurs when relative saturation reaches the target window."
        }
      ]
    },
    {
      "id": "mc-mod1-les1-step-06",
      "stage": "guided_discovery",
      "stageIndex": 6,
      "title": {
        "tr": "Rehberli Keşif: Nitrojen Suboksit vs Kloroform",
        "ar": "استكشاف موجه: أكسيد النيتروز مقابل الكلوروفورم",
        "en": "Guided Discovery: Nitrous Oxide vs Chloroform"
      },
      "prompt": {
        "tr": "Simülatörde kloroform ve N2O gazlarını karşılaştırın. Kaynama noktaları ve P0 değerleri çok farklı olsa da anestezi hangi a değerinde gerçekleşir?",
        "ar": "قارن بين الكلوروفورم و N2O. رغم اختلاف درجات الغليان و P0، عند أي قيمة a يحدث التخدير المشترك؟",
        "en": "Notice how nitrous oxide and chloroform produce identical surgical depth despite a massive difference in absolute saturation pressure."
      },
      "predictThenReveal": true,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-disc-1",
            "text": {
              "tr": "Her iki gaz için de aynı dar aralıkta: a ≈ 0.03-0.05.",
              "ar": "لكلا الغازين في نفس النطاق الضيق: a ≈ 0.03-0.05.",
              "en": "In the same narrow relative saturation window for both gases."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Harika! Bağıl doygunluk kuralı kimyasal yapıdan bağımsızdır.",
              "ar": "ممتاز! قاعدة التشبع النسبي مستقلة عن التركيب الكيميائي.",
              "en": "Excellent! The relative saturation rule is independent of chemical structure."
            }
          },
          {
            "id": "opt-disc-2",
            "text": {
              "tr": "Farklı moleküler ağırlıklar nedeniyle tamamen farklı a değerlerinde.",
              "ar": "عند قيم a متباينة تماماً بسبب اختلاف الأوزان الجزيئية.",
              "en": "At completely different activity values due to differing molecular weights."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Molekül ağırlığı farklı olsa bile termodinamik aktivite aralığı aynıdır.",
              "ar": "رغم اختلاف الوزن، نطاق النشاط الديناميكي يبقى ثابتاً.",
              "en": "Even with different molecular weights, the thermodynamic activity window remains the same."
            }
          }
        ]
      },
      "config": {
        "options": [
          {
            "id": "opt-disc-1",
            "text": "Her iki gaz için de a ≈ 0.03-0.05 aralığında.",
            "isCorrect": true
          },
          {
            "id": "opt-disc-2",
            "text": "Farklı a değerlerinde.",
            "isCorrect": false
          }
        ],
        "revealedOutcome": "Her iki molekül de a ≈ 0.03-0.05 seviyesinde anestezi oluşturur.",
        "explanation": "Kimyasal yapı ne olursa olsun, membran lipid fazındaki doygunluk oranı aynı etkiyi yaratır."
      },
      "technicalTerms": [
        {
          "term": "bağıl doygunluk oranı",
          "arContext": "نسبة التشبع النسبي"
        }
      ],
      "hints": [
        {
          "tr": "N2O gazının P0 değeri çok yüksektir.",
          "ar": "قيمة P0 لغاز N2O مرتفعة جداً.",
          "en": "Nitrous oxide has an extremely high saturation vapor pressure."
        },
        {
          "tr": "Kloroformun P0 değeri düşüktür.",
          "ar": "قيمة P0 للكلوروفورم منخفضة.",
          "en": "Chloroform has a much lower saturation vapor pressure."
        },
        {
          "tr": "Pt / P0 oranı her ikisinde de 0.03-0.05 düzeyindedir.",
          "ar": "نسبة Pt / P0 في كليهما بين 0.03-0.05.",
          "en": "Relative saturation produces equivalent depth for both volatile agents."
        }
      ]
    },
    {
      "id": "mc-mod1-les1-step-07",
      "stage": "formal_explanation",
      "stageIndex": 7,
      "title": {
        "tr": "Formal Formülasyon: Ferguson Yasası",
        "ar": "الصياغة الرياضية: قانون Ferguson",
        "en": "Formal Formulation: Ferguson's Principle"
      },
      "prompt": {
        "tr": "Termodinamik aktivite gaz fazında a = Pt / P0, çözeltide ise a = St / S0 olarak tanımlanır. Bu oran kimyasal potansiyelin doğrudan göstergesidir.",
        "ar": "يعرف النشاط بـ a = Pt / P0 للغازات و a = St / S0 للمحاليل. هذه النسبة هي المقياس المباشر للكمون الكيميائي.",
        "en": "For non-specific agents, thermodynamic activity in the biophase equals relative saturation in external phase."
      },
      "predictThenReveal": false,
      "config": {
        "formula": "a = \\frac{P_t}{P_0} \\approx \\frac{S_t}{S_0}",
        "cutoff": "high relative saturation non-specific; a < 0.001 specific"
      },
      "technicalTerms": [
        {
          "term": "kimyasal potansiyel",
          "arContext": "الكمون الكيميائي"
        },
        {
          "term": "çözünürlük doygunluğu",
          "arContext": "تشبع الذوبانية"
        }
      ],
      "hints": [
        {
          "tr": "Pt: ortamdaki kısmi basınç, P0: doymuş buhar basıncı.",
          "ar": "Pt: الضغط الجزئي، P0: ضغط البخار المشبع.",
          "en": "Pt represents partial pressure; P0 represents saturation vapor pressure."
        },
        {
          "tr": "St: çözelti konsantrasyonu, S0: doymuşluk çözünürlüğü.",
          "ar": "St: التركيز في المحلول، S0: الذوبانية عند التشبع.",
          "en": "St represents concentration in solution; S0 represents saturation solubility."
        },
        {
          "tr": "a değeri unity değerine yaklaştıkça sistem doygunluğa ulaşır.",
          "ar": "كلما اقتربت a من حد التشبع الأقصى اقترب النظام من الامتلاء التام.",
          "en": "As activity approaches saturation, the biophase reaches thermodynamic equilibrium."
        }
      ]
    },
    {
      "id": "mc-mod1-les1-step-08",
      "stage": "concept_check",
      "stageIndex": 8,
      "title": {
        "tr": "Kavram Denetimi: Gizemli Bileşiklerin Sınıflandırılması",
        "ar": "فحص المفهوم: تصنيف المركبات المجهولة",
        "en": "Concept Check: Classifying Mystery Compounds"
      },
      "prompt": {
        "tr": "Bileşik X 500 mg dozda a = 0.20 aktiviteyle; Bileşik Y 10 ug dozda a = 0.00001 aktiviteyle etki ediyor. Hangisi yapısal olarak özgüldür?",
        "ar": "مركب X بجرعة 500 mg يمتلك نشاط a = 0.20، ومركب Y بجرعة 10 ug يمتلك نشاط a = 0.00001. أيهما نوعي بنيوياً؟",
        "en": "Compound X requires high relative saturation for depression. Compound Y produces activity at extreme dilution. Classify their mechanisms."
      },
      "predictThenReveal": true,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-chk-1",
            "text": {
              "tr": "Bileşik Y yapısal olarak özgüldür çünkü aşırı seyreltik doygunlukta (a < 0.001) etki eder.",
              "ar": "المركب Y نوعي بنيوياً لأنه يؤثر عند تشبع متناهي الصغر (a < 0.001).",
              "en": "Compound Y is structurally specific because it acts at extreme dilution."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Doğru! a < 0.001 olması spesifik reseptör bağlanmasının kesin kanıtıdır. Arada 4 orders of magnitude fark vardır.",
              "ar": "صحيح! a < 0.001 برهان على الارتباط بمستقبِل نوعي (reseptör).",
              "en": "Correct! Low activity proves specific receptor binding. There is a huge divergence in saturation."
            }
          },
          {
            "id": "opt-chk-2",
            "text": {
              "tr": "Bileşik X yapısal olarak özgüldür çünkü dozu daha büyüktür.",
              "ar": "المركب X نوعي بنيوياً لأن جرعته أكبر.",
              "en": "Compound X is structurally specific because its effective dose is larger."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Büyük doz ve yüksek a (0.20) yapısal olarak özgül olmayan fiziksel etkiyi gösterir.",
              "ar": "الجرعة الكبيرة و a العالية تدل على تأثير فيزيائي غير نوعي.",
              "en": "High saturation requirements define structurally non-specific membrane perturbation."
            }
          }
        ]
      },
      "config": {
        "options": [
          {
            "id": "opt-chk-1",
            "text": "Bileşik Y özgüldür (a < 0.001).",
            "isCorrect": true
          },
          {
            "id": "opt-chk-2",
            "text": "Bileşik X özgüldür.",
            "isCorrect": false
          }
        ],
        "revealedOutcome": "Bileşik Y reseptör aracılı özgül bir ilaçtır.",
        "explanation": "Bileşik Y ile Bileşik X arasında termodinamik aktivite açısından 4 orders of magnitude büyüklük farkı mevcuttur."
      },
      "technicalTerms": [
        {
          "term": "yapısal olarak özgül",
          "arContext": "نوعي بنيوياً"
        },
        {
          "term": "reseptör aracılı",
          "arContext": "بواسطة المستقبِل"
        }
      ],
      "hints": [
        {
          "tr": "a < 0.001 eşiğini hatırlayın.",
          "ar": "تذكر عتبة a < 0.001.",
          "en": "Recall the cutoff dividing specific and non-specific mechanisms."
        },
        {
          "tr": "Bileşik Y aşırı düşük doygunlukta etki gösteriyor.",
          "ar": "المركب Y يعمل عند تشبع بالغ الانخفاض.",
          "en": "Compound Y produces biological effects at extreme biophasic dilution."
        },
        {
          "tr": "Düşük termodinamik aktivite yüksek reseptör ilgisini kanıtlar.",
          "ar": "النشاط الديناميكي المنخفض يثبت ألفة المستقبِل العالية.",
          "en": "Low thermodynamic activity proves high-affinity stereospecific receptor binding."
        }
      ]
    },
    {
      "id": "mc-mod1-les1-step-09",
      "stage": "application",
      "stageIndex": 9,
      "title": {
        "tr": "Uygulama: Soluma Anesteziğinde Doz Hesabı",
        "ar": "تطبيق سريري: حساب جرعة المخدر الاستنشاقي",
        "en": "Application: Volatile Inhalation Dose Calculation"
      },
      "prompt": {
        "tr": "Doygun buhar basıncı P0 = 200 mmHg olan yeni bir anestezik gaz için Pt = 10 mmHg uygulandığında a değeri ve etki durumu nedir?",
        "ar": "مخدر غازي جديد يمتلك P0 = 200 mmHg، عند تطبيق Pt = 10 mmHg ما هي قيمة a والحالة التخديرية الناتجة؟",
        "en": "A volatile anesthetic has saturation vapor pressure P0 = 200 mmHg. Inhalation anesthesia occurs at partial pressure Pt = 10 mmHg. Calculate a."
      },
      "predictThenReveal": true,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-app-1",
            "text": {
              "tr": "a = 20.0; ölümcül doz aşımıdır.",
              "ar": "a = 20.0؛ جرعة مفرطة قاتلة.",
              "en": "a = 20.0; represents a fatal massive overdose."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Pt / P0 oranı unity sınırından büyük olamaz, bölme yönüne dikkat edin.",
              "ar": "لا يمكن أن تتجاوز نسبة Pt / P0 حد التشبع الأقصى.",
              "en": "Calculation error: relative saturation cannot exceed standard limits under equilibrium."
            }
          },
          {
            "id": "opt-app-2",
            "text": {
              "tr": "a = 0.05 (5% doygunluk); cerrahi anestezi aralığındadır.",
              "ar": "a = 0.05 (تشبع 5%)؛ يقع ضمن نطاق التخدير الجراحي.",
              "en": "a = 0.05; falls within the surgical anesthesia window."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Doğru: a = 10 / 200 = 0.05. Bu değer tam anestezi penceresindedir.",
              "ar": "صحيح: a = 10 / 200 = 0.05، وهي ضمن نافذة التخدير الجراحي.",
              "en": "Correct! a = Pt / P0 = 10 / 200 = 0.05, matching the Ferguson threshold."
            }
          }
        ]
      },
      "config": {
        "options": [
          {
            "id": "opt-app-1",
            "text": "a = 20.0; ölümcül aşırı doz.",
            "isCorrect": false
          },
          {
            "id": "opt-app-2",
            "text": "a = 0.05; cerrahi anestezi aralığındadır.",
            "isCorrect": true
          }
        ],
        "revealedOutcome": "a = Pt / P0 = 10 / 200 = 0.05 (5% bağıl doygunluk). Cerrahi anestezi başarıyla sağlanır.",
        "explanation": "Hesaplanan 0.05 değeri Ferguson un belirlediği 0.03-0.05 anestezi aralığına tam uyar."
      },
      "technicalTerms": [
        {
          "term": "cerrahi anestezi",
          "arContext": "التخدير الجراحي"
        }
      ],
      "hints": [
        {
          "tr": "Formülü uygulayın: a = Pt / P0.",
          "ar": "طبق القانون: a = Pt / P0.",
          "en": "Apply Ferguson's equation: a = Pt / P0."
        },
        {
          "tr": "10 bölü 200 işlemini yapın.",
          "ar": "اقسم 10 على 200.",
          "en": "Calculate the ratio of given vapor pressures."
        },
        {
          "tr": "Sonuç 0.05 tir ve anestezi aralığındadır.",
          "ar": "النتيجة 0.05 وتقع ضمن نطاق التخدير.",
          "en": "The quotient falls within the surgical anesthesia window."
        }
      ]
    },
    {
      "id": "mc-mod1-les1-step-10",
      "stage": "retrieval",
      "stageIndex": 10,
      "title": {
        "tr": "Geri Çağırma: Genel Kimyadan Raoult Yasası",
        "ar": "استرجاع معرفي: قانون Raoult من الكيمياء العامة",
        "en": "Retrieval: Raoult's Law from General Chemistry"
      },
      "prompt": {
        "tr": "İdeal çözeltilerde kısmi buhar basıncı ile mol kesri arasındaki ilişkiyi kuran temel termodinamik yasa hangisidir?",
        "ar": "ما هو القانون الديناميكي الحراري الأساسي الذي يربط بين الضغط الجزئي والكسر المولي في المحاليل المثالية؟",
        "en": "In ideal solutions, how does partial vapor pressure over a solution relate to mole fraction and saturation vapor pressure?"
      },
      "predictThenReveal": false,
      "config": {
        "targetConcept": "Raoult Yasası"
      },
      "technicalTerms": [
        {
          "term": "Raoult yasası",
          "arContext": "قانون Raoult"
        },
        {
          "term": "mol kesri",
          "arContext": "الكسر المولي"
        }
      ],
      "hints": [
        {
          "tr": "Buhar basıncı düşmesi yasasını hatırlayın.",
          "ar": "تذكر قانون انخفاض ضغط البخار.",
          "en": "Recall the law governing vapor pressure depression in solutions."
        },
        {
          "tr": "Fransız kimyacı François-Marie Raoult un adıyla anılır.",
          "ar": "منسوب إلى الكيميائي الفرنسي Raoult.",
          "en": "Named after French physical chemist Francois-Marie Raoult."
        },
        {
          "tr": "Ferguson ilkesi Raoult yasasının biyolojik uyarlamasıdır.",
          "ar": "مبدأ Ferguson هو تطبيق بيولوجي لقانون Raoult.",
          "en": "Ferguson's principle represents the biophysical application of Raoult's law."
        }
      ]
    },
    {
      "id": "mc-mod1-les1-step-11",
      "stage": "connection",
      "stageIndex": 11,
      "title": {
        "tr": "İleri Bağlantı: Çözünürlük ve İyonizasyon (Ders 2)",
        "ar": "ربط مفاهيمي: الذوبانية والتأين (الدرس 2)",
        "en": "Connection: Solubility and Ionization (Lesson 2)"
      },
      "prompt": {
        "tr": "Termodinamik aktivite ilaç molekülünün sudan kaçıp zara sığınmasını açıklar. Bir sonraki derste bu kaçışı belirleyen iyonizasyon dengesini inceleyeceğiz.",
        "ar": "يفسر النشاط الديناميكي هروب الجزيء من الماء للغشاء. في الدرس القادم، سندرس توازن التأين (iyonizasyon) الذي يتحكم بهذا العبور.",
        "en": "Thermodynamic activity governs non-specific agents, but how does aqueous ionization dictate membrane crossing for specific drugs?"
      },
      "predictThenReveal": false,
      "config": {
        "nextLesson": "mc-mod1-les2"
      },
      "technicalTerms": [
        {
          "term": "iyonizasyon dengesi",
          "arContext": "توازن التأين"
        },
        {
          "term": "membran geçişi",
          "arContext": "عبور الأغشية"
        }
      ],
      "hints": [
        {
          "tr": "İyonlaşmış moleküller suda kalır.",
          "ar": "الجزيئات المتأينة تبقى في الطور المائي.",
          "en": "Ionized species remain partitioned in the bulk aqueous phase."
        },
        {
          "tr": "İyonlaşmamış moleküller lipid zara geçer.",
          "ar": "الجزيئات غير المتأينة تعبر الغشاء الدهني.",
          "en": "Un-ionized neutral molecules diffuse across hydrophobic lipid membranes."
        },
        {
          "tr": "Henderson-Hasselbalch denklemi bu oranı yönetir.",
          "ar": "معادلة Henderson-Hasselbalch تحكم هذه النسبة.",
          "en": "The Henderson-Hasselbalch equation governs this ionization equilibrium."
        }
      ]
    },
    {
      "id": "mc-mod1-les1-step-12",
      "stage": "mastery_check",
      "stageIndex": 12,
      "title": {
        "tr": "Ustalık Sınavı: Ferguson İlkesi Özeti",
        "ar": "اختبار الإتقان: ملخص مبدأ Ferguson",
        "en": "Mastery Assessment: Ferguson Principle Summary"
      },
      "prompt": {
        "tr": "Ferguson ilkesinin temel kuralını tek bir cümleyle özetleyin: Yapısal olarak özgül olmayan maddelerin biyolojik etkisi neye bağlıdır?",
        "ar": "لخص مبدأ Ferguson بجملة واحدة: على ماذا يعتمد التأثير البيولوجي للمركبات غير النوعية بنيوياً؟",
        "en": "Which definitive criterion proves that a series of hypnotic drugs operates via a structurally non-specific biophysical mechanism?"
      },
      "predictThenReveal": true,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-mst-1",
            "text": {
              "tr": "Kimyasal yapılarına ve spesifik kovalent bağ oluşturma güçlerine.",
              "ar": "على بنيتها الكيميائية وقدرتها على تشكيل روابط تساهمية نوعية.",
              "en": "Their chemical core structures and ability to form specific covalent bonds."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Yapısal olarak özgül olmayan bileşikler spesifik bağ yapmazlar.",
              "ar": "المركبات غير النوعية بنيوياً لا تشكل روابط نوعية.",
              "en": "Non-specific drugs do not form stereospecific covalent bonds."
            }
          },
          {
            "id": "opt-mst-2",
            "text": {
              "tr": "Kimyasal yapıdan bağımsız olarak, biyofazdaki bağıl doygunluklarına (termodinamik aktivitelerine).",
              "ar": "على تشبعها النسبي في الطور الحيوي (termodinamik aktivite) بمعزل عن بنيتها.",
              "en": "Their relative thermodynamic saturation in the biophase, independent of chemical structure."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Tebrikler! Dersi ustalıkla tamamladınız. +50 XP kazandınız.",
              "ar": "تهانينا! لقد أتقنت الدرس بنجاح. حصلت على +50 XP.",
              "en": "Correct! Ferguson's principle proves biological depression is governed by relative thermodynamic activity."
            }
          }
        ]
      },
      "config": {
        "options": [
          {
            "id": "opt-mst-1",
            "text": "Kimyasal yapıya bağlıdır.",
            "isCorrect": false
          },
          {
            "id": "opt-mst-2",
            "text": "Biyofazdaki bağıl doygunluğa (termodinamik aktiviteye) bağlıdır.",
            "isCorrect": true
          }
        ],
        "revealedOutcome": "Ders başarıyla tamamlandı! 3 review cards Leitner Box 1 e 1-day aralıkla eklendi. +50 XP.",
        "explanation": "Tebrikler, Ferguson ilkesi ve termodinamik aktivite kavramını tam anlamıyla kavradınız."
      },
      "technicalTerms": [
        {
          "term": "termodinamik aktivite",
          "arContext": "النشاط الديناميكي الحراري"
        },
        {
          "term": "biyofaz",
          "arContext": "الطور الحيوي"
        }
      ],
      "hints": [
        {
          "tr": "Kimyasal yapı mı yoksa faz dengesi mi?",
          "ar": "هل البنية الكيميائية أم توازن الأطوار؟",
          "en": "Consider chemical structure versus biophasic phase equilibrium."
        },
        {
          "tr": "Doygunluk oranı anahtar kavramdır.",
          "ar": "نسبة التشبع هي المفهوم المحوري.",
          "en": "Relative saturation is the key governing parameter."
        },
        {
          "tr": "Eşit termodinamik aktivite eşit biyolojik yanıt üretir.",
          "ar": "النشاط الديناميكي المتساوي يولد استجابة متساوية.",
          "en": "Equal thermodynamic activity produces equal biological depression."
        }
      ]
    }
  ]
} as unknown as LessonData;
