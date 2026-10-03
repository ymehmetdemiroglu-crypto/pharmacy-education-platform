const fs = require('fs');
const path = require('path');

const lesson12 = {
  id: "pharm-mod6-les2",
  courseId: "pharmacology",
  moduleId: "ph-mod-06",
  title: {
    tr: "Dopaminerjik Yolaklar ve Antipsikotik Reseptör Profilleri",
    ar: "المسارات الدوبامينية والمظهر المستقبلاتي لمضادات الذهان",
    en: "Dopaminergic Pathways and Antipsychotic Receptor Profiles"
  },
  order: 2,
  access: "free",
  objective: {
    tr: "Dört dopaminerjik yolağı, %65-80 D2 terapötik penceresini, atipik 5-HT2A/D2 dengesini ve tardif diskinezi mekanizmasını kavramak.",
    ar: "إتقان المسارات الدوبامينية الأربعة، ونافذة إشغال D2 العلاجية (65-80%)، وتوازن 5-HT2A/D2، وآلية خلل الحركة المتأخر.",
    en: "Master four central dopaminergic pathways, the 65-80% D2 therapeutic window, atypical 5-HT2A/D2 balance, and tardive dyskinesia pharmacology."
  },
  misconceptions: [
    {
      tr: "D2 reseptör blokajı ne kadar yüksek olursa klinik sonucun o kadar iyi olacağı yanılgısı (%80 eşiği aşıldığında antipsikotik kazanç artmaz, ağır ekstrapiramidal kilitlenme ve rijidite patlak verir).",
      ar: "الظن الخاطئ بأن زيادة حظر D2 تحسن الفعالية دوماً (تجاوز عتبة 80% لا يقدم فائدة إضافية بل يفجر تخشباً وتشنجاً خارج هرمي حاد).",
      en: "Believing that higher D2 receptor blockade always yields better therapeutic outcomes (>80% occupancy triggers severe extrapyramidal motor dysfunction without added efficacy)."
    },
    {
      tr: "Tüm ekstrapiramidal semptomların antikolinerjiklerle düzeleceği yanılgısı (Akut distonide biperiden hayat kurtarırken, süpersensitif D2 reseptörlerine bağlı tardif diskinezide antikolinerjikler tabloyu felakete sürükler).",
      ar: "الاعتقاد الخاطئ بأن جميع الأعراض خارج الهرمية تُعالج بمضادات الكولين (بينما ينقذ البيبيريدين في التشنج الحاد، فإنه يفاقم خلل الحركة المتأخر كارثياً بسبب فرط تحسس D2).",
      en: "Assuming all extrapyramidal movement disorders respond to anticholinergics (biperiden rescues acute dystonia, but massively worsens dopamine-supersensitive tardive dyskinesia)."
    }
  ],
  sources: [
    {
      file: "Santral Sinir Sistemi.pdf",
      page: 22
    }
  ],
  citations: [
    {
      id: "CIT-PH12-01",
      book: "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
      edition: "14th ed.",
      topic: "Pharmacotherapy of Psychosis and Mania: Dopaminergic Pathways and Antipsychotic Mechanism",
      chapter: "Chapter 16",
      page: "305-328",
      status: "verified"
    },
    {
      id: "CIT-PH12-02",
      book: "Katzung's Basic & Clinical Pharmacology",
      edition: "15th ed.",
      topic: "Antipsychotic Agents: Receptor-Binding Characteristics & Clinical Pharmacology",
      chapter: "Chapter 29",
      page: "535-554",
      status: "verified"
    },
    {
      id: "CIT-PH12-03",
      book: "Santral Sinir Sistemi Farmakolojisi",
      edition: "Turkish Academic Standard 1st ed.",
      topic: "Antipsikotik İlaçlar ve Dopamin Reseptör Eşleşmeleri",
      chapter: "Bölüm 3",
      page: "22-26",
      status: "verified"
    }
  ],
  spacedReviewCards: [
    {
      cardId: "pharm-mod6-les2-card1",
      courseId: "pharmacology",
      drugOrConcept: "Terapötik D2 Doluluk Penceresi",
      prompt: "Antipsikotik etkinlik ve ekstrapiramidal motor güvenlik arasındaki terapötik D2 reseptör doluluk penceresi nedir?",
      answer: "%65 ila %80 doluluk aralığıdır. %65'in altında antipsikotik etki yetersiz kalır, %80'in üzerinde ise akut ekstrapiramidal semptomlar (EPS) ortaya çıkar.",
      box: 1,
      intervalDays: 1
    },
    {
      cardId: "pharm-mod6-les2-card2",
      courseId: "pharmacology",
      drugOrConcept: "Dört Dopaminerjik Yolak",
      prompt: "Antipsikotik etkinin, ekstrapiramidal yan etkilerin ve hiperprolaktineminin görüldüğü üç ana dopaminerjik yolak hangileridir?",
      answer: "Terapötik antipsikotik etki Mezolimbik yolakta; motor yan etkiler (EPS/tardif diskinezi) Nigrostriatal yolakta; hiperprolaktinemi ise Tuberoinfundibuler yolakta ortaya çıkar.",
      box: 1,
      intervalDays: 1
    },
    {
      cardId: "pharm-mod6-les2-card3",
      courseId: "pharmacology",
      drugOrConcept: "Atipik Antipsikotik 5-HT2A Mekanizması",
      prompt: "İkinci kuşak (atipik) antipsikotiklerin yüksek 5-HT2A/D2 blokaj oranı nigrostriatal motor güvenliği nasıl sağlar?",
      answer: "Striatumdaki 5-HT2A reseptörlerinin bloke edilmesi dopamin nöronları üzerindeki serotonerjik freni kaldırır; salınan dopamin D2 reseptörlerinde antipsikotikle yarışarak motor felci (EPS) önler.",
      box: 1,
      intervalDays: 1
    }
  ],
  translations: {
    tr: {
      title: "Dopaminerjik Yolaklar ve Antipsikotik Reseptör Profilleri"
    },
    ar: {
      title: "المسارات الدوبامينية والمظهر المستقبلاتي لمضادات الذهان"
    }
  },
  steps: [
    {
      id: "pharm-mod6-les2-step-01",
      stage: "hook",
      stageIndex: 1,
      type: "predict_reveal",
      title: {
        tr: "Halüsinasyonları Sustururken Bedeni Kilitlemek",
        ar: "إسكات الهلاوس وتصلب الجسد",
        en: "Silencing Hallucinations While Freezing the Body"
      },
      prompt: {
        tr: "Haloperidol mezolimbik yoldaki sesleri dakikalar içinde sustururken, neden sadece 2 saat sonra hastanın boynunu ve gözlerini kramp halinde kilitler?",
        ar: "بينما يسكت الهالوبيريدول الهلاوس السمعية الميزولمبية في دقائق، لماذا يشنج رقبة المريض وعينيه بعد ساعتين فقط؟",
        en: "Haloperidol rapidly silences auditory hallucinations in the mesolimbic pathway, yet within two hours violently twists the patient's neck and eyes. Why?"
      },
      predictThenReveal: true,
      config: {
        revealedOutcome: "Mezolimbik ve nigrostriatal yolaklardaki D2 reseptörleri özdeştir; mezolimbikte dopamini susturan blokaj, motor yolakta asetilkolin frenini kaldırarak akut distonik krize yol açar."
      },
      technicalTerms: [
        {
          term: "Akut distoni",
          arContext: "خلل التوتر الحاد (Acute dystonia)"
        },
        {
          term: "Okülojirik kriz",
          arContext: "نوبة شخوص البصر (Oculogyric crisis)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Dopaminin beyindeki tek bir bölgede değil, birden fazla bağımsız anatomik yolakta farklı görevler yürüttüğünü düşünün.",
          ar: "تذكر أن الدوبامين لا يعمل في منطقة واحدة، بل يدير وظائف متباينة في مسارات تشريحية مستقلة.",
          en: "Consider that dopamine operates across multiple distinct anatomical circuits rather than a single unified brain center."
        },
        {
          tier: 2,
          tr: "Striatumdaki motor kontrol merkezinde dopamin ile asetilkolin arasında hassas bir denge terazisi bulunur.",
          ar: "يوجد في الجسم المخطط الحركي ميزان دقيق وحساس بين الدوبامين والأسيتيل كولين.",
          en: "In the striatal motor center, dopamine and acetylcholine exist in a delicately balanced seesaw equilibrium."
        },
        {
          tier: 3,
          tr: "D2 blokajı mezolimbikte psikozu dindirirken, nigrostriatal yolda dopaminin asetilkolin üzerindeki baskısını kaldırarak kolinerjik spazm yaratır.",
          ar: "حظر D2 يخمد الذهان ميزولمبياً، لكنه يرفع كبح الدوبامين عن الأسيتيل كولين حركياً مفجراً تشنجاً كولينياً.",
          en: "Blocking D2 quiets psychosis mesolimbically, but removes dopamine's brake on acetylcholine striatally, triggering acute cholinergic spasm."
        }
      ],
      conceptCheck: {
        question: {
          tr: "Aynı D2 blokajı mezolimbik yolda psikozu çözerken striatal motor sistemde neden kramp krizine yol açar?",
          ar: "لماذا يحل حظر D2 ذاته الذهان ميزولمبياً بينما يسبب نوبات تشنج حادة في النظام الحركي المخططي؟",
          en: "Why does the identical D2 blockade resolve psychosis in the mesolimbic pathway yet induce violent muscle spasms striatally?"
        },
        options: [
          {
            id: "opt_correct",
            isCorrect: true,
            text: {
              tr: "D2 blokajı mezolimbik hiperaktiviteyi susturur; ancak striatumda asetilkolin salınımı üzerindeki dopamin frenini kaldırarak kolinerjik kramp patlatır.",
              ar: "يسكت حظر D2 فرط النشاط الميزولمبي، لكنه يزيل كابح الدوبامين عن تحرر الأسيتيل كولين مخططياً مفجراً تشنجاً كولينياً.",
              en: "D2 blockade suppresses mesolimbic hyperactivity, but removes dopamine's inhibition on striatal acetylcholine release, unleashing cholinergic muscle spasm."
            },
            misconceptionFeedback: {
              tr: "Kesinlikle doğru! Striatal D2 reseptörleri asetilkolin salınımını frenler; haloperidol bu freni kaldırınca asetilkolin fırtınası akut distoni yaratır.",
              ar: "صحيح بدقة! تكبح مستقبِلات D2 المخططية تحرر الأسيتيل كولين؛ وحظرها يطلق عاصفة كولينية تسبب خلل التوتر الحاد.",
              en: "Precisely correct! Striatal D2 receptors tonic-inhibit acetylcholine interneurons; blocking them disinhibits acetylcholine, causing acute dystonia."
            }
          },
          {
            id: "opt_distr1",
            isCorrect: false,
            text: {
              tr: "Haloperidol iskelet kaslarındaki nikotinik asetilkolin reseptörlerini doğrudan uyararak periferik kasılma başlatır.",
              ar: "يحفز الهالوبيريدول مستقبِلات الأسيتيل كولين النيكوتينية في العضلات الهيكلية مباشرة محفزاً الانقباض المحيطي.",
              en: "Haloperidol directly stimulates peripheral nicotinic acetylcholine receptors at the neuromuscular junction to trigger contraction."
            },
            misconceptionFeedback: {
              tr: "Yanılgı: Haloperidol periferik nöromüsküler kavşaktaki nikotinik reseptörlerle doğrudan etkileşmez; distoni santral striatal dopamin/asetilkolin dengesizliğinden doğar.",
              ar: "مفهوم خاطئ: لا يتفاعل الهالوبيريدول مع النيكوتين المحيطي؛ بل ينشأ التشنج من خلل توازن الدوبامين/الأسيتيل كولين المركزي.",
              en: "Misconception: Haloperidol has no direct activity at peripheral neuromuscular nicotinic receptors; dystonia originates from central striatal neurotransmitter disbalance."
            }
          },
          {
            id: "opt_distr2",
            isCorrect: false,
            text: {
              tr: "Striatumdaki D2 reseptörleri Gs kenetlidir; haloperidol bu reseptörleri uyararak adenilil siklazı aşırı aktive eder.",
              ar: "ترتبط مستقبِلات D2 في الجسم المخطط بـ Gs؛ ويقوم الهالوبيريدول بتحفيزها مفرطاً لتنشيط محلقة الأدينيلات.",
              en: "Striatal D2 receptors are Gs-coupled; haloperidol acts as an agonist that hyperactivates adenylyl cyclase."
            },
            misconceptionFeedback: {
              tr: "Yanılgı: D2 reseptörleri Gs değil Gi/Go kenetlidir ve haloperidol bir agonist değil, tersiyer amin yapılı güçlü bir antagonisttir.",
              ar: "مفهوم خاطئ: مستقبِلات D2 مقترنة بـ Gi/Go المثبطة، والهالوبيريدول حاصر قوي وليس ناهضاً.",
              en: "Misconception: All D2 receptors couple to inhibitory Gi/Go proteins, and haloperidol is a potent antagonist, not an agonist."
            }
          }
        ]
      }
    },
    {
      id: "pharm-mod6-les2-step-02",
      stage: "question",
      stageIndex: 2,
      type: "question",
      title: {
        tr: "Dört Yolak Çatışması: Bir Yeri Düzelten Diğerini Neden Bozar?",
        ar: "صراع المسارات الأربعة: لماذا يُفسد علاج جهة مساراً آخر؟",
        en: "The Four-Pathway Conflict: Why Fixing One Area Disrupts Another"
      },
      prompt: {
        tr: "Şizofrenide negatif belirtiler kortekste dopamin eksikliğinden kaynaklanırken, nigrostriatal yol motor kontrolü sağlar. D2 antagonisti neden bu iki bölgeyi aynı anda iyileştiremez?",
        ar: "بينما تنشأ الأعراض السلبية من نقص الدوبامين القشري، يضبط المسار المخططي الحركة. لماذا يعجز حاصر D2 عن علاجهما معاً؟",
        en: "Negative schizophrenia symptoms stem from cortical dopamine deficiency while the nigrostriatal pathway governs movement. Why can a pure D2 blocker never fix both simultaneously?"
      },
      config: {},
      technicalTerms: [
        {
          term: "Mezokortikal yolak",
          arContext: "المسار القشري المتوسط (Mesocortical pathway)"
        },
        {
          term: "Tuberoinfundibuler yolak",
          arContext: "المسار القمعي الدرني (Tuberoinfundibular pathway)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Şizofrenide pozitif belirtiler dopamin fazlalığı, negatif belirtiler ise kortikal dopamin yetersizliği ile ilişkilidir.",
          ar: "ترتبط الأعراض الإيجابية بفرط الدوبامين، بينما تنتج الأعراض السلبية عن قصور الدوبامين القشري الجبهي.",
          en: "Positive symptoms reflect mesolimbic dopamine excess, whereas negative symptoms stem from prefrontal cortical dopamine hypofunction."
        },
        {
          tier: 2,
          tr: "Saf bir D2 blokörü beynin her bölgesindeki D2 reseptörünü ayrım gözetmeksizin kapatır.",
          ar: "يقوم حاصر D2 الصرف بإغلاق مستقبِلات D2 في سائر أنحاء الدماغ دون أي تمييز تشريحي.",
          en: "A non-selective pure D2 blocker shuts down D2 receptors indiscriminately across every anatomical brain compartment."
        },
        {
          tier: 3,
          tr: "Kortekste zaten yetersiz olan dopamin reseptörleri de bloke edilince negatif belirtiler ağırlaşır; hipofizde ise prolaktin freni kalkar.",
          ar: "عند حظر دوبامين القشرة المنخفض أصلاً تتفاقم الأعراض السلبية، وفي النخامية يُرفع كابح إفراز البرولاكتين.",
          en: "Further blocking already depleted cortical D2 receptors worsens negative symptoms, while pituitary blockade unleashes uninhibited prolactin secretion."
        }
      ],
      conceptCheck: {
        question: {
          tr: "Yüksek doz haloperidol alan bir hastada mezokortikal ve tuberoinfundibuler yolaklarda hangi klinik ve biyokimyasal tablo gelişir?",
          ar: "ما النتيجة السريرية والبيوكيميائية في المسارين القشري والقمعي عند إعطاء جرعة عالية من الهالوبيريدول؟",
          en: "What clinical and biochemical outcomes unfold in the mesocortical and tuberoinfundibular pathways under high-dose haloperidol?"
        },
        options: [
          {
            id: "opt_correct",
            isCorrect: true,
            text: {
              tr: "Mezokortikal blokaj bilişsel küntlüğü ve negatif belirtileri artırır; tuberoinfundibuler blokaj ise prolaktin frenini kaldırarak hiperprolaktinemiye yol açar.",
              ar: "يفاقم الحظر القشري التبلد الانفعالي والأعراض السلبية، ويرفع الحظر القمعي كابح البرولاكتين مسبباً فرط برولاكتين الدم.",
              en: "Mesocortical blockade aggravates emotional blunting and negative symptoms, while tuberoinfundibular blockade removes tonic prolactin inhibition, causing hyperprolactinemia."
            },
            misconceptionFeedback: {
              tr: "Harika kavrayış! Dopamin hipofizde prolaktin salgısını tonik olarak baskılar (PIF). D2 reseptörleri bloke edilince prolaktin kontrolsüzce kanda yükselir.",
              ar: "إدراك ممتاز! يكبح الدوبامين إفراز البرولاكتين نخامياً (PIF)؛ وحظر D2 يطلق البرولاكتين في الدم دون كابح.",
              en: "Superb insight! Pituitary dopamine acts tonically as prolactin-inhibiting factor (PIF); D2 antagonism removes this brake, triggering hyperprolactinemia."
            }
          },
          {
            id: "opt_distr1",
            isCorrect: false,
            text: {
              tr: "Mezokortikal yolakta dopamin aşırı artar ve manik atak başlatır; hipofizde ise prolaktin sentezi tamamen durur.",
              ar: "يزداد الدوبامين القشري بإفراط مفجراً نوبة هوس، ويتوقف تصنيع البرولاكتين النخامي تماماً.",
              en: "Mesocortical dopamine skyrockets triggering manic psychosis, while pituitary prolactin production is completely abolished."
            },
            misconceptionFeedback: {
              tr: "Yanılgı: Haloperidol bir dopamin antagonisti olup mezokortikal dopamin iletimini artırmaz; prolaktini de durdurmaz, tam aksine artırır.",
              ar: "مفهوم خاطئ: الهالوبيريدول حاصر لا يزيد النقل الدوباميني، كما أنه يرفع البرولاكتين ولا يوقفه إطلاقاً.",
              en: "Misconception: Haloperidol is a D2 blocker, which depresses cortical dopamine signaling and disinhibits—rather than suppresses—prolactin release."
            }
          },
          {
            id: "opt_distr2",
            isCorrect: false,
            text: {
              tr: "Haloperidol kan-beyin bariyerini geçemediği için kortikal ve hipotalamik yolaklar ilaçtan hiç etkilenmez.",
              ar: "بما أن الهالوبيريدول لا يعبر الحاجز الدموي الدماغي، فإن المسارات القشرية والوطائية لا تتأثر بالدواء نهائياً.",
              en: "Because haloperidol cannot cross the blood-brain barrier, cortical and hypothalamic dopaminergic pathways remain completely untouched."
            },
            misconceptionFeedback: {
              tr: "Yanılgı: Haloperidol lipofiliktir ve kan-beyin bariyerini süratle aşar; ayrıca hipofiz bezi kan-beyin bariyerinin dışında yer alır.",
              ar: "مفهوم خاطئ: الهالوبيريدول محب للدهون ويعبر الحاجز بسهولة؛ كما أن الغدة النخامية تقع خارج الحاجز الدموي الدماغي أصلاً.",
              en: "Misconception: Haloperidol is lipophilic and readily crosses the BBB; furthermore, the pituitary gland lies outside the blood-brain barrier."
            }
          }
        ]
      }
    },
    {
      id: "pharm-mod6-les2-step-03",
      stage: "intuition",
      stageIndex: 3,
      type: "intuition",
      title: {
        tr: "%65 ile %80 Arasındaki Dar Bıçak Sırtı",
        ar: "حد السكين الحرج بين 65% و 80%",
        en: "The Razor's Edge: Between 65% and 80%"
      },
      prompt: {
        tr: "PET görüntülemeleri antipsikotik etkinin %65 D2 doluluğunda başladığını, ancak %80 aşıldığında parkinsonizmin patlak verdiğini gösterir. Bu dar %15'lik pencere klinik dozlamada ne anlama gelir?",
        ar: "يُظهر التصوير المقطعي أن الفعالية تبدأ عند 65% من إشغال D2، لكن تجاوز 80% يفجر الباركنسونية. ماذا يعني هذا الهامش الضيق سريرياً؟",
        en: "PET scans reveal antipsychotic response begins at 65% D2 occupancy, but exceeding 80% unleashes parkinsonism. What does this narrow 15% window dictate clinically?"
      },
      config: {
        therapeuticRange: "%65 - %80 D2 Doluluğu",
        epsThreshold: "> %80 D2 Doluluğu",
        prolactinThreshold: "> %72 D2 Doluluğu"
      },
      technicalTerms: [
        {
          term: "Reseptör doluluğu",
          arContext: "إشغال المستقبِلات (Receptor occupancy)"
        },
        {
          term: "Pozitron Emisyon Tomografisi (PET)",
          arContext: "التصوير المقطعي بالإصدار البوزيتروني (PET)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Doz iki katına çıktığında reseptör doluluğu doğrusal değil, logaritmik doygunluk eğrisine göre artar.",
          ar: "عند مضاعفة الجرعة لا يزداد إشغال المستقبِلات خطياً، بل يتبع منحنى إشباع لوغاريتمي.",
          en: "Doubling the drug dose does not double occupancy linearly; it follows a logarithmic saturation binding isotherm."
        },
        {
          tier: 2,
          tr: "%65 doluluk sağlayan doz ile %80 doluluğu aşarak EPS yapan doz arasında çok küçük bir miligram farkı bulunur.",
          ar: "الفرق بالمليغرام بين جرعة تحقق 65% وأخرى تتجاوز 80% وتفجر أعراضاً خارج هرمية ضئيل للغاية.",
          en: "The milligram difference between achieving 65% occupancy and blowing past the 80% EPS threshold is extremely small."
        },
        {
          tier: 3,
          tr: "Haloperidolde 2-4 mg terapötik pencereyi sağlarken, 10 mg'a çıkıldığında doluluk >%85'e fırlar ve ağır ekstrapiramidal kilitlenme kaçınılmaz olur.",
          ar: "تحقق 2-4 مغ من الهالوبيريدول النافذة المطلوبة، بينما يقفز إعطاء 10 مغ بالإشغال فوق 85% مسبباً شللاً حركياً.",
          en: "While 2-4 mg haloperidol achieves optimal occupancy, 10 mg pushes occupancy above 85%, guaranteeing extrapyramidal rigidity."
        }
      ]
    },
    {
      id: "pharm-mod6-les2-step-04",
      stage: "visual_explanation",
      stageIndex: 4,
      type: "visual_explanation",
      title: {
        tr: "Striatal Tahterevalli: Dopamin-Asetilkolin Dengesi",
        ar: "أرجوحة التوازن المخططية: كفتا الدوبامين والأسيتيل كولين",
        en: "The Striatal Seesaw: Dopamine-Acetylcholine Equilibrium"
      },
      prompt: {
        tr: "Striatumdaki tahterevalliyi hayal edin: Dopamin freni çekilince asetilkolin tarafı kontrolsüzce havaya kalkar. Bu kolinerjik fırtınayı durdurmak için hangi acil farmakolojik müdahale gerekir?",
        ar: "تخيل أرجوحة التوازن المخططية: عند إزالة كابح الدوبامين، ترتفع كفة الأسيتيل كولين بجنون. ما التدخل الدوائي العاجل لإخماد هذه العاصفة؟",
        en: "Picture the striatal seesaw: removing dopamine's brake sends acetylcholine soaring unchecked. What emergency pharmacological countermeasure restores balance against this cholinergic storm?"
      },
      config: {
        seesawDiagram: "Dopamin (D2) ↓ ===[Nigrostriatal Fulkrum]=== Asetilkolin (M1) ↑↑",
        reversalAgent: "Biperiden / Benztropin (Antimuskarinik Blokaj)"
      },
      technicalTerms: [
        {
          term: "Kolinerjik interlöron",
          arContext: "عصبون بيني كوليني (Cholinergic interneuron)"
        },
        {
          term: "Muskarinik M1 antagonisti",
          arContext: "مضاد المسكارين M1 (M1 muscarinic antagonist)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Dopamin D2 reseptörü kolinerjik internöronların asetilkolin salmasını sürekli frenleyen bir kapıdır.",
          ar: "يعمل مستقبِل D2 كبوابة تكبح باستمرار تحرر الأسيتيل كولين من العصبونات البينية المخططية.",
          en: "Striatal D2 receptors act as a tonic inhibitory gate preventing excessive acetylcholine release from interneurons."
        },
        {
          tier: 2,
          tr: "D2 reseptörleri güçlü bir şekilde bloke edildiğinde kolinerjik internöronlar aşırı uyarılır ve kas spazmı tetiklenir.",
          ar: "عند حظر مستقبِلات D2 بقوة، تستثار العصبونات الكولينية مفرطة مسببة تشنجات عضلية مستمرة.",
          en: "When D2 receptors are heavily occupied, cholinergic interneurons become disinhibited, triggering profound muscular spasms."
        },
        {
          tier: 3,
          tr: "Dopamini artıramıyorsanız, yükselen asetilkolini santral etkili bir antimuskarinik ajanla (biperiden veya benztropin) bloke ederek dengeyi kurarsınız.",
          ar: "إن تعذر رفع الدوبامين، فإن إغلاق الأسيتيل كولين بمضاد مسكاريني مركزي (كالبيبيريدين) يعيد التوازن فوراً.",
          en: "If you cannot restore dopamine, blocking the unchecked acetylcholine with a central antimuscarinic (biperiden or benztropine) restores balance."
        }
      ]
    },
    {
      id: "pharm-mod6-les2-step-05",
      stage: "interactive_artifact",
      stageIndex: 5,
      type: "interactive_artifact",
      title: {
        tr: "İnteraktif Kenetlenme: Haloperidolün D2 Bağlanma Cebi",
        ar: "المحاكاة التفاعلية: جيب ارتباط الهالوبيريدول بمستقبِل D2",
        en: "Interactive Docking: Haloperidol's D2 Binding Pocket"
      },
      prompt: {
        tr: "Haloperidolün fonksiyonel gruplarını D2 dopamin reseptör cebindeki tamamlayıcı amino asit kalıntılarıyla eşleştirin; yüksek affiniteli blokajın moleküler mimarisini keşfedin.",
        ar: "طابق المجموعات الوظيفية للهالوبيريدول مع الأحماض الأمينية في جيب مستقبِل D2، لتكتشف الأساس الجزيئي لقوة الحظر.",
        en: "Match haloperidol's functional groups with complementary amino acid residues inside the D2 receptor pocket to uncover the molecular architecture of high-affinity blockade."
      },
      widgetType: "ReceptorLigandMatcher",
      widget: {
        type: "ReceptorLigandMatcher",
        config: {
          title: "Haloperidol - D2 Dopamin Reseptör Kenetlenmesi",
          prompt: "Haloperidolün gruplarını D2 cebindeki amino asitlerle eşleştirerek yüksek affiniteli blokajın kimyasını çözün.",
          drugName: "Haloperidol",
          receptorName: "D2 Dopamin Reseptörü",
          pairs: [
            {
              id: "pair_tert_amine",
              drugGroup: "Protonlanmış Tersiyer Amin (Piperidin)",
              correctResidueId: "res_asp114",
              bondType: "ionic",
              energyKcalMol: "-8 ila -12 kcal/mol",
              explanation: "Fizyolojik pH'ta pozitif yüklü piperidin azotu, TM3 heliksindeki negatif Asp114 karboksilatı ile en kritik elektrostatik tuz köprüsünü kurar."
            },
            {
              id: "pair_fluorophenyl",
              drugGroup: "p-Fluorofenil Halkası (Bütirofenon)",
              correctResidueId: "res_val115_trp386",
              bondType: "van_der_waals",
              energyKcalMol: "-3 ila -5 kcal/mol",
              explanation: "Lipofilik p-fluorofenil ucu, TM3/TM6 helikslerindeki Val115 ve Trp386 kalıntılarının oluşturduğu derin hidrofobik cebe oturur."
            },
            {
              id: "pair_chlorophenyl",
              drugGroup: "4-(p-Klorofenil) Aromatik Halkası",
              correctResidueId: "res_phe390",
              bondType: "pi_pi",
              energyKcalMol: "-4 ila -6 kcal/mol",
              explanation: "Klorlu benzen halkası, TM6'daki Phe390 aromatik halkasıyla paralel pi-pi istiflenme yaparak bağlanmayı sıkılaştırır."
            },
            {
              id: "pair_hydroxyl",
              drugGroup: "4-Hidroksil Grubu (-OH)",
              correctResidueId: "res_ser193",
              bondType: "h_bond",
              energyKcalMol: "-2 ila -4 kcal/mol",
              explanation: "Piperidin C4 pozisyonundaki hidroksil grubu, TM5 heliksindeki Ser193 kalıntısıyla yönlendirici hidrojen bağı oluşturur."
            }
          ],
          residues: [
            {
              id: "res_asp114",
              residueName: "Asp114 (TM3)",
              description: "Negatif yüklü karboksilat kalıntısı (anyonik kenetlenme merkezi)"
            },
            {
              id: "res_val115_trp386",
              residueName: "Val115 / Trp386 (TM3/TM6)",
              description: "Derin apolar hidrofobik cep kalıntıları"
            },
            {
              id: "res_phe390",
              residueName: "Phe390 (TM6)",
              description: "Aromatik benzen halkalı fenilalanin kalıntısı"
            },
            {
              id: "res_ser193",
              residueName: "Ser193 (TM5)",
              description: "Polar hidrojen bağı verici ve alıcı serin kalıntısı"
            },
            {
              id: "res_glu95",
              residueName: "Glu95 (TM2)",
              description: "Ekstraselüler yüzey asidik kalıntısı (cep dışı tuzak kalıntı)"
            }
          ],
          source: {
            file: "Santral Sinir Sistemi.pdf",
            page: 22
          }
        }
      },
      config: {
        title: "Haloperidol - D2 Dopamin Reseptör Kenetlenmesi",
        prompt: "Haloperidolün gruplarını D2 cebindeki amino asitlerle eşleştirerek yüksek affiniteli blokajın kimyasını çözün.",
        drugName: "Haloperidol",
        receptorName: "D2 Dopamin Reseptörü",
        pairs: [
          {
            id: "pair_tert_amine",
            drugGroup: "Protonlanmış Tersiyer Amin (Piperidin)",
            correctResidueId: "res_asp114",
            bondType: "ionic",
            energyKcalMol: "-8 ila -12 kcal/mol",
            explanation: "Fizyolojik pH'ta pozitif yüklü piperidin azotu, TM3 heliksindeki negatif Asp114 karboksilatı ile en kritik elektrostatik tuz köprüsünü kurar."
          },
          {
            id: "pair_fluorophenyl",
            drugGroup: "p-Fluorofenil Halkası (Bütirofenon)",
            correctResidueId: "res_val115_trp386",
            bondType: "van_der_waals",
            energyKcalMol: "-3 ila -5 kcal/mol",
            explanation: "Lipofilik p-fluorofenil ucu, TM3/TM6 helikslerindeki Val115 ve Trp386 kalıntılarının oluşturduğu derin hidrofobik cebe oturur."
          },
          {
            id: "pair_chlorophenyl",
            drugGroup: "4-(p-Klorofenil) Aromatik Halkası",
            correctResidueId: "res_phe390",
            bondType: "pi_pi",
            energyKcalMol: "-4 ila -6 kcal/mol",
            explanation: "Klorlu benzen halkası, TM6'daki Phe390 aromatik halkasıyla paralel pi-pi istiflenme yaparak bağlanmayı sıkılaştırır."
          },
          {
            id: "pair_hydroxyl",
            drugGroup: "4-Hidroksil Grubu (-OH)",
            correctResidueId: "res_ser193",
            bondType: "h_bond",
            energyKcalMol: "-2 ila -4 kcal/mol",
            explanation: "Piperidin C4 pozisyonundaki hidroksil grubu, TM5 heliksindeki Ser193 kalıntısıyla yönlendirici hidrojen bağı oluşturur."
          }
        ],
        residues: [
          {
            id: "res_asp114",
            residueName: "Asp114 (TM3)",
            description: "Negatif yüklü karboksilat kalıntısı (anyonik kenetlenme merkezi)"
          },
          {
            id: "res_val115_trp386",
            residueName: "Val115 / Trp386 (TM3/TM6)",
            description: "Derin apolar hidrofobik cep kalıntıları"
          },
          {
            id: "res_phe390",
            residueName: "Phe390 (TM6)",
            description: "Aromatik benzen halkalı fenilalanin kalıntısı"
          },
          {
            id: "res_ser193",
            residueName: "Ser193 (TM5)",
            description: "Polar hidrojen bağı verici ve alıcı serin kalıntısı"
          },
          {
            id: "res_glu95",
            residueName: "Glu95 (TM2)",
            description: "Ekstraselüler yüzey asidik kalıntısı (cep dışı tuzak kalıntı)"
          }
        ],
        source: {
          file: "Santral Sinir Sistemi.pdf",
          page: 22
        }
      },
      technicalTerms: [
        {
          term: "İyonik tuz köprüsü",
          arContext: "جسر ملحي أيوني (Ionic salt bridge)"
        },
        {
          term: "Pi-pi istiflenmesi",
          arContext: "تراصف باي-باي العطري (Pi-pi stacking)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Tüm monoamin GPCR'larında protonlanmış amin azotu TM3'teki korunmuş bir aspartat karboksilatı ile tuz köprüsü kurar.",
          ar: "في سائر مستقبلات GPCR أحادية الأمين، يشكل النيتروجين البروتوني جسراً ملحياً مع أسبارتات TM3 المحفوظة.",
          en: "Across all monoamine GPCRs, the protonated amine forms an indispensable salt bridge with the conserved TM3 aspartate."
        },
        {
          tier: 2,
          tr: "Aromatik fenil halkaları aromatik fenilalanin kalıntılarıyla pi-pi istiflenir; alifatik gruplar ise hidrofobik ceplere sığınır.",
          ar: "تتراصف الحلقات العطرية مع الفينيل ألانين عبر باي-باي، بينما تستقر السلاسل الدهنية في الجيوب الكارهة للماء.",
          en: "Aromatic rings engage in pi-pi stacking with phenylalanine residues, while lipophilic moieties settle into hydrophobic pockets."
        },
        {
          tier: 3,
          tr: "Piperidin azotu Asp114'e, p-fluorofenil Val115/Trp386 cebine, klorofenil Phe390'a ve hidroksil Ser193'e kenetlenir.",
          ar: "يرتبط نيتروجين البيبيريدين بـ Asp114، والفلوروفينيل بجيب Val115/Trp386، والكلوروفينيل بـ Phe390، والهيدروكسيل بـ Ser193.",
          en: "Piperidine nitrogen pairs with Asp114, fluorophenyl fits Val115/Trp386, chlorophenyl stacks with Phe390, and hydroxyl bonds to Ser193."
        }
      ]
    },
    {
      id: "pharm-mod6-les2-step-06",
      stage: "guided_discovery",
      stageIndex: 6,
      type: "guided_discovery",
      title: {
        tr: "Rehberli Keşif: 5-HT2A Blokajı Dopamini Nasıl Kurtarır?",
        ar: "استكشاف موجه: كيف ينقذ حظر 5-HT2A الدوبامين الحركي؟",
        en: "Guided Discovery: How 5-HT2A Blockade Rescues Motor Dopamine"
      },
      prompt: {
        tr: "Klozapin neden neredeyse hiç EPS yapmaz? Serotonin 5-HT2A reseptörleri striatumda dopamin salgısını frenler. 5-HT2A bloke edildiğinde motor yoldaki dopamin miktarına ne olur?",
        ar: "لماذا لا يُحدث الكلوزابين أعراضاً هرمية تقريباً؟ تكبح مستقبِلات 5-HT2A تحرر الدوبامين حركياً. ما مصير دوبامين المسار الحركي عند حظرها؟",
        en: "Why does clozapine spare motor control? Serotonin 5-HT2A receptors normally brake striatal dopamine release. What happens to motor dopamine when 5-HT2A is blocked?"
      },
      predictThenReveal: true,
      config: {
        revealedOutcome: "5-HT2A blokajı striatumda dopamin salınımı üzerindeki serotonerjik freni kaldırır; açığa çıkan dopamin D2 reseptöründe yarışarak motor kilitlenmeyi önler."
      },
      technicalTerms: [
        {
          term: "5-HT2A/D2 antagonizma oranı",
          arContext: "نسبة حظر 5-HT2A إلى D2 (5-HT2A/D2 antagonism ratio)"
        },
        {
          term: "Hızlı ayrışma kinetiği (Fast-off)",
          arContext: "حركية الانفصال السريع (Fast-off kinetics)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Nigrostriatal dopamin terminalleri üzerinde serotonin heteroreseptörleri (5-HT2A) yer alır.",
          ar: "توجد مستقبلات السيروتونين المغايرة (5-HT2A) على النهايات العصبية الدوبامينية في المسار الحركي.",
          en: "Serotonin heteroreceptors (5-HT2A) sit directly on nigrostriatal dopamine nerve terminals."
        },
        {
          tier: 2,
          tr: "Serotonin normalde bu terminalleri uyararak dopamin salınımını baskılar (frenleyici etki).",
          ar: "يقوم السيروتونين فسيولوجياً بتثبيط تحرر الدوبامين عند تحفيز هذه المستقبِلات.",
          en: "Serotonin physiologically stimulates these receptors to inhibit and brake dopamine release."
        },
        {
          tier: 3,
          tr: "Atipik antipsikotikler 5-HT2A'yı bloke ettiğinde fren kalkar, striatumda dopamin salınır ve D2'ye bağlanan ilacı yerinden iterek EPS'yi engeller.",
          ar: "عندما تغلق الأدوية غير النمطية 5-HT2A يُرفع الكابح، فيتحرر الدوبامين ليزيح الدواء عن D2 ويمنع الشلل الحركي.",
          en: "Atypicals block 5-HT2A, lifting the brake so endogenous dopamine is released into the striatum, displacing the drug at D2 to avert EPS."
        }
      ]
    },
    {
      id: "pharm-mod6-les2-step-07",
      stage: "formal_explanation",
      stageIndex: 7,
      type: "formal_explanation",
      title: {
        tr: "Atipiklik Formülü: Reseptör Kinetiği ve Meltzer Oranı",
        ar: "معادلة اللانمطية: حركية الارتباط ونسبة ميلتزر",
        en: "The Atypicality Equation: Receptor Kinetics & Meltzer Ratio"
      },
      prompt: {
        tr: "Atipik antipsikotik formülü: Yüksek 5-HT2A/D2 affinite oranı ve hızlı D2 ayrışma hızı (fast-off). Bu iki mekanizma motor sistemde dopamin rekabetini nasıl korur?",
        ar: "معادلة مضادات الذهان اللانمطية: نسبة ألفة 5-HT2A/D2 عالية وانفصال سريع عن D2. كيف تحمي هاتان الآليتان المنافسة الحركية للدوبامين؟",
        en: "The atypicality equation pairs a high 5-HT2A/D2 affinity ratio with rapid D2 dissociation. How do these dual kinetics safeguard motor transmission while quelling psychosis?"
      },
      config: {
        fastOffPrinciple: "Kapur-Seeman Kuralı: Klozapin D2 reseptöründen saniyeler içinde ayrışırken (t1/2 < 60s), haloperidol saatlerce bağlı kalır (t1/2 > 30 dk).",
        meltzerRatio: "pKi(5-HT2A) - pKi(D2) > 0 ise bileşik atipik profile sahiptir."
      },
      technicalTerms: [
        {
          term: "Meltzer indeksi",
          arContext: "مؤشر ميلتزر (Meltzer index)"
        },
        {
          term: "Ayrışma yarı ömrü",
          arContext: "عمر نصف الانفصال (Dissociation half-life)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Bir ilacın reseptöre ne kadar sıkı bağlandığı değil, reseptörü ne kadar hızlı terk ettiği fizyolojik dopamin geçişine izin verir.",
          ar: "ليس المهم شدة التصاق الدواء بالمستقبل، بل سرعة مغادرته له التي تسمح بمرور نبضات الدوبامين الفسيولوجية.",
          en: "What preserves physiological signaling is not how tightly a drug binds, but how rapidly it unbinds from the receptor."
        },
        {
          tier: 2,
          tr: "Klozapin ve ketiapin D2'den saniyeler içinde ayrışır; haloperidol ise adeta moleküler kelepçe gibi kenetlenir.",
          ar: "ينفصل الكلوزابين والكيتيابين عن D2 في ثوانٍ، بينما يستقر الهالوبيريدول كقيد جزيئي لساعات.",
          en: "Clozapine and quetiapine unbind from D2 within seconds, whereas haloperidol remains locked on like a molecular handcuff."
        },
        {
          tier: 3,
          tr: "Fizyolojik dopamin dalgaları geldiğinde hızlı ayrışan klozapini yerinden söküp motor devreleri uyarabilir; haloperidolu sökemez.",
          ar: "عند انطلاق دفعات الدوبامين الفسيولوجية، تزيح الكلوزابين سريع الانفصال لتنشيط الحركة، بينما تعجز أمام الهالوبيريدول.",
          en: "Endogenous dopamine bursts transiently displace fast-off clozapine to transmit motor commands, but cannot displace tight-binding haloperidol."
        }
      ]
    },
    {
      id: "pharm-mod6-les2-step-08",
      stage: "concept_check",
      stageIndex: 8,
      type: "concept_check",
      title: {
        tr: "Kavram Kontrolü: Tipik ve Atipik Ayrımının Temeli",
        ar: "تحقق المفاهيم: الأساس الجوهري للتفريق بين النمطي واللانمطي",
        en: "Concept Check: Core Distinction Between Typical and Atypical"
      },
      prompt: {
        tr: "D2 blokajına güçlü 5-HT2A antagonizması eklenmesi, nigrostriatal yolakta ekstrapiramidal semptom (EPS) riskini neden anlamlı ölçüde düşürür?",
        ar: "لماذا تؤدي إضافة حظر 5-HT2A الفعال إلى حظر D2 إلى خفض خطر الأعراض خارج الهرمية في المسار المخططي جذرياً؟",
        en: "Why does adding potent 5-HT2A antagonism to D2 blockade substantially lower the risk of extrapyramidal symptoms in the nigrostriatal pathway?"
      },
      config: {},
      technicalTerms: [
        {
          term: "Ekstrapiramidal semptomlar (EPS)",
          arContext: "أعراض خارج هرمية (Extrapyramidal symptoms)"
        },
        {
          term: "Nigrostriatal koruma",
          arContext: "حماية حركية مخططة (Nigrostriatal protection)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Serotonin ve dopaminin striatumdaki çapraz etkileşimini ve terminal heteroreseptör mekanizmasını hatırlayın.",
          ar: "تذكر التفاعل المتبادل بين السيروتونين والدوبامين في الجسم المخطط عبر المستقبلات غير المتجانسة.",
          en: "Recall the cross-talk between serotonin and dopamine on striatal terminals via presynaptic heteroreceptors."
        },
        {
          tier: 2,
          tr: "5-HT2A reseptörleri kapandığında striatal sinapstaki endojen dopamin konsantrasyonu artar mı, azalır mı?",
          ar: "عند إغلاق مستقبِلات 5-HT2A، هل يزداد تركيز الدوبامين الداخلي في المشبك المخططي أم ينخفض؟",
          en: "When 5-HT2A receptors are blocked, does endogenous dopamine concentration in the striatal synapse increase or decrease?"
        },
        {
          tier: 3,
          tr: "Artan lokal dopamin, D2 reseptörlerinde antipsikotikle yarışır ve striatal D2 doluluğunu %80 olan EPS sınırının altına çeker.",
          ar: "يتنافس الدوبامين المتزايد مع الدواء على مستقبِلات D2 ليخفض نسبة الإشغال تحت عتبة 80% المحفزة للأعراض الحركية.",
          en: "Elevated local dopamine competes with the antipsychotic at D2 receptors, keeping striatal occupancy below the critical 80% EPS threshold."
        }
      ],
      conceptCheck: {
        question: {
          tr: "Güçlü 5-HT2A blokajı striatal motor devrede dopamin iletimini nasıl korur?",
          ar: "كيف يحمي حظر 5-HT2A القوي النقل الدوباميني في الدائرة الحركية المخططية؟",
          en: "How does potent 5-HT2A blockade safeguard dopamine neurotransmission in the striatal motor circuit?"
        },
        options: [
          {
            id: "opt_correct",
            isCorrect: true,
            text: {
              tr: "Dopamin terminallerindeki serotonerjik freni kaldırarak lokal dopamin salınımını artırır ve D2 doluluğunu %80 EPS eşiğinin altında tutar.",
              ar: "يرفع كابح السيروتونين عن نهايات الدوبامين، مما يزيد تحرره محلياً لينافس الدواء ويبقي إشغال D2 دون عتبة 80%.",
              en: "It disinhibits dopamine terminals, increasing local dopamine release to compete with the antipsychotic and keep D2 occupancy below the 80% EPS threshold."
            },
            misconceptionFeedback: {
              tr: "Doğru! 5-HT2A antagonizması striatumda dopamin musluğunu açar; salınan dopamin D2 reseptöründe ilacı geriye iterek motor felci önler.",
              ar: "صحيح! يفتح حظر 5-HT2A صنبور الدوبامين في الجسم المخطط، لينافس الدواء عند D2 ويمنع الشلل الحركي.",
              en: "Correct! 5-HT2A antagonism lifts the serotonergic brake on striatal dopamine release; the newly released dopamine competes off the drug to avert EPS."
            }
          },
          {
            id: "opt_distr1",
            isCorrect: false,
            text: {
              tr: "D2 reseptörlerinin amino asit dizilimini mutasyona uğratarak onları D1 eksitatuar reseptörlerine dönüştürür.",
              ar: "يحدث طفرة في تسلسل الأحماض الأمينية لمستقبِلات D2 محولاً إياها إلى مستقبِلات D1 استثارية.",
              en: "It genetically mutates the amino acid sequence of D2 receptors, permanently transforming them into excitatory D1 receptors."
            },
            misconceptionFeedback: {
              tr: "Yanılgı: İlaçlar reseptör genetiğini veya amino asit dizilimini değiştirmez; D2 ve D1 farklı genler tarafından kodlanan ayrı proteinlerdir.",
              ar: "مفهوم خاطئ: لا تغير الأدوية جينات المستقبلات؛ فـ D1 و D2 بروتينان مستقلان مشفران بجينات مختلفة تماماً.",
              en: "Misconception: Drugs do not mutate receptor primary structures; D1 and D2 are distinct gene products whose downstream pathways cross-talk physiologically."
            }
          },
          {
            id: "opt_distr2",
            isCorrect: false,
            text: {
              tr: "Karaciğerde sitokrom P450 enzimlerini indükleyerek antipsikotik ilacın vücuttan saniyeler içinde atılmasını sağlar.",
              ar: "يحث إنزيمات السيتوكروم الكبدية P450 مما يؤدي إلى طرح مضاد الذهان من الجسم خلال ثوانٍ معدودة.",
              en: "It massively induces hepatic cytochrome P450 enzymes to clear the antipsychotic drug from the entire body within seconds."
            },
            misconceptionFeedback: {
              tr: "Yanılgı: CYP indüksiyonu günler veya haftalar alan transkripsiyonel bir süreçtir ve santral 5-HT2A/D2 farmakodinamik dengesiyle ilgisizdir.",
              ar: "مفهوم خاطئ: حث الإنزيمات يستغرق أياماً أو أسابيع ولا يفسر التوازن الدوائي الديناميكي المباشر في الدماغ.",
              en: "Misconception: Enzyme induction is a transcriptional process requiring days to weeks and does not explain acute central pharmacodynamic motor protection."
            }
          }
        ]
      }
    },
    {
      id: "pharm-mod6-les2-step-09",
      stage: "application",
      stageIndex: 9,
      type: "application",
      title: {
        tr: "Klinik Tuzak: Tardif Diskinezide Antikolinerjik Felaketi",
        ar: "فخ سريري: كارثة مضادات الكولين في خلل الحركة المتأخر",
        en: "Clinical Pitfall: The Anticholinergic Disaster in Tardive Dyskinesia"
      },
      prompt: {
        tr: "Sekiz yıldır tipik antipsikotik kullanan hastada tardif diskinezi (dil çıkarma, dudak şapırdatma) gelişir. Asistanın biperiden (antikolinerjik) verme önerisi neden felaketle sonuçlanır?",
        ar: "مريض يتناول مضاد ذهان نمطي لسنوات يصاب بخلل الحركة المتأخر. لماذا يُعد اقتراح إعطائه البيبيريدين المضاد للكولين كارثة سريرية؟",
        en: "A patient on long-term typical antipsychotics develops tardive dyskinesia. Why is the intern's proposal to administer biperiden (an anticholinergic) clinically catastrophic?"
      },
      config: {
        tardiveMechanism: "Kronik D2 blokajına yanıt olarak striatal D2 reseptörlerinin up-regülasyonu ve süpersensitivitesi.",
        anticholinergicRisk: "Asetilkolini baskılamak, zaten aşırı duyarlılaşmış dopamin egemenliğini kontrolsüz hale getirerek koreoatetoid hareketleri alevlendirir."
      },
      technicalTerms: [
        {
          term: "Tardif diskinezi (TD)",
          arContext: "خلل الحركة المتأخر (Tardive dyskinesia)"
        },
        {
          term: "Reseptör süpersensitivitesi",
          arContext: "فرط حساسية المستقبِلات (Receptor supersensitivity)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Akut distoni dopamin eksikliği ve asetilkolin fazlalığından kaynaklanır; peki ya yıllar süren kronik D2 blokajı reseptör sayısını nasıl değiştirir?",
          ar: "ينتج التشنج الحاد عن نقص الدوبامين؛ لكن كيف يغير الحظر المزمن لسنوات عدد مستقبلات D2 وحساسيتها؟",
          en: "Acute dystonia stems from dopamine deficiency and relative cholinergic excess; but what happens to receptor density after years of D2 blockade?"
        },
        {
          tier: 2,
          tr: "Yıllarca bloke edilen D2 reseptörleri kompanzasyon amacıyla sayıca artar (up-regülasyon) ve dopamine aşırı duyarlı (süpersensitif) hale gelir.",
          ar: "تتكاثر مستقبلات D2 المحظورة لسنوات تعويضياً (up-regulation) وتصبح مفرطة الحساسية لأي أثر دوباميني.",
          en: "Years of relentless blockade trigger compensatory receptor up-regulation and profound post-synaptic dopamine supersensitivity."
        },
        {
          tier: 3,
          tr: "Tardif diskinezide dopamin aşırı baskındır. Asetilkolini biperiden ile kapatırsanız, dopamin motor yolları tamamen ele geçirir ve istemsiz hareketler çılgınca artar.",
          ar: "في خلل الحركة المتأخر يسود الدوبامين؛ وإذا ألغيت الأسيتيل كولين بالبيبيريدين، يستفرد الدوبامين بالحركة لتتفاقم الحركات اللاإرادية بشدة.",
          en: "In tardive dyskinesia, dopamine signaling is supersensitive. If you suppress acetylcholine with biperiden, dopamine dominance surges, dramatically worsening involuntary choreiform movements."
        }
      ],
      conceptCheck: {
        question: {
          tr: "Yıllardır haloperidol kullanan hastada ortaya çıkan tardif diskinezi tablosuna biperiden verilirse ne olur ve rasyonel tedavi nedir?",
          ar: "ماذا يحدث إذا أُعطي البيبيريدين لمريض يعاني خلل الحركة المتأخر بعد سنوات من الهالوبيريدول، وما هو العلاج الرشيد؟",
          en: "What occurs if biperiden is administered for tardive dyskinesia after years of haloperidol, and what is the rational pharmacological strategy?"
        },
        options: [
          {
            id: "opt_correct",
            isCorrect: true,
            text: {
              tr: "Biperiden asetilkolini baskılayarak süpersensitif dopamin egemenliğini azdırır ve TD'yi ağırlaştırır; doğru yaklaşım ilacı Klozapine geçmek veya VMAT2 inhibitörü (Valbenazin) başlamaktır.",
              ar: "يثبط البيبيريدين الأسيتيل كولين مما يفاقم هيمنة الدوبامين مفرط الحساسية ويزيد الحالة سوءاً؛ والعلاج الرشيد هو التحويل للكلوزابين أو مثبط VMAT2 (فالبينارين).",
              en: "Biperiden suppresses acetylcholine, exacerbating supersensitive dopamine dominance and worsening TD; the rational approach is switching to clozapine or initiating a VMAT2 inhibitor (valbenazine)."
            },
            misconceptionFeedback: {
              tr: "Kritik klinik başarı! Akut distoninin ilacı olan antikolinerjikler, tardif diskinezide kesinlikle KONTRENDİKEDİR; VMAT2 inhibitörleri veziküler dopamini azaltarak aşırı duyarlı reseptörleri yatıştırır.",
              ar: "إنجاز سريري بالغ الأهمية! مضادات الكولين مضاد استطباب قاطع في خلل الحركة المتأخر؛ ومثبطات VMAT2 تستنفد الدوبامين الحويصلي لتهدئة المستقبِلات مفرطة الحساسية.",
              en: "Crucial clinical success! Anticholinergics that cure acute dystonia are strictly contraindicated in tardive dyskinesia; VMAT2 inhibitors deplete vesicular dopamine to quiet supersensitive D2 receptors."
            }
          },
          {
            id: "opt_distr1",
            isCorrect: false,
            text: {
              tr: "Biperiden tardif diskineziyi anında tamamen iyileştirir çünkü hastalık sadece çizgili kas liflerindeki kalsiyum kaçaklarından ibarettir.",
              ar: "يشفي البيبيريدين خلل الحركة المتأخر فوراً لأن المرض ناتج حصراً عن تسرب الكالسيوم في العضلات الهيكلية.",
              en: "Biperiden completely and instantly cures tardive dyskinesia because the disorder is purely a peripheral leakage of muscle calcium."
            },
            misconceptionFeedback: {
              tr: "Yanılgı: Tardif diskinezi bir periferik kalsiyum hastalığı değil, striatumdaki kronik D2 reseptör süpersensitivitesidir ve biperiden tabloyu kötüleştirir.",
              ar: "مفهوم خاطئ: ليس خلل الحركة مرض كالسيوم محيطي، بل هو فرط حساسية D2 مركزي مزمن، والبيبيريدين يزيده اشتعالاً.",
              en: "Misconception: Tardive dyskinesia is not a peripheral myopathy; it is central striatal D2 supersensitivity, and anticholinergics worsen involuntary movements."
            }
          },
          {
            id: "opt_distr2",
            isCorrect: false,
            text: {
              tr: "Haloperidol dozu iki katına çıkarılmalıdır; böylece süpersensitif reseptörlerin tamamı kovalent olarak parçalanır.",
              ar: "يجب مضاعفة جرعة الهالوبيريدول فوراً؛ لأن ذلك يؤدي إلى تفكيك كافة المستقبِلات مفرطة الحساسية تساهمياً.",
              en: "The haloperidol dose should be doubled immediately to covalently degrade and destroy all supersensitive D2 receptors."
            },
            misconceptionFeedback: {
              tr: "Yanılgı: Tipik antipsikotik dozunu artırmak kısa vadede semptomu maskelese de uzun vadede up-regülasyonu ve kalıcı beyin hasarını derinleştirir.",
              ar: "مفهوم خاطئ: رفع جرعة النمطي قد يخفي الأعراض مؤقتاً لكنه يرسخ فرط التحسس ويجعل التلف الحركي دائماً وغير عكوس.",
              en: "Misconception: Increasing the typical antipsychotic may transiently mask movements by re-blocking receptors, but rapidly drives even deeper irreversible supersensitivity."
            }
          }
        ]
      }
    },
    {
      id: "pharm-mod6-les2-step-10",
      stage: "retrieval",
      stageIndex: 10,
      type: "retrieval",
      title: {
        tr: "Geri Çağırma: Dört Yolak ve Klinik Yansımaları",
        ar: "استرجاع معرفي: المسارات الأربعة ومآلاتها السريرية",
        en: "Retrieval: Four Pathways and Clinical Repercussions"
      },
      prompt: {
        tr: "Dört dopamin yolağını gözünüzün önüne getirin: Antipsikotik etkinin, ekstrapiramidal motor yan etkilerin ve hiperprolaktineminin tetiklendiği yolakları sırasıyla eşleştirin.",
        ar: "استحضر المسارات الدوبامينية الأربعة: طابق بالترتيب المسار المسؤول عن الفعالية المضادة للذهان، والمسار الحركي، ومسار فرط برولاكتين الدم.",
        en: "Recall the four dopaminergic pathways: match in sequence the pathways responsible for antipsychotic efficacy, extrapyramidal motor side effects, and hyperprolactinemia."
      },
      config: {
        pathways: [
          { name: "Mezolimbik", effect: "Antipsikotik terapötik etki (Pozitif belirtilerin kontrolü)" },
          { name: "Nigrostriatal", effect: "Ekstrapiramidal motor yan etkiler (Distoni, Parkinsonizm, TD)" },
          { name: "Tuberoinfundibuler", effect: "Endokrin yan etkiler (Hiperprolaktinemi, galaktore, amenore)" },
          { name: "Mezokortikal", effect: "Bilişsel ve negatif belirtiler (Blokajda kötüleşme)" }
        ]
      },
      technicalTerms: [
        {
          term: "Terapötik hedef yolak",
          arContext: "المسار العلاجي المستهدف (Therapeutic target pathway)"
        },
        {
          term: "Galaktore ve amenore",
          arContext: "ثر الحليب وانقطاع الطمث (Galactorrhea and amenorrhea)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Ventral tegmental alandan limbik sisteme giden yolak hezeyan ve halüsinasyonları yönetir.",
          ar: "المسار الممتد من السقيفة البطنية إلى الجهاز الحافي هو المسؤول عن الهلاوس والضلالات.",
          en: "The pathway running from the ventral tegmental area to the limbic system governs delusions and hallucinations."
        },
        {
          tier: 2,
          tr: "Substantia nigra'dan dorsal striatuma uzanan yolak bazal ganglion motor koordinasyon merkezidir.",
          ar: "المسار الممتد من المادة السوداء إلى الجسم المخطط هو مركز التنسيق الحركي للعقد القاعدية.",
          en: "The projection from the substantia nigra to the dorsal striatum coordinates basal ganglia motor output."
        },
        {
          tier: 3,
          tr: "Sıralama: 1. Mezolimbik (Antipsikotik etki), 2. Nigrostriatal (Motor yan etkiler), 3. Tuberoinfundibuler (Hiperprolaktinemi).",
          ar: "الترتيب: 1. ميزولمبي (مضاد للذهان)، 2. مخطط حركي (أعراض حركية)، 3. قمعي (فرط برولاكتين الدم).",
          en: "Sequence: 1. Mesolimbic (antipsychotic efficacy), 2. Nigrostriatal (motor EPS), 3. Tuberoinfundibular (hyperprolactinemia)."
        }
      ]
    },
    {
      id: "pharm-mod6-les2-step-11",
      stage: "connection",
      stageIndex: 11,
      type: "connection",
      title: {
        tr: "Yeni Ufuklar: D2 Parsiyel Agonistleri ve Dopamin Termostatı",
        ar: "آفاق جديدة: ناهضات D2 الجزئية والمنظم الذكي للدوبامين",
        en: "New Horizons: D2 Partial Agonists & The Dopamine Thermostat"
      },
      prompt: {
        tr: "Aripiprazol gibi D2 parsiyel agonistleri hem mezolimbik hiperaktiviteyi dizginler hem de nigrostriatal motor sistemde tam felci önler. Bu moleküler 'akıllı termostat' davranışı nasıl çalışır?",
        ar: "تضبط ناهضات D2 الجزئية كالأريبيبرازول فرط النشاط الميزولمبي وتمنع الشلل الحركي. كيف يعمل هذا 'المنظم الجزيئي الذكي'؟",
        en: "Partial D2 agonists like aripiprazole dampen mesolimbic hyperactivity while preserving nigrostriatal motor tone. How does this molecular 'dopamine thermostat' function across different brain regions?"
      },
      config: {
        intrinsicActivity: "~%25-30 İntrinsik Aktivite",
        hyperdopaminergicState: "Mezolimbikte tam dopamin yerine geçerek aktiviteyi %100'den %30'a çeker (fonksiyonel antagonist).",
        hypodopaminergicState: "Korteks ve striatumda dopamin yokluğunda taban aktiviteyi %0'dan %30'a yükseltir (fonksiyonel agonist)."
      },
      technicalTerms: [
        {
          term: "Parsiyel agonist",
          arContext: "ناهض جزئي (Partial agonist)"
        },
        {
          term: "İntrinsik aktivite (Emax)",
          arContext: "الفعالية الذاتية (Intrinsic activity)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Parsiyel agonist, tam agonistin (%100 aktivite) bulunduğu ortamda antagonist gibi, hiç agonist olmayan ortamda ise zayıf bir agonist gibi davranır.",
          ar: "يتصرف الناهض الجزئي كحاصر في بيئة مليئة بالناهض الكامل، وكناهض ضعيف حين يغيب الناهض الأصلي.",
          en: "A partial agonist acts like an antagonist in the presence of full agonist, but like an agonist when endogenous tone is absent."
        },
        {
          tier: 2,
          tr: "Mezolimbik yolda dopamin fırtınası varken aripiprazol reseptöre oturup aktiviteyi yaklaşık %30 seviyesine kilitler.",
          ar: "في المسار الميزولمبي المشتعل بالدوبامين، يستقر الأريبيبرازول على المستقبِل ليثبت النشاط عند نحو 30%.",
          en: "In a mesolimbic pathway flooded with dopamine, aripiprazole binds and clamps receptor activity at roughly 30%."
        },
        {
          tier: 3,
          tr: "Nigrostriatal yolda ve hipofizde bu %30'luk bazal aktivite, prolaktin fırlamasını ve motor kilitlenmeyi önleyecek kadar yeterli uyarım sağlar.",
          ar: "في المسار الحركي والنخامية، يكفي هذا النشاط القاعدي بنسبة 30% لمنع جمود الحركة ومنع انفجار هرمون الحليب.",
          en: "In the nigrostriatal circuit and pituitary, this 30% intrinsic signal provides just enough stimulation to avert parkinsonism and prolactin surges."
        }
      ]
    },
    {
      id: "pharm-mod6-les2-step-12",
      stage: "mastery_check",
      stageIndex: 12,
      type: "mastery_check",
      title: {
        tr: "Ustalık Sınavı: Dirençli Olgu ve Rasyonel İlaç Değişimi",
        ar: "اختبار الإتقان: حالة سريرية معقدة وتبديل دوائي رشيد",
        en: "Mastery Check: Complex Clinical Vignette & Rational Drug Switch"
      },
      prompt: {
        tr: "Haloperidol kullanan hastada hiperprolaktinemi, tremor ve negatif semptomlar gelişir. Hem psikozu kontrol altında tutup hem de bu üç yan etkiyi düzelten en rasyonel geçiş nedir?",
        ar: "مريضة هالوبيريدول تعاني فرط برولاكتين الدم، ورعاشاً، وأعراضاً سلبية. ما التبديل الدوائي الأكثر رشاقة للسيطرة على الذهان وعكس الآثار الثلاثة؟",
        en: "A patient on haloperidol develops hyperprolactinemia, parkinsonian tremor, and emotional blunting. Which pharmacological switch maintains antipsychotic efficacy while reversing all three adverse effects?"
      },
      config: {},
      technicalTerms: [
        {
          term: "Rasyonel antipsikotik rotasyonu",
          arContext: "التبديل الرشيد لمضادات الذهان (Rational antipsychotic rotation)"
        },
        {
          term: "Tuberoinfundibuler koruma",
          arContext: "حماية المسار القمعي النخامي (Tuberoinfundibular preservation)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Hastada hem nigrostriatal (tremor), hem tuberoinfundibuler (prolaktin), hem de mezokortikal (negatif belirti) sorunlar bir arada bulunmaktadır.",
          ar: "تعاني المريضة من اجتماع مشكلات حركية (رعاش)، ونخامية (برولاكتين)، وقشرية (أعراض سلبية) معاً.",
          en: "The patient simultaneously exhibits nigrostriatal (tremor), tuberoinfundibular (prolactin), and mesocortical (negative symptoms) dysfunctions."
        },
        {
          tier: 2,
          tr: "Seçeceğiniz molekül hipofizde D2 reseptörlerini tamamen tıkamamalı ve mezokortikal dopamin tonusunu serbest bırakmalıdır.",
          ar: "يجب ألا يغلق الجزيء المختار مستقبلات D2 النخامية تماماً، بل عليه تحرير نغمة الدوبامين القشرية الجبهية.",
          en: "The chosen molecule must avoid complete D2 blockade in the pituitary and must liberate prefrontal cortical dopamine tone."
        },
        {
          tier: 3,
          tr: "D2 parsiyel agonisti olan Aripiprazol, hipofiz ve striatuma %30 intrinsik uyarı vererek prolaktini ve tremoru düzeltirken, 5-HT2A antagonizmasıyla negatif belirtileri hafifletir.",
          ar: "يقدم الأريبيبرازول كناقض جزئي لـ D2 تنبيهاً ذاتياً بنسبة 30% يعيد البرولاكتين والحركة لطبيعتهما، بينما يخفف حظر 5-HT2A الأعراض السلبية.",
          en: "Aripiprazole, a D2 partial agonist with 5-HT2A antagonism, provides ~30% intrinsic drive to normalize prolactin and motor tone while easing negative symptoms."
        }
      ],
      conceptCheck: {
        question: {
          tr: "Haloperidole bağlı ağır hiperprolaktinemi ve parkinsonizm geliştiren hastada en fizyolojik ve rasyonel tedavi stratejisi hangisidir?",
          ar: "ما هي الاستراتيجية الدوائية الأكثر فسيولوجية ورشاقة لمريضة تعاني فرط برولاكتين الدم والباركنسونية الناجمة عن الهالوبيريدول؟",
          en: "Which therapeutic strategy represents the most physiologically rational approach for a patient suffering severe haloperidol-induced hyperprolactinemia and parkinsonism?"
        },
        options: [
          {
            id: "opt_correct",
            isCorrect: true,
            text: {
              tr: "Aripiprazole geçmek: D2 parsiyel agonist etkisiyle hipofiz ve striatuma gereken bazal uyarımı sağlayarak prolaktini ve tremoru sıfırlar, 5-HT2A antagonizmasıyla psikozu dengeler.",
              ar: "التحويل للأريبيبرازول: حيث يوفر نشاطه كناقض جزئي لـ D2 التنبيه القاعدي للنخامية والمسار الحركي ليعيد البرولاكتين والحركة، مع ضبط الذهان.",
              en: "Switch to Aripiprazole: its D2 partial agonism supplies critical basal tone in the pituitary and striatum to resolve hyperprolactinemia and tremor, while stabilizing psychosis."
            },
            misconceptionFeedback: {
              tr: "Tam puan! Aripiprazol hipofizde adeta dopamin gibi davranarak prolaktin salınımını yeniden baskılar ve striatumda kas kilitlenmesini çözer.",
              ar: "علامة كاملة! يتصرف الأريبيبرازول في النخامية كدوبامين فيعيد كبح البرولاكتين، ويفك التصلب الحركي في الجسم المخطط.",
              en: "Full marks! Aripiprazole acts as functional dopamine in the pituitary to re-inhibit prolactin, while freeing striatal circuits from rigid blockade."
            }
          },
          {
            id: "opt_distr1",
            isCorrect: false,
            text: {
              tr: "Haloperidol dozunu 20 mg'a çıkarmak ve yanına yüksek doz bromokriptin (dopamin agonisti) eklemek.",
              ar: "مضاعفة جرعة الهالوبيريدول إلى 20 مغ مع إضافة جرعة عالية من البروموكريبتين (ناهض دوباميني كامل).",
              en: "Double the haloperidol dose to 20 mg and co-administer high-dose bromocriptine (a full dopamine agonist)."
            },
            misconceptionFeedback: {
              tr: "Yanılgı: Haloperidolü artırmak motor hasarı derinleştirir; üstüne bromokriptin eklemek ise mezolimbik yoldaki psikotik halüsinasyonları şiddetle yeniden alevlendirir.",
              ar: "مفهوم خاطئ: مضاعفة الهالوبيريدول تعمق التلف الحركي؛ وإضافة البروموكريبتين ستفجر الهلاوس والذهان ميزولمبياً من جديد.",
              en: "Misconception: Escalating haloperidol deepens motor damage; adding full-agonist bromocriptine reignites psychotic hallucinations in the mesolimbic circuit."
            }
          },
          {
            id: "opt_distr2",
            isCorrect: false,
            text: {
              tr: "Risperidona geçmek, çünkü tüm ikinci kuşak atipik antipsikotikler kan-hipofiz bariyeri nedeniyle prolaktini asla yükseltmez.",
              ar: "التحويل للريسبيريدون، لأن مضادات الذهان غير النمطية بأكملها لا ترفع البرولاكتين مطلقاً بسبب الحاجز الدموي النخامي.",
              en: "Switch to Risperidone, because all second-generation atypicals are completely devoid of prolactin-elevating potential due to the blood-pituitary barrier."
            },
            misconceptionFeedback: {
              tr: "Kritik Yanılgı: Risperidon atipikler arasındaki en büyük istisnadır! Hipofiz kan-beyin bariyeri dışındadır ve risperidon tıpkı tipikler gibi çok şiddetli hiperprolaktinemi yapar.",
              ar: "فخ سريري شهير: الريسبيريدون هو الاستثناء الأكبر بين اللانمطيات! فالنخامية خارج الحاجز الدماغي، والريسبيريدون يرفع البرولاكتين بشدة كالأدوية النمطية.",
              en: "Critical Misconception: Risperidone is the notorious exception among atypicals! The pituitary lies outside the BBB, and risperidone causes potent prolactin surges comparable to typicals."
            }
          }
        ]
      }
    }
  ]
};

const targetPath = path.resolve(__dirname, '../courses/pharmacology/lessons/lesson-12.json');
fs.writeFileSync(targetPath, JSON.stringify(lesson12, null, 2), 'utf8');
console.log(`Successfully written lesson-12.json to: ${targetPath}`);
