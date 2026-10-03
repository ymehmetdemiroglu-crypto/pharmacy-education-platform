const fs = require('fs');
const path = require('path');

// 1. POLISH LESSON-03
const l3Path = 'courses/pharmacology/lessons/lesson-03.json';
const l3 = JSON.parse(fs.readFileSync(l3Path, 'utf8'));

// Step 3 opt-3c
l3.steps[2].conceptCheck.options[2].text = {
  tr: "Pindolol adrenerjik reseptörleri bırakıp doğrudan parasempatik muskarinik M3 reseptörlerini bloke ederek antikolinerjik bronkodilatasyon yapar.",
  ar: "يترك بيندولول المستقبلات الأدرينرجية ليحصر مباشرة مستقبلات M3 الموسكارينك محدثاً توسعاً قصبياً مضاداً للكولين.",
  en: "Pindolol bypasses adrenergic receptors to directly block parasympathetic muscarinic M3 receptors, inducing anticholinergic bronchodilation."
};
l3.steps[2].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Çapraz reseptör blokajı yanılgısı: Pindolol bir muskarinik M3 antagonisti değildir; bronş tonusunu korumasının nedeni beta-2 reseptörlerinde sürdürdüğü zayıf intrinsik sempatomimetik aktivitedir (alfa ≈ 0.20).",
  ar: "مغالطة الحصار المتصالب: بيندولول ليس مضاداً لمستقبلات M3؛ حماية القصبات تنبع حصراً من نشاطه الودي الداخلي الخفيف على مستقبلات بيتا-2 (alfa ≈ 0.20).",
  en: "Cross-receptor antagonism misconception: Pindolol does not block muscarinic M3 receptors; airway protection stems strictly from its weak intrinsic sympathomimetic activity at beta-2 receptors."
};

// Step 12 opt-12c
l3.steps[11].conceptCheck.options[2].text = {
  tr: "Yalnızca ilacın plazma serbest konsantrasyonu ile böbrek glomerüler filtrasyon hızı (GFR).",
  ar: "فقط تركيز الدواء الحر في البلازما ومعدل الرشح الكبيبي الكلوي (GFR).",
  en: "Solely the free plasma drug concentration and the patient's glomerular filtration rate (GFR)."
};
l3.steps[11].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Farmakokinetik indirgemecilik yanılgısı: Plazma konsantrasyonu ve GFR yalnızca ilacın hedefe ulaşma miktarını belirler; ilacın dokuda tam mı parsiyel mi davranacağı ilacın intrinsik efikasitesi (e) ile dokunun reseptör rezervinin (yedek reseptör) etkileşimiyle belirlenir.",
  ar: "مغالطة الاختزال الحركي: يحدد التركيز والرشح وصول الدواء فقط؛ بينما يحدد سلوكه كمنبه كامل أو جزئي التفاعل بين الفعالية الذاتية (e) والاحتياطي الوظيفي للمستقبلات في النسيج.",
  en: "Pharmacokinetic reductionism fallacy: Plasma levels and GFR determine drug exposure; whether an agent acts as a full or partial agonist is governed by intrinsic efficacy (e) interacting with tissue receptor reserve."
};

// Sync config.options for Lesson 03
l3.steps.forEach(s => {
  if (s.conceptCheck?.options && s.config) {
    s.config.options = s.conceptCheck.options.map(o => ({
      id: o.id,
      text: o.text?.tr || o.text,
      isCorrect: o.isCorrect,
      misconceptionFeedback: o.misconceptionFeedback?.tr || o.misconceptionFeedback
    }));
  }
});

fs.writeFileSync(l3Path, JSON.stringify(l3, null, 2), 'utf8');
const docL3Path = 'c:/Users/hp/Documents/antigravity/valiant-raman/courses/pharmacology/lessons/lesson-03.json';
if (fs.existsSync(path.dirname(docL3Path))) {
  fs.writeFileSync(docL3Path, JSON.stringify(l3, null, 2), 'utf8');
}


// 2. POLISH LESSON-04
const l4Path = 'courses/pharmacology/lessons/lesson-04.json';
const l4 = JSON.parse(fs.readFileSync(l4Path, 'utf8'));

// Step 1 opt-1c
l4.steps[0].conceptCheck.options[2].text = {
  tr: "Adrenalin fenoksibenzaminle temas ettiği anda tüm alfa reseptörlerini endositozla hücre içine çeker ve reseptör havuzunu yok eder.",
  ar: "يقوم الأدرينالين فور ملامسة فينوكسي بنزامين ببلعمة جميع مستقبلات ألفا لداخل الخلية وتدمير مخزون المستقبلات.",
  en: "Adrenaline instantly triggers complete endocytosis of all alpha receptors upon contact with phenoxybenzamine, destroying the surface receptor pool."
};
l4.steps[0].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Ani internalizasyon yanılgısı: Reseptör endositozu ve down-regülasyonu dakikalar-saatler süren hücresel bir süreçtir; fenoksibenzamin blokajının aşılamamasının nedeni reseptörün aktif bölgesindeki kalıcı kovalent alkilasyondur.",
  ar: "مغالطة البلعمة الفورية: سحب المستقبلات عملية خلوية بطيئة؛ عدم القدرة على تجاوز حصار فينوكسي بنزامين سببه الألكلة التساهمية الدائمة للموقع الفعال.",
  en: "Instantaneous internalization misconception: Receptor downregulation requires minutes to hours; phenoxybenzamine insurmountable blockade is strictly caused by irreversible covalent alkylation."
};

