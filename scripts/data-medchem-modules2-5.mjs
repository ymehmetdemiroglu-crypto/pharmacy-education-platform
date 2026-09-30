/**
 * scripts/data-medchem-modules2-5.mjs
 * 
 * Lessons 3 through 10 of Course A: Farmasötik Kimya.
 * Modules 2, 3, 4, 5 (2 lessons each = 8 lessons total).
 */

import { makeStep } from './build-22-lessons.mjs';

export const medchemModules2to5 = [
  // =========================================================================
  // MODULE 2: Fonksiyonel Gruplar ve Moleküller Arası Bağlar
  // =========================================================================

  // Lesson 3: mc-mod2-les1
  {
    id: 'mc-mod2-les1',
    courseId: 'medchem',
    moduleId: 'mc-mod-02',
    title: {
      tr: 'Fonksiyonel Gruplar ve Moleküller Arası Bağlar',
      ar: 'المجموعات الوظيفية والروابط بين الجزيئات'
    },
    order: 1,
    access: 'free',
    objective: {
      tr: 'İlaç-reseptör kompleksini bir arada tutan kovalent olmayan bağların enerjilerini ve SAR katkılarını analiz etmek.',
      ar: 'تحليل طاقات الروابط غير التساهمية ومساهمات SAR التي تحافظ على تماسك معقد الدواء والمستقبِل.'
    },
    misconceptions: [
      {
        tr: 'Kovalent olmayan bağların ilacın reseptöre sıkıca tutunması için çok zayıf olduğu yanılgısı.',
        ar: 'الاعتقاد الخاطئ بأن الروابط غير التساهمية أضعف من أن تثبت الدواء على المستقبِل بقوة.'
      },
      {
        tr: 'Hidrofobik etkileşimlerin bir çekme kuvvetinden kaynaklandığı düşüncesi.',
        ar: 'الظن الخاطئ بأن التأثير الكاره للماء ينشأ من قوة تجاذب ذاتية بين السلاسل الكربونية.'
      }
    ],
    sources: [{ file: 'Fonksiyonel gruplar.pdf', page: 12 }],
    citations: [
      {
        id: 'CIT-MC03-01',
        book: "Foye's Principles of Medicinal Chemistry",
        edition: '8th ed.',
        topic: 'Intermolecular Forces & Drug-Receptor Interactions',
        chapter: 'unverified',
        page: 'unverified',
        status: 'pending-human-review'
      }
    ],
    spacedReviewCards: [
      {
        cardId: 'mc-mod2-les1-card1',
        courseId: 'medchem',
        drugOrConcept: 'İyonik Bağ Enerjisi',
        prompt: 'İlaç-reseptör etkileşiminde iyonik bağın ortalama serbest enerji katkısı nedir?',
        answer: 'Yaklaşık -5 ila -10 kcal/mol arasında en güçlü kovalent olmayan bağ enerjisidir.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'mc-mod2-les1-card2',
        courseId: 'medchem',
        drugOrConcept: 'Hidrojen Bağı Enerjisi',
        prompt: 'Klasik bir hidrojen bağının serbest enerjiye katkısı ne kadardır?',
        answer: 'Yaklaşık -2 ila -5 kcal/mol düzeyindedir.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'mc-mod2-les1-card3',
        courseId: 'medchem',
        drugOrConcept: 'Hidrofobik Etkinin Termodinamik Temeli',
        prompt: 'Hidrofobik grupların bir araya gelmesi hangi termodinamik parametreyle sürüklenir?',
        answer: 'Su moleküllerinin serbest kalması sonucu artan entropi (+Delta S) ile sürüklenir.',
        box: 1,
        intervalDays: 1
      }
    ],
    translations: {
      tr: { title: 'Fonksiyonel Gruplar ve Moleküller Arası Bağlar' },
      ar: { title: 'المجموعات الوظيفية والروابط بين الجزيئات' }
    },
    steps: [
      makeStep('mc-mod2-les1-step-01', 'hook', 1,
        { tr: 'Neden Kovalent Bağ Değil?', ar: 'لماذا ليست روابط تساهمية؟' },
        { tr: 'Çoğu ilaç neden hedefine kopmayan kovalent bağlarla değil de zayıf kovalent olmayan bağlarla bağlanmayı tercih eder?', ar: 'لماذا تفضل معظم الأدوية الارتباط بأهدافها عبر روابط ضعيفة غير تساهمية بدلاً من الروابط التساهمية الدائمة؟' },
        false,
        { technicalTerms: [{ term: 'non-kovalent bağ', arContext: 'الرابطة غير التساهمية' }] }
      ),
      makeStep('mc-mod2-les1-step-02', 'question', 2,
        { tr: 'Tahmin: Bağların Toplamsal Gücü', ar: 'توقع: القوة التراكمية للروابط' },
        { tr: 'Tek bir iyonik bağ, iki hidrojen bağı ve üç van der Waals teması bir araya geldiğinde ne olur?', ar: 'عندما تجتمع رابطة أيونية واحدة مع رابطتين هيدروجينيتين وثلاث نقاط تلامس van der Waals، ماذا يحدث؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc21-1', text: { tr: 'Zayıf kalır ve ligand hemen ayrışır.', ar: 'يبقى الارتباط ضعيفاً وينفصل الربيط فوراً.' }, isCorrect: false },
              { id: 'opt-mc21-2', text: { tr: 'Enerjiler toplanarak nanomolar afiniteli son derece kararlı bir kompleks oluşturur.', ar: 'تتراكم الطاقات لتشكل معقداً شديد الاستقرار بألفة في نطاق النانومولار.' }, isCorrect: true }
            ]
          },
          config: { revealedOutcome: 'Bireysel zayıf bağlar toplanarak devasa bir afinite ve seçicilik üretir.' }
        }
      ),
      makeStep('mc-mod2-les1-step-03', 'intuition', 3,
        { tr: 'Sezgisel Model: Cırt Cırt (Velcro) Prensibi', ar: 'نموذج حدسي: مبدأ أشرطة الفيلكرو' },
        { tr: 'Tek bir plastik kanca hiçbir şeyi tutamaz; ancak binlerce minik kanca birleştiğinde güçlü bir yükü taşır.', ar: 'خيط بلاستيكي واحد من الفيلكرو لا يمسك شيئاً، لكن تكاتف مئات الخيوط الصغيرة معاً يولد قوة إمساك هائلة.' },
        false,
        { technicalTerms: [{ term: 'kooperatif bağlanma', arContext: 'الارتباط التعاوني' }] }
      ),
      makeStep('mc-mod2-les1-step-04', 'visual_explanation', 4,
        { tr: 'Etkileşim Ağları ve Bağ Mesafeleri', ar: 'شبكات التفاعل والمسافات البينية' },
        { tr: 'İyonik bağlar 2.5-4.0 Å, hidrojen bağları 2.7-3.2 Å mesafede etkilidir. Mesafe 1 Å uzadığında kuvvet hızla çöker.', ar: 'تعمل الروابط الأيونية عند مسافة 2.5-4.0 Å والهيدروجينية عند 2.7-3.2 Å. أي تباعد بمقدار 1 Å يضعف القوة سريعاً.' },
        false,
        { technicalTerms: [{ term: 'bağ mesafesi', arContext: 'مسافة الرابطة' }] }
      ),
      makeStep('mc-mod2-les1-step-05', 'interactive_artifact', 5,
        { tr: 'İnteraktif Laboratuvar: SAR Explorer', ar: 'المختبر التفاعلي: مستكشف SAR' },
        { tr: 'İlaç iskeletine sırasıyla amino, hidroksil ve fenil grupları ekleyerek toplam serbest bağlanma enerjisindeki (Delta G) artışı ölçün.', ar: 'أضف مجموعات الأمين والهيدروكسيل والفينيل إلى الهيكل الدوائي لقياس الزيادة في طاقة الارتباط الحرة (Delta G).' },
        false,
        {
          widget: {
            type: 'SarExplorer',
            config: { baseMolecule: 'phenylethylamine', targetPocket: 'adrenergic_beta1' }
          }
        }
      ),
      makeStep('mc-mod2-les1-step-06', 'guided_discovery', 6,
        { tr: 'Rehberli Keşif: Hidroksil Grubunun Katkısı', ar: 'استكشاف موجه: مساهمة مجموعة الهيدروكسيل' },
        { tr: 'Benzen halkasına fenolik bir -OH grubu eklendiğinde bağlanma enerjisi yaklaşık ne kadar artar?', ar: 'عند إضافة مجموعة -OH فينولية إلى حلقة البنزين، كم تزداد طاقة الارتباط الحرة تقريباً؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc21-3', text: { tr: '-3.0 ila -4.5 kcal/mol (hidrojen bağı katkısı).', ar: 'حوالي -3.0 إلى -4.5 kcal/mol (مساهمة الرابطة الهيدروجينية).' }, isCorrect: true },
              { id: 'opt-mc21-4', text: { tr: '-50 kcal/mol (kovalent bağ gücü).', ar: 'حوالي -50 kcal/mol (قوة الرابطة التساهمية).' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Fenolik -OH eklenmesi ilacın afinitesini yaklaşık 100 kat artırır.' }
        }
      ),
      makeStep('mc-mod2-les1-step-07', 'formal_explanation', 7,
        { tr: 'Formal Termodinamik: Gibbs Serbest Enerjisi', ar: 'الديناميكا الحرارية الرسمية: طاقة Gibbs الحرة' },
        { tr: 'Delta G = Delta H - T * Delta S denklemi bağlanmayı yönetir. Delta G negatifleştikçe ayrışma sabiti (Kd) küçülür ve afinite katlanır.', ar: 'تحكم معادلة Delta G = Delta H - T * Delta S الارتباط. كلما ازدادت سلبية Delta G تناقص ثابت التفكك (Kd) وتضاعفت الألفة.' },
        false,
        { technicalTerms: [{ term: 'Gibbs serbest enerjisi', arContext: 'طاقة غيبس الحرة' }, { term: 'Kd', arContext: 'ثابت التفكك' }] }
      ),
      makeStep('mc-mod2-les1-step-08', 'concept_check', 8,
        { tr: 'Kavram Denetimi: Hidrofobik Etkinin İtici Gücü', ar: 'فحص المفهوم: القوة الدافعة للتأثير الكاره للماء' },
        { tr: 'İki apolar alifatik zincir reseptör cebinde bir araya geldiğinde Gibbs enerjisindeki düşüşün temel kaynağı nedir?', ar: 'عندما تتجمع سلسلتان أليفاتيتان في جيب (reseptör)، ما المصدر الأساسي لانخفاض طاقة غيبس الحرة؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc21-5', text: { tr: 'Apolar gruplar etrafındaki düzenli su kafeslerinin dağılmasıyla artan entropi (+Delta S).', ar: 'تفكك أقفاص الماء المنظمة حول السلاسل مما يرفع الإنتروبيا (+Delta S).' }, isCorrect: true },
              { id: 'opt-mc21-6', text: { tr: 'Apolar gruplar arasındaki güçlü nükleer çekim.', ar: 'التجاذب النووي القوي بين المجموعات غير القطبية.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Hidrofobik etki entalpik değil, esasen entropik bir kazançtır.' }
        }
      ),
      makeStep('mc-mod2-les1-step-09', 'application', 9,
        { tr: 'Rasyonel İlaç Tasarımı: İmatinib Örneği', ar: 'تصميم الدواء الرشيد: نموذج Imatinib' },
        { tr: 'Lösemi ilacı imatinib, kinaz hedefinde bir cepte ilave hidrojen bağı ve van der Waals etkileşimleri kurarak seçiciliğini nasıl kazanmıştır?', ar: 'كيف اكتسب دواء Imatinib انتقائيته العالية لكيناز اللوكيميا عبر روابط هيدروجينية وتماسات van der Waals إضافية؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc21-7', text: { tr: 'Aktif olmayan konformasyondaki spesifik amino asitlerle çoklu temas kurarak.', ar: 'عبر تشكيل تماسات متعددة مع أحماض أمينية محددة في التشكيل غير النشط.' }, isCorrect: true },
              { id: 'opt-mc21-8', text: { tr: 'Hedefi tamamen kovalent bağla yakarak.', ar: 'بحرق الهدف نهائياً برابطة تساهمية لا عكوسة.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'İmatinib in yüksek seçiciliği spesifik non-kovalent ağların kusursuz geometrisine dayanır.' }
        }
      ),
      makeStep('mc-mod2-les1-step-10', 'retrieval', 10,
        { tr: 'Geri Çağırma: İyonlaşmış Karboksilat', ar: 'استرجاع معرفي: مجموعة الكربوكسيل المتأينة' },
        { tr: 'Modül 1 de gördüğümüz gibi aspirin fizyolojik pH 7.4 te hangi yüklü grubu oluşturarak iyonik bağa hazır hale gelir?', ar: 'كما رأينا في الوحدة 1، ما هي المجموعة المشحونة التي يشكلها aspirin عند pH 7.4 الفسيولوجي لتكون جاهزة للرابطة الأيونية؟' },
        false,
        { technicalTerms: [{ term: 'karboksilat anyonu', arContext: 'أنيون الكربوكسيل' }] }
      ),
      makeStep('mc-mod2-les1-step-11', 'connection', 11,
        { tr: 'İleri Bağlantı: Kiral Geometri ve 3 Nokta Modeli', ar: 'ربط مفاهيمي: الهندسة الكيرالية ونموذج النقاط الثلاث' },
        { tr: 'Bu fonksiyonel grupların uzaydaki 3 boyutlu dizilimi kiraliteyle belirlenir. Sıradaki derste Easson-Stedman 3-noktalı bağlanma kuralını keşfedeceğiz.', ar: 'يتحدد التموضع الفراغي ثلاثي الأبعاد لهذه المجموعات بالكيرالية. في الدرس القادم سنكتشف نموذج Easson-Stedman ثلاثي النقاط.' },
        false,
        { technicalTerms: [{ term: 'kiralite', arContext: 'الكيرالية' }] }
      ),
      makeStep('mc-mod2-les1-step-12', 'mastery_check', 12,
        { tr: 'Ustalık Sınavı: Non-Kovalent Ağların Gücü', ar: 'اختبار الإتقان: قوة الشبكات غير التساهمية' },
        { tr: 'İlaç-reseptör bağlanmasında en yüksek enerjili ve en uzun menzilli non-kovalent etkileşim türü hangisidir?', ar: 'ما هو نمط التفاعل غير التساهمي الأعلى طاقة والأطول مدى في ارتباط الدواء مع (reseptör)؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc21-9', text: { tr: 'İyonik (elektrostatik) bağ.', ar: 'الرابطة الأيونية (الكهروستاتيكية).' }, isCorrect: true },
              { id: 'opt-mc21-10', text: { tr: 'Dipol-dipol bağı.', ar: 'رابطة ثنائي القطب.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Tebrikler! Moleküller arası bağları başarıyla tamamladınız. +50 XP.' }
        }
      )
    ]
  },

  // Lesson 4: mc-mod2-les2
  {
    id: 'mc-mod2-les2',
    courseId: 'medchem',
    moduleId: 'mc-mod-02',
    title: {
      tr: 'Optik Kiralite ve Easson-Stedman 3-Noktalı Bağlanma',
      ar: 'الكيرالية الضوئية ونموذج Easson-Stedman ثلاثي النقاط'
    },
    order: 2,
    access: 'free',
    objective: {
      tr: 'Easson-Stedman 3-noktalı bağlanma modelini kullanarak enantiyomerlerin reseptör afinitelerindeki dramatik farkları açıklamak.',
      ar: 'تفسير الفروق الشاسعة في ألفة المصاوغات المرآوية نحو (reseptör) باستخدام نموذج Easson-Stedman ثلاثي النقاط.'
    },
    misconceptions: [
      {
        tr: 'İki enantiyomerin biyolojik hedeflerde aynı güce sahip olduğu yanılgısı.',
        ar: 'الظن الخاطئ بأن المصاوغين المرآويين يمتلكان نفس التأثير في الأهداف البيولوجية.'
      }
    ],
    sources: [{ file: 'İlaçlarda  İzomeri.pdf', page: 8 }],
    citations: [
      {
        id: 'CIT-MC04-01',
        book: "Foye's Principles of Medicinal Chemistry",
        edition: '8th ed.',
        topic: 'Stereochemistry and Easson-Stedman Model',
        chapter: 'unverified',
        page: 'unverified',
        status: 'pending-human-review'
      }
    ],
    spacedReviewCards: [
      {
        cardId: 'mc-mod2-les2-card1',
        courseId: 'medchem',
        drugOrConcept: 'Easson-Stedman Hipotezi',
        prompt: 'Easson-Stedman modeline göre güçlü biyolojik etki için ligand reseptöre en az kaç noktadan temas etmelidir?',
        answer: 'En az 3 spesifik farmakoforik noktadan asimetrik temas kurmalıdır.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'mc-mod2-les2-card2',
        courseId: 'medchem',
        drugOrConcept: 'Epinefrin Enantiyomerleri',
        prompt: '(R)-(-)-epinefrin neden (S)-(+)-epinefrinden yüzlerce kat daha aktiftir?',
        answer: '(R) izomerinin beta-hidroksil grubu reseptöre bağlanırken, (S) izomerinde bu grup boşluğa bakar.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'mc-mod2-les2-card3',
        courseId: 'medchem',
        drugOrConcept: 'Ötomer ve Distomer Tanımı',
        prompt: 'Bir kiral ilaç çiftinde yüksek afiniteli ve düşük afiniteli izomerler nasıl adlandırılır?',
        answer: 'Yüksek afiniteli aktif izomer Ötomer (Eutomer), düşük afiniteli izomer Distomer dir.',
        box: 1,
        intervalDays: 1
      }
    ],
    translations: {
      tr: { title: 'Optik Kiralite ve Easson-Stedman 3-Noktalı Bağlanma' },
      ar: { title: 'الكيرالية الضوئية ونموذج Easson-Stedman ثلاثي النقاط' }
    },
    steps: [
      makeStep('mc-mod2-les2-step-01', 'hook', 1,
        { tr: 'Sağ El ve Sol El Eldiveni', ar: 'قفاز اليد اليمنى واليسرى' },
        { tr: 'Sağ eliniz sol eldivene neden sığmaz? Moleküler düzeyde kiral reseptörler de yalnızca doğru el anatomisindeki enantiyomeri kabul eder.', ar: 'لماذا لا تناسب اليد اليمنى قفاز اليد اليسرى؟ جزيئياً، تقبل مستقبلات الجسم (reseptör) فقط المصاوغ ذو الهندسة الفراغية المطابقة.' },
        false,
        { technicalTerms: [{ term: 'kiralite', arContext: 'الكيرالية' }] }
      ),
      makeStep('mc-mod2-les2-step-02', 'question', 2,
        { tr: 'Tahmin: Üç Noktalı Uyum', ar: 'توقع: التطابق ثلاثي النقاط' },
        { tr: 'Epinefrinin kiral karbonundaki -OH grubu ters yöne döndüğünde reseptör afinitesi nasıl değişir?', ar: 'عندما تدور مجموعة -OH في كربون epinefrin الكيرالي للجهة المعاكسة، كيف تتأثر ألفة الارتباط بالمستقبل؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc22-1', text: { tr: 'Değişmez, aynı kimyasal formüle sahiptir.', ar: 'لا تتغير، فالصيغة الكيميائية متطابقة.' }, isCorrect: false },
              { id: 'opt-mc22-2', text: { tr: 'Afinite 100 kattan fazla düşer çünkü 3. bağlanma noktası kaybedilir.', ar: 'تنخفض الألفة بأكثر من 100 ضعف لفقدان نقطة الارتباط الثالثة.' }, isCorrect: true }
            ]
          },
          config: { revealedOutcome: '(R)-(-)-epinefrin (S)-(+) izomerinden tam 300 kat daha güçlüdür.' }
        }
      ),
      makeStep('mc-mod2-les2-step-03', 'intuition', 3,
        { tr: 'Sezgisel Analoji: Üç Delikli Priz', ar: 'تشبيه حدسي: قابس الكهرباء ثلاثي المآخذ' },
        { tr: 'Topraklı 3 lü prizi ancak doğru yönde takabilirsiniz; ters çevirirseniz pimler yuvalarla eşleşmez.', ar: 'لا يمكن إدخال القابس ثلاثي الشعب إلا بالاتجاه الصحيح؛ قلبه بزاوية معاكسة يجعل الشعب تصطدم بالفراغ.' },
        false,
        { technicalTerms: [{ term: 'üç noktalı bağlanma', arContext: 'الارتباط ثلاثي النقاط' }] }
      ),
      makeStep('mc-mod2-les2-step-04', 'visual_explanation', 4,
        { tr: 'Easson-Stedman Mekanizma Diyagramı', ar: 'مخطط آلية Easson-Stedman' },
        { tr: 'Reseptör cebinde 3 bölge vardır: Anyonik bölge, aromatik cep ve hidrojen bağı donörü. (R) enantiyomeri her 3 bölgeye aynı anda oturur.', ar: 'في جيب المستقبِل 3 مناطق: منطقة أنيونية، جيب عطري، ومانح هيدروجيني. يطابق النمط (R) المناطق الثلاث في آن واحد.' },
        false,
        { technicalTerms: [{ term: 'farmakofor', arContext: 'الفارماكوفور' }] }
      ),
      makeStep('mc-mod2-les2-step-05', 'interactive_artifact', 5,
        { tr: 'İnteraktif Simülatör: Receptor-Ligand Matcher', ar: 'محاكي تفاعلي: مطابق الربيط والمستقبل' },
        { tr: 'Epinefrinin (R) ve (S) izomerlerini reseptör cebine sürükleyin. 3 temas noktasının yeşil yandığını ve bağlanma serbest enerjisini gözlemleyin.', ar: 'اسحب المصاوغين (R) و (S) إلى جيب المستقبِل ولاحظ إضاءة نقاط التماس الثلاث الخضراء وطاقة الارتباط الناتجة.' },
        false,
        {
          widget: {
            type: 'ReceptorLigandMatcher',
            config: { targetPocket: 'beta_adrenergic', ligandPairs: ['R_epinephrine', 'S_epinephrine'] }
          }
        }
      ),
      makeStep('mc-mod2-les2-step-06', 'guided_discovery', 6,
        { tr: 'Rehberli Keşif: Distomerin Boşluğa Bakışı', ar: 'استكشاف موجه: توجه المصاوغ الخامل للفراغ' },
        { tr: 'Simülatörde (S) izomerini yerleştirdiğinizde -OH grubunun nereye baktığını gözlemleyin. Hangi bağ koptu?', ar: 'عند وضع المصاوغ (S) في المحاكي، إلى أين تتجه مجموعة -OH وما هي الرابطة التي انقطعت؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc22-3', text: { tr: '-OH grubu reseptör cebinden dışarı, boşluğa yönelir; kritik hidrojen bağı kurulamaz.', ar: 'تتجه -OH خارج الجيب نحو الفراغ؛ فتفشل في تشكيل الرابطة الهيدروجينية الحاسمة.' }, isCorrect: true },
              { id: 'opt-mc22-4', text: { tr: 'İyonik bağ kopar.', ar: 'تنقطع الرابطة الأيونية.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Distomerde hidrojen bağı donörü boşluğa baktığı için enerji katkısı sıfırlanır.' }
        }
      ),
      makeStep('mc-mod2-les2-step-07', 'formal_explanation', 7,
        { tr: 'Easson-Stedman Modeli ve Termodinamik Kanıt', ar: 'نموذج Easson-Stedman والبرهان الديناميكي' },
        { tr: 'Delta G(ötomer) - Delta G(distomer) = Delta G(üçüncü bağ) farkını verir. Bu enerji farkı genellikle 3-4 kcal/mol olup afiniteyi 300 kat değiştirir.', ar: 'فارق الطاقة بين المصاوغ النشط (ötomer) والخامل يساوي طاقة الرابطة الثالثة (3-4 kcal/mol) مسبباً فجوة ألفة تفوق 300 ضعف.' },
        false,
        { technicalTerms: [{ term: 'ötomer', arContext: 'المصاوغ الفعال (Eutomer)' }, { term: 'distomer', arContext: 'المصاوغ الخامل (Distomer)' }] }
      ),
      makeStep('mc-mod2-les2-step-08', 'concept_check', 8,
        { tr: 'Kavram Denetimi: Ödismik Oran', ar: 'فحص المفهوم: النسبة الإيوديزمية' },
        { tr: 'Ötomerin afinitesinin distomerin afinitesine oranına ne ad verilir?', ar: 'ماذا يسمى حاصل قسمة ألفة المصاوغ الفعال (ötomer) على ألفة المصاوغ الخامل (distomer)؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc22-5', text: { tr: 'Ödismik Oran (Eudismic Ratio).', ar: 'النسبة الإيوديزمية (Eudismic Ratio).' }, isCorrect: true },
              { id: 'opt-mc22-6', text: { tr: 'Partisyon katsayısı.', ar: 'معامل التوزع.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Ödismik oran kiral ilacın stereoseçicilik derecesini gösterir.' }
        }
      ),
      makeStep('mc-mod2-les2-step-09', 'application', 9,
        { tr: 'Klinik Karar: Rasemat mı Saf Enantiyomer mi?', ar: 'قرار سريري: الخليط الراسيمي أم المصاوغ النقي؟' },
        { tr: 'Talidomid faciasında (R) izomeri sedatif iken (S) izomeri teratojendir. Ancak in vivo epimerizasyon nedeniyle saf (R) verilse bile ne olur?', ar: 'في كارثة الثاليدوميد، المصاوغ (R) مهدئ و (S) مشوه للأجنة. لكن بسبب الانقلاب الحيوي in vivo، ماذا يحدث حتى لو أعطي (R) نقياً؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc22-7', text: { tr: 'Vücutta hızla rasemize olarak (S) izomerine dönüşür ve toksisite devam eder.', ar: 'يتحول حيوياً في الجسم إلى راسيمي وينتج المصاوغ (S) المشوه مجدداً.' }, isCorrect: true },
              { id: 'opt-mc22-8', text: { tr: 'Asla değişmez.', ar: 'لا يتغير أبداً في الدوران الدموي.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Kiral anahtarlama kararı molekülün in vivo kiral stabilitesine bağlıdır.' }
        }
      ),
      makeStep('mc-mod2-les2-step-10', 'retrieval', 10,
        { tr: 'Geri Çağırma: Hidrojen Bağı Gücü', ar: 'استرجاع معرفي: طاقة الرابطة الهيدروجينية' },
        { tr: 'Önceki derste öğrendiğimiz gibi tek bir hidrojen bağının kopması bağlanma afinitesini kabaca kaç kat düşürür?', ar: 'كما تعلمنا في الدرس السابق، كم ضعفاً تنخفض ألفة الارتباط تقريباً عند فقدان رابطة هيدروجينية واحدة؟' },
        false,
        { technicalTerms: [{ term: 'hidrojen bağı', arContext: 'الرابطة الهيدروجينية' }] }
      ),
      makeStep('mc-mod2-les2-step-11', 'connection', 11,
        { tr: 'İleri Bağlantı: Biyoizosterizm ve Akılcı Tasarım (Modül 3)', ar: 'ربط مفاهيمي: التشابه الحيوي والتصميم الرشيد (الوحدة 3)' },
        { tr: 'Reseptörle bu etkileşimleri kuran gruplar benzer elektronik gruplarla değiştirilebilir. Modül 3 te Grimm hidrit yer değiştirme kuralını öğreneceğiz.', ar: 'يمكن استبدال المجموعات المرتبطة بمجموعات متشابهة إلكترونياً. في الوحدة 3، سنتعلم قاعدة إزاحة هيدريد Grimm.' },
        false,
        { technicalTerms: [{ term: 'biyoizosterizm', arContext: 'التشابه الحيوي' }] }
      ),
      makeStep('mc-mod2-les2-step-12', 'mastery_check', 12,
        { tr: 'Ustalık Sınavı: Easson-Stedman Kuralı', ar: 'اختبار الإتقان: قاعدة Easson-Stedman' },
        { tr: 'Easson-Stedman modeline göre kiral bir ligandın reseptöre yüksek afiniteyle bağlanması için gereken asgari temas noktası sayısı kaçtır?', ar: 'وفق نموذج Easson-Stedman، ما هو الحد الأدنى لعدد نقاط التماس الفراغية اللازمة للألفة العالية نحو (reseptör)؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc22-9', text: { tr: 'En az 3 spesifik nokta.', ar: '3 نقاط نوعية على الأقل.' }, isCorrect: true },
              { id: 'opt-mc22-10', text: { tr: '1 nokta yeterlidir.', ar: 'نقطة واحدة كافية.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Modül 2 tamamlandı! 3 review cards eklendi. +50 XP.' }
        }
      )
    ]
  },

  // =========================================================================
  // MODULE 3: Biyoizosterizm ve Rasyonel Moleküler Tasarım
  // =========================================================================

  // Lesson 5 / Mod 3 Les 1: mc-mod3-les1
  {
    id: 'mc-mod3-les1',
    courseId: 'medchem',
    moduleId: 'mc-mod-03',
    title: {
      tr: 'Klasik Biyoizosterizm ve Grimm Hidrit Yer Değiştirme',
      ar: 'التشابه الحيوي الكلاسيكي وإزاحة هيدريد Grimm'
    },
    order: 1,
    access: 'free',
    objective: {
      tr: 'Grimm hidrit yer değiştirme kuralı ve klasik izosterizm prensipleriyle öncü bileşikleri optimize etmek.',
      ar: 'تحسين المركبات الطليعية باستخدام قاعدة إزاحة هيدريد Grimm ومبادئ التشابه الحيوي الكلاسيكي.'
    },
    misconceptions: [
      {
        tr: 'Yalnızca aynı element atomlarının birbirinin yerine geçebileceği düşüncesi.',
        ar: 'الظن الخاطئ بأن ذرات نفس العنصر فقط هي التي يمكن أن تحل محل بعضها.'
      }
    ],
    sources: [{ file: 'Biyoizosterizm.pdf', page: 4 }],
    citations: [
      {
        id: 'CIT-MC05-01',
        book: "Foye's Principles of Medicinal Chemistry",
        edition: '8th ed.',
        topic: 'Classical Bioisosterism & Grimm Hydride Displacement',
        chapter: 'unverified',
        page: 'unverified',
        status: 'pending-human-review'
      }
    ],
    spacedReviewCards: [
      {
        cardId: 'mc-mod3-les1-card1',
        courseId: 'medchem',
        drugOrConcept: 'Grimm Hidrit Yer Değiştirme Yasası',
        prompt: 'Grimm hidrit kuralına göre bir atoma bir hidrojen eklendiğinde hangi grubun elektronik özelliklerini kazanır?',
        answer: 'Periyodik tabloda bir sağındaki grubun değerlik elektronu kabuk özelliklerini kazanır.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'mc-mod3-les1-card2',
        courseId: 'medchem',
        drugOrConcept: 'Monovalan İzosterler',
        prompt: '-CH3, -NH2, -OH, -F ve -Cl grupları neden klasik monovalan izosterlerdir?',
        answer: 'Hepsi dış kabuklarında aynı sayıda (7 adet) değerlik elektronu taşırlar ve tek bağ yaparlar.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'mc-mod3-les1-card3',
        courseId: 'medchem',
        drugOrConcept: 'Biyoizosterik Değişimin Amacı',
        prompt: 'Bir öncü bileşikte izosterik değişim yapmanın temel rasyonel gerekçesi nedir?',
        answer: 'Biyolojik hedef ilgisini korurken metabolik stabiliteyi ve biyoyararlanımı artırmak.',
        box: 1,
        intervalDays: 1
      }
    ],
    translations: {
      tr: { title: 'Klasik Biyoizosterizm ve Grimm Hidrit Yer Değiştirme' },
      ar: { title: 'التشابه الحيوي الكلاسيكي وإزاحة هيدريد Grimm' }
    },
    steps: [
      makeStep('mc-mod3-les1-step-01', 'hook', 1,
        { tr: 'Flor ile Hidrojenin Gizemli Değişimi', ar: 'التبادل الغامض بين الفلور والهيدروجين' },
        { tr: 'Urasil molekülüne tek bir flor atomu eklendiğinde neden öldürücü bir antikanser ilacı olan 5-Fluorourasil e dönüşür?', ar: 'عند إضافة ذرة فلور واحدة إلى Uracil، لماذا يتحول فجأة إلى دواء قاتل للسرطان هو 5-Fluorouracil؟' },
        false,
        { technicalTerms: [{ term: 'biyoizoster', arContext: 'المتشابه الحيوي' }] }
      ),
      makeStep('mc-mod3-les1-step-02', 'question', 2,
        { tr: 'Tahmin: Grimm Kuralı ile Eşdeğerlik', ar: 'توقع: التكافؤ عبر قاعدة Grimm' },
        { tr: 'Grimm hidrit yer değiştirme kuralına göre -CH3 grubu hangi tek değerlikli heteroatomla elektronik izosterdir?', ar: 'وفق قاعدة إزاحة هيدريد Grimm، مع أي ذرة غير متجانسة أحادية التكافؤ يتشابه -CH3 إلكترونياً؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc31-1', text: { tr: '-OH, -NH2 ve -F (hepsi 7 değerlik elektronu eşdeğeridir).', ar: '-OH و -NH2 و -F (جميعها متكافئة بـ 7 إلكترونات تكافؤ).' }, isCorrect: true },
              { id: 'opt-mc31-2', text: { tr: 'Yalnızca -Br ile.', ar: 'فقط مع -Br.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'C+H3 = N+H2 = O+H = F: Hepsi 7 değerlik elektronuyla aynı valans kabuğunu paylaşır.' }
        }
      ),
      makeStep('mc-mod3-les1-step-03', 'intuition', 3,
        { tr: 'Sezgisel Analoji: Truva Atı Prensibi', ar: 'تشبيه حدسي: مبدأ حصان طروادة' },
        { tr: 'Enzim bir molekülü tanıdık bir alt birim sanarak aktif bölgesine alır, ancak sahte parça reaksiyonu kilitler.', ar: 'يخدع الإنزيم بالبنية الشبيهة فيدخلها إلى موقعه الفعال، لكن الذرة البديلة تعطل التفاعل الحيوي تماماً.' },
        false,
        { technicalTerms: [{ term: 'enzim inhibisyonu', arContext: 'تثبيط الإنزيم' }] }
      ),
      makeStep('mc-mod3-les1-step-04', 'visual_explanation', 4,
        { tr: 'Grimm Tablosu ve Valans Elektronları', ar: 'جدول Grimm وإلكترونات التكافؤ' },
        { tr: 'Grimm sütunlarında her hidrit eklemesi değerlik elektronunu 1 artırır: C(4) -> CH(5) -> CH2(6) -> CH3(7).', ar: 'في أعمدة Grimm، إضافة كل هيدريد تزيد إلكترون تكافؤ افتراضي: C(4) -> CH(5) -> CH2(6) -> CH3(7).' },
        false,
        { technicalTerms: [{ term: 'değerlik elektronu', arContext: 'إلكترون التكافؤ' }] }
      ),
      makeStep('mc-mod3-les1-step-05', 'interactive_artifact', 5,
        { tr: 'İnteraktif Atölye: Structure Identifier', ar: 'ورشة تفاعلية: محدد البنى الكيميائية' },
        { tr: 'Monovalan, divalent ve ring-equivalent klasik izoster çiftlerini eşleştirin ve biyoizosterik optimizasyon skorunu izleyin.', ar: 'طابق أزواج المتشابهات الكلاسيكية الأحادية والثنائية وحلقات التكافؤ لمتابعة معدل التحسين الحيوي.' },
        false,
        {
          widget: {
            type: 'StructureIdentifier',
            config: { mode: 'classical_isosteres', targetClass: 'grimm_hydride' }
          }
        }
      ),
      makeStep('mc-mod3-les1-step-06', 'guided_discovery', 6,
        { tr: 'Rehberli Keşif: Divalent İzosterler', ar: 'استكشاف موجه: المتشابهات ثنائية التكافؤ' },
        { tr: 'Bir köprü grubunda -CH2- yerine -O- veya -S- yerleştirildiğinde molekülün geometrisi ve polaritesi nasıl değişir?', ar: 'عند استبدال -CH2- في جسر جزيئي بـ -O- أو -S-، كيف تتغير هندسة الجزيء وقطبيته؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc31-3', text: { tr: 'Bağ açısı korunur ancak hidrojen bağı alma kabiliyeti ve polarite kazanılır.', ar: 'تحفظ زاوية الرابطة مع اكتساب قطبية وقدرة على قبول الروابط الهيدروجينية.' }, isCorrect: true },
              { id: 'opt-mc31-4', text: { tr: 'Molekül anında parçalanır.', ar: 'يتفكك الجزيء فوراً.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: '-CH2-, -O-, -NH-, -S- klasik divalent izosterlerdir ve bağ geometrisini korurlar.' }
        }
      ),
      makeStep('mc-mod3-les1-step-07', 'formal_explanation', 7,
        { tr: 'Friedman ve Langmuir Biyoizosterizm İlkeleri', ar: 'مبادئ Friedman و Langmuir للتشابه الحيوي' },
        { tr: 'Klasik izosterler aynı dış kabuk elektron sayısına ve benzer sterik hacme sahip gruplardır. Hedef protein geometrisini bozmadan özellikleri ince ayarlar.', ar: 'المتشابهات الكلاسيكية تمتلك نفس إلكترونات التكافؤ وحجماً فراغياً متقارباً، مما يتيح ضبط الخصائص دون تشويه التوافق مع (reseptör).' },
        false,
        { technicalTerms: [{ term: 'klasik biyoizoster', arContext: 'المتشابه الحيوي الكلاسيكي' }] }
      ),
      makeStep('mc-mod3-les1-step-08', 'concept_check', 8,
        { tr: 'Kavram Denetimi: Flor Atomunun Boyutu', ar: 'فحص المفهوم: الحجم الفراغي لذرة الفلور' },
        { tr: 'Flor atomu van der Waals yarıçapı açısından (1.47 Å) hangi atoma en yakındır?', ar: 'من حيث نصف قطر van der Waals (1.47 Å)، إلى أي ذرة يعتبر الفلور الأقرب حجماً؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc31-5', text: { tr: 'Hidrojen atomuna (1.20 Å).', ar: 'ذرة الهيدروجين (1.20 Å).' }, isCorrect: true },
              { id: 'opt-mc31-6', text: { tr: 'İyot atomuna (2.15 Å).', ar: 'ذرة اليود (2.15 Å).' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Flor hidrojenin mükemmel sterik izosteridir ancak aşırı elektronegatiftir.' }
        }
      ),
      makeStep('mc-mod3-les1-step-09', 'application', 9,
        { tr: 'Klinik Uygulama: 5-FU Antikanser Tasarımı', ar: 'تطبيق سريري: تصميم 5-FU المضاد للسرطان' },
        { tr: 'Timidilat sentaz enzimi 5-FU yu doğal substrat urasil sanarak bağlar; fakat C-F bağı koparılamadığı için enzim intihar inhibisyonuyla kilitlenir.', ar: 'يرتبط إنزيم Thymidylate synthase بـ 5-FU كبديل طبيعي لـ Uracil، لكن عجز الإنزيم عن كسر رابطة C-F يعطله نهائياً.' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc31-7', text: { tr: 'Bu bir intihar substratı (suicide substrate) biyoizosterik tasarımıdır.', ar: 'هذا تصميم تشابه حيوي كركيزة انتحارية (suicide substrate).' }, isCorrect: true },
              { id: 'opt-mc31-8', text: { tr: 'Rastgele bir toksisitedir.', ar: 'سمية عشوائية غير موجهة.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Biyoizosterik değişim mekanizma tabanlı enzim blokajının en zarif örneğidir.' }
        }
      ),
      makeStep('mc-mod3-les1-step-10', 'retrieval', 10,
        { tr: 'Geri Çağırma: Easson-Stedman ve Farmakofor', ar: 'استرجاع معرفي: Easson-Stedman والفارماكوفور' },
        { tr: 'Önceki derste gördüğümüz gibi farmakoforik temas noktalarının uzaysal konumu izosterik değişimlerde neden korunmalıdır?', ar: 'كما رأينا سابقاً، لماذا يجب الحفاظ على التموضع الفراغي لنقاط التماس الفارماكوفورية عند استبدال المتشابهات الحيوية؟' },
        false,
        { technicalTerms: [{ term: 'farmakoforik geometri', arContext: 'الهندسة الفارماكوفورية' }] }
      ),
      makeStep('mc-mod3-les1-step-11', 'connection', 11,
        { tr: 'İleri Bağlantı: Klasik Olmayan Biyoizosterler (Ders 6)', ar: 'ربط مفاهيمي: المتشابهات غير الكلاسيكية (الدرس 6)' },
        { tr: 'Klasik izosterler aynı valans elektronuna sahiptir; ancak klasik olmayan izosterler tamamen farklı atom sayılarıyla aynı etkiyi taklit eder.', ar: 'تمتلك المتشابهات الكلاسيكية نفس إلكترونات التكافؤ، بينما تحاكي المتشابهات غير الكلاسيكية نفس التأثير بعدد ذرات مختلف تماماً.' },
        false,
        { technicalTerms: [{ term: 'klasik olmayan biyoizoster', arContext: 'المتشابه غير الكلاسيكي' }] }
      ),
      makeStep('mc-mod3-les1-step-12', 'mastery_check', 12,
        { tr: 'Ustalık Sınavı: Grimm Kuralı', ar: 'اختبار الإتقان: قاعدة Grimm' },
        { tr: 'Grimm hidrit kuralına göre -CH= grubunun klasik izoster karşılığı hangisidir?', ar: 'وفق قاعدة إزاحة هيدريد Grimm، ما هو النظير المتشابه كلاسيكياً لمجموعة -CH=؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc31-9', text: { tr: '-N= piridin/benzen halka eşdeğerliği.', ar: 'مجموعة -N= في تكافؤ حلقتي البنزين والبيريدين.' }, isCorrect: true },
              { id: 'opt-mc31-10', text: { tr: '-CH3.', ar: 'مجموعة -CH3.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Ders başarıyla tamamlandı! 3 review cards eklendi. +50 XP.' }
        }
      )
    ]
  },

  // Lesson 6 / Mod 3 Les 2: mc-mod3-les2
  {
    id: 'mc-mod3-les2',
    courseId: 'medchem',
    moduleId: 'mc-mod-03',
    title: {
      tr: 'Klasik Olmayan Biyoizosterler: Karboksilik Asit ve Tetrazol',
      ar: 'المتشابهات الحيوية غير الكلاسيكية: حمض الكربوكسيل والتترازول'
    },
    order: 2,
    access: 'free',
    objective: {
      tr: 'Karboksilat ve tetrazol biyoizosterizmini inceleyerek asidik planar yük dağılımı ve lipofilisite optimizasyonunu kavramak.',
      ar: 'فهم التشابه الحيوي بين الكربوكسيل والتترازول لتحسين التوزيع المستوي للشحنة الحامضية والنفاذية الدهنية.'
    },
    misconceptions: [
      {
        tr: '5 üyeli bir halkanın tek bir karboksilik asit grubuyla eşdeğer olamayacağı yanılgısı.',
        ar: 'الاعتقاد الخاطئ بأن حلقة خماسية لا يمكن أن تكون مكافئة حيوياً لمجموعة كربوكسيل بسيطة.'
      }
    ],
    sources: [{ file: 'Biyoizosterizm.pdf', page: 18 }],
    citations: [
      {
        id: 'CIT-MC06-01',
        book: "Foye's Principles of Medicinal Chemistry",
        edition: '8th ed.',
        topic: 'Non-Classical Bioisosteres: Carboxylic Acid & Tetrazole',
        chapter: 'unverified',
        page: 'unverified',
        status: 'pending-human-review'
      }
    ],
    spacedReviewCards: [
      {
        cardId: 'mc-mod3-les2-card1',
        courseId: 'medchem',
        drugOrConcept: 'Tetrazol ve Karboksilik Asit pKa Uyumu',
        prompt: 'Tetrazol halkasının asidik pKa değeri karboksilik asitle nasıl kıyaslanır?',
        answer: 'Tetrazol pKa sı ~4.5-4.9 dur ve karboksilik asitle (pKa ~4.2-4.8) neredeyse birebir örtüşür.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'mc-mod3-les2-card2',
        courseId: 'medchem',
        drugOrConcept: 'Tetrazolün Biyoyararlanım Avantajı',
        prompt: 'Karboksilik asit yerine tetrazol halkası koymak oral biyoyararlanımı neden katlar?',
        answer: 'Tetrazolün logP si yaklaşık 1 birim daha yüksektir ve zarlardan 10 kat daha hızlı geçer.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'mc-mod3-les2-card3',
        courseId: 'medchem',
        drugOrConcept: 'Losartan Tasarımı',
        prompt: 'Losartan molekülünde hangi fonksiyonel grup tetrazol ile biyoizosterik olarak değiştirilmiştir?',
        answer: 'Anjiyotensin reseptörünü bloke eden peptid antagonistin karboksilat grubu.',
        box: 1,
        intervalDays: 1
      }
    ],
    translations: {
      tr: { title: 'Klasik Olmayan Biyoizosterler: Karboksilik Asit ve Tetrazol' },
      ar: { title: 'المتشابهات الحيوية غير الكلاسيكية: حمض الكربوكسيل والتترازول' }
    },
    steps: [
      makeStep('mc-mod3-les2-step-01', 'hook', 1,
        { tr: 'Losartanın Doğuştan Sırrı', ar: 'سر ولادة دواء Losartan' },
        { tr: 'İlk anjiyotensin antagonistleri bağırsaktan hiç emilmezken, losartan bir karboksilik asidi tetrazol halkasıyla değiştirerek nasıl milyar dolarlık ilaca dönüştü?', ar: 'بينما عجزت مضادات أنجيوتنسين الأولى عن الامتصاص الفموي، كيف تحول Losartan إلى دواء ملياري باستبدال الكربوكسيل بحلقة tetrazol؟' },
        false,
        { technicalTerms: [{ term: 'tetrazol halkası', arContext: 'حلقة التترازول' }] }
      ),
      makeStep('mc-mod3-les2-step-02', 'question', 2,
        { tr: 'Tahmin: Yük Dağılımı ve pKa', ar: 'توقع: توزيع الشحنة و pKa' },
        { tr: '5 üyeli aromatik tetrazol halkası fizyolojik pH 7.4 te negatif yük taşır mı?', ar: 'هل تحمل حلقة tetrazol العطرية الخماسية شحنة سالبة عند pH 7.4 الفسيولوجي؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc32-1', text: { tr: 'Evet, pKa sı ~4.8 dir ve rezonansla yük 4 azot atomu üzerine yayılır.', ar: 'نعم، فقيمة pKa تقارب 4.8 وتتوزع الشحنة بالرنين على ذرات النتروجين الأربع.' }, isCorrect: true },
              { id: 'opt-mc32-2', text: { tr: 'Hayır, tüm aromatik halkalar nötrdür.', ar: 'لا، فجميع الحلقات العطرية محايدة كهربائياً.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Tetrazol fizyolojik pH ta karboksilat gibi deprotone olarak anyon oluşturur.' }
        }
      ),
      makeStep('mc-mod3-les2-step-03', 'intuition', 3,
        { tr: 'Sezgisel Model: Genişletilmiş Düzlemsel Yük', ar: 'تشبيه حدسي: الشحنة المستوية الموزعة' },
        { tr: 'Karboksilatta negatif yük 2 oksijen arasında paylaşılırken, tetrazolda 4 azot atomuna yayılarak zardan süzülmeyi kolaylaştırır.', ar: 'بينما تنحصر شحنة الكربوكسيل بين ذرتي أكسجين، تتوزع في التترازول على 4 ذرات نتروجين مما يخفف الدرع المائي ويسهل عبور الغشاء.' },
        false,
        { technicalTerms: [{ term: 'delokalizasyon', arContext: 'تشتت الشحنة بالرنين' }] }
      ),
      makeStep('mc-mod3-les2-step-04', 'visual_explanation', 4,
        { tr: 'Elektronik ve Sterik Örtüşme', ar: 'التطابق الفراغي والإلكتروني' },
        { tr: 'Tetrazol anyonu düzlemseldir ve hacmi karboksilattan yaklaşık 10 kat daha lipofiliktir. Reseptör cebindeki pozitif arjinin ile kusursuz tuz köprüsü kurar.', ar: 'أنيون التترازول مستوٍ وأكثر قابلية للذوبان الدهني بـ 10 أضعاف مقارنة بالكربوكسيل، ويشكل جسراً ملحياً متقناً مع أرجينين المستقبِل.' },
        false,
        { technicalTerms: [{ term: 'tuz köprüsü', arContext: 'الجسر الملحي' }] }
      ),
      makeStep('mc-mod3-les2-step-05', 'interactive_artifact', 5,
        { tr: 'İnteraktif Modül: Structure Identifier', ar: 'محاكي تفاعلي: محدد البنى الجزيئية' },
        { tr: 'Karboksilik asit içeren moleküle tetrazol ve diğer non-klasik izosterleri takarak logP ve membran akış hızındaki 10 kat artışı test edin.', ar: 'استبدل الكربوكسيل بـ tetrazol ومتشابهات غير كلاسيكية واختبر ارتفاع logP ونفوذية الغشاء بعشرة أضعاف.' },
        false,
        {
          widget: {
            type: 'StructureIdentifier',
            config: { mode: 'nonclassical_isosteres', leadMolecule: 'candesartan_core' }
          }
        }
      ),
      makeStep('mc-mod3-les2-step-06', 'guided_discovery', 6,
        { tr: 'Rehberli Keşif: Metabolik Kararlılık', ar: 'استكشاف موجه: الاستقرار الأيضي' },
        { tr: 'Karboksilik asitler glukuronidasyonla hızla atılırken, tetrazol halkasının metabolik ömrü neden çok daha uzundur?', ar: 'بينما تطرح الأحماض الكربوكسيلية سريعاً بالاقتران الجلوكوروني، لماذا تمتلك حلقة tetrazol عمراً حيوياً أطول بكثير؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc32-3', text: { tr: 'Tetrazol UGT enzimlerine karşı sterik ve elektronik olarak çok daha dirençlidir.', ar: 'حلقة التترازول أكثر مقاومة إنزيمياً لإنزيمات UGT فراغياً وإلكترونياً.' }, isCorrect: true },
              { id: 'opt-mc32-4', text: { tr: 'Tetrazol kana hiç geçmez.', ar: 'التترازول لا يصل إلى الدوران الدموي أصلاً.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Tetrazol halkası metabolik kararlılığı artırarak ilacın günde tek doza inmesini sağlar.' }
        }
      ),
      makeStep('mc-mod3-les2-step-07', 'formal_explanation', 7,
        { tr: 'Klasik Olmayan Biyoizosterizm Tanımı', ar: 'تعريف التشابه الحيوي غير الكلاسيكي' },
        { tr: 'Grimm kurallarına uymayan ancak benzer biyolojik ve elektronik profil sergileyen fonksiyonel gruplara klasik olmayan biyoizoster denir.', ar: 'تسمى المجموعات التي لا تخضع لقواعد Grimm ولكنها تحاكي نفس السلوك الإلكتروني والحيوي بالمتشابهات الحيوية غير الكلاسيكية.' },
        false,
        { technicalTerms: [{ term: 'klasik olmayan izoster', arContext: 'المتشابه غير الكلاسيكي' }] }
      ),
      makeStep('mc-mod3-les2-step-08', 'concept_check', 8,
        { tr: 'Kavram Denetimi: Lipofilisite ve logP', ar: 'فحص المفهوم: المحبة الدهنية وقيمة logP' },
        { tr: 'Karboksilik asitten tetrazole geçildiğinde ilacın logP değerinde yaklaşık ne kadarlık bir artış gözlenir?', ar: 'عند الانتقال من الكربوكسيل إلى التترازول، كم تبلغ الزيادة التقريبية في قيمة logP؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc32-5', text: { tr: '~ +1.0 birim (10 kat daha yüksek lipofilisite).', ar: 'حوالي +1.0 وحدة (زيادة النفاذية الدهنية بمقدار 10 أضعاف).' }, isCorrect: true },
              { id: 'opt-mc32-6', text: { tr: 'Değişmez.', ar: 'لا تتغير القيمة مطلقاً.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Tetrazol daha lipofilik olduğundan oral yoldan mükemmel emilir.' }
        }
      ),
      makeStep('mc-mod3-les2-step-09', 'application', 9,
        { tr: 'Klinik Vaka: Losartan ve Kandesartan', ar: 'حالة سريرية: Losartan و Candesartan' },
        { tr: 'Tüm sartan sınıfı antihipertansifler (losartan, valsartan, irbesartan, kandesartan) neden moleküler yapılarında tetrazol taşırlar?', ar: 'لماذا تشترك جميع أدوية فئة Sartan الخافضة لضغط الدم في احتوائها على حلقة tetrazol بهيكلها؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc32-7', text: { tr: 'AT1 reseptöründeki bazik cebi bağlamak ve yüksek oral biyoyararlanım sağlamak için.', ar: 'لربط الجيب القاعدي في مستقبِل AT1 مع ضمان توافر حيوي فموي مرتفع.' }, isCorrect: true },
              { id: 'opt-mc32-8', text: { tr: 'Yalnızca boyar madde olsun diye.', ar: 'لمجرد إعطاء لون صبغي للمستحضر.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Sartanların başarısı tetrazol biyoizosterizminin modern tıptaki zaferidir.' }
        }
      ),
      makeStep('mc-mod3-les2-step-10', 'retrieval', 10,
        { tr: 'Geri Çağırma: Henderson-Hasselbalch ve İyonlaşma', ar: 'استرجاع معرفي: معادلة Henderson-Hasselbalch والتأين' },
        { tr: 'Modül 1 de gördüğümüz gibi pKa sı 4.8 olan tetrazol, pH 7.4 kanda yüzde kaç oranında iyonize haldedir?', ar: 'كما تعلمنا في الوحدة 1، كم تبلغ نسبة تأين التترازول ذي pKa = 4.8 في دم الإنسان عند pH 7.4؟' },
        false,
        { technicalTerms: [{ term: 'iyonize fraksiyon', arContext: 'الكسر المتأين' }] }
      ),
      makeStep('mc-mod3-les2-step-11', 'connection', 11,
        { tr: 'İleri Bağlantı: Stereokimya ve Konformasyon (Modül 4)', ar: 'ربط مفاهيمي: الكيمياء الفراغية والتشكيلات (الوحدة 4)' },
        { tr: 'Biyoizosterik gruplar kadar molekülün uzaysal konformasyonu da reseptör bağını tayin eder. Modül 4 te Pfeiffer kuralını keşfedeceğiz.', ar: 'بقدر أهمية المتشابهات الحيوية، فإن التشكيل الفراغي للجزيء يحكم ارتباطه. في الوحدة 4 سنكتشف قاعدة Pfeiffer.' },
        false,
        { technicalTerms: [{ term: 'stereokimya', arContext: 'الكيمياء الفراغية' }] }
      ),
      makeStep('mc-mod3-les2-step-12', 'mastery_check', 12,
        { tr: 'Ustalık Sınavı: Tetrazol Biyoizosterizmi', ar: 'اختبار الإتقان: التشابه الحيوي للتترازول' },
        { tr: 'Tetrazolün karboksilik asit yerine tercih edilmesinin en kritik çift yönlü kazanımı nedir?', ar: 'ما هو المكسب الثنائي الحاسم لاختيار التترازول كبديل لحمض الكربوكسيل؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc32-9', text: { tr: 'Benzer pKa ve anyonik bağ gücünü korurken, 10 kat daha yüksek lipofilisite ve metabolik direnç sağlaması.', ar: 'الحفاظ على نفس pKa والربط الأيوني مع مضاعفة المحبة الدهنية والمقاومة الأيضية بعشر مرات.' }, isCorrect: true },
              { id: 'opt-mc32-10', text: { tr: 'Molekülü tamamen inert yapması.', ar: 'جعل الجزيء خاملاً بيولوجياً بالكامل.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Modül 3 tamamlandı! 3 review cards eklendi. +50 XP.' }
        }
      )
    ]
  },

  // =========================================================================
  // MODULE 4: İlaç Etkisinde Stereokimya ve Optik İzomeri
  // =========================================================================

  // Lesson 7 / Mod 4 Les 1: mc-mod4-les1
  {
    id: 'mc-mod4-les1',
    courseId: 'medchem',
    moduleId: 'mc-mod-04',
    title: {
      tr: 'Ötomerler, Distomerler ve Pfeiffer Kuralı',
      ar: 'المصاوغات النشطة والمصاوغات الخاملة وقاعدة Pfeiffer'
    },
    order: 1,
    access: 'free',
    objective: {
      tr: 'Pfeiffer kuralını uygulayarak yüksek afiniteli ligandlarda ödismik oran artışını ve stereoseçiciliği öngörmek.',
      ar: 'تطبيق قاعدة Pfeiffer للتنبؤ بارتفاع النسبة الإيوديزمية والانتقائية الفراغية في الربيطات عالية الألفة.'
    },
    misconceptions: [
      {
        tr: 'Distomerin her zaman biyolojik olarak tamamen etkisiz bir seyirci olduğu yanılgısı.',
        ar: 'الظن الخاطئ بأن المصاوغ الخامل (distomer) عديم الفعالية والسمية تماماً دائماً.'
      }
    ],
    sources: [{ file: 'İlaçlarda  İzomeri.pdf', page: 22 }],
    citations: [
      {
        id: 'CIT-MC07-01',
        book: "Foye's Principles of Medicinal Chemistry",
        edition: '8th ed.',
        topic: "Eutomers, Distomers and Pfeiffer's Rule",
        chapter: 'unverified',
        page: 'unverified',
        status: 'pending-human-review'
      }
    ],
    spacedReviewCards: [
      {
        cardId: 'mc-mod4-les1-card1',
        courseId: 'medchem',
        drugOrConcept: 'Pfeiffer Kuralı Tanımı',
        prompt: 'Pfeiffer kuralına göre ötomerin afinitesi arttıkça ödismik oran nasıl değişir?',
        answer: 'Ötomerin reseptör afinitesi arttıkça iki enantiyomer arasındaki ödismik oran (seçicilik) katlanarak artar.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'mc-mod4-les1-card2',
        courseId: 'medchem',
        drugOrConcept: 'Distomer Toksisitesi',
        prompt: 'Distomerin zararlı olduğu klasik ilaç örneği hangisidir?',
        answer: 'Talidomid: (R) ötomeri sedatif iken (S) distomeri teratojenik ve embriyotoksiktir.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'mc-mod4-les1-card3',
        courseId: 'medchem',
        drugOrConcept: 'Kiral Anahtarlama (Chiral Switch)',
        prompt: 'Rasemik bir ilacın patent süresi biterken saf ötomerinin geliştirilmesine ne ad verilir?',
        answer: 'Kiral Anahtarlama (Chiral Switch) rasyonel ilaç geliştirme stratejisi.',
        box: 1,
        intervalDays: 1
      }
    ],
    translations: {
      tr: { title: 'Ötomerler, Distomerler ve Pfeiffer Kuralı' },
      ar: { title: 'المصاوغات النشطة والمصاوغات الخاملة وقاعدة Pfeiffer' }
    },
    steps: [
      makeStep('mc-mod4-les1-step-01', 'hook', 1,
        { tr: 'Aynı Formül, Biri İlaç Biri Zehir', ar: 'نفس الصيغة، أحدهما دواء والآخر سم' },
        { tr: 'Dekstrometorfan öksürük şurubuyken, enantiyomeri levometorfan bağımlılık yapan güçlü bir opioid narkotiktir. Neden?', ar: 'بينما Dextromethorphan شراب للسعال، فإن مصاوغه المرآوي Levomethorphan مخدر أفيوني مسبب للإدمان. لماذا؟' },
        false,
        { technicalTerms: [{ term: 'enantiyomer', arContext: 'المصاوغ المرآوي' }] }
      ),
      makeStep('mc-mod4-les1-step-02', 'question', 2,
        { tr: 'Tahmin: Afinite Arttıkça Seçicilik', ar: 'توقع: الانتقائية مع زيادة الألفة' },
        { tr: 'Bir ilacın reseptörüne afinitesi nanomolar seviyeye çıktığında, iki enantiyomeri arasındaki güç farkı ne olur?', ar: 'عندما ترتفع ألفة دواء نحو مستقبله إلى مستوى النانومولار، ماذا يحدث للفارق في القوة بين مصاوغيه المرآويين؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc41-1', text: { tr: 'Fark büyür; yüksek afinite çok daha katı stereoseçicilik (yüksek ödismik oran) gerektirir.', ar: 'يتسع الفارق؛ فالألفة العالية تتطلب تطابقاً فراغياً أشد صرامة (نسبة إيوديزمية أعلى).' }, isCorrect: true },
              { id: 'opt-mc41-2', text: { tr: 'Fark küçülür ve sıfırlanır.', ar: 'يتلاشى الفارق ويصل للصفر.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Pfeiffer kuralı gereğince afinite arttıkça ödismik oran dramatik biçimde yükselir.' }
        }
      ),
      makeStep('mc-mod4-les1-step-03', 'intuition', 3,
        { tr: 'Sezgisel Analoji: Maymuncuk ve Kasa Kilidi', ar: 'تشبيه حدسي: المفتاح العمومي وقفل الخزنة' },
        { tr: 'Gevşek bir asma kilit yamuk anahtarla da açılabilir; ancak yüksek güvenlikli bir banka kasası mikrometre hassasiyetinde kusursuz anahtar ister.', ar: 'القفل البسيط قد يفتح بمفتاح غير دقيق، لكن قفل الخزنة البنكية الحساسة يتطلب مفتاحاً بالغ الدقة بمحاذاة الميكرومتر.' },
        false,
        { technicalTerms: [{ term: 'Pfeiffer kuralı', arContext: 'قاعدة Pfeiffer' }] }
      ),
      makeStep('mc-mod4-les1-step-04', 'visual_explanation', 4,
        { tr: 'Pfeiffer Korelasyon Grafiği', ar: 'مخطط ارتباط Pfeiffer البياني' },
        { tr: 'Grafikte log(Ödismik Oran) ile -log(Kd) arasında pozitif doğrusal ilişki vardır. Afinite arttıkça eğri dikleşir.', ar: 'يظهر المخطط علاقة خطية موجبة بين log(النسبة الإيوديزمية) و -log(Kd). كلما ازدادت الألفة يزداد انحدار المنحنى.' },
        false,
        { technicalTerms: [{ term: 'ödismik oran', arContext: 'النسبة الإيوديزمية' }] }
      ),
      makeStep('mc-mod4-les1-step-05', 'interactive_artifact', 5,
        { tr: 'İnteraktif Laboratuvar: Receptor-Ligand Matcher', ar: 'المختبر التفاعلي: مطابق الربيط والمستقبل' },
        { tr: 'Farklı afinitelerdeki ligand çiftlerini reseptöre takın ve Pfeiffer kuralının ödismik oranı nasıl büyüttüğünü deneyimleyin.', ar: 'اربط أزواج الربيطات متباينة الألفة بالمستقبل ولاحظ كيف تضاعف قاعدة Pfeiffer النسبة الإيوديزمية عملياً.' },
        false,
        {
          widget: {
            type: 'ReceptorLigandMatcher',
            config: { mode: 'pfeiffer_analysis', receptors: ['muscarinic_m1', 'adrenergic_alpha1'] }
          }
        }
      ),
      makeStep('mc-mod4-les1-step-06', 'guided_discovery', 6,
        { tr: 'Rehberli Keşif: Düşük Afiniteli Ligandlar', ar: 'استكشاف موجه: الربيطات منخفضة الألفة' },
        { tr: 'Mikromolar afiniteye sahip zayıf bir ligandda iki enantiyomer arasındaki ödismik oran neden 1 e yakındır?', ar: 'لماذا تقترب النسبة الإيوديزمية بين المصاوغين من 1 في الربيطات الضعيفة ذات الألفة الميكرومولارية؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc41-3', text: { tr: 'Bağlanma gevşektir ve katı 3-noktalı stereokimyasal kısıtlama uygulanmaz.', ar: 'لأن الارتباط فضفاض ولا يخضع لقيود فراغية ثلاثية النقاط صارمة.' }, isCorrect: true },
              { id: 'opt-mc41-4', text: { tr: 'Moleküller kiralliklerini kaybederler.', ar: 'لأن الجزيئات تفقد خاصية الكيرالية.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Düşük afiniteli ilaçlarda stereoseçicilik düşüktür; Pfeiffer kuralı doğrulanır.' }
        }
      ),
      makeStep('mc-mod4-les1-step-07', 'formal_explanation', 7,
        { tr: 'Formal Pfeiffer Kuralı ve Termodinamik Temel', ar: 'قاعدة Pfeiffer الرسمية والأساس الديناميكي' },
        { tr: 'Carl Pfeiffer (1956): Bir ilacın dozu azaldıkça (etki gücü arttıkça) optik izomerler arasındaki farmakolojik etkinlik farkı büyür.', ar: 'Carl Pfeiffer (1956): كلما انخفضت جرعة الدواء (ازدادت قوته) اتسعت الفجوة الفارماكولوجية بين مصاوغيه الضوئيين.' },
        false,
        { technicalTerms: [{ term: 'stereoseçicilik', arContext: 'الانتقائية الفراغية' }] }
      ),
      makeStep('mc-mod4-les1-step-08', 'concept_check', 8,
        { tr: 'Kavram Denetimi: Distomerin Akıbeti', ar: 'فحص المفهوم: مصير المصاوغ الخامل' },
        { tr: 'Distomer hedefine bağlanmasa bile hastada istenmeyen etki yaratabilir mi?', ar: 'حتى لو لم يرتبط المصاوغ الخامل (distomer) بالهدف، هل يمكن أن يسبب آثاراً غير مرغوبة للمريض؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc41-5', text: { tr: 'Evet, farklı reseptörleri etkileyebilir veya metabolik yük ve toksisite oluşturabilir.', ar: 'نعم، فقد يرتبط بمستقبلات أخرى مسبباً سمية وعبئاً استقلابياً غير مرغوب.' }, isCorrect: true },
              { id: 'opt-mc41-6', text: { tr: 'Hayır, distomer vücutta tamamen görünmezdir.', ar: 'لا، فالمصاوغ الخامل خفي تماماً في الجسم.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Distomer safsızlık gibi davranarak yan etkilere yol açabilir.' }
        }
      ),
      makeStep('mc-mod4-les1-step-09', 'application', 9,
        { tr: 'Kiral Anahtarlama: Omeprazol den Esomeprazole', ar: 'التحول الكيرالي: من Omeprazole إلى Esomeprazole' },
        { tr: 'Rasemik omeprazol yerine saf (S)-enantiyomeri esomeprazolün piyasaya sürülmesi hangi temel klinik avantajı sağlamıştır?', ar: 'ما الميزة السريرية الأساسية التي حققها تسويق المصاوغ النقي Esomeprazole بدلاً من Omeprazole الراسيمي؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc41-7', text: { tr: 'Daha öngörülebilir metabolizma, daha yüksek plazma konsantrasyonu ve üstün asit baskılama.', ar: 'استقلاب كبدي أكثر قابلية للتنبؤ وتراكيز بلازمية أعلى وتثبيط حامضي متفوق.' }, isCorrect: true },
              { id: 'opt-mc41-8', text: { tr: 'Hiçbir fark yaratmamıştır.', ar: 'لم يحقق أي فارق سريري.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Kiral anahtarlama farmakokinetik değişkenliği azaltarak klinik başarı sağlar.' }
        }
      ),
      makeStep('mc-mod4-les1-step-10', 'retrieval', 10,
        { tr: 'Geri Çağırma: Easson-Stedman 3-Nokta Modeli', ar: 'استرجاع معرفي: نموذج Easson-Stedman ثلاثي النقاط' },
        { tr: 'Ötomerin distomere göre üstün afinite sergilemesinin 3 boyutlu geometrik nedeni neydi?', ar: 'ما هو السبب الفراغي الهندسي لتفوق ألفة المصاوغ الفعال (ötomer) مقارنة بالمصاوغ الخامل؟' },
        false,
        { technicalTerms: [{ term: 'üç noktalı bağlanma', arContext: 'الارتباط ثلاثي النقاط' }] }
      ),
      makeStep('mc-mod4-les1-step-11', 'connection', 11,
        { tr: 'İleri Bağlantı: Konformasyonel Esneklik ve Rijitlik (Ders 8)', ar: 'ربط مفاهيمي: المرونة والجساءة التشكيلية (الدرس 8)' },
        { tr: 'Konfigürasyon (enantiyomerler) kadar tek bağların dönmesiyle oluşan konformasyonlar da hedef bağlanmasını belirler. Sıradaki derste rijit iskeletleri işleyeceğiz.', ar: 'بقدر أهمية المصاوغات، يحدد دوران الروابط التشكيل المفضل للمستقبل. في الدرس القادم سندرس الهياكل الجاسئة.' },
        false,
        { technicalTerms: [{ term: 'konformasyon', arContext: 'التشكيل الفراغي' }] }
      ),
      makeStep('mc-mod4-les1-step-12', 'mastery_check', 12,
        { tr: 'Ustalık Sınavı: Pfeiffer Kuralı Özeti', ar: 'اختبار الإتقان: ملخص قاعدة Pfeiffer' },
        { tr: 'Pfeiffer kuralına göre son derece güçlü (örneğin sub-nanomolar) bir reseptör agonistinde ödismik oran nasıl beklenir?', ar: 'وفق قاعدة Pfeiffer، كيف يتوقع أن تكون النسبة الإيوديزمية لمشبه مستقبلي فائق القوة (sub-nanomolar)؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc41-9', text: { tr: 'Çok yüksek (yüzlerce hatta binlerce kat stereoseçici).', ar: 'مرتفعة جداً (انتقائية فراغية بمئات أو آلاف الأضعاف).' }, isCorrect: true },
              { id: 'opt-mc41-10', text: { tr: 'Bire eşit.', ar: 'مساوية للواحد تماماً.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Ders başarıyla tamamlandı! 3 review cards eklendi. +50 XP.' }
        }
      )
    ]
  },

  // Lesson 8 / Mod 4 Les 2: mc-mod4-les2
  {
    id: 'mc-mod4-les2',
    courseId: 'medchem',
    moduleId: 'mc-mod-04',
    title: {
      tr: 'Konformasyonel İzomerizm: Rijit ve Esnek İskeletler',
      ar: 'التماكب التشكلي: الهياكل الجاسئة والمرنة'
    },
    order: 2,
    access: 'free',
    objective: {
      tr: 'İlaç iskeletini rijit hale getirerek biyoaktif konformasyonu dondurmayı ve bağlanma entropi cezasını düşürmeyi öğrenmek.',
      ar: 'تعلم استراتيجيات تجسئة الهيكل الدوائي لتثبيت التشكيل الحيوي الفعال وخفض ضريبة الإنتروبيا عند الارتباط.'
    },
    misconceptions: [
      {
        tr: 'Molekülün çözeltideki en kararlı (en düşük enerjili) konformasyonunun her zaman reseptöre bağlanan konformasyon olduğu yanılgısı.',
        ar: 'الظن الخاطئ بأن التشكيل الأكثر استقراراً في المحلول هو دائماً التشكيل الذي يرتبط بالمستقبِل.'
      }
    ],
    sources: [{ file: 'İlaçlarda  İzomeri.pdf', page: 34 }],
    citations: [
      {
        id: 'CIT-MC08-01',
        book: "Foye's Principles of Medicinal Chemistry",
        edition: '8th ed.',
        topic: 'Conformational Isomerism & Rigidification Strategies',
        chapter: 'unverified',
        page: 'unverified',
        status: 'pending-human-review'
      }
    ],
    spacedReviewCards: [
      {
        cardId: 'mc-mod4-les2-card1',
        courseId: 'medchem',
        drugOrConcept: 'Konformasyonel Entropi Cezası',
        prompt: 'Esnek bir molekül reseptöre bağlandığında serbest dönme serbestliğini kaybetmesi termodinamik olarak neye yol açar?',
        answer: 'Olumsuz entropi cezasına (-T * Delta S) yol açarak serbest bağlanma enerjisini zayıflatır.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'mc-mod4-les2-card2',
        courseId: 'medchem',
        drugOrConcept: 'Rijitleştirme Stratejisi',
        prompt: 'İlaç kimyasında esnek bir zinciri halkalaştırmanın (siklizasyon) temel amacı nedir?',
        answer: 'Biyoaktif konformasyonu sabitleyip entropi kaybını önlemek ve reseptör seçiciliğini artırmak.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'mc-mod4-les2-card3',
        courseId: 'medchem',
        drugOrConcept: 'Asetilkolin Konformasyonları',
        prompt: 'Asetilkolin nikotinik reseptöre kvazi-halkasal syn konformasyonunda mı, yoksa açık anti konformasyonunda mı bağlanır?',
        answer: 'Muskarinik reseptöre anti, nikotinik reseptöre ise syn-klon konformasyonunda bağlanır.',
        box: 1,
        intervalDays: 1
      }
    ],
    translations: {
      tr: { title: 'Konformasyonel İzomerizm: Rijit ve Esnek İskeletler' },
      ar: { title: 'التماكب التشكلي: الهياكل الجاسئة والمرنة' }
    },
    steps: [
      makeStep('mc-mod4-les2-step-01', 'hook', 1,
        { tr: 'Asetilkolinin İki Yüzü', ar: 'وجها الأسيتيل كولين' },
        { tr: 'Asetilkolin tek bir moleküldür fakat hem kalp muskarinik reseptörünü hem nöromusküler nikotinik reseptörü nasıl uyarır?', ar: 'الأسيتيل كولين جزيء واحد، لكن كيف ينشط كلاً من مستقبلات القلب الموسكارينية ومستقبلات العضلات النيكوتينية؟' },
        false,
        { technicalTerms: [{ term: 'konformasyonel esneklik', arContext: 'المرونة التشكيلية' }] }
      ),
      makeStep('mc-mod4-les2-step-02', 'question', 2,
        { tr: 'Tahmin: Serbest Dönmenin Bedeli', ar: 'توقع: ضريبة الدوران الحر' },
        { tr: '10 serbest dönen tek bağı olan esnek bir molekül reseptöre bağlandığında termodinamik olarak ne kaybeder?', ar: 'عندما يرتبط جزيء مرن يمتلك 10 روابط أحادية حرة الدوران بمستقبله، ماذا يخسر ديناميكياً؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc42-1', text: { tr: 'Büyük miktarda konformasyonel entropi kaybeder ve bu afiniteyi düşürür.', ar: 'يفقد قدراً كبيراً من الإنتروبيا التشكيلية مما يضعف طاقة الارتباط الكلية.' }, isCorrect: true },
              { id: 'opt-mc42-2', text: { tr: 'Kütlesini kaybeder.', ar: 'يفقد كتلته الجزيئية.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Her dondurulan serbest bağ yaklaşık 0.7 kcal/mol entropi cezası ödetir.' }
        }
      ),
      makeStep('mc-mod4-les2-step-03', 'intuition', 3,
        { tr: 'Sezgisel Analoji: Dans Eden İp vs Döküm Anahtar', ar: 'تشبيه حدسي: الحبل الراقص مقابل المفتاح المصبوب' },
        { tr: 'Rüzgarda savrulan esnek bir ipi anahtar deliğine sokamazsınız; fakat döküm çelik bir anahtar doğrudan yuvaya oturur.', ar: 'لا يمكنك إدخال حبل يتمايل في الرياح داخل قفل، بينما ينزلق المفتاح الفولاذي الصلب مباشرة إلى مجراه.' },
        false,
        { technicalTerms: [{ term: 'rijit iskelet', arContext: 'الهيكل الجاسئ' }] }
      ),
      makeStep('mc-mod4-les2-step-04', 'visual_explanation', 4,
        { tr: 'Newman İzdüşümü ve Torsiyonel Açılar', ar: 'إسقاط Newman وزوايا الالتواء' },
        { tr: 'Tek bağ etrafında dönme syn, gauche ve anti rotamerlerini üretir. Enerji bariyerleri oda sıcaklığında saniyede milyonlarca kez aşılır.', ar: 'يولد الدوران حول الرابطة الأحادية أشكال syn و gauche و anti. يتم تجاوز حواجز الطاقة ملايين المرات في الثانية.' },
        false,
        { technicalTerms: [{ term: 'rotamer', arContext: 'المصاوغ الدوراني (Rotamer)' }] }
      ),
      makeStep('mc-mod4-les2-step-05', 'interactive_artifact', 5,
        { tr: 'İnteraktif Laboratuvar: SAR Explorer (Konformasyon)', ar: 'المختبر التفاعلي: مستكشف SAR (التشكيل)' },
        { tr: 'Esnek zincire çift bağ veya halka katarak molekülü sabitleyin. Entropi cezasının nasıl sıfırlandığını ve afinitenin nasıl fırladığını gözlemleyin.', ar: 'أضف رابطة مضاعفة أو حلقة لتثبيت السلسلة المرنة ولاحظ كيف تتلاشى ضريبة الإنتروبيا وتتضاعف الألفة.' },
        false,
        {
          widget: {
            type: 'SarExplorer',
            config: { mode: 'conformational_restriction', baseMolecule: 'histamine_flexible' }
          }
        }
      ),
      makeStep('mc-mod4-les2-step-06', 'guided_discovery', 6,
        { tr: 'Rehberli Keşif: Halka Kapatma Stratejisi', ar: 'استكشاف موجه: استراتيجية إغلاق الحلقة' },
        { tr: 'Histamin molekülü esnekken H1 ve H2 reseptörlerini ayıramaz. Siklopropan halkasıyla biyoaktif konformasyon kilitlendiğinde seçicilik nasıl değişir?', ar: 'يكون الهستامين المرن عاجزاً عن التمييز بين مستقبلات H1 و H2. عندما يقفل تشكيله بحلقة سيكلوبروبان، كيف تتغير الانتقائية؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc42-3', text: { tr: 'Yalnızca bir reseptör alt tipine seçici hale gelirken diğer reseptöre bağlanamaz.', ar: 'يصبح انتقائياً لنمط فرعي واحد فقط بينما يعجز عن الارتباط بالمستقبل الآخر.' }, isCorrect: true },
              { id: 'opt-mc42-4', text: { tr: 'Her iki reseptörü de 100 kat daha güçlü uyarır.', ar: 'ينشط كلا المستقبلين بقوة أكبر بـ 100 ضعف.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Rijitleştirme diğer reseptör ceplerine girişi engelleyerek seçiciliği garantiler.' }
        }
      ),
      makeStep('mc-mod4-les2-step-07', 'formal_explanation', 7,
        { tr: 'Biyoaktif Konformasyon ve Entropi Optimizasyonu', ar: 'التشكيل الحيوي وتحسين الإنتروبيا' },
        { tr: 'Biyoaktif konformasyon en düşük enerjili konformasyon olmak zorunda değildir. Önceden organize edilmiş rijit ligandlar minimum entropi kaybıyla bağlanır.', ar: 'ليس بالضرورة أن يكون التشكيل الفعال هو الأدنى طاقة في المحلول. الربيطات الجاسئة مسبقة التنظيم ترتبط بأدنى خسارة إنتروبية.' },
        false,
        { technicalTerms: [{ term: 'biyoaktif konformasyon', arContext: 'التشكيل الفراغي الحيوي الفعال' }] }
      ),
      makeStep('mc-mod4-les2-step-08', 'concept_check', 8,
        { tr: 'Kavram Denetimi: Dondurulan Rotasyon Başına Kazanç', ar: 'فحص المفهوم: المكسب لكل دورة مقيدة' },
        { tr: 'Rasyonel tasarımda tek bir bağın dönmesini dondurmak afiniteye ortalama ne kadar katkı sağlar?', ar: 'في التصميم الرشيد، كم تضيف تقريباً إعاقة دوران رابطة أحادية واحدة إلى طاقة الارتباط الحرة؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc42-5', text: { tr: '~0.5 - 0.8 kcal/mol serbest enerji avantajı (yaklaşık 3 kat afinite artışı).', ar: 'حوالي 0.5 - 0.8 kcal/mol كأفضلية طاقة حرة (مضاعفة الألفة بنحو 3 أضعاف).' }, isCorrect: true },
              { id: 'opt-mc42-6', text: { tr: 'Sıfır katkı.', ar: 'صفر مساهمة.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: '5 bağın dondurulması afiniteyi 100 kattan fazla yükseltebilir.' }
        }
      ),
      makeStep('mc-mod4-les2-step-09', 'application', 9,
        { tr: 'Klinik İlaç Tasarımı: Morfin ve Esnek Opioidler', ar: 'تصميم سريري: المورفين والأفيونات المرنة' },
        { tr: 'Morfin rijit 5 halkalı sert bir iskelete sahipken, meperidin ve fentanil esnektir. Morfinin mu reseptörüne yüksek seçiciliği bu rijitlikten kaynaklanır.', ar: 'يمتلك المورفين هيكلاً صلباً خماسي الحلقات بينما الفنتانيل مرن. تنبع انتقائية المورفين الفائقة لمستقبلات mu من هذه الجساءة.' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc42-7', text: { tr: 'Rijit fenantren iskeleti morfinin farmakoforunu tek bir kusursuz konformasyonda tutar.', ar: 'هيكل الفينانثرين الجاسئ يثبت فارماكوفور المورفين في تشكيل فراغي متقن واحد.' }, isCorrect: true },
              { id: 'opt-mc42-8', text: { tr: 'Morfinde kiral merkez yoktur.', ar: 'المورفين يفتقر للمراكز الكيرالية.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Rijitleştirilmiş iskeletler reseptör seçiciliğinin zirve noktasıdır.' }
        }
      ),
      makeStep('mc-mod4-les2-step-10', 'retrieval', 10,
        { tr: 'Geri Çağırma: Pfeiffer Kuralı ve Seçicilik', ar: 'استرجاع معرفي: قاعدة Pfeiffer والانتقائية' },
        { tr: 'Bir önceki derste öğrendiğimiz gibi ligandın hedef afinitesi arttıkça enantiyomerler arasındaki ödismik oran nasıl değişiyordu?', ar: 'كما تعلمنا في الدرس السابق، كيف تتغير النسبة الإيوديزمية بين المصاوغات مع زيادة ألفة الربيط نحو هدفه؟' },
        false,
        { technicalTerms: [{ term: 'Pfeiffer kuralı', arContext: 'قاعدة Pfeiffer' }] }
      ),
      makeStep('mc-mod4-les2-step-11', 'connection', 11,
        { tr: 'İleri Bağlantı: İlaç Metabolizması ve Biyotransformasyon (Modül 5)', ar: 'ربط مفاهيمي: استقلاب الأدوية والتحول الحيوي (الوحدة 5)' },
        { tr: 'Reseptörüne bağlanan ilaç görevini bitirdikten sonra vücuttan nasıl temizlenir? Modül 5 te Sitokrom P450 hidroksilasyon mekanizmalarını inceleyeceğiz.', ar: 'بعد أداء وظيفته، كيف يطرح الدواء من الجسم؟ في الوحدة 5، سنستكشف آليات الأكسدة بواسطة إنزيمات CYP450.' },
        false,
        { technicalTerms: [{ term: 'sitokrom P450', arContext: 'إنزيمات CYP450' }] }
      ),
      makeStep('mc-mod4-les2-step-12', 'mastery_check', 12,
        { tr: 'Ustalık Sınavı: Konformasyonel Kısıtlama', ar: 'اختبار الإتقان: تقييد التشكيل الفراغي' },
        { tr: 'Esnek bir ilaç kurşun bileşiğini optimize ederken halka oluşturarak rijitlik kazandırmanın sağladığı iki temel avantaj nedir?', ar: 'ما الميزتان الأساسيتان لإكساب المركب الطليعي المرن جساءة تشكيلية عبر بناء حلقة؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc42-9', text: { tr: 'Bağlanma entropi cezasını düşürerek afiniteyi artırmak ve diğer reseptörleri engelleyerek seçicilik kazanmak.', ar: 'خفض ضريبة الإنتروبيا لرفع الألفة، ومنع الارتباط بالمستقبلات الأخرى لضمان الانتقائية.' }, isCorrect: true },
              { id: 'opt-mc42-10', text: { tr: 'İlacı suda tamamen çözünmez kılmak.', ar: 'جعل الدواء غير قابل للذوبان في الماء مطلقاً.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Modül 4 tamamlandı! 3 review cards eklendi. +50 XP.' }
        }
      )
    ]
  },

  // =========================================================================
  // MODULE 5: İlaç Biyotransformasyonu ve Faz I/II Metabolizması
  // =========================================================================

  // Lesson 9 / Mod 5 Les 1: mc-mod5-les1
  {
    id: 'mc-mod5-les1',
    courseId: 'medchem',
    moduleId: 'mc-mod-05',
    title: {
      tr: 'Faz I Fonksiyonelleşme: Sitokrom P450 Hidroksilasyon Mekanizmaları',
      ar: 'المرحلة الأولى من التحول الحيوي: آليات هدرلة CYP450'
    },
    order: 1,
    access: 'free',
    objective: {
      tr: 'Sitokrom P450 katalitik döngüsünü ve alifatik/aromatik hidroksilasyon mekanizmalarını analiz etmek.',
      ar: 'تحليل الدورة التحفيزية لإنزيمات CYP450 وآليات الهدرلة الأليفاتية والعطرية للأدوية.'
    },
    misconceptions: [
      {
        tr: 'Metabolizmanın her zaman bir ilacı tamamen etkisiz hale getirdiği yanılgısı (ön-ilaçlar ve toksik metabolitler vardır).',
        ar: 'الاعتقاد الخاطئ بأن الاستقلاب يعطل فعالية الدواء دائماً (توجد أدوية طليعية ومستقلبات سامة).'
      }
    ],
    sources: [{ file: 'İlaç metabolizması-2026.pdf', page: 8 }],
    citations: [
      {
        id: 'CIT-MC09-01',
        book: "Foye's Principles of Medicinal Chemistry",
        edition: '8th ed.',
        topic: 'Cytochrome P450 Mechanisms & Phase I Biotransformation',
        chapter: 'unverified',
        page: 'unverified',
        status: 'pending-human-review'
      }
    ],
    spacedReviewCards: [
      {
        cardId: 'mc-mod5-les1-card1',
        courseId: 'medchem',
        drugOrConcept: 'CYP450 Katalitik Reaktifi',
        prompt: 'CYP450 döngüsünde substratın C-H bağından hidrojen koparan yüksek enerjili reaktif ara ürün nedir?',
        answer: 'Hem demiri-oksen kompleksi: [Fe(IV)=O, porfirin radikal katyonu] türevidir.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'mc-mod5-les1-card2',
        courseId: 'medchem',
        drugOrConcept: 'Alifatik Hidroksilasyon Bölgeleri',
        prompt: 'Alkil yan zincirlerinde CYP450 genellikle hangi karbonları öncelikle hidroksiller?',
        answer: 'En uçtaki omega ve sondan bir önceki (omega-1) karbon atomlarını.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'mc-mod5-les1-card3',
        courseId: 'medchem',
        drugOrConcept: 'Aren Oksit ve Epoksit Hidrolaz',
        prompt: 'Aromatik halka hidroksilasyonunda oluşan reaktif epoksit ara ürün hangi enzimle dihidrodiollere dönüştürülür?',
        answer: 'Epoksit hidrolaz enzimi toksik aren oksitleri zararsız trans-dihidrodiollere hidroliz eder.',
        box: 1,
        intervalDays: 1
      }
    ],
    translations: {
      tr: { title: 'Faz I Fonksiyonelleşme: Sitokrom P450 Hidroksilasyon Mekanizmaları' },
      ar: { title: 'المرحلة الأولى من التحول الحيوي: آليات هدرلة CYP450' }
    },
    steps: [
      makeStep('mc-mod5-les1-step-01', 'hook', 1,
        { tr: 'Yağlı İlaçların Vücuttan Kaçışı', ar: 'هروب الأدوية الدهنية من الجسم' },
        { tr: 'Böbrekler yalnızca suda çözünen polar molekülleri atabilir. Vücut aşırı lipofil bir ilacı idrarla atabilmek için ilk önce ne yapar?', ar: 'تطرح الكلى فقط الجزيئات القطبية المنحلة بالماء. ماذا يفعل الجسم أولاً ليتمكن من طرح دواء فائق الدهنية في البول؟' },
        false,
        { technicalTerms: [{ term: 'Faz I metabolizması', arContext: 'المرحلة الأولى من الاستقلاب' }] }
      ),
      makeStep('mc-mod5-les1-step-02', 'question', 2,
        { tr: 'Tahmin: Moleküle Saplanan Kanca', ar: 'توقع: زرع الخطاف الجزيئي' },
        { tr: 'Faz I reaksiyonlarının temel kimyasal amacı ilacı doğrudan tamamen suda çözünür yapmak mıdır?', ar: 'هل الهدف الكيميائي الأساسي لتفاعلات المرحلة الأولى هو جعل الدواء منحلاً بالماء تماماً وبشكل مباشر؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc51-1', text: { tr: 'Hayır, asıl amaç moleküle polar bir fonksiyonel kulp (-OH, -NH2, -COOH) takarak Faz II ye hazırlamaktır.', ar: 'لا، بل الهدف زرع مقبض وظيفي قطبي (-OH، -NH2، -COOH) لتهيئة الجزيء للمرحلة الثانية.' }, isCorrect: true },
              { id: 'opt-mc51-2', text: { tr: 'Evet, tek bir Faz I reaksiyonu ilacı hemen tamamen hidrofilik yapar.', ar: 'نعم، فتفاعل واحد من المرحلة الأولى يحول الدواء فوراً إلى مفرط الانحلال بالماء.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Faz I fonksiyonelleşme reaksiyonudur; moleküle reaktif ve polar bir kanca takar.' }
        }
      ),
      makeStep('mc-mod5-les1-step-03', 'intuition', 3,
        { tr: 'Sezgisel Analoji: Pürüzsüz Topa Kulp Takmak', ar: 'تشبيه حدسي: تثبيت مقبض على كرة ملساء' },
        { tr: 'Pürüzsüz kaygan bir mermer topu iple bağlayamazsınız; önce üzerine bir kanca vidası (-OH) takmalı, sonra devasa bir halat (glukuronid) bağlamalısınız.', ar: 'لا يمكنك ربط كرة رخامية ملساء؛ يجب أولاً تثبيت برغي خطافي (-OH) لربط حبل الإخراج الضخم به لاحقاً.' },
        false,
        { technicalTerms: [{ term: 'fonksiyonelleşme', arContext: 'إدخال المجموعات الوظيفية' }] }
      ),
      makeStep('mc-mod5-les1-step-04', 'visual_explanation', 4,
        { tr: 'CYP450 Katalitik Hem Döngüsü', ar: 'دورة الهيم التحفيزية في CYP450' },
        { tr: 'Hekzakodine Fe(III) substratı bağlar -> 1e- ile Fe(II) ye indirgenir -> O2 bağlar -> ikinci elektronla demir-oksen radikali C-H bağını oksitler.', ar: 'يرتبط الحديد Fe(III) بالدواء -> يختزل بإلكترون إلى Fe(II) -> يربط الأكسجين -> يولد جذر الحديد-أوكسين عالي الطاقة لهدرلة رابطة C-H.' },
        false,
        { technicalTerms: [{ term: 'CYP450 katalitik döngüsü', arContext: 'الدورة التحفيزية لـ CYP450' }] }
      ),
      makeStep('mc-mod5-les1-step-05', 'interactive_artifact', 5,
        { tr: 'İnteraktif Simülatör: Metabolism Map', ar: 'محاكي تفاعلي: خارطة الاستقلاب' },
        { tr: 'İlaç substratını seçin; alifatik zincirde omega ve omega-1 hidroksilasyon ürünlerini, aromatik halkada epoksit ara ürünlerini harita üzerinde izleyin.', ar: 'اختر الجزيء الدوائي وراقب على الخارطة التفاعلية نواتج الهدرلة في موقعي omega و omega-1 وتشكل الإيبوكسيد في الحلقات العطرية.' },
        false,
        {
          widget: {
            type: 'MetabolismMap',
            config: { substrate: 'diazepam', enzymes: ['CYP3A4', 'CYP2C19'] }
          }
        }
      ),
      makeStep('mc-mod5-les1-step-06', 'guided_discovery', 6,
        { tr: 'Rehberli Keşif: Aromatic Epoxidation ve Toksisite', ar: 'استكشاف موجه: الإيبوكسيد العطري والسمية' },
        { tr: 'Aromatik halka oksitlendiğinde oluşan aren oksit ara ürünü epoksit hidrolaz enzimiyle nötralize edilmezse ne olur?', ar: 'عند أكسدة الحلقة العطرية لتشكيل Aren oxide، ماذا يحدث إذا لم يحله إنزيم Epoxide hydrolase فوراً؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc51-3', text: { tr: 'Hücresel DNA ve proteinlere kovalent bağlanarak hepatotoksisite ve mutajenite yaratır.', ar: 'يرتبط تساهمياً بالبروتينات والـ DNA الخلوي مسبباً سمية كبدية وطفرات جينية.' }, isCorrect: true },
              { id: 'opt-mc51-4', text: { tr: 'Zararsız gaz olarak akciğerden uçar.', ar: 'يتطاير كغاز غير ضار عبر الرئتين.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Reaktif epoksitler hücresel makromoleküllere saldırarak doku nekrozu yapabilir.' }
        }
      ),
      makeStep('mc-mod5-les1-step-07', 'formal_explanation', 7,
        { tr: 'Kimyasal Mekanizma: Radikal Geri Tepmesi (Radical Rebound)', ar: 'الآلية الكيميائية: الارتداد الجذري (Radical Rebound)' },
        { tr: '[Fe(IV)=O] türü C-H bağından hidrojen radikali kopararak [Fe(IV)-OH] ve karbon radikali üretir. Ardından -OH hızla karbona transfer olur.', ar: 'ينتزع مركب [Fe(IV)=O] جذراً هيدروجينياً ليشكل جذر كربوني و [Fe(IV)-OH]، ثم ترتد مجموعة -OH بسرعة فائقة لترتبط بالكربون.' },
        false,
        { technicalTerms: [{ term: 'radikal geri tepmesi', arContext: 'الارتداد الجذري (Radical Rebound)' }] }
      ),
      makeStep('mc-mod5-les1-step-08', 'concept_check', 8,
        { tr: 'Kavram Denetimi: CYP İzoenzimleri', ar: 'فحص المفهوم: عائلات إنزيمات CYP' },
        { tr: 'İnsan karaciğerinde klinik ilaçların yarısından fazlasının Faz I oksidasyonundan sorumlu baskın izoenzim hangisidir?', ar: 'ما هو النظير الإنزيمي الكبدي السائد المسؤول عن أكسدة أكثر من نصف الأدوية السريرية في المرحلة الأولى؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc51-5', text: { tr: 'CYP3A4.', ar: 'إنزيم CYP3A4.' }, isCorrect: true },
              { id: 'opt-mc51-6', text: { tr: 'CYP1A1.', ar: 'إنزيم CYP1A1.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'CYP3A4 geniş aktif bölgesiyle en çok ilacı metabolize eden enzimdir.' }
        }
      ),
      makeStep('mc-mod5-les1-step-09', 'application', 9,
        { tr: 'Klinik İlaç Etkileşimi: Greyfurt Suyu ve Felodipin', ar: 'تفاعل سريري: عصير الغريب فروت و Felodipine' },
        { tr: 'Greyfurt suyundaki furanokumarinler bağırsak CYP3A4 enzimini intihar inhibisyonuyla yok eder. Felodipin içildiğinde ne olur?', ar: 'تثبط مركبات الفورانوكومارين في الغريب فروت إنزيم CYP3A4 المعوي نهائياً. ماذا يحدث عند تناول Felodipine؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc51-7', text: { tr: 'İlk geçiş metabolizması çöker, felodipin kan düzeyi tehlikeli biçimde fırlar ve tansiyon düşer.', ar: 'ينهار استقلاب المرور الأول، وتتضاعف مستويات الدواء في الدم بشكل خطر مسببة هبوط ضغط حاد.' }, isCorrect: true },
              { id: 'opt-mc51-8', text: { tr: 'İlaç hiç emilmez.', ar: 'لا يمتص الدواء نهائياً.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'CYP3A4 inhibisyonu toksik doz aşımı tablosu yaratır.' }
        }
      ),
      makeStep('mc-mod5-les1-step-10', 'retrieval', 10,
        { tr: 'Geri Çağırma: Polarite ve Membran Difüzyonu', ar: 'استرجاع معرفي: القطبية والانتشار الغشائي' },
        { tr: 'Modül 1 de gördüğümüz gibi polar hidroksil (-OH) grubunun takılması ilacın lipid membranlardan geri emilimini nasıl etkiler?', ar: 'كما تعلمنا في الوحدة 1، كيف يؤثر إدخال مجموعة هيدروكسيل (-OH) قطبية على إعادة امتصاص الدواء عبر الأغشية الدهنية؟' },
        false,
        { technicalTerms: [{ term: 'polarite artışı', arContext: 'زيادة القطبية' }] }
      ),
      makeStep('mc-mod5-les1-step-11', 'connection', 11,
        { tr: 'İleri Bağlantı: Faz II Konjugasyonu (Ders 10)', ar: 'ربط مفاهيمي: اقتران المرحلة الثانية (الدرس 10)' },
        { tr: 'Faz I ile açılan bu -OH kulpuna bir sonraki derste devasa ve yüksek oranda polar glukuronik asit bağlanacaktır.', ar: 'المقبض القطبي (-OH) الناتج من المرحلة الأولى سيرتبط في الدرس القادم بجزيء جلوكورونيك فائق القطبية.' },
        false,
        { technicalTerms: [{ term: 'Faz II konjugasyonu', arContext: 'اقتران المرحلة الثانية' }] }
      ),
      makeStep('mc-mod5-les1-step-12', 'mastery_check', 12,
        { tr: 'Ustalık Sınavı: Faz I Oksidasyon Mekanizması', ar: 'اختبار الإتقان: آلية أكسدة المرحلة الأولى' },
        { tr: 'Sitokrom P450 monooksijenaz döngüsünde 1 molekül O2 nin akıbeti nedir?', ar: 'في دورة CYP450 أحادية الأكسجين، ما هو مصير جزيء الأكسجين O2 المستهلك؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc51-9', text: { tr: '1 oksijen atomu substrata takılır, diğeri 2 elektron ve 2 proton alarak suya indirgenir.', ar: 'تدمج ذرة أكسجين واحدة في الدواء، بينما تختزل الذرة الأخرى بإلكترونين وبروتونين إلى ماء.' }, isCorrect: true },
              { id: 'opt-mc51-10', text: { tr: 'Her iki atom da substrata takılır.', ar: 'تدمج ذرتا الأكسجين معاً في ركيزة الدواء.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Ders başarıyla tamamlandı! 3 review cards eklendi. +50 XP.' }
        }
      )
    ]
  },

  // Lesson 10 / Mod 5 Les 2: mc-mod5-les2
  {
    id: 'mc-mod5-les2',
    courseId: 'medchem',
    moduleId: 'mc-mod-05',
    title: {
      tr: 'Faz II Konjugasyonu: Glukuronidasyon ve Sülfat Yolakları',
      ar: 'المرحلة الثانية: مسارات الاقتران بالجلوكورونيد والكبريتات'
    },
    order: 2,
    access: 'free',
    objective: {
      tr: 'UGT ve SULT enzim yolaklarını, kofaktör kinetiklerini ve polar konjugatların atılım mekanizmalarını karşılaştırmak.',
      ar: 'مقارنة مسارات إنزيمات UGT و SULT وحركية العوامل المساعدة وآليات إطراح المشتقات المقترنة القطبية.'
    },
    misconceptions: [
      {
        tr: 'Glukuronidasyon ve sülfasyonun eşit kapasiteye sahip olduğu yanılgısı (glukuronidasyon yüksek kapasiteli, sülfasyon düşük kapasitelidir).',
        ar: 'الاعتقاد الخاطئ بأن سعة الجلوكورونيد والكبريتات متساوية (الجلوكورونيد عالي السعة والكبريتات منخفض السعة).'
      }
    ],
    sources: [{ file: 'İlaç metabolizması-2026.pdf', page: 26 }],
    citations: [
      {
        id: 'CIT-MC10-01',
        book: "Foye's Principles of Medicinal Chemistry",
        edition: '8th ed.',
        topic: 'Phase II Conjugation: Glucuronidation and Sulfation',
        chapter: 'unverified',
        page: 'unverified',
        status: 'pending-human-review'
      }
    ],
    spacedReviewCards: [
      {
        cardId: 'mc-mod5-les2-card1',
        courseId: 'medchem',
        drugOrConcept: 'Glukuronidasyon Kofaktörü',
        prompt: 'UGT enzimlerinin kullandığı aktif glukuronik asit donörü kofaktör nedir?',
        answer: 'UDP-glukuronik asit (UDPGA).',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'mc-mod5-les2-card2',
        courseId: 'medchem',
        drugOrConcept: 'Sülfatlama Kofaktörü',
        prompt: 'Sülfotransferaz (SULT) enzimlerinin kullandığı aktif sülfat donörü molekül nedir?',
        answer: '3\'-Fosfoadenozin-5\'-fosfosülfat (PAPS).',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'mc-mod5-les2-card3',
        courseId: 'medchem',
        drugOrConcept: 'Parasetamol Doz Aşımı ve Glutatyon',
        prompt: 'Parasetamol aşırı dozda alındığında UGT ve SULT doyunca hangi toksik metabolit birikir ve hangi kofaktör tükenir?',
        answer: 'NAPQI toksik metaboliti birikir; koruyucu Glutatyon (GSH) tükenerek karaciğer nekrozu oluşur.',
        box: 1,
        intervalDays: 1
      }
    ],
    translations: {
      tr: { title: 'Faz II Konjugasyonu: Glukuronidasyon ve Sülfat Yolakları' },
      ar: { title: 'المرحلة الثانية: مسارات الاقتران بالجلوكورونيد والكبريتات' }
    },
    steps: [
      makeStep('mc-mod5-les2-step-01', 'hook', 1,
        { tr: 'Parasetamolün İki Kaderi', ar: 'مصيران لدواء الباراسيتامول' },
        { tr: 'Terapötik dozda güvenle atılan parasetamol, yüksek dozda alındığında neden aniden ölümcül bir karaciğer zehirine dönüşür?', ar: 'بينما يطرح Paracetamol بأمان بالجرعة العلاجية، لماذا يتحول فجأة عند الجرعة الزائدة إلى سم كبدي قاتل؟' },
        false,
        { technicalTerms: [{ term: 'konjugasyon kapasitesi', arContext: 'سعة الاقتران الاستقلابي' }] }
      ),
      makeStep('mc-mod5-les2-step-02', 'question', 2,
        { tr: 'Tahmin: Yüksek Kapasite vs Yüksek Afinite', ar: 'توقع: السعة العالية مقابل الألفة العالية' },
        { tr: 'Düşük doz parasetamolde sülfasyon mu yoksa glukuronidasyon mu daha baskındır?', ar: 'عند الجرعات المنخفضة من paracetamol، أيهما يكون المسار السائد: الكبريتات أم الجلوكورونيد؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc52-1', text: { tr: 'Sülfasyon baskındır çünkü SULT yüksek afiniteye (düşük Km) sahiptir.', ar: 'الكبريتات هي السائدة لامتلاك إنزيمات SULT ألفة عالية جداً (Km منخفض).' }, isCorrect: true },
              { id: 'opt-mc52-2', text: { tr: 'İkisi de çalışmaz.', ar: 'كلا المسارين لا يعمل.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Düşük dozda yüksek afiniteli SULT devrededir; doz arttıkça PAPS tükenir ve UGT devralır.' }
        }
      ),
      makeStep('mc-mod5-les2-step-03', 'intuition', 3,
        { tr: 'Sezgisel Analoji: Küçük Çöp Arabası ve Büyük Kamyon', ar: 'تشبيه حدسي: سيارة النفايات الصغيرة وشاحنة التفريغ الضخمة' },
        { tr: 'Sülfasyon çevik ama küçük bir arabadır, hemen dolar (düşük kapasite). Glukuronidasyon dev bir kamyondur, tonlarca atık taşır (yüksek kapasite).', ar: 'مسار الكبريتات كسيارة سريعة ممتلئة دوماً بسعة محدودة، بينما الجلوكورونيد كشاحنة عملاقة بسعة غير محدودة تقريباً.' },
        false,
        { technicalTerms: [{ term: 'glukuronidasyon', arContext: 'الاقتران بالجلوكورونيد' }] }
      ),
      makeStep('mc-mod5-les2-step-04', 'visual_explanation', 4,
        { tr: 'Konjugasyon Kimyası ve Kofaktörler', ar: 'كيمياء الاقتران والعوامل المساعدة' },
        { tr: 'UGT enzimi UDP-glukuronik asitten glukuronil grubunu SN2 ile substratın -OH grubuna aktarır; alfa bağ beta konfigürasyonuna döner.', ar: 'ينقل إنزيم UGT مجموعة الجلوكورونيل عبر تفاعل SN2 إلى -OH الدواء، فينقلب الارتباط من alfa إلى beta.' },
        false,
        { technicalTerms: [{ term: 'UDP-glukuronik asit', arContext: 'UDP-glucuronic acid' }] }
      ),
      makeStep('mc-mod5-les2-step-05', 'interactive_artifact', 5,
        { tr: 'İnteraktif Simülatör: Metabolism Map (Faz II)', ar: 'محاكي تفاعلي: خارطة الاستقلاب (المرحلة الثانية)' },
        { tr: 'Parasetamol dozunu 500 mg dan 5000 mg a çıkarın. PAPS ve GSH kofaktörlerinin tükenişini ve toksik NAPQI birikimini simüle edin.', ar: 'ارفع جرعة paracetamol من 500 mg إلى 5000 mg وشاهد نضوب PAPS و GSH وتراكم مادة NAPQI السامة على الخارطة.' },
        false,
        {
          widget: {
            type: 'MetabolismMap',
            config: { substrate: 'paracetamol', phase: 'phase_2_saturation', initialDoseMg: 500 }
          }
        }
      ),
      makeStep('mc-mod5-les2-step-06', 'guided_discovery', 6,
        { tr: 'Rehberli Keşif: Glutatyon Koruma Kalkanı', ar: 'استكشاف موجه: درع حماية الجلوتاثيون' },
        { tr: 'Simülatörde parasetamol dozu toksik eşiği aştığında CYP2E1 tarafından üretilen NAPQI ye karşı karaciğeri ne korur?', ar: 'عند تجاوز عتبة التسمم، ما الذي يحمي الكبد من سمية NAPQI الناتجة عن CYP2E1؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc52-3', text: { tr: 'Glutatyon (GSH) nükleofilik tiyol grubuyla NAPQI yi yakalayarak merkaptürik aside dönüştürür.', ar: 'الجلوتاثيون (GSH) عبر مجموعة الثيول النكليوفيلية يمسك بـ NAPQI ويحوله لمشتق حمض المركبتوريك.' }, isCorrect: true },
              { id: 'opt-mc52-4', text: { tr: 'Su molekülleri.', ar: 'جزيئات الماء البسيطة.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'GSH depoları yüzde 70 in altına indiğinde NAPQI karaciğer hücrelerini nekroza uğratır.' }
        }
      ),
      makeStep('mc-mod5-les2-step-07', 'formal_explanation', 7,
        { tr: 'UGT ve SULT Kinetik Karşılaştırması', ar: 'المقارنة الحركية بين UGT و SULT' },
        { tr: 'SULT: Düşük Km (yüksek afinite), düşük Vmax (kofaktör PAPS sentezi sınırlı). UGT: Yüksek Km, devasa Vmax (glikojen deposu sayesinde bol UDPGA).', ar: 'مسار SULT: ألفة عالية وسعة منخفضة لنضوب PAPS. مسار UGT: ألفة معتدلة وسعة استقلابية هائلة بفضل وفرة مخزون الجليكوجين.' },
        false,
        { technicalTerms: [{ term: 'Vmax', arContext: 'السرعة القصوى للتفاعل' }, { term: 'Km', arContext: 'ثابت مايكليس' }] }
      ),
      makeStep('mc-mod5-les2-step-08', 'concept_check', 8,
        { tr: 'Kavram Denetimi: Glukuronidlerin Fizikokimyasal Durumu', ar: 'فحص المفهوم: الحالة الفيزيوكيميائية للمقترنات' },
        { tr: 'Bir ilaca glukuronik asit bağlanması moleküle hangi fizikokimyasal özelliği kazandırır?', ar: 'ما الخاصية الفيزيوكيميائية الحاسمة التي يكتسبها الدواء عند ارتباط حمض الجلوكورونيك به؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc52-5', text: { tr: 'Karboksilat ve çoklu hidroksiller sayesinde fizyolojik pH ta tamamen iyonize ve aşırı hidrofilik hale gelir.', ar: 'يصبح متأيناً بالكامل وشديد الانحلال بالماء عند pH الفسيولوجي بفضل الكربوكسيل والهيدروكسيلات المتعددة.' }, isCorrect: true },
              { id: 'opt-mc52-6', text: { tr: 'Yağda çözünürlüğü artar.', ar: 'تزداد ذوبانيته في الدهون.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Glukuronidler böbrekten tübüler salgıyla ve safradan hızla dışarı atılır.' }
        }
      ),
      makeStep('mc-mod5-les2-step-09', 'application', 9,
        { tr: 'Klinik Antidot: N-Asetilsistein (NAC)', ar: 'الترياق السريري: N-Acetylcysteine (NAC)' },
        { tr: 'Parasetamol zehirlenmesinde ilk 8 saatte verilen N-asetilsistein (NAC) hayatı nasıl kurtarır?', ar: 'كيف ينقذ إعطاء N-acetylcysteine (NAC) خلال الساعات الـ 8 الأولى حياة مريض التسمم بالباراسيتامول؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc52-7', text: { tr: 'Hücre içi glutatyon (GSH) sentezi için sistein sağlayarak tükenen koruyucu kalkanı yeniden doldurur.', ar: 'يوفر السيستين لاصطناع الجلوتاثيون (GSH) داخلياً ويعيد بناء درع الحماية المستنفد.' }, isCorrect: true },
              { id: 'opt-mc52-8', text: { tr: 'Mideyi yıkar.', ar: 'يغسل المعدة ميكانيكياً.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'NAC parasetamol hepatotoksisitesinin mekanizmaya dayalı altın standart antidotudur.' }
        }
      ),
      makeStep('mc-mod5-les2-step-10', 'retrieval', 10,
        { tr: 'Geri Çağırma: Faz I Hidroksilasyon', ar: 'استرجاع معرفي: هدرلة المرحلة الأولى' },
        { tr: 'Bir önceki derste gördüğümüz gibi Faz I metabolizmasında substrata oksijen atomunu aktaran enzim kompleksi neydi?', ar: 'كما تعلمنا في الدرس السابق، ما هو المعقد الإنزيمي المسؤول عن إدخال ذرة الأكسجين في ركيزة الدواء بالمرحلة الأولى؟' },
        false,
        { technicalTerms: [{ term: 'sitokrom P450', arContext: 'إنزيمات CYP450' }] }
      ),
      makeStep('mc-mod5-les2-step-11', 'connection', 11,
        { tr: 'Ders Sonu Köprüsü: Farmakoloji Kursu Başlıyor', ar: 'جسر نهاية المساق: انطلاق مساق Farmakoloji' },
        { tr: 'Farmasötik Kimya derslerini başarıyla tamamladınız! Bu kimyasal ilkelerin canlı sistemlerdeki doz-yanıt ve ADME dinamiklerini Farmakoloji kursunda göreceğiz.', ar: 'تهانينا على إتمام مساق Farmasötik Kimya! سنرى هذه المبادئ الكيميائية في الأنظمة الحية ضمن مساق Farmakoloji.' },
        false,
        { technicalTerms: [{ term: 'farmakoloji', arContext: 'علم الأدوية (Farmakoloji)' }] }
      ),
      makeStep('mc-mod5-les2-step-12', 'mastery_check', 12,
        { tr: 'Kurs A Ustalık Sınavı: Faz II Metabolizması', ar: 'اختبار الإتقان النهائي لمساق الكيمياء: استقلاب المرحلة الثانية' },
        { tr: 'Vücutta ilaçların detoksifikasyonunda en yüksek kapasiteye sahip Faz II konjugasyon yolağı hangisidir?', ar: 'ما هو مسار اقتران المرحلة الثانية الذي يمتلك السعة الاستقلابية الأعلى لإزالة سمية الأدوية في الجسم؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-mc52-9', text: { tr: 'Glukuronidasyon (UGT yolağı).', ar: 'الاقتران بالجلوكورونيد (مسار إنزيمات UGT).' }, isCorrect: true },
              { id: 'opt-mc52-10', text: { tr: 'Metilasyon yolağı.', ar: 'مسار الميثلة (Methylation).' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Farmasötik Kimya Kursunun 10 dersi başarıyla tamamlandı! +50 XP.' }
        }
      )
    ]
  }
];

console.log('Medchem Modules 2 through 5 authored.');
