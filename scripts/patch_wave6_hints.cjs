const fs = require('fs');
const path = require('path');

const l11Hints = [
  // Step 1: hook
  [
    {
      tier: 1,
      tr: "Biri kapıyı çalmak için ev sahibine (GABA) muhtaçtır; diğeri ise ev sahibini beklemeden kapıyı kırıp içeri girer.",
      ar: "أحدهما يحتاج لصاحب البيت (GABA) ليفتح الباب؛ والآخر يكسر الباب ويقتحم دون انتظار أحد.",
      en: "One drug obligatorily requires endogenous GABA; the other can directly crowbar the door open without any host."
    },
    {
      tier: 2,
      tr: "Benzodiyazepinler tek başlarına kanalı açamazlar; sadece GABA'nın yaptığı açılmayı frekans düzeyinde kolaylaştırırlar.",
      ar: "تعجز البنزوديازيبينات عن فتح القناة بمفردها؛ بل تسهل الفتح الذي يحدثه GABA بزيادة تردده فقط.",
      en: "Benzodiazepines cannot gate the channel alone; they purely augment opening frequency in response to GABA."
    },
    {
      tier: 3,
      tr: "Barbitüratlar yüksek dozda doğrudan kanal açıcıdır (GABA-mimetik); bu da kontrolsüz solunum durmasına yol açar.",
      ar: "أما الباربيتورات فتفتح القناة مباشرة عند التراكيز المرتفعة مسببة توقفاً تاماً لمركز التنفس النخاعي.",
      en: "Barbiturates directly gate chloride channels at high doses without GABA, triggering fatal medullary respiratory arrest."
    }
  ],

  // Step 2: question
  [
    {
      tier: 1,
      tr: "İki ilacın intrensek etkinliklerini ortamda hiç transmitter yokken karşılaştırın.",
      ar: "قارن الفاعلية الذاتية لكلا الدواءين في غياب تام للناقل العصبي الداخلي.",
      en: "Compare the intrinsic gating efficacy of both drug classes when neurotransmitter is completely absent."
    },
    {
      tier: 2,
      tr: "Pozitif allosterik modülatörler ortosterik agonist olmadan klor akışı sağlayamazlar.",
      ar: "تعجز المعدلات التفارغية الإيجابية عن تمرير الكلوريد دون ارتباط ناهض أصلي بالمستقبل.",
      en: "Positive allosteric modulators cannot elicit ion flux without orthosteric agonist receptor occupancy."
    },
    {
      tier: 3,
      tr: "Diyazepam sıfır klor iletir; yüksek doz barbitürat ise GABA olmadan da kanalı açarak iletkenlik üretir.",
      ar: "يمرر الديازيبام صفراً من الكلوريد؛ بينما تفتح الباربيتورات العالية القناة مباشرة لتوليد تيار كلسيومي دون GABA.",
      en: "Diazepam produces zero chloride conductance; high-dose barbiturates directly gate the channel without GABA."
    }
  ],

  // Step 3: intuition
  [
    {
      tier: 1,
      tr: "Anahtar (GABA) olmadan yağlanmış menteşe tek başına kapıyı açabilir mi? Asla.",
      ar: "هل يمكن للمفصل المزيت أن يفتح الباب من تلقاء نفسه دون إدارة المفتاح؟ مستحيل.",
      en: "Can oiled hinges swing the vault door open without someone turning the key? Never."
    },
    {
      tier: 2,
      tr: "Kapıyı levye ile kıran barbitürat ise anahtara ihtiyaç duymaz; içeri sel gibi klorür akar.",
      ar: "أما من يخلع الباب (الباربيتورات) فلا يحتاج مفتاحاً؛ فيتدفق الكلوريد كالسيل دون مفتاح.",
      en: "A crowbar (barbiturate) ignores the key entirely, letting a flood of chloride rush into the neuron."
    },
    {
      tier: 3,
      tr: "Bu yüzden benzodiyazepin güvenlidir: GABA yoksa kasa kapısı sıkıca kilitli kalır!",
      ar: "لهذا السبب تعد البنزوديازيبينات آمنة: ففي غياب GABA يظل باب الخزنة موصداً بإحكام!",
      en: "This is why benzodiazepines are safe: without GABA, the vault remains securely locked!"
    }
  ],

  // Step 4: visual_explanation
  [
    {
      tier: 1,
      tr: "GABA-A reseptörü beş alt birimden oluşan heteropentamerik bir anyon kanalıdır.",
      ar: "مستقبل GABA-A قناة أنيونية خماسية خلوية متغايرة الوحدات.",
      en: "The GABA-A receptor is a heteropentameric anion pore composed of five distinct protein subunits."
    },
    {
      tier: 2,
      tr: "GABA molekülleri alfa/beta arasına, benzodiyazepinler ise alfa/gama arayüzüne kenetlenir.",
      ar: "ترتبط جزيئات GABA بين ألفا وبيتا، بينما تستقر البنزوديازيبينات عند سطح التماس بين ألفا وغاما.",
      en: "GABA binds at the two alpha/beta interfaces; benzodiazepines nestle at the alpha/gamma interface."
    },
    {
      tier: 3,
      tr: "İçeri giren Cl- iyonları zarı -70'ten -85 mV'a hiperpolarize ederek aksiyon potansiyelini susturur.",
      ar: "تدفق أيونات الكلوريد يفرط استقطاب الغشاء من -70 إلى -85 ميلي فولت مسكتاً جهود الفعل العصبية.",
      en: "Influxing Cl- hyperpolarizes membrane potential from -70 to -85 mV, establishing a silencing IPSP."
    }
  ],

  // Step 5: interactive_artifact
  [
    {
      tier: 1,
      tr: "Eğrinin sağa mı sola mı kaydığını ve Emax tavanının değişip değişmediğini inceleyin.",
      ar: "لاحظ هل ينزاح المنحنى يميناً أم يساراً، وما إذا كان سقف Emax يتغير أم يثبت.",
      en: "Observe whether the curve shifts left or right, and note if the maximal efficacy ceiling changes."
    },
    {
      tier: 2,
      tr: "Diyazepam GABA afinitesini artırarak EC50 değerini düşürür, ancak Emax değerini artıramaz.",
      ar: "يزيد الديازيبام ألفة GABA مخفضاً قيمة EC50، لكنه يعجز عن رفع Emax فوق سقفها الأصلي.",
      en: "Diazepam augments GABA affinity to lower EC50, but cannot elevate Emax above baseline."
    },
    {
      tier: 3,
      tr: "Flumazenil eklendiğinde diyazepam BZD bölgesinden sökülür ve eğri tam orijinal baseline hattına döner.",
      ar: "عند إضافة الفلومازينيل يُزاح الديازيبام من موقع البنزوديازيبين ويعود المنحنى لخط الأساس تماماً.",
      en: "Adding flumazenil displaces diazepam from the BZD pocket, snapping the curve back to baseline."
    }
  ],

  // Step 6: guided_discovery
  [
    {
      tier: 1,
      tr: "Reseptörün verebileceği en yüksek yanıtı kim belirler: allosterik modülatör mü, yoksa nörotransmitter mi?",
      ar: "من يحدد الاستجابة القصوى للمستقبل: المعدل التفارغي أم الناقل العصبي الفسيولوجي؟",
      en: "What defines the ceiling of inhibition: the allosteric modulator or the physiological neurotransmitter?"
    },
    {
      tier: 2,
      tr: "PAM sadece endojen GABA'nın etkinliğini artırır; sinapstaki tüm GABA bağlandığında etki doyar.",
      ar: "يضاعف PAM كفاءة GABA الداخلي فقط؛ وعند ارتباط كامل GABA ينتهي أي تأثير إضافي.",
      en: "A PAM purely amplifies endogenous GABA; once all released GABA is bound, effect saturates."
    },
    {
      tier: 3,
      tr: "Bu tavan, kontrolsüz aşırı hiperpolarizasyonu ve solunum merkezlerinin çökmesini önler.",
      ar: "يحمي هذا السقف الدوائي من فرط الاستقطاب العشوائي وانهيار مركز التنفس بالجرعات المفرطة.",
      en: "This ceiling prevents uncontrolled neuronal silencing and protects against fatal respiratory arrest."
    }
  ],

  // Step 7: formal_explanation
  [
    {
      tier: 1,
      tr: "Kanal kinetiğinde 'açılma sıklığı' ile 'açık kalma süresi' arasındaki farkı hatırlayın.",
      ar: "تذكر الفرق الجوهري في حركية القنوات بين 'تردد مرات الفتح' و'مدة بقاء القناة مفتوحة'.",
      en: "Recall the key biophysical distinction between channel opening frequency and open burst duration."
    },
    {
      tier: 2,
      tr: "Benzodiyazepinler frekansı artırır; barbitüratlar ise süreyi uzatır ve doğrudan kanalı açar.",
      ar: "تزيد البنزوديازيبينات تردد الفتح؛ بينما تطيل الباربيتورات مدة الفتح وتفتح القناة مباشرة.",
      en: "Benzodiazepines increase opening frequency; barbiturates prolong open duration and directly gate the pore."
    },
    {
      tier: 3,
      tr: "Flumazenil BZD bölgesinde yarışmalı nötral antagonisttir; etkiyi sıfırlar ama kanalı tek başına kapatmaz.",
      ar: "الفلومازينيل مناهض تنافسي محايد؛ يعاكس تأثير البنزوديازيبين دون أن يثبط القناة بمفرده.",
      en: "Flumazenil is a neutral competitive antagonist; it resets BZD effect with zero intrinsic inverse efficacy."
    }
  ],

  // Step 8: concept_check
  [
    {
      tier: 1,
      tr: "Trisiklik antidepresanların (TSA) kalp ve beyindeki sodyum kanalları üzerindeki etkisini düşünün.",
      ar: "فكر في التأثير السام لمضادات الاكتئاب ثلاثية الحلقات (TCA) على قنوات الصوديوم القلبية والعصبية.",
      en: "Consider the cardiotoxic and proconvulsant effects of tricyclic antidepressants on sodium channels."
    },
    {
      tier: 2,
      tr: "Birlikte alınan benzodiyazepin, TSA'nın tetikleyeceği nöbetleri GABA üzerinden baskılayarak hastayı korur.",
      ar: "يعمل البنزوديازيبين المتناول مشاركةً كدرع واقٍ يخمد النوبات الصرعية المحرضة بواسطة TCA.",
      en: "The co-ingested benzodiazepine acts as a protective shield suppressing TCA-induced convulsions."
    },
    {
      tier: 3,
      tr: "Flumazenil verilirse koruyucu kalkan aniden kalkar; hasta durdurulamaz status epileptikusa ve aritmiye girer.",
      ar: "إذا أُعطي الفلومازينيل زال هذا الدرع الواقي فجأة، مفجراً حالة صرعية معندة واضطرابات بطينية قاتلة.",
      en: "Administering flumazenil strips away the anticonvulsant shield, precipitating refractory status epilepticus."
    }
  ],

  // Step 9: application
  [
    {
      tier: 1,
      tr: "Kronik sedatif kullanımında beynin geliştirdiği adaptif nöroplastik değişiklikleri hatırlayın.",
      ar: "تذكر التغيرات العصبية التكيفية التي يحدثها الدماغ بعد التعرض المزمن للمهدئات.",
      en: "Recall the homeostatic neuroadaptations the brain develops during long-term sedative exposure."
    },
    {
      tier: 2,
      tr: "GABA-A reseptörleri duyarsızlaşır ve uyarıcı glutamat devreleri (NMDA/AMPA) telafi amacıyla yukarı regüle olur.",
      ar: "تنخفض حساسية مستقبلات GABA وتتكاثر مسارات الغلوتامات الاستثارية (NMDA) تعويضياً.",
      en: "GABA-A receptors uncouple while excitatory glutamatergic NMDA/AMPA circuits upregulate compensatorily."
    },
    {
      tier: 3,
      tr: "Flumazenil kalan zayıf GABA tonusunu da aniden sıfırlayınca kontrolsüz bir glutamat fırtınası ve nöbet patlar.",
      ar: "عندما يزيل الفلومازينيل ما تبقى من تثبيط GABA فجأة، تنفجر عاصفة استثارة غلوتاماتية مسببة نوبات صرع.",
      en: "Flumazenil abruptly strips the remaining GABA tone, unleashing an unopposed glutamate storm and seizures."
    }
  ],

  // Step 10: retrieval
  [
    {
      tier: 1,
      tr: "GABA-A reseptörünün alfa alt birim tiplerinin farklı farmakolojik etkilerden sorumlu olduğunu hatırlayın.",
      ar: "تذكر أن تحت وحدات ألفا المختلفة لمستقبل GABA-A مسؤولة عن تأثيرات دوائية متباينة.",
      en: "Recall that distinct GABA-A alpha subunit isoforms mediate segregated pharmacological actions."
    },
    {
      tier: 2,
      tr: "Alfa-1 sedasyon ve uyku sağlar; alfa-2 ve alfa-3 ise anksiyoliz ve kas gevşemesinden sorumludur.",
      ar: "تتوسط ألفا-1 التهدئة والنوم؛ بينما تتوسط ألفا-2 وألفا-3 إزالة القلق وإرخاء العضلات.",
      en: "Alpha-1 mediates sedation and hypnosis; alpha-2 and alpha-3 mediate anxiolysis and myorelaxation."
    },
    {
      tier: 3,
      tr: "Zolpidem sadece alfa-1'e seçici bağlanır; bu yüzden kas gevşetmeden veya kaygı gidermeden uyutur.",
      ar: "يرتبط الزولبيديم انتقائياً بألفا-1؛ لذلك يحث على النوم دون إرخاء العضلات أو تخفيف القلق سريرياً.",
      en: "Zolpidem selectively targets alpha-1; thus it acts as a pure hypnotic devoid of anxiolytic properties."
    }
  ],

  // Step 11: connection
  [
    {
      tier: 1,
      tr: "İyonotropik kanal ile metabotropik GPCR reseptörlerinin sinyal iletim hızını ve mekanizmasını karşılaştırın.",
      ar: "قارن سرعة وآلية نقل الإشارات بين القنوات الأيونية والمستقبلات الأيضية المقترنة بالبروتين G.",
      en: "Contrast the signaling speed and biochemical cascade of ionotropic channels versus metabotropic GPCRs."
    },
    {
      tier: 2,
      tr: "GABA-A doğrudan klor geçirerek milisaniyede zarı hiperpolarize eder.",
      ar: "يمرر GABA-A الكلوريد مباشرة لفرط استقطاب الغشاء خلال أجزاء من الألف من الثانية.",
      en: "GABA-A fluxes chloride directly to hyperpolarize the resting membrane within milliseconds."
    },
    {
      tier: 3,
      tr: "Dopamin D2 reseptörleri ise Gi kenetlidir; adenilat siklazı baskılayıp cAMP'yi düşürerek hücresel yanıtı modüle eder.",
      ar: "بينما تقترن مستقبلات D2 ببروتين Gi؛ فتثبط محلقة الأدينيلات وتخفض cAMP لتعديل وظيفة الخلية.",
      en: "Dopamine D2 GPCRs couple to Gi, inhibiting adenylyl cyclase and lowering cAMP over hundreds of milliseconds."
    }
  ],

  // Step 12: mastery_check
  [
    {
      tier: 1,
      tr: "EKG'deki QRS genişlemesi ve aVR'deki R dalgası hangi ölümcül ilaç zehirlenmesinin patognomonik bulgusudur?",
      ar: "اتساع مركب QRS وظهور موجة R في اشتقاق aVR علامتان فارقتان لأي تسمم دوائي مهدد للحياة؟",
      en: "What life-threatening drug toxicity is pathognomonically signaled by widened QRS and a tall terminal aVR R wave?"
    },
    {
      tier: 2,
      tr: "Bu bulgular trisiklik antidepresan (TSA) sodyum kanal blokajını gösterir; hastadaki BZD nöbeti baskılamaktadır.",
      ar: "تشير هذه التغيرات لحصار قنوات الصوديوم بمضادات الاكتئاب ثلاثية الحلقات؛ والبنزوديازيبين يكبح النوبات حالياً.",
      en: "These findings confirm TCA cardiac sodium channel blockade; the co-ingested BZD is suppressing seizures."
    },
    {
      tier: 3,
      tr: "Flumazenil koruyucu BZD kalkanını yıkar ve hastayı tedavi edilemez status epileptikus ile ventriküler fibrilasyona sokar.",
      ar: "إعطاء الفلومازينيل يسقط حماية البنزوديازيبين مفجراً حالة صرعية معندة ورجفاناً بطينياً مميتاً.",
      en: "Flumazenil destroys the protective BZD tone, precipitating intractable status epilepticus and lethal arrhythmias."
    }
  ]
];

