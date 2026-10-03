const fs = require('fs');

const lessonPath = 'courses/medchem/lessons/lesson-08.json';
const lesson = JSON.parse(fs.readFileSync(lessonPath, 'utf8'));

// 1. Enrich Step 4 with Newman projection, eclipsed vs staggered
const step4 = lesson.steps[3];
step4.conceptCheck.options[0].misconceptionFeedback = {
  tr: "Kusursuz bilgi! Slayt 40 ve 42: Newman projeksiyonlarında çapraz (staggered) gauche (3.3 Å) ve anti (4.4 Å) rotamerleri enerji çukurlarıdır; çakışık (eclipsed) formlar ise sterik itme tepeleridir. Gauche formu muskarinik, anti formu nikotinik reseptöre seçicilik sağlar.",
  ar: "دقة مثالية! شريحة 40 و 42: في مساقط نيومان (Newman projections) تمثل الهيئات المتقاطعة (staggered) كـ gauche (3.3 Å) و anti (4.4 Å) قيعان استقرار، بينما الهيئات المكسوفة (eclipsed) قمم طاقة. يلائم gauche المسكاريني و anti النيكوتيني.",
  en: "Flawless! Slides 40 & 42: In Newman projections, staggered gauche (3.3 Å) and anti (4.4 Å) rotamers are energy troughs; eclipsed forms are torsional energy peaks. Gauche binds muscarinic GPCRs; anti binds nicotinic channels."
};
step4.config.options[0].misconceptionFeedback = step4.conceptCheck.options[0].misconceptionFeedback.tr;
step4.config.explanation = step4.conceptCheck.options[0].misconceptionFeedback;

// 2. Enrich Step 11 with Peptidomimetics / Macrocyclization bridge
const step11 = lesson.steps[10];
step11.conceptCheck.options[0].misconceptionFeedback = {
  tr: "Harika modül köprüsü! Peptidomimetiklerde ve makrosiklik moleküllerde (makrosiklizasyon) iskelet rijitlenerek hem biyoaktif konformasyon korunur hem de CYP450 metabolik soft-spot'larının enzime yanaşması engellenir (Modül 5 Faz I temeli).",
  ar: "ربط موديولي رائع! في أشباه الببتيدات (peptidomimetics) والجزيئات الحلقية الضخمة (macrocyclization)، يتم تجسئة الهيكل للحفاظ على التشكل الحيوي ومنع وصول نقاط الضعف الاستقلابية لإنزيمات CYP450.",
  en: "Masterful bridge! In peptidomimetics and macrocycles (macrocyclization), scaffold rigidification locks the bioactive pose while sterically shielding metabolic soft-spots from CYP450 oxidation (Module 5 Phase I bridge)."
};
step11.config.options[0].misconceptionFeedback = step11.conceptCheck.options[0].misconceptionFeedback.tr;
step11.config.explanation = step11.conceptCheck.options[0].misconceptionFeedback;

fs.writeFileSync(lessonPath, JSON.stringify(lesson, null, 2), 'utf8');
console.log('Successfully enriched lesson-08 keywords!');
