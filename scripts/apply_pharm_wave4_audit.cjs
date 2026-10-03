const fs = require('fs');
const path = require('path');

// ============================================================================
// DATA FOR LESSON 07: pharm-mod4-les1
// ============================================================================
const lesson07Steps = [
  // Step 1: Hook
  {
    id: 'pharm-mod4-les1-step1',
    stage: 'hook',
    phase: 'explore',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Klinik Paradoks: Dale'in Vazomotor Epinefrin Tersinmesi",
      ar: "المفارقة السريرية: انعكاس ديل الحركي الوعائي للإبينفرين",
      en: "Clinical Paradox: Dale's Vasomotor Epinephrine Reversal"
    },
    prompt: {
      tr: "Epinefrin normalde tansiyonu yükseltir. Ancak alfa-bloker fentolamin ile önceden tedavi edilen bir hayvanda, epinefrin neden kan basıncında ani bir DÜŞÜŞE yol açar?",
      ar: "يرفع الإبينفرين عادة ضغط الدم. ولكن في حيوان عولج مسبقاً بحاصر ألفا فينتولامين، لماذا يسبب الإبينفرين هبوطاً حاداً في ضغط الدم؟",
      en: "Epinephrine normally elevates blood pressure. But in an animal pretreated with the alpha-blocker phentolamine, why does epinephrine trigger a precipitous blood pressure DROP?"
    },
    hints: {
      nudge: {
        tr: "Epinefrinin aynı anda bağlandığı iki zıt vasküler adrenerjik reseptör alt tipini düşünün.",
        ar: "فكر في النمطين الفرعيين المتعاكسين لمستقبلات الأوعية اللذين يرتبط بهما الإبينفرين في وقت واحد.",
        en: "Think about the two opposing vascular adrenoceptor subtypes epinephrine binds simultaneously."
      },
      clue: {
        tr: "Alfa-1 arteriyol büzülmesini, beta-2 ise arteriyol gevşemesini yönetir. Fentolaminden sonra hangi alt tip açıkta kalır?",
        ar: "يتوسط ألفا-1 التضيق الوعائي بينما يتوسط بيتا-2 الارتخاء. أي نمط فرعي يبقى غير محصور بعد الفينتولامين؟",
        en: "Alpha-1 mediates arteriolar constriction, while beta-2 mediates arteriolar relaxation. Which subtype remains unblocked?"
      },
      solution: {
        tr: "Fentolamin alfa-1 reseptörlerini bloke eder; epinefrinin iskelet kası damarlarındaki beta-2 etkisi engelsiz vazodilatasyon ve hipotansiyon yapar.",
        ar: "يحصر الفينتولامين مستقبلات ألفا-1؛ فيؤدي تأثير الإبينفرين غير المقيد على مستقبلات بيتا-2 العضلية إلى توسع وعائي وهبوط ضغط.",
        en: "Phentolamine blocks vasoconstrictor alpha-1 receptors; unopposed beta-2 receptor activation in skeletal muscle vascular beds produces pronounced vasodilation and hypotension."
      }
    },
    conceptCheck: {
      question: {
        tr: "Epinefrin fentolamin varlığında neden vazodilatasyon ve hipotansiyon yapar?",
        ar: "لماذا يحدث الإبينفرين توسعاً وعائياً وهبوطاً في الضغط بوجود الفينتولامين؟",
        en: "Why does epinephrine trigger vasodilation and hypotension in the presence of phentolamine?"
      },
      options: [
        {
          id: 'opt-l7-s1-1',
          isCorrect: true,
          text: {
            tr: "Alfa-1 vazokonstriksiyonu bloke edilir; iskelet kası damarlarındaki engellenmemiş beta-2 aktivasyonu belirgin vazodilatasyon ve hipotansiyon oluşturur.",
            ar: "تُحصر مستقبلات ألفا-1 المضيقة للأوعية، فيؤدي تفعيل بيتا-2 دون معارضة في الأوعية العضلية إلى توسع وعائي شديد وهبوط ضغط.",
            en: "Alpha-1 vasoconstriction is blocked; unopposed beta-2 receptor activation in skeletal muscle vascular beds produces pronounced vasodilation and hypotension."
          },
          feedback: {
            tr: "Doğru. Dale vazomotor tersinmesi, alfa-blokajın beta-2 vazodilatasyonunu açığa çıkarmasıyla oluşur.",
            ar: "صحيح. يحدث انعكاس ديل الوعائي لأن حصر ألفا يكشف التوسع الوعائي المتواسط بـ بيتا-2.",
            en: "Correct. Dale's vasomotor reversal occurs because alpha-blockade unmasks potent beta-2 mediated arteriolar dilation."
          }
        },
        {
          id: 'opt-l7-s1-2',
          isCorrect: false,
          text: {
            tr: "Fentolamin vagal refleks yaylarını uyararak epinefrinin kardiyak etkisini şiddetli bradikardiye ve vasküler kollapsa dönüştürür.",
            ar: "يحفز الفينتولامين المنعكس المبهمي، محولاً تأثير الإبينفرين القلبي إلى تباطؤ نبض شديد وانهيار وعائي.",
            en: "Phentolamine stimulates vagal reflex arcs, converting epinephrine's cardiac action into profound bradycardia and vascular collapse."
          },
          feedback: {
            tr: "Yanlış. Fentolamin vagal bradikardi yapmaz; kardiyak beta-1 uyarımı devam eder ancak toplam periferik direnç beta-2 ile çöker.",
            ar: "غير صحيح. لا يسبب الفينتولامين بطء قلب مبهمياً؛ يبقى تنبيه بيتا-1 القلبي قائماً بينما تنهار المقاومة بـ بيتا-2.",
            en: "Incorrect. Phentolamine does not cause vagal bradycardia; cardiac beta-1 stimulation remains intact, but peripheral resistance plummets via beta-2 dilation."
          }
        },
        {
          id: 'opt-l7-s1-3',
          isCorrect: false,
          text: {
            tr: "Fentolamin beta-1 reseptörlerine geçerek kardiyak debiyi yarışmalı şekilde bloke eder ve sistolik arteriyel basıncı sıfırlar.",
            ar: "يعبر الفينتولامين لمستقبلات بيتا-1 ويحصر النتاج القلبي تنافسياً، ملغياً الضغط الشرياني الانقباضي.",
            en: "Phentolamine crosses to beta-1 receptors and competitively blocks cardiac output, eliminating systolic arterial pressure."
          },
          feedback: {
            tr: "Yanlış. Fentolamin alfa reseptörlerine selektiftir; kardiyak beta-1 reseptörlerine ihmal edilebilir afinite gösterir.",
            ar: "غير صحيح. الفينتولامين انتقائي لمستقبلات ألفا وله ألفة ضئيلة جداً تجاه مستقبلات بيتا-1 القلبية.",
            en: "Incorrect. Phentolamine is selective for alpha adrenoceptors and has negligible affinity for cardiac beta-1 receptors."
          }
        }
      ]
    }
  },

  // Step 2: Question
  {
    id: 'pharm-mod4-les1-step2',
    stage: 'question',
    phase: 'explore',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Kavramsal Soru: Zıt Yanıtların Kökeni",
      ar: "سؤال مفاهيمي: أصل الاستجابات المتعاكسة",
      en: "Conceptual Question: The Origin of Opposing Responses"
    },
    prompt: {
      tr: "Aynı epinefrin molekülü, cilt arteriyollerinde yoğun kasılmaya yol açarken iskelet kası damarlarında ve hava yollarında nasıl belirgin gevşeme sağlar?",
      ar: "كيف يمكن لجزيء الإبينفرين نفسه أن يحدث تضيقاً شديداً في شريانات الجلد بينما يسبب ارتخاءً عميقاً في شريانات العضلات والشعب الهوائية؟",
      en: "How can the exact same epinephrine molecule trigger intense constriction in skin arterioles while causing profound relaxation in muscle arterioles and airways?"
    },
    hints: {
      nudge: {
        tr: "Dolaşımdaki ligand aynıdır. Hedef doku membranlarında ne farklıdır?",
        ar: "الربيطة الجائلة متطابقة. ما الذي يختلف بين أغشية الأنسجة المستهدفة؟",
        en: "The circulating ligand is identical. What differs between the target tissue membranes?"
      },
      clue: {
        tr: "Kutanöz ve iskelet kası damar yataklarında hangi reseptör alt tipleri ve G-protein yolakları baskındır?",
        ar: "ما هي الأنماط الفرعية للمستقبلات ومسارات بروتين G السائدة في الأوعية الجلدية مقابل العضلية؟",
        en: "Consider which adrenoceptor subtypes and G-protein pathways predominate in cutaneous versus skeletal muscle beds."
      },
      solution: {
        tr: "Cilt damarları alfa-1 (Gq) ifade ederken, kas damarları ve bronşlar beta-2 (Gs) reseptörleri taşır; bu da zıt yanıtlara yol açar.",
        ar: "تعبر أوعية الجلد عن ألفا-1 (Gq)، بينما تحمل أوعية العضلات والشعب مستقبلات بيتا-2 (Gs)، مما يولد استجابات متعاكسة.",
        en: "Cutaneous vessels express predominantly alpha-1 (Gq-coupled), whereas skeletal muscle vessels and airways express beta-2 (Gs-coupled) receptors."
      }
    },
    conceptCheck: {
      question: {
        tr: "Aynı epinefrin molekülü farklı dokularda zıt etkilere nasıl yol açar?",
        ar: "كيف يسبب جزيء الإبينفرين نفسه تأثيرات متعاكسة في أنسجة مختلفة؟",
        en: "How does the exact same epinephrine molecule mediate opposing effects across different tissues?"
      },
      options: [
        {
          id: 'opt-l7-s2-1',
          isCorrect: true,
          text: {
            tr: "Cilt arteriyolleri ağırlıklı olarak alfa-1 (Gq kenetli) ifade ederken, kas arteriyolleri ve bronşiyoller beta-2 (Gs kenetli) reseptörler taşır.",
            ar: "تعبر شريانات الجلد غالباً عن مستقبلات ألفا-1 (المقترنة بـ Gq)، بينما تعبر شريانات العضلات والشعب عن بيتا-2 (المقترنة بـ Gs).",
            en: "Skin arterioles express predominantly alpha-1 receptors (Gq-coupled), whereas skeletal muscle arterioles and bronchioles express beta-2 receptors (Gs-coupled)."
          },
          feedback: {
            tr: "Doğru. Dokuya özgü reseptör dağılımı yanıtı belirler: alfa-1 kasılma, beta-2 gevşeme oluşturur.",
            ar: "صحيح. يحدد التوزع النسيجي للمستقبلات نوع الاستجابة: ألفا-1 يسبب التضيق، وبيتا-2 يسبب الارتخاء.",
            en: "Correct. Tissue-specific receptor distribution dictates the response: alpha-1 causes constriction, while beta-2 induces relaxation."
          }
        },
        {
          id: 'opt-l7-s2-2',
          isCorrect: false,
          text: {
            tr: "Kutanöz monoamin oksidaz epinefrini uyarıcı bir metabolite yıkarken, kas COMT enzimi onu gevşetici bir metabolite dönüştürür.",
            ar: "يستقلب أوكسيداز أحادي الأمين الجلدي الإبينفرين لمستقلب منبه، بينما يحوله COMT في العضلات لمستقلب مرخٍ.",
            en: "Cutaneous monoamine oxidase metabolizes epinephrine into an excitatory metabolite, while muscle COMT converts it into an inhibitory one."
          },
          feedback: {
            tr: "Yanlış. Epinefrin yüzey reseptörlerine intakt etki eder; MAO veya COMT metabolitleri agonist etki göstermez.",
            ar: "غير صحيح. يؤثر الإبينفرين سليماً على المستقبلات السطحية؛ ولا تمتلك نواتج MAO أو COMT فعالية تنبيهية.",
            en: "Incorrect. Epinephrine acts intact on cell-surface receptors; neither MAO nor COMT metabolites possess significant adrenoceptor agonist activity."
          }
        },
        {
          id: 'opt-l7-s2-3',
          isCorrect: false,
          text: {
            tr: "Cilt, iskelet kasından daha yüksek arteryel epinefrin konsantrasyonu alarak vazokonstriktör eşiği aşar.",
            ar: "يصل إلى الجلد تركيز شرياني من الإبينفرين أعلى من العضلات، متجاوزاً عتبة التضيق الوعائي.",
            en: "Skin receives higher arterial epinephrine concentrations than skeletal muscle, overwhelming vasoconstrictor thresholds."
          },
          feedback: {
            tr: "Yanlış. Her iki doku da eşit arteryel ilaç konsantrasyonu alır; fark reseptör alt tip yoğunluğundan kaynaklanır.",
            ar: "غير صحيح. يتلقى كلا النسيجين تركيزاً شريانياً متطابقاً؛ ويعود الفارق حصراً لكثافة الأنماط الفرعية للمستقبلات.",
            en: "Incorrect. Both tissues receive identical arterial drug concentrations; the divergence stems entirely from receptor subtype density."
          }
        }
      ]
    }
  },

  // Step 3: Intuition
  {
    id: 'pharm-mod4-les1-step3',
    stage: 'intuition',
    phase: 'explore',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Fiziksel Sezgi: Savaş ya da Kaç Güç Dağıtıcısı",
      ar: "الحدس الفيزيائي: موجه طاقة الكر والفر",
      en: "Physical Intuition: The Fight-or-Flight Power Router"
    },
    prompt: {
      tr: "Akut savaş-ya-da-kaç sempatik deşarjında, farklı adrenerjik reseptör aktivasyonları kan akışını hayati organlara nasıl optimize eder?",
      ar: "أثناء التنبيه الودي الحاد (الكر أو الفر)، كيف يحسن التفعيل المتمايز للمستقبلات الأدرينالينية تدفق الدم للأعضاء الحيوية؟",
      en: "During acute fight-or-flight sympathetic discharge, how does differential adrenoceptor activation optimize blood delivery to vital organs?"
    },
    hints: {
      nudge: {
        tr: "Yoğun efor sırasında kanın nereye acil aktarılması gerektiğini ve nerede feda edilebileceğini düşünün.",
        ar: "فكر في الأعضاء التي تتطلب دماً عاجلاً أثناء الجهد العنيف وتلك التي يمكن الاستغناء عنها مؤقتاً.",
        en: "Think about where blood is desperately needed during high-stress exertion versus where it can be spared."
      },
      clue: {
        tr: "Sindirim ve cilt kanlanması kısıtlanabilir; çalışan iskelet kasları ve kalp ise yüksek oksijene ihtiyaç duyar.",
        ar: "يمكن تقليص التروية الجلدية والهضمية؛ بينما تتطلب العضلات الهيكلية العاملة والقلب تدفقاً هائلاً.",
        en: "Digestion and skin perfusion can be temporarily sacrificed; skeletal muscles and the heart demand immense oxygen delivery."
      },
      solution: {
        tr: "Alfa-1 viseral damarları büzerek kanı azaltır; beta-2 ise kas damarlarını genişleterek kanı çalışan kaslara yönlendirir.",
        ar: "يضيق ألفا-1 أوعية الأحشاء حابساً الدم؛ بينما يوسع بيتا-2 أوعية العضلات موجهاً التدفق للأعضاء الحيوية.",
        en: "Alpha-1 clamps visceral and cutaneous vessels, shunting perfusion to beta-2 dilated skeletal muscle beds and beta-1 myocardium."
      }
    },
    conceptCheck: {
      question: {
        tr: "Sempatik deşarj sırasında kan akışı vücutta nasıl yeniden dağıtılır?",
        ar: "كيف يُعاد توزيع تدفق الدم في الجسم أثناء التنبيه الودي الحاد؟",
        en: "How is blood flow redistributed during acute sympathetic fight-or-flight activation?"
      },
      options: [
        {
          id: 'opt-l7-s3-1',
          isCorrect: true,
          text: {
            tr: "Alfa-1 visseral ve mukozal damarları daraltır; debiyi beta-2 ile genişleyen iskelet kası damarlarına ve beta-1 ile uyarılan miyokarda yönlendirir.",
            ar: "يضيق ألفا-1 أوعية الأحشاء والغشاء المخاطي، موجهاً النتاج القلبي نحو عضلات هيكلية موسعة بـ بيتا-2 وميوكارديوم منشط بـ بيتا-1.",
            en: "Alpha-1 vasoconstricts splanchnic and mucosal vessels, shunting cardiac output toward beta-2 dilated skeletal muscle beds and beta-1 stimulated myocardium."
          },
          feedback: {
            tr: "Doğru. Alfa-1 acil olmayan yatakları daraltırken, beta-2 çalışan iskelet kası damarlarını genişletir.",
            ar: "صحيح. يضيق ألفا-1 الأوعية غير الحيوية، بينما يوسع بيتا-2 أوعية العضلات الهيكلية النشطة.",
            en: "Correct. Alpha-1 clamps non-essential vascular beds while beta-2 dilates exercising skeletal muscle beds."
          }
        },
        {
          id: 'opt-l7-s3-2',
          isCorrect: false,
          text: {
            tr: "Alfa-1 koroner ve serebral dolaşımı daraltarak toplam kan hacmini yalnızca periferik iskelet kasına yönlendirir.",
            ar: "يضيق ألفا-1 الدوران التاجي والمخي، معيداً توجيه كامل حجم الدم حصرياً نحو العضلات الهيكلية المحيطية.",
            en: "Alpha-1 vasoconstricts coronary and cerebral circulation, redirecting total blood volume exclusively toward peripheral skeletal muscle."
          },
          feedback: {
            tr: "Yanlış. Koroner ve serebral damarlar vazokonstriksiyondan korunur; lokal otoregülasyon ve beta-2 ile genişler.",
            ar: "غير صحيح. يُحمى الدوران التاجي والدماغي من التضيق؛ حيث يتوسعان بالتنظيم الذاتي الموضعي و بيتا-2.",
            en: "Incorrect. Coronary and cerebral vessels are preserved from vasoconstriction; local autoregulation and beta-2 maintain perfusion."
          }
        },
        {
          id: 'opt-l7-s3-3',
          isCorrect: false,
          text: {
            tr: "Sempatik uyarım, sistemik arteriyel direnci maksimize etmek için tüm vücuttaki damar yataklarını homojen biçimde büzer.",
            ar: "يسبب التنبيه الودي تضيقاً متجانساً في جميع الأوعية عبر كامل الجسم لتعظيم المقاومة الشريانية الجهازية.",
            en: "Sympathetic stimulation uniformly constricts all vascular beds across the entire body to maximize systemic arterial resistance."
          },
          feedback: {
            tr: "Yanlış. Homojen büzülme kas iskemisine yol açar; sempatik sistem reseptör dağılımı sayesinde kanı seçici olarak yönlendirir.",
            ar: "غير صحيح. التضيق المتجانس يسبب إقفاراً عضلياً؛ يعيد الجهاز الودي توجيه الدم انتقائياً بفضل تباين المستقبلات.",
            en: "Incorrect. Uniform constriction would cause muscle ischemia; sympathetic outflow selectively redistributes blood flow."
          }
        }
      ]
    }
  },

  // Step 4: Visual Explanation
  {
    id: 'pharm-mod4-les1-step4',
    stage: 'visual_explanation',
    phase: 'explain',
    type: 'explanation',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Görsel Açıklama: Gq ve Gs İkinci Haberci Çatallanması",
      ar: "شرح مرئي: تشعب المرسال الثاني بين Gq و Gs",
      en: "Visual Explanation: Gq vs Gs Second Messenger Bifurcation"
    },
    prompt: {
      tr: "İkinci haberci haritasını inceleyin: Alfa-1 Gq'ya, Beta-1 ve Beta-2 ise Gs'ye kenetlenir. PKA miyokard ve düz kasta nasıl zıt mekanik etkiler üretir?",
      ar: "افحص خريطة المرسال الثاني: يقترن ألفا-1 بـ Gq، بينما يقترن بيتا-1 وبيتا-2 بـ Gs. كيف ينتج PKA تأثيرات ميكانيكية متعاكسة في العضلة القلبية والملساء؟",
      en: "Examine the second messenger map: Alpha-1 couples to Gq, whereas Beta-1 and Beta-2 couple to Gs. How does PKA produce opposite mechanical effects in myocardium versus smooth muscle?"
    },
    hints: {
      nudge: {
        tr: "Her iki dokuda da cAMP artar ve PKA aktive olur. PKA her birinde hangi aşağı akış molekülünü fosforiller?",
        ar: "في كلا النسيجين يرتفع cAMP ويتفعل PKA. ما هو الجزيء المستهدف الذي يفسفره PKA في كل منهما؟",
        en: "Both tissues experience rising cAMP and active PKA. What downstream substrate does PKA phosphorylate in each?"
      },
      clue: {
        tr: "Kalp kasılması kalsiyum girişine bağlıdır; düz kas tonusu ise Miyozin Hafif Zincir Kinazına (MLCK) bağlıdır.",
        ar: "يعتمد انقباض القلب على دخول الكالسيوم؛ بينما تعتمد مقوية العضلة الملساء على كيناز سلاسل الميوزين الخفيفة (MLCK).",
        en: "Look at the contractile machinery: myocardium requires calcium influx, whereas smooth muscle tone depends on MLCK."
      },
      solution: {
        tr: "PKA miyositlerde L-tipi Ca2+ kanallarını fosforilleyerek kasılmayı artırır; düz kasta ise MLCK'yi inaktive ederek gevşeme sağlar.",
        ar: "يفسفر PKA قنوات الكالسيوم L في القلب معززاً الانقباض، لكنه يفسفر ويثبط MLCK في العضلات الملساء محدثاً الارتخاء.",
        en: "PKA enhances L-type Ca2+ channel opening in cardiomyocytes, but phosphorylates and inhibits MLCK in smooth muscle, causing relaxation."
      }
    },
    conceptCheck: {
      question: {
        tr: "PKA miyokard ve damar düz kasında neden zıt mekanik yanıtlara yol açar?",
        ar: "لماذا يسبب PKA استجابات ميكانيكية متعاكسة بين العضلة القلبية والملساء؟",
        en: "Why does PKA mediate opposite mechanical responses in myocardium versus smooth muscle?"
      },
      options: [
        {
          id: 'opt-l7-s4-1',
          isCorrect: true,
          text: {
            tr: "Kardiyak miyositlerde PKA L-tipi Ca2+ kanallarını fosforiller (kasılmayı artırır); düz kasta ise MLCK'yi fosforilleyip inhibe ederek gevşeme sağlar.",
            ar: "في الخلايا القلبية، يفسفر PKA قنوات الكالسيوم L (معززاً الانقباض)؛ وفي العضلة الملساء، يفسفر ويثبط MLCK (محدثاً الارتخاء).",
            en: "In cardiac myocytes, PKA phosphorylates L-type Ca2+ channels (enhancing contraction); in smooth muscle, PKA phosphorylates and inhibits MLCK (producing relaxation)."
          },
          feedback: {
            tr: "Doğru. PKA dokuya özgü substratları hedefler: kalpte kalsiyum girişini artırır, düz kasta MLCK'yi inaktive eder.",
            ar: "صحيح. يستهدف PKA ركائز نسيجية نوعية: يزيد دخول الكالسيوم في القلب، ويثبط MLCK في العضلة الملساء.",
            en: "Correct. PKA phosphorylation has tissue-specific substrates: activates cardiac calcium entry, but inactivates smooth muscle MLCK."
          }
        },
        {
          id: 'opt-l7-s4-2',
          isCorrect: false,
          text: {
            tr: "Hem kardiyak hem düz kasta PKA, aktini doğrudan fosforilleyerek filamentleri çapraz bağlar ve aktif kasılmaya zorlar.",
            ar: "في كل من العضلة القلبية والملساء، يفسفر PKA الأكتين مباشرة لربط الخيوط وفرض انقباض نشط.",
            en: "In both cardiac and smooth muscle, PKA directly phosphorylates actin to cross-link filaments and force active contraction."
          },
          feedback: {
            tr: "Yanlış. Düz kas kasılması kalsiyum-kalmodulin ile MLCK aktivasyonuna bakar; PKA MLCK'yi inhibe ederek gevşetir.",
            ar: "غير صحيح. يتطلب انقباض العضلة الملساء تفعيل MLCK عبر الكالسيوم؛ وفسفرة PKA تثبط MLCK مسببة الارتخاء.",
            en: "Incorrect. Smooth muscle contraction requires MLCK activation by calcium-calmodulin; PKA phosphorylation inhibits MLCK, causing relaxation."
          }
        },
        {
          id: 'opt-l7-s4-3',
          isCorrect: false,
          text: {
            tr: "Kardiyak hücrelerde Gs troponini doğrudan aktive eder; damar düz kasında ise Gs voltaj kapılı sodyum kanallarını doğrudan açar.",
            ar: "في الخلايا القلبية، ينشط Gs التروponin مباشرة؛ وفي العضلة الملساء الوعائية، يفتح Gs قنوات الصوديوم المبوبة بالجهد مباشرة.",
            en: "In cardiac cells, Gs activates troponin directly; in vascular smooth muscle, Gs directly opens voltage-gated sodium channels."
          },
          feedback: {
            tr: "Yanlış. Gs adenilat siklaz ve cAMP/PKA üzerinden etki eder; troponin veya sodyum kanallarına doğrudan bağlanmaz.",
            ar: "غير صحيح. يعمل Gs عبر محلقة الأدينيلات و cAMP/PKA؛ ولا يرتبط مباشرة بالتروبونين أو قنوات الصوديوم.",
            en: "Incorrect. Gs acts through adenylyl cyclase and cAMP/PKA; it does not directly bind troponin or sodium channels."
          }
        }
      ]
    }
  },

  // Step 5: Interactive Artifact (ReceptorLigandMatcher) - keep existing widget config intact
  null, // will be preserved and hints added

  // Step 6: Guided Discovery
  {
    id: 'pharm-mod4-les1-step6',
    stage: 'guided_discovery',
    phase: 'explain',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Rehberli Keşif: Presinaptik Alfa-2 Otoreseptör Freni",
      ar: "استكشاف موجه: كابح مستقبل ألفا-2 الذاتي قبل المشبكي",
      en: "Guided Discovery: Presynaptic Alpha-2 Autoreceptor Brake"
    },
    prompt: {
      tr: "Sempatik sinaptik aralıkta biriken noradrenalin, hangi fizyolojik otoreseptör mekanizmasıyla aşırı nörotransmiter salınımını durdurur?",
      ar: "عندما يتراكم النورإبينفرين في الشق المشبكي الودي، ما هي آلية المستقبل الذاتي الفسيولوجية التي توقف التحرر المفرط للناقل؟",
      en: "When exocytosed norepinephrine accumulates in the sympathetic synaptic cleft, what physiological autoreceptor mechanism halts excessive neurotransmitter release?"
    },
    hints: {
      nudge: {
        tr: "Hedef dokuda değil, presinaptik sinir ucunda bulunan adrenerjik reseptör alt tipini düşünün.",
        ar: "فكر في النمط الفرعي للمستقبلات الأدرينالينية الموجود على النهاية العصبية قبل المشبكية لا النسيج الهدف.",
        en: "Think about which adrenoceptor subtype is located on the presynaptic nerve ending rather than the target tissue."
      },
      clue: {
        tr: "Bu reseptör inhibitör G-proteinine (Gi) kenetlenir. Vezikül füzyonu için hangi iyon girişi şarttır?",
        ar: "يقترن هذا المستقبل ببروتين G التثبيطي (Gi). ما هو التدفق الأيوني الإلزامي لاندماج الحويصلات؟",
        en: "This receptor couples to an inhibitory G-protein (Gi). What ion influx is mandatory for vesicle fusion?"
      },
      solution: {
        tr: "Presinaptik alfa-2 reseptörleri Gi'ye kenetlenir, cAMP'yi düşürür ve N-tipi kalsiyum kanallarını kapatarak ekzositozu durdurur.",
        ar: "تقترن مستقبلات ألفا-2 قبل المشبكية بـ Gi، خافضة cAMP ومغلقة قنوات الكالسيوم N لوقف اندماج الحويصلات وإفرازها.",
        en: "Presynaptic alpha-2 receptors couple to Gi, reducing cAMP and blocking N-type calcium channels to halt exocytosis."
      }
    },
    conceptCheck: {
      question: {
        tr: "Presinaptik alfa-2 otoreseptörleri noradrenalin salınımını nasıl inhibe eder?",
        ar: "كيف تثبط مستقبلات ألفا-2 الذاتية قبل المشبكية تحرر النورإبينفرين؟",
        en: "How do presynaptic alpha-2 autoreceptors inhibit further norepinephrine release?"
      },
      options: [
        {
          id: 'opt-l7-s6-1',
          isCorrect: true,
          text: {
            tr: "Presinaptik alfa-2 reseptörleri Gi'ye kenetlenir, adenilat siklazı inhibe eder ve N-tipi Ca2+ kanallarını kapatarak vezikül ekzositozunu durdurur.",
            ar: "تقترن مستقبلات ألفا-2 قبل المشبكية بـ Gi، مثبطة محلقة الأدينيلات ومغلقة قنوات الكالسيوم N لوقف اندماج الحويصلات.",
            en: "Presynaptic alpha-2 receptors couple to Gi, inhibiting adenylyl cyclase and closing N-type Ca2+ channels to block vesicle exocytosis."
          },
          feedback: {
            tr: "Doğru. Presinaptik alfa-2 reseptörleri fizyolojik bir negatif geri bildirim frenidir: Gi kalsiyum girişini keserek ekzositozu bitirir.",
            ar: "صحيح. تعمل مستقبلات ألفا-2 قبل المشبكية ككابح تلقيم راجع سلبي: يقطع Gi دخول الكالسيوم منهياً الإفراز الحويصلي.",
            en: "Correct. Presynaptic alpha-2 receptors act as a physiological negative feedback brake: Gi lowers cAMP and halts Ca2+ influx."
          }
        },
        {
          id: 'opt-l7-s6-2',
          isCorrect: false,
          text: {
            tr: "Postsinaptik alfa-2 reseptörleri beta-arrestini çağırarak tüm postsinaptik adrenerjik reseptörleri hücre içine alır ve yanıtı sonlandırır.",
            ar: "تستدعي مستقبلات ألفا-2 بعد المشبكية بيتا-أريستين لبلعمة جميع المستقبلات بعد المشبكية، منهية الاستجابة.",
            en: "Postsynaptic alpha-2 receptors recruit beta-arrestin to internalize all postsynaptic adrenoceptors, ending the response."
          },
          feedback: {
            tr: "Yanlış. Salınımın negatif geri bildirim kontrolü postsinaptik reseptör internalizasyonuyla değil, presinaptik otoreseptörlerle sağlanır.",
            ar: "غير صحيح. يحدث التلقيم الراجع السلبي المانع للتحرر على النهاية قبل المشبكية عبر مستقبلات ذاتية لا عبر البلعمة بعد المشبكية.",
            en: "Incorrect. Negative feedback regulation of release occurs on the presynaptic terminal via autoreceptors, not via postsynaptic internalization."
          }
        },
        {
          id: 'opt-l7-s6-3',
          isCorrect: false,
          text: {
            tr: "Alfa-2 presinaptik kalsiyum kanallarını etkilemeksizin, geri alımı hızlandırmak için noradrenalin taşıyıcısını (NET) uyarır.",
            ar: "يحفز ألفا-2 ناقل النورإبينفرين (NET) لتسريع إعادة الالتقاط، دون التأثير على قنوات الكالسيوم قبل المشبكية.",
            en: "Alpha-2 stimulates the norepinephrine transporter (NET) to accelerate reuptake, without affecting presynaptic calcium channels."
          },
          feedback: {
            tr: "Yanlış. NET sodyum bağımlı bir taşıyıcıdır; alfa-2 ise spesifik olarak voltaj kapılı kalsiyum kanallarını kapatarak ekzositozu durdurur.",
            ar: "غير صحيح. ناقل NET يعتمد على الصوديوم مستقلاً عن تأشير Gi؛ يغلق ألفا-2 قنوات الكالسيوم المعتمدة على الفولتية ليوقف الإفراز.",
            en: "Incorrect. NET is a secondary active sodium-dependent symporter; alpha-2 specifically closes voltage-gated calcium channels."
          }
        }
      ]
    }
  },

  // Step 7: Formal Explanation
  {
    id: 'pharm-mod4-les1-step7',
    stage: 'formal_explanation',
    phase: 'explain',
    type: 'explanation',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Biçimsel Açıklama: Kanonik Adrenerjik Reseptör Sınıflandırması",
      ar: "شرح رسمي: التصنيف المعياري للمستقبلات الأدرينالينية",
      en: "Formal Explanation: Canonical Adrenoceptor Classification"
    },
    prompt: {
      tr: "Kanonik adrenerjik reseptör tablosunu inceleyin. Hangi eşleştirme bir reseptör alt tipini, primer G-proteinini ve klinik fizyolojik etkisini doğru gösterir?",
      ar: "راجع جدول المستقبلات الأدرينالينية. أي اقتران يربط بدقة بين نمط المستقبل، وبروتينه المقترن G، وتأثيره الفسيولوجي السريري؟",
      en: "Review the canonical adrenoceptor table. Which pairing correctly maps an adrenoceptor subtype to its primary G-protein transducer and clinical physiological action?"
    },
    hints: {
      nudge: {
        tr: "G-protein eşleşme kuralını hatırlayın: alfa-1 (Gq), alfa-2 (Gi), beta-1/2/3 (Gs).",
        ar: "تذكر قاعدة اقتران بروتينات G: ألفا-1 (Gq)، ألفا-2 (Gi)، وبيتا-1/2/3 (Gs).",
        en: "Remember the G-protein pairing mnemonic: alpha-1 (Gq), alpha-2 (Gi), beta-1/2/3 (Gs)."
      },
      clue: {
        tr: "Beta-1 reseptörleri kalpte ve böbrekte bulunur; Gs üzerinden cAMP artışı yaratır.",
        ar: "توجد مستقبلات بيتا-1 في القلب والكلية؛ وتحدث زيادة في cAMP عبر بروتين Gs.",
        en: "Beta-1 receptors reside in the heart and kidneys; they elevate cAMP via Gs."
      },
      solution: {
        tr: "Beta-1 Gs'ye kenetlenir; miyokardiyal inotropi/kronotropiyi artırır ve jukstaglomerüler hücrelerden renin salınımını uyarır.",
        ar: "يقترن بيتا-1 بـ Gs؛ معززاً قلوصية وسرعة القلب ومحفزاً تحرر الرينين من الخلايا المجاورة للكبيبات الكلوية.",
        en: "Beta-1 (Gs): Increases cardiac inotropy/chronotropy and triggers renin release from renal juxtaglomerular cells."
      }
    },
    conceptCheck: {
      question: {
        tr: "Hangi adrenerjik reseptör eşleştirmesi G-proteini ve fizyolojik etkisiyle tamamen doğrudur?",
        ar: "أي اقتران للمستقبلات الأدرينالينية صحيح تماماً مع بروتين G وتأثيره الفسيولوجي؟",
        en: "Which adrenoceptor pairing is fully accurate regarding its G-protein and physiological response?"
      },
      options: [
        {
          id: 'opt-l7-s7-1',
          isCorrect: true,
          text: {
            tr: "Beta-1 (Gs): Kardiyak inotropi/kronotropiyi artırır ve renal jukstaglomerüler hücrelerden renin salınımını tetikler.",
            ar: "بيتا-1 (Gs): يزيد قلوصية وسرعة القلب ويحفز تحرر الرينين من الخلايا المجاورة للكبيبات الكلوية.",
            en: "Beta-1 (Gs): Increases cardiac inotropy/chronotropy and triggers renin release from renal juxtaglomerular cells."
          },
          feedback: {
            tr: "Doğru. Beta-1 miyokard ve böbrek jukstaglomerüler aparatında Gs ile cAMP'yi artırarak kasılmayı ve renin salgısını uyarır.",
            ar: "صحيح. يقترن بيتا-1 بـ Gs في القلب والكلى لزيادة cAMP وتحفيز القلوصية وإفراز الرينين.",
            en: "Correct. Beta-1 couples to Gs in myocardium and juxtaglomerular apparatus, elevating cAMP to boost contractility and renin release."
          }
        },
        {
          id: 'opt-l7-s7-2',
          isCorrect: false,
          text: {
            tr: "Alfa-1 (Gi): Damar tonusunu inhibe ederek bronş dilatasyonuna ve sistemik postural hipotansiyona yol açar.",
            ar: "ألفا-1 (Gi): يثبط المقوية الوعائية، مسبباً توسعاً شُعبياً وهبوط ضغط انتصابي جهازي.",
            en: "Alpha-1 (Gi): Inhibits vascular tone, causing bronchial dilation and systemic postural hypotension."
          },
          feedback: {
            tr: "Yanlış. Alfa-1 Gi'ye değil Gq'ya kenetlenir ve damar düz kasını kuvvetle kasarak tansiyonu yükseltir.",
            ar: "غير صحيح. يقترن ألفا-1 بـ Gq (وليس Gi) ويسبب تضيقاً وعائياً عاتياً رافعاً ضغط الدم.",
            en: "Incorrect. Alpha-1 couples to Gq (not Gi) and causes intense vascular smooth muscle constriction, raising blood pressure."
          }
        },
        {
          id: 'opt-l7-s7-3',
          isCorrect: false,
          text: {
            tr: "Beta-2 (Gq): Fosfolipaz C'yi aktive ederek hava yolu düz kas kasılmasına ve astım krizine yol açar.",
            ar: "بيتا-2 (Gq): ينشط فوسفوليباز C ليحفز انقباض العضلات الملساء في المسالك التنفسية وتفاقم الربو.",
            en: "Beta-2 (Gq): Activates phospholipase C to trigger airway smooth muscle contraction and asthma exacerbation."
          },
          feedback: {
            tr: "Yanlış. Beta-2 Gs'ye kenetlenir ve cAMP'yi artırarak bronş düz kasını gevşetir; bu nedenle beta-2 agonistleri astımda kullanılır.",
            ar: "غير صحيح. يقترن بيتا-2 بـ Gs رافعاً cAMP ليرخي عضلات الشعب الملساء، ولهذا تستخدم منبهات بيتا-2 لعلاج الربو.",
            en: "Incorrect. Beta-2 couples to Gs (not Gq); it increases cAMP to relax airway smooth muscle, which is why agonists treat asthma."
          }
        }
      ]
    }
  },

  // Step 8: Concept Check
  {
    id: 'pharm-mod4-les1-step8',
    stage: 'concept_check',
    phase: 'practice',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Kavram Kontrolü: Astımlı Hastalarda Propranolol Tehlikesi",
      ar: "تحقق مفاهيمي: خطر البروبرانولول على مرضى الربو",
      en: "Concept Check: Propranolol Hazard in Asthmatic Patients"
    },
    prompt: {
      tr: "Bir astım hastasına non-selektif beta-bloker propranolol verilirse, hangi moleküler olay yaşamı tehdit eden bronkospazmı tetikler?",
      ar: "إذا تلقى مريض ربو حاصر بيتا غير الانتقائي بروبرانولول، ما هو الحدث الجزيئي الدقيق الذي يثير تشنجاً قصبياً مهدداً للحياة؟",
      en: "If an asthmatic patient receives the non-selective beta-blocker propranolol, what precise molecular event precipitates life-threatening bronchospasm?"
    },
    hints: {
      nudge: {
        tr: "Propranolol non-selektif bir antagonisttir. İnsan hava yolu düz kasında hangi beta alt tipi baskındır?",
        ar: "البروبرانولول حاصر غير انتقائي. أي نمط فرعي لبيتا يسود في العضلات الملساء للمسالك التنفسية؟",
        en: "Propranolol is a non-selective antagonist. Which beta subtype dominates in human airway smooth muscle?"
      },
      clue: {
        tr: "Hava yolu düz kası, bazal kolinerjik tonusa karşı gevşek kalabilmek için beta-2 (Gs/cAMP) sinyaline güvenir.",
        ar: "تعتمد العضلات الملساء التنفسية على تأشير بيتا-2 (Gs/cAMP) لتبقى مرتخية في وجه المقوية الكولينية.",
        en: "Airway smooth muscle depends on beta-2 signaling (via Gs and cAMP) to stay relaxed against baseline cholinergic tone."
      },
      solution: {
        tr: "Bronşiyal beta-2 reseptörlerinin bloke edilmesi hücre içi cAMP'yi düşürür, PKA'yı kapatır ve engelsiz bronkokonstriksiyona yol açar.",
        ar: "يحصر البروبرانولول مستقبلات بيتا-2 الشعبية، خافضاً cAMP ومثبطاً PKA، مما يسمح بحدوث تضيق قصبي غير معارض.",
        en: "Blocking bronchial beta-2 receptors drops intracellular cAMP, inactivates PKA, and permits unopposed bronchoconstriction."
      }
    },
    conceptCheck: {
      question: {
        tr: "Propranolol astım hastalarında neden ölümcül bronkospazma yol açabilir?",
        ar: "لماذا يمكن أن يسبب البروبرانولول تشنجاً قصبياً قاتلاً لدى مرضى الربو؟",
        en: "Why can propranolol trigger fatal bronchospasm in patients with asthma?"
      },
      options: [
        {
          id: 'opt-l7-s8-1',
          isCorrect: true,
          text: {
            tr: "Propranolol hava yolu beta-2 reseptörlerini yarışmalı bloke eder, bazal cAMP'yi düşürür ve koruyucu bronkodilatör tonusu ortadan kaldırır.",
            ar: "يحصر البروبرانولول تنافسياً مستقبلات بيتا-2 الشعبية، خافضاً cAMP القاعدي ومزيلاً مقوية التوسع القصبي الحامية.",
            en: "Propranolol competitively blocks airway beta-2 receptors, decreasing basal cAMP and removing the protective bronchodilatory tone."
          },
          feedback: {
            tr: "Doğru. Non-selektif beta-blokerler hava yolundaki beta-2 reseptörlerini bloke ederek sempatik bronkodilatasyon güvencesini yıkar.",
            ar: "صحيح. تحصر حاصرات بيتا غير الانتقائية مستقبلات بيتا-2 التنفسية، مدمرة صمام الأمان الموسع للشعب.",
            en: "Correct. Non-selective beta-blockers block airway beta-2 receptors, abolishing bronchodilatory tone."
          }
        },
        {
          id: 'opt-l7-s8-2',
          isCorrect: false,
          text: {
            tr: "Propranolol bronş bezlerindeki muskarinik M3 reseptörlerinde doğrudan agonist gibi davranarak aşırı mukus salgısını tetikler.",
            ar: "يعمل البروبرانولول كمنبه مباشر لمستقبلات M3 الموسكارينية في الغدد الشعبية، محفزاً فرط الإفراز المخاطي.",
            en: "Propranolol acts as a direct agonist at muscarinic M3 receptors on bronchial glands, stimulating mucus hypersecretion."
          },
          feedback: {
            tr: "Yanlış. Propranololün muskarinik reseptörlerde agonist afinitesi yoktur; spazm beta-2 gevşeme tonusunun kaybından doğar.",
            ar: "غير صحيح. ليس للبروبرانولول ألفة تنبيهية للمستقبلات الموسكارينية؛ ينجم التشنج عن فقدان مقوية الارتخاء بـ بيتا-2.",
            en: "Incorrect. Propranolol has no agonist affinity for muscarinic receptors; bronchospasm is caused by loss of beta-2 mediated dilation."
          }
        },
        {
          id: 'opt-l7-s8-3',
          isCorrect: false,
          text: {
            tr: "Propranolol, normalde hava yolunda histamin salınımını baskılayan bronşiyal beta-1 reseptörlerini selektif olarak bloke eder.",
            ar: "يحصر البروبرانولول انتقائياً مستقبلات بيتا-1 الشعبية التي تثبط عادة تحرر الهيستامين في القصبات.",
            en: "Propranolol selectively blocks bronchial beta-1 receptors, which normally suppress airway histamine release."
          },
          feedback: {
            tr: "Yanlış. Hava yolu düz kası esas olarak beta-2 ifade eder, beta-1 değil. Bu nedenle kardiyoselektif beta-1 blokerler tercih edilir.",
            ar: "غير صحيح. تعبر العضلات الملساء التنفسية غالباً عن بيتا-2 وليس بيتا-1؛ ولهذا تفضل حاصرات بيتا-1 القلبية النوعية.",
            en: "Incorrect. Airway smooth muscle predominantly expresses beta-2, not beta-1. Cardioselective beta-1 blockers are preferred to spare airways."
          }
        }
      ]
    }
  },

  // Step 9: Application (Pheochromocytoma)
  {
    id: 'pharm-mod4-les1-step9',
    stage: 'application',
    phase: 'practice',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Klinik Vaka: Feokromositomada Blokaj Sıralaması",
      ar: "حالة سريرية: تسلسل الحصر في ورم القواتم",
      en: "Clinical Vignette: Sequencing Blockade in Pheochromocytoma"
    },
    prompt: {
      tr: "Feokromositoma hastasında sinüs taşikardisi gelişir. Bir asistan alfa-blokaj sağlamadan ÖNCE IV propranolol uygular. Tansiyon neden aniden 260/150 mmHg'ye fırlar?",
      ar: "مريض ورم القواتم أصيب بتسرع قلب جيبي. أعطى الطبيب بروبرانولول وريدياً قبل تثبيت حصر ألفا. لماذا قفز ضغط الدم فجأة إلى 260/150 مم زئبق؟",
      en: "A pheochromocytoma patient develops sinus tachycardia. A resident administers IV propranolol BEFORE establishing alpha-blockade. Why does BP surge to 260/150 mmHg?"
    },
    hints: {
      nudge: {
        tr: "Feokromositoma tedavisinin temel kuralını hatırlayın: Alfa blokaj daima Beta blokajdan ÖNCE gelmelidir ('Önce A, Sonra B').",
        ar: "تذكر القاعدة الذهبية في علاج ورم القواتم: يجب أن يسبق حصر ألفا دائماً حصر بيتا ('A قبل B').",
        en: "Remember the cardinal rule of pheochromocytoma management: Alpha blockade MUST always precede Beta blockade ('A before B')."
      },
      clue: {
        tr: "Dolaşımdaki epinefrin hem alfa-1 (büzücü) hem beta-2 (genişletici) uyarır. Yalnızca beta-2'yi silerseniz ne olur?",
        ar: "ينبه الإبينفرين كلاً من ألفا-1 (مضيق) وبيتا-2 (موسع). ماذا يحدث للمقاومة عندما تلغي مكون بيتا-2 فقط؟",
        en: "Epinephrine stimulates both alpha-1 (vasoconstriction) and beta-2 (vasodilation). What happens when you remove only the beta-2 component?"
      },
      solution: {
        tr: "Beta-2 vazodilatasyonunun ortadan kalkması, aşırı dolaşan katekolaminlerin damar alfa-1 reseptörlerini tamamen engelsiz uyarmasına yol açar.",
        ar: "إلغاء توسع بيتا-2 الوعائي يترك فيض الكاتيكولامينات الجائلة ينبه مستقبلات ألفا-1 الوعائية دون معارضة، مسبباً أزمة فرط ضغط عاتية.",
        en: "Eliminating beta-2 vasodilation unmasks massive, unopposed alpha-1 vascular constriction from circulating catecholamines, triggering a hypertensive emergency."
      }
    },
    conceptCheck: {
      question: {
        tr: "Feokromositomada alfa-blokaj öncesi beta-bloker verilmesi neden hipertansif krize yol açar?",
        ar: "لماذا يؤدي إعطاء حاصر بيتا قبل حصر ألفا في ورم القواتم إلى أزمة فرط ضغط دموي؟",
        en: "Why does administering a beta-blocker prior to alpha-blockade precipitate a hypertensive crisis in pheochromocytoma?"
      },
      options: [
        {
          id: 'opt-l7-s9-1',
          isCorrect: true,
          text: {
            tr: "Beta-2 vazodilatasyonunun bloke edilmesi, dolaşımdaki katekolaminlerin damar alfa-1 reseptörlerini tamamen engelsiz uyarmasına yol açarak feci vazokonstriksiyonu tetikler.",
            ar: "إلغاء توسع بيتا-2 يترك الكاتيكولامينات الجائلة تنبه مستقبلات ألفا-1 الوعائية دون أي معارضة، مسببة تضيقاً وعائياً كارثياً.",
            en: "Blocking beta-2 vasodilation leaves circulating catecholamines to stimulate vascular alpha-1 receptors completely unopposed, triggering catastrophic vasoconstriction."
          },
          feedback: {
            tr: "Doğru. Ölümcül feokromositoma tuzağı: beta bloker beta-2 gevşemesini siler ve devasa tümör katekolaminleri alfa-1'i tek başına kasarak krize sokar.",
            ar: "صحيح. فخ ورم القواتم القاتل: يزيل حاصر بيتا صمام أمان التوسع الوعائي، مما يتيح لكوكبة الكاتيكولامينات إحداث تضيق وعائي ألفا-1 عاتٍ دون معارضة.",
            en: "Correct. The lethal pheochromocytoma trap: beta-blockers remove the beta-2 vasodilatory buffer, allowing catecholamines to drive unmitigated alpha-1 vasoconstriction."
          }
        },
        {
          id: 'opt-l7-s9-2',
          isCorrect: false,
          text: {
            tr: "Propranolol tümör membranını geçerek tirozin hidroksilazı doğrudan uyarır ve saniyeler içinde katekolamin sentezini iki katına çıkarır.",
            ar: "يعبر البروبرانولول غشاء الورم ليحفز تيروزين هيدروكسيلاز مباشرة، مضاعفاً اصطناع الكاتيكولامينات خلال ثوانٍ.",
            en: "Propranolol crosses the tumor membrane to directly stimulate tyrosine hydroxylase, doubling catecholamine synthesis within seconds."
          },
          feedback: {
            tr: "Yanlış. Propranolol tirozin hidroksilazı uyarmaz; kriz tamamen hemodinamiktir ve beta-2 tamponunun kaybından kaynaklanır.",
            ar: "غير صحيح. لا يحفز البروبرانولول اصطناع الكاتيكولامينات؛ بل الأزمة ديناميكية دموية بحتة ناجمة عن حصر توسع بيتا-2.",
            en: "Incorrect. Propranolol does not stimulate tyrosine hydroxylase; the surge is purely hemodynamic due to unmasked vascular alpha-1 constriction."
          }
        },
        {
          id: 'opt-l7-s9-3',
          isCorrect: false,
          text: {
            tr: "Propranolol kaynaklı bradikardi, sempatik sinirleri aşırı seviyede ateşleyen şiddetli bir baroreseptör refleksini tetikler.",
            ar: "يؤدي بطء القلب الناجم عن البروبرانولول إلى إطلاق منعكس مستقبِلات الضغط الشديد الذي ينشط الأعصاب الودية إلى أقصى حد.",
            en: "Propranolol-induced bradycardia triggers an intense baroreceptor reflex that fires sympathetic nerves to extreme levels."
          },
          feedback: {
            tr: "Yanlış. Baroreseptör refleksi tansiyon düşüşünde ateşlenir; burada dolaşımdaki katekolaminler zaten doymuştur ve beta-2 tamponu yok olmuştur.",
            ar: "غير صحيح. يستجيب منعكس الضغط لتغيرات الضغط الشرياني وليس معدل النبض؛ والأزمة ناتجة عن فقدان التوسع الوعائي بـ بيتا-2.",
            en: "Incorrect. The baroreceptor reflex responds to arterial pressure drops; the crisis stems entirely from losing beta-2 vasodilation."
          }
        }
      ]
    }
  },

  // Step 10: Retrieval
  {
    id: 'pharm-mod4-les1-step10',
    stage: 'retrieval',
    phase: 'practice',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Geri Çağırma: Alfa-1 Sinyal Kaskadı",
      ar: "استرجاع: شلال تأشير ألفا-1",
      en: "Retrieval: Alpha-1 Signaling Cascade"
    },
    prompt: {
      tr: "Hangi ikinci haberci dizisi, alfa-1 adrenerjik reseptör aktivasyonunu takiben vazokonstriksiyonu tetikleyen moleküler kaskadı doğru sıralar?",
      ar: "أي تسلسل للمرسال الثاني يوضح بدقة الشلال الجزيئي المحفز للتضيق الوعائي عقب تفعيل مستقبل ألفا-1 الأدريناليني؟",
      en: "Which second messenger sequence correctly outlines the molecular cascade triggering vasoconstriction following alpha-1 adrenergic receptor activation?"
    },
    hints: {
      nudge: {
        tr: "Alfa-1 reseptörleri heterotrimerik Gq proteinine kenetlenir.",
        ar: "تقترن مستقبلات ألفا-1 ببروتين Gq ثلاثي الوحدات المغايرة.",
        en: "Alpha-1 receptors couple to the Gq heterotrimeric G-protein."
      },
      clue: {
        tr: "Gq proteini membrana bağlı hangi enzimi uyararak PIP2'yi iki haberciye (IP3 ve DAG) böler?",
        ar: "ما هو الإنزيم الغشائي الذي ينشطه Gq ليشطر PIP2 إلى مرسالين (IP3 و DAG)؟",
        en: "What membrane-bound enzyme does Gq stimulate to cleave PIP2 into IP3 and DAG?"
      },
      solution: {
        tr: "Gq Fosfolipaz C'yi (PLC) aktive eder, IP3 endoplazmik retikulumdan Ca2+ salar, Ca2+-kalmodulin MLCK'yi aktive ederek kasılma yapar.",
        ar: "ينشط Gq إنزيم فوسفوليباز C مشكلاً IP3 الذي يحرر الكالسيوم؛ وينشط مركب الكالسيوم-كالموديولين إنزيم MLCK ليحدث الانقباض.",
        en: "Gq activates Phospholipase C (PLC), producing IP3 (mobilizing ER Ca2+) and DAG; calcium-calmodulin activates MLCK to contract smooth muscle."
      }
    },
    conceptCheck: {
      question: {
        tr: "Alfa-1 vazokonstriksiyonunun hücre içi iletim basamakları hangisidir?",
        ar: "ما هي المراحل الخلوية لتأشير التضيق الوعائي عبر مستقبلات ألفا-1؟",
        en: "What is the intracellular signaling sequence mediating alpha-1 vasoconstriction?"
      },
      options: [
        {
          id: 'opt-l7-s10-1',
          isCorrect: true,
          text: {
            tr: "Gq aktivasyonu -> Fosfolipaz C (PLC) -> IP3 ve DAG -> IP3 kapılı ER Ca2+ salınımı -> Ca2+-kalmodulin MLCK'yi aktive eder -> Kasılma.",
            ar: "تفعيل Gq -> فوسفوليباز C -> تشكل IP3 وDAG -> تحرر Ca2+ من الشبكة الإندوبلازمية عبر IP3 -> كالمديولين ينشط MLCK -> انقباض.",
            en: "Gq activation -> Phospholipase C (PLC) -> IP3 and DAG -> IP3-gated ER Ca2+ release -> Ca2+-calmodulin activates MLCK -> Contraction."
          },
          feedback: {
            tr: "Doğru. Alfa-1 Gq ile PLC-beta'yı aktive eder, açığa çıkan IP3 kalsiyumu salarak kalmodulin ve MLCK ile kasılmayı başlatır.",
            ar: "صحيح. يقترن ألفا-1 بـ Gq لتنشيط PLC-بيتا، حيث يحرر IP3 الكالسيوم ليفعل الكالموديولين و MLCK مسبباً الانقباض.",
            en: "Correct. Alpha-1 couples to Gq to activate PLC-beta, generating IP3 to release calcium and stimulate MLCK via calmodulin."
          }
        },
        {
          id: 'opt-l7-s10-2',
          isCorrect: false,
          text: {
            tr: "Gs aktivasyonu -> Adenilat siklaz -> cAMP artışı -> Protein Kinaz A aktivasyonu -> Troponin fosforilasyonu -> Kasılma.",
            ar: "تفعيل Gs -> محلقة الأدينيلات -> ارتفاع cAMP -> تنشيط بروتين كيناز A -> فسفرة التروponin -> انقباض.",
            en: "Gs activation -> Adenylyl cyclase -> cAMP elevation -> Protein Kinase A activation -> Phosphorylation of troponin -> Contraction."
          },
          feedback: {
            tr: "Yanlış. Gs/cAMP/PKA düz kasta kasılma değil gevşeme yapar; ayrıca damar düz kasında troponin bulunmaz, kalmodulin bulunur.",
            ar: "غير صحيح. مسار Gs/cAMP/PKA يسبب الارتخاء في العضلة الملساء وليس الانقباض؛ كما تفتقر العضلة الملساء للتروبونين.",
            en: "Incorrect. Gs/cAMP/PKA produces smooth muscle relaxation (by inhibiting MLCK); smooth muscle lacks troponin, utilizing calmodulin instead."
          }
        },
        {
          id: 'opt-l7-s10-3',
          isCorrect: false,
          text: {
            tr: "Gi aktivasyonu -> Çözünür guanilat siklaz -> cGMP artışı -> Protein Kinaz G -> Miyozin defosforilasyonu -> Vazokonstriksiyon.",
            ar: "تفعيل Gi -> محلقة الغوانيلات الذوابة -> تدفق cGMP -> بروتين كيناز G -> نزع فسفرة الميوزين -> تضيق وعائي.",
            en: "Gi activation -> Soluble guanylyl cyclase -> cGMP surge -> Protein Kinase G -> Dephosphorylation of myosin -> Vasoconstriction."
          },
          feedback: {
            tr: "Yanlış. cGMP/PKG yolağı (NO ile uyarılır) vazokonstriksiyon değil vazodilatasyon yapar.",
            ar: "غير صحيح. يسبب مسار cGMP/PKG (المحفز بأكسيد النيتريك) توسعاً وعائياً وليس تضيقاً.",
            en: "Incorrect. The cGMP/PKG pathway causes vasodilation, not vasoconstriction. Alpha-1 signals through Gq and IP3/Ca2+."
          }
        }
      ]
    }
  },

  // Step 11: Connection
  {
    id: 'pharm-mod4-les1-step11',
    stage: 'connection',
    phase: 'integrate',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Bütünsel Bağlantı: Renal Beta-1 ve RAAS Entegrasyonu",
      ar: "ترابط شمولي: تكامل بيتا-1 الكلوي مع نظام RAAS",
      en: "Holistic Connection: Renal Beta-1 & RAAS Integration"
    },
    prompt: {
      tr: "Böbrek beta-1 adrenerjik reseptörleri, akut sempatik aktivasyonu kan basıncının uzun vadeli endokrin kontrolüne doğrudan nasıl bağlar?",
      ar: "كيف تربط مستقبلات بيتا-1 الأدرينالينية الكلوية مباشرة بين التنشيط الودي الحاد والتنظيم الصماوي طويل الأمد لضغط الدم؟",
      en: "How do renal beta-1 adrenoceptors directly link acute sympathetic nervous activation to long-term endocrine regulation of blood pressure?"
    },
    hints: {
      nudge: {
        tr: "Renal glomerülün afferent arteriyol duvarında bulunan özelleşmiş hücreleri düşünün.",
        ar: "فكر في الخلايا المتخصصة الموجودة في جدار الشريان الوارد للكبيبة الكلوية.",
        en: "Think about the specialized sensory cells situated in the afferent arteriolar wall of the renal glomerulus."
      },
      clue: {
        tr: "Bu jukstaglomerüler hücreler, anjiyotensinojen kaskadını başlatan proteolitik bir enzimi (renin) sentezler ve depolar.",
        ar: "تصنع وتخزن هذه الخلايا المجاورة للكبيبات إنزيماً حالاً للبروتين (الرينين) يطلق شلال الأنجيوتنسينوجين.",
        en: "These juxtaglomerular cells store and secrete an aspartic protease enzyme (renin) that initiates the angiotensinogen cascade."
      },
      solution: {
        tr: "Jukstaglomerüler beta-1 reseptörleri Gs/cAMP sinyaliyle kana renin salınmasını sağlar; renin RAAS yolağını aktive ederek tansiyonu yükseltir.",
        ar: "تحفز مستقبلات بيتا-1 المجاورة للكبيبات عبر Gs/cAMP إفراز الرينين في الدم؛ مما ينشط محور RAAS لرفع الضغط وحبس الحجم.",
        en: "Juxtaglomerular beta-1 receptors activate Gs/cAMP signaling, triggering the secretion of renin to drive the RAAS pathway."
      }
    },
    conceptCheck: {
      question: {
        tr: "Renal beta-1 reseptörleri sempatik sistemi RAAS yolağına nasıl entegre eder?",
        ar: "كيف تدمج مستقبلات بيتا-1 الكلوية الجهاز الودي بشلال RAAS؟",
        en: "How do renal beta-1 receptors integrate sympathetic activation into the RAAS cascade?"
      },
      options: [
        {
          id: 'opt-l7-s11-1',
          isCorrect: true,
          text: {
            tr: "Jukstaglomerüler hücrelerdeki beta-1 uyarımı renin salınımını tetikler; RAAS kaskadı anjiyotensin II ve aldosteron üreterek basıncı artırır.",
            ar: "يحفز تنبيه بيتا-1 في الخلايا المجاورة للكبيبات تحرر الرينين، منشطاً شلال RAAS لإنتاج أنجيوتنسين II والألدوستيرون.",
            en: "Beta-1 stimulation on juxtaglomerular cells triggers renin release, driving the RAAS cascade to produce angiotensin II and aldosterone."
          },
          feedback: {
            tr: "Doğru. Renal jukstaglomerüler hücreler beta-1 taşır; sempatik uyarım cAMP'yi artırıp renin salarak RAAS eksenini devreye sokar.",
            ar: "صحيح. تحمل الخلايا المجاورة للكبيبات مستقبلات بيتا-1؛ ينشط التنبيه الودي cAMP مفرزاً الرينين ومفعلاً محور RAAS.",
            en: "Correct. Renal juxtaglomerular cells express beta-1 receptors; sympathetic stimulation increases cAMP, releasing renin and activating RAAS."
          }
        },
        {
          id: 'opt-l7-s11-2',
          isCorrect: false,
          text: {
            tr: "Böbrek beta-1 reseptörleri, hormonal kaskadlardan bağımsız olarak proksimal tübül sodyum kanallarını doğrudan açar ve sodyumu geri emer.",
            ar: "تفتح مستقبلات بيتا-1 الكلوية قنوات الصوديوم في الأنابيب القريبة مباشرة، معيدة امتصاص الصوديوم بمعزل عن الهرمونات.",
            en: "Renal beta-1 receptors directly open proximal tubular sodium channels, reabsorbing sodium independently of hormonal cascades."
          },
          feedback: {
            tr: "Yanlış. Beta-1 reseptörleri tübüler iyon kanallarını doğrudan açmaz; aldosteron üretimini tetikleyen enzimatik renin salınımını yönetir.",
            ar: "غير صحيح. لا تفتح مستقبلات بيتا-1 قنوات الأنابيب مباشرة؛ بل تتحكم بإفراز الرينين الذي يحفز الألدوستيرون لاحقاً.",
            en: "Incorrect. Beta-1 receptors on juxtaglomerular cells control the enzymatic release of renin, which hormonally drives aldosterone downstream."
          }
        },
        {
          id: 'opt-l7-s11-3',
          isCorrect: false,
          text: {
            tr: "Böbrek beta-1 reseptörleri afferent arteriyolleri kasarak GFR'yi sıfırlar ve idrar üretimini tamamen durdurur.",
            ar: "تضيق مستقبلات بيتا-1 الكلوية الشريانات الواردة لإيقاف الترشيح الكبيبي وإلغاء إنتاج البول كلياً.",
            en: "Renal beta-1 receptors vasoconstrict afferent arterioles to shut down GFR and eliminate urine production entirely."
          },
          feedback: {
            tr: "Yanlış. Afferent arteriyol büzülmesi vasküler alfa-1 reseptörleri (Gq) ile olur, beta-1 ile değil.",
            ar: "غير صحيح. يتوسط التضيق الشرياني الوارد مستقبلات ألفا-1 الوعائية (Gq) وليس بيتا-1.",
            en: "Incorrect. Renal afferent arteriolar vasoconstriction is mediated by vascular alpha-1 receptors (Gq), not beta-1."
          }
        }
      ]
    }
  },

  // Step 12: Mastery Check (Transfer Challenge)
  {
    id: 'pharm-mod4-les1-step12',
    stage: 'mastery_check',
    phase: 'integrate',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Ustalık Sınavı: Katekolamin İlaç Profilleme",
      ar: "اختبار الإتقان: التنميط الدوائي للكاتيكولامينات",
      en: "Mastery Check: Catecholamine Drug Profiling"
    },
    prompt: {
      tr: "Üç bilinmeyen adrenerjik agonist değerlendiriliyor: A maddesi refleks bradikardiyle saf vazokonstriksiyon yapar; B maddesi minimal vasküler etkiyle inotropiyi artırır; C maddesi bronkodilatasyon ve taşikardi yapar. Reseptör profillerini belirleyin.",
      ar: "ثلاثة منبهات أدرينالينية مجهولة: المادة A تسبب تضيقاً وعائياً صرفاً مع بطء قلب انعكاسي؛ المادة B تزيد القلوصية دون تغير وعائي؛ المادة C تحدث توسعاً قصبياً وتسرع قلب. حدد انتقائيتها.",
      en: "Three unknown adrenergic agonists are evaluated: Agent A causes pure vasoconstriction with reflex bradycardia; Agent B increases inotropy with minimal vascular change; Agent C induces bronchodilation and tachycardia. Identify their receptor selectivity profiles."
    },
    hints: {
      nudge: {
        tr: "Hemodinamiği analiz edin: yoğun vazokonstriksiyon kan basıncını yükseltir ve karotis sinüsü baroreseptörlerini uyarır.",
        ar: "حلل الديناميكا الدموية: التضيق الوعائي العاتي يرفع الضغط الشرياني الوسطي، مما ينشط مستقبِلات الضغط السباتية.",
        en: "Analyze the hemodynamics: intense vasoconstriction raises mean arterial pressure, firing carotid sinus baroreceptors."
      },
      clue: {
        tr: "A maddesi Gq vasküler reseptörlerini (alfa-1); B maddesi miyokardiyal Gs reseptörlerini (beta-1); C maddesi ise hava yolu ve kalp Gs reseptörlerini uyarır.",
        ar: "تنبه المادة A مستقبلات Gq الوعائية (ألفا-1)؛ والمادة B مستقبلات Gs القلبية (بيتا-1)؛ والمادة C مستقبلات Gs في الشعب والقلب.",
        en: "Agent A stimulates Gq vascular receptors (alpha-1); Agent B stimulates myocardial Gs receptors (beta-1); Agent C stimulates both airway and cardiac Gs receptors."
      },
      solution: {
        tr: "Fenilefrin (Alfa-1) saf vazokonstriksiyon ve refleks bradikardi yapar; Dobutamin (Beta-1) kasılmayı artırır; İzoproterenol (Beta-1+Beta-2) bronkodilatasyon ve taşikardi yapar.",
        ar: "فينيل إفرين (ألفا-1) يسبب تضيقاً وعائياً مع بطء قلب انعكاسي؛ دوبوتامين (بيتا-1) يعزز القلوصية؛ إيزوبروتيرينول (بيتا-1 + بيتا-2) يوسع الشعب ويسرع القلب.",
        en: "Agent A: Alpha-1 selective (Phenylephrine); Agent B: Beta-1 selective (Dobutamine); Agent C: Non-selective Beta-1/Beta-2 agonist (Isoproterenol)."
      }
    },
    conceptCheck: {
      question: {
        tr: "A, B ve C maddelerinin adrenerjik reseptör seçicilik profilleri hangisinde doğru verilmiştir?",
        ar: "ما هي الملامح الصحيحة لانتقائية المستقبلات الأدرينالينية للمواد A و B و C؟",
        en: "Which mapping accurately describes the receptor selectivity profiles of Agents A, B, and C?"
      },
      options: [
        {
          id: 'opt-l7-s12-1',
          isCorrect: true,
          text: {
            tr: "A Maddesi: Selektif Alfa-1 agonisti (Fenilefrin); B Maddesi: Selektif Beta-1 agonisti (Dobutamin); C Maddesi: Non-selektif Beta-1/Beta-2 agonisti (İzoproterenol).",
            ar: "المادة A: منبه ألفا-1 انتقائي (فينيل إفرين)؛ المادة B: منبه بيتا-1 انتقائي (دوبوتامين)؛ المادة C: منبه بيتا-1/بيتا-2 غير انتقائي (إيزوبروتيرينول).",
            en: "Agent A: Selective Alpha-1 agonist (e.g., Phenylephrine); Agent B: Selective Beta-1 agonist (e.g., Dobutamine); Agent C: Non-selective Beta-1/Beta-2 agonist (e.g., Isoproterenol)."
          },
          feedback: {
            tr: "Doğru! Fenilefrin alfa-1 ile vazokonstriksiyon ve barorefleks bradikardi yapar; Dobutamin kardiyak beta-1'i seçer; İzoproterenol hem beta-1 hem beta-2'yi uyarır.",
            ar: "صحيح! فينيل إفرين يحدث تضيقاً وعائياً وبطء قلب انعكاسياً؛ دوبوتامين ينتقي بيتا-1 القلبي؛ إيزوبروتيرينول ينبه كلاً من بيتا-1 وبيتا-2.",
            en: "Correct! Agent A triggers alpha-1 vasoconstriction (reflex bradycardia); Agent B stimulates myocardial beta-1; Agent C stimulates both beta-2 and beta-1."
          }
        },
        {
          id: 'opt-l7-s12-2',
          isCorrect: false,
          text: {
            tr: "A Maddesi: Alfa-2 agonisti (Klonidin); B Maddesi: Beta-2 agonisti (Albuterol); C Maddesi: Non-selektif Alfa/Beta agonisti (Epinefrin).",
            ar: "المادة A: منبه ألفا-2 (كلونيدين)؛ المادة B: منبه بيتا-2 (ألبوتيرول)؛ المادة C: منبه ألفا/بيتا غير انتقائي (إبينفرين).",
            en: "Agent A: Alpha-2 agonist (Clonidine); Agent B: Beta-2 agonist (Albuterol); Agent C: Non-selective Alpha/Beta agonist (Epinephrine)."
          },
          feedback: {
            tr: "Yanlış. Klonidin santral sempatolitik etkiyle tansiyonu düşürür, akut periferik vazokonstriksiyon yapmaz. Albuterol ise beta-2 selektiftir.",
            ar: "غير صحيح. يخفض الكلونيدين الضغط بتثبيط التنبيه الودي المركزي ولا يسبب تضيقاً محيطياً حاداً. ألبوتيرول انتقائي لـ بيتا-2.",
            en: "Incorrect. Clonidine lowers pressure via central sympathetic outflow reduction. Albuterol is beta-2 selective and relaxes smooth muscle rather than augmenting inotropy."
          }
        },
        {
          id: 'opt-l7-s12-3',
          isCorrect: false,
          text: {
            tr: "A Maddesi: Selektif Beta-2 agonisti; B Maddesi: Non-selektif Alfa-bloker; C Maddesi: Selektif Alfa-1 agonisti.",
            ar: "المادة A: منبه بيتا-2 انتقائي؛ المادة B: حاصر ألفا غير انتقائي؛ المادة C: منبه ألفا-1 انتقائي.",
            en: "Agent A: Selective Beta-2 agonist; Agent B: Non-selective Alpha-blocker; Agent C: Selective Alpha-1 agonist."
          },
          feedback: {
            tr: "Yanlış. Beta-2 agonisti vazokonstriksiyon değil vazodilatasyon ve hipotansiyon yapar. Fenilefrin alfa-1 ile basıncı artırıp vagal deşarjı tetikler.",
            ar: "غير صحيح. يحدث منبه بيتا-2 توسعاً وعائياً وهبوط ضغط وليس تضيقاً وعائياً. الفينيل إفرين يرفع الضغط محفزاً تفريغ المبهم الانعكاسي.",
            en: "Incorrect. A beta-2 agonist produces vasodilation and hypotension, not vasoconstriction with reflex bradycardia."
          }
        }
      ]
    }
  }
];

