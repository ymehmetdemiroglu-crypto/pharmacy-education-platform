const fs = require('fs');
const path = require('path');

// ============================================================================
// DATA FOR LESSON 09: pharm-mod5-les1
// ============================================================================
const lesson09Steps = [
  // Step 1: Hook
  {
    id: 'pharm-mod5-les1-step1',
    stage: 'hook',
    phase: 'explore',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Klinik Paradoks: ACEi Kuru Öksürük ve Anjioödem Paradoksu",
      ar: "المفارقة السريرية: لغز السعال الجاف والوذمة الوعائية بـ ACEi",
      en: "Clinical Paradox: The ACEi Dry Cough & Angioedema Dilemma"
    },
    prompt: {
      tr: "Lisinopril kullanan hipertansiyon hastasında inatçı, kuru bir gece öksürüğü ve ani dil şişmesi gelişir. Losartana geçildiğinde öksürük tamamen kaybolur. Bu tabloyu hangi biyokimyasal mekanizma açıklar?",
      ar: "أصيب مريض ضغط يعالج بليزينوبريل بسعال جاف ليلي عنيد ووذمة مفاجئة في اللسان. أدى التحول إلى لوسارتان لزوال السعال تماماً. ما الآلية الكيميائية الحيوية المفسرة؟",
      en: "An elderly hypertensive patient on lisinopril develops a relentless, dry hacking nocturnal cough and sudden tongue swelling. Switching to losartan completely abolishes the cough. What biochemical mechanism explains this?"
    },
    hints: [
      {
        tier: 1,
        tr: "ACE enzimi tarihsel olarak başka bir isimle de bilinir: kininaz II.",
        ar: "يُعرف إنزيم ACE تاريخياً باسم إنزيمي آخر: كينيناز II.",
        en: "ACE is also known by another historical enzymatic name: kininase II."
      },
      {
        tier: 2,
        tr: "Kininaz II pulmoner dolaşımda anjiyotensin dışındaki hangi peptitleri yıkar?",
        ar: "ما هي الببتيدات غير الأنجيوتنسين التي يفككها كينيناز II في الدوران الرئوي؟",
        en: "What non-angiotensin peptide does kininase II degrade in the pulmonary circulation?"
      },
      {
        tier: 3,
        tr: "ACE inhibitörleri bradikinini ve P maddesini yıkan kininaz II'yi bloke eder; biriken kininler öksürük yapar. ARB'ler kininaz II'yi etkilemez.",
        ar: "تحجب مثبطات ACE إنزيم كينيناز II مفكك البراديكينين؛ وتراكم الكينينات يسبب السعال. لا تؤثر ARBs على كينيناز II.",
        en: "ACE inhibitors block bradykinin and substance P degradation via kininase II; ARBs selectively block AT1 without altering kinin breakdown."
      }
    ],
    conceptCheck: {
      question: {
        tr: "ACE inhibitörleri neden kuru öksürük ve anjioödeme yol açarken ARB'ler bu yan etkiyi göstermez?",
        ar: "لماذا تسبب مثبطات ACE سعالاً جافاً ووذمة وعائية بينما تخلو ARBs من هذا الأثر الجانبي؟",
        en: "Why do ACE inhibitors trigger dry cough and angioedema while ARBs lack this adverse effect?"
      },
      options: [
        {
          id: 'opt-l9-s1-1',
          isCorrect: true,
          text: {
            tr: "ACE (kininaz II) normalde bradikinini ve P maddesini yıkar; ACE inhibisyonu hava yolunda birikimlerine yol açarak bronkokonstriksiyon ve vasküler geçirgenlik yapar.",
            ar: "يفكك إنزيم ACE (كينيناز II) عادة البراديكينين والمادة P؛ يؤدي تثبيطه لتراكمهما مسبباً تشنجاً قصبياً وزيادة في النفوذية الوعائية.",
            en: "ACE (kininase II) normally degrades bradykinin and substance P; ACE inhibition causes their airway and submucosal accumulation, provoking bronchoconstriction and vascular permeability."
          },
          feedback: {
            tr: "Doğru. ACE, bradikinini yıkan kininaz II ile aynı enzimdir. Biriken bradikinin duyusal C-liflerini uyararak öksürük ve anjioödem yapar; ARB'ler kinin metabolizmasına dokunmaz.",
            ar: "صحيح. إنزيم ACE مطابق لـ كينيناز II مفكك البراديكينين. يثير تراكمه ألياف C الحسية محدثاً السعال والوذمة الوعائية، بينما لا تمس ARBs استقلاب الكينين.",
            en: "Correct. ACE is identical to kininase II, degrading bradykinin and substance P. ACEi lead to kinin accumulation; ARBs block AT1 without altering kinin degradation."
          }
        },
        {
          id: 'opt-l9-s1-2',
          isCorrect: false,
          text: {
            tr: "Lisinopril akciğer mast hücrelerine doğrudan bağlanıp degranüle ederek böbreklerce temizlenemeyen devasa histamin salınımına yol açar.",
            ar: "يرتبط ليزينوبريل بالخلايا البدينة الرئوية مفجراً إياها، ومحرراً مخازن هيستامين هائلة تعجز الكلى عن تصريفها.",
            en: "Lisinopril directly binds and degranulates pulmonary mast cells, releasing massive histamine stores that cannot be cleared by renal filtration."
          },
          feedback: {
            tr: "Yanlış. ACEi anjioödemi histamin aracılı değildir; bradikinin kaynaklıdır. Bu yüzden antihistaminikler ve kortikosteroidler bu anjioödemi tedavi edemez.",
            ar: "غير صحيح. لا تتواسط الوذمة الوعائية بالهيستامين؛ بل بالبراديكينين، ولهذا تفشل مضادات الهيستامين والكورتيكوستيرويدات في علاجها.",
            en: "Incorrect. ACEi angioedema is non-histaminergic; it is mediated entirely by bradykinin, which is why antihistamines and steroids fail."
          }
        },
        {
          id: 'opt-l9-s1-3',
          isCorrect: false,
          text: {
            tr: "Düşük sistemik Anjiyotensin II, bronş düz kasını dinlenim tonusundan mahrum bırakarak refleks spazmları ve mukozal şişmeyi tetikler.",
            ar: "يؤدي نقص أنجيوتنسين II الجهازي لحرمان العضلات التنفسية من مقويتها، مما يثير تشنجات انعكاسية ووذمة مخاطية.",
            en: "Low systemic Angiotensin II deprives bronchial smooth muscle of resting tone, triggering reflex spasms and mucosal swelling."
          },
          feedback: {
            tr: "Yanlış. Anjiyotensin II'nin bronşlarda koruyucu bir tonus etkisi yoktur. Öksürük ve ödem tamamen kininlerin yıkılamamasından kaynaklanır.",
            ar: "غير صحيح. ليس للأنجيوتنسين II دور حامٍ للمقوية الشعبية. ينجم السعال كلياً عن عجز تصريف ببتيدات الكينين.",
            en: "Incorrect. Angiotensin II has no protective role against cough reflexes; symptoms arise purely from impaired clearance of kinins."
          }
        }
      ]
    }
  },

  // Step 2: Question
  {
    id: 'pharm-mod5-les1-step2',
    stage: 'question',
    phase: 'explore',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Kavramsal Soru: AT1 ve AT2 Reseptörlerinin Ayrışan Rolleri",
      ar: "سؤال مفاهيمي: الأدوار المتباينة لمستقبلات AT1 و AT2",
      en: "Conceptual Question: AT1 vs AT2 Divergent Receptors"
    },
    prompt: {
      tr: "İlaç kimyagerleri neden hem AT1 hem AT2 reseptörlerini aynı anda bloke eden ilaçlar geliştirmek yerine yalnızca AT1 reseptörlerini bloke eden ARB'leri tasarladılar?",
      ar: "لماذا صمم علماء الأدوية حاصرات مستقبلات الأنجيوتنسين (ARBs) لحصر مستقبلات AT1 فقط بدلاً من حصر AT1 و AT2 معاً؟",
      en: "Why did pharmaceutical chemists design ARBs to block AT1 receptors rather than creating drugs that simultaneously block both AT1 and AT2 receptors?"
    },
    hints: [
      {
        tier: 1,
        tr: "AT1 ve AT2 reseptörleri arasındaki zıt fizyolojik dengeyi düşünün.",
        ar: "فكر في التوازن الفسيولوجي المتعاكس بين مستقبلي AT1 و AT2.",
        en: "Consider the opposing physiological balance between AT1 and AT2 receptors."
      },
      {
        tier: 2,
        tr: "AT1 patolojik yeniden şekillenme ve damar büzülmesi yapar. Serbest kalan AT2 uyarılırsa ne olur?",
        ar: "يتوسط AT1 إعادة التشكيل المرضي والتضيق. ماذا يحدث لو بقي AT2 حراً ليرتبط به الأنجيوتنسين؟",
        en: "AT1 mediates vasoconstriction and remodeling. What happens when unblocked AT2 is stimulated?"
      },
      {
        tier: 3,
        tr: "Selektif AT1 blokajı, dolaşımdaki Ang II'yi vazodilatatör, antiproliferatif ve NO salıcı faydalı AT2 reseptörlerine yönlendirir.",
        ar: "يوجه الحصر الانتقائي لـ AT1 الأنجيوتنسين المتراكم نحو مستقبلات AT2 المفيدة التي تسبب التوسع الوعائي وتثبيط التليف.",
        en: "Selective AT1 blockade permits unopposed activation of beneficial AT2 receptors, inducing vasodilation, NO generation, and anti-fibrotic protection."
      }
    ],
    conceptCheck: {
      question: {
        tr: "Neden çift AT1/AT2 blokajı yerine selektif AT1 blokajı (ARB) tercih edilir?",
        ar: "لماذا يفضل الحصر الانتقائي لـ AT1 (عبر ARBs) على الحصر المزدوج لـ AT1 و AT2؟",
        en: "Why is selective AT1 blockade preferred over non-selective dual AT1/AT2 blockade?"
      },
      options: [
        {
          id: 'opt-l9-s2-1',
          isCorrect: true,
          text: {
            tr: "AT1 vazokonstriksiyon, aldosteron salınımı ve fibrozisi yönetir; bloke edilmeyen AT2 ise karşıt-düzenleyici vazodilatasyon, antiproliferasyon ve NO salınımı sağlar.",
            ar: "يتوسط AT1 التضيق الوعائي وإفراز الألدوستيرون والتليف؛ بينما يتوسط AT2 غير المحصور توسعاً وعائياً معاكساً، وتثبيطاً للتكاثر، وتحرراً لأكسيد النيتريك.",
            en: "AT1 mediates vasoconstriction, aldosterone release, and fibrosis; unblocked AT2 mediates counter-regulatory vasodilation, antiproliferation, and endothelial nitric oxide release."
          },
          feedback: {
            tr: "Doğru. Selektif AT1 blokajı, biriken Ang II'yi açıkta kalan AT2 reseptörlerine yönlendirerek kardiyoprotektif, vazodilatatör ve anti-fibrotik etkiler kazandırır.",
            ar: "صحيح. يوجه حصر AT1 الانتقائي فائض الأنجيوتنسين نحو مستقبلات AT2 غير المحصورة، مما يمنح حماية قلبية وتوسعاً وعائياً وتثبيطاً للتليف.",
            en: "Correct. Selective AT1 blockade shunts accumulating Ang II to unblocked AT2 receptors, conferring cardioprotective and vasodilatory signaling."
          }
        },
        {
          id: 'opt-l9-s2-2',
          isCorrect: false,
          text: {
            tr: "AT2 reseptörleri, erişkin kardiyovasküler dokuda hiçbir aşağı akış sinyalleme yeteneği olmayan işlevsiz yalancı genlerdir.",
            ar: "مستقبلات AT2 جينات كاذبة غير وظيفية تفتقر لأي قدرة على التأشير في النسيج القلبي الوعائي للبالغين.",
            en: "AT2 receptors are non-functional pseudogenes with no downstream signaling capability in adult cardiovascular tissue."
          },
          feedback: {
            tr: "Yanlış. AT2 reseptörleri Gi ve fosfatazlara kenetli aktif GPCR'lardır; bradikinin, NO ve cGMP yolaklarını uyararak AT1'e karşı durur.",
            ar: "غير صحيح. مستقبلات AT2 بروتينات GPCR وظيفية مقترنة بـ Gi والفوسفاتاز؛ تعاكس تأشير AT1 بتعزيز مسارات NO و cGMP.",
            en: "Incorrect. AT2 receptors are active GPCRs coupled to Gi and phosphatases; they promote NO and cGMP to counteract AT1 signaling."
          }
        },
        {
          id: 'opt-l9-s2-3',
          isCorrect: false,
          text: {
            tr: "AT2 reseptörleri proksimal tübül sodyum pompalarını uyarır; bloke edilmeleri feci bir natriürez ve dolaşım şokuna yol açar.",
            ar: "تحفز مستقبلات AT2 مضخات الصوديوم الأنبوبية القريبة؛ ويؤدي حصرها لطرح كارثي للصوديوم وصدمة دورانية.",
            en: "AT2 receptors stimulate proximal tubular sodium pumps; blocking them would cause catastrophic natriuresis and circulatory shock."
          },
          feedback: {
            tr: "Yanlış. Proksimal sodyum tutulumunu uyaran AT1'dir; AT2 aktivasyonu aksine renal vazodilatasyon ve natriürezi destekler.",
            ar: "غير صحيح. مستقبل AT1 هو من يحفز امتصاص الصوديوم الأنبوبي؛ بينما يدعم تفعيل AT2 التوسع الوعائي وطرح الصوديوم.",
            en: "Incorrect. AT1 stimulates tubular Na+ reabsorption. AT2 activation actually promotes renal vasodilation and natriuresis."
          }
        }
      ]
    }
  },

  // Step 3: Intuition
  {
    id: 'pharm-mod5-les1-step3',
    stage: 'intuition',
    phase: 'explore',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Fiziksel Sezgi: Efferent Arteriyoler Çıkış Kıskacı",
      ar: "الحدس الفيزيائي: ملقط الشريان الصادر الكلوي",
      en: "Physical Intuition: The Efferent Arteriolar Clamp"
    },
    prompt: {
      tr: "Glomerüler filtrasyonu bahçe hortumunun ucundaki ayarlı nozuldan su fışkırtmaya benzetin. Anjiyotensin II efferent çıkışı sıkıştırıyorsa, bir ACE inhibitörü o kıskacı gevşettiğinde intraglomerüler basınca ne olur?",
      ar: "تخيل الترشيح الكبيبي كضغط ماء عبر فوهة خرطوم. إذا كان أنجيوتنسين II يضيق المخرج الصادر، فماذا يحدث للضغط داخل الكبيبة حين يرخي مثبط ACE هذا الملقط؟",
      en: "Think of glomerular filtration as water forced through a garden hose nozzle. If Angiotensin II constricts the efferent outlet, what happens to glomerular pressure when an ACEi opens that outlet clamp?"
    },
    hints: [
      {
        tier: 1,
        tr: "Afferent giriş (prostaglandinler) ile efferent çıkış (Ang II) ayrımını hatırlayın.",
        ar: "ميز بين المدخل الوارد (تنظمه البروستاغلاندينات) والمخرج الصادر (ينظمه أنجيوتنسين II).",
        en: "Distinguish between the afferent inlet (prostaglandins) and efferent outlet (Angiotensin II)."
      },
      {
        tier: 2,
        tr: "Bir borunun çıkışındaki vana açılırsa, gerideki iç hidrostatik basınç artar mı azalır mı?",
        ar: "إذا فتحت صمام المخرج في أنبوب، هل يرتفع الضغط الداخلي قبله أم ينخفض؟",
        en: "When you open an exit valve on a pipe, does the upstream hydrostatic pressure increase or decrease?"
      },
      {
        tier: 3,
        tr: "Ang II efferent arteriyolü kasarak GFR'yi korur. ACEi bu çıkışı gevşetince intraglomerüler hidrostatik basınç ve GFR düşer.",
        ar: "يقبض Ang II الشريان الصادر لصيانة الرشح. يؤدي إرخاؤه بمثبطات ACE لهبوط الضغط داخل الكبيبة وانخفاض GFR.",
        en: "Ang II constricts the efferent arteriole to maintain filtration pressure. Blocking it dilates the outlet, dropping intraglomerular pressure and GFR."
      }
    ],
    conceptCheck: {
      question: {
        tr: "ACE inhibitörleri efferent arteriyolü genişlettiğinde glomerüler filtrasyona ne olur?",
        ar: "ماذا يحدث للترشيح الكبيبي عندما توسع مثبطات ACE الشريان الصادر؟",
        en: "What happens to glomerular hemodynamics when ACE inhibitors dilate the efferent arteriole?"
      },
      options: [
        {
          id: 'opt-l9-s3-1',
          isCorrect: true,
          text: {
            tr: "Efferent arteriyol dilatasyonu intraglomerüler hidrostatik basıncı düşürür; filtrasyon stresini azaltır ancak GFR'de akut bir düşüşe neden olabilir.",
            ar: "يؤدي توسع الشريان الصادر لانخفاض الضغط الهيدروستاتيكي داخل الكبيبة، مقللاً إجهاد الترشيح لكنه قد يخفض معدل الرشح الكبيبي (GFR) حاداً.",
            en: "Efferent arteriolar dilation drops intraglomerular capillary hydrostatic pressure, reducing filtration stress but potentially causing an acute decline in GFR."
          },
          feedback: {
            tr: "Doğru. Ang II efferent çıkışı büzerek filtrasyon basıncını yüksek tutar. ACEi çıkışı gevşetir; uzun vadede böbreği korur ancak akut evrede GFR'de geçici düşüş yapabilir.",
            ar: "صحيح. يضيق Ang II الشريان الصادر لصيانة GFR. ترخي مثبطات ACE هذا المخرج، مما يحمي الكلية مستقبلاً لكنه قد يخفض GFR حاداً ومؤقتاً.",
            en: "Correct. Ang II constricts efferent arterioles to sustain GFR. ACE inhibitors dilate the efferent outlet, reducing intraglomerular pressure."
          }
        },
        {
          id: 'opt-l9-s3-2',
          isCorrect: false,
          text: {
            tr: "ACE inhibitörleri afferent arteriyolleri selektif olarak kasarak glomerüler yumağı tüm arteryel perfüzyondan mahrum bırakır.",
            ar: "تقبض مثبطات ACE الشريانات الواردة انتقائياً، حارمة الكبيبة الكلوية من أي تروية شريانية.",
            en: "ACE inhibitors selectively vasoconstrict afferent arterioles, starving the glomerular tuft of all arterial perfusion."
          },
          feedback: {
            tr: "Yanlış. Afferent arteriyolü büzen NSAİİ'lerdir (prostaglandinleri baskılayarak). ACE inhibitörleri ise efferent arteriyolü gevşetir.",
            ar: "غير صحيح. المسكنات (NSAIDs) هي من تقبض الشريان الوارد بتثبيط البروستاغلاندين؛ بينما ترخي مثبطات ACE الشريان الصادر.",
            en: "Incorrect. Afferent arterioles are constricted by NSAIDs via prostaglandin inhibition; ACE inhibitors selectively dilate efferent arterioles."
          }
        },
        {
          id: 'opt-l9-s3-3',
          isCorrect: false,
          text: {
            tr: "Efferent çıkışın açılması retrograd geri basınç yaratarak glomerüler filtrasyon basıncını ikiye katlar ve hematüriye yol açar.",
            ar: "يولد فتح المخرج الصادر ضغطاً رجوعياً يضاعف ضغط الترشيح الكبيبي ويؤدي لبيلة دموية.",
            en: "Opening the efferent outlet creates retrograde backpressure, doubling intraglomerular filtration pressure and precipitating hematuria."
          },
          feedback: {
            tr: "Yanlış. Çıkış vanasının açılması geri basınç yapmaz; aksine kılcal damarlardaki hidrostatik basıncı hızla deşarj eder.",
            ar: "غير صحيح. لا يولد فتح الصمام الصادر ضغطاً رجوعياً، بل يفرغ الضغط الهيدروستاتيكي في الشعيرات الكبيبية.",
            en: "Incorrect. Opening an outlet reduces upstream pressure; efferent vasodilation unloads intraglomerular capillary hydrostatic pressure."
          }
        }
      ]
    }
  },

  // Step 4: Visual Explanation
  {
    id: 'pharm-mod5-les1-step4',
    stage: 'visual_explanation',
    phase: 'explain',
    type: 'explanation',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Görsel Açıklama: RAAS Biyokimyasal Kaskat Haritası",
      ar: "شرح مرئي: خريطة الشلال الكيميائي الحيوي لـ RAAS",
      en: "Visual Explanation: RAAS Biochemical Cascade Map"
    },
    prompt: {
      tr: "Enzimatik kaskadı takip edin: Jukstaglomerüler renin karaciğer kaynaklı anjiyotensinojeni Ang I'e; pulmoner ACE ise Ang I'i Ang II'ye dönüştürür. ACE'yi tanımlayan benzersiz katalitik özellik nedir?",
      ar: "تتبع شلال الإنزيمات: يشطر رينين الكبيبات أنجيوتنسينوجين الكبدي إلى Ang I؛ ويشطر ACE الرئوي Ang I إلى Ang II. ما الخاصية التحفيزية المميزة لـ ACE؟",
      en: "Trace the enzymatic cascade: Juxtaglomerular renin cleaves liver angiotensinogen to Ang I; pulmonary ACE cleaves Ang I to Ang II. What unique catalytic property defines ACE?"
    },
    hints: [
      {
        tier: 1,
        tr: "ACE enzimi 10 amino asitlik dekapeptit Ang I'in karboksil ucunu hedefler.",
        ar: "يستهدف إنزيم ACE النهاية الكربوكسيلية لببتيد Ang I المكون من 10 أحماض أمينية.",
        en: "ACE targets the carboxyl end of the 10-amino acid peptide Angiotensin I."
      },
      {
        tier: 2,
        tr: "Katalitik kofaktöre dikkat edin: ACE aktif bölgesinde iki değerlikli çinko katyonuna (Zn2+) ihtiyaç duyar.",
        ar: "انتبه للمرافق التحفيزي: يتطلب ACE كاتيون زنك ثنائي التكافؤ (Zn2+) في موقعه النشط.",
        en: "Notice the catalytic co-factor: ACE requires a divalent zinc cation (Zn2+) in its active pocket."
      },
      {
        tier: 3,
        tr: "ACE bir dipeptidil karboksipeptidazdır; Ang I'in C-ucundan iki amino asit (His-Leu) keserek güçlü oktapeptit Ang II'yi üretir.",
        ar: "يعمل ACE كـ ثنائي ببتيديل كربوكسي ببتيداز؛ يشطر حمضي His-Leu من نهاية Ang I ليشكل Ang II النشط ثماني الببتيد.",
        en: "ACE functions as a dipeptidyl carboxypeptidase, clipping the C-terminal His-Leu from Ang I to yield active octapeptide Ang II."
      }
    ],
    conceptCheck: {
      question: {
        tr: "ACE enziminin moleküler yapısı ve katalitik kesim mekanizması nasıldır?",
        ar: "ما هي البنية الجزيئية وآلية الشطر التحفيزية لإنزيم ACE؟",
        en: "What is the molecular class and catalytic cleavage mechanism of ACE?"
      },
      options: [
        {
          id: 'opt-l9-s4-1',
          isCorrect: true,
          text: {
            tr: "ACE, dekapeptit Ang I'in C-ucundan dipeptit (His-Leu) kopararak oktapeptit Ang II oluşturan bir çinko-metallopeptidazdır (dipeptidil karboksipeptidaz).",
            ar: "إنزيم ACE هو ميتالوببتيداز زنك (ثنائي ببتيديل كربوكسي ببتيداز) يشطر ثنائي الببتيد (His-Leu) من Ang I ليشكل Ang II ثماني الببتيد.",
            en: "ACE is a zinc-metallopeptidase (dipeptidyl carboxypeptidase) that cleaves the C-terminal dipeptide (His-Leu) from decapeptide Ang I to form octapeptide Ang II."
          },
          feedback: {
            tr: "Doğru. ACE zara bağlı bir çinko metaloenzimidir; Ang I'in C-terminalinden iki amino asit kopararak Ang II üretir ve bradikinini inaktive eder.",
            ar: "صحيح. إنزيم ACE ميتالوانزيم زنك مرتبط بالغشاء؛ يزيل ثنائي ببتيد من نهاية Ang I مشكلاً Ang II، كما يثبط البراديكينين.",
            en: "Correct. ACE is a zinc metalloenzyme that removes a C-terminal dipeptide from Ang I to generate active Ang II, while also inactivating bradykinin."
          }
        },
        {
          id: 'opt-l9-s4-2',
          isCorrect: false,
          text: {
            tr: "Renin, dolaşımdaki kolesterol esterlerinden aldosteronu doğrudan sentezleyen bir çinko metallopeptidazdır.",
            ar: "الرينين ميتالوببتيداز زنك يصنع الألدوستيرون مباشرة من إسترات الكوليسترول الجائلة.",
            en: "Renin is a zinc metallopeptidase that directly synthesizes aldosterone from circulating cholesterol esters."
          },
          feedback: {
            tr: "Yanlış. Renin aspartik proteazdır ve anjiyotensinojeni Ang I'e yıkar; steroid sentezlemez.",
            ar: "غير صحيح. الرينين إندوببتيداز أسبارتيك يشطر أنجيوتنسينوجين إلى Ang I؛ ولا يصنع الستيرويدات.",
            en: "Incorrect. Renin is an aspartic endopeptidase cleaving angiotensinogen to Ang I; it does not synthesize steroid hormones."
          }
        },
        {
          id: 'opt-l9-s4-3',
          isCorrect: false,
          text: {
            tr: "ACE, peptitleri N-terminal aspartat ucundan başlayarak sırayla parçalayan bir aminopeptidazdır.",
            ar: "إنزيم ACE هو أمينوببتيداز يفكك الببتيدات تدريجياً بدءاً من نهاية حمض الأسبارتيك النيتروجينية.",
            en: "ACE is an aminopeptidase that progressively degrades peptides starting from their N-terminal aspartate residue."
          },
          feedback: {
            tr: "Yanlış. ACE bir aminopeptidaz değil, karboksipeptidazdır; peptidin C-ucundan iki amino asit keser.",
            ar: "غير صحيح. إنزيم ACE كربوكسي ببتيداز وليس أمينوببتيداز؛ حيث يقطع ثنائي ببتيد من النهاية الكربوكسيلية.",
            en: "Incorrect. ACE is a carboxypeptidase; it requires a free carboxy-terminus and cleaves two amino acids from the C-terminus."
          }
        }
      ]
    }
  },

  // Step 5: Interactive Artifact (DoseResponseCurve - keep existing widget config intact)
  null,

  // Step 6: Guided Discovery
  {
    id: 'pharm-mod5-les1-step6',
    stage: 'guided_discovery',
    phase: 'explain',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Rehberli Keşif: Aldosteron Baskılanması ve Potasyum Tutulumu",
      ar: "استكشاف موجه: تثبيط الألدوستيرون واحتباس البوتاسيوم",
      en: "Guided Discovery: Aldosterone Suppression & Potassium Balance"
    },
    prompt: {
      tr: "Anjiyotensin II, adrenal zona glomerulosa hücrelerini aldosteron salgılaması için uyarır. Bir ACEi veya ARB bu uyarıyı kestiğinde serum potasyumu neden yükselir?",
      ar: "يحفز أنجيوتنسين II قشر الكظر لإفراز الألدوستيرون. حين يقطع مثبط ACE أو ARB هذا التنبيه، لماذا يرتفع بوتاسيوم المصل؟",
      en: "Angiotensin II stimulates adrenal cortical zona glomerulosa cells to secrete aldosterone. When an ACEi or ARB shuts down this stimulus, why does serum potassium rise?"
    },
    hints: [
      {
        tier: 1,
        tr: "Aldosteronun geç distal tübül ve kortikal toplayıcı kanallardaki ana hücrelerde (principal cells) ne yaptığını düşünün.",
        ar: "فكر فيما يفعله الألدوستيرون في الخلايا الرئيسية بالأنابيب الجامعة القشرية.",
        en: "Consider where aldosterone acts in the cortical collecting duct principal cells."
      },
      {
        tier: 2,
        tr: "Aldosteron sodyum geri emilimini potasyum ve proton atılımı karşılığında yönetir.",
        ar: "ينظم الألدوستيرون امتصاص الصوديوم لقاء إطراح البوتاسيوم والبروتونات.",
        en: "Aldosterone controls sodium reabsorption in exchange for potassium and proton secretion."
      },
      {
        tier: 3,
        tr: "Aldosteronun baskılanması ENaC sodyum girişini ve ROMK potasyum salgısını azaltarak potasyumu tutar ve hiperkalemiye yol açar.",
        ar: "يقلل تثبيط الألدوستيرون دخول الصوديوم عبر ENaC وإفراز البوتاسيوم عبر ROMK، حابساً البوتاسيوم ومسبباً فرط البوتاسيوم.",
        en: "Suppressing aldosterone reduces ENaC sodium entry and ROMK potassium secretion in principal cells, causing hyperkalemia."
      }
    ],
    conceptCheck: {
      question: {
        tr: "RAAS blokerleri aldosteron salgısını baskıladığında hiperkalemi mekanizması nasıl işler?",
        ar: "كيف تحدث آلية فرط البوتاسيوم عند تثبيط إفراز الألدوستيرون بحاصرات RAAS؟",
        en: "What is the molecular mechanism of hyperkalemia resulting from RAAS inhibitor-mediated aldosterone suppression?"
      },
      options: [
        {
          id: 'opt-l9-s6-1',
          isCorrect: true,
          text: {
            tr: "Aldosteron normalde toplayıcı kanallarda bazolateral Na+/K+-ATPazı, apikal ENaC ve ROMK'yi artırır; aldosteron kaybı potasyum atılımını bozar.",
            ar: "ينشط الألدوستيرون عادة مضخة Na+/K+ وقنوات ENaC و ROMK في الأنابيب الجامعة؛ ويؤدي فقده لتعطيل إطراح البوتاسيوم.",
            en: "Aldosterone normally upregulates basolateral Na+/K+-ATPase and apical ENaC and ROMK in cortical collecting ducts; losing aldosterone impairs potassium excretion."
          },
          feedback: {
            tr: "Doğru. Aldosteron esas hücrelerde ENaC ve ROMK ile sodyumu tutup potasyumu attırır. Aldosteron düşünce potasyum atılamaz ve hiperkalemi riski doğar.",
            ar: "صحيح. يقود الألدوستيرون امتصاص الصوديوم وإطراح البوتاسيوم عبر ENaC و ROMK. يؤدي تثبيطه لتقليص إفراز البوتاسيوم وخطر فرط البوتاسيوم.",
            en: "Correct. Aldosterone drives principal cell sodium reabsorption and potassium excretion. Suppressing it impairs kaliuresis, predisposing to hyperkalemia."
          }
        },
        {
          id: 'opt-l9-s6-2',
          isCorrect: false,
          text: {
            tr: "ACE inhibitörleri proksimal tübüler potasyum simportörlerini doğrudan aktive ederek filtrelenen potasyumun %100'ünü geri emer.",
            ar: "تنشط مثبطات ACE نواقل البوتاسيوم في الأنابيب القريبة مباشرة، معيدة امتصاص 100% من البوتاسيوم للدم.",
            en: "ACE inhibitors directly activate proximal tubular potassium symporters, forcing 100% of filtered potassium back into systemic circulation."
          },
          feedback: {
            tr: "Yanlış. ACE inhibitörleri tübüler taşıyıcıları doğrudan uyarmaz; hiperkalemi aldosteron eksikliğine bağlı endokrin bir sonuçtur.",
            ar: "غير صحيح. لا تنشط مثبطات ACE نواقل الأنابيب مباشرة؛ بل فرط البوتاسيوم نتيجة صماوية لنقص الألدوستيرون.",
            en: "Incorrect. ACE inhibitors have no direct transport-activating properties in tubules; hyperkalemia is an endocrine consequence of aldosterone suppression."
          }
        },
        {
          id: 'opt-l9-s6-3',
          isCorrect: false,
          text: {
            tr: "Ang II'nin bloke edilmesi sistemik asidoza yol açarak alyuvarların hücre içi potasyumunu plazmaya boşaltmasına neden olur.",
            ar: "يؤدي حصر Ang II لحماض جهازي يجبر كريات الدم الحمراء على ضخ البوتاسيوم الداخلي إلى البلازما.",
            en: "Blocking Ang II causes systemic acidosis, which forces red blood cells to dump intracellular potassium into plasma."
          },
          feedback: {
            tr: "Yanlış. Hiperkalemi transselüler kaymadan değil, toplayıcı kanallarda aldosteron eksikliğine bağlı böbrek atılım yetersizliğinden kaynaklanır.",
            ar: "غير صحيح. لا ينجم فرط البوتاسيوم عن انزياح عبر الخلايا، بل عن نقص الإطراح الكلوي في الأنابيب الجامعة بسبب عوز الألدوستيرون.",
            en: "Incorrect. Hyperkalemia is driven by reduced renal excretion in collecting ducts via aldosterone deficiency, not transcellular shifting."
          }
        }
      ]
    }
  },

  // Step 7: Formal Explanation
  {
    id: 'pharm-mod5-les1-step7',
    stage: 'formal_explanation',
    phase: 'explain',
    type: 'explanation',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Biçimsel Açıklama: RAAS İnhibitörlerinin Sınıflandırılması ve Farmakokinetiği",
      ar: "شرح رسمي: تصنيف مثبطات RAAS وحركيتها الدوائية",
      en: "Formal Explanation: Classification & Pharmacokinetics of RAAS Inhibitors"
    },
    prompt: {
      tr: "Çoğu ACE inhibitörü (enalapril, ramipril) ester ön-ilaç iken, kaptopril ve lisinopril aktif ana moleküllerdir. Lisinoprili diğerlerinden ayıran farmakokinetik özellik nedir?",
      ar: "معظم مثبطات ACE (إنالابريل، رام Pres pril) طلائع أدوية إسترية، بينما ليزينوبريل وكابتوبريل نشطان بذاتهما. ما الخاصية الحركية المميزة لـ ليزينوبريل؟",
      en: "Most ACE inhibitors (enalapril, ramipril, fosinopril) are ester prodrugs, whereas captopril and lisinopril are active parent drugs. What pharmacokinetic property differentiates lisinopril?"
    },
    hints: [
      {
        tier: 1,
        tr: "Ön-ilaçlar (enalaprilden enalaprilata) ile doğrudan aktif suda çözünür ilaçları kıyaslayın.",
        ar: "قارن بين طلائع الأدوية الإسترية وتلك النشطة بذاتها الذوابة في الماء.",
        en: "Compare ester prodrugs with water-soluble active drugs."
      },
      {
        tier: 2,
        tr: "Kimyasal adına dikkat edin: 'lisinopril' lizin amino asidi taşır ve hidrofiliktir.",
        ar: "انتبه للاسم الكيميائي: يحتوي 'ليزينوبريل' على الحمض الأميني ليسين وهو محب للماء.",
        en: "Notice the chemical name: 'lisinopril' incorporates the amino acid lysine."
      },
      {
        tier: 3,
        tr: "Lisinopril aktiftir, karaciğerde esteraz yıkımına ihtiyaç duymaz ve böbrek filtrasyonu ile değişmeden atılır.",
        ar: "ليزينوبريل نشط كما هو، لا يحتاج شطراً إسترياً كبدياً، ويطرح دون تغيير بالترشيح الكلوي.",
        en: "Lisinopril is active as administered, hydrophilic, requires no hepatic esterase bioactivation, and is eliminated unchanged by the kidneys."
      }
    ],
    conceptCheck: {
      question: {
        tr: "Lisinoprilin farmakokinetik ve metabolik profili diğer ACE inhibitörlerinden nasıl ayrılır?",
        ar: "كيف يتميز المظهر الحركي والاستقلابي لـ ليزينوبريل عن بقية مثبطات ACE؟",
        en: "How does lisinopril's pharmacokinetic profile diverge from most other ACE inhibitors?"
      },
      options: [
        {
          id: 'opt-l9-s7-1',
          isCorrect: true,
          text: {
            tr: "Lisinopril sentetik bir lizin analoğudur; hidrofiliktir, karaciğerde biyoaktivasyona ihtiyaç duymaz ve böbreklerden değişmeden atılır.",
            ar: "ليزينوبريل نظير مصنع لليسين؛ وهو محب للماء، ويطرح دون تغيير كلياً عبر الكلى دون حاجة لتنشيط كبدي.",
            en: "Lisinopril is a synthetic lysine analogue; it is hydrophilic, excreted entirely unchanged by the kidneys, and requires no hepatic bioactivation."
          },
          feedback: {
            tr: "Doğru. Lisinopril bazik bir lizin grubu taşır; ester hidrolizi olmadan doğrudan aktiftir ve karaciğer metabolizmasına uğramadan böbreklerle atılır.",
            ar: "صحيح. يحتوي ليزينوبريل على ليسين قاعدي؛ وهو نشط دون حلمهة إسترية ويطرح كلوياً دون استقلاب كبدي.",
            en: "Correct. Lisinopril contains a lysine moiety that allows active binding without ester hydrolysis; it is eliminated unchanged by renal excretion."
          }
        },
        {
          id: 'opt-l9-s7-2',
          isCorrect: false,
          text: {
            tr: "Lisinopril, aktif dikarboksilik asit metabolitini oluşturmak için karaciğer CYP3A4 ile kapsamlı faz I oksidasyonuna ihtiyaç duyar.",
            ar: "يتطلب ليزينوبريل أكسدة واسعة عبر CYP3A4 الكبدي لتوليد مستقلب حمض ثنائي الكربوكسيل النشط.",
            en: "Lisinopril requires extensive phase I oxidation by hepatic CYP3A4 to generate its active dicarboxylic acid metabolite."
          },
          feedback: {
            tr: "Yanlış. Lisinopril ön-ilaç değildir ve karaciğerde CYP metabolizmasına uğramaz; doğrudan aktif ana ilaçtır.",
            ar: "غير صحيح. ليزينوبريل ليس طليعة دواء ولا يخضع لأي استقلاب كبدي بإنزيمات CYP؛ بل هو دواء نشط بذاته.",
            en: "Incorrect. Lisinopril is not a prodrug and undergoes no hepatic CYP metabolism; it is active as parent drug."
          }
        },
        {
          id: 'opt-l9-s7-3',
          isCorrect: false,
          text: {
            tr: "Kaptopril ve lisinopril %100 biliyer yolla atılır, bu da onları böbrek yetmezliğinde birikmeye karşı tamamen korur.",
            ar: "يطرح كابتوبريل وليزينوبريل بنسبة 100% عبر الصفراء، مما يمنع تراكمهما تماماً في الفشل الكلوي.",
            en: "Captopril and lisinopril undergo 100% biliary excretion, making them completely immune to renal failure accumulation."
          },
          feedback: {
            tr: "Yanlış. Lisinopril ve kaptopril renal yolla atılır; böbrek yetmezliğinde birikmeyi önlemek için dozları azaltılmalıdır.",
            ar: "غير صحيح. يعتمد ليزينوبريل وكابتوبريل على الإطراح الكلوي؛ ويجب خفض جرعتهما في القصور الكلوي تجنباً للتراكم.",
            en: "Incorrect. Lisinopril and captopril rely heavily on renal elimination; doses must be adjusted downward in kidney disease."
          }
        }
      ]
    }
  },

  // Step 8: Concept Check
  {
    id: 'pharm-mod5-les1-step8',
    stage: 'concept_check',
    phase: 'practice',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Kavram Kontrolü: Bilateral Renal Arter Stenozunda Akut Yetmezlik",
      ar: "تحقق مفاهيمي: الفشل الحاد في تضيق الشريان الكلوي ثنائي الجانب",
      en: "Concept Check: Bilateral Renal Artery Stenosis Disaster"
    },
    prompt: {
      tr: "Şiddetli bilateral renal arter stenozu olan hastaya lisinopril başlanıyor. 48 saat içinde serum kreatinini 1.1'den 4.2 mg/dL'ye fırlıyor. Akut böbrek yetmezliğine hangi hemodinamik mekanizma yol açtı?",
      ar: "بدأ مريض بتضيق شريان كلوي ثنائي الجانب ليزينوبريل. وخلال 48 ساعة، قفز الكرياتينين من 1.1 إلى 4.2 ملغ/دل. ما الآلية الديناميكية الدموية المسببة للفشل؟",
      en: "A patient with severe bilateral renal artery stenosis is started on lisinopril. Within 48 hours, serum creatinine spikes from 1.1 to 4.2 mg/dL. What hemodynamic mechanism caused acute renal failure?"
    },
    hints: [
      {
        tier: 1,
        tr: "Renal mikrovasküler otoregülasyonu hatırlayın: afferent giriş ve efferent çıkış dengesi.",
        ar: "تذكر التنظيم الذاتي الوعائي الكلوي: توازن المدخل الوارد والمخرج الصادر.",
        en: "Recall renal microvascular autoregulation: afferent inlet versus efferent outlet balance."
      },
      {
        tier: 2,
        tr: "Renal arter stenozu giriş basıncını düşürdüğünde, böbrek GFR'yi korumak için hangi damarı kısmıştı?",
        ar: "حين يخفض تضيق الشريان ضغط الدخول، أي وعاء كان مقبوضاً لصيانة الرشح قبل الدواء؟",
        en: "When stenosis drops inlet pressure, which vessel was constricted by Ang II to sustain GFR?"
      },
      {
        tier: 3,
        tr: "Böbrek GFR'yi Ang II bağımlı efferent vazokonstriksiyonla sürdürüyordu. ACEi efferent çıkışı gevşetince intraglomerüler hidrostatik basınç ve filtrasyon çöker.",
        ar: "كان الرشح يعتمد كلياً على تضيق الشريان الصادر بـ Ang II. أدى حصر ACE لإرخاء المخرج وانهيار الضغط والرشح.",
        en: "Filtration was sustained solely by Ang II-mediated efferent constriction. ACEi dilates the efferent arteriole, collapsing intraglomerular pressure and GFR."
      }
    ],
    conceptCheck: {
      question: {
        tr: "Bilateral renal arter stenozunda ACE inhibitörleri neden akut böbrek yetmezliği yapar?",
        ar: "لماذا تسبب مثبطات ACE فشلاً كلوياً حاداً في تضيق الشريان الكلوي ثنائي الجانب؟",
        en: "Why do ACE inhibitors precipitate acute renal failure in bilateral renal artery stenosis?"
      },
      options: [
        {
          id: 'opt-l9-s8-1',
          isCorrect: true,
          text: {
            tr: "Stenoz afferent perfüzyon basıncını düşürür; GFR tamamen Ang II bağımlı efferent vazokonstriksiyonla korunuyordu. ACEi efferent direnci sıfırlayarak glomerüler filtrasyonu çökertti.",
            ar: "يخفض التضيق ضغط التروية الوارد؛ وكان GFR يعتمد كلياً على تضيق الشريان الصادر بـ Ang II. أدى حصر ACE لإلغاء المقاومة الصادرة وانهيار الرشح.",
            en: "Stenosis lowers afferent perfusion pressure; GFR was maintained entirely by Ang II-mediated efferent vasoconstriction. ACE inhibition abolishes efferent resistance, collapsing glomerular filtration."
          },
          feedback: {
            tr: "Doğru. Stenozda intraglomerüler basınç yalnızca Ang II'nin efferent arteriyolü kasmasıyla korunur. ACEi bu tonusu silince intraglomerüler basınç çöker ve GFR sıfırlanır.",
            ar: "صحيح. يصان الضغط داخل الكبيبة في التضيق حصراً بانقباض الشريان الصادر بـ Ang II. إلغاء هذه المقاومة بمثبطات ACE يسقط الضغط الهيدروستاتيكي ويوقف الرشح.",
            en: "Correct. In bilateral stenosis, GFR is critically dependent on Ang II-mediated efferent tone. Blocking Ang II collapses glomerular hydrostatic pressure and GFR."
          }
        },
        {
          id: 'opt-l9-s8-2',
          isCorrect: false,
          text: {
            tr: "Lisinopril proksimal tübülde çözünmeyen kalsiyum fosfat kristalleri halinde çökerek mekanik obstrüktif üropatiye yol açar.",
            ar: "يترسب ليزينوبريل كبلورات فوسفات كالسيوم غير ذوابة في الأنابيب القريبة، مسبباً اعتلالاً بولياً انسدادياً ميكانيكياً.",
            en: "Lisinopril precipitates as insoluble calcium phosphate crystals within the proximal tubule, causing mechanical obstructive uropathy."
          },
          feedback: {
            tr: "Yanlış. Kreatinin artışı kristal nefropatisinden değil, tamamen fonksiyonel hemodinamik filtrasyon çöküşünden kaynaklanır.",
            ar: "غير صحيح. ارتفاع الكرياتينين وظيفي ديناميكي دموي وليس اعتلالاً بلورياً؛ وسحب الدواء يعيد المقوية الصادرة والرشح.",
            en: "Incorrect. The acute creatinine jump is functional and hemodynamic (pre-renal), not crystal nephropathy."
          }
        },
        {
          id: 'opt-l9-s8-3',
          isCorrect: false,
          text: {
            tr: "İlaç, böbrek podositlerinin %90'ını hızla yok eden akut bir immün kompleks glomerülonefritini tetikler.",
            ar: "يحفز الدواء التهاب كبيبات مناعياً معقداً حاداً يدمر 90% من الخلايا الرجلاء الكلوية بسرعة.",
            en: "The drug triggers an acute immune-complex glomerulonephritis that rapidly destroys 90% of renal podocytes."
          },
          feedback: {
            tr: "Yanlış. İmmün kompleks yıkımı yoktur; yetmezlik efferent arteriyol gevşemesine bağlı intraglomerüler basınç kaybıdır.",
            ar: "غير صحيح. لا يوجد تخريب مناعي معقد؛ بل الفشل ناجم حصراً عن فقدان الضغط الهيدروستاتيكي بتوسع الشريان الصادر.",
            en: "Incorrect. There is no immune-complex pathology. The failure is entirely hemodynamic due to loss of efferent arteriolar vasoconstriction."
          }
        }
      ]
    }
  },

  // Step 9: Application
  {
    id: 'pharm-mod5-les1-step9',
    stage: 'application',
    phase: 'practice',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Klinik Vaka: ARNI Sakubitril/Valsartan 36 Saatlik Arınma Kuralı",
      ar: "حالة سريرية: قاعدة غسيل 36 ساعة لـ ARNI ساكوبيتريل/فالسارتان",
      en: "Clinical Vignette: ARNI Sacubitril/Valsartan 36-Hour Washout Trap"
    },
    prompt: {
      tr: "Enalapril kullanan bir kalp yetmezliği hastası sakubitril/valsartana (ARNI) geçiriliyor. İlk ARNI dozundan önce neden kesin olarak 36 saatlik bir arınma (washout) süresi zorunludur?",
      ar: "مريض قصور قلب يعالج بإنالابريل تقرر تحويله إلى ساكوبيتريل/فالسارتان (ARNI). لماذا يعد فاصل الغسيل الدوائي الإلزامي لمدة 36 ساعة حاسماً قبل أول جرعة؟",
      en: "A heart failure patient receiving enalapril is transitioned to sacubitril/valsartan (ARNI). Why is a strict 36-hour washout mandatory before taking the first ARNI dose?"
    },
    hints: [
      {
        tier: 1,
        tr: "Hem ACE hem de neprilisin enzimleri tarafından parçalanan ortak endojen vazodilatatör peptidi düşünün.",
        ar: "فكر في الببتيد الموسع للأوعية الذي يفككه إنزيما ACE والنبريلايسين معاً.",
        en: "Consider what endogenous vasodilator peptide is metabolized by both ACE and neprilysin."
      },
      {
        tier: 2,
        tr: "Bradikinini yıkan iki ana enzimatik yolak aynı anda bloke edilirse ne olur?",
        ar: "ماذا يحدث إذا حصر كلا المسارين الإنزيميين الرئيسيين لتفكيك البراديكينين في آن واحد؟",
        en: "What happens when both major enzymatic pathways for degrading bradykinin are blocked simultaneously?"
      },
      {
        tier: 3,
        tr: "Hem ACE hem neprilisin bradikinini yıkar. Eş zamanlı inhibisyon feci bir bradikinin patlaması ve ölümcül laringeal anjioödem yaratır; 36 saatlik arınma şarttır.",
        ar: "يفكك كلاهما البراديكينين. يسبب التثبيط المتزامن انفجاراً في مستويات البراديكينين ووذمة وعائية حنجرية قاتلة؛ لذا يلزم فاصل 36 ساعة.",
        en: "Both ACE and neprilysin degrade bradykinin. Simultaneous inhibition causes explosive bradykinin accumulation and fatal angioedema; a 36-hour washout is mandatory."
      }
    ],
    conceptCheck: {
      question: {
        tr: "ACE inhibitöründen ARNI'ye geçerken 36 saatlik bekleme süresine uyulmazsa hangi ölümcül risk doğar?",
        ar: "ما الخطر المميت الناجم عن عدم الالتزام بفاصل 36 ساعة عند التحول من ACEi إلى ARNI؟",
        en: "What fatal risk emerges if the 36-hour washout period is violated when switching from an ACEi to an ARNI?"
      },
      options: [
        {
          id: 'opt-l9-s9-1',
          isCorrect: true,
          text: {
            tr: "Hem neprilisin hem ACE bradikinini parçalar; eş zamanlı inhibisyon sinerjistik bradikinin birikimine yol açarak ölümcül anjioödem riskini katlar.",
            ar: "يفكك كل من النبريلايسين و ACE البراديكينين؛ ويؤدي تثبيطهما المتزامن لتراكم تآزري هائل للبراديكينين مسبباً خطراً مميتاً للوذمة الوعائية.",
            en: "Neprilysin and ACE both degrade bradykinin; concurrent inhibition causes synergistic bradykinin accumulation, massively escalating the risk of fatal angioedema."
          },
          feedback: {
            tr: "Doğru. Hem ACE hem neprilisin bradikinini yıkar. İkisi aynı anda kilitlenirse bradikinin katlanarak birikir ve asfiksiye yol açan laringeal anjioödem gelişir.",
            ar: "صحيح. يفكك كل من ACE والنبريلايسين البراديكينين. حصر كلاهما في آن واحد يراكم البراديكينين بشكل تآزري مفجراً وذمة حنجرية خانقة.",
            en: "Correct. Both ACE and neprilysin degrade bradykinin. Concurrent dual blockade leads to massive bradykinin accumulation and life-threatening laryngeal angioedema."
          }
        },
        {
          id: 'opt-l9-s9-2',
          isCorrect: false,
          text: {
            tr: "Valsartan enalaprili albümin bağlanma bölgelerinden kovarak serbest enalaprili 50 kat artırır ve şiddetli postural hipotansiyon yapar.",
            ar: "يزيح فالسارتان إنالابريل من مواقع الارتباط بالألبومين، رافعاً شكله الحر 50 ضعفاً ومسبباً هبوط ضغط انتصابي شديد.",
            en: "Valsartan displaces enalapril from albumin binding sites, increasing free enalapril 50-fold and causing severe postural hypotension."
          },
          feedback: {
            tr: "Yanlış. Tehlike albüminden kovulma değildir; iki büyük bradikinin yıkım yolunun aynı anda durdurulmasıyla gelişen ölümcül anjioödemdir.",
            ar: "غير صحيح. ليس الخطر إزاحة من الألبومين؛ بل التآزر الإنزيمي الكارثي بحصر مساري تفكيك البراديكينين معاً.",
            en: "Incorrect. The danger is not protein displacement; it is the catastrophic enzymatic synergy of blocking two major bradykinin clearance pathways."
          }
        },
        {
          id: 'opt-l9-s9-3',
          isCorrect: false,
          text: {
            tr: "Sakubitril proksimal tübüler OAT taşıyıcılarını inhibe ederek enalapril atılımını engeller ve ölümcül laktik asidozu tetikler.",
            ar: "يثبط ساكوبيتريل نواقل OAT الأنبوبية القريبة، مانعاً تصريف إنالابريل ومثيراً حماضاً لبنياً مميتاً.",
            en: "Sacubitril inhibits proximal tubular OAT transporters, preventing enalapril clearance and triggering fatal lactic acidosis."
          },
          feedback: {
            tr: "Yanlış. 36 saatlik kuralın tek varlık sebebi bradikinin yıkımının çift taraflı durması ve anjioödem patlamasıdır.",
            ar: "غير صحيح. قاعدة الـ 36 ساعة وُجدت حصراً لتجنب التثبيط المزدوج لتفكيك البراديكينين وانفجار الوذمة الوعائية.",
            en: "Incorrect. The 36-hour washout exists solely due to dual enzymatic inhibition of bradykinin breakdown resulting in fatal angioedema."
          }
        }
      ]
    }
  },

  // Step 10: Retrieval
  {
    id: 'pharm-mod5-les1-step10',
    stage: 'retrieval',
    phase: 'practice',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Geri Çağırma: Gebelikte Teratojenite ve Fötal Renal Disgenez",
      ar: "استرجاع: ماسخية الحمل وخلل تكون الكلى الجنيني",
      en: "Retrieval: Teratogenicity & Fetal Renal Hemodynamics"
    },
    prompt: {
      tr: "ACE inhibitörleri ve ARB'ler gebeliğin ikinci ve üçüncü trimesterlerinde neden kesinlikle kontrendikedir? Fötusta hangi spesifik gelişimsel anomaliler ortaya çıkar?",
      ar: "لماذا تمنع مثبطات ACE و ARBs منعاً باتاً خلال الثلثين الثاني والثالث من الحمل؟ ما هي التشوهات الجنينية التطورية النوعية التي تحدث؟",
      en: "Why are ACE inhibitors and ARBs categorically contraindicated across the second and third trimesters of pregnancy? What specific fetal developmental abnormalities occur?"
    },
    hints: [
      {
        tier: 1,
        tr: "Gebeliğin son evrelerinde amniyotik sıvının ana kaynağının fötal idrar olduğunu hatırlayın.",
        ar: "تذكر أن البول الجنيني هو المكون الأساسي للسائل السلوي في الثلثين الأخيرين من الحمل.",
        en: "Recall that fetal urine is the primary constituent of amniotic fluid in late pregnancy."
      },
      {
        tier: 2,
        tr: "Fötal böbrekler GFR'yi sürdürmek için Ang II'ye bağımlıdır. Fötus idrar üretemezse ne olur?",
        ar: "تعتمد كلى الجنين على Ang II لصيانة GFR. ماذا يحدث إذا عجز الجنين عن إنتاج البول؟",
        en: "Fetal kidneys depend on Ang II to maintain GFR. What happens if the fetus cannot produce urine?"
      },
      {
        tier: 3,
        tr: "Fötal Ang II'nin bloke edilmesi renal disgenez ve anüri yapar; oligohidramniyos, hipoplastik akciğerler (Potter dizisi) ve kafa kemikleşme defektleri gelişir.",
        ar: "يسبب حصر Ang II للجنين خلل تكون كلوي وانقطاع بول؛ مما يؤدي لقلة السلى، ونقص تنسج الرئة (متتالية بوتر)، وعيوب تعظم الجمجمة.",
        en: "Blocking fetal Ang II causes renal dysgenesis and anuria, resulting in oligohydramnios, hypoplastic lungs (Potter sequence), and calvarial skull defects."
      }
    ],
    conceptCheck: {
      question: {
        tr: "Gebelikte ACEi/ARB maruziyeti fötusta hangi patolojik sendromu ve anomalileri tetikler?",
        ar: "ما المتلازمة المرضية والتشوهات التي يثيرها تعرض الجنين لـ ACEi/ARB أثناء الحمل؟",
        en: "What pathological sequence and fetal malformations are triggered by in utero ACEi/ARB exposure?"
      },
      options: [
        {
          id: 'opt-l9-s10-1',
          isCorrect: true,
          text: {
            tr: "Fötal böbrekler perfüzyon ve organogenez için Ang II'ye muhtaçtır; blokaj fötal renal disgenez, oligohidramniyos, pulmoner hipoplazi ve kafa kemikleşme defektleri yapar.",
            ar: "تتطلب كلى الجنين Ang II للتروية والتشكل؛ ويؤدي الحصر لخلل تكون كلوي، وقلة السائل السلوي، ونقص تنسج رئوي، وعيوب تعظم الجمجمة.",
            en: "Fetal kidneys require Ang II for renal perfusion and organogenesis; blockade produces fetal renal dysgenesis, oligohydramnios, pulmonary hypoplasia, and skull ossification defects."
          },
          feedback: {
            tr: "Doğru. Fötal Ang II böbrek perfüzyonu ve GFR için şarttır. Baskılanması anüri ve oligohidramniyos yapar; bu da Potter dizisine (akciğer hipoplazisi, yüz anomalileri) ve kafa hipokalsifikasyonuna yol açar.",
            ar: "صحيح. Ang II حاسم لتروية كلى الجنين ورشحها. يسبب حصره انقطاع البول وقلة السلى، مما يطلق متتالية بوتر (نقص تنسج الرئة) وعيوب تعظم الجمجمة.",
            en: "Correct. Fetal Ang II is essential for renal hemodynamics in utero. Blockade causes anuria, oligohydramnios (Potter sequence: pulmonary hypoplasia), and calvarial skull defects."
          }
        },
        {
          id: 'opt-l9-s10-2',
          isCorrect: false,
          text: {
            tr: "ACE inhibitörleri dihidrofolat redüktazı doğrudan inhibe ederek folat depolarını tüketir ve açık nöral tüp defektlerine yol açar.",
            ar: "تثبط مثبطات ACE إنزيم اختزال ثنائي الهيدروفولات مباشرة، مستنزفة مخازن الفولات ومسببة عيوب الأنبوب العصبي المفتوحة.",
            en: "ACE inhibitors directly inhibit dihydrofolate reductase, depleting folate stores and precipitating open neural tube defects."
          },
          feedback: {
            tr: "Yanlış. ACEi folat antagonisti değildir. Teratojeniteleri 1. trimester nöral tüp hasarından değil, 2./3. trimester fötal böbrek hemodinamik çöküşünden doğar.",
            ar: "غير صحيح. ليست مثبطات ACE مضادات للفولات؛ ماسخيتها سمية جنينية في الثلثين 2 و 3 ناجمة عن فشل كلى الجنين وليست عيوب أنبوب عصبي.",
            en: "Incorrect. ACEi are not antifolates. Their teratogenicity is fetotoxic (2nd/3rd trimester renal failure), not 1st-trimester neural tube closure defects."
          }
        },
        {
          id: 'opt-l9-s10-3',
          isCorrect: false,
          text: {
            tr: "İlaçlar sereblona bağlanarak ekstremite tomurcuğu anjiyogenezini durdurur ve talidomid benzeri fokomeli oluşturur.",
            ar: "ترتبط الأدوية بالثيريبلون لتثبيط التوعية الدموية لبراعم الأطراف، مسببة فقمية الأطراف المشابهة للثاليدومايد.",
            en: "The drugs bind cereblon to arrest limb bud angiogenesis, producing thalidomide-like phocomelia and amelia."
          },
          feedback: {
            tr: "Yanlış. Sereblon talidomidin hedefidir. ACEi'lerin karakteristik etkisi ekstremite kaybı değil, fötal böbrek disgenezisidir.",
            ar: "غير صحيح. الثيريبلون هدف الثاليدومايد. الأثر المميز لـ ACEi هو خلل تكون الكلى الجنيني وليس بتر الأطراف.",
            en: "Incorrect. Cereblon is the target of thalidomide. ACEi toxicity is characterized by fetal renal dysgenesis and oligohydramnios."
          }
        }
      ]
    }
  },

  // Step 11: Connection
  {
    id: 'pharm-mod5-les1-step11',
    stage: 'connection',
    phase: 'integrate',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Bütünsel Bağlantı: Direkt Renin İnhibitörleri ve Geri Bildirim Döngüleri",
      ar: "ترابط شمولي: مثبطات الرينين المباشرة وحلقات التلقيم الراجع",
      en: "Holistic Connection: Direct Renin Inhibitors & RAAS Feedback Loops"
    },
    prompt: {
      tr: "Direkt renin inhibitörü aliskirenin farmakolojik profili, Plazma Renin Aktivitesi (PRA) ve Plazma Renin Konsantrasyonu (PRC) açısından ACE inhibitörleri ve ARB'lerden nasıl ayrılır?",
      ar: "كيف يختلف المظهر الدوائي لمثبط الرينين المباشر أليسكيرين عن مثبطات ACE و ARBs فيما يخص نشاط الرينين في البلازما (PRA) مقابل تركيز الرينين (PRC)؟",
      en: "How does the pharmacological profile of the direct renin inhibitor aliskiren differ from ACE inhibitors and ARBs regarding Plasma Renin Activity (PRA) versus Plasma Renin Concentration (PRC)?"
    },
    hints: [
      {
        tier: 1,
        tr: "Dolaşımdaki renin molekülü miktarı (PRC) ile substratı kesme enzimatik gücü (PRA) arasındaki farkı düşünün.",
        ar: "ميز بين كمية جزيئات الرينين (PRC) وقدرتها الإنزيمية على شطر الركيزة (PRA).",
        en: "Distinguish between enzyme molecule quantity (PRC) versus substrate cleavage activity (PRA)."
      },
      {
        tier: 2,
        tr: "Ang II düzeyleri düştüğünde jukstaglomerüler hücreler negatif geri bildirimi kaybeder ve kana daha çok renin proteini salar.",
        ar: "حين يهبط Ang II تفقد الخلايا المجاورة للكبيبات التلقيم الراجع فتفرز مزيداً من بروتين الرينين.",
        en: "When Ang II falls, juxtaglomerular cells lose negative feedback, secreting more renin protein into circulation."
      },
      {
        tier: 3,
        tr: "Tüm RAAS blokerleri PRC'yi artırır. Ancak Aliskiren reninin aktif bölgesini bağlayarak enzimatik aktiviteyi (PRA) düşürür; ACEi ve ARB'lerde ise PRA artar.",
        ar: "ترفع جميع حاصرات RAAS تركيز PRC. لكن أليسكيرين يحصر الموقع النشط للرينين فيسقط نشاطه (PRA)، بينما يرتفع PRA مع ACEi و ARBs.",
        en: "All RAAS blockers elevate PRC due to lost feedback. But Aliskiren blocks renin's active site, dropping PRA, whereas ACEi/ARBs increase PRA."
      }
    ],
    conceptCheck: {
      question: {
        tr: "Aliskirenin PRA ve PRC üzerindeki etkisi ACEi ve ARB'lerden nasıl farklılaşır?",
        ar: "كيف يختلف تأثير أليسكيرين على PRA و PRC مقارنة بمثبطات ACE و ARBs؟",
        en: "How does aliskiren's effect on PRA and PRC diverge from ACE inhibitors and ARBs?"
      },
      options: [
        {
          id: 'opt-l9-s11-1',
          isCorrect: true,
          text: {
            tr: "ACEi ve ARB'ler negatif geri bildirimin kaybıyla hem PRA'yı hem PRC'yi artırır; Aliskiren ise enzimi doğrudan inhibe ederek PRA'yı düşürürken PRC'yi artırır.",
            ar: "ترفع مثبطات ACE و ARBs كلاً من PRA و PRC بفقدان التلقيم الراجع؛ بينما يثبط أليسكيرين نشاط الرينين الإنزيمي خافضاً PRA ورافعاً PRC انعكاسياً.",
            en: "ACEi and ARBs increase both PRA and PRC via loss of negative feedback; Aliskiren directly inhibits renin enzymatic activity, suppressing PRA while reflexively increasing PRC."
          },
          feedback: {
            tr: "Doğru. Ang II azaldığında jukstaglomerüler negatif geri bildirim kalkar ve renin proteini (PRC) tüm sınıflarda artar. Aliskiren renini aktif yerinden kilitlediği için aktivite (PRA) çöker.",
            ar: "صحيح. عند هبوط Ang II يزول التلقيم الراجع ويرتفع بروتين الرينين (PRC) في الجميع. لكن أليسكيرين يقفل الموقع النشط فينهار نشاطه التحفيزي (PRA).",
            en: "Correct. Removing Ang II negative feedback increases renin release (PRC rises in all classes). But aliskiren blocks the catalytic cleft, so enzymatic activity (PRA) falls."
          }
        },
        {
          id: 'opt-l9-s11-2',
          isCorrect: false,
          text: {
            tr: "Aliskiren böbrek promotörüne bağlanarak renin mRNA sentezini tamamen durdurur ve hem PRA hem PRC'yi sıfıra indirir.",
            ar: "يرتبط أليسكيرين بالمحفز الكلوي ليوقف اصطناع mRNA للرينين كلياً، خافضاً كلاً من PRA و PRC إلى الصفر.",
            en: "Aliskiren binds the renal promoter to completely shut down renin mRNA synthesis, reducing both PRA and PRC to zero."
          },
          feedback: {
            tr: "Yanlış. Aliskiren bir enzim inhibitörüdür, transkripsiyon baskılayıcı değildir. Geri bildirim kalktığı için jukstaglomerüler hücreler PRC'yi artırır.",
            ar: "غير صحيح. أليسكيرين مثبط إنزيمي وليس كابحاً للاستنساخ؛ تفرز الخلايا المجاورة للكبيبات مزيداً من بروتين الرينين (يرتفع PRC) لفقدان التلقيم الراجع.",
            en: "Incorrect. Aliskiren is an active-site enzyme inhibitor, not a transcription repressor; PRC surges due to lost negative feedback."
          }
        },
        {
          id: 'opt-l9-s11-3',
          isCorrect: false,
          text: {
            tr: "ACE inhibitörleri jukstaglomerüler hücreleri inhibe etmek için renal AT2 reseptörlerini uyararak hem PRA hem PRC'yi baskılar.",
            ar: "تثبط مثبطات ACE كلاً من PRA و PRC عبر تنبيه مستقبلات AT2 الكلوية لتثبيط الخلايا المجاورة للكبيبات.",
            en: "ACE inhibitors suppress both PRA and PRC by directly stimulating renal AT2 receptors to inhibit juxtaglomerular cells."
          },
          feedback: {
            tr: "Yanlış. Ang II baskılandığında jukstaglomerüler AT1 üzerindeki fren kalkar; renin salınımı (hem PRA hem PRC) belirgin şekilde artar.",
            ar: "غير صحيح. عند تثبيط Ang II يزول الكبح عن مستقبلات AT1 الكبيبية؛ مما يرفع تحرر الرينين (كلا PRA و PRC) تعويضياً.",
            en: "Incorrect. Suppressing Ang II relieves negative feedback on juxtaglomerular AT1 receptors, provoking a compensatory surge in both PRA and PRC."
          }
        }
      ]
    }
  },

  // Step 12: Mastery Check
  {
    id: 'pharm-mod5-les1-step12',
    stage: 'mastery_check',
    phase: 'integrate',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Ustalık Sınavı: Biyobelirteç Paneli ve İlaç Tanımlaması",
      ar: "اختبار الإتقان: لوحة المؤشرات الحيوية وتشخيص الدواء",
      en: "Mastery Check: Biochemical Panel Diagnosis & Drug Identification"
    },
    prompt: {
      tr: "Hipertansif bir hastanın laboratuvar panelinde: Yüksek PRA, yüksek Anjiyotensin I, belirgin baskılanmış Anjiyotensin II, yüksek bradikinin ve hafif hiperkalemi saptanıyor. Bu biyobelirteç tablosunu hangi ilaç açıklar?",
      ar: "أظهرت تحاليل مريض ضغط: ارتفاع PRA، ارتفاع Ang I، هبوط شديد في Ang II، ارتفاع البراديكينين، وفرط بوتاسيوم خفيف. أي دواء يفسر هذه البصمة الحيوية بدقة؟",
      en: "A hypertensive patient's diagnostic panel reveals: Elevated PRA, elevated Angiotensin I, markedly suppressed Angiotensin II, elevated bradykinin, and mild hyperkalemia. Which specific drug accounts for this biomarker signature?"
    },
    hints: [
      {
        tier: 1,
        tr: "Enzimatik darboğazı takip edin: Anjiyotensin I ile Anjiyotensin II arasında tam olarak hangi enzim bulunur?",
        ar: "تتبع عنق الزجاجة الإنزيمي: ما هو الإنزيم الواقع تحديداً بين أنجيوتنسين I وأنجيوتنسين II؟",
        en: "Follow the enzymatic bottleneck: Which enzyme sits directly between Angiotensin I and Angiotensin II?"
      },
      {
        tier: 2,
        tr: "Bradikininin yüksek olduğuna dikkat edin. Hangi ilaç sınıfı bradikinin yıkımını selektif olarak durdurur?",
        ar: "انتبه لارتفاع البراديكينين. أي صنف دوائي يثبط تفكيك البراديكينين نوعياً؟",
        en: "Notice that bradykinin is elevated. Which drug class uniquely inhibits the breakdown of bradykinin?"
      },
      {
        tier: 3,
        tr: "ACE (kininaz II) inhibisyonu Ang I'i biriktirir, Ang II'yi düşürür ve bradikinin yıkımını durdurur. Bu profil kaptopril (ACE inhibitörü) ile uyumludur.",
        ar: "يؤدي تثبيط ACE (كينيناز II) لتراكم Ang I وهبوط Ang II ووقف تفكيك البراديكينين، وهو ما يطابق مثبطات ACE مثل كابتوبريل.",
        en: "Inhibiting ACE traps Ang I, shuts down Ang II production, and halts bradykinin degradation. This matches an ACE inhibitor like captopril."
      }
    ],
    conceptCheck: {
      question: {
        tr: "Belirtilen hormon ve peptit profili hangi farmakolojik ajanın kullanımını kanıtlar?",
        ar: "أي عامل دوائي تؤكده هذه اللوحة الهرمونية والببتيدية بدقة؟",
        en: "Which pharmacological agent is definitively identified by this hormonal and peptide panel?"
      },
      options: [
        {
          id: 'opt-l9-s12-1',
          isCorrect: true,
          text: {
            tr: "Kaptopril (ACE İnhibitörü); kilitlenen ACE Ang I'in Ang II'ye dönüşümünü durdurur (Ang I artar, Ang II düşer) ve bradikinin yıkımını engeller.",
            ar: "كابتوبريل (مثبط ACE)؛ يؤدي حصر ACE لوقف تحول Ang I إلى Ang II (ارتفاع Ang I وهبوط Ang II) مع منع تفكيك البراديكينين.",
            en: "Captopril (ACE Inhibitor); blocked ACE halts Ang I to Ang II conversion (elevating Ang I, suppressing Ang II) while preventing bradykinin degradation."
          },
          feedback: {
            tr: "Doğru! ACE inhibitörleri Ang I'in Ang II'ye dönüşümünü keserek Ang I biriktirir ve Ang II'yi düşürür. Kininaz II bloke olduğu için bradikinin artar.",
            ar: "صحيح! تحجب مثبطات ACE تحول Ang I إلى Ang II مما يراكم Ang I ويخفض Ang II، ويرفع البراديكينين لحصر كينيناز II.",
            en: "Correct! ACE inhibitors block conversion of Ang I to Ang II, accumulating Ang I and depleting Ang II. Blocked kininase II accumulates bradykinin."
          }
        },
        {
          id: 'opt-l9-s12-2',
          isCorrect: false,
          text: {
            tr: "Losartan (ARB); çünkü reseptörün bloke edilmesi plazma Ang II düzeyini düşürür ve dolaşımda bradikinin biriktirir.",
            ar: "لوسارتان (ARB)؛ لأن حصر المستقبل يخفض بالتزامن تركيز Ang II في البلازما ويراكم البراديكينين الجائل.",
            en: "Losartan (ARB); because blocking the receptor simultaneously reduces plasma Ang II concentration and accumulates circulating bradykinin."
          },
          feedback: {
            tr: "Yanlış. ARB'ler AT1 reseptörünü bloke eder; negatif geri bildirim kalktığı için plazma Ang II seviyesi artar, bradikinin ise değişmez.",
            ar: "غير صحيح. تحصر ARBs مستقبلات AT1 فيرتفع Ang II لزوال التلقيم الراجع، ولا تؤثر على كينيناز II فيبقى البراديكينين طبيعياً.",
            en: "Incorrect. ARBs block AT1, increasing plasma Ang II via loss of negative feedback; they do not alter kininase II, so bradykinin is normal."
          }
        },
        {
          id: 'opt-l9-s12-3',
          isCorrect: false,
          text: {
            tr: "Aliskiren (Direkt Renin İnhibitörü); çünkü yukarı akıştaki reninin bloke edilmesi Ang I'in Ang II'ye dönüşümünü hızlandırır.",
            ar: "أليسكيرين (مثبط الرينين المباشر)؛ لأن حصر الرينين في البداية يسرع تحول Ang I إلى Ang II.",
            en: "Aliskiren (Direct Renin Inhibitor); because blocking upstream renin accelerates conversion of Ang I into Ang II."
          },
          feedback: {
            tr: "Yanlış. Aliskiren anjiyotensinojenin Ang I'e dönüşümünü engeller; hem Ang I hem Ang II düşer, PRA çöker ve bradikinin etkilenmez.",
            ar: "غير صحيح. يثبط أليسكيرين تحول أنجيوتنسينوجين إلى Ang I؛ فيهبط كل من Ang I و Ang II وينهار PRA ولا يتغير البراديكينين.",
            en: "Incorrect. Aliskiren inhibits angiotensinogen conversion to Ang I; both Ang I and Ang II fall, PRA plummets, and bradykinin is unaffected."
          }
        }
      ]
    }
  }
];

