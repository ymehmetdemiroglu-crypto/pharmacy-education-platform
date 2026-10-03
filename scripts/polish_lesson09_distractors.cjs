const fs = require('fs');

const lessonPath = 'courses/medchem/lessons/lesson-09.json';
const lesson = JSON.parse(fs.readFileSync(lessonPath, 'utf8'));

// Step 1
lesson.steps[0].conceptCheck.options[1].text = {
  tr: "Fenasetin gastrointestinal kanalda mide asidi ve pepsin tarafından doğrudan parasetamole hidroliz edilir; karaciğer metabolizmasına gerek kalmaz.",
  ar: "يتحلمه الفيناسيتين في السبيل الهضمي بواسطة حمض المعدة والببسين مباشرة إلى باراسيتامول دون الحاجة لاستقلاب كبدي.",
  en: "Phenacetin is hydrolyzed directly by stomach acid and pepsin into paracetamol in the gut lumen without requiring liver CYP enzymes."
};
lesson.steps[0].conceptCheck.options[1].misconceptionFeedback = {
  tr: "Mide hidrolizi yanılgısı: Eter bağları asidik mide ortamında stabildir ve non-enzimatik hidrolize dirençlidir; O-dealkilasyon karaciğer mikrozomal CYP enzimleri tarafından gerçekleştirilir.",
  ar: "مغالطة الحلمهة المعدية: الروابط الإيثرية مستقرة تماماً في الوسط المعدي الحمضي؛ تفاعل نزع الألكيل عن الأكسجين يتم حصرياً بإنزيمات CYP الكبدية.",
  en: "Gastric hydrolysis fallacy: Ether linkages resist acid hydrolysis in the stomach; oxidative O-dealkylation strictly requires hepatic microsomal CYP monooxygenases."
};

lesson.steps[0].conceptCheck.options[2].text = {
  tr: "Fenasetin herhangi bir metabolik dönüşüme uğramaz; etoksi grubu sayesinde doğrudan COX enzimini parasetamolden daha güçlü inhibe eder.",
  ar: "لا يخضع الفيناسيتين لأي استقلاب؛ إذ تثبط مجموعته الإيثوكسية إنزيم COX بشكل أقوى من الباراسيتامول مباشرة.",
  en: "Phenacetin undergoes no metabolic transformation; its intact ethoxy group directly inhibits COX enzymes more potently than paracetamol."
};
lesson.steps[0].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Doğrudan intakt etki yanılgısı: Etoksi grubunun sterik engeli COX cebine oturmayı engeller; analjezik etki ancak etil grubunun kopup serbest fenolik hidroksilin (parasetamol) açığa çıkmasıyla doğar.",
  ar: "مغالطة الفعالية المباشرة: الإعاقة الحجمية للإيثوكسي تمنع ملاءمة جيب COX؛ التأثير المسكن ينشأ فقط بعد تحرر هيدروكسيل الفينول الحر (باراسيتامول).",
  en: "Direct intact efficacy misconception: Bulky ethoxy steric hindrance impedes COX binding; analgesia depends on liberating the free phenolic hydroxyl (paracetamol)."
};

// Step 2
lesson.steps[1].conceptCheck.options[1].text = {
  tr: "Hem demirindeki Fe2+, moleküler oksijeni hidrojen peroksite (H2O2) indirger ve ortama serbest H2O2 salarak C-H bağını oksitler.",
  ar: "يقوم حديد الهيم Fe2+ بإرجاع الأكسجين إلى فوق أكسيد الهيدروجين (H2O2) مطلقاً إياه في العصارة الخلوية لأكسدة الرابطة.",
  en: "Heme Fe2+ reduces molecular oxygen to hydrogen peroxide (H2O2) and releases free peroxide into the cytosol to attack C-H bonds."
};
lesson.steps[1].conceptCheck.options[1].misconceptionFeedback = {
  tr: "Serbest peroksit yanılgısı: Katalitik döngüde serbest peroksit hücresel ortama salınmaz; oksijen hem demirine koordineli kalır ve yüksek enerjili oksen-demir radikal ara ürünü [Fe4+=O]•+ oluşturur.",
  ar: "مغالطة البيروكسيد الحر: لا ينطلق بيروكسيد حر في الخلية؛ يبقى الأكسجين مرتبطاً بالحديد مشكلاً وسيط أوكسو-حديد عالي الطاقة [Fe4+=O]•+.",
  en: "Free peroxide fallacy: Catalysis does not leak free toxic H2O2 into the cytosol; oxygen stays coordinated to form the high-energy ferryl-oxo radical [Fe4+=O]•+."
};

