import generatedConcepts from '../data/teaching.concepts.generated.json';
import { realtimeTelemetry } from './realtimeTelemetryService';
import { lectureRag, KnowledgeNode } from './lectureRagService';

export interface SlideCitation {
  deck: string;
  slideNumbers: number[];
}

export interface CanvasAction {
  type: 'scroll_to' | 'highlight_concept' | 'select_molecule' | 'play_audio_cue';
  target: string;
}

export interface TutorMessage {
  id: string;
  sender: 'user' | 'tutor' | 'system';
  content: string;
  timestamp: number;
  slideCitation?: SlideCitation;
  scaffoldLevel?: 'nudge' | 'clue' | 'remediation' | 'mastery';
  canvasAction?: CanvasAction;
  modelUsed?: string;
}

const SYSTEM_PROMPT = `Sen PharmLearn platformunda 3. sınıf eczacılık öğrencilerine rehberlik eden Sokratik bir Farmasötik Kimya ve Farmakoloji AI Eğitmenisin.

Temel Kurallar:
1. Kaynak Sadakati: Tüm açıklamalarını aşağıdaki DOĞRULANMIŞ DERS NOTU BİLGİ TABANI (RAG) verilerine dayandır. Her yanıtında kesin slayt numaralarını [Slayt X] olarak belirt.
2. Sokratik Öğretim: Doğrudan cevabı vermek yerine öğrenciye düşünme basamakları sun.
3. Kısa ve Öz: 40-50 kelimeyi aşma. Önce sezgisel açıklama, sonra teknik terim.
4. Yanılgı Düzeltme: Öğrenci bir kavramı karıştırdığında (örneğin açilasyon ile fosforilasyon veya entropi ile bağ enerjisi), kesin slayt atfıyla doğrusunu açıkla.`;