// ============================================================================
// DATA FOR LESSON 10: pharm-mod5-les2
// ============================================================================
const lesson10Steps = [
  // Step 1: Hook
  {
    id: 'pharm-mod5-les2-step1',
    stage: 'hook',
    phase: 'explore',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Klinik Paradoks: Akut Akciğer Ödeminde Furosemidin İdrar Öncesi Etkisi",
      ar: "المفارقة السريرية: تأثير فوروسيميد قبل الإدرار في وذمة الرئة",
      en: "Clinical Paradox: IV Furosemide in Acute Pulmonary Edema"
    },
    prompt: {
      tr: "Akut akciğer ödemi hastasına IV furosemid veriliyor. Boğucu nefes darlığı, mesanede tek damla idrar oluşmadan önce, 5 dakikada mucizevi şekilde düzeliyor! Bu durumu hangi akut hemodinamik mekanizma açıklar?",
      ar: "تلقى مريض وذمة رئة حادة فوروسيميد وريدياً. تحسن ضيق التنفس الخانق خلال 5 دقائق وقبل أن تنتج المثانة قطرة بول واحدة! ما الآلية الديناميكية الدموية السريعة المفسرة؟",
      en: "An acute pulmonary edema patient receives IV furosemide. Suffocating dyspnea resolves dramatically within 5 minutes—long before the bladder produces a single drop of urine! What acute hemodynamic mechanism explains this?"
    },
    hints: [
      {
        tier: 1,
        tr: "Zamanlamaya dikkat edin: 5 dakika tübüler sıvı akışı veya idrar oluşumu için çok erkendir.",
        ar: "انتبه للتوقيت: 5 دقائق أسرع بكثير من تدفق البول وامتلاء المثانة.",
        en: "Notice the timing: 5 minutes is too fast for renal tubular fluid flow or bladder filling."
      },
      {
        tier: 2,
        tr: "Venöz kapasitansı düşünün: Kalbin ön-yükünü (preload) anında boşaltmak için venöz kan nerede göllenebilir?",
        ar: "فكر في السعة الوريدية: أين يمكن تجميع الدم لتخفيف الحمل القبلي للقلب على الفور؟",
        en: "Think about vascular capacitance: where can blood be pooled to immediately unload the failing heart?"
      },
      {
        tier: 3,
        tr: "Furosemid hızla renal PGE2 sentezini uyararak sistemik venodilatasyon yapar. Bu etki venöz dönüşü azaltıp akciğer konjesyonunu idrar başlamadan rahatlatır.",
        ar: "يحفز فوروسيميد تحرر PGE2 الكلوي مسبباً توسعاً وريدياً فورياً يخفض العود الوريدي ويريح وذمة الرئة قبل الإدرار.",
        en: "Furosemide stimulates renal PGE2 synthesis, causing rapid systemic venodilation that reduces venous return and relieves congestion prior to diuresis."
      }
    ],
    conceptCheck: {
      question: {
        tr: "IV furosemid akciğer ödemini diürez başlamadan dakikalar önce nasıl rahatlatır?",
        ar: "كيف يريح فوروسيميد وريدياً وذمة الرئة خلال دقائق وقبل بدء الإدرار الفعلي؟",
        en: "How does IV furosemide relieve acute pulmonary edema minutes before diuresis begins?"
      },
      options: [
        {
          id: 'opt-l10-s1-1',
          isCorrect: true,
          text: {
            tr: "Furosemid hızla renal prostaglandin (PGE2) salınımını tetikler; sistemik venodilatasyon yaparak venöz kanı göller ve kardiyak önyükü belirgin şekilde düşürür.",
            ar: "يحفز الفوروسيميد تحرراً كلوياً سريعاً للبروستاغلاندين (PGE2)، مسبباً توسعاً وريدياً جهازياً يجمع الدم ويخفض الحمل القبلي للقلب بشدة.",
            en: "Furosemide triggers rapid renal prostaglandin (PGE2) release, provoking systemic venodilation that pools venous blood and dramatically reduces cardiac preload."
          },
          feedback: {
            tr: "Doğru. Furosemid diürezden önce hızla renal prostaglandin (PGE2) salarak venöz kapasitansı artırır, önyükü düşürür ve akciğer kılcal basıncını düşürür.",
            ar: "صحيح. يمتلك فوروسيميد تأثيراً وعائياً سريعاً عبر PGE2؛ يوسع الأوردة ويخفض الحمل القبلي محولاً الدم عن الرئتين قبل بدء إدرار البول.",
            en: "Correct. Furosemide has a rapid vascular action mediated by renal PGE2: it induces systemic venodilation, pooling blood and reducing preload before diuresis."
          }
        },
        {
          id: 'opt-l10-s1-2',
          isCorrect: false,
          text: {
            tr: "Furosemid hava yolu beta-2 adrenerjik reseptörlerini uyararak bronş düz kasını doğrudan gevşetir ve alveolar sıvıyı temizler.",
            ar: "ينبه الفوروسيميد مستقبلات بيتا-2 الشعبية مباشرة، مرخياً العضلات الملساء التنفسية ومصرّفاً السائل السنخي.",
            en: "Furosemide stimulates airway beta-2 adrenergic receptors, directly relaxing bronchial smooth muscle and clearing alveolar transudate."
          },
          feedback: {
            tr: "Yanlış. Furosemidin adrenerjik reseptör afinitesi yoktur; rahatlama prostaglandin aracılı venöz önyük düşüşünden kaynaklanır.",
            ar: "غير صحيح. ليس للفوروسيميد أي ألفة للمستقبلات الأدرينالينية؛ وينجم التحسن عن تخفيف الحمل القبلي بتوسع الأوردة عبر البروستاغلاندين.",
            en: "Incorrect. Furosemide has zero adrenergic affinity. The relief is hemodynamic preload reduction via prostaglandin-mediated venodilation."
          }
        },
        {
          id: 'opt-l10-s1-3',
          isCorrect: false,
          text: {
            tr: "Furosemid lenfatik kapakçıkları doğrudan açarak dakikalar içinde 2 litre alveolar sıvıyı duktus torasikusa pompalar.",
            ar: "يفتح الفوروسيميد الصمامات اللمفاوية مباشرة، ضاخاً لترين من السائل السنخي إلى القناة الصدرية خلال دقائق.",
            en: "Furosemide directly opens lymphatic valve pores, pumping 2 liters of alveolar fluid into thoracic ducts within minutes."
          },
          feedback: {
            tr: "Yanlış. Lenfatik sistem sıvıyı bu hızda boşaltamaz. Sol ventrikül dolum basıncı düşünce kapillerler sıvıyı kendiliğinden geri çeker.",
            ar: "غير صحيح. لا يمكن للجهاز اللمفاوي تصريف السوائل بهذه السرعة؛ يسمح انخفاض ضغط الأذين الأيسر للشعيرات بإعادة امتصاص السائل تلقائياً.",
            en: "Incorrect. Fluid cannot be cleared lymphatically that fast; reducing left ventricular filling pressure allows pulmonary capillaries to reabsorb transudate."
          }
        }
      ]
    }
  },

  // Step 2: Question
  {
    id: 'pharm-mod5-les2-step2',
    stage: 'question',
    phase: 'explore',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Kavramsal Soru: Kıvrım Diüretikleri Kalsiyumu Atar, Tiyazidler Tutar",
      ar: "سؤال مفاهيمي: مدرات العروة تطرح الكالسيوم والثيازيد تحبسه",
      en: "Conceptual Question: Loops Lose Calcium vs Thiazides Take In Calcium"
    },
    prompt: {
      tr: "Hipertansif bir hasta tekrarlayan kalsiyum oksalat böbrek taşlarından muzdariptir. Furosemid neden taş oluşumunu artırırken hidroklorotiyazid taşları tamamen durdurur? Kalsiyum yönetimi neden zıttır?",
      ar: "يعاني مريض ضغط من حصيات كلوية كلسية ناكسة. لماذا يفاقم الفوروسيميد تكون الحصيات بينما يوقفه هيدروكلوروثيازيد تماماً؟ كيف يتناقض تعاملهما الكلوي مع الكالسيوم؟",
      en: "A hypertensive patient suffers recurrent calcium oxalate kidney stones. Why does furosemide exacerbate nephrolithiasis, while hydrochlorothiazide halts stone recurrence entirely? How do their renal calcium handlings diverge?"
    },
    hints: [
      {
        tier: 1,
        tr: "Klinik kural: 'Loops Lose calcium, Thiazides Take in calcium' (Kıvrım kalsiyumu döker, Tiyazid tutar).",
        ar: "القاعدة السريرية: 'مدرات العروة تطرح الكالسيوم (Loops Lose)، ومدرات الثيازيد تحبس الكالسيوم (Thiazides Take)'.",
        en: "Mnemonic: 'Loops Lose calcium, Thiazides Take in calcium.'"
      },
      {
        tier: 2,
        tr: "Henle çıkan kolunda paraselüler Ca2+ emilimi lümen-pozitif (+8 mV) potansiyele bakar. Distal tübülde ise Ca2+ emilimi hücre içi Na+ seviyesine bağlıdır.",
        ar: "يعتمد ارتشاف الكالسيوم في العروة على الجهد الإيجابي باللمعة (+8 mV). وفي الأنبوب البعيد يقترن بخروج الصوديوم.",
        en: "In the TAL, Ca2+ reabsorption depends on a lumen-positive potential (+8 mV). In DCT, Ca2+ reabsorption couples to Na+ exit."
      },
      {
        tier: 3,
        tr: "Furosemid TAL'de NKCC2'yi durdurup lümen-pozitif potansiyeli yıkar (kalsiyüri). Tiyazidler ise DCT'de hücre içi sodyumu düşürüp bazolateral 3Na+/Ca2+ değiştiricisini hızlandırır (kalsiyum tutulur).",
        ar: "يلغي فوروسيميد الجهد الإيجابي طارحاً الكالسيوم بالبول؛ بينما يخفض الثيازيد الصوديوم بالخلية معززاً مبادل 3Na+/Ca2+ لارتشاف الكالسيوم للدم.",
        en: "Furosemide abolishes the lumen-positive potential in TAL, wasting Ca2+. Thiazides lower cellular Na+ in DCT, driving basolateral 3Na+/Ca2+ exchange to retain calcium."
      }
    ],
    conceptCheck: {
      question: {
        tr: "Furosemid ve hidroklorotiyazidin böbrekte kalsiyum taşınması üzerindeki zıt etkilerinin temeli nedir?",
        ar: "ما هو الأساس الفسيولوجي للتأثيرات المتعاكسة للفوروسيميد وهيدروكلوروثيازيد على نقل الكالسيوم الكلوي؟",
        en: "What is the physiological basis of opposing renal calcium handling by furosemide versus hydrochlorothiazide?"
      },
      options: [
        {
          id: 'opt-l10-s2-1',
          isCorrect: true,
          text: {
            tr: "Furosemid TAL'de NKCC2'yi bloke edip lümen-pozitif potansiyeli yıkarak kalsiyumu idrara döker; tiyazidler ise DCT'de NCC'yi bloke ederek kalsiyumun kana geri emilimini artırır.",
            ar: "يحصر الفوروسيميد NKCC2 لاغياً الجهد الإيجابي وطارحاً الكالسيوم بالبول؛ بينما يحصر الثيازيد NCC خافضاً الصوديوم ومعززاً ارتشاف الكالسيوم للدم.",
            en: "Furosemide blocks TAL NKCC2, abolishing the lumen-positive potential and wasting calcium into urine; thiazides block DCT NCC, lowering intracellular Na+ and enhancing basolateral Na+/Ca2+ reabsorption."
          },
          feedback: {
            tr: "Doğru. Furosemid TAL'de ROMK kaynaklı +8 mV'lik paraselüler itici gücü sıfırlar (hiperkalsiyüri). Tiyazidler ise DCT'de hücre içi Na'yı düşürerek NCX1 ile kalsiyumu kana çeker (hipokalsiyüri).",
            ar: "صحيح. يلغي فوروسيميد القوة الدافعة +8 mV في TAL طارحاً الكالسيوم (حصيات). بينما يخفض الثيازيد صوديوم DCT منشطاً NCX1 لإعادة الكالسيوم للدم (مانع للحصيات).",
            en: "Correct. Furosemide dismantles the +8 mV lumen-positive driving force for paracellular Ca2+ in TAL. Thiazides lower DCT cellular Na+, driving basolateral NCX1 to reabsorb calcium."
          }
        },
        {
          id: 'opt-l10-s2-2',
          isCorrect: false,
          text: {
            tr: "Tiyazidler tiroidden kalsitonin salınımını uyararak dolaşımdaki kalsiyumu kemiklere sokar ve kalsiyumun glomerüle ulaşmasını tamamen engeller.",
            ar: "يحفز الثيازيد تحرر الكالسيتونين لترسيب الكالسيوم في العظام، ملغياً وصوله إلى الكبيبة كلياً.",
            en: "Thiazides stimulate thyroid calcitonin release to drive circulating calcium into bones, eliminating calcium from the glomerulus entirely."
          },
          feedback: {
            tr: "Yanlış. Tiyazidler tiroid veya kemiğe etki etmez; hipokalsiyürik etki tamamen DCT'deki NCC blokajı ve bazolateral NCX1 aktivasyonundan kaynaklanır.",
            ar: "غير صحيح. لا يؤثر الثيازيد على الغدة الدرقية أو العظام؛ بل ينجم حصر طرح الكالسيوم حصراً عن تثبيط NCC وتنشيط NCX1 في الأنبوب البعيد.",
            en: "Incorrect. Thiazides do not act on thyroid or bone; hypocalciuric actions occur strictly in the DCT via NCC inhibition and NCX1 exchange."
          }
        },
        {
          id: 'opt-l10-s2-3',
          isCorrect: false,
          text: {
            tr: "Furosemid tüm toplayıcı sistemde epitelyal kalsiyum kanallarını (TRPV5) doğrudan bloke ederek aktif transselüler kalsiyum alımını felç eder.",
            ar: "يحصر الفوروسيميد قنوات الكالسيوم الظهارية (TRPV5) مباشرة، معطلاً الامتصاص النشط للكالسيوم عبر الخلايا.",
            en: "Furosemide directly blocks epithelial calcium channels (TRPV5) throughout the entire collecting system, paralyzing active transcellular calcium uptake."
          },
          feedback: {
            tr: "Yanlış. TAL'de kalsiyum emilimi ağırlıklı olarak paraselülerdir ve lümen-pozitif potansiyelle itilir; furosemid TRPV5'i doğrudan bloke etmez.",
            ar: "غير صحيح. ارتشاف الكالسيوم في TAL نظير خلوي تدفعه الشحنة الموجبة باللمعة؛ ولا يحصر فوروسيميد قنوات TRPV5 مباشرة.",
            en: "Incorrect. TAL calcium reabsorption is paracellular, driven by the lumen-positive transepithelial voltage rather than direct TRPV5 blockade."
          }
        }
      ]
    }
  },

  // Step 3: Intuition
  {
    id: 'pharm-mod5-les2-step3',
    stage: 'intuition',
    phase: 'explore',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Fiziksel Sezgi: Kademeli Barajlar Nehri Olarak Nefron",
      ar: "الحدس الفيزيائي: النفرون كنهرب سدود متتالية",
      en: "Physical Intuition: The Nephron as a Cascading Dam River"
    },
    prompt: {
      tr: "Nefronu kademeli barajları olan bir nehir gibi hayal edin. Henle kulpu filtrelenen sodyumun %25'ini tutan devasa bir barajdır. Bu barajı dinamitlemek aşağıdaki setleri taşırır. Distal setler buna nasıl yanıt verir?",
      ar: "تخيل النفرون كنهرب سدود متتالية. عروة هنلي سد هائل يحجز 25% من الصوديوم. تفجير هذا السد يغمر الحواجز السفلية. كيف تستجيب الحواجز البعيدة؟",
      en: "Imagine the nephron as a river with cascading floodgates. The loop of Henle is a massive dam holding 25% of sodium. Dynamiting this dam overwhelms downstream levees. How do distal levees respond?"
    },
    hints: [
      {
        tier: 1,
        tr: "Distal tübül ve toplayıcı kanallara ulaşan devasa sodyum ve sıvı akışını düşünün.",
        ar: "فكر في التدفق الهائل للصوديوم والسوائل الواصل للأنابيب البعيدة والجامعة.",
        en: "Consider the massive sodium and fluid delivery reaching the late distal tubule and collecting duct."
      },
      {
        tier: 2,
        tr: "Toplayıcı kanal ana hücreleri ENaC ile sodyumu çekerken elektriksel denge için idrara hangi katyonları feda eder?",
        ar: "حين تستعيد خلايا الأنابيب الجامعة الصوديوم عبر ENaC، ما هي الكاتيونات التي تضحي بها في البول لمعادلة الشحنة؟",
        en: "When principal cells take up sodium through ENaC, what cations must be dumped into urine for electrical balance?"
      },
      {
        tier: 3,
        tr: "Aşırı distal sodyum akışı elektrejenik ENaC emilimini zorlar; lümene potasyum (ROMK) ve proton atılarak hipokalemik metabolik alkaloz gelişir.",
        ar: "يدفع تدفق الصوديوم امتصاص ENaC الكهربائي، مولداً شحنة سالبة تجبر الكلية على طرح K+ و H+ مسببة قلاءً بنقص البوتاسيوم.",
        en: "High distal sodium delivery drives electrogenic ENaC reabsorption, creating a lumen-negative charge that dumps K+ (ROMK) and H+ into urine."
      }
    ],
    conceptCheck: {
      question: {
        tr: "Kıvrım diüretikleri Henle barajını yıktığında toplayıcı kanallardaki elektrolit dengesi nasıl bozulur?",
        ar: "كيف يختل توازن الشوارد في الأنابيب الجامعة حين تفجر مدرات العروة سد هنلي؟",
        en: "How is collecting duct electrolyte transport altered when loop diuretics disable the Henle dam?"
      },
      options: [
        {
          id: 'opt-l10-s2-1',
          isCorrect: true,
          text: {
            tr: "Aşırı sodyumla taşan toplayıcı kanallar, ENaC ve ROMK üzerinden sodyumu yakalamak için umutsuzca potasyum ve proton feda eder; hipokalemik metabolik alkaloz gelişir.",
            ar: "تضحي الأنابيب الجامعة المغمورة بالصوديوم بالبوتاسيوم والبروتونات لاستعادة الصوديوم عبر ENaC و ROMK، محدثة قلاءً استقلابياً بنقص البوتاسيوم.",
            en: "Flooded downstream collecting ducts frantically exchange surging sodium for potassium and protons via ENaC and ROMK, triggering severe hypokalemic metabolic alkalosis."
          },
          feedback: {
            tr: "Doğru. Henle kulpu bloke edildiğinde distal segmentlere devasa sodyum ulaşır. Esas hücreler ENaC ile sodyumu çekerken potasyum ve protonları idrara atarak alkaloz ve hipokalemi yapar.",
            ar: "صحيح. يغمر الصوديوم الأنابيب الجامعة، فتمتصه الخلايا الرئيسية عبر ENaC طارحة البوتاسيوم والهيدروجين، مما يحدث قلاءً استقلابياً بنقص البوتاسيوم.",
            en: "Correct. Excessive distal sodium delivery stimulates electrogenic ENaC reabsorption, forcing principal cells to secrete K+ and H+ into urine."
          }
        },
        {
          id: 'opt-l10-s2-2',
          isCorrect: false,
          text: {
            tr: "Aşağı akıştaki toplayıcı kanallar tüm iyon kanallarını tamamen kapatarak sodyum ve potasyumun eşit oranda dokunulmadan geçmesine izin verir.",
            ar: "تغلق الأنابيب الجامعة السفلية جميع قنواتها كلياً، تاركة نسباً متساوية من الصوديوم والبوتاسيوم لتمر دون تعديل.",
            en: "Downstream collecting ducts close all ion channels completely, allowing equal proportions of sodium and potassium to pass out untouched."
          },
          feedback: {
            tr: "Yanlış. Toplayıcı kanallar kanallarını kapatmaz; aksine yüksek akış hızı ve aldosteron uyarımı potasyum atılımını maksimuma çıkarır.",
            ar: "غير صحيح. لا تغلق الأنابيب قنواتها؛ بل يؤدي التدفق العالي وتحفيز الألدوستيرون لتعظيم إطراح البوتاسيوم.",
            en: "Incorrect. Distal segments dramatically ramp up sodium-potassium exchange due to flow-dependent kaliuresis and lumen negativity."
          }
        },
        {
          id: 'opt-l10-s2-3',
          isCorrect: false,
          text: {
            tr: "Aşağı akış segmentleri idrardan potasyumu aşırı geri emerek kıvrım diüretikleri uygulandığında yaşamı tehdit eden hiperkalemiye yol açar.",
            ar: "تعيد الأجزاء السفلية امتصاص البوتاسيوم بشدة من البول، مسببة فرط بوتاسيوم مهدداً للحياة عند إعطاء مدرات العروة.",
            en: "Downstream segments hyper-reabsorb potassium from urine, causing life-threatening hyperkalemia whenever loop diuretics are administered."
          },
          feedback: {
            tr: "Yanlış. Kıvrım diüretikleri hiperkalemi değil hipokalemi yapar; potasyum atılımı belirgin şekilde artar.",
            ar: "غير صحيح. تسبب مدرات العروة نقص البوتاسيوم وليس فرطه؛ حيث يتسارع إطراح البوتاسيوم بالبول بشدة.",
            en: "Incorrect. Loop diuretics cause hypokalemia, not hyperkalemia; distal Na+/K+ exchange dumps potassium into urine."
          }
        }
      ]
    }
  },

  // Step 4: Visual Explanation
  {
    id: 'pharm-mod5-les2-step4',
    stage: 'visual_explanation',
    phase: 'explain',
    type: 'explanation',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Görsel Açıklama: Nefron Boyunca Taşıyıcı Mimarisi ve Etkinlik Tavanı",
      ar: "شرح مرئي: بنية النواقل على طول النفرون وسقف الفعالية",
      en: "Visual Explanation: Transporter Architecture Along the Nephron"
    },
    prompt: {
      tr: "Nefron boyunca diüretik hedeflerini haritalayın: TAL'de furosemid NKCC2'yi; DCT'de tiyazidler NCC'yi; CCD'de amilorid ENaC'ı, spironolakton MR'ı bloke eder. 'Yüksek tavanlı' etkinliği ne belirler?",
      ar: "حدد أهداف المدرات على النفرون: في TAL يحصر فوروسيميد NKCC2؛ وفي DCT يحصر ثيازيد NCC؛ وفي CCD يحصر أميلوريد ENaC وسبيرونولاكتون MR. ما الذي يحدد الفعالية القصوى؟",
      en: "Map the diuretic targets along the nephron: In TAL, furosemide blocks NKCC2; in DCT, thiazides block NCC; in CCD, amiloride blocks ENaC while spironolactone blocks MR. What defines high-ceiling potency?"
    },
    hints: [
      {
        tier: 1,
        tr: "Nefronun farklı bölümlerinde süzülen sodyumun yüzde kaçının geri emildiğini karşılaştırın.",
        ar: "قارن بين النسبة المئوية للصوديوم المرتشف في كل جزء من النفرون.",
        en: "Compare the percentage of filtered sodium reabsorbed in each nephron segment."
      },
      {
        tier: 2,
        tr: "TAL sodyumun %25'ini; DCT %5'ini; toplayıcı kanal ise yalnızca %2'sini geri emer.",
        ar: "يرتشف TAL نحو 25% من الصوديوم، و DCT نحو 5%، والأنبوب الجامع نحو 2% فقط.",
        en: "TAL reabsorbs ~25% of sodium; DCT ~5%; collecting duct only ~2%."
      },
      {
        tier: 3,
        tr: "Furosemid 'yüksek tavanlıdır' çünkü süzülen sodyumun %25'ini tutan NKCC2'yi kilitler; bu oran diğer tüm diüretik hedeflerini katlar.",
        ar: "يعد فوروسيميد ذا 'سقف مرتفع' لأنه يعطل NKCC2 المسؤول عن 25% من الصوديوم، متجاوزاً بكثير بقية الأهداف.",
        en: "Loop diuretics are 'high-ceiling' because blocking NKCC2 disables reclamation of 25% of filtered sodium, far exceeding other segments."
      }
    ],
    conceptCheck: {
      question: {
        tr: "Diüretiklerin natriüretik tavan gücünü (etkinlik kapasitesini) belirleyen temel faktör nedir?",
        ar: "ما العامل الأساسي المحدد لسقف الفعالية الإدرارية للمدرات على طول النفرون؟",
        en: "What primary factor dictates the maximal natriuretic ceiling capacity of diuretics along the nephron?"
      },
      options: [
        {
          id: 'opt-l10-s4-1',
          isCorrect: true,
          text: {
            tr: "NKCC2 süzülen sodyumun yaklaşık %25'ini geri emer; bu da kıvrım diüretiklerine DCT NCC (%5) veya CCD ENaC (%2) hedeflerine kıyasla devasa 'yüksek tavanlı' güç kazandırır.",
            ar: "يعيد NKCC2 امتصاص 25% من الصوديوم في TAL، مما يمنح مدرات العروة قوة إدرار قصوى هائلة مقارنة بـ NCC في DCT (5%) أو ENaC (2%).",
            en: "NKCC2 reabsorbs ~25% of filtered sodium in TAL, giving loop diuretics massive 'high-ceiling' natriuretic power compared to DCT NCC (~5%) or CCD ENaC (~2%)."
          },
          feedback: {
            tr: "Doğru. Hedef alınan nefron segmentinin sodyum taşıma kapasitesi tavanı belirler: TAL %25 (kıvrım: yüksek tavan), DCT %5 (tiyazid: orta), toplayıcı kanal %2 (K-tutucu: zayıf).",
            ar: "صحيح. تحدد سعة ارتشاف الصوديوم في الجزء المستهدف سقف الفعالية: عروة هنلي 25% (سقف عالٍ)، الأنبوب البعيد 5% (متوسط)، والأنبوب الجامع 2% (ضعيف).",
            en: "Correct. Segmental sodium reabsorption capacity dictates ceiling efficacy: TAL handles 25% (high ceiling), DCT handles 5% (moderate), CCD handles 2% (weak)."
          }
        },
        {
          id: 'opt-l10-s4-2',
          isCorrect: false,
          text: {
            tr: "Toplayıcı kanaldaki ENaC süzülen sodyumun %50'sinden fazlasını emer ve amiloridi en güçlü natriüretik ajan yapar.",
            ar: "تعيد قنوات ENaC في الأنبوب الجامع امتصاص أكثر من 50% من الصوديوم، مما يجعل أميلوريد أقوى مدر للصوديوم.",
            en: "ENaC in the collecting duct normally reabsorbs over 50% of filtered sodium, making amiloride the most potent natriuretic agent."
          },
          feedback: {
            tr: "Yanlış. Toplayıcı kanal süzülen sodyumun yalnızca %1-3'ünü geri emer; potasyum tutucu diüretikler tek başlarına zayıf natriüretiklerdir.",
            ar: "غير صحيح. يرتشف الأنبوب الجامع 1-3% فقط من الصوديوم المرتشح؛ ومدرات حفظ البوتاسيوم ضعيفة جداً بمفردها.",
            en: "Incorrect. The collecting duct reabsorbs only 1–3% of filtered sodium; potassium-sparing diuretics are inherently weak natriuretics."
          }
        },
        {
          id: 'opt-l10-s4-3',
          isCorrect: false,
          text: {
            tr: "Tiyazidlerin sonsuz doğrusal bir doz-yanıt eğrisi vardır ve yüksek dozlarda maksimum natriüretik kapasitede kıvrım diüretiklerini geçer.",
            ar: "تمتلك الثيازيدات منحنى استجابة خطياً لا نهائياً، وتتجاوز مدرات العروة في قدرة طرح الصوديوم القصوى عند الجرعات العالية.",
            en: "Thiazides have an infinite linear dose-response curve, exceeding loop diuretics in maximal natriuretic capacity at higher doses."
          },
          feedback: {
            tr: "Yanlış. Tiyazidler düz bir doz-yanıt eğrisine sahiptir (düşük tavan); dozu artırmak diürezi artırmaz, sadece yan etkileri artırır.",
            ar: "غير صحيح. للثيازيدات منحنى استجابة مسطح (سقف منخفض)؛ وزيادة الجرعة تزيد السمية دون مضاعفة الإدرار.",
            en: "Incorrect. Thiazides have a flat dose-response curve (low ceiling); increasing dose beyond standard levels adds toxicity without enhancing diuresis."
          }
        }
      ]
    }
  },

  // Step 5: Interactive Artifact (IonizationEquilibriumSlider - keep existing widget config intact)
  null,

  // Step 6: Guided Discovery
  {
    id: 'pharm-mod5-les2-step6',
    stage: 'guided_discovery',
    phase: 'explain',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Rehberli Keşif: Ters-Akım Çoğaltıcı Sisteminin Çöküşü",
      ar: "استكشاف موجه: انهيار آلية التيار المتعاكس المضاعفة",
      en: "Guided Discovery: Collapse of the Countercurrent Multiplier"
    },
    prompt: {
      tr: "Furosemid renal ters-akım çoğaltıcı mekanizmasını felç eder. NKCC2'nin bloke edilmesi, 1200 mOsm/L'lik kortikomedüller osmotik gradyanı neden tamamen yok ederek idrarı konsantre veya dilüe etme yeteneğini sıfırlar?",
      ar: "يشل الفوروسيميد آلية التيار المتعاكس الكلوية. لماذا يؤدي حصر NKCC2 لتدمير المدروج التناضحي النخاعي (1200 mOsm/L) كلياً، عاجزاً الكلية عن تكثيف البول أو تمديده؟",
      en: "Furosemide paralyzes the renal countercurrent multiplier. Why does blocking NKCC2 completely destroy the corticomedullary osmotic gradient (1200 mOsm/L), rendering the kidney incapable of concentrating or diluting urine?"
    },
    hints: [
      {
        tier: 1,
        tr: "ADH varlığında suyun toplayıcı kanallardan dışarı çıkmasını sağlayan osmotik çekici gücü düşünün.",
        ar: "ما هي القوة التناضحية التي تجذب الماء خارج الأنابيب الجامعة بوجود هرمون ADH؟",
        en: "What provides the osmotic driving force for water to leave collecting ducts when ADH is present?"
      },
      {
        tier: 2,
        tr: "Medüller interstisyum, suyu çekebilmek için 1200 mOsm/L'ye kadar hipertonik olmak zorundadır.",
        ar: "يجب أن يكون خلال النخاع مفرط التوتر (حتى 1200 mOsm/L) ليسحب الماء تناضحياً.",
        en: "The medullary interstitium must be hypertonic (up to 1200 mOsm/L) to draw water out."
      },
      {
        tier: 3,
        tr: "Suya geçirimsiz TAL'de NKCC2 ile aktif NaCl pompalanması medüller gradyanı kurar. NKCC2 durunca interstisyum izotonikleşir (300 mOsm/L) ve izostenüri oluşur.",
        ar: "يبني ضخ NaCl عبر NKCC2 في عروة هنلي الكتيمة للماء مدروج النخاع التناضحي. حصر هذا الناقل يسقط المدروج لسواء التوتر (300 mOsm/L).",
        en: "Active NaCl pumping via NKCC2 in the water-impermeable TAL generates the medullary gradient. Blocking it collapses the gradient to 300 mOsm/L (isosthenuria)."
      }
    ],
    conceptCheck: {
      question: {
        tr: "Furosemid medüller osmotik gradyanı ve idrar konsantre etme yeteneğini nasıl sıfırlar?",
        ar: "كيف يلغي فوروسيميد المدروج التناضحي النخاعي وقدرة الكلية على تكثيف البول؟",
        en: "How does furosemide abolish the medullary osmotic gradient and the ability to concentrate urine?"
      },
      options: [
        {
          id: 'opt-l10-s6-1',
          isCorrect: true,
          text: {
            tr: "Medüller interstisyuma NKCC2 ile sodyum ve klor pompalanması hipertonik gradyanı yaratır; bu pompanın durması interstisyel osmolaliteyi izotonik seviyeye (300 mOsm/L) düşürür.",
            ar: "يولد ضخ الصوديوم والكلور عبر NKCC2 إلى خلال النخاع المدروج مفرط التوتر؛ ويؤدي شل هذه المضخة لانهيار تناضح الخلال إلى السواء (300 mOsm/L).",
            en: "NKCC2 sodium and chloride pumping into medullary interstitium generates the hypertonic gradient; abolishing this pump collapses interstitial osmolality to isotonic levels (300 mOsm/L)."
          },
          feedback: {
            tr: "Doğru. Henle çıkan kolu suya geçirimsizdir ancak NaCl'yi medüllaya aktif pompalar. Furosemid bu motoru kapatır; 1200 mOsm/L'lik gradyan 300 mOsm/L'ye (izostenüri) çöker.",
            ar: "صحيح. عروة هنلي الصاعدة كتيمة للماء لكنها تضخ NaCl بنشاط إلى النخاع. يوقف فوروسيميد هذا المحرك فينهار المدروج إلى 300 mOsm/L.",
            en: "Correct. The TAL pumps NaCl into medullary interstitium without water. Furosemide shuts down this salt engine, collapsing the 1200 mOsm/L gradient to 300 mOsm/L."
          }
        },
        {
          id: 'opt-l10-s6-2',
          isCorrect: false,
          text: {
            tr: "Furosemid toplayıcı kanallardaki akuaporin-2 su kanallarını doğrudan bloke ederek su moleküllerinin membranlardan geçmesini engeller.",
            ar: "يحصر الفوروسيميد قنوات الماء أكوابورين-2 في الأنابيب الجامعة مباشرة، مانعاً جزيئات الماء من عبور الأغشية.",
            en: "Furosemide directly blocks aquaporin-2 water channels in collecting ducts, preventing water molecules from moving across membranes."
          },
          feedback: {
            tr: "Yanlış. Furosemidin akuaporinler üzerinde etkisi yoktur; su emilemez çünkü dışarı çekecek medüller osmotik güç yok edilmiştir.",
            ar: "غير صحيح. ليس للفوروسيميد تأثير على الأكوابورينات؛ بل يعجز الماء عن الخروج لزوال القوة التناضحية الجاذبة في النخاع.",
            en: "Incorrect. Furosemide has no activity on aquaporins; water cannot be reabsorbed because the hypertonic osmotic driving force was erased."
          }
        },
        {
          id: 'opt-l10-s6-3',
          isCorrect: false,
          text: {
            tr: "Furosemid vasa rekta kapillerlerini kasıp tromboze ederek tüm medüller kan akışını kalıcı olarak durdurur.",
            ar: "يقبض الفوروسيميد شعيرات الأوعية المستقيمة ويخثرها، موقفاً تدفق الدم النخاعي تماماً.",
            en: "Furosemide vasoconstricts and thromboses the vasa recta capillaries, stopping all medullary blood flow permanently."
          },
          feedback: {
            tr: "Yanlış. Vasa rekta tamamen açıktır; gradyanın kaybolması damar tıkanıklığından değil, aktif tuz motorunun (NKCC2) kilitlenmesindendir.",
            ar: "غير صحيح. تبقى الأوعية المستقيمة سالكة؛ وينجم زوال المدروج عن شل محرك النقل الفاعل (NKCC2) لا الانسداد الوعائي.",
            en: "Incorrect. The vasa recta remain fully patent. The gradient is lost because the active transport engine (NKCC2) is blocked."
          }
        }
      ]
    }
  },

  // Step 7: Formal Explanation
  {
    id: 'pharm-mod5-les2-step7',
    stage: 'formal_explanation',
    phase: 'explain',
    type: 'explanation',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Biçimsel Açıklama: Diüretik Metabolik Komplikasyonları: Gut ve Alkaloz",
      ar: "شرح رسمي: الاختلاطات الاستقلابية للمدرات: النقرس والقلاء",
      en: "Formal Explanation: Diuretic Metabolic Complications: Gout & Alkalosis"
    },
    prompt: {
      tr: "Kronik kıvrım ve tiyazid diüretikleri neden sıklıkla akut hiperürisemi ve gut ataklarını tetiklerken aynı zamanda hipokalemik metabolik alkaloza yol açar?",
      ar: "لماذا تثير مدرات العروة والثيازيد المزمنة فرط حمض البول وهجمات النقرس، بالتزامن مع إحداث قلاء استقلابي بنقص البوتاسيوم؟",
      en: "Why do chronic loop and thiazide diuretics frequently precipitate acute hyperuricemia and gout flares, while simultaneously causing hypokalemic metabolic alkalosis?"
    },
    hints: [
      {
        tier: 1,
        tr: "Organik asitlerin (diüretikler ve ürik asit) proksimal tübülde nasıl atıldığını düşünün.",
        ar: "فكر في كيفية إفراز الأحماض العضوية (المدرات وحمض البول) في الأنبوب القريب.",
        en: "Consider how organic acids (diuretics and uric acid) are cleared in the proximal tubule."
      },
      {
        tier: 2,
        tr: "Diüretikler OAT1/3 taşıyıcılarında ürik asitle yarışır; hipovolemi ise üratın geri emilimini artırır.",
        ar: "تنافس المدرات حمض البول على نواقل OAT1/3؛ ويزيد نقص الحجم ارتشاف اليورات.",
        en: "Diuretics compete with urate for OAT1/3 transporters, while hypovolemia drives proximal urate reabsorption."
      },
      {
        tier: 3,
        tr: "OAT yarışması ve hacim kaybı ürik asidi kanda yükseltir (gut). Distal sodyum akışı ise toplayıcı kanallarda H+ ve K+ kaybına yol açar (alkaloz).",
        ar: "يرفع تنافس OAT ونقص الحجم حمض البول (نقرس)؛ بينما يحفز تدفق الصوديوم البعيد إطراح H+ و K+ (قلاء استقلابي).",
        en: "OAT competition plus hypovolemia elevates serum uric acid (gout). Meanwhile, distal Na+ delivery drives aldosterone-mediated H+ and K+ wasting (alkalosis)."
      }
    ],
    conceptCheck: {
      question: {
        tr: "Diüretiklerin hiperürisemi (gut) ve hipokalemik metabolik alkaloz yapma mekanizmaları nasıldır?",
        ar: "ما هي آليات إحداث المدرات لفرط حمض البول (النقرس) والقلاء الاستقلابي بنقص البوتاسيوم؟",
        en: "What are the mechanisms underlying diuretic-induced hyperuricemia and hypokalemic metabolic alkalosis?"
      },
      options: [
        {
          id: 'opt-l10-s7-1',
          isCorrect: true,
          text: {
            tr: "Diüretikler proksimal OAT1/3 salgısında ürik asitle yarışır ve hacim kaybı ürat geri emilimini artırır; distal sodyum ise K+ ve H+ atılımını hızlandırır.",
            ar: "تنافس المدرات حمض البول على الإفراز عبر OAT1/3 القريب ويزيد نقص الحجم ارتشافه؛ بينما يسرع تدفق الصوديوم البعيد إطراح K+ و H+.",
            en: "Diuretics compete with uric acid for proximal OAT1/3 secretion and volume depletion enhances proximal urate reabsorption; distal sodium delivery accelerates K+ and H+ secretion."
          },
          feedback: {
            tr: "Doğru. Diüretikler organik asit taşıyıcılarında (OAT) ürik asitle yarışır ve hipovolemi ürik asit emilimini artırır (gut). Distal sodyum yükü ise K+ ve H+ kaybına yol açar (alkaloz).",
            ar: "صحيح. تنافس المدرات حمض البول على نواقل OAT ويزيد نقص الحجم امتصاصه (نقرس). كما يقود تدفق الصوديوم لإطراح البوتاسيوم والبروتون (قلاء).",
            en: "Correct. Diuretics compete with uric acid at proximal OATs; hypovolemia enhances urate reabsorption. Distal Na+ delivery drives K+ and H+ wasting."
          }
        },
        {
          id: 'opt-l10-s7-2',
          isCorrect: false,
          text: {
            tr: "Tiyazid molekülleri hepatik ksantin oksidaz tarafından doğrudan ürik asit kristallerine metabolize edilir.",
            ar: "تستقلب جزيئات الثيازيد مباشرة إلى بلورات حمض البول بواسطة إنزيم أوكسيداز الزانثين الكبدي.",
            en: "Thiazide molecules are metabolized directly into uric acid crystals by hepatic xanthine oxidase."
          },
          feedback: {
            tr: "Yanlış. Diüretikler ürik aside dönüşmez; hiperürisemi proksimal tübüler OAT atılım yarışmasından kaynaklanır.",
            ar: "غير صحيح. لا تتحول المدرات لحمض البول؛ بل ينجم فرط حمض البول عن تنافس الإطراح الأنبوبي عبر نواقل OAT.",
            en: "Incorrect. Diuretics do not turn into uric acid; hyperuricemia is an excretory defect via OAT competition."
          }
        },
        {
          id: 'opt-l10-s7-3',
          isCorrect: false,
          text: {
            tr: "Diüretikler devasa proksimal bikarbonat salınımını uyarır ve bu da paradoksal olarak arter kanını alkalileştirir.",
            ar: "تحفز المدرات إفرازاً كبيباً هائلاً للبيكربونات، مما يقلي دم الشرايين بشكل متناقض.",
            en: "Diuretics stimulate massive proximal bicarbonate secretion, which paradoxically alkalizes systemic arterial blood."
          },
          feedback: {
            tr: "Yanlış. Bikarbonat atılımı metabolik asidoz yapar (asetazolamid gibi). Kıvrım ve tiyazid diüretikleri ise proton kaybı ve hacim daralması ile alkaloz yapar.",
            ar: "غير صحيح. طرح البيكربونات يسبب حماضاً استقلابياً (كـ أسيتازولاميد). تحدث مدرات العروة قلاءً بفقدان البروتونات وانكماش الحجم.",
            en: "Incorrect. Bicarbonate wasting causes metabolic acidosis (e.g., acetazolamide). Loop and thiazide diuretics cause alkalosis via proton loss and contraction."
          }
        }
      ]
    }
  },

  // Step 8: Concept Check
  {
    id: 'pharm-mod5-les2-step8',
    stage: 'concept_check',
    phase: 'practice',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Kavram Kontrolü: Furosemid ve Digoksin Ölümcül Aritmi Tuzağı",
      ar: "تحقق مفاهيمي: فخ اضطراب النظم المميت بين فوروسيميد وديجوكسين",
      en: "Concept Check: The Furosemide-Digoxin Lethal Arrhythmia Trap"
    },
    prompt: {
      tr: "Digoksin kullanan bir kalp yetmezliği hastasına potasyum desteği verilmeden yüksek doz furosemid başlanıyor. Günler içinde ventriküler bigemini ve ölümcül fibrilasyon gelişiyor. Hangi moleküler mekanizma bu aritmiyi tetikledi?",
      ar: "بدأ مريض قصور قلب يعالج بالديجوكسين فوروسيميد عالي الجرعة دون تعويض البوتاسيوم. وخلال أيام حدث توأمية بطينية ورجفان مميت. ما الآلية الجزيئية المحفزة؟",
      en: "A heart failure patient receiving digoxin is started on high-dose furosemide without potassium supplementation. Within days, ventricular bigeminy and fatal fibrillation occur. What molecular mechanism triggered this arrhythmia?"
    },
    hints: [
      {
        tier: 1,
        tr: "Digoksinin hedef enzimine bakın: kardiyak miyosit membranındaki Na+/K+-ATPaz pompası.",
        ar: "انتبه للإنزيم المستهدف بالديجوكسين: مضخة Na+/K+-ATPase في غشاء الخلية القلبية.",
        en: "Look at the target enzyme of digoxin: the cardiac sarcolemmal Na+/K+-ATPase pump."
      },
      {
        tier: 2,
        tr: "Ekstraselüler ortamda digoksin ile hangi fizyolojik katyon aynı bağlanma cebi için yarışır?",
        ar: "أي كاتيون فسيولوجي ينافس الديجوكسين على جيب الارتباط الخارجي للمضخة؟",
        en: "What physiological cation competes with digoxin for the extracellular binding pocket on the pump?"
      },
      {
        tier: 3,
        tr: "Ekstraselüler K+ digoksinle yarışır. Furosemid hipokalemi yaptığında yarışma biter; digoksin aşırı bağlanarak hücre içi kalsiyum patlamasına ve ölümcül aritmiye yol açar.",
        ar: "ينافس البوتاسيوم الديجوكسين. عند حدوث نقص البوتاسيوم بفوروسيميد، يرتبط الديجوكسين دون منازع مسبباً فرط الكالسيوم القاتل واضطراب النظم.",
        en: "Extracellular K+ competes with digoxin for the Na+/K+-ATPase. When furosemide causes hypokalemia, digoxin binds unopposed, triggering toxic calcium overload and arrhythmias."
      }
    ],
    conceptCheck: {
      question: {
        tr: "Furosemid kaynaklı hipokalemi digoksin toksisitesini ve fatal aritmileri moleküler olarak nasıl tetikler?",
        ar: "كيف يحفز نقص البوتاسيوم الناجم عن فوروسيميد سمية الديجوكسين واضطرابات النظم المميتة؟",
        en: "How does furosemide-induced hypokalemia molecularly precipitate digoxin toxicity and fatal arrhythmias?"
      },
      options: [
        {
          id: 'opt-l10-s8-1',
          isCorrect: true,
          text: {
            tr: "Furosemid kaynaklı hipokalemi, kardiyak Na+/K+-ATPazın ekstraselüler bölgesindeki potasyum yarışmasını kaldırır; digoksin bağlanmasını, toksisitesini ve ölümcül ard-depolarizasyonları aşırı artırır.",
            ar: "يزيل نقص البوتاسيوم الناجم عن الفوروسيميد التنافس على الموقع الخارجي لمضخة Na+/K+ القلبية، مضاعفاً ارتباط الديجوكسين وسميته واضطرابات النظم.",
            en: "Furosemide-induced hypokalemia removes potassium competition at the extracellular binding site of cardiac Na+/K+-ATPase, massively potentiating digoxin binding, toxicity, and triggered afterdepolarizations."
          },
          feedback: {
            tr: "Doğru. Potasyum ve digoksin Na+/K+-ATPaz üzerindeki aynı ekstraselüler cep için yarışır. Hipokalemi koruyucu kalkanı kaldırır; terapötik digoksin seviyesi bile ölümcül kalsiyum yüklenmesine yol açar.",
            ar: "صحيح. يتنافس البوتاسيوم والديجوكسين على نفس الجيب الخارجي للمضخة. يزيل نقص البوتاسيوم الحماية، مما يجعل الجرعات العلاجية سامة وقاتلة بتراكم الكالسيوم.",
            en: "Correct. Extracellular potassium and digoxin compete for the same binding site on Na+/K+-ATPase. Hypokalemia removes competition, precipitating toxic calcium overload."
          }
        },
        {
          id: 'opt-l10-s8-2',
          isCorrect: false,
          text: {
            tr: "Furosemid, renal digoksin salgısını durduran, serum digoksin konsantrasyonunu 10 kat artıran güçlü bir P-glikoprotein inhibitörüdür.",
            ar: "الفوروسيميد مثبط قوي لبروتين P السكري يوقف إفراز الديجوكسين الكلوي، مضاعفاً تركيزه 10 أضعاف.",
            en: "Furosemide is a potent P-glycoprotein inhibitor that halts renal digoxin secretion, multiplying serum digoxin concentrations 10-fold."
          },
          feedback: {
            tr: "Yanlış. Furosemid P-glikoproteini inhibe etmez (amiodaron ve kinidin eder). Aritmi kan düzeyinden değil, hipokalemi kaynaklı farmakodinamik duyarlılıktan kaynaklanır.",
            ar: "غير صحيح. لا يثبط فوروسيميد بروتين P السكري (بل يفعل ذلك كينيدين وأميودارون). ينجم التسمم عن حساسية ديناميكية دوائية بنقص البوتاسيوم.",
            en: "Incorrect. Furosemide does not inhibit P-glycoprotein; the arrhythmia is driven by pharmacodynamic hypokalemia, not elevated drug levels."
          }
        },
        {
          id: 'opt-l10-s8-3',
          isCorrect: false,
          text: {
            tr: "Furosemid ventriküler miyositlere girerek hızlı sodyum kanallarını doğrudan açar ve aksiyon potansiyelini uzatır.",
            ar: "يعبر الفوروسيميد للخلايا البطينية فاتحاً قنوات الصوديوم السريعة مباشرة ومطولاً كمون العمل.",
            en: "Furosemide crosses into ventricular myocytes and directly opens fast sodium channels, prolonging action potentials."
          },
          feedback: {
            tr: "Yanlış. Furosemidin kardiyak hızlı sodyum kanalları üzerinde hiçbir doğrudan etkisi yoktur; toksisite tamamen hipokalemi kaynaklıdır.",
            ar: "غير صحيح. ليس للفوروسيميد تأثير مباشر على قنوات الصوديوم القلبية؛ بل السمية ناجمة حصراً عن استنزاف البوتاسيوم الخارجي.",
            en: "Incorrect. Furosemide has no direct action on cardiac sodium channels; toxicity is purely mediated by extracellular potassium depletion."
          }
        }
      ]
    }
  },

  // Step 9: Application
  {
    id: 'pharm-mod5-les2-step9',
    stage: 'application',
    phase: 'practice',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Klinik Vaka: İleri Böbrek Yetmezliğinde Tiyazid Yetersizliği ve Kıvrım Zorunluluğu",
      ar: "حالة سريرية: عجز الثيازيد في القصور الكلوي وإلزامية مدرات العروة",
      en: "Clinical Vignette: Renal Failure: Thiazide Inefficacy vs High-Ceiling Loops"
    },
    prompt: {
      tr: "eGFR'si 22 mL/dak'ya gerileyen diyabetik nefropati hastasında, hidroklorotiyazid maksimum doza çıkılmasına rağmen dirençli sıvı retansiyonu görülür. Tiyazidler neden etkisizdir ve hangi tedavi değişikliği zorunludur?",
      ar: "أصيب مريض اعتلال كلى سكري تراجع GFR لديه لـ 22 مل/د باحتباس سوائل معند رغم رفع هيدروكلوروثيازيد للحد الأقصى. لماذا تفشل الثيازيدات وما التعديل الإلزامي؟",
      en: "A diabetic nephropathy patient whose eGFR declines to 22 mL/min exhibits refractory fluid retention despite increasing hydrochlorothiazide to maximum dose. Why are thiazides ineffective, and what therapeutic adjustment is mandatory?"
    },
    hints: [
      {
        tier: 1,
        tr: "Tiyazid diüretikleri için kritik eGFR eşiğini hatırlayın: 30 mL/dak.",
        ar: "تذكر عتبة GFR الحرجة لفعالية مدرات الثيازيد: 30 مل/دقيقة.",
        en: "Recall the critical eGFR threshold for thiazide diuretics: 30 mL/min."
      },
      {
        tier: 2,
        tr: "Glomerüler filtrasyon ciddi şekilde düştüğünde, distal kıvrımlı tübüle tiyazidlerin etki edebileceği kadar sodyum ulaşabilir mi?",
        ar: "عند هبوط الرشح بشدة، هل يصل صوديوم كافٍ للأنبوب البعيد لتعمل عليه الثيازيدات؟",
        en: "When GFR is severely reduced, does enough sodium reach the distal tubule for thiazides to work?"
      },
      {
        tier: 3,
        tr: "eGFR < 30 mL/dak olduğunda yetersiz sodyum iletimi nedeniyle tiyazidler çalışmaz; tedavi yüksek tavanlı bir kıvrım diüretiğine (furosemid) geçirilmelidir.",
        ar: "حين يقل GFR عن 30 مل/د تفقد الثيازيدات فعاليتها لقلة الصوديوم الواصل؛ ويجب الانتقال لمدرات العروة عالية الفعالية مثل فوروسيميد.",
        en: "Thiazides fail when eGFR < 30 mL/min due to inadequate distal sodium delivery; transitioning to a high-ceiling loop diuretic (furosemide) is mandatory."
      }
    ],
    conceptCheck: {
      question: {
        tr: "eGFR < 30 mL/dak olan hastalarda tiyazidlerin etkisiz kalma nedeni ve klinik çözüm nedir?",
        ar: "ما سبب عجز الثيازيد حين يقل GFR عن 30 مل/د وما هو الحل السريري؟",
        en: "Why do thiazides lose efficacy when eGFR falls below 30 mL/min, and what is the clinical solution?"
      },
      options: [
        {
          id: 'opt-l10-s9-1',
          isCorrect: true,
          text: {
            tr: "eGFR < 30 mL/dak olduğunda yetersiz distal sodyum iletimi nedeniyle tiyazidler etkisini kaybeder; tedavi yüksek tavanlı bir kıvrım diüretiğine (furosemid, torsemid) geçirilmelidir.",
            ar: "تفقد الثيازيدات فعاليتها حين ينخفض GFR دون 30 مل/د لعدم كفاية الصوديوم الواصل للأنابيب البعيدة؛ ويجب الانتقال لمدرات العروة عالية الفعالية (فوروسيميد، تورسيميد).",
            en: "Thiazides lose efficacy when eGFR < 30 mL/min due to inadequate distal sodium delivery; therapy must transition to a high-ceiling loop diuretic (e.g., furosemide, torsemide)."
          },
          feedback: {
            tr: "Doğru. Tiyazidlerin etkili olması için yeterli filtrasyon (eGFR > 30 mL/dak) gerekir. 30'un altında distal sodyum yetersiz kalır ve yüksek tavanlı kıvrım diüretiklerine geçiş zorunludur.",
            ar: "صحيح. تتطلب الثيازيدات رشحاً كافياً (>30 مل/د) للوصول لموقع عملها؛ ودون ذلك يجب التحول فوراً لمدرات العروة عالية الفعالية.",
            en: "Correct. Thiazides require adequate GFR (>30 mL/min) for distal delivery. When eGFR < 30 mL/min, high-ceiling loop diuretics are mandatory."
          }
        },
        {
          id: 'opt-l10-s9-2',
          isCorrect: false,
          text: {
            tr: "Hidroklorotiyazidi, glomerüler filtrasyondan bağımsız etki eden yüksek doz spironolakton monoterapisine geçirin.",
            ar: "استبدل هيدروكلوروثيازيد بجرعة عالية من سبيرونولاكتون كعلاج وحيد يعمل باستقلال عن الرشح الكبيبي.",
            en: "Switch hydrochlorothiazide to high-dose spironolactone monotherapy, which acts independently of glomerular filtration."
          },
          feedback: {
            tr: "Yanlış. eGFR < 30 mL/dak olan hastada spironolakton monoterapisi zayıf bir natriüretiktir ve ölümcül hiperkalemi riski taşır.",
            ar: "غير صحيح. سبيرونولاكتون مدر ضعيف للصوديوم، ويشكل خطراً مميتاً لفرط البوتاسيوم في مرضى قصور الكلى الشديد.",
            en: "Incorrect. Spironolactone monotherapy is a weak natriuretic and poses an extreme risk of fatal hyperkalemia in patients with eGFR < 30 mL/min."
          }
        },
        {
          id: 'opt-l10-s9-3',
          isCorrect: false,
          text: {
            tr: "Hastalıklı böbrek, hidroklorotiyazidi aktif serbest sülfonamid formuna enzimatik olarak hidroksilleyemez.",
            ar: "تعجز الكلى المصابة عن هدرجة هيدروكلوروثيازيد إنزيمياً إلى شكله النشط من السلفوناميد الحر.",
            en: "The diseased kidney fails to enzymatically hydroxylate hydrochlorothiazide into its active free sulfonamide form."
          },
          feedback: {
            tr: "Yanlış. Hidroklorotiyazid ön-ilaç değildir ve böbrekte metabolize edilmez; başarısızlık tamamen hemodinamik yetersizliktendir.",
            ar: "غير صحيح. هيدروكلوروثيازيد دواء نشط بذاته ولا يحتاج استقلاباً كلوياً؛ بل الفشل ناتج عن نقص الحمل الهيدروديناميكي الواصل للأنبوب.",
            en: "Incorrect. Hydrochlorothiazide is active parent drug; failure is purely hemodynamic due to insufficient filtration."
          }
        }
      ]
    }
  },

  // Step 10: Retrieval
  {
    id: 'pharm-mod5-les2-step10',
    stage: 'retrieval',
    phase: 'practice',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Geri Çağırma: Furosemid Ototoksisitesi ve Spironolakton Jinekomastisi",
      ar: "استرجاع: سمية فوروسيميد السمعية وتثدي سبيرونولاكتون",
      en: "Retrieval: Furosemide Ototoxicity vs Spironolactone Gynecomastia"
    },
    prompt: {
      tr: "Furosemid kaynaklı ototoksisite (tinnitus, sensörinöral sağırlık) ve spironolakton kaynaklı ağrılı jinekomastiyi hangi moleküler mekanizmalar açıklar?",
      ar: "ما الآليتان الجزيئيتان المفسرتان للسمية السمعية الناجمة عن فوروسيميد (طنين، صمم عصبي) والتثدي المؤلم الناجم عن سبيرونولاكتون؟",
      en: "Which molecular transport mechanisms account for furosemide-induced ototoxicity (tinnitus, sensorineural deafness) and spironolactone-induced painful gynecomastia?"
    },
    hints: [
      {
        tier: 1,
        tr: "İç kulakta bulunan Na-K-2Cl kotransportörünün böbrek dışı izoformunu (NKCC1) düşünün.",
        ar: "فكر في النمط الإنزيمي لناقل Na-K-2Cl الموجود في الأذن الداخلية (NKCC1).",
        en: "Consider the non-renal isoform of the Na-K-2Cl cotransporter in the inner ear: NKCC1."
      },
      {
        tier: 2,
        tr: "Spironolakton, diğer nükleer steroid hormon reseptörleriyle çapraz reaksiyona giren steroid halkalı bir yapıya sahiptir.",
        ar: "يمتلك سبيرونولاكتون بنية ستيرويدية تتفاعل تصالبياً مع مستقبلات الهرمونات الجنسية الأخرى.",
        en: "Spironolactone possesses a steroid nucleus that cross-reacts with nuclear sex hormone receptors."
      },
      {
        tier: 3,
        tr: "Furosemid iç kulak stria vaskülaristeki NKCC1'i bloke ederek endolenf potansiyelini bozar. Spironolakton ise androjen reseptörlerini bloke ederek jinekomasti yapar (eplerenon selektiftir).",
        ar: "يحصر فوروسيميد NKCC1 في السرة الوعائية للأذن معطلاً كمون اللمف الداخلي؛ ويحصر سبيرونولاكتون مستقبلات الأندروجين مسبباً التثدي (إبليرينون انتقائي).",
        en: "Furosemide blocks NKCC1 in the stria vascularis, impairing endolymph generation. Spironolactone cross-reacts with androgen receptors, causing gynecomastia."
      }
    ],
    conceptCheck: {
      question: {
        tr: "Furosemidin iç kulak ototoksisitesi ve spironolaktonun jinekomasti yapmasının moleküler mekanizmaları nelerdir?",
        ar: "ما الآليتان الجزيئيتان لإحداث فوروسيميد للسمية السمعية وسبيرونولاكتون للتثدي؟",
        en: "What are the molecular mechanisms of furosemide ototoxicity and spironolactone-induced gynecomastia?"
      },
      options: [
        {
          id: 'opt-l10-s10-1',
          isCorrect: true,
          text: {
            tr: "Furosemid iç kulak stria vaskülaristeki NKCC1'i inhibe eder (endolenf potansiyelini bozar); spironolakton ise androjen reseptörlerini non-selektif bloke ederek jinekomasti yapar.",
            ar: "يثبط فوروسيميد NKCC1 في السرة الوعائية للأذن الداخلية (معطلاً كمون اللمف الداخلي)؛ بينما يحصر سبيرونولاكتون مستقبلات الأندروجين مسبباً التثدي.",
            en: "Furosemide inhibits inner ear stria vascularis NKCC1 (disrupting endolymph potential); spironolactone non-selectively antagonizes androgen receptors and inhibits 17beta-hydroxysteroid dehydrogenase (causing gynecomastia)."
          },
          feedback: {
            tr: "Doğru. Furosemid iç kulaktaki NKCC1'i bloke ederek endolenf elektrolit dengesini bozar ve ototoksisite yapar. Spironolakton androjen reseptörlerini antagonize edip jinekomastiye yol açar.",
            ar: "صحيح. يحصر فوروسيميد NKCC1 في الأذن الداخلية معطلاً شوارد اللمف الداخلي والسمع؛ بينما يحصر سبيرونولاكتون مستقبلات الأندروجين مسبباً التثدي.",
            en: "Correct. Furosemide blocks NKCC1 in inner ear stria vascularis, abolishing endocochlear potential. Spironolactone cross-reacts with androgen receptors."
          }
        },
        {
          id: 'opt-l10-s10-2',
          isCorrect: false,
          text: {
            tr: "Furosemid koklear tüy hücrelerini kalsifiye eder; spironolakton aromatazı aktive ederek meme dokusunda östrojen sentezini uyarır.",
            ar: "يكلس فوروسيميد الخلايا الشعرية القوقعية؛ بينما ينشط سبيرونولاكتون اصطناع الإستروجين بتفعيل الأروماتاز.",
            en: "Furosemide calcifies cochlear hair cells; spironolactone stimulates breast tissue estrogen synthesis via aromatase activation."
          },
          feedback: {
            tr: "Yanlış. Furosemid ototoksisitesi kalsifikasyondan değil, stria vaskülaristeki NKCC1 blokajındandır. Spironolakton ise androjen reseptör blokajı yapar.",
            ar: "غير صحيح. السمية السمعية ناتجة عن حصر NKCC1 في السرة الوعائية لا التكلس؛ والتثدي ناجم عن حصر مستقبلات الأندروجين.",
            en: "Incorrect. Ototoxicity stems from NKCC1 inhibition altering endolymph K+; gynecomastia stems from androgen receptor blockade."
          }
        },
        {
          id: 'opt-l10-s10-3',
          isCorrect: false,
          text: {
            tr: "Şiddetli sistemik hiperkalemi işitsel tüy hücrelerini depolarize eder ve hipofizden prolaktin salınımını uyarır.",
            ar: "يؤدي فرط البوتاسيوم الجهازي الشديد لفرط استقطاب الخلايا السمعية وتحفيز إفراز البرولاكتين النخامي.",
            en: "Severe systemic hyperkalemia depolarizes auditory hair cells and stimulates pituitary prolactin release."
          },
          feedback: {
            tr: "Yanlış. Furosemid hiperkalemi değil hipokalemi yapar. Her iki toksisite de elektrolit seviyesinden bağımsız doğrudan moleküler etkilerdir.",
            ar: "غير صحيح. يسبب فوروسيميد نقص البوتاسيوم لا فرطه. كلا الأثرين الجانبيين ناجمان عن أهداف جزيئية مباشرة خارج الكلية.",
            en: "Incorrect. Furosemide causes hypokalemia, not hyperkalemia. Both toxicities are off-target molecular receptor/transporter effects."
          }
        }
      ]
    }
  },

  // Step 11: Connection
  {
    id: 'pharm-mod5-les2-step11',
    stage: 'connection',
    phase: 'integrate',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Bütünsel Bağlantı: Nöronal Klor Taşınması ve Kıvrım Taşıyıcıları",
      ar: "ترابط شمولي: نقل الكلور العصبوني ونواقل العروة",
      en: "Holistic Connection: Neuronal Chloride Transport & Loop Transporters"
    },
    prompt: {
      tr: "Renal NKCC2 taşıyıcısı nöronal NKCC1 ve KCC2 ile homoloji paylaşır. Nöronal klor taşınması GABA-A reseptör kanallarının hiperpolarizan inhibitör gücünü nasıl yönetir?",
      ar: "يتشابه ناقل NKCC2 الكلوي بنيوياً مع NKCC1 و KCC2 العصبونيين. كيف يحكم نقل الكلور العصبوني قوة فرط الاستقطاب التثبيطية لقنوات مستقبلات GABA-A؟",
      en: "The renal NKCC2 transporter shares homology with neuronal NKCC1 and KCC2. How does neuronal chloride transport govern the hyperpolarizing inhibitory power of GABA-A receptor channels?"
    },
    hints: [
      {
        tier: 1,
        tr: "GABA-A reseptörleri ligand kapılı klor iyon kanallarıdır.",
        ar: "مستقبلات GABA-A هي قنوات كلور أيونية مبوبة بالربيطة.",
        en: "GABA-A receptors are ligand-gated chloride ion channels."
      },
      {
        tier: 2,
        tr: "GABA bağlandığında klor içeri mi akar dışarı mı? Bu, KCC2 ve NKCC1'in belirlediği hücre içi klor konsantrasyonuna bağlıdır.",
        ar: "هل يتدفق الكلور للداخل أم الخارج عند ارتباط GABA؟ يعتمد ذلك كلياً على تركيز الكلور الداخلي الذي يحدده KCC2 و NKCC1.",
        en: "Whether chloride flows inward or outward depends on the intracellular chloride gradient set by KCC2 and NKCC1."
      },
      {
        tier: 3,
        tr: "KCC2 kloru olgun nöronların dışına atar; bu düşük iç klor seviyesi GABA-A açıldığında klorun içeri akmasını, membranın hiperpolarize olmasını ve nöbetlerin durmasını sağlar.",
        ar: "يطرد KCC2 الكلور خارج العصبونات البالغة؛ ويضمن انخفاضه الداخلي تدفق الكلور للداخل عند فتح GABA-A، مما يفرط الاستقطاب ويكبح التشنجات.",
        en: "KCC2 pumps chloride out of adult neurons. This low internal chloride ensures that opening GABA-A channels causes chloride influx, hyperpolarizing the membrane."
      }
    ],
    conceptCheck: {
      question: {
        tr: "Nöronal klor kotransportörleri GABA-A sinyallemesinin inhibitör doğasını nasıl belirler?",
        ar: "كيف تحدد نواقل الكلور العصبونية الطبيعة التثبيطية لتأشير مستقبلات GABA-A؟",
        en: "How do neuronal cation-chloride cotransporters establish the inhibitory nature of GABA-A receptor signaling?"
      },
      options: [
        {
          id: 'opt-l10-s11-1',
          isCorrect: true,
          text: {
            tr: "KCC2 olgun nöronlarda kloru dışarı atarak hücre içi [Cl-]'yi düşük tutar; GABA-A açıldığında klor içeri akar, nöronu hiperpolarize eder ve nöbetleri baskılar.",
            ar: "يطرد KCC2 الكلور خارج العصبونات البالغة مبقياً تركيزه منخفضاً؛ وحين يفتح GABA-A يتدفق الكلور للداخل مفرطاً استقطاب الخلية وكابحاً النوبات.",
            en: "KCC2 extrudes intracellular chloride in mature neurons, maintaining a low [Cl-]i; when GABA-A opens, chloride flows inward, hyperpolarizing the neuron and suppressing seizures."
          },
          feedback: {
            tr: "Doğru. KCC2 nöron içi kloru düşük tutarak klorun denge potansiyelini negatifte tutar. Böylece GABA-A açıldığında klor içeri akar ve inhibitör hiperpolarizasyon oluşur.",
            ar: "صحيح. يطرد KCC2 الكلور ليحافظ على تركيز داخلي منخفض؛ مما يجعل فتح قنوات GABA-A يدخل الكلور سالباً مفرطاً للاستقطاب وكابحاً للاستثارة.",
            en: "Correct. Cation-chloride cotransporters dictate the chloride equilibrium potential. KCC2 extrudes Cl- to keep [Cl-]i low, ensuring GABA-A produces inhibitory hyperpolarization."
          }
        },
        {
          id: 'opt-l10-s11-2',
          isCorrect: false,
          text: {
            tr: "NKCC1 ve KCC2 nöronlara sodyum pompalayarak epileptik nöbetler sırasında GABA-A'yı uyarıcı bir sodyum kanalına dönüştürür.",
            ar: "يضخ NKCC1 و KCC2 الصوديوم للعصبونات، محولين GABA-A إلى قناة صوديوم استثارية أثناء النوبات الصرعية.",
            en: "NKCC1 and KCC2 pump sodium into neurons, transforming GABA-A into an excitatory sodium channel during epileptic seizures."
          },
          feedback: {
            tr: "Yanlış. GABA-A katyon değil klor kanalıdır; taşıyıcılar klor gradyanını belirleyerek GABA yanıtının yönünü tayin eder.",
            ar: "غير صحيح. مستقبل GABA-A قناة كلور وليس قناة صوديوم؛ وتحدد النواقل مدروج الكلور لتحديد اتجاه الاستجابة.",
            en: "Incorrect. GABA-A is strictly a chloride channel. Transporters set the chloride gradient, determining whether GABA is inhibitory or depolarizing."
          }
        },
        {
          id: 'opt-l10-s11-3',
          isCorrect: false,
          text: {
            tr: "Furosemid kan-beyin bariyerini serbestçe geçip nöronal KCC2'yi inhibe ederek status epileptikusu saniyeler içinde tamamen iyileştirir.",
            ar: "يعبر فوروسيميد الحاجز الدماغي بحرية ليثبط KCC2 العصبوني، معالجاً الحالة الصرعية تماماً خلال ثوانٍ.",
            en: "Furosemide freely crosses the blood-brain barrier to inhibit neuronal KCC2, completely curing status epilepticus within seconds."
          },
          feedback: {
            tr: "Yanlış. Furosemid yüksek iyonizasyonu ve protein bağlanması nedeniyle kan-beyin bariyerini geçemez; santral NKCC1 blokajı için bumetanid türevleri araştırılmaktadır.",
            ar: "غير صحيح. نفوذية فوروسيميد للدماغ شبه معدومة لتأينه العالي؛ وتدرس مشتقات بوميتانيد تجريبياً للنفاذ للجهاز العصبي.",
            en: "Incorrect. Furosemide has very poor BBB penetration due to its high ionization and protein binding; it cannot be used to treat status epilepticus."
          }
        }
      ]
    }
  },

  // Step 12: Mastery Check
  {
    id: 'pharm-mod5-les2-step12',
    stage: 'mastery_check',
    phase: 'integrate',
    type: 'question',
    widgetType: 'MultipleChoice',
    title: {
      tr: "Ustalık Sınavı: Elektrolit ve Kan Gazı Paneli ile Diüretik Teşhisi",
      ar: "اختبار الإتقان: تشخيص صنف المدر عبر لوحة الغازات والشوارد",
      en: "Mastery Check: Electrolyte & Arterial Blood Gas Panel Diagnosis"
    },
    prompt: {
      tr: "Laboratuvar sonuçları: Arter pH 7.52, serum HCO3- 34 mEq/L (metabolik alkaloz), potasyum 2.8 mEq/L, sodyum 132 mEq/L ve belirgin hiperkalsiüri (idrar Ca2+ > 350 mg/24 saat). Sorumlu diüretik sınıfını teşhis edin.",
      ar: "أظهرت التحاليل: باهاء شرياني 7.52، بيكربونات 34 mEq/L (قلاء استقلابي)، بوتاسيوم 2.8 mEq/L، صوديوم 132 mEq/L، وفرط كلس بول مميز (>350 ملغ/24س). حدد صنف المدر.",
      en: "Diagnostic labs reveal: Arterial pH 7.52, serum HCO3- 34 mEq/L (metabolic alkalosis), potassium 2.8 mEq/L, sodium 132 mEq/L, and marked hypercalciuria (urinary Ca2+ > 350 mg/24h). Diagnose the causative diuretic class."
    },
    hints: [
      {
        tier: 1,
        tr: "İdrardaki kalsiyuma bakın: kalsiyum idrara atılıyor mu (hiperkalsiüri) yoksa kanda mı tutuluyor (hipokalsiüri)?",
        ar: "انظر إلى كالسيوم البول: هل يُطرح الكالسيوم بالبول (فرط كلس البول) أم يُحتبس بالدم (نقص كلس البول)؟",
        en: "Look at urinary calcium: Is calcium being wasted into the urine (hypercalciuria) or retained in the blood (hypocalciuria)?"
      },
      {
        tier: 2,
        tr: "Unutmayın: 'Kıvrım kalsiyumu döker, Tiyazid tutar'. Her ikisi de hipokalemik metabolik alkaloz yapar ancak kalsiyum üzerindeki etkileri zıttır.",
        ar: "تذكر: مدرات العروة تطرح الكالسيوم والثيازيد تحبسه. كلاهما يحدث قلاءً بنقص البوتاسيوم ولكن تأثيرهما على الكالسيوم متعاكس تماماً.",
        en: "Remember: 'Loops Lose calcium, Thiazides Take in calcium.' Both cause hypokalemic alkalosis, but their calcium effects are opposite."
      },
      {
        tier: 3,
        tr: "Hipokalemik metabolik alkaloz ile birlikte yüksek idrar kalsiyumu (>350 mg/gün), TAL lümen-pozitif potansiyelini yıkan Kıvrım Diüretiklerinin (furosemid) patognomonik tablosudur.",
        ar: "القلاء الاستقلابي بنقص البوتاسيوم مع فرط كلس البول (>350 ملغ/يوم) بصمة مشخصة لمدرات العروة (فوروسيميد) لإلغائها الجهد الإيجابي باللمعة.",
        en: "Hypokalemic metabolic alkalosis combined with high urinary calcium (>350 mg/24h) is diagnostic of loop diuretic (furosemide) therapy due to loss of the TAL lumen-positive potential."
      }
    ],
    conceptCheck: {
      question: {
        tr: "Bu kan gazı ve elektrolit tablosu hangi diüretik sınıfının kullanımını kesin olarak kanıtlar?",
        ar: "أي صنف من المدرات تؤكده لوحة غازات الدم والشوارد المذكورة بشكل قاطع؟",
        en: "Which diuretic class is definitively diagnosed by this blood gas and electrolyte panel?"
      },
      options: [
        {
          id: 'opt-l10-s12-1',
          isCorrect: true,
          text: {
            tr: "Kıvrım Diüretiği (Furosemid); NKCC2 blokajı lümen-pozitif transepitelyal potansiyeli yıkarak kalsiyumu idrara döker; artan distal sodyum ise K+ ve H+ atılımını körükler.",
            ar: "مدر عروة (فوروسيميد)؛ حصر NKCC2 يلغي الجهد الإيجابي طارحاً الكالسيوم بالبول، بينما يدفع تدفق الصوديوم البعيد إطراح K+ و H+.",
            en: "Loop Diuretic (e.g., Furosemide); NKCC2 blockade wipes out the lumen-positive transepithelial potential, wasting calcium into urine while distal sodium delivery drives K+ and H+ excretion."
          },
          feedback: {
            tr: "Doğru! Hiperkalsiüri (kalsiyum atılımı) ile birlikte hipokalemik metabolik alkaloz tablosu Kıvrım Diüretiklerinin (furosemid) patognomonik izidir. Tiyazidler ise kalsiyumu kanda tutarak hipokalsiüri yapar.",
            ar: "صحيح! قلاء استقلابي بنقص البوتاسيوم مع فرط كلس البول هو البصمة المميزة لمدرات العروة (فوروسيميد). بينما تحبس الثيازيدات الكالسيوم بالدم مسببة نقص كلس البول.",
            en: "Correct! The triad of hypokalemic metabolic alkalosis with hypercalciuria (calcium wasting) is pathognomonic for Loop Diuretics. Thiazides cause hypocalciuria."
          }
        },
        {
          id: 'opt-l10-s12-2',
          isCorrect: false,
          text: {
            tr: "Tiyazid Diüretiği (Hidroklorotiyazid); çünkü distal kıvrımlı tübüldeki NCC'nin inhibisyonu hipokalemi ile birlikte idrara yoğun kalsiyum dökülmesine yol açar.",
            ar: "مدر ثيازيدي (هيدروكلوروثيازيد)؛ لأن تثبيط NCC في الأنبوب البعيد يطرح الكالسيوم بكثافة في البول مترافقاً بنقص البوتاسيوم.",
            en: "Thiazide Diuretic (Hydrochlorothiazide); because inhibiting distal convoluted tubule NCC causes massive calcium dumping into urine alongside hypokalemia."
          },
          feedback: {
            tr: "Yanlış. Tiyazidler idrar kalsiyumunu azaltır (hipokalsiüri); bu yüzden böbrek taşı tedavisinde kullanılırlar. Belirgin hiperkalsiüri tiyazid olasılığını kesinlikle eler.",
            ar: "غير صحيح. تخفض الثيازيدات كالسيوم البول (نقص كلس البول) ولذا تعالج الحصيات الكلسية؛ ووجود فرط كلس البول ينفي الثيازيد تماماً.",
            en: "Incorrect. Thiazides decrease urinary calcium (hypocalciuria) by enhancing basolateral NCX1 in DCT; marked hypercalciuria definitively rules out thiazides."
          }
        },
        {
          id: 'opt-l10-s12-3',
          isCorrect: false,
          text: {
            tr: "Karbonik Anhidraz İnhibitörü (Asetazolamid); çünkü bikarbonat geri emiliminin bloke edilmesi sistemik arteryel kanı alkalileştirir.",
            ar: "مثبط الأنهيدراز الكربوني (أسيتازولاميد)؛ لأن حصر ارتشاف البيكربونات يقلي دم الشرايين الجهازي.",
            en: "Carbonic Anhydrase Inhibitor (Acetazolamide); because blocking bicarbonate reabsorption alkalizes systemic arterial blood."
          },
          feedback: {
            tr: "Yanlış. Asetazolamid bikarbonatı idrara dökerek metabolik ASİDOZ yapar (arter pH < 7.35, düşük HCO3-), metabolik alkaloz yapmaz.",
            ar: "غير صحيح. يطرح أسيتازولاميد البيكربونات مسبباً حماضاً استقلابياً (pH < 7.35) وليس قلاءً استقلابياً.",
            en: "Incorrect. Acetazolamide wastes bicarbonate, producing metabolic ACIDOSIS (arterial pH < 7.35), not metabolic alkalosis."
          }
        }
      ]
    }
  }
];

