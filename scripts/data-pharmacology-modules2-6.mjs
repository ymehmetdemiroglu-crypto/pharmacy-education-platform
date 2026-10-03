/**
 * scripts/data-pharmacology-modules2-6.mjs
 * 
 * Lessons 3 through 12 of Course B: Farmakoloji.
 * Covers Modules 2 through 6 (2 lessons each = 10 lessons).
 */

import { makeStep } from './build-22-lessons.mjs';

export const pharmacologyModules2to6 = [
  // =========================================================================
  // MODULE 2: Farmakodinami ve Kantitatif Doz-Yanıt İlişkileri (ph-mod-02)
  // =========================================================================

  // Lesson 3 / Mod 2 Les 1: pharm-mod2-les1
  {
    id: 'pharm-mod2-les1',
    courseId: 'pharmacology',
    moduleId: 'ph-mod-02',
    title: {
      tr: 'Kademeli Doz-Yanıt Eğrileri ve İntrinsik Etkinlik',
      ar: 'منحنيات الجرعة والاستجابة التدرجية والفعالية الذاتية'
    },
    order: 1,
    access: 'free',
    objective: {
      tr: 'Agonistlerin etki gücü (EC50) ile intrinsik etkinlik (Emax) kavramlarını ayırmak ve yedek reseptör teorisini kavramak.',
      ar: 'التمييز بين قوة الدواء (EC50) والفعالية الذاتية (Emax) وفهم نظرية المستقبِلات الاحتياطية.'
    },
    misconceptions: [
      {
        tr: 'Daha güçlü (potensi yüksek) bir ilacın her zaman daha büyük bir maksimum biyolojik etki (Emax) üreteceği yanılgısı.',
        ar: 'الاعتقاد الخاطئ بأن الدواء الأكثر قوة (potency) يحقق حتماً استجابة حيوية أعظمية (Emax) أكبر.'
      }
    ],
    sources: [{ file: 'Farmakodinami-Doz Yanıt.pdf', page: 12 }],
    citations: [
      {
        id: 'CIT-PH03-01',
        book: "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
        edition: '14th ed.',
        topic: 'Graded Dose-Response Relationships and Spare Receptors',
        chapter: 'unverified',
        page: 'unverified',
        status: 'pending-human-review'
      }
    ],
    spacedReviewCards: [
      {
        cardId: 'pharm-mod2-les1-card1',
        courseId: 'pharmacology',
        drugOrConcept: 'Potens vs Efikasite',
        prompt: 'Bir ilacın potensi EC50 ile, efikasitesi (maksimum etkinliği) hangi parametreyle ölçülür?',
        answer: 'Potens EC50 (eğrinin yatay konumu), efikasite Emax (eğrinin dikey tavanı) ile ölçülür.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'pharm-mod2-les1-card2',
        courseId: 'pharmacology',
        drugOrConcept: 'Parsiyel Agonist Tanımı',
        prompt: 'Tüm reseptörleri doldursa bile tam agonist kadar maksimum yanıt üretemeyen ilaca ne ad verilir?',
        answer: 'Parsiyel agonist (kısmi agonist; intrinsik aktivitesi 0 < alpha < 1).',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'pharm-mod2-les1-card3',
        courseId: 'pharmacology',
        drugOrConcept: 'Yedek Reseptör (Spare Receptor)',
        prompt: 'Bir dokuda maksimum yanıt için reseptörlerin yalnızca %10 u yetiyorsa kalan %90 a ne ad verilir?',
        answer: 'Yedek reseptörler (Receptor Reserve). Bu dokularda EC50 değeri Kd den belirgin küçüktür.',
        box: 1,
        intervalDays: 1
      }
    ],
    translations: {
      tr: { title: 'Kademeli Doz-Yanıt Eğrileri ve İntrinsik Etkinlik' },
      ar: { title: 'منحنيات الجرعة والاستجابة التدرجية والفعالية الذاتية' }
    },
    steps: [
      makeStep('pharm-mod2-les1-step-01', 'hook', 1,
        { tr: 'Yarış Arabası ve Yük Treni', ar: 'سيارة السباق وقطار البضائع' },
        { tr: 'Fentanil morfinden 100 kat daha az dozla ağrıyı keser; buprenorfin ise morfinden daha sıkı bağlanmasına rağmen solunumu asla durdurmaz. Neden?', ar: 'يسكن Fentanyl الألم بجرعة أقل بـ 100 ضعف من المورفين؛ بينما يرتبط Buprenorphine أشد دون أن يثبط التنفس كلياً. لماذا؟' },
        false,
        { technicalTerms: [{ term: 'potens', arContext: 'القوة الدوائية' }, { term: 'efikasite', arContext: 'الفعالية القصوى' }] }
      ),
      makeStep('pharm-mod2-les1-step-02', 'question', 2,
        { tr: 'Tahmin: Potens mi Etkinlik mi?', ar: 'توقع: القوة أم الفعالية؟' },
        { tr: 'Daha düşük dozda (daha küçük EC50) etki gösteren bir ilaç mutlaka daha yüksek bir maksimum yanıta (Emax) ulaşır mı?', ar: 'هل الدواء الذي يعمل بجرعة أقل (EC50 أصغر) يحقق بالضرورة استجابة قصوى أعظم (Emax)؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph21-1', text: { tr: 'Hayır, potens yatay eksendedir; Emax ise intrinsik etkinliğe bağlı dikey tavandır.', ar: 'لا، فالقوة على المحور الأفقي بينما يمثل Emax السقف الرأسي للفعالية الذاتية.' }, isCorrect: true },
              { id: 'opt-ph21-2', text: { tr: 'Evet, potensi yüksek olan her zaman daha etkilidir.', ar: 'نعم، فالأكثر قوة هو دائماً الأكثر فعالية مطلقة.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Potens (EC50) ve Efikasite (Emax) tamamen bağımsız farmakolojik özelliklerdir.' }
        }
      ),
      makeStep('pharm-mod2-les1-step-03', 'intuition', 3,
        { tr: 'Sezgisel Analoji: Gaz Pedalı vs Tavan Hızı', ar: 'تشبيه حدسي: دواسة الوقود مقابل السرعة القصوى' },
        { tr: 'Spor araba hafifçe basınca hızlanır (yüksek potens), ama bir kamyon daha ağır gitse de 50 ton yük taşır (yüksek efikasite).', ar: 'تتسارع سيارة السباق بأدنى ضغطة وقود (قوة عالية)، لكن شاحنة البضائع تنقل حمولة 50 طناً رغم بطئها (فعالية عالية).' },
        false,
        { technicalTerms: [{ term: 'intrinsik etkinlik', arContext: 'الفعالية الذاتية' }] }
      ),
      makeStep('pharm-mod2-les1-step-04', 'visual_explanation', 4,
        { tr: 'Yarı-Logaritmik Sigmoidal Eğri', ar: 'المنحنى اللوغاريتمي السيني' },
        { tr: 'Doz logaritmik eksende çizildiğinde eğri S şeklini alır. Orta nokta EC50 yi (potens), plato yüksekliği ise Emax ı (etkinlik) verir.', ar: 'برسم الجرعة لوغاريتمياً يتشكل منحنى سيني S. تمثل نقطة المنتصف EC50 (القوة)، بينما يعطي ارتفاع السقف Emax (الفعالية).' },
        false,
        { technicalTerms: [{ term: 'EC50', arContext: 'التركيز الفعال النصفي EC50' }, { term: 'Emax', arContext: 'الاستجابة القصوى Emax' }] }
      ),
      makeStep('pharm-mod2-les1-step-05', 'interactive_artifact', 5,
        { tr: 'İnteraktif Simülatör: Dose-Response Curve Modulator', ar: 'محاكي تفاعلي: معدل منحنى الجرعة والاستجابة' },
        { tr: 'Agonist konsantrasyonunu değiştirin. Parsiyel agonist (alpha = 0.5) seçerek eğri tavanının nasıl çöktüğünü gözlemleyin.', ar: 'عدل تركيز المشبه. اختر مشبهاً جزئياً (alpha = 0.5) ولاحظ كيف يهبط سقف المنحنى رأسياً.' },
        false,
        {
          widget: {
            type: 'DoseResponseCurve',
            config: { mode: 'agonist_intrinsic_efficacy', baselineEC50: 1e-7, spareReceptorsPercent: 0 }
          }
        }
      ),
      makeStep('pharm-mod2-les1-step-06', 'guided_discovery', 6,
        { tr: 'Rehberli Keşif: Yedek Reseptörlerin Gücü', ar: 'استكشاف موجه: قوة المستقبِلات الاحتياطية' },
        { tr: 'Simülatörde yedek reseptör sürgüsünü %80 e getirin. Maksimum yanıta ulaşmak için reseptörlerin ne kadarını doldurmak yetti?', ar: 'اضبط زالق المستقبِلات الاحتياطية على 80%. كم نسبة إشغال المستقبلات الكافية لبلوغ الاستجابة القصوى التامة؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph21-3', text: { tr: 'Yalnızca %20 dolulukla %100 doku yanıtı alındı; EC50 sola kayarak potens arttı.', ar: 'كفى إشغال 20% فقط لتحقيق 100% من الاستجابة؛ وانزاح EC50 يساراً بازدياد القوة.' }, isCorrect: true },
              { id: 'opt-ph21-4', text: { tr: 'Hala %100 doluluk gerekir.', ar: 'ما زال يتطلب إشغال 100% بالكامل.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Yedek reseptörler hücre içi sinyal amplifikasyonu sağlayarak sistemi aşırı duyarlı kılar.' }
        }
      ),
      makeStep('pharm-mod2-les1-step-07', 'formal_explanation', 7,
        { tr: 'Stephenson ve Furchgott Reseptör Teorisi', ar: 'نظرية Stephenson و Furchgott للمستقبلات' },
        { tr: 'Yanıt = f(S * [L] / ([L] + Kd)). İntrinsik etkinlik (e) doku faktörüyle çarpılarak stimülüsü üretir. Parsiyel agonistte e düşüktür.', ar: 'الاستجابة = f(S * [L] / ([L] + Kd)). تضرب الفعالية الذاتية بعامل التضخيم النسيجي لتوليد المنبه الخلوي.' },
        false,
        { technicalTerms: [{ term: 'yedek reseptör', arContext: 'المستقبِلات الاحتياطية' }] }
      ),
      makeStep('pharm-mod2-les1-step-08', 'concept_check', 8,
        { tr: 'Kavram Denetimi: Parsiyel Agonistin Çift Karakteri', ar: 'فحص المفهوم: ازدواجية المشبه الجزئي' },
        { tr: 'Ortamda yüksek doz tam agonist (morfin) varken parsiyel agonist (buprenorfin) eklenirse ne olur?', ar: 'بوجود تركيز عالٍ من مشبه تام (Morphine)، ماذا يحدث عند إضافة مشبه جزئي (Buprenorphine)؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph21-5', text: { tr: 'Reseptörleri kaparak tam agonisti kovar ve yanıtı düşürerek antagonist gibi davranır.', ar: 'يزاحم المشبه التام على المستقبلات ويهبط بالاستجابة متصرفاً كمناهض (antagonist).' }, isCorrect: true },
              { id: 'opt-ph21-6', text: { tr: 'Etki ikiye katlanır.', ar: 'يتضاعف التأثير إلى الضعف.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Parsiyel agonistler tam agonistin yanında yarışmalı antagonist gibi davranırlar.' }
        }
      ),
      makeStep('pharm-mod2-les1-step-09', 'application', 9,
        { tr: 'Klinik Uygulama: Opioid Yoksunluk Tedavisi', ar: 'تطبيق سريري: علاج الإدمان على الأفيونات' },
        { tr: 'Buprenorfin eroin bağımlılığında neden tercih edilir? Yüksek afiniteyle krizi önlerken sub-maksimal efikasiteyle solunumu korur.', ar: 'لماذا يفضل Buprenorphine في علاج إدمان الهيروين؟ يمنع أعراض الانسحاب بألفته العالية ويحمي التنفس بفعاليته الجزئية.' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph21-7', text: { tr: 'Tavan etkisi (ceiling effect) sayesinde ölümcül solunum depresyonu yapmaz.', ar: 'بفضل تأثير السقف (ceiling effect) يمنع حدوث تثبيط تنفسي مميت.' }, isCorrect: true },
              { id: 'opt-ph21-8', text: { tr: 'Vücuttan 5 dakikada atıldığı için.', ar: 'لأنه يطرح من الجسم خلال 5 دقائق.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Parsiyel agonizma geniş bir terapötik güvenlik penceresi sunar.' }
        }
      ),
      makeStep('pharm-mod2-les1-step-10', 'retrieval', 10,
        { tr: 'Geri Çağırma: Kd Ayrışma Sabiti', ar: 'استرجاع معرفي: ثابت التفكك Kd' },
        { tr: 'Modül 1 de gördüğümüz gibi reseptörlerin yarısının bağlandığı serbest ligand konsantrasyonuna ne ad veriliyordu?', ar: 'كما رأينا في الوحدة 1، ما هو تركيز الربيط الحر الذي يشغل نصف المستقبِلات تماماً؟' },
        false,
        { technicalTerms: [{ term: 'Kd sabiti', arContext: 'ثابت Kd' }] }
      ),
      makeStep('pharm-mod2-les1-step-11', 'connection', 11,
        { tr: 'İleri Bağlantı: Reseptör Antagonizmi ve Blokaj (Ders 4)', ar: 'ربط مفاهيمي: مناهضة المستقبِلات والحصار (الدرس 4)' },
        { tr: 'Agonistlerin yanıtını sıfırlayan veya eğriyi sağa kaydıran antagonistleri bir sonraki derste Schild analiziyle öğreneceğiz.', ar: 'في الدرس القادم، سنتعلم كيف تصفر المناهضات (antagonist) الاستجابة أو تزيح المنحنى يميناً عبر تحليل Schild.' },
        false,
        { technicalTerms: [{ term: 'antagonist', arContext: 'المناهض (Antagonist)' }] }
      ),
      makeStep('pharm-mod2-les1-step-12', 'mastery_check', 12,
        { tr: 'Ustalık Sınavı: Potens ve Efikasite Ayrımı', ar: 'اختبار الإتقان: التفريق بين القوة والفعالية' },
        { tr: 'Doz-yanıt eğrisinde ilacın sol veya sağda yer alması neyi, eğrinin ulaştığı maksimum tavan yüksekliği neyi gösterir?', ar: 'في منحنى الجرعة والاستجابة، ماذا يمثل تموضع المنحنى يميناً أو يساراً، وماذا يمثل ارتفاع سقفه الأعظمي؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph21-9', text: { tr: 'Yatay konum potenstir (EC50); dikey tavan efikasitedir (Emax).', ar: 'الموقع الأفقي يمثل القوة (EC50)؛ والسقف الرأسي يمثل الفعالية (Emax).' }, isCorrect: true },
              { id: 'opt-ph21-10', text: { tr: 'Her ikisi de potenstir.', ar: 'كلاهما يعبران عن القوة فقط.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Ders başarıyla tamamlandı! 3 review cards eklendi. +50 XP.' }
        }
      )
    ]
  },

  // Lesson 4 / Mod 2 Les 2: pharm-mod2-les2
  {
    id: 'pharm-mod2-les2',
    courseId: 'pharmacology',
    moduleId: 'ph-mod-02',
    title: {
      tr: 'Reseptör Antagonizmi: Yarışmalı ve Yarışmasız Blokaj',
      ar: 'مناهضة المستقبِلات: الحصار التنافسي وغير التنافسي'
    },
    order: 2,
    access: 'free',
    objective: {
      tr: 'Yarışmalı (kompetitif) ve yarışmasız (non-kompetitif) antagonistlerin eğri üzerindeki etkilerini Schild denklemiyle ayırt etmek.',
      ar: 'التمييز بين الحصار التنافسي وغير التنافسي على منحنى الاستجابة باستخدام معادلة Schild.'
    },
    misconceptions: [
      {
        tr: 'Yarışmasız (non-kompetitif) blokajın daha fazla agonist verilerek aşılabileceği yanılgısı.',
        ar: 'الاعتقاد الخاطئ بإمكانية تجاوز الحصار غير التنافسي بمجرد زيادة جرعة المشبه.'
      }
    ],
    sources: [{ file: 'Farmakodinami-Doz Yanıt.pdf', page: 28 }],
    citations: [
      {
        id: 'CIT-PH04-01',
        book: "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
        edition: '14th ed.',
        topic: 'Receptor Antagonism: Competitive, Noncompetitive, and Schild Analysis',
        chapter: 'unverified',
        page: 'unverified',
        status: 'pending-human-review'
      }
    ],
    spacedReviewCards: [
      {
        cardId: 'pharm-mod2-les2-card1',
        courseId: 'pharmacology',
        drugOrConcept: 'Yarışmalı Antagonist Belirtisi',
        prompt: 'Yarışmalı (kompetitif) bir antagonist doz-yanıt eğrisinde ne tür bir değişim yaratır?',
        answer: 'Emax ı değiştirmeden eğriyi paralel olarak sağa kaydırır (görünür EC50 artar).',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'pharm-mod2-les2-card2',
        courseId: 'pharmacology',
        drugOrConcept: 'Yarışmasız Antagonist Belirtisi',
        prompt: 'Yarışmasız (non-kompetitif) veya geri dönüşsüz antagonist eğride ne yapar?',
        answer: 'Maksimum yanıtı (Emax) aşılmaz biçimde aşağı bastırır (depresyon).',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'pharm-mod2-les2-card3',
        courseId: 'pharmacology',
        drugOrConcept: 'Schild Denklemi ve Eğim',
        prompt: 'Gerçek bir yarışmalı antagonistin Schild grafiğindeki doğrusunun eğimi tam olarak kaçtır?',
        answer: 'Eğim tam olarak 1.0 dir; x-kesişimi -log(Kb) afinitesini verir.',
        box: 1,
        intervalDays: 1
      }
    ],
    translations: {
      tr: { title: 'Reseptör Antagonizmi: Yarışmalı ve Yarışmasız Blokaj' },
      ar: { title: 'مناهضة المستقبِلات: الحصار التنافسي وغير التنافسي' }
    },
    steps: [
      makeStep('pharm-mod2-les2-step-01', 'hook', 1,
        { tr: 'Nalokson Mucizesi', ar: 'معجزة الترياق Naloxone' },
        { tr: 'Aşırı doz morfinden nefesi durmuş komadaki bir hasta, tek bir nalokson enjeksiyonuyla 60 saniyede nasıl ayağa fırlar?', ar: 'مريض في غيبوبة توقف تنفسه بجرعة مفرطة من المورفين، كيف يستيقظ في 60 ثانية بحقنة Naloxone واحدة؟' },
        false,
        { technicalTerms: [{ term: 'antagonist', arContext: 'المناهض (Antagonist)' }] }
      ),
      makeStep('pharm-mod2-les2-step-02', 'question', 2,
        { tr: 'Tahmin: Yarışmalı Engel Aşılabilir mi?', ar: 'توقع: هل يمكن تجاوز الحصار التنافسي؟' },
        { tr: 'Ortamda yarışmalı bir antagonist varken agonist dozunu yeterince artırırsak eski maksimum yanıta (%100 Emax) ulaşabilir miyiz?', ar: 'بوجود مناهض تنافسي، إذا رفعنا جرعة المشبه بشكل كافٍ، هل يمكن الوصول لنفس الاستجابة القصوى (100% Emax)؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph22-1', text: { tr: 'Evet, yarışmalı blokaj agonist konsantrasyonu artırılarak tamamen aşılabilir (surmountable).', ar: 'نعم، فالحصار التنافسي يمكن تجاوزه بالكامل بزيادة تركيز المشبه (surmountable).' }, isCorrect: true },
              { id: 'opt-ph22-2', text: { tr: 'Hayır, tavan asla aşılamaz.', ar: 'لا، فالسقف لا يمكن بلوغه مطلقاً.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Yarışmalı antagonistler aynı cebi paylaşır; agonisti artırmak antagonisti kovar.' }
        }
      ),
      makeStep('pharm-mod2-les2-step-03', 'intuition', 3,
        { tr: 'Sezgisel Analoji: Kırık Anahtar vs Kapıyı Kaynatmak', ar: 'تشبيه حدسي: مفتاح مكسور مقابل لحام الباب' },
        { tr: 'Yarışmalı blokaj deliğe takılan yabancı anahtardır, iterek çıkarabilirsiniz. Yarışmasız blokaj ise kapıyı kaynakla kilitlemektir; anahtar artık faydasızdır.', ar: 'الحصار التنافسي مفتاح غريب في القفل يمكنك دفعه للخارج. الحصار غير التنافسي لحام الباب بالحديد؛ المفتاح أصبح بلا فائدة.' },
        false,
        { technicalTerms: [{ term: 'yarışmalı blokaj', arContext: 'الحصار التنافسي' }] }
      ),
      makeStep('pharm-mod2-les2-step-04', 'visual_explanation', 4,
        { tr: 'Eğrinin Sağa Kayması vs Tavan Depresyonu', ar: 'إزاحة المنحنى يميناً مقابل هبوط السقف' },
        { tr: 'Yarışmalı antagonist eğriyi sağa kaydırır (paralel sağa kayma). Yarışmasız antagonist ise eğri tavanını aşağı çökertir (Emax depresyonu).', ar: 'المناهض التنافسي يزيح المنحنى يميناً بشكل موازٍ، بينما يخفض المناهض غير التنافسي سقف المنحنى رأسياً.' },
        false,
        { technicalTerms: [{ term: 'sağa kayma', arContext: 'الإزاحة لليمين' }, { term: 'Emax depresyonu', arContext: 'هبوط Emax' }] }
      ),
      makeStep('pharm-mod2-les2-step-05', 'interactive_artifact', 5,
        { tr: 'İnteraktif Simülatör: Dose-Response Modulator (Antagonizm)', ar: 'محاكي تفاعلي: معدل الجرعة والاستجابة (المناهضة)' },
        { tr: 'Yarışmalı antagonist dozunu artırarak sağa paralel kaymayı izleyin. Ardından non-kompetitif modu açarak tavanın çöküşünü test edin.', ar: 'ارفع جرعة المناهض التنافسي لمشاهدة الإزاحة المتوازية لليمين، ثم بدل للنمط غير التنافسي لمراقبة انهيار سقف الاستجابة.' },
        false,
        {
          widget: {
            type: 'DoseResponseCurve',
            config: { mode: 'antagonist_comparison', antagonistType: 'competitive', antagonistConcentrations: [0, 1e-8, 1e-7, 1e-6] }
          }
        }
      ),
      makeStep('pharm-mod2-les2-step-06', 'guided_discovery', 6,
        { tr: 'Rehberli Keşif: Schild Denklem Eğim Analizi', ar: 'استكشاف موجه: تحليل ميل معادلة Schild' },
        { tr: 'Simülatörde Schild çekmecesini açın. log(Doz Oranı - 1) grafiğinde eğimin tam olarak 1.0 olması neyi kanıtlar?', ar: 'افتح درج Schild في المحاكي. ما الذي يثبته كون ميل الخط البياني مساوياً لـ 1.0 تماماً؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph22-3', text: { tr: 'Antagonistin tek bir reseptör bölgesine 1:1 oranında yarışmalı bağlandığını.', ar: 'ارتباط المناهض بموقع مستقبلي واحد بنسبة تنافسية نقية 1:1.' }, isCorrect: true },
              { id: 'opt-ph22-4', text: { tr: 'İlacın zehirli olduğunu.', ar: 'أن الدواء سام وغير فعال.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Schild eğiminin 1.0 olması yarışmalı tek bölgeli bağlanmanın matematiksel kanıtıdır.' }
        }
      ),
      makeStep('pharm-mod2-les2-step-07', 'formal_explanation', 7,
        { tr: 'Gaddum ve Schild Eşitlikleri', ar: 'معادلتا Gaddum و Schild' },
        { tr: 'Doz Oranı (DR) = 1 + [B] / Kb. log(DR - 1) = log[B] - log(Kb). X-kesişimi pA2 = -log(Kb) antagonist afinitesini verir.', ar: 'نسبة الجرعة DR = 1 + [B] / Kb. تمثل نقطة تقاطع المحور السيني pA2 = -log(Kb) الألفة الدقيقة للمناهض.' },
        false,
        { technicalTerms: [{ term: 'Schild analizi', arContext: 'تحليل Schild' }, { term: 'pA2', arContext: 'معامل pA2' }] }
      ),
      makeStep('pharm-mod2-les2-step-08', 'concept_check', 8,
        { tr: 'Kavram Denetimi: Geri Dönüşsüz Kovalent İnhibisyon', ar: 'فحص المفهوم: التثبيط التساهمي غير العكوس' },
        { tr: 'Aspirin siklooksijenaz-1 (COX-1) enzimini kovalent olarak asetiller. Trombositlerde bu inhibisyon ne zaman sonlanır?', ar: 'يؤستل Aspirin إنزيم COX-1 برابطة تساهمية. متى ينتهي هذا التثبيط في الصفيحات الدموية؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph22-5', text: { tr: 'Trombositler çekirdeksiz olduğundan yeni enzim üretemez; trombositin 8-10 günlük ömrü bitene kadar sürer.', ar: 'بما أن الصفيحات عديمة النواة فلا تصنع إنزيماً جديداً؛ ويستمر التثبيط طوال عمر الصفيحة (8-10 أيام).' }, isCorrect: true },
              { id: 'opt-ph22-6', text: { tr: '2 saat sonra ilaç yıkanınca biter.', ar: 'ينتهي بعد ساعتين بزوال الدواء من الدم.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Kovalent antagonizma yeni reseptör/enzim sentezlenene kadar kalıcıdır.' }
        }
      ),
      makeStep('pharm-mod2-les2-step-09', 'application', 9,
        { tr: 'Klinik Karar: Feokromositomada Fenoksibenzamin', ar: 'قرار سريري: Phenoxybenzamine في ورم القواتم' },
        { tr: 'Adrenalin fırtınası üreten feokromositoma ameliyatında neden yarışmalı prazosin yerine kovalent fenoksibenzamin tercih edilir?', ar: 'في جراحة ورم القواتم المفرز للأدرينالين، لماذا يفضل Phenoxybenzamine التساهمي على Prazosin التنافسي؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph22-7', text: { tr: 'Tümörden fırlayan devasa katekolamin dalgaları kovalent kilitlenmiş reseptörü aşamaz.', ar: 'لأن أمواج الكاتيكولامينات العاتية المفاجئة تعجز عن إزاحة الحصار التساهمي المقفل.' }, isCorrect: true },
              { id: 'opt-ph22-8', text: { tr: 'Fenoksibenzamin daha ucuzdur.', ar: 'لأن الفينوكسي بنزامين أرخص ثمناً.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Geri dönüşsüz antagonistler aşırı agonist dalgalanmalarına karşı kesin koruma sağlar.' }
        }
      ),
      makeStep('pharm-mod2-les2-step-10', 'retrieval', 10,
        { tr: 'Geri Çağırma: Tam Agonist ve Parsiyel Agonist', ar: 'استرجاع معرفي: المشبه التام والجزئي' },
        { tr: 'Bir önceki derste gördüğümüz gibi intrinsik etkinliği sıfır olan bir ligand hangi temel farmakolojik sınıfa girer?', ar: 'كما رأينا في الدرس السابق، إلى أي فئة فارماكولوجية ينتمي الربيط الذي يمتلك فعالية ذاتية مساوية للصفر تماماً؟' },
        false,
        { technicalTerms: [{ term: 'saf antagonist', arContext: 'المناهض الصرف' }] }
      ),
      makeStep('pharm-mod2-les2-step-11', 'connection', 11,
        { tr: 'İleri Bağlantı: Farmakokinetik ve Klerens (Modül 3)', ar: 'ربط مفاهيمي: حركية الدواء والتصفية (الوحدة 3)' },
        { tr: 'İlacın reseptördeki dinamiklerini tamamladık. Peki ilacın kandaki konsantrasyonu zamanla nasıl azalır? Modül 3 te farmakokinetiği (ADME) başlatıyoruz.', ar: 'أكملنا ديناميكا الدواء على المستقبل. كيف يتغير تركيز الدواء في الدم مع الزمن؟ في الوحدة 3، ننطلق في حركية الدواء (ADME).' },
        false,
        { technicalTerms: [{ term: 'farmakokinetik', arContext: 'حركية الدواء (ADME)' }] }
      ),
      makeStep('pharm-mod2-les2-step-12', 'mastery_check', 12,
        { tr: 'Ustalık Sınavı: Antagonizma Tipleri', ar: 'اختبار الإتقان: أنماط المناهضة' },
        { tr: 'Bir antagonist eklendiğinde agonist eğrisi paralel olarak sağa kayıyor fakat maksimum yanıt (Emax) değişmiyorsa bu hangi tür blokajdır?', ar: 'عند إضافة مناهض، إذا انزاح منحنى المشبه يميناً بشكل متوازٍ دون أي هبوط في Emax، فما هو نمط هذا الحصار؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph22-9', text: { tr: 'Tersinir yarışmalı (kompetitif) antagonizma.', ar: 'مناهضة تنافسية عكوسة (Competitive).' }, isCorrect: true },
              { id: 'opt-ph22-10', text: { tr: 'Yarışmasız geri dönüşsüz antagonizma.', ar: 'مناهضة غير تنافسية دائمة.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Modül 2 tamamlandı! 3 review cards eklendi. +50 XP.' }
        }
      )
    ]
  },

  // =========================================================================
  // MODULE 3: Farmakokinetik: ADME (ph-mod-03)
  // =========================================================================

  // Lesson 5 / Mod 3 Les 1: pharm-mod3-les1
  {
    id: 'pharm-mod3-les1',
    courseId: 'pharmacology',
    moduleId: 'ph-mod-03',
    title: {
      tr: 'Tek Kompartmanlı Farmakokinetik: Klerens ve Yarılanma Ömrü',
      ar: 'حركية الدواء في نموذج الحجيرة الواحدة: التصفية وعمر النصف'
    },
    order: 1,
    access: 'free',
    objective: {
      tr: 'Tek kompartmanlı modelde dağılım hacmi (Vd), klerens (CL) ve eliminasyon yarılanma ömrü (t1/2) arasındaki matematiksel ilişkiyi yönetmek.',
      ar: 'إتقان العلاقة الرياضية بين حجم التوزع (Vd) والتصفية (CL) وعمر النصف الإطراحي (t1/2) في نموذج الحجيرة الواحدة.'
    },
    misconceptions: [
      {
        tr: 'İnfüzyon hızını artırmanın kararlı duruma (steady-state) ulaşma süresini kısalttığı yanılgısı (kararlı duruma ulaşma süresi yalnızca t1/2 ye bağlıdır).',
        ar: 'الظن الخاطئ بأن تسريع معدل التسريب يقلل الزمن اللازم لبلوغ الحالة المستقرة (الزمن محكوم حصراً بـ t1/2).'
      }
    ],
    sources: [{ file: 'İlaç metabolizması-2026.pdf', page: 34 }],
    citations: [
      {
        id: 'CIT-PH05-01',
        book: "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
        edition: '14th ed.',
        topic: 'Pharmacokinetics: Volume of Distribution, Clearance, and Half-Life',
        chapter: 'unverified',
        page: 'unverified',
        status: 'pending-human-review'
      }
    ],
    spacedReviewCards: [
      {
        cardId: 'pharm-mod3-les1-card1',
        courseId: 'pharmacology',
        drugOrConcept: 'Yarılanma Ömrü Formülü',
        prompt: 'Eliminasyon yarılanma ömrü (t1/2) Vd ve CL cinsinden nasıl hesaplanır?',
        answer: 't1/2 = 0.693 x Vd / CL.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'pharm-mod3-les1-card2',
        courseId: 'pharmacology',
        drugOrConcept: 'Kararlı Duruma Ulaşma Kuralı',
        prompt: 'Sürekli infüzyonda kararlı durum plazma konsantrasyonunun (Css) %95 inden fazlasına kaç yarı ömürde ulaşılır?',
        answer: 'Yaklaşık 4 ila 5 yarılanma ömrü (t1/2) süresinde.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'pharm-mod3-les1-card3',
        courseId: 'pharmacology',
        drugOrConcept: 'Dağılım Hacmi Anlamı (Vd)',
        prompt: 'Bir ilacın Vd si 500 Litre çıkarsa bu ne anlama gelir?',
        answer: 'İlaç plazmadan çıkıp derin dokulara ve yağlara aşırı derecede dağılmıştır (görünür hacim).',
        box: 1,
        intervalDays: 1
      }
    ],
    translations: {
      tr: { title: 'Tek Kompartmanlı Farmakokinetik: Klerens ve Yarılanma Ömrü' },
      ar: { title: 'حركية الدواء في نموذج الحجيرة الواحدة: التصفية وعمر النصف' }
    },
    steps: [
      makeStep('pharm-mod3-les1-step-01', 'hook', 1,
        { tr: 'Vücuttan Büyük Bir Hacim Mümkün mü?', ar: 'هل يمكن لحجم الدواء أن يتجاوز حجم الجسم؟' },
        { tr: '70 kg lık bir insanın vücut suyu 42 litredir. Peki klorokinin dağılım hacmi (Vd) nasıl 15.000 litre çıkabilir?', ar: 'يبلغ ماء جسم الإنسان بوزن 70 كغ حوالي 42 لتراً. كيف يمكن لحجم توزع Chloroquine أن يبلغ 15,000 لتر؟' },
        false,
        { technicalTerms: [{ term: 'dağılım hacmi', arContext: 'حجم التوزع الظاهري Vd' }] }
      ),
      makeStep('pharm-mod3-les1-step-02', 'question', 2,
        { tr: 'Tahmin: Yarılanma Ömrünü Kim Belirler?', ar: 'توقع: ما الذي يحدد عمر النصف؟' },
        { tr: 'Bir ilacın klerensi (CL) yarıya düşer, dağılım hacmi (Vd) ise iki katına çıkarsa eliminasyon yarılanma ömrü (t1/2) ne olur?', ar: 'إذا انخفضت تصفية دواء (CL) إلى النصف وتضاعف حجم توقعه (Vd)، فماذا يحدث لعمر النصف الإطراحي (t1/2)؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph31-1', text: { tr: 'Tam 4 kat uzar (t1/2 = 0.693 x Vd / CL).', ar: 'يتضاعف 4 مرات تماماً (t1/2 = 0.693 x Vd / CL).' }, isCorrect: true },
              { id: 'opt-ph31-2', text: { tr: 'Değişmez.', ar: 'يبقى ثابتاً دون تغيير.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Pay 2 katına çıkıp payda yarıya indiği için yarı ömür 4 kat uzar.' }
        }
      ),
      makeStep('pharm-mod3-les1-step-03', 'intuition', 3,
        { tr: 'Sezgisel Analoji: Delikli Havuz ve Sünger', ar: 'تشبيه حدسي: الحوض المثقوب والإسفنج' },
        { tr: 'Vd suyu çeken süngerlerin büyüklüğüdür; CL havuzun tahliye deliğidir. Sünger büyük ve delik küçükse suyun boşalması saatler sürer.', ar: 'حجم Vd هو إسفنج يمتص الماء من الحوض؛ والتصفية CL ثقب التصريف. إذا كبر الإسفنج وضاق الثقب يستغرق التفريغ ساعات طويلة.' },
        false,
        { technicalTerms: [{ term: 'klerens', arContext: 'التصفية الحيوية CL' }] }
      ),
      makeStep('pharm-mod3-les1-step-04', 'visual_explanation', 4,
        { tr: 'Plazma Konsantrasyon-Zaman Eğrisi', ar: 'منحنى تركيز البلازما مقابل الزمن' },
        { tr: 'IV bolus sonrası konsantrasyon üstel olarak düşer: C(t) = C0 * e^(-ke * t). Yarı-logaritmik grafikte eğim -ke yi verir.', ar: 'بعد الحقن الوريدي يهبط التركيز أسياً: C(t) = C0 * e^(-ke * t). يعطي ميل المنحنى شبه اللوغاريتمي معدل الإطراح -ke.' },
        false,
        { technicalTerms: [{ term: 'eliminasyon hız sabiti', arContext: 'ثابت سرعة الإطراح ke' }] }
      ),
      makeStep('pharm-mod3-les1-step-05', 'interactive_artifact', 5,
        { tr: 'İnteraktif Simülatör: One-Compartment PK Simulator', ar: 'محاكي تفاعلي: حركية نموذج الحجيرة الواحدة' },
        { tr: 'Doz, Vd ve klerens değerlerini değiştirin. Tekrarlayan dozlarda ilacın plazmada 4-5 yarı ömürde kararlı duruma (Css) ulaşmasını simüle edin.', ar: 'عدل قيم الجرعة و Vd والتصفية. راقب وصول الدواء للحالة المستقرة (Css) خلال 4-5 أعمار نصف بالجرعات المتكررة.' },
        false,
        {
          widget: {
            type: 'PkSimulator',
            config: { model: 'one_compartment_iv', doseMg: 500, vdLitres: 40, clearanceLPerHour: 4 }
          }
        }
      ),
      makeStep('pharm-mod3-les1-step-06', 'guided_discovery', 6,
        { tr: 'Rehberli Keşif: İnfüzyon Hızı ve Css', ar: 'استكشاف موجه: سرعة التسريب وحالة Css' },
        { tr: 'Simülatörde IV infüzyon hızını 2 katına çıkarın. Kararlı durum konsantrasyonu ve kararlı duruma ulaşma süresi nasıl değişti?', ar: 'ضاعف معدل التسريب الوريدي. كيف تغير تركيز الحالة المستقرة (Css) والزمن اللازم لبلوغها؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph31-3', text: { tr: 'Css iki katına çıktı, ancak kararlı duruma ulaşma süresi kesinlikle değişmedi (yine 4-5 t1/2).', ar: 'تضاعف تركيز Css للضعف، لكن زمن الوصول للحالة المستقرة لم يتغير إطلاقاً (4-5 t1/2).' }, isCorrect: true },
              { id: 'opt-ph31-4', text: { tr: 'Kararlı duruma 2 kat daha hızlı ulaşıldı.', ar: 'وصل للحالة المستقرة بأسرع بمرتين.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'İnfüzyon hızı seviyeyi belirler; o seviyeye ulaşma süresini ise sadece yarı ömür belirler.' }
        }
      ),
      makeStep('pharm-mod3-les1-step-07', 'formal_explanation', 7,
        { tr: 'Temel Farmakokinetik Formüller', ar: 'القوانين الحركية الأساسية' },
        { tr: 'CL = ke * Vd. t1/2 = 0.693 / ke = 0.693 * Vd / CL. Kararlı durum Css = İnfüzyon Hızı / CL.', ar: 'التصفية CL = ke * Vd. عمر النصف t1/2 = 0.693 * Vd / CL. تركيز الحالة المستقرة Css = معدل التسريب / CL.' },
        false,
        { technicalTerms: [{ term: 'kararlı durum', arContext: 'الحالة المستقرة (Steady-State)' }] }
      ),
      makeStep('pharm-mod3-les1-step-08', 'concept_check', 8,
        { tr: 'Kavram Denetimi: Yarılanma Sayısı Kuralı', ar: 'فحص المفهوم: قاعدة تضاعف أعمار النصف' },
        { tr: 'Tek bir IV doz verilen ilacın vücuttan %93.75 oranında temizlenmesi için kaç yarılanma ömrü geçmelidir?', ar: 'للتخلص من 93.75% من جرعة دواء وريدية وحيدة، كم عمر نصف يجب أن ينقضي؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph31-5', text: { tr: 'Tam 4 yarılanma ömrü (kalan: %50 -> %25 -> %12.5 -> %6.25).', ar: '4 أعمار نصف تماماً (المتبقي: 50% -> 25% -> 12.5% -> 6.25%).' }, isCorrect: true },
              { id: 'opt-ph31-6', text: { tr: '1 yarılanma ömrü.', ar: 'عمر نصف واحد.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: '4 yarılanma ömründe ilacın %94 ü, 5 yarı ömürde %97 si vücuttan atılmış olur.' }
        }
      ),
      makeStep('pharm-mod3-les1-step-09', 'application', 9,
        { tr: 'Klinik Karar: Yükleme Dozu İhtiyacı', ar: 'قرار سريري: الحاجة إلى جرعة التحميل' },
        { tr: 'Yarılanma ömrü 5 gün olan amiodaron ile acil aritmi tedavisinde neden yükleme dozu (loading dose) verilir?', ar: 'في علاج اضطرابات النظم الحادة بدواء Amiodarone ذي t1/2 = 5 أيام، لماذا تعطى جرعة تحميل (loading dose)؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph31-7', text: { tr: 'Normal idame dozuyla kararlı duruma ulaşmak 25 gün süreceğinden, terapötik seviyeye hemen ulaşmak için.', ar: 'لأن بلوغ الحالة المستقرة يستغرق 25 يوماً بالجرعة العادية، فللوصول الفوري للتركيز العلاجي.' }, isCorrect: true },
              { id: 'opt-ph31-8', text: { tr: 'Böbrekleri temizlemek için.', ar: 'لتنشيط وظائف الكلى.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Yükleme dozu = Hedef Css x Vd formülüyle anında terapötik pencereye girilir.' }
        }
      ),
      makeStep('pharm-mod3-les1-step-10', 'retrieval', 10,
        { tr: 'Geri Çağırma: Faz I ve II Metabolizma', ar: 'استرجاع معرفي: استقلاب المرحلتين الأولى والثانية' },
        { tr: 'Medchem dersinde öğrendiğimiz gibi karaciğerde klerensi sağlayan temel Faz I ve Faz II enzim sistemleri nelerdi?', ar: 'كما تعلمنا في مساق الكيمياء، ما هي المنظومات الإنزيمية الأساسية المسؤولة عن التصفية الكبدية بالمرحلتين 1 و 2؟' },
        false,
        { technicalTerms: [{ term: 'hepatik metabolizma', arContext: 'الاستقلاب الكبدي' }] }
      ),
      makeStep('pharm-mod3-les1-step-11', 'connection', 11,
        { tr: 'İleri Bağlantı: Biyoyararlanım ve İlk Geçiş Etkisi (Ders 6)', ar: 'ربط مفاهيمي: التوافر الحيوي وتأثير المرور الأول (الدرس 6)' },
        { tr: 'İlacı damardan değil ağızdan verdiğimizde kana ne kadarı ulaşır? Bir sonraki derste biyoyararlanım (F) ve EAA analizini öğreneceğiz.', ar: 'عند إعطاء الدواء فموياً بدلاً من الوريد، كم يصل منه للدم؟ في الدرس القادم، سنتعلم التوافر الحيوي (F) وتحليل AUC.' },
        false,
        { technicalTerms: [{ term: 'biyoyararlanım', arContext: 'التوافر الحيوي' }] }
      ),
      makeStep('pharm-mod3-les1-step-12', 'mastery_check', 12,
        { tr: 'Ustalık Sınavı: Farmakokinetik Parametreler', ar: 'اختبار الإتقan: المعاملات الحركية' },
        { tr: 'Bir ilacın dağılım hacmi 70 Litre ve klerensi 7 L/saat ise eliminasyon yarılanma ömrü yaklaşık kaç saattir?', ar: 'إذا كان حجم توزع دواء 70 لتراً وتصفيته 7 لتر/ساعة، فكم يبلغ عمر نصفه الإطراحي تقريباً؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph31-9', text: { tr: 'Yaklaşık 7 saat (0.693 x 70 / 7 ≈ 6.93 saat).', ar: 'حوالي 7 ساعات (0.693 x 70 / 7 ≈ 6.93 ساعات).' }, isCorrect: true },
              { id: 'opt-ph31-10', text: { tr: '70 saat.', ar: '70 ساعة.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Ders başarıyla tamamlandı! 3 review cards eklendi. +50 XP.' }
        }
      )
    ]
  },

  // Lesson 6 / Mod 3 Les 2: pharm-mod3-les2
  {
    id: 'pharm-mod3-les2',
    courseId: 'pharmacology',
    moduleId: 'ph-mod-03',
    title: {
      tr: 'Biyoyararlanım, İlk Geçiş Eliminasyonu ve EAA Analizi',
      ar: 'التوافر الحيوي، تأثير المرور الأول وتحليل AUC'
    },
    order: 2,
    access: 'free',
    objective: {
      tr: 'Oral biyoyararlanım fraksiyonunu (F), Eğri Altındaki Alan (EAA/AUC) oranlarını ve ilk geçiş hepatik ekstraksiyonunu hesaplamak.',
      ar: 'حساب كسر التوافر الحيوي الفموي (F) ونسب المساحة تحت المنحنى (AUC) واستخلاص المرور الأول الكبدي.'
    },
    misconceptions: [
      {
        tr: 'Ağızdan alınan 500 mg ilacın tamamının sistemik dolaşıma ulaştığı yanılgısı (karaciğer ve bağırsak ilk geçişi dozu budar).',
        ar: 'الظن الخاطئ بأن كامل جرعة 500 mg الفموية تصل إلى الدورة الدموية العامة دون استخلاص كبدي ومعوي.'
      }
    ],
    sources: [{ file: 'İlaç metabolizması-2026.pdf', page: 48 }],
    citations: [
      {
        id: 'CIT-PH06-01',
        book: "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
        edition: '14th ed.',
        topic: 'Bioavailability, First-Pass Metabolism, and AUC Integration',
        chapter: 'unverified',
        page: 'unverified',
        status: 'pending-human-review'
      }
    ],
    spacedReviewCards: [
      {
        cardId: 'pharm-mod3-les2-card1',
        courseId: 'pharmacology',
        drugOrConcept: 'Mutlak Biyoyararlanım Formülü (F)',
        prompt: 'Oral mutlak biyoyararlanım fraksiyonu F nasıl hesaplanır?',
        answer: 'F = (EAA_oral x Doz_IV) / (EAA_IV x Doz_oral).',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'pharm-mod3-les2-card2',
        courseId: 'pharmacology',
        drugOrConcept: 'Hepatik Ekstraksiyon Oranı (EH)',
        prompt: 'Karaciğer ekstraksiyon oranı EH = 0.80 olan bir ilacın karaciğerden kurtulan oranı (FH) nedir?',
        answer: 'FH = 1 - EH = 1 - 0.80 = 0.20 (%20 si dolaşıma geçer).',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'pharm-mod3-les2-card3',
        courseId: 'pharmacology',
        drugOrConcept: 'İlk Geçişi Aşma Yolları',
        prompt: 'Hepatik ilk geçiş metabolizmasını baypas eden parenteral dışı uygulama yolları nelerdir?',
        answer: 'Sublingual (dil altı), rektal (kısmen) ve transdermal uygulama yolları.',
        box: 1,
        intervalDays: 1
      }
    ],
    translations: {
      tr: { title: 'Biyoyararlanım, İlk Geçiş Eliminasyonu ve EAA Analizi' },
      ar: { title: 'التوافر الحيوي، تأثير المرور الأول وتحليل AUC' }
    },
    steps: [
      makeStep('pharm-mod3-les2-step-01', 'hook', 1,
        { tr: 'Nitrogliserin Neden Yutulmaz?', ar: 'لماذا لا يبتلع مريض الذبحة قرص النتروغليسرين؟' },
        { tr: 'Kalp krizinde nitrogliserin yutulursa hiçbir işe yaramazken, dil altına konduğunda 2 dakikada göğüs ağrısını nasıl dindirir?', ar: 'عند ابتلاع النتروغليسرين يفقد فعاليته تماماً، بينما يزيل ألم الصدر خلال دقيقتين تحت اللسان. ما سر ذلك؟' },
        false,
        { technicalTerms: [{ term: 'ilk geçiş etkisi', arContext: 'تأثير المرور الأول' }] }
      ),
      makeStep('pharm-mod3-les2-step-02', 'question', 2,
        { tr: 'Tahmin: Karaciğerin Vergi Kesintisi', ar: 'توقع: ضريبة التصفية الكبدية' },
        { tr: 'Ağızdan emilen bir ilaç kalbe ve beyne gitmeden önce zorunlu olarak hangi organdan geçmek zorundadır?', ar: 'قبل أن يصل الدواء الممتص فموياً إلى القلب والدماغ، ما هو العضو الإلزامي الذي يعبره أولاً؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph32-1', text: { tr: 'Vena porta yoluyla doğrudan karaciğerden geçer.', ar: 'يعبر مباشرة إلى الكبد عبر الوريد البابي البابي.' }, isCorrect: true },
              { id: 'opt-ph32-2', text: { tr: 'Doğrudan böbreğe gider.', ar: 'ينتقل مباشرة إلى الكليتين.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Tüm bağırsak kanı portal venle karaciğere akar; ilk geçiş metabolizması burada gerçekleşir.' }
        }
      ),
      makeStep('pharm-mod3-les2-step-03', 'intuition', 3,
        { tr: 'Sezgisel Model: Gümrük Kapısı Prensibi', ar: 'تشبيه حدسي: بوابة الجمارك الإلزامية' },
        { tr: 'Bağırsaktan giren her molekül karaciğer gümrük kapısından geçer. Karaciğer enzimleri molekülün %90 ına el koyabilir (yüksek ekstraksiyon).', ar: 'كل جزيء يعبر من الأمعاء يخضع لتفتيش جمركي كبدي صارم. قد تصادر الإنزيمات 90% من الجرعة فوراً.' },
        false,
        { technicalTerms: [{ term: 'hepatik ekstraksiyon', arContext: 'الاستخلاص الكبدي' }] }
      ),
      makeStep('pharm-mod3-les2-step-04', 'visual_explanation', 4,
        { tr: 'EAA (Eğri Altındaki Alan / AUC) Entegrasyonu', ar: 'تكامل المساحة تحت المنحنى (AUC)' },
        { tr: 'Plazma konsantrasyon-zaman grafiğinin altındaki alan (EAA), vücuda giren toplam aktif ilaç miktarının doğrudan ölçüsüdür.', ar: 'تمثل المساحة تحت منحنى التركيز والزمن (AUC) المقياس الدقيق لكمية الدواء النشط الكلية الواصلة للدورة العامة.' },
        false,
        { technicalTerms: [{ term: 'EAA (AUC)', arContext: 'المساحة تحت المنحنى AUC' }] }
      ),
      makeStep('pharm-mod3-les2-step-05', 'interactive_artifact', 5,
        { tr: 'İnteraktif Simülatör: PkSimulator (Biyoyararlanım)', ar: 'محاكي تفاعلي: محاكي الحركية (التوافر الحيوي)' },
        { tr: 'Aynı dozdaki ilacı IV ve Oral olarak verin. Oral emilim hızını ve EAA oranını karşılaştırarak biyoyararlanım F fraksiyonunu hesaplayın.', ar: 'أعطِ نفس الجرعة وريدياً وفموياً. قارن سرعة الامتصاص ومساحة AUC لحساب كسر التوافر الحيوي F.' },
        false,
        {
          widget: {
            type: 'PkSimulator',
            config: { model: 'oral_vs_iv_comparison', doseMg: 100, oralFractionF: 0.60, absorptionKa: 1.2 }
          }
        }
      ),
      makeStep('pharm-mod3-les2-step-06', 'guided_discovery', 6,
        { tr: 'Rehberli Keşif: Dil Altı Uygulamanın Üstünlüğü', ar: 'استكشاف موجه: ميزة الإعطاء تحت اللسان' },
        { tr: 'Nitrogliserin dil altına konduğunda emilen moleküller vena kava superior ile doğrudan kalbe akar. Karaciğer ilk geçişine ne oldu?', ar: 'عند وضع النتروغليسرين تحت اللسان يمتص للوريد الأجوف العلوي نحو القلب مباشرة. ماذا حدث للمرور الكبدي الأول؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph32-3', text: { tr: 'İlk geçiş metabolizması tamamen baypas edildi ve biyoyararlanım fırladı.', ar: 'تم تجاوز استقلاب المرور الأول بالكامل وقفز التوافر الحيوي للذروة.' }, isCorrect: true },
              { id: 'opt-ph32-4', text: { tr: 'Daha fazla yıkıldı.', ar: 'تعرض الدواء لهدم استقلابي أكبر.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Sublingual yol karaciğer portal dolaşımını atlatarak anında sistemik etki sağlar.' }
        }
      ),
      makeStep('pharm-mod3-les2-step-07', 'formal_explanation', 7,
        { tr: 'Biyoyararlanım ve Klerens Eşitlikleri', ar: 'معادلات التوافر الحيوي والتصفية' },
        { tr: 'F = (EAA_oral / EAA_IV) * (Doz_IV / Doz_oral). Karaciğer ekstraksiyonu EH = (Cin - Cout) / Cin. FH = 1 - EH.', ar: 'التوافر الحيوي F = (AUC_oral / AUC_IV) * (Doz_IV / Doz_oral). الاستخلاص الكبدي EH = (Cin - Cout) / Cin.' },
        false,
        { technicalTerms: [{ term: 'mutlak biyoyararlanım', arContext: 'التوافر الحيوي المطلق' }] }
      ),
      makeStep('pharm-mod3-les2-step-08', 'concept_check', 8,
        { tr: 'Kavram Denetimi: Oral Doz Ayarlaması', ar: 'فحص المفهوم: تعديل الجرعة الفموية' },
        { tr: 'Bir ilacın IV dozu 10 mg ve oral biyoyararlanımı F = 0.20 (%20) ise, aynı etki için oral yoldan kaç mg verilmelidir?', ar: 'إذا كانت الجرعة الوريدية 10 mg والتوافر الحيوي الفموي F = 0.20 (20%)، فكم ملغ يجب إعطاؤه فموياً لنفس الأثر؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph32-5', text: { tr: 'Tam 50 mg (10 mg / 0.20 = 50 mg).', ar: '50 mg تماماً (10 mg / 0.20 = 50 mg).' }, isCorrect: true },
              { id: 'opt-ph32-6', text: { tr: '2 mg.', ar: '2 mg فقط.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Oral doz = IV Doz / F formülüyle eşit biyoyararlanım sağlanır.' }
        }
      ),
      makeStep('pharm-mod3-les2-step-09', 'application', 9,
        { tr: 'Klinik Uygulama: Morfin Oral ve IV Doz Farkı', ar: 'تطبيق سريري: الفارق بين جرعتي المورفين الفموية والوريدية' },
        { tr: 'Morfinin oral biyoyararlanımı yaklaşık %25 tir. Hastanede 10 mg IV morfinle ağrısı dinen hastaya taburculukta neden 40 mg oral tablet yazılır?', ar: 'يبلغ التوافر الحيوي الفموي للمورفين حوالي 25%. لماذا يكتب للطبيب 40 mg فموياً للمريض الذي كفته 10 mg وريدياً؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph32-7', text: { tr: '40 mg ın ancak %25 i (10 mg) karaciğerden sağ çıkarak kana ulaşır.', ar: 'لأن 25% فقط من الـ 40 mg (أي 10 mg) تنجو من الكبد لتصل إلى الدم.' }, isCorrect: true },
              { id: 'opt-ph32-8', text: { tr: 'Doktor hata yapmıştır.', ar: 'لأن الطبيب أخطأ في الحساب.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'İlk geçiş metabolizması oral dozaj formlarının dozunu katlar.' }
        }
      ),
      makeStep('pharm-mod3-les2-step-10', 'retrieval', 10,
        { tr: 'Geri Çağırma: Klerens ve Yarılanma Ömrü', ar: 'استرجاع معرفي: التصفية وعمر النصف' },
        { tr: 'Bir önceki derste gördüğümüz gibi vücuda giren ilacın kandan temizlenme hızını ifade eden hacimsel parametre neydi?', ar: 'كما رأينا في الدرس السابق، ما هو المعامل الحجمي الذي يحدد سرعة تنقية الدواء من الدم؟' },
        false,
        { technicalTerms: [{ term: 'sistemik klerens', arContext: 'التصفية الكلية للجسم' }] }
      ),
      makeStep('pharm-mod3-les2-step-11', 'connection', 11,
        { tr: 'İleri Bağlantı: Otonom Sinir Sistemi ve Reseptörler (Modül 4)', ar: 'ربط مفاهيمي: الجهاز العصبي الذاتي والمستقبلات (الوحدة 4)' },
        { tr: 'Genel farmakoloji prensiplerini tamamladık! Şimdi organ sistemlerine geçiyoruz: Modül 4 te sempatik ve parasempatik iletimi keşfedeceğiz.', ar: 'أتممنا المبادئ العامة لعلم الأدوية! ننتقل الآن إلى أجهزة الجسم: في الوحدة 4، سنستكشف النقل العصبي الودي ونظير الودي.' },
        false,
        { technicalTerms: [{ term: 'otonom sinir sistemi', arContext: 'الجهاز العصبي الذاتي' }] }
      ),
      makeStep('pharm-mod3-les2-step-12', 'mastery_check', 12,
        { tr: 'Ustalık Sınavı: Biyoyararlanım ve İlk Geçiş', ar: 'اختبار الإتقان: التوافر الحيوي والمرور الأول' },
        { tr: 'Bir ilacın IV EAA sı 100 mg*saat/L, eşit dozda oral EAA sı ise 40 mg*saat/L bulunmuştur. Bu ilacın oral biyoyararlanımı yüzde kaçtır?', ar: 'لدواء معين، بلغت AUC الوريدية 100، بينما بلغت AUC الفموية لنفس الجرعة 40. كم تبلغ النسبة المئوية لتوافره الحيوي الفموي؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph32-9', text: { tr: '%40 biyoyararlanım (F = 40 / 100 = 0.40).', ar: 'توافر حيوي 40% (F = 40 / 100 = 0.40).' }, isCorrect: true },
              { id: 'opt-ph32-10', text: { tr: '%100.', ar: '100% بالكامل.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Modül 3 tamamlandı! 3 review cards eklendi. +50 XP.' }
        }
      )
    ]
  },

  // =========================================================================
  // MODULE 4: Otonom Sinir Sistemi ve Nörotransmisyon (ph-mod-04)
  // =========================================================================

  // Lesson 7 / Mod 4 Les 1: pharm-mod4-les1
  {
    id: 'pharm-mod4-les1',
    courseId: 'pharmacology',
    moduleId: 'ph-mod-04',
    title: {
      tr: 'Otonom Sinir Sistemi: Adrenerjik Nörotransmisyon ve Reseptör Alt Tipleri',
      ar: 'الجهاز العصبي الذاتي: النقل العصبي الأدريناليني والأنماط الفرعية'
    },
    order: 1,
    access: 'free',
    objective: {
      tr: 'Adrenerjik alfa-1, beta-1 ve beta-2 reseptörlerinin sinyal iletim yolaklarını ve hedef dokulardaki sempatik yanıtları eşleştirmek.',
      ar: 'ربط مسارات التأشير الخلوي لمستقبلات alpha-1 و beta-1 و beta-2 والاستجابات الودية في الأنسجة المستهدفة.'
    },
    misconceptions: [
      {
        tr: 'Tüm sempatik reseptörlerin aynı hücresel sinyali (örneğin cAMP artışı) ürettiği yanılgısı (alfa-1 Gq ile IP3/DAG, beta-1 Gs ile cAMP üretir).',
        ar: 'الظن الخاطئ بأن جميع المستقبلات الودية تنتج نفس الإشارة (alpha-1 تعمل عبر Gq و IP3، بينما beta-1 عبر Gs و cAMP).'
      }
    ],
    sources: [{ file: 'Otonom Sinir Sistemi.pdf', page: 14 }],
    citations: [
      {
        id: 'CIT-PH07-01',
        book: "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
        edition: '14th ed.',
        topic: 'Adrenergic Neurotransmission and Receptor Subtypes',
        chapter: 'unverified',
        page: 'unverified',
        status: 'pending-human-review'
      }
    ],
    spacedReviewCards: [
      {
        cardId: 'pharm-mod4-les1-card1',
        courseId: 'pharmacology',
        drugOrConcept: 'Alfa-1 Reseptör Sinyali',
        prompt: 'Alfa-1 adrenerjik reseptör hangi G-proteini ile kenetlidir ve damarlarda ne yapar?',
        answer: 'Gq proteini ile PLC aktivasyonu ve IP3/Ca2+ artışı yaparak vazokonstriksiyon (damar büzüşmesi) sağlar.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'pharm-mod4-les1-card2',
        courseId: 'pharmacology',
        drugOrConcept: 'Beta-1 ve Beta-2 Ayrımı',
        prompt: 'Beta-1 reseptörleri esasen hangi organda, Beta-2 reseptörleri hangi organda bulunur?',
        answer: 'Beta-1 kalpte (hız ve kasılma artışı); Beta-2 bronş düz kasında (bronkodilasyon / gevşeme).',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'pharm-mod4-les1-card3',
        courseId: 'pharmacology',
        drugOrConcept: 'Salbutamol Seçiciliği',
        prompt: 'Astım krizinde kullanılan salbutamol neden kalbi yormadan nefes açar?',
        answer: 'Beta-2 reseptörlerine seçici agonisttir; kalp beta-1 reseptörlerini minimal düzeyde uyarır.',
        box: 1,
        intervalDays: 1
      }
    ],
    translations: {
      tr: { title: 'Otonom Sinir Sistemi: Adrenerjik Nörotransmisyon ve Reseptör Alt Tipleri' },
      ar: { title: 'الجهاز العصبي الذاتي: النقل العصبي الأدريناليني والأنماط الفرعية' }
    },
    steps: [
      makeStep('pharm-mod4-les1-step-01', 'hook', 1,
        { tr: 'Savaş ya da Kaç: Bir Molekül, Zıt Etkiler', ar: 'الكر أو الفر: جزيء واحد وتأثيرات متضادة' },
        { tr: 'Korkan bir insanın kalbi delicesine çarpıp kas damarları genişlerken, derisi neden bembeyaz kesilir ve bağırsakları durur?', ar: 'عند الخوف، بينما ينبض القلب بشدة وتتسع أوعية العضلات، لماذا يشحب لون الجلد ويتوقف نشاط الأمعاء؟' },
        false,
        { technicalTerms: [{ term: 'sempatik sistem', arContext: 'الجهاز العصبي الودي' }] }
      ),
      makeStep('pharm-mod4-les1-step-02', 'question', 2,
        { tr: 'Tahmin: Beta-2 Reseptör Uyarısı', ar: 'توقع: تنشيط مستقبلات Beta-2' },
        { tr: 'Akciğer bronş düz kaslarındaki beta-2 reseptörleri uyarıldığında ne olur?', ar: 'عند تنشيط مستقبلات beta-2 في العضلات الملساء للقصبات الهوائية، ماذا يحدث؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph41-1', text: { tr: 'cAMP artar, hücre içi kalsiyum düşer ve bronşlar genişler (bronkodilasyon).', ar: 'يرتفع cAMP وينخفض الكالسيوم الداخلي فتسترخي القصبات وتتسع (bronkodilasyon).' }, isCorrect: true },
              { id: 'opt-ph41-2', text: { tr: 'Bronşlar spazmla tıkanır.', ar: 'تنقبض القصبات وتنسد بالتشنج.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Beta-2 Gs kenetlidir; cAMP artışı düz kaslarda gevşeme (bronkodilasyon) yaratır.' }
        }
      ),
      makeStep('pharm-mod4-les1-step-03', 'intuition', 3,
        { tr: 'Sezgisel Analoji: 1 Kalp, 2 Akciğer Kuralı', ar: 'تشبيه حدسي: قاعدة قلب واحد ورئتان اثنتان' },
        { tr: 'Hatırlama tüyosu: İnsanın 1 kalbi vardır -> Beta-1 kalptedir. İnsanın 2 akciğeri vardır -> Beta-2 akciğerdedir.', ar: 'قاعدة التذكر الشهيرة: للإنسان قلب واحد -> Beta-1 في القلب؛ وللإنسان رئتان اثنتان -> Beta-2 في الرئتين.' },
        false,
        { technicalTerms: [{ term: 'reseptör alt tipleri', arContext: 'الأنماط الفرعية للمستقبلات' }] }
      ),
      makeStep('pharm-mod4-les1-step-04', 'visual_explanation', 4,
        { tr: 'İkincil Haberciler: Gq vs Gs', ar: 'المرسال الثاني: مقارنة Gq مع Gs' },
        { tr: 'Alfa-1 -> Gq -> Fosfolipaz C -> IP3 + DAG -> Kalsiyum fırlar -> Kasılma. Beta-1/2 -> Gs -> Adenilat Siklaz -> cAMP -> PKA aktivasyonu.', ar: 'مسار Alpha-1: بروتين Gq ينشط PLC ويزيد الكالسيوم للانقباض. مسار Beta-1/2: بروتين Gs ينشط AC ويزيد cAMP.' },
        false,
        { technicalTerms: [{ term: 'ikincil haberci', arContext: 'المرسال الخلوي الثاني' }] }
      ),
      makeStep('pharm-mod4-les1-step-05', 'interactive_artifact', 5,
        { tr: 'İnteraktif Eşleştirici: Adrenerjik Reseptör Eşleştirici', ar: 'مطابق تفاعلي: مواءمة المستقبلات الأدرينالينية' },
        { tr: 'Katekolamin ligandlarını (adrenalin, noradrenalin, salbutamol) alfa-1, beta-1 ve beta-2 cepleriyle eşleştirip fizyolojik yanıtları test edin.', ar: 'طابق مركبات الكاتيكولامين (Adrenaline، Noradrenaline، Salbutamol) مع جيوب alpha-1 و beta-1 و beta-2 واختبر الاستجابة.' },
        false,
        {
          widget: {
            type: 'ReceptorLigandMatcher',
            config: { mode: 'adrenergic_subtypes', receptors: ['alpha1_vasoconstriction', 'beta1_cardiac', 'beta2_bronchodilation'] }
          }
        }
      ),
      makeStep('pharm-mod4-les1-step-06', 'guided_discovery', 6,
        { tr: 'Rehberli Keşif: Seçici Olmayan Beta Bloker Riski', ar: 'استكشاف موجه: خطر حاصرات بيتا غير الانتقائية' },
        { tr: 'Astımlı bir hipertansiyon hastasına seçici olmayan beta bloker propranolol verilirse ne olur?', ar: 'إذا أعطي مريض ضغط مصاب بالربو حاصر بيتا غير انتقائي مثل Propranolol، فماذا يحدث؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph41-3', text: { tr: 'Beta-2 reseptörleri de bloke olur ve ölümcül bronkospazm (astım krizi) tetiklenir.', ar: 'تحظر مستقبلات beta-2 أيضاً مما يثير تشنجاً قصبياً مميتاً (نوبة ربو حادة).' }, isCorrect: true },
              { id: 'opt-ph41-4', text: { tr: 'Astımı tamamen iyileşir.', ar: 'يشفى الربو لديه تماماً.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Astımlı hastalarda yalnızca kardiyoseçici beta-1 blokerler (metoprolol) kullanılabilir.' }
        }
      ),
      makeStep('pharm-mod4-les1-step-07', 'formal_explanation', 7,
        { tr: 'Adrenerjik Reseptörlerin Sınıflandırılması', ar: 'التصنيف الصيدلاني للمستقبلات الأدرينالينية' },
        { tr: 'Ahlquist (1948): Alfa (damar büzüşmesi, midriyazis) ve Beta (kalp uyarımı, bronkodilasyon). Lands (1967): Beta-1 ve Beta-2 alt tipleri.', ar: 'تصنيف Ahlquist و Lands: مستقبلات Alpha لانقباض الأوعية، Beta-1 لتنبيه القلب، و Beta-2 لتوسيع القصبات والأوعية العضلية.' },
        false,
        { technicalTerms: [{ term: 'adrenerjik transmisyon', arContext: 'النقل العصبي الأدريناليني' }] }
      ),
      makeStep('pharm-mod4-les1-step-08', 'concept_check', 8,
        { tr: 'Kavram Denetimi: Alfa-2 Presinaptik Otoreseptör', ar: 'فحص المفهوم: المستقبل التلقائي قبيل المشبكي Alpha-2' },
        { tr: 'Presinaptik sinir ucunda bulunan alfa-2 reseptörü uyarıldığında noradrenalin salınımına ne olur?', ar: 'عند تنشيط مستقبلات alpha-2 قبيل المشبكية على النهاية العصبية، ماذا يحدث لتحرر النورأدرينالين؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph41-5', text: { tr: 'Gi kenetlidir; negatif geri bildirimle noradrenalin salınımını durdurur.', ar: 'مقترنة بـ Gi؛ وتوقف تحرر النورأدرينالين عبر التلقيم الراجع السلبي.' }, isCorrect: true },
              { id: 'opt-ph41-6', text: { tr: 'Salınımı 10 kat artırır.', ar: 'تزيد التحرر بعشرة أضعاف.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Alfa-2 otoreseptörleri sempatik fren mekanizmasıdır (klonidin etki mekanizması).' }
        }
      ),
      makeStep('pharm-mod4-les1-step-09', 'application', 9,
        { tr: 'Klinik Acil: Anafilaktik Şokta Adrenalin', ar: 'طوارئ سريرية: الأدرينالين في الصدمة التأقية' },
        { tr: 'Anafilakside adrenalin neden hayat kurtarıcıdır? Alfa-1 ile çöken tansiyonu fırlatır, Beta-2 ile tıkanan soluk borusunu açar.', ar: 'لماذا ينقذ Adrenaline حياة مريض الصدمة التأقية؟ يرفع الضغط المنهار عبر alpha-1، ويفتح مجرى الهواء المختنق عبر beta-2.' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph41-7', text: { tr: 'Hem alfa hem beta reseptörleri güçlüce uyararak çoklu fizyolojik kurtarma sağlar.', ar: 'لأنه ينشط كلاً من مستقبلات ألفا وبيتا بقوة محققاً إنقاذاً فسيولوجياً شاملاً.' }, isCorrect: true },
              { id: 'opt-ph41-8', text: { tr: 'Yalnızca ağrıyı keser.', ar: 'لأنه يسكن الألم فقط.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Adrenalin anafilaksideki patolojilerin tam fizyolojik antagonistidir.' }
        }
      ),
      makeStep('pharm-mod4-les1-step-10', 'retrieval', 10,
        { tr: 'Geri Çağırma: Easson-Stedman ve Epinefrin', ar: 'استرجاع معرفي: Easson-Stedman والأدرينالين' },
        { tr: 'Medchem Modül 2 de gördüğümüz gibi (R)-adrenalinin beta reseptörüne sıkı tutunmasını sağlayan 3. fonksiyonel kulp neydi?', ar: 'كما رأينا في مساق الكيمياء، ما هو المقبض الوظيفي الثالث الذي يثبت (R)-adrenaline بقوة على مستقبلات بيتا؟' },
        false,
        { technicalTerms: [{ term: 'beta-hidroksil grubu', arContext: 'مجموعة بيتا-هيدروكسيل' }] }
      ),
      makeStep('pharm-mod4-les1-step-11', 'connection', 11,
        { tr: 'İleri Bağlantı: Kolinerjik Sistem ve Asetilkolin (Ders 8)', ar: 'ربط مفاهيمي: الجهاز الكوليني والأسيتيل كولين (الدرس 8)' },
        { tr: 'Sempatik sistemin dengeli zıddı parasempatik sistemdir. Bir sonraki derste muskarinik ve nikotinik kolinerjik iletimi inceleyeceğiz.', ar: 'النظير الموازن للجهاز الودي هو الجهاز نظير الودي. في الدرس القادم، سنستكشف النقل الكوليني الموسكاريني والنيكوتيني.' },
        false,
        { technicalTerms: [{ term: 'kolinerjik sistem', arContext: 'الجهاز العصبي الكوليني' }] }
      ),
      makeStep('pharm-mod4-les1-step-12', 'mastery_check', 12,
        { tr: 'Ustalık Sınavı: Adrenerjik Eşleştirme', ar: 'اختبار الإتقان: مواءمة المستقبلات الأدرينالينية' },
        { tr: 'Kalpte atım hızını ve kasılma gücünü artıran primer sempatik reseptör hangisidir?', ar: 'ما هو المستقبِل الودي الأساسي المسؤول عن زيادة سرعة وقوة انقباض القلب؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph41-9', text: { tr: 'Beta-1 adrenerjik reseptör (Gs kenetli).', ar: 'مستقبِل Beta-1 الأدريناليني (المقترن بـ Gs).' }, isCorrect: true },
              { id: 'opt-ph41-10', text: { tr: 'Alfa-1 reseptör.', ar: 'مستقبِل Alpha-1.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Ders başarıyla tamamlandı! 3 review cards eklendi. +50 XP.' }
        }
      )
    ]
  },

  // Lesson 8 / Mod 4 Les 2: pharm-mod4-les2
  {
    id: 'pharm-mod4-les2',
    courseId: 'pharmacology',
    moduleId: 'ph-mod-04',
    title: {
      tr: 'Kolinerjik Transmisyon ve Muskarinik Reseptör Modülasyonu',
      ar: 'النقل العصبي الكوليني وتعديل المستقبِلات الموسكارينية'
    },
    order: 2,
    access: 'free',
    objective: {
      tr: 'Asetilkolin sentezi, kolinesteraz yıkımı, muskarinik (M1-M5) GPCR lar ve nikotinik iyon kanallarının farmakolojisini kavramak.',
      ar: 'فهم اصطناع الأسيتيل كولين وإماهته بإنزيم الكولينستراز وفارماكولوجيا مستقبلات GPCR الموسكارينية والقنوات النيكوتينية.'
    },
    misconceptions: [
      {
        tr: 'Asetilkolinin yalnızca parasempatik sisteme özgü olduğu yanılgısı (tüm otonom ganglionlarda ve nöromusküler kavşakta nikotiniktir).',
        ar: 'الاعتقاد الخاطئ بأن الأسيتيل كولين خاص بنظير الودي فقط (هو الناقل في العقد الذاتية كافة والوصل العضلي العصبي).'
      }
    ],
    sources: [{ file: 'Otonom Sinir Sistemi.pdf', page: 32 }],
    citations: [
      {
        id: 'CIT-PH08-01',
        book: "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
        edition: '14th ed.',
        topic: 'Cholinergic Neurotransmission, Muscarinic Receptors, and Anticholinergics',
        chapter: 'unverified',
        page: 'unverified',
        status: 'pending-human-review'
      }
    ],
    spacedReviewCards: [
      {
        cardId: 'pharm-mod4-les2-card1',
        courseId: 'pharmacology',
        drugOrConcept: 'Asetilkolinesteraz Görevi',
        prompt: 'Sinaptik aralıktaki asetilkolin sinyali hangi enzimle milisaniyeler içinde sonlandırılır?',
        answer: 'Asetilkolinesteraz (AChE) enzimi ile asetat ve koline hidroliz edilerek.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'pharm-mod4-les2-card2',
        courseId: 'pharmacology',
        drugOrConcept: 'M2 Reseptörü ve Kalp',
        prompt: 'Kalpte vagal uyarımla bradikardi (kalp yavaşlaması) oluşturan muskarinik reseptör hangisidir?',
        answer: 'M2 muskarinik reseptör (Gi proteini ile kenetli, cAMP yi düşürür ve K+ kanallarını açar).',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'pharm-mod4-les2-card3',
        courseId: 'pharmacology',
        drugOrConcept: 'Atropin Etki Mekanizması',
        prompt: 'Klinik atropin ilacı hangi reseptörlerin yarışmalı antagonistidir?',
        answer: 'Tüm muskarinik (M1-M5) reseptörlerin non-selektif yarışmalı antagonistidir.',
        box: 1,
        intervalDays: 1
      }
    ],
    translations: {
      tr: { title: 'Kolinerjik Transmisyon ve Muskarinik Reseptör Modülasyonu' },
      ar: { title: 'النقل العصبي الكوليني وتعديل المستقبِلات الموسكارينية' }
    },
    steps: [
      makeStep('pharm-mod4-les2-step-01', 'hook', 1,
        { tr: 'Ölümcül Mantar ve Güzel Kadın Otu', ar: 'الفطر القاتل ونبتة ست الحسن' },
        { tr: 'Amanita muscaria mantarını yiyen biri ter içinde boğulurken, Atropa belladonna (güzelavrat otu) yiyen birinin ağzı neden çöl gibi kurur?', ar: 'بينما يغرق متناول فطر Amanita بالإفرازات والعرق، لماذا يجف فم متناول نبتة ست الحسن (Belladonna) كالصحراء؟' },
        false,
        { technicalTerms: [{ term: 'muskarinik etki', arContext: 'التأثير الموسكاريني' }] }
      ),
      makeStep('pharm-mod4-les2-step-02', 'question', 2,
        { tr: 'Tahmin: Atropin Kalp Hızını Ne Yapar?', ar: 'توقع: ماذا يفعل Atropine بسرعة القلب؟' },
        { tr: 'Vagus sinirinin kalbi frenleyen M2 muskarinik reseptörleri atropin ile bloke edilirse kalp atım hızı ne olur?', ar: 'عند حظر مستقبلات M2 التي تكبح نبض القلب بواسطة Atropine، ماذا يحدث لمعدل ضربات القلب؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph42-1', text: { tr: 'Fren boşalır ve kalp hızı aniden fırlar (taşikardi).', ar: 'يفلت الكابح وتتسارع ضربات القلب فجأة (تسرع القلب).' }, isCorrect: true },
              { id: 'opt-ph42-2', text: { tr: 'Kalp tamamen durur.', ar: 'يتوقف القلب عن النبض تماماً.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Atropin vagal tonusu kaldırarak kalp atımını hızlandırır (bradikardi tedavisinde ilk seçenek).' }
        }
      ),
      makeStep('pharm-mod4-les2-step-03', 'intuition', 3,
        { tr: 'Sezgisel Analoji: Dinlen ve Sindir (Rest & Digest)', ar: 'تشبيه حدسي: الراحة والهضم (Rest & Digest)' },
        { tr: 'Parasempatik sistem yemekten sonraki huzurdur: Tükürük akar, bağırsaklar çalışır, göz bebekleri küçülür, kalp yavaşlar.', ar: 'الجهاز نظير الودي هو حالة السكون بعد الطعام: يسيل اللعاب، تنشط الأمعاء، تتضيق الحدقة، ويهدأ نبض القلب.' },
        false,
        { technicalTerms: [{ term: 'parasempatik tonus', arContext: 'المقوية نظيرة الودية' }] }
      ),
      makeStep('pharm-mod4-les2-step-04', 'visual_explanation', 4,
        { tr: 'Muskarinik Reseptör Haritası (M1 - M5)', ar: 'خارطة المستقبلات الموسكارينية (M1 - M5)' },
        { tr: 'Tek sayılı reseptörler (M1, M3, M5) Gq kenetlidir (salgılar ve düz kas kasılması). Çift sayılı reseptörler (M2, M4) Gi kenetlidir (kalp inhibisyonu).', ar: 'المستقبلات الفردية (M1, M3, M5) مقترنة بـ Gq (الإفرازات وتقلص العضلات). المستقبلات الزوجية (M2, M4) مقترنة بـ Gi (تثبيط القلب).' },
        false,
        { technicalTerms: [{ term: 'M1-M5 reseptörleri', arContext: 'مستقبلات M1 إلى M5' }] }
      ),
      makeStep('pharm-mod4-les2-step-05', 'interactive_artifact', 5,
        { tr: 'İnteraktif Modül: Receptor-Ligand Matcher (Kolinerjik)', ar: 'محاكي تفاعلي: مطابق المستقبلات الكولينية' },
        { tr: 'Asetilkolin, pilokarpin ve atropini muskarinik ve nikotinik reseptörlere bağlayarak Gq, Gi ve Na+ iyon akımlarını simüle edin.', ar: 'اربط الأسيتيل كولين والبيلوكاربين والأتروبين بالمستقبلات الموسكارينية والنيكوتينية ولاحظ تدفقات شوارد Na+ وتأشير Gq/Gi.' },
        false,
        {
          widget: {
            type: 'ReceptorLigandMatcher',
            config: { mode: 'cholinergic_network', receptors: ['m2_cardiac', 'm3_secretory', 'nm_neuromuscular'] }
          }
        }
      ),
      makeStep('pharm-mod4-les2-step-06', 'guided_discovery', 6,
        { tr: 'Rehberli Keşif: Organofosfat Zehirlenmesi', ar: 'استكشاف موجه: التسمم بالمبيدات الفوسفورية' },
        { tr: 'Tarım ilacı organofosfat asetilkolinesteraz enzimini kovalent bağla kilitlerse vücutta ne birikir ve hangi kriz doğar?', ar: 'عندما تعطل المبيدات الفوسفورية إنزيم AChE تساهمياً، ما الذي يتراكم في المشابك وما هي الأزمة الناتجة؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph42-3', text: { tr: 'Asetilkolin sel gibi birikir; aşırı tükürük, bronkospazm, bradikardi ve felçle kolinerjik kriz doğar.', ar: 'يتراكم الأسيتيل كولين كالسيل مسبباً أزمة كولينية: إفرازات مفرطة، تشنج قصبي، بطء قلب وشلل عضلي.' }, isCorrect: true },
              { id: 'opt-ph42-4', text: { tr: 'Asetilkolin tamamen tükenir.', ar: 'ينضب الأسيتيل كولين كلياً.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'AChE inhibisyonu DUMBELS tablosu denen kolinerjik toksidromu üretir; antidotu atropin ve pralidoksimdir.' }
        }
      ),
      makeStep('pharm-mod4-les2-step-07', 'formal_explanation', 7,
        { tr: 'Nikotinik vs Muskarinik Reseptör Mimarisi', ar: 'بنية المستقبلات النيكوتينية مقابل الموسكارينية' },
        { tr: 'Muskarinikler 7-transmembran GPCR dır. Nikotinikler ise 5 alt birimli pentamerik ligand kapılı iyon kanallarıdır (hızlı milisaniyelik Na+ akımı).', ar: 'الموسكارينية مستقبلات GPCR سباعية الغشاء، بينما النيكوتينية قنوات أيونية خماسية الوحدات تبوب بالربيط وتمرر شوارد Na+ بلمح البصر.' },
        false,
        { technicalTerms: [{ term: 'nikotinik reseptör', arContext: 'المستقبِل النيكوتيني' }] }
      ),
      makeStep('pharm-mod4-les2-step-08', 'concept_check', 8,
        { tr: 'Kavram Denetimi: Antikolinerjik Yan Etkiler', ar: 'فحص المفهوم: الآثار الجانبية المضادة للكولين' },
        { tr: 'Atropin benzeri bir antikolinerjik ilaç alan hastada hangi klasik belirtiler görülür?', ar: 'ما الأعراض الكلاسيكية التي تظهر على مريض يتناول دواءً مضاداً للكولين شبيهاً بـ Atropine؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph42-5', text: { tr: 'Ağız kuruluğu, midriyazis (göz bebeği büyümesi), kabızlık ve idrar retansiyonu.', ar: 'جفاف الفم، اتساع حدقة العين (midriyazis)، إمساك واحتباس بولي.' }, isCorrect: true },
              { id: 'opt-ph42-6', text: { tr: 'Aşırı ishal ve terleme.', ar: 'إسهال شديد وتعرق غزير.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Kırmızı, kuru, kör, çılgın tekerlemesi antikolinerjik blokajın klasik tablosudur.' }
        }
      ),
      makeStep('pharm-mod4-les2-step-09', 'application', 9,
        { tr: 'Klinik Uygulama: Göz Dibi Muayenesinde Midriyazis', ar: 'تطبيق سريري: توسيع الحدقة لفحص قاع العين' },
        { tr: 'Göz doktorları göz dibini incelemek için neden tropikamid damlatır? Pupilla sfinkterindeki M3 reseptörlerini bloke ederek midriyazis yapar.', ar: 'لماذا يقطر طبيب العيون دواء Tropicamide؟ لحظر مستقبلات M3 في عاصرة القزحية مما يوسع الحدقة للفحص.' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph42-7', text: { tr: 'Silyer kası ve sfinkteri felç ederek göz bebeğini genişletir.', ar: 'لأنه يشل العضلة الهدبية والعاصرة مما يوسع الحدقة بشكل مؤقت.' }, isCorrect: true },
              { id: 'opt-ph42-8', text: { tr: 'Göz içi tansiyonunu artırmak için.', ar: 'لرفع ضغط العين الداخلي.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Kısa etkili antimuskarinikler oftalmolojik tanının temel araçlarıdır.' }
        }
      ),
      makeStep('pharm-mod4-les2-step-10', 'retrieval', 10,
        { tr: 'Geri Çağırma: Konformasyonel İzomerizm ve Asetilkolin', ar: 'استرجاع معرفي: التماكب التشكلي والأسيتيل كولين' },
        { tr: 'Medchem Modül 4 te gördüğümüz gibi asetilkolin muskarinik reseptöre anti, nikotinik reseptöre syn konformasyonda bağlanıyordu. Bu ne tür izomerizmdi?', ar: 'كما رأينا في مساق الكيمياء، يرتبط الأسيتيل كولين بالموسكاريني بشكل anti وبالنيكوتيني بـ syn. ما نوع هذا التماكب؟' },
        false,
        { technicalTerms: [{ term: 'konformasyonel izomerizm', arContext: 'التماكب التشكلي' }] }
      ),
      makeStep('pharm-mod4-les2-step-11', 'connection', 11,
        { tr: 'İleri Bağlantı: Kardiyovasküler ve Renal Farmakoloji (Modül 5)', ar: 'ربط مفاهيمي: أدوية القلب والكلى (الوحدة 5)' },
        { tr: 'Otonom sistemi tamamladık! Modül 5 te vücudun sıvı ve kan basıncı kontrol mekanizması olan RAAS sistemini ve antihipertansifleri inceleyeceğiz.', ar: 'أتممنا الجهاز الذاتي! في الوحدة 5، سنستكشف نظام RAAS المتحكم بالسوائل وضغط الدم ومضادات ارتفاع الضغط.' },
        false,
        { technicalTerms: [{ term: 'RAAS sistemi', arContext: 'مسار RAAS' }] }
      ),
      makeStep('pharm-mod4-les2-step-12', 'mastery_check', 12,
        { tr: 'Ustalık Sınavı: Muskarinik Reseptörler', ar: 'اختبار الإتقان: المستقبلات الموسكارينية' },
        { tr: 'Tükürük salgısını, bronş kasılmasını ve bağırsak peristaltizmini artıran primer Gq-kenetli muskarinik reseptör hangisidir?', ar: 'ما هو المستقبِل الموسكاريني الأساسي المقترن بـ Gq المسؤول عن زيادة إفراز اللعاب وتقلص القصبات وحركة الأمعاء؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph42-9', text: { tr: 'M3 muskarinik reseptör.', ar: 'مستقبِل M3 الموسكاريني.' }, isCorrect: true },
              { id: 'opt-ph42-10', text: { tr: 'M2 reseptör.', ar: 'مستقبِل M2.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Modül 4 tamamlandı! 3 review cards eklendi. +50 XP.' }
        }
      )
    ]
  },

  // =========================================================================
  // MODULE 5: Kardiyovasküler ve Renal Farmakoloji (ph-mod-05)
  // =========================================================================

  // Lesson 9 / Mod 5 Les 1: pharm-mod5-les1
  {
    id: 'pharm-mod5-les1',
    courseId: 'pharmacology',
    moduleId: 'ph-mod-05',
    title: {
      tr: 'Renin-Anjiyotensin-Aldosteron Sistemi (RAAS) İnhibisyonu',
      ar: 'تثبيط مسار الرينين-أنجيوتنسين-ألدوستيرون (RAAS)'
    },
    order: 1,
    access: 'free',
    objective: {
      tr: 'ADE inhibitörleri ve ARB lerin etki mekanizmalarını, hemodinamik sonuçlarını ve bradikinin kaynaklı yan etkilerini ayırt etmek.',
      ar: 'التمييز بين آليات عمل مثبطات ACE وحاصرات ARB وعواقبها الديناميكية الدموية وتأثيرات البراديكينين.'
    },
    misconceptions: [
      {
        tr: 'ARB lerin de ADE inhibitörleri gibi kuru öksürük yaptığı yanılgısı (öksürük bradikinin birikiminden kaynaklanır ve sadece ADE inhibitörlerinde görülür).',
        ar: 'الاعتقاد الخاطئ بأن حاصرات ARB تسبب السعال الجاف كـ ACE (السعال ينجم عن تراكم البراديكينين وخاص بمثبطات ACE).'
      }
    ],
    sources: [{ file: 'Kardiyovasküler Sistem.pdf', page: 8 }],
    citations: [
      {
        id: 'CIT-PH09-01',
        book: "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
        edition: '14th ed.',
        topic: 'Renin-Angiotensin System: ACE Inhibitors and Angiotensin Receptor Blockers',
        chapter: 'unverified',
        page: 'unverified',
        status: 'pending-human-review'
      }
    ],
    spacedReviewCards: [
      {
        cardId: 'pharm-mod5-les1-card1',
        courseId: 'pharmacology',
        drugOrConcept: 'ADE İnhibitörü ve Kuru Öksürük',
        prompt: 'ADE inhibitörlerinin (enalapril, kaptopril) en karakteristik yan etkisi olan kuru öksürüğün sebebi nedir?',
        answer: 'ADE enziminin aynı zamanda bradikinini parçalayan kininaz II olması; inhibe olunca akciğerde bradikinin birikir.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'pharm-mod5-les1-card2',
        courseId: 'pharmacology',
        drugOrConcept: 'ARB Üstünlüğü',
        prompt: 'ARB ler (losartan, valsartan) neden kuru öksürük yapmaz?',
        answer: 'Doğrudan AT1 reseptörünü bloke ederler; ADE enzimine ve bradikinin yıkımına dokunmazlar.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'pharm-mod5-les1-card3',
        courseId: 'pharmacology',
        drugOrConcept: 'Renal Koruma Mekanizması',
        prompt: 'ADE inhibitörleri diyabetik nefropatide böbrek hasarını nasıl yavaşlatır?',
        answer: 'Efferent arteriyolü genişleterek intraglomerüler filtrasyon basıncını ve proteinüriyi düşürür.',
        box: 1,
        intervalDays: 1
      }
    ],
    translations: {
      tr: { title: 'Renin-Anjiyotensin-Aldosteron Sistemi (RAAS) İnhibisyonu' },
      ar: { title: 'تثبيط مسار الرينين-أنجيوتنسين-ألدوستيرون (RAAS)' }
    },
    steps: [
      makeStep('pharm-mod5-les1-step-01', 'hook', 1,
        { tr: 'Brezilya Yılan Zehrinden Tansiyon İlacına', ar: 'من سم أفعى البرازيل إلى دواء لضغط الدم' },
        { tr: 'Brezilya çukur engereğinin soktuğu kurbanların tansiyonu neden sıfıra inip şoka giriyordu? Bu zehir modern tansiyon ilaçlarını nasıl doğurdu?', ar: 'لماذا ينهار ضغط دم ضحايا أفعى الحفر البرازيلية إلى الصفر؟ وكيف ولد هذا السم أدوية الضغط الحديثة؟' },
        false,
        { technicalTerms: [{ term: 'ADE inhibitörü', arContext: 'مثبط إنزيم ACE' }] }
      ),
      makeStep('pharm-mod5-les1-step-02', 'question', 2,
        { tr: 'Tahmin: Anjiyotensin II Blokajı', ar: 'توقع: حظر أنجيوتنسين II' },
        { tr: 'Vücudun en güçlü damar büzücüsü olan anjiyotensin II üretimi durdurulduğunda sistemik vasküler direnç ne olur?', ar: 'عند وقف اصطناع أنجيوتنسين II الأقوى في تقبيض الأوعية بالجسم، ماذا يحدث للمقاومة الوعائية الكلية؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph51-1', text: { tr: 'Damarlar hızla gevşer ve arteriyel kan basıncı belirgin şekilde düşer.', ar: 'تسترخي الأوعية الدموية سريعاً وينخفض ضغط الدم الشرياني بوضوح.' }, isCorrect: true },
              { id: 'opt-ph51-2', text: { tr: 'Tansiyon fırlar.', ar: 'يرتفع الضغط بشكل حاد.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Anjiyotensin II blokajı hem vazokonstriksiyonu hem aldosteron salınımını durdurur.' }
        }
      ),
      makeStep('pharm-mod5-les1-step-03', 'intuition', 3,
        { tr: 'Sezgisel Analoji: Bahçe Hortumu ve Musluk', ar: 'تشبيه حدسي: خرطوم الحديقة والصنبور' },
        { tr: 'Anjiyotensin hortumun ucunu sıkar (damar büzüşmesi), aldosteron ise musluğu açıp su basar (tuz-su tutulumu). RAAS blokerleri ikisini birden gevşetir.', ar: 'أنجيوتنسين يضغط فوهة الخرطوم (تضييق الأوعية) وألدوستيرون يضخ الماء (احتباس الملح والماء). أدوية RAAS ترخي الطرفين معاً.' },
        false,
        { technicalTerms: [{ term: 'aldosteron', arContext: 'هرمون الألدوستيرون' }] }
      ),
      makeStep('pharm-mod5-les1-step-04', 'visual_explanation', 4,
        { tr: 'RAAS Biyokimyasal Yolağı', ar: 'مسار RAAS الكيميائي الحيوي' },
        { tr: 'Anjiyotensinojen -> (Renin) -> Anjiyotensin I -> (ADE) -> Anjiyotensin II -> AT1 reseptörü (Vazokonstriksiyon + Aldosteron salınımı).', ar: 'أنجيوتنسينوجين -> (Renin) -> أنجيوتنسين I -> (ACE) -> أنجيوتنسين II -> مستقبِل AT1 (انقباض وعائي + إفراز ألدوستيرون).' },
        false,
        { technicalTerms: [{ term: 'anjiyotensin II', arContext: 'أنجيوتنسين II' }] }
      ),
      makeStep('pharm-mod5-les1-step-05', 'interactive_artifact', 5,
        { tr: 'İnteraktif Simülatör: Dose-Response Modulator (RAAS)', ar: 'محاكي تفاعلي: معدل الجرعة والاستجابة (مسار RAAS)' },
        { tr: 'Enalapril veya losartan ekleyin. Anjiyotensin konsantrasyon-yanıt eğrisinin sağa ve aşağı kayışını, kan basıncı düşüşünü izleyin.', ar: 'أضف دواء Enalapril أو Losartan وراقب إزاحة منحنى استجابة الأنجيوتنسين وهبوط ضغط الدم الناتج.' },
        false,
        {
          widget: {
            type: 'DoseResponseCurve',
            config: { mode: 'raas_antihypertensive', drugClass: 'ace_vs_arb', baselinePressure: 160 }
          }
        }
      ),
      makeStep('pharm-mod5-les1-step-06', 'guided_discovery', 6,
        { tr: 'Rehberli Keşif: Öksürüğün Biyokimyasal Nedeni', ar: 'استكشاف موجه: السبب الكيميائي للسعال الجاف' },
        { tr: 'ADE enzimi anjiyotensin I i çevirirken aynı zamanda hangi damar genişletici peptidi parçalar?', ar: 'يقوم إنزيم ACE بتحويل أنجيوتنسين I وفي نفس الوقت يهدم أي ببتيد موسع للأوعية؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph51-3', text: { tr: 'Bradikinin; parçalanamayınca akciğerde birikerek inatçı kuru öksürük yapar.', ar: 'البراديكينين؛ وعند تثبيط الإنزيم يتراكم في الرئة مسبباً سعالاً جافاً عنيداً.' }, isCorrect: true },
              { id: 'opt-ph51-4', text: { tr: 'İnsülin.', ar: 'هرمون الإنسولين.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'ADE = Kininaz II. İnhibe edilince biriken bradikinin bronşları irrite eder.' }
        }
      ),
      makeStep('pharm-mod5-les1-step-07', 'formal_explanation', 7,
        { tr: 'ADE İnhibitörleri vs ARB ler Karşılaştırması', ar: 'مقارنة بين مثبطات ACE وحاصرات ARB' },
        { tr: 'ADE İnhibitörleri (ramipril, kaptopril): Ang II sentezini önler + Bradikinin artar. ARB ler (losartan, valsartan): Yalnızca AT1 i bloke eder, öksürük yapmaz.', ar: 'مثبطات ACE تمنع اصطناع Ang II وتزيد البراديكينين. حاصرات ARB تحظر مستقبِل AT1 فقط دون أن تلمس البراديكينين فتتجنب السعال.' },
        false,
        { technicalTerms: [{ term: 'ARB (anjiyotensin reseptör blokörü)', arContext: 'حاصرات مستقبلات الأنجيوتنسين (ARB)' }] }
      ),
      makeStep('pharm-mod5-les1-step-08', 'concept_check', 8,
        { tr: 'Kavram Denetimi: Hiperkalemi Riski', ar: 'فحص المفهوم: خطر فرط بوتاسيوم الدم' },
        { tr: 'RAAS blokerleri aldosteron salınımını baskıladığında serum potasyum seviyesi nasıl değişir?', ar: 'عندما تثبط أدوية RAAS إفراز الألدوستيرون، كيف يتأثر مستوى بوتاسيوم المصل؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph51-5', text: { tr: 'Potasyum böbrekten atılamaz ve kanda yükselir (hiperkalemi riski).', ar: 'يتعذر إطراح البوتاسيوم كلوياً فيرتفع بالدم (خطر فرط البوتاسيوم).' }, isCorrect: true },
              { id: 'opt-ph51-6', text: { tr: 'Potasyum tamamen sıfırlanır.', ar: 'يهبط البوتاسيوم إلى الصفر.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Aldosteron potasyum attırır; baskılanınca kanda potasyum birikir.' }
        }
      ),
      makeStep('pharm-mod5-les1-step-09', 'application', 9,
        { tr: 'Klinik Karar: Öksüren Hipertansiyon Hastası', ar: 'قرار سريري: مريض ضغط يعاني من السعال' },
        { tr: 'Ramipril kullanırken geceleri uyutmayan kuru öksürük gelişen hipertansiyon hastasında ilaç nasıl değiştirilmelidir?', ar: 'مريض ضغط يعالج بـ Ramipril وأصيب بسعال جاف يمنعه من النوم ليلاً، كيف يعدل العلاج؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph51-7', text: { tr: 'Ramipril kesilip yerine bir ARB (örneğin valsartan veya losartan) başlanmalıdır.', ar: 'يوقف Ramipril ويستبدل بحاصر ARB مثل Valsartan أو Losartan.' }, isCorrect: true },
              { id: 'opt-ph51-8', text: { tr: 'Doz iki katına çıkarılmalıdır.', ar: 'تضاعف جرعة الراميبريل إلى الضعف.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'ARB ler ADE inhibitörü öksürüğünde birinci basamak alternatiftir.' }
        }
      ),
      makeStep('pharm-mod5-les1-step-10', 'retrieval', 10,
        { tr: 'Geri Çağırma: Tetrazol ve Losartan Tasarımı', ar: 'استرجاع معرفي: حلقة التترازول وتصميم Losartan' },
        { tr: 'Medchem Modül 3 te gördüğümüz gibi losartan molekülünde karboksilik asit yerine konan klasik olmayan biyoizoster halka neydi?', ar: 'كما رأينا في مساق الكيمياء، ما هي الحلقة غير الكلاسيكية التي استبدل بها الكربوكسيل في Losartan؟' },
        false,
        { technicalTerms: [{ term: 'tetrazol biyoizosteri', arContext: 'متشابه التترازول الحيوي' }] }
      ),
      makeStep('pharm-mod5-les1-step-11', 'connection', 11,
        { tr: 'İleri Bağlantı: Diüretikler ve Nefron Segmentleri (Ders 10)', ar: 'ربط مفاهيمي: مدرات البول وأجزاء الكليون (الدرس 10)' },
        { tr: 'Aldosteronun böbrek tübüllerindeki su ve tuz tutma mekanizmasını, bir sonraki derste diüretik ilaçları incelerken tam olarak çözeceğiz.', ar: 'سنستكشف في الدرس القادم آليات احتباس الماء والملح عبر أنابيب الكلى بتفصيل دقيق عند دراسة مدرات البول.' },
        false,
        { technicalTerms: [{ term: 'diüretik mekanizması', arContext: 'آلية الإدرار' }] }
      ),
      makeStep('pharm-mod5-les1-step-12', 'mastery_check', 12,
        { tr: 'Ustalık Sınavı: RAAS İnhibisyonu', ar: 'اختبار الإتقان: تثبيط مسار RAAS' },
        { tr: 'ADE inhibitörleri ile ARB ler arasındaki en belirgin klinik farmakolojik fark nedir?', ar: 'ما الفارق الفارماكولوجي السريري الأكثر وضوحاً بين مثبطات ACE وحاصرات ARB؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph51-9', text: { tr: 'ADE inhibitörleri bradikinin biriktirerek öksürük yapar; ARB ler bradikinine dokunmaz ve öksürük yapmaz.', ar: 'مثبطات ACE تراكم البراديكينين مسببة السعال؛ بينما لا تؤثر حاصرات ARB على البراديكينين ولا تسبب سعالاً.' }, isCorrect: true },
              { id: 'opt-ph51-10', text: { tr: 'ARB ler tansiyonu hiç düşürmez.', ar: 'حاصرات ARB لا تخفض ضغط الدم مطلقاً.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Ders başarıyla tamamlandı! 3 review cards eklendi. +50 XP.' }
        }
      )
    ]
  },

  // Lesson 10 / Mod 5 Les 2: pharm-mod5-les2
  {
    id: 'pharm-mod5-les2',
    courseId: 'pharmacology',
    moduleId: 'ph-mod-05',
    title: {
      tr: 'Diüretik Mekanizmaları ve Tübüler Elektrolit Taşınması',
      ar: 'آليات مدرات البول ونقل الشوارد في النبيبات الكلوية'
    },
    order: 2,
    access: 'free',
    objective: {
      tr: 'Kıvrım, tiyazid ve potasyum tutucu diüretiklerin nefron taşıyıcıları üzerindeki moleküler mekanizmalarını ve elektrolit profillerini analiz etmek.',
      ar: 'تحليل الآليات الجزيئية لمدرات البول العروية والثيازيدية والحافظة للبوتاسيوم على نواقل الكليون ومظهر الشوارد.'
    },
    misconceptions: [
      {
        tr: 'Tüm diüretiklerin potasyum kaybettirdiği yanılgısı (spironolakton ve amilorid potasyum tutucudur).',
        ar: 'الاعتقاد الخاطئ بأن جميع مدرات البول تطرح البوتاسيوم (سبيرونولاكتون وأميلوريد حافظان للبوتاسيوم).'
      }
    ],
    sources: [{ file: 'Kardiyovasküler Sistem.pdf', page: 24 }],
    citations: [
      {
        id: 'CIT-PH10-01',
        book: "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
        edition: '14th ed.',
        topic: 'Diuretics: Tubular Transport and Electrolyte Excretion',
        chapter: 'unverified',
        page: 'unverified',
        status: 'pending-human-review'
      }
    ],
    spacedReviewCards: [
      {
        cardId: 'pharm-mod5-les2-card1',
        courseId: 'pharmacology',
        drugOrConcept: 'Kıvrım Diüretikleri Hedefi',
        prompt: 'Furosemid Henle kulpunun çıkan kalın kolunda hangi taşıyıcı proteini bloke eder?',
        answer: 'Na+/K+/2Cl- (NKCC2) kotransportörünü bloke eder; en güçlü natriüretik diüretiktir.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'pharm-mod5-les2-card2',
        courseId: 'pharmacology',
        drugOrConcept: 'Tiyazid Hedefi',
        prompt: 'Hidroklorotiyazid distal kıvrımlı tübülde hangi taşıyıcıyı inhibe eder?',
        answer: 'Na+/Cl- (NCC) kotransportörünü inhibe eder.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'pharm-mod5-les2-card3',
        courseId: 'pharmacology',
        drugOrConcept: 'Potasyum Tutucu Mekanizma',
        prompt: 'Spironolakton toplayıcı kanallarda hangi reseptörü bloke ederek potasyum tutar?',
        answer: 'Aldosteron intraselüler mineralokortikoid reseptörünü bloke eder.',
        box: 1,
        intervalDays: 1
      }
    ],
    translations: {
      tr: { title: 'Diüretik Mekanizmaları ve Tübüler Elektrolit Taşınması' },
      ar: { title: 'آليات مدرات البول ونقل الشوارد في النبيبات الكلوية' }
    },
    steps: [
      makeStep('pharm-mod5-les2-step-01', 'hook', 1,
        { tr: 'Akciğer Ödemini 15 Dakikada Boşaltmak', ar: 'تصريف الوذمة الرئوية في 15 دقيقة' },
        { tr: 'Nefes alamayan kalp yetmezliği hastasına damardan furosemid sıkıldığında, dakikalar içinde litrelerce idrar çıkışı nasıl tetiklenir?', ar: 'عند حقن Furosemide وريدياً لمريض قصور قلب يختنق بالوذمة الرئوية، كيف يخرج لترات من البول في دقائق معدودة؟' },
        false,
        { technicalTerms: [{ term: 'kıvrım diüretiği', arContext: 'مدر البول العروي' }] }
      ),
      makeStep('pharm-mod5-les2-step-02', 'question', 2,
        { tr: 'Tahmin: En Güçlü Diüretik Segmenti', ar: 'توقع: الجزء الأقوى لإدرار البول' },
        { tr: 'Filtre edilen sodyumun yaklaşık %25 inin geri emildiği Henle kulpu bloke edilirse ne kadar idrar çıkışı olur?', ar: 'عند حظر عروة Henle المسؤولة عن ارتشاف نحو 25% من الصوديوم، ما حجم الإدرار المتوقع؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph52-1', text: { tr: 'Masif ve hızlı idrar çıkışı (yüksek tavanlı diüretik etki).', ar: 'إدرار هائل وسريع للبول (تأثير المدر عالي السقف).' }, isCorrect: true },
              { id: 'opt-ph52-2', text: { tr: 'İdrar tamamen kesilir.', ar: 'ينقطع البول تماماً.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Furosemid NKCC2 yi kilitleyerek en güçlü diüretik yanıtı üretir.' }
        }
      ),
      makeStep('pharm-mod5-les2-step-03', 'intuition', 3,
        { tr: 'Sezgisel Analoji: Su Nereye, Tuz Oraya', ar: 'تشبيه حدسي: أينما ذهب الملح تبعه الماء' },
        { tr: 'Böbreğin altın kuralı: Su tuzun arkasından koşar. Tübülde sodyumu hapsederseniz, su osmozla mecburen idrarda kalır.', ar: 'القاعدة الذهبية في الكلى: الماء يتبع الملح دوماً. إذا حبست الصوديوم في الأنبوب، سيبقى الماء معه حتماً بالحلولية.' },
        false,
        { technicalTerms: [{ term: 'ozmotik çekim', arContext: 'السحب الحلولي' }] }
      ),
      makeStep('pharm-mod5-les2-step-04', 'visual_explanation', 4,
        { tr: 'Nefron Boyunca Taşıyıcı Anatomisi', ar: 'تشريح النواقل على طول أجزاء الكليون' },
        { tr: 'Henle çıkan kalın kol: NKCC2 (Furosemid hedefi). Distal tübül: NCC (Tiyazid hedefi). Toplayıcı kanal: ENaC ve Aldosteron (Spironolakton hedefi).', ar: 'عروة Henle: ناقل NKCC2 (هدف Furosemide). الأنبوب القاصي: ناقل NCC (هدف Thiazide). القناة الجامعة: قنوات ENaC والألدوستيرون.' },
        false,
        { technicalTerms: [{ term: 'NKCC2 kotransportörü', arContext: 'ناقل NKCC2' }] }
      ),
      makeStep('pharm-mod5-les2-step-05', 'interactive_artifact', 5,
        { tr: 'İnteraktif Laboratuvar: İyonizasyon ve Tübüler Taşınma', ar: 'المختبر التفاعلي: التأين والنقل النبيبي' },
        { tr: 'Furosemid, hidroklorotiyazid ve spironolaktonu nefron segmentlerine yerleştirin; sodyum, potasyum ve kalsiyum atılım profillerini izleyin.', ar: 'ضع Furosemide و Thiazide و Spironolactone في أجزاء الكليون وراقب إطراح شوارد الصوديوم والبوتاسيوم والكالسيوم.' },
        false,
        {
          widget: {
            type: 'IonizationEquilibriumSlider',
            config: { mode: 'nephron_transporters', segment: 'loop_of_henle', drug: 'furosemide' }
          }
        }
      ),
      makeStep('pharm-mod5-les2-step-06', 'guided_discovery', 6,
        { tr: 'Rehberli Keşif: Hipokalemi Paradoksu', ar: 'استكشاف موجه: مفارقة نقص بوتاسيوم الدم' },
        { tr: 'Furosemid distal tübüle devasa sodyum akıtır. Toplayıcı kanallara ulaşan aşırı sodyum potasyum atılımını neden fırlatır?', ar: 'يضخ Furosemide كميات صوديوم هائلة للقناة الجامعة. لماذا يسبب تدفق الصوديوم المفرط طرد البوتاسيوم بكثافة؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph52-3', text: { tr: 'Aşırı sodyum geri emilirken lümeni negatifleştirir ve potasyum elektriksel çekimle idrara kaçar.', ar: 'ارتشاف الصوديوم المفرط يشحن اللمعة بالسالب فيسحب البوتاسيوم كهربائياً للبول (نقص بوتاسيوم).' }, isCorrect: true },
              { id: 'opt-ph52-4', text: { tr: 'Potasyumu doğrudan böbrek yok eder.', ar: 'لأن الكلى تحطم البوتاسيوم كيميائياً.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Kıvrım ve tiyazid diüretikleri hipokalemi (düşük potasyum) riski taşır.' }
        }
      ),
      makeStep('pharm-mod5-les2-step-07', 'formal_explanation', 7,
        { tr: 'Elektrolit ve Asit-Baz Profilleri', ar: 'توازن الشوارد والحمض والأساس' },
        { tr: 'Kıvrım: Na+, K+, Cl-, Ca2+, Mg2+ atar (hipokalsemi riski). Tiyazid: Na+, K+, Cl- atar fakat Ca2+ tutar (hiperkalsemi yapabilir).', ar: 'مدرات العروة: تطرح Na+ و K+ و Ca2+ (خطر نقص الكالسيوم). الثيازيدات: تطرح Na+ و K+ لكنها تحبس Ca2+ بالجسم.' },
        false,
        { technicalTerms: [{ term: 'hipokalemi', arContext: 'نقص بوتاسيوم الدم' }, { term: 'kalsiyum tutulumu', arContext: 'احتباس الكالسيوم' }] }
      ),
      makeStep('pharm-mod5-les2-step-08', 'concept_check', 8,
        { tr: 'Kavram Denetimi: Osteoporozlu Hipertansiyon Hastası', ar: 'فحص المفهوم: مريض ضغط مصاب بهشاشة العظام' },
        { tr: 'Kemik erimesi (osteoporoz) olan bir hipertansiyon hastasında furosemid yerine neden tiyazid tercih edilir?', ar: 'في مريض ضغط يعاني من هشاشة العظام، لماذا يفضل مدر Thiazide على Furosemide؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph52-5', text: { tr: 'Tiyazidler kalsiyumun idrarla atılımını azaltarak kemikleri korur.', ar: 'لأن الثيازيدات تقلل طرح الكالسيوم البولي مما يحمي العظام من التآكل.' }, isCorrect: true },
              { id: 'opt-ph52-6', text: { tr: 'Tiyazid kalsiyumu idrarla atar.', ar: 'لأن الثيازيد يطرح الكالسيوم بالبول.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Tiyazidlerin renal kalsiyum tutucu etkisi osteoporozda ek fayda sağlar.' }
        }
      ),
      makeStep('pharm-mod5-les2-step-09', 'application', 9,
        { tr: 'Kombinasyon Sanatı: Tiyazid + Spironolakton', ar: 'فن المشاركة الدوائية: Thiazide + Spironolactone' },
        { tr: 'Tiyazid diüretiğinin yanına spironolakton eklenmesi neden mükemmel bir farmakolojik dengedir?', ar: 'لماذا تعتبر إضافة Spironolactone إلى مدر Thiazide توازناً فارماكولوجياً متقناً؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph52-7', text: { tr: 'Tiyazidin attırdığı potasyumu spironolakton tutarak serum potasyumunu dengede tutar.', ar: 'لأن سبيرونولاكتون يحبس البوتاسيوم فيعوض النقص الذي يحدثه الثيازيد ويحفظ التوازن.' }, isCorrect: true },
              { id: 'opt-ph52-8', text: { tr: 'Birbirlerinin etkisini sıfırlarlar.', ar: 'لأنهما يبطلان مفعول بعضهما.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Potasyum tutucu kombinasyonlar aritmi riskini minimize eder.' }
        }
      ),
      makeStep('pharm-mod5-les2-step-10', 'retrieval', 10,
        { tr: 'Geri Çağırma: Henderson-Hasselbalch ve İyon Tuzağı', ar: 'استرجاع معرفي: معادلة Henderson-Hasselbalch والحصار الأيوني' },
        { tr: 'Modül 1 de gördüğümüz gibi zayıf asit ilaçların böbrekten atılımını hızlandırmak için idrar nasıl modifiye ediliyordu?', ar: 'كما تعلمنا في الوحدة 1، كيف كنا نعدل pH البول لتسريع إطراح الأدوية الحامضية الضعيفة؟' },
        false,
        { technicalTerms: [{ term: 'idrar alkalileştirme', arContext: 'قلونة البول' }] }
      ),
      makeStep('pharm-mod5-les2-step-11', 'connection', 11,
        { tr: 'İleri Bağlantı: Merkezi Sinir Sistemi ve Nörofarmakoloji (Modül 6)', ar: 'ربط مفاهيمي: الجهاز العصبي المركزي (الوحدة 6)' },
        { tr: 'Kardiyovasküler sistemden sonra beynin derinliklerine iniyoruz: Modül 6 da GABA ve Dopamin yolaklarını keşfedeceğiz.', ar: 'بعد القلب والكلى ننطلق لأعماق الدماغ: في الوحدة 6، سنستكشف مسارات GABA والدوبامين العصبية.' },
        false,
        { technicalTerms: [{ term: 'merkezi sinir sistemi', arContext: 'الجهاز العصبي المركزي' }] }
      ),
      makeStep('pharm-mod5-les2-step-12', 'mastery_check', 12,
        { tr: 'Ustalık Sınavı: Diüretik Hedefleri', ar: 'اختبار الإتقان: أهداف مدرات البول' },
        { tr: 'Furosemid gibi kıvrım diüretiklerinin nefrondaki primer moleküler hedefi hangi taşıyıcı sistemdir?', ar: 'ما هو الهدف الجزيئي الأساسي لمدرات البول العروية مثل Furosemide في الكليون؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph52-9', text: { tr: 'Henle kulpu çıkan kalın kolundaki luminal Na+/K+/2Cl- (NKCC2) kotransportörü.', ar: 'ناقل Na+/K+/2Cl- (NKCC2) اللمعي في الطرف الصاعد الثخين لعروة Henle.' }, isCorrect: true },
              { id: 'opt-ph52-10', text: { tr: 'Proksimal tübül glukoz taşıyıcısı.', ar: 'ناقل الجلوكوز في الأنبوب القريب.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Modül 5 tamamlandı! 3 review cards eklendi. +50 XP.' }
        }
      )
    ]
  },

  // =========================================================================
  // MODULE 6: Merkezi Sinir Sistemi ve Nörofarmakoloji (ph-mod-06)
  // =========================================================================

  // Lesson 11 / Mod 6 Les 1: pharm-mod6-les1
  {
    id: 'pharm-mod6-les1',
    courseId: 'pharmacology',
    moduleId: 'ph-mod-06',
    title: {
      tr: 'GABAerjik Nörotransmisyon ve Pozitif Allosterik Modülatörler',
      ar: 'النقل العصبي عبر GABA والمعدلات التفارغية الإيجابية'
    },
    order: 1,
    access: 'free',
    objective: {
      tr: 'GABA-A klorür kanalı üzerinde benzodiyazepin ve barbitüratların allosterik mekanizmalarını ve güvenlik profillerini ayırt etmek.',
      ar: 'التمييز بين الآليات التفارغية للبنزوديازيبينات والباربيتورات على قناة كلوريد GABA-A وملفات أمانها.'
    },
    misconceptions: [
      {
        tr: 'Benzodiyazepinlerin GABA yokluğunda da klorür kanalını doğrudan açabileceği yanılgısı (yalnızca GABA varlığında açılma frekansını artırırlar).',
        ar: 'الاعتقاد الخاطئ بأن البنزوديازيبينات تفتح قناة الكلوريد بمفردها غيابياً دون الحاجة لوجود GABA (هي تزيد تواتر الفتح فقط).'
      }
    ],
    sources: [{ file: 'Santral Sinir Sistemi.pdf', page: 6 }],
    citations: [
      {
        id: 'CIT-PH11-01',
        book: "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
        edition: '14th ed.',
        topic: 'GABAergic Neurotransmission and Benzodiazepine Pharmacology',
        chapter: 'unverified',
        page: 'unverified',
        status: 'pending-human-review'
      }
    ],
    spacedReviewCards: [
      {
        cardId: 'pharm-mod6-les1-card1',
        courseId: 'pharmacology',
        drugOrConcept: 'Benzodiyazepin Mekanizması',
        prompt: 'Benzodiyazepinler GABA-A klorür kanalının açılma frekansını mı, yoksa açık kalma süresini mi artırır?',
        answer: 'Açılma frekansını (Frekans = Fren) artırır; doğrudan kanal açamazlar.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'pharm-mod6-les1-card2',
        courseId: 'pharmacology',
        drugOrConcept: 'Barbitürat Tehlikesi',
        prompt: 'Barbitüratlar yüksek dozda neden ölümcül solunum depresyonu yapar?',
        answer: 'Kanalın açık kalma süresini artırır ve yüksek dozda GABA olmadan kanalı doğrudan açabilirler.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'pharm-mod6-les1-card3',
        courseId: 'pharmacology',
        drugOrConcept: 'Flumazenil Antidotu',
        prompt: 'Benzodiyazepin aşırı dozunda allosterik bölgeyi yarışmalı bloke eden spesifik antidot nedir?',
        answer: 'Flumazenil spesifik yarışmalı antagonisttir.',
        box: 1,
        intervalDays: 1
      }
    ],
    translations: {
      tr: { title: 'GABAerjik Nörotransmisyon ve Pozitif Allosterik Modülatörler' },
      ar: { title: 'النقل العصبي عبر GABA والمعدلات التفارغية الإيجابية' }
    },
    steps: [
      makeStep('pharm-mod6-les1-step-01', 'hook', 1,
        { tr: 'Beynin Ana Fren Pedalı', ar: 'كابح الدماغ الأساسي' },
        { tr: 'Şiddetli panik krizindeki bir insana damardan diazepam yapıldığında 30 saniye içinde fırtına nasıl yerini derin bir dinginliğe bırakır?', ar: 'عند حقن مريض نوبة الهلع الحادة بـ Diazepam وريدياً، كيف تهدأ العاصفة الدماغية في 30 ثانية لتحل سكينة تامة؟' },
        false,
        { technicalTerms: [{ term: 'GABA-A reseptörü', arContext: 'مستقبِل GABA-A' }] }
      ),
      makeStep('pharm-mod6-les1-step-02', 'question', 2,
        { tr: 'Tahmin: Tek Başına Benzodiyazepin', ar: 'توقع: البنزوديازيبين بمفرده' },
        { tr: 'Ortamda hiç GABA nörotransmitteri yokken yüksek doz benzodiyazepin klorür kanalını açabilir mi?', ar: 'في غياب الناقل العصبي GABA تماماً، هل يستطيع تركيز عالٍ من البنزوديازيبين فتح قناة الكلوريد بمفرده؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph61-1', text: { tr: 'Hayır, pozitif allosterik modülatördür; kanalın açılması için mutlaka GABA bağlanmalıdır.', ar: 'لا، فهو معدل تفارغي إيجابي؛ ويلزم حتماً وجود GABA لتنفتح القناة.' }, isCorrect: true },
              { id: 'opt-ph61-2', text: { tr: 'Evet, GABA dan bağımsız açar.', ar: 'نعم، يفتح القناة بمعزل عن GABA.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Benzodiyazepinler doğrudan agonist değildir; yalnızca GABA nın etkisini amplifiye ederler.' }
        }
      ),
      makeStep('pharm-mod6-les1-step-03', 'intuition', 3,
        { tr: 'Sezgisel Analoji: Kapının Menteşesini Yağlamak', ar: 'تشبيه حدسي: تزييت مفصلات الباب' },
        { tr: 'GABA kapıyı iten eldir; benzodiyazepin ise menteşeleri yağlar. El itmezse kapı açılmaz, ancak el ittiğinde kapı sonuna kadar defalarca açılır.', ar: 'GABA هو اليد التي تدفع الباب، والبنزوديازيبين زيت المفصلات. إن لم تدفع اليد لا يفتح الباب، لكن بوجودها يفتح بسهولة متكررة.' },
        false,
        { technicalTerms: [{ term: 'allosterik modülasyon', arContext: 'التعديل التفارغي' }] }
      ),
      makeStep('pharm-mod6-les1-step-04', 'visual_explanation', 4,
        { tr: 'GABA-A Pentamerik Klorür Kanal Kompleksi', ar: 'معقد قناة الكلوريد الخماسية GABA-A' },
        { tr: '2 alfa, 2 beta ve 1 gama alt birimi merkezde Cl- poru oluşturur. GABA alfa/beta arayüzüne, benzodiyazepin ise alfa/gama arayüzüne bağlanır.', ar: 'تتألف القناة من وحدات 2 alfa و 2 beta و 1 gamma حول مسرى Cl-. يرتبط GABA بين alfa/beta، بينما يرتبط البنزوديازيبين بين alfa/gamma.' },
        false,
        { technicalTerms: [{ term: 'klorür kanalı', arContext: 'قناة الكلوريد' }] }
      ),
      makeStep('pharm-mod6-les1-step-05', 'interactive_artifact', 5,
        { tr: 'İnteraktif Simülatör: Dose-Response Modulator (Allosterik Kayma)', ar: 'محاكي تفاعلي: معدل الجرعة والاستجابة (الإزاحة التفارغية)' },
        { tr: 'GABA doz-yanıt eğrisine diazepam ekleyin. Eğrinin sola kayışını (potens artışı) ve klorür akımındaki amplifikasyonu gözlemleyin.', ar: 'أضف Diazepam إلى منحنى جرعة GABA. راقب إزاحة المنحنى لليسار (تضاعف القوة) وتضخيم تدفق شوارد الكلوريد السالبة.' },
        false,
        {
          widget: {
            type: 'DoseResponseCurve',
            config: { mode: 'allosteric_potentiation', modulator: 'benzodiazepine', leftShiftFactor: 10 }
          }
        }
      ),
      makeStep('pharm-mod6-les1-step-06', 'guided_discovery', 6,
        { tr: 'Rehberli Keşif: Benzodiyazepin vs Barbitürat Güvenliği', ar: 'استكشاف موجه: أمان البنزوديازيبين مقابل الباربيتورات' },
        { tr: 'Barbitüratlar (fenobarbital) yüksek dozda GABA olmadan da klorür kanalını açık tutabilir. Bu fark neden ölümcüldür?', ar: 'تستطيع الباربيتورات بالجرعة العالية فتح قناة الكلوريد حتى بغياب GABA. لماذا يجعلها هذا خطرة ومميتة؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph61-3', text: { tr: 'Tavan etkisi yoktur; medulladaki solunum merkezini tamamen susturarak ölüme yol açar.', ar: 'لغياب تأثير السقف الآمن؛ فتثبط مركز التنفس في البصلة السيسائية حتى الموت.' }, isCorrect: true },
              { id: 'opt-ph61-4', text: { tr: 'Barbitüratlar daha güvenlidir.', ar: 'الباربيتورات أكثر أماناً بكثير.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Benzodiyazepinler GABA bağımlı tavan etkileri sayesinde çok daha güvenlidir.' }
        }
      ),
      makeStep('pharm-mod6-les1-step-07', 'formal_explanation', 7,
        { tr: 'Hiperpolarizasyon ve Nöronal İnhibisyon', ar: 'فرط الاستقطاب والتثبيط العصبي' },
        { tr: 'Cl- iyonları hücre içine aktığında dinlenim zar potansiyeli -70 mV den -85 mV a düşer (hiperpolarizasyon). Nöron aksiyon potansiyeli üretemez.', ar: 'بدخول شوارد Cl- يهبط جهد الغشاء من -70 mV إلى -85 mV (فرط استقطاب). يعجز العصبون عن توليد جهد فعل مستثار.' },
        false,
        { technicalTerms: [{ term: 'hiperpolarizasyon', arContext: 'فرط الاستقطاب (Hyperpolarization)' }] }
      ),
      makeStep('pharm-mod6-les1-step-08', 'concept_check', 8,
        { tr: 'Kavram Denetimi: Frekans mı Süre mi?', ar: 'فحص المفهوم: التواتر أم مدة الفتح؟' },
        { tr: 'Benzodiyazepinler ve barbitüratların klorür kanalı kinetiğindeki temel farkı nedir?', ar: 'ما الفارق الحركي الجوهري بين البنزوديازيبينات والباربيتورات على قناة الكلوريد؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph61-5', text: { tr: 'Benzodiyazepinler kanalın açılma frekansını artırır; Barbitüratlar açık kalma süresini uzatır.', ar: 'البنزوديازيبين يزيد تواتر الفتح (Frequency)؛ بينما الباربيتورات تطيل مدة الفتح (Duration).' }, isCorrect: true },
              { id: 'opt-ph61-6', text: { tr: 'Hiçbir kinetik fark yoktur.', ar: 'لا يوجد أي فارق حركي بينهما.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Formül: Benzo = Frekans (Fren), Barbi = Süre (Duration).' }
        }
      ),
      makeStep('pharm-mod6-les1-step-09', 'application', 9,
        { tr: 'Klinik Antidot: Flumazenil ile Kurtarma', ar: 'تطبيق سريري: الإنقاذ بترياق Flumazenil' },
        { tr: 'Aşırı doz diazepam ile komaya giren hastaya IV flumazenil verildiğinde hasta neden dakikalar içinde uyanır?', ar: 'عند إعطاء Flumazenil وريدياً لمريض دخل في غيبوبة بجرعة مفرطة من Diazepam، لماذا يستيقظ في دقائق؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph61-7', text: { tr: 'Flumazenil allosterik cebi yarışmalı bloke ederek diazepamı kovar fakat kanala dokunmaz.', ar: 'يحظر Flumazenil الجيب التفارغي تنافسياً فيطرد Diazepam دون التأثير السلبي على القناة.' }, isCorrect: true },
              { id: 'opt-ph61-8', text: { tr: 'Klorür kanallarını parçalar.', ar: 'يحطم قنوات الكلوريد نهائياً.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Flumazenil benzodiyazepin zehirlenmesinin saf yarışmalı nötr antagonistidir.' }
        }
      ),
      makeStep('pharm-mod6-les1-step-10', 'retrieval', 10,
        { tr: 'Geri Çağırma: Reseptör Antagonizmi Tipleri', ar: 'استرجاع معرفي: أنماط مناهضة المستقبِلات' },
        { tr: 'Modül 2 de gördüğümüz gibi aynı bağlanma cebine oturup doza bağlı yarışan ligandlara ne ad veriyorduk?', ar: 'كما رأينا في الوحدة 2، ماذا نسمي الربيطات التي تتنافس على نفس جيب الارتباط وتنزاح بزيادة الجرعة؟' },
        false,
        { technicalTerms: [{ term: 'yarışmalı antagonist', arContext: 'المناهض التنافسي' }] }
      ),
      makeStep('pharm-mod6-les1-step-11', 'connection', 11,
        { tr: 'İleri Bağlantı: Dopaminerjik Yolaklar ve Antipsikotikler (Ders 12)', ar: 'ربط مفاهيمي: المسارات الدوبامينية ومضادات الذهان (الدرس 12)' },
        { tr: 'GABA beynin ana inhibitörüdür. Platformun 22. ve son dersinde motivasyon ve psikozun yöneticisi olan Dopamin yolaklarını inceleyeceğiz.', ar: 'ناقل GABA كابح الدماغ الأساسي. في الدرس الـ 22 والأخير، سنستكشف مسارات الدوبامين الحاكمة للدوافع والذهان.' },
        false,
        { technicalTerms: [{ term: 'dopaminerjik yolak', arContext: 'المسار الدوباميني' }] }
      ),
      makeStep('pharm-mod6-les1-step-12', 'mastery_check', 12,
        { tr: 'Ustalık Sınavı: GABA-A ve Pozitif Modülasyon', ar: 'اختبار الإتقان: مستقبِل GABA-A والتعديل الإيجابي' },
        { tr: 'Benzodiyazepinlerin GABA-A reseptörü üzerindeki moleküler etki mekanizması en doğru şekilde nasıl tanımlanır?', ar: 'كيف تعرف الآلية الجزيئية للبنزوديازيبينات على مستقبِل GABA-A بأعلى دقة علمية؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph61-9', text: { tr: 'GABA varlığında klorür kanalının açılma frekansını artıran pozitif allosterik modülatör.', ar: 'معدل تفارغي إيجابي يزيد تواتر فتح قناة الكلوريد بوجود ناقل GABA حصراً.' }, isCorrect: true },
              { id: 'opt-ph61-10', text: { tr: 'Klorür kanalını bloke eden antagonist.', ar: 'مناهض يغلق قنوات الكلوريد.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Ders başarıyla tamamlandı! 3 review cards eklendi. +50 XP.' }
        }
      )
    ]
  },

  // Lesson 12 / Mod 6 Les 2: pharm-mod6-les2
  {
    id: 'pharm-mod6-les2',
    courseId: 'pharmacology',
    moduleId: 'ph-mod-06',
    title: {
      tr: 'Dopaminerjik Yolaklar ve Antipsikotik Reseptör Profilleri',
      ar: 'المسارات الدوبامينية والمظهر المستقبلاتي لمضادات الذهان'
    },
    order: 2,
    access: 'free',
    objective: {
      tr: 'Dört merkezi dopaminerjik yolağı, D2 reseptör blokaj eşiğini (%65-80) ve atipik antipsikotiklerin 5-HT2A/D2 dengesini kavramak.',
      ar: 'إتقان المسارات الدوبامينية المركزية الأربعة، وعتبة حظر D2 (65-80%)، وتوازن 5-HT2A/D2 لمضادات الذهان غير النمطية.'
    },
    misconceptions: [
      {
        tr: 'D2 reseptörünü ne kadar çok bloke edersek antipsikotik etkinin o kadar iyi olacağı yanılgısı (%80 in üzerinde şiddetli parkinson benzeri ekstrapiramidal semptomlar çıkar).',
        ar: 'الظن الخاطئ بأن زيادة حظر D2 تحسن الفعالية دوماً (تجاوز 80% يفجر أعراضاً خارج هرمية شلل-رعاشية حادة).'
      }
    ],
    sources: [{ file: 'Santral Sinir Sistemi.pdf', page: 22 }],
    citations: [
      {
        id: 'CIT-PH12-01',
        book: "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
        edition: '14th ed.',
        topic: 'Dopaminergic Pathways and Antipsychotic Receptor Profiles',
        chapter: 'unverified',
        page: 'unverified',
        status: 'pending-human-review'
      }
    ],
    spacedReviewCards: [
      {
        cardId: 'pharm-mod6-les2-card1',
        courseId: 'pharmacology',
        drugOrConcept: 'Terapötik D2 Blokaj Penceresi',
        prompt: 'Antipsikotik etkinlik ve ekstrapiramidal güvenliğin sağlandığı D2 reseptör doluluk penceresi nedir?',
        answer: '%65 ila %80 doluluk aralığıdır. %65 in altında etki yetersiz, %80 in üstünde EPS gelişir.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'pharm-mod6-les2-card2',
        courseId: 'pharmacology',
        drugOrConcept: 'Dört Dopamin Yolağı',
        prompt: 'Antipsikotik etkinin görüldüğü ve ekstrapiramidal yan etkinin (EPS) çıktığı iki yolak hangileridir?',
        answer: 'Antipsikotik etki Mezolimbik yolakta; motor yan etki (EPS) Nigrostriatal yolakta görülür.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'pharm-mod6-les2-card3',
        courseId: 'pharmacology',
        drugOrConcept: 'Atipik Antipsikotik Sırrı',
        prompt: 'İkinci kuşak atipik antipsikotikler (olanzapin, klozapin) neden daha az ekstrapiramidal yan etki yapar?',
        answer: 'Güçlü 5-HT2A serotonin blokajı nigrostriatal yolda dopamin salınımını serbest bırakarak EPS yi önler.',
        box: 1,
        intervalDays: 1
      }
    ],
    translations: {
      tr: { title: 'Dopaminerjik Yolaklar ve Antipsikotik Reseptör Profilleri' },
      ar: { title: 'المسارات الدوبامينية والمظهر المستقبلاتي لمضادات الذهان' }
    },
    steps: [
      makeStep('pharm-mod6-les2-step-01', 'hook', 1,
        { tr: 'Halüsinasyonları Sustururken Bedeni Kilitlemek', ar: 'إسكات الهلاوس وتصلب الجسد' },
        { tr: 'Şizofreni hastasının hezeyanlarını dindiren haloperidol, neden aynı zamanda hastanın kaslarını kurşun boru gibi kaskatı kilitler?', ar: 'دواء Haloperidol الذي يسكت هلاوس الفصام، لماذا يقفل عضلات المريض في الوقت ذاته كتصلب أنابيب الرصاص؟' },
        false,
        { technicalTerms: [{ term: 'D2 reseptör blokajı', arContext: 'حظر مستقبِلات D2' }] }
      ),
      makeStep('pharm-mod6-les2-step-02', 'question', 2,
        { tr: 'Tahmin: İdeal Blokaj Yüzdesi', ar: 'توقع: نسبة الإشغال المثالية' },
        { tr: 'Pozitron Emisyon Tomografisinde (PET) antipsikotik ilacın beyindeki D2 reseptör doluluğu %85 e çıktığında ne olur?', ar: 'عندما يرتفع إشغال مضاد الذهان لمستقبلات D2 في تصوير PET إلى 85%، ماذا يحدث للمريض؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph62-1', text: { tr: 'Şiddetli ekstrapiramidal semptomlar (EPS: akut distoni, parkinsonizm) başlar.', ar: 'تتفجر أعراض خارج هرمية حادة (EPS: خلل توتر، متلازمة باركنسون الدوائية).' }, isCorrect: true },
              { id: 'opt-ph62-2', text: { tr: 'Hasta tamamen iyileşir ve yan etki sıfırlanır.', ar: 'يشفى المريض تماماً وتتلاشى الآثار الجانبية.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: '%65-80 arası terapötik penceredir; %80 in üzeri kaçınılmaz motor blokaj yaratır.' }
        }
      ),
      makeStep('pharm-mod6-les2-step-03', 'intuition', 3,
        { tr: 'Sezgisel Model: 4 Farklı Odaya Açılan Tek Şalter', ar: 'تشبيه حدسي: مفتاح واحد يتحكم بأربع غرف متباينة' },
        { tr: 'D2 blokerini aldığınızda 4 odaya birden girer: 1. Deliryumu söndürür, 2. Motor hareketleri kilitler, 3. Prolaktini artırır, 4. Duyguları köreltir.', ar: 'مضاد D2 مفتاح يطفئ 4 غرف معاً: 1. يسكت الهذيان، 2. يقفل الحركة الحركية، 3. يرفع هرمون الحليب، 4. يبلد المشاعر.' },
        false,
        { technicalTerms: [{ term: 'ekstrapiramidal semptom', arContext: 'الأعراض خارج الهرمية (EPS)' }] }
      ),
      makeStep('pharm-mod6-les2-step-04', 'visual_explanation', 4,
        { tr: 'Dört Dopaminerjik Yolak Haritası', ar: 'خارطة المسارات الدوبامينية الأربعة' },
        { tr: '1. Mezolimbik (pozitif semptomlar), 2. Mezokortikal (negatif semptomlar), 3. Nigrostriatal (motor kontrol / EPS), 4. Tuberoinfundibuler (prolaktin baskısı).', ar: '1. الحافي (الأعراض الإيجابية)، 2. القشري (الأعراض السلبية)، 3. المخطط (التحكم الحركي/EPS)، 4. القمعي (كبح البرولاكتين).' },
        false,
        { technicalTerms: [{ term: 'nigrostriatal yolak', arContext: 'المسار الأسود المخطط' }] }
      ),
      makeStep('pharm-mod6-les2-step-05', 'interactive_artifact', 5,
        { tr: 'İnteraktif Atölye: Receptor-Ligand Matcher (D2/5-HT2A)', ar: 'ورشة تفاعلية: مطابق مستقبلات D2 و 5-HT2A' },
        { tr: 'Haloperidol ve olanzapini test edin. D2 doluluğunu %65-80 penceresine ayarlayın; 5-HT2A blokajının motor fonksiyonu nasıl kurtardığını gözlemleyin.', ar: 'قارن Haloperidol مع Olanzapine. اضبط إشغال D2 في نافذة 65-80% وشاهد كيف ينقذ حظر 5-HT2A الوظائف الحركية.' },
        false,
        {
          widget: {
            type: 'ReceptorLigandMatcher',
            config: { mode: 'antipsychotic_profiling', receptors: ['d2_striatal', '5ht2a_cortical'] }
          }
        }
      ),
      makeStep('pharm-mod6-les2-step-06', 'guided_discovery', 6,
        { tr: 'Rehberli Keşif: Atipiklerin 5-HT2A Kurtarma Mekanizması', ar: 'استكشاف موجه: آلية إنقاذ 5-HT2A في مضادات الذهان غير النمطية' },
        { tr: 'Serotonin nigrostriatal yolda dopamin salınımını frenler. İkinci kuşak antipsikotik 5-HT2A yı bloke ettiğinde striatumda ne olur?', ar: 'يكبح السيروتونين تحرر الدوبامين حركياً. عندما يحظر مضاد الذهان غير النمطي 5-HT2A، ماذا يحدث في الجسم المخطط؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph62-3', text: { tr: 'Fren kalkar; striatumda lokal dopamin salınarak D2 blokajı dengelenir ve EPS önlenir.', ar: 'يزول الكبح؛ فيتحرر الدوبامين محلياً ليعادل حظر D2 ويحمي المريض من أعراض EPS.' }, isCorrect: true },
              { id: 'opt-ph62-4', text: { tr: 'Hasta komaya girer.', ar: 'يدخل المريض في غيبوبة.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: '5-HT2A antagonizması motor yolda dopamini kurtarır; atipik antipsikotiklerin sırrı budur.' }
        }
      ),
      makeStep('pharm-mod6-les2-step-07', 'formal_explanation', 7,
        { tr: 'PET Doluluk Penceresi ve Reseptör Kinetiği', ar: 'نافذة الإشغال في تصوير PET وحركية المستقبل' },
        { tr: 'Kapak D2 doluluk kuralı: <%65 yanıtsız, %65-80 optimal klinik yanıt, >%80 EPS riski. Hızlı dissosiasyon (koff) sergileyen ilaçlar (ketiapin) güvenlidir.', ar: 'قاعدة إشغال D2: أقل من 65% غير فعال، 65-80% نافذة مثالية، أكثر من 80% خطر EPS. الانفصال السريع (koff) يمنح أماناً إضافياً.' },
        false,
        { technicalTerms: [{ term: 'PET doluluk penceresi', arContext: 'نافذة الإشغال في PET' }] }
      ),
      makeStep('pharm-mod6-les2-step-08', 'concept_check', 8,
        { tr: 'Kavram Denetimi: Tuberoinfundibuler Yol ve Prolaktin', ar: 'فحص المفهوم: المسار القمعي وهرمون البرولاكتين' },
        { tr: 'Dopamin hipofizde prolaktin salınımını doğal olarak baskılar. D2 blokerleri bu yolu kilitlediğinde ne gelişir?', ar: 'يكبح الدوبامين إفراز هرمون الحليب (البرولاكتين). عند حظر مستقبلات D2 في هذا المسار، ماذا يظهر؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph62-5', text: { tr: 'Hiperprolaktinemi, galaktore (memeden süt gelmesi) ve jinekomasti.', ar: 'فرط برولاكتين الدم، ثر اللبن (galaktore) وتثدي الرجال.' }, isCorrect: true },
              { id: 'opt-ph62-6', text: { tr: 'Kan şekeri sıfırlanır.', ar: 'يهبط سكر الدم للصفر.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Tuberoinfundibuler blokaj hiperprolaktinemi yan etkisinden sorumludur.' }
        }
      ),
      makeStep('pharm-mod6-les2-step-09', 'application', 9,
        { tr: 'Klinik Karar: Tipikten Atipiğe Geçiş', ar: 'قرار سريري: التحول من النمطي إلى غير النمطي' },
        { tr: 'Haloperidol kullanırken ellerinde titreme ve boyun distonisi (EPS) başlayan genç şizofreni hastasında tedavi nasıl revize edilmelidir?', ar: 'مريض فصام بدأ يعاني من رعاش وتشنج عنقي حاد (EPS) بسبب Haloperidol، كيف يعدل علاجه؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph62-7', text: { tr: 'Düşük EPS riskli ikinci kuşak atipik antipsikotiğe (örneğin aripiprazol veya olanzapin) geçilmelidir.', ar: 'التحول إلى مضاد ذهان غير نمطي من الجيل الثاني منخفض خطر EPS مثل Aripiprazole أو Olanzapine.' }, isCorrect: true },
              { id: 'opt-ph62-8', text: { tr: 'Haloperidol dozu artırılmalıdır.', ar: 'زيادة جرعة الهالوبيريدول.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Atipik antipsikotikler yaşam kalitesini ve motor güvenliği korur.' }
        }
      ),
      makeStep('pharm-mod6-les2-step-10', 'retrieval', 10,
        { tr: 'Geri Çağırma: Tersinir Kinetik ve Koff', ar: 'استرجاع معرفي: الحركية العكوسة ومعدل koff' },
        { tr: 'Modül 1 de gördüğümüz gibi ilacın reseptörden hızla ayrışmasını ifade eden kinetik parametre neydi?', ar: 'كما رأينا في الوحدة 1، ما هو المعامل الحركي الذي يعبر عن سرعة انفصال الدواء عن المستقبِل؟' },
        false,
        { technicalTerms: [{ term: 'koff ayrışma hızı', arContext: 'معدل الانفصال koff' }] }
      ),
      makeStep('pharm-mod6-les2-step-11', 'connection', 11,
        { tr: 'Büyük Final: 22 Derslik Müfredatın Tamamlanışı', ar: 'الختام الكبير: إتمام منهاج الـ 22 درساً' },
        { tr: 'Tebrikler! Farmasötik Kimya ve Farmakoloji müfredatının 22 temel dersini tamamladınız. Artık ilaçların kimyasını ve canlıdaki kaderini biliyorsunuz.', ar: 'تهانينا الحارة! لقد أتممت بنجاح الدروس الـ 22 المجانية عبر مساقي Farmasötik Kimya و Farmakoloji.' },
        false,
        { technicalTerms: [{ term: 'konsept ustalığı', arContext: 'إتقان المفاهيم' }] }
      ),
      makeStep('pharm-mod6-les2-step-12', 'mastery_check', 12,
        { tr: 'Müfredat Ustalık Sınavı: D2 Terapötik Pencere', ar: 'اختبار الإتقان الختامي للمنهاج: نافذة D2 العلاجية' },
        { tr: 'Antipsikotik etkinin sağlandığı fakat ekstrapiramidal motor yan etkilerin (EPS) henüz başlamadığı optimal D2 doluluk aralığı nedir?', ar: 'ما هو النطاق المثالي لإشغال مستقبلات D2 الذي يضمن الفعالية المضادة للذهان دون إثارة أعراض EPS الحركية؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph62-9', text: { tr: '%65 ila %80 D2 reseptör doluluğu.', ar: 'إشغال يتراوح بين 65% و 80% لمستقبلات D2.' }, isCorrect: true },
              { id: 'opt-ph62-10', text: { tr: '%100 doluluk.', ar: 'إشغال 100% بالكامل.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: '22 Derslik Müfredat Başarıyla Tamamlandı! Büyük Ustalık Rozeti Kazanıldı! +50 XP.' }
        }
      )
    ]
  }
];

console.log('Pharmacology Modules 2 through 6 authored.');