// Apply updates to Lesson 07
function updateLesson07(filePath) {
  const lesson = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  lesson07Steps.forEach((newStepData, idx) => {
    if (idx === 4) {
      // Step 5: Preserve widget config, add hints
      const step5 = lesson.steps[4];
      step5.hints = [
        {
          tier: 1,
          tr: "Epinefrinin pozitif yüklü amin grubunu, katekol halkasını ve kiral hidroksilini inceleyin.",
          ar: "افحص مجموعة الأمين الموجبة وحلقة الكاتيكول والهيدروكسيل الفراغي في الإبينفرين.",
          en: "Examine epinephrine's positively charged amine, catechol ring, and chiral beta-hydroxyl group."
        },
        {
          tier: 2,
          tr: "Asp113 iyonik bağ için negatif karboksilat sağlar; Ser204 katekol ile H-bağı yapar; Phe290 aromatik istiflenme kurar.",
          ar: "يوفر Asp113 كربوكسيلات سالبة للرابط الأيوني؛ ويشكل Ser204 رابطاً هيدروجينياً؛ بينما يتيح Phe290 تكدساً عطرياً.",
          en: "Asp113 provides a carboxylate for ionic bonding; Ser204 H-bonds with catechol; Phe290 forms pi-stacking."
        },
        {
          tier: 3,
          tr: "Protonlanmış amini Asp113'e (iyonik), katekol OH'yi Ser204'e (H-bağı), aromatik halkayı Phe290'a (pi-pi) ve beta-OH'yi Asn293'e (H-bağı) kenetleyin.",
          ar: "اربط الأمين البروتوني بـ Asp113 (أيوني)، وهيدروكسيل الكاتيكول بـ Ser204 (هيدروجيني)، والحلقة بـ Phe290 (باي-باي)، وبيتا-OH بـ Asn293.",
          en: "Match protonated amine to Asp113 (ionic), catechol meta-OH to Ser204 (H-bond), aromatic ring to Phe290 (pi-pi), and beta-OH to Asn293 (H-bond)."
        }
      ];
      return;
    }

    const step = lesson.steps[idx];
    step.title = newStepData.title;
    step.prompt = newStepData.prompt;
    if (newStepData.hints) {
      step.hints = [
        { tier: 1, tr: newStepData.hints.nudge.tr, ar: newStepData.hints.nudge.ar, en: newStepData.hints.nudge.en },
        { tier: 2, tr: newStepData.hints.clue.tr, ar: newStepData.hints.clue.ar, en: newStepData.hints.clue.en },
        { tier: 3, tr: newStepData.hints.solution.tr, ar: newStepData.hints.solution.ar, en: newStepData.hints.solution.en }
      ];
    }
    step.conceptCheck = newStepData.conceptCheck;
    if (!step.config) step.config = {};
    step.config.options = JSON.parse(JSON.stringify(newStepData.conceptCheck.options));
    step.config.prompt = newStepData.prompt;
    step.config.title = newStepData.title;
  });

  fs.writeFileSync(filePath, JSON.stringify(lesson, null, 2), 'utf8');
  console.log('Successfully updated Lesson 07 at:', filePath);
}