// Helper to update lesson file
function updateLesson(filePath, stepDataArray) {
  const lesson = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  stepDataArray.forEach((newStepData, idx) => {
    const step = lesson.steps[idx];

    // Ensure stage and type are compliant
    const validStages = [
      'hook', 'question', 'intuition', 'visual_explanation',
      'interactive_artifact', 'guided_discovery', 'formal_explanation',
      'concept_check', 'application', 'retrieval', 'connection', 'mastery_check'
    ];
    step.stage = validStages[idx];
    step.stageIndex = idx + 1;

    if (idx === 4) {
      // Step 5: Preserve interactive widget config and types!
      // Add hints if missing
      if (lesson.id === 'pharm-mod5-les1') {
        step.hints = [
          {
            tier: 1,
            tr: "Kompetitif antagonistler EC50'yi artırır ancak maksimum tavan yanıtı (Emax) düşürmez.",
            ar: "تزيد المضادات التنافسية قيمة EC50 دون خفض الاستجابة القصوى (Emax).",
            en: "Competitive antagonists increase EC50 without decreasing the maximal ceiling response (Emax)."
          },
          {
            tier: 2,
            tr: "Reseptörden çok yavaş ayrılan aşılamaz antagonistler erişilebilir reseptör havuzunu tüketerek Emax'ı baskılar.",
            ar: "تستنفد المضادات غير القابلة للتجاوز حوض المستقبلات المتاحة فتخفض Emax.",
            en: "Insurmountable (slowly dissociating) antagonists reduce the pool of accessible receptors, depressing Emax."
          },
          {
            tier: 3,
            tr: "Losartan kompetitif olarak Ang II eğrisini sağa kaydırırken (EC50 artar), kandesartan reseptörden çok yavaş ayrılarak Emax'ı baskılar.",
            ar: "يزيح لوسارتان منحنى Ang II يميناً تنافسياً (زيادة EC50)، بينما ينفصل كانيديسارتان ببطء شديد كابحاً Emax.",
            en: "Losartan competitively shifts the Ang II curve rightward (higher EC50), whereas candesartan dissociates extremely slowly to suppress Emax."
          }
        ];
      } else {
        step.hints = [
          {
            tier: 1,
            tr: "Furosemidin NKCC2'yi inhibe edebilmesi için tübüler lümene salgılanması şarttır.",
            ar: "يجب أن يصل فوروسيميد للمعة الأنبوبية ليثبط NKCC2 عبر إفرازه بنواقل OAT.",
            en: "Furosemide must reach the luminal fluid to inhibit NKCC2; it is actively secreted by proximal OATs."
          },
          {
            tier: 2,
            tr: "Tübüler idrar pH'sında (5.5 - 7.4), zayıf asit furosemid (pKa 3.9) %99'un üzerinde iyonize kalır.",
            ar: "في باهاء البول (5.5 - 7.4)، يتأين حمض فوروسيميد الضعيف (pKa 3.9) بنسبة تتجاوز 99%.",
            en: "At tubular urine pH (5.5 to 7.4), weak acid furosemide (pKa 3.9) is >99% ionized into an impermeant conjugate base."
          },
          {
            tier: 3,
            tr: "İdrarda iyon tuzağına düşmesi furosemidin geri difüzyonunu önler ve lümendeki NKCC2 kotransportörüne ulaşmasını güvenceye alır.",
            ar: "يمنع احتباس التأين في البول ارتشاف فوروسيميد بالانتشار، ضامناً وصوله لنواقل NKCC2 باللمعة.",
            en: "Ion trapping in tubular fluid prevents furosemide from re-diffusing, ensuring delivery downstream to luminal NKCC2."
          }
        ];
      }
      return;
    }

    step.type = 'question';
    step.widgetType = 'MultipleChoice';
    step.title = newStepData.title;
    step.prompt = newStepData.prompt;
    step.hints = newStepData.hints;
    step.conceptCheck = newStepData.conceptCheck;
    if (!step.config) step.config = {};
    step.config.options = JSON.parse(JSON.stringify(newStepData.conceptCheck.options));
    step.config.prompt = newStepData.prompt;
    step.config.title = newStepData.title;
  });

  fs.writeFileSync(filePath, JSON.stringify(lesson, null, 2), 'utf8');
  console.log('Successfully updated lesson at:', filePath);
}

// Execute updates
const worktreeL9 = 'courses/pharmacology/lessons/lesson-09.json';
const worktreeL10 = 'courses/pharmacology/lessons/lesson-10.json';
updateLesson(worktreeL9, lesson09Steps);
updateLesson(worktreeL10, lesson10Steps);

// Synchronize to main repo
const mainRepoL9 = 'C:/Users/hp/Documents/antigravity/valiant-raman/courses/pharmacology/lessons/lesson-09.json';
const mainRepoL10 = 'C:/Users/hp/Documents/antigravity/valiant-raman/courses/pharmacology/lessons/lesson-10.json';
if (fs.existsSync(path.dirname(mainRepoL9))) {
  updateLesson(mainRepoL9, lesson09Steps);
  updateLesson(mainRepoL10, lesson10Steps);
  console.log('Synchronized to main repository successfully!');
}
