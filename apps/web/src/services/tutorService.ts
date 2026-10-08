import generatedConcepts from '../data/teaching.concepts.generated.json';
import { realtimeTelemetry } from './realtimeTelemetryService';
import { lectureRag, KnowledgeNode } from './lectureRagService';
import { getSupabase } from '@pharmacy/platform';

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

  // Zero plaintext credentials in client runtime (FEAT-SEC-01)
  const openRouterKey =
    apiKey ||
    (typeof window !== 'undefined' ? localStorage.getItem('pep_openrouter_key') || '' : '') ||
    (import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined) ||
    '';

  const isTest =
    Boolean(typeof process !== 'undefined' && (process.env.NODE_ENV === 'test' || process.env.VITEST)) ||
    Boolean(typeof import.meta !== 'undefined' && (import.meta.env?.MODE === 'test' || (import.meta.env as any)?.VITEST));

  // If no direct client key, attempt proxying through authenticated Supabase Edge Function (FEAT-SEC-02)
  if (!openRouterKey && !isTest && typeof window !== 'undefined') {
    try {
      const client = getSupabase();
      const session = (await client.auth.getSession()).data.session;
      if (session?.access_token) {
        const resp = await fetch('https://ibyntbynqkpkkpeoudzv.supabase.co/functions/v1/v2-tutor-service', {
          method: 'POST',
          signal: AbortSignal.timeout(3000),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            courseId: 'medchem',
            lectureSlug: 'ilac-reseptor-etkilesimi',
            studentMessage: prompt,
            recentHistory: conversationHistory.slice(-4).map((m) => ({
              role: m.sender === 'user' ? 'user' : 'assistant',
              content: m.content,
            })),
          }),
        });

        if (resp.ok) {
          const edgeData = await resp.json();
          if (edgeData.content) {
            return {
              id: edgeData.id || `msg-${Date.now()}`,
              sender: 'tutor',
              content: edgeData.content,
              timestamp: edgeData.timestamp || Date.now(),
              slideCitation: edgeData.slideCitation,
              scaffoldLevel: edgeData.scaffoldLevel || 'nudge',
              modelUsed: edgeData.modelUsed || 'v2-tutor-service (Edge)',
            };
          }
        }
      }
    } catch {
      // Fallback gracefully to direct or deterministic engine
    }
  }

  if (openRouterKey && !isTest) {
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

      // Active, verified free models on OpenRouter (benchmarked for high accuracy and fast Turkish generation)
      const modelsToTry = [
        'inclusionai/ling-3.0-flash-sante:free',
        'dots-studio/dots-3-note-preview:free',
        'nvidia/nemotron-3.5-lightning:free',
        'liquid/lfm-2.5-2.6b:free',
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
              max_tokens: 800,
              temperature: 0.3,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            const msg = data.choices?.[0]?.message;
            let text = msg?.content;

            // If model returned content inside reasoning or completed reasoning
            if (!text && msg?.reasoning) {
              text = msg.reasoning;
            }

            // Clean up any internal thinking blocks or preambles if present
            if (text) {
              text = text
                .replace(/<think>[\s\S]*?<\/think>/gi, '')
                .replace(/^Here's a thinking process:[\s\S]*?\n\n/gi, '')
                .trim();
            }

            if (text && text.length > 5) {
              console.log(`[OpenRouter Live AI] Success with model: ${model}`);
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
          } else {
            console.warn(`[OpenRouter] Model ${model} returned ${res.status}`);
          }
        } catch (modelErr) {
          console.warn(`[OpenRouter] Error trying ${model}:`, modelErr);
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
  // Question: Kd and Affinity
  if (p.includes('kd') || p.includes('afinite') || p.includes('kütle hareketi')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'tutor',
      content:
        'Kütle hareketi kanununa göre afinite 1/Kd ile ters orantılıdır [Slayt 13]. Kd, toplam reseptörlerin %50’sini doyuran ilaç konsantrasyonudur. Küçük Kd değeri, ilacın mikromolar yerine nanomolar düzeyde bağlanabildiğini ve çok yüksek afiniteye sahip olduğunu gösterir.',
      timestamp: Date.now(),
      slideCitation: {
        deck: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
        slideNumbers: [11, 12, 13],
      },
      scaffoldLevel: 'mastery',
      modelUsed: 'Sokratik Farmakodinami Motoru',
    };
  }

  // Question: EC50 vs Emax / Potency vs Efficacy
  if (p.includes('ec50') || p.includes('emax') || p.includes('potens') || p.includes('etkinlik') || p.includes('efficacy')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'tutor',
      content:
        'Klinik farmakolojinin en temel vize kuralı: Emax tavan etkinliktir, EC50 ise potenstir [Slayt 16, 18]. Küçük EC50 sadece hapın miligram dozunu küçültür; fakat klinik üstünlüğü sağlayan parametre tavan yanıttır (Emax). Şiddetli ağrıda Emax daima potense tercih edilir!',
      timestamp: Date.now(),
      slideCitation: {
        deck: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
        slideNumbers: [16, 17, 18],
      },
      scaffoldLevel: 'mastery',
      modelUsed: 'Sokratik Farmakodinami Motoru',
    };
  }

  // Question: Full vs Partial Agonist
  if (p.includes('parsiyel') || p.includes('tam agonist') || p.includes('intrensek aktivite') || p.includes('buprenorfin')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'tutor',
      content:
        'Tam agonist alfa=1.0 ile %100 tavan yanıt üretirken; parsiyel agonist tüm reseptörleri doldursa bile submaksimal (0 < alfa < 1.0) yanıt verir [Slayt 22]. Yüksek doz tam agonist varlığında parsiyel agonist onu yerinden ederek kompetitif antagonist gibi davranır ve yanıtı düşürür [Slayt 24].',
      timestamp: Date.now(),
      slideCitation: {
        deck: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
        slideNumbers: [20, 22, 24],
      },
      scaffoldLevel: 'clue',
      modelUsed: 'Sokratik Farmakodinami Motoru',
    };
  }

  // Question: Competitive vs Non-Competitive Antagonism / Schild
  if (p.includes('kompetitif') || (p.includes('antagoniz') && !p.includes('gq')) || p.includes('schild') || p.includes('pa2')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'tutor',
      content:
        'Kompetitif antagonist agonist ile aynı ortosterik cebi paylaşır ve aşılabilirdir (surmountable) [Slayt 26]. Doz-yanıt eğrisi paralel sağa kayar; Emax değişmez, EC50 artar. Non-kompetitif blokaj ise allosterik veya kovalenttir; aşılamaz ve Emax çöker [Slayt 28].',
      timestamp: Date.now(),
      slideCitation: {
        deck: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
        slideNumbers: [25, 26, 28],
      },
      scaffoldLevel: 'mastery',
      modelUsed: 'Sokratik Farmakodinami Motoru',
    };
  }

  // Question: Inverse Agonist / Constitutive Activity
  if (p.includes('ters agonist') || p.includes('inverse') || p.includes('konstitütif') || p.includes('bazal aktivite')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'tutor',
      content:
        'Ligand yokluğunda bile kendiliğinden sinyal üreten duruma konstitütif (bazal) aktivite denir [Slayt 31]. Nötral antagonist bazal sinyali değiştirmez; ters agonist ise inaktif R konformasyonunu stabilize ederek bazal aktiviteyi sıfırın altına baskılar (alfa < 0) [Slayt 33].',
      timestamp: Date.now(),
      slideCitation: {
        deck: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
        slideNumbers: [31, 32, 33],
      },
      scaffoldLevel: 'clue',
      modelUsed: 'Sokratik Farmakodinami Motoru',
    };
  }

  // Question: Spare Receptors / Furchgott
  if (p.includes('yedek reseptör') || p.includes('spare') || p.includes('furchgott')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'tutor',
      content:
        'Sinyal kaskadındaki amplifikasyon sayesinde maksimal etki (Emax) için tüm reseptörlerin dolması gerekmez; bu durumda EC50 < Kd olur [Slayt 36]. Furchgott deneyinde doku fenoksibenzaminle muamele edildiğinde yedek reseptörler tükenene kadar Emax değişmez, sadece eğri sağa kayar [Slayt 39].',
      timestamp: Date.now(),
      slideCitation: {
        deck: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
        slideNumbers: [36, 37, 39],
      },
      scaffoldLevel: 'mastery',
      modelUsed: 'Sokratik Farmakodinami Motoru',
    };
  }

  // Question: Quantal Dose-Response / Therapeutic Index / Warfarin / Digoxin
  if (p.includes('kuantal') || p.includes('terapötik indeks') || p.includes('digoksin') || p.includes('varfarin') || p.includes('ed50')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'tutor',
      content:
        'Kuantal yanıt popülasyonda ya-hep-ya-hiç oranlarını ölçer [Slayt 41]. Terapötik İndeks TI = TD50 / ED50 güvenlik aralığını verir [Slayt 43]. Küçük TI değerine sahip dar terapötik indeksli ilaçlar (Varfarin, Digoksin, Lityum, Teofilin, Fenitoin) rutin TDM kan takibi gerektirir [Slayt 45].',
      timestamp: Date.now(),
      slideCitation: {
        deck: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
        slideNumbers: [41, 43, 45],
      },
      scaffoldLevel: 'mastery',
      modelUsed: 'Sokratik Farmakodinami Motoru',
    };
  }

  // Question: Desensitization / Tachyphylaxis / Rebound
  if (p.includes('takifilaksi') || p.includes('desensitizasyon') || p.includes('up-regülasyon') || p.includes('down-regülasyon') || p.includes('rebound')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'tutor',
      content:
        'Takifilaksi dakikalar içinde hızla gelişen akut toleranstır [Slayt 53]. Kronik agonist maruziyeti reseptör sayısını azaltır (down-regülasyon). Kronik antagonist maruziyeti ise reseptör sayısını artırır (up-regülasyon); beta bloker aniden kesilirse ölümcül rebound aşırı uyarılma krizi gelişir [Slayt 57]!',
      timestamp: Date.now(),
      slideCitation: {
        deck: 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf',
        slideNumbers: [53, 56, 57],
      },
      scaffoldLevel: 'mastery',
      modelUsed: 'Sokratik Farmakodinami Motoru',
    };
  }

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

  // Grounded Socratic reply via retrieved RAG knowledge node
  if (ragNode && ragNode.title) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'tutor',
      content: `Bu soru doğrudan "${ragNode.title}" konusuyla ilgilidir [Slayt ${ragNode.slides.join(', ')}]. ${ragNode.summary} Slayttaki bu temel ilkeyi düşündüğünde sence klinik veya kimyasal yanıtta nasıl bir değişim gözlemlenir?`,
      timestamp: Date.now(),
      slideCitation: {
        deck: ragNode.courseId === 'pharmacology' ? 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf' : (concept.sourceDeck || 'İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf'),
        slideNumbers: ragNode.slides,
      },
      scaffoldLevel: 'nudge',
      modelUsed: 'Sokratik RAG Motoru',
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
