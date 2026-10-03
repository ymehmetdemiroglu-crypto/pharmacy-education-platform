const fs = require('fs');

const lessonPath = 'courses/medchem/lessons/lesson-09.json';
const lesson = JSON.parse(fs.readFileSync(lessonPath, 'utf8'));

// Step 8: Amphetamine Oxidative Deamination Options Fix
const step8 = lesson.steps[7];
step8.conceptCheck.options = [
  {
    id: "opt-8a",
    text: {
      tr: "Oluşan kararsız karbinolamin kendiliğinden amonyak (NH3) gazı bırakarak fenilasetona (keton) dönüşür.",
      ar: "يتحول الكاربينول أمين غير المستقر المتشكل تلقائياً إلى فينيل أسيتون (كيتون) محرراً غاز الأمونيا (NH3).",
      en: "The transient carbinolamine intermediate spontaneously expels ammonia (NH3) to yield phenylacetone (ketone)."
    },
    isCorrect: true,
    misconceptionFeedback: {
      tr: "Harika reaksiyon takibi! Slayt 13 ve 24: Alfa-karbonun hidroksillenmesiyle oluşan geminal amino-alkol (karbinolamin) termodinamik olarak aşırı kararsızdır. Spontan olarak amonyak eliminasyonu yapar ve fenilaseton ketonuna dönüşür.",
      ar: "تتبع استثنائي للتفاعل! الشريحة 13 و 24: الكاربينول أمين المتشكل بهدرلة كربون ألفا غير مستقر إطلاقاً؛ ينشطر تلقائياً بطرد الأمونيا ليعطي كيتون فينيل أسيتون.",
      en: "Outstanding mechanistic tracking! Slide 13 & 24: Hydroxylation of the alpha-carbon produces a geminal carbinolamine that spontaneously fragments, eliminating ammonia to leave phenylacetone."
    }
  },
  {
    id: "opt-8b",
    text: {
      tr: "Oluşan ara ürün kararlı bir nitro türevidir; amonyak ayrılması gerçekleşmez ve molekül idrara hiç atılamaz.",
      ar: "المركب الوسيط هو مشتق نيترو مستقر؛ لا يحدث انفصال للأمونيا ولا يطرح الجزيء في البول.",
      en: "The intermediate forms a stable nitro derivative; ammonia never leaves, preventing ketone conversion."
    },
    isCorrect: false,
    misconceptionFeedback: {
      tr: "Kararlı nitro türevi yanılgısı: Alfa-karbona hidroksil eklenmesi (-C(OH)(NH2)-) karbinolamin ara ürününü doğurur; bu yapı termodinamik olarak kararsızdır ve hızla amonyak kaybederek fenilasetona parçalanır.",
      ar: "مغالطة مشتق النيترو: إضافة الهيدروكسيل لكربون ألفا تعطي كاربينول أمين غير مستقر ينشطر فوراً محرراً الأمونيا والفينيل أسيتون.",
      en: "Stable nitro misconception: Alpha-carbon hydroxylation generates a transient carbinolamine; this intermediate spontaneously expels ammonia to yield phenylacetone."
    }
  },
  {
    id: "opt-8c",
    text: {
      tr: "CYP enzimi doğrudan C-N bağını homolitik olarak kırar ve serbest fenilpropanil radikali açığa çıkar.",
      ar: "يشطر إنزيم CYP رابطة C-N مباشرة وبشكل تجانسي محرراً جذراً حراً من فينيل بروبانيل.",
      en: "CYP directly cleaves the C-N single bond homolytically, releasing a phenylpropanyl radical."
    },
    isCorrect: false,
    misconceptionFeedback: {
      tr: "Doğrudan bağ kırılması yanılgısı: CYP450 doğrudan C-N bağını koparmaz; mekanizma her zaman alfa-C-H bağının hidroksillenmesi ve ardından kendiliğinden kimyasal eliminasyondur.",
      ar: "مغالطة الكسر المباشر: لا يكسر CYP رابطة C-N مباشرة؛ بل يهدرل كربون ألفا لتشجيع الانفصال التلقائي للأمونيا.",
      en: "Direct cleavage misconception: CYP enzymes do not directly sever C-N bonds; they hydroxylate the adjacent alpha-carbon to trigger spontaneous elimination."
    }
  }
];

step8.config.options = step8.conceptCheck.options.map(opt => ({
  id: opt.id,
  text: opt.text.tr,
  isCorrect: opt.isCorrect,
  misconceptionFeedback: opt.misconceptionFeedback.tr
}));

