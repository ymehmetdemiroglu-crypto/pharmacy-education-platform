const fs = require('fs');
const path = require('path');

function wordCount(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

function validateWords(stepIdx, field, obj) {
  ['en', 'tr', 'ar'].forEach(lang => {
    const text = obj[lang] || '';
    const wc = wordCount(text);
    if (wc > 40) {
      throw new Error(`Step ${stepIdx} ${field} (${lang}) exceeds 40 words (${wc}): "${text}"`);
    }
  });
}

// -------------------------------------------------------------
// LESSON 11 DATA DEFINITIONS
// -------------------------------------------------------------
const l11Steps = [
  // Step 1: hook
  {
    prompt: {
      en: "A patient ingesting 40 diazepam tablets awakens safely, yet taking 10 phenobarbital tablets causes fatal respiratory arrest. Why do benzodiazepines have an insurmountable safety ceiling while barbiturates kill in overdose?",
      tr: "40 tablet diyazepam alan hasta güvenle uyanırken, 10 tablet fenobarbital alan hasta solunum arrestinden ölür. Benzodiyazepinler aşılmaz bir güvenlik tavanına sahipken barbitüratlar neden ölümcüldür?",
      ar: "يستيقظ مريض ابتلع 40 قرص ديازيبام بأمان، بينما 10 أقراص فينوباربيتال تسبب توقفاً تنفسياً مميتاً. لماذا تمتلك البنزوديازيبينات سقف أمان منيعاً بينما تقتل الباربيتورات؟"
    },
    options: [
      {
        id: "opt_pam_vs_pore",
        text: {
          en: "Benzodiazepines are pure allosteric modulators requiring endogenous GABA, whereas barbiturates directly gate the chloride pore at high concentrations.",
          tr: "Benzodiyazepinler endojen GABA'ya muhtaç saf allosterik modülatörlerdir; barbitüratlar ise yüksek dozda klorür kanalını doğrudan açarlar.",
          ar: "البنزوديازيبينات معدلات تفارغية نقية تتطلب GABA داخلياً، بينما تفتح الباربيتورات قناة الكلوريد مباشرة عند التراكيز العالية."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! BZDs only increase GABA gating frequency and cannot open the pore alone. High-dose barbiturates directly gate chloride influx without GABA.",
          tr: "Doğru! BZD'ler sadece GABA varlığında açılma frekansını artırır. Barbitüratlar ise GABA olmadan da kanalı açarak solunumu durdurur.",
          ar: "صحيح! تزيد البنزوديازيبينات تردد الفتح بوجود GABA فقط، بينما تفتح الباربيتورات القناة مباشرة دون الحاجة لـ GABA مسببة شللاً تنفسياً."
        }
      },
      {
        id: "opt_hepatic_saturation",
        text: {
          en: "Diazepam undergoes saturable hepatic first-pass metabolism that limits toxic systemic drug delivery to medullary respiratory centers.",
          tr: "Diyazepam, medüller solunum merkezlerine toksik ilaç ulaşımını sınırlayan doymuş hepatik ilk geçiş metabolizmasına uğrar.",
          ar: "يخضع الديازيبام لاستقلاب كبدي أولي مشبع يحد من وصول الدواء السام إلى مراكز التنفس النخاعية."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Diazepam has high systemic bioavailability; its safety ceiling is purely pharmacodynamic (GABA dependence), not pharmacokinetic clearance saturation.",
          tr: "Yanlış. Diyazepamın güvenliği farmakokinetik klirens satürasyonundan değil, tamamen GABA'ya bağımlı farmakodinamik tavandan kaynaklanır.",
          ar: "غير صحيح. سلامة الديازيبام تنبع من آلية ديناميكية دوائية (الاعتماد الإجباري على GABA) وليس من تشبع الاستقلاب الكبدي."
        }
      },
      {
        id: "opt_receptor_endocytosis",
        text: {
          en: "High-dose benzodiazepines trigger immediate clathrin-mediated endocytosis of GABA-A receptors, desensitizing neurons to further depression.",
          tr: "Yüksek doz benzodiyazepinler GABA-A reseptörlerinin klatrin aracılı endositozunu tetikleyerek nöronları depresyona karşı duyarsızlaştırır.",
          ar: "تحفز الجرعات العالية من البنزوديازيبين بلعمة فورية لمستقبلات GABA-A مما يزيل حساسية الخلايا العصبية."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Acute receptor endocytosis does not occur in minutes during overdose. Tolerance and uncoupling require days to weeks of chronic exposure.",
          tr: "Yanlış. Reseptör endositozu akut aşırı dozda dakikalar içinde oluşmaz; tolerans ve reseptör kopması kronik maruziyet gerektirir.",
          ar: "غير صحيح. لا تحدث بلعمة المستقبلات الحادة خلال دقائق من الجرعة المفرطة؛ بل تتطلب تحملاً واستخداماً مزمناً لأسابيع."
        }
      },
      {
        id: "opt_gaba_depletion",
        text: {
          en: "Benzodiazepines deplete vesicular GABA stores, self-limiting their own inhibitory action once endogenous neurotransmitter runs out.",
          tr: "Benzodiyazepinler veziküler GABA depolarını tüketerek, endojen nörotransmitter bittiğinde kendi inhibitör etkilerini sonlandırırlar.",
          ar: "تستنفد البنزوديازيبينات مخازن GABA الحويصلية، مما يحد من تأثيرها المثبط تلقائياً عند نفاذ الناقل."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Benzodiazepines do not stimulate vesicular release or exhaust GABA stores. They allosterically enhance postsynaptic responsiveness to GABA.",
          tr: "Yanlış. Benzodiyazepinler veziküler GABA salınımını veya tükenmesini tetiklemez; sadece postsinaptik reseptörün GABA'ya yanıtını artırırlar.",
          ar: "غير صحيح. لا تستنزف البنزوديازيبينات حويصلات GABA، بل تعزز استجابة المستقبل البعد مشبكي للناقل الموجود تفارغياً."
        }
      }
    ]
  },

  // Step 2: question
  {
    prompt: {
      en: "Can a ligand at the GABA-A receptor gate the chloride channel in the complete absence of GABA? How do benzodiazepines and barbiturates behave under this condition?",
      tr: "GABA-A reseptöründeki bir ligand, ortamda hiç GABA yokken klorür kanalını açabilir mi? Benzodiyazepinler ve barbitüratlar bu kuralda nasıl ayrışır?",
      ar: "هل يمكن لربيطة عند مستقبل GABA-A أن تفتح قناة الكلوريد في الغياب التام لـ GABA؟ كيف يفترق سلوك البنزوديازيبينات والباربيتورات؟"
    },
    options: [
      {
        id: "opt_direct_gating_diff",
        text: {
          en: "Diazepam produces zero chloride conductance without GABA, whereas barbiturates at anesthetic concentrations directly gate the open pore.",
          tr: "Diyazepam ortamda GABA yokken sıfır klorür iletimi sağlar; barbitüratlar ise anestezik dozlarda kanalı doğrudan açarlar.",
          ar: "لا ينتج الديازيبام أي توصيل للكلوريد بغياب GABA، بينما تفتح الباربيتورات القناة مباشرة بتراكيزها التخديرية."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! BZDs lack intrinsic efficacy to open the pore alone. Barbiturates possess direct GABA-mimetic gating capability at high doses.",
          tr: "Doğru! BZD'ler tek başlarına kanalı açacak intrensek etkiye sahip değildir; barbitüratlar ise yüksek dozda doğrudan kanal açıcıdır.",
          ar: "صحيح! تفتقر البنزوديازيبينات للقدرة على فتح القناة بمفردها، بينما تمتلك الباربيتورات تأثيراً محاكياً مباشراً لـ GABA."
        }
      },
      {
        id: "opt_both_orthosteric",
        text: {
          en: "Both drugs act as orthosteric agonists that open the channel identically, differing solely in their dissociation equilibrium constants (Kd).",
          tr: "Her iki ilaç da kanalı aynı şekilde açan ortosterik agonistlerdir, yalnızca ayrışma denge sabitleri (Kd) farklıdır.",
          ar: "كلا الدواءين ناهضان متماثلان في الموقع الأصلي يفتحان القناة، والاختلاف الوحيد بينهما هو ثابت التفكك (Kd)."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Neither drug binds the orthosteric GABA pocket. They bind distinct allosteric sites, but barbiturates can directly gate the pore.",
          tr: "Yanlış. İki ilaç da ortosterik GABA cebine bağlanmaz. Farklı allosterik bölgelere bağlanırlar ancak barbitüratlar doğrudan gözenek açabilir.",
          ar: "غير صحيح. لا يرتبط أي منهما بموقع GABA الأصلي، بل يرتبطان بمواقع تفارغية متمايزة، وتنفرد الباربيتورات بفتح القناة مباشرة."
        }
      },
      {
        id: "opt_pore_block_misconception",
        text: {
          en: "Barbiturates block the channel lumen while benzodiazepines allow inward chloride flow only when phosphorylated by protein kinase A.",
          tr: "Barbitüratlar kanal lümenini tıkar; benzodiyazepinler ise sadece protein kinaz A ile fosforillendiğinde klorür girişine izin verir.",
          ar: "تسد الباربيتورات لمعة القناة بينما تسمح البنزوديازيبينات بدخول الكلوريد فقط عند فسفرتها ببروتين كيناز A."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Barbiturates enhance and gate chloride influx rather than blocking it (picrotoxin blocks the pore lumen).",
          tr: "Yanlış. Barbitüratlar kanalı tıkamaz, klorür akışını açarlar (kanal lümenini tıkayan pikrotoksindir).",
          ar: "غير صحيح. تعزز الباربيتورات تدفق الكلوريد ولا تسده (البيكروتوكسين هو من يسد لمعة القناة)."
        }
      },
      {
        id: "opt_covalent_locking",
        text: {
          en: "Both drugs require GABA, but barbiturates form an irreversible covalent adduct with the pore that prevents channel closure.",
          tr: "Her iki ilaç da GABA gerektirir, ancak barbitüratlar gözenek ile kovalent bağ kurarak kanalın kapanmasını kalıcı olarak engeller.",
          ar: "يتطلب كلاهما GABA، لكن الباربيتورات تشكل رابطة تساهمية غير عكوسة تمنع انغلاق القناة نهائياً."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Barbiturate binding is non-covalent and reversible. Their danger lies in direct GABA-independent pore gating at high doses.",
          tr: "Yanlış. Barbitürat bağlanması kovalent değil tersinirdir. Tehlikeleri, yüksek dozda GABA'dan bağımsız doğrudan kanal açabilmeleridir.",
          ar: "غير صحيح. ارتباط الباربيتورات غير تساهمي وعكوس؛ مكمن الخطر هو فتحها المباشر للقناة دون الحاجة لـ GABA."
        }
      }
    ]
  },

  // Step 3: intuition
  {
    prompt: {
      en: "Picture the chloride channel as a bank vault: GABA is the key. Benzodiazepines oil the hinges so the key turns easily. What do barbiturates do at high doses?",
      tr: "Klorür kanalını bir banka kasası, GABA'yı da anahtar olarak hayal edin. Benzodiyazepin menteşeyi yağlar. Yüksek doz barbitüratlar ne yapar?",
      ar: "تخيل قناة الكلوريد كخزنة بنك وGABA كمفتاحها. تزيت البنزوديازيبينات المفصلات ليدور المفتاح بسهولة. ماذا تفعل الباربيتورات بالجرعات العالية؟"
    },
    options: [
      {
        id: "opt_crowbar_analogy",
        text: {
          en: "Barbiturates crowbar the vault door wide open, forcing chloride influx continuously even if the GABA key is completely absent.",
          tr: "Barbitüratlar kasa kapısını levye ile kırarak, GABA anahtarı hiç olmasa bile içeriye sürekli klorür akışı sağlarlar.",
          ar: "تخلع الباربيتورات باب الخزنة عنوة، مما يدفق الكلوريد باستمرار حتى وإن غاب مفتاح GABA تماماً."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Barbiturates prolong channel open duration and directly force the pore open at anesthetic concentrations without GABA.",
          tr: "Doğru! Barbitüratlar açık kalma süresini uzatır ve yüksek dozda GABA olmadan da kapıyı kırıp klorür akışı başlatırlar.",
          ar: "صحيح! تطيل الباربيتورات مدة بقاء القناة مفتوحة وتجبرها على الانفتاح دون GABA عند التراكيز التخديرية."
        }
      },
      {
        id: "opt_conductance_increase",
        text: {
          en: "Barbiturates widen the physical diameter of the chloride filter, multiplying single-channel conductance five-fold without altering gating time.",
          tr: "Barbitüratlar klorür filtresinin çapını genişleterek, açılma süresini değiştirmeden tek kanal iletkenliğini beş katına çıkarır.",
          ar: "توسع الباربيتورات القطر الفيزيائي لمرشح الكلوريد مضاعفة توصيل القناة المفردة 5 أضعاف دون تغيير زمن الفتح."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Barbiturates alter gating kinetics (open duration and direct opening) rather than increasing the physical diameter or single-channel conductance.",
          tr: "Yanlış. Barbitüratlar kanal çapını veya tekil iletkenliği artırmaz; açılma kinetiğini (süresini ve doğrudan açılmayı) değiştirir.",
          ar: "غير صحيح. تعدل الباربيتورات حركية الفتح (إطالة زمن الانفتاح والفتح المباشر) ولا توسع القطر الفيزيائي للقناة."
        }
      },
      {
        id: "opt_kinetic_inversion",
        text: {
          en: "Barbiturates purely increase opening frequency while benzodiazepines prolong single-channel burst open duration.",
          tr: "Barbitüratlar sadece açılma frekansını artırırken, benzodiyazepinler tek kanal patlama süresini uzatırlar.",
          ar: "تزيد الباربيتورات تردد الفتح فقط، بينما تطيل البنزوديازيبينات مدة بقاء القناة مفتوحة."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Classic pharmacological rule: Benzodiazepines increase opening FREQUENCY; Barbiturates prolong opening DURATION.",
          tr: "Yanlış. Klasik farmakoloji kuralı: Benzodiyazepinler açılma FREKANSINI artırır, Barbitüratlar ise açık kalma SÜRESİNİ uzatır.",
          ar: "غير صحيح. القاعدة الدوائية الشهيرة: تزيد البنزوديازيبينات تردد الفتح، بينما تطيل الباربيتورات زمن الانفتاح."
        }
      },
      {
        id: "opt_destroy_hinges",
        text: {
          en: "Barbiturates weld the vault door shut, preventing chloride ions from entering the neuron and producing osmotic lysis.",
          tr: "Barbitüratlar kasa kapısını kaynakla kapatır, klorür girişini engelleyerek nöronun ozmotik lizisine yol açar.",
          ar: "تلحم الباربيتورات باب الخزنة مغلقاً مما يمنع دخول الكلوريد ويؤدي إلى انحلال الخلية تناضحياً."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Barbiturates open the door and increase inhibitory chloride influx; they never seal or weld it shut.",
          tr: "Yanlış. Barbitüratlar kapıyı kaynaklamaz, aksine açarak aşırı inhibitör klorür girişine ve solunum arrestine yol açarlar.",
          ar: "غير صحيح. تفتح الباربيتورات القناة وتدفق الكلوريد المثبط؛ ولا توصد الباب أو تغلقه أبداً."
        }
      }
    ]
  },

  // Step 4: visual_explanation
  {
    prompt: {
      en: "The GABA-A receptor is a pentameric ($2\\alpha 2\\beta 1\\gamma$) chloride channel. Where do GABA and benzodiazepines bind, and what biophysical membrane event silences the neuron?",
      tr: "GABA-A reseptörü pentamerik ($2\\alpha 2\\beta 1\\gamma$) bir klorür kanalıdır. GABA ve benzodiyazepinler nereye bağlanır ve hangi biyofiziksel olay nöronu susturur?",
      ar: "مستقبل GABA-A قناة كلوريد خماسية الوحدات ($2\\alpha 2\\beta 1\\gamma$). أين يرتبط GABA والبنزوديازيبين، وما الحدث الحيوي الفيزيائي الذي يسكت العصبون؟"
    },
    options: [
      {
        id: "opt_pentamer_architecture",
        text: {
          en: "GABA binds at alpha/beta interfaces; benzodiazepines bind at the alpha/gamma interface. Influxing Cl- hyperpolarizes membrane potential from -70 to -85 mV.",
          tr: "GABA alfa/beta arayüzüne, benzodiyazepin alfa/gama arayüzüne bağlanır. Klor girişi zar potansiyelini -70'ten -85 mV'a hiperpolarize eder.",
          ar: "يرتبط GABA بأسطح التماس ألفا/بيتا، والبنزوديازيبين بسطح ألفا/غاما. يدفق الكلوريد لفرط استقطاب الغشاء من -70 إلى -85 ميلي فولت."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Two GABA molecules bind between alpha and beta subunits. BZDs bind between alpha and gamma, enhancing Cl- influx and hyperpolarization.",
          tr: "Doğru! GABA alfa/beta arasına, BZD ise alfa/gama arayüzüne bağlanır. Klor girişi zarı hiperpolarize ederek nöronda IPSP oluşturur.",
          ar: "صحيح! يرتبط جزيئا GABA بين ألفا وبيتا، ويرتبط البنزوديازيبين بين ألفا وغاما معززاً فرط الاستقطاب وتثبيط العصبون."
        }
      },
      {
        id: "opt_orthosteric_competition",
        text: {
          en: "Benzodiazepines compete directly with GABA at both alpha/beta interfaces, acting as partial agonists that displace endogenous neurotransmitter.",
          tr: "Benzodiyazepinler her iki alfa/beta arayüzünde GABA ile doğrudan yarışarak endojen nörotransmitterin yerini alan parsiyel agonistlerdir.",
          ar: "تنافس البنزوديازيبينات GABA مباشرة عند سطحي ألفا/بيتا، كناهضات جزئية تزيح الناقل العصبي الداخلي."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Benzodiazepines bind allosterically at the alpha/gamma interface, not the orthosteric alpha/beta GABA binding pocket.",
          tr: "Yanlış. Benzodiyazepinler ortosterik alfa/beta cebine değil, allosterik alfa/gama arayüzüne bağlanırlar.",
          ar: "غير صحيح. ترتبط البنزوديازيبينات تفارغياً عند سطح التماس ألفا/غاما وليس في جيب GABA الأصلي بين ألفا وبيتا."
        }
      },
      {
        id: "opt_pore_lumen_binding",
        text: {
          en: "Benzodiazepines bind inside the central pore lumen to physically pull the channel walls outward and enlarge the water-filled diameter.",
          tr: "Benzodiyazepinler merkezi kanal lümenine bağlanarak kanal duvarlarını fiziksel olarak çeker ve klorür çapını genişletir.",
          ar: "ترتبط البنزوديازيبينات داخل لمعة القناة المركزية لتسحب جدرانها فيزيائياً وتوسع قطرها المائي."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Channel lumen blockers like picrotoxin bind inside the pore. Benzodiazepines bind the extracellular domain at the alpha/gamma interface.",
          tr: "Yanlış. Kanal lümenine pikrotoksin gibi kanal blokörleri bağlanır; benzodiyazepinler ekstraselüler alfa/gama arayüzüne bağlanır.",
          ar: "غير صحيح. ترتبط حاصرات اللمعة (مثل البيكروتوكسين) داخل القناة، بينما يرتبط البنزوديازيبين بالنطاق الخارجي عند ألفا/غاما."
        }
      },
      {
        id: "opt_depolarization_confusion",
        text: {
          en: "Chloride influx depolarizes the neuronal membrane from -70 to 0 mV, provoking rapid inactivation of voltage-gated sodium channels.",
          tr: "Klorür girişi nöron zarını -70'ten 0 mV'a depolarize ederek voltaj kapılı sodyum kanallarını hızla inaktive eder.",
          ar: "يؤدي دخول الكلوريد إلى نزع استقطاب الغشاء من -70 إلى 0 ميلي فولت مما يعطل قنوات الصوديوم."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Anion (Cl-) influx drives the resting membrane potential more negative (hyperpolarization, -70 to -85 mV), moving it away from threshold.",
          tr: "Yanlış. Negatif klorür iyonlarının girişi zarı depolarize etmez; hiperpolarize ederek (-85 mV) aksiyon potansiyeli eşiğinden uzaklaştırır.",
          ar: "غير صحيح. تدفق أنيونات الكلوريد السالبة يفرط استقطاب الغشاء نحو مزيد من السلبية (-85 ميلي فولت) مبعداً إياه عن عتبة التنبيه."
        }
      }
    ]
  },

  // Step 5: interactive_artifact (DoseResponseCurve)
  {
    prompt: {
      en: "Observe the GABA concentration-response curve: add diazepam to witness the leftward shift, then add flumazenil to restore baseline.",
      tr: "Konsantrasyon-yanıt eğrisini izleyin: sola kaymayı görmek için diyazepam ekleyin, ardından başlangıç çizgisine dönmek için flumazenil verin.",
      ar: "راقب منحنى التركيز والاستجابة لـ GABA: أضف الديازيبام لمشاهدة الإزاحة نحو اليسار، ثم أضف الفلومازينيل لاستعادة خط الأساس."
    },
    options: null
  },

  // Step 6: guided_discovery
  {
    prompt: {
      en: "In the concentration-response curve, diazepam shifts the curve leftward (lowering EC50) without elevating baseline Emax. Why does this pharmacodynamic ceiling protect against fatal overdose?",
      tr: "Konsantrasyon-yanıt eğrisinde diyazepam EC50'yi düşürerek eğriyi sola kaydırır ancak Emax'ı artırmaz. Bu farmakodinamik tavan aşırı dozda neden hayat kurtarır?",
      ar: "يزيح الديازيبام منحنى التركيز والاستجابة يساراً (يخفض EC50) دون رفع Emax. لماذا يحمي هذا السقف الديناميكي الدوائي من الموت بالجرعة الزائدة؟"
    },
    options: [
      {
        id: "opt_gaba_ceiling_protects",
        text: {
          en: "Maximal inhibition is strictly limited by the finite amount of physiological GABA released, preventing uncontrolled hyperpolarization of respiratory pacemakers.",
          tr: "Maksimal inhibisyon sinapsa salınan fizyolojik GABA miktarı ile sınırlıdır; solunum merkezlerinin kontrolsüz baskılanması engellenir.",
          ar: "التثبيط الأعظمي مقيد بكمية GABA الفسيولوجية المفرزة، مما يمنع فرط الاستقطاب العشوائي لمراكز التنفس النخاعية."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Because PAMs require GABA, once all endogenous GABA is bound, no further hyperpolarization can occur regardless of BZD dose.",
          tr: "Doğru! PAM'lar GABA'ya muhtaçtır; salınan tüm GABA bağlandığında BZD dozu ne kadar artarsa artsın daha fazla klorür girişi olamaz.",
          ar: "صحيح! نظراً لأن المعدلات التفارغية تتطلب GABA، فبمجرد ارتباط كل GABA المفرز لا يمكن حدوث مزيد من التثبيط مهما زادت جرعة البنزوديازيبين."
        }
      },
      {
        id: "opt_full_agonist_confusion",
        text: {
          en: "Diazepam acts as an irreversible antagonist at high concentrations, automatically closing chloride channels when blood levels exceed therapeutic range.",
          tr: "Diyazepam yüksek konsantrasyonlarda irreversibl antagoniste dönüşerek, terapötik düzey aşıldığında klorür kanallarını otomatik kapatır.",
          ar: "يتحول الديازيبام لمناهض غير عكوس عند التراكيز العالية فيغلق قنوات الكلوريد تلقائياً عند تجاوز النطاق العلاجي."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Diazepam remains a positive allosteric modulator at all doses; it never converts into an antagonist or channel blocker.",
          tr: "Yanlış. Diyazepam tüm dozlarda pozitif allosterik modülatör kalır; asla antagoniste veya kanal blokörüne dönüşmez.",
          ar: "غير صحيح. يظل الديازيبام معدلاً تفارغياً إيجابياً عند جميع الجرعات، ولا ينقلب لمناهض أو حاصِر للقناة أبداً."
        }
      },
      {
        id: "opt_exceed_emax_belief",
        text: {
          en: "PAMs elevate Emax beyond 100% by recruiting voltage-gated potassium channels to assist in inhibitory hyperpolarization.",
          tr: "PAM'lar voltaj kapılı potasyum kanallarını da sürece dahil ederek Emax değerini %100'ün üzerine çıkarırlar.",
          ar: "ترفع المعدلات التفارغية Emax فوق 100% بتجنيد قنوات البوتاسيوم المعتمدة على الفولتية للمساعدة بالتثبيط."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. A pure PAM modulates only the receptor it binds; it does not recruit potassium channels or exceed the full agonist's maximal efficacy.",
          tr: "Yanlış. Saf bir PAM sadece kendi reseptörünü modüle eder; potasyum kanallarını aktive etmez veya Emax tavanını aşamaz.",
          ar: "غير صحيح. تعدل الربيطة التفارغية مستقبلها فقط، ولا تجند قنوات بوتاسيوم أو ترفع Emax فوق سقف الناقل الأصلي."
        }
      },
      {
        id: "opt_renal_clearance_ceiling",
        text: {
          en: "The ceiling effect is an artifact caused by rapid glomerular filtration exceeding receptor binding saturation.",
          tr: "Tavan etkisi, glomerüler filtrasyon hızının reseptör bağlanma doygunluğunu aşmasından kaynaklanan bir farmakokinetik yanılsamadır.",
          ar: "تأثير السقف مجرد وهم حركي دوائي ناجم عن تجاوز معدل الترشيح الكبيبي لإشباع الارتباط بالمستقبلات."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. The safety ceiling is intrinsic to receptor pharmacodynamics (absence of direct pore gating), not renal clearance.",
          tr: "Yanlış. Güvenlik tavanı böbrek atılımından değil, doğrudan kanal açamama şeklindeki reseptör farmakodinamiğinden kaynaklanır.",
          ar: "غير صحيح. ينبع سقف الأمان من الديناميكا الدوائية للمستقبل وغياب الفتح المباشر للقناة، وليس من الإطراح الكلوي."
        }
      }
    ]
  },

  // Step 7: formal_explanation
  {
    prompt: {
      en: "How do the molecular gating mechanisms of benzodiazepines and barbiturates fundamentally differ, and how does flumazenil interact with this system?",
      tr: "Benzodiyazepinler ve barbitüratların moleküler kanal açma mekanizmaları nasıl ayrışır ve flumazenil bu sistemle nasıl etkileşir?",
      ar: "كيف تختلف آليات الفتح الجزيئي للبنزوديازيبينات والباربيتورات، وكيف يتفاعل الفلومازينيل مع هذا النظام؟"
    },
    options: [
      {
        id: "opt_freq_dur_flumazenil",
        text: {
          en: "BZDs increase opening FREQUENCY; barbiturates prolong open DURATION and directly gate the pore. Flumazenil is a neutral antagonist at the BZD site.",
          tr: "BZD'ler açılma FREKANSINI artırır; barbitüratlar SÜREYİ uzatır ve doğrudan kanal açar. Flumazenil ise BZD bölgesinde nötral antagonisttir.",
          ar: "تزيد البنزوديازيبينات تردد الفتح؛ بينما تطيل الباربيتورات مدة الفتح وتفتح القناة مباشرة. الفلومازينيل مناهض محايد في موقع البنزوديازيبين."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! BZDs increase frequency (GABA-dependent); barbiturates prolong duration and directly gate pore. Flumazenil competitively blocks the BZD site.",
          tr: "Doğru! BZD frekansı artırır (GABA bağımlı), barbitürat süreyi uzatır ve doğrudan açar. Flumazenil BZD bölgesinde yarışmalı nötr antagonisttir.",
          ar: "صحيح! تزيد البنزوديازيبينات التردد، وتطيل الباربيتورات المدة وتفتح مباشرة. يعاكس الفلومازينيل موقع البنزوديازيبين تنافسياً."
        }
      },
      {
        id: "opt_flumazenil_inverse",
        text: {
          en: "Flumazenil acts as a negative allosteric modulator (inverse agonist) that closes chloride channels below basal constitutive activity.",
          tr: "Flumazenil, klorür kanallarını bazal düzeyin altına kapatan bir negatif allosterik modülatördür (invers agonisttir).",
          ar: "يعمل الفلومازينيل كمعدل تفارغي سلبي (ناهض عكسي) يغلق قنوات الكلوريد لما دون النشاط التكويني الأساسي."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Flumazenil is a NEUTRAL competitive antagonist with zero intrinsic efficacy; beta-carbolines (e.g. DMCM) are the inverse agonists.",
          tr: "Yanlış. Flumazenil intrensek etkisi sıfır olan NÖTRAL antagonisttir; klorür akışını bazalin altına düşüren invers agonistler beta-karbolinlerdir.",
          ar: "غير صحيح. الفلومازينيل مناهض تنافسي محايد بلا فاعلية ذاتية؛ أما من يخفض تدفق الكلوريد دون الأساس (ناهض عكسي) فهي البيتاركاربينات."
        }
      },
      {
        id: "opt_flumazenil_reverses_barbs",
        text: {
          en: "Flumazenil reverses barbiturate toxicity with high affinity by occupying the barbiturate-binding pocket inside the pore lumen.",
          tr: "Flumazenil, lümendeki barbitürat cebine yüksek afiniteyle bağlanarak barbitürat zehirlenmesini tamamen geri çevirir.",
          ar: "يعاكس الفلومازينيل سمية الباربيتورات بألفة عالية عبر احتلال جيب ارتباط الباربيتورات داخل لمعة القناة."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Flumazenil binds exclusively to the benzodiazepine site (alpha/gamma interface) and CANNOT reverse barbiturate toxicity.",
          tr: "Yanlış. Flumazenil sadece benzodiyazepin bölgesine bağlanır; barbitürat zehirlenmesini ASLA geri döndüremez.",
          ar: "غير صحيح. يرتبط الفلومازينيل حصرياً بموقع البنزوديازيبين (ألفا/غاما) ولا يعاكس إطلاقاً سمية الباربيتورات."
        }
      },
      {
        id: "opt_enzymatic_degradation",
        text: {
          en: "Flumazenil acts as an enzyme that catalytically hydrolyzes the 1,4-diazepine ring of circulating benzodiazepines into inactive metabolites.",
          tr: "Flumazenil, kandaki benzodiyazepinlerin 1,4-diazepin halkasını hidroliz ederek inaktive eden bir enzimdir.",
          ar: "يعمل الفلومازينيل كإنزيم يحلمئ حلقة 1,4-ديازيبين في البنزوديازيبينات الدورية إلى نواتج استقلاب غير فعالة."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Flumazenil is a competitive receptor antagonist that binds reversibly to the GABA-A receptor, not an enzyme.",
          tr: "Yanlış. Flumazenil bir enzim değil, reseptöre tersinir bağlanan yarışmalı bir reseptör antagonistidir.",
          ar: "غير صحيح. الفلومازينيل ربيطة مناهضة تنافسية ترتبط بالمستقبل عكوسياً وليس إنزيماً مفككاً للدواء."
        }
      }
    ]
  },

  // Step 8: concept_check
  {
    prompt: {
      en: "Why is administering flumazenil strictly contraindicated in an unconscious overdose patient suspected of mixed tricyclic antidepressant (TCA) and benzodiazepine ingestion?",
      tr: "Bilinçsiz bir aşırı doz hastasında trisiklik antidepresan (TSA) ve benzodiyazepin karma alımı şüphesinde flumazenil uygulanması neden kesinlikle kontrendikedir?",
      ar: "لماذا يُمنع إعطاء الفلومازينيل منعاً باتاً لمريض فاقد الوعي يُشتبه بتناوله جرعة مفرطة مختلطة من مضادات الاكتئاب ثلاثية الحلقات والبنزوديازيبين؟"
    },
    options: [
      {
        id: "opt_tca_unmask_seizure",
        text: {
          en: "Removing the anticonvulsant BZD tone unmasks TCA-induced sodium channel and GABA blockade, triggering intractable status epilepticus and lethal arrhythmias.",
          tr: "BZD'nin koruyucu antikonvülsan etkisinin kalkması, TSA'nın sodyum ve GABA blokajını açığa çıkararak dirençli status epileptikus ve ölümcül aritmiye yol açar.",
          ar: "تجريد الحماية المضادة للاختلاج للبنزوديازيبين يكشف حظر قنوات الصوديوم وGABA بواسطة TCA، مفجراً حالة صرعية معندة واضطرابات نظم قاتلة."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! TCAs lower seizure threshold. The co-ingested BZD protects against seizures. Flumazenil strips this shield, precipitating fatal status epilepticus.",
          tr: "Doğru! TSA'lar nöbet eşiğini düşürür. BZD nöbeti baskılar; flumazenil verilince koruyucu kalkan kalkar ve ölümcül status epileptikus patlak verir.",
          ar: "صحيح! تخفض TCA عتبة التشنج بينما يحمي البنزوديازيبين المريض؛ فإذا أزيل هذا الدرع بالفلومازينيل اشتعل الصرع واضطراب النظم المميت."
        }
      },
      {
        id: "opt_tca_precipitation",
        text: {
          en: "Flumazenil reacts chemically with circulating amitriptyline to form insoluble microcrystals that embolize pulmonary capillaries.",
          tr: "Flumazenil, kandaki amitriptilin ile kimyasal reaksiyona girerek pulmoner kapillerleri tıkayan çözünmez mikrokristaller oluşturur.",
          ar: "يتفاعل الفلومازينيل كيميائياً مع الأميتريبتيلين في الدم مشكلاً بلورات دقيقة غير ذوابة تسد الشعيرات الرئوية."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. The danger is a pharmacodynamic loss of seizure protection, not physical chemical precipitation in the bloodstream.",
          tr: "Yanlış. Tehlike kanda kristal oluşumu değil, nöbeti baskılayan farmakodinamik kalkanın aniden yok olmasıdır.",
          ar: "غير صحيح. مكمن الخطر ديناميكي دوائي يتمثل في زوال الحماية من الاختلاج، وليس ترسيباً كيميائياً في مجرى الدم."
        }
      },
      {
        id: "opt_tca_cyp_inhibition",
        text: {
          en: "Flumazenil potently inhibits hepatic CYP2D6, instantly doubling free circulating TCA concentrations within 60 seconds.",
          tr: "Flumazenil hepatik CYP2D6'yı güçlü şekilde inhibe ederek 60 saniye içinde serbest dolaşan TSA konsantrasyonunu iki katına çıkarır.",
          ar: "يثبط الفلومازينيل إنزيم CYP2D6 الكبدي بقوة مما يضاعف تراكيز TCA الحرة في الدوران خلال 60 ثانية."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Flumazenil has no clinically significant CYP inhibitory properties; the seizure storm is mediated at postsynaptic GABA-A receptors.",
          tr: "Yanlış. Flumazenil CYP enzimlerini inhibe etmez; nöbet fırtınası postsinaptik GABA-A reseptörlerinde korumanın kalkmasıyla oluşur.",
          ar: "غير صحيح. لا يمتلك الفلومازينيل خصائص تثبيط لـ CYP، بل تنفجر النوبات لزوال التثبيط عند مستقبلات GABA-A."
        }
      },
      {
        id: "opt_direct_cardiac_beta",
        text: {
          en: "Flumazenil directly stimulates cardiac beta-1 adrenergic receptors, worsening TCA-induced anticholinergic sinus tachycardia.",
          tr: "Flumazenil kardiyak beta-1 adrenerjik reseptörleri doğrudan uyararak TSA'ya bağlı sinüs taşikardisini kötüleştirir.",
          ar: "يحفز الفلومازينيل مستقبلات بيتا-1 الأدرينالية القلبية مباشرة مما يفاقم تسرع القلب الجيبي."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Flumazenil does not bind or stimulate beta-1 adrenergic receptors; arrhythmias stem from TCA-mediated fast sodium channel blockade.",
          tr: "Yanlış. Flumazenil beta reseptörleri uyarmaz; aritmiler TSA'nın kardiyak sodyum kanallarını bloke etmesinden kaynaklanır.",
          ar: "غير صحيح. لا يحفز الفلومازينيل مستقبلات بيتا؛ بل تنجم اضطرابات النظم عن حصار TCA لقنوات الصوديوم القلبية السريعة."
        }
      }
    ]
  },

  // Step 9: application
  {
    prompt: {
      en: "A patient with long-term lorazepam dependence receives flumazenil for procedural sedation reversal and abruptly develops status epilepticus. What cellular mechanism precipitated this crisis?",
      tr: "Uzun süredir lorazepam bağımlısı olan hastaya sedasyonu geri çevirmek için flumazenil verilir ve hasta aniden status epileptikusa girer. Hangi hücresel mekanizma bu krizi tetikledi?",
      ar: "مريض يعتمد مزمناً على اللورازيبام يُعطى فلومازينيل لإلغاء التهدئة الجراحية فيصاب بصرع معند مفاجئ. ما الآلية الخلوية التي فجرت هذه الكارثة؟"
    },
    options: [
      {
        id: "opt_uncoupling_glutamate_storm",
        text: {
          en: "Chronic BZD exposure uncouples GABA-A receptors and upregulates glutamate; displacing BZDs abruptly removes basal inhibition, unleashing a glutamate storm.",
          tr: "Kronik BZD kullanımı GABA-A reseptörlerini desensitize eder ve glutamatı artırır; flumazenil korumayı aniden kaldırınca kontrolsüz glutamat fırtınası başlar.",
          ar: "يؤدي التعرض المزمن للبنزوديازيبين لفصل المستقبلات وزيادة الغلوتامات؛ إزاحتها فجأة تزيل التثبيط مفجرة عاصفة استثارة غلوتاماتية."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Chronic BZDs cause receptor uncoupling and compensatory glutamatergic upregulation. Acute flumazenil precipitates catastrophic withdrawal seizures.",
          tr: "Doğru! Kronik kullanımda GABA tonusu körelmiş, glutamat artmıştır. Flumazenil verilince kalan son inhibisyon da kalkar ve nöbet patlar.",
          ar: "صحيح! يثبط الاستخدام المزمن كفاءة GABA ويرفع الغلوتامات تعويضياً؛ ويؤدي الفلومازينيل إلى إطلاق صرع انسحابي مهدد للحياة."
        }
      },
      {
        id: "opt_receptor_destruction",
        text: {
          en: "Flumazenil acts as a protease that irreversibly degrades and cleaves the alpha-1 subunit of GABA-A receptors from the neuronal membrane.",
          tr: "Flumazenil, GABA-A reseptörlerinin alfa-1 alt birimini nöron zarından geri dönüşsüz şekilde koparan bir proteaz gibi davranır.",
          ar: "يعمل الفلومازينيل كإنزيم بروتياز يحطم ويقطع تحت وحدة ألفا-1 لمستقبلات GABA-A من الغشاء العصبي بشكل غير عكوس."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Flumazenil is a reversible competitive antagonist, not a protease; it does not cleave or destroy receptor proteins.",
          tr: "Yanlış. Flumazenil bir proteaz değildir, reseptörleri parçalamaz; sadece tersinir yarışmalı antagonisttir.",
          ar: "غير صحيح. الفلومازينيل مناهض تنافسي عكوس وليس إنزيماً محللاً للبروتين؛ ولا يحطم المستقبلات."
        }
      },
      {
        id: "opt_hypocalcemia_seizure",
        text: {
          en: "Flumazenil triggers massive parathyroid hormone suppression, provoking profound hypocalcemia and hypocalcemic tetanic convulsions within minutes.",
          tr: "Flumazenil paratiroid hormonunu baskılayarak dakikalar içinde şiddetli hipokalsemi ve hipokalsemik tetani nöbetlerine neden olur.",
          ar: "يحفز الفلومازينيل تثبيطاً هائلاً لهرمون جارات الدرق مسبباً نقص كالسيوم حاداً ونوبات كزازية خلال دقائق."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Flumazenil has no effect on calcium homeostasis or the parathyroid gland; seizures are purely neurochemical (loss of GABA inhibition).",
          tr: "Yanlış. Flumazenilin kalsiyum veya paratiroid üzerine etkisi yoktur; nöbet tamamen santral GABAerjik korumanın çökmesinden kaynaklanır.",
          ar: "غير صحيح. لا يؤثر الفلومازينيل على الكالسيوم أو الغدد الدريقية؛ بل تنجم النوبات عن زوال التثبيط العصبي الكيميائي."
        }
      },
      {
        id: "opt_conversion_to_toxin",
        text: {
          en: "Flumazenil chemically converts remaining lorazepam molecules into strychnine, a glycine receptor antagonist that triggers spinal convulsions.",
          tr: "Flumazenil, ortamdaki lorazepamı glisin antagonisti olan striknine dönüştürerek spinal konvülsiyonlara yol açar.",
          ar: "يحول الفلومازينيل جزيئات اللورازيبام كيميائياً إلى ستريكنين، وهو مناهض لمستقبلات الغلايسين يسبب اختلاجات نخاعية."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. This is chemically impossible. Withdrawal seizures stem from abrupt unmasking of hyperexcitable glutamate circuits.",
          tr: "Yanlış. Bu kimyasal olarak imkansızdır. Kriz, aşırı uyarılabilir glutamaterjik devrelerin aniden açığa çıkmasından kaynaklanır.",
          ar: "غير صحيح. هذا مستحيل كيميائياً. تنجم نوبات الانسحاب عن انكشاف مسارات الغلوتامات مفرطة الاستثارة."
        }
      }
    ]
  },

  // Step 10: retrieval
  {
    prompt: {
      en: "GABA-A alpha-1 subunits mediate sedation while alpha-2 and alpha-3 mediate anxiolysis and muscle relaxation. Why is zolpidem an effective hypnotic devoid of anxiolytic properties?",
      tr: "GABA-A alfa-1 alt birimi sedasyon sağlarken, alfa-2 ve alfa-3 anksiyoliz ve kas gevşemesi sağlar. Zolpidem neden anksiyolitik etkisi olmayan saf bir hipnotiktir?",
      ar: "تتوسط تحت وحدة ألفا-1 التهدئة، بينما تتوسط ألفا-2 وألفا-3 إزالة القلق وإرخاء العضلات. لماذا يعد الزولبيديم منوماً فعالاً بلا خصائص مزيلة للقلق؟"
    },
    options: [
      {
        id: "opt_alpha1_selectivity",
        text: {
          en: "Zolpidem binds selectively to alpha-1-containing GABA-A receptors, inducing sleep while lacking meaningful affinity for alpha-2 and alpha-3 subunits.",
          tr: "Zolpidem sadece alfa-1 içeren GABA-A reseptörlerine seçici bağlanarak uyku verir; alfa-2 ve alfa-3 alt birimlerine afinitesi yok denecek kadar azdır.",
          ar: "يرتبط الزولبيديم انتقائياً بمستقبلات GABA-A الحاوية على ألفا-1 محدثاً النوم، بينما يفتقر للألفة تجاه تحت الوحدتين ألفا-2 وألفا-3."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! The 'Z-drugs' are subunit-selective PAMs targeted to alpha-1 for hypnosis, sparing alpha-2/alpha-3 (anxiolysis) and alpha-5 (cognition).",
          tr: "Doğru! Z-ilaçları alfa-1 alt birimine seçicidir; bu yüzden hipnotik etki gösterirken belirgin kas gevşetici veya anksiyolitik etki oluşturmazlar.",
          ar: "صحيح! أدوية Z معدلات انتقائية لتحت وحدة ألفا-1 المسؤولة عن النوم، مجنبةً ألفا-2 وألفا-3 المسؤولة عن إزالة القلق."
        }
      },
      {
        id: "opt_melatonin_agonist",
        text: {
          en: "Zolpidem does not modulate GABA-A receptors, acting instead as a synthetic agonist at hypothalamic melatonin MT1 and MT2 GPCRs.",
          tr: "Zolpidem GABA-A reseptörlerini modüle etmez, hipotalamik melatonin MT1 ve MT2 GPCR reseptörlerinin sentetik agonistidir.",
          ar: "لا يعدل الزولبيديم مستقبلات GABA-A، بل يعمل كناهض تركيبي لمستقبلات الميلاتونين MT1 وMT2 في الوطاء."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Ramelteon targets melatonin MT1/MT2 receptors. Zolpidem is a selective GABA-A alpha-1 positive allosteric modulator.",
          tr: "Yanlış. Melatonin MT1/MT2 agonistleri ramelteondur. Zolpidem seçici bir GABA-A alfa-1 pozitif allosterik modülatörüdür.",
          ar: "غير صحيح. الراميلتيون هو ناهض مستقبلات الميلاتونين؛ أما الزولبيديم فهو معدل تفارغي إيجابي انتقائي لـ GABA-A ألفا-1."
        }
      },
      {
        id: "opt_beta3_only",
        text: {
          en: "Zolpidem targets beta-3 subunits exclusively, bypassing alpha subunits entirely to activate chloride gating without sedation.",
          tr: "Zolpidem yalnızca beta-3 alt birimine bağlanır, alfa alt birimlerini tamamen atlayarak sedasyon olmadan klorür açar.",
          ar: "يستهدف الزولبيديم تحت وحدة بيتا-3 حصرياً متجاوزاً تحت وحدات ألفا ليفتح الكلوريد دون تهدئة."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. The benzodiazepine binding pocket resides at the alpha/gamma interface, and zolpidem's selectivity is determined by the alpha-1 subunit.",
          tr: "Yanlış. BZD bağlanma cebi alfa/gama arayüzündedir ve zolpidemin seçiciliğini belirleyen alfa-1 alt birimidir.",
          ar: "غير صحيح. يقع جيب الارتباط عند سطح التماس ألفا/غاما، وتتحدد انتقائية الزولبيديم بوجود تحت وحدة ألفا-1."
        }
      },
      {
        id: "opt_identical_affinity_short_half_life",
        text: {
          en: "Zolpidem has identical affinity for all alpha subunits, but its extremely rapid 10-minute clearance prevents anxiolytic activation.",
          tr: "Zolpidem tüm alfa alt birimlerine eşit afinite gösterir, ancak 10 dakikalık aşırı hızlı klirensi anksiyolitik etkiyi önler.",
          ar: "يمتلك الزولبيديم ألفة متطابقة لجميع تحت وحدات ألفا، لكن إطراحه فائق السرعة خلال 10 دقائق يمنع إزالة القلق."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Zolpidem has a half-life of 2–3 hours and exhibits genuine molecular subtype selectivity for alpha-1 over alpha-2/alpha-3.",
          tr: "Yanlış. Zolpidemin yarı ömrü 2-3 saattir ve alfa-1 alt birimine karşı alfa-2/alfa-3'e kıyasla gerçek bir moleküler seçiciliği vardır.",
          ar: "غير صحيح. يمتلك الزولبيديم نصف عمر يبلغ ساعتين إلى 3 ساعات، وانتقائية جزيئية حقيقية لألفا-1 مقارنة بألفا-2 وألفا-3."
        }
      }
    ]
  },

  // Step 11: connection
  {
    prompt: {
      en: "While ionotropic GABA-A chloride channels mediate rapid millisecond inhibition, dopamine D2 GPCRs modulate cellular signaling via Gi. How do these two signaling architectures contrast?",
      tr: "İyonotropik GABA-A klorür kanalları milisaniyelik hızlı inhibisyon yaparken, dopamin D2 GPCR reseptörleri Gi ile sinyal iletir. Bu iki yapı nasıl ayrışır?",
      ar: "بينما تتوسط قنوات GABA-A الأيونية تثبيطاً سريعاً بالأجزاء من الثانية، تعدل مستقبلات D2 المقترنة ببروتين Gi الإشارات الخلوية. كيف تتباين بنيتا الإشارات؟"
    },
    options: [
      {
        id: "opt_ionotropic_vs_gpcr",
        text: {
          en: "GABA-A directly fluxes chloride to hyperpolarize the membrane; D2 inhibits adenylyl cyclase, lowers cAMP, and modulates downstream channels via G-protein second messengers.",
          tr: "GABA-A klorür geçirerek zarı doğrudan hiperpolarize eder; D2 adenilat siklazı inhibe eder, cAMP'yi düşürür ve G-proteini ile kanalları modüle eder.",
          ar: "يمرر GABA-A الكلوريد مباشرة لفرط استقطاب الغشاء؛ بينما يثبط D2 محلقة الأدينيلات، ويخفض cAMP، ويعدل القنوات عبر مرسال ثانٍ."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Ionotropic channels provide instant millisecond conductance changes; metabotropic GPCRs trigger slower, amplified second-messenger cascades.",
          tr: "Doğru! İyonotropik kanallar milisaniyede iyon akışı sağlar; metabotropik GPCR'ler ise hücre içi sinyal kaskadlarını kontrol eder.",
          ar: "صحيح! تحدث القنوات الأيونية تغيرات فورية بالتوصيل؛ بينما تفعل المستقبلات المرتبطة بالبروتين G شلالات أبطأ وأكثر تضخيماً."
        }
      },
      {
        id: "opt_d2_is_ligand_gated",
        text: {
          en: "Dopamine D2 receptors are ligand-gated chloride channels with five transmembrane subunits identical to GABA-A pentamers.",
          tr: "Dopamin D2 reseptörleri, GABA-A pentamerleri ile tamamen aynı beş transmembran alt birime sahip ligand kapılı klorür kanallarıdır.",
          ar: "مستقبلات الدوبامين D2 قنوات كلوريد مبوبة بالربيطة خماسية الوحدات متطابقة تماماً مع بنية GABA-A."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Dopamine D2 receptors are monomeric 7-transmembrane GPCRs, not ligand-gated pentameric ion channels.",
          tr: "Yanlış. Dopamin D2 reseptörleri iyon kanalı değil, 7 transmembranlı heptahelikal GPCR proteinleridir.",
          ar: "غير صحيح. مستقبلات الدوبامين D2 مستقبلات مقترنة بالبروتين G بـ 7 نطاقات عبر الغشاء وليست قنوات أيونية خماسية."
        }
      },
      {
        id: "opt_gaba_a_is_gq",
        text: {
          en: "GABA-A is coupled to Gq proteins that stimulate phospholipase C to trigger rapid intracellular calcium release.",
          tr: "GABA-A, fosfolipaz C'yi uyararak hızlı hücre içi kalsiyum salınımını tetikleyen Gq proteinlerine kenetlidir.",
          ar: "يقترن GABA-A ببروتينات Gq التي تحفز فوسفوليباز C لإطلاق الكالسيوم داخل الخلوي بسرعة."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. GABA-A is an ionotropic channel that fluxes chloride directly without any G-protein coupling.",
          tr: "Yanlış. GABA-A iyonotropik bir kanaldır; G-proteini kullanmaz, klorürü doğrudan içeri geçirir.",
          ar: "غير صحيح. مستقبل GABA-A قناة أيونية تمرر الكلوريد مباشرة دون أي اقتران ببروتين G."
        }
      },
      {
        id: "opt_gpcr_faster_than_ion_channel",
        text: {
          en: "GPCR signaling occurs in microseconds, fundamentally faster than ion channels because second messengers bypass physical membrane barriers.",
          tr: "GPCR sinyalizasyonu mikrosaniyeler içinde gerçekleşir, ikincil haberciler zar engellerini aştığı için iyon kanallarından çok daha hızlıdır.",
          ar: "تحدث إشارات GPCR في أجزاء من المليون من الثانية وهي أسرع جوهرياً من القنوات الأيونية لتجاوزها حواجز الغشاء."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Ion channels open in milliseconds (<1 ms). GPCR cascades require biochemical steps (GDP-GTP exchange, cAMP) taking hundreds of milliseconds to seconds.",
          tr: "Yanlış. İyon kanalları milisaniyede açılır; GPCR kaskadları ise biyokimyasal adımlar gerektirdiğinden yüzlerce milisaniye sürer.",
          ar: "غير صحيح. تفتح القنوات الأيونية خلال أجزاء من الألف من الثانية، بينما تتطلب شلالات GPCR خطوات كيميائية تستغرق ثوانٍ."
        }
      }
    ]
  },

  // Step 12: mastery_check (Transfer Challenge)
  {
    prompt: {
      en: "A comatose patient with suspected sedative overdose shows sinus tachycardia with QRS widening to 135 ms and terminal R wave in aVR. Why is IV flumazenil strictly contraindicated?",
      tr: "Sedatif aşırı doz şüphesi olan komadaki hastada sinüs taşikardisi, QRS'te 135 ms genişleme ve aVR'de terminal R dalgası saptanıyor. IV flumazenil neden kesinlikle kontrendikedir?",
      ar: "مريض بغيبوبة يُشتبه بتناوله مهدئات يظهر تسرع قلب جيبي، واتساع QRS إلى 135 ميلي ثانية وموجة R نهائية في aVR. لماذا يُمنع الفلومازينيل الوريدي منعاً باتاً؟"
    },
    options: [
      {
        id: "opt_tca_ecg_unmasking",
        text: {
          en: "The ECG reveals co-ingested TCA cardiotoxicity; flumazenil strips protective BZD anticonvulsant tone, unleashing refractory status epilepticus and lethal ventricular arrhythmias.",
          tr: "EKG eşlik eden TSA toksisitesini gösterir; flumazenil BZD'nin nöbet önleyici kalkanını kaldırarak dirençli status epileptikus ve ölümcül ventriküler aritmiyi tetikler.",
          ar: "يكشف التخطيط سمية قلبية مرافقة لمضادات الاكتئاب ثلاثية الحلقات؛ يجرد الفلومازينيل حماية البنزوديازيبين مفجراً حالة صرعية واضطرابات بطينية قاتلة."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Widened QRS (>100 ms) and prominent aVR R wave indicate TCA sodium channel blockade. BZDs suppress TCA seizures; flumazenil unleashes fatal convulsions.",
          tr: "Doğru! Geniş QRS (>100 ms) ve aVR'de R dalgası TSA sodyum kanal blokajını kanıtlar. BZD nöbeti baskılar; flumazenil verilirse ölümcül nöbet fırtınası başlar.",
          ar: "صحيح! يشير اتساع QRS وموجة R في aVR لحصار قنوات الصوديوم بواسطة TCA. يحمي البنزوديازيبين من النوبات؛ فإذا أزيل بالفلومازينيل حدثت الوفاة."
        }
      },
      {
        id: "opt_pure_barbiturate_reversal",
        text: {
          en: "The ECG indicates acute phenobarbital poisoning where flumazenil acts as a paradoxical agonist, deepening medullary coma and provoking immediate asystole.",
          tr: "EKG, flumazenilin paradoksal agonist olarak komayı derinleştirdiği ve asistoli yaptığı akut fenobarbital zehirlenmesine işaret eder.",
          ar: "يشير التخطيط لتسمم حاد بالفينوباربيتال حيث يعمل الفلومازينيل كناهض متناقض معمقاً الغيبوبة ومسبباً توقف القلب."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Barbiturate toxicity does not typically cause QRS widening, and flumazenil does not bind the barbiturate site or cause asystole.",
          tr: "Yanlış. Barbitürat zehirlenmesi tipik QRS genişlemesi yapmaz ve flumazenil barbitürat bölgesine bağlanmaz.",
          ar: "غير صحيح. لا يسبب التسمم بالباربيتورات اتساع QRS نوعياً، كما لا يرتبط الفلومازينيل بموقع الباربيتورات إطلاقاً."
        }
      },
      {
        id: "opt_mu_opioid_blockade",
        text: {
          en: "Flumazenil acts as a competitive antagonist at medullary mu-opioid receptors, precipitating severe pulmonary edema in patients with respiratory depression.",
          tr: "Flumazenil medüller mü-opioid reseptörlerinde yarışmalı antagonist gibi davranarak solunum depresyonlu hastada akut akciğer ödemi başlatır.",
          ar: "يعمل الفلومازينيل كمناهض تنافسي عند مستقبلات مو الأفيونية النخاعية مما يسبب وذمة رئوية حادة لدى مرضى التثبيط التنفسي."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Naloxone, not flumazenil, antagonizes opioid mu receptors. Flumazenil is completely inactive at opioid receptors.",
          tr: "Yanlış. Opioid mü reseptörlerini bloke eden naloksandır. Flumazenil opioid reseptörlerine bağlanmaz.",
          ar: "غير صحيح. النالوكسون هو من يعاكس مستقبلات مو الأفيونية؛ بينما الفلومازينيل غير فعال تماماً عند المستقبلات الأفيونية."
        }
      },
      {
        id: "opt_romk_hyperkalemia",
        text: {
          en: "Flumazenil directly blocks renal apical ROMK channels, driving serum potassium above 7.5 mEq/L and precipitating hyperkalemic ventricular arrest.",
          tr: "Flumazenil böbrek apikal ROMK kanallarını doğrudan bloke ederek serum potasyumunu 7.5 mEq/L üzerine çıkarır ve hiperkalemik arrest yapar.",
          ar: "يحظر الفلومازينيل قنوات ROMK الكلوية مباشرة رافعاً بوتاسيوم المصل فوق 7.5 ميلي مكافئ/لتر ومسبباً توقف القلب بفرط البوتاسيوم."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Flumazenil has no renal ion channel interactions; the life-threatening danger is removing seizure suppression during TCA co-ingestion.",
          tr: "Yanlış. Flumazenil böbrek kanallarını etkilemez; ölümcül tehlike TSA alımında nöbet kalkanının kalkmasıdır.",
          ar: "غير صحيح. لا يؤثر الفلومازينيل على القنوات الكلوية؛ بل الخطر القاتل هو إزالة كبح التشنجات أثناء التسمم المشترك بـ TCA."
        }
      }
    ]
  }
];


// -------------------------------------------------------------
// LESSON 12 DATA DEFINITIONS
// -------------------------------------------------------------
const l12Steps = [
  // Step 1: hook
  {
    prompt: {
      en: "Haloperidol rapidly quells auditory hallucinations in the mesolimbic pathway, yet within two hours violently twists the patient's neck and eyes. Why does blocking D2 trigger acute muscle dystonia?",
      tr: "Haloperidol mezolimbik yolda işitsel halüsinasyonları hızla dindirirken, iki saat içinde hastanın boynunu ve gözlerini şiddetle büker. D2 blokajı neden akut distoniye yol açar?",
      ar: "يخمد الهالوبيريدول الهلاوس السمعية ميزولمبياً بسرعة، لكنه بعد ساعتين يلوي عنق المريض وعينيه بعنف. لماذا يفجر حظر D2 خلل التوتر العضلي الحاد؟"
    },
    options: [
      {
        id: "opt_striatal_ach_surge",
        text: {
          en: "Blocking striatal D2 removes dopamine's tonic inhibitory brake on cholinergic interneurons, unleashing an unchecked acetylcholine surge that drives acute muscle dystonia.",
          tr: "Striatal D2 blokajı, dopaminin kolinerjik internöronlar üzerindeki inhibitör frenini kaldırarak aşırı asetilkolin deşarjına ve kas distonisine yol açar.",
          ar: "يزيل حظر D2 في المخطط كبح الدوبامين للخلية البينية الكولينية، مفرغاً تدفقاً هائلاً للأسيتيل كولين يقود لخلل التوتر العضلي الحاد."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! In the striatum, dopamine tonically inhibits acetylcholine release. Haloperidol removes this brake, producing an acute cholinergic spasm.",
          tr: "Doğru! Striatumda dopamin asetilkolini frenler. D2 blokajı bu freni kaldırarak kolinerjik fırtınaya ve akut distoniye neden olur.",
          ar: "صحيح! يكبح الدوبامين إفراز الأسيتيل كولين في المخطط؛ وحظر D2 يزيل هذا الكبح مفجراً تشنجاً كولينياً حاداً."
        }
      },
      {
        id: "opt_direct_nicotinic_stimulation",
        text: {
          en: "Haloperidol directly stimulates nicotinic acetylcholine receptors at peripheral neuromuscular junctions, triggering sustained muscle contraction.",
          tr: "Haloperidol periferik nöromüsküler kavşaktaki nikotinik asetilkolin reseptörlerini doğrudan uyararak kalıcı kas kasılması başlatır.",
          ar: "يحفز الهالوبيريدول مستقبلات الأسيتيل كولين النيكوتينية في الوصل العصبي العضلي المحيطي مباشرة مسبباً انقباضاً عضلياً."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Haloperidol does not bind peripheral nicotinic receptors; dystonia is a central striatal dopamine-acetylcholine imbalance.",
          tr: "Yanlış. Haloperidol periferik nikotinik reseptörlere bağlanmaz; distoni santral striatal dopamin-asetilkolin dengesizliğidir.",
          ar: "غير صحيح. لا يرتبط الهالوبيريدول بالمستقبلات النيكوتينية؛ بل خلل التوتر ناتج عن اختلال توازن الدوبامين والأسيتيل كولين في المخطط."
        }
      },
      {
        id: "opt_d1_agonist_belief",
        text: {
          en: "Striatal D2 receptors are Gs-coupled, and haloperidol acts as a full agonist that hyperactivates adenylyl cyclase to trigger spasms.",
          tr: "Striatal D2 reseptörleri Gs kenetlidir ve haloperidol spazm oluşturmak için adenilat siklazı aşırı uyaran bir tam agonisttir.",
          ar: "مستقبلات D2 مقترنة ببروتين Gs، ويعمل الهالوبيريدول كناهض تام يفرط في تنشيط محلقة الأدينيلات لإحداث التشنجات."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. D2 receptors are Gi-coupled, and haloperidol is a potent antagonist, not an agonist.",
          tr: "Yanlış. D2 reseptörleri Gi kenetlidir ve haloperidol agonist değil çok güçlü bir antagonisttir.",
          ar: "غير صحيح. مستقبلات D2 مقترنة ببروتين Gi المثبط، والهالوبيريدول مناهض قوي وليس ناهضاً."
        }
      },
      {
        id: "opt_hypocalcemia_belief",
        text: {
          en: "Haloperidol causes massive renal calcium wasting within two hours, producing severe hypocalcemic tetany resembling motor dystonia.",
          tr: "Haloperidol iki saat içinde böbrekten aşırı kalsiyum atılımına yol açarak motor distoniyi taklit eden şiddetli hipokalsemik tetani yapar.",
          ar: "يسبب الهالوبيريدول فقداناً كلوياً هائلاً للكالسيوم خلال ساعتين، محدثاً كزازاً بنقص الكالسيوم يشبه خلل التوتر الحركي."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Haloperidol has no direct effect on renal tubular calcium handling; acute dystonia is exclusively a central extrapyramidal side effect.",
          tr: "Yanlış. Haloperidol böbrek kalsiyum atılımını etkilemez; akut distoni tamamen santral ekstrapiramidal bir yan etkidir.",
          ar: "غير صحيح. لا يؤثر الهالوبيريدول على إطراح الكالسيوم الكلوي؛ بل خلل التوتر هو عرض جانبي حركي خارج هرمي مركزي."
        }
      }
    ]
  },

  // Step 2: question
  {
    prompt: {
      en: "Why does pure D2 receptor antagonism fail to effectively treat all schizophrenia symptoms simultaneously across the four major dopaminergic pathways?",
      tr: "Saf D2 reseptör antagonizması dört ana dopaminerjik yolakta neden tüm şizofreni semptomlarını aynı anda başarıyla tedavi edemez?",
      ar: "لماذا يفشل الحظر الخالص لمستقبلات D2 في علاج جميع أعراض الفصام في آن واحد عبر المسارات الدوبامينية الأربعة؟"
    },
    options: [
      {
        id: "opt_pathway_divergence",
        text: {
          en: "Blocking D2 treats mesolimbic positive symptoms, but worsens mesocortical negative symptoms, causes nigrostriatal EPS, and triggers tuberoinfundibular hyperprolactinemia.",
          tr: "D2 blokajı mezolimbik pozitif semptomları düzeltirken, mezokortikal negatif semptomları kötüleştirir, nigrostriatal EPS ve tüberoinfundibuler hiperprolaktinemi yapar.",
          ar: "حظر D2 يعالج إيجابيات الميزولمبيك، لكنه يفاقم سلبيات الميزوكورتيكال، ويسبب أعراضاً خارج هرمية بالمخطط، وفرط برولاكتين بالمسار القمعي."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! D2 blockade quells mesolimbic hyperactivity, but aggravates hypodopaminergic mesocortical states, causes EPS, and disinhibits prolactin.",
          tr: "Doğru! D2 blokajı mezolimbik hiperaktiviteyi dindirir; ancak kortikal negatif semptomları artırır, motor EPS ve prolaktin yüksekliği yapar.",
          ar: "صحيح! يخمد حظر D2 نشاط الميزولمبيك المفرط، لكنه يفاقم نقص الدوبامين القشري، ويسبب أعراضاً خارج هرمية، ويحرر إفراز البرولاكتين."
        }
      },
      {
        id: "opt_mesocortical_cure",
        text: {
          en: "Pure D2 blockade selectively stimulates cortical dopamine release, curing negative symptoms while sparing motor and pituitary pathways.",
          tr: "Saf D2 blokajı kortikal dopamin salınımını seçici uyararak motor ve hipofiz yollarını korurken negatif semptomları tamamen iyileştirir.",
          ar: "يحفز حظر D2 الخالص إفراز الدوبامين القشري انتقائياً، فيشفي الأعراض السلبية مجنباً المسارات الحركية والنخامية."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Pure D2 blockade further suppresses already deficient mesocortical dopamine signaling, worsening emotional blunting and apathy.",
          tr: "Yanlış. Saf D2 blokajı zaten yetersiz olan mezokortikal dopamini daha da bloke ederek negatif semptomları şiddetlendirir.",
          ar: "غير صحيح. يزيد حظر D2 الخالص من خنق إشارات الدوبامين القشرية الضعيفة أصلاً، مفاقماً التبلد الانفعالي والانعزال."
        }
      },
      {
        id: "opt_prolactin_suppression_belief",
        text: {
          en: "D2 blockade in the tuberoinfundibular pathway shuts down pituitary lactotrophs, leading to complete cessation of prolactin production.",
          tr: "Tüberoinfundibuler yolaktaki D2 blokajı hipofiz laktotrof hücrelerini susturarak prolaktin üretimini tamamen durdurur.",
          ar: "يعطل حظر D2 في المسار القمعي خلايا اللاكتوتروف النخامية مما يؤدي لتوقف تام في إنتاج هرمون البرولاكتين."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Dopamine tonically INHIBITS prolactin release. Blocking D2 removes this inhibition, causing profound HYPERprolactinemia.",
          tr: "Yanlış. Dopamin hipofizde prolaktin salınımını BASKILAR. D2 bloke edilince bu baskı kalkar ve HİPERprolaktinemi gelişir.",
          ar: "غير صحيح. يثبط الدوبامين إفراز البرولاكتين طبيعياً؛ وبالتالي فحظر D2 يرفع البرولاكتين بشدة (فرط برولاكتين الدم)."
        }
      },
      {
        id: "opt_bbb_exclusion_belief",
        text: {
          en: "Haloperidol cannot cross the blood-brain barrier into cortical regions, leaving mesocortical and nigrostriatal circuits completely untouched.",
          tr: "Haloperidol kan-beyin bariyerini geçip kortikal bölgelere ulaşamaz; mezokortikal ve nigrostriatal devreleri tamamen dokunulmamış bırakır.",
          ar: "يعجز الهالوبيريدول عن اختراق الحاجز الدموي الدماغي نحو المناطق القشرية، تاركاً مسارات الميزوكورتيكال والمخطط دون أي تأثير."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Haloperidol is highly lipophilic and readily distributes throughout the entire brain, occupying D2 receptors across all pathways.",
          tr: "Yanlış. Haloperidol yüksek oranda lipofiliktir, tüm beyne dağılır ve her dört yolaktaki D2 reseptörlerini de bloke eder.",
          ar: "غير صحيح. الهالوبيريدول شديد الذوبان بالدسم ويخترق الدماغ بأكمله محتلاً مستقبلات D2 في جميع المسارات."
        }
      }
    ]
  },

  // Step 3: intuition
  {
    prompt: {
      en: "PET studies reveal antipsychotic response begins at 65% D2 occupancy, while exceeding 80% triggers extrapyramidal motor toxicity. What does this narrow 15% window dictate clinically?",
      tr: "PET çalışmaları antipsikotik yanıtın %65 D2 doluluğunda başladığını, %80 aşılınca EPS motor toksisitesinin patlak verdiğini gösterir. Bu dar %15'lik pencere ne anlama gelir?",
      ar: "تكشف دراسات PET أن الاستجابة المضادة للذهان تبدأ عند إشغال 65% لـ D2، وتجاوز 80% يفجر السمية الحركية. ماذا يملي هذا الهامش الضيق سريرياً؟"
    },
    options: [
      {
        id: "opt_pet_window",
        text: {
          en: "Clinical antipsychotic efficacy requires at least 65% D2 occupancy, while exceeding 80% sharply unleashes extrapyramidal symptoms and hyperprolactinemia.",
          tr: "Antipsikotik etkinlik en az %65 D2 doluluğu gerektirirken, %80'in aşılması ekstrapiramidal semptomları ve hiperprolaktinemiyi hızla tetikler.",
          ar: "تتطلب الفعالية المضادة للذهان إشغال 65% على الأقل لـ D2، بينما يتسبب تجاوز 80% باندلاع حاد للأعراض خارج الهرمية وفرط البرولاكتين."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! The Nordström/Farde PET window proves that between 65% and 80% lies the sweet spot of efficacy without intolerable motor toxicity.",
          tr: "Doğru! Nordström ve Farde'nin PET çalışmaları, %65-80 aralığının motor toksisite olmadan klinik etkinlik sağlayan dar pencere olduğunu kanıtlar.",
          ar: "صحيح! أثبتت دراسات نوردستروم وفاردي أن نطاق 65-80% هو النافذة العلاجية المثلى للفعالية دون سمية حركية مفرطة."
        }
      },
      {
        id: "opt_total_blockade_needed",
        text: {
          en: "Antipsychotic efficacy requires 95% to 100% D2 occupancy to completely extinguish all dopaminergic firing in the frontal cortex.",
          tr: "Antipsikotik etkinlik, frontal korteksteki tüm dopaminerjik uyarıları tamamen söndürmek için %95 ila %100 D2 doluluğu gerektirir.",
          ar: "تتطلب الفعالية إشغال 95% إلى 100% لـ D2 لإخماد كافة الإشارات الدوبامينية في القشرة الجبهية نهائياً."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Near-total blockade (>90%) causes severe catatonia, neuroleptic malignant syndrome, and severe parkinsonism; 65% is sufficient.",
          tr: "Yanlış. %90'ın üzerindeki doluluk şiddetli parkinsonizm ve nöroleptik malign sendrom yaratır; antipsikotik etki için %65 yeterlidir.",
          ar: "غير صحيح. يسبب الإشغال شبه التام (>90%) جموداً حركياً خبيثاً وشللاً رعاشياً شديداً؛ ويكفي إشغال 65% للعلاج."
        }
      },
      {
        id: "opt_eps_at_low_occupancy",
        text: {
          en: "Extrapyramidal symptoms emerge at 30% occupancy, meaning motor toxicity always precedes any meaningful therapeutic antipsychotic relief.",
          tr: "Ekstrapiramidal semptomlar %30 dolulukta ortaya çıkar, yani motor toksisite terapötik antipsikotik etkiden her zaman önce gelir.",
          ar: "تظهر الأعراض خارج الهرمية عند إشغال 30%، مما يعني أن السمية الحركية تسبق دوماً أي تحسن علاجي ملموس."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Antipsychotic efficacy occurs FIRST at 65% occupancy; EPS emerges ONLY when occupancy exceeds the higher threshold of ~80%.",
          tr: "Yanlış. Önce %65'te antipsikotik etki başlar; motor toksisite ise yalnızca %80 eşiği aşıldığında ortaya çıkar.",
          ar: "غير صحيح. يبدأ التحسن العلاجي أولاً عند 65%؛ ولا تظهر الأعراض الحركية إلا بتجاوز العتبة العليا البالغة 80%."
        }
      },
      {
        id: "opt_no_correlation_occupancy",
        text: {
          en: "PET studies demonstrated that striatal D2 receptor occupancy has zero correlation with either clinical efficacy or adverse motor outcomes.",
          tr: "PET çalışmaları, striatal D2 doluluğunun ne klinik etkiyle ne de motor yan etkilerle hiçbir korelasyonu olmadığını kanıtlamıştır.",
          ar: "أثبتت دراسات PET عدم وجود أي ارتباط بين إشغال مستقبلات D2 بالمخطط وبين الفعالية السريرية أو الأعراض الحركية."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. D2 receptor occupancy measured by PET is one of the most rigorously validated quantitative biomarkers in neuropsychopharmacology.",
          tr: "Yanlış. PET ile ölçülen D2 reseptör doluluğu, nöropsikofarmakolojideki en sağlam doğrulanmış kantitatif biyobelirteçtir.",
          ar: "غير صحيح. يُعد إشغال D2 المقاس بالتصوير المقطعي بالإصدار البوزيتروني (PET) أحد أدق المؤشرات الحيوية المثبتة دوائياً."
        }
      }
    ]
  },

  // Step 4: visual_explanation
  {
    prompt: {
      en: "Picture the striatal seesaw: dopamine normally brakes acetylcholine release. When haloperidol cuts dopamine, acetylcholine skyrockets. What emergency drug restores balance against dystonia?",
      tr: "Striatal tahterevalliyi hayal edin: dopamin normalde asetilkolini frenler. Haloperidol dopamini kesince asetilkolin fırlar. Distoniyi durdurmak için hangi acil ilaç verilir?",
      ar: "تخيل أرجوحة المخطط: يكبح الدوبامين الأسيتيل كولين طبيعياً. عند حظر الدوبامين بالهالوبيريدول، يشتعل الأسيتيل كولين. ما الدواء الإسعافي الذي يعيد التوازن؟"
    },
    options: [
      {
        id: "opt_anticholinergic_countermeasure",
        text: {
          en: "Centrally acting muscarinic antagonists like biperiden or benztropine block M1 receptors, lowering cholinergic tone back into equilibrium with deficient dopamine.",
          tr: "Biperiden veya benztropin gibi santral etkili muskarinik antagonistler M1 reseptörlerini bloke ederek kolinerjik tonusu düşürür ve dengeyi kurar.",
          ar: "حاصرات المسكارين المركزية مثل البيبيريدين أو البنزتروبين تحظر مستقبلات M1، خافضة التوتر الكوليني لإعادته للتوازن مع الدوبامين المنخفض."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Anticholinergics dampen the relative cholinergic excess caused by D2 blockade, rapidly aborting acute dystonic muscle spasms.",
          tr: "Doğru! Antikolinerjikler, D2 blokajının yarattığı göreceli asetilkolin fazlalığını M1 üzerinden söndürerek distoniyi hızla çözer.",
          ar: "صحيح! تخمد مضادات الكولين فرط الأسيتيل كولين النسبي الناجم عن حظر D2، موقفة تشنجات خلل التوتر الحاد بسرعة."
        }
      },
      {
        id: "opt_acetylcholinesterase_inhibitor",
        text: {
          en: "Cholinesterase inhibitors like physostigmine or pyridostigmine to boost acetylcholine further and overpower haloperidol at striatal synapses.",
          tr: "Haloperidolü alt etmek için asetilkolini daha da artıracak fizostigmin veya piridostigmin gibi kolinesteraz inhibitörleri verilmelidir.",
          ar: "مثبطات الكولينستراز مثل فيزوستيغمين لزيادة الأسيتيل كولين والتغلب على الهالوبيريدول في المشابك العصبية."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Dystonia is caused by EXCESS acetylcholine. Adding a cholinesterase inhibitor would drastically worsen the muscle spasms.",
          tr: "Yanlış. Distoni zaten AŞIRI asetilkolinden kaynaklanır; kolinesteraz inhibitörü vermek kas spazmlarını ölümcül seviyeye taşır.",
          ar: "غير صحيح. ينجم خلل التوتر عن فرط الأسيتيل كولين؛ وإعطاء مثبط كولينستراز سيفاقم التشنجات العضلية بشكل كارثي."
        }
      },
      {
        id: "opt_full_dopamine_agonist",
        text: {
          en: "High-dose levodopa/carbidopa or bromocriptine to stimulate mesolimbic dopamine receptors and displace haloperidol from cortical regions.",
          tr: "Mezolimbik dopamin reseptörlerini uyarmak ve haloperidolü korteksten sökmek için yüksek doz levodopa veya bromokriptin verilmelidir.",
          ar: "جرعات عالية من ليفودوبا أو بروموكريبتين لتحفيز مستقبلات الدوبامين الميزولمبية وإزاحة الهالوبيريدول من القشرة."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Full dopamine agonists can trigger severe psychotic relapse; emergency treatment of acute dystonia relies on anticholinergics.",
          tr: "Yanlış. Tam dopamin agonistleri hastayı anında akut psikotik alevlenmeye sokar; distoninin acil tedavisi antikolinerjiktir.",
          ar: "غير صحيح. تفجر ناهضات الدوبامين انتكاسة ذهانية حادة؛ ويعتمد العلاج الإسعافي لخلل التوتر على مضادات الكولين حصراً."
        }
      },
      {
        id: "opt_neuromuscular_blockade",
        text: {
          en: "Intravenous succinylcholine to permanently block striatal cholinergic interneurons without affecting peripheral muscle tone.",
          tr: "Periferik kas tonusunu etkilemeden striatal kolinerjik internöronları kalıcı bloke etmek için intravenöz süksinilkolin verilmelidir.",
          ar: "سكسينيل كولين وريدي لحظر العصبونات البينية الكولينية في المخطط بشكل دائم دون التأثير على التوتر العضلي المحيطي."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Succinylcholine is a peripheral depolarizing paralytic that causes apnea; it does not cross the BBB to treat central dystonia.",
          tr: "Yanlış. Süksinilkolin kan-beyin bariyerini geçemez; solunumu felç eden periferik bir paralitiktir ve distonide yeri yoktur.",
          ar: "غير صحيح. السكسينيل كولين مشل عضلي محيطي يسبب توقف التنفس ولا يعبر الدماغ لعلاج خلل التوتر المركزي."
        }
      }
    ]
  },

  // Step 5: interactive_artifact (ReceptorLigandMatcher)
  {
    prompt: {
      en: "Match haloperidol's functional groups with complementary amino acid residues inside the D2 receptor pocket to uncover high-affinity blockade architecture.",
      tr: "Haloperidolün gruplarını D2 cebindeki amino asitlerle eşleştirerek yüksek afiniteli blokajın moleküler mimarisini çözün.",
      ar: "طابق مجموعات الهالوبيريدول الوظيفية مع الأحماض الأمينية في جيب D2 لكشف معمارية الارتباط عالي الألفة."
    },
    options: null
  },

  // Step 6: guided_discovery
  {
    prompt: {
      en: "Why do second-generation atypical antipsychotics (SGAs) cause substantially fewer extrapyramidal motor symptoms than typicals? What role does 5-HT2A receptor antagonism play in the striatum?",
      tr: "İkinci kuşak atipik antipsikotikler tipiklere göre neden çok daha az motor yan etki (EPS) yapar? 5-HT2A reseptör antagonizması striatumda nasıl bir rol oynar?",
      ar: "لماذا تسبب مضادات الذهان اللانمطية أعراضاً خارج هرمية أقل بكثير مقارنة بالنمطية؟ ما الدور الذي يلعبه حظر مستقبلات 5-HT2A في المخطط؟"
    },
    options: [
      {
        id: "opt_5ht2a_disinhibition",
        text: {
          en: "Serotonin 5-HT2A receptors normally brake dopamine release; blocking them disinhibits striatal dopamine terminals, competing with D2 blockade to stay below 80% occupancy.",
          tr: "5-HT2A normalde dopamin salınımını frenler; blokajı striatumda dopamin salınımını serbest bırakır ve D2 doluluğunu %80'in altında tutar.",
          ar: "تكبح مستقبلات 5-HT2A إفراز الدوبامين طبيعياً؛ وحظرها يحرر إفراز الدوبامين بالمخطط ليزاحم حظر D2 ويبقيه تحت عتبة 80%."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! 5-HT2A antagonism disinhibits dopamine release in the nigrostriatal pathway, allowing dopamine to compete and protect against motor EPS.",
          tr: "Doğru! 5-HT2A blokajı striatal dopamin salınımını artırır; açığa çıkan dopamin D2'de yarışarak doluluğu %80 altında tutar ve motor EPS'yi önler.",
          ar: "صحيح! يحرر حظر 5-HT2A إفراز الدوبامين في المسار الحركي، ليتنافس محلياً مع الدواء ويبقي إشغال D2 دون 80% الحامية من EPS."
        }
      },
      {
        id: "opt_direct_d2_synthesis",
        text: {
          en: "5-HT2A antagonism directly mutates the genetic promoter of D2 receptors, transforming them into Gs-coupled excitatory dopamine receptors.",
          tr: "5-HT2A antagonizması D2 reseptörlerinin genetik promotorunu mutasyona uğratarak onları Gs kenetli uyarıcı reseptörlere dönüştürür.",
          ar: "يحدث حظر 5-HT2A طفرة جينية في محفز مستقبلات D2 محولاً إياها لمستقبلات منشطة مقترنة بـ Gs."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Pharmacological antagonists do not mutate genetic promoters or alter GPCR coupling identities.",
          tr: "Yanlış. Farmakolojik antagonistler genetik promotor mutasyonu yapmaz veya G-proteini tipini değiştiremez.",
          ar: "غير صحيح. لا تحدث المناهضات الدوائية طفرات جينية ولا تغير هوية البروتين G المقترن بالمستقبل."
        }
      },
      {
        id: "opt_cyp_induction_clearance",
        text: {
          en: "5-HT2A antagonism massively induces hepatic CYP3A4, completely clearing the antipsychotic from the brain within two minutes of administration.",
          tr: "5-HT2A antagonizması karaciğer CYP3A4 enzimini aşırı uyararak ilacın iki dakika içinde beyinden tamamen temizlenmesini sağlar.",
          ar: "يحفز حظر 5-HT2A إنزيم CYP3A4 الكبدي بشدة مما يطرد الدواء من الدماغ خلال دقيقتين من تناوله."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Antipsychotics remain in brain tissue for hours; motor sparing is mediated by local neurochemical striatal dopamine release.",
          tr: "Yanlış. Antipsikotikler beyinde saatlerce kalır; motor koruma yerel striatal dopamin salınımının artmasıyla sağlanır.",
          ar: "غير صحيح. تبقى مضادات الذهان في الدماغ لساعات؛ وتتحقق الحماية الحركية عبر تعزيز إفراز الدوبامين الموضعي بالمخطط."
        }
      },
      {
        id: "opt_peripheral_muscle_relaxant",
        text: {
          en: "5-HT2A blockers act as neuromuscular junction curare-like blockers, directly relaxing skeletal muscles independently of the central nervous system.",
          tr: "5-HT2A blokörleri santral sinir sisteminden bağımsız olarak çizgili kasları gevşeten kürar benzeri periferik kas gevşeticilerdir.",
          ar: "تعمل حاصرات 5-HT2A كمرخيات عضلية محيطية شبيهة بالكورار ترخي العضلات بمعزل عن الجهاز العصبي المركزي."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. 5-HT2A receptors relevant to EPS mitigation operate centrally in cortical and striatal monoaminergic circuits, not peripheral muscles.",
          tr: "Yanlış. 5-HT2A reseptörleri periferik kasta değil, santral korteks ve striatumdaki monoaminerjik devrelerde işlev görür.",
          ar: "غير صحيح. تعمل مستقبلات 5-HT2A المسؤولة عن تخفيف EPS مركزياً في الدوائر العصبية القشرية والمخططية وليس في العضلات المحيطية."
        }
      }
    ]
  },

  // Step 7: formal_explanation
  {
    prompt: {
      en: "What two pharmacological properties define atypical antipsychotics: the Meltzer index and receptor dissociation kinetics (Kapur-Seeman hypothesis)?",
      tr: "Atipik antipsikotikleri tanımlayan iki farmakolojik özellik nedir: Meltzer indeksi ve reseptör ayrışma kinetiği (Kapur-Seeman hipotezi)?",
      ar: "ما الخاصيتان الدوائيتان اللتان تحددان مضادات الذهان اللانمطية: مؤشر ميلتزر وحركية التفكك عن المستقبل (فرضية كابور-سيمان)؟"
    },
    options: [
      {
        id: "opt_atypicality_equation",
        text: {
          en: "High 5-HT2A/D2 affinity ratio (Meltzer index) and rapid D2 dissociation ('fast-off' kinetics) allowing endogenous dopamine surges to maintain physiological motor control.",
          tr: "Yüksek 5-HT2A/D2 afinite oranı (Meltzer indeksi) ve endojen dopaminin fizyolojik motor iletimi sürdürmesini sağlayan hızlı D2 ayrışması ('fast-off' kinetiği).",
          ar: "نسبة ألفة مرتفعة لـ 5-HT2A مقارنة بـ D2 (مؤشر ميلتزر) وتفكك سريع عن D2 (حركية fast-off) مما يتيح للدوبامين الحفاظ على التحكم الحركي."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! High 5-HT2A affinity and fast D2 dissociation allow atypicals (clozapine, quetiapine) to quell psychosis while sparing physiological motor signaling.",
          tr: "Doğru! Yüksek 5-HT2A afinitesi ve D2'den hızla ayrılma (fast-off), atipiklerin psikozu çözerken motor kontrolü korumasını sağlar.",
          ar: "صحيح! تتيح الألفة العالية لـ 5-HT2A والتفكك السريع عن D2 للأدوية اللانمطية خمد الذهان مع الحفاظ على الإشارات الحركية الفسيولوجية."
        }
      },
      {
        id: "opt_irreversible_binding",
        text: {
          en: "Irreversible covalent D2 binding paired with zero affinity for 5-HT2A receptors, ensuring permanent silencing of all dopaminergic synapses.",
          tr: "D2'ye geri dönüşsüz kovalent bağlanma ve 5-HT2A'ya sıfır afinite, tüm dopaminerjik sinapsların kalıcı olarak susturulmasını sağlar.",
          ar: "ارتباط تساهمي غير عكوس بمستقبلات D2 مع انعدام الألفة تجاه 5-HT2A، لضمان إسكات دائم لكافة المشابك الدوبامينية."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Irreversible binding would cause devastating, permanent extrapyramidal symptoms. Atypicals dissociate FASTER than typicals.",
          tr: "Yanlış. Geri dönüşsüz bağlanma felç edici kalıcı EPS yapardı. Atipikler tipiklere göre D2'den ÇOK DAHA HIZLI ayrılırlar.",
          ar: "غير صحيح. الارتباط غير العكوس يسبب شللاً رعاشياً مدمراً ودائماً؛ تتفكك اللانمطيات عن D2 بشكل أسرع بكثير من النمطية."
        }
      },
      {
        id: "opt_slow_off_superiority",
        text: {
          en: "Extremely slow D2 dissociation ('slow-off' kinetics with half-life of days) that outcompetes dopamine even under maximal physiological stress.",
          tr: "Maksimal fizyolojik stres altında bile dopamini alt eden aşırı yavaş D2 ayrışması (günler süren 'slow-off' kinetiği).",
          ar: "تفكك بطيء للغاية عن D2 (حركية slow-off بنصف عمر لأيام) يتغلب على الدوبامين حتى تحت وطأة الإجهاد الفسيولوجي الأقصى."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Slow-off kinetics (like haloperidol) produce continuous unrelenting receptor blockade and high EPS risk. Fast-off protects motor control.",
          tr: "Yanlış. Haloperidol gibi yavaş ayrılan (slow-off) ilaçlar yüksek EPS yapar; motor fonksiyonları koruyan 'fast-off' (hızlı ayrışma) özelliğidir.",
          ar: "غير صحيح. الحركية البطيئة (كالهالوبيريدول) تبقي المستقبل محظوراً بلا هوادة وتسبب EPS؛ بينما الحركية السريعة تحمي الحركة."
        }
      },
      {
        id: "opt_gastric_degradation_myth",
        text: {
          en: "Fast-off kinetics refers to rapid destruction of the drug by gastric acid, preventing high systemic bioavailability.",
          tr: "Fast-off kinetiği, ilacın mide asidi tarafından hızla parçalanmasını ve yüksek biyoyararlanım oluşmamasını ifade eder.",
          ar: "تشير حركية fast-off إلى التفكك السريع للدواء بواسطة حمض المعدة مما يمنع التوافر الحيوي الجهازي المرتفع."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. 'Fast-off' refers strictly to the microscopic dissociation rate constant (k-off) of the drug-receptor complex in the brain.",
          tr: "Yanlış. 'Fast-off' mideyle ilgili değildir; ilacın beyindeki reseptörden mikroskobik ayrışma hız sabitini (k-off) tanımlar.",
          ar: "غير صحيح. يشير fast-off حصراً إلى ثابت سرعة تفكك معقد الدواء والمستقبل (k-off) في أنسجة الدماغ."
        }
      }
    ]
  },

  // Step 8: concept_check
  {
    prompt: {
      en: "A patient on long-term haloperidol develops involuntary lip-smacking and choreoathetoid tongue movements (tardive dyskinesia). Why is administering biperiden (an anticholinergic) clinically catastrophic?",
      tr: "Uzun süredir haloperidol kullanan hastada istemsiz dudak şapırdatma ve koreoatetoit dil hareketleri (tardif diskinezi) başlıyor. Biperiden (antikolinerjik) vermek neden klinik bir felakettir?",
      ar: "مريض يتناول الهالوبيريدول مزمناً يصاب بحركات لا إرادية للشفتين واللسان (عسر الحركة المتأخر). لماذا يُعد إعطاء البيبيريدين (مضاد كولين) كارثة سريرية؟"
    },
    options: [
      {
        id: "opt_td_supersensitivity_worsened",
        text: {
          en: "Tardive dyskinesia results from up-regulated, supersensitive D2 receptors; suppressing opposing cholinergic tone exacerbates dopamine dominance and worsens the chorea.",
          tr: "Tardif diskinezi D2 reseptör süpersensitivitesinden kaynaklanır; karşıt kolinerjik tonusun kırılması dopamin hakimiyetini ve koreyi daha da azdırır.",
          ar: "ينجم عسر الحركة المتأخر عن فرط حساسية مستقبلات D2 المتكاثرة؛ وتثبيط النغمة الكولينية المعاكسة يفاقم هيمنة الدوبامين ويزيد الحركات الرقصية سوءاً."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Anticholinergics treat acute dystonia, but worsen tardive dyskinesia! Treatment requires switching to clozapine or adding a VMAT2 inhibitor.",
          tr: "Doğru! Antikolinerjikler akut distoniyi çözer ama tardif diskineziyi KÖTÜLEŞTİRİR! Tedavide klozapine geçilmeli veya VMAT2 inhibitörü verilmelidir.",
          ar: "صحيح! تعالج مضادات الكولين خلل التوتر الحاد لكنها تفاقم عسر الحركة المتأخر! يتطلب العلاج التحويل إلى كلوزابين أو إضافة مثبط VMAT2."
        }
      },
      {
        id: "opt_biperiden_cures_td",
        text: {
          en: "Biperiden instantly cures tardive dyskinesia because the disorder is a peripheral acetylcholine receptor hypersensitivity at skeletal motor endplates.",
          tr: "Biperiden tardif diskineziyi anında iyileştirir çünkü bozukluk çizgili kas son plaklarındaki periferik asetilkolin aşırı duyarlılığıdır.",
          ar: "يشفي البيبيريدين عسر الحركة المتأخر فوراً لأن الاضطراب ناشئ عن فرط حساسية مستقبلات الأسيتيل كولين المحيطية في اللوحة المحركة."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. TD is a central striatal neuroplastic disorder of dopamine receptor supersensitivity, and anticholinergics severely exacerbate it.",
          tr: "Yanlış. Tardif diskinezi periferik değil santral bir dopamin aşırı duyarlılığıdır ve antikolinerjikler bu tabloyu çok daha ağırlaştırır.",
          ar: "غير صحيح. عسر الحركة المتأخر اضطراب مركزي ناجم عن فرط حساسية مستقبلات الدوبامين، ومضادات الكولين تزيده اشتعالاً."
        }
      },
      {
        id: "opt_double_haloperidol_dose",
        text: {
          en: "The haloperidol dose should be immediately tripled to irreversibly downregulate and destroy all supersensitive D2 receptors permanently.",
          tr: "Tüm süpersensitif D2 reseptörlerini kalıcı olarak yok etmek ve desensitize etmek için haloperidol dozu derhal üç katına çıkarılmalıdır.",
          ar: "يجب مضاعفة جرعة الهالوبيريدول 3 أضعاف فوراً لإزالة حساسية وتدمير كافة مستقبلات D2 مفرطة الحساسية نهائياً."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Increasing antipsychotic dose temporarily masks symptoms by blocking supersensitive receptors, but ultimately deepens and cements the pathology.",
          tr: "Yanlış. Doz artırmak semptomları geçici maskeler ancak süpersensitiviteyi daha da derinleştirip patolojiyi kalıcılaştırır.",
          ar: "غير صحيح. زيادة الجرعة تموه الأعراض مؤقتاً لكنها تعمق فرط الحساسية وترسخ التلف العصبي بشكل لا رجعة فيه."
        }
      },
      {
        id: "opt_irreversible_substantia_nigra_death",
        text: {
          en: "Tardive dyskinesia signifies complete coagulative necrosis of the substantia nigra, requiring emergent neurosurgical deep brain stimulation.",
          tr: "Tardif diskinezi substantia nigra'nın koagülasyon nekrozuna uğradığını gösterir ve acil derin beyin stimülasyonu cerrahisi gerektirir.",
          ar: "يدل عسر الحركة المتأخر على نخر تخثري كامل في المادة السوداء، مما يتطلب جراحة تحفيز عميق للدماغ بشكل إسعافي."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. TD is not coagulative necrosis of the substantia nigra; it is receptor upregulation and maladaptive neuroplasticity in striatal synapses.",
          tr: "Yanlış. Tardif diskinezi nekroz değildir; striatal postsinaptik reseptörlerin aşırı duyarlılaşması ve adaptif plastisite bozukluğudur.",
          ar: "غير صحيح. ليس عسر الحركة المتأخر نخراً في المادة السوداء؛ بل هو تكاثر وفرط حساسية تكيفية لمستقبلات الدوبامين المشبكية."
        }
      }
    ]
  },

  // Step 9: application
  {
    prompt: {
      en: "Aripiprazole is termed a 'dopamine thermostat'. How does its high-affinity D2 partial agonism (~30% intrinsic activity) stabilize both hyperactive and hypoactive dopaminergic circuits?",
      tr: "Aripiprazol 'dopamin termostatı' olarak adlandırılır. Yüksek afiniteli D2 parsiyel agonizmi (%30 intrensek etki) hem hiperaktif hem hipoaktif yolakları nasıl dengeler?",
      ar: "يُلقب الأريبيبرازول بـ 'منظم حرارة الدوبامين'. كيف يوازن ناهضه الجزئي عالي الألفة لـ D2 (فاعلية ذاتية ~30%) المسارات مفرطة وضعيفة النشاط؟"
    },
    options: [
      {
        id: "opt_partial_agonist_thermostat",
        text: {
          en: "In hyperdopaminergic mesolimbic circuits it acts as a functional antagonist (capping activation at 30%); in hypodopaminergic mesocortical and pituitary paths it supplies essential basal tone.",
          tr: "Mezolimbikte tam dopamini engelleyip aktiviteyi %30'a sınırlayarak fonksiyonel antagonist; kortikal ve hipofiz yollarında ise %30 bazal uyarı vererek agonist davranır.",
          ar: "يعمل كمناهض وظيفي في الميزولمبيك بحد التنشيط عند 30%؛ بينما يوفر في المسارات القشرية والنخامية نغمة قاعدية محفزة بنسبة 30%."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! In high-dopamine areas, aripiprazole dampens signal to 30% (treating psychosis). In low-dopamine areas, it provides 30% tone (preventing EPS and prolactin elevation).",
          tr: "Doğru! Dopamin fazlaysa %30'a indirir (psikozu çözer); azsa %30 uyarı verir (EPS ve prolaktin yüksekliğini önler).",
          ar: "صحيح! إذا كان الدوبامين مرتفعاً خفضه إلى 30% (معالجاً الذهان)، وإذا كان منخفضاً رفع التنشيط إلى 30% (مانعاً EPS والبرولاكتين)."
        }
      },
      {
        id: "opt_full_agonist_all_regions",
        text: {
          en: "Aripiprazole acts as a 100% full agonist throughout the entire brain, triggering massive dopamine release to wash out previous neuroleptics.",
          tr: "Aripiprazol tüm beyinde %100 tam agonist olarak davranır, önceki nöroleptikleri temizlemek için devasa dopamin salınımı yaptırır.",
          ar: "يعمل الأريبيبرازول كناهض تام بنسبة 100% في كامل الدماغ، محفزاً إفرازاً هائلاً للدوبامين لغسل مضادات الذهان السابقة."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Aripiprazole has only ~25–30% intrinsic efficacy, not 100%. A full agonist would exacerbate psychosis into acute mania.",
          tr: "Yanlış. Aripiprazol tam agonist değil %25-30 parsiyel agonisttir. Tam agonist olsaydı psikozu mani krizine sokardı.",
          ar: "غير صحيح. يمتلك الأريبيبرازول فاعلية ذاتية تبلغ ~30% فقط؛ والناهض التام كان سيفاقم الذهان إلى نوبة هوس حادة."
        }
      },
      {
        id: "opt_inverse_agonist_everywhere",
        text: {
          en: "Aripiprazole is a universal inverse agonist that silences baseline constitutively active D2 receptors below zero across all pathways.",
          tr: "Aripiprazol tüm yolaklarda bazal D2 aktivitesini sıfırın altına düşüren evrensel bir invers agonisttir.",
          ar: "الأريبيبرازول ناهض عكسي عام يخمد النشاط الأساسي لمستقبلات D2 لما دون الصفر في كافة المسارات."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. An inverse agonist suppresses basal constitutive activity and would produce severe motor EPS and massive hyperprolactinemia.",
          tr: "Yanlış. İnvers agonist olsaydı bazal tonusu da sıfırlar, çok ağır EPS ve hiperprolaktinemi yapardı. Aripiprazol parsiyel agonisttir.",
          ar: "غير صحيح. الناهض العكسي يقضي على النغمة القاعدية مسبباً شللاً حركياً وفرط برولاكتين حاد؛ بينما الأريبيبرازول ناهض جزئي."
        }
      },
      {
        id: "opt_h1_only_mechanism",
        text: {
          en: "Aripiprazole does not bind D2 receptors; its clinical antipsychotic action is mediated entirely by blocking peripheral histamine H1 receptors.",
          tr: "Aripiprazol D2 reseptörlerine bağlanmaz; antipsikotik etkisi tamamen periferik histamin H1 reseptör blokajından kaynaklanır.",
          ar: "لا يرتبط الأريبيبرازول بمستقبلات D2؛ بل يتوسط فعاليته المضادة للذهان حظر مستقبلات الهيستامين H1 المحيطية حصراً."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Aripiprazole has sub-nanomolar affinity for D2 receptors; its therapeutic profile is driven by D2 partial agonism, not H1 blockade.",
          tr: "Yanlış. Aripiprazol D2'ye sub-nanomolar düzeyde çok güçlü bağlanır; etkinliği D2 parsiyel agonizmine dayanır.",
          ar: "غير صحيح. يمتلك الأريبيبرازول ألفة دون النانومولار لمستقبلات D2؛ وتنبثق فعاليته من ميزان ناهضه الجزئي عند D2."
        }
      }
    ]
  },

  // Step 10: retrieval
  {
    prompt: {
      en: "Recall the four major dopaminergic pathways: match in sequence the pathways responsible for antipsychotic efficacy, extrapyramidal motor side effects, and hyperprolactinemia.",
      tr: "Dört ana dopaminerjik yolağı hatırlayın: antipsikotik etkinlik, ekstrapiramidal motor yan etkiler ve hiperprolaktinemiden sorumlu yolakları sırasıyla eşleştirin.",
      ar: "تذكر المسارات الدوبامينية الأربعة الكبرى: طابق بالترتيب المسارات المسؤولة عن الفعالية المضادة للذهان، والأعراض الحركية خارج الهرمية، وفرط برولاكتين الدم."
    },
    options: [
      {
        id: "opt_pathway_match_correct",
        text: {
          en: "Antipsychotic efficacy = Mesolimbic; Extrapyramidal motor symptoms = Nigrostriatal; Hyperprolactinemia = Tuberoinfundibular.",
          tr: "Antipsikotik etkinlik = Mezolimbik; Ekstrapiramidal motor semptomlar = Nigrostriatal; Hiperprolaktinemi = Tüberoinfundibuler.",
          ar: "الفعالية المضادة للذهان = الميزولمبيك؛ الأعراض الحركية خارج الهرمية = المخططي الأسود؛ فرط البرولاكتين = القمعي النخامي."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Mesolimbic mediates positive symptoms; Nigrostriatal controls motor execution; Tuberoinfundibular tonically suppresses prolactin.",
          tr: "Doğru! Mezolimbik pozitif semptomları; Nigrostriatal motor hareketleri; Tüberoinfundibuler ise hipofizden prolaktin salınımını kontrol eder.",
          ar: "صحيح! الميزولمبيك يتوسط الهلاوس والضلالات؛ المخططي الأسود يتحكم بالحركة؛ والقمعي النخامي يكبح إفراز البرولاكتين فسيولوجياً."
        }
      },
      {
        id: "opt_pathway_match_inverted",
        text: {
          en: "Antipsychotic efficacy = Tuberoinfundibular; Extrapyramidal symptoms = Mesocortical; Hyperprolactinemia = Nigrostriatal.",
          tr: "Antipsikotik etkinlik = Tüberoinfundibuler; Ekstrapiramidal semptomlar = Mezokortikal; Hiperprolaktinemi = Nigrostriatal.",
          ar: "الفعالية المضادة للذهان = القمعي النخامي؛ الأعراض خارج الهرمية = الميزوكورتيكال؛ فرط البرولاكتين = المخططي الأسود."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. The tuberoinfundibular pathway controls prolactin, not psychosis. The mesolimbic pathway mediates antipsychotic efficacy.",
          tr: "Yanlış. Tüberoinfundibuler yolak psikozu değil prolaktini yönetir. Antipsikotik etki mezolimbik yoldaki blokajdan kaynaklanır.",
          ar: "غير صحيح. يتحكم المسار القمعي بالبرولاكتين وليس بالذهان؛ والمسار الميزولمبي هو المسؤول عن إخماد الهلاوس والذهان."
        }
      },
      {
        id: "opt_pathway_match_nigrostriatal_psychosis",
        text: {
          en: "Antipsychotic efficacy = Nigrostriatal; Extrapyramidal symptoms = Mesolimbic; Hyperprolactinemia = Mesocortical.",
          tr: "Antipsikotik etkinlik = Nigrostriatal; Ekstrapiramidal semptomlar = Mezolimbik; Hiperprolaktinemi = Mezokortikal.",
          ar: "الفعالية المضادة للذهان = المخططي الأسود؛ الأعراض خارج الهرمية = الميزولمبيك؛ فرط البرولاكتين = الميزوكورتيكال."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Nigrostriatal blockade causes parkinsonian motor symptoms; mesolimbic blockade resolves hallucinations and delusions.",
          tr: "Yanlış. Nigrostriatal yol motor kontrol merkezidir ve blokajı EPS yapar; mezolimbik yol ise pozitif semptomları dindirir.",
          ar: "غير صحيح. حظر المسار المخططي يسبب الشلل الرعاشي وEPS؛ بينما حظر الميزولمبيك هو من يزيل الهلاوس السمعية والضلالات."
        }
      },
      {
        id: "opt_all_mesocortical",
        text: {
          en: "Antipsychotic efficacy = Mesocortical; Extrapyramidal symptoms = Tuberoinfundibular; Hyperprolactinemia = Mesolimbic.",
          tr: "Antipsikotik etkinlik = Mezokortikal; Ekstrapiramidal semptomlar = Tüberoinfundibuler; Hiperprolaktinemi = Mezolimbik.",
          ar: "الفعالية المضادة للذهان = الميزوكورتيكال؛ الأعراض خارج الهرمية = القمعي النخامي؛ فرط البرولاكتين = الميزولمبيك."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Mesocortical dopamine deficiency causes negative symptoms; tuberoinfundibular blockade causes hyperprolactinemia.",
          tr: "Yanlış. Mezokortikal yol negatif semptomlarla ilişkilidir; prolaktin yükselmesi tüberoinfundibuler yolun bloke edilmesiyle oluşur.",
          ar: "غير صحيح. يرتبط نقص الدوبامين بالميزوكورتيكال بالأعراض السلبية؛ بينما ينجم فرط البرولاكتين عن حظر المسار القمعي النخامي."
        }
      }
    ]
  },

  // Step 11: connection
  {
    prompt: {
      en: "Antipsychotics block multiple off-target receptors beyond D2. Which adverse clinical consequences emerge from off-target antagonism of H1, alpha-1, and muscarinic M1 receptors?",
      tr: "Antipsikotikler D2 dışında birçok reseptörü bloke eder. H1, alfa-1 ve muskarinik M1 reseptörlerinin hedeften sapmış blokajı hangi yan etkileri doğurur?",
      ar: "تحظر مضادات الذهان مستقبلات جانبية عديدة غير D2. ما العواقب السريرية الناجمة عن الحظر الجانبي لمستقبلات H1، وألفا-1، والمسكارين M1؟"
    },
    options: [
      {
        id: "opt_off_target_trio",
        text: {
          en: "H1 antagonism drives sedation and metabolic weight gain; alpha-1 antagonism causes orthostatic hypotension; M1 antagonism provokes dry mouth, constipation, and blurred vision.",
          tr: "H1 blokajı sedasyon ve kilo artışı yapar; alfa-1 blokajı ortostatik hipotansiyona yol açar; M1 blokajı ise ağız kuruluğu, kabızlık ve bulanık görme yaratır.",
          ar: "حظر H1 يسبب التهدئة وزيادة الوزن؛ وحظر ألفا-1 يسبب هبوط الضغط الانتصابي؛ وحظر M1 يسبب جفاف الفم، والإمساك، وتشوش الرؤية."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Antihistaminic effects promote weight gain; antiadrenergic alpha-1 causes orthostatic syncope; anticholinergic M1 produces classic dry/constipated symptoms.",
          tr: "Doğru! H1 kilo aldırır ve uyutur; alfa-1 tansiyonu düşürüp baş dönmesi yapar; M1 ise antikolinerjik yan etkileri tetikler.",
          ar: "صحيح! حظر H1 مسؤول عن النعاس والبدانة؛ ألفا-1 يسبب الدوار الوضعي؛ وحظر M1 المسكاريني يطلق الأعراض المضادة للكولين."
        }
      },
      {
        id: "opt_h1_hypertension",
        text: {
          en: "H1 antagonism causes severe hypertensive crisis, alpha-1 antagonism causes priapism only, and M1 antagonism causes profuse bronchorrhea and diarrhea.",
          tr: "H1 blokajı şiddetli hipertansif kriz yapar, alfa-1 sadece priapizm yapar, M1 blokajı ise aşırı bronkore ve ishal başlatır.",
          ar: "يسبب حظر H1 نوبة فرط ضغط حادة، وألفا-1 قسوحاً فقط، ويسبب حظر M1 إسهالاً مفرطاً وسيلاناً قصبياً."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. H1 causes sedation, not hypertension; M1 blockade INHIBITS secretions (causing dry mouth and constipation), not diarrhea.",
          tr: "Yanlış. H1 tansiyonu yükseltmez sedasyon yapar; M1 blokajı ise salgıları artırmaz, kurutur (ağız kuruluğu, kabızlık).",
          ar: "غير صحيح. يسبب حظر H1 تهدئة وليس فرط ضغط؛ وحظر M1 يجفف الإفرازات (جفاف الفم وإمساك) ولا يسبب إسهالاً."
        }
      },
      {
        id: "opt_alpha1_anticonvulsant",
        text: {
          en: "Alpha-1 antagonism elevates seizure threshold, while muscarinic M1 blockade stimulates memory consolidation and prevents dementia.",
          tr: "Alfa-1 blokajı nöbet eşiğini yükseltir, muskarinik M1 blokajı ise hafızayı güçlendirerek demansı önler.",
          ar: "يرفع حظر ألفا-1 عتبة التشنج، بينما يقوي حظر المسكارين M1 الذاكرة ويقي من الخرف."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Alpha-1 blockade does not prevent seizures. M1 blockade IMPAIRS memory and worsens cognitive performance (anticholinergic burden).",
          tr: "Yanlış. Alfa-1 nöbeti önlemez; M1 blokajı hafızayı güçlendirmez, aksine bilişsel performansı ve belleği bozar.",
          ar: "غير صحيح. لا يقي حظر ألفا-1 من النوبات؛ وحظر M1 يضعف الذاكرة والأداء الإدراكي (العبء المضاد للكولين)."
        }
      },
      {
        id: "opt_m1_weight_loss",
        text: {
          en: "Muscarinic M1 blockade causes profound anorexia and cachexia, while H1 blockade selectively eliminates extrapyramidal symptoms.",
          tr: "Muskarinik M1 blokajı anoreksiya ve kaşeksiye yol açar, H1 blokajı ise ekstrapiramidal semptomları tamamen ortadan kaldırır.",
          ar: "يسبب حظر المسكارين M1 فقدان شهية حاد وهزالاً، بينما يزيل حظر H1 الأعراض خارج الهرمية تماماً."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Weight gain is driven by H1 and 5-HT2C antagonism. M1 blockade causes constipation and autonomic side effects.",
          tr: "Yanlış. Kilo alımı H1 ve 5-HT2C blokajından kaynaklanır; M1 blokajı ise otonomik kuruluğa ve kabızlığa yol açar.",
          ar: "غير صحيح. تنجم زيادة الوزن عن حظر H1 و 5-HT2C؛ بينما يسبب حظر M1 إمساكاً وجفافاً في الأغشية المخاطية."
        }
      }
    ]
  },

  // Step 12: mastery_check (Transfer Challenge)
  {
    prompt: {
      en: "A patient on haloperidol 10 mg/day develops prolactin 85 ng/mL, severe cogwheel rigidity, and emotional blunting. PET shows 84% striatal D2 occupancy. Which rotation resolves all three adverse effects?",
      tr: "Haloperidol 10 mg/gün alan hastada prolaktin 85 ng/mL, dişli çark rijiditesi ve duygusal küntlük gelişiyor. PET %84 D2 doluluğu gösteriyor. Hangi ilaca geçiş her üç yan etkiyi çözer?",
      ar: "مريض يتناول هالوبيريدول 10 ملغ/يوم يعاني من برولاكتين 85 نغ/مل، وتيبس مسنن، وتبلد انفعالي. يُظهر PET إشغال 84% لـ D2. أي تحويل دوائي يحل الأعراض الثلاثة؟"
    },
    options: [
      {
        id: "opt_rotate_aripiprazole",
        text: {
          en: "Switch to Aripiprazole: its D2 partial agonism (~30% intrinsic activity) supplies basal tone to resolve rigidity and prolactin, while controlling psychosis.",
          tr: "Aripiprazole geçiş: D2 parsiyel agonizmi (%30 intrensek aktivite) rijiditeyi ve prolaktini düzeltecek bazal tonusu sağlar, psikozu da kontrol altında tutar.",
          ar: "التحويل إلى أريبيبرازول: يوفر ناهضه الجزئي لـ D2 (فاعلية ذاتية ~30%) نغمة قاعدية تعالج التيبس والبرولاكتين، مع ضبط الذهان."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Exceeding 80% D2 occupancy causes EPS and hyperprolactinemia. Aripiprazole's ~30% intrinsic tone lowers effective blockade below 80%.",
          tr: "Doğru! %80 üzerindeki D2 doluluğu EPS ve prolaktin yüksekliği yapar. Aripiprazolün %30 intrensek tonusu bu etkileri hızla geri çevirir.",
          ar: "صحيح! يسبب تجاوز إشغال 80% لـ D2 أعراضاً حركية وفرط برولاكتين؛ وتوفر فاعلية الأريبيبرازول الذاتية (~30%) حلاً متكاملاً."
        }
      },
      {
        id: "opt_switch_risperidone",
        text: {
          en: "Switch to Risperidone, because all second-generation atypicals are completely excluded from the pituitary by the blood-brain barrier.",
          tr: "Risperidona geçiş, çünkü tüm ikinci kuşak atipikler kan-beyin bariyeri sayesinde hipofiz dokusundan tamamen dışlanırlar.",
          ar: "التحويل إلى ريسبيريدون، لأن جميع الأدوية اللانمطية تُحجب تماماً عن النخامية بواسطة الحاجز الدموي الدماغي."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. The pituitary gland lies OUTSIDE the blood-brain barrier. Risperidone has potent D2 affinity and causes notorious hyperprolactinemia.",
          tr: "Yanlış. Hipofiz bezi kan-beyin bariyerinin DIŞINDADIR. Risperidon güçlü D2 afinitesiyle çok şiddetli hiperprolaktinemi yapar.",
          ar: "غير صحيح. تقع الغدة النخامية خارج الحاجز الدموي الدماغي؛ ويمتلك الريسبيريدون ألفة عالية لـ D2 مسبباً فرط برولاكتين حاداً."
        }
      },
      {
        id: "opt_add_biperiden_double_dose",
        text: {
          en: "Add biperiden 4 mg daily and double the haloperidol dose to 20 mg to overcome pituitary dopamine resistance and eliminate hallucinations.",
          tr: "Günde 4 mg biperiden ekleyin ve hipofizdeki dopamin direncini kırıp halüsinasyonları bitirmek için haloperidolu 20 mg'a çıkarın.",
          ar: "إضافة بيبيريدين 4 ملغ يومياً ومضاعفة جرعة الهالوبيريدول إلى 20 ملغ لكسر مقاومة الدوبامين النخامية وإنهاء الهلاوس."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Doubling haloperidol will worsen hyperprolactinemia and emotional blunting, and chronic anticholinergics increase the risk of tardive dyskinesia.",
          tr: "Yanlış. Haloperidol dozunu artırmak prolaktini ve apatiyi daha da fırlatır; kronik antikolinerjik eklemek tardif diskinezi riskini katlar.",
          ar: "غير صحيح. ستؤدي مضاعفة الهالوبيريدول لمفاقمة فرط البرولاكتين والتبلد؛ كما تزيد مضادات الكولين المزمنة خطر عسر الحركة المتأخر."
        }
      },
      {
        id: "opt_add_bromocriptine_full",
        text: {
          en: "Co-administer bromocriptine (a full D2 agonist) with haloperidol to stimulate pituitary receptors without affecting mesolimbic circuits.",
          tr: "Mezolimbik devreleri etkilemeden hipofiz reseptörlerini uyarmak için haloperidolün yanına bromokriptin (tam D2 agonisti) ekleyin.",
          ar: "المشاركة الدوائية مع بروموكريبتين (ناهض D2 تام) لتحفيز مستقبلات النخامية دون التأثير على دوائر الميزولمبيك."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Full dopamine agonists counteract antipsychotic efficacy across the entire brain, triggering immediate, violent psychotic relapse.",
          tr: "Yanlış. Tam dopamin agonistleri tüm beyinde antipsikotik etkiyi sıfırlar ve hastayı derhal şiddetli psikotik alevlenmeye sokar.",
          ar: "غير صحيح. تلغي ناهضات الدوبامين التامة الفعالية المضادة للذهان في كامل الدماغ مفجرة انتكاسة ذهانية عنيفة وفورية."
        }
      }
    ]
  }
];


// -------------------------------------------------------------
// UPDATE LESSON FUNCTION
// -------------------------------------------------------------
function applyUpdate(filePath, stepsData) {
  const lesson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (stepsData.length !== 12) {
    throw new Error(`Expected exactly 12 steps in update data, got ${stepsData.length}`);
  }
  
  stepsData.forEach((stepUpdate, idx) => {
    // Validate prompt word count
    validateWords(idx + 1, 'prompt', stepUpdate.prompt);
    
    // Update step prompt
    lesson.steps[idx].prompt = stepUpdate.prompt;
    
    // Update step options
    if (stepUpdate.options) {
      stepUpdate.options.forEach((opt, optIdx) => {
        validateWords(idx + 1, `option ${optIdx + 1}`, opt.text);
      });
      
      if (!lesson.steps[idx].conceptCheck) {
        lesson.steps[idx].conceptCheck = {};
      }
      lesson.steps[idx].conceptCheck.options = stepUpdate.options;
      
      // Mirror to config.options
      if (!lesson.steps[idx].config) {
        lesson.steps[idx].config = {};
      }
      lesson.steps[idx].config.options = JSON.parse(JSON.stringify(stepUpdate.options));
    } else {
      // Step 5 interactive widget
      if (!lesson.steps[idx].conceptCheck) {
        lesson.steps[idx].conceptCheck = {};
      }
      lesson.steps[idx].conceptCheck.options = [];
      if (!lesson.steps[idx].config) {
        lesson.steps[idx].config = {};
      }
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(lesson, null, 2) + '\n', 'utf8');
  console.log(`Successfully updated: ${filePath}`);
}

// Target paths
const worktreeDir = 'C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/courses/pharmacology/lessons';
const mainRepoDir = 'C:/Users/hp/Documents/antigravity/valiant-raman/courses/pharmacology/lessons';

applyUpdate(path.join(worktreeDir, 'lesson-11.json'), l11Steps);
applyUpdate(path.join(worktreeDir, 'lesson-12.json'), l12Steps);

applyUpdate(path.join(mainRepoDir, 'lesson-11.json'), l11Steps);
applyUpdate(path.join(mainRepoDir, 'lesson-12.json'), l12Steps);

console.log('Wave 6 applied and dual-workspace synchronized successfully!');