lesson.steps[1].conceptCheck.options[2].text = {
  tr: "Enzim doğrudan sitozoldeki serbest hidroksit (OH-) iyonlarını substratın C-H bağına transfer ederek nükleofilik yer değiştirme yapar.",
  ar: "يقوم الإنزيم بنقل أيونات الهيدروكسيد الحرة (OH-) مباشرة من العصارة الخلوية لاستبدال رابطة C-H نكليوفيلياً.",
  en: "The enzyme recruits ambient cytosolic hydroxide ions (OH-) to directly displace hydride at the inert C-H bond via nucleophilic substitution."
};
lesson.steps[1].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Nükleofilik hidroksit atağı yanılgısı: Alifatik ve aromatik C-H bağları non-polardır ve serbest OH- ile yer değiştirmez; CYP450 elektrofilik bir radikal hidrojen koparma mekanizması kullanır.",
  ar: "مغالطة الاستبدال النكليوفيلي: روابط C-H غير قطبية وخاملة لا تتفاعل مع OH-؛ يعتمد CYP450 آلية جذرية إلكتروفيلية لانتزاع الهيدروجين.",
  en: "Nucleophilic hydroxide fallacy: Inert non-polar C-H bonds do not undergo nucleophilic attack by OH-; CYP450 utilizes electrophilic radical hydrogen abstraction."
};

// Step 3
lesson.steps[2].conceptCheck.options[1].text = {
  tr: "Oksijen atomu doğrudan C-C bağı arasına bir kama gibi girerek karbon atomlarını birbirinden ayırır ve molekülü ikiye böler.",
  ar: "تدخل ذرة الأكسجين مباشرة كإسفين بين رابطة C-C فتفصل ذرتي الكربون وتقسم الجزيء إلى نصفين.",
  en: "The oxygen atom wedges directly into C-C sigma bonds, cleaving the carbon skeleton into two smaller fragments."
};
lesson.steps[2].conceptCheck.options[1].misconceptionFeedback = {
  tr: "C-C klivaj yanılgısı: Standart monooksijenasyon C-C bağlarını koparmaz; hidroksilasyon yalnızca bir C-H bağını C-OH bağına dönüştürür (oksijen geri sıçrama mekanizması).",
  ar: "مغالطة انشطار الهيكل الكربوني: الأكسدة الأحادية القياسية لا تكسر روابط C-C؛ الهدرلة تحول فقط رابطة C-H إلى C-OH عبر آلية الارتداد.",
  en: "C-C cleavage fallacy: Standard monooxygenation preserves carbon frameworks; hydroxylation converts a C-H bond into C-OH via the oxygen rebound pathway."
};

lesson.steps[2].conceptCheck.options[2].text = {
  tr: "Hem demiri substratın tüm elektronlarını çekerek ilacı serbest bir karbokatyon haline getirir; ortamdaki su molekülü bu karbokatyonu yakalar.",
  ar: "يسحب حديد الهيم جميع الإلكترونات من الركيزة محولاً إياها إلى كربوكاتيون حر تلتقطه جزيئات الماء المحيطة.",
  en: "Heme iron strips two electrons to form a free carbocation intermediate that is subsequently trapped by bulk solvent water molecules."
};
lesson.steps[2].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Karbokatyon ve su hidrasyonu yanılgısı: CYP450 oksidasyonunda oksijen kaynağı su (H2O) değil, moleküler oksijendir (O2); ara ürün ise karbokatyon değil serbest radikaldir.",
  ar: "مغالطة الإماهة بالماء: مصدر الأكسجين في CYP450 هو الأكسجين الجزيئي O2 وليس ماء الوسط H2O، والوسيط جذري وليس كربوكاتيون.",
  en: "Carbocation solvent hydration fallacy: The incorporated oxygen originates from molecular O2, not water (H2O), and proceeds via radical rebound, not carbocations."
};