// ============================================================================
// DATA FOR LESSON 08: pharm-mod4-les2
// ============================================================================
const lesson08Steps = [
  // Step 1: Hook (Atropine Paradox)
  {
    id: 'pharm-mod4-les2-step1',
    stage: 'hook',
    phase: 'explore',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Klinik Paradoks: Organofosfat Zehirlenmesinde Atropin Çıkmazı",
      ar: "المفارقة السريرية: مأزق الأتروبين في التسمم بالفوسفات العضوي",
      en: "Clinical Paradox: Organophosphate Poisoning & The Atropine Dilemma"
    },
    prompt: {
      tr: "Şiddetli organofosfat zehirlenmesi yaşayan tarım işçisine yüksek doz IV atropin veriliyor. Bradikardi ve tükürük salgısı düzeliyor ancak solunum kası güçsüzlüğü ve fasikülasyonlar kötüleşiyor. Atropin çizgili kas felcini neden düzeltemez?",
      ar: "تلقى مزارع مصاب بتسمم فوسفوري عضوي حاد جرعة عالية من الأتروبين وريدياً. تراجع بطء القلب واللعاب، لكن ضعف الحجاب الحاجز والنفضان العضلي تفاقما. لماذا يفشل الأتروبين في إنقاذ الشلل العضلي الهيكلي؟",
      en: "An agricultural worker with severe organophosphate poisoning receives high-dose IV atropine. Bradycardia and salivation resolve, but diaphragmatic weakness and muscle fasciculations worsen. Why does atropine fail to rescue skeletal muscle paralysis?"
    },
    hints: {
      nudge: {
        tr: "Otonom uç organlar ile somatik nöromusküler kavşağı yöneten reseptör sınıflarını kıyaslayın.",
        ar: "قارن بين فئات المستقبلات المنظمة للأعضاء الذاتية وتلك المنظمة للوصل العصبي العضلي الجسدي.",
        en: "Which receptor class mediates autonomic end-organs versus somatic neuromuscular junctions?"
      },
      clue: {
        tr: "Atropin katı biçimde muskarinik antagonisttir. Ligand kapılı nikotinik (Nm) reseptörlerine afinitesi var mıdır?",
        ar: "الأتروبين مضاد مسكاريني بحت. هل يمتلك ألفة تجاه مستقبلات النيكوتين (Nm) المبوبة بالربيطة؟",
        en: "Atropine is classified strictly as a muscarinic antagonist. Does it have affinity for ligand-gated nicotinic (Nm) receptors?"
      },
      solution: {
        tr: "Atropin muskarinik GPCR'ları (M1-M5) bloke ederek SLUDGE'ı ve bradikardiyi çözer; ancak nikotinik Nm reseptörlerine bağlanamaz ve depolarizan çizgili kas felcini durduramaz.",
        ar: "يحصر الأتروبين مستقبلات GPCR الموسكارينية (M1-M5) عاكساً أعراض SLUDGE؛ لكنه لا يرتبط بمستقبلات النيكوتين Nm، فيستمر شلل العضلات الهيكلية.",
        en: "Atropine selectively blocks muscarinic GPCRs (M1-M5), reversing SLUDGE and bradycardia, but cannot block nicotinic Nm receptors where ACh sustains depolarizing paralysis."
      }
    },
    conceptCheck: {
      question: {
        tr: "Atropin organofosfat zehirlenmesinde çizgili kas güçsüzlüğünü ve diyafram felcini neden düzeltemez?",
        ar: "لماذا يفشل الأتروبين في عكس الضعف العضلي وشلل الحجاب الحاجز في التسمم بالفوسفات العضوي؟",
        en: "Why does atropine fail to reverse skeletal muscle weakness and diaphragmatic paralysis in organophosphate toxicity?"
      },
      options: [
        {
          id: 'opt-l8-s1-1',
          isCorrect: true,
          text: {
            tr: "Atropin yarışmalı bir muskarinik antagonisttir; nöromusküler kavşaktaki nikotinik (Nm) reseptörlere afinitesi yoktur ve aşırı ACh depolarizan blok yapmaya devam eder.",
            ar: "الأتروبين مضاد مسكاريني تنافسي ليس له أي ألفة لمستقبلات النيكوتين (Nm) في الوصل العصبي العضلي، فيستمر فائض الأسيتيل كولين بإحداث شلل إزالة الاستقطاب.",
            en: "Atropine is a competitive muscarinic antagonist with zero affinity for nicotinic (Nm) receptors at the neuromuscular junction; excess ACh continues to cause depolarizing neuromuscular block."
          },
          feedback: {
            tr: "Doğru. Atropin paradoksu: atropin muskarinik organları (SLUDGE) kurtarır ancak nikotinik kavşağa bağlanamaz; çizgili kas için oksim (Pralidoksim/2-PAM) gerekir.",
            ar: "صحيح. مفارقة الأتروبين: ينقذ الأعضاء الموسكارينية ولكنه لا يرتبط بالوصل النيكوتيني؛ يتطلب شلل العضلات مضاداً نوعياً مثل البراليدوكسيم (2-PAM).",
            en: "Correct. The atropine paradox: atropine rescues muscarinic organs, but has zero affinity for nicotinic Nm endplates, requiring Pralidoxime (2-PAM) for muscle recovery."
          }
        },
        {
          id: 'opt-l8-s1-2',
          isCorrect: false,
          text: {
            tr: "Çizgili kas nikotinik reseptörleri atropine 1000 kat daha düşük afinite gösterir ve intravenöz dozun iki katına çıkarılmasını gerektirir.",
            ar: "تمتلك مستقبلات النيكوتين العضلية ألفة أقل بألف ضعف للأتروبين، مما يتطلب مضاعفة الجرعة الوريدية بشكل هائل.",
            en: "Skeletal muscle nicotinic receptors possess 1,000-fold lower affinity for atropine, requiring a massive doubling of the intravenous dose."
          },
          feedback: {
            tr: "Yanlış. Atropin muskarinik GPCR'lara (M1-M5) kimyasal olarak selektiftir; hiçbir klinik dozda nikotinik katyon kanallarını antagonize etmez.",
            ar: "غير صحيح. الأتروبين انتقائي بنيوياً للمستقبلات الموسكارينية؛ ولا يحصر قنوات النيكوتين الكاتيونية بأي جرعة سريرية.",
            en: "Incorrect. Atropine is chemically selective for muscarinic GPCRs (M1-M5) and does not antagonize nicotinic cation channels at any clinical dose."
          }
        },
        {
          id: 'opt-l8-s1-3',
          isCorrect: false,
          text: {
            tr: "Organofosfatlar doğrudan nikotinik reseptör iyon kanallarına bağlanarak onları geri dönüşsüz denatüre eder ve farmakolojik geri çevirmeyi imkansız kılar.",
            ar: "ترتبط الفوسفات العضوية مباشرة بقنوات مستقبلات النيكوتين الأيونية وتخربها نهائياً، مما يجعل أي عكس دوائي مستحيلاً.",
            en: "Organophosphates directly bind and irreversibly denature nicotinic receptor ion channels, rendering any pharmacological reversal impossible."
          },
          feedback: {
            tr: "Yanlış. Organofosfatlar asetilkolinesterazı inhibe eder; nöromusküler blok aşırı ACh birikimine bağlı sekonder bir depolarizan bloktur ve oksimlerle geri çevrilebilir.",
            ar: "غير صحيح. تثبط الفوسفات العضوية كولينستراز الأسيتيل مسببة تراكمه؛ والشلل العضلي إحصار ثانوي ناجم عن فرط الاستقطاب يمكن عكسه بالأوكسيمات.",
            en: "Incorrect. Organophosphates inhibit acetylcholinesterase; muscle paralysis is a secondary depolarizing block reversible by oximes before aging."
          }
        }
      ]
    }
  },

  // Step 2: Question (Fast vs Slow)
  {
    id: 'pharm-mod4-les2-step2',
    stage: 'question',
    phase: 'explore',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Kavramsal Soru: Hızlı İyon Kanalları ve Yavaş GPCR'lar",
      ar: "سؤال مفاهيمي: قنوات الأيونات السريعة مقابل GPCR البطيئة",
      en: "Conceptual Question: Fast Ion Channels vs Slow GPCRs"
    },
    prompt: {
      tr: "Aynı asetilkolin molekülü, iskelet kasında milisaniyeler içinde hızlı depolarizasyonu tetiklerken kardiyak pacemaker'da nasıl uzun süreli hiperpolarizasyon ve bradikardiye yol açar?",
      ar: "كيف يمكن لجزيء الأسيتيل كولين نفسه أن يحفز إزالة استقطاب سريعة بالميلي ثانية في العضلة الهيكلية، بينما يثير فرط استقطاب مديداً وبطء قلب في الناظمة القلبية؟",
      en: "How can the exact same acetylcholine molecule trigger millisecond-fast depolarization in skeletal muscle, while evoking prolonged hyperpolarization and sustained bradycardia in the cardiac pacemaker?"
    },
    hints: {
      nudge: {
        tr: "Reseptör süper ailelerini karşılaştırın: iyonotropik ligand kapılı kanallar ile metabotropik G-protein kenetli reseptörler.",
        ar: "قارن بين العائلات الكبرى للمستقبلات: القنوات الأيونية المبوبة بالربيطة مقابل مستقبلات GPCR الاستقلابية.",
        en: "Compare the receptor superfamilies: ionotropic ligand-gated channels versus metabotropic GPCRs."
      },
      clue: {
        tr: "Nikotinik Nm kanalları ligand bağlanınca anında açılır. Muskarinik M2 reseptörleri ise GIRK K+ kanallarını açmak için heterotrimerik Gi proteinini aktive etmek zorundadır.",
        ar: "تفتح قنوات Nm النيكوتينية فور ارتباط الربيطة. بينما يجب أن تفعل مستقبلات M2 الموسكارينية بروتين Gi لفتح قنوات البوتاسيوم GIRK.",
        en: "Nicotinic Nm channels open directly upon binding. Muscarinic M2 receptors must activate a heterotrimeric Gi protein to open GIRK K+ channels."
      },
      solution: {
        tr: "Nikotinik Nm kanallarında doğrudan iyon geçişi milisaniyede depolarizasyon yapar; M2 reseptöründe ise Gi beta-gama alt birimlerinin potasyum kanallarını açması daha yavaş ve uzundur.",
        ar: "يحدث الفتح المباشر لقناة Nm النيكوتينية إزالة استقطاب بالميلي ثانية؛ بينما يفتح تأشير M2 عبر وحدات Gi بيتا-غاما قنوات البوتاسيوم ببطء واستدامة أكبر.",
        en: "Direct ion channel gating at nicotinic Nm endplates produces sub-millisecond depolarization, while M2 GPCR signaling through Gi beta-gamma opens potassium channels more slowly."
      }
    },
    conceptCheck: {
      question: {
        tr: "Asetilkolin iskelet kası ve kalp düğüm dokusunda neden tamamen farklı hız ve yönde elektriksel yanıtlar oluşturur?",
        ar: "لماذا يولد الأسيتيل كولين استجابات كهربائية متباينة السرعة والاتجاه بين العضلات الهيكلية والعقد القلبية؟",
        en: "Why does acetylcholine mediate divergent speeds and directions of electrical response between skeletal muscle and cardiac pacemaker?"
      },
      options: [
        {
          id: 'opt-l8-s2-1',
          isCorrect: true,
          text: {
            tr: "İskelet kası nikotinik Nm ligand kapılı katyon kanalları taşır (anlık iyon akışı); kardiyak pacemaker ise Gi/beta-gama ile GIRK K+ kanallarına kenetli muskarinik M2 GPCR'lar taşır (yavaş kaskad).",
            ar: "تعبر العضلة الهيكلية عن قنوات Nm النيكوتينية المبوبة بالربيطة (تدفق أيوني فوري)؛ وتعبر الناظمة القلبية عن مستقبلات M2 المقترنة بـ Gi/بيتا-غاما بقنوات GIRK للبوتاسيوم (شلال أبطأ).",
            en: "Skeletal muscle expresses nicotinic Nm ligand-gated cation channels (immediate ion flux); cardiac pacemaker expresses muscarinic M2 GPCRs coupled via Gi/beta-gamma to GIRK K+ channels (slower cascade)."
          },
          feedback: {
            tr: "Doğru. Nikotinik reseptörler doğrudan sodyum/kalsiyum geçiren iyon kanallarıdır (iyonotropik); muskarinik M2 ise Gi aracılığıyla GIRK K+ kanallarını açan metabotropik bir GPCR'dır.",
            ar: "صحيح. مستقبلات النيكوتين قنوات كاتيونية أيونية؛ بينما M2 مستقبل أيضي مقترن بـ Gi يفتح قنوات البوتاسيوم GIRK مسبباً فرط الاستقطاب.",
            en: "Correct. Nicotinic receptors are ionotropic cation channels conducting sub-millisecond flux, whereas muscarinic M2 is a metabotropic GPCR coupled to GIRK K+ channels."
          }
        },
        {
          id: 'opt-l8-s2-2',
          isCorrect: false,
          text: {
            tr: "Kardiyak asetilkolin, iskelet kasındaki L-konformerine göre 100 kat daha yavaş hidroliz olan stereoizomerik bir D-konformasyonunda bulunur.",
            ar: "يوجد الأسيتيل كولين القلبي في متماكب فراغي D يتحلمه أبطأ بمئة مرة من متماكب L في العضلات الهيكلية.",
            en: "Cardiac acetylcholine exists in a stereoisomeric D-conformation that hydrolyzes 100 times slower than the skeletal muscle L-conformer."
          },
          feedback: {
            tr: "Yanlış. Asetilkolin kiral merkez içermez, optik izomeri yoktur; kinetik fark reseptör mimarisinden (iyonotropik vs GPCR) kaynaklanır.",
            ar: "غير صحيح. الأسيتيل كولين جزيء لا كيرالي ليس له متماكبات ضوئية؛ ويعود الفارق الحركي كلياً لبنية المستقبل (أيوني مقابل GPCR).",
            en: "Incorrect. Acetylcholine is an achiral molecule with no stereoisomers; receptor architecture alone dictates kinetic response speed."
          }
        },
        {
          id: 'opt-l8-s2-3',
          isCorrect: false,
          text: {
            tr: "Kardiyak dokuda asetilkolinesteraz tamamen bulunmaz ve nöromusküler kavşağın aksine asetilkolinin dakikalarca kalmasına izin verir.",
            ar: "يفتقر النسيج القلبي تماماً لإنزيم كولينستراز الأسيتيل، مما يسمح للأسيتيل كولين بالبقاء لدقائق بخلاف الوصل العصبي العضلي.",
            en: "Cardiac tissue completely lacks acetylcholinesterase, allowing acetylcholine to persist for minutes, unlike the neuromuscular junction."
          },
          feedback: {
            tr: "Yanlış. Kalp dokusunda bol miktarda asetilkolinesteraz bulunur. Yanıt süresini belirleyen şey doğrudan iyon poru açılmasına karşı GPCR sinyal iletimidir.",
            ar: "غير صحيح. يحتوي القلب على كولينستراز بوفرة. يحدد الفارق الزمني طبيعة المستقبل (فتح قناة مباشر مقابل شلال GPCR).",
            en: "Incorrect. Heart tissue contains abundant acetylcholinesterase. Kinetic divergence is governed by direct ion channel gating versus GPCR intracellular signaling."
          }
        }
      ]
    }
  },

  // Step 3: Intuition
  {
    id: 'pharm-mod4-les2-step3',
    stage: 'intuition',
    phase: 'explore',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Fiziksel Sezgi: Asma Köprü Kolu ve Belediye Ulağı",
      ar: "الحدس الفيزيائي: رافعة الجسر مقابل رسول البلدية",
      en: "Physical Intuition: The Drawbridge vs The City Hall Messenger"
    },
    prompt: {
      tr: "Bir kalenin asma köprüsünü doğrudan bir kol çekerek açmakla, koridorlardan ulak gönderip kapının açılmasını talep etmeyi kıyaslayın. Bu kolinerjik iletimi nasıl modeller?",
      ar: "قارن بين فتح جسر قلعة بسحب رافعة مباشرة وبين إرسال رسول عبر الأروقة لطلب فتح البوابة. كيف يمثل ذلك النقل الكوليني؟",
      en: "Compare opening a castle drawbridge by pulling a direct lever versus dispatching a messenger through corridors to request gate opening. How does this model cholinergic transmission?"
    },
    hints: {
      nudge: {
        tr: "Mekanizma hızını düşünün: hangi süreç tek parça mekanik bir eylemdir, hangisi ikincil adımların zinciridir?",
        ar: "فكر في سرعة الآلية: أي عملية هي فعل ميكانيكي من خطوة واحدة، وأيها سلسلة من خطوات الترحيل؟",
        en: "Think about the speed and machinery: which process is an all-in-one mechanical action versus a relay of secondary steps?"
      },
      clue: {
        tr: "Nikotinik reseptörün poru bağlanma bölgesiyle aynı protein üzerindedir. Muskarinik reseptör ise sinyali G-proteinleri üzerinden iletmelidir.",
        ar: "تحتوي مستقبلات النيكوتين على المسام مدمجاً مع موقع الارتباط. بينما يجب أن ترحل المستقبلات الموسكارينية الإشارة عبر بروتينات G.",
        en: "Nicotinic receptors have the channel built into the binding site. Muscarinic receptors must relay the signal through G-proteins."
      },
      solution: {
        tr: "Doğrudan kol ligand kapılı nikotinik iyon kanalını (anlık por açılması); ulak ise muskarinik GPCR ikinci haberci kaskadını modeller.",
        ar: "تمثل الرافعة قنوات النيكوتين الأيونية (فتح ميكانيكي مباشر للمسام)؛ ويمثل الرسول شلال المستقبلات الموسكارينية المقترنة بـ GPCR.",
        en: "The lever directly opens the channel pore (ionotropic nicotinic receptor). The messenger navigates biochemical pathways to activate effectors (metabotropic GPCR)."
      }
    },
    conceptCheck: {
      question: {
        tr: "Asma köprü kolu ve belediye ulağı benzetmesi kolinerjik iletimde neyi temsil eder?",
        ar: "ماذا يمثل تشبيه رافعة الجسر ورسول البلدية في النقل الكوليني؟",
        en: "What do the direct lever and city hall messenger analogies represent in cholinergic neurotransmission?"
      },
      options: [
        {
          id: 'opt-l8-s3-1',
          isCorrect: true,
          text: {
            tr: "Doğrudan kol, ligand kapılı nikotinik iyon kanallarını modeller (anlık por açılması); ulak ise muskarinik GPCR'ları modeller (çok basamaklı biyokimyasal kaskad).",
            ar: "تمثل الرافعة قنوات النيكوتين الأيونية (فتح فوري للمسام)؛ بينما يمثل الرسول مستقبلات GPCR الموسكارينية (شلال كيميائي حيوي متعدد المراحل).",
            en: "The lever represents ligand-gated nicotinic ion channels (direct intrinsic pore opening); the messenger represents muscarinic GPCRs (multi-step intracellular biochemical cascade)."
          },
          feedback: {
            tr: "Doğru. İyonotropik nikotinik kanallar reseptör ve poru tek bir komplekste birleştirir (anlık kol). Muskarinik GPCR'lar ise G-proteini ve ikinci haberciler gerektirir (ulak).",
            ar: "صحيح. تدمج قنوات النيكوتين المستقبل والمسام في معقد واحد (رافعة فورية)؛ بينما تتطلب GPCR الموسكارينية بروتينات G ومراسيل ثانوية (رسول).",
            en: "Correct. Ionotropic nicotinic channels combine receptor and pore in one protein complex (instant lever). Metabotropic GPCRs require G-protein relays (messenger)."
          }
        },
        {
          id: 'opt-l8-s3-2',
          isCorrect: false,
          text: {
            tr: "Doğrudan kol yavaş muskarinik GPCR transkripsiyonunu modeller; ulak ise lipid çift tabakasından hızlı veziküler ekzositozu modeller.",
            ar: "تمثل الرافعة استنساخ GPCR الموسكاريني البطيء؛ ويمثل الرسول الإخراج الخلوي الحويصلي السريع عبر طبقة الليبيد.",
            en: "The lever represents slow muscarinic GPCR transcription; the messenger represents fast vesicular exocytosis through the lipid bilayer."
          },
          feedback: {
            tr: "Yanlış. Kol benzetmesi agonist bağlanınca iyon kanalının doğrudan açılmasını modeller; nükleer transkripsiyonla ilgisi yoktur.",
            ar: "غير صحيح. يمثل تشبيه الرافعة الفتح المباشر لمسام القناة الأيونية عند ارتباط المنبه، ولا علاقة له بالاستنساخ النووي.",
            en: "Incorrect. The lever models the mechanical opening of the ionotropic channel pore upon agonist binding, not nuclear transcription."
          }
        },
        {
          id: 'opt-l8-s3-3',
          isCorrect: false,
          text: {
            tr: "Doğrudan kol asetilkolinesterazın kolini hidroliz etmesini modeller; ulak ise asetatın mitokondriye geri difüzyonunu modeller.",
            ar: "تمثل الرافعة حلمهة الكولين بإنزيم كولينستراز؛ ويمثل الرسول انتشار الأسيتات عائداً إلى الميتوكوندريا.",
            en: "The lever represents acetylcholinesterase hydrolysis of choline; the messenger represents acetate diffusion back into mitochondria."
          },
          feedback: {
            tr: "Yanlış. Her iki analoji de post-sinaptik sinyal iletim mekanizmalarını karşılaştırmak içindir, enzimatik yıkım için değil.",
            ar: "غير صحيح. يصف كلا التشبيهين آليات تحويل الإشارة بعد المشبكية، مقارنين بين فتح القنوات المباشر وشلالات GPCR.",
            en: "Incorrect. Both analogies describe post-synaptic transduction mechanisms, contrasting direct channel opening with GPCR second messenger cascades."
          }
        }
      ]
    }
  },

  // Step 4: Visual Explanation (Synaptic Life Cycle)
  {
    id: 'pharm-mod4-les2-step4',
    stage: 'visual_explanation',
    phase: 'explain',
    type: 'explanation',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Görsel Açıklama: Asetilkolin Sinaptik Yaşam Döngüsü",
      ar: "شرح مرئي: دورة حياة الأسيتيل كولين المشبكية",
      en: "Visual Explanation: Acetylcholine Synaptic Life Cycle"
    },
    prompt: {
      tr: "Kolinerjik sinaps yaşam döngüsünü inceleyin: Asetilkolin sentezindeki birincil hız kısıtlayıcı basamak nedir ve botulinum nörotoksini tam olarak hangi noktada müdahale eder?",
      ar: "راجع دورة حياة المشبك الكوليني: ما هي الخطوة المحددة للسرعة في اصطناع الأسيتيل كولين، وأين يتدخل ذيفان البوتولينوم بالتحديد؟",
      en: "Review the cholinergic synapse life cycle: What constitutes the primary rate-limiting step in acetylcholine synthesis, and at what specific point does botulinum neurotoxin intervene?"
    },
    hints: {
      nudge: {
        tr: "Kolin substratının nereden geldiğini ve presinaptik terminale nasıl girdiğini düşünün.",
        ar: "فكر في مصدر ركيزة الكولين وكيفية دخولها إلى النهاية العصبية قبل المشبكية.",
        en: "Where does the raw choline substrate originate and how does it enter the presynaptic nerve terminal?"
      },
      clue: {
        tr: "Yüksek afiniteli CHT1 taşıyıcısı ile kolin geri alımı toplam sentez hızını sınırlar. Botulinum ise vezikül füzyon mekanizmasını hedefler.",
        ar: "يحدد التقاط الكولين عبر ناقل CHT1 عالي الألفة سرعة الاصطناع الكلية. بينما يستهدف البوتولينوم آليات اندماج الحويصلات.",
        en: "The uptake of choline through the high-affinity CHT1 transporter limits overall synthesis rate. Botulinum targets the fusion machinery."
      },
      solution: {
        tr: "Sodyum bağımlı yüksek afiniteli kolin geri alımı (CHT1) hız kısıtlayıcıdır; Botulinum nörotoksini SNARE kompleksini keserek vezikül ekzositozunu bloke eder.",
        ar: "التقاط الكولين عالي الألفة المعتمد على الصوديوم (CHT1) هو الخطوة المحددة للسرعة؛ ويقطع ذيفان البوتولينوم معقد SNARE مانعاً إفراز الحويصلات.",
        en: "High-affinity Na+-dependent choline reuptake (CHT1) is rate-limiting. Botulinum neurotoxin cleaves the SNARE complex, preventing vesicle fusion and transmitter release."
      }
    },
    conceptCheck: {
      question: {
        tr: "Asetilkolin sentezinde hız kısıtlayıcı basamak hangisidir ve botulinum toksini nereyi vurur?",
        ar: "ما هي الخطوة المحددة للسرعة في اصطناع الأسيتيل كولين وأين يؤثر ذيفان البوتولينوم؟",
        en: "What is the rate-limiting step in acetylcholine synthesis and where does botulinum toxin act?"
      },
      options: [
        {
          id: 'opt-l8-s4-1',
          isCorrect: true,
          text: {
            tr: "Hız kısıtlayıcı basamak sodyum bağımlı yüksek afiniteli kolin geri alımıdır (CHT1); Botulinum nörotoksini presinaptik SNARE proteinlerini keserek veziküler ekzositozu engeller.",
            ar: "الخطوة المحددة للسرعة هي إعادة التقاط الكولين عالية الألفة المعتمدة على الصوديوم (CHT1)؛ ويقطع ذيفان البوتولينوم بروتينات SNARE مانعاً تحرر الأسيتيل كولين.",
            en: "Rate-limiting step is high-affinity sodium-dependent choline reuptake (CHT1); Botulinum neurotoxin cleaves presynaptic SNARE proteins, blocking vesicular acetylcholine exocytosis."
          },
          feedback: {
            tr: "Doğru. Yüksek afiniteli kolin alımı (CHT1) hız kısıtlayıcıdır (hemikolinyum ile bloke edilir). Botulinum toksini SNARE kompleksini (SNAP-25 vb.) keserek ekzositozu durdurur.",
            ar: "صحيح. التقاط الكولين عالي الألفة (CHT1) هو المحدد للسرعة (يحصر بـ هيميكولينيوم). ويقطع ذيفان البوتولينوم بروتينات SNARE موقفاً الإخراج الخلوي.",
            en: "Correct. High-affinity choline uptake (CHT1) is the rate-limiting step. Botulinum toxin cleaves SNARE complex proteins (SNAP-25, syntaxin, synaptobrevin), arresting exocytosis."
          }
        },
        {
          id: 'opt-l8-s4-2',
          isCorrect: false,
          text: {
            tr: "Hız kısıtlayıcı basamak kolin asetiltransferaz (ChAT) hızıdır; Botulinum nörotoksini asetilkolini tüketmek için sinaptik asetilkolinesterazı aşırı aktive eder.",
            ar: "الخطوة المحددة هي سرعة إنزيم ChAT؛ وينشط ذيفان البوتولينوم كولينستراز الأسيتيل المشبكي بشدة لاستنزاف الأسيتيل كولين.",
            en: "Rate-limiting step is choline acetyltransferase (ChAT) velocity; Botulinum neurotoxin hyper-activates synaptic acetylcholinesterase to deplete acetylcholine."
          },
          feedback: {
            tr: "Yanlış. ChAT enzimi aşırı kapasiteyle çalışır, hız kısıtlayıcı değildir. Botulinum toksini AChE'yi değil, SNARE proteinlerini keser.",
            ar: "غير صحيح. يعمل إنزيم ChAT بفائض قدرة ولا يحدد السرعة. ويقطع ذيفان البوتولينوم بروتينات SNARE وليس إنزيم AChE.",
            en: "Incorrect. ChAT is not rate-limiting (operates with excess capacity); choline uptake is rate-limiting. Botulinum toxin cleaves SNARE fusion proteins, not AChE."
          }
        },
        {
          id: 'opt-l8-s4-3',
          isCorrect: false,
          text: {
            tr: "Hız kısıtlayıcı basamak VAChT ile veziküler depolamadır; Botulinum nörotoksini sodyum-kolin kotransporterı CHT1'i yarışmalı olarak inhibe eder.",
            ar: "الخطوة المحددة هي التخزين الحويصلي عبر VAChT؛ ويثبط ذيفان البوتولينوم تنافسياً ناقل الصوديوم والكولين CHT1.",
            en: "Rate-limiting step is vesicular storage via VAChT; Botulinum neurotoxin competitively inhibits the sodium-choline cotransporter CHT1."
          },
          feedback: {
            tr: "Yanlış. Hemikolinyum-3 CHT1'i bloke eder; vezamikol VAChT'yi bloke eder. Botulinum toksini ise çinko-endopeptidaz olarak SNARE'i parçalar.",
            ar: "غير صحيح. يحصر هيميكولينيوم-3 ناقل CHT1؛ ويحصر فيزاميكول ناقل VAChT. بينما يعمل ذيفان البوتولينوم كإندوببتيداز زنك يشطر SNARE.",
            en: "Incorrect. Hemicholinium-3 blocks CHT1; vesamicol blocks VAChT. Botulinum toxin is a zinc-endopeptidase that proteolytically cleaves SNARE proteins."
          }
        }
      ]
    }
  },

  // Step 5: Interactive Artifact (Preserved config, add hints)
  null,

  // Step 6: Guided Discovery (Endothelial M3 Paradox)
  {
    id: 'pharm-mod4-les2-step6',
    stage: 'guided_discovery',
    phase: 'explain',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Rehberli Keşif: Endotelyal M3 Vazodilatasyon Paradoksu",
      ar: "استكشاف موجه: مفارقة التوسع الوعائي البطاني بـ M3",
      en: "Guided Discovery: Endothelial M3 Vasodilatation Paradox"
    },
    prompt: {
      tr: "Damar düz kasında doğrudan parasempatik innervasyon yoktur. Sağlam vasküler endoteli olan bir bireyde intravenöz asetilkolin uygulaması nasıl sistemik vazodilatasyon ve hipotansiyona yol açar?",
      ar: "تفتقر العضلات الملساء الوعائية للتعصيب نظير الودي المباشر. كيف يحدث إعطاء الأسيتيل كولين وريدياً توسعاً وعائياً وهبوط ضغط لدى شخص ببطانة وعائية سليمة؟",
      en: "Vascular smooth muscle lacks direct parasympathetic innervation. How does intravenous acetylcholine administration provoke systemic vasodilation and hypotension in an individual with intact vascular endothelium?"
    },
    hints: {
      nudge: {
        tr: "Robert Furchgott'un Nobel ödüllü deneyini hatırlayın: endotel tabakası kazınırsa asetilkolinin etkisi tamamen tersine döner.",
        ar: "تذكر تجربة روبرت فورشغوت الحائزة على نوبل: إذا كُشطت البطانة، ينعكس تأثير الأسيتيل كولين تماماً.",
        en: "Remember Robert Furchgott's Nobel-winning experiment: the response to acetylcholine flips completely if the endothelial lining is removed."
      },
      clue: {
        tr: "Endotel hücreleri, gaz halinde bir vazodilatatör haberci (Nitrik Oksit) sentezleyen bir enzime kenetli M3 reseptörleri taşır.",
        ar: "تحمل الخلايا البطانية مستقبلات M3 المقترنة بإنزيم يصنع مرسالاً موسعاً غازياً (أكسيد النيتريك).",
        en: "Endothelial cells express M3 receptors coupled to an enzyme that synthesizes a gaseous vasodilator messenger (Nitric Oxide)."
      },
      solution: {
        tr: "Endotelyal M3 uyarımı eNOS aracılığıyla Nitrik Oksit (NO) salar; NO düz kasa difüze olup cGMP'yi yükseltir ve gevşeme yaptırır.",
        ar: "يحفز تنبيه M3 البطاني إطلاق أكسيد النيتريك (NO) عبر eNOS؛ ينتشر NO للعضلات الملساء رافعاً cGMP ومحدثاً الارتخاء.",
        en: "Endothelial M3 stimulation releases Nitric Oxide (NO) via eNOS; NO diffuses into vascular smooth muscle, raising cGMP and driving relaxation."
      }
    },
    conceptCheck: {
      question: {
        tr: "İntakt endoteli olan damarlarda intravenöz asetilkolin vazodilatasyonu nasıl tetikler?",
        ar: "كيف يحفز الأسيتيل كولين وريدياً التوسع الوعائي في الأوعية ذات البطانة السليمة؟",
        en: "How does intravenous acetylcholine trigger vasodilation in vessels with an intact endothelial layer?"
      },
      options: [
        {
          id: 'opt-l8-s6-1',
          isCorrect: true,
          text: {
            tr: "Endotelyal M3 reseptörleri Gq ile Ca2+ salarak eNOS'u aktive eder ve Nitrik Oksit (NO) üretir; NO düz kasa difüze olup guanilat siklazı uyararak cGMP sentezler.",
            ar: "تحفز مستقبلات M3 البطانية تحرر الكالسيوم عبر Gq، منشطة eNOS لإنتاج أكسيد النيتريك (NO)؛ ينتشر NO للعضلات الملساء منشطاً محلقة الغوانيلات لإنتاج cGMP.",
            en: "Endothelial M3 receptors trigger Gq-mediated Ca2+ release, activating eNOS to produce Nitric Oxide (NO); NO diffuses into smooth muscle, activating guanylyl cyclase to generate cGMP."
          },
          feedback: {
            tr: "Doğru. Furchgott'un EDRF keşfi: endotelyal M3 NO salar, düz kasta cGMP artışı gevşeme yapar. Endotel hasarlıysa asetilkolin doğrudan düz kası büzerek vazokonstriksiyon yapar.",
            ar: "صحيح. اكتشاف فورشغوت لـ EDRF: يحرر M3 البطاني أكسيد النيتريك رافعاً cGMP ومحدثاً الارتخاء. في حال غياب البطانة، يضيق الأسيتيل كولين العضلة الملساء مباشرة.",
            en: "Correct. Furchgott's EDRF discovery: endothelial M3 activation releases nitric oxide (NO), stimulating guanylyl cyclase in smooth muscle to induce cGMP-mediated relaxation."
          }
        },
        {
          id: 'opt-l8-s6-2',
          isCorrect: false,
          text: {
            tr: "Asetilkolin damar düz kası beta-2 adrenerjik reseptörlerine bağlanarak adenilat siklazı aktive eder ve gevşetici cAMP üretir.",
            ar: "يرتبط الأسيتيل كولين بمستقبلات بيتا-2 الأدرينالينية في العضلات الملساء، منشطاً محلقة الأدينيلات لإنتاج cAMP المرخي.",
            en: "Acetylcholine binds vascular smooth muscle beta-2 adrenergic receptors, activating adenylyl cyclase and generating relaxing cAMP."
          },
          feedback: {
            tr: "Yanlış. Asetilkolin adrenerjik beta-2 reseptörlerine bağlanmaz; vazodilatasyon endotelyal muskarinik M3 / NO / cGMP kaskadıyla yönetilir.",
            ar: "غير صحيح. لا يرتبط الأسيتيل كولين بمستقبلات بيتا-2؛ ويتوسط التوسع الوعائي مستقبلات M3 البطانية عبر شلال أكسيد النيتريك/cGMP.",
            en: "Incorrect. Acetylcholine does not bind adrenergic beta-2 receptors; vasodilation is mediated by endothelial muscarinic M3 receptors via the NO/cGMP cascade."
          }
        },
        {
          id: 'opt-l8-s6-3',
          isCorrect: false,
          text: {
            tr: "Damar düz kası, endotel katılımı olmaksızın potasyum kanallarını doğrudan açan bol miktarda inhibitör M2 reseptörü ifade eder.",
            ar: "تعبر العضلات الملساء الوعائية عن مستقبلات M2 تثبيطية وفيرة تفتح قنوات البوتاسيوم مباشرة دون تدخل البطانة.",
            en: "Vascular smooth muscle expresses abundant inhibitory M2 receptors that directly open potassium channels without endothelial involvement."
          },
          feedback: {
            tr: "Yanlış. Endotelin kazınması vazodilatasyonu tamamen yok eder ve paradoksal vazokonstriksiyonu açığa çıkarır; bu da endotel zorunluluğunu kanıtlar.",
            ar: "غير صحيح. يؤدي كشط البطانة إلى إلغاء التوسع الوعائي كلياً وكشف تضيق وعائي متناقض، مما يثبت الاعتماد المطلق على البطانة.",
            en: "Incorrect. Endothelial denudation completely abolishes acetylcholine-induced vasodilation and unmasks vasoconstriction, proving obligatory endothelial mediation."
          }
        }
      ]
    }
  },

  // Step 7: Formal Explanation
  {
    id: 'pharm-mod4-les2-step7',
    stage: 'formal_explanation',
    phase: 'explain',
    type: 'explanation',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Biçimsel Açıklama: Kanonik Kolinoseptör Mimarisi",
      ar: "شرح رسمي: البنية المعيارية للمستقبلات الكولينية",
      en: "Formal Explanation: Canonical Cholinoceptor Architecture"
    },
    prompt: {
      tr: "Kanonik kolinerjik reseptör sınıflandırma tablosunu inceleyin. Hangi ifade bir kolinoseptör alt tipini, moleküler iletecini ve birincil fizyolojik yanıtını doğru eşleştirir?",
      ar: "راجع جدول تصنيف المستقبلات الكولينية. أي عبارة تقرن بدقة بين نمط المستقبل الكوليني وموصله الجزيئي واستجابته الفسيولوجية الأساسية؟",
      en: "Review the canonical cholinoceptor classification table. Which statement accurately pairs a cholinoceptor subtype with its molecular transducer and primary physiological response?"
    },
    hints: {
      nudge: {
        tr: "Kuralı hatırlayın: tek sayılı muskarinikler (M1, M3, M5) Gq'ya; çift sayılı olanlar (M2, M4) Gi'ye kenetlenir.",
        ar: "تذكر القاعدة: تقترن الموسكارينية الفردية (M1, M3, M5) بـ Gq؛ بينما تقترن الزوجية (M2, M4) بـ Gi.",
        en: "Remember the rule: odd-numbered muscarinics (M1, M3, M5) couple to Gq; even-numbered (M2, M4) couple to Gi."
      },
      clue: {
        tr: "Nikotinik reseptörler (Nm, Nn) GPCR değildir; doğrudan ligand kapılı iyon kanallarıdır.",
        ar: "المستقبلات النيكوتينية (Nm, Nn) ليست من نمط GPCR؛ بل هي قنوات أيونية مبوبة بالربيطة مباشرة.",
        en: "Nicotinic receptors (Nm, Nn) are not GPCRs at all; they are pentameric ligand-gated ion channels."
      },
      solution: {
        tr: "M2 reseptörleri kalpte Gi'ye kenetlenir, potasyum kanallarını açarak pacemaker'ı hiperpolarize eder ve kalp hızını yavaşlatır.",
        ar: "تقترن مستقبلات M2 بـ Gi في النسيج العقدي القلبي، فاتحة قنوات البوتاسيوم لفرط استقطاب الناظمة وإبطاء القلب.",
        en: "M2 (Gi): Decreases adenylyl cyclase activity and opens GIRK K+ channels in cardiac pacemaker, slowing heart rate."
      }
    },
    conceptCheck: {
      question: {
        tr: "Hangi kolinerjik reseptör alt tipi, G-proteini ve fizyolojik yanıtıyla doğru eşleştirilmiştir?",
        ar: "أي نمط فرعي للمستقبلات الكولينية مقترن بدقة ببروتين G واستجابته الفسيولوجية؟",
        en: "Which cholinoceptor subtype is accurately matched with its G-protein and physiological response?"
      },
      options: [
        {
          id: 'opt-l8-s7-1',
          isCorrect: true,
          text: {
            tr: "M2 (Gi): Adenilat siklaz aktivitesini azaltır ve kardiyak pacemaker'da GIRK K+ kanallarını açarak kalp hızını yavaşlatır.",
            ar: "M2 (Gi): يقلل نشاط محلقة الأدينيلات ويفتح قنوات البوتاسيوم GIRK في الناظمة القلبية، مبطئاً معدل ضربات القلب.",
            en: "M2 (Gi): Decreases adenylyl cyclase activity and opens GIRK K+ channels in cardiac pacemaker, slowing heart rate."
          },
          feedback: {
            tr: "Doğru. Muskarinik M2 reseptörleri Gi ile cAMP'yi düşürür ve G beta-gama ile içe doğrultucu GIRK K+ kanallarını açarak kalbi yavaşlatır.",
            ar: "صحيح. تقترن مستقبلات M2 بـ Gi لخفض cAMP وفتح قنوات البوتاسيوم GIRK عبر بيتا-غاما مفرطة استقطاب العقد القلبية.",
            en: "Correct. Muscarinic M2 receptors couple to Gi, inhibiting cAMP and directly opening GIRK K+ channels via G beta-gamma to slow heart rate."
          }
        },
        {
          id: 'opt-l8-s7-2',
          isCorrect: false,
          text: {
            tr: "M3 (Gi): Ekzokrin bezlerde fosfolipaz C'yi inhibe ederek tükürük ve gözyaşı salgılarını belirgin şekilde azaltır.",
            ar: "M3 (Gi): يثبط فوسفوليباز C في الغدد خارجية الإفراز، مخفضاً الإفراز اللعابي والدمعي بشكل ملحوظ.",
            en: "M3 (Gi): Inhibits phospholipase C in exocrine glands, dramatically reducing salivary and lacrimal secretions."
          },
          feedback: {
            tr: "Yanlış. M3 Gi'ye değil Gq'ya kenetlenir ve PLC'yi aktive ederek hücre içi kalsiyumu artırır; ekzokrin salgıları güçlü şekilde uyarır.",
            ar: "غير صحيح. يقترن M3 بـ Gq (وليس Gi) وينشط PLC لرفع الكالسيوم الداخلي، محفزاً الإفرازات الغدية بقوة.",
            en: "Incorrect. M3 couples to Gq (not Gi) and activates PLC to increase intracellular calcium, powerfully stimulating secretions."
          }
        },
        {
          id: 'opt-l8-s7-3',
          isCorrect: false,
          text: {
            tr: "Nm (Gs): Nöromusküler kavşakta adenilat siklazı aktive eder ve istemli tetanik kas kasılmasını sürdürmek için cAMP üretir.",
            ar: "Nm (Gs): ينشط محلقة الأدينيلات في الوصل العصبي العضلي، مولداً cAMP لاستدامة الانقباض الكزازي الإرادي.",
            en: "Nm (Gs): Activates adenylyl cyclase in neuromuscular junctions, generating cAMP to sustain voluntary tetanic muscle contraction."
          },
          feedback: {
            tr: "Yanlış. Nikotinik reseptörler GPCR değildir; pentamerik iyonotropik kanallardır ve sodyum/kalsiyum girişiyle motor son plağı doğrudan depolarize eder.",
            ar: "غير صحيح. مستقبلات النيكوتين قنوات أيونية وليست GPCR؛ تزيل استقطاب الصفيحة المحركة مباشرة بتدفق الصوديوم والكالسيوم.",
            en: "Incorrect. Nicotinic receptors are ionotropic ligand-gated cation channels, not GPCRs; they depolarize the motor endplate directly."
          }
        }
      ]
    }
  },

  // Step 8: Concept Check (Tropicamide)
  {
    id: 'pharm-mod4-les2-step8',
    stage: 'concept_check',
    phase: 'practice',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Kavram Kontrolü: Tropikamid ile Göz Dibi Muayenesi",
      ar: "تحقق مفاهيمي: فحص قاع العين بالتروبيكاميد",
      en: "Concept Check: Tropicamide Fundus Examination"
    },
    prompt: {
      tr: "Bir göz hekimi fundus muayenesinden önce muskarinik antagonist tropikamid damlatır. Hastada aynı anda hangi iki farklı farmakolojik oküler değişiklik meydana gelir?",
      ar: "يقطر طبيب العيون مضاد الموسكارين تروبيكاميد قبل فحص قاع العين. ما التغيران الدوائيان البصريان المتزامنان اللذان يحدثان لدى المريض؟",
      en: "An ophthalmologist instills the muscarinic antagonist tropicamide before examining the ocular fundus. Which two distinct pharmacological ocular changes occur simultaneously in the patient?"
    },
    hints: {
      nudge: {
        tr: "Muskarinik M3 reseptörleri iki farklı oküler kası kasar: sfinkter pupilla ve silier kas.",
        ar: "تقبض مستقبلات M3 الموسكارينية عضلتين عينيتين متميزتين: العضلة العاصرة للحدقة والعضلة الهدبية.",
        en: "Muscarinic M3 receptors contract two distinct ocular muscles: the pupillary sphincter and the ciliary muscle."
      },
      clue: {
        tr: "Sfinkterin felç olması gözbebeğinin daralmasını engeller; silier kasın felç olması merceği yassılaştırarak yakın görme uyumunu bozar.",
        ar: "شلل العاصرة يمنع تضيق الحدقة؛ بينما شلل العضلة الهدبية يسطح العدسة ملغياً المطابقة للرؤية القريبة.",
        en: "Paralyzing the sphincter prevents pupillary constriction; paralyzing the ciliary muscle flattens the lens, abolishing near accommodation."
      },
      solution: {
        tr: "M3 blokajı sfinkter felciyle midriyazis (bebek genişlemesi), silier kas felciyle ise siklopleji (yakın görme uyumu kaybı) yapar.",
        ar: "يحدث حصر M3 توسعاً للحدقة (شلل العاصرة) وشللاً للمطابقة (شلل العضلة الهدبية وفقدان التركيز القريب).",
        en: "Blocking M3 produces mydriasis (pupillary dilation via sphincter paralysis) and cycloplegia (loss of near accommodation via ciliary paralysis)."
      }
    },
    conceptCheck: {
      question: {
        tr: "Tropikamid göze damlatıldığında hangi iki etki aynı anda ortaya çıkar?",
        ar: "ما التأثيران المتزامنان اللذان يظهران عند تقطير التروبيكاميد في العين؟",
        en: "Which two effects occur simultaneously following ocular tropicamide instillation?"
      },
      options: [
        {
          id: 'opt-l8-s8-1',
          isCorrect: true,
          text: {
            tr: "Midriyazis (sfinkter pupilla felciyle pupil dilatasyonu) ve siklopleji (silier kas felciyle yakın akomodasyon kaybı).",
            ar: "توسع الحدقة (شلل العضلة العاصرة الحدقية) وشلل المطابقة (شلل العضلة الهدبية وفقدان المطابقة للرؤية القريبة).",
            en: "Mydriasis (pupillary dilation via circular sphincter paralysis) and cycloplegia (loss of near accommodation via ciliary muscle paralysis)."
          },
          feedback: {
            tr: "Doğru. Tropikamid sfinkter pupilladaki M3'ü bloke ederek midriyazis, silier kastaki M3'ü bloke ederek siklopleji yapar.",
            ar: "صحيح. يحصر التروبيكاميد مستقبلات M3 في العاصرة مسبباً توسع الحدقة، وفي العضلة الهدبية مسبباً شلل المطابقة.",
            en: "Correct. Tropicamide blocks M3 receptors on both the circular sphincter (causing mydriasis) and ciliary muscle (causing cycloplegia)."
          }
        },
        {
          id: 'opt-l8-s8-2',
          isCorrect: false,
          text: {
            tr: "Miyozis (radyal kas aktivasyonuyla pupil daralması) ve uzak görme keskinliğinde kalıcı felç.",
            ar: "تضيق الحدقة (تنشيط العضلة الشعاعية) وشلل دائم في حدة الرؤية البعيدة.",
            en: "Miosis (pupillary constriction via radial muscle activation) and permanent paralysis of distant visual acuity."
          },
          feedback: {
            tr: "Yanlış. Muskarinik antagonistler miyozis değil midriyazis yapar. Radyal dilatör kas alfa-1 adrenerjik kontrol altındadır.",
            ar: "غير صحيح. تسبب مضادات الموسكارين توسع الحدقة لا تضيقها؛ وتخضع العضلة الشعاعية لسيطرة مستقبلات ألفا-1 الودية.",
            en: "Incorrect. Muscarinic antagonists cause mydriasis, not miosis. The radial dilator muscle is controlled by alpha-1 adrenoceptors."
          }
        },
        {
          id: 'opt-l8-s8-3',
          isCorrect: false,
          text: {
            tr: "Trabeküler ağdan aköz drenajın artmasıyla birlikte pupil dilatasyonu ve göz içi basıncında belirgin düşüş.",
            ar: "توسع الحدقة مترافقاً بتصريف متزايد للخلط المائي عبر الشبكة التربيقية، خافضاً ضغط العين بشدة.",
            en: "Pupillary dilation accompanied by enhanced trabecular meshwork aqueous drainage, dramatically reducing intraocular pressure."
          },
          feedback: {
            tr: "Yanlış. Antimuskarinik midriyazis iridokorneal açıyı daraltarak aköz drenajını tıkar ve göz içi basıncını yükseltebilir.",
            ar: "غير صحيح. يؤدي توسع الحدقة بمضادات الموسكارين لتضيق زاوية العين وإعاقة تصريف الخلط المائي، مما قد يرفع ضغط العين.",
            en: "Incorrect. Antimuscarinic mydriasis crowds the iridocorneal angle, obstructing aqueous drainage and risking intraocular pressure spikes."
          }
        }
      ]
    }
  },

  // Step 9: Application (Tensilon Test)
  {
    id: 'pharm-mod4-les2-step9',
    stage: 'application',
    phase: 'practice',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Klinik Vaka: Tensilon Testi ile Kriz Ayrımı",
      ar: "حالة سريرية: تفريق الأزمة باختبار تينسيلون",
      en: "Clinical Vignette: Tensilon Test Crisis Differentiation"
    },
    prompt: {
      tr: "Piridostigmin kullanan Miyastenia Gravis hastasında akut gevşek solunum güçsüzlüğü gelişir. Nörolog IV edrofonyum uygular (Tensilon testi). Tanısal yanıt nasıl yorumlanır?",
      ar: "مريض وهن عضلي وخيم يعالج ببيريدوستيغمين أصيب بضعف تنفسي رخو حاد. حقن طبيب الأعصاب إدروفونيوم وريدياً (اختبار تينسيلون). كيف تفسر الاستجابة التشخيصية؟",
      en: "A Myasthenia Gravis patient on pyridostigmine develops acute flaccid respiratory weakness. The neurologist administers IV edrophonium (Tensilon test). How is the diagnostic response interpreted?"
    },
    hints: {
      nudge: {
        tr: "Hem miyastenik kriz (yetersiz tedavi) hem kolinerjik kriz (aşırı tedavi) aynı gevşek kas güçsüzlüğüyle gelir.",
        ar: "تتظاهر كل من الأزمة الوهنية (نقص العلاج) والأزمة الكولينية (فرط العلاج) بذات الضعف الرخو.",
        en: "Both myasthenic crisis (undertreatment) and cholinergic crisis (overtreatment) present with identical flaccid weakness."
      },
      clue: {
        tr: "Edrofonyum sinaptik asetilkolini 5-10 dakika geçici olarak yükseltir. Zaten depolarize ve duyarsızlaşmış bir plakaya daha fazla ACh eklenirse ne olur?",
        ar: "يرفع الإدروفونيوم الأسيتيل كولين مؤقتاً لـ 5-10 دقائق. ماذا يحدث لصفيحة محركة مزالة الاستقطاب ومفرطة الإشباع إذا أضفت مزيداً من الأسيتيل كولين؟",
        en: "Edrophonium transiently increases synaptic ACh for 5-10 minutes. What happens if you add more ACh to an already depolarized, desensitized motor endplate?"
      },
      solution: {
        tr: "Güçsüzlük ACh azlığından kaynaklanıyorsa kas gücü artar (Miyastenik Kriz); aşırı ACh'nin depolarizan bloğundan kaynaklanıyorsa güçsüzlük kötüleşir (Kolinerjik Kriz).",
        ar: "إذا كان الضعف بسبب نقص الأسيتيل كولين تتحسن القوة (أزمة وهنية)؛ أما إذا كان بسبب فائض الأسيتيل كولين يتفاقم الشلل مع نفضان (أزمة كولينية).",
        en: "If weakness was due to lack of ACh (myasthenic crisis), strength improves. If due to excess ACh causing depolarizing block (cholinergic crisis), paralysis worsens."
      }
    },
    conceptCheck: {
      question: {
        tr: "Edrofonyum (Tensilon) testi ile miyastenik kriz ve kolinerjik kriz nasıl ayırt edilir?",
        ar: "كيف يفرق اختبار الإدروفونيوم (تينسيلون) بين الأزمة الوهنية والأزمة الكولينية؟",
        en: "How does the edrophonium (Tensilon) test distinguish between myasthenic crisis and cholinergic crisis?"
      },
      options: [
        {
          id: 'opt-l8-s9-1',
          isCorrect: true,
          text: {
            tr: "Kas gücünde ani düzelme yetersiz tedaviyi (Miyastenik Kriz); fasikülasyonlarla artan güçsüzlük ise aşırı tedaviyi (Kolinerjik Kriz) gösterir.",
            ar: "التحسن الفوري في قوة العضلات يشير لنقص العلاج (أزمة وهنية)؛ وتفاقم الضعف مع نفضان عضلي يشير لفرط العلاج (أزمة كولينية).",
            en: "Immediate improvement in muscle strength indicates undertreatment (Myasthenic Crisis); worsening weakness with fasciculations indicates overtreatment (Cholinergic Crisis)."
          },
          feedback: {
            tr: "Doğru. Edrofonyum ultra kısa etkili bir AChE inhibitörüdür. Miyastenik krizde ACh artışı gücü toparlar; kolinerjik krizde ise depolarizan bloğu derinleştirip felci ağırlaştırır.",
            ar: "صحيح. الإدروفونيوم مثبط فائق قصر الأمد للـ AChE. في الأزمة الوهنية يعيد الأسيتيل كولين القوة؛ وفي الأزمة الكولينية يعمق الشلل الاستقطابي.",
            en: "Correct. Edrophonium is an ultra-short acting reversible AChE inhibitor. In myasthenic crisis, more ACh restores strength; in cholinergic crisis, more ACh deepens depolarizing block."
          }
        },
        {
          id: 'opt-l8-s9-2',
          isCorrect: false,
          text: {
            tr: "Edrofonyum, çizgili kasta voltaj kapılı kalsiyum kanallarını doğrudan açarak her iki krizde de tam kas gücünü geri kazandırır.",
            ar: "يعيد الإدروفونيوم كامل القوة العضلية في كلتا الأزمتين عن طريق فتح قنوات الكالسيوم في العضلات الهيكلية مباشرة.",
            en: "Edrophonium restores full muscle power in both crises by directly opening voltage-gated calcium channels in skeletal muscle."
          },
          feedback: {
            tr: "Yanlış. Kolinerjik krizde motor son plaklar zaten aşırı ACh ile depolarize ve inaktiftir; edrofonyum eklemek solunum durmasına yol açabilir.",
            ar: "غير صحيح. في الأزمة الكولينية، تكون الصفائح مزالة الاستقطاب ومثبطة؛ وإضافة الإدروفونيوم تعمق الشلل وقد توقف التنفس.",
            en: "Incorrect. In a cholinergic crisis, motor endplates are already depolarized and desensitized; adding edrophonium worsens the block and risks respiratory arrest."
          }
        },
        {
          id: 'opt-l8-s9-3',
          isCorrect: false,
          text: {
            tr: "Düzelme edrofonyumun dolaşımdaki nikotinik otoantikorları nötralize ettiğini; başarısızlık ise geri dönüşsüz motor nöron ölümünü kanıtlar.",
            ar: "يثبت التحسن أن الإدروفونيوم عادل الأجسام المضادة لمستقبلات النيكوتين، بينما يشير الفشل إلى موت عصبوني حركي غير عكوس.",
            en: "Improvement proves edrophonium neutralized circulating nicotinic receptor autoantibodies, while failure indicates irreversible motor neuron death."
          },
          feedback: {
            tr: "Yanlış. Edrofonyum antikorları bağlamaz veya nötralize etmez; yalnızca asetilkolinesterazı geçici olarak durdurarak ACh konsantrasyonunu artırır.",
            ar: "غير صحيح. لا يعادل الإدروفونيوم الأجسام المضادة؛ بل يثبط الكولينستراز مؤقتاً لرفع تركيز الأسيتيل كولين لمنافسة الأضداد.",
            en: "Incorrect. Edrophonium does not neutralize antibodies; it transiently inhibits acetylcholinesterase, elevating acetylcholine to compete with antibodies."
          }
        }
      ]
    }
  },

  // Step 10: Retrieval (Pralidoxime)
  {
    id: 'pharm-mod4-les2-step10',
    stage: 'retrieval',
    phase: 'practice',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Geri Çağırma: Kolinesteraz Reaktivatörü Panzehir",
      ar: "استرجاع: الترياق المنشط للكولينستراز",
      en: "Retrieval: Cholinesterase Reactivator Antidote"
    },
    prompt: {
      tr: "Hangi özgül farmakolojik panzehir organofosfatla fosforillenmiş asetilkolinesterazı yeniden aktifleştirebilir ve hangi kritik biyokimyasal reaksiyondan önce uygulanmalıdır?",
      ar: "ما هو الترياق الدوائي النوعي القادر على إعادة تنشيط إنزيم كولينستراز الأسيتيل المفسفر بالفوسفات العضوي، وما التفاعل الكيميائي الحاسم الذي يجب أن يسبقه؟",
      en: "Which specific pharmacological antidote can reactivate organophosphate-phosphorylated acetylcholinesterase, and what critical biochemical reaction must it precede?"
    },
    hints: {
      nudge: {
        tr: "Semptomları maskeleyen bir reseptör blokeri ile enzimi kimyasal olarak kurtaran bir reaktivatörü ayırt edin.",
        ar: "ميز بين حاصر المستقبلات الذي يخفي الأعراض وبين المنشط الذي ينقذ الإنزيم كيميائياً.",
        en: "Distinguish between a receptor antagonist that masks symptoms versus a biochemical reactivator that restores the enzyme."
      },
      clue: {
        tr: "Bu panzehir, organofosfatın fosfor atomuna nükleofilik saldırı yapabilen bir oksim (=N-OH) grubuna sahiptir.",
        ar: "يمتلك هذا الترياق زمرة أوكسيم (=N-OH) قادرة على شن هجوم نكليوفيلي على ذرة الفوسفور.",
        en: "This antidote possesses an oxime group capable of launching a nucleophilic attack on the organophosphorus atom."
      },
      solution: {
        tr: "Pralidoksim (2-PAM) serbest enzimi rejenere etmek için nükleofilik oksim saldırısı yapar; ancak geri dönüşsüz 'yaşlanma' (aging) öncesinde verilmelidir.",
        ar: "براليدوكسيم (2-PAM)؛ حيث يحرر الهجوم النكليوفيلي الإنزيم، لكن يجب إعطاؤه قبل حدوث 'تعمير' الإنزيم الكوفالنتي غير العكوس (aging).",
        en: "Pralidoxime (2-PAM) acts as a nucleophile to displace the organophosphate from catalytic serine, but must be given before irreversible dealkylation ('aging')."
      }
    },
    conceptCheck: {
      question: {
        tr: "Organofosfatla kilitlenmiş asetilkolinesterazı hangi ilaç reaktive eder ve hangi sınırlamaya tabidir?",
        ar: "ما هو الدواء الذي يعيد تنشيط إنزيم كولينستراز المثبط بالفوسفات العضوي وما محدداته؟",
        en: "Which drug reactivates organophosphate-inhibited acetylcholinesterase and what critical limitation applies?"
      },
      options: [
        {
          id: 'opt-l8-s10-1',
          isCorrect: true,
          text: {
            tr: "Pralidoksim (2-PAM); nükleofilik oksim saldırısı serbest enzimi rejenere eder ancak kovalent 'yaşlanma' (aging) gerçekleşmeden önce verilmelidir.",
            ar: "براليدوكسيم (2-PAM)؛ حيث يحرر الهجوم النكليوفيلي للأوكسيم الإنزيم، ولكن يجب إعطاؤه قبل حدوث 'تعمير' الإنزيم الكوفالنتي (aging).",
            en: "Pralidoxime (2-PAM); nucleophilic oxime attack regenerates free enzyme, but it must be given before covalent enzyme 'aging' occurs."
          },
          feedback: {
            tr: "Doğru. Pralidoksim oksim grubuyla fosforil-serin bağını koparır. Ancak enzim dealkilasyona ('yaşlanma') uğrarsa kimyasal reaktivasyon imkansızlaşır.",
            ar: "صحيح. يكسر البراليدوكسيم الرابطة بهجوم نكليوفيلي. ولكن إذا حدث التعمير (فقدان ألكيل) يصبح الإنزيم عصياً على أي تنشيط كيميائي.",
            en: "Correct. Pralidoxime uses an oxime nucleophile to regenerate the active serine. Once covalent 'aging' (dealkylation) occurs, reactivation is impossible."
          }
        },
        {
          id: 'opt-l8-s10-2',
          isCorrect: false,
          text: {
            tr: "Atropin; tersiyer amini kovalent fosfat-ester bağını keserek katalitik triadın kendiliğinden dekarboksilasyonunu engeller.",
            ar: "الأتروبين؛ حيث يقطع أمينه الثالثي الرابطة الفوسفاتية الكوفالنتية، مانعاً نزع الكربوكسيل التلقائي من الثالوث التحفيزي.",
            en: "Atropine; its tertiary amine cleaves the covalent phosphate-ester bond, preventing spontaneous decarboxylation of the catalytic triad."
          },
          feedback: {
            tr: "Yanlış. Atropin bir muskarinik reseptör antagonistidir; asetilkolinesterazı yeniden aktifleştiremez veya organofosfatı yerinden sökemez.",
            ar: "غير صحيح. الأتروبين مضاد للمستقبلات الموسكارينية؛ وليس له أي خواص لإعادة تنشيط الإنزيم أو فك ارتباط الفوسفات العضوي.",
            en: "Incorrect. Atropine is a muscarinic receptor antagonist; it has zero enzymatic reactivating properties and cannot displace organophosphates from AChE."
          }
        },
        {
          id: 'opt-l8-s10-3',
          isCorrect: false,
          text: {
            tr: "Fizostigmin; geri dönüşümlü bir karbamat inhibitörü olarak aktif bölgeden organofosfatları kovar ve dakikalar içinde hidroliz olur.",
            ar: "فيزوستيغمين؛ كونه مثبط كربامات عكوس، فإنه يزيح الفوسفات العضوي من الموقع النشط ويتحلمه خلال دقائق.",
            en: "Physostigmine; as a reversible carbamate inhibitor, it displaces organophosphates from the active site and hydrolyzes within minutes."
          },
          feedback: {
            tr: "Yanlış. Aktif organofosfat zehirlenmesinde fizostigmin verilmesi kolinesteraz inhibisyonunu daha da artırarak toksisiteyi ve ölümü hızlandırır.",
            ar: "غير صحيح. يؤدي إعطاء فيزوستيغمين أثناء التسمم بالفوسفات العضوي إلى مضاعفة تثبيط الكولينستراز وتسريع الوفاة.",
            en: "Incorrect. Giving an AChE inhibitor like physostigmine during organophosphate toxicity compounds enzyme inhibition, worsening lethal cholinergic crisis."
          }
        }
      ]
    }
  },

  // Step 11: Connection (Botulinum vs Tetanus)
  {
    id: 'pharm-mod4-les2-step11',
    stage: 'connection',
    phase: 'integrate',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Bütünsel Bağlantı: Botulinum ve Tetanoz Nörotoksinleri",
      ar: "ترابط شمولي: ذيفانا البوتولينوم والكزاز",
      en: "Holistic Connection: Botulinum vs Tetanus Neurotoxins"
    },
    prompt: {
      tr: "Hem Botulinum hem Tetanoz nörotoksinleri SNARE proteinlerini kesen çinko endopeptidazlardır. Neden Botulinum gevşek felç yaparken Tetanoz şiddetli spastik kasılmalara yol açar?",
      ar: "كلا ذيفاني البوتولينوم والكزاز من إندوببتيدازات الزنك التي تقطع بروتينات SNARE. لماذا يحدث البوتولينوم شللاً رخواً، بينما يثير الكزاز تشنجات كزازية عاتية؟",
      en: "Both Botulinum and Tetanus neurotoxins are zinc-endopeptidases that cleave SNARE proteins. Why does Botulinum produce flaccid paralysis, whereas Tetanus provokes violent spastic convulsions?"
    },
    hints: {
      nudge: {
        tr: "Her iki toksin de aynı moleküler mekanizmayı (SNARE kesimi) kullanır, ancak etki gösterdikleri anatomik bölgeler tamamen farklıdır.",
        ar: "يستخدم كلا الذيفانين الآلية الجزيئية ذاتها (شطر SNARE)، ولكن مواقعهما التشريحية للعمل مختلفة تماماً.",
        en: "Both toxins share the same molecular mechanism (SNARE cleavage), but their anatomical sites of action are completely different."
      },
      clue: {
        tr: "Toksinler motor sinir ucuna girdikten sonra nereye gider? Spinal korddaki inhibitör internöronlara retrograd taşınmayı düşünün.",
        ar: "أين ينتقل كل ذيفان بعد دخول النهاية المحركة؟ فكر في النقل المحواري الرجوعي إلى العصبونات التثبيطية في النخاع الشوكي.",
        en: "Where does each toxin travel after entering the nerve terminal? Consider retrograde axonal transport to spinal inhibitory interneurons."
      },
      solution: {
        tr: "Botulinum nöromusküler kavşakta lokal kalarak ACh'yi engeller (gevşek felç); Tetanoz ise spinal korddaki Renshaw hücrelerine taşınarak GABA ve glisin salınımını engeller (spastik felç).",
        ar: "يعمل البوتولينوم موضعياً في الوصل العصبي العضلي مانعاً الأسيتيل كولين (شلل رخو)؛ بينما يهاجر الكزاز رجوعياً للنخاع مانعاً تحرر الغابا والغليسين (تشنج كزازي).",
        en: "Botulinum acts locally at peripheral neuromuscular junctions to block ACh (flaccid). Tetanus migrates retrogradely to spinal inhibitory interneurons to block GABA/glycine (spastic)."
      }
    },
    conceptCheck: {
      question: {
        tr: "Botulinum ve Tetanoz toksinleri aynı enzimatik etkiye sahipken neden zıt felç tabloları oluşturur?",
        ar: "لماذا يولد ذيفانا البوتولينوم والكزاز شللين متناقضين رغم امتلاكهما الفعالية الإنزيمية ذاتها؟",
        en: "Why do Botulinum and Tetanus toxins produce opposing paralytic states despite sharing enzymatic SNARE cleavage?"
      },
      options: [
        {
          id: 'opt-l8-s11-1',
          isCorrect: true,
          text: {
            tr: "Botulinum periferik kolinerjik nöromusküler kavşakta lokal etki gösterir (ACh'yi engeller); Tetanoz ise retrograd taşınarak spinal inhibitör internöronlara ulaşır (GABA/glisini engeller).",
            ar: "يعمل البوتولينوم موضعياً في الوصل العصبي العضلي الكوليني (حاجباً الأسيتيل كولين)؛ بينما ينتقل الكزاز رجوعياً لعصبونات النخاع التثبيطية (حاجباً الغابا والغليسين).",
            en: "Botulinum acts locally at peripheral cholinergic neuromuscular junctions (blocking ACh release); Tetanus undergoes retrograde axonal transport to spinal inhibitory interneurons (blocking GABA/glycine release)."
          },
          feedback: {
            tr: "Doğru. Anatomik hedef tabloyu belirler: Botulinum kavşakta ACh'yi keserek gevşek felç yapar; Tetanoz ise spinal Renshaw hücrelerinde inhibitör GABA/glisini keserek spastik felç yapar.",
            ar: "صحيح. الموقع التشريحي يحدد المرضية: يحجب البوتولينوم الأسيتيل كولين محيطياً (شلل رخو)، بينما يهاجر الكزاز للنخاع قاطعاً تثبيط الغابا والغليسين (تشنج كزازي).",
            en: "Correct. Site of action dictates pathology: Botulinum blocks peripheral ACh release (flaccid). Tetanus undergoes retrograde transport to silence spinal inhibitory interneurons (spastic)."
          }
        },
        {
          id: 'opt-l8-s11-2',
          isCorrect: false,
          text: {
            tr: "Botulinum asetilkolin ekzositozunu bloke ederken, Tetanoz nikotinik Nm reseptörlerinde doğrudan süper-agonist gibi davranarak sürekli kasılmaya zorlar.",
            ar: "يحجب البوتولينوم إخراج الأسيتيل كولين، بينما يعمل الكزاز كمنبه فائق مباشر لمستقبلات Nm، فارضاً انقباضاً مستمراً.",
            en: "Botulinum blocks acetylcholine exocytosis, while Tetanus acts as a direct super-agonist on nicotinic Nm receptors, forcing continuous contraction."
          },
          feedback: {
            tr: "Yanlış. Tetanoz toksininin nikotinik reseptörlerde agonist etkisi yoktur; spastisite spinal internöronların disinhibisyonundan kaynaklanır.",
            ar: "غير صحيح. ليس لذيفان الكزاز فعالية تنبيهية على مستقبلات النيكوتين؛ تنجم التشنجات عن فقدان التثبيط المركزي في النخاع.",
            en: "Incorrect. Tetanus toxin has no agonist activity at nicotinic receptors; spasticity arises from disinhibition of spinal motor neurons."
          }
        },
        {
          id: 'opt-l8-s11-3',
          isCorrect: false,
          text: {
            tr: "Her iki toksin de sadece nöromusküler kavşakta kalır; Botulinum SNAP-25'i keserken Tetanoz kas kasılma miyozin zincirlerini keser.",
            ar: "يبقى كلا الذيفانين حصرياً في الوصل العصبي العضلي؛ يقطع البوتولينوم SNAP-25، بينما يقطع الكزاز سلاسل الميوزين الانقباضية.",
            en: "Both toxins remain strictly at the neuromuscular junction; Botulinum cleaves SNAP-25, whereas Tetanus cleaves muscle contractile myosin chains."
          },
          feedback: {
            tr: "Yanlış. Tetanoz toksini miyozini parçalamaz; karakteristik spastisitesi motor nöron boyu retrograd aksonal taşınarak merkezi sinir sistemine ulaşmasını gerektirir.",
            ar: "غير صحيح. لا يخرب الكزاز الميوزين؛ بل تتطلب تشنجاته المميزة انتقالاً رجوعياً عبر المحوار للوصول للجهاز العصبي المركزي.",
            en: "Incorrect. Tetanus toxin does not degrade myosin; its spasticity requires retrograde axonal transport to spinal inhibitory interneurons."
          }
        }
      ]
    }
  },

  // Step 12: Mastery Check (Transfer Challenge)
  {
    id: 'pharm-mod4-les2-step12',
    stage: 'mastery_check',
    phase: 'integrate',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Ustalık Sınavı: Antikolinerjik Toksidrom ve Fizostigmin Kurtarması",
      ar: "اختبار الإتقان: المتلازمة المضادة للكولين والإنقاذ بفيزوستيغمين",
      en: "Mastery Check: Anticholinergic Toxidrome & Physostigmine Rescue"
    },
    prompt: {
      tr: "Bir hasta hipertermi (40°C), kuru kızarık cilt, aşırı ağız kuruluğu, fiks dilate pupiller, deliryum ve idrar retansiyonuyla geliyor. Toksidromu, mekanizmayı ve kan-beyin bariyerini geçen uygun panzehiri belirleyin.",
      ar: "وصل مريض بارتفاع حرارة (40°C)، جلد أحمر جاف، جفاف فم شديد، حدقات متسعة ثابتة، هذيان واحتباس بول. حدد المتلازمة والآلية والترياق المناسب العابر للحاجز الدماغي.",
      en: "A patient presents with hyperthermia (40°C), flushed anhidrotic skin, extreme xerostomia, fixed dilated pupils, delirium, and urinary retention. Identify the toxidrome, mechanism, and the pharmacologically appropriate blood-brain barrier-penetrating antidote."
    },
    hints: {
      nudge: {
        tr: "Klinik anımsatıcıyı hatırlayın: 'Pancar gibi kırmızı, kemik gibi kuru, yarasa gibi kör, tavşan gibi sıcak, şapkacı gibi deli.' Cilt nemine dikkat edin!",
        ar: "تذكر العبارة السريرية الشهيرة: 'أحمر كالشمندر، جاف كالعظم، أعمى كالوطواط، ساخن كالأرنب، مجنون كصانع القبعات'. انتبه لرطوبة الجلد!",
        en: "Mnemonic: 'Red as a beet, dry as a bone, blind as a bat, hot as a hare, mad as a hatter.' Pay close attention to skin moisture and central delirium."
      },
      clue: {
        tr: "Muskarinik blokaj terlemeyi durdurur (anhidroz) ve santral deliryum yapar. Panzehirin santral semptomları düzeltmesi için kan-beyin bariyerini geçmesi şarttır.",
        ar: "يوقف الحصر الموسكاريني التعرق (جفاف تام) ويحدث هذياناً مركزياً. يجب أن يعبر الترياق الحاجز الدماغي لإنقاذ الوعي.",
        en: "Muscarinic blockade halts eccrine sweating (anhidrosis) and blocks central M1 receptors (delirium). The antidote must cross the blood-brain barrier."
      },
      solution: {
        tr: "Bu bir antikolinerjik toksidromdur; yük taşımayan tersiyer amin yapısıyla kan-beyin bariyerini geçebilen Fizostigmin ile tedavi edilir.",
        ar: "هذه متلازمة مضادة للكولين؛ تعالج بـ فيزوستيغمين كونه أميناً ثالثياً غير مشحون قادراً على عبور الحاجز الدماغي لعكس الهذيان.",
        en: "Anticholinergic toxidrome; treat with Physostigmine, an uncharged tertiary amine that crosses the blood-brain barrier to reverse central delirium."
      }
    },
    conceptCheck: {
      question: {
        tr: "Tablodaki zehirlenmenin toksidromu, reseptör mekanizması ve santral etkili panzehiri hangisidir?",
        ar: "ما هي المتلازمة والآلية والترياق المركزي المناسب للحالة المذكورة؟",
        en: "What is the toxidrome, receptor mechanism, and central-acting antidote for this poisoning presentation?"
      },
      options: [
        {
          id: 'opt-l8-s12-1',
          isCorrect: true,
          text: {
            tr: "Muskarinik blokaj kaynaklı Antikolinerjik toksidrom; santral deliryumu düzeltmek için kan-beyin bariyerini geçen tersiyer amin Fizostigmin ile tedavi edilir.",
            ar: "متلازمة مضادة للكولين عبر حصر المستقبلات الموسكارينية؛ تعالج بـ فيزوستيغمين (أمين ثالثي يعبر الحاجز الدماغي لعكس الهذيان المركزي).",
            en: "Anticholinergic toxidrome via muscarinic receptor blockade; treat with Physostigmine (a tertiary amine that crosses the blood-brain barrier to reverse central delirium)."
          },
          feedback: {
            tr: "Doğru! Klasik antikolinerjik toksidrom. Cildin tamamen kuru olması (anhidroz) onu terli sempatomimetik toksisiteden ayırır. Fizostigmin tersiyer amin yapısıyla KBB'yi geçer.",
            ar: "صحيح! المتلازمة الكلاسيكية لمضادات الموسكارين. يميز جفاف الجلد (اللاحرق) هذه الحالة عن التسمم الودي (التعرق الغزير). ويعبر فيزوستيغمين الحاجز الدماغي كونه أميناً ثالثياً.",
            en: "Correct! Classical anticholinergic toxidrome. Anhidrosis (dry skin) differentiates it from sympathomimetic toxicity (sweaty). Physostigmine is a tertiary amine crossing the BBB."
          }
        },
        {
          id: 'opt-l8-s12-2',
          isCorrect: false,
          text: {
            tr: "Alfa-1/beta-1 hiperstimülasyonu kaynaklı Sempatomimetik toksidrom; intravenöz yüksek doz beta-bloker Esmolol ile tedavi edilir.",
            ar: "متلازمة شبيهة بالودي عبر فرط تنبيه مستقبلات ألفا-1/بيتا-1؛ تعالج بجرعة عالية من حاصر بيتا إسمولول وريدياً.",
            en: "Sympathomimetic toxidrome via alpha-1/beta-1 adrenoceptor hyperstimulation; treat with intravenous high-dose beta-blocker Esmolol."
          },
          feedback: {
            tr: "Yanlış. Sempatomimetik toksisitede (kokain/amfetamin) taşikardi ve hipertermiye rağmen şiddetli terleme (diaforez) görülür. Antikolinerjikte ise cilt tamamen kurudur.",
            ar: "غير صحيح. تترافق المتلازمة الودية (كوكايين/أمفيتامين) بتعرق غزير رغم الحرارة المرتفعة؛ بينما يكون الجلد جافاً تماماً في التسمم بمضادات الكولين.",
            en: "Incorrect. Sympathomimetic toxicity presents with profuse diaphoresis (sweating). Anticholinergic toxicity produces dry (anhidrotic) skin."
          }
        },
        {
          id: 'opt-l8-s12-3',
          isCorrect: false,
          text: {
            tr: "Antikolinerjik toksidrom; bilinci kurtarmak amacıyla merkezi sinir sistemine selektif geçen kuaterner amin Neostigmin ile tedavi edilir.",
            ar: "متلازمة مضادة للكولين؛ تعالج بـ نيوستيغمين (أمين رابعي ينفذ انتقائياً للجهاز العصبي المركزي لإنقاذ الوعي).",
            en: "Anticholinergic toxidrome; treat with Neostigmine (a quaternary amine that selectively penetrates the central nervous system to rescue consciousness)."
          },
          feedback: {
            tr: "Yanlış. Neostigmin kalıcı yüklü kuaterner amonyum taşır ve kan-beyin bariyerini ASLA GEÇEMEZ; santral deliryumu düzeltemez. Yalnızca tersiyer amin Fizostigmin beyne geçer.",
            ar: "غير صحيح. يحمل النيوستيغمين أميناً رابعياً مشحوناً دائماً ولا يعبر إطلاقاً الحاجز الدماغي؛ فلا يعكس الهذيان المركزي. وحده فيزوستيغمين يعبر للدماغ.",
            en: "Incorrect. Neostigmine possesses a permanently charged quaternary nitrogen that CANNOT cross the blood-brain barrier; only tertiary amines like physostigmine enter the CNS."
          }
        }
      ]
    }
  }
];

