import {
  ExtractedEntityChip,
  DetectedWidgetConfig,
  ReanimatedSlide,
  AnkiCardPayload,
  ReanimatedQuizChallenge
} from '../types/slideReAnimator.types';
import { PRELOADED_REANIMATED_SLIDES } from '../data/reanimatedSlides.data';

/**
 * Extracts pharmacological & chemical entities from raw slide text
 */
export function extractSlideEntities(rawText: string): ExtractedEntityChip[] {
  const chips: ExtractedEntityChip[] = [];
  const textLower = rawText.toLowerCase();

  // 1. Extract pKa
  const pKaMatch = rawText.match(/pka\s*[:=]?\s*([0-9]+\.?[0-9]*)/i);
  if (pKaMatch && pKaMatch[1]) {
    const val = parseFloat(pKaMatch[1]);
    chips.push({
      id: `ent-pka-${chips.length}`,
      label: `pKa = ${val}`,
      type: 'pka',
      value: val,
      confidence: 0.98
    });
  }

  // 2. Extract pH
  const phMatch = rawText.match(/ph\s*[:=]?\s*([0-9]+\.?[0-9]*)/i);
  if (phMatch && phMatch[1]) {
    const val = parseFloat(phMatch[1]);
    chips.push({
      id: `ent-ph-${chips.length}`,
      label: `pH = ${val}`,
      type: 'ph',
      value: val,
      confidence: 0.96
    });
  }

  // 3. Extract Kd
  const kdMatch = rawText.match(/\bkd\s*[:=]?\s*([0-9]+\.?[0-9]*)/i);
  if (kdMatch && kdMatch[1]) {
    const val = parseFloat(kdMatch[1]);
    chips.push({
      id: `ent-kd-${chips.length}`,
      label: `Kd = ${val} nM`,
      type: 'kd',
      value: val,
      confidence: 0.97
    });
  }

  // 4. Extract EC50
  const ec50Match = rawText.match(/\bec50\s*[:=]?\s*([0-9]+\.?[0-9]*)/i);
  if (ec50Match && ec50Match[1]) {
    const val = parseFloat(ec50Match[1]);
    chips.push({
      id: `ent-ec50-${chips.length}`,
      label: `EC50 = ${val} nM`,
      type: 'ec50',
      value: val,
      confidence: 0.97
    });
  }

  // 5. Extract Functional Groups & Chemical Scaffolds
  if (textLower.includes('amit') || textLower.includes('amide') || textLower.includes('-conh-')) {
    chips.push({
      id: `ent-fg-${chips.length}`,
      label: 'Amit Köprüsü (-CONH-)',
      type: 'functional_group',
      value: 'amit',
      confidence: 0.99
    });
  }

  if (textLower.includes('ester') || textLower.includes('-coo-')) {
    chips.push({
      id: `ent-fg-${chips.length}`,
      label: 'Ester Köprüsü (-COO-)',
      type: 'functional_group',
      value: 'ester',
      confidence: 0.99
    });
  }

  if (textLower.includes('organofosfat') || textLower.includes('organophosphate') || textLower.includes('serin hidroksil')) {
    chips.push({
      id: `ent-fg-${chips.length}`,
      label: 'Kovalent Organofosfat Bağı',
      type: 'functional_group',
      value: 'organofosfat',
      confidence: 0.98
    });
  }

  if (textLower.includes('şelat') || textLower.includes('intramoleküler hidrojen bağı') || textLower.includes('intramolecular')) {
    chips.push({
      id: `ent-fg-${chips.length}`,
      label: 'İntramoleküler H-Bağı (Şelat)',
      type: 'functional_group',
      value: 'şelat halkası',
      confidence: 0.95
    });
  }

  if (textLower.includes('kinolin') || textLower.includes('quinoline')) {
    chips.push({
      id: `ent-scaffold-${chips.length}`,
      label: 'Kinolin Çekirdeği',
      type: 'scaffold',
      value: 'kinolin',
      confidence: 0.95
    });
  }

  // 6. Map Canonical Exam Traps
  if (textLower.includes('schild') || textLower.includes('eğim') || textLower.includes('pa2')) {
    chips.push({
      id: `ent-trap-${chips.length}`,
      label: 'TRAP-07: Schild Eğim Kriteri (m=1.0)',
      type: 'trap',
      value: 'TRAP-07-SCHILD-SLOPE',
      confidence: 0.96
    });
  } else if (textLower.includes('yedek reseptör') || textLower.includes('spare') || textLower.includes('furchgott')) {
    chips.push({
      id: `ent-trap-${chips.length}`,
      label: 'TRAP-02: Yedek Reseptör (EC50 < Kd)',
      type: 'trap',
      value: 'TRAP-02-SPARE-RECEPTORS',
      confidence: 0.97
    });
  } else if ((textLower.includes('ester') && textLower.includes('amit')) || textLower.includes('psödokolinesteraz')) {
    chips.push({
      id: `ent-trap-${chips.length}`,
      label: 'TRAP-03: Ester vs Amit Hidroliz Tuzağı',
      type: 'trap',
      value: 'TRAP-03-ESTER-AMIDE',
      confidence: 0.98
    });
  } else if (textLower.includes('salisilik') || textLower.includes('iyon tuzağı') || textLower.includes('ion trapping')) {
    chips.push({
      id: `ent-trap-${chips.length}`,
      label: 'TRAP-01: İyon Tuzağı ve Dağılım',
      type: 'trap',
      value: 'TRAP-01-IONIZATION',
      confidence: 0.96
    });
  }

  return chips;
}

