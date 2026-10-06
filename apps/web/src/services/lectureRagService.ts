import { getSupabase } from '@pharmacy/platform';

export interface KnowledgeNode {
  id: string;
  lectureId: string;
  courseId: string;
  title: string;
  slides: number[];
  keywords: string[];
  summary: string;
  contentMarkdown: string;
}

// Inlined indexed representations of the 10 atomic markdown knowledge nodes for fast, zero-latency client-side RAG
export const ATOMIC_KNOWLEDGE_NODES: KnowledgeNode[] = [
  {
    id: 'node-01-reseptor-bag-dengesi',
    lectureId: 'medchem-1',
    courseId: 'medchem',
    title: 'Reseptör ve Bağ Gücü Dengesi',
    slides: [2, 3, 5, 6],
    keywords: ['reseptör', 'bağ kuvveti', 'geri dönüşümlü', 'konformasyon', 'afinite', 'intrensek'],
    summary: 'İlaç-reseptör bağları reseptör konformasyonunu değiştirecek kadar güçlü, sinyal iletiminden sonra ilacı bırakacak kadar geri dönüşümlü olmalıdır.',
    contentMarkdown: `İlaç etkisinin ortaya çıkabilmesi için bağlar reseptör konformasyonunu değiştirecek kadar güçlü, sinyal iletildikten sonra ilacı serbest bırakacak kadar geri dönüşümlü olmalıdır (Slayt 2). Reseptörler hücre zarı yüzeyinde veya nükleusta yer alır (Slayt 5). Ligandı tanıma (afinite) ve kimyasal sinyali biyolojik sinyale çevirme (intrensek aktivite) fonksiyonlarına sahiptir (Slayt 6).`,
  },
  {
    id: 'node-02-kovalan-baglar-ve-alkilleme',
    lectureId: 'medchem-1',
    courseId: 'medchem',
    title: 'Kovalan Bağlar ve Alkilleme',
    slides: [9, 10, 11, 12],
    keywords: ['kovalan', 'alkilleme', 'açilasyon', 'fosforilasyon', 'aspirin', 'organofosfat', 'azotlu hardal', 'fenoksibenzamin'],
    summary: 'Kovalan bağ en güçlü bağdır (40-140 kcal/mol) ve geri dönüşümsüzdür. 3 temel mekanizma: Alkilleme (nitrojen mustards), Açilasyon (Aspirin, penisilin), Fosforilasyon (Organofosfatlar).',
    contentMarkdown: `Kovalan bağ 40-140 kcal/mol ile en güçlü ve geri dönüşümsüz bağdır (Slayt 9). Alkilleme: Azotlu hardallar ve fenoksibenzamin biyomakromoleküllere alkil grubu aktarır (Slayt 10). Açilasyon: Aspirin COX enzimini asetiller; penisilinler transpeptidazı açiller (Slayt 11). Fosforilasyon: Organofosfatlı insektisitler asetilkolinesteraz enziminin serin hidroksilini fosforilleyerek kalıcı kilitler (Slayt 12).`,
  },
  {
    id: 'node-03-iyonik-baglar-ve-mesafe',
    lectureId: 'medchem-1',
    courseId: 'medchem',
    title: 'İyonik Bağlar ve Mesafe Bağımlılığı',
    slides: [13, 14],
    keywords: ['iyonik', 'elektrostatik', 'mesafe', '1/d', 'katyon', 'anyon', 'tersiyer amin', 'karboksilat'],
    summary: 'İyonik bağlar 5-10 kcal/mol kuvvetinde olup mesafe ile ters orantılıdır (1/d). İlaç reseptöre yaklaşırken ilk yönlendirici çekimi başlatır.',
    contentMarkdown: `Zıt yüklü iki iyon arasındaki elektrostatik çekimdir (5-10 kcal/mol, Slayt 13). Kuvveti mesafe ile ters orantılıdır (1/d, Slayt 14). Uzun menzilli olduğu için ilacın reseptör cebine ilk yaklaşımında ve doğru oryantasyon kazanmasında birincil rol oynar.`,
  },
  {
    id: 'node-04-hidrojen-baglari-ve-mesafe',
    lectureId: 'medchem-1',
    courseId: 'medchem',
    title: 'Hidrojen Bağları ve Salisilik Asit',
    slides: [15, 16, 17, 18, 19],
    keywords: ['hidrojen bağı', 'donor', 'akseptör', 'salisilik asit', 'intramoleküler', 'pka', 'izomer'],
    summary: 'Elektronegatif atoma bağlı H ile komşu elektronegatif atomun elektron çifti arasındaki çekimdir (2-7 kcal/mol). Salisilik asit intramoleküler H-bağı sayesinde meta/para izomerlerinden daha kuvvetli asittir.',
    contentMarkdown: `H-bağı 2-7 kcal/mol kuvvetindedir (Slayt 15). Donörler: -OH, -NH2. Akseptörler: C=O, -O-, :N. Salisilik asitte intramoleküler (molekül içi) H-bağı karboksilat anyonunu rezonansla stabilize eder; bu nedenle orto-izomer meta ve para izomerlerine göre çok daha kuvvetli bir asittir (pKa ≈ 2.97, Slayt 19).`,
  },
  {
    id: 'node-05-iyon-dipol-ve-dipol-dipol',
    lectureId: 'medchem-1',
    courseId: 'medchem',
    title: 'İyon-Dipol ve Dipol-Dipol Etkileşimleri',
    slides: [20, 21],
    keywords: ['iyon-dipol', 'dipol-dipol', 'keesom', '1/d2', '1/d3', 'kısmi yük', 'polar'],
    summary: 'İyon-dipol etkileşimi (1-5 kcal/mol) 1/d² ile; dipol-dipol etkileşimi (1-3 kcal/mol) 1/d³ ile orantılıdır.',
    contentMarkdown: `İyon-dipol etkileşimi tam bir iyon ile polar bir bağın kısmi yükü arasındadır (1-5 kcal/mol, 1/d² bağımlılığı, Slayt 20). Dipol-dipol etkileşimi iki polar dipolün oryantasyonudur (1-3 kcal/mol, 1/d³ bağımlılığı, Slayt 21).`,
  },
  {
    id: 'node-06-van-der-waals-ve-hidrofobik-entropi',
    lectureId: 'medchem-1',
    courseId: 'medchem',
    title: 'Van der Waals ve Hidrofobik Entropi',
    slides: [24, 25],
    keywords: ['van der waals', 'london', 'geçici dipol', '1/d6', 'hidrofobik', 'entropi', 'klatrat', 'su'],
    summary: 'Van der Waals geçici dipollerle oluşur (0.5-1 kcal/mol, 1/d⁶). Hidrofobik etkileşimin itici gücü klatrat su kafesinin parçalanmasıyla doğan ENTROPİ artışıdır (ΔS > 0).',
    contentMarkdown: `Van der Waals kuvvetleri geçici dipollerle oluşur (0.5-1 kcal/mol) ve mesafe ile 1/d⁶ bağımlıdır (Slayt 24). Hidrofobik etkileşimde temel termodinamik motor ENTROPİDİR (ΔS > 0): İlaç cebi doldururken klatrat su kafesi serbest kalır ve sistemin düzensizliği artarak bağlanmayı kendiliğinden yürütür (Slayt 25).`,
  },
  {
    id: 'node-07-yuk-transfer-kompleksleri',
    lectureId: 'medchem-1',
    courseId: 'medchem',
    title: 'Yük Transfer Kompleksleri',
    slides: [22, 23],
    keywords: ['yük transfer', 'charge transfer', 'elektron donörü', 'elektron akseptörü', 'pi-pi', 'interkalasyon'],
    summary: 'Elektronca zengin donör aromatik halka ile elektronca fakir akseptör halka arasında pi-elektron aktarımıyla oluşur (1-7 kcal/mol).',
    contentMarkdown: `Elektron donörü (alkoksi/amino aromatikler) ile elektron akseptörü (nitro/siyano aromatikler) arasında pi veya n elektronu transferiyle kurulur (1-7 kcal/mol, Slayt 22). Reseptördeki fenilalanin, tirozin, triptofan rezidüleriyle pi-istiflenme ve DNA interkalasyonunda temeldir (Slayt 23).`,
  },
  {
    id: 'node-08-selasyon-ve-metal-baglanma',
    lectureId: 'medchem-1',
    courseId: 'medchem',
    title: 'Şelasyon ve Metal İyonlarına Bağlanma',
    slides: [30],
    keywords: ['şelasyon', 'chelation', 'edta', 'dimerkaprol', 'penisilamin', 'tetrasiklin', '5-6 üyeli halka', 'katyon'],
    summary: 'Bir ligandın iki veya daha fazla atomla merkezi metali kavrayarak 5-6 üyeli halka oluşturmasıdır. Tetrasiklinlerin çok değerlikli katyonlarla çökmesi klasik örnektir.',
    contentMarkdown: `Şelasyon iki veya daha çok donör atomun merkezi metali kıskaç gibi kavramasıdır; en kararlı yapılar 5 ve 6 üyeli halkalardır (Slayt 30). EDTA (Pb), Dimerkaprol (As/Hg/Au) ve D-Penisilamin (Cu) antidot olarak kullanılır. Tetrasiklin ve florokinolonlar Ca²⁺, Mg²⁺, Fe²⁺ ile şelat oluşturarak emilemez hale gelir.`,
  },
  {
    id: 'node-09-izosterizm_ve_biyoizosterizm',
    lectureId: 'medchem-1',
    courseId: 'medchem',
    title: 'İzosterizm ve Biyoizosterizm',
    slides: [26, 27, 28, 29],
    keywords: ['izosterizm', 'biyoizosterizm', 'langmuir', 'grimm', 'tetrazol', 'karboksilik asit', 'losartan'],
    summary: 'Langmuir dış kabuk elektron benzerliğini, Friedman biyoizosterizmi tanımlamıştır. Non-klasik biyoizoster örneği: -COOH yerine Tetrazol halkası (Losartan).',
    contentMarkdown: `Langmuir izosterizmi dış kabuk benzerliği olarak tanımlamıştır (Slayt 26). Biyoizosterizm (Friedman, 1951) ise molekülde benzer biyolojik yanıt üreten atom/grup takaslarıdır (Slayt 27). Non-klasik biyoizoster örneği: Karboksilik asit (-COOH) yerine Tetrazol halkası konulmasıdır; tetrazol asidik karakteri korurken lipofilisiteyi artırır ve metabolik direnç kazandırır (Slayt 29).`,
  },
  {
    id: 'node-10-dibukain-ve-lokal-anestezik-sar',
    lectureId: 'medchem-1',
    courseId: 'medchem',
    title: 'Dibukain ve Lokal Anesteziklerde SAR',
    slides: [31, 32, 33],
    keywords: ['dibukain', 'cinchocaine', 'lokal anestezik', 'prokain', 'lidokain', 'amit', 'ester', 'psödokolinesteraz', 'kinolin'],
    summary: 'Lokal anestezikler aromatik halka, ara köprü (ester/amit) ve amin ucundan oluşur. Esterler (Prokain) hızla hidroliz edilir; amitler (Dibukain) dirençlidir ve kinolin halkası sayesinde 20 kat güçlüdür.',
    contentMarkdown: `Lokal anesteziklerde aromatik halka hidrofobik bağlanma, ara köprü (ester/amit) stabilite, amin ucu ise iyonik bağlanma sağlar (Slayt 31). Ester köprülü Prokain plazma psödokolinesterazıyla dakikalar içinde hidroliz olur. Amit köprülü Dibukain ise kinolin çekirdeği ve butoksi zinciriyle çok güçlü bağlanır ve plazma hidrolizine tamamen dirençlidir (Slayt 33).`,
  },
  // --- Pharmacology Course Nodes (Prof. Dr. Feyza Arıcıoğlu) ---
  {
    id: 'pharm-node-01-reseptor-turleri',
    lectureId: 'pharm-1',
    courseId: 'pharmacology',
    title: 'Reseptör Kavramı ve Dört Temel Reseptör Ailesi',
    slides: [1, 2, 3, 5, 6, 7],
    keywords: ['reseptör', 'iyon kanalı', 'GPCR', 'tirozin kinaz', 'nükleer reseptör', 'intraselüler', 'transdüksiyon'],
    summary: 'İlaçların hedefi olan 4 reseptör ailesi: İyonotropik (milisaniyeler), GPCR (saniyeler), Enzim kenetli/kinaz (dakikalar-saatler) ve Nükleer reseptörler (saatler-günler).',
    contentMarkdown: `Dört temel reseptör ailesi: 1) İyonotropik kanallar (nikotinik ACh, GABAA): milisaniyeler. 2) GPCR (muskarinik, adrenerjik): saniyeler. 3) Enzim kenetli reseptörler (insülin tirozin kinaz): dakikalar-saatler. 4) Nükleer reseptörler (glukokortikoid, tiroid T3/T4): intraselüler yerleşimlidir ve gen ekspresyonunu modüle eder (saatler-günler, Slayt 1-7).`,
  },
  {
    id: 'pharm-node-02-kd-ve-afinite',
    lectureId: 'pharm-1',
    courseId: 'pharmacology',
    title: 'Kütle Hareketi Kanunu ve Kd Ayrışma Sabiti',
    slides: [9, 10, 11, 12, 13],
    keywords: ['kd', 'afinite', 'kütle hareketi', 'langmuir', 'fraksiyonel doluluk'],
    summary: 'Afinite 1/Kd ile orantılıdır. Kd toplam reseptörlerin %50’sini doyuran serbest ilaç konsantrasyonudur.',
    contentMarkdown: `Kütle hareketi kanununa göre Kd = koff / kon = [D][R] / [DR]. Afinite 1/Kd ile ters orantılıdır. Hill-Langmuir denklemine göre serbest ilaç konsantrasyonu [D] = Kd olduğunda reseptörlerin tam olarak %50’si doludur (f_occ = 0.5, Slayt 10, 12).`,
  },
  {
    id: 'pharm-node-03-ec50-ve-emax',
    lectureId: 'pharm-1',
    courseId: 'pharmacology',
    title: 'Kademeli Doz-Yanıt Eğrileri, EC50 Potens ve Emax',
    slides: [14, 15, 16, 17, 18],
    keywords: ['ec50', 'emax', 'potens', 'etkinlik', 'efficacy', 'doz yanıt', 'sigmoidal'],
    summary: 'EC50 ilacın potensini (yarı maksimal etki konsantrasyonu), Emax ise maksimal klinik etkinliğini temsil eder. Klinikte daima Emax potense tercih edilir.',
    contentMarkdown: `Semilogaritmik doz-yanıt grafiği sigmoidaldir (Slayt 14). Emax ilacın üretebileceği tavan biyolojik yanıttır (etkinlik/efficacy). EC50 ise %50 Emax oluşturan konsantrasyondur (potens). Küçük EC50 yüksek potens demektir; fakat klinik üstünlüğü belirleyen temel parametre Emax tavan etkinliğidir (Slayt 16, 18).`,
  },
  {
    id: 'pharm-node-04-tam-ve-parsiyel-agonist',
    lectureId: 'pharm-1',
    courseId: 'pharmacology',
    title: 'Tam Agonist, Parsiyel Agonist ve İntrensek Aktivite',
    slides: [20, 21, 22, 23, 24],
    keywords: ['tam agonist', 'parsiyel agonist', 'intrensek aktivite', 'alfa', 'buprenorfin', 'antagonist etki'],
    summary: 'Tam agonist α=1.0 ile %100 tavan yanıt üretir; parsiyel agonist 0<α<1.0 üretir. Tam agonist varlığında parsiyel agonist kompetitif antagonist gibi davranır.',
    contentMarkdown: `Tam agonist α=1.0 intrinsik aktiviteyle maksimal yanıt verir. Parsiyel agonist (0 < α < 1.0) reseptörlerin tamamını doldursa bile submaksimal yanıt üretir (Slayt 20-22). Kritik vize kuralı: Yüksek doz tam agonist varlığında ortama parsiyel agonist eklenirse tam agonisti yerinden ederek sistem yanıtını düşürür ve yarışmalı antagonist gibi davranır (örn. Morfin varlığında Buprenorfin, Slayt 23-24).`,
  },
  {
    id: 'pharm-node-05-kompetitif-antagonizma',
    lectureId: 'pharm-1',
    courseId: 'pharmacology',
    title: 'Kompetitif ve Non-Kompetitif Antagonizma (Schild Analizi)',
    slides: [25, 26, 27, 28, 29],
    keywords: ['kompetitif', 'non-kompetitif', 'antagonizma', 'sağa kayma', 'emax düşüşü', 'schild', 'pa2'],
    summary: 'Kompetitif antagonizma aşılabilir (surmountable); eğri paralel sağa kayar, Emax değişmez, EC50 artar. Non-kompetitif aşılamaz, Emax çöker.',
    contentMarkdown: `Kompetitif antagonist agonist ile aynı ortosterik bölge için yarışır; aşılabilirdir (surmountable). Doz-yanıt eğrisi paralel sağa kayar; Emax değişmez, görünür EC50 artar (Slayt 26). Non-kompetitif allosterik veya kovalenttir; aşılamaz (insurmountable), Emax baskılanır (Slayt 28). Schild denkleminde log(DR-1) = log[B] - logKB bağıntısıyla pA2 hesaplanır (Slayt 29).`,
  },
  {
    id: 'pharm-node-06-ters-agonist',
    lectureId: 'pharm-1',
    courseId: 'pharmacology',
    title: 'Konstitütif Reseptör Aktivitesi ve Ters Agonistler',
    slides: [31, 32, 33, 34],
    keywords: ['ters agonist', 'inverse agonist', 'konstitütif', 'bazal aktivite', 'iki durumlu model'],
    summary: 'İki durumlu modelde ligand yokken bile oluşan bazal aktiviteyi sıfırın altına düşüren moleküller ters agonisttir (negatif intrensek aktivite).',
    contentMarkdown: `İki durumlu modelde (R <-> R*) ligandsız ortamda kendiliğinden bazal sinyal üreten duruma konstitütif aktivite denir (Slayt 31). Ters agonist (inverse agonist) seçici olarak inaktif R konformasyonuna bağlanıp bazal aktiviteyi baskılar (negatif intrensek aktivite α < 0, Slayt 33). Örn. H1 antihistaminiklerin çoğu gerçekte H1 ters agonistidir.`,
  },
  {
    id: 'pharm-node-07-yedek-reseptorler',
    lectureId: 'pharm-1',
    courseId: 'pharmacology',
    title: 'Yedek Reseptörler (Spare Receptors) ve Furchgott Deneyi',
    slides: [36, 37, 38, 39],
    keywords: ['yedek reseptör', 'spare receptor', 'furchgott', 'ec50 < kd', 'sinyal amplifikasyonu'],
    summary: 'Maksimal yanıt için tüm reseptörlerin dolmasına gerek yoktur (EC50 < Kd). İrreversibl blokörle reseptörlerin bir kısmı yok edilse de Emax korunur.',
    contentMarkdown: `Biyokimyasal sinyal kaskadındaki amplifikasyon sayesinde maksimal etki (Emax) için reseptör havuzunun tamamının dolması gerekmez. Kalan işgal edilmemiş reseptörlere yedek reseptör denir ve EC50 < Kd durumunu gösterir (Slayt 36). Furchgott deneyinde doku fenoksibenzaminle muamele edildiğinde yedek reseptörler tükenene kadar Emax değişmez, sadece eğri sağa kayar (Slayt 39).`,
  },
  {
    id: 'pharm-node-08-kuantal-ve-terapotik-indeks',
    lectureId: 'pharm-1',
    courseId: 'pharmacology',
    title: 'Kuantal Doz-Yanıt, ED50 ve Terapötik İndeks (TI)',
    slides: [41, 42, 43, 44, 45],
    keywords: ['kuantal', 'ed50', 'ld50', 'td50', 'terapötik indeks', 'dar terapötik', 'varfarin', 'digoksin'],
    summary: 'Kuantal yanıt popülasyonda ya-hep-ya-hiçtir. Terapötik İndeks TI = TD50 / ED50. Dar terapötik indeksli ilaçlar: Varfarin, Digoksin, Lityum, Teofilin, Fenitoin.',
    contentMarkdown: `Kuantal doz-yanıt popülasyondaki yanıt frekansını ölçer (ED50, TD50, LD50, Slayt 41). Terapötik İndeks TI = TD50 / ED50 güvenlik aralığını verir (Slayt 43). Küçük TI değerine sahip dar terapötik indeksli 5 kritik ilaç: Varfarin, Digoksin, Lityum, Teofilin, Fenitoin (TDM gerektirir, Slayt 44-45).`,
  },
  {
    id: 'pharm-node-09-gpcr-yolaklari',
    lectureId: 'pharm-1',
    courseId: 'pharmacology',
    title: 'GPCR Sinyal İletim Yolları (Gs, Gi, Gq)',
    slides: [46, 47, 48, 49, 50],
    keywords: ['gpcr', 'gs', 'gi', 'gq', 'camp', 'ip3', 'dag', 'adenilat siklaz', 'plc'],
    summary: 'Gs adenilat siklazı uyarır (cAMP/PKA). Gi adenilat siklazı baskılar. Gq fosfolipaz C uyarır (IP3/DAG/Ca2+).',
    contentMarkdown: `Gs heterotrimerik G proteini Adenilat Siklazı uyarır -> cAMP artar -> PKA aktive olur (beta1, beta2, D1, H2). Gi Adenilat Siklazı inhibe eder -> cAMP azalır (alfa2, M2). Gq Fosfolipaz C'yi (PLC) aktive eder -> PIP2 yıkılarak IP3 (hücre içi Ca2+ salınımı) ve DAG (PKC aktivasyonu) üretilir (alfa1, M1, M3, Slayt 46-49).`,
  },
  {
    id: 'pharm-node-10-desensitizasyon-updown',
    lectureId: 'pharm-1',
    courseId: 'pharmacology',
    title: 'Desensitizasyon, Takifilaksi, Up- ve Down-Regülasyon',
    slides: [53, 54, 55, 56, 57],
    keywords: ['desensitizasyon', 'takifilaksi', 'down-regülasyon', 'up-regülasyon', 'rebound', 'beta bloker'],
    summary: 'Kronik agonist down-regülasyon ve tolerans yapar. Kronik antagonist up-regülasyon yapar; ilacın ani kesilmesinde ölümcül rebound kriz tetiklenir.',
    contentMarkdown: `Takifilaksi dakikalar içinde hızla gelişen akut toleranstır (efedrin, nitratlar, dekonjestanlar, Slayt 53). Homolog desensitizasyonda GRK ve beta-arrestin rol oynar. Kronik agonist maruziyetinde reseptörler endositozla yıkılır (down-regülasyon). Kronik antagonistte reseptör sayısı artar (up-regülasyon); beta bloker aniden kesilirse şiddetli rebound taşikardi ve hipertansif kriz doğar (Slayt 56-57).`,
  },
];

