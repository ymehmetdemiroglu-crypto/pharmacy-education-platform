import { HighYieldSlide } from '../types/vizeTriage.types';

export const INITIAL_HIGH_YIELD_SLIDES: HighYieldSlide[] = [
  // =========================================================================
  // COURSE A: FARMASÖTİK KİMYA (Marmara Üniversitesi Eczacılık Fakültesi)
  // =========================================================================
  {
    slideId: 'medchem-slide-09',
    courseId: 'medchem',
    facultySlug: 'marmara-eczacilik',
    lectureDeckId: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
    slideNumber: 9,
    title: 'Kovalan Bağlar & Serin Fosforilasyonu vs Açilasyonu',
    conceptSummary: 'Organofosfatlar AChE serin hidroksilini fosforillerken, beta-laktamlar transpeptidazı açiller. Kovalan bağ 40-140 kcal/mol kuvvetindedir ve geri dönüşümsüzdür.',
    highYieldScore: 92,
    tier: 'CRITICAL_TIER_1',
    rawFactors: { c_freq: 2.8, e_emph: 2.3, s_struct: 1.9, m_cohort: 2.1, gamma_cal: 1.0 },
    linkedTrapCodes: ['TRAP-08-AChE-AGING', 'TRAP-03-ESTER-AMIDE'],
    boundingSpotlight: { xNorm: 0.1, yNorm: 0.2, wNorm: 0.8, hNorm: 0.6 },
    predictPrompt: 'Organofosfat insektisitlerin asetilkolinesteraz enzimiyle kurduğu kovalan bağın kimyasal niteliği vizede nasıl sorulur?',
    examQuestionSnippet: 'Asetilkolinesteraz enziminin aktif bölgesindeki serin kalıntısının organofosfatlarla fosforillenmesi sonucu oluşan bağın niteliği ve yaşlanma (aging) reaksiyonunu açıklayınız.',
    cramQuestion: {
      questionPrompt: 'Organofosfat zehirlenmesinde asetilkolinesteraz enziminin serin hidroksili ile oluşan kovalent bağın geri dönüşümsüzleşme (aging) mekanizması nedir?',
      options: [
        { id: 'opt-1', text: 'Fosforillenmiş enzimdeki alkil grubunun ayrılmasıyla negatif yük oluşur ve nükleofilik saldırı engellenir.', isCorrect: true },
        { id: 'opt-2', text: 'Serin aminoasidinin ester bağı fizyolojik pH\'da iyonlaşarak geri dönüşümlü hidrojen bağına dönüşür.', isCorrect: false, misconceptionDiagnosed: 'TRAP-08-AChE-AGING' },
        { id: 'opt-3', text: 'Organofosfat enzimle sadece tersinir dipol-dipol bağı kurduğu için aging olayı gerçekleşmez.', isCorrect: false, misconceptionDiagnosed: 'TRAP-03-ESTER-AMIDE' }
      ],
      hintLadder: [
        'Nudge: Fosforil grubuna bağlı alkil yan zincirlerinin kararlılığını düşünün.',
        'Clue: Alkil grubu koptuğunda oksijen üzerinde net negatif yük kalır; bu da pralidoksim gibi reaktivatörlerin yaklaşmasını elektrostatik olarak iter.',
        'Solution: Yaşlanma (aging), fosforil esterinden bir alkil grubunun ayrılmasıyla oluşan negatif yüklü fosfat monoesterinin nükleofilik reaktivasyona direnç kazanmasıdır [Slayt 9-12].'
      ],
      diagnosticVerdict: 'Doğru! Yaşlanma gerçekleştikten sonra pralidoksim (2-PAM) gibi oksimler enzimi reaktive edemez; yeni enzim sentezi beklenmelidir.'
    },
    updatedAt: '2026-10-08T12:00:00.000Z'
  },
  {
    slideId: 'medchem-slide-13',
    courseId: 'medchem',
    facultySlug: 'marmara-eczacilik',
    lectureDeckId: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
    slideNumber: 13,
    title: 'İyonik Bağ & Dielektrik Katsayısı Zayıflaması',
    conceptSummary: 'İyonik bağ elektrostatik çekimdir (5-10 kcal/mol). Ortamın dielektrik sabiti (epsilon) arttıkça bağ kuvveti zayıflar.',
    highYieldScore: 84,
    tier: 'CRITICAL_TIER_1',
    rawFactors: { c_freq: 2.4, e_emph: 2.1, s_struct: 1.8, m_cohort: 1.9, gamma_cal: 1.0 },
    linkedTrapCodes: ['TRAP-01-IONIZATION'],
    boundingSpotlight: { xNorm: 0.15, yNorm: 0.25, wNorm: 0.7, hNorm: 0.5 },
    predictPrompt: 'Fizyolojik ortamdaki polar su moleküllerinin iyonik bağ kuvvetine etkisi formülle nasıl sorulur?',
    examQuestionSnippet: 'İyonik bağ kuvvetini belirleyen Coulomb formülünde dielektrik katsayısının (ε) rolünü ve suyun bu bağ üzerindeki etkisini açıklayınız.',
    cramQuestion: {
      questionPrompt: 'ΔG = -e1*e2 / (ε*r) Coulomb formülüne göre, fizyolojik sıvıdaki su molekülleri iyonik bağ kuvvetini neden belirgin şekilde zayıflatır?',
      options: [
        { id: 'opt-1', text: 'Suyun yüksek dielektrik sabiti (ε ≈ 80) elektrostatik çekim kuvvetini ~80 kat perdeler ve zayıflatır.', isCorrect: true },
        { id: 'opt-2', text: 'Su molekülleri ilacın tersiyer aminini deprotonize ederek net pozitif yükü nötralize eder.', isCorrect: false, misconceptionDiagnosed: 'TRAP-01-IONIZATION' },
        { id: 'opt-3', text: 'Su ortamında mesafe (r) sıfıra yaklaştığı için bağ kovalent karaktere bürünür.', isCorrect: false }
      ],
      hintLadder: [
        'Nudge: Formüldeki paydada yer alan dielektrik katsayısına (ε) odaklanın.',
        'Clue: Suyun dielektrik sabiti havanınkine (ε=1) kıyasla 80 kat büyüktür.',
        'Solution: Su yüksek dielektrik katsayısı (ε ≈ 80) nedeniyle iyonlar arasındaki elektrostatik alanı perdeler ve bağ kuvvetini seyreltir [Slayt 13-14].'
      ],
      diagnosticVerdict: 'Tebrikler! Bu yüzden reseptörün hidrofobik cebindeki iyonik bağlar, sulu yüzeydekinden çok daha güçlüdür.'
    },
    updatedAt: '2026-10-08T12:00:00.000Z'
  },
  {
    slideId: 'medchem-slide-19',
    courseId: 'medchem',
    facultySlug: 'marmara-eczacilik',
    lectureDeckId: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
    slideNumber: 19,
    title: 'Molekül İçi vs Moleküller Arası Hidrojen Bağı (Salisilik Asit)',
    conceptSummary: 'Salisilik asit (o-hidroksibenzoik asit) molekül içi H-bağı yaparak şelat halkası oluşturur ve antibakteriyel etki gösterir. p- ve m- izomerleri polimerleşir ve etki göstermez.',
    highYieldScore: 88,
    tier: 'CRITICAL_TIER_1',
    rawFactors: { c_freq: 2.6, e_emph: 2.2, s_struct: 1.8, m_cohort: 2.0, gamma_cal: 1.0 },
    linkedTrapCodes: ['TRAP-05-BIOISOSTERE-LOGP'],
    boundingSpotlight: { xNorm: 0.1, yNorm: 0.3, wNorm: 0.8, hNorm: 0.5 },
    predictPrompt: 'Salisilik asidin o-izomeri antibakteriyelken, p-izomerinin etkisiz olması hidrojen bağı yönüyle nasıl sorulur?',
    examQuestionSnippet: 'Salisilik asit ve p-hidroksibenzoik asit moleküllerinin antibakteriyel aktivitelerindeki farkı hidrojen bağı tipleri açısından kıyaslayınız.',
    cramQuestion: {
      questionPrompt: 'Salisilik asit (orto-izomer) antibakteriyel aktivite gösterirken, para-hidroksibenzoik asidin antibakteriyel aktivite göstermemesinin temel nedeni nedir?',
      options: [
        { id: 'opt-1', text: 'Salisilik asit molekül içi H-bağı yaparak monomer kalır; para-izomer ise moleküller arası H-bağlarıyla polimerleşir.', isCorrect: true },
        { id: 'opt-2', text: 'Para-izomer fizyolojik pH\'da zwitterion oluşturduğu için bakteriyel zara penetre olamaz.', isCorrect: false, misconceptionDiagnosed: 'TRAP-05-BIOISOSTERE-LOGP' },
        { id: 'opt-3', text: 'Orto-izomer kovalent ester bağı oluştururken para-izomer sadece Van der Waals bağı kurabilir.', isCorrect: false }
      ],
      hintLadder: [
        'Nudge: Komşu fenolik -OH ile karboksil -COOH arasındaki mekansal yakınlığı inceleyin.',
        'Clue: Orto konumdaki gruplar 6 üyeli psödo-halka oluşturur; para konumda mesafe buna izin vermez.',
        'Solution: Salisilik asit molekül içi H-bağı ile şelat halkası oluşturarak bağımsız molekül kalır; p-izomer moleküller arası bağla birleştiğinden hedefe ulaşamaz [Slayt 19].'
      ],
      diagnosticVerdict: 'Harika bir Farmasötik Kimya klasiği! Bu soru Marmara ve Hacettepe vize sınavlarının en sevilen klasik sorularındandır.'
    },
    updatedAt: '2026-10-08T12:00:00.000Z'
  },
  {
    slideId: 'medchem-slide-25',
    courseId: 'medchem',
    facultySlug: 'marmara-eczacilik',
    lectureDeckId: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
    slideNumber: 25,
    title: 'Hidrofobik Etkileşim & Entropi İtici Gücü',
    conceptSummary: 'Hidrofobik etkileşimin itici gücü yeni bir kimyasal bağ oluşumu değil, su moleküllerinin serbestleşerek sistem entropisini artırmasıdır (ΔS > 0, ΔG < 0).',
    highYieldScore: 95,
    tier: 'CRITICAL_TIER_1',
    rawFactors: { c_freq: 2.9, e_emph: 2.4, s_struct: 1.9, m_cohort: 2.3, gamma_cal: 1.0 },
    linkedTrapCodes: ['TRAP-05-BIOISOSTERE-LOGP'],
    boundingSpotlight: { xNorm: 0.1, yNorm: 0.2, wNorm: 0.8, hNorm: 0.6 },
    predictPrompt: 'Hidrofobik etkileşimin bir kimyasal bağ değil termodinamik entropi olayı olduğu vizede nasıl sorulur?',
    examQuestionSnippet: 'Hidrofobik etkileşimlerin termodinamik mekanizmasını, su kafesleri (iceberg effect) ve entropi (ΔS) değişimi çerçevesinde açıklayınız.',
    cramQuestion: {
      questionPrompt: 'İlaç-reseptör kompleksleşmesinde hidrofobik etkileşimin serbest enerji değişimine (ΔG < 0) katkısı temel olarak nereden kaynaklanır?',
      options: [
        { id: 'opt-1', text: 'Apolar yüzeyleri saran düzenli su kafeslerinin serbest kalarak sistemin entropisini artırmasından (ΔS > 0).', isCorrect: true },
        { id: 'opt-2', text: 'Karbon-hidrojen atomları arasında yüksek enerjili kovalent pi-orbitallerinin örtüşmesinden.', isCorrect: false },
        { id: 'opt-3', text: 'Apolar moleküllerin negatif entalpi açığa çıkararak ekzotermik bağ yapmasından (ΔH << 0).', isCorrect: false, misconceptionDiagnosed: 'TRAP-05-BIOISOSTERE-LOGP' }
      ],
      hintLadder: [
        'Nudge: Termodinamiğin temel formülü ΔG = ΔH - TΔS eşitliğini hatırlayın.',
        'Clue: Hidrofobik etkileşim entalpi güdümlü değil, düzensizlik (entropi) güdümlü bir olaydır.',
        'Solution: Apolar kısımlar bir araya geldiğinde etraflarındaki rijit su kafesleri dağılır; serbest su molekülleri rastgele hareket ederek entropiyi artırır [Slayt 25].'
      ],
      diagnosticVerdict: 'Mükemmel termodinamik kavrayış! Bu soru öğrencilerin %65\'inin entalpi yanılgısına düştüğü en kritik vize tuzağıdır.'
    },
    updatedAt: '2026-10-08T12:00:00.000Z'
  },
  {
    slideId: 'medchem-slide-33',
    courseId: 'medchem',
    facultySlug: 'marmara-eczacilik',
    lectureDeckId: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
    slideNumber: 33,
    title: 'Dibukain Çoklu Etkileşim Entegrasyonu',
    conceptSummary: 'Dibukain tek molekülde tüm bağ tiplerini sergiler: Kinolin (yük transferi & pi-istifleme), amit (H-bağı), bütoksi (Van der Waals), protonize tersiyer amin (iyonik çekim).',
    highYieldScore: 96,
    tier: 'CRITICAL_TIER_1',
    rawFactors: { c_freq: 3.0, e_emph: 2.5, s_struct: 2.0, m_cohort: 2.2, gamma_cal: 1.0 },
    linkedTrapCodes: ['TRAP-03-ESTER-AMIDE', 'TRAP-01-IONIZATION'],
    boundingSpotlight: { xNorm: 0.05, yNorm: 0.15, wNorm: 0.9, hNorm: 0.7 },
    predictPrompt: 'Dibukain molekülünün yapısal formülü verilerek her fonksiyonel grubun reseptörle kurduğu bağ nasıl sorulur?',
    examQuestionSnippet: 'Dibukain molekülünün kimyasal yapısını çizerek kinolin halkası, amit grubu, bütoksi zinciri ve tersiyer aminin reseptörle yaptığı bağ tiplerini gösteriniz.',
    cramQuestion: {
      questionPrompt: 'Dibukain molekülünde yer alan bütoksi (-O-C4H9) kuyruğu ile kinolin çekirdeğinin reseptörle kurduğu bağ tipleri sırasıyla hangisinde doğru verilmiştir?',
      options: [
        { id: 'opt-1', text: 'Bütoksi kuyruğu: Van der Waals (hidrofobik); Kinolin çekirdeği: Yük transferi ve hidrofobik düzlemsel bağlanma.', isCorrect: true },
        { id: 'opt-2', text: 'Bütoksi kuyruğu: Güçlü iyonik bağ; Kinolin çekirdeği: Geri dönüşümsüz kovalent açilleme.', isCorrect: false, misconceptionDiagnosed: 'TRAP-03-ESTER-AMIDE' },
        { id: 'opt-3', text: 'Bütoksi kuyruğu: Şelasyon bağı; Kinolin çekirdeği: Molekül içi hidrojen bağı.', isCorrect: false, misconceptionDiagnosed: 'TRAP-01-IONIZATION' }
      ],
      hintLadder: [
        'Nudge: Alifatik hidrokarbon zinciri polar mıdır yoksa apolar mı?',
        'Clue: Kinolin aromatik ve heteroatomlu konjuge bir düzlemdir, yük transferine ve pi-istiflenmesine yatkındır.',
        'Solution: Bütoksi alifatik kuyruğu Van der Waals oluşturur; kinolin heterosiklik aromatik çekirdeği yük transferi ve hidrofobik bağlanma yapar [Slayt 33].'
      ],
      diagnosticVerdict: 'Tam puanlık vize cevabı! Dibukain tüm bağ tiplerini bir arada barındıran en kapsamlı entegrasyon örneğidir.'
    },
    updatedAt: '2026-10-08T12:00:00.000Z'
  },

  // =========================================================================
  // COURSE B: FARMAKOLOJİ (Marmara Üniversitesi Eczacılık Fakültesi)
  // =========================================================================
  {
    slideId: 'pharm-slide-14',
    courseId: 'pharmacology',
    facultySlug: 'marmara-eczacilik',
    lectureDeckId: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
    slideNumber: 14,
    title: 'Schild Regresyonu & Kompetitif Antagonizma Eğimi',
    conceptSummary: 'Schild denklemi: log(CR-1) = log[B] - logKB. Doğru kompetitif reversibl antagonist için eğim tam olarak 1.0 olmak zorundadır.',
    highYieldScore: 98,
    tier: 'CRITICAL_TIER_1',
    rawFactors: { c_freq: 3.0, e_emph: 2.5, s_struct: 2.0, m_cohort: 2.4, gamma_cal: 1.0 },
    linkedTrapCodes: ['TRAP-07-SCHILD-SLOPE'],
    boundingSpotlight: { xNorm: 0.1, yNorm: 0.25, wNorm: 0.8, hNorm: 0.55 },
    predictPrompt: 'Schild grafiğinde eğimin 1.0 çıkması veya 1.0\'dan farklı çıkmasının farmakolojik anlamı nasıl sorulur?',
    examQuestionSnippet: 'Schild regresyon doğrusunun denklemini yazınız. Eğimin 1.0 olmasının biyolojik kanıtını ve 1.0\'dan sapma nedenlerini açıklayınız.',
    cramQuestion: {
      questionPrompt: 'Bir antagonistin Schild regresyon grafiğinde eğiminin tam olarak 1.0 bulunması neyi kesin olarak kanıtlar?',
      options: [
        { id: 'opt-1', text: 'Antagonistin tek bir reseptör bölgesine 1:1 stokiyometrik ve basit kompetitif reversibl bağlandığını.', isCorrect: true },
        { id: 'opt-2', text: 'Reseptör rezervinin (spare receptors) bulunmadığını ve ilacın tam agonist olduğunu.', isCorrect: false, misconceptionDiagnosed: 'TRAP-02-SPARE-RECEPTORS' },
        { id: 'opt-3', text: 'Antagonistin allosterik bölgeden kovalent bağlanarak Emax değerini sıfırladığını.', isCorrect: false, misconceptionDiagnosed: 'TRAP-07-SCHILD-SLOPE' }
      ],
      hintLadder: [
        'Nudge: Schild eşitliğinde agonist ile antagonistin aynı bağlanma bölgesi için yarışması esastır.',
        'Clue: Eğim 1.0\'dan farklı çıkarsa allosterik etki veya birden fazla reseptör alt tipi düşünülür.',
        'Solution: Eğim = 1.0 olması, antagonistin agonist ile aynı aktif bölge için 1:1 oranında rekabet ettiğinin kesin kanıtıdır [Farmakoloji Hafta 1].'
      ],
      diagnosticVerdict: 'Kesinlikle doğru! Eğim 1.0 olduğunda x-ekseni kesişim noktası doğrudan pA2 (= -logKB) değerini verir.'
    },
    updatedAt: '2026-10-08T12:00:00.000Z'
  },
  {
    slideId: 'pharm-slide-21',
    courseId: 'pharmacology',
    facultySlug: 'marmara-eczacilik',
    lectureDeckId: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
    slideNumber: 21,
    title: 'Parsiyel Agonist & İntrensek Etkinlik İkilemi',
    conceptSummary: 'Parsiyel agonistler reseptörün tamamını bağlasa bile %100 yanıt oluşturamaz (0 < alpha < 1). Tam agonist varlığında kompetitif antagonist gibi davranırlar.',
    highYieldScore: 94,
    tier: 'CRITICAL_TIER_1',
    rawFactors: { c_freq: 2.8, e_emph: 2.3, s_struct: 1.9, m_cohort: 2.3, gamma_cal: 1.0 },
    linkedTrapCodes: ['TRAP-02-POTENCY-EFFICACY'],
    boundingSpotlight: { xNorm: 0.1, yNorm: 0.2, wNorm: 0.8, hNorm: 0.6 },
    predictPrompt: 'Parsiyel agonist bir ilacın yüksek dozda tam agonist bulunan bir ortama eklendiğinde oluşturacağı yanıt nasıl sorulur?',
    examQuestionSnippet: 'Parsiyel agonistin tek başına ve tam agonist mevcudiyetindeki doz-yanıt eğrilerini çizerek intrensek etkinlik kavramını tartışınız.',
    cramQuestion: {
      questionPrompt: 'Ortamda doymuş konsantrasyonda tam agonist (%100 yanıt) varken ortama yüksek konsantrasyonda parsiyel agonist (α = 0.4) eklenirse sistem yanıtı ne olur?',
      options: [
        { id: 'opt-1', text: 'Sistem yanıtı %100\'den %40 seviyesine düşer; parsiyel agonist kompetitif antagonist gibi davranır.', isCorrect: true },
        { id: 'opt-2', text: 'İki agonist birbirinin etkisini sinerjistik artırarak sistem yanıtını %140\'a çıkarır.', isCorrect: false, misconceptionDiagnosed: 'TRAP-02-POTENCY-EFFICACY' },
        { id: 'opt-3', text: 'Parsiyel agonist reseptörden tam agonisti sökemeyeceği için yanıt %100 olarak sabit kalır.', isCorrect: false }
      ],
      hintLadder: [
        'Nudge: Parsiyel agonist tam agonistle aynı bağlanma bölgesi için yarışır.',
        'Clue: Parsiyel agonist tüm reseptörleri kapladığında oluşturabileceği tavan yanıt kendi intrensek etkinliğidir (α = 0.4).',
        'Solution: Yüksek dozda parsiyel agonist tam agonisti reseptörden kovar; maksimum yanıt kendi tavanı olan %40\'a geriler [Farmakoloji Hafta 1].'
      ],
      diagnosticVerdict: 'Harika kavrayış! Bu klinik farmakolojide buprenorfin (opioid parsiyel agonisti) zehirlenme ve tedavi paradoksunun temelidir.'
    },
    updatedAt: '2026-10-08T12:00:00.000Z'
  },
  {
    slideId: 'pharm-slide-27',
    courseId: 'pharmacology',
    facultySlug: 'marmara-eczacilik',
    lectureDeckId: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
    slideNumber: 27,
    title: 'Furchgott Yedek Reseptör (Spare Receptors) Deneyi',
    conceptSummary: 'Geri dönüşümsüz antagonist düşük konsantrasyonda Emax değerini düşürmez, eğriyi sağa kaydırır. Bu durum dokuda yedek reseptör bulunduğunu kanıtlar.',
    highYieldScore: 92,
    tier: 'CRITICAL_TIER_1',
    rawFactors: { c_freq: 2.7, e_emph: 2.3, s_struct: 1.8, m_cohort: 2.2, gamma_cal: 1.0 },
    linkedTrapCodes: ['TRAP-02-SPARE-RECEPTORS'],
    boundingSpotlight: { xNorm: 0.1, yNorm: 0.25, wNorm: 0.8, hNorm: 0.55 },
    predictPrompt: 'Furchgott deneyinde doku geri dönüşümsüz antagonist ile muamele edildiğinde EC50 ve Emax değişimleri nasıl sorulur?',
    examQuestionSnippet: 'Yedek reseptör kavramını tanımlayınız. Fenoksibenzamin ile muamele edilen düz kasta histamin doz-yanıt eğrilerinin neden önce sağa kaydığını açıklayınız.',
    cramQuestion: {
      questionPrompt: 'Bir doku düşük konsantrasyonda kovalent (geri dönüşümsüz) antagonist ile bloke edildiğinde agonist eğrisinin Emax düşmeden sadece sağa kayması neyi gösterir?',
      options: [
        { id: 'opt-1', text: 'Dokuda yedek reseptör (spare receptor) bulunduğunu ve maksimum yanıt için reseptörlerin küçük bir yüzdesinin yettiğini.', isCorrect: true },
        { id: 'opt-2', text: 'Antagonistin aslında kovalent değil basit kompetitif reversibl bağlandığını.', isCorrect: false, misconceptionDiagnosed: 'TRAP-07-SCHILD-SLOPE' },
        { id: 'opt-3', text: 'Agonistin intrensek etkinliğinin sıfır olduğunu ve potansiyelizasyon geliştiğini.', isCorrect: false, misconceptionDiagnosed: 'TRAP-02-SPARE-RECEPTORS' }
      ],
      hintLadder: [
        'Nudge: Maksimum yanıt için dokudaki reseptörlerin tamamının uyarılması zorunlu mudur?',
        'Clue: Sinyal iletim kaskadındaki amplifikasyon (örneğin GPCR) sayesinde %5 reseptör doluluğu %100 yanıt verebilir.',
        'Solution: Düşük doz irreversibl antagonist yedek reseptörleri yok eder ama kalan reseptörler hala %100 yanıt üretebildiği için eğri sadece sağa kayar [Farmakoloji Hafta 1].'
      ],
      diagnosticVerdict: 'Tebrikler! Düşük dozda eğri sağa kayar, yedek reseptör rezervi tükendiğinde ise Emax çökmeye başlar.'
    },
    updatedAt: '2026-10-08T12:00:00.000Z'
  },
  {
    slideId: 'pharm-slide-35',
    courseId: 'pharmacology',
    facultySlug: 'marmara-eczacilik',
    lectureDeckId: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
    slideNumber: 35,
    title: 'Kuantal Doz-Yanıt & Terapötik İndeks (TI) Tuzağı',
    conceptSummary: 'Terapötik indeks TI = TD50 / ED50 veya LD50 / ED50 formülüyle hesaplanır. Eğrilerin eğimi paralel değilse tek başına TI güvenliğin garantisi değildir.',
    highYieldScore: 86,
    tier: 'CRITICAL_TIER_1',
    rawFactors: { c_freq: 2.5, e_emph: 2.1, s_struct: 1.8, m_cohort: 2.0, gamma_cal: 1.0 },
    linkedTrapCodes: ['TRAP-02-POTENCY-EFFICACY'],
    boundingSpotlight: { xNorm: 0.15, yNorm: 0.25, wNorm: 0.7, hNorm: 0.5 },
    predictPrompt: 'Terapötik indeks formülü ve eğrilerin eğimlerinin paralel olmaması durumundaki güvenlik riski nasıl sorulur?',
    examQuestionSnippet: 'Terapötik indeksi (TI) formüle ediniz. İki ilacın TI değerleri aynı olsa dahi kuantal eğri eğimlerinin güvenliğe etkisini kıyaslayınız.',
    cramQuestion: {
      questionPrompt: 'İki ilacın TD50/ED50 oranı eşit (TI = 4) olmasına rağmen, biri diğerinden belirgin şekilde daha tehlikeli olabilir. Bunun nedeni nedir?',
      options: [
        { id: 'opt-1', text: 'Toksik etki eğrisinin eğimi daha dik veya paralel değilse, ED99 ile TD1 dozları tehlikeli biçimde çakışabilir.', isCorrect: true },
        { id: 'opt-2', text: 'Terapötik indeks hesaplanırken ilacın plazma proteinlerine bağlanması hesaba katılmadığı için.', isCorrect: false },
        { id: 'opt-3', text: 'Kuantal doz yanıt eğrisinde medyan efektif dozun her zaman sıfıra eşit olmasından dolayı.', isCorrect: false, misconceptionDiagnosed: 'TRAP-02-POTENCY-EFFICACY' }
      ],
      hintLadder: [
        'Nudge: ED50 ve TD50 popülasyonun sadece %50\'sini temsil eder. Aşırı hassas bireyleri düşünün.',
        'Clue: Doğru güvenlik oranı Certain Safety Factor = TD1 / ED99 ile ölçülür.',
        'Solution: Eğriler paralel değilse, median oran (TI) yüksek görünse bile terapötik dozun tavanı (ED99) toksik dozun tabanını (TD1) aşabilir [Farmakoloji Hafta 1].'
      ],
      diagnosticVerdict: 'Doğru! Bu yüzden rasyonel farmakolojide CSF (Certain Safety Factor) = TD1 / ED99 > 1 olması istenir.'
    },
    updatedAt: '2026-10-08T12:00:00.000Z'
  },
  {
    slideId: 'pharm-slide-42',
    courseId: 'pharmacology',
    facultySlug: 'marmara-eczacilik',
    lectureDeckId: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
    slideNumber: 42,
    title: 'GPCR Gs vs Gi vs Gq Sinyal Kaskadları & İkincil Haberciler',
    conceptSummary: 'Gs adenilat siklazı uyarır (cAMP artar, PKA aktive olur). Gi adenilat siklazı inhibe eder. Gq fosfolipaz C\'yi uyararak IP3 (kalsiyum salınımı) ve DAG (PKC) üretir.',
    highYieldScore: 90,
    tier: 'CRITICAL_TIER_1',
    rawFactors: { c_freq: 2.7, e_emph: 2.2, s_struct: 1.8, m_cohort: 2.1, gamma_cal: 1.0 },
    linkedTrapCodes: ['TRAP-04-ADRENERGIC-INVERSION'],
    boundingSpotlight: { xNorm: 0.1, yNorm: 0.2, wNorm: 0.8, hNorm: 0.6 },
    predictPrompt: 'Adrenerjik alfa-1, beta-1 ve muskarinik M2 reseptörlerinin eşleştiği G-proteini ve ikincil habercileri tablosu nasıl sorulur?',
    examQuestionSnippet: 'Gs, Gi ve Gq proteinlerinin aktive ettiği efektör enzimleri ve ikincil habercileri yazarak birer reseptör örneği veriniz.',
    cramQuestion: {
      questionPrompt: 'Alfa-1 adrenerjik ve M3 muskarinik reseptörlerin düz kasta kasılma oluştururken kullandığı G-proteini ve kaskadı hangisidir?',
      options: [
        { id: 'opt-1', text: 'Gq proteini -> Fosfolipaz C (PLC) aktivasyonu -> IP3 (Ca2+ salınımı) ve DAG (PKC aktivasyonu).', isCorrect: true },
        { id: 'opt-2', text: 'Gs proteini -> Guanilil siklaz aktivasyonu -> cGMP artışı -> Miyozin hafif zincir defosforilasyonu.', isCorrect: false, misconceptionDiagnosed: 'TRAP-04-ADRENERGIC-INVERSION' },
        { id: 'opt-3', text: 'Gi proteini -> Adenilat siklaz inhibisyonu -> cAMP düşüşü -> Kalsiyum kanallarının doğrudan kapanması.', isCorrect: false }
      ],
      hintLadder: [
        'Nudge: Düz kasta kasılma hücre içi kalsiyum ([Ca2+]i) artışına bağlıdır.',
        'Clue: Sarkoplazmik retikulumdan kalsiyumu hangi inositol türevi salıverir?',
        'Solution: Gq alt birimi Fosfolipaz C-beta enzimini uyarır; oluşan IP3 sarkoplazmik retikulumdan Ca2+ salıvererek kasılma sağlar [Farmakoloji Hafta 1].'
      ],
      diagnosticVerdict: 'Kesinlikle doğru! Bu kaskad otonom sinir sistemi farmakolojisinin omurgasıdır.'
    },
    updatedAt: '2026-10-08T12:00:00.000Z'
  }
];