// Step 6 opt-6c
l4.steps[5].conceptCheck.options[2].text = {
  tr: "Allosterik antagonist iyon kanalının iç lümenine fiziksel bir tıkaç gibi oturarak ortosterik cebin açılmasını tamamen engeller.",
  ar: "يستقر المضاد اللابؤري كمسدادة في لمعة قناة الأيونات مانعاً انفتاح الجيب الرئيسي فيزيائياً.",
  en: "The allosteric antagonist acts as a physical plug inside the channel pore, sterically preventing ion flux regardless of orthosteric binding."
};
l4.steps[5].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Kanal tıkacı yanılgısı: Allosterik modülatörler kanalı fiziksel olarak tıkamaz; reseptörün dış/allosterik cebine bağlanıp protein konformasyonunu değiştirerek ortosterik sinyal iletimini bozar (negatif allosterik modülasyon).",
  ar: "مغالطة السدادة الفيزيائية: لا تسد المعدلات اللابؤرية القناة فيزيائياً؛ بل تغير الشكل الفراغي للمستقبل عبر جيب خارجي لتعطيل نقل الإشارة.",
  en: "Pore-plugging misconception: Allosteric antagonists do not physically occlude the pore; they bind distinct regulatory domains to induce conformational changes that disrupt efficacy."
};

// Step 11 opt-11b & opt-11c
l4.steps[10].conceptCheck.options[1].text = {
  tr: "Prazosin cerrahi sırasında refleks sempatik deşarjı tamamen durdurarak hastada derin refrakter kardiyak şoka yol açar.",
  ar: "يوقف برازوسين التفريغ الودي الانعكاسي تماماً أثناء الجراحة مما يدخل المريض في صدمة قلبية معندة.",
  en: "Prazosin completely abolishes reflex sympathetic tone during surgery, plunging the patient into profound refractory cardiogenic shock."
};
l4.steps[10].conceptCheck.options[1].misconceptionFeedback = {
  tr: "Kardiyak şok yanılgısı: Prazosinin temel sorunu şok değil, tam aksine cerrah tümöre dokunduğunda salınan devasa katekolaminlerin yarışmalı prazosin blokajını kolayca aşarak ölümcül hipertansif krize yol açmasıdır.",
  ar: "مغالطة الصدمة القلبية: الخطر الحقيقي ليس الصدمة، بل قدرة عاصفة الكاتيكولامينات الجراحية على إزاحة برازوسين التنافسي وإحداث نوبة فرط ضغط قاتلة.",
  en: "Cardiogenic shock fallacy: The clinical hazard is not circulatory collapse, but the massive intraoperative catecholamine surge displacing competitive prazosin to trigger hypertensive crisis."
};

l4.steps[10].conceptCheck.options[2].text = {
  tr: "Fenoksibenzamin doğrudan adrenal medullaya girerek tirozin hidroksilaz enzimini inhibe eder ve katekolamin üretimini sıfırlar.",
  ar: "يدخل فينوكسي بنزامين مباشرة إلى لب الكظر ويثبط إنزيم تيروزين هيدروكسيلاز ليوقف تصنيع الكاتيكولامينات.",
  en: "Phenoxybenzamine enters adrenal chromaffin cells to directly inhibit tyrosine hydroxylase, halting catecholamine biosynthesis at the source."
};
l4.steps[10].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Biyosentez inhibisyonu yanılgısı: Fenoksibenzamin bir katekolamin sentez inhibitörü (örn. metirozosin) değildir; periferik damarlardaki alfa-adrenerjik reseptörleri kovalent bloke ederek dolaşımdaki yüksek adrenalinin damarları kasmasını engeller.",
  ar: "مغالطة تثبيط التصنيع: فينوكسي بنزامين ليس مثبطاً للإنزيمات؛ بل يحصر مستقبلات ألفا الوعائية تساهمياً ليمنع تضيق الأوعية بالعاصفة الكاتيكولامينية.",
  en: "Biosynthesis inhibition fallacy: Phenoxybenzamine does not inhibit tyrosine hydroxylase (like metyrosine); it covalently locks vascular alpha-receptors against circulating catecholamines."
};

// Sync config.options for Lesson 04
l4.steps.forEach(s => {
  if (s.conceptCheck?.options && s.config) {
    s.config.options = s.conceptCheck.options.map(o => ({
      id: o.id,
      text: o.text?.tr || o.text,
      isCorrect: o.isCorrect,
      misconceptionFeedback: o.misconceptionFeedback?.tr || o.misconceptionFeedback
    }));
  }
});

fs.writeFileSync(l4Path, JSON.stringify(l4, null, 2), 'utf8');
const docL4Path = 'c:/Users/hp/Documents/antigravity/valiant-raman/courses/pharmacology/lessons/lesson-04.json';
if (fs.existsSync(path.dirname(docL4Path))) {
  fs.writeFileSync(docL4Path, JSON.stringify(l4, null, 2), 'utf8');
}

console.log('Successfully decontaminated distractors in Pharmacology Wave 2 (L03 & L04)!');