// Step 4
lesson.steps[3].conceptCheck.options[1].text = {
  tr: "Epoksit halkası açıldıktan sonra komşu karbondaki hidrojen doğrudan çözeltiye bir proton (H+) olarak ayrılır; hiçbir atom göç etmez.",
  ar: "بعد انفتاح حلقة الإيبوكسيد، ينفصل هيدروجين الكربون المجاور كبروتون حر في المحلول دون حدوث أي هجرة للذرات.",
  en: "Upon epoxide opening, the adjacent hydrogen departs directly into bulk solution as a free proton without intramolecular migration."
};
lesson.steps[3].conceptCheck.options[1].misconceptionFeedback = {
  tr: "Doğrudan proton kaybı yanılgısı: Slayt 16: İzotop deneyleri hidrojenin çözeltiye gitmediğini, pozitif yüklü komşu karbona göç ettiğini (NIH 1,2-hidrit kayması) kanıtlamıştır.",
  ar: "مغالطة الفقد المباشر للبروتون: شريحة 16: أثبتت النظائر أن الهيدروجين لا يغادر للمحلول بل يهاجر للكربون المجاور (هجرة NIH الهيدريدية 1،2).",
  en: "Direct proton departure fallacy: Slide 16: Isotope tracing proves hydrogen does not leave into solvent; it migrates to adjacent carbocation (NIH 1,2-hydride shift)."
};

lesson.steps[3].conceptCheck.options[2].text = {
  tr: "Aren oksit halkası doğrudan epoksit hidrolaz olmaksızın dioksetana oksitlenir ve benzen halkası fenol oluşturmadan parçalanır.",
  ar: "تتأكسد حلقة الأرين أوكسيد تلقائياً إلى ديوكسيتان وينشطر البنزين دون تشكل أي فينول مستقر.",
  en: "The arene oxide oxidizes spontaneously into a dioxetane intermediate, cleaving the benzene ring without generating phenol."
};
lesson.steps[3].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Halka parçalanma yanılgısı: Aren oksit halka parçalanmasına uğramaz; keto-enol tautomerisi yoluyla kararlı fenol yapısına geri döner.",
  ar: "مغالطة تفكك الحلقة: الأرين أوكسيد لا يفكك الحلقة العطرية بل يعيد تشكيل الفينول المستقر عبر التماكب الكيتوني-الإينولي.",
  en: "Ring fragmentation fallacy: Arene oxides do not fragment the aromatic nucleus; keto-enol tautomerism re-aromatizes the system to stable phenol."
};

// Step 6
lesson.steps[5].conceptCheck.options[1].text = {
  tr: "Enzim heteroatom ile alkil grubu arasındaki bağı doğrudan homolitik olarak koparır ve serbest metil radikalleri açığa çıkarır.",
  ar: "يقوم الإنزيم بكسر الرابطة بين الذرة غير المتجانسة ومجموعة الألكيل كسرًا متجانساً مطلقاً جذور ميثيل حرة.",
  en: "The enzyme directly homolytically cleaves the heteroatom-carbon bond, releasing highly reactive free methyl radicals into solution."
};
lesson.steps[5].conceptCheck.options[1].misconceptionFeedback = {
  tr: "Doğrudan heteroatom bağı kopması yanılgısı: Slayt 20: Dealkilasyon doğrudan heteroatom bağına saldırmaz; alkilin alfa-karbonunu hidroksilleyerek kararsız hemiaminal/hemiasetal üzerinden parçalanır.",
  ar: "مغالطة الكسر المباشر للرابطة: شريحة 20: لا يهاجم الإنزيم الرابطة مباشرة، بل يهدرل كربون ألفا مشكلاً وسيط هيمي أمينال غير مستقر يتفكك تلقائياً.",
  en: "Direct bond cleavage fallacy: Slide 20: Dealkylation does not attack the heteroatom bond directly; alpha-carbon hydroxylation forms an unstable hemiaminal/hemiacetal intermediate."
};

lesson.steps[5].conceptCheck.options[2].text = {
  tr: "Dealkilasyon reaksiyonunda alkil grubu önce karboksilik aside dönüşür, ardından dekarboksilaz enzimi ile CO2 olarak uçar.",
  ar: "تتحول مجموعة الألكيل أولاً إلى حمض كربوكسيلي كامل ثم ينزع إنزيم الديكاربوكسيلاز غاز CO2.",
  en: "The alkyl substituent is fully oxidized to a carboxylic acid before a decarboxylase cleaves it as carbon dioxide gas."
};
lesson.steps[5].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Dekarboksilasyon yanılgısı: Alkil grupları karboksilik aside gitmez; alfa-karbon hidroksilasyonu sonucu aldehit (formaldehit veya asetaldehit) olarak açığa çıkar.",
  ar: "مغالطة نزع الكربوكسيل: لا تتحول السلسلة لحمض كربوكسيلي، بل تتحرر كألدهيد (فورمالدهيد أو أسيتالدهيد) عند انهيار وسيط ألفا-هيدروكسي.",
  en: "Decarboxylation fallacy: Alkyl fragments are liberated as aldehydes (formaldehyde, acetaldehyde) upon alpha-hydroxy intermediate collapse, not as CO2."
};

