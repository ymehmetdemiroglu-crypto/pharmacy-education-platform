const fs = require('fs');
const path = require('path');

const lesson07 = {
  id: "pharm-mod4-les1",
  courseId: "pharmacology",
  moduleId: "ph-mod-04",
  title: {
    tr: "Otonom Sinir Sistemi: Adrenerjik Nörotransmisyon ve Reseptör Alt Tipleri",
    ar: "الجهاز العصبي الذاتي: النقل العصبي الأدريناليني والأنماط الفرعية للمستقبلات",
    en: "Autonomic Nervous System: Adrenergic Neurotransmission & Receptor Subtypes"
  },
  order: 1,
  access: "free",
  objective: {
    tr: "Adrenerjik alfa-1, alfa-2, beta-1 ve beta-2 reseptörlerinin sinyal iletim yolaklarını, Dale vazomotor tersinme fenomenini ve feokromositoma kriz yönetimini yönetmek.",
    ar: "إتقان مسارات تأشير المستقبلات الأدرينالينية alpha-1 و alpha-2 و beta-1 و beta-2، وظاهرة انعكاس ديل الوعائي، والتدبير العلاجي لأزمة ورم القواتم.",
    en: "Master adrenergic alpha-1, alpha-2, beta-1, and beta-2 receptor signaling cascades, Dale's vasomotor reversal phenomenon, and pheochromocytoma crisis management."
  },
  misconceptions: [
    {
      tr: "Tüm sempatik reseptörlerin aynı hücresel sinyali (cAMP artışı) ürettiği yanılgısı (alfa-1 Gq ile IP3/DAG/Ca2+ üretirken, alfa-2 Gi ile cAMP'yi düşürür, beta reseptörleri Gs ile cAMP'yi artırır).",
      ar: "الظن الخاطئ بأن جميع المستقبلات الودية تنتج نفس الإشارة الخلوية (alpha-1 تعمل عبر Gq و IP3/Ca2+، و alpha-2 عبر Gi لخفض cAMP، بينما مستقبلات بيتا تعمل عبر Gs لرفع cAMP).",
      en: "The misconception that all adrenergic receptors elicit uniform cellular signals (alpha-1 couples to Gq/IP3/Ca2+, alpha-2 couples to Gi/lowering cAMP, and beta receptors couple to Gs/cAMP)."
    },
    {
      tr: "Feokromositoma krizinde taşikardiyi önlemek için önce beta-bloker verilmesi gerektiği yanılgısı (önce beta-bloker verilirse vazodilatör beta-2 bloke olur, devasa katekolamin yükü alfa-1'i tek başına uyararak ölümcül hipertansif krize yol açar).",
      ar: "الاعتقاد الخاطئ بإمكانية إعطاء حاصرات بيتا قبل حاصرات ألفا في ورم القواتم (حصر بيتا أولاً يلغي التوسع الوعائي عبر beta-2، فيتفرد التحفيز الألفاوي مسبباً نوبة فرط ضغط قاتلة).",
      en: "The fatal belief that beta-blockers should precede alpha-blockers in pheochromocytoma (blocking beta-2 first leaves massive alpha-1 vasoconstriction unopposed, precipitating lethal hypertensive crisis)."
    }
  ],
  sources: [
    {
      file: "Otonom Sinir Sistemi.pdf",
      page: 14
    }
  ],
  citations: [
    {
      id: "CIT-KATZUNG-CH09-P130",
      book: "Katzung's Basic & Clinical Pharmacology",
      edition: "15th ed.",
      topic: "Adrenoceptor Agonists & Sympathomimetic Drugs",
      chapter: "Chapter 9: Adrenoceptor Agonists & Sympathomimetic Drugs",
      page: "pp. 130-148",
      status: "verified"
    },
    {
      id: "CIT-GG-CH08-P160",
      book: "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
      edition: "14th ed.",
      topic: "Adrenergic Agonists and Antagonists",
      chapter: "Chapter 8: Adrenergic Agonists and Antagonists",
      page: "pp. 160-185",
      status: "verified"
    }
  ],
  spacedReviewCards: [
    {
      cardId: "pharm-mod4-les1-card1",
      courseId: "pharmacology",
      drugOrConcept: "Alfa-1 Reseptör Sinyali ve Damar Yanıtı",
      prompt: "Alfa-1 adrenerjik reseptör hangi G-proteini ile kenetlidir ve damar düz kasında hangi ikinci ulak yolağını aktive eder?",
      answer: "Gq proteini ile kenetlidir; Fosfolipaz C (PLC) aktivasyonu ile IP3 ve DAG üreterek hücre içi serbest Ca2+ derişimini artırır ve vazokonstriksiyon yapar.",
      box: 1,
      intervalDays: 1
    },
    {
      cardId: "pharm-mod4-les1-card2",
      courseId: "pharmacology",
      drugOrConcept: "Dale Vazomotor Adrenalin Tersinmesi",
      prompt: "Alfa-bloker (fentolamin) verildikten sonra adrenalin enjekte edildiğinde kan basıncı neden yükselmek yerine düşer?",
      answer: "Fentolamin presör alfa-1 vazokonstriksiyonunu felç eder; adrenalinin damar düz kasındaki beta-2 reseptörlerini uyarması vazodilatasyona ve tansiyon düşüşüne yol açar.",
      box: 1,
      intervalDays: 1
    },
    {
      cardId: "pharm-mod4-les1-card3",
      courseId: "pharmacology",
      drugOrConcept: "Presinaptik Alfa-2 Otoreseptörü",
      prompt: "Presinaptik adrenerjik sinir ucundaki alfa-2 otoreseptörünün fizyolojik görevi ve kenetli olduğu G-proteini nedir?",
      answer: "Gi proteini ile kenetlidir; adenilat siklazı inhibe ederek ve kalsiyum girişini kapatarak veziküler noradrenalin salıverilmesini otoregülatuvar olarak durdurur.",
      box: 1,
      intervalDays: 1
    },
    {
      cardId: "pharm-mod4-les1-card4",
      courseId: "pharmacology",
      drugOrConcept: "Feokromositomada Blokaj Sırası Kuralı",
      prompt: "Feokromositomalı bir hastada neden ASLA alfa-blokerden önce tek başına beta-bloker verilmez?",
      answer: "Beta-2 vazodilatasyonu bloke edildiğinde, dolaşımdaki devasa katekolaminler damar alfa-1 reseptörlerini engelsiz uyarır ve ölümcül hipertansif krize neden olur.",
      box: 1,
      intervalDays: 1
    }
  ],
  steps: [
    // Step 1: Hook (predict_reveal, predictThenReveal: true)
    {
      id: "pharm-mod4-les1-step1",
      order: 1,
      stageIndex: 1,
      stage: "hook",
      type: "predict_reveal",
      title: {
        tr: "Klinik Paradoks: Dale Vazomotor Adrenalin Tersinmesi",
        ar: "مفارقة سريرية: ظاهرة ديل لانعكاس الأدرينالين الوعائي",
        en: "Clinical Paradox: Dale's Vasomotor Epinephrine Reversal"
      },
      predictThenReveal: true,
      prompt: {
        tr: "Adrenalin normalde güçlü bir tansiyon yükselticidir. Ancak alfa-bloker fentolamin alan bir hayvana adrenalin verildiğinde, kan basıncı neden feci şekilde DÜŞER?",
        ar: "الأدرينالين رافع قوي لضغط الدم طبيعياً. لكن عند حقنه لحيوان عولج بحاصر ألفا (فينتولامين)، يهبط ضغط الدم بشكل حاد ومفاجئ! لماذا؟",
        en: "Epinephrine normally elevates blood pressure. But in an animal pretreated with the alpha-blocker phentolamine, why does epinephrine trigger a precipitous blood pressure DROP?"
      },
      conceptCheck: {
        question: {
          tr: "Alfa blokaj sonrasında adrenalinin presör (yükseltici) etkisinin depresör (düşürücü) yanıta dönüşmesinin hücresel mekanizması nedir?",
          ar: "ما الآلية الخلوية التي تقلب أثر الأدرينالين الرافع للضغط إلى هبوط وعائي حاد بعد حصر مستقبلات ألفا؟",
          en: "What cellular mechanism transforms epinephrine's pressor response into acute hypotension following alpha blockade?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Fentolamin damar büzücü alfa-1 reseptörlerini kilitler; adrenalinin uyardığı damar genişletici beta-2 reseptörleri maskesiz kalarak tansiyonu düşürür.",
              ar: "يقفل الفينتولامين مستقبلات alpha-1 القابضة؛ فينفرد تنشيط مستقبلات beta-2 الموسعة للأوعية ويهبط الضغط.",
              en: "Phentolamine blocks vasoconstrictor alpha-1 receptors; unopposed beta-2 receptor activation by epinephrine produces vasodilatation and hypotension."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Harika farmakolojik teşhis! Adrenalin hem alfa-1 (büzücü) hem beta-2 (genişletici) reseptörleri uyarır. Normalde alfa-1 baskındır; alfa felç edilince saf beta-2 gevşemesi açığa çıkar.",
              ar: "تشخيص دوائي بارع! ينشط الأدرينالين alpha-1 و beta-2 معاً، والسيطرة عادة لألفا؛ فعند تعطيل ألفا ينكشف أثر بيتا-2 الموسع للأوعية.",
              en: "Brilliant clinical deduction! Epinephrine stimulates both alpha-1 and beta-2. Normally alpha-1 dominates; blocking alpha unmasks pure beta-2 vasodilatation."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Fentolamin adrenalini kimyasal olarak asetilkoline dönüştürerek kalpteki muskarinik reseptörleri aktive eder.",
              ar: "يحول الفينتولامين الأدرينالين كيميائياً إلى أسيتيل كولين مما ينشط المستقبلات المسكارينية في القلب.",
              en: "Phentolamine chemically isomerizes epinephrine into acetylcholine, directly stimulating cardiac muscarinic receptors."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Bir reseptör blokeri dolaşımdaki bir katekolamini başka bir nörotransmittere dönüştüremez; bu kimyasal bir efsanedir.",
              ar: "غير صحيح: حاصرات المستقبلات لا تحول مركباً كيميائياً لآخر؛ هذا خيال لا أساس له كيميائياً.",
              en: "Incorrect: Receptor antagonists cannot chemically transform circulating ligands into completely different neurotransmitters."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Adrenalin fentolamin varlığında kalpteki beta-1 reseptörlerini tamamen dondurarak kalp debisini sıfırlar.",
              ar: "يجمد الأدرينالين بوجود الفينتولامين مستقبلات beta-1 في القلب تماماً مما يوقف النتاج القلبي.",
              en: "In the presence of phentolamine, epinephrine completely paralyzes cardiac beta-1 receptors, dropping cardiac output to zero."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Adrenalin beta-1'i uyarmaya devam eder (taşikardi sürer); tansiyon düşüşü kalpten değil periferik damar beta-2 vazodilatasyonundan kaynaklanır.",
              ar: "غير صحيح: يستمر الأدرينالين بتحفيز beta-1 القلبي (وتحدث تسرع قلب)؛ وهبوط الضغط ناجم عن التوسع الوعائي المحيطي عبر beta-2.",
              en: "Incorrect: Epinephrine continues to stimulate cardiac beta-1 (tachycardia persists); hypotension is driven by peripheral beta-2 vasodilatation."
            }
          }
        ]
      },
      technicalTerms: [
        {
          term: "Dale Vazomotor Tersinmesi",
          transcription: "Dale's Vasomotor Reversal",
          definition: "Alfa reseptör blokajından sonra adrenalinin damar genişletici beta-2 etkisinin açığa çıkmasıyla tansiyonun paradoksal düşmesi.",
          ar: {
            term: "انعكاس ديل الوعائي",
            transcription: "Dale's Vasomotor Reversal",
            definition: "الانقلاب التناقضي لأثر الأدرينالين من رافع للضغط إلى خافض له نتيجة انكشاف التأثير الموسع عبر beta-2 بعد حصر alpha."
          },
          en: {
            term: "Vasomotor Reversal",
            transcription: "Dale's Vasomotor Reversal",
            definition: "The paradoxical conversion of epinephrine's pressor response into a depressor response following alpha-adrenergic blockade."
          }
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Adrenalin sadece alfa reseptörleri mi uyarır, yoksa beta reseptörleri de uyarır mı?",
          ar: "هل ينشط الأدرينالين مستقبلات ألفا فقط، أم ينشط مستقبلات بيتا أيضاً؟",
          en: "Does epinephrine stimulate only alpha receptors, or does it also stimulate beta receptors?"
        },
        {
          tier: 2,
          tr: "Alfa-1 damarları büzer (vazokonstriksiyon); beta-2 damarları gevşetir (vazodilatasyon).",
          ar: "مستقبلات alpha-1 تقبض الأوعية، بينما مستقبلات beta-2 ترخي الأوعية.",
          en: "Alpha-1 constricts blood vessels; beta-2 dilates vascular smooth muscle."
        },
        {
          tier: 3,
          tr: "Alfa-1 fentolaminle kilitlendiğinde, adrenalinin damar genişletici beta-2 etkisi tek başına kalır ve tansiyonu düşürür.",
          ar: "عند قفل alpha-1 بالفينتولامين، ينكشف أثر توسيع الأوعية عبر beta-2 منفرداً فيهبط الضغط.",
          en: "When alpha-1 is blocked by phentolamine, unopposed beta-2 vasodilatation drops blood pressure."
        }
      ]
    },

    // Step 2: Question
    {
      id: "pharm-mod4-les1-step2",
      order: 2,
      stageIndex: 2,
      stage: "question",
      type: "question",
      title: {
        tr: "Kavramsal Soru: Zıt Yanıtların Kaynağı",
        ar: "سؤال مفاهيمي: منشأ الاستجابات المتناقضة",
        en: "Conceptual Question: The Origin of Opposing Responses"
      },
      prompt: {
        tr: "Aynı adrenalin molekülü cilt arteriyollerinde şiddetli kasılma yaparken, iskelet kası damarlarında ve bronşlarda nasıl tam tersine güçlü bir gevşeme yaratabilir?",
        ar: "كيف لجزيء الأدرينالين نفسه أن يحدث انقباضاً وعائياً حاداً في الجلد، بينما يسبب في عضلات الهيكل والبرونش توسعاً وارتخاءً تاماً؟",
        en: "How can the exact same epinephrine molecule trigger intense constriction in skin arterioles while causing profound relaxation in muscle arterioles and airways?"
      },
      conceptCheck: {
        question: {
          tr: "Bir nörotransmittere farklı dokularda taban tabana zıt fizyolojik yanıtlar verdiren temel hücresel faktör nedir?",
          ar: "ما العامل الخلوي الأساسي الذي يملي استجابات فسيولوجية متناقضة لنفس الناقل العصبي؟",
          en: "What primary cellular factor dictates completely opposing physiological responses to the same neurotransmitter across tissues?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Hedef dokulardaki reseptör alt tipinin (alfa-1 vs beta-2) ve bunlara kenetli heterotrimerik G-proteinlerinin (Gq vs Gs) farklı olmasıdır.",
              ar: "اختلاف نمط المستقبل (alpha-1 مقابل beta-2) وبروتين G المقترن به (Gq الحافز للكالسيوم مقابل Gs الحافز لـ cAMP).",
              en: "The expression of distinct receptor subtypes (alpha-1 vs beta-2) coupled to divergent G-protein cascades (Gq vs Gs)."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Mükemmel biyolojik anlayış! Yanıtı belirleyen ligantın kendisi değil, bağlandığı reseptörün hücre içine hangi G-proteini sinyalini ilettiğidir.",
              ar: "إدراك بيولوجي سليم! الاستجابة لا يمليها الدواء نفسه بل هوية بروتين G الذي يطلقه المستقبل داخل الخلية المستهدفة.",
              en: "Superb pharmacological insight! The biological response is dictated not by the ligand, but by the specific G-protein coupled to the target receptor."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Ciltteki kılcal damarların lümen pH'sının asidik, iskelet kası damarlarının alkali olmasıdır.",
              ar: "حموضة لمعة الشعيرات الدموية في الجلد مقارنة بقلوية لمعة أوعية العضلات الهيكلية.",
              en: "Acidic luminal pH in skin capillaries versus alkaline luminal pH in skeletal muscle arterioles."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Kan pH'sı tüm vücutta 7.35-7.45 arasında dar bir aralıkta tutulur; zıt yanıtlar pH farkından kaynaklanmaz.",
              ar: "غير صحيح: باهاء الدم ثابتة في كل الجسم (7.35-7.45)؛ والتباين ليس ناتجاً عن فروق حموضة موضعية.",
              en: "Incorrect: Blood pH is tightly regulated at 7.35-7.45 body-wide; opposing responses are not driven by pH gradients."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Adrenalinin cilt damarlarına arterden, iskelet kası damarlarına ise lenfatik kanallardan ulaşmasıdır.",
              ar: "وصول الأدرينالين لأوعية الجلد عبر الشرايين، بينما يصل للعضلات عبر القنوات اللمفاوية.",
              en: "Epinephrine reaching cutaneous vessels via arteries while reaching muscle vessels through lymphatic ducts."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Adrenalin adrenal medulladan salınır ve tüm organlara sistemik arteriyel kan yoluyla eşit dağılır.",
              ar: "غير صحيح: يفرز الأدرينالين هرمونياً في الدوران الشرياني العام ويصل لكل الأنسجة عبر مجرى الدم الشرياني.",
              en: "Incorrect: Epinephrine is delivered to all vascular beds simultaneously via systemic arterial blood."
            }
          }
        ]
      },
      technicalTerms: [
        {
          term: "Reseptör Heterojenitesi",
          transcription: "Receptor Heterogeneity",
          definition: "Aynı endojen liganta bağlanan ancak farklı dokularda farklı sinyal yolaklarına kenetli çoklu reseptör alt tiplerinin varlığı.",
          ar: {
            term: "تغاير المستقبلات",
            transcription: "Receptor Heterogeneity",
            definition: "وجود أنماط فرعية متعددة لنفس المستقبل ترتبط بالربيط نفسه لكنها تقترن بمسارات تأشير خلوية متباينة."
          },
          en: {
            term: "Receptor Heterogeneity",
            transcription: "Receptor Heterogeneity",
            definition: "The existence of multiple distinct receptor subtypes that bind the same ligand but couple to divergent intracellular cascades."
          }
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Cilt damarlarında hangi reseptör, iskelet kası damarlarında hangi reseptör baskındır?",
          ar: "أي مستقبل يسود في أوعية الجلد، وأي مستقبل يسود في أوعية العضلات الهيكلية؟",
          en: "Which receptor dominates in cutaneous vessels, and which dominates in skeletal muscle arterioles?"
        },
        {
          tier: 2,
          tr: "Alfa-1 reseptörü kalsiyum artırarak kasar; Beta-2 reseptörü cAMP ile gevşetir.",
          ar: "مستقبلات alpha-1 تقبض برفع الكالسيوم، ومستقبلات beta-2 ترخي برفع cAMP.",
          en: "Alpha-1 contracts via calcium surge; beta-2 relaxes via cAMP generation."
        },
        {
          tier: 3,
          tr: "Farklı dokular farklı reseptör alt tipleri (alfa-1 vs beta-2) ve farklı G-proteinleri (Gq vs Gs) eksprese eder.",
          ar: "الأنسجة المختلفة تعبر عن أنماط مختلفة من المستقبلات وبروتينات G (Gq المقلص مقابل Gs المرخي).",
          en: "Different tissues express distinct receptor subtypes (alpha-1 vs beta-2) and G-proteins (Gq vs Gs)."
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
        tr: "Fiziksel Sezgi: Savaş ya da Kaç Enerji Yönlendiricisi",
        ar: "الحدس الفيزيائي: موجه طاقة الكر والفر",
        en: "Physical Intuition: The Fight-or-Flight Power Router"
      },
      prompt: {
        tr: "Bir kaplan saldırısında hayatta kalmak için vücut sınırlı kan akımını nereye yönlendirmelidir: sindirim ve cilt kapillerlerine mi, yoksa koşan bacak kaslarına ve kalbe mi?",
        ar: "للنجاة من هجوم نمر مفترس، أين يوجه الجسم جريان الدم المحدود: إلى شعيرات الجلد والجهاز الهضمي، أم إلى عضلات الركض والقلب؟",
        en: "To survive a predator attack, where must the body route its limited blood flow: digestive capillaries, or running leg muscles and heart?"
      },
      conceptCheck: {
        question: {
          tr: "Sempatik sistemin 'savaş ya da kaç' cevabında kanı hayati organlara aktarmasını sağlayan adrenerjik organizasyon nedir?",
          ar: "ما التنظيم الأدريناليني الذي يعيد توجيه الدم نحو الأعضاء الحيوية في استجابة الكر والفر؟",
          en: "What adrenergic organization redirects blood to critical organs during the fight-or-flight response?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Alfa-1 ile cilt ve iç organ damarları büzülür; beta-2 ile kas damarları ve bronşlar genişletilerek oksijen akımı maksimize edilir.",
              ar: "تقبض alpha-1 أوعية الجلد والأحشاء؛ وتوسع beta-2 أوعية العضلات والبرونش لتعظيم إمداد الأكسجين.",
              en: "Alpha-1 clamps visceral and cutaneous vessels; beta-2 dilates skeletal muscle vessels and airways to maximize oxygen delivery."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Harika evrimsel ve farmakolojik mantık! Bu sayede sindirim askıya alınır; kan doğrudan koşan kaslara ve çalışan kalbe (beta-1) sevk edilir.",
              ar: "منطق فسيولوجي وتطوري سليم! يعلق الهضم مؤقتاً لتوجيه كامل الدم إلى عضلات الهرب والقلب.",
              en: "Superb physiological insight! Digestion is suspended; blood is channeled directly to fleeing skeletal muscle and the working heart."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Alfa-1 ile tüm vücut damarları gevşetilir ve kan basıncı sıfıra indirilerek enerji tasarrufu sağlanır.",
              ar: "ترخي alpha-1 جميع شرايين الجسم لخفض الضغط إلى الصفر توفيراً للطاقة الحيوية.",
              en: "Alpha-1 dilates all vascular beds body-wide, dropping blood pressure to zero to conserve metabolic energy."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Tam tersi! Tansiyonun sıfıra inmesi kardiyojenik şok ve bayılma demektir; sempatik tonus tansiyonu yükseltir.",
              ar: "العكس تماماً! هبوط الضغط يعني صدمة إغماء فورية؛ بينما الجهاز الودي يرفع الضغط لتأمين تروية الدماغ.",
              en: "The exact opposite! Zero blood pressure triggers circulatory collapse and syncope; sympathetic tone maintains perfusion."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Beta-2 reseptörleri kalbi durdurur, alfa-1 reseptörleri ise akciğer alveollerini sıvı ile doldurur.",
              ar: "توقف مستقبلات beta-2 نبض القلب، وتملأ مستقبلات alpha-1 الحويصلات الهوائية بالسوائل.",
              en: "Beta-2 receptors arrest cardiac contraction, while alpha-1 receptors fill pulmonary alveoli with fluid."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Absürt yanılgı: Sempatik sistem kalbi hızlandırır (beta-1) ve bronşları açarak solunumu rahatlatır (beta-2).",
              ar: "خطأ تام: الجهاز الودي يسرع القلب عبر beta-1 ويوسع الشعب الهوائية عبر beta-2 لزيادة الأكسجين.",
              en: "Absurd misconception: Sympathetic stimulation accelerates the heart (beta-1) and dilates airways (beta-2)."
            }
          }
        ]
      },
      technicalTerms: [
        {
          term: "Savaş ya da Kaç Yanıtı",
          transcription: "Fight-or-Flight Response",
          definition: "Akut tehlike anında sempatik adrenerjik deşarj ile kanın kas ve beyne yönlendirilmesi süreci.",
          ar: {
            term: "استجابة الكر والفر",
            transcription: "Fight-or-Flight Response",
            definition: "التدفق الأدريناليني الودي الشامل في مواجهة الخطر لإعادة توجيه الطاقة والدم نحو العضلات والدماغ."
          },
          en: {
            term: "Fight-or-Flight",
            transcription: "Fight-or-Flight Response",
            definition: "The massive sympathetic adrenergic discharge that redirects cardiac output to skeletal muscle and brain during acute threat."
          }
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Kaçarken cildinizin kanlanması mı yoksa bacak kaslarınızın oksijenlenmesi mi hayat kurtarır?",
          ar: "أثناء الهروب، هل يهم تدفق الدم للجلد أم تروية عضلات الساقين بالأكسجين؟",
          en: "During escape, does perfusing skin capillaries matter, or oxygenating leg muscle engines?"
        },
        {
          tier: 2,
          tr: "Cilt damarları büzülür (alfa-1 ile solgunluk); kas damarları genişler (beta-2).",
          ar: "تنقبض أوعية الجلد (شحوب عبر alpha-1)؛ وتتسع أوعية العضلات عبر beta-2.",
          en: "Skin vessels constrict (alpha-1 pallor); skeletal muscle beds dilate (beta-2)."
        },
        {
          tier: 3,
          tr: "Sempatik sistem alfa-1 ile periferik muslukları kapatır, beta-2 ile kas kapılarını sonuna kadar açar.",
          ar: "يقفل الجهاز الودي صنابير المحيط بـ alpha-1، ويفتح أبواب العضلات بـ beta-2 لتغذية الركض.",
          en: "Sympathetic tone clamps peripheral faucets via alpha-1, opening muscle floodgates via beta-2."
        }
      ]
    },

    // Step 4: Visual Explanation
    {
      id: "pharm-mod4-les1-step4",
      order: 4,
      stageIndex: 4,
      stage: "visual_explanation",
      type: "visual_explanation",
      title: {
        tr: "Görsel Açıklama: Gq vs Gs İkinci Ulak Çatallanması",
        ar: "الشرح البصري: تشعب الرسل الثواني بين Gq و Gs",
        en: "Visual Explanation: Gq vs Gs Second Messenger Bifurcation"
      },
      prompt: {
        tr: "İkinci ulak şemasına bakın: Alfa-1 reseptörü Gq aracılığıyla IP3 ve Ca2+ artışı sağlarken; Beta-1 ve Beta-2 reseptörleri Gs üzerinden cAMP ve PKA'yı aktive eder.",
        ar: "تأمل مخطط الرسل الثواني: ينشط alpha-1 بروتين Gq لرفع IP3 و Ca2+؛ بينما ينشط beta-1 و beta-2 بروتين Gs لإنتاج cAMP و PKA.",
        en: "Examine the second messenger map: Alpha-1 couples to Gq generating IP3 and Ca2+, whereas Beta-1 and Beta-2 couple to Gs activating cAMP and PKA."
      },
      conceptCheck: {
        question: {
          tr: "Hücre içi cAMP/PKA artışı kalp kasında (beta-1) kasılmayı artırırken, bronş düz kasında (beta-2) neden gevşeme sağlar?",
          ar: "لماذا يؤدي ارتفاع cAMP/PKA إلى زيادة تقلص عضلة القلب (beta-1)، بينما يحدث ارتخاءً في عضلات القصبات (beta-2)؟",
          en: "Why does elevated cAMP/PKA enhance cardiac contraction (beta-1) while relaxing bronchial smooth muscle (beta-2)?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Kalpte L-tipi Ca2+ kanallarını fosforilleyip Ca2+ girişini artırır; düz kasta ise Miyozin Hafif Zincir Kinazını (MLCK) fosforilleyip inaktive eder.",
              ar: "في القلب يفسفر قنوات الكالسيوم L ليدخله؛ وفي العضلات الملساء يفسفر إنزيم MLCK ليعطله ويمنع التقلص.",
              en: "In myocardium PKA phosphorylates L-type Ca2+ channels enhancing entry; in smooth muscle it phosphorylates and inactivates MLCK."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Kusursuz moleküler açıklama! Kalpte PKA kalsiyum akımını artırır (inotropi); düz kasta ise MLCK kinazı fosforillenince miyozini aktifleştiremez ve kas gevşer.",
              ar: "تفسير جزيئي متكامل! في القلب يحفز PKA تدفق الكالسيوم؛ وفي العضلات الملساء يعطل إنزيم MLCK فيعجز الأكتين والميوزين عن الارتباط.",
              en: "Flawless molecular rationale! PKA boosts myocardial calcium influx; in smooth muscle it inactivates MLCK, terminating cross-bridge cycling."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Bronş düz kaslarında PKA hücre çekirdeğine girerek tüm DNA transkripsiyonunu durdurur.",
              ar: "في القصبات يدخل PKA النواة ليوقف اصطناع الحمض النووي DNA كلياً.",
              en: "In bronchial smooth muscle, PKA translocates to the nucleus to completely arrest DNA transcription."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Bronkodilatasyon saniyeler içinde gerçekleşen biyofiziksel bir olaydır; gen transkripsiyonu ile açıklanamaz.",
              ar: "غير صحيح: توسع القصبات يحدث خلال ثوانٍ معدودة كأثر فيزيائي سريع دون الحاجة لتغيير التعبير الجيني.",
              en: "Incorrect: Bronchodilatation occurs within seconds via enzyme modulation, not delayed transcriptional shifts."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Beta-1 ve beta-2 reseptörlerinin amino asit dizisi birbirinin ayna görüntüsüdür.",
              ar: "التسلسل البروتيني لمستقبلات beta-1 و beta-2 متطابق في صورة معكوسة مرآتية.",
              en: "The amino acid sequences of beta-1 and beta-2 receptors are exact mirror-image inversions."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Reseptörler ayna görüntüsü değildir; homolog 7-transmembran GPCR'lardır. Fark dokudaki enzim substratlarından kaynaklanır.",
              ar: "غير صحيح: المستقبلات ليست صوراً مرآتية بل بروتينات سباعية العبور الغشائي؛ والفارق في الركائز الإنزيمية الخلوية.",
              en: "Incorrect: Receptors are not enantiomers; they are distinct homologous 7-TM GPCRs differing in tissue substrate targets."
            }
          }
        ]
      },
      technicalTerms: [
        {
          term: "Miyozin Hafif Zincir Kinazı",
          transcription: "Myosin Light-Chain Kinase (MLCK)",
          definition: "Düz kas kasılmasını başlatan miyozin hafif zincirini fosforilleyen kalsiyum-kalmodulin bağımlı enzim.",
          ar: {
            term: "كيناز سلسلة الميوزين الخفيفة",
            transcription: "Myosin Light-Chain Kinase (MLCK)",
            definition: "الإنزيم المسؤول عن بدء تقلص العضلات الملساء بفسفرة خيوط الميوزين عند توفر الكالسيوم."
          },
          en: {
            term: "MLCK",
            transcription: "Myosin Light-Chain Kinase (MLCK)",
            definition: "The calcium-calmodulin dependent enzyme that phosphorylates smooth muscle myosin light chains to initiate contraction."
          }
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Kalpte kasılma için ne gerekir? Kalsiyum girişi (PKA bunu artırır).",
          ar: "ما الذي يحتاجه القلب لزيادة الانقباض؟ تدفق الكالسيوم (وهذا ما يحفزه PKA).",
          en: "What does cardiac muscle require for inotropy? Calcium influx (boosted by PKA)."
        },
        {
          tier: 2,
          tr: "Düz kasta kasılmayı sağlayan enzim hangisidir? MLCK.",
          ar: "ما الإنزيم الذي يسبب انقباض العضلات الملساء؟ إنزيم MLCK.",
          en: "Which enzyme drives smooth muscle contraction? MLCK."
        },
        {
          tier: 3,
          tr: "PKA düz kasta MLCK'yı fosforilleyip kapatır; MLCK durunca kas mecburen gevşer (bronkodilatasyon).",
          ar: "يقوم PKA بفسفرة MLCK لتعطيله في العضلات الملساء؛ فيحدث ارتخاء فوري وتوسع شعبي.",
          en: "PKA phosphorylates and disables MLCK in smooth muscle, compelling immediate relaxation."
        }
      ]
    },

    // Step 5: Interactive Artifact (ReceptorLigandMatcher)
    {
      id: "pharm-mod4-les1-step5",
      order: 5,
      stageIndex: 5,
      stage: "interactive_artifact",
      type: "interactive_artifact",
      title: {
        tr: "İnteraktif Deney: Adrenalin-Beta Reseptör Kenetlenmesi",
        ar: "تجربة تفاعلية: تطابق الأدرينالين مع جيب مستقبل بيتا",
        en: "Interactive Experiment: Epinephrine-Beta Receptor Docking"
      },
      prompt: {
        tr: "Adrenalinin amin, katekol ve beta-hidroksil gruplarını beta-adrenerjik reseptör aktif cebindeki Asp113, Ser204, Phe290 ve Asn293 kalıntılarıyla eşleştirin.",
        ar: "طابق مجموعات الأمين والكاتيكول وهيدروكسيل بيتا للأدرينالين مع ثمالات Asp113 و Ser204 و Phe290 و Asn293 في جيب مستقبل بيتا.",
        en: "Dock epinephrine into the beta-adrenergic pocket by matching its amine, catechol, and beta-OH to Asp113, Ser204, Phe290, and Asn293 residues."
      },
      widgetType: "ReceptorLigandMatcher",
      widget: {
        type: "ReceptorLigandMatcher",
        config: {
          title: "Adrenalin - Beta-2 Adrenerjik Reseptör Kenetlenmesi",
          prompt: "Adrenalinin fonksiyonel gruplarını beta-2 reseptör cebindeki tamamlayıcı amino asitlerle eşleştirin.",
          drugName: "Adrenalin (Epinephrine)",
          receptorName: "Beta-2 Adrenerjik GPCR",
          pairs: [
            {
              id: "pair-1",
              drugGroup: "Protonlanmış Sekonder Amin (-NH2+CH3)",
              correctResidueId: "res-asp113",
              bondType: "ionic",
              energyKcalMol: "-8 to -12 kcal/mol",
              explanation: "Protonlanmış katyonik amin, TM3 heliksindeki Asp113 karboksilat anyonu ile zorunlu elektrostatik tuz köprüsü kurar."
            },
            {
              id: "pair-2",
              drugGroup: "Katekol Fenolik Hidroksilleri (meta & para -OH)",
              correctResidueId: "res-ser204",
              bondType: "h_bond",
              energyKcalMol: "-4 to -7 kcal/mol",
              explanation: "Katekol hidroksilleri TM5 heliksindeki Ser204 ve Ser207 kalıntılarıyla kilit hidrojen bağları oluşturarak reseptörü aktive eder."
            },
            {
              id: "pair-3",
              drugGroup: "Katekol Aromatik Benzen Halkası",
              correctResidueId: "res-phe290",
              bondType: "pi_pi",
              energyKcalMol: "-2 to -4 kcal/mol",
              explanation: "Katekol benzen halkası TM6'daki Phe290 aromatik yan zinciriyle pi-pi istiflenme etkileşimi kurar."
            },
            {
              id: "pair-4",
              drugGroup: "Kiral (R)-Beta-Hidroksil Grubu",
              correctResidueId: "res-asn293",
              bondType: "h_bond",
              energyKcalMol: "-3 to -5 kcal/mol",
              explanation: "Easson-Stedman hipotezine göre kiral beta-OH grubu TM6'daki Asn293 ile spesifik hidrojen bağı kurarak yüksek afinite sağlar."
            }
          ],
          residues: [
            {
              id: "res-asp113",
              residueName: "Asp113 (TM3)",
              description: "Negatif yüklü aspartat karboksilat grubu; adrenerjik ligantların protonlanmış aminiyle tuz köprüsü oluşturur."
            },
            {
              id: "res-ser204",
              residueName: "Ser204 / Ser207 (TM5)",
              description: "Polar serin hidroksil kalıntıları; katekol halkasının hidroksil gruplarıyla hidrojen bağı yapar."
            },
            {
              id: "res-phe290",
              residueName: "Phe290 (TM6)",
              description: "Hidrofobik fenilalanin aromatik halkası; katekol benzen halkasıyla pi-pi istiflenme temasındadır."
            },
            {
              id: "res-asn293",
              residueName: "Asn293 (TM6)",
              description: "Polar asparajin yan zinciri; kiral R-(-) enantiomerinin beta-OH grubuyla hidrojen bağı kurar."
            },
            {
              id: "res-val114",
              residueName: "Val114 (TM3)",
              description: "Alifatik apolar valin kalıntısı; ligandın alkil yan zinciriyle temas eden hidrofobik çevre."
            }
          ],
          source: {
            file: "Otonom Sinir Sistemi.pdf",
            page: 14
          }
        }
      },
      config: {
        title: "Adrenalin - Beta-2 Adrenerjik Reseptör Kenetlenmesi",
        prompt: "Adrenalinin fonksiyonel gruplarını beta-2 reseptör cebindeki tamamlayıcı amino asitlerle eşleştirin.",
        drugName: "Adrenalin (Epinephrine)",
        receptorName: "Beta-2 Adrenerjik GPCR",
        pairs: [
          {
            id: "pair-1",
            drugGroup: "Protonlanmış Sekonder Amin (-NH2+CH3)",
            correctResidueId: "res-asp113",
            bondType: "ionic",
            energyKcalMol: "-8 to -12 kcal/mol",
            explanation: "Protonlanmış katyonik amin, TM3 heliksindeki Asp113 karboksilat anyonu ile zorunlu elektrostatik tuz köprüsü kurar."
          },
          {
            id: "pair-2",
            drugGroup: "Katekol Fenolik Hidroksilleri (meta & para -OH)",
            correctResidueId: "res-ser204",
            bondType: "h_bond",
            energyKcalMol: "-4 to -7 kcal/mol",
            explanation: "Katekol hidroksilleri TM5 heliksindeki Ser204 ve Ser207 kalıntılarıyla kilit hidrojen bağları oluşturarak reseptörü aktive eder."
          },
          {
            id: "pair-3",
            drugGroup: "Katekol Aromatik Benzen Halkası",
            correctResidueId: "res-phe290",
            bondType: "pi_pi",
            energyKcalMol: "-2 to -4 kcal/mol",
            explanation: "Katekol benzen halkası TM6'daki Phe290 aromatik yan zinciriyle pi-pi istiflenme etkileşimi kurar."
          },
          {
            id: "pair-4",
            drugGroup: "Kiral (R)-Beta-Hidroksil Grubu",
            correctResidueId: "res-asn293",
            bondType: "h_bond",
            energyKcalMol: "-3 to -5 kcal/mol",
            explanation: "Easson-Stedman hipotezine göre kiral beta-OH grubu TM6'daki Asn293 ile spesifik hidrojen bağı kurarak yüksek afinite sağlar."
          }
        ],
        residues: [
          {
            id: "res-asp113",
            residueName: "Asp113 (TM3)",
            description: "Negatif yüklü aspartat karboksilat grubu; adrenerjik ligantların protonlanmış aminiyle tuz köprüsü oluşturur."
          },
          {
            id: "res-ser204",
            residueName: "Ser204 / Ser207 (TM5)",
            description: "Polar serin hidroksil kalıntıları; katekol halkasının hidroksil gruplarıyla hidrojen bağı yapar."
          },
          {
            id: "res-phe290",
            residueName: "Phe290 (TM6)",
            description: "Hidrofobik fenilalanin aromatik halkası; katekol benzen halkasıyla pi-pi istiflenme temasındadır."
          },
          {
            id: "res-asn293",
            residueName: "Asn293 (TM6)",
            description: "Polar asparajin yan zinciri; kiral R-(-) enantiomerinin beta-OH grubuyla hidrojen bağı kurar."
          },
          {
            id: "res-val114",
            residueName: "Val114 (TM3)",
            description: "Alifatik apolar valin kalıntısı; ligandın alkil yan zinciriyle temas eden hidrofobik çevre."
          }
        ],
        source: {
          file: "Otonom Sinir Sistemi.pdf",
          page: 14
        }
      },
      technicalTerms: [
        {
          term: "Easson-Stedman Hipotezi",
          transcription: "Easson-Stedman Hypothesis",
          definition: "Adrenerjik agonistlerin yüksek afinite göstermesi için aromatik halka, amin ve kiral beta-OH'ın 3-noktalı temas kurması kuralı.",
          ar: {
            term: "فرضية إيسون-ستيدمان",
            transcription: "Easson-Stedman Hypothesis",
            definition: "الفرضية القائلة بأن الألفة العالية للأدرينالين تتطلب ارتباطاً ثلاثي النقاط عبر الحلقة العطرية والأمين وهيدروكسيل بيتا الكيرالي."
          },
          en: {
            term: "Easson-Stedman Model",
            transcription: "Easson-Stedman Hypothesis",
            definition: "The structural model stating that optimal catecholamine affinity requires three-point pharmacophoric binding with aromatic ring, amine, and beta-OH."
          }
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Pozitif yüklü protonlanmış amin (-NH2+CH3) negatif yüklü hangi amino asitle tuz köprüsü kurar?",
          ar: "مع أي حمض أميني سالب الشحنة يشكل الأمين الموجب جسراً ملحياً؟",
          en: "With which negatively charged residue does the protonated amine form an ionic salt bridge?"
        },
        {
          tier: 2,
          tr: "Asp113 karboksilat anyonu amini yakalar (-8 ila -12 kcal/mol).",
          ar: "أنيون الكربوكسيلات في Asp113 يلتقط الأمين بشحنة أيونية قوية.",
          en: "The Asp113 carboxylate captures the amine via a strong ionic bond (-8 to -12 kcal/mol)."
        },
        {
          tier: 3,
          tr: "Ser204 fenolik -OH'larla, Phe290 aromatik halkayla, Asn293 ise kiral beta-OH ile eşleşir.",
          ar: "يتطابق Ser204 مع هيدروكسيل الكاتيكول، و Phe290 مع الحلقة، و Asn293 مع هيدروكسيل بيتا الكيرالي.",
          en: "Ser204 binds catechol OHs, Phe290 stacks the ring, and Asn293 binds the chiral beta-OH."
        }
      ]
    },

    // Step 6: Guided Discovery
    {
      id: "pharm-mod4-les1-step6",
      order: 6,
      stageIndex: 6,
      stage: "guided_discovery",
      type: "guided_discovery",
      title: {
        tr: "Rehberli Keşif: Presinaptik Alfa-2 Otoreseptör Freni",
        ar: "اكتشاف موجه: فرامل مستقبلات ألفا-2 الذاتية قبل المشبكية",
        en: "Guided Discovery: Presynaptic Alpha-2 Autoreceptor Brake"
      },
      prompt: {
        tr: "Sempatik sinir ucundan salınan noradrenalin sinaptik aralığı doldurduğunda, sinirin kalbi aşırı tüketmesini önleyen doğal negatif geri bildirim freni nedir?",
        ar: "عند تدفق النورأدرينالين في الشق المشبكي، ما هي الفرامل الفسيولوجية ذاتية التلقيم الراجع التي تمنع استنزاف القلب وعصبه؟",
        en: "When released norepinephrine floods the synaptic cleft, what natural negative-feedback brake prevents sympathetic nerve overfiring and cardiac exhaustion?"
      },
      conceptCheck: {
        question: {
          tr: "Presinaptik alfa-2 otoreseptörünün noradrenalin salgısını durdurma mekanizması nedir?",
          ar: "ما الآلية التي يوقف بها مستقبل alpha-2 الذاتي قبل المشبكي تحرير النورأدرينالين؟",
          en: "What mechanism allows the presynaptic alpha-2 autoreceptor to halt norepinephrine release?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Gi proteini ile adenilat siklazı inhibe eder, cAMP'yi düşürür ve voltaj kapılı Ca2+ kanallarını kapatarak vezikül ekzositozunu durdurur.",
              ar: "يثبط إنزيم محلقة الأدينيلات عبر Gi، فيخفض cAMP ويغلق قنوات الكالسيوم مما يوقف قذف الحويصلات.",
              en: "It couples to Gi to inhibit adenylyl cyclase, lowering cAMP and closing voltage-gated Ca2+ channels to halt exocytosis."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Mükemmel nörokimyasal kavrayış! Salınan noradrenalin kendi presinaptik alfa-2 reseptörüne bağlanarak fren yapar. Klonidin bu mekanizmayla tansiyonu düşürür.",
              ar: "فهم كيميائي عصبي دقيق! يرتبط النورأدرينالين المحرر بمستقبله الذاتي alpha-2 لكبح نفسه؛ وهذا مبدأ عمل دواء كلونيدين.",
              en: "Superb neurochemical insight! Released norepinephrine binds its own presynaptic alpha-2 receptor as an autoinhibitory brake; clonidine exploits this to treat hypertension."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Noradrenalin sinir ucundaki tüm vezikülleri kimyasal olarak parçalayarak nöronu kalıcı olarak yok eder.",
              ar: "يفكك النورأدرينالين جميع الحويصلات كيميائياً ليدمر العصبون بشكل دائم.",
              en: "Norepinephrine chemically lyses all presynaptic vesicles, permanently destroying the adrenergic neuron."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Otoregülasyon tersinir ve anlık bir sinyal modülasyonudur; vezikülleri veya nöronu parçalamaz.",
              ar: "غير صحيح: التنظيم الذاتي تعديل حركي فوري وعكوس؛ ولا يفكك الحويصلات أو يدمر النواقل.",
              en: "Incorrect: Autoregulation is an instantaneous and reversible physiological modulation, not neurotoxic destruction."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Gs proteini ile hücre içine sodyum pompalar ve sinir ucunu aşırı polarize ederek tüketir.",
              ar: "يضخ الصوديوم داخل الخلية عبر Gs مسبباً فرط استقطاب واستنزاف العصبون.",
              en: "It pumps sodium into the terminal via Gs, causing electrical hyperpolarization and exhaustion."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Alfa-2 reseptörleri Gs değil, inhibitör Gi proteini ile kenetlidir ve sodyum pompası içermez.",
              ar: "غير صحيح: مستقبلات alpha-2 تقترن ببروتين Gi المثبط وليس Gs، ولا تحتوي على مضخات صوديوم.",
              en: "Incorrect: Alpha-2 receptors couple to inhibitory Gi proteins, not Gs, and do not act as sodium pumps."
            }
          }
        ]
      },
      technicalTerms: [
        {
          term: "Presinaptik Otoreseptör",
          transcription: "Presynaptic Autoreceptor",
          definition: "Akson ucunda bulunan ve salınan nörotransmitterin kendi salgılanmasını negatif geri bildirimle kısıtlayan reseptör.",
          ar: {
            term: "المستقبل الذاتي قبل المشبكي",
            transcription: "Presynaptic Autoreceptor",
            definition: "مستقبل يتوضع على نهاية المحور العصبي ليقيس تركيز الناقل المحرر ويثبط إفرازه بتلقيم راجع سلبي."
          },
          en: {
            term: "Autoreceptor",
            transcription: "Presynaptic Autoreceptor",
            definition: "A receptor located on presynaptic nerve terminals that regulates neurotransmitter release via negative feedback."
          }
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Alfa-2 reseptörü uyarıcı Gs mi yoksa inhibitör Gi proteini ile mi kenetlidir?",
          ar: "هل يقترن مستقبل alpha-2 ببروتين Gs المحفز أم بروتين Gi المثبط؟",
          en: "Does the alpha-2 receptor couple to stimulatory Gs or inhibitory Gi protein?"
        },
        {
          tier: 2,
          tr: "Gi proteini adenilat siklazı durdurur ve hücre içine Ca2+ girişini engeller.",
          ar: "بروتين Gi يثبط إنزيم محلقة الأدينيلات ويمنع دخول الكالسيوم اللازم للقذف.",
          en: "Gi protein shuts down adenylyl cyclase and blocks Ca2+ influx required for exocytosis."
        },
        {
          tier: 3,
          tr: "Presinaptik alfa-2 bir frendir; aşırı noradrenalin salınımını durdurarak sinapsı sakinleştirir.",
          ar: "مستقبل alpha-2 بمثابة فرامل ذاتية تمنع فرط تدفق النورأدرينالين وتلجم السيالة العصبية.",
          en: "Presynaptic alpha-2 acts as an intrinsic brake, suppressing excess norepinephrine discharge."
        }
      ]
    },

    // Step 7: Formal Explanation
    {
      id: "pharm-mod4-les1-step7",
      order: 7,
      stageIndex: 7,
      stage: "formal_explanation",
      type: "formal_explanation",
      title: {
        tr: "Biçimsel Açıklama: Adrenerjik Reseptör Kanonik Sınıflaması",
        ar: "الشرح المنهجي: التصنيف المعتمد للمستقبلات الأدرينالينية",
        en: "Formal Explanation: Canonical Adrenoceptor Classification"
      },
      prompt: {
        tr: "Adrenerjik reseptör kanonik tablosunu inceleyin: alfa-1 (Gq), alfa-2 (Gi), beta-1 (Gs), beta-2 (Gs) ve beta-3 (Gs) yolaklarının doku ve fonksiyon haritası.",
        ar: "تأمل الجدول المعتمد للمستقبلات الأدرينالينية: اقتران alpha-1 بـ Gq، و alpha-2 بـ Gi، ومستقبلات beta بـ Gs مع توزعها النسيجي.",
        en: "Review the canonical adrenoceptor table: alpha-1 (Gq), alpha-2 (Gi), beta-1 (Gs), beta-2 (Gs), and beta-3 (Gs) tissue and signaling maps."
      },
      conceptCheck: {
        question: {
          tr: "Aşağıdaki adrenerjik reseptör, G-proteini ve doku fonksiyonu eşleştirmelerinden hangisi eksiksiz ve doğrudur?",
          ar: "أي من الارتباطات التالية بين المستقبل وبروتين G والأثر النسيجي صحيحة تماماً؟",
          en: "Which mapping between adrenoceptor subtype, G-protein, and target organ response is completely correct?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Beta-1 (Gs): Kalpte pozitif inotropi/kronotropi; böbrek jukstaglomerüler hücrelerinde renin salıverilmesi.",
              ar: "Beta-1 (Gs): زيادة قوة وسرعة ضربات القلب؛ وتحرير الرينين من خلايا الكلى المجاورة للكبيبات.",
              en: "Beta-1 (Gs): Positive cardiac inotropy/chronotropy; renin release from renal juxtaglomerular cells."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Kusursuz eşleştirme! Beta-1 kalpte cAMP artışıyla kasılma ve hızı artırırken, böbrekte renin salarak RAAS sistemini tetikler.",
              ar: "اقتران دقيق! ينشط beta-1 القلب عبر cAMP، ويفرز الرينين كلوياً لتفعيل جهاز الرينين-أنجيوتنسين.",
              en: "Perfect correlation! Beta-1 drives cardiac inotropy/chronotropy via cAMP, and stimulates renal juxtaglomerular renin release."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Alfa-1 (Gi): Bronş düz kaslarında gevşeme ve kalp atım hızında dramatik yavaşlama.",
              ar: "Alpha-1 (Gi): ارتخاء عضلات القصبات الهوائية وهبوط حاد في سرعة نبض القلب.",
              en: "Alpha-1 (Gi): Bronchial smooth muscle relaxation and profound cardiac bradycardia."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Alfa-1 Gi ile değil Gq ile kenetlidir; bronş gevşemesini ise beta-2 (Gs) sağlar.",
              ar: "غير صحيح: يقترن alpha-1 ببروتين Gq وليس Gi؛ بينما توسع القصبات وظيفية مستقبلات beta-2.",
              en: "Incorrect: Alpha-1 couples to Gq, not Gi; airway relaxation is mediated by beta-2 (Gs)."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Beta-2 (Gq): Göz bebeğinde sfinkter kasılması ve miyozis (göz bebeği küçülmesi).",
              ar: "Beta-2 (Gq): تقبض العضلة العاصرة لحدقة العين وتضيق الحدقة (miosis).",
              en: "Beta-2 (Gq): Pupillary sphincter muscle contraction and pupil constriction (miosis)."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Beta-2 Gs ile kenetlidir. Göz bebeğinde midriyazisi (büyümeyi) alfa-1 radyal kasla yapar; miyozis ise kolinerjik M3 etkisidir.",
              ar: "غير صحيح: يقترن beta-2 بـ Gs. وتوسع الحدقة وظيفة alpha-1 في العضلة الشعاعية، بينما التضيق أثر مسكاريني M3.",
              en: "Incorrect: Beta-2 couples to Gs. Pupillary dilation is driven by alpha-1 radial contraction; constriction is cholinergic M3."
            }
          }
        ]
      },
      technicalTerms: [
        {
          term: "Pozitif İnotropi",
          transcription: "Positive Inotropy",
          definition: "Miyokard hücre içi kalsiyum akışının artmasıyla kalp kasının kasılma gücünün artması.",
          ar: {
            term: "تعزيز التقلص العضلي القلبي",
            transcription: "Positive Inotropy",
            definition: "زيادة قوة انقباض عضلة القلب الناتجة عن تعزيز تدفق الكالسيوم داخل الخلايا العضلية."
          },
          en: {
            term: "Inotropy",
            transcription: "Positive Inotropy",
            definition: "An increase in myocardial contractility mediated by elevated intracellular calcium availability during systole."
          }
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Beta-1 reseptörü kalpte ve böbrekte bulunur; Gs proteini ile kenetlidir.",
          ar: "يتوضع مستقبل beta-1 في القلب والكلى؛ ويقترن ببروتين Gs المحفز.",
          en: "Beta-1 receptors reside in the heart and kidneys, coupling to stimulatory Gs."
        },
        {
          tier: 2,
          tr: "Beta-1 aktivasyonu cAMP'yi artırır: Kalp kasılır, böbrekten renin salınır.",
          ar: "ينتج عن تنشيط beta-1 رفع cAMP: فيزداد ضخ القلب ويتحرر الرينين كلوياً.",
          en: "Beta-1 activation raises cAMP: cardiac contractility increases and renin is released."
        },
        {
          tier: 3,
          tr: "Eşleştirme: Beta-1 -> Gs -> Pozitif inotropi/kronotropi + Renin salıverilmesi.",
          ar: "الارتباط الصحيح: Beta-1 -> Gs -> زيادة ضربات وقوة القلب + إفراز الرينين.",
          en: "Correct mapping: Beta-1 -> Gs -> Positive inotropy/chronotropy + Renin exocytosis."
        }
      ]
    },

    // Step 8: Concept Check
    {
      id: "pharm-mod4-les1-step8",
      order: 8,
      stageIndex: 8,
      stage: "concept_check",
      type: "concept_check",
      title: {
        tr: "Kavram Kontrolü: Astımlı Hastada Propranolol Tehlikesi",
        ar: "اختبار المفهوم: خطر البروبرانولول على مريض الربو",
        en: "Concept Check: Propranolol Hazard in Asthmatic Patients"
      },
      prompt: {
        tr: "Astım öyküsü olan bir hastaya non-selektif beta-bloker propranolol verilirse, bronş düz kaslarında hangi moleküler olay ölümcül bronkospazmı tetikler?",
        ar: "إذا تناول مريض ربو حاصر بيتا غير انتقائي (بروبرانولول)، فما الحدث الجزيئي الذي يفجر تشنجاً قصبياً مميتاً؟",
        en: "If an asthmatic patient receives the non-selective beta-blocker propranolol, what molecular event triggers life-threatening bronchospasm?"
      },
      conceptCheck: {
        question: {
          tr: "Propranololün astımlı hastalarda şiddetli ve ölümcül bronkokonstriksiyon yaratmasının farmakolojik nedeni nedir?",
          ar: "ما السبب الدوائي لتسبب البروبرانولول في تشنج قصبي حاد وخطير لدى مرضى الربو؟",
          en: "What pharmacological mechanism makes propranolol trigger severe, life-threatening bronchospasm in asthmatics?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Bronşlardaki beta-2 reseptörlerini bloke ederek fizyolojik cAMP tonusunu düşürür; gevşetici fren kalkınca düz kas kasılarak hava yolunu tıkar.",
              ar: "يحصر مستقبلات beta-2 القصبية فيخفض نغمة cAMP المرخية؛ ومع زوال التثبيط تنقبض العضلات الملساء كلياً.",
              en: "It blocks bronchial beta-2 receptors, lowering basal cAMP tone; losing this relaxing influence allows smooth muscle to constrict."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Doğru klinik kavrayış! Astımlılarda hava yollarını açık tutan sempatik beta-2 tonusudur. Non-selektif bloker bu tonusu keserek bronkospazm patlatır.",
              ar: "إدراك سريري ممتاز! مرضى الربو يعتمدون على نغمة beta-2 لإبقاء القصبات مفتوحة؛ وحصرها غير الانتقائي يخنق المريض.",
              en: "Spot on! Asthmatics depend on tonic beta-2 bronchodilatation. Non-selective blockade abolishes this protective tone, provoking acute spasm."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Propranolol akciğer mast hücrelerinde IgE antikorları sentezleyerek anafilaksi başlatır.",
              ar: "يحفز البروبرانولول اصطناع أضداد IgE في الخلايا البدينة مما يطلق تفاعلاً تأقياً.",
              en: "Propranolol de novo synthesizes IgE antibodies on mast cells, initiating allergic anaphylaxis."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Propranolol antikor üretmez veya immünolojik alerji yapmaz; mekanizma doğrudan beta-2 adrenerjik reseptör antagonizmasıdır.",
              ar: "غير صحيح: البروبرانولول لا يصطنع أضداداً مناعية؛ الأثر ناجم عن حصر تنافسي مباشر لمستقبلات beta-2.",
              en: "Incorrect: Propranolol does not generate antibodies; bronchospasm is mediated purely by pharmacological beta-2 blockade."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Bronş epitelindeki alfa-1 reseptörlerini uyararak akciğer içine kıkırdak dokusu salgılatır.",
              ar: "ينشط مستقبلات alpha-1 في القصبات مما يحفز إفراز نسيج غضروفي داخل الرئة.",
              en: "It directly stimulates alpha-1 receptors on airway epithelium to deposit cartilage into alveoli."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Propranolol bir agonist değil antagonisttir ve kıkırdak üretimiyle hiçbir ilişkisi yoktur.",
              ar: "غير صحيح: البروبرانولول حاصر وليس منشطاً، ولا علاقة له بإفراز الغضاريف.",
              en: "Incorrect: Propranolol is an antagonist, not an agonist, and has zero relationship with cartilage secretion."
            }
          }
        ]
      },
      technicalTerms: [
        {
          term: "Bronkokonstriksiyon",
          transcription: "Bronchoconstriction",
          definition: "Bronş düz kaslarının kasılarak hava yollarını daraltması ve solunum direncini artırması.",
          ar: {
            term: "تشنج القصبات",
            transcription: "Bronchoconstriction",
            definition: "تضيق المسالك الهوائية نتيجة تقلص العضلات الملساء المحيطة بالقصبات الهوائية."
          },
          en: {
            term: "Bronchospasm",
            transcription: "Bronchoconstriction",
            definition: "The constriction of airway smooth muscle resulting in narrowed bronchioles and heightened airflow resistance."
          }
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Bronş düz kaslarını açık ve gevşek tutan sempatik reseptör hangisidir? Beta-2.",
          ar: "ما المستقبل الودي الذي يبقي عضلات القصبات مرتخية ومفتوحة؟ مستقبلات beta-2.",
          en: "Which sympathetic receptor maintains open, relaxed airways? Beta-2."
        },
        {
          tier: 2,
          tr: "Propranolol non-selektiftir; hem beta-1'i (kalp) hem beta-2'yi (akciğer) bloke eder.",
          ar: "البروبرانولول غير انتقائي؛ يقفل beta-1 (القلب) و beta-2 (الرئة) معاً.",
          en: "Propranolol is non-selective, blocking both beta-1 (heart) and beta-2 (lungs)."
        },
        {
          tier: 3,
          tr: "Beta-2 blokajı cAMP üretimini durdurur; astımlı hastada hava yolları kriz halinde kapanır.",
          ar: "حصر beta-2 يمنع إنتاج cAMP المرخي؛ فيختنق مريض الربو بنوبة تشنج قصبي حادة.",
          en: "Beta-2 blockade halts cAMP synthesis, causing catastrophic airway closure in asthma."
        }
      ]
    },

    // Step 9: Application
    {
      id: "pharm-mod4-les1-step9",
      order: 9,
      stageIndex: 9,
      stage: "application",
      type: "clinical_vignette",
      title: {
        tr: "Klinik Uygulama: Feokromositomada Blokaj Sırası",
        ar: "تطبيق سريري: ترتيب الحصار الدوائي في ورم القواتم",
        en: "Clinical Vignette: Sequencing Blockade in Pheochromocytoma"
      },
      prompt: {
        tr: "Feokromositomalı hastada taşikardi gelişiyor. Deneyimsiz bir asistan alfa-bloker vermeden ÖNCE tek başına intravenöz metoprolol (beta-1 bloker) uyguluyor. Hastanın tansiyonu neden aniden 260/150 mmHg'ye fırlar?",
        ar: "مريض بورم القواتم أصيب بتسرع قلب. حقن طبيب متدرب حاصر بيتا (ميتوبرولول) وحده قبل إعطاء حاصرات ألفا. لماذا قفز الضغط فجأة لـ 260/150؟",
        en: "A pheochromocytoma patient develops tachycardia. A resident administers IV metoprolol (beta-blocker) BEFORE establishing alpha-blockade. Why does BP instantly surge to 260/150 mmHg?"
      },
      conceptCheck: {
        question: {
          tr: "Feokromositomada alfa blokaj yapılmadan önce beta-bloker verilmesinin ölümcül hipertansif krize yol açma nedeni nedir?",
          ar: "ما السبب الحركي والفسيولوجي لحدوث نوبة فرط ضغط مميتة عند إعطاء حاصر بيتا قبل ألفا في ورم القواتم؟",
          en: "What physiological mechanism causes a lethal hypertensive crisis when a beta-blocker precedes alpha-blockade in pheochromocytoma?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Beta reseptörleri kilitlenince kardiyak tamponlama ve beta-2 vazodilatasyonu kalkar; devasa katekolamin yükü alfa-1'i tek başına uyararak aşırı vazokonstriksiyon yapar.",
              ar: "قفل بيتا يلغي التوسع الوعائي التعويضي؛ فيتفرد النورأدرينالين الضخم بمستقبلات alpha-1 مسبباً تشنجاً وعائياً ساحقاً.",
              en: "Blocking beta receptors eliminates vasodilatory buffering; massive circulating catecholamines stimulate vascular alpha-1 completely unopposed."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Hayati klinik kural! Buna 'karşılanmamış alfa uyarımı' (unopposed alpha stimulation) denir. Feokromositomada önce DAİMA fenoksibenzamin ile alfa reseptörleri kilitlenmelidir!",
              ar: "قاعدة سريرية حاسمة لحفظ الحياة! تدعى 'تنبيه ألفا غير المعارض'؛ ويجب دوماً قفل ألفا أولاً بالفينوكسي بنزامين قبل لمس بيتا!",
              en: "Critical lifesaving rule! Termed 'unopposed alpha stimulation'. In pheochromocytoma, ALWAYS establish irreversible alpha blockade first!"
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Metoprolol adrenal tümör dokusunu fiziksel olarak patlatarak tümörün kana boşalmasına neden olur.",
              ar: "يفجر الميتوبرولول نسيج الورم في الغدة الكظرية ميكانيكياً لتتدفق محتوياته في الدم.",
              en: "Metoprolol physically ruptures the adrenal tumor capsule, dumping its contents directly into circulation."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Blokerler doku patlatmaz. Sorun dolaşımdaki devasa katekolaminlerin damar alfa-1 reseptörlerini serbestçe sıkıştırmasıdır.",
              ar: "غير صحيح: الأدوية لا تفجر الأنسجة ميكانيكياً؛ المشكلة وظيفية في انفراد هرمونات الورم بمستقبلات ألفا الوعائية.",
              en: "Incorrect: Beta blockers do not rupture tissue. The surge is functional: circulating catecholamines contract alpha-1 with zero opposition."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Metoprolol böbrek glomerüllerinde sodyum atılımını bloke ederek 5 dakikada 5 litre sıvı biriktirir.",
              ar: "يحصر الميتوبرولول إطراح الصوديوم كلوياً مما يجمع 5 لترات سوائل في 5 دقائق.",
              en: "Metoprolol halts renal sodium excretion, accumulating 5 liters of extracellular fluid in 5 minutes."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Dakikalar içinde 5 litre sıvı tutulamaz. Ani tansiyon fırlaması periferik damar direncinin (alfa-1 vazokonstriksiyonu) tavan yapmasındandır.",
              ar: "غير صحيح: لا يمكن تجميع سوائل بهذه السرعة؛ والقفزة الحادة ناجمة عن الارتفاع الفلكي في المقاومة الوعائية المحيطية.",
              en: "Incorrect: Acute crisis is vascular, not fluid accumulation: massive alpha-1 vasoconstriction drives systemic vascular resistance through the roof."
            }
          }
        ]
      },
      technicalTerms: [
        {
          term: "Karşılanmamış Alfa Uyarımı",
          transcription: "Unopposed Alpha Stimulation",
          definition: "Beta reseptörlerin bloke edilmesiyle katekolaminlerin damar alfa-1 reseptörlerini engelsiz kasarak aşırı tansiyon krizi yaratması.",
          ar: {
            term: "تحفيز ألفا غير المعارض",
            transcription: "Unopposed Alpha Stimulation",
            definition: "الانفراد الخطير للكاتيكولامينات بتنشيط مستقبلات alpha-1 الوعائية بعد حصر بيتا مما يولد نوبة فرط ضغط مميتة."
          },
          en: {
            term: "Unopposed Alpha Stimulation",
            transcription: "Unopposed Alpha Stimulation",
            definition: "The severe, unopposed vascular alpha-1 constriction that erupts when beta-blockers remove countervailing beta-2 vasodilatation."
          }
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Feokromositomada kanda hangi maddeler aşırı miktarda dolaşır? Katekolaminler (adrenalin/noradrenalin).",
          ar: "ما المواد المتدفقة بغزارة في دم مريض ورم القواتم؟ الكاتيكولامينات.",
          en: "What substances flood the bloodstream in pheochromocytoma? Catecholamines."
        },
        {
          tier: 2,
          tr: "Beta reseptörlerini bloke ederseniz, kandaki devasa adrenalin hangi reseptörleri tek başına uyarır?",
          ar: "إذا أغلقت مستقبلات بيتا، فأي مستقبلات ستنفرد بالارتباط بالأدرينالين المتدفق؟",
          en: "If you shut down beta receptors, which receptors will circulating adrenaline stimulate all alone?"
        },
        {
          tier: 3,
          tr: "Alfa-1 reseptörleri tamamen korumasız kalır; damarlar şiddetle kasılarak tansiyonu 260 mmHg'ye fırlatır.",
          ar: "تنفرد مستقبلات alpha-1 الوعائية بالتنبيه؛ فيحدث تشنج وعائي شامل يقفز بالضغط إلى 260 ملم زئبق.",
          en: "Vascular alpha-1 is left totally unopposed; violent vasoconstriction drives BP past 260 mmHg."
        }
      ]
    },

    // Step 10: Retrieval
    {
      id: "pharm-mod4-les1-step10",
      order: 10,
      stageIndex: 10,
      stage: "retrieval",
      type: "retrieval",
      title: {
        tr: "Hafıza Yoklama: Alfa-1 Sinyal Kaskadı",
        ar: "استرجاع معرفي: شلال تأشير مستقبلات ألفا-1",
        en: "Retrieval: Alpha-1 Signaling Cascade"
      },
      prompt: {
        tr: "Damar düz kasında alfa-1 adrenerjik reseptör uyarımı sonucunda vazokonstriksiyonu başlatan ikinci ulak yolağı hangisidir?",
        ar: "ما هو مسار الرسل الثواني الذي يطلق الانقباض الوعائي إثر تنشيط مستقبلات alpha-1 في العضلات الملساء؟",
        en: "Which second messenger pathway initiates vasoconstriction following alpha-1 adrenergic receptor stimulation in vascular smooth muscle?"
      },
      conceptCheck: {
        question: {
          tr: "Alfa-1 adrenerjik reseptör aktivasyonunun doğru hücre içi sinyal iletim sırası hangisidir?",
          ar: "ما التسلسل التأشيري الخلوي الصحيح لتنشيط مستقبلات alpha-1 الأدرينالينية؟",
          en: "What is the correct intracellular signaling sequence for alpha-1 adrenergic receptor activation?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Gq proteini -> Fosfolipaz C (PLC) -> IP3 ve DAG oluşumu -> Hücre içi Ca2+ artışı -> Düz kas kasılması.",
              ar: "بروتين Gq -> فوسفوليباز C (PLC) -> إنتاج IP3 و DAG -> ارتفاع الكالسيوم الخلوي -> تقلص العضلات.",
              en: "Gq protein -> Phospholipase C (PLC) -> IP3 & DAG formation -> Intracellular Ca2+ surge -> Smooth muscle contraction."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Kusursuz hafıza! Alfa-1 daima Gq kenetlidir; IP3 sarkoplazmik retikulumdan kalsiyum boşaltarak kasılmayı tetikler.",
              ar: "استرجاع متقن! يقترن alpha-1 دوماً بـ Gq، ويحرر IP3 الكالسيوم من الشبكة الهيولية لإطلاق التقلص.",
              en: "Flawless retrieval! Alpha-1 is canonically Gq-coupled; IP3 empties sarcoplasmic calcium stores to trigger contraction."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Gs proteini -> Adenilat Siklaz -> cAMP artışı -> Protein Kinaz A aktivasyonu -> Düz kas gevşemesi.",
              ar: "بروتين Gs -> محلقة الأدينيلات -> ارتفاع cAMP -> تنشيط PKA -> ارتخاء العضلات.",
              en: "Gs protein -> Adenylyl Cyclase -> cAMP surge -> Protein Kinase A activation -> Smooth muscle relaxation."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Bu yolak Beta-2 reseptörünün gevşetici yolağıdır; Alfa-1 kasıcıdır ve Gq kullanır.",
              ar: "غير صحيح: هذا مسار مستقبلات beta-2 الموسعة للأوعية؛ بينما alpha-1 مقبضة وتعمل عبر Gq.",
              en: "Incorrect: This is the beta-2 relaxation pathway; alpha-1 is a contractile receptor operating through Gq."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Gi proteini -> Guanilat Siklaz aktivasyonu -> cGMP artışı -> Potasyum kanalı açılması.",
              ar: "بروتين Gi -> تنشيط محلقة الغوانيلات -> ارتفاع cGMP -> فتح قنوات البوتاسيوم.",
              en: "Gi protein -> Guanylyl Cyclase activation -> cGMP surge -> Potassium channel opening."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Guanilat siklaz nitrik oksit (NO) ile uyarılır; Alfa-1 reseptörüyle doğrudan bir ilgisi yoktur.",
              ar: "غير صحيح: محلقة الغوانيلات ينشطها أكسيد النيتريك (NO) وليس مستقبلات alpha-1.",
              en: "Incorrect: Guanylyl cyclase is stimulated by nitric oxide, not direct alpha-1 receptor activation."
            }
          }
        ]
      },
      technicalTerms: [
        {
          term: "Fosfolipaz C",
          transcription: "Phospholipase C (PLC)",
          definition: "Gq proteini tarafından aktive edilen ve membran fosfolipidi PIP2'yi IP3 ve DAG'ye parçalayan zar enzimi.",
          ar: {
            term: "فوسفوليباز C",
            transcription: "Phospholipase C (PLC)",
            definition: "إنزيم غشائي يطلقه بروتين Gq ليحطم فوسفاتيديل إينوزيتول إلى مرسلي IP3 و DAG."
          },
          en: {
            term: "Phospholipase C",
            transcription: "Phospholipase C (PLC)",
            definition: "The membrane enzyme activated by Gq that hydrolyzes PIP2 into second messengers IP3 and DAG."
          }
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Alfa-1 reseptörünün G-proteinini hatırlayın: Gq.",
          ar: "تذكر نوع بروتين G المقترن بمستقبل alpha-1: بروتين Gq.",
          en: "Recall the G-protein coupled to alpha-1: Gq."
        },
        {
          tier: 2,
          tr: "Gq proteini hücre zarındaki Fosfolipaz C (PLC) enzimini çalıştırır.",
          ar: "يقوم بروتين Gq بتفعيل إنزيم فوسفوليباز C (PLC) في الغشاء.",
          en: "Gq protein activates the membrane-bound Phospholipase C (PLC) enzyme."
        },
        {
          tier: 3,
          tr: "Sıralama: Gq -> PLC -> IP3/DAG -> Kalsiyum artışı -> Vazokonstriksiyon.",
          ar: "التسلسل: Gq -> PLC -> إنتاج IP3/DAG -> تدفق الكالسيوم -> انقباض وعائي.",
          en: "Sequence: Gq -> PLC -> IP3/DAG -> Calcium surge -> Vasoconstriction."
        }
      ]
    },

    // Step 11: Connection
    {
      id: "pharm-mod4-les1-step11",
      order: 11,
      stageIndex: 11,
      stage: "connection",
      type: "connection",
      title: {
        tr: "Bütünsel Bağlantı: Böbrek Beta-1 ve RAAS Entegrasyonu",
        ar: "الربط الشامل: مستقبلات بيتا-1 الكلوية وجهاز رينين-أنجيوتنسين",
        en: "Holistic Connection: Renal Beta-1 & RAAS Integration"
      },
      prompt: {
        tr: "Böbrek jukstaglomerüler hücrelerindeki beta-1 reseptörleri, sempatik sinir sistemi ile endokrin Renin-Anjiyotensin-Aldosteron Sistemini (RAAS) nasıl birbirine bağlar?",
        ar: "كيف تربط مستقبلات beta-1 في خلايا الكلى المجاورة للكبيبات بين الجهاز العصبي الودي ونظام الرينين-أنجيوتنسين الهرموني؟",
        en: "How do beta-1 receptors on renal juxtaglomerular cells directly bridge the sympathetic nervous system to the endocrine RAAS cascade?"
      },
      conceptCheck: {
        question: {
          tr: "Sempatik deşarjın böbrek beta-1 reseptörleri üzerinden tansiyonu uzun vadede yükseltme mekanizması nedir?",
          ar: "ما الآلية التي يرفع بها التنبيه الودي لمستقبلات beta-1 الكلوية ضغط الدم على المدى الطويل؟",
          en: "What mechanism allows sympathetic stimulation of renal beta-1 receptors to elevate chronic blood pressure?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Beta-1 uyarımı renin salgılatır; renin anjiyotensinojeni anjiyotensin I'e, ACE ise II'ye çevirerek güçlü vazokonstriksiyon ve aldosteronla tuz/su tutulumu yapar.",
              ar: "يحفز beta-1 إفراز الرينين؛ فيتحول الأنجيوتنسينogen إلى I ثم II مسبباً انقباضاً وعائياً واحتباس الصوديوم بالألدوستيرون.",
              en: "Beta-1 triggers renin release; renin converts angiotensinogen to I, then ACE yields II, producing vasoconstriction and aldosterone retention."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Harika kardiyorenal entegrasyon! Beta-blokerlerin tansiyonu düşürme etkisi sadece kalbi yavaşlatmaktan değil, aynı zamanda böbrekten renin çıkışını kesmelerinden kaynaklanır.",
              ar: "ربط قلبي كلوي مذهل! خفض حاصرات بيتا للضغط لا يعود فقط لتهدئة القلب بل لإيقاف إفراز الرينين الكلوي أيضاً.",
              en: "Superb cardiorenal synthesis! Beta-blockers lower blood pressure not just by calming the heart, but by halting renal renin release."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Renal beta-1 reseptörleri üre sentezini hızlandırarak idrar yoluyla tüm potasyumu tüketir.",
              ar: "تسرع مستقبلات beta-1 الكلوية اصطناع اليوريا مما يستنزف كامل بوتاسيوم الجسم بالبول.",
              en: "Renal beta-1 receptors accelerate urea synthesis, depleting total body potassium into the urine."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Üre karaciğerde sentezlenir ve beta-1 reseptörleriyle kontrol edilmez. Böbrekteki ana hedef renin salgılayan granüler JG hücreleridir.",
              ar: "غير صحيح: اليوريا تصطنع في الكبد؛ والهدف الرئيسي لمستقبلات بيتا-1 الكلوية هو خلايا الرينين المجاورة للكبيبات.",
              en: "Incorrect: Urea is synthesized in the liver. The primary renal target of beta-1 is renin-secreting juxtaglomerular cells."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Beta-1 uyarımı böbrek taşlarının kristalleşmesini engelleyerek idrar debisini 10 katına çıkarır.",
              ar: "يمنع تنشيط beta-1 تشكل حصى الكلى مما يضاعف إدرار البول بـ 10 أضعاف.",
              en: "Beta-1 activation prevents kidney stone crystallization, multiplying urine output 10-fold."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Sempatik aktivasyon idrar söktürmez; tam aksine renin ve aldosteron üzerinden sıvı tutulmasına ve idrar azalmasına yol açar.",
              ar: "غير صحيح: التنبيه الودي يحبس السوائل عبر الألدوستيرون ولا يزيد إدرار البول إطلاقاً.",
              en: "Incorrect: Sympathetic discharge promotes fluid conservation via aldosterone, rather than diuresis."
            }
          }
        ]
      },
      technicalTerms: [
        {
          term: "Renin-Anjiyotensin Sistemi",
          transcription: "Renin-Angiotensin-Aldosterone System (RAAS)",
          definition: "Böbrekten salınan renin enzimi ile başlayan, damar tonusunu ve sodyum dengesini düzenleyen sistemik hormon ekseni.",
          ar: {
            term: "نظام الرينين-أنجيوتنسين",
            transcription: "Renin-Angiotensin System (RAAS)",
            definition: "المحور الهرموني الجهازي الذي يطلقه إنزيم الرينين الكلوي لتنظيم المقاومة الوعائية واحتباس الصوديوم والماء."
          },
          en: {
            term: "RAAS",
            transcription: "Renin-Angiotensin-Aldosterone System (RAAS)",
            definition: "The endocrine axis initiated by renal renin exocytosis that governs vascular resistance and extracellular fluid volume."
          }
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Böbrek jukstaglomerüler hücrelerinden hangi enzim salınır? Renin.",
          ar: "ما الإنزيم الذي تفرزه خلايا الكلى المجاورة للكبيبات؟ الرينين.",
          en: "What enzyme is released by renal juxtaglomerular cells? Renin."
        },
        {
          tier: 2,
          tr: "Renin salgılanmasını sempatik sistem hangi reseptörle uyarır? Beta-1.",
          ar: "ما المستقبل الذي يحفز إفراز الرينين ودياً؟ مستقبلات beta-1.",
          en: "Which receptor stimulates sympathetic renin exocytosis? Beta-1."
        },
        {
          tier: 3,
          tr: "Beta-1 -> Renin -> Anjiyotensin II (vazokonstriksiyon) + Aldosteron (tuz/su tutulumu) -> Tansiyon artışı.",
          ar: "Beta-1 -> تحرير الرينين -> أنجيوتنسين II (انقباض وعائي) + ألدوستيرون (احتباس أملاح) -> رفع الضغط.",
          en: "Beta-1 -> Renin -> Angiotensin II (vasoconstriction) + Aldosterone (salt retention) -> BP elevation."
        }
      ]
    },

    // Step 12: Mastery Check
    {
      id: "pharm-mod4-les1-step12",
      order: 12,
      stageIndex: 12,
      stage: "mastery_check",
      type: "mastery_check",
      title: {
        tr: "Ustalık Sınavı: Katekolamin İlaç Profilleme",
        ar: "اختبار الإتقان: توصيف الأدوية الكاتيكولامينية",
        en: "Mastery Check: Catecholamine Drug Profiling"
      },
      prompt: {
        tr: "Üç bilinmeyen adrenerjik ligant test ediliyor: İlaç X prazosinle önlenen saf vazokonstriksiyon yapıyor; İlaç Y kalbi hızlandırırken damar tonusunu değiştirmiyor; İlaç Z bronkodilatasyon yapıp diyastolik basıncı düşürüyor. Ligantları eşleştirin.",
        ar: "اختبرت ثلاثة أدوية: الدواء X يسبب تقبضاً وعائياً يمنعه برازوسين؛ الدواء Y يسرع القلب دون تغيير الأوعية؛ والدواء Z يوسع القصبات ويخفض الضغط الانبساطي. طابق المستقبلات.",
        en: "Three adrenergic ligands are tested: Drug X produces pure vasoconstriction blocked by prazosin; Drug Y increases heart rate without altering vessels; Drug Z dilates bronchi and lowers diastolic BP. Map their receptor selectivity."
      },
      conceptCheck: {
        question: {
          tr: "İlaç X, İlaç Y ve İlaç Z'nin selektif adrenerjik reseptör hedefleri hangi seçenekte eksiksiz doğru verilmiştir?",
          ar: "ما هي الأنماط الفرعية الانتقائية الصحيحة للأدوية X و Y و Z على التوالي؟",
          en: "Which option completely and accurately identifies the receptor selectivity of Drugs X, Y, and Z?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "İlaç X: Alfa-1 selektif (örn. fenilefrin); İlaç Y: Beta-1 selektif (örn. dobutamin); İlaç Z: Beta-2 selektif (örn. salbutamol).",
              ar: "الدواء X: انتقائي لـ alpha-1 (فينيل إفرين)؛ الدواء Y: انتقائي لـ beta-1 (دوبوتامين)؛ الدواء Z: انتقائي لـ beta-2 (سالبوتامول).",
              en: "Drug X: Alpha-1 selective (e.g. phenylephrine); Drug Y: Beta-1 selective (e.g. dobutamine); Drug Z: Beta-2 selective (e.g. albuterol)."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Kusursuz otonom ustalık! Fenilefrin saf alfa-1 ile damar büzer (prazosinle bloke olur). Dobutamin beta-1 ile kalbi uyarır. Salbutamol beta-2 ile bronş ve damar gevşetir.",
              ar: "إتقان دوائي ذاتي مذهل! فينيل إفرين يقبض الأوعية بـ alpha-1، دوبوتامين يسرع القلب بـ beta-1، وسالبوتامول يوسع القصبات والأوعية بـ beta-2.",
              en: "Mastery demonstrated! Phenylephrine causes pure alpha-1 vasoconstriction (prazosin-sensitive). Dobutamine stimulates cardiac beta-1. Albuterol dilates airways and skeletal beds via beta-2."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "İlaç X: Beta-2 selektif; İlaç Y: Alfa-1 selektif; İlaç Z: Alfa-2 selektif.",
              ar: "الدواء X: انتقائي لـ beta-2؛ الدواء Y: انتقائي لـ alpha-1؛ الدواء Z: انتقائي لـ alpha-2.",
              en: "Drug X: Beta-2 selective; Drug Y: Alpha-1 selective; Drug Z: Alpha-2 selective."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: İlaç X damar büzmektedir (bu alfa-1'dir, beta-2 damar genişletir). Prazosin bir alfa-1 blokerdir.",
              ar: "غير صحيح: الدواء X مقبض للأوعية ويمنعه برازوسين فهذا alpha-1؛ ومستقبلات beta-2 توسع ولا تقبض.",
              en: "Incorrect: Drug X constricts blood vessels (characteristic of alpha-1, while beta-2 dilates). Prazosin is an alpha-1 blocker."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "İlaç X: Alfa-2 selektif; İlaç Y: Beta-2 selektif; İlaç Z: Beta-1 selektif.",
              ar: "الدواء X: انتقائي لـ alpha-2؛ الدواء Y: انتقائي لـ beta-2؛ الدواء Z: انتقائي لـ beta-1.",
              en: "Drug X: Alpha-2 selective; Drug Y: Beta-2 selective; Drug Z: Beta-1 selective."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: İlaç Y kalbi uyarmaktadır (bu beta-1'dir, beta-2 değildir). İlaç Z bronş genişletmektedir (bu beta-2'dir).",
              ar: "غير صحيح: الدواء Y يسرع القلب وهذا فعل beta-1؛ بينما الدواء Z يوسع القصبات وهذا فعل beta-2.",
              en: "Incorrect: Drug Y stimulates cardiac contraction (beta-1). Drug Z dilates bronchi (beta-2)."
            }
          }
        ]
      },
      technicalTerms: [
        {
          term: "Selektif Adrenerjik Profil",
          transcription: "Selective Adrenergic Profile",
          definition: "Bir ilacın belirli bir adrenerjik reseptör alt tipine (alfa-1, beta-1, beta-2) diğer alt tiplere kıyasla belirgin yüksek afinite göstermesi.",
          ar: {
            term: "التوصيف الأدريناليني الانتقائي",
            transcription: "Selective Adrenergic Profile",
            definition: "إظهار الدواء ألفة تفضيلية أعلى بكثير لنمط محدد من المستقبلات الأدرينالينية مقارنة ببقية الأنماط."
          },
          en: {
            term: "Adrenergic Selectivity",
            transcription: "Selective Adrenergic Profile",
            definition: "The pharmacological preference of a drug for a specific adrenoceptor subtype (alpha-1, beta-1, beta-2) over others."
          }
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Prazosin hangi reseptörün spesifik blokeridir? Alfa-1.",
          ar: "ما المستقبل الذي يحصره برازوسين بشكل نوعي؟ مستقبلات alpha-1.",
          en: "Which receptor is specifically blocked by prazosin? Alpha-1."
        },
        {
          tier: 2,
          tr: "Kalbi seçici uyaran ilaç Beta-1; bronşları seçici açan ilaç Beta-2 agonistidir.",
          ar: "الدواء المنشط للقلب نوعياً هو منبه beta-1؛ والمنشط للقصبات هو منبه beta-2.",
          en: "The selective cardiac stimulant is a beta-1 agonist; the bronchodilator is a beta-2 agonist."
        },
        {
          tier: 3,
          tr: "X = Alfa-1 (Fenilefrin), Y = Beta-1 (Dobutamin), Z = Beta-2 (Salbutamol).",
          ar: "الترتيب: X = Alpha-1 (فينيل إفرين)، Y = Beta-1 (دوبوتامين)، Z = Beta-2 (سالبوتامول).",
          en: "Mapping: X = Alpha-1 (Phenylephrine), Y = Beta-1 (Dobutamine), Z = Beta-2 (Albuterol)."
        }
      ]
    }
  ]
};

const targetPath = path.resolve(__dirname, '../courses/pharmacology/lessons/lesson-07.json');
fs.writeFileSync(targetPath, JSON.stringify(lesson07, null, 2), 'utf8');
console.log('Successfully written lesson-07.json to:', targetPath);
