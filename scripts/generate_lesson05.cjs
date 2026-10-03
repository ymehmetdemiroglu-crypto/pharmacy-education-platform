const fs = require('fs');
const path = require('path');

const lesson05 = {
  "$schema": "../../../packages/platform/schema/lesson.schema.json",
  "id": "mc-mod3-les1",
  "courseId": "medchem",
  "moduleId": "mc-mod-03",
  "title": {
    "tr": "Klasik Biyoizosterizm ve Grimm Hidrit Yer Değiştirme",
    "ar": "التشابه الحيوي الكلاسيكي وإزاحة هيدريد Grimm",
    "en": "Classical Bioisosterism & Grimm Hydride Displacement"
  },
  "order": 1,
  "access": "free",
  "objective": {
    "tr": "Grimm hidrit yer değiştirme kuralı ve klasik biyoizosterik serileri uygulayarak öncü moleküllerde metabolik stabiliteyi ve hedef reseptör seçiciliğini optimize etmek.",
    "ar": "تطبيق قاعدة إزاحة هيدريد Grimm وسلاسل التشابه الحيوي الكلاسيكية لتحسين الثباتية الاستقلابية وانتقائية المستقبل في المركبات الطليعية.",
    "en": "Apply Grimm's Hydride Displacement Law and classical bioisosteric series to replace atoms/groups, predicting changes in receptor recognition and metabolic fate."
  },
  "misconceptions": [
    {
      "tr": "Biyoizosterik grupların periyodik tabloda mutlaka aynı dikey sütunda (aynı element ailesinde) yer alması gerektiği yanılgısı.",
      "ar": "الظن الخاطئ بوجوب انتماء المجموعات البيوإيزوستيرية حتماً إلى نفس العمود الرأسي (نفس العائلة) في الجدول الدوري.",
      "en": "The misconception that bioisosteres must belong to the exact same column or element family in the periodic table."
    },
    {
      "tr": "Biyoizosterik değişimin daima ana molekül gibi agonist farmakolojik aktivite göstereceği düşüncesi (antimetabolitlerin göz ardı edilmesi).",
      "ar": "الاعتقاد الخاطئ بأن التبديل البيوإيزوستيري ينتج دوماً تأثيراً منبهاً (agonist) مماثلاً للمركب الأصلي متجاهلاً مضادات الاستقلاب.",
      "en": "The belief that bioisosteric modifications always yield agonistic activity, overlooking bioisosteric antimetabolites and antagonists."
    },
    {
      "tr": "Flor atomunun van der Waals yarıçapının hidrojenden çok büyük olduğu veya proteini iyonik parçaladığı yanılgısı.",
      "ar": "الظن الخاطئ بأن نصف قطر فان دير فالس للفلور أكبر بكثير من الهيدروجين أو أنه يحطم البروتينات أيونياً.",
      "en": "The assumption that fluorine has a vastly larger van der Waals radius than hydrogen or physically cleaves proteins."
    }
  ],
  "sources": [
    { "file": "Biyoizosterizm.pdf", "page": 1 },
    { "file": "Biyoizosterizm.pdf", "page": 2 },
    { "file": "Biyoizosterizm.pdf", "page": 3 },
    { "file": "Biyoizosterizm.pdf", "page": 4 },
    { "file": "Biyoizosterizm.pdf", "page": 5 },
    { "file": "Biyoizosterizm.pdf", "page": 6 },
    { "file": "Biyoizosterizm.pdf", "page": 7 },
    { "file": "Biyoizosterizm.pdf", "page": 8 },
    { "file": "Biyoizosterizm.pdf", "page": 11 },
    { "file": "Biyoizosterizm.pdf", "page": 13 },
    { "file": "Biyoizosterizm.pdf", "page": 14 },
    { "file": "Biyoizosterizm.pdf", "page": 15 }
  ],
  "citations": [
    {
      "id": "CIT-MC05-01",
      "book": "Foye's Principles of Medicinal Chemistry",
      "edition": "8th ed.",
      "topic": "Bioisosterism and Molecular Modification in Drug Design",
      "chapter": "Chapter 2",
      "page": "45-62",
      "status": "verified"
    },
    {
      "id": "CIT-MC05-02",
      "book": "Wilson and Gisvold's Textbook of Organic Medicinal and Pharmaceutical Chemistry",
      "edition": "12th ed.",
      "topic": "Isosterism and Bioisosterism in Drug Discovery",
      "chapter": "Chapter 3",
      "page": "75-92",
      "status": "verified"
    }
  ],
  "numericClaims": [
    {
      "id": "NUM-MC05-01",
      "parameter": "Langmuir N2O vs CO2 identical dynamic viscosity at 20 C",
      "value": "148 x 10^-6 Pa.s",
      "status": "verified",
      "referencePassage": "Slide 2: Dynamic viscosity of N2O and CO2 at 20 C is identical at 148 x 10^-6 Pa.s, demonstrating identical outer valence electron fluid dynamics."
    },
    {
      "id": "NUM-MC05-02",
      "parameter": "Carbon-Fluorine vs Carbon-Hydrogen bond dissociation energy",
      "value": "116 kcal/mol vs 98 kcal/mol",
      "status": "verified",
      "referencePassage": "Slide 11: C-F bond energy (116 kcal/mol) vs C-H (98 kcal/mol), providing an unbreakable metabolic shield against CYP450 aromatic oxidation."
    },
    {
      "id": "NUM-MC05-03",
      "parameter": "Fluorine vs Hydrogen van der Waals radius",
      "value": "1.47 A vs 1.20 A",
      "status": "verified",
      "referencePassage": "Slide 11: Fluorine van der Waals radius (1.47 A) closely matches hydrogen (1.20 A), enabling near-perfect steric mimicry in active sites."
    },
    {
      "id": "NUM-MC05-04",
      "parameter": "Grimm Hydride Displacement Valence Electron Groups",
      "value": "Groups 6 through 11",
      "status": "verified",
      "referencePassage": "Slide 4: Grimm table establishes pseudoatoms across valence groups: 6 (C), 7 (N, CH), 8 (O, NH, CH2), 9 (F, OH, NH2, CH3)."
    }
  ],
  "spacedReviewCards": [
    {
      "cardId": "mc-mod3-les1-card1",
      "courseId": "medchem",
      "drugOrConcept": "Grimm Hidrit Deplasman Kuralı",
      "prompt": "Grimm hidrit kuralına göre bir atoma bir hidrojen (H•) eklendiğinde hangi grubun elektronik özelliklerini kazanır?",
      "answer": "Periyodik tabloda bir sonraki (bir sağındaki) grubun değerlik elektronu kabuk özelliklerini kazanır; böylece -CH3, -NH2, -OH ve -F izosterik psödoatomlar oluşturur.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "mc-mod3-les1-card2",
      "courseId": "medchem",
      "drugOrConcept": "5-Fluorourasil ve İntihar Substratı",
      "prompt": "5-Fluorourasil (5-FU) timidilat sentaz enzimini hangi mekanizmayla irreversibl bloke eder?",
      "answer": "Flor (1.47 Å) hidrojenle (1.20 Å) neredeyse aynı boyuttadır ve enzimi aldatır; ancak C-F bağı (116 kcal/mol) koparılamadığından kovalent üçlü kompleks kalıcı kilitlenir.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "mc-mod3-les1-card3",
      "courseId": "medchem",
      "drugOrConcept": "Fenotiyazin-Dibenzazepin Dönüşümü",
      "prompt": "Klorpromazindeki (fenotiyazin) -S- köprüsü -CH2-CH2- ile değiştirildiğinde (imipramin) klinik etki nasıl değişir?",
      "answer": "Molekülün 3 boyutlu katlanma açısı değişir; dopamin D2 bloker antipsikotik etki kaybolur ve yerini monoamin geri alım blokeri trisiklik antidepresan etki alır.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "mc-mod3-les1-card4",
      "courseId": "medchem",
      "drugOrConcept": "Benzen-Tiyofen Halka Eşdeğerliği",
      "prompt": "Benzen halkasındaki -CH=CH- grubu yerine tek bir kükürt atomu (-S-) konulduğunda (Tiyofen) aromatiklik neden korunur?",
      "answer": "Hansberg kuralına göre kükürt atomunun d-orbitalleri ve serbest elektron çifti aromatik pi-delokalizasyonuna katılarak 6 pi elektronlu Hückel aromatik rezonansını sürdürür.",
      "box": 1,
      "intervalDays": 1
    }
  ],
  "translations": {
    "tr": {
      "title": "Klasik Biyoizosterizm ve Grimm Hidrit Yer Değiştirme"
    },
    "ar": {
      "title": "التشابه الحيوي الكلاسيكي وإزاحة هيدريد Grimm"
    }
  },
  "steps": [
    {
      "id": "mc-mod3-les1-step-01",
      "stage": "hook",
      "stageIndex": 1,
      "type": "predict_reveal",
      "title": {
        "tr": "Metabolik Kamuflaj: Urasil vs 5-Fluorourasil Paradoksu",
        "ar": "التمويه الاستقلابي: مفارقة اليوراسيل و5-فلورويوراسيل",
        "en": "Metabolic Camouflage: The Uracil vs 5-FU Paradox"
      },
      "prompt": {
        "tr": "Doğal urasildeki tek bir hidrojen yerine flor takılınca molekül öldürücü bir antikanser ilacına (5-FU) dönüşür. Enzim flor atomunu neden hidrojen zannedip tuzağa düşer?",
        "ar": "استبدال هيدروجين واحد في اليوراسيل الطبيعي بذرة فلور يحوله لسلاح قاتل للسرطان (5-FU). لماذا يظن الأنزيم الفلور هيدروجيناً ويقع في الفخ القاتل؟",
        "en": "Replacing a single hydrogen on natural uracil with fluorine creates the lethal anticancer drug 5-FU. Why does thymidylate synthase mistake fluorine for hydrogen and walk into a trap?"
      },
      "predictThenReveal": true,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-1a",
            "text": {
              "tr": "Florun van der Waals yarıçapı (1.47 Å) hidrojene (1.20 Å) çok yakındır; enzim sterik olarak aldanır ancak sağlam C-F bağını (116 kcal/mol) koparamaz.",
              "ar": "نصف قطر فان دير فالس للفلور (1.47 Å) مقارب جداً للهيدروجين (1.20 Å)؛ فينخدع الأنزيم فراغياً لكنه يعجز عن كسر رابطة C-F الفولاذية (116 kcal/mol).",
              "en": "Fluorine's van der Waals radius (1.47 Å) closely matches hydrogen (1.20 Å); the enzyme docks it, but cannot break the unbreakable C-F bond (116 kcal/mol)."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Doğru! Flor, hidrojene sterik olarak en yakın atomdur (1.47 Å vs 1.20 Å). Enzim cebine kusursuz oturur, fakat C-5'ten flor ayrılamadığı için timidilat sentaz kovalent olarak kilitlenir.",
              "ar": "صحيح! الفلور أقرب الذرات حجماً للهيدروجين؛ يرسو بدقة في جيب الأنزيم، لكن استعصاء كسر رابطة C-F يعطل الأنزيم تساهمياً بشكل غير عكوس.",
              "en": "Correct! Fluorine is the closest steric mimic of hydrogen (1.47 Å vs 1.20 Å). It docks seamlessly, but thymidylate synthase cannot abstract fluorine, forming a permanent covalent dead-end complex."
            }
          },
          {
            "id": "opt-1b",
            "text": {
              "tr": "Flor pozitif yük taşıdığı için enzimin aktif bölgesindeki negatif yüklü aspartatları iyonik olarak parçalar.",
              "ar": "يحمل الفلور شحنة موجبة تخرب أسبارتات الأنزيم سالبة الشحنة بروابط أيونية عنيفة.",
              "en": "Fluorine carries a positive formal charge that electrostatically cleaves active site aspartates."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Yük yanılgısı: Flor periyodik tablonun en elektronegatif elementidir; asla pozitif yük taşımaz ve proteinleri iyonik olarak parçalamaz.",
              "ar": "خطأ الشحنة: الفلور العنصر الأعلى كهروسلبية في الطبيعة؛ لا يحمل شحنة موجبة ولا يخرب البروتينات أيونياً.",
              "en": "Charge misconception: Fluorine is the most electronegative element; it never bears a positive charge or electrostatically cleaves residues."
            }
          },
          {
            "id": "opt-1c",
            "text": {
              "tr": "Flor atomu urasilin molekül ağırlığını 10 kat artırarak enzimin aktif bölgesini fiziksel olarak tıkar.",
              "ar": "تضاعف ذرة الفلور الوزن الجزيئي لليوراسيل 10 أضعاف فتسد الموقع الفعال مادياً.",
              "en": "The fluorine atom increases uracil's molecular weight 10-fold, physically jamming the active site."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Hacim yanılgısı: Florun atom ağırlığı 19 g/mol'dür; urasile sadece 18 kütle birimi ekler, devasa bir sterik tıkanma yaratmaz.",
              "ar": "خطأ الكتلة: الوزن الذري للفلور 19 g/mol؛ يضيف 18 وحدة كتلة فقط لليوراسيل ولا يسبب انسداداً فراغياً هائلاً.",
              "en": "Mass misconception: Fluorine adds only 18 atomic mass units to uracil; it does not physically obstruct the catalytic pocket via sheer bulk."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "biyoizoster", "arContext": "المتشابه الحيوي (bioisostere)" },
        { "term": "intihar substratı", "arContext": "الركيزة الانتحارية (suicide substrate)" }
      ],
      "hints": [
        {
          "tr": "Flor atomunun boyutunu ve hidrojene olan fiziksel benzerliğini düşünün.",
          "ar": "فكر في الحجم الفراغي للفلور والتشابه الفيزيائي المذهل مع الهيدروجين.",
          "en": "Consider the van der Waals radius of fluorine compared to hydrogen."
        },
        {
          "tr": "Florun van der Waals yarıçapı 1.47 Å iken hidrojeninki 1.20 Å'dur. Ancak C-F kovalent bağı 116 kcal/mol ile aşırı güçlüdür.",
          "ar": "نصف قطر الفلور 1.47 Å مقابل 1.20 Å للهيدروجين، غير أن رابطة C-F التساهمية تبلغ طاقتها 116 kcal/mol.",
          "en": "Fluorine has a van der Waals radius of 1.47 Å versus 1.20 Å for hydrogen, but forms an ultra-stable C-F bond (116 kcal/mol)."
        },
        {
          "tr": "Enzim flor atomunu boyutsal olarak hidrojen zanneder; fakat timin sentezinde hidrür transferi basamağında C-F bağı koparılamaz ve enzim irreversibl intihar inhibisyonuna uğrar.",
          "ar": "ينخدع الأنزيم بحجم الفلور، لكنه يعجز عن كسر رابطة C-F في خطوة نزع البروتون فيتعطل نهائياً بآلية التثبيط الانتحاري.",
          "en": "The active site accommodates fluorine stereochemically, but fails to abstract it during hydride transfer, irreversibly disabling the enzyme."
        }
      ],
      "sources": [{ "file": "Biyoizosterizm.pdf", "page": 11 }]
    },
    {
      "id": "mc-mod3-les1-step-02",
      "stage": "question",
      "stageIndex": 2,
      "type": "question",
      "title": {
        "tr": "Aktif Soru: Biyoizosterler Aynı Element Grubunda mı Olmalıdır?",
        "ar": "سؤال تفاعلي: هل يجب أن تنتمي المتشابهات لنفس المجموعة؟",
        "en": "Active Question: Must Bioisosteres Share Element Families?"
      },
      "prompt": {
        "tr": "Bir öncü ilaçta biyoizosterik değişim yaparken, yer değiştiren atom veya fonksiyonel grupların periyodik tabloda mutlaka aynı dikey sütunda (aynı element ailesinde) yer alması zorunlu mudur?",
        "ar": "عند إجراء استبدال بيوإيزوستيري في دواء طليعي، هل يشترط حتماً أن تنتمي الذرات أو المجموعات المتبادلة لنفس العمود الرأسي (نفس العائلة) في الجدول الدوري؟",
        "en": "When designing bioisosteric replacements in a lead drug, is it strictly mandatory that exchanging atoms or functional groups belong to the exact same vertical column in the periodic table?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-2a",
            "text": {
              "tr": "Hayır; Grimm hidrit kuralına göre farklı gruptaki atomlar hidrojen eklenerek (psödoatom oluşturarak) birbirinin değerlik elektronunu ve hacmini taklit edebilir.",
              "ar": "كلا؛ وفق قاعدة إزاحة هيدريد Grimm، يمكن لذرات من مجموعات مختلفة محاكاة إلكترونات وحجم بعضها عند إضافة الهيدروجين لتشكيل ذرات زائفة.",
              "en": "No; Grimm's hydride displacement law proves atoms from different groups mimic each other's valence electrons and volume when bonded to hydrogen."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Harika! C (Grup 14), N (Grup 15), O (Grup 16) ve F (Grup 17) farklı sütunlardadır; ancak -CH3, -NH2, -OH ve -F gruplarının hepsi 9 değerlik elektronlu monovalan izosterlerdir.",
              "ar": "ممتاز! تنتمي عناصر C و N و O و F لأعمدة مختلفة، لكن مجموعات -CH3 و -NH2 و -OH و -F جميعها إيزوستيرات أحادية التكافؤ بـ 9 إلكترونات تكافؤ خارجية.",
              "en": "Brilliant! C, N, O, and F occupy distinct columns, yet -CH3, -NH2, -OH, and -F form an identical 9-electron monovalent pseudoatom family."
            }
          },
          {
            "id": "opt-2b",
            "text": {
              "tr": "Evet; kimyasal benzerlik yalnızca aynı gruptaki elementler (örneğin yalnızca F, Cl, Br, I arasında) geçerlidir.",
              "ar": "نعم؛ التشابه الكيميائي ينطبق حصراً على عناصر نفس المجموعة الرأسية (مثل التبادل بين F و Cl و Br فقط).",
              "en": "Yes; chemical similarity strictly applies only to elements within the exact same vertical family (e.g., exclusively F, Cl, Br, I)."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Element ailesi yanılgısı: Yalnızca aynı sütun elemanları değil; farklı sütun atomları hidrit alarak (Grimm psödoatomları: -CH3 ~ -NH2 ~ -OH ~ -F) kusursuz izosterler oluşturur.",
              "ar": "خطأ العائلة الواحدة: لا يقتصر الأمر على نفس العمود؛ إذ تكتسب الذرات هيدريدات لتشكل إيزوستيرات مثالية (-CH3 ~ -NH2 ~ -OH ~ -F).",
              "en": "Same-column misconception: Isosterism transcends periodic families; different group elements acquire hydrides to form cross-column pseudoatoms."
            }
          },
          {
            "id": "opt-2c",
            "text": {
              "tr": "Evet; çünkü farklı periyot ve gruptaki atomların elektronegatiflikleri daima zıt olmak zorundadır.",
              "ar": "نعم؛ لأن الكهروسلبية لذرات المجموعات المختلفة يجب أن تكون متعاكسة دوماً.",
              "en": "Yes; because atoms from different groups must possess completely opposing electronegativities."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Elektronegatiflik yanılgısı: Elektronegatiflik periyot boyunca kademeli değişir; karbon, azot ve oksijen benzer boyutlarda kovalent bağ kurabilir.",
              "ar": "خطأ الكهروسلبية: تتغير الكهروسلبية تدريجياً، وتستطيع ذرات C و N و O تشكيل روابط تساهمية بأبعاد متقاربة.",
              "en": "Electronegativity misconception: Electronegativity gradients vary smoothly, allowing C, N, O, and F fragments to exhibit compatible bonding geometries."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "Grimm hidrit kuralı", "arContext": "قاعدة إزاحة هيدريد Grimm" },
        { "term": "psödoatom", "arContext": "الذرة الزائفة (pseudoatom)" }
      ],
      "hints": [
        {
          "tr": "Karbon (Grup 14), azot (Grup 15), oksijen (Grup 16) ve flor (Grup 17) gruplarını düşünün.",
          "ar": "تأمل عناصر الكربون (المجموعة 14) والنيتروجين (15) والأكسجين (16) والفلور (17).",
          "en": "Examine Carbon (Group 14), Nitrogen (Group 15), Oxygen (Group 16), and Fluorine (Group 17)."
        },
        {
          "tr": "-CH3, -NH2, -OH ve -F gruplarının değerlik elektron sayılarını toplayın. Ne fark ettiniz?",
          "ar": "اجمع إلكترونات التكافؤ للمجموعات: -CH3 و -NH2 و -OH و -F. ماذا تلاحظ؟",
          "en": "Sum outer valence electrons for -CH3, -NH2, -OH, and -F. Notice any pattern?"
        },
        {
          "tr": "Grimm yasasına göre farklı gruplardaki atomlar hidrojen kazanarak aynı değerlik kabuğunu (psödoatom) oluşturur; aynı sütunda olma şartı yoktur.",
          "ar": "وفق قانون غريم، تكتسب الذرات هيدروجينات لتتطابق في غلاف التكافؤ الخارجي دون اشتراط وجودها في نفس العمود.",
          "en": "By Grimm's law, atoms across different periodic columns gain hydrides to form isoelectronic pseudoatoms; vertical family matching is not required."
        }
      ],
      "sources": [{ "file": "Biyoizosterizm.pdf", "page": 3 }]
    },
    {
      "id": "mc-mod3-les1-step-03",
      "stage": "intuition",
      "stageIndex": 3,
      "type": "intuition",
      "title": {
        "tr": "Sezgisel Model: Grimm'in Atomik Kamuflajı",
        "ar": "النموذج الحسي: تمويه غريم الذري",
        "en": "Intuitive Mental Model: Grimm's Atomic Camouflage"
      },
      "prompt": {
        "tr": "Bir askere sahte rütbe işareti takıldığında bir üst rütbeli gibi görünür. Periyodik tablodaki bir atoma bir proton ve elektron (H•) taktığınızda neden bir sonraki grubun atomu gibi davranır?",
        "ar": "تخيل جندياً يرتدي شارة رتبة أعلى ليبدو كضابط. عندما تضيف بروتوناً وإلكتروناً (H•) لذرة في الجدول الدوري، لماذا تتصرف كعنصر المجموعة التالية؟",
        "en": "Imagine a soldier donning a higher badge to disguise as the next rank. When you attach a proton and electron (H•) to an atom, why does it mimic the next periodic group?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-3a",
            "text": {
              "tr": "Eklenen hidrojen değerlik kabuğuna tam 1 elektron katar; çekirdek yüküyle birlikte atomun dış kabuk elektron sayısı bir sağındaki gruba eşitlenir.",
              "ar": "يمنح الهيدروجين المضاف إلكتروناً واحداً لغلاف التكافؤ، ليتطابق عدد إلكترونات الغلاف الخارجي تماماً مع عنصر المجموعة المجاورة.",
              "en": "The added hydrogen contributes exactly 1 valence electron, aligning the outer shell electron count with the adjacent periodic group."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Tam olarak öyle! Karbon (4 valans) + 3H = 7 valans (-CH3). Azot (5 valans) + 2H = 7 valans (-NH2). Oksijen (6 valans) + 1H = 7 valans (-OH). Flor (7 valans). Hepsi 7 valans elektronlu monovalan kamufle psödoatomlardır.",
              "ar": "بالضبط! كربون (4) + 3H = 7 (-CH3). نيتروجين (5) + 2H = 7 (-NH2). أكسجين (6) + 1H = 7 (-OH). فلور (7). تشكل جميعها ذرات زائفة أحادية التكافؤ بـ 7 إلكترونات.",
              "en": "Spot on! Carbon (4 valence) + 3H = 7 valence (-CH3). Nitrogen (5 valence) + 2H = 7 (-NH2). Oxygen (6 valence) + 1H = 7 (-OH). Fluorine = 7. All are 7-electron monovalent pseudoatoms."
            }
          },
          {
            "id": "opt-3b",
            "text": {
              "tr": "Hidrojen atomu ana atomun çekirdeğini nükleer füzyonla dönüştürerek yeni bir elemente çevirir.",
              "ar": "يقوم الهيدروجين باندماج نووي يغير نواة الذرة الأصلية لعنصر جديد كلياً.",
              "en": "The hydrogen atom triggers nuclear fusion, transmuting the core nucleus into a new element."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Nükleer füzyon yanılgısı: Bu bir nükleer tepkime değil, kimyasal kovalent bağ ve değerlik elektronu düzenlenmesidir.",
              "ar": "خطأ الاندماج النووي: هذا تفاعل تساهمي وإعادة ترتيب لإلكترونات التكافؤ، وليس اندماجاً نووياً للأنوية.",
              "en": "Nuclear transmutation misconception: Hydride displacement is electronic valence camouflage via covalent bonding, not nuclear transmutation."
            }
          },
          {
            "id": "opt-3c",
            "text": {
              "tr": "Hidrojen moleküldeki tüm kovalent bağları kopararak serbest radikal fırtınası başlatır.",
              "ar": "يحطم الهيدروجين كافة الروابط التساهمية مشعلاً عاصفة من الجذور الحرة.",
              "en": "The hydrogen shears all existing covalent bonds, generating a destructive radical storm."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Radikalik yıkım yanılgısı: Grimm kuralı stabil kovalent bağlar ve kararlı psödoatomlar üretir.",
              "ar": "خطأ الجذور الحرة: تنتج قاعدة غريم جزيئات تساهمية مستقرة تماماً ولا تطلق جذوراً حرة مخربة.",
              "en": "Radical storm misconception: Grimm's law yields stable, ground-state covalent pseudoatoms, not reactive free radicals."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "değerlik elektronu", "arContext": "إلكترون التكافؤ (valence electron)" },
        { "term": "psödoatom", "arContext": "الذرة الزائفة" }
      ],
      "hints": [
        {
          "tr": "Hidrojen atomunun değerlik kabuğuna kaç elektron katkı sağladığını düşünün.",
          "ar": "كم إلكتروناً تضيف ذرة الهيدروجين إلى غلاف التكافؤ الخارجي؟",
          "en": "How many valence electrons does a single hydrogen atom contribute?"
        },
        {
          "tr": "C (4e) + 1H -> 5e (N gibi). C (4e) + 2H -> 6e (O gibi). C (4e) + 3H -> 7e (Halojen gibi).",
          "ar": "كربون (4) + H يماثل نيتروجين (5). كربون (4) + 2H يماثل أكسجين (6). كربون (4) + 3H يماثل هالوجين (7).",
          "en": "C (4e) + 1H -> 5e (like N). C (4e) + 2H -> 6e (like O). C (4e) + 3H -> 7e (like Halogen)."
        },
        {
          "tr": "Her eklenen H• değerlik kabuğunu 1 elektron artırır; bu sayede -CH3, -NH2, -OH ve -F grupları aynı dış değerlik elektronuna sahip psödoatomlar haline gelir.",
          "ar": "تزيد كل ذرة H الغلاف بإلكترون واحد؛ لتصبح مجموعات -CH3 و -NH2 و -OH و -F ذرات زائفة بنفس إلكترونات التكافؤ الخارجية.",
          "en": "Each added hydride shifts valence by +1, creating isoelectronic pseudoatoms across -CH3, -NH2, -OH, and -F."
        }
      ],
      "sources": [{ "file": "Biyoizosterizm.pdf", "page": 4 }]
    },
    {
      "id": "mc-mod3-les1-step-04",
      "stage": "visual_explanation",
      "stageIndex": 4,
      "type": "visual_explanation",
      "title": {
        "tr": "Görsel Değerlik Mimarisi: Grimm Tablosu ve Langmuir İzosterleri",
        "ar": "الهندسة البصرية للتكافؤ: جدول غريم وإيزوستيرات لانغموير",
        "en": "Visual Valence Architecture: Grimm's Table & Langmuir Isosteres"
      },
      "prompt": {
        "tr": "Langmuir, N2O ve CO2 gazlarının 20°C'de birebir aynı viskoziteye (148 x 10^-6 Pa·s) ve dansiteye sahip olduğunu kanıtlamıştır. Bu fiziksel özdeşliğin kuantum ve elektronik temeli nedir?",
        "ar": "أثبت لانغموير أن غازي N2O و CO2 يمتلكان نفس اللزوجة تماماً (148 x 10^-6 Pa·s) والكثافة عند 20°C. ما هو الأساس الكمي والإلكتروني لهذا التطابق؟",
        "en": "Langmuir proved that N2O and CO2 gases possess identical viscosity (148 x 10^-6 Pa·s) and density at 20°C. What is the fundamental quantum and electronic basis for this physical identity?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-4a",
            "text": {
              "tr": "Her iki molekül de 16 değerlik elektronu, 22 toplam elektron ve özdeş doğrusal geometriye sahiptir; dış elektron bulutları neredeyse ayırt edilemezdir.",
              "ar": "يمتلك كلا الجزيئين 16 إلكترون تكافؤ، و22 إلكتروناً كلياً، وهندسة خطية متطابقة، مما يجعل السحب الإلكترونية الخارجية متماثلة تماماً.",
              "en": "Both molecules share 16 valence electrons, 22 total electrons, and identical linear geometries, creating virtually indistinguishable electron clouds."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Doğru! N2O ve CO2 klasik Langmuir izosterleridir. Aynı elektron sayısı ve uzaysal orbital dağılımı viskozite, kırılma indisi ve dielektrik sabiti gibi fiziksel özellikleri ikiz kardeş yapar.",
              "ar": "صحيح! N2O و CO2 إيزوستيران كلاسيكيان وفق لانغموير. تماثل إلكترونات التكافؤ والهندسة الفراغية يولد تطابقاً شبه تام في اللزوجة والكثافة ومعامل الانكسار.",
              "en": "Correct! N2O and CO2 are classical Langmuir isosteres. Matching valence electrons (16) and linear geometries generate near-identical fluid viscosities and dielectric properties."
            }
          },
          {
            "id": "opt-4b",
            "text": {
              "tr": "Her iki molekülde de tüm atomlar karbon atomuna dönüşmüştür.",
              "ar": "تحولت كافة الذرات في كلا الجزيئين إلى ذرات كربون متماثلة.",
              "en": "All constituent atoms in both gases have transmuted into carbon."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Atomik dönüşüm yanılgısı: N2O azot ve oksijenden, CO2 karbon ve oksijenden oluşur; benzerlik atom çekirdeklerinden değil değerlik kabuğu elektron dağılımından kaynaklanır.",
              "ar": "خطأ التماثل الذري: يتركب N2O من نيتروجين وأكسجين، بينما CO2 من كربون وأكسجين؛ التماثل ينبع من الغلاف الإلكتروني الخارجي.",
              "en": "Atomic identity misconception: The gases possess different atomic nuclei; identical properties arise from shared valence electron counts and geometries."
            }
          },
          {
            "id": "opt-4c",
            "text": {
              "tr": "N2O ve CO2 gazları sadece sıvı helyum sıcaklığında (-269°C) aynı davranışı sergiler.",
              "ar": "يتصرف الغازان بشكل متماثل فقط عند درجة حرارة الهيليوم السائل (-269°C).",
              "en": "N2O and CO2 behave identically only near absolute zero in liquid helium."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Sıcaklık kısıtı yanılgısı: Tablo verileri oda sıcaklığında (20°C) tam eşit viskoziteyi göstermektedir.",
              "ar": "خطأ الحرارة: بيانات سلايدات الجامعة تثبت تطابق اللزوجة عند درجة حرارة الغرفة (20°C).",
              "en": "Temperature misconception: Slide 2 data confirms identical viscosity measured at ambient room temperature (20°C)."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "Langmuir izosteri", "arContext": "إيزوستير لانغموير (Langmuir isostere)" },
        { "term": "değerlik kabuğu", "arContext": "غلاف التكافؤ" }
      ],
      "hints": [
        {
          "tr": "N (7e x 2) + O (8e) = 22 elektron. C (6e) + O (8e x 2) = 22 elektron.",
          "ar": "احسب الإلكترونات: N (7×2) + O (8) = 22 إلكتروناً. C (6) + O (8×2) = 22 إلكتروناً.",
          "en": "Total electrons: N (7x2) + O (8) = 22. C (6) + O (8x2) = 22."
        },
        {
          "tr": "Değerlik elektronlarını sayın: N2O (5+5+6 = 16), CO2 (4+6+6 = 16).",
          "ar": "إلكترونات التكافؤ الخارجية: N2O (5+5+6 = 16) و CO2 (4+6+6 = 16).",
          "en": "Valence electrons: N2O (5+5+6 = 16), CO2 (4+6+6 = 16)."
        },
        {
          "tr": "Eşit değerlik elektronu (16) ve toplam elektron (22) sayısı ile lineer 3 atomlu geometri Langmuir izosterizminin kusursuz kanıtıdır.",
          "ar": "تطابق إلكترونات التكافؤ (16) والإلكترونات الكلية (22) مع الهندسة الخطية هو برهان إيزوستيرية لانغموير الكلاسيكية.",
          "en": "Matching 16 valence electrons, 22 total electrons, and triatomic linear geometry define classical Langmuir isosteres."
        }
      ],
      "sources": [{ "file": "Biyoizosterizm.pdf", "page": 2 }]
    },
    {
      "id": "mc-mod3-les1-step-05",
      "stage": "interactive_artifact",
      "stageIndex": 5,
      "type": "structure_identifier",
      "widgetType": "StructureIdentifier",
      "title": {
        "tr": "İnteraktif Laboratuvar: Biyoizosterik Köprü Tanımlayıcı",
        "ar": "مختبر تفاعلي: محدد الجسور البيوإيزوستيرية",
        "en": "Interactive Lab: Bioisosteric Pharmacophore Identifier"
      },
      "prompt": {
        "tr": "Difenhidramin antihistaminik molekülünü inceleyin. İki aromatik halka ile bazik amin arasındaki klasik bivalan (iki değerlikli) biyoizosterik köprü oksijen atomunu (-O-) seçerek doğrulayın.",
        "ar": "تأمل جزيء مضاد الهيستامين diphenhydramine. حدد ذرة أكسجين الجسر البيوإيزوستيري ثنائي التكافؤ (-O-) الواقعة بين الحلقتين والأمين القاعدي.",
        "en": "Inspect the antihistamine diphenhydramine. Locate and select the classical bivalent bioisosteric bridge oxygen atom (-O-) positioned between the aromatic rings and basic amine."
      },
      "predictThenReveal": false,
      "config": {
        "title": "Difenhidramin Bivalan İzosterik Köprüsü",
        "prompt": "Moleküldeki bivalan (-O-) biyoizosterik köprü atomunu seçin.",
        "moleculeName": "Difenhidramin (Diphenhydramine)",
        "smiles": "O(CCN(C)C)C(c1ccccc1)c2ccccc2",
        "atoms": [
          {
            "id": "atom_O",
            "label": "-O- (Bivalan Eter Köprüsü)",
            "x": 200,
            "y": 120,
            "isTarget": true,
            "hintName": "Eter Oksijeni",
            "distractorRationale": "Doğru bivalan biyoizosterik köprü! -CH2-, -NH- veya -S- ile değiştirilebilir."
          },
          {
            "id": "atom_CH",
            "label": "CH (Metin Karbonu)",
            "x": 140,
            "y": 120,
            "isTarget": false,
            "hintName": "Santral Karbon",
            "distractorRationale": "Bu atom iki fenil halkasını bağlayan santral kiral metin karbonudur, izosterik köprü değildir."
          },
          {
            "id": "atom_N",
            "label": "N (Tersiyer Amin Azotu)",
            "x": 320,
            "y": 120,
            "isTarget": false,
            "hintName": "Bazik Amin Azotu",
            "distractorRationale": "Tersiyer amin azotu katyonik farmakofordur, bivalan omurga köprüsü değildir."
          },
          {
            "id": "atom_Ph1",
            "label": "Ph1 (Aromatik Halka 1)",
            "x": 80,
            "y": 70,
            "isTarget": false,
            "hintName": "Fenil Halkası 1",
            "distractorRationale": "Fenil halkası monovalan aril grubudur."
          },
          {
            "id": "atom_Ph2",
            "label": "Ph2 (Aromatik Halka 2)",
            "x": 80,
            "y": 170,
            "isTarget": false,
            "hintName": "Fenil Halkası 2",
            "distractorRationale": "Fenil halkası monovalan aril grubudur."
          }
        ],
        "bonds": [
          { "from": "atom_Ph1", "to": "atom_CH", "order": "single" },
          { "from": "atom_Ph2", "to": "atom_CH", "order": "single" },
          { "from": "atom_CH", "to": "atom_O", "order": "single" },
          { "from": "atom_O", "to": "atom_N", "order": "single" }
        ],
        "targetDescription": "İki aril halkası ile amin zincirini bağlayan bivalan eter oksijeni (-O-)",
        "explanation": "Bivalan köprü oksijeni (-O-), Grimm hidrit serisinde -NH-, -CH2- ve -S- ile tam izosterdir; bu köprünün değişimi etanolamin, etilendiamin ve propilamin antihistaminik sınıflarını türetir.",
        "source": {
          "file": "Biyoizosterizm.pdf",
          "page": 13
        }
      },
      "technicalTerms": [
        { "term": "bivalan izoster", "arContext": "إيزوستير ثنائي التكافؤ (bivalent isostere)" },
        { "term": "antihistaminik farmakofor", "arContext": "فارماكوفور مضادات الهيستامين" }
      ],
      "hints": [
        {
          "tr": "Santral CH karbonu ile dimetilaminoetil zinciri arasındaki köprü atomunu arayın.",
          "ar": "ابحث عن ذرة الجسر الرابطة بين كربون CH وسلسلة ثنائي ميثيل أمينو إيثيل.",
          "en": "Look for the bridging atom connecting the central CH carbon to the dimethylaminoethyl chain."
        },
        {
          "tr": "Difenhidramin bir aminoalkil eterdir; köprü atomu oksijendir (-O-).",
          "ar": "ديفينهيدرامين هو إيثر أمينو ألكيل؛ وذرة الجسر هي الأكسجين (-O-).",
          "en": "Diphenhydramine is an aminoalkyl ether; its core connecting bridge atom is oxygen (-O-)."
        },
        {
          "tr": "-O- atomunu seçin. Bu köprü -NH- (pirilamin) veya -CH2- (klorfeniramin) ile biyoizosteriktir.",
          "ar": "اختر ذرة الأكسجين (-O-). هذا الجسر متكافئ حيوياً مع -NH- ومع -CH2-.",
          "en": "Select the -O- atom. This bridge is classically bioisosteric with -NH- (pyrilamine) and -CH2- (chlorpheniramine)."
        }
      ],
      "sources": [{ "file": "Biyoizosterizm.pdf", "page": 13 }]
    },
    {
      "id": "mc-mod3-les1-step-06",
      "stage": "guided_discovery",
      "stageIndex": 6,
      "type": "guided_discovery",
      "title": {
        "tr": "Rehberli Keşif: Hansberg Kuralı ve Tiyofen-Benzen Eşdeğerliği",
        "ar": "استكشاف موجه: قاعدة هانسبرغ وتكافؤ الثيوفين والبنزين",
        "en": "Guided Discovery: The Hansberg Rule & Ring Equivalence"
      },
      "prompt": {
        "tr": "Benzen halkasındaki iki karbonlu -CH=CH- grubu çıkarılıp yerine tek bir kükürt atomu (-S-) takıldığında tiyofen halkası oluşur. Bu değişim aromatikliği ve reseptör uyumunu nasıl korur?",
        "ar": "عند استبدال مجموعة -CH=CH- ثنائية الكربون في البنزين بذرة كبريت واحدة (-S-)، يتكون الثيوفين. كيف يحافظ هذا التبديل على العطرية والتطابق مع المستقبل؟",
        "en": "Replacing a two-carbon -CH=CH- segment of benzene with a single divalent sulfur atom (-S-) yields thiophene. How does this maintain aromaticity and receptor fit?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-6a",
            "text": {
              "tr": "Kükürt atomu 2 değerlik elektronunu ve d-orbitallerini aromatik pi-bulutuna katarak 6 pi elektronlu Hückel aromatik rezonansını ve benzer halka çevresini korur.",
              "ar": "تشارك ذرة الكبريت بزوج إلكتروني ومدارات d في سحابة باي، محققة رنين هوكل العطري بـ 6 إلكترونات ومحيطاً جزيئياً مكافئاً.",
              "en": "Sulfur donates 2 valence electrons and utilizes d-orbitals to sustain a 6 pi-electron Hückel aromatic resonance with similar steric perimeter."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kusursuz keşif! Hansberg kuralı gereğince -CH=CH- (iki sp2 karbonu, 2 pi elektronu) ile -S- (kükürtün serbest çifti, 2 elektron) elektronik ve uzaysal olarak denktir. Tiyofen benzenin kusursuz halka izosteridir.",
              "ar": "اكتشاف متقن! وفق قاعدة هانسبرغ، يتطابق -CH=CH- مع -S- إلكترونياً وفراغياً؛ مما يجعل الثيوفين إيزوستيراً حلقياً نموذجياً للبنزين.",
              "en": "Superb discovery! By the Hansberg rule, -CH=CH- (2 pi electrons) and divalent -S- (lone pair donation) are isoelectronic ring equivalents, maintaining a 6 pi aromatic sextet."
            }
          },
          {
            "id": "opt-6b",
            "text": {
              "tr": "Kükürt atomu benzeni anında parçalayarak düz zincirli bir alkene çevirir.",
              "ar": "تحطم ذرة الكبريت حلقة البنزين فوراً محولة إياها إلى ألكين خطي مفتوح.",
              "en": "The sulfur atom instantly disrupts the ring into an open-chain aliphatic alkene."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Halka parçalanma yanılgısı: Tiyofen son derece kararlı 5-üyeli aromatik bir halkadır; halka açılması olmaz.",
              "ar": "خطأ انكسار الحلقة: الثيوفين حلقة خماسية عطرية شديدة الثبات ولا تتحلل لسلسلة مفتوحة.",
              "en": "Ring opening misconception: Thiophene is an exceptionally stable 5-membered aromatic heteroaryl ring, not an acyclic fragment."
            }
          },
          {
            "id": "opt-6c",
            "text": {
              "tr": "Tiyofen aromatik değildir; tamamen apolar bir sikloalkandır.",
              "ar": "الثيوفين مركب غير عطري، بل هو سيكلوألكان لاقطبي بالكامل.",
              "en": "Thiophene lacks aromaticity; it is purely a saturated nonpolar cycloalkane."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Aromatiklik yanılgısı: Tiyofen kükürtün ortaklanmamış elektron çifti sayesinde [4n+2] pi elektron kuralına tam uyan aromatik bir heteroarildir.",
              "ar": "خطأ اللاعطرية: الثيوفين مركب عطري بامتياز يحقق قاعدة هوكل [4n+2] عبر مساهمة زوج إلكترونات الكبريت.",
              "en": "Non-aromatic misconception: Thiophene satisfies Hückel's [4n+2] rule through sulfur lone-pair delocalization, exhibiting strong aromatic resonance."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "Hansberg kuralı", "arContext": "قاعدة هانسبرغ (Hansberg rule)" },
        { "term": "halka ekivalanı", "arContext": "المكافئ الحلقي (ring equivalent)" }
      ],
      "hints": [
        {
          "tr": "Benzen 6 pi elektronuna sahiptir. Tiyofende 4 karbon (4 pi) + kükürtün elektron çifti (2e) kaç eder?",
          "ar": "يمتلك البنزين 6 إلكترونات باي. في الثيوفين: 4 إلكترونات من الكربون + زوج إلكتروني من الكبريت = ؟",
          "en": "Benzene has 6 pi electrons. In thiophene: 4 pi electrons from carbons + 2 from sulfur = ?"
        },
        {
          "tr": "Hückel kuralını hatırlayın: 4n + 2 = 6 pi elektronu. Kükürtün serbest elektron çifti pi sistemine delokalize olur.",
          "ar": "تذكر قاعدة هوكل: 4n + 2 = 6 إلكترونات باي. يتشارك زوج الكبريت في الرنين الحلقي.",
          "en": "Recall Hückel's rule: 4n + 2 = 6 pi electrons. Sulfur's lone pair delocalizes into the aromatic ring."
        },
        {
          "tr": "Hansberg kuralına göre -CH=CH- ile -S- biyoizosterik halka ekivalanıdır; kükürtün d-orbitalleri rezonansı güçlendirir.",
          "ar": "وفق قاعدة هانسبرغ، يعتبر -CH=CH- و -S- مكافئين حلقيين بيوإيزوستيريين؛ وتعزز مدارات d للكبريت الرنين.",
          "en": "By the Hansberg rule, -CH=CH- and -S- are classical ring equivalents, preserving aromatic planar binding geometry."
        }
      ],
      "sources": [{ "file": "Biyoizosterizm.pdf", "page": 4 }]
    },
    {
      "id": "mc-mod3-les1-step-07",
      "stage": "formal_explanation",
      "stageIndex": 7,
      "type": "formal_explanation",
      "title": {
        "tr": "Formal Farmakoloji: H1-Antihistaminik Köprü Evrimi",
        "ar": "الدوائيات المنهجية: تطور جسور مضادات الهيستامين H1",
        "en": "Formal Pharmacology: H1-Antihistamine Bridge Evolution"
      },
      "prompt": {
        "tr": "Genel H1-antihistaminik yapısında Ar1(Ar2)CH-X-(CH2)2-N(CH3)2 köprüsü bulunur. X atomu -O-'dan (difenhidramin) -CH2-'ye (klorfeniramin) dönüştürüldüğünde klinik sedasyon neden sert biçimde düşer?",
        "ar": "في الصيغة العامة لمضادات H1: Ar1(Ar2)CH-X-(CH2)2-N(CH3)2. عندما يستبدل الجسر X من -O- (ديفينهيدرامين) إلى -CH2- (كلورفينيرامين)، لماذا ينخفض النعاس بشدة؟",
        "en": "In the general H1-antihistamine pharmacophore Ar1(Ar2)CH-X-(CH2)2-N(CH3)2, when bridge X transitions from -O- (diphenhydramine) to -CH2- (chlorpheniramine), why does clinical sedation drop sharply?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-7a",
            "text": {
              "tr": "Eter oksijeninin (-O-) kalkması santral antikolinerjik muskarinik afiniteyi azaltır; propilamin köprüsü (-CH2-) periferik H1 seçiciliğini artırarak MSS sedasyonunu düşürür.",
              "ar": "يزيل نزع الأكسجين الألفة للمستقبلات المسكارينية المركزية؛ ويعزز جسر البروبيل أمين (-CH2-) الانتقائية لمستقبل H1 المحيطي مخفضاً النعاس.",
              "en": "Replacing the ether oxygen (-O-) diminishes central muscarinic anticholinergic affinity; the propylamine chain (-CH2-) enhances peripheral H1 selectivity, reducing sedation."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Doğru! X = -O- (etanolaminler) güçlü antikolinerjik etkiyle derin sedasyon yapar (Benadryl). X = -CH2- (alkilaminler/propilaminler) ise muskarinik afiniteyi düşürür, H1 potansiyelini korur ve sedasyonu minimize eder.",
              "ar": "صحيح! يمنح جسر -O- تأثيراً مسكارينياً منوماً قوياً؛ بينما يلغي جسر -CH2- التأثير المسكاريني محافظاً على قوة H1 بانخفاض ملموس في النعاس.",
              "en": "Correct! The ether oxygen (-O-) mimics acetylcholine's ester oxygen, driving central M1 sedation (diphenhydramine); the -CH2- propylamine link strips muscarinic affinity while retaining potent H1 blockade."
            }
          },
          {
            "id": "opt-7b",
            "text": {
              "tr": "-CH2- köprüsü kan-beyin bariyerini aşamayacak kadar devasa bir kovalent polimere dönüşür.",
              "ar": "يتحول جسر -CH2- إلى بوليمر تساهمي ضخم يعجز تماماً عن عبور الحاجز الدماغي الدموي.",
              "en": "The -CH2- bridge polymerizes into a massive macromolecule completely barred from crossing the BBB."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Polimerleşme yanılgısı: Tek bir metilen grubu polimerleşmez; molekül küçük, lipofilik bir propilamindir.",
              "ar": "خطأ البلمرة: ذرة الميثيلين المفردة لا تتبلمر؛ الجزيء مركب صغير محب للدهن يخترق الأغشية بكفاءة.",
              "en": "Polymerization misconception: An aliphatic methylene unit does not self-polymerize; chlorpheniramine remains a small, highly diffusable small molecule."
            }
          },
          {
            "id": "opt-7c",
            "text": {
              "tr": "Klorfeniramin antihistaminik etkisini tamamen kaybederek bir antibiyotiğe dönüşür.",
              "ar": "يفقد كلورفينيرامين تأثيره المضاد للهيستامين بالكامل ويتحول إلى مضاد حيوي.",
              "en": "Chlorpheniramine completely loses antihistaminic properties and turns into an antibiotic."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Aktivite kaybı yanılgısı: Klorfeniramin tarihin en güçlü klasik H1-antihistaminiklerinden biridir; etki kaybolmaz, yan etki profili düzelir.",
              "ar": "خطأ فقدان التأثير: كلورفينيرامين من أقوى مضادات الهيستامين تاريخياً؛ تحسن انتقائيته يقلل الآثار الجانبية فقط.",
              "en": "Loss of activity misconception: Chlorpheniramine is among the most potent first-generation H1 antagonists known; its selectivity profile simply sharpens."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "etanolamin antihistaminik", "arContext": "مضادات الهيستامين الإيثانولامينية" },
        { "term": "propilamin antihistaminik", "arContext": "مضادات الهيستامين البروبيل أمينية" }
      ],
      "hints": [
        {
          "tr": "Difenhidraminin uyku yapıcı etkisi H1 blokajının yanı sıra muskarinik M1 reseptörlerini de güçlü bloke etmesinden kaynaklanır.",
          "ar": "ينجم نعاس ديفينهيدرامين عن إحصار مستقبلات المسكارين M1 بالإضافة إلى إحصار H1.",
          "en": "Diphenhydramine's drowsiness stems from off-target central muscarinic M1 blockade alongside H1 antagonism."
        },
        {
          "tr": "Köprüdeki oksijen (-O-) asetilkolin ester oksijenini taklit eder; -CH2- ise bu antikolinerjik taklidi bozar.",
          "ar": "يحاكي أكسجين الإيثر (-O-) أكسجين الأستيل كولين، بينما يكسر جسر -CH2- هذا التشابه المسكاريني.",
          "en": "The ether oxygen (-O-) mimics the ester oxygen of acetylcholine; replacing it with -CH2- abrogates muscarinic cross-reactivity."
        },
        {
          "tr": "Eterden (-O-) alkile (-CH2-) geçiş muskarinik yan etkiyi ve sedasyonu azaltırken yüksek H1 antihistaminik gücü korur.",
          "ar": "يحافظ الانتقال من الإيثر (-O-) إلى الألكيل (-CH2-) على فاعلية H1 مع خفض الآثار الجانبية المسكارينية والنعاس.",
          "en": "Switching from ether (-O-) to alkyl (-CH2-) preserves potent H1 blockade while stripping anticholinergic sedative liability."
        }
      ],
      "sources": [{ "file": "Biyoizosterizm.pdf", "page": 13 }]
    },
    {
      "id": "mc-mod3-les1-step-08",
      "stage": "concept_check",
      "stageIndex": 8,
      "type": "concept_check",
      "title": {
        "tr": "Kavram Kontrolü: 2-Tiyenilalanin ve Biyoizosterik Antagonizma",
        "ar": "فحص المفاهيم: 2-ثينيل ألانين والمناهضة الاستقلابية",
        "en": "Concept Check: 2-Thienylalanine & Bioisosteric Antagonism"
      },
      "prompt": {
        "tr": "Doğal amino asit fenilalanindeki fenil halkası yerine tiyofen halkası konulursa (2-tiyenilalanin) biyolojik sonuç ne olur? Biyoizosterler daima ana molekül gibi agonist mi davranır?",
        "ar": "إذا استبدلت حلقة الفينيل في الحمض الأميني الطبيعي فينيل ألانين بحلقة ثيوفين (2-thienylalanine)، فما النتيجة البيولوجية؟ هل تعمل المتشابهات كمنبهات دوماً؟",
        "en": "What occurs biologically when the phenyl ring of natural phenylalanine is replaced with thiophene (2-thienylalanine)? Do bioisosteres always act as agonists like the parent molecule?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-8a",
            "text": {
              "tr": "Hayır; 2-tiyenilalanin fenilalanin t-RNA sentetaz enzimini yarışmalı bloke eden öldürücü bir antimetabolit (antagonist) haline gelir.",
              "ar": "كلا؛ يتحول 2-thienylalanine إلى مضاد استقلاب (antimetabolite) قاتل يثبط أنزيم فينيل ألانين t-RNA sentetaz تنافسياً.",
              "en": "No; 2-thienylalanine becomes a lethal antimetabolite (antagonist) competitively blocking phenylalanine t-RNA synthetase."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Mükemmel kavram kavrayışı! Biyoizosterizm her zaman benzer etki (agonist) doğurmaz. Reseptör veya enzime bağlanıp katalitik fonksiyonu bozarak güçlü antimetabolit/antagonist etki yaratabilir (Slide 14).",
              "ar": "فهم استثنائي! لا تنتج البيوإيزوستيرية منبهاً دوماً؛ بل ترتبط بالموقع الفعال معطلة الوظيفة الحيوية كمضاد استقلاب حاسم.",
              "en": "Outstanding conceptual mastery! Bioisosterism frequently yields competitive antagonists or antimetabolites that dock into catalytic pockets but block turnover."
            }
          },
          {
            "id": "opt-8b",
            "text": {
              "tr": "Evet; biyoizosterizm tanımı gereği oluşan tüm türevler ana molekülle birebir aynı agonistik proteini sentezletir.",
              "ar": "نعم؛ بحكم تعريف البيوإيزوستيرية يجب أن تنتج كافة المشتقات نفس البروتين الطبيعي بنفس الفعالية.",
              "en": "Yes; by definition, all bioisosteres must yield identical agonistic physiological protein synthesis."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Zorunlu agonist yanılgısı: En yaygın öğrenci yanılgısı biyoizosterlerin mutlaka agonist olacağıdır. Biyoizosterik antimetabolitler (5-FU, 2-tiyenilalanin, sülfanilamid) enzim blokajı yapar.",
              "ar": "خطأ التنبيه الإجباري: أشهر الأخطاء الشائعة؛ فمضادات الاستقلاب (5-FU وثينيل ألانين) إيزوستيرات حيوية تعطل الأنزيمات.",
              "en": "Obligate agonist misconception: Bioisosteric replacement frequently generates potent antimetabolites (5-FU, sulfonamides, 2-thienylalanine) that abort enzymatic pathways."
            }
          },
          {
            "id": "opt-8c",
            "text": {
              "tr": "Tiyofen halkası insan vücudunda derhal sülfürik aside parçalanarak pH'ı sıfıra indirir.",
              "ar": "تتحلل حلقة الثيوفين فوراً إلى حمض الكبريتيك في الجسم البشري خافضة pH للصفر.",
              "en": "The thiophene ring hydrolyzes instantly into sulfuric acid, dropping physiological pH to zero."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kimyasal parçalanma yanılgısı: Tiyofen fizyolojik koşullarda son derece dayanıklı bir aromatik heterohalkadır; sülfürik aside hidroliz olmaz.",
              "ar": "خطأ التحلل الكيميائي: الثيوفين حلقة عطرية منيعة في الشروط الفيزيولوجية ولا تتحلل إطلاقاً لحمض كبريت.",
              "en": "Chemical hydrolysis misconception: Thiophene is an aromatic heterocycle chemically robust to spontaneous hydrolysis under biological conditions."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "antimetabolit", "arContext": "مضاد الاستقلاب (antimetabolite)" },
        { "term": "biyoizosterik antagonizma", "arContext": "المناهضة البيوإيزوستيرية" }
      ],
      "hints": [
        {
          "tr": "Urasil -> 5-Fluorourasil ve PABA -> Sülfanilamid örneklerini hatırlayın.",
          "ar": "تذكر أمثلة اليوراسيل -> 5-فلورويوراسيل و PABA -> سلفانيلاميد.",
          "en": "Recall how Uracil -> 5-FU and PABA -> Sulfanilamide function in cells."
        },
        {
          "tr": "Biyoizoster enzimin aktif bölgesine bağlanabilir ancak doğal enzimatik reaksiyonu yürütemez.",
          "ar": "يرتبط المتشابه بالموقع الفعال للأنزيم لكنه يعجز عن استكمال التفاعل الحيوي الطبيعي.",
          "en": "The bioisostere docks into the active pocket with high affinity, but prevents catalytic turnover."
        },
        {
          "tr": "2-tiyenilalanin fenilalanin sentetazı kilitler; protein sentezini durduran klasik bir biyoizosterik antimetabolittir.",
          "ar": "يعطل 2-thienylalanine أنزيم بناء فينيل ألانين متصرفاً كمضاد استقلاب قاتل للخلايا السرطانية.",
          "en": "2-thienylalanine competitively poisons phenylalanine-tRNA synthetase, serving as a classical bioisosteric antimetabolite."
        }
      ],
      "sources": [{ "file": "Biyoizosterizm.pdf", "page": 14 }]
    },
    {
      "id": "mc-mod3-les1-step-09",
      "stage": "application",
      "stageIndex": 9,
      "type": "clinical_vignette",
      "title": {
        "tr": "Klinik Vaka: Klorpromazinden İmipramine Büyük Dönüşüm",
        "ar": "حالة سريرية: التحول الدوائي من كلوربرومازين إلى إيميبرامين",
        "en": "Clinical Vignette: The Chlorpromazine to Imipramine Morph"
      },
      "prompt": {
        "tr": "Antipsikotik klorpromazin (fenotiyazin) -S- köprüsü taşır. Bu köprü iki karbonlu etilenle (-CH2-CH2-) değiştirildiğinde (imipramin) klinik etki nasıl dopamin antipsikotiğinden trisiklik antidepresana döner?",
        "ar": "يمتلك مضاد الذهان chlorpromazine جسر -S-. عند استبدال هذا الجسر بإيثيلين ثنائي الكربون (-CH2-CH2-) في imipramine، كيف ينقلب التأثير من مضاد ذهان إلى مضاد اكتئاب؟",
        "en": "Antipsychotic chlorpromazine features an -S- bridge. When replaced by a divalent ethylene bridge (-CH2-CH2-) in imipramine, how does clinical activity flip from dopamine antipsychotic to tricyclic antidepressant?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-9a",
            "text": {
              "tr": "İki karbonlu köprü trisiklik halkanın dihedral bükülme açısını düzlemsellikten çıkarıp katlar; D2 reseptör uyumu kaybolurken NET ve SERT taşıyıcılarına afinite fırlar.",
              "ar": "يغير جسر الكربونين زاوية الانثناء الفراغية للحلقات الثلاث كاسراً استواءها، فتزول ألفة D2 وتكتسب ألفة شديدة لناقلي NET و SERT.",
              "en": "The ethylene bridge distorts the tricyclic dihedral angle away from planarity; dopamine D2 affinity is lost while NET and SERT reuptake inhibition surges."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kesinlikle doğru! Fenotiyazindeki kükürt (-S-) halkaları daha düzlemsel tutarak dopamin D2 reseptörüne kilitler. İmipramindeki -CH2CH2- köprüsü ise halkayı dik bir açıyla büker; nöroleptik etki biter, trisiklik antidepresan etki başlar (Slide 15).",
              "ar": "صحيح تماماً! يحافظ الكبريت على شبه استواء الحلقات ملائماً لمستقبل D2؛ بينما يثني جسر -CH2CH2- الحلقات بزاوية حادة لتلائم نواقل السيروتونين والنورأدرينالين.",
              "en": "Spot on! The -S- bridge enforces planarity required for dopamine D2 antagonism; swapping it for -CH2-CH2- buckles the tricyclic core into a folded butterfly geometry that selectively binds NET and SERT."
            }
          },
          {
            "id": "opt-9b",
            "text": {
              "tr": "İmipramin vücutta tamamen eriyerek doğrudan serotonine dönüşür.",
              "ar": "يتحلل إيميبرامين في الجسم بشكل كامل متحولاً مباشرة إلى جزيئات سيروتونين.",
              "en": "Imipramine completely dissolves in vivo, directly converting into serotonin molecules."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Dönüşüm yanılgısı: İlaç nörotransmitere dönüşmez; nörotransmiter geri alım pompalarını (SERT/NET) allosterik/kompetitif inhibe eder.",
              "ar": "خطأ التحلل لناقل: لا يتحول الدواء إلى ناقل عصبي بل يثبط مضخات إعادة قبط السيروتونين والنورأدرينالين.",
              "en": "Transmutation misconception: Imipramine does not convert into serotonin; it blocks the reuptake transport machinery."
            }
          },
          {
            "id": "opt-9c",
            "text": {
              "tr": "Kükürt atomu olmadan hiçbir ilaç dopamin reseptörüne yaklaşamaz.",
              "ar": "يستحيل على أي دواء الاقتراب من مستقبل الدوبامين دون وجود ذرة كبريت.",
              "en": "No drug can interact with dopamine receptors without containing an essential sulfur atom."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kükürt zorunluluğu yanılgısı: Haloperidol gibi onlarca güçlü antipsikotikte kükürt atomu bulunmaz; ana faktör 3 boyutlu moleküler geometridir.",
              "ar": "خطأ حتمية الكبريت: مضادات ذهان شهيرة كالهالوبيريدول تخلو من الكبريت؛ الفيصل هو الزاوية الفراغية ثلاثية الأبعاد.",
              "en": "Sulfur necessity misconception: Potent dopamine antagonists like haloperidol contain no sulfur; the determinant is 3D conformational dihedral geometry."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "fenotiyazin çekirdeği", "arContext": "نواة الفينوثيازين (phenothiazine core)" },
        { "term": "dibenzazepin çekirdeği", "arContext": "نواة الديبنزازيبين (dibenzazepine core)" }
      ],
      "hints": [
        {
          "tr": "Trisiklik çekirdeğin 3 boyutlu bükülme açısını (kelebek kanadı geometrisini) düşünün.",
          "ar": "فكر في زاوية انثناء النواة ثلاثية الحلقات (هندسة أجنحة الفراشة).",
          "en": "Consider the 3D butterfly dihedral bending angle of the tricyclic ring system."
        },
        {
          "tr": "Düzlemsel yapılar dopamin D2 reseptörlerine otururken, bükük yapılar monoamin taşıyıcılarını (SERT/NET) bloke eder.",
          "ar": "تلائم البنى شبه المستوية مستقبلات D2، بينما تلائم البنى المنثنية نواقل المونوأمين (SERT/NET).",
          "en": "Nearly planar rings satisfy dopamine D2 receptors; sharply folded butterfly rings fit monoamine transporters."
        },
        {
          "tr": "-S- yerine -CH2-CH2- konulması molekülün dihedral katlanma açısını artırarak antipsikotikten antidepresana farmakolojik profil kayması yaratır.",
          "ar": "يزيد استبدال -S- بـ -CH2-CH2- زاوية الانثناء محولاً الفعالية من مضاد ذهان إلى مضاد اكتئاب ثلاثي الحلقات.",
          "en": "Swapping -S- for -CH2-CH2- alters the central dihedral crease, flipping pharmacology from neuroleptic to tricyclic antidepressant."
        }
      ],
      "sources": [{ "file": "Biyoizosterizm.pdf", "page": 15 }]
    },
    {
      "id": "mc-mod3-les1-step-10",
      "stage": "retrieval",
      "stageIndex": 10,
      "type": "retrieval",
      "title": {
        "tr": "Aralıklı Hatırlama: Flor Atomunun Metabolik Kalkanı",
        "ar": "استرجاع متباعد: الدرع الاستقلابي لذرة الفلور",
        "en": "Spaced Retrieval: Fluorine's Metabolic Shield"
      },
      "prompt": {
        "tr": "İlaç tasarımında aromatik bir halkadaki -H yerine -F atomu takılması (örn. Ezetimib) sitokrom P450 hidroksilasyonunu nasıl engeller? Bağ enerjisi ve atom çapı farkı nedir?",
        "ar": "في تصميم الأدوية، كيف يمنع استبدال -H بـ -F على حلقة عطرية (مثل Ezetimibe) أكسدة السيتوكروم P450؟ ما هو فارق طاقة الرابطة ونصف القطر؟",
        "en": "In rational drug design, how does replacing an aromatic -H with -F (e.g., Ezetimibe) block CYP450 hydroxylation? What are the relative bond energies and atomic radii?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-10a",
            "text": {
              "tr": "C-F bağ enerjisi (116 kcal/mol) C-H'den (98 kcal/mol) çok daha sağlamdır; van der Waals yarıçapı ise (1.47 Å vs 1.20 Å) reseptör uyumunu bozmadan oksidasyonu bloke eder.",
              "ar": "طاقة رابطة C-F تبلغ (116 kcal/mol) وهي أقوى بكثير من C-H (98 kcal/mol)؛ ونصف قطرها (1.47 Å مقابل 1.20 Å) يحفظ أبعاد الجيب مانعاً الأكسدة.",
              "en": "C-F bond energy (116 kcal/mol) vastly exceeds C-H (98 kcal/mol); its van der Waals radius (1.47 Å vs 1.20 Å) blocks oxidation without steric pocket penalty."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Tam bir farmasötik kimya klasiği! Flor atomu hidrojene sterik olarak en yakın elementtir (1.47 Å vs 1.20 Å), ancak karbonun en güçlü tekli bağını (116 kcal/mol) kurar. CYP enzimleri bu bağı koparıp fenol yapamaz.",
              "ar": "حقيقة كلاسيكية! الفلور أقرب العناصر حجماً للهيدروجين (1.47 Å مقابل 1.20 Å)، ويشكل أقوى رابطة أحادية (116 kcal/mol) عاصية على أكسدة السيتوكروم.",
              "en": "A medicinal chemistry cornerstone! Fluorine is steric twin to hydrogen (1.47 Å vs 1.20 Å) but forms an indestructible 116 kcal/mol C-F covalent bond immune to CYP insertion."
            }
          },
          {
            "id": "opt-10b",
            "text": {
              "tr": "Flor atomu hidrojenin 5 katı büyüklükte olduğu için sitokrom enzimini fiziksel olarak parçalar.",
              "ar": "حجم ذرة الفلور 5 أضعاف الهيدروجين مما يؤدي لتمزيق أنزيم السيتوكروم مادياً.",
              "en": "Fluorine is 5 times larger than hydrogen, physically destroying cytochrome enzymes upon contact."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Boyut yanılgısı: Flor hidrojenden sadece %20 büyüktür (1.47 Å vs 1.20 Å); enzimi parçalamaz.",
              "ar": "خطأ الحجم: الفلور أكبر من الهيدروجين بنسبة 20% فقط؛ ولا يخرب الأنزيم ميكانيكياً.",
              "en": "Size misconception: Fluorine is barely 20% larger than hydrogen; it docks without gross steric clashing."
            }
          },
          {
            "id": "opt-10c",
            "text": {
              "tr": "C-F bağı C-H bağından çok daha zayıftır (30 kcal/mol); bu yüzden flor hemen kopup çözeltiye geçer.",
              "ar": "رابطة C-F أضعف بكثير من C-H (30 kcal/mol)، لذلك ينفصل الفلور فوراً في المحلول.",
              "en": "The C-F bond is far weaker than C-H (30 kcal/mol), rapidly cleaving off into bulk solution."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Zayıf bağ yanılgısı: C-F organik kimyadaki en güçlü tekli kovalent bağlardan biridir (116 kcal/mol).",
              "ar": "خطأ ضعف الرابطة: رابطة C-F من أقوى الروابط التساهمية الأحادية في الكيمياء العضوية (116 kcal/mol).",
              "en": "Weak bond misconception: C-F is one of the strongest single covalent bonds in organic chemistry (116 kcal/mol)."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "metabolik blokaj", "arContext": "الحجب الاستقلابي (metabolic blocking)" },
        { "term": "van der Waals yarıçapı", "arContext": "نصف قطر فان دير فالس" }
      ],
      "hints": [
        {
          "tr": "Flor atomunun bağ kuvveti ve van der Waals yarıçapı değerlerini hatırlayın.",
          "ar": "تذكر قيم طاقة رابطة الفلور ونصف قطر فان دير فالس مقارنة بالهيدروجين.",
          "en": "Recall the bond dissociation energy and van der Waals radius of fluorine."
        },
        {
          "tr": "C-F bağı 116 kcal/mol, C-H bağı 98 kcal/mol'dür. Van der Waals yarıçapları 1.47 Å ve 1.20 Å'dur.",
          "ar": "رابطة C-F تبلغ 116 kcal/mol مقابل 98 لـ C-H. وأنصاف الأقطار 1.47 Å و 1.20 Å.",
          "en": "C-F bond energy is 116 kcal/mol vs C-H 98 kcal/mol. Van der Waals radii are 1.47 Å and 1.20 Å."
        },
        {
          "tr": "C-F bağı CYP enzimlerinin oksidatif koparma gücünün çok üzerindedir; sterik hacmi bozmadan ilaca metabolik zırh kazandırır.",
          "ar": "تتجاوز قوة C-F قدرة أنزيمات الأكسدة؛ مما يمنح الدواء درعاً استقلابياً دون تشويه الحجم الفراغي.",
          "en": "C-F bond strength defies CYP450 radical cleavage while fitting the pocket seamlessly."
        }
      ],
      "sources": [{ "file": "Biyoizosterizm.pdf", "page": 11 }]
    },
    {
      "id": "mc-mod3-les1-step-11",
      "stage": "connection",
      "stageIndex": 11,
      "type": "connection",
      "title": {
        "tr": "Bağlantı: Klasik Kuralların Sınırı ve Tetrazol Devrimi",
        "ar": "ربط المفاهيم: حدود القواعد الكلاسيكية وثورة التترازول",
        "en": "Cross-Topic Bridge: Limits of Classical Rules & The Tetrazole Leap"
      },
      "prompt": {
        "tr": "Grimm kuralları değerlik elektron eşitliğine dayanır. Ancak 5 üyeli 4 azotlu bir tetrazol halkası karboksilik asidin (-COOH) yerini mükemmel doldurur. Grimm kuralları bu devrimi neden açıklayamaz?",
        "ar": "تعتمد قواعد غريم على تكافؤ الإلكترونات. ومع ذلك تحل حلقة التترازول الخماسية ذات النيتروجينات الأربعة محل حمض الكربوكسيل (-COOH) بكفاءة. لماذا تعجز قواعد غريم عن تفسير هذا؟",
        "en": "Grimm's law relies on strict valence electron matching. Yet a 5-membered, 4-nitrogen tetrazole ring bioisosterically replaces carboxylic acid (-COOH). Why do classical rules fail to explain this leap?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-11a",
            "text": {
              "tr": "Tetrazol halkası klasik atom sayısı ve değerlik kurallarına uymaz; ancak pKa (4.5-4.9), negatif yük delokalizasyonu ve sterik hacim açısından karboksilatı taklit eden 'Non-Klasik' bir biyoizosterdir.",
              "ar": "لا يتبع التترازول قواعد عدد الذرات الكلاسيكية؛ لكنه يحاكي الكربوكسيل في pKa (4.5-4.9) وتوزع الشحنة السالبة كـ 'متشابه حيوي غير كلاسيكي'.",
              "en": "Tetrazole violates classical atom/valence counts; it mimics carboxylate via pKa (4.5-4.9), planar charge delocalization, and volume as a 'Non-Classical' bioisostere."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Harika bir köprü! Klasik izosterizm Langmuir ve Grimm kurallarıyla sınırlıdır. Tetrazol, sülfonamid veya siklik yapılar gibi modern ilaç keşif araçları ise 'Non-Klasik Biyoizosterler' sınıfını oluşturur (Gelecek Ders!).",
              "ar": "جسر مفاهيمي رائع! تقف القواعد الكلاسيكية عاجزة هنا؛ فالتترازول يمثل ثورة المتشابهات غير الكلاسيكية التي سندرسها في الدرس القادم.",
              "en": "Brilliant bridge! Classical rules dictate electron/atom equivalence. Tetrazoles mimic carboxylate through electronic field distribution and acidity, launching Non-Classical Bioisosterism."
            }
          },
          {
            "id": "opt-11b",
            "text": {
              "tr": "Tetrazol aslında bir karboksilik asit molekülüdür; azot atomları mikroskopta karbon gibi görünür.",
              "ar": "التترازول في الحقيقة حمض كربوكسيلي، وتبدو ذرات النيتروجين كالكربون تماماً تحت المجهر.",
              "en": "Tetrazole is literally a carboxylic acid whose nitrogens merely look like carbons under microscopy."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Fiziksel kimlik yanılgısı: Tetrazol tamamen farklı heteroatomlardan oluşur; 4 azot ve 1 karbon taşır.",
              "ar": "خطأ الهوية الذرية: التترازول حلقة مغايرة تحتوي 4 ذرات نيتروجين وذرة كربون، ولا تمتلك ذرات أكسجين.",
              "en": "Chemical identity misconception: Tetrazole is an entirely different 5-membered heterocyclic system packed with 4 nitrogens."
            }
          },
          {
            "id": "opt-11c",
            "text": {
              "tr": "Grimm kuralları sadece inorganik tuzlar için geçerlidir; ilaç kimyasında hiç kullanılmaz.",
              "ar": "قواعد غريم تنطبق حصراً على الأملاح غير العضوية ولا علاقة لها بالكيمياء الدوائية.",
              "en": "Grimm's laws apply strictly to inorganic mineral salts and have zero relevance to medchem."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kural geçersizliği yanılgısı: Grimm kuralları klasik biyoizosterizmin temel taşıdır (-F, -OH, -NH2, vb.); ancak non-klasik halkaları kapsayamaz.",
              "ar": "خطأ نفي القاعدة: قواعد غريم هي حجر الأساس للتبديل الكلاسيكي، لكنها تعجز عن تفسير الأنظمة الحلقية المعقدة.",
              "en": "Relevance misconception: Grimm's law is fundamental to classical bioisosterism (-F, -OH, -NH2, -S-), but cannot explain advanced non-classical mimics."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "non-klasik biyoizoster", "arContext": "المتشابه الحيوي غير الكلاسيكي (non-classical bioisostere)" },
        { "term": "tetrazol halkası", "arContext": "حلقة التترازول (tetrazole ring)" }
      ],
      "hints": [
        {
          "tr": "Klasik izosterler atom sayısı ve değerlik elektronları açısından birbirine uyar.",
          "ar": "تتطابق الإيزوستيرات الكلاسيكية في عدد الذرات وإلكترونات التكافؤ.",
          "en": "Classical isosteres match atom numbers and outer valence electrons."
        },
        {
          "tr": "Tetrazolde 5 halka atomu varken, -COOH grubunda 3 atom vardır. Değerlik elektron sayıları eşit değildir.",
          "ar": "يمتلك التترازول 5 ذرات حلقية بينما تمتلك -COOH 3 ذرات فقط، ولا تتطابق إلكترونات التكافؤ.",
          "en": "Tetrazole contains 5 ring atoms versus 3 in -COOH; valence electrons do not match."
        },
        {
          "tr": "Tetrazol klasik kuralları aşan, elektronik yüzey ve pKa uyumu sağlayan modern bir 'Non-Klasik Biyoizoster' örneğidir.",
          "ar": "يمثل التترازول نموذجاً للمتشابهات غير الكلاسيكية التي تحاكي السطح الإلكتروني ودرجة الحموضة pKa.",
          "en": "Tetrazole is the quintessential Non-Classical Bioisostere, mimicking carboxylate pKa (~4.8) via delocalized aromatic resonance."
        }
      ],
      "sources": [{ "file": "Biyoizosterizm.pdf", "page": 9 }]
    },
    {
      "id": "mc-mod3-les1-step-12",
      "stage": "mastery_check",
      "stageIndex": 12,
      "type": "mastery_check",
      "title": {
        "tr": "Ustalık Sınavı: Kararsız Ester Köprüsünü Kurtarma",
        "ar": "اختبار الإتقان: إنقاذ جسر الإستر القابل للتفكك",
        "en": "Mastery Challenge: Rescuing a Metabolically Labile Ester Bridge"
      },
      "prompt": {
        "tr": "Yeni bir kinaz inhibitörü öncü bileşiğinde bulunan ester köprüsü (-COO-) plazma esterazlarınca hızla parçalanmaktadır. Geometriyi korurken hidroliz direncini artıran iki klasik bivalan biyoizosterik köprü öneriniz:",
        "ar": "يتفكك جسر الإستر (-COO-) في مرشح مثبط كينيز جديد سريعاً بأنزيمات البلازما. اقترح بديلين بيوإيزوستيريين كلاسيكيين ثنائيي التكافؤ لزيادة الثبات مع الحفاظ على الهندسة:",
        "en": "A promising kinase inhibitor contains an ester bridge (-COO-) rapidly cleaved by plasma esterases. Propose two classical bivalent bioisosteric replacements that enhance metabolic stability while preserving binding geometry:"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-12a",
            "text": {
              "tr": "Amit (-CO-NH-) ve keton (-CO-CH2-) köprüleri; bivalan geometriyi ve karbonil dipolünü korurken esteraz hidrolizine yüksek kimyasal direnç sağlarlar.",
              "ar": "جسرا الأميد (-CO-NH-) والكيتون (-CO-CH2-)؛ يحافظان على التكافؤ الثنائي وتطابق الكربونيل مع مقاومة فائقة لحلمهة الأستراز.",
              "en": "Amide (-CO-NH-) and ketone (-CO-CH2-) bridges; they preserve bivalent geometry and carbonyl dipole while conferring robust resistance to esterase cleavage."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Ustalık seviyesi tebrikler! Slide 6 bivalan izosterler: -CO-O- (ester), -CO-NH- (amit) ve -CO-CH2- (keton). Amit ve keton izosterleri esterazların nükleofilik atağına karşı katbekat dirençlidir ve ilacın in vivo yarı ömrünü kurtarır.",
              "ar": "إتقان مبهر! وفق السلايد 6: الإيزوستيرات ثنائية التكافؤ هي -CO-O- و -CO-NH- و -CO-CH2-. تقاوم الأميدات والكيتونات الحلمهة الأنزيمية رافعة نصف العمر الحيوي.",
              "en": "Mastery demonstrated! Slide 6 bivalent isosteres: -CO-O- (ester), -CO-NH- (amide), and -CO-CH2- (ketone). Amides and ketones resist esterase hydrolysis, dramatically extending half-life."
            }
          },
          {
            "id": "opt-12b",
            "text": {
              "tr": "Sülfürik asit (-SO4-) ve perklorat (-ClO4-) köprüleri; enzimleri kovalent asitle parçalarlar.",
              "ar": "جسرا حمض الكبريتيك (-SO4-) والبيركلورات (-ClO4-)؛ يحطمان الأنزيمات تساهمياً بالحموضة.",
              "en": "Sulfuric acid (-SO4-) and perchlorate (-ClO4-) bridges; they covalently digest enzymes with strong acidity."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Reaktif tuz yanılgısı: Bu gruplar kararsız, aşırı reaktif veya toksik anyonlardır; bivalan karbonil izosteri değildir.",
              "ar": "خطأ الأملاح الشاردية: هذه مجموعات كيميائية مؤكسدة وسامة ولا تمثل إيزوستيرات كربونيل ثنائية التكافؤ.",
              "en": "Reactive salt misconception: These are reactive or toxic inorganic anions, not bivalent carbonyl bioisosteres."
            }
          },
          {
            "id": "opt-12c",
            "text": {
              "tr": "Yalnızca saf altın atomu (-Au-); hiçbir enzim metalleri tanıyamaz.",
              "ar": "ذرة الذهب النقي فقط (-Au-)؛ لأنه لا يوجد أنزيم يستطيع التعرف على المعادن.",
              "en": "Exclusively a metallic gold atom (-Au-); no biological enzymes can recognize transition metals."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Metal yanılgısı: Organik köprüler biyoizosterik psödoatomlarla modifiye edilir, metalik altın köprüsü kimyasal olarak anlamsızdır.",
              "ar": "خطأ المعادن: يتم تعديل المركبات العضوية بذرات زائفة كلاسيكية؛ استخدام ذرة ذهب أمر مستحيل كيميائياً.",
              "en": "Metallic misconception: Organic pharmacophores are modified via organic bioisosteric pseudoatoms, not transition metals."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "bivalan biyoizoster", "arContext": "المتشابه الحيوي ثنائي التكافؤ" },
        { "term": "esteraz direnci", "arContext": "المقاومة لأنزيمات الإستراز" }
      ],
      "hints": [
        {
          "tr": "Slide 6'daki bivalan grup izosterlerini hatırlayın: -CO-O- ile ne izosterdir?",
          "ar": "تذكر إيزوستيرات المجموعات ثنائية التكافؤ من السلايد 6: ما هو إيزوستير -CO-O-؟",
          "en": "Recall bivalent group isosteres from Slide 6: what is isosteric with -CO-O-?"
        },
        {
          "tr": "Prokain'den (ester) prokainamid'e (amit) geçişi ve keton türevlerini düşünün.",
          "ar": "فكر في التحول الشهير من بروكائين (إستر) إلى بروكائيناميد (أميد).",
          "en": "Think of the transition from procaine (ester) to procainamide (amide)."
        },
        {
          "tr": "Ester köprüsünün (-CO-O-) klasik bivalan izosterleri amit (-CO-NH-) ve keton köprüleridir (-CO-CH2-).",
          "ar": "الإيزوستيرات ثنائية التكافؤ الكلاسيكية للإستر (-CO-O-) هي الأميد (-CO-NH-) والكيتون (-CO-CH2-).",
          "en": "Classical bivalent bioisosteres of an ester (-CO-O-) are the amide (-CO-NH-) and ketone (-CO-CH2-) bridges."
        }
      ],
      "sources": [{ "file": "Biyoizosterizm.pdf", "page": 6 }]
    }
  ]
};

const targetPath = path.resolve(__dirname, '../courses/medchem/lessons/lesson-05.json');
fs.writeFileSync(targetPath, JSON.stringify(lesson05, null, 2) + '\n', 'utf8');
console.log('Successfully wrote lesson-05.json to:', targetPath);
