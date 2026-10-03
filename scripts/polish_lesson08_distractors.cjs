const fs = require('fs');

const lessonPath = 'courses/medchem/lessons/lesson-08.json';
const lesson = JSON.parse(fs.readFileSync(lessonPath, 'utf8'));

// Step 1: Replace absurd distractors with authentic misconceptions
lesson.steps[0].conceptCheck.options[1].text = {
  tr: "Asetilkolin iki farklı reseptöre bağlanabilmek için kanda enzimatik olarak iki farklı kovalent izomere parçalanıp yeniden sentezlenir.",
  ar: "يتفكك الأستيل كولين إنزيمياً في الدم إلى مماكبين تساهميين مختلفين ثم يعاد تركيبه ليرتبط بكل مستقبل.",
  en: "Acetylcholine enzymatically cleaves and resynthesizes in blood into two distinct covalent isomers to bind each receptor."
};
lesson.steps[0].conceptCheck.options[1].misconceptionFeedback = {
  tr: "Kovalent izomerizasyon yanılgısı: Reseptör alt tiplerine bağlanmak için kovalent bağların kırılıp oluşmasına gerek yoktur; molekül tekli C-C ve C-O bağları etrafında nanosaniyelik hızla dönerek farklı uzaysal konformasyonlar (rotamerler) üretir.",
  ar: "مغالطة التماكب التساهمي: لا حاجة لكسر روابط تساهمية؛ الجزيء يدور بسرعة نانوثانية حول روابطه الأحادية ليعطي تشكيلات فراغية مختلفة.",
  en: "Covalent isomerization misconception: No covalent bond cleavage is required; the molecule rotates around single bonds in nanoseconds to generate distinct conformers."
};

lesson.steps[0].conceptCheck.options[2].text = {
  tr: "Asetilkolinin kuaterner amonyum grubu o kadar güçlü bir pozitif yüktür ki reseptör cep şekli ne olursa olsun elektrostatik çekim tek başına iki reseptörü de ayrım yapmaksızın aktive eder.",
  ar: "شحنة الأمونيوم الرباعية قوية جداً بحيث تجذب وتنشط كلا المستقبلين كهربائياً بغض النظر عن الشكل الفراغي للجيب.",
  en: "Acetylcholine's quaternary ammonium positive charge is so strong that electrostatic attraction alone activates both receptors regardless of pocket shape."
};
lesson.steps[0].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Yalnızca iyonik çekim yanılgısı: İyonik bağ reseptöre ilk yanaşmayı sağlasa da, farmakofor grupları (amonyum ve ester oksijenleri) arasındaki mesafenin reseptör cebine uymaması durumunda bağlanma ve aktivasyon gerçekleşemez.",
  ar: "مغالطة الجذب الأيوني الحصري: الرابطة الأيونية تقرب الجزيء لكن تطابق المسافة الفراغية بين مجموعات الفارماكوفور وجيب المستقبل ضروري للارتباط والتنشيط.",
  en: "Ionic-only attraction fallacy: Ionic attraction initiates binding, but precise pharmacophoric distance match inside the pocket is mandatory for activation."
};

// Step 2: Replace light distractor
lesson.steps[1].conceptCheck.options[2].text = {
  tr: "Evet; çünkü reseptörün bağlanma cebi tamamen katı ve hareketsizdir, ligantın yüksek enerjili bir forma bükülmesine izin verecek esnekliğe sahip değildir.",
  ar: "نعم، لأن جيب المستقبل صلب وثابت تماماً ولا يملك أي مرونة تسمح بارتباط مركب منحني بشكل عالي الطاقة.",
  en: "Yes, because the receptor binding pocket is completely rigid and immutable, lacking any flexibility to accommodate strained conformations."
};
lesson.steps[1].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Rijit anahtar-kilit yanılgısı: Koshland'ın indüklenmiş uyum (induced-fit) teorisine göre hem reseptör hem ligant bağlanma sırasında birbirine uyum sağlayacak konformasyonel değişiklikler geçirir.",
  ar: "مغالطة القفل والمفتاح الجاسئ: وفقاً لنظرية التلاؤم المحثوث (induced-fit)، يخضع كل من المستقبل والربيطة لتغيرات تشكلية للتكيف المتبادل.",
  en: "Rigid lock-and-key fallacy: Under induced-fit theory, both the receptor pocket and the ligand undergo mutual conformational adaptations upon binding."
};

