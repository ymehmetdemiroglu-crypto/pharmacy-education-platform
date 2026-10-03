const fs = require('fs');
const path = require('path');

const lesson08 = {
  "$schema": "../../../packages/platform/schema/lesson.schema.json",
  "id": "mc-mod4-les2",
  "courseId": "medchem",
  "moduleId": "mc-mod-04",
  "title": {
    "tr": "Konformasyonel İzomerizm: Rijit ve Esnek İskeletler",
    "ar": "التماكب التشكلي: الهياكل الجاسئة والمرنة",
    "en": "Conformational Isomerism: Rigid & Flexible Scaffolds"
  },
  "order": 2,
  "access": "free",
  "objective": {
    "tr": "Asetilkolin ve histamin gibi esnek moleküllerde konformasyonel kısıtlama ve rijit analog tasarımını uygulayarak reseptör alt tip seçiciliğini artırmayı ve bağlanma entropi cezasını düşürmeyi öğrenmek.",
    "ar": "تطبيق استراتيجيات التجسئة الهيكلية والتقييد التشكلي على الجزيئات المرنة كأستيل كولين والهستامين لتحسين الانتقائية الفرعية وخفض ضريبة الإنتروبيا.",
    "en": "Design conformationally restricted and rigid drug scaffolds to lock bioactive conformers, eliminate conformational entropy penalties, and maximize receptor subtype selectivity."
  },
  "misconceptions": [
    {
      "tr": "Molekülün çözeltideki en kararlı (en düşük enerjili) konformasyonunun her zaman reseptöre bağlanan konformasyon olduğu yanılgısı (Biyoaktif Konformasyon Paradoksu).",
      "ar": "الظن الخاطئ بأن التشكيل الفراغي الأكثر استقراراً والأدنى طاقة في المحلول الحر هو دائماً التشكيل الذي يرتبط بالمستقبل.",
      "en": "The misconception that the global minimum energy conformer in aqueous solution is always the conformer that binds the receptor."
    },
    {
      "tr": "Çok sayıda serbest dönebilen tekli bağa sahip aşırı esnek moleküllerin reseptör ceplerine daha kolay uyum sağlayıp daha güçlü bağlanacağı yanılgısı (Entropi cezası göz ardı edilir).",
      "ar": "الاعتقاد الخاطئ بأن الجزيئات مفرطة المرونة ترتبط بقوة أكبر لقدرتها على التكيف متجاهلاً ضريبة الإنتروبيا التشكيلية الهائلة.",
      "en": "The belief that high molecular flexibility improves affinity, ignoring the massive conformational entropy penalty upon binding."
    },
    {
      "tr": "Asetilkolinin muskarinik ve nikotinik reseptörleri aynı 3 boyutlu uzaysal konformasyonda aktive ettiği düşüncesi.",
      "ar": "الظن الخاطئ بأن الأسيتيل كولين ينشط المستقبلات المسكارينية والنيكوتينية بنفس التشكيل الفراغي المتطابق.",
      "en": "The assumption that acetylcholine activates both muscarinic and nicotinic receptors in an identical spatial conformation."
    }
  ],
  "sources": [
    { "file": "İlaçlarda  İzomeri.pdf", "page": 8 },
    { "file": "İlaçlarda  İzomeri.pdf", "page": 39 },
    { "file": "İlaçlarda  İzomeri.pdf", "page": 40 },
    { "file": "İlaçlarda  İzomeri.pdf", "page": 41 },
    { "file": "İlaçlarda  İzomeri.pdf", "page": 42 },
    { "file": "İlaçlarda  İzomeri.pdf", "page": 43 }
  ],
  "citations": [
    {
      "id": "CIT-MC08-01",
      "book": "Foye's Principles of Medicinal Chemistry",
      "edition": "8th ed.",
      "topic": "Conformational Isomerism, Rigidification, and Bioactive Conformations",
      "chapter": "Chapter 2",
      "page": "45-62",
      "status": "verified"
    },
    {
      "id": "CIT-MC08-02",
      "book": "Wilson and Gisvold's Textbook of Organic Medicinal and Pharmaceutical Chemistry",
      "edition": "12th ed.",
      "topic": "Conformational Factors in Drug Action: Acetylcholine and Histamine Rotamers",
      "chapter": "Chapter 2",
      "page": "35-50",
      "status": "verified"
    }
  ],
  "numericClaims": [
    {
      "id": "NUM-MC08-01",
      "parameter": "Acetylcholine gauche conformer N+ to ester O distance",
      "value": "3.3 Angstroms",
      "status": "verified",
      "referencePassage": "Slide 42: Gauche (folded) conformation has N+ to ester O distance of 3.3 A, selectively binding muscarinic receptors."
    },
    {
      "id": "NUM-MC08-02",
      "parameter": "Acetylcholine anti conformer N+ to ester O distance",
      "value": "4.4 Angstroms",
      "status": "verified",
      "referencePassage": "Slide 42: Anti (extended) conformation has N+ to ester O distance of 4.4 A, selectively binding nicotinic receptors."
    },
    {
      "id": "NUM-MC08-03",
      "parameter": "Histamine Conformer A imidazole to amino distance",
      "value": "4.55 Angstroms",
      "status": "verified",
      "referencePassage": "Slide 43: Transoid Conformer A has 4.55 A distance, binding H1 receptors."
    },
    {
      "id": "NUM-MC08-04",
      "parameter": "Histamine Conformer B imidazole to amino distance",
      "value": "3.60 Angstroms",
      "status": "verified",
      "referencePassage": "Slide 43: Gauche Conformer B has 3.60 A distance, binding H2 receptors."
    },
    {
      "id": "NUM-MC08-05",
      "parameter": "Entropic free energy savings per frozen rotatable bond",
      "value": "2.5 to 4.0 kJ/mol (0.6 to 1.0 kcal/mol)",
      "status": "verified",
      "referencePassage": "Blueprint Cluster 4: Each frozen rotatable bond saves ~2.5-4.0 kJ/mol in conformational entropy penalty upon binding."
    }
  ],
  "spacedReviewCards": [
    {
      "cardId": "mc-mod4-les2-card1",
      "courseId": "medchem",
      "drugOrConcept": "Asetilkolin Gauche vs Anti Mesafeleri",
      "prompt": "Asetilkolinin muskarinik ve nikotinik reseptörleri bağlayan konformerlerinde N+ ile ester O arası mesafeler nedir?",
      "answer": "Katlanmış (gauche) formda 3.3 Å (muskarinik); uzamış (anti) formda 4.4 Å (nikotinik) mesafededir (Slayt 42).",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "mc-mod4-les2-card2",
      "courseId": "medchem",
      "drugOrConcept": "Biyoaktif Konformasyon Paradoksu",
      "prompt": "Bir ilacın çözeltideki en düşük enerjili konformasyonu reseptöre bağlanan form olmak zorunda mıdır?",
      "answer": "Hayır; reseptör bağlanma entalpisi (ΔH), daha yüksek enerjili bir biyoaktif konformasyona geçiş enerjisini karşılar.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "mc-mod4-les2-card3",
      "courseId": "medchem",
      "drugOrConcept": "Histamin H1 vs H2 Mesafeleri",
      "prompt": "Histaminin H1 ve H2 reseptörlerine bağlanan rotamerlerindeki farmakoforik mesafeler nedir?",
      "answer": "H1 için uzamış transoid A formu 4.55 Å; H2 için katlanmış gauche B formu 3.60 Å mesafededir (Slayt 43).",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "mc-mod4-les2-card4",
      "courseId": "medchem",
      "drugOrConcept": "Rijit İskelet Tasarımının Entropi Kazancı",
      "prompt": "Esnek bir molekülü halka içine alarak dondurmak bağlanma serbest enerjisini (ΔG) neden katlar?",
      "answer": "Rotasyonel bağlar donduğunda bağlanma anındaki konformasyonel entropi kaybı (-TΔS) silinir; her bağ ~2.5-4 kJ/mol kazandırır.",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "mc-mod4-les2-card5",
      "courseId": "medchem",
      "drugOrConcept": "Siklopropil Asetilkolin Testi",
      "prompt": "Asetilkolinin (+)-cis ve (+)-trans siklopropil analogları hangi reseptörleri seçici olarak uyarır?",
      "answer": "(+)-Cis analog sadece muskarinik, (+)-trans analog ise sadece nikotinik reseptörleri uyarır (Slayt 42).",
      "box": 1,
      "intervalDays": 1
    }
  ],
  "translations": {
    "tr": { "title": "Konformasyonel İzomerizm: Rijit ve Esnek İskeletler" },
    "ar": { "title": "التماكب التشكلي: الهياكل الجاسئة والمرنة" }
  },
  "steps": [
    {
      "id": "mc-mod4-les2-step-01",
      "stage": "hook",
      "stageIndex": 1,
      "type": "predictThenReveal",
      "title": {
        "tr": "İki Ayrı Reseptör, Tek Bir Esnek Molekül",
        "ar": "مستقبلان مختلفان لجزيء مرن واحد",
        "en": "The Acetylcholine Paradox: One Molecule, Two Shapes"
      },
      "prompt": {
        "tr": "Asetilkolin kalpte muskarinik, çizgili kasta nikotinik reseptörleri uyarır. Esnek bir ester zincirine sahip tek bir molekül, iki tamamen farklı reseptör cebini nasıl ayrı ayrı aktive edebilir?",
        "ar": "ينشط الأسيتيل كولين المستقبلات المسكارينية في القلب والنيكوتينية في العضلات. كيف ينشط جزيء مرن واحد نوعين متباعدين تماماً من المستقبلات دون التباس؟",
        "en": "Acetylcholine activates muscarinic receptors in the heart and nicotinic receptors in skeletal muscle. How can a single flexible molecule selectively trigger two radically different receptor pockets?"
      },
      "predictThenReveal": true,
      "technicalTerms": [
        { "term": "konformasyonel izomerizm", "arContext": "التماكب التشكلي" },
        { "term": "rotamer", "arContext": "المتشكل الدوراني" }
      ],
      "hints": [
        {
          "tr": "Tekli sigma bağlarının etrafında serbest dönme serbestliğini düşünün.",
          "ar": "فكر في حرية الدوران حول الروابط الأحادية سيغما.",
          "en": "Consider the freedom of rotation around single sigma bonds."
        },
        {
          "tr": "Molekül uzayda katlanabilir veya uzayabilir; iki formun atomlar arası mesafeleri farklıdır.",
          "ar": "يمكن للجزيء أن ينطوي أو يمتد؛ فالمسافات بين الذرات تختلف في الشكلين.",
          "en": "The molecule can fold or extend, altering interatomic pharmacophoric distances."
        },
        {
          "tr": "Asetilkolin tekli bağlarını döndürerek katlanmış (gauche) formda muskarinik, uzamış (anti) formda nikotinik reseptöre oturur.",
          "ar": "يدور أستيل كولين ليتبنى تشكيلاً مطوياً مع المسكاريني وتشكيلاً ممتداً مع النيكوتيني.",
          "en": "Acetylcholine rotates to adopt a folded gauche conformer for muscarinic and an extended anti conformer for nicotinic receptors."
        }
      ],
      "sources": [{ "file": "İlaçlarda  İzomeri.pdf", "page": 42 }],
      "conceptCheck": {
        "options": [
          {
            "id": "opt-1a",
            "text": {
              "tr": "Tekli bağları etrafında dönerek farklı konformerler alır: Katlanmış (gauche) form muskarinik, uzamış (anti) form nikotinik cebe uyar.",
              "ar": "يدور حول روابطه الأحادية: التشكيل المطوي (gauche) يلائم المسكاريني والممتد (anti) يلائم النيكوتيني.",
              "en": "It rotates around sigma bonds: The folded gauche conformer fits muscarinic, while extended anti fits nicotinic receptors."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Tam isabet! Tekli bağlar etrafında dönme ile oluşan rotamerler sayesinde asetilkolin iki farklı cepte iki farklı biyoaktif geometri sunar (Slayt 42).",
              "ar": "صحيح تماماً! الدوران الحر حول الروابط ينتج متشكلي gauche و anti بمسافات فراغية مطابقة لكلا المستقبلين.",
              "en": "Spot on! Free rotation around single bonds generates folded gauche and extended anti rotamers custom-tailored to each receptor pocket (Slide 42)."
            }
          },
          {
            "id": "opt-1b",
            "text": {
              "tr": "Asetilkolin kovalent bağlarını parçalayarak kanda iki farklı kimyasal elemente dönüşür.",
              "ar": "يتفكك كيميائياً في الدم إلى عنصرين مختلفين تماماً.",
              "en": "Acetylcholine breaks its covalent bonds to transform into two different chemical elements."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kovalent bağ kırılması yanılgısı: Konformasyonel değişimde kovalent bağlar kırılmaz; sadece tekli bağlar serbestçe döner.",
              "ar": "خطأ كسر الروابط: التماكب التشكلي لا يتضمن كسر أي روابط تساهمية مطلقاً بل دوران حر فقط.",
              "en": "Covalent bond breakage trap: Conformational change never breaks covalent bonds; it only involves dynamic rotation around single bonds."
            }
          },
          {
            "id": "opt-1c",
            "text": {
              "tr": "Asetilkolin reseptörlere hiç bağlanmaz; hücre zarlarını delerek elektriksel kıvılcım çakar.",
              "ar": "لا يرتبط بالمستقبلات بل يخترق الغشاء الخلوي ويولد شرارة كهربائية.",
              "en": "Acetylcholine never binds receptors; it punches through cell membranes to create electrical sparks."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Reseptörsüz etki tuzağı: Asetilkolin spesifik GPCR (muskarinik) ve ligand kapılı iyon kanallarına (nikotinik) tam stereo-uyumla bağlanır.",
              "ar": "خطأ التأثير غير النوعي: يرتبط الأسيتيل كولين بمستقبلات نوعية بتطابق فراغي صارم.",
              "en": "Non-receptor fallacy: Acetylcholine binds specific GPCRs and ion channels through rigorous 3D pocket complementarity."
            }
          }
        ]
      }
    },
    {
      "id": "mc-mod4-les2-step-02",
      "stage": "question",
      "stageIndex": 2,
      "type": "multipleChoice",
      "title": {
        "tr": "Biyoaktif Konformasyon Paradoksu",
        "ar": "مفارقة التشكيل الحيوي الفعال",
        "en": "The Bioactive Conformation Conundrum"
      },
      "prompt": {
        "tr": "Bir molekülün sulu çözeltideki en düşük enerjili en kararlı konformasyonu, reseptöre bağlandığı andaki biyoaktif konformasyonu olmak zorunda mıdır?",
        "ar": "هل يجب بالضرورة أن يكون التشكيل الفراغي الأكثر استقراراً والأدنى طاقة في المحلول هو ذاته التشكيل الفعال المرتبط بالمستقبل؟",
        "en": "Must a flexible drug's lowest-energy ground state conformer in solution be the exact bioactive conformation that binds the receptor?"
      },
      "technicalTerms": [{ "term": "biyoaktif konformasyon", "arContext": "التشكيل الحيوي الفعال" }],
      "hints": [
        {
          "tr": "Reseptör cebi ile ligand arasında yeni bağlar kurulurken ne açığa çıkar?",
          "ar": "ما الذي يتحرر عند تشكل روابط جديدة بين الدواء وجيب المستقبل؟",
          "en": "What is released when new noncovalent bonds form between drug and receptor?"
        },
        {
          "tr": "Bağlanma entalpisi (ΔH), molekülün enerji bariyerini aşmasına yardım edebilir mi?",
          "ar": "هل يمكن لطاقة الارتباط (ΔH) أن تعوض طاقة إجهاد التشكيل؟",
          "en": "Can binding enthalpy (ΔH) compensate for the energetic cost of adopting a higher-energy rotamer?"
        },
        {
          "tr": "Reseptöre bağlanan form en düşük enerjili form olmak zorunda değildir; bağlanma serbest enerjisi farkı karşılar.",
          "ar": "ليس بالضرورة؛ طاقة الارتباط تعوض الانتقال إلى تشكيل أعلى طاقة.",
          "en": "Not necessarily; favorable binding free energy readily offsets the modest strain of adopting a higher-energy conformer."
        }
      ],
      "sources": [{ "file": "İlaçlarda  İzomeri.pdf", "page": 39 }],
      "conceptCheck": {
        "options": [
          {
            "id": "opt-2a",
            "text": {
              "tr": "Hayır; reseptörle kurulan non-kovalan bağların açığa çıkardığı bağlanma enerjisi, daha yüksek enerjili bir biyoaktif konformasyonu sübvanse eder.",
              "ar": "لا؛ فطاقة الارتباط الناتجة عن الروابط مع المستقبل تعوض تكلفة تبني تشكيل حيوي أعلى طاقة.",
              "en": "No; the favorable binding enthalpy from drug-receptor contacts easily offsets the energetic cost of a higher-energy conformer."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Mükemmel! Bu kural farmasötik kimyanın temelidir: Çözeltide %1 oranında bulunan yüksek enerjili bir konformer, reseptöre kusursuz bağlanıp biyoaktif form olabilir (Slayt 39).",
              "ar": "رائع! التشكيل الحيوي الفعال ليس بالضرورة التشكيل الأكثر وفرة أو الأقل طاقة في المحلول الحر.",
              "en": "Excellent! A minor conformer present at <1% in solution can be the true bioactive species if its receptor contacts provide massive stabilizing enthalpy (Slide 39)."
            }
          },
          {
            "id": "opt-2b",
            "text": {
              "tr": "Evet; termodinamik kuralları gereği reseptörler yalnızca mutlak global minimumdaki molekülleri kabul edebilir.",
              "ar": "نعم؛ تفرض قوانين الديناميكا الحرارية قبول التشكيل الأدنى طاقة فقط.",
              "en": "Yes; thermodynamic laws dictate that receptors only accept molecules in their absolute global energy minimum."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "En düşük enerji dogması: Reseptör bir spektrometre değildir; ligand-reseptör kompleksinin toplam serbest enerjisi minimuma iner, serbest ligantın değil.",
              "ar": "فخ طاقة القاع: العبرة بالطاقة الحرة الكلية للمعقد (الدواء-المستقبل) وليس للدواء بمفرده في الماء.",
              "en": "Ground-state dogma: What must be minimized is the free energy of the overall drug-receptor complex, not the isolated ligand in water."
            }
          },
          {
            "id": "opt-2c",
            "text": {
              "tr": "Moleküller reseptöre bağlanırken kütlelerini tamamen kaybederek saf ışığa dönüşür.",
              "ar": "تفقد الجزيئات كتلتها كلياً وتتحول إلى ضوء نقي عند الارتباط.",
              "en": "Molecules lose their entire mass and transform into pure light upon receptor binding."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Fizik dışı distraktör: İlaç molekülleri kütlelerini korur; non-kovalan kimyasal bağlarla bağlanır.",
              "ar": "خطأ عبثي: تحتفظ الجزيئات بكتلتها وترتبط بقوى فيزيائية حيوية مثبتة.",
              "en": "Nonsensical distractor: Drugs retain their atomic composition and mass upon binding macromolecular targets."
            }
          }
        ]
      }
    },
    {
      "id": "mc-mod4-les2-step-03",
      "stage": "intuition",
      "stageIndex": 3,
      "type": "multipleChoice",
      "title": {
        "tr": "Sezgisel Model: Sallanan İp vs Kilitli Anahtar",
        "ar": "نموذج حدسي: الحبل المتأرجح مقابل المفتاح الثابت",
        "en": "Mental Model: Wild Rope vs Pre-Cast Key"
      },
      "prompt": {
        "tr": "Serbest dönen 4 tekli bağı olan esnek bir molekül reseptöre bağlanırken neden büyük bir termodinamik ceza öder?",
        "ar": "لماذا تدفع جزيئة مرنة تمتلك 4 روابط أحادية دوارة ضريبة ديناميكية حرارية باهظة عند ارتباطها بالمستقبل؟",
        "en": "Why does an ultra-flexible drug molecule with 4 rotatable bonds pay a massive thermodynamic penalty when locking into a receptor pocket?"
      },
      "technicalTerms": [{ "term": "konformasyonel entropi", "arContext": "الإنتروبيا التشكيلية" }],
      "hints": [
        {
          "tr": "Çözeltide yüzlerce farklı biçimde sallanan bir ipi tek bir şekle soktuğunuzda düzensizlik (entropi) ne olur?",
          "ar": "ماذا يحدث للعشوائية (الإنتروبيا) عندما تجبر حبلاً حراً يتلوى بمئات الأشكال على التزام شكل واحد؟",
          "en": "What happens to molecular disorder (entropy) when a rope twisting in hundreds of states is forced into one fixed shape?"
        },
        {
          "tr": "Termodinamikte düzenin bedeli (-TΔS) pozitiftir; bu bağlanma serbest enerjisini (ΔG) zayıflatır.",
          "ar": "ضريبة النظام الإيجابية (-TΔS) تضعف طاقة الارتباط الحرة.",
          "en": "The thermodynamic penalty of enforced order (-TΔS > 0) directly opposes and weakens binding affinity."
        },
        {
          "tr": "Dönen bağların donması konformasyonel entropi cezası üretir; rijit moleküller bu cezadan muaftır.",
          "ar": "تجميد الروابط الدوارة يفرض ضريبة إنتروبية باهظة؛ بينما الهياكل الجاسئة معفاة منها.",
          "en": "Freezing rotatable bonds creates a severe conformational entropy penalty; pre-organized rigid scaffolds evade this penalty."
        }
      ],
      "sources": [{ "file": "İlaçlarda  İzomeri.pdf", "page": 41 }],
      "conceptCheck": {
        "options": [
          {
            "id": "opt-3a",
            "text": {
              "tr": "Serbest rotasyon yapan bağların tek bir şekilde donması entropi cezası (-TΔS) üretir ve afiniteyi zayıflatır.",
              "ar": "تجميد الروابط الحرة في هيئة واحدة يولد ضريبة إنتروبيا (-TΔS) تنقص من طاقة الارتباط الكلية.",
              "en": "Freezing freely rotating bonds into a single pose incurs a heavy conformational entropy penalty (-TΔS), weakening affinity."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Harika analiz! Her serbest dönebilen bağ için ~2.5-4.0 kJ/mol entropik bedel ödenir. Bu nedenle esnek moleküller cebe oturmakta zorlanır.",
              "ar": "تحليل رائع! كل رابطة حرة تتجمد تكلف ~2.5 إلى 4 كيلوجول/مول كضريبة إنتروبية تضعف الارتباط.",
              "en": "Brilliant! Freezing each rotatable bond costs ~2.5-4.0 kJ/mol in entropic penalty. Pre-organizing the scaffold saves this energy."
            }
          },
          {
            "id": "opt-3b",
            "text": {
              "tr": "Dönen bağlar yüksek sürtünmeden dolayı aşırı ısı üreterek reseptör proteinini yakıp eritir.",
              "ar": "الروابط الدوارة تولد حرارة احتكاك تحرق بروتين المستقبل وتذيبه.",
              "en": "Rotating bonds generate intense frictional heat that denatures and melts the receptor protein."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Sürtünme ısısı yanılgısı: Moleküler bağ rotasyonları makroskopik sürtünme ısısı üretmez; olay kuantum termodinamik entropidir.",
              "ar": "خطأ الاحتكاك: الدوران الجزيئي لا يولد حرارة احتكاك عيانية، بل يخضع للديناميكا الحرارية الإحصائية.",
              "en": "Frictional fallacy: Single-bond rotations do not produce macroscopic frictional heat; the penalty is statistical entropy."
            }
          },
          {
            "id": "opt-3c",
            "text": {
              "tr": "Esnek moleküllerin kütlesi bağlar döndükçe artarak yerçekimiyle kabın dibine çöker.",
              "ar": "تزداد كتلة الجزيئات كلما دارت روابطها فتهوي إلى القاع بفعل الجاذبية.",
              "en": "Flexible molecules gain mass as bonds rotate, causing them to sink due to gravity."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kütle artışı yanılgısı: Bağ dönmesi molekülün kütlesini kesinlikle değiştirmez.",
              "ar": "خطأ تغير الكتلة: دوران الروابط لا يغير كتلة الجزيء إطلاقاً.",
              "en": "Variable mass misconception: Single-bond rotations have zero effect on molecular mass."
            }
          }
        ]
      }
    },
    {
      "id": "mc-mod4-les2-step-04",
      "stage": "visual_explanation",
      "stageIndex": 4,
      "type": "multipleChoice",
      "title": {
        "tr": "Asetilkolinin İki Yüzü: Gauche vs Anti",
        "ar": "وجها الأسيتيل كولين: المتطابق والممتد",
        "en": "Structural Profiles: Gauche vs Anti Rotamers"
      },
      "prompt": {
        "tr": "Asetilkolinin kuaterner azotu ile ester oksijeni arasındaki mesafe katlanmış (gauche) formda 3.3 Å, uzamış (anti) formda 4.4 Å'dür. Bu fark neyi belirler?",
        "ar": "المسافة بين نيتروجين الأسيتيل كولين وأكسجين الإستر هي 3.3 أنغستروم في التشكيل المطوي و4.4 في الممتد. ماذا يحدد هذا؟",
        "en": "The distance between acetylcholine's quaternary nitrogen and ester oxygen is 3.3 Å in the folded gauche conformer and 4.4 Å in the extended anti conformer. What does this dictate?"
      },
      "technicalTerms": [
        { "term": "gauche konformasyon", "arContext": "تشكيل غوش المطوي" },
        { "term": "anti konformasyon", "arContext": "تشكيل أنتي الممتد" }
      ],
      "hints": [
        {
          "tr": "3.3 Å ve 4.4 Å mesafeleri iki farklı reseptör cebinin bağlanma noktalarına karşılık gelir.",
          "ar": "المسافتان 3.3 و 4.4 أنغستروم تقابلان نقطتي ارتباط في جيبي مستقبلين مختلفين.",
          "en": "The 3.3 Å and 4.4 Å spans match distinct pharmacophore distances in two different receptor subtypes."
        },
        {
          "tr": "Kalp kası muskarinik, çizgili kas nikotinik cepleri farklı mesafeler arar.",
          "ar": "يتطلب الجيب المسكاريني في القلب والنيكوتيني في العضلات مسافات فراغية متباينة.",
          "en": "Muscarinic GPCRs and nicotinic ion channels require completely different interaction geometries."
        },
        {
          "tr": "3.3 Å katlanmış form muskarinik reseptöre, 4.4 Å uzamış form nikotinik reseptöre bağlanır.",
          "ar": "الشكل المطوي 3.3 يربط المسكاريني والشكل الممتد 4.4 يربط النيكوتيني.",
          "en": "The 3.3 Å folded gauche rotamer binds muscarinic receptors; the 4.4 Å extended anti rotamer binds nicotinic receptors."
        }
      ],
      "sources": [{ "file": "İlaçlarda  İzomeri.pdf", "page": 42 }],
      "conceptCheck": {
        "options": [
          {
            "id": "opt-4a",
            "text": {
              "tr": "Reseptör alt tip seçiciliğini: 3.3 Å katlanmış form muskarinik cebe, 4.4 Å uzamış form nikotinik cebe tam oturur.",
              "ar": "الانتقائية الفرعية للمستقبل: المطوي (3.3 Å) يلائم المسكاريني والممتد (4.4 Å) يلائم النيكوتيني.",
              "en": "Subtype selectivity: The 3.3 Å gauche form binds muscarinic, while the 4.4 Å anti form binds nicotinic receptors."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kusursuz bilgi! Slayt 42 verisi: Gauche konformerinde N+ ile O mesafesi ≈ 3.3 Å olup muskarinik reseptöre, anti konformerinde ise ≈ 4.4 Å olup nikotinik reseptöre seçicilik sağlar.",
              "ar": "دقة مثالية! تشكيل gauche بمسافة 3.3 أنغستروم يلائم المسكاريني، وتشكيل anti بمسافة 4.4 يلائم النيكوتيني (شريحة 42).",
              "en": "Flawless! Slide 42 explicitly documents: Gauche rotamer (3.3 Å) binds muscarinic GPCRs; Anti rotamer (4.4 Å) binds nicotinic ion channels."
            }
          },
          {
            "id": "opt-4b",
            "text": {
              "tr": "Molekülün rengini: 3.3 Å iken kırmızı, 4.4 Å iken mavi ışık saçar.",
              "ar": "لون الجزيء: يشع ضوءاً أحمر عند 3.3 Å وأزرق عند 4.4 Å.",
              "en": "Molecular color: It glows red at 3.3 Å and emits blue light at 4.4 Å."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Işık saçma tuzağı: Asetilkolin görünür ışık yaymaz; renksiz küçük bir moleküldür.",
              "ar": "خطأ إشعاع الضوء: الأسيتيل كولين جزيء عديم اللون لا يصدر إشعاعات ضوئية.",
              "en": "Optical luminescence trap: Acetylcholine is a colorless organic ester with zero visible light emission."
            }
          },
          {
            "id": "opt-4c",
            "text": {
              "tr": "Molekül ağırlığını: Katlanmış formun molekül ağırlığı uzamış formun iki katıdır.",
              "ar": "الوزن الجزيئي: وزن التشكيل المطوي ضعف وزن التشكيل الممتد.",
              "en": "Molecular weight: The folded form weighs twice as much as the extended form."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Ağırlık değişimi yanılgısı: Rotamerler aynı kapalı formüle ve molekül ağırlığına (146.2 g/mol) sahiptir.",
              "ar": "خطأ تغير الوزن: المتشكلات الدورانية تتطابق تماماً في الكتلة والصيغة الجزيئية.",
              "en": "Molecular weight fallacy: Conformer rotamers possess identical chemical formulas and molecular weight (146.2 g/mol)."
            }
          }
        ]
      }
    },
    {
      "id": "mc-mod4-les2-step-05",
      "stage": "interactive_artifact",
      "stageIndex": 5,
      "type": "interactiveWidget",
      "widgetType": "ReceptorLigandMatcher",
      "title": {
        "tr": "İnteraktif Eşleştirici: Asetilkolin Konformerleri",
        "ar": "المطابق التفاعلي: تشكيلات الأسيتيل كولين",
        "en": "Interactive Matcher: Acetylcholine Conformer Pharmacophores"
      },
      "prompt": {
        "tr": "Asetilkolinin gauche (3.3 Å) ve anti (4.4 Å) rotamerlerini ile rijit siklopropil analoglarını doğru reseptör cepleriyle eşleştirin.",
        "ar": "طابق متشكلي أستيل كولين gauche (3.3 Å) و anti (4.4 Å) ونظائرهما الجاسئة مع الجيوب المستقبلية الصحيحة.",
        "en": "Match acetylcholine's gauche (3.3 Å) and anti (4.4 Å) rotamers and rigid cyclopropyl analogs to their selective receptor pockets."
      },
      "config": {
        "title": "Asetilkolin Konformerleri ve Rijit Analog Eşleştiricisi",
        "prompt": "Konformerleri ve rijit analogları doğru reseptör cebiyle eşleştirin.",
        "drugName": "Asetilkolin ve Siklopropil Analogları",
        "receptorName": "Muskarinik (M1) ve Nikotinik (nAChR) Reseptör Cepleri",
        "pairs": [
          {
            "id": "pair_gauche",
            "drugGroup": "Katlanmış Gauche Form (3.3 Å)",
            "correctResidueId": "res_muscarinic",
            "bondType": "ionic",
            "energyKcalMol": "5-10 kcal/mol",
            "explanation": "3.3 Å katlanmış mesafe Muskarinik M1 reseptör cebindeki Asp105 ve hidrojen bağı noktalarına tam kenetlenir."
          },
          {
            "id": "pair_anti",
            "drugGroup": "Uzamış Anti Form (4.4 Å)",
            "correctResidueId": "res_nicotinic",
            "bondType": "pi_pi",
            "energyKcalMol": "2-7 kcal/mol",
            "explanation": "4.4 Å uzamış mesafe Nikotinik nAChR cebindeki Trp149 katyon-pi ve Tyr93 dipol cebine kusursuz oturur."
          },
          {
            "id": "pair_cis_cyclo",
            "drugGroup": "(+)-Cis-Asetilsiklopropil",
            "correctResidueId": "res_muscarinic",
            "bondType": "ionic",
            "energyKcalMol": "5-10 kcal/mol",
            "explanation": "Cis-siklopropil halkası gauche geometriyi rijit olarak dondurur; sadece muskarinik reseptörleri uyarır (Slayt 42)."
          },
          {
            "id": "pair_trans_cyclo",
            "drugGroup": "(+)-Trans-Asetilsiklopropil",
            "correctResidueId": "res_nicotinic",
            "bondType": "pi_pi",
            "energyKcalMol": "2-7 kcal/mol",
            "explanation": "Trans-siklopropil halkası anti geometriyi rijit olarak dondurur; sadece nikotinik reseptörleri uyarır (Slayt 42)."
          }
        ],
        "residues": [
          {
            "id": "res_muscarinic",
            "residueName": "Muskarinik M1 Reseptör Cebi (3.3 Å)",
            "description": "Katlanmış 3.3 Å farmakofor arayan dar, derin GPCR aktif cebi."
          },
          {
            "id": "res_nicotinic",
            "residueName": "Nikotinik nAChR Cebi (4.4 Å)",
            "description": "Uzamış 4.4 Å farmakofor arayan pentamerik iyon kanalı cebi."
          },
          {
            "id": "res_steric_clash",
            "residueName": "Sterik İtme / Uyumsuz Cep",
            "description": "Yanlış geometrideki rotamerleri dışarı iten sterik engel bölgesi."
          }
        ],
        "source": { "file": "İlaçlarda  İzomeri.pdf", "page": 42 }
      },
      "technicalTerms": [{ "term": "rijit analog", "arContext": "النظير الجاسئ" }],
      "hints": [
        {
          "tr": "Gauche ve cis-analogları 3.3 Å kısa mesafeyi temsil eder.",
          "ar": "يمثل تشكيل gauche والنظير cis المسافة القصيرة 3.3 أنغستروم.",
          "en": "Gauche rotamers and cis-analogs represent the compact 3.3 Å distance."
        },
        {
          "tr": "Anti ve trans-analogları 4.4 Å uzun mesafeyi temsil eder.",
          "ar": "يمثل تشكيل anti والنظير trans المسافة الطويلة 4.4 أنغستروم.",
          "en": "Anti rotamers and trans-analogs represent the extended 4.4 Å distance."
        },
        {
          "tr": "Kısa mesafe muskarinik cebe, uzun mesafe nikotinik cebe kenetlenir.",
          "ar": "المسافة القصيرة تلائم المسكاريني، والمسافة الطويلة تلائم النيكوتيني.",
          "en": "Compact distance docks into muscarinic; extended distance docks into nicotinic receptors."
        }
      ],
      "sources": [{ "file": "İlaçlarda  İzomeri.pdf", "page": 42 }]
    },
    {
      "id": "mc-mod4-les2-step-06",
      "stage": "guided_discovery",
      "stageIndex": 6,
      "type": "multipleChoice",
      "title": {
        "tr": "Siklopropan Halkasıyla Dondurma Deneyi",
        "ar": "تجربة التجميد بحلقة البروبان الحلقي",
        "en": "The Cyclopropane Ring Freezing Experiment"
      },
      "prompt": {
        "tr": "Bilim insanları asetilkolin zincirine siklopropan halkası ekleyerek dönmeyi durdurdu. (+)-Trans-analog sadece nikotinik, (+)-cis-analog sadece muskarinik etki gösterdi. Bu neyi ispatlar?",
        "ar": "جمد العلماء دوران الأستيل كولين بإقحام حلقة بروبان حلقي. نشط متماكب trans المستقبل النيكوتيني فقط، ونشط cis المسكاريني فقط. ما الذي يثبته هذا؟",
        "en": "Chemists inserted a cyclopropane ring to freeze acetylcholine's rotation. The (+)-trans analog activated only nicotinic, while (+)-cis activated only muscarinic receptors. What does this definitively prove?"
      },
      "technicalTerms": [{ "term": "konformasyonel kısıtlama", "arContext": "التقييد التشكلي" }],
      "hints": [
        {
          "tr": "Esnek asetilkolin her iki reseptörü uyarırken, dondurulmuş halkalı moleküller sadece birini uyardı.",
          "ar": "بينما نشط أستيل كولين المرن كلا المستقبلين، نشطت النظائر المجمدة مستقبلاً واحداً فقط.",
          "en": "Flexible acetylcholine hit both targets, but rigid locked analogs activated only one target each."
        },
        {
          "tr": "Bu deney, her reseptör alt tipinin liganddan farklı bir geometrik şekil talep ettiğinin kanıtıdır.",
          "ar": "يثبت هذا أن كل نوع فرعي من المستقبلات يشترط شكلاً هندسياً مستقلاً للارتباط.",
          "en": "This proves each receptor subtype requires an unequivocal spatial pharmacophoric geometry."
        },
        {
          "tr": "Biyoaktif konformasyon hipotezini doğrular: Muskarinik reseptör gauche, nikotinik reseptör anti şekli ister.",
          "ar": "يؤكد فرضية التشكيل الحيوي: المسكاريني يطلب شكل gauche، والنيكوتيني يطلب anti.",
          "en": "It validates bioactive conformation theory: Muscarinic requires gauche; nicotinic requires anti."
        }
      ],
      "sources": [{ "file": "İlaçlarda  İzomeri.pdf", "page": 42 }],
      "conceptCheck": {
        "options": [
          {
            "id": "opt-6a",
            "text": {
              "tr": "Biyoaktif konformasyon teorisini: Her reseptör alt tipi esnek molekülün kendine uyan tek bir uzaysal formunu seçerek bağlar.",
              "ar": "نظرية التشكيل الحيوي الفعال: كل نوع فرعي من المستقبلات يختار وينشط بتشكيل هندسي محدد وحيد.",
              "en": "Bioactive conformation theory: Each receptor subtype selects and binds a single distinct spatial geometry."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Harika çıkarım! Slayt 42'de belirtildiği gibi rijit siklopropil analogları, asetilkolinin iki farklı reseptörde iki farklı biyoaktif konformasyon sergilediğinin kesin kimyasal kanıtıdır.",
              "ar": "استنتاج رائع! تثبت نظائر البروبان الحلقي الجاسئة أن أستيل كولين يمتلك تشكيلين حيويين متمايزين لكل مستقبل.",
              "en": "Outstanding deduction! As shown on Slide 42, rigid cyclopropyl analogs provide definitive chemical proof of subtype-specific bioactive conformations."
            }
          },
          {
            "id": "opt-6b",
            "text": {
              "tr": "Siklopropan halkasının vücutta nükleer füzyon yaparak reseptörleri yok ettiğini.",
              "ar": "أن حلقة البروبان الحلقي تقوم باندماج نووي يدمر المستقبلات.",
              "en": "That cyclopropane rings undergo nuclear fusion in vivo to annihilate receptors."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Nükleer absürtlük tuzağı: Biyolojik moleküllerde nükleer füzyon gerçekleşmez; rijitlik sadece sterik geometriyi dondurur.",
              "ar": "خطأ عبثي: لا تحدث تفاعلات نووية في الجسم؛ التجسئة تثبت الشكل الفراغي فقط.",
              "en": "Nuclear absurdity: Chemical rings never trigger nuclear reactions; they purely freeze dihedral angles."
            }
          },
          {
            "id": "opt-6c",
            "text": {
              "tr": "Asetilkolinin reseptörlere bağlanabilmesi için önce tamamen buharlaşması gerektiğini.",
              "ar": "أن الأسيتيل كولين يجب أن يتبخر كلياً قبل أن يتمكن من الارتباط بالمستقبل.",
              "en": "That acetylcholine must fully evaporate into vapor before it can bind receptors."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Buharlaşma distraktörü: Nörotransmitterler sinaptik aralıkta sulu çözelti fazında difüzyonla bağlanır.",
              "ar": "خطأ التبخر: تنتقل النواقل العصبية بالانتشار في السائل المشبكي المائي.",
              "en": "Vaporization distraction: Synaptic neurotransmission occurs entirely in aqueous solution via diffusion."
            }
          }
        ]
      }
    },
    {
      "id": "mc-mod4-les2-step-07",
      "stage": "formal_explanation",
      "stageIndex": 7,
      "type": "multipleChoice",
      "title": {
        "tr": "Histamin H1 ve H2 Konformer Ayrımı",
        "ar": "التمييز التشكلي للهستامين بين H1 و H2",
        "en": "Histamine Dilemma: H1 Bronchoconstriction vs H2 Acid"
      },
      "prompt": {
        "tr": "Histaminin uzamış transoid A konformeri (4.55 Å) H1 reseptörüne, katlanmış B konformeri (3.60 Å) H2 reseptörüne bağlanır. Bu rijit ayrım neden hayati bir klinik kazançtır?",
        "ar": "يرتبط تشكيل هستامين الممتد A (4.55 Å) بمستقبل H1، والمطوي B (3.60 Å) بمستقبل H2. لماذا يعد التقييد التشكلي مكسباً سريرياً حاسماً؟",
        "en": "Histamine's extended conformer A (4.55 Å) binds H1 receptors, while folded conformer B (3.60 Å) binds H2. Why is rigid analog design clinically vital?"
      },
      "technicalTerms": [
        { "term": "H1 reseptörü", "arContext": "مستقبل الهستامين 1" },
        { "term": "H2 reseptörü", "arContext": "مستقبل الهستامين 2" }
      ],
      "hints": [
        {
          "tr": "H1 uyarısı alerji ve bronkospazm yaparken, H2 uyarısı mide asidi salgılar.",
          "ar": "تنشيط H1 يسبب الحساسية وتضيق القصبات، وتنشيط H2 يفرز حمض المعدة.",
          "en": "H1 activation mediates allergies and bronchoconstriction; H2 activation stimulates gastric acid."
        },
        {
          "tr": "Esnek histamin her iki etkiyi birden tetikler; rijit bir molekül ise sadece birini hedefler.",
          "ar": "الهستامين المرن يطلق كلا الأثرين معاً، بينما يستهدف الجزيء الجاسئ أحدهما حصراً.",
          "en": "Flexible histamine triggers both pathways, whereas a rigidified analog selectively addresses only one."
        },
        {
          "tr": "3.60 Å katlanmış mesafede dondurulan rijit ligandlar alerjik yan etki yapmadan sadece mide asidini bloke eder.",
          "ar": "تجميد المسافة عند 3.60 Å يثبط حمض المعدة حصراً دون تداخل مع مستقبلات الحساسية.",
          "en": "Freezing the pharmacophore at 3.60 Å selectively blocks gastric acid without causing allergic cross-reactivity."
        }
      ],
      "sources": [{ "file": "İlaçlarda  İzomeri.pdf", "page": 43 }],
      "conceptCheck": {
        "options": [
          {
            "id": "opt-7a",
            "text": {
              "tr": "Esnek histamin iki reseptörü de uyarırken, mesafesi kilitlenen rijit analoglar alerjik yan etki yapmadan sadece mide asidini selektif bloke eder.",
              "ar": "بينما ينشط الهستامين المرن المستقبلين، فإن تثبيت المسافة يسمح بحجب حمض المعدة دون آثار حساسية.",
              "en": "While flexible histamine triggers both, rigidified analogs lock the exact distance to block gastric acid without allergic cross-reactivity."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Tebrikler! Slayt 43'e göre: Histamin A konformeri (4.55 Å) H1 bronkokonstriksiyonunu, B konformeri (3.60 Å) H2 mide asidini yönetir. Simetidin gibi H2 blokerleri bu konformasyonel tasarımla doğmuştur.",
              "ar": "تهانينا! شريحة 43: التشكيل A بمسافة 4.55 Å يخص H1، والتشكيل B بمسافة 3.60 Å يخص H2. أدوية قرحة المعدة (H2 blockers) صممت بناء على هذا المبدأ.",
              "en": "Congratulations! Slide 43 documents: Conformer A (4.55 Å) governs H1 allergic response; Conformer B (3.60 Å) governs H2 gastric acid. Blockbusters like cimetidine were engineered using this exact rigid constraint."
            }
          },
          {
            "id": "opt-7b",
            "text": {
              "tr": "H1 ve H2 reseptörlerinin aslında tek bir protein olduğunu ve ayrımın önemsiz olduğunu göstermek için.",
              "ar": "لإثبات أن مستقبلي H1 و H2 بروتين واحد متطابق ولا فائدة من التمييز بينهما.",
              "en": "To demonstrate that H1 and H2 receptors are an identical single protein with meaningless differences."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Monolitik reseptör yanılgısı: H1 (Gq kenetli) ve H2 (Gs kenetli) tamamen farklı genler ve proteinlerdir.",
              "ar": "خطأ تماثل المستقبلات: مستقبلا H1 و H2 مختلفان تماماً جينياً ووظيفياً.",
              "en": "Identical receptor misconception: H1 (Gq-coupled) and H2 (Gs-coupled) are distinct GPCR genes with divergent signaling cascades."
            }
          },
          {
            "id": "opt-7c",
            "text": {
              "tr": "Mide asidini tamamen sıfırlayarak midenin eriyip yok olmasını hızlandırmak için.",
              "ar": "لتصفير حمض المعدة تماماً حتى تتآكل المعدة وتختفي.",
              "en": "To completely eliminate stomach acid so that the stomach digests itself away."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Zararlı etki distraktörü: H2 blokerleri mide pH'sını güvenli aralıkta tutarak ülseri iyileştirir.",
              "ar": "خطأ عبثي: أدوية H2 تحمي الغشاء المخاطي المعدي من التقرح وتساعد على الشفاء.",
              "en": "Nonsensical trap: H2 antagonists control gastric acidity to promote mucosal ulcer healing."
            }
          }
        ]
      }
    },
    {
      "id": "mc-mod4-les2-step-08",
      "stage": "concept_check",
      "stageIndex": 8,
      "type": "multipleChoice",
      "title": {
        "tr": "Nöroleptik Bütirofenonlarda Sandalye Konformasyonu",
        "ar": "تشكيل الكرسي في البوتيروفينونات المضادة للذهان",
        "en": "Butyrophenone Neuroleptics: Equatorial vs Axial"
      },
      "prompt": {
        "tr": "Haloperidol benzeri bütirofenon nöroleptiklerde 4-hidroksipiperidin halkası sandalye konformasyonundadır. Aromatik sübstitüentin ekvatoryal veya aksiyal yönelimi aktiviteyi nasıl değiştirir?",
        "ar": "في مضادات الذهان مثل هالوبيريدول تتبنى حلقة بيبيريدين تشكيل الكرسي. كيف يغير التوجه الاستوائي أو المحوري الفعالية؟",
        "en": "In butyrophenone neuroleptics, the piperidine ring adopts a chair conformation. How does the equatorial versus axial orientation of the 4-aryl group impact antipsychotic potency?"
      },
      "technicalTerms": [
        { "term": "sandalye konformasyonu", "arContext": "تشكيل الكرسي" },
        { "term": "ekvatoryal konum", "arContext": "الموقع الاستوائي" }
      ],
      "hints": [
        {
          "tr": "Sikloheksan/piperidin sandalye konformasyonunda aksiyal gruplar 1,3-diaxial itmeye maruz kalır.",
          "ar": "في تشكيل الكرسي، تتعرض المجموعات المحورية (axial) لتنافر sterik مع الهيدروجينات المجاورة.",
          "en": "In chair conformations, axial substituents experience severe 1,3-diaxial steric clash."
        },
        {
          "tr": "Ekvatoryal grup halkanın çevresine doğru uzanarak reseptör düzlemine engelsizce yanaşır.",
          "ar": "تمتد المجموعة الاستوائية (equatorial) نحو المحيط الخارجي فتقترب من جيب المستقبل بلا عائق.",
          "en": "Equatorial substituents project outward into the equatorial plane, docking unobstructed into receptor sub-pockets."
        },
        {
          "tr": "Ekvatoryal aril grubu dopamin D2 cebine tam oturur; aksiyal bükülme afiniteyi şiddetle düşürür.",
          "ar": "المجموعة الاستوائية تلائم جيب دوبامين D2 بدقة، بينما يسقط التوجه المحوري الألفة بشدة.",
          "en": "The equatorial aryl conformer binds dopamine D2 pockets with high affinity; axial orientation destroys binding."
        }
      ],
      "sources": [{ "file": "İlaçlarda  İzomeri.pdf", "page": 41 }],
      "conceptCheck": {
        "options": [
          {
            "id": "opt-8a",
            "text": {
              "tr": "Ekvatoryal konumdaki aril grubu dopamin D2 cebine kusursuz oturur; aksiyal bükülme sterik itmeyle afiniteyi 100 kat düşürür.",
              "ar": "المجموعة الاستوائية تلائم جيب مستقبل دوبامين D2 تماماً؛ بينما يقلل التوجه المحوري الألفة بمقدار 100 ضعف بسبب الإعاقة الفراغية.",
              "en": "The equatorial 4-aryl conformer docks perfectly into dopamine D2 pockets; axial orientation causes steric clash, dropping affinity 100-fold."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kesinlikle doğru! Slayt 41'e göre: 4-(4-hidroksipiperidino)bütirofenonlarda piperidin halkasındaki sübstitüentin ekvatoryal/aksiyal konformasyonu nöroleptik etkinin varlığını belirler.",
              "ar": "صحيح بدقة! شريحة 41: يحدد التشكيل الاستوائي/المحوري في حلقة البيبيريدين قوة الفعالية المضادة للذهان.",
              "en": "Precisely correct! Slide 41 documents that equatorial vs axial orientation on the piperidine chair dictates neuroleptic potency at dopamine D2 receptors."
            }
          },
          {
            "id": "opt-8b",
            "text": {
              "tr": "Ekvatoryal ve aksiyal konformasyonlar aynı anda var olamaz çünkü sandalye halkası parçalanır.",
              "ar": "لا يمكن للتشكيلين الاستوائي والمحوري الوجود لأن حلقة الكرسي تتكسر فوراً.",
              "en": "Equatorial and axial conformations cannot co-exist because the chair ring spontaneously shatters."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Halka parçalanma yanılgısı: Sandalye halkası ring-flip ile aksiyal ve ekvatoryal formlar arasında dinamik dengededir; parçalanmaz.",
              "ar": "خطأ تكسر الحلقة: تقلب حلقة الكرسي (ring flip) يحول المحوري إلى استوائي في توازن ديناميكي مستمر دون أي كسر روابط.",
              "en": "Ring breakdown misconception: Piperidine chair rings undergo continuous dynamic chair-chair flips in solution without breaking bonds."
            }
          },
          {
            "id": "opt-8c",
            "text": {
              "tr": "Sandalye konformasyonundaki ilaçlar yalnızca hastanın oturduğu sandalyenin açısına göre etki eder.",
              "ar": "الأدوية في تشكيل الكرسي لا تؤثر إلا بناء على زاوية الكرسي الذي يجلس عليه المريض.",
              "en": "Chair-conformation drugs only work when the patient is seated in an actual physical chair."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kelime oyunu distraktörü: Sandalye konformasyonu moleküler uzaysal geometridir; mobilya ile hiçbir ilgisi yoktur.",
              "ar": "خطأ لغوي ساذج: تشكيل الكرسي وصف هندسي لجزيئات الكيمياء العضوية وليس له علاقة بالأثاث.",
              "en": "Literal pun trap: Chair conformation refers to the 3D zigzag geometry of 6-membered rings, unrelated to physical furniture."
            }
          }
        ]
      }
    },
    {
      "id": "mc-mod4-les2-step-09",
      "stage": "application",
      "stageIndex": 9,
      "type": "multipleChoice",
      "title": {
        "tr": "Entropik Tasarım: Rotasyonel Serbestlik Tasarrufu",
        "ar": "التصميم الإنتروبي: توفير حرية الدوران",
        "en": "Quantitative Thermodynamics: Rotatable Bond Savings"
      },
      "prompt": {
        "tr": "Bir ilaç tasarımcısı, 5 adet serbest dönebilen tekli bağı bir sikloheksil halkası içine kilitleyerek rijit hale getirmiştir. Bağlanma serbest enerjisinde (ΔG) beklenen termodinamik kazanç nedir?",
        "ar": "قام مصمم أدوية بتجميد 5 روابط أحادية دوارة داخل حلقة سداسية صلبة. ما هو الكسب الديناميكي الحراري المتوقع في طاقة الارتباط الحرة (ΔG)؟",
        "en": "A medicinal chemist rigidifies a flexible lead by locking 5 rotatable bonds into a fused cyclohexyl scaffold. What is the expected thermodynamic gain in binding free energy (ΔG)?"
      },
      "technicalTerms": [{ "term": "bağlanma serbest enerjisi (ΔG)", "arContext": "طاقة الارتباط الحرة" }],
      "hints": [
        {
          "tr": "Her serbest dönebilen bağ için tasarruf edilen ortalama entropik enerjiyi hatırlayın.",
          "ar": "تذكر متوسط الطاقة الإنتروبية الموفرة لكل رابطة دوارة متجمدة.",
          "en": "Recall the average entropic energy saved per frozen rotatable bond (~2.5-4.0 kJ/mol)."
        },
        {
          "tr": "5 bağ için toplam kazanç: 5 × (2.5 ila 4.0 kJ/mol) = 12.5 ila 20.0 kJ/mol.",
          "ar": "الحصيلة لـ 5 روابط: 5 × (2.5 إلى 4.0) = 12.5 إلى 20 كيلوجول/مول.",
          "en": "Multiply 5 bonds by ~3 kJ/mol: ~15 kJ/mol favorable shift in ΔG."
        },
        {
          "tr": "15 kJ/mol serbest enerji kazancı, Kd afinitesinde 100 ila 1000 kat artışa karşılık gelir.",
          "ar": "كسب 15 كيلوجول/مول يرفع ألفة الارتباط بمقدار 100 إلى 1000 ضعف.",
          "en": "A 15 kJ/mol gain in ΔG translates to a 100- to 1000-fold increase in binding affinity (Kd drops)."
        }
      ],
      "sources": [{ "file": "İlaçlarda  İzomeri.pdf", "page": 41 }],
      "conceptCheck": {
        "options": [
          {
            "id": "opt-9a",
            "text": {
              "tr": "Her donan bağ için ~2.5-4.0 kJ/mol entropi tasarrufu sağlanır; toplamda ~15 kJ/mol kazanç afiniteyi (Kd) 100-1000 kat artırır.",
              "ar": "توفر كل رابطة مجمدة ~2.5-4.0 كيلوجول/مول؛ وحصيلة ~15 كيلوجول/مول ترفع الألفة بمقدار 100 إلى 1000 ضعف.",
              "en": "Each frozen bond saves ~2.5-4.0 kJ/mol in entropy penalty; ~15 kJ/mol total gain boosts affinity (drops Kd) 100- to 1000-fold."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Olağanüstü biyofiziksel kavrayış! ΔG = ΔH - TΔS denkleminde bağların önceden kilitlenmesi TΔS kaybını sıfırlayarak bağlanmayı kat kat güçlü kılar.",
              "ar": "فهم فيزيائي حيوي استثنائي! تثبيت الروابط مسبقاً يلغي ضريبة الإنتروبيا التشكيلية فيرفع الألفة بشكل أسي.",
              "en": "Extraordinary biophysical deduction! In ΔG = ΔH - TΔS, pre-organizing the scaffold eliminates conformational entropy loss, driving exponential affinity increases."
            }
          },
          {
            "id": "opt-9b",
            "text": {
              "tr": "Donan bağlar moleküle elektrik yükü vererek ilacı bir süper iletkene dönüştürür.",
              "ar": "تمنح الروابط المجمدة شحنة كهربائية تحول الدواء إلى موصل فائق.",
              "en": "Frozen bonds impart electrical charge that transforms the drug into a room-temperature superconductor."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Fiziksel yanılgı: Halkalaşma süperiletkenlik yaratmaz; sadece rotasyonel serbestlik derecesini (NRotB) düşürür.",
              "ar": "خطأ علمي: التجسئة الهيكلية تقلل درجات الحرية الدورانية فقط ولا تصنع موصلات فائقة.",
              "en": "Superconductor trap: Rigidification simply reduces the number of rotatable bonds (NRotB); it has nothing to do with superconductivity."
            }
          },
          {
            "id": "opt-9c",
            "text": {
              "tr": "Rijit halka molekülün suda çözünürlüğünü sıfırlayarak kana geçişini tamamen imkansız kılar.",
              "ar": "تلغي الحلقة الصلبة ذائبية الدواء المائية كلياً وتمنع امتصاصه في الدم.",
              "en": "The rigid ring reduces aqueous solubility to absolute zero, making blood absorption impossible."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Çözünürlük dogması: Halka eklenmesi lipofilisiteyi artırabilir ancak polar gruplar taşındığı sürece çözünürlük korunur.",
              "ar": "خطأ الذائبية: إضافة حلقة لا تعدم الذائبية المائية ما دامت المجموعات القطبية موجودة.",
              "en": "Blanket insolubility trap: Adding a ring modulates logP, but as long as polar groups are preserved, adequate aqueous solubility remains."
            }
          }
        ]
      }
    },
    {
      "id": "mc-mod4-les2-step-10",
      "stage": "retrieval",
      "stageIndex": 10,
      "type": "multipleChoice",
      "title": {
        "tr": "Aralıklı Hatırlama: Konfigürasyon vs Konformasyon",
        "ar": "استرجاع متباعد: التشكيل الفراغي مقابل التماكب البنائي",
        "en": "Spaced Retrieval: Conformation vs Configuration"
      },
      "prompt": {
        "tr": "Optik enantiyomerler (konfigürasyon) ile rotamerler (konformasyon) arasındaki temel kimyasal ayrım nedir?",
        "ar": "ما الفارق الكيميائي الجوهري الحاسم بين المصاوغات الضوئية المرآوية والمتشكلات الدورانية؟",
        "en": "What is the fundamental physical-chemical boundary separating enantiomers (configuration) from rotamers (conformation)?"
      },
      "technicalTerms": [
        { "term": "konfigürasyon", "arContext": "التشكيل التكويني" },
        { "term": "konformasyon", "arContext": "التشكيل الفراغي" }
      ],
      "hints": [
        {
          "tr": "Birbirine dönüştürmek için kovalent bağ kırmak gerekir mi gerekmez mi?",
          "ar": "هل يتطلب التحويل كسر روابط تساهمية أم لا؟",
          "en": "Does interconversion require breaking and reforming covalent bonds?"
        },
        {
          "tr": "Enantiyomerler kovalent bağ kırılmadan birbirine dönüşemez; rotamerler tekli bağ dönmesiyle dinamik olarak dönüşür.",
          "ar": "لا تتحول المصاوغات المرآوية إلا بكسر الروابط؛ بينما تتحول الروتانيرات بالدوران الحر فقط.",
          "en": "Enantiomers require covalent bond cleavage; rotamers interconvert dynamically via thermal rotation."
        },
        {
          "tr": "Konfigürasyon kovalent bağ kırılması şart koşar; konformasyon serbest döner.",
          "ar": "التكوين يشترط كسر الروابط؛ والتشكيل يدور بحرية.",
          "en": "Configuration requires covalent bond breaking; conformation rotates freely around single bonds."
        }
      ],
      "sources": [{ "file": "İlaçlarda  İzomeri.pdf", "page": 8 }, { "file": "İlaçlarda  İzomeri.pdf", "page": 39 }],
      "conceptCheck": {
        "options": [
          {
            "id": "opt-10a",
            "text": {
              "tr": "Konfigürasyon izomerleri ancak kovalent bağ kırılıp yeniden oluşarak dönüşebilir; konformerler ise tekil bağlar etrafında enerji harcamaksızın döner.",
              "ar": "تتحول المصاوغات التكوينية حصراً بكسر روابط تساهمية وإعادة بنائها؛ بينما تدور المتشكلات الفراغية حول الروابط الأحادية بحرية.",
              "en": "Configuration isomers only interconvert by breaking covalent bonds; conformers interconvert dynamically via rotation around single bonds."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Tam bir sınav klasiği! Slayt 8 ve 39'un özeti: Konfigürasyon (enantiyomerler, cis/trans) kovalent bağ kırılması gerektirirken, konformasyon dinamik dengededir.",
              "ar": "قاعدة ذهبية! شريحة 8 و 39: التماكب التكويني يتطلب كسر الروابط، بينما التماكب التشكلي دوران حر في توازن ديناميكي.",
              "en": "Textbook gold standard! Slides 8 and 39: Configuration requires covalent bond rupture; conformation interconverts via thermal single-bond rotation."
            }
          },
          {
            "id": "opt-10b",
            "text": {
              "tr": "Konfigürasyon sadece gazlarda, konformasyon ise sadece katı kristallerde görülür.",
              "ar": "يحدث التكوين في الغازات فقط، بينما يقتصر التشكيل على البلورات الصلبة فقط.",
              "en": "Configuration only exists in gases, whereas conformation is restricted exclusively to solid crystals."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Faz durumu yanılgısı: Her iki stereokimyasal fenomen de çözeltide, kanda ve dokularda eş zamanlı olarak geçerlidir.",
              "ar": "خطأ الحالة الفيزيائية: كلتا الظاهرتين تحدثان في المحاليل المائية والأنسجة الحية.",
              "en": "Phase confusion: Both stereochemical phenomena operate concurrently in solution, blood, and living tissues."
            }
          },
          {
            "id": "opt-10c",
            "text": {
              "tr": "İki terim de tamamen eşanlamlıdır ve aralarında hiçbir fiziksel fark yoktur.",
              "ar": "المصطلحان مترادفان تماماً ولا يوجد أي فارق فيزيائي بينهما.",
              "en": "Both terms are completely synonymous and share zero physical distinctions."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Eşanlamlılık hatası: Konfigürasyon ve konformasyon farmasötik kimyanın en temel iki zıt kavramıdır.",
              "ar": "خطأ الترادف: التكوين والتشكيل مفهومان متباينان جوهرياً في الكيمياء الدوائية.",
              "en": "False synonymy: Configuration and conformation are foundational, distinct concepts in stereochemistry."
            }
          }
        ]
      }
    },
    {
      "id": "mc-mod4-les2-step-11",
      "stage": "connection",
      "stageIndex": 11,
      "type": "multipleChoice",
      "title": {
        "tr": "Modül Köprüsü: Sitokrom P450 ve Metabolik Cep Uyumu",
        "ar": "جسر الموديول: تطابق السيتوكروم P450 والجيب الاستقلابي",
        "en": "Module Bridge: Conformation Meets Phase I Metabolism"
      },
      "prompt": {
        "tr": "Bir ilacın esnek konformasyonel yapısı, karaciğerde Sitokrom P450 enzimlerinin oksitleyeceği metabolik zayıf noktaları (soft-spots) nasıl belirler?",
        "ar": "كيف يحدد التشكيل الفراغي المرن للدواء نقاط الضعف الاستقلابية التي ستؤكسدها إنزيمات السيتوكروم P450 في الكبد؟",
        "en": "How does a drug's dynamic conformational flexibility determine which metabolic soft-spots are presented to the heme iron-oxo radical of Cytochrome P450?"
      },
      "technicalTerms": [{ "term": "metabolik zayıf nokta (soft-spot)", "arContext": "نقطة الضعف الاستقلابية" }],
      "hints": [
        {
          "tr": "CYP450 aktif bölgesinde reaktif bir demir-okso radikali (Fe4+=O) bulunur.",
          "ar": "يحتوي الجيب النشط لـ CYP450 على جذر أكسيد الحديد التفاعلي.",
          "en": "The CYP450 catalytic pocket contains an iron-oxo radical intermediate ([Fe4+=O]•+)."
        },
        {
          "tr": "İlacın hangi pozisyonunun hidroksilleneceği, molekülün cebe hangi konformasyonda yanaştığına bağlıdır.",
          "ar": "يعتمد موقع الهدرلة على التشكيل الفراغي الذي يقدمه الدواء لجذر الحديد.",
          "en": "Which atom is oxygenated depends on which conformation presents that bond closest to the heme iron."
        },
        {
          "tr": "Enzime bağlanan biyoaktif konformasyon, reaktif radikale en yakın karbonu metabolize eder (Modül 5 Faz I temeli).",
          "ar": "التشكيل المرتبط بالإنزيم يقدم الكربون الأقرب لجذر الأكسجين ليتم أكسدته.",
          "en": "The conformer bound inside the catalytic cleft presents the closest carbon to the radical center (Module 5 Phase I bridge)."
        }
      ],
      "sources": [{ "file": "İlaçlarda  İzomeri.pdf", "page": 41 }],
      "conceptCheck": {
        "options": [
          {
            "id": "opt-11a",
            "text": {
              "tr": "İlaç CYP450 cebine oturduğunda en kararlı değil, enzimin demir-okso merkezine en yakın uzanan konformasyon hidroksillenir.",
              "ar": "عندما يستقر الدواء في جيب CYP450، فإن التشكيل الذي يوجه الرابطة الأقرب لمركز جذر الحديد هو الذي يتأكسد.",
              "en": "When docked into CYP450, the conformation presenting a C-H bond closest to the iron-oxo radical is selectively hydroxylated."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Harika bir modül köprüsü! Gelecek Modül 5'te göreceğimiz Faz I CYP450 metabolizmasında, metabolik soft-spot'ların seçimi doğrudan ilacın aktif cepteki konformasyonuna bağlıdır.",
              "ar": "ربط موديولي متقن! استقلاب المرحلة الأولى بواسطة CYP450 يعتمد كلياً على التشكيل الفراغي الذي يتبناه الدواء داخل جيب الإنزيم.",
              "en": "Masterful module bridge! In Phase I CYP450 metabolism (Module 5), metabolic soft-spot selection is strictly dictated by the conformer adopted inside the catalytic pocket."
            }
          },
          {
            "id": "opt-11b",
            "text": {
              "tr": "Sitokrom P450 enzimleri yalnızca dairesel halkaları tanır; zincirleri parçalayamaz.",
              "ar": "تتعرف إنزيمات CYP450 على الحلقات فقط ولا تؤكسد السلاسل الأليفاتية المفتوحة.",
              "en": "Cytochrome P450 enzymes only recognize closed rings and cannot oxidize open aliphatic chains."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Enzim kısıtlama yanılgısı: CYP450 hem aromatik halkaları hem de alifatik yan zincirleri (ω ve ω-1) hızla hidroksiller.",
              "ar": "خطأ قصر الإنزيم: تؤكسد إنزيمات CYP450 السلاسل الأليفاتية والحلقات العطرية على حد سواء.",
              "en": "Enzyme restriction fallacy: CYP450 readily hydroxylates aliphatic chains (at omega and omega-1 positions) as well as aromatic rings."
            }
          },
          {
            "id": "opt-11c",
            "text": {
              "tr": "Karaciğerde hiçbir ilaç metabolize olmaz; tüm ilaçlar değişmeden ter bezleriyle atılır.",
              "ar": "لا يستقلب أي دواء في الكبد بل تطرح كل الأدوية سليمة عبر الغدد العرقية.",
              "en": "No drug is ever metabolized in the liver; all drugs exit unchanged exclusively via sweat glands."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Biyokimya dışı distraktör: Karaciğer insan vücudunun ana metabolik temizleme fabrikasıdır.",
              "ar": "خطأ عبثي: الكبد هو العضو الرئيسي لاستقلاب الأدوية وإزالتها من الجسم.",
              "en": "Nonsensical trap: The liver is the primary metabolic clearance organ responsible for xenobiotic biotransformation."
            }
          }
        ]
      }
    },
    {
      "id": "mc-mod4-les2-step-12",
      "stage": "mastery_check",
      "stageIndex": 12,
      "type": "multipleChoice",
      "title": {
        "tr": "Ustalık Sınavı: Dopamin Agonistinde Rijit Halka Tasarımı",
        "ar": "اختبار الإتقان: تصميم حلقة صلبة لناهض الدوبامين",
        "en": "Mastery Transfer: Rigidification of Dopamine D2 Leads"
      },
      "prompt": {
        "tr": "Dopamin D2 reseptörü transoid (anti) etilamin konformasyonunu şart koşar. 4 dönebilen bağı olan esnek öncü bir liganttan sub-nanomolar afiniteli rijit bir türev tasarlamak için ne yaparsınız?",
        "ar": "يشترط مستقبل الدوبامين D2 تشكيل الإيثيل أمين الممتد (anti). لتصميم مشتق جاسئ فائق الألفة من ربيطة مرنة تمتلك 4 روابط دوارة، ماذا تفعل؟",
        "en": "Dopamine D2 receptors strictly require a trans-coplanar (anti) ethylamine geometry. To evolve a flexible 4-rotatable-bond lead into a sub-nanomolar drug, what structural design do you propose?"
      },
      "technicalTerms": [{ "term": "konformasyonel rigidifikasyon", "arContext": "التجسئة التشكيلية" }],
      "hints": [
        {
          "tr": "D2 reseptörünün istediği geometri transoid (anti) uzamış formdur.",
          "ar": "الهندسة التي يشترطها مستقبل D2 هي الشكل الممتد anti.",
          "en": "The geometry demanded by the D2 receptor is the trans-coplanar (anti) extended pose."
        },
        {
          "tr": "Esnek etilamin zincirini bu anti-biçimde sabitleyen halkalı bir iskelet (tetralin / 2-aminotetralin) düşünün.",
          "ar": "فكر في هيكل حلقي يجمد سلسلة الإيثيل أمين في شكل anti مثل حلقة التترالين.",
          "en": "Consider cyclizing the ethylamine chain into a bicyclic tetralin scaffold locking the anti conformation."
        },
        {
          "tr": "Zinciri trans-tetralin içine kaynaştırmak anti-geometriyi dondurur, entropi cezasını silerek afiniteyi katlar.",
          "ar": "دمج السلسلة في حلقة trans-tetralin يجمد شكل anti ويوفر ضريبة الإنتروبيا فيرفع الألفة بشدة.",
          "en": "Fusing the chain into a trans-tetralin ring locks the anti geometry and eliminates entropy penalties, boosting affinity."
        }
      ],
      "sources": [{ "file": "İlaçlarda  İzomeri.pdf", "page": 41 }],
      "conceptCheck": {
        "options": [
          {
            "id": "opt-12a",
            "text": {
              "tr": "Etilamin zincirini 2-aminotetralin halkası içine kaynaştırıp anti-geometriyi dondurur, entropi cezasını silerek sub-nanomolar afinite sağlarız.",
              "ar": "ندمج سلسلة الإيثيل أمين داخل حلقة 2-aminotetralin لتجميد شكل anti وإلغاء ضريبة الإنتروبيا لتحقيق ألفة عالية.",
              "en": "Fuse the ethylamine chain into a 2-aminotetralin scaffold to lock the anti geometry, eliminating entropy penalties to achieve sub-nanomolar affinity."
            },
            "isCorrect": true,
            "misconceptionFeedback": {
              "tr": "Kusursuz bir farmasötik kimya transferi! Esnek dopamin iskeletini trans-tetralin içine kilitlemek (-TΔS) cezasını (~12 kJ/mol) siler ve molekülü doğrudan D2 agonistine (örn. rotigotin) dönüştürür.",
              "ar": "إتقان مبهر في الكيمياء الدوائية! تجميد هيكل الدوبامين في حلقة التترالين يوفر طاقة الإنتروبيا وينتج ناهضات دوبامين قوية مثل روتيغوتين.",
              "en": "Flawless medicinal chemistry transfer! Locking dopamine's flexible ethylamine chain into a trans-tetralin ring saves ~12 kJ/mol in entropic penalty, yielding sub-nanomolar D2 agonists like rotigotine."
            }
          },
          {
            "id": "opt-12b",
            "text": {
              "tr": "Moleküle 10 adet daha serbest dönebilen uzun yağ asidi zinciri takarak esnekliği maksimuma çıkarırız.",
              "ar": "نضيف 10 سلاسل دهنية حرة الدوران لزيادة المرونة إلى أقصى حد.",
              "en": "Attach 10 additional freely rotating long-chain fatty acids to maximize molecular flexibility."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Entropi felaketi yanılgısı: Daha fazla serbest dönebilen bağ eklemek entropi cezasını patlatır ve reseptör afinitesini yok eder.",
              "ar": "كارثة الإنتروبيا: زيادة الروابط الدوارة تضاعف ضريبة الإنتروبيا الباهظة وتدمر الألفة مع المستقبل.",
              "en": "Entropy catastrophe misconception: Adding more rotatable bonds explodes the conformational entropy penalty, crushing receptor affinity."
            }
          },
          {
            "id": "opt-12c",
            "text": {
              "tr": "Moleküldeki tüm karbonları silip yerine helyum gazı pompalarız.",
              "ar": "نحذف كل ذرات الكربون من الجزيء ونستبدلها بغاز الهيليوم.",
              "en": "Delete all carbon atoms and pump helium gas into the molecular core."
            },
            "isCorrect": false,
            "misconceptionFeedback": {
              "tr": "Kimya dışı saçmalık distraktörü: Helyum soy gazdır; kovalent bağ yapamaz ve farmakofor oluşturamaz.",
              "ar": "خطأ عبثي: الهيليوم غاز خامل لا يكون روابط تساهمية ولا يبني هياكل دوائية.",
              "en": "Absurd distractor: Helium is an inert noble gas incapable of forming covalent bonds or receptor interactions."
            }
          }
        ]
      }
    }
  ]
};

// Mirror conceptCheck options into config.options for client rendering
lesson08.steps.forEach((step, idx) => {
  const stepNum = idx + 1;
  if (stepNum === 5) {
    step.widgetType = 'ReceptorLigandMatcher';
    step.widget = {
      type: 'ReceptorLigandMatcher',
      config: step.config
    };
  } else if (step.conceptCheck && step.conceptCheck.options) {
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

const targetPath = path.resolve(__dirname, '../courses/medchem/lessons/lesson-08.json');
fs.writeFileSync(targetPath, JSON.stringify(lesson08, null, 2), 'utf8');
console.log('Successfully wrote lesson-08.json to:', targetPath);