/**
 * Deterministically resolves which simulation widget to mount from extracted entities
 */
export function resolveSlideWidget(entities: ExtractedEntityChip[], rawText: string): DetectedWidgetConfig {
  const text = rawText.toLowerCase();
  const hasPka = entities.some((e) => e.type === 'pka');
  const hasKdOrEc50 = entities.some((e) => e.type === 'kd' || e.type === 'ec50');

  // Condition 1: Acid-Base & Henderson-Hasselbalch Ionization
  if ((hasPka && text.includes('ph')) || text.includes('henderson-hasselbalch') || text.includes('iyonlaşma') || text.includes('salisilik')) {
    const pKaEntity = entities.find((e) => e.type === 'pka');
    const pKaVal = typeof pKaEntity?.value === 'number' ? pKaEntity.value : 4.2;
    return {
      type: 'IonizationChamber',
      title: 'Henderson-Hasselbalch İyonlaşma Odası',
      description:
        'Slayttaki pKa değeri üzerinden fizyolojik kompartmanlar arası iyonize / non-iyonize fraksiyon dağılımını canlı simüle et.',
      props: {
        pKa: pKaVal,
        compoundType: text.includes('baz') || text.includes('amin') ? 'weak_base' : 'weak_acid',
        initialPh: 7.4
      }
    };
  }

  // Condition 2: Dose-Response, Schild Regression or Spare Receptors
  if (hasKdOrEc50 || text.includes('schild') || text.includes('doz-yanıt') || text.includes('reseptör rezervi') || text.includes('furchgott')) {
    const isSchild = text.includes('schild') || text.includes('pa2');
    return {
      type: 'DoseResponseCurve',
      title: isSchild ? 'Schild Regresyonu ve Eğim Simülatörü' : 'Doz-Yanıt ve Reseptör Rezervi Simülatörü',
      description: isSchild
        ? 'Kompetitif antagonist konsantrasyonunu artırarak eğri kaymasını ve Schild regresyon eğiminin 1.0 olduğunu test et.'
        : 'Reversibl ve irreversibl blokaj altında EC50, Kd ve Emax parametrelerinin değişimini interaktif gözlemle.',
      props: {
        mode: isSchild ? 'schild_regression' : 'furchgott_spare',
        baselineKd: 50,
        baselineEc50: 5
      }
    };
  }

  // Condition 3: SAR / Local Anesthetic Ester vs Amide or Functional Group Series
  if (text.includes('sar') || (text.includes('ester') && text.includes('amit')) || text.includes('prokain') || text.includes('dibukain')) {
    return {
      type: 'SarExplorer',
      title: 'Lokal Anestezik Yapı-Aktivite (SAR) Kaşifi',
      description:
        'Molekül köprüsünü ve aromatik sübstitüentleri değiştirerek hidroliz hızını ve sodyum kanal blokaj potansiyelini incele.',
      props: {
        initialSeries: 'ester_vs_amide',
        activeDrug: text.includes('dibukain') ? 'dibucaine' : 'procaine'
      }
    };
  }

  // Condition 4: Receptor-Ligand or Membrane Interaction
  if (text.includes('reseptör') || text.includes('ligand') || text.includes('gpcr') || text.includes('enzim')) {
    return {
      type: 'ReceptorLigandMatcher',
      title: 'Reseptör-Ligand Etkileşim İstasyonu',
      description: 'Ligandları hedef reseptör ceplerine yerleştirerek afinite ve intrensek etkinlik puanını ölç.',
      props: {
        mode: 'binding'
      }
    };
  }

  // Default fallback: Dual-Mode 2D/3D Molecule Viewer
  return {
    type: 'DualModeMoleculeViewer',
    title: 'Moleküler Farmakofor ve Yapı Görüntüleyici',
    description: 'Slaytta geçen kimyasal yapının 2D kimyasal formülünü ve 3D uzaysal geometrisini incele.',
    props: {
      initialSmiles: 'CCN(CC)CCNC(=O)c1cc(OCCCC)nc2ccccc12'
    }
  };
}

