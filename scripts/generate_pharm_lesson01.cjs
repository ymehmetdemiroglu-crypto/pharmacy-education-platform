const fs = require('fs');
const path = require('path');

const targetPathWorktree = 'courses/pharmacology/lessons/lesson-01.json';
const targetPathRoot = 'c:/Users/hp/Documents/antigravity/valiant-raman/courses/pharmacology/lessons/lesson-01.json';

const lesson01 = {
  "$schema": "../../../packages/platform/schema/lesson.schema.json",
  "id": "pharm-mod1-les1",
  "courseId": "pharmacology",
  "moduleId": "ph-mod-01",
  "title": {
    "tr": "Makromoleküler İlaç Hedefleri ve Kimyasal Bağlar",
    "ar": "أهداف الأدوية الجزيئية وطاقات الروابط الكيميائية",
    "en": "Macromolecular Drug Targets & Chemical Bond Energetics"
  },
  "order": 1,
  "access": "free",
  "objective": {
    "tr": "İlaç-reseptör etkileşimlerini kimyasal bağ türlerine göre sınıflandırmak, bağ enerjilerini termodinamik açıdan hesaplamak ve etkinin tersinirliğini öngörmek.",
    "ar": "تصنيف تفاعلات الدواء والمستقبل وفق نوع الرابطة الكيميائية، وحساب طاقات الارتباط ديناميكياً حرارياً، والتنبؤ بعكوسية التأثير واستمراريته.",
    "en": "Classify drug-receptor interactions by chemical bond types, calculate binding stability from thermodynamic energies, and predict reversibility."
  },
  "misconceptions": [
    {
      "tr": "Kovalent bağların vücut sıcaklığında (37°C) kendiliğinden koparak geri dönüşümlü etki gösterebileceği yanılgısı.",
      "ar": "الاعتقاد الخاطئ بأن الروابط التساهمية تتفكك تلقائياً بحرارة الجسم (37 مئوية) لتمنح تأثيراً عكوساً.",
      "en": "The misconception that covalent bonds break spontaneously at physiological temperature (37°C) allowing reversible action."
    },
    {
      "tr": "Hidrofobik etkileşimin apolar atomlar arasındaki doğrudan bir manyetik çekim kuvveti olduğu yanılgısı (aslında su klatrat kafesinin yıkılmasıyla oluşan entropik itici güçtür).",
      "ar": "الظن الخاطئ بأن التأثر الكاره للماء هو تجاذب مغناطيسي مباشر بين الذرات اللابولارية (بل هو قوة دافعة إنتروبية ناشئة عن تحطم قفص الكلاثرات المائي).",
      "en": "The assumption that hydrophobic interaction is a direct magnetic-like attraction between nonpolar atoms (actually an entropic driving force from water cage collapse)."
    },
    {
      "tr": "EDTA şelatörünün kanda sadece yabancı ağır metalleri bağlayıp kalsiyuma dokunmayacağı yanılgısı (serbest EDTA fatal hipokalsemik tetani yapar).",
      "ar": "الاعتقاد الخاطئ بأن EDTA يخلب المعادن الثقيلة السامة فقط دون المساس بالكالسيوم (الحمض الحر يسبب كزاز نقص الكالسيوم القاتل).",
      "en": "The misconception that EDTA selectively binds foreign heavy metals without chelating endogenous calcium."
    }
  ],
  "sources": [
    { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 5 },
    { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 7 },
    { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 9 },
    { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 10 },
    { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 11 },
    { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 12 },
    { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 14 },
    { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 15 },
    { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 24 },
    { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 25 },
    { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 32 },
    { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 33 }
  ],
  "citations": [
    {
      "id": "cit-ref-01",
      "book": "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
      "edition": "14th ed.",
      "topic": "Drug-Receptor Interactions and Chemical Bonding",
      "chapter": "Chapter 3",
      "page": "45-68",
      "status": "verified"
    },
    {
      "id": "cit-ref-02",
      "book": "Katzung's Basic & Clinical Pharmacology",
      "edition": "15th ed.",
      "topic": "Receptors and Pharmacodynamics",
      "chapter": "Chapter 2",
      "page": "20-38",
      "status": "verified"
    }
  ],
  "spacedReviewCards": [
    {
      "cardId": "pharm-mod1-les1-card1",
      "courseId": "pharmacology",
      "drugOrConcept": "Kimyasal Bağ Enerjisi Sıralaması",
      "prompt": "İlaç-reseptör etkileşiminde kimyasal bağ enerjilerini en güçlüden en zayıfa doğru sıralayınız.",
      "answer": "Kovalan (50-150 kcal/mol) > İyonik (5-10) > Hidrojen (2-7) > İyon-Dipol (1-5) > Hidrofobik (0.5-2) > Van der Waals (0.5-1).",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "pharm-mod1-les1-card2",
      "courseId": "pharmacology",
      "drugOrConcept": "Kovalent İlaç Etki Mekanizmaları",
      "prompt": "Penisilin, organofosfat (sarin) ve azotlu hardalların hedef makromoleküle kovalent bağlanma türleri nelerdir?",
      "answer": "Penisilin transpeptidaz serinini açiller; organofosfat AChE serinini fosforiller; azotlu hardal DNA guanin N7 atomunu alkiller.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "pharm-mod1-les1-card3",
      "courseId": "pharmacology",
      "drugOrConcept": "Hidrofobik Etkileşimin Termodinamik Gücü",
      "prompt": "Hidrofobik etkileşimi spontan ve kuvvetli kılan termodinamik itici güç nedir?",
      "answer": "Entropik itici güçtür (Delta S > 0); apolar gruplar bir araya geldiğinde su moleküllerinin klatrat kafesi yıkılarak serbest kalır.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "pharm-mod1-les1-card4",
      "courseId": "pharmacology",
      "drugOrConcept": "EDTA vs BAL Şelasyon Ayrımı",
      "prompt": "EDTA ile BAL (Dimerkaprol) şelatörlerinin dişlilik ve klinik antidot kullanım farkı nedir?",
      "answer": "EDTA 6-dişli (heksadentat) yapısıyla Pb2+ ve Ca2+ bağlar; BAL 2-dişli ditiyol yapısıyla As, Hg ve Au bağlayarak idrarla atar.",
      "box": 1,
      "intervalDays": 1
    }
  ],
  "steps": [
    // Step 1: Hook (predict_reveal, predictThenReveal: true)
    {
      "id": "pharm-mod1-les1-step-01",
      "stage": "hook",
      "stageIndex": 1,
      "type": "predict_reveal",
      "predictThenReveal": true,
      "title": {
        "tr": "Sarin Felci Paradoksu: Neden Günlerce Sürer?",
        "ar": "مفارقة شلل غاز السارين: لماذا يستمر لأيام؟",
        "en": "The Sarin Paralysis Paradox: Why Does It Persist for Days?"
      },
      "prompt": {
        "tr": "Sarin gazı soluyan kurbanda felç zehir kandan temizlense bile günlerce sürerken, asetilkolin milisaniyede biter. İlacı reseptörde günlerce kilitli tutan kimyasal sır nedir?",
        "ar": "يستمر شلل غاز السارين لأيام حتى بعد تنظيفه من الدم، بينما ينتهي الأستيل كولين في ميلي ثانية. ما هو السر الكيميائي وراء إقفال الدواء على مستقبله لأيام؟",
        "en": "Sarin paralysis persists for days after blood clearance, while acetylcholine clears in milliseconds. What chemical secret locks a drug onto its target for days?"
      },
      "config": {
        "revealedOutcome": {
          "tr": "Sarin AChE aktif bölgesindeki Serin hidroksiline kovalent fosforilasyonla (50-150 kcal/mol) bağlanır. 37°C vücut sıcaklığında bu kovalent bağ kendiliğinden kopamaz; klinik etkinin sonlanması ancak vücudun sıfırdan yeni AChE enzimi sentezlemesiyle mümkündür!",
          "ar": "يرتبط السارين تساهمياً بفوسفورية هيدروكسيل السيرين (50-150 كيلو كالوري/مول) في جيب AChE. لا يمكن تفكيك هذا الرابط بحرارة الجسم 37 مئوية؛ يتطلب الشفاء تصنيع إنزيم جديد بالكامل!",
          "en": "Sarin covalently phosphorylates the active Serine of AChE (50-150 kcal/mol). At 37°C, this bond cannot break spontaneously; clinical recovery strictly requires de novo protein synthesis of new AChE!"
        },
        "explanation": {
          "tr": "Slayt 9 ve 12: Asetilkolin ester bağıyla bağlanıp saniyede 25.000 kez hidroliz edilirken, organofosfat kovalent fosforilasyon oluşturur. 50-150 kcal/mol enerjili kovalent bağlar biyolojik ortamda geri dönüşümsüzdür.",
          "ar": "شريحة 9 و 12: يتحلمه الأستيل كولين 25,000 مرة في الثانية بروابط إسترية عكوسة، بينما يشكل السارين فوسفرة تساهمية بطاقة 50-150 كيلو كالوري/مول غير عكوسة.",
          "en": "Slides 9 & 12: Acetylcholine hydrolyzes 25,000 times/sec, whereas Sarin forms a covalent phospho-serine adduct (50-150 kcal/mol) that is biologically irreversible."
        }
      },
      "conceptCheck": {
        "options": [
          {
            "id": "opt-1a",
            "text": {
              "tr": "Sarin aktif bölgedeki Serin amino asidini kovalent fosforiller (50-150 kcal/mol); bağ spontan kopamaz ve etki yeni enzim sentezini bekler.",
              "ar": "يقوم السارين بفَسفرة تساهمية لسيرين الموقع النشط (50-150 كيلو كالوري/مول)؛ الرابط لا ينفك تلقائياً والشفاء يتطلب تصنيع إنزيم جديد.",
              "en": "Sarin covalently phosphorylates the active-site Serine (50-150 kcal/mol); the bond cannot break spontaneously, requiring new enzyme synthesis."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kusursuz moleküler kavrayış! Slayt 9 ve 12: Kovalent bağlar (50-150 kcal/mol) atomlar arasında elektron ortaklaşmasıyla kurulur. Biyolojik vücut sıcaklığında (37°C) kendiliğinden kopması imkansızdır. Etkinin sonlanması için hücrenin yeni AChE enzimi sentezlemesi şarttır.",
              "ar": "فهم جزيئي دقيق! شريحة 9 و 12: الروابط التساهمية تنشأ بمشاركة الإلكترونات بطاقة هائلة تجعل تفككها مستحيلاً بحرارة 37 مئوية، فيرتهن زوال الأثر بتخليق إنزيم جديد.",
              "en": "Superb molecular deduction! Slides 9 & 12: Covalent bonds (50-150 kcal/mol) share electron pairs. At 37°C thermal energy cannot cleave them; recovery strictly requires de novo protein synthesis."
            }
          },
          {
            "id": "opt-1b",
            "text": {
              "tr": "Sarin kanda hiç serbest kalmayıp akciğer alveollerine geri emilerek sürekli sinirleri kimyasal olarak uyarır.",
              "ar": "لا يتحرر السارين في الدم بل يعاد امتصاصه إلى الحويصلات الهوائية ليواصل تحفيز الأعصاب كيميائياً.",
              "en": "Sarin never circulates freely, recycling continuously into lung alveoli to stimulate nerves."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Alveoler geri emilim yanılgısı: Sarin dokulara hızla dağılır ve kandaki serbest seviyesi saatler içinde düşer; uzamış felcin nedeni ilacın kanda kalması değil, enzime kovalent kenetlenmesidir.",
              "ar": "مغالطة إعادة الامتصاص السنخي: يتوزع السارين بسرعة وينخفض تركيزه البلازمي خلال ساعات؛ سبب الشلل الممتد هو الرابط التساهمي الثابت مع الإنزيم.",
              "en": "Alveolar recycling fallacy: Sarin distributes rapidly and clears from blood within hours; persistent toxicity is driven entirely by irreversible target covalent adducts."
            }
          },
          {
            "id": "opt-1c",
            "text": {
              "tr": "Sarin molekülleri asetilkolin gibi parçalanır fakat parçalanan fosfat tuzları kas hücrelerini mekanik olarak tıkar.",
              "ar": "يتفكك السارين كالأستيل كولين ولكن أملاح الفوسفات الناتجة تسد ألياف العضلات ميكانيكياً.",
              "en": "Sarin hydrolyzes normally, but precipitate phosphate crystals mechanically block neuromuscular fibers."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Mekanik tıkaç yanılgısı: Sarin hidroliz edilerek zararsız tuzlara dönüşemez; AChE enziminin katalitik merkezini kovalent fosforilasyonla dondurarak asetilkolin birikimine yol açar.",
              "ar": "مغالطة الانسداد الميكانيكي: لا يتحلمه السارين إلى أملاح بريئة، بل يجمد المركز التحفيزي لإنزيم AChE بالفَسفرة التساهمية الدائمة.",
              "en": "Mechanical plug fallacy: Sarin does not hydrolyze into benign salts; it covalently freezes the AChE catalytic machinery, producing massive acetylcholine accumulation."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "kovalan bağ", "arContext": "الرابطة التساهمية" },
        { "term": "asetilkolinesteraz", "arContext": "إنزيم أستيل كولين إستراز (AChE)" }
      ],
      "hints": [
        {
          "tr": "Asetilkolin ile sarinin enzim üzerindeki bağlanma doğasını karşılaştırın: Reversibilite kuralı.",
          "ar": "قارن بين طبيعة ارتباط الأستيل كولين العكوس وارتباط السارين مع الإنزيم.",
          "en": "Compare the reversibility of acetylcholine binding versus organophosphate binding."
        },
        {
          "tr": "Enzimin aktif bölgesindeki serin amino asidinin -OH grubu kovalent olarak fosforillenir.",
          "ar": "تتعرض مجموعة الهيدروكسيل في سيرين الموقع النشط لفَسفرة تساهمية مستقرة.",
          "en": "The active-site serine hydroxyl undergoes covalent phosphorylation with 50-150 kcal/mol energy."
        },
        {
          "tr": "50-150 kcal/mol enerjili kovalent bağlar vücut sıcaklığında kopamaz; yeni enzim sentezi şarttır.",
          "ar": "طاقة الرابطة التساهمية تمنع تفككها بحرارة الجسم؛ والحل الوحيد هو تخليق إنزيم جديد.",
          "en": "Covalent bonds cannot dissociate thermally; reversal strictly requires de novo protein synthesis."
        }
      ]
    },

    // Step 2: Question
    {
      "id": "pharm-mod1-les1-step-02",
      "stage": "question",
      "stageIndex": 2,
      "type": "question",
      "title": {
        "tr": "Termodinamik Bağ Enerjisi ve Tersinirlik Eşiği",
        "ar": "طاقة الرابطة الديناميكية الحرارية وعتبة العكوسية",
        "en": "Thermodynamic Bond Energy & Reversibility Threshold"
      },
      "prompt": {
        "tr": "İlaç-hedef etkileşimlerinde 50-150 kcal/mol gibi devasa bir termodinamik enerjiye sahip olan ve 37°C vücut sıcaklığında kendiliğinden kopması imkansız olan kimyasal bağ türü hangisidir?",
        "ar": "أي نوع من الروابط الكيميائية يمتلك طاقة هائلة تبلغ 50-150 كيلو كالوري/مول، مما يجعل تفككه التلقائي عند درجة حرارة الجسم 37 مئوية مستحيلاً؟",
        "en": "Which chemical bond type possesses an immense thermodynamic energy of 50-150 kcal/mol, making spontaneous thermal dissociation at 37°C completely impossible in biological systems?"
      },
      "conceptCheck": {
        "options": [
          {
            "id": "opt-2a",
            "text": {
              "tr": "Kovalan bağ (50-150 kcal/mol); elektron çiftlerinin ortaklaşa kullanılmasıyla oluşur ve vücut sıcaklığında spontan kopması imkansızdır.",
              "ar": "الرابطة التساهمية (50-150 كيلو كالوري/مول)؛ تنشأ بمشاركة الإلكترونات ومستحيلة التفكك بحرارة الجسم.",
              "en": "Covalent bond (50-150 kcal/mol); formed by electron pair sharing, impossible to dissociate thermally at 37°C."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Doğru! Slayt 7 ve 9: Kovalan bağlar 50-150 kcal/mol serbest enerjiye sahiptir. Bu bariyeri aşmak için gereken aktivasyon enerjisi 37°C'deki ısıl enerjiden (kT) kat kat büyüktür; bu yüzden tersinmez (irreversible) kabul edilirler.",
              "ar": "صحيح! شريحة 7 و 9: الروابط التساهمية تمتلك طاقة 50-150 كيلو كالوري/مول؛ وهي أعلى بكثير من الطاقة الحرارية الحيوية فتعد غير عكوسة تماماً.",
              "en": "Correct! Slides 7 & 9: Covalent bonds boast 50-150 kcal/mol. The activation barrier far exceeds thermal energy at 37°C, rendering them biologically irreversible."
            }
          },
          {
            "id": "opt-2b",
            "text": {
              "tr": "İyonik bağ (5-10 kcal/mol); zıt yükler arasındaki elektrostatik çekim biyolojik sıvılarda kalıcıdır ve asla kopmaz.",
              "ar": "الرابطة الأيونية (5-10 كيلو كالوري/مول)؛ التجاذب بين الشحنات المتعاكسة في السوائل الحيوية دائم ولا ينفك أبداً.",
              "en": "Ionic bond (5-10 kcal/mol); electrostatic attraction between opposite charges in biofluids is permanent and unbreakable."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "İyonik kalıcılık yanılgısı: Slayt 14: İyonik bağlar 5-10 kcal/mol gibi orta düzey enerji taşır ve suyun dielektrik sabiti (epsilon = 80) nedeniyle sulu ortamda dinamik olarak hızla ayrışıp tersinir dengeye girer.",
              "ar": "مغالطة ثبات الرابط الأيوني: شريحة 14: طاقة الرابط الأيوني 5-10 كيلو كالوري/مول؛ وثابت عزل الماء العالي (80) يتيح تفككه السريع بحركية عكوسة.",
              "en": "Ionic permanence fallacy: Slide 14: Ionic bonds possess 5-10 kcal/mol; high solvent dielectric constant (epsilon = 80) allows rapid, reversible thermal dissociation."
            }
          },
          {
            "id": "opt-2c",
            "text": {
              "tr": "Hidrojen bağı (2-7 kcal/mol); su moleküllerinin sağladığı kalkan nedeniyle vücutta en zor kopan kovalent olmayan bağdır.",
              "ar": "الرابطة الهيدروجينية (2-7 كيلو كالوري/مول)؛ تشكل درعاً مائياً يجعلها أصعب الروابط غير التساهمية تفككاً بالجسم.",
              "en": "Hydrogen bond (2-7 kcal/mol); protected by water shielding, making it thermally unbreakable in tissues."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Hidrojen bağı yanılgısı: Slayt 15: Hidrojen bağları 2-7 kcal/mol enerjiye sahiptir. Bu enerji vücut sıcaklığındaki termal dalgalanmalarla kolayca kopabilir ve saniyede milyonlarca kez açılıp kapanır.",
              "ar": "مغالطة الرابطة الهيدروجينية: شريحة 15: طاقتها 2-7 كيلو كالوري/مول، وتنفتح وتنغلق ملايين المرات في الثانية بفعل الاضطراب الحراري.",
              "en": "Hydrogen bond fallacy: Slide 15: Hydrogen bonds carry 2-7 kcal/mol; thermal fluctuations rapidly break and reform them millions of times per second."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "bağ enerjisi", "arContext": "طاقة الرابطة الكيميائية" },
        { "term": "tersinirlik", "arContext": "العكوسية الديناميكية" }
      ],
      "hints": [
        {
          "tr": "Atomların elektronlarını ortaklaşa kullandığı en güçlü kimyasal bağı düşünün.",
          "ar": "فكر في الرابطة الأقوى التي تتشارك فيها الذرات أزواج الإلكترونات.",
          "en": "Think of the primary bond where atoms share valence electron pairs."
        },
        {
          "tr": "Slayt 7 tablosuna bakın: 50-150 kcal/mol aralığında sadece tek bir bağ türü vardır.",
          "ar": "انظر جدول شريحة 7: يوجد نوع واحد فقط يقع في نطاق 50-150 كيلو كالوري/مول.",
          "en": "Review Slide 7: Only one bond type occupies the 50-150 kcal/mol range."
        },
        {
          "tr": "Cevap kovalan bağdır; diğer tüm non-kovalent bağlar 0.5-10 kcal/mol aralığındadır.",
          "ar": "الجواب هو الرابطة التساهمية؛ بينما تتراوح باقي الروابط بين 0.5 إلى 10 كيلو كالوري/مول.",
          "en": "The answer is covalent bonding; all non-covalent forces span 0.5 to 10 kcal/mol."
        }
      ]
    },

    // Step 3: Intuition
    {
      "id": "pharm-mod1-les1-step-03",
      "stage": "intuition",
      "stageIndex": 3,
      "type": "intuition",
      "title": {
        "tr": "Zihinsel Model: Kaynak Dikişi vs Cırt-Cırt (Velcro)",
        "ar": "النموذج الذهني: اللحام الدائم في مقابل شريط الفيلكرو",
        "en": "Mental Model: Permanent Weld vs Multi-Hook Velcro"
      },
      "prompt": {
        "tr": "Kaynak dikişi ile cırt-cırt (Velcro) kumaşı hayal edin. Tek bir kaynak dikişi yapıyı kalıcı kilitlerken, binlerce küçük cırt-cırt lifi bir arada ne tür bir bağlanma davranışı sergiler?",
        "ar": "تخيل لحاماً حديدياً في مقابل شريط الفيلكرو. بينما يثبت اللحام الهيكل بشكل دائم، ما هو السلوك الذي تظهره آلاف ألياف الفيلكرو الدقيقة مجتمعة عند الارتباط؟",
        "en": "Imagine a permanent weld versus a Velcro strip. While a single weld locks a joint permanently, what binding behavior emerges when dozens of microscopic Velcro hooks engage simultaneously?"
      },
      "conceptCheck": {
        "options": [
          {
            "id": "opt-3a",
            "text": {
              "tr": "Tek tek lifler zayıftır fakat yüzlercesi birleşince sımsıkı tutar; istendiğinde çekilerek hiçbir yapı bozulmadan tersinir şekilde ayrılabilir.",
              "ar": "الألياف الفردية ضعيفة لكن تجمع المئات منها يمنح ثباتاً قوياً، ويمكن فصلها بعكوسية تامة دون إتلاف النسيج.",
              "en": "Individual hooks are weak, but dozens combined grip firmly; pulling separates them reversibly without structural damage."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Harika bir analoji! Slayt 8: İlaç molekülü reseptörle aynı anda 10-15 non-kovalent bağ kurduğunda toplam bağlanma serbest enerjisi Delta G = -10 ila -15 kcal/mol seviyesine çıkar. Bu güç mikromolar/nanomolar afinite sağlar; ancak kovalent kaynak gibi reseptörü tahrip etmez, ayrışma hız sabiti (koff) ile tersinir kalır.",
              "ar": "تشبيه عبقري! شريحة 8: تشكيل 10-15 رابط غير تساهمي يمنح طاقة إجمالية -10 إلى -15 كيلو كالوري/مول، مما يحقق ألفة عالية وعكوسية تامة دون تخريب المستقبل.",
              "en": "Superb analogy! Slide 8: 10-15 simultaneous non-covalent bonds sum to Delta G = -10 to -15 kcal/mol, providing high affinity and selectivity with complete reversibility."
            }
          },
          {
            "id": "opt-3b",
            "text": {
              "tr": "Cırt-cırt lifleri kovalent bağdan daha güçlüdür; bu yüzden tersinir ilaçlar kovalent ilaçlardan daha uzun süre etki eder.",
              "ar": "ألياف الفيلكرو أقوى من اللحام؛ لذلك تدوم الأدوية العكوسة لفترة أطول من الأدوية التساهمية.",
              "en": "Velcro fibers are mechanically stronger than welds; hence reversible drugs act longer than covalent ones."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Afinite-kuvvet yanılgısı: Kovalent bağ (50-150 kcal/mol) non-kovalent bağlardan en az 10-20 kat daha güçlüdür; tersinir ilaçlar asla kovalent ilaçlardan daha kalıcı olamaz.",
              "ar": "مغالطة قوة الألفة: الروابط التساهمية أقوى بـ 10-20 ضعفاً من الروابط غير التساهمية، ولا يمكن للأدوية العكوسة أن تفوقها في بقاء الارتباط.",
              "en": "Affinity-strength confusion: Covalent bonds are 10-20 times stronger than individual non-covalent interactions; reversible drugs cannot exceed covalent persistence."
            }
          },
          {
            "id": "opt-3c",
            "text": {
              "tr": "İlaçlar reseptöre bağlandığında tüm kimyasal bağlarını kaybeder ve sadece yerçekimi kuvvetiyle tutunurlar.",
              "ar": "تفقد الأدوية كافة روابطها عند ملامسة المستقبل وتثبت فيه فقط بتأثير قوة الجاذبية الأرضية.",
              "en": "Drugs lose all chemical bonds upon target contact, retained solely by biological gravity."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Yerçekimi yanılgısı: Moleküler boyutta yerçekimi ihmal edilecek kadar sıfırdır; bağlanmayı yalnızca elektrostatik, dipol, H-bağı ve dispersiyon kuvvetleri yönetir.",
              "ar": "مغالطة الجاذبية: قوة الجاذبية مهملة تماماً على المستوى الجزيئي؛ الارتباط تحكمه حصراً قوى كولوم وفان دير فالس والروابط الهيدروجينية.",
              "en": "Gravity fallacy: Gravitational forces are negligible at the nanoscale; binding is governed entirely by electrostatic, dipolar, and dispersion forces."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "aditif serbest enerji", "arContext": "الطاقة الحرة التراكمية" },
        { "term": "koff ayrışma hızı", "arContext": "معدل التفكك الحركي (koff)" }
      ],
      "hints": [
        {
          "tr": "Velcro kumaşındaki her bir minik plastik kanca tek başına ne kadar ağırlık taşır?",
          "ar": "كم من الوزن يستطيع خيط بلاستيكي فردي في شريط الفيلكرو أن يحمل بمفرده؟",
          "en": "How much weight can a single microscopic plastic hook support on its own?"
        },
        {
          "tr": "Bireysel olarak zayıf bağların toplanarak yüksek tutunma sağlamasını düşünün.",
          "ar": "فكر في اجتماع الروابط الضعيفة فردياً لتوليد قوة تماسك عالية إجمالاً.",
          "en": "Consider how individually weak forces sum up to generate strong collective adhesion."
        },
        {
          "tr": "Cırt-cırt modeli çoklu zayıf bağların hem yüksek afinite hem tersinirlik sağlamasını temsil eder.",
          "ar": "يمثل الفيلكرو كيف يمنح تضافر الروابط الضعيفة ألفة عالية مع بقاء الارتباط عكوساً.",
          "en": "Velcro exemplifies multi-point binding: high collective affinity paired with effortless reversibility."
        }
      ]
    },

    // Step 4: Visual Explanation
    {
      "id": "pharm-mod1-les1-step-04",
      "stage": "visual_explanation",
      "stageIndex": 4,
      "type": "visual_explanation",
      "title": {
        "tr": "4 Reseptör Süperailesi ve Yanıt Hızları",
        "ar": "عائلات المستقبِلات الأربع وسرعات الاستجابة",
        "en": "The 4 Receptor Superfamilies & Response Velocities"
      },
      "prompt": {
        "tr": "Hücredeki 4 reseptör süperailesi farklı yanıtlama hızlarına sahiptir. Milisaniyeler içinde en hızlı yanıt veren süperailenin etki mekanizması nedir?",
        "ar": "تمتلك عائلات المستقبِلات الأربع سرعات استجابة متباينة للغاية. ما هي آلية عمل العائلة الأسرع التي تستجيب في غضون أجزاء من الثانية؟",
        "en": "The four receptor superfamilies exhibit vastly different response velocities. What effector mechanism allows the fastest family to trigger cellular depolarization in milliseconds?"
      },
      "conceptCheck": {
        "options": [
          {
            "id": "opt-4a",
            "text": {
              "tr": "İyonotropik reseptörler (ligand kapılı kanallar); agonist bağlanınca doğrudan iyon kanalını açarak milisaniyede (ms) membran potansiyelini değiştirir.",
              "ar": "المستقبلات الأيونية (قنوات مبوبة بربيطة)؛ يفتح ارتباط المنبه القناة الأيونية مباشرة ليغير جهد الغشاء خلال ميلي ثانية.",
              "en": "Ionotropic receptors (ligand-gated channels); agonist binding directly gates the channel pore to alter potential within milliseconds."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Mükemmel! Slayt 5 karşılaştırma tablosu: 1) İyonotropik (Nikotinik ACh, GABAA): milisaniyeler (aracı kaskad yok, doğrudan gözenek açılır), 2) GPCR (Muskarinik, Adrenerjik): saniyeler (ikincil haberciler cAMP/IP3), 3) Kinaz-kenetli (İnsülin): dakikalar/saatler (tirozin otofosforilasyonu), 4) Nükleer (Steroid): saatler/günler (DNA transkripsiyonu).",
              "ar": "ممتاز! شريحة 5: 1) أيونية (nAChR): أجزاء من الثانية، 2) مقترنة ببروتين G: ثوانٍ، 3) مرتبطة بكينيز: دقائق/ساعات، 4) نووية داخلية: ساعات/أيام بتعديل النسخ الجيني.",
              "en": "Outstanding! Slide 5: 1) Ionotropic (nAChR): milliseconds, 2) GPCR (Adrenergic): seconds, 3) Kinase-linked (Insulin): minutes/hours, 4) Nuclear (Steroids): hours/days via gene transcription."
            }
          },
          {
            "id": "opt-4b",
            "text": {
              "tr": "Nükleer reseptörler; hücre çekirdeğinde DNA zincirini doğrudan çekerek milisaniyeler içinde mRNA patlaması yapar.",
              "ar": "المستقبلات النووية؛ تؤثر مباشرة على شريط DNA في النواة لتحدث تدفقاً فورياً للرنا المرسال في ميلي ثانية.",
              "en": "Nuclear receptors; binding inside chromatin triggers instantaneous mRNA transcription bursts within milliseconds."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Nükleer hız yanılgısı: Slayt 5: Nükleer reseptörler en yavaş süperailedir (saatler veya günler sürer); çünkü nükleer translokasyon, kromatin açılması ve de novo protein translasyonu zaman alır.",
              "ar": "مغالطة سرعة المستقبِلات النووية: شريحة 5: المستقبِلات النووية هي الأبطأ إطلاقاً (ساعات لأيام) لأنها تتطلب نسخ وترجمة بروتينات جديدة.",
              "en": "Nuclear speed fallacy: Slide 5: Nuclear receptors are the slowest family (hours to days) because chromatin remodeling and protein synthesis require significant lag time."
            }
          },
          {
            "id": "opt-4c",
            "text": {
              "tr": "Tüm reseptör süperaileleri hücre zarının dış yüzeyindedir ve yanıt süreleri birbirinden farksızdır.",
              "ar": "تتوضع جميع عائلات المستقبِلات على السطح الخارجي للغشاء وتتطابق سرعات استجابتها بالكامل.",
              "en": "All four receptor superfamilies reside strictly on the plasma membrane and share identical activation latencies."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Konum yanılgısı: Slayt 5: Nükleer reseptörler hücre zarında değil sitoplazmada veya nükleustadır; efektör mekanizmalarına göre yanıt hızları 100.000 kat farklılık gösterir.",
              "ar": "مغالطة التوضع: شريحة 5: المستقبِلات النووية داخل السيتوبلازم أو النواة، وتختلف سرعات الاستجابة بما يصل إلى 100,000 ضعف.",
              "en": "Cellular location fallacy: Slide 5: Nuclear receptors reside in the cytosol/nucleus; response times differ across superfamilies by over 5 orders of magnitude."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "iyonotropik reseptör", "arContext": "المستقبل الأيوني (Ionotropic receptor)" },
        { "term": "GPCR süperailesi", "arContext": "المستقبلات المقترنة ببروتين G" }
      ],
      "hints": [
        {
          "tr": "Hücre zarına yerleşik iyon kanallarının doğrudan kapılanmasını hatırlayın.",
          "ar": "تذكر القنوات الأيونية الغشائية التي تفتح بواباتها مباشرة بتأثير الربيطة.",
          "en": "Recall membrane channels whose pore opens directly upon ligand binding."
        },
        {
          "tr": "Araya ikincil haberci (cAMP) veya gen transkripsiyonu girmeyen doğrudan mekanizmayı arayın.",
          "ar": "ابحث عن الآلية المباشرة التي لا تحتاج لوسطاء كـ cAMP أو نسخ جيني.",
          "en": "Look for the direct pore-opening mechanism without intervening secondary messengers."
        },
        {
          "tr": "Cevap İyonotropik reseptörlerdir (Nikotinik asetilkolin, GABA-A); yanıt milisaniyeler sürer.",
          "ar": "الجواب هو المستقبِلات الأيونية مثل مستقبل النيكوتين وغابا-أ بسرعة أجزاء من الثانية.",
          "en": "The answer is Ionotropic receptors (nicotinic AChR, GABA-A) operating in milliseconds."
        }
      ]
    },

    // Step 5: Interactive Artifact (ReceptorLigandMatcher - Dibucaine)
    {
      "id": "pharm-mod1-les1-step-05",
      "stage": "interactive_artifact",
      "stageIndex": 5,
      "type": "receptor_ligand_matcher",
      "widgetType": "ReceptorLigandMatcher",
      "title": {
        "tr": "Etkileşimli Eşleştirme: Dibukain Reseptör Kenetlenmesi",
        "ar": "المطابقة التفاعلية: رسو مخدر الديبوكائين في جيب المستقبل",
        "en": "Interactive Matcher: Dibucaine Receptor Multi-Point Docking"
      },
      "prompt": {
        "tr": "Dibukain lokal anestezik molekülünün 4 farmakofor grubunu voltaj kapılı sodyum kanalı reseptör cebindeki tamamlayıcı amino asitlerle eşleştirin.",
        "ar": "طابق المجموعات الدوائية الأربع لمخدر الديبوكائين الموضعي مع الأحماض الأمينية التكميلية في جيب مستقبل قناة الصوديوم.",
        "en": "Match the four pharmacophoric groups of local anesthetic dibucaine with their complementary amino acid residues inside the sodium channel receptor pocket."
      },
      "config": {
        "title": "Dibukain Çok Noktalı Reseptör Kenetlenmesi",
        "prompt": "Dibukain farmakoforlarını reseptörün tamamlayıcı cepleriyle eşleştirin.",
        "drugName": "Dibukain (Sinkokain)",
        "receptorName": "Voltaj Kapılı Sodyum Kanalı Reseptör Cebi",
        "pairs": [
          {
            "id": "pair_amine",
            "drugGroup": "Protonlanmış Dietilamino Azotu (-NH+(C2H5)2)",
            "correctResidueId": "res_asp113",
            "bondType": "ionic",
            "energyKcalMol": "-5 to -10 kcal/mol",
            "explanation": "Asp113 karboksilat anyonu (-COO-) ile güçlü bir Coulomb iyonik tuz köprüsü kurar."
          },
          {
            "id": "pair_amide",
            "drugGroup": "Amit Karbonil Oksijeni (-CO-NH-)",
            "correctResidueId": "res_ser165",
            "bondType": "h_bond",
            "energyKcalMol": "-2 to -7 kcal/mol",
            "explanation": "Ser165 hidroksil grubu ile doğrusal 180 derecelik yönlü hidrojen bağı kurar."
          },
          {
            "id": "pair_butoxy",
            "drugGroup": "Butoksi Alifatik Zinciri (-O-C4H9)",
            "correctResidueId": "res_leu275",
            "bondType": "van_der_waals",
            "energyKcalMol": "-0.5 to -2 kcal/mol",
            "explanation": "Leu275 apolar yan zincirleriyle hidrofobik temas kurar ve su kafesini yıkar."
          },
          {
            "id": "pair_quinoline",
            "drugGroup": "Kinolin Aromatik Halkası",
            "correctResidueId": "res_phe290",
            "bondType": "pi_pi",
            "energyKcalMol": "-0.5 to -1 kcal/mol",
            "explanation": "Phe290 aromatik benzen halkası ile pi-pi istiflenmesi ve London dispersiyonu oluşturur."
          }
        ],
        "residues": [
          {
            "id": "res_asp113",
            "residueName": "Asp113 (Karboksilat Anyonu)",
            "description": "Negatif yüklü elektrostatik anyonik tuz köprüsü cebi"
          },
          {
            "id": "res_ser165",
            "residueName": "Ser165 (Hidroksil Yan Zinciri)",
            "description": "Polar H-bağı donörü ve akseptörü cebi"
          },
          {
            "id": "res_leu275",
            "residueName": "Leu275 (Apolar Alifatik Kalıntı)",
            "description": "Alifatik hidrofobik cep kalıntısı"
          },
          {
            "id": "res_phe290",
            "residueName": "Phe290 (Aromatik Fenilalanin)",
            "description": "Aromatik pi-pi istiflenme ve dispersiyon cebi"
          },
          {
            "id": "res_glu107",
            "residueName": "Glu107 (Dış Yüzey Kalıntısı)",
            "description": "Bağlanma cebinin dışında kalan çözücüye açık kalıntı"
          }
        ],
        "source": {
          "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf",
          "page": 33
        }
      },
      "widget": {
        "type": "ReceptorLigandMatcher",
        "config": {
          "title": "Dibukain Çok Noktalı Reseptör Kenetlenmesi",
          "prompt": "Dibukain farmakoforlarını reseptörün tamamlayıcı cepleriyle eşleştirin.",
          "drugName": "Dibukain (Sinkokain)",
          "receptorName": "Voltaj Kapılı Sodyum Kanalı Reseptör Cebi",
          "pairs": [
            {
              "id": "pair_amine",
              "drugGroup": "Protonlanmış Dietilamino Azotu (-NH+(C2H5)2)",
              "correctResidueId": "res_asp113",
              "bondType": "ionic",
              "energyKcalMol": "-5 to -10 kcal/mol",
              "explanation": "Asp113 karboksilat anyonu (-COO-) ile güçlü bir Coulomb iyonik tuz köprüsü kurar."
            },
            {
              "id": "pair_amide",
              "drugGroup": "Amit Karbonil Oksijeni (-CO-NH-)",
              "correctResidueId": "res_ser165",
              "bondType": "h_bond",
              "energyKcalMol": "-2 to -7 kcal/mol",
              "explanation": "Ser165 hidroksil grubu ile doğrusal 180 derecelik yönlü hidrojen bağı kurar."
            },
            {
              "id": "pair_butoxy",
              "drugGroup": "Butoksi Alifatik Zinciri (-O-C4H9)",
              "correctResidueId": "res_leu275",
              "bondType": "van_der_waals",
              "energyKcalMol": "-0.5 to -2 kcal/mol",
              "explanation": "Leu275 apolar yan zincirleriyle hidrofobik temas kurar ve su kafesini yıkar."
            },
            {
              "id": "pair_quinoline",
              "drugGroup": "Kinolin Aromatik Halkası",
              "correctResidueId": "res_phe290",
              "bondType": "pi_pi",
              "energyKcalMol": "-0.5 to -1 kcal/mol",
              "explanation": "Phe290 aromatik benzen halkası ile pi-pi istiflenmesi ve London dispersiyonu oluşturur."
            }
          ],
          "residues": [
            {
              "id": "res_asp113",
              "residueName": "Asp113 (Karboksilat Anyonu)",
              "description": "Negatif yüklü elektrostatik anyonik tuz köprüsü cebi"
            },
            {
              "id": "res_ser165",
              "residueName": "Ser165 (Hidroksil Yan Zinciri)",
              "description": "Polar H-bağı donörü ve akseptörü cebi"
            },
            {
              "id": "res_leu275",
              "residueName": "Leu275 (Apolar Alifatik Kalıntı)",
              "description": "Alifatik hidrofobik cep kalıntısı"
            },
            {
              "id": "res_phe290",
              "residueName": "Phe290 (Aromatik Fenilalanin)",
              "description": "Aromatik pi-pi istiflenme ve dispersiyon cebi"
            },
            {
              "id": "res_glu107",
              "residueName": "Glu107 (Dış Yüzey Kalıntısı)",
              "description": "Bağlanma cebinin dışında kalan çözücüye açık kalıntı"
            }
          ],
          "source": {
            "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf",
            "page": 33
          }
        }
      },
      "technicalTerms": [
        { "term": "kenetlenme (docking)", "arContext": "الرسو الجزيئي (Docking)" },
        { "term": "tuz köprüsü", "arContext": "الجسر الملحي الأيوني" }
      ],
      "hints": [
        {
          "tr": "Pozitif yüklü amonyum grubunu negatif yüklü aspartat karboksilatına bağlayın.",
          "ar": "صل مجموعة الأمونيوم موجبة الشحنة بجيب الأسبارتات سالب الشحنة.",
          "en": "Connect the cationic ammonium to the anionic aspartate carboxylate."
        },
        {
          "tr": "Apolar butoksi zincirini apolar lösin cebine, kinolini ise aromatik fenilalanin cebine oturtun.",
          "ar": "ضع سلسلة البوتوكسي اللابولارية في جيب اللوسين، وحلقة الكينولين مع الفينيل ألانين.",
          "en": "Place nonpolar butoxy into leucine and the quinoline ring against phenylalanine."
        },
        {
          "tr": "Amin -> Asp113, Amit -> Ser165, Butoksi -> Leu275, Kinolin -> Phe290 eşleşmesini tamamlayın.",
          "ar": "أكمل المطابقة: أمين مع Asp113، أميد مع Ser165، بوتوكسي مع Leu275، كينولين مع Phe290.",
          "en": "Complete pairs: Amine -> Asp113, Amide -> Ser165, Butoxy -> Leu275, Quinoline -> Phe290."
        }
      ]
    },

    // Step 6: Guided Discovery
    {
      "id": "pharm-mod1-les1-step-06",
      "stage": "guided_discovery",
      "stageIndex": 6,
      "type": "guided_discovery",
      "title": {
        "tr": "Keşif: Çok Noktalı Zayıf Bağların Büyüsü",
        "ar": "الاستكشاف: أسرار الارتباط متعدد النقاط عبر الروابط الضعيفة",
        "en": "Guided Discovery: The Magic of Multi-Point Non-Covalent Binding"
      },
      "prompt": {
        "tr": "Dibukain molekülünde tek bir bağ zayıfken (0.5-10 kcal/mol), 4-5 non-kovalent bağın aynı anda kurulması moleküle nasıl hem yüksek afinite hem de geri dönüşümlülük kazandırır?",
        "ar": "إذا كانت كل رابطة منفردة ضعيفة (0.5-10 كيلو كالوري/مول)، كيف يمنح تشكل 4-5 روابط غير تساهمية معاً الدواء ألفة بيكومولية عالية مع الحفاظ على عكوسيته؟",
        "en": "If individual non-covalent bonds are weak (0.5-10 kcal/mol), how does the simultaneous formation of 4-5 bonds deliver high nanomolar affinity while preserving reversibility?"
      },
      "conceptCheck": {
        "options": [
          {
            "id": "opt-6a",
            "text": {
              "tr": "Aditif serbest enerji: Her bağın serbest enerjisi toplanarak Delta G = -10 ila -15 kcal/mol'e ulaşır; bu toplam afinite sağlar ancak kovalent tahribat yapmaz.",
              "ar": "الطاقة الحرة التراكمية: تجتمع طاقات الروابط لتبلغ Delta G = -10 إلى -15 كيلو كالوري/مول، مما يمنح ألفة عالية دون تخريب تساهمي للمستقبل.",
              "en": "Additive free energy: Summing discrete interactions achieves Delta G = -10 to -15 kcal/mol, providing high target affinity without irreversible damage."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Mükemmel termodinamik çıkarım! Slayt 8 ve 33: Tek bir kovalent bağ ilacı kalıcı kilitler. Ancak 1 iyonik (-8), 1 H-bağı (-4), 1 hidrofobik (-2) ve 1 pi-pi (-1) toplandığında Delta G = -15 kcal/mol olur. İlacın ayrışması için bu 4 bağın aynı anda salise içinde kopması gerekir; bu da ilacı saatlerce reseptörde tutar fakat konsantrasyon düşünce tersinir ayrılmaya izin verir.",
              "ar": "استنتاج ترموديناميكي باهر! شريحة 8 و 33: رابط تساهمي واحد يقفل المستقبل للأبد. بينما اجتماع 4 روابط ضعيفة يحقق Delta G = -15 كيلو كالوري/مول، فيلزم انفصامها معاً للتفكك مما يمنح ألفة عالية وعكوسية تامة.",
              "en": "Brilliant thermodynamic deduction! Slides 8 & 33: A single covalent weld is permanent. Summing 4 non-covalent bonds reaches Delta G = -15 kcal/mol, requiring all 4 to unbind simultaneously, yielding high residence time with complete reversibility."
            }
          },
          {
            "id": "opt-6b",
            "text": {
              "tr": "Zayıf bağlar reseptör proteininin erimesine yol açar ve hücre zarı yırtılarak ilacı dışarı fırlatır.",
              "ar": "تؤدي الروابط الضعيفة إلى انصهار بروتين المستقبل وتمزق الغشاء الخلوي لقذف الدواء خارجاً.",
              "en": "Weak forces trigger thermal melting of the receptor backbone, rupturing the membrane to eject the drug."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Hücre lizisi yanılgısı: Non-kovalent bağlar protein yapısını eritmez veya zarı yırtmaz; sadece esnek konformasyonel değişiklikler ve tersinir sinyal iletimi oluşturur.",
              "ar": "مغالطة التحلل الخلوي: الروابط غير التساهمية لا تذيب البروتين ولا تمزق الغشاء، بل تحدث تغيرات شكلية مرنة لنقل الإشارة الحيوية.",
              "en": "Lysis fallacy: Non-covalent binding does not melt proteins or rupture membranes; it induces subtle conformational shifts and reversible signaling."
            }
          },
          {
            "id": "opt-6c",
            "text": {
              "tr": "İlaç reseptöre yaklaştığında tüm bağ enerjilerini nükleer füzyonla kovalent bağa dönüştürür.",
              "ar": "يقوم الدواء عند اقترابه من المستقبل بتحويل طاقات كافة الروابط باندماج نووي إلى رابط تساهمي.",
              "en": "Upon docking, the ligand fuses all non-covalent bond energies via nuclear fusion into a single covalent bond."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Füzyon yanılgısı: Biyolojik moleküller nükleer reaksiyon yapamaz; non-kovalent bağlar bağımsız elektrostatik ve kuantum dispersiyon kuvvetleri olarak kalır.",
              "ar": "مغالطة الاندماج: لا توجد تفاعلات نووية في الجزيئات الحيوية؛ تبقى الروابط قوى كهروسكونية وتشتتية مستقلة قابلة للتفكك.",
              "en": "Fusion fallacy: Biological macromolecules cannot undergo nuclear fusion; non-covalent forces remain independent electrostatic and dispersion contacts."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "serbest bağlanma enerjisi", "arContext": "طاقة الارتباط الحرة (Delta G)" },
        { "term": "rezidans süresi", "arContext": "زمن مكوث الدواء (Residence time)" }
      ],
      "hints": [
        {
          "tr": "Matematiksel olarak bağlanma enerjilerinin toplamsal (aditif) kuralını hatırlayın.",
          "ar": "تذكر رياضياً مبدأ تراكم طاقات الارتباط الحرة (قاعدة الجمع).",
          "en": "Recall the additive nature of binding free energies (Delta G = Delta G1 + Delta G2...)."
        },
        {
          "tr": "4 farklı temas noktası aynı anda koptuğunda ancak molekül reseptörden serbest kalabilir.",
          "ar": "لا يتحرر الدواء إلا عند انفصام نقاط التماس الأربع مجتمعة في نفس اللحظة.",
          "en": "A drug can dissociate only when all multi-point contact sites detach simultaneously."
        },
        {
          "tr": "Cevap aditif serbest enerjidir; 4 zayıf bağ Delta G = -15 kcal/mol yaparak yüksek afinite ve tersinirlik sağlar.",
          "ar": "الجواب هو الطاقة الحرة التراكمية، حيث مجموع الروابط يمنح ألفة عالية مع بقاء الارتباط عكوساً.",
          "en": "The answer is additive free energy: 4 weak bonds combine to Delta G = -15 kcal/mol, preserving reversibility."
        }
      ]
    },

    // Step 7: Formal Explanation
    {
      "id": "pharm-mod1-les1-step-07",
      "stage": "formal_explanation",
      "stageIndex": 7,
      "type": "formal_explanation",
      "title": {
        "tr": "Kovalent İlaçların 4 Kimyasal Mekanizması",
        "ar": "الآليات الكيميائية الأربع للأدوية التساهمية",
        "en": "The 4 Chemical Mechanisms of Covalent Drugs"
      },
      "prompt": {
        "tr": "Kovalent ilaçlar hedef protein veya DNA'yı kalıcı olarak kilitler. Penisilin, organofosfatlar ve azotlu hardalların kovalent bağlanma reaksiyon mekanizmaları sırasıyla hangileridir?",
        "ar": "تقفل الأدوية التساهمية أهدافها من البروتينات أو الأحماض النووية بشكل دائم. ما هي الآليات الكيميائية لارتباط البنسلين والمركبات العضوية الفوسفورية وخردل النيتروجين على التوالي؟",
        "en": "Covalent drugs lock their target enzyme or DNA permanently. What are the respective chemical reaction mechanisms for penicillin, organophosphates, and nitrogen mustards?"
      },
      "conceptCheck": {
        "options": [
          {
            "id": "opt-7a",
            "text": {
              "tr": "Penisilin transpeptidazı açiller (beta-laktam halka açılması); organofosfat AChE'yi fosforiller; azotlu hardal DNA guanin N7'sini alkiller (aziridinyum katyonu).",
              "ar": "البنسلين يؤصّل ترانسببتيداز (فتح حلقة بيتا لاكتام)، والمركبات الفوسفورية تفسفر AChE، وخردل النيتروجين يؤلكل N7 في جوانين DNA.",
              "en": "Penicillin acylates transpeptidase (beta-lactam ring opening); organophosphates phosphorylate AChE; nitrogen mustards alkylate DNA guanine N7 (aziridinium cation)."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Harika bir sınav ustalığı! Slayt 10, 11 ve 12'nin tam mekanik özeti: 1) Penisilin 4 üyeli gergin laktam halkasıyla transpeptidaz aktif Serinini açiller (açilasyon), 2) Organofosfatlar AChE esteratik Serinini fosforiller (fosforilasyon), 3) Azotlu hardallar aziridinyum iyonu üzerinden DNA guanin N7 atomunu alkiller (çapraz alkilasyon). Üçü de kalıcı kovalent adükt oluşturur.",
              "ar": "إتقان امتحاني رفيع! شريحة 10 و 11 و 12: البنسلين يؤصّل سيرين الترانسببتيداز، والفوسفات العضوية تفسفر سيرين AChE، وخردل النيتروجين يؤلكل غوانين DNA، وجميعها روابط تساهمية دائمة.",
              "en": "Flawless mechanistic mastery! Slides 10, 11 & 12: Penicillin acylates transpeptidase Serine, organophosphates phosphorylate AChE Serine, and nitrogen mustards alkylate DNA guanine N7 via aziridinium ions."
            }
          },
          {
            "id": "opt-7b",
            "text": {
              "tr": "Penisilin ve organofosfatlar reseptörlerine sadece zayıf van der Waals bağlarıyla tutunur ve dakikalar içinde ayrılır.",
              "ar": "يرتبط البنسلين والفوسفات العضوية بمستقبلاتهما بروابط فان دير فالس الضعيفة فقط وينفصلان خلال دقائق.",
              "en": "Penicillin and organophosphates bind solely via weak van der Waals forces and dissociate within minutes."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Reversibilite yanılgısı: Penisilin ve organofosfatlar zayıf bağlarla değil, 50-150 kcal/mol enerjili kalıcı kovalent bağlarla bağlanır; dakikalar içinde ayrılmaları kimyasal olarak imkansızdır.",
              "ar": "مغالطة العكوسية: يرتبط البنسلين والسارين بروابط تساهمية دائمة (50-150 كيلو كالوري/مول) ومستحيلة الانفصال في دقائق.",
              "en": "Reversibility misconception: Penicillin and organophosphates form covalent bonds (50-150 kcal/mol); dissociating in minutes is chemically impossible."
            }
          },
          {
            "id": "opt-7c",
            "text": {
              "tr": "Azotlu hardallar DNA'ya dokunmaz, sadece plazma albüminindeki serbest sülfatları kovalent olarak bağlar.",
              "ar": "لا يمس خردل النيتروجين مادة DNA إطلاقاً، بل يرتبط تساهمياً بكبريتات ألبومين البلازما الحرة فقط.",
              "en": "Nitrogen mustards never react with DNA, binding exclusively to free sulfates on circulating plasma albumin."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Hedef yanılgısı: Slayt 10: Azotlu hardalların sitotoksik kemoterapötik hedefi doğrudan hücre çekirdeğindeki DNA guanin N7 pozisyonudur; iki koluyla DNA çift zincirini çapraz bağlayarak replikasyonu durdurur.",
              "ar": "مغالطة الهدف البيولوجي: شريحة 10: الهدف السريري لخردل النيتروجين هو N7 في غوانين DNA لتشكيل روابط تصالبية توقف تكاثر الخلايا السرطانية.",
              "en": "Target misconception: Slide 10: The primary therapeutic target of nitrogen mustards is DNA guanine N7; bifunctional cross-linking blocks DNA replication in cancer cells."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "açilasyon", "arContext": "تفاعل الأَصْيَلَة (Acylation)" },
        { "term": "alkilasyon", "arContext": "تفاعل الأَلْكَلَة (Alkylation)" },
        { "term": "fosforilasyon", "arContext": "تفاعل الفَسْفَرَة (Phosphorylation)" }
      ],
      "hints": [
        {
          "tr": "Beta-laktam halkasının açılmasıyla oluşan reaksiyonu ve organofosfatın fosfat aktarımını hatırlayın.",
          "ar": "تذكر التفاعل الناتج عن فتح حلقة بيتا لاكتام ونقل مجموعة الفوسفات في المركبات الفوسفورية.",
          "en": "Recall the reaction triggered by beta-lactam ring opening and phosphate transfer by organophosphates."
        },
        {
          "tr": "Slayt 10-12: Penisilin açilleme yapar, sarin fosforilleme yapar, azotlu hardal aziridinyum ile alkilleme yapar.",
          "ar": "شريحة 10-12: البنسلين يؤصل، والسارين يفسفر، وخردل النيتروجين يؤلكل عبر شاردة الأليريدينيوم.",
          "en": "Slides 10-12: Penicillin acylates, Sarin phosphorylates, and nitrogen mustard alkylates."
        },
        {
          "tr": "Doğru eşleşme: Penisilin (açilasyon), Organofosfat (fosforilasyon), Azotlu hardal (alkilasyon).",
          "ar": "الترتيب الصحيح: بنسلين (أصيلة)، فوسفات عضوية (فسفرة)، خردل نيتروجين (ألكلة).",
          "en": "The correct sequence: Penicillin (acylation), Organophosphate (phosphorylation), Nitrogen mustard (alkylation)."
        }
      ]
    },

    // Step 8: Concept Check
    {
      "id": "pharm-mod1-les1-step-08",
      "stage": "concept_check",
      "stageIndex": 8,
      "type": "concept_check",
      "title": {
        "tr": "Kavram Kontrolü: Hidrojen Bağının Yönlülüğü ve Geometrisi",
        "ar": "التحقق من المفهوم: اتجاهية الرابطة الهيدروجينية وهندستها الفراغية",
        "en": "Concept Check: Hydrogen Bond Directionality & Geometry"
      },
      "prompt": {
        "tr": "Hidrojen bağının reseptör stereoseçiciliğindeki kritik rolü nedir ve bağ ekseninden 30 derecelik açısal bir sapma bağ enerjisini nasıl etkiler?",
        "ar": "ما هو الدور الجوهري للرابطة الهيدروجينية في الانتقائية الفراغية للمستقبل، وكيف يؤثر انحراف الزاوية بمقدار 30 درجة عن الخط المستقيم على طاقة الرابطة؟",
        "en": "What is the crucial role of hydrogen bonding in receptor stereoselectivity, and how does a 30-degree deviation from the optimal linear axis affect bond energy?"
      },
      "conceptCheck": {
        "options": [
          {
            "id": "opt-8a",
            "text": {
              "tr": "Hidrojen bağı son derece yönlüdür (optimum 180° doğrusal açı); 30° sapma bağ enerjisini %50'den fazla düşürerek reseptör stereoseçiciliğini belirler.",
              "ar": "الرابطة الهيدروجينية شديدة الاتجاهية (الزاوية المثلى 180 درجة خطية)؛ وانحراف 30 درجة يقلل طاقتها بأكثر من 50% محدداً الانتقائية الفراغية.",
              "en": "Hydrogen bonds are highly directional (optimal at 180° linear geometry); a 30° deflection slashes bond energy by >50%, dictating stereoselectivity."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Mükemmel biyofiziksel analiz! Slayt 16 ve 17: Hidrojen bağları iyonik bağlar gibi küresel (izotropik) değildir; son derece yönlüdür. Maksimum enerji donör-H-akseptör atomları 180° doğrusal eksende olduğunda elde edilir. 30° açısal kayma bağ enerjisini yarıdan fazla yok eder; enantiyomerler arasındaki devasa afinite farklarının ana nedeni bu açısal hassasiyettir.",
              "ar": "تحليل فيزيائي حيوي ممتاز! شريحة 16 و 17: الروابط الهيدروجينية شديدة الاتجاهية وليست كروية كالروابط الأيونية. الزاوية 180 درجة تعطي أقصى طاقة، وانحراف 30 درجة يفقده أكثر من نصف قوته مفسراً الفارق بين المصاوغات.",
              "en": "Brilliant biophysical analysis! Slides 16 & 17: Unlike isotropic ionic fields, hydrogen bonds are strictly directional (optimum 180° linear). A 30° tilt destroys >50% of binding energy, explaining stereoselective eudismic ratios."
            }
          },
          {
            "id": "opt-8b",
            "text": {
              "tr": "Hidrojen bağı küresel bir buluttur; hangi açıyla yaklaşırsa yaklaşsın bağ enerjisi daima tamamen sabittir.",
              "ar": "الرابطة الهيدروجينية سحابة كروية متناظرة، وطاقتها ثابتة بالكامل مهما كانت زاوية الاقتراب.",
              "en": "Hydrogen bonding generates a spherical electrostatic cloud with invariant energy regardless of approach angle."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "İzotropik yanılgı: Slayt 16: İyonik bağlar küreseldir fakat hidrojen bağları orbital örtüşmesi ve kısmi kovalent karakter taşıdığı için doğrusal eksende (180°) olmak zorundadır.",
              "ar": "مغالطة الخصائص الكروية: شريحة 16: الروابط الأيونية كروية التناظر، أما الروابط الهيدروجينية فتحمل طابعاً مدارياً يتطلب خطاً مستقيماً 180 درجة.",
              "en": "Isotropic misconception: Slide 16: Pure ionic charges are spherical, but hydrogen bonds involve directional orbital overlap requiring near-linear 180° geometry."
            }
          },
          {
            "id": "opt-8c",
            "text": {
              "tr": "Hidrojen bağları sadece 90° dik açıyla kurulabilir; 180° doğrusal açıda bağ kendiliğinden kopar.",
              "ar": "لا تتشكل الروابط الهيدروجينية إلا بزاوية قائمة 90 درجة، وتتفكك تلقائياً عند الزاوية المستقيمة 180 درجة.",
              "en": "Hydrogen bonds form exclusively at 90° right angles; a 180° linear alignment causes immediate repulsion."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Dik açı yanılgısı: 90° açıda donör ve akseptör atomların elektron bulutları birbirini iter; bağ enerjisi çöker. Optimum kararlılık doğrusal 180° eksendedir.",
              "ar": "مغالطة الزاوية القائمة: عند 90 درجة يحدث تنافر إلكتروني وتنهار الطاقة؛ الاستقرار الأعظمي يكون حصراً على الخط المستقيم 180 درجة.",
              "en": "Right angle fallacy: At 90° heavy atom electron clouds clash sterically; optimal thermodynamic stability strictly requires collinear 180° alignment."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "yönlülük (directionality)", "arContext": "الاتجاهية الهندسية (Directionality)" },
        { "term": "stereoseçicilik", "arContext": "الانتقائية الفراغية" }
      ],
      "hints": [
        {
          "tr": "Donör, Hidrojen ve Akseptör atomlarının uzaydaki diziliş geometrisini düşünün.",
          "ar": "فكر في هندسة اصطفاف ذرات المانح والهيدروجين والمستقبل في الفراغ.",
          "en": "Consider the spatial alignment of Donor, Hydrogen, and Acceptor atoms."
        },
        {
          "tr": "Slayt 16: En güçlü hidrojen bağı doğrusal (180 derece) eksende elde edilir.",
          "ar": "شريحة 16: تتحقق أقصى طاقة للرابطة الهيدروجينية على المحور الخطي 180 درجة.",
          "en": "Slide 16: Maximum hydrogen bonding energy requires collinear 180° orientation."
        },
        {
          "tr": "Hidrojen bağı yönlüdür; 30 derecelik açısal kayma bağ enerjisini %50'den fazla düşürür.",
          "ar": "الرابطة الهيدروجينية موجهة؛ انحراف 30 درجة يقلل الطاقة بأكثر من 50%.",
          "en": "Hydrogen bonds are directional; a 30° deviation cuts bond strength by over 50%."
        }
      ]
    },

    // Step 9: Application (Clinical Vignette - Chelation)
    {
      "id": "pharm-mod1-les1-step-09",
      "stage": "application",
      "stageIndex": 9,
      "type": "clinical_vignette",
      "title": {
        "tr": "Klinik Vaka: Ağır Metal Zehirlenmesi ve Şelasyon Tedavisi",
        "ar": "حالة سريرية: التسمم بالمعادن الثقيلة والعلاج بالخلب",
        "en": "Clinical Vignette: Heavy Metal Toxicity & Chelation Therapy"
      },
      "prompt": {
        "tr": "Kurşun zehirlenmesinde EDTA, arsenik ve cıva zehirlenmesinde ise BAL (Dimerkaprol) kullanılır. Neden serbest EDTA yerine kalsiyum disodyum tuzu infüze edilir?",
        "ar": "يستخدم EDTA لتسمم الرصاص و BAL لتسمم الزرنيخ والزئبق. لماذا يُحقن EDTA كملح كالسيوم ثنائي الصوديوم بدلاً من الحمض الحر؟",
        "en": "EDTA treats lead poisoning, while BAL treats arsenic and mercury. Why must EDTA be infused as a calcium disodium salt rather than free EDTA?"
      },
      "conceptCheck": {
        "options": [
          {
            "id": "opt-9a",
            "text": {
              "tr": "Serbest EDTA kanda fizyolojik Ca2+'yi de çok güçlü şelatlar ve ölümcül hipokalsemik tetani yapar; CaNa2-EDTA kalsiyumunu kurşunla (Pb2+) yer değiştirerek verir.",
              "ar": "يخلب EDTA الحر كالسيوم الدم الفسيولوجي بقوة مسبباً كزاز نقص الكالسيوم القاتل، بينما يستبدل CaNa2-EDTA كالسيومه بالرصاص بأمان.",
              "en": "Free EDTA chelates endogenous Ca2+ triggering fatal hypocalcemic tetany; CaNa2-EDTA exchanges bound calcium for higher-affinity lead (Pb2+)."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Mükemmel bir klinik farmakoloji dersi! Slayt 32: EDTA heksadentat (6 dişli: 2 azot + 4 karboksilat) bir moleküldür ve Ca2+ iyonuna yüksek afinite gösterir. Serbest EDTA verilirse kandaki iyonize kalsiyumu sıfırlayarak dakikalar içinde kardiyak arrest ve tetaniye yol açar. CaNa2-EDTA tuzu verildiğinde ise kurşun (Pb2+) kalsiyumdan daha yüksek stabilite sabitine sahip olduğu için Ca ile yer değiştirir ve kurşun idrarla atılır.",
              "ar": "درس سريري بالغ الأهمية! شريحة 32: يمتلك EDTA بنية سداسية السن تأسر الكالسيوم بشدة. حقن الحمض الحر يسبب توقف القلب والكزاز بنقص الكالسيوم. لذا يعطى ملح الكالسيوم ليستبدله بالرصاص الأعلى ألفة ويطرحه كلوياً.",
              "en": "Critical clinical pharmacology lesson! Slide 32: Hexadentate EDTA (2 nitrogens + 4 carboxylates) binds Ca2+ avidly. Free EDTA causes lethal hypocalcemic tetany. CaNa2-EDTA safely transchelates: lead (Pb2+) displaces calcium due to a higher stability constant."
            }
          },
          {
            "id": "opt-9b",
            "text": {
              "tr": "EDTA ve BAL metallerle hiç bağ kurmaz; sadece böbrek tübüllerini fiziksel olarak genişleterek metallerin dökülmesini sağlar.",
              "ar": "لا يرتبط EDTA و BAL بالمعادن كيميائياً، بل يوسعان أنابيب الكلى ميكانيكياً لتسريع تدفق البول.",
              "en": "EDTA and BAL form zero chemical bonds, acting merely by mechanically dilating renal tubules."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Mekanik yanılgı: Şelatörler tübül genişletici değildir; metal katyonlarını çok dişli koordinasyon kompleksleri içine hapsederek suda çözünür stabil halkalar oluştururlar.",
              "ar": "مغالطة التوسيع الميكانيكي: الخالبات ليست موسعات كلوية، بل تحبس شوارد المعادن داخل حلقات تناسقية متعددة السنون لزيادة ذوبانها وطرحها.",
              "en": "Mechanical dilation fallacy: Chelators are not diuretics; they encapsulate metal ions inside multidentate coordinate rings, making them water-soluble for excretion."
            }
          },
          {
            "id": "opt-9c",
            "text": {
              "tr": "Serbest EDTA kalsiyumu bağlayamaz, sadece radyoaktif uranyum izotoplarını bağlamak için tasarlanmıştır.",
              "ar": "يعجز EDTA الحر عن خلب الكالسيوم، وقد صُمم حصراً لربط نظائر اليورانيوم المشعة.",
              "en": "Free EDTA is physically incapable of chelating calcium, engineered solely for radioactive uranium isotopes."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Seçicilik yanılgısı: Slayt 32: EDTA fizyolojik kalsiyumu çok yüksek kararlılık sabitiyle bağlar; tüplerdeki antikoagülan etkisini de kalsiyum şelasyonuyla gösterir.",
              "ar": "مغالطة الانتقائية: شريحة 32: يمتلك EDTA ثابتاً توازياً هائلاً مع الكالسيوم، ويستخدم كمضاد للتخثر في أنابيب سحب الدم بحبس الكالسيوم.",
              "en": "Selectivity misconception: Slide 32: EDTA exhibits high thermodynamic affinity for Ca2+, which is why it serves routinely as an in vitro anticoagulant in blood collection tubes."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "şelasyon (chelation)", "arContext": "الخَلْب المعدني (Chelation)" },
        { "term": "heksadentat ligand", "arContext": "ربيطة سداسية السن (Hexadentate ligand)" }
      ],
      "hints": [
        {
          "tr": "EDTA'nın kan tüplerinde pıhtılaşmayı önlemek için hangi iyonu bağladığını hatırlayın.",
          "ar": "تذكر الشاردة التي يخلبها EDTA في أنابيب الدم لمنع التخثر.",
          "en": "Recall which physiological ion EDTA binds in laboratory tubes to prevent clotting."
        },
        {
          "tr": "Serbest EDTA kalsiyumu bağlarsa kanda serbest Ca2+ seviyesine ve kas spazmına ne olur?",
          "ar": "إذا خلب EDTA الحر كالسيوم المصل، ماذا يحدث لمستوى الكالسيوم والتشنج العضلي؟",
          "en": "What happens to serum ionized calcium and muscular excitability if free EDTA is infused?"
        },
        {
          "tr": "Serbest EDTA hipokalsemik tetani yapar; bu yüzden kalsiyum disodyum tuzu (CaNa2-EDTA) kullanılır.",
          "ar": "يسبب EDTA الحر كزاز نقص الكالسيوم؛ لذلك يُعطى ملح الكالسيوم ثنائي الصوديوم.",
          "en": "Free EDTA causes hypocalcemic tetany; hence calcium disodium EDTA is administered."
        }
      ]
    },

    // Step 10: Retrieval
    {
      "id": "pharm-mod1-les1-step-10",
      "stage": "retrieval",
      "stageIndex": 10,
      "type": "retrieval",
      "title": {
        "tr": "Geri Çağırma: İlaçların 4 Makromoleküler Hedef Sınıfı",
        "ar": "الاسترجاع: الفئات الأربع الرئيسية للأهداف الجزيئية للأدوية",
        "en": "Retrieval: The 4 Macromolecular Drug Target Classes"
      },
      "prompt": {
        "tr": "Farmakolojide ilaçların etki gösterdiği 4 temel makromoleküler hedef sınıfı hangileridir?",
        "ar": "ما هي الفئات الأربع الرئيسية للأهداف الجزيئية الحيوية التي ترتبط بها الأدوية وتحدث تأثيراتها الدوائية؟",
        "en": "What are the four primary macromolecular biological target classes through which drugs exert their pharmacological effects?"
      },
      "conceptCheck": {
        "options": [
          {
            "id": "opt-10a",
            "text": {
              "tr": "Reseptörler, Enzimler, İyon Kanalları ve Taşıyıcı Moleküller (Transporterlar / Pompalar).",
              "ar": "المستقبلات، والإنزيمات، والقنوات الأيونية، والناقلات الجزيئية (المضخات النقلية).",
              "en": "Receptors, Enzymes, Ion Channels, and Transporter Carrier Proteins."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kusursuz hafıza! Slayt 3'ün temel 4'lüsü: 1) Reseptörler (hücre yüzeyi ve nükleer), 2) Enzimler (inhibitör veya intihar substratları), 3) İyon Kanalları (bloker veya açıcılar), 4) Taşıyıcılar (SERT, DAT, SGLT-2 gibi geri alım pompaları). İlaçların %95'i bu 4 protein ailesini hedefler.",
              "ar": "استرجاع مثالي! شريحة 3: 1) المستقبِلات، 2) الإنزيمات، 3) القنوات الأيونية، 4) النواقل الخلوية مثل ناقلات السيروتونين SGLT-2. 95% من الأدوية تستهدف هذه الفئات الأربع.",
              "en": "Perfect recall! Slide 3 target tetrad: 1) Receptors, 2) Enzymes, 3) Ion channels, and 4) Transporter carriers (SERT, NET, SGLT-2). Over 95% of pharmacotherapy targets these four proteins."
            }
          },
          {
            "id": "opt-10b",
            "text": {
              "tr": "İlaçların tek makromoleküler hedefi hücre çekirdeğindeki ribozomlardır; enzim ve kanallara ilaç bağlanamaz.",
              "ar": "الهدف الجزيئي الوحيد للأدوية هو ريبوسومات النواة؛ ولا يمكن للأدوية الارتباط بالإنزيمات والقنوات.",
              "en": "The sole macromolecular targets are nuclear ribosomes; drugs cannot bind enzymes or ion channels."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Tek hedef yanılgısı: Ribozomlar bazı antibiyotiklerin hedefidir ancak insan farmakolojisinde ana hedefler membran reseptörleri, metabolik enzimler ve iyon kanallarıdır.",
              "ar": "مغالطة حصر الهدف: الريبوسومات هدف لبعض الصادات، لكن الأهداف البشرية الرئيسية هي مستقبِلات الأغشية والإنزيمات والقنوات.",
              "en": "Single target fallacy: While ribosomes are targeted by bacterial antibiotics, human pharmacology is dominated by membrane receptors, metabolic enzymes, and ion channels."
            }
          },
          {
            "id": "opt-10c",
            "text": {
              "tr": "İlaçlar sadece hücre dışı kemik minerallerine bağlanır; proteinlere afiniteleri yoktur.",
              "ar": "ترتبط الأدوية حصراً بمعادن العظام خارج الخلوية دون أي ألفة للمستقبلات البروتينية.",
              "en": "Drugs bind exclusively to extracellular hydroxyapatite bone minerals, lacking protein affinity."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kemik yanılgısı: Kemik minerali sekestrasyonu (örn. tetrasiklin) bir doku dağılım olayıdır; farmakodinamik reseptör yanıtı protein hedeflere bağlanmayla oluşur.",
              "ar": "مغالطة العظام: ترسب بعض الأدوية في العظام (كالتتراسيكلين) هو توزع حركي؛ أما الاستجابة الدوائية فتشترط الارتباط ببروتينات وظيفية.",
              "en": "Bone mineral fallacy: Bone accumulation (e.g. tetracyclines) reflects pharmacokinetic deposition; pharmacological efficacy requires functional protein binding."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "makromoleküler hedef", "arContext": "الهدف الجزيئي الحيوي" },
        { "term": "taşıyıcı molekül (transporter)", "arContext": "الناقل البروتيني (Transporter)" }
      ],
      "hints": [
        {
          "tr": "Hücre zarındaki sinyal alıcılarını, metabolik katalizörleri ve gözenekli geçitleri düşünün.",
          "ar": "فكر في لاقطات الإشارة الغشائية، والمحفزات الاستقلابية، وبوابات العبور الأيونية.",
          "en": "Think of membrane signal receivers, catalytic converters, and gated ion conduits."
        },
        {
          "tr": "Slayt 3: Reseptörler, Enzimler, İyon Kanalları ve Taşıyıcılar.",
          "ar": "شريحة 3: المستقبِلات، الإنزيمات، القنوات الأيونية، والنواقل.",
          "en": "Slide 3: Receptors, Enzymes, Ion Channels, and Transporters."
        },
        {
          "tr": "Dört sınıf: Reseptörler, Enzimler, İyon Kanalları, Taşıyıcı Transporterlar.",
          "ar": "الفئات الأربع: مستقبِلات، إنزيمات، قنوات أيونية، نواقل خلوية.",
          "en": "The four classes: Receptors, Enzymes, Ion Channels, and Transporters."
        }
      ]
    },

    // Step 11: Connection
    {
      "id": "pharm-mod1-les1-step-11",
      "stage": "connection",
      "stageIndex": 11,
      "type": "connection",
      "title": {
        "tr": "Bağlantı: Coulomb İyonik Yönlendirmesi ve van der Waals Kilitlenmesi",
        "ar": "الربط: التوجيه الأيوني وفق كولوم والإقفال بقوى فان دير فالس",
        "en": "Connection: Coulombic Ionic Steering & van der Waals Docking"
      },
      "prompt": {
        "tr": "İlacın reseptör cebine yaklaşmasında uzun menzilli Coulomb iyonik kuvveti (1/r²) ile kısa menzilli van der Waals kuvvetleri (1/r⁶) arasında nasıl bir iş bölümü vardır?",
        "ar": "كيف تتكامل قوى كولوم الأيونية بعيدة المدى (1/r²) مع قوى فان دير فالس قصيرة المدى (1/r⁶) أثناء توجيه الدواء واستقراره في جيب المستقبل؟",
        "en": "How do long-range Coulombic ionic forces (1/r²) cooperate with short-range van der Waals forces (1/r⁶) during ligand steering and docking into the receptor cavity?"
      },
      "conceptCheck": {
        "options": [
          {
            "id": "opt-11a",
            "text": {
              "tr": "İyonik kuvvet en uzun menzillidir (1/r²); ilacı uzaktan algılayıp cebe yönlendirir (ionic steering), yakına gelince van der Waals (1/r⁶) ve H-bağları kilitlenmeyi tamamlar.",
              "ar": "القوة الأيونية هي الأطول مدى (1/r²) فتوجه الدواء نحو الجيب، وحين الاقتراب تتدخل قوى فان دير فالس (1/r⁶) والروابط الهيدروجينية لإتمام الإقفال.",
              "en": "Ionic attraction is longest-range (1/r²), guiding the ligand from afar (ionic steering); at close contact, van der Waals (1/r⁶) and H-bonds lock the complex."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Mükemmel biyofiziksel entegrasyon! Slayt 14 ve 24: İyonik bağın menzili 1/r² ile azalır; bu sayede mikroskobik ölçekte en uzun menzilli çekimdir. İlaç bağlanma cebine yönlendirilirken iyonik tuz köprüsü ilacı doğru oryantasyonda çeker. İlaç temas mesafesine (van der Waals yarıçapı) ulaştığında ise 1/r⁶ ile mesafeye aşırı duyarlı van der Waals ve hidrofobik kuvvetler devreye girerek kenetlenmeyi tamamlar.",
              "ar": "تكامل فيزيائي بديع! شريحة 14 و 24: تتناقص القوة الأيونية مع 1/r² وهي الأطول مدى لجذب الدواء وتوجيهه نحو الجيب. وعند التماس التام تتدخل قوى فان دير فالس الحساسة لـ 1/r⁶ لإحكام الارتباط.",
              "en": "Brilliant biophysical synthesis! Slides 14 & 24: Ionic force scales with 1/r², acting as a long-range beacon. Once the drug enters the cavity, contact-dependent van der Waals forces (1/r⁶) snap the ligand into place."
            }
          },
          {
            "id": "opt-11b",
            "text": {
              "tr": "Van der Waals kuvvetleri kilometrelerce uzaktan etkilidir, iyonik kuvvetler ise ancak atomlar birbirine dokununca doğar.",
              "ar": "تعمل قوى فان دير فالس عبر مسافات هائلة، بينما تنشأ القوى الأيونية فقط عند ملامسة الذرات لبعضها.",
              "en": "Van der Waals forces act over huge microscopic distances, while ionic forces arise strictly upon physical atomic collision."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Menzil tersliği yanılgısı: Van der Waals kuvvetleri 1/r⁶ ile mesafenin altıncı kuvvetine bağlıdır; atomlar temas mesafesinden birkaç ångström uzaklaşsa bile sıfırlanır.",
              "ar": "مغالطة عكس المدى: تتناسب قوى فان دير فالس عكساً مع القوة السادسة للمسافة (1/r⁶)، فتتلاشى تماماً إذا ابتعدت الذرات بضع أنغسترومات.",
              "en": "Distance inversion fallacy: Van der Waals forces drop off with the 6th power of distance (1/r⁶), vanishing completely beyond atomic contact radii."
            }
          },
          {
            "id": "opt-11c",
            "text": {
              "tr": "İyonik kuvvetler ilacı reseptörden uzaklaştırır; bağlanmayı sadece apolar hidrokarbonlar başlatır.",
              "ar": "تدفع القوى الأيونية الدواء بعيداً عن المستقبل؛ والارتباط يبدأ حصراً بالهيدروكربونات اللابولارية.",
              "en": "Ionic forces act as an electrostatic repulsor; initial binding is initiated exclusively by nonpolar carbons."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "İtme yanılgısı: Pozitif yüklü ilaç amino grubu ile negatif yüklü aspartat/glutamat karboksilatı arasında güçlü çekim kuvveti vardır; elektrostatik itme ancak aynı yükler arasında olur.",
              "ar": "مغالطة التنافر: التجاذب بين الأمين الموجب وكربوكسيلات الأسبارتات السالب قوي وموجه، والتنافر لا يحدث إلا بين الشحنات المتماثلة.",
              "en": "Repulsion fallacy: Oppositely charged groups (cationic amine and anionic aspartate) attract each other strongly; electrostatic repulsion occurs only between identical charges."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "iyonik yönlendirme (ionic steering)", "arContext": "التوجيه الأيوني (Ionic steering)" },
        { "term": "van der Waals yarıçapı", "arContext": "نصف قطر فان دير فالس" }
      ],
      "hints": [
        {
          "tr": "Mesafe bağımlılıklarını karşılaştırın: 1/r² (uzun menzil) vs 1/r⁶ (kısa temas menzili).",
          "ar": "قارن بين التبعية للمسافة: 1/r² (بعيدة المدى) في مقابل 1/r⁶ (قصيرة المدى عند التماس).",
          "en": "Compare distance dependencies: 1/r² (long-range) versus 1/r⁶ (short-range contact)."
        },
        {
          "tr": "İlacı cebe ilk çeken kuvvet ile cebe oturduğunda yapışmayı sağlayan kuvveti düşünün.",
          "ar": "فكر في القوة التي تجذب الدواء أولاً نحو الجيب، وتلك التي تحكم تثبيته عند الاستقرار فيه.",
          "en": "Think of the force that guides the drug towards the entrance versus the forces that cement docking."
        },
        {
          "tr": "İyonik kuvvetler uzun menzilli yönlendiricidir; van der Waals ise temas mesafesinde kenetler.",
          "ar": "القوة الأيونية موجه بعيد المدى، بينما تؤمن قوى فان دير فالس التثبيت التماسي المحكم.",
          "en": "Ionic forces guide from afar (steering); van der Waals and hydrophobic forces lock at atomic contact."
        }
      ]
    },

    // Step 12: Mastery Check (Transfer problem)
    {
      "id": "pharm-mod1-les1-step-12",
      "stage": "mastery_check",
      "stageIndex": 12,
      "type": "mastery_check",
      "title": {
        "tr": "Ustalık Sınavı: Yeni Kinaz İnhibitörü 'Mol-X' Transfer Analizi",
        "ar": "اختبار الإتقان: التحليل الانتقالي لمثبط الكينيز الجديد Mol-X",
        "en": "Mastery Check: Unseen Kinase Inhibitor 'Mol-X' Transfer Problem"
      },
      "prompt": {
        "tr": "Yeni bir tirozin kinaz inhibitörü Mol-X; 1 iyonik tuz köprüsü, 2 hidrojen bağı ve 3 hidrofobik temasla bağlanıyor. İlacın bağlanma stabilitesi ve tersinirliği hakkında ne söylenebilir?",
        "ar": "يرتبط مثبط التيروزين كينيز الجديد Mol-X بجسر ملحي أيوني واحد، ورابطتين هيدروجينيتين، و 3 تماسات كارهة للماء. ماذا نستنتج حول ثبات الارتباط وعكوسيته؟",
        "en": "A novel kinase inhibitor Mol-X forms 1 ionic salt bridge, 2 hydrogen bonds, and 3 hydrophobic contacts in its active pocket. What can be deduced about its affinity and reversibility?"
      },
      "conceptCheck": {
        "options": [
          {
            "id": "opt-12a",
            "text": {
              "tr": "Toplam bağlanma serbest enerjisi ~ -19 kcal/mol ile sub-nanomolar afinite sağlar; ancak kovalent bağ içermediğinden etki reversibildir ve kandan temizlenince sona erer.",
              "ar": "توفر طاقة الارتباط التراكمية ~ -19 كيلو كالوري/مول ألفة تحت نانومولية عالية؛ ونظراً لغياب الروابط التساهمية فإن التأثير عكوس تماماً ويزول بزوال الدواء.",
              "en": "Combined free energy (~ -19 kcal/mol) confers sub-nanomolar affinity; lacking covalent bonds, inhibition remains completely reversible upon drug clearance."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kusursuz farmakolojik sentez ve ustalık! Enerji hesabı: 1 iyonik bağ (~ -8 kcal/mol) + 2 hidrojen bağı (2 x -4 = -8 kcal/mol) + 3 hidrofobik temas (3 x -1 = -3 kcal/mol) = Toplam Delta G° yaklaşık -19 kcal/mol! Bu muazzam enerji Kd = 10^-10 M (sub-nanomolar) seviyesinde sıkı bir bağlanma sağlar. Ancak hiçbir kovalent bağ (50-150 kcal/mol) bulunmadığından ilaç kalıcı adükt oluşturmaz; plazma konsantrasyonu düşünce koff ayrışma hızıyla reseptörden ayrılarak hedef kinazın aktivitesini yeniden serbest bırakır!",
              "ar": "قمة الإتقان والتركيب العلمي! الحساب: 1 أيوني (-8) + 2 هيدروجيني (-8) + 3 كاره للماء (-3) = المجموع ~ -19 كيلو كالوري/مول! يمنح هذا ألفة نانومولية فائقة (Kd = 10^-10 M)، ولكن لغياب الروابط التساهمية، ينفصل الدواء بحركية عكوسة بمجرد انخفاض تركيزه البلازمي.",
              "en": "Masterful pharmacological synthesis! Energetic summation: 1 ionic (-8 kcal/mol) + 2 H-bonds (-8 kcal/mol) + 3 hydrophobic contacts (-3 kcal/mol) = Delta G° ~ -19 kcal/mol! This confers sub-nanomolar affinity (Kd ~ 0.1 nM) while maintaining complete reversibility without irreversible covalent adduction."
            }
          },
          {
            "id": "opt-12b",
            "text": {
              "tr": "Toplam enerji 150 kcal/mol'ü aştığı için molekül hedef kinazı kalıcı olarak eritip geri dönüşsüz felç yapar.",
              "ar": "بما أن مجموع الطاقات يتجاوز 150 كيلو كالوري/مول، فإن الجزيء يذيب الكينيز بشكل دائم ويحدث شللاً غير عكوس.",
              "en": "Because summed energies exceed 150 kcal/mol, the molecule permanently melts the kinase, causing irreversible inactivation."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kovalent aşım yanılgısı: Non-kovalent bağların enerjileri toplandığında asla bir kovalent bağın enerjisine (50-150 kcal/mol) ulaşamaz; -19 kcal/mol çok güçlü bir non-kovalent afinite seviyesidir fakat kovalent kalıcılık yaratamaz.",
              "ar": "مغالطة التخطي التساهمي: طاقات الروابط غير التساهمية لا تصل إطلاقاً إلى طاقة الرابط التساهمي (50-150 كيلو كالوري/مول)، وقيمة -19 تعني ألفة عكوسة وليست شللاً تساهمياً.",
              "en": "Covalent threshold fallacy: Summed non-covalent forces rarely exceed -20 to -25 kcal/mol; they never reach covalent single-bond strength (50-150 kcal/mol) and remain reversible."
            }
          },
          {
            "id": "opt-12c",
            "text": {
              "tr": "Non-kovalent bağların enerjisi asla toplanamaz; molekülün net bağlanma enerjisi en zayıf bağ olan van der Waals'e (-1 kcal/mol) eşittir.",
              "ar": "لا يمكن جمع طاقات الروابط غير التساهمية إطلاقاً، وتقتصر طاقة الارتباط الصافية على أضعف رابطة (-1 كيلو كالوري/مول).",
              "en": "Non-covalent bond energies can never be summed; target binding is constrained to the weakest single contact (-1 kcal/mol)."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Minimallik yanılgısı: Termodinamikte serbest enerjiler durum fonksiyonudur ve cebirsel olarak toplanır (Delta G_toplam = Delta G1 + Delta G2...); molekülün reseptöre toplam tutunma gücü tüm temas noktalarının bileşkesidir.",
              "ar": "مغالطة أدنى طاقة: في الديناميكا الحرارية، الطاقة الحرة دالة حالة تجمع جبرياً (Delta G = G1 + G2)، وقوة التماسك هي محصلة كافة نقاط التماس مجتمعة.",
              "en": "Minimality fallacy: Free energy is a thermodynamic state function that sums algebraically (Delta G_total = Delta G1 + Delta G2...); collective affinity reflects all simultaneous contacts."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "tirozin kinaz inhibitörü", "arContext": "مثبط التيروزين كينيز" },
        { "term": "termodinamik serbest enerji", "arContext": "طاقة غيبس الحرة الديناميكية" }
      ],
      "hints": [
        {
          "tr": "İyonik (~ -8), H-bağı (2 x -4 = -8) ve hidrofobik (3 x -1 = -3) enerjilerini toplayın.",
          "ar": "اجمع طاقات الروابط: أيونية (-8) + هيدروجينية (-8) + كارهة للماء (-3).",
          "en": "Sum the interaction energies: ionic (~ -8), H-bonds (2 x -4 = -8), and hydrophobic (3 x -1 = -3)."
        },
        {
          "tr": "Toplam enerji ~ -19 kcal/mol eder. Yapıda kovalent bağ var mı?",
          "ar": "المجموع يقارب -19 كيلو كالوري/مول. هل توجد رابطة تساهمية في البنية؟",
          "en": "Total energy equals ~ -19 kcal/mol. Is any covalent alkylating/acylating warhead present?"
        },
        {
          "tr": "Kovalent bağ olmadığı için etki sub-nanomolar afiniteye rağmen tamamen geri dönüşümlüdür.",
          "ar": "لغياب الروابط التساهمية، فإن التثبيط عكوس تماماً رغم الألفة العالية تحت النانومولية.",
          "en": "Lacking a covalent warhead, inhibition remains sub-nanomolar yet completely reversible."
        }
      ]
    }
  ]
};

// Mirror conceptCheck.options into config.options for all steps
lesson01.steps.forEach((step) => {
  if (step.conceptCheck && step.conceptCheck.options) {
    if (!step.config) step.config = {};
    step.config.options = step.conceptCheck.options.map((opt) => ({
      id: opt.id,
      text: opt.text.tr,
      isCorrect: opt.isCorrect,
      misconceptionFeedback: opt.misconceptionFeedback.tr
    }));
  }
});

// Write to worktree
fs.writeFileSync(targetPathWorktree, JSON.stringify(lesson01, null, 2), 'utf8');
console.log('Successfully written to ' + targetPathWorktree);

// Write to root workspace
try {
  fs.writeFileSync(targetPathRoot, JSON.stringify(lesson01, null, 2), 'utf8');
  console.log('Successfully synced to ' + targetPathRoot);
} catch (e) {
  console.warn('Could not sync directly to root: ' + e.message);
}
