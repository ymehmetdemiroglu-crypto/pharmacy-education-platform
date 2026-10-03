const fs = require('fs');
const path = require('path');

const lesson11 = {
  id: "pharm-mod6-les1",
  courseId: "pharmacology",
  moduleId: "ph-mod-06",
  title: {
    tr: "GABAerjik Nörotransmisyon ve Pozitif Allosterik Modülatörler",
    ar: "النقل العصبي عبر GABA والمعدلات التفارغية الإيجابية",
    en: "GABAergic Neurotransmission & Positive Allosteric Modulators"
  },
  order: 1,
  access: "free",
  objective: {
    tr: "GABA-A pentamerik klorür kanalında benzodiyazepinler ile barbitüratların allosterik mekanizmalarını (frekans vs süre), klinik güvenlik tavanını ve flumazenil yönetimini ayırt etmek.",
    ar: "التمييز بين الآليات التفارغية للبنزوديازيبينات والباربيتورات على قناة كلوريد GABA-A (التواتر مقابل المدة)، وسقف الأمان السريري، وتدبير الفلومازينيل.",
    en: "Differentiate allosteric mechanisms (frequency vs duration), clinical safety ceilings, and flumazenil intervention between benzodiazepines and barbiturates on GABA-A chloride channels."
  },
  misconceptions: [
    {
      tr: "Benzodiyazepinlerin GABA yokluğunda da klorür kanalını doğrudan açabileceği yanılgısı (BZD'ler saf allosterik modülatördür; endojen GABA yoksa klorür kanalını açamazlar; barbitüratlar ise yüksek dozda GABA olmadan kanalı doğrudan açarak ölümcül apneye yol açar).",
      ar: "الظن الخاطئ بأن البنزوديازيبينات تفتح قناة الكلوريد غيابياً دون الحاجة لـ GABA (البنزوديازيبينات معدلات تفارغية محضة عاجزة عن فتح القناة دون GABA؛ بينما تفتح الباربيتورات القناة مباشرة بتراكيز عالية مسببة توقف التنفس).",
      en: "The misconception that benzodiazepines can open the chloride channel in the total absence of GABA (benzodiazepines are pure allosteric modulators requiring endogenous GABA; barbiturates directly gate the channel at high concentrations, inducing fatal apnea)."
    },
    {
      tr: "Flumazenilin tüm sedatif ve alkol zehirlenmelerinde körlemesine verilebilecek evrensel bir panzehir olduğu yanılgısı (flumazenil yalnızca BZD bağlanma cebini bloke eder, barbitürat veya alkolü geri çevirmez; ayrıca kronik BZD bağımlısında veya trisiklik antidepresan zehirlenmesinde ölümcül status epilepticus nöbetini tetikler).",
      ar: "الاعتقاد الخاطئ بأن فلومازينيل ترياق شامل يعطى عميانياً لجميع حالات التسمم بالمهدئات والكحول (يحصر فلومازينيل جيب BZD فقط ولا يبطل الباربيتورات أو الكحول؛ والجمع بينه وبين TCA أو لدى مدمن BZD يفجر نوبات صرع مميتة).",
      en: "The dangerous practice of empirically administering flumazenil in any coma or overdose (flumazenil only reverses the BZD site, having zero effect on barbiturates or alcohol; in chronic BZD users or TCA co-ingestions, it precipitates refractory, fatal status epilepticus)."
    },
    {
      tr: "Tüm GABA-A reseptörlerinin aynı sedatif ve anksiyolitik etkiyi ürettiği yanılgısı (alfa-1 alt birimi sedasyon, hipnoz ve anterograd amneziyi yönetirken; alfa-2 ve alfa-3 alt birimleri anksiyoliz ve kas gevşemesini yönetir; zolpidem selektif olarak alfa-1'e bağlanır).",
      ar: "الاعتقاد الخاطئ بأن كل مستقبلات GABA-A تحدث نفس التأثير (تتوسط الوحدة ألفا-1 التهدئة والنوم وفقدان الذاكرة؛ بينما تتوسط ألفا-2 وألفا-3 إزالة القلق وإرخاء العضلات؛ ويرتبط زولبيديم نوعياً بـ ألفا-1).",
      en: "The assumption that all GABA-A receptors mediate identical pharmacology (the alpha-1 subunit dictates sedation and anterograde amnesia; alpha-2/alpha-3 dictate anxiolysis; zolpidem selectively targets alpha-1)."
    }
  ],
  sources: [
    {
      file: "Santral Sinir Sistemi.pdf",
      page: 6
    }
  ],
  citations: [
    {
      id: "CIT-KATZUNG-CH22-P375",
      book: "Katzung's Basic & Clinical Pharmacology",
      edition: "15th ed.",
      topic: "Sedative-Hypnotic Drugs: Benzodiazepines, Barbiturates, and Newer Agents",
      chapter: "Chapter 22: Sedative-Hypnotic Drugs",
      page: "pp. 375-395",
      status: "verified"
    },
    {
      id: "CIT-GG-CH19-P339",
      book: "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
      edition: "14th ed.",
      topic: "Hypnotics and Sedatives",
      chapter: "Chapter 19: Hypnotics and Sedatives",
      page: "pp. 339-364",
      status: "verified"
    }
  ],
  spacedReviewCards: [
    {
      cardId: "pharm-mod6-les1-card1",
      courseId: "pharmacology",
      drugOrConcept: "BZD vs Barbitürat İyon Kanal Kinetiği",
      prompt: "Benzodiyazepinler ile barbitüratların GABA-A klorür kanalı üzerindeki temel biyofiziksel etki farkı nedir?",
      answer: "Benzodiyazepinler kanalın açılma FREKANSINI artırır (Frekans = Fren) ve mutlak GABA bağımlıdır; Barbitüratlar ise açık kalma SÜRESİNİ uzatır ve yüksek dozda GABA olmadan kanalı doğrudan açar.",
      box: 1,
      intervalDays: 1
    },
    {
      cardId: "pharm-mod6-les1-card2",
      courseId: "pharmacology",
      drugOrConcept: "Güvenlik Tavanı Paradoksu",
      prompt: "Tek başına benzodiyazepin aşırı dozu neden neredeyse hiçbir zaman ölümcül solunum arrestine yol açmaz?",
      answer: "BZD'ler pozitif allosterik modülatördür; maksimum etkileri vücudun salgıladığı endojen GABA miktarıyla sınırlıdır (güvenlik tavanı). GABA tükenince daha fazla klorür girişi olamaz.",
      box: 1,
      intervalDays: 1
    },
    {
      cardId: "pharm-mod6-les1-card3",
      courseId: "pharmacology",
      drugOrConcept: "Flumazenil ve TCA Zehirlenmesi Tehlikesi",
      prompt: "Trisiklik antidepresan (TCA) ile benzodiyazepin birlikte alan hastaya neden flumazenil verilmesi ölümcüldür?",
      answer: "Flumazenil BZD'nin nöbet koruyucu etkisini aniden kaldırır; TCA'nın prokonvülzan etkisi açığa çıkarak durdurulamayan status epilepticus ve kardiyotoksik aritmiye yol açar.",
      box: 1,
      intervalDays: 1
    },
    {
      cardId: "pharm-mod6-les1-card4",
      courseId: "pharmacology",
      drugOrConcept: "GABA-A Alt Birim Seçiciliği",
      prompt: "GABA-A reseptöründe sedasyon/amneziden hangi alt birim, anksiyolizden hangi alt birim sorumludur?",
      answer: "Alfa-1 alt birimi sedasyon, hipnoz ve amneziyi (Z-ilaçları hedefi); Alfa-2 ve Alfa-3 alt birimleri ise anksiyoliz ve kas gevşemesini yönetir.",
      box: 1,
      intervalDays: 1
    }
  ],
  steps: [
    // Step 1: Hook (predict_reveal, predictThenReveal: true)
    {
      id: "pharm-mod6-les1-step1",
      order: 1,
      stageIndex: 1,
      stage: "hook",
      type: "predict_reveal",
      title: {
        tr: "Güvenlik Tavanı Paradoksu: BZD vs Barbitürat",
        ar: "مفارقة سقف الأمان: البنزوديازيبينات مقابل الباربيتورات",
        en: "The Safety Ceiling Paradox: Benzodiazepines vs Barbiturates"
      },
      predictThenReveal: true,
      prompt: {
        tr: "40 kutu diazepam yutan bir hasta yoğun uykudan sonra sağ salim uyanırken, sadece 10 tablet fenobarbital içen bir hasta neden dakikalar içinde solunum arrestiyle ölür? Benzodiyazepinlerin bu olağanüstü güvenlik tavanı nereden gelir?",
        ar: "مريض ابتلع 40 قرصاً من ديازيبام فاستيقظ حياً بعد نوم عميق، بينما توفي آخر ابتلع 10 أقراص فقط من فينوباربيتال باختناق تنفسي مميت! من أين ينبع سقف الأمان الفائق للبنزوديازيبينات؟",
        en: "A patient ingesting 40 diazepam tablets awakens safely after deep sleep, yet another taking only 10 phenobarbital tablets dies of fatal respiratory arrest. Why do benzodiazepines have an insurmountable safety ceiling while barbiturates kill?"
      },
      conceptCheck: {
        question: {
          tr: "Benzodiyazepinlerin yüksek dozda bile solunum merkezini felç etmemesini sağlayan moleküler mekanizma nedir?",
          ar: "ما الآلية الجزيئية التي تمنع البنزوديازيبينات من شل مركز التنفس حتى عند الجرعات المفرطة؟",
          en: "What molecular mechanism prevents benzodiazepines from paralyzing medullary respiratory pacemakers even in massive overdose?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Benzodiyazepinler saf allosterik modülatördür; klorür kanalını tek başına açamazlar, etkileri endojen GABA miktarıyla kesin bir tavanda sınırlıdır.",
              ar: "البنزوديازيبينات معدلات تفارغية محضة؛ تعجز عن فتح القناة بمفردها، وتأثيرها مقيد بسقف صارم تحدده كمية GABA الذاتية.",
              en: "Benzodiazepines are pure allosteric modulators; unable to open the pore alone, their inhibitory efficacy is strictly capped by endogenous GABA."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Kusursuz nörofarmakolojik teşhis! Benzodiyazepinler klorür kanalını kendileri açamaz; sadece mevcut GABA'nın açma frekansını artırırlar. GABA tükenince kanal kapanır ve beyin solunumu durduracak derinlikte felç olamaz. Barbitüratlar ise doğrudan kanal açtığı için öldürür!",
              ar: "تشخيص دوائي عصبي بارع! لا تفتح البنزوديازيبينات القناة بمفردها، بل تزيد تواتر فتحها بوجود GABA فقط. وعند استهلاك GABA يغلق الباب مانعاً شلل التنفس؛ بينما تفتح الباربيتورات القناة مباشرة وتقتل!",
              en: "Superb neuropharmacological deduction! Benzodiazepines cannot directly gate chloride channels; they only enhance opening frequency when GABA is bound. Once synaptic GABA is cleared, inhibition ceilings out, preserving respiration."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Diazepam molekülleri kanda 100 mg konsantrasyona ulaşınca birbirini kovalent olarak parçalayarak yok eder.",
              ar: "تتفكك جزيئات ديازيبام تساهمياً وتدمر بعضها عند بلوغ تركيز 100 ملغ في الدم.",
              en: "Diazepam molecules covalently cross-react and destroy each other upon reaching 100 mg blood concentrations."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: İlaç molekülleri kanda birbirini kimyasal olarak parçalamaz; güvenlik farkı ilacın klorür kanalındaki allosterik çalışma prensibinden kaynaklanır.",
              ar: "غير صحيح: لا تفكك جزيئات الدواء بعضها في الدم؛ بل يعود الأمان إلى آلية التعديل التفارغي على قناة الكلوريد.",
              en: "Incorrect: Small molecule drugs do not self-destruct; the safety ceiling is governed entirely by receptor allosteric biophysics."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Fenobarbital beyin damarlarında pıhtı oluşturarak kan akımını mekanik olarak durdurur.",
              ar: "يسبب فينوباربيتال خثرات دموية تسد الأوعية الدماغية ميكانيكياً.",
              en: "Phenobarbital induces mechanical microthrombosis in cerebral capillaries, halting brain perfusion."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Barbitürat zehirlenmesi damarsal pıhtılaşma değil; beyin sapı solunum merkezindeki nöronların kontrolsüz GABA-mimetik hiperpolarizasyonudur.",
              ar: "غير صحيح: لا تسبب الباربيتورات خثرات؛ بل التسمم ناجم عن فرط استقطاب كهربائي يثبط مركز التنفس الدماغي مباشرة.",
              en: "Incorrect: Barbiturate lethality stems from direct GABA-mimetic hyperpolarization of medullary respiratory centers, not vascular thrombosis."
            }
          }
        ]
      },
      technicalTerms: [
        {
          "term": "pozitif allosterik modülatör",
          "arContext": "معدل تفارغي إيجابي (positive allosteric modulator - PAM)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Biri kapıyı çalmak için ev sahibine (GABA) muhtaçtır; diğeri ise ev sahibini beklemeden kapıyı kırıp içeri girer.",
          ar: "أحدهما يحتاج لصاحب البيت (GABA) ليفتح الباب؛ والآخر يكسر الباب ويقتحم دون انتظار أحد.",
          en: "One drug obligatorily requires the physiological host (GABA); the other can crowbar the door open without any host."
        },
        {
          tier: 2,
          tr: "Benzodiyazepinler tek başlarına kanalı açamazlar; sadece GABA'nın yaptığı açılmayı kolaylaştırırlar.",
          ar: "تعجز البنزوديازيبينات عن فتح القناة بمفردها؛ بل تسهل الفتح الذي يحدثه GABA فقط.",
          en: "Benzodiazepines cannot gate the channel alone; they purely augment opening in response to GABA."
        },
        {
          tier: 3,
          tr: "Barbitüratlar ise yüksek dozda doğrudan kanal açıcıdır (GABA-mimetik); bu da kontrolsüz solunum arresti yapar.",
          ar: "أما الباربيتورات فتفتح القناة مباشرة عند التراكيز المرتفعة مسببة توقفاً تاماً لمركز التنفس.",
          en: "Barbiturates directly gate chloride channels at high doses without GABA, triggering fatal respiratory arrest."
        }
      ]
    },

    // Step 2: Question (question)
    {
      id: "pharm-mod6-les1-step2",
      order: 2,
      stageIndex: 2,
      stage: "question",
      type: "question",
      title: {
        tr: "Moleküler Soru: Tek Başına Kanal Açmak Mümkün mü?",
        ar: "سؤال جزيئي: هل يمكن فتح القناة الأيونية منفرداً؟",
        en: "Molecular Question: Can a Modulator Gate the Pore Alone?"
      },
      prompt: {
        tr: "GABA-A reseptörüne bağlanan bir ilaç, endojen GABA ortamda hiç yokken klorür kanalını tek başına açabilir mi? Benzodiyazepinler ile barbitüratlar bu kurala nasıl farklı yanıt verir?",
        ar: "هل يستطيع دواء يرتبط بمستقبل GABA-A فتح قناة الكلوريد بمفرده دون وجود GABA الداخلي؟ وكيف تختلف إجابة البنزوديازيبينات عن الباربيتورات إزاء هذه القاعدة الجزيئية؟",
        en: "Can a ligand at the GABA-A receptor open the chloride pore in the total absence of endogenous GABA? How do benzodiazepines and barbiturates fundamentally diverge under this rule?"
      },
      conceptCheck: {
        question: {
          tr: "GABA molekülü tamamen temizlenmiş saf bir nöron kültüründe klorür akımı ölçüldüğünde diazepam ve tiyopental nasıl yanıt üretir?",
          ar: "عند قياس تدفق الكلوريد في مزرعة عصبية نقية خالية تماماً من GABA، كيف يستجيب كل من ديازيبام وثيوبنتال؟",
          en: "In a neuronal culture completely devoid of GABA, what chloride flux is observed upon adding diazepam versus thiopental?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Diazepam sıfır klorür akımı üretir (etkisizdir); yüksek doz tiyopental ise GABA olmadan devasa klorür akımı başlatır.",
              ar: "يولد ديازيبام تدفق كلوريد معدوماً (لا تأثير له)؛ بينما يطلق ثيوبنتال بجرعات عالية تدفق كلوريد ضخماً دون GABA.",
              en: "Diazepam produces zero chloride conductance; high-dose thiopental triggers robust chloride influx even without GABA."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Tam isabet! Benzodiyazepinler GABA yokken kanalı açamaz ($Cl^-$ akımı = 0). Barbitüratlar ise doğrudan kanal kapısını aralayabilen bağımsız bir allosterik mekanizmaya sahiptir.",
              ar: "إصابة دقيقة! لا يمكن للبنزوديازيبينات فتح القناة غيابياً (التدفق = 0)؛ بينما تملك الباربيتورات قدرة مباشرة على فتح البوابة دون حاجة لـ GABA.",
              en: "Spot on! Benzodiazepines have zero intrinsic channel-gating efficacy without GABA ($Cl^-$ current = 0). Barbiturates possess direct gating activity at higher doses."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Diazepam klorür yerine sodyum akımı başlatarak nöronu aşırı uyarır.",
              ar: "يطلق ديازيبام تدفق صوديوم بدلاً من الكلوريد فيستثير العصبون بشدة.",
              en: "Diazepam gates sodium instead of chloride, provoking severe neuronal hyperexcitability."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanılgı: GABA-A bir anyon (klorür) kanalıdır; sodyum geçirmez ve diazepam uyarıcı değil inhibitör bir modülatördür.",
              ar: "مغالطة: مستقبل GABA-A قناة أنيونية للكلوريد ولا يمرر الصوديوم؛ وديازيبام مهدئ وليس محرضاً.",
              en: "Misconception: GABA-A is an anion-selective chloride pore; it excludes sodium, and diazepam is strictly inhibitory."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Tiyopental klorür kanalını kalıcı olarak tıkayarak nöronu patlatır.",
              ar: "يسد ثيوبنتال قناة الكلوريد نهائياً مما يؤدي لانفجار الخلية العصبية.",
              en: "Thiopental permanently blocks the chloride channel, causing osmotic lysis of the neuron."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanılgı: Barbitüratlar klorür kanalını tıkamaz; tam tersine kanalı açık tutarak klorür girişini kontrolsüz artırır.",
              ar: "مغالطة: لا تسد الباربيتورات القناة بل تفتحها وتطيل زمن بقائها مفتوحة لتدفق الكلوريد.",
              en: "Misconception: Barbiturates do not occlude the pore; they hold it open, driving massive hyperpolarizing chloride influx."
            }
          }
        ]
      },
      technicalTerms: [
        {
          "term": "GABA-mimetik etki",
          "arContext": "تأثير مشابه لـ GABA (GABA-mimetic action)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Biri GABA'ya muhtaçtır (pozitif modülatör); diğeri yüksek dozda GABA'nın kendisi gibi davranır (GABA-mimetik).",
          ar: "أحدهما عاجز دون GABA؛ والآخر يتصرف كبديل مباشر عنه عند الجرعات العالية.",
          en: "One drug requires GABA to function; the other mimics GABA directly at elevated doses."
        },
        {
          tier: 2,
          tr: "GABA yokken diazepam eklerseniz klorür ölçüm cihazında hiçbir ibre kımıldamaz.",
          ar: "غياب GABA يجعل جهاز قياس تيار الكلوريد ساكناً تماماً عند إضافة ديازيبام.",
          en: "In the absence of GABA, adding diazepam produces zero detectable chloride current."
        },
        {
          tier: 3,
          tr: "Barbitürat (tiyopental, fenobarbital) ise GABA olmasa bile kanalı doğrudan açabilir.",
          ar: "بينما تستطيع الباربيتورات (ثيوبنتال، فينوباربيتال) فتح القناة مباشرة دون أي حاجة لـ GABA.",
          en: "Barbiturates (thiopental, phenobarbital) directly gate the pore even in complete absence of GABA."
        }
      ]
    },

    // Step 3: Intuition (intuition)
    {
      id: "pharm-mod6-les1-step3",
      order: 3,
      stageIndex: 3,
      stage: "intuition",
      type: "intuition",
      title: {
        tr: "Banka Kasası ve Menteşe Yağlama Analojisi",
        ar: "تشبيه خزنة البنك وتزييت المفاصل",
        en: "The Bank Vault & Hinged Gate Analogy"
      },
      prompt: {
        tr: "Klorür kanalını güvenlik kapısı düşünün: GABA anahtardır. Benzodiyazepinler kapının menteşelerini yağlar; anahtar her çevrildiğinde kapı daha sık açılır. Barbitüratlar ise yüksek dozda kapıyı menteşesinden kırıp sonuna kadar açık bırakır!",
        ar: "تخيل قناة الكلوريد كباب أمان: GABA هو المفتاح. تزيت البنزوديازيبينات المفاصل فيفتح الباب بتواتر أسرع مع المفتاح؛ بينما تكسر الباربيتورات القفل عند الجرعات العالية وتتركه مفتوحاً دون مفتاح!",
        en: "Picture the chloride channel as a bank vault: GABA is the key. Benzodiazepines oil the hinges so the key opens it more frequently. High-dose barbiturates crowbar the door open indefinitely without any key!"
      },
      technicalTerms: [
        {
          "term": "açılma frekansı",
          "arContext": "تواتر فتح القناة (channel opening frequency)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Anahtar (GABA) olmadan yağlanmış menteşe tek başına kapıyı açabilir mi? Asla.",
          ar: "هل يمكن للمفصل المزيت أن يفتح الباب من تلقاء نفسه دون إدارة المفتاح؟ مستحيل.",
          en: "Can oiled hinges swing the vault door open without someone turning the key? Never."
        },
        {
          tier: 2,
          tr: "Kapıyı levye ile kıran barbitürat ise anahtara ihtiyaç duymaz; içeri sel gibi klorür akar.",
          ar: "أما من يخلع الباب (الباربيتورات) فلا يحتاج مفتاحاً؛ فيتدفق الكلوريد كالسيل.",
          en: "A crowbar (barbiturate) ignores the key entirely, letting a flood of chloride rush in."
        },
        {
          tier: 3,
          tr: "Bu yüzden benzodiyazepin güvenlidir: GABA yoksa kapı kapalı kalır!",
          ar: "لهذا السبب تعد البنزوديازيبينات آمنة: ففي غياب GABA يظل الباب موصداً!",
          en: "This is why benzodiazepines are safe: without GABA, the vault remains securely locked!"
        }
      ]
    },

    // Step 4: Visual Explanation (visual_explanation)
    {
      id: "pharm-mod6-les1-step4",
      order: 4,
      stageIndex: 4,
      stage: "visual_explanation",
      type: "visual_explanation",
      title: {
        tr: "GABA-A Pentamerik Klorür Kanalı Mimarisi",
        ar: "بنية قناة كلوريد GABA-A خماسية الوحدات",
        en: "GABA-A Pentameric Chloride Channel Architecture"
      },
      prompt: {
        tr: "GABA-A reseptörü beş alt birimli ($2\alpha 2\beta 1\gamma$) klorür kanalıdır. GABA $\alpha/\beta$ arayüzüne, benzodiyazepinler $\alpha/\gamma$ arayüzüne bağlanır. Kanal açıldığında içeri Cl- akar; membran potansiyeli $-70\text{ mV}$'tan $-85\text{ mV}$'a inerek nöronu susturur.",
        ar: "مستقبل GABA-A قناة كلوريد خماسية الوحدات ($2\alpha 2\beta 1\gamma$). يرتبط GABA بين $\alpha/\beta$ وترتبط البنزوديازيبينات بين $\alpha/\gamma$. يتدفق Cl- للداخل؛ فيهبط الجهد من $-70$ إلى $-85\text{ mV}$ مفرط الاستقطاب ومخمداً العصبون.",
        en: "GABA-A is a pentameric ($2\alpha 2\beta 1\gamma$) chloride channel. GABA binds the $\alpha/\beta$ interface; benzodiazepines bind the $\alpha/\gamma$ interface. Influxing Cl- drops membrane potential from $-70$ to $-85\text{ mV}$, hyperpolarizing and silencing the neuron."
      },
      technicalTerms: [
        {
          "term": "GABA-A reseptörü",
          "arContext": "مستقبل GABA-A (GABA-A receptor)"
        },
        {
          "term": "hiperpolarizasyon",
          "arContext": "فرط الاستقطاب (hyperpolarization)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Reseptör beş alt birimden oluşan bir silindir gibidir; merkezinde klorür deliği bulunur.",
          ar: "المستقبل أسطوانة من 5 وحدات فرعية يتوسطها ممر لعبور شوارد الكلوريد السالبة.",
          en: "The receptor is a cylindrical pentamer surrounding a central selective chloride pore."
        },
        {
          tier: 2,
          tr: "GABA ile benzodiyazepin aynı yere mi bağlanır? Hayır, GABA $\alpha/\beta$, BZD ise $\alpha/\gamma$ arayüzüne bağlanır.",
          ar: "هل يرتبط GABA والبنزوديازيبين في نفس المكان؟ كلا، يرتبط GABA بين $\alpha/\beta$، و BZD بين $\alpha/\gamma$.",
          en: "Do GABA and benzodiazepines share the same pocket? No, GABA binds $\alpha/\beta$, while BZD binds $\alpha/\gamma$."
        },
        {
          tier: 3,
          tr: "Negatif klorür iyonları (Cl-) içeri aktıkça nöronun içi daha negatif olur (hiperpolarizasyon) ve uyarılması imkansızlaşır.",
          ar: "دخول شوارد Cl- السالبة يجعل داخل الخلية أكثر سلبية (فرط استقطاب)، مما يعطل انطلاق الشارات العصبية.",
          en: "Influx of negative chloride anions makes the cytoplasm more negative (hyperpolarized), extinguishing action potentials."
        }
      ]
    },

    // Step 5: Interactive Artifact (interactive_artifact)
    {
      id: "pharm-mod6-les1-step5",
      order: 5,
      stageIndex: 5,
      stage: "interactive_artifact",
      type: "interactive_artifact",
      title: {
        tr: "Doz-Yanıt Simülatörü: Allosterik Sola Kayma ve Flumazenil",
        ar: "محاكي الجرعة والاستجابة: الإزاحة التفارغية لليسار وفلومازينيل",
        en: "Dose-Response Modulator: Allosteric Left-Shift & Flumazenil"
      },
      prompt: {
        tr: "Simülatörde GABA konsantrasyon-yanıt eğrisini izleyin. Pozitif allosterik modülatör diazepam ekleyerek eğrinin sola kaymasını (EC50 düşüşünü), nötral antagonist flumazenil ile bazale dönüşü test edin.",
        ar: "راقب منحنى تركيز GABA واستجابته في المحاكي. أضف ديازيبام لتشهد إزاحة المنحنى لليسار (هبوط EC50)، ثم أضف فلومازينيل ليعيد المنحنى إلى خط الأساس الطبيعي.",
        en: "Observe the GABA concentration-response curve in the simulator. Add positive allosteric modulator diazepam to witness the leftward shift (lowered EC50), then add neutral antagonist flumazenil to restore baseline."
      },
      predictThenReveal: false,
      widgetType: "DoseResponseCurve",
      widget: {
        type: "DoseResponseCurve",
        config: {
          title: "GABA-A Konsantrasyon-Yanıt ve Allosterik Modülasyon",
          prompt: "GABA konsantrasyonunu artırın; diazepam ekleyerek sola kaymayı ve flumazenil ile nötrleşmeyi izleyin.",
          defaultEc50: 10.0,
          defaultEmax: 100,
          defaultHillSlope: 1.0,
          modes: [
            "agonist",
            "competitive_antagonist",
            "partial_agonist"
          ],
          source: {
            file: "Santral Sinir Sistemi.pdf",
            page: 6
          },
          explanation: "Diazepam pozitif allosterik modülatör (PAM) olarak GABA'nın afinitesini artırır ve eğriyi sola kaydırır (EC50 10 uM'den 1 uM'ye düşer). Flumazenil ise BZD bölgesinde yarışmalı nötral antagonist olarak etkiyi sıfırlar."
        }
      },
      config: {
        title: "GABA-A Konsantrasyon-Yanıt ve Allosterik Modülasyon",
        prompt: "GABA konsantrasyonunu artırın; diazepam ekleyerek sola kaymayı ve flumazenil ile nötrleşmeyi izleyin.",
        defaultEc50: 10.0,
        defaultEmax: 100,
        defaultHillSlope: 1.0,
        modes: [
          "agonist",
          "competitive_antagonist",
          "partial_agonist"
        ],
        source: {
          file: "Santral Sinir Sistemi.pdf",
          page: 6
        },
        explanation: "Diazepam pozitif allosterik modülatör (PAM) olarak GABA'nın afinitesini artırır ve eğriyi sola kaydırır (EC50 10 uM'den 1 uM'ye düşer). Flumazenil ise BZD bölgesinde yarışmalı nötral antagonist olarak etkiyi sıfırlar."
      },
      technicalTerms: [
        {
          "term": "allosterik sola kayma",
          "arContext": "إزاحة تفارغية لليسار (allosteric left-shift)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Pozitif allosterik modülatör birincil agonist olan GABA'nın gücünü (potensini) artırır.",
          ar: "يزيد المعدل التفارغي الإيجابي من فاعلية المشبه الأساسي (GABA).",
          en: "A positive allosteric modulator amplifies the potency of primary agonist GABA."
        },
        {
          tier: 2,
          tr: "Diazepam eklendiğinde aynı etkiyi elde etmek için 10 kat daha az GABA gerekir (EC50 küçülür, sola kayar).",
          ar: "عند إضافة ديازيبام، نحتاج لكمية أقل بعشر مرات من GABA لتحقيق نفس التأثير (تنخفض EC50 وينزاح المنحنى يساراً).",
          en: "Adding diazepam requires 10-fold lower GABA concentrations to achieve the same inhibition (EC50 drops)."
        },
        {
          tier: 3,
          tr: "Flumazenil tek başına etki üretmez; sadece diazepamın bağlandığı cebi kapatıp eğriyi eski yerine döndürür.",
          ar: "لا ينتج فلومازينيل أي تأثير بمفرده؛ بل يسد الجيب الذي يشغله ديازيبام ليعيد المنحنى لمكانه الأصلي.",
          en: "Flumazenil produces zero intrinsic effect; it purely occupies the BZD pocket, restoring baseline GABA kinetics."
        }
      ]
    },

    // Step 6: Guided Discovery (guided_discovery)
    {
      id: "pharm-mod6-les1-step6",
      order: 6,
      stageIndex: 6,
      stage: "guided_discovery",
      type: "guided_discovery",
      title: {
        tr: "Emax Tavanı ve Biyolojik Kısıtlama",
        ar: "سقف Emax والتقييد الحيوي الطبيعي",
        en: "The Emax Ceiling & Physiological Constraint"
      },
      prompt: {
        tr: "Diazepam GABA eğrisini sola kaydırır ($EC_{50}$ azalır), ancak maksimum etkiyi ($E_{\max}$) artıramaz. Nöronun inhibisyonu vücudun ürettiği GABA miktarıyla sınırlıdır. İşte aşırı dozda solunum arrestini önleyen biyolojik fren budur!",
        ar: "يزيح ديازيبام منحنى GABA لليسار (تنخفض EC50)، لكنه يعجز عن زيادة الاستجابة القصوى $E_{\max}$. يقتصر التثبيط على كمية GABA الطبيعية المفرزة؛ وهذا هو الكابح الحيوي المانع للوفاة!",
        en: "Diazepam shifts the GABA curve leftward (decreasing EC50), but never exceeds baseline Emax. Neuronal inhibition is strictly capped by physiological GABA release—the exact biological brake that prevents fatal overdose apnea!"
      },
      technicalTerms: [
        {
          "term": "maksimum etkinlik",
          "arContext": "الفعالية القصوى (maximal efficacy - Emax)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Simülatörde diazepam dozunu 100 katına çıkarsanız bile Emax çizgisi %100'ün üzerine çıkabilir mi? Hayır.",
          ar: "حتى لو ضاعفت جرعة ديازيبام 100 مرة في المحاكي، هل يرتفع خط Emax فوق 100%؟ كلا.",
          en: "Even if you multiply diazepam dosage 100-fold, can Emax exceed the 100% ceiling? Never."
        },
        {
          tier: 2,
          tr: "Çünkü kanalın açılması için ortamda GABA bulunması şarttır; sinaptik GABA tükenince klorür girişi durur.",
          ar: "لأن فتح القناة مشروط بوجود GABA؛ وبمجرد نضوب GABA المشبكي يتوقف دخول الكلوريد فوراً.",
          en: "Channel opening strictly requires GABA; once synaptic GABA is exhausted, chloride conductance ceases."
        },
        {
          tier: 3,
          tr: "Barbitüratlar ise GABA olmadan da kanalı açtığı için bu tavanı deler ve Emax sınırını yıkarak öldürür.",
          ar: "أما الباربيتورات فتخترق هذا السقف بفتح القناة مباشرة دون GABA، مما يؤدي للوفاة.",
          en: "Barbiturates bypass this ceiling by directly gating the channel without GABA, triggering fatal medullary arrest."
        }
      ]
    },

    // Step 7: Formal Explanation (formal_explanation)
    {
      id: "pharm-mod6-les1-step7",
      order: 7,
      stageIndex: 7,
      stage: "formal_explanation",
      type: "formal_explanation",
      title: {
        tr: "Frekans vs Süre: Moleküler Kinetik Ayrımı",
        ar: "التواتر مقابل المدة: التمايز الحركي الجزيئي",
        en: "Frequency vs Duration: Molecular Gating Kinetics"
      },
      prompt: {
        tr: "Benzodiyazepinler kanal açılma frekansını (Frekans = Fren) artırır; mutlak GABA bağımlıdır. Barbitüratlar ise açık kalma süresini uzatır ve yüksek konsantrasyonda GABA-mimetik olarak kanalı doğrudan açıp solunum merkezini felç eder.",
        ar: "تزيد البنزوديازيبينات تواتر فتح القناة (تواتر = فرملة) باعتماد مطلق على GABA. بينما تطيل الباربيتورات مدة الانفتاح، وتفتح القناة مباشرة عند التراكيز العالية مشلة مركز التنفس الدماغي.",
        en: "Benzodiazepines increase channel opening FREQUENCY in an obligate GABA-dependent manner. Barbiturates prolong opening DURATION and, at higher doses, directly gate the pore without GABA, fatally depressing medullary respiratory pacemakers."
      },
      technicalTerms: [
        {
          "term": "kanal açık kalma süresi",
          "arContext": "مدة انفتاح القناة (open duration)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Bunu akılda tutmak için şu formülü kullanın: 'Benzodiyazepin = Frekans (Fren), Barbitürat = Süre (Sürünme)'.",
          ar: "احفظ القاعدة الذهبية: 'البنزوديازيبين يزيد التواتر (فرملة آمنة)، والباربيتورات تزيد المدة (شلل مديد)'.",
          en: "Remember the clinical mnemonic: 'Benzodiazepines increase Frequency; Barbiturates increase Duration'."
        },
        {
          tier: 2,
          tr: "Frekans artışı fizyolojik ritmi korur; kanal defalarca açılıp kapanır ama açık kalma süresi uzamaz.",
          ar: "زيادة التواتر تحافظ على النبض الحيوي؛ فالقناة تفتح وتغلق مراراً دون بقائها مفتوحة زمناً طويلاً.",
          en: "Increasing frequency preserves pulsatile signaling; the pore opens more often, but closes rapidly."
        },
        {
          tier: 3,
          tr: "Süre uzaması ve doğrudan açılma ise nöronu sürekli klorürle boğarak solunum hücrelerini söndürür.",
          ar: "أما إطالة زمن الانفتاح والفتح المباشر فيغمر العصبون بالكلوريد باستمرار مخمداً مراكز التنفس.",
          en: "Prolonging open duration and direct pore gating swamps neurons with chloride, extinguishing breathing."
        }
      ]
    },

    // Step 8: Concept Check (concept_check)
    {
      id: "pharm-mod6-les1-step8",
      order: 8,
      stageIndex: 8,
      stage: "concept_check",
      type: "concept_check",
      title: {
        tr: "Kritik Klinik Tuzak: TCA Zehirlenmesi ve Flumazenil",
        ar: "فخ سريري حرج: التسمم بـ TCA والفلومازينيل",
        en: "Critical Clinical Trap: TCA Co-Ingestion & Flumazenil"
      },
      prompt: {
        tr: "Flumazenil uygulamasının tehlikeli bir kontrendikasyon yarattığı klinik senaryoyu analiz edin: Trisiklik antidepresan (TCA) ile birlikte benzodiyazepin aşırı dozu alan hastada ne gelişir?",
        ar: "حلل السيناريو السريري الذي يجعل إعطاء فلومازينيل خطراً جسيماً: ماذا يحدث لمريض تناول جرعة مفرطة مشتركة من مضادات الاكتئاب ثلاثية الحلقات (TCA) والبنزوديازيبينات؟",
        en: "Analyze the clinical emergency where administering flumazenil is hazardous: What catastrophe unfolds when a patient with a co-ingestion of tricyclic antidepressants (TCAs) and benzodiazepines receives flumazenil?"
      },
      conceptCheck: {
        question: {
          tr: "Trisiklik antidepresan (amitriptilin) ve benzodiyazepin aşırı dozu alan komadaki bir hastaya acilen flumazenil enjekte edildiğinde gelişen ölümcül komplikasyon nedir?",
          ar: "مريض غائب عن الوعي بتسمم مشترك من أميتريبتيلين (TCA) وبنزوديازيبين: ما الاختلاط القاتل الذي يطرأ فور حقنه بفلومازينيل؟",
          en: "A comatose patient with a combined overdose of amitriptyline (TCA) and benzodiazepine receives IV flumazenil. What fatal complication is precipitated?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "BZD'nin nöbet önleyici koruyucu kalkanı aniden kalkar; TCA'nın kardiak sodyum blokajı ve prokonvülzan etkisi durdurulamaz status epilepticus nöbetlerini ve aritmileri tetikler.",
              ar: "يزول الدرع الواقي للبنزوديازيبين ضد النوبات فوراً؛ فيطلق TCA العنان لنوبات صرع صاعقة مستمرة ولا نظميات قلبية قاتلة.",
              en: "The anticonvulsant shield of the BZD is abruptly stripped away, unmasking unopposed TCA proconvulsant toxicity into intractable status epilepticus and fatal arrhythmias."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Hayati bir acil tıp ve farmakoloji kuralı! TCA aşırı dozunda nöbet eşiği son derece düşüktür. Hastanın nöbet geçirmesini engelleyen tek şey ortamdaki benzodiyazepindir. Flumazenil verip bu korumayı tek saniyede silerseniz, hasta durdurulamaz status epilepticus nöbetine girer ve kardiyotoksisiteden kaybedilir!",
              ar: "قاعدة إسعافية ودوائية منقذة للحياة! في تسمم TCA تهبط عتبة النوبات بشدة. والشيء الوحيد الذي كان يحمي دماغ المريض هو مفعول البنزوديازيبين. إعطاء فلومازينيل يجرد الدماغ من هذا الدرع فيدخل المريض بصرع مستمر وموت فوري!",
              en: "Life-saving emergency toxicology rule! In TCA poisoning, seizure thresholds are dangerously depressed. The co-ingested BZD was the sole factor preventing seizures. Stripping this protection with flumazenil instantly unleashes refractory status epilepticus and fatal cardiotoxicity!"
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Flumazenil amitriptilin ile kanda birleşerek böbrek yetmezliği yapan beyaz taş kristallerine dönüşür.",
              ar: "يتفاعل فلومازينيل مع أميتريبتيلين في الدم مكوناً بلورات حجرية بيضاء تؤدي لفشل كلوي.",
              en: "Flumazenil reacts with amitriptyline in circulation, forming insoluble white crystals that induce acute renal failure."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanılgı: İlaçlar kanda birbiriyle taş kristalleri oluşturmaz; tehlike kimyasal çökelti değil, nöronal kalkanın kalkmasıyla nöbet fırtınasının patlamasıdır.",
              ar: "مغالطة: لا تتفاعل الأدوية كيميائياً لتكوين حصى بالدم؛ بل الخطر زوال الكبح العصبي وانفجار العاصفة الصرعية.",
              en: "Misconception: The drugs do not form physical precipitates in blood; the catastrophe is purely pharmacodynamic unmasking of proconvulsant toxicity."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Flumazenil hastanın akciğerlerinde yüzey aktif maddeyi (sürfaktan) parçalayarak akut pnömotoraks yapar.",
              ar: "يحلل فلومازينيل مادة السورفاكتانت في الرئتين مسبباً استرواح الصدر الحاد.",
              en: "Flumazenil enzymatically digests pulmonary surfactant, triggering immediate acute pneumothorax."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanılgı: Flumazenil sürfaktanı sindiren bir proteaz değildir; o sadece GABA-A üzerindeki benzodiyazepin bağlanma cebinin nötral antagonistidir.",
              ar: "مغالطة: ليس فلومازينيل إنزيماً محللاً؛ بل هو مجرد حاصر تنافسي متعادل لموقع BZD على مستقبل GABA-A.",
              en: "Misconception: Flumazenil has no enzymatic or surfactant-cleaving activity; it is a competitive neutral antagonist at the BZD allosteric site."
            }
          }
        ]
      },
      technicalTerms: [
        {
          "term": "status epilepticus",
          "arContext": "الحالة الصرعية المستمرة (status epilepticus)"
        },
        {
          "term": "nötral antagonist",
          "arContext": "مناهض متعادل (neutral antagonist)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Trisiklik antidepresanlar (TCA) yüksek dozda beyinde neyi tetikler? Şiddetli konvülsiyonları (nöbetleri).",
          ar: "ما الذي تحدثه مضادات الاكتئاب ثلاثية الحلقات بتراكيزها العالية في الدماغ؟ نوبات اختلاجية عنيفة.",
          en: "What acute cerebral toxicity do tricyclic antidepressants induce at toxic doses? Severe seizures."
        },
        {
          tier: 2,
          tr: "Birlikte alınan benzodiyazepin bu nöbetleri baskılayan koruyucu bir fren görevi görüyordu.",
          ar: "كان البنزوديازيبين المتناول يعمل كفرملة واقية تخمد تلك النوبات وتمنع انفجارها.",
          en: "The co-ingested benzodiazepine was acting as a protective brake suppressing those seizures."
        },
        {
          tier: 3,
          tr: "Flumazenil freni aniden kırınca hastanın beyni durdurulamayan ölümcül nöbet fırtınasına girer.",
          ar: "عندما يرفع فلومازينيل هذا الكابح فجأة، يغرق الدماغ في عاصفة صرعية لا يمكن إيقافها.",
          en: "Flumazenil violently removes this brake, unleashing refractory, fatal status epilepticus."
        }
      ]
    },

    // Step 9: Application (application)
    {
      id: "pharm-mod6-les1-step9",
      order: 9,
      stageIndex: 9,
      stage: "application",
      type: "application",
      title: {
        tr: "Akut Bağımlılık Krizi: Yoksunluk Nöbeti",
        ar: "أزمة الإدمان الحادة: نوبة السحب الصرعية",
        en: "Acute Dependency Crisis: Withdrawal Seizures"
      },
      prompt: {
        tr: "Kronik lorazepam bağımlısı bir panik atak hastasına ameliyathane sedasyonu sonrası flumazenil yapıldığında hasta aniden status epilepticus nöbetine girer. Bu akut krizin moleküler farmakolojik sebebi nedir?",
        ar: "مريض نوبات هلع يعتمد مزمناً على لورازيبام حُقن بفلومازينيل بعد التخدير، فأصيب بنوبات صرع مستمرة وحادة. ما السبب الدوائي الجزيئي لهذه النوبة الصاعقة؟",
        en: "A patient chronically dependent on lorazepam receives flumazenil to reverse procedural sedation and abruptly plunges into status epilepticus. What molecular pharmacodynamic mechanism precipitates this refractory seizure storm?"
      },
      conceptCheck: {
        question: {
          tr: "Kronik benzodiyazepin kullanan hastada flumazenil enjeksiyonunun tetiklediği akut yoksunluk nöbetinin moleküler mekanizması nedir?",
          ar: "ما الآلية الجزيئية لنوبة السحب الصرعية الحادة الناتجة عن إعطاء فلومازينيل لمريض يتناول البنزوديازيبين مزمناً؟",
          en: "What molecular mechanism underlies the acute withdrawal seizures precipitated by flumazenil in chronic benzodiazepine users?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Kronik maruziyette GABA-A reseptörleri aşağı regüle olmuş ve duyarsızlaşmıştır; flumazenil egzojen desteği aniden kesince endojen GABA yetersiz kalır ve masif nöronal eksitasyon patlar.",
              ar: "في الاستعمال المزمن تهبط مستقبلات GABA-A وتفقد حساسيتها؛ وبنزع الدعم فجأة بـ فلومازينيل يعجز GABA الطبيعي وتتفجر استثارة صرعية صاعقة.",
              en: "Chronic exposure downregulates and uncouples GABA-A receptors; abruptly displacing BZDs with flumazenil leaves subnormal basal GABAergic tone, precipitating massive glutamate-driven seizure activity."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Mükemmel farmakolojik kavrayış! Beyin aylarca lorazepam aldığında, aşırı inhibisyona karşı homeostatik olarak GABA-A reseptör sayısını azaltır (down-regülasyon) ve glutamat NMDA reseptörlerini artırır. Flumazenil lorazepamı reseptörden fırlatınca beyin tam anlamıyla elektriksel fırtınaya tutulur!",
              ar: "فهم دوائي متقن! عند تعاطي لورازيبام لأشهر يخفض الدماغ مستقبلات GABA-A تكيفياً ويزيد مستقبلات الغلوتامات NMDA الاستثارية. طرد الدواء بفلومازينيل يفجر عاصفة كهربائية صرعية فورية!",
              en: "Superb clinical pharmacodynamics! Chronic BZD presence triggers homeostatic downregulation of GABA-A receptors and upregulation of excitatory NMDA pathways. Displacing lorazepam with flumazenil leaves the brain without inhibitory tone, unleashing an immediate seizure storm!"
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Flumazenil beyindeki tüm klorür iyonlarını idrara atarak hücreleri susuz bırakır.",
              ar: "يطرد فلومازينيل جميع شوارد الكلوريد الدماغية في البول مسبباً جفاف الخلايا.",
              en: "Flumazenil forces all cerebral chloride ions into urine, dehydrating cortical neurons."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanılgı: Flumazenil diüretik değildir; sistemik elektrolit atılımı yapmaz, etkisi santral allosterik reseptör sahasıyla sınırlıdır.",
              ar: "مغالطة: ليس فلومازينيل مدراً للبول ولا يطرد الكلوريد كلوياً؛ بل ينحصر أثره في حصر الموقع التفارغي الدماغي.",
              en: "Misconception: Flumazenil is not a diuretic; it has no renal actions and acts exclusively at the central allosteric binding pocket."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Lorazepam flumazenil varlığında doğrudan zehirli strychnine alkaloidine dönüşür.",
              ar: "يتحول لورازيبام بوجود فلومازينيل كيميائياً إلى سم الستريكنين القاتل.",
              en: "Lorazepam is chemically converted into the toxic plant poison strychnine in the presence of flumazenil."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanılgı: Bir sentetik benzodiyazepin bitkisel bir alkaloide (striknin) dönüşemez; nöbet mekanizması reseptör adaptasyonu ve akut yoksunluktur.",
              ar: "مغالطة: لا يتحول الدواء إلى مادة سمية نباتية؛ فالنوبات ناتجة عن التكيف الخلوي والانسحاب الحاد.",
              en: "Misconception: Benzodiazepines cannot transmute into unrelated plant alkaloids; the pathology is acute receptor uncoupling and severe withdrawal."
            }
          }
        ]
      },
      technicalTerms: [
        {
          "term": "aşağı regülasyon",
          "arContext": "إنقاص التنظيم / تثبيط التعبير (downregulation)"
        },
        {
          "term": "yoksunluk nöbeti",
          "arContext": "نوبة السحب الصرعية (withdrawal seizure)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Beyin aylarca yüksek doz yatıştırıcı aldığında aşırı frenlemeyi dengelemek için ne yapar? Kendi frenlerini azaltır.",
          ar: "عندما يخضع الدماغ لمهدئ قوي لأشهر طويلة، ماذا يفعل لإعادة التوازن؟ يقلل من عدد مكابحه الذاتية.",
          en: "When the brain adapts to chronic sedation over months, how does it maintain homeostasis? It reduces its own brakes."
        },
        {
          tier: 2,
          tr: "GABA reseptörleri azalır, uyarıcı glutamat reseptörleri çoğalır (tolerans ve bağımlılık).",
          ar: "تنخفض مستقبلات GABA، وتتكاثر مستقبلات الغلوتامات الاستثارية (التحمل والاعتماد).",
          en: "GABA-A receptors downregulate, while excitatory glutamatergic pathways surge."
        },
        {
          tier: 3,
          tr: "Flumazenil lorazepamı tek saniyede söküp atınca, zayıflamış frenler motoru durduramaz ve nöbet patlar.",
          ar: "عند نزع الدواء فجأة بفلومازينيل، تعجز المكابح الضعيفة عن كبح الدماغ فتنفجر النوبات الصرعية.",
          en: "Flumazenil strips away the exogenous brake instantly; the desensitized system cannot halt seizure activity."
        }
      ]
    },

    // Step 10: Retrieval (retrieval)
    {
      id: "pharm-mod6-les1-step10",
      order: 10,
      stageIndex: 10,
      stage: "retrieval",
      type: "retrieval",
      title: {
        tr: "Bellek Güçlendirme: Alfa-1 vs Alfa-2/3 Alt Birimleri",
        ar: "استرجاع معرفي: الوحدات الفرعية ألفا-1 مقابل ألفا-2/3",
        en: "Spaced Retrieval: Alpha-1 vs Alpha-2/3 Subunit Selectivity"
      },
      prompt: {
        tr: "GABA-A reseptöründeki alfa-1 alt birimi sedasyon ve amneziyi; alfa-2/alfa-3 alt birimleri ise anksiyolizi yönetir. Yalnızca alfa-1'e bağlanan 'Z-ilacı' zolpidemin anksiyolitik olmamasının nedenini hatırlayın.",
        ar: "تتوسط الوحدة $\alpha_1$ التهدئة وفقدان الذاكرة؛ وتتوسط $\alpha_2/\alpha_3$ إزالة القلق. تذكر لماذا يفتقر زولبيديم (دواء Z) الانتقائي للوحدة $\alpha_1$ إلى أي خواص مضادة للقلق.",
        en: "GABA-A alpha-1 mediates sedation and amnesia; alpha-2/alpha-3 mediate anxiolysis. Recall why the selective alpha-1 'Z-drug' zolpidem produces potent hypnotic sleep without clinical anxiolytic properties."
      },
      technicalTerms: [
        {
          "term": "alfa-1 alt birimi",
          "arContext": "الوحدة الفرعية ألفا-1 (alpha-1 subunit)"
        },
        {
          "term": "anksiyoliz",
          "arContext": "إزالة القلق (anxiolysis)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Klasik benzodiyazepinler (diazepam) alfa-1, 2, 3 ve 5 alt birimlerinin hepsine birden bağlanır.",
          ar: "ترتبط البنزوديازيبينات الكلاسيكية (ديازيبام) بجميع الوحدات ألفا 1 و 2 و 3 و 5 دون تمييز.",
          en: "Classic benzodiazepines (e.g. diazepam) non-selectively bind alpha-1, 2, 3, and 5 subunits."
        },
        {
          tier: 2,
          tr: "Bu yüzden diazepam hem uyku verir (alfa-1), hem kaygıyı siler (alfa-2/3), hem kas gevşetir.",
          ar: "ولهذا يسبب ديازيبام النوم (ألفا-1)، ويزيل القلق (ألفا-2/3)، ويرخي العضلات معاً.",
          en: "Diazepam therefore induces sleep (alpha-1), relieves anxiety (alpha-2/3), and causes muscle relaxation."
        },
        {
          tier: 3,
          tr: "Zolpidem ise sadece alfa-1'i seçer; sadece güçlü bir uyku ilacıdır, gündüz anksiyetesi için işe yaramaz.",
          ar: "أما زولبيديم فينتقي ألفا-1 فقط؛ فهو منوم خالص لا يفيد في علاج القلق النهاري نهائياً.",
          en: "Zolpidem is selective for alpha-1; it is a pure hypnotic with no utility as a daytime anxiolytic."
        }
      ]
    },

    // Step 11: Connection (connection)
    {
      id: "pharm-mod6-les1-step11",
      order: 11,
      stageIndex: 11,
      stage: "connection",
      type: "connection",
      title: {
        tr: "İleri Bağlantı: İyonotropik Klorürden Metabotropik D2'ye",
        ar: "ربط مفاهيمي: من قنوات الكلوريد إلى مستقبلات D2",
        en: "Conceptual Bridge: From Ionotropic Chloride to Metabotropic D2"
      },
      prompt: {
        tr: "GABA-A reseptörü klorür kanalıyla nöronu sustururken, dopamin D2 reseptörü GPCR Gi proteiniyle adenilat siklazı inhibe eder. Bir sonraki derste dopamin yolaklarını ve antipsikotik ilaçların reseptör hedeflerini keşfedeceğiz.",
        ar: "بينما تخمد قناة كلوريد GABA-A العصبونات، يثبط مستقبل الدوبامين D2 إنزيم محلقة الأدينيلات عبر بروتين Gi. في الدرس القادم سنستكشف مسارات الدوبامين وأهداف الأدوية المضادة للذهان.",
        en: "While ionotropic GABA-A chloride channels mediate rapid neuronal inhibition, dopamine D2 GPCRs signal through Gi to suppress adenylyl cyclase. Next, we bridge to central dopaminergic pathways and antipsychotic pharmacology."
      },
      technicalTerms: [
        {
          "term": "iyonotropik reseptör",
          "arContext": "مستقبل أيونوتروبي (ionotropic receptor)"
        },
        {
          "term": "D2 reseptörü",
          "arContext": "مستقبل الدوبامين D2 (dopamine D2 receptor)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "GABA-A milisaniyeler içinde klorür akıtan hızlı bir iyon kanalı kapısıdır (iyonotropik).",
          ar: "مستقبل GABA-A قناة أيونية سريعة تفتح خلال ميلي ثوانٍ لتدفق الكلوريد.",
          en: "GABA-A is a rapid, ligand-gated ion channel operating in milliseconds (ionotropic)."
        },
        {
          tier: 2,
          tr: "Dopamin D2 reseptörü ise saniyeler süren ikincil haberci üreten bir G-proteini reseptörüdür (metabotropik Gi).",
          ar: "أما مستقبل D2 فمستقبل مقترن ببروتين G (Gi) يستغرق ثوانٍ لتعديل الإشارات الخلوية.",
          en: "Dopamine D2 is a 7-TM GPCR coupled to Gi, inhibiting cAMP production over seconds (metabotropic)."
        },
        {
          tier: 3,
          tr: "Son dersimizde, dopamin D2 blokajının şizofrenideki şifa gücünü ve kaslardaki felç edici yan etkilerini göreceğiz.",
          ar: "في درسنا الختامي، سنرى كيف يعالج حصر D2 أعراض الفصام وكيف يجمد حركة العضلات في آن واحد.",
          en: "In our final lesson, we examine how D2 blockade cures psychosis while risking severe motor dystonias."
        }
      ]
    },

    // Step 12: Mastery Check (mastery_check)
    {
      id: "pharm-mod6-les1-step12",
      order: 12,
      stageIndex: 12,
      stage: "mastery_check",
      type: "mastery_check",
      title: {
        tr: "Ustalık Sınavı: Üç Ligandın Allosterik Ayrımı",
        ar: "اختبار الإتقان: التمايز التفارغي بين ثلاث ربيطات",
        en: "Mastery Assessment: Allosteric Profiling of Three Ligands"
      },
      prompt: {
        tr: "GABA-A reseptörüne bağlanan üç ligand: Ligand X açılma frekansını artırıyor; Ligand Y nötral antagonizma yapıyor; Ligand Z ise açılma frekansını düşürüp nöbet tetikliyor. Bu molekülleri sınıflandırın.",
        ar: "ثلاث ربيطات ترتبط بـ GABA-A: الربيطة X تزيد تواتر الفتح؛ الربيطة Y تناهض بتعادل؛ الربيطة Z تخفض تواتر الفتح وتحرض النوبات. صنف هذه الجزيئات بدقة.",
        en: "Three ligands bind GABA-A: Ligand X increases opening frequency; Ligand Y produces neutral antagonism; Ligand Z decreases frequency and triggers seizures. Classify these three pharmacological agents."
      },
      conceptCheck: {
        question: {
          tr: "Aynı BZD allosterik cebine bağlanan bu üç ligandın (X, Y, Z) farmakodinamik sınıfları sırasıyla hangi seçenekte doğru verilmiştir?",
          ar: "ما التصنيف الدوائي الدقيق بالترتيب لهذه الربيطات الثلاث (X, Y, Z) التي تشغل نفس الموقع التفارغي؟",
          en: "Which option correctly classifies these three ligands (X, Y, Z) binding to the identical BZD allosteric site?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "X = Pozitif Allosterik Modülatör (Diazepam); Y = Nötral Antagonist (Flumazenil); Z = Negatif Allosterik Modülatör / İnvers Agonist (Beta-karbolinler).",
              ar: "X = معدل تفارغي إيجابي (ديازيبام)؛ Y = مناهض متعادل (فلومازينيل)؛ Z = معدل تفارغي سلبي / مشبه عكسي (بيتا-كاربولينات).",
              en: "X = Positive Allosteric Modulator (Diazepam); Y = Neutral Antagonist (Flumazenil); Z = Negative Allosteric Modulator / Inverse Agonist (Beta-carbolines)."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Kusursuz ustalık düzeyi! 1) Pozitif modülatör (BZD) açılma frekansını artırır (anksiyoliz/sedasyon); 2) Nötral antagonist (Flumazenil) frekansı değiştirmez, sadece bölgeyi bloke eder; 3) Negatif modülatör / invers agonist (Beta-karbolin) frekansı bazalin de altına düşürerek ağır anksiyete ve konvülsiyon yapar.",
              ar: "إتقان دوائي على أعلى مستوى! 1) المعدل الإيجابي يزيد التواتر (تهدئة)؛ 2) المناهض المتعادل (فلومازينيل) يشغل الموقع دون تغيير التواتر؛ 3) المشبه العكسي (بيتا-كاربولين) يخفض التواتر دون الطبيعي مفجراً القلق والتشنجات.",
              en: "Flawless pharmacology mastery! 1) PAM (diazepam) increases frequency (anxiolysis/sedation); 2) Neutral antagonist (flumazenil) produces zero intrinsic shift, competitively blocking the site; 3) NAM / Inverse agonist (beta-carbolines) decreases frequency below basal, provoking acute panic and seizures."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "X = Direkt Agonist (GABA); Y = Non-kompetitif Antagonist (Pikrotoksin); Z = İrreversible Kovalent Toksin.",
              ar: "X = مشبه مباشر (GABA)؛ Y = مناهض غير تنافسي (بيكرتوكسين)؛ Z = ذيفان تساهمي دائم.",
              en: "X = Direct Agonist (GABA); Y = Non-competitive Antagonist (Picrotoxin); Z = Irreversible Covalent Toxin."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanılgı: Bu üç molekül de aynı BZD allosterik cebine bağlanır; GABA ortosterik cebe, pikrotoksin ise doğrudan klorür kanalının lümenine bağlanır.",
              ar: "مغالطة: الربيطات الثلاث ترتبط بنفس الجيب التفارغي؛ بينما يرتبط GABA بالموقع الأساسي، ويرتبط بيكروتوكسين داخل مجرى القناة مباشرة.",
              en: "Misconception: All three ligands target the identical BZD allosteric site; GABA binds the orthosteric site, and picrotoxin occludes the channel pore directly."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "X = Barbitürat (Fenobarbital); Y = Kas gevşetici (Baklofen); Z = Antikolinerjik (Atropin).",
              ar: "X = باربيتورات (فينوباربيتال)؛ Y = مرخي عضلات (باكلوفين)؛ Z = مضاد كوليني (أتروبين).",
              en: "X = Barbiturate (Phenobarbital); Y = Muscle Relaxant (Baclofen); Z = Anticholinergic (Atropine)."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanılgı: Fenobarbital açılma frekansını değil süresini artırır; baklofen metabotropik GABA-B reseptörünü uyarır; atropin ise muskarinik reseptörleri bloke eder.",
              ar: "مغالطة: يزيد فينوباربيتال مدة الانفتاح لا التواتر؛ وينشط باكلوفين مستقبلات GABA-B؛ بينما يحصر أتروبين مستقبلات المسكارين.",
              en: "Misconception: Phenobarbital increases open duration, not frequency; baclofen targets metabotropic GABA-B receptors; atropine targets muscarinic GPCRs."
            }
          }
        ]
      },
      technicalTerms: [
        {
          "term": "invers agonist",
          "arContext": "مشبه عكسي (inverse agonist)"
        },
        {
          "term": "beta-karbolin",
          "arContext": "بيتا-كاربولين (beta-carboline)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "BZD allosterik cebi çift yönlü bir terazi gibidir: Bir yöne çekerseniz sedasyon, ters yöne çekerseniz nöbet çıkar.",
          ar: "جيب BZD ميزان ذو اتجاهين: سحبه في اتجاه يمنح التهدئة، وفي الاتجاه المعاكس يفجر التشنجات.",
          en: "The BZD allosteric pocket is a bidirectional rheostat: turning it one way calms the brain; the other way triggers seizures."
        },
        {
          tier: 2,
          tr: "X frekansı artırır (PAM / Diazepam); Y ortada tutar (Nötral antagonist / Flumazenil).",
          ar: "X يزيد التواتر (معدل إيجابي / ديازيبام)؛ Y يثبته في الوسط (مناهض متعادل / فلومازينيل).",
          en: "X enhances frequency (PAM / diazepam); Y produces neutral occupancy (neutral antagonist / flumazenil)."
        },
        {
          tier: 3,
          tr: "Z ise frekansı düşürerek zıt etki yapar (Negatif modülatör / İnvers agonist / Beta-karbolin).",
          ar: "بينما يخفض Z التواتر معطياً أثراً معاكساً (معدل سلبي / مشبه عكسي / بيتا-كاربولين).",
          en: "Z depresses channel frequency below baseline (NAM / inverse agonist / beta-carbolines)."
        }
      ]
    }
  ]
};

const targetPath = path.resolve(__dirname, '../courses/pharmacology/lessons/lesson-11.json');
fs.writeFileSync(targetPath, JSON.stringify(lesson11, null, 2), 'utf8');
console.log('Successfully written lesson-11.json to:', targetPath);