/**
 * Generates Anki-compatible TSV format for direct import into Anki Desktop and AnkiMobile
 */
export function generateAnkiTsvExport(
  cards: AnkiCardPayload[],
  slideMeta: { title: string; courseId: string; facultyName: string }
): string {
  const lines: string[] = [
    '#separator:tab',
    '#html:true',
    '#tags column:4'
  ];

  const escapeTsv = (str: string): string => {
    return str.replace(/\t/g, '    ').replace(/\r?\n/g, '<br>');
  };

  cards.forEach((card) => {
    const questionHtml = `<b>[${slideMeta.title}]</b><br><br>${card.question}`;
    const hintHtml = `<details style="margin-top:8px;padding:6px;border:1px solid #444;border-radius:4px;"><summary style="cursor:pointer;color:#10A37F;font-weight:600;">💡 İpucu Merdiveni (Aç/Kapat)</summary><ol style="margin-top:6px;padding-left:20px;"><li>${card.hintLadder[0]}</li><li>${card.hintLadder[1]}</li><li>${card.hintLadder[2]}</li></ol></details>`;
    const trapWarningHtml = card.examTrapWarning
      ? `<div style="margin-top:8px;padding:6px 10px;background:#2a1215;border-left:3px solid #ff4d4f;color:#ff7875;font-size:13px;">⚠️ <b>${card.examTrapWarning}</b></div>`
      : '';
    const answerHtml = `${card.answer}${hintHtml}${trapWarningHtml}`;
    const citationHtml = card.slideCitation || slideMeta.facultyName;
    const tagsStr = ['PharmLearn', slideMeta.courseId, ...card.tags].join(' ');

    lines.push(
      `${escapeTsv(questionHtml)}\t${escapeTsv(answerHtml)}\t${escapeTsv(citationHtml)}\t${tagsStr}`
    );
  });

  return lines.join('\n');
}

/**
 * Synthesizes a new ReanimatedSlide from raw upload or text
 */
