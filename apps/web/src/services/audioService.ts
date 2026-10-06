export interface TranscriptCue {
  id: string;
  startTime: number; // in seconds
  endTime: number;
  sectionId: string;
  conceptId: string;
  slide: number;
  speaker: string;
  text: string;
}

export interface LectureAudioSummary {
  lectureSlug: string;
  title: string;
  duration: number; // in seconds
  audioUrl?: string;
  cues: TranscriptCue[];
}

export const FLAGSHIP_AUDIO_SUMMARY: LectureAudioSummary = {
  lectureSlug: 'reseptor-etkilesimleri',
  title: 'İlaç Reseptör Etkileşimi (Kimyasal Bağlar) — Sesli Özet & Vize Odaklı İnceleme',
  duration: 335, // 5 min 35 sec
  cues: [
    {
      id: 'cue-1',
      startTime: 0,
      endTime: 25,
      sectionId: 'concept-1',
      conceptId: 'rr:receptor_tanimi',
      slide: 2,
      speaker: 'Prof. Dr. Bedia Kaymakçıoğlu Notları',
      text: 'İlaç etkisini anlamak için ilaç ile reseptör arasındaki bağ kuvvetlerini bilmek şarttır. Bu bağlar reseptörün konformasyonunu değiştirecek kadar güçlü, sinyal iletildikten sonra ilacı kolayca serbest bırakacak kadar da geri dönüşümlü olmalıdır.',
    },
    {
      id: 'cue-2',
      startTime: 25,
      endTime: 58,
      sectionId: 'concept-2',
      conceptId: 'rr:kovalan_baglar',
      slide: 9,
      speaker: 'Prof. Dr. Bedia Kaymakçıoğlu Notları',
      text: 'Kovalan bağlar elektron çiftlerinin ortaklanmasıyla oluşur ve en kuvvetli bağlardır. Geri dönüşümsüz etki yaptığından çoğu ilaçta istenmez; ancak alkilleyici kanser ilaçları, beta-laktam antibiyotikler ve organofosfatlı esteraz inhibitörlerinde hedeflenir.',
    },
    {
      id: 'cue-3',
      startTime: 58,
      endTime: 90,
      sectionId: 'concept-3',
      conceptId: 'rr:iyonik_bag',
      slide: 13,
      speaker: 'Prof. Dr. Bedia Kaymakçıoğlu Notları',
      text: 'İyonik bağ, zıt yüklü iyonlar arasındaki elektrostatik çekimdir. Bağın gücü yük miktarına doğru orantılıdır; fakat mesafe ve ortamın dielektrik sabiti arttıkça bağ belirgin biçimde zayıflar.',
    },
    {
      id: 'cue-4',
      startTime: 90,
      endTime: 125,
      sectionId: 'concept-4',
      conceptId: 'rr:hidrojen_bagi',
      slide: 15,
      speaker: 'Prof. Dr. Bedia Kaymakçıoğlu Notları',
      text: 'Hidrojen bağı X-H...Y biçimindedir. Donör tarafı elektron eksikliği olan hidrojeni taşıyan heteroatomlar (-OH, -NH, -SH); akseptör tarafı ise serbest elektron çifti taşıyan oksijen, azot veya kükürttür.',
    },
    {
      id: 'cue-5',
      startTime: 125,
      endTime: 160,
      sectionId: 'concept-5',
      conceptId: 'rr:hbag_ozellik_etkisi',
      slide: 19,
      speaker: 'Prof. Dr. Bedia Kaymakçıoğlu Notları',
      text: 'Hidrojen bağı farmakolojik etkiyi doğrudan değiştirir. Örneğin molekül içi hidrojen bağı kuran salisilik asit güçlü antibakteriyel etki gösterirken, moleküller arası hidrojen bağıyla polimerleşen m- ve p-hidroksibenzoik asit bu etkiyi gösteremez.',
    },
    {
      id: 'cue-6',
      startTime: 160,
      endTime: 195,
      sectionId: 'concept-6',
      conceptId: 'rr:iyon_dipol_dipol_dipol',
      slide: 20,
      speaker: 'Prof. Dr. Bedia Kaymakçıoğlu Notları',
      text: 'Karbonil, ester ve amit gibi heteroatom içeren gruplardaki elektronegatiflik farkı dipol yaratır. İyon-dipol ve dipol-dipol etkileşimleri zayıf ve geri dönüşümlüdür; dipol-dipolde mesafe çok daha kritiktir.',
    },
    {
      id: 'cue-7',
      startTime: 195,
      endTime: 225,
      sectionId: 'concept-7',
      conceptId: 'rr:yuk_transferi',
      slide: 22,
      speaker: 'Prof. Dr. Bedia Kaymakçıoğlu Notları',
      text: 'Yük transferi, elektron donörü molekülden akseptör moleküle yük aktarımıdır. Elektron veren sübstitüentli aromatik halkalar donör, elektron çeken halkalar akseptör olarak pi-orbital örtüşmesiyle kompleks kurar.',
    },
    {
      id: 'cue-8',
      startTime: 225,
      endTime: 260,
      sectionId: 'concept-8',
      conceptId: 'rr:vdw_hidrofobik',
      slide: 25,
      speaker: 'Prof. Dr. Bedia Kaymakçıoğlu Notları',
      text: 'Van der Waals zayıf geçici dipol çekimidir. Hidrofobik etkileşimin enerjisi ise oluşan bir kimyasal bağdan değil, apolar yüzeyler birleşirken aradaki su moleküllerinin serbest kalarak sistemin entropisini artırmasından doğar.',
    },
    {
      id: 'cue-9',
      startTime: 260,
      endTime: 295,
      sectionId: 'concept-9',
      conceptId: 'rr:selasyon',
      slide: 30,
      speaker: 'Prof. Dr. Bedia Kaymakçıoğlu Notları',
      text: 'Şelasyonda geçiş metal katyonu akseptör, ligand ise koordine kovalan bağla donördür. Donör grup sayısına göre etilen diamin 2 donörle bidentat, dietilentriamin ise 3 donör grubuyla tridentat liganda örnektir.',
    },
    {
      id: 'cue-10',
      startTime: 295,
      endTime: 335,
      sectionId: 'concept-10',
      conceptId: 'rr:dibukain_entegrasyon',
      slide: 33,
      speaker: 'Prof. Dr. Bedia Kaymakçıoğlu Notları',
      text: 'Entegrasyon örneğimiz Dibukain lokal anesteziğidir. Kinolin halkası pi-pi ve hidrofobik etkileşim kurarken, bütoksi kuyruğu Van der Waals, amit grubu hidrojen bağı ve tersiyer amin grubu iyonik etkileşimle reseptöre bağlanır.',
    },
  ],
};