// Step 3: Replace heat/gravity distractors
lesson.steps[2].conceptCheck.options[1].text = {
  tr: "Esnek moleküllerin reseptör cebine girmesi sterik olarak imkansızdır; bu yüzden esnek ilaçlar reseptör içine hiç nüfuz edemez.",
  ar: "دخول الجزيئات المرنة إلى جيب المستقبل مستحيل فراغياً بسبب الإعاقة الحجمية؛ لذلك لا تنفذ إطلاقاً.",
  en: "Flexible molecules face insurmountable steric bulk preventing entry into narrow receptor pockets entirely."
};
lesson.steps[2].conceptCheck.options[1].misconceptionFeedback = {
  tr: "Sterik giriş engeli yanılgısı: Esnek moleküller cebe rahatlıkla girer; sorun cebe girememeleri değil, cebe oturduklarında kaybettikleri rotasyonel serbestliğin termodinamik bir entropi bedeli doğurmasıdır.",
  ar: "مغالطة عائق الدخول الفراغي: الجزيئات المرنة تدخل بسهولة؛ المشكلة تكمن في ضريبة الإنتروبيا التشكيلية الناتجة عن فقدان حرية الدوران.",
  en: "Steric block fallacy: Flexible molecules enter easily; the limitation is the severe thermodynamic entropy loss from freezing rotatable bonds."
};

lesson.steps[2].conceptCheck.options[2].text = {
  tr: "Dönen bağlar ilacın biyolojik zarları geçmesini engeller; esnek moleküller yağ fazında tamamen çözünmez kalır.",
  ar: "الروابط الدوارة تمنع الدواء من عبور الأغشية الحيوية، فتبقى الجزيئات المرنة غير ذوابة بالدهون تماماً.",
  en: "Rotating bonds prevent drugs from crossing biological membranes; flexible drugs remain completely insoluble in lipids."
};
lesson.steps[2].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Membran geçişi yanılgısı: Esnek moleküller çözücüye göre konformasyon değiştirerek zarları kolayca geçebilir; ancak reseptöre kilitlenme afiniteleri entropi kaybı nedeniyle düşüktür.",
  ar: "مغالطة عبور الغشاء: الجزيئات المرنة تعبر الأغشية بسهولة بتغيير تشكلها؛ لكن ألفة ارتباطها تنخفض بسبب ضريبة الإنتروبيا.",
  en: "Membrane transit fallacy: Flexible molecules readily cross membranes by adapting conformers, but binding affinity suffers from entropy loss."
};

// Step 4: Replace color/weight distractors
lesson.steps[3].conceptCheck.options[1].text = {
  tr: "Molekülün lipofilitesini: Uzamış form tüm kutupları açığa çıkardığı için katlanmış forma göre 100 kat daha fazla suda çözünür.",
  ar: "محبة الدهون: التشكيل الممتد يكشف المجموعات القطبية فيكون أكثر ذوباناً بالماء بـ 100 مرة مقارنة بالمنطوي.",
  en: "Lipophilicity: The extended form exposes all polar groups, making it 100-fold more water-soluble than folded."
};
lesson.steps[3].conceptCheck.options[1].misconceptionFeedback = {
  tr: "Yalnızca çözünürlük yanılgısı: Rotamerler arası mesafe farkının birincil klinik sonucu çözünürlük değil, farmakoforik mesafenin değişmesiyle muskarinik ve nikotinik reseptörler arasındaki alt tip seçiciliğidir.",
  ar: "مغالطة حصر الأثر في الذوبانية: النتيجة السريرية الجوهرية لتباعد المسافة هي الانتقائية للمستقبلات المسكارينية مقابل النيكوتينية.",
  en: "Solubility-only misconception: The paramount pharmacological outcome is pharmacophore distance matching receptor subtypes, not simple bulk solubility."
};