// Step 9: Procaine (ester) vs Procainamide (amide) Kinetics Options Fix
const step9 = lesson.steps[8];
step9.conceptCheck.options = [
  {
    id: "opt-9a",
    text: {
      tr: "Kandaki psödokolinesterazlar esterleri (prokain) dakikalar içinde yıkar; amit bağındaki azot rezonansı ise bağı kararlı kılar ve hepatik amidazlarca çok yavaş hidroliz edilir.",
      ar: "تحلمه كولين إستراز البلازما الإستر (بروكائين) في دقائق؛ بينما يعزز رنين نيتروجين الأميد ثبات الرابطة ويجعل حلمهتها الكبدية بطيئة للغاية.",
      en: "Blood pseudocholinesterases hydrolyze esters (procaine) within minutes; nitrogen lone-pair resonance stabilizes amide bonds, making procainamide hydrolysis by amidases orders of magnitude slower."
    },
    isCorrect: true,
    misconceptionFeedback: {
      tr: "Harika klinik kavrayış! Slayt 28 ve Modül 3 biyoizosterizm prensibi: Plazmada bol miktarda bulunan psödokolinesteraz ve karboksilesteraz enzimleri ester bağını hızla yarar (prokain t1/2 < 1 dk). Amit grubundaki azotun serbest elektron çifti karbonil ile rezonans yaparak çift bağ karakteri kazandırır (%40). Bu rezonans kararlılığı ve amidazların düşük hızı nedeniyle prokainamid 3-4 saatlik yarı ömre ulaşır.",
      ar: "ربط سريري فذ! الشريحة 28: إسترازات البلازما تشطر الإستر في لمح البصر (بروكائين t1/2 < 1 دقيقة). بينما يمنح رنين زوج إلكترونات النيتروجين في الأميد خواص الرابطة المضاعفة (40%)، مما يمنحه ثباتاً هائلاً ونصف عمر 3-4 ساعات.",
      en: "Superb clinical insight! Slide 28 benchmark: Abundant circulating butyrylcholinesterases cleave ester procaine within seconds. In procainamide, nitrogen lone-pair delocalization imparts partial double-bond character to the amide, resisting esterases and demanding slow amidase clearance (t1/2 ≈ 3-4 hours)."
    }
  },
  {
    id: "opt-9b",
    text: {
      tr: "Prokainamid bir amit olduğu için plazmada çözünmez ve kan damarı endoteline yapışıp depolanır.",
      ar: "بما أن بروكائيناميد أميد، فإنه لا يذوب في البلازما ويلتصق ببطانة الأوعية الدموية مترسباً.",
      en: "Because procainamide is an amide, it is insoluble in plasma and precipitates onto vascular endothelium."
    },
    isCorrect: false,
    misconceptionFeedback: {
      tr: "Çözünmezlik yanılgısı: Prokainamid tersiyer amin grubu sayesinde fizyolojik pH'ta tuz formundadır ve suda mükemmel çözünür; yarı ömrü vasküler depolanmadan değil, amidaz hidrolizine kimyasal dirençten kaynaklanır.",
      ar: "مغالطة عدم الذوبان: يمتلك بروكائيناميد أميناً ثالثياً يجعله عالي الذوبان في ماء البلازما؛ وثباته ناجم عن مقاومة الأميداز وليس الترسيب.",
      en: "Insolubility misconception: Procainamide possesses a basic tertiary amine and is water-soluble at pH 7.4; its longevity reflects amide resonance stability against esterases, not vascular precipitation."
    }
  },
  {
    id: "opt-9c",
    text: {
      tr: "Ester ve amit bağlarının hidroliz hızları aynıdır; prokainamidin kanda uzun kalmasının sebebi böbrek tübüllerinden hiç filtre edilmemesidir.",
      ar: "سرعة حلمهة الإستر والأميد متطابقة؛ وبقاء بروكائيناميد يعود فقط إلى عدم ترشيحه كلوياً نهائياً.",
      en: "Ester and amide hydrolysis rates are identical; procainamide persists purely because it completely avoids renal glomerular filtration."
    },
    isCorrect: false,
    misconceptionFeedback: {
      tr: "Eşit kinetik yanılgısı: Plazma psödokolinesterazları esterleri saniyeler içinde hidroliz eder (prokain t1/2 < 1 dk); amit bağı ise rezonans ile kısmi çift bağ karakteri kazandığından ancak hepatik amidazlarca saatler içinde yavaşça yıkanabilir (Slayt 28).",
      ar: "مغالطة التكافؤ الحركي: تشطر إسترازات البلازما الإستر في ثوانٍ؛ بينما تكتسب رابطة الأميد خواص الرابطة المزدوجة بالرنين وتتطلب حلمهة كبدية بطيئة لساعات (شريحة 28).",
      en: "Kinetic equivalence fallacy: Circulating pseudocholinesterases hydrolyze esters in seconds; the amide bond is stabilized by nitrogen resonance, demanding much slower hepatic amidase clearance (Slide 28)."
    }
  }
];

step9.config.options = step9.conceptCheck.options.map(opt => ({
  id: opt.id,
  text: opt.text.tr,
  isCorrect: opt.isCorrect,
  misconceptionFeedback: opt.misconceptionFeedback.tr
}));

fs.writeFileSync(lessonPath, JSON.stringify(lesson, null, 2), 'utf8');
console.log('Successfully patched Step 8 and Step 9 options in lesson-09.json!');