export function synthesizeSlideReanimation(params: {
  id?: string;
  title: string;
  rawText: string;
  courseId: 'medchem' | 'pharmacology';
  facultyName?: string;
  deckName?: string;
  pageNumber?: number;
  imageUrl?: string;
  storageUrl?: string;
}): ReanimatedSlide {
  // Check if an authentic pre-loaded exemplar exists with matching content
  const matchingPreloaded = PRELOADED_REANIMATED_SLIDES.find(
    (p) =>
      p.id === params.id ||
      p.title.toLowerCase() === params.title.toLowerCase() ||
      (p.courseId === params.courseId && params.rawText.toLowerCase().includes(p.deckName.toLowerCase()))
  );

  if (matchingPreloaded) {
    return {
      ...matchingPreloaded,
      ...(params.imageUrl ? { imageUrl: params.imageUrl } : {}),
      ...(params.storageUrl ? { storageUrl: params.storageUrl } : {})
    };
  }

  const entities = extractSlideEntities(params.rawText);
  const widgetConfig = resolveSlideWidget(entities, params.rawText);

  const defaultChallenge: ReanimatedQuizChallenge = {
    id: `quiz-gen-${Date.now()}`,
    question: `${params.title} konusunda hocanın sınavda sorması en muhtemel temel biyofiziksel/kimyasal tuzak nedir?`,
    hypothesisPrompt: 'Slayttaki formüllere ve değerlere bakarak ana tuzak mekanizmasını tahmin et.',
    options: [
      {
        id: 'opt-gen-1',
        text: 'Moleküler yapıdaki polarite ve iyonlaşma dengesi fizyolojik kompartmanlar arası geçişi doğrudan belirler.',
        isCorrect: true,
        diagnosticFeedback:
          'Tebrikler! Slaytta vurgulanan temel parametreler ilacın biyoyararlanım ve dağılım dinamiğini kontrol eder.'
      },
      {
        id: 'opt-gen-2',
        text: 'İlacın eliminasyon yarı ömrü tüm pH aralıklarında tamamen sabittir ve değişmez.',
        isCorrect: false,
        diagnosticFeedback: 'Yanlış. İdrar pH’sı ve tübüler geri emilim pKa’ya bağlı olarak klirensi katbekat değiştirir.'
      },
      {
        id: 'opt-gen-3',
        text: 'Reçete edilen doz arttıkça molekülün affinitesi (Kd) doğrusal olarak azalır.',
        isCorrect: false,
        diagnosticFeedback: 'Yanlış. Afinite (Kd) reseptör ve ligand arasındaki termodinamik bir sabittir, dozla değişmez.'
      },
      {
        id: 'opt-gen-4',
        text: 'İlacın suda çözünürlüğü artarsa kan-beyin bariyerini geçiş oranı doğrudan yükselir.',
        isCorrect: false,
        diagnosticFeedback: 'Yanlış. Kan-beyin bariyeri geçişi hidrofiliklik değil yüksek lipofiliklik (LogP) gerektirir.'
      }
    ],
    hintLadder: [
      'İpucu 1: Slaytta geçen pKa / logP veya reseptör sabitlerine dikkat et.',
      'İpucu 2: Fizyolojik membranlar hangi formdaki (iyonize mi non-iyonize mi) molekülleri geçirir?',
      'İpucu 3: Temel etki mekanizması biyofiziksel dağılım dengesinden kaynaklanır.'
    ],
    slideProvenance: `${params.facultyName || 'Eczacılık Fakültesi'} - Slayt ${params.pageNumber || 1}`
  };

  const defaultAnkiCards: AnkiCardPayload[] = [
    {
      id: `anki-gen-${Date.now()}`,
      question: `${params.title} bağlamında dikkat edilmesi gereken en kritik vize sınav kuralı nedir?`,
      answer:
        'Slayttaki yapısal ve farmakokinetik parametrelerin biyolojik yanıta yansıması. İyonize/non-iyonize dağılım ve hedef reseptör etkileşimi.',
      hintLadder: [
        'İpucu 1: Slaytın temel kavramını hatırla.',
        'İpucu 2: İlaç dağılım kuralları.',
        'İpucu 3: Slaytta verilen formül ve sabitler.'
      ],
      examTrapWarning: 'Vize Tuzağı: İlacın dozu ile reseptör afinitesini (Kd) birbirine karıştırma!',
      tags: ['PharmLearn', params.courseId, 'Vize'],
      slideCitation: `${params.facultyName || 'Eczacılık'} - ${params.title}`
    }
  ];

  return {
    id: params.id || `reanim-${Date.now()}`,
    title: params.title,
    courseId: params.courseId,
    facultyName: params.facultyName || 'Eczacılık Fakültesi',
    deckName: params.deckName || 'Ders Notları',
    pageNumber: params.pageNumber || 1,
    imageUrl: params.imageUrl,
    storageUrl: params.storageUrl,
    extractedRawText: params.rawText,
    entities,
    widgetConfig,
    challenge: defaultChallenge,
    ankiCards: defaultAnkiCards,
    uploadedAt: new Date().toISOString()
  };
}