lesson.steps[3].conceptCheck.options[2].text = {
  tr: "İlacın pKa değerini: Uzamış form kuaterner amonyumun iyonlaşmasını engellerken katlanmış form iyonlaşmayı artırır.",
  ar: "قيمة pKa: التشكيل الممتد يمنع تأين الأمونيوم الرباعي بينما التشكيل المنطوي يزيد من تأينه.",
  en: "Drug pKa: The extended conformation prevents quaternary ammonium ionization while the folded form enhances it."
};
lesson.steps[3].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Kuaterner amonyum pKa yanılgısı: Asetilkolinin kuaterner amonyum azotu pH'tan bağımsız olarak kalıcı ve tam yüklüdür (%100 iyonize); konformasyon değişimi yük durumunu değiştirmez.",
  ar: "مغالطة pKa الأمونيوم الرباعي: نيتروجين الأمونيوم الرباعي مشحون دائماً بنسبة 100% بغض النظر عن pH أو التشكيل الفراغي.",
  en: "Quaternary ammonium pKa fallacy: The quaternary ammonium nitrogen is permanently 100% ionized regardless of pH or conformation."
};

// Step 6: Replace nuclear fusion / evaporation
lesson.steps[5].conceptCheck.options[1].text = {
  tr: "Siklopropil halkasının elektron çekici etkisiyle ester grubunun reaktivitesini artırıp asetilkolinesteraz enzimini inhibe ettiğini.",
  ar: "أن حلقة السيكلوبروبيل تزيد تفاعلية الإستر وتسحب الإلكترونات مما يثبط إنزيم أستيل كولين إستراز بشكل مباشر.",
  en: "The cyclopropyl ring withdraws electrons to enhance ester reactivity and directly inhibit acetylcholinesterase."
};
lesson.steps[5].conceptCheck.options[1].misconceptionFeedback = {
  tr: "Enzim inhibisyonu yanılgısı: Siklopropil halkası asetilkolinesteraz inhibitörü olarak değil; N-O atomlar arası mesafeyi (3.3 Å vs 4.4 Å) kovalent bir halka ile dondurarak reseptör alt tip seçiciliğini kanıtlamak için tasarlanmıştır.",
  ar: "مغالطة التثبيط الإنزيمي: حلقة السيكلوبروبيل صممت لتجميد المسافة الفراغية وإثبات انتقائية المستقبل وليس لتثبيط الإنزيم.",
  en: "Enzyme inhibition misconception: The cyclopropyl ring was designed to lock interatomic distance and demonstrate receptor subtype selectivity, not inhibit AChE."
};

lesson.steps[5].conceptCheck.options[2].text = {
  tr: "Trans-izomerin iki kiral merkeze sahip olmasının ilacın yalnızca kan plazmasındaki albümine bağlanmasını sağladığını.",
  ar: "أن امتلاك المماكب trans لمركزين كيراليين يجعله يرتبط حصرياً بألبومين البلازما بدلاً من المستقبلات.",
  en: "The trans isomer having two chiral centers causes the drug to bind exclusively to serum albumin rather than receptors."
};
lesson.steps[5].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Plazma proteini yanılgısı: Kiral siklopropil analogları albümine bağlanma amacıyla değil, muskarinik ve nikotinik reseptörlerin kiral ve boyutsal cep geometrisini haritalamak için geliştirilmiştir.",
  ar: "مغالطة بروتينات البلازما: طورت مشتقات السيكلوبروبيل الكيرالية لرسم خريطة المستقبلات المسكارينية والنيكوتينية وليس للارتباط بالألبومين.",
  en: "Plasma protein fallacy: Chiral cyclopropyl analogs were synthesized to probe chiral receptor pharmacophore geometry, not target albumin."
};

// Step 7: Replace stomach melting
lesson.steps[6].conceptCheck.options[2].text = {
  tr: "Histamin H1 ve H2 reseptörlerinin aynı farmakofor mesafesini talep ettiğini, dolayısıyla rijit analogların seçicilik sağlayamayacağını.",
  ar: "أن مستقبلي H1 و H2 يتطلبان نفس المسافة الفارماكوفورية تماماً وبالتالي لا يمكن تحقيق أي انتقائية بالتجسئة.",
  en: "Histamine H1 and H2 receptors require identical pharmacophoric distances, making conformational restriction useless for selectivity."
};
lesson.steps[6].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Özdeş cep yanılgısı: Slayt 43: H1 reseptörü transoid A konformasyonunu (4.55 Å), H2 reseptörü ise gauche B konformasyonunu (3.60 Å) seçer; aradaki 0.95 Å'luk fark selektif antihistaminik ve antiülser ilaçların temelidir.",
  ar: "مغالطة الجيب المتطابق: شريحة 43: مستقبل H1 يختار transoid A (4.55 Å) ومستقبل H2 يختار gauche B (3.60 Å)؛ فارق 0.95 Å هو أساس الأدوية النوعية.",
  en: "Identical pocket misconception: Slide 43: H1 prefers transoid A (4.55 Å) while H2 prefers gauche B (3.60 Å); this 0.95 Å difference governs selectivity."
};

