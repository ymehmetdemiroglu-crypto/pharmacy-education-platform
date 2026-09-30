import { SpacedReviewCard } from '../types';

export const LEITNER_INTERVALS: Record<1 | 2 | 3 | 4 | 5, number> = {
  1: 1, // 1 day
  2: 3, // 3 days
  3: 7, // 7 days
  4: 21, // 21 days (R6 standardized)
  5: 60, // 60 days (R6 standardized)
};

export const BOX_DEFAULT_STABILITY: Record<1 | 2 | 3 | 4 | 5, number> = {
  1: 1.0,
  2: 3.0,
  3: 7.0,
  4: 21.0,
  5: 60.0,
};

export const RETRIEVABILITY_DUE_THRESHOLD = 0.80; // 80% retention threshold

/**
 * Calculates exponential retrievability decay:
 * R(t) = exp(-delta_t / S)
 * where delta_t is elapsed time in days and S is memory stability in days.
 */
export function calculateMemoryDecay(elapsedDays: number, stability: number): number {
  if (elapsedDays <= 0) return 1.0;
  const s = Math.max(0.1, stability);
  return Math.exp(-elapsedDays / s);
}

/**
 * Computes current retrievability R(t) for a spaced review card.
 */
export function calculateCardRetrievability(
  card: SpacedReviewCard,
  now: Date = new Date()
): number {
  const lastReviewed = new Date(card.lastReviewedAt).getTime();
  const current = now.getTime();
  const elapsedMs = Math.max(0, current - lastReviewed);
  const elapsedDays = elapsedMs / (1000 * 60 * 60 * 24);
  const stability = card.stability ?? BOX_DEFAULT_STABILITY[card.box];
  return calculateMemoryDecay(elapsedDays, stability);
}

/**
 * Processes a review trial for a card, updating box level, memory stability S,
 * retrievability, intervals, and next due date.
 */
export function processCardReview(
  card: SpacedReviewCard,
  isCorrect: boolean,
  now: Date = new Date()
): SpacedReviewCard {
  let nextBox: 1 | 2 | 3 | 4 | 5 = card.box;
  let lapseCount = card.lapseCount;
  const currentStability = card.stability ?? BOX_DEFAULT_STABILITY[card.box];
  let nextStability: number;

  const retrievability = calculateCardRetrievability(card, now);

  if (isCorrect) {
    if (card.box < 5) {
      nextBox = (card.box + 1) as 1 | 2 | 3 | 4 | 5;
    }
    // Desirable difficulty scaling: lower retrievability at recall yields higher stability boost
    // S_new = S_old * (1 + C_factor * exp(1 - R))
    const cFactor = 0.5;
    const stabilityMultiplier = 1 + cFactor * Math.exp(1 - Math.min(1.0, retrievability));
    nextStability = Math.max(
      BOX_DEFAULT_STABILITY[nextBox],
      currentStability * stabilityMultiplier
    );
  } else {
    // Drop back to Box 1 on failure
    nextBox = 1;
    lapseCount += 1;
    // Stability decay on lapse: S_new = max(1.0, S_old * 0.25)
    nextStability = Math.max(1.0, currentStability * 0.25);
  }

  const intervalDays = LEITNER_INTERVALS[nextBox];
  const nextDueDate = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);

  return {
    ...card,
    box: nextBox,
    intervalDays,
    stability: Number(nextStability.toFixed(4)),
    retrievability: isCorrect ? 1.0 : Number(calculateMemoryDecay(0, nextStability).toFixed(4)),
    lastReviewedAt: now.toISOString(),
    nextReviewDue: nextDueDate.toISOString(),
    reviewCount: card.reviewCount + 1,
    lapseCount,
  };
}

/**
 * Returns cards that are due for review either because the scheduled review date
 * has passed OR because memory retrievability R(t) has decayed below the threshold.
 */
