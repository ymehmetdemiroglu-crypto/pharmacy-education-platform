import React, { useState, useMemo, useEffect } from 'react';
import { Tag, Table, Segmented, Button } from 'antd';
import { InfoCircleOutlined, ExperimentOutlined, RobotOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { realtimeTelemetry } from '../../services/realtimeTelemetryService';

interface SarRow {
  key: string;
  substituent: string;
  chemicalModification: string;
  bondType: string;
  potencyRatio: string;
  stability: string;
  slideRef: number;
}

const DATA_SERIES: Record<string, { title: string; subtitle: string; rows: SarRow[] }> = {
  esters_vs_amides: {
    title: 'Ester vs Amit Köprüsü Değişimi',
    subtitle: 'Hidrojen bağı ve enzimatik stabilite kıyaslaması (Slayt 20 & 33)',
    rows: [
      {
        key: '1',
        substituent: 'Prokain (-COO- ester)',
        chemicalModification: 'Ester köprüsü',
        bondType: 'Dipol-dipol & H-akseptör',
        potencyRatio: '1.0x (Referans)',
        stability: 'Plazma esterazları ile hızlı hidroliz (Kısa yarı ömür)',
        slideRef: 20,
      },
      {
        key: '2',
        substituent: 'Lidokain / Dibukain (-CONH- amit)',
        chemicalModification: 'Amit izosteri',
        bondType: 'H-donör + H-akseptör & Dipol',
        potencyRatio: '4.0x – 15.0x',
        stability: 'Esterazlara dirençli, karaciğer mikrozomal metabolizma',
        slideRef: 33,
      },
      {
        key: '3',
        substituent: 'Tiyoester (-COS-)',
        chemicalModification: 'Kükürt izosteri',
        bondType: 'Zayıf dipol, düşük elektronegatiflik',
        potencyRatio: '0.3x',
        stability: 'Çok kararsız kimyasal hidroliz',
        slideRef: 15,
      },
    ],
  },
  amine_cation: {
    title: 'Amin Azotu İyonlaşma & Yük Derecesi',
    subtitle: 'İyonik bağ ve membran geçiş dengesi (Slayt 13, 14, 33)',
    rows: [
      {
        key: '4',
        substituent: 'Kuaterner Azot (-N⁺(CH3)3)',
        chemicalModification: 'Kalıcı pozitif yük',
        bondType: 'Güçlü İyonik Bağ (Asp/Glu)',
        potencyRatio: 'Yüksek reseptör afinitesi, sıfır membran geçişi (BBB -)',
        stability: 'Periferik etki, SSS geçemez',
        slideRef: 14,
      },
      {
        key: '5',
        substituent: 'Tersiyer Amin (-N(C2H5)2) [Dibukain]',
        chemicalModification: 'Fizyolojik pH pKa ~8.5',
        bondType: 'Geri dönüşümlü iyonik & dipol',
        potencyRatio: 'Optimum: Nötr form zarı geçer, iyonize form bağlanır',
        stability: 'Lokal anestezik etki için ideal',
        slideRef: 33,
      },
      {
        key: '6',
        substituent: 'Sekonder / Primer Amin',
        chemicalModification: 'Azot üzerinde hidrojen artışı',
        bondType: 'İyonik + H-bağı donörü',
        potencyRatio: 'Düşük lipofiliklik, hızlı oksidatif deaminasyon',
        stability: 'MAO enzimi ile hızlı yıkım',
        slideRef: 13,
      },
    ],
  },
};

interface R1Option {
  id: string;
  name: string;
  label: string;
  dLogP: number;
  electronic: string;
  slideRef: number;
}

interface R2Option {
  id: string;
  name: string;
  label: string;
  dLogP: number;
  stability: string;
  halfLife: string;
  slideRef: number;
}

interface R3Option {
  id: string;
  name: string;
  label: string;
  dLogP: number;
  pKa: number | null;
  ionizationRatio: string;
  membranePerm: 'optimal' | 'poor' | 'blocked';
  slideRef: number;
}

const R1_OPTIONS: R1Option[] = [
  { id: 'nh2', name: '-NH2 (p-Amino)', label: 'p-NH2 (Prokain)', dLogP: -1.2, electronic: 'Elektron verici rezonans (+M), karbonil dipolünü pekiştirir', slideRef: 20 },
  { id: 'h', name: '-H (Benzen)', label: 'Benzen (-H)', dLogP: 0.0, electronic: 'Nötr aromatik çekirdek', slideRef: 20 },
  { id: 'cl', name: '-Cl (Klor)', label: 'p-Cl (Lipofilik)', dLogP: +0.7, electronic: 'Lipofilik elektron çekici (-I), membran penetrasyonunu artırır', slideRef: 33 },
  { id: 'no2', name: '-NO2 (p-Nitro)', label: 'p-NO2 (Elektron Çekici)', dLogP: -0.3, electronic: 'Güçlü elektron çekici (-M/-I), ester dipolünü bozar', slideRef: 20 },
  { id: 'och3', name: '-OCH3 (Metoksi)', label: 'p-OCH3', dLogP: -0.1, electronic: 'Elektron salıcı rezonans, orta afinite', slideRef: 33 },
];

const R2_OPTIONS: R2Option[] = [
  { id: 'ester', name: '-COO- (Ester)', label: 'Ester (-COO-)', dLogP: 0.0, stability: 'Plazma psödokolinesterazı ile hızlı hidroliz', halfLife: '< 1 dk (Çok Kısa)', slideRef: 20 },
  { id: 'amide', name: '-CONH- (Amit)', label: 'Amit (-CONH-)', dLogP: +0.4, stability: 'Esterazlara dirençli, karaciğer mikrozomal CYP metabolizması', halfLife: '1.5 – 3 saat (Uzun)', slideRef: 33 },
  { id: 'thioester', name: '-COS- (Tiyoester)', label: 'Tiyoester (-COS-)', dLogP: +0.2, stability: 'Kimyasal hidrolize aşırı kararsız, klinik dışı', halfLife: 'Saniyeler (Kararsız)', slideRef: 15 },
];

const R3_OPTIONS: R3Option[] = [
  { id: 'tertiary', name: '-N(C2H5)2 (Tersiyer)', label: 'Tersiyer Dietilamin', dLogP: +1.5, pKa: 8.8, ionizationRatio: '%15 Nötr / %85 İyonize', membranePerm: 'optimal', slideRef: 33 },
  { id: 'secondary', name: '-NH(CH3) (Sekonder)', label: 'Sekonder Metilamin', dLogP: +0.6, pKa: 9.6, ionizationRatio: '%3 Nötr / %97 İyonize', membranePerm: 'poor', slideRef: 13 },
  { id: 'primary', name: '-NH2 (Primer)', label: 'Primer Amin', dLogP: +0.1, pKa: 10.2, ionizationRatio: '%0.5 Nötr / %99.5 İyonize', membranePerm: 'poor', slideRef: 13 },
  { id: 'quaternary', name: '-N⁺(CH3)3 (Kuaterner)', label: 'Kuaterner Azot', dLogP: -2.0, pKa: null, ionizationRatio: '%0 Nötr / %100 İyonize', membranePerm: 'blocked', slideRef: 14 },
];

export const SarMatrixWidget: React.FC<{ onAskTutor?: (query: string) => void }> = ({ onAskTutor }) => {
  const [selectedSeries, setSelectedSeries] = useState<string>('esters_vs_amides');
  
  // State for Tactile Explorer
  const [selectedR1, setSelectedR1] = useState<string>('nh2');
  const [selectedR2, setSelectedR2] = useState<string>('ester');
  const [selectedR3, setSelectedR3] = useState<string>('tertiary');

  const r1: R1Option = useMemo(() => R1_OPTIONS.find((o) => o.id === selectedR1) || R1_OPTIONS[0]!, [selectedR1]);
  const r2: R2Option = useMemo(() => R2_OPTIONS.find((o) => o.id === selectedR2) || R2_OPTIONS[0]!, [selectedR2]);
  const r3: R3Option = useMemo(() => R3_OPTIONS.find((o) => o.id === selectedR3) || R3_OPTIONS[0]!, [selectedR3]);

  // Dynamic QSAR Metrics
  const calculatedLogP = useMemo(() => {
    const baseLogP = 1.5;
    return Number((baseLogP + r1.dLogP + r2.dLogP + r3.dLogP).toFixed(2));
  }, [r1, r2, r3]);

  const potencyMultiplier = useMemo(() => {
    if (r3.id === 'quaternary') return '0.0x (İnaktif)';
    if (r2.id === 'thioester') return '0.2x (Düşük)';
    if (r1.id === 'no2') return '0.1x (Zayıf)';
    
    let base = 1.0;
    if (r2.id === 'amide') base *= 4.0;
    if (r1.id === 'cl') base *= 1.8;
    if (r1.id === 'nh2') base *= 1.2;
    if (r3.id === 'secondary') base *= 0.5;
    if (r3.id === 'primary') base *= 0.3;
    return `${base.toFixed(1)}x`;
  }, [r1, r2, r3]);

  // Telemetry Emission for Tactile Explorer
  useEffect(() => {
    if (selectedSeries !== 'tactile_explorer') return;

    let alert = null;
    if (r3.id === 'quaternary') {
      alert = {
        title: 'Kuaterner Azot Bariyeri Hatası (Slayt 14)',
        rationale: 'Kuaterner amonyum tuzları kalıcı pozitif yüklüdür. Reseptöre in vitro afinitesi yüksek olsa dahi lipofilik akson membranını geçemez ve periferik blokaj sağlayamaz.',
        suggestedQuestion: 'Kuaterner amonyum tuzları neden lokal anestezik olarak periferik sinir iletimini bloke edemez?',
        severity: 'high' as const,
      };
    } else if (r2.id === 'thioester') {
      alert = {
        title: 'Tiyoester Kararsızlığı (Slayt 15)',
        rationale: 'Tiyoester köprüleri kimyasal hidrolize aşırı duyarlıdır ve plazmada saniyeler içinde parçalanarak terapötik etki sağlayamaz.',
        suggestedQuestion: 'Tiyoester biyoizosteri lokal anestezik stabilitesini neden olumsuz etkiler?',
        severity: 'medium' as const,
      };
    } else if (r1.id === 'no2') {
      alert = {
        title: 'p-Nitro Dipol Bozulması (Slayt 20)',
        rationale: 'Elektron çekici -NO2 grubu, ester/amit karbonilindeki dipol polarizasyonunu zayıflatarak reseptör hidrojen bağı etkileşimini bozar.',
        suggestedQuestion: 'Aromatik halkaya nitro grubu bağlandığında lokal anestezik aktivite neden düşer?',
        severity: 'medium' as const,
      };
    }

    realtimeTelemetry.emitTelemetry({
      widgetId: 'sar_matrix',
      action: 'substituents_changed',
      summary: `SAR Modifikasyonu: R1=${r1.name}, R2=${r2.name}, R3=${r3.name} (LogP: ${calculatedLogP}, Potans: ${potencyMultiplier})`,
      metrics: {
        r1: r1.id,
        r2: r2.id,
        r3: r3.id,
        logP: calculatedLogP,
        potency: potencyMultiplier,
        membranePerm: r3.membranePerm,
      },
      misconceptionAlert: alert,
    });
  }, [selectedSeries, r1, r2, r3, calculatedLogP, potencyMultiplier]);

  const current = DATA_SERIES[selectedSeries] ?? DATA_SERIES.esters_vs_amides!;

  const columns = [
    {
      title: 'Analog / Yapı',
      dataIndex: 'substituent',
      key: 'substituent',
      render: (text: string) => (
        <span className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-[#ECECEC]">{text}</span>
      ),
    },
    {
      title: 'Etkileşim Türü',
      dataIndex: 'bondType',
      key: 'bondType',
      render: (text: string) => <Tag color="blue" className="text-[11px] rounded-lg border-0">{text}</Tag>,
    },
    {
      title: 'Biyolojik Yanıt / Potans',
      dataIndex: 'potencyRatio',
      key: 'potencyRatio',
      render: (text: string) => <span className="font-mono text-xs text-slate-700 dark:text-[#D1D5DB]">{text}</span>,
    },
    {
      title: 'Metabolik Stabilite',
      dataIndex: 'stability',
      key: 'stability',
      render: (text: string) => <span className="text-xs text-slate-500 dark:text-[#8E8E8E]">{text}</span>,
    },
    {
      title: 'Slayt',
      dataIndex: 'slideRef',
      key: 'slideRef',
      render: (slide: number) => (
        <Tag color="cyan" className="font-mono text-[10px] rounded-lg border-0">
          Slayt {slide}
        </Tag>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 dark:border-[#2F2F2F] bg-white dark:bg-[#171717] p-4 sm:p-5 shadow-xs transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-[#2F2F2F] pb-3">
        <div>
          <h3 className="font-bold text-sm sm:text-base flex items-center gap-1.5 m-0 text-slate-900 dark:text-[#ECECEC]">
            <ExperimentOutlined className="text-[#10A37F]" />
            Dinamik SAR Matrisi (Yapı-Aktivite İlişkisi)
          </h3>
          <p className="text-xs text-slate-500 dark:text-[#8E8E8E] m-0 mt-0.5">
            {selectedSeries === 'tactile_explorer'
              ? 'Molekülü adım adım sentezleyin ve biyofarmasötik özelliklerini canlı simüle edin'
              : current.subtitle}
          </p>
        </div>

        <Segmented
          value={selectedSeries}
          onChange={(val) => setSelectedSeries(val as string)}
          options={[
            { label: 'Ester vs Amit (S20, S33)', value: 'esters_vs_amides' },
            { label: 'Amin İyonizasyonu (S13, S33)', value: 'amine_cation' },
            { label: '🧪 Canlı Sübstitüent Deneyi', value: 'tactile_explorer' },
          ]}
          size="small"
        />
      </div>

      {selectedSeries === 'tactile_explorer' ? (
        <div className="flex flex-col gap-4 py-2">
          {/* Pharmacophore Visual Map */}
          <div className="p-3.5 bg-slate-50 dark:bg-[#212121] rounded-xl border border-slate-200 dark:border-[#2F2F2F] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
              <span className="text-xs font-semibold text-slate-400 dark:text-[#8E8E8E]">Sentezlenen İskelet:</span>
              <span className="font-mono text-xs px-2.5 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-lg border border-blue-200 dark:border-blue-900/60 font-bold">
                [ {r1.name} ]
              </span>
              <span className="text-slate-400">—</span>
              <span className="font-mono text-xs px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-lg border border-emerald-200 dark:border-emerald-900/60 font-bold">
                [ {r2.name} ]
              </span>
              <span className="text-slate-400">— (CH₂)₂ —</span>
              <span className="font-mono text-xs px-2.5 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-lg border border-amber-200 dark:border-amber-900/60 font-bold">
                [ {r3.name} ]
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Tag color={r3.membranePerm === 'optimal' ? 'green' : r3.membranePerm === 'blocked' ? 'red' : 'gold'} className="rounded-lg text-xs py-0.5 px-2">
                {r3.membranePerm === 'optimal' ? 'Akson Bariyerini Geçer' : r3.membranePerm === 'blocked' ? 'Membrana Takılır (0x)' : 'Kısıtlı Penetrasyon'}
              </Tag>
            </div>
          </div>

          {/* Interactive Modifiers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* R1 Selector */}
            <div className="p-3 bg-slate-50 dark:bg-[#212121] rounded-xl border border-slate-200 dark:border-[#2F2F2F] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-[#ECECEC] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
                  R1: Aromatik Halka
                </span>
                <span className="text-[10px] text-slate-400">Slayt {r1.slideRef}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {R1_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedR1(opt.id)}
                    className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedR1 === opt.id
                        ? 'bg-blue-600 text-white font-semibold shadow-xs'
                        : 'bg-white dark:bg-[#171717] text-slate-700 dark:text-[#D1D5DB] border border-slate-200 dark:border-[#2F2F2F] hover:border-blue-400'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{opt.label}</span>
                      <span className={`text-[10px] ${selectedR1 === opt.id ? 'text-blue-100' : 'text-slate-400'}`}>
                        {opt.dLogP > 0 ? `+${opt.dLogP}` : opt.dLogP} π
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-[#8E8E8E] m-0 mt-1 leading-snug">
                {r1.electronic}
              </p>
            </div>

            {/* R2 Selector */}
            <div className="p-3 bg-slate-50 dark:bg-[#212121] rounded-xl border border-slate-200 dark:border-[#2F2F2F] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-[#ECECEC] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                  R2: Köprü İzosteri
                </span>
                <span className="text-[10px] text-slate-400">Slayt {r2.slideRef}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {R2_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedR2(opt.id)}
                    className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedR2 === opt.id
                        ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                        : 'bg-white dark:bg-[#171717] text-slate-700 dark:text-[#D1D5DB] border border-slate-200 dark:border-[#2F2F2F] hover:border-emerald-400'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{opt.label}</span>
                      <span className={`text-[10px] ${selectedR2 === opt.id ? 'text-emerald-100' : 'text-slate-400'}`}>
                        {opt.halfLife}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-[#8E8E8E] m-0 mt-1 leading-snug">
                {r2.stability}
              </p>
            </div>

            {/* R3 Selector */}
            <div className="p-3 bg-slate-50 dark:bg-[#212121] rounded-xl border border-slate-200 dark:border-[#2F2F2F] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-[#ECECEC] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                  R3: Terminal Amin
                </span>
                <span className="text-[10px] text-slate-400">Slayt {r3.slideRef}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {R3_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedR3(opt.id)}
                    className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedR3 === opt.id
                        ? 'bg-amber-600 text-white font-semibold shadow-xs'
                        : 'bg-white dark:bg-[#171717] text-slate-700 dark:text-[#D1D5DB] border border-slate-200 dark:border-[#2F2F2F] hover:border-amber-400'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{opt.label}</span>
                      <span className={`text-[10px] ${selectedR3 === opt.id ? 'text-amber-100' : 'text-slate-400'}`}>
                        {opt.pKa ? `pKa ${opt.pKa}` : 'Kalıcı (+)'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-[#8E8E8E] m-0 mt-1 leading-snug">
                pH 7.4 Denge: {r3.ionizationRatio}
              </p>
            </div>
          </div>

          {/* Realtime Live Analysis Result Card */}
          <div className="p-4 bg-slate-50 dark:bg-[#212121] rounded-xl border border-slate-200 dark:border-[#2F2F2F] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full sm:w-auto">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Hesaplanan LogP</span>
                <span className={`text-base font-bold font-mono ${calculatedLogP >= 1.5 && calculatedLogP <= 3.5 ? 'text-emerald-500' : 'text-amber-500'}`}>
                  {calculatedLogP}
                </span>
                <span className="text-[10px] text-slate-400">Optimum (1.5 - 3.5)</span>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Relatif Potans</span>
                <span className="text-base font-bold font-mono text-[#10A37F]">
                  {potencyMultiplier}
                </span>
                <span className="text-[10px] text-slate-400">Prokain = 1.0x</span>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Yarı Ömür / Stabilite</span>
                <span className="text-xs font-semibold text-slate-700 dark:text-[#D1D5DB] mt-0.5">
                  {r2.halfLife}
                </span>
                <span className="text-[10px] text-slate-400">{r2.name} köprüsü</span>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Membran Geçişi</span>
                <span className={`text-xs font-bold mt-0.5 ${r3.membranePerm === 'optimal' ? 'text-emerald-500' : r3.membranePerm === 'blocked' ? 'text-rose-500' : 'text-amber-500'}`}>
                  {r3.membranePerm === 'optimal' ? 'Çift Fazlı Optimum' : r3.membranePerm === 'blocked' ? '0% Geçiş (İnaktif)' : 'Yetersiz'}
                </span>
                <span className="text-[10px] text-slate-400">{r3.name}</span>
              </div>
            </div>

            {onAskTutor && (
              <Button
                type="primary"
                icon={<RobotOutlined />}
                onClick={() =>
                  onAskTutor(
                    `Tasarladığım molekül: R1=${r1.name}, R2=${r2.name}, R3=${r3.name} (Hesaplanan LogP: ${calculatedLogP}, Relatif Potans: ${potencyMultiplier}). Bu sübstitüsyonun farmakolojik etkisini ve Slaytlardaki SAR kurallarını analiz eder misin?`
                  )
                }
                className="w-full sm:w-auto shrink-0 bg-[#10A37F] hover:bg-[#0E8C6D] text-white font-medium rounded-xl h-10 px-4 border-0 flex items-center justify-center gap-1.5"
              >
                Bu Molekülü Tutor'a Sor
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table
            dataSource={current.rows}
            columns={columns}
            pagination={false}
            size="small"
            className="text-xs"
            expandable={{
              expandedRowRender: (record) => (
                <div className="p-3.5 bg-slate-50 dark:bg-[#212121] rounded-xl border border-slate-200 dark:border-[#2F2F2F] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold text-slate-800 dark:text-[#ECECEC]">
                      Kimyasal Modifikasyon: <span className="font-normal text-[#10A37F]">{record.chemicalModification}</span>
                    </div>
                    <div className="text-slate-500 dark:text-[#8E8E8E]">
                      Farmasötik Mekanizma: {record.stability} (Referans: Slayt {record.slideRef})
                    </div>
                  </div>
                  {onAskTutor && (
                    <Button
                      size="small"
                      type="primary"
                      ghost
                      icon={<RobotOutlined />}
                      onClick={() =>
                        onAskTutor(
                          `${record.substituent} (${record.bondType}) modifikasyonunun farmakolojik etkisini ve Slayt ${record.slideRef}'deki önemini açıklar mısın?`
                        )
                      }
                      className="shrink-0 rounded-xl px-3 py-1 font-medium border-[#10A37F] text-[#10A37F] hover:border-[#0E8C6D] hover:text-[#0E8C6D]"
                    >
                      Bu Yapıyı Tutor'a Sor
                    </Button>
                  )}
                </div>
              ),
              rowExpandable: () => true,
            }}
          />
        </div>
      )}

      <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-[#8E8E8E] bg-slate-50 dark:bg-[#212121] p-2.5 rounded-xl border border-slate-200 dark:border-[#2F2F2F]">
        <div className="flex items-center gap-1.5">
          <InfoCircleOutlined className="text-[#10A37F] shrink-0" />
          <span>
            {selectedSeries === 'tactile_explorer'
              ? 'Model illüstrasyonu: QSAR tahminleri Hansch π sabitleri ve lokal anestezik SAR ilkelerine dayanmaktadır (Slayt 13-33).'
              : 'Model illüstrasyonu: Bağıntılar ders slaytlarındaki nitel afinite ilkelerine dayanmaktadır.'}
          </span>
        </div>
        {onAskTutor && selectedSeries !== 'tactile_explorer' && (
          <Button
            type="link"
            size="small"
            icon={<RobotOutlined className="text-blue-500" />}
            onClick={() => onAskTutor(`SAR Matrisindeki '${current.title}' konusunu ve farmakolojik etkisini açıklar mısın?`)}
            className="text-blue-600 dark:text-blue-400 font-bold shrink-0 p-0 h-auto"
          >
            Tutor'a Sor →
          </Button>
        )}
      </div>
    </div>
  );
};