// Apply updates to Lesson 08
function updateLesson08(filePath) {
  const lesson = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  lesson08Steps.forEach((newStepData, idx) => {
    if (idx === 4) {
      // Step 5: Preserve widget config, add hints
      const step5 = lesson.steps[4];
      step5.hints = [
        {
          tier: 1,
          tr: "Asetilkolinin pozitif yüklü kuaterner amonyumunu, ester karbonilini ve etilen zincirini inceleyin.",
          ar: "افحص الأمونيوم الرابعي الموجب وإستر الكربونيل وجسر الإيثيلين في الأسيتيل كولين.",
          en: "Examine acetylcholine's positively charged quaternary ammonium, ester carbonyl, and ethylene spacer."
        },
        {
          tier: 2,
          tr: "Asp147 kuaterner amonyum ile iyonik bağ kurar; Tyr506 katyon-pi kafesi oluşturur; Asn507 ester oksijeniyle H-bağı yapar.",
          ar: "يشكل Asp147 رابطاً أيونياً مع الأمونيوم؛ ويوفر Tyr506 قفصاً عطرياً (كاتيون-باي)؛ ويصنع Asn507 رابطاً هيدروجينياً مع الإستر.",
          en: "Asp147 provides an ionic anchor for quaternary ammonium; Tyr506 creates a cation-pi cage; Asn507 H-bonds with carbonyl."
        },
        {
          tier: 3,
          tr: "Kuaterner azotu Asp147'ye (iyonik), kolin metillerini Tyr506'ya (pi-pi), karbonil oksijenini Asn507'ye (H-bağı) ve etilen omurgasını Trp199'a (van der Waals) yerleştirin.",
          ar: "اربط الأمونيوم الرابعي بـ Asp147 (أيوني)، والميثيل بـ Tyr506 (كاتيون-باي)، وأكسجين الكربونيل بـ Asn507 (هيدروجيني)، والإيثيلين بـ Trp199.",
          en: "Dock quaternary ammonium into Asp147 (ionic), methyl groups into Tyr506 (cation-pi), ester carbonyl into Asn507 (H-bond), and ethylene into Trp199 (van der Waals)."
        }
      ];
      return;
    }

    const step = lesson.steps[idx];
    step.title = newStepData.title;
    step.prompt = newStepData.prompt;
    if (newStepData.hints) {
      step.hints = [
        { tier: 1, tr: newStepData.hints.nudge.tr, ar: newStepData.hints.nudge.ar, en: newStepData.hints.nudge.en },
        { tier: 2, tr: newStepData.hints.clue.tr, ar: newStepData.hints.clue.ar, en: newStepData.hints.clue.en },
        { tier: 3, tr: newStepData.hints.solution.tr, ar: newStepData.hints.solution.ar, en: newStepData.hints.solution.en }
      ];
    }
    step.conceptCheck = newStepData.conceptCheck;
    if (!step.config) step.config = {};
    step.config.options = JSON.parse(JSON.stringify(newStepData.conceptCheck.options));
    step.config.prompt = newStepData.prompt;
    step.config.title = newStepData.title;
  });

  fs.writeFileSync(filePath, JSON.stringify(lesson, null, 2), 'utf8');
  console.log('Successfully updated Lesson 08 at:', filePath);
}

// Execute updates
const worktreeL7 = 'courses/pharmacology/lessons/lesson-07.json';
const worktreeL8 = 'courses/pharmacology/lessons/lesson-08.json';
updateLesson07(worktreeL7);
updateLesson08(worktreeL8);

// Synchronize to main repo
const mainRepoL7 = 'C:/Users/hp/Documents/antigravity/valiant-raman/courses/pharmacology/lessons/lesson-07.json';
const mainRepoL8 = 'C:/Users/hp/Documents/antigravity/valiant-raman/courses/pharmacology/lessons/lesson-08.json';
if (fs.existsSync(path.dirname(mainRepoL7))) {
  updateLesson07(mainRepoL7);
  updateLesson08(mainRepoL8);
  console.log('Synchronized to main repository successfully!');
}
