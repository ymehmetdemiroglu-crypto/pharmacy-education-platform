const fs = require('fs');
const path = require('path');

const lesson10 = {
  id: "pharm-mod5-les2",
  courseId: "pharmacology",
  moduleId: "ph-mod-05",
  title: {
    tr: "Diüretik Mekanizmaları ve Tübüler Elektrolit Taşınması",
    ar: "آليات مدرات البول ونقل الشوارد في النبيبات الكلوية",
    en: "Diuretic Mechanisms & Tubular Electrolyte Transport"
  },
  order: 2,
  access: "free",
  objective: {
    tr: "Kıvrım, tiyazid ve potasyum tutucu diüretiklerin nefron taşıyıcıları (NKCC2, NCC, ENaC, MR) üzerindeki moleküler mekanizmalarını, elektrolit profillerini ve iyon tuzağı dinamiklerini yönetmek.",
    ar: "إتقان الآليات الجزيئية لمدرات البول العروية والثيازيدية والحافظة للبوتاسيوم على نواقل الكليون (NKCC2, NCC, ENaC, MR) ومظهر الشوارد وديناميكا فخ التأين.",
    en: "Master molecular mechanisms of loop, thiazide, and potassium-sparing diuretics across nephron transporters (NKCC2, NCC, ENaC, MR), electrolyte clearance profiles, and luminal ion trapping."
  },
  misconceptions: [
    {
      tr: "Tüm diüretiklerin potasyum kaybettirdiği ve hipokalemi yaptığı yanılgısı (spironolakton, eplerenon, amilorid ve triamteren toplayıcı kanallarda potasyum atılımını engelleyen potasyum tutucu diüretiklerdir; özellikle ACEi/ARB ile kombine edildiklerinde ölümcül hiperkalemiye yol açabilirler).",
      ar: "الظن الخاطئ بأن جميع مدرات البول تطرح البوتاسيوم وتسبب نقصانه (سبيرونولاكتون وأميلوريد وغيرها مدرات حافظة للبوتاسيوم في القنوات الجامعة، والجمع بينها وبين مثبطات ACE قد يسبب فرط بوتاسيوم مميتاً).",
      en: "The dangerous misconception that all diuretics induce potassium wasting and hypokalemia (spironolactone, eplerenone, and amiloride are potassium-sparing agents acting at collecting ducts; co-administration with ACEi/ARBs risks lethal hyperkalemia)."
    },
    {
      tr: "Kıvrım diüretikleri ile tiyazidlerin kalsiyum atılımını aynı şekilde etkilediği yanılgısı ('Kıvrım Kalsiyumu Kaybettirir': furosemid NKCC2'yi bloke edip lüminal pozitif potansiyeli silerek Ca2+ ve Mg2+ atılımını artırır; tiyazidler ise distal tübülde Ca2+ geri emilimini artırır).",
      ar: "الاعتقاد الخاطئ بتطابق تأثير مدرات البول العروية والثيازيدية على الكالسيوم ('مدرات العروة تطرح الكالسيوم': فوروسيميد يحصر NKCC2 فيزيل الجهد الإيجابي طارحاً الكالسيوم، بينما تعزز الثيازيدات امتصاصه).",
      en: "The confusion that loop and thiazide diuretics affect calcium identically ('Loops Lose Calcium': furosemide inhibits NKCC2, abolishing the lumen-positive potential and wasting calcium; thiazides enhance distal calcium reabsorption)."
    },
    {
      tr: "Diüretiklerin kandan doğrudan bazolateral taraftan nefrona etki ettiği yanılgısı (furosemid ve tiyazidler plazma proteinlerine %95-98 bağlı zayıf organik asitlerdir; glomerülden süzülemezler, proksimal tübüler OAT taşıyıcılarıyla lümene salgılanıp lümen içi hedef bölgelerine taşınmalıdırlar).",
      ar: "الاعتقاد الخاطئ بأن مدرات البول تؤثر على الكليون مباشرة من الدم جانبياً (ترتبط بالبروتينات بنسبة 98% وتعجز عن العبور الكبيبي؛ لذا تفرز بنواقل OAT في النبيبات القريبة لتصل إلى أهدافها في التجويف الأنبوبي).",
      en: "The assumption that diuretics act directly from peritubular capillaries (furosemide and thiazides are 95-98% protein-bound weak organic acids that barely filter; they must be actively secreted via proximal OAT to reach luminal binding sites)."
    }
  ],
  sources: [
    {
      file: "Kardiyovasküler Sistem.pdf",
      page: 24
    }
  ],
  citations: [
    {
      id: "CIT-KATZUNG-CH15-P255",
      book: "Katzung's Basic & Clinical Pharmacology",
      edition: "15th ed.",
      topic: "Diuretic Agents: Loop Diuretics, Thiazides, Potassium-Sparing Agents",
      chapter: "Chapter 15: Diuretic Agents",
      page: "pp. 255-278",
      status: "verified"
    },
    {
      id: "CIT-GG-CH25-P445",
      book: "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
      edition: "14th ed.",
      topic: "Diuretics and Other Agents Employed in the Mobilization of Renal Fluid",
      chapter: "Chapter 25: Diuretics",
      page: "pp. 445-470",
      status: "verified"
    }
  ],
  spacedReviewCards: [
    {
      cardId: "pharm-mod5-les2-card1",
      courseId: "pharmacology",
      drugOrConcept: "Kıvrım Diüretikleri Hedefi ve Pozitif Potansiyel",
      prompt: "Furosemid Henle kulpunda hangi kotransportörü bloke eder ve kalsiyum ile magnezyum atılımını nasıl artırır?",
      answer: "NKCC2 (Na+/K+/2Cl-) kotransportörünü bloke eder. K+ geri sızıntısının oluşturduğu +8 mV'lik lümen-pozitif transepitelyal potansiyeli silerek Ca2+ ve Mg2+'nin paraselüler emilimini durdurur (Loops Lose Calcium).",
      box: 1,
      intervalDays: 1
    },
    {
      cardId: "pharm-mod5-les2-card2",
      courseId: "pharmacology",
      drugOrConcept: "Tiyazid Hedefi ve Kalsiyum Tutulması",
      prompt: "Hidroklorotiyazid hangi segmentte hangi taşıyıcıyı bloke eder ve böbrek taşı oluşumunu neden önler?",
      answer: "Distal kıvrımlı tübülde NCC (Na+/Cl-) kotransportörünü bloke eder. İntraselüler Na+ azalınca bazolateral Na+/Ca2+ değiştiricisi hızlanır; Ca2+ geri emilimi artar ve idrarda kalsiyum azaldığı için taş önlenir.",
      box: 1,
      intervalDays: 1
    },
    {
      cardId: "pharm-mod5-les2-card3",
      courseId: "pharmacology",
      drugOrConcept: "Diüretiklerin OAT Salgısı ve İyon Tuzağı",
      prompt: "Furosemid ve tiyazidler glomerüler filtrasyonla mı yoksa proksimal tübüler salgıyla mı tübüler lümene ulaşır?",
      answer: "Her ikisi de plazma albüminine yüksek oranda bağlıdır (>%95) ve süzülemez; proksimal tübüldeki Organik Anyon Taşıyıcıları (OAT) ile lümene aktif salgılanıp iyonize tuzaklanarak hedef bölgelerine akar.",
      box: 1,
      intervalDays: 1
    },
    {
      cardId: "pharm-mod5-les2-card4",
      courseId: "pharmacology",
      drugOrConcept: "Potasyum Tutucu Diüretik Çeşitleri",
      prompt: "Spironolakton ile amiloridin toplayıcı kanaldaki moleküler etki mekanizması farkı nedir?",
      answer: "Spironolakton intraselüler mineralokortikoid (aldosteron) reseptör antagonistidir; amilorid ise lüminal ENaC sodyum kanallarını doğrudan bloke eden direkt kanal engelleyicisidir.",
      box: 1,
      intervalDays: 1
    }
  ],
  steps: [
    // Step 1: Hook (predict_reveal, predictThenReveal: true)
    {
      id: "pharm-mod5-les2-step1",
      order: 1,
      stageIndex: 1,
      stage: "hook",
      type: "predict_reveal",
      title: {
        tr: "Akut Akciğer Ödemini 5 Dakikada Çözmek",
        ar: "تصريف الوذمة الرئوية الحادة في 5 دقائق",
        en: "Resolving Acute Pulmonary Edema in 5 Minutes"
      },
      predictThenReveal: true,
      prompt: {
        tr: "Boğulma hissiyle acile getirilen dekompanse kalp yetmezliği hastasına intravenöz furosemid puşe yapıldığında, daha tek bir damla idrar çıkmadan 5 dakika içinde nefes darlığı nasıl hızla geriler?",
        ar: "مريض قصور قلب يختنق بوذمة رئوية حادة حُقن بفوروسيميد وريدياً؛ فتحسن تنفسه في غضون 5 دقائق قبل خروج قطرة بول واحدة من مثانته! كيف فسر علم الأدوية هذا الإنقاذ الفوري؟",
        en: "An acute pulmonary edema patient receives an IV push of furosemide. Suffocating dyspnea resolves dramatically within 5 minutes—long before the bladder produces a single drop of urine! How?"
      },
      conceptCheck: {
        question: {
          tr: "Furosemidin idrar çıkışından dakikalar önce pulmoner konjesyonu ve nefes darlığını hızla rahatlatmasının farmakolojik mekanizması nedir?",
          ar: "ما الآلية الدوائية المسؤولة عن تخفيف احتقان الرئة وضيق التنفس قبل بدء إدرار البول بدقائق؟",
          en: "What pharmacological action explains furosemide's rapid relief of pulmonary congestion minutes before diuresis begins?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Böbrekten prostaglandin (PGE2) salgısını uyararak sistemik ve pulmoner venöz kapasitansı hızla artırır (ön yükü düşürür).",
              ar: "تحفيز إفراز البروستاغلاندين (PGE2) الكلوي مما يوسع الأوردة سريعاً ويزيد سعتها ويخفض الحمل القبلي.",
              en: "Stimulating renal prostaglandin (PGE2) release, rapidly increasing systemic venodilation and reducing cardiac preload."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Harika bir klinik farmakoloji teşhisi! Furosemidin ilk etkisi böbreklerden prostaglandin E2 salgılatmaktır. Bu mediyatör venleri genişleterek kanı periferik göllenmeye sevk eder; kalbe dönen kan (ön yük) anında azalarak akciğer ödemini dakikalar içinde boşaltır!",
              ar: "تشخيص دوائي سريري رائع! أول تأثير لفوروسيميد هو تحفيز إطلاق PGE2 من الكلى، مما يوسع الأوردة ويحجز الدم محيطياً؛ فيهبط العائد الوريدي (الحمل القبلي) سريعاً وتتراجع الوذمة الرئوية في دقائق!",
              en: "Brilliant clinical insight! Furosemide's earliest effect is inducing renal prostaglandin synthesis. PGE2 triggers rapid venous capacitance dilation, pooling blood peripherally and reducing cardiac preload well before diuresis begins."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Akciğer alveollerindeki suyu doğrudan kimyasal olarak hidroliz edip oksijen gazına çevirir.",
              ar: "التحليل الكيميائي المباشر لماء الأسناخ الرئوية وتحويله إلى غاز أكسجين نقي.",
              en: "Directly hydrolyzing alveolar fluid chemically into breathable oxygen gas."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Furosemid suyu kimyasal olarak parçalayan bir katalizör değildir; venöz dolaşım hemodinamiğini ve böbrek elektrolit taşınmasını düzenler.",
              ar: "غير صحيح: لا يحلل الدواء الماء كيميائياً إلى أكسجين؛ بل يعدل ديناميكا الأوردة ونقل الشوارد في الكلى.",
              en: "Incorrect: Furosemide is not a water-splitting chemical catalyst; it modulates systemic venous hemodynamics and renal transport."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Bronşlardaki beta-2 adrenerjik reseptörleri salbutamolden 100 kat daha güçlü uyararak bronkodilatasyon yapar.",
              ar: "تنشيط مستقبلات بيتا-2 الأدرينالينية في القصبات بقوة تفوق سالبوتامول بمئة ضعف وتوسيع الشعب.",
              en: "Stimulating bronchial beta-2 adrenergic receptors 100-fold more potently than albuterol."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanlış: Furosemidin adrenerjik reseptörlerle hiçbir etkileşimi yoktur; nefes açıcı etki bronkodilatasyondan değil, venöz göllenme ile sol atriyum basıncının düşmesinden gelir.",
              ar: "غير صحيح: لا يملك فوروسيميد أي نشاط على مستقبلات بيتا؛ والراحة التنفسية ناجمة عن هبوط ضغط الأذين الأيسر بالتوسع الوريدي.",
              en: "Incorrect: Furosemide has zero adrenergic agonist activity; dyspnea relief is driven entirely by venodilation lowering left atrial pressure."
            }
          }
        ]
      },
      technicalTerms: [
        {
          "term": "kıvrım diüretiği",
          "arContext": "مدر البول العروي (loop diuretic)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "İdrar henüz oluşmamışken kalbe ve akciğere binen yükü ne azaltabilir? Genişleyen damar kapasitesi.",
          ar: "قبل خروج البول، ما الذي يخفف العبء عن القلب والرئة؟ اتساع السعة الوعائية الوريدية.",
          en: "Before urine is excreted, what relieves cardiac and pulmonary congestion? Rapid venodilation."
        },
        {
          tier: 2,
          tr: "Furosemid böbrek endotelinden güçlü bir vazodilatatör olan prostaglandin (PGE2) salınımını tetikler.",
          ar: "يحفز فوروسيميد إفراز البروستاغلاندين الموسع للأوردة (PGE2) من النسيج الكلوي.",
          en: "Furosemide induces rapid release of vasodilatory prostaglandins (PGE2) from renal endothelium."
        },
        {
          tier: 3,
          tr: "Venöz göllenme kalbe dönen kanı (ön yükü) saniyeler içinde düşürerek akciğer ödemini rahatlatır.",
          ar: "توسع الأوردة يخفض العائد الوريدي والحمل القبلي للقلب خلال دقائق فيزول ضيق التنفس فوراً.",
          en: "Venodilation slashes venous return and cardiac preload, relieving pulmonary edema within minutes."
        }
      ]
    },

    // Step 2: Question (predict_reveal)
    {
      id: "pharm-mod5-les2-step2",
      order: 2,
      stageIndex: 2,
      stage: "question",
      type: "question",
      title: {
        tr: "Kalsiyum Paradoksu: Böbrek Taşı Tedavisi",
        ar: "مفارقة الكالسيوم: تدبير حصوات الكلى",
        en: "The Calcium Paradox: Nephrolithiasis Prevention"
      },
      predictThenReveal: true,
      prompt: {
        tr: "Tekrarlayan kalsiyum oksalat böbrek taşı olan hipertansif hastaya furosemid vermek taş krizini azdırırken, hidroklorotiyazid vermek taş oluşumunu nasıl engeller? İkisi de diüretik iken kalsiyum kaderi neden zıttır?",
        ar: "مريض ضغط يعاني من حصوات أكسالات الكالسيوم المتكررة: لماذا يفاقم فوروسيميد أزمة الحصوات، بينما يمنع هيدروكلوروثيازيد تكوّنها نهائياً؟ كلاهما مدر للبول فكيف تناقض مصير الكالسيوم؟",
        en: "A hypertensive patient suffers recurrent calcium oxalate nephrolithiasis. Why does furosemide exacerbate kidney stones, while hydrochlorothiazide halts stone formation entirely? Why do their calcium profiles diverge?"
      },
      conceptCheck: {
        question: {
          tr: "Hidroklorotiyazidin idrarda kalsiyum atılımını azaltarak (hipokalsiüri) böbrek taşlarını önlemesinin biyofiziksel sebebi nedir?",
          ar: "ما السبب الفيزيائي الحيوي الذي يجعل هيدروكلوروثيازيد يخفض طرح الكالسيوم البولي ويمنع الحصى؟",
          en: "What biophysical mechanism causes hydrochlorothiazide to reduce urinary calcium excretion (hypocalciuria) and prevent stones?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Distal tübülde NCC'yi bloke ederek hücre içi sodyumu düşürür; bu durum bazolateral Na+/Ca2+ değiştiricisini hızlandırıp kalsiyumun kana geri emilimini artırır.",
              ar: "يحصر ناقل NCC في النبيبات البعيدة فيخفض صوديوم الخلية؛ مما ينشط مبادل Na+/Ca2+ القاعي ويزيد امتصاص الكالسيوم إلى الدم.",
              en: "Inhibiting DCT NCC reduces intracellular sodium, driving the basolateral Na+/Ca2+ exchanger to hyper-reabsorb calcium into blood."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Mükemmel renal biyofizik mantığı! Tiyazid distal tübülde Na+ girişini kesince, epitel hücresinin içi Na+ fakiri olur. Hücre bazolateral taraftan Na+ çekebilmek için Na+/Ca2+ değiştiricisini aşırı çalıştırır; lümendeki Ca2+ hücreden geçip kana döner ve idrarda taş yapacak kalsiyum kalmaz!",
              ar: "منطق فيزيائي حيوي كلوي بديع! عندما يحصر الثيازيد دخول Na+ في النبيبات البعيدة، تفتقر الخلية للصوديوم. ولجلب Na+ تنشط مضخة تبادل Na+/Ca2+ القاعدية، فيسحب الكالسيوم من تجويف الأنبوب إلى الدم ويقل في البول مانعاً الحصوات!",
              en: "Superb biophysical deduction! Blocking luminal NCC depletes intracellular Na+, vastly energizing the basolateral Na+/Ca2+ antiporter. Calcium is actively pulled from urine into blood, eliminating urinary stone substrate!"
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Tiyazid molekülleri kalsiyum iyonlarını kovalent bağlarla parçalayarak yok eder.",
              ar: "تقوم جزيئات الثيازيد بتفكيك شوارد الكالسيوم بروابط تساهمية وتدميرها.",
              en: "Thiazide molecules covalently bind and destroy calcium ions in the tubular lumen."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanılgı: İlaçlar atomları veya iyonları kimyasal olarak yok edemez; taşınma yönünü ve membran taşıyıcılarını modüle ederler.",
              ar: "مغالطة: لا تفكك الأدوية العناصر الكيميائية؛ بل تعدل مسارات النقل عبر أغشية الخلايا الأنبوبية.",
              en: "Misconception: Small molecules cannot chemically destroy calcium atoms; they regulate active epithelial transport."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Furosemid böbrek tübüllerine kalsiyum pompalayan laktik asit bakterilerini indükler.",
              ar: "يحث فوروسيميد بكتيريا حمض اللبن على ضخ الكالسيوم داخل نبيبات الكلى.",
              en: "Furosemide induces lactic acid bacteria to secrete calcium directly into renal tubules."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanılgı: Nefron steril bir dokudur; kalsiyum atılımı bakteriyel değil, Henle kulpundaki lümen-pozitif transepitelyal voltaj kaybından kaynaklanır.",
              ar: "مغالطة: نبيبات الكلى نسيج معقم؛ وفقدان الكالسيوم مع فوروسيميد ناجم عن زوال الجهد الكهربائي في عروة هنلي.",
              en: "Misconception: Renal tubules are sterile; furosemide wastes calcium by abolishing the lumen-positive potential in Henle's loop."
            }
          }
        ]
      },
      technicalTerms: [
        {
          "term": "kalsiüri",
          "arContext": "بيلة الكالسيوم (calciuria)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Böbrek taşı oluşumu idrarda aşırı kalsiyum bulunmasına (hiperkalsiüriye) bağlıdır.",
          ar: "ينجم تكوّن الحصى عن فرط تركيز الكالسيوم في البول (فرط كلس البول).",
          en: "Nephrolithiasis relies on supersaturation of calcium in urine (hypercalciuria)."
        },
        {
          tier: 2,
          tr: "'Loops Lose Calcium, Thiazides Take-in Calcium' kuralını hatırlayın: Kıvrım diüretikleri kalsiyumu idrara atar, tiyazid kana çeker.",
          ar: "تذكر القاعدة: مدرات العروة تطرح الكالسيوم بالبول (تزيد الحصى)، بينما تعيد الثيازيدات امتصاصه للدم (تمنع الحصى).",
          en: "Recall the rule: 'Loops Lose Calcium (worsening stones), Thiazides Take-in Calcium (preventing stones)'."
        },
        {
          tier: 3,
          tr: "Tiyazid distal tübülde kalsiyum geri emilimini artırarak idrardaki kalsiyumu tüketir ve taşı engeller.",
          ar: "تزيد الثيازيدات من إعادة امتصاص الكالسيوم في النبيبات البعيدة، فتنظف البول منه وتمنع الحصى.",
          en: "Thiazides promote distal tubular calcium reabsorption, clearing urine of stone-forming minerals."
        }
      ]
    },

    // Step 3: Intuition (explanation)
    {
      id: "pharm-mod5-les2-step3",
      order: 3,
      stageIndex: 3,
      stage: "intuition",
      type: "intuition",
      title: {
        tr: "Memba Barajı ve Mansap Bendi Analojisi",
        ar: "تشبيه السد العلوي وحواجز المصب المائية",
        en: "The Upstream Dam & Downstream Levee Analogy"
      },
      prompt: {
        tr: "Nefronu kademeli barajlar dizisi düşünün. Henle kulpu suyun %25'ini tutan devasa memba barajıdır. Bu barajı yıkarsanız mansap bentleri (distal tübül ve toplayıcı kanal) sodyum seline kapılır, sodyumu yakalamak için potasyumu feda eder!",
        ar: "تخيل الكليون كسلسلة سدود متتالية. عروة هنلي هي السد العلوي الضخم الذي يحبس 25% من الصوديوم. إذا فجرت هذا السد بمدر عروي، يفيض السيل على حواجز المصب، فتضحي بالبوتاسيوم لتلتقط الصوديوم!",
        en: "Picture the nephron as a river with cascading dams. Henle's loop is the massive upstream dam holding 25% of filtered sodium. Dynamiting this dam swamps downstream levees, which desperately dump potassium to capture sodium!"
      },
      technicalTerms: [
        {
          "term": "Henle kulpu",
          "arContext": "عروة هنلي (loop of Henle)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Büyük baraj yıkıldığında aşağı vadideki küçük bentlere devasa bir su ve sodyum akışı ulaşır.",
          ar: "عند انهيار السد الرئيسي، يتدفق طوفان هائل من الماء والصوديوم نحو الحواجز الصغيرة أسفل الوادي.",
          en: "When the primary upstream dam collapses, an enormous deluge of sodium overwhelms downstream canals."
        },
        {
          tier: 2,
          tr: "Toplayıcı kanallardaki pompalar sodyumu kurtarmaya çalışırken her sodyuma karşılık bir potasyum atar.",
          ar: "تحاول مضخات القنوات الجامعة إنقاذ ما يمكن من الصوديوم، فتقايض كل صوديوم بطرح أيون بوتاسيوم.",
          en: "Collecting duct pumps scramble to reabsorb surging sodium by trading away potassium into the urine."
        },
        {
          tier: 3,
          tr: "Bu yüzden furosemid gibi güçlü memba diüretikleri hastada ağır potasyum kaybına (hipokalemiye) yol açar.",
          ar: "ولهذا السبب تسبب مدرات العروة القوية فقداناً جسيماً للبوتاسيوم في البول (نقص بوتاسيوم الدم).",
          en: "This explains why powerful loop diuretics inevitably trigger profound urinary potassium wasting (hypokalemia)."
        }
      ]
    },

    // Step 4: Visual Explanation (explanation)
    {
      id: "pharm-mod5-les2-step4",
      order: 4,
      stageIndex: 4,
      stage: "visual_explanation",
      type: "visual_explanation",
      title: {
        tr: "Dört Nefron Segmenti ve Taşıyıcı Haritası",
        ar: "خريطة النواقل في أجزاء الكليون الأربعة",
        en: "The Four Nephron Segments & Transporter Architecture"
      },
      prompt: {
        tr: "Çıkan kalın kolda furosemid NKCC2'yi bloke eder; lümen-pozitif potansiyeli silip Ca2+/Mg2+ atılımını artırır. Distal kıvrımlı tübülde tiyazid NCC'yi bloke eder; Ca2+ geri emilimini artırır. Toplayıcı kanalda spironolakton MR'ı, amilorid ENaC'ı bloke ederek potasyum tutar.",
        ar: "في الطرف الصاعد الثخين يحصر فوروسيميد NKCC2؛ فيزيل الجهد الإيجابي طارحاً الكالسيوم. وفي البعيدة يحصر الثيازيد NCC معززاً امتصاص الكالسيوم. وفي الجامعة يحصر سبيرونولاكتون MR وأميلوريد ENaC لحفظ البوتاسيوم.",
        en: "In thick ascending limb, furosemide blocks NKCC2, abolishing lumen-positive voltage and wasting Ca2+/Mg2+. In DCT, thiazides block NCC, increasing Ca2+ reabsorption. In collecting duct, spironolactone and amiloride conserve potassium."
      },
      technicalTerms: [
        {
          "term": "NKCC2 kotransportörü",
          "arContext": "ناقل NKCC2 المرافق (NKCC2 cotransporter)"
        },
        {
          "term": "NCC kotransportörü",
          "arContext": "ناقل NCC المرافق (NCC cotransporter)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Henle kulpunda NKCC2'den geri emilen potasyumun bir kısmı ROMK kanalıyla lümene geri sızar.",
          ar: "في عروة هنلي، يتسرب جزء من البوتاسيوم الممتص عبر ROMK إلى التجويف صانعاً جهداً موجباً.",
          en: "In TAL, potassium recycled via luminal ROMK generates a critical +8 mV lumen-positive transepithelial voltage."
        },
        {
          tier: 2,
          tr: "Bu +8 mV pozitif yük, Ca2+ ve Mg2+ katyonlarını zarlar arası boşluktan kana iter (paraselüler emilim).",
          ar: "يدفع هذا الجهد الموجب (+8 mV) شوارد الكالسيوم والمغنيسيوم بين الخلايا نحو الدم.",
          en: "This +8 mV charge repels divalent cations (Ca2+, Mg2+) through paracellular pathways into blood."
        },
        {
          tier: 3,
          tr: "Furosemid NKCC2'yi durdurunca bu voltaj kaybolur; kalsiyum ve magnezyum idrarla atılır!",
          ar: "عندما يعطل فوروسيميد NKCC2 يختفي الجهد الموجب؛ فيفقد الجسم الكالسيوم والمغنيسيوم في البول!",
          en: "Furosemide abolishes this potential, causing massive urinary dumping of both calcium and magnesium."
        }
      ]
    },

    // Step 5: Interactive Artifact (interactive_simulation)
    {
      id: "pharm-mod5-les2-step5",
      order: 5,
      stageIndex: 5,
      stage: "interactive_artifact",
      type: "interactive_artifact",
      title: {
        tr: "İnteraktif Simülatör: Tübüler Sıvı pH'sı ve Furosemid İyon Tuzağı",
        ar: "محاكي تفاعلي: درجة حموضة السائل الأنبوبي وفخ تأين فوروسيميد",
        en: "Interactive Simulator: Tubular pH & Furosemide Ion Trapping"
      },
      prompt: {
        tr: "Simülatörde tübüler sıvı pH sürgüsünü 5.5'ten 7.4'e getirin. Zayıf asit furosemidin (pKa 3.9) lümende iyonize halde tuzaklanarak zardan geri kaçmasını önleyen ve NKCC2'ye ulaşmasını sağlayan dengeyi keşfedin.",
        ar: "حرك شريط pH البول في المحاكي من 5.5 إلى 7.4. اكتشف كيف يُحتجز حمض فوروسيميد الضعيف (pKa 3.9) متأيّناً في التجويف، مانعاً ارتداده عبر الغشاء ليبلغ هدفه NKCC2.",
        en: "In the simulator, adjust tubular fluid pH from 5.5 to 7.4. Discover how weak acid furosemide (pKa 3.9) is trapped as an impermeant anion, preventing back-diffusion and delivering drug to luminal NKCC2."
      },
      predictThenReveal: false,
      widgetType: "IonizationEquilibriumSlider",
      widget: {
        type: "IonizationEquilibriumSlider",
        config: {
          title: "Tübüler Sıvı pH'sı ve Furosemid İyon Tuzağı",
          prompt: "Tübüler idrar pH'sını 5.5'ten 7.4'e yükseltin; furosemidin (pKa 3.9) lümende iyonize tuzaklanarak NKCC2 taşıyıcısına erişimini izleyin.",
          drugName: "Furosemid (Furosemide)",
          defaultPka: 3.9,
          defaultPh: 5.5,
          defaultDrugType: "acid",
          locale: "tr",
          showBioGradients: true,
          source: {
            file: "Kardiyovasküler Sistem.pdf",
            page: 24
          },
          explanation: "Furosemid zayıf bir organik asittir (pKa 3.9). Proksimal tübülde OAT taşıyıcılarıyla lümene salgılandıktan sonra, lümen pH'sında neredeyse tamamen iyonize kalarak lümende hapsolur ve Henle kulpundaki NKCC2 kotransportörünün lüminal yüzüne bağlanır."
        }
      },
      config: {
        title: "Tübüler Sıvı pH'sı ve Furosemid İyon Tuzağı",
        prompt: "Tübüler idrar pH'sını 5.5'ten 7.4'e yükseltin; furosemidin (pKa 3.9) lümende iyonize tuzaklanarak NKCC2 taşıyıcısına erişimini izleyin.",
        drugName: "Furosemid (Furosemide)",
        defaultPka: 3.9,
        defaultPh: 5.5,
        defaultDrugType: "acid",
        locale: "tr",
        showBioGradients: true,
        source: {
          file: "Kardiyovasküler Sistem.pdf",
          page: 24
        },
        explanation: "Furosemid zayıf bir organik asittir (pKa 3.9). Proksimal tübülde OAT taşıyıcılarıyla lümene salgılandıktan sonra, lümen pH'sında neredeyse tamamen iyonize kalarak lümende hapsolur ve Henle kulpundaki NKCC2 kotransportörünün lüminal yüzüne bağlanır."
      },
      technicalTerms: [
        {
          "term": "iyon tuzağı",
          "arContext": "فخ التأين (ion trapping)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Furosemid bir zayıf organik asittir (pKa 3.9). İdrar pH'sı (5.5 - 7.4) bu pKa değerinin oldukça üzerindedir.",
          ar: "فوروسيميد حمض عضوي ضعيف (pKa 3.9)، ودرجة حموضة البول (5.5 - 7.4) أعلى بكثير من قيمة pKa.",
          en: "Furosemide is a weak organic acid (pKa 3.9); tubular pH (5.5 - 7.4) sits well above its pKa."
        },
        {
          tier: 2,
          tr: "Henderson-Hasselbalch kuralına göre ortam pH'sı pKa'dan büyük olduğunda asitler yüklü (anyonik) forma geçer.",
          ar: "وفق معادلة هندرسون، عندما يتجاوز pH الوسط قيمة pKa تتحول الأحماض إلى شوارد سالبة متأينة.",
          en: "By Henderson-Hasselbalch, when pH exceeds pKa, weak acids exist predominantly as charged anions."
        },
        {
          tier: 3,
          tr: "Yüklü furosemid lipid hücre zarından geri kana sızamaz; lümende akarak çıkan koldaki NKCC2'ye kenetlenir.",
          ar: "تعجز شوارد فوروسيميد عن العبور عبر الغشاء الدهني للدم؛ فتحتبس بالتجويف لتصل إلى NKCC2.",
          en: "Charged furosemide anions cannot back-diffuse into blood; trapped in fluid, they reach luminal NKCC2."
        }
      ]
    },

    // Step 6: Guided Discovery (guided_discovery)
    {
      id: "pharm-mod5-les2-step6",
      order: 6,
      stageIndex: 6,
      stage: "guided_discovery",
      type: "guided_discovery",
      title: {
        tr: "Medüller Hipertonisite ve İdrar Konsantrasyonu",
        ar: "فرط التوتر اللبي الكلوي وتركيز البول",
        en: "Medullary Hypertonicity & Countercurrent Multiplier"
      },
      prompt: {
        tr: "Furosemid Henle kulpunda zıt akım çoğaltıcı mekanizmayı felç eder. Medüller interstisyumdaki ozmotik gradyan (1200 mOsm/L) çöker. Böbrek idrarı ne konsantre edebilir ne de seyreltebilir; hasta izostenürik (300 mOsm/L) devasa hacimde idrar çıkarır!",
        ar: "يشل فوروسيميد آلية التيار المتعاكس المضاعف في عروة هنلي؛ فينهار الميل التناضحي للب الكلية (1200 mOsm/L). تعجز الكلية عن تركيز البول أو تمديده؛ فيخرج مفرط الحجم ثابت التناضح (300 mOsm/L)!",
        en: "Furosemide paralyzes the countercurrent multiplier. The corticomedullary osmotic gradient (1200 mOsm/L) completely collapses. The kidney can neither concentrate nor dilute urine, producing massive isosthenuric fluid loss (300 mOsm/L)!"
      },
      technicalTerms: [
        {
          "term": "medüller ozmotik gradyan",
          "arContext": "الميل التناضحي اللبي (medullary osmotic gradient)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Böbrek idrarı nasıl konsantre eder? Medullada biriktirilen yüksek tuz (1200 mOsm/L) sayesinde.",
          ar: "كيف تركز الكلية البول؟ عبر تجميع تركيز ملحي هائل (1200 mOsm/L) في اللب الكلوي.",
          en: "How does the kidney concentrate urine? By pumping salt to build a 1200 mOsm/L hypertonic medulla."
        },
        {
          tier: 2,
          tr: "Bu tuzu medullaya pompalayan ana motor Henle kulpundaki NKCC2 kotransportörüdür.",
          ar: "المحرك الأساسي لضخ هذا الملح نحو النسيج اللبي هو ناقل NKCC2 في عروة هنلي.",
          en: "The primary engine generating this medullary gradient is the thick ascending limb NKCC2 transporter."
        },
        {
          tier: 3,
          tr: "Furosemid bu motoru kapatınca su çekecek gradyan kalmaz; toplayıcı kanaldan su geri emilemez ve dışarı akar.",
          ar: "عند تعطيل هذا المحرك بفوروسيميد يزول سحب الماء؛ فتعجز القنوات الجامعة عن استعادته ويفيض البول.",
          en: "Furosemide kills this engine; without osmotic pull, water cannot be reabsorbed, producing massive diuresis."
        }
      ]
    },

    // Step 7: Formal Explanation (explanation)
    {
      id: "pharm-mod5-les2-step7",
      order: 7,
      stageIndex: 7,
      stage: "formal_explanation",
      type: "formal_explanation",
      title: {
        tr: "Elektrolit ve Asit-Baz Profilleri: Yan Etki Analizi",
        ar: "مظهر الشوارد والتوازن الحمضي القاعدي: تحليل الآثار الجانبية",
        en: "Electrolyte & Acid-Base Profiles: Adverse Effect Mapping"
      },
      prompt: {
        tr: "Kıvrım ve tiyazid diüretikleri distal sodyum yükünü artırarak aşırı potasyum ve hidrojen atılımına yol açar (hipokalemik metabolik alkaloz). Ayrıca proksimal tübülde ürik asitle OAT için yarışarak hiperürisemi ve gut krizini tetiklerler.",
        ar: "تزيد مدرات العروة والثيازيد من حمولة الصوديوم البعيدة مسببة إفراطاً في طرح البوتاسيوم والهيدروجين (قلاء استقلابي بنقص البوتاسيوم). كما تنافس حمض اليوريك على نواقل OAT مسببة فرط يوريك الدم ونوبات النقرس.",
        en: "Loop and thiazide diuretics deliver high sodium loads distally, stimulating massive potassium and proton secretion (hypokalemic metabolic alkalosis). They also compete with uric acid for proximal OAT secretion, triggering gout attacks."
      },
      technicalTerms: [
        {
          "term": "hipokalemik metabolik alkaloz",
          "arContext": "قلاء استقلابي بنقص بوتاسيوم الدم (hypokalemic metabolic alkalosis)"
        },
        {
          "term": "hiperürisemi",
          "arContext": "فرط حمض يوريك الدم (hyperuricemia)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Distal toplayıcı kanala ne kadar çok sodyum gelirse, epitel hücresi o kadar çok K+ ve H+ iyonunu idrara fırlatır.",
          ar: "كلما وصلت كميات أكبر من الصوديوم للنبيبات البعيدة، قايضتها الخلايا بطرح شوارد K+ و H+ في البول.",
          en: "Higher distal sodium delivery forces principal and intercalated cells to hyper-excrete K+ and H+ ions."
        },
        {
          tier: 2,
          tr: "Kandaki potasyum düşer (hipokalemi) ve asit iyonları (H+) kaybolduğu için kan bazikleşir (metabolik alkaloz).",
          ar: "يهبط بوتاسيوم الدم (نقص البوتاسيوم)، وبخروج أيونات الهيدروجين الحامضية تصبح الدماء قلوية (قلاء استقلابي).",
          en: "Loss of potassium causes hypokalemia, while wasting hydrogen ions creates metabolic alkalosis."
        },
        {
          tier: 3,
          tr: "Ayrıca kandan lümene geçmek için ürik asitle yarışırlar; atılamayan ürik asit eklemlerde çöküp gut yapar.",
          ar: "كما تنافس حمض اليوريك على الإفراز الأنبوبي؛ فيتراكم في الدم ويترسب في المفاصل مفجراً داء النقرس.",
          en: "Diuretics also outcompete uric acid for proximal OAT secretion, triggering hyperuricemia and acute gout."
        }
      ]
    },

    // Step 8: Concept Check (multiple_choice)
    {
      id: "pharm-mod5-les2-step8",
      order: 8,
      stageIndex: 8,
      stage: "concept_check",
      type: "concept_check",
      title: {
        tr: "Kritik İlaç Etkileşimi: Furosemid ve Digoksin Aritmisi",
        ar: "تداخل دوائي حرج: فوروسيميد ولا نظميات الديجوكسين",
        en: "Critical Drug Interaction: Furosemide & Digoxin Arrhythmias"
      },
      prompt: {
        tr: "Kalp yetmezliğinde digoksin ile furosemidin birlikte kullanımında ortaya çıkan ölümcül ventriküler aritmilerin arkasındaki iyonik ve farmakodinamik etkileşimi analiz edin.",
        ar: "حلل التفاعل الشاردي والديناميكي الدوائي وراء حدوث اضطرابات النظم البطينية المميتة عند الجمع بين Digoxin و Furosemide في علاج قصور القلب.",
        en: "Analyze the ionic and pharmacodynamic interaction precipitating fatal ventricular arrhythmias when digoxin is co-prescribed with furosemide in heart failure patients."
      },
      conceptCheck: {
        question: {
          tr: "Kalp yetmezliği hastasında digoksin ile furosemid birlikte kullanıldığında ortaya çıkan ölümcül ventriküler aritmilerin temel farmakodinamik nedeni nedir?",
          ar: "عند جمع دواء Digoxin مع Furosemide لمريض قصور قلب، ما السبب الديناميكي الدوائي وراء حدوث اضطرابات نظم بطينية مميتة؟",
          en: "When digoxin and furosemide are co-prescribed in heart failure, what pharmacodynamic mechanism precipitates lethal ventricular arrhythmias?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Furosemidin neden olduğu hipokalemi, digoksinin kardiyak Na+/K+-ATPaz enzimine bağlanmasını kolaylaştırarak aşırı miyokardiyal toksisite ve aritmi yaratır.",
              ar: "نقص بوتاسيوم الدم الناجم عن فوروسيميد يسهل ارتباط الديجوكسين بمضخة Na+/K+-ATPase القلبية مفجراً سمية لا نظمية حادة.",
              en: "Furosemide-induced hypokalemia removes potassium competition at cardiac Na+/K+-ATPase, massively potentiating digoxin toxicity and arrhythmogenesis."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Kusursuz bir klinik farmakoloji muhakemesi! Potasyum ile digoksin, kalpteki Na+/K+-ATPaz pompasının dış yüzündeki aynı bağlanma cebi için yarışır. Furosemid potasyumu kandan temizleyince (hipokalemi), savunmasız kalan pompaları digoksin istila eder ve hücre içi kalsiyum aşırı yükselerek fatal taşiaritmiler patlak verir.",
              ar: "محاكمة دوائية سريرية متقنة! يتنافس البوتاسيوم والديجوكسين على نفس جيب الارتباط بمضخة Na+/K+-ATPase القلبية. عندما يستنزف فوروسيميد البوتاسيوم، ينفرد الديجوكسين بالمضخات مسبباً فرط كلسيوم داخلي ولا نظميات بطينية مميتة.",
              en: "Flawless clinical pharmacology! Extracellular potassium competes with digoxin for the external binding pocket of myocardial Na+/K+-ATPase. When furosemide depletes potassium, digoxin unopposedly occupies pumps, driving toxic calcium overload and ventricular fibrillation."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Furosemid digoksin moleküllerini kanda parçalayarak toksik siyanür radikalleri açığa çıkarır.",
              ar: "يقوم فوروسيميد بتكسير جزيئات الديجوكسين في الدم محرراً جذور السيانيد السامة.",
              en: "Furosemide cleaves circulating digoxin molecules, releasing free toxic cyanide radicals."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanılgı: Digoksin molekülünde siyanür grubu yoktur; kimyasal parçalanma olmaz, hasar elektrolit dengesizliğine (hipokalemi) bağlı farmakodinamik duyarlılaşmadır.",
              ar: "مغالطة: لا يحتوي الديجوكسين على سيانيد ولا يتحلل كيميائياً؛ بل السمية ناجمة عن حساسية دوائية سببها نقص البوتاسيوم.",
              en: "Misconception: Digoxin contains no cyanide moieties; the toxicity is purely pharmacodynamic sensitization mediated by hypokalemia."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Furosemid böbrek tübüllerinde digoksinin emilimini 100 kat artırarak kan düzeyini aniden yükseltir.",
              ar: "يزيد فوروسيميد امتصاص الديجوكسين في نبيبات الكلى بمقدار 100 ضعف رافعاً تركيزه بالدم.",
              en: "Furosemide accelerates tubular reabsorption of digoxin 100-fold, instantly spiking its blood concentration."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanılgı: Furosemid digoksinin renal geri emilimini artırmaz; digoksin klerensi böbrek yetmezliğinde düşer ama buradaki akut tetikleyici hipokalemidir.",
              ar: "مغالطة: لا يزيد فوروسيميد امتصاص الديجوكسين كلوياً؛ بل المحرض الحاسم للسمية هنا هو هبوط البوتاسيوم الشاردي.",
              en: "Misconception: Furosemide does not enhance tubular digoxin reabsorption; the primary arrhythmogenic driver is hypokalemic sensitization."
            }
          }
        ]
      },
      technicalTerms: [
        {
          "term": "digoksin toksisitesi",
          "arContext": "سمية الديجوكسين (digoxin toxicity)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Furosemid kanda hangi temel elektroliti hızla tüketir? Potasyum (K+).",
          ar: "ما الشاردة الأساسية التي يستنزفها فوروسيميد بشدة من الدم؟ البوتاسيوم (K+).",
          en: "Which critical cation does furosemide aggressively waste into the urine? Potassium (K+)."
        },
        {
          tier: 2,
          tr: "Kalp kasındaki Na+/K+-ATPaz pompasında potasyum ile digoksin birbirine rakiptir.",
          ar: "يتنافس البوتاسيوم والديجوكسين على نفس موقع الارتباط بمضخة Na+/K+-ATPase في القلب.",
          en: "Potassium and digoxin directly compete for binding at cardiac Na+/K+-ATPase pumps."
        },
        {
          tier: 3,
          tr: "Kanda potasyum azaldığında digoksin pompaya çok daha sıkı yapışır ve ölümcül ritim bozukluğu yaratır.",
          ar: "عند هبوط البوتاسيوم، يخلو الموقع للديجوكسين فيرتبط بقوة مضاعفة مسبباً تسمماً قاتلاً.",
          en: "Hypokalemia leaves pump binding sites vacant, drastically potentiating digoxin binding and fatal arrhythmias."
        }
      ]
    },

    // Step 9: Application (multiple_choice)
    {
      id: "pharm-mod5-les2-step9",
      order: 9,
      stageIndex: 9,
      stage: "application",
      type: "application",
      title: {
        tr: "Klinik Karar: Ağır Böbrek Yetmezliğinde Diüretik Direnci",
        ar: "قرار سريري: مقاومة مدرات البول في القصور الكلوي المتقدم",
        en: "Clinical Decision: Diuretic Resistance in Advanced CKD"
      },
      prompt: {
        tr: "İlerlemiş kronik böbrek yetmezliğinde (eGFH < 30 mL/dak) hidroklorotiyazidin neden tamamen etkisiz kaldığını ve neden yüksek tavanlı kıvrım diüretiklerine geçilmesi gerektiğini değerlendirin.",
        ar: "قيّم سبب الفشل الدوائي التام للثيازيد في القصور الكلوي المتقدم (eGFR < 30 mL/min)، ولماذا يتعين التحول الفوري لمدرات العروة عالية السقف كالفوروسيميد.",
        en: "Evaluate why hydrochlorothiazide fails completely in advanced renal failure (eGFR < 30 mL/min), and why switching to high-ceiling loop diuretics is clinically imperative."
      },
      conceptCheck: {
        question: {
          tr: "Evre 4 kronik böbrek yetmezliği olan (eGFH = 22 mL/dak) ve ağır periferik ödemi bulunan hastaya hidroklorotiyazid başlanıyor ancak hiçbir diüretik yanıt alınamıyor. Bu direncin farmakolojik nedeni nedir ve tedavi nasıl düzeltilmelidir?",
          ar: "مريض قصور كلوي متقدم من المرحلة 4 (eGFR = 22 mL/min) يعاني من وذمات شديدة عولج بـ Hydrochlorothiazide دون أي استجابة مدرة للبول. ما التفسير الدوائي، وكيف يصوب العلاج؟",
          en: "A stage 4 CKD patient (eGFR = 22 mL/min) with severe edema is given hydrochlorothiazide but exhibits zero diuretic response. What is the pharmacological basis of this failure, and how should therapy be corrected?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Tiyazidler GFH < 30 mL/dak olduğunda distal tübüle yeterli sodyum ulaşmadığı için etkisizleşir; tedavi yüksek doz kıvrım diüretiğine (furosemid) çevrilmelidir.",
              ar: "تفقد الثيازيدات فعاليتها عندما يقل GFR عن 30 mL/min لقلة الصوديوم الواصل للنبيبات البعيدة؛ ويجب التحول لمدر عروي عالي الجرعة كالفوروسيميد.",
              en: "Thiazides lose efficacy when GFR falls below 30 mL/min due to inadequate distal sodium delivery; therapy must transition to high-dose loop diuretics."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Hayati bir klinik rehber ilkesi! Tiyazidlerin etki yeri olan distal tübül filtrelenen sodyumun sadece %5'ini işler. GFH 30 mL/dak altına indiğinde nefrona ulaşan sodyum miktarı o kadar düşer ki tiyazid tamamen işe yaramaz hale gelir. Henle kulpunda %25 sodyum blokajı yapan güçlü kıvrım diüretikleri şarttır!",
              ar: "مبدأ سريري إرشادي جوهري! تعالج النبيبات البعيدة 5% فقط من الصوديوم المرتشح. وعند هبوط GFR دون 30 mL/min يقل الصوديوم الواصل إليها جداً فتفقد الثيازيدات أي فاعلية. ولا بد حينها من مدرات العروة القادرة على حصر 25% من الصوديوم!",
              en: "Critical clinical pharmacotherapy rule! The DCT handles only ~5% of filtered sodium. When GFR falls below 30 mL/min, distal load is negligible, rendering thiazides completely ineffective. High-capacity loop diuretics (blocking 25% at Henle) are mandatory!"
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Tiyazidler böbrek yetmezliğinde karaciğerde hemen parçalanır; doz 50 katına çıkarılmalıdır.",
              ar: "تتحلل الثيازيدات في الكبد فوراً عند مرضى الكلى؛ ويجب مضاعفة الجرعة 50 مرة.",
              en: "Thiazides undergo hyper-accelerated hepatic clearance in renal failure; dose should be multiplied 50-fold."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanılgı: Tiyazidler karaciğerde hızla parçalanmaz; tersine böbrek yetmezliğinde birikirler. Sorun klirens değil, distal nefrondaki fizyolojik yanıtsızlıktır.",
              ar: "مغالطة: لا يسرع الكبد استقلاب الثيازيد بل تتراكم في القصور الكلوي؛ والمشكلة عجز فيزيولوجي أنبوبي وليس سرعة استقلاب.",
              en: "Misconception: Thiazides do not undergo accelerated metabolism; in fact they accumulate. The failure is tubular hemodynamic unresponsiveness."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Hastaya acilen ozmotik diüretik olarak yüksek doz intravenöz saf su infüzyonu yapılmalıdır.",
              ar: "يجب حقن المريض فوراً بماء مقطر نقي وريدياً كمدر تناضحي لغسيل الكلى.",
              en: "The patient should immediately receive an IV infusion of pure distilled water as an osmotic diuretic."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Ölümcül Hata: Saf suyu damardan vermek masif hemolize (alyuvarların patlamasına) ve ölüme yol açar! Ozmotik diüretik mannitol gibi hipertonik ajanlardır.",
              ar: "خطأ قاتل: حقن الماء النقي وريدياً يفجر كريات الدم الحمراء (انحلال دم صاعق) ويقود للوفاة! المدر التناضحي هو مانيتول مفرط التوتر.",
              en: "Fatal Error: Infusing hypotonic pure water triggers catastrophic intravascular hemolysis and death! Osmotic diuretics are hypertonic agents like mannitol."
            }
          }
        ]
      },
      technicalTerms: [
        {
          "term": "diüretik direnci",
          "arContext": "مقاومة مدرات البول (diuretic resistance)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Böbrek süzme hızı (GFH) 30 mL/dak altına indiğinde distal kıvrımlı tübüle ulaşan sodyum ne kadardır?",
          ar: "عندما ينخفض معدل الترشيح GFR دون 30 mL/min، كم تبلغ كمية الصوديوم الواصلة للنبيبات البعيدة؟",
          en: "When GFR falls below 30 mL/min, how much sodium actually reaches the distal convoluted tubule?"
        },
        {
          tier: 2,
          tr: "Distal tübülde çalışan tiyazidler bu düşük süzme hızında tamamen etkisiz kalır.",
          ar: "تصبح مدرات الثيازيد العاملة في النبيبات البعيدة عديمة الفائدة كلياً عند هذا المعدل المنخفض.",
          en: "Thiazides acting at the DCT become completely ineffective at such low filtration rates."
        },
        {
          tier: 3,
          tr: "Henle kulpunda sodyumun %25'ini bloke edebilen güçlü kıvrım diüretiklerine (furosemid) geçilmelidir.",
          ar: "يجب الانتقال إلى مدرات العروة الجبارة (كالفوروسيميد) القادرة على حصر 25% من الصوديوم في عروة هنلي.",
          en: "Switch to high-ceiling loop diuretics (e.g. furosemide), capable of blocking 25% of sodium in Henle's loop."
        }
      ]
    },

    // Step 10: Retrieval (reflection)
    {
      id: "pharm-mod5-les2-step10",
      order: 10,
      stageIndex: 10,
      stage: "retrieval",
      type: "retrieval",
      title: {
        tr: "Kalıcı Hatırlama: Ototoksisite ve Jinekomasti",
        ar: "استرجاع معرفي: السمية السمعية وتثدي الرجال",
        en: "Spaced Retrieval: Ototoxicity & Endocrine Liabilities"
      },
      prompt: {
        tr: "Furosemidin yüksek dozda veya aminoglikozidlerle verildiğinde yaptığı ototoksisitenin (kulak çınlaması ve sağırlık) moleküler mekanizması nedir? İç kulak stria vaskülarisindeki NKCC1 inhibisyonunu ve spironolaktonun anti-androjenik jinekomasti riskini hatırlayın.",
        ar: "ما الآلية الجزيئية للسمية السمعية (طنين وصمم) عند إعطاء فوروسيميد بجرعات عالية مع أمينوغليكوزيدات؟ تذكر حصار NKCC1 في قوقعة الأذن، وخطر التثدي بمضادات الأندروجين مع سبيرونولاكتون.",
        en: "What molecular mechanism underlies furosemide-induced ototoxicity (tinnitus, hearing loss), especially with aminoglycosides? Recall NKCC1 inhibition in the inner ear stria vascularis, and spironolactone's anti-androgenic gynecomastia."
      },
      technicalTerms: [
        {
          "term": "ototoksisite",
          "arContext": "السمية السمعية (ototoxicity)"
        },
        {
          "term": "jinekomasti",
          "arContext": "تثدي الرجل (gynecomastia)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "İç kulaktaki endolenf sıvısını üreten stria vaskülaris hücrelerinde böbreğe benzer bir taşıyıcı var mıdır?",
          ar: "هل تحتوي خلايا القوقعة الأذنية المفرزة لسائل اللمف الداخلي على ناقل مشابه لناقل الكلى؟",
          en: "Do endolymph-secreting stria vascularis cells in the inner ear express a transporter homologous to renal NKCC2?"
        },
        {
          tier: 2,
          tr: "İç kulakta NKCC1 izoformu bulunur; furosemid yüksek dozda buradaki iyon dengesini bozarak tüy hücrelerini susturur.",
          ar: "يتواجد في الأذن النمط NKCC1؛ ويؤدي حصاره بجرعات فوروسيميد العالية لاضطراب كهربي يصم خلايا السمع.",
          en: "The inner ear expresses the NKCC1 isoform; high furosemide levels disrupt endolymph charge, blunting hair cell firing."
        },
        {
          tier: 3,
          tr: "Spironolakton ise progesteron ve androjen reseptörlerini de çapraz bloke ederek erkeklerde ağrılı jinekomasti yapar.",
          ar: "أما سبيرونولاكتون فيحصر مستقبلات الأندروجين والبروجستيرون تداخلياً مسبباً تثدياً مؤلماً عند الرجال.",
          en: "Spironolactone also cross-reacts with androgen and progesterone receptors, precipitating painful gynecomastia in males."
        }
      ]
    },

    // Step 11: Connection (explanation)
    {
      id: "pharm-mod5-les2-step11",
      order: 11,
      stageIndex: 11,
      stage: "connection",
      type: "connection",
      title: {
        tr: "İleri Bağlantı: Klorür Dengesi ve GABAerjik Nöronlar",
        ar: "ربط مفاهيمي: توازن الكلوريد وعصبونات GABA",
        en: "Conceptual Bridge: Chloride Gradients & GABAergic Neurons"
      },
      prompt: {
        tr: "Böbrek çıkan kulpunda klorürü taşıyan NKCC mekanizması, beyin nöronlarında hücre içi klorür konsantrasyonunu ve GABA-A reseptörünün hiperpolarizan inhibitör gücünü belirler. Santral sinir sistemi farmakolojisinde (Modül 6) bu klorür gradyanını inceleyeceğiz.",
        ar: "آلية NKCC التي تضخ الكلوريد في الكلى تحدد في عصبونات الدماغ تركيز الكلوريد الداخلي وقوة التثبيط الفرط-استقطابي لمستقبلات GABA-A. في علم أدوية الجهاز العصبي (الوحدة 6) سنستكشف هذا التوازن.",
        en: "The NKCC mechanism governing renal chloride flux also sets intracellular chloride in central neurons, dictating the hyperpolarizing inhibitory power of GABA-A channels. In Module 6 (CNS), we explore this chloride gradient."
      },
      technicalTerms: [
        {
          "term": "klorür dengesi",
          "arContext": "توازن شوارد الكلوريد (chloride equilibrium)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "Klorür (Cl-) sadece böbreğin tuz atılımında değil, beynin elektriksel sakinleşmesinde de başroldedir.",
          ar: "لا تقتصر شوارد الكلوريد على إطراح الملح الكلوي، بل تلعب الدور الأكبر في تهدئة كهرباء الدماغ.",
          en: "Chloride (Cl-) is not just a renal osmolyte; it is the master mediator of central neuronal inhibition."
        },
        {
          tier: 2,
          tr: "GABA-A reseptörü bir klorür kanalıdır; açıldığında Cl- hücre içine akarak nöronu hiperpolarize eder.",
          ar: "مستقبل GABA-A قناة كلوريد أيونية؛ يؤدي فتحها لتدفق Cl- للداخل وفرط استقطاب العصبون وإخماده.",
          en: "The GABA-A receptor is an ionotropic chloride channel; activation influxes Cl-, hyperpolarizing the neuron."
        },
        {
          tier: 3,
          tr: "Modül 6'da benzodiyazepinlerin bu klorür kanalını nasıl modüle ettiğini ve nörolojik etkilerini göreceğiz.",
          ar: "في الوحدة 6 سنكتشف كيف تعدل البنزوديازيبينات هذه القناة الكلوريدية وتخمد النوبات التشنجية.",
          en: "In Module 6, we explore how benzodiazepines modulate this neuronal chloride channel to treat anxiety and seizures."
        }
      ]
    },

    // Step 12: Mastery Check (multiple_choice)
    {
      id: "pharm-mod5-les2-step12",
      order: 12,
      stageIndex: 12,
      stage: "mastery_check",
      type: "mastery_check",
      title: {
        tr: "Kan Gazı ve İdrar Paneliyle Diüretik Teşhisi",
        ar: "تشخيص مدر البول عبر غازات الدم ولوحة البول",
        en: "Mastery Assessment: Acid-Base & Electrolyte Panel Diagnostics"
      },
      prompt: {
        tr: "Laboratuvarda pH 7.52, HCO3- 34 mEq/L (metabolik alkaloz), serum K+ 2.8 mEq/L ve belirgin hiperkalsiüri saptanıyor. Bu elektrolit profiline yol açan diüretik sınıfını teşhis edin.",
        ar: "أظهرت الفحوصات: pH 7.52، البيكربونات 34 mEq/L (قلاء استقلابي)، ونقص بوتاسيوم 2.8 mEq/L، مع بيلة كلسية صريحة. شخص فئة مدر البول المسببة.",
        en: "Diagnostic labs reveal arterial pH 7.52, serum HCO3- 34 mEq/L (metabolic alkalosis), hypokalemia (2.8 mEq/L), and marked hypercalciuria. Diagnose the causative diuretic class."
      },
      conceptCheck: {
        question: {
          tr: "Hipertansiyon ve kalp yetmezliği tedavisi gören bir hastanın laboratuvarında: Serum pH 7.52, HCO3- 34 mEq/L (metabolik alkaloz), Serum K+ 2.8 mEq/L (ağır hipokalemi) ve idrarda belirgin kalsiyum artışı (hiperkalsiüri) saptanıyor. Bu tablo hangi ilacın aşırı kullanımını kanıtlar?",
          ar: "مريض يتلقى علاجاً للضغط وقصور القلب أظهرت فحوصاته: pH الدم 7.52، البيكربونات 34 mEq/L (قلاء استقلابي)، بوتاسيوم الدم 2.8 mEq/L (نقص بوتاسيوم)، وارتفاع شديد في كالسيوم البول. أي دواء يفسر هذه اللوحة؟",
          en: "A cardiac patient's labs show: arterial pH 7.52, serum HCO3- 34 mEq/L (metabolic alkalosis), serum K+ 2.8 mEq/L (severe hypokalemia), and marked hypercalciuria (urinary calcium wasting). Which diuretic overdose produced this profile?"
        },
        options: [
          {
            id: "opt-1",
            text: {
              tr: "Furosemid (Kıvrım Diüretiği); NKCC2 blokajı lümen-pozitif potansiyeli silerek kalsiyum kaybettirir ve distal K+/H+ atılımını körükler.",
              ar: "Furosemide (مدر عروي)؛ لأن حصار NKCC2 يلغي الجهد الإيجابي طارحاً الكالسيوم ويحفز طرح K+ و H+ البعيد.",
              en: "Furosemide (Loop Diuretic); NKCC2 blockade wipes out the lumen-positive potential, wasting calcium and driving distal K+/H+ excretion."
            },
            isCorrect: true,
            misconceptionFeedback: {
              tr: "Mükemmel ustalık düzeyinde klinik sentez! Furosemid NKCC2'yi bloke edince: 1) Lümen-pozitif transepitelyal voltaj çöker ve kalsiyum idrara kaçar (hiperkalsiüri - Loops Lose Calcium); 2) Distale ulaşan dev sodyum yükü aldosteron aracılı K+ ve H+ atılımını azdırır (hipokalemik metabolik alkaloz).",
              ar: "توليف سريري متقن على مستوى الخبراء! بحصار NKCC2 بفوروسيميد: 1) ينهار الجهد الموجب فيطرح الكالسيوم بالبول (بيلة الكالسيوم - مدرات العروة تطرح الكالسيوم)؛ 2) حمولة الصوديوم البعيدة تفجر طرح K+ و H+ مؤدية لقلاء استقلابي بنقص البوتاسيوم.",
              en: "Flawless expert-level clinical synthesis! Furosemide NKCC2 blockade: 1) collapses the lumen-positive voltage, dumping calcium into urine ('Loops Lose Calcium' hypercalciuria); 2) surges distal sodium delivery, driving aldosterone-mediated K+ and H+ secretion into hypokalemic metabolic alkalosis."
            }
          },
          {
            id: "opt-2",
            text: {
              tr: "Hidroklorotiyazid (Tiyazid Diüretiği); çünkü kalsiyumu idrara atarak kandaki kalsiyum seviyesini sıfırlar.",
              ar: "Hydrochlorothiazide (مدر ثيازيدي)؛ لأنه يطرح الكالسيوم بالبول ويسقط مستواه في الدم إلى الصفر.",
              en: "Hydrochlorothiazide (Thiazide Diuretic); because it wastes calcium into urine, depleting blood levels to zero."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanılgı: Hidroklorotiyazid idrarda kalsiyum atılımını ARTIRMAZ, tersine kalsiyumu KANA GERİ EMER (hipokalsiüri yapar)! Tabloda belirgin hiperkalsiüri (idrarda kalsiyum artışı) vardır, bu tiyazidi kesinlikle eler.",
              ar: "مغالطة: لا يطرح الثيازيد الكالسيوم في البول بل يعيد امتصاصه للدم (يحدث نقص كلس البول)! والفحوصات تظهر فرط كلس البول الصريح مما يستبعد الثيازيد كلياً.",
              en: "Misconception: Thiazides DO NOT waste calcium into urine; they actively promote tubular reabsorption (causing hypocalciuria)! The marked hypercalciuria firmly rules out thiazides."
            }
          },
          {
            id: "opt-3",
            text: {
              tr: "Spironolakton (Potasyum Tutucu Diüretik); çünkü toplayıcı kanallarda potasyum atılımını hızlandırır.",
              ar: "Spironolactone (مدر حافظ للبوتاسيوم)؛ لأنه يسرع طرح البوتاسيوم في القنوات الجامعة.",
              en: "Spironolactone (Potassium-Sparing Diuretic); because it accelerates potassium excretion in collecting ducts."
            },
            isCorrect: false,
            misconceptionFeedback: {
              tr: "Yanılgı: Spironolakton potasyumu atmaz, kanda TUTAR (hiperkalemi ve asidoz yapar)! Hastamızda ise ağır hipokalemi (2.8 mEq/L) ve metabolik alkaloz vardır.",
              ar: "مغالطة: لا يطرح سبيرونولاكتون البوتاسيوم بل يحبسه في الدم (يحدث فرط بوتاسيوم وحماضاً استقلابياً)! والمريض يعاني نقصاً حاداً في البوتاسيوم (2.8) وقلاءً.",
              en: "Misconception: Spironolactone does not waste potassium; it retains potassium, triggering hyperkalemia and metabolic acidosis! The patient has severe hypokalemia and alkalosis."
            }
          }
        ]
      },
      technicalTerms: [
        {
          "term": "metabolik alkaloz",
          "arContext": "القلاء الاستقلابي (metabolic alkalosis)"
        }
      ],
      hints: [
        {
          tier: 1,
          tr: "İpucu 1: İdrarda belirgin kalsiyum kaybı (hiperkalsiüri) var. 'Loops Lose Calcium, Thiazides Take-in Calcium' kuralını anımsayın.",
          ar: "تلميح 1: الفحص يظهر فقداً واضحاً للكالسيوم بالبول. تذكر قاعدة: مدرات العروة تفقد الكالسيوم والثيازيد يحبسه.",
          en: "Tier 1 Hint: Note the hypercalciuria (urinary calcium loss). Remember: 'Loops Lose Calcium, Thiazides Take-in Calcium'."
        },
        {
          tier: 2,
          tr: "İpucu 2: Tiyazid idrarda kalsiyumu azaltır (hipokalsiüri); spironolakton ise potasyumu artırır (hiperkalemi). İkisi de bu tabloyla uyuşmaz.",
          ar: "تلميح 2: الثيازيد يخفض كالسيوم البول وسبيرونولاكتون يرفع بوتاسيوم الدم، وكلاهما يتعارض تماماً مع هذه اللوحة.",
          en: "Tier 2 Hint: Thiazides decrease urinary calcium (hypocalciuria), and spironolactone increases potassium (hyperkalemia)."
        },
        {
          tier: 3,
          tr: "İpucu 3: Hem kalsiyumu idrara döken hem de hipokalemik metabolik alkaloz yapan tek ajan kıvrım diüretiğidir (furosemid).",
          ar: "تلميح 3: المدر الوحيد الذي يطرح الكالسيوم ويحدث في الوقت نفسه قلاءً استقلابياً بنقص البوتاسيوم هو مدر العروة (فوروسيميد).",
          en: "Tier 3 Hint: The only diuretic class that wastes calcium while inducing hypokalemic metabolic alkalosis is a loop diuretic (furosemide)."
        }
      ]
    }
  ]
};

const targetPath = path.resolve(__dirname, '../courses/pharmacology/lessons/lesson-10.json');
fs.writeFileSync(targetPath, JSON.stringify(lesson10, null, 2), 'utf8');
console.log('Successfully written lesson-10.json to:', targetPath);