// Step 7
lesson.steps[6].conceptCheck.options[1].text = {
  tr: "Terminal metil grubu sterik olarak en engelli bölgedir, bu yüzden enzim oraya asla yanaşamaz ve sadece (omega-1)'e ulaşabilir.",
  ar: "مجموعة الميثيل الطرفية محجوبة فراغياً تماماً ولذلك يستحيل على الإنزيم الوصول إليها فيكتفي بأوميغا-1.",
  en: "The terminal methyl carbon is sterically shielded, preventing CYP enzyme access and restricting oxidation exclusively to (omega-1)."
};
lesson.steps[6].conceptCheck.options[1].misconceptionFeedback = {
  tr: "Metil sterik engel yanılgısı: Terminal metil (omega) sterik olarak en açık pozisyondur; ancak (omega-1) hidroksilasyonu sekonder radikal kararlılığı nedeniyle termodinamik olarak sıklıkla baskındır.",
  ar: "مغالطة الإعاقة الحجمية للميثيل: الميثيل الطرفي هو الأكثر انكشافاً فراغياً؛ لكن أكسدة أوميغا-1 تسود ديناميكياً لاستقرار الجذر الثانوي.",
  en: "Methyl steric hindrance fallacy: Terminal methyl (omega) is sterically unhindered; however, (omega-1) oxidation frequently dominates due to secondary radical resonance stability."
};

lesson.steps[6].conceptCheck.options[2].text = {
  tr: "Karaciğer enzimleri moleküler kütlesi çift olan yan zincirleri tanırken, tek sayılı karbon zincirlerini metabolize edemez.",
  ar: "إنزيمات الكبد تستقلب فقط السلاسل الجانبية ذات الأعداد الزوجية من الكربون وتعجز عن التعرف على السلاسل الفردية.",
  en: "Hepatic enzymes possess an obligate preference for even-numbered carbon chains, completely unable to metabolize odd-numbered alkyl substituents."
};
lesson.steps[6].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Karbon sayısı kuralı yanılgısı: Yağ asidi beta-oksidasyonu ile karıştırılan bir yanılgıdır; CYP450 mono-oksijenazlar zincir uzunluğundan bağımsız olarak alifatik C-H bağlarını hidroksiller.",
  ar: "مغالطة عدد الكربونات: خلط مع أكسدة بيتا للحموض الدسمة؛ إنزيمات CYP تهدرل روابط C-H الأليفاتية بغض النظر عن طول السلسلة.",
  en: "Chain number parity fallacy: Conflates fatty acid beta-oxidation with CYP450; microsomal monooxygenases oxidize alkyl C-H bonds irrespective of chain parity."
};

// Step 8
lesson.steps[7].conceptCheck.options[1].text = {
  tr: "Prokainamid bir amit olduğu için kanda hiç çözünmez ve kan damarlarının endoteline yapışıp depolanır.",
  ar: "البروكايناميد كونه أميداً لا يذوب في بلازما الدم نهائياً ويترسب على جدران الأوعية الدموية.",
  en: "Procainamide, as an amide, is completely insoluble in blood plasma and precipitates onto vascular endothelial walls."
};
lesson.steps[7].conceptCheck.options[1].misconceptionFeedback = {
  tr: "Çözünürlük çökme yanılgısı: Prokainamid suda ve plazmada son derece iyi çözünür; uzun etki süresinin tek nedeni amit bağının ester bağından çok daha yüksek kimyasal ve enzimatik dirence sahip olmasıdır.",
  ar: "مغالطة الذوبانية: البروكايناميد عالي الانحلال بالبلازما؛ طول تأثيره يعود لاستقرار الرابطة الأميدية المقاومة لأنزيمات الحلمهة مقارنة بالإستر.",
  en: "Solubility precipitation fallacy: Procainamide is highly soluble; prolonged duration stems entirely from amide resonance stabilization against esterase cleavage."
};

