const fs = require('fs');
const path = require('path');

const lesson09 = {
  id: "pharm-mod5-les1",
  courseId: "pharmacology",
  moduleId: "ph-mod-05",
  title: {
    tr: "Renin-Anjiyotensin-Aldosteron Sistemi (RAAS) İnhibisyonu",
    ar: "تثبيط مسار الرينين-أنجيوتنسين-ألدوستيرون (RAAS)",
    en: "Renin-Angiotensin-Aldosterone System (RAAS) Inhibition"
  },
  order: 1,
  access: "free",
  objective: {
    tr: "ADE inhibitörleri, ARB'ler ve ARNI'lerin etki mekanizmalarını, efferent arteriyoler hemodinamik etkilerini ve bradikinin kaynaklı anjiyoödem riskini analiz etmek.",
    ar: "تحليل آليات عمل مثبطات ACE وحاصرات ARB ومركبات ARNI، وتأثيراتها الديناميكية على الشريين الصادر، وخطر الوذمة الوعائية المعتمدة على البراديكينين.",
    en: "Analyze mechanisms of action of ACE inhibitors, ARBs, and ARNIs, their efferent arteriolar hemodynamic effects, and bradykinin-mediated angioedema risk."
  },
  misconceptions: [
    {
      tr: "ARB'lerin de ADE inhibitörleri gibi kuru öksürük ve yüksek bradikinin birikimi yaptığı yanılgısı (öksürük bradikinin ve P maddesi birikiminden kaynaklanır; ADE kininaz II'dir, ARB'ler ise doğrudan AT1 reseptörünü bloke ederek bradikinin yıkımına dokunmaz).",
      ar: "الاعتقاد الخاطئ بأن حاصرات ARB تسبب السعال الجاف وتراكم البراديكينين مثل مثبطات ACE (السعال ينجم عن تراكم البراديكينين؛ إنزيم ACE هو kininase II بينما تحصر ARB مستقبلات AT1 دون المساس بتحلل البراديكينين).",
      en: "The misconception that ARBs cause the same persistent dry cough and bradykinin accumulation as ACE inhibitors (cough stems from bradykinin/substance P buildup; ACE is kininase II, whereas ARBs selectively block AT1 without altering kinin degradation)."
    },
    {
      tr: "Bilateral renal arter darlığında glomerüler filtrasyonu korumak için ADE inhibitörü veya ARB verilmesi yanılgısı (intramezangial GFH'yi koruyan efferent vazokonstriksiyondur; AT1 blokajı efferenti genişleterek glomerüler filtrasyon basıncını sıfırlar ve akut böbrek yetmezliği yapar).",
      ar: "الظن الخاطئ بإمكانية إعطاء مثبطات ACE أو ARB لحماية الكلية في تضيق الشريان الكلوي ثنائي الجانب (الحفاظ على GFR يعتمد كلياً على تقبض الشريين الصادر بوساطة Ang II؛ وحصاره يرخي الصادر مسقطاً ضغط الترشيح إلى فشل كلوي حاد).",
      en: "The dangerous belief that ACE inhibitors or ARBs preserve renal function in bilateral renal artery stenosis (adequate GFR relies entirely on Ang II-mediated efferent vasoconstriction; blocking it dilates the efferent arteriole, collapsing GFR into acute anuric renal failure)."
    },
    {
      tr: "ADE inhibitörleri ile ARNI (sakubitril/valsartan) kombinasyonunun güvenli olduğu yanılgısı (her ikisi de bradikinin yıkımını çift koldan bloke ederek ölümcül laringeal anjiyoödeme yol açar; aralarında en az 36 saatlik arınma süresi zorunludur).",
      ar: "الاعتقاد الخاطئ بأمان الجمع المباشر بين مثبطات ACE ودواء ARNI (كلاهما يمنع تحلل البراديكينين فيحدث وذمة وعائية حنجرية قاتلة؛ لذا يشترط فترة غسيل دوائي فاصلة لا تقل عن 36 ساعة).",
      en: "The fatal assumption that ACE inhibitors and ARNIs (sacubitril/valsartan) can be co-administered or switched without washout (both block bradykinin degradation via separate pathways, triggering life-threatening angioedema; a 36-hour washout is mandatory)."
    }
  ],
  sources: [
    {
      file: "Kardiyovasküler Sistem.pdf",
      page: 8
    }
  ],
  citations: [
    {
      id: "CIT-KATZUNG-CH11-P180",
      book: "Katzung's Basic & Clinical Pharmacology",
      edition: "15th ed.",
      topic: "Antihypertensive Agents: Drugs That Inhibit the Renin-Angiotensin System",
      chapter: "Chapter 11: Antihypertensive Agents",
      page: "pp. 180-205",
      status: "verified"
    },
    {
      id: "CIT-GG-CH26-P471",
      book: "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
      edition: "14th ed.",
      topic: "Renin and Angiotensin",
      chapter: "Chapter 26: Renin and Angiotensin",
      page: "pp. 471-496",
      status: "verified"
    }
  ],
  spacedReviewCards: [
    {
      cardId: "pharm-mod5-les1-card1",
      courseId: "pharmacology",
      drugOrConcept: "Kininaz II ve Kuru Öksürük / Anjiyoödem",
      prompt: "ADE inhibitörlerinin en yaygın kesilme nedeni olan kuru öksürük ve en tehlikeli yan etkisi olan anjiyoödemin biyokimyasal mekanizması nedir?",
      answer: "ADE enzimi aynı zamanda kininaz II'dir; inhibisyonu akciğer ve havayollarında bradikinin ve P maddesi birikimine yol açarak öksürük ve vazodilatasyona bağlı anjiyoödem yapar.",
      box: 1,
      intervalDays: 1
    },
    {
      cardId: "pharm-mod5-les1-card2",
      courseId: "pharmacology",
      drugOrConcept: "ARB Üstünlüğü ve Reseptör Seçiciliği",
      prompt: "Losartan ve valsartan gibi ARB'ler neden kuru öksürüğe yol açmaz?",
      answer: "Doğrudan AT1 reseptörünü bloke ederler; ADE (kininaz II) enzim aktivitesine ve bradikinin yıkım yolağına dokunmazlar.",
      box: 1,
      intervalDays: 1
    },
    {
      cardId: "pharm-mod5-les1-card3",
      courseId: "pharmacology",
      drugOrConcept: "Efferent Arteriyol ve Renal Kriz",
      prompt: "Bilateral renal arter darlığında kaptopril veya enalapril verilmesi neden aniden akut böbrek yetmezliğini tetikler?",
      answer: "Böbrek perfüzyonu düştüğünde GFH'yi koruyan tek mekanizma Ang II'nin efferent arteriyolü kasmasıdır; ADEi efferenti genişleterek intraglomerüler filtrasyon basıncını çökertir.",
      box: 1,
      intervalDays: 1
    },
    {
      cardId: "pharm-mod5-les1-card4",
      courseId: "pharmacology",
      drugOrConcept: "ARNI ve 36 Saatlik Arınma Kuralı",
      prompt: "ADE inhibitöründen Sakubitril/Valsartan (ARNI) tedavisine geçerken neden en az 36 saat beklenmelidir?",
      answer: "ADE ve neprilisin enzimlerinin eşzamanlı inhibisyonu masif bradikinin birikimi oluşturarak ölümcül laringeal anjiyoödeme neden olur; 36 saatlik arınma (washout) şarttır.",
      box: 1,
      intervalDays: 1
    }
  ],
  steps: [
    // Step 1: Hook (predict_reveal, predictThenReveal: true)
    {
      id: "pharm-mod5-les1-step1",
      order: 1,
      stageIndex: 1,
      stage: "hook",
      type: "predict_reveal",
      title: {
        tr: "Bothrops jararaca Zehrinden Kaptopril Devrimine",
        ar: "من سم أفعى الحفر البرازيلية إلى ثورة كابتوبريل",
        en: "From Pit Viper Venom to the Captopril Revolution"
      },
      predictThenReveal: true,
      prompt: {
        tr: "Brezilya çukur engereğinin soktuğu avlar neden anında derin hipotansif şoka girip felç oluyordu? Bu ölümcül zehir peptidleri, modern kardiyolojinin en çok reçete edilen tansiyon ilaçlarını nasıl doğurdu?",
        ar: "لماذا ينهار ضغط دم فرائس أفعى الحفر البرازيلية إلى صدمة وعائية عميقة؟ وكيف ولدت ببتيدات هذا السم القاتل أكثر أدوية الضغط نجاحاً في تاريخ الطب؟",
        en: "Why did Brazilian pit viper bites cause victims to collapse into catastrophic hypotensive shock? How did lethal venom peptides inspire the rational synthesis of blockbuster ACE inhibitors?"
      },
      conceptCheck: {
        question: {
          tr: "Brezilya engereği zehrindeki peptidlerin (BPP) kurbanın kan basıncını sıfıra indirmesinin moleküler mekanizması neydi?",
          ar: "ما الآلية الجزيئية التي جعلت ببتيدات سم الأفعى (BPP) تسقط ضغط دم الضحية إلى الصفر؟",
          en: "What was the molecular mechanism by which pit viper bradykinin-potentiating peptides crashed victim blood pressure?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Anjiyotensin dönüştürücü enzimi (ADE/kininaz II) inhibe ederek vazopressör Ang II sentezini durdurur ve vazodilatatör bradikinini biriktirir.",
              ar: "تثبيط الإنزيم المحول للأنجيوتنسين (ACE/kininase II) فيتوقف تصنيع Ang II القابض ويتراكم البراديكينين الموسع.",
              en: "Inhibiting ACE (kininase II), simultaneously abolishing vasoconstrictor Ang II synthesis and surging vasodilator bradykinin."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Mükemmel biyokimyasal kavrayış! Zehir peptidi ADE'yi kilitleyerek çift yönlü şok yaratır: güçlü damar büzücü Ang II üretilemezken, damar gevşetici bradikinin yıkılamayıp kontrolsüz birikir.",
              ar: "فهم كيميائي حيوي ممتاز! يعطل ببتيد السم إنزيم ACE فينتج صدمة مزدوجة: غياب Ang II القابض وتراكم البراديكينين الموسع للأوعية دون رادع.",
              en: "Superb insight! Viper venom peptide blocks ACE, triggering a two-pronged vascular collapse: loss of vasoconstrictor Ang II and massive accumulation of vasodilator bradykinin."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Damar endotelindeki kalsiyum kanallarını kovalent olarak parçalayarak düz kas hücrelerini eritir.",
              ar: "التحليل التساهمي لقنوات الكالسيوم في البطانة الوعائية وتفكيك خلايا العضلات الملساء.",
              en: "Covalently cleaving endothelial calcium channels, directly digesting vascular smooth muscle cells."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Zehir enzimatik bir proteaz olarak kas liflerini sindirmez; doğrudan Anjiyotensin Dönüştürücü Enzimi kompetitif bloke eder.",
              ar: "غير صحيح: لا يحلل السم خلايا العضلات أو قنوات الكالسيوم، بل يحصر إنزيم ACE تنافسياً.",
              en: "Incorrect: The venom peptides do not digest muscle cells or channels; they competitively inhibit the Angiotensin Converting Enzyme."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Böbrek tübüllerindeki tüm sodyum kanallarını tıkayarak 1 dakika içinde tüm kan plazmasını idrarla attırır.",
              ar: "إغلاق جميع قنوات الصوديوم الكلوية وطرد كامل بلازما الدم في البول خلال دقيقة واحدة.",
              en: "Blocking all renal tubular sodium channels, expelling the entire blood volume into urine in sixty seconds."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Şokun nedeni akut diürez değildir; saniyeler içinde gerçekleşen arteriyoler dilatasyon ve total periferik direnç çöküşüdür.",
              ar: "غير صحيح: سبب الهبوط ليس الإدرار السريع للبول، بل التوسع الشرياني الفوري وانهيار المقاومة الوعائية.",
              en: "Incorrect: The acute shock is not driven by diuresis, but by instantaneous systemic vasodilation and total peripheral resistance collapse."
            }
          }
        ]
      },
      technicalTerms: [
        {
          "term": "ADE inhibitörü",
          "arContext": "مثبط الإنزيم المحول للأنجيوتنسين (ACE inhibitor)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Zehir kurbanında güçlü bir damar büzücünün eksikliği ile damar gevşeticinin fazlalığı aynı anda gelişir.",
          ar: "يتزامن في ضحية السم غياب مادة قابضة قوية للأوعية مع تراكم مادة موسعة بشدة.",
          en: "The victim simultaneously suffers a deficiency of a potent vasoconstrictor and an excess of a vasodilator."
        },
        {
          tier: 2,
          tr: "Bu iki olayı birden kontrol eden tek bir endotelyal enzim hangisidir? Kininaz II olarak da bilinen ADE.",
          ar: "ما الإنزيم البطاني الوحيد الذي يتحكم في هاتين العمليتين معاً؟ إنه ACE المعروف أيضاً بـ kininase II.",
          en: "Which single endothelial enzyme governs both pathways? ACE, also known as kininase II."
        },
        {
          tier: 3,
          tr: "ADE hem Anjiyotensin I'i Ang II'ye çevirir hem de bradikinini parçalar; zehir bu enzimi bloke eder.",
          ar: "يحول ACE الأنجيوتنسين 1 إلى 2 ويحطم البراديكينين؛ وسم الأفعى يعطل هذا الإنزيم تماماً.",
          en: "ACE converts Ang I to Ang II and degrades bradykinin; venom peptides competitively inhibit this enzyme."
        }
      ]
    },

    // Step 2: Question (predict_reveal)
    {
      id: "pharm-mod5-les1-step2",
      order: 2,
      stageIndex: 2,
      stage: "question",
      type: "question",
      title: {
        tr: "İlaç Değişimi: Öksürüğü Kesen ARB Geçişi",
        ar: "تبديل الدواء: حل السعال الجاف بالانتقال إلى ARB",
        en: "Medication Switch: Resolving Dry Cough via ARB Transition"
      },
      predictThenReveal: true,
      prompt: {
        tr: "Enalapril başlanan hipertansiyon hastasında inatçı, uykuyu bölen kuru öksürük gelişiyor. İlaç kesilip losartana geçildiğinde tansiyon düşmeye devam ederken öksürük neden tamamen kaybolur?",
        ar: "مريض ضغط عولج بـ Enalapril فأصيب بسعال جاف مزعج حرمه النوم. عند إيقافه واستبداله بـ Losartan، استمر انخفاض الضغط لكن السعال اختفى تماماً. لماذا؟",
        en: "A hypertensive patient on enalapril develops an intractable nocturnal dry cough. When switched to losartan, blood pressure remains controlled yet the cough completely vanishes! Why?"
      },
      conceptCheck: {
        question: {
          tr: "Losartanın (ARB) kan basıncını düşürürken enalaprilin yaptığı kuru öksürüğe yol açmamasının farmakolojik sebebi nedir?",
          ar: "ما السبب الدوائي لنجاح Losartan في خفض الضغط دون إحداث السعال الجاف الذي سببه Enalapril؟",
          en: "What pharmacological difference explains why losartan lowers blood pressure without inducing enalapril's dry cough?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Losartan doğrudan AT1 reseptörünü bloke eder; ADE (kininaz II) enzimini inhibe etmediği için akciğerde bradikinin birikmez.",
              ar: "يحصر Losartan مستقبلات AT1 مباشرة؛ ولا يثبط إنزيم ACE (kininase II) فلا يتراكم البراديكينين بالرئتين.",
              en: "Losartan directly blocks AT1 receptors; it does not inhibit ACE (kininase II), preventing pulmonary bradykinin accumulation."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Tam isabet! Kuru öksürük Ang II eksikliğinden değil, ADE'nin kininaz II aktivitesinin durmasıyla akciğerde biriken bradikinin ve P maddesinden kaynaklanır. ARB reseptör düzeyinde etki eder.",
              ar: "إصابة دقيقة! لا ينجم السعال عن غياب Ang II، بل عن تراكم البراديكينين والمادة P عند تثبيط kininase II. تعمل ARB على مستوى المستقبلات دون مساس بالإنزيم.",
              en: "Spot on! The dry cough is not caused by Ang II depletion, but by bradykinin and substance P accumulation due to kininase II inhibition. ARBs target receptors directly."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Losartan akciğer bronşlarındaki öksürük reseptörlerini kovalent olarak mühürleyen bir antitusiftir.",
              ar: "يعتبر Losartan مهدئاً للسعال يقوم بختم مستقبلات السعال في القصبات بروابط تساهمية.",
              en: "Losartan acts as an antitussive that covalently seals cough receptors in bronchial tissue."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanılgı: Losartan antitusif veya öksürük kesici bir ajan değildir; sadece bradikinin birikimine yol açmayan selektif bir AT1 reseptör blokeridir.",
              ar: "مغالطة: ليس Losartan دواءً مهدئاً للسعال؛ بل هو حاصر نوعي لمستقبلات AT1 لا يتسبب في تراكم البراديكينين.",
              en: "Misconception: Losartan is not a cough suppressant; it simply avoids the bradykinin accumulation that triggers the cough reflex."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Losartan bradikinini parçalayan enzimleri 10 kat hızlandırarak akciğeri tamamen temizler.",
              ar: "يقوم Losartan بتنشيط الإنزيمات المحطمة للبراديكينين بمقدار 10 أضعاف فيطهر الرئة منه.",
              en: "Losartan accelerates bradykinin-degrading enzymes tenfold, cleansing the pulmonary parenchyma."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanılgı: ARB'ler kininaz enzimlerini indüklemez veya hızlandırmaz; normal endojen yıkım hızına hiç müdahale etmezler.",
              ar: "مغالطة: لا تحفز حاصرات ARB إنزيمات تكسير الكينينات؛ بل تترك نشاط الهدم الطبيعي دون أي تداخل.",
              en: "Misconception: ARBs do not stimulate or induce kinin-degrading enzymes; they leave basal degradation unaffected."
            }
          }
        ]
      },
      technicalTerms: [
        {
          "term": "bradikinin",
          "arContext": "براديكينين (bradykinin)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Kuru öksürüğü yaratan faktör tansiyonun düşmesi midir, yoksa havayollarında biriken kimyasal bir mediyatör müdür?",
          ar: "هل ينجم السعال عن هبوط ضغط الدم ذاته، أم عن وسيط كيميائي يتراكم في المجاري التنفسية؟",
          en: "Is the dry cough triggered by blood pressure reduction itself, or by an accumulated chemical mediator?"
        },
        {
          tier: 2,
          tr: "ADE inhibitörleri aynı zamanda kininaz II enzimidir ve bradikinini parçalar. ARB'ler bu enzime dokunur mu?",
          ar: "تثبط أدوية ACE إنزيم kininase II الذي يحطم البراديكينين. هل تمس أدوية ARB هذا الإنزيم؟",
          en: "ACE inhibitors block kininase II, preventing bradykinin breakdown. Do ARBs interfere with this enzyme?"
        },
        {
          tier: 3,
          tr: "ARB'ler doğrudan AT1 reseptörünü bloke eder; ADE enzimi serbest kaldığı için bradikinin birikmez ve öksürük biter.",
          ar: "تحصر ARB مستقبلات AT1 مباشرة؛ ويبقى إنزيم ACE حراً يحطم البراديكينين فلا يحدث سعال.",
          en: "ARBs selectively block AT1 receptors; with ACE uninhibited, bradykinin is cleared normally, abolishing the cough."
        }
      ]
    },

    // Step 3: Intuition (explanation)
    {
      id: "pharm-mod5-les1-step3",
      order: 3,
      stageIndex: 3,
      stage: "intuition",
      type: "intuition",
      title: {
        tr: "Çift Kanallı Lavabo Tahliyesi Analojisi",
        ar: "تشبيه حوض تصريف المياه ثنائي القنوات",
        en: "The Dual-Drain Sink Analogy"
      },
      prompt: {
        tr: "ADE enzimini iki kollu bir su tesisatına benzetin: bir borudan Anjiyotensin I girip tansiyonu yükselten Ang II çıkar; diğer borudan damar gevşetici bradikinin girip parçalanır. Vanayı tıkarsanız ne olur?",
        ar: "تخيل إنزيم ACE كأنبوب سباكة ذي مدخلين: مدخل يحول Ang I إلى Ang II لرفع الضغط؛ ومدخل يصرف البراديكينين الموسع ويحلله. ماذا يحدث عند سد هذا الأنبوب بمثبط ACE؟",
        en: "Picture ACE as a dual-channel plumbing manifold: one pipe generates vasoconstrictor Ang II to raise pressure; the other drains away vasodilator bradykinin. What happens when you clog the pipe?"
      },
      technicalTerms: [
        {
          "term": "kininaz II",
          "arContext": "كينينيز 2 (kininase II)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Vanayı kapatmak bir yandan basınç üretici suyu keserken, diğer taraftan tahliye giderini tıkar.",
          ar: "إغلاق الصمام يقطع تدفق الماء الضاغط من جهة، ويسد مصرف التصريف من جهة أخرى.",
          en: "Closing the valve shuts off high-pressure inflow while simultaneously blocking the drainage line."
        },
        {
          tier: 2,
          tr: "Basınç üreten Ang II düşer (tansiyon kontrolü), ancak tahliye olamayan bradikinin taşar (öksürük ve anjiyoödem).",
          ar: "يهبط Ang II الضاغط (فينخفض ضغط الدم)، لكن البراديكينين غير المصرف يفيض (سعال ووذمة).",
          en: "Ang II drops (lowering blood pressure), but undrained bradykinin overflows (triggering cough and angioedema)."
        },
        {
          tier: 3,
          tr: "ARB ise boruyu tıkamaz; suyun ulaştığı musluk başlığını (AT1 reseptörünü) kapatır. Gider serbestçe akar!",
          ar: "أما ARB فلا تسد الأنبوب؛ بل تغلق صنبور الاستقبال (AT1) فقط، فيستمر تصريف البراديكينين بحرية!",
          en: "An ARB does not clog the pipe; it caps the downstream faucet (AT1 receptor), leaving drainage completely unimpeded!"
        }
      ]
    },

    // Step 4: Visual Explanation (explanation)
    {
      id: "pharm-mod5-les1-step4",
      order: 4,
      stageIndex: 4,
      stage: "visual_explanation",
      type: "visual_explanation",
      title: {
        tr: "RAAS Biyokimyasal Kaskadı ve Reseptör Dağılımı",
        ar: "شلال RAAS الكيميائي الحيوي وتوزيع المستقبلات",
        en: "The RAAS Biochemical Cascade & Receptor Profiling"
      },
      prompt: {
        tr: "Jukstaglomerüler renin anjiyotensinojeni Ang I'e, endotelyal ADE ise Ang II'ye çevirir. Ang II AT1 ile vazokonstriksiyon ve aldosteron salgılatırken, AT2 ile koruyucu vazodilatasyon ve antiproliferatif etki üretir.",
        ar: "يحول الرينين الأنجيوتنسينوجين إلى Ang I، ويحوله إنزيم ACE إلى Ang II. يحفز Ang II عبر AT1 تضيق الأوعية وإفراز الألدوستيرون، بينما يحفز عبر AT2 توسعاً وقائياً وتثبيطاً للتكاثر.",
        en: "Juxtaglomerular renin cleaves angiotensinogen to Ang I, and endothelial ACE cleaves Ang I to Ang II. Ang II triggers vasoconstriction and aldosterone via AT1, while promoting cardioprotective vasodilation via AT2."
      },
      technicalTerms: [
        {
          "term": "anjiyotensin II",
          "arContext": "أنجيوتنسين 2 (angiotensin II)"
        },
        {
          "term": "AT1 reseptörü",
          "arContext": "مستقبل AT1 (AT1 receptor)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "RAAS yolunda hangi enzim hız kısıtlayıcı ilk basamağı yönetir? Böbrekten salınan renin.",
          ar: "ما الإنزيم الذي يتحكم في الخطوة الأولى المحددة للسرعة في مسار RAAS؟ الرينين الكلوي.",
          en: "Which enzyme catalyses the initial rate-limiting step of RAAS? Renal renin."
        },
        {
          tier: 2,
          tr: "Ang II iki farklı GPCR'ye bağlanır: AT1 (Gq-kenetli patolojik büzülme) ve AT2 (koruyucu genişleme).",
          ar: "يرتبط Ang II بمستقبلين مختلفين: AT1 (المقترن بـ Gq للتقبض) و AT2 (الواقي الموسع للأوعية).",
          en: "Ang II acts on two GPCRs: AT1 (Gq-coupled vasoconstriction) and AT2 (protective vasodilation)."
        },
        {
          tier: 3,
          tr: "ARB'ler zararlı AT1'i seçici bloke ederken, artan serbest Ang II'nin faydalı AT2'yi uyarmasına izin verir.",
          ar: "تحصر ARB مستقبلات AT1 الضارة، تاركة الفائض من Ang II ينشط مستقبلات AT2 الوقائية.",
          en: "ARBs selectively block pathogenic AT1, allowing unblocked Ang II to stimulate beneficial AT2 receptors."
        }
      ]
    },

    // Step 5: Interactive Artifact (interactive_simulation)
    {
      id: "pharm-mod5-les1-step5",
      order: 5,
      stageIndex: 5,
      stage: "interactive_artifact",
      type: "interactive_artifact",
      title: {
        tr: "Doz-Yanıt Eğrisi: Anjiyotensin II ve AT1 Antagonizmi",
        ar: "منحنى الجرعة والاستجابة: الأنجيوتنسين 2 وحصار AT1",
        en: "Dose-Response Modulator: Angiotensin II & AT1 Antagonism"
      },
      prompt: {
        tr: "Simülatörde Anjiyotensin II konsantrasyonunu artırarak vazokonstriksiyon eğrisini izleyin. Yarışmalı AT1 blokeri losartan ekleyerek eğrinin sağa kaymasını, aşılamaz kandesartan ile maksimum yanıtın düşüşünü keşfedin.",
        ar: "زد تركيز Ang II في المحاكي وراقب منحنى تقبض الأوعية. أضف Losartan التنافسي لتشهد إزاحة المنحنى يميناً، أو Candesartan غير القابل للتجاوز لتشهد هبوط Emax.",
        en: "Increase Angiotensin II concentration to generate vasoconstriction. Introduce competitive losartan to observe parallel rightward shifts, or candesartan to see insurmountable depression of Emax."
      },
      predictThenReveal: false,
      widgetType: "DoseResponseCurve",
      widget: {
        type: "DoseResponseCurve",
        config: {
          title: "Anjiyotensin II Doz-Yanıt ve AT1 Blokajı",
          prompt: "Anjiyotensin II konsantrasyonunu artırın; losartan ve kandesartan ile AT1 reseptör eğrisindeki değişimi izleyin.",
          defaultEc50: 1.0,
          defaultEmax: 100,
          defaultHillSlope: 1.0,
          modes: [
            "agonist",
            "competitive_antagonist",
            "noncompetitive_antagonist"
          ],
          source: {
            file: "Kardiyovasküler Sistem.pdf",
            page: 8
          },
          explanation: "Losartan kompetitif antagonist olarak eğriyi sağa paralel kaydırırken (EC50 artar), kandesartan reseptörden çok yavaş ayrılarak aşılamaz (non-kompetitif benzeri) blokajla Emax değerini baskılar."
        }
      },
      config: {
        title: "Anjiyotensin II Doz-Yanıt ve AT1 Blokajı",
        prompt: "Anjiyotensin II konsantrasyonunu artırın; losartan ve kandesartan ile AT1 reseptör eğrisindeki değişimi izleyin.",
        defaultEc50: 1.0,
        defaultEmax: 100,
        defaultHillSlope: 1.0,
        modes: [
          "agonist",
          "competitive_antagonist",
          "noncompetitive_antagonist"
        ],
        source: {
          file: "Kardiyovasküler Sistem.pdf",
          page: 8
        },
        explanation: "Losartan kompetitif antagonist olarak eğriyi sağa paralel kaydırırken (EC50 artar), kandesartan reseptörden çok yavaş ayrılarak aşılamaz (non-kompetitif benzeri) blokajla Emax değerini baskılar."
      },
      technicalTerms: [
        {
          "term": "kompetitif antagonizm",
          "arContext": "المناهضة التنافسية (competitive antagonism)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Yarışmalı bir antagonist eklendiğinde agonist aynı maksimum etkiye ulaşabilir mi? Evet, ama daha yüksek dozda.",
          ar: "عند إضافة مناهض تنافسي، هل يستطيع المشبه بلوغ نفس التأثير الأقصى؟ نعم، لكن بجرعات أعلى.",
          en: "When a competitive antagonist is added, can the agonist still achieve maximal efficacy? Yes, at higher doses."
        },
        {
          tier: 2,
          tr: "Losartan kompetitif etkiyle EC50 değerini büyütür ve eğriyi sağa kaydırır; Emax değişmez.",
          ar: "يزيد Losartan التنافسي قيمة EC50 ويزيح المنحنى إلى اليمين مع بقاء Emax ثابتاً دون تغير.",
          en: "Competitive losartan increases EC50, shifting the curve rightward with unchanged Emax."
        },
        {
          tier: 3,
          tr: "Kandesartan ise reseptöre psödo-irreversible bağlanır; aşılamaz blokajla Emax tavanını aşağı çeker.",
          ar: "أما Candesartan فيرتبط ارتباطاً شبه غير عكوس؛ فيهبط بسقف الاستجابة القصوى Emax بحصار لا يمكن تجاوزه.",
          en: "Candesartan dissociates extremely slowly, producing insurmountable blockade that depresses Emax."
        }
      ]
    },

    // Step 6: Guided Discovery (guided_discovery)
    {
      id: "pharm-mod5-les1-step6",
      order: 6,
      stageIndex: 6,
      stage: "guided_discovery",
      type: "guided_discovery",
      title: {
        tr: "ADE İnhibitörü vs ARB: Biyokimyasal Ayrışma",
        ar: "مثبطات ACE مقابل حاصرات ARB: التباين الكيميائي الحيوي",
        en: "ACE Inhibitors vs ARBs: Biochemical Divergence"
      },
      prompt: {
        tr: "Losartan eklediğinizde dolaşımdaki Ang II konsantrasyonu negatif feedback kalktığı için katlanır, ancak AT1 bloke olduğu için tansiyon düşer. Serbest Ang II ise korunmuş AT2 reseptörlerini uyarır!",
        ar: "عند إعطاء Losartan يتضاعف تركيز Ang II في الدم لزوال التلقيم الراجع السلبي، لكن الضغط ينخفض لحصار AT1. والمثير أن Ang II الفائض ينشط مستقبلات AT2 الوقائية!",
        en: "With losartan, circulating Ang II levels spike due to lost negative feedback, yet BP falls because AT1 is blocked. Crucially, unbound Ang II freely stimulates unblocked protective AT2 receptors!"
      },
      technicalTerms: [
        {
          "term": "negatif geri bildirim",
          "arContext": "التغذية الراجعة السلبية (negative feedback)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "AT1 reseptörü bloke olunca böbreğin renin salgılayan hücreleri üzerindeki fren kalkar.",
          ar: "عند حصار مستقبلات AT1، ينحل الكبح عن الخلايا الكلوية المفرزة للرينين.",
          en: "When AT1 receptors are blocked, negative feedback on juxtaglomerular renin release is released."
        },
        {
          tier: 2,
          tr: "Plazma renin aktivitesi ve Anjiyotensin II seviyesi yükselir; ancak hedefleri olan AT1 kapalıdır.",
          ar: "ترتفع فعالية رينين البلازما ومستويات Ang II، لكن هدفهما الرئيسي AT1 مسدود تماماً.",
          en: "Plasma renin activity and Ang II surge; however, their primary target AT1 is completely blocked."
        },
        {
          tier: 3,
          tr: "ADE inhibitörlerinde ise Ang II üretimi durur; bradikinin birikir ama AT2 uyarımı gerçekleşemez.",
          ar: "أما في مثبطات ACE فينعدم Ang II؛ ويتراكم البراديكينين دون أي تنشيط لمستقبلات AT2.",
          en: "Under ACE inhibitors, Ang II generation stops; bradykinin builds up, but AT2 stimulation cannot occur."
        }
      ]
    },

    // Step 7: Formal Explanation (explanation)
    {
      id: "pharm-mod5-les1-step7",
      order: 7,
      stageIndex: 7,
      stage: "formal_explanation",
      type: "formal_explanation",
      title: {
        tr: "Renal Hemodinamik: Efferent Arteriyol ve GFH Dengesi",
        ar: "الديناميكا الدموية الكلوية: الشريين الصادر وتوازن GFR",
        en: "Renal Hemodynamics: Efferent Arteriolar Tone & GFR Dynamics"
      },
      prompt: {
        tr: "Anjiyotensin II öncelikle glomerülün çıkış kapısı olan efferent arteriyolü büzer; bu sayede intraglomerüler filtrasyon basıncını yüksek tutar. ADEi veya ARB efferent arteriyolü gevşeterek filtrasyon basıncını ve mikroalbüminüriyi düşürür.",
        ar: "يقبض Ang II بصورة تفضيلية الشريين الصادر من الكبيبة الكلوية، محافظاً على ضغط الترشيح الكبيبي مرتفعاً. تقوم أدوية ACEi و ARB بإرخاء الشريين الصادر، فتخفض ضغط الترشيح والبيلة البروتينية.",
        en: "Angiotensin II preferentially constricts the glomerular efferent arteriole, maintaining intraglomerular capillary pressure. ACEi/ARBs dilate this efferent outflow, reducing intraglomerular hypertension and preserving nephrons."
      },
      technicalTerms: [
        {
          "term": "efferent arteriyol",
          "arContext": "الشريين الصادر (efferent arteriole)"
        },
        {
          "term": "glomerüler filtrasyon hızı",
          "arContext": "معدل الترشيح الكبيبي (glomerular filtration rate - GFR)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Glomerül bir filtre gibidir: Giriş (afferent) açılır veya çıkış (efferent) büzülürse iç basınç artar.",
          ar: "الكبيبة مثل المرشح: إذا فتح المدخل (الوارد) أو ضاق المخرج (الصادر) يرتفع الضغط الداخلي.",
          en: "The glomerulus is a filtration chamber: constricting the efferent outlet spikes internal hydrostatic pressure."
        },
        {
          tier: 2,
          tr: "Diyabette yüksek intraglomerüler basınç kılcal damarları patlatır ve protein kaçağına yol açar.",
          ar: "في داء السكري، يؤدي ارتفاع الضغط داخل الكبيبة إلى تمزق الشعيرات وتسريب البروتين.",
          en: "In diabetic nephropathy, sustained intraglomerular hypertension damages podocytes and causes proteinuria."
        },
        {
          tier: 3,
          tr: "ADEi ve ARB efferenti gevşetip basıncı düşürür; bu renal koruyucu etki böbrek yetmezliğini geciktirir.",
          ar: "ترخي ACEi و ARB الشريين الصادر فتهبط بضغط الكبيبة، وتوفر حماية كلوية تبطئ القصور الكلوي.",
          en: "ACEi and ARBs dilate the efferent arteriole, relieving intraglomerular pressure and halting nephropathy."
        }
      ]
    },

    // Step 8: Concept Check (multiple_choice)
    {
      id: "pharm-mod5-les1-step8",
      order: 8,
      stageIndex: 8,
      stage: "concept_check",
      type: "concept_check",
      title: {
        tr: "Klinik Risk: Bilateral Renal Arter Darlığı",
        ar: "خطر سريري: تضيق الشريان الكلوي في الجانبين",
        en: "Clinical Risk: Bilateral Renal Artery Stenosis"
      },
      prompt: {
        tr: "Bilateral renal arter darlığı olan hipertansiyon hastasına lisinopril başlanıyor. Birkaç gün içinde gelişen akut anürik böbrek yetmezliğinin hemodinamik mekanizmasını analiz edin.",
        ar: "بدأ مريض مصاب بتضيق الشريان الكلوي في الجانبين تناول Lisinopril، فأصيب بعد أيام بقصور كلوي حاد مع انقطاع البول. حلل الآلية الديناميكية الدموية المسؤولة.",
        en: "A patient with bilateral renal artery stenosis starts lisinopril and develops acute anuric renal failure within days. Analyze the hemodynamic mechanism causing this acute collapse."
      },
      conceptCheck: {
        question: {
          tr: "Bilateral renal arter stenozu olan bir hipertansiyon hastasına lisinopril başlandığında, birkaç gün içinde gelişen akut anürik böbrek yetmezliğinin nedeni nedir?",
          ar: "عند بدء Lisinopril لمريض ضغط يعاني من تضيق الشريان الكلوي ثنائي الجانب، ما سبب حدوث قصور كلوي حاد مع انقطاع البول خلال أيام؟",
          en: "When lisinopril is started in bilateral renal artery stenosis, what hemodynamic collapse causes sudden acute anuric kidney failure?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Düşük perfüzyonda GFH tamamen Ang II'nin efferent arteriyolü kasmasına bağlıdır; ADEi efferenti genişletince intraglomerüler filtrasyon basıncı çöker.",
              ar: "في ضعف التروية يعتمد GFR كلياً على قبض Ang II للشريين الصادر؛ وبإرخاء الصادر بـ ACEi ينهار ضغط الترشيح فوراً.",
              en: "Under severe hypoperfusion, GFR relies exclusively on Ang II-mediated efferent constriction; ACE inhibition dilates the efferent arteriole, collapsing GFR."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Kritik klinik teşhis! Renal arter tıkalıyken böbreğe gelen kan basıncı çok düşüktür. Böbrek filtrasyon yapabilmek için tek çare olarak efferent arteriyolü Ang II ile sonuna kadar büzer. Bu büzülmeyi ilaçla kırarsanız filtrasyon basıncı sıfıra iner!",
              ar: "تشخيص سريري مصيري! عند تضيق الشريان يهبط تدفق الدم الكلوي؛ ولا حل أمام الكلية لتصفية البول إلا قبض الشريين الصادر بـ Ang II لرفع ضغط الكبيبة. كسر هذا التقبض الدوائي يسقط الترشيح للصفر!",
              en: "Critical clinical reasoning! With stenotic arteries, perfusion pressure is critically low. The kidney maintains filtration only by maximizing Ang II efferent vasoconstriction. Dilating this outlet drops GFR to zero!"
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Lisinopril daralmış renal arter lümeninde kristalleşerek mekanik trombüs oluşturur.",
              ar: "يتبلور Lisinopril داخل الشريان الكلوي المتضيق مشكلاً خثرة ميكانيكية تسد الوعاء.",
              en: "Lisinopril crystallizes within the stenotic arterial lumen, mechanically forming an occlusive thrombus."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanılgı: ADE inhibitörleri damar içinde kristalleşen veya pıhtı oluşturan ilaçlar değildir; hasar hemodinamik intraglomerüler basınç kaybıdır.",
              ar: "مغالطة: لا تتبلور مثبطات ACE في الأوعية الدموية؛ فالفشل هو هبوط ديناميكي دموي بحت في ضغط الترشيح.",
              en: "Misconception: ACE inhibitors do not precipitate or induce vascular thrombosis; the failure is purely hemodynamic."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "İlaç jukstaglomerüler aparatı kalıcı kovalent nekroza uğratarak renin genini yok eder.",
              ar: "يسبب الدواء تنخراً تساهمياً دائماً في الجهاز المجاور للكبيبات ويقضي على جين الرينين.",
              en: "The drug triggers irreversible necrosis of the juxtaglomerular apparatus, destroying the renin gene."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanılgı: ADEi hücre nekrozu yapmaz; jukstaglomerüler hücreler sağlamdır hatta feedback kalktığı için aşırı renin salgılarlar.",
              ar: "مغالطة: لا تحدث مثبطات ACE تنخراً خلوياً؛ فالخلايا سليمة بل وتفرز رينين مفرط لغياب التلقيم الراجع.",
              en: "Misconception: ACE inhibitors do not cause cellular necrosis; JG cells remain intact and hypersecrete renin due to disinhibition."
            }
          }
        ]
      },
      technicalTerms: [
        {
          "term": "renal arter stenozu",
          "arContext": "تضيق الشريان الكلوي (renal artery stenosis)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Böbreğe gelen kan basıncı ana caddedeki darlık (stenoz) yüzünden zaten çok düşüktür.",
          ar: "ضغط الدم الوارد إلى الكلية منخفض جداً بسبب التضيق الشرياني الرئيسي.",
          en: "Perfusion pressure entering the kidney is already severely diminished by the arterial stenosis."
        },
        {
          tier: 2,
          tr: "Glomerül süzebilmek için çıkış kapısını (efferent arteriyolü) daraltıp içerde basınç biriktirmek zorundadır.",
          ar: "لتحقيق الترشيح، تضطر الكلية لتضييق مخرجها (الشريين الصادر) لحبس الضغط داخل الكبيبة.",
          en: "To filter plasma, the kidney must constrict its outflow door (efferent arteriole) to trap hydrostatic pressure."
        },
        {
          tier: 3,
          tr: "ADEi efferent kapıyı tamamen açar; içerideki filtrasyon basıncı kalmayınca idrar üretimi durur.",
          ar: "يفتح ACEi باب الصادر بالكامل؛ فيزول ضغط الترشيح المحبوس ويتوقف إنتاج البول تماماً.",
          en: "ACE inhibitors open the efferent outflow door; without internal filtration pressure, urine formation halts."
        }
      ]
    },

    // Step 9: Application (multiple_choice)
    {
      id: "pharm-mod5-les1-step9",
      order: 9,
      stageIndex: 9,
      stage: "application",
      type: "application",
      title: {
        tr: "Akut Toksisite: Anjiyoödem ve ARNI Geçişi",
        ar: "السمية الحادة: الوذمة الوعائية والتحول إلى ARNI",
        en: "Acute Toxicity: Angioedema & ARNI Transition Protocols"
      },
      prompt: {
        tr: "Enalapril kullanan hastada dudak şişmesi ve laringeal ödem gelişiyor. Sakubitril/Valsartan (ARNI) başlamadan önce neden kesinlikle 36 saatlik arınma süresi beklenmelidir?",
        ar: "أصيب مريض يتناول Enalapril بوذمة الشفاه واللهاة. لماذا يشترط الانتظار 36 ساعة كاملة قبل بدء علاج Sakubitril/Valsartan لتفادي الوذمة الوعائية الحنجرية القاتلة؟",
        en: "A patient on enalapril develops lip and laryngeal angioedema. Why must clinicians enforce a strict 36-hour washout before initiating sacubitril/valsartan (ARNI) therapy?"
      },
      conceptCheck: {
        question: {
          tr: "Enalapril kullanan kalp yetmezliği hastasında dudak şişmesi ve laringeal stridor (anjiyoödem) gelişiyor. Tedavi kesildikten sonra Sakubitril/Valsartan (ARNI) başlamadan önce neden kesinlikle 36 saat beklenmelidir?",
          ar: "مريض قصور قلب يتناول Enalapril أصيب بوذمة الشفاه وصرير حنجري (وذمة وعائية). بعد إيقاف الدواء، لماذا يجب الانتظار 36 ساعة كاملة قبل بدء دواء Sakubitril/Valsartan (ARNI)؟",
          en: "A heart failure patient on enalapril develops lip edema and stridor (angioedema). After stopping the drug, why must clinicians wait a strict 36-hour washout before initiating sacubitril/valsartan (ARNI)?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Sakubitril nötral endopeptidazı (neprilisin) inhibe eder; ADE ve neprilisin birlikte bloke olursa bradikinin yıkımı tamamen durup ölümcül laringeal boğulmaya yol açar.",
              ar: "يثبط Sakubitril إنزيم Neprilysin؛ وحصار ACE و Neprilysin معاً يوقف تحلل البراديكينين كلياً فيسبب اختناقاً حنجرياً قاتلاً.",
              en: "Sacubitril inhibits neprilysin; dual blockade of ACE and neprilysin completely halts bradykinin breakdown, precipitating fatal laryngeal asphyxiation."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Hayati farmakolojik kural! Hem ADE hem de neprilisin enzimleri bradikinini parçalar. İki inhibitör kanda çakışırsa bradikinin konsantrasyonu patlama yapar ve hasta dakikalar içinde asfiksiyle kaybedilebilir. 36 saatlik arınma süresi şarttır.",
              ar: "قاعدة دوائية منقذة للحياة! يحلل كل من إنزيم ACE و Neprilysin البراديكينين. تداخلهما معاً يفجر مستويات البراديكينين ويؤدي للوفاة بالاختناق؛ لذا يشترط فاصل 36 ساعة.",
              en: "Life-saving clinical rule! Both ACE and neprilysin degrade bradykinin. Dual concurrent inhibition leads to massive bradykinin surging and fatal asphyxiation. A 36-hour washout is mandatory."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Sakubitril kaptopril ile kanda birleştiğinde böbrek tübüllerinde sarı insoluble tuz çökeltisi oluşturur.",
              ar: "يتحد Sakubitril مع Captopril في الدم مشكلاً أملاحاً صفراء غير قابلة للذوبان تترسب في الكلى.",
              en: "Sacubitril binds captopril in circulating plasma, precipitating insoluble yellow salts within renal tubules."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanılgı: İki ilaç plazmada birbiriyle kimyasal olarak çökelti oluşturmaz; tehlike çift enzim inhibisyonu kaynaklı bradikinin toksisitesidir.",
              ar: "مغالطة: لا يشكل الدواءان رواسب كيميائية في الدم؛ بل الخطر ناجم عن تثبيط إنزيمين لهدم البراديكينين في آن واحد.",
              en: "Misconception: The drugs do not chemically precipitate each other; the danger is dual-enzyme inhibition of kinin breakdown."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Valsartan lisinoprilin karaciğer sitokrom CYP3A4 enzimini indükleyerek metabolizmasını durdurur.",
              ar: "يقوم Valsartan بتحريض إنزيم الكبد CYP3A4 مما يوقف استقلاب Lisinopril تماماً.",
              en: "Valsartan induces hepatic CYP3A4, completely arresting the metabolic degradation of lisinopril."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanılgı: Lisinopril CYP enzimleri tarafından metabolize edilmez; değişmeden böbrekten atılır. Etkileşim farmakokinetik değil farmakodinamiktir.",
              ar: "مغالطة: لا يستقلب Lisinopril بأنزيمات CYP الكبدية بل يطرح كلوياً دون تغيير؛ فالتفاعل ديناميكي حيوي وليس حركياً.",
              en: "Misconception: Lisinopril is eliminated unchanged by the kidneys without CYP metabolism; the interaction is purely pharmacodynamic."
            }
          }
        ]
      },
      technicalTerms: [
        {
          "term": "anjiyoödem",
          "arContext": "الوذمة الوعائية (angioedema)"
        },
        {
          "term": "neprilisin inhibitörü",
          "arContext": "مثبط النبريلايسين (neprilysin inhibitor)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Anjiyoödemin suçlusu bradikinindir. Sakubitril bradikinini yıkan başka bir enzimi (neprilisini) engeller mi?",
          ar: "المسؤول عن الوذمة هو البراديكينين. هل يعطل Sakubitril إنزيماً آخر لهدم البراديكينين (Neprilysin)؟",
          en: "Bradykinin is the culprit behind angioedema. Does sacubitril block another bradykinin-cleaving enzyme?"
        },
        {
          tier: 2,
          tr: "ADE ve neprilisin aynı anda durdurulursa bradikinini parçalayacak hiçbir alternatif kalmaz.",
          ar: "إذا تعطل ACE و Neprilysin في نفس اللحظة، فلن يتبقى أي مسار لتحطيم البراديكينين المتراكم.",
          en: "If both ACE and neprilysin are inhibited simultaneously, bradykinin degradation is completely blocked."
        },
        {
          tier: 3,
          tr: "Vücuttan eski ADE inhibitörünün tamamen temizlenmesi ve enzimlerin açılması için en az 36 saat beklenir.",
          ar: "يشترط مرور 36 ساعة لضمان خلو الجسم من مثبط ACE وتحرر الإنزيم قبل إدخال مثبط Neprilysin.",
          en: "At least 36 hours must elapse to ensure complete clearance of the ACE inhibitor before adding neprilysin inhibition."
        }
      ]
    },

    // Step 10: Retrieval (reflection)
    {
      id: "pharm-mod5-les1-step10",
      order: 10,
      stageIndex: 10,
      stage: "retrieval",
      type: "retrieval",
      title: {
        tr: "Bellek Güçlendirme: Teratojenite ve RAAS Blokajı",
        ar: "استرجاع معرفي: تشوه الأجنة وحصار مسار RAAS",
        en: "Spaced Retrieval: Teratogenicity & RAAS Blockade"
      },
      prompt: {
        tr: "Hamilelikte ADEi/ARB neden kesinlikle kontrendikedir? İkinci ve üçüncü trimesterde fetal renal disgenezis, oligohidramniyoz ve kafatası kemikleşme defektlerine yol açan bu teratojenik mekanizmayı zihninizde canlandırın.",
        ar: "لماذا تمنع أدوية ACEi/ARB منعاً باتاً أثناء الحمل؟ تذكر آليتها في إحداث خلل التخلق الكلوي الجنيني، ونقص السائل السلوي (الأمنيوسي)، وعيوب تعظم الجمجمة في الثلثين الأخيرين.",
        en: "Why are ACEi/ARBs strictly contraindicated during pregnancy? Recall how suppressing fetal Ang II produces renal dysgenesis, oligohydramnios, pulmonary hypoplasia, and calvarial skull defects in utero."
      },
      technicalTerms: [
        {
          "term": "teratojenisite",
          "arContext": "التشوه الجنيني (teratogenicity)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Anne karnındaki fetüsün böbrek gelişimi ve glomerüler perfüzyonu yetişkinden çok daha fazla Ang II'ye bağımlıdır.",
          ar: "يعتمد تطور كلى الجنين وتروية كبيباته داخل الرحم على Ang II بشكل أكبر بكثير من البالغين.",
          en: "Fetal renal development and glomerular perfusion in utero depend heavily on Ang II signaling."
        },
        {
          tier: 2,
          tr: "Ang II bloke olursa fetal idrar üretimi durur; fetal idrardan oluşan amniyotik sıvı kurur (oligohidramniyoz).",
          ar: "إذا تعطل Ang II يتوقف بول الجنين؛ فينضب السائل السلوي المكون أساساً من بوله (قلة السائل السلوي).",
          en: "Without Ang II, fetal urine output ceases; amniotic fluid (derived from fetal urine) collapses into oligohydramnios."
        },
        {
          tier: 3,
          tr: "Amniyotik sıvı kalmayınca bebek rahimde ezilir; akciğer hipoplazisi ve kafatası kemikleşme anomalileri gelişir.",
          ar: "بغياب السائل السلوي ينضغط الجنين برحم أمه؛ فيصاب بنقص تنسج الرئة وتشوهات تعظم الجمجمة القاتلة.",
          en: "Lack of amniotic fluid compresses the fetus, causing fatal pulmonary hypoplasia and skull ossification arrest."
        }
      ]
    },

    // Step 11: Connection (explanation)
    {
      id: "pharm-mod5-les1-step11",
      order: 11,
      stageIndex: 11,
      stage: "connection",
      type: "connection",
      title: {
        tr: "İleri Bağlantı: Aldosteron ve Tübüler Elektrolitler",
        ar: "ربط مفاهيمي: الألدوستيرون وشوارد النبيبات الكلوية",
        en: "Conceptual Bridge: Aldosterone & Tubular Electrolytes"
      },
      prompt: {
        tr: "RAAS inhibisyonu adrenal aldosteron salgısını baskılar. Aldosteron toplayıcı kanallarda sodyum tutup potasyum atılmasını sağladığından, blokaj potasyum tutulmasına (hiperkalemiye) yol açar. Bu durum diüretik seçimini nasıl etkiler?",
        ar: "يثبط إيقاف RAAS إفراز الألدوستيرون من الكظر. وبما أن الألدوستيرون يحبس الصوديوم ويطرح البوتاسيوم، فإن تثبيطه يراكم البوتاسيوم (فرط بوتاسيوم الدم). كيف يوجه هذا خيارات مدرات البول؟",
        en: "RAAS inhibition suppresses adrenal aldosterone. Because aldosterone drives sodium retention and potassium excretion in collecting ducts, blocking it risks hyperkalemia. How does this dictate diuretic selection?"
      },
      technicalTerms: [
        {
          "term": "aldosteron",
          "arContext": "ألدوستيرون (aldosterone)"
        },
        {
          "term": "hiperkalemi",
          "arContext": "فرط بوتاسيوم الدم (hyperkalemia)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Aldosteron böbreğin toplayıcı kanallarındaki temel sodyum tutucu ve potasyum atıcı hormondur.",
          ar: "الألدوستيرون هو الهرمون الرئيسي لحبس الصوديوم وطرح البوتاسيوم في القنوات الجامعة الكلوية.",
          en: "Aldosterone is the primary adrenal hormone driving sodium reabsorption and potassium wasting."
        },
        {
          tier: 2,
          tr: "ADEi ve ARB aldosteronu düşürünce vücut potasyum biriktirir; potasyum tutucu diüretikle birleşirse kalbi durdurabilir!",
          ar: "عندما تخفض ACEi/ARB الألدوستيرون يتراكم البوتاسيوم؛ وجمعه مع مدر حافظ للبوتاسيوم قد يوقف عضلة القلب!",
          en: "Lowering aldosterone retains potassium; combining ACEi/ARBs with potassium-sparing diuretics risks cardiac arrest!"
        },
        {
          tier: 3,
          tr: "Bir sonraki derste, Henle kulpu ve distal tübülde potasyum kaybettiren ve tutan diüretik mekanizmalarını inceleyeceğiz.",
          ar: "في الدرس القادم، سنستكشف في عروة هنلي والنبيبات البعيدة مدرات البول الطارحة والحافظة للبوتاسيوم.",
          en: "In the next lesson, we will explore nephron transporters governing loop, thiazide, and potassium-sparing diuretics."
        }
      ]
    },

    // Step 12: Mastery Check (multiple_choice)
    {
      id: "pharm-mod5-les1-step12",
      order: 12,
      stageIndex: 12,
      stage: "mastery_check",
      type: "mastery_check",
      title: {
        tr: "Biyokimyasal Panel Analizi: Kaptopril, Losartan, Aliskiren",
        ar: "تحليل اللوحة الكيميائية: كابتوبريل، لوسارتان، أليسكيرين",
        en: "Mastery Assessment: Biomarker Profiling Across the RAAS Axis"
      },
      prompt: {
        tr: "Plazma analizinde artmış PRA, artmış Ang I, baskılanmış Ang II ve belirgin yükselmiş bradikinin saptanıyor. Bu özgün biyobelirteç profilinin hangi ilaca ait olduğunu belirleyin.",
        ar: "أظهرت لوحة تحاليل المريض: ارتفاع PRA و Ang I، وانخفاض Ang II، مع تراكم شديد للبراديكينين. حدد الدواء المسؤول بدقة عن هذا المظهر الدوائي.",
        en: "A diagnostic panel reveals elevated PRA, elevated Ang I, suppressed Ang II, and marked bradykinin accumulation. Deduce which pharmacological agent accounts for this specific biomarker signature."
      },
      conceptCheck: {
        question: {
          tr: "Bir hastanın plazma testlerinde Plazma Renin Aktivitesi (PRA) artmış, Anjiyotensin I artmış, Anjiyotensin II azalmış ve Bradikinin seviyesi belirgin şekilde yükselmiş bulunuyor. Bu profil hangi ilaca aittir?",
          ar: "أظهرت تحاليل مريض: ارتفاع فعالية رينين البلازما (PRA)، ارتفاع Ang I، انخفاض Ang II، وارتفاع ملحوظ في البراديكينين. لأي دواء ينتمي هذا المظهر الدوائي بدقة؟",
          en: "A patient's plasma panel reveals elevated Plasma Renin Activity (PRA), elevated Ang I, suppressed Ang II, and significantly increased bradykinin levels. Which therapeutic agent produces this exact profile?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Kaptopril (ADE inhibitörü); ADE bloke olduğu için Ang I birikir, Ang II sentezlenemez ve bradikinin yıkılamaz.",
              ar: "Captopril (مثبط ACE)؛ لأن حصار الإنزيم يراكم Ang I ويمنع تصنيع Ang II ويعطل تحلل البراديكينين.",
              en: "Captopril (ACE inhibitor); blocked ACE leads to Ang I accumulation, suppressed Ang II, and impaired bradykinin clearance."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Kusursuz biyokimyasal ustalık! Kaptopril ADE'yi bloke ettiğinde: 1) Ang I'in Ang II'ye dönüşümü durur (Ang I artar, Ang II düşer); 2) Ang II'nin negatif feedback'i kalktığı için renin salgılanır (PRA artar); 3) Kininaz II aktivitesi durduğu için bradikinin birikir.",
              ar: "إتقان كيميائي حيوي مبهر! بحصار ACE بـ Captopril: 1) يتوقف تحول Ang I إلى Ang II (يتراكم 1 وينخفض 2)؛ 2) يزول التلقيم الراجع فيرتفع الرينين (PRA تزيد)؛ 3) يتعطل kininase II فيتراكم البراديكينين.",
              en: "Flawless biochemical mastery! Inhibiting ACE with captopril: 1) blocks Ang I to Ang II conversion (Ang I rises, Ang II drops); 2) eliminates Ang II negative feedback (PRA surges); 3) arrests kininase II degradation (bradykinin surges)."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Losartan (ARB); çünkü reseptörü bloke ederek plazmadaki Ang II ve bradikinin konsantrasyonunu aynı anda düşürür.",
              ar: "Losartan (حاصر ARB)؛ لأنه بحصار المستقبل يخفض تركيز Ang II والبراديكينين معاً في البلازما.",
              en: "Losartan (ARB); because blocking the receptor simultaneously reduces plasma Ang II and bradykinin."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanılgı: Losartan (ARB) Ang II seviyesini düşürmez, feedback kalktığı için tersine belirgin artırır! Ayrıca bradikinin seviyesini asla yükseltmez.",
              ar: "مغالطة: لا يخفض Losartan مستويات Ang II بل يرفعها بشدة لغياب التلقيم الراجع! كما أنه لا يرفع مستويات البراديكينين إطلاقاً.",
              en: "Misconception: Losartan does not decrease Ang II; it markedly elevates Ang II due to loss of negative feedback, and does not alter bradykinin."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Aliskiren (Direkt Renin İnhibitörü); çünkü yolun başındaki renini bloke ederek tüm basamakları artırır.",
              ar: "Aliskiren (مثبط الرينين المباشر)؛ لأنه يحصر الرينين في بداية المسار فيرفع كل المشتقات اللاحقة.",
              en: "Aliskiren (Direct Renin Inhibitor); because blocking upstream renin elevates all downstream metabolites."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanılgı: Aliskiren direkt renini bloke ettiği için Plazma Renin Aktivitesini (PRA) ve Anjiyotensin I'i düşürür, asla artıramaz; bradikininle de ilgisi yoktur.",
              ar: "مغالطة: يحصر Aliskiren إنزيم الرينين مباشرة فيخفض كلاً من PRA و Ang I؛ ولا صلة له بالبراديكينين مطلقاً.",
              en: "Misconception: Aliskiren directly inhibits renin catalytic activity, suppressing PRA and Ang I; it has zero impact on bradykinin."
            }
          }
        ]
      },
      technicalTerms: [
        {
          "term": "plazma renin aktivitesi",
          "arContext": "فعالية رينين البلازما (plasma renin activity - PRA)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Hangi ilaç sınıfı hem Ang II sentezini düşürüp hem de bradikinin yıkımını durdurarak birikmesini sağlar?",
          ar: "ما الفئة الدوائية الوحيدة التي تخفض تصنيع Ang II وتوقف في الوقت عينه تحلل البراديكينين فتراكمه؟",
          en: "Which drug class simultaneously decreases Ang II synthesis and arrests bradykinin degradation?"
        },
        {
          tier: 2,
          tr: "ARB'ler bradikinini artırmaz; direkt renin inhibitörleri ise Ang I seviyesini yükseltmeyip düşürür.",
          ar: "لا ترفع حاصرات ARB البراديكينين؛ ومثبطات الرينين المباشرة تخفض Ang I ولا ترفعه.",
          en: "ARBs do not elevate bradykinin; direct renin inhibitors decrease Ang I rather than increasing it."
        },
        {
          tier: 3,
          tr: "Yalnızca ADE inhibitörleri (kaptopril, enalapril) Ang I'i artırırken Ang II'yi düşürür ve bradikinini yükseltir.",
          ar: "مثبطات ACE فقط (مثل Captopril) هي التي ترفع Ang I وتخفض Ang II وتراكم البراديكينين.",
          en: "Only ACE inhibitors (e.g. captopril) increase Ang I while suppressing Ang II and accumulating bradykinin."
        }
      ]
    }
  ]
};

const targetPath = path.resolve(__dirname, '../courses/pharmacology/lessons/lesson-09.json');
fs.writeFileSync(targetPath, JSON.stringify(lesson09, null, 2), 'utf8');
console.log('Successfully written lesson-09.json to:', targetPath);