const l12Hints = [
  // Step 1: hook
  [
    {
      tier: 1,
      tr: "Dopaminin beyindeki tek bir bölgede değil, farklı anatomik yolaklarda farklı görevler yürüttüğünü hatırlayın.",
      ar: "تذكر أن الدوبامين لا يعمل في مركز واحد، بل يدير وظائف متباينة في مسارات تشريحية مستقلة.",
      en: "Remember that dopamine operates across segregated anatomical pathways with distinct physiological functions."
    },
    {
      tier: 2,
      tr: "Striatumdaki motor kontrol merkezinde dopamin ile asetilkolin arasında hassas bir denge tahterevallisi bulunur.",
      ar: "يوجد في مركز التحكم الحركي بالمخطط أرجوحة توازن دقيقة بين الدوبامين والأسيتيل كولين.",
      en: "In the striatal motor center, dopamine and acetylcholine exist in a delicately balanced seesaw equilibrium."
    },
    {
      tier: 3,
      tr: "D2 blokajı mezolimbikte psikozu dindirirken, nigrostriatal yolda dopaminin asetilkolin üzerindeki frenini kaldırarak akut distoni yapar.",
      ar: "حظر D2 يخمد الذهان ميزولمبياً، لكنه يرفع كبح الدوبامين عن الأسيتيل كولين حركياً مفجراً تشنجاً كولينياً حاداً.",
      en: "Blocking D2 quiets mesolimbic psychosis, but lifts dopamine's brake on striatal acetylcholine to cause acute dystonia."
    }
  ],

  // Step 2: question
  [
    {
      tier: 1,
      tr: "Dört dopamin yolağını gözünüzün önüne getirin: mezolimbik, mezokortikal, nigrostriatal ve tüberoinfundibuler.",
      ar: "استحضر المسارات الدوبامينية الأربعة: الميزولمبي، الميزوكورتيكال، المخططي الأسود، والقمعي النخامي.",
      en: "Envision the four core dopamine pathways: mesolimbic, mesocortical, nigrostriatal, and tuberoinfundibular."
    },
    {
      tier: 2,
      tr: "Şizofrenide mezolimbik yol hiperaktifken, mezokortikal yol zaten dopamin eksikliği nedeniyle hipoaktiftir.",
      ar: "في الفصام يكون الميزولمبيك مفرط النشاط، بينما يعاني الميزوكورتيكال أصلاً من نقص الدوبامين وخمول النشاط.",
      en: "In schizophrenia, the mesolimbic path is hyperactive, while the mesocortical path is already hypoactive."
    },
    {
      tier: 3,
      tr: "D2 antagonisti pozitif semptomları çözer ama negatif semptomları, motor hareketleri ve prolaktin yüksekliğini kötüleştirir.",
      ar: "يعالج مناهض D2 الأعراض الإيجابية، لكنه يفاقم الأعراض السلبية، ويحدث اضطراب الحركة وفرط البرولاكتين.",
      en: "Pure D2 blockade cures positive symptoms, but worsens negative symptoms, causes motor EPS, and elevates prolactin."
    }
  ],

  // Step 3: intuition
  [
    {
      tier: 1,
      tr: "Nordström ve Farde'nin PET neuroimaging çalışmalarındaki terapötik pencere sınırlarını hatırlayın.",
      ar: "تذكر حدود النافذة العلاجية المثبتة بدراسات التصوير البوزيتروني (PET) لنوردستروم وفاردي.",
      en: "Recall the therapeutic occupancy boundaries established by Nordström and Farde PET neuroimaging studies."
    },
    {
      tier: 2,
      tr: "Antipsikotik etkinlik için gereken asgari doluluk oranı ile motor yan etkilerin patlak verdiği üst eşiği düşünün.",
      ar: "فكر في الحد الأدنى للإشغال اللازم للفعالية، والعتبة العليا التي تندلع عندها السمية الحركية خارج الهرمية.",
      en: "Consider the minimum occupancy needed for clinical efficacy versus the upper threshold triggering motor EPS."
    },
    {
      tier: 3,
      tr: "Klinik etki %65 D2 doluluğunda başlar; %80 aşıldığında ise ekstrapiramidal semptomlar ve hiperprolaktinemi fırlar.",
      ar: "تبدأ الفعالية العلاجية عند إشغال 65% لـ D2؛ بينما يؤدي تجاوز 80% لاندلاع حاد للأعراض خارج الهرمية وفرط البرولاكتين.",
      en: "Antipsychotic efficacy begins at 65% D2 occupancy; exceeding 80% occupancy triggers motor EPS and hyperprolactinemia."
    }
  ],

  // Step 4: visual_explanation
  [
    {
      tier: 1,
      tr: "Dopamin eksikliğinde striatumda yükselen aşırı asetilkolin tonusunu nasıl bastırabilirsiniz?",
      ar: "كيف يمكنك إخماد التوتر الكوليني المفرط في المخطط عند هبوط إشارات الدوبامين؟",
      en: "How can you pharmacologically dampen the excessive striatal cholinergic tone caused by dopamine deficit?"
    },
    {
      tier: 2,
      tr: "Santral etkili bir antimuskarinik (M1 blokörü) asetilkolinin kas spazmı yaptıran etkisini bloke eder.",
      ar: "حاصرات المسكارين المركزية (حاصرات M1) تعطل تأثير الأسيتيل كولين المحرض للتشنج العضلي.",
      en: "A centrally acting antimuscarinic (M1 antagonist) blocks acetylcholine's ability to drive muscle spasms."
    },
    {
      tier: 3,
      tr: "Biperiden veya benztropin M1 reseptörlerini bloke ederek dopamin-asetilkolin dengesini hızla kurar ve distoniyi çözer.",
      ar: "يحظر البيبيريدين أو البنزتروبين مستقبلات M1، معيداً توازن الدوبامين والأسيتيل كولين ليحل التشنج فوراً.",
      en: "Biperiden or benztropine blocks M1 receptors, promptly restoring the dopamine-acetylcholine balance to abort dystonia."
    }
  ],

  // Step 5: interactive_artifact
  [
    {
      tier: 1,
      tr: "Haloperidolün fonksiyonel gruplarını D2 reseptör cebindeki komplementer amino asitlerle eşleştirin.",
      ar: "طابق المجموعات الوظيفية للهالوبيريدول مع الأحماض الأمينية المكملة في جيب مستقبل D2.",
      en: "Match haloperidol's functional moieties with complementary amino acids inside the D2 binding pocket."
    },
    {
      tier: 2,
      tr: "Tersiyer amin TM3'teki Asp114 ile tuz köprüsü kurar; aromatik halkalar ise Trp386 ve Phe390 ile etkileşir.",
      ar: "يشكل الأمين الثالثي جسراً ملحياً مع Asp114 في TM3؛ وتتآثر الحلقات العطرية مع Trp386 و Phe390.",
      en: "The tertiary amine forms an ionic salt bridge with Asp114 (TM3); aromatic rings interact with Trp386 and Phe390."
    },
    {
      tier: 3,
      tr: "4-hidroksil grubu Ser193 (TM5) ile hidrojen bağı yaparak yüksek afiniteli antagonist kenetlenmesini tamamlar.",
      ar: "تشكل مجموعة 4-هيدروكسيل رابطة هيدروجينية مع Ser193 في TM5 متممة الالتحام عالي الألفة.",
      en: "The 4-hydroxyl group hydrogen bonds with Ser193 (TM5), locking the high-affinity antagonistic conformation."
    }
  ],

  // Step 6: guided_discovery
  [
    {
      tier: 1,
      tr: "Serotonin 5-HT2A reseptörlerinin nigrostriatal dopamin terminalleri üzerindeki normal görevini hatırlayın.",
      ar: "تذكر الوظيفة الفسيولوجية لمستقبلات السيروتونين 5-HT2A على نهايات الدوبامين في المسار الحركي.",
      en: "Recall the normal physiological action of serotonin 5-HT2A heteroreceptors on motor dopamine terminals."
    },
    {
      tier: 2,
      tr: "5-HT2A normalde dopamin salınımını frenler; bu reseptör bloke edilirse dopamin salınımı serbest kalır.",
      ar: "يكبح 5-HT2A إفراز الدوبامين فسيولوجياً؛ وحظر هذا المستقبل يحرر إفراز الدوبامين الموضعي بالمخطط.",
      en: "5-HT2A normally brakes dopamine release; blocking it disinhibits local dopamine outflow in the striatum."
    },
    {
      tier: 3,
      tr: "Açığa çıkan dopamin striatal D2'de ilaçla yarışır ve doluluğu %80'in altında tutarak motor EPS'yi önler.",
      ar: "يزاحم الدوبامين المحرر الدواء عند مستقبلات D2 بالمخطط، مبقياً الإشغال دون 80% ليحمي من EPS.",
      en: "Released dopamine outcompetes the drug at striatal D2 receptors, keeping occupancy below 80% to spare EPS."
    }
  ],

  // Step 7: formal_explanation
  [
    {
      tier: 1,
      tr: "Meltzer oranı ve Kapur-Seeman 'fast-off' kinetik hipotezini bir arada değerlendirin.",
      ar: "قيم معاً مؤشر ميلتزر وفرضية حركية التفكك السريع 'fast-off' لكابور وسيمان.",
      en: "Evaluate the Meltzer affinity ratio together with the Kapur-Seeman fast-off kinetic hypothesis."
    },
    {
      tier: 2,
      tr: "Atipikler 5-HT2A'ya D2'den daha yüksek afiniteyle bağlanır ve D2 reseptöründen hızla ayrışırlar.",
      ar: "ترتبط اللانمطيات بـ 5-HT2A بألفة أعلى من D2، وتتفكك عن مستقبلات D2 بسرعة فائقة مقارنة بالنمطية.",
      en: "Atypicals bind 5-HT2A with higher affinity than D2 and dissociate rapidly from the D2 receptor pore."
    },
    {
      tier: 3,
      tr: "Hızlı ayrışma ('fast-off'), endojen dopamin dalgalarının fizyolojik motor sinyalleri iletmesine izin verir.",
      ar: "يتيح التفكك السريع لموجات الدوبامين الطبيعية تمرير إشارات التحكم الحركي الفسيولوجية دون إعاقة.",
      en: "Fast-off kinetics allows physiological pulses of endogenous dopamine to transmit essential motor signals."
    }
  ],

  // Step 8: concept_check
  [
    {
      tier: 1,
      tr: "Uzun süre D2 blokajına maruz kalan postsinaptik reseptörlerin nasıl bir adaptasyon geliştirdiğini düşünün.",
      ar: "فكر في التكيف العصبي الذي تطوره مستقبلات D2 البعد مشبكية بعد حظرها المزمن لسنوات.",
      en: "Consider the compensatory adaptations developed by postsynaptic D2 receptors after years of chronic blockade."
    },
    {
      tier: 2,
      tr: "D2 reseptörleri aşırı çoğalır ve süpersensitif hale gelir; bu durumda dopamin sinyali aşırı uyarılabilir.",
      ar: "تتكاثر مستقبلات D2 وتصبح مفرطة الحساسية؛ مما يجعل أي إشارة دوبامينية تنفجر كحركات رقصية.",
      en: "D2 receptors upregulate and become supersensitive; motor circuits become exquisitely hypersensitive to dopamine."
    },
    {
      tier: 3,
      tr: "Antikolinerjik verilirse dopamini dengeleyen kolinerjik fren kalkar ve tardif diskinezi kore hareketleri azgınlaşır.",
      ar: "إعطاء مضاد كولين يزيل الكبح الكوليني المعاكس للدوبامين، مما يؤدي لاشتعال عسر الحركة المتأخر وتفاقمه.",
      en: "Administering anticholinergics eliminates the opposing cholinergic brake, disastrously worsening tardive chorea."
    }
  ],

  // Step 9: application
  [
    {
      tier: 1,
      tr: "Parsiyel agonistin 'ortamdaki ligand düzeyine göre davranış değiştiren' yapısını hatırlayın.",
      ar: "تذكر طبيعة الناهض الجزئي الذي يتغير سلوكه السريري تبعاً لتركيز الناقل الطبيعي في البيئة المشبكية.",
      en: "Recall how a partial agonist dynamically adapts its functional behavior based on local agonist tone."
    },
    {
      tier: 2,
      tr: "Aripiprazol %30 intrensek aktiviteye sahiptir; tam dopaminin (%100) olduğu yerde etkinliği %30'a çeker.",
      ar: "يمتلك الأريبيبرازول فاعلية ذاتية ~30%؛ فيخفض التنشيط المفرط في الميزولمبيك (100%) إلى 30% فقط.",
      en: "Aripiprazole has ~30% intrinsic efficacy; in hyperdopaminergic zones it dampens signaling down to 30%."
    },
    {
      tier: 3,
      tr: "Dopaminin az olduğu hipofiz ve striatumda ise %30 bazal uyarı vererek EPS ve hiperprolaktinemiyi önler.",
      ar: "وفي النخامية والمخطط يوفر تنشيطاً قاعدياً بنسبة 30% كافياً لمنع الأعراض الحركية وفرط البرولاكتين.",
      en: "In low-dopamine pituitary and striatal pathways, it provides 30% basal tone, preventing EPS and hyperprolactinemia."
    }
  ],

  // Step 10: retrieval
  [
    {
      tier: 1,
      tr: "Beyindeki dört dopamin yolağının adlarını ve anatomik sonlanma yerlerini gözden geçirin.",
      ar: "راجع أسماء المسارات الدوبامينية الأربعة في الدماغ ومناطق انتهائها التشريحية.",
      en: "Review the anatomical origins, trajectories, and terminal regions of the four major dopamine pathways."
    },
    {
      tier: 2,
      tr: "Limbik sistem duyguları, striatum hareketi, hipotalamus-hipofiz ekseni ise prolaktini yönetir.",
      ar: "يدير الجهاز الحوفي العواطف والهلاوس، ويتحكم المخطط بالحركة، ويدير المحور النخامي هرمون الحليب.",
      en: "The limbic system governs psychosis; the striatum coordinates movement; the pituitary axis regulates prolactin."
    },
    {
      tier: 3,
      tr: "Sıralama: Antipsikotik etkinlik = Mezolimbik; Motor EPS = Nigrostriatal; Hiperprolaktinemi = Tüberoinfundibuler.",
      ar: "الترتيب: الفعالية = الميزولمبيك؛ الأعراض الحركية = المخططي الأسود؛ فرط البرولاكتين = القمعي النخامي.",
      en: "Sequence: Antipsychotic efficacy = Mesolimbic; Motor EPS = Nigrostriatal; Hyperprolactinemia = Tuberoinfundibular."
    }
  ],

  // Step 11: connection
  [
    {
      tier: 1,
      tr: "Antipsikotiklerin yan etki profilini belirleyen hedeften sapmış H1, alfa-1 ve M1 reseptörlerini düşünün.",
      ar: "فكر في المستقبلات الجانبية H1 وألفا-1 وM1 التي تحدد المظهر الجانبي لمضادات الذهان.",
      en: "Consider the off-target H1, alpha-1, and muscarinic M1 receptors that govern antipsychotic adverse effects."
    },
    {
      tier: 2,
      tr: "Histamin iştah ve uyanıklığı, alfa-1 vasküler tonusu, muskarinik reseptörler ise salgıları yönetir.",
      ar: "يتحكم الهيستامين باليقظة والشهية، وألفا-1 بالضغط الوعائي، والمسكارين بإفراز اللعاب وحركة الأمعاء.",
      en: "Histamine controls wakefulness and appetite; alpha-1 maintains vascular tone; muscarinic receptors control secretions."
    },
    {
      tier: 3,
      tr: "H1 blokajı sedasyon ve kilo artışı; alfa-1 ortostatik hipotansiyon; M1 ise ağız kuruluğu ve kabızlık yapar.",
      ar: "حظر H1 يسبب النعاس والبدانة؛ وألفا-1 يسبب هبوط الضغط الانتصابي؛ وM1 يسبب جفاف الفم والإمساك.",
      en: "H1 blockade drives sedation and weight gain; alpha-1 causes orthostatic syncope; M1 causes dry mouth and constipation."
    }
  ],

  // Step 12: mastery_check
  [
    {
      tier: 1,
      tr: "PET'te %84 D2 doluluğu olan, prolaktini fırlamış ve rijiditesi olan hastaya hangi farmakodinamik profil gerekir?",
      ar: "مريض بإشغال 84% لـ D2 في PET وفرط برولاكتين وتيبس؛ ما المظهر الديناميكي الدوائي القادر على إنقاذه؟",
      en: "What pharmacodynamic profile is needed for a patient with 84% striatal D2 occupancy, hyperprolactinemia, and EPS?"
    },
    {
      tier: 2,
      tr: "D2 doluluğunu %80'in altına çekecek ancak psikozu alevlendirmeyecek bir 'termostat' ajan seçilmelidir.",
      ar: "يجب اختيار دواء 'منظم حرارة' يخفض الحظر الفعلي دون 80% دون أن يفجر انتكاسة ذهانية.",
      en: "A 'thermostat' agent is required that lowers effective striatal blockade below 80% without psychotic relapse."
    },
    {
      tier: 3,
      tr: "Aripiprazol D2 parsiyel agonizmi (%30 tonus) ile haloperidolü söker, prolaktini ve rijiditeyi çözer, psikozu tutar.",
      ar: "الأريبيبرازول بناهضه الجزئي لـ D2 (30%) يزيح الهالوبيريدول، ويعالج التيبس والبرولاكتين، مع ضبط الذهان تماماً.",
      en: "Aripiprazole's ~30% intrinsic D2 tone displaces haloperidol, reversing hyperprolactinemia and tremor while stabilizing psychosis."
    }
  ]
];

function patchHints(filePath, hintsArray) {
  const lesson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  hintsArray.forEach((stepHints, idx) => {
    lesson.steps[idx].hints = stepHints;
  });
  fs.writeFileSync(filePath, JSON.stringify(lesson, null, 2) + '\n', 'utf8');
  console.log(`Successfully patched hints in: ${filePath}`);
}

const worktreeDir = 'C:/Users/hp/.gemini/antigravity/worktrees/valiant-raman/pharmacy_education_platform_setup/courses/pharmacology/lessons';
const mainRepoDir = 'C:/Users/hp/Documents/antigravity/valiant-raman/courses/pharmacology/lessons';

patchHints(path.join(worktreeDir, 'lesson-11.json'), l11Hints);
patchHints(path.join(worktreeDir, 'lesson-12.json'), l12Hints);

patchHints(path.join(mainRepoDir, 'lesson-11.json'), l11Hints);
patchHints(path.join(mainRepoDir, 'lesson-12.json'), l12Hints);

console.log('Wave 6 hints patched and dual-workspace synchronized successfully!');
