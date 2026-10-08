import React, { useState } from 'react';
import { Button, Segmented, Tag, Steps, Alert } from 'antd';
import {
  ExperimentOutlined,
  ThunderboltOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  BulbOutlined,
  RobotOutlined,
  RightOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { realtimeTelemetry } from '../../services/realtimeTelemetryService';

export type GProteinType = 'Gs' | 'Gi' | 'Gq';

interface PathwayDefinition {
  type: GProteinType;
  name: string;
  receptors: string;
  agonist: string;
  antagonist: string;
  effector: string;
  secondMessenger: string;
  physiologicalEffect: string;
  slideRef: number;
}

const PATHWAYS: Record<GProteinType, PathwayDefinition> = {
  Gs: {
    type: 'Gs',
    name: 'Gs Kaskadı (Adenilat Siklaz Aktivasyonu)',
    receptors: 'β1, β2 Adrenerjik reseptörler',
    agonist: 'İsoprenalin / Adrenalin',
    antagonist: 'Propranolol',
    effector: 'Adenilat Siklaz (AC) ↑',
    secondMessenger: 'ATP → cAMP ↑ (PKA Aktivasyonu)',
    physiologicalEffect: 'Kalp kasılma gücü & hızı artar, bronkodilatasyon',
    slideRef: 6,
  },
  Gi: {
    type: 'Gi',
    name: 'Gi Kaskadı (Adenilat Siklaz İnhibisyonu)',
    receptors: 'α2 Adrenerjik, M2 Muskarinik reseptörler',
    agonist: 'Klonidin',
    antagonist: 'Yohimbin',
    effector: 'Adenilat Siklaz (AC) ↓',
    secondMessenger: 'cAMP ↓ (PKA inhibisyonu, K+ kanalları açılır)',
    physiologicalEffect: 'Sempatik deşarj azalır, kan basıncı ve kalp hızı düşer',
    slideRef: 6,
  },
  Gq: {
    type: 'Gq',
    name: 'Gq Kaskadı (Fosfolipaz C & Kalsiyum Salınımı)',
    receptors: 'α1 Adrenerjik, M1 & M3 Muskarinik reseptörler',
    agonist: 'Fenilefrin',
    antagonist: 'Prazosin',
    effector: 'Fosfolipaz C-β (PLC) ↑',
    secondMessenger: 'PIP2 → IP3 (Ca²⁺ salınımı) + DAG (PKC)',
    physiologicalEffect: 'Düz kas kasılması, güçlü vazokonstriksiyon',
    slideRef: 6,
  },
};

interface StepChallenge {
  prompt: string;
  options: {
    id: string;
    label: string;
    isCorrect: boolean;
    misconceptionFeedback?: string;
  }[];
}

const STEP_CHALLENGES: Record<number, Record<GProteinType, StepChallenge>> = {
  0: {
    Gs: {
      prompt: '1. Adım: Bir agonist (örn. İsoprenalin) β-adrenerjik reseptöre bağlandığında ilk gerçekleşen fiziksel olay nedir?',
      options: [
        { id: 'a', label: 'Reseptör 7-transmembran heliksinde konformasyon değişimi oluşur', isCorrect: true },
        { id: 'b', label: 'Reseptör derhal hücre içine endositozla çekilir', isCorrect: false, misconceptionFeedback: 'Endositoz desensitizasyonda uzun vadede olur, akut sinyal iletiminde değil.' },
        { id: 'c', label: 'Reseptör parçalanarak ikinci habercileri serbest bırakır', isCorrect: false, misconceptionFeedback: 'Reseptör kalıcı bir proteindir, parçalanmaz; şekil değiştirerek G-proteinini uyarır.' },
      ],
    },
    Gi: {
      prompt: '1. Adım: α2 reseptörüne Klonidin (agonist) bağlandığında ne gerçekleşir?',
      options: [
        { id: 'a', label: 'Reseptör aktifleşerek Gi proteininin α alt birimini uyarır', isCorrect: true },
        { id: 'b', label: 'Reseptör doğrudan hücre içine kalsiyum pompalar', isCorrect: false, misconceptionFeedback: 'Gi reseptörleri iyon kanalı değildir; metabotropik GPCR aracılığıyla çalışır.' },
      ],
    },
    Gq: {
      prompt: '1. Adım: α1 reseptörüne Fenilefrin bağlandığında hücre yüzeyinde ne tetiklenir?',
      options: [
        { id: 'a', label: 'Heterotrimerik Gq proteini ile reseptörün sitoplazmik kuyruğu etkileşir', isCorrect: true },
        { id: 'b', label: 'Hücre derhal cAMP üretmeye başlar', isCorrect: false, misconceptionFeedback: 'cAMP Gs yoluyla ilgilidir; Gq yolu Fosfolipaz C ve IP3/DAG kaskadını kullanır.' },
      ],
    },
  },
  1: {
    Gs: {
      prompt: '2. Adım: Aktifleşen Gs-alfa alt biriminde nükleotid düzeyinde hangi kritik değişim gerçekleşir?',
      options: [
        { id: 'a', label: 'Bağlı olan GDP ayrılır ve yerine yüksek enerjili GTP bağlanır', isCorrect: true },
        { id: 'b', label: 'GTP parçalanarak kalıcı olarak ATP\'ye dönüşür', isCorrect: false, misconceptionFeedback: 'G-proteinleri GTP bağlar, ATP hücre enerji havuzundadır.' },
        { id: 'c', label: 'GDP fosforillenerek doğrudan cGMP üretir', isCorrect: false, misconceptionFeedback: 'GDP fosforillenmez; allosterik olarak GTP ile yer değiştirir.' },
      ],
    },
    Gi: {
      prompt: '2. Adım: Gi-alfa alt birimi GTP bağladığında efektör enzime nasıl bir mesaj verir?',
      options: [
        { id: 'a', label: 'Adenilat Siklaz enziminin aktif bölgesini allosterik olarak baskılar (inhibe eder)', isCorrect: true },
        { id: 'b', label: 'Adenilat Siklazı 10 kat daha hızlı çalıştırır', isCorrect: false, misconceptionFeedback: 'Gi "inhibitory" (inhibitör) proteindir; AC aktivitesini düşürür.' },
      ],
    },
    Gq: {
      prompt: '2. Adım: GTP yüklü Gq-alfa alt birimi hangi membran enzimine doğru göç eder?',
      options: [
        { id: 'a', label: 'Fosfolipaz C-β (PLC) membran enzimine bağlanır', isCorrect: true },
        { id: 'b', label: 'Tirozin kinaz reseptörüne bağlanır', isCorrect: false, misconceptionFeedback: 'Tirozin kinazlar GPCR\'dan bağımsız enzim-bağlantılı ayrı reseptör ailesidir.' },
      ],
    },
  },
  2: {
    Gs: {
      prompt: '3. Adım: Adenilat Siklaz aktive edildiğinde sitoplazmada hangi ikincil haberci üretilir?',
      options: [
        { id: 'a', label: 'Hücresel ATP molekülünden siklik AMP (cAMP) sentezlenir', isCorrect: true },
        { id: 'b', label: 'Doğrudan Kalsiyum iyonları sentezlenir', isCorrect: false, misconceptionFeedback: 'Kalsiyum bir elementtir, sentezlenmez; hücre içi depolardan salınır (Gq/IP3).' },
      ],
    },
    Gi: {
      prompt: '3. Adım: Gi yoluyla cAMP seviyesi azaldığında hücrede hangi enzim inaktifleşir?',
      options: [
        { id: 'a', label: 'Protein Kinaz A (PKA) fosforilasyon aktivitesi azalır', isCorrect: true },
        { id: 'b', label: 'DNA polimeraz hemen durur', isCorrect: false, misconceptionFeedback: 'PKA temel hedef enzimdir; hücresel fosforilasyon zincirini kontrol eder.' },
      ],
    },
    Gq: {
      prompt: '3. Adım: Fosfolipaz C (PLC), membran fosfolipidi olan PIP2\'yi hangi iki kritik haberciye parçalar?',
      options: [
        { id: 'a', label: 'IP3 (İnozitil trifosfat) ve DAG (Diaçilgliserol)', isCorrect: true },
        { id: 'b', label: 'Kolesterol ve Yağ asitleri', isCorrect: false, misconceptionFeedback: 'PLC özgül olarak PIP2\'yi keserek IP3 ve DAG üretir.' },
      ],
    },
  },
  3: {
    Gs: {
      prompt: '4. Adım: PKA aktivasyonu sonrasında organda hangi nihai fizyolojik yanıt ortaya çıkar?',
      options: [
        { id: 'a', label: 'Kalp kasında kasılma gücü/hızı artar ve bronş düz kasında dilatasyon oluşur', isCorrect: true },
        { id: 'b', label: 'Damarlarda ani vazokonstriksiyon ile tansiyon fırlar', isCorrect: false, misconceptionFeedback: 'Vazokonstriksiyon Gq/alfa-1 yolunun sonucudur; beta-2/Gs bronkodilatasyon ve vazodilatasyon yapar.' },
      ],
    },
    Gi: {
      prompt: '4. Adım: Gi aktivasyonu ve cAMP azalması sonucunda hangi nihai fizyolojik etki gözlenir?',
      options: [
        { id: 'a', label: 'Sempatik deşarj baskılanır, periferik direnç ve kalp hızı düşer', isCorrect: true },
        { id: 'b', label: 'Hücre içi kalsiyum patlamasıyla glikojenoliz hızlanır', isCorrect: false, misconceptionFeedback: 'Kalsiyum patlaması Gq yoluna aittir; Gi yolu adenilat siklazı inhibe ederek aktiviteyi yavaşlatır.' },
      ],
    },
    Gq: {
      prompt: '4. Adım: Endoplazmik retikulumdan sitoplazmaya yayılan yüksek Ca²⁺ iyonları hangi sonuca yol açar?',
      options: [
        { id: 'a', label: 'Kalmodulin ve MLCK aktive olarak güçlü damar düz kası kasılması (vazokonstriksiyon) oluşturur', isCorrect: true },
        { id: 'b', label: 'cAMP artışı ile solunum yollarını gevşetir', isCorrect: false, misconceptionFeedback: 'Hücre içi kalsiyum artışı gevşeme değil, güçlü kas kasılması ve vazokonstriksiyon yapar.' },
      ],
    },
  },
};

export const ReceptorSignalingVisualizer: React.FC<{
  onAskTutor?: ((query: string) => void) | undefined;
}> = ({ onAskTutor }) => {
  const [selectedPathway, setSelectedPathway] = useState<GProteinType>('Gs');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [stepFeedback, setStepFeedback] = useState<{
    isCorrect: boolean;
    feedbackText: string;
  } | null>(null);

  const pathway = PATHWAYS[selectedPathway];
  const challenge = STEP_CHALLENGES[currentStep]?.[selectedPathway];

  const handlePathwayChange = (val: string) => {
    const newType = val as GProteinType;
    setSelectedPathway(newType);
    setCurrentStep(0);
    setSelectedOptionId(null);
    setStepFeedback(null);

    // Emit Realtime Telemetry
    realtimeTelemetry.emitTelemetry({
      widgetId: 'gpcr_visualizer',
      action: 'pathway_changed',
      summary: `Öğrenci GPCR kaskadını değiştirdi: ${newType} (${PATHWAYS[newType].name})`,
      metrics: { pathway: newType, step: 0 },
    });
  };

  const handleSelectOption = (optId: string) => {
    setSelectedOptionId(optId);
    setStepFeedback(null);
  };

  const handleVerifyStep = () => {
    if (!challenge || !selectedOptionId) return;
    const opt = challenge.options.find((o) => o.id === selectedOptionId);
    if (!opt) return;

    if (opt.isCorrect) {
      setStepFeedback({
        isCorrect: true,
        feedbackText: 'Harika! Doğru biyokimyasal mekanizma tespit edildi.',
      });

      // Emit Realtime Telemetry for Correct Step
      realtimeTelemetry.emitTelemetry({
        widgetId: 'gpcr_visualizer',
        action: 'step_completed',
        summary: `Öğrenci ${selectedPathway} yolunda ${currentStep + 1}. adımı başarıyla geçti.`,
        metrics: { pathway: selectedPathway, step: currentStep, success: true },
      });
    } else {
      setStepFeedback({
        isCorrect: false,
        feedbackText: opt.misconceptionFeedback || 'Seçtiğiniz mekanizma ders slaytlarındaki GPCR sinyal ilkelerine uymuyor.',
      });

      // Emit Realtime Telemetry with Misconception Alert for Socratic Tutor!
      realtimeTelemetry.emitTelemetry({
        widgetId: 'gpcr_visualizer',
        action: 'misconception_occurred',
        summary: `Öğrenci ${selectedPathway} kaskadı ${currentStep + 1}. adımda yanılgıya düştü: "${opt.label}"`,
        metrics: { pathway: selectedPathway, step: currentStep, success: false },
        misconceptionAlert: {
          title: `GPCR Sinyal Yanılgısı (${selectedPathway} - Adım ${currentStep + 1})`,
          rationale: opt.misconceptionFeedback || 'G-proteini alt birim değişimi veya efektör eşleşmesinde kavram hatası yapıldı.',
          suggestedQuestion: `${selectedPathway} proteininin aktive edilme sürecinde "${opt.label}" seçimimin neden hatalı olduğunu Sokratik olarak açıklar mısın?`,
          severity: 'medium',
        },
      });
    }
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
      setSelectedOptionId(null);
      setStepFeedback(null);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedOptionId(null);
    setStepFeedback(null);
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 dark:border-[#2F2F2F] bg-white dark:bg-[#171717] p-4 sm:p-6 shadow-xs transition-colors">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-[#2F2F2F] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ThunderboltOutlined className="text-[#10A37F] text-base" />
            <h3 className="font-bold text-sm sm:text-base m-0 text-slate-900 dark:text-[#ECECEC]">
              Reseptör Sinyal Yolağı & GPCR Kaskad Simülatörü
            </h3>
            <Tag color="green" className="text-[10px] font-mono rounded-lg m-0 border-0 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">
              Slayt 5 & 6
            </Tag>
          </div>
          <p className="text-xs text-slate-500 dark:text-[#8E8E8E] m-0 mt-0.5">
            Heterotrimerik G-proteini sinyal iletimi ve ikincil haberci kaskadı
          </p>
        </div>

        {/* Pathway Selector */}
        <Segmented
          value={selectedPathway}
          onChange={handlePathwayChange}
          options={[
            { label: 'Gs (cAMP ↑)', value: 'Gs' },
            { label: 'Gi (cAMP ↓)', value: 'Gi' },
            { label: 'Gq (IP3/Ca²⁺ ↑)', value: 'Gq' },
          ]}
          size="middle"
        />
      </div>

      {/* Pathway Quick Facts Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs bg-slate-50 dark:bg-[#212121] p-3 rounded-xl border border-slate-200 dark:border-[#2F2F2F]">
        <div>
          <span className="text-slate-400 block font-mono text-[10px] uppercase">Örnek Reseptörler:</span>
          <strong className="text-slate-800 dark:text-[#ECECEC]">{pathway.receptors}</strong>
        </div>
        <div>
          <span className="text-slate-400 block font-mono text-[10px] uppercase">Agonist / Antagonist:</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{pathway.agonist}</span>
          <span className="text-slate-400 mx-1">/</span>
          <span className="text-red-500 font-medium">{pathway.antagonist}</span>
        </div>
        <div>
          <span className="text-slate-400 block font-mono text-[10px] uppercase">Hücresel Yanıt:</span>
          <span className="text-[#10A37F] font-semibold">{pathway.physiologicalEffect}</span>
        </div>
      </div>

      {/* Interactive SVG Membrane & Cascade Diagram */}
      <div className="relative rounded-2xl bg-gradient-to-b from-[#1C1C1C] to-[#121212] p-4 text-white overflow-hidden border border-[#2F2F2F] min-h-[220px] flex flex-col justify-between">
        {/* Membrane bilayer indicator */}
        <div className="absolute top-20 left-0 right-0 h-4 bg-amber-500/20 border-y border-amber-400/40 flex items-center justify-around pointer-events-none">
          <span className="text-[9px] font-mono text-amber-300 tracking-wider">LİPİT ÇİFT KATMAN (HÜCRE ZARI) [Slayt 5]</span>
        </div>

        {/* Dynamic Graphic Stages */}
        <svg viewBox="0 0 540 180" className="w-full h-44 select-none">
          {/* Ligand */}
          <circle
            cx={currentStep >= 0 ? 90 : 30}
            cy={currentStep >= 1 ? 50 : 25}
            r="12"
            fill={selectedPathway === 'Gs' ? '#3B82F6' : selectedPathway === 'Gi' ? '#A855F7' : '#EF4444'}
            className="transition-all duration-300"
          />
          <text x={currentStep >= 0 ? 90 : 30} y={currentStep >= 1 ? 54 : 29} textAnchor="middle" fill="#FFFFFF" className="text-[9px] font-bold">
            L
          </text>

          {/* 7-TM GPCR Receptor */}
          <rect
            x="70"
            y="50"
            width="40"
            height="70"
            rx="8"
            fill={currentStep >= 1 ? '#2563EB' : '#1E293B'}
            stroke={currentStep >= 1 ? '#60A5FA' : '#475569'}
            strokeWidth="2"
            className="transition-colors duration-300"
          />
          <text x="90" y="88" textAnchor="middle" fill="#FFFFFF" className="text-[9px] font-mono font-bold">
            GPCR
          </text>

          {/* G-Protein Heterotrimer (Alpha, Beta, Gamma) */}
          <g transform={`translate(${currentStep >= 2 ? 170 : 115}, 105)`} className="transition-transform duration-500">
            {/* G-Alpha */}
            <circle
              cx="20"
              cy="20"
              r="18"
              fill={currentStep >= 2 ? '#10B981' : '#334155'}
              stroke="#059669"
              strokeWidth="1.5"
            />
            <text x="20" y="24" textAnchor="middle" fill="#FFFFFF" className="text-[9px] font-bold font-mono">
              Gα-{selectedPathway === 'Gs' ? 's' : selectedPathway === 'Gi' ? 'i' : 'q'}
            </text>
            {/* GTP badge */}
            <rect x="2" y="-4" width="36" height="12" rx="4" fill={currentStep >= 2 ? '#F59E0B' : '#64748B'} />
            <text x="20" y="5" textAnchor="middle" fill="#000000" className="text-[8px] font-black font-mono">
              {currentStep >= 2 ? 'GTP' : 'GDP'}
            </text>
          </g>

          {/* G-Beta/Gamma */}
          <ellipse
            cx="135"
            cy={currentStep >= 2 ? 145 : 125}
            rx="14"
            ry="10"
            fill="#475569"
            className="transition-all duration-500"
          />
          <text x="135" y={currentStep >= 2 ? 148 : 128} textAnchor="middle" fill="#CBD5E1" className="text-[8px] font-mono">
            βγ
          </text>

          {/* Arrow towards effector */}
          {currentStep >= 2 && (
            <path d="M 215 125 L 290 100" stroke="#10B981" strokeWidth="2" strokeDasharray="3 3" fill="none" />
          )}

          {/* Effector Enzyme (Adenylate Cyclase or PLC) */}
          <rect
            x="300"
            y="50"
            width="55"
            height="70"
            rx="10"
            fill={currentStep >= 3 ? '#0D9488' : '#1E293B'}
            stroke={currentStep >= 3 ? '#2DD4BF' : '#475569'}
            strokeWidth="2"
            className="transition-colors duration-300"
          />
          <text x="327" y="82" textAnchor="middle" fill="#FFFFFF" className="text-[8px] font-mono font-bold">
            {selectedPathway === 'Gq' ? 'PLC-β' : 'AC'}
          </text>
          <text x="327" y="96" textAnchor="middle" fill="#99F6E4" className="text-[7px] font-mono">
            {currentStep >= 3 ? (selectedPathway === 'Gi' ? 'İnaktif' : 'Aktif') : 'Beklemede'}
          </text>

          {/* Second Messenger Bubbles */}
          {currentStep >= 3 && (
            <g className="animate-in fade-in zoom-in duration-300">
              <path d="M 355 100 Q 410 120 440 140" stroke="#F59E0B" strokeWidth="2" fill="none" />
              <rect x="420" y="125" width="105" height="34" rx="8" fill="#1E1B4B" stroke="#818CF8" strokeWidth="1.5" />
              <text x="472" y="140" textAnchor="middle" fill="#C7D2FE" className="text-[9px] font-bold font-mono">
                {selectedPathway === 'Gq' ? 'IP3 + DAG' : selectedPathway === 'Gs' ? 'cAMP ↑' : 'cAMP ↓'}
              </text>
              <text x="472" y="152" textAnchor="middle" fill="#A5B4FC" className="text-[8px] font-mono">
                {selectedPathway === 'Gq' ? 'Ca²⁺ Salınımı (ER)' : selectedPathway === 'Gs' ? 'PKA Aktivasyonu' : 'PKA İnhibisyonu'}
              </text>
            </g>
          )}
        </svg>

        {/* Status text footer */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span>Aşama {currentStep + 1}/4: {challenge?.prompt.split(':')[0] || 'Kaskad Tamamlandı'}</span>
          <span className="text-emerald-400 font-bold">Hedef: {pathway.secondMessenger}</span>
        </div>
      </div>

      {/* Step Progression (Ant Design Steps) */}
      <Steps
        size="small"
        current={currentStep}
        items={[
          { title: 'Ligand Bağlanması' },
          { title: 'G-Proteini GTP Değişimi' },
          { title: 'Efektör Aktivasyonu' },
          { title: 'Hücresel Yanıt' },
        ]}
      />

      {/* Predict-then-Reveal Challenge Card */}
      {challenge && currentStep < 3 && (
        <div className="flex flex-col gap-3 p-4 rounded-xl border border-slate-200 dark:border-[#2F2F2F] bg-slate-50 dark:bg-[#212121]">
          <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-[#ECECEC] leading-relaxed">
            {challenge.prompt}
          </span>

          <div className="flex flex-col gap-2">
            {challenge.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let style = 'border-slate-200 dark:border-[#2F2F2F] bg-white dark:bg-[#171717] text-slate-800 dark:text-[#ECECEC]';
              if (isSelected) {
                style = 'border-[#10A37F] bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold';
              }
              if (stepFeedback && isSelected) {
                style = stepFeedback.isCorrect
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100'
                  : 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-100';
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(opt.id)}
                  className={`text-start p-3 rounded-xl border text-xs transition-all flex items-start gap-2 cursor-pointer shadow-xs ${style}`}
                >
                  <span className="font-mono text-xs mt-0.5">
                    {stepFeedback && isSelected ? (
                      stepFeedback.isCorrect ? (
                        <CheckCircleFilled className="text-emerald-600" />
                      ) : (
                        <CloseCircleFilled className="text-red-600" />
                      )
                    ) : (
                      '•'
                    )}
                  </span>
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback & Actions */}
          {stepFeedback && (
            <Alert
              type={stepFeedback.isCorrect ? 'success' : 'error'}
              showIcon
              className="rounded-xl text-xs"
              message={stepFeedback.isCorrect ? 'Doğru Tahmin!' : 'Pedagojik Geri Bildirim'}
              description={stepFeedback.feedbackText}
            />
          )}

          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2">
              <Button
                type="primary"
                onClick={handleVerifyStep}
                disabled={!selectedOptionId || (stepFeedback?.isCorrect ?? false)}
                className="bg-[#10A37F] hover:bg-[#0E8C6D] text-white rounded-xl px-4 h-9 font-semibold border-0 shadow-xs"
              >
                {stepFeedback?.isCorrect ? 'Onaylandı ✓' : 'Tahmini Doğrula'}
              </Button>

              {stepFeedback?.isCorrect && (
                <Button
                  type="default"
                  onClick={handleNextStep}
                  icon={<RightOutlined />}
                  className="rounded-xl h-9 font-semibold text-[#10A37F] border-[#10A37F] hover:border-[#0E8C6D] bg-white dark:bg-[#171717]"
                >
                  Sonraki Aşamaya İlerle →
                </Button>
              )}
            </div>

            {onAskTutor && (
              <Button
                type="link"
                size="small"
                icon={<RobotOutlined className="text-[#10A37F]" />}
                onClick={() =>
                  onAskTutor(
                    `${pathway.name} konusundaki ${currentStep + 1}. adımda (${challenge.prompt}) ilacın ve G-protein kaskadının mekanizmasını detaylandırır mısın?`
                  )
                }
                className="text-xs font-semibold text-[#10A37F] hover:text-[#0E8C6D] p-0"
              >
                Tutor'a Sor →
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Completion Stage */}
      {currentStep >= 3 && (
        <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/30 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <CheckCircleFilled className="text-emerald-600 text-lg" />
            <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-200 m-0">
              Kaskad Tamamlandı: {pathway.name}
            </h4>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 m-0 leading-relaxed">
            Ligand bağlanmasından ikincil haberci sentezine kadar tüm adımları başarıyla tamamladınız. <strong>{pathway.receptors}</strong> reseptörlerinin uyarılmasıyla <strong>{pathway.secondMessenger}</strong> üretilerek <strong>{pathway.physiologicalEffect}</strong> yanıtı oluşur.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <Button
              size="small"
              icon={<ReloadOutlined />}
              onClick={handleReset}
              className="rounded-xl text-xs font-medium"
            >
              Baştan Simüle Et
            </Button>
            {onAskTutor && (
              <Button
                type="primary"
                size="small"
                ghost
                icon={<RobotOutlined />}
                onClick={() =>
                  onAskTutor(
                    `GPCR ${selectedPathway} kaskadı ile diğer yolların (Gs vs Gi vs Gq) farmasötik farklarını ve klinik ilaç örneklerini karşılaştırır mısın?`
                  )
                }
                className="rounded-xl text-xs font-medium"
              >
                Yolakları Birbiriyle Kıyasla
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
