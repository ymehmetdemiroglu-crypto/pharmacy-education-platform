const fs = require('fs');

const lessonPath = 'courses/medchem/lessons/lesson-10.json';
const lesson = JSON.parse(fs.readFileSync(lessonPath, 'utf8'));

// Step 12 patch
lesson.steps[11].conceptCheck.options[1].text = {
  tr: "Primer amin grubunu kuaterner amonyum tuzuna dönüştürerek molekülün bağırsak UGT ve SULT enzimlerince tanınmasını engelleriz.",
  ar: "تحويل الأمين الأولي إلى ملح أمونيوم رباعي لمنع تعرف إنزيمات UGT و SULT المعوية على الجزيء كلياً.",
  en: "Quaternize the primary amine into a permanent quaternary ammonium salt to block intestinal UGT and SULT enzyme recognition."
};
lesson.steps[11].conceptCheck.options[1].misconceptionFeedback = {
  tr: "Kuaterner amonyum emilim engeli yanılgısı: Kuaterner amonyum oluşturmak ilk geçiş metabolizmasını korumaz; aksine kalıcı pozitif yük ilacın bağırsaktan pasif difüzyonla emilimini sıfırlar ve oral biyoyararlanımı yok eder.",
  ar: "مغالطة الأمونيوم الرباعي: تحويل الأمين إلى أمونيوم رباعي يمنع الامتصاص المعوي بالكامل بسبب الشحنة الدائمة، مما يدمر التوافر الحيوي الفموي.",
  en: "Quaternary ammonium absorption fallacy: Quaternization destroys oral bioavailability entirely by preventing passive gut membrane diffusion."
};

lesson.steps[11].conceptCheck.options[2].text = {
  tr: "Fenolik -OH grubunu kuvvetli asidik bir sülfonik asit (-SO3H) grubu ile değiştirerek bağırsak SULT enzimlerini kalıcı olarak doyururuz.",
  ar: "استبدال هيدروكسيل الفينول بحمض سلفونيك قوي (-SO3H) لإشباع إنزيمات SULT المعوية بشكل دائم.",
  en: "Substitute the phenolic -OH with an irreversible sulfonic acid (-SO3H) moiety to saturate intestinal SULT enzymes."
};
lesson.steps[11].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Kalıcı sülfonasyon yanılgısı: Sülfonik asit biyo-tersinir bir ön-ilaç grubu değildir; plazma esterazları tarafından parçalanıp ana fenolü açığa çıkaramaz ve reseptör afinitesini tamamen yok eder.",
  ar: "مغالطة السلفنة الدائمة: حمض السلفونيك ليس طليعة دوائية عكوسة حيوياً؛ لا تفككه إسترازات البلازما ويدمر ألفة الارتباط بالمستقبل.",
  en: "Irreversible sulfonation fallacy: Sulfonic acids are not bio-reversible prodrugs; they resist plasma esterases, permanently disabling receptor binding."
};

// Mirror into config.options
lesson.steps[11].config.options = lesson.steps[11].conceptCheck.options.map(opt => ({
  id: opt.id,
  text: opt.text?.tr || opt.text,
  isCorrect: opt.isCorrect,
  misconceptionFeedback: opt.misconceptionFeedback?.tr || opt.misconceptionFeedback
}));

fs.writeFileSync(lessonPath, JSON.stringify(lesson, null, 2), 'utf8');
fs.writeFileSync('c:/Users/hp/Documents/antigravity/valiant-raman/courses/medchem/lessons/lesson-10.json', JSON.stringify(lesson, null, 2), 'utf8');
console.log('Successfully polished Step 12 distractors in lesson-10.json!');
