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
  'mc-mod1-les1': {
    lessonId: 'mc-mod1-les1',
    course: 'medchem',
    widgetType: 'ThermodynamicActivityFergusonSlider',
    defaultParams: {
      vaporPressureRatio: 0.04,
      targetSubstance: 'ether',
    },
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
        tr: 'Yapısal olarak özgül olmayan bileşikler (genel anestezikler, hipnotikler), biyolojik hedeflerine kilit-anahtar şeklinde bağlanmazlar. Etkileri molekülün kimyasal yapısından bağımsız olup, biyofazdaki bağıl doygunluk oranına (termodinamik aktivitesine) dayanır.',
        ar: 'المركبات غير النوعية بنيوياً (مثل المخدرات العامة والمهدئات) لا ترتبط بالمستقبلات كالقفل والمفتاح، بل يعتمد تأثيرها على درجة تشبعها النسبي في الطور الحيوي (النشاط الديناميكي الحراري).',
        en: 'Structurally non-specific compounds (general anesthetics, volatile hypnotics) do not bind stereoselective receptor pockets. Their biological depression depends exclusively on their relative thermodynamic saturation (a) in the biophase.',
      },
      coreFormula: 'a = \\frac{P_t}{P_0} = \\frac{S_t}{S_0}',
      takeaways: [
        {
          title: {
            tr: '1. Bağıl Doygunluk Kuralı (Relative Saturation)',
            ar: '1. قاعدة التشبع النسبي',
            en: '1. Relative Saturation Rule',
          },
          body: {
            tr: 'Uçucu gazlar ve çözücüler için termodinamik aktivite a = Pt / P0 formülüyle hesaplanır. Kimyasal yapısı tamamen farklı gazlar (eter, azot protoksit, kloroform), yaklaşık aynı a (0.01 – 0.05) değerinde eşit cerrahi anestezi oluşturur.',
            ar: 'للغازات المتطايرة: a = Pt / P0. الغازات المتباينة كيميائياً تولد عمق تخدير متماثل تماماً عند نفس قيمة a (0.01 – 0.05).',
            en: 'For volatile agents: a = Pt / P0. Chemically distinct gases produce identical surgical anesthesia depth at approximately the same relative saturation a (0.01 – 0.05).',
          },
        },
        {
          title: {
            tr: '2. Özgül ve Özgül Olmayan İlaç Ayrımı (Cutoff Eşiği)',
            ar: '2. الحد الفاصل بين الأدوية النوعية وغير النوعية',
            en: '2. Specific vs Non-Specific Cutoff',
          },
          body: {
            tr: 'Yapısal olarak özgül ilaçlar (beta-blokerler, reseptör agonistleri) aşırı seyreltik çözeltilerde (a < 0.001, genellikle 10^-5 ila 10^-8) etki gösterir. Ferguson sınırı (a ≈ 0.01) bu iki büyük farmakolojik sınıfı kesin çizgilerle ayırır.',
            ar: 'الأدوية النوعية (مثل حاصرات بيتا) تعمل عند تراكيز فائقة التخفيف (a < 0.001)، بينما تتطلب الأدوية غير النوعية تشبعاً حيوياً مرتفعاً.',
            en: 'Structurally specific drugs act at extreme thermodynamic dilutions (a < 0.001, often 10^-5 to 10^-8). The Ferguson threshold (a ≈ 0.01) definitively separates these two core pharmacological classes.',
          },
        },
      ],
    },
    presets: [
      {
        id: 'ether-anesthesia',
        label: {
          tr: 'Cerrahi Anestezi (Dietil Eter)',
          ar: 'تخدير جراحي (Diethyl Ether)',
          en: 'Surgical Anesthesia (Diethyl Ether)',
        },
        badge: { tr: 'a = 0.04', ar: 'a = 0.04', en: 'a = 0.04' },
        description: {
          tr: 'Optimum cerrahi narkoz penceresi. Sinir zarı lipidlerinde fiziksel düzensizlik ve hacim genişlemesi.',
          ar: 'نافذة التخدير الجراحي المثالية. اضطراب فيزيائي وتمدد حجمي لدهون الغشاء العصبي.',
          en: 'Optimal surgical anesthetic window. Lateral pressure and volume expansion across neuronal lipid bilayers.',
        },
        params: { vaporPressureRatio: 0.04, targetSubstance: 'ether' },
        variant: 'green',
      },
      {
        id: 'propranolol-receptor',
        label: {
          tr: 'Spesifik Reseptör Blokajı (Propranolol)',
          ar: 'حصار نوعي للمستقبلات (Propranolol)',
          en: 'Specific Receptor Blockade (Propranolol)',
        },
        badge: { tr: 'a < 0.0001', ar: 'a < 0.0001', en: 'a < 0.0001' },
        description: {
          tr: 'Stereo-seçici beta-adrenerjik reseptör cebine yüksek afiniteyle kilitlenme. Biyofazda kütlece doymaya gerek yoktur.',
          ar: 'ارتباط فراغي عالي الألفة بجيب مستقبلات بيتا. لا يتطلب تشبعاً فيزيائياً كتلوي للغشاء.',
          en: 'High-affinity stereoselective fit into beta-adrenergic receptor pocket without requiring macroscopic saturation.',
        },
        params: { vaporPressureRatio: 0.00005, targetSubstance: 'propranolol' },
        variant: 'blue',
      },
      {
        id: 'subthreshold-sedation',
        label: {
          tr: 'Eşik Altı Doz (Etkisiz)',
          ar: 'جرعة دون العتبة (غير فعالة)',
          en: 'Sub-threshold Dose (Inactive)',
        },
        badge: { tr: 'a = 0.003', ar: 'a = 0.003', en: 'a = 0.003' },
        description: {
          tr: 'Zar lipidlerinde kritik doygunluk sağlanamadığından aksiyon potansiyelleri iletilmeye devam eder.',
          ar: 'لم يتحقق التشبع الحرج لدهون الغشاء، وتستمر إشارات الأعصاب في الانتقال الطبيعي.',
          en: 'Critical membrane volume expansion threshold is not met; nerve impulses conduct unimpeded.',
        },
        params: { vaporPressureRatio: 0.003, targetSubstance: 'subthreshold' },
        variant: 'yellow',
      },
      {
        id: 'toxic-saturation',
        label: {
          tr: 'Aşırı Doygunluk (Toksik Bölge)',
          ar: 'تشبع مفرط (منطقة سمية)',
          en: 'Extreme Saturation (Toxic Zone)',
        },
        badge: { tr: 'a = 0.85', ar: 'a = 0.85', en: 'a = 0.85' },
        description: {
          tr: 'Aşırı yüksek buhar basıncı. Membran yapısında lizis ve hücresel çöküş riski.',
          ar: 'ضغط بخار مرتفع جداً. خطر تحلل الغشاء الخلوي وانهيار الوظائف الحيوية.',
          en: 'Excessive vapor pressure ratio risking severe membrane lysis and cellular structural collapse.',
        },
        params: { vaporPressureRatio: 0.85, targetSubstance: 'toxic' },
        variant: 'red',
      },
    ],
    missions: [
      {
        id: 'mission-1-anesthesia-window',
        title: {
          tr: 'Görev 1: Cerrahi Narkoz Eşiğini Yakalayın',
          ar: 'المهمة 1: تحديد عتبة التخدير الجراحي بدقة',
          en: 'Mission 1: Calibrate Surgical Anesthetic Window',
        },
        instruction: {
          tr: 'Simülatördeki kısmi basınç sürgüsünü kullanarak termodinamik aktiviteyi (a) 0.01 ile 0.05 arasındaki hedef cerrahi pencereye getirin.',
          ar: 'اضبط الزالق لمحاذاة النشاط الديناميكي الحراري (a) ضمن نافذة التخدير الجراحي (0.01 إلى 0.05).',
          en: 'Adjust the slider or select presets to bring thermodynamic activity (a) inside the surgical window (0.01 to 0.05).',
        },
        hint: {
          tr: 'Eter için Pt / P0 oranının %3 ile %5 arasında olması cerrahi derinliği sağlar.',
          ar: 'نسبة Pt / P0 بين 3% و5% تحقق عمق التخدير المطلوب.',
          en: 'For volatile ethers, a vapor pressure ratio Pt / P0 between 0.01 and 0.05 establishes anesthesia.',
        },
        rewardXP: 25,
        successMessage: {
          tr: 'Harika! Hedef cerrahi narkoz aralığı (a ≈ 0.04) doğrulandı. Hücre zarlarında kritik hacim genişlemesi sağlandı.',
          ar: 'ممتاز! تم تأكيد نافذة التخدير الجراحي (a ≈ 0.04) وحدوث التمدد الحجمي الحرج للغشاء.',
          en: 'Excellent! Surgical anesthesia window confirmed (a ≈ 0.04). Critical membrane volume expansion achieved.',
        },
        validator: (params) => {
          const val = Number(params?.vaporPressureRatio || 0);
          return val >= 0.01 && val <= 0.05;
        },
      },
      {
        id: 'mission-2-specificity-deduction',
        title: {
          tr: 'Görev 2: Gizemli Bileşiğin Etki Mekanizmasını Belirleyin',
          ar: 'المهمة 2: استنتاج آلية التأثير لمركب مجهول',
          en: 'Mission 2: Deduce Mechanism for Mystery Compound',
        },
        instruction: {
          tr: 'Sentezlenen yeni bir bileşik a = 0.00005 (nanomolar konsantrasyon) seviyesinde biyolojik yanıt veriyor. Bu bileşiğin etki türünü doğrulayın.',
          ar: 'مركب جديد يظهر تأثيراً علاجياً عند تركيز ضئيل جداً (a = 0.00005). حدد نوع آليته الدوائية.',
          en: 'A newly synthesized agent produces pharmacological response at extreme biophasic dilution (a = 0.00005). Confirm its mechanism.',
        },
        hint: {
          tr: 'a < 0.001 eşiği yapısal olarak özgül reseptör bağlanmasının kesin kanıtıdır.',
          ar: 'عتبة a < 0.001 هي البرهان القاطع على الارتباط النوعي بمستقبل.',
          en: 'Thermodynamic activity a < 0.001 proves high-affinity stereoselective receptor binding.',
        },
        rewardXP: 25,
        successMessage: {
          tr: 'Tebrikler! a < 0.001 eşiği kanıtlandı: Bileşik yapısal olarak özgüldür ve stereo-seçici reseptör cebine bağlanır.',
          ar: 'تهانينا! تم إثبات عتبة a < 0.001: المركب نوعي بنيوياً ويرتبط بمستقبل فراغي نوعي.',
          en: 'Confirmed! a < 0.001 proven: The compound is structurally specific and binds a stereoselective receptor pocket.',
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
          stateLabel: locale === 'tr' ? 'Yapısal Olarak Özgül Faz' : locale === 'ar' ? 'طور نوعي بنيوياً (مستقبلات)' : 'Structurally Specific Phase',
          stateColor: 'blue',
          valueDisplay: `a = ${a.toFixed(5)}`,
          analysis:
            locale === 'tr'
              ? 'Molekül mikromolar/nanomolar derişimde hedef reseptör cebine stereo-özgül olarak bağlanır. Kütlece membran doygunluğu gerekmez.'
              : locale === 'ar'
              ? 'يرتبط الجزيء بتركيز نانومولي عالي الألفة بجيب المستقبلات. لا يتطلب تشبعاً فيزيائياً للغشاء.'
              : 'Molecule binds high-affinity stereoselective receptor pockets at nanomolar concentrations. Bulk membrane saturation is not required.',
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
          stateLabel: locale === 'tr' ? 'Derin Depresyon / İleri Sedasyon' : locale === 'ar' ? 'تثبيط عميق / تخدير متقدم' : 'Deep Depression / Sedation',
          stateColor: 'amber',
          valueDisplay: `a = ${a.toFixed(2)}`,
          analysis:
            locale === 'tr'
              ? 'Yüksek doygunluk oranı. Solunum merkezi depresyonu ve uzamış uyanma süresi riski mevcuttur.'
              : locale === 'ar'
              ? 'نسبة تشبع مرتفعة. خطر تثبيط مركز التنفس وتأخر الإفاقة.'
              : 'High saturation ratio with risk of respiratory center depression and delayed recovery.',
        };
      }
      if (a >= 0.5) {
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
      }
      return {
        stateLabel: locale === 'tr' ? 'Eşik Altı (Etkisiz)' : locale === 'ar' ? 'دون العتبة (غير فعال)' : 'Sub-threshold',
        stateColor: 'amber',
        valueDisplay: `a = ${a.toFixed(3)}`,
        analysis:
          locale === 'tr'
            ? 'Bağıl doygunluk cerrahi etki eşiğinin (a < 0.01) altındadır. Biyolojik depresyon oluşmaz.'
            : locale === 'ar'
            ? 'التشبع النسبي دون عتبة التخدير (a < 0.01). لا يحدث أي تأثير بيولوجي ملموس.'
            : 'Thermodynamic activity is below minimum depression threshold (a < 0.01). No anesthesia induced.',
      };
    },
  },

  'mc-mod1-les2': {
    lessonId: 'mc-mod1-les2',
    course: 'medchem',
    widgetType: 'IonizationEquilibriumSlider',
    defaultParams: {
      pH: 7.4,
      pKa: 3.5,
      compoundType: 'acid',
    },
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
        en: 'Biological membranes are hydrophobic lipid bilayers. Passive transcellular permeation requires molecules to exist in their un-ionized (neutral) state. Charged ionized forms remain trapped in the aqueous phase.',
      },
      coreFormula: 'pH = pK_a + \\log\\frac{[A^-]}{[HA]}',
      takeaways: [
        {
          title: {
            tr: '1. Mide ve Bağırsak Ayrımı',
            ar: '1. التمييز بين المعدة والأمعاء',
            en: '1. Gastric vs Intestinal Partitioning',
          },
          body: {
            tr: 'Mide asidik ortamında (pH ~1.5) zayıf asit ilaçlar (Aspirin, pKa ~3.5) ağırlıklı olarak nötr (HA) formda bulunur ve mide mukozasından emilir. Bazik ilaçlar ise midede iyonlaşarak (BH+) emilemez, bağırsakta emilir.',
            ar: 'في المعدة الحامضية (pH 1.5) تكون الأحماض الضعيفة غير متأينة وتمتص بسهولة، بينما القواعد تتأين وتمتص بالأمعاء.',
            en: 'In acidic gastric fluid (pH ~1.5), weak acids exist predominantly as neutral HA and partition across mucosa. Weak bases ionize into BH+ and absorb only in the intestine.',
          },
        },
        {
          title: {
            tr: '2. İyon Tuzağı (Ion Trapping)',
            ar: '2. ظاهرة احتباس الأيونات (Ion Trapping)',
            en: '2. Ion Trapping Mechanism',
          },
          body: {
            tr: 'Membranın iki tarafındaki pH farkı, ilacın bir kompartmanda iyonlaşarak hapsolmasına yol açar. Bu ilke salisilat zehirlenmesinde idrarı alkali yaparak böbrekten atılımı hızlandırmakta kullanılır.',
            ar: 'اختلاف pH على جانبي الغشاء يؤدي إلى احتباس الدواء في طور محدد. يستفاد منه في قلونة البول لعلاج تسمم الأسبرين.',
            en: 'A pH gradient across membranes causes ionized species to become irreversibly trapped. Alkalinizing urine promotes rapid excretion in aspirin poisoning.',
          },
        },
      ],
    },
    presets: [
      {
        id: 'stomach-aspirin',
        label: {
          tr: 'Mide Ortamı (Aspirin Emilimi)',
          ar: 'بيئة المعدة (امتصاص الأسبرين)',
          en: 'Gastric Fluid (Aspirin Absorption)',
        },
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
        label: {
          tr: 'Fizyolojik Plazma (pH 7.4)',
          ar: 'البلازما الفسيولوجية (pH 7.4)',
          en: 'Physiological Plasma (pH 7.4)',
        },
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
        label: {
          tr: 'İdrar Alkalinizasyonu (İyon Tuzağı)',
          ar: 'قلونة البول (احتباس الأيونات)',
          en: 'Urine Alkalinization (Ion Trapping)',
        },
        badge: { tr: 'pH 8.0 • Tedavi', ar: 'pH 8.0 • علاج', en: 'pH 8.0 • Therapy' },
        description: {
          tr: 'Sodyum bikarbonat ile idrar pH sı yükseltilerek asidik ilaç tübüllerde iyonize edilir ve geri emilimi durdurulur.',
          ar: 'رفع حموضة البول بيكربونات الصوديوم يمنع إعادة امتصاص الأسبرين بالكلية.',
          en: 'Alkalinizing urine with sodium bicarbonate forces weak acids into charged A- form, eliminating tubular reabsorption.',
        },
        params: { pH: 8.0, pKa: 3.5, compoundType: 'acid' },
        variant: 'yellow',
      },
    ],
    missions: [
      {
        id: 'mission-gastric-absorption',
        title: {
          tr: 'Görev 1: Mide Emilimini Maksimize Edin',
          ar: 'المهمة 1: تعظيم الامتصاص المعدي للدواء',
          en: 'Mission 1: Maximize Gastric Absorption',
        },
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
};

export function getLessonInteractiveData(lessonId: string): InteractiveLessonMeta {
  if (INTERACTIVE_LESSONS[lessonId]) {
    return INTERACTIVE_LESSONS[lessonId];
  }

  // Fallback template for all other 20 lessons
  const isPharm = lessonId.startsWith('pharm');
  return {
    lessonId,
    course: isPharm ? 'pharmacology' : 'medchem',
    widgetType: isPharm ? 'DoseResponseCurve' : 'SarExplorer',
    defaultParams: {},
    facultySource: {
      instructor: isPharm ? 'Dr. Meryem Aras' : 'Prof. Dr. Bedia Kaymakçıoğlu',
      courseName: isPharm ? 'ECZ 305 Farmakoloji-I (Marmara Üniversitesi)' : 'ECZ 335 Farmasötik Kimya-1 (Marmara Üniversitesi)',
      deck: isPharm ? 'farmakolojiye giriş.pdf' : 'Farmasötik Kimya 1-Giriş.pdf',
      slides: 'Resmi Fakülte Müfredatı ve Biyofiziksel Modeller',
    },
    howItWorks: {
      title: {
        tr: 'Bu Dersin Biyofiziksel ve Farmakolojik Mekanizması',
        ar: 'الآلية الفيزيائية الحيوية والدوائية لهذا الدرس',
        en: 'Biophysical and Pharmacological Mechanism of this Lesson',
      },
      summary: {
        tr: 'Moleküler etkileşimleri anlamak için simülasyon parametrelerini doğrudan deneyimleyin. Sorulara geçmeden önce değişkenlerin yanıt üzerindeki nedensel etkilerini gözlemleyin.',
        ar: 'تفاعل مع متغيرات المحاكاة لفهم السلوك الجزيئي واستيعاب التأثيرات السببية قبل بدء الأسئلة.',
        en: 'Directly manipulate simulation variables to build biophysical intuition before answering concept questions.',
      },
      takeaways: [
        {
          title: {
            tr: '1. Nedensel İlişkiyi Keşfetme',
            ar: '1. استكشاف العلاقة السببية',
            en: '1. Discovering Cause and Effect',
          },
          body: {
            tr: 'Simülatördeki her kontrol parametresi vücuttaki gerçek bir biyofiziksel kuralı temsil eder.',
            ar: 'كل معامل في المحاكاة يمثل قاعدة فيزيائية حيوية حقيقية في الجسم.',
            en: 'Every slider and toggle represents an authentic biophysical mechanism in human physiology.',
          },
        },
      ],
    },
    presets: [
      {
        id: 'standard-reference',
        label: { tr: 'Standart Referans Hali', ar: 'الحالة المرجعية القياسية', en: 'Standard Reference State' },
        badge: { tr: 'Temel Durum', ar: 'الحالة الأساسية', en: 'Baseline' },
        description: {
          tr: 'Müfredatta tanımlanan standart fizyolojik veya kimyasal başlangıç koşulları.',
          ar: 'الظروف الفسيولوجية أو الكيميائية المعيارية المعتمدة في المنهاج.',
          en: 'Standard physiological baseline parameters defined in the curriculum.',
        },
        params: {},
        variant: 'blue',
      },
    ],
    missions: [
      {
        id: 'mission-exploration',
        title: {
          tr: 'Görev: Parametreleri Keşfedin ve Yanıtı Gözlemleyin',
          ar: 'المهمة: استكشاف المعاملات وملاحظة الاستجابة',
          en: 'Mission: Explore Parameters and Observe Response',
        },
        instruction: {
          tr: 'Simülasyon araçlarını kullanarak parametreleri değiştirin ve sistem çıktısındaki değişimi inceleyin.',
          ar: 'تفاعل مع عناصر المحاكاة ولاحظ التغير المباشر في المخرجات البيولوجية.',
          en: 'Interact with the simulation controls to observe the real-time biophysical state shifts.',
        },
        hint: {
          tr: 'Değerleri uç noktalara çekerek sınır koşullarını test edin.',
          ar: 'جرب القيم القصوى لاختبار الحالات الحدية للنظام.',
          en: 'Test boundary conditions by moving parameters to extremes.',
        },
        rewardXP: 25,
        successMessage: {
          tr: 'Tebrikler! Simülasyon mekanizmasını başarıyla deneyimlediniz.',
          ar: 'تهانينا! لقد استكشفت آلية المحاكاة بنجاح.',
          en: 'Congratulations! You have successfully explored the biophysical mechanism.',
        },
        validator: () => true,
      },
    ],
    evaluateHud: (_params, locale) => ({
      stateLabel: locale === 'tr' ? 'Aktif Biyofiziksel Simülasyon' : locale === 'ar' ? 'محاكاة حيوية نشطة' : 'Active Biophysical Simulation',
      stateColor: 'green',
      valueDisplay: '100% Canlı',
      analysis:
        locale === 'tr'
          ? 'Sistem kararlı dengede çalışıyor. Değişkenleri manipüle ederek fizyolojik tepkileri inceleyebilirsiniz.'
          : locale === 'ar'
          ? 'النظام يعمل بتوازن مستقر. يمكنك تعديل المتغيرات لملاحظة الاستجابة الفسيولوجية.'
          : 'System operates in stable equilibrium. Manipulate parameters to inspect pharmacological shifts.',
    }),
  };
}
