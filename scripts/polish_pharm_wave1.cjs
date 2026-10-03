const fs = require('fs');
const path = require('path');

// 1. POLISH LESSON-01
const l1Path = 'courses/pharmacology/lessons/lesson-01.json';
const l1 = JSON.parse(fs.readFileSync(l1Path, 'utf8'));

// Step 3 opt-3c
l1.steps[2].conceptCheck.options[2].text = {
  tr: "İlaç molekülü reseptör cebine bir bozuk para gibi mekanik olarak sıkışır; hiçbir elektrostatik çekim kuvveti rol oynamaz.",
  ar: "ينحشر جزيء الدواء ميكانيكياً في جيب المستقبل كقطعة نقدية دون أي دور لقوى التجاذب الكهروستاتيكي.",
  en: "The drug molecule mechanically wedges into the receptor pocket like a coin in a slot without requiring electrostatic attractions."
};
l1.steps[2].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Mekanik sıkışma yanılgısı: Reseptör bağlanması makroskobik mekanik bir kilitlenme değildir; tamamlayıcı kimyasal grupların Coulomb, dipol, hidrojen ve van der Waals etkileşimlerinin elektrostatik dengesidir.",
  ar: "مغالطة الانحشار الميكانيكي: الارتباط بالمستقبل ليس انحشاراً ميكانيكياً؛ بل هو توازن كهروستاتيكي دقيق لقوى كولوم والروابط الهيدروجينية وفان دير فالس.",
  en: "Mechanical wedging fallacy: Receptor binding is not macro-mechanical entrapment; it requires precise electronic complementarity across ionic, hydrogen, and dispersion fields."
};

// Step 6 opt-6b & opt-6c
l1.steps[5].conceptCheck.options[1].text = {
  tr: "Sulu ortamdaki su kılıfı polar grupları tamamen bloke eder; birden fazla bağ kurulsa dahi net serbest enerji sıfıra yakın kalır.",
  ar: "يحجب الغلاف المائي المحيط المجموعات القطبية تماماً؛ ومهما تعددت الروابط تظل الطاقة الحرة الكلية قريبة من الصفر.",
  en: "Bulk water hydration shells shield polar groups entirely; even with multiple contacts, net binding free energy remains near zero."
};
l1.steps[5].conceptCheck.options[1].misconceptionFeedback = {
  tr: "Solvatasyon engeli yanılgısı: Desolvatasyon endotermik bir bedel gerektirse de, bağlanma cebinde suyun dışarı atılması (hidrofobik entropi artışı) ve tamamlayıcı bağlar bu bedeli fazlasıyla aşarak net Delta G°'ı negatif ve yüksek afiniteli yapar.",
  ar: "مغالطة حاجز الإماهة: طرد جزيئات الماء من الجيب يولد كسباً إنتروبياً هائلاً يتجاوز كلفة نزع الماء، جاعلاً الطاقة الحرة سالبة ومحققة للألفة العالية.",
  en: "Solvation barrier fallacy: Water displacement from the binding pocket provides favorable entropic gain that easily overcomes desolvation penalties, yielding high negative Delta G."
};

l1.steps[5].conceptCheck.options[2].text = {
  tr: "Aynı anda 5 non-kovalent bağ kurulduğunda ayrışma hızı (koff) sıfıra iner ve ilaç kovalent bir ajan gibi kalıcı kilitlenir.",
  ar: "عند تشكل 5 روابط غير تساهمية معاً، تنعدم سرعة التفكك (koff) ويُقفل الدواء بصورة دائمة كأنه عامل تساهمي.",
  en: "Simultaneous formation of five non-covalent bonds forces dissociation rate (koff) to zero, locking the drug irreversibly like a covalent alkylator."
};
l1.steps[5].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Kalıcı kilitlenme yanılgısı: Non-kovalent bağların enerjisi (-10 ila -15 kcal/mol) çok yüksek bir afinite ve uzun rezidans süresi sağlasa da termodinamik denge korunur; koff asla sıfır olamaz ve ilaç konsantrasyonu düşünce serbestleşir.",
  ar: "مغالطة القفل الدائم: الطاقة غير التساهمية (-10 إلى -15) تمنح ألفة عالية لكن التوازن الحركي يبقى محفوظاً؛ koff لا تنعدم أبداً ويتفكك الدواء عند هبوط تركيزه.",
  en: "Non-covalent permanence misconception: Multi-point non-covalent contacts yield nanomolar affinity but retain dynamic reversibility; koff remains non-zero, allowing clearance."
};