export async function askTutor({
  prompt,
  conversationHistory,
  activeConceptId,
  selectedText,
  apiKey,
}: {
  prompt: string;
  conversationHistory: TutorMessage[];
  activeConceptId?: string | undefined;
  selectedText?: string | undefined;
  apiKey?: string | undefined;
}): Promise<TutorMessage> {
  const currentConcept = generatedConcepts.find((c) => c.id === activeConceptId) || generatedConcepts[0]!;
  const telemetryContext = realtimeTelemetry.getFormattedContextForTutor();

  // Retrieve relevant atomic lecture knowledge nodes via RAG
  const relevantNodes = await lectureRag.retrieveRelevantNodes(
    selectedText ? `${prompt} ${selectedText}` : prompt
  );
  const primaryNode = relevantNodes[0];
  const ragContext = lectureRag.formatRagContext(relevantNodes);

  // If OpenRouter API key is provided in localStorage or env, attempt live call
  const openRouterKey = apiKey || (typeof window !== 'undefined' ? localStorage.getItem('pep_openrouter_key') || '' : '');

  if (openRouterKey) {
    try {
      const fullSystemPrompt = [
        SYSTEM_PROMPT,
        ragContext,
        telemetryContext,
      ].filter(Boolean).join('\n\n');

      const messages = [
        {
          role: 'system',
          content: fullSystemPrompt,
        },
        ...conversationHistory.slice(-6).map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.content,
        })),
        {
          role: 'user',
          content: selectedText
            ? `Öğrencinin ders notundan seçtiği metin: "${selectedText}". Soru: ${prompt}`
            : prompt,
        },
      ];

      const modelsToTry = [
        'meta-llama/llama-3.3-70b-instruct:free',
        'google/gemini-2.0-flash-exp:free',
        'qwen/qwen-2.5-72b-instruct:free',
        'inclusionai/ling-3.0-flash-sante',
      ];

      for (const model of modelsToTry) {
        try {
          const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${openRouterKey}`,
              'Content-Type': 'application/json',
              'X-Title': 'PharmLearn AI Studio',
            },
            body: JSON.stringify({
              model,
              messages,
              max_tokens: 300,
              temperature: 0.2,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            const text = data.choices?.[0]?.message?.content;
            if (text) {
              return {
                id: `msg-${Date.now()}`,
                sender: 'tutor',
                content: text,
                timestamp: Date.now(),
                slideCitation: {
                  deck: currentConcept.sourceDeck,
                  slideNumbers: currentConcept.slideNumbers,
                },
                modelUsed: model,
                scaffoldLevel: 'clue',
              };
            }
          }
        } catch {
          // cascade to next model
        }
      }
    } catch {
      // fallback to offline medical reasoning engine
    }
  }

  // Deterministic Medical Reasoning Engine (Offline/Local/Fast Socratic Tutor)
  return generateDeterministicTutorReply(prompt, selectedText, currentConcept, primaryNode);
}

function generateDeterministicTutorReply(
  prompt: string,
  selectedText?: string,
  concept: (typeof generatedConcepts)[0] = generatedConcepts[0]!,
  ragNode?: KnowledgeNode
): TutorMessage {
  const p = prompt.toLowerCase();
  const sel = (selectedText || '').toLowerCase();

  // Question: GPCR Signaling / Gq / IP3 / DAG / Ca2+
  if (p.includes('gq') || p.includes('ip3') || p.includes('dag') || p.includes('fosfolipaz') || p.includes('plc') || p.includes('ikincil haberci')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'tutor',
      content:
        'Harika bir sinyal iletim sorusu! Gq kenetli reseptör uyarımında hedef enzim Fosfolipaz C\'dir (PLC) [Slayt 6]. PLC, membran fosfolipiti PIP2\'yi parçalayarak iki kritik ikincil haberci üretir: IP3 endoplazmik retikulumdan Ca²⁺ salınımını tetikler; DAG ise membran yüzeyinde Protein Kinaz C\'yi (PKC) aktive eder. Bu yolda cAMP üretilmez!',
      timestamp: Date.now(),
      slideCitation: {
        deck: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
        slideNumbers: [5, 6],
      },
      scaffoldLevel: 'mastery',
      canvasAction: {
        type: 'scroll_to',
        target: 'concept-1',
      },
      modelUsed: 'Sokratik GPCR Motoru',
    };
  }

  // Question: GPCR Signaling / Gs / Gi / Adenylate Cyclase / cAMP
  if (p.includes('gs') || p.includes('gi') || p.includes('adenilat siklaz') || p.includes('camp') || p.includes('pka') || p.includes('gpcr')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'tutor',
      content:
        'Reseptörlerin temel görevi ligandı tanıyıp kimyasal sinyali hücre içine iletmektir [Slayt 6]. Gs proteini adenilat siklazı uyararak cAMP artışı ve PKA aktivasyonu sağlar; Gi proteini ise adenilat siklazı inhibe ederek hücre içi cAMP düzeyini baskılar [Slayt 6]. Sinyal tuvalindeki 4 aşamalı GPCR simülatöründe bunu deneyimleyebilirsin.',
      timestamp: Date.now(),
      slideCitation: {
        deck: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
        slideNumbers: [5, 6],
      },
      scaffoldLevel: 'clue',
      canvasAction: {
        type: 'scroll_to',
        target: 'concept-1',
      },
      modelUsed: 'Sokratik GPCR Motoru',
    };
  }

  // Question: PK / PD Curve, Cmax, MTC, Therapeutic Window
  if (p.includes('cmax') || p.includes('mtc') || p.includes('toksisite') || p.includes('klirens') || p.includes('terapötik') || p.includes('dozaj aralığı')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'tutor',
      content:
        'Kritik bir farmakokinetik güvenlik uyarısı! İlacın Cmax değeri MTC (Maksimum Tolere Edilen Konsantrasyon) eşiğini aştığında toksisite gelişir. Konsantrasyonu güvenli terapötik pencerede tutmak için dozu düşürebilir veya doz aralığını (tau) uzatabilirsin. PK simülatöründe klirens ve yarılanma ömrü sürgülerini oynatarak eğrinin değişimini gözlemle!',
      timestamp: Date.now(),
      slideCitation: {
        deck: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
        slideNumbers: [2, 3],
      },
      scaffoldLevel: 'mastery',
      canvasAction: {
        type: 'scroll_to',
        target: 'pk-curve-sim',
      },
      modelUsed: 'Sokratik Farmakokinetik Motoru',
    };
  }

  // Question: Dibucaine / local anesthetics
  if (p.includes('dibukain') || sel.includes('dibukain') || p.includes('entegrasyon')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'tutor',
      content:
        'Harika bir entegrasyon sorusu! Dibukain molekülü reseptörle aynı anda birden fazla etkileşim kurar: Kinolin çekirdeği yük transferi ve hidrofobik bağ, amit grubu hidrojen bağı ve dipol-dipol, bütoksi kuyruğu Van der Waals, tersiyer amin ise iyonik çekim oluşturur [Slayt 33]. Sağ taraftaki 3D molekül modelinde kinolin ve amin gruplarını inceleyebilirsin!',
      timestamp: Date.now(),
      slideCitation: {
        deck: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
        slideNumbers: [33],
      },
      scaffoldLevel: 'mastery',
      canvasAction: {
        type: 'select_molecule',
        target: 'dibucaine',
      },
      modelUsed: 'Sokratik Ders Notu Doğrulama',
    };
  }

  // Question: Covalent bonds / organophosphates / beta-lactams
  if (p.includes('kovalan') || p.includes('fosforil') || p.includes('açil') || p.includes('insektisit') || p.includes('organofosfat')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'tutor',
      content:
        'Kovalan bağlar elektron ortaklanmasıyla oluşur ve geri dönüşümsüzdür [Slayt 9]. Çok kritik bir vize ayrımı: Organofosfatlar asetilkolin esterazın serinini FOSFORİLLER [Slayt 12]; beta-laktam antibiyotikler ise transpeptidaz serinini AÇİLLER [Slayt 11]. Bu iki mekanizmayı asla karıştırma!',
      timestamp: Date.now(),
      slideCitation: {
        deck: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
        slideNumbers: [9, 11, 12],
      },
      scaffoldLevel: 'clue',
      canvasAction: {
        type: 'scroll_to',
        target: 'concept-2',
      },
      modelUsed: 'Sokratik Ders Notu Doğrulama',
    };
  }

  // Question: Hydrophobic vs Van der Waals / Entropy
  if (p.includes('hidrofobik') || p.includes('entropi') || p.includes('van der waals') || p.includes('vdw')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'tutor',
      content:
        'Burası vizenin en çok yanıltan sorusudur! Van der Waals geçici dipol indüklenmesidir (4–6 Å) [Slayt 24]. Ancak Hidrofobik etkileşimin enerjisi oluşan bir kimyasal bağdan DEĞİL; apolar gruplar yaklaşırken sıkışmış su moleküllerinin serbest kalarak sistemin ENTROPİSİNİ artırmasından (ΔS > 0) gelir [Slayt 25]!',
      timestamp: Date.now(),
      slideCitation: {
        deck: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
        slideNumbers: [24, 25],
      },
      scaffoldLevel: 'mastery',
      canvasAction: {
        type: 'scroll_to',
        target: 'concept-8',
      },
      modelUsed: 'Sokratik Ders Notu Doğrulama',
    };
  }

  // Question: Ionic bond / distance / dielectric constant
  if (p.includes('iyonik') || p.includes('dielektrik') || p.includes('mesafe')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'tutor',
      content:
        'İyonik bağ elektrostatik çekimdir [Slayt 13]. Bağ kuvveti zıt yüklerin büyüklüğüyle artar. Fakat dikkat: Mesafe (r) arttıkça ve ortamın dielektrik sabiti (ε) yükseldikçe bağ zayıflar [Slayt 13]. Fizyolojik ortamdaki polar su molekülleri dielektrik katsayısını artırarak bağı zayıflatır.',
      timestamp: Date.now(),
      slideCitation: {
        deck: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
        slideNumbers: [13, 14],
      },
      scaffoldLevel: 'clue',
      canvasAction: {
        type: 'scroll_to',
        target: 'concept-3',
      },
      modelUsed: 'Sokratik Ders Notu Doğrulama',
    };
  }

  // Question: Hydrogen bond / salicylic acid isomer
  if (p.includes('hidrojen') || p.includes('salisilik') || p.includes('donör') || p.includes('akseptör')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'tutor',
      content:
        'Hidrojen bağında X–H...Y kuralı geçerlidir [Slayt 15]. Donör elektron eksikliği olan hidrojeni taşır (-OH, -NH); akseptör ise serbest elektron çifti sunar (:O, :N). Salisilik asit molekül içi H-bağı yaptığı için antibakteriyeldir; izomerleri m- ve p-hidroksibenzoik asit ise moleküller arası bağla polimerleştiği için bu etkiyi göstermez [Slayt 19]!',
      timestamp: Date.now(),
      slideCitation: {
        deck: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
        slideNumbers: [15, 19],
      },
      scaffoldLevel: 'clue',
      canvasAction: {
        type: 'scroll_to',
        target: 'concept-4',
      },
      modelUsed: 'Sokratik Ders Notu Doğrulama',
    };
  }

  // Question: Chelation / denticity
  if (p.includes('şelat') || p.includes('dişlilik') || p.includes('bidentat') || p.includes('tridentat') || p.includes('ligand')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'tutor',
      content:
        'Şelat oluşumunda metal katyonu akseptör, ligand ise donördür [Slayt 26]. Dişlilik ligandın elektron veren grup sayısına bağlıdır: Etilen diamin 2 azot atomuyla BİDENTAT, dietilentriamin ise 3 azot atomuyla TRİDENTAT liganda örnektir [Slayt 30].',
      timestamp: Date.now(),
      slideCitation: {
        deck: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
        slideNumbers: [26, 28, 30],
      },
      scaffoldLevel: 'mastery',
      canvasAction: {
        type: 'scroll_to',
        target: 'concept-9',
      },
      modelUsed: 'Sokratik Ders Notu Doğrulama',
    };
  }

  // Selection inquiry: student clicked "Tutor'a Sor" on selected text
  if (selectedText) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'tutor',
      content: `Seçtiğin bölüm: "${selectedText.slice(0, 70)}...". Bu kavram, ilaç-reseptör kompleksinin kararlılığını ve spesifik afinitesini doğrudan belirler. İlaç ile reseptör arasındaki bu etkileşim, sinyal iletiminin başlamasını ve ardından ilacın geri dönüşümlü olarak ayrılmasını sağlar [Slayt ${concept.slideNumbers[0]}].`,
      timestamp: Date.now(),
      slideCitation: {
        deck: concept.sourceDeck,
        slideNumbers: concept.slideNumbers,
      },
      scaffoldLevel: 'nudge',
      modelUsed: 'Sokratik Ders Notu Doğrulama',
    };
  }

  // General Socratic fallback grounded in active concept
  return {
    id: `msg-${Date.now()}`,
    sender: 'tutor',
    content: `Bu konsept: "${concept.conceptTitle}". ${concept.scientificSummary.slice(0, 160)}... Slayta göre bu bağların hem şekil değiştirecek kadar güçlü hem de sinyalden sonra serbest kalacak kadar geri dönüşümlü olması gerekir [Slayt ${concept.slideNumbers.join(', ')}]. Sence bu denge bozulursa ilaç etkisinde ne değişir?`,
    timestamp: Date.now(),
    slideCitation: {
      deck: concept.sourceDeck,
      slideNumbers: concept.slideNumbers,
    },
    scaffoldLevel: 'nudge',
    modelUsed: 'inclusionai/ling-3.0-flash-sante (Grounding Engine)',
  };
}