lesson.steps[7].conceptCheck.options[2].text = {
  tr: "Ester ve amit bağlarının hidroliz hızları aynıdır; fark prokainamidin böbreklerden hiç atılamamasından kaynaklanır.",
  ar: "سرعة حلمهة الإستر والأميد متطابقة في البلازما؛ الفارق يكمن في عجز الكلى عن إطراح البروكايناميد.",
  en: "Ester and amide hydrolysis rates are identical in vivo; the pharmacokinetic difference is due to total renal clearance failure of procainamide."
};
lesson.steps[7].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Eşit hidroliz yanılgısı: Slayt 28: Plazma psödokolinesterazları esterleri saniyeler içinde bölerken, hepatik amidazlar saatler mertebesinde yavaş çalışır.",
  ar: "مغالطة تساوي سرعة الحلمهة: شريحة 28: إنزيمات الكولين إستراز تفكك الإستر بثوانٍ، بينما تتطلب Amidases ساعات لكسر الرابطة الأميدية.",
  en: "Identical hydrolysis fallacy: Slide 28: Plasma pseudocholinesterases hydrolyze esters in seconds; amidases operate orders of magnitude slower."
};

// Step 9
lesson.steps[8].conceptCheck.options[1].text = {
  tr: "Ester hidrolizi: Prontosil'in yapısındaki ester köprüsü kandan su alarak salisilik asit salgılar.",
  ar: "حلمهة إسترية: جسر الإستر في البرونتوسيل يلتقط الماء من الدم محرراً حمض الساليسيليك.",
  en: "Ester hydrolysis: An ester bridge in Prontosil absorbs water from plasma to liberate salicylic acid."
};
lesson.steps[8].conceptCheck.options[1].misconceptionFeedback = {
  tr: "Ester köprüsü yanılgısı: Prontosil yapısında ester değil, azo bağı (-N=N-) taşır; aktif molekül salisilik asit değil sülfanilamiddir.",
  ar: "مغالطة جسر الإستر: لا يحتوي البرونتوسيل روابط إسترية بل رابطة آزو (-N=N-)؛ والجزيء الفعال هو السلفانيلاميد وليس الساليسيليك.",
  en: "Ester linkage confusion: Prontosil features an azo linkage (-N=N-), not an ester; the liberated active pharmacophore is sulfanilamide."
};

lesson.steps[8].conceptCheck.options[2].text = {
  tr: "Aromatik dekarboksilasyon: Prontosil karbondioksit kaybederek doğrudan aktif sülfamite dönüşür.",
  ar: "نزع كربوكسيل عطري: يفقد البرونتوسيل غاز CO2 ليتحول فوراً إلى سلفاميت فعال.",
  en: "Aromatic decarboxylation: Prontosil loses carbon dioxide to spontaneously yield antibacterial sulfamide."
};
lesson.steps[8].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Dekarboksilasyon yanılgısı: Prontosil karboksilik asit grubu içermez; biyoaktivasyon reaksiyonu azo redüksiyonudur (Slide 25).",
  ar: "مغالطة نزع الكربوكسيل: لا يحوي البرونتوسيل حمضاً كربوكسيلياً؛ تفاعل التنشيط الحيوي هو إرجاع الآزو (شريحة 25).",
  en: "Decarboxylation fallacy: Prontosil lacks a carboxylic acid moiety; bioactivation is strictly reductive cleavage of the azo bond (Slide 25)."
};

// Step 11
lesson.steps[10].conceptCheck.options[1].text = {
  tr: "Epoksit halkasını doğrudan benzoik asit ve formaldehite parçalayarak idrara gönderir.",
  ar: "يفكك حلقة الإيبوكسيد مباشرة إلى حمض بنزويك وفورمالدهيد للطرح البولي.",
  en: "Cleaves the epoxide ring directly into benzoic acid and formaldehyde fragments for rapid urinary elimination."
};
lesson.steps[10].conceptCheck.options[1].misconceptionFeedback = {
  tr: "Halka parçalama yanılgısı: Epoksit hidrolaz molekülü parçalamaz; su katarak trans-1,2-dihidrodiol türevi oluşturur (Slayt 16 ve 29).",
  ar: "مغالطة التجزئة: لا يجزئ الإنزيم الجزيء، بل يضيف جزيء ماء مشكلاً مشتق ترانس-1،2-ثنائي الهيدرو ديول (شريحة 16 و 29).",
  en: "Fragmentation fallacy: Epoxide hydrolase does not fragment the scaffold; it stereospecifically adds water to form trans-dihydrodiols (Slides 16 & 29)."
};