// Step 9 opt-9b & opt-9c
l1.steps[8].conceptCheck.options[1].text = {
  tr: "EDTA gastrointestinal kanalda bir reçine gibi davranıp metalleri çöktürür; kana geçmeden feçesle atılmalarını sağlar.",
  ar: "يعمل EDTA في الجهاز الهضمي كراتنج يرسب المعادن لطرحها في البراز دون امتصاص إلى مجرى الدم.",
  en: "EDTA acts strictly as a non-absorbable gastrointestinal exchange resin, precipitating ingested heavy metals for fecal elimination."
};
l1.steps[8].conceptCheck.options[1].misconceptionFeedback = {
  tr: "İntestinal sekestrasyon yanılgısı: EDTA parenteral yolla (IV) kanda dolaşıma verilir; sistemik dokulardaki kurşun ve ağır metalleri heksadentat koordinasyon kompleksiyle sarıp idrarla atar.",
  ar: "مغالطة الحصر المعوي: يُحقن EDTA وريدياً ليدور في الدم؛ فيشلب الرصاص والمعادن في النسج العميقة عبر معقدات سداسية الإحاطة لتطرح كلوياً.",
  en: "Intestinal sequestration misconception: EDTA is administered intravenously to chelate systemic tissue and plasma lead into soluble hexadentate complexes for renal excretion."
};

l1.steps[8].conceptCheck.options[2].text = {
  tr: "Serbest EDTA kanda tamamen protonlanmış (nötr) haldedir; bu nedenle divalent katyonlarla kompleks kuramaz ve etkisiz kalır.",
  ar: "يكون EDTA الحر مبرتناً بالكامل (متعادلاً) في الدم، مما يمنعه تماماً من تشكيل معقدات مع الكاتيونات ثنائية التكافؤ.",
  en: "Free EDTA is fully protonated and neutral at pH 7.4, making it electronically incapable of coordinating divalent blood cations."
};
l1.steps[8].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Protonlanma yanılgısı: Fizyolojik pH 7.4'te EDTA'nın karboksilat grupları iyonizedir (-COO-); serbest EDTA verildiğinde kandaki Ca2+ iyonlarını derhal şelatlar ve ölümcül hipokalsemik tetani tetikler.",
  ar: "مغالطة البرتنة: عند باهاء الدم 7.4 تكون كربوكسيلات EDTA متأينة بشحنة سالبة، فتشلب فوراً Ca2+ مسببة كزازاً نقص كلسياً قاتلاً.",
  en: "Protonation fallacy: At physiologic pH 7.4, EDTA carboxylates are largely ionized and chelate ambient Ca2+ with extreme avidity, inducing fatal hypocalcemic tetany."
};

// Step 10 opt-10c
l1.steps[9].conceptCheck.options[2].text = {
  tr: "İlaçlar sadece membran lipit çift katmanında pasif olarak çözünür; spesifik protein makromoleküllerini hedeflemezler.",
  ar: "تنحل الأدوية فقط بشكل غير فعال في طبقة الفوسفوليبيد الثنائية للغشاء دون استهداف جزيئات بروتينية نوعية.",
  en: "Drugs exert effects solely by non-specifically partitioning into the membrane lipid bilayer without interacting with protein targets."
};
l1.steps[9].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Lipit çözünme yanılgısı: Bazı genel anestezikler membran lipitlerini etkilese de, modern farmakolojide ilaçların %95'i spesifik 4 protein hedefini (reseptörler, enzimler, kanallar, taşıyıcılar) stereoseçici olarak bağlar.",
  ar: "مغالطة الانحلال الدهني: تستهدف 95% من الأدوية 4 فئات بروتينية نوعية (مستقبلات، إنزيمات، قنوات، نواقل) عبر تطابق بنيوي فراغي دقيق.",
  en: "Lipid partitioning misconception: While general anesthetics perturb membranes, 95% of therapeutic drugs stereoselectively engage specific protein targets."
};