export function getDueReviewCards(
  cards: SpacedReviewCard[],
  now: Date = new Date(),
  retrievabilityThreshold: number = RETRIEVABILITY_DUE_THRESHOLD
): SpacedReviewCard[] {
  const currentTimestamp = now.getTime();
  return cards
    .filter((card) => {
      const dueByDate = new Date(card.nextReviewDue).getTime() <= currentTimestamp;
      const dueByDecay = calculateCardRetrievability(card, now) <= retrievabilityThreshold;
      return dueByDate || dueByDecay;
    })
    .sort((a, b) => {
      // Prioritize lower box (earlier/harder items) first, then lower retrievability
      if (a.box !== b.box) {
        return a.box - b.box;
      }
      return calculateCardRetrievability(a, now) - calculateCardRetrievability(b, now);
    });
}

export interface ReviewCardSeed {
  cardId: string;
  courseId: string;
  drugOrConcept: string;
  prompt: string;
  answer: string;
  box?: 1 | 2 | 3 | 4 | 5 | undefined;
  intervalDays?: number | undefined;
  stability?: number | undefined;
  misconceptionId?: string | undefined;
  status?: string | undefined;
}

export function enqueueReviewCards(
  existingCards: SpacedReviewCard[],
  newSeeds: ReviewCardSeed[],
  now: Date = new Date()
): SpacedReviewCard[] {
  const existingMap = new Map(existingCards.map((c) => [c.cardId, c]));
  const updated = [...existingCards];

  for (const seed of newSeeds) {
    if (!existingMap.has(seed.cardId)) {
      const box = (seed.box || 1) as 1 | 2 | 3 | 4 | 5;
      const intervalDays = seed.intervalDays || LEITNER_INTERVALS[box] || 1;
      const stability = seed.stability || BOX_DEFAULT_STABILITY[box];
      const nextDueDate = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);

      const newCard: SpacedReviewCard = {
        cardId: seed.cardId,
        courseId: seed.courseId,
        drugOrConcept: seed.drugOrConcept,
        prompt: seed.prompt,
        answer: seed.answer,
        box,
        intervalDays,
        stability,
        retrievability: 1.0,
        misconceptionId: seed.misconceptionId,
        lastReviewedAt: now.toISOString(),
        nextReviewDue: nextDueDate.toISOString(),
        reviewCount: 0,
        lapseCount: 0,
      };
      updated.push(newCard);
      existingMap.set(seed.cardId, newCard);
    }
  }

  return updated;
}