lesson.steps[10].conceptCheck.options[2].text = {
  tr: "Epoksit hidrolaz enzimi sadece bakterilerde bulunur; insan vücudunda aren oksitler yalnızca glutatyonla temizlenebilir.",
  ar: "إنزيم إيبوكسيد هيدرولاز يوجد فقط في البكتيريا؛ وفي جسم الإنسان يتم تنظيف الأرين أوكسيد حصراً بالجلوتاثيون.",
  en: "Epoxide hydrolase exists solely in bacteria; human cells rely exclusively on glutathione for arene oxide neutralization."
};
lesson.steps[10].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Yalnızca glutatyon yanılgısı: İnsan karaciğer mikrozom ve sitozolünde güçlü epoksit hidrolaz enzimleri bulunur; dihidrodiol oluşumu karsinojeniteyi önleyen primer savunma hattıdır.",
  ar: "مغالطة حصر الحماية بالجلوتاثيون: تمتلك الخلايا الكبدية البشرية إنزيم إيبوكسيد هيدرولاز ميكروزومي عالي الفعالية كخط دفاع أساسي.",
  en: "Glutathione-exclusive fallacy: Human liver microsomes express abundant epoxide hydrolase; dihydrodiol conversion is a primary cellular defense."
};

// Step 12
lesson.steps[11].conceptCheck.options[1].text = {
  tr: "Döteryum ikamesi bağ kopma enerjisini düşürür; bu yüzden ilaç 10 kat daha hızlı metabolize edilip hızla tükenir.",
  ar: "استبدال الديوتيريوم يقلل طاقة كسر الرابطة؛ مما يسرع استقلاب الدواء 10 أضعاف ويسرع التخلص منه.",
  en: "Deuterium substitution weakens bond dissociation energy, causing the drug to metabolize 10-fold faster and clear prematurely."
};
lesson.steps[11].conceptCheck.options[1].misconceptionFeedback = {
  tr: "Bağ zayıflaması yanılgısı: C-D bağı C-H bağına göre daha ağır ve daha kararlıdır (sıfır noktası titreşim enerjisi daha düşüktür); kopması daha zordur ve metabolizmayı yavaşlatır (Kinetik İzotop Etkisi).",
  ar: "مغالطة ضعف الرابطة: رابطة C-D أقوى وأثقل من C-H وتتطلب طاقة تنشيط أعلى لكسرها؛ مما يبطئ الاستقلاب (أثر النظائر الحركي).",
  en: "Bond weakening fallacy: C-D bonds have lower zero-point vibrational energy and higher dissociation energy; heavier deuterium slows cleavage (Kinetic Isotope Effect)."
};

lesson.steps[11].conceptCheck.options[2].text = {
  tr: "Döteryum izotopik olarak hidrojenle aynı kütleye sahip olduğundan enzim hızında ve yarı ömürde hiçbir kinetik değişiklik saptanamaz.",
  ar: "الديوتيريوم يملك نفس كتلة الهيدروجين نظائرياً ولذلك لا يطرأ أي تغيير حركي على سرعة الإنزيم أو العمر النصفي.",
  en: "Deuterium possesses identical mass to hydrogen, so zero kinetic changes in enzymatic rate or drug half-life can ever be detected."
};
lesson.steps[11].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Özdeş kütle yanılgısı: Döteryum çekirdeğinde 1 proton ve 1 nötron barındırarak hidrojenden 2 kat daha ağırdır; bu kütle iki katlanması kH/kD = 6-8'e varan devasa primer kinetik izotop etkisi yaratır.",
  ar: "مغالطة تطابق الكتلة: الديوتيريوم يحوي نيوتروناً إضافياً فيزن ضعف الهيدروجين؛ مما يولد فارقاً حركياً هائلاً يصل لـ 6-8 أضعاف.",
  en: "Identical mass misconception: Deuterium contains a neutron, doubling its atomic mass; this 100% mass increase creates a large primary kinetic isotope effect (kH/kD = 6-8)."
};

// Mirror options into config.options
lesson.steps.forEach((s) => {
  if (s.conceptCheck?.options && s.config) {
    s.config.options = s.conceptCheck.options.map(opt => ({
      id: opt.id,
      text: opt.text?.tr || opt.text,
      isCorrect: opt.isCorrect,
      misconceptionFeedback: opt.misconceptionFeedback?.tr || opt.misconceptionFeedback
    }));
  }
});

fs.writeFileSync(lessonPath, JSON.stringify(lesson, null, 2), 'utf8');
fs.writeFileSync('c:/Users/hp/Documents/antigravity/valiant-raman/courses/medchem/lessons/lesson-09.json', JSON.stringify(lesson, null, 2), 'utf8');
console.log('Successfully polished all distractors in lesson-09.json and synced both workspaces!');
