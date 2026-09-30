/**
 * scripts/data-pharmacology-modules1-6.mjs
 * 
 * Master Pedagogical Blueprints for the 12 Free Lessons in Course B: Farmakoloji.
 * Modules 1 through 6 (2 lessons each = 12 lessons total).
 * Strictly complies with the 12-stage concept mastery anatomy, prompt <= 40 words,
 * Turkish academic terminology ("Farmakoloji"), and the Special Arabic Rule.
 */

import { makeStep } from './build-22-lessons.mjs';

export const pharmacologyLessons = [
  // =========================================================================
  // MODULE 1: İlaç-Reseptör Etkileşimleri ve Bağlanma Kuvvetleri (ph-mod-01)
  // =========================================================================

  // Lesson 1: pharm-mod1-les1
  {
    id: 'pharm-mod1-les1',
    courseId: 'pharmacology',
    moduleId: 'ph-mod-01',
    title: {
      tr: 'Makromoleküler İlaç Hedefleri ve Kütle Etkisi Dengesi',
      ar: 'أهداف الأدوية الجزيئية وتوازن فعل الكتلة'
    },
    order: 1,
    access: 'free',
    objective: {
      tr: 'Kütle etkisi kanununu kullanarak ilaç-reseptör bağlanma dengesini, Kd ayrışma sabitini ve doluluk fraksiyonunu hesaplamak.',
      ar: 'حساب توازن ارتباط الدواء بالمستقبل وثابت التفكك Kd ونسبة الإشغال باستخدام قانون فعل الكتلة.'
    },
    misconceptions: [
      {
        tr: 'Kd değerinin yüksek olmasının ilacın hedefine daha sıkı bağlandığı anlamına geldiği yanılgısı (düşük Kd = yüksek afinite).',
        ar: 'الظن الخاطئ بأن ارتفاع قيمة Kd يعني ارتباطاً أقوى بالهدف (انخفاض Kd = ألفة أعلى).'
      }
    ],
    sources: [{ file: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf', page: 6 }],
    citations: [
      {
        id: 'CIT-PH01-01',
        book: "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
        edition: '14th ed.',
        topic: 'Drug-Receptor Interactions and Mass Action Kinetics',
        chapter: 'unverified',
        page: 'unverified',
        status: 'pending-human-review'
      }
    ],
    spacedReviewCards: [
      {
        cardId: 'pharm-mod1-les1-card1',
        courseId: 'pharmacology',
        drugOrConcept: 'Kd Ayrışma Sabiti Tanımı',
        prompt: 'Kd ayrışma sabiti ligand konsantrasyonu cinsinden neyi ifade eder?',
        answer: 'Reseptörlerin tam olarak yüzde 50 sinin bağlandığı (yarı doluluk) serbest ligand derişimidir.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'pharm-mod1-les1-card2',
        courseId: 'pharmacology',
        drugOrConcept: 'Reseptör Doluluk Formülü (Theta)',
        prompt: 'Fraksiyonel reseptör doluluğu (theta) ligand [L] ve Kd cinsinden nasıl hesaplanır?',
        answer: 'Theta = [L] / ([L] + Kd).',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'pharm-mod1-les1-card3',
        courseId: 'pharmacology',
        drugOrConcept: 'Afinite ve Kd İlişkisi',
        prompt: 'Bir ilacın Kd si 10^-9 M (nM), diğerininki 10^-6 M (uM) ise hangisi daha güçlü bağlanır?',
        answer: 'nM düzeyindeki ilaç 1000 kat daha yüksek afiniteye sahiptir; küçük Kd daha sıkı bağlanma demektir.',
        box: 1,
        intervalDays: 1
      }
    ],
    translations: {
      tr: { title: 'Makromoleküler İlaç Hedefleri ve Kütle Etkisi Dengesi' },
      ar: { title: 'أهداف الأدوية الجزيئية وتوازن فعل الكتلة' }
    },
    steps: [
      makeStep('pharm-mod1-les1-step-01', 'hook', 1,
        { tr: 'Milyarlarca Hücrede Tek Bir Molekülü Bulmak', ar: 'إيجاد جزيء واحد بين مليارات الخلايا' },
        { tr: 'Dolaşımdaki ilaç molekülleri trilyonlarca protein arasından nasıl kendi hedef reseptörünü seçip tam aranan kilide oturur?', ar: 'كيف تنتقي جزيئات الدواء في الدورة الدموية مستقبِلها الهدف (reseptör) من بين تريليونات البروتينات وتستقر في قفله الخاص؟' },
        false,
        { technicalTerms: [{ term: 'reseptör', arContext: 'المستقبِل الدوائي' }] }
      ),
      makeStep('pharm-mod1-les1-step-02', 'question', 2,
        { tr: 'Tahmin: Serbest Ligand Derişimi [L] = Kd Olduğunda', ar: 'توقع: عندما يكون تركيز الربيط [L] مساوياً لـ Kd' },
        { tr: 'Ortamdaki serbest ilaç derişimi ilacın Kd ayrışma sabitine eşit olduğunda reseptörlerin ne kadarı dolmuştur?', ar: 'عندما يتساوى تركيز الدواء الحر في الوسط مع ثابت التفكك Kd، كم تبلغ نسبة إشغال المستقبِلات؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph11-1', text: { tr: 'Tam olarak %50 si doludur.', ar: '50% منها تماماً.' }, isCorrect: true },
              { id: 'opt-ph11-2', text: { tr: '%100 ü doludur.', ar: '100% منها ممتلئة بالكامل.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: '[L] = Kd olduğunda Theta = Kd / (Kd + Kd) = 0.50 (%50 doluluk).' }
        }
      ),
      makeStep('pharm-mod1-les1-step-03', 'intuition', 3,
        { tr: 'Sezgisel Analoji: Sandalye Kapmaca Oyunu', ar: 'تشبيه حدسي: لعبة الكراسي الموسيقية' },
        { tr: 'Odada 100 sandalye (reseptör) ve koşuşturan çocuklar (ligand) var. Çocuk sayısı arttıkça boş sandalye kalma olasılığı hızla sıfıra yaklaşır.', ar: 'في الغرفة 100 مقعد (reseptör) وأطفال يركضون (ligand). مع تزايد عدد الأطفال تقترب احتمالية بقاء مقعد شاغر من الصفر.' },
        false,
        { technicalTerms: [{ term: 'kütle etkisi', arContext: 'فعل الكتلة' }] }
      ),
      makeStep('pharm-mod1-les1-step-04', 'visual_explanation', 4,
        { tr: 'Doygunluk Bağlanma İzotermi', ar: 'منحنى التشبع المتساوي للارتباط' },
        { tr: 'Bağlanma grafiği dikdörtgen hiperbol şeklindedir. Düşük konsantrasyonda dik yükselir, yüksek konsantrasyonda Bmax tavanına asimptotik olarak doyar.', ar: 'يأخذ منحنى الارتباط شكل قطع زائد. يرتفع حاداً بالتركيز المنخفض، ثم يستقر أفقياً عند سقف الإشغال الأعظمي Bmax.' },
        false,
        { technicalTerms: [{ term: 'Bmax', arContext: 'السعة القصوى للارتباط' }] }
      ),
      makeStep('pharm-mod1-les1-step-05', 'interactive_artifact', 5,
        { tr: 'İnteraktif Model: Receptor-Ligand Matcher (Kd)', ar: 'نموذج تفاعلي: مطابق الربيط والمستقبل (Kd)' },
        { tr: 'Ligand konsantrasyonunu 1 nM den 100 uM ye artırarak dinamik bağlanma-ayrışma kinetiğini ve fraksiyonel doluluğu (Theta) izleyin.', ar: 'ارفع تركيز الربيط من 1 nM إلى 100 uM لمراقبة حركية الارتباط والانفصال ونسبة إشغال المستقبلات (Theta).' },
        false,
        {
          widget: {
            type: 'ReceptorLigandMatcher',
            config: { mode: 'mass_action_equilibrium', targetKd: 10, concentrationUnit: 'nM' }
          }
        }
      ),
      makeStep('pharm-mod1-les1-step-06', 'guided_discovery', 6,
        { tr: 'Rehberli Keşif: 9 Katı Kuralı', ar: 'استكشاف موجه: قاعدة التسعة أضعاف' },
        { tr: 'Reseptör doluluğunu %10 dan %90 a çıkarmak için serbest ilaç derişimini kaç kat artırmak gerekir?', ar: 'لرفع نسبة إشغال المستقبل من 10% إلى 90%، كم ضعفاً يجب زيادة تركيز الدواء الحر؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph11-3', text: { tr: 'Tam 81 kat (0.11 Kd den 9 Kd ye).', ar: '81 ضعفاً تماماً (من 0.11 Kd إلى 9 Kd).' }, isCorrect: true },
              { id: 'opt-ph11-4', text: { tr: '9 kat.', ar: '9 أضعاف فقط.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Kütle etkisi kanunu gereği %10 dan %90 doluluğa geçiş tam 81 kat konsantrasyon artışı ister.' }
        }
      ),
      makeStep('pharm-mod1-les1-step-07', 'formal_explanation', 7,
        { tr: 'Kütle Etkisi ve Clark Reseptör Teorisi', ar: 'قانون فعل الكتلة ونظرية Clark للمستقبلات' },
        { tr: 'A.J. Clark (1933): Yanıt doğrudan reseptör doluluğuyla orantılıdır: E / Emax = [L] / ([L] + Kd). Kd = koff / kon oranıdır.', ar: 'A.J. Clark (1933): تتناسب الاستجابة طردياً مع نسبة الإشغال: E / Emax = [L] / ([L] + Kd). يمثل Kd نسبة ثابت الانفصال koff إلى kon.' },
        false,
        { technicalTerms: [{ term: 'Clark teorisi', arContext: 'نظرية Clark' }, { term: 'Kd ayrışma sabiti', arContext: 'ثابت التفكك Kd' }] }
      ),
      makeStep('mc-mod1-les1-step-08', 'concept_check', 8,
        { tr: 'Kavram Denetimi: Kd ve İlaç Etki Gücü', ar: 'فحص المفهوم: Kd وقوة الدواء' },
        { tr: 'İlaç A nın Kd si 0.1 nM, İlaç B nin Kd si 100 nM dir. Hangisi reseptörüne daha yüksek afiniteyle bağlanır?', ar: 'الدواء A يمتلك Kd = 0.1 nM، والدواء B يمتلك Kd = 100 nM. أيهما يرتبط بألفة أعلى بمستقبله (reseptör)؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph11-5', text: { tr: 'İlaç A; küçük Kd daha sıkı bağlanma ve 1000 kat yüksek afinite demektir.', ar: 'الدواء A؛ لأن صغر Kd يعني ارتباطاً أشد وألفة أعلى بـ 1000 ضعف.' }, isCorrect: true },
              { id: 'opt-ph11-6', text: { tr: 'İlaç B; büyük Kd daha güçlüdür.', ar: 'الدواء B؛ لأن كبر Kd يمنح قوة أكبر.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Kd derişim birimidir; ne kadar küçükse ilacın reseptörü doyurması o kadar kolaydır.' }
        }
      ),
      makeStep('pharm-mod1-les1-step-09', 'application', 9,
        { tr: 'Klinik Karar: Hedef Doluluk Oranı', ar: 'قرار سريري: نسبة الإشغال المستهدفة' },
        { tr: 'Bir monoklonal antikor tümör reseptörünü bloke edecektir. Hedefin %99 unu sürekli kilitli tutmak için plazma konsantrasyonu kaç Kd olmalıdır?', ar: 'جسم مضاد وحيد النسيلة يستهدف مستقبلاً ورمياً. لإبقاء 99% من الهدف مقفلاً، كم يجب أن يكون تركيزه بالبلازما نسبة إلى Kd؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph11-7', text: { tr: 'En az 99 x Kd düzeyinde tutulmalıdır.', ar: 'يجب الحفاظ عليه عند 99 x Kd على الأقل.' }, isCorrect: true },
              { id: 'opt-ph11-8', text: { tr: '1 x Kd yeterlidir.', ar: '1 x Kd كافية تماماً.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Theta = 99 / (99 + 1) = 0.99. Yüksek hedef baskılama için plazma düzeyi Kd yi katlamalıdır.' }
        }
      ),
      makeStep('pharm-mod1-les1-step-10', 'retrieval', 10,
        { tr: 'Geri Çağırma: Gibbs Enerjisi ve Kd', ar: 'استرجاع معرفي: طاقة غيبس وثابت Kd' },
        { tr: 'Kimya dersinde gördüğümüz gibi bağlanma serbest enerjisi Delta G ile Kd ayrışma sabiti arasındaki logaritmik ilişki nasıldı?', ar: 'كما رأينا في مساق الكيمياء، كيف ترتبط طاقة الارتباط الحرة Delta G لوغاريتمياً مع ثابت التفكك Kd؟' },
        false,
        { technicalTerms: [{ term: 'Delta G', arContext: 'طاقة الارتباط الحرة' }] }
      ),
      makeStep('pharm-mod1-les1-step-11', 'connection', 11,
        { tr: 'İleri Bağlantı: Non-Kovalent Kuvvetler ve Afinite (Ders 2)', ar: 'ربط مفاهيمي: القوى غير التساهمية والألفة (الدرس 2)' },
        { tr: 'Kd değerini mikromolardan pikomolara çeken kimyasal bağ kuvvetlerini bir sonraki derste moleküler detaylarıyla inceleyeceğiz.', ar: 'سنستكشف في الدرس القادم قوى الروابط الكيميائية التي تهبط بقيمة Kd من الميكرومولار إلى البيكومولار.' },
        false,
        { technicalTerms: [{ term: 'bağlanma ilgisi', arContext: 'ألفة الارتباط' }] }
      ),
      makeStep('pharm-mod1-les1-step-12', 'mastery_check', 12,
        { tr: 'Ustalık Sınavı: Kütle Etkisi ve Denge', ar: 'اختبار الإتقان: قانون فعل الكتلة والتوازن' },
        { tr: 'Kd ayrışma sabiti 10 nM olan bir reseptörde serbest ilaç derişimi 90 nM ye ulaştığında reseptör doluluk yüzdesi tam olarak kaçtır?', ar: 'في مستقبِل يمتلك Kd = 10 nM، عندما يصل تركيز الدواء الحر إلى 90 nM، كم تبلغ النسبة المئوية لإشغال المستقبِلات بدقة؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph11-9', text: { tr: '%90 doluluk (90 / (90 + 10) = 0.90).', ar: 'إشغال 90% (90 / (90 + 10) = 0.90).' }, isCorrect: true },
              { id: 'opt-ph11-10', text: { tr: '%50 doluluk.', ar: 'إشغال 50% فقط.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Tebrikler! Kütle etkisi ve Kd dengesini ustalıkla çözdünüz. +50 XP.' }
        }
      )
    ]
  },

  // Lesson 2: pharm-mod1-les2
  {
    id: 'pharm-mod1-les2',
    courseId: 'pharmacology',
    moduleId: 'ph-mod-01',
    title: {
      tr: 'Tersinir Non-Kovalent Kuvvetler ve Bağlanma İlgisi',
      ar: 'القوى غير التساهمية العكوسة وألفة الارتباط'
    },
    order: 2,
    access: 'free',
    objective: {
      tr: 'İlaç-reseptör kompleksinin tersinir ayrışma kinetiğini ve non-kovalent bağ enerjisi toplamlarını analiz etmek.',
      ar: 'تحليل حركية التفكك العكوس لمعقد الدواء والمستقبل ومجموع طاقات الروابط غير التساهمية.'
    },
    misconceptions: [
      {
        tr: 'Tersinir bir ilacın reseptörde sonsuza kadar kilitli kalacağı yanılgısı (ayrışma oranı koff ile sürekli dinamik yenilenir).',
        ar: 'الظن الخاطئ بأن الدواء العكوس يبقى مرتبطاً للأبد (يتجدد الارتباط بحركية مستمرة تحكمها koff).'
      }
    ],
    sources: [{ file: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf', page: 18 }],
    citations: [
      {
        id: 'CIT-PH02-01',
        book: "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
        edition: '14th ed.',
        topic: 'Binding Affinity & Thermodynamic Free Energy',
        chapter: 'unverified',
        page: 'unverified',
        status: 'pending-human-review'
      }
    ],
    spacedReviewCards: [
      {
        cardId: 'pharm-mod1-les2-card1',
        courseId: 'pharmacology',
        drugOrConcept: 'Rezidans Süresi (Residence Time)',
        prompt: 'Bir ilacın reseptör üzerinde bağlı kaldığı ortalama rezidans süresi (tau) nasıl hesaplanır?',
        answer: 'tau = 1 / koff (ayrışma hız sabitinin tersi).',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'pharm-mod1-les2-card2',
        courseId: 'pharmacology',
        drugOrConcept: 'Ayrışma Hızı (koff) ve Güvenlik',
        prompt: 'Hızlı ayrışan (hızlı koff) bir ilacın yavaş ayrışana göre klinik avantajı nedir?',
        answer: 'Aşırı dozda veya yan etki durumunda reseptörden hızla ayrılarak toksisite riskini düşürür.',
        box: 1,
        intervalDays: 1
      },
      {
        cardId: 'pharm-mod1-les2-card3',
        courseId: 'pharmacology',
        drugOrConcept: 'Çok Noktalı Bağlanma Çarpımı',
        prompt: 'İki zayıf hidrojen bağı bir araya geldiğinde afinite nasıl artar?',
        answer: 'Enerjiler toplandığından afinite (Kd) çarpımsal olarak kat kat küçülür ve bağlanma fırlar.',
        box: 1,
        intervalDays: 1
      }
    ],
    translations: {
      tr: { title: 'Tersinir Non-Kovalent Kuvvetler ve Bağlanma İlgisi' },
      ar: { title: 'القوى غير التساهمية العكوسة وألفة الارتباط' }
    },
    steps: [
      makeStep('pharm-mod1-les2-step-01', 'hook', 1,
        { tr: 'Neden İlaç Etkisi Sonunda Biter?', ar: 'لماذا ينتهي مفعول الدواء حتماً؟' },
        { tr: 'Bir tansiyon hapı içtiğinizde etkisi 24 saat sonra neden kaybolur? Moleküler düzeyde ilacı reseptörden söken termal fırtına nedir?', ar: 'عند تناول خافض للضغط، لماذا يزول تأثيره بعد 24 ساعة؟ ما العاصفة الحرارية الجزيئية التي تفك الدواء عن (reseptör)؟' },
        false,
        { technicalTerms: [{ term: 'tersinir bağlanma', arContext: 'الارتباط العكوس' }] }
      ),
      makeStep('pharm-mod1-les2-step-02', 'question', 2,
        { tr: 'Tahmin: Sıcaklık ve Ayrışma Hızı', ar: 'توقع: الحرارة وسرعة التفكك' },
        { tr: 'Non-kovalent bağlarla tutunan bir ligandın reseptörden kopma hızı (koff) vücut sıcaklığındaki termal çalkantıyla nasıl değişir?', ar: 'كيف تتأثر سرعة انفصال الدواء (koff) المرتبط بروابط غير تساهمية بالاضطراب الحراري عند درجة حرارة الجسم؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph12-1', text: { tr: 'Termal enerji bağları sürekli titreştirerek ilacı belirli bir yarı ömürle reseptörden koparır.', ar: 'تهز الطاقة الحرارية الروابط باستمرار لتفصل الدواء عن المستقبل وفق عمر نصف محدد.' }, isCorrect: true },
              { id: 'opt-ph12-2', text: { tr: 'Sıcaklık kovalent bağa dönüştürür.', ar: 'تحول الحرارة الرابطة إلى تساهمية دائمة.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Non-kovalent bağlanma dinamiktir; ilaç sürekli bağlanır ve koff hızıyla kopar.' }
        }
      ),
      makeStep('pharm-mod1-les2-step-03', 'intuition', 3,
        { tr: 'Sezgisel Model: Mıknatıs ve Titreşen Masa', ar: 'تشبيه حدسي: المغناطيس والطاولة المهتزة' },
        { tr: 'Titreşen bir masadaki küçük mıknatıslar yapışır, bir süre durur ve sarsıntıyla fırlar. İşte koff bu titreşimin ilacı sökme hızıdır.', ar: 'مغانط صغيرة على طاولة تهتز: تلتصق للحظات ثم تفلتها الهزات. سرعة koff هي معدل إفلات الجزيء نتيجة هذا الاضطراب.' },
        false,
        { technicalTerms: [{ term: 'koff hızı', arContext: 'معدل الانفصال koff' }] }
      ),
      makeStep('pharm-mod1-les2-step-04', 'visual_explanation', 4,
        { tr: 'Rezidans Süresi (Residence Time)', ar: 'زمن المكوث على المستقبل (Residence Time)' },
        { tr: 'Ligand-reseptör kompleksinin ortalama yaşam süresi tau = 1 / koff ile tanımlanır. Uzun rezidans süresi, ilacın kanda azalsa bile etkisini sürdürmesini sağlar.', ar: 'يعرف متوسط عمر معقد الدواء والمستقبل بـ tau = 1 / koff. زمن المكوث الطويل يبقي التأثير حتى بعد انخفاض الدواء بالدم.' },
        false,
        { technicalTerms: [{ term: 'rezidans süresi', arContext: 'زمن المكوث (Residence Time)' }] }
      ),
      makeStep('pharm-mod1-les2-step-05', 'interactive_artifact', 5,
        { tr: 'İnteraktif Simülasyon: Koff ve İlaç Rezidansı', ar: 'محاكاة تفاعلية: سرعة koff ومكوث الدواء' },
        { tr: 'Farklı koff değerlerine sahip iki ilacı karşılaştırın. İlacı yıkadıktan sonra reseptör doluluğunun zamana karşı sönümlenmesini izleyin.', ar: 'قارن بين دوائين بمعدلي koff مختلفين. راقب اضمحلال إشغال المستقبِلات مع الزمن بعد غسل الدواء من الوسط.' },
        false,
        {
          widget: {
            type: 'ReceptorLigandMatcher',
            config: { mode: 'off_rate_kinetics', ligands: ['fast_off_agent', 'slow_off_agent'] }
          }
        }
      ),
      makeStep('pharm-mod1-les2-step-06', 'guided_discovery', 6,
        { tr: 'Rehberli Keşif: Yavaş Koff ve Uzun Etki', ar: 'استكشاف موجه: بطء الانفصال وطول المفعول' },
        { tr: 'Tiotropium bronkodilatör ilacı M3 muskarinik reseptöründen 30 saatten uzun sürede ayrışır (yavaş koff). Bu ilaca hangi klinik üstünlüğü kazandırır?', ar: 'ينفصل دواء Tiotropium الموسع للقصبات عن مستقبلات M3 خلال أكثر من 30 ساعة. ما الميزة السريرية التي يمنحها هذا البطء؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph12-3', text: { tr: 'Plazmadan hızla temizlense bile günde tek doz kullanım konforu sağlar.', ar: 'يوفر راحة الاستخدام بجرعة واحدة يومياً حتى لو زال الدواء سريعاً من البلازما.' }, isCorrect: true },
              { id: 'opt-ph12-4', text: { tr: 'İlacın hiç etki etmemesini sağlar.', ar: 'يجعل الدواء عديم الفعالية.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Yavaş koff hedefte uzun rezidans süresi ve 24 saatlik bronkodilasyon demektir.' }
        }
      ),
      makeStep('pharm-mod1-les2-step-07', 'formal_explanation', 7,
        { tr: 'Bağlanma Kinetiği: Kd = koff / kon', ar: 'حركية الارتباط: معادلة Kd = koff / kon' },
        { tr: 'Ayrışma sabiti iki hız sabitinin oranıdır: Kd = koff / kon. Yüksek afinite genellikle çok yavaş ayrışma hızından (küçük koff) kaynaklanır.', ar: 'ثابت التفكك هو حاصل قسمة معدلي السرعة: Kd = koff / kon. تنبع الألفة العالية غالباً من بطء شديد في معدل الانفصال (koff صغير).' },
        false,
        { technicalTerms: [{ term: 'kon hızı', arContext: 'معدل الارتباط kon' }] }
      ),
      makeStep('pharm-mod1-les2-step-08', 'concept_check', 8,
        { tr: 'Kavram Denetimi: Tersinir ve Geri Dönüşsüz Farkı', ar: 'فحص المفهوم: الفارق بين العكوس وغير العكوس' },
        { tr: 'Non-kovalent bağlarla bağlanan çok güçlü (sub-pikomolar) bir ilaç, kovalent bağ oluşturan bir ilaçla aynı mıdır?', ar: 'هل الدواء فائق القوة المرتبط بروابط غير تساهمية متطابق تماماً مع الدواء المشكل لرابطة تساهمية دائمة؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph12-5', text: { tr: 'Hayır, ne kadar sıkı tutunsa da non-kovalent bağlar eninde sonunda termodinamik olarak ayrışır.', ar: 'لا، فمهما بلغت قوة الروابط غير التساهمية فإنها تنفصل حتماً تحت تأثير الديناميكا الحرارية.' }, isCorrect: true },
              { id: 'opt-ph12-6', text: { tr: 'Evet, hiçbir fark yoktur.', ar: 'نعم، لا يوجد أي فارق على الإطلاق.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Kovalent olmayan bağlar daima tersinirdir; kovalent bağlar ise kural olarak kalıcıdır.' }
        }
      ),
      makeStep('pharm-mod1-les2-step-09', 'application', 9,
        { tr: 'Klinik Seçim: Kısa Etkili vs Uzun Etkili Antihistaminikler', ar: 'مقارنة سريرية: مضادات الهيستامين قصيرة وطويلة المفعول' },
        { tr: 'H1 reseptöründen hızlı ayrışan klorfeniramin günde 4 kez alınırken, yavaş ayrışan setirizin günde tek doz verilir. Bu fark nereden doğar?', ar: 'بينما يؤخذ Chlorpheniramine سريع الانفصال 4 مرات يومياً، يعطى Cetirizine بطيء الانفصال بجرعة واحدة. من أين ينبع هذا الفارق؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph12-7', text: { tr: 'Setirizinin H1 reseptöründeki daha uzun rezidans süresinden (daha yavaş koff).', ar: 'من طول زمن مكوث Cetirizine على مستقبلات H1 (بطء معدل koff).' }, isCorrect: true },
              { id: 'opt-ph12-8', text: { tr: 'Setirizinin kovalent bağ yapmasından.', ar: 'من تشكيل السيتريزين روابط تساهمية.' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Hedef rezidans süresi dozlama sıklığının doğrudan farmakolojik belirleyicisidir.' }
        }
      ),
      makeStep('pharm-mod1-les2-step-10', 'retrieval', 10,
        { tr: 'Geri Çağırma: Easson-Stedman 3 Nokta Kuralı', ar: 'استرجاع معرفي: قاعدة Easson-Stedman الثلاثية' },
        { tr: 'Farmasötik Kimya kursunda öğrendiğimiz gibi enantiyomerlerin reseptöre afinitesini belirleyen 3 noktalı bağlanma kuralı kime aitti?', ar: 'كما تعلمنا في مساق الكيمياء، إلى من تنسب قاعدة الارتباط ثلاثي النقاط التي تحكم ألفة المصاوغات المرآوية نحو (reseptör)؟' },
        false,
        { technicalTerms: [{ term: 'Easson-Stedman modeli', arContext: 'نموذج Easson-Stedman' }] }
      ),
      makeStep('pharm-mod1-les2-step-11', 'connection', 11,
        { tr: 'İleri Bağlantı: Doz-Yanıt Eğrileri ve Etkinlik (Modül 2)', ar: 'ربط مفاهيمي: منحنيات الجرعة والاستجابة (الوحدة 2)' },
        { tr: 'Reseptöre bağlanmak yalnızca ilk adımdır; peki bu bağlanma hücrede nasıl bir biyolojik yanıt üretir? Modül 2 de agonistleri inceleyeceğiz.', ar: 'الارتباط بالمستقبل مجرد خطوة أولى؛ كيف يترجم هذا الارتباط إلى استجابة خلوية؟ في الوحدة 2، سنستكشف المشبهات (agonist).' },
        false,
        { technicalTerms: [{ term: 'agonist', arContext: 'المشبه (Agonist)' }] }
      ),
      makeStep('pharm-mod1-les2-step-12', 'mastery_check', 12,
        { tr: 'Ustalık Sınavı: Kinetik ve Afinite', ar: 'اختبار الإتقان: الحركية والألفة' },
        { tr: 'Bir ilacın reseptörde kalış süresini (rezidans zamanı) maksimize etmek isteyen bir farmakolog hangi parametreyi küçültmelidir?', ar: 'لتعظيم زمن بقاء ومكوث الدواء على المستقبِل، أي معامل حركي يجب على عالم الأدوية تقليله؟' },
        true,
        {
          conceptCheck: {
            options: [
              { id: 'opt-ph12-9', text: { tr: 'Ayrışma hız sabitini (koff).', ar: 'ثابت سرعة الانفصال (koff).' }, isCorrect: true },
              { id: 'opt-ph12-10', text: { tr: 'Bağlanma hız sabitini (kon).', ar: 'ثابت سرعة الارتباط (kon).' }, isCorrect: false }
            ]
          },
          config: { revealedOutcome: 'Modül 1 tamamlandı! 3 review cards eklendi. +50 XP.' }
        }
      )
    ]
  }
];

console.log('Pharmacology Module 1 authored.');