// Step 11 opt-11b
l1.steps[10].conceptCheck.options[1].text = {
  tr: "Van der Waals kuvvetleri mesafeden bağımsızdır ve ilacı uzaktan çeker; iyonik bağ ise ancak atomlar birbirine doğrudan temas edince doğar.",
  ar: "قوى فان دير فالس مستقلة عن المسافة وتجذب الدواء من بعيد؛ بينما لا تنشأ الرابطة الأيونية إلا عند التماس المباشر.",
  en: "Van der Waals forces act over long distances to steer the ligand; ionic forces only arise upon direct van der Waals surface contact."
};
l1.steps[10].conceptCheck.options[1].misconceptionFeedback = {
  tr: "Menzil bağımlılığı yanılgısı: Tam tersi! İyonik Coulomb kuvvetleri 1/r² ile azalarak uzun menzilde yönlendirme (steering) yapar; van der Waals ise 1/r⁶ ile mesafeye aşırı duyarlıdır ve sadece atomlar birbirine dokunma mesafesine (3-4 Å) geldiğinde devreye girer.",
  ar: "مغالطة التبعية للمسافة: العكس تماماً! قوى كولوم الأيونية تتناسب مع 1/r² لتوجه الدواء من مسافة بعيدة؛ بينما تتطلب فان دير فالس تماساً وثيقاً (1/r⁶).",
  en: "Inverted distance dependence fallacy: Coulombic ionic fields scale as 1/r2 to steer ligands from afar; van der Waals forces scale sharply as 1/r6, operating only at close contact."
};

// Sync config.options for Lesson 01
l1.steps.forEach(s => {
  if (s.conceptCheck?.options && s.config) {
    s.config.options = s.conceptCheck.options.map(o => ({
      id: o.id,
      text: o.text?.tr || o.text,
      isCorrect: o.isCorrect,
      misconceptionFeedback: o.misconceptionFeedback?.tr || o.misconceptionFeedback
    }));
  }
});

fs.writeFileSync(l1Path, JSON.stringify(l1, null, 2), 'utf8');
const docL1Path = 'c:/Users/hp/Documents/antigravity/valiant-raman/courses/pharmacology/lessons/lesson-01.json';
if (fs.existsSync(path.dirname(docL1Path))) {
  fs.writeFileSync(docL1Path, JSON.stringify(l1, null, 2), 'utf8');
}


// 2. POLISH LESSON-02
const l2Path = 'courses/pharmacology/lessons/lesson-02.json';
const l2 = JSON.parse(fs.readFileSync(l2Path, 'utf8'));

// Step 4 opt-4b
l2.steps[3].conceptCheck.options[1].text = {
  tr: "Logaritmik eksen reseptörler arasında pozitif kooperativite yaratır ve Hill katsayısını 1'den 4'e yükseltir.",
  ar: "يخلق المحور اللوغاريتمي تعاونية إيجابية بين المستقبِلات ويرفع معامل هيل من 1 إلى 4.",
  en: "Logarithmic plotting induces positive cooperativity among binding sites, altering the intrinsic Hill coefficient from 1 to 4."
};
l2.steps[3].conceptCheck.options[1].misconceptionFeedback = {
  tr: "Matematiksel vs biyolojik yanılgı: Logaritma ekseni sadece bir veri ekseni dönüşümüdür; ilacın bağlanma mekanizmasını, kooperativitesini veya Hill katsayısını biyolojik olarak değiştiremez.",
  ar: "مغالطة الخلط الرياضي الحيوي: التحويل اللوغاريتمي مجرد أداة بيانية لعرض البيانات ولا يغير الخصائص الحيوية للمستقبل أو معامل هيل.",
  en: "Mathematical vs biological fallacy: Logarithmic axis scaling is purely a graphic display transformation; it cannot alter physical binding cooperativity or Hill coefficients."
};