// Step 8: Replace furniture chair distractor
lesson.steps[7].conceptCheck.options[1].text = {
  tr: "Aksiyal aril grubu halkanın merkezine yöneldiği için reseptörle hidrofobik teması artırır ve daima ekvatoryal forma göre daha yüksek afinite gösterir.",
  ar: "المجموعة العطرية المحورية تتجه نحو مركز الحلقة فتزيد التلامس الكاره للماء وتعطي دائماً ألفة أعلى من الاستوائية.",
  en: "The axial aryl group points toward the ring core to maximize hydrophobic contact, consistently conferring higher affinity than equatorial."
};
lesson.steps[7].conceptCheck.options[1].misconceptionFeedback = {
  tr: "1,3-diaksiyal itme yanılgısı: Aksiyal konumdaki hacimli aril grupları halkanın diğer aksiyal hidrojenleriyle şiddetli sterik çakışmaya (1,3-diaxial strain) girer; bu nedenle molekül ekvatoryal konformasyonu tercih eder.",
  ar: "مغالطة الإجهاد ثنائي المحور: المجموعات الحجمية في الموقع المحوري تعاني من تنافر فراغي شديد (1,3-diaxial strain)؛ لذا يفضل الجزيء التشكيل الاستوائي.",
  en: "1,3-diaxial misconception: Bulky axial aryls suffer severe steric strain with syn-axial hydrogens, making equatorial orientation energetically favored."
};

lesson.steps[7].conceptCheck.options[2].text = {
  tr: "Piperidin halkası fizyolojik sıcaklıkta o kadar hızlı ring-flip yapar ki ekvatoryal ve aksiyal konformerler farmakolojik olarak ayırt edilemez.",
  ar: "حلقة البيبيريدين تقلب بسرعة فائقة في الحرارة الفسيولوجية بحيث يستحيل تفريق التشكيل الاستوائي عن المحوري دوائياً.",
  en: "The piperidine ring undergoes such rapid chair flipping at body temperature that equatorial and axial conformers are pharmacologically indistinguishable."
};
lesson.steps[7].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Ayırt edilemezlik yanılgısı: Halka dönüşümü hızlı olsa da, reseptör cebi iki konformerden yalnızca birini (biyoaktif formu) seçerek bağlar; bu seçim afiniteler arasında devasa farklar yaratır.",
  ar: "مغالطة التكافؤ الدوائي: رغم سرعة الانقلاب، ينتقي جيب المستقبل تشكيلاً واحداً فقط للارتباط؛ مما يولد فارقاً هائلاً في الألفة.",
  en: "Indistinguishability fallacy: Despite rapid interconversion in solution, the rigid receptor pocket binds only one bioactive conformer, yielding vast affinity differences."
};

// Step 9: Replace superconductor / water solubility zero
lesson.steps[8].conceptCheck.options[1].text = {
  tr: "Serbest bağları dondurmak molekül ağırlığını azalttığı için difüzyon katsayısını 10 kat artırır ama bağlanma afinitesini hiç etkilemez.",
  ar: "تجميد الروابط ينقص الوزن الجزيئي فيزيد سرعة الانتشار 10 أضعاف لكنه لا يغير ألفة الارتباط إطلاقاً.",
  en: "Freezing rotatable bonds reduces molecular weight, accelerating diffusion 10-fold without altering binding affinity."
};
lesson.steps[8].conceptCheck.options[1].misconceptionFeedback = {
  tr: "Molekül ağırlığı yanılgısı: Rotasyonel bağları halkaya kilitlemek molekül ağırlığını neredeyse değiştirmez; afinite artışının temel nedeni termodinamik konformasyonel entropi (-TΔS) cezasının silinmesidir.",
  ar: "مغالطة الوزن الجزيئي: تقييد الروابط لا يغير الوزن الجزيئي؛ زيادة الألفة سببها إلغاء ضريبة الإنتروبيا التشكيلية (-TΔS).",
  en: "Molecular weight fallacy: Rigidification barely alters molecular weight; affinity spikes because the conformational entropy penalty (-TΔS) is eliminated."
};

