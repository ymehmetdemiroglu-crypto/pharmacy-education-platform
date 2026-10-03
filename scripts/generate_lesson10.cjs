const fs = require('fs');
const path = require('path');

const lesson10 = {
  "$schema": "../../../packages/platform/schema/lesson.schema.json",
  "id": "mc-mod5-les2",
  "courseId": "medchem",
  "moduleId": "mc-mod-05",
  "title": {
    "tr": "Faz II Konjugasyonu: Glukuronidasyon, Sülfasyon ve Glutatyon Detoksifikasyonu",
    "ar": "المرحلة الثانية: مسارات الاقتران بالجلوكورونيد والكبريتات والجلوتاثيون",
    "en": "Phase II Conjugation: Glucuronidation, Sulfation & Glutathione Pathways"
  },
  "order": 2,
  "access": "free",
  "objective": {
    "tr": "UGT, SULT, NAT, GST transferaz enzimlerini, aktif kofaktörlerini (UDPGA, PAPS, Asetil-KoA, GSH), parasetamol hepatotoksisitesini ve metenamin üriner aktivasyonunu analiz etmek.",
    "ar": "تحليل إنزيمات التحويل UGT و SULT و NAT و GST، وكواشفها المنشطة، وآلية سمية الباراسيتامول وترياق NAC، وتنشيط الميثينامين البولي.",
    "en": "Analyze Phase II transferase mechanisms (UGT, SULT, NAT, GST), active cofactors (UDPGA, PAPS, Acetyl-CoA, GSH), paracetamol hepatotoxicity with NAC rescue, and urinary methenamine activation."
  },
  "description": {
    "tr": "Faz II konjugasyon reaksiyonlarının enzim kinetiğini, kofaktör donörlerini, parasetamol hepatotoksisitesi mekanizmasını ve farmakogenetik asetilasyon polimorfizmini inceleme.",
    "ar": "استقصاء حركية إنزيمات الاقتران في المرحلة الثانية، وكواشفها المانحة، وآلية سمية الباراسيتامول الكبدية والتباين الوراثي للأستلة.",
    "en": "Examine Phase II conjugation kinetics, cofactor donors, paracetamol hepatotoxicity and antidote rescue mechanisms, and pharmacogenetic acetylation polymorphism."
  },
  "misconceptions": [
    {
      "tr": "Tüm Faz II konjugasyon reaksiyonlarının polariteyi ve suda çözünürlüğü mutlaka artırdığı yanılgısı (Asetilasyon polariteyi azaltır ve kristalüri yapar!).",
      "ar": "الظن الخاطئ بأن جميع تفاعلات الاقتران تزيد من قطبية الدواء وذوبانيته (الأستلة تقلل القطبية وتسبب البيلة البلورية!).",
      "en": "The misconception that all Phase II conjugations increase water solubility (Acetylation actually decreases polarity, causing sulfadiazine crystalluria!)."
    },
    {
      "tr": "Parasetamol aşırı dozunda karaciğer hasarının parasetamolün kendisi tarafından oluşturulduğu düşüncesi (Gerçek toksin CYP2E1'in ürettiği elektrofil NAPQI'dir).",
      "ar": "الاعتقاد الخاطئ بأن الباراسيتامول نفسه يدمر الكبد (السم الفعلي هو NAPQI الناتج عن CYP2E1 عند نفاد مخزون الجلوتاثيون).",
      "en": "The misconception that paracetamol itself directly destroys hepatocytes, ignoring CYP2E1 bioactivation to the electrophilic NAPQI quinoneimine."
    },
    {
      "tr": "Bütün Faz II transferaz enzimlerinin sitozolde bulunduğu düşüncesi (UGT enzimi mikrozomaldir, endoplazmik retikulum membranına gömülüdür).",
      "ar": "الاعتقاد الخاطئ بوجود جميع إنزيمات الاقتران في السيتوزول (إنزيم UGT ميكروزومي مدمج في غشاء الشبكة الإندوبلازمية).",
      "en": "The false assumption that all Phase II transferases reside in the cytosol, missing that UGT is an integral endoplasmic reticulum membrane enzyme."
    }
  ],
  "sources": [
    { "file": "İlaç metabolizması-2026.pdf", "page": 2 },
    { "file": "İlaç metabolizması-2026.pdf", "page": 4 },
    { "file": "İlaç metabolizması-2026.pdf", "page": 31 },
    { "file": "İlaç metabolizması-2026.pdf", "page": 32 },
    { "file": "İlaç metabolizması-2026.pdf", "page": 33 },
    { "file": "İlaç metabolizması-2026.pdf", "page": 35 },
    { "file": "İlaç metabolizması-2026.pdf", "page": 36 },
    { "file": "İlaç metabolizması-2026.pdf", "page": 40 },
    { "file": "İlaç metabolizması-2026.pdf", "page": 43 },
    { "file": "İlaç metabolizması-2026.pdf", "page": 44 }
  ],
  "citations": [
    {
      "id": "CIT-MC10-01",
      "book": "Foye's Principles of Medicinal Chemistry",
      "edition": "8th ed.",
      "topic": "Phase II Conjugation Pathways: Glucuronidation, Sulfation, Acetylation, and Glutathione",
      "chapter": "Chapter 4: Drug Biotransformation",
      "page": "135-168",
      "status": "verified"
    },
    {
      "id": "CIT-MC10-02",
      "book": "Wilson and Gisvold's Textbook of Organic Medicinal and Pharmaceutical Chemistry",
      "edition": "12th ed.",
      "topic": "Conjugation Reactions, Mercapturic Acid Synthesis, and Paracetamol Hepatotoxicity",
      "chapter": "Chapter 4: Metabolic Changes of Drugs and Related Organic Compounds",
      "page": "150-185",
      "status": "verified"
    }
  ],
  "numericClaims": [
    {
      "id": "NUM-MC10-01",
      "parameter": "Paracetamol therapeutic dose metabolic pathway split",
      "value": "60% Glucuronidation (UGT), 35% Sulfation (SULT), 5% CYP2E1 oxidation to NAPQI",
      "status": "verified",
      "referencePassage": "Slide 35: Therapeutic doses of acetaminophen are cleared predominantly by glucuronidation (~60%) and sulfation (~35%), with <5% forming NAPQI."
    },
    {
      "id": "NUM-MC10-02",
      "parameter": "Hepatic glutathione (GSH) critical depletion threshold",
      "value": "Depletion > 70% (cellular GSH falls below 30% of normal reserves)",
      "status": "verified",
      "referencePassage": "Slide 36: When total hepatic GSH reserves fall below 30% of baseline, NAPQI binds covalently to vital hepatocyte proteins, initiating necrosis."
    },
    {
      "id": "NUM-MC10-03",
      "parameter": "NAT-2 slow acetylator prevalence in Caucasian/Turkish populations",
      "value": "50% to 60% slow acetylators (vs 90-100% fast acetylators in Japanese/Inuit cohorts)",
      "status": "verified",
      "referencePassage": "Slide 40: Slow acetylators account for 50-60% of Turkish and European populations, conferring heightened risk of isoniazid neuropathy and lupus."
    },
    {
      "id": "NUM-MC10-04",
      "parameter": "Methenamine urinary activation pH threshold and formaldehyde yield",
      "value": "Urine pH < 5.5 generates 6 formaldehyde molecules per hexamethylenetetramine cage",
      "status": "verified",
      "referencePassage": "Slide 44: Methenamine hydrolyzes non-enzymatically in acidic urine (pH < 5.5) to generate 6 molecules of formaldehyde, killing bacteria."
    }
  ],
  "spacedReviewCards": [
    {
      "cardId": "mc-mod5-les2-card1",
      "courseId": "medchem",
      "drugOrConcept": "Glukuronidasyon vs Sülfasyon Kinetiği",
      "prompt": "Parasetamolün fenolik -OH grubu için yarışan UGT ve SULT enzimlerinin afinite ve kapasite farkı nedir?",
      "answer": "SULT yüksek afiniteli / düşük kapasitelidir (terapötik düşük dozda etkindir, hızla doyar); UGT ise düşük afiniteli / yüksek kapasitelidir (büyük yükleri metabolize eder).",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "mc-mod5-les2-card2",
      "courseId": "medchem",
      "drugOrConcept": "Asetilasyon İstisnası ve Kristalüri",
      "prompt": "Faz II konjugasyonları genelde polariteyi artırırken, asetilasyon (NAT-2) neden sülfadiazin kristalürisine yol açar?",
      "answer": "Asetilasyon bazik amino grubunu nötr amite çevirerek molekülün polaritesini ve iyonlaşmasını azaltır; N4-asetilsülfadiazin asidik idrarda çözünmeyip böbrek tübüllerinde çöker.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "mc-mod5-les2-card3",
      "courseId": "medchem",
      "drugOrConcept": "Parasetamol Hepatotoksisitesi ve NAC Antidotu",
      "prompt": "Parasetamol aşırı dozunda karaciğer nekrozunu başlatan olay nedir ve N-asetilsistein (NAC) bunu nasıl önler?",
      "answer": "SULT ve UGT doyunca CYP2E1 aşırı miktarda elektrofil NAPQI üretir; hepatik glutatyon (GSH) >%70 tükenince NAPQI proteinlere kovalent bağlanır. NAC, sistein havuzunu artırarak GSH sentezini yeniler.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "mc-mod5-les2-card4",
      "courseId": "medchem",
      "drugOrConcept": "Merkaptürik Asit Sentez Yolu",
      "prompt": "Toksik elektrofillere bağlanan glutatyon (GSH) idrarla atılacak merkaptürik aside nasıl dönüştürülür?",
      "answer": "GSH konjugatından gamma-glutamiltranspeptidaz glutamatı, dipeptidaz ise glisini koparır; kalan sistein konjugatı NAT ile N-asetillenerek merkaptürik asit oluşturur.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "mc-mod5-les2-card5",
      "courseId": "medchem",
      "drugOrConcept": "Metenamin Ön İlacı ve İdrar pH Şartı",
      "prompt": "Metenamin (hekzametilentetramin) kanda stabilken idrarda bakterileri nasıl öldürür ve bunun ön şartı nedir?",
      "answer": "Kanda ve pH 7.4'te inaktiftir; idrar pH'ı <5.5 (asidik) olduğunda kendiliğinden hidroliz olarak 6 formaldehit açığa çıkarır ve bakteriyel proteinleri denatüre eder.",
      "box": 1,
      "intervalDays": 1
    }
  ],
  "translations": {
    "tr": { "title": "Faz II Konjugasyonu: Glukuronidasyon, Sülfasyon ve Glutatyon Detoksifikasyonu" },
    "ar": { "title": "المرحلة الثانية: مسارات الاقتران بالجلوكورونيد والكبريتات والجلوتاثيون" },
    "en": { "title": "Phase II Conjugation: Glucuronidation, Sulfation & Glutathione Pathways" }
  },
  "steps": [
    {
      "id": "mc-mod5-les2-step-01",
      "stage": "hook",
      "stageIndex": 1,
      "type": "predict_reveal",
      "title": {
        "tr": "Sessiz Zehirlenme: 15 Gram Parasetamol ve 48 Saatlik Uçurum",
        "ar": "التسمم الصامت: 15 غراماً من الباراسيتامول وهاوية الـ 48 ساعة",
        "en": "The Silent Overdose: 15 Grams of Paracetamol & The 48-Hour Cliff"
      },
      "prompt": {
        "tr": "15 gram parasetamol yutan bir genç ilk 6 saatte tamamen sağlıklıdır; ne bulantı ne ağrı duyar. Ancak 48 saat sonra karaciğer enzimleri 10.000 U/L'ye fırlar ve fulminan nekroz başlar. Hangi koruyucu kalkan çökmüştür?",
        "ar": "تناول مريض 15 غراماً من الباراسيتامول وبدا سليماً تماماً في الساعات الست الأولى. بعد 48 ساعة قفزت إنزيمات الكبد فوق 10,000 وحدة وبدأ التنخر الكبدي المميت. ما هو الدرع الواقي الذي انهار؟",
        "en": "A patient ingests 15 grams of paracetamol and feels completely fine for the first 6 hours. Yet at 48 hours, liver transaminases exceed 10,000 U/L with fatal hepatic necrosis. What cellular defense shield collapsed?"
      },
      "predictThenReveal": true,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-1a",
            "text": {
              "tr": "Karaciğerdeki UGT ve SULT enzimleri doymuş, CYP2E1 toksik NAPQI üretmiş ve hücresel koruyucu glutatyon (GSH) rezervi tamamen tükenmiştir.",
              "ar": "تشبعت إنزيمات UGT و SULT، فحول CYP2E1 الفائض إلى NAPQI السام ونفد مخزون الجلوتاثيون (GSH) الخلوي بالكامل.",
              "en": "UGT and SULT conjugations became saturated, shunting paracetamol to CYP2E1 to generate toxic NAPQI which exhausted hepatic glutathione (GSH) reserves."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Tam isabet! Slayt 35-36 mekanizması: Terapötik dozlarda parasetamolün %95'i glukuronidasyon ve sülfasyonla temizlenir. Aşırı dozda bu iki yol doyar; CYP2E1 devreye girerek elektrofilik NAPQI oluşturur. Hepatik glutatyon (GSH) rezervi >%70 tükendiğinde, NAPQI hepatosit proteinlerine kovalent bağlanıp hücre ölümünü başlatır.",
              "ar": "إصابة دقيقة! الشريحة 35-36: في الجرعات العادية يُطرح 95% بالاقتران السليم. عند الجرعة الزائدة تتشبع هذه الإنزيمات، وينشط CYP2E1 منتجاً NAPQI السام. عند نفاد الجلوتاثيون (>70%)، يهاجم NAPQI بروتينات الكبد تساهمياً مسبباً الموت الخلوي.",
              "en": "Exact hit! Slides 35-36 mechanism: Therapeutic paracetamol is cleared safely (>95%) by glucuronidation and sulfation. Overdose saturates these transferases, shunting the drug to CYP2E1 to produce electrophilic NAPQI. Once hepatic GSH falls below 30%, NAPQI covalently attacks mitochondrial proteins."
            }
          },
          {
            "id": "opt-1b",
            "text": {
              "tr": "Parasetamol doğrudan mide duvarını asitle delmiş ve kana serbest hidroklorik asit akıtmıştır.",
              "ar": "ثقب الباراسيتامول جدار المعدة بحموضته ليتسرب حمض كلور الماء إلى مجرى الدم.",
              "en": "Paracetamol directly melted the stomach lining with extreme acidity, leaking concentrated hydrochloric acid into the bloodstream."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Mide asidi yanılgısı: Parasetamol asit değildir (zayıf fenoldür, pKa ~9.5); gastrik delinme yapmaz. Toksisite midede değil karaciğer mikrozomlarında enzimatik olarak oluşur.",
              "ar": "خطأ حموضة المعدة: الباراسيتامول فينول ضعيف وليس حمضاً أكالاً؛ وسميته تحدث داخل الخلايا الكبدية وليس بانثقاب المعدة.",
              "en": "Gastric acidity fallacy: Paracetamol is a very weak acid (pKa ~9.5) and does not corrode gastric mucosa; toxicity is mediated hepatically via bioactivation."
            }
          },
          {
            "id": "opt-1c",
            "text": {
              "tr": "15 gram parasetamol bağırsak florasındaki tüm bakterileri besleyerek dev kolonilere dönüştürmüştür.",
              "ar": "غذت الجرعة بكتيريا الأمعاء فتحولت إلى مستعمرات عملاقة غزت الكبد.",
              "en": "The 15-gram dose fed gut intestinal flora, mutating benign bacteria into giant invasive colonies."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Bakteriyel enfeksiyon yanılgısı: Karaciğer nekrozu bakteriyel bir enfeksiyon değildir; ksenobiyotik kaynaklı doğrudan kimyasal elektrofilik hasardır.",
              "ar": "خطأ العدوى البكتيرية: التنخر الكبدي ليس عدوى جرثومية بل تسمم كيميائي مباشر من مركب NAPQI الإلكتروفيلي.",
              "en": "Bacterial infection fallacy: Acetaminophen hepatotoxicity is non-infectious, sterile chemical necrosis caused by covalent protein alkylation."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "glutatyon (GSH) tükenmesi", "arContext": "استنزاف الجلوتاثيون (GSH depletion)" },
        { "term": "N-asetil-p-benzokinonimin (NAPQI)", "arContext": "المركب السام NAPQI" }
      ],
      "hints": [
        {
          "tr": "Parasetamolün normal temizleme yolları (glukuronidasyon ve sülfasyon) aşırı dozda kapasitesini aşar.",
          "ar": "تتجاوز الجرعة الزائدة الطاقة الاستيعابية لمسارات الاقتران الطبيعية (الجلوكورونيد والكبريتات).",
          "en": "Excessive doses rapidly overwhelm the saturation capacity of primary conjugation pathways."
        },
        {
          "tr": "CYP2E1 enzimi fazlalığı oksitleyerek reaktif bir kinonimin elektrofiline (NAPQI) çevirir.",
          "ar": "يؤكسد CYP2E1 الفائض ليحوله إلى إلكتروفيل كينونيمين عالي السمية (NAPQI).",
          "en": "Diverted substrate is oxidized by CYP2E1 into the electrophilic toxin NAPQI."
        },
        {
          "tr": "Karaciğerdeki koruyucu tripeptit (glutatyon) bittiğinde NAPQI hücre proteinlerini yok etmeye başlar.",
          "ar": "عندما ينفد ببتيد الجلوتاثيون الواقي بالكبد، يبدأ NAPQI بتدمير بروتينات الخلية.",
          "en": "When protective glutathione reserves run out, NAPQI attacks vital hepatocyte proteins."
        }
      ],
      "sources": [{ "file": "İlaç metabolizması-2026.pdf", "page": 35 }]
    },
    {
      "id": "mc-mod5-les2-step-02",
      "stage": "question",
      "stageIndex": 2,
      "type": "question",
      "title": {
        "tr": "Glukuronidasyon vs Sülfasyon: Hangi Yol Ne Zaman Kazanır?",
        "ar": "الجلوكورونيد مقابل الكبريتات: من يحسم سباق الاستقلاب؟",
        "en": "Glucuronidation vs. Sulfation: When Does Each Pathway Win?"
      },
      "prompt": {
        "tr": "Parasetamolün tek bir fenolik -OH grubu vardır. Hem UGT hem SULT enzimleri bu grup için yarışır. Terapötik düşük dozda sülfasyon, yüksek dozda ise neden glukuronidasyon baskındır?",
        "ar": "يمتلك الباراسيتامول مجموعة هيدروكسيل فينولية وحيدة تتنافس عليها إنزيمات UGT و SULT. لماذا تسود الكبرتة في الجرعات المنخفضة ويسود الجلوكورونيد في المرتفعة؟",
        "en": "Paracetamol presents a single phenolic -OH. Both UGT and SULT compete for this exact locus. Why does sulfation dominate at low therapeutic doses, while glucuronidation takes over at higher doses?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-2a",
            "text": {
              "tr": "SULT yüksek afiniteli/düşük kapasitelidir (PAPS kofaktörü hızla biter); UGT ise düşük afiniteli/yüksek kapasitelidir (büyük ilaç yüklerini taşır).",
              "ar": "إنزيم SULT ذو ألفة عالية وسعة منخفضة (ينفد كاشف PAPS سريعاً)؛ بينما UGT ذو ألفة أقل وسعة هائلة لاستيعاب الجرعات الكبيرة.",
              "en": "SULT exhibits high affinity but low capacity (PAPS cofactor depletes rapidly); UGT has lower affinity but enormous capacity to clear heavy drug loads."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Mükemmel farmakokinetik kavrayış! Slayt 32-33 ve Foye prensibi: Sülfotransferazların Km değeri düşüktür (yüksek afinite), bu yüzden 500 mg'lık dozda sülfasyon (%35) çok etkindir. Ancak hücredeki PAPS kofaktör havuzu kısıtlıdır ve SULT hızla doygunluğa (Vmax) ulaşır. Mikrozomal UGT ise glikoz metabolizmasından beslenen devasa UDPGA havuzuna sahiptir ve yüksek dozları glukuronidasyon (%60) sırtlar.",
              "ar": "فهم حركي دوائي رائع! الشريحة 32-33: يمتلك SULT قيمة Km منخفضة (شراهة عالية) فيعمل بكفاءة بالجرعات العادية، لكن مخزون كاشف PAPS محدود ويتشبع الإنزيم سريعاً. بالمقابل، يمتلك UGT سعة ضخمة مدعومة بمخزون UDPGA الوفير المشتق من الجلوكوز.",
              "en": "Flawless pharmacokinetic insight! Slides 32-33: SULT possesses low Km (high affinity), efficiently sulfating paracetamol at therapeutic doses. However, PAPS pools are easily depleted. UGT exhibits high capacity fed by abundant glycogen-derived UDPGA, handling the bulk load."
            }
          },
          {
            "id": "opt-2b",
            "text": {
              "tr": "UGT enzimleri sadece gece yarısından sonra uyanır; gündüzleri sadece SULT çalışır.",
              "ar": "تستيقظ إنزيمات UGT بعد منتصف الليل فقط؛ بينما يعمل SULT نهاراً حصراً.",
              "en": "UGT enzymes only awaken after midnight; during daylight hours, SULT is the sole active transferase."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Sirkadiyen fantezi yanılgısı: Her iki enzim ailesi de 24 saat kesintisiz aktiftir; ayrım enzim kinetiğindeki Km ve Vmax parametrelerindedir.",
              "ar": "خطأ التوقيت العبثي: كلا الإنزيمين يعملان على مدار الساعة، والفيصل هو حركية التفاعل وثوابت Km و Vmax وسعة الكواشف.",
              "en": "Circadian fallacy: Both transferases function continuously around the clock; pathway shifts are governed strictly by substrate concentration and enzyme kinetics."
            }
          },
          {
            "id": "opt-2c",
            "text": {
              "tr": "Sülfasyon sadece yağda çözünen gazlarda gerçekleşir; suda çözünen katı ilaçlar sülfatlanamaz.",
              "ar": "تحدث الكبرتة في الغازات الذائبة بالدهن فقط، وتعجز عن كبرتة الأدوية الصلبة.",
              "en": "Sulfation is restricted to lipid-soluble gases and can never conjugate solid organic drug molecules."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Faz durumu yanılgısı: SULT sitozolik bir enzimdir; suda ve plazmada çözünmüş fenolleri, steroidleri ve alifatik alkolleri hızla sülfatlar.",
              "ar": "خطأ الحالة الفيزيائية: إنزيم SULT سيتوزولي يتعامل مع الفينولات والستيرويدات الذائبة في المحاليل المائية الحيوية بكفاءة تامة.",
              "en": "Physical state fallacy: SULT is a soluble cytosolic enzyme that readily conjugates dissolved phenols, catechols, and aliphatic alcohols."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "Km ve Vmax enzim kinetiği", "arContext": "حركية الإنزيمات Km و Vmax" },
        { "term": "kofaktör doygunluğu", "arContext": "تشبع الكواشف المانحة (cofactor saturation)" }
      ],
      "hints": [
        {
          "tr": "Düşük dozda ilaca ilk sarılan enzim yüksek afiniteli olandır (Km değeri küçüktür).",
          "ar": "في التراكيز المنخفضة، يرتبط الإنزيم صاحب الألفة الفائقة (قيمة Km صغيرة) أولاً.",
          "en": "At low substrate concentrations, the high-affinity enzyme (lower Km) dominates."
        },
        {
          "tr": "Sülfasyon kofaktörü PAPS hücrede sınırlı miktardadır ve hızla tükenir.",
          "ar": "كاشف الكبرتة PAPS يتواجد بكميات خلوية محدودة ويتشبع سريعاً.",
          "en": "The sulfate donor PAPS is present in limited stoichiometric supply in cytosol."
        },
        {
          "tr": "Glukuronidasyon kofaktörü UDPGA glikozdan üretilir; kapasitesi sülfasyondan kat kat geniştir.",
          "ar": "كاشف UDPGA مشتق من الجلوكوز ويمتلك سعة استيعابية تفوق الكبريتات بأضعاف.",
          "en": "UDPGA is derived from abundant glycogen stores, providing immense glucuronidation capacity."
        }
      ],
      "sources": [{ "file": "İlaç metabolizması-2026.pdf", "page": 32 }]
    },
    {
      "id": "mc-mod5-les2-step-03",
      "stage": "intuition",
      "stageIndex": 3,
      "type": "intuition",
      "title": {
        "tr": "Sezgisel Model: Otoban Gişesi vs Konteyner Limanı",
        "ar": "النموذج الحدسي: كشك المرور السريع مقابل الميناء التجاري العملاق",
        "en": "Mental Model: The Express Tollbooth vs. The Mega Port"
      },
      "prompt": {
        "tr": "SULT ve UGT enzimlerini anlamak için gişe modelini düşünün. SULT tek şeritli hızlı gişedir; UGT ise 20 kapılı devasa konteyner limanıdır. İlaç dozu arttığında trafikte ne yaşanır?",
        "ar": "تخيل أن SULT كشك مرور سريع بممر واحد، بينما UGT ميناء تجاري بعشرين رصيفاً. ماذا يحدث لحركة المرور الاستقلابية عند تدفق شحنة أدوية ضخمة؟",
        "en": "Picture SULT as a single-lane fast express tollbooth and UGT as a 20-berth container mega-port. What happens to metabolic traffic when a massive surge of drug molecules arrives?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-3a",
            "text": {
              "tr": "SULT tek şeridi hızla tıkanır ve doyuma ulaşır; kalan tüm trafik UGT'nin devasa limanına akar.",
              "ar": "يختنق مسار SULT سريعاً ويصل لأقصى طاقته، فتتحول قوافل الجزيئات بأكملها إلى أرصفة UGT الضخمة.",
              "en": "The single SULT lane jams and reaches full saturation; all remaining traffic is routed through UGT's massive deep-water terminal."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Harika bir zihinsel model! SULT enziminin PAPS rezervi azdır; 500 mg parasetamolde hızlıca çalışır ama 2-3 gramda tamamen kilitlenir. UGT ise karaciğer glikojen depolarından beslenen tükenmez UDPGA stoğuyla tüm trafiği sırtlar. Doz 10 gramı aştığında ise her iki gişe de çöker ve arabalar uçuruma (CYP2E1 toksik yoluna) yuvarlanır.",
              "ar": "نموذج ذهني عبقري! ينفد كاشف PAPS في مسار SULT سريعاً عند زيادة الجرعة، فيتولى UGT العبء الأكبر بفضل فيض كواشف UDPGA. لكن عند تجاوز 10 غرامات، تنهار كل المنافذ وتهوي الجزيئات في هاوية CYP2E1 لتكوين السم NAPQI.",
              "en": "Superb conceptual anchor! SULT's low PAPS capacity saturates at modest doses. UGT's massive UDPGA reservoir absorbs the bulk overflow. When intake exceeds 10 grams, even UGT saturates, forcing molecules down the catastrophic CYP2E1 shunt."
            }
          },
          {
            "id": "opt-3b",
            "text": {
              "tr": "Tüm arabalar geri vitese takarak mideden ağız yoluyla dışarı kaçar.",
              "ar": "تعود جميع السيارات للخلف لتهرب عبر الفم بالتقيؤ الفوري.",
              "en": "All drug molecules reverse direction, climbing back up the esophagus to escape through the mouth."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Geri kaçış yanılgısı: Sistemik dolaşıma emilen ilaç molekülleri kanda kalır ve karaciğer sinüzoidlerinden geçmek zorundadır; mideden geri çıkamaz.",
              "ar": "خطأ التراجع: تمتص الجزيئات إلى الدم وتدخل الجيوب الكبدية حتماً؛ ولا يمكنها العودة تلقائياً للمعدة بعد الامتصاص.",
              "en": "Retrograde fallacy: Absorbed drugs reside in mesenteric blood and must transit the portal vein; systemic molecules cannot spontaneously reverse into the stomach."
            }
          },
          {
            "id": "opt-3c",
            "text": {
              "tr": "Gişeler ilacı tanımayıp pasaport sorar ve ilacı hapse atar.",
              "ar": "تطلب الأكشاك جواز سفر من الجزيء وتلقي به في سجن الإنزيمات.",
              "en": "The tollbooths demand passports from drug molecules, imprisoning them in cellular jail cells."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Absürt distraktör: Enzim-substrat bağlanması pasaport veya hukuk kurallarıyla değil, non-kovalan kimyasal tamamlayıcılıkla çalışır.",
              "ar": "خطأ عبثي: الارتباط الإنزيمي يخضع لقوى التجاذب الكيميائي الفراغي وليس لإجراءات قانونية بشرية.",
              "en": "Nonsensical trap: Enzymatic interaction is dictated by lock-and-key thermodynamic fit, not anthropomorphic legalities."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "biyotransformasyon doygunluğu", "arContext": "تشبع التحول الحيوي (biotransformation saturation)" },
        { "term": "toksik şantlanma (pathway shunting)", "arContext": "التحول نحو المسار السام" }
      ],
      "hints": [
        {
          "tr": "Hızlı ama dar bir kapı yoğun yük altında ilk önce tıkanır.",
          "ar": "البوابة السريعة الضيقة هي أول ما يختنق عند تدفق الحشود الكبيرة.",
          "en": "A fast but narrow gateway is the first to become overwhelmed by a surge."
        },
        {
          "tr": "Geniş liman (UGT) kapasitesi sayesinde aşırı yükü göğüsleyebilir.",
          "ar": "الميناء الواسع (UGT) قادر على استيعاب الحمولات الضخمة بفضل سعته الفائقة.",
          "en": "The high-capacity terminal (UGT) accommodates the bulk load."
        },
        {
          "tr": "Kapasite aşıldığında metabolizma alternatif toksik yola (CYP) kayar.",
          "ar": "عند فيضان الطاقة الاستيعابية، تنحرف الجزيئات للمسار السام البديل (CYP).",
          "en": "When both safe outlets overflow, molecules are shunted to the toxic CYP pathway."
        }
      ],
      "sources": [{ "file": "İlaç metabolizması-2026.pdf", "page": 32 }]
    },
    {
      "id": "mc-mod5-les2-step-04",
      "stage": "visual_explanation",
      "stageIndex": 4,
      "type": "visual_explanation",
      "title": {
        "tr": "Asetilasyon Paradoksu: Sülfadiazin Neden Böbrekte Çöker?",
        "ar": "مفارقة الأستلة: لماذا يترسب السلفاديازين في الكلى؟",
        "en": "The Acetylation Paradox: Why Does Sulfadiazine Precipitate in Kidneys?"
      },
      "prompt": {
        "tr": "Genel kural: 'Faz II konjugasyonları molekülü daha polar ve suda çözünür yapar.' Ancak sülfadiazin karaciğerde N4-asetillendiğinde böbrek tübüllerinde kristalüri (çökelme) yapar! Bu kural dışı çelişkinin kimyasal sebebi nedir?",
        "ar": "القاعدة: تفاعلات المرحلة الثانية تزيد القطبية والذوبانية. لكن أستلة السلفاديازين تؤدي لترسبه بلورياً في الكلى! ما هو السبب الكيميائي لهذا الاستثناء؟",
        "en": "General dogma states Phase II conjugation increases polarity and water solubility. Yet N4-acetylation of sulfadiazine precipitates in renal tubules as crystalluria! What chemical mechanism explains this paradox?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-4a",
            "text": {
              "tr": "Asetilasyon bazik primer amini nötr amite çevirir; iyonlaşma ve polarite azalır. Oluşan N4-asetil türevi asidik idrarda suda çözünmez ve çöker.",
              "ar": "تحول الأستلة الأمين الأولي القاعدي إلى أميد حيادي، فتنقص القطبية والتأين؛ مما يجعل المستقلب غير ذؤوب في البول الحمضي فيترسب.",
              "en": "Acetylation converts the basic primary amine into a neutral amide, decreasing polarity and ionization; the N4-acetyl metabolite is poorly soluble in acidic urine."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Mükemmel kimyasal analiz! Slayt 2 ve 31'in en kritik sınav istisnası: Glukuronidasyon ve sülfasyon moleküle asidik iyonize gruplar takarken, N-asetilasyon (NAT-2) lipofilisiteyi artırır veya nötr bırakır. Sülfadiazin molekülündeki p-amino grubu asetillendiğinde çözünürlük dramatik şekilde düşer. Asidik idrarda kristalleşerek böbrek yetmezliği yapar (bu yüzden sülfonamidlerde bol su ve NaHCO3 verilir).",
              "ar": "تحليل كيميائي استثنائي! الشريحة 2 و 31: بينما يضيف الجلوكورونيد شحنات قطبية، فإن الأستلة (NAT-2) تقلل القطبية والذوبانية المائية. مركب N4-acetylsulfadiazine يترسب كبلورات إبرية في النبيبات الكلوية مسبباً بيلة بلورية وقصوراً كلوياً، لذا يُعطى المريض بيكربونات الصوديوم لجعل البول قلوياً.",
              "en": "Masterful chemical deduction! Slides 2 & 31 benchmark: Unlike glucuronidation, N-acetylation (NAT-2) masks the basic amine as a neutral lipophilic acetamide. N4-acetylsulfadiazine possesses drastically lower water solubility at acidic urine pH, forming sharp crystals that lacerate renal tubules unless alkalinized with NaHCO3."
            }
          },
          {
            "id": "opt-4b",
            "text": {
              "tr": "Sülfadiazin karaciğerde saf altına dönüşür; altın ağır olduğu için idrarda dibe çöker.",
              "ar": "يتحول السلفاديازين في الكبد إلى ذهب خالص يترسب في القاع لثقله.",
              "en": "Sulfadiazine undergoes transmutation in hepatocytes into metallic gold, sinking due to its high density."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Simya yanılgısı: Kimyasal elementler biyolojik enzimlerle altına dönüştürülemez (simya mittir); çökelme organik amitin asidik çözünürlük kaybıdır.",
              "ar": "خطأ الخيمياء: الإنزيمات لا تصنع الذهب؛ الترسب ناتج ببساطة عن انخفاض انحلالية الأميد العضوي في الوسط الحمضي.",
              "en": "Alchemical fallacy: Enzymes cannot alter nuclear identity to create gold; crystalluria is strictly the physical precipitation of a poorly soluble organic acetamide."
            }
          },
          {
            "id": "opt-4c",
            "text": {
              "tr": "Böbrekler sülfonamidleri görünce aniden taş üretir ve hastada 5 dakikada kalsiyum taşı çıkar.",
              "ar": "تولد الكلية حصيات كلسية فجائية خلال 5 دقائق بمجرد رؤية السلفوناميد.",
              "en": "Kidneys instantly synthesize calcium oxalate stones within 5 minutes upon detecting sulfonamides."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Taş tipi yanılgısı: Kristalüride çöken madde kalsiyum taşı değil, ilacın kendi metaboliti olan N4-asetilsülfadiazin kristalleridir.",
              "ar": "خطأ نوع الحصى: المادة المترسبة ليست كلسية بل هي جزيئات المستقلب الدوائي نفسه لقلة ذوبانيته في البول.",
              "en": "Stone pathology fallacy: The crystals are not endogenous calcium oxalate; they are needle-like precipitates of the drug's own N4-acetyl metabolite."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "kristalüri (crystalluria)", "arContext": "البيلة البلورية (crystalluria)" },
        { "term": "N-asetilasyon polarite istisnası", "arContext": "استثناء انخفاض القطبية بالأستلة" }
      ],
      "hints": [
        {
          "tr": "Asetilasyon reaksiyonunda moleküle bir asetil grubu (-COCH3) takılır.",
          "ar": "في تفاعل الأستلة تُضاف مجموعة أسيتيل كارهة للماء (-COCH3).",
          "en": "Acetylation attaches a hydrophobic two-carbon acetyl group (-COCH3)."
        },
        {
          "tr": "Bazik primer amin (-NH2) nötr bir amite (-NHCOCH3) dönüştüğünde iyonlaşma kabiliyeti kaybolur.",
          "ar": "بتحول الأمين الأولي إلى أميد حيادي، تفقد الجزيئة قدرتها على التأين الحمضي.",
          "en": "Converting a polar basic amine into a neutral amide destroys its ability to ionize."
        },
        {
          "tr": "Polaritesi azalan metabolit asidik idrarda çözünemez ve tübüllerde kristalleşir.",
          "ar": "يعجز المستقلب منخفض القطبية عن الذوبان في البول الحمضي فيترسب.",
          "en": "The un-ionized, low-polarity metabolite precipitates out of solution in acidic urine."
        }
      ],
      "sources": [{ "file": "İlaç metabolizması-2026.pdf", "page": 2 }]
    },
    {
      "id": "mc-mod5-les2-step-05",
      "stage": "interactive_artifact",
      "stageIndex": 5,
      "type": "metabolism_map",
      "widgetType": "MetabolismMap",
      "title": {
        "tr": "İnteraktif Metabolizma Haritası: Parasetamol Yolakları",
        "ar": "خريطة الاستقلاب التفاعلية: مسارات الباراسيتامول",
        "en": "Interactive Metabolism Map: Paracetamol Biotransformation Divergence"
      },
      "prompt": {
        "tr": "Parasetamolün karaciğerdeki 4 temel metabolik yolağını inceleyin. Aşırı dozda ölümcül hepatotoksisiteye yol açan sitokrom P450 biyoaktivasyon bölgesini harita üzerinde belirleyin.",
        "ar": "تفحص مسارات الباراسيتامول الأربعة في الكبد. حدد موقع التنشيط الحيوي عبر CYP450 المسؤول عن السمية الكبدية القاتلة عند الجرعة المفرطة.",
        "en": "Explore the 4 primary hepatic pathways of paracetamol. Identify the cytochrome P450 bioactivation site responsible for generating the fatal hepatotoxic metabolite."
      },
      "predictThenReveal": false,
      "config": {
        "drugName": "Paracetamol (Asetaminofen)",
        "prompt": "Hepatotoksik kinonimin (NAPQI) oluşturan CYP2E1 biyoaktivasyon bölgesini seçin.",
        "moleculeSvgDescription": "Parasetamol p-asetamidofenol iskeleti, fenolik -OH ve asetamid azotu",
        "sites": [
          {
            "id": "site_glucuronidation",
            "label": "4-O-Glukuronidasyon",
            "x": 120,
            "y": 50,
            "enzyme": "UGT1A6 / UGT1A9",
            "phase": "Phase II",
            "reactionType": "O-Glukuroniltransferaz Konjugasyonu",
            "metaboliteOutcome": "Majör güvenli yol (%60); yüksek oranda polar, suda çözünen glukuronit böbreklerle atılır.",
            "toxicityFlag": "non_toxic",
            "isTargetSite": false
          },
          {
            "id": "site_sulfation",
            "label": "4-O-Sülfasyon",
            "x": 260,
            "y": 50,
            "enzyme": "SULT1A1 (PAPS donörü)",
            "phase": "Phase II",
            "reactionType": "Sülfotransferaz Konjugasyonu",
            "metaboliteOutcome": "Sekonder güvenli yol (%35); yüksek afiniteli ancak düşük kapasiteli sülfat konjugatı idrarla atılır.",
            "toxicityFlag": "non_toxic",
            "isTargetSite": false
          },
          {
            "id": "site_cyp2e1_napqi",
            "label": "N-Oksidasyon / CYP2E1 (NAPQI)",
            "x": 190,
            "y": 140,
            "enzyme": "CYP2E1 / CYP1A2",
            "phase": "Phase I",
            "reactionType": "N-Hidroksilasyon ve Spontan Dehidrasyon",
            "metaboliteOutcome": "Son derece reaktif elektrofil N-asetil-p-benzokinonimin (NAPQI) üretir; glutatyon tükenince karaciğer nekrozu yapar.",
            "toxicityFlag": "toxic",
            "isTargetSite": true
          },
          {
            "id": "site_glutathione",
            "label": "Glutatyon (GSH) Detoksifikasyonu",
            "x": 330,
            "y": 140,
            "enzyme": "Glutatyon S-Transferaz (GST)",
            "phase": "Phase II",
            "reactionType": "Glutatyon Konjugasyonu -> Merkaptürik Asit",
            "metaboliteOutcome": "NAPQI elektrofilini tiyol (-SH) ile yakalar; merkaptürik asit türevi halinde idrarla zararsız atar.",
            "toxicityFlag": "non_toxic",
            "isTargetSite": false
          }
        ],
        "source": {
          "file": "İlaç metabolizması-2026.pdf",
          "page": 35
        },
        "explanation": "Terapötik dozda parasetamol %95 oranında UGT ve SULT ile temizlenir. %5'lik NAPQI ise glutatyon ile yakalanır. Aşırı dozda GSH tükenir ve serbest NAPQI hepatosit nekrozu başlatır."
      },
      "widget": {
        "type": "MetabolismMap",
        "config": {
          "drugName": "Paracetamol (Asetaminofen)",
          "prompt": "Hepatotoksik kinonimin (NAPQI) oluşturan CYP2E1 biyoaktivasyon bölgesini seçin.",
          "moleculeSvgDescription": "Parasetamol p-asetamidofenol iskeleti, fenolik -OH ve asetamid azotu",
          "sites": [
            {
              "id": "site_glucuronidation",
              "label": "4-O-Glukuronidasyon",
              "x": 120,
              "y": 50,
              "enzyme": "UGT1A6 / UGT1A9",
              "phase": "Phase II",
              "reactionType": "O-Glukuroniltransferaz Konjugasyonu",
              "metaboliteOutcome": "Majör güvenli yol (%60); yüksek oranda polar, suda çözünen glukuronit böbreklerle atılır.",
              "toxicityFlag": "non_toxic",
              "isTargetSite": false
            },
            {
              "id": "site_sulfation",
              "label": "4-O-Sülfasyon",
              "x": 260,
              "y": 50,
              "enzyme": "SULT1A1 (PAPS donörü)",
              "phase": "Phase II",
              "reactionType": "Sülfotransferaz Konjugasyonu",
              "metaboliteOutcome": "Sekonder güvenli yol (%35); yüksek afiniteli ancak düşük kapasiteli sülfat konjugatı idrarla atılır.",
              "toxicityFlag": "non_toxic",
              "isTargetSite": false
            },
            {
              "id": "site_cyp2e1_napqi",
              "label": "N-Oksidasyon / CYP2E1 (NAPQI)",
              "x": 190,
              "y": 140,
              "enzyme": "CYP2E1 / CYP1A2",
              "phase": "Phase I",
              "reactionType": "N-Hidroksilasyon ve Spontan Dehidrasyon",
              "metaboliteOutcome": "Son derece reaktif elektrofil N-asetil-p-benzokinonimin (NAPQI) üretir; glutatyon tükenince karaciğer nekrozu yapar.",
              "toxicityFlag": "toxic",
              "isTargetSite": true
            },
            {
              "id": "site_glutathione",
              "label": "Glutatyon (GSH) Detoksifikasyonu",
              "x": 330,
              "y": 140,
              "enzyme": "Glutatyon S-Transferaz (GST)",
              "phase": "Phase II",
              "reactionType": "Glutatyon Konjugasyonu -> Merkaptürik Asit",
              "metaboliteOutcome": "NAPQI elektrofilini tiyol (-SH) ile yakalar; merkaptürik asit türevi halinde idrarla zararsız atar.",
              "toxicityFlag": "non_toxic",
              "isTargetSite": false
            }
          ],
          "source": {
            "file": "İlaç metabolizması-2026.pdf",
            "page": 35
          },
          "explanation": "Terapötik dozda parasetamol %95 oranında UGT ve SULT ile temizlenir. %5'lik NAPQI ise glutatyon ile yakalanır. Aşırı dozda GSH tükenir ve serbest NAPQI hepatosit nekrozu başlatır."
        }
      },
      "technicalTerms": [
        { "term": "biyoaktivasyon toksisitesi", "arContext": "سمية التنشيط الحيوي" },
        { "term": "hepatosit nekrozu", "arContext": "تنخر الخلايا الكبدية" }
      ],
      "hints": [
        {
          "tr": "Parasetamolün toksik metaboliti bir Faz I oksidasyon ürünüdür.",
          "ar": "المستقلب السام للباراسيتامول هو ناتج أكسدة من المرحلة الأولى.",
          "en": "The toxic metabolite of acetaminophen is produced by a Phase I oxidation."
        },
        {
          "tr": "CYP2E1 enzimi asetamid azotunu N-hidroksiller ve su kaybederek kinonimin (NAPQI) oluşturur.",
          "ar": "يهدرل CYP2E1 نيتروجين الأسيتاميد لتتشكل وسائط الكينونيمين (NAPQI).",
          "en": "CYP2E1 hydroxylates the amide nitrogen to eliminate water, forging electrophilic NAPQI."
        },
        {
          "tr": "Haritada kırmızı toksisite bayrağı taşıyan CYP2E1 bölgesi hedef metabolik alandır.",
          "ar": "موقع CYP2E1 الذي يحمل علامة السمية الحمراء هو الهدف المطلوب على الخريطة.",
          "en": "The CYP2E1 locus marked with the red toxicity flag is your target site."
        }
      ],
      "sources": [{ "file": "İlaç metabolizması-2026.pdf", "page": 35 }]
    },
    {
      "id": "mc-mod5-les2-step-06",
      "stage": "guided_discovery",
      "stageIndex": 6,
      "type": "guided_discovery",
      "title": {
        "tr": "Rehberli Keşif: Merkaptürik Asit Montaj Hattı",
        "ar": "استكشاف موجه: خط إنتاج حمض الميركابتوريك",
        "en": "Guided Discovery: The Mercapturic Acid Assembly Line"
      },
      "prompt": {
        "tr": "Toksik bir elektrofil glutatyon (GSH: Glu-Cys-Gly) ile yakalandığında 3 amino asitlik devasa bir konjugat oluşur. Vücut bu iri molekülü idrarla atmak için adım adım nasıl budar?",
        "ar": "عندما يقتنص الجلوتاثيون (GSH: Glu-Cys-Gly) جزيئاً ساماً، يتكون مركب ثلاثي الببتيد ضخم. كيف يقلم الجسم هذه الجزيئة خطوة بخطوة لطرحها بالبول؟",
        "en": "When a toxic electrophile is trapped by glutathione (GSH: Glu-Cys-Gly), a bulky tripeptide adduct forms. How does the body systematically trim this conjugate for safe urinary clearance?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-6a",
            "text": {
              "tr": "Önce glutamat (gGT) ardından glisin (dipeptidaz) koparılır; kalan sistein konjugatı NAT ile N-asetillenerek merkaptürik asit türevi halinde idrarla atılır.",
              "ar": "يُفصل الجلوتامات بـ gGT ثم الجليسين بإنزيم ببتيداز؛ ويُؤستل السيسيتين المتبقي بـ NAT ليُطرح كحمض ميركابتوريك في البول.",
              "en": "First glutamate is cleaved by gamma-GT, then glycine by a dipeptidase; the remaining cysteine adduct is N-acetylated by NAT into mercapturic acid for urine excretion."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Harikulade biyokimyasal kavrayış! Slayt 36'daki merkaptürik asit yolu: 1. GST enzimi elektrofile GSH ekler. 2. Böbrek ve karaciğerde gama-glutamiltranspeptidaz (gGT) glutamatı koparır. 3. Dipeptidaz enzimi glisini koparır; geriye sistein-ilaç konjugatı kalır. 4. Mikrozomal NAT enzimi sistein aminini asetilleyerek N-asetilsistein (merkaptürik asit) türevine çevirir. Bu asidik ürün idrarla hızla temizlenir.",
              "ar": "إدراك بيوكيميائي باهر! مسار حمض الميركابتوريك (الشريحة 36): يربط GST الجلوتاثيون أولاً. يفصل إنزيم gGT الجلوتامات، ثم يقص الببتيداز الجليسين ليبقى مركب السيستئين. وأخيراً يؤستل إنزيم NAT أمين السيستئين لينتج حمض الميركابتوريك الذؤوب والمعد للإطراح البولي السريع.",
              "en": "Magnificent biochemical insight! Slide 36 assembly line: GST links GSH to the electrophile. Gamma-GT trims glutamate, and dipeptidase cleaves glycine, leaving a cysteine adduct. Finally, NAT N-acetylates the cysteine to forge mercapturic acid for rapid urinary clearance."
            }
          },
          {
            "id": "opt-6b",
            "text": {
              "tr": "Hücre tüm tripeptidi parçalamadan doğrudan kana verir ve molekül akciğerlerden öksürükle atılır.",
              "ar": "تطلق الخلية الببتيد الثلاثي بالدم كاملاً ليطرده المريض مع السعال عبر الرئتين.",
              "en": "The cell releases the intact tripeptide into blood, where it is coughed out through the lungs."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Solunumla atılım yanılgısı: Peptit konjugatları uçucu değildir; akciğerlerle öksürülerek atılamaz. Böbrek tübüler transportuyla idrara geçmek için merkaptürik asit budaması şarttır.",
              "ar": "خطأ الطرح بالسعال: الببتيدات جزيئات غير متطايرة ومستحيلة الطرح بالرئتين؛ وقص الببتيد إلى حمض ميركابتوريك إلزامي لطرحها كلوياً.",
              "en": "Respiratory fallacy: Peptide conjugates are non-volatile hydrophilic macromolecules; renal organic anion transporters require processing into mercapturic acid."
            }
          },
          {
            "id": "opt-6c",
            "text": {
              "tr": "Glutatyon ilacı kalıcı olarak kemik iliğine gömer ve ömür boyu vücutta saklar.",
              "ar": "يدفن الجلوتاثيون الدواء نهائياً في نقي العظام ليخزنه طوال حياة المريض.",
              "en": "Glutathione buries the toxic drug inside bone marrow, storing it permanently for life."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kemik iliği birikimi yanılgısı: Glutatyon konjugasyonunun amacı depolamak değil, tam aksine yabancı maddeyi hızla böbreklerden dışarı atmaktır.",
              "ar": "خطأ التخزين في العظام: هدف الجلوتاثيون هو التخلص السريع من السموم عبر البول، وليس تخزينها في نخاع العظم.",
              "en": "Sequestration fallacy: Glutathione conjugation is not a storage mechanism; its evolutionary purpose is rapid clearance via urine."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "merkaptürik asit yolu", "arContext": "مسار حمض الميركابتوريك (mercapturic acid pathway)" },
        { "term": "gama-glutamiltranspeptidaz (gGT)", "arContext": "إنزيم غاما-جلوتاميل ترانسببتيداز" }
      ],
      "hints": [
        {
          "tr": "Glutatyon 3 amino asitten (Glutamat-Sistein-Glisin) oluşan bir tripeptittir.",
          "ar": "الجلوتاثيون ببتيد ثلاثي مكون من جلوتامات وسيسيتين وجليسين.",
          "en": "Glutathione is a tripeptide composed of Glutamate-Cysteine-Glycine."
        },
        {
          "tr": "Uçlardaki glutamat ve glisin amino asitleri hidrolazlarla tek tek kesilir.",
          "ar": "تُقص الأحماض الأمينية الطرفية (الجلوتامات والجليسين) بالإنزيمات تباعاً.",
          "en": "Terminal glutamate and glycine residues are enzymatically clipped off."
        },
        {
          "tr": "Kalan sistein konjugatı asetillenerek N-asetilsistein (merkaptürik asit) halinde idrara verilir.",
          "ar": "يُؤستل السيستئين المتبقي ليشكل حمض الميركابتوريك الذي يُطرح بالبول.",
          "en": "The residual cysteine adduct is N-acetylated into mercapturic acid for renal excretion."
        }
      ],
      "sources": [{ "file": "İlaç metabolizması-2026.pdf", "page": 36 }]
    },
    {
      "id": "mc-mod5-les2-step-07",
      "stage": "formal_explanation",
      "stageIndex": 7,
      "type": "formal_explanation",
      "title": {
        "tr": "NAT-2 Farmakogenetiği: Hızlı vs Yavaş Asetilatörler",
        "ar": "علم الوراثة الدوائي لـ NAT-2: المؤستلون السريعون مقابل البطيئين",
        "en": "NAT-2 Pharmacogenetics: Fast vs. Slow Acetylator Phenotypes"
      },
      "prompt": {
        "tr": "Tüberküloz ilacı izoniyazid kullanan hastaların %50-60'ında (yavaş asetilatörler) periferik nöropati riski tavan yaparken, hızlı asetilatörlerde tedavi başarısızlığı görülür. Bu genetik uçurumun nedeni nedir?",
        "ar": "ترتفع خطورة الاعتلال العصبي لدى 50-60% من مرضى السل المعالجين بالإيزونيازيد (المؤستلون البطيئون)، بينما يفشل العلاج لدى السريعين. ما سبب هذا التباين الوراثي؟",
        "en": "Among tuberculosis patients on isoniazid, 50-60% (slow acetylators) face severe peripheral neuropathy, whereas fast acetylators risk treatment failure. What biochemical mechanism drives this genetic divergence?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-7a",
            "text": {
              "tr": "NAT-2 enzim polimorfizmi: Yavaş asetilatörlerde enzim düzeyi düşüktür; serbest izoniyazid kanda birikerek piridoksin (B6) eksikliği ve periferik nöropati yapar.",
              "ar": "تباين جيني في NAT-2: يمتلك المؤستلون البطيئون إنزيماً قليل الكفاءة؛ فيتراكم الإيزونيازيد حراً ويستنزف فيتامين B6 مسبباً اعتلالاً عصبياً.",
              "en": "NAT-2 polymorphism: Slow acetylators have defective enzyme levels; parent isoniazid accumulates, depleting pyridoxine (B6) and triggering peripheral neuropathy."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kusursuz farmakogenetik analiz! Slayt 40 verisi: N-Asetiltransferaz-2 (NAT-2) geni polimorfiktir. Türk ve Avrupa toplumlarının %50-60'ı yavaş asetilatördür. İzoniyazid yavaş inaktive olduğunda kanda yükselir, B6 vitaminini bağlayarak nöropatiye yol açar (veya hidralazinde ilaca bağlı SLE tablosu gelişir). Japonlarda ise %90 hızlı asetilatördür; standart doz hızla yıkılarak yetersiz kalır.",
              "ar": "تحليل وراثي دوائي متقن! الشريحة 40: جين NAT-2 متباين وراثياً. 50-60% من مجتمعاتنا مؤستلون بطيئون، فيتراكم الإيزونيازيد ويستنزف فيتامين B6 مسبباً تلفاً عصبياً (أو ذئبة حمامية مع الهيدرالازين). أما لدى 90% من اليابانيين فالتخلص سريع جداً وقد يفشل العلاج.",
              "en": "Superb pharmacogenetic analysis! Slide 40: NAT-2 polymorphism splits populations. In slow acetylators (50-60% of Caucasians), parent isoniazid accumulates to deplete pyridoxine (B6), triggering neurotoxicity or hydralazine-induced lupus (SLE). In fast acetylators, rapid clearance risks subtherapeutic failure."
            }
          },
          {
            "id": "opt-7b",
            "text": {
              "tr": "Yavaş asetilatörlerin böbrekleri tamamen kapalıdır ve hiçbir kimyasal maddeyi süzemez.",
              "ar": "كلى المؤستلين البطيئين مغلقة بالكامل وعاجزة عن ترشيح أي مادة كيميائية.",
              "en": "Slow acetylators suffer from completely fused kidneys that possess zero glomerular filtration capability."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Böbrek yetmezliği yanılgısı: Yavaş asetilatörlerin böbrekleri tamamen sağlıklıdır; sorun böbrekte değil karaciğerdeki NAT-2 enziminin genetik mutasyonundadır.",
              "ar": "خطأ الفشل الكلوي: كلى هؤلاء المرضى سليمة تماماً؛ والخلل يكمن حصراً في بطء نشاط إنزيم NAT-2 الكبدي المشفر جينياً.",
              "en": "Renal failure misconception: Glomerular filtration is completely intact; the phenotype reflects point mutations in the hepatic NAT-2 gene."
            }
          },
          {
            "id": "opt-7c",
            "text": {
              "tr": "Hızlı asetilatörler her sabah 5 kilometre koştukları için ilacı ter bezleriyle buharlaştırırlar.",
              "ar": "المؤستلون السريعون يركضون 5 كيلومترات صباحاً فيبخرون الدواء مع العرق.",
              "en": "Fast acetylators run 5 kilometers every morning, evaporating all medication through physical sweat."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Fiziksel aktivite yanılgısı: Asetilatör fenotipi fiziksel egzersizle değil, DNA dizisindeki kalıtsal NAT-2 gen varyantlarıyla belirlenir.",
              "ar": "خطأ التمارين الرياضية: النمط الظاهري وراثي جيني بحت محدد في تسلسل DNA ولا يرتبط باللياقة البدنية للمريض.",
              "en": "Exercise fallacy: Acetylator status is an inherited Mendelian autosomal trait encoded in genomic DNA, completely independent of athletic activity."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "NAT-2 enzim polimorfizmi", "arContext": "التباين الوراثي لإنزيم NAT-2" },
        { "term": "ilaca bağlı lupus sendromu (SLE)", "arContext": "الذئبة الحمامية المحدثة بالأدوية" }
      ],
      "hints": [
        {
          "tr": "İzoniyazid tüberküloz tedavisinde karaciğer NAT-2 enzimiyle inaktive edilir.",
          "ar": "يُعطل دواء الإيزونيازيد كبدياً بواسطة إنزيم NAT-2.",
          "en": "Isoniazid is inactivated in the liver by the polymorphic NAT-2 enzyme."
        },
        {
          "tr": "Yavaş asetilatörlerde ilaç vücutta daha uzun süre kalır ve kanda birikir.",
          "ar": "لدى المؤستلين البطيئين يمكث الدواء طويلاً ويتراكم بتراكيز مرتفعة.",
          "en": "In slow acetylators, the parent drug is cleared slowly, accumulating to toxic levels."
        },
        {
          "tr": "Biriken izoniyazid B6 vitaminini tüketerek periferik nöropatiye yol açar.",
          "ar": "يستنزف الدواء المتراكم فيتامين B6 مؤدياً إلى تلف الأعصاب المحيطية.",
          "en": "Accumulated isoniazid binds and depletes vitamin B6, triggering peripheral neuropathy."
        }
      ],
      "sources": [{ "file": "İlaç metabolizması-2026.pdf", "page": 40 }]
    },
    {
      "id": "mc-mod5-les2-step-08",
      "stage": "concept_check",
      "stageIndex": 8,
      "type": "concept_check",
      "title": {
        "tr": "Hücresel Yerleşim Tuzağı: Mikrozomal vs Sitozolik Enzimler",
        "ar": "فخ التموضع الخلوي: الإنزيمات الميكروزومية مقابل السيتوزولية",
        "en": "Cellular Localization Trap: Microsomal vs. Cytosolic Transferases"
      },
      "prompt": {
        "tr": "Bir öğrenci sınavda 'Tüm Faz II transferaz enzimleri sitozolde çözünmüş halde bulunur' demiştir. Bu iddiayı çürüten ve endoplazmik retikuluma gömülü olan majör Faz II enzimi hangisidir?",
        "ar": "ادعى طالب أن 'جميع إنزيمات المرحلة الثانية تسبح ذائبة في السيتوزول'. ما هو الإنزيم الرئيسي الذي يدحض هذا الادعاء لكونه مدمجاً في الشبكة الإندوبلازمية؟",
        "en": "A student claims that 'all Phase II conjugation enzymes are dissolved in the soluble cytosol.' Which vital transferase refutes this claim by being embedded in the endoplasmic reticulum membrane?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-8a",
            "text": {
              "tr": "UDP-Glukuroniltransferaz (UGT); endoplazmik retikulum membranına gömülü mikrozomal bir enzimdir (SULT, NAT ve GST ise sitozoliktir).",
              "ar": "إنزيم UGT (جلوكورونيل ترانسفيراز)؛ فهو إنزيم ميكروزومي مدمج في غشاء الشبكة الإندوبلازمية (بينما SULT و NAT و GST سيتوزولية).",
              "en": "UDP-Glucuronosyltransferase (UGT); it is an integral membrane-bound microsomal enzyme (whereas SULT, NAT, and GST are cytosolic)."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Harika bir sınav tuzağı yakalandı! Slayt 33 ve 38'in kritik ayrımı: Faz II enzimlerinin çoğu (SULT, NAT, GST, COMT) sitozoliktir. Ancak en yüksek kapasiteli Faz II enzimi olan UGT, endoplazmik retikulum membranına gömülüdür (mikrozomal fraksiyonda yer alır). Aktif bölgesi ER lümenine bakar; bu yüzden UDPGA kofaktörü membran taşıyıcılarıyla içeri alınır.",
              "ar": "إمساك بارع بفخ امتحاني كلاسيكي! الشريحة 33 و 38: معظم إنزيمات الاقتران سيتوزولية، لكن إنزيم UGT صاحب السعة الكبرى ميكروزومي متغلغل في غشاء الشبكة الإندوبلازمية وموقعه التحفيزي يواجه جوف الشبكة.",
              "en": "Classic exam trap mastered! Slides 33 & 38: While most Phase II transferases (SULT, NAT, GST) reside in soluble cytosol, the high-capacity UGT is an integral ER transmembrane protein whose catalytic site faces the luminal compartment."
            }
          },
          {
            "id": "opt-8b",
            "text": {
              "tr": "Sülfotransferaz (SULT); sadece mitokondri iç çekirdeğinde bulunur.",
              "ar": "إنزيم SULT؛ يتواجد حصراً في النواة الداخلية للميتوكوندريا.",
              "en": "Sulfotransferase (SULT); it is exclusively sequestered inside the inner mitochondrial matrix."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "SULT yerleşim yanılgısı: SULT enzimleri sitozolde çözünmüş haldedir; mikrozomal veya mitokondriyal değildir.",
              "ar": "خطأ تموضع SULT: إنزيمات SULT ذائبة في السيتوزول وليست ميتوكوندرية.",
              "en": "SULT localization fallacy: Sulfotransferases are soluble cytosolic enzymes; they are neither mitochondrial nor microsomal."
            }
          },
          {
            "id": "opt-8c",
            "text": {
              "tr": "Glutatyon S-transferaz (GST); sadece hücre dışı saç köklerinde yaşar.",
              "ar": "إنزيم GST؛ يعيش حصراً في بصيلات الشعر خارج الخلايا.",
              "en": "Glutathione S-transferase (GST); it resides exclusively in extracellular hair follicles."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "GST saç yanılgısı: GST hepatosit ve diğer hücre sitozollerinde bol miktarda bulunan koruyucu bir detoksifikasyon enzimidir.",
              "ar": "خطأ بصيلات الشعر: يتواجد GST بوفرة في سيتوزول خلايا الكبد والأنسجة لحمايتها من السموم.",
              "en": "Hair follicle absurdity: GST is abundant in hepatocyte cytosol, protecting intracellular nucleophiles from electrophilic injury."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "mikrozomal UGT enzimi", "arContext": "إنزيم UGT الميكروزومي" },
        { "term": "sitozolik transferazlar", "arContext": "إنزيمات التحويل السيتوزولية" }
      ],
      "hints": [
        {
          "tr": "Hücre kırıldığında endoplazmik retikulum parçaları mikrozom keseciklerini oluşturur.",
          "ar": "عند تفتيت الخلية تشكل أجزاء الشبكة الإندوبلازمية حويصلات الميكروزوم.",
          "en": "Centrifugation pellets endoplasmic reticulum fragments into the microsomal fraction."
        },
        {
          "tr": "CYP450 gibi endoplazmik retikulum zarına gömülü olan tek Faz II enzimi glukuronidasyonu yapandır.",
          "ar": "إنزيم المرحلة الثانية الوحيد المدمج في غشاء الشبكة الإندوبلازمية كـ CYP450 هو المسؤول عن الجلوكورونيد.",
          "en": "The only Phase II transferase co-localized with CYP450 in the ER membrane is UGT."
        },
        {
          "tr": "Doğru yanıt mikrozomal UDP-Glukuroniltransferaz (UGT) enzimidir.",
          "ar": "الجواب الصحيح هو إنزيم UDP-Glucuronosyltransferase (UGT) الميكروزومي.",
          "en": "The correct answer is microsomal UDP-Glucuronosyltransferase (UGT)."
        }
      ],
      "sources": [{ "file": "İlaç metabolizması-2026.pdf", "page": 33 }]
    },
    {
      "id": "mc-mod5-les2-step-09",
      "stage": "application",
      "stageIndex": 9,
      "type": "clinical_vignette",
      "title": {
        "tr": "Klinik Vaka: N-Asetilsistein (NAC) ve Kritik Zaman Penceresi",
        "ar": "حالة سريرية: ترياق N-أسيتيل سيستئين والنافذة الزمنية الحرجة",
        "en": "Clinical Vignette: N-Acetylcysteine (NAC) & The Critical Antidote Window"
      },
      "prompt": {
        "tr": "Parasetamol zehirlenmesinde antidot olan N-Asetilsistein (NAC) ilk 8-10 saat içinde başlandığında karaciğeri %100 kurtarırken, 24 saatten sonra neden yetersiz kalır? Biyokimyasal kurtarma mekanizması nedir?",
        "ar": "ينقذ ترياق N-acetylcysteine (NAC) الكبد بنسبة 100% إذا أُعطي في الساعات 8-10 الأولى، لكن كفاءته تتلاشى بعد 24 ساعة. ما هي آلية الإنقاذ البيوكيميائية؟",
        "en": "N-Acetylcysteine (NAC) prevents fatal liver damage if initiated within 8-10 hours of paracetamol overdose, yet loses efficacy after 24 hours. What is the biochemical rescue mechanism?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-9a",
            "text": {
              "tr": "NAC serbest sistein sağlayarak tükenen glutatyon (GSH) sentezini hızla yeniler; ancak GSH >%70 tükendikten sonra NAPQI proteinlere kovalent bağlanıp geri dönüşsüz nekroz başlatmıştır.",
              "ar": "يوفر NAC السيستئين ليعيد بناء الجلوتاثيون (GSH) المنهار؛ ولكن بعد نفاد 70% من GSH، يكون NAPQI قد ارتبط ببروتينات الخلية وبدأ التنخر غير العكوس.",
              "en": "NAC supplies rate-limiting cysteine to rapidly replenish depleted glutathione (GSH); once GSH falls below 30%, NAPQI binds irreversibly to vital proteins, triggering irreversible necrosis."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kusursuz klinik toksikoloji! Slayt 36 verisi: Glutatyon sentezinde hız kısıtlayıcı amino asit L-sisteindir. NAC hücreye girerek sistein havuzunu doldurur ve GSH sentezini patlatır; ayrıca serbest tiyolüyle bizzat NAPQI'yi nötralize eder. Ancak ilk 8-10 saat aşılırsa NAPQI mitokondriyal proteinlere kovalent kilitlenir; artık GSH verilse dahi ölen hücreler diriltilemez.",
              "ar": "تحليل سمومي سريري متكامل! الشريحة 36: السيستئين هو الحمض الأميني المحدد لسرعة بناء الجلوتاثيون. يزود NAC الخلايا بالسيستئين فيتضاعف بناء GSH ويقضي على سم NAPQI. بعد 8-10 ساعات، يكون NAPQI قد ارتبط بالميتوكوندريا وأحدث موتاً خلوياً محتوماً.",
              "en": "Flawless clinical toxicology! Slide 36: Cysteine availability is the bottleneck for de novo glutathione synthesis. NAC recharges intracellular cysteine, driving rapid GSH restoration and directly scavenging NAPQI. Beyond the 8-10 hour window, irreversible covalent mitochondrial alkylation has already triggered cell death."
            }
          },
          {
            "id": "opt-9b",
            "text": {
              "tr": "NAC parasetamolü mıknatıs gibi çekerek idrar torbasına ışınlar.",
              "ar": "يجذب NAC جزيئات الباراسيتامول كالمغناطيس ليرسلها فورياً للمثانة.",
              "en": "NAC acts as a molecular magnet that teleports paracetamol molecules directly into the bladder."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Mıknatıs ışınlama yanılgısı: Moleküler ışınlanma veya manyetik çekim yoktur; etki hücre içi glutatyon biyosentezinin enzim substratı olarak desteklenmesidir.",
              "ar": "خطأ النقل المغناطيسي: لا وجود لقوى مغناطيسية تنقل الأدوية؛ الآلية هي تعزيز الاصطناع الحيوي للجلوتاثيون كيميائياً.",
              "en": "Teleportation fallacy: NAC functions strictly as a bioavailable chemical precursor for glutathione biosynthesis, not a physical transport magnet."
            }
          },
          {
            "id": "opt-9c",
            "text": {
              "tr": "NAC ilacı karaciğerde dondurarak hastayı komaya sokar.",
              "ar": "يجمد NAC الدواء داخل الكبد ليدخل المريض في غيبوبة مقصودة.",
              "en": "NAC chemically freezes the drug inside liver tissue, deliberately inducing a protective therapeutic coma."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Dondurma koması yanılgısı: NAC bir anestezik veya kriyojenik ajan değildir; tamamen güvenli bir amino asit türevi detoksifiyanıdır.",
              "ar": "خطأ التجميد: NAC ليس مخدراً أو مادة تبريد بل مشتق حمض أميني طبيعي وآمن لإنقاذ خلايا الكبد.",
              "en": "Cryogenic coma fallacy: NAC is a water-soluble cysteine prodrug that restores endogenous antioxidant capacity, possessing zero hypnotic or cryogenic activity."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "N-asetilsistein (NAC) antidotu", "arContext": "ترياق N-أسيتيل سيستئين (NAC)" },
        { "term": "kovalent mitokondriyal hasar", "arContext": "الضرر التساهمي للميتوكوندريا" }
      ],
      "hints": [
        {
          "tr": "Hücrede glutatyon (GSH) sentezinin hızını sınırlayan bileşen sistein amino asididir.",
          "ar": "العامل المحدد لسرعة تصنيع الجلوتاثيون هو وفرة حمض السيستئين الأميني.",
          "en": "Cysteine availability is the rate-limiting bottleneck in cellular glutathione synthesis."
        },
        {
          "tr": "N-Asetilsistein (NAC) vücuda bol miktarda sistein sağlayarak GSH fabrikasını çalıştırır.",
          "ar": "يزود NAC الكبد بالسيستئين بوفرة ليعيد تشغيل مصنع الجلوتاثيون.",
          "en": "NAC delivers bioavailable cysteine to rapidly reboot glutathione synthesis."
        },
        {
          "tr": "İlk 8-10 saat içinde verilirse NAPQI proteinlere bağlanamadan GSH tarafından temizlenir.",
          "ar": "إذا أُعطي خلال 8-10 ساعات، يقضي الجلوتاثيون على NAPQI قبل أن يربط بروتينات الكبد.",
          "en": "Given within 8-10 hours, replenished GSH captures NAPQI before it irreversibly alkylates proteins."
        }
      ],
      "sources": [{ "file": "İlaç metabolizması-2026.pdf", "page": 36 }]
    },
    {
      "id": "mc-mod5-les2-step-10",
      "stage": "retrieval",
      "stageIndex": 10,
      "type": "retrieval",
      "title": {
        "tr": "Aralıklı Hatırlama: Faz II Kofaktör Donörleri Eşleşmesi",
        "ar": "استرجاع تباعدي: مطابقة كواشف الاقتران في المرحلة الثانية",
        "en": "Spaced Retrieval: Matching Phase II Cofactor Donors"
      },
      "prompt": {
        "tr": "Faz II transferaz enzimlerinin substratlarına polar grup takabilmesi için aktif donör kofaktörlere ihtiyacı vardır. UGT, SULT ve NAT enzimlerinin aktif kofaktörleri sırasıyla hangileridir?",
        "ar": "تحتاج إنزيمات المرحلة الثانية إلى كواشف مانحة لتفعيل تفاعلات الاقتران. ما هي الكواشف النشطة لإنزيمات UGT و SULT و NAT على التوالي؟",
        "en": "Phase II transferases require high-energy donor cofactors to transfer functional groups. What are the active cofactor donors for UGT, SULT, and NAT, respectively?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-10a",
            "text": {
              "tr": "UGT: UDPGA (Üridin difosfat glukuronik asit); SULT: PAPS (Fosfoadenozin-fosfosülfat); NAT: Asetil-KoA.",
              "ar": "UGT: كاشف UDPGA؛ SULT: كاشف PAPS؛ NAT: كاشف أسيتيل-كوانزيم A (Acetyl-CoA).",
              "en": "UGT: UDPGA (Uridine diphosphate glucuronic acid); SULT: PAPS (Phosphoadenosine-phosphosulfate); NAT: Acetyl-CoA."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kusursuz hafıza! Slayt 38 karşılaştırma tablosu: 1. UGT enzimi UDPGA kofaktöründen glukuronik asit aktarır. 2. SULT enzimi PAPS kofaktöründen sülfat aktarır. 3. NAT enzimi Asetil-KoA'dan asetil grubu aktarır. Bu kofaktör üçlüsü farmasötik kimyanın altın standart bilgisidir.",
              "ar": "ذاكرة صيدلانية خارقة! جدول الشريحة 38: ينقل UGT الجلوكورونيد من UDPGA، وينقل SULT الكبريتات من PAPS، وينقل NAT الأسيتيل من Acetyl-CoA. هذه الثلاثية من أهم ركائز الكيمياء الصيدلانية.",
              "en": "Flawless retrieval! Slide 38 comparative master table: UGT transfers glucuronic acid from UDPGA; SULT transfers sulfate from PAPS; NAT transfers acetyl from Acetyl-CoA. This cofactor triad is the bedrock of drug conjugation."
            }
          },
          {
            "id": "opt-10b",
            "text": {
              "tr": "UGT: Sofra tuzu (NaCl); SULT: Sirke asidi; NAT: Karbonat.",
              "ar": "UGT: ملح الطعام؛ SULT: حمض الخل؛ NAT: بيكربونات الصوديوم.",
              "en": "UGT: Table salt (NaCl); SULT: Dietary vinegar; NAT: Baking soda."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Mutfak kimyası yanılgısı: Enzimler evsel tuz ve sirke ile değil, nükleotit temelli yüksek enerjili biyomoleküllerle (UDPGA, PAPS, Asetil-KoA) çalışır.",
              "ar": "خطأ كيمياء المطبخ: لا تعمل الإنزيمات بخل وملح الطعام، بل بكواشف نووية نكليوتيدية عالية الطاقة كـ UDPGA و PAPS.",
              "en": "Kitchen chemistry fallacy: Enzymes utilize activated nucleotide-sugar and nucleotide-sulfate cofactors, never simple household table condiments."
            }
          },
          {
            "id": "opt-10c",
            "text": {
              "tr": "UGT: Glutatyon; SULT: Glisin; NAT: Metiyonin.",
              "ar": "UGT: جلوتاثيون؛ SULT: جليسين؛ NAT: ميثيونين.",
              "en": "UGT: Glutathione; SULT: Glycine; NAT: Methionine."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kofaktör karışıklığı yanılgısı: Glutatyon GST'nin, glisin açiltransferazın, metiyonin (SAM) ise metiltransferazın kofaktörüdür; UGT/SULT/NAT ile eşleşmez.",
              "ar": "خطأ خلط الكواشف: الجلوتاثيون خاص بـ GST، والجليسين خاص بالاقتران الببتيدي، بينما UDPGA و PAPS هما كواشف UGT و SULT الحصرية.",
              "en": "Cofactor mismatch fallacy: Glutathione serves GST, and methionine (via SAM) serves methyltransferases; they do not donor groups for UGT or SULT."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "UDPGA kofaktörü", "arContext": "كاشف UDPGA المنشط" },
        { "term": "PAPS aktif sülfat donörü", "arContext": "كاشف PAPS المانح للكبريتات" }
      ],
      "hints": [
        {
          "tr": "Glukuronik asit aktarımı için nükleozit difosfat şeker türevi gerekir (UDP-glukuronik asit).",
          "ar": "يتطلب نقل الجلوكورونيد سكر نكليوتيدي ثنائي الفوسفات (UDP-glucuronic acid).",
          "en": "Glucuronidation utilizes an activated uridine nucleotide sugar derivative."
        },
        {
          "tr": "Sülfasyon adenozin nükleotidinde sülfat taşıyan PAPS molekülünden beslenir.",
          "ar": "تتغذى الكبرتة من مركب PAPS المحتوي على نكليوتيد الأدينوزين الحامل للكبريتات.",
          "en": "Sulfation transfers sulfate from the 3'-phosphoadenosine-5'-phosphosulfate cofactor."
        },
        {
          "tr": "Asetilasyon hücresel enerji metabolizmasının ana taşıyıcısı Asetil-KoA ile yürür.",
          "ar": "تعتمد الأستلة على الناقل الخلوي الشهير أسيتيل-كوانزيم A (Acetyl-CoA).",
          "en": "Acetylation relies on the central cellular carrier Acetyl-CoA."
        }
      ],
      "sources": [{ "file": "İlaç metabolizması-2026.pdf", "page": 38 }]
    },
    {
      "id": "mc-mod5-les2-step-11",
      "stage": "connection",
      "stageIndex": 11,
      "type": "connection",
      "title": {
        "tr": "Geniş Bağlantı: İdrarda Biyoaktive Olan Ön İlaç (Metenamin)",
        "ar": "آفاق متقدمة: طليعة دوائية تتنشط ذاتياً في البول (الميثينامين)",
        "en": "Broader Connection: Spontaneous Urinary Activation of Methenamine"
      },
      "prompt": {
        "tr": "Metenamin kanda ve pH 7.4'te tamamen inaktif bir kafes molekülüdür. Ancak idrar pH'ı 5.5'in altına düştüğünde hiçbir enzim olmadan neye parçalanır ve bakterileri nasıl yok eder?",
        "ar": "الميثينامين جزيء قفصي خامل تماماً في الدم عند pH 7.4. عندما يهبط باهاء البول تحت 5.5، إلى ماذا يتفكك ذاتياً دون إنزيمات ليبيد البكتيريا؟",
        "en": "Methenamine is an inert cage molecule circulating unchanged in blood at pH 7.4. When urine pH drops below 5.5, what does it non-enzymatically release to eliminate urinary pathogens?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-11a",
            "text": {
              "tr": "Asidik idrarda kendiliğinden hidroliz olarak 6 molekül formaldehit açığa çıkarır; formaldehit bakteriyel proteinleri denatüre eder ve direnç gelişemez.",
              "ar": "يتحلل تلقائياً في البول الحمضي محرراً 6 جزيئات فورمالدهيد؛ الذي يخثر بروتينات البكتيريا دون أي قدرة منها على تطوير مقاومة.",
              "en": "It undergoes spontaneous acid-catalyzed hydrolysis to release 6 molecules of formaldehyde, which denatures bacterial proteins with zero risk of resistance."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Harika bir ön-ilaç / metabonat örneği! Slayt 5 ve 44: Hekzametilentetramin (Metenamin) kanda kararlıdır ve toksik değildir. Böbreklerden süzüldükten sonra idrar asidikse (pH < 5.5), H+ iyonları kafes yapısını parçalar: 1 molekül metenaminden 6 formaldehit ve 4 amonyum oluşur. Formaldehit genel bir hücre zehiridir; bakteriler formaldehite karşı asla direnç geliştiremez (bu yüzden idrarı asitleştirmek için vitamin C veya metiyoninle kombine edilir).",
              "ar": "مثال دوائي عبقري على المستقلبات التلقائية (Metabonates)! الشريحة 5 و 44: الميثينامين آمن بالدم. عند وصوله للبول الحمضي (pH < 5.5)، تفصم البروتونات الهيكل القفصي محررة 6 جزيئات فورمالدهيد و4 أمونيوم. يقتل الفورمالدهيد البكتيريا بتخثير بروتيناتها وتستحيل مقاومته جينياً.",
              "en": "Brilliant prodrug / metabonate design! Slides 5 & 44: Hexamethylenetetramine (Methenamine) is non-toxic in systemic blood. At acidic urine pH (<5.5), ambient hydronium ions trigger non-enzymatic decomposition into 6 formaldehyde molecules and 4 ammonium ions. Formaldehyde cross-links bacterial proteins; bacteria cannot mutate resistance against formaldehyde."
            }
          },
          {
            "id": "opt-11b",
            "text": {
              "tr": "Metenamin idrarda penisilin molekülüne dönüşerek bakterilerin hücre duvarını yıkar.",
              "ar": "يتحول الميثينامين في البول إلى جزيئة بنسلين تهدم جدار الخلية البكتيرية.",
              "en": "Methenamine chemically rearranges in urine into penicillin, inhibiting bacterial cell-wall transpeptidases."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Penisilin dönüşümü yanılgısı: Metenamin basit bir hekzametilentetramin kafesidir; beta-laktam veya tiazolidin halkası içermez, penisiline dönüşemez.",
              "ar": "خطأ التحول لبنسلين: الميثينامين قفص نيتروجيني هيدروكربوني بسيط يخلو من حلقات البيتالاكتام؛ وناتجه الحصري هو الفورمالدهيد.",
              "en": "Beta-lactam fallacy: Methenamine lacks sulfur or beta-lactam rings; it decomposes into simple formaldehyde and ammonia, never penicillin."
            }
          },
          {
            "id": "opt-11c",
            "text": {
              "tr": "Asidik idrarda metenamin nitrogliserine dönüşerek mesanede patlama yapar.",
              "ar": "يتحول الميثينامين في البول الحمضي إلى نيتروغليسرين متفجر يفجر المثانة.",
              "en": "In acidic urine, methenamine converts into nitroglycerin, causing explosive micro-blasts in the urinary bladder."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Patlayıcı fantezi yanılgısı: Metenamin patlayıcı oluşturmaz; lokal antiseptik konsantrasyonda formaldehit çözeltisi oluşturur.",
              "ar": "خطأ الانفجار العبثي: لا يولد الميثينامين متفجرات؛ بل ينتج محلول فورمالدهيد مطهراً بتركيز موضعي آمن لأنسجة المثانة.",
              "en": "Explosive fallacy: Methenamine is a stable urinary antiseptic that yields diluted antimicrobial formaldehyde, with zero explosive potential."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "metabonat (non-enzimatik dönüşüm)", "arContext": "المستقلب التلقائي اللاتحفيزي (metabonate)" },
        { "term": "üriner antiseptik biyoaktivasyonu", "arContext": "تنشيط المطهرات البولية" }
      ],
      "hints": [
        {
          "tr": "Metenamin yapısında 4 azot atomu ve 6 adet metilen (-CH2-) köprüsü taşır.",
          "ar": "يتكون الميثينامين من 4 ذرات نيتروجين و 6 جسور ميثيلين (-CH2-).",
          "en": "Methenamine consists of 4 nitrogen atoms cross-linked by 6 methylene (-CH2-) bridges."
        },
        {
          "tr": "Asidik ortamda (pH < 5.5) su ve protonlar metilen köprülerini aldehide çevirir.",
          "ar": "في الوسط الحمضي (pH < 5.5) تفكك البروتونات والماء جسور الميثيلين إلى ألدهيد.",
          "en": "Under acidic conditions (pH < 5.5), hydronium ions hydrolyze methylene bridges into aldehydes."
        },
        {
          "tr": "Açığa çıkan formaldehit bakterilerin proteinlerini denatüre eden güçlü bir antiseptiktir.",
          "ar": "الفورمالدهيد الناتج مطهر فعال يخثر بروتينات البكتيريا دون حدوث مقاومة.",
          "en": "The liberated formaldehyde acts as a powerful non-specific antiseptic against urinary pathogens."
        }
      ],
      "sources": [{ "file": "İlaç metabolizması-2026.pdf", "page": 44 }]
    },
    {
      "id": "mc-mod5-les2-step-12",
      "stage": "mastery_check",
      "stageIndex": 12,
      "type": "mastery_check",
      "title": {
        "tr": "Ustalık Sınavı: Parasetamol Toksisitesinin Stoikiometrik Dengesi",
        "ar": "اختبار التمكن: الميزان الحسابي لسمية الباراسيتامول",
        "en": "Mastery Check: Stoichiometric Balance of Paracetamol Hepatotoxicity"
      },
      "prompt": {
        "tr": "Bir hasta 10 g (66 mmol) parasetamol yutar. SULT 10 mmol'de, UGT 40 mmol'de doyar. Kalan 16 mmol CYP2E1 ile 16 mmol NAPQI üretir. Karaciğer GSH rezervi 10 mmol olduğuna göre klinik sonuç ne olur?",
        "ar": "تناول مريض 10 غرامات (66 مليمول) باراسيتامول. تشبع SULT عند 10، و UGT عند 40. حول CYP2E1 الباقي (16 مليمول) إلى NAPQI. إذا كان مخزون الكبد من GSH هو 10 مليمول، فما النتيجة؟",
        "en": "A patient takes 10 g (66 mmol) of paracetamol. SULT saturates at 10 mmol, UGT at 40 mmol. The excess 16 mmol forms 16 mmol NAPQI via CYP2E1. If hepatic GSH pool is 10 mmol, what is the clinical outcome?"
      },
      "predictThenReveal": false,
      "conceptCheck": {
        "options": [
          {
            "id": "opt-12a",
            "text": {
              "tr": "Glutatyon %100 tükenir; arta kalan 6 mmol serbest NAPQI hepatosit proteinlerine kovalent bağlanarak fulminan karaciğer nekrozunu tetikler.",
              "ar": "يستنفد الجلوتاثيون بنسبة 100%؛ ويرتبط الفائض (6 مليمول) من NAPQI ببروتينات الكبد تساهمياً مسبباً تنخراً كبدياً صاعقاً ومميتاً.",
              "en": "Glutathione is 100% exhausted; the remaining 6 mmol of free NAPQI binds covalently to hepatocyte vital proteins, triggering fulminant hepatic necrosis."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kusursuz stoikiometrik ustalık! Hesaplama: 66 mmol parasetamolün 50 mmol'ü güvenli Faz II yollarıyla (10 mmol SULT + 40 mmol UGT) bağlanır. Doyum fazlası 16 mmol parasetamol CYP2E1 ile 16 mmol elektrofilik NAPQI üretir. Karaciğerdeki mevcut 10 mmol GSH bu toksinin 10 mmol'ünü nötralize eder ve GSH tamamen sıfırlanır (%100 tükenme). Kalan 6 mmol reaktif NAPQI, hücredeki mitokondriyal proteinlere kovalent bağlanarak saatler içinde masif hepatosit ölümüne yol açar. Acil NAC verilmezse tablo ölümcüldür.",
              "ar": "تمكن كيميائي وحسابي باهر! الحساب: 50 مليمول تُعالج بـ UGT و SULT. الفائض (16 مليمول) يتحول إلى 16 مليمول من سم NAPQI. يستهلك هذا السم كامل رصيد الجلوتاثيون البالغ 10 مليمول (استنزاف 100%). الفائض المتبقي (6 مليمول) يهاجم بروتينات الميتوكوندريا تساهمياً ويحدث تنخراً كبدياً شاملاً يستوجب إعطاء NAC فوراً.",
              "en": "Flawless stoichiometric mastery! Clear balance: 50 mmol is cleared safely via UGT (40 mmol) and SULT (10 mmol). The 16 mmol overflow is shunted to CYP2E1, generating 16 mmol of NAPQI. This instantly exhausts the entire 10 mmol hepatic GSH reserve (100% depletion). The leftover 6 mmol of unquenched NAPQI irreversibly alkylates essential hepatocyte proteins, initiating fulminant hepatic failure."
            }
          },
          {
            "id": "opt-12b",
            "text": {
              "tr": "Glutatyon hiç azalmaz; çünkü parasetamol glutatyon moleküllerini 10 kat çoğaltır.",
              "ar": "لا ينقص الجلوتاثيون بل يضاعف الباراسيتامول مخزونه الخلوي 10 مرات.",
              "en": "Glutathione is unaffected because paracetamol acts as a direct catalyst multiplying cellular GSH by 10-fold."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Artış yanılgısı: Parasetamol GSH üretmez; tam aksine NAPQI tiyol gruplarına kovalent bağlanarak mevcut GSH'ı hızla yok eder.",
              "ar": "خطأ مضاعفة الجلوتاثيون: الباراسيتامول لا ينتج GSH بل يستهلكه ويدمره عبر تفاعل NAPQI التساهمي مع روابط الكبريت.",
              "en": "Synthesis misconception: Paracetamol does not synthesize glutathione; NAPQI consumes GSH via stoichiometric nucleophilic conjugate addition."
            }
          },
          {
            "id": "opt-12c",
            "text": {
              "tr": "Fazla parasetamol doğrudan saç teline dönüşerek hastanın saçını uzatır.",
              "ar": "يتحول الفائض من الباراسيتامول إلى خصلات شعر تطيل شعر المريض.",
              "en": "Excess paracetamol transforms directly into keratin, causing rapid hair growth."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Absürt distraktör: Parasetamol keratin veya saç teli üretemez; aşırı doz hepatosit nekrozu ve karaciğer yetmezliğiyle sonlanır.",
              "ar": "خطأ عبثي: الباراسيتامول لا يصنع الكيراتين؛ الجرعة الزائدة تقود حصراً إلى تنخر كبدي مهدد للحياة.",
              "en": "Absurd trap: Paracetamol cannot synthesize structural keratin; untreated overdose culminates in acute liver failure."
            }
          }
        ]
      },
      "technicalTerms": [
        { "term": "stoikiometrik toksisite dengesi", "arContext": "الميزان الحسابي للسمية" },
        { "term": "mitokondriyal protein arilasyonu", "arContext": "ألكلة بروتينات الميتوكوندريا" }
      ],
      "hints": [
        {
          "tr": "66 mmol ilacın ne kadarının güvenli Faz II yollarıyla (SULT + UGT) temizlendiğini toplayın: 10 + 40 = 50 mmol.",
          "ar": "اجمع الكمية المعالجة بالمسارات الآمنة (SULT + UGT): 10 + 40 = 50 مليمول.",
          "en": "Sum the amount safely processed by SULT and UGT: 10 + 40 = 50 mmol."
        },
        {
          "tr": "Geriye kalan miktar CYP2E1'e kayar: 66 - 50 = 16 mmol NAPQI.",
          "ar": "المقدار الفائض ينحرف نحو CYP2E1: 66 - 50 = 16 مليمول NAPQI.",
          "en": "The overflow shunts to CYP2E1: 66 - 50 = 16 mmol of reactive NAPQI."
        },
        {
          "tr": "Karaciğerde 10 mmol GSH olduğuna göre 10 mmol NAPQI yakalanır; arta kalan 6 mmol serbest toksin karaciğeri yok eder.",
          "ar": "يمتلك الكبد 10 مليمول GSH، فيتبقى 6 مليمول من السم الحر ليدمر خلايا الكبد.",
          "en": "With only 10 mmol of GSH available, 6 mmol of unquenched NAPQI attacks cell proteins."
        }
      ],
      "sources": [{ "file": "İlaç metabolizması-2026.pdf", "page": 35 }]
    }
  ]
};

