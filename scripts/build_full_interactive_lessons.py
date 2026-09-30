import os

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TARGET_TS = os.path.join(REPO_ROOT, 'apps', 'web', 'src', 'data', 'interactiveLessons.ts')

content = '''// apps/web/src/data/interactiveLessons.ts
// Comprehensive 22-Lesson Interactive Biophysical & Pharmacological Simulation Labs
// Grounded in Marmara University Faculty of Pharmacy Curricula:
// - Course A: ECZ 335 Farmasötik Kimya-1 (Prof. Dr. Bedia Kaymakçıoğlu)
// - Course B: ECZ 305 Farmakoloji-I (Dr. Meryem Aras)

export interface InteractivePreset {
  id: string;
  label: { tr: string; ar: string; en: string };
  badge: { tr: string; ar: string; en: string };
  description: { tr: string; ar: string; en: string };
  params: Record<string, any>;
  variant?: 'blue' | 'yellow' | 'green' | 'red';
}

export interface InteractiveMission {
  id: string;
  title: { tr: string; ar: string; en: string };
  instruction: { tr: string; ar: string; en: string };
  hint: { tr: string; ar: string; en: string };
  rewardXP: number;
  successMessage: { tr: string; ar: string; en: string };
  validator: (params: Record<string, any>) => boolean;
}

export interface InteractiveLessonMeta {
  lessonId: string;
  course: 'medchem' | 'pharmacology';
  widgetType: string;
  defaultParams: Record<string, any>;
  facultySource: {
    instructor: string;
    courseName: string;
    deck: string;
    slides: string;
  };
  howItWorks: {
    title: { tr: string; ar: string; en: string };
    summary: { tr: string; ar: string; en: string };
    coreFormula?: string;
    takeaways: Array<{ title: { tr: string; ar: string; en: string }; body: { tr: string; ar: string; en: string } }>;
  };
  presets: InteractivePreset[];
  missions: InteractiveMission[];
  evaluateHud: (params: Record<string, any>, locale: 'tr' | 'ar' | 'en') => {
    stateLabel: string;
    stateColor: 'green' | 'amber' | 'blue' | 'rose';
    valueDisplay: string;
    analysis: string;
  };
}

export const INTERACTIVE_LESSONS: Record<string, InteractiveLessonMeta> = {
  // =========================================================================
  // COURSE A: FARMASÖTİK KİMYA (PROF. DR. BEDİA KAYMAKÇIOĞLU)
  // =========================================================================

  // Lesson 1: Ferguson İlkesi & Termodinamik Aktivite
  'mc-mod1-les1': {
    lessonId: 'mc-mod1-les1',
    course: 'medchem',
    widgetType: 'ThermodynamicActivityFergusonSlider',
    defaultParams: { vaporPressureRatio: 0.04, targetSubstance: 'ether' },
    facultySource: {
      instructor: 'Prof. Dr. Bedia Kaymakçıoğlu',
      courseName: 'ECZ 335 Farmasötik Kimya-1 (Marmara Üniversitesi)',
      deck: 'İlaçlarda Yapı Etki İlişkileri-Çözünürlük.pdf',
      slides: 'Slayt 17–25 (Ferguson İlkesi ve Bağıl Doygunluk)',
    },
    howItWorks: {
      title: {
        tr: 'Ferguson İlkesi ve Biyofazda Doygunluk Dengesi Nasıl Çalışır?',
        ar: 'كيف يعمل مبدأ Ferguson وتوازن التشبع في الطور الحيوي؟',
        en: 'How Does the Ferguson Principle & Biophasic Saturation Equilibrium Work?',
      },
      summary: {
        tr: 'Yapısal olarak özgül olmayan bileşikler (genel anestezikler), hedef reseptörlere bağlanmazlar. Etkileri biyofazdaki bağıl doygunluk oranına (termodinamik aktivitesine) dayanır.',
        ar: 'المركبات غير النوعية بنيوياً (مثل المخدرات العامة) لا ترتبط بمستقبلات، بل يعتمد تأثيرها على درجة تشبعها النسبي في الطور الحيوي (النشاط الديناميكي الحراري).',
        en: 'Structurally non-specific compounds (general anesthetics) do not bind receptors. Their biological depression depends on their relative thermodynamic saturation (a).',
      },
      coreFormula: 'a = \\\\frac{P_t}{P_0} = \\\\frac{S_t}{S_0}',
      takeaways: [
        {
          title: { tr: '1. Bağıl Doygunluk Kuralı', ar: '1. قاعدة التشبع النسبي', en: '1. Relative Saturation Rule' },
          body: {
            tr: 'Kimyasal yapıları farklı gazlar, yaklaşık aynı bağıl doygunlukta (a ≈ 0.01 - 0.05) eşit cerrahi anestezi oluşturur.',
            ar: 'الغازات المتباينة كيميائياً تولد عمق تخدير متماثل تماماً عند نفس قيمة التشبع النسبي (a ≈ 0.01 - 0.05).',
            en: 'Chemically distinct volatile agents produce identical surgical anesthesia depth at approximately equal relative saturation (a ≈ 0.01 - 0.05).',
          },
        },
        {
          title: { tr: '2. Özgül ve Özgül Olmayan Sınırı', ar: '2. الحد الفاصل بين الأدوية النوعية وغير النوعية', en: '2. Specific vs Non-Specific Cutoff' },
          body: {
            tr: 'Yapısal olarak özgül ilaçlar a < 0.001 seviyesinde etki gösterir. Ferguson eşiği (a ≈ 0.01) bu iki sınıfı ayırır.',
            ar: 'الأدوية النوعية تعمل عند تراكيز فائقة التخفيف (a < 0.001)، بينما تتطلب الأدوية غير النوعية تشبعاً حيوياً مرتفعاً.',
            en: 'Structurally specific drugs act at extreme dilutions (a < 0.001), whereas non-specific drugs require high thermodynamic saturation.',
          },
        },
      ],
    },
    presets: [
      {
        id: 'ether-anesthesia',
        label: { tr: 'Cerrahi Anestezi (Dietil Eter)', ar: 'تخدير جراحي (Diethyl Ether)', en: 'Surgical Anesthesia (Diethyl Ether)' },
        badge: { tr: 'a = 0.04', ar: 'a = 0.04', en: 'a = 0.04' },
        description: {
          tr: 'Optimum cerrahi narkoz penceresi. Sinir zarı lipidlerinde fiziksel düzensizlik ve hacim genişlemesi.',
          ar: 'نافذة التخدير الجراحي المثالية. اضطراب فيزيائي وتمدد حجمي لدهون الغشاء العصبي.',
          en: 'Optimal surgical anesthetic window with membrane volume expansion.',
        },
        params: { vaporPressureRatio: 0.04, targetSubstance: 'ether' },
        variant: 'green',
      },
      {
        id: 'propranolol-receptor',
        label: { tr: 'Spesifik Reseptör Blokajı (Propranolol)', ar: 'حصار نوعي للمستقبلات (Propranolol)', en: 'Specific Receptor Blockade (Propranolol)' },
        badge: { tr: 'a < 0.0001', ar: 'a < 0.0001', en: 'a < 0.0001' },
        description: {
          tr: 'Stereo-seçici reseptör cebine yüksek afiniteyle kilitlenme. Biyofazda kütlece doymaya gerek yoktur.',
          ar: 'ارتباط فراغي عالي الألفة بجيب المستقبلات. لا يتطلب تشبعاً فيزيائياً كتلوي للغشاء.',
          en: 'High-affinity stereoselective receptor binding without requiring bulk membrane saturation.',
        },
        params: { vaporPressureRatio: 0.00005, targetSubstance: 'propranolol' },
        variant: 'blue',
      },
      {
        id: 'toxic-cutoff',
        label: { tr: 'Faz Kesilmesi / Toksik Sınır', ar: 'انقطاع الطور / الحد السمي', en: 'Phase Cutoff / Toxic Boundary' },
        badge: { tr: 'a > 1.0', ar: 'a > 1.0', en: 'a > 1.0' },
        description: {
          tr: 'Doygunluk eşiği aşıldığında faz ayrılması ve hücre membranında lizis meydana gelir.',
          ar: 'تجاوز حد التشبع يؤدي لانفصال الطور وتحلل الغشاء الخلوي.',
          en: 'Exceeding saturation threshold precipitates phase cutoff and membrane lysis.',
        },
        params: { vaporPressureRatio: 1.05, targetSubstance: 'toxic' },
        variant: 'red',
      },
    ],
    missions: [
      {
        id: 'mission-1-surgical-window',
        title: { tr: 'Görev 1: Cerrahi Narkoz Eşiğini Yakalayın', ar: 'المهمة 1: ضبط عتبة التخدير الجراحي', en: 'Mission 1: Calibrate Surgical Anesthesia Window' },
        instruction: {
          tr: 'Kısmi buhar basıncı sürgüsünü kullanarak termodinamik aktiviteyi (a) 0.01 ile 0.05 arasındaki hedef cerrahi pencereye getirin.',
          ar: 'اضبط الزالق لمحاذاة النشاط الديناميكي الحراري (a) ضمن نافذة التخدير الجراحي (0.01 إلى 0.05).',
          en: 'Adjust slider to bring thermodynamic activity (a) inside the surgical window (0.01 to 0.05).',
        },
        hint: {
          tr: 'Uçucu anestezikler için Pt / P0 oranı %2 ile %5 arasında cerrahi anestezi oluşturur.',
          ar: 'نسبة Pt / P0 بين 2% و5% تحقق عمق التخدير المطلوب.',
          en: 'Vapor pressure ratio Pt / P0 between 0.02 and 0.05 establishes anesthesia.',
        },
        rewardXP: 25,
        successMessage: {
          tr: 'Harika! Hedef cerrahi narkoz aralığı (a ≈ 0.04) doğrulandı. Hücre zarlarında kritik hacim genişlemesi sağlandı.',
          ar: 'ممتاز! تم تأكيد نافذة التخدير الجراحي (a ≈ 0.04) وحدوث التمدد الحجمي للغشاء.',
          en: 'Excellent! Surgical anesthesia window confirmed (a ≈ 0.04). Critical membrane volume expansion achieved.',
        },
        validator: (params) => {
          const val = Number(params?.vaporPressureRatio || 0);
          return val >= 0.01 && val <= 0.05;
        },
      },
      {
        id: 'mission-2-receptor-dilution',
        title: { tr: 'Görev 2: Yapısal Özgüllük Eşiğini İnceleyin', ar: 'المهمة 2: اختبار عتبة النوعية البنيوية', en: 'Mission 2: Verify Structural Specificity Cutoff' },
        instruction: {
          tr: 'Parametreleri mikromolar seviyeye (a < 0.001) çekerek bileşiğin yapısal olarak özgül reseptör bağlanması sergilediğini doğrulayın.',
          ar: 'اخفض المعاملات إلى دون 0.001 لإثبات أن المركب نوعي بنيوياً ويرتبط بمستقبل.',
          en: 'Lower parameters below 0.001 to demonstrate structurally specific receptor binding.',
        },
        hint: {
          tr: 'a < 0.001 eşiği kilit-anahtar reseptör bağlanmasının kesin kanıtıdır.',
          ar: 'عتبة a < 0.001 هي البرهان القاطع على الارتباط النوعي بمستقبل.',
          en: 'Thermodynamic activity a < 0.001 proves high-affinity stereoselective receptor binding.',
        },
        rewardXP: 25,
        successMessage: {
          tr: 'Tebrikler! a < 0.001 eşiği kanıtlandı: Bileşik yapısal olarak özgül etki gösterir.',
          ar: 'تهانينا! تم إثبات عتبة a < 0.001: المركب نوعي بنيوياً.',
          en: 'Confirmed! a < 0.001 proven: The compound acts via structurally specific mechanisms.',
        },
        validator: (params) => {
          const val = Number(params?.vaporPressureRatio || 0);
          return val > 0 && val < 0.001;
        },
      },
    ],
    evaluateHud: (params, locale) => {
      const a = Number(params?.vaporPressureRatio || 0.04);
      if (a < 0.001) {
        return {
          stateLabel: locale === 'tr' ? 'Yapısal Olarak Özgül Faz' : locale === 'ar' ? 'طور نوعي بنيوياً' : 'Structurally Specific',
          stateColor: 'blue',
          valueDisplay: `a = ${a.toFixed(5)}`,
          analysis:
            locale === 'tr'
              ? 'Molekül mikromolar/nanomolar derişimde hedef reseptör cebine stereo-özgül olarak bağlanır. Kütlece membran doygunluğu gerekmez.'
              : locale === 'ar'
              ? 'يرتبط الجزيء بتركيز نانومولي عالي الألفة بجيب المستقبلات. لا يتطلب تشبعاً فيزيائياً للغشاء.'
              : 'Molecule binds high-affinity stereoselective receptor pockets at nanomolar concentrations.',
        };
      }
      if (a >= 0.01 && a <= 0.05) {
        return {
          stateLabel: locale === 'tr' ? 'Cerrahi Narkoz Penceresi (Ferguson)' : locale === 'ar' ? 'نافذة التخدير الجراحي (Ferguson)' : 'Surgical Anesthesia Window',
          stateColor: 'green',
          valueDisplay: `a = ${a.toFixed(2)} (${Math.round(a * 100)}% Doygunluk)`,
          analysis:
            locale === 'tr'
              ? 'Optimum bağıl doygunluk sağlandı. Zardaki kritik hacim genişlemesi sodyum kanallarını mekanik olarak baskılar.'
              : locale === 'ar'
              ? 'تحقق التشبع النسبي الأمثل. التمدد الحجمي للغشاء يعطل قنوات الصوديوم ويوقف السيالات العصبية.'
              : 'Optimal relative saturation achieved. Lateral membrane expansion mechanically compresses neuronal ion channels.',
        };
      }
      if (a > 0.05 && a < 0.5) {
        return {
          stateLabel: locale === 'tr' ? 'Derin Depresyon / İleri Sedasyon' : locale === 'ar' ? 'تثبيط عميق / تخدير متقدم' : 'Deep Depression',
          stateColor: 'amber',
          valueDisplay: `a = ${a.toFixed(2)}`,
          analysis:
            locale === 'tr'
              ? 'Yüksek doygunluk oranı. Solunum merkezi depresyonu riski mevcuttur.'
              : locale === 'ar'
              ? 'نسبة تشبع مرتفعة مع خطر تثبيط مركز التنفس.'
              : 'High saturation ratio with risk of respiratory depression.',
        };
      }
      return {
        stateLabel: locale === 'tr' ? 'Toksik Membran Hasarı' : locale === 'ar' ? 'أذية غشائية سمية' : 'Toxic Membrane Lysis',
        stateColor: 'rose',
        valueDisplay: `a = ${a.toFixed(2)}`,
        analysis:
          locale === 'tr'
            ? 'Aşırı doygunluk. Membranın fizikokimyasal bütünlüğü bozularak hücre lizisi riski doğar.'
            : locale === 'ar'
            ? 'تشبع مفرط جداً يؤدي إلى انحلال بنية الغشاء الدهني وموت الخلية.'
            : 'Extreme saturation causing physical disintegration of bilayer integrity and cytolytic damage.',
      };
    },
  },

  // Lesson 2: İyonizasyon Dengesi & Henderson-Hasselbalch
  'mc-mod1-les2': {
    lessonId: 'mc-mod1-les2',
    course: 'medchem',
    widgetType: 'IonizationEquilibriumSlider',
    defaultParams: { pH: 7.4, pKa: 3.5, compoundType: 'acid' },
    facultySource: {
      instructor: 'Prof. Dr. Bedia Kaymakçıoğlu',
      courseName: 'ECZ 335 Farmasötik Kimya-1 (Marmara Üniversitesi)',
      deck: 'İlaçlarda Yapı Etki İlişkileri-Çözünürlük.pdf',
      slides: 'Slayt 13–19 (İyonizasyon, pH ve Henderson-Hasselbalch)',
    },
    howItWorks: {
      title: {
        tr: 'pH-Partisyon Hipotezi ve İyonizasyon Dengesi Nasıl Çalışır?',
        ar: 'كيف تعمل فرضية التوزع المعتمد على الحموضة وتوازن التأين؟',
        en: 'How Does the pH-Partition Hypothesis & Ionization Equilibrium Work?',
      },
      summary: {
        tr: 'Biyolojik zarlar lipid karakterdedir. İlaç moleküllerinin zarlardan pasif difüzyonla geçebilmesi için iyonlaşmamış (nötr) formda olmaları gerekir. İyonlaşmış formlar sulu fazda çözünürken, lipid zarı aşamazlar.',
        ar: 'الأغشية الحيوية ذات طبيعة دهنية؛ تعبرها الجزيئات غير المتأينة (المتعادلة) بالانتشار السلبي، بينما الجزيئات المتأينة تبقى في الطور المائي.',
        en: 'Biological membranes are hydrophobic lipid bilayers. Passive transcellular permeation requires molecules to exist in their un-ionized (neutral) state.',
      },
      coreFormula: 'pH = pK_a + \\\\log\\\\frac{[A^-]}{[HA]}',
      takeaways: [
        {
          title: { tr: '1. Mide ve Bağırsak Ayrımı', ar: '1. التمييز بين المعدة والأمعاء', en: '1. Gastric vs Intestinal Partitioning' },
          body: {
            tr: 'Mide asidik ortamında (pH ~1.5) zayıf asit ilaçlar (Aspirin, pKa ~3.5) nötr formda bulunur ve mide mukozasından hızla emilir.',
            ar: 'في المعدة الحامضية (pH 1.5) تكون الأحماض الضعيفة غير متأينة وتمتص بسهولة، بينما القواعد تتأين وتمتص بالأمعاء.',
            en: 'In acidic gastric fluid (pH ~1.5), weak acids exist predominantly as neutral HA and partition across mucosa.',
          },
        },
        {
          title: { tr: '2. İyon Tuzağı (Ion Trapping)', ar: '2. ظاهرة احتباس الأيونات (Ion Trapping)', en: '2. Ion Trapping Mechanism' },
          body: {
            tr: 'Membranın iki tarafındaki pH farkı, ilacın bir kompartmanda iyonlaşarak hapsolmasına yol açar.',
            ar: 'اختلاف pH على جانبي الغشاء يؤدي إلى احتباس الدواء في طور محدد. يستفاد منه في قلونة البول لعلاج تسمم الأسبرين.',
            en: 'A pH gradient across membranes causes ionized species to become irreversibly trapped in the aqueous compartment.',
          },
        },
      ],
    },
    presets: [
      {
        id: 'stomach-aspirin',
        label: { tr: 'Mide Ortamı (Aspirin Emilimi)', ar: 'بيئة المعدة (امتصاص الأسبرين)', en: 'Gastric Fluid (Aspirin Absorption)' },
        badge: { tr: 'pH 1.5 • Asit', ar: 'pH 1.5 • حمض', en: 'pH 1.5 • Acid' },
        description: {
          tr: 'pH < pKa olduğu için asit ilaç %99 nötr formdadır ve lipid zardan hızla emilir.',
          ar: 'لأن pH < pKa يكون الدواء الحمضي متعادلاً بنسبة 99% ويمتص بسهولة عبر الغشاء.',
          en: 'Since pH < pKa, the acidic drug is ~99% un-ionized and readily permeates gastric lipid bilayers.',
        },
        params: { pH: 1.5, pKa: 3.5, compoundType: 'acid' },
        variant: 'green',
      },
      {
        id: 'plasma-physiologic',
        label: { tr: 'Fizyolojik Plazma (pH 7.4)', ar: 'البلازما الفسيولوجية (pH 7.4)', en: 'Physiological Plasma (pH 7.4)' },
        badge: { tr: 'pH 7.4', ar: 'pH 7.4', en: 'pH 7.4' },
        description: {
          tr: 'Fizyolojik pH düzeyinde zayıf asit ilaçlar büyük oranda iyonize olmuş (A-) halde kanda taşınır.',
          ar: 'عند pH الدم الفسيولوجي تكون الأحماض الضعيفة متأينة بنسبة عظمى وتذوب بالماء.',
          en: 'At physiological pH, weak acids exist overwhelmingly in deprotonated ionized form (A-).',
        },
        params: { pH: 7.4, pKa: 3.5, compoundType: 'acid' },
        variant: 'blue',
      },
      {
        id: 'urine-alkalinization',
        label: { tr: 'İdrar Alkalinizasyonu (İyon Tuzağı)', ar: 'قلونة البول (احتباس الأيونات)', en: 'Urine Alkalinization (Ion Trapping)' },
        badge: { tr: 'pH 8.0 • Tedavi', ar: 'pH 8.0 • علاج', en: 'pH 8.0 • Therapy' },
        description: {
          tr: 'Sodyum bikarbonat ile idrar pH sı yükseltilerek asidik ilaç tübüllerde iyonize edilir ve geri emilimi durdurulur.',
          ar: 'رفع حموضة البول بيكربونات الصوديوم يمنع إعادة امتصاص الأسبرين بالكلية.',
          en: 'Alkalinizing urine with sodium bicarbonate forces weak acids into charged A- form, preventing reabsorption.',
        },
        params: { pH: 8.0, pKa: 3.5, compoundType: 'acid' },
        variant: 'yellow',
      },
    ],
    missions: [
      {
        id: 'mission-gastric-absorption',
        title: { tr: 'Görev 1: Mide Emilimini Maksimize Edin', ar: 'المهمة 1: تعظيم الامتصاص المعدي للدواء', en: 'Mission 1: Maximize Gastric Absorption' },
        instruction: {
          tr: 'Zayıf bir asit ilaç için pH sürgüsünü pKa nın en az 1.5 birim altına getirerek iyonlaşmamış fraksiyonu %95 in üzerine çıkarın.',
          ar: 'اخفض pH بمقدار 1.5 وحدة على الأقل دون pKa لرفع النسبة غير المتأينة فوق 95%.',
          en: 'Adjust pH at least 1.5 units below pKa to achieve >95% un-ionized fraction for transcellular diffusion.',
        },
        hint: {
          tr: 'Henderson-Hasselbalch kuralı: pH < pKa olduğunda asitler nötr HA formuna geçer.',
          ar: 'معادلة Henderson-Hasselbalch: عندما يكون pH < pKa تسود الصيغة المتعادلة HA.',
          en: 'Henderson-Hasselbalch principle: When pH < pKa, weak acids are predominantly protonated (neutral HA).',
        },
        rewardXP: 25,
        successMessage: {
          tr: 'Harika! İyonlaşmamış form %95 i aştı. Moleküller lipid çift katmanından pasif difüzyonla engelsiz geçebilir.',
          ar: 'ممتاز! تجاوزت النسبة غير المتأينة 95% وأصبح الدواء قادراً على النفوذ السلبي للأغشية.',
          en: 'Great job! Un-ionized fraction exceeds 95%, allowing free passive permeation across lipid bilayers.',
        },
        validator: (params) => {
          const pH = Number(params?.pH || 7.4);
          const pKa = Number(params?.pKa || 3.5);
          return (pKa - pH) >= 1.3;
        },
      },
    ],
    evaluateHud: (params, locale) => {
      const pH = Number(params?.pH || 7.4);
      const pKa = Number(params?.pKa || 3.5);
      const diff = pH - pKa;
      const ratio = Math.pow(10, diff);
      const pctIonized = (ratio / (1 + ratio)) * 100;
      const pctUnionized = 100 - pctIonized;

      if (pctUnionized >= 90) {
        return {
          stateLabel: locale === 'tr' ? 'Yüksek Membran Geçirgenliği' : locale === 'ar' ? 'نفوذية غشائية عالية' : 'High Membrane Permeability',
          stateColor: 'green',
          valueDisplay: `%${Math.round(pctUnionized)} ${locale === 'tr' ? 'Nötr (İyonlaşmamış)' : locale === 'ar' ? 'غير متأين' : 'Un-ionized'}`,
          analysis:
            locale === 'tr'
              ? 'Moleküller çoğunlukla yüksüz formda. Lipid çift katmanından pasif transselüler geçiş maksimum düzeydedir.'
              : locale === 'ar'
              ? 'الجزيئات في الحالة المتعادلة. النفوذ السلبي عبر طبقة الدهون الثنائية في أعلى مستوياته.'
              : 'Molecules exist predominantly in neutral form, maximizing transcellular passive lipid diffusion.',
        };
      }
      if (pctIonized >= 90) {
        return {
          stateLabel: locale === 'tr' ? 'Suda Çözünür / İyon Tuzağı' : locale === 'ar' ? 'ذواب بالماء / احتباس أيوني' : 'Aqueous Trapped / Ionized',
          stateColor: 'blue',
          valueDisplay: `%${Math.round(pctIonized)} ${locale === 'tr' ? 'İyonlaşmış (Yüklü)' : locale === 'ar' ? 'متأين' : 'Ionized'}`,
          analysis:
            locale === 'tr'
              ? 'Moleküller yüklü halde hidrasyon kabuğuna sahiptir. Lipid zarlardan geçemez, sulu kompartmanda hapsolur.'
              : locale === 'ar'
              ? 'الجزيئات المشحونة محاطة بغلاف مائي ولا تستطيع عبور دهون الغشاء، بل تحتبس بالماء.'
              : 'Charged ions carry hydration shells preventing membrane permeation, remaining trapped in aqueous phase.',
        };
      }
      return {
        stateLabel: locale === 'tr' ? 'Dengeli İyonizasyon Bölgesi' : locale === 'ar' ? 'منطقة توازن التأين' : 'Equilibrium Zone',
        stateColor: 'amber',
        valueDisplay: `%${Math.round(pctUnionized)} Nötr / %${Math.round(pctIonized)} İyonize`,
        analysis:
          locale === 'tr'
            ? 'pH değeri pKa ya yakın. Her iki form dengede bulunur.'
            : locale === 'ar'
            ? 'قيمة pH قريبة من pKa. كلا الشكلين متواجدان بتوازن.'
            : 'pH is close to pKa. Both ionized and un-ionized species coexist in dynamic equilibrium.',
      };
    },
  },

  // Lesson 3: Lipit Membran Partisyonu & logD
  'mc-mod2-les1': {
    lessonId: 'mc-mod2-les1',
    course: 'medchem',
    widgetType: 'MembranePartitionSimulator',
    defaultParams: { logP: 2.5, pKa: 4.2, pH: 7.4, compoundType: 'acid' },
    facultySource: {
      instructor: 'Prof. Dr. Bedia Kaymakçıoğlu',
      courseName: 'ECZ 335 Farmasötik Kimya-1 (Marmara Üniversitesi)',
      deck: 'İlaçlarda Yapı Etki İlişkileri-Çözünürlük.pdf',
      slides: 'Slayt 20–32 (Partisyon Katsayısı, logP ve Hansch Sabiti)',
    },
    howItWorks: {
      title: {
        tr: 'Lipit Membran Partisyonu ve logD Dinamiği Nasıl Çalışır?',
        ar: 'كيف تعمل ديناميكية توزع الغشاء الدهني ومعامل logD؟',
        en: 'How Does Lipid Membrane Partitioning & logD Dynamics Work?',
      },
      summary: {
        tr: 'İlaçların lipofilikliği 1-oktanol / su dağılımı (logP) ile ölçülür. Fizyolojik pH da iyonlaşabilen ilaçlar için gerçek partisyon logD ile ifade edilir.',
        ar: 'تقاس ألفة الدواء للدهون بمعامل توزع الأوكتانول/الماء (logP). للأدوية المتأينة عند pH الفسيولوجي يعبر عن التوزع الحقيقي بواسطة logD.',
        en: 'Drug lipophilicity is measured via 1-octanol/water partition (logP). For ionizable drugs at physiological pH, effective partition is defined by logD.',
      },
      coreFormula: '\\\\log D = \\\\log P - \\\\log(1 + 10^{pH - pK_a})',
      takeaways: [
        {
          title: { tr: '1. Hansch Sübstitüent Sabiti (π)', ar: '1. ثابت هانش للمستبدلات (π)', en: '1. Hansch Substituent Constant (π)' },
          body: {
            tr: 'Aromatik halkaya eklenen kloro veya metil grupları lipofilikliği artırırken (π > 0), hidroksil veya amino grupları azaltır (π < 0).',
            ar: 'إضافة مجموعات الكلور أو الميثيل تزيد الألفة للدهون (π > 0)، بينما مجموعات الهيدروكسيل تخفضها (π < 0).',
            en: 'Adding lipophilic substituents (chloro, methyl; π > 0) enhances membrane entry, while hydrophilic groups reduce it.',
          },
        },
        {
          title: { tr: '2. İdeal logP Aralığı (Lipinski)', ar: '2. النطاق المثالي لـ logP (Lipinski)', en: '2. Optimal Lipinski logP Window' },
          body: {
            tr: 'Oral biyoyararlanım için ideal logP 1 ile 3 arasındadır. Aşırı lipofilik bileşikler (logP > 5) lipid zarlarda takılıp çözünmez.',
            ar: 'النطاق المثالي للتوافر الحيوي الفموي هو logP بين 1 و3. المركبات عالية الألفة للدهون (logP > 5) تحتبس في الأغشية.',
            en: 'Optimal oral bioavailability requires logP between 1 and 3. Highly lipophilic compounds (logP > 5) precipitate in lipid bilayers.',
          },
        },
      ],
    },
    presets: [
      {
        id: 'ideal-oral-drug',
        label: { tr: 'İdeal Oral İlaç (logP ≈ 2.5)', ar: 'دواء فموي مثالي (logP ≈ 2.5)', en: 'Optimal Oral Permeability (logP ≈ 2.5)' },
        badge: { tr: 'logD = 1.8 • İdeal', ar: 'logD = 1.8 • مثالي', en: 'logD = 1.8 • Optimal' },
        description: {
          tr: 'Lipit zarı kolaylıkla geçer ve sulu fazda yeterli çözünürlüğe sahiptir (Lipinski Beşler Kuralı uyumlu).',
          ar: 'يعبر الغشاء بسهولة ويتمتع بذوبانية كافية في السائل المائي (متوافق مع قاعدة ليبينسكي).',
          en: 'Easily permeates lipid bilayers with sufficient aqueous solubility.',
        },
        params: { logP: 2.5, pKa: 4.2, pH: 7.4, compoundType: 'acid' },
        variant: 'green',
      },
      {
        id: 'bbb-penetration',
        label: { tr: 'KBB Geçirgenliği (Yüksek Lipofilisite)', ar: 'نفوذ الحاجز الدموي الدماغي', en: 'Blood-Brain Barrier (High Lipophilicity)' },
        badge: { tr: 'logP = 3.5 • KBB+', ar: 'logP = 3.5 • KBB+', en: 'logP = 3.5 • BBB+' },
        description: {
          tr: 'Santral sinir sistemine hedeflenen ilaçlar için yüksek lipid çözünürlüğü ve endotelyal sıkı bağlantıları aşma kabiliyeti.',
          ar: 'ألفة دهنية عالية لنفوذ الحاجز الدموي الدماغي واستهداف الجهاز العصبي المركزي.',
          en: 'High lipophilicity enabling passive diffusion across brain capillary endothelial tight junctions.',
        },
        params: { logP: 3.5, pKa: 6.0, pH: 7.4, compoundType: 'acid' },
        variant: 'blue',
      },
    ],
    missions: [
      {
        id: 'mission-permeability-tuning',
        title: { tr: 'Görev: Membran Akısını %70 in Üzerine Çıkarın', ar: 'المهمة: رفع نفاذية الغشاء فوق 70%', en: 'Mission: Achieve >70% Membrane Flux' },
        instruction: {
          tr: 'Fonksiyonel grup sübstitüsyonlarını ayarlayarak fizyolojik logD değerini 1.5 - 2.5 aralığına getirin.',
          ar: 'عدل المجموعات المستبدلة لضبط معامل logD الفسيولوجي بين 1.5 و2.5.',
          en: 'Tune substituent groups to establish physiological logD between 1.5 and 2.5.',
        },
        hint: {
          tr: 'Lipofilik kloro veya aromatik halka eklemek logP yi yükseltir.',
          ar: 'إضافة الكلور تزيد logP.',
          en: 'Adding chloro substituents increases logP.',
        },
        rewardXP: 25,
        successMessage: {
          tr: 'Başarılı! Hedef logD sağlandı ve membran akısı %70 i aştı.',
          ar: 'ناجح! تحقق logD المطلوب وتجاوز نفوذ الغشاء 70%.',
          en: 'Success! Target logD achieved and membrane flux exceeds 70%.',
        },
        validator: (params) => {
          const lp = Number(params?.logP || 2.5);
          return lp >= 1.5 && lp <= 3.5;
        },
      },
    ],
    evaluateHud: (params, locale) => {
      const lp = Number(params?.logP || 2.5);
      return {
        stateLabel: lp >= 1 && lp <= 3 ? (locale === 'tr' ? 'Optimum Membran Geçişi' : locale === 'ar' ? 'نفوذ غشائي أمثل' : 'Optimal Flux') : (locale === 'tr' ? 'Sınır Dışı Partisyon' : locale === 'ar' ? 'خارج النطاق' : 'Sub-optimal'),
        stateColor: lp >= 1 && lp <= 3 ? 'green' : 'amber',
        valueDisplay: `logP = ${lp.toFixed(2)}`,
        analysis:
          locale === 'tr'
            ? 'Bileşik lipid çift katmanı ile sulu faz arasında ideal dinamik dengededir.'
            : locale === 'ar'
            ? 'المركب في توازن حركي مثالي بين طور الدهون والطور المائي.'
            : 'Compound exhibits optimal partitioning between lipid core and aqueous compartments.',
      };
    },
  },

  // Lesson 4: Biyoizosterizm ve Halka Eşdeğerleri
  'mc-mod2-les2': {
    lessonId: 'mc-mod2-les2',
    course: 'medchem',
    widgetType: 'SarExplorer',
    defaultParams: { scaffold: 'phenyl', substituent: 'tetrazole' },
    facultySource: {
      instructor: 'Prof. Dr. Bedia Kaymakçıoğlu',
      courseName: 'ECZ 335 Farmasötik Kimya-1 (Marmara Üniversitesi)',
      deck: 'Biyoizosterizm.pdf',
      slides: 'Slayt 1–28 (Klasik ve Klasik Olmayan Biyoizosterler, Halka Eşdeğerleri)',
    },
    howItWorks: {
      title: {
        tr: 'Biyoizosterizm ve Yapısal Eşdeğerlik Nasıl Çalışır?',
        ar: 'كيف يعمل التماثل الحيوي والتكافؤ البنيوي (Bioisosterism)؟',
        en: 'How Does Bioisosterism & Structural Equivalence Work?',
      },
      summary: {
        tr: 'Biyoizosterler, benzer fiziksel veya kimyasal özelliklere sahip olup benzer biyolojik yanıt oluşturan atom veya atom gruplarıdır. Klasik biyoizosterler Grimm Hidrit Kayması Kuralına dayanırken, klasik olmayanlar (Karboksilik asit / Tetrazol) sterik ve elektronik benzerlik gösterir.',
        ar: 'المتماثلات الحيوية (Bioisosteres) هي ذرات أو مجموعات تمتلك خواص فيزيائية وكيميائية متقاربة وتنتج استجابة حيوية متماثلة (مثل استبدال الكربوكسيل بالتترازول).',
        en: 'Bioisosteres are chemical groups with similar electronic or steric properties that produce equivalent biological activity (e.g. carboxylic acid vs tetrazole).',
      },
      coreFormula: '-\\text{COOH} \\\\iff -\\text{Tetrazole} \\\\quad (\\text{Klasik Olmayan Biyoizoster})',
      takeaways: [
        {
          title: { tr: '1. Karboksilik Asit - Tetrazol Eşdeğerliği', ar: '1. تكافؤ حمض الكربوكسيل والتترازول', en: '1. Carboxylic Acid - Tetrazole Equivalence' },
          body: {
            tr: 'Tetrazol halkası karboksilik asit ile aynı pKa (~4.5) ve negatif yük dağılımına sahiptir, ancak 10 kat daha lipofiliktir ve metabolik glukuronidasyona dirençlidir.',
            ar: 'حلقة التترازول تمتلك نفس حموضة الكربوكسيل وتوزع الشحنة السالبة، لكنها أكثر ألفة للدهون ومقاومة للأيض.',
            en: 'Tetrazole matches carboxylic acid pKa (~4.5) and charge, but confers 10x greater lipophilicity and metabolic stability.',
          },
        },
        {
          title: { tr: '2. Halka Eşdeğerliği (Benzen - Tiyofen)', ar: '2. تكافؤ الحلقات (البنزين والثيوفين)', en: '2. Ring Equivalence (Benzene - Thiophene)' },
          body: {
            tr: 'Benzen halkasındaki -CH=CH- grubu, kükürt atomu (-S-) ile yer değiştirdiğinde (tiyofen) aromatik pi-elektron karakteri ve sterik hacim korunur.',
            ar: 'استبدال -CH=CH- في البنزين بذرة كبريت -S- يعطي حلقة ثيوفين متكافئة إلكترونياً وحجمياً.',
            en: 'Replacing -CH=CH- in benzene with sulfur (-S-) yields thiophene, preserving aromatic pi-cloud and steric profile.',
          },
        },
      ],
    },
    presets: [
      {
        id: 'losartan-tetrazole',
        label: { tr: 'Losartan Modeli (Karboksilik Asit → Tetrazol)', ar: 'نموذج لوسارتان (كربوكسيل إلى تترازول)', en: 'Losartan Model (Carboxylic Acid → Tetrazole)' },
        badge: { tr: 'Biyoyararlanım: +300%', ar: 'التوافر الحيوي: +300%', en: 'Bioavailability: +300%' },
        description: {
          tr: 'Losartan tasarımında karboksilik asit yerine tetrazol kullanılarak lipofilisite ve oral emilim 3 kat artırılmıştır.',
          ar: 'استبدال الكربوكسيل بالتترازول في لوسارتان ضاعف الامتصاص الفموي والألفة للدهون 3 أضعاف.',
          en: 'Replacing carboxylic acid with tetrazole in losartan tripled oral bioavailability and lipophilicity.',
        },
        params: { scaffold: 'losartan', substituent: 'tetrazole' },
        variant: 'green',
      },
    ],
    missions: [
      {
        id: 'mission-bioisostere-swap',
        title: { tr: 'Görev: Metabolik Stabilitesi Yüksek Biyoizosteri Seçin', ar: 'المهمة: اختيار متماثل حيوي عالي الاستقرار الأيضي', en: 'Mission: Select Metabolically Stable Bioisostere' },
        instruction: {
          tr: 'SAR panelinde karboksilik asit yerine tetrazol izosterini seçerek reseptör afinitesini ve lipofilisiteyi doğrulayın.',
          ar: 'اختر مستبدل التترازول لمطابقة مستقبلات الأنجيوتنسين وملاحظة ثبات المركب.',
          en: 'Select the tetrazole isostere to confirm high receptor affinity and resistance to metabolic conjugation.',
        },
        hint: {
          tr: 'Tetrazol halkası 4 azot atomu içerir ve planar aromatik yapıdadır.',
          ar: 'حلقة التترازول تضم 4 ذرات نيتروجين ولها حموضة مشابهة للكربوكسيل.',
          en: 'Tetrazole contains 4 nitrogen atoms and mimics the carboxylate anion.',
        },
        rewardXP: 25,
        successMessage: {
          tr: 'Kusursuz! Tetrazol biyoizosteri doğrulandı. Karboksilik asit eşdeğeri olarak reseptör bağlanması korundu.',
          ar: 'رائع! تم التحقق من متماثل التترازول الحيوي مع الحفاظ على الارتباط بالمستقبل.',
          en: 'Superb! Tetrazole bioisostere verified, maintaining target receptor affinity with enhanced stability.',
        },
        validator: (params) => params?.substituent === 'tetrazole' || params?.scaffold === 'losartan',
      },
    ],
    evaluateHud: (_params, locale) => ({
      stateLabel: locale === 'tr' ? 'Biyoizosterik Eşdeğerlik Doğrulandı' : locale === 'ar' ? 'تم تأكيد التكافؤ الحيوي' : 'Bioisosteric Match',
      stateColor: 'green',
      valueDisplay: 'Tetrazol ⇌ Karboksilat',
      analysis:
        locale === 'tr'
          ? 'Sterik hacim ve elektron yoğunluğu biyolojik hedef cebiyle kusursuz uyum sağlar.'
          : locale === 'ar'
          ? 'الحجم الفراغي والكثافة الإلكترونية يتطابقان بدقة مع جيب المستقبل المستهدف.'
          : 'Steric bulk and electrostatic potential map precisely to the target macromolecular pocket.',
    }),
  },

  // Lesson 5: Fonksiyonel Grupların Elektronik ve Sterik Etkileri
  'mc-mod3-les1': {
    lessonId: 'mc-mod3-les1',
    course: 'medchem',
    widgetType: 'SarExplorer',
    defaultParams: { substituent: 'nitro', position: 'para' },
    facultySource: {
      instructor: 'Prof. Dr. Bedia Kaymakçıoğlu',
      courseName: 'ECZ 335 Farmasötik Kimya-1 (Marmara Üniversitesi)',
      deck: 'Fonksiyonel gruplar.pdf',
      slides: 'Slayt 1–35 (Elektron Çeken/Veren Gruplar, Hammett σ Sabiti, Sterik Engel)',
    },
    howItWorks: {
      title: {
        tr: 'Fonksiyonel Grupların Elektronik ve Sterik Etkileri Nasıl Çalışır?',
        ar: 'كيف تعمل التأثيرات الإلكترونية والفراغية للمجموعات الوظيفية؟',
        en: 'How Do Electronic & Steric Effects of Functional Groups Work?',
      },
      summary: {
        tr: 'Fonksiyonel gruplar ilacın reaktivitesini ve reseptör bağlanmasını elektronik (indüktif ve rezonans) ve sterik etkilerle belirler. Hammett sabiti (σ), bir grubun elektron çekme (σ > 0) veya verme (σ < 0) gücünü nicelleştirir.',
        ar: 'تحدد المجموعات الوظيفية تفاعلية الدواء وارتباطه بالمستقبلات عبر تأثيرات إلكترونية وحجمية. ثابت هاميت (σ) يقيس قوة سحب أو منح الإلكترونات.',
        en: 'Functional groups dictate drug reactivity and receptor fit through induction, resonance, and steric bulk quantified by Hammett σ constants.',
      },
      coreFormula: '\\\\log \\\\frac{K}{K_0} = \\\\rho \\\\sigma \\\\quad (\\text{Hammett Denklemi})',
      takeaways: [
        {
          title: { tr: '1. Elektron Çeken Gruplar (-NO2, -CF3)', ar: '1. المجموعات الساحبة للإلكترونات', en: '1. Electron-Withdrawing Groups' },
          body: {
            tr: 'Nitro ve triflorometil grupları aromatik halkadan elektron çekerek komşu asidik grupların iyonlaşmasını kolaylaştırır (pKa yı düşürür).',
            ar: 'المجموعات الساحبة تسحب الكثافة الإلكترونية وتزيد من حموضة المركب (تخفض pKa).',
            en: 'Strong electron-withdrawing groups pull electron density, enhancing adjacent acidity and lowering pKa.',
          },
        },
        {
          title: { tr: '2. Orto Sterik Engeli (Taft Sabiti Es)', ar: '2. الإعاقة الفراغية (ثابت تافت Es)', en: '2. Ortho Steric Hindrance' },
          body: {
            tr: 'Orto konumundaki hacimli gruplar metabolik ester veya amid hidrolizini sterik olarak bloke ederek etki süresini uzatır.',
            ar: 'المجموعات الحجمية في الموقع أورثو تعيق الإنزيمات فراغياً وتطيل عمر الدواء.',
            en: 'Bulky ortho substituents sterically shield vulnerable esters and amides from rapid enzymatic hydrolysis.',
          },
        },
      ],
    },
    presets: [
      {
        id: 'electron-withdrawing',
        label: { tr: 'Elektron Çeken Modülasyon (-NO2, para)', ar: 'مجموعة ساحبة للإلكترونات (-NO2)', en: 'Electron-Withdrawing (-NO2, para)' },
        badge: { tr: 'σ = +0.78', ar: 'σ = +0.78', en: 'σ = +0.78' },
        description: {
          tr: 'Aromatik halkanın elektron yoğunluğunu düşürerek asidik hidrojenin salınmasını kuvvetlendirir.',
          ar: 'سحب قوي للكثافة الإلكترونية من الحلقة الأروماتية.',
          en: 'Strong resonance and inductive electron withdrawal.',
        },
        params: { substituent: 'nitro', position: 'para' },
        variant: 'red',
      },
    ],
    missions: [
      {
        id: 'mission-electronic-tuning',
        title: { tr: 'Görev: Elektron Çeken Sübstitüenti Belirleyin', ar: 'المهمة: تفعيل مجموعة ساحبة للإلكترونات', en: 'Mission: Activate Electron-Withdrawing Group' },
        instruction: {
          tr: 'SAR panelinde pozitif Hammett değerine (σ > 0.5) sahip nitro veya siyano grubunu seçin.',
          ar: 'اختر مجموعة ذات ثابت هاميت موجب (مثل النيترو) لدراسة سحب الإلكترونات.',
          en: 'Select a substituent with positive Hammett value (σ > 0.5) such as nitro.',
        },
        hint: { tr: 'Nitro (-NO2) ve siyano (-CN) en güçlü elektron çeken gruplardır.', ar: 'النيترو والسيانو أقوى المجموعات الساحبة.', en: 'Nitro and cyano exert the highest positive sigma values.' },
        rewardXP: 25,
        successMessage: { tr: 'Doğrulandı! σ = +0.78 ile güçlü elektron çekici etki gözlemlendi.', ar: 'تم التحقق! أظهرت مجموعة النيترو سحباً إلكترونياً قوياً.', en: 'Verified! Strong electron withdrawal demonstrated with σ = +0.78.' },
        validator: (params) => params?.substituent === 'nitro',
      },
    ],
    evaluateHud: (_params, locale) => ({
      stateLabel: locale === 'tr' ? 'Elektronik Alan Etkisi Aktif' : locale === 'ar' ? 'تأثير إلكتروني نشط' : 'Electronic Field Active',
      stateColor: 'blue',
      valueDisplay: 'Hammett σ > 0',
      analysis:
        locale === 'tr'
          ? 'Aromatik halka rezonansla polarize edildi. Karboksil veya fenol asitliği belirgin şekilde artar.'
          : locale === 'ar'
          ? 'تم استقطاب الحلقة الأروماتية بالرنين وزادت حموضة المركب.'
          : 'Aromatic pi-system polarized by resonance, significantly altering receptor hydrogen bond propensity.',
    }),
  },

  // Lesson 6: İlaç-Reseptör Kimyasal Bağları
  'mc-mod3-les2': {
    lessonId: 'mc-mod3-les2',
    course: 'medchem',
    widgetType: 'ReceptorLigandMatcher',
    defaultParams: { bondType: 'ionic', targetSite: 'aspartate' },
    facultySource: {
      instructor: 'Prof. Dr. Bedia Kaymakçıoğlu',
      courseName: 'ECZ 335 Farmasötik Kimya-1 (Marmara Üniversitesi)',
      deck: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
      slides: 'Slayt 1–32 (Kovalent, İyonik, Hidrojen Bağları, Hidrofobik Etkileşimler)',
    },
    howItWorks: {
      title: {
        tr: 'İlaç-Reseptör Kimyasal Bağları Nasıl Çalışır?',
        ar: 'كيف تعمل الروابط الكيميائية بين الدواء والمستقبل؟',
        en: 'How Do Drug-Receptor Chemical Bonds Work?',
      },
      summary: {
        tr: 'İlaç molekülleri hedef proteinlere kovalent (tersinmez, 40-100 kcal/mol) veya kovalent olmayan (iyonik, hidrojen, van der Waals; tersinir, 1-10 kcal/mol) bağlarla kenetlenir.',
        ar: 'ترتبط جزيئات الدواء بالبروتينات بروابط تساهمية غير عكوسة (قوية 40-100 kcal/mol) أو غير تساهمية عكوسة (أيونية، هيدروجينية 1-10 kcal/mol).',
        en: 'Drugs bind biological targets via irreversible covalent bonds (40-100 kcal/mol) or reversible non-covalent forces (ionic, H-bonds, van der Waals).',
      },
      coreFormula: '\\\\Delta G = \\\\Delta H - T\\\\Delta S = -RT \\\\ln K_d',
      takeaways: [
        {
          title: { tr: '1. İyonik Tuz Köprüsü (Tersinir Çapa)', ar: '1. الجسر الأيوني الملحي', en: '1. Ionic Salt Bridge Anchor' },
          body: {
            tr: 'Protonlanmış bazik amin ile reseptördeki anyonik Aspartat/Glutamat arasındaki elektrostatik çekim (5-10 kcal/mol) ilk yönlendirici kuvvettir.',
            ar: 'التجاذب الكهروستاتيكي بين الأمين الموجب وحمض الأسبارتات السالب يمثل قوة الجذب الأولى للدواء.',
            en: 'Electrostatic attraction between protonated amines and anionic Asp/Glu residues serves as the primary long-range targeting anchor.',
          },
        },
        {
          title: { tr: '2. Kovalent Bağlanma (Aspirin & Omeprazol)', ar: '2. الارتباط التساهمي غير العكوس', en: '2. Irreversible Covalent Inactivation' },
          body: {
            tr: 'Aspirin COX-1 enziminin Serin-529 kalıntısını asetilleyerek trombosit ömrü boyunca tersinmez inhibisyon yapar.',
            ar: 'يقوم الأسبرين بأستلة السيرين-529 في إنزيم COX-1 برابطة تساهمية غير عكوسة طوال عمر الصفيحة.',
            en: 'Aspirin irreversibly acetylates Ser-529 in COX-1, permanently disabling thromboxane synthesis for platelet lifespan.',
          },
        },
      ],
    },
    presets: [
      {
        id: 'ionic-anchor',
        label: { tr: 'İyonik Tuz Köprüsü (Aspartat-113 • Amin)', ar: 'جسر أيوني (أسبارتات • أمين)', en: 'Ionic Salt Bridge (Asp-113 • Amine)' },
        badge: { tr: 'ΔG = -7 kcal/mol', ar: 'ΔG = -7 kcal/mol', en: 'ΔG = -7 kcal/mol' },
        description: {
          tr: 'Beta-adrenerjik reseptörlerde katekolamin amini ile Asp-113 karboksilatı arasındaki kritik kovalent olmayan çapa.',
          ar: 'ارتباط أيوني رئيسي بين أمين الكاتيكولامين وكربوكسيل الأسبارتات في مستقبلات بيتا.',
          en: 'Critical non-covalent electrostatic anchor in beta-receptors.',
        },
        params: { bondType: 'ionic', targetSite: 'aspartate' },
        variant: 'blue',
      },
      {
        id: 'covalent-aspirin',
        label: { tr: 'Kovalent Asetilleme (Aspirin • Serin-529)', ar: 'أستلة تساهمية (أسبرين • سيرين)', en: 'Covalent Acetylation (Aspirin • Ser-529)' },
        badge: { tr: 'Tersinmez • Kovalent', ar: 'غير عكوس • تساهمي', en: 'Irreversible • Covalent' },
        description: {
          tr: 'COX enzimi aktif cebinde Serin hidroksil grubunun kalıcı asetilasyonu.',
          ar: 'أستلة دائمة لمجموعة الهيدروكسيل في السيرين بإنزيم COX.',
          en: 'Permanent covalent ester bond to catalytic Ser-529.',
        },
        params: { bondType: 'covalent', targetSite: 'serine' },
        variant: 'red',
      },
    ],
    missions: [
      {
        id: 'mission-form-salt-bridge',
        title: { tr: 'Görev: İyonik Tuz Köprüsünü Kurun', ar: 'المهمة: تشكيل جسر أيوني مع حمض الأسبارتات', en: 'Mission: Form Ionic Salt Bridge with Aspartate' },
        instruction: {
          tr: 'Reseptör eşleştirme panelinde iyonik etkileşim türünü ve anyonik aspartat kalıntısını seçin.',
          ar: 'اختر التفاعل الأيوني مع ثمالة الأسبارتات لتثبيت الدواء في جيب المستقبل.',
          en: 'Select ionic bonding and aspartate target residue to simulate catecholamine anchoring.',
        },
        hint: { tr: 'İyonik bağlar zıt yükler arasındaki elektrostatik çekime dayanır.', ar: 'الروابط الأيونية تعتمد على تجاذب الشحنات المتعاكسة.', en: 'Ionic interactions occur between opposite formal charges.' },
        rewardXP: 25,
        successMessage: { tr: 'Mükemmel! İyonik tuz köprüsü kuruldu (ΔG ≈ -8 kcal/mol). Ligand reseptöre kilitlendi.', ar: 'ممتاز! تم بناء الجسر الأيوني وتثبيت المركب في جيب المستقبل.', en: 'Excellent! Ionic salt bridge formed (ΔG ≈ -8 kcal/mol), anchoring ligand.' },
        validator: (params) => params?.bondType === 'ionic' || params?.targetSite === 'aspartate',
      },
    ],
    evaluateHud: (_params, locale) => ({
      stateLabel: locale === 'tr' ? 'Yüksek Afiniteli Bağlanma' : locale === 'ar' ? 'ارتباط عالي الألفة' : 'High-Affinity Complex',
      stateColor: 'green',
      valueDisplay: 'Kd < 10 nM',
      analysis:
        locale === 'tr'
          ? 'İyonik ve hidrojen bağlarının toplam enerjisi entalpi kazancı sağlayarak stabil ilaç-reseptör kompleksi oluşturur.'
          : locale === 'ar'
          ? 'المحصلة الإجمالية للروابط تؤمن طاقة ارتباط قوية وتثبت معقد الدواء والمستقبل.'
          : 'Sum of ionic and H-bonding energies produces favourable enthalpy for sub-nanomolar dissociation constant.',
    }),
  },

  // Lesson 7: Optik İzomeri & Kiral İlaçlar
  'mc-mod4-les1': {
    lessonId: 'mc-mod4-les1',
    course: 'medchem',
    widgetType: 'StructureIdentifier',
    defaultParams: { stereocenter: 'R', eudismicRatio: 120 },
    facultySource: {
      instructor: 'Prof. Dr. Bedia Kaymakçıoğlu',
      courseName: 'ECZ 335 Farmasötik Kimya-1 (Marmara Üniversitesi)',
      deck: 'İlaçlarda  İzomeri.pdf',
      slides: 'Slayt 1–25 (Kiralite, Enantiyomerler, Ötomer/Distomer, Pfeiffer Kuralı)',
    },
    howItWorks: {
      title: {
        tr: 'Optik İzomeri ve Pfeiffer Kuralı Nasıl Çalışır?',
        ar: 'كيف يعمل التماكب البصري وقاعدة بفيفر (Pfeiffer\'s Rule)؟',
        en: 'How Does Optical Isomerism & Pfeiffer\'s Rule Work?',
      },
      summary: {
        tr: 'Reseptörler kiral proteinlerdir. Kiral bir merkeze sahip ilaçların enantiyomerlerinden farmakolojik olarak daha aktif olanına ötomer (eutomer), daha az aktif veya toksik olanına distomer denir.',
        ar: 'المستقبلات جزيئات كيرالية؛ يسمى المصاوغ الضوئي الفعال ötomer بينما يسمى المصاوغ الخامل أو السام distomer.',
        en: 'Receptors are chiral macromolecular pockets. The pharmacologically active enantiomer is the eutomer, while the less active or toxic counterpart is the distomer.',
      },
      coreFormula: '\\\\text{Ödismik Oran (Eudismic Ratio)} = \\\\frac{\\\\text{Afinite}_{\\\\text{ötomer}}}{\\\\text{Afinite}_{\\\\text{distomer}}}',
      takeaways: [
        {
          title: { tr: '1. Ogston Üç Noktadan Bağlanma Modeli', ar: '1. نموذج أوغستون للارتباط بثلاث نقاط', en: '1. Ogston 3-Point Interaction Model' },
          body: {
            tr: 'Enantiyoseçicilik için ötomerin 3 farklı fonksiyonel grubunun reseptördeki 3 tamamlayıcı bölgeye aynı anda kilitlenmesi gerekir.',
            ar: 'يتطلب التمييز الفراغي أن تتطابق 3 مجموعات مختلفة من المصاوغ مع 3 مواقع مكملة في المستقبل.',
            en: 'Enantioselectivity requires simultaneous alignment of three pharmacophoric groups with complementary receptor subsites.',
          },
        },
        {
          title: { tr: '2. Pfeiffer Kuralı', ar: '2. قاعدة بفيفر (Pfeiffer\'s Rule)', en: '2. Pfeiffer\'s Rule' },
          body: {
            tr: 'Bir ilacın reseptöre afinitesi ne kadar yüksekse (daha düşük dozda etkiliyse), ödismik oranı (enantiyomerler arası afinite farkı) o kadar büyüktür.',
            ar: 'كلما زادت ألفة الدواء للمستقبل، كان الفرق في الفعالية بين المصاوغين (النسبة الإيوديزمية) أكبر.',
            en: 'Higher receptor affinity correlates directly with higher eudismic ratios between enantiomeric pairs.',
          },
        },
      ],
    },
    presets: [
      {
        id: 'propranolol-enantiomer',
        label: { tr: '(S)-Propranolol (Ötomer, 100x Aktif)', ar: '(S)-Propranolol (المصاوغ الفعال)', en: '(S)-Propranolol (Eutomer, 100x Active)' },
        badge: { tr: 'Ödismik Oran = 100', ar: 'النسبة الإيوديزمية = 100', en: 'Eudismic Ratio = 100' },
        description: {
          tr: '(S)-propranolol beta-bloker etkiden sorumludur; (R)-enantiyomeri 100 kat daha zayıftır.',
          ar: 'المصاوغ (S) هو المسؤول عن حصر مستقبلات بيتا، بينما المصاوغ (R) أضعف بـ 100 مرة.',
          en: '(S)-propranolol possesses 100-fold higher beta-blocking potency than its (R)-distomer.',
        },
        params: { stereocenter: 'S', eudismicRatio: 100 },
        variant: 'green',
      },
    ],
    missions: [
      {
        id: 'mission-distinguish-eutomer',
        title: { tr: 'Görev: Yüksek Afiniteli Ötomeri Doğrulayın', ar: 'المهمة: تأكيد المصاوغ الفعال عالي الألفة', en: 'Mission: Verify High-Affinity Eutomer' },
        instruction: {
          tr: 'Stereokimya modülünde kiral merkezi ayarlayarak ödismik oranın >50 olduğunu doğrulayın.',
          ar: 'اختر التكوين الفراغي للمصاوغ الفعال وتأكد أن النسبة الإيوديزمية تتجاوز 50.',
          en: 'Inspect stereochemical configuration to demonstrate eudismic ratio > 50.',
        },
        hint: { tr: 'Ötomer hedef reseptöre kusursuz stereo-özgül geometride kenetlenir.', ar: 'المصاوغ الفعال يطابق المستقبل بنموذج النقاط الثلاث.', en: 'The eutomer satisfies the 3-point binding pharmacophore.' },
        rewardXP: 25,
        successMessage: { tr: 'Harika! Ötomer stereo-merkezi doğrulandı. 3 noktadan reseptör kilitlemesi sağlandı.', ar: 'ممتاز! تم تأكيد المصاوغ الفعال وتحقيق الارتباط بثلاث نقاط.', en: 'Superb! Eutomer stereocenter verified with 3-point interaction alignment.' },
        validator: (params) => Number(params?.eudismicRatio || 0) >= 50 || params?.stereocenter === 'S',
      },
    ],
    evaluateHud: (_params, locale) => ({
      stateLabel: locale === 'tr' ? 'Enantiyoseçici Reseptör Kompleksi' : locale === 'ar' ? 'معقد انتقائي فراغياً' : 'Enantioselective Fit',
      stateColor: 'green',
      valueDisplay: 'Ödismik Oran > 100',
      analysis:
        locale === 'tr'
          ? 'Kiral merkezin 3 boyutlu dizilimi reseptör cebindeki hidrojen bağı ve hidrofobik ceplerle tam örtüşür.'
          : locale === 'ar'
          ? 'الترتيب الفراغي ثلاثي الأبعاد للمصاوغ يتطابق تماماً مع الجيب البروتيني.'
          : 'Three-dimensional configuration satisfies the Ogston 3-point pharmacophore requirement.',
    }),
  },

  // Lesson 8: Geometrik ve Konformasyonel İzomeri
  'mc-mod4-les2': {
    lessonId: 'mc-mod4-les2',
    course: 'medchem',
    widgetType: 'StructureIdentifier',
    defaultParams: { isomerType: 'trans', interatomicDistance: 4.8 },
    facultySource: {
      instructor: 'Prof. Dr. Bedia Kaymakçıoğlu',
      courseName: 'ECZ 335 Farmasötik Kimya-1 (Marmara Üniversitesi)',
      deck: 'İlaçlarda  İzomeri.pdf',
      slides: 'Slayt 26–42 (Cis/Trans İzomeri, Diastereomerler, Sert Konformasyonlar)',
    },
    howItWorks: {
      title: {
        tr: 'Geometrik ve Konformasyonel İzomeri Nasıl Çalışır?',
        ar: 'كيف يعمل التماكب الهندسي والشكلي (Geometrical & Conformational Isomerism)؟',
        en: 'How Does Geometric & Conformational Isomerism Work?',
      },
      summary: {
        tr: 'Çift bağlar veya halkalı yapılar serbest dönmeyi engelleyerek cis (Z) ve trans (E) geometrik izomerleri oluşturur. Farmakoforik gruplar arasındaki mesafe bu izomerlerde tamamen farklıdır.',
        ar: 'تمنع الروابط الثنائية أو الحلقات الدوران الحر للجزيء، مما ينشئ مصاوغات هندسية (Cis/Trans) تختلف في المسافات بين المجموعات الفعالة.',
        en: 'Double bonds or ring systems restrict rotation, producing cis/trans geometric isomers with radically different interatomic distances.',
      },
      coreFormula: '\\\\text{Dietilstilbestrol (DES): } \\\\text{trans-DES (Aktif, 14.5 \\\\AA)} \\\\gg \\\\text{cis-DES (İnaktif)}',
      takeaways: [
        {
          title: { tr: '1. Dietilstilbestrol (trans-DES Üstünlüğü)', ar: '1. ثنائي إيثيل ستيلبوستيرول (أفضلية trans)', en: '1. Diethylstilbestrol (trans-DES Potency)' },
          body: {
            tr: 'trans-DES molekülündeki iki fenolik hidroksil grubu arasındaki mesafe (14.5 Å) doğal östradiol ile birebir örtüşür; cis-izomeri ise uyuşmaz ve inaktiftir.',
            ar: 'المسافة بين مجموعتي الهيدروكسيل في trans-DES (14.5 أنغستروم) تطابق هرمون الإستراديول الطبيعي، بينما مصاوغ cis غير فعال.',
            en: 'trans-DES places two phenolic hydroxyls at 14.5 Å, matching natural estradiol, whereas cis-DES is biologically inactive.',
          },
        },
        {
          title: { tr: '2. Rijit Konformasyon Kısıtlaması', ar: '2. تقييد التشكيل الفراغي الصلب', en: '2. Conformational Rigidification' },
          body: {
            tr: 'Moleküle çift bağ veya halka eklenerek biyoaktif konformasyon dondurulur; entropik enerji kaybı önlenerek afinite artırılır.',
            ar: 'تثبيت التشكيل الفراغي النشط بإضافة حلقة أو رابطة ثنائية يقلل الفقد الإنتروبي ويزيد الألفة للمستقبل.',
            en: 'Locking bioactive conformations via rigid ring systems eliminates entropic freezing penalties, boosting target affinity.',
          },
        },
      ],
    },
    presets: [
      {
        id: 'trans-des',
        label: { tr: 'trans-Dietilstilbestrol (Aktif Östrojenik)', ar: 'trans-ثنائي إيثيل ستيلبوستيرول (فعال)', en: 'trans-Diethylstilbestrol (Active Estrogenic)' },
        badge: { tr: 'Mesafe: 14.5 Å', ar: 'المسافة: 14.5 Å', en: 'Distance: 14.5 Å' },
        description: {
          tr: 'Östradiol hidroksil mesafesini birebir taklit ederek nükleer östrojen reseptörüne yüksek afiniteyle bağlanır.',
          ar: 'يطابق أبعاد هرمون الإستراديول ويرتبط بمستقبلات الإستروجين بدقة.',
          en: 'Perfectly mimics natural estradiol pharmacophore geometry.',
        },
        params: { isomerType: 'trans', interatomicDistance: 14.5 },
        variant: 'green',
      },
    ],
    missions: [
      {
        id: 'mission-lock-trans',
        title: { tr: 'Görev: Biyoaktif trans Geometrisini Seçin', ar: 'المهمة: اختيار التكوين الفراغي الهندسي trans النشط', en: 'Mission: Align Bioactive trans Geometry' },
        instruction: {
          tr: 'İzomer panelinde trans geometrisini seçerek 14.5 Å farmakofor mesafesini doğrulayın.',
          ar: 'اختر المصاوغ trans لتحقيق المسافة الفراغية المطلوبة بين المجموعات الفعالة.',
          en: 'Select the trans configuration to verify the 14.5 Å pharmacophore distance.',
        },
        hint: { tr: 'trans-izomerinde hacimli gruplar çift bağın zıt taraflarındadır.', ar: 'في مصاوغ trans تكون المجموعات الكبيرة في جهتين متقابلتين.', en: 'Bulky aromatic rings sit on opposite sides of the central double bond.' },
        rewardXP: 25,
        successMessage: { tr: 'Doğrulandı! trans konfigürasyonu 14.5 Å mesafesini sağlayarak östrojen reseptörünü aktive eder.', ar: 'تم التحقق! يحقق مصاوغ trans المسافة المطلوبة وينشط مستقبلات الإستروجين.', en: 'Verified! trans configuration satisfies the 14.5 Å inter-oxygen pharmacophore.' },
        validator: (params) => params?.isomerType === 'trans',
      },
    ],
    evaluateHud: (_params, locale) => ({
      stateLabel: locale === 'tr' ? 'Biyoaktif Geometri Kilitlendi' : locale === 'ar' ? 'تم تثبيت الشكل الهندسي النشط' : 'Bioactive Geometry Locked',
      stateColor: 'green',
      valueDisplay: 'trans (E) • 14.5 Å',
      analysis:
        locale === 'tr'
          ? 'Fenolik oksijen atomları reseptör ceplerindeki Glu-353 ve His-524 ile kusursuz hidrojen bağları oluşturur.'
          : locale === 'ar'
          ? 'تتطابق ذرات الأكسجين مع الأحماض الأمينية في جيب المستقبل لتكوين روابط هيدروجينية مثالية.'
          : 'Phenolic oxygens form optimal hydrogen bonds with Glu-353 and His-524 in the nuclear pocket.',
    }),
  },

  // Lesson 9: Faz 1 İlaç Metabolizması & Sitokrom P450
  'mc-mod5-les1': {
    lessonId: 'mc-mod5-les1',
    course: 'medchem',
    widgetType: 'MetabolismMap',
    defaultParams: { enzyme: 'CYP3A4', reaction: 'hydroxylation' },
    facultySource: {
      instructor: 'Prof. Dr. Bedia Kaymakçıoğlu',
      courseName: 'ECZ 335 Farmasötik Kimya-1 (Marmara Üniversitesi)',
      deck: 'İlaç metabolizması-2026.pdf',
      slides: 'Slayt 1–38 (Sitokrom P450 Monooksijenaz Sistemi, Faz 1 Fonksiyonelleştirme)',
    },
    howItWorks: {
      title: {
        tr: 'Faz 1 Sitokrom P450 Metabolizması Nasıl Çalışır?',
        ar: 'كيف يعمل أيض المرحلة الأولى بواسطة السيتوكروم P450؟',
        en: 'How Does Phase 1 Cytochrome P450 Metabolism Work?',
      },
      summary: {
        tr: 'Faz 1 reaksiyonları (fonksiyonelleştirme), lipofilik ilaç moleküllerine polar gruplar (-OH, -NH2, -SH, -COOH) sokarak veya açığa çıkararak molekülü daha hidrofilik ve Faz 2 konjugasyonuna hazır hale getirir.',
        ar: 'تفاعلات المرحلة الأولى (Phase 1) تدخل أو تكشف مجموعات قطبية (-OH, -NH2) في جزيء الدواء لزيادة ذوبانيته بالماء وتحضيره للمرحلة الثانية.',
        en: 'Phase 1 functionalization introduces or unmasks polar reactive groups (-OH, -NH2) via CYP450 monooxygenases, facilitating Phase 2 conjugation.',
      },
      coreFormula: '\\\\text{RH} + \\\\text{O}_2 + \\\\text{NADPH} + \\\\text{H}^+ \\\\xrightarrow{\\\\text{CYP450}} \\\\text{ROH} + \\\\text{H}_2\\\\text{O} + \\\\text{NADP}^+',
      takeaways: [
        {
          title: { tr: '1. CYP3A4 ve CYP2D6 Baskınlığı', ar: '1. هيمنة إنزيمات CYP3A4 وCYP2D6', en: '1. Dominance of CYP3A4 and CYP2D6' },
          body: {
            tr: 'Klinik ilaçların %50 sinden fazlası karaciğerde CYP3A4, %25 i ise polimorfik CYP2D6 izoenzimi tarafından metabolize edilir.',
            ar: 'أكثر من 50% من الأدوية تؤيض بواسطة CYP3A4، ونحو 25% بواسطة CYP2D6 المتعدد الأشكال الجينية.',
            en: 'Over 50% of prescription drugs are oxidized by hepatic CYP3A4, and 25% by genetically polymorphic CYP2D6.',
          },
        },
        {
          title: { tr: '2. İlaç Etkileşimleri (İndüksiyon / İnhibisyon)', ar: '2. التداخلات الدوائية (تثبيط وتحريض الإنزيمات)', en: '2. Enzyme Induction vs Inhibition' },
          body: {
            tr: 'Greyfurt suyu CYP3A4 ü inhibe ederek felodipin toksisitesini artırırken, rifampisin indükleyerek ilaç klerensini dramatik hızlandırır.',
            ar: 'يثبط عصير الغريب فروت إنزيم CYP3A4 مما يرفع سمية الدواء، بينما يحرضه الريفامبيسين ويسرع التخلص منه.',
            en: 'Grapefruit juice irreversibly inhibits intestinal CYP3A4 causing toxicity, while rifampin induces transcription.',
          },
        },
      ],
    },
    presets: [
      {
        id: 'cyp3a4-hydroxylation',
        label: { tr: 'CYP3A4 Aromatik Hidroksilasyon', ar: 'أكسدة أروماتية بواسطة CYP3A4', en: 'CYP3A4 Aromatic Hydroxylation' },
        badge: { tr: 'Faz 1 • Oksidasyon', ar: 'المرحلة 1 • أكسدة', en: 'Phase 1 • Oxidation' },
        description: {
          tr: 'Lipofilik fenil halkasına fenolik hidroksil grubu takılarak suda çözünürlük artırılır.',
          ar: 'إدخال مجموعة هيدروكسيل على حلقة البنزين لزيادة الذوبانية المائية.',
          en: 'Introduction of a phenolic hydroxyl group into lipophilic aromatic rings.',
        },
        params: { enzyme: 'CYP3A4', reaction: 'hydroxylation' },
        variant: 'blue',
      },
    ],
    missions: [
      {
        id: 'mission-cyp-oxidation',
        title: { tr: 'Görev: CYP3A4 Oksidatif Yolağını Başlatın', ar: 'المهمة: تفعيل مسار الأكسدة بواسطة CYP3A4', en: 'Mission: Activate CYP3A4 Oxidation Pathway' },
        instruction: {
          tr: 'Metabolizma panelinde CYP3A4 enzimini ve hidroksilasyon reaksiyonunu seçin.',
          ar: 'حدد إنزيم CYP3A4 ومسار الهيدروكسيلة لمشاهدة تحويل الدواء لشكل أكثر قطبية.',
          en: 'Select CYP3A4 monooxygenase and aromatic hydroxylation pathway.',
        },
        hint: { tr: 'CYP3A4 karaciğer ve ince bağırsaktaki en bol CYP izoenzimidir.', ar: 'CYP3A4 هو الإنزيم الأوسع انتشاراً في الكبد والأمعاء.', en: 'CYP3A4 represents the most abundant hepatic and intestinal cytochrome.' },
        rewardXP: 25,
        successMessage: { tr: 'Başarılı! CYP3A4 hidroksilasyonuyla metabolit polar hale getirildi.', ar: 'ناجح! تمت الهيدروكسيلة بنجاح وتحول المستقلب إلى شكل قطبي.', en: 'Success! CYP3A4 hydroxylation functionalized the substrate with polar -OH.' },
        validator: (params) => params?.enzyme === 'CYP3A4',
      },
    ],
    evaluateHud: (_params, locale) => ({
      stateLabel: locale === 'tr' ? 'Faz 1 Oksidatif Fonksiyonelleştirme' : locale === 'ar' ? 'أكسدة وظيفية (المرحلة 1)' : 'Phase 1 Functionalization',
      stateColor: 'green',
      valueDisplay: 'CYP3A4 Aktif',
      analysis:
        locale === 'tr'
          ? 'Moleküle reaktif oksijen katılarak polarite yükseltildi ve Faz 2 konjugasyon alanı açıldı.'
          : locale === 'ar'
          ? 'تم إدخال ذرة أكسجين نشطة وزادت القطبية للتحضير للمرحلة الثانية.',
          : 'Substrate monooxygenated; polar functional handle installed for Phase 2 transferases.',
    }),
  },

  // Lesson 10: Faz 2 Konjugasyon & Glukuronidasyon
  'mc-mod5-les2': {
    lessonId: 'mc-mod5-les2',
    course: 'medchem',
    widgetType: 'MetabolismMap',
    defaultParams: { enzyme: 'UGT', cofactor: 'UDPGA' },
    facultySource: {
      instructor: 'Prof. Dr. Bedia Kaymakçıoğlu',
      courseName: 'ECZ 335 Farmasötik Kimya-1 (Marmara Üniversitesi)',
      deck: 'İlaç metabolizması-2026.pdf',
      slides: 'Slayt 39–65 (Glukuronidasyon, Sülfasyon, Glutatyon Konjugasyonu, Parasetamol Toksisitesi)',
    },
    howItWorks: {
      title: {
        tr: 'Faz 2 Konjugasyon ve Glutatyon Detoksifikasyonu Nasıl Çalışır?',
        ar: 'كيف يعمل اقتران المرحلة الثانية وإزالة السمية بالجلوتاثيون؟',
        en: 'How Does Phase 2 Conjugation & Glutathione Detoxification Work?',
      },
      summary: {
        tr: 'Faz 2 konjugasyon reaksiyonlarında ilaca endojen polar moleküller (glukuronik asit, sülfat, glutatyon) transferaz enzimleri ile eklenir. Oluşan konjugatlar suda son derece yüksek çözünürlüğe sahip olup idrar ve safrayla hızla atılır.',
        ar: 'تفاعلات المرحلة الثانية تضيف جزيئات قطبية داخلية المنشأ (حمض الغلوكورونيك، الكبريتات، الجلوتاثيون) لتحويل المركب إلى شكل عالي الذوبانية بالماء ليطرح بالبول.',
        en: 'Phase 2 transferases conjugate endogenous hydrophilic cofactors (glucuronic acid, sulfate, GSH) yielding polar excretable metabolites.',
      },
      coreFormula: '\\\\text{Parasetamol} \\\\xrightarrow{\\\\text{CYP2E1}} \\\\text{NAPQI (Toksik)} \\\\xrightarrow{\\\\text{GSH}} \\\\text{Merkaptürik Asit (Güvenli İtrah)}',
      takeaways: [
        {
          title: { tr: '1. Parasetamol Toksisitesi ve NAPQI', ar: '1. سمية الباراسيتامول ومركب NAPQI', en: '1. Paracetamol Toxicity & NAPQI' },
          body: {
            tr: 'Yüksek dozda glukuronidasyon doyuma ulaşınca parasetamol CYP2E1 ile reaktif elektrofilik NAPQI ye dönüşür. Glutatyon tükenirse karaciğer nekrozu başlar; N-asetilsistein (NAC) glutatyonu yeniler.',
            ar: 'عند الجرعات الزائدة يتشكل NAPQI السام؛ استنزاف الجلوتاثيون يسبب نخر الكبد، ويعالج بـ N-acetylcysteine.',
            en: 'Overdose saturates glucuronidation, shunting paracetamol to toxic NAPQI. Depleting glutathione triggers hepatic necrosis, rescued by NAC.',
          },
        },
        {
          title: { tr: '2. En Yaygın Yol: Glukuronidasyon (UGT)', ar: '2. الغلوكورونة المسار الأكثر شيوعاً', en: '2. Dominant Pathway: Glucuronidation' },
          body: {
            tr: 'UDP-glukuronoziltransferaz (UGT), kofaktör UDPGA kullanarak fenol, alkol ve karboksilik asit gruplarına glukuronid bağlar.',
            ar: 'تستخدم إنزيمات UGT كوفاكتور UDPGA لربط حمض الغلوكورونيك بالمجموعات الهيدروكسيلية.',
            en: 'UGT transferases utilize UDPGA cofactor to attach beta-D-glucuronic acid to hydroxyl and carboxyl handles.',
          },
        },
      ],
    },
    presets: [
      {
        id: 'ugt-glucuronidation',
        label: { tr: 'UGT Glukuronidasyonu (Morfin-3-Glukuronid)', ar: 'اقتران الغلوكورونيد (Morphine-3-G)', en: 'UGT Glucuronidation (Morphine-3-G)' },
        badge: { tr: 'Polarite: +500%', ar: 'القطبية: +500%', en: 'Polarity: +500%' },
        description: {
          tr: 'Fenolik hidroksile glukuronik asit takılarak ilacın renal atılımı hızlandırılır.',
          ar: 'ربط حمض الغلوكورونيك لتسريع الإطراح الكلوي للدواء.',
          en: 'Attachment of glucuronic acid forces rapid renal elimination.',
        },
        params: { enzyme: 'UGT', cofactor: 'UDPGA' },
        variant: 'green',
      },
    ],
    missions: [
      {
        id: 'mission-glutathione-rescue',
        title: { tr: 'Görev: NAPQI Detoksifikasyonunu Sağlayın', ar: 'المهمة: إزالة سمية مركب NAPQI بالجلوتاثيون', en: 'Mission: Rescue NAPQI with Glutathione' },
        instruction: {
          tr: 'Metabolizma panelinde Glutatyon S-transferaz (GST) konjugasyonunu seçerek elektrofilik NAPQI nin nötralizasyonunu doğrulayın.',
          ar: 'اختر مسار الجلوتاثيون لتحييد المركب التفاعلي السام NAPQI ومنع نخر الكبد.',
          en: 'Select glutathione S-transferase pathway to neutralize reactive electrophilic NAPQI.',
        },
        hint: { tr: 'Glutatyonun tiyol (-SH) grubu elektrofilik merkezlere nükleofilik olarak saldırır.', ar: 'مجموعة الثيول (-SH) في الجلوتاثيون تهاجم المركز الإلكتروفيلي السام.', en: 'GSH thiol group nucleophilically quenches reactive electrophiles.' },
        rewardXP: 25,
        successMessage: { tr: 'Harika! Glutatyon konjugasyonu NAPQI yi nötralize etti. Karaciğer nekrozu engellendi.', ar: 'ممتاز! قام الجلوتاثيون بتحييد سمية NAPQI وحماية الكبد من النخر.', en: 'Great! Glutathione conjugation successfully quenched NAPQI, preventing hepatotoxicity.' },
        validator: (params) => params?.enzyme === 'UGT' || params?.cofactor === 'UDPGA',
      },
    ],
    evaluateHud: (_params, locale) => ({
      stateLabel: locale === 'tr' ? 'Faz 2 Konjugatı Hazır' : locale === 'ar' ? 'جاهز للإطراح الكلوي (المرحلة 2)' : 'Phase 2 Conjugate Formed',
      stateColor: 'green',
      valueDisplay: 'Suda Çözünür Konjugat',
      analysis:
        locale === 'tr'
          ? 'Molekül yüksek iyonik yük ve hidrofilisite kazanarak renal tübüler geri emilime kapalı hale gelmiştir.'
          : locale === 'ar'
          ? 'اكتسب المركب شحنة قطبية عالية تمنع إعادة امتصاصه وتسرع طرحه في البول.'
          : 'High molecular weight hydrophilic conjugate formed, ready for active biliary or renal transport.',
    }),
  },

  // =========================================================================
  // COURSE B: FARMAKOLOJİ (DR. MERYEM ARAS)
  // =========================================================================

  // Lesson 11 (Pharm 1): Kademeli Doz-Yanıt Eğrileri & EC50
  'pharm-mod1-les1': {
    lessonId: 'pharm-mod1-les1',
    course: 'pharmacology',
    widgetType: 'DoseResponseCurve',
    defaultParams: { logEc50: -7, slope: 1, emax: 100 },
    facultySource: {
      instructor: 'Dr. Meryem Aras',
      courseName: 'ECZ 305 Farmakoloji-I (Marmara Üniversitesi)',
      deck: 'farmakolojiye giriş.pdf',
      slides: 'Slayt 1–28 (Kademeli Doz-Yanıt Eğrileri, EC50, İntrinsik Aktivite, Agonistler)',
    },
    howItWorks: {
      title: {
        tr: 'Kademeli Doz-Yanıt Eğrileri ve EC50 Nasıl Çalışır?',
        ar: 'كيف تعمل منحنيات الجرعة والاستجابة التدريجية وقيمة EC50؟',
        en: 'How Do Graded Dose-Response Curves & EC50 Work?',
      },
      summary: {
        tr: 'Agonist ilacın konsantrasyonu arttıkça reseptör işgali ve biyolojik yanıt sigmoidal (yarı-logaritmik) bir eğri izler. EC50, maksimum etkinin %50 sini oluşturan konsantrasyondur ve ilacın potensini (etki gücünü) gösterir.',
        ar: 'تتبع استجابة المستقبل لتركيز الدواء منحنى لوغاريتمي سينياً. تمثل EC50 التركيز الذي ينتج 50% من الاستجابة العظمى وتدل على قوة الدواء (Potency).',
        en: 'As agonist concentration increases, biological response follows a sigmoidal semi-logarithmic curve. EC50 defines the concentration producing 50% Emax (potency).',
      },
      coreFormula: 'E = \\\\frac{E_{\\\\max} [A]^n}{EC_{50}^n + [A]^n} \\\\quad (\\text{Hill Denklemi})',
      takeaways: [
        {
          title: { tr: '1. Potens (EC50) vs Efikasi (Emax)', ar: '1. القوة (Potency) مقابل الفعالية القصوى (Efficacy)', en: '1. Potency (EC50) vs Efficacy (Emax)' },
          body: {
            tr: 'Daha düşük EC50 değerine sahip ilaç daha potenttir (sola kaymış eğri). Emax ise ilacın reseptörde oluşturabildiği tavan yanıttır (efikasi).',
            ar: 'الدواء ذو EC50 الأقل هو الأكثر قوة (منحنى مزاح لليسار). بينما Emax تعبر عن أقصى استجابة بيولوجية ممكنة.',
            en: 'Lower EC50 indicates higher potency (left-shifted curve). Emax represents maximal achievable efficacy.',
          },
        },
        {
          title: { tr: '2. Parsiyel Agonist (Submaksimal Efikasi)', ar: '2. الناهض الجزئي (فعالية دون القصوى)', en: '2. Partial Agonists' },
          body: {
            tr: 'Parsiyel agonistler tüm reseptörleri işgal etseler dahi Emax ları tam agonistten düşüktür; tam agonistin varlığında kompetitif antagonist gibi davranırlar.',
            ar: 'الناهضات الجزئية لا تحقق 100% من Emax حتى مع إشغال كامل المستقبلات، وتعمل كمثبط بوجود ناهض كامل.',
            en: 'Partial agonists cannot produce 100% Emax even at full receptor saturation, acting as functional antagonists alongside full agonists.',
          },
        },
      ],
    },
    presets: [
      {
        id: 'full-agonist',
        label: { tr: 'Tam Agonist (Emax = %100, EC50 = 10 nM)', ar: 'ناهض كامل (Emax = 100%)', en: 'Full Agonist (Emax = 100%, EC50 = 10 nM)' },
        badge: { tr: 'Emax = 100%', ar: 'Emax = 100%', en: 'Emax = 100%' },
        description: {
          tr: 'Yüksek intrinsik aktiviteye sahip tam agonist model yanıtı.',
          ar: 'ناهض ذو فعالية جوهرية كاملة ينشط المستقبل بنسبة 100%.',
          en: 'High intrinsic efficacy producing maximal receptor stimulation.',
        },
        params: { logEc50: -8, slope: 1, emax: 100 },
        variant: 'green',
      },
      {
        id: 'partial-agonist',
        label: { tr: 'Parsiyel Agonist (Emax = %50, Buprenorfin Modeli)', ar: 'ناهض جزئي (Emax = 50%)', en: 'Partial Agonist (Emax = 50%, Buprenorphine)' },
        badge: { tr: 'Emax = 50%', ar: 'Emax = 50%', en: 'Emax = 50%' },
        description: {
          tr: 'Maksimal yanıt %50 de sınırlı kalır; solunum depresyonu tavan etkisi gösterir.',
          ar: 'استجابة عظمى محدودة بـ 50% مع سقف أمان ضد تثبيط التنفس.',
          en: 'Ceiling effect with maximal response capped at 50%.',
        },
        params: { logEc50: -8.5, slope: 1, emax: 50 },
        variant: 'yellow',
      },
    ],
    missions: [
      {
        id: 'mission-calibrate-potency',
        title: { tr: 'Görev: Potensi 10 Kat Artırın (Sola Kayma)', ar: 'المهمة: زيادة قوة الدواء 10 أضعاف (إزاحة لليسار)', en: 'Mission: Shift Potency 10-fold to the Left' },
        instruction: {
          tr: 'Doz-yanıt sürgüsünü kullanarak logEC50 değerini -7 den -8 e çekin ve potens artışını doğrulayın.',
          ar: 'حرك زالق EC50 لليسار لخفض التركيز الفعال بمقدار 10 أضعاف.',
          en: 'Adjust logEC50 slider from -7 to -8 to demonstrate a 10-fold increase in drug potency.',
        },
        hint: { tr: 'Daha küçük EC50 değeri, aynı etki için daha az ilaç gerektiği anlamına gelir.', ar: 'انخفاض EC50 يعني حاجة لجرعة أقل لتحقيق نفس النتيجة.', en: 'Lower EC50 means lower molar concentration required for 50% response.' },
        rewardXP: 25,
        successMessage: { tr: 'Tebrikler! logEC50 sola kaydırıldı; ilacın potensi 10 kat artırıldı.', ar: 'تهانينا! أزيح المنحنى لليسار وزادت قوة الدواء بمقدار 10 أضعاف.', en: 'Congratulations! Curve shifted leftward; potency increased by 10-fold.' },
        validator: (params) => Number(params?.logEc50 || -7) <= -7.8,
      },
    ],
    evaluateHud: (params, locale) => {
      const emax = Number(params?.emax || 100);
      return {
        stateLabel: emax >= 95 ? (locale === 'tr' ? 'Tam Agonist Yanıtı' : locale === 'ar' ? 'استجابة ناهض كامل' : 'Full Agonist') : (locale === 'tr' ? 'Parsiyel Agonist Yanıtı' : locale === 'ar' ? 'استجابة ناهض جزئي' : 'Partial Agonist'),
        stateColor: emax >= 95 ? 'green' : 'amber',
        valueDisplay: `Emax = %${emax}`,
        analysis:
          locale === 'tr'
            ? 'Konsantrasyon-yanıt ilişkisi Hill denklemine tam uyum gösterir.'
            : locale === 'ar'
            ? 'علاقة التركيز والاستجابة تتبع معادلة هيل بدقة.'
            : 'Sigmoidal concentration-effect relationship verified per Hill equation.',
      };
    },
  },

  // Lesson 12 (Pharm 2): Kompetitif ve Non-Kompetitif Antagonizma
  'pharm-mod1-les2': {
    lessonId: 'pharm-mod1-les2',
    course: 'pharmacology',
    widgetType: 'DoseResponseCurve',
    defaultParams: { antagonistType: 'competitive', antagonistConc: 10, shiftFactor: 10 },
    facultySource: {
      instructor: 'Dr. Meryem Aras',
      courseName: 'ECZ 305 Farmakoloji-I (Marmara Üniversitesi)',
      deck: 'farmakolojiye giriş.pdf',
      slides: 'Slayt 29–48 (Antagonizma Türleri, Schild Denklemi, Tersinir/Tersinmez Blokaj)',
    },
    howItWorks: {
      title: {
        tr: 'Kompetitif ve Non-Kompetitif Antagonizma Nasıl Çalışır?',
        ar: 'كيف يعمل التضاد التنافسي وغير التنافسي (Antagonism)؟',
        en: 'How Does Competitive vs Non-Competitive Antagonism Work?',
      },
      summary: {
        tr: 'Kompetitif antagonistler aynı reseptör cebi için agonist ile yarışır; eğriyi paralel olarak sağa kaydırır (Emax değişmez, EC50 artar). Non-kompetitif (irreversible) antagonistler ise kovalent bağlanarak veya allosterik olarak Emax ı kalıcı düşürür.',
        ar: 'المتضادات التنافسية تزاحم الناهض على نفس الجيب وتزيح المنحنى لليمين دون خفض Emax. بينما المتضادات غير التنافسية تخفض Emax بشكل دائم.',
        en: 'Competitive antagonists compete for the same orthosteric site, causing parallel rightward shifts without reducing Emax. Non-competitive antagonists depress Emax.',
      },
      coreFormula: '\\\\frac{[A\']}{[A]} - 1 = \\\\frac{[B]}{K_B} \\\\quad (\\text{Schild Denklemi})',
      takeaways: [
        {
          title: { tr: '1. Kompetitif Antagonizma Aşılabilir (Surmountable)', ar: '1. التضاد التنافسي يمكن تجاوزه بزيادة الجرعة', en: '1. Competitive Blockade is Surmountable' },
          body: {
            tr: 'Agonist dozu yeterince artırıldığında kompetitif antagonist reseptörden uzaklaştırılır ve %100 Emax a tekrar ulaşılır.',
            ar: 'بزيادة تركيز الناهض لمستويات مرتفعة يمكن إزاحة المتضاد التنافسي واستعادة 100% من الاستجابة.',
            en: 'High agonist concentrations overcome competitive antagonism, restoring 100% maximal response.',
          },
        },
        {
          title: { tr: '2. Non-Kompetitif Blokaj (Aşılamaz / Insurmountable)', ar: '2. التضاد غير التنافسي لا يمكن تجاوزه', en: '2. Insurmountable Non-Competitive Depression' },
          body: {
            tr: 'Fenoksibenzamin gibi kovalent bağlanan antagonistlerde agonist dozu ne kadar artırılırsa artırılsın Emax geri kazanılamaz.',
            ar: 'المتضادات غير التنافسية (مثل فينوكسي بنزامين) تخفض Emax ولا يمكن استعادتها بزيادة جرعة الناهض.',
            en: 'Irreversible alkylating antagonists like phenoxybenzamine permanently depress Emax regardless of agonist dose.',
          },
        },
      ],
    },
    presets: [
      {
        id: 'competitive-shift',
        label: { tr: 'Kompetitif Blokaj (Paralel Sağa Kayma, Emax %100)', ar: 'تضاد تنافسي (إزاحة متوازية لليمين)', en: 'Competitive Antagonism (Parallel Right Shift)' },
        badge: { tr: 'Emax = 100%', ar: 'Emax = 100%', en: 'Emax = 100%' },
        description: {
          tr: 'Agonist eğrisi paralel sağa kayar; agonist dozu artırılarak tavan yanıt aşılabilir.',
          ar: 'إزاحة متوازية للمنحنى لليمين مع الحفاظ على الفعالية العظمى 100%.',
          en: 'Parallel rightward shift with preserved maximal efficacy Emax.',
        },
        params: { antagonistType: 'competitive', antagonistConc: 10, shiftFactor: 10 },
        variant: 'blue',
      },
      {
        id: 'non-competitive-crush',
        label: { tr: 'Non-Kompetitif İrreversible Blokaj (Emax %50)', ar: 'تضاد غير تنافسي (انخفاض Emax لـ 50%)', en: 'Non-Competitive (Emax Depressed to 50%)' },
        badge: { tr: 'Emax = 50%', ar: 'Emax = 50%', en: 'Emax = 50%' },
        description: {
          tr: 'Kovalent bağlanma reseptör havuzunu tüketerek Emax ı kalıcı şekilde yarıya indirir.',
          ar: 'ارتباط تساهمي يقلل المستقبلات المتاحة ويخفض Emax إلى 50%.',
          en: 'Irreversible receptor alkylation irreversibly caps maximal response.',
        },
        params: { antagonistType: 'noncompetitive', antagonistConc: 50, emax: 50 },
        variant: 'red',
      },
    ],
    missions: [
      {
        id: 'mission-overcome-competitive',
        title: { tr: 'Görev: Kompetitif Blokajı Aşarak Emax ı Koruyun', ar: 'المهمة: تجاوز التضاد التنافسي واستعادة الاستجابة العظمى', en: 'Mission: Overcome Competitive Blockade' },
        instruction: {
          tr: 'Kompetitif antagonist varlığında agonist konsantrasyonunu 10 kat artırarak %100 Emax a tekrar ulaşın.',
          ar: 'ارفع تركيز الناهض بمقدار 10 أضعاف لاستعادة الفعالية العظمى 100% بوجود المتضاد التنافسي.',
          en: 'Increase agonist dose 10-fold in the presence of competitive antagonist to reach 100% Emax.',
        },
        hint: { tr: 'Kompetitif antagonizmada Emax değişmez, sadece sağa kayar.', ar: 'التضاد التنافسي لا يغير Emax.', en: 'Competitive antagonism is fully surmountable with agonist excess.' },
        rewardXP: 25,
        successMessage: { tr: 'Mükemmel! Agonist fazlalığı kompetitif blokajı aştı ve %100 Emax geri kazanıldı.', ar: 'رائع! نجحت زيادة الناهض في تجاوز التضاد التنافسي واستعادة 100% Emax.', en: 'Excellent! Surmountable competitive antagonism proven by restoring 100% Emax.' },
        validator: (params) => params?.antagonistType === 'competitive',
      },
    ],
    evaluateHud: (params, locale) => {
      const isComp = params?.antagonistType === 'competitive';
      return {
        stateLabel: isComp ? (locale === 'tr' ? 'Kompetitif (Aşılabilir) Antagonizma' : locale === 'ar' ? 'تضاد تنافسي (قابل للتجاوز)' : 'Competitive (Surmountable)') : (locale === 'tr' ? 'Non-Kompetitif (Aşılamaz)' : locale === 'ar' ? 'تضاد غير تنافسي (لا يمكن تجاوزه)' : 'Non-Competitive (Insurmountable)'),
        stateColor: isComp ? 'blue' : 'rose',
        valueDisplay: isComp ? 'Emax Korundu (%100)' : 'Emax Baskılandı (%50)',
        analysis: isComp
          ? (locale === 'tr' ? 'Eğri paralel sağa kaydı. Schild denklemine uygun kompetitif yarışma gerçekleşti.' : locale === 'ar' ? 'أزيح المنحنى لليمين بالتوازي وفق معادلة شيلد.' : 'Parallel rightward shift conforming strictly to Schild regression mechanics.')
          : (locale === 'tr' ? 'Reseptör rezervi aşıldı; kovalent veya allosterik inhibisyon Emax ı kalıcı düşürdü.' : locale === 'ar' ? 'انخفاض دائم في الاستجابة العظمى بسبب الارتباط التساهمي.' : 'Allosteric or irreversible blockade permanently depresses ceiling response.'),
      };
    },
  },

  // Lesson 13 (Pharm 3): Terapötik İndeks & Güvenlik Aralığı
  'pharm-mod2-les1': {
    lessonId: 'pharm-mod2-les1',
    course: 'pharmacology',
    widgetType: 'DoseResponseCurve',
    defaultParams: { ed50: 10, td50: 200, therapeuticIndex: 20 },
    facultySource: {
      instructor: 'Dr. Meryem Aras',
      courseName: 'ECZ 335 / ECZ 305 (Marmara Üniversitesi)',
      deck: 'farmakolojiye giriş.pdf',
      slides: 'Slayt 49–65 (Kuantal Doz-Yanıt, TD50, ED50, Terapötik İndeks, Güvenlik Sınırı)',
    },
    howItWorks: {
      title: {
        tr: 'Terapötik İndeks ve Güvenlik Aralığı Nasıl Çalışır?',
        ar: 'كيف يعمل المؤشر العلاجي وهامش الأمان الدوائي؟',
        en: 'How Does Therapeutic Index & Margin of Safety Work?',
      },
      summary: {
        tr: 'Terapötik İndeks (TI = TD50 / ED50), bir ilacın güvenliğini ölçen en temel farmakolojik orandır. Yüksek TI değerine sahip ilaçlar (penisilin > 100) güvenliyken, dar terapötik indeksli ilaçlar (varfarin, digoksin, teofilin, TI < 2) sıkı plazma düzeyi takibi (TDM) gerektirir.',
        ar: 'المؤشر العلاجي (TI = TD50 / ED50) يقيس أمان الدواء. الأدوية ذات المؤشر الضيق (مثل الوارفارين والديجوكسين TI < 2) تتطلب مراقبة مستمرة للتركيز في الدم.',
        en: 'Therapeutic Index (TI = TD50 / ED50) quantifies drug safety. Narrow therapeutic index drugs (digoxin, warfarin, lithium; TI < 2) require routine therapeutic drug monitoring (TDM).',
      },
      coreFormula: 'TI = \\\\frac{TD_{50}}{ED_{50}} \\\\quad \\\\text{ve} \\\\quad \\\\text{Güvenlik Sınırı} = \\\\frac{TD_1 - ED_{99}}{ED_{99}} \\\\times 100',
      takeaways: [
        {
          title: { tr: '1. Geniş vs Dar Terapötik İndeks', ar: '1. مؤشر علاجي واسع مقابل ضيق', en: '1. Wide vs Narrow Therapeutic Window' },
          body: {
            tr: 'TI < 2 olan ilaçlarda hafif bir doz artışı veya metabolizma yavaşlaması fatal toksisiteye yol açabilir.',
            ar: 'في الأدوية ذات TI < 2 فإن زيادة طفيفة بالجرعة تؤدي مباشرة إلى التسمم.',
            en: 'In drugs with TI < 2, minor dose increments or metabolic inhibition can precipitate life-threatening toxicity.',
          },
        },
      ],
    },
    presets: [
      {
        id: 'wide-window',
        label: { tr: 'Geniş Güvenlik Aralığı (Penisilin Modeli, TI > 50)', ar: 'هامش أمان واسع (نموذج البنسلين)', en: 'Wide Therapeutic Index (Penicillin Model, TI > 50)' },
        badge: { tr: 'TI = 50 • Güvenli', ar: 'TI = 50 • آمن', en: 'TI = 50 • Safe' },
        description: { tr: 'Terapötik doz ile toksik doz arasında muazzam mesafe.', ar: 'فارق شاسع بين الجرعة العلاجية والجرعة السمية.', en: 'Immense safety margin between efficacy and toxicity.' },
        params: { ed50: 5, td50: 250, therapeuticIndex: 50 },
        variant: 'green',
      },
      {
        id: 'narrow-window',
        label: { tr: 'Dar Terapötik Pencere (Digoksin Modeli, TI = 1.8)', ar: 'مؤشر علاجي ضيق (نموذج الديجوكسين)', en: 'Narrow Therapeutic Index (Digoxin Model, TI = 1.8)' },
        badge: { tr: 'TI = 1.8 • Kritik', ar: 'TI = 1.8 • حرج', en: 'TI = 1.8 • Critical' },
        description: { tr: 'Etkin doz ile toksik doz eğrileri çakışma riski taşır (TDM zorunlu).', ar: 'تقارب خطير بين منحنى الفعالية ومنحنى السمية يتطلب مراقبة مستمرة.', en: 'Significant overlap between effective and toxic curves requiring TDM.' },
        params: { ed50: 10, td50: 18, therapeuticIndex: 1.8 },
        variant: 'red',
      },
    ],
    missions: [
      {
        id: 'mission-safe-margin',
        title: { tr: 'Görev: Terapötik İndeksi > 10 Güvenli Bölgeye Taşıyın', ar: 'المهمة: رفع المؤشر العلاجي فوق 10 لتحقيق الأمان', en: 'Mission: Establish Safe TI > 10' },
        instruction: {
          tr: 'Toksik doz mesafesini artırarak ilacın terapötik indeksinin en az 10 olduğunu doğrulayın.',
          ar: 'باعد بين منحنى الفعالية والسمية لتحقيق مؤشر علاجي آمن يتجاوز 10.',
          en: 'Separate effective and toxic curves to achieve a therapeutic index > 10.',
        },
        hint: { tr: 'TD50 / ED50 oranının büyük olması ilacın güvenliğini garantiler.', ar: 'ارتفاع نسبة TD50 إلى ED50 يضمن أمان الدواء.', en: 'A large ratio between TD50 and ED50 ensures broad safety.' },
        rewardXP: 25,
        successMessage: { tr: 'Tebrikler! TI > 10 güvenli aralığı doğrulandı.', ar: 'تهانينا! تحقق مؤشر الأمان العلاجي TI > 10.', en: 'Success! Broad safety margin established with TI > 10.' },
        validator: (params) => Number(params?.therapeuticIndex || 0) >= 10,
      },
    ],
    evaluateHud: (params, locale) => {
      const ti = Number(params?.therapeuticIndex || 20);
      return {
        stateLabel: ti >= 10 ? (locale === 'tr' ? 'Geniş Güvenlik Penceresi' : locale === 'ar' ? 'هامش أمان واسع' : 'Broad Margin') : (locale === 'tr' ? 'Dar Terapötik İndeks (TDM Gerekli)' : locale === 'ar' ? 'مؤشر ضيق (مراقبة سريرية مطلوبة)' : 'Narrow Index (TDM Alert)'),
        stateColor: ti >= 10 ? 'green' : 'rose',
        valueDisplay: `TI = ${ti.toFixed(1)}`,
        analysis: ti >= 10
          ? (locale === 'tr' ? 'Terapötik doz ile toksik doz arasında güvenli mesafe mevcuttur.' : locale === 'ar' ? 'مسافة كافية وآمنة بين الجرعة العلاجية والسمية.' : 'Substantial safety buffer between effective and toxic exposure.')
          : (locale === 'tr' ? 'Yüksek toksisite riski. Plazma düzeyi izlemi (TDM) zorunludur.' : locale === 'ar' ? 'خطر سمية مرتفع؛ يلزم مراقبة تركيز الدواء في المصل باستمرار.' : 'High toxicity risk requiring therapeutic drug monitoring.'),
      };
    },
  },

  // Lesson 14 (Pharm 4): Reseptör Tipleri ve Sinyal İletimi
  'pharm-mod2-les2': {
    lessonId: 'pharm-mod2-les2',
    course: 'pharmacology',
    widgetType: 'ReceptorLigandMatcher',
    defaultParams: { receptorClass: 'GPCR', gProtein: 'Gs' },
    facultySource: {
      instructor: 'Dr. Meryem Aras',
      courseName: 'ECZ 305 Farmakoloji-I (Marmara Üniversitesi)',
      deck: 'farmakolojiye giriş.pdf',
      slides: 'Slayt 66–95 (4 Büyük Reseptör Süperailesi, Gs/Gi/Gq, İkinci Haberciler)',
    },
    howItWorks: {
      title: {
        tr: 'Reseptör Süperaileleri ve İkinci Haberciler Nasıl Çalışır?',
        ar: 'كيف تعمل عائلات المستقبلات ونواقل الإشارة الخلوية؟',
        en: 'How Do Receptor Superfamilies & Second Messengers Work?',
      },
      summary: {
        tr: 'İlaç hedefleri 4 ana süperaileye ayrılır: 1. İyon Kanalları (milisaniyeler), 2. GPCR (G-Proteini Kenetli, saniyeler), 3. Kinaz Kenetli Reseptörler (dakikalar-saatler), 4. Nükleer Reseptörler (saatler-günler).',
        ar: 'تنقسم المستقبلات لـ 4 عائلات رئيسية: قنوات أيونية (أجزاء من الثانية)، مستقبلات مقترنة ببروتين G (ثواني)، مستقبلات مرتبطة بإنزيمات (ساعات)، ومستقبلات نووية (أيام).',
        en: 'Receptors span 4 superfamilies: ionotropic channels (milliseconds), GPCRs (seconds), kinase-linked (hours), and nuclear receptors (days).',
      },
      coreFormula: 'G_s \\\\implies \\\\text{Adenilat Siklaz} \\\\uparrow \\\\implies \\\\text{cAMP} \\\\uparrow \\\\implies \\\\text{PKA Aktivasyonu}',
      takeaways: [
        {
          title: { tr: '1. Gs vs Gi vs Gq Eksenleri', ar: '1. محاور Gs و Gi و Gq', en: '1. Gs, Gi, and Gq Divergence' },
          body: {
            tr: 'Gs adenilat siklazı uyararak cAMP yi artırır, Gi inhibe eder. Gq ise fosfolipaz C (PLC) üzerinden IP3 ve DAG üreterek hücre içi kalsiyumu fırlatır.',
            ar: 'Gs يحفز إنتاج cAMP، بينما Gi يثبطه. و Gq ينشط PLC لإنتاج IP3 و DAG وتحرير الكالسيوم.',
            en: 'Gs stimulates adenylyl cyclase (cAMP up), Gi inhibits it, while Gq activates PLC generating IP3/DAG and intracellular Ca2+ release.',
          },
        },
      ],
    },
    presets: [
      {
        id: 'gpcr-gs',
        label: { tr: 'Beta-1 Adrenerjik (Gs Eksenli, Kalp)', ar: 'مستقبل بيتا-1 (Gs، القلب)', en: 'Beta-1 Adrenergic (Gs Pathway, Heart)' },
        badge: { tr: 'cAMP ↑ • Kalp Atımı ↑', ar: 'cAMP ↑', en: 'cAMP ↑' },
        description: { tr: 'Gs proteini aktivasyonu kalp kasında kontraktilite ve atım hızını artırır.', ar: 'تنشيط Gs يزيد من ضربات القلب وقوة الانقباض.', en: 'Gs activation increases inotropy and chronotropy.' },
        params: { receptorClass: 'GPCR', gProtein: 'Gs' },
        variant: 'green',
      },
    ],
    missions: [
      {
        id: 'mission-activate-gq',
        title: { tr: 'Görev: Gq Yolağını Seçerek Kalsiyum Salınımını Tetikleyin', ar: 'المهمة: تفعيل مسار Gq وتحرير الكالسيوم', en: 'Mission: Activate Gq-PLC-IP3 Cascade' },
        instruction: {
          tr: 'Sinyal iletim panelinde Gq kenetli reseptör sınıfını seçerek PLC aktivasyonunu gözlemleyin.',
          ar: 'اختر مسار Gq المقترن بفوسفوليباز C لملاحظة تحرير الكالسيوم داخل الخلية.',
          en: 'Select the Gq-coupled receptor cascade to trigger IP3 generation and Ca2+ mobilization.',
        },
        hint: { tr: 'Alfa-1 adrenerjik reseptörler Gq ile kenetlidir ve vazokonstriksiyon yapar.', ar: 'مستقبلات ألفا-1 مقترنة بـ Gq وتحدث تقبضاً وعائياً.', en: 'Alpha-1 adrenergic receptors couple through Gq.' },
        rewardXP: 25,
        successMessage: { tr: 'Harika! Gq yolağı doğrulandı: PLC → IP3/DAG → Ca2+ salınımı gerçekleşti.', ar: 'رائع! تم تفعيل مسار Gq وتحرير الكالسيوم بنجاح.', en: 'Success! Gq cascade validated: PLC → IP3/DAG → Ca2+ release.' },
        validator: (params) => params?.gProtein === 'Gq' || params?.receptorClass === 'GPCR',
      },
    ],
    evaluateHud: (_params, locale) => ({
      stateLabel: locale === 'tr' ? 'Hücre İçi Sinyal İletimi Aktif' : locale === 'ar' ? 'نقل الإشارة الخلوية نشط' : 'Signal Cascade Active',
      stateColor: 'green',
      valueDisplay: 'GPCR Kenetli',
      analysis:
        locale === 'tr'
          ? 'Heterotrimerik G-proteini GTP bağlayarak alfa ve beta-gama alt birimlerine ayrıştı ve ikincil habercileri tetikledi.'
          : locale === 'ar'
          ? 'انفصلت وحدات بروتين G بعد ارتباط GTP وبدأت بتحفيز النواقل الخلوية الثانوية.'
          : 'Heterotrimeric G-protein dissociated into G-alpha-GTP and G-beta-gamma complexes, driving effector enzymes.',
    }),
  },

  // Lesson 15 (Pharm 5): Farmakokinetik Absorpsiyon & Biyoyararlanım
  'pharm-mod3-les1': {
    lessonId: 'pharm-mod3-les1',
    course: 'pharmacology',
    widgetType: 'PkSimulator',
    defaultParams: { dose: 500, bioavailability: 0.8, ka: 1.2, kel: 0.15 },
    facultySource: {
      instructor: 'Dr. Meryem Aras',
      courseName: 'ECZ 305 Farmakoloji-I (Marmara Üniversitesi)',
      deck: 'Farmakokinetik-Absorpsiyon 21.09.pptx',
      slides: 'Slayt 1–35 (Biyoyararlanım F, AUC, Emilim Hız Sabiti ka, Cmax, Tmax)',
    },
    howItWorks: {
      title: {
        tr: 'Biyoyararlanım (F) ve Absorpsiyon Kinetiği Nasıl Çalışır?',
        ar: 'كيف يعمل التوافر الحيوي (F) وحركية الامتصاص الدوائي؟',
        en: 'How Does Bioavailability (F) & Absorption Kinetics Work?',
      },
      summary: {
        tr: 'Biyoyararlanım (F), uygulanan dozun sistemik dolaşıma değişmeden ulaşan kesridir. İntravenöz (IV) uygulamada F = 1.0 (%100) iken, oral yolda eksik emilim ve ilk geçiş hepatik metabolizması nedeniyle F < 1.0 dir.',
        ar: 'التوافر الحيوي (F) هو النسبة المئوية من الجرعة المعطاة التي تصل إلى الدورة الدموية الجهازية دون تغير (IV = 100%).',
        en: 'Bioavailability (F) is the fraction of administered dose reaching systemic circulation unchanged (IV = 1.0; oral < 1.0 due to first-pass metabolism).',
      },
      coreFormula: 'F = \\\\frac{AUC_{\\\\text{oral}} \\\\times \\\\text{Doz}_{\\\\text{IV}}}{AUC_{\\\\text{IV}} \\\\times \\\\text{Doz}_{\\\\text{oral}}}',
      takeaways: [
        {
          title: { tr: '1. Cmax ve Tmax Dinamiği', ar: '1. ديناميكية Cmax و Tmax', en: '1. Peak Concentration (Cmax) & Time (Tmax)' },
          body: {
            tr: 'Emilim hız sabiti (ka) ne kadar büyükse, tepe konsantrasyona (Cmax) o kadar hızlı (daha kısa Tmax) ulaşılır.',
            ar: 'كلما زاد معدل سرعة الامتصاص (ka) وصلنا للتركيز الأعظمي (Cmax) في وقت أسرع (Tmax أقصر).',
            en: 'Higher absorption rate constant (ka) yields faster peak attainment (shorter Tmax) and higher Cmax.',
          },
        },
      ],
    },
    presets: [
      {
        id: 'oral-high-f',
        label: { tr: 'Yüksek Biyoyararlanımlı Oral İlaç (F = 0.85)', ar: 'دواء فموي عالي التوافر الحيوي (F = 85%)', en: 'High Bioavailability Oral Drug (F = 0.85)' },
        badge: { tr: 'F = %85 • Oral', ar: 'F = 85%', en: 'F = 85%' },
        description: { tr: 'Minimal ilk geçiş etkisiyle sistemik dolaşıma yüksek oranda geçer.', ar: 'نفاذ جهازي ممتاز مع حد أدنى من أيض العبور الأول.', en: 'Rapid complete absorption with minimal first-pass loss.' },
        params: { dose: 500, bioavailability: 0.85, ka: 1.5, kel: 0.1 },
        variant: 'green',
      },
      {
        id: 'iv-bolus',
        label: { tr: 'İntravenöz Bolus (F = 1.00, Anında Dağılım)', ar: 'حقن وريدي مباشر (F = 100%)', en: 'Intravenous Bolus (F = 1.00, Instantaneous)' },
        badge: { tr: 'F = %100 • IV', ar: 'F = 100%', en: 'F = 100%' },
        description: { tr: 'Emilim fazı yoktur; tüm doz anında sistemik dolaşıma girer.', ar: 'لا يوجد طور امتصاص؛ تدخل الجرعة مباشرة للدم.', en: 'No absorption phase required; instantaneous 100% systemic entry.' },
        params: { dose: 500, bioavailability: 1.0, ka: 99, kel: 0.1 },
        variant: 'blue',
      },
    ],
    missions: [
      {
        id: 'mission-calibrate-f',
        title: { tr: 'Görev: Oral Dozu Biyoyararlanıma Göre Ayarlayın', ar: 'المهمة: معايرة الجرعة الفموية وفق التوافر الحيوي', en: 'Mission: Calibrate Dose for Bioavailability' },
        instruction: {
          tr: 'Biyoyararlanımı %50 olan bir ilaçta sistemik maruziyeti korumak için dozu 1000 mg a yükseltin.',
          ar: 'ارفع الجرعة الفموية إلى 1000 mg لتعويض نقص التوافر الحيوي (50%) ومطابقة تركيز الدم المستهدف.',
          en: 'Double oral dose to 1000 mg to compensate for 50% bioavailability.',
        },
        hint: { tr: 'Sistemik Doz = Uygulanan Doz x F formülü geçerlidir.', ar: 'الجرعة الجهازية = الجرعة المعطاة × F.', en: 'Systemic payload equals Dose multiplied by F.' },
        rewardXP: 25,
        successMessage: { tr: 'Harika! Doz ayarlamasıyla hedef AUC ve plazma konsantrasyonu sağlandı.', ar: 'ممتاز! تم ضبط الجرعة بنجاح وتحقيق التركيز المستهدف.', en: 'Success! Dose adjusted to achieve equivalent target AUC.' },
        validator: (params) => Number(params?.dose || 0) >= 800 || Number(params?.bioavailability || 0) >= 0.8,
      },
    ],
    evaluateHud: (params, locale) => {
      const f = Number(params?.bioavailability || 0.8);
      return {
        stateLabel: f >= 0.8 ? (locale === 'tr' ? 'Yüksek Biyoyararlanım' : locale === 'ar' ? 'توافر حيوي مرتفع' : 'High Bioavailability') : (locale === 'tr' ? 'Orta/Düşük Biyoyararlanım' : locale === 'ar' ? 'توافر حيوي منخفض' : 'Low Bioavailability'),
        stateColor: f >= 0.8 ? 'green' : 'amber',
        valueDisplay: `F = %${Math.round(f * 100)}`,
        analysis:
          locale === 'tr'
            ? 'Plazma konsantrasyon-zaman eğrisi altındaki alan (AUC) sistemik maruziyeti doğrular.'
            : locale === 'ar'
            ? 'المساحة تحت المنحنى (AUC) تدل على التعرض الجهازي الفعال للدواء.'
            : 'Area Under the Curve (AUC) demonstrates adequate systemic drug exposure.',
      };
    },
  },

  // Lesson 16 (Pharm 6): Uygulama Yolları ve Emilim Hızı
  'pharm-mod3-les2': {
    lessonId: 'pharm-mod3-les2',
    course: 'pharmacology',
    widgetType: 'PkSimulator',
    defaultParams: { route: 'sublingual', ka: 3.0, tmax: 0.25 },
    facultySource: {
      instructor: 'Dr. Meryem Aras',
      courseName: 'ECZ 305 Farmakoloji-I (Marmara Üniversitesi)',
      deck: 'Farmakokinetik-Absorpsiyon 21.09.pptx',
      slides: 'Slayt 36–60 (Oral, Dil Altı, İntramüsküler, Rektal, Transdermal Uygulama Yolları)',
    },
    howItWorks: {
      title: {
        tr: 'İlaç Uygulama Yolları ve Emilim Hızları Nasıl Çalışır?',
        ar: 'كيف تعمل طرق إعطاء الدواء وسرعات الامتصاص؟',
        en: 'How Do Administration Routes & Absorption Rates Work?',
      },
      summary: {
        tr: 'Uygulama yolu ilacın etki başlama hızını ve karaciğer ilk geçiş metabolizmasını belirler. Dil altı (sublingual) uygulama hepatik ilk geçişi tamamen atlayarak dakikalar içinde kanda pik yapar.',
        ar: 'طريقة الإعطاء تحدد سرعة بدء التأثير وتجاوز أيض الكبد الأول (مثل النتروغليسرين تحت اللسان لعلاج الذبحة).',
        en: 'The route of administration dictates onset kinetics and presystemic clearance. Sublingual route bypasses portal circulation directly into SVC.',
      },
      coreFormula: 'T_{\\\\max} = \\\\frac{\\\\ln(k_a / k_{el})}{k_a - k_{el}}',
      takeaways: [
        {
          title: { tr: '1. Dil Altı Nitrogliserin (Acil Angina)', ar: '1. النتروغليسرين تحت اللسان للذبحة الصدرية', en: '1. Sublingual Nitroglycerin Emergency' },
          body: {
            tr: 'Dil altı venöz pleksus superior vena kavaya drene olarak karaciğer ilk geçiş metabolizmasını (%90 yıkım) engeller; kriz anında 1-2 dakikada etki başlar.',
            ar: 'الامتصاص تحت اللسان يتجاوز الكبد تماماً ويؤمن بدء تأثير فوري خلال دقيقة إلى دقيقتين.',
            en: 'Direct venous drainage into the superior vena cava circumvents 90% hepatic first-pass destruction.',
          },
        },
      ],
    },
    presets: [
      {
        id: 'sublingual-route',
        label: { tr: 'Dil Altı (Hızlı Başlama, İlk Geçiş By-pass)', ar: 'تحت اللسان (تأثير فوري وتجاوز الكبد)', en: 'Sublingual (Rapid Onset, Hepatic Bypass)' },
        badge: { tr: 'Tmax = 2 dk', ar: 'Tmax = دقيقتان', en: 'Tmax = 2 min' },
        description: { tr: 'Hepatik portal sistemi atlayarak anında kardiyovasküler etki sağlar.', ar: 'تجاوز الدورة البابية وتأثير قلبي وعائي فوري.', en: 'Bypasses portal circulation delivering immediate vascular relief.' },
        params: { route: 'sublingual', ka: 5.0, tmax: 0.05 },
        variant: 'green',
      },
    ],
    missions: [
      {
        id: 'mission-fast-onset',
        title: { tr: 'Görev: Tmax ı 15 Dakikanın Altına İndirin', ar: 'المهمة: تقليل زمن الوصول للذروة Tmax دون 15 دقيقة', en: 'Mission: Achieve Tmax Under 15 Minutes' },
        instruction: {
          tr: 'Uygulama yolunu dil altı veya IV olarak seçerek hızlı emilimi doğrulayın.',
          ar: 'اختر طريقة الإعطاء تحت اللسان للوصول للتركيز الفعال في أقل من ربع ساعة.',
          en: 'Select sublingual or IV mode to achieve rapid therapeutic onset under 15 minutes.',
        },
        hint: { tr: 'Oral katı dozaj formlarında mide boşalması ve çözünme Tmax ı uzatır.', ar: 'الحبوب الفموية تتأخر بسبب إفراغ المعدة.', en: 'Oral tablets face gastric emptying lag phases.' },
        rewardXP: 25,
        successMessage: { tr: 'Mükemmel! Hızlı başlangıçlı Tmax doğrulandı.', ar: 'ممتاز! تحقق زمن الوصول السريع للذروة.', en: 'Success! Rapid Tmax achieved bypassing presystemic delay.' },
        validator: (params) => params?.route === 'sublingual' || Number(params?.ka || 0) >= 3.0,
      },
    ],
    evaluateHud: (_params, locale) => ({
      stateLabel: locale === 'tr' ? 'Hızlı Başlangıçlı Emilim' : locale === 'ar' ? 'امتصاص فائق السرعة' : 'Rapid Onset Kinetics',
      stateColor: 'green',
      valueDisplay: 'Tmax < 15 dk',
      analysis:
        locale === 'tr'
          ? 'İlk geçiş hepatik eliminasyonu by-pass edildi. Sistemik tepe konsantrasyonuna acil müdahale hızında ulaşıldı.'
          : locale === 'ar'
          ? 'تم تجاوز أيض العبور الكبدي بنجاح والوصول لقمة التركيز بسرعة إسعافية.'
          : 'Presystemic clearance averted with emergency-grade Tmax attainment.',
    }),
  },

  // Lesson 17 (Pharm 7): Dağılım Hacmi (Vd) & Plazma Proteinlerine Bağlanma
  'pharm-mod4-les1': {
    lessonId: 'pharm-mod4-les1',
    course: 'pharmacology',
    widgetType: 'PkSimulator',
    defaultParams: { dose: 500, vd: 42, fu: 0.1 },
    facultySource: {
      instructor: 'Dr. Meryem Aras',
      courseName: 'ECZ 305 Farmakoloji-I (Marmara Üniversitesi)',
      deck: 'Farmakokinetik-Dağılım-Metabolizma (1).pdf',
      slides: 'Slayt 1–28 (Dağılım Hacmi Vd, Albumin Bağlanması, Serbest Fraksiyon fu, Doku Tutulumu)',
    },
    howItWorks: {
      title: {
        tr: 'Dağılım Hacmi (Vd) ve Protein Bağlanması Nasıl Çalışır?',
        ar: 'كيف يعمل حجم التوزع الظاهري (Vd) والارتباط ببروتينات البلازما؟',
        en: 'How Does Apparent Volume of Distribution (Vd) & Protein Binding Work?',
      },
      summary: {
        tr: 'Dağılım Hacmi (Vd), vücuttaki toplam ilaç miktarını plazma konsantrasyonuna bağlayan teorik bir orantı katsayısıdır. Yüksek Vd (> 50 L), ilacın dokulara ve yağlara yoğun geçtiğini; düşük Vd (< 5 L) ise ilacın plazma proteinlerine bağlı kalarak damar içinde hapsolduğunu gösterir.',
        ar: 'حجم التوزع (Vd) يعبر عن مدى انتشار الدواء بالأنسجة مقارنة بالدم. Vd المرتفع يعني تركز الدواء بالأنسجة والدهون، بينما Vd المنخفض يعني بقاءه في البلازما.',
        en: 'Apparent Volume of Distribution (Vd) relates total drug body payload to measured plasma concentration.',
      },
      coreFormula: 'V_d = \\\\frac{\\\\text{Doz}}{C_0} = V_p + V_t \\\\times \\\\frac{f_u}{f_{ut}}',
      takeaways: [
        {
          title: { tr: '1. Serbest İlaç Hipotezi (Free Drug)', ar: '1. فرضية الدواء الحر الفعال', en: '1. Free Drug Hypothesis' },
          body: {
            tr: 'Yalnızca plazma proteinlerine bağlanmamış serbest fraksiyon (fu) zarları geçebilir, reseptöre bağlanabilir ve metabolize edilebilir.',
            ar: 'الجزء الحر غير المرتبط بالبروتينات (fu) هو الوحيد القادر على عبور الأغشية وتفعيل المستقبلات.',
            en: 'Only the unbound free fraction (fu) permeates membranes, exerts therapeutic effects, and undergoes clearance.',
          },
        },
      ],
    },
    presets: [
      {
        id: 'high-vd-tissue',
        label: { tr: 'Yüksek Doku Tutulumu (Klorokin Modeli, Vd > 500 L)', ar: 'انتشار نسيجي هائل (الكلوروكين)', en: 'Extensive Tissue Sequestration (Chloroquine, Vd > 500 L)' },
        badge: { tr: 'Vd = 1000 L', ar: 'Vd = 1000 L', en: 'Vd = 1000 L' },
        description: { tr: 'Hücre içi organellerde ve lipid dokularda devasa tutulum.', ar: 'تراكم كبير في الدهون والأنسجة العميقة.', en: 'Extreme cellular trapping yielding massive apparent volume.' },
        params: { dose: 500, vd: 1000, fu: 0.5 },
        variant: 'blue',
      },
    ],
    missions: [
      {
        id: 'mission-vd-displacement',
        title: { tr: 'Görev: Serbest Fraksiyonu (fu) İki Katına Çıkarın', ar: 'المهمة: مضاعفة الجزء الحر غير المرتبط من الدواء', en: 'Mission: Double Free Drug Fraction (fu)' },
        instruction: {
          tr: 'Plazma protein bağlanma yarışmasını simüle ederek serbest fraksiyonu (fu) artırın.',
          ar: 'حاكي إزاحة الدواء من الألبومين لرفع الجزء الفعال.',
          en: 'Simulate albumin displacement to elevate active free fraction fu.',
        },
        hint: { tr: 'Warfarin gibi %99 bağlanan ilaçlarda %1 lik ayrılma serbest fraksiyonu ikiye katlar.', ar: 'في الأدوية المرتبطة بنسبة 99% فإن تحرير 1% يضاعف التأثير.', en: 'In 99% bound drugs, 1% displacement doubles toxicity.' },
        rewardXP: 25,
        successMessage: { tr: 'Başarılı! Serbest fraksiyon artırıldı; aktif doku difüzyonu hızlandı.', ar: 'ناجح! تضاعف الدواء الحر وتسارع النفوذ النسيجي.', en: 'Success! Active free fraction augmented driving tissue penetration.' },
        validator: (params) => Number(params?.fu || 0) >= 0.15 || Number(params?.vd || 0) >= 100,
      },
    ],
    evaluateHud: (params, locale) => {
      const vd = Number(params?.vd || 42);
      return {
        stateLabel: vd > 100 ? (locale === 'tr' ? 'Geniş Doku Dağılımı' : locale === 'ar' ? 'توزع نسيجي عميق' : 'Extensive Tissue Distribution') : (locale === 'tr' ? 'Vasküler Sınırlı Dağılım' : locale === 'ar' ? 'محدود في البلازما' : 'Vascular Confined'),
        stateColor: vd > 100 ? 'blue' : 'green',
        valueDisplay: `Vd = ${vd} L`,
        analysis:
          locale === 'tr'
            ? 'İlaç vücut su kompartmanlarına ve derin dokulara penetre olmuştur.'
            : locale === 'ar'
            ? 'ينتشر الدواء في سوائل الجسم والأنسجة الدهنية العميقة.'
            : 'Extensive cellular uptake beyond vascular space.',
      };
    },
  },

  // Lesson 18 (Pharm 8): Kan-Beyin Bariyeri ve Lipofilisite
  'pharm-mod4-les2': {
    lessonId: 'pharm-mod4-les2',
    course: 'pharmacology',
    widgetType: 'MembranePartitionSimulator',
    defaultParams: { logP: 2.8, mw: 320, psa: 55 },
    facultySource: {
      instructor: 'Dr. Meryem Aras',
      courseName: 'ECZ 305 Farmakoloji-I (Marmara Üniversitesi)',
      deck: 'Farmakokinetik-Dağılım-Metabolizma (1).pdf',
      slides: 'Slayt 29–50 (Kan-Beyin Bariyeri, Astrosit Ayakçıkları, Sıkı Bağlantılar, P-glikoprotein)',
    },
    howItWorks: {
      title: {
        tr: 'Kan-Beyin Bariyeri (KBB) ve Santral Geçirgenlik Nasıl Çalışır?',
        ar: 'كيف يعمل الحاجز الدموي الدماغي والنفوذ العصبي المركزي؟',
        en: 'How Does Blood-Brain Barrier (BBB) Permeability Work?',
      },
      summary: {
        tr: 'Beyin kapillerleri sıkı bağlantılarla (tight junctions) mühürlenmiştir ve fenestrasyon içermez. Santral sinir sistemine geçiş için molekülün düşük polar yüzey alanına (PSA < 90 Å²), uygun lipofilisiteye (logP 1.5 - 3.5) ve düşük molekül ağırlığına (MW < 450 Da) sahip olması gerekir.',
        ar: 'الشعيرات الدماغية محكمة بروابط سادة وتفتقر للثقوب. لنفوذ الدواء للدماغ يشترط أن يكون ذو مساحة سطحية قطبية منخفضة (PSA < 90 Å²) وألفة دهنية كافية.',
        en: 'Brain capillaries feature tight junctions devoid of fenestrations. CNS penetration requires low polar surface area (PSA < 90 Å²) and logP 1.5 - 3.5.',
      },
      coreFormula: '\\\\text{KBB Penetrasyonu} \\\\propto \\\\frac{\\\\log P}{\\\\sqrt{MW} \\\\times PSA} \\\\quad (\\text{Lipinski CNS Kuralı})',
      takeaways: [
        {
          title: { tr: '1. P-Glikoprotein Efluks Pompası', ar: '1. مضخة الطرد P-glycoprotein', en: '1. P-glycoprotein Efflux Pump' },
          body: {
            tr: 'Lipofilik olsa bile P-gp substratı olan ilaçlar endotel hücrelerinden lümene geri pompalanarak beyinden dışlanır (örn. Loperamid).',
            ar: 'مضخة P-gp تطرد بعض الأدوية الدهنية خارج الدماغ وتعيدها للدم (مثل اللوبيراميد).',
            en: 'Active P-gp efflux transports substrates out of endothelial cells back into blood, restricting CNS exposure.',
          },
        },
      ],
    },
    presets: [
      {
        id: 'cns-penetrant',
        label: { tr: 'Santral Etkili İlaç (Diazepam Modeli, KBB+)', ar: 'دواء عصبي نافذ للمخ (نموذج الديازيبام)', en: 'CNS Active (Diazepam Model, BBB+)' },
        badge: { tr: 'KBB Geçişi: Yüksek', ar: 'نفوذ مرتفع', en: 'High BBB Flux' },
        description: { tr: 'Düşük PSA ve yüksek lipofilisite ile saniyeler içinde kan-beyin bariyerini aşar.', ar: 'يعبر الحاجز الدماغي خلال ثوانٍ لألفة دهنية مثالية.', en: 'Crosses BBB rapidly within seconds.' },
        params: { logP: 2.8, mw: 284, psa: 32 },
        variant: 'green',
      },
    ],
    missions: [
      {
        id: 'mission-cross-bbb',
        title: { tr: 'Görev: KBB Geçirgenlik Kriterlerini Karşılayın', ar: 'المهمة: استيفاء شروط نفوذ الحاجز الدموي الدماغي', en: 'Mission: Meet CNS Permeability Criteria' },
        instruction: {
          tr: 'Polar yüzey alanını 70 Å² nin altına düşürerek KBB geçirgenlik durumunu yeşile çevirin.',
          ar: 'اخفض المساحة السطحية القطبية دون 70 Å² للسماح بالنفوذ للدماغ.',
          en: 'Lower Polar Surface Area below 70 Å² to achieve high CNS permeability.',
        },
        hint: { tr: 'PSA < 90 Å² beyin kapiller endotelini aşmak için altın kuraldır.', ar: 'PSA دون 90 أنغستروم هو القاعدة الذهبية لنفوذ الدماغ.', en: 'PSA under 90 Å² is critical for passive transcellular CNS entry.' },
        rewardXP: 25,
        successMessage: { tr: 'Harika! KBB geçirgenlik eşiği aşıldı. İlaç beyin parankimine başarıyla difüze oldu.', ar: 'ممتاز! تم اجتياز الحاجز الدموي الدماغي بنجاح.', en: 'Success! BBB permeability achieved into brain parenchyma.' },
        validator: (params) => Number(params?.psa || 55) <= 70 || Number(params?.logP || 0) >= 2.0,
      },
    ],
    evaluateHud: (_params, locale) => ({
      stateLabel: locale === 'tr' ? 'Yüksek KBB Penetrasyonu' : locale === 'ar' ? 'نفوذية دماغية عالية' : 'High BBB Penetration',
      stateColor: 'green',
      valueDisplay: 'PSA < 70 Å² • logP ≈ 2.8',
      analysis:
        locale === 'tr'
          ? 'Molekül beyin kapiller endotelindeki sıkı bağlantıları pasif transselüler difüzyonla aşar.'
          : locale === 'ar'
          ? 'يعبر الدواء الروابط المحكمة للشعيرات الدماغية بالانتشار السلبي المباشر.'
          : 'Favourable physicochemical profile satisfies Lipinski CNS guidelines for transcellular diffusion.',
    }),
  },

  // Lesson 19 (Pharm 9): Klerens (CL) & Yarılanma Ömrü (t1/2)
  'pharm-mod5-les1': {
    lessonId: 'pharm-mod5-les1',
    course: 'pharmacology',
    widgetType: 'PkSimulator',
    defaultParams: { clearance: 4.5, vd: 45, halfLife: 6.93 },
    facultySource: {
      instructor: 'Dr. Meryem Aras',
      courseName: 'ECZ 305 Farmakoloji-I (Marmara Üniversitesi)',
      deck: 'Farmakokinetik-Dağılım-Metabolizma (1).pdf',
      slides: 'Slayt 51–75 (Eliminasyon Kinetiği, Klerens CL, Yarılanma Ömrü t1/2, Birinci Derece Kinetik)',
    },
    howItWorks: {
      title: {
        tr: 'Klerens (CL) ve Yarılanma Ömrü (t1/2) Nasıl Çalışır?',
        ar: 'كيف يعمل التصفية الحيوية (Clearance) ونصف العمر الحيوي (t1/2)؟',
        en: 'How Does Clearance (CL) & Half-Life (t1/2) Work?',
      },
      summary: {
        tr: 'Klerens (CL), birim zamanda kandan ilaçtan tamamen temizlenen sanal plazma hacmidir (L/saat). Yarılanma ömrü (t1/2) ise plazma konsantrasyonunun yarıya inmesi için geçen süredir ve Vd ile CL arasındaki dengeden doğar.',
        ar: 'التصفية (CL) هي حجم البلازما الذي ينقى تماماً من الدواء في وحدة الزمن. ونصف العمر (t1/2) هو الزمن اللازم لانخفاض تركيز الدواء إلى النصف.',
        en: 'Clearance (CL) is the volume of plasma completely cleared of drug per unit time. Half-life (t1/2) is governed by the ratio of Vd to CL.',
      },
      coreFormula: 't_{1/2} = \\\\frac{0.693 \\\\times V_d}{CL}',
      takeaways: [
        {
          title: { tr: '1. Birinci Derece Eliminasyon', ar: '1. حركية الإطراح من الرتبة الأولى', en: '1. First-Order Elimination' },
          body: {
            tr: 'Klinik ilaçların çoğunda birim zamanda atılan ilaç miktarı plazma konsantrasyonuyla doğru orantılıdır (sabit fraksiyon atılır).',
            ar: 'في معظم الأدوية يتناسب معدل الإطراح طردياً مع تركيز الدواء في الدم (تطرح نسبة ثابتة).',
            en: 'Constant fraction of drug is eliminated per unit time proportional to plasma concentration.',
          },
        },
      ],
    },
    presets: [
      {
        id: 'standard-elimination',
        label: { tr: 'Normal Renal/Hepatik Eliminasyon (t1/2 ≈ 7 saat)', ar: 'إطراح قياسي طبيعي (t1/2 ≈ 7 ساعات)', en: 'Standard Elimination (t1/2 ≈ 7 hrs)' },
        badge: { tr: 't1/2 = 6.9 h', ar: 't1/2 = 6.9 h', en: 't1/2 = 6.9 h' },
        description: { tr: 'Günde 2 kez (b.i.d.) dozlama rejimine uygun standart yarılanma ömrü.', ar: 'مناسب لجرعتين يومياً.', en: 'Optimal profile for twice-daily dosing.' },
        params: { clearance: 4.5, vd: 45, halfLife: 6.93 },
        variant: 'green',
      },
    ],
    missions: [
      {
        id: 'mission-double-halflife',
        title: { tr: 'Görev: Klerensi Yarıya İndirerek t1/2 yi İki Katına Çıkarın', ar: 'المهمة: مضاعفة نصف العمر بخفض التصفية للنصف', en: 'Mission: Double t1/2 by Halving Clearance' },
        instruction: {
          tr: 'Renal yetmezlik simülasyonu için klerensi 4.5 L/saatten 2.25 L/saate indirin ve t1/2 nin 14 saate uzadığını görün.',
          ar: 'اخفض التصفية لمحاكاة القصور الكلوي ولاحظ تضاعف نصف العمر.',
          en: 'Simulate renal impairment by halving clearance from 4.5 to 2.25 L/h, doubling t1/2.',
        },
        hint: { tr: 't1/2 = 0.693 x Vd / CL ters orantılıdır.', ar: 'نصف العمر يتناسب عكساً مع التصفية.', en: 'Half-life is inversely proportional to clearance.' },
        rewardXP: 25,
        successMessage: { tr: 'Tebrikler! Klerens azaldı ve eliminasyon yarılanma ömrü iki katına uzadı.', ar: 'تهانينا! تضاعف نصف العمر نتيجة انخفاض التصفية.', en: 'Success! Clearance reduced and half-life doubled accordingly.' },
        validator: (params) => Number(params?.clearance || 4.5) <= 2.5,
      },
    ],
    evaluateHud: (params, locale) => {
      const cl = Number(params?.clearance || 4.5);
      const vd = Number(params?.vd || 45);
      const tHalf = (0.693 * vd) / (cl || 1);
      return {
        stateLabel: locale === 'tr' ? 'Eliminasyon Kinetiği' : locale === 'ar' ? 'حركية الإطراح' : 'Elimination Kinetics',
        stateColor: 'green',
        valueDisplay: `t1/2 = ${tHalf.toFixed(1)} saat`,
        analysis:
          locale === 'tr'
            ? `Vücuttan %97 eliminasyon yaklaşık 5 yarılanma ömründe (${(tHalf * 5).toFixed(1)} saat) tamamlanır.`
            : locale === 'ar'
            ? `يتم التخلص من 97% من الدواء خلال 5 أنصاف أعمار (${(tHalf * 5).toFixed(1)} ساعة).`
            : `97% systemic elimination achieved after 5 half-lives (${(tHalf * 5).toFixed(1)} hours).`,
      };
    },
  },

  // Lesson 20 (Pharm 10): Çoklu Dozaj ve Kararlı Durum Konsantrasyonu (Css)
  'pharm-mod5-les2': {
    lessonId: 'pharm-mod5-les2',
    course: 'pharmacology',
    widgetType: 'PkSimulator',
    defaultParams: { doseRate: 100, interval: 8, clearance: 4.0, css: 25 },
    facultySource: {
      instructor: 'Dr. Meryem Aras',
      courseName: 'ECZ 305 Farmakoloji-I (Marmara Üniversitesi)',
      deck: 'Farmakokinetik-Dağılım-Metabolizma (1).pdf',
      slides: 'Slayt 76–100 (Çoklu Dozlama, Kararlı Durum Konsantrasyonu Css, Akümülasyon, Yükleme Dozu)',
    },
    howItWorks: {
      title: {
        tr: 'Kararlı Durum Konsantrasyonu (Css) Nasıl Çalışır?',
        ar: 'كيف يعمل تركيز الحالة المستقرة (Steady-State Concentration Css)؟',
        en: 'How Does Steady-State Concentration (Css) Work?',
      },
      summary: {
        tr: 'Düzenli aralıklarla tekrarlanan dozlarda, birim zamanda vücuda giren ilaç hızı ile atılan ilaç hızı eşitlendiğinde kararlı durum konsantrasyonuna (Css) ulaşılır. Kararlı duruma ulaşmak ilacın yarılanma ömrünün yaklaşık 4-5 katı sürer.',
        ar: 'عند تكرار الجرعات بانتظام يتساوى معدل دخول الدواء مع معدل طرحه لنصل إلى الحالة المستقرة (Css). يتطلب الوصول إليها زمناً يعادل 4-5 أنصاف أعمار.',
        en: 'Steady-state (Css) is achieved when dosing rate equals elimination rate, reached after 4 to 5 elimination half-lives.',
      },
      coreFormula: 'C_{ss} = \\\\frac{F \\\\times \\\\text{Doz}}{CL \\\\times \\\\tau} \\\\quad \\\\text{ve Yükleme Dozu} = C_{ss} \\\\times V_d',
      takeaways: [
        {
          title: { tr: '1. Yükleme Dozu (Loading Dose)', ar: '1. الجرعة التحميلية (Loading Dose)', en: '1. Loading Dose Rationale' },
          body: {
            tr: 'Uzun yarılanma ömrüne sahip ilaçlarda (amiodaron, digoksin) 4-5 gün beklememek için tek seferlik yüksek bir yükleme dozuyla Css derhal yakalanır.',
            ar: 'في الأدوية ذات نصف العمر الطويل تعطى جرعة تحميلية فورية للوصول إلى Css دون انتظار أيام.',
            en: 'In drugs with long half-lives, a loading dose instantaneously achieves therapeutic Css without waiting 4-5 half-lives.',
          },
        },
      ],
    },
    presets: [
      {
        id: 'steady-state-optimal',
        label: { tr: 'Optimal Terapötik Kararlı Durum (Css = 25 mg/L)', ar: 'حالة مستقرة مثالية (Css = 25 mg/L)', en: 'Optimal Steady State (Css = 25 mg/L)' },
        badge: { tr: 'Css = 25 mg/L', ar: 'Css = 25', en: 'Css = 25' },
        description: { tr: 'Terapötik pencerenin tam ortasında stabil kararlı durum düzeyi.', ar: 'تركيز مستقر في منتصف النافذة العلاجية.', en: 'Stable plateau concentration targeted within the therapeutic window.' },
        params: { doseRate: 100, interval: 8, clearance: 4.0, css: 25 },
        variant: 'green',
      },
    ],
    missions: [
      {
        id: 'mission-reach-target-css',
        title: { tr: 'Görev: Hedef Css Seviyesini Yakalayın', ar: 'المهمة: الوصول لتركيز الحالة المستقرة المستهدف', en: 'Mission: Achieve Target Css Plateau' },
        instruction: {
          tr: 'Doz hızını ve aralığını (tau) ayarlayarak Css değerini 20 - 30 mg/L aralığında stabilize edin.',
          ar: 'اضبط معدل الجرعة وفترة التكرار لتثبيت التركيز المستقر بين 20 و30 mg/L.',
          en: 'Adjust dosing rate and interval to stabilize Css between 20 and 30 mg/L.',
        },
        hint: { tr: 'Css = Doz Hızı / CL formülünü uygulayın.', ar: 'تطبق معادلة Css = معدل الجرعة / التصفية.', en: 'Css equals dosing rate divided by clearance.' },
        rewardXP: 25,
        successMessage: { tr: 'Harika! Kararlı durum konsantrasyonu terapötik pencere içinde stabilize edildi.', ar: 'ممتاز! تم تثبيت تركيز الحالة المستقرة ضمن النافذة العلاجية.', en: 'Success! Steady-state plateau achieved within the target window.' },
        validator: (params) => Number(params?.css || 25) >= 20 && Number(params?.css || 25) <= 30,
      },
    ],
    evaluateHud: (_params, locale) => ({
      stateLabel: locale === 'tr' ? 'Kararlı Durum Platosu (Css)' : locale === 'ar' ? 'هضبة الحالة المستقرة (Css)' : 'Steady-State Plateau',
      stateColor: 'green',
      valueDisplay: 'Giriş Hızı = Çıkış Hızı',
      analysis:
        locale === 'tr'
          ? 'İlaç birikimi tamamlandı. İnfüzyon hızı eliminasyon hızına tam olarak eşitlenmiştir.'
          : locale === 'ar'
          ? 'اكتمل تراكم الدواء وأصبح معدل الدخول مساوياً تماماً لمعدل الإطراح.'
          : 'Zero net accumulation: input rate perfectly matches instantaneous elimination rate.',
    }),
  },

  // Lesson 21 (Pharm 11): Hepatik Ekstraksiyon Oranı ve İlk Geçiş Etkisi
  'pharm-mod6-les1': {
    lessonId: 'pharm-mod6-les1',
    course: 'pharmacology',
    widgetType: 'PkSimulator',
    defaultParams: { er: 0.85, hepaticBloodFlow: 1.5, intrinsicClearance: 8.5 },
    facultySource: {
      instructor: 'Dr. Meryem Aras',
      courseName: 'ECZ 305 Farmakoloji-I (Marmara Üniversitesi)',
      deck: 'Farmakokinetik-Dağılım-Metabolizma (1).pdf',
      slides: 'Slayt 101–125 (Hepatik Klerens, Ekstraksiyon Oranı ER, Kan Akımına Bağımlılık, Propranolol vs Varfarin)',
    },
    howItWorks: {
      title: {
        tr: 'Hepatik Ekstraksiyon Oranı (ER) Nasıl Çalışır?',
        ar: 'كيف يعمل معدل الاستخلاص الكبدي (Hepatic Extraction Ratio ER)؟',
        en: 'How Does Hepatic Extraction Ratio (ER) Work?',
      },
      summary: {
        tr: 'Hepatik Ekstraksiyon Oranı (ER), karaciğere giren kandan tek bir geçişte temizlenen ilaç kesridir (0 ile 1 arası). Yüksek ER (> 0.7) ilaçlarda (propranolol, morfin, lidokain) klerens karaciğer kan akımına bağımlıdır ve belirgin ilk geçiş eliminasyonu yaşanır.',
        ar: 'معدل الاستخلاص الكبدي (ER) يحدد نسبة الدواء المنقاة في عبور واحد عبر الكبد. الأدوية ذات ER العالي (> 0.7) تعتمد تصفيتها على تدفق دم الكبد وتتعرض لأيض عبور أول شديد.',
        en: 'Hepatic Extraction Ratio (ER) defines the fraction of drug removed during a single transhepatic passage. High ER (> 0.7) drugs are blood-flow limited.',
      },
      coreFormula: 'ER = \\\\frac{C_{\\\\text{in}} - C_{\\\\text{out}}}{C_{\\\\text{in}}} \\\\quad \\\\text{ve} \\\\quad CL_H = Q \\\\times ER',
      takeaways: [
        {
          title: { tr: '1. Akıma Bağımlı vs Kapasiteye Bağımlı', ar: '1. تصفية معتمدة على التدفق مقابل الإنزيمات', en: '1. Flow-Limited vs Capacity-Limited' },
          body: {
            tr: 'Yüksek ER li ilaçların klerensi karaciğer kan akımına (Q) bağlıyken; düşük ER li ilaçlarda (varfarin) klerens intrinsik enzim aktivitesine ve protein bağlanmasına bağlıdır.',
            ar: 'تصفية الأدوية ذات ER العالي ترتبط بتدفق دم الكبد، بينما ذات ER المنخفض تعتمد على نشاط إنزيمات الكبد.',
            en: 'High ER clearance depends strictly on hepatic perfusion (Q), while low ER clearance is dictated by intrinsic enzyme activity.',
          },
        },
      ],
    },
    presets: [
      {
        id: 'high-extraction',
        label: { tr: 'Yüksek Ekstraksiyonlu İlaç (Propranolol, ER = 0.85)', ar: 'دواء عالي الاستخلاص الكبدي (بروبرانولول)', en: 'High Extraction Drug (Propranolol, ER = 0.85)' },
        badge: { tr: 'ER = 0.85 • Akıma Bağımlı', ar: 'ER = 0.85', en: 'ER = 0.85' },
        description: { tr: 'Karaciğerden ilk geçişte %85 i metabolize olur; oral biyoyararlanım düşüktür.', ar: 'يؤيض 85% منه في العبور الأول؛ توافره الحيوي الفموي منخفض.', en: '85% presystemic hepatic extraction; perfusion limited.' },
        params: { er: 0.85, hepaticBloodFlow: 1.5 },
        variant: 'red',
      },
    ],
    missions: [
      {
        id: 'mission-hepatic-clearance',
        title: { tr: 'Görev: Yüksek Ekstraksiyon Sınıfını Doğrulayın', ar: 'المهمة: إثبات فئة الاستخلاص الكبدي المرتفع', en: 'Mission: Verify Flow-Limited High ER Class' },
        instruction: {
          tr: 'Simülatörde ekstraksiyon oranını ER > 0.70 üzerine getirerek akıma bağımlı hepatik klerensi gözlemleyin.',
          ar: 'اضبط معدل الاستخلاص الكبدي فوق 0.70 لإثبات الاعتماد على تدفق الدم.',
          en: 'Adjust parameters to achieve ER > 0.70 demonstrating flow-limited clearance.',
        },
        hint: { tr: 'ER > 0.70 yüksek hepatik ekstraksiyon anlamına gelir.', ar: 'ER > 0.70 تعني استخلاصاً كبدياً شديداً.', en: 'ER > 0.70 denotes flow-limited hepatic elimination.' },
        rewardXP: 25,
        successMessage: { tr: 'Tebrikler! Yüksek hepatik ekstraksiyon (ER = 0.85) doğrulandı.', ar: 'تهانينا! تم تأكيد فئة الاستخلاص الكبدي المرتفع بنجاح.', en: 'Verified! Flow-limited hepatic extraction demonstrated.' },
        validator: (params) => Number(params?.er || 0.85) >= 0.7,
      },
    ],
    evaluateHud: (params, locale) => {
      const er = Number(params?.er || 0.85);
      return {
        stateLabel: er >= 0.7 ? (locale === 'tr' ? 'Yüksek Hepatik Ekstraksiyon (Akıma Duyarlı)' : locale === 'ar' ? 'استخلاص كبدي مرتفع' : 'High Extraction (Flow-Limited)') : (locale === 'tr' ? 'Düşük Ekstraksiyon (Kapasiteye Duyarlı)' : locale === 'ar' ? 'استخلاص منخفض' : 'Low Extraction'),
        stateColor: er >= 0.7 ? 'amber' : 'blue',
        valueDisplay: `ER = ${er.toFixed(2)}`,
        analysis:
          locale === 'tr'
            ? 'İlk geçişte yüksek metabolizma. Karaciğer kan akımındaki değişiklikler klerensi doğrudan etkiler.'
            : locale === 'ar'
            ? 'أيض عبور أول شديد. أي تغير في تدفق دم الكبد يغير تصفية الدواء فوراً.'
            : 'Extensive first-pass metabolism; clearance is directly proportional to hepatic blood flow.',
      };
    },
  },

  // Lesson 22 (Pharm 12): Renal İtrah ve Glomerüler Filtrasyon
  'pharm-mod6-les2': {
    lessonId: 'pharm-mod6-les2',
    course: 'pharmacology',
    widgetType: 'PkSimulator',
    defaultParams: { gfr: 125, tubularSecretion: 0, tubularReabsorptionFraction: 0.1 },
    facultySource: {
      instructor: 'Dr. Meryem Aras',
      courseName: 'ECZ 305 Farmakoloji-I (Marmara Üniversitesi)',
      deck: 'Farmakokinetik-Dağılım-Metabolizma (1).pdf',
      slides: 'Slayt 126–150 (Renal Klerens, GFR, Tübüler Sekresyon, pH Bağımlı Geri Emilim)',
    },
    howItWorks: {
      title: {
        tr: 'Renal Eliminasyon ve Glomerüler Filtrasyon Nasıl Çalışır?',
        ar: 'كيف يعمل الإطراح الكلوي والترشيح الكبيبي؟',
        en: 'How Does Renal Elimination & Glomerular Filtration Work?',
      },
      summary: {
        tr: 'Renal klerens üç sürecin toplamıdır: Glomerüler Filtrasyon + Aktif Tübüler Sekresyon - Pasif Tübüler Geri Emilim. Serbest ilaç GFR (120 mL/dk) ile glomerülden filtre olur.',
        ar: 'التصفية الكلوية هي محصلة 3 عمليات: الترشيح الكبيبي + الإفراز الأنبوبي الفعال - إعادة الامتصاص السلبي.',
        en: 'Renal clearance represents the net algebraic sum of Glomerular Filtration + Tubular Secretion - Tubular Reabsorption.',
      },
      coreFormula: 'CL_R = \\\\frac{\\\\text{GFR} \\\\times f_u + \\\\text{Sekresyon} - \\\\text{Geri Emilim}}{C_p}',
      takeaways: [
        {
          title: { tr: '1. Tübüler Sekresyon (Aktif Pompalama)', ar: '1. الإفراز الأنبوبي النشط', en: '1. Active Tubular Secretion' },
          body: {
            tr: 'Renal klerens fu x GFR den büyükse, ilaç proksimal tübüllerdeki organik anyon (OAT) veya katyon (OCT) taşıyıcılarıyla aktif salgılanıyor demektir (örn. Penisilin).',
            ar: 'إذا تجاوزت التصفية الكلوية قيمة GFR فإن الدواء يفرز بفاعلية بواسطة النواقل الأنبوبية.',
            en: 'When renal clearance exceeds fu x GFR, active carrier-mediated tubular secretion is occurring (e.g. penicillin).',
          },
        },
      ],
    },
    presets: [
      {
        id: 'filtration-only',
        label: { tr: 'Sırf Glomerüler Filtrasyon (İnülin Modeli, CLR = GFR)', ar: 'ترشيح كبيبي نقي (نموذج الإنولين)', en: 'Pure Glomerular Filtration (Inulin Model)' },
        badge: { tr: 'CLR = 125 mL/dk', ar: 'CLR = 125', en: 'CLR = 125' },
        description: { tr: 'Ne sekresyon ne geri emilim; doğrudan filtrasyon hızı.', ar: 'لا إفراز ولا امتصاص؛ يمثل سرعة الترشيح الدقيقة.', en: 'Pure filtration marker without secretion or reabsorption.' },
        params: { gfr: 125, tubularSecretion: 0, tubularReabsorptionFraction: 0 },
        variant: 'blue',
      },
    ],
    missions: [
      {
        id: 'mission-renal-clearance',
        title: { tr: 'Görev: Tübüler Sekresyonla Klerensi Artırın', ar: 'المهمة: زيادة التصفية الكلوية بالإفراز الأنبوبي النشط', en: 'Mission: Enhance Clearance via Tubular Secretion' },
        instruction: {
          tr: 'Aktif tübüler sekresyonu devreye sokarak renal klerensin GFR yi (125 mL/dk) aştığını doğrulayın.',
          ar: 'فعل الإفراز الأنبوبي النشط لتتجاوز التصفية الكلوية معدل الترشيح الكبيبي.',
          en: 'Engage active tubular secretion so net renal clearance exceeds GFR (125 mL/min).',
        },
        hint: { tr: 'Aktif sekresyon plazma proteinlerine bağlı ilaçları dahi temizleyebilir.', ar: 'الإفراز النشط قادر على تنقية الأدوية حتى المرتبطة بالبروتينات.', en: 'Active transporters strip drug molecules from albumin carriers.' },
        rewardXP: 25,
        successMessage: { tr: 'Tebrikler! Aktif tübüler sekresyon ile CL_R > GFR kanıtlandı.', ar: 'تهانينا! أثبت الإفراز الأنبوبي النشط تجاوز التصفية لقيمة GFR.', en: 'Success! Active tubular secretion demonstrated with CL_R exceeding GFR.' },
        validator: (params) => Number(params?.gfr || 125) >= 120,
      },
    ],
    evaluateHud: (_params, locale) => ({
      stateLabel: locale === 'tr' ? 'Renal İtrah Aktif' : locale === 'ar' ? 'إطراح كلوي نشط' : 'Active Renal Excretion',
      stateColor: 'green',
      valueDisplay: 'CLR ≥ GFR',
      analysis:
        locale === 'tr'
          ? 'İlaç glomerüler filtrasyon ve aktif tübüler sekresyon ile idrara transfer edilmektedir.'
          : locale === 'ar'
          ? 'يطرح الدواء بالترشيح الكبيبي والإفراز الأنبوبي الفعال إلى البول.'
          : 'Substrate cleared via robust glomerular filtration and tubular transport.',
    }),
  },
};

export function getLessonInteractiveData(lessonId: string): InteractiveLessonMeta {
  if (INTERACTIVE_LESSONS[lessonId]) {
    return INTERACTIVE_LESSONS[lessonId];
  }

  // Fallback for unexpected IDs
  return INTERACTIVE_LESSONS['mc-mod1-les1'];
}
'''

with open(TARGET_TS, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Successfully generated all 22 interactive lessons in {TARGET_TS}")
