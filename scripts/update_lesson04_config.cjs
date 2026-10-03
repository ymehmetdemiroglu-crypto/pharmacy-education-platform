const fs = require('fs');

const lessonPath = 'courses/medchem/lessons/lesson-04.json';
const lesson = JSON.parse(fs.readFileSync(lessonPath, 'utf8'));

// Step-specific explanations and revealed outcomes
const stepMeta = {
  1: {
    revealedOutcome: {
      tr: "(S)-adrenalin reseptöre yaklaştığında katekol ve amin bağlanır ancak -OH grubu boşluğa bakar; hidrojen bağı enerjisi (-14 kJ/mol) tamamen kaybedilir.",
      ar: "عند اقتراب (S)-adrenalin من جيب المستقبل، يرسو الكاتيكول والأمين بينما تواجه مجموعة -OH المذيب، فتضيع طاقة الرابطة الهيدروجينية (-14 kJ/mol) تماماً.",
      en: "When (S)-epinephrine docks, catechol and amine bind but the -OH group points out into solvent, losing the -14 kJ/mol H-bond stabilization."
    },
    explanation: {
      tr: "Easson-Stedman 3-nokta hipotezine göre (R)-adrenalin 3 noktadan tam bağlanırken, (S)-adrenalin tıpkı deoksiadrenalin (epinin) gibi yalnızca 2 temas noktası kurabilir (Slayt 25).",
      ar: "وفق فرضية Easson-Stedman، يرسو (R)-adrenalin بثلاث نقاط كاملة، بينما يرتبط (S)-adrenalin بنقطتين فقط تماماً كالدوبامين/الإبينين منزوع الهيدروكسيل (شريحة 25).",
      en: "Under the Easson-Stedman hypothesis, (R)-epinephrine engages 3 complementary loci, while (S)-epinephrine forms only 2 contacts like des-hydroxy epinine."
    }
  },
  2: {
    revealedOutcome: {
      tr: "İki temas noktası etrafında molekül 360° dönebilir; kiral asimetriyi ve enantiyomerik farkı sabitlemek için kesinlikle asgari 3 nokta gerekir.",
      ar: "يمكن للجزيء الدوران بحرية حول محور يربط نقطتي تماس؛ يلزم حتماً 3 نقاط غير متحدة في خط لتثبيت التمايز الفراغي الكيرالي.",
      en: "A molecule freely pivots around a two-point axis; stereochemical discrimination mathematically requires at least 3 non-coplanar contacts."
    },
    explanation: {
      tr: "Uzayda iki nokta bir eksen tanımlar ve simetriyi kıramaz. Easson-Stedman kuralı kiral ayrım için en az 3 tamamlayıcı etkileşimi şart koşar (Slayt 25).",
      ar: "تحدد نقطتان في الفضاء محوراً مستقيماً عاجزاً عن كسر التناظر. تشترط قاعدة Easson-Stedman ثلاث نقاط تكميلية على الأقل للتمييز الفراغي (شريحة 25).",
      en: "Two points define a linear axis unable to break symmetry. The Easson-Stedman rule proves chiral recognition demands at least 3 contact loci."
    }
  },
  3: {
    revealedOutcome: {
      tr: "Eldiven 3 boyutlu kiral bir ceptir (başparmak, avuç, parmak yuvaları); sağ el tam otururken sol el uyumsuzluk yaşar. Top ise akiraldir.",
      ar: "القفاز جيب كيرالي ثلاثي الأبعاد (الإبهام والراحة والأصابع). تلائمه اليد اليمنى حصراً بينما الكرة متناظرة عديمة الكيرالية فتلائم الاثنين.",
      en: "A glove is a 3D chiral pocket (thumb, palm, fingers). The right hand fits snugly while a symmetric ball lacks chirality and enters either glove."
    },
    explanation: {
      tr: "Reseptörler L-amino asitlerden yapılmış şiral makromoleküllerdir. Ligandın 3 farklı noktası reseptörün 3 cebiyle eşleştiğinde seçicilik doğar (Slayt 2, 25).",
      ar: "المستقبلات جزيئات ضخمة كيرالية مبنية من L-أحماض أمينية. تنشأ النوعية عندما تتطابق 3 نقاط في الليغاند مع 3 جيوب في المستقبل (شريحة 2، 25).",
      en: "Receptors are chiral macromolecules built from L-amino acids. Selectivity arises when 3 pharmacophores align with 3 receptor sub-pockets."
    }
  },
  4: {
    revealedOutcome: {
      tr: "(R)-adrenalin Asp113 ile tuz köprüsü, Phe290 ile pi-istiflenmesi ve Ser kalıntısıyla H-bağı kurarak 3 noktadan kilitlenir (-42 kJ/mol).",
      ar: "يرسو (R)-adrenalin بثلاث نقاط: جسر ملحي مع Asp113، وتراصف بي مع Phe290، ورابطة هيدروجينية مع السيرين محققاً -42 kJ/mol.",
      en: "(R)-epinephrine anchors at 3 loci: salt bridge with Asp113, pi-stacking with Phe290, and H-bond with Ser, yielding -42 kJ/mol."
    },
    explanation: {
      tr: "Beta-2 adrenerjik reseptörün bağlanma cebi Asp113 (TM3), Ser204/207 (TM5) ve Phe290 (TM6) amino asitleriyle 3 boyutlu kiral üçgeni oluşturur (Slayt 4, 25).",
      ar: "يشكل جيب مستقبل بيتا-2 الأدريناليني مثلثاً فراغياً كيرالياً عبر الثمالات Asp113 (TM3) و Ser204/207 (TM5) و Phe290 (TM6) (شريحة 4، 25).",
      en: "The beta-2 adrenergic receptor binding pocket forms a 3D chiral triad via Asp113 (TM3), Ser204/207 (TM5), and Phe290 (TM6)."
    }
  },
  6: {
    revealedOutcome: {
      tr: "Afinite arttıkça Eudismik Oran (ER) katlanarak yükselir; çünkü yüksek afinite kusursuz kilit-anahtar uyumu gerektirir (Pfeiffer Kuralı).",
      ar: "مع ازدياد الألفة ترتفع النسبة اليوديزمية (ER) أُسياً؛ لأن الألفة الفائقة تتطلب تطابقاً كيرالياً ميليمترياً (قاعدة Pfeiffer).",
      en: "As affinity surges, Eudismic Ratio (ER) increases exponentially; high affinity strictly demands precise lock-and-key complementarity."
    },
    explanation: {
      tr: "Pfeiffer (1956) kuralı: Yüksek afiniteli (nM/pM) ilaçlarda cebin kiral toleransı sıfırdır; gevşek bağlanan mikromolar ilaçlarda ise ER 1'e yaklaşır (Slayt 28).",
      ar: "قاعدة Pfeiffer (1956): في أدوية الألفة الفائقة (nM/pM) ينعدم التسامح مع العيوب الكيرالية؛ بينما تقترب ER من 1 في الأدوية الضعيفة (شريحة 28).",
      en: "Pfeiffer's rule (1956): High-affinity drugs exhibit extreme chiral discrimination; weakly bound ligands tolerate stereocenter inversion."
    }
  },
  7: {
    revealedOutcome: {
      tr: "Tek bir H-bağı (3.3 kcal/mol), logaritmik Gibbs denkleminde (ΔΔG° = 2.303 RT log10(ER)) afiniteyi 200 kattan fazla artırır (10^2.32 ≈ 210).",
      ar: "تؤدي رابطة هيدروجينية مفردة (3.3 kcal/mol) وفق معادلة غيبس اللوغاريتمية إلى مضاعفة الألفة بأكثر من 200 ضعف (10^2.32 ≈ 210).",
      en: "A single H-bond (3.3 kcal/mol) magnifies affinity by over 200-fold via the logarithmic Gibbs relation (10^2.32 ≈ 210)."
    },
    explanation: {
      tr: "37°C'de her 1.42 kcal/mol'lük serbest enerji artışı afiniteyi 10 kat artırır. 3.3 kcal/mol / 1.42 = 2.32 log birimi = 210 kat eudismik oran (Slayt 25, 28).",
      ar: "عند 37 مئوية، كل 1.42 kcal/mol في طاقة الارتباط ترفع الألفة بمقدار 10 أضعاف. بالتالي 3.3 / 1.42 = 2.32 لوغاريتمي = 210 ضعفاً في ER (شريحة 25، 28).",
      en: "At 37 C, each 1.42 kcal/mol free energy increment multiplies affinity by 10-fold. Thus 3.3 / 1.42 = 2.32 log units = 210-fold ER."
    }
  },
  8: {
    revealedOutcome: {
      tr: "İlaç A (Kd = 0.2 nM) çok daha yüksek eudismik orana (ER >> 100) sahip olur; İlaç B (Kd = 50 μM) gevşek bağlanıp ER ≈ 1 kalır.",
      ar: "يمتلك الدواء A (Kd = 0.2 nM) نسبة يوديزمية أعلى بكثير (ER >> 100)، بينما يرتبط الدواء B بارتخاء فتبقى ER قريبة من 1.",
      en: "Drug A (Kd = 0.2 nM) exhibits a vastly higher Eudismic Ratio (ER >> 100); Drug B binds loosely with ER approaching 1."
    },
    explanation: {
      tr: "Pfeiffer kuralına göre eudismik oran eutomer afinitesiyle doğru orantılıdır. Pikomolar İlaç A katı kiral ayrım gösterirken mikromolar İlaç B göstermez (Slayt 28).",
      ar: "وفق قاعدة Pfeiffer، تتناسب ER طرداً مع ألفة الأوتومر. يظهر الدواء A تمييزاً كيرالياً حاداً بينما يعجز الدواء B عن ذلك (شريحة 28).",
      en: "Under Pfeiffer's rule, ER correlates directly with eutomer affinity. Picomolar Drug A enforces rigid chiral discrimination, unlike Drug B."
    }
  },
  9: {
    revealedOutcome: {
      tr: "R(-)-prilokain karaciğerde amido-hidrolaz ile hidroliz edilerek o-toluidine dönüşür; o-toluidin hemoglobindeki Fe2+'yi Fe3+'e oksitleyerek methemoglobinemi yapar.",
      ar: "يتحلمه R(-)-prilocaine كبدياً بإنزيم أميدو-هيدرولاز إلى o-toluidine، الذي يؤكسد حديد الهيموغلوبين Fe2+ إلى Fe3+ مسبباً ميتهيموغلوبينيميا.",
      en: "R(-)-prilocaine is selectively hydrolyzed by hepatic amidases to o-toluidine, which oxidizes Fe2+ to Fe3+, triggering methemoglobinemia."
    },
    explanation: {
      tr: "S(+)-prilokain aktif ve güvenlidir. Ancak distomer olan R(-)-formunun selektif metaboliti o-toluidin kanda oksijen taşınmasını engeller (Slayt 32).",
      ar: "المصاوغ S(+)-prilocaine فعال وآمن، لكن المستقلب الانتقائي للمصاوغ R(-) الخامل (o-toluidine) يعطل نقل الأكسجين في الدم (شريحة 32).",
      en: "S(+)-prilocaine is an effective, safe local anesthetic. However, the selective metabolite of the R(-) distomer (o-toluidine) induces methemoglobinemia."
    }
  },
  10: {
    revealedOutcome: {
      tr: "Facia önlenemezdi; talidomidin kiral merkezindeki asidik hidrojen plazmada keto-enol tautomerisiyle 4-5 saatte kendiliğinden rasemize olur (R -> S).",
      ar: "لم تكن الكارثة لتُمنع؛ إذ يخضع البروتون الكيرالي الحمضي في الثاليدوميد لتحول إينولي تلقائي في البلازما ليعيد تشكيل الخليط الراسيمي خلال 4-5 ساعات.",
      en: "Phocomelia would not have been prevented; the acidic chiral proton undergoes rapid spontaneous keto-enol racemization in plasma within 4-5 hours."
    },
    explanation: {
      tr: "Talidomidin kiral karbonundaki proton komşu iki karbonil nedeniyle asidiktir; pH 7.4'te hızla enolat üzerinden kopar ve saf R verilse bile S oluşur (Slayt 30, 31).",
      ar: "بروتون ذرة الكربون الكيرالية في الثاليدوميد حمضي لوقوعه بين مجموعتي كربونيل؛ فيتحول تلقائياً إلى المصاوغ S المشوه للأجنة حتى لو أُعطي R نقياً (شريحة 30، 31).",
      en: "The chiral proton flanked by two carbonyls is acidic; at physiological pH it tautomerizes, regenerating teratogenic (S)-thalidomide from pure (R)."
    }
  },
  11: {
    revealedOutcome: {
      tr: "Asetilkolinin N+ ile ester oksijeni arasındaki mesafe gauche konformasyonunda 3.3 Å (muskarinik), anti konformasyonunda 4.4 Å (nikotinik) dir.",
      ar: "تبلغ المسافة بين N+ وأكسجين الإستر في أسيتيل كولين 3.3 أنغستروم في هيئة gauche (مسكارينية)، و 4.4 أنغستروم في هيئة anti (نيكوتينية).",
      en: "The N+ to ester oxygen distance in acetylcholine is 3.3 A in the gauche conformer (muscarinic) and 4.4 A in the anti conformer (nicotinic)."
    },
    explanation: {
      tr: "Konformasyonel esneklik asetilkolinin farklı mesafelerdeki iki reseptörü uyarmasını sağlar. Rijit siklopropan analogları bu mesafeleri kanıtlamıştır (Slayt 42).",
      ar: "تتيح المرونة الفراغية لأسيتيل كولين تنشيط مستقبلين بأبعاد متباينة. وقد أثبتت نظائر السيكلوبروبان الصلبة هذا التباين الهندسي (شريحة 42).",
      en: "Conformational flexibility permits acetylcholine to activate two distinct targets with different pharmacophoric distances (3.3 A vs 4.4 A)."
    }
  },
  12: {
    revealedOutcome: {
      tr: "ER = 200 dür; ΔΔG° = -3.27 kcal/mol (-13.7 kJ/mol) olup Easson-Stedman 3. temas noktası olan güçlü bir hidrojen bağına tam olarak uyar.",
      ar: "النسبة ER = 200؛ وفارق طاقة الارتباط ΔΔG° = -3.27 kcal/mol (-13.7 kJ/mol)، وهو ما يطابق تماماً طاقة الرابطة الهيدروجينية كنقطة تماس ثالثة.",
      en: "ER = 200; DeltaDelta G = -3.27 kcal/mol (-13.7 kJ/mol), perfectly matching the free energy contribution of the third Easson-Stedman H-bond contact."
    },
    explanation: {
      tr: "ER = 400 nM / 2 nM = 200. ΔΔG° = 1.42 kcal/mol × log10(200) = 1.42 × 2.301 ≈ 3.27 kcal/mol (-13.7 kJ/mol). Easson-Stedman modeli kanıtlanmıştır (Slayt 25, 28).",
      ar: "النسبة ER = 400 / 2 = 200. وطاقة الارتباط ΔΔG° = 1.42 × log10(200) = 1.42 × 2.301 ≈ 3.27 kcal/mol، مما يثبت نموذج Easson-Stedman (شريحة 25، 28).",
      en: "ER = 400 / 2 = 200. DeltaDelta G = 1.42 kcal/mol x log10(200) = 1.42 x 2.301 = 3.27 kcal/mol (-13.7 kJ/mol), proving the Easson-Stedman model."
    }
  }
};

lesson.steps.forEach((step, idx) => {
  const num = idx + 1;
  if (num === 5) {
    // Step 5: interactive widget
    step.widgetType = "ReceptorLigandMatcher";
    step.widget = {
      type: "ReceptorLigandMatcher",
      config: { ...step.config }
    };
  } else if (step.conceptCheck && step.conceptCheck.options) {
    // Mirror options to config.options
    step.config = step.config || {};
    step.config.options = step.conceptCheck.options.map(opt => ({
      id: opt.id,
      text: opt.text.tr || opt.text,
      isCorrect: opt.isCorrect,
      misconceptionFeedback: opt.misconceptionFeedback?.tr || opt.misconceptionFeedback
    }));
    
    if (stepMeta[num]) {
      step.config.revealedOutcome = stepMeta[num].revealedOutcome;
      step.config.explanation = stepMeta[num].explanation;
    }
  }
});

fs.writeFileSync(lessonPath, JSON.stringify(lesson, null, 2), 'utf8');
console.log('✅ Successfully updated lesson-04.json with mirrored config.options, widget object, and outcomes!');