export const PHARMACOLOGY_AUDIO_SUMMARY: LectureAudioSummary = {
  lectureSlug: 'farmakoloji-temelleri',
  title: 'Farmakoloji Temelleri: Doz-Yanıt, Reseptör Teorileri ve GPCR Sinyalleri — Sesli Vize Özeti',
  duration: 320, // 5 min 20 sec
  cues: [
    {
      id: 'ph-cue-1',
      startTime: 0,
      endTime: 30,
      sectionId: 'pharm-1',
      conceptId: 'pharm:receptor_types',
      slide: 3,
      speaker: 'Prof. Dr. Feyza Arıcıoğlu Notları',
      text: 'Reseptörler dört ana sınıfa ayrılır: İyon kanalları milisaniyelerde, GPCR saniyelerde, tirozin kinaz enzimatik reseptörler dakikalarda, hücre içi nükleer reseptörler ise saatler içinde yanıt üretir.',
    },
    {
      id: 'ph-cue-2',
      startTime: 30,
      endTime: 60,
      sectionId: 'pharm-2',
      conceptId: 'pharm:kd_affinity',
      slide: 10,
      speaker: 'Prof. Dr. Feyza Arıcıoğlu Notları',
      text: 'Kütle hareketi kanununa göre Kd denge ayrışma sabitidir. Afinite bir bölü Kd ile orantılıdır. İlaç konsantrasyonu Kd değerine eşit olduğunda toplam reseptörlerin tam olarak yüzde ellisi doludur.',
    },
    {
      id: 'ph-cue-3',
      startTime: 60,
      endTime: 95,
      sectionId: 'pharm-3',
      conceptId: 'pharm:ec50_emax',
      slide: 16,
      speaker: 'Prof. Dr. Feyza Arıcıoğlu Notları',
      text: 'Kademeli doz yanıtta EC50 potens, Emax ise tavan etkinliktir. Klinikte iki ilaç arasında seçim yaparken her zaman Emax tavan etkinliği potense üstün tutulur.',
    },
    {
      id: 'ph-cue-4',
      startTime: 95,
      endTime: 130,
      sectionId: 'pharm-4',
      conceptId: 'pharm:partial_agonism',
      slide: 22,
      speaker: 'Prof. Dr. Feyza Arıcıoğlu Notları',
      text: 'Tam agonist reseptörleri aktive ederek tam etki verir. Parsiyel agonist ise tek başına zayıf agonisttir; ancak tam agonist varlığında reseptörleri doldurarak yarışmalı antagonist gibi davranır.',
    },
    {
      id: 'ph-cue-5',
      startTime: 130,
      endTime: 165,
      sectionId: 'pharm-5',
      conceptId: 'pharm:antagonism',
      slide: 26,
      speaker: 'Prof. Dr. Feyza Arıcıoğlu Notları',
      text: 'Kompetitif antagonist dozu artırılarak aşılabilir; eğriyi paralel sağa kaydırır, Emax değişmez. Non-kompetitif blokaj ise aşılamaz ve Emax tavan yanıtını çökerterek baskılar.',
    },
    {
      id: 'ph-cue-6',
      startTime: 165,
      endTime: 195,
      sectionId: 'pharm-6',
      conceptId: 'pharm:inverse_agonism',
      slide: 32,
      speaker: 'Prof. Dr. Feyza Arıcıoğlu Notları',
      text: 'İki durumlu modelde ligandsız ortamda bazal sinyal üreten konstitütif aktivite vardır. Ters agonistler inaktif reseptörü stabilize ederek bu bazal sinyali sıfırın altına düşürür.',
    },
    {
      id: 'ph-cue-7',
      startTime: 195,
      endTime: 230,
      sectionId: 'pharm-7',
      conceptId: 'pharm:spare_receptors',
      slide: 38,
      speaker: 'Prof. Dr. Feyza Arıcıoğlu Notları',
      text: 'Maksimal yanıt için reseptörlerin tamamının dolması şart değildir. Sinyal amplifikasyonu sayesinde küçük bir reseptör doluluğuyla tam etki alınır; kalan reseptörler yedek reseptördür.',
    },
    {
      id: 'ph-cue-8',
      startTime: 230,
      endTime: 265,
      sectionId: 'pharm-8',
      conceptId: 'pharm:therapeutic_index',
      slide: 43,
      speaker: 'Prof. Dr. Feyza Arıcıoğlu Notları',
      text: 'Kuantal yanıtta Terapötik İndeks TD50 bölü ED50 oranıdır. Varfarin, digoksin, lityum ve teofilin gibi dar terapötik ilaçlar kanda mutlaka laboratuvar takibi gerektirir.',
    },
    {
      id: 'ph-cue-9',
      startTime: 265,
      endTime: 295,
      sectionId: 'pharm-9',
      conceptId: 'pharm:gpcr_cascade',
      slide: 48,
      speaker: 'Prof. Dr. Feyza Arıcıoğlu Notları',
      text: 'Gs proteni adenilat siklazı uyararak cAMP üretir. Gi adenilat siklazı baskılar. Gq ise fosfolipaz C üzerinden IP3 ile kalsiyum salınımı ve DAG ile protein kinaz C aktivasyonu yapar.',
    },
    {
      id: 'ph-cue-10',
      startTime: 295,
      endTime: 320,
      sectionId: 'pharm-10',
      conceptId: 'pharm:receptor_regulation',
      slide: 56,
      speaker: 'Prof. Dr. Feyza Arıcıoğlu Notları',
      text: 'Kronik antagonist kullanımı reseptör sayısını artırarak up-regülasyon yapar. Propranolol gibi beta blokerlerin aniden kesilmesi ölümcül rebound kriz tablosu doğurabilir.',
    },
  ],
};

export function getAudioSummaryForLecture(lectureSlug: string): LectureAudioSummary {
  const slug = (lectureSlug || '').toLowerCase();
  if (
    slug.includes('pharm') ||
    slug.includes('farmakoloji') ||
    slug.includes('doz-yanit') ||
    slug.includes('reseptor-teorileri')
  ) {
    return PHARMACOLOGY_AUDIO_SUMMARY;
  }
  return FLAGSHIP_AUDIO_SUMMARY;
}