// Mirror conceptCheck into config for all MCQ steps (all except Step 5)
lesson10.steps.forEach((step, idx) => {
  const stepNum = idx + 1;
  if (stepNum !== 5 && step.conceptCheck && step.conceptCheck.options) {
    const correctOpt = step.conceptCheck.options.find(o => o.isCorrect) || step.conceptCheck.options[0];
    
    const mirroredOptions = step.conceptCheck.options.map(opt => ({
      id: opt.id,
      text: typeof opt.text === 'object' ? opt.text.tr : opt.text,
      isCorrect: opt.isCorrect,
      misconceptionFeedback: typeof opt.misconceptionFeedback === 'object' ? opt.misconceptionFeedback.tr : opt.misconceptionFeedback
    }));
    
    step.config = {
      options: mirroredOptions,
      revealedOutcome: typeof correctOpt.text === 'object' ? correctOpt.text : { tr: correctOpt.text, ar: correctOpt.text, en: correctOpt.text },
      explanation: typeof correctOpt.misconceptionFeedback === 'object' ? correctOpt.misconceptionFeedback : { tr: correctOpt.misconceptionFeedback, ar: correctOpt.misconceptionFeedback, en: correctOpt.misconceptionFeedback }
    };
  }
});

const outputPath = path.resolve(__dirname, '../courses/medchem/lessons/lesson-10.json');
fs.writeFileSync(outputPath, JSON.stringify(lesson10, null, 2), 'utf8');
console.log('Successfully wrote lesson-10.json to:', outputPath);