// Step 8 opt-8c
l2.steps[7].conceptCheck.options[2].text = {
  tr: "0.693 saniye; rezidans süresi ilacın reseptör yarı ömrüne (t1/2) eşittir ve formülü tau = ln(2) * koff şeklindedir.",
  ar: "0.693 ثانية؛ متوسط زمن المكوث يطابق العمر النصفي (t1/2) وصيغته tau = ln(2) * koff.",
  en: "0.693 seconds; residence time is identical to the dissociation half-life (t1/2) and is calculated as tau = ln(2) * koff."
};
l2.steps[7].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Yarı ömür ve tau karışıklığı: Rezidans süresi tau = 1 / koff'tur (1000 saniye); ayrışma yarı ömrü ise t1/2 = ln(2) / koff = 693 saniyedir. koff ile ln(2) çarpılmaz, bölünür.",
  ar: "مغالطة الخلط بين tau والعمر النصفي: زمن المكوث هو tau = 1 / koff (1000 ثانية)؛ أما العمر النصفي فهو t1/2 = ln(2)/koff (693 ثانية).",
  en: "Half-life vs tau confusion: Mean residence time tau = 1/koff (1000 s); dissociation half-life is t1/2 = ln(2)/koff (693 s)."
};

// Step 12 opt-12b
l2.steps[11].conceptCheck.options[1].text = {
  tr: "Egzersiz sırasında salınan yüksek adrenalin tüm beta reseptörlerini 10 saniyede endositozla hücre içine çeker ve kalbi duyarsızlaştırır.",
  ar: "يقوم الأدرينالين المفرز بالجهد بإدخال جميع مستقبلات بيتا بالبلعمة إلى داخل الخلية خلال 10 ثوانٍ مما يعطل التنبيه.",
  en: "Massive adrenaline release during exercise triggers complete receptor endocytosis within 10 seconds, leaving myocardium unresponsive."
};
l2.steps[11].conceptCheck.options[1].misconceptionFeedback = {
  tr: "Akut internalizasyon yanılgısı: Reseptör down-regülasyonu ve endositoz dakikalar-saatler alan bir regülasyon sürecidir; egzersizdeki ani taşikardi baskılanması, xamoterolün yüksek afiniteyle adrenalini yarışmalı olarak reseptörden kovmasından (parsiyel agonist antagonizması) doğar.",
  ar: "مغالطة البلعمة الفورية: يستغرق سحب المستقبلات وقتاً طويلاً؛ كبح تسرع القلب المفاجئ بالجهد ينجم عن إزاحة xamoterol للأدرينالين تنافسياً.",
  en: "Acute internalization misconception: Receptor endocytosis requires minutes to hours; acute exercise blunting is driven by xamoterol competitively displacing full agonist adrenaline."
};

// Sync config.options for Lesson 02
l2.steps.forEach(s => {
  if (s.conceptCheck?.options && s.config) {
    s.config.options = s.conceptCheck.options.map(o => ({
      id: o.id,
      text: o.text?.tr || o.text,
      isCorrect: o.isCorrect,
      misconceptionFeedback: o.misconceptionFeedback?.tr || o.misconceptionFeedback
    }));
  }
});

fs.writeFileSync(l2Path, JSON.stringify(l2, null, 2), 'utf8');
const docL2Path = 'c:/Users/hp/Documents/antigravity/valiant-raman/courses/pharmacology/lessons/lesson-02.json';
if (fs.existsSync(path.dirname(docL2Path))) {
  fs.writeFileSync(docL2Path, JSON.stringify(l2, null, 2), 'utf8');
}

console.log('Successfully polished and decontaminated distractors in Pharmacology Wave 1 (L01 & L02)!');