lesson.steps[8].conceptCheck.options[2].text = {
  tr: "Bağların dondurulması entalpiyi (ΔH) 100 kJ/mol yükselterek ilacın reseptörle kovalent bağ kurmasını sağlar.",
  ar: "تجميد الروابط يرفع الإنثالبيا (ΔH) بمقدار 100 kJ/mol مما يدفع الدواء لتشكيل روابط تساهمية مع المستقبل.",
  en: "Freezing bonds drives enthalpy (ΔH) up by 100 kJ/mol, enabling the drug to form irreversible covalent bonds with the receptor."
};
lesson.steps[8].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Kovalent bağlanma yanılgısı: İskeleti rijit hale getirmek molekülü kovalent yapmaz; non-kovalan bağlanmada entalpiden ziyade entropik kayıpları önleyerek serbest enerjiyi (ΔG = ΔH - TΔS) negatifleştirir.",
  ar: "مغالطة الارتباط التساهمي: التجسئة لا تجعل الدواء تساهمياً؛ بل تحسن طاقة جيبس الحرة بمنع ضياع الإنتروبيا في التفاعلات غير التساهمية.",
  en: "Covalent binding fallacy: Rigidification does not confer covalent reactivity; it enhances free energy (ΔG = ΔH - TΔS) by preventing non-covalent entropy penalties."
};

// Step 10: Replace gas/solid
lesson.steps[9].conceptCheck.options[1].text = {
  tr: "Konfigürasyon izomerleri oda sıcaklığında saniyede milyonlarca kez birbirine dönüşürken, konformasyonlar yalnızca yüksek ısıda değişir.",
  ar: "المتماكبات التكوينية تتحول تلقائياً ملايين المرات في الثانية، بينما التشكيلات الفراغية تتغير فقط بالحرارة العالية.",
  en: "Configurational isomers interconvert millions of times per second, whereas conformers require high thermal energy to flip."
};
lesson.steps[9].conceptCheck.options[1].misconceptionFeedback = {
  tr: "Hız ve mekanizma tersliği yanılgısı: Tam tersi! Oda sıcaklığında nanotaniyelerde dönen yapılar konformerlerdir; konfigürasyonel izomerlerin (R/S, cis/trans) birbirine dönüşmesi için kovalent bağ kırılması şarttır.",
  ar: "مغالطة عكس الآلية والسرعة: العكس تماماً! التشكيلات تدور في نانوثوانٍ؛ بينما المتماكبات التكوينية تتطلب كسر روابط تساهمية.",
  en: "Interconversion rate inversion fallacy: Opposite! Conformers rotate in nanoseconds; configurational isomers (R/S, cis/trans) require covalent bond cleavage."
};

lesson.steps[9].conceptCheck.options[2].text = {
  tr: "Konformasyonel izomerler sadece optikçe aktif kiral moleküllerde görülür; akiral moleküllerde konformasyon oluşamaz.",
  ar: "التماكب التشكلي يحدث حصراً في الجزيئات الكيرالية ذات الفعالية الضوئية، ولا وجود له في الجزيئات غير الكيرالية.",
  en: "Conformational isomerism occurs exclusively in optically active chiral molecules; achiral molecules cannot possess conformers."
};
lesson.steps[9].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Kiralite bağımlılığı yanılgısı: Konformasyonel izomerizm kiraliteye bağlı değildir; etan veya asetilkolin gibi akiral moleküller bile tekli bağları etrafında dönerek sonsuz sayıda konformasyon alır.",
  ar: "مغالطة اشتراط الكيرالية: التماكب التشكلي لا يرتبط بالكيرالية؛ فحتى الجزيئات غير الكيرالية كالإيثان والأستيل كولين تدور وتأخذ أشكالاً لا نهائية.",
  en: "Chirality dependence fallacy: Conformation does not require chirality; even achiral molecules like ethane or acetylcholine adopt infinite rotamers."
};