export function loadLocalReviewCards(courseId: string = 'medchem'): SpacedReviewCard[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw =
      localStorage.getItem(`pharmacy_leitner_${courseId}`) ||
      localStorage.getItem(`pharmacy_review_cards_${courseId}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Failed to load local review cards:', err);
  }
  return [];
}

export function saveLocalReviewCards(courseId: string, cards: SpacedReviewCard[]): void {
  if (typeof window === 'undefined') return;
  try {
    const serialized = JSON.stringify(cards);
    localStorage.setItem(`pharmacy_leitner_${courseId}`, serialized);
    localStorage.setItem(`pharmacy_review_cards_${courseId}`, serialized);
  } catch (err) {
    console.warn('Failed to save local review cards:', err);
  }
}

// --- Formative Micro-Remediation Routing Engine ---

export interface MicroRemediationCard {
  remediationId: string;
  misconceptionId: string;
  conceptId: string;
  title: { tr: string; ar: string } | string;
  intuitiveReframing: { tr: string; ar: string } | string; // <= 30 words
  targetWidget?: {
    type: string;
    actionPrompt: { tr: string; ar: string } | string;
    targetState: Record<string, unknown>;
  };
  nearTransferCheck: {
    prompt: { tr: string; ar: string } | string;
    options: Array<{
      id: string;
      text: { tr: string; ar: string } | string;
      isCorrect: boolean;
      feedback?: { tr: string; ar: string } | string;
    }>;
  };
}

export type RemediationAction = 'none' | 'diagnostic_hint' | 'micro_remediation';

export interface RemediationRoutingDecision {
  action: RemediationAction;
  lapseCount: number;
  misconceptionId?: string | undefined;
  diagnosticHintTier?: 1 | 2 | 3 | undefined;
  remediationNode?: MicroRemediationCard | undefined;
  recommendation: string;
}

export const CANONICAL_REMEDIATION_CATALOG: Record<string, MicroRemediationCard> = {
  'MISC-SPARE-RECEPTOR-SATURATION': {
    remediationId: 'rem-spare-receptors',
    misconceptionId: 'MISC-SPARE-RECEPTOR-SATURATION',
    conceptId: 'pharm-mod2-les1',
    title: {
      tr: 'Yedek Reseptörler ve Maksimum Doku Yanıtı',
      ar: 'المستقبِلات الاحتياطية والاستجابة القصوى للأنسجة',
    },
    intuitiveReframing: {
      tr: '100 ampul olan bir odada sadece 5 ampul açıldığında tam aydınlanma sağlanabilir. Kalan 95 reseptör yedektir.',
      ar: 'في غرفة بها 100 مصباح، إضاءة 5 مصابيح فقط كافية للإنارة الكاملة. الـ 95 المتبقية احتياطية.',
    },
    targetWidget: {
      type: 'DoseResponseModulator',
      actionPrompt: {
        tr: 'Yedek reseptör sürgüsünü %0\'dan %90\'a kaydırın ve EC50 değerinin Kd\'den nasıl ayrıldığını gözlemleyin.',
        ar: 'حرك شريط المستقبِلات الاحتياطية من 0% إلى 90% ولاحظ كيف ينفصل EC50 عن Kd.',
      },
      targetState: { spareReceptorFraction: 0.9 },
    },
    nearTransferCheck: {
      prompt: {
        tr: 'Yedek reseptörlerin varlığında %50 doku yanıtı için gereken reseptör doluluğu nasıldır?',
        ar: 'في وجود مستقبِلات احتياطية، ما هو إشغال المستقبِلات المطلوب لتحقيق 50% من الاستجابة؟',
      },
      options: [
        {
          id: 'opt-1',
          text: { tr: '%50\'den çok daha düşüktür', ar: 'أقل بكثير من 50%' },
          isCorrect: true,
          feedback: {
            tr: 'Doğru! Sinyal amplifikasyonu nedeniyle düşük doluluk tam yanıt verebilir.',
            ar: 'صحيح! بسبب تضخيم الإشارة، يمكن لإشغال منخفض تحقيق استجابة كاملة.',
          },
        },
        {
          id: 'opt-2',
          text: { tr: 'Tam olarak %50 olmalıdır', ar: 'يجب أن يكون 50% تماماً' },
          isCorrect: false,
          feedback: {
            tr: 'Bu klasik bir yanılgıdır; yedek reseptörler varken %50 yanıt için %50 doluluk gerekmez.',
            ar: 'هذا خطأ شائع؛ مع المستقبِلات الاحتياطية لا يشترط إشغال 50% لتحقيق 50% استجابة.',
          },
        },
      ],
    },
  },
  'MISC-EFFICACY-POTENCY-CONFLATION': {
    remediationId: 'rem-potency-efficacy',
    misconceptionId: 'MISC-EFFICACY-POTENCY-CONFLATION',
    conceptId: 'pharm-mod2-les2',
    title: {
      tr: 'Etki Gücü (Potens) ve Maksimum Etkinlik (Efficacy)',
      ar: 'القوة الدوائية (Potency) مقابل الفعالية القصوى (Efficacy)',
    },
    intuitiveReframing: {
      tr: 'Spor araba daha az yakıtla 100 km/s hıza ulaşır (potens), ancak yük treni 100 kat daha fazla yük taşır (etkinlik).',
      ar: 'السيارة الرياضية تصل لسرعة 100 كم/س بوقود أقل (قوة)، لكن قطار البضائع يحمل أضعاف الحمولة (فعالية).',
    },
    targetWidget: {
      type: 'DoseResponseModulator',
      actionPrompt: {
        tr: 'Parsiyel agonist eğrisinin tepe noktasını tam agonist tavanı ile karşılaştırın.',
        ar: 'قارن قمة منحنى المشبه الجزئي مع سقف المشبه التام.',
      },
      targetState: { intrinsicActivity: 0.5 },
    },
    nearTransferCheck: {
      prompt: {
        tr: 'Daha düşük EC50 değerine sahip bir ilaç her zaman daha yüksek Emax üretir mi?',
        ar: 'هل الدواء ذو قيمة EC50 الأقل ينتج دائماً قيمة Emax أعلى؟',
      },
      options: [
        {
          id: 'opt-1',
          text: { tr: 'Hayır, potens ve maksimum etkinlik bağımsız parametrelerdir', ar: 'لا، القوة والفعالية القصوى معياران مستقلان' },
          isCorrect: true,
          feedback: {
            tr: 'Kesinlikle! EC50 sadece dozu (potens), Emax ise ulaşılan maksimum klinik tavanı belirler.',
            ar: 'بالتأكيد! تحدد EC50 الجرعة، بينما تحدد Emax السقف السريري الأقصى.',
          },
        },
        {
          id: 'opt-2',
          text: { tr: 'Evet, daha güçlü olan her zaman daha fazla etki üretir', ar: 'نعم، الأقوى ينتج دائماً تأثيراً أعظم' },
          isCorrect: false,
          feedback: {
            tr: 'Yanılgı: Yüksek potensli bir parsiyel agonist, düşük potensli bir tam agonistten daha düşük maksimum etki verir.',
            ar: 'مغالطة: المشبه الجزئي عالي القوة يعطي تأثيراً أقصى أقل من مشبه تام منخفض القوة.',
          },
        },
      ],
    },
  },
  'MISC-LIPOPHILICITY-BIOAVAILABILITY': {
    remediationId: 'rem-lipophilicity-barrier',
    misconceptionId: 'MISC-LIPOPHILICITY-BIOAVAILABILITY',
    conceptId: 'mc-mod1-les2',
    title: {
      tr: 'Lipofiliklik (logP) ve Çözünürlük Dengesi',
      ar: 'الألفة الشحمية (logP) وتوازن الذوبانية',
    },
    intuitiveReframing: {
      tr: 'İlaç bağırsak zarına geçmeden önce sulu mide-bağırsak sıvısında çözünmelidir. Aşırı yağlı ilaçlar suda çökerek emilemez.',
      ar: 'يجب أن يذوب الدواء في سوائل الأمعاء المائية قبل اختراق الغشاء الشحمي. الإفراط في الشحمية يمنع الذوبان.',
    },
    targetWidget: {
      type: 'MembranePartitionSimulator',
      actionPrompt: {
        tr: 'logP değerini 5.0 üzerine çıkarın ve sulu çözünürlüğün çöküşünü izleyin.',
        ar: 'ارفع قيمة logP فوق 5.0 وشاهد انهيار الذوبانية المائية.',
      },
      targetState: { logP: 5.5 },
    },
    nearTransferCheck: {
      prompt: {
        tr: 'Lipofilikliği (logP) sonsuza kadar artırmak oral biyoyararlanımı nasıl etkiler?',
        ar: 'كيف يؤثر رفع الألفة الشحمية (logP) بلا حدود على التوافر الحيوي الفموي؟',
      },
      options: [
        {
          id: 'opt-1',
          text: { tr: 'Çözünürlük yetersizliği nedeniyle biyoyararlanım düşer', ar: 'ينخفض التوافر الحيوي بسبب فشل الذوبان في السوائل المعوية' },
          isCorrect: true,
          feedback: {
            tr: 'Harika! Lipinski 5 kuralının temeli tam olarak budur (logP < 5).',
            ar: 'ممتاز! هذا بالضبط أساس قاعدة Lipinski الخماسية (logP < 5).',
          },
        },
        {
          id: 'opt-2',
          text: { tr: 'Membran geçişi arttıkça emilim %100\'e yaklaşır', ar: 'يقترب الامتصاص من 100% مع زيادة اختراق الغشاء' },
          isCorrect: false,
          feedback: {
            tr: 'Yanılgı: İlaç katı halde çökerse zarlara ulaşamaz bile.',
            ar: 'مغالطة: إذا ترسب الدواء صلباً، فلن يصل حتى إلى الأغشية ليمتص.',
          },
        },
      ],
    },
  },
  'MISC-ACID-BASE-IONIZATION': {
    remediationId: 'rem-acid-base-charge',
    misconceptionId: 'MISC-ACID-BASE-IONIZATION',
    conceptId: 'mc-mod1-les2',
    title: {
      tr: 'Asit/Baz İyonizasyonu ve Membran Geçişi',
      ar: 'تأين الأحماض والقواعد ونفوذية الأغشية',
    },
    intuitiveReframing: {
      tr: 'Zayıf asitler proton verirken yüklü hale gelir; zayıf bazlar ise proton alırken yüklü hale gelir. Yüksüz türler zardan kolayca geçer.',
      ar: 'الأحماض الضعيفة تصبح مشحونة عندما تفقد بروتوناً؛ والقواعد الضعيفة تصبح مشحونة عندما تكتسبه. النوع غير المشحون يعبر الأغشية.',
    },
    targetWidget: {
      type: 'IonizationEquilibriumSlider',
      actionPrompt: {
        tr: 'pH\'ı pKa\'nın 2 birim altına ayarlayın ve zayıf asidin yüksüz formunun nasıl baskın olduğunu görün.',
        ar: 'اضبط pH أقل من pKa بوحدتين وشاهد سيادة الشكل غير المشحون للحمض الضعيف.',
      },
      targetState: { pH: 1.5, pKa: 3.5 },
    },
    nearTransferCheck: {
      prompt: {
        tr: 'Mide ortamında (pH 1.5) zayıf asit olan aspirinin (pKa 3.5) iyonizasyon durumu nasıldır?',
        ar: 'في بيئة المعدة (pH 1.5)، ما هي حالة تأين الأسبرين وهو حمض ضعيف (pKa 3.5)؟',
      },
      options: [
        {
          id: 'opt-1',
          text: { tr: 'Büyük oranda yüksüzdür ve mideden kolayca emilebilir', ar: 'غير متأين بنسبة كبيرة ويمتص بسهولة من المعدة' },
          isCorrect: true,
          feedback: {
            tr: 'Doğru! pH < pKa durumunda zayıf asitler HA (yüksüz) formunda kalır.',
            ar: 'صحيح! عندما يكون pH < pKa، تبقى الأحماض الضعيفة بالشكل HA غير المتأين.',
          },
        },
        {
          id: 'opt-2',
          text: { tr: 'Tamamen iyonize olup suda hapsolur', ar: 'يتأين تماماً ويُحبس في الطور المائي' },
          isCorrect: false,
          feedback: {
            tr: 'Yanılgı: Asitler bazik ortamlarda proton kaybederek iyonize olur, asidik mide ortamında değil.',
            ar: 'مغالطة: تتأين الأحماض بفقدان البروتون في الوسط القاعدي وليس الحامضي.',
          },
        },
      ],
    },
  },
  'MISC-FERGUSON-NONSPECIFIC': {
    remediationId: 'rem-ferguson-cutoff',
    misconceptionId: 'MISC-FERGUSON-NONSPECIFIC',
    conceptId: 'mc-mod1-les1',
    title: {
      tr: 'Ferguson İlkesi ve Yapısal Özgüllük',
      ar: 'مبدأ Ferguson والنوعية البنيوية',
    },
    intuitiveReframing: {
      tr: 'Yapısal olarak özgül olmayan ilaçlar (ör. eter) biyofazı fiziksel olarak doyurur (yüksek nispi doygunluk a > 0.01). Reseptör ligandları ise çok düşük doygunlukta (a < 0.001) etki eder.',
      ar: 'الأدوية غير النوعية بنيوياً (مثل الإيثر) تشبع الطور الحيوي فيزيائياً (تشبع مرتفع a > 0.01)، بينما تعمل ربيطات المستقبِلات عند إشباع منخفض جداً (a < 0.001).',
    },
    targetWidget: {
      type: 'ThermodynamicActivityFergusonSlider',
      actionPrompt: {
        tr: 'Buhar basıncını artırarak nispi doygunluğun membran hacim genişlemesini nasıl tetiklediğini inceleyin.',
        ar: 'زد الضغط الجزئي للبخار ولاحظ كيف يؤدي التشبع النسبي إلى تمدد حجم الغشاء.',
      },
      targetState: { partialPressure: 20 },
    },
    nearTransferCheck: {
      prompt: {
        tr: 'Bir ilacın yapısal olarak özgül olmadığını gösteren en temel termodinamik kanıt nedir?',
        ar: 'ما هو الدليل الديناميكي الحراري الأساسي على أن الدواء غير نوعي بنيوياً؟',
      },
      options: [
        {
          id: 'opt-1',
          text: { tr: 'Farklı kimyasal yapılara rağmen eşit termodinamik aktivitede eşit etki göstermesi', ar: 'إحداث نفس التأثير البيولوجي عند نفس النشاط الديناميكي الحراري رغم اختلاف البنية' },
          isCorrect: true,
          feedback: {
            tr: 'Doğru! Ferguson ilkesinin tanımı tam olarak budur.',
            ar: 'صحيح! هذا هو بالضبط تعريف مبدأ Ferguson.',
          },
        },
        {
          id: 'opt-2',
          text: { tr: 'Sadece tek bir stereoseçici kiral merkeze sahip olması', ar: 'امتلاكه مركزاً كيرالياً واحداً فقط' },
          isCorrect: false,
          feedback: {
            tr: 'Yanılgı: Kiral stereoseçicilik yapısal olarak özgül ilaçların özelliğidir.',
            ar: 'مغالطة: الانتقائية الفراغية هي سمة الأدوية النوعية بنيوياً.',
          },
        },
      ],
    },
  },
};

/**
 * Evaluates student failure count on a concept or review card and determines
 * adaptive formative remediation routing:
 * - 0 lapses: none
 * - 1 lapse: Tier 2 diagnostic clue
 * - 2+ lapses: micro-remediation node with reframing, widget interaction, and near-transfer check
 */
export function routeRemediation(
  item: {
    lapseCount: number;
    misconceptionId?: string;
    drugOrConcept?: string;
    cardId?: string;
  },
  customCatalog?: Record<string, MicroRemediationCard>
): RemediationRoutingDecision {
  const catalog = customCatalog || CANONICAL_REMEDIATION_CATALOG;
  const key = item.misconceptionId || item.drugOrConcept || '';
  const remediationNode = catalog[key];

  if (item.lapseCount <= 0) {
    return {
      action: 'none',
      lapseCount: item.lapseCount,
      misconceptionId: item.misconceptionId,
      recommendation: 'Card is within healthy memory stability. Normal spaced interval maintained.',
    };
  }

  if (item.lapseCount === 1) {
    return {
      action: 'diagnostic_hint',
      lapseCount: 1,
      misconceptionId: item.misconceptionId,
      diagnosticHintTier: 2,
      remediationNode,
      recommendation: 'First retrieval lapse. Provide Tier 2 Diagnostic Clue to prompt productive recall.',
    };
  }

  return {
    action: 'micro_remediation',
    lapseCount: item.lapseCount,
    misconceptionId: item.misconceptionId,
    remediationNode,
    recommendation: remediationNode
      ? `Recurring failure detected (lapse count ${item.lapseCount}). Routing student to targeted micro-remediation node: ${remediationNode.remediationId}`
      : `Recurring failure detected (lapse count ${item.lapseCount}). General concept reinforcement required.`,
  };
}