export class LectureRagService {
  /**
   * Retrieves the most relevant knowledge nodes using semantic lexical matching and Supabase pgvector fallback
   */
  public async retrieveRelevantNodes(
    query: string,
    limit = 2,
    courseId?: 'medchem' | 'pharmacology' | 'all'
  ): Promise<KnowledgeNode[]> {
    const q = query.toLowerCase().trim();
    const queryTokens = q.split(/\s+/).filter((t) => t.length > 2);
    const targetCourse = courseId || 'all';

    // 1. Optional Supabase pgvector RPC lookup
    try {
      const client = getSupabase();
      if (client && typeof client.rpc === 'function') {
        const { data, error } = await client.rpc('match_lecture_concepts', {
          p_course_id: targetCourse === 'all' ? 'medchem' : targetCourse,
          p_lecture_slug: targetCourse === 'pharmacology' ? 'farmakoloji-temelleri' : 'ilac-reseptor-etkilesimi',
          match_threshold: 0.5,
          match_count: limit,
        });

        if (!error && Array.isArray(data) && data.length > 0) {
          // Map to KnowledgeNode
          return data.map((d: any) => ({
            id: d.id,
            lectureId: targetCourse === 'pharmacology' ? 'pharm-1' : 'medchem-1',
            courseId: targetCourse === 'all' ? 'medchem' : targetCourse,
            title: d.concept_title,
            slides: d.slide_numbers,
            keywords: [],
            summary: d.scientific_summary,
            contentMarkdown: d.scientific_summary,
          }));
        }
      }
    } catch {
      // Fallback seamlessly to local indexed knowledge nodes
    }

    // Filter candidate nodes by course if specified
    const candidateNodes = targetCourse === 'all'
      ? ATOMIC_KNOWLEDGE_NODES
      : ATOMIC_KNOWLEDGE_NODES.filter((n) => n.courseId === targetCourse);

    // 2. High-precision client-side scoring
    const scored = candidateNodes.map((node) => {
      let score = 0;

      // Exact phrase match
      if (node.title.toLowerCase().includes(q)) score += 10;
      if (node.summary.toLowerCase().includes(q)) score += 6;
      if (node.contentMarkdown.toLowerCase().includes(q)) score += 4;

      // Keyword and token matching
      queryTokens.forEach((token) => {
        if (node.keywords.some((kw) => kw.includes(token))) score += 5;
        if (node.title.toLowerCase().includes(token)) score += 3;
        if (node.summary.toLowerCase().includes(token)) score += 2;
        if (node.contentMarkdown.toLowerCase().includes(token)) score += 1;
      });

      return { node, score };
    });

    scored.sort((a, b) => b.score - a.score);

    // Return top matching nodes, or default to candidateNodes[0] if no strong match
    const matches = scored.filter((s) => s.score > 0).slice(0, limit).map((s) => s.node);
    return matches.length > 0 ? matches : [candidateNodes[0] || ATOMIC_KNOWLEDGE_NODES[0]!];
  }

  /**
   * Formats retrieved knowledge nodes into an authenticated, slide-cited RAG prompt context
   */
  public formatRagContext(nodes: KnowledgeNode[]): string {
    const blocks = nodes.map(
      (n, i) =>
        `[Kaynak ${i + 1}: ${n.title} (Slayt ${n.slides.join(', ')})]\n${n.contentMarkdown}`
    );
    return `### DOĞRULANMIŞ DERS NOTU BİLGİ TABANI (RAG):\n${blocks.join('\n\n')}`;
  }
}

export const lectureRag = new LectureRagService();