// Step 11: Replace sweat glands
lesson.steps[10].conceptCheck.options[2].text = {
  tr: "Bir molekülün karaciğerde metabolize olabilmesi için mutlaka çözeltideki mutlak en düşük enerjili konformasyonunda olması zorunludur.",
  ar: "لكي يستقلب الجزيء في الكبد، يجب أن يكون حتماً في التشكيل الأدنى طاقة والأكثر استقراراً في المحلول.",
  en: "For a drug to be metabolized in the liver, it must strictly adopt its absolute global minimum energy conformation."
};
lesson.steps[10].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Metabolik minimum yanılgısı: Tıpkı reseptörlerde olduğu gibi, enzim ceplerinde de ilacın katalitik merkezle en uygun mesafeyi kurduğu konformasyon metabolize edilir; bu form serbest çözeltideki en kararlı form olmak zorunda değildir.",
  ar: "مغالطة الأدنى طاقة بالاستقلاب: تماماً كالمستقبلات، جيب الإنزيم يفضل التشكيل الذي يضع الرابطة بمحاذاة المركز التحفيزي حتى لو كان أعلى طاقة في المحلول.",
  en: "Metabolic minimum fallacy: Like receptors, catalytic enzyme active sites bind the conformer presenting the bond to the heme iron, regardless of solution minimum."
};

// Step 12: Replace fatty acids / helium
lesson.steps[11].conceptCheck.options[1].text = {
  tr: "Etilamin zincirini siklopropan halkası ile cis-koplanar (katlanmış) konformasyonda dondurarak amino grubunun katekol hidroksilleri ile molekül içi hidrojen bağı yapmasını sağlarız.",
  ar: "تجميد سلسلة الإيثيل أمين في حلقة سيكلوبروبيل بتشكيل cis المطوي لتشكيل روابط هيدروجينية داخلية مع هيدروكسيلات الكاتيكول.",
  en: "Lock the ethylamine into a cis-coplanar cyclopropyl ring so the amine forms an intramolecular hydrogen bond with the catechol OH groups."
};
lesson.steps[11].conceptCheck.options[1].misconceptionFeedback = {
  tr: "Molekül içi H-bağı vs reseptör geometrisi yanılgısı: Katlanmış (cis) form molekül içinde kararlı hissettirse de, dopamin D2 reseptörü kesin olarak uzamış anti-geometriyi (transoid) şart koşar; cis türevleri D2 afinitesini kaybeder.",
  ar: "مغالطة الرابطة الهيدروجينية الداخلية: رغم أن التشكيل المطوي مستقر داخلياً، إلا أن مستقبل D2 يشترط التشكيل الممتد transoid؛ مشتقات cis تفقد الألفة تماماً.",
  en: "Intramolecular H-bond fallacy: While cis folding appears internally stable, the D2 receptor pocket strictly demands the extended transoid geometry."
};

lesson.steps[11].conceptCheck.options[2].text = {
  tr: "Esnekliği daha da artırmak için etilamin zincirine 3 ilave serbest dönen karbon ekleyerek molekülün reseptör cebindeki tüm amino asitleri aynı anda taramasını sağlarız.",
  ar: "زيادة المرونة بإضافة 3 كربونات حرة الدوران إلى السلسلة لتمكين الجزيء من مسح والتوافق مع جميع الأحماض الأمينية في المستقبل معاً.",
  en: "Add 3 more rotatable carbons to the ethylamine chain to maximize flexibility so the molecule can simultaneously contact all pocket residues."
};
lesson.steps[11].conceptCheck.options[2].misconceptionFeedback = {
  tr: "Daha fazla esneklik yanılgısı: Serbest dönen bağ sayısını artırmak entropi cezasını (-TΔS) dramatik şekilde büyütür ve bağlanma afinitesini yıkar; hedefimiz esnekliği artırmak değil, biyoaktif formu kilitlemektir.",
  ar: "مغالطة المرونة الزائدة: زيادة الروابط الدوارة تضخم ضريبة الإنتروبيا التشكيلية وتدمر الألفة؛ الهدف ليس زيادة المرونة بل قفل التشكيل الحيوي.",
  en: "Flexibility fallacy: Adding rotatable bonds escalates the conformational entropy penalty, crushing affinity; medicinal design seeks rigidification."
};

// Mirror conceptCheck.options into config.options for all steps
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
fs.writeFileSync('c:/Users/hp/Documents/antigravity/valiant-raman/courses/medchem/lessons/lesson-08.json', JSON.stringify(lesson, null, 2), 'utf8');
console.log('Successfully polished all distractors in lesson-08.json and synced both workspaces!');
